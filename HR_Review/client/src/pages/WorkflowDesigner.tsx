import { useCallback, useRef, type DragEvent } from 'react';
import { ReactFlow, Background, Controls, MiniMap, type ReactFlowInstance, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useWorkflow } from '@/hooks/useWorkflow';
import { useSimulation } from '@/hooks/useSimulation';
import { Navbar } from '@/components/layout/Navbar';
import { NodeSidebar } from '@/components/layout/NodeSidebar';
import { ConfigPanel } from '@/components/layout/ConfigPanel';
import { SimulationPanel } from '@/components/layout/SimulationPanel';
import { StartNode } from '@/components/nodes/StartNode';
import { TaskNode } from '@/components/nodes/TaskNode';
import { ApprovalNode } from '@/components/nodes/ApprovalNode';
import { AutomatedNode } from '@/components/nodes/AutomatedNode';
import { EndNode } from '@/components/nodes/EndNode';
import type { WorkflowNodeData } from '@/types';

const nodeTypes = {
  startNode: StartNode,
  taskNode: TaskNode,
  approvalNode: ApprovalNode,
  automatedNode: AutomatedNode,
  endNode: EndNode,
};

const defaultNodeData: Record<string, () => WorkflowNodeData> = {
  startNode:     () => ({ label: 'Start Entry',   title: 'Start Entry',   metadata: [] }),
  taskNode:      () => ({ label: 'Assign Task',   title: 'Assign Task',   description: '', assignee: '', dueDate: '', customFields: [] }),
  approvalNode:  () => ({ label: 'Approval Gate', title: 'Approval Gate', approverRole: '', autoApproveThreshold: 0 }),
  automatedNode: () => ({ label: 'Auto Action',   title: 'Auto Action',   actionId: '', parameters: {} }),
  endNode:       () => ({ label: 'End Point',     title: 'End Point',     endMessage: '', showSummary: false }),
};

export function WorkflowDesigner() {
  const reactFlowWrapper   = useRef<HTMLDivElement>(null);
  const reactFlowInstance  = useRef<ReactFlowInstance | null>(null);

  const {
    nodes, edges, selectedNode,
    createNode, deleteNode, updateNodeData, setSelectedNode,
    onNodesChange, onEdgesChange, onConnect,
    validateWorkflow, getWorkflowJSON,
  } = useWorkflow();

  const { result, isRunning, error, showPanel, runSimulation, closePanel } = useSimulation();
  const validationErrors = validateWorkflow();

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type || !reactFlowInstance.current) return;
    const position = reactFlowInstance.current.screenToFlowPosition({ x: event.clientX, y: event.clientY });
    const dataFactory = defaultNodeData[type];
    if (dataFactory) createNode(type, position, dataFactory());
  }, [createNode]);

  const handleSimulate = useCallback(() => runSimulation(getWorkflowJSON()), [getWorkflowJSON, runSimulation]);

  const handleExport = useCallback(() => {
    const blob = new Blob([JSON.stringify(getWorkflowJSON(), null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'hr-workflow.json'; a.click();
    URL.revokeObjectURL(url);
  }, [getWorkflowJSON]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        if (data.nodes) data.nodes.forEach((n: any) => createNode(n.type, n.position, n.data));
      } catch { console.error('Failed to import'); }
    };
    input.click();
  }, [createNode]);

  return (
    <div className="flex h-screen flex-col overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #fafafe 50%, #f5f0ff 100%)' }}>
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #c7d2fe 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <Navbar
        onSimulate={handleSimulate}
        onExport={handleExport}
        onImport={handleImport}
        validationErrors={validationErrors.filter((e) => e.type === 'error').length}
        isSimulating={isRunning}
      />

      <div className="relative z-10 flex flex-1 overflow-hidden">
        <NodeSidebar />

        <div className="relative flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onInit={(instance) => { reactFlowInstance.current = instance; }}
            onNodeClick={(_, node) => setSelectedNode(node.id)}
            onPaneClick={() => setSelectedNode(null)}
            nodeTypes={nodeTypes}
            fitView
            deleteKeyCode={['Backspace', 'Delete']}
            className="bg-transparent"
            defaultEdgeOptions={{
              animated: true,
              style: { stroke: '#6366f1', strokeWidth: 2.5 },
              type: 'smoothstep',
            }}
          >
            <Background variant={BackgroundVariant.Dots} color="#c7d2fe" gap={28} size={1.5} />
            <Controls className="!rounded-[14px] !border-white !bg-white !shadow-lg" />
            <MiniMap
              className="!rounded-[14px] !border-white !bg-white !shadow-lg"
              maskColor="rgba(240, 244, 255, 0.75)"
              nodeColor={(node) => {
                switch (node.type) {
                  case 'startNode':     return '#34d399';
                  case 'taskNode':     return '#818cf8';
                  case 'approvalNode': return '#fbbf24';
                  case 'automatedNode':return '#a78bfa';
                  case 'endNode':      return '#fb7185';
                  default:             return '#cbd5e1';
                }
              }}
            />
          </ReactFlow>

          {/* Validation Toasts */}
          {validationErrors.length > 0 && (
            <div className="pointer-events-none absolute left-5 top-5 z-10 max-w-[300px] space-y-2">
              {validationErrors.map((err, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 rounded-[14px] border px-4 py-3.5 shadow-lg backdrop-blur-sm animate-in ${
                    err.type === 'error'
                      ? 'border-rose-200 bg-rose-50/95 text-rose-800'
                      : 'border-amber-200 bg-amber-50/95 text-amber-800'
                  }`}
                >
                  <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${
                    err.type === 'error' ? 'bg-rose-200 text-rose-600' : 'bg-amber-200 text-amber-600'
                  }`}>
                    {err.type === 'error' ? '!' : '?'}
                  </div>
                  <p className="text-[12px] font-semibold leading-snug">{err.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* Empty canvas hint */}
          {nodes.length === 0 && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="text-center animate-fade">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] bg-white border border-indigo-100 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#hintGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="hintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </div>
                <p className="text-[15px] font-bold text-slate-500">Drop components here</p>
                <p className="mt-1 text-[12px] font-medium text-slate-400">Drag from the left sidebar to get started</p>
              </div>
            </div>
          )}

          {showPanel && (
            <SimulationPanel result={result} isRunning={isRunning} error={error} onClose={closePanel} />
          )}
        </div>

        <ConfigPanel
          selectedNode={selectedNode}
          onUpdateNodeData={updateNodeData}
          onDeleteNode={deleteNode}
          onDeselectNode={() => setSelectedNode(null)}
        />
      </div>
    </div>
  );
}
