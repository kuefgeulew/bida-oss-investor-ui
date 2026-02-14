// Comprehensive Mock Data for Admin Dashboard

export const comprehensiveMockApplications = [
  {
    id: 'APP-2026-001',
    companyName: 'Global Textiles Ltd',
    investorName: 'John Smith',
    investorEmail: 'john@globaltextiles.com',
    sector: 'Textile & Garment',
    country: 'United States',
    investmentAmount: 5000000,
    status: 'under_review',
    submittedDate: '2026-01-15',
    slaDeadline: '2026-03-15',
    approvalDate: null,
    assignedOfficer: 'Ahmed Khan',
    currentStep: 'Bangladesh Bank FX Approval',
    daysInCurrentStage: 12,
    isStrategicSector: false,
    approvals: { 
      rjsc: 'approved', 
      nbr: 'approved', 
      bangladeshBank: 'pending',
      environment: 'pending',
      fire: 'approved'
    },
    stageDurations: {
      rjsc: 8,
      nbr: 6,
      bangladeshBank: 12,
      fire: 5
    }
  },
  {
    id: 'APP-2026-002',
    companyName: 'Shanghai Pharma BD',
    investorName: 'Li Wei',
    investorEmail: 'li@shanghaipharma.cn',
    sector: 'Pharmaceutical',
    country: 'China',
    investmentAmount: 12000000,
    status: 'under_review',
    submittedDate: '2026-01-20',
    slaDeadline: '2026-04-20',
    approvalDate: null,
    assignedOfficer: 'Ahmed Khan',
    currentStep: 'Drug Administration',
    daysInCurrentStage: 18,
    isStrategicSector: true,
    approvals: { 
      rjsc: 'approved', 
      nbr: 'pending',
      bangladeshBank: 'approved',
      drugAdmin: 'pending'
    },
    stageDurations: {
      rjsc: 10,
      bangladeshBank: 14,
      drugAdmin: 18
    }
  },
  {
    id: 'APP-2026-003',
    companyName: 'Tech Innovations Inc',
    investorName: 'Emma Johnson',
    investorEmail: 'emma@techinnovations.uk',
    sector: 'IT & Software',
    country: 'United Kingdom',
    investmentAmount: 800000,
    status: 'approved',
    submittedDate: '2026-01-05',
    slaDeadline: '2026-02-05',
    approvalDate: '2026-01-28',
    assignedOfficer: 'Fatima Rahman',
    currentStep: 'Completed',
    daysInCurrentStage: 0,
    isStrategicSector: true,
    approvals: { 
      rjsc: 'approved', 
      nbr: 'approved', 
      bangladeshBank: 'approved',
      bida_final: 'approved'
    },
    stageDurations: {
      rjsc: 7,
      nbr: 5,
      bangladeshBank: 8,
      bida_final: 3
    }
  },
  {
    id: 'APP-2026-004',
    companyName: 'Green Energy Solutions',
    investorName: 'Hans Mueller',
    investorEmail: 'hans@greenenergy.de',
    sector: 'Renewable Energy',
    country: 'Germany',
    investmentAmount: 25000000,
    status: 'under_review',
    submittedDate: '2026-01-10',
    slaDeadline: '2026-04-15',
    approvalDate: null,
    assignedOfficer: 'Dr. Rahman',
    currentStep: 'Environmental Clearance',
    daysInCurrentStage: 25,
    isStrategicSector: true,
    approvals: { 
      rjsc: 'approved', 
      nbr: 'approved',
      bangladeshBank: 'approved',
      environment: 'pending'
    },
    stageDurations: {
      rjsc: 9,
      nbr: 7,
      bangladeshBank: 11,
      environment: 25
    }
  },
  {
    id: 'APP-2026-005',
    companyName: 'Korea Manufacturing Co',
    investorName: 'Park Min-jun',
    investorEmail: 'park@koreaman.kr',
    sector: 'Manufacturing',
    country: 'South Korea',
    investmentAmount: 8500000,
    status: 'pending',
    submittedDate: '2026-01-28',
    slaDeadline: '2026-04-28',
    approvalDate: null,
    assignedOfficer: 'Ms. Sultana',
    currentStep: 'RJSC Company Registration',
    daysInCurrentStage: 7,
    isStrategicSector: false,
    approvals: { 
      rjsc: 'pending', 
      nbr: 'not_started',
      bangladeshBank: 'not_started'
    },
    stageDurations: {
      rjsc: 7
    }
  },
  {
    id: 'APP-2026-006',
    companyName: 'Dubai Real Estate Ltd',
    investorName: 'Ahmed Al-Maktoum',
    investorEmail: 'ahmed@dubairealestate.ae',
    sector: 'Real Estate',
    country: 'UAE',
    investmentAmount: 15000000,
    status: 'rejected',
    submittedDate: '2025-12-20',
    slaDeadline: '2026-02-20',
    approvalDate: null,
    assignedOfficer: 'Ahmed Khan',
    currentStep: 'Rejected',
    daysInCurrentStage: 0,
    isStrategicSector: false,
    approvals: { 
      rjsc: 'approved', 
      nbr: 'rejected',
      bangladeshBank: 'pending'
    },
    stageDurations: {
      rjsc: 12,
      nbr: 15
    }
  },
  {
    id: 'APP-2026-007',
    companyName: 'Tokyo Electronics',
    investorName: 'Yuki Tanaka',
    investorEmail: 'yuki@tokyoelectronics.jp',
    sector: 'Electronics',
    country: 'Japan',
    investmentAmount: 18000000,
    status: 'under_review',
    submittedDate: '2026-01-12',
    slaDeadline: '2026-03-12',
    approvalDate: null,
    assignedOfficer: 'Fatima Rahman',
    currentStep: 'Fire Safety License',
    daysInCurrentStage: 14,
    isStrategicSector: true,
    approvals: { 
      rjsc: 'approved', 
      nbr: 'approved',
      bangladeshBank: 'approved',
      fire: 'pending'
    },
    stageDurations: {
      rjsc: 6,
      nbr: 5,
      bangladeshBank: 9,
      fire: 14
    }
  },
  {
    id: 'APP-2026-008',
    companyName: 'Singapore Logistics Hub',
    investorName: 'Tan Wei Ming',
    investorEmail: 'tan@sglogistics.sg',
    sector: 'Logistics',
    country: 'Singapore',
    investmentAmount: 6000000,
    status: 'under_review',
    submittedDate: '2026-01-18',
    slaDeadline: '2026-03-18',
    approvalDate: null,
    assignedOfficer: 'Dr. Rahman',
    currentStep: 'RJSC Company Registration',
    daysInCurrentStage: 17,
    isStrategicSector: false,
    approvals: { 
      rjsc: 'pending', 
      nbr: 'not_started',
      bangladeshBank: 'not_started'
    },
    stageDurations: {
      rjsc: 17
    }
  },
  {
    id: 'APP-2026-009',
    companyName: 'Australian Mining Corp',
    investorName: 'James Wilson',
    investorEmail: 'james@ausmining.au',
    sector: 'Mining',
    country: 'Australia',
    investmentAmount: 30000000,
    status: 'under_review',
    submittedDate: '2026-01-08',
    slaDeadline: '2026-03-08',
    approvalDate: null,
    assignedOfficer: 'Ahmed Khan',
    currentStep: 'Environmental Clearance',
    daysInCurrentStage: 27,
    isStrategicSector: false,
    approvals: { 
      rjsc: 'approved', 
      nbr: 'approved',
      bangladeshBank: 'approved',
      environment: 'delayed'
    },
    stageDurations: {
      rjsc: 11,
      nbr: 8,
      bangladeshBank: 13,
      environment: 27
    }
  },
  {
    id: 'APP-2026-010',
    companyName: 'Indian Tech Solutions',
    investorName: 'Rajesh Kumar',
    investorEmail: 'rajesh@indiatech.in',
    sector: 'IT & Software',
    country: 'India',
    investmentAmount: 2500000,
    status: 'approved',
    submittedDate: '2026-01-02',
    slaDeadline: '2026-02-02',
    approvalDate: '2026-01-25',
    assignedOfficer: 'Fatima Rahman',
    currentStep: 'Completed',
    daysInCurrentStage: 0,
    isStrategicSector: true,
    approvals: { 
      rjsc: 'approved', 
      nbr: 'approved', 
      bangladeshBank: 'approved',
      bida_final: 'approved'
    },
    stageDurations: {
      rjsc: 5,
      nbr: 4,
      bangladeshBank: 9,
      bida_final: 2
    }
  },
  {
    id: 'APP-2026-011',
    companyName: 'French Automotive Parts',
    investorName: 'Marie Dubois',
    investorEmail: 'marie@frenchauto.fr',
    sector: 'Manufacturing',
    country: 'France',
    investmentAmount: 11000000,
    status: 'under_review',
    submittedDate: '2026-01-22',
    slaDeadline: '2026-04-22',
    approvalDate: null,
    assignedOfficer: 'Ms. Sultana',
    currentStep: 'NBR Tax Registration',
    daysInCurrentStage: 8,
    isStrategicSector: false,
    approvals: { 
      rjsc: 'approved', 
      nbr: 'pending',
      bangladeshBank: 'not_started'
    },
    stageDurations: {
      rjsc: 9,
      nbr: 8
    }
  },
  {
    id: 'APP-2026-012',
    companyName: 'Canadian Food Processing',
    investorName: 'Robert Taylor',
    investorEmail: 'robert@canfood.ca',
    sector: 'Food & Beverage',
    country: 'Canada',
    investmentAmount: 4200000,
    status: 'approved',
    submittedDate: '2025-12-28',
    slaDeadline: '2026-02-28',
    approvalDate: '2026-02-01',
    assignedOfficer: 'Dr. Rahman',
    currentStep: 'Completed',
    daysInCurrentStage: 0,
    isStrategicSector: false,
    approvals: { 
      rjsc: 'approved', 
      nbr: 'approved', 
      bangladeshBank: 'approved',
      bida_final: 'approved'
    },
    stageDurations: {
      rjsc: 7,
      nbr: 6,
      bangladeshBank: 10,
      bida_final: 3
    }
  },
  {
    id: 'APP-2026-013',
    companyName: 'Brazilian Steel Industries',
    investorName: 'Carlos Silva',
    investorEmail: 'carlos@brazilsteel.br',
    sector: 'Manufacturing',
    country: 'Brazil',
    investmentAmount: 22000000,
    status: 'under_review',
    submittedDate: '2026-01-14',
    slaDeadline: '2026-03-14',
    approvalDate: null,
    assignedOfficer: 'Ahmed Khan',
    currentStep: 'Bangladesh Bank FX Approval',
    daysInCurrentStage: 16,
    isStrategicSector: true,
    approvals: { 
      rjsc: 'approved', 
      nbr: 'approved',
      bangladeshBank: 'pending',
      environment: 'pending'
    },
    stageDurations: {
      rjsc: 10,
      nbr: 7,
      bangladeshBank: 16
    }
  },
  {
    id: 'APP-2026-014',
    companyName: 'Thai Agriculture Export',
    investorName: 'Somchai Prasert',
    investorEmail: 'somchai@thaiagriculture.th',
    sector: 'Agriculture',
    country: 'Thailand',
    investmentAmount: 3800000,
    status: 'pending',
    submittedDate: '2026-02-01',
    slaDeadline: '2026-04-01',
    approvalDate: null,
    assignedOfficer: 'Ms. Sultana',
    currentStep: 'Initial Review',
    daysInCurrentStage: 3,
    isStrategicSector: false,
    approvals: { 
      rjsc: 'not_started', 
      nbr: 'not_started',
      bangladeshBank: 'not_started'
    },
    stageDurations: {}
  },
  {
    id: 'APP-2026-015',
    companyName: 'Netherlands Dairy Products',
    investorName: 'Jan van der Berg',
    investorEmail: 'jan@dutchdairy.nl',
    sector: 'Food & Beverage',
    country: 'Netherlands',
    investmentAmount: 7500000,
    status: 'under_review',
    submittedDate: '2026-01-25',
    slaDeadline: '2026-03-25',
    approvalDate: null,
    assignedOfficer: 'Fatima Rahman',
    currentStep: 'Fire Safety License',
    daysInCurrentStage: 12,
    isStrategicSector: false,
    approvals: { 
      rjsc: 'approved', 
      nbr: 'approved',
      bangladeshBank: 'approved',
      fire: 'pending'
    },
    stageDurations: {
      rjsc: 6,
      nbr: 5,
      bangladeshBank: 8,
      fire: 12
    }
  }
];

export const comprehensiveMockOfficers = [
  { 
    id: 1, 
    name: 'Ahmed Khan', 
    photo: '/photos/officers/officer-ahmed-khan.jpg',
    department: 'Investment Services', 
    email: 'ahmed.khan@bida.gov.bd',
    expertise: ['Textile & Garment', 'Manufacturing'],
    certifications: ['AML Certified', 'Investment Law'],
    yearsExperience: 8,
    successRate: 87
  },
  { 
    id: 2, 
    name: 'Fatima Rahman', 
    photo: '/photos/officers/officer-fatima-rahman.jpg',
    department: 'Compliance', 
    email: 'fatima.rahman@bida.gov.bd',
    expertise: ['IT & Software', 'Electronics'],
    certifications: ['Compliance Officer', 'GDPR Certified'],
    yearsExperience: 6,
    successRate: 92
  },
  { 
    id: 3, 
    name: 'Dr. Rahman', 
    photo: '/photos/officers/officer-dr-rahman.jpg',
    department: 'Sector Specialist', 
    email: 'dr.rahman@bida.gov.bd',
    expertise: ['Pharmaceutical', 'Healthcare'],
    certifications: ['PhD Economics', 'Investment Strategy'],
    yearsExperience: 12,
    successRate: 89
  }
];

export const comprehensiveMockAgencies = [
  { id: 1, name: 'RJSC', fullName: 'Registrar of Joint Stock Companies', slaCompliance: 82, avgResponseTime: 8.5 },
  { id: 2, name: 'NBR', fullName: 'National Board of Revenue', slaCompliance: 91, avgResponseTime: 6.2 },
  { id: 3, name: 'Bangladesh Bank', fullName: 'Bangladesh Bank', slaCompliance: 68, avgResponseTime: 14.3 },
  { id: 4, name: 'DoE', fullName: 'Department of Environment', slaCompliance: 62, avgResponseTime: 18.7 },
  { id: 5, name: 'Fire Service', fullName: 'Fire Service and Civil Defence', slaCompliance: 88, avgResponseTime: 7.1 },
  { id: 6, name: 'Drug Admin', fullName: 'Directorate General of Drug Administration', slaCompliance: 75, avgResponseTime: 12.5 }
];