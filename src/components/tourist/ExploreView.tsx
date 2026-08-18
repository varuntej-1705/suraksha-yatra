import React from 'react';
import { InteractiveSafetyMap } from '../map/InteractiveSafetyMap';
import { SafetyNetwork } from './SafetyNetwork';

export const ExploreView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-[var(--bg-primary)] border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--color-safe)] uppercase tracking-wider">
              REAL-TIME COMMAND RADAR
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">•</span>
            <span className="text-[11px] text-[var(--text-secondary)]">Meghalaya Tourism Corridor</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] mt-1">
            Explore & Safety Map
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 text-[var(--color-safe)] font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-safe)] animate-pulse" />
            GPS ACTIVE
          </span>
        </div>
      </div>

      {/* Map Section */}
      <InteractiveSafetyMap heightClass="h-[calc(100vh-22rem)] min-h-[400px]" />

      {/* Safety Network Section (Nearby Help, Resources) */}
      <div className="pt-4 border-t border-white/10">
        <SafetyNetwork />
      </div>
    </div>
  );
};
