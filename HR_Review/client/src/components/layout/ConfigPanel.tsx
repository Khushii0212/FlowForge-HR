import type { Node } from '@xyflow/react';
import type { WorkflowNodeData, StartNodeData, TaskNodeData, ApprovalNodeData, AutomatedNodeData, EndNodeData } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StartNodeForm } from '@/components/forms/StartNodeForm';
import { TaskNodeForm } from '@/components/forms/TaskNodeForm';
import { ApprovalNodeForm } from '@/components/forms/ApprovalNodeForm';
import { AutomatedNodeForm } from '@/components/forms/AutomatedNodeForm';
import { EndNodeForm } from '@/components/forms/EndNodeForm';

interface Props {
  selectedNode: Node<WorkflowNodeData> | null;
  onUpdateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void;
  onDeleteNode: (id: string) => void;
  onDeselectNode: () => void;
}

const typeConfig: Record<string, { label: string; color: string; gradient: string; icon: JSX.Element }> = {
  startNode: {
    label: 'Start Component', color: 'emerald',
    gradient: 'from-emerald-500 to-emerald-600',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1"><polygon points="6 3 20 12 6 21 6 3"/></svg>,
  },
  taskNode: {
    label: 'Task Assignment', color: 'indigo',
    gradient: 'from-indigo-500 to-indigo-600',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>,
  },
  approvalNode: {
    label: 'Approval Gate', color: 'amber',
    gradient: 'from-amber-400 to-amber-500',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  },
  automatedNode: {
    label: 'Automated Action', color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
  },
  endNode: {
    label: 'End Point', color: 'rose',
    gradient: 'from-rose-500 to-red-600',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>,
  },
};

const badgeColorMap: Record<string, string> = {
  emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  indigo:  'bg-indigo-50  text-indigo-700  border border-indigo-200',
  amber:   'bg-amber-50   text-amber-700   border border-amber-200',
  violet:  'bg-violet-50  text-violet-700  border border-violet-200',
  rose:    'bg-rose-50    text-rose-700    border border-rose-200',
};

export function ConfigPanel({ selectedNode, onUpdateNodeData, onDeleteNode, onDeselectNode }: Props) {
  if (!selectedNode) {
    return (
      <aside className="glass-panel relative z-10 flex w-[320px] flex-col border-l border-slate-100/80 shadow-[-2px_0_20px_rgba(79,70,229,0.04)]">
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-[20px] bg-gradient-to-br from-slate-50 to-indigo-50/50 border border-slate-200/60 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#configGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="configGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
          <h3 className="text-[15px] font-bold text-slate-700 tracking-tight">No Component Selected</h3>
          <p className="mt-2 text-[12px] font-medium text-slate-400 leading-relaxed max-w-[180px]">
            Click any node on the canvas to configure its properties
          </p>
          <div className="mt-6 flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span className="text-[11px] font-semibold text-indigo-500">Select a node to begin</span>
          </div>
        </div>
      </aside>
    );
  }

  const cfg = typeConfig[selectedNode.type || ''] || typeConfig.taskNode;
  const handleUpdate = (data: Partial<WorkflowNodeData>) => onUpdateNodeData(selectedNode.id, data);

  return (
    <aside className="glass-panel relative z-10 flex w-[320px] flex-col border-l border-slate-100/80 shadow-[-2px_0_20px_rgba(79,70,229,0.04)]">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br ${cfg.gradient} shadow-md`}>
              {cfg.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[13px] font-black uppercase tracking-[0.1em] text-slate-800">Properties</h2>
              </div>
              <span className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ${badgeColorMap[cfg.color]}`}>
                {cfg.label}
              </span>
            </div>
          </div>

          <button
            onClick={onDeselectNode}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all duration-200 border border-transparent hover:border-red-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Node ID */}
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-slate-50 border border-slate-200/60 px-3 py-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="font-mono text-[10px] font-semibold text-slate-500 truncate">{selectedNode.id}</span>
        </div>
      </div>

      <div className="mx-5 h-px bg-gradient-to-r from-indigo-100 via-slate-200 to-transparent" />

      <ScrollArea className="flex-1 px-4 py-4">
        <div className="rounded-[16px] border border-slate-200/60 bg-white/80 p-4 shadow-sm">
          {selectedNode.type === 'startNode'     && <StartNodeForm data={selectedNode.data as unknown as StartNodeData} onUpdate={handleUpdate} />}
          {selectedNode.type === 'taskNode'      && <TaskNodeForm data={selectedNode.data as unknown as TaskNodeData} onUpdate={handleUpdate} />}
          {selectedNode.type === 'approvalNode'  && <ApprovalNodeForm data={selectedNode.data as unknown as ApprovalNodeData} onUpdate={handleUpdate} />}
          {selectedNode.type === 'automatedNode' && <AutomatedNodeForm data={selectedNode.data as unknown as AutomatedNodeData} onUpdate={handleUpdate} />}
          {selectedNode.type === 'endNode'       && <EndNodeForm data={selectedNode.data as unknown as EndNodeData} onUpdate={handleUpdate} />}
        </div>
      </ScrollArea>

      <div className="mx-5 h-px bg-gradient-to-r from-red-100 via-slate-200 to-transparent" />

      {/* Delete Button */}
      <div className="p-5">
        <button
          onClick={() => onDeleteNode(selectedNode.id)}
          className="group w-full flex items-center justify-center gap-2.5 rounded-[12px] bg-rose-50 hover:bg-rose-500 border border-rose-200 hover:border-rose-500 py-3 px-4 text-[13px] font-bold text-rose-600 hover:text-white transition-all duration-250 shadow-sm hover:shadow-lg hover:shadow-rose-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          Delete Component
        </button>
      </div>
    </aside>
  );
}
