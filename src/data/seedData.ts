import { 
  GeoZone, 
  EmergencyResource, 
  TouristProfile, 
  GuideProfile, 
  Trip, 
  WeatherCondition, 
  Incident, 
  DigitalTouristID, 
  BlockchainAuditRecord,
  SimulationScenario,
  LanguageCode
} from '../types';

export const GEO_ZONES: GeoZone[] = [
  {
    id: 'zone_shillong_safe',
    name: 'Shillong Urban Center & Police Circle',
    category: 'SAFE',
    safetyTier: 'SAFE',
    riskBase: 8,
    color: '#4ADE80',
    center: { lat: 25.5788, lng: 91.8933 },
    radiusKm: 6.5,
    polygon: [
      { lat: 25.600, lng: 91.870 },
      { lat: 25.605, lng: 91.915 },
      { lat: 25.560, lng: 91.925 },
      { lat: 25.550, lng: 91.880 },
    ],
    description: 'High network density (5G), full police surveillance, 4 tier-1 hospitals within 15 minutes.',
    advisory: 'Standard city tourism guidelines. Safe for solo & family travelers 24/7.'
  },
  {
    id: 'zone_cherrapunji_mod',
    name: 'Cherrapunji (Sohra) Plateau & Falls Area',
    category: 'CAUTION',
    safetyTier: 'MODERATE',
    riskBase: 42,
    color: '#F5C84C',
    center: { lat: 25.2986, lng: 91.7322 },
    radiusKm: 8.0,
    polygon: [
      { lat: 25.330, lng: 91.700 },
      { lat: 25.335, lng: 91.765 },
      { lat: 25.260, lng: 91.770 },
      { lat: 25.250, lng: 91.710 },
    ],
    description: 'Frequent sudden mist, slippery limestone paths, intermittent 4G cellular coverage.',
    advisory: 'Stay on marked walkways. Keep rain protection ready and note changing weather warnings.'
  },
  {
    id: 'zone_nongriat_high',
    name: 'Nongriat Living Root Bridges & Deep Valley',
    category: 'HIGH_RISK',
    safetyTier: 'HIGH',
    riskBase: 72,
    color: '#F59E0B',
    center: { lat: 25.2509, lng: 91.6705 },
    radiusKm: 4.5,
    polygon: [
      { lat: 25.275, lng: 91.645 },
      { lat: 25.280, lng: 91.695 },
      { lat: 25.220, lng: 91.700 },
      { lat: 25.215, lng: 91.650 },
    ],
    description: '3,000+ steep steps descent, dense rainforest canopy, weak cellular reception (2G/None).',
    advisory: 'Certified guide required after 3 PM. Carry hydration and activate offline safety tracking.'
  },
  {
    id: 'zone_restricted_border',
    name: 'Southern Border Buffer & Landslide Canyon',
    category: 'RESTRICTED',
    safetyTier: 'CRITICAL',
    riskBase: 94,
    color: '#FF4D4D',
    center: { lat: 25.1850, lng: 91.6200 },
    radiusKm: 3.5,
    polygon: [
      { lat: 25.205, lng: 91.590 },
      { lat: 25.210, lng: 91.650 },
      { lat: 25.160, lng: 91.655 },
      { lat: 25.155, lng: 91.600 },
    ],
    description: 'Active landslide zone with border patrol security restrictions. No public transit.',
    advisory: 'ENTRY PROHIBITED without magistrate permit. Emergency evacuation protocol active.'
  }
];

export const EMERGENCY_RESOURCES: EmergencyResource[] = [
  {
    id: 'res_police_shillong',
    name: 'Central Tourist Police Station',
    type: 'POLICE',
    locationName: 'Police Bazar, Shillong',
    coordinates: { lat: 25.5780, lng: 91.8830 },
    distanceKm: 0.6,
    etaMinutes: 4,
    contactNumber: '+91 364 2222214',
    isAvailable: true,
    capabilities: ['Patrol Units', 'Tourist Desk', '24/7 Dispatch', 'Drone Search']
  },
  {
    id: 'res_hospital_civil',
    name: 'Shillong Civil Hospital',
    type: 'HOSPITAL',
    locationName: 'Secretariat Hills, Shillong',
    coordinates: { lat: 25.5695, lng: 91.8845 },
    distanceKm: 1.8,
    etaMinutes: 7,
    contactNumber: '+91 364 2224100',
    isAvailable: true,
    capabilities: ['Level-1 Trauma', 'ICU Beds', 'Anti-Venom', 'Helipad']
  },
  {
    id: 'res_rescue_meghalaya',
    name: 'SDRF Mountain & Cave Rescue Team',
    type: 'RESCUE_TEAM',
    locationName: 'Upper Shillong Base',
    coordinates: { lat: 25.5350, lng: 91.8480 },
    distanceKm: 5.2,
    etaMinutes: 14,
    contactNumber: '+91 364 2501000',
    isAvailable: true,
    capabilities: ['High-Angle Rope Rescue', 'Cave Extraction', 'Night FLIR Drone', 'Medical Support']
  },
  {
    id: 'res_guide_rahul',
    name: 'Rahul Sharma (Verified Eco-Guide)',
    type: 'VERIFIED_GUIDE',
    locationName: 'Cherrapunji Crossroads',
    coordinates: { lat: 25.3050, lng: 91.7280 },
    distanceKm: 1.2,
    etaMinutes: 5,
    contactNumber: '+91 98620 44102',
    isAvailable: true,
    capabilities: ['Khasi & English Fluency', 'First Aid Certified', 'Local Trail Expert', 'Satellite Beacon']
  },
  {
    id: 'res_ambulance_108',
    name: '108 Rapid Emergency Ambulance Unit 04',
    type: 'AMBULANCE',
    locationName: 'Sohra Road Junction',
    coordinates: { lat: 25.4200, lng: 91.7900 },
    distanceKm: 3.8,
    etaMinutes: 9,
    contactNumber: '108',
    isAvailable: true,
    capabilities: ['Advanced Life Support', 'Oxygen', 'Defibrillator', 'Paramedic on Board']
  }
];

export const INITIAL_TOURIST: TouristProfile = {
  id: 'tourist_varun_001',
  fullName: 'Varun',
  nationality: 'Indian',
  passportOrIdRef: 'AADHAAR-****-9821',
  digitalId: 'TR-8F29A21-MEGH',
  avatarUrl: '/varun-profile.png',
  emergencyContact: {
    name: 'Dr. S. K. Rigonda (Father)',
    relationship: 'Father',
    phone: '+91 94401 55678'
  },
  bloodGroup: 'O+ Positive',
  medicalNotes: 'No known allergies. Carrying personal inhaler for high humidity.',
  currentLocation: { lat: 25.5788, lng: 91.8933 }, // Shillong initial
  currentLocationName: 'Shillong Urban Center',
  currentTripId: 'trip_shillong_cherra_01',
  safetyScore: 92,
  safetyTier: 'SAFE',
  isSharingLocation: true,
  familySharingEnabled: true
};

export const SEEDED_GUIDES: GuideProfile[] = [
  {
    id: 'guide_rahul_01',
    fullName: 'Rahul Sharma',
    phone: '+91 98620 44102',
    languages: ['English', 'Hindi', 'Khasi', 'Assamese'],
    rating: 4.95,
    reviewCount: 148,
    badgeNumber: 'MEGH-TOUR-8842',
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    status: 'AVAILABLE',
    currentLocation: { lat: 25.3020, lng: 91.7300 },
    specialization: 'High-Altitude Trekking, Living Root Bridges, First Aid Level 3',
    yearsOfExperience: 8
  },
  {
    id: 'guide_ananya_02',
    fullName: 'Ananya Das',
    phone: '+91 98630 11980',
    languages: ['English', 'Hindi', 'Bengali', 'Khasi'],
    rating: 4.91,
    reviewCount: 96,
    badgeNumber: 'MEGH-TOUR-9102',
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    status: 'AVAILABLE',
    currentLocation: { lat: 25.5720, lng: 91.8880 },
    specialization: 'Cave Expedition, Flora & Heritage trails, Emergency Responder',
    yearsOfExperience: 6
  },
  {
    id: 'guide_aman_03',
    fullName: 'Aman Lyngdoh Singh',
    phone: '+91 97740 88211',
    languages: ['English', 'Khasi', 'Hindi'],
    rating: 4.88,
    reviewCount: 72,
    badgeNumber: 'MEGH-TOUR-7430',
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    status: 'AVAILABLE',
    currentLocation: { lat: 25.2600, lng: 91.6800 },
    specialization: 'Deep Valley Search & Rescue, Rain Weather Navigation',
    yearsOfExperience: 10
  }
];

export const INITIAL_WEATHER: WeatherCondition = {
  condition: 'CLEAR',
  tempC: 21,
  humidityPct: 68,
  windSpeedKmh: 11,
  visibilityKm: 9.5,
  riskFactor: 4,
  advisory: 'Favorable travel conditions across Shillong and Sohra plateau.'
};

export const CANDIDATE_ROUTES = [
  {
    id: 'route_safe_scenic',
    name: 'National Highway 106 — Safety Monitored Corridor (Recommended)',
    distanceKm: 54,
    durationMinutes: 75,
    riskScore: 16,
    safetyTier: 'SAFE' as const,
    description: 'Paved highway with 24/7 tourist police patrol booths, continuous 5G network coverage, and solar emergency SOS posts.',
    terrainQuality: 'PAVED' as const,
    emergencyCoverage: 'FULL' as const,
    networkStrength: '4G_5G' as const,
    weatherRisk: 'LOW' as const,
    isRecommended: true,
    pathCoordinates: [
      { lat: 25.5788, lng: 91.8933 },
      { lat: 25.5100, lng: 91.8400 },
      { lat: 25.4300, lng: 91.7900 },
      { lat: 25.3500, lng: 91.7500 },
      { lat: 25.2986, lng: 91.7322 }
    ]
  },
  {
    id: 'route_alternate_scenic',
    name: 'Mawkdok Dympep Valley View Scenic Bypass',
    distanceKm: 61,
    durationMinutes: 95,
    riskScore: 48,
    safetyTier: 'MODERATE' as const,
    description: 'Scenic ridge drive with sudden afternoon fog pockets. Intermittent 3G network coverage along gorge sections.',
    terrainQuality: 'PAVED' as const,
    emergencyCoverage: 'PARTIAL' as const,
    networkStrength: '2G_EDGE' as const,
    weatherRisk: 'MEDIUM' as const,
    isRecommended: false,
    pathCoordinates: [
      { lat: 25.5788, lng: 91.8933 },
      { lat: 25.5300, lng: 91.8000 },
      { lat: 25.3800, lng: 91.7100 },
      { lat: 25.2986, lng: 91.7322 }
    ]
  },
  {
    id: 'route_unadvised_forest',
    name: 'Old Forest Ridge Trail (High Risk / Unpaved)',
    distanceKm: 42,
    durationMinutes: 120,
    riskScore: 82,
    safetyTier: 'HIGH' as const,
    description: 'Narrow dirt tracks, heavy landslide risk, zero cellular reception for 18km. Not monitored by police.',
    terrainQuality: 'HAZARDOUS' as const,
    emergencyCoverage: 'MINIMAL' as const,
    networkStrength: 'NO_SIGNAL' as const,
    weatherRisk: 'HIGH' as const,
    isRecommended: false,
    pathCoordinates: [
      { lat: 25.5788, lng: 91.8933 },
      { lat: 25.4500, lng: 91.7200 },
      { lat: 25.3200, lng: 91.6600 },
      { lat: 25.2500, lng: 91.6700 }
    ]
  }
];

export const INITIAL_TRIP: Trip = {
  id: 'trip_shillong_cherra_01',
  touristId: 'tourist_varun_001',
  title: 'Meghalaya Highland & Root Bridge Expedition',
  origin: 'Shillong Capital Circle',
  destination: 'Cherrapunji (Sohra)',
  startDate: '18 Aug 2026',
  endDate: '25 Aug 2026',
  currentProgressPct: 35,
  selectedRoute: CANDIDATE_ROUTES[0],
  alternativeRoutes: [CANDIDATE_ROUTES[1], CANDIDATE_ROUTES[2]],
  assignedGuideId: 'guide_rahul_01',
  weatherCondition: INITIAL_WEATHER
};

export const INITIAL_DIGITAL_ID: DigitalTouristID = {
  touristId: 'tourist_varun_001',
  fullName: 'Varun',
  digitalIdCode: 'TR-8F29A21-MEGH',
  photoUrl: '/varun-profile.png',
  nationality: 'Indian',
  destinationState: 'Meghalaya, India',
  tripValidityStart: '18 AUG 2026',
  tripValidityEnd: '25 AUG 2026',
  emergencyContact: '+91 94401 55678 (Dr. S. K. Rigonda)',
  medicalInfo: 'Blood: O+ | No Chronic Illness | Verified ID',
  sha256Hash: '0x8f29a21b47c9038e914dfb02c81934e67104b2a8d11c7508e3cf219084128a1c',
  qrPayload: JSON.stringify({
    id: 'TR-8F29A21-MEGH',
    name: 'Varun',
    validUntil: '2026-08-25',
    authHash: '0x8f29a21b47c9038e914dfb02c81934e67104b2a8d11c7508e3cf219084128a1c',
    issuer: 'Meghalaya Tourism Police Authority',
    emergency: '+91 94401 55678'
  }),
  isVerified: true,
  issuer: 'Meghalaya Tourism Police & Smart Tourist Registry'
};

export const INITIAL_AUDIT_TRAIL: BlockchainAuditRecord[] = [
  {
    id: 'audit_tx_001',
    txHash: '0x3a91f8c29188e7b1a0398f41e05d928374829104bfa9381c7429184001928412',
    blockNumber: 19482104,
    timestamp: '2026-08-18 09:15:22 IST',
    eventType: 'DIGITAL_ID_ISSUANCE',
    summary: 'Digital Tourist ID issued to Varun Teja Rigonda with cryptographic Merkle proof.',
    targetEntityId: 'TR-8F29A21-MEGH',
    targetEntityName: 'Varun Teja Rigonda',
    actor: 'Tourism Police Gateway Node #01',
    payloadHash: '0x8f29a21b47c9038e914dfb02c81934e67104b2a8d11c7508e3cf219084128a1c',
    isImmutableVerified: true
  },
  {
    id: 'audit_tx_002',
    txHash: '0x99b1772c41808e627419e1903487192847a98218e74198284719284918239411',
    blockNumber: 19482180,
    timestamp: '2026-08-18 10:05:40 IST',
    eventType: 'GUIDE_ASSIGNMENT',
    summary: 'Verified Eco-Guide Rahul Sharma (MEGH-TOUR-8842) assigned to trip #trip_shillong_cherra_01',
    targetEntityId: 'guide_rahul_01',
    targetEntityName: 'Rahul Sharma',
    actor: 'Smart Allocation Engine (Classical/QUBO hybrid)',
    payloadHash: '0x712a884f991c01e8284710294871829487192847192847192847192847192847',
    isImmutableVerified: true
  }
];

export const SEEDED_INCIDENTS: Incident[] = [
  {
    id: 'INC-1042',
    touristId: 'tourist_varun_001',
    touristName: 'Varun',
    touristPhoto: '/varun-profile.png',
    digitalId: 'TR-8F29A21-MEGH',
    type: 'ROUTE_DEVIATION',
    severity: 'HIGH',
    riskScore: 84,
    locationName: 'Nongriat Remote Forest Gorge',
    coordinates: { lat: 25.2509, lng: 91.6705 },
    createdAt: '10:42:15 AM',
    updatedAt: '10:48:30 AM',
    status: 'RESPONDER_EN_ROUTE',
    assignedResponderType: 'GUIDE',
    assignedResponderId: 'guide_rahul_01',
    assignedResponderName: 'Rahul Sharma (Verified Guide)',
    etaMinutes: 4,
    aiExplanation: 'Composite Risk: High-Risk Zone (+25) + Significant 620m Route Deviation (+20) + 18-minute prolonged inactivity (+20) + Low cellular signal (+10) + Rain alert (+9). Total: 84/100.',
    timeline: [
      {
        id: 'tl_1',
        timestamp: '10:42 AM',
        title: 'Entered High-Risk Geo-Zone',
        description: 'Tourist entered Nongriat Living Root Bridges gorge perimeter.',
        actor: 'AI_ENGINE',
        statusAfter: 'DETECTED'
      },
      {
        id: 'tl_2',
        timestamp: '10:44 AM',
        title: 'Route Deviation Detected',
        description: 'Tourist deviated 620m from National Highway 106 corridor.',
        actor: 'AI_ENGINE',
        statusAfter: 'WARNING_SENT'
      },
      {
        id: 'tl_3',
        timestamp: '10:46 AM',
        title: 'Prolonged Inactivity Anomaly',
        description: 'Zero velocity detected for > 15 minutes in rugged terrain.',
        actor: 'AI_ENGINE',
        statusAfter: 'AWAITING_RESPONSE'
      },
      {
        id: 'tl_4',
        timestamp: '10:48 AM',
        title: 'No-Response Escalation',
        description: 'Safety check prompt timed out after 120 seconds. Incident escalated to Authority.',
        actor: 'SYSTEM',
        statusAfter: 'ESCALATED'
      },
      {
        id: 'tl_5',
        timestamp: '10:50 AM',
        title: 'Guide Rahul Sharma Dispatched',
        description: 'Nearest verified guide received dispatch ticket and accepted navigation.',
        actor: 'GUIDE',
        statusAfter: 'RESPONDER_EN_ROUTE'
      }
    ],
    blockchainAuditTx: '0x3a91f8c29188e7b1a0398f41e05d928374829104bfa9381c7429184001928412'
  }
];

export const DEMO_SCENARIOS: SimulationScenario[] = [
  {
    id: 'scen_normal_shillong',
    title: '1. Normal Safe Journey (Shillong)',
    description: 'Tourist moves within city center. Full network, zero deviation. Safety Score 92/100 (🟢 SAFE).',
    region: 'SHILLONG',
    targetSafetyScore: 92,
    targetTier: 'SAFE',
    initialCoords: { lat: 25.5788, lng: 91.8933 },
    destinationCoords: { lat: 25.5650, lng: 91.8900 },
    deviationActive: false,
    inactivityActive: false,
    sosActive: false,
    guideAssigned: false
  },
  {
    id: 'scen_moderate_cherra',
    title: '2. Moderate Caution (Cherrapunji Plateau)',
    description: 'Moving into hilly terrain with heavy mist and intermittent signal. Safety Score 65/100 (🟡 MODERATE).',
    region: 'CHERRAPUNJI',
    targetSafetyScore: 65,
    targetTier: 'MODERATE',
    initialCoords: { lat: 25.2986, lng: 91.7322 },
    destinationCoords: { lat: 25.2800, lng: 91.7100 },
    deviationActive: false,
    inactivityActive: false,
    sosActive: false,
    guideAssigned: false
  },
  {
    id: 'scen_high_risk_deviation',
    title: '3. SIH Showcase: Geo-Fence + Route Deviation + AI Anomaly',
    description: 'Tourist enters dense forest gorge, deviates 600m off-track, stops moving. Safety Score drops to 24/100 (🟠 HIGH RISK / 🔴 CRITICAL).',
    region: 'REMOTE_FOREST',
    targetSafetyScore: 24,
    targetTier: 'HIGH',
    initialCoords: { lat: 25.2509, lng: 91.6705 },
    destinationCoords: { lat: 25.2400, lng: 91.6600 },
    deviationActive: true,
    inactivityActive: true,
    sosActive: false,
    guideAssigned: true
  },
  {
    id: 'scen_critical_sos',
    title: '4. Critical SOS & Emergency Dispatch',
    description: 'Tourist triggers instant SOS in restricted perimeter. Direct dispatch to Police, Ambulance & Guides with live telemetry.',
    region: 'RESTRICTED_ZONE',
    targetSafetyScore: 10,
    targetTier: 'CRITICAL',
    initialCoords: { lat: 25.1850, lng: 91.6200 },
    destinationCoords: { lat: 25.1800, lng: 91.6100 },
    deviationActive: true,
    inactivityActive: true,
    sosActive: true,
    guideAssigned: true
  }
];

export const MULTI_LANG_STRINGS: Record<LanguageCode, Record<string, string>> = {
  en: {
    appTitle: 'SURAKSHA YATRA',
    tagline: 'Travel freely. Travel safely.',
    safe: 'SAFE',
    moderate: 'MODERATE',
    highRisk: 'HIGH RISK',
    critical: 'CRITICAL',
    emergency: 'EMERGENCY',
    safetyScore: 'SAFETY SCORE',
    youAreSafe: 'YOU ARE SAFE',
    cautionAdvisory: 'EXERCISE CAUTION',
    highRiskWarning: 'HIGH RISK WARNING',
    criticalEmergency: 'EMERGENCY DETECTED',
    sosButton: 'EMERGENCY SOS',
    holdForEmergency: 'HOLD FOR SOS (3s)',
    myTrip: 'My Active Trip',
    digitalId: 'Digital Tourist ID',
    guide: 'Verified Guide',
    authority: 'Authority Command',
    aiAssistant: 'AI Safety Buddy',
    nearestHospital: 'Nearest Hospital',
    policeStation: 'Police Station',
    findGuide: 'Find Verified Guide',
    safeRoute: 'Safe Route Recommendation',
    demoControl: 'SIH Demo Simulator',
    quantumOptimizer: 'Quantum Responder Allocation',
    blockchainAudit: 'Blockchain Audit Trail'
  },
  hi: {
    appTitle: 'सुरक्षा यात्रा',
    tagline: 'निडर घूमें, सुरक्षित रहें।',
    safe: 'सुरक्षित',
    moderate: 'मध्यम सतर्कता',
    highRisk: 'उच्च जोखिम',
    critical: 'आपातकालीन',
    emergency: 'आपातकाल',
    safetyScore: 'सुरक्षा स्कोर',
    youAreSafe: 'आप सुरक्षित हैं',
    cautionAdvisory: 'सावधानी बरतें',
    highRiskWarning: 'उच्च जोखिम चेतावनी',
    criticalEmergency: 'आपातकाल का पता चला',
    sosButton: 'आपातकालीन एसओएस',
    holdForEmergency: 'एसओएस के लिए दबाए रखें (3s)',
    myTrip: 'मेरी सक्रिय यात्रा',
    digitalId: 'डिजिटल पर्यटक आईडी',
    guide: 'सत्यापित गाइड',
    authority: 'प्राधिकरण कमांड',
    aiAssistant: 'एआई सुरक्षा साथी',
    nearestHospital: 'निकटतम अस्पताल',
    policeStation: 'पुलिस थाना',
    findGuide: 'सत्यापित गाइड खोजें',
    safeRoute: 'सुरक्षित मार्ग सिफारिश',
    demoControl: 'एसआईएच डेमो सिम्युलेटर',
    quantumOptimizer: 'क्वांटम रिस्पॉन्डर आवंटन',
    blockchainAudit: 'ब्लॉकचेन ऑडिट ट्रेल'
  },
  as: {
    appTitle: 'সুৰক্ষা যাত্ৰা',
    tagline: 'নিৰ্ভয়ে ভ্ৰমণ কৰক, সুৰক্ষিত থাকক।',
    safe: 'সুৰক্ষিত',
    moderate: 'সতৰ্কতা',
    highRisk: 'উচ্চ সংকট',
    critical: 'জৰুৰীকালীন',
    emergency: 'জৰুৰীকালীন',
    safetyScore: 'সুৰক্ষা নম্বৰ',
    youAreSafe: 'আপুনি সুৰক্ষিত',
    cautionAdvisory: 'সাৱধানতা অৱলম্বন কৰক',
    highRiskWarning: 'উচ্চ আশংকাৰ সতৰ্কবাণী',
    criticalEmergency: 'জৰুৰী অৱস্থা ধৰা পৰিছে',
    sosButton: 'জৰুৰীকালীন SOS',
    holdForEmergency: 'SOS ৰ বাবে ধৰি ৰাখক (3s)',
    myTrip: 'মোৰ ভ্ৰমণ',
    digitalId: 'ডিজিটেল পৰ্যটক পৰিচয় পত্ৰ',
    guide: 'প্ৰমাণিত গাইড',
    authority: 'কৰ্তৃপক্ষ নিয়ন্ত্ৰণ কক্ষ',
    aiAssistant: 'এআই সুৰক্ষা সহযোগী',
    nearestHospital: 'নিকটতম চিকিৎসালয়',
    policeStation: 'আৰক্ষী চকী',
    findGuide: 'প্ৰমাণিত গাইড বিচাৰক',
    safeRoute: 'সুৰক্ষিত পথ',
    demoControl: 'SIH ডেমো চিমুলেটৰ',
    quantumOptimizer: 'কোৱাণ্টাম অপ্টিমাইজেচন',
    blockchainAudit: 'ব্লকচেইন অডিট'
  },
  kha: {
    appTitle: 'SURAKSHA YATRA',
    tagline: 'Leit shngain. Leit suk.',
    safe: 'SHNGAIN',
    moderate: 'SUMAR',
    highRisk: 'MA-SHISHA',
    critical: 'KHAM MA',
    emergency: 'EMERGENCY',
    safetyScore: 'KA SCORE JINGSHNGAIN',
    youAreSafe: 'PHI SHNGAIN BHA',
    cautionAdvisory: 'SUMAR BHA HA KA LYNTI',
    highRiskWarning: 'KHYNDIAT KA JINGMA',
    criticalEmergency: 'SHEM JINGKYNDIT',
    sosButton: 'SOS KYNDIT',
    holdForEmergency: 'BAT PYRSHANG SOS (3s)',
    myTrip: 'KA JINGLEIT JONG NGA',
    digitalId: 'DIGITAL ID TOURIST',
    guide: 'GUIDE BA LA PHLA',
    authority: 'PULIS & AUTHORITY',
    aiAssistant: 'AI COMPANION',
    nearestHospital: 'HOSPITAL BA JAN TAM',
    policeStation: 'THANAH PULIS',
    findGuide: 'WAD GUIDE',
    safeRoute: 'LYNTI BA SHNGAIN',
    demoControl: 'SIH DEMO SIMULATOR',
    quantumOptimizer: 'QUANTUM ALLOCATION',
    blockchainAudit: 'BLOCKCHAIN AUDIT'
  },
  bn: {
    appTitle: 'সুরক্ষা যাত্রা',
    tagline: 'নির্ভয়ে ভ্রমণ করুন, সুরক্ষিত থাকুন।',
    safe: 'নিরাপদ',
    moderate: 'সতর্কতা',
    highRisk: 'উচ্চ ঝুঁকি',
    critical: 'জরুরি অবস্থা',
    emergency: 'জরুরি অবস্থা',
    safetyScore: 'সুরক্ষা স্কোর',
    youAreSafe: 'আপনি নিরাপদ আছেন',
    cautionAdvisory: 'সাবধানতা অবলম্বন করুন',
    highRiskWarning: 'উচ্চ ঝুঁকির সতর্কতা',
    criticalEmergency: 'জরুরি অবস্থা সনাক্ত হয়েছে',
    sosButton: 'জরুরি এসওএস',
    holdForEmergency: 'SOS এর জন্য চেপে ধরুন (3s)',
    myTrip: 'আমার সক্রিয় ভ্রমণ',
    digitalId: 'ডিজিটাল ট্যুরিস্ট আইডি',
    guide: 'যাচাইকৃত গাইড',
    authority: 'কর্তৃপক্ষ কমান্ড সেন্টার',
    aiAssistant: 'এআই সুরক্ষা সঙ্গী',
    nearestHospital: 'নিকটবর্তী হাসপাতাল',
    policeStation: 'থানা',
    findGuide: 'যাচাইকৃত গাইড খুঁজুন',
    safeRoute: 'নিরাপদ পথ',
    demoControl: 'SIH ডেমো সিমুলেটর',
    quantumOptimizer: 'কোয়ান্টাম অপটিমাইজেশন',
    blockchainAudit: 'ব্লকচেইন অডিট ট্রেল'
  }
};
