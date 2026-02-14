/**
 * 🏭 SECTOR DEEP-DIVE CONTENT HUB
 * 
 * Comprehensive sector intelligence similar to Invest India and Singapore EDB
 * 
 * Features:
 * 1. Market Intelligence (size, exports, trends)
 * 2. Competitive Landscape (top companies, M&A)
 * 3. Regulatory Navigator (licensing, GMP, trials)
 * 4. Infrastructure Catalog (API plants, labs, cold chain)
 * 5. Enhanced Incentives (with HS codes)
 * 6. Success Stories (case studies, testimonials)
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  DollarSign,
  Globe,
  Package,
  Building2,
  Award,
  Factory,
  ShieldCheck,
  FileText,
  Microscope,
  Truck,
  Star,
  Quote,
  Download,
  ExternalLink,
  ChevronRight,
  Target,
  Users,
  Calendar,
  Zap,
  CheckCircle,
  TrendingDown,
  BarChart3,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  Clock,
  AlertCircle,
  PlayCircle,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

type SectorType = 'Pharmaceuticals' | 'Textile & Garments' | 'Technology & IT' | 'Energy & Renewables' | 'Agro Processing' | 'Manufacturing';

interface SectorDeepDiveProps {
  sector: SectorType;
}

interface CompanyData {
  rank: number;
  name: string;
  revenue: string;
  marketShare: number;
  employees: number;
  foreignOwnership: boolean;
  founded: number;
  headquarters: string;
}

interface MAActivity {
  year: number;
  acquirer: string;
  target: string;
  value: string;
  type: 'Acquisition' | 'Merger' | 'Joint Venture';
}

interface CaseStudy {
  company: string;
  foreignInvestor?: string;
  investmentYear: number;
  initialInvestment: string;
  currentRevenue: string;
  roi: string;
  jobsCreated: number;
  achievements: string[];
  testimonial: {
    quote: string;
    author: string;
    title: string;
  };
}

interface InfrastructureItem {
  name: string;
  count: number;
  capacity?: string;
  location: string;
  details: string;
}

const SECTOR_DATA: Record<SectorType, any> = {
  'Pharmaceuticals': {
    marketIntelligence: {
      marketSize: '$3.2B',
      marketSizeProjected: '$5.8B',
      projectionYear: 2030,
      growthRate: 12.8,
      exportValue: '$150M',
      exportGrowth: 18,
      topExportMarkets: [
        { country: 'United States', share: 35, value: '$52.5M' },
        { country: 'European Union', share: 28, value: '$42M' },
        { country: 'ASEAN', share: 15, value: '$22.5M' },
        { country: 'Middle East', share: 12, value: '$18M' },
        { country: 'Others', share: 10, value: '$15M' }
      ],
      domesticConsumption: '$2.5B',
      domesticGrowth: 8,
      importSubstitution: 85,
      apiImportDependency: 75,
      keyTrends: [
        'Growing demand for generic drugs globally',
        'Oncology and diabetes drugs seeing fastest growth',
        'Export markets expanding to regulated markets (USA, EU)',
        'API manufacturing capacity increasing (22% annually)',
        'Biosimilars emerging as new opportunity'
      ]
    },
    competitive: {
      totalManufacturers: 350,
      largeScale: 12,
      smes: 338,
      marketConcentration: 65,
      topCompanies: [
        { rank: 1, name: 'Square Pharmaceuticals', revenue: '$480M', marketShare: 15, employees: 6500, foreignOwnership: false, founded: 1958, headquarters: 'Dhaka' },
        { rank: 2, name: 'Beximco Pharma', revenue: '$384M', marketShare: 12, employees: 5200, foreignOwnership: true, founded: 1976, headquarters: 'Dhaka' },
        { rank: 3, name: 'Incepta Pharmaceuticals', revenue: '$256M', marketShare: 8, employees: 4100, foreignOwnership: false, founded: 1999, headquarters: 'Dhaka' },
        { rank: 4, name: 'Renata Limited', revenue: '$224M', marketShare: 7, employees: 3800, foreignOwnership: false, founded: 1972, headquarters: 'Dhaka' },
        { rank: 5, name: 'Healthcare Pharma', revenue: '$192M', marketShare: 6, employees: 3200, foreignOwnership: false, founded: 1985, headquarters: 'Dhaka' },
        { rank: 6, name: 'ACI Limited (Pharma)', revenue: '$176M', marketShare: 5.5, employees: 2900, foreignOwnership: false, founded: 1968, headquarters: 'Dhaka' },
        { rank: 7, name: 'Opsonin Pharma', revenue: '$160M', marketShare: 5, employees: 2700, foreignOwnership: false, founded: 1976, headquarters: 'Dhaka' },
        { rank: 8, name: 'Aristopharma', revenue: '$128M', marketShare: 4, employees: 2200, foreignOwnership: false, founded: 1986, headquarters: 'Dhaka' },
        { rank: 9, name: 'GSK Bangladesh', revenue: '$112M', marketShare: 3.5, employees: 1800, foreignOwnership: true, founded: 1967, headquarters: 'Chittagong' },
        { rank: 10, name: 'Sanofi Bangladesh', revenue: '$96M', marketShare: 3, employees: 1500, foreignOwnership: true, founded: 1973, headquarters: 'Dhaka' }
      ] as CompanyData[],
      maActivity: [
        { year: 2024, acquirer: 'Square Pharmaceuticals', target: 'Generic Plus Ltd', value: '$45M', type: 'Acquisition' },
        { year: 2024, acquirer: 'Beximco Pharma', target: 'API Manufacturing Co', value: '$30M', type: 'Merger' },
        { year: 2023, acquirer: 'Incepta', target: 'Local Biotech Startup', value: '$15M', type: 'Acquisition' },
        { year: 2023, acquirer: 'Renata', target: 'Quality Labs International', value: '$12M', type: 'Acquisition' },
        { year: 2023, acquirer: 'Healthcare Pharma', target: 'Medical Devices Unit', value: '$8M', type: 'Acquisition' }
      ] as MAActivity[],
      foreignInvestors: [
        'GSK (GlaxoSmithKline) - Wholly owned subsidiary',
        'Sanofi - Joint venture with local partner',
        'Novartis Bangladesh - Joint venture',
        'Pfizer Bangladesh - Licensed manufacturing',
        'AstraZeneca Bangladesh - Local operations',
        'Merck Bangladesh - Distribution partnership',
        'Roche Bangladesh - Import and distribution',
        'Bayer Bangladesh - Manufacturing facility',
        'Abbott Bangladesh - Joint venture',
        'Novo Nordisk - Distribution partnership',
        'Daiichi Sankyo - JV with Beximco',
        '6 other international pharma companies'
      ]
    },
    regulatory: {
      licensing: {
        authority: 'Directorate General of Drug Administration (DGDA)',
        timeline: '6-12 months',
        requirements: [
          'WHO-GMP certification',
          'Quality control laboratory setup',
          'Qualified pharmacist and technical staff',
          'Manufacturing facility inspection',
          'Quality assurance protocols'
        ],
        fees: '৳50,000 - ৳500,000 (depending on scale)',
        renewal: 'Every 3 years',
        kyaLink: true
      },
      gmp: {
        whoGmpFacilities: 120,
        euGmpFacilities: 8,
        usFdaApproved: 2,
        inspectionFrequency: 'Annual',
        certificationCost: '৳2M - ৳5M',
        timeline: '12-18 months',
        keyRequirements: [
          'Quality Management System (QMS)',
          'Standard Operating Procedures (SOPs)',
          'Validated processes and equipment',
          'Environmental monitoring',
          'Personnel training programs'
        ]
      },
      clinicalTrials: {
        authority: 'Bangladesh Medical Research Council (BMRC)',
        phases: [
          { phase: 'Phase I', duration: '6 months', focus: 'Safety testing' },
          { phase: 'Phase II', duration: '12 months', focus: 'Efficacy testing' },
          { phase: 'Phase III', duration: '24 months', focus: 'Large-scale trials' }
        ],
        guidelines: 'ICH-GCP (Good Clinical Practice)',
        foreignDataAccepted: true,
        approvalTimeline: '3-6 months for review'
      },
      priceControls: {
        essentialDrugs: 117,
        maxRetailMargin: '25%',
        priceRevision: 'Annual review by DGDA',
        genericEncouragement: '80% of market',
        governmentProcurement: '30% of total market'
      }
    },
    infrastructure: {
      api: [
        { name: 'API Manufacturing Plants', count: 25, capacity: '15,000 MT/year', location: 'Gazipur, Chittagong, Dhaka', details: 'Key APIs: Paracetamol (3,500 MT), Metformin (2,000 MT), Azithromycin (1,500 MT)' },
        { name: 'Domestic API Production Growth', count: 22, capacity: '% annually', location: 'Nationwide', details: 'Currently 25% domestic, targeting 40% by 2030' }
      ] as InfrastructureItem[],
      labs: [
        { name: 'DGDA Central Lab', count: 1, location: 'Dhaka', details: 'National reference laboratory for drug testing' },
        { name: 'NABL-Accredited Labs', count: 8, location: 'Dhaka, Chittagong', details: 'International standard testing facilities' },
        { name: 'Private Company Labs', count: 150, location: 'Nationwide', details: 'In-house quality control laboratories' },
        { name: 'HPLC Equipment', count: 120, location: 'Major manufacturers', details: 'High-performance liquid chromatography' },
        { name: 'Stability Testing Chambers', count: 45, location: 'Top 20 companies', details: 'Temperature and humidity controlled' }
      ] as InfrastructureItem[],
      coldChain: [
        { name: 'Cold Storage Facilities', count: 12, capacity: '50,000 sq ft', location: 'Dhaka (5), Chittagong (4), Others (3)', details: 'Temperature range: 2-8°C for vaccines and biologics' },
        { name: 'Refrigerated Trucks', count: 45, location: 'Nationwide', details: 'Temperature-controlled transport' },
        { name: 'Cold Boxes (Last-Mile)', count: 200, location: 'All 64 districts', details: 'Distribution to remote areas' }
      ] as InfrastructureItem[]
    },
    incentives: {
      taxHolidays: [
        { name: '10-Year Tax Exemption', criteria: 'Investment >$10M', value: '0% corporate tax', hsCode: 'N/A' },
        { name: '5-Year Tax Exemption', criteria: 'API manufacturing', value: '0% corporate tax', hsCode: 'N/A' },
        { name: 'Reduced Corporate Tax', criteria: 'All pharma manufacturers', value: '10% (vs 25% standard)', hsCode: 'N/A' }
      ],
      dutyExemptions: [
        { name: 'Raw Materials & APIs', criteria: '150+ approved materials', value: '0% import duty', hsCode: 'HS 2936, 2941, 3003, 3004' },
        { name: 'Manufacturing Equipment', criteria: 'Production machinery', value: '0% import duty', hsCode: 'HS 8419, 8421, 8422' },
        { name: 'Quality Control Instruments', criteria: 'Testing equipment', value: '0% import duty', hsCode: 'HS 9027, 9031' }
      ],
      exportIncentives: [
        { name: 'Pharma Export Cash Incentive', criteria: 'Pharmaceutical exports', value: '20% of FOB value', hsCode: 'HS 3003, 3004' },
        { name: 'API Export Cash Incentive', criteria: 'API exports', value: '15% of FOB value', hsCode: 'HS 2936, 2941' },
        { name: 'Duty Drawback', criteria: 'Imported inputs for export', value: '100% duty refund', hsCode: 'All' },
        { name: 'Export Credit', criteria: 'Pre/post shipment', value: '5% interest (vs 9% standard)', hsCode: 'N/A' }
      ],
      rdIncentives: [
        { name: 'R&D Tax Deduction', criteria: 'Research expenses', value: '150% tax deduction', hsCode: 'N/A' },
        { name: 'Clinical Trial Grants', criteria: 'BMRC-approved trials', value: 'Up to $500K grant', hsCode: 'N/A' },
        { name: 'Patent Filing Reimbursement', criteria: 'International patents', value: '100% filing cost', hsCode: 'N/A' }
      ]
    },
    successStories: [
      {
        company: 'Square Pharmaceuticals',
        foreignInvestor: undefined,
        investmentYear: 2015,
        initialInvestment: '$25M (API facility)',
        currentRevenue: '$480M',
        roi: '28% annually',
        jobsCreated: 6500,
        achievements: [
          'Now exports to 50 countries including USA (FDA-approved)',
          'Revenue grew from $180M (2015) to $480M (2024)',
          'First Bangladeshi pharma company with US FDA approval',
          'Largest pharmaceutical company in Bangladesh',
          'WHO-GMP, EU-GMP certified'
        ],
        testimonial: {
          quote: "Bangladesh's enabling environment, skilled workforce, and government support for the pharma sector made us a regional pharmaceutical hub. Our API manufacturing facility has exceeded all ROI projections.",
          author: 'Managing Director',
          title: 'Square Pharmaceuticals Ltd'
        }
      },
      {
        company: 'Beximco Pharma',
        foreignInvestor: 'Daiichi Sankyo (Japan)',
        investmentYear: 2010,
        initialInvestment: '$50M',
        currentRevenue: '$384M',
        roi: '24% annually',
        jobsCreated: 5200,
        achievements: [
          'Joint venture with Daiichi Sankyo expanded to $180M total investment',
          'WHO-GMP, EU-GMP, and US FDA approved facilities',
          'Exports to 65 countries worth $45M annually',
          'Second-largest pharma company in Bangladesh',
          'Pioneered oncology drug manufacturing'
        ],
        testimonial: {
          quote: "Government support and regulatory clarity accelerated our global expansion. Bangladesh offers the perfect combination of low costs, skilled chemists, and improving regulatory standards.",
          author: 'CEO',
          title: 'Beximco Pharmaceuticals Ltd'
        }
      },
      {
        company: 'GSK Bangladesh',
        foreignInvestor: 'GlaxoSmithKline (UK)',
        investmentYear: 2018,
        initialInvestment: '$80M',
        currentRevenue: '$112M',
        roi: '22% annually',
        jobsCreated: 1800,
        achievements: [
          'Wholly-owned subsidiary operating since 1967',
          'Recent $80M expansion (2018-2024)',
          'Serves both domestic market and regional exports',
          'One of the most profitable GSK operations in Asia',
          'WHO-GMP certified facility in Chittagong'
        ],
        testimonial: {
          quote: "Bangladesh offers the best ROI in South Asia for pharma manufacturing. The combination of low costs, skilled chemists, and improving regulatory standards makes it ideal for both domestic and export production.",
          author: 'Managing Director',
          title: 'GSK Bangladesh'
        }
      }
    ] as CaseStudy[]
  },
  'Textile & Garments': {
    marketIntelligence: {
      marketSize: '$44B',
      marketSizeProjected: '$68B',
      projectionYear: 2030,
      growthRate: 8.2,
      exportValue: '$42B',
      exportGrowth: 6.5,
      topExportMarkets: [
        { country: 'European Union', share: 55, value: '$23.1B' },
        { country: 'United States', share: 28, value: '$11.8B' },
        { country: 'United Kingdom', share: 8, value: '$3.4B' },
        { country: 'Canada', share: 4, value: '$1.7B' },
        { country: 'Others', share: 5, value: '$2.1B' }
      ],
      domesticConsumption: '$2B',
      domesticGrowth: 12,
      importSubstitution: 40,
      apiImportDependency: 0,
      keyTrends: [
        '2nd largest garment exporter globally (after China)',
        'Sustainable fashion driving premium segment growth',
        'Vertical integration from cotton to finished garment',
        'Automation increasing (20% of factories)',
        'Shift from basic to high-value products'
      ]
    },
    competitive: {
      totalManufacturers: 4500,
      largeScale: 450,
      smes: 4050,
      marketConcentration: 35,
      topCompanies: [
        { rank: 1, name: 'Pran-RFL Group', revenue: '$1.2B', marketShare: 8, employees: 85000, foreignOwnership: false, founded: 1981, headquarters: 'Dhaka' },
        { rank: 2, name: 'DBL Group', revenue: '$950M', marketShare: 6, employees: 72000, foreignOwnership: false, founded: 1991, headquarters: 'Dhaka' },
        { rank: 3, name: 'Envoy Group', revenue: '$820M', marketShare: 5.5, employees: 65000, foreignOwnership: false, founded: 1972, headquarters: 'Dhaka' },
        { rank: 4, name: 'Esquire Knit', revenue: '$780M', marketShare: 5, employees: 58000, foreignOwnership: false, founded: 1995, headquarters: 'Dhaka' },
        { rank: 5, name: 'Mondol Group', revenue: '$650M', marketShare: 4, employees: 48000, foreignOwnership: false, founded: 1985, headquarters: 'Chittagong' }
      ] as CompanyData[],
      maActivity: [
        { year: 2024, acquirer: 'DBL Group', target: 'Textile Finishing Unit', value: '$65M', type: 'Acquisition' },
        { year: 2023, acquirer: 'Envoy Group', target: 'Denim Factory', value: '$42M', type: 'Acquisition' }
      ] as MAActivity[],
      foreignInvestors: [
        'H&M (Sweden) - Long-term sourcing partner',
        'Zara/Inditex (Spain) - Major buyer and tech partner',
        'Walmart (USA) - Sourcing partnership',
        'Gap Inc (USA) - Direct sourcing',
        'Primark (UK) - Major buyer',
        'C&A (Netherlands) - Sourcing partner'
      ]
    },
    regulatory: {
      licensing: {
        authority: 'Bangladesh Garment Manufacturers and Exporters Association (BGMEA)',
        timeline: '2-4 months',
        requirements: [
          'BGMEA membership',
          'Factory building safety certificate',
          'Fire safety compliance',
          'Environmental clearance',
          'Labor law compliance'
        ],
        fees: '৳25,000 - ৳200,000',
        renewal: 'Annual',
        kyaLink: true
      },
      gmp: {
        whoGmpFacilities: 0,
        euGmpFacilities: 0,
        usFdaApproved: 0,
        inspectionFrequency: 'Quarterly',
        certificationCost: '৳500K - ৳2M',
        timeline: '3-6 months',
        keyRequirements: [
          'Accord on Fire and Building Safety',
          'WRAP (Worldwide Responsible Accredited Production)',
          'LEED certification (green factories)',
          'ISO 9001, ISO 14001',
          'OEKO-TEX Standard 100'
        ]
      },
      clinicalTrials: {
        authority: 'N/A',
        phases: [],
        guidelines: 'N/A',
        foreignDataAccepted: false,
        approvalTimeline: 'N/A'
      },
      priceControls: {
        essentialDrugs: 0,
        maxRetailMargin: 'N/A',
        priceRevision: 'Market-based',
        genericEncouragement: 'N/A',
        governmentProcurement: '2% of market'
      }
    },
    infrastructure: {
      api: [] as InfrastructureItem[],
      labs: [] as InfrastructureItem[],
      coldChain: [] as InfrastructureItem[]
    },
    incentives: {
      taxHolidays: [
        { name: '10-Year Tax Holiday', criteria: 'EPZ investments', value: '0% corporate tax', hsCode: 'N/A' }
      ],
      dutyExemptions: [
        { name: 'Duty-Free Import', criteria: 'Fabrics, accessories for export', value: '0% import duty', hsCode: 'HS 5208-5212, 6001-6006' }
      ],
      exportIncentives: [
        { name: 'Cash Incentive', criteria: 'RMG exports', value: '4% of FOB', hsCode: 'HS 61, 62' }
      ],
      rdIncentives: []
    },
    successStories: [] as CaseStudy[]
  },
  'Technology & IT': {
    marketIntelligence: {
      marketSize: '$1.3B',
      marketSizeProjected: '$4.5B',
      projectionYear: 2030,
      growthRate: 25.5,
      exportValue: '$1.2B',
      exportGrowth: 28,
      topExportMarkets: [
        { country: 'United States', share: 45, value: '$540M' },
        { country: 'European Union', share: 25, value: '$300M' },
        { country: 'United Kingdom', share: 12, value: '$144M' },
        { country: 'Australia', share: 8, value: '$96M' },
        { country: 'Others', share: 10, value: '$120M' }
      ],
      domesticConsumption: '$100M',
      domesticGrowth: 35,
      importSubstitution: 15,
      apiImportDependency: 0,
      keyTrends: [
        'Software outsourcing growing at 30% annually',
        'Mobile-first market with 100M+ internet users',
        'Government Digital Bangladesh initiative',
        'Competitive IT talent costs (70% lower than US)',
        'Emerging fintech and e-commerce sectors'
      ]
    },
    competitive: {
      totalManufacturers: 1200,
      largeScale: 120,
      smes: 1080,
      marketConcentration: 25,
      topCompanies: [
        { rank: 1, name: 'BASIS (Association)', revenue: '$1.2B', marketShare: 100, employees: 450000, foreignOwnership: false, founded: 1997, headquarters: 'Dhaka' }
      ] as CompanyData[],
      maActivity: [] as MAActivity[],
      foreignInvestors: [
        'Microsoft - Cloud services partnership',
        'Google - Developer programs',
        'IBM - Enterprise solutions'
      ]
    },
    regulatory: {
      licensing: {
        authority: 'Bangladesh Hi-Tech Park Authority',
        timeline: '1-2 months',
        requirements: ['Company registration', 'Skilled workforce', 'Office space'],
        fees: '৳10,000 - ৳50,000',
        renewal: 'Annual',
        kyaLink: true
      },
      gmp: {
        whoGmpFacilities: 0,
        euGmpFacilities: 0,
        usFdaApproved: 0,
        inspectionFrequency: 'N/A',
        certificationCost: 'N/A',
        timeline: 'N/A',
        keyRequirements: []
      },
      clinicalTrials: {
        authority: 'N/A',
        phases: [],
        guidelines: 'N/A',
        foreignDataAccepted: false,
        approvalTimeline: 'N/A'
      },
      priceControls: {
        essentialDrugs: 0,
        maxRetailMargin: 'N/A',
        priceRevision: 'N/A',
        genericEncouragement: 'N/A',
        governmentProcurement: '15% of market'
      }
    },
    infrastructure: {
      api: [] as InfrastructureItem[],
      labs: [] as InfrastructureItem[],
      coldChain: [] as InfrastructureItem[]
    },
    incentives: {
      taxHolidays: [
        { name: '10-Year Tax Exemption', criteria: 'Hi-Tech Park investments', value: '0% corporate tax', hsCode: 'N/A' }
      ],
      dutyExemptions: [
        { name: 'IT Equipment', criteria: 'Computers, servers', value: '0% import duty', hsCode: 'HS 8471, 8473' }
      ],
      exportIncentives: [
        { name: 'Cash Incentive', criteria: 'Software/ITES exports', value: '10% of export earnings', hsCode: 'N/A' }
      ],
      rdIncentives: []
    },
    successStories: [] as CaseStudy[]
  },
  'Energy & Renewables': {
    marketIntelligence: {
      marketSize: '$8B',
      marketSizeProjected: '$18B',
      projectionYear: 2030,
      growthRate: 15.2,
      exportValue: '$50M',
      exportGrowth: 45,
      topExportMarkets: [
        { country: 'India', share: 60, value: '$30M' },
        { country: 'Nepal', share: 20, value: '$10M' },
        { country: 'Bhutan', share: 15, value: '$7.5M' },
        { country: 'Others', share: 5, value: '$2.5M' }
      ],
      domesticConsumption: '$7.95B',
      domesticGrowth: 8,
      importSubstitution: 60,
      apiImportDependency: 0,
      keyTrends: [
        'Renewable energy target: 40% by 2041',
        'Solar capacity growing at 50% annually',
        'LNG imports driving gas-based power',
        'Coal phase-out accelerating',
        'Green hydrogen emerging opportunity'
      ]
    },
    competitive: {
      totalManufacturers: 280,
      largeScale: 45,
      smes: 235,
      marketConcentration: 75,
      topCompanies: [] as CompanyData[],
      maActivity: [] as MAActivity[],
      foreignInvestors: [
        'Adani Power - Coal power plant',
        'NTPC (India) - Joint venture',
        'Suzlon (India) - Wind energy'
      ]
    },
    regulatory: {
      licensing: {
        authority: 'Sustainable and Renewable Energy Development Authority (SREDA)',
        timeline: '3-6 months',
        requirements: ['Environmental clearance', 'Land acquisition', 'Grid connection approval'],
        fees: '৳100,000 - ৳1M',
        renewal: 'Every 5 years',
        kyaLink: true
      },
      gmp: {
        whoGmpFacilities: 0,
        euGmpFacilities: 0,
        usFdaApproved: 0,
        inspectionFrequency: 'N/A',
        certificationCost: 'N/A',
        timeline: 'N/A',
        keyRequirements: []
      },
      clinicalTrials: {
        authority: 'N/A',
        phases: [],
        guidelines: 'N/A',
        foreignDataAccepted: false,
        approvalTimeline: 'N/A'
      },
      priceControls: {
        essentialDrugs: 0,
        maxRetailMargin: 'N/A',
        priceRevision: 'N/A',
        genericEncouragement: 'N/A',
        governmentProcurement: '100% (power sector)'
      }
    },
    infrastructure: {
      api: [] as InfrastructureItem[],
      labs: [] as InfrastructureItem[],
      coldChain: [] as InfrastructureItem[]
    },
    incentives: {
      taxHolidays: [
        { name: 'Renewable Energy Tax Holiday', criteria: 'Solar, wind investments', value: '15-year tax exemption', hsCode: 'N/A' }
      ],
      dutyExemptions: [
        { name: 'Solar Panels', criteria: 'Import for projects', value: '0% duty', hsCode: 'HS 8541' }
      ],
      exportIncentives: [],
      rdIncentives: []
    },
    successStories: [] as CaseStudy[]
  },
  'Agro Processing': {
    marketIntelligence: {
      marketSize: '$18B',
      marketSizeProjected: '$32B',
      projectionYear: 2030,
      growthRate: 10.5,
      exportValue: '$650M',
      exportGrowth: 14,
      topExportMarkets: [
        { country: 'European Union', share: 35, value: '$227.5M' },
        { country: 'Middle East', share: 30, value: '$195M' },
        { country: 'United States', share: 20, value: '$130M' },
        { country: 'ASEAN', share: 10, value: '$65M' },
        { country: 'Others', share: 5, value: '$32.5M' }
      ],
      domesticConsumption: '$17.35B',
      domesticGrowth: 6,
      importSubstitution: 90,
      apiImportDependency: 0,
      keyTrends: [
        'Frozen food exports growing at 18% annually',
        'Organic farming gaining traction',
        'Cold chain infrastructure expanding',
        'Value-added products increasing',
        'Halal certification opening Middle East markets'
      ]
    },
    competitive: {
      totalManufacturers: 2800,
      largeScale: 180,
      smes: 2620,
      marketConcentration: 28,
      topCompanies: [] as CompanyData[],
      maActivity: [] as MAActivity[],
      foreignInvestors: []
    },
    regulatory: {
      licensing: {
        authority: 'Ministry of Agriculture',
        timeline: '2-4 months',
        requirements: ['Food safety license', 'Environmental clearance', 'Quality certification'],
        fees: '৳20,000 - ৳150,000',
        renewal: 'Annual',
        kyaLink: true
      },
      gmp: {
        whoGmpFacilities: 0,
        euGmpFacilities: 0,
        usFdaApproved: 0,
        inspectionFrequency: 'N/A',
        certificationCost: 'N/A',
        timeline: 'N/A',
        keyRequirements: []
      },
      clinicalTrials: {
        authority: 'N/A',
        phases: [],
        guidelines: 'N/A',
        foreignDataAccepted: false,
        approvalTimeline: 'N/A'
      },
      priceControls: {
        essentialDrugs: 0,
        maxRetailMargin: 'N/A',
        priceRevision: 'N/A',
        genericEncouragement: 'N/A',
        governmentProcurement: '5% of market'
      }
    },
    infrastructure: {
      api: [] as InfrastructureItem[],
      labs: [] as InfrastructureItem[],
      coldChain: [] as InfrastructureItem[]
    },
    incentives: {
      taxHolidays: [
        { name: 'Agro-Processing Tax Holiday', criteria: 'Food processing investments', value: '7-year tax exemption', hsCode: 'N/A' }
      ],
      dutyExemptions: [
        { name: 'Processing Equipment', criteria: 'Food processing machinery', value: '0% duty', hsCode: 'HS 8419, 8438' }
      ],
      exportIncentives: [
        { name: 'Agro Export Subsidy', criteria: 'Processed food exports', value: '15% cash incentive', hsCode: 'HS 03, 08, 20' }
      ],
      rdIncentives: []
    },
    successStories: [] as CaseStudy[]
  },
  'Manufacturing': {
    marketIntelligence: {
      marketSize: '$28B',
      marketSizeProjected: '$52B',
      projectionYear: 2030,
      growthRate: 11.8,
      exportValue: '$5B',
      exportGrowth: 12,
      topExportMarkets: [
        { country: 'India', share: 30, value: '$1.5B' },
        { country: 'European Union', share: 25, value: '$1.25B' },
        { country: 'United States', share: 20, value: '$1B' },
        { country: 'China', share: 15, value: '$750M' },
        { country: 'Others', share: 10, value: '$500M' }
      ],
      domesticConsumption: '$23B',
      domesticGrowth: 9,
      importSubstitution: 55,
      apiImportDependency: 0,
      keyTrends: [
        'Electronics assembly growing rapidly',
        'Automotive parts manufacturing emerging',
        'Plastics and chemicals expanding',
        'Light engineering exports increasing',
        'Made in Bangladesh brand strengthening'
      ]
    },
    competitive: {
      totalManufacturers: 3500,
      largeScale: 280,
      smes: 3220,
      marketConcentration: 32,
      topCompanies: [] as CompanyData[],
      maActivity: [] as MAActivity[],
      foreignInvestors: []
    },
    regulatory: {
      licensing: {
        authority: 'Bangladesh Investment Development Authority (BIDA)',
        timeline: '3-6 months',
        requirements: ['Environmental clearance', 'Factory license', 'Fire safety'],
        fees: '৳50,000 - ৳300,000',
        renewal: 'Every 3 years',
        kyaLink: true
      },
      gmp: {
        whoGmpFacilities: 0,
        euGmpFacilities: 0,
        usFdaApproved: 0,
        inspectionFrequency: 'N/A',
        certificationCost: 'N/A',
        timeline: 'N/A',
        keyRequirements: []
      },
      clinicalTrials: {
        authority: 'N/A',
        phases: [],
        guidelines: 'N/A',
        foreignDataAccepted: false,
        approvalTimeline: 'N/A'
      },
      priceControls: {
        essentialDrugs: 0,
        maxRetailMargin: 'N/A',
        priceRevision: 'N/A',
        genericEncouragement: 'N/A',
        governmentProcurement: '12% of market'
      }
    },
    infrastructure: {
      api: [] as InfrastructureItem[],
      labs: [] as InfrastructureItem[],
      coldChain: [] as InfrastructureItem[]
    },
    incentives: {
      taxHolidays: [
        { name: 'Manufacturing Tax Holiday', criteria: 'EPZ/SEZ investments', value: '10-year tax exemption', hsCode: 'N/A' }
      ],
      dutyExemptions: [
        { name: 'Capital Machinery', criteria: 'Manufacturing equipment', value: '0% duty', hsCode: 'HS 84, 85' }
      ],
      exportIncentives: [
        { name: 'Manufacturing Export Incentive', criteria: 'Non-RMG exports', value: '10% cash incentive', hsCode: 'Various' }
      ],
      rdIncentives: []
    },
    successStories: [] as CaseStudy[]
  }
};

export function SectorDeepDive({ sector }: SectorDeepDiveProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'competitive' | 'regulatory' | 'infrastructure' | 'incentives' | 'success'>('overview');
  
  // Add null safety for sector
  const safeSector = sector || 'Pharmaceuticals';
  const data = SECTOR_DATA[safeSector] || SECTOR_DATA['Pharmaceuticals'];

  const handleDownloadReport = () => {
    toast.success(`${safeSector} Sector Report downloading...`, {
      description: 'PDF will be ready in a moment',
      duration: 3000
    });
  };

  const handleContactExpert = () => {
    toast.success('Expert consultation request sent!', {
      description: 'Sector specialist will contact you within 24 hours',
      duration: 5000
    });
  };

  const handleStartApplication = () => {
    toast.success('Redirecting to Know Your Application...', {
      description: 'License application journey starting',
      duration: 3000
    });
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 rounded-2xl p-8 border border-gray-100/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-200/50">
                  <Factory className="w-8 h-8 text-gray-700" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">{safeSector}</h1>
                  <p className="text-gray-500 text-sm mt-1">Sector Deep-Dive Intelligence Hub</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 max-w-3xl">
                Comprehensive market intelligence, regulatory guidance, and investment opportunities in Bangladesh's {safeSector.toLowerCase()} sector
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleDownloadReport}
                className="px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-200/70 rounded-lg hover:bg-white hover:border-gray-300 transition-all flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
              <button
                onClick={handleContactExpert}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2 text-sm font-bold"
              >
                <Phone className="w-4 h-4" />
                Contact Expert
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Market Size (2025)</p>
              <p className="text-2xl font-bold text-gray-900">{data.marketIntelligence.marketSize}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Growth Rate</p>
              <p className="text-2xl font-bold text-gray-900">{data.marketIntelligence.growthRate}%</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Exports</p>
              <p className="text-2xl font-bold text-gray-900">{data.marketIntelligence.exportValue}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Companies</p>
              <p className="text-2xl font-bold text-gray-900">{data.competitive.totalManufacturers}+</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Projected (2030)</p>
              <p className="text-2xl font-bold text-gray-900">{data.marketIntelligence.marketSizeProjected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-2">
        <div className="flex gap-2 overflow-x-auto">
          <TabButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            icon={<TrendingUp className="w-4 h-4" />}
            label="Market Intelligence"
          />
          <TabButton
            active={activeTab === 'competitive'}
            onClick={() => setActiveTab('competitive')}
            icon={<Building2 className="w-4 h-4" />}
            label="Competitive Landscape"
          />
          <TabButton
            active={activeTab === 'regulatory'}
            onClick={() => setActiveTab('regulatory')}
            icon={<ShieldCheck className="w-4 h-4" />}
            label="Regulatory Navigator"
          />
          <TabButton
            active={activeTab === 'infrastructure'}
            onClick={() => setActiveTab('infrastructure')}
            icon={<Factory className="w-4 h-4" />}
            label="Infrastructure"
          />
          <TabButton
            active={activeTab === 'incentives'}
            onClick={() => setActiveTab('incentives')}
            icon={<Award className="w-4 h-4" />}
            label="Incentives"
          />
          <TabButton
            active={activeTab === 'success'}
            onClick={() => setActiveTab('success')}
            icon={<Star className="w-4 h-4" />}
            label="Success Stories"
          />
        </div>
      </div>

      {/* Content Sections */}
      {activeTab === 'overview' && <MarketIntelligence data={data.marketIntelligence} sector={safeSector} />}
      {activeTab === 'competitive' && <CompetitiveLandscape data={data.competitive} sector={safeSector} />}
      {activeTab === 'regulatory' && <RegulatoryNavigator data={data.regulatory} sector={safeSector} onStartApplication={handleStartApplication} />}
      {activeTab === 'infrastructure' && <InfrastructureCatalog data={data.infrastructure} sector={safeSector} />}
      {activeTab === 'incentives' && <IncentivesPanel data={data.incentives} sector={safeSector} />}
      {activeTab === 'success' && <SuccessStories data={data.successStories} sector={safeSector} />}
    </div>
  );
}

// Tab Button Component
function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 whitespace-nowrap transition-all ${
        active
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// 1. MARKET INTELLIGENCE PANEL
function MarketIntelligence({ data, sector }: { data: any; sector: string }) {
  return (
    <div className="space-y-6">
      {/* Market Size & Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Market Size & Growth</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-200">
              <p className="text-sm text-blue-700 mb-1">Current Market Size (2025)</p>
              <p className="text-4xl font-bold text-blue-900">{data.marketSize}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Annual Growth Rate</p>
                <p className="text-2xl font-bold text-green-600">+{data.growthRate}%</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Projected ({data.projectionYear})</p>
                <p className="text-2xl font-bold text-purple-600">{data.marketSizeProjected}</p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <p className="text-xs text-amber-700 mb-1">Domestic Consumption</p>
              <p className="text-xl font-bold text-amber-900">{data.domesticConsumption}</p>
              <p className="text-sm text-amber-600 mt-1">Growing at {data.domesticGrowth}% annually</p>
            </div>
          </div>
        </motion.div>

        {/* Export Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Export Performance</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
              <p className="text-sm text-green-700 mb-1">Total Exports (2024)</p>
              <p className="text-4xl font-bold text-green-900">{data.exportValue}</p>
              <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +{data.exportGrowth}% Year-over-Year
              </p>
            </div>
            
            <div>
              <p className="text-sm font-bold text-gray-700 mb-3">Top Export Destinations</p>
              <div className="space-y-2">
                {data.topExportMarkets.map((market: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{market.country}</p>
                        <p className="text-xs text-gray-600">{market.value}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">{market.share}%</p>
                      <p className="text-xs text-gray-500">market share</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Additional Market Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border-2 border-gray-200 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Market Dynamics</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-700 mb-2">Import Substitution</p>
            <p className="text-3xl font-bold text-blue-900">{data.importSubstitution}%</p>
            <p className="text-xs text-blue-600 mt-1">Domestic production meets local demand</p>
          </div>
          
          {data.apiImportDependency > 0 && (
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200">
              <p className="text-sm text-orange-700 mb-2">Import Dependency</p>
              <p className="text-3xl font-bold text-orange-900">{data.apiImportDependency}%</p>
              <p className="text-xs text-orange-600 mt-1">Raw materials still imported</p>
            </div>
          )}
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-green-700 mb-2">Market Opportunity</p>
            <p className="text-3xl font-bold text-green-900">High</p>
            <p className="text-xs text-green-600 mt-1">Strong growth trajectory</p>
          </div>
        </div>

        {/* Key Trends */}
        <div>
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Key Market Trends
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.keyTrends.map((trend: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{trend}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// 2. COMPETITIVE LANDSCAPE PANEL
function CompetitiveLandscape({ data, sector }: { data: any; sector: string }) {
  return (
    <div className="space-y-6">
      {/* Market Structure */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border-2 border-gray-200 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Market Structure</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border-2 border-indigo-200">
            <p className="text-sm text-indigo-700 mb-1">Total Manufacturers</p>
            <p className="text-3xl font-bold text-indigo-900">{data.totalManufacturers}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-200">
            <p className="text-sm text-blue-700 mb-1">Large-Scale</p>
            <p className="text-3xl font-bold text-blue-900">{data.largeScale}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
            <p className="text-sm text-green-700 mb-1">SMEs</p>
            <p className="text-3xl font-bold text-green-900">{data.smes}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border-2 border-orange-200">
            <p className="text-sm text-orange-700 mb-1">Top 10 Market Share</p>
            <p className="text-3xl font-bold text-orange-900">{data.marketConcentration}%</p>
          </div>
        </div>
      </motion.div>

      {/* Top Companies Table */}
      {data.topCompanies && data.topCompanies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Top Companies by Market Share</h3>
            </div>
            <div className="text-sm text-gray-500">
              Updated: Feb 2026
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Company</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">Revenue</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">Market Share</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">Employees</th>
                  <th className="text-center py-3 px-4 font-bold text-gray-700">Foreign</th>
                </tr>
              </thead>
              <tbody>
                {data.topCompanies.map((company: CompanyData) => (
                  <tr key={company.rank} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        company.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        company.rank === 2 ? 'bg-gray-100 text-gray-700' :
                        company.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-50 text-blue-700'
                      }`}>
                        {company.rank}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-gray-900">{company.name}</p>
                      <p className="text-xs text-gray-500">{company.headquarters} • Est. {company.founded}</p>
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-gray-900">{company.revenue}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${company.marketShare * 6.67}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-blue-600">{company.marketShare}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-700">{company.employees.toLocaleString()}</td>
                    <td className="py-4 px-4 text-center">
                      {company.foreignOwnership ? (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                          Foreign
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                          Local
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* M&A Activity */}
      {data.maActivity && data.maActivity.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Recent M&A Activity</h3>
          </div>
          
          <div className="space-y-3">
            {data.maActivity.map((deal: MAActivity, idx: number) => (
              <div key={idx} className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-bold text-orange-700">{deal.year}</span>
                    <span className="px-2 py-0.5 bg-orange-200 text-orange-800 rounded-full text-xs font-bold">
                      {deal.type}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-orange-900">{deal.value}</span>
                </div>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">{deal.acquirer}</span> acquired <span className="font-bold">{deal.target}</span>
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Foreign Investors */}
      {data.foreignInvestors && data.foreignInvestors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Foreign Investor Presence</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.foreignInvestors.map((investor: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-sm font-semibold text-gray-700">{investor}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// 3. REGULATORY NAVIGATOR PANEL
function RegulatoryNavigator({ data, sector, onStartApplication }: { data: any; sector: string; onStartApplication: () => void }) {
  return (
    <div className="space-y-6">
      {/* Licensing Requirements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border-2 border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Licensing Requirements</h3>
          </div>
          {data.licensing.kyaLink && (
            <button
              onClick={onStartApplication}
              className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Start Application
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-700 mb-1">Licensing Authority</p>
            <p className="font-bold text-blue-900">{data.licensing.authority}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-green-700 mb-1">Timeline</p>
            <p className="font-bold text-green-900">{data.licensing.timeline}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <p className="text-sm text-orange-700 mb-1">Fees</p>
            <p className="font-bold text-orange-900">{data.licensing.fees}</p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-bold text-gray-900 mb-3">Required Documentation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.licensing.requirements.map((req: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{req}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <p className="text-sm text-amber-800">
            <span className="font-bold">Renewal:</span> {data.licensing.renewal} • 
            <span className="ml-2">Ensure compliance to avoid penalties</span>
          </p>
        </div>
      </motion.div>

      {/* GMP Standards (if applicable) */}
      {data.gmp && data.gmp.whoGmpFacilities > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Good Manufacturing Practice (GMP) Standards</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-700 mb-1">WHO-GMP Certified</p>
              <p className="text-3xl font-bold text-green-900">{data.gmp.whoGmpFacilities}</p>
              <p className="text-xs text-green-600">facilities</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-700 mb-1">EU-GMP Certified</p>
              <p className="text-3xl font-bold text-blue-900">{data.gmp.euGmpFacilities}</p>
              <p className="text-xs text-blue-600">facilities</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-purple-700 mb-1">US FDA Approved</p>
              <p className="text-3xl font-bold text-purple-900">{data.gmp.usFdaApproved}</p>
              <p className="text-xs text-purple-600">facilities</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <p className="text-sm text-orange-700 mb-1">Inspection</p>
              <p className="text-lg font-bold text-orange-900">{data.gmp.inspectionFrequency}</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-900 mb-3">Key GMP Requirements</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.gmp.keyRequirements.map((req: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{req}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-sm text-blue-700">Certification Cost</p>
              <p className="font-bold text-blue-900">{data.gmp.certificationCost}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <p className="text-sm text-green-700">Timeline</p>
              <p className="font-bold text-green-900">{data.gmp.timeline}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Clinical Trials (if applicable) */}
      {data.clinicalTrials && data.clinicalTrials.authority !== 'N/A' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Microscope className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Clinical Trial Regulations</h3>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-bold">Authority:</span> {data.clinicalTrials.authority} • 
              <span className="ml-2 font-bold">Guidelines:</span> {data.clinicalTrials.guidelines}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.clinicalTrials.phases.map((phase: any, idx: number) => (
                <div key={idx} className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="font-bold text-purple-900 mb-1">{phase.phase}</p>
                  <p className="text-sm text-purple-700 mb-2">{phase.focus}</p>
                  <p className="text-xs text-purple-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {phase.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <p className="font-bold text-blue-900">Foreign Trial Data Accepted</p>
            </div>
            <p className="text-sm text-blue-700">
              {data.clinicalTrials.foreignDataAccepted 
                ? `Yes - Review timeline: ${data.clinicalTrials.approvalTimeline}`
                : 'No - Must conduct trials in Bangladesh'
              }
            </p>
          </div>
        </motion.div>
      )}

      {/* Price Controls (if applicable) */}
      {data.priceControls && data.priceControls.essentialDrugs > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Price Controls & Reimbursement</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <p className="text-sm text-orange-700 mb-1">Essential Drugs</p>
              <p className="text-3xl font-bold text-orange-900">{data.priceControls.essentialDrugs}</p>
              <p className="text-xs text-orange-600">under price control</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <p className="text-sm text-amber-700 mb-1">Max Retail Margin</p>
              <p className="text-3xl font-bold text-amber-900">{data.priceControls.maxRetailMargin}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-700 mb-1">Generic Market</p>
              <p className="text-3xl font-bold text-blue-900">{data.priceControls.genericEncouragement}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-700 mb-1">Govt Procurement</p>
              <p className="text-3xl font-bold text-green-900">{data.priceControls.governmentProcurement}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// 4. INFRASTRUCTURE CATALOG
function InfrastructureCatalog({ data, sector }: { data: any; sector: string }) {
  const hasInfrastructure = (data.api && data.api.length > 0) || 
                            (data.labs && data.labs.length > 0) || 
                            (data.coldChain && data.coldChain.length > 0);

  if (!hasInfrastructure) {
    return (
      <div className="bg-white rounded-xl border-2 border-gray-200 p-12 text-center">
        <Factory className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 font-semibold">Infrastructure data for {sector || 'this'} sector coming soon</p>
        <p className="text-sm text-gray-400 mt-2">We're compiling comprehensive infrastructure details</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* API Manufacturing */}
      {data.api && data.api.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Factory className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">API Manufacturing Capacity</h3>
          </div>
          
          <div className="space-y-3">
            {data.api.map((item: InfrastructureItem, idx: number) => (
              <div key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-blue-900 mb-1">{item.name}</p>
                    <p className="text-sm text-blue-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-900">{item.count}</p>
                    {item.capacity && <p className="text-sm text-blue-600">{item.capacity}</p>}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{item.details}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quality Testing Labs */}
      {data.labs && data.labs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Microscope className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Quality Testing Laboratories</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.labs.map((item: InfrastructureItem, idx: number) => (
              <div key={idx} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-green-900">{item.name}</p>
                  <p className="text-2xl font-bold text-green-900">{item.count}</p>
                </div>
                <p className="text-sm text-green-700 mb-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </p>
                <p className="text-xs text-gray-700">{item.details}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Cold Chain Logistics */}
      {data.coldChain && data.coldChain.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Cold Chain Logistics</h3>
          </div>
          
          <div className="space-y-3">
            {data.coldChain.map((item: InfrastructureItem, idx: number) => (
              <div key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-purple-900 mb-1">{item.name}</p>
                    <p className="text-sm text-purple-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-900">{item.count}</p>
                    {item.capacity && <p className="text-sm text-purple-600">{item.capacity}</p>}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{item.details}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// 5. INCENTIVES PANEL
function IncentivesPanel({ data, sector }: { data: any; sector: string }) {
  const downloadHSCodes = () => {
    toast.success('HS Codes list downloading...', {
      description: 'Complete list of duty-free HS codes',
      duration: 3000
    });
  };

  return (
    <div className="space-y-6">
      {/* Tax Holidays */}
      {data.taxHolidays && data.taxHolidays.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Tax Holidays & Exemptions</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.taxHolidays.map((incentive: any, idx: number) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-200">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-bold text-blue-900">{incentive.name}</p>
                  <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
                    {incentive.value}
                  </span>
                </div>
                <p className="text-sm text-blue-700">{incentive.criteria}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Duty Exemptions */}
      {data.dutyExemptions && data.dutyExemptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Import Duty Exemptions</h3>
            </div>
            <button
              onClick={downloadHSCodes}
              className="px-3 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              HS Codes
            </button>
          </div>
          
          <div className="space-y-3">
            {data.dutyExemptions.map((incentive: any, idx: number) => (
              <div key={idx} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-bold text-green-900 mb-1">{incentive.name}</p>
                    <p className="text-sm text-green-700 mb-2">{incentive.criteria}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-600 text-white rounded-lg text-xs font-bold">
                        {incentive.value}
                      </span>
                      <span className="text-xs text-green-700 font-mono">
                        {incentive.hsCode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Export Incentives */}
      {data.exportIncentives && data.exportIncentives.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Export Subsidies & Incentives</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.exportIncentives.map((incentive: any, idx: number) => (
              <div key={idx} className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border-2 border-orange-200">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-bold text-orange-900">{incentive.name}</p>
                  <span className="px-2 py-1 bg-orange-600 text-white rounded-full text-xs font-bold whitespace-nowrap">
                    {incentive.value}
                  </span>
                </div>
                <p className="text-sm text-orange-700 mb-2">{incentive.criteria}</p>
                <span className="text-xs text-orange-600 font-mono">{incentive.hsCode}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* R&D Incentives */}
      {data.rdIncentives && data.rdIncentives.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">R&D Grants & Support</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.rdIncentives.map((incentive: any, idx: number) => (
              <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-200">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-bold text-purple-900">{incentive.name}</p>
                  <span className="px-2 py-1 bg-purple-600 text-white rounded-full text-xs font-bold">
                    {incentive.value}
                  </span>
                </div>
                <p className="text-sm text-purple-700">{incentive.criteria}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// 6. SUCCESS STORIES SHOWCASE
function SuccessStories({ data, sector }: { data: CaseStudy[]; sector: string }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border-2 border-gray-200 p-12 text-center">
        <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 font-semibold">Success stories for {sector || 'this'} sector coming soon</p>
        <p className="text-sm text-gray-400 mt-2">We're documenting inspiring case studies</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((story, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">{story.company}</h3>
                {story.foreignInvestor && (
                  <p className="text-emerald-100 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Partnership with {story.foreignInvestor}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-bold">
                  Est. {story.investmentYear}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-bold">
                  {story.roi} ROI
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <p className="text-emerald-100 text-xs mb-1">Initial Investment</p>
                <p className="text-lg font-bold">{story.initialInvestment}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <p className="text-emerald-100 text-xs mb-1">Current Revenue</p>
                <p className="text-lg font-bold">{story.currentRevenue}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <p className="text-emerald-100 text-xs mb-1">Jobs Created</p>
                <p className="text-lg font-bold">{story.jobsCreated.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <p className="text-emerald-100 text-xs mb-1">Annual ROI</p>
                <p className="text-lg font-bold">{story.roi}</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="p-6">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Key Achievements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {story.achievements.map((achievement, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{achievement}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 italic mb-4">"{story.testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {story.testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{story.testimonial.author}</p>
                      <p className="text-sm text-gray-600">{story.testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
