import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { 
  GeoZone, 
  EmergencyResource, 
  GuideProfile, 
  Incident, 
  Coordinates 
} from '../../types';
import { 
  Layers, 
  Crosshair, 
  ZoomIn, 
  ZoomOut, 
  ShieldAlert, 
  ShieldCheck, 
  Hospital, 
  UserCheck, 
  AlertOctagon, 
  X, 
  ExternalLink,
  Phone,
  Navigation2,
  Search,
  Maximize2,
  Compass,
  MapPin,
  Flame,
  Radio,
  Eye,
  Sparkles,
  Mountain,
  Waves,
  SunMedium
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

interface MapProps {
  heightClass?: string;
  selectedIncidentId?: string;
  onSelectIncident?: (incident: Incident) => void;
}

type MapLayerType = 'SATELLITE' | 'DARK' | 'STREETS' | 'TERRAIN';

interface LandmarkPlace {
  id: string;
  name: string;
  category: 'WATERFALL' | 'HERITAGE' | 'CAVE' | 'CANYON' | 'VILLAGE' | 'LAKE' | 'VIEWPOINT';
  coordinates: Coordinates;
  elevationM: number;
  description: string;
  rating: number;
  safetyScore: number;
  thumbnail: string;
}

const MEGHALAYA_LANDMARKS: LandmarkPlace[] = [
  {
    id: 'nohkalikai',
    name: 'Nohkalikai Falls (340m)',
    category: 'WATERFALL',
    coordinates: { lat: 25.2757, lng: 91.6853 },
    elevationM: 1240,
    description: 'Tallest plunge waterfall in India with scenic turquoise mist pool and canyon cliffs.',
    rating: 4.9,
    safetyScore: 82,
    thumbnail: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'root_bridge',
    name: 'Double Decker Living Root Bridge',
    category: 'HERITAGE',
    coordinates: { lat: 25.2496, lng: 91.6705 },
    elevationM: 680,
    description: 'Centuries-old bio-engineered Ficus elastica living root bridges across Nongriat River.',
    rating: 5.0,
    safetyScore: 68,
    thumbnail: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'cherrapunji_sohra',
    name: 'Cherrapunji (Sohra) Plateau',
    category: 'VIEWPOINT',
    coordinates: { lat: 25.2702, lng: 91.7323 },
    elevationM: 1430,
    description: 'Renowned misty high plateau overlooking Bangladesh plains and limestone valleys.',
    rating: 4.8,
    safetyScore: 88,
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'laitlum_canyons',
    name: 'Laitlum Grand Canyon',
    category: 'CANYON',
    coordinates: { lat: 25.4489, lng: 91.9022 },
    elevationM: 1510,
    description: 'Endless emerald ridges plunging into deep river gorges. Famous for cloud inversions.',
    rating: 4.9,
    safetyScore: 74,
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'dawki_river',
    name: 'Dawki & Umngot Crystal River',
    category: 'LAKE',
    coordinates: { lat: 25.1843, lng: 92.0232 },
    elevationM: 85,
    description: 'Crystal-clear emerald waters on the India-Bangladesh border where boats appear floating in air.',
    rating: 4.8,
    safetyScore: 91,
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'mawlynnong',
    name: 'Mawlynnong Eco-Village',
    category: 'VILLAGE',
    coordinates: { lat: 25.2014, lng: 91.9056 },
    elevationM: 490,
    description: "Awarded Asia's Cleanest Village with living root bridges and 100% solar literacy.",
    rating: 4.7,
    safetyScore: 96,
    thumbnail: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'mawsmai_cave',
    name: 'Mawsmai Limestone Cave',
    category: 'CAVE',
    coordinates: { lat: 25.2435, lng: 91.7169 },
    elevationM: 1190,
    description: 'Illuminated natural limestone labyrinth with stalactites and subterranean fossils.',
    rating: 4.6,
    safetyScore: 84,
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'elephant_falls',
    name: 'Elephant Falls Shillong',
    category: 'WATERFALL',
    coordinates: { lat: 25.5358, lng: 91.8236 },
    elevationM: 1475,
    description: 'Three-tiered cascading mountain waterfall nestled in fern-covered pine woods.',
    rating: 4.7,
    safetyScore: 94,
    thumbnail: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'police_bazar',
    name: 'Shillong Central Hub & Police Bazar',
    category: 'VIEWPOINT',
    coordinates: { lat: 25.5788, lng: 91.8933 },
    elevationM: 1525,
    description: 'Capital urban centre with 24/7 tourist police command post and emergency coordination.',
    rating: 4.7,
    safetyScore: 98,
    thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=400&auto=format&fit=crop&q=80'
  }
];

export const InteractiveSafetyMap: React.FC<MapProps> = ({ 
  heightClass = 'h-[460px] sm:h-[540px] lg:h-[620px]',
  onSelectIncident
}) => {
  const { 
    tourist, 
    geoZones, 
    emergencyResources, 
    guides, 
    incidents, 
    trip, 
    updateTouristLocation,
    handleGuideAcceptIncident,
    addToast
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const zonesLayerRef = useRef<L.LayerGroup | null>(null);
  const routesLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeLayer, setActiveLayer] = useState<MapLayerType>('SATELLITE');
  const [showZones, setShowZones] = useState<boolean>(true);
  const [showResources, setShowResources] = useState<boolean>(true);
  const [showGuides, setShowGuides] = useState<boolean>(true);
  const [showLandmarks, setShowLandmarks] = useState<boolean>(true);
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedEntity, setSelectedEntity] = useState<{
    type: 'TOURIST' | 'GUIDE' | 'RESOURCE' | 'ZONE' | 'INCIDENT' | 'LANDMARK';
    data: any;
  } | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const initialMap = L.map(mapContainerRef.current, {
      center: [tourist.currentLocation.lat, tourist.currentLocation.lng],
      zoom: 11,
      minZoom: 8,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: false
    });

    // Create Layer Groups
    const zonesGroup = L.layerGroup().addTo(initialMap);
    const routesGroup = L.layerGroup().addTo(initialMap);
    const markersGroup = L.layerGroup().addTo(initialMap);

    zonesLayerRef.current = zonesGroup;
    routesLayerRef.current = routesGroup;
    markersLayerRef.current = markersGroup;

    mapInstanceRef.current = initialMap;

    // Handle initial tile
    updateTileLayer('SATELLITE', initialMap);

    return () => {
      initialMap.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer based on activeLayer
  const updateTileLayer = (layerType: MapLayerType, map?: L.Map) => {
    const targetMap = map || mapInstanceRef.current;
    if (!targetMap) return;

    if (tileLayerRef.current) {
      targetMap.removeLayer(tileLayerRef.current);
    }

    let url = '';
    let attribution = '';
    let maxZoom = 19;

    switch (layerType) {
      case 'SATELLITE':
        // High Resolution ArcGIS / Esri World Imagery with hybrid terrain clarity
        url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        attribution = 'Esri, Maxar, Earthstar Geographics';
        break;
      case 'DARK':
        // CartoDB Dark Matter for Cyber Tactical VFX
        url = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
        attribution = '© OpenStreetMap, © CARTO';
        break;
      case 'TERRAIN':
        // OpenTopoMap for mountain elevation topography
        url = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
        attribution = '© OpenTopoMap, © OpenStreetMap';
        maxZoom = 17;
        break;
      case 'STREETS':
      default:
        // CartoDB Voyager High-Contrast Navigation
        url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
        attribution = '© OpenStreetMap, © CARTO';
        break;
    }

    const newLayer = L.tileLayer(url, {
      maxZoom,
      subdomains: 'abcd',
      attribution
    });

    newLayer.addTo(targetMap);
    tileLayerRef.current = newLayer;
  };

  const handleSwitchLayer = (type: MapLayerType) => {
    soundEffects.playSafeChime();
    setActiveLayer(type);
    updateTileLayer(type);
  };

  // Re-render GeoZones
  useEffect(() => {
    if (!mapInstanceRef.current || !zonesLayerRef.current) return;
    zonesLayerRef.current.clearLayers();

    if (!showZones) return;

    geoZones.forEach(zone => {
      const latLngs: [number, number][] = zone.polygon.map(p => [p.lat, p.lng]);
      
      const fillColor = 
        zone.safetyTier === 'CRITICAL' ? '#FF4D4D' :
        zone.safetyTier === 'HIGH' ? '#F59E0B' :
        zone.safetyTier === 'MODERATE' ? '#F5C84C' :
        '#4ADE80';

      const polygon = L.polygon(latLngs, {
        color: zone.color || fillColor,
        weight: 2,
        dashArray: zone.safetyTier === 'CRITICAL' ? '5, 5' : undefined,
        fillColor: fillColor,
        fillOpacity: zone.safetyTier === 'CRITICAL' ? 0.22 : 0.15,
        className: 'transition-all duration-300 cursor-pointer'
      });

      polygon.on('click', () => {
        soundEffects.playSafeChime();
        setSelectedEntity({ type: 'ZONE', data: zone });
      });

      // Add Glowing Zone Label Marker
      const labelIcon = L.divIcon({
        className: 'custom-zone-label',
        html: `
          <div class="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider shadow-lg border backdrop-blur-md whitespace-nowrap flex items-center gap-1.5"
               style="background: rgba(10, 16, 12, 0.85); color: ${fillColor}; border-color: ${fillColor}40;">
            <span class="w-2 h-2 rounded-full animate-pulse" style="background: ${fillColor};"></span>
            ${zone.name.split(' ')[0]} [${zone.safetyTier}]
          </div>
        `,
        iconSize: [120, 24],
        iconAnchor: [60, 12]
      });

      const labelMarker = L.marker([zone.center.lat, zone.center.lng], { icon: labelIcon });
      labelMarker.on('click', () => setSelectedEntity({ type: 'ZONE', data: zone }));

      zonesLayerRef.current?.addLayer(polygon);
      zonesLayerRef.current?.addLayer(labelMarker);
    });
  }, [geoZones, showZones]);

  // Re-render Routes
  useEffect(() => {
    if (!mapInstanceRef.current || !routesLayerRef.current) return;
    routesLayerRef.current.clearLayers();

    if (!showRoutes) return;

    // 1. Primary Trek Route Path
    if (trip.selectedRoute?.pathCoordinates?.length) {
      const coords: [number, number][] = trip.selectedRoute.pathCoordinates.map(c => [c.lat, c.lng]);
      
      // Outer Glow Polyline
      const glowLine = L.polyline(coords, {
        color: '#55C878',
        weight: 8,
        opacity: 0.35,
        lineCap: 'round'
      });

      // Inner Core Polyline
      const coreLine = L.polyline(coords, {
        color: '#4ADE80',
        weight: 3.5,
        dashArray: '8, 8',
        opacity: 0.95,
        lineCap: 'round'
      });

      routesLayerRef.current.addLayer(glowLine);
      routesLayerRef.current.addLayer(coreLine);
    }
  }, [trip, showRoutes]);

  // Re-render Markers (Tourist, Incidents, Guides, Resources, Landmarks)
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    // 1. Tourist Live GPS Pin with Sonar Radar Wave VFX
    const touristIcon = L.divIcon({
      className: 'custom-tourist-pin',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-14 h-14 rounded-full bg-[var(--accent-primary)]/25 animate-ping"></div>
          <div class="absolute w-10 h-10 rounded-full bg-[var(--accent-primary)]/35 animate-pulse"></div>
          <div class="relative w-8 h-8 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--color-safe)] shadow-2xl flex items-center justify-center text-white overflow-hidden ring-2 ring-[var(--color-safe)]/50">
            <img src="${tourist.avatarUrl}" class="w-full h-full object-cover" />
          </div>
          <div class="absolute -bottom-5 px-2 py-0.5 rounded-full bg-[var(--bg-primary)]/90 border border-[var(--accent-primary)]/60 text-[9px] font-extrabold text-[var(--color-safe)] font-mono shadow-xl whitespace-nowrap">
            YOU (LIVE GPS)
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const touristMarker = L.marker([tourist.currentLocation.lat, tourist.currentLocation.lng], {
      icon: touristIcon,
      zIndexOffset: 1000
    });

    touristMarker.on('click', () => {
      soundEffects.playSafeChime();
      setSelectedEntity({ type: 'TOURIST', data: tourist });
    });
    markersLayerRef.current.addLayer(touristMarker);

    // 2. Active Incidents with Red Flash Alert Sonar
    incidents.forEach(inc => {
      const incColor = inc.severity === 'CRITICAL' ? '#FF4D4D' : '#F59E0B';
      const incidentIcon = L.divIcon({
        className: 'custom-incident-pin',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer">
            <div class="absolute w-16 h-16 rounded-full bg-[var(--color-critical)]/30 animate-ping"></div>
            <div class="relative w-9 h-9 rounded-2xl bg-[#1A0A0A] border-2 border-[var(--color-critical)] shadow-2xl flex items-center justify-center text-[var(--color-critical)] ring-2 ring-[var(--color-critical)]/50">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.5L20.3 19H3.7L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
            </div>
            <div class="absolute -top-6 px-2 py-0.5 rounded-md bg-[var(--color-critical)] text-[var(--bg-primary)] text-[9px] font-extrabold font-mono uppercase tracking-wider shadow-lg whitespace-nowrap">
              ${inc.severity} ALERT
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const incMarker = L.marker([inc.coordinates.lat, inc.coordinates.lng], {
        icon: incidentIcon,
        zIndexOffset: 900
      });

      incMarker.on('click', () => {
        soundEffects.playCautionChime();
        setSelectedEntity({ type: 'INCIDENT', data: inc });
        if (onSelectIncident) onSelectIncident(inc);
      });

      markersLayerRef.current?.addLayer(incMarker);
    });

    // 3. Verified Eco-Guides
    if (showGuides) {
      guides.forEach(guide => {
        const guideIcon = L.divIcon({
          className: 'custom-guide-pin',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer group">
              <div class="w-8 h-8 rounded-full bg-[var(--bg-primary)] border-2 border-[#60A5FA] shadow-xl flex items-center justify-center overflow-hidden">
                <img src="${guide.avatarUrl}" class="w-full h-full object-cover" />
              </div>
              <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#60A5FA] border border-[var(--bg-primary)] flex items-center justify-center text-[7px] font-bold text-[var(--bg-primary)]">
                ✓
              </div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const guideMarker = L.marker([guide.currentLocation.lat, guide.currentLocation.lng], {
          icon: guideIcon,
          zIndexOffset: 700
        });

        guideMarker.on('click', () => {
          soundEffects.playSafeChime();
          setSelectedEntity({ type: 'GUIDE', data: guide });
        });

        markersLayerRef.current?.addLayer(guideMarker);
      });
    }

    // 4. Emergency Resources (Police, Hospital, SDRF)
    if (showResources) {
      emergencyResources.forEach(res => {
        const isPolice = res.type === 'POLICE';
        const isHospital = res.type === 'HOSPITAL';
        const badgeColor = isPolice ? '#60A5FA' : isHospital ? '#FF4D4D' : '#F5C84C';
        const badgeIcon = isPolice ? '👮' : isHospital ? '🏥' : '🛡️';

        const resIcon = L.divIcon({
          className: 'custom-resource-pin',
          html: `
            <div class="p-1.5 rounded-xl bg-[var(--bg-primary)]/90 border border-[${badgeColor}]/60 shadow-xl flex items-center gap-1.5 cursor-pointer backdrop-blur-md hover:scale-110 transition-transform">
              <span class="text-xs">${badgeIcon}</span>
              <span class="text-[9px] font-bold font-mono text-[var(--text-primary)] whitespace-nowrap pr-1">${res.name.split(' ')[0]}</span>
            </div>
          `,
          iconSize: [90, 26],
          iconAnchor: [45, 13]
        });

        const resMarker = L.marker([res.coordinates.lat, res.coordinates.lng], {
          icon: resIcon,
          zIndexOffset: 600
        });

        resMarker.on('click', () => {
          soundEffects.playSafeChime();
          setSelectedEntity({ type: 'RESOURCE', data: res });
        });

        markersLayerRef.current?.addLayer(resMarker);
      });
    }

    // 5. Meghalaya Famous Landmarks
    if (showLandmarks) {
      MEGHALAYA_LANDMARKS.forEach(place => {
        const placeIcon = L.divIcon({
          className: 'custom-landmark-pin',
          html: `
            <div class="relative flex flex-col items-center cursor-pointer group">
              <div class="px-2 py-1 rounded-xl bg-[#0B130E]/90 border border-white/15 shadow-xl flex items-center gap-1.5 backdrop-blur-md group-hover:border-[var(--accent-primary)] group-hover:bg-[#121F16] transition-all">
                <span class="text-xs">
                  ${place.category === 'WATERFALL' ? '💧' : place.category === 'HERITAGE' ? '🌿' : place.category === 'CAVE' ? '⛰️' : place.category === 'CANYON' ? '🦅' : place.category === 'LAKE' ? '🛶' : '📍'}
                </span>
                <span class="text-[10px] font-bold text-[var(--text-primary)] whitespace-nowrap">${place.name.split(' ')[0]}</span>
              </div>
              <div class="w-1.5 h-1.5 rotate-45 bg-[#0B130E] border-r border-b border-white/20 -mt-1"></div>
            </div>
          `,
          iconSize: [110, 30],
          iconAnchor: [55, 28]
        });

        const placeMarker = L.marker([place.coordinates.lat, place.coordinates.lng], {
          icon: placeIcon,
          zIndexOffset: 500
        });

        placeMarker.on('click', () => {
          soundEffects.playSafeChime();
          setSelectedEntity({ type: 'LANDMARK', data: place });
        });

        markersLayerRef.current?.addLayer(placeMarker);
      });
    }
  }, [tourist, incidents, guides, emergencyResources, showGuides, showResources, showLandmarks]);

  // Fly to Location helper
  const handleFlyTo = (coords: Coordinates, zoom = 14) => {
    soundEffects.playSafeChime();
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([coords.lat, coords.lng], zoom, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  };

  const handleZoomIn = () => {
    soundEffects.playSafeChime();
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    soundEffects.playSafeChime();
    mapInstanceRef.current?.zoomOut();
  };

  const handleRecenterTourist = () => {
    soundEffects.playSafeChime();
    handleFlyTo(tourist.currentLocation, 14);
    setSelectedEntity({ type: 'TOURIST', data: tourist });
  };

  // Search places
  const filteredLandmarks = MEGHALAYA_LANDMARKS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl transition-all duration-300 ${
      isFullscreen ? 'fixed inset-0 z-50 h-screen rounded-none' : heightClass
    }`}>
      {/* 1. Map Canvas Div */}
      <div ref={mapContainerRef} className="w-full h-full z-0 bg-[var(--bg-primary)]" />

      {/* 2. Top Search & Quick Jump Overlay Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pointer-events-none">
        {/* Search Input Box */}
        <div className="relative pointer-events-auto w-full sm:max-w-md">
          <div className="flex items-center gap-2 p-1.5 pl-3 rounded-2xl glass-panel shadow-2xl border border-white/15">
            <Search className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search Meghalaya places, waterfalls, police..."
              className="w-full bg-transparent text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-[var(--text-muted)] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 mt-1.5 p-2 rounded-2xl glass-panel-elevated shadow-2xl border border-white/15 max-h-56 overflow-y-auto space-y-1 z-30">
              {filteredLandmarks.length === 0 ? (
                <p className="text-[11px] text-[var(--text-muted)] p-2 text-center">No locations found</p>
              ) : (
                filteredLandmarks.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      handleFlyTo(p.coordinates, 15);
                      setSelectedEntity({ type: 'LANDMARK', data: p });
                      setSearchQuery('');
                    }}
                    className="w-full p-2 rounded-xl bg-white/[0.03] hover:bg-[var(--accent-primary)]/20 flex items-center justify-between text-left transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-[var(--text-primary)]">{p.name}</p>
                      <p className="text-[10px] text-[var(--text-secondary)] truncate">{p.description}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--accent-primary)] shrink-0 ml-2">Fly To ➔</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Quick Fly-To Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 pointer-events-auto scrollbar-none">
          <button
            onClick={() => handleFlyTo({ lat: 25.5788, lng: 91.8933 }, 13)}
            className="px-3 py-1.5 rounded-full glass-panel hover:bg-white/15 text-[11px] font-bold text-[var(--text-primary)] border border-white/10 whitespace-nowrap shadow-md"
          >
            🏙️ Shillong
          </button>
          <button
            onClick={() => handleFlyTo({ lat: 25.2702, lng: 91.7323 }, 13)}
            className="px-3 py-1.5 rounded-full glass-panel hover:bg-white/15 text-[11px] font-bold text-[var(--text-primary)] border border-white/10 whitespace-nowrap shadow-md"
          >
            💧 Cherrapunji
          </button>
          <button
            onClick={() => handleFlyTo({ lat: 25.2496, lng: 91.6705 }, 14)}
            className="px-3 py-1.5 rounded-full glass-panel hover:bg-white/15 text-[11px] font-bold text-[var(--text-primary)] border border-white/10 whitespace-nowrap shadow-md"
          >
            🌿 Root Bridges
          </button>
          <button
            onClick={() => handleFlyTo({ lat: 25.1843, lng: 92.0232 }, 13)}
            className="px-3 py-1.5 rounded-full glass-panel hover:bg-white/15 text-[11px] font-bold text-[var(--text-primary)] border border-white/10 whitespace-nowrap shadow-md"
          >
            🛶 Dawki River
          </button>
        </div>
      </div>

      {/* 3. Top-Right VFX Layer Switcher */}
      <div className="absolute top-18 sm:top-4 right-4 z-10 flex flex-col gap-2">
        <div className="p-1.5 rounded-2xl glass-panel shadow-2xl border border-white/15 flex flex-col gap-1">
          <button
            onClick={() => handleSwitchLayer('SATELLITE')}
            title="Google Satellite Hybrid"
            className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1.5 transition-all ${
              activeLayer === 'SATELLITE' ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] shadow-md' : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <SunMedium className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Satellite</span>
          </button>

          <button
            onClick={() => handleSwitchLayer('DARK')}
            title="Cyber Tactical Dark"
            className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1.5 transition-all ${
              activeLayer === 'DARK' ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] shadow-md' : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cyber Dark</span>
          </button>

          <button
            onClick={() => handleSwitchLayer('TERRAIN')}
            title="Topographical Terrain"
            className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1.5 transition-all ${
              activeLayer === 'TERRAIN' ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] shadow-md' : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <Mountain className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Terrain</span>
          </button>

          <button
            onClick={() => handleSwitchLayer('STREETS')}
            title="High-Res Roads"
            className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1.5 transition-all ${
              activeLayer === 'STREETS' ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] shadow-md' : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Streets</span>
          </button>
        </div>
      </div>

      {/* 4. Left Filter Toggles */}
      <div className="absolute top-18 sm:top-20 left-4 z-10 hidden sm:flex flex-col gap-1.5 p-2 rounded-2xl glass-panel shadow-2xl border border-white/15 text-[11px] text-[var(--text-primary)]">
        <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--accent-primary)] px-1 pb-0.5">
          Map Overlays
        </span>
        
        <label className="flex items-center gap-2 cursor-pointer px-1 py-0.5 hover:text-[var(--accent-primary)]">
          <input
            type="checkbox"
            checked={showZones}
            onChange={e => setShowZones(e.target.checked)}
            className="accent-[var(--accent-primary)] rounded cursor-pointer"
          />
          <span>Geo-Fence Hazard Zones</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer px-1 py-0.5 hover:text-[var(--accent-primary)]">
          <input
            type="checkbox"
            checked={showLandmarks}
            onChange={e => setShowLandmarks(e.target.checked)}
            className="accent-[var(--accent-primary)] rounded cursor-pointer"
          />
          <span>Meghalaya Landmarks</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer px-1 py-0.5 hover:text-[var(--accent-primary)]">
          <input
            type="checkbox"
            checked={showResources}
            onChange={e => setShowResources(e.target.checked)}
            className="accent-[var(--accent-primary)] rounded cursor-pointer"
          />
          <span>Police & Trauma Hubs</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer px-1 py-0.5 hover:text-[var(--accent-primary)]">
          <input
            type="checkbox"
            checked={showGuides}
            onChange={e => setShowGuides(e.target.checked)}
            className="accent-[var(--accent-primary)] rounded cursor-pointer"
          />
          <span>Eco-Guides on Patrol</span>
        </label>
      </div>

      {/* 5. Bottom Floating Navigation Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <div className="p-1.5 rounded-2xl glass-panel shadow-2xl border border-white/15 flex flex-col gap-1">
          <button
            onClick={handleRecenterTourist}
            title="Lock on Live GPS"
            className="p-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--color-safe)] text-[var(--bg-primary)] shadow-lg transition-all"
          >
            <Crosshair className="w-4 h-4" />
          </button>

          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-[var(--text-primary)] transition-all"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-[var(--text-primary)] transition-all"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title="Toggle Fullscreen"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-[var(--text-primary)] transition-all"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6. Active Geo-Zone Risk Badge at Bottom-Left */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-auto">
        <div className="p-3 rounded-2xl glass-panel-elevated shadow-2xl border border-white/15 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 text-[var(--color-safe)]">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[var(--accent-primary)] uppercase tracking-wider font-mono">
                GPS TELEMETRY ACTIVE
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">•</span>
              <span className="text-[10px] text-[var(--text-secondary)]">4G/5G Online</span>
            </div>
            <p className="text-xs font-bold text-[var(--text-primary)]">
              {tourist.currentLocationName} ({tourist.currentLocation.lat.toFixed(4)}°N, {tourist.currentLocation.lng.toFixed(4)}°E)
            </p>
          </div>
        </div>
      </div>

      {/* 7. Interactive Entity Inspector Drawer */}
      {selectedEntity && (
        <div className="absolute bottom-16 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 w-[92%] sm:w-[480px] p-4 rounded-3xl glass-panel-elevated shadow-2xl border border-white/20 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-start justify-between gap-3">
            {/* Entity Content based on Type */}
            {selectedEntity.type === 'LANDMARK' && (
              <div className="space-y-3 w-full">
                <div className="flex items-start gap-3">
                  <img
                    src={selectedEntity.data.thumbnail}
                    alt={selectedEntity.data.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-white/15 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/15 text-[var(--color-safe)] font-mono font-bold">
                        {selectedEntity.data.category}
                      </span>
                      <span className="text-[10px] text-[var(--color-moderate)] font-bold">★ {selectedEntity.data.rating}</span>
                    </div>
                    <h3 className="text-sm font-extrabold text-[var(--text-primary)] mt-0.5 truncate">{selectedEntity.data.name}</h3>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-tight mt-0.5">{selectedEntity.data.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Elevation: <strong className="text-[var(--text-primary)]">{selectedEntity.data.elevationM}m</strong> • Safety: <strong className="text-[var(--color-safe)]">{selectedEntity.data.safetyScore}/100</strong>
                  </span>
                  <button
                    onClick={() => handleFlyTo(selectedEntity.data.coordinates, 15)}
                    className="px-3 py-1.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--color-safe)] text-[var(--bg-primary)] text-xs font-bold transition-all"
                  >
                    Focus Landmark
                  </button>
                </div>
              </div>
            )}

            {selectedEntity.type === 'ZONE' && (
              <div className="space-y-2.5 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-[var(--color-safe)] font-mono">
                    GEO-FENCE ZONE • {selectedEntity.data.safetyTier}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">Radius: {selectedEntity.data.radiusKm}km</span>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">{selectedEntity.data.name}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{selectedEntity.data.advisory}</p>
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-[var(--text-muted)]">
                  {selectedEntity.data.description}
                </div>
              </div>
            )}

            {selectedEntity.type === 'INCIDENT' && (
              <div className="space-y-3 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[var(--color-critical)] text-white uppercase tracking-wider font-mono">
                    INCIDENT ACTIVE #{selectedEntity.data.id}
                  </span>
                  <span className="text-xs font-bold text-[var(--color-critical)]">{selectedEntity.data.severity}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">{selectedEntity.data.type.replace(/_/g, ' ')}</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{selectedEntity.data.aiExplanation}</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href="tel:112"
                    className="flex-1 py-2 rounded-xl bg-[var(--color-critical)] text-white text-xs font-bold text-center"
                  >
                    Call Police (112)
                  </a>
                  <button
                    onClick={() => {
                      handleGuideAcceptIncident(selectedEntity.data.id, 'g_rahul');
                      addToast({
                        title: 'Guide Dispatched',
                        description: 'Rahul Sharma assigned to assist immediately.',
                        type: 'SAFE'
                      });
                    }}
                    className="flex-1 py-2 rounded-xl bg-[var(--accent-primary)] text-[var(--bg-primary)] text-xs font-bold text-center"
                  >
                    Dispatch Guide
                  </button>
                </div>
              </div>
            )}

            {selectedEntity.type === 'RESOURCE' && (
              <div className="space-y-2.5 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#60A5FA]/20 text-[#60A5FA] font-mono">
                    {selectedEntity.data.type}
                  </span>
                  <span className="text-xs text-[var(--color-safe)] font-bold">{selectedEntity.data.etaMinutes} min ETA</span>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">{selectedEntity.data.name}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{selectedEntity.data.locationName}</p>
                <div className="flex items-center justify-between pt-1">
                  <a
                    href={`tel:${selectedEntity.data.contactNumber}`}
                    className="px-3 py-1.5 rounded-xl bg-[#60A5FA] text-[var(--bg-primary)] text-xs font-bold flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedEntity.data.contactNumber}</span>
                  </a>
                </div>
              </div>
            )}

            {selectedEntity.type === 'TOURIST' && (
              <div className="space-y-2.5 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/15 text-[var(--color-safe)] font-mono">
                    YOUR LIVE PROFILE
                  </span>
                  <span className="text-xs font-bold text-[var(--color-safe)]">Safety Score: {selectedEntity.data.safetyScore}/100</span>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">{selectedEntity.data.fullName}</h3>
                <p className="text-xs text-[var(--text-secondary)]">Current Location: {selectedEntity.data.currentLocationName}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[var(--text-muted)]">Digital ID:</span>
                  <span className="font-mono font-bold text-[var(--text-primary)]">{selectedEntity.data.digitalId}</span>
                </div>
              </div>
            )}

            {selectedEntity.type === 'GUIDE' && (
              <div className="space-y-2.5 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#60A5FA]/20 text-[#60A5FA] font-mono">
                    VERIFIED GUIDE • {selectedEntity.data.badgeNumber}
                  </span>
                  <span className="text-xs font-bold text-[var(--color-moderate)]">★ {selectedEntity.data.rating}</span>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">{selectedEntity.data.fullName}</h3>
                <p className="text-xs text-[var(--text-secondary)]">🎯 {selectedEntity.data.specialization}</p>
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={`tel:${selectedEntity.data.phone}`}
                    className="flex-1 py-1.5 rounded-xl bg-[var(--accent-primary)] text-[var(--bg-primary)] text-xs font-bold text-center flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Guide</span>
                  </a>
                </div>
              </div>
            )}

            {/* Close Inspector Button */}
            <button
              onClick={() => setSelectedEntity(null)}
              className="p-1 rounded-full text-[var(--text-muted)] hover:text-white shrink-0 -mt-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
