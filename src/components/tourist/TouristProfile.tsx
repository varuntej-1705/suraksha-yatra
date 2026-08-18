import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Bell, Lock, UserCheck, ChevronLeft, ToggleRight, ToggleLeft } from 'lucide-react';
import { DigitalIdCard } from './DigitalIdCard';

export const TouristProfile: React.FC = () => {
  const { tourist, addToast } = useApp();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Dummy toggle states for UI
  const [toggles, setToggles] = useState({
    locSharing: true,
    searchVis: false,
    pushNotif: true,
    smsNotif: false,
    emailNotif: true,
    twoFactor: false
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    addToast({ title: 'Preference Updated', description: 'Your setting has been saved.', type: 'SAFE' });
  };

  const handleSave = () => {
    addToast({ title: 'Profile Updated', description: 'Changes have been securely saved.', type: 'SAFE' });
    setActiveSection(null);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Full Name</label>
                <input type="text" defaultValue={tourist.fullName} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Phone Number</label>
                <input type="text" defaultValue={tourist.phone} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Nationality</label>
                <input type="text" defaultValue={tourist.nationality} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Emergency Contact</label>
                <input type="text" defaultValue={tourist.emergencyContact} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
              </div>
            </div>
            <button onClick={handleSave} className="w-full mt-4 py-3 rounded-xl bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold shadow-lg hover:brightness-110 transition-all">
              Save Changes
            </button>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
              <div>
                <h4 className="font-semibold text-[var(--text-primary)]">Real-time Location Sharing</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Allow SDRF & Authorities to view your live GPS.</p>
              </div>
              <button onClick={() => toggle('locSharing')} className="text-[var(--accent-primary)]">
                {toggles.locSharing ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-[var(--text-muted)]" />}
              </button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
              <div>
                <h4 className="font-semibold text-[var(--text-primary)]">Public Search Visibility</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Let other verified guides find your profile.</p>
              </div>
              <button onClick={() => toggle('searchVis')} className="text-[var(--accent-primary)]">
                {toggles.searchVis ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-[var(--text-muted)]" />}
              </button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
              <div>
                <h4 className="font-semibold text-[var(--text-primary)]">Push Notifications</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Receive instant safety alerts on your device.</p>
              </div>
              <button onClick={() => toggle('pushNotif')} className="text-[#60A5FA]">
                {toggles.pushNotif ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-[var(--text-muted)]" />}
              </button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
              <div>
                <h4 className="font-semibold text-[var(--text-primary)]">SMS Alerts</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Get offline SMS messages for high-risk zones.</p>
              </div>
              <button onClick={() => toggle('smsNotif')} className="text-[#60A5FA]">
                {toggles.smsNotif ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-[var(--text-muted)]" />}
              </button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
              <div>
                <h4 className="font-semibold text-[var(--text-primary)]">Email Updates</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Weekly trip summaries and travel advisories.</p>
              </div>
              <button onClick={() => toggle('emailNotif')} className="text-[#60A5FA]">
                {toggles.emailNotif ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-[var(--text-muted)]" />}
              </button>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--text-primary)] transition-colors" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">New Password</label>
              <input type="password" placeholder="New Password" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--text-primary)] transition-colors" />
            </div>
            <div className="flex items-center justify-between p-4 mt-4 rounded-xl bg-[var(--color-safe)]/10 border border-[var(--color-safe)]/30">
              <div>
                <h4 className="font-semibold text-[var(--color-safe)]">Two-Factor Authentication</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Add an extra layer of security to your pass.</p>
              </div>
              <button onClick={() => toggle('twoFactor')} className="text-[var(--color-safe)]">
                {toggles.twoFactor ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-[var(--color-safe)]/50" />}
              </button>
            </div>
            <button onClick={handleSave} className="w-full mt-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/10">
              Update Security Settings
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Profile & Settings</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Manage your account and safety preferences.</p>
      </div>

      {!activeSection && (
        <div className="pt-2">
          <DigitalIdCard />
        </div>
      )}

      {activeSection ? (
        <div className="bg-[var(--bg-primary)] border border-[var(--panel-border)] rounded-3xl p-5 sm:p-6 shadow-xl">
          <button 
            onClick={() => setActiveSection(null)}
            className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors mb-6 text-sm font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Overview
          </button>
          {renderSectionContent()}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={() => setActiveSection('personal')}
            className="p-4 rounded-2xl bg-[var(--bg-primary)] hover:bg-[var(--surface-elevated)] border border-white/5 flex items-center gap-3 transition-all"
          >
            <UserCheck className="w-5 h-5 text-[#C084FC]" />
            <div className="text-left">
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">Personal Information</h4>
              <p className="text-xs text-[var(--text-secondary)]">Update profile details</p>
            </div>
          </button>
          <button 
            onClick={() => setActiveSection('privacy')}
            className="p-4 rounded-2xl bg-[var(--bg-primary)] hover:bg-[var(--surface-elevated)] border border-white/5 flex items-center gap-3 transition-all"
          >
            <Shield className="w-5 h-5 text-[var(--accent-primary)]" />
            <div className="text-left">
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">Privacy & Sharing</h4>
              <p className="text-xs text-[var(--text-secondary)]">Manage location sharing</p>
            </div>
          </button>
          <button 
            onClick={() => setActiveSection('notifications')}
            className="p-4 rounded-2xl bg-[var(--bg-primary)] hover:bg-[var(--surface-elevated)] border border-white/5 flex items-center gap-3 transition-all"
          >
            <Bell className="w-5 h-5 text-[#60A5FA]" />
            <div className="text-left">
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">Notifications</h4>
              <p className="text-xs text-[var(--text-secondary)]">Alert preferences</p>
            </div>
          </button>
          <button 
            onClick={() => setActiveSection('security')}
            className="p-4 rounded-2xl bg-[var(--bg-primary)] hover:bg-[var(--surface-elevated)] border border-white/5 flex items-center gap-3 transition-all"
          >
            <Lock className="w-5 h-5 text-[var(--text-primary)]" />
            <div className="text-left">
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">Security</h4>
              <p className="text-xs text-[var(--text-secondary)]">Password and auth</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
