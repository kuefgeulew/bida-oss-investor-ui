// Partner Registry - Database of vetted business partners
// READ-ONLY registry for matchmaker engine
// Contains: local suppliers, service providers, financial institutions, consultants

export interface Partner {
  id: string;
  name: string;
  type: 'supplier' | 'service-provider' | 'financial' | 'consultant' | 'legal' | 'technology';
  category: string;
  
  profile: {
    established: number; // year
    employees: number;
    revenue: string;
    website: string;
    email: string;
    phone: string;
  };
  
  services: string[];
  sectors: string[]; // Industries they serve
  certifications: string[];
  
  location: {
    district: string;
    address: string;
  };
  
  capabilities: {
    capacity: string;
    leadTime: string;
    minOrderValue?: string;
  };
  
  experience: {
    yearsInBusiness: number;
    clientsServed: number;
    successRate: number;
  };
  
  rating: {
    overall: number; // 1-5
    reliability: number;
    quality: number;
    communication: number;
    reviews: number;
  };
  
  tags: string[]; // For matchmaking algorithm
}

export const partnerRegistry: Partner[] = [
  // Suppliers
  {
    id: 'partner-001',
    name: 'Bengal Industrial Supplies Ltd',
    type: 'supplier',
    category: 'Raw Materials',
    profile: {
      established: 2005,
      employees: 150,
      revenue: '$5M annually',
      website: 'www.bengalindustrial.bd',
      email: 'contact@bengalindustrial.bd',
      phone: '+880-2-9876543',
    },
    services: ['Steel Supply', 'Metal Fabrication', 'Industrial Parts'],
    sectors: ['Manufacturing', 'Construction', 'Heavy Industry'],
    certifications: ['ISO 9001', 'ASTM Certified'],
    location: {
      district: 'Dhaka',
      address: 'Plot 45, Tejgaon Industrial Area',
    },
    capabilities: {
      capacity: '500 tons/month',
      leadTime: '2-4 weeks',
      minOrderValue: '$10,000',
    },
    experience: {
      yearsInBusiness: 19,
      clientsServed: 340,
      successRate: 96,
    },
    rating: {
      overall: 4.7,
      reliability: 4.8,
      quality: 4.6,
      communication: 4.7,
      reviews: 128,
    },
    tags: ['manufacturing', 'steel', 'metal', 'industrial', 'reliable'],
  },
  
  {
    id: 'partner-002',
    name: 'TechBD IT Solutions',
    type: 'technology',
    category: 'IT Services',
    profile: {
      established: 2015,
      employees: 85,
      revenue: '$2.5M annually',
      website: 'www.techbd.com',
      email: 'hello@techbd.com',
      phone: '+880-2-8765432',
    },
    services: ['ERP Implementation', 'Custom Software', 'Cloud Services', 'Cybersecurity'],
    sectors: ['All Industries', 'Technology', 'Finance'],
    certifications: ['ISO 27001', 'AWS Partner', 'Microsoft Gold Partner'],
    location: {
      district: 'Dhaka',
      address: 'Bashundhara R/A, Block E',
    },
    capabilities: {
      capacity: '20 concurrent projects',
      leadTime: '4-12 weeks',
      minOrderValue: '$15,000',
    },
    experience: {
      yearsInBusiness: 9,
      clientsServed: 180,
      successRate: 94,
    },
    rating: {
      overall: 4.8,
      reliability: 4.9,
      quality: 4.8,
      communication: 4.7,
      reviews: 92,
    },
    tags: ['technology', 'it', 'software', 'erp', 'cloud', 'security'],
  },
  
  {
    id: 'partner-003',
    name: 'Green Energy Consultants BD',
    type: 'consultant',
    category: 'Environmental Compliance',
    profile: {
      established: 2012,
      employees: 32,
      revenue: '$1.2M annually',
      website: 'www.greenenergy.bd',
      email: 'info@greenenergy.bd',
      phone: '+880-2-7654321',
    },
    services: ['Environmental Impact Assessment', 'Green Certifications', 'Sustainability Consulting', 'Waste Management'],
    sectors: ['Manufacturing', 'Textile', 'Pharmaceuticals', 'All Industries'],
    certifications: ['LEED Accredited', 'ISO 14001 Auditor'],
    location: {
      district: 'Dhaka',
      address: 'Gulshan Avenue, Road 45',
    },
    capabilities: {
      capacity: '15 projects/quarter',
      leadTime: '6-8 weeks',
      minOrderValue: '$8,000',
    },
    experience: {
      yearsInBusiness: 12,
      clientsServed: 210,
      successRate: 98,
    },
    rating: {
      overall: 4.9,
      reliability: 5.0,
      quality: 4.9,
      communication: 4.8,
      reviews: 67,
    },
    tags: ['environment', 'sustainability', 'green', 'compliance', 'esg'],
  },
  
  {
    id: 'partner-004',
    name: 'Prime Bank Corporate Banking',
    type: 'financial',
    category: 'Banking Services',
    profile: {
      established: 1995,
      employees: 2500,
      revenue: '$500M annually',
      website: 'www.primebank.com.bd',
      email: 'corporate@primebank.com.bd',
      phone: '+880-2-9876000',
    },
    services: ['Business Loans', 'Trade Finance', 'Foreign Exchange', 'Investment Banking'],
    sectors: ['All Industries'],
    certifications: ['Bangladesh Bank Licensed', 'SWIFT Member'],
    location: {
      district: 'Dhaka',
      address: 'Motijheel Commercial Area',
    },
    capabilities: {
      capacity: 'Up to $50M financing',
      leadTime: '2-6 weeks approval',
    },
    experience: {
      yearsInBusiness: 29,
      clientsServed: 5000,
      successRate: 92,
    },
    rating: {
      overall: 4.5,
      reliability: 4.6,
      quality: 4.5,
      communication: 4.4,
      reviews: 445,
    },
    tags: ['finance', 'banking', 'loans', 'trade-finance', 'investment'],
  },
  
  {
    id: 'partner-005',
    name: 'Legal Associates Bangladesh',
    type: 'legal',
    category: 'Corporate Law',
    profile: {
      established: 2008,
      employees: 28,
      revenue: '$1.8M annually',
      website: 'www.legalbd.com',
      email: 'partners@legalbd.com',
      phone: '+880-2-8765000',
    },
    services: ['Company Formation', 'Contract Law', 'IP Protection', 'Regulatory Compliance'],
    sectors: ['All Industries'],
    certifications: ['Bar Council Bangladesh', 'ICC Arbitrator'],
    location: {
      district: 'Dhaka',
      address: 'Dhanmondi, Road 27',
    },
    capabilities: {
      capacity: '50 active cases',
      leadTime: '1-3 weeks for routine matters',
    },
    experience: {
      yearsInBusiness: 16,
      clientsServed: 420,
      successRate: 97,
    },
    rating: {
      overall: 4.8,
      reliability: 4.9,
      quality: 4.8,
      communication: 4.7,
      reviews: 156,
    },
    tags: ['legal', 'law', 'compliance', 'contracts', 'intellectual-property'],
  },
  
  {
    id: 'partner-006',
    name: 'Logistics Plus Bangladesh',
    type: 'service-provider',
    category: 'Logistics & Freight',
    profile: {
      established: 2010,
      employees: 180,
      revenue: '$8M annually',
      website: 'www.logisticsplus.bd',
      email: 'operations@logisticsplus.bd',
      phone: '+880-2-7890000',
    },
    services: ['Freight Forwarding', 'Customs Clearance', 'Warehousing', 'Last Mile Delivery'],
    sectors: ['Manufacturing', 'Retail', 'E-commerce', 'All Industries'],
    certifications: ['ISO 9001', 'IATA Certified', 'Customs Approved'],
    location: {
      district: 'Chittagong',
      address: 'Chittagong Port Area, Bay Terminal',
    },
    capabilities: {
      capacity: '1000 TEU/month',
      leadTime: '24-48 hours customs clearance',
    },
    experience: {
      yearsInBusiness: 14,
      clientsServed: 680,
      successRate: 95,
    },
    rating: {
      overall: 4.6,
      reliability: 4.7,
      quality: 4.6,
      communication: 4.5,
      reviews: 298,
    },
    tags: ['logistics', 'shipping', 'freight', 'customs', 'warehousing'],
  },
  
  {
    id: 'partner-007',
    name: 'HR Excellence Bangladesh',
    type: 'consultant',
    category: 'Human Resources',
    profile: {
      established: 2013,
      employees: 45,
      revenue: '$1.5M annually',
      website: 'www.hrexcellence.bd',
      email: 'recruit@hrexcellence.bd',
      phone: '+880-2-6543210',
    },
    services: ['Recruitment', 'Training & Development', 'HR Compliance', 'Payroll Management'],
    sectors: ['All Industries'],
    certifications: ['SHRM Certified', 'ISO 9001'],
    location: {
      district: 'Dhaka',
      address: 'Banani, Road 11',
    },
    capabilities: {
      capacity: '500 placements/year',
      leadTime: '2-6 weeks per position',
    },
    experience: {
      yearsInBusiness: 11,
      clientsServed: 290,
      successRate: 93,
    },
    rating: {
      overall: 4.7,
      reliability: 4.8,
      quality: 4.7,
      communication: 4.6,
      reviews: 185,
    },
    tags: ['hr', 'recruitment', 'training', 'talent', 'workforce'],
  },
  
  {
    id: 'partner-008',
    name: 'Quality Assurance Labs BD',
    type: 'service-provider',
    category: 'Testing & Certification',
    profile: {
      established: 2007,
      employees: 68,
      revenue: '$2.2M annually',
      website: 'www.qalabs.bd',
      email: 'testing@qalabs.bd',
      phone: '+880-2-5432100',
    },
    services: ['Product Testing', 'Quality Certification', 'Laboratory Services', 'Compliance Testing'],
    sectors: ['Textile', 'Pharmaceuticals', 'Food', 'Manufacturing'],
    certifications: ['ISO 17025', 'NABL Accredited', 'UKAS Approved'],
    location: {
      district: 'Gazipur',
      address: 'BSCIC Industrial Area',
    },
    capabilities: {
      capacity: '2000 tests/month',
      leadTime: '3-7 days for standard tests',
    },
    experience: {
      yearsInBusiness: 17,
      clientsServed: 550,
      successRate: 99,
    },
    rating: {
      overall: 4.9,
      reliability: 5.0,
      quality: 4.9,
      communication: 4.8,
      reviews: 312,
    },
    tags: ['testing', 'quality', 'certification', 'lab', 'compliance'],
  },
];

// Export type
export type PartnerType = Partner['type'];
export type PartnerCategory = Partner['category'];
