import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, CloudSun } from 'lucide-react';

export const AlertsView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Alerts</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Important updates about your route and safety.</p>
      </div>
      
      <div className="space-y-3">
        <div className="p-4 rounded-2xl glass-panel border-l-4 border-[var(--color-moderate)]">
          <div className="flex gap-3">
            <CloudSun className="w-6 h-6 text-[var(--color-moderate)] shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Weather Update</h4>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Light rain expected in your area over the next 2 hours. Drive safely.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
