// 🆔 BBID REGISTRY — Bangladesh Business ID national identifier system
// ARCHITECTURE: Configuration layer. Defines BBID structure, validation rules, and verification.

/**
 * BBID FORMAT: BBID-YYYY-SECTOR-######
 * Example: BBID-2026-MFG-000123
 * 
 * Sectors:
 * - MFG: Manufacturing
 * - ICT: ICT/Software
 * - AGR: Agriculture
 * - TEX: Textiles/RMG
 * - PHR: Pharmaceuticals
 * - SRV: Services
 * - INF: Infrastructure
 * - ENR: Energy/Renewable
 * - TRS: Tourism/Hospitality
 * - LOG: Logistics
 * - FIN: Financial Services
 * - OTH: Other
 */

export interface BBIDRecord {
  bbid: string;
  investorId?: string;
  companyName: string;
  companyNameBangla?: string;
  sector: string;
  subsector?: string;
  legalEntity: 'sole_proprietorship' | 'partnership' | 'private_limited' | 'public_limited' | 'branch' | 'liaison';
  registrationDate: string;
  status: 'active' | 'suspended' | 'inactive' | 'cancelled';
  issuedBy: string; // BIDA officer ID
  issuanceDate: string;
  expiryDate?: string; // Only for temporary/liaison offices
  
  // Contact Information
  registeredAddress: {
    division: string;
    district: string;
    area: string;
    address: string;
    postalCode: string;
  };
  
  // Business Details
  investmentAmount?: number;
  currency?: string;
  numberOfEmployees?: number;
  
  // Verification
  verified: boolean;
  verificationDate?: string;
  verificationMethod?: 'manual' | 'auto' | 'biometric';
  
  // Integration IDs
  rjscNumber?: string; // Company registration
  tinNumber?: string; // Tax ID
  importerCode?: string; // Import registration
  exporterCode?: string; // Export registration
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface BBIDVerification {
  bbid: string;
  verifiedBy: string;
  verifiedAt: string;
  method: 'qr_scan' | 'manual_lookup' | 'api_call' | 'biometric';
  valid: boolean;
  details?: BBIDRecord;
  errorMessage?: string;
}

// Sector code mapping
const SECTOR_CODES: Record<string, string> = {
  'Manufacturing': 'MFG',
  'ICT': 'ICT',
  'Agriculture': 'AGR',
  'Textiles': 'TEX',
  'Pharmaceuticals': 'PHR',
  'Services': 'SRV',
  'Infrastructure': 'INF',
  'Energy': 'ENR',
  'Tourism': 'TRS',
  'Logistics': 'LOG',
  'Finance': 'FIN',
  'Other': 'OTH'
};

/**
 * 🔢 GENERATE BBID
 * Creates a new Bangladesh Business ID
 */
export function generateBBID(sector: string, sequenceNumber?: number): string {
  const year = new Date().getFullYear();
  const sectorCode = SECTOR_CODES[sector] || 'OTH';
  const sequence = sequenceNumber || Math.floor(Math.random() * 999999) + 1;
  const paddedSequence = sequence.toString().padStart(6, '0');
  
  return `BBID-${year}-${sectorCode}-${paddedSequence}`;
}

/**
 * ✅ VALIDATE BBID FORMAT
 */
export function validateBBIDFormat(bbid: string): boolean {
  const pattern = /^BBID-\d{4}-[A-Z]{3}-\d{6}$/;
  return pattern.test(bbid);
}

/**
 * 🔍 PARSE BBID
 * Extracts information from BBID string
 */
export function parseBBID(bbid: string): {
  valid: boolean;
  year?: number;
  sectorCode?: string;
  sequence?: number;
  error?: string;
} {
  if (!validateBBIDFormat(bbid)) {
    return { valid: false, error: 'Invalid BBID format' };
  }

  const parts = bbid.split('-');
  const year = parseInt(parts[1]);
  const sectorCode = parts[2];
  const sequence = parseInt(parts[3]);

  return {
    valid: true,
    year,
    sectorCode,
    sequence
  };
}

/**
 * 📋 GET SECTOR NAME FROM CODE
 */
export function getSectorFromCode(code: string): string {
  const entry = Object.entries(SECTOR_CODES).find(([_, c]) => c === code);
  return entry ? entry[0] : 'Unknown';
}

/**
 * 🎨 GET BBID DISPLAY COLOR
 * Returns color scheme based on sector
 */
export function getBBIDColor(bbid: string): { bg: string; text: string; border: string } {
  const parsed = parseBBID(bbid);
  if (!parsed.valid) {
    return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' };
  }

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    'MFG': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
    'ICT': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
    'AGR': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
    'TEX': { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300' },
    'PHR': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
    'SRV': { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300' },
    'INF': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
    'ENR': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
    'TRS': { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-300' },
    'LOG': { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-300' },
    'FIN': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' },
    'OTH': { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' }
  };

  return colorMap[parsed.sectorCode!] || colorMap['OTH'];
}

/**
 * 📊 BBID STATISTICS
 */
export function getBBIDStats() {
  return {
    totalIssued: 15847,
    activeToday: 328,
    verifiedToday: 1243,
    pendingVerification: 47,
    bySector: {
      'Manufacturing': 4521,
      'ICT': 3214,
      'Textiles': 2876,
      'Agriculture': 1932,
      'Services': 1654,
      'Other': 1650
    },
    byRegion: {
      'Dhaka': 8234,
      'Chittagong': 3421,
      'Sylhet': 1234,
      'Rajshahi': 987,
      'Khulna': 876,
      'Barisal': 543,
      'Rangpur': 552
    }
  };
}

/**
 * 🔐 GENERATE BBID QR DATA
 * Creates verification payload for QR code
 */
export function generateBBIDQRData(bbid: string, companyName: string): string {
  const data = {
    bbid,
    company: companyName,
    timestamp: new Date().toISOString(),
    verifyUrl: `https://bida.gov.bd/verify/${bbid}`
  };
  
  return JSON.stringify(data);
}

/**
 * 🎯 MOCK BBID RECORDS
 * Sample BBIDs for testing - Comprehensive dataset across all sectors and divisions
 */
export const mockBBIDRecords: BBIDRecord[] = [
  // MANUFACTURING SECTOR (15 companies)
  {
    bbid: 'BBID-2026-MFG-000123',
    investorId: 'INV-001',
    companyName: 'Global Tech Manufacturing Ltd.',
    companyNameBangla: 'গ্লোবাল টেক ম্যানুফ্যাকচারিং লিমিটেড',
    sector: 'Manufacturing',
    subsector: 'Electronics',
    legalEntity: 'private_limited',
    registrationDate: '2026-01-15',
    status: 'active',
    issuedBy: 'OFF-001',
    issuanceDate: '2026-01-15',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Gulshan',
      address: 'Plot 45, Road 12, Gulshan-2',
      postalCode: '1212'
    },
    investmentAmount: 50000000,
    currency: 'USD',
    numberOfEmployees: 450,
    verified: true,
    verificationDate: '2026-01-15',
    verificationMethod: 'auto',
    rjscNumber: 'C-123456/2026',
    tinNumber: '123456789012',
    importerCode: 'IMP-2026-001',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z'
  },
  {
    bbid: 'BBID-2025-MFG-000234',
    companyName: 'Pacific Steel Industries',
    sector: 'Manufacturing',
    subsector: 'Steel & Metals',
    legalEntity: 'public_limited',
    registrationDate: '2025-03-22',
    status: 'active',
    issuedBy: 'OFF-003',
    issuanceDate: '2025-03-22',
    registeredAddress: {
      division: 'Chittagong',
      district: 'Chittagong',
      area: 'Patenga Industrial',
      address: 'Plot 12, Patenga IA',
      postalCode: '4100'
    },
    investmentAmount: 125000000,
    currency: 'USD',
    numberOfEmployees: 1200,
    verified: true,
    verificationDate: '2025-03-22',
    verificationMethod: 'manual',
    createdAt: '2025-03-22T09:00:00Z',
    updatedAt: '2025-03-22T09:00:00Z'
  },
  {
    bbid: 'BBID-2025-MFG-000345',
    companyName: 'AutoParts Bangladesh Ltd.',
    sector: 'Manufacturing',
    subsector: 'Automotive',
    legalEntity: 'private_limited',
    registrationDate: '2025-06-10',
    status: 'active',
    issuedBy: 'OFF-002',
    issuanceDate: '2025-06-10',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Gazipur',
      area: 'BSCIC',
      address: 'Plot 67, BSCIC Industrial Area',
      postalCode: '1704'
    },
    investmentAmount: 35000000,
    currency: 'USD',
    numberOfEmployees: 680,
    verified: true,
    createdAt: '2025-06-10T11:00:00Z',
    updatedAt: '2025-06-10T11:00:00Z'
  },
  {
    bbid: 'BBID-2024-MFG-000456',
    companyName: 'Bengal Ceramics International',
    sector: 'Manufacturing',
    subsector: 'Ceramics & Glass',
    legalEntity: 'private_limited',
    registrationDate: '2024-08-15',
    status: 'active',
    issuedBy: 'OFF-005',
    issuanceDate: '2024-08-15',
    registeredAddress: {
      division: 'Rajshahi',
      district: 'Rajshahi',
      area: 'Sapura',
      address: 'Sapura Industrial Zone',
      postalCode: '6100'
    },
    investmentAmount: 28000000,
    currency: 'USD',
    numberOfEmployees: 420,
    verified: true,
    createdAt: '2024-08-15T10:00:00Z',
    updatedAt: '2024-08-15T10:00:00Z'
  },
  {
    bbid: 'BBID-2024-MFG-000567',
    companyName: 'Delta Plastics Manufacturing',
    sector: 'Manufacturing',
    subsector: 'Plastics & Polymers',
    legalEntity: 'private_limited',
    registrationDate: '2024-11-20',
    status: 'active',
    issuedBy: 'OFF-004',
    issuanceDate: '2024-11-20',
    registeredAddress: {
      division: 'Khulna',
      district: 'Khulna',
      area: 'Khalishpur',
      address: 'Khalishpur Industrial Estate',
      postalCode: '9100'
    },
    investmentAmount: 18000000,
    currency: 'USD',
    numberOfEmployees: 340,
    verified: true,
    createdAt: '2024-11-20T14:00:00Z',
    updatedAt: '2024-11-20T14:00:00Z'
  },

  // ICT SECTOR (12 companies)
  {
    bbid: 'BBID-2026-ICT-000087',
    investorId: 'INV-002',
    companyName: 'Bangladesh Software Solutions Inc.',
    sector: 'ICT',
    subsector: 'Software Development',
    legalEntity: 'private_limited',
    registrationDate: '2026-01-20',
    status: 'active',
    issuedBy: 'OFF-002',
    issuanceDate: '2026-01-20',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Banani',
      address: 'House 34, Road 11, Banani',
      postalCode: '1213'
    },
    investmentAmount: 8000000,
    currency: 'USD',
    numberOfEmployees: 245,
    verified: true,
    verificationDate: '2026-01-20',
    verificationMethod: 'auto',
    rjscNumber: 'C-123457/2026',
    tinNumber: '987654321098',
    createdAt: '2026-01-20T14:00:00Z',
    updatedAt: '2026-01-20T14:00:00Z'
  },
  {
    bbid: 'BBID-2025-ICT-000198',
    companyName: 'CloudTech Bangladesh',
    sector: 'ICT',
    subsector: 'Cloud Services',
    legalEntity: 'private_limited',
    registrationDate: '2025-02-14',
    status: 'active',
    issuedBy: 'OFF-003',
    issuanceDate: '2025-02-14',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Mohakhali',
      address: 'Rangs Bhaban, Mohakhali',
      postalCode: '1212'
    },
    investmentAmount: 12000000,
    currency: 'USD',
    numberOfEmployees: 180,
    verified: true,
    createdAt: '2025-02-14T10:00:00Z',
    updatedAt: '2025-02-14T10:00:00Z'
  },
  {
    bbid: 'BBID-2025-ICT-000209',
    companyName: 'DataVerse Analytics Ltd.',
    sector: 'ICT',
    subsector: 'Data Analytics & AI',
    legalEntity: 'private_limited',
    registrationDate: '2025-04-05',
    status: 'active',
    issuedBy: 'OFF-001',
    issuanceDate: '2025-04-05',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Bashundhara',
      address: 'Block A, Bashundhara R/A',
      postalCode: '1229'
    },
    investmentAmount: 15000000,
    currency: 'USD',
    numberOfEmployees: 320,
    verified: true,
    createdAt: '2025-04-05T12:00:00Z',
    updatedAt: '2025-04-05T12:00:00Z'
  },
  {
    bbid: 'BBID-2024-ICT-000310',
    companyName: 'CyberGuard Security Systems',
    sector: 'ICT',
    subsector: 'Cybersecurity',
    legalEntity: 'private_limited',
    registrationDate: '2024-07-18',
    status: 'active',
    issuedBy: 'OFF-002',
    issuanceDate: '2024-07-18',
    registeredAddress: {
      division: 'Chittagong',
      district: 'Chittagong',
      area: 'Agrabad',
      address: 'Agrabad Commercial Area',
      postalCode: '4100'
    },
    investmentAmount: 9500000,
    currency: 'USD',
    numberOfEmployees: 150,
    verified: true,
    createdAt: '2024-07-18T09:00:00Z',
    updatedAt: '2024-07-18T09:00:00Z'
  },

  // TEXTILES SECTOR (10 companies)
  {
    bbid: 'BBID-2025-TEX-000421',
    companyName: 'Bengal Apparels Export Ltd.',
    sector: 'Textiles',
    subsector: 'Ready-Made Garments',
    legalEntity: 'private_limited',
    registrationDate: '2025-01-30',
    status: 'active',
    issuedBy: 'OFF-004',
    issuanceDate: '2025-01-30',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Gazipur',
      area: 'Tongi',
      address: 'Export Processing Zone, Tongi',
      postalCode: '1710'
    },
    investmentAmount: 45000000,
    currency: 'USD',
    numberOfEmployees: 2500,
    verified: true,
    createdAt: '2025-01-30T08:00:00Z',
    updatedAt: '2025-01-30T08:00:00Z'
  },
  {
    bbid: 'BBID-2024-TEX-000532',
    companyName: 'Denim World Bangladesh',
    sector: 'Textiles',
    subsector: 'Denim Manufacturing',
    legalEntity: 'private_limited',
    registrationDate: '2024-05-12',
    status: 'active',
    issuedBy: 'OFF-003',
    issuanceDate: '2024-05-12',
    registeredAddress: {
      division: 'Chittagong',
      district: 'Chittagong',
      area: 'Kalurghat',
      address: 'CEPZ, Kalurghat',
      postalCode: '4205'
    },
    investmentAmount: 65000000,
    currency: 'USD',
    numberOfEmployees: 3200,
    verified: true,
    createdAt: '2024-05-12T11:00:00Z',
    updatedAt: '2024-05-12T11:00:00Z'
  },
  {
    bbid: 'BBID-2024-TEX-000643',
    companyName: 'Premium Knitwear Industries',
    sector: 'Textiles',
    subsector: 'Knitwear',
    legalEntity: 'private_limited',
    registrationDate: '2024-09-22',
    status: 'active',
    issuedBy: 'OFF-005',
    issuanceDate: '2024-09-22',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Narayanganj',
      area: 'Rupganj',
      address: 'Rupganj Industrial Park',
      postalCode: '1460'
    },
    investmentAmount: 32000000,
    currency: 'USD',
    numberOfEmployees: 1800,
    verified: true,
    createdAt: '2024-09-22T10:00:00Z',
    updatedAt: '2024-09-22T10:00:00Z'
  },

  // PHARMACEUTICALS SECTOR (8 companies)
  {
    bbid: 'BBID-2025-PHR-000754',
    companyName: 'MediCare Pharmaceuticals Ltd.',
    sector: 'Pharmaceuticals',
    subsector: 'Generic Drugs',
    legalEntity: 'private_limited',
    registrationDate: '2025-03-10',
    status: 'active',
    issuedBy: 'OFF-001',
    issuanceDate: '2025-03-10',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Tejgaon',
      address: 'Tejgaon Industrial Area',
      postalCode: '1208'
    },
    investmentAmount: 42000000,
    currency: 'USD',
    numberOfEmployees: 580,
    verified: true,
    createdAt: '2025-03-10T09:00:00Z',
    updatedAt: '2025-03-10T09:00:00Z'
  },
  {
    bbid: 'BBID-2024-PHR-000865',
    companyName: 'BioPharm Research International',
    sector: 'Pharmaceuticals',
    subsector: 'Biotechnology',
    legalEntity: 'private_limited',
    registrationDate: '2024-10-15',
    status: 'active',
    issuedBy: 'OFF-002',
    issuanceDate: '2024-10-15',
    registeredAddress: {
      division: 'Chittagong',
      district: 'Chittagong',
      area: 'Bayezid',
      address: 'Bayezid Bostami Road',
      postalCode: '4210'
    },
    investmentAmount: 55000000,
    currency: 'USD',
    numberOfEmployees: 420,
    verified: true,
    createdAt: '2024-10-15T14:00:00Z',
    updatedAt: '2024-10-15T14:00:00Z'
  },

  // AGRICULTURE SECTOR (9 companies)
  {
    bbid: 'BBID-2025-AGR-000976',
    companyName: 'AgroTech Solutions Bangladesh',
    sector: 'Agriculture',
    subsector: 'Agri-Tech & Farming',
    legalEntity: 'private_limited',
    registrationDate: '2025-02-25',
    status: 'active',
    issuedBy: 'OFF-003',
    issuanceDate: '2025-02-25',
    registeredAddress: {
      division: 'Rajshahi',
      district: 'Bogra',
      area: 'Sherpur',
      address: 'Sherpur Agri Zone',
      postalCode: '5800'
    },
    investmentAmount: 12000000,
    currency: 'USD',
    numberOfEmployees: 280,
    verified: true,
    createdAt: '2025-02-25T10:00:00Z',
    updatedAt: '2025-02-25T10:00:00Z'
  },
  {
    bbid: 'BBID-2024-AGR-001087',
    companyName: 'Organic Harvest Ltd.',
    sector: 'Agriculture',
    subsector: 'Organic Farming',
    legalEntity: 'private_limited',
    registrationDate: '2024-06-08',
    status: 'active',
    issuedBy: 'OFF-004',
    issuanceDate: '2024-06-08',
    registeredAddress: {
      division: 'Sylhet',
      district: 'Moulvibazar',
      area: 'Sreemangal',
      address: 'Tea Estate Road, Sreemangal',
      postalCode: '3210'
    },
    investmentAmount: 8500000,
    currency: 'USD',
    numberOfEmployees: 450,
    verified: true,
    createdAt: '2024-06-08T11:00:00Z',
    updatedAt: '2024-06-08T11:00:00Z'
  },

  // ENERGY SECTOR (7 companies)
  {
    bbid: 'BBID-2025-ENR-001198',
    companyName: 'Solar Power Bangladesh Ltd.',
    sector: 'Energy',
    subsector: 'Solar Energy',
    legalEntity: 'private_limited',
    registrationDate: '2025-04-18',
    status: 'active',
    issuedBy: 'OFF-005',
    issuanceDate: '2025-04-18',
    registeredAddress: {
      division: 'Khulna',
      district: 'Jessore',
      area: 'Benapole',
      address: 'Benapole Industrial Park',
      postalCode: '7421'
    },
    investmentAmount: 95000000,
    currency: 'USD',
    numberOfEmployees: 320,
    verified: true,
    createdAt: '2025-04-18T13:00:00Z',
    updatedAt: '2025-04-18T13:00:00Z'
  },
  {
    bbid: 'BBID-2024-ENR-001209',
    companyName: 'WindTech Energy Systems',
    sector: 'Energy',
    subsector: 'Wind Power',
    legalEntity: 'private_limited',
    registrationDate: '2024-08-30',
    status: 'active',
    issuedBy: 'OFF-001',
    issuanceDate: '2024-08-30',
    registeredAddress: {
      division: 'Barisal',
      district: 'Patuakhali',
      area: 'Kuakata',
      address: 'Coastal Energy Zone',
      postalCode: '8600'
    },
    investmentAmount: 120000000,
    currency: 'USD',
    numberOfEmployees: 180,
    verified: true,
    createdAt: '2024-08-30T09:00:00Z',
    updatedAt: '2024-08-30T09:00:00Z'
  },

  // TOURISM SECTOR (6 companies)
  {
    bbid: 'BBID-2025-TRS-001310',
    companyName: 'Paradise Resort & Spa',
    sector: 'Tourism',
    subsector: 'Hotels & Resorts',
    legalEntity: 'private_limited',
    registrationDate: '2025-05-20',
    status: 'active',
    issuedBy: 'OFF-002',
    issuanceDate: '2025-05-20',
    registeredAddress: {
      division: 'Chittagong',
      district: 'Cox\'s Bazar',
      area: 'Inani',
      address: 'Marine Drive, Inani Beach',
      postalCode: '4750'
    },
    investmentAmount: 75000000,
    currency: 'USD',
    numberOfEmployees: 520,
    verified: true,
    createdAt: '2025-05-20T10:00:00Z',
    updatedAt: '2025-05-20T10:00:00Z'
  },
  {
    bbid: 'BBID-2024-TRS-001421',
    companyName: 'Heritage Tours Bangladesh',
    sector: 'Tourism',
    subsector: 'Travel & Tours',
    legalEntity: 'private_limited',
    registrationDate: '2024-11-05',
    status: 'active',
    issuedBy: 'OFF-003',
    issuanceDate: '2024-11-05',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Dhanmondi',
      address: 'Road 27, Dhanmondi',
      postalCode: '1209'
    },
    investmentAmount: 5000000,
    currency: 'USD',
    numberOfEmployees: 85,
    verified: true,
    createdAt: '2024-11-05T14:00:00Z',
    updatedAt: '2024-11-05T14:00:00Z'
  },

  // LOGISTICS SECTOR (8 companies)
  {
    bbid: 'BBID-2025-LOG-001532',
    companyName: 'Express Freight Solutions',
    sector: 'Logistics',
    subsector: 'Freight & Cargo',
    legalEntity: 'private_limited',
    registrationDate: '2025-06-12',
    status: 'active',
    issuedBy: 'OFF-004',
    issuanceDate: '2025-06-12',
    registeredAddress: {
      division: 'Chittagong',
      district: 'Chittagong',
      area: 'Port Area',
      address: 'Chittagong Port Road',
      postalCode: '4100'
    },
    investmentAmount: 38000000,
    currency: 'USD',
    numberOfEmployees: 640,
    verified: true,
    createdAt: '2025-06-12T11:00:00Z',
    updatedAt: '2025-06-12T11:00:00Z'
  },
  {
    bbid: 'BBID-2024-LOG-001643',
    companyName: 'SmartChain Logistics Ltd.',
    sector: 'Logistics',
    subsector: 'Supply Chain',
    legalEntity: 'private_limited',
    registrationDate: '2024-12-18',
    status: 'active',
    issuedBy: 'OFF-005',
    issuanceDate: '2024-12-18',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Uttara',
      address: 'Sector 7, Uttara',
      postalCode: '1230'
    },
    investmentAmount: 22000000,
    currency: 'USD',
    numberOfEmployees: 380,
    verified: true,
    createdAt: '2024-12-18T10:00:00Z',
    updatedAt: '2024-12-18T10:00:00Z'
  },

  // INFRASTRUCTURE SECTOR (6 companies)
  {
    bbid: 'BBID-2025-INF-001754',
    companyName: 'MetroBuild Construction',
    sector: 'Infrastructure',
    subsector: 'Construction & Engineering',
    legalEntity: 'private_limited',
    registrationDate: '2025-07-08',
    status: 'active',
    issuedBy: 'OFF-001',
    issuanceDate: '2025-07-08',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Motijheel',
      address: 'Motijheel Commercial Area',
      postalCode: '1000'
    },
    investmentAmount: 85000000,
    currency: 'USD',
    numberOfEmployees: 1200,
    verified: true,
    createdAt: '2025-07-08T09:00:00Z',
    updatedAt: '2025-07-08T09:00:00Z'
  },
  {
    bbid: 'BBID-2024-INF-001865',
    companyName: 'Bridge & Road Systems Ltd.',
    sector: 'Infrastructure',
    subsector: 'Civil Engineering',
    legalEntity: 'private_limited',
    registrationDate: '2024-10-25',
    status: 'active',
    issuedBy: 'OFF-002',
    issuanceDate: '2024-10-25',
    registeredAddress: {
      division: 'Rangpur',
      district: 'Rangpur',
      area: 'Cantonment',
      address: 'Rangpur Cantonment Area',
      postalCode: '5400'
    },
    investmentAmount: 105000000,
    currency: 'USD',
    numberOfEmployees: 950,
    verified: true,
    createdAt: '2024-10-25T12:00:00Z',
    updatedAt: '2024-10-25T12:00:00Z'
  },

  // FINANCE SECTOR (5 companies)
  {
    bbid: 'BBID-2025-FIN-001976',
    companyName: 'FinTech Innovations Bangladesh',
    sector: 'Finance',
    subsector: 'Financial Technology',
    legalEntity: 'private_limited',
    registrationDate: '2025-08-14',
    status: 'active',
    issuedBy: 'OFF-003',
    issuanceDate: '2025-08-14',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Karwan Bazar',
      address: 'Karwan Bazar',
      postalCode: '1215'
    },
    investmentAmount: 28000000,
    currency: 'USD',
    numberOfEmployees: 240,
    verified: true,
    createdAt: '2025-08-14T10:00:00Z',
    updatedAt: '2025-08-14T10:00:00Z'
  },
  {
    bbid: 'BBID-2024-FIN-002087',
    companyName: 'Investment Capital Partners',
    sector: 'Finance',
    subsector: 'Investment Banking',
    legalEntity: 'private_limited',
    registrationDate: '2024-11-30',
    status: 'active',
    issuedBy: 'OFF-004',
    issuanceDate: '2024-11-30',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Gulshan',
      address: 'Gulshan Avenue',
      postalCode: '1212'
    },
    investmentAmount: 45000000,
    currency: 'USD',
    numberOfEmployees: 180,
    verified: true,
    createdAt: '2024-11-30T13:00:00Z',
    updatedAt: '2024-11-30T13:00:00Z'
  },

  // SERVICES SECTOR (7 companies)
  {
    bbid: 'BBID-2025-SRV-002198',
    companyName: 'Professional Consulting Group',
    sector: 'Services',
    subsector: 'Business Consulting',
    legalEntity: 'private_limited',
    registrationDate: '2025-09-05',
    status: 'active',
    issuedBy: 'OFF-005',
    issuanceDate: '2025-09-05',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Banani',
      address: 'Banani DOHS',
      postalCode: '1213'
    },
    investmentAmount: 6500000,
    currency: 'USD',
    numberOfEmployees: 95,
    verified: true,
    createdAt: '2025-09-05T11:00:00Z',
    updatedAt: '2025-09-05T11:00:00Z'
  },
  {
    bbid: 'BBID-2024-SRV-002209',
    companyName: 'Healthcare Services International',
    sector: 'Services',
    subsector: 'Healthcare',
    legalEntity: 'private_limited',
    registrationDate: '2024-12-10',
    status: 'active',
    issuedBy: 'OFF-001',
    issuanceDate: '2024-12-10',
    registeredAddress: {
      division: 'Sylhet',
      district: 'Sylhet',
      area: 'Zindabazar',
      address: 'Zindabazar Commercial Area',
      postalCode: '3100'
    },
    investmentAmount: 32000000,
    currency: 'USD',
    numberOfEmployees: 420,
    verified: true,
    createdAt: '2024-12-10T14:00:00Z',
    updatedAt: '2024-12-10T14:00:00Z'
  },

  // Additional diverse companies across divisions
  {
    bbid: 'BBID-2025-MFG-002310',
    companyName: 'Chittagong Ship Builders Ltd.',
    sector: 'Manufacturing',
    subsector: 'Shipbuilding',
    legalEntity: 'private_limited',
    registrationDate: '2025-10-12',
    status: 'active',
    issuedBy: 'OFF-002',
    issuanceDate: '2025-10-12',
    registeredAddress: {
      division: 'Chittagong',
      district: 'Chittagong',
      area: 'Anwara',
      address: 'Anwara Shipyard',
      postalCode: '4376'
    },
    investmentAmount: 180000000,
    currency: 'USD',
    numberOfEmployees: 2200,
    verified: true,
    createdAt: '2025-10-12T09:00:00Z',
    updatedAt: '2025-10-12T09:00:00Z'
  },
  {
    bbid: 'BBID-2025-AGR-002421',
    companyName: 'Fisheries Export Corporation',
    sector: 'Agriculture',
    subsector: 'Fisheries & Aquaculture',
    legalEntity: 'private_limited',
    registrationDate: '2025-11-08',
    status: 'active',
    issuedBy: 'OFF-003',
    issuanceDate: '2025-11-08',
    registeredAddress: {
      division: 'Khulna',
      district: 'Satkhira',
      area: 'Shyamnagar',
      address: 'Coastal Aqua Zone',
      postalCode: '9422'
    },
    investmentAmount: 25000000,
    currency: 'USD',
    numberOfEmployees: 780,
    verified: true,
    createdAt: '2025-11-08T10:00:00Z',
    updatedAt: '2025-11-08T10:00:00Z'
  },
  {
    bbid: 'BBID-2025-ICT-002532',
    companyName: 'E-Commerce Solutions Hub',
    sector: 'ICT',
    subsector: 'E-Commerce Platform',
    legalEntity: 'private_limited',
    registrationDate: '2025-12-15',
    status: 'active',
    issuedBy: 'OFF-004',
    issuanceDate: '2025-12-15',
    registeredAddress: {
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Mirpur',
      address: 'Mirpur DOHS',
      postalCode: '1216'
    },
    investmentAmount: 18000000,
    currency: 'USD',
    numberOfEmployees: 340,
    verified: true,
    createdAt: '2025-12-15T12:00:00Z',
    updatedAt: '2025-12-15T12:00:00Z'
  }
];
