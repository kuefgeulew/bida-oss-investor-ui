/**
 * 🌍 MOCK OFFICER UNIVERSE
 * 
 * Single source of truth for ALL Officer demo data.
 * Every Officer tab reads from this universe to maintain perfect consistency.
 * 
 * This creates a believable demo world where:
 * - Same applications appear across all tabs
 * - Communications match applications
 * - Delays match intelligence reports
 * - VIP cases match special case tabs
 * - Post-approval data matches approved applications
 */

import { 
  OfficerApplication, 
  Officer, 
  Communication, 
  AgencyPerformance, 
  PostApprovalTracking,
  OfficerMessage 
} from './officerDataEngine';

// ============================================================================
// CORE MOCK DATA UNIVERSE
// ============================================================================

/**
 * 20 Rich Applications - The Heart of the Demo Universe
 * Covers all sectors, stages, countries, and special cases
 */
export const MOCK_APPLICATIONS: OfficerApplication[] = [
  // APP-001: Standard case - Textile, pending fire docs
  {
    id: 'APP-2026-001',
    investorName: 'John Smith',
    investorEmail: 'john.smith@globaltext.com',
    companyName: 'Global Textiles Ltd',
    sector: 'Textile & Garment',
    country: 'United States',
    investmentAmount: 5000000,
    zone: 'BEPZA',
    status: 'under_review',
    submittedDate: '2026-01-15',
    slaDeadline: '2026-03-15',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Fire Layout Plan', status: 'missing' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' }
    ],
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'pending',
      fire: 'not_required'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 25,
    currentStep: 'bida_initial_review',
    assignedOfficer: 'Ahmed Khan',
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-002: VIP case - Large Chinese manufacturing
  {
    id: 'APP-2026-002',
    investorName: 'Li Wei',
    investorEmail: 'li.wei@dragonmfg.cn',
    companyName: 'Dragon Manufacturing Co',
    sector: 'Manufacturing',
    country: 'China',
    investmentAmount: 15000000,
    zone: 'BEZA',
    status: 'under_review',
    submittedDate: '2026-01-20',
    slaDeadline: '2026-03-20',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Environmental Impact', status: 'approved' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' }
    ],
    approvals: {
      rjsc: 'approved',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'approved',
      fire: 'pending'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 35,
    currentStep: 'agency_approvals',
    assignedOfficer: 'Ahmed Khan',
    isVIP: true,
    hasSourceOfFundsDocs: true,
    ownershipLayers: 2,
    hasOffshoreEntity: true,
    hasNomineeShareholders: false
  },

  // APP-003: Problem case - Stuck for 90 days at RJSC
  {
    id: 'APP-2026-003',
    investorName: 'Sarah Johnson',
    investorEmail: 'sarah.j@healthtech.uk',
    companyName: 'HealthTech Solutions',
    sector: 'Pharmaceutical',
    country: 'United Kingdom',
    investmentAmount: 8000000,
    zone: 'General',
    status: 'under_review',
    submittedDate: '2025-11-10',
    slaDeadline: '2026-01-10',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Drug Manufacturing License', status: 'pending' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' }
    ],
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'pending',
      fire: 'not_required'
    },
    paymentReceived: true,
    uboComplete: false,
    riskScore: 45,
    currentStep: 'bida_detailed_review',
    assignedOfficer: 'Dr. Rahman Ali',
    isProblem: true,
    problemReason: 'Stuck for 90 days - RJSC approval bottleneck',
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-004: Emergency case - Strategic energy project
  {
    id: 'APP-2026-004',
    investorName: 'Ahmed Al-Rashid',
    investorEmail: 'ahmed.rashid@gulfenergy.ae',
    companyName: 'Gulf Energy Investments',
    sector: 'Energy & Power',
    country: 'UAE',
    investmentAmount: 25000000,
    zone: 'BEZA',
    status: 'under_review',
    submittedDate: '2026-02-01',
    slaDeadline: '2026-04-01',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Environmental Impact', status: 'approved' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' }
    ],
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'approved',
      fire: 'not_required'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 30,
    currentStep: 'bida_initial_review',
    assignedOfficer: 'Sultana Begum',
    isEmergency: true,
    emergencyReason: 'Strategic national energy project - government priority',
    isStrategicSector: true,
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-005: Early stage - Awaiting payment
  {
    id: 'APP-2026-005',
    investorName: 'Marie Dubois',
    investorEmail: 'marie.d@frenchfashion.fr',
    companyName: 'French Fashion Exports',
    sector: 'Textile & Garment',
    country: 'France',
    investmentAmount: 3000000,
    zone: 'General',
    status: 'pending',
    submittedDate: '2026-02-03',
    slaDeadline: '2026-04-03',
    documents: [
      { name: 'Business Plan', status: 'pending' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'pending' }
    ],
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'not_required',
      fire: 'not_required'
    },
    paymentReceived: false,
    uboComplete: true,
    riskScore: 15,
    currentStep: 'document_submission',
    assignedOfficer: 'Ahmed Khan',
    hasSourceOfFundsDocs: false,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-006: Approved - Now in post-approval tracking
  {
    id: 'APP-2025-078',
    investorName: 'Raj Kumar',
    investorEmail: 'raj.kumar@techinnovations.in',
    companyName: 'Tech Innovations Inc',
    sector: 'IT & Software',
    country: 'India',
    investmentAmount: 800000,
    zone: 'General',
    status: 'approved',
    submittedDate: '2025-10-01',
    slaDeadline: '2025-12-01',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' },
      { name: 'IT Security Clearance', status: 'approved' }
    ],
    approvals: {
      rjsc: 'approved',
      nbr: 'approved',
      bangladeshBank: 'approved',
      environment: 'not_required',
      fire: 'not_required'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 18,
    currentStep: 'approved',
    assignedOfficer: 'Ahmed Khan',
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-007: High risk - Offshore entity, multiple layers
  {
    id: 'APP-2026-007',
    investorName: 'Vladimir Petrov',
    investorEmail: 'v.petrov@easterntrading.ru',
    companyName: 'Eastern Trading International',
    sector: 'Import/Export',
    country: 'Russia',
    investmentAmount: 4500000,
    zone: 'General',
    status: 'under_review',
    submittedDate: '2026-01-28',
    slaDeadline: '2026-03-28',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'under review' },
      { name: 'UBO Declaration', status: 'missing' }
    ],
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'not_required',
      fire: 'not_required'
    },
    paymentReceived: true,
    uboComplete: false,
    riskScore: 72,
    currentStep: 'risk_assessment',
    assignedOfficer: 'Fatima Ahmed',
    onSanctionsList: false,
    hasPEP: true,
    hasAdverseMedia: false,
    shellCompanyIndicators: 2,
    highRiskJurisdictions: 1,
    isCashHeavy: false,
    ownershipLayers: 4,
    hasOffshoreEntity: true,
    hasNomineeShareholders: true,
    hasSourceOfFundsDocs: false
  },

  // APP-008: VIP + Fast moving - Japanese automotive
  {
    id: 'APP-2026-008',
    investorName: 'Yuki Tanaka',
    investorEmail: 'y.tanaka@japanauto.jp',
    companyName: 'Japan Auto Components Ltd',
    sector: 'Automotive',
    country: 'Japan',
    investmentAmount: 18000000,
    zone: 'BEZA',
    status: 'under_review',
    submittedDate: '2026-01-25',
    slaDeadline: '2026-03-25',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Environmental Impact', status: 'approved' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' },
      { name: 'Technical Certifications', status: 'approved' }
    ],
    approvals: {
      rjsc: 'approved',
      nbr: 'approved',
      bangladeshBank: 'pending',
      environment: 'approved',
      fire: 'approved'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 12,
    currentStep: 'final_approval',
    assignedOfficer: 'Mohammad Khan',
    isVIP: true,
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-009: Pharmaceutical - Complex licensing
  {
    id: 'APP-2026-009',
    investorName: 'Dr. Hans Mueller',
    investorEmail: 'h.mueller@pharmglobal.de',
    companyName: 'Pharma Global GmbH',
    sector: 'Pharmaceutical',
    country: 'Germany',
    investmentAmount: 12000000,
    zone: 'General',
    status: 'under_review',
    submittedDate: '2026-01-18',
    slaDeadline: '2026-03-18',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Drug Manufacturing License', status: 'pending' },
      { name: 'GMP Certification', status: 'pending' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' }
    ],
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'pending',
      fire: 'pending'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 28,
    currentStep: 'specialized_approvals',
    assignedOfficer: 'Dr. Rahman Ali',
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-010: Approved - Renewable energy (in post-approval)
  {
    id: 'APP-2025-065',
    investorName: 'Erik Johansson',
    investorEmail: 'e.johansson@greenenergy.se',
    companyName: 'Green Energy Corp',
    sector: 'Renewable Energy',
    country: 'Sweden',
    investmentAmount: 15000000,
    zone: 'BEZA',
    status: 'approved',
    submittedDate: '2025-09-15',
    slaDeadline: '2025-11-15',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Environmental Impact', status: 'approved' },
      { name: 'Land Allocation', status: 'approved' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' }
    ],
    approvals: {
      rjsc: 'approved',
      nbr: 'approved',
      bangladeshBank: 'approved',
      environment: 'approved',
      fire: 'approved'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 8,
    currentStep: 'approved',
    assignedOfficer: 'Sultana Begum',
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-011: Food processing - Fire safety focus
  {
    id: 'APP-2026-011',
    investorName: 'Carlos Rodriguez',
    investorEmail: 'c.rodriguez@foodexport.es',
    companyName: 'Mediterranean Foods Ltd',
    sector: 'Food Processing',
    country: 'Spain',
    investmentAmount: 6000000,
    zone: 'BEPZA',
    status: 'under_review',
    submittedDate: '2026-01-22',
    slaDeadline: '2026-03-22',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Fire Safety Plan', status: 'pending' },
      { name: 'Health Certification', status: 'approved' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' }
    ],
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'pending',
      fire: 'pending'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 22,
    currentStep: 'agency_approvals',
    assignedOfficer: 'Ahmed Khan',
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-012: Electronics - Korean investment
  {
    id: 'APP-2026-012',
    investorName: 'Kim Min-jun',
    investorEmail: 'k.minjun@koreatech.kr',
    companyName: 'Korea Electronics Hub',
    sector: 'Electronics',
    country: 'South Korea',
    investmentAmount: 20000000,
    zone: 'BEZA',
    status: 'under_review',
    submittedDate: '2026-01-30',
    slaDeadline: '2026-03-30',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Environmental Impact', status: 'approved' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' }
    ],
    approvals: {
      rjsc: 'approved',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'approved',
      fire: 'pending'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 16,
    currentStep: 'agency_approvals',
    assignedOfficer: 'Mohammad Khan',
    isVIP: true,
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-013: Rejected case - Failed compliance
  {
    id: 'APP-2026-013',
    investorName: 'Marcus Brown',
    investorEmail: 'm.brown@quickbiz.com',
    companyName: 'Quick Ventures Inc',
    sector: 'Trading',
    country: 'Unknown',
    investmentAmount: 500000,
    zone: 'General',
    status: 'rejected',
    submittedDate: '2026-01-05',
    slaDeadline: '2026-03-05',
    documents: [
      { name: 'Business Plan', status: 'rejected' },
      { name: 'Passport Copy', status: 'missing' },
      { name: 'Financial Statements', status: 'rejected' }
    ],
    approvals: {
      rjsc: 'rejected',
      nbr: 'rejected',
      bangladeshBank: 'rejected',
      environment: 'not_required',
      fire: 'not_required'
    },
    paymentReceived: false,
    uboComplete: false,
    riskScore: 95,
    currentStep: 'rejected',
    assignedOfficer: 'Fatima Ahmed',
    onSanctionsList: true,
    hasPEP: false,
    hasAdverseMedia: true,
    shellCompanyIndicators: 5,
    highRiskJurisdictions: 3,
    isCashHeavy: true,
    ownershipLayers: 8,
    hasOffshoreEntity: true,
    hasNomineeShareholders: true,
    hasSourceOfFundsDocs: false
  },

  // APP-014: Leather goods - Bangladesh traditional
  {
    id: 'APP-2026-014',
    investorName: 'Antonio Rossi',
    investorEmail: 'a.rossi@italianleather.it',
    companyName: 'Italian Leather Goods',
    sector: 'Leather & Footwear',
    country: 'Italy',
    investmentAmount: 4000000,
    zone: 'General',
    status: 'under_review',
    submittedDate: '2026-02-02',
    slaDeadline: '2026-04-02',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Environmental Impact', status: 'pending' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' }
    ],
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'pending',
      fire: 'not_required'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 20,
    currentStep: 'bida_initial_review',
    assignedOfficer: 'Ahmed Khan',
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-015: IT Services - Small but clean
  {
    id: 'APP-2026-015',
    investorName: 'Priya Sharma',
    investorEmail: 'p.sharma@itservices.in',
    companyName: 'Global IT Services',
    sector: 'IT & Software',
    country: 'India',
    investmentAmount: 1200000,
    zone: 'General',
    status: 'under_review',
    submittedDate: '2026-01-26',
    slaDeadline: '2026-03-26',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' }
    ],
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'not_required',
      fire: 'not_required'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 14,
    currentStep: 'agency_approvals',
    assignedOfficer: 'Ahmed Khan',
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-016: Approved - Now delayed in implementation
  {
    id: 'APP-2025-089',
    investorName: 'Michael Chen',
    investorEmail: 'm.chen@pharmaplus.sg',
    companyName: 'Pharma Plus Industries',
    sector: 'Pharmaceutical',
    country: 'Singapore',
    investmentAmount: 12000000,
    zone: 'General',
    status: 'approved',
    submittedDate: '2025-10-10',
    slaDeadline: '2025-12-10',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Drug Manufacturing License', status: 'approved' },
      { name: 'GMP Certification', status: 'approved' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' }
    ],
    approvals: {
      rjsc: 'approved',
      nbr: 'approved',
      bangladeshBank: 'approved',
      environment: 'approved',
      fire: 'approved'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 24,
    currentStep: 'approved',
    assignedOfficer: 'Dr. Rahman Ali',
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-017: Chemical processing - Environment heavy
  {
    id: 'APP-2026-017',
    investorName: 'Jan Bakker',
    investorEmail: 'j.bakker@dutchchem.nl',
    companyName: 'Dutch Chemical Industries',
    sector: 'Chemicals',
    country: 'Netherlands',
    investmentAmount: 9000000,
    zone: 'BEZA',
    status: 'under_review',
    submittedDate: '2026-01-12',
    slaDeadline: '2026-03-12',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Environmental Impact', status: 'under review' },
      { name: 'Hazmat Certification', status: 'pending' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' }
    ],
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'pending',
      fire: 'pending'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 38,
    currentStep: 'environment_review',
    assignedOfficer: 'Sultana Begum',
    isProblem: true,
    problemReason: 'Environment clearance taking 45+ days',
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-018: Agro processing - Local sourcing
  {
    id: 'APP-2026-018',
    investorName: 'Thomas Wilson',
    investorEmail: 't.wilson@agroexport.au',
    companyName: 'Australian Agro Exports',
    sector: 'Agriculture',
    country: 'Australia',
    investmentAmount: 7000000,
    zone: 'General',
    status: 'under_review',
    submittedDate: '2026-01-29',
    slaDeadline: '2026-03-29',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Agricultural License', status: 'pending' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' }
    ],
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'pending',
      fire: 'not_required'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 19,
    currentStep: 'bida_initial_review',
    assignedOfficer: 'Mohammad Khan',
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-019: Tourism - Hotel chain
  {
    id: 'APP-2026-019',
    investorName: 'Fatima Al-Mansouri',
    investorEmail: 'f.mansouri@luxuryhotels.ae',
    companyName: 'Luxury Hotels International',
    sector: 'Tourism & Hospitality',
    country: 'UAE',
    investmentAmount: 30000000,
    zone: 'General',
    status: 'under_review',
    submittedDate: '2026-02-04',
    slaDeadline: '2026-04-04',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Fire Safety Plan', status: 'approved' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' },
      { name: 'Tourism License', status: 'pending' }
    ],
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'pending',
      fire: 'approved'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 21,
    currentStep: 'bida_initial_review',
    assignedOfficer: 'Sultana Begum',
    isVIP: true,
    hasSourceOfFundsDocs: true,
    ownershipLayers: 2,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  },

  // APP-020: Logistics - Infrastructure heavy
  {
    id: 'APP-2026-020',
    investorName: 'Mohammed Hassan',
    investorEmail: 'm.hassan@logistics.sa',
    companyName: 'Gulf Logistics Solutions',
    sector: 'Logistics',
    country: 'Saudi Arabia',
    investmentAmount: 10000000,
    zone: 'BEPZA',
    status: 'pending',
    submittedDate: '2026-02-03',
    slaDeadline: '2026-04-03',
    documents: [
      { name: 'Business Plan', status: 'pending' },
      { name: 'Land Allocation', status: 'pending' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'pending' }
    ],
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'pending',
      fire: 'not_required'
    },
    paymentReceived: false,
    uboComplete: true,
    riskScore: 26,
    currentStep: 'document_submission',
    assignedOfficer: 'Mohammad Khan',
    hasSourceOfFundsDocs: true,
    ownershipLayers: 1,
    hasOffshoreEntity: false,
    hasNomineeShareholders: false
  }
];

/**
 * 5 Officers - The People Behind the System
 */
export const MOCK_OFFICERS: Officer[] = [
  {
    id: 'OFF-001',
    name: 'Ahmed Khan',
    email: 'officer@bida.gov.bd',
    department: 'Investment Services',
    role: 'Senior Officer',
    expertise: ['Textile & Garment', 'Manufacturing', 'BEZA Projects'],
    languages: ['English', 'Bengali', 'Hindi'],
    certifications: ['BIDA Level 2', 'FDI Specialist', 'Compliance Officer'],
    experience: '5 years',
    successRate: 92,
    avgResponseTime: '< 2 hours',
    totalApplications: 156,
    specialSkills: ['Environmental Clearance', 'Fire Safety', 'Land Allocation'],
    available: true,
    workload: 12
  },
  {
    id: 'OFF-002',
    name: 'Dr. Rahman Ali',
    email: 'rahman.ali@bida.gov.bd',
    department: 'Investment Services',
    role: 'Senior Officer',
    expertise: ['Pharmaceutical', 'Healthcare', 'Medical Devices'],
    languages: ['English', 'Bengali'],
    certifications: ['BIDA Level 3', 'Healthcare Specialist'],
    experience: '8 years',
    successRate: 95,
    avgResponseTime: '< 1 hour',
    totalApplications: 203,
    specialSkills: ['Drug Licensing', 'FDA Compliance', 'Clinical Trials'],
    available: true,
    workload: 15
  },
  {
    id: 'OFF-003',
    name: 'Sultana Begum',
    email: 'sultana.b@bida.gov.bd',
    department: 'Legal & Compliance',
    role: 'Legal Officer',
    expertise: ['Legal Review', 'Contracts', 'Compliance'],
    languages: ['English', 'Bengali', 'Arabic'],
    certifications: ['BIDA Level 2', 'Legal Compliance'],
    experience: '6 years',
    successRate: 89,
    avgResponseTime: '< 3 hours',
    totalApplications: 142,
    specialSkills: ['Contract Review', 'Regulatory Compliance', 'Arbitration'],
    available: true,
    workload: 8
  },
  {
    id: 'OFF-004',
    name: 'Mohammad Khan',
    email: 'm.khan@bida.gov.bd',
    department: 'Sector Analysis',
    role: 'Sector Specialist',
    expertise: ['Textile', 'Automotive', 'Electronics'],
    languages: ['English', 'Bengali', 'Japanese'],
    certifications: ['BIDA Level 2', 'Sector Analysis'],
    experience: '4 years',
    successRate: 88,
    avgResponseTime: '< 2 hours',
    totalApplications: 98,
    specialSkills: ['Market Analysis', 'Supply Chain', 'Export Planning'],
    available: false,
    workload: 18
  },
  {
    id: 'OFF-005',
    name: 'Fatima Ahmed',
    email: 'f.ahmed@bida.gov.bd',
    department: 'Finance & Banking',
    role: 'Finance Officer',
    expertise: ['Banking', 'Finance', 'Foreign Exchange'],
    languages: ['English', 'Bengali', 'Urdu'],
    certifications: ['BIDA Level 2', 'Finance Specialist', 'AML Certified'],
    experience: '7 years',
    successRate: 91,
    avgResponseTime: '< 2 hours',
    totalApplications: 178,
    specialSkills: ['FX Approval', 'Risk Assessment', 'Banking Coordination'],
    available: true,
    workload: 13
  }
];

/**
 * Communications - Linked to Real Applications
 */
export const MOCK_COMMUNICATIONS: Communication[] = [
  {
    id: 1,
    channel: 'email',
    from: 'Ahmed Khan',
    to: 'john.smith@globaltext.com',
    subject: 'Additional Fire Safety Documents Required',
    timestamp: '2 hours ago',
    status: 'sent',
    applicationId: 'APP-2026-001'
  },
  {
    id: 2,
    channel: 'phone',
    from: 'Ahmed Khan',
    to: 'John Smith',
    subject: 'Fire safety layout clarification',
    timestamp: '1 day ago',
    status: 'completed',
    duration: '12 min',
    applicationId: 'APP-2026-001'
  },
  {
    id: 3,
    channel: 'email',
    from: 'Ahmed Khan',
    to: 'li.wei@dragonmfg.cn',
    subject: 'VIP Application - Progress Update',
    timestamp: '3 hours ago',
    status: 'sent',
    applicationId: 'APP-2026-002'
  },
  {
    id: 4,
    channel: 'whatsapp',
    from: 'Ahmed Khan',
    to: 'Li Wei',
    subject: 'Quick update on NBR approval',
    timestamp: '5 hours ago',
    status: 'read',
    applicationId: 'APP-2026-002'
  },
  {
    id: 5,
    channel: 'email',
    from: 'Dr. Rahman Ali',
    to: 'sarah.j@healthtech.uk',
    subject: 'URGENT: RJSC Bottleneck - Action Required',
    timestamp: '1 day ago',
    status: 'read',
    applicationId: 'APP-2026-003'
  },
  {
    id: 6,
    channel: 'phone',
    from: 'Dr. Rahman Ali',
    to: 'Sarah Johnson',
    subject: 'Drug license clarification call',
    timestamp: '3 days ago',
    status: 'completed',
    duration: '25 min',
    applicationId: 'APP-2026-003'
  },
  {
    id: 7,
    channel: 'email',
    from: 'Sultana Begum',
    to: 'ahmed.rashid@gulfenergy.ae',
    subject: 'STRATEGIC PROJECT - Fast Track Approved',
    timestamp: '4 hours ago',
    status: 'sent',
    applicationId: 'APP-2026-004'
  },
  {
    id: 8,
    channel: 'portal',
    from: 'Sultana Begum',
    to: 'Ahmed Al-Rashid',
    subject: 'Environment approval completed',
    timestamp: '1 day ago',
    status: 'read',
    applicationId: 'APP-2026-004'
  },
  {
    id: 9,
    channel: 'email',
    from: 'Ahmed Khan',
    to: 'marie.d@frenchfashion.fr',
    subject: 'Payment Reminder - Application on Hold',
    timestamp: '6 hours ago',
    status: 'sent',
    applicationId: 'APP-2026-005'
  },
  {
    id: 10,
    channel: 'email',
    from: 'Mohammad Khan',
    to: 'y.tanaka@japanauto.jp',
    subject: 'Bangladesh Bank approval expected this week',
    timestamp: '2 hours ago',
    status: 'sent',
    applicationId: 'APP-2026-008'
  },
  {
    id: 11,
    channel: 'phone',
    from: 'Mohammad Khan',
    to: 'Yuki Tanaka',
    subject: 'VIP coordination call',
    timestamp: '1 day ago',
    status: 'completed',
    duration: '18 min',
    applicationId: 'APP-2026-008'
  },
  {
    id: 12,
    channel: 'email',
    from: 'Dr. Rahman Ali',
    to: 'h.mueller@pharmglobal.de',
    subject: 'Drug Manufacturing License - Additional Info Needed',
    timestamp: '5 hours ago',
    status: 'sent',
    applicationId: 'APP-2026-009'
  },
  {
    id: 13,
    channel: 'email',
    from: 'Fatima Ahmed',
    to: 'v.petrov@easterntrading.ru',
    subject: 'URGENT: UBO Declaration Required for Risk Review',
    timestamp: '1 day ago',
    status: 'sent',
    applicationId: 'APP-2026-007'
  },
  {
    id: 14,
    channel: 'portal',
    from: 'Fatima Ahmed',
    to: 'Vladimir Petrov',
    subject: 'Additional source of funds documentation',
    timestamp: '3 days ago',
    status: 'read',
    applicationId: 'APP-2026-007'
  },
  {
    id: 15,
    channel: 'email',
    from: 'Ahmed Khan',
    to: 'c.rodriguez@foodexport.es',
    subject: 'Fire Safety Plan Review in Progress',
    timestamp: '8 hours ago',
    status: 'sent',
    applicationId: 'APP-2026-011'
  }
];

/**
 * Agency Performance Stats - Realistic Numbers
 */
export const MOCK_AGENCY_STATS: AgencyPerformance[] = [
  {
    agency: 'RJSC',
    fullName: 'Registrar of Joint Stock Companies',
    avgDays: 14,
    slaCompliance: 82,
    currentBacklog: 234
  },
  {
    agency: 'NBR',
    fullName: 'National Board of Revenue',
    avgDays: 9,
    slaCompliance: 91,
    currentBacklog: 145
  },
  {
    agency: 'Bangladesh Bank',
    fullName: 'Central Bank - FX Approval',
    avgDays: 18,
    slaCompliance: 68,
    currentBacklog: 89
  },
  {
    agency: 'DoE',
    fullName: 'Department of Environment',
    avgDays: 22,
    slaCompliance: 71,
    currentBacklog: 312
  },
  {
    agency: 'Fire Service',
    fullName: 'Fire Service & Civil Defense',
    avgDays: 8,
    slaCompliance: 94,
    currentBacklog: 67
  }
];

/**
 * Post-Approval Tracking - Matches Approved Applications
 */
export const MOCK_POST_APPROVAL: PostApprovalTracking[] = [
  {
    id: 'APP-2025-078',
    companyName: 'Tech Innovations Inc',
    sector: 'IT & Software',
    approvalDate: '2025-12-15',
    investmentAmount: 800000,
    implementationStatus: 'On Track',
    completion: 75,
    milestones: [
      { task: 'Office Space Secured', status: 'completed', date: '2026-01-10' },
      { task: 'First 10 Employees Hired', status: 'completed', date: '2026-01-20' },
      { task: 'Equipment Procurement', status: 'in-progress', date: '2026-02-15' },
      { task: 'Full Operations Launch', status: 'pending', date: '2026-03-01' }
    ],
    metrics: {
      jobsCreated: 10,
      targetJobs: 50,
      investmentDisbursed: 600000,
      totalInvestment: 800000
    }
  },
  {
    id: 'APP-2025-065',
    companyName: 'Green Energy Corp',
    sector: 'Renewable Energy',
    approvalDate: '2025-11-20',
    investmentAmount: 15000000,
    implementationStatus: 'Completed',
    completion: 100,
    milestones: [
      { task: 'Land Acquisition', status: 'completed', date: '2025-12-01' },
      { task: 'Construction Phase 1', status: 'completed', date: '2025-12-20' },
      { task: 'Equipment Installation', status: 'completed', date: '2026-01-10' },
      { task: 'Grid Connection', status: 'completed', date: '2026-01-20' }
    ],
    metrics: {
      jobsCreated: 120,
      targetJobs: 100,
      investmentDisbursed: 15000000,
      totalInvestment: 15000000
    }
  },
  {
    id: 'APP-2025-089',
    companyName: 'Pharma Plus Industries',
    sector: 'Pharmaceutical',
    approvalDate: '2025-12-28',
    investmentAmount: 12000000,
    implementationStatus: 'Delayed',
    completion: 35,
    milestones: [
      { task: 'Factory Site Preparation', status: 'completed', date: '2026-01-05' },
      { task: 'Import Drug Manufacturing License', status: 'in-progress', date: 'TBD' },
      { task: 'Equipment Import Clearance', status: 'pending', date: 'TBD' },
      { task: 'Production Launch', status: 'pending', date: 'TBD' }
    ],
    metrics: {
      jobsCreated: 15,
      targetJobs: 200,
      investmentDisbursed: 4200000,
      totalInvestment: 12000000
    }
  }
];

/**
 * Officer Collaboration Messages - Linked to Applications
 */
export const MOCK_OFFICER_MESSAGES: OfficerMessage[] = [
  {
    id: 1,
    officer: 'Mohammad Khan',
    message: 'Environmental docs for APP-001 look good, proceeding with review',
    timestamp: '2 hours ago',
    avatar: 'MK',
    applicationId: 'APP-2026-001'
  },
  {
    id: 2,
    officer: 'Dr. Rahman Ali',
    message: 'Fire safety checklist needs update - investor submitted old format',
    timestamp: '5 hours ago',
    avatar: 'RA',
    applicationId: 'APP-2026-001'
  },
  {
    id: 3,
    officer: 'Sultana Begum',
    message: 'VIP case APP-002 - coordinating with Bangladesh Bank for fast track',
    timestamp: '3 hours ago',
    avatar: 'SB',
    applicationId: 'APP-2026-002'
  },
  {
    id: 4,
    officer: 'Fatima Ahmed',
    message: 'Risk assessment complete for APP-002. Score: 35 (moderate)',
    timestamp: '1 day ago',
    avatar: 'FA',
    applicationId: 'APP-2026-002'
  },
  {
    id: 5,
    officer: 'Mohammad Khan',
    message: 'APP-003 stuck at RJSC for 90 days. Escalating to director level.',
    timestamp: '2 days ago',
    avatar: 'MK',
    applicationId: 'APP-2026-003'
  },
  {
    id: 6,
    officer: 'Dr. Rahman Ali',
    message: 'Pharma license for APP-003 is complex. Coordinating with regulatory.',
    timestamp: '3 days ago',
    avatar: 'RA',
    applicationId: 'APP-2026-003'
  },
  {
    id: 7,
    officer: 'Ahmed Khan',
    message: 'Emergency case APP-004 approved for fast-track by CEO',
    timestamp: '4 hours ago',
    avatar: 'AK',
    applicationId: 'APP-2026-004'
  },
  {
    id: 8,
    officer: 'Fatima Ahmed',
    message: 'High risk case APP-007 - UBO declaration still missing after 3 reminders',
    timestamp: '1 day ago',
    avatar: 'FA',
    applicationId: 'APP-2026-007'
  },
  {
    id: 9,
    officer: 'Mohammad Khan',
    message: 'APP-008 moving fast! All agency approvals on track for VIP status.',
    timestamp: '2 hours ago',
    avatar: 'MK',
    applicationId: 'APP-2026-008'
  },
  {
    id: 10,
    officer: 'Sultana Begum',
    message: 'Environment clearance for APP-017 delayed. DoE backlog issue.',
    timestamp: '6 hours ago',
    avatar: 'SB',
    applicationId: 'APP-2026-017'
  }
];
