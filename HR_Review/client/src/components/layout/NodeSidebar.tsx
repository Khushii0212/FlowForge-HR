import { type DragEvent } from 'react';
import type { NodeTemplate } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

const nodeTemplates: NodeTemplate[] = [
  { type: 'startNode',     label: 'Start Entry',    icon: '▶', color: 'emerald', description: 'Begin workflow process' },
  { type: 'taskNode',      label: 'Assign Task',    icon: '✏', color: 'indigo',  description: 'Assign work to a role'  },
  { type: 'approvalNode',  label: 'Approval Gate',  icon: '✓', color: 'amber',   description: 'Require sign-off'       },
  { type: 'automatedNode', label: 'Auto Action',    icon: '⚡', color: 'violet',  description: 'Execute integration API'},
  { type: 'endNode',       label: 'End Point',      icon: '■', color: 'rose',    description: 'Terminate path'         },
];

const colorMap: Record<string, {
  iconGradient: string;
  iconShadow: string;
  hoverBg: string;
  badge: string;
  dot: string;
}> = {
  emerald: {
    iconGradient: 'from-emerald-400 to-emerald-600',
    iconShadow:   'shadow-emerald-200',
    hoverBg:      'hover:border-emerald-200 hover:bg-emerald-50/40',
    badge:        'bg-emerald-50 text-emerald-600 border-emerald-100',
    dot:          'bg-emerald-500',
  },
  indigo: {
    iconGradient: 'from-indigo-400 to-indigo-600',
    iconShadow:   'shadow-indigo-200',
    hoverBg:      'hover:border-indigo-200 hover:bg-indigo-50/40',
    badge:        'bg-indigo-50 text-indigo-600 border-indigo-100',
    dot:          'bg-indigo-500',
  },
  amber: {
    iconGradient: 'from-amber-400 to-amber-500',
    iconShadow:   'shadow-amber-200',
    hoverBg:      'hover:border-amber-200 hover:bg-amber-50/40',
    badge:        'bg-amber-50 text-amber-600 border-amber-100',
    dot:          'bg-amber-500',
  },
  violet: {
    iconGradient: 'from-violet-500 to-purple-600',
    iconShadow:   'shadow-violet-200',
    hoverBg:      'hover:border-violet-200 hover:bg-violet-50/40',
    badge:        'bg-violet-50 text-violet-600 border-violet-100',
    dot:          'bg-violet-500',
  },
  rose: {
    iconGradient: 'from-rose-500 to-red-600',
    iconShadow:   'shadow-rose-200',
    hoverBg:      'hover:border-rose-200 hover:bg-rose-50/40',
    badge:        'bg-rose-50 text-rose-600 border-rose-100',
    dot:          'bg-rose-500',
  },
};

export function NodeSidebar() {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="glass-panel relative z-10 flex w-[280px] flex-col border-r border-slate-100/80 shadow-[2px_0_20px_rgba(79,70,229,0.04)]">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-4 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-violet-600" />
          <h2 className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-800">Components</h2>
        </div>
        <p className="pl-3 text-[11px] font-medium text-slate-400 leading-snug">
          Drag nodes onto the canvas to build your workflow
        </p>
      </div>

      <div className="mx-5 h-px bg-gradient-to-r from-indigo-100 via-slate-200 to-transparent" />

      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-2.5">
          {nodeTemplates.map((t, idx) => {
            const c = colorMap[t.color];
            return (
              <div
                key={t.type}
                className={`node-card group ${c.hoverBg} border-slate-200/80`}
                draggable
                onDragStart={(e) => onDragStart(e, t.type)}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="flex items-center gap-3.5">
                  {/* Icon */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br ${c.iconGradient} text-sm font-bold text-white shadow-md ${c.iconShadow} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    {t.icon}
                  </div>

                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] font-bold text-slate-800 group-hover:text-slate-900">{t.label}</p>
                      <svg
                        className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-transform"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                      </svg>
                    </div>
                    <p className="mt-0.5 text-[11px] font-medium text-slate-400 leading-tight">{t.description}</p>
                  </div>
                </div>

                {/* Drag hint */}
                <div className="mt-3 flex items-center gap-1.5 pl-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                  <span className="text-[10px] font-semibold text-slate-400">Drag to canvas</span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer hint */}
      <div className="px-5 py-4 border-t border-slate-100">
        <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100/60 px-3.5 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <p className="text-[11px] font-semibold text-indigo-600 leading-tight">Connect nodes by dragging from the bottom handle to the top handle of the next node</p>
        </div>
      </div>
    </aside>
  );
}
