import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Navigation } from './components/common/Navigation';
import { ToastContainer } from './components/common/ToastContainer';
import { DemoStateControl } from './components/common/DemoStateControl';
import { TouristHome } from './components/tourist/TouristHome';
import { MyTripView } from './components/tourist/MyTripView';
import { ExploreView } from './components/tourist/ExploreView';
import { AssistanceView } from './components/tourist/AssistanceView';
import { TouristProfile } from './components/tourist/TouristProfile';
import { SosEmergencyModal } from './components/tourist/SosEmergencyModal';
import { GuideDashboard } from './components/guide/GuideDashboard';
import { AuthorityCommandCenter } from './components/authority/AuthorityCommandCenter';
import { AuthorityIncidents } from './components/authority/AuthorityIncidents';
import { AuthorityAnalytics } from './components/authority/AuthorityAnalytics';
import { QuantumOptimizationCenter } from './components/quantum/QuantumOptimizationCenter';
import { BlockchainAuditCenter } from './components/blockchain/BlockchainAuditCenter';
import { ResponderView } from './components/responder/ResponderView';
import { ResponderHistory } from './components/responder/ResponderHistory';
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminCommandCenter } from './components/admin/AdminCommandCenter';
import { AdminMap } from './components/admin/AdminMap';
import { AdminAnalytics } from './components/admin/AdminAnalytics';
import { InteractiveSafetyMap } from './components/map/InteractiveSafetyMap';
import { TouristIdScannerView } from './components/common/TouristIdScannerView';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  StepForward, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  X, 
  ChevronRight, 
  Layers, 
  AlertTriangle,
  Radio,
  Cpu
} from 'lucide-react';
import { DEMO_SCENARIOS } from './data/seedData';
import { soundEffects } from './utils/audio';

const MainLayout: React.FC = () => {
  const { 
    currentRole, 
    activeTab, 
    isSafetyPromptOpen, 
    respondToSafetyCheck,
    isSimulationPlaying,
    simulationStep,
    activeScenario,
    playScenario,
    pauseSimulation,
    resumeSimulation,
    stepForwardSimulation,
    resetSimulation
  } = useApp();

  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);

  // Render the primary view based on activeTab and currentRole
  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <TouristHome />;
      case 'explore':
        return <ExploreView />;
      case 'trip':
        return <MyTripView />;
      case 'assistance':
        return <AssistanceView />;
      case 'profile':
        return <TouristProfile />;
      case 'map':
        return (
          <div className="space-y-4 max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-[var(--bg-primary)] border border-white/10 shadow-lg">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[var(--color-safe)] uppercase tracking-wider">
                    REAL-TIME COMMAND RADAR
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">•</span>
                  <span className="text-[11px] text-[var(--text-secondary)]">Meghalaya Tourism Corridor</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] mt-1">
                  Live Safety & Geo-Fence Radar Map
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1.5 rounded-full bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 text-[var(--color-safe)] font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-safe)] animate-pulse" />
                  GPS ACTIVE
                </span>
              </div>
            </div>
            <InteractiveSafetyMap heightClass="h-[calc(100vh-14rem)] min-h-[520px]" />
          </div>
        );
      case 'guide':
        return <GuideDashboard />;
      case 'authority':
        return <AuthorityCommandCenter />;
      case 'authority-incidents':
        return <AuthorityIncidents />;
      case 'authority-analytics':
        return <AuthorityAnalytics />;
      case 'quantum':
        return <QuantumOptimizationCenter />;
      case 'blockchain':
        return <BlockchainAuditCenter />;
      case 'responder':
        return <ResponderView />;
      case 'history':
        return <ResponderHistory />;
      case 'digital-id':
        return <TouristIdScannerView />;
      case 'admin-overview':
        return <AdminOverview />;
      case 'admin-command':
        return <AdminCommandCenter />;
      case 'admin-map':
        return <AdminMap />;
      case 'admin-analytics':
        return <AdminAnalytics />;
      default:
        return <TouristHome />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[var(--accent-primary)]/30 selection:text-[var(--accent-primary)] transition-colors duration-300">
      {/* 1. Global Header with Persona Switcher & Demo Launcher */}
      <Header onOpenDemoControls={() => setIsDemoModalOpen(true)} />

      {/* 2. Main Body Container with Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Role-Based Sidebar Navigation */}
        <Navigation />

        {/* Dynamic Viewport Container */}
        <main className="flex-1 min-w-0 p-3 sm:p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {renderActiveView()}
        </main>
      </div>

      {/* Demo Controller */}
      <DemoStateControl />

      {/* 3. Global Toasts */}
      <ToastContainer />

      {/* 4. SOS Emergency Modal (Triggerable from everywhere) */}
      <SosEmergencyModal />

      {/* 5. AI Anomaly Safety Check Modal (Autonomous Checkpoint Prompt) */}
      {isSafetyPromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 bg-[#0F0D0A] border-2 border-[var(--color-high)]/60 shadow-2xl text-center space-y-5 glow-high">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-high)]/20 border border-[var(--color-high)] flex items-center justify-center text-[var(--color-moderate)] mx-auto animate-pulse">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-[var(--color-moderate)] uppercase tracking-wider">
                AI ANOMALY CHECK • ZERO MOVEMENT DETECTED
              </span>
              <h3 className="text-xl font-extrabold text-[var(--text-primary)]">
                Are you safe?
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                You entered a high-risk geo-fence zone with no telemetry movement for 18 minutes. Please confirm your status within 45 seconds.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                id="safety-prompt-btn-safe"
                onClick={() => respondToSafetyCheck(true)}
                className="flex-1 py-3 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--color-safe)] text-[var(--bg-primary)] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Yes, I Am Safe</span>
              </button>

              <button
                id="safety-prompt-btn-sos"
                onClick={() => respondToSafetyCheck(false)}
                className="flex-1 py-3 rounded-xl bg-[var(--color-critical)] hover:bg-[#FF3030] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-[var(--color-critical)]/40 transition-all"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>No, Need Help!</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. SIH Showcase Interactive Simulator Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 bg-[var(--bg-primary)] border border-white/15 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#C084FC]/20 border border-[#C084FC]/50 flex items-center justify-center text-[#C084FC]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[var(--text-primary)]">SIH Showcase Simulation Controller</h3>
                  <p className="text-xs text-[var(--text-secondary)]">Step through the entire end-to-end incident lifecycle (Prevention → Response)</p>
                </div>
              </div>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-[var(--text-muted)] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scenario Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Select Demonstration Scenario</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {DEMO_SCENARIOS.map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      soundEffects.playSafeChime();
                      playScenario(sc);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      activeScenario.id === sc.id
                        ? 'bg-[var(--accent-primary)]/15 border-[var(--accent-primary)] text-[var(--text-primary)]'
                        : 'bg-white/[0.03] border-white/10 text-[var(--text-secondary)] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-primary)] truncate">{sc.title}</span>
                    </div>
                    <p className="text-[10px] text-[var(--text-muted)] mt-1 line-clamp-2">{sc.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 8-Stage Progress Tracker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--text-primary)]">Scenario Step: {simulationStep}/8</span>
                <span className="text-[#C084FC] font-mono font-bold">
                  {simulationStep === 0 && 'Baseline (Safe Route)'}
                  {simulationStep === 1 && '1. High-Risk Geo-Fence Entry'}
                  {simulationStep === 2 && '2. Off-Route Route Deviation'}
                  {simulationStep === 3 && '3. Inactivity Anomaly Check'}
                  {simulationStep === 4 && '4. Auto-SOS & Incident Broadcast'}
                  {simulationStep === 5 && '5. Quantum QAOA Responder Match'}
                  {simulationStep === 6 && '6. Guide Dispatched & Navigating'}
                  {simulationStep === 7 && '7. Physical Contact & Assistance'}
                  {simulationStep === 8 && '8. Resolved & Immutable Merkle Audit'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#C084FC] to-[var(--accent-primary)] transition-all duration-300 rounded-full"
                  style={{ width: `${(simulationStep / 8) * 100}%` }}
                />
              </div>
            </div>

            {/* Simulation Controls Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                {isSimulationPlaying ? (
                  <button
                    onClick={pauseSimulation}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 transition-all"
                  >
                    <Pause className="w-4 h-4 text-[var(--color-moderate)]" />
                    <span>Pause Auto-Step</span>
                  </button>
                ) : (
                  <button
                    onClick={resumeSimulation}
                    className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--color-safe)] text-xs font-bold text-[var(--bg-primary)] flex items-center gap-1.5 transition-all"
                  >
                    <Play className="w-4 h-4" />
                    <span>Play Auto (7s Step)</span>
                  </button>
                )}

                <button
                  onClick={stepForwardSimulation}
                  disabled={simulationStep >= 8}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-xs font-bold text-[var(--text-primary)] border border-white/10 flex items-center gap-1.5 transition-all"
                >
                  <StepForward className="w-4 h-4 text-[#60A5FA]" />
                  <span>Next Step &gt;</span>
                </button>
              </div>

              <button
                onClick={resetSimulation}
                className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Baseline</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
