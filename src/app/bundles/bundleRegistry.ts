// 📦 BUNDLE REGISTRY — Starter bundle definitions for new investors
// ARCHITECTURE: Configuration layer. Defines pre-packaged service bundles.

/**
 * STARTER BUNDLES: Pre-configured packages of government services
 * designed to fast-track common investment scenarios
 */

export interface ServiceItem {
  serviceId: string;
  serviceName: string;
  agency: string;
  processingDays: number;
  fee: number;
  currency: string;
  required: boolean;
  description?: string;
}

export interface StarterBundle {
  bundleId: string;
  name: string;
  nameLocal?: string; // Bangla name
  description: string;
  icon: string;
  targetSector: string[];
  targetInvestmentSize: 'small' | 'medium' | 'large' | 'any';
  
  // Services included
  services: ServiceItem[];
  
  // Bundle benefits
  totalSavings: number; // USD saved vs individual services
  totalTime: number; // Total days
  fastTrackDays?: number; // Days saved with bundle
  
  // Pricing
  individualPrice: number;
  bundlePrice: number;
  discountPercentage: number;
  currency: string;
  
  // Eligibility
  eligibilityCriteria: string[];
  recommendedFor: string[];
  
  // Popularity
  popularity: number; // 1-5 stars
  usedBy: number; // Number of companies
  
  // Status
  active: boolean;
  seasonal?: boolean; // Special seasonal offerings
}

/**
 * 📦 AVAILABLE STARTER BUNDLES
 */
export const starterBundles: StarterBundle[] = [
  {
    bundleId: 'BUNDLE-001',
    name: 'Manufacturing Quick Start',
    nameLocal: 'উৎপাদন দ্রুত শুরু',
    description: 'Complete package for setting up a manufacturing unit in Bangladesh. Includes all essential registrations, permits, and clearances.',
    icon: 'Factory',
    targetSector: ['Manufacturing', 'Textiles', 'Pharmaceuticals'],
    targetInvestmentSize: 'medium',
    services: [
      {
        serviceId: 'SRV-001',
        serviceName: 'Company Registration (RJSC)',
        agency: 'RJSC',
        processingDays: 5,
        fee: 500,
        currency: 'USD',
        required: true,
        description: 'Register your company with RJSC'
      },
      {
        serviceId: 'SRV-002',
        serviceName: 'Trade License',
        agency: 'City Corporation',
        processingDays: 7,
        fee: 300,
        currency: 'USD',
        required: true,
        description: 'Municipal trade license for business operations'
      },
      {
        serviceId: 'SRV-003',
        serviceName: 'TIN Registration',
        agency: 'NBR',
        processingDays: 3,
        fee: 0,
        currency: 'USD',
        required: true,
        description: 'Tax Identification Number'
      },
      {
        serviceId: 'SRV-004',
        serviceName: 'Environmental Clearance',
        agency: 'DoE',
        processingDays: 15,
        fee: 1000,
        currency: 'USD',
        required: true,
        description: 'Environmental compliance certificate'
      },
      {
        serviceId: 'SRV-005',
        serviceName: 'Factory License',
        agency: 'DIFE',
        processingDays: 10,
        fee: 400,
        currency: 'USD',
        required: true,
        description: 'License to operate factory'
      },
      {
        serviceId: 'SRV-006',
        serviceName: 'Fire Safety Certificate',
        agency: 'Fire Service',
        processingDays: 7,
        fee: 250,
        currency: 'USD',
        required: true,
        description: 'Fire safety compliance'
      },
      {
        serviceId: 'SRV-007',
        serviceName: 'Import Registration Certificate (IRC)',
        agency: 'CCI&E',
        processingDays: 5,
        fee: 350,
        currency: 'USD',
        required: false,
        description: 'For importing raw materials/equipment'
      }
    ],
    totalSavings: 580,
    totalTime: 52,
    fastTrackDays: 18,
    individualPrice: 3380,
    bundlePrice: 2800,
    discountPercentage: 17,
    currency: 'USD',
    eligibilityCriteria: [
      'Investment amount > $1 million',
      'Manufacturing or production facility',
      'Compliant with environmental standards'
    ],
    recommendedFor: [
      'Electronics manufacturing',
      'Textile and garment factories',
      'Pharmaceutical production',
      'Food processing units'
    ],
    popularity: 5,
    usedBy: 342,
    active: true
  },
  {
    bundleId: 'BUNDLE-002',
    name: 'Tech Startup Express',
    nameLocal: 'প্রযুক্তি স্টার্টআপ এক্সপ্রেস',
    description: 'Streamlined package for ICT and software companies. Fast-track your tech business setup.',
    icon: 'Laptop',
    targetSector: ['ICT', 'Services'],
    targetInvestmentSize: 'small',
    services: [
      {
        serviceId: 'SRV-001',
        serviceName: 'Company Registration (RJSC)',
        agency: 'RJSC',
        processingDays: 5,
        fee: 500,
        currency: 'USD',
        required: true
      },
      {
        serviceId: 'SRV-002',
        serviceName: 'Trade License',
        agency: 'City Corporation',
        processingDays: 7,
        fee: 300,
        currency: 'USD',
        required: true
      },
      {
        serviceId: 'SRV-003',
        serviceName: 'TIN Registration',
        agency: 'NBR',
        processingDays: 3,
        fee: 0,
        currency: 'USD',
        required: true
      },
      {
        serviceId: 'SRV-021',
        serviceName: 'BTRC Registration',
        agency: 'BTRC',
        processingDays: 5,
        fee: 200,
        currency: 'USD',
        required: false,
        description: 'For telecom/ISP services'
      }
    ],
    totalSavings: 250,
    totalTime: 20,
    fastTrackDays: 8,
    individualPrice: 1250,
    bundlePrice: 1000,
    discountPercentage: 20,
    currency: 'USD',
    eligibilityCriteria: [
      'ICT or software services',
      'No manufacturing/production',
      'Office-based operations'
    ],
    recommendedFor: [
      'Software development companies',
      'IT consulting firms',
      'Digital agencies',
      'SaaS businesses'
    ],
    popularity: 4,
    usedBy: 187,
    active: true
  },
  {
    bundleId: 'BUNDLE-003',
    name: 'Export-Ready Package',
    nameLocal: 'রপ্তানি-প্রস্তুত প্যাকেজ',
    description: 'Complete setup for export-oriented businesses. Includes all certifications needed for international trade.',
    icon: 'Ship',
    targetSector: ['Textiles', 'Manufacturing', 'Agriculture'],
    targetInvestmentSize: 'large',
    services: [
      {
        serviceId: 'SRV-001',
        serviceName: 'Company Registration (RJSC)',
        agency: 'RJSC',
        processingDays: 5,
        fee: 500,
        currency: 'USD',
        required: true
      },
      {
        serviceId: 'SRV-002',
        serviceName: 'Trade License',
        agency: 'City Corporation',
        processingDays: 7,
        fee: 300,
        currency: 'USD',
        required: true
      },
      {
        serviceId: 'SRV-003',
        serviceName: 'TIN Registration',
        agency: 'NBR',
        processingDays: 3,
        fee: 0,
        currency: 'USD',
        required: true
      },
      {
        serviceId: 'SRV-007',
        serviceName: 'Import Registration Certificate (IRC)',
        agency: 'CCI&E',
        processingDays: 5,
        fee: 350,
        currency: 'USD',
        required: true
      },
      {
        serviceId: 'SRV-008',
        serviceName: 'Export Registration Certificate (ERC)',
        agency: 'CCI&E',
        processingDays: 5,
        fee: 350,
        currency: 'USD',
        required: true
      },
      {
        serviceId: 'SRV-009',
        serviceName: 'Bond License (Duty-free imports)',
        agency: 'Customs',
        processingDays: 10,
        fee: 600,
        currency: 'USD',
        required: false
      },
      {
        serviceId: 'SRV-010',
        serviceName: 'ISO Certification Support',
        agency: 'Third Party',
        processingDays: 30,
        fee: 2500,
        currency: 'USD',
        required: false,
        description: 'ISO 9001 certification assistance'
      }
    ],
    totalSavings: 820,
    totalTime: 65,
    fastTrackDays: 22,
    individualPrice: 5420,
    bundlePrice: 4600,
    discountPercentage: 15,
    currency: 'USD',
    eligibilityCriteria: [
      'Export-oriented business',
      'Investment amount > $5 million',
      'Compliance with international standards'
    ],
    recommendedFor: [
      'Ready-made garment (RMG) factories',
      'Agricultural exporters',
      'Leather goods manufacturers',
      'Handicraft exporters'
    ],
    popularity: 3,
    usedBy: 256,
    active: true
  }
];

/**
 * 🔍 GET BUNDLE BY ID
 */
export function getBundleById(bundleId: string): StarterBundle | null {
  return starterBundles.find(b => b.bundleId === bundleId) || null;
}

/**
 * 🎯 RECOMMEND BUNDLES
 * Returns bundles matching investor profile
 */
export function recommendBundles(
  sector?: string,
  investmentSize?: StarterBundle['targetInvestmentSize']
): StarterBundle[] {
  return starterBundles.filter(bundle => {
    if (!bundle.active) return false;
    
    const sectorMatch = !sector || bundle.targetSector.includes(sector) || bundle.targetSector.includes('any');
    const sizeMatch = !investmentSize || bundle.targetInvestmentSize === investmentSize || bundle.targetInvestmentSize === 'any';
    
    return sectorMatch && sizeMatch;
  }).sort((a, b) => b.popularity - a.popularity);
}

/**
 * 📊 GET BUNDLE STATISTICS
 */
export function getBundleStats() {
  const active = starterBundles.filter(b => b.active).length;
  const totalUsers = starterBundles.reduce((sum, b) => sum + b.usedBy, 0);
  const avgDiscount = starterBundles.reduce((sum, b) => sum + b.discountPercentage, 0) / starterBundles.length;
  const avgTimeSaved = starterBundles.reduce((sum, b) => sum + (b.fastTrackDays || 0), 0) / starterBundles.length;
  
  return {
    totalBundles: starterBundles.length,
    activeBundles: active,
    totalUsers,
    avgDiscount: Math.round(avgDiscount),
    avgTimeSaved: Math.round(avgTimeSaved),
    mostPopular: starterBundles.reduce((prev, curr) => 
      curr.popularity > prev.popularity ? curr : prev
    )
  };
}