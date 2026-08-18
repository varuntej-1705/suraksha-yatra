import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  ExternalLink, 
  Hash, 
  Lock, 
  FileText,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export const BlockchainAuditCenter: React.FC = () => {
  const { auditTrail, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTx, setSelectedTx] = useState<any>(null);

  const filteredLogs = auditTrail.filter(log =>
    log.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.targetEntityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.eventType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* 1. Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-primary)] border border-[#60A5FA]/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#60A5FA] uppercase tracking-wider">
              IMMUTABLE AUDIT LOG EXPLORER
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">•</span>
            <span className="text-[11px] text-[var(--color-safe)] font-mono">ETHEREUM TESTNET / MERKLE TREE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] mt-1">
            Blockchain Verification & Audit Trail
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Every critical safety event, Digital ID registration, guide dispatch, and incident resolution is cryptographically hashed into an immutable Merkle tree ledger.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 text-[var(--color-safe)] text-xs font-mono font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Block #19482400</span>
          </span>
        </div>
      </div>

      {/* 2. Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Filter audit logs by Tx Hash, Tourist Name, Incident ID, or Event Type..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#101510] border border-white/10 focus:border-[#60A5FA]/60 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none shadow-md transition-all"
        />
      </div>

      {/* 3. Transaction Logs Table */}
      <div className="rounded-2xl bg-[#101510] border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Verified Audit Transactions ({filteredLogs.length})
          </h3>
          <span className="text-[10px] text-[var(--text-secondary)] font-mono">Zero-Knowledge State Proofs</span>
        </div>

        <div className="divide-y divide-white/5 overflow-x-auto">
          {filteredLogs.map(log => (
            <div
              key={log.id}
              onClick={() => setSelectedTx(log)}
              className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    log.eventType === 'DIGITAL_ID_ISSUANCE' ? 'bg-[#60A5FA]/15 text-[#60A5FA] border-[#60A5FA]/30' :
                    log.eventType === 'INCIDENT_ESCALATION' ? 'bg-[var(--color-critical)]/15 text-[var(--color-critical)] border-[var(--color-critical)]/30' :
                    log.eventType === 'GUIDE_ASSIGNMENT' ? 'bg-[var(--color-moderate)]/15 text-[var(--color-moderate)] border-[var(--color-moderate)]/30' :
                    'bg-[var(--color-safe)]/15 text-[var(--color-safe)] border-[var(--color-safe)]/30'
                  }`}>
                    {log.eventType}
                  </span>
                  <span className="text-xs font-bold text-[var(--text-primary)]">{log.targetEntityName}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] font-mono">
                  <span>Block #{log.blockNumber}</span>
                  <span>•</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {log.summary}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-[var(--text-muted)] font-mono pt-1">
                <span className="truncate max-w-md">Tx: {log.txHash}</span>
                <span className="text-[var(--color-safe)] font-bold">✓ Immutable On-Chain Hash</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
