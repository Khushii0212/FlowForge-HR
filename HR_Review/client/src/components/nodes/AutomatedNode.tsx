import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { AutomatedNodeData } from '@/types';

export function AutomatedNode({ data, selected }: NodeProps) {
  const d = data as unknown as AutomatedNodeData;
  return (
    <div className={`glass-node node-automated w-[220px] rounded-[18px] transition-all duration-250 ${selected ? 'ring-2 ring-violet-400 ring-offset-2 shadow-[0_8px_32px_rgba(124,58,237,0.25)]' : ''}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="!h-4 !w-4 !rounded-full !border-2 !border-violet-400 !bg-white !shadow-md"
      />

      <div className="h-1.5 w-full rounded-t-[18px] bg-gradient-to-r from-violet-500 to-purple-400" />

      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-violet-500 to-purple-600 shadow-md shadow-violet-200/60">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center rounded-full bg-violet-50 border border-violet-200 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-violet-600">
              Action
            </span>
            <h3 className="mt-0.5 truncate text-[14px] font-bold text-slate-800 leading-snug">{d.title || 'System Action'}</h3>
          </div>
        </div>

        {d.actionId && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-violet-50 border border-violet-100 px-3 py-1.5">
              <span className="text-[9px] font-black uppercase tracking-wider text-violet-500">API</span>
              <span className="h-3 w-px bg-violet-200" />
              <span className="truncate text-[11px] font-bold text-violet-800">{d.actionId}</span>
            </div>
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-4 !w-4 !rounded-full !border-2 !border-violet-400 !bg-white !shadow-md"
      />
    </div>
  );
}
