import React from 'react';
import { GuideFinder } from './GuideFinder';
import { AlertsView } from './AlertsView';
import { Shield, Bell } from 'lucide-react';

export const AssistanceView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 p-5 rounded-2xl bg-[var(--bg-primary)] border border-white/10 shadow-lg">
        <div className="w-12 h-12 rounded-xl bg-[#C084FC]/20 flex items-center justify-center text-[#C084FC]">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Assistance & Support</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Get nearby help, hire verified guides, and stay informed with active alerts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* Left Column: Guides & Responders */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[var(--color-safe)]" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Nearby Help</h3>
          </div>
          <GuideFinder />
        </div>

        {/* Right Column: Alerts */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#F5C84C]" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Active Alerts</h3>
          </div>
          <AlertsView />
        </div>
      </div>
    </div>
  );
};
