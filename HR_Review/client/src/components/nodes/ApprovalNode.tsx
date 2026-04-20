import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { ApprovalNodeData } from '@/types';

export function ApprovalNode({ data, selected }: NodeProps) {
  const d = data as unknown as ApprovalNodeData;
  return (
    <div className={`glass-node node-approval w-[220px] rounded-[18px] transition-all duration-250 ${selected ? 'ring-2 ring-amber-400 ring-offset-2 shadow-[0_8px_32px_rgba(245,158,11,0.25)]' : ''}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="!h-4 !w-4 !rounded-full !border-2 !border-amber-400 !bg-white !shadow-md"
      />

      <div className="h-1.5 w-full rounded-t-[18px] bg-gradient-to-r from-amber-400 to-amber-300" />

      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-amber-400 to-amber-500 shadow-md shadow-amber-200/60">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-amber-600">
              Approval
            </span>
            <h3 className="mt-0.5 truncate text-[14px] font-bold text-slate-800 leading-snug">{d.title || 'Required Approval'}</h3>
          </div>
        </div>

        {(d.approverRole || d.autoApproveThreshold > 0) && (
          <div className="mt-3 flex flex-col gap-1.5 pt-3 border-t border-slate-100">
            {d.approverRole && (
              <div className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-amber-50 border border-amber-100 px-2.5 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span className="text-[11px] font-bold text-amber-700">{d.approverRole}</span>
              </div>
            )}
            {d.autoApproveThreshold > 0 && (
              <span className="text-[11px] font-semibold text-slate-500">Auto-approve ≤ ${d.autoApproveThreshold}</span>
            )}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-4 !w-4 !rounded-full !border-2 !border-amber-400 !bg-white !shadow-md"
      />
    </div>
  );
}
