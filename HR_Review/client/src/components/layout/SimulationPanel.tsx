import type { SimulationResult } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Props { result: SimulationResult | null; isRunning: boolean; error: string | null; onClose: () => void; }

const statusConfig: Record<string, { label: string; bg: string; text: string; border: string; dot: string; icon: JSX.Element }> = {
  completed: {
    label: 'Completed', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  },
  approved: {
    label: 'Approved', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  },
  executed: {
    label: 'Executed', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', dot: 'bg-indigo-500',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
  },
  rejected: {
    label: 'Rejected', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-500',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  },
  pending: {
    label: 'Pending', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-400',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>,
  },
};

export function SimulationPanel({ result, isRunning, error, onClose }: Props) {
  const success = result && !isRunning && !error;
  const successRate = success ? Math.round((result.executedNodes / result.totalNodes) * 100) : 0;

  return (
    <div className="absolute bottom-6 right-6 z-50 w-[440px] overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(79,70,229,0.15),0_8px_24px_rgba(0,0,0,0.08)] animate-in">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-6 py-4">
        {/* Decorative circles */}
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/5" />
        <div className="absolute right-10 -bottom-6 h-16 w-16 rounded-full bg-white/5" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/20 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            </div>
            <div>
              <h3 className="text-[13px] font-black tracking-[0.08em] text-white uppercase">Execution Log</h3>
              <p className="text-[10px] font-medium text-indigo-200 mt-0.5">Workflow simulation results</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white/80 hover:text-white transition-all duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>

      <ScrollArea className="max-h-[480px]">
        <div className="p-5">
          {/* Loading */}
          {isRunning && (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <div className="relative">
                <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-indigo-100 border-t-indigo-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-indigo-400 animate-pulse" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-[13px] font-bold text-slate-700">Processing workflow...</p>
                <p className="mt-1 text-[11px] text-slate-400 font-medium">Executing simulation tree</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-[14px] border border-rose-200 bg-rose-50 p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-rose-700">Execution Blocked</h4>
                  <p className="mt-1 text-[11px] font-semibold text-rose-600 leading-relaxed">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {success && (
            <>
              {/* Stats Row */}
              <div className="mb-5 grid grid-cols-3 gap-3">
                <div className="stat-card">
                  <p className="text-[26px] font-black text-indigo-600 leading-none">{result.totalSteps}</p>
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">Total Steps</p>
                </div>
                <div className="stat-card">
                  <p className="text-[26px] font-black text-emerald-600 leading-none">{result.executedNodes}</p>
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">Processed</p>
                </div>
                <div className="stat-card">
                  <p className="text-[26px] font-black text-violet-600 leading-none">{result.totalNodes}</p>
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">Graph Size</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-5 rounded-[12px] bg-slate-50 border border-slate-200/60 p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-600">Completion Rate</span>
                  <span className="text-[12px] font-black text-indigo-600">{successRate}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-700"
                    style={{ width: `${successRate}%` }}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-0">
                <h4 className="mb-3 text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">Execution Steps</h4>
                {result.steps.map((step, index) => {
                  const s = statusConfig[step.status] || statusConfig.completed;
                  return (
                    <div key={step.nodeId} className="step-row group">
                      {/* Step number + connector */}
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-indigo-100 bg-white text-[11px] font-black text-indigo-600 shadow-sm transition-all duration-200 group-hover:border-indigo-300 group-hover:shadow-md group-hover:scale-105">
                          {step.step}
                        </div>
                        {index < result.steps.length - 1 && (
                          <div className="my-1 h-6 w-0.5 rounded-full bg-gradient-to-b from-indigo-200 to-slate-100" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-2 pt-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[13px] font-bold text-slate-800 group-hover:text-indigo-700 transition-colors leading-snug">{step.name}</p>
                          <span className={`inline-flex items-center gap-1.5 shrink-0 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${s.bg} ${s.text} border ${s.border}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                            {s.label}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[10px] font-semibold text-slate-400">
                          {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center gap-2 rounded-[12px] bg-emerald-50 border border-emerald-100 px-4 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
                <p className="text-[11px] font-bold text-emerald-700">Workflow simulation completed successfully</p>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
