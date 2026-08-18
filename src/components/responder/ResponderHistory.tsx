import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, CheckCircle2, Clock, MapPin, FileText } from 'lucide-react';

export const ResponderHistory: React.FC = () => {
  const { incidents } = useApp();
  
  // Show only resolved or closed incidents for history
  const historyIncidents = incidents.filter(i => i.status === 'RESOLVED' || i.status === 'CLOSED');

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 p-5 rounded-2xl bg-[var(--bg-primary)] border border-white/10 shadow-lg">
        <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] border border-white/10 flex items-center justify-center text-[var(--text-primary)]">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Response History</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Audit log of all resolved emergency responses and dispatched operations.</p>
        </div>
      </div>

      <div className="space-y-4">
        {historyIncidents.length === 0 ? (
          <div className="p-8 text-center bg-[var(--bg-primary)] rounded-2xl border border-white/10">
            <CheckCircle2 className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3 opacity-50" />
            <h3 className="text-[var(--text-primary)] font-bold text-lg">No Past Incidents</h3>
            <p className="text-[var(--text-secondary)] text-sm">Your response history is clean.</p>
          </div>
        ) : (
          historyIncidents.map(inc => (
            <div key={inc.id} className="p-5 rounded-2xl bg-[#140D0D] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-safe)]/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-safe)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[var(--text-primary)]">{inc.id}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-safe)]/20 text-[var(--color-safe)] border border-[var(--color-safe)]/30">
                      RESOLVED
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] font-medium">Tourist: {inc.touristName}</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {inc.locationName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 md:text-right">
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Severity</p>
                  <p className={`text-xs font-bold mt-0.5 ${inc.severity === 'CRITICAL' ? 'text-[var(--color-critical)]' : 'text-[var(--color-high)]'}`}>
                    {inc.severity}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Response Time</p>
                  <p className="text-xs font-bold text-[var(--text-primary)] mt-0.5 flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3 text-[#60A5FA]" /> ~6 Min
                  </p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold transition-all">
                  View Report
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
