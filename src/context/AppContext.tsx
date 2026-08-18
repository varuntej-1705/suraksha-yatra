import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  UserRole,
  TouristProfile,
  GuideProfile,
  EmergencyResource,
  GeoZone,
  Incident,
  Trip,
  WeatherCondition,
  DigitalTouristID,
  BlockchainAuditRecord,
  QuantumOptimizationResult,
  SimulationScenario,
  LanguageCode,
  Coordinates,
  IncidentStatus
} from '../types';
import {
  GEO_ZONES,
  EMERGENCY_RESOURCES,
  INITIAL_TOURIST,
  SEEDED_GUIDES,
  INITIAL_TRIP,
  INITIAL_WEATHER,
  INITIAL_DIGITAL_ID,
  INITIAL_AUDIT_TRAIL,
  SEEDED_INCIDENTS,
  DEMO_SCENARIOS,
  MULTI_LANG_STRINGS
} from '../data/seedData';
import { detectActiveGeoZone, computeExplainableRisk, calculateDistanceKm } from '../utils/geofence';
import { runHybridQuantumOptimization } from '../utils/quantum';
import { soundEffects } from '../utils/audio';
import { generateMockTxHash, computeSha256 } from '../utils/crypto';

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'SAFE' | 'CAUTION' | 'HIGH' | 'CRITICAL' | 'AI' | 'INFO';
  timestamp: string;
}

interface AppContextType {
  // Roles & Auth
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Active Entities
  tourist: TouristProfile;
  setTourist: React.Dispatch<React.SetStateAction<TouristProfile>>;
  guides: GuideProfile[];
  emergencyResources: EmergencyResource[];
  geoZones: GeoZone[];
  setGeoZones: React.Dispatch<React.SetStateAction<GeoZone[]>>;
  activeZone: GeoZone;
  incidents: Incident[];
  activeIncident: Incident | null;
  setActiveIncident: (inc: Incident | null) => void;
  trip: Trip;
  weather: WeatherCondition;
  digitalId: DigitalTouristID;
  auditTrail: BlockchainAuditRecord[];
  quantumResult: QuantumOptimizationResult;

  // UI & Modals
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSosModalOpen: boolean;
  setIsSosModalOpen: (open: boolean) => void;
  isSafetyPromptOpen: boolean;
  setIsSafetyPromptOpen: (open: boolean) => void;
  isOfflineMode: boolean;
  setIsOfflineMode: (offline: boolean) => void;
  offlineQueueCount: number;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;

  // Actions
  triggerEmergencySos: () => Promise<void>;
  cancelSos: () => void;
  handleGuideAcceptIncident: (incidentId: string, guideId: string) => void;
  handleGuideRejectIncident: (incidentId: string, guideId: string) => void;
  handleGuideUpdateStatus: (incidentId: string, status: IncidentStatus) => void;
  respondToSafetyCheck: (isSafe: boolean) => void;
  updateTouristLocation: (coords: Coordinates, locationName?: string) => void;
  runQuantumAllocation: () => void;
  verifyDigitalIdOnline: (idCode: string) => Promise<boolean>;

  // Simulation Controls
  activeScenario: SimulationScenario;
  isSimulationPlaying: boolean;
  simulationStep: number;
  playScenario: (scenario: SimulationScenario) => void;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  stepForwardSimulation: () => void;
  resetSimulation: () => void;

  // Demo Safety State
  demoSafetyState: 'SAFE' | 'MODERATE' | 'HIGH';
  setDemoSafetyState: (state: 'SAFE' | 'MODERATE' | 'HIGH') => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Core State
  const [currentRole, setCurrentRole] = useState<UserRole>('TOURIST');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);
  
  const [tourist, setTourist] = useState<TouristProfile>(INITIAL_TOURIST);
  const [guides, setGuides] = useState<GuideProfile[]>(SEEDED_GUIDES);
  const [emergencyResources, setEmergencyResources] = useState<EmergencyResource[]>(EMERGENCY_RESOURCES);
  const [geoZones, setGeoZones] = useState<GeoZone[]>(GEO_ZONES);
  const [activeZone, setActiveZone] = useState<GeoZone>(GEO_ZONES[0]);
  const [incidents, setIncidents] = useState<Incident[]>(SEEDED_INCIDENTS);
  const [activeIncident, setActiveIncident] = useState<Incident | null>(SEEDED_INCIDENTS[0]);
  const [trip, setTrip] = useState<Trip>(INITIAL_TRIP);
  const [weather, setWeather] = useState<WeatherCondition>(INITIAL_WEATHER);
  const [digitalId, setDigitalId] = useState<DigitalTouristID>({
    id: 'dig-id-01',
    fullName: 'Varun',
    photoUrl: '/varun-profile.png',
    nationality: 'India',
    digitalIdCode: 'MEG-88X-2026'
  });
  const [auditTrail, setAuditTrail] = useState<BlockchainAuditRecord[]>(INITIAL_AUDIT_TRAIL);
  
  // Quantum result state
  const [quantumResult, setQuantumResult] = useState<QuantumOptimizationResult>(() => 
    runHybridQuantumOptimization(SEEDED_INCIDENTS, EMERGENCY_RESOURCES, SEEDED_GUIDES)
  );

  // Modals & Overlays
  const [isSosModalOpen, setIsSosModalOpen] = useState<boolean>(false);
  const [isSafetyPromptOpen, setIsSafetyPromptOpen] = useState<boolean>(false);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(0);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Simulation state
  const [activeScenario, setActiveScenario] = useState<SimulationScenario>(DEMO_SCENARIOS[0]);
  const [isSimulationPlaying, setIsSimulationPlaying] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);

  // Demo Safety State
  const [demoSafetyState, setDemoSafetyStateRaw] = useState<'SAFE' | 'MODERATE' | 'HIGH'>('SAFE');

  const setDemoSafetyState = useCallback((state: 'SAFE' | 'MODERATE' | 'HIGH') => {
    setDemoSafetyStateRaw(state);
    if (state === 'SAFE') {
      setTourist(prev => ({ ...prev, safetyTier: 'SAFE', safetyScore: 92 }));
      soundEffects.playSafeChime();
    } else if (state === 'MODERATE') {
      setTourist(prev => ({ ...prev, safetyTier: 'MODERATE', safetyScore: 55 }));
      soundEffects.playCautionChime();
      addToast({
        title: 'Conditions Changing',
        description: 'Conditions are changing. Please stay alert and follow the recommended route.',
        type: 'CAUTION'
      });
    } else if (state === 'HIGH') {
      setTourist(prev => ({ ...prev, safetyTier: 'CRITICAL', safetyScore: 12 }));
      soundEffects.playAlertSiren();
      addToast({
        title: 'High Risk Detected',
        description: 'High-risk condition detected. Emergency assistance is being initiated.',
        type: 'CRITICAL'
      });
      setIsSosModalOpen(true);
    }
  }, []);

  // Toast Helper
  const addToast = useCallback((toast: Omit<ToastMessage, 'id' | 'timestamp'>) => {
    const newToast: ToastMessage = {
      ...toast,
      id: `toast_${Date.now()}_${Math.random()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setToasts(prev => [newToast, ...prev.slice(0, 4)]);
    setTimeout(() => {
      removeToast(newToast.id);
    }, 6000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Multi-lingual translation helper
  const t = useCallback((key: string): string => {
    const dict = MULTI_LANG_STRINGS[language] || MULTI_LANG_STRINGS.en;
    return dict[key] || MULTI_LANG_STRINGS.en[key] || key;
  }, [language]);

  // Recalculate Quantum Allocation
  const runQuantumAllocation = useCallback(() => {
    const res = runHybridQuantumOptimization(incidents, emergencyResources, guides);
    setQuantumResult(res);
    addToast({
      title: 'Quantum Optimizer Executed',
      description: `QAOA Hamiltonian solved on ${res.simulatorBackend}. Penalty reduction: ${res.penaltyImprovementPct}%`,
      type: 'AI'
    });
  }, [incidents, emergencyResources, guides, addToast]);

  // Update tourist position and evaluate geo-fence & explainable risk
  const updateTouristLocation = useCallback((coords: Coordinates, locationName?: string) => {
    const currentZone = detectActiveGeoZone(coords, geoZones);
    setActiveZone(currentZone);

    // Calculate deviation from planned route
    const plannedCoords = trip.selectedRoute.pathCoordinates;
    let minDevDist = 999;
    for (const pt of plannedCoords) {
      const d = calculateDistanceKm(coords, pt);
      if (d < minDevDist) minDevDist = d;
    }
    const deviationMeters = Math.round(minDevDist * 1000);

    const { riskScore, safetyScore, safetyTier, factors, suggestedAction } = computeExplainableRisk({
      zone: currentZone,
      routeDeviationMeters: deviationMeters,
      inactivityMinutes: deviationMeters > 400 ? 18 : 2,
      weather
    });

    setTourist(prev => ({
      ...prev,
      currentLocation: coords,
      currentLocationName: locationName || currentZone.name,
      safetyScore,
      safetyTier
    }));

    // Play sounds based on tier
    if (safetyTier === 'SAFE') {
      soundEffects.playSafeChime();
    } else if (safetyTier === 'MODERATE') {
      soundEffects.playCautionChime();
    } else if (safetyTier === 'HIGH') {
      soundEffects.playWarningAlert();
    } else if (safetyTier === 'CRITICAL') {
      soundEffects.playEmergencyBeacon();
    }

    if (safetyTier === 'HIGH' || safetyTier === 'CRITICAL') {
      addToast({
        title: `Geo-Fence Trigger: ${currentZone.name}`,
        description: suggestedAction,
        type: safetyTier === 'CRITICAL' ? 'CRITICAL' : 'HIGH'
      });
    }
  }, [geoZones, trip, weather, addToast]);

  // Trigger SOS Panic
  const triggerEmergencySos = useCallback(async () => {
    soundEffects.playEmergencyBeacon();
    const newIncId = `INC-${Math.floor(1000 + Math.random() * 9000)}`;
    const txHash = generateMockTxHash();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const newIncident: Incident = {
      id: newIncId,
      touristId: tourist.id,
      touristName: 'Varun',
      touristPhoto: '/varun-profile.png',
      digitalId: 'MEG-88X-2026',
      type: 'SOS_TRIGGER',
      severity: 'CRITICAL',
      riskScore: 98,
      locationName: `${tourist.currentLocationName} (Live GPS)`,
      coordinates: tourist.currentLocation,
      createdAt: nowTime,
      updatedAt: nowTime,
      status: 'RESPONDER_ASSIGNED',
      assignedResponderType: 'GUIDE',
      assignedResponderId: 'guide_rahul_01',
      assignedResponderName: 'Rahul Sharma (Verified Eco-Guide)',
      etaMinutes: 3,
      aiExplanation: 'CRITICAL SOS: Direct manual panic button activated by tourist. Location beacon pinned, Police and nearest Guide notified immediately.',
      timeline: [
        {
          id: `tl_${Date.now()}_1`,
          timestamp: nowTime,
          title: 'SOS Emergency Broadcast Activated',
          description: `Tourist ${tourist.fullName} triggered emergency SOS at coordinates (${tourist.currentLocation.lat.toFixed(4)}, ${tourist.currentLocation.lng.toFixed(4)})`,
          actor: 'TOURIST',
          statusAfter: 'DETECTED'
        },
        {
          id: `tl_${Date.now()}_2`,
          timestamp: nowTime,
          title: 'Emergency Incident Pinned on Command Map',
          description: 'Authority & Police Command dispatch center alerted. Quantum allocator assigned Rahul Sharma (Verified Guide).',
          actor: 'AI_ENGINE',
          statusAfter: 'RESPONDER_ASSIGNED'
        }
      ],
      blockchainAuditTx: txHash
    };

    setIncidents(prev => [newIncident, ...prev]);
    setActiveIncident(newIncident);

    // Add to blockchain audit trail
    const auditRecord: BlockchainAuditRecord = {
      id: `audit_${Date.now()}`,
      txHash,
      blockNumber: 19482310 + incidents.length,
      timestamp: `${new Date().toISOString().split('T')[0]} ${nowTime} IST`,
      eventType: 'INCIDENT_ESCALATION',
      summary: `SOS Emergency incident ${newIncId} generated for Tourist ${tourist.fullName}. Merkle proof verified.`,
      targetEntityId: newIncId,
      targetEntityName: tourist.fullName,
      actor: 'Authority Dispatch Node #01',
      payloadHash: await computeSha256(`SOS:${newIncId}:${tourist.id}:${Date.now()}`),
      isImmutableVerified: true
    };
    setAuditTrail(prev => [auditRecord, ...prev]);

    setTourist(prev => ({
      ...prev,
      safetyScore: 5,
      safetyTier: 'CRITICAL'
    }));

    addToast({
      title: '🚨 EMERGENCY SOS BROADCASTED',
      description: 'Incident #INC-1042 created. Live location broadcast to Police, SDRF, and Verified Guide.',
      type: 'CRITICAL'
    });
  }, [tourist, incidents.length, addToast]);

  const cancelSos = useCallback(() => {
    setIsSosModalOpen(false);
    addToast({
      title: 'SOS Standby',
      description: 'Emergency countdown cancelled by tourist.',
      type: 'INFO'
    });
  }, [addToast]);

  // Guide accepts incident
  const handleGuideAcceptIncident = useCallback((incidentId: string, guideId: string) => {
    soundEffects.playSafeChime();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const targetGuide = guides.find(g => g.id === guideId) || guides[0];

    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          status: 'RESPONDER_EN_ROUTE',
          assignedResponderType: 'GUIDE',
          assignedResponderId: targetGuide.id,
          assignedResponderName: `${targetGuide.fullName} (Verified Guide)`,
          etaMinutes: 4,
          timeline: [
            ...inc.timeline,
            {
              id: `tl_${Date.now()}`,
              timestamp: nowTime,
              title: `Guide ${targetGuide.fullName} Accepted Dispatch`,
              description: `Navigating directly to tourist coordinates. Real-time ETA: 4 mins.`,
              actor: 'GUIDE',
              statusAfter: 'RESPONDER_EN_ROUTE'
            }
          ]
        };
      }
      return inc;
    }));

    setGuides(prev => prev.map(g => g.id === guideId ? { ...g, status: 'RESPONDING' } : g));

    addToast({
      title: 'Guide Responding',
      description: `${targetGuide.fullName} accepted request and is navigating to the tourist (ETA: 4 min).`,
      type: 'SAFE'
    });
  }, [guides, addToast]);

  const handleGuideRejectIncident = useCallback((incidentId: string, guideId: string) => {
    addToast({
      title: 'Request Reassigned',
      description: 'Guide unavailable. System auto-reassigning to SDRF Rescue Unit.',
      type: 'CAUTION'
    });
  }, [addToast]);

  // Guide / Authority updates incident status
  const handleGuideUpdateStatus = useCallback((incidentId: string, status: IncidentStatus) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        const updatedTl = [...inc.timeline];
        if (status === 'ASSISTANCE_PROVIDED') {
          updatedTl.push({
            id: `tl_${Date.now()}`,
            timestamp: nowTime,
            title: 'Guide Reached Tourist & Rendered Assistance',
            description: 'Physical contact established. First aid and safe return guidance provided.',
            actor: 'GUIDE',
            statusAfter: 'ASSISTANCE_PROVIDED'
          });
        } else if (status === 'RESOLVED') {
          updatedTl.push({
            id: `tl_${Date.now()}`,
            timestamp: nowTime,
            title: 'Incident Resolved & Secure Return Verified',
            description: 'Tourist safely returned to National Highway corridor. Safety score restored to 90+.',
            actor: 'AUTHORITY',
            statusAfter: 'RESOLVED'
          });
        }
        return {
          ...inc,
          status,
          updatedAt: nowTime,
          timeline: updatedTl
        };
      }
      return inc;
    }));

    if (status === 'RESOLVED') {
      soundEffects.playSafeChime();
      setTourist(prev => ({
        ...prev,
        safetyScore: 92,
        safetyTier: 'SAFE'
      }));
      addToast({
        title: 'Incident Successfully Resolved',
        description: 'Tourist is safe and verified on National Highway 106. Blockchain audit record created.',
        type: 'SAFE'
      });
    }
  }, [addToast]);

  // Respond to AI Safety Check
  const respondToSafetyCheck = useCallback((isSafe: boolean) => {
    setIsSafetyPromptOpen(false);
    if (isSafe) {
      soundEffects.playSafeChime();
      setTourist(prev => ({
        ...prev,
        safetyScore: Math.min(95, prev.safetyScore + 30),
        safetyTier: 'SAFE'
      }));
      addToast({
        title: 'Safety Confirmed',
        description: 'Tourist acknowledged safety prompt. Routine monitoring active.',
        type: 'SAFE'
      });
    } else {
      triggerEmergencySos();
    }
  }, [triggerEmergencySos, addToast]);

  // Online Digital ID verification against Blockchain Hash
  const verifyDigitalIdOnline = useCallback(async (idCode: string): Promise<boolean> => {
    const hash = await computeSha256(`${idCode}:VERIFIED_BY_MEGHALAYA_POLICE`);
    const newAudit: BlockchainAuditRecord = {
      id: `audit_${Date.now()}`,
      txHash: generateMockTxHash(),
      blockNumber: 19482400,
      timestamp: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString()} IST`,
      eventType: 'DIGITAL_ID_ISSUANCE',
      summary: `QR Scan verified Digital Tourist ID #${idCode} at checkpoint.`,
      targetEntityId: idCode,
      targetEntityName: tourist.fullName,
      actor: 'Authority QR Scanner #02',
      payloadHash: hash,
      isImmutableVerified: true
    };
    setAuditTrail(prev => [newAudit, ...prev]);
    return true;
  }, [tourist.fullName]);

  // -------------------------------------------------------------
  // Simulation Controller: Steps through 20-step SIH demo flow
  // -------------------------------------------------------------
  const playScenario = useCallback((scenario: SimulationScenario) => {
    setActiveScenario(scenario);
    setSimulationStep(0);
    setIsSimulationPlaying(true);
    updateTouristLocation(scenario.initialCoords, scenario.region);
    addToast({
      title: `Demo Scenario: ${scenario.title}`,
      description: scenario.description,
      type: 'INFO'
    });
  }, [updateTouristLocation, addToast]);

  const pauseSimulation = useCallback(() => {
    setIsSimulationPlaying(false);
  }, []);

  const resumeSimulation = useCallback(() => {
    setIsSimulationPlaying(true);
  }, []);

  const resetSimulation = useCallback(() => {
    setIsSimulationPlaying(false);
    setSimulationStep(0);
    setActiveScenario(DEMO_SCENARIOS[0]);
    setTourist(INITIAL_TOURIST);
    setGeoZones(GEO_ZONES);
    setActiveZone(GEO_ZONES[0]);
    setIncidents(SEEDED_INCIDENTS);
    setActiveIncident(SEEDED_INCIDENTS[0]);
    setGuides(SEEDED_GUIDES);
    soundEffects.playSafeChime();
    addToast({
      title: 'Simulation Reset',
      description: 'System state reset to baseline Shillong Safe Corridor.',
      type: 'SAFE'
    });
  }, [addToast]);

  const stepForwardSimulation = useCallback(() => {
    setSimulationStep(prevStep => {
      const nextStep = prevStep + 1;
      
      // Step 1: Moving into High-Risk Geo-Fence
      if (nextStep === 1) {
        const nongriatCoords: Coordinates = { lat: 25.2509, lng: 91.6705 };
        updateTouristLocation(nongriatCoords, 'Nongriat Living Root Bridges Gorge');
        addToast({
          title: 'Step 1: Entered High-Risk Zone',
          description: 'Geo-fence triggered! Safety Score drops to 62 (HIGH RISK).',
          type: 'HIGH'
        });
      }
      // Step 2: Route Deviation
      else if (nextStep === 2) {
        const offRoadCoords: Coordinates = { lat: 25.2450, lng: 91.6620 };
        updateTouristLocation(offRoadCoords, 'Unmonitored Ridge Valley (620m Off-Route)');
        addToast({
          title: 'Step 2: AI Anomaly: Route Deviation',
          description: 'Tourist drifted 620m from National Highway 106 into dense ravine.',
          type: 'HIGH'
        });
      }
      // Step 3: Prolonged Inactivity & Safety Check Prompt
      else if (nextStep === 3) {
        setIsSafetyPromptOpen(true);
        soundEffects.playWarningAlert();
        addToast({
          title: 'Step 3: AI Anomaly: Inactivity',
          description: 'Zero velocity for 18 minutes. Prompting tourist: "Are you safe?"',
          type: 'CAUTION'
        });
      }
      // Step 4: No Response → Incident Created & Escalated to Authority
      else if (nextStep === 4) {
        setIsSafetyPromptOpen(false);
        triggerEmergencySos();
        addToast({
          title: 'Step 4: Prompt Timed Out → Incident Escalated',
          description: 'Authority Command Center alerted. High-priority incident INC-1042 created.',
          type: 'CRITICAL'
        });
      }
      // Step 5: Quantum Optimizer finds optimal guide
      else if (nextStep === 5) {
        runQuantumAllocation();
        addToast({
          title: 'Step 5: Quantum-Assisted Responder Matched',
          description: 'QAOA simulator matched Eco-Guide Rahul Sharma (ETA: 4 min).',
          type: 'AI'
        });
      }
      // Step 6: Guide Accepts Request
      else if (nextStep === 6) {
        handleGuideAcceptIncident('INC-1042', 'guide_rahul_01');
        addToast({
          title: 'Step 6: Guide Rahul Accepted',
          description: 'Guide is en route to tourist. Real-time GPS beacon synchronizing.',
          type: 'SAFE'
        });
      }
      // Step 7: Guide Arrives & Renders Assistance
      else if (nextStep === 7) {
        handleGuideUpdateStatus('INC-1042', 'ASSISTANCE_PROVIDED');
        addToast({
          title: 'Step 7: Guide Reached Tourist',
          description: 'Physical contact made. First aid provided and safely escorting back.',
          type: 'SAFE'
        });
      }
      // Step 8: Incident Resolved & Blockchain Audit Recorded
      else if (nextStep === 8) {
        handleGuideUpdateStatus('INC-1042', 'RESOLVED');
        const shillongSafe: Coordinates = { lat: 25.5788, lng: 91.8933 };
        updateTouristLocation(shillongSafe, 'Shillong Highway Base (Safe)');
        addToast({
          title: 'Step 8: Incident Resolved & Audited',
          description: 'Tourist safely back on main route. Blockchain audit hash generated.',
          type: 'SAFE'
        });
      }
      return nextStep > 8 ? 8 : nextStep;
    });
  }, [updateTouristLocation, triggerEmergencySos, runQuantumAllocation, handleGuideAcceptIncident, handleGuideUpdateStatus, addToast]);

  // Automated step timer when simulation is playing
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSimulationPlaying) {
      interval = setInterval(() => {
        stepForwardSimulation();
      }, 7000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulationPlaying, stepForwardSimulation]);

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        demoSafetyState,
        setDemoSafetyState,
        tourist,
        setTourist,
        guides,
        emergencyResources,
        geoZones,
        setGeoZones,
        activeZone,
        incidents,
        activeIncident,
        setActiveIncident,
        trip,
        weather,
        digitalId,
        auditTrail,
        quantumResult,
        activeTab,
        setActiveTab,
        isSosModalOpen,
        setIsSosModalOpen,
        isSafetyPromptOpen,
        setIsSafetyPromptOpen,
        isOfflineMode,
        setIsOfflineMode,
        offlineQueueCount,
        toasts,
        addToast,
        removeToast,
        triggerEmergencySos,
        cancelSos,
        handleGuideAcceptIncident,
        handleGuideRejectIncident,
        handleGuideUpdateStatus,
        respondToSafetyCheck,
        updateTouristLocation,
        runQuantumAllocation,
        verifyDigitalIdOnline,
        activeScenario,
        isSimulationPlaying,
        simulationStep,
        playScenario,
        pauseSimulation,
        resumeSimulation,
        stepForwardSimulation,
        resetSimulation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
