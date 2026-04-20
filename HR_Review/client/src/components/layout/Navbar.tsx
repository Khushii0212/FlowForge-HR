import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Props { onSimulate: () => void; onExport: () => void; onImport: () => void; validationErrors: number; isSimulating: boolean; }

export function Navbar({ onSimulate, onExport, onImport, validationErrors, isSimulating }: Props) {
  return (
    <header className="glass-panel relative z-20 flex h-[68px] items-center justify-between px-6 border-b border-slate-100">
      {/* Logo & Brand */}
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 shadow-lg shadow-indigo-300/40 ring-1 ring-white/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[17px] font-bold tracking-tight text-slate-900 leading-none">
              FlowForge <span className="text-indigo-600">HR</span>
            </h1>
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 border border-indigo-100 leading-none">
              BETA
            </span>
          </div>
          <p className="mt-1 text-[11px] font-medium text-slate-400 leading-none">Intelligent Workflow Automation</p>
        </div>
      </div>

      {/* Center — divider */}
      <div className="hidden md:flex items-center gap-2 text-[12px] font-medium text-slate-400">
        <div className="flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-500 font-semibold">Canvas Ready</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {validationErrors > 0 && (
          <div className="flex items-center gap-1.5 rounded-full bg-red-50 border border-red-200 px-3 py-1.5 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span className="text-xs font-bold text-red-600">{validationErrors} issue{validationErrors > 1 ? 's' : ''}</span>
          </div>
        )}

        <div className="h-7 w-px bg-slate-200 mx-1" />

        <button
          onClick={onImport}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 border border-transparent hover:border-indigo-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Import
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 border border-transparent hover:border-indigo-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>

        <button
          onClick={onSimulate}
          disabled={isSimulating}
          className="btn-run ml-1 flex items-center gap-2.5 rounded-[12px] px-5 py-2.5 text-[13px] font-bold text-white disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSimulating ? (
            <>
              <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span>Simulating...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              Run Workflow
            </>
          )}
        </button>
      </div>
    </header>
  );
}
