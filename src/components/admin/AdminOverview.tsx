import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sliders, Activity, Users, ShieldCheck, MapPin } from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const { tourist, incidents, emergencyResources, guides, geoZones } = useApp();

  // Basic KPI calculations
  const totalTourists = 42;
  const safeTourists = tourist.safetyTier === 'SAFE' ? 39 : 38;
  const moderateTourists = tourist.safetyTier === 'MODERATE' ? 4 : 3;
  const highRiskTourists = tourist.safetyTier === 'HIGH' ? 2 : 1;
  const criticalTourists = tourist.safetyTier === 'CRITICAL' ? 1 : 0;
  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED' && i.status !== 'CLOSED');
  const availableGuides = guides.filter(g => g.isAvailable).length;
  const rescueTeams = emergencyResources.filter(r => r.type === 'SDRF').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="p-6 sm:p-7 rounded-3xl glass-panel shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
              SYSTEM ADMINISTRATION
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">•</span>
            <span className="text-[11px] text-[var(--color-safe)] font-mono font-bold">SUPERADMIN CONSOLE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mt-1">
            System Overview
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed max-w-3xl">
            Live telemetry of tourists, active incidents, available responders, and zone status across the monitored regions.
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center">
          <Sliders className="w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#101510] border border-white/10 shadow-lg">
          <span className="text-xs text-[var(--text-muted)] uppercase font-bold block mb-1">Active Tourists</span>
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-[var(--text-primary)] opacity-80" />
            <p className="text-3xl font-extrabold font-mono text-[var(--text-primary)]">{totalTourists}</p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#101510] border border-white/10 shadow-lg">
          <span className="text-xs text-[var(--text-muted)] uppercase font-bold block mb-1">Open Incidents</span>
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-[var(--color-high)] opacity-80" />
            <p className="text-3xl font-extrabold font-mono text-[var(--color-high)]">{activeIncidents.length}</p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#101510] border border-white/10 shadow-lg">
          <span className="text-xs text-[var(--text-muted)] uppercase font-bold block mb-1">Available Guides</span>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#60A5FA] opacity-80" />
            <p className="text-3xl font-extrabold font-mono text-[#60A5FA]">{availableGuides}</p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#101510] border border-white/10 shadow-lg">
          <span className="text-xs text-[var(--text-muted)] uppercase font-bold block mb-1">Rescue Teams</span>
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-[var(--color-critical)] opacity-80" />
            <p className="text-3xl font-extrabold font-mono text-[var(--color-critical)]">{rescueTeams}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-[10px] text-[var(--text-muted)] uppercase block">Safe / Normal</span>
          <p className="font-bold text-xl text-[var(--color-safe)] mt-1">{safeTourists}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-[10px] text-[var(--text-muted)] uppercase block">Moderate Risk</span>
          <p className="font-bold text-xl text-[var(--color-moderate)] mt-1">{moderateTourists}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-[10px] text-[var(--text-muted)] uppercase block">High Risk</span>
          <p className="font-bold text-xl text-[var(--color-high)] mt-1">{highRiskTourists}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-[10px] text-[var(--text-muted)] uppercase block">Critical</span>
          <p className="font-bold text-xl text-[var(--color-critical)] mt-1">{criticalTourists}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#101510] border border-white/10">
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">High-Risk Zones</h3>
          <div className="space-y-3">
            {geoZones.filter(z => z.riskBase > 50).map(z => (
              <div key={z.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-xs font-bold text-[var(--text-primary)]">{z.id}</span>
                </div>
                <span className="text-xs font-mono text-[#F59E0B]">Risk: {z.riskBase}/100</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#101510] border border-white/10">
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            <div className="p-3 bg-white/5 rounded-xl border border-[var(--color-critical)]/30">
              <p className="text-xs text-[var(--color-critical)] font-bold">SOS Triggered in Shillong Urban Center</p>
              <span className="text-[10px] text-[var(--text-muted)]">2 mins ago</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-[#F59E0B]/30">
              <p className="text-xs text-[#F59E0B] font-bold">Weather Advisory Issued</p>
              <span className="text-[10px] text-[var(--text-muted)]">15 mins ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
