import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Hospital, Phone } from 'lucide-react';

export const SafetyNetwork: React.FC = () => {
  const { emergencyResources } = useApp();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Safety Network</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Nearby verified resources and emergency services.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {emergencyResources.map(res => (
          <div key={res.id} className="p-4 rounded-2xl glass-panel flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
                {res.type === 'POLICE' ? <ShieldCheck className="w-6 h-6 text-[var(--color-safe)]" /> : <Hospital className="w-6 h-6 text-[var(--color-critical)]" />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)]">{res.name}</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{res.type === 'POLICE' ? 'Police Station' : 'Hospital'} • Open 24/7</p>
                <p className="text-xs text-[var(--accent-primary)] mt-1 font-medium">1.2 km away</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-[var(--text-primary)] transition-all">
                Directions
              </button>
              <a href={`tel:${res.contactNumber}`} className="flex-1 py-2 rounded-xl bg-[var(--accent-primary)]/15 hover:bg-[var(--accent-primary)]/25 text-[var(--color-safe)] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all">
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
