// Supply Chain Engine - Sector-based supply chain mapping
// READ-ONLY engine that maps sectors to suppliers, ports, and exporters
// Used by: SupplyChainVisualizer, Sector Hubs

export interface Supplier {
  id: string;
  name: string;
  type: 'raw-material' | 'component' | 'service' | 'logistics';
  location: {
    district: string;
    coordinates: { lat: number; lng: number };
  };
  products: string[];
  certifications: string[];
  capacity: string;
  leadTimeDays: number;
  contactEmail: string;
}

// 🆕 NEW: Peer Companies (other manufacturers in same sector)
export interface PeerCompany {
  id: string;
  name: string;
  sector: string;
  size: 'Small' | 'Medium' | 'Large' | 'Multinational';
  employeeCount: number;
  annualRevenue: string;
  location: {
    district: string;
    coordinates: { lat: number; lng: number };
  };
  specializations: string[];
  certifications: string[];
  establishedYear: number;
  contactEmail: string;
  website?: string;
}

// 🆕 NEW: Support Services
export interface SupportService {
  id: string;
  name: string;
  category: 'machinery' | 'maintenance' | 'laundry' | 'compliance' | 'consulting' | 'training';
  location: {
    district: string;
    coordinates: { lat: number; lng: number };
  };
  services: string[];
  certifications: string[];
  clientTypes: string[];
  contactEmail: string;
  phone: string;
}

// 🆕 NEW: Downstream Partners
export interface DownstreamPartner {
  id: string;
  name: string;
  type: 'buying-house' | 'freight-forwarder' | 'qc-lab' | 'customs-agent' | 'insurance';
  location: {
    district: string;
    coordinates: { lat: number; lng: number };
  };
  services: string[];
  certifications: string[];
  clientIndustries: string[];
  contactEmail: string;
  internationalOffices?: string[];
}

export interface Port {
  id: string;
  name: string;
  type: 'seaport' | 'airport' | 'land-port' | 'dry-port';
  location: {
    district: string;
    coordinates: { lat: number; lng: number };
  };
  capabilities: string[];
  throughputTEU?: number; // For seaports
  runways?: number; // For airports
  customsClearanceHours: number;
  storageCapacity: string;
}

export interface Exporter {
  id: string;
  name: string;
  sector: string;
  exportVolume: string;
  destinations: string[];
  rating: number;
  location: {
    district: string;
    coordinates: { lat: number; lng: number };
  };
}

// 🆕 ENHANCED: Complete supply chain map with all 4 sections
export interface SupplyChainMap {
  sector: string;
  suppliers: Supplier[];
  peerCompanies: PeerCompany[];
  supportServices: SupportService[];
  downstreamPartners: DownstreamPartner[];
  ports: Port[];
  exporters: Exporter[];
  tradeLanes: {
    from: string;
    to: string;
    mode: 'sea' | 'air' | 'land';
    duration: string;
  }[];
}

// 🆕 NEW: Clustering Analysis Result
export interface ClusteringAnalysis {
  proximityScore: number; // 0-100
  suppliersWithin50km: number;
  totalSuppliers: number;
  percentageWithin50km: number;
  clusterStrength: 'Weak' | 'Moderate' | 'Strong' | 'Excellent';
  averageDistance: number;
  insights: string[];
}

// 🆕 NEW: Gap Analysis Result
export interface GapAnalysis {
  missingCategories: string[];
  importRequired: string[];
  completenessScore: number; // 0-100
  strengths: string[];
  gaps: string[];
  recommendations: string[];
}

// Port database
const portsDB: Port[] = [
  {
    id: 'port-ctg-sea',
    name: 'Chittagong Seaport',
    type: 'seaport',
    location: {
      district: 'Chittagong',
      coordinates: { lat: 22.3384, lng: 91.8100 },
    },
    capabilities: ['Container', 'Bulk Cargo', 'Oil & Gas', 'RoRo'],
    throughputTEU: 3000000,
    customsClearanceHours: 48,
    storageCapacity: '500,000 TEU',
  },
  {
    id: 'port-mongla-sea',
    name: 'Mongla Seaport',
    type: 'seaport',
    location: {
      district: 'Bagerhat',
      coordinates: { lat: 22.4849, lng: 89.5964 },
    },
    capabilities: ['Container', 'Bulk Cargo', 'General Cargo'],
    throughputTEU: 800000,
    customsClearanceHours: 36,
    storageCapacity: '150,000 TEU',
  },
  {
    id: 'port-payra-sea',
    name: 'Payra Seaport',
    type: 'seaport',
    location: {
      district: 'Patuakhali',
      coordinates: { lat: 22.3569, lng: 90.2100 },
    },
    capabilities: ['Container', 'Coal', 'Bulk Cargo'],
    throughputTEU: 1000000,
    customsClearanceHours: 40,
    storageCapacity: '200,000 TEU',
  },
  {
    id: 'port-dac-air',
    name: 'Hazrat Shahjalal International Airport',
    type: 'airport',
    location: {
      district: 'Dhaka',
      coordinates: { lat: 23.8433, lng: 90.3978 },
    },
    capabilities: ['Air Cargo', 'Express Shipment', 'Cold Chain'],
    runways: 2,
    customsClearanceHours: 12,
    storageCapacity: '50,000 tons/year',
  },
  {
    id: 'port-cgp-air',
    name: 'Shah Amanat International Airport',
    type: 'airport',
    location: {
      district: 'Chittagong',
      coordinates: { lat: 22.2496, lng: 91.8133 },
    },
    capabilities: ['Air Cargo', 'Express Shipment'],
    runways: 1,
    customsClearanceHours: 16,
    storageCapacity: '15,000 tons/year',
  },
  {
    id: 'port-benapole-land',
    name: 'Benapole Land Port',
    type: 'land-port',
    location: {
      district: 'Jessore',
      coordinates: { lat: 23.0383, lng: 88.8369 },
    },
    capabilities: ['Road Freight', 'Rail Freight', 'Cross-border Trade'],
    customsClearanceHours: 24,
    storageCapacity: 'N/A',
  },
];

// Supplier database by sector
const suppliersDB: Record<string, Supplier[]> = {
  'Textile & Garments': [
    {
      id: 'sup-tex-001',
      name: 'Bengal Textile Mills',
      type: 'raw-material',
      location: {
        district: 'Gazipur',
        coordinates: { lat: 24.0022, lng: 90.4264 },
      },
      products: ['Cotton Yarn', 'Synthetic Fiber', 'Blended Yarn'],
      certifications: ['GOTS', 'OEKO-TEX', 'BCI'],
      capacity: '5000 tons/month',
      leadTimeDays: 15,
      contactEmail: 'sales@bengaltextile.bd',
    },
    {
      id: 'sup-tex-002',
      name: 'Dhaka Dyeing Solutions',
      type: 'service',
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.8103, lng: 90.4125 },
      },
      products: ['Fabric Dyeing', 'Printing', 'Finishing'],
      certifications: ['ZDHC', 'ISO 14001', 'Higg Index'],
      capacity: '100,000 meters/day',
      leadTimeDays: 7,
      contactEmail: 'contact@dhakadyeing.bd',
    },
    {
      id: 'sup-tex-003',
      name: 'Garment Accessories BD',
      type: 'component',
      location: {
        district: 'Narayanganj',
        coordinates: { lat: 23.6144, lng: 90.5000 },
      },
      products: ['Buttons', 'Zippers', 'Labels', 'Thread'],
      certifications: ['ISO 9001', 'OEKO-TEX'],
      capacity: 'High volume',
      leadTimeDays: 10,
      contactEmail: 'info@garmentaccessories.bd',
    },
  ],
  
  'Pharmaceuticals': [
    {
      id: 'sup-pharma-001',
      name: 'API Manufacturing Ltd',
      type: 'raw-material',
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.7925, lng: 90.4078 },
      },
      products: ['Active Pharmaceutical Ingredients', 'Excipients'],
      certifications: ['WHO-GMP', 'US FDA', 'EU GMP'],
      capacity: '500 kg/batch',
      leadTimeDays: 30,
      contactEmail: 'api@manufacturing.bd',
    },
    {
      id: 'sup-pharma-002',
      name: 'Pharma Packaging Solutions',
      type: 'component',
      location: {
        district: 'Gazipur',
        coordinates: { lat: 24.0945, lng: 90.4125 },
      },
      products: ['Blister Packs', 'Bottles', 'Strip Packaging', 'Labels'],
      certifications: ['ISO 15378', 'GMP'],
      capacity: '10 million units/month',
      leadTimeDays: 20,
      contactEmail: 'sales@pharmapack.bd',
    },
  ],
  
  'Technology & IT': [
    {
      id: 'sup-tech-001',
      name: 'Electronics Components BD',
      type: 'component',
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.7513, lng: 90.3764 },
      },
      products: ['PCBs', 'Semiconductors', 'Connectors', 'Displays'],
      certifications: ['ISO 9001', 'RoHS', 'REACH'],
      capacity: '50,000 units/month',
      leadTimeDays: 45,
      contactEmail: 'components@electronics.bd',
    },
    {
      id: 'sup-tech-002',
      name: 'Data Center Services Ltd',
      type: 'service',
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.8103, lng: 90.4125 },
      },
      products: ['Cloud Hosting', 'Colocation', 'Managed Services'],
      certifications: ['ISO 27001', 'Tier III', 'PCI DSS'],
      capacity: '10 MW IT Load',
      leadTimeDays: 1,
      contactEmail: 'info@datacenter.bd',
    },
  ],
  
  'Heavy Manufacturing': [
    {
      id: 'sup-heavy-001',
      name: 'Steel Bangladesh',
      type: 'raw-material',
      location: {
        district: 'Chittagong',
        coordinates: { lat: 22.3569, lng: 91.7832 },
      },
      products: ['Steel Sheets', 'Rebar', 'Structural Steel'],
      certifications: ['ISO 9001', 'ASTM'],
      capacity: '100,000 tons/year',
      leadTimeDays: 30,
      contactEmail: 'sales@steelbd.com',
    },
    {
      id: 'sup-heavy-002',
      name: 'Industrial Machinery Parts',
      type: 'component',
      location: {
        district: 'Gazipur',
        coordinates: { lat: 24.0022, lng: 90.4264 },
      },
      products: ['Gears', 'Bearings', 'Hydraulics', 'Motors'],
      certifications: ['ISO 9001', 'CE'],
      capacity: 'Custom order based',
      leadTimeDays: 60,
      contactEmail: 'parts@industrial.bd',
    },
  ],
};

// Peer Companies database by sector
const peerCompaniesDB: Record<string, PeerCompany[]> = {
  'Textile & Garments': [
    {
      id: 'peer-tex-001',
      name: 'Textile Industries Ltd',
      sector: 'Textile & Garments',
      size: 'Medium',
      employeeCount: 500,
      annualRevenue: '$10M',
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.8103, lng: 90.4125 },
      },
      specializations: ['Fabric Production', 'Garment Manufacturing'],
      certifications: ['ISO 9001', 'ISO 14001'],
      establishedYear: 2005,
      contactEmail: 'info@textileindustries.com',
      website: 'https://www.textileindustries.com',
    },
    {
      id: 'peer-tex-002',
      name: 'Garment Exporters BD',
      sector: 'Textile & Garments',
      size: 'Large',
      employeeCount: 1500,
      annualRevenue: '$50M',
      location: {
        district: 'Gazipur',
        coordinates: { lat: 24.0022, lng: 90.4264 },
      },
      specializations: ['Apparel Manufacturing', 'Export'],
      certifications: ['ISO 9001', 'ISO 14001'],
      establishedYear: 1998,
      contactEmail: 'info@garmentexporters.com',
      website: 'https://www.garmentexporters.com',
    },
  ],
  
  'Pharmaceuticals': [
    {
      id: 'peer-pharma-001',
      name: 'Square Pharmaceuticals Ltd',
      sector: 'Pharmaceuticals',
      size: 'Multinational',
      employeeCount: 2000,
      annualRevenue: '$200M',
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.7925, lng: 90.4078 },
      },
      specializations: ['API Manufacturing', 'Pharma Packaging'],
      certifications: ['WHO-GMP', 'US FDA', 'EU GMP'],
      establishedYear: 1983,
      contactEmail: 'info@squarepharma.com',
      website: 'https://www.squarepharma.com',
    },
  ],
  
  'Technology & IT': [
    {
      id: 'peer-tech-001',
      name: 'TechBD Solutions Ltd',
      sector: 'Technology & IT',
      size: 'Medium',
      employeeCount: 300,
      annualRevenue: '$5M',
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.8103, lng: 90.4125 },
      },
      specializations: ['Electronics Manufacturing', 'IT Services'],
      certifications: ['ISO 9001', 'ISO 14001'],
      establishedYear: 2010,
      contactEmail: 'info@techbdsolutions.com',
      website: 'https://www.techbdsolutions.com',
    },
  ],
};

// Support Services database by sector
const supportServicesDB: Record<string, SupportService[]> = {
  'Textile & Garments': [
    {
      id: 'service-tex-001',
      name: 'Textile Machinery Co.',
      category: 'machinery',
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.8103, lng: 90.4125 },
      },
      services: ['Machinery Supply', 'Installation'],
      certifications: ['ISO 9001'],
      clientTypes: ['Textile Mills', 'Garment Manufacturers'],
      contactEmail: 'info@textilemachinery.com',
      phone: '+8801712345678',
    },
    {
      id: 'service-tex-002',
      name: 'Laundry Services BD',
      category: 'laundry',
      location: {
        district: 'Gazipur',
        coordinates: { lat: 24.0022, lng: 90.4264 },
      },
      services: ['Laundry', 'Fabric Care'],
      certifications: ['ISO 9001'],
      clientTypes: ['Textile Mills', 'Garment Manufacturers'],
      contactEmail: 'info@laundryservices.com',
      phone: '+8801712345678',
    },
  ],
  
  'Pharmaceuticals': [
    {
      id: 'service-pharma-001',
      name: 'Pharma Compliance Services',
      category: 'compliance',
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.7925, lng: 90.4078 },
      },
      services: ['Regulatory Compliance', 'Quality Assurance'],
      certifications: ['ISO 9001'],
      clientTypes: ['Pharmaceutical Manufacturers'],
      contactEmail: 'info@pharmacyservices.com',
      phone: '+8801712345678',
    },
  ],
  
  'Technology & IT': [
    {
      id: 'service-tech-001',
      name: 'IT Consulting BD',
      category: 'consulting',
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.8103, lng: 90.4125 },
      },
      services: ['IT Consulting', 'System Integration'],
      certifications: ['ISO 9001'],
      clientTypes: ['Technology Companies'],
      contactEmail: 'info@itconsulting.com',
      phone: '+8801712345678',
    },
  ],
};

// Downstream Partners database by sector
const downstreamPartnersDB: Record<string, DownstreamPartner[]> = {
  'Textile & Garments': [
    {
      id: 'partner-tex-001',
      name: 'Global Buying House',
      type: 'buying-house',
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.8103, lng: 90.4125 },
      },
      services: ['Buying', 'Sourcing'],
      certifications: ['ISO 9001'],
      clientIndustries: ['Textile & Garments'],
      contactEmail: 'info@globalbuyinghouse.com',
      internationalOffices: ['USA', 'EU'],
    },
    {
      id: 'partner-tex-002',
      name: 'Freight Forwarders BD',
      type: 'freight-forwarder',
      location: {
        district: 'Gazipur',
        coordinates: { lat: 24.0022, lng: 90.4264 },
      },
      services: ['Freight Forwarding', 'Logistics'],
      certifications: ['ISO 9001'],
      clientIndustries: ['Textile & Garments'],
      contactEmail: 'info@freightforwarders.com',
      internationalOffices: ['USA', 'EU'],
    },
  ],
  
  'Pharmaceuticals': [
    {
      id: 'partner-pharma-001',
      name: 'Pharma QC Lab',
      type: 'qc-lab',
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.7925, lng: 90.4078 },
      },
      services: ['Quality Control', 'Testing'],
      certifications: ['ISO 9001'],
      clientIndustries: ['Pharmaceuticals'],
      contactEmail: 'info@pharmaqclab.com',
      internationalOffices: ['USA', 'EU'],
    },
  ],
  
  'Technology & IT': [
    {
      id: 'partner-tech-001',
      name: 'IT Support Services',
      type: 'support',
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.8103, lng: 90.4125 },
      },
      services: ['IT Support', 'Maintenance'],
      certifications: ['ISO 9001'],
      clientIndustries: ['Technology & IT'],
      contactEmail: 'info@itsupportservices.com',
      internationalOffices: ['USA', 'EU'],
    },
  ],
};

// Exporter database by sector
const exportersDB: Record<string, Exporter[]> = {
  'Textile & Garments': [
    {
      id: 'exp-tex-001',
      name: 'Apex Garments Export Ltd',
      sector: 'Textile & Garments',
      exportVolume: '$50M annually',
      destinations: ['USA', 'EU', 'Canada', 'Japan'],
      rating: 4.8,
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.8103, lng: 90.4125 },
      },
    },
    {
      id: 'exp-tex-002',
      name: 'Bengal Fashion Exports',
      sector: 'Textile & Garments',
      exportVolume: '$35M annually',
      destinations: ['UK', 'Germany', 'Spain', 'Australia'],
      rating: 4.6,
      location: {
        district: 'Gazipur',
        coordinates: { lat: 24.0022, lng: 90.4264 },
      },
    },
  ],
  
  'Pharmaceuticals': [
    {
      id: 'exp-pharma-001',
      name: 'Square Pharmaceuticals Export Division',
      sector: 'Pharmaceuticals',
      exportVolume: '$120M annually',
      destinations: ['USA', 'EU', 'Africa', 'Asia-Pacific'],
      rating: 5.0,
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.7925, lng: 90.4078 },
      },
    },
  ],
  
  'Technology & IT': [
    {
      id: 'exp-tech-001',
      name: 'TechBD Export Hub',
      sector: 'Technology & IT',
      exportVolume: '$25M annually',
      destinations: ['USA', 'UK', 'Singapore', 'UAE'],
      rating: 4.5,
      location: {
        district: 'Dhaka',
        coordinates: { lat: 23.8103, lng: 90.4125 },
      },
    },
  ],
};

// Trade lanes
const tradeLanesDB: Record<string, any[]> = {
  'Textile & Garments': [
    { from: 'Chittagong Seaport', to: 'Los Angeles', mode: 'sea', duration: '25 days' },
    { from: 'Chittagong Seaport', to: 'Hamburg', mode: 'sea', duration: '30 days' },
    { from: 'Chittagong Seaport', to: 'Singapore', mode: 'sea', duration: '12 days' },
    { from: 'Hazrat Shahjalal Intl Airport', to: 'London', mode: 'air', duration: '2 days' },
  ],
  
  'Pharmaceuticals': [
    { from: 'Hazrat Shahjalal Intl Airport', to: 'New York', mode: 'air', duration: '2 days' },
    { from: 'Chittagong Seaport', to: 'Rotterdam', mode: 'sea', duration: '28 days' },
    { from: 'Hazrat Shahjalal Intl Airport', to: 'Dubai', mode: 'air', duration: '1 day' },
  ],
  
  'Technology & IT': [
    { from: 'Hazrat Shahjalal Intl Airport', to: 'San Francisco', mode: 'air', duration: '3 days' },
    { from: 'Hazrat Shahjalal Intl Airport', to: 'Singapore', mode: 'air', duration: '1 day' },
  ],
  
  'Heavy Manufacturing': [
    { from: 'Chittagong Seaport', to: 'Mumbai', mode: 'sea', duration: '7 days' },
    { from: 'Mongla Seaport', to: 'Kolkata', mode: 'sea', duration: '3 days' },
    { from: 'Chittagong Seaport', to: 'Dubai', mode: 'sea', duration: '14 days' },
  ],
};

// PUBLIC API

export function getSupplyChainMap(sector: string): SupplyChainMap {
  const normalizedSector = normalizeSector(sector);
  
  return {
    sector: normalizedSector,
    suppliers: suppliersDB[normalizedSector] || [],
    peerCompanies: peerCompaniesDB[normalizedSector] || [],
    supportServices: supportServicesDB[normalizedSector] || [],
    downstreamPartners: downstreamPartnersDB[normalizedSector] || [],
    ports: portsDB,
    exporters: exportersDB[normalizedSector] || [],
    tradeLanes: tradeLanesDB[normalizedSector] || [],
  };
}

export function getAllPorts(): Port[] {
  return portsDB;
}

export function getPortsByType(type: Port['type']): Port[] {
  return portsDB.filter(port => port.type === type);
}

export function findNearestPort(lat: number, lng: number): Port {
  let nearest = portsDB[0];
  let minDistance = calculateDistance(lat, lng, nearest.location.coordinates.lat, nearest.location.coordinates.lng);
  
  for (const port of portsDB) {
    const distance = calculateDistance(lat, lng, port.location.coordinates.lat, port.location.coordinates.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = port;
    }
  }
  
  return nearest;
}

export function getSuppliersBySector(sector: string): Supplier[] {
  const normalized = normalizeSector(sector);
  return suppliersDB[normalized] || [];
}

export function searchSuppliers(query: string, sector?: string): Supplier[] {
  const queryLower = query.toLowerCase();
  const allSuppliers = sector
    ? suppliersDB[normalizeSector(sector)] || []
    : Object.values(suppliersDB).flat();
  
  return allSuppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(queryLower) ||
    supplier.products.some(p => p.toLowerCase().includes(queryLower)) ||
    supplier.type.toLowerCase().includes(queryLower)
  );
}

export function getExportersBySector(sector: string): Exporter[] {
  const normalized = normalizeSector(sector);
  return exportersDB[normalized] || [];
}

export function calculateSupplyChainCost(
  sector: string,
  productionVolume: number,
  exportDestination: string
): {
  supplierCost: number;
  logisticsCost: number;
  portFees: number;
  totalCost: number;
  recommendedPort: string;
  estimatedLeadTime: string;
} {
  const chain = getSupplyChainMap(sector);
  
  // Rough cost estimates (would be real data in production)
  const supplierCost = productionVolume * 0.6; // 60% of volume
  const logisticsCost = productionVolume * 0.15; // 15% of volume
  const portFees = productionVolume * 0.05; // 5% of volume
  
  // Find recommended port based on destination
  let recommendedPort = 'Chittagong Seaport'; // Default
  let estimatedLeadTime = '25-30 days';
  
  if (exportDestination.toLowerCase().includes('eu') || exportDestination.toLowerCase().includes('europe')) {
    recommendedPort = 'Chittagong Seaport';
    estimatedLeadTime = '28-32 days';
  } else if (exportDestination.toLowerCase().includes('usa') || exportDestination.toLowerCase().includes('america')) {
    recommendedPort = 'Chittagong Seaport';
    estimatedLeadTime = '25-30 days';
  } else if (exportDestination.toLowerCase().includes('asia') || exportDestination.toLowerCase().includes('singapore')) {
    recommendedPort = 'Chittagong Seaport';
    estimatedLeadTime = '10-15 days';
  }
  
  // For urgent/air shipments
  if (sector === 'Pharmaceuticals' || sector === 'Technology & IT') {
    recommendedPort = 'Hazrat Shahjalal International Airport';
    estimatedLeadTime = '2-3 days';
  }
  
  return {
    supplierCost,
    logisticsCost,
    portFees,
    totalCost: supplierCost + logisticsCost + portFees,
    recommendedPort,
    estimatedLeadTime,
  };
}

// Helper functions

function normalizeSector(sector: string): string {
  // Handle undefined/null/empty sector
  if (!sector) {
    return 'Technology & IT'; // Default sector
  }
  
  const sectorLower = sector.toLowerCase();
  
  if (sectorLower.includes('textile') || sectorLower.includes('garment') || sectorLower.includes('apparel')) {
    return 'Textile & Garments';
  }
  if (sectorLower.includes('pharma') || sectorLower.includes('medicine') || sectorLower.includes('drug')) {
    return 'Pharmaceuticals';
  }
  if (sectorLower.includes('tech') || sectorLower.includes('it') || sectorLower.includes('software') || sectorLower.includes('electronics')) {
    return 'Technology & IT';
  }
  if (sectorLower.includes('heavy') || sectorLower.includes('steel') || sectorLower.includes('manufacturing')) {
    return 'Heavy Manufacturing';
  }
  
  // Default to the sector as-is if no match
  return sector;
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getSupportedSectors(): string[] {
  return Object.keys(suppliersDB);
}

// 🆕 NEW: Clustering Analysis
export function calculateClusteringAnalysis(sector: string, yourLocation?: { lat: number; lng: number }): ClusteringAnalysis {
  const suppliers = getSuppliersBySector(sector);
  
  // Use Dhaka as default location
  const baseLocation = yourLocation || { lat: 23.8103, lng: 90.4125 };
  
  if (suppliers.length === 0) {
    return {
      proximityScore: 0,
      suppliersWithin50km: 0,
      totalSuppliers: 0,
      percentageWithin50km: 0,
      clusterStrength: 'Weak',
      averageDistance: 0,
      insights: ['No supplier data available for this sector.'],
    };
  }
  
  // Calculate distances
  const distances = suppliers.map(s => 
    calculateDistance(
      baseLocation.lat,
      baseLocation.lng,
      s.location.coordinates.lat,
      s.location.coordinates.lng
    )
  );
  
  const suppliersWithin50km = distances.filter(d => d <= 50).length;
  const percentageWithin50km = (suppliersWithin50km / suppliers.length) * 100;
  const averageDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
  
  // Determine cluster strength
  let clusterStrength: 'Weak' | 'Moderate' | 'Strong' | 'Excellent';
  let proximityScore: number;
  
  if (percentageWithin50km >= 80) {
    clusterStrength = 'Excellent';
    proximityScore = 95;
  } else if (percentageWithin50km >= 60) {
    clusterStrength = 'Strong';
    proximityScore = 80;
  } else if (percentageWithin50km >= 40) {
    clusterStrength = 'Moderate';
    proximityScore = 60;
  } else {
    clusterStrength = 'Weak';
    proximityScore = 35;
  }
  
  // Generate insights
  const insights: string[] = [];
  
  if (clusterStrength === 'Excellent' || clusterStrength === 'Strong') {
    insights.push(`✅ Strong industrial cluster with ${percentageWithin50km.toFixed(0)}% of suppliers within 50km`);
    insights.push(`✅ Reduced logistics costs due to supplier proximity`);
    insights.push(`✅ Faster lead times and just-in-time delivery possible`);
  } else if (clusterStrength === 'Moderate') {
    insights.push(`⚠️ Moderate cluster effect - ${percentageWithin50km.toFixed(0)}% of suppliers within 50km`);
    insights.push(`⚠️ Some logistics planning required for distant suppliers`);
  } else {
    insights.push(`❌ Weak clustering - only ${percentageWithin50km.toFixed(0)}% of suppliers within 50km`);
    insights.push(`❌ Higher logistics costs expected`);
    insights.push(`💡 Consider locating near key supplier hubs`);
  }
  
  if (averageDistance < 30) {
    insights.push(`✅ Average supplier distance is ${averageDistance.toFixed(0)}km - excellent accessibility`);
  } else if (averageDistance < 80) {
    insights.push(`⚠️ Average supplier distance is ${averageDistance.toFixed(0)}km - acceptable`);
  } else {
    insights.push(`❌ Average supplier distance is ${averageDistance.toFixed(0)}km - challenging logistics`);
  }
  
  return {
    proximityScore,
    suppliersWithin50km,
    totalSuppliers: suppliers.length,
    percentageWithin50km,
    clusterStrength,
    averageDistance,
    insights,
  };
}

// 🆕 NEW: Gap Analysis
export function calculateGapAnalysis(sector: string): GapAnalysis {
  const chain = getSupplyChainMap(sector);
  
  const requiredCategories = [
    'Raw Materials',
    'Components',
    'Services',
    'Logistics',
    'Support Services',
    'Quality Control',
    'Compliance',
    'Export Partners',
  ];
  
  const presentCategories: string[] = [];
  const missingCategories: string[] = [];
  const importRequired: string[] = [];
  const strengths: string[] = [];
  const gaps: string[] = [];
  const recommendations: string[] = [];
  
  // Check suppliers
  const hasRawMaterial = chain.suppliers.some(s => s.type === 'raw-material');
  const hasComponents = chain.suppliers.some(s => s.type === 'component');
  const hasServices = chain.suppliers.some(s => s.type === 'service');
  const hasLogistics = chain.suppliers.some(s => s.type === 'logistics');
  
  if (hasRawMaterial) presentCategories.push('Raw Materials');
  else missingCategories.push('Raw Materials');
  
  if (hasComponents) presentCategories.push('Components');
  else missingCategories.push('Components');
  
  if (hasServices) presentCategories.push('Services');
  else missingCategories.push('Services');
  
  if (hasLogistics) presentCategories.push('Logistics');
  else missingCategories.push('Logistics');
  
  // Check support services
  if (chain.supportServices.length === 0) {
    recommendations.push('Engage with BIDA to attract machinery and service providers to the sector');
  }
  
  // Check downstream partners
  const hasQC = chain.downstreamPartners.some(p => p.type === 'qc-lab');
  const hasBuyingHouse = chain.downstreamPartners.some(p => p.type === 'buying-house');
  const hasFreightForwarder = chain.downstreamPartners.some(p => p.type === 'freight-forwarder');
  
  if (hasQC) presentCategories.push('Quality Control');
  else {
    missingCategories.push('Quality Control');
    gaps.push('Limited QC/testing facilities available');
    recommendations.push('Partner with international certification labs for quality assurance');
  }
  
  if (chain.exporters.length === 0) {
    recommendations.push('Establish direct export capabilities or partner with existing exporters');
  }
  
  // Analyze strengths
  if (chain.suppliers.length >= 3) {
    strengths.push(`✅ ${chain.suppliers.length} local suppliers available - strong supply base`);
  } else if (chain.suppliers.length > 0) {
    strengths.push(`⚠️ ${chain.suppliers.length} local suppliers - limited options`);
  }
  
  if (chain.peerCompanies.length > 0) {
    strengths.push(`✅ ${chain.peerCompanies.length} peer companies in sector - networking opportunities`);
  }
  
  if (chain.downstreamPartners.length >= 2) {
    strengths.push(`✅ ${chain.downstreamPartners.length} downstream partners - complete export ecosystem`);
  } else if (chain.downstreamPartners.length === 0) {
    gaps.push('No local buying houses or freight forwarders identified');
    importRequired.push('International logistics partners');
    recommendations.push('Establish relationships with global freight forwarders');
  }
  
  if (hasFreightForwarder && hasBuyingHouse) {
    strengths.push('✅ Complete export supply chain with buying houses and logistics');
  }
  
  // Sector-specific gap analysis
  if (sector === 'Textile & Garments') {
    if (!chain.suppliers.some(s => s.products.some(p => p.toLowerCase().includes('button')))) {
      gaps.push('Specialized accessories suppliers may be limited');
      importRequired.push('Specialized buttons/trims');
    }
  }
  
  if (sector === 'Pharmaceuticals') {
    if (!chain.suppliers.some(s => s.certifications.includes('US FDA'))) {
      gaps.push('Limited FDA-certified suppliers');
      importRequired.push('FDA-approved raw materials');
      recommendations.push('Seek WHO-GMP or US FDA certified local suppliers');
    }
  }
  
  if (sector === 'Technology & IT') {
    if (!chain.suppliers.some(s => s.products.some(p => p.toLowerCase().includes('semiconductor')))) {
      gaps.push('Advanced semiconductor components not locally available');
      importRequired.push('Semiconductors and advanced electronics');
      recommendations.push('Establish import channels with Taiwan/China/Korea suppliers');
    }
  }
  
  // Calculate completeness score
  const completenessScore = (presentCategories.length / requiredCategories.length) * 100;
  
  // Add general recommendations
  if (completenessScore < 60) {
    recommendations.push('Consider vertical integration or strategic partnerships to fill supply chain gaps');
  }
  if (missingCategories.includes('Support Services')) {
    recommendations.push('Engage with BIDA to attract machinery and service providers to the sector');
  }
  if (chain.exporters.length === 0) {
    recommendations.push('Establish direct export capabilities or partner with existing exporters');
  }
  
  return {
    missingCategories,
    importRequired,
    completenessScore,
    strengths,
    gaps,
    recommendations,
  };
}