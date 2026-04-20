import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { StartNodeData } from '@/types';

export function StartNode({ data, selected }: NodeProps) {
  const d = data as unknown as StartNodeData;
  return (
    <div className={`glass-node node-start w-[220px] rounded-[18px] transition-all duration-250 ${selected ? 'ring-2 ring-emerald-400 ring-offset-2 shadow-[0_8px_32px_rgba(16,185,129,0.25)]' : ''}`}>
      {/* Top accent bar — sits INSIDE, no overflow-hidden needed */}
      <div className="h-1.5 w-full rounded-t-[18px] bg-gradient-to-r from-emerald-400 to-emerald-500" />

      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md shadow-emerald-200/60">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0.5">
              <polygon points="6 3 20 12 6 21 6 3"/>
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-emerald-600">
              Start
            </span>
            <h3 className="mt-0.5 truncate text-[14px] font-bold text-slate-800 leading-snug">{d.title || 'Start Workflow'}</h3>
          </div>
        </div>

        {d.metadata && d.metadata.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
            {d.metadata.slice(0, 3).map((m, i) => (
              <span key={i} className="rounded-md bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{m.key}</span>
            ))}
            {d.metadata.length > 3 && (
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">+{d.metadata.length - 3}</span>
            )}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-4 !w-4 !rounded-full !border-2 !border-emerald-400 !bg-white !shadow-md"
      />
    </div>
  );
}
