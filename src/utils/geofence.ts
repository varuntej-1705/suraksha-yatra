import { Coordinates, GeoZone, SafetyTier, RiskFactor, AIAnomalyDetection, WeatherCondition } from '../types';

// Calculate Haversine distance between two coordinates in Kilometers
export function calculateDistanceKm(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(2));
}

// Ray-casting point in polygon algorithm
export function isPointInPolygon(point: Coordinates, polygon: Coordinates[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lat, yi = polygon[i].lng;
    const xj = polygon[j].lat, yj = polygon[j].lng;

    const intersect =
      yi > point.lng !== yj > point.lng &&
      point.lat < ((xj - xi) * (point.lng - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// Find the active zone for coordinates
export function detectActiveGeoZone(point: Coordinates, zones: GeoZone[]): GeoZone {
  for (const zone of zones) {
    if (isPointInPolygon(point, zone.polygon)) {
      return zone;
    }
    // Also check radial distance to center
    const dist = calculateDistanceKm(point, zone.center);
    if (dist <= zone.radiusKm * 0.7) {
      return zone;
    }
  }
  // Default to first safe zone if outside
  return zones[0];
}

// Explainable AI Risk Score Calculator
export function computeExplainableRisk(params: {
  zone: GeoZone;
  routeDeviationMeters: number;
  inactivityMinutes: number;
  weather: WeatherCondition;
  isNightTime?: boolean;
  sosTriggered?: boolean;
}): {
  riskScore: number;
  safetyScore: number;
  safetyTier: SafetyTier;
  factors: RiskFactor[];
  suggestedAction: string;
} {
  const { zone, routeDeviationMeters, inactivityMinutes, weather, sosTriggered } = params;
  const factors: RiskFactor[] = [];
  let calculatedRisk = 0;

  // Factor 1: Geo-zone base risk
  const zoneImpact = zone.riskBase;
  calculatedRisk += zoneImpact;
  factors.push({
    factor: `Geo-Zone: ${zone.name}`,
    impactScore: zoneImpact,
    description: zone.description,
    severity: zone.safetyTier === 'CRITICAL' ? 'critical' : zone.safetyTier === 'HIGH' ? 'high' : zone.safetyTier === 'MODERATE' ? 'moderate' : 'low'
  });

  // Factor 2: Route Deviation
  if (routeDeviationMeters > 300) {
    const devImpact = Math.min(25, Math.round(routeDeviationMeters / 30));
    calculatedRisk += devImpact;
    factors.push({
      factor: `Route Deviation (${routeDeviationMeters}m off-corridor)`,
      impactScore: devImpact,
      description: 'Tourist has drifted off verified paved highway route into unmonitored terrain.',
      severity: routeDeviationMeters > 500 ? 'high' : 'moderate'
    });
  }

  // Factor 3: Prolonged Inactivity
  if (inactivityMinutes > 10) {
    const inactImpact = Math.min(25, Math.round(inactivityMinutes * 1.3));
    calculatedRisk += inactImpact;
    factors.push({
      factor: `Prolonged Inactivity (${inactivityMinutes} min)`,
      impactScore: inactImpact,
      description: 'Zero forward movement detected in high-elevation or remote topography.',
      severity: inactivityMinutes > 20 ? 'high' : 'moderate'
    });
  }

  // Factor 4: Weather & Visibility
  if (weather.riskFactor > 0) {
    const weatherImpact = weather.riskFactor * 3;
    calculatedRisk += weatherImpact;
    factors.push({
      factor: `Weather Condition: ${weather.condition}`,
      impactScore: weatherImpact,
      description: `${weather.advisory} (Visibility: ${weather.visibilityKm}km, Humidity: ${weather.humidityPct}%)`,
      severity: weather.condition === 'STORM' || weather.condition === 'MONSOON_ALERT' ? 'high' : 'low'
    });
  }

  // Factor 5: Emergency SOS Override
  if (sosTriggered) {
    calculatedRisk = Math.max(90, calculatedRisk + 40);
    factors.unshift({
      factor: 'EMERGENCY SOS MANUAL TRIGGER',
      impactScore: 50,
      description: 'Tourist actively held SOS panic trigger. Immediate rescue dispatch initiated.',
      severity: 'critical'
    });
  }

  // Clamp 0 - 100
  const riskScore = Math.min(100, Math.max(0, calculatedRisk));
  const safetyScore = Math.max(0, 100 - riskScore);

  let safetyTier: SafetyTier = 'SAFE';
  let suggestedAction = 'Enjoy your trip. All safety markers and networks are nominal.';

  if (riskScore >= 81 || sosTriggered) {
    safetyTier = 'CRITICAL';
    suggestedAction = 'CRITICAL ALERT: Emergency responders dispatched. Stay stationary at marked location and keep device powered.';
  } else if (riskScore >= 61) {
    safetyTier = 'HIGH';
    suggestedAction = 'HIGH RISK: Immediately return to National Highway 106 or connect with assigned Eco-Guide Rahul Sharma.';
  } else if (riskScore >= 31) {
    safetyTier = 'MODERATE';
    suggestedAction = 'CAUTION: Changing terrain and fog detected. Stick to marked walking paths and observe local signboards.';
  }

  return {
    riskScore,
    safetyScore,
    safetyTier,
    factors,
    suggestedAction
  };
}

export function detectAnomalies(
  currentPos: Coordinates,
  plannedRouteCoords: Coordinates[],
  inactivityMin: number,
  zone: GeoZone
): AIAnomalyDetection {
  // Compute minimum distance to any point along the route
  let minDistanceKm = 999;
  for (const pt of plannedRouteCoords) {
    const d = calculateDistanceKm(currentPos, pt);
    if (d < minDistanceKm) minDistanceKm = d;
  }
  const deviationMeters = Math.round(minDistanceKm * 1000);
  const routeDeviationDetected = deviationMeters > 350;
  const inactivityDetected = inactivityMin >= 12;

  const { riskScore, factors, suggestedAction } = computeExplainableRisk({
    zone,
    routeDeviationMeters: deviationMeters,
    inactivityMinutes: inactivityMin,
    weather: {
      condition: 'CLEAR',
      tempC: 22,
      humidityPct: 65,
      windSpeedKmh: 10,
      visibilityKm: 10,
      riskFactor: 2,
      advisory: 'Clear'
    }
  });

  return {
    routeDeviationDetected,
    deviationMeters,
    inactivityDetected,
    inactivityMinutes: inactivityMin,
    noResponseCount: inactivityDetected && routeDeviationDetected ? 1 : 0,
    riskScore,
    factors,
    suggestedAction,
    timestamp: new Date().toLocaleTimeString()
  };
}
