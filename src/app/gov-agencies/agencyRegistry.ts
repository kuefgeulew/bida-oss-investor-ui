/**
 * Government Agency Registry
 * Single source of truth for all Bangladesh government agencies
 * integrated with the OSS system
 */

export type AgencyCategory = 
  | 'registration'
  | 'tax'
  | 'environment'
  | 'safety'
  | 'utilities'
  | 'immigration'
  | 'finance'
  | 'land'
  | 'industry'
  | 'customs';

export type DocumentRequirement = {
  id: string;
  name: string;
  required: boolean;
  format: string[];
};

export type ServiceStatus = 
  | 'not-started'
  | 'documents-pending'
  | 'under-review'
  | 'approved'
  | 'rejected'
  | 'on-hold';

export interface AgencyService {
  id: string;
  name: string;
  description: string;
  slaInDays: number;
  documents: DocumentRequirement[];
  fee: number;
  currency: 'BDT' | 'USD';
  prerequisites: string[]; // IDs of other services that must complete first
  applicableFor: ('manufacturing' | 'services' | 'trading' | 'all')[];
  tags?: ('startup' | 'sme' | 'green' | 'export' | 'tech' | 'priority')[]; // Optional category tags
}

export interface GovernmentAgency {
  id: string;
  code: string;
  name: string;
  fullName: string;
  category: AgencyCategory;
  website: string;
  contactEmail: string;
  contactPhone: string;
  services: AgencyService[];
  criticalPath: boolean; // True if delays here block entire approval
}

/**
 * Complete registry of Bangladesh government agencies
 */
export const GOVERNMENT_AGENCIES: GovernmentAgency[] = [
  // REGISTRATION & INCORPORATION
  {
    id: 'rjsc',
    code: 'RJSC',
    name: 'RJSC',
    fullName: 'Registrar of Joint Stock Companies',
    category: 'registration',
    website: 'http://www.rjsc.gov.bd',
    contactEmail: 'info@rjsc.gov.bd',
    contactPhone: '+880-2-9563141',
    criticalPath: true,
    services: [
      {
        id: 'rjsc-registration',
        name: 'Company Registration',
        description: 'Register new company with RJSC',
        slaInDays: 7,
        fee: 15000,
        currency: 'BDT',
        prerequisites: [],
        applicableFor: ['all'],
        tags: ['startup', 'priority'],
        documents: [
          { id: 'memorandum', name: 'Memorandum of Association', required: true, format: ['pdf'] },
          { id: 'articles', name: 'Articles of Association', required: true, format: ['pdf'] },
          { id: 'director-ids', name: 'Director ID Copies', required: true, format: ['pdf', 'jpg'] },
          { id: 'address-proof', name: 'Registered Office Address Proof', required: true, format: ['pdf'] },
        ]
      },
      {
        id: 'rjsc-name-clearance',
        name: 'Name Clearance',
        description: 'Company name availability clearance',
        slaInDays: 3,
        fee: 600,
        currency: 'BDT',
        prerequisites: [],
        applicableFor: ['all'],
        tags: ['startup', 'priority'],
        documents: [
          { id: 'name-application', name: 'Name Application Form', required: true, format: ['pdf'] },
        ]
      }
    ]
  },

  // TAX ADMINISTRATION
  {
    id: 'nbr',
    code: 'NBR',
    name: 'NBR',
    fullName: 'National Board of Revenue',
    category: 'tax',
    website: 'https://nbr.gov.bd',
    contactEmail: 'info@nbr.gov.bd',
    contactPhone: '+880-2-9898809',
    criticalPath: true,
    services: [
      {
        id: 'nbr-etin',
        name: 'eTIN Registration',
        description: 'Electronic Tax Identification Number',
        slaInDays: 5,
        fee: 0,
        currency: 'BDT',
        prerequisites: ['rjsc-registration'],
        applicableFor: ['all'],
        documents: [
          { id: 'incorporation-cert', name: 'Incorporation Certificate', required: true, format: ['pdf'] },
          { id: 'trade-license', name: 'Trade License', required: true, format: ['pdf'] },
        ]
      },
      {
        id: 'nbr-vat',
        name: 'VAT Registration',
        description: 'Value Added Tax Registration',
        slaInDays: 10,
        fee: 0,
        currency: 'BDT',
        prerequisites: ['nbr-etin'],
        applicableFor: ['all'],
        documents: [
          { id: 'etin-cert', name: 'eTIN Certificate', required: true, format: ['pdf'] },
          { id: 'business-plan', name: 'Business Plan', required: true, format: ['pdf'] },
        ]
      },
      {
        id: 'nbr-ebin',
        name: 'eBIN Registration',
        description: 'Electronic Business Identification Number',
        slaInDays: 7,
        fee: 0,
        currency: 'BDT',
        prerequisites: ['nbr-etin'],
        applicableFor: ['manufacturing', 'trading'],
        documents: [
          { id: 'etin-cert', name: 'eTIN Certificate', required: true, format: ['pdf'] },
          { id: 'factory-address', name: 'Factory Address Proof', required: true, format: ['pdf'] },
        ]
      }
    ]
  },

  // ENVIRONMENT
  {
    id: 'doe',
    code: 'DoE',
    name: 'Environment',
    fullName: 'Department of Environment',
    category: 'environment',
    website: 'http://www.doe.gov.bd',
    contactEmail: 'director@doe.gov.bd',
    contactPhone: '+880-2-9560388',
    criticalPath: true,
    services: [
      {
        id: 'doe-clearance',
        name: 'Environmental Clearance',
        description: 'Environmental Impact Assessment Approval',
        slaInDays: 30,
        fee: 50000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration'],
        applicableFor: ['manufacturing'],
        tags: ['green'],
        documents: [
          { id: 'eia-report', name: 'Environmental Impact Assessment Report', required: true, format: ['pdf'] },
          { id: 'site-map', name: 'Site Map', required: true, format: ['pdf', 'jpg'] },
          { id: 'waste-management', name: 'Waste Management Plan', required: true, format: ['pdf'] },
        ]
      },
      {
        id: 'doe-renewal',
        name: 'Environmental Clearance Renewal',
        description: 'Annual environmental clearance renewal',
        slaInDays: 15,
        fee: 25000,
        currency: 'BDT',
        prerequisites: ['doe-clearance'],
        applicableFor: ['manufacturing'],
        tags: ['green'],
        documents: [
          { id: 'prev-clearance', name: 'Previous Clearance Certificate', required: true, format: ['pdf'] },
          { id: 'compliance-report', name: 'Environmental Compliance Report', required: true, format: ['pdf'] },
        ]
      }
    ]
  },

  // FIRE SAFETY
  {
    id: 'fire',
    code: 'FSCD',
    name: 'Fire Service',
    fullName: 'Fire Service & Civil Defence',
    category: 'safety',
    website: 'http://www.fireservice.gov.bd',
    contactEmail: 'info@fireservice.gov.bd',
    contactPhone: '+880-2-9555555',
    criticalPath: true,
    services: [
      {
        id: 'fire-clearance',
        name: 'Fire Safety Certificate',
        description: 'Fire safety and prevention clearance',
        slaInDays: 15,
        fee: 10000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration'],
        applicableFor: ['manufacturing', 'services'],
        documents: [
          { id: 'building-plan', name: 'Building Plan', required: true, format: ['pdf'] },
          { id: 'fire-equipment', name: 'Fire Equipment List', required: true, format: ['pdf'] },
          { id: 'evacuation-plan', name: 'Evacuation Plan', required: true, format: ['pdf'] },
        ]
      }
    ]
  },

  // UTILITIES
  {
    id: 'dpdc',
    code: 'DPDC',
    name: 'DPDC',
    fullName: 'Dhaka Power Distribution Company',
    category: 'utilities',
    website: 'http://www.dpdc.gov.bd',
    contactEmail: 'info@dpdc.gov.bd',
    contactPhone: '+880-2-8391901',
    criticalPath: false,
    services: [
      {
        id: 'dpdc-connection',
        name: 'Electricity Connection',
        description: 'New electricity connection for industrial use',
        slaInDays: 45,
        fee: 150000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration', 'fire-clearance'],
        applicableFor: ['manufacturing'],
        documents: [
          { id: 'load-application', name: 'Load Application Form', required: true, format: ['pdf'] },
          { id: 'site-plan', name: 'Site Plan', required: true, format: ['pdf'] },
          { id: 'fire-cert', name: 'Fire Safety Certificate', required: true, format: ['pdf'] },
        ]
      }
    ]
  },

  {
    id: 'wasa',
    code: 'WASA',
    name: 'WASA',
    fullName: 'Water Supply & Sewerage Authority',
    category: 'utilities',
    website: 'http://www.dwasa.org.bd',
    contactEmail: 'info@dwasa.org.bd',
    contactPhone: '+880-2-9896751',
    criticalPath: false,
    services: [
      {
        id: 'wasa-connection',
        name: 'Water Connection',
        description: 'New water supply connection',
        slaInDays: 30,
        fee: 50000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration'],
        applicableFor: ['manufacturing', 'services'],
        documents: [
          { id: 'connection-form', name: 'Connection Application Form', required: true, format: ['pdf'] },
          { id: 'building-permit', name: 'Building Permit', required: true, format: ['pdf'] },
        ]
      }
    ]
  },

  {
    id: 'titas',
    code: 'TITAS',
    name: 'Titas Gas',
    fullName: 'Titas Gas Transmission & Distribution Company',
    category: 'utilities',
    website: 'http://www.titasgas.org.bd',
    contactEmail: 'info@titasgas.org.bd',
    contactPhone: '+880-2-9564560',
    criticalPath: false,
    services: [
      {
        id: 'titas-connection',
        name: 'Gas Connection',
        description: 'Natural gas connection for industrial use',
        slaInDays: 60,
        fee: 200000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration', 'fire-clearance'],
        applicableFor: ['manufacturing'],
        documents: [
          { id: 'gas-application', name: 'Gas Connection Application', required: true, format: ['pdf'] },
          { id: 'safety-measures', name: 'Gas Safety Measures Plan', required: true, format: ['pdf'] },
          { id: 'fire-cert', name: 'Fire Safety Certificate', required: true, format: ['pdf'] },
        ]
      }
    ]
  },

  // IMMIGRATION
  {
    id: 'immigration',
    code: 'DIP',
    name: 'Immigration',
    fullName: 'Department of Immigration & Passports',
    category: 'immigration',
    website: 'http://www.dip.gov.bd',
    contactEmail: 'info@dip.gov.bd',
    contactPhone: '+880-2-8159527',
    criticalPath: false,
    services: [
      {
        id: 'investor-visa',
        name: 'Investor Visa',
        description: 'Long-term visa for foreign investors',
        slaInDays: 20,
        fee: 10000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration', 'bida-registration'],
        applicableFor: ['all'],
        documents: [
          { id: 'passport', name: 'Passport Copy', required: true, format: ['pdf', 'jpg'] },
          { id: 'investment-proof', name: 'Investment Proof', required: true, format: ['pdf'] },
          { id: 'bida-approval', name: 'BIDA Approval Letter', required: true, format: ['pdf'] },
        ]
      },
      {
        id: 'work-permit',
        name: 'Work Permit',
        description: 'Work permit for foreign employees',
        slaInDays: 30,
        fee: 15000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration'],
        applicableFor: ['all'],
        documents: [
          { id: 'employee-passport', name: 'Employee Passport', required: true, format: ['pdf'] },
          { id: 'employment-letter', name: 'Employment Letter', required: true, format: ['pdf'] },
          { id: 'qualification-docs', name: 'Qualification Documents', required: true, format: ['pdf'] },
        ]
      }
    ]
  },

  // FINANCE & BANKING
  {
    id: 'bb',
    code: 'BB',
    name: 'Bangladesh Bank',
    fullName: 'Bangladesh Bank',
    category: 'finance',
    website: 'https://www.bb.org.bd',
    contactEmail: 'info@bb.org.bd',
    contactPhone: '+880-2-9530100',
    criticalPath: true,
    services: [
      {
        id: 'bb-fx-approval',
        name: 'Foreign Exchange Approval',
        description: 'FX remittance and repatriation approval',
        slaInDays: 15,
        fee: 0,
        currency: 'BDT',
        prerequisites: ['rjsc-registration', 'nbr-etin'],
        applicableFor: ['all'],
        documents: [
          { id: 'remittance-plan', name: 'Remittance Plan', required: true, format: ['pdf'] },
          { id: 'bank-account', name: 'Bank Account Details', required: true, format: ['pdf'] },
          { id: 'source-of-funds', name: 'Source of Funds Declaration', required: true, format: ['pdf'] },
        ]
      }
    ]
  },

  // LAND ADMINISTRATION
  {
    id: 'land',
    code: 'MoL',
    name: 'Land Ministry',
    fullName: 'Ministry of Land',
    category: 'land',
    website: 'http://www.minland.gov.bd',
    contactEmail: 'info@minland.gov.bd',
    contactPhone: '+880-2-7160000',
    criticalPath: true,
    services: [
      {
        id: 'land-acquisition',
        name: 'Land Acquisition Approval',
        description: 'Approval for acquiring industrial land',
        slaInDays: 90,
        fee: 500000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration', 'bida-registration'],
        applicableFor: ['manufacturing'],
        documents: [
          { id: 'land-documents', name: 'Land Ownership Documents', required: true, format: ['pdf'] },
          { id: 'land-survey', name: 'Land Survey Report', required: true, format: ['pdf'] },
          { id: 'investment-plan', name: 'Investment Plan', required: true, format: ['pdf'] },
        ]
      }
    ]
  },

  // CITY CORPORATION
  {
    id: 'dscc',
    code: 'DSCC',
    name: 'Dhaka South',
    fullName: 'Dhaka South City Corporation',
    category: 'registration',
    website: 'http://www.dscc.gov.bd',
    contactEmail: 'info@dscc.gov.bd',
    contactPhone: '+880-2-7392127',
    criticalPath: true,
    services: [
      {
        id: 'trade-license',
        name: 'Trade License',
        description: 'Annual trade license for business operations',
        slaInDays: 10,
        fee: 5000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration'],
        applicableFor: ['all'],
        documents: [
          { id: 'incorporation-cert', name: 'Incorporation Certificate', required: true, format: ['pdf'] },
          { id: 'tin-cert', name: 'TIN Certificate', required: true, format: ['pdf'] },
          { id: 'rent-agreement', name: 'Rent Agreement', required: true, format: ['pdf'] },
        ]
      },
      {
        id: 'building-permit',
        name: 'Building Construction Permit',
        description: 'Permit for building construction or renovation',
        slaInDays: 45,
        fee: 100000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration', 'land-acquisition'],
        applicableFor: ['manufacturing', 'services'],
        documents: [
          { id: 'building-plan', name: 'Approved Building Plan', required: true, format: ['pdf'] },
          { id: 'structural-design', name: 'Structural Design', required: true, format: ['pdf'] },
          { id: 'land-deed', name: 'Land Deed', required: true, format: ['pdf'] },
        ]
      }
    ]
  },

  // BIDA
  {
    id: 'bida',
    code: 'BIDA',
    name: 'BIDA',
    fullName: 'Bangladesh Investment Development Authority',
    category: 'registration',
    website: 'http://bida.gov.bd',
    contactEmail: 'info@bida.gov.bd',
    contactPhone: '+880-2-9141051',
    criticalPath: true,
    services: [
      {
        id: 'bida-registration',
        name: 'BIDA Registration',
        description: 'FDI project registration with BIDA',
        slaInDays: 15,
        fee: 0,
        currency: 'BDT',
        prerequisites: ['rjsc-registration'],
        applicableFor: ['all'],
        documents: [
          { id: 'project-proposal', name: 'Project Proposal', required: true, format: ['pdf'] },
          { id: 'financial-plan', name: 'Financial Plan', required: true, format: ['pdf'] },
          { id: 'company-profile', name: 'Company Profile', required: true, format: ['pdf'] },
        ]
      }
    ]
  },

  // BEZA
  {
    id: 'beza',
    code: 'BEZA',
    name: 'BEZA',
    fullName: 'Bangladesh Economic Zones Authority',
    category: 'industry',
    website: 'http://www.beza.gov.bd',
    contactEmail: 'info@beza.gov.bd',
    contactPhone: '+880-2-9556704',
    criticalPath: false,
    services: [
      {
        id: 'beza-allocation',
        name: 'Economic Zone Land Allocation',
        description: 'Land allocation in BEZA economic zones',
        slaInDays: 30,
        fee: 0,
        currency: 'BDT',
        prerequisites: ['bida-registration'],
        applicableFor: ['manufacturing'],
        documents: [
          { id: 'investment-plan', name: 'Investment Plan', required: true, format: ['pdf'] },
          { id: 'project-feasibility', name: 'Project Feasibility Study', required: true, format: ['pdf'] },
        ]
      }
    ]
  },

  // BEPZA
  {
    id: 'bepza',
    code: 'BEPZA',
    name: 'BEPZA',
    fullName: 'Bangladesh Export Processing Zones Authority',
    category: 'industry',
    website: 'http://www.bepza.gov.bd',
    contactEmail: 'info@bepza.gov.bd',
    contactPhone: '+880-2-9338471',
    criticalPath: false,
    services: [
      {
        id: 'bepza-allocation',
        name: 'EPZ Land Allocation',
        description: 'Land allocation in export processing zones',
        slaInDays: 30,
        fee: 0,
        currency: 'BDT',
        prerequisites: ['bida-registration'],
        applicableFor: ['manufacturing'],
        documents: [
          { id: 'export-plan', name: 'Export Plan', required: true, format: ['pdf'] },
          { id: 'investment-details', name: 'Investment Details', required: true, format: ['pdf'] },
        ]
      }
    ]
  },

  // CUSTOMS
  {
    id: 'customs',
    code: 'CUSTOMS',
    name: 'Customs',
    fullName: 'Bangladesh Customs',
    category: 'customs',
    website: 'http://www.customs.gov.bd',
    contactEmail: 'info@customs.gov.bd',
    contactPhone: '+880-2-9558080',
    criticalPath: false,
    services: [
      {
        id: 'import-license',
        name: 'Import Registration Certificate',
        description: 'IRC for importing machinery and raw materials',
        slaInDays: 15,
        fee: 5000,
        currency: 'BDT',
        prerequisites: ['nbr-etin', 'trade-license'],
        applicableFor: ['manufacturing', 'trading'],
        documents: [
          { id: 'tin-cert', name: 'TIN Certificate', required: true, format: ['pdf'] },
          { id: 'trade-license', name: 'Trade License', required: true, format: ['pdf'] },
          { id: 'bank-solvency', name: 'Bank Solvency Certificate', required: true, format: ['pdf'] },
        ]
      }
    ]
  },
  
  // DRUG ADMINISTRATION
  {
    id: 'dgda',
    code: 'DGDA',
    name: 'DGDA',
    fullName: 'Directorate General of Drug Administration',
    category: 'industry',
    website: 'http://www.dgda.gov.bd',
    contactEmail: 'info@dgda.gov.bd',
    contactPhone: '+880-2-9664650',
    criticalPath: false,
    services: [
      {
        id: 'dgda-drug-license',
        name: 'Drug Manufacturing License',
        description: 'License for pharmaceutical manufacturing',
        slaInDays: 30,
        fee: 50000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration', 'trade-license'],
        applicableFor: ['manufacturing'],
        documents: [
          { id: 'premises-plan', name: 'Factory Layout Plan', required: true, format: ['pdf'] },
          { id: 'quality-cert', name: 'Quality Assurance Certificate', required: true, format: ['pdf'] },
          { id: 'pharmacist-cert', name: 'Licensed Pharmacist Certificate', required: true, format: ['pdf'] },
        ]
      },
      {
        id: 'dgda-import-license',
        name: 'Drug Import License',
        description: 'License to import pharmaceutical products',
        slaInDays: 21,
        fee: 25000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration'],
        applicableFor: ['trading'],
        documents: [
          { id: 'import-permit', name: 'Import Permit Application', required: true, format: ['pdf'] },
          { id: 'manufacturer-cert', name: 'Manufacturer Certificate', required: true, format: ['pdf'] },
        ]
      }
    ]
  },
  
  // STANDARDS AND TESTING
  {
    id: 'bsti',
    code: 'BSTI',
    name: 'BSTI',
    fullName: 'Bangladesh Standards and Testing Institution',
    category: 'industry',
    website: 'http://www.bsti.gov.bd',
    contactEmail: 'info@bsti.gov.bd',
    contactPhone: '+880-2-9113051',
    criticalPath: false,
    services: [
      {
        id: 'bsti-certification',
        name: 'Product Certification',
        description: 'BSTI quality standard certification',
        slaInDays: 45,
        fee: 30000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration'],
        applicableFor: ['manufacturing'],
        documents: [
          { id: 'product-specs', name: 'Product Specifications', required: true, format: ['pdf'] },
          { id: 'test-report', name: 'Laboratory Test Report', required: true, format: ['pdf'] },
          { id: 'factory-inspection', name: 'Factory Inspection Report', required: false, format: ['pdf'] },
        ]
      }
    ]
  },
  
  // INDUSTRIAL ENTERPRISES
  {
    id: 'dife',
    code: 'DIFE',
    name: 'DIFE',
    fullName: 'Department of Inspection for Factories and Establishments',
    category: 'industry',
    website: 'http://www.dife.gov.bd',
    contactEmail: 'info@dife.gov.bd',
    contactPhone: '+880-2-8315582',
    criticalPath: true,
    services: [
      {
        id: 'dife-factory-license',
        name: 'Factory License',
        description: 'License to operate industrial factory',
        slaInDays: 15,
        fee: 5000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration', 'fire-safety-cert'],
        applicableFor: ['manufacturing'],
        documents: [
          { id: 'factory-plan', name: 'Factory Floor Plan', required: true, format: ['pdf'] },
          { id: 'machinery-list', name: 'Machinery List', required: true, format: ['pdf', 'xlsx'] },
          { id: 'worker-safety-plan', name: 'Worker Safety Plan', required: true, format: ['pdf'] },
        ]
      },
      {
        id: 'dife-boiler-license',
        name: 'Boiler License',
        description: 'License to operate boilers',
        slaInDays: 10,
        fee: 3000,
        currency: 'BDT',
        prerequisites: ['dife-factory-license'],
        applicableFor: ['manufacturing'],
        documents: [
          { id: 'boiler-specs', name: 'Boiler Specifications', required: true, format: ['pdf'] },
          { id: 'engineer-cert', name: 'Boiler Engineer Certificate', required: true, format: ['pdf'] },
        ]
      }
    ]
  },
  
  // CHIEF CONTROLLER OF IMPORTS & EXPORTS
  {
    id: 'ccie',
    code: 'CCI&E',
    name: 'CCI&E',
    fullName: 'Chief Controller of Imports and Exports',
    category: 'customs',
    website: 'http://www.ccie.gov.bd',
    contactEmail: 'info@ccie.gov.bd',
    contactPhone: '+880-2-9564005',
    criticalPath: false,
    services: [
      {
        id: 'ccie-irc',
        name: 'Import Registration Certificate (IRC)',
        description: 'Certificate to import goods',
        slaInDays: 7,
        fee: 3000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration', 'nbr-etin'],
        applicableFor: ['manufacturing', 'trading'],
        tags: ['export', 'sme'],
        documents: [
          { id: 'tin-cert', name: 'TIN Certificate', required: true, format: ['pdf'] },
          { id: 'bank-cert', name: 'Bank Certificate', required: true, format: ['pdf'] },
          { id: 'trade-license', name: 'Trade License', required: true, format: ['pdf'] },
        ]
      },
      {
        id: 'ccie-erc',
        name: 'Export Registration Certificate (ERC)',
        description: 'Certificate to export goods',
        slaInDays: 7,
        fee: 3000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration', 'nbr-etin'],
        applicableFor: ['manufacturing', 'trading'],
        tags: ['export', 'sme'],
        documents: [
          { id: 'tin-cert', name: 'TIN Certificate', required: true, format: ['pdf'] },
          { id: 'bank-cert', name: 'Bank Certificate', required: true, format: ['pdf'] },
          { id: 'trade-license', name: 'Trade License', required: true, format: ['pdf'] },
        ]
      }
    ]
  },
  
  // SECURITY SERVICES DIVISION
  {
    id: 'ssd',
    code: 'SSD',
    name: 'SSD',
    fullName: 'Security Services Division',
    category: 'immigration',
    website: 'http://www.ssd.gov.bd',
    contactEmail: 'info@ssd.gov.bd',
    contactPhone: '+880-2-8315240',
    criticalPath: false,
    services: [
      {
        id: 'ssd-security-clearance',
        name: 'Security Clearance',
        description: 'Security clearance for foreign investment',
        slaInDays: 21,
        fee: 5000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration'],
        applicableFor: ['all'],
        documents: [
          { id: 'passport-copy', name: 'Passport Copy', required: true, format: ['pdf'] },
          { id: 'business-plan', name: 'Business Plan', required: true, format: ['pdf'] },
          { id: 'police-clearance', name: 'Police Clearance (Home Country)', required: true, format: ['pdf'] },
        ]
      }
    ]
  },
  
  // MUNICIPALITIES (Chittagong, Khulna, Rajshahi, Sylhet)
  {
    id: 'ccc',
    code: 'CCC',
    name: 'CCC',
    fullName: 'Chittagong City Corporation',
    category: 'registration',
    website: 'http://www.ccc.gov.bd',
    contactEmail: 'info@ccc.gov.bd',
    contactPhone: '+880-31-619641',
    criticalPath: false,
    services: [
      {
        id: 'ccc-trade-license',
        name: 'Trade License (Chittagong)',
        description: 'Business license for Chittagong city',
        slaInDays: 10,
        fee: 5000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration'],
        applicableFor: ['all'],
        documents: [
          { id: 'tin-cert', name: 'TIN Certificate', required: true, format: ['pdf'] },
          { id: 'holding-tax', name: 'Holding Tax Receipt', required: false, format: ['pdf'] },
          { id: 'rent-agreement', name: 'Office Rent Agreement', required: true, format: ['pdf'] },
        ]
      }
    ]
  },
  
  {
    id: 'kcc',
    code: 'KCC',
    name: 'KCC',
    fullName: 'Khulna City Corporation',
    category: 'registration',
    website: 'http://www.kcc.gov.bd',
    contactEmail: 'info@kcc.gov.bd',
    contactPhone: '+880-41-720305',
    criticalPath: false,
    services: [
      {
        id: 'kcc-trade-license',
        name: 'Trade License (Khulna)',
        description: 'Business license for Khulna city',
        slaInDays: 10,
        fee: 5000,
        currency: 'BDT',
        prerequisites: ['rjsc-registration'],
        applicableFor: ['all'],
        documents: [
          { id: 'tin-cert', name: 'TIN Certificate', required: true, format: ['pdf'] },
          { id: 'rent-agreement', name: 'Office Rent Agreement', required: true, format: ['pdf'] },
        ]
      }
    ]
  }
];

/**
 * Helper functions for agency registry
 */

export function getAgencyById(agencyId: string): GovernmentAgency | undefined {
  return GOVERNMENT_AGENCIES.find(a => a.id === agencyId);
}

export function getServiceById(serviceId: string): { agency: GovernmentAgency; service: AgencyService } | undefined {
  for (const agency of GOVERNMENT_AGENCIES) {
    const service = agency.services.find(s => s.id === serviceId);
    if (service) {
      return { agency, service };
    }
  }
  return undefined;
}

export function getAgenciesByCategory(category: AgencyCategory): GovernmentAgency[] {
  return GOVERNMENT_AGENCIES.filter(a => a.category === category);
}

export function getCriticalPathAgencies(): GovernmentAgency[] {
  return GOVERNMENT_AGENCIES.filter(a => a.criticalPath);
}

export function getAllServices(): AgencyService[] {
  return GOVERNMENT_AGENCIES.flatMap(a => a.services);
}