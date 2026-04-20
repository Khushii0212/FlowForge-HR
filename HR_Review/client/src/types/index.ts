import { type Node, type Edge } from '@xyflow/react';

export interface KeyValuePair {
  key: string;
  value: string;
}

export interface StartNodeData {
  label: string;
  title: string;
  metadata: KeyValuePair[];
  [key: string]: unknown;
}

export interface TaskNodeData {
  label: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: KeyValuePair[];
  [key: string]: unknown;
}

export interface ApprovalNodeData {
  label: string;
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
  [key: string]: unknown;
}

export interface AutomatedNodeData {
  label: string;
  title: string;
  actionId: string;
  parameters: Record<string, string>;
  [key: string]: unknown;
}

export interface EndNodeData {
  label: string;
  title: string;
  endMessage: string;
  showSummary: boolean;
  [key: string]: unknown;
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedNodeData
  | EndNodeData;

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;

export const NODE_TYPES = {
  START: 'startNode',
  TASK: 'taskNode',
  APPROVAL: 'approvalNode',
  AUTOMATED: 'automatedNode',
  END: 'endNode',
} as const;

export type NodeTypeValue = (typeof NODE_TYPES)[keyof typeof NODE_TYPES];

export interface NodeTemplate {
  type: NodeTypeValue;
  label: string;
  icon: string;
  color: string;
  description: string;
}

export interface Automation {
  id: string;
  label: string;
  params: string[];
}

export interface SimulationStep {
  step: number;
  name: string;
  nodeId: string;
  type: string;
  status: string;
  timestamp: string;
}

export interface SimulationResult {
  success: boolean;
  totalSteps: number;
  executedNodes: number;
  totalNodes: number;
  steps: SimulationStep[];
}

export interface ValidationError {
  type: 'error' | 'warning';
  message: string;
}
