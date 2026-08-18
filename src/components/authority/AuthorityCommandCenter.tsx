import React from 'react';
import { useApp } from '../../context/AppContext';
import { Cpu, Layers, Activity, Server, Radio, ShieldCheck } from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export const AuthorityCommandCenter: React.FC = () => {
  const { setActiveTab, incidents, addToast } = useApp();
  
  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED' && i.status !== 'CLOSED');

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Command Header Bar */}
      <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-white/10 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
              TOURISM POLICE EMERGENCY DISPATCH CENTER
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">•</span>
            <span className="text-[11px] text-[var(--color-safe)] font-mono">NODE: MEGHALAYA-HQ-01</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] mt-1">
            Central Authority Command Center
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="cmd-btn-quantum-opt"
            onClick={() => {
              soundEffects.playSafeChime();
              setActiveTab('quantum');
            }}
            className="px-3.5 py-2 rounded-xl bg-[#C084FC]/10 hover:bg-[#C084FC]/20 border border-[#C084FC]/40 text-xs font-bold text-[#C084FC] flex items-center gap-1.5 transition-all shadow-md"
          >
            <Cpu className="w-4 h-4" />
            <span>Quantum Resource Optimizer</span>
          </button>

          <button
            id="cmd-btn-audit-trail"
            onClick={() => {
              soundEffects.playSafeChime();
              setActiveTab('blockchain');
            }}
            className="px-3.5 py-2 rounded-xl bg-[#60A5FA]/10 hover:bg-[#60A5FA]/20 border border-[#60A5FA]/40 text-xs font-bold text-[#60A5FA] flex items-center gap-1.5 transition-all"
          >
            <Layers className="w-4 h-4" />
            <span>Blockchain Audit Logs</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <div className="p-6 rounded-2xl bg-[#101510] border border-white/10 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-[var(--color-safe)]/10 text-[var(--color-safe)]">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">System Health</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[var(--text-secondary)]">Neural Network Latency</span>
                <span className="font-mono text-[var(--color-safe)]">12ms</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-safe)] w-[95%]"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[var(--text-secondary)]">SDRF Comm Link</span>
                <span className="font-mono text-[var(--color-safe)]">Optimal</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-safe)] w-[100%]"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[var(--text-secondary)]">Geo-Fence Integrity</span>
                <span className="font-mono text-[#F5C84C]">98%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#F5C84C] w-[98%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Operations */}
        <div className="p-6 rounded-2xl bg-[#101510] border border-white/10 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-[#60A5FA]/10 text-[#60A5FA]">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Global Operations</h3>
          </div>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => addToast({ title: 'Advisory Broadcasted', description: 'State-wide Weather Advisory sent', type: 'INFO' })}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-left transition-all"
            >
              Broadcast Weather Advisory
            </button>
            <button 
              onClick={() => addToast({ title: 'Drill Initiated', description: 'Initiating standard protocol drill', type: 'INFO' })}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-left transition-all"
            >
              Initiate Responder Drill
            </button>
            <button 
              onClick={() => addToast({ title: 'CRITICAL ALERT', description: 'State Emergency Level escalated', type: 'CRITICAL' })}
              className="px-4 py-3 rounded-xl bg-[var(--color-critical)]/10 hover:bg-[var(--color-critical)]/20 border border-[var(--color-critical)]/30 text-xs font-bold text-[var(--color-critical)] text-left transition-all"
            >
              Trigger State-wide SOS
            </button>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="p-6 rounded-2xl bg-[#101510] border border-white/10 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-[var(--color-high)]/10 text-[var(--color-high)]">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Live Threat Level</h3>
            </div>
            
            <div className="flex items-end gap-2 mb-2">
              <span className="text-5xl font-extrabold text-[var(--color-high)] leading-none">{activeIncidents.length}</span>
              <span className="text-sm text-[var(--text-secondary)] font-bold pb-1">Active</span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">Open emergencies currently in triage.</p>
          </div>
          
          <button 
            onClick={() => setActiveTab('authority-incidents')}
            className="w-full mt-4 py-3 rounded-xl bg-[var(--color-high)] hover:bg-[#FCD34D] text-[#101510] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <ShieldCheck className="w-4 h-4" /> Go to Triage Queue
          </button>
        </div>
      </div>
    </div>
  );
};
