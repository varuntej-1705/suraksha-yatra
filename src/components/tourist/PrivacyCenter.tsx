import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Share2, 
  Users, 
  Clock, 
  Database,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export const PrivacyCenter: React.FC = () => {
  const { tourist, setTourist, addToast } = useApp();

  const [locationSharing, setLocationSharing] = useState<boolean>(tourist.isSharingLocation);
  const [familySharing, setFamilySharing] = useState<boolean>(tourist.familySharingEnabled);
  const [guideAccess, setGuideAccess] = useState<boolean>(true);
  const [medicalAccess, setMedicalAccess] = useState<boolean>(true);
  const [familyPhone, setFamilyPhone] = useState<string>(tourist.emergencyContact.phone);

  const handleToggleLocation = () => {
    soundEffects.playSafeChime();
    const next = !locationSharing;
    setLocationSharing(next);
    setTourist(prev => ({ ...prev, isSharingLocation: next }));
    addToast({
      title: next ? 'Live Location Active' : 'Location Sharing Paused',
      description: next ? 'GPS securely streaming to SIH25002 Authority Node.' : 'Authority can only access last known beacon during SOS.',
      type: next ? 'SAFE' : 'CAUTION'
    });
  };

  const handleToggleFamily = () => {
    soundEffects.playSafeChime();
    const next = !familySharing;
    setFamilySharing(next);
    setTourist(prev => ({ ...prev, familySharingEnabled: next }));
    addToast({
      title: next ? 'Family Safety Sync Enabled' : 'Family Sync Disabled',
      description: next ? `SMS notifications active for ${familyPhone}` : 'Family link paused.',
      type: 'INFO'
    });
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300 max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
            PRIVACY & SOVEREIGN DATA CONTROLS
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">•</span>
          <span className="text-[11px] text-[var(--text-secondary)]">Zero-Knowledge Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mt-1">
          Tourist Privacy & Consent Center
        </h2>
        <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
          You retain full sovereign control over your telemetry. Sensor data is never exposed without explicit consent or authorized critical SOS beacon activation.
        </p>
      </div>

      {/* Control Toggles */}
      <div className="space-y-3.5">
        {/* Toggle 1: Live Location Streaming */}
        <div className="p-5 sm:p-6 rounded-3xl glass-panel flex items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 text-[var(--color-safe)] shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Real-time Live Location Sharing</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                Streams dynamic encrypted GPS breadcrumbs to the Tourism Police Command Center for proactive geo-fence risk monitoring.
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleLocation}
            className={`w-13 h-7 rounded-full p-1 transition-colors shrink-0 ${
              locationSharing ? 'bg-[var(--accent-primary)]' : 'bg-white/10'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-[var(--bg-primary)] transition-transform ${
              locationSharing ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Toggle 2: Family Sharing */}
        <div className="p-5 sm:p-6 rounded-3xl glass-panel flex items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-[#60A5FA]/15 border border-[#60A5FA]/30 text-[#60A5FA] shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Family Emergency SMS Sync</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                Sends automated check-in SMS and immediate panic alerts to your registered family contact ({familyPhone}).
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleFamily}
            className={`w-13 h-7 rounded-full p-1 transition-colors shrink-0 ${
              familySharing ? 'bg-[var(--accent-primary)]' : 'bg-white/10'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-[var(--bg-primary)] transition-transform ${
              familySharing ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Toggle 3: Guide Incident Visibility */}
        <div className="p-5 sm:p-6 rounded-3xl glass-panel flex items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-[#A78BFA]/15 border border-[#A78BFA]/30 text-[#A78BFA] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Nearest Guide Proximity Dispatch</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                Allows certified local guides within 2km to receive urgent rescue alerts when you trigger SOS or enter high-risk zones.
              </p>
            </div>
          </div>

          <button
            onClick={() => setGuideAccess(!guideAccess)}
            className={`w-13 h-7 rounded-full p-1 transition-colors shrink-0 ${
              guideAccess ? 'bg-[var(--accent-primary)]' : 'bg-white/10'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-[var(--bg-primary)] transition-transform ${
              guideAccess ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
};
