import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, AlertTriangle, ShieldAlert, Settings2, X } from 'lucide-react';

export const DemoStateControl: React.FC = () => {
  const { currentRole, demoSafetyState, setDemoSafetyState } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  // Only show this control in the Tourist view
  if (currentRole !== 'TOURIST') return null;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[var(--surface-elevated)] border border-[var(--panel-border)] shadow-xl hover:scale-105 transition-all text-[var(--text-secondary)] hover:text-white"
        title="Demo Settings"
      >
        <Settings2 className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 glass-panel p-3 rounded-2xl shadow-2xl border-[var(--panel-border)] animate-in fade-in slide-in-from-bottom-5 max-w-[140px]">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">
          Demo
        </h3>
        <button onClick={() => setIsOpen(false)} className="text-[var(--text-muted)] hover:text-white">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => setDemoSafetyState('SAFE')}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold transition-all ${
            demoSafetyState === 'SAFE'
              ? 'bg-[var(--color-safe)]/20 text-[var(--color-safe)] border border-[var(--color-safe)]/50'
              : 'bg-[var(--panel-bg)] hover:bg-[var(--surface-elevated)] text-[var(--text-muted)]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          SAFE
        </button>
        
        <button
          onClick={() => setDemoSafetyState('MODERATE')}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold transition-all ${
            demoSafetyState === 'MODERATE'
              ? 'bg-[var(--color-moderate)]/20 text-[var(--color-moderate)] border border-[var(--color-moderate)]/50'
              : 'bg-[var(--panel-bg)] hover:bg-[var(--surface-elevated)] text-[var(--text-muted)]'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          MODERATE
        </button>

        <button
          onClick={() => setDemoSafetyState('HIGH')}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold transition-all ${
            demoSafetyState === 'HIGH'
              ? 'bg-[var(--color-critical)]/20 text-[var(--color-critical)] border border-[var(--color-critical)]/50 animate-pulse'
              : 'bg-[var(--panel-bg)] hover:bg-[var(--surface-elevated)] text-[var(--text-muted)]'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          HIGH
        </button>
      </div>
    </div>
  );
};
