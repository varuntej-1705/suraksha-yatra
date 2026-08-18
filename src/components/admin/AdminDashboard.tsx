import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GeoZone } from '../../types';
import { 
  Sliders, 
  MapPin, 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Check, 
  AlertTriangle, 
  Layers, 
  Users, 
  Settings,
  Sparkles
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export const AdminDashboard: React.FC = () => {
  const { geoZones, setGeoZones, guides, emergencyResources, addToast } = useApp();
  const [selectedZone, setSelectedZone] = useState<GeoZone | null>(geoZones[0]);

  const handleUpdateZoneRisk = (zoneId: string, newRisk: number) => {
    soundEffects.playSafeChime();
    setGeoZones(prev => prev.map(z => z.id === zoneId ? { ...z, riskBase: newRisk } : z));
    addToast({
      title: 'Geo-Fence Base Risk Updated',
      description: `Zone ${zoneId} base risk calibrated to ${newRisk} pts.`,
      type: 'INFO'
    });
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Header */}
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
            Geo-Fence & Safety Policy Manager
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed max-w-3xl">
            Configure risk thresholds, geo-fence polygon boundaries, guide accreditation, and emergency resource nodes across the state of Meghalaya.
          </p>
        </div>
      </div>

      {/* Geo-Fence Zone Management Table */}
      <div className="rounded-3xl glass-panel overflow-hidden shadow-2xl space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">Active Meghalaya Geo-Zones ({geoZones.length})</h3>
            <p className="text-xs text-[var(--text-muted)]">Live polygons monitored by explainable AI engine</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {geoZones.map(zone => (
            <div
              key={zone.id}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[var(--accent-primary)]/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }} />
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">{zone.name}</h4>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  zone.safetyTier === 'SAFE' ? 'bg-[var(--color-safe)]/15 text-[var(--color-safe)] border-[var(--color-safe)]/30' :
                  zone.safetyTier === 'MODERATE' ? 'bg-[var(--color-moderate)]/15 text-[var(--color-moderate)] border-[var(--color-moderate)]/30' :
                  zone.safetyTier === 'HIGH' ? 'bg-[var(--color-high)]/15 text-[var(--color-high)] border-[var(--color-high)]/30' :
                  'bg-[var(--color-critical)]/15 text-[var(--color-critical)] border-[var(--color-critical)]/30'
                }`}>
                  {zone.safetyTier}
                </span>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {zone.advisory}
              </p>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] font-medium">Base Risk Offset:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[var(--text-primary)]">{zone.riskBase} pts</span>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={zone.riskBase}
                    onChange={e => handleUpdateZoneRisk(zone.id, parseInt(e.target.value))}
                    className="w-24 accent-[var(--accent-primary)] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Accreditation & Audit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Guides Overview */}
        <div className="p-6 rounded-3xl glass-panel space-y-3">
          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)]">Verified Eco-Guide Directory</h4>
          <div className="space-y-2">
            {guides.map(g => (
              <div key={g.id} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img src={g.avatarUrl} alt={g.fullName} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">{g.fullName}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{g.badgeNumber} • {g.languages.join(', ')}</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--accent-primary)]/15 text-[var(--color-safe)] font-semibold">
                  {g.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Resources */}
        <div className="p-6 rounded-3xl glass-panel space-y-3">
          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)]">Emergency Facilities & Trauma Hubs</h4>
          <div className="space-y-2">
            {emergencyResources.map(r => (
              <div key={r.id} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[var(--text-primary)]">{r.name}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{r.locationName} • {r.type}</p>
                </div>
                <span className="text-[10px] font-mono text-[#60A5FA]">
                  {r.contactNumber}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
