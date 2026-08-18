import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, ShieldAlert, AlertOctagon, ExternalLink, CheckCircle2, ChevronRight, User, Navigation, Check } from 'lucide-react';

export const AdminCommandCenter: React.FC = () => {
  const { incidents, activeIncident, setActiveIncident, handleGuideUpdateStatus } = useApp();
  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED' && i.status !== 'CLOSED');
  const currentSelected = activeIncident || incidents[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 p-5 rounded-2xl bg-[var(--bg-primary)] border border-white/10 shadow-lg">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-critical)]/20 flex items-center justify-center text-[var(--color-critical)]">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Command Center</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">SuperAdmin Emergency Dispatch and Response Console.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Queue */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-[#101510] border border-white/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              ACTIVE SOS REQUESTS ({activeIncidents.length})
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
                        ? 'bg-[var(--surface-elevated)] border-[var(--color-critical)]/60 shadow-md'
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
                        <h5 className="text-xs font-bold text-[var(--text-primary)] truncate">{inc.id}</h5>
                        <p className="text-[10px] text-[var(--text-muted)] truncate">{inc.touristName}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-[var(--text-muted)] block">{inc.status}</span>
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
            <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--color-critical)]/20 space-y-5 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-critical)]/5 blur-3xl rounded-full" />
              
              <div className="flex items-start justify-between relative z-10">
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

              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase block mb-1">Tourist Name</span>
                  <p className="font-bold text-[var(--text-primary)] text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-[var(--text-muted)]" /> {currentSelected.touristName}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase block mb-1">Location</span>
                  <p className="font-bold text-[var(--text-primary)] text-sm flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-[#60A5FA]" /> {currentSelected.locationName}
                  </p>
                </div>
              </div>

              {/* Verified Badges replacing Quantum/Blockchain dashboards */}
              <div className="flex flex-col sm:flex-row gap-3 py-2 relative z-10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-safe)]/10 border border-[var(--color-safe)]/20 text-[var(--color-safe)] text-[10px] font-bold uppercase tracking-wider">
                  <Check className="w-3 h-3" /> Response Optimization: Active
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#60A5FA]/10 border border-[#60A5FA]/20 text-[#60A5FA] text-[10px] font-bold uppercase tracking-wider">
                  <Check className="w-3 h-3" /> Incident Record Secured
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#C084FC]/10 border border-[#C084FC]/20 text-[#C084FC] text-[10px] font-bold uppercase tracking-wider">
                  <Check className="w-3 h-3" /> Identity Verified
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#101510] border border-white/10 space-y-3 relative z-10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Assigned Responder</span>
                  <span className="font-bold text-[var(--text-primary)]">{currentSelected.assignedGuideId || 'Pending Assignment'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Responder ETA</span>
                  <span className="font-bold text-[#60A5FA]">~4 Minutes</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Incident Status</span>
                  <span className="font-bold text-[var(--color-high)]">{currentSelected.status}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 relative z-10">
                <button 
                  onClick={() => handleGuideUpdateStatus(currentSelected.id, 'RESPONDER_DISPATCHED')}
                  className="w-full sm:flex-1 px-5 py-3 rounded-xl bg-[#ff3030] text-white text-xs font-bold shadow-lg shadow-[var(--color-critical)]/20 hover:bg-[#ff4d4d] transition-all"
                >
                  Assign Responder
                </button>
                <button 
                  onClick={() => handleGuideUpdateStatus(currentSelected.id, 'RESOLVED')}
                  className="w-full sm:flex-1 px-5 py-3 rounded-xl bg-[var(--color-safe)] text-[#101510] text-xs font-bold shadow-lg shadow-[var(--color-safe)]/20 hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Resolve Incident
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-[var(--bg-primary)] border border-white/10 flex flex-col items-center justify-center text-[var(--text-muted)] h-full">
              <p>Select an incident to manage dispatch.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
