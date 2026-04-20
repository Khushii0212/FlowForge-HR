import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { EndNodeData } from '@/types';

export function EndNode({ data, selected }: NodeProps) {
  const d = data as unknown as EndNodeData;
  return (
    <div className={`glass-node node-end w-[220px] rounded-[18px] transition-all duration-250 ${selected ? 'ring-2 ring-rose-400 ring-offset-2 shadow-[0_8px_32px_rgba(225,29,72,0.25)]' : ''}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="!h-4 !w-4 !rounded-full !border-2 !border-rose-400 !bg-white !shadow-md"
      />

      <div className="h-1.5 w-full rounded-t-[18px] bg-gradient-to-r from-rose-500 to-red-400" />

      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-rose-500 to-red-600 shadow-md shadow-rose-200/60">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center rounded-full bg-rose-50 border border-rose-200 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-rose-600">
              Finish
            </span>
            <h3 className="mt-0.5 truncate text-[14px] font-bold text-slate-800 leading-snug">{d.title || 'End Point'}</h3>
          </div>
        </div>

        {d.endMessage && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-start gap-2 rounded-lg bg-rose-50 border border-rose-100 px-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <p className="text-[11px] italic font-medium text-rose-700 leading-snug">"{d.endMessage}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
