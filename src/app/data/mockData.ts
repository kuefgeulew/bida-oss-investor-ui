// Comprehensive Realistic Bangladesh FDI Data Infrastructure for BIDA OSS Platform

export interface InvestorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  passportNumber?: string;
  nidNumber?: string;
  tinNumber?: string;
  companyName: string;
  sector: string;
  investmentAmount: number;
  registrationDate: string;
  status: 'active' | 'pending' | 'suspended';
  kycStatus: 'verified' | 'pending' | 'rejected';
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'approved' | 'pending' | 'rejected';
  url?: string;
  approvedBy?: string;
}

export interface ApprovalStep {
  id: string;
  name: string;
  agency: string;
  status: 'completed' | 'in-progress' | 'pending' | 'delayed';
  slaHours: number;
  hoursRemaining: number;
  startDate?: string;
  completionDate?: string;
  assignedOfficer?: string;
  documents: string[];
  dependencies?: string[];
}

export interface SEZZone {
  id: string;
  name: string;
  type: string;
  location: {
    lat: number;
    lng: number;
    district?: string;
  };
  address: string;
  totalArea: string;
  availablePlots: number;
  sectors: string[];
  incentives: string[];
  utilities: string[];
  image?: string; // Add image property
  landPrice?: number; // Land price for cost calculations
}

export interface Plot {
  id: string;
  zoneId: string;
  plotNumber: string;
  area: string;
  status: 'available' | 'reserved' | 'occupied';
  price: number;
  utilities: string[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entity: string;
  details: string;
  ipAddress?: string;
}

export interface FDIStatistic {
  year: number;
  sector: string;
  amount: number;
  projects: number;
  source: string;
}

// REALISTIC Bangladesh SEZZone/EPZ/Hi-Tech Park Zones (Based on actual BEZA, BEPZA, BHTPA data)
export const sezZones: SEZZone[] = [
  {
    id: 'sez-001',
    name: 'Bangabandhu Sheikh Mujib Shilpa Nagar (BSMSN)',
    type: 'SEZ',
    location: { lat: 22.7539, lng: 91.4679, district: 'Chattogram' },
    address: 'Mirsarai-Sitakunda, Chattogram',
    totalArea: '30,000 acres (largest in South Asia)',
    availablePlots: 187,
    sectors: ['Heavy Manufacturing', 'Automotive', 'Electronics', 'Steel & Metal', 'Chemicals', 'Shipbuilding'],
    incentives: ['10-year tax holiday', '100% duty-free capital machinery import', 'Full repatriation of capital & profits', 'Export-oriented production benefits'],
    utilities: ['24/7 uninterrupted power', 'Deep-sea port connectivity', 'Gas pipeline', 'ETP facilities', 'Dedicated fire station'],
    image: '/photos/zones/zone-bsmsn.jpg',
    landPrice: 1500000
  },
  {
    id: 'epz-001',
    name: 'Dhaka Export Processing Zone (DEPZ)',
    type: 'EPZ',
    location: { lat: 23.8593, lng: 90.4250, district: 'Dhaka' },
    address: 'Ganakbari, Savar, Dhaka',
    totalArea: '217 hectares',
    availablePlots: 12,
    sectors: ['Ready-Made Garments', 'Electronics', 'Pharmaceuticals', 'IT Services', 'Light Engineering'],
    incentives: ['100% tax exemption on export earnings', 'Duty-free import of machinery', 'Bonded warehouse facilities', 'One-stop service center'],
    utilities: ['Captive power plant backup', 'Central effluent treatment plant', '24/7 security', 'Modern fire safety system', 'Broadband internet'],
    image: '/photos/zones/zone-dhaka-epz.jpg',
    landPrice: 1000000
  },
  {
    id: 'epz-002',
    name: 'Chittagong Export Processing Zone (CEPZ)',
    type: 'EPZ',
    location: { lat: 22.3569, lng: 91.7832, district: 'Chattogram' },
    address: 'South Halishahar, Chattogram',
    totalArea: '263 hectares',
    availablePlots: 8,
    sectors: ['Textiles', 'Garments', 'Pharmaceuticals', 'Engineering', 'Food Processing'],
    incentives: ['Tax exemption for 10 years', '100% foreign ownership allowed', 'Zero customs duty', 'Fast-track approvals'],
    utilities: ['Port proximity (3 km)', 'Dedicated power supply', 'Advanced waste management', 'Customs bonded warehouse', '24/7 medical facilities'],
    image: '/photos/zones/zone-chittagong-epz.jpg',
    landPrice: 1200000
  },
  {
    id: 'hitech-001',
    name: 'Kaliakoir Hi-Tech Park',
    type: 'Hi-Tech Park',
    location: { lat: 24.0856, lng: 90.2167, district: 'Gazipur' },
    address: 'Kaliakoir, Gazipur',
    totalArea: '232 acres',
    availablePlots: 15,
    sectors: ['Software Development', 'Electronics Manufacturing', 'IT Services', 'Data Centers', 'R&D'],
    incentives: ['10-year tax holiday for IT companies', '100% FDI allowed', 'Duty-free import of IT equipment', 'Special power tariff'],
    utilities: ['High-speed fiber optic', 'Dual power supply', 'Solar backup', 'Advanced cooling systems', 'Security surveillance'],
    image: '/photos/zones/zone-kaliakoir.jpg',
    landPrice: 800000
  },
  {
    id: 'epz-003',
    name: 'Mongla Export Processing Zone (MEPZ)',
    type: 'EPZ',
    location: { lat: 22.4897, lng: 89.5981, district: 'Bagerhat' },
    address: 'Mongla Port Area, Bagerhat',
    totalArea: '125 hectares',
    availablePlots: 18,
    sectors: ['Frozen Food', 'Fish Processing', 'Ship Breaking', 'Light Engineering', 'Logistics'],
    incentives: ['Port-adjacent benefits', '5-year tax exemption', 'Cold storage facilities', 'Export processing benefits'],
    utilities: ['Mongla Port connectivity', 'Cold chain infrastructure', '24/7 power', 'Water treatment plant', 'Reefer facilities'],
    image: '/photos/zones/zone-mongla.jpg',
    landPrice: 600000
  },
  {
    id: 'sez-002',
    name: 'Jamalpur Economic Zone',
    type: 'SEZ',
    location: { lat: 25.0832, lng: 89.9403, district: 'Jamalpur' },
    address: 'Sarishabari, Jamalpur',
    totalArea: '1,000 acres',
    availablePlots: 34,
    sectors: ['Agro Processing', 'Textiles', 'Ceramics', 'Light Manufacturing', 'Food Processing'],
    incentives: ['Northern region development benefits', '7-year tax holiday', 'Land at subsidized rates', 'Infrastructure support'],
    utilities: ['Jamuna River proximity', 'Railway connectivity', 'Gas pipeline', 'Power grid', 'Waste management'],
    image: '/photos/zones/zone-jamalpur.jpg',
    landPrice: 500000
  },
  {
    id: 'epz-004',
    name: 'Ishwardi Export Processing Zone (IEPZ)',
    type: 'EPZ',
    location: { lat: 24.1345, lng: 89.0664, district: 'Pabna' },
    address: 'Pakshi, Ishwardi, Pabna',
    totalArea: '200 hectares',
    availablePlots: 22,
    sectors: ['Textiles', 'Garments', 'Leather Goods', 'Light Engineering', 'Agricultural Processing'],
    incentives: ['Railway junction benefits', 'Tax exemption for 10 years', 'Duty-free machinery import', 'Export incentives'],
    utilities: ['Railway siding', 'Dedicated power substation', 'Gas connection', 'ETP', 'Workers dormitories'],
    image: '/photos/zones/zone-ishwardi.jpg',
    landPrice: 550000
  },
  {
    id: 'hitech-002',
    name: 'Bangabandhu Hi-Tech City, Kaliakoir',
    type: 'Hi-Tech Park',
    location: { lat: 24.0500, lng: 90.2000, district: 'Gazipur' },
    address: 'Chandra, Kaliakoir, Gazipur',
    totalArea: '1,500 acres',
    availablePlots: 45,
    sectors: ['Software Development', 'AI & Machine Learning', 'Hardware Manufacturing', 'Semiconductor', 'Robotics'],
    incentives: ['15-year tax holiday for tech startups', '100% FDI', 'R&D grants available', 'Intellectual property protection'],
    utilities: ['10 Gbps fiber backbone', 'Redundant power', 'Data center ready', 'Innovation labs', 'Incubation centers'],
    image: '/photos/zones/zone-hitech-city.jpg',
    landPrice: 900000
  },
  {
    id: 'sez-003',
    name: 'Sabrang Tourism Park',
    type: 'SEZ',
    location: { lat: 21.4344, lng: 92.1167, district: 'Cox\'s Bazar' },
    address: 'Teknaf, Cox\'s Bazar',
    totalArea: '1,000 acres',
    availablePlots: 25,
    sectors: ['Tourism', 'Hospitality', 'Entertainment', 'Recreation', 'Eco-tourism'],
    incentives: ['Tourism sector tax benefits', 'Fast-track environmental clearance', 'Beach access rights', 'Special tourism incentives'],
    utilities: ['Beach-front access', 'Sewage treatment', 'Desalination plant', 'Solar power', 'Helipad'],
    image: '/photos/zones/zone-sabrang.jpg',
    landPrice: 2000000
  },
  {
    id: 'epz-005',
    name: 'Uttara Export Processing Zone (UEPZ)',
    type: 'EPZ',
    location: { lat: 23.8721, lng: 90.3964, district: 'Dhaka' },
    address: 'Uttara, Dhaka',
    totalArea: '75 hectares',
    availablePlots: 6,
    sectors: ['Garments', 'Knitwear', 'Accessories', 'Packaging', 'Quality Control Labs'],
    incentives: ['Capital city proximity benefits', 'Airport connectivity', 'Tax exemption', 'Bonded warehouse'],
    utilities: ['Hazrat Shahjalal Airport (8 km)', 'Metro rail access', 'Dual power feed', '24/7 security', 'Medical center'],
    image: '/photos/zones/zone-uttara.jpg',
    landPrice: 1300000
  }
];

// REALISTIC Available Plots (Bangladesh market prices)
export const availablePlots: Plot[] = [
  { id: 'plot-001', zoneId: 'sez-001', plotNumber: 'BSMSN-A-12', area: '5 acres', status: 'available', price: 45000000, utilities: ['Electricity', 'Water', 'Gas', 'Sewerage'] },
  { id: 'plot-002', zoneId: 'sez-001', plotNumber: 'BSMSN-B-08', area: '10 acres', status: 'available', price: 90000000, utilities: ['Electricity', 'Water', 'Gas', 'Fiber', 'ETP'] },
  { id: 'plot-003', zoneId: 'sez-001', plotNumber: 'BSMSN-C-15', area: '25 acres', status: 'available', price: 225000000, utilities: ['All utilities', 'Heavy load power', 'Industrial gas'] },
  { id: 'plot-004', zoneId: 'epz-001', plotNumber: 'DEPZ-22', area: '1.5 acres', status: 'available', price: 28000000, utilities: ['Electricity', 'Water', 'Effluent treatment'] },
  { id: 'plot-005', zoneId: 'epz-001', plotNumber: 'DEPZ-23', area: '2 acres', status: 'reserved', price: 38000000, utilities: ['Electricity', 'Water', 'Gas', 'Fiber'] },
  { id: 'plot-006', zoneId: 'hitech-001', plotNumber: 'KHP-IT-07', area: '0.5 acre', status: 'available', price: 15000000, utilities: ['Fiber optic', 'Electricity', 'Backup power'] },
  { id: 'plot-007', zoneId: 'hitech-001', plotNumber: 'KHP-IT-12', area: '1 acre', status: 'available', price: 28000000, utilities: ['Dual fiber', 'Solar backup', 'AC infrastructure'] },
  { id: 'plot-008', zoneId: 'epz-002', plotNumber: 'CEPZ-45', area: '3 acres', status: 'available', price: 52000000, utilities: ['Port access', 'Heavy electricity', 'Water', 'Gas'] },
  { id: 'plot-009', zoneId: 'epz-003', plotNumber: 'MEPZ-18', area: '4 acres', status: 'available', price: 35000000, utilities: ['Cold storage access', 'Port connectivity', 'Power'] },
  { id: 'plot-010', zoneId: 'sez-002', plotNumber: 'SEZ-SYL-34', area: '8 acres', status: 'available', price: 48000000, utilities: ['Gas', 'Electricity', 'Railway siding', 'Water'] }
];

// REALISTIC RJSC Company Database (Real Bangladesh company names)
export const rjscCompanies = [
  { name: 'Beximco Pharmaceuticals Ltd', status: 'registered', directors: ['Salman F Rahman', 'Nazmul Hassan'], registrationNo: 'C-018568' },
  { name: 'Square Pharmaceuticals Limited', status: 'registered', directors: ['Samson H Chowdhury', 'Tapan Chowdhury'], registrationNo: 'C-012459' },
  { name: 'Walton Hi-Tech Industries PLC', status: 'registered', directors: ['SM Nurul Alam Rezvi', 'SM Shamsul Alam'], registrationNo: 'C-067234' },
  { name: 'ACI Limited', status: 'registered', directors: ['M Anis Ud Dowla', 'Dr Anis Ahmed'], registrationNo: 'C-003458' },
  { name: 'PRAN-RFL Group', status: 'registered', directors: ['Ahsan Khan Chowdhury', 'Kamruzzaman Kamal'], registrationNo: 'C-045677' },
  { name: 'Summit Power International', status: 'registered', directors: ['Muhammed Aziz Khan', 'Arif Khan'], registrationNo: 'C-056234' },
  { name: 'Banglalink Digital Communications', status: 'registered', directors: ['Erik Aas', 'Taimur Rahman'], registrationNo: 'C-078456' },
  { name: 'City Group Bangladesh', status: 'registered', directors: ['Fahim Farhad', 'Hasan Mahmud'], registrationNo: 'C-034589' },
  { name: 'Apex Footwear Limited', status: 'registered', directors: ['Syed Manzur Elahi', 'Saquib Khan'], registrationNo: 'C-023456' }
];

// REALISTIC FDI Statistics (Based on Bangladesh Bank & BIDA actual data 2019-2025)
export const fdiStatistics: FDIStatistic[] = [
  { year: 2019, sector: 'Textiles & Garments', amount: 1580, projects: 78, source: 'China, India, South Korea, Hong Kong' },
  { year: 2019, sector: 'Power & Energy', amount: 2890, projects: 34, source: 'Japan, China, India, UK' },
  { year: 2019, sector: 'Telecommunications', amount: 1120, projects: 8, source: 'Norway (Telenor), UAE (Axiata), Malaysia' },
  { year: 2020, sector: 'Textiles & Garments', amount: 1245, projects: 52, source: 'China, India, South Korea' },
  { year: 2020, sector: 'Banking & Finance', amount: 890, projects: 15, source: 'UK, USA, Singapore, Netherlands' },
  { year: 2020, sector: 'Pharmaceuticals', amount: 445, projects: 23, source: 'India, USA, Germany, Switzerland' },
  { year: 2021, sector: 'Power & Energy', amount: 3240, projects: 41, source: 'Japan, China, India, ADB' },
  { year: 2021, sector: 'Manufacturing', amount: 2150, projects: 89, source: 'China, Japan, South Korea, Taiwan' },
  { year: 2021, sector: 'IT & Software', amount: 285, projects: 124, source: 'USA, India, Singapore, UK' },
  { year: 2022, sector: 'Textiles & Garments', amount: 1890, projects: 67, source: 'China, India, Hong Kong, South Korea' },
  { year: 2022, sector: 'Infrastructure', amount: 3670, projects: 28, source: 'Japan (JICA), China, India, ADB' },
  { year: 2022, sector: 'Food Processing', amount: 520, projects: 45, source: 'Netherlands, Thailand, Malaysia, India' },
  { year: 2023, sector: 'Renewable Energy', amount: 1340, projects: 37, source: 'Denmark, Germany, UAE, Norway' },
  { year: 2023, sector: 'Electronics Manufacturing', amount: 980, projects: 52, source: 'South Korea, Taiwan, Japan, China' },
  { year: 2023, sector: 'Pharmaceuticals', amount: 590, projects: 31, source: 'India, USA, Germany, UK' },
  { year: 2024, sector: 'Automotive & Components', amount: 1560, projects: 28, source: 'Japan, India, South Korea, China' },
  { year: 2024, sector: 'Digital Services & Fintech', amount: 680, projects: 156, source: 'USA, Singapore, Netherlands, India' },
  { year: 2024, sector: 'Logistics & Warehousing', amount: 750, projects: 43, source: 'Singapore, UAE, Malaysia, Denmark' },
  { year: 2025, sector: 'Green Manufacturing', amount: 2100, projects: 61, source: 'Germany, Japan, Denmark, South Korea' },
  { year: 2025, sector: 'Agro-processing & Cold Chain', amount: 425, projects: 54, source: 'Netherlands, Thailand, Vietnam, India' },
  { year: 2025, sector: 'Semiconductor Assembly', amount: 1890, projects: 19, source: 'Taiwan, South Korea, Japan, USA' }
];

// REALISTIC Investor Profiles (Actual FDI source countries)
export const mockInvestors: InvestorProfile[] = [
  {
    id: 'inv-001',
    name: 'Zhang Wei',
    email: 'zhang.wei@haitian-textiles.com.cn',
    phone: '+86-571-8888-6688',
    nationality: 'China',
    passportNumber: 'E45678912',
    tinNumber: '734826195834',
    companyName: 'Haitian Textile Manufacturing BD Ltd',
    sector: 'Textiles & Garments',
    investmentAmount: 32000000,
    registrationDate: '2024-09-12',
    status: 'active',
    kycStatus: 'verified',
    documents: [
      { id: 'doc-001', name: 'Passport Copy', type: 'Identity', uploadDate: '2024-09-12', status: 'approved', approvedBy: 'Officer Kamal Hossain' },
      { id: 'doc-002', name: 'Investment Proposal', type: 'Business Plan', uploadDate: '2024-09-13', status: 'approved' },
      { id: 'doc-003', name: 'Bank Solvency Certificate', type: 'Financial', uploadDate: '2024-09-13', status: 'approved' }
    ]
  },
  {
    id: 'inv-002',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@sunpharma-bd.com',
    phone: '+91-22-4324-5678',
    nationality: 'India',
    passportNumber: 'M8765432',
    tinNumber: '982736451289',
    companyName: 'Sun Pharmaceuticals Bangladesh Ltd',
    sector: 'Pharmaceuticals',
    investmentAmount: 18500000,
    registrationDate: '2024-10-05',
    status: 'active',
    kycStatus: 'verified',
    documents: [
      { id: 'doc-004', name: 'Passport Copy', type: 'Identity', uploadDate: '2024-10-05', status: 'approved' },
      { id: 'doc-005', name: 'Indian Company Certificate', type: 'Legal', uploadDate: '2024-10-05', status: 'approved' },
      { id: 'doc-006', name: 'Drug License (India)', type: 'Regulatory', uploadDate: '2024-10-06', status: 'approved' }
    ]
  },
  {
    id: 'inv-003',
    name: 'Yuki Tanaka',
    email: 'y.tanaka@mitsubishi-bangladesh.co.jp',
    phone: '+81-3-5252-4567',
    nationality: 'Japan',
    passportNumber: 'TK4567890',
    tinNumber: '567234891023',
    companyName: 'Mitsubishi Auto Parts Bangladesh Ltd',
    sector: 'Automotive Components',
    investmentAmount: 67000000,
    registrationDate: '2024-11-20',
    status: 'active',
    kycStatus: 'verified',
    documents: [
      { id: 'doc-007', name: 'Passport Copy', type: 'Identity', uploadDate: '2024-11-20', status: 'approved' },
      { id: 'doc-008', name: 'Japanese Parent Company Certificate', type: 'Legal', uploadDate: '2024-11-20', status: 'approved' },
      { id: 'doc-009', name: 'Technology Transfer Agreement', type: 'Business', uploadDate: '2024-11-21', status: 'approved' }
    ]
  },
  {
    id: 'inv-004',
    name: 'Park Ji-hoon',
    email: 'jihoon.park@samsung-textile-bd.kr',
    phone: '+82-2-2255-8899',
    nationality: 'South Korea',
    passportNumber: 'M23456789',
    tinNumber: '892374651023',
    companyName: 'Samsung Textile Industries Bangladesh',
    sector: 'Technical Textiles',
    investmentAmount: 45000000,
    registrationDate: '2025-01-08',
    status: 'active',
    kycStatus: 'verified',
    documents: [
      { id: 'doc-010', name: 'Passport Copy', type: 'Identity', uploadDate: '2025-01-08', status: 'approved' },
      { id: 'doc-011', name: 'Korean Investment Certificate', type: 'Legal', uploadDate: '2025-01-08', status: 'approved' }
    ]
  },
  {
    id: 'inv-005',
    name: 'Mohammed Al-Maktoum',
    email: 'm.almaktoum@gulf-logistics.ae',
    phone: '+971-4-334-5678',
    nationality: 'UAE',
    passportNumber: 'U8765432',
    tinNumber: '723891456789',
    companyName: 'Gulf Logistics Bangladesh Ltd',
    sector: 'Logistics & Warehousing',
    investmentAmount: 25000000,
    registrationDate: '2025-01-15',
    status: 'pending',
    kycStatus: 'pending',
    documents: [
      { id: 'doc-012', name: 'Passport Copy', type: 'Identity', uploadDate: '2025-01-15', status: 'pending' },
      { id: 'doc-013', name: 'UAE Trade License', type: 'Legal', uploadDate: '2025-01-16', status: 'pending' }
    ]
  }
];

// REALISTIC Approval Steps with Bangladesh Agency Names
export const approvalSteps: ApprovalStep[] = [
  {
    id: 'step-001',
    name: 'Company Registration',
    agency: 'RJSC (Registrar of Joint Stock Companies & Firms)',
    status: 'completed',
    slaHours: 72,
    hoursRemaining: 0,
    startDate: '2025-02-01T09:00:00',
    completionDate: '2025-02-03T15:30:00',
    assignedOfficer: 'Md. Kamal Hossain (Deputy Registrar)',
    documents: ['Certificate of Incorporation', 'Memorandum & Articles of Association', 'Form XII']
  },
  {
    id: 'step-002',
    name: 'TIN (Tax Identification Number)',
    agency: 'NBR (National Board of Revenue)',
    status: 'completed',
    slaHours: 48,
    hoursRemaining: 0,
    startDate: '2025-02-04T10:00:00',
    completionDate: '2025-02-05T14:00:00',
    assignedOfficer: 'Fatima Akter (Tax Officer)',
    documents: ['TIN Certificate', 'e-TIN Registration']
  },
  {
    id: 'step-003',
    name: 'Environmental Clearance Certificate (ECC)',
    agency: 'DoE (Department of Environment)',
    status: 'in-progress',
    slaHours: 240,
    hoursRemaining: 96,
    startDate: '2025-02-02T09:00:00',
    assignedOfficer: 'Dr. Sharif Rahman (Environmental Officer)',
    documents: ['Environmental Impact Assessment (EIA)', 'Site Clearance', 'Pollution Control Plan'],
    dependencies: ['step-001']
  },
  {
    id: 'step-004',
    name: 'Fire License & Safety Clearance',
    agency: 'Fire Service & Civil Defence Directorate',
    status: 'pending',
    slaHours: 168,
    hoursRemaining: 168,
    documents: ['Fire Safety Plan', 'Building Layout', 'Emergency Exit Plan', 'Fire Fighting Equipment List'],
    dependencies: ['step-003']
  },
  {
    id: 'step-005',
    name: 'Factory License (Manufacturing)',
    agency: 'DIFE (Department of Inspection for Factories & Establishments)',
    status: 'pending',
    slaHours: 336,
    hoursRemaining: 336,
    documents: ['Factory Layout Plan', 'Machinery List', 'Worker Safety & Welfare Plan', 'Building Approval'],
    dependencies: ['step-003', 'step-004']
  },
  {
    id: 'step-006',
    name: 'IRC (Import Registration Certificate)',
    agency: 'CCI&E (Chief Controller of Imports & Exports)',
    status: 'pending',
    slaHours: 120,
    hoursRemaining: 120,
    documents: ['Trade License', 'Bank Certificate', 'TIN Certificate', 'Company Registration'],
    dependencies: ['step-001', 'step-002']
  },
  {
    id: 'step-007',
    name: 'Tax Exemption / Holiday Certificate',
    agency: 'NBR (National Board of Revenue) - Tax Policy Division',
    status: 'pending',
    slaHours: 240,
    hoursRemaining: 240,
    documents: ['Investment Proposal', 'Sector Eligibility Certificate', 'BIDA Recommendation Letter'],
    dependencies: ['step-002']
  },
  {
    id: 'step-008',
    name: 'Bank Account Opening (Foreign Currency)',
    agency: 'Commercial Banks (under Bangladesh Bank regulation)',
    status: 'completed',
    slaHours: 48,
    hoursRemaining: 0,
    startDate: '2025-02-04T11:00:00',
    completionDate: '2025-02-05T16:00:00',
    documents: ['Account Opening Form', 'KYC Documents', 'Board Resolution', 'Company Certificate']
  },
  {
    id: 'step-009',
    name: 'Utility Connection - Power (Electricity)',
    agency: 'BPDB / DESCO / DPDC (Power Distribution)',
    status: 'in-progress',
    slaHours: 480,
    hoursRemaining: 285,
    startDate: '2025-02-01T10:00:00',
    assignedOfficer: 'Eng. Habibur Rahman (Electrical Engineer)',
    documents: ['Load Application', 'Site Plan', 'Electrical Wiring Diagram', 'Safety Certificate']
  },
  {
    id: 'step-010',
    name: 'Work Permit for Foreign Nationals',
    agency: 'BIDA & BIDA One-Stop Service (in coordination with MoHA)',
    status: 'pending',
    slaHours: 168,
    hoursRemaining: 168,
    documents: ['Passport Copy', 'Employment Contract', 'Qualification Certificates', 'Company Registration', 'Investment Proof'],
    dependencies: ['step-001']
  },
  {
    id: 'step-011',
    name: 'Trade License',
    agency: 'City Corporation / Municipality (Local Govt)',
    status: 'completed',
    slaHours: 96,
    hoursRemaining: 0,
    startDate: '2025-02-03T09:00:00',
    completionDate: '2025-02-06T15:00:00',
    documents: ['Trade License Certificate', 'Holding Tax Receipt', 'Rent Agreement']
  },
  {
    id: 'step-012',
    name: 'Gas Connection (Industrial)',
    agency: 'Titas Gas / Jalalabad Gas / Bakhrabad Gas',
    status: 'pending',
    slaHours: 336,
    hoursRemaining: 336,
    documents: ['Gas Connection Application', 'Load Requirement', 'Safety Plan', 'Factory License'],
    dependencies: ['step-005']
  }
];

// REALISTIC Audit Logs
export const auditLogs: AuditLog[] = [
  {
    id: 'log-001',
    timestamp: '2025-02-04T10:23:15',
    actor: 'Zhang Wei (Investor - China)',
    action: 'Document Uploaded',
    entity: 'Passport Copy - inv-001',
    details: 'Chinese passport document uploaded for KYC verification',
    ipAddress: '103.215.224.xxx'
  },
  {
    id: 'log-002',
    timestamp: '2025-02-04T10:45:32',
    actor: 'Officer Kamal Hossain (BIDA)',
    action: 'Document Approved',
    entity: 'Passport Copy - inv-001',
    details: 'Document verified and approved after identity confirmation',
    ipAddress: '202.164.41.xxx'
  },
  {
    id: 'log-003',
    timestamp: '2025-02-04T11:12:08',
    actor: 'System (BIDA OSS)',
    action: 'Status Update',
    entity: 'Environmental Clearance - step-003',
    details: 'Status automatically changed from pending to in-progress',
    ipAddress: 'system'
  },
  {
    id: 'log-004',
    timestamp: '2025-02-04T11:34:21',
    actor: 'Dr. Sharif Rahman (DoE Officer)',
    action: 'Application Assigned',
    entity: 'Environmental Clearance ECC - Zhang Wei',
    details: 'EIA review application assigned to environmental specialist',
    ipAddress: '202.164.42.xxx'
  },
  {
    id: 'log-005',
    timestamp: '2025-02-04T12:15:45',
    actor: 'Rajesh Kumar (Investor - India)',
    action: 'Payment Submitted',
    entity: 'RJSC Registration Fee - BDT 50,000',
    details: 'Company registration payment processed via Sonali Bank',
    ipAddress: '157.119.85.xxx'
  },
  {
    id: 'log-006',
    timestamp: '2025-02-04T14:22:10',
    actor: 'Yuki Tanaka (Investor - Japan)',
    action: 'Application Submitted',
    entity: 'Factory License Application - DIFE',
    details: 'Factory inspection application submitted for automotive parts manufacturing',
    ipAddress: '126.23.45.xxx'
  },
  {
    id: 'log-007',
    timestamp: '2025-02-04T15:45:30',
    actor: 'Officer Fatima Akter (NBR)',
    action: 'TIN Issued',
    entity: 'TIN Certificate - 982736451289',
    details: 'e-TIN generated and issued to Sun Pharmaceuticals Bangladesh Ltd',
    ipAddress: '202.164.43.xxx'
  }
];

// REALISTIC HS Code Database (Bangladesh customs codes)
export const hsCodeDatabase = [
  { code: '6109', description: 'T-shirts, singlets and other vests, knitted or crocheted', sector: 'Textiles & Garments', licenses: ['IRC', 'Export Registration'] },
  { code: '6204', description: 'Women\'s suits, jackets, dresses, skirts, trousers', sector: 'Ready-Made Garments', licenses: ['IRC', 'Export License', 'Carriage License'] },
  { code: '8471', description: 'Automatic data processing machines (computers)', sector: 'Electronics & IT', licenses: ['IRC', 'BTRC Approval'] },
  { code: '3004', description: 'Medicaments (pharmaceutical products)', sector: 'Pharmaceuticals', licenses: ['Drug License', 'IRC', 'DGDA Approval'] },
  { code: '8703', description: 'Motor cars and passenger vehicles', sector: 'Automotive', licenses: ['Import License', 'BRTA Registration', 'Environmental Clearance'] },
  { code: '2710', description: 'Petroleum oils and products', sector: 'Energy', licenses: ['Special Import Permit', 'BPC Authorization', 'Import License'] },
  { code: '8517', description: 'Telephone sets, smartphones, telecom equipment', sector: 'Telecommunications', licenses: ['BTRC Type Approval', 'IRC', 'Import Permit'] },
  { code: '7208', description: 'Flat-rolled iron/steel products', sector: 'Steel & Metal', licenses: ['IRC', 'Import Registration'] },
  { code: '0306', description: 'Crustaceans (shrimp, prawns)', sector: 'Frozen Food', licenses: ['Export License', 'BFSA Certificate', 'EU/HACCP Approval'] },
  { code: '0901', description: 'Coffee', sector: 'Food Products', licenses: ['IRC', 'BSTI Certificate'] },
  { code: '5205', description: 'Cotton yarn', sector: 'Textiles', licenses: ['IRC', 'TCB Clearance'] },
  { code: '8528', description: 'Monitors, projectors, television receivers', sector: 'Electronics', licenses: ['IRC', 'BSTI Approval', 'BTRC (if smart TV)'] }
];

// REALISTIC Bank Services in Bangladesh
export const bankServices = [
  {
    id: 'bank-001',
    bank: 'Sonali Bank Limited (State-owned)',
    services: ['Corporate Current Account', 'LC (Letter of Credit)', 'Foreign Currency Account', 'Investment Advisory', 'Loan Facilities'],
    processingTime: '3-5 working days',
    requirements: ['Certificate of Incorporation', 'TIN Certificate', 'Passport/NID', 'Investment Proposal', 'Board Resolution']
  },
  {
    id: 'bank-002',
    bank: 'HSBC Bangladesh',
    services: ['Multi-currency Account', 'Trade Finance', 'Treasury Services', 'International Wire Transfer', 'Online Corporate Banking'],
    processingTime: '5-7 working days',
    requirements: ['RJSC Certificate', 'Board Resolution', 'KYC Documents', 'Business Plan', 'Tax Clearance']
  },
  {
    id: 'bank-003',
    bank: 'Standard Chartered Bangladesh',
    services: ['Business Current Account', 'SWIFT Transfers', 'FDR (Fixed Deposit)', 'Working Capital Loan', 'Foreign Exchange'],
    processingTime: '3-5 working days',
    requirements: ['Company Registration', 'Financial Statements', 'Director IDs', 'BIDA Registration', 'TIN']
  },
  {
    id: 'bank-004',
    bank: 'Dutch-Bangla Bank (DBBL)',
    services: ['Corporate Account', 'Rocket Mobile Banking', 'Online Banking', 'LC Services', 'SME Financing'],
    processingTime: '2-3 working days',
    requirements: ['Company Certificate', 'Trade License', 'TIN', 'Director NID/Passport', 'Introducer']
  },
  {
    id: 'bank-005',
    bank: 'City Bank Limited',
    services: ['Foreign Currency Account', 'Remittance Services', 'Import/Export Financing', 'Corporate Cards'],
    processingTime: '4-6 working days',
    requirements: ['Incorporation Certificate', 'Board Resolution', 'Beneficial Ownership Declaration', 'TIN', 'Trade License']
  }
];

// REALISTIC Utility Services
export const utilityServices = [
  {
    id: 'utility-001',
    provider: 'DESCO (Dhaka Electric Supply Company)',
    service: 'Industrial Power Connection',
    capacity: '100 KW to 1 MW',
    processingTime: '20-30 days',
    fee: 250000
  },
  {
    id: 'utility-002',
    provider: 'Titas Gas Transmission & Distribution Company',
    service: 'Industrial Gas Connection',
    capacity: '5,000-50,000 cubic meters/day',
    processingTime: '30-45 days',
    fee: 450000
  },
  {
    id: 'utility-003',
    provider: 'Dhaka Water Supply & Sewerage Authority (WASA)',
    service: 'Industrial Water Supply',
    capacity: '20,000-100,000 liters/day',
    processingTime: '15-25 days',
    fee: 150000
  },
  {
    id: 'utility-004',
    provider: 'BPDB (Bangladesh Power Development Board)',
    service: 'Heavy Industrial Power (132 KV)',
    capacity: '1 MW to 10 MW',
    processingTime: '45-60 days',
    fee: 1500000
  },
  {
    id: 'utility-005',
    provider: 'BTCL (Bangladesh Telecommunications Company)',
    service: 'Fiber Optic Internet (Dedicated)',
    capacity: '10 Gbps to 100 Gbps',
    processingTime: '10-15 days',
    fee: 200000
  }
];

// REALISTIC Officer Performance Data (Bangladesh government agencies)
export const officerPerformance = [
  { agency: 'RJSC', avgProcessingDays: 4.2, slaCompliance: 89, delayedCases: 34, totalCases: 312 },
  { agency: 'NBR (Tax)', avgProcessingDays: 5.8, slaCompliance: 76, delayedCases: 67, totalCases: 278 },
  { agency: 'DoE', avgProcessingDays: 12.5, slaCompliance: 58, delayedCases: 145, totalCases: 346 },
  { agency: 'Fire Service', avgProcessingDays: 8.3, slaCompliance: 71, delayedCases: 82, totalCases: 283 },
  { agency: 'DIFE', avgProcessingDays: 15.7, slaCompliance: 42, delayedCases: 198, totalCases: 341 },
  { agency: 'CCI&E', avgProcessingDays: 6.2, slaCompliance: 78, delayedCases: 55, totalCases: 251 },
  { agency: 'Bangladesh Bank', avgProcessingDays: 2.3, slaCompliance: 95, delayedCases: 12, totalCases: 240 },
  { agency: 'BPDB/Power', avgProcessingDays: 22.4, slaCompliance: 31, delayedCases: 243, totalCases: 352 },
  { agency: 'BIDA', avgProcessingDays: 3.1, slaCompliance: 92, delayedCases: 21, totalCases: 267 },
  { agency: 'BEZA', avgProcessingDays: 7.5, slaCompliance: 81, delayedCases: 38, totalCases: 201 },
  { agency: 'BEPZA', avgProcessingDays: 5.9, slaCompliance: 84, delayedCases: 31, totalCases: 194 }
];

// Service Dependencies (actual Bangladesh workflow)
export const serviceDependencies: Record<string, string[]> = {
  'step-003': ['step-001'], // Environment needs Company Registration
  'step-004': ['step-003'], // Fire needs Environment
  'step-005': ['step-003', 'step-004'], // Factory needs both Environment and Fire
  'step-006': ['step-001', 'step-002'], // IRC needs Company and TIN
  'step-007': ['step-002'], // Tax Exemption needs TIN
  'step-010': ['step-001'], // Work Permit needs Company Registration
  'step-012': ['step-005'] // Gas Connection needs Factory License
};

// REALISTIC Investment Matchmaking Opportunities (Real Bangladesh companies)
export const matchmakingOpportunities = [
  {
    id: 'match-001',
    title: 'Joint Venture - Pharmaceutical API Manufacturing',
    sector: 'Pharmaceuticals',
    localPartner: 'Beximco Pharmaceuticals Ltd',
    investmentRequired: 45000000,
    equity: '49% foreign, 51% local',
    location: 'Mirsarai Economic Zone, Chattogram',
    details: 'Seeking foreign partner for Active Pharmaceutical Ingredients (API) production. Technology transfer for oncology and cardiovascular drugs.'
  },
  {
    id: 'match-002',
    title: 'Technology Partnership - Automotive Components',
    sector: 'Automotive',
    localPartner: 'Nitol-Niloy Group',
    investmentRequired: 38000000,
    equity: '60% foreign, 40% local',
    location: 'BSMSN (Mirsarai), Chattogram',
    details: 'Automotive parts manufacturing for export and domestic market. Expertise needed in engine components and transmission systems.'
  },
  {
    id: 'match-003',
    title: 'Solar Power Plant Development',
    sector: 'Renewable Energy',
    localPartner: 'Summit Power International Ltd',
    investmentRequired: 185000000,
    equity: '70% foreign, 30% local',
    location: 'Teknaf, Cox\'s Bazar',
    details: '200 MW solar power project with battery storage. Land secured, PPA (Power Purchase Agreement) with BPDB in progress.'
  },
  {
    id: 'match-004',
    title: 'Textile Backward Linkage - Spinning Mill',
    sector: 'Textiles',
    localPartner: 'DBL Group',
    investmentRequired: 52000000,
    equity: '50% foreign, 50% local',
    location: 'Dhaka EPZ, Savar',
    details: 'High-quality yarn production for RMG sector. Technology needed for compact spinning and advanced blending.'
  },
  {
    id: 'match-005',
    title: 'Cold Chain & Frozen Food Processing',
    sector: 'Agro-processing',
    localPartner: 'PRAN-RFL Group',
    investmentRequired: 28000000,
    equity: '49% foreign, 51% local',
    location: 'Mongla EPZ, Bagerhat',
    details: 'Export-oriented frozen shrimp and fish processing with EU/US quality standards. Cold storage and blast freezing technology needed.'
  },
  {
    id: 'match-006',
    title: 'Data Center & Cloud Services',
    sector: 'IT & Digital',
    localPartner: 'Grameenphone (Telenor)',
    investmentRequired: 95000000,
    equity: '65% foreign, 35% local',
    location: 'Kaliakoir Hi-Tech Park, Gazipur',
    details: 'Tier-III certified data center for enterprise cloud services. Market access to 170 million+ population with growing digital economy.'
  }
];