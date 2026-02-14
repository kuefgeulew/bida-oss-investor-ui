/**
 * Investment Intelligence Data
 * Powers all investor friction-reducing features
 */

// ============================================
// 1. INVESTMENT TIME PREDICTOR DATA
// ============================================

export interface TimelineFactors {
  sector: string;
  location: string;
  investorType: 'foreign' | 'local' | 'joint';
  landRequired: boolean;
  investmentSize: 'small' | 'medium' | 'large';
  expectedDays: {
    min: number;
    max: number;
    average: number;
  };
}

export const timelineDatabase: TimelineFactors[] = [
  {
    sector: 'Manufacturing',
    location: 'SEZ',
    investorType: 'foreign',
    landRequired: true,
    investmentSize: 'large',
    expectedDays: { min: 35, max: 45, average: 40 }
  },
  {
    sector: 'Manufacturing',
    location: 'Non-SEZ',
    investorType: 'foreign',
    landRequired: true,
    investmentSize: 'large',
    expectedDays: { min: 45, max: 60, average: 52 }
  },
  {
    sector: 'Trading',
    location: 'Any',
    investorType: 'foreign',
    landRequired: false,
    investmentSize: 'small',
    expectedDays: { min: 15, max: 25, average: 20 }
  },
  {
    sector: 'Trading',
    location: 'Any',
    investorType: 'local',
    landRequired: false,
    investmentSize: 'small',
    expectedDays: { min: 12, max: 20, average: 16 }
  },
  {
    sector: 'Pharmaceuticals',
    location: 'SEZ',
    investorType: 'foreign',
    landRequired: true,
    investmentSize: 'large',
    expectedDays: { min: 75, max: 95, average: 85 }
  },
  {
    sector: 'Pharmaceuticals',
    location: 'Non-SEZ',
    investorType: 'foreign',
    landRequired: true,
    investmentSize: 'large',
    expectedDays: { min: 85, max: 105, average: 95 }
  },
  {
    sector: 'IT/ITES',
    location: 'Any',
    investorType: 'foreign',
    landRequired: false,
    investmentSize: 'medium',
    expectedDays: { min: 18, max: 28, average: 23 }
  },
  {
    sector: 'Real Estate',
    location: 'Dhaka',
    investorType: 'foreign',
    landRequired: true,
    investmentSize: 'large',
    expectedDays: { min: 80, max: 100, average: 90 }
  },
  {
    sector: 'Textiles',
    location: 'SEZ',
    investorType: 'foreign',
    landRequired: true,
    investmentSize: 'medium',
    expectedDays: { min: 38, max: 50, average: 44 }
  }
];

// ============================================
// 2. COST ESTIMATOR DATA
// ============================================

export interface CostBreakdown {
  category: string;
  items: {
    name: string;
    amount: number;
    currency: string;
    mandatory: boolean;
    description: string;
  }[];
}

export const costEstimatorData = {
  manufacturingLarge: {
    governmentFees: [
      { name: 'Company Registration', amount: 50000, currency: 'BDT', mandatory: true, description: 'RJSC incorporation fee' },
      { name: 'Trade License', amount: 25000, currency: 'BDT', mandatory: true, description: 'Annual city corporation fee' },
      { name: 'Environmental Clearance', amount: 150000, currency: 'BDT', mandatory: true, description: 'DOE assessment & approval' }
    ],
    utilities: [
      { name: 'Power Connection', amount: 200000, currency: 'BDT', mandatory: true, description: 'Industrial connection fee' },
      { name: 'Gas Connection', amount: 150000, currency: 'BDT', mandatory: true, description: 'Industrial gas line' },
      { name: 'Water Connection', amount: 50000, currency: 'BDT', mandatory: true, description: 'WASA connection' }
    ],
    professional: [
      { name: 'Factory License', amount: 75000, currency: 'BDT', mandatory: true, description: 'DIFE inspection & license' },
      { name: 'Fire Safety Certificate', amount: 50000, currency: 'BDT', mandatory: true, description: 'Fire service inspection' },
      { name: 'Legal Documentation', amount: 100000, currency: 'BDT', mandatory: false, description: 'Lawyer fees for incorporation' },
      { name: 'Consultant Fees', amount: 150000, currency: 'BDT', mandatory: false, description: 'BIDA registration consultant' },
      { name: 'Bank Account Setup', amount: 25000, currency: 'BDT', mandatory: true, description: 'Corporate account fees' }
    ]
  },
  tradingSmall: {
    governmentFees: [
      { name: 'Company Registration', amount: 30000, currency: 'BDT', mandatory: true, description: 'RJSC incorporation fee' },
      { name: 'Trade License', amount: 15000, currency: 'BDT', mandatory: true, description: 'City corporation fee' },
      { name: 'IRC (Import Registration)', amount: 50000, currency: 'BDT', mandatory: true, description: 'CCI&E registration' },
      { name: 'TIN Certificate', amount: 2000, currency: 'BDT', mandatory: true, description: 'NBR tax ID' }
    ],
    utilities: [],
    professional: [
      { name: 'Legal Documentation', amount: 50000, currency: 'BDT', mandatory: false, description: 'Basic incorporation' },
      { name: 'Bank Account Setup', amount: 15000, currency: 'BDT', mandatory: true, description: 'Corporate account' }
    ]
  }
};

// ============================================
// 3. REQUIRED DOCUMENTS DATABASE
// ============================================

export interface DocumentRequirement {
  documentName: string;
  requiredFor: string[];
  format: string;
  description: string;
  sampleAvailable: boolean;
  mandatory: boolean;
}

export const documentsDatabase: DocumentRequirement[] = [
  {
    documentName: 'Passport Copy',
    requiredFor: ['All foreign investors'],
    format: 'PDF, colored scan',
    description: 'Valid passport of all directors and shareholders',
    sampleAvailable: false,
    mandatory: true
  },
  {
    documentName: 'NOC from Home Country',
    requiredFor: ['Foreign investors'],
    format: 'PDF, notarized',
    description: 'No Objection Certificate from country of origin',
    sampleAvailable: true,
    mandatory: true
  },
  {
    documentName: 'Business Plan',
    requiredFor: ['All sectors'],
    format: 'PDF or DOC',
    description: 'Detailed business plan with financial projections',
    sampleAvailable: true,
    mandatory: true
  },
  {
    documentName: 'Bank Solvency Certificate',
    requiredFor: ['All investors'],
    format: 'PDF, bank letterhead',
    description: 'Proof of financial capability',
    sampleAvailable: false,
    mandatory: true
  },
  {
    documentName: 'Memorandum of Association',
    requiredFor: ['Company registration'],
    format: 'PDF, signed',
    description: 'Company MOA as per RJSC format',
    sampleAvailable: true,
    mandatory: true
  },
  {
    documentName: 'Articles of Association',
    requiredFor: ['Company registration'],
    format: 'PDF, signed',
    description: 'Company AOA as per RJSC format',
    sampleAvailable: true,
    mandatory: true
  },
  {
    documentName: 'Environmental Impact Assessment',
    requiredFor: ['Manufacturing', 'Pharmaceuticals'],
    format: 'PDF, detailed report',
    description: 'EIA study by certified consultant',
    sampleAvailable: true,
    mandatory: true
  },
  {
    documentName: 'Land Ownership Document',
    requiredFor: ['Land-based projects'],
    format: 'PDF, certified copy',
    description: 'Land deed or lease agreement',
    sampleAvailable: false,
    mandatory: true
  },
  {
    documentName: 'Factory Layout Plan',
    requiredFor: ['Manufacturing', 'Pharmaceuticals'],
    format: 'PDF, CAD drawing',
    description: 'Detailed factory floor plan',
    sampleAvailable: false,
    mandatory: true
  },
  {
    documentName: 'Import Registration Certificate',
    requiredFor: ['Trading', 'Import/Export'],
    format: 'PDF',
    description: 'IRC from CCI&E',
    sampleAvailable: false,
    mandatory: true
  }
];

// ============================================
// 4. INCENTIVE DATABASE
// ============================================

export interface IncentiveRule {
  sector: string;
  location: string;
  investorType: string;
  incentives: {
    type: string;
    value: string;
    duration: string;
    conditions: string[];
  }[];
}

export const incentivesDatabase: IncentiveRule[] = [
  {
    sector: 'Manufacturing',
    location: 'SEZ',
    investorType: 'foreign',
    incentives: [
      {
        type: 'Tax Holiday',
        value: '10 years',
        duration: 'From commercial production',
        conditions: ['100% export-oriented', 'Minimum $2M investment']
      },
      {
        type: 'Duty-Free Import',
        value: '100%',
        duration: 'Lifetime',
        conditions: ['Capital machinery', 'Raw materials for export']
      },
      {
        type: 'Repatriation',
        value: 'Full',
        duration: 'Unlimited',
        conditions: ['After tax payment']
      }
    ]
  },
  {
    sector: 'IT/ITES',
    location: 'Any',
    investorType: 'any',
    incentives: [
      {
        type: 'Tax Holiday',
        value: '10 years',
        duration: 'From commercial operation',
        conditions: ['Software development', 'IT services export']
      },
      {
        type: 'Duty-Free Import',
        value: '100%',
        duration: 'Lifetime',
        conditions: ['Computer equipment', 'Software']
      }
    ]
  },
  {
    sector: 'Pharmaceuticals',
    location: 'SEZ',
    investorType: 'foreign',
    incentives: [
      {
        type: 'Tax Holiday',
        value: '10 years',
        duration: 'From commercial production',
        conditions: ['GMP certified', 'Active ingredients production']
      },
      {
        type: 'Accelerated Depreciation',
        value: '50%',
        duration: 'First year',
        conditions: ['Capital machinery']
      }
    ]
  }
];

// ============================================
// 5. ZONE SUITABILITY DATA
// ============================================

export interface ZoneSuitability {
  zoneName: string;
  location: string;
  bestFor: string[];
  infrastructure: {
    power: 'excellent' | 'good' | 'adequate';
    gas: 'available' | 'planned' | 'not available';
    water: 'excellent' | 'good' | 'adequate';
    port: 'adjacent' | 'nearby' | 'distant';
  };
  plotSizes: string[];
  occupancyRate: number;
  establishedCompanies: string[];
  incentives: string[];
}

export const zoneDatabase: ZoneSuitability[] = [
  {
    zoneName: 'Bangabandhu Sheikh Mujib Shilpa Nagar (BSMSN)',
    location: 'Mirsharai, Chittagong',
    bestFor: ['Heavy industry', 'Steel', 'Chemicals', 'Automotive', 'Pharmaceuticals'],
    infrastructure: {
      power: 'excellent',
      gas: 'available',
      water: 'excellent',
      port: 'adjacent'
    },
    plotSizes: ['5 acres', '10 acres', '50 acres', '100+ acres'],
    occupancyRate: 35,
    establishedCompanies: ['Youngone Corporation', 'Sumitomo Corporation', 'PHP Group'],
    incentives: ['10-year tax holiday', 'One-stop service', 'Duty-free import', 'Deep sea port access']
  },
  {
    zoneName: 'Dhaka Export Processing Zone',
    location: 'Savar, Dhaka',
    bestFor: ['Textiles', 'Garments', 'Electronics', 'Light manufacturing'],
    infrastructure: {
      power: 'good',
      gas: 'available',
      water: 'good',
      port: 'distant'
    },
    plotSizes: ['0.5 acres', '1 acre', '2 acres', '5 acres'],
    occupancyRate: 85,
    establishedCompanies: ['Beximco', 'Square Pharmaceuticals', 'DBL Group'],
    incentives: ['10-year tax holiday', 'Export quota exemption', '100% FDI allowed']
  },
  {
    zoneName: 'Mongla Economic Zone',
    location: 'Mongla, Bagerhat',
    bestFor: ['Agro-processing', 'Fish processing', 'Logistics', 'Food industry'],
    infrastructure: {
      power: 'good',
      gas: 'available',
      water: 'excellent',
      port: 'adjacent'
    },
    plotSizes: ['2 acres', '5 acres', '10 acres', '20 acres'],
    occupancyRate: 25,
    establishedCompanies: ['ACI Agribusiness', 'PRAN-RFL Group'],
    incentives: ['10-year tax holiday', 'Port connectivity', 'Seafood export facilities']
  }
];

// ============================================
// 6. PEER STORIES (SUCCESS CASES)
// ============================================

export interface PeerStory {
  companyName: string;
  sector: string;
  country: string;
  investmentSize: string;
  timeline: {
    registration: number;
    allApprovals: number;
    operational: number;
  };
  zone: string;
  testimonial: string;
  year: number;
}

export const peerStories: PeerStory[] = [
  {
    companyName: 'Youngone Corporation',
    sector: 'Textiles & Apparel',
    country: 'South Korea',
    investmentSize: '$500 million',
    timeline: {
      registration: 5,
      allApprovals: 38,
      operational: 45
    },
    zone: 'BSMSN, Chittagong',
    testimonial: 'The one-stop service at BSMSN made approval process transparent and predictable.',
    year: 2022
  },
  {
    companyName: 'Summit Power International',
    sector: 'Power Generation',
    country: 'Singapore',
    investmentSize: '$1.2 billion',
    timeline: {
      registration: 4,
      allApprovals: 42,
      operational: 60
    },
    zone: 'Multiple locations',
    testimonial: 'BIDA facilitation helped us navigate regulatory requirements efficiently.',
    year: 2021
  },
  {
    companyName: 'PHP Automobiles',
    sector: 'Automotive Manufacturing',
    country: 'Japan',
    investmentSize: '$300 million',
    timeline: {
      registration: 6,
      allApprovals: 50,
      operational: 70
    },
    zone: 'BSMSN, Chittagong',
    testimonial: 'Incentives and infrastructure at BSMSN were key factors in our decision.',
    year: 2023
  }
];

// ============================================
// 7. OFFICER CONTACT DATABASE
// ============================================

export interface OfficerContact {
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  specialization: string[];
  languages: string[];
  availability: string;
}

export const officerDatabase: OfficerContact[] = [
  {
    name: 'Ahmed Rahman',
    designation: 'Senior Investment Officer',
    department: 'BIDA',
    email: 'ahmed.rahman@bida.gov.bd',
    phone: '+880-1711-123456',
    specialization: ['Manufacturing', 'Textiles', 'Heavy Industry'],
    languages: ['English', 'Bangla', 'Hindi'],
    availability: 'Mon-Fri, 9 AM - 5 PM'
  },
  {
    name: 'Fatima Sultana',
    designation: 'Investment Facilitation Specialist',
    department: 'BIDA',
    email: 'fatima.sultana@bida.gov.bd',
    phone: '+880-1711-234567',
    specialization: ['IT/ITES', 'Pharmaceuticals', 'Trading'],
    languages: ['English', 'Bangla'],
    availability: 'Mon-Fri, 9 AM - 5 PM'
  },
  {
    name: 'Kamal Hossain',
    designation: 'SEZ Coordination Officer',
    department: 'BEZA',
    email: 'kamal.hossain@beza.gov.bd',
    phone: '+880-1711-345678',
    specialization: ['SEZ allocation', 'Infrastructure', 'Utilities'],
    languages: ['English', 'Bangla', 'Chinese'],
    availability: 'Mon-Sat, 9 AM - 5 PM'
  }
];

// ============================================
// 8. COMPLIANCE CALENDAR DATA
// ============================================

export interface ComplianceEvent {
  type: 'renewal' | 'filing' | 'inspection' | 'payment';
  title: string;
  description: string;
  frequency: 'annual' | 'quarterly' | 'monthly' | 'one-time';
  daysBeforeAlert: number;
  relatedAgency: string;
}

export const complianceCalendar: ComplianceEvent[] = [
  {
    type: 'renewal',
    title: 'Trade License Renewal',
    description: 'Renew trade license with city corporation',
    frequency: 'annual',
    daysBeforeAlert: 30,
    relatedAgency: 'City Corporation'
  },
  {
    type: 'filing',
    title: 'Annual Tax Return',
    description: 'File corporate tax return with NBR',
    frequency: 'annual',
    daysBeforeAlert: 45,
    relatedAgency: 'NBR'
  },
  {
    type: 'inspection',
    title: 'Factory Inspection',
    description: 'DIFE factory compliance inspection',
    frequency: 'annual',
    daysBeforeAlert: 15,
    relatedAgency: 'DIFE'
  },
  {
    type: 'filing',
    title: 'VAT Return',
    description: 'File monthly VAT return',
    frequency: 'monthly',
    daysBeforeAlert: 7,
    relatedAgency: 'NBR'
  },
  {
    type: 'renewal',
    title: 'Environmental Clearance Renewal',
    description: 'Renew environmental clearance certificate',
    frequency: 'annual',
    daysBeforeAlert: 60,
    relatedAgency: 'DOE'
  }
];