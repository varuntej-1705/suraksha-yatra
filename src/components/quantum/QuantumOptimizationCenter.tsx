import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Cpu, 
  Sparkles, 
  Play, 
  RotateCw, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Activity,
  Layers,
  CheckCircle2,
  Atom
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export const QuantumOptimizationCenter: React.FC = () => {
  const { quantumResult, runQuantumAllocation, incidents, emergencyResources, guides } = useApp();
  const [isSolving, setIsSolving] = useState<boolean>(false);

  const handleRunOptimization = async () => {
    soundEffects.playSafeChime();
    setIsSolving(true);
    await new Promise(r => setTimeout(r, 700));
    runQuantumAllocation();
    setIsSolving(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* 1. Header with Quantum Accent */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0d0912] border border-[#C084FC]/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#C084FC] uppercase tracking-wider">
              HYBRID QUANTUM-CLASSICAL OPTIMIZATION
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">•</span>
            <span className="text-[11px] text-[#A78BFA] font-mono">QUANTUM SIMULATOR (QAOA / QUBO)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] mt-1">
            Emergency Responder Allocation Center
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Formulating multi-incident emergency dispatch as a Quadratic Unconstrained Binary Optimization (QUBO) problem solved via Quantum Approximate Optimization Algorithm (QAOA).
          </p>
        </div>

        <button
          id="btn-run-quantum-qaoa"
          onClick={handleRunOptimization}
          disabled={isSolving}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#C084FC] to-[#A78BFA] hover:brightness-110 text-[var(--bg-primary)] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#C084FC]/25 transition-all shrink-0 active:scale-95"
        >
          <RotateCw className={`w-4 h-4 ${isSolving ? 'animate-spin' : ''}`} />
          <span>{isSolving ? 'Solving QUBO Hamiltonian...' : 'Execute QAOA Solver'}</span>
        </button>
      </div>

      {/* 2. Classical vs Quantum Comparison Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Classical Solution Box */}
        <div className="p-5 rounded-2xl bg-[#101510] border border-white/10 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-[var(--text-muted)]">BASELINE ALGORITHM</span>
              <h3 className="text-base font-bold text-[var(--text-primary)]">Classical Greedy / Nearest Match</h3>
            </div>
            <span className="text-xs font-mono font-bold text-[var(--text-secondary)] px-2.5 py-1 rounded-full bg-white/5">
              {quantumResult.classicalRuntimeMs} ms
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-white/5 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-secondary)]">Objective Cost Penalty:</span>
              <strong className="text-[var(--color-moderate)] font-mono">{quantumResult.classicalObjectivePenalty}</strong>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-secondary)]">Cross-Incident Overlap:</span>
              <span className="text-[var(--text-secondary)]">Sub-optimal on multi-point distress</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase">Assignments Generated:</span>
            {quantumResult.classicalAssignments.map((a, i) => (
              <div key={i} className="p-2 rounded-lg bg-white/5 flex items-center justify-between text-[11px]">
                <span className="text-[var(--text-primary)] font-medium">{a.incidentId} ➔ {a.responderName}</span>
                <span className="text-[var(--text-secondary)] font-mono">{a.etaMin} min ETA</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quantum-Assisted Candidate Box */}
        <div className="p-5 rounded-2xl bg-[#120D1A] border border-[#C084FC]/50 shadow-xl space-y-4 glow-quantum">
          <div className="flex items-center justify-between border-b border-[#C084FC]/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#C084FC]/20 text-[#C084FC] flex items-center justify-center">
                <Atom className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#C084FC]">QUANTUM SIMULATOR</span>
                <h3 className="text-base font-bold text-[var(--text-primary)]">QAOA Optimal Pairing Candidate</h3>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[var(--color-safe)] px-2.5 py-1 rounded-full bg-[var(--color-safe)]/15 border border-[var(--color-safe)]/30">
              +{quantumResult.penaltyImprovementPct}% Optimized
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-white/5 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-secondary)]">Objective Cost Penalty:</span>
              <strong className="text-[var(--color-safe)] font-mono">{quantumResult.quantumObjectivePenalty}</strong>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-secondary)]">Simulation Execution:</span>
              <span className="text-[#C084FC] font-mono">{quantumResult.quantumQaoaRuntimeMs} ms</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <span className="text-[10px] text-[#C084FC] font-bold uppercase">Optimal Assignments:</span>
            {quantumResult.quantumAssignments.map((a, i) => (
              <div key={i} className="p-2 rounded-lg bg-[#C084FC]/10 border border-[#C084FC]/30 flex items-center justify-between text-[11px]">
                <span className="text-[var(--text-primary)] font-semibold">{a.incidentId} ➔ {a.responderName}</span>
                <span className="text-[var(--color-safe)] font-mono font-bold">{a.etaMin} min ETA</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Mathematical & QAOA Circuit Formulation Specs */}
      <div className="p-5 rounded-2xl bg-[#101510] border border-white/10 space-y-4">
        <h4 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C084FC]" />
          <span>QUBO Problem Formulation & Qiskit Circuit Details</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-white/5">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block">QUBO Matrix Dimension</span>
            <p className="font-mono font-bold text-[#C084FC] mt-0.5">{quantumResult.quboMatrixSize}</p>
            <p className="text-[10px] text-[var(--text-secondary)] mt-1">Binary mapping for incidents × responders</p>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-white/5">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block">QAOA Circuit Depth (p)</span>
            <p className="font-mono font-bold text-[#60A5FA] mt-0.5">p = {quantumResult.qaoaCircuitDepth} Layers</p>
            <p className="text-[10px] text-[var(--text-secondary)] mt-1">Ising ZZ phase separator + RX mixer</p>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-white/5">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block">Simulator Backend</span>
            <p className="font-mono font-bold text-[var(--color-safe)] mt-0.5">Statevector</p>
            <p className="text-[10px] text-[var(--text-secondary)] mt-1">Local deterministic execution</p>
          </div>
        </div>

        {/* Mathematical Expression display */}
        <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-white/5 font-mono text-[11px] text-[var(--text-secondary)] space-y-1">
          <p className="text-[#C084FC]">Min H(x) = ∑ (w₁·d_ij + w₂·t_ij + w₃·Severity_i - w₄·CapBonus_j) · x_ij + λ · ∑(∑ x_ij - 1)²</p>
          <p className="text-[10px] text-[var(--text-muted)]">Where x_ij ∈ {"{0, 1}"} represents assignment of Responder j to Incident i with penalty constraint λ.</p>
        </div>
      </div>
    </div>
  );
};
