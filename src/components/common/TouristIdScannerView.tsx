import React from 'react';
import { DigitalIdCard } from '../tourist/DigitalIdCard';
import { ScanLine, QrCode } from 'lucide-react';

export const TouristIdScannerView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--accent-primary)]/20 shadow-lg">
        <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--color-safe)]">
          <ScanLine className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Tourist ID Scanner</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Scan digital pass or QR code to verify tourist identity.</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-[#101510] border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Mock scanning laser effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent-primary)] shadow-[0_0_15px_var(--accent-primary)] animate-[scan_3s_ease-in-out_infinite]" />
        
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
            <QrCode className="w-4 h-4 text-[#60A5FA]" />
            SCANNED CREDENTIAL MATCH
          </h3>
          <span className="text-xs px-2 py-1 rounded bg-[var(--color-safe)]/20 text-[var(--color-safe)] font-mono font-bold">
            MATCH: 99.8%
          </span>
        </div>

        <DigitalIdCard />
      </div>
    </div>
  );
};
