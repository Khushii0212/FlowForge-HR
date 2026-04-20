import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { TaskNodeData } from '@/types';

export function TaskNode({ data, selected }: NodeProps) {
  const d = data as unknown as TaskNodeData;
  return (
    <div className={`glass-node node-task w-[220px] rounded-[18px] transition-all duration-250 ${selected ? 'ring-2 ring-indigo-400 ring-offset-2 shadow-[0_8px_32px_rgba(79,70,229,0.25)]' : ''}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="!h-4 !w-4 !rounded-full !border-2 !border-indigo-400 !bg-white !shadow-md"
      />

      <div className="h-1.5 w-full rounded-t-[18px] bg-gradient-to-r from-indigo-500 to-indigo-400" />

      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-md shadow-indigo-200/60">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/>
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-indigo-600">
              Task
            </span>
            <h3 className="mt-0.5 truncate text-[14px] font-bold text-slate-800 leading-snug">{d.title || 'Untitled Task'}</h3>
          </div>
        </div>

        {(d.assignee || d.dueDate) && (
          <div className="mt-3 flex flex-col gap-1.5 pt-3 border-t border-slate-100">
            {d.assignee && (
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px]">👤</div>
                <span className="truncate text-[11px] font-semibold text-slate-600">{d.assignee}</span>
              </div>
            )}
            {d.dueDate && (
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px]">📅</div>
                <span className="text-[11px] font-semibold text-slate-500">{d.dueDate}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-4 !w-4 !rounded-full !border-2 !border-indigo-400 !bg-white !shadow-md"
      />
    </div>
  );
}
