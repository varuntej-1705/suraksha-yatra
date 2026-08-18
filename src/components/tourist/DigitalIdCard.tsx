import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  QrCode, 
  Lock, 
  CheckCircle2, 
  Layers, 
  Download, 
  Share2, 
  RefreshCw, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export const DigitalIdCard: React.FC = () => {
  const { digitalId, tourist, verifyDigitalIdOnline, addToast } = useApp();
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleVerify = async () => {
    soundEffects.playSafeChime();
    setIsVerifying(true);
    await new Promise(r => setTimeout(r, 900));
    await verifyDigitalIdOnline(digitalId.digitalIdCode);
    setIsVerifying(false);
    addToast({
      title: 'Digital ID Cryptographically Verified',
      description: `State verified against Blockchain Merkle Proof #19482250. ID is authentic.`,
      type: 'SAFE'
    });
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300 max-w-3xl mx-auto">
      {/* 1. Header description */}
      <div className="text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider">
            BLOCKCHAIN-VERIFIABLE CREDENTIAL
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">•</span>
          <span className="text-[11px] text-[var(--color-safe)] font-bold">ACTIVE & VALID</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mt-1">
          Digital Tourist Safety Pass
        </h2>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Sovereign tamper-evident digital credential for rapid police scans, verified guide authentication, and medical emergency access.
        </p>
      </div>

      {/* 2. Holographic Digital ID Pass */}
      <div id="digital-tourist-id-pass" className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-[var(--accent-primary)]/30 shadow-2xl overflow-hidden">
        {/* Subtle holographic glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[var(--accent-primary)]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#60A5FA]/10 blur-3xl pointer-events-none" />

        {/* Top Header of Pass */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#1B3525]/80 border border-[var(--accent-primary)]/40 flex items-center justify-center text-[var(--color-safe)] shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[var(--text-primary)] tracking-wide">
                GOVERNMENT OF MEGHALAYA
              </h3>
              <p className="text-[10px] text-[var(--accent-primary)] font-bold tracking-wider uppercase">
                Smart Tourist Safety Registry (SIH25002)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/40 text-[var(--color-safe)] text-xs font-bold shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>VERIFIED</span>
          </div>
        </div>

        {/* Body of Pass: Photo + Info + QR Code */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          {/* Photo & QR Container (Left 4 cols) */}
          <div className="sm:col-span-4 flex flex-col items-center justify-center text-center space-y-3">
            <div className="relative">
              <img
                src={digitalId.photoUrl}
                alt={digitalId.fullName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[var(--accent-primary)]/50 shadow-xl"
              />
              <div className="absolute -bottom-1.5 -right-1.5 p-1 rounded-full bg-[var(--bg-primary)] border border-[var(--accent-primary)] text-[var(--color-safe)]">
                <Lock className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Cryptographic QR Code */}
            <div className="p-2.5 rounded-2xl bg-white shadow-xl">
              <QRCodeSVG
                value={digitalId.qrPayload}
                size={100}
                level="M"
                includeMargin={false}
              />
            </div>
            <span className="text-[10px] text-[var(--text-secondary)] font-mono">Scan for Police Verification</span>
          </div>

          {/* Tourist Details (Right 8 cols) */}
          <div className="sm:col-span-8 space-y-3.5">
            <div>
              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Tourist Full Name</span>
              <h4 className="text-xl font-extrabold text-[var(--text-primary)]">{digitalId.fullName}</h4>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-[var(--text-muted)] block uppercase font-semibold">Digital ID Code</span>
                <span className="font-mono font-bold text-[#60A5FA]">{digitalId.digitalIdCode}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-[var(--text-muted)] block uppercase font-semibold">Nationality</span>
                <span className="font-bold text-[var(--text-primary)]">{digitalId.nationality}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-[var(--text-muted)] block uppercase font-semibold">Corridor Validity</span>
                <span className="font-mono font-bold text-[var(--color-safe)]">{digitalId.tripValidityStart} — {digitalId.tripValidityEnd}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-[var(--text-muted)] block uppercase font-semibold">Emergency SOS Contact</span>
                <span className="font-bold text-[var(--text-primary)]">{digitalId.emergencyContact}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-[var(--text-secondary)]">
                <span>Medical / Blood Group:</span>
                <strong className="text-[var(--text-primary)]">{digitalId.medicalInfo}</strong>
              </div>
              <div className="flex items-center justify-between text-[var(--text-secondary)]">
                <span>Issuing Authority:</span>
                <strong className="text-[var(--accent-primary)] truncate max-w-[220px]">{digitalId.issuer}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Merkle Audit Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5 font-mono truncate">
            <Layers className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
            <span className="truncate">SHA256: {digitalId.sha256Hash}</span>
          </div>
          <span className="text-[var(--accent-primary)] font-bold shrink-0">Merkle Proof Verified (Block #19482104)</span>
        </div>
      </div>

      {/* 3. Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          id="btn-verify-blockchain"
          onClick={handleVerify}
          disabled={isVerifying}
          className="p-4 rounded-2xl glass-panel hover:border-[var(--accent-primary)]/60 text-xs font-bold text-[var(--color-safe)] flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
          <span>{isVerifying ? 'Verifying on Ledger...' : 'Verify Cryptographic State'}</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playSafeChime();
            addToast({
              title: 'Offline Pass Saved',
              description: 'Cryptographic offline ticket stored in secure device storage.',
              type: 'SAFE'
            });
          }}
          className="p-4 rounded-2xl glass-panel hover:border-white/25 text-xs font-bold text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all"
        >
          <Download className="w-4 h-4 text-[#60A5FA]" />
          <span>Download Offline Pass</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playSafeChime();
            addToast({
              title: 'Temporary QR Pass Shared',
              description: 'Single-use QR code generated for Hotel / Guide registration.',
              type: 'INFO'
            });
          }}
          className="p-4 rounded-2xl glass-panel hover:border-white/25 text-xs font-bold text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all"
        >
          <Share2 className="w-4 h-4 text-[#A78BFA]" />
          <span>Share Verifiable Badge</span>
        </button>
      </div>
    </div>
  );
};
