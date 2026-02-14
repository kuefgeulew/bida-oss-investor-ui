// 💰 PAYMENT REGISTRY — Maps serviceId from agencyRegistry to payment metadata
// ARCHITECTURE: Read-only data layer. No business logic here.

export interface PaymentMetadata {
  serviceId: string;
  feeAmount: number; // in BDT
  feeType: 'fixed' | 'percentage' | 'variable';
  payableAgency: string;
  bankRoute: 'treasury' | 'direct' | 'escrow';
  description: string;
  waivableConditions?: string[];
}

/**
 * 🏛️ GOVERNMENT FEE SCHEDULE
 * Maps every service from agencyRegistry to its payment requirements
 */
export const paymentRegistry: Record<string, PaymentMetadata> = {
  // RJSC Services
  'rjsc-001': {
    serviceId: 'rjsc-001',
    feeAmount: 5000,
    feeType: 'fixed',
    payableAgency: 'RJSC',
    bankRoute: 'treasury',
    description: 'Company Registration Fee',
    waivableConditions: ['Export-oriented startup', 'Hi-tech park resident']
  },
  'rjsc-registration': { // Alternative ID mapping
    serviceId: 'rjsc-registration',
    feeAmount: 5000,
    feeType: 'fixed',
    payableAgency: 'RJSC',
    bankRoute: 'treasury',
    description: 'Company Registration Fee',
    waivableConditions: ['Export-oriented startup', 'Hi-tech park resident']
  },
  'rjsc-002': {
    serviceId: 'rjsc-002',
    feeAmount: 2000,
    feeType: 'fixed',
    payableAgency: 'RJSC',
    bankRoute: 'treasury',
    description: 'Name Clearance Certificate Fee'
  },
  'rjsc-name-clearance': { // Alternative ID mapping
    serviceId: 'rjsc-name-clearance',
    feeAmount: 2000,
    feeType: 'fixed',
    payableAgency: 'RJSC',
    bankRoute: 'treasury',
    description: 'Name Clearance Certificate Fee'
  },
  'rjsc-003': {
    serviceId: 'rjsc-003',
    feeAmount: 1500,
    feeType: 'fixed',
    payableAgency: 'RJSC',
    bankRoute: 'treasury',
    description: 'Digital Company Seal Fee'
  },

  // NBR Services
  'nbr-001': {
    serviceId: 'nbr-001',
    feeAmount: 0,
    feeType: 'fixed',
    payableAgency: 'NBR',
    bankRoute: 'direct',
    description: 'eTIN Registration (Free)'
  },
  'nbr-etin': { // Alternative ID mapping
    serviceId: 'nbr-etin',
    feeAmount: 0,
    feeType: 'fixed',
    payableAgency: 'NBR',
    bankRoute: 'direct',
    description: 'eTIN Registration (Free)'
  },
  'nbr-002': {
    serviceId: 'nbr-002',
    feeAmount: 3000,
    feeType: 'fixed',
    payableAgency: 'NBR',
    bankRoute: 'treasury',
    description: 'VAT Registration Certificate Fee'
  },
  'nbr-vat': { // Alternative ID mapping
    serviceId: 'nbr-vat',
    feeAmount: 3000,
    feeType: 'fixed',
    payableAgency: 'NBR',
    bankRoute: 'treasury',
    description: 'VAT Registration Certificate Fee'
  },
  'nbr-003': {
    serviceId: 'nbr-003',
    feeAmount: 10000,
    feeType: 'fixed',
    payableAgency: 'NBR',
    bankRoute: 'treasury',
    description: 'Import Registration Certificate (IRC) Fee'
  },
  'nbr-ebin': { // Alternative ID mapping
    serviceId: 'nbr-ebin',
    feeAmount: 0,
    feeType: 'fixed',
    payableAgency: 'NBR',
    bankRoute: 'direct',
    description: 'eBIN Registration (Free)'
  },
  'nbr-004': {
    serviceId: 'nbr-004',
    feeAmount: 8000,
    feeType: 'fixed',
    payableAgency: 'NBR',
    bankRoute: 'treasury',
    description: 'Export Registration Certificate (ERC) Fee'
  },

  // Bangladesh Bank Services
  'bb-001': {
    serviceId: 'bb-001',
    feeAmount: 0,
    feeType: 'fixed',
    payableAgency: 'Bangladesh Bank',
    bankRoute: 'direct',
    description: 'Foreign Exchange Approval (No Fee)'
  },
  'bb-002': {
    serviceId: 'bb-002',
    feeAmount: 15000,
    feeType: 'fixed',
    payableAgency: 'Bangladesh Bank',
    bankRoute: 'treasury',
    description: 'Repatriation Approval Processing Fee'
  },

  // Department of Environment (DoE)
  'doe-001': {
    serviceId: 'doe-001',
    feeAmount: 50000,
    feeType: 'variable',
    payableAgency: 'Department of Environment',
    bankRoute: 'treasury',
    description: 'Environmental Clearance Certificate Fee (Based on Project Size)'
  },
  'doe-clearance': { // Alternative ID mapping
    serviceId: 'doe-clearance',
    feeAmount: 50000,
    feeType: 'variable',
    payableAgency: 'Department of Environment',
    bankRoute: 'treasury',
    description: 'Environmental Clearance Certificate Fee (Based on Project Size)'
  },
  'doe-002': {
    serviceId: 'doe-002',
    feeAmount: 25000,
    feeType: 'fixed',
    payableAgency: 'Department of Environment',
    bankRoute: 'treasury',
    description: 'Effluent Treatment Plant (ETP) Approval Fee'
  },
  'doe-renewal': { // Alternative ID mapping
    serviceId: 'doe-renewal',
    feeAmount: 25000,
    feeType: 'fixed',
    payableAgency: 'Department of Environment',
    bankRoute: 'treasury',
    description: 'Environmental Clearance Renewal Fee'
  },

  // Fire Service and Civil Defence
  'fire-001': {
    serviceId: 'fire-001',
    feeAmount: 20000,
    feeType: 'fixed',
    payableAgency: 'Fire Service and Civil Defence',
    bankRoute: 'treasury',
    description: 'Fire Safety License Fee'
  },
  'fire-clearance': { // Alternative ID mapping
    serviceId: 'fire-clearance',
    feeAmount: 10000,
    feeType: 'fixed',
    payableAgency: 'Fire Service and Civil Defence',
    bankRoute: 'treasury',
    description: 'Fire Safety Certificate Fee'
  },
  'fire-002': {
    serviceId: 'fire-002',
    feeAmount: 15000,
    feeType: 'fixed',
    payableAgency: 'Fire Service and Civil Defence',
    bankRoute: 'treasury',
    description: 'Fire Safety Plan Approval Fee'
  },

  // Utility Connections
  'dpdc-connection': {
    serviceId: 'dpdc-connection',
    feeAmount: 150000,
    feeType: 'variable',
    payableAgency: 'DPDC',
    bankRoute: 'treasury',
    description: 'Electricity Connection Fee'
  },
  'wasa-connection': {
    serviceId: 'wasa-connection',
    feeAmount: 50000,
    feeType: 'fixed',
    payableAgency: 'WASA',
    bankRoute: 'treasury',
    description: 'Water Connection Fee'
  },
  'titas-connection': {
    serviceId: 'titas-connection',
    feeAmount: 200000,
    feeType: 'variable',
    payableAgency: 'Titas Gas',
    bankRoute: 'treasury',
    description: 'Gas Connection Fee'
  },

  // BIDA Services
  'bida-001': {
    serviceId: 'bida-001',
    feeAmount: 0,
    feeType: 'fixed',
    payableAgency: 'BIDA',
    bankRoute: 'direct',
    description: 'Investment Approval (Free for FDI)'
  },
  'bida-registration': { // Alternative ID mapping
    serviceId: 'bida-registration',
    feeAmount: 0,
    feeType: 'fixed',
    payableAgency: 'BIDA',
    bankRoute: 'direct',
    description: 'BIDA Registration (Free for FDI)'
  },
  'bida-002': {
    serviceId: 'bida-002',
    feeAmount: 5000,
    feeType: 'fixed',
    payableAgency: 'BIDA',
    bankRoute: 'treasury',
    description: 'Work Permit Processing Fee (per person)'
  },
  'bida-003': {
    serviceId: 'bida-003',
    feeAmount: 3000,
    feeType: 'fixed',
    payableAgency: 'BIDA',
    bankRoute: 'treasury',
    description: 'Visa Recommendation Letter Fee'
  },

  // Directorate General of Drug Administration (DGDA)
  'dgda-001': {
    serviceId: 'dgda-001',
    feeAmount: 100000,
    feeType: 'fixed',
    payableAgency: 'Directorate General of Drug Administration',
    bankRoute: 'treasury',
    description: 'Pharmaceutical Manufacturing License Fee'
  },
  'dgda-002': {
    serviceId: 'dgda-002',
    feeAmount: 50000,
    feeType: 'fixed',
    payableAgency: 'Directorate General of Drug Administration',
    bankRoute: 'treasury',
    description: 'Drug Import License Fee'
  },

  // Bangladesh Standards and Testing Institution (BSTI)
  'bsti-001': {
    serviceId: 'bsti-001',
    feeAmount: 30000,
    feeType: 'fixed',
    payableAgency: 'Bangladesh Standards and Testing Institution',
    bankRoute: 'treasury',
    description: 'Product Certification Fee'
  },
  'bsti-002': {
    serviceId: 'bsti-002',
    feeAmount: 25000,
    feeType: 'fixed',
    payableAgency: 'Bangladesh Standards and Testing Institution',
    bankRoute: 'treasury',
    description: 'Factory Inspection Fee'
  },

  // Department of Immigration & Passports
  'dip-001': {
    serviceId: 'dip-001',
    feeAmount: 8000,
    feeType: 'fixed',
    payableAgency: 'Department of Immigration & Passports',
    bankRoute: 'treasury',
    description: 'Work Permit (Category A) Fee'
  },
  'dip-002': {
    serviceId: 'dip-002',
    feeAmount: 5000,
    feeType: 'fixed',
    payableAgency: 'Department of Immigration & Passports',
    bankRoute: 'treasury',
    description: 'Visa Extension Fee'
  },
  'investor-visa': {
    serviceId: 'investor-visa',
    feeAmount: 10000,
    feeType: 'fixed',
    payableAgency: 'Department of Immigration & Passports',
    bankRoute: 'treasury',
    description: 'Investor Visa Fee'
  },
  'work-permit': {
    serviceId: 'work-permit',
    feeAmount: 8000,
    feeType: 'fixed',
    payableAgency: 'Department of Immigration & Passports',
    bankRoute: 'treasury',
    description: 'Work Permit Fee'
  },

  // Bangladesh Bank Services (Extended)
  'bb-fx-approval': {
    serviceId: 'bb-fx-approval',
    feeAmount: 0,
    feeType: 'fixed',
    payableAgency: 'Bangladesh Bank',
    bankRoute: 'direct',
    description: 'Foreign Exchange Approval (No Fee)'
  },

  // Land Administration
  'land-acquisition': {
    serviceId: 'land-acquisition',
    feeAmount: 50000,
    feeType: 'variable',
    payableAgency: 'Land Administration',
    bankRoute: 'treasury',
    description: 'Land Acquisition Processing Fee'
  },

  // City Corporation Services
  'trade-license': {
    serviceId: 'trade-license',
    feeAmount: 12000,
    feeType: 'fixed',
    payableAgency: 'Dhaka South City Corporation',
    bankRoute: 'treasury',
    description: 'Trade License Fee'
  },
  'building-permit': {
    serviceId: 'building-permit',
    feeAmount: 75000,
    feeType: 'variable',
    payableAgency: 'Dhaka South City Corporation',
    bankRoute: 'treasury',
    description: 'Building Construction Permit Fee'
  },
  'ccc-trade-license': {
    serviceId: 'ccc-trade-license',
    feeAmount: 10000,
    feeType: 'fixed',
    payableAgency: 'Chattogram City Corporation',
    bankRoute: 'treasury',
    description: 'Trade License Fee (Chattogram)'
  },
  'kcc-trade-license': {
    serviceId: 'kcc-trade-license',
    feeAmount: 9000,
    feeType: 'fixed',
    payableAgency: 'Khulna City Corporation',
    bankRoute: 'treasury',
    description: 'Trade License Fee (Khulna)'
  },

  // BEZA Services
  'beza-allocation': {
    serviceId: 'beza-allocation',
    feeAmount: 150000,
    feeType: 'variable',
    payableAgency: 'BEZA',
    bankRoute: 'treasury',
    description: 'Economic Zone Land Allocation Fee'
  },
  
  // BEPZA Services (Extended)
  'bepza-allocation': {
    serviceId: 'bepza-allocation',
    feeAmount: 100000,
    feeType: 'variable',
    payableAgency: 'BEPZA',
    bankRoute: 'treasury',
    description: 'EPZ Land Allocation Fee'
  },

  // Customs Services
  'import-license': {
    serviceId: 'import-license',
    feeAmount: 15000,
    feeType: 'fixed',
    payableAgency: 'Customs',
    bankRoute: 'treasury',
    description: 'Import License Fee'
  },

  // Pharmaceutical & Drug Services (Extended)
  'dgda-drug-license': {
    serviceId: 'dgda-drug-license',
    feeAmount: 100000,
    feeType: 'fixed',
    payableAgency: 'Directorate General of Drug Administration',
    bankRoute: 'treasury',
    description: 'Drug Manufacturing License Fee'
  },
  'dgda-import-license': {
    serviceId: 'dgda-import-license',
    feeAmount: 50000,
    feeType: 'fixed',
    payableAgency: 'Directorate General of Drug Administration',
    bankRoute: 'treasury',
    description: 'Drug Import License Fee'
  },

  // BSTI Services (Extended)
  'bsti-certification': {
    serviceId: 'bsti-certification',
    feeAmount: 30000,
    feeType: 'fixed',
    payableAgency: 'Bangladesh Standards and Testing Institution',
    bankRoute: 'treasury',
    description: 'Product Certification Fee'
  },

  // Factory & Industry Services
  'dife-factory-license': {
    serviceId: 'dife-factory-license',
    feeAmount: 50000,
    feeType: 'fixed',
    payableAgency: 'Department of Inspection for Factories and Establishments',
    bankRoute: 'treasury',
    description: 'Factory License Fee'
  },
  'dife-boiler-license': {
    serviceId: 'dife-boiler-license',
    feeAmount: 25000,
    feeType: 'fixed',
    payableAgency: 'Department of Inspection for Factories and Establishments',
    bankRoute: 'treasury',
    description: 'Boiler License Fee'
  },

  // Export/Import Certificates
  'ccie-irc': {
    serviceId: 'ccie-irc',
    feeAmount: 10000,
    feeType: 'fixed',
    payableAgency: 'Chief Controller of Imports & Exports',
    bankRoute: 'treasury',
    description: 'Import Registration Certificate (IRC) Fee'
  },
  'ccie-erc': {
    serviceId: 'ccie-erc',
    feeAmount: 8000,
    feeType: 'fixed',
    payableAgency: 'Chief Controller of Imports & Exports',
    bankRoute: 'treasury',
    description: 'Export Registration Certificate (ERC) Fee'
  },

  // Security Services
  'ssd-security-clearance': {
    serviceId: 'ssd-security-clearance',
    feeAmount: 0,
    feeType: 'fixed',
    payableAgency: 'Special Security Division',
    bankRoute: 'direct',
    description: 'Security Clearance (No Fee)'
  },

  // BEPZA Services
  'bepza-001': {
    serviceId: 'bepza-001',
    feeAmount: 100000,
    feeType: 'variable',
    payableAgency: 'BEPZA',
    bankRoute: 'treasury',
    description: 'EPZ Land Lease Registration Fee'
  },
  'bepza-002': {
    serviceId: 'bepza-002',
    feeAmount: 0,
    feeType: 'fixed',
    payableAgency: 'BEPZA',
    bankRoute: 'direct',
    description: 'EPZ One-Stop Service (Free)'
  },

  // Ministry of Commerce
  'moc-001': {
    serviceId: 'moc-001',
    feeAmount: 12000,
    feeType: 'fixed',
    payableAgency: 'Ministry of Commerce',
    bankRoute: 'treasury',
    description: 'Trade License Fee (Large Enterprise)'
  },
  'moc-002': {
    serviceId: 'moc-002',
    feeAmount: 5000,
    feeType: 'fixed',
    payableAgency: 'Ministry of Commerce',
    bankRoute: 'treasury',
    description: 'Business Identification Number (BIN) Fee'
  }
};

/**
 * Get payment metadata for a service
 */
export function getPaymentInfo(serviceId: string): PaymentMetadata | null {
  return paymentRegistry[serviceId] || null;
}

/**
 * Calculate total fees for multiple services
 */
export function calculateTotalFees(serviceIds: string[]): number {
  return serviceIds.reduce((total, serviceId) => {
    const payment = getPaymentInfo(serviceId);
    return total + (payment?.feeAmount || 0);
  }, 0);
}

/**
 * Check if a service has a fee
 */
export function hasFee(serviceId: string): boolean {
  const payment = getPaymentInfo(serviceId);
  return payment ? payment.feeAmount > 0 : false;
}

/**
 * Get all paid services for a payment batch
 */
export function getPaidServices(serviceIds: string[]): PaymentMetadata[] {
  return serviceIds
    .map(id => getPaymentInfo(id))
    .filter((p): p is PaymentMetadata => p !== null && p.feeAmount > 0);
}