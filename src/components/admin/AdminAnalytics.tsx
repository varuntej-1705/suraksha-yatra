import React from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, Activity, Users, MapPin, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { incidents, geoZones } = useApp();

  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED' && i.status !== 'CLOSED');
  const resolvedIncidents = incidents.filter(i => i.status === 'RESOLVED' || i.status === 'CLOSED');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 p-5 rounded-2xl bg-[var(--bg-primary)] border border-white/10 shadow-lg">
        <div className="w-12 h-12 rounded-xl bg-[#60A5FA]/20 flex items-center justify-center text-[#60A5FA]">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Analytics & Reports</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Simple, understandable metrics on system performance and incident trends.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Incident Resolution */}
        <div className="p-6 rounded-2xl bg-[#101510] border border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <ShieldAlert className="w-5 h-5 text-[var(--color-safe)]" />
            <h3 className="font-bold text-[var(--text-primary)]">Incident Resolution</h3>
          </div>
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-3xl font-bold text-[var(--color-safe)]">{resolvedIncidents.length}</p>
              <span className="text-xs text-[var(--text-muted)] uppercase">Resolved</span>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[var(--color-high)]">{activeIncidents.length}</p>
              <span className="text-xs text-[var(--text-muted)] uppercase">Active</span>
            </div>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mt-4 flex">
            <div className="h-full bg-[var(--color-safe)]" style={{ width: '80%' }}></div>
            <div className="h-full bg-[var(--color-high)]" style={{ width: '20%' }}></div>
          </div>
        </div>

        {/* Average Response Time */}
        <div className="p-6 rounded-2xl bg-[#101510] border border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <Activity className="w-5 h-5 text-[#60A5FA]" />
            <h3 className="font-bold text-[var(--text-primary)]">Average Response Time</h3>
          </div>
          <div className="text-center mt-6">
            <p className="text-5xl font-extrabold font-mono text-[#60A5FA]">4.2<span className="text-2xl">m</span></p>
            <p className="text-xs text-[var(--text-muted)] mt-2">Consistently beating the 8-minute SLA target.</p>
          </div>
        </div>

        {/* Most Risky Locations */}
        <div className="p-6 rounded-2xl bg-[#101510] border border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <MapPin className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="font-bold text-[var(--text-primary)]">Most Risky Locations</h3>
          </div>
          <div className="space-y-4">
            {geoZones.sort((a, b) => b.riskBase - a.riskBase).slice(0, 3).map((zone, idx) => (
              <div key={zone.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-[var(--text-muted)] font-bold">#{idx + 1}</span>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{zone.name}</span>
                </div>
                <span className="text-xs font-mono text-[#F59E0B]">{zone.riskBase} Risk</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#101510] border border-white/10">
        <h3 className="font-bold text-[var(--text-primary)] mb-4">Recent Automated Reports</h3>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-white/5 flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-safe)]" />
              <div>
                <p className="text-sm font-bold text-[var(--text-primary)]">Weekly Tourist Safety Summary</p>
                <p className="text-xs text-[var(--text-muted)]">Generated automatically by analytics engine</p>
              </div>
            </div>
            <button className="text-xs px-4 py-2 rounded-lg bg-[var(--color-safe)]/10 text-[var(--color-safe)] font-bold">Download PDF</button>
          </div>
          <div className="p-4 rounded-xl bg-white/5 flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-safe)]" />
              <div>
                <p className="text-sm font-bold text-[var(--text-primary)]">SDRF Dispatch Efficiency Report</p>
                <p className="text-xs text-[var(--text-muted)]">Generated automatically by analytics engine</p>
              </div>
            </div>
            <button className="text-xs px-4 py-2 rounded-lg bg-[var(--color-safe)]/10 text-[var(--color-safe)] font-bold">Download PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};
