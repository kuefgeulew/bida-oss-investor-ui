// 📦 PACKAGE TIERS — Business Starter Package tier definitions
// ARCHITECTURE: Configuration layer. Defines Basic/Standard/Premium packages.

export interface ServiceDefinition {
  id: string;
  name: string;
  agency: string;
  processingDays: number;
  fee: number;
  description: string;
  required: boolean;
  phase: 'incorporation' | 'post-incorporation'; // Days 1-3 vs Days 4-7
}

export interface PackageTier {
  id: 'basic' | 'standard' | 'premium';
  name: string;
  duration: number; // Total days
  price: number; // USD
  services: ServiceDefinition[];
  totalApprovals: number;
  savings: number; // USD vs individual applications
  discountPercentage: number;
  recommended: boolean;
  badge?: string;
  features: string[];
  bestFor: string[];
}

// 🔥 ALL 11 SERVICES DEFINED
const ALL_SERVICES: Record<string, ServiceDefinition> = {
  'name-clearance': {
    id: 'name-clearance',
    name: 'Name Clearance',
    agency: 'RJSC',
    processingDays: 1,
    fee: 50,
    description: 'Reserve your company name',
    required: true,
    phase: 'incorporation'
  },
  'bank-account': {
    id: 'bank-account',
    name: 'Bank Account Opening',
    agency: 'Commercial Bank',
    processingDays: 1,
    fee: 100,
    description: 'Open corporate bank account',
    required: true,
    phase: 'incorporation'
  },
  'incorporation': {
    id: 'incorporation',
    name: 'Company Incorporation (RJSC)',
    agency: 'RJSC',
    processingDays: 1,
    fee: 500,
    description: 'Register company with RJSC',
    required: true,
    phase: 'incorporation'
  },
  'e-tin': {
    id: 'e-tin',
    name: 'e-TIN Registration',
    agency: 'NBR (National Board of Revenue)',
    processingDays: 1,
    fee: 0,
    description: 'Tax Identification Number',
    required: true,
    phase: 'incorporation'
  },
  'trade-license': {
    id: 'trade-license',
    name: 'Trade License',
    agency: 'City Corporation',
    processingDays: 1,
    fee: 300,
    description: 'Municipal business license',
    required: true,
    phase: 'incorporation'
  },
  // POST-INCORPORATION SERVICES (Days 4-7)
  'vat-registration': {
    id: 'vat-registration',
    name: 'VAT Registration',
    agency: 'NBR (National Board of Revenue)',
    processingDays: 1,
    fee: 0,
    description: 'Value Added Tax registration for businesses with turnover >BDT 30 lakh',
    required: false,
    phase: 'post-incorporation'
  },
  'irc-erc': {
    id: 'irc-erc',
    name: 'Import-Export Registration (IRC/ERC)',
    agency: 'CCI&E (Chief Controller of Imports & Exports)',
    processingDays: 1,
    fee: 350,
    description: 'Certificates for international trade',
    required: false,
    phase: 'post-incorporation'
  },
  'epf': {
    id: 'epf',
    name: 'Employee Provident Fund Registration',
    agency: 'EPFB (Employees Provident Fund Board)',
    processingDays: 1,
    fee: 0,
    description: 'Mandatory for companies with 20+ employees',
    required: false,
    phase: 'post-incorporation'
  },
  'social-security': {
    id: 'social-security',
    name: 'Social Security Registration',
    agency: 'Ministry of Labour',
    processingDays: 1,
    fee: 0,
    description: 'Worker welfare and social security compliance',
    required: false,
    phase: 'post-incorporation'
  },
  'factory-registration': {
    id: 'factory-registration',
    name: 'Factory Registration (Initial Filing)',
    agency: 'DIFE (Dept. of Inspection for Factories)',
    processingDays: 1,
    fee: 400,
    description: 'Required for manufacturing operations',
    required: false,
    phase: 'post-incorporation'
  },
  'environmental-clearance': {
    id: 'environmental-clearance',
    name: 'Environmental Clearance Application',
    agency: 'DoE (Department of Environment)',
    processingDays: 1,
    fee: 500,
    description: 'Environmental compliance certificate submission',
    required: false,
    phase: 'post-incorporation'
  }
};

// 🎯 BASIC PACKAGE (3 Days)
const BASIC_PACKAGE: PackageTier = {
  id: 'basic',
  name: 'Basic Package',
  duration: 3,
  price: 950,
  services: [
    ALL_SERVICES['name-clearance'],
    ALL_SERVICES['bank-account'],
    ALL_SERVICES['incorporation'],
    ALL_SERVICES['e-tin'],
    ALL_SERVICES['trade-license']
  ],
  totalApprovals: 5,
  savings: 200,
  discountPercentage: 17,
  recommended: false,
  features: [
    '5 core government approvals',
    'Company legally registered',
    'Ready for domestic operations',
    'Bank account activated',
    'Tax compliant (TIN)',
    '3-day express processing'
  ],
  bestFor: [
    'Service-based businesses',
    'Consulting firms',
    'Small startups',
    'Office-only operations'
  ]
};

// 🎯 STANDARD PACKAGE (5 Days)
const STANDARD_PACKAGE: PackageTier = {
  id: 'standard',
  name: 'Standard Package',
  duration: 5,
  price: 1300,
  services: [
    ...BASIC_PACKAGE.services,
    ALL_SERVICES['vat-registration'],
    ALL_SERVICES['irc-erc']
  ],
  totalApprovals: 7,
  savings: 450,
  discountPercentage: 25,
  recommended: true,
  badge: 'MOST POPULAR',
  features: [
    'Everything in Basic Package',
    '+VAT registration (tax-ready)',
    '+Import/Export certificates',
    'International trade enabled',
    'Full tax compliance',
    '5-day fast-track processing'
  ],
  bestFor: [
    'Import/export businesses',
    'Trading companies',
    'Manufacturing with imports',
    'Growing startups'
  ]
};

// 🎯 PREMIUM PACKAGE (7 Days)
const PREMIUM_PACKAGE: PackageTier = {
  id: 'premium',
  name: 'Premium Package (Platinum)',
  duration: 7,
  price: 2200,
  services: [
    ...STANDARD_PACKAGE.services,
    ALL_SERVICES['epf'],
    ALL_SERVICES['social-security'],
    ALL_SERVICES['factory-registration'],
    ALL_SERVICES['environmental-clearance']
  ],
  totalApprovals: 11,
  savings: 800,
  discountPercentage: 27,
  recommended: false,
  badge: 'COMPLETE',
  features: [
    'Everything in Standard Package',
    '+Employee Provident Fund',
    '+Social Security compliance',
    '+Factory registration',
    '+Environmental clearance',
    '100% operational readiness',
    'No follow-up permits needed',
    '7-day turnkey solution'
  ],
  bestFor: [
    'Manufacturing facilities',
    'Factories',
    'Large-scale operations',
    'Export-oriented units'
  ]
};

// Export all tiers
export const PACKAGE_TIERS: PackageTier[] = [
  BASIC_PACKAGE,
  STANDARD_PACKAGE,
  PREMIUM_PACKAGE
];

// Helper functions
export const getPackageTier = (tierId: 'basic' | 'standard' | 'premium'): PackageTier => {
  return PACKAGE_TIERS.find(tier => tier.id === tierId) || BASIC_PACKAGE;
};

export const getServicesForPhase = (tier: PackageTier, phase: 'incorporation' | 'post-incorporation') => {
  return tier.services.filter(svc => svc.phase === phase);
};

export const calculateTotalFees = (tier: PackageTier): number => {
  return tier.services.reduce((sum, svc) => sum + svc.fee, 0);
};

export const getTimelineDays = (tier: PackageTier): { incorporation: number; postIncorporation: number } => {
  const incorporationServices = getServicesForPhase(tier, 'incorporation');
  const postIncorporationServices = getServicesForPhase(tier, 'post-incorporation');
  
  return {
    incorporation: Math.max(...incorporationServices.map(s => s.processingDays), 0),
    postIncorporation: Math.max(...postIncorporationServices.map(s => s.processingDays), 0)
  };
};
