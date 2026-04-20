import { useCallback } from 'react';
import { useWorkflowStore } from '@/store/workflowStore';
import type { WorkflowNodeData } from '@/types';
import type { Node } from '@xyflow/react';

let nodeIdCounter = 0;

export function useWorkflow() {
  const {
    nodes, edges, selectedNodeId, addNode, deleteNode, updateNodeData,
    setSelectedNode, onNodesChange, onEdgesChange, onConnect, validateWorkflow, getWorkflowJSON,
  } = useWorkflowStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  const createNode = useCallback(
    (type: string, position: { x: number; y: number }, data: WorkflowNodeData) => {
      const id = `${type}_${++nodeIdCounter}_${Date.now()}`;
      const newNode: Node<WorkflowNodeData> = { id, type, position, data };
      addNode(newNode);
      return newNode;
    },
    [addNode]
  );

  return {
    nodes, edges, selectedNode, selectedNodeId, createNode, deleteNode,
    updateNodeData, setSelectedNode, onNodesChange, onEdgesChange, onConnect,
    validateWorkflow, getWorkflowJSON,
  };
}
