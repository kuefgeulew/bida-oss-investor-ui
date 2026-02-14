import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map, MapPin, Zap, Droplet, Wifi, Factory, 
  DollarSign, TrendingUp, CheckCircle2, AlertCircle,
  Search, Filter, Maximize2, Navigation, Download,
  Globe, Route, Building2, TreePine, Shield, Award,
  ChevronDown, ChevronUp, ExternalLink, Phone, Mail,
  X, Star, Layers, Info, SortAsc, SortDesc, Box,
  MapPinned, Satellite, Mountain, Waves, Wind, Zap as Lightning,
  Camera, Eye, Scan, ArrowUpDown, Grid3x3, Cuboid
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { glassCard } from '@/app/config/designSystem';
import { useLanguage } from '@/app/components/LanguageContext';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// 🗺️ GIS LAND PARCEL DATA STRUCTURE
interface LandParcel {
  id: string;
  parcelCode: string;
  zone: string;
  district: string;
  coordinates: { lat: number; lng: number };
  areaAcres: number;
  areaHectares: number;
  status: 'available' | 'reserved' | 'allocated' | 'under-development';
  pricePerAcreUSD: number;
  totalPriceUSD: number;
  
  utilities: {
    electricity: { available: boolean; capacity: string; reliability: number };
    water: { available: boolean; capacity: string; quality: string };
    gas: { available: boolean; capacity: string };
    internet: { available: boolean; speed: string; provider: string };
    sewage: { available: boolean; treatment: string };
  };
  
  accessibility: {
    portDistanceKm: number;
    airportDistanceKm: number;
    highwayDistanceKm: number;
    railwayDistanceKm: number;
  };
  
  legal: {
    clearTitle: boolean;
    environmentalClearance: boolean;
    noObjectionCertificate: boolean;
    surveyCompleted: boolean;
  };
  
  suitableFor: string[];
  soilType: string;
  floodRisk: 'low' | 'medium' | 'high';
  seismicZone: number;
  
  authority: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  
  highlights: string[];
  restrictions: string[];
  leaseTermYears?: number;
  availableFrom: string;
  
  // NEW: Enhanced data
  streetViewUrl?: string;
  satelliteImageUrl?: string;
  elevation: number; // meters above sea level
  terrainType: string;
}

// 🏭 ENHANCED MOCK GIS LAND BANK DATABASE
const LAND_PARCELS: LandParcel[] = [
  {
    id: 'land-001',
    parcelCode: 'BEPZA-DHK-2024-001',
    zone: 'Dhaka Export Processing Zone',
    district: 'Dhaka',
    coordinates: { lat: 23.8103, lng: 90.4125 },
    areaAcres: 15.5,
    areaHectares: 6.27,
    status: 'available',
    pricePerAcreUSD: 125000,
    totalPriceUSD: 1937500,
    
    utilities: {
      electricity: { available: true, capacity: '2.5 MW', reliability: 99.8 },
      water: { available: true, capacity: '500 m³/day', quality: 'Potable' },
      gas: { available: true, capacity: '50,000 m³/day' },
      internet: { available: true, speed: '1 Gbps Fiber', provider: 'BTCL' },
      sewage: { available: true, treatment: 'ETP Connected' }
    },
    
    accessibility: {
      portDistanceKm: 28,
      airportDistanceKm: 12,
      highwayDistanceKm: 3,
      railwayDistanceKm: 8
    },
    
    legal: {
      clearTitle: true,
      environmentalClearance: true,
      noObjectionCertificate: true,
      surveyCompleted: true
    },
    
    suitableFor: ['Manufacturing', 'Pharmaceuticals', 'Electronics', 'Textiles'],
    soilType: 'Clay loam',
    floodRisk: 'low',
    seismicZone: 2,
    
    authority: 'BEPZA',
    contactPerson: 'Md. Rahman Ahmed',
    contactEmail: 'rahman.ahmed@bepza.gov.bd',
    contactPhone: '+880-2-8891599',
    
    highlights: ['Prime location', 'All utilities ready', 'Easy port access', '99.8% power reliability'],
    restrictions: ['No heavy chemical industries', 'Export-oriented only'],
    leaseTermYears: 50,
    availableFrom: '2024-03-15',
    
    streetViewUrl: 'https://maps.google.com',
    elevation: 8,
    terrainType: 'Flat'
  },
  {
    id: 'land-002',
    parcelCode: 'BEZA-CTG-2024-002',
    zone: 'Chattogram Economic Zone',
    district: 'Chattogram',
    coordinates: { lat: 22.3569, lng: 91.7832 },
    areaAcres: 50.0,
    areaHectares: 20.23,
    status: 'available',
    pricePerAcreUSD: 95000,
    totalPriceUSD: 4750000,
    
    utilities: {
      electricity: { available: true, capacity: '8 MW', reliability: 99.5 },
      water: { available: true, capacity: '2000 m³/day', quality: 'Industrial Grade' },
      gas: { available: true, capacity: '150,000 m³/day' },
      internet: { available: true, speed: '10 Gbps Fiber', provider: 'Summit' },
      sewage: { available: true, treatment: 'Centralized ETP' }
    },
    
    accessibility: {
      portDistanceKm: 8,
      airportDistanceKm: 25,
      highwayDistanceKm: 2,
      railwayDistanceKm: 5
    },
    
    legal: {
      clearTitle: true,
      environmentalClearance: true,
      noObjectionCertificate: true,
      surveyCompleted: true
    },
    
    suitableFor: ['Heavy Manufacturing', 'Steel', 'Cement', 'Automobiles', 'Shipbuilding'],
    soilType: 'Sandy loam',
    floodRisk: 'low',
    seismicZone: 3,
    
    authority: 'BEZA',
    contactPerson: 'Fatima Akter',
    contactEmail: 'fatima.akter@beza.gov.bd',
    contactPhone: '+880-31-2853100',
    
    highlights: ['Largest available plot', 'Direct port access', 'Heavy industry approved', '10 Gbps internet'],
    restrictions: ['Minimum $10M investment', 'Job creation requirement: 500+'],
    leaseTermYears: 50,
    availableFrom: '2024-04-01',
    
    streetViewUrl: 'https://maps.google.com',
    elevation: 6,
    terrainType: 'Flat with slight slope'
  },
  {
    id: 'land-003',
    parcelCode: 'BHTPA-DHK-2024-003',
    zone: 'Bangabandhu Hi-Tech City',
    district: 'Dhaka',
    coordinates: { lat: 24.0031, lng: 90.4152 },
    areaAcres: 5.0,
    areaHectares: 2.02,
    status: 'available',
    pricePerAcreUSD: 200000,
    totalPriceUSD: 1000000,
    
    utilities: {
      electricity: { available: true, capacity: '1 MW', reliability: 99.9 },
      water: { available: true, capacity: '100 m³/day', quality: 'Potable' },
      gas: { available: false, capacity: 'N/A' },
      internet: { available: true, speed: '100 Gbps Fiber', provider: 'BTCL+Summit' },
      sewage: { available: true, treatment: 'Smart ETP' }
    },
    
    accessibility: {
      portDistanceKm: 35,
      airportDistanceKm: 8,
      highwayDistanceKm: 1,
      railwayDistanceKm: 12
    },
    
    legal: {
      clearTitle: true,
      environmentalClearance: true,
      noObjectionCertificate: true,
      surveyCompleted: true
    },
    
    suitableFor: ['Software', 'IT Services', 'Data Centers', 'R&D', 'AI/ML'],
    soilType: 'Stable bedrock',
    floodRisk: 'low',
    seismicZone: 2,
    
    authority: 'BHTPA',
    contactPerson: 'Dr. Kamal Hossain',
    contactEmail: 'kamal.hossain@bhtpa.gov.bd',
    contactPhone: '+880-2-9898989',
    
    highlights: ['100 Gbps connectivity', 'Tech-focused ecosystem', 'Government support', 'Near airport'],
    restrictions: ['Technology sector only', 'No manufacturing'],
    leaseTermYears: 30,
    availableFrom: '2024-05-01',
    
    streetViewUrl: 'https://maps.google.com',
    elevation: 12,
    terrainType: 'Elevated plateau'
  },
  {
    id: 'land-004',
    parcelCode: 'BEPZA-CTG-2024-004',
    zone: 'Chittagong Export Processing Zone',
    district: 'Chattogram',
    coordinates: { lat: 22.2637, lng: 91.7159 },
    areaAcres: 25.0,
    areaHectares: 10.12,
    status: 'reserved',
    pricePerAcreUSD: 110000,
    totalPriceUSD: 2750000,
    
    utilities: {
      electricity: { available: true, capacity: '4 MW', reliability: 99.7 },
      water: { available: true, capacity: '800 m³/day', quality: 'Industrial' },
      gas: { available: true, capacity: '80,000 m³/day' },
      internet: { available: true, speed: '5 Gbps Fiber', provider: 'Grameenphone' },
      sewage: { available: true, treatment: 'Zone ETP' }
    },
    
    accessibility: {
      portDistanceKm: 5,
      airportDistanceKm: 20,
      highwayDistanceKm: 1,
      railwayDistanceKm: 3
    },
    
    legal: {
      clearTitle: true,
      environmentalClearance: true,
      noObjectionCertificate: true,
      surveyCompleted: true
    },
    
    suitableFor: ['Textiles', 'Garments', 'Footwear', 'Packaging'],
    soilType: 'Clay',
    floodRisk: 'medium',
    seismicZone: 3,
    
    authority: 'BEPZA',
    contactPerson: 'Nasrin Sultana',
    contactEmail: 'nasrin.sultana@bepza.gov.bd',
    contactPhone: '+880-31-2520320',
    
    highlights: ['RMG cluster', 'Port proximity', 'Skilled labor available'],
    restrictions: ['Reserved until June 2024', 'Export-oriented only'],
    leaseTermYears: 50,
    availableFrom: '2024-06-15',
    
    streetViewUrl: 'https://maps.google.com',
    elevation: 4,
    terrainType: 'Coastal flat'
  },
  {
    id: 'land-005',
    parcelCode: 'BEZA-SYL-2024-005',
    zone: 'Sylhet Economic Zone',
    district: 'Sylhet',
    coordinates: { lat: 24.8949, lng: 91.8687 },
    areaAcres: 35.0,
    areaHectares: 14.16,
    status: 'available',
    pricePerAcreUSD: 70000,
    totalPriceUSD: 2450000,
    
    utilities: {
      electricity: { available: true, capacity: '5 MW', reliability: 98.5 },
      water: { available: true, capacity: '1500 m³/day', quality: 'Natural spring' },
      gas: { available: true, capacity: '100,000 m³/day' },
      internet: { available: true, speed: '1 Gbps Fiber', provider: 'BTCL' },
      sewage: { available: true, treatment: 'Bio-treatment' }
    },
    
    accessibility: {
      portDistanceKm: 280,
      airportDistanceKm: 15,
      highwayDistanceKm: 8,
      railwayDistanceKm: 10
    },
    
    legal: {
      clearTitle: true,
      environmentalClearance: true,
      noObjectionCertificate: true,
      surveyCompleted: true
    },
    
    suitableFor: ['Food Processing', 'Beverages', 'Tea', 'Organic Products', 'Eco-tourism'],
    soilType: 'Rich alluvial',
    floodRisk: 'low',
    seismicZone: 4,
    
    authority: 'BEZA',
    contactPerson: 'Abdul Jabbar',
    contactEmail: 'abdul.jabbar@beza.gov.bd',
    contactPhone: '+880-821-713344',
    
    highlights: ['Natural spring water', 'Eco-friendly zone', 'Tea industry hub', 'Scenic location'],
    restrictions: ['No heavy pollution', 'Green industry preferred'],
    leaseTermYears: 40,
    availableFrom: '2024-03-20',
    
    streetViewUrl: 'https://maps.google.com',
    elevation: 35,
    terrainType: 'Hilly terrain'
  }
];

// 🎨 CUSTOM MAP ICONS
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const statusIcons = {
  available: createCustomIcon('#10b981'),
  reserved: createCustomIcon('#f59e0b'),
  allocated: createCustomIcon('#3b82f6'),
  'under-development': createCustomIcon('#8b5cf6'),
};

// 🏗️ 3D FACTORY BUILDING COMPONENT (CSS-BASED - ENHANCED)
function FactoryBuilding3D() {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-sky-200 via-sky-100 to-green-100">
      {/* Clouds */}
      <div className="absolute top-10 left-20 w-32 h-16 bg-white rounded-full opacity-60 blur-sm animate-pulse" />
      <div className="absolute top-16 right-32 w-40 h-20 bg-white rounded-full opacity-50 blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative" style={{ perspective: '1200px' }}>
        {/* Main building */}
        <div 
          className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-2xl relative transition-transform duration-300 hover:scale-105"
          style={{ 
            width: '220px', 
            height: '140px',
            transform: `rotateY(${-15 + rotation * 0.1}deg) rotateX(10deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Building windows */}
          <div className="absolute inset-3 grid grid-cols-5 gap-2 p-2">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="bg-gradient-to-br from-blue-300 to-blue-500 rounded shadow-inner animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          
          {/* Door */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-16 bg-gray-700 rounded-t-lg">
            <div className="w-1 h-6 bg-yellow-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
          </div>
          
          {/* Company sign */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg">
            YOUR FACTORY
          </div>
          
          {/* Roof */}
          <div 
            className="absolute -top-5 left-0 right-0 h-8 bg-gradient-to-b from-gray-500 to-gray-600 rounded-t-lg border-b-2 border-gray-700"
            style={{ transform: 'translateZ(15px)' }}
          >
            {/* Roof edge */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800" />
          </div>
          
          {/* Chimney */}
          <div 
            className="absolute -top-20 right-12 w-8 h-20 bg-gradient-to-r from-gray-600 to-gray-700 rounded-t shadow-xl"
            style={{ transform: 'translateZ(25px)' }}
          >
            {/* Chimney cap */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-3 bg-gray-800 rounded-full" />
            
            {/* Smoke */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-400 rounded-full opacity-40 blur-md animate-bounce" />
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-300 rounded-full opacity-30 blur-lg animate-pulse" />
          </div>
          
          {/* Side annex building */}
          <div 
            className="absolute -right-16 top-8 w-16 h-20 bg-gray-300 rounded shadow-lg"
            style={{ transform: 'translateZ(-10px)' }}
          >
            <div className="absolute inset-2 grid grid-cols-2 gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-blue-400 rounded" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Ground & Shadow */}
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[500px] h-40 bg-gradient-to-t from-green-600 to-green-400 rounded-full blur-md opacity-80"
          style={{ transform: 'translateY(80px) rotateX(85deg)', transformStyle: 'preserve-3d' }}
        />
        
        {/* Trees */}
        <div className="absolute -left-32 bottom-20">
          <div className="w-8 h-12 bg-green-600 rounded-full" />
          <div className="w-3 h-8 bg-amber-800 mx-auto -mt-8" />
        </div>
        <div className="absolute -right-28 bottom-24">
          <div className="w-10 h-14 bg-green-700 rounded-full" />
          <div className="w-4 h-10 bg-amber-900 mx-auto -mt-10" />
        </div>
        
        {/* Info text */}
        <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
          <p className="text-lg font-bold text-gray-800 mb-1">🏭 3D Factory Visualization</p>
          <p className="text-sm text-gray-600">Preview what your facility would look like on this plot</p>
          <p className="text-xs text-emerald-600 mt-2">✨ Auto-rotating • Professional 3D CSS</p>
        </div>
      </div>
    </div>
  );
}

// 🗺️ MAP CONTROL COMPONENT
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

// 🔍 NATURAL LANGUAGE SEARCH PARSER
function parseNaturalSearch(query: string): {
  area?: number;
  location?: string;
  utilities: string[];
  maxDistance?: { port?: number; airport?: number };
} {
  const result: any = { utilities: [] };
  
  // Parse area: "50 acres" or "20 hectares"
  const areaMatch = query.match(/(\d+\.?\d*)\s*(acres?|hectares?)/i);
  if (areaMatch) {
    const value = parseFloat(areaMatch[1]);
    const unit = areaMatch[2].toLowerCase();
    result.area = unit.startsWith('hectare') ? value * 2.471 : value; // Convert to acres
  }
  
  // Parse location: "Chattogram", "Dhaka", "near port"
  const locationMatch = query.match(/(Dhaka|Chattogram|Chittagong|Sylhet|Khulna|Rajshahi|Barisal|Rangpur)/i);
  if (locationMatch) {
    result.location = locationMatch[1];
  }
  
  // Parse distance: "within 20km of port"
  const distanceMatch = query.match(/within\s+(\d+)\s*km\s+of\s+(port|airport)/i);
  if (distanceMatch) {
    const distance = parseInt(distanceMatch[1]);
    const facility = distanceMatch[2].toLowerCase();
    result.maxDistance = { [facility]: distance };
  }
  
  // Parse utilities
  if (/gas|natural gas/i.test(query)) result.utilities.push('gas');
  if (/electric|power|electricity/i.test(query)) result.utilities.push('electricity');
  if (/water/i.test(query)) result.utilities.push('water');
  if (/internet|fiber/i.test(query)) result.utilities.push('internet');
  
  return result;
}

// 🎯 MAIN COMPONENT
export function GISLandBankIntelligence_IMMERSIVE() {
  const { t } = useLanguage();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [minArea, setMinArea] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000000);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map' | '3d'>('map'); // Default to map
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'area-asc' | 'area-desc' | 'port-distance'>('price-asc');
  
  // Map state
  const [mapCenter, setMapCenter] = useState<[number, number]>([23.8103, 90.4125]);
  const [mapZoom, setMapZoom] = useState(7);
  const [mapLayers, setMapLayers] = useState({
    satellite: false,
    plots: true,
    infrastructure: false,
    flood: false,
    elevation: false,
    connectivity: false,
    environmental: false
  });
  
  // 3D viewer state
  const [show3DViewer, setShow3DViewer] = useState(false);
  
  // Natural language search
  const nlpParsed = useMemo(() => {
    if (searchQuery.length > 10) {
      return parseNaturalSearch(searchQuery);
    }
    return null;
  }, [searchQuery]);

  // Filter logic with NLP support
  const filteredParcels = useMemo(() => {
    let filtered = LAND_PARCELS.filter(parcel => {
      // Basic text search
      const matchesBasicSearch = searchQuery === '' || 
        parcel.parcelCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parcel.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parcel.district.toLowerCase().includes(searchQuery.toLowerCase());
      
      // NLP-enhanced search
      if (nlpParsed) {
        if (nlpParsed.area && parcel.areaAcres < nlpParsed.area) return false;
        if (nlpParsed.location && !parcel.district.toLowerCase().includes(nlpParsed.location.toLowerCase())) return false;
        if (nlpParsed.maxDistance?.port && parcel.accessibility.portDistanceKm > nlpParsed.maxDistance.port) return false;
        if (nlpParsed.maxDistance?.airport && parcel.accessibility.airportDistanceKm > nlpParsed.maxDistance.airport) return false;
        if (nlpParsed.utilities.includes('gas') && !parcel.utilities.gas.available) return false;
        if (nlpParsed.utilities.includes('electricity') && !parcel.utilities.electricity.available) return false;
      }
      
      const matchesDistrict = selectedDistrict === 'all' || parcel.district === selectedDistrict;
      const matchesStatus = selectedStatus === 'all' || parcel.status === selectedStatus;
      const matchesSector = selectedSector === 'all' || parcel.suitableFor.includes(selectedSector);
      const matchesArea = parcel.areaAcres >= minArea;
      const matchesPrice = parcel.totalPriceUSD <= maxPrice;
      
      return matchesBasicSearch && matchesDistrict && matchesStatus && matchesSector && matchesArea && matchesPrice;
    });
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.totalPriceUSD - b.totalPriceUSD;
        case 'price-desc': return b.totalPriceUSD - a.totalPriceUSD;
        case 'area-asc': return a.areaAcres - b.areaAcres;
        case 'area-desc': return b.areaAcres - a.areaAcres;
        case 'port-distance': return a.accessibility.portDistanceKm - b.accessibility.portDistanceKm;
        default: return 0;
      }
    });
    
    return filtered;
  }, [searchQuery, selectedDistrict, selectedStatus, selectedSector, minArea, maxPrice, sortBy, nlpParsed]);

  const districts = Array.from(new Set(LAND_PARCELS.map(p => p.district)));
  const allSectors = Array.from(new Set(LAND_PARCELS.flatMap(p => p.suitableFor)));

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favoriteIds);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavoriteIds(newFavorites);
  };

  const toggleLayer = (layer: keyof typeof mapLayers) => {
    setMapLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'reserved': return 'bg-yellow-100 text-yellow-700';
      case 'allocated': return 'bg-blue-100 text-blue-700';
      case 'under-development': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low': return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Low Risk</span>;
      case 'medium': return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">Medium Risk</span>;
      case 'high': return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">High Risk</span>;
      default: return null;
    }
  };

  return (
    <div className={glassCard['p-6']}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Map className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">🌍 Immersive GIS Land Bank</h2>
              <p className="text-sm text-gray-600">Interactive 3D mapping • Virtual site tours • AI-powered search</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex bg-white border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded flex items-center gap-2 text-sm transition-colors ${
                viewMode === 'grid' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
              Grid
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded flex items-center gap-2 text-sm transition-colors ${
                viewMode === 'map' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Map className="w-4 h-4" />
              Map
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1.5 rounded flex items-center gap-2 text-sm transition-colors ${
                viewMode === '3d' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Cuboid className="w-4 h-4" />
              3D
            </button>
          </div>
          
          <button className="glass-button px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/80">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">Available</span>
          </div>
          <p className="text-2xl font-bold text-green-700">
            {filteredParcels.filter(p => p.status === 'available').length}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <Maximize2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">Total Area</span>
          </div>
          <p className="text-2xl font-bold text-blue-700">
            {filteredParcels.reduce((sum, p) => sum + p.areaAcres, 0).toFixed(0)} Ac
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600">Districts</span>
          </div>
          <p className="text-2xl font-bold text-purple-700">
            {districts.length}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-gray-600">Avg/Acre</span>
          </div>
          <p className="text-2xl font-bold text-orange-700">
            ${(LAND_PARCELS.reduce((sum, p) => sum + p.pricePerAcreUSD, 0) / LAND_PARCELS.length / 1000).toFixed(0)}K
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-pink-600" />
            <span className="text-sm text-gray-600">Favorites</span>
          </div>
          <p className="text-2xl font-bold text-pink-700">
            {favoriteIds.size}
          </p>
        </motion.div>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder='Try: "Find me 50 acres within 20km of Chattogram Port with gas connection"'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            {nlpParsed && Object.keys(nlpParsed).length > 1 && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded flex items-center gap-1">
                  <Scan className="w-3 h-3" />
                  AI Parsed
                </span>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-lg flex items-center gap-2 transition-colors ${
              showFilters ? 'bg-emerald-100 text-emerald-700' : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filters
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="price-asc">💰 Price: Low to High</option>
            <option value="price-desc">💰 Price: High to Low</option>
            <option value="area-asc">📏 Size: Small to Large</option>
            <option value="area-desc">📏 Size: Large to Small</option>
            <option value="port-distance">🚢 Nearest to Port</option>
          </select>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="all">All Districts</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="allocated">Allocated</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Sector</label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="all">All Sectors</option>
                  {allSectors.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Min Area (acres)</label>
                <input
                  type="number"
                  value={minArea}
                  onChange={(e) => setMinArea(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Max Price (USD)</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className="relative">
        {/* GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParcels.map((parcel, idx) => (
              <motion.div
                key={parcel.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-gray-500">{parcel.parcelCode}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{parcel.zone}</h3>
                    <p className="text-sm text-gray-600">{parcel.district}</p>
                  </div>
                  
                  <button
                    onClick={() => toggleFavorite(parcel.id)}
                    className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Star 
                      className={`w-5 h-5 ${
                        favoriteIds.has(parcel.id) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(parcel.status)}`}>
                    {parcel.status.replace('-', ' ').toUpperCase()}
                  </span>
                  {getRiskBadge(parcel.floodRisk)}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Area</span>
                    <span className="text-sm font-semibold">{parcel.areaAcres} acres</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Total Price</span>
                    <span className="text-sm font-semibold text-emerald-600">
                      ${(parcel.totalPriceUSD / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Port Distance</span>
                    <span className="text-sm">{parcel.accessibility.portDistanceKm} km</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className={`flex flex-col items-center p-2 rounded ${parcel.utilities.electricity.available ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <Zap className={`w-4 h-4 ${parcel.utilities.electricity.available ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-xs mt-1">Power</span>
                  </div>
                  <div className={`flex flex-col items-center p-2 rounded ${parcel.utilities.water.available ? 'bg-blue-50' : 'bg-gray-50'}`}>
                    <Droplet className={`w-4 h-4 ${parcel.utilities.water.available ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs mt-1">Water</span>
                  </div>
                  <div className={`flex flex-col items-center p-2 rounded ${parcel.utilities.gas.available ? 'bg-orange-50' : 'bg-gray-50'}`}>
                    <Lightning className={`w-4 h-4 ${parcel.utilities.gas.available ? 'text-orange-600' : 'text-gray-400'}`} />
                    <span className="text-xs mt-1">Gas</span>
                  </div>
                  <div className={`flex flex-col items-center p-2 rounded ${parcel.utilities.internet.available ? 'bg-purple-50' : 'bg-gray-50'}`}>
                    <Wifi className={`w-4 h-4 ${parcel.utilities.internet.available ? 'text-purple-600' : 'text-gray-400'}`} />
                    <span className="text-xs mt-1">Fiber</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedParcel(parcel)}
                    className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setSelectedParcel(parcel);
                      setShow3DViewer(true);
                    }}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Box className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* MAP VIEW */}
        {viewMode === 'map' && (
          <div className="relative">
            <div className="h-[700px] rounded-xl overflow-hidden border border-gray-200 bg-gray-100 relative">
              {/* Static Map Placeholder */}
              <div 
                className="w-full h-full relative"
                style={{
                  
                  backgroundImage: `url(https://api.mapbox.com/styles/v1/mapbox/${mapLayers.satellite ? 'satellite-v9' : 'streets-v11'}/static/90.4074,23.7104,11,0/1200x700@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN})`,

                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Plot markers overlay - shown when plots layer is enabled */}
                {mapLayers.plots && filteredParcels.slice(0, 10).map((parcel, idx) => (
                  <div
                    key={parcel.id}
                    className="absolute w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform flex items-center justify-center"
                    style={{
                      left: `${20 + (idx * 8)}%`,
                      top: `${30 + ((idx % 3) * 15)}%`
                    }}
                    title={parcel.name}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                ))}
                
                {/* Flood risk zones overlay - shown when flood layer is enabled */}
                {mapLayers.flood && (
                  <>
                    <div className="absolute w-32 h-32 bg-red-500/20 rounded-full border-2 border-red-500/40" 
                      style={{ left: '30%', top: '40%' }}></div>
                    <div className="absolute w-24 h-24 bg-yellow-500/20 rounded-full border-2 border-yellow-500/40" 
                      style={{ left: '60%', top: '50%' }}></div>
                  </>
                )}
                
                {/* Infrastructure overlay - shown when infrastructure layer is enabled */}
                {mapLayers.infrastructure && (
                  <>
                    <div className="absolute w-3 h-3 bg-blue-600 rounded-full" style={{ left: '25%', top: '35%' }} title="Power Station"></div>
                    <div className="absolute w-3 h-3 bg-purple-600 rounded-full" style={{ left: '55%', top: '45%' }} title="Water Treatment"></div>
                    <div className="absolute w-3 h-3 bg-orange-600 rounded-full" style={{ left: '70%', top: '60%' }} title="Port"></div>
                  </>
                )}
                
                {/* Map attribution */}
                <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs text-gray-600">
                  © Mapbox © OpenStreetMap
                </div>
              </div>
            </div>
            
            {/* Map layer controls */}
            <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-4 w-64">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Data Layers
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mapLayers.satellite}
                    onChange={() => toggleLayer('satellite')}
                    className="rounded"
                  />
                  <Satellite className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Satellite Imagery</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mapLayers.plots}
                    onChange={() => toggleLayer('plots')}
                    className="rounded"
                  />
                  <MapPinned className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">Available Plots</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mapLayers.infrastructure}
                    onChange={() => toggleLayer('infrastructure')}
                    className="rounded"
                  />
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Infrastructure</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mapLayers.flood}
                    onChange={() => toggleLayer('flood')}
                    className="rounded"
                  />
                  <Waves className="w-4 h-4 text-red-600" />
                  <span className="text-sm">Flood Risk Zones</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mapLayers.elevation}
                    onChange={() => toggleLayer('elevation')}
                    className="rounded"
                  />
                  <Mountain className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Elevation Data</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mapLayers.connectivity}
                    onChange={() => toggleLayer('connectivity')}
                    className="rounded"
                  />
                  <Route className="w-4 h-4 text-orange-600" />
                  <span className="text-sm">Connectivity</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mapLayers.environmental}
                    onChange={() => toggleLayer('environmental')}
                    className="rounded"
                  />
                  <TreePine className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Environmental</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 3D VIEW */}
        {viewMode === '3d' && (
          <div className="h-[700px] rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-b from-blue-100 to-blue-50 relative">
            <FactoryBuilding3D />
            
            <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-4 z-10">
              <h3 className="font-semibold mb-2">🏭 3D Building Visualization</h3>
              <p className="text-sm text-gray-600 mb-3">Preview what a factory would look like on this plot</p>
              <div className="space-y-1 text-xs text-gray-600">
                <p>• CSS 3D transforms for visualization</p>
                <p>• Hover to see details</p>
                <p>• Select plot to see specific dimensions</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedParcel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedParcel(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedParcel.zone}</h2>
                    <p className="text-gray-600">{selectedParcel.parcelCode} • {selectedParcel.district}</p>
                  </div>
                  <button
                    onClick={() => setSelectedParcel(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-3">📊 Plot Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Area</span>
                          <span className="font-medium">{selectedParcel.areaAcres} acres ({selectedParcel.areaHectares} ha)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price per Acre</span>
                          <span className="font-medium">${(selectedParcel.pricePerAcreUSD / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Price</span>
                          <span className="font-bold text-emerald-600">${(selectedParcel.totalPriceUSD / 1000000).toFixed(2)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status</span>
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedParcel.status)}`}>
                            {selectedParcel.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Available From</span>
                          <span className="font-medium">{selectedParcel.availableFrom}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lease Term</span>
                          <span className="font-medium">{selectedParcel.leaseTermYears} years</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">⚡ Infrastructure</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-600" />
                            <span>Electricity</span>
                          </div>
                          <span className="text-sm">{selectedParcel.utilities.electricity.capacity} • {selectedParcel.utilities.electricity.reliability}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Droplet className="w-4 h-4 text-blue-600" />
                            <span>Water</span>
                          </div>
                          <span className="text-sm">{selectedParcel.utilities.water.capacity}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Lightning className="w-4 h-4 text-orange-600" />
                            <span>Gas</span>
                          </div>
                          <span className="text-sm">{selectedParcel.utilities.gas.capacity || 'Not Available'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Wifi className="w-4 h-4 text-purple-600" />
                            <span>Internet</span>
                          </div>
                          <span className="text-sm">{selectedParcel.utilities.internet.speed}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">🚗 Accessibility</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">Port: {selectedParcel.accessibility.portDistanceKm} km</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">Airport: {selectedParcel.accessibility.airportDistanceKm} km</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Route className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">Highway: {selectedParcel.accessibility.highwayDistanceKm} km</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Route className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">Railway: {selectedParcel.accessibility.railwayDistanceKm} km</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-3">🏭 Suitable For</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedParcel.suitableFor.map(sector => (
                          <span key={sector} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                            {sector}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">🌍 Environmental</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Soil Type</span>
                          <span className="font-medium">{selectedParcel.soilType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Flood Risk</span>
                          {getRiskBadge(selectedParcel.floodRisk)}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Seismic Zone</span>
                          <span className="font-medium">Zone {selectedParcel.seismicZone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Elevation</span>
                          <span className="font-medium">{selectedParcel.elevation}m ASL</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Terrain</span>
                          <span className="font-medium">{selectedParcel.terrainType}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">✅ Legal Status</h3>
                      <div className="space-y-2">
                        {selectedParcel.legal.clearTitle && (
                          <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-sm">Clear Title</span>
                          </div>
                        )}
                        {selectedParcel.legal.environmentalClearance && (
                          <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-sm">Environmental Clearance</span>
                          </div>
                        )}
                        {selectedParcel.legal.noObjectionCertificate && (
                          <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-sm">No Objection Certificate</span>
                          </div>
                        )}
                        {selectedParcel.legal.surveyCompleted && (
                          <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-sm">Survey Completed</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">📞 Contact</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{selectedParcel.authority}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{selectedParcel.contactPhone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{selectedParcel.contactEmail}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium">
                    Request Reservation
                  </button>
                  <button
                    onClick={() => {
                      setShow3DViewer(true);
                    }}
                    className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View in 3D
                  </button>
                  <button className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Street View
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredParcels.length} of {LAND_PARCELS.length} plots
        {nlpParsed && <span className="ml-2 text-emerald-600 font-medium">• AI-enhanced search active</span>}
      </div>
    </div>
  );
}
