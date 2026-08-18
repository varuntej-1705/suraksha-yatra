import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  MapPin, 
  Navigation,
  Clock,
  User,
  AlertTriangle,
  AlertCircle,
  Activity
} from 'lucide-react';

export const ResponderView: React.FC = () => {
  const { incidents, handleGuideUpdateStatus } = useApp();
  
  // Filter for only active/open incidents
  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED' && i.status !== 'CLOSED');

  const getSeverityStyle = (severity: string) => {
    switch(severity) {
      case 'CRITICAL': return 'border-[#ff3030] bg-[#1a0d0d] shadow-[0_0_15px_rgba(255,48,48,0.2)]';
      case 'HIGH': return 'border-[#F59E0B] bg-[#1a140d]';
      case 'MODERATE': return 'border-[#F5C84C] bg-[#1a1a0d]';
      default: return 'border-[#4ADE80] bg-[#0d1a10]';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case 'CRITICAL': return <AlertTriangle className="w-5 h-5 text-[#ff3030]" />;
      case 'HIGH': return <AlertCircle className="w-5 h-5 text-[#F59E0B]" />;
      case 'MODERATE': return <Activity className="w-5 h-5 text-[#F5C84C]" />;
      default: return <ShieldAlert className="w-5 h-5 text-[#4ADE80]" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'CRITICAL': return 'text-[#ff3030]';
      case 'HIGH': return 'text-[#F59E0B]';
      case 'MODERATE': return 'text-[#F5C84C]';
      default: return 'text-[#4ADE80]';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-[var(--bg-primary)] border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#ff3030] uppercase tracking-wider">
              EMERGENCY QUEUE
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">•</span>
            <span className="text-[11px] text-[var(--text-secondary)] font-mono">SDRF CONSOLE</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">
            Incoming SOS Requests
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-[var(--color-safe)]/15 border border-[var(--color-safe)]/30 text-[var(--color-safe)] font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-safe)] animate-pulse" />
            {activeIncidents.length} ACTIVE
          </span>
        </div>
      </div>

      {/* Emergency Cards List */}
      <div className="space-y-4">
        {activeIncidents.length === 0 ? (
          <div className="p-8 text-center bg-[var(--bg-primary)] rounded-2xl border border-white/10">
            <ShieldAlert className="w-12 h-12 text-[var(--color-safe)] mx-auto mb-3 opacity-80" />
            <h3 className="text-[var(--text-primary)] font-bold text-lg">No Active Emergencies</h3>
            <p className="text-[var(--text-secondary)] text-sm">The queue is currently clear.</p>
          </div>
        ) : (
          activeIncidents.map(inc => (
            <div key={inc.id} className={`p-6 rounded-2xl border-2 transition-all ${getSeverityStyle(inc.severity)}`}>
              <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-white/5`}>
                    {getSeverityIcon(inc.severity)}
                  </div>
                  <div>
                    <h3 className={`text-sm font-extrabold uppercase tracking-widest ${getSeverityColor(inc.severity)}`}>
                      {inc.severity}-RISK INCIDENT
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">{inc.id}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] uppercase block">Tourist</span>
                      <span className="font-semibold text-[var(--text-primary)]">{inc.touristName}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] uppercase block">Location</span>
                      <span className="font-semibold text-[var(--text-primary)]">{inc.locationName}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] uppercase block">Reason</span>
                      <span className="font-semibold text-[var(--text-primary)]">{inc.description || 'Emergency SOS triggered'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:pl-6 sm:border-l border-white/10">
                  <div className="flex items-start gap-3">
                    <Navigation className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] uppercase block">Nearest Responder</span>
                      <span className="font-semibold text-[var(--text-primary)]">1.8 km</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] uppercase block">ETA</span>
                      <span className="font-bold text-[var(--color-safe)] font-mono text-base">4 min</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button 
                  onClick={() => handleGuideUpdateStatus(inc.id, 'ASSISTANCE_PROVIDED')}
                  className={`w-full sm:flex-1 py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all text-white shadow-lg ${
                    inc.severity === 'CRITICAL' ? 'bg-[#ff3030] hover:bg-[#ff4d4d] shadow-[#ff3030]/25' :
                    inc.severity === 'HIGH' ? 'bg-[#F59E0B] hover:bg-[#FCD34D] shadow-[#F59E0B]/25' :
                    'bg-[#60A5FA] hover:bg-[#93C5FD] shadow-[#60A5FA]/25'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Accept Response</span>
                </button>

                <button className="w-full sm:flex-1 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 font-bold text-xs flex items-center justify-center gap-2 transition-all text-[var(--text-primary)]">
                  <MapPin className="w-4 h-4 text-[var(--text-muted)]" />
                  <span>View Location</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
