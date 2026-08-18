import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, AlertOctagon, ExternalLink, ChevronRight } from 'lucide-react';
import { Incident } from '../../types';

export const AuthorityIncidents: React.FC = () => {
  const { incidents, activeIncident, setActiveIncident, handleGuideUpdateStatus } = useApp();
  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED' && i.status !== 'CLOSED');
  const currentSelected = activeIncident || incidents[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 p-5 rounded-2xl bg-[var(--bg-primary)] border border-white/10 shadow-lg">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-critical)]/20 flex items-center justify-center text-[var(--color-critical)]">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Incidents & Response</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Manage and dispatch emergency services for active incidents.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-[#101510] border border-white/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              ACTIVE INCIDENT QUEUE ({activeIncidents.length})
            </h4>

            <div className="space-y-2">
              {incidents.slice(0, 5).map(inc => {
                const isSelected = currentSelected?.id === inc.id;
                return (
                  <div
                    key={inc.id}
                    onClick={() => setActiveIncident(inc)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-[var(--surface-elevated)] border-[var(--accent-primary)]/60 shadow-md'
                        : 'bg-[var(--bg-primary)] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`p-1.5 rounded-lg shrink-0 ${
                        inc.severity === 'CRITICAL' ? 'bg-[var(--color-critical)]/20 text-[var(--color-critical)]' :
                        inc.severity === 'HIGH' ? 'bg-[var(--color-high)]/20 text-[var(--color-high)]' :
                        'bg-[var(--color-moderate)]/20 text-[var(--color-moderate)]'
                      }`}>
                        <AlertOctagon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-[var(--text-primary)] truncate">{inc.id} — {inc.touristName}</h5>
                        <p className="text-[10px] text-[var(--text-muted)] truncate">{inc.locationName}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">{inc.status}</span>
                      <ChevronRight className="w-3 h-3 text-[var(--text-muted)] mt-1 ml-auto" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="lg:col-span-7">
          {currentSelected ? (
            <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-white/10 space-y-5 h-full">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{currentSelected.id}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{currentSelected.description || 'Emergency SOS Triggered'}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  currentSelected.severity === 'CRITICAL' ? 'bg-[var(--color-critical)] text-white' :
                  currentSelected.severity === 'HIGH' ? 'bg-[var(--color-high)] text-white' :
                  'bg-[var(--color-moderate)] text-[#101510]'
                }`}>
                  {currentSelected.severity}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-[var(--text-muted)] uppercase block mb-1">Tourist</span>
                  <p className="font-bold text-[var(--text-primary)]">{currentSelected.touristName}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-[var(--text-muted)] uppercase block mb-1">Location</span>
                  <p className="font-bold text-[var(--text-primary)]">{currentSelected.locationName}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button 
                  onClick={() => {
                    handleGuideUpdateStatus(currentSelected.id, 'RESPONDER_DISPATCHED');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[var(--color-critical)] text-white text-sm font-bold shadow-lg shadow-[var(--color-critical)]/20 hover:bg-[#ff4d4d] transition-all"
                >
                  Dispatch SDRF Unit
                </button>
                <button 
                  onClick={() => {
                    alert(`Viewing full dossier for incident: ${currentSelected.id}\nTourist: ${currentSelected.touristName}\nLocation: ${currentSelected.locationName}`);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white/10 text-[var(--text-primary)] text-sm font-bold hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> View Full Dossier
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-[var(--bg-primary)] border border-white/10 flex flex-col items-center justify-center text-[var(--text-muted)] h-full">
              <p>Select an incident from the queue to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
