import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, AlertTriangle, ShieldAlert, Settings2, ChevronDown } from 'lucide-react';

export const DemoStateControl: React.FC = () => {
  const { currentRole, demoSafetyState, setDemoSafetyState } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  // Only show this control in the Tourist view
  if (currentRole !== 'TOURIST') return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm border ${
          demoSafetyState !== 'SAFE'
            ? 'bg-[var(--color-high)]/20 border-[var(--color-high)] text-[var(--color-moderate)]'
            : 'bg-white/[0.05] hover:bg-white/[0.09] border-white/10 text-[var(--text-secondary)] hover:text-white'
        }`}
      >
        <Settings2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Demo State</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-[var(--bg-secondary)]/95 border border-white/15 backdrop-blur-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">
            Simulate Safety
          </div>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => { setDemoSafetyState('SAFE'); setIsOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                demoSafetyState === 'SAFE'
                  ? 'bg-[var(--color-safe)]/20 text-[var(--color-safe)] border border-[var(--color-safe)]/50'
                  : 'hover:bg-white/5 text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              SAFE
            </button>
            <button
              onClick={() => { setDemoSafetyState('MODERATE'); setIsOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                demoSafetyState === 'MODERATE'
                  ? 'bg-[var(--color-moderate)]/20 text-[var(--color-moderate)] border border-[var(--color-moderate)]/50'
                  : 'hover:bg-white/5 text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              MODERATE
            </button>
            <button
              onClick={() => { setDemoSafetyState('HIGH'); setIsOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                demoSafetyState === 'HIGH'
                  ? 'bg-[var(--color-critical)]/20 text-[var(--color-critical)] border border-[var(--color-critical)]/50'
                  : 'hover:bg-white/5 text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              HIGH RISK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
