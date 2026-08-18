import React from 'react';
import { useApp } from '../../context/AppContext';
import { InteractiveSafetyMap } from '../map/InteractiveSafetyMap';
import { MapPin, ShieldCheck } from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export const AdminMap: React.FC = () => {
  const { geoZones, setGeoZones, addToast } = useApp();

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
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 p-5 rounded-2xl bg-[var(--bg-primary)] border border-white/10 shadow-lg">
        <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--color-safe)]">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Geo-Zone & Safety Map</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Live interactive map and zone configuration tools.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-2xl bg-[#101510] border border-white/10">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 mb-3">
              <span>LIVE INTERACTIVE GEOMAP</span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-safe)] animate-pulse" />
            </h3>
            <InteractiveSafetyMap heightClass="h-[calc(100vh-20rem)] min-h-[500px]" />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#101510] border border-white/10 space-y-4 h-full">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-[var(--text-primary)]">Zone Configuration</h3>
              <span className="text-xs font-mono text-[var(--color-safe)]">{geoZones.length} ACTIVE ZONES</span>
            </div>

            <div className="space-y-4 overflow-y-auto pr-2 max-h-[calc(100vh-22rem)]">
              {geoZones.map(zone => (
                <div key={zone.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" style={{ backgroundColor: zone.color }} />
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

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    {zone.advisory}
                  </p>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)] font-medium">Base Risk Level:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[var(--text-primary)]">{zone.riskBase}/100</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={zone.riskBase}
                        onChange={e => handleUpdateZoneRisk(zone.id, parseInt(e.target.value))}
                        className="w-20 accent-[#60A5FA] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
