import React from 'react';
import { useApp } from '../../context/AppContext';
import { SafetyBuddy3D } from '../3d/SafetyBuddy3D';
import { 
  ShieldCheck, 
  MapPin, 
  HeartHandshake, 
  ShieldAlert,
  CloudSun,
  Share2,
  HelpCircle,
  Info
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export const TouristHome: React.FC = () => {
  const { 
    tourist, 
    trip,
    weather,
    setActiveTab, 
    setIsSosModalOpen,
    addToast
  } = useApp();

  const handleShareLocation = () => {
    soundEffects.playSafeChime();
    addToast({
      title: 'Live Location Link Shared',
      description: 'Tracking link copied and sent to verified emergency contacts.',
      type: 'INFO'
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24 animate-in fade-in duration-300">
      {/* Welcome & Location Card */}
      <div className="p-6 rounded-3xl glass-panel shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[var(--accent-primary)]/5 blur-3xl pointer-events-none" />
        <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">
          Welcome, {tourist.fullName.split(' ')[0]}
        </h2>
        <div className="mt-2 text-2xl font-extrabold text-[var(--text-primary)]">
          {tourist.currentLocationName.split(',')[0]}
        </div>
        
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${tourist.safetyTier === 'SAFE' ? 'bg-[var(--color-safe)]' : 'bg-[var(--color-high)]'} animate-pulse`} />
            <span className={`font-bold ${tourist.safetyTier === 'SAFE' ? 'text-[var(--color-safe)]' : 'text-[var(--color-high)]'}`}>
              {tourist.safetyTier}
            </span>
            <span className="text-[var(--text-muted)] font-mono text-sm ml-1">92 / 100</span>
          </div>
          <div className="w-px h-4 bg-[var(--panel-border)]" />
          <div className="flex items-center gap-1.5 text-sm text-[var(--text-primary)]">
            <CloudSun className="w-4 h-4 text-[var(--color-moderate)]" />
            {weather.tempC}°C • {weather.condition}
          </div>
        </div>
      </div>

      {/* Safety Buddy Row (Full Width) */}
      <div className="p-6 rounded-3xl glass-panel shadow-xl overflow-hidden relative">
        <div className="w-full h-56 rounded-2xl overflow-hidden relative border border-white/5">
          <SafetyBuddy3D onOpenAssistant={() => {}} />
        </div>
      </div>

      {/* Active Trip */}
      <div className="p-6 rounded-3xl glass-panel shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            ACTIVE TRIP
          </span>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mt-1">{trip.origin} → {trip.destination}</h3>
        </div>
        <button
          onClick={() => setActiveTab('trip')}
          className="px-4 py-2 rounded-xl bg-[var(--panel-bg)] hover:bg-[var(--surface-elevated)] border border-[var(--panel-border)] text-xs font-semibold text-[var(--text-primary)] transition-all whitespace-nowrap"
        >
          View Trip Details
        </button>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {[
          { label: 'Am I Safe?', icon: ShieldCheck, color: 'text-[var(--color-safe)]', action: () => addToast({title: 'Status: Safe', description: 'No immediate risks detected in your area.', type: 'SAFE'}) },
          { label: 'Safe Route', icon: MapPin, color: 'text-[#60A5FA]', action: () => setActiveTab('map') },
          { label: 'Find Guide', icon: HeartHandshake, color: 'text-[var(--accent-primary)]', action: () => setActiveTab('guide') },
          { label: 'Nearby Help', icon: HelpCircle, color: 'text-[var(--color-moderate)]', action: () => setActiveTab('network') },
          { label: 'Share Loc', icon: Share2, color: 'text-[#C084FC]', action: handleShareLocation },
          { label: 'Emergency', icon: ShieldAlert, color: 'text-[var(--color-critical)]', bg: 'bg-[var(--color-critical)]/10 border border-[var(--color-critical)]/30 hover:bg-[var(--color-critical)]/20', action: () => setIsSosModalOpen(true) },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            className={`flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl glass-panel transition-all ${btn.bg || 'hover:bg-[var(--surface-elevated)]'}`}
          >
            <btn.icon className={`w-6 h-6 ${btn.color}`} />
            <span className="text-[10px] font-bold text-[var(--text-primary)] text-center leading-tight">{btn.label}</span>
          </button>
        ))}
      </div>
      
      {/* Alerts Summary */}
      <div className="p-5 rounded-3xl glass-panel flex items-start gap-4 cursor-pointer hover:bg-[var(--surface-elevated)] transition-colors" onClick={() => setActiveTab('alerts')}>
        <Info className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-[var(--text-primary)]">All clear in your area</h4>
          <p className="text-xs text-[var(--text-muted)] mt-1">No active safety alerts or warnings for your current location and planned route. Tap to view alert history.</p>
        </div>
      </div>
    </div>
  );
};
