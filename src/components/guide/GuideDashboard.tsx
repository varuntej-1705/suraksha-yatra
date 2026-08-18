import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HeartHandshake, 
  ShieldCheck, 
  MapPin, 
  Navigation2, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Compass,
  Star
} from 'lucide-react';
import { InteractiveSafetyMap } from '../map/InteractiveSafetyMap';
import { soundEffects } from '../../utils/audio';

export const GuideDashboard: React.FC = () => {
  const { 
    guides, 
    tourist, 
    incidents, 
    handleGuideAcceptIncident, 
    handleGuideRejectIncident, 
    handleGuideUpdateStatus,
    setActiveTab,
    addToast 
  } = useApp();

  const activeGuide = guides[0]; // Rahul Sharma
  const activeIncident = incidents.find(i => i.status !== 'RESOLVED' && i.status !== 'CLOSED');

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Guide Profile Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-primary)] border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={activeGuide.avatarUrl}
              alt={activeGuide.fullName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[var(--accent-primary)]/60 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[var(--bg-primary)] text-[var(--color-safe)]">
              <ShieldCheck className="w-4 h-4 fill-[var(--color-safe)] text-[var(--bg-primary)]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">{activeGuide.fullName}</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/40 text-[var(--color-safe)] font-mono">
                {activeGuide.badgeNumber}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">{activeGuide.specialization}</p>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-[var(--color-moderate)]">
              <Star className="w-3.5 h-3.5 fill-[var(--color-moderate)]" />
              <span className="font-bold">{activeGuide.rating}</span>
              <span className="text-[var(--text-muted)]">({activeGuide.reviewCount} verified reviews)</span>
              <span className="text-[var(--text-muted)]">•</span>
              <span className="text-[var(--color-safe)] font-semibold">Status: ON DUTY</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span className="text-[10px] text-[var(--text-muted)] block uppercase">Languages</span>
            <span className="font-medium text-[var(--text-primary)]">{activeGuide.languages.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* 2. Active Tourist Assistance Request Banner */}
      {activeIncident ? (
        <div className="p-5 sm:p-6 rounded-2xl bg-[#16120A] border-2 border-[var(--color-high)]/50 shadow-2xl space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-high)]/20 border border-[var(--color-high)] flex items-center justify-center text-[var(--color-high)]">
                <AlertTriangle className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-high)]">
                  URGENT ASSISTANCE DISPATCH
                </span>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {activeIncident.id} — {activeIncident.touristName}
                </h3>
              </div>
            </div>

            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--color-critical)]/20 text-[var(--color-critical)] border border-[var(--color-critical)]/40 font-mono">
              Severity: {activeIncident.severity}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-white/5">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">Location & Distance</span>
              <p className="font-bold text-[var(--text-primary)] mt-0.5">{activeIncident.locationName}</p>
              <p className="text-[11px] text-[var(--color-safe)]">~1.2 km from your position</p>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-white/5">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">AI Anomaly Reason</span>
              <p className="font-bold text-[var(--color-moderate)] mt-0.5">{activeIncident.type}</p>
              <p className="text-[11px] text-[var(--text-secondary)]">Route deviation + prolonged inactivity</p>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-white/5">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">Estimated Navigation ETA</span>
              <p className="font-bold text-[var(--color-safe)] font-mono text-sm mt-0.5">4 Minutes</p>
              <p className="text-[11px] text-[var(--text-secondary)]">Fastest terrain trail</p>
            </div>
          </div>

          {/* Guide Interactive Workflow Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            {activeIncident.status === 'DETECTED' || activeIncident.status === 'WARNING_SENT' || activeIncident.status === 'AWAITING_RESPONSE' || activeIncident.status === 'ESCALATED' || activeIncident.status === 'RESPONDER_ASSIGNED' ? (
              <>
                <button
                  id="guide-btn-accept-dispatch"
                  onClick={() => handleGuideAcceptIncident(activeIncident.id, activeGuide.id)}
                  className="w-full sm:flex-1 py-3 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--color-safe)] text-[var(--bg-primary)] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent-primary)]/25 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ACCEPT DISPATCH & START GPS NAVIGATION</span>
                </button>

                <button
                  onClick={() => handleGuideRejectIncident(activeIncident.id, activeGuide.id)}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[var(--text-secondary)] border border-white/10"
                >
                  Pass to Rescue Team
                </button>
              </>
            ) : activeIncident.status === 'RESPONDER_EN_ROUTE' ? (
              <button
                id="guide-btn-reached-tourist"
                onClick={() => handleGuideUpdateStatus(activeIncident.id, 'ASSISTANCE_PROVIDED')}
                className="w-full py-3 rounded-xl bg-[#60A5FA] hover:bg-[#93C5FD] text-[var(--bg-primary)] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#60A5FA]/25 transition-all"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>I HAVE REACHED TOURIST — RENDER ASSISTANCE</span>
              </button>
            ) : (
              <button
                id="guide-btn-resolve-incident"
                onClick={() => handleGuideUpdateStatus(activeIncident.id, 'RESOLVED')}
                className="w-full py-3 rounded-xl bg-[var(--color-safe)] hover:bg-[#86DFA0] text-[var(--bg-primary)] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-safe)]/25 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>MARK INCIDENT SAFELY RESOLVED (RETURNED TO HIGHWAY)</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-6 rounded-2xl bg-[#101510] border border-white/10 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--color-safe)] mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">All Monitored Tourists Safe</h3>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
            No active distress or anomaly tickets in your zone. Standing by on live GPS monitoring.
          </p>
        </div>
      )}

      {/* 3. Live Navigation Map */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">LIVE INCIDENT RESPONSE MAP</h3>
          <span className="text-xs text-[var(--accent-primary)] font-mono">Radar Active</span>
        </div>
        <InteractiveSafetyMap heightClass="h-[360px] sm:h-[420px]" />
      </div>
    </div>
  );
};
