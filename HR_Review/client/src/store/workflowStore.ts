import { create } from 'zustand';
import {
  type Node,
  type Edge,
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type EdgeChange,
  type Connection,
  addEdge,
} from '@xyflow/react';
import type { WorkflowNodeData, ValidationError } from '@/types';

interface WorkflowState {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: Node<WorkflowNodeData>) => void;
  deleteNode: (id: string) => void;
  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void;
  setSelectedNode: (id: string | null) => void;
  validateWorkflow: () => ValidationError[];
  getWorkflowJSON: () => { nodes: Node<WorkflowNodeData>[]; edges: Edge[] };
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) as Node<WorkflowNodeData>[] });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        { ...connection, animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
        get().edges
      ),
    });
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  deleteNode: (id) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== id),
      edges: get().edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId,
    });
  },

  updateNodeData: (id, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...data } as WorkflowNodeData }
          : node
      ),
    });
  },

  setSelectedNode: (id) => {
    set({ selectedNodeId: id });
  },

  validateWorkflow: () => {
    const { nodes, edges } = get();
    const errors: ValidationError[] = [];
    const startNodes = nodes.filter((n) => n.type === 'startNode');
    const endNodes = nodes.filter((n) => n.type === 'endNode');

    if (startNodes.length === 0) errors.push({ type: 'error', message: 'Workflow must have a Start node.' });
    if (startNodes.length > 1) errors.push({ type: 'error', message: 'Only one Start node is allowed.' });
    if (endNodes.length === 0) errors.push({ type: 'error', message: 'Workflow must have an End node.' });

    if (startNodes.length === 1) {
      const hasIncoming = edges.some((e) => e.target === startNodes[0].id);
      if (hasIncoming) errors.push({ type: 'warning', message: 'Start node should not have incoming connections.' });
    }

    const connectedIds = new Set<string>();
    edges.forEach((e) => { connectedIds.add(e.source); connectedIds.add(e.target); });
    const disconnected = nodes.filter((n) => !connectedIds.has(n.id));
    if (disconnected.length > 0 && nodes.length > 1) {
      errors.push({ type: 'warning', message: `${disconnected.length} node(s) are not connected.` });
    }
    return errors;
  },

  getWorkflowJSON: () => {
    const { nodes, edges } = get();
    return { nodes, edges };
  },
}));
