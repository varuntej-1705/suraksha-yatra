import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CandidateRoute } from '../../types';
import { 
  Compass, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  CloudRain, 
  Wifi, 
  Clock, 
  Navigation, 
  Check, 
  Sparkles,
  Mountain
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export const MyTripView: React.FC = () => {
  const { trip, weather, tourist, addToast } = useApp();
  const [selectedRoute, setSelectedRoute] = useState<CandidateRoute>(trip.selectedRoute);

  const handleSelectRoute = (route: CandidateRoute) => {
    soundEffects.playSafeChime();
    setSelectedRoute(route);
    addToast({
      title: 'Route Updated',
      description: `Active corridor switched to: ${route.name}`,
      type: route.safetyTier === 'SAFE' ? 'SAFE' : 'CAUTION'
    });
  };

  const allRoutes = [trip.selectedRoute, ...trip.alternativeRoutes];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      {/* 1. Trip Header Card */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                MY TRIP
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">•</span>
              <span className="text-[11px] text-[var(--text-secondary)] font-mono">{trip.id}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mt-1">{trip.title}</h2>
            <div className="flex items-center gap-2 mt-2 text-xs text-[var(--text-secondary)]">
              <MapPin className="w-4 h-4 text-[var(--color-safe)]" />
              <span className="text-[var(--text-primary)] font-medium">{trip.origin}</span>
              <span className="text-[var(--text-muted)]">➔</span>
              <span className="text-[var(--text-primary)] font-medium">{trip.destination}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-left sm:text-right p-3 rounded-2xl bg-white/[0.03] border border-white/5">
              <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Trip Dates</p>
              <p className="text-xs font-mono font-bold text-[var(--text-primary)] mt-0.5">{trip.startDate} — {trip.endDate}</p>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <div className="flex justify-between text-xs text-[var(--text-secondary)] mb-2">
            <span>Trip Progress</span>
            <span className="font-bold text-[var(--color-safe)]">{trip.currentProgressPct}% Completed</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--color-safe)] rounded-full transition-all duration-500"
              style={{ width: `${trip.currentProgressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Weather & Terrain Condition Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weather Card */}
        <div className="p-5 sm:p-6 rounded-3xl glass-panel shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#60A5FA]/15 flex items-center justify-center text-[#60A5FA]">
                <CloudRain className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Weather Conditions</h3>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#60A5FA]/15 text-[#60A5FA] border border-[#60A5FA]/30 font-bold">
              {weather.condition}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 my-3.5 text-center">
            <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] text-[var(--text-muted)] block">Temperature</span>
              <p className="text-sm font-mono font-bold text-[var(--text-primary)] mt-0.5">{weather.tempC}°C</p>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] text-[var(--text-muted)] block">Humidity</span>
              <p className="text-sm font-mono font-bold text-[var(--text-primary)] mt-0.5">{weather.humidityPct}%</p>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] text-[var(--text-muted)] block">Visibility</span>
              <p className="text-sm font-mono font-bold text-[var(--text-primary)] mt-0.5">{weather.visibilityKm} km</p>
            </div>
          </div>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            💡 {weather.advisory}
          </p>
        </div>

        {/* Safety-Aware Algorithm Explanation */}
        <div className="p-5 sm:p-6 rounded-3xl glass-panel shadow-lg border border-[#A78BFA]/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#A78BFA]/15 flex items-center justify-center text-[#A78BFA]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Safety-First Routing</h3>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#A78BFA]/15 text-[#C084FC] font-bold">
              Smart Travel
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Our system continually checks the safest routes based on current conditions:
          </p>
          <div className="grid grid-cols-2 gap-2 mt-3 text-[11px]">
            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-[var(--text-primary)]">
              ✓ Police Presence
            </div>
            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-[var(--text-primary)]">
              ✓ Cell Coverage
            </div>
            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-[var(--text-primary)]">
              ✓ Weather Safety
            </div>
            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-[var(--text-primary)]">
              ✓ Guide Availability
            </div>
          </div>
        </div>
      </div>

      {/* 3. Candidate Routes Comparison */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">Route Options</h3>
            <p className="text-xs text-[var(--text-muted)]">Select a recommended safe route</p>
          </div>
        </div>

        <div className="space-y-3">
          {allRoutes.map((route) => {
            const isSelected = selectedRoute.id === route.id;
            return (
              <div
                key={route.id}
                onClick={() => handleSelectRoute(route)}
                className={`p-5 rounded-3xl glass-panel border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[var(--accent-primary)]/60 shadow-xl shadow-[var(--accent-primary)]/10 ring-1 ring-[var(--accent-primary)]/30'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className={`p-3 rounded-2xl border shrink-0 ${
                      route.safetyTier === 'SAFE' ? 'bg-[var(--surface-elevated)] border-[var(--color-safe)]/40 text-[var(--color-safe)]' :
                      route.safetyTier === 'MODERATE' ? 'bg-[var(--surface-elevated)] border-[var(--color-moderate)]/40 text-[var(--color-moderate)]' :
                      'bg-[var(--surface-elevated)] border-[var(--color-high)]/40 text-[var(--color-high)]'
                    }`}>
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-[var(--text-primary)]">{route.name}</h4>
                        {route.isRecommended && (
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--color-safe)]/15 border border-[var(--color-safe)]/40 text-[var(--color-safe)] font-bold">
                            AI RECOMMENDED
                          </span>
                        )}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${
                          route.safetyTier === 'SAFE' ? 'bg-[var(--color-safe)]/15 text-[var(--color-safe)] border-[var(--color-safe)]/30' :
                          route.safetyTier === 'MODERATE' ? 'bg-[var(--color-moderate)]/15 text-[var(--color-moderate)] border-[var(--color-moderate)]/30' :
                          'bg-[var(--color-high)]/15 text-[var(--color-high)] border-[var(--color-high)]/30'
                        }`}>
                          Risk Score: {route.riskScore}/100 ({route.safetyTier})
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                        {route.description}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Badge Group */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-[var(--text-muted)] block font-semibold">Distance</span>
                        <span className="text-xs font-mono font-bold text-[var(--text-primary)]">{route.distanceKm} km</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[var(--text-muted)] block font-semibold">Duration</span>
                        <span className="text-xs font-mono font-bold text-[var(--text-primary)]">{route.durationMinutes} min</span>
                      </div>
                    </div>

                    <button
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] shadow-sm shadow-[var(--accent-primary)]/30'
                          : 'bg-white/5 hover:bg-white/10 text-[var(--text-primary)] border border-white/10'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                      <span>{isSelected ? 'Active Route' : 'Select Route'}</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Metrics Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/5 text-[11px] text-[var(--text-secondary)]">
                  <div className="flex items-center gap-1.5">
                    <Mountain className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>Terrain: <strong className="text-[var(--text-primary)]">{route.terrainQuality}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-[#60A5FA]" />
                    <span>Cell: <strong className="text-[var(--text-primary)]">{route.networkStrength}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-safe)]" />
                    <span>Police: <strong className="text-[var(--text-primary)]">{route.emergencyCoverage}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[var(--color-moderate)]" />
                    <span>ETA: <strong className="text-[var(--text-primary)]">{route.durationMinutes} min</strong></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
