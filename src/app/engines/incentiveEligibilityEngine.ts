/**
 * 💰 INCENTIVE ELIGIBILITY ENGINE — Auto-detect qualifying incentives
 * 
 * Powers: Smart incentive calculator with auto-apply
 * Reads: Investor profile (sector, investment, export %, location, workforce)
 * Returns: All qualifying incentives with BDT value + tax savings over 10 years
 */

export interface InvestorProfile {
  sector: string;
  investmentAmountUSD: number;
  exportPercentage: number;
  zoneLocation?: string;
  workforceSize: number;
  isSME: boolean;
  isStartup: boolean;
  hasGreenTech: boolean;
  femaleWorkforcePercent?: number;
}

export interface Incentive {
  id: string;
  name: string;
  category: 'tax' | 'duty' | 'grant' | 'subsidy' | 'land' | 'utility';
  description: string;
  eligibilityCriteria: string[];
  benefitType: 'exemption' | 'reduction' | 'rebate' | 'cash';
  value: {
    type: 'percentage' | 'fixed' | 'calculated';
    amount?: number; // BDT or %
    duration?: number; // years
  };
  savingsOverTenYears: number; // BDT
  authority: string;
  applicationProcess: string;
  documentsRequired: string[];
  processingDays: number;
  autoApplyAvailable: boolean;
}

export interface EligibilityResult {
  qualifyingIncentives: Incentive[];
  totalSavingsBDT: number;
  totalSavingsUSD: number;
  roiImprovement: number; // % points
  incentiveCount: number;
  byCategory: {
    tax: number;
    duty: number;
    grant: number;
    subsidy: number;
    land: number;
    utility: number;
  };
  topIncentive: Incentive;
  quickWins: Incentive[]; // Auto-apply available
  recommendedActions: string[];
}

// Exchange rate (production: fetch from API)
const USD_TO_BDT = 110;

// Comprehensive incentive database
const INCENTIVE_DATABASE: Array<{
  id: string;
  name: string;
  category: 'tax' | 'duty' | 'grant' | 'subsidy' | 'land' | 'utility';
  description: string;
  eligibility: (profile: InvestorProfile) => boolean;
  calculateSavings: (profile: InvestorProfile) => number;
  authority: string;
  applicationProcess: string;
  documentsRequired: string[];
  processingDays: number;
  autoApply: boolean;
}> = [
  // TAX INCENTIVES
  {
    id: 'TAX-HOLIDAY-EXPORT',
    name: 'Export-Oriented Tax Holiday',
    category: 'tax',
    description: '10-year corporate tax exemption for 100% export-oriented industries',
    eligibility: (p) => p.exportPercentage >= 100 && !p.isSME,
    calculateSavings: (p) => {
      const annualRevenue = p.investmentAmountUSD * 2 * USD_TO_BDT;
      const annualProfit = annualRevenue * 0.15;
      const corporateTax = annualProfit * 0.25;
      return corporateTax * 10; // 10 years
    },
    authority: 'National Board of Revenue (NBR)',
    applicationProcess: 'Automatic upon BIDA registration for 100% export industries',
    documentsRequired: ['BIDA registration', 'Export commitment letter', 'Bank LC confirmation'],
    processingDays: 0,
    autoApply: true
  },
  {
    id: 'TAX-HOLIDAY-PARTIAL',
    name: 'Partial Export Tax Reduction',
    category: 'tax',
    description: '50% corporate tax reduction for 5 years (80%+ export)',
    eligibility: (p) => p.exportPercentage >= 80 && p.exportPercentage < 100,
    calculateSavings: (p) => {
      const annualRevenue = p.investmentAmountUSD * 2 * USD_TO_BDT;
      const annualProfit = annualRevenue * 0.15;
      const corporateTax = annualProfit * 0.25;
      return (corporateTax * 0.5) * 5; // 50% reduction for 5 years
    },
    authority: 'NBR',
    applicationProcess: 'Application through BIDA portal with export evidence',
    documentsRequired: ['Export contracts', 'LC documents', 'Customs clearance records'],
    processingDays: 14,
    autoApply: true
  },
  {
    id: 'TAX-SME-SPECIAL',
    name: 'SME Tax Rate Reduction',
    category: 'tax',
    description: 'Reduced 10% corporate tax rate for qualified SMEs',
    eligibility: (p) => p.isSME && p.investmentAmountUSD < 1000000,
    calculateSavings: (p) => {
      const annualRevenue = p.investmentAmountUSD * 2 * USD_TO_BDT;
      const annualProfit = annualRevenue * 0.15;
      const normalTax = annualProfit * 0.25;
      const smeRate = annualProfit * 0.10;
      return (normalTax - smeRate) * 10;
    },
    authority: 'NBR',
    applicationProcess: 'SME certificate + tax registration',
    documentsRequired: ['SME Foundation certificate', 'Financial statements', 'Business plan'],
    processingDays: 21,
    autoApply: false
  },

  // DUTY INCENTIVES
  {
    id: 'DUTY-FREE-MACHINERY',
    name: 'Capital Machinery Import Duty Exemption',
    category: 'duty',
    description: '100% import duty waiver on capital machinery and equipment',
    eligibility: (p) => true, // Universal for all investors
    calculateSavings: (p) => {
      const machineryValue = p.investmentAmountUSD * 0.40 * USD_TO_BDT; // 40% of investment
      const dutyRate = 0.05; // 5% duty
      return machineryValue * dutyRate;
    },
    authority: 'Customs Department / BIDA',
    applicationProcess: 'Automatic with BIDA registration',
    documentsRequired: ['BIDA certificate', 'Import invoice', 'Bill of entry'],
    processingDays: 0,
    autoApply: true
  },
  {
    id: 'DUTY-FREE-RAW-MATERIAL',
    name: 'Duty-Free Import of Raw Materials (Export Sector)',
    category: 'duty',
    description: 'Zero duty on imported raw materials for export production',
    eligibility: (p) => p.exportPercentage >= 80,
    calculateSavings: (p) => {
      const annualRawMaterials = p.investmentAmountUSD * 2 * 0.30 * USD_TO_BDT; // 30% of revenue
      const dutyRate = 0.10; // 10% avg duty
      return annualRawMaterials * dutyRate * 10; // 10 years
    },
    authority: 'Customs / BIDA',
    applicationProcess: 'Bonded warehouse registration or duty drawback',
    documentsRequired: ['Export LC', 'HS code declaration', 'Bonded warehouse license'],
    processingDays: 7,
    autoApply: true
  },

  // GRANT INCENTIVES
  {
    id: 'GRANT-STARTUP-SEED',
    name: 'Startup Seed Grant Program',
    category: 'grant',
    description: 'BDT 25 lakh cash grant for tech startups',
    eligibility: (p) => p.isStartup && p.sector?.toLowerCase().includes('tech'),
    calculateSavings: (p) => 2500000, // Fixed BDT 25 lakh
    authority: 'ICT Division / Startup Bangladesh',
    applicationProcess: 'Pitch competition or application to Startup Bangladesh',
    documentsRequired: ['Business plan', 'Pitch deck', 'Incorporation certificate', 'Team CVs'],
    processingDays: 45,
    autoApply: false
  },
  {
    id: 'GRANT-GREEN-TECH',
    name: 'Green Technology Grant',
    category: 'grant',
    description: 'Up to BDT 1 crore for green/renewable energy projects',
    eligibility: (p) => p.hasGreenTech || p.sector?.toLowerCase().includes('renewable'),
    calculateSavings: (p) => Math.min(10000000, p.investmentAmountUSD * USD_TO_BDT * 0.15), // 15% capped at 1 crore
    authority: 'Sustainable and Renewable Energy Development Authority (SREDA)',
    applicationProcess: 'Project proposal submission to SREDA',
    documentsRequired: ['Green tech certification', 'Environmental impact assessment', 'Project DPR'],
    processingDays: 60,
    autoApply: false
  },

  // SUBSIDY INCENTIVES
  {
    id: 'SUBSIDY-UTILITY',
    name: 'Industrial Utility Subsidy',
    category: 'utility',
    description: '20% discount on electricity tariff for EPZ/SEZ',
    eligibility: (p) => p.zoneLocation && (p.zoneLocation.includes('EPZ') || p.zoneLocation.includes('SEZ')),
    calculateSavings: (p) => {
      const monthlyElectricity = p.workforceSize * 500 * 0.08; // 500 kWh per worker @ $0.08/kWh
      const annualCost = monthlyElectricity * 12 * USD_TO_BDT;
      return annualCost * 0.20 * 10; // 20% discount for 10 years
    },
    authority: 'BPDB / Zone Authority',
    applicationProcess: 'Automatic upon zone allocation',
    documentsRequired: ['Zone allocation letter', 'Electricity connection'],
    processingDays: 0,
    autoApply: true
  },

  // LAND INCENTIVES
  {
    id: 'LAND-DISCOUNT-LARGE',
    name: 'Large Investment Land Discount',
    category: 'land',
    description: '30% discount on land price for $10M+ investments',
    eligibility: (p) => p.investmentAmountUSD >= 10000000,
    calculateSavings: (p) => {
      const landCost = 10 * 25000 * USD_TO_BDT; // Assume 10 acres @ $25k/acre
      return landCost * 0.30;
    },
    authority: 'BEZA / BEPZA',
    applicationProcess: 'Negotiation during zone allocation',
    documentsRequired: ['Investment proposal', 'Financial proof', 'Bank solvency'],
    processingDays: 14,
    autoApply: false
  }
];

/**
 * 🔥 MAIN ENGINE FUNCTION — Auto-detect all qualifying incentives
 */
export function autoDetectIncentives(profile: InvestorProfile): EligibilityResult {
  const qualifyingIncentives: Incentive[] = [];
  
  INCENTIVE_DATABASE.forEach(inc => {
    if (inc.eligibility(profile)) {
      const savingsOverTenYears = inc.calculateSavings(profile);
      
      qualifyingIncentives.push({
        id: inc.id,
        name: inc.name,
        category: inc.category,
        description: inc.description,
        eligibilityCriteria: [], // Can be populated from rules
        benefitType: inc.category === 'grant' ? 'cash' : 'exemption',
        value: {
          type: 'calculated',
          duration: 10
        },
        savingsOverTenYears,
        authority: inc.authority,
        applicationProcess: inc.applicationProcess,
        documentsRequired: inc.documentsRequired,
        processingDays: inc.processingDays,
        autoApplyAvailable: inc.autoApply
      });
    }
  });
  
  // Calculate totals
  const totalSavingsBDT = qualifyingIncentives.reduce((sum, inc) => sum + inc.savingsOverTenYears, 0);
  const totalSavingsUSD = totalSavingsBDT / USD_TO_BDT;
  
  // Calculate ROI improvement
  const investmentBDT = profile.investmentAmountUSD * USD_TO_BDT;
  const roiImprovement = (totalSavingsBDT / investmentBDT) * 100;
  
  // Category breakdown
  const byCategory = {
    tax: 0,
    duty: 0,
    grant: 0,
    subsidy: 0,
    land: 0,
    utility: 0
  };
  
  qualifyingIncentives.forEach(inc => {
    byCategory[inc.category] += inc.savingsOverTenYears;
  });
  
  // Top incentive
  const sorted = [...qualifyingIncentives].sort((a, b) => b.savingsOverTenYears - a.savingsOverTenYears);
  const topIncentive = sorted[0];
  
  // Quick wins (auto-apply available)
  const quickWins = qualifyingIncentives.filter(inc => inc.autoApplyAvailable);
  
  // Recommended actions
  const recommendedActions = [];
  if (profile.exportPercentage >= 80 && profile.exportPercentage < 100) {
    recommendedActions.push('Increase export % to 100% to unlock 10-year tax holiday (currently 5-year)');
  }
  if (profile.investmentAmountUSD >= 8000000 && profile.investmentAmountUSD < 10000000) {
    recommendedActions.push('Scale investment to $10M to unlock 30% land discount');
  }
  
  return {
    qualifyingIncentives,
    totalSavingsBDT,
    totalSavingsUSD,
    roiImprovement,
    incentiveCount: qualifyingIncentives.length,
    byCategory,
    topIncentive,
    quickWins,
    recommendedActions
  };
}

/**
 * Format currency helper
 */
export function formatBDT(amount: number | undefined | null): string {
  // 🔒 DEFENSIVE: Handle undefined/null values
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '৳0';
  }
  
  if (amount >= 10000000) return `৳${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `৳${(amount / 100000).toFixed(2)} Lakh`;
  return `৳${amount.toLocaleString('en-IN')}`;
}

/**
 * Get incentive summary for quick display
 */
export function getIncentiveSummary(profile: InvestorProfile): string {
  const result = autoDetectIncentives(profile);
  return `You qualify for ${result.incentiveCount} incentives worth ${formatBDT(result.totalSavingsBDT)} (${result.roiImprovement.toFixed(1)}% ROI boost)`;
}

/**
 * Get incentives for a specific sector (for SectorHub)
 */
export function getIncentivesForSector(sector: string): Array<{name: string; description: string; value: string}> {
  // Create a sample profile for the sector
  const sampleProfile: InvestorProfile = {
    sector,
    investmentAmountUSD: 5000000,
    exportPercentage: 80,
    zoneLocation: 'Dhaka EPZ',
    workforceSize: 200,
    isSME: false,
    isStartup: false,
    hasGreenTech: false,
    femaleWorkforcePercent: 30
  };
  
  const result = autoDetectIncentives(sampleProfile);
  
  return result.qualifyingIncentives.map(inc => ({
    name: inc.name,
    description: inc.description,
    value: formatBDT(inc.savingsOverTenYears)
  }));
}