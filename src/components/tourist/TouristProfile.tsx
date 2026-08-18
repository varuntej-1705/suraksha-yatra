import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Bell, Lock, UserCheck } from 'lucide-react';
import { DigitalIdCard } from './DigitalIdCard';

export const TouristProfile: React.FC = () => {
  const { tourist, addToast } = useApp();
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Profile & Settings</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Manage your account and safety preferences.</p>
      </div>

      {/* Digital Safety Pass embedded here */}
      <div className="pt-2">
        <DigitalIdCard />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
          onClick={() => addToast({ title: 'Personal Information', description: 'Personal Information settings are locked in demo mode.', type: 'INFO' })}
          className="p-4 rounded-2xl bg-[var(--bg-primary)] hover:bg-[var(--surface-elevated)] border border-white/5 flex items-center gap-3 transition-all"
        >
          <UserCheck className="w-5 h-5 text-[#C084FC]" />
          <div className="text-left">
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">Personal Information</h4>
            <p className="text-xs text-[var(--text-secondary)]">Update profile details</p>
          </div>
        </button>
        <button 
          onClick={() => addToast({ title: 'Privacy & Sharing', description: 'Privacy settings are locked in demo mode.', type: 'INFO' })}
          className="p-4 rounded-2xl bg-[var(--bg-primary)] hover:bg-[var(--surface-elevated)] border border-white/5 flex items-center gap-3 transition-all"
        >
          <Shield className="w-5 h-5 text-[var(--accent-primary)]" />
          <div className="text-left">
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">Privacy & Sharing</h4>
            <p className="text-xs text-[var(--text-secondary)]">Manage location sharing</p>
          </div>
        </button>
        <button 
          onClick={() => addToast({ title: 'Notifications', description: 'Notification preferences are locked in demo mode.', type: 'INFO' })}
          className="p-4 rounded-2xl bg-[var(--bg-primary)] hover:bg-[var(--surface-elevated)] border border-white/5 flex items-center gap-3 transition-all"
        >
          <Bell className="w-5 h-5 text-[#60A5FA]" />
          <div className="text-left">
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">Notifications</h4>
            <p className="text-xs text-[var(--text-secondary)]">Alert preferences</p>
          </div>
        </button>
        <button 
          onClick={() => addToast({ title: 'Security', description: 'Security settings are locked in demo mode.', type: 'INFO' })}
          className="p-4 rounded-2xl bg-[var(--bg-primary)] hover:bg-[var(--surface-elevated)] border border-white/5 flex items-center gap-3 transition-all"
        >
          <Lock className="w-5 h-5 text-[var(--text-primary)]" />
          <div className="text-left">
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">Security</h4>
            <p className="text-xs text-[var(--text-secondary)]">Password and auth</p>
          </div>
        </button>
      </div>
    </div>
  );
};
