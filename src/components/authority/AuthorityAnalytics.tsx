import React from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, Activity } from 'lucide-react';

export const AuthorityAnalytics: React.FC = () => {
  const { tourist, incidents, emergencyResources, guides } = useApp();

  // Stats calculation
  const totalTourists = 42;
  const safeTourists = tourist.safetyTier === 'SAFE' ? 39 : 38;
  const moderateTourists = tourist.safetyTier === 'MODERATE' ? 4 : 3;
  const highRiskTourists = tourist.safetyTier === 'HIGH' ? 2 : 1;
  const criticalTourists = tourist.safetyTier === 'CRITICAL' ? 1 : 0;
  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED' && i.status !== 'CLOSED');
  const availableResponders = emergencyResources.length + guides.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 p-5 rounded-2xl bg-[var(--bg-primary)] border border-white/10 shadow-lg">
        <div className="w-12 h-12 rounded-xl bg-[#60A5FA]/20 flex items-center justify-center text-[#60A5FA]">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">System Analytics</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Key Performance Indicators and tourist safety metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#101510] border border-white/10 shadow-lg">
          <span className="text-xs text-[var(--text-muted)] uppercase font-bold block">Active Tourists</span>
          <p className="text-4xl font-extrabold font-mono text-[var(--text-primary)] mt-2">{totalTourists}</p>
          <span className="text-xs text-[var(--color-safe)] mt-1 inline-block">Meghalaya Corridor</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#101510] border border-white/10 shadow-lg">
          <span className="text-xs text-[var(--text-muted)] uppercase font-bold block">🟢 Safe</span>
          <p className="text-4xl font-extrabold font-mono text-[var(--color-safe)] mt-2">{safeTourists}</p>
          <span className="text-xs text-[var(--text-muted)] mt-1 inline-block">Score &gt;80</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#101510] border border-white/10 shadow-lg">
          <span className="text-xs text-[var(--text-muted)] uppercase font-bold block">🟡 Caution</span>
          <p className="text-4xl font-extrabold font-mono text-[var(--color-moderate)] mt-2">{moderateTourists}</p>
          <span className="text-xs text-[var(--text-muted)] mt-1 inline-block">Score 60-80</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#101510] border border-white/10 shadow-lg">
          <span className="text-xs text-[var(--text-muted)] uppercase font-bold block">🔴 Critical / High Risk</span>
          <p className="text-4xl font-extrabold font-mono text-[var(--color-critical)] mt-2">{criticalTourists + highRiskTourists}</p>
          <span className="text-xs text-[var(--color-critical)] animate-pulse mt-1 inline-block">Emergency SOS</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#101510] border border-white/10 shadow-lg">
          <span className="text-xs text-[var(--text-muted)] uppercase font-bold block">Open Incidents</span>
          <p className="text-4xl font-extrabold font-mono text-[var(--color-high)] mt-2">{activeIncidents.length}</p>
          <span className="text-xs text-[var(--text-muted)] mt-1 inline-block">In Triage</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#101510] border border-white/10 shadow-lg">
          <span className="text-xs text-[var(--text-muted)] uppercase font-bold block">Available Responders</span>
          <p className="text-4xl font-extrabold font-mono text-[#60A5FA] mt-2">{availableResponders}</p>
          <span className="text-xs text-[var(--color-safe)] mt-1 inline-block">Guides + SDRF</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#101510] border border-white/10 shadow-lg">
          <span className="text-xs text-[var(--text-muted)] uppercase font-bold block">Avg Response ETA</span>
          <p className="text-4xl font-extrabold font-mono text-[var(--color-safe)] mt-2">4.2m</p>
          <span className="text-xs text-[var(--text-muted)] mt-1 inline-block">Target &lt;8m</span>
        </div>
      </div>
      
      {/* Placeholder for more complex charts if needed later */}
      <div className="p-8 rounded-2xl bg-[#101510] border border-white/10 flex flex-col items-center justify-center text-[var(--text-muted)]">
        <Activity className="w-12 h-12 mb-3 opacity-50" />
        <p className="font-bold">Advanced telemetry charts will appear here.</p>
      </div>
    </div>
  );
};
