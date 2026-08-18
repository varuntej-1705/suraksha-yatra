export type UserRole = 'TOURIST' | 'GUIDE' | 'AUTHORITY' | 'ADMIN' | 'RESPONDER';

export type SafetyTier = 'SAFE' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type IncidentStatus = 
  | 'DETECTED' 
  | 'WARNING_SENT' 
  | 'AWAITING_RESPONSE' 
  | 'ESCALATED' 
  | 'RESPONDER_ASSIGNED' 
  | 'RESPONDER_EN_ROUTE' 
  | 'ASSISTANCE_PROVIDED' 
  | 'RESOLVED' 
  | 'CLOSED';

export type LanguageCode = 'en' | 'hi' | 'as' | 'kha' | 'bn';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GeoZone {
  id: string;
  name: string;
  category: 'SAFE' | 'CAUTION' | 'HIGH_RISK' | 'RESTRICTED';
  safetyTier: SafetyTier;
  riskBase: number;
  polygon: Coordinates[];
  center: Coordinates;
  radiusKm: number;
  description: string;
  advisory: string;
  color: string;
}

export interface EmergencyResource {
  id: string;
  name: string;
  type: 'POLICE' | 'HOSPITAL' | 'AMBULANCE' | 'RESCUE_TEAM' | 'VERIFIED_GUIDE';
  locationName: string;
  coordinates: Coordinates;
  distanceKm: number;
  etaMinutes: number;
  contactNumber: string;
  isAvailable: boolean;
  capabilities: string[];
}

export interface TouristProfile {
  id: string;
  fullName: string;
  nationality: string;
  passportOrIdRef: string;
  digitalId: string;
  avatarUrl: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  bloodGroup: string;
  medicalNotes?: string;
  currentLocation: Coordinates;
  currentLocationName: string;
  currentTripId: string;
  safetyScore: number;
  safetyTier: SafetyTier;
  isSharingLocation: boolean;
  familySharingEnabled: boolean;
}

export interface GuideProfile {
  id: string;
  fullName: string;
  phone: string;
  languages: string[];
  rating: number;
  reviewCount: number;
  badgeNumber: string;
  isVerified: boolean;
  avatarUrl: string;
  status: 'AVAILABLE' | 'BUSY' | 'ON_DUTY' | 'RESPONDING';
  currentLocation: Coordinates;
  assignedIncidentId?: string;
  specialization: string;
  yearsOfExperience: number;
}

export interface CandidateRoute {
  id: string;
  name: string;
  distanceKm: number;
  durationMinutes: number;
  riskScore: number;
  safetyTier: SafetyTier;
  description: string;
  terrainQuality: 'PAVED' | 'GRAVEL' | 'HAZARDOUS' | 'STEEP';
  emergencyCoverage: 'FULL' | 'PARTIAL' | 'MINIMAL';
  networkStrength: '4G_5G' | '2G_EDGE' | 'NO_SIGNAL';
  weatherRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  isRecommended: boolean;
  pathCoordinates: Coordinates[];
}

export interface Trip {
  id: string;
  touristId: string;
  title: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  currentProgressPct: number;
  selectedRoute: CandidateRoute;
  alternativeRoutes: CandidateRoute[];
  assignedGuideId?: string;
  weatherCondition: WeatherCondition;
}

export interface WeatherCondition {
  condition: 'CLEAR' | 'HEAVY_RAIN' | 'STORM' | 'LOW_VISIBILITY' | 'MONSOON_ALERT';
  tempC: number;
  humidityPct: number;
  windSpeedKmh: number;
  visibilityKm: number;
  riskFactor: number;
  advisory: string;
}

export interface RiskFactor {
  factor: string;
  impactScore: number;
  description: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
}

export interface AIAnomalyDetection {
  routeDeviationDetected: boolean;
  deviationMeters: number;
  inactivityDetected: boolean;
  inactivityMinutes: number;
  noResponseCount: number;
  riskScore: number;
  factors: RiskFactor[];
  suggestedAction: string;
  timestamp: string;
}

export interface IncidentTimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  actor: 'SYSTEM' | 'AI_ENGINE' | 'TOURIST' | 'GUIDE' | 'AUTHORITY' | 'RESPONDER';
  statusAfter: IncidentStatus;
}

export interface Incident {
  id: string;
  touristId: string;
  touristName: string;
  touristPhoto: string;
  digitalId: string;
  type: 'GEO_FENCE_BREACH' | 'ROUTE_DEVIATION' | 'PROLONGED_INACTIVITY' | 'SOS_TRIGGER' | 'MEDICAL_EMERGENCY' | 'WEATHER_DISASTER';
  severity: SafetyTier;
  riskScore: number;
  locationName: string;
  coordinates: Coordinates;
  createdAt: string;
  updatedAt: string;
  status: IncidentStatus;
  assignedResponderType?: 'GUIDE' | 'POLICE' | 'AMBULANCE' | 'RESCUE_TEAM';
  assignedResponderId?: string;
  assignedResponderName?: string;
  etaMinutes?: number;
  aiExplanation: string;
  timeline: IncidentTimelineEvent[];
  blockchainAuditTx?: string;
}

export interface DigitalTouristID {
  touristId: string;
  fullName: string;
  digitalIdCode: string;
  photoUrl: string;
  nationality: string;
  destinationState: string;
  tripValidityStart: string;
  tripValidityEnd: string;
  emergencyContact: string;
  medicalInfo: string;
  sha256Hash: string;
  qrPayload: string;
  isVerified: boolean;
  issuer: string;
}

export interface BlockchainAuditRecord {
  id: string;
  txHash: string;
  blockNumber: number;
  timestamp: string;
  eventType: 'DIGITAL_ID_ISSUANCE' | 'INCIDENT_ESCALATION' | 'GUIDE_ASSIGNMENT' | 'INCIDENT_RESOLUTION' | 'GEO_FENCE_BREACH';
  summary: string;
  targetEntityId: string;
  targetEntityName: string;
  actor: string;
  payloadHash: string;
  isImmutableVerified: boolean;
}

export interface QuantumOptimizationResult {
  runId: string;
  timestamp: string;
  activeIncidentsCount: number;
  availableRespondersCount: number;
  classicalRuntimeMs: number;
  classicalObjectivePenalty: number;
  classicalAssignments: { incidentId: string; responderId: string; responderName: string; etaMin: number }[];
  quantumQaoaRuntimeMs: number;
  quantumObjectivePenalty: number;
  quantumAssignments: { incidentId: string; responderId: string; responderName: string; etaMin: number }[];
  penaltyImprovementPct: number;
  quboMatrixSize: string;
  qaoaCircuitDepth: number;
  simulatorBackend: string;
}

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  region: 'SHILLONG' | 'CHERRAPUNJI' | 'REMOTE_FOREST' | 'RESTRICTED_ZONE';
  targetSafetyScore: number;
  targetTier: SafetyTier;
  initialCoords: Coordinates;
  destinationCoords: Coordinates;
  deviationActive: boolean;
  inactivityActive: boolean;
  sosActive: boolean;
  guideAssigned: boolean;
}
