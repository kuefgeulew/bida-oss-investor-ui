import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map, MapPin, Zap, Droplet, Wifi, Factory, 
  DollarSign, TrendingUp, CheckCircle2, AlertCircle,
  Search, Filter, Maximize2, Navigation, Download,
  Globe, Route, Building2, TreePine, Shield, Award,
  ChevronDown, ChevronUp, ExternalLink, Phone, Mail,
  X, Star, Layers, Info
} from 'lucide-react';
import { glassCard } from '@/app/config/designSystem';
import { useLanguage } from '@/app/components/LanguageContext';

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
  
  // Infrastructure readiness
  utilities: {
    electricity: { available: boolean; capacity: string; reliability: number };
    water: { available: boolean; capacity: string; quality: string };
    gas: { available: boolean; capacity: string };
    internet: { available: boolean; speed: string; provider: string };
    sewage: { available: boolean; treatment: string };
  };
  
  // Accessibility
  accessibility: {
    portDistanceKm: number;
    airportDistanceKm: number;
    highwayDistanceKm: number;
    railwayDistanceKm: number;
  };
  
  // Legal & Compliance
  legal: {
    clearTitle: boolean;
    environmentalClearance: boolean;
    noObjectionCertificate: boolean;
    surveyCompleted: boolean;
  };
  
  // Suitability
  suitableFor: string[];
  soilType: string;
  floodRisk: 'low' | 'medium' | 'high';
  seismicZone: number;
  
  // Contact
  authority: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  
  // Additional
  highlights: string[];
  restrictions: string[];
  leaseTermYears?: number;
  availableFrom: string;
}

// 🏭 MOCK GIS LAND BANK DATABASE
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
    
    suitableFor: ['Manufacturing', 'Electronics', 'Pharmaceuticals', 'IT/ITES'],
    soilType: 'Clay loam - Excellent load bearing',
    floodRisk: 'low',
    seismicZone: 2,
    
    authority: 'Bangladesh Export Processing Zones Authority',
    contactPerson: 'Mr. Kamal Hassan',
    contactEmail: 'land.allocation@bepza.gov.bd',
    contactPhone: '+880-2-8181010',
    
    highlights: [
      'Adjacent to existing tech park',
      'Dual power supply (Grid + Solar)',
      'Pre-approved for pharmaceutical manufacturing',
      'Tax holiday eligible zone'
    ],
    restrictions: ['No heavy chemical processing', 'Max building height: 12 floors'],
    leaseTermYears: 50,
    availableFrom: '2024-04-01'
  },
  
  {
    id: 'land-002',
    parcelCode: 'CEPZ-CTG-2024-045',
    zone: 'Chittagong Export Processing Zone',
    district: 'Chittagong',
    coordinates: { lat: 22.3569, lng: 91.7832 },
    areaAcres: 42.0,
    areaHectares: 17.0,
    status: 'available',
    pricePerAcreUSD: 95000,
    totalPriceUSD: 3990000,
    
    utilities: {
      electricity: { available: true, capacity: '10 MW', reliability: 99.5 },
      water: { available: true, capacity: '2,000 m³/day', quality: 'Industrial + Potable' },
      gas: { available: true, capacity: '200,000 m³/day' },
      internet: { available: true, speed: '10 Gbps Fiber', provider: 'Submarine Cable' },
      sewage: { available: true, treatment: 'Central ETP + CETP' }
    },
    
    accessibility: {
      portDistanceKm: 4,
      airportDistanceKm: 18,
      highwayDistanceKm: 1,
      railwayDistanceKm: 6
    },
    
    legal: {
      clearTitle: true,
      environmentalClearance: true,
      noObjectionCertificate: true,
      surveyCompleted: true
    },
    
    suitableFor: ['Garments', 'Textiles', 'Heavy Manufacturing', 'Logistics'],
    soilType: 'Sandy clay - Good drainage',
    floodRisk: 'low',
    seismicZone: 3,
    
    authority: 'Chittagong Export Processing Zone Authority',
    contactPerson: 'Ms. Sultana Begum',
    contactEmail: 'info@cepz.gov.bd',
    contactPhone: '+880-31-2510261',
    
    highlights: [
      'Direct port access - 4km to Chittagong Port',
      'Container freight station within 2km',
      'Dedicated cargo handling zone',
      'Bonded warehouse facility nearby'
    ],
    restrictions: ['Environmental monitoring required', 'Noise level: Max 70 dB'],
    leaseTermYears: 50,
    availableFrom: '2024-03-15'
  },
  
  {
    id: 'land-003',
    parcelCode: 'BSCIC-SYL-2024-012',
    zone: 'Sylhet Industrial Estate',
    district: 'Sylhet',
    coordinates: { lat: 24.8949, lng: 91.8687 },
    areaAcres: 8.2,
    areaHectares: 3.32,
    status: 'available',
    pricePerAcreUSD: 68000,
    totalPriceUSD: 557600,
    
    utilities: {
      electricity: { available: true, capacity: '1 MW', reliability: 98.5 },
      water: { available: true, capacity: '200 m³/day', quality: 'Natural Spring' },
      gas: { available: true, capacity: '20,000 m³/day' },
      internet: { available: true, speed: '500 Mbps', provider: 'BSCCL' },
      sewage: { available: true, treatment: 'On-site ETP Required' }
    },
    
    accessibility: {
      portDistanceKm: 285,
      airportDistanceKm: 9,
      highwayDistanceKm: 6,
      railwayDistanceKm: 11
    },
    
    legal: {
      clearTitle: true,
      environmentalClearance: true,
      noObjectionCertificate: true,
      surveyCompleted: true
    },
    
    suitableFor: ['Food Processing', 'Agro-based', 'Tea Processing', 'Tourism'],
    soilType: 'Red laterite - Stable foundation',
    floodRisk: 'medium',
    seismicZone: 2,
    
    authority: 'Bangladesh Small & Cottage Industries Corporation',
    contactPerson: 'Mr. Abdul Karim',
    contactEmail: 'sylhet@bscic.gov.bd',
    contactPhone: '+880-821-715041',
    
    highlights: [
      'Natural spring water access',
      'Scenic location for agro-tourism',
      'Lower land costs compared to Dhaka',
      'SME-friendly policies'
    ],
    restrictions: ['Must maintain green cover 20%', 'No heavy pollutants'],
    leaseTermYears: 30,
    availableFrom: '2024-05-01'
  },
  
  {
    id: 'land-004',
    parcelCode: 'BHTPA-MNG-2024-008',
    zone: 'Mongla Economic Zone',
    district: 'Bagerhat',
    coordinates: { lat: 22.4841, lng: 89.6077 },
    areaAcres: 125.0,
    areaHectares: 50.59,
    status: 'available',
    pricePerAcreUSD: 55000,
    totalPriceUSD: 6875000,
    
    utilities: {
      electricity: { available: true, capacity: '50 MW', reliability: 99.2 },
      water: { available: true, capacity: '10,000 m³/day', quality: 'Deep tube well' },
      gas: { available: false, capacity: 'LNG pipeline planned 2025' },
      internet: { available: true, speed: '1 Gbps', provider: 'Fiber backbone' },
      sewage: { available: true, treatment: 'Centralized CETP' }
    },
    
    accessibility: {
      portDistanceKm: 2,
      airportDistanceKm: 185,
      highwayDistanceKm: 8,
      railwayDistanceKm: 15
    },
    
    legal: {
      clearTitle: true,
      environmentalClearance: true,
      noObjectionCertificate: true,
      surveyCompleted: true
    },
    
    suitableFor: ['Shipbuilding', 'Heavy Industry', 'Logistics', 'Petrochemicals'],
    soilType: 'Alluvial - Deep piling recommended',
    floodRisk: 'medium',
    seismicZone: 2,
    
    authority: 'Bangladesh Hi-Tech Park Authority',
    contactPerson: 'Engr. Masud Rahman',
    contactEmail: 'mongla@bhtpa.gov.bd',
    contactPhone: '+880-466-662210',
    
    highlights: [
      'Mega parcel - ideal for large manufacturers',
      'Direct seaport connectivity (2km)',
      'Special incentives for shipbuilding',
      'Foreign investor priority zone'
    ],
    restrictions: ['Environmental impact assessment mandatory', 'Coastal regulation zone'],
    leaseTermYears: 99,
    availableFrom: '2024-06-01'
  },
  
  {
    id: 'land-005',
    parcelCode: 'BEZA-MYM-2024-023',
    zone: 'Mymensingh Hi-Tech Park',
    district: 'Mymensingh',
    coordinates: { lat: 24.7471, lng: 90.4203 },
    areaAcres: 5.8,
    areaHectares: 2.35,
    status: 'reserved',
    pricePerAcreUSD: 72000,
    totalPriceUSD: 417600,
    
    utilities: {
      electricity: { available: true, capacity: '800 kW', reliability: 99.0 },
      water: { available: true, capacity: '150 m³/day', quality: 'Municipal supply' },
      gas: { available: true, capacity: '15,000 m³/day' },
      internet: { available: true, speed: '1 Gbps', provider: 'NTTN' },
      sewage: { available: true, treatment: 'Municipal connection' }
    },
    
    accessibility: {
      portDistanceKm: 145,
      airportDistanceKm: 135,
      highwayDistanceKm: 4,
      railwayDistanceKm: 7
    },
    
    legal: {
      clearTitle: true,
      environmentalClearance: true,
      noObjectionCertificate: true,
      surveyCompleted: true
    },
    
    suitableFor: ['IT/ITES', 'Software Development', 'R&D Centers', 'Call Centers'],
    soilType: 'Loamy - Good for foundations',
    floodRisk: 'low',
    seismicZone: 2,
    
    authority: 'Bangladesh Economic Zones Authority',
    contactPerson: 'Mr. Zahirul Islam',
    contactEmail: 'mymensingh@beza.gov.bd',
    contactPhone: '+880-91-66656',
    
    highlights: [
      'Tech-focused zone with startup incubator',
      'Lower operational costs',
      'Skilled IT workforce from local universities',
      'Green building certification support'
    ],
    restrictions: ['IT/ITES priority sector', 'Minimum 50 jobs creation'],
    leaseTermYears: 30,
    availableFrom: '2024-08-01'
  },
  
  {
    id: 'land-006',
    parcelCode: 'KEPZ-KHL-2024-067',
    zone: 'Karnaphuli Export Processing Zone',
    district: 'Chittagong',
    coordinates: { lat: 22.2638, lng: 91.7373 },
    areaAcres: 28.5,
    areaHectares: 11.53,
    status: 'available',
    pricePerAcreUSD: 88000,
    totalPriceUSD: 2508000,
    
    utilities: {
      electricity: { available: true, capacity: '5 MW', reliability: 99.7 },
      water: { available: true, capacity: '1,200 m³/day', quality: 'Industrial grade' },
      gas: { available: true, capacity: '100,000 m³/day' },
      internet: { available: true, speed: '5 Gbps', provider: 'Dedicated fiber' },
      sewage: { available: true, treatment: 'Zone CETP' }
    },
    
    accessibility: {
      portDistanceKm: 15,
      airportDistanceKm: 22,
      highwayDistanceKm: 2,
      railwayDistanceKm: 5
    },
    
    legal: {
      clearTitle: true,
      environmentalClearance: true,
      noObjectionCertificate: true,
      surveyCompleted: true
    },
    
    suitableFor: ['Electronics', 'Auto Parts', 'Plastics', 'Engineering'],
    soilType: 'Clay-sand mix - Excellent bearing',
    floodRisk: 'low',
    seismicZone: 3,
    
    authority: 'Karnaphuli EPZ Authority',
    contactPerson: 'Ms. Farhana Ahmed',
    contactEmail: 'admin@kepz.gov.bd',
    contactPhone: '+880-31-2550170',
    
    highlights: [
      'Premium industrial zone',
      'Existing electronics cluster',
      'Customs bonding facility on-site',
      'Established supply chain ecosystem'
    ],
    restrictions: ['Fire safety NOC required', 'Hazardous materials protocol'],
    leaseTermYears: 50,
    availableFrom: '2024-04-20'
  }
];

export function GISLandBankIntelligence() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [minArea, setMinArea] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000000);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  // Filter logic
  const filteredParcels = useMemo(() => {
    return LAND_PARCELS.filter(parcel => {
      const matchesSearch = searchQuery === '' || 
        parcel.parcelCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parcel.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parcel.district.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDistrict = selectedDistrict === 'all' || parcel.district === selectedDistrict;
      const matchesStatus = selectedStatus === 'all' || parcel.status === selectedStatus;
      const matchesSector = selectedSector === 'all' || parcel.suitableFor.includes(selectedSector);
      const matchesArea = parcel.areaAcres >= minArea;
      const matchesPrice = parcel.totalPriceUSD <= maxPrice;
      
      return matchesSearch && matchesDistrict && matchesStatus && matchesSector && matchesArea && matchesPrice;
    });
  }, [searchQuery, selectedDistrict, selectedStatus, selectedSector, minArea, maxPrice]);

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
              <h2 className="text-2xl font-bold">GIS Land Bank Intelligence</h2>
              <p className="text-sm text-gray-600">Real-time industrial land availability with infrastructure mapping</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'map' : 'grid')}
            className="glass-button px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/80"
          >
            {viewMode === 'grid' ? <Map className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
            {viewMode === 'grid' ? 'Map View' : 'Grid View'}
          </button>
          
          <button className="glass-button px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/80">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">Available Parcels</span>
          </div>
          <p className="text-2xl font-bold text-green-700">
            {LAND_PARCELS.filter(p => p.status === 'available').length}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Maximize2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">Total Area</span>
          </div>
          <p className="text-2xl font-bold text-blue-700">
            {LAND_PARCELS.reduce((sum, p) => sum + p.areaAcres, 0).toFixed(0)} Acres
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600">Districts Covered</span>
          </div>
          <p className="text-2xl font-bold text-purple-700">
            {districts.length}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-gray-600">Avg Price/Acre</span>
          </div>
          <p className="text-2xl font-bold text-orange-700">
            ${(LAND_PARCELS.reduce((sum, p) => sum + p.pricePerAcreUSD, 0) / LAND_PARCELS.length / 1000).toFixed(0)}K
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by parcel code, zone, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${
              showFilters ? 'bg-emerald-500 text-white' : 'bg-white border border-gray-200'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filters
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid grid-cols-5 gap-4 overflow-hidden"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Districts</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="allocated">Allocated</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Sectors</option>
                  {allSectors.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Area (acres)</label>
                <input
                  type="number"
                  value={minArea}
                  onChange={(e) => setMinArea(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (USD)</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  min="0"
                  step="100000"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredParcels.length}</span> of {LAND_PARCELS.length} parcels
        </p>
        
        {favoriteIds.size > 0 && (
          <button className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            <Star className="w-4 h-4" />
            {favoriteIds.size} Favorites
          </button>
        )}
      </div>

      {/* Parcel Grid */}
      <div className="grid grid-cols-2 gap-6">
        {filteredParcels.map((parcel) => (
          <motion.div
            key={parcel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden"
          >
            {/* Parcel Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{parcel.zone}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(parcel.status)}`}>
                      {parcel.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-mono">{parcel.parcelCode}</p>
                </div>
                
                <button
                  onClick={() => toggleFavorite(parcel.id)}
                  className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                >
                  <Star className={`w-5 h-5 ${favoriteIds.has(parcel.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-gray-700">{parcel.district}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize2 className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">{parcel.areaAcres} acres</span>
                </div>
              </div>
            </div>

            {/* Parcel Details */}
            <div className="p-4 space-y-3">
              {/* Pricing */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Total Price</p>
                    <p className="text-xl font-bold text-blue-700">
                      ${(parcel.totalPriceUSD / 1000000).toFixed(2)}M USD
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">Per Acre</p>
                    <p className="text-sm font-semibold text-gray-700">
                      ${(parcel.pricePerAcreUSD / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>
              </div>

              {/* Infrastructure */}
              <div>
                <p className="text-xs font-medium text-gray-600 mb-2">Infrastructure</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className={`flex items-center gap-1 text-xs ${parcel.utilities.electricity.available ? 'text-green-600' : 'text-gray-400'}`}>
                    <Zap className="w-3 h-3" />
                    <span>Power</span>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${parcel.utilities.water.available ? 'text-blue-600' : 'text-gray-400'}`}>
                    <Droplet className="w-3 h-3" />
                    <span>Water</span>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${parcel.utilities.internet.available ? 'text-purple-600' : 'text-gray-400'}`}>
                    <Wifi className="w-3 h-3" />
                    <span>Fiber</span>
                  </div>
                </div>
              </div>

              {/* Accessibility */}
              <div>
                <p className="text-xs font-medium text-gray-600 mb-2">Accessibility</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-gray-500" />
                    <span>Port: {parcel.accessibility.portDistanceKm}km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Route className="w-3 h-3 text-gray-500" />
                    <span>Highway: {parcel.accessibility.highwayDistanceKm}km</span>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Flood Risk</p>
                  {getRiskBadge(parcel.floodRisk)}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600 mb-1">Legal Status</p>
                  {parcel.legal.clearTitle ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      <CheckCircle2 className="w-3 h-3" />
                      Clear Title
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                      <AlertCircle className="w-3 h-3" />
                      Pending
                    </span>
                  )}
                </div>
              </div>

              {/* Suitable Sectors */}
              <div>
                <p className="text-xs font-medium text-gray-600 mb-2">Suitable For</p>
                <div className="flex flex-wrap gap-1">
                  {parcel.suitableFor.slice(0, 3).map((sector, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {sector}
                    </span>
                  ))}
                  {parcel.suitableFor.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                      +{parcel.suitableFor.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex gap-2">
                <button
                  onClick={() => setSelectedParcel(parcel)}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
                >
                  View Details
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Parcel Detail Modal */}
      <AnimatePresence>
        {selectedParcel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedParcel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedParcel.zone}</h3>
                  <p className="text-sm text-gray-600 font-mono">{selectedParcel.parcelCode}</p>
                </div>
                <button
                  onClick={() => setSelectedParcel(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Area</p>
                    <p className="text-xl font-bold text-blue-700">{selectedParcel.areaAcres} acres</p>
                    <p className="text-xs text-gray-500">{selectedParcel.areaHectares} hectares</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Price</p>
                    <p className="text-xl font-bold text-green-700">${(selectedParcel.totalPriceUSD / 1000000).toFixed(2)}M</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Lease Term</p>
                    <p className="text-xl font-bold text-purple-700">{selectedParcel.leaseTermYears} years</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Available</p>
                    <p className="text-lg font-bold text-orange-700">{new Date(selectedParcel.availableFrom).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Infrastructure Details */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">Infrastructure Readiness</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium">Electricity</span>
                      </div>
                      <p className="text-sm text-gray-600">Capacity: {selectedParcel.utilities.electricity.capacity}</p>
                      <p className="text-sm text-gray-600">Reliability: {selectedParcel.utilities.electricity.reliability}%</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplet className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Water</span>
                      </div>
                      <p className="text-sm text-gray-600">Capacity: {selectedParcel.utilities.water.capacity}</p>
                      <p className="text-sm text-gray-600">Quality: {selectedParcel.utilities.water.quality}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Factory className="w-5 h-5 text-red-600" />
                        <span className="font-medium">Gas</span>
                      </div>
                      <p className="text-sm text-gray-600">{selectedParcel.utilities.gas.capacity}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Wifi className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">Internet</span>
                      </div>
                      <p className="text-sm text-gray-600">Speed: {selectedParcel.utilities.internet.speed}</p>
                      <p className="text-sm text-gray-600">Provider: {selectedParcel.utilities.internet.provider}</p>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">Key Highlights</h4>
                  <div className="space-y-2">
                    {selectedParcel.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Award className="w-5 h-5 text-emerald-600 mt-0.5" />
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span>{selectedParcel.authority}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <a href={`mailto:${selectedParcel.contactEmail}`} className="text-emerald-600 hover:underline">
                        {selectedParcel.contactEmail}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{selectedParcel.contactPhone}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium">
                    Request Site Visit
                  </button>
                  <button className="flex-1 px-6 py-3 border-2 border-emerald-500 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-colors font-medium">
                    Download Details (PDF)
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
