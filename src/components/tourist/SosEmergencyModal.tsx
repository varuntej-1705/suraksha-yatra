import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  X, 
  Phone, 
  Radio, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin,
  HeartHandshake
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export const SosEmergencyModal: React.FC = () => {
  const { 
    isSosModalOpen, 
    setIsSosModalOpen, 
    triggerEmergencySos, 
    cancelSos, 
    tourist, 
    activeIncident,
    guides,
    t 
  } = useApp();

  const [countdown, setCountdown] = useState<number>(3);
  const [sosActivated, setSosActivated] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSosModalOpen && !sosActivated) {
      setCountdown(3);
      soundEffects.playEmergencyBeacon();
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setSosActivated(true);
            triggerEmergencySos();
            return 0;
          }
          soundEffects.playEmergencyBeacon();
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSosModalOpen, sosActivated, triggerEmergencySos]);

  if (!isSosModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#0F0A0A] border-2 border-[var(--color-critical)]/60 shadow-2xl glow-critical">
        {/* Close Button */}
        <button
          onClick={() => {
            setSosActivated(false);
            cancelSos();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        {!sosActivated ? (
          /* Countdown State */
          <div className="text-center space-y-5 py-4">
            <div className="relative mx-auto w-24 h-24 rounded-full bg-[var(--color-critical)]/20 border-2 border-[var(--color-critical)] flex items-center justify-center text-[var(--color-critical)] animate-ping">
              <span className="text-4xl font-extrabold font-mono">{countdown}</span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-extrabold text-[var(--text-primary)] uppercase tracking-wide">
                HOLD FOR EMERGENCY SOS
              </h3>
              <p className="text-xs text-[var(--text-secondary)] max-w-xs mx-auto">
                Triggering automatic rescue dispatch in <strong>{countdown} seconds</strong>. Release or tap Cancel if pressed accidentally.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#170a0a] border border-white/10 text-xs text-[var(--text-primary)] flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--color-critical)]" />
              <span>Current GPS: {tourist.currentLocation.lat.toFixed(4)}, {tourist.currentLocation.lng.toFixed(4)}</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setSosActivated(false);
                  cancelSos();
                }}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-[var(--text-primary)] transition-all"
              >
                Cancel SOS
              </button>

              <button
                onClick={() => {
                  setSosActivated(true);
                  triggerEmergencySos();
                }}
                className="flex-1 py-3 rounded-xl bg-[var(--color-critical)] hover:bg-[#FF3030] text-xs font-extrabold text-white shadow-lg shadow-[var(--color-critical)]/40 transition-all"
              >
                Instant Broadcast
              </button>
            </div>
          </div>
        ) : (
          /* Activated Broadcast State */
          <div className="space-y-5 py-2">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-critical)]/20 border border-[var(--color-critical)] flex items-center justify-center text-[var(--color-critical)] shrink-0 animate-pulse">
                <Radio className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[var(--color-critical)] uppercase tracking-wider">
                  INCIDENT #INC-1042 ACTIVE
                </span>
                <h3 className="text-base font-bold text-[var(--text-primary)]">Emergency Rescue Signal Broadcasted</h3>
                <p className="text-xs text-[var(--text-secondary)]">Police & SDRF command centers have locked coordinates.</p>
              </div>
            </div>

            {/* Status Steps */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 text-[var(--color-safe)]">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-semibold">Live GPS Beacon Transmitted (Shillong Central Circle)</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 text-[var(--color-safe)]">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-semibold">Central Police Station Alerted (~4 min ETA)</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--accent-primary)]/30 text-[var(--color-safe)]">
                <HeartHandshake className="w-4 h-4 text-[var(--accent-primary)]" />
                <span className="font-semibold">Guide Rahul Sharma dispatched & en route (ETA: 4 min)</span>
              </div>
            </div>

            {/* Direct Calling buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href="tel:112"
                className="py-3 rounded-xl bg-[var(--color-critical)] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-[var(--color-critical)]/30"
              >
                <Phone className="w-4 h-4" />
                <span>Call Police (112)</span>
              </a>

              <a
                href="tel:108"
                className="py-3 rounded-xl bg-white/10 hover:bg-white/15 text-[var(--text-primary)] font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10"
              >
                <Phone className="w-4 h-4 text-[var(--color-moderate)]" />
                <span>Ambulance (108)</span>
              </a>
            </div>

            <button
              onClick={() => {
                setSosActivated(false);
                setIsSosModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[var(--text-secondary)]"
            >
              Keep Tracking in Background
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
