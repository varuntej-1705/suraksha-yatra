import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  MapPin, 
  Compass, 
  HeartHandshake, 
  QrCode, 
  ShieldAlert, 
  Cpu, 
  Layers, 
  Lock, 
  Sliders, 
  Building2,
  HelpCircle,
  PhoneCall,
  Shield,
  Bell,
  User
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export const Navigation: React.FC = () => {
  const { currentRole, activeTab, setActiveTab, setIsSosModalOpen } = useApp();

  const handleTabClick = (tabId: string) => {
    soundEffects.playSafeChime();
    setActiveTab(tabId);
  };

  // Role-based Navigation configuration
  const getNavItems = () => {
    const commonTouristItems = [
      { id: 'home', label: 'HOME', icon: Home },
      { id: 'explore', label: 'EXPLORE', icon: MapPin },
      { id: 'trip', label: 'MY TRIP', icon: Compass },
      { id: 'assistance', label: 'ASSISTANCE', icon: HeartHandshake },
      { id: 'profile', label: 'PROFILE', icon: User },
    ];

    if (currentRole === 'GUIDE') {
      return [
        { id: 'guide', label: 'Guide Dispatch Hub', icon: HeartHandshake, badge: 'Online' },
        { id: 'map', label: 'Live Incident Radar', icon: MapPin },
        { id: 'digital-id', label: 'QR Tourist Pass Scanner', icon: QrCode },
      ];
    }

    if (currentRole === 'AUTHORITY') {
      return [
        { id: 'authority', label: 'Command Center', icon: Building2, badge: 'Active' },
        { id: 'map', label: 'Live Safety Map', icon: MapPin },
        { id: 'authority-incidents', label: 'Incidents & Response', icon: ShieldAlert },
        { id: 'authority-analytics', label: 'Analytics', icon: Layers },
      ];
    }

    if (currentRole === 'RESPONDER') {
      return [
        { id: 'responder', label: 'Emergency Queue', icon: ShieldAlert, badge: 'SDRF' },
        { id: 'map', label: 'Navigation & Safe Routes', icon: MapPin },
        { id: 'digital-id', label: 'Tourist ID Check', icon: QrCode },
        { id: 'history', label: 'Response History', icon: Layers }
      ];
    }

    if (currentRole === 'ADMIN') {
      return [
        { id: 'admin-overview', label: 'System Overview', icon: Sliders },
        { id: 'admin-command', label: 'Command Center', icon: Building2, badge: 'Active' },
        { id: 'admin-map', label: 'Geo-Zone & Safety Map', icon: MapPin },
        { id: 'admin-analytics', label: 'Analytics & Reports', icon: Layers }
      ];
    }

    return commonTouristItems;
  };

  const navItems = getNavItems();

  return (
    <>
      {/* 1. Desktop Transparent Sidebar (md and up) */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 p-4 border-r border-white/[0.08] min-h-[calc(100vh-4rem)]">
        <div className="space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            {currentRole.toLowerCase()} Navigation
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/35 text-[var(--color-safe)] shadow-sm backdrop-blur-md'
                    : 'text-[var(--text-secondary)] hover:bg-white/[0.04] hover:text-white border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[var(--color-safe)]' : 'text-[var(--text-muted)]'}`} />
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded-md font-mono ${
                    isActive 
                      ? 'bg-[var(--accent-primary)]/25 text-[var(--color-safe)]' 
                      : 'bg-white/[0.06] text-[var(--text-muted)]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tourist Emergency Assistance Banner in Sidebar */}
        <div className="mt-auto pt-4 space-y-2 border-t border-white/[0.08]">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
              <PhoneCall className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>24/7 Helpline: 112</span>
            </div>
            <p className="text-[10px] text-[var(--text-secondary)] mt-1">
              Tourist Police & Disaster Response active in Meghalaya corridor.
            </p>
          </div>

          {currentRole === 'TOURIST' && (
            <button
              id="sidebar-btn-sos"
              onClick={() => setIsSosModalOpen(true)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[var(--color-critical)] to-[#E63946] text-white font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-critical)]/25 hover:brightness-110 active:scale-98 transition-all"
            >
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span>EMERGENCY SOS</span>
            </button>
          )}
        </div>
      </aside>

      {/* 2. Mobile Floating Glass Bottom Bar (Dribbble Style) */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--surface)]/85 backdrop-blur-2xl rounded-full p-2 border border-white/10 shadow-2xl shadow-black/50 w-fit">
        <div className="flex items-center gap-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-[var(--accent-primary)] text-[var(--surface)] shadow-[0_4px_20px_rgba(215,249,122,0.3)] scale-105 z-10' 
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5'
                }`}
              >
                <Icon className="w-[22px] h-[22px]" strokeWidth={isActive ? 2.5 : 2} />
              </button>
            );
          })}
          
          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Quick Mobile SOS button */}
          <button
            id="mobile-nav-sos"
            onClick={() => setIsSosModalOpen(true)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--color-critical)] to-[#FF7070] text-white shadow-[0_4px_20px_rgba(255,77,77,0.4)] transition-all hover:scale-105"
          >
            <ShieldAlert className="w-[22px] h-[22px]" strokeWidth={2.5} />
          </button>
        </div>
      </nav>
    </>
  );
};
