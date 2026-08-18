import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScanLine, QrCode, CheckCircle2, AlertTriangle, User, Globe, MapPin, Calendar, Phone } from 'lucide-react';
import { DigitalIdCard } from '../tourist/DigitalIdCard';

export const TouristIdScannerView: React.FC = () => {
  const { digitalId, tourist, activeTab } = useApp();
  const [scanState, setScanState] = useState<'IDLE' | 'SCANNING' | 'VERIFIED' | 'FAILED'>('IDLE');

  const handleScan = () => {
    setScanState('SCANNING');
    setTimeout(() => {
      // Simulate success since we are in the demo
      setScanState('VERIFIED');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--accent-primary)]/20 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--color-safe)]">
            <ScanLine className={`w-6 h-6 ${scanState === 'SCANNING' ? 'animate-ping' : ''}`} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)] font-heading">Tourist QR Scanner</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Scan digital pass or QR code to verify tourist identity.</p>
          </div>
        </div>
        <button 
          onClick={handleScan}
          disabled={scanState === 'SCANNING'}
          className="px-6 py-3 rounded-xl bg-[var(--color-safe)] hover:bg-[var(--color-safe)]/90 text-[var(--bg-primary)] font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50"
        >
          {scanState === 'SCANNING' ? 'Scanning...' : 'Scan QR Code'}
        </button>
      </div>

      {scanState === 'IDLE' && (
        <div className="p-12 rounded-3xl bg-[#101510] border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center space-y-4">
          <QrCode className="w-16 h-16 text-white/20" />
          <h3 className="text-lg font-bold text-white/50">Ready to Scan</h3>
          <p className="text-sm text-white/30 max-w-sm">Position the Tourist's QR code within the frame or click the Scan button to simulate a successful read.</p>
        </div>
      )}

      {scanState === 'SCANNING' && (
        <div className="p-12 rounded-3xl bg-[#101510] border border-[var(--accent-primary)]/50 shadow-2xl flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent-primary)] shadow-[0_0_15px_var(--accent-primary)] animate-[scan_3s_ease-in-out_infinite]" />
          <ScanLine className="w-16 h-16 text-[var(--accent-primary)] animate-pulse" />
          <h3 className="text-lg font-bold text-[var(--accent-primary)]">Reading Cryptographic Payload...</h3>
        </div>
      )}

      {scanState === 'VERIFIED' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 rounded-3xl bg-[var(--color-safe)]/10 border border-[var(--color-safe)]/30 shadow-2xl flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[var(--color-safe)] flex items-center justify-center text-[var(--bg-primary)] shrink-0 shadow-[0_0_20px_var(--color-safe)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[var(--color-safe)]">✓ VERIFIED</h2>
              <p className="text-sm text-[var(--text-secondary)]">Cryptographic signature matches active Tourist Profile.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-[var(--bg-primary)] border border-white/5 shadow-xl space-y-6">
              <div className="flex items-center gap-4">
                <img src={digitalId.photoUrl} alt="Tourist" className="w-20 h-20 rounded-2xl object-cover border-2 border-[var(--color-safe)]" />
                <div>
                  <h3 className="text-xl font-extrabold text-[var(--text-primary)]">{digitalId.fullName}</h3>
                  <span className="inline-block mt-1 px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-[var(--text-muted)]">ID: {digitalId.digitalIdCode}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <Globe className="w-4 h-4 text-[#60A5FA]" />
                  <div>
                    <span className="text-[10px] uppercase text-[var(--text-muted)] block font-bold">Nationality</span>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{digitalId.nationality}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <MapPin className="w-4 h-4 text-[var(--accent-primary)]" />
                  <div>
                    <span className="text-[10px] uppercase text-[var(--text-muted)] block font-bold">Destination</span>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{digitalId.destinationState}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <Calendar className="w-4 h-4 text-[#C084FC]" />
                  <div>
                    <span className="text-[10px] uppercase text-[var(--text-muted)] block font-bold">Trip Validity</span>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{digitalId.tripValidityStart} - {digitalId.tripValidityEnd}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-[var(--color-high)]/20">
                  <Phone className="w-4 h-4 text-[var(--color-high)]" />
                  <div>
                    <span className="text-[10px] uppercase text-[var(--text-muted)] block font-bold">Emergency Contact</span>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{digitalId.emergencyContact}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="opacity-75 scale-95 pointer-events-none origin-top">
              <div className="mb-3 text-center">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Matched Source Credential</span>
              </div>
              <DigitalIdCard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
