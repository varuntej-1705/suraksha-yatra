import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, LanguageCode } from '../../types';
import { 
  Shield, 
  Wifi, 
  WifiOff, 
  Languages, 
  PlayCircle, 
  ChevronDown, 
  MapPin,
  Sparkles,
  ShieldAlert,
  Compass,
  HeartHandshake,
  Building2,
  Sliders,
  Radio,
  Check,
  Sun,
  Moon
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';
import { DemoStateControl } from './DemoStateControl';

interface HeaderProps {
  onOpenDemoControls?: () => void;
  onOpenLoginModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDemoControls }) => {
  const { 
    currentRole, 
    setCurrentRole, 
    language, 
    setLanguage, 
    tourist, 
    activeZone, 
    isOfflineMode, 
    setIsOfflineMode,
    isSimulationPlaying,
    setActiveTab,
    setIsSosModalOpen,
    addToast,
    t,
    theme,
    toggleTheme
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState<boolean>(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);

  const rolesList: { role: UserRole; label: string; icon: string; roleTag: string; desc: string }[] = [
    { 
      role: 'TOURIST', 
      label: 'Tourist Explorer', 
      icon: '🎒', 
      roleTag: 'Varun', 
      desc: '3D Safety Buddy, QR Pass & Offline SOS' 
    },
    { 
      role: 'GUIDE', 
      label: 'Certified Eco-Guide', 
      icon: '🧭', 
      roleTag: 'Rahul Sharma', 
      desc: 'Tourist rescue requests & guided trail status' 
    },
    { 
      role: 'AUTHORITY', 
      label: 'Authority Command', 
      icon: '🏛️', 
      roleTag: 'Meghalaya Police HQ', 
      desc: 'Live geo-fence radar & incident dispatch' 
    },
    { 
      role: 'RESPONDER', 
      label: 'SDRF Responder', 
      icon: '🚨', 
      roleTag: 'Rescue Unit 04', 
      desc: 'Rapid emergency navigation & triage' 
    },
    { 
      role: 'ADMIN', 
      label: 'System Admin', 
      icon: '⚙️', 
      roleTag: 'Portal Admin', 
      desc: 'Geo-zone editor & Merkle audit trail' 
    }
  ];

  const languagesList: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'as', label: 'Assamese', native: 'অসমীয়া' },
    { code: 'kha', label: 'Khasi', native: 'Ka Ktien Khasi' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' }
  ];

  const handleRoleChange = (role: UserRole) => {
    soundEffects.playSafeChime();
    setCurrentRole(role);
    setRoleDropdownOpen(false);

    if (role === 'TOURIST') setActiveTab('home');
    else if (role === 'GUIDE') setActiveTab('guide');
    else if (role === 'AUTHORITY') setActiveTab('authority');
    else if (role === 'RESPONDER') setActiveTab('responder');
    else if (role === 'ADMIN') setActiveTab('admin');

    addToast({
      title: `Role Switched: ${role}`,
      description: `Loaded tailored dashboard and safety permissions.`,
      type: 'INFO'
    });
  };

  const handleLangChange = (code: LanguageCode) => {
    soundEffects.playSafeChime();
    setLanguage(code);
    setLangDropdownOpen(false);
  };

  const toggleOffline = () => {
    const next = !isOfflineMode;
    setIsOfflineMode(next);
    if (next) {
      soundEffects.playCautionChime();
      addToast({
        title: 'Offline Mode Active',
        description: 'Safety credentials and maps cached locally on your device.',
        type: 'CAUTION'
      });
    } else {
      soundEffects.playSafeChime();
      addToast({
        title: 'Online Sync Restored',
        description: 'All safety telemetry synced to cloud nodes.',
        type: 'SAFE'
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-primary)]/75 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-0 min-h-[4rem] sm:h-16 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        {/* Brand & Logo (Top box on mobile) */}
        <div className="flex items-center justify-between w-full sm:w-auto shrink-0 border-b border-white/5 sm:border-none pb-3 sm:pb-0">
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
            onClick={() => setActiveTab('home')}
          >
          <div className="relative w-11 h-11 sm:w-10 sm:h-10 shrink-0 rounded-2xl bg-gradient-to-br from-[#1B3525]/90 to-[#0F1C14]/90 border border-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--accent-primary)] shadow-lg shadow-[var(--accent-primary)]/10 group-hover:border-[var(--accent-primary)]/60 transition-all">
            <Shield className="w-5 h-5 absolute group-hover:scale-105 transition-transform" />
            <MapPin className="w-2.5 h-2.5 absolute mt-0.5 text-[var(--bg-primary)] group-hover:scale-105 transition-transform" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[var(--color-safe)] border-2 border-[var(--bg-primary)] hidden sm:block" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl sm:text-xl font-bold tracking-tight text-[var(--text-primary)] font-heading whitespace-nowrap leading-none">
              Suraksha<span className="text-[var(--accent-primary)] font-extrabold ml-1.5 sm:ml-1">Yatra</span>
            </h1>
            <p className="text-[10px] sm:text-[11px] text-[var(--text-secondary)] hidden sm:block mt-0.5">
              Intelligent Safety Network
            </p>
          </div>
          </div>

          {/* Mobile Safety Status Indicator */}
          <div className="flex lg:hidden items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-safe)]/10 border border-[var(--color-safe)]/20 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-safe)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-safe)]" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-[var(--color-safe)] uppercase tracking-wider">Safe</span>
          </div>
        </div>

        {/* Live Safety Status Pill (Center on desktop) */}
        <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-safe)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-safe)]" />
          </span>
          <div className="flex items-center gap-1.5 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="font-medium text-[var(--text-primary)]">Location: {tourist.currentLocationName.split(',')[0]}</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--text-secondary)]">Status:</span>
            <span className="font-bold text-[var(--color-safe)]">Safe</span>
          </div>
        </div>

        {/* Right Navigation & Persona Actions (Bottom box on mobile) */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 flex-wrap shrink-0 w-full sm:w-auto overflow-visible">
          {/* Quick SOS Trigger Button */}
          {currentRole === 'TOURIST' && (
            <button
              id="header-btn-quick-sos"
              onClick={() => setIsSosModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[var(--color-critical)]/15 hover:bg-[var(--color-critical)]/25 border border-[var(--color-critical)]/40 text-[var(--color-critical)] text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline">Emergency SOS</span>
              <span className="sm:hidden">SOS</span>
            </button>
          )}

          <DemoStateControl />

          {/* Interactive Simulation Demo Button (Hidden for Tourist) */}
          {onOpenDemoControls && currentRole !== 'TOURIST' && (
            <button
              id="header-btn-demo-sim"
              onClick={onOpenDemoControls}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                isSimulationPlaying 
                  ? 'bg-[var(--color-high)]/20 border border-[var(--color-high)] text-[var(--color-moderate)] animate-pulse' 
                  : 'bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-[#C084FC]'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Scenario Demo</span>
            </button>
          )}

          {/* Offline Sync Mode Toggle */}
          <button
            id="header-btn-offline"
            onClick={toggleOffline}
            title={isOfflineMode ? "Offline Mode (Click to connect)" : "Online Mode (Click to simulate offline)"}
            className={`p-2 rounded-xl border text-xs transition-all ${
              isOfflineMode
                ? 'bg-[var(--color-high)]/20 border-[var(--color-high)]/50 text-[var(--color-moderate)]'
                : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4 text-[var(--color-safe)]" />}
          </button>

          {/* Theme Toggle Button */}
          <button
            id="header-btn-theme"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[var(--text-secondary)] hover:text-white transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              id="header-btn-language"
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setRoleDropdownOpen(false);
              }}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[var(--text-secondary)] hover:text-white transition-all flex items-center gap-1.5"
            >
              <Languages className="w-4 h-4" />
              <span className="text-[11px] font-semibold uppercase hidden sm:inline">{language}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[var(--bg-secondary)]/95 border border-white/15 backdrop-blur-2xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1 text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Select Language
                </div>
                {languagesList.map(item => (
                  <button
                    key={item.code}
                    onClick={() => handleLangChange(item.code)}
                    className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      language === item.code 
                        ? 'bg-[var(--accent-primary)]/20 text-[var(--color-safe)] font-semibold' 
                        : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{item.native}</p>
                    </div>
                    {language === item.code && <Check className="w-3.5 h-3.5 text-[var(--color-safe)]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Persona & Role Switcher */}
          <div className="relative">
            <button
              id="header-btn-role-select"
              onClick={() => {
                setRoleDropdownOpen(!roleDropdownOpen);
                setLangDropdownOpen(false);
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-[var(--text-primary)] transition-all flex items-center gap-2 shadow-sm"
            >
              <span className="text-sm">
                {rolesList.find(r => r.role === currentRole)?.icon || '👤'}
              </span>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold leading-tight">
                  {rolesList.find(r => r.role === currentRole)?.label.split(' ')[0]}
                </p>
                <p className="text-[9px] text-[var(--text-secondary)] leading-tight">
                  {rolesList.find(r => r.role === currentRole)?.roleTag}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[var(--bg-secondary)]/95 border border-white/15 backdrop-blur-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1.5 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider border-b border-white/10 mb-1">
                  Switch Active Persona
                </div>
                <div className="space-y-1">
                  {rolesList.map(item => (
                    <button
                      key={item.role}
                      onClick={() => handleRoleChange(item.role)}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                        currentRole === item.role
                          ? 'bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/40 text-[var(--text-primary)]'
                          : 'hover:bg-white/5 text-[var(--text-secondary)] hover:text-white border border-transparent'
                      }`}
                    >
                      <span className="text-xl mt-0.5">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-[var(--text-primary)]">{item.label}</p>
                          {currentRole === item.role && (
                            <span className="text-[10px] text-[var(--color-safe)] font-semibold bg-[var(--color-safe)]/15 px-1.5 py-0.2 rounded-md">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[var(--accent-primary)] font-medium">{item.roleTag}</p>
                        <p className="text-[10px] text-[var(--text-muted)] mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
