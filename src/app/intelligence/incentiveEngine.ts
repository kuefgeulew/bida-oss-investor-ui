// 💰 INCENTIVE ENGINE — Investment Decision Intelligence
// ARCHITECTURE: Data layer reading agencyRegistry + paymentRegistry to compute incentives
// PURPOSE: Help investors understand total costs, available incentives, and ROI optimization

import { GOVERNMENT_AGENCIES, type AgencyService } from '@/app/gov-agencies/agencyRegistry';
import { paymentRegistry, type PaymentMetadata } from '@/app/payments/paymentRegistry';

// ============================================================================
// TYPES
// ============================================================================

export interface InvestmentCostBreakdown {
  totalRegistrationFees: number;
  totalUtilityConnections: number;
  totalEnvironmentalFees: number;
  totalLicensingFees: number;
  totalCustomsFees: number;
  grandTotal: number;
  itemizedCosts: CostItem[];
}

export interface CostItem {
  serviceId: string;
  serviceName: string;
  agency: string;
  amount: number;
  currency: string;
  category: string;
  waivable: boolean;
  waivableConditions?: string[];
}

export interface IncentivePackage {
  sectorName: string;
  taxHoliday: {
    eligible: boolean;
    years: number;
    description: string;
    estimatedSavings: number;
  };
  dutyConcessions: {
    eligible: boolean;
    percentage: number;
    description: string;
    estimatedSavings: number;
  };
  feeWaivers: {
    eligible: boolean;
    totalSavings: number;
    waivableServices: string[];
  };
  totalIncentiveValue: number;
  eligibilityCriteria: string[];
}

export interface SectorIncentive {
  sector: string;
  taxHolidayYears: number;
  dutyExemption: number; // percentage
  vaTExemption: boolean;
  fastTrackEligible: boolean;
  additionalBenefits: string[];
  eligibleZones: string[];
}

export interface ZoneIncentive {
  zoneName: string;
  zoneType: 'EPZ' | 'EZ' | 'Hi-Tech' | 'General';
  taxHoliday: number; // years
  dutyFree: boolean;
  vatExemption: boolean;
  oneStopService: boolean;
  landLeaseDiscount: number; // percentage
  utilitySupport: boolean;
}

export interface ROIComparison {
  withIncentives: {
    upfrontCosts: number;
    fiveYearTaxSavings: number;
    dutySavings: number;
    netInvestment: number;
    breakEvenMonths: number;
  };
  withoutIncentives: {
    upfrontCosts: number;
    fiveYearTaxSavings: number;
    dutySavings: number;
    netInvestment: number;
    breakEvenMonths: number;
  };
  savingsDelta: number;
  percentageSavings: number;
}

// ============================================================================
// SECTOR INCENTIVE DATABASE
// ============================================================================

const SECTOR_INCENTIVES: SectorIncentive[] = [
  {
    sector: 'Manufacturing - Textiles & RMG',
    taxHolidayYears: 5,
    dutyExemption: 100,
    vaTExemption: true,
    fastTrackEligible: true,
    additionalBenefits: [
      'Cash incentive on exports (up to 4%)',
      'Export Retention Quota benefits',
      'Back-to-back LC facility'
    ],
    eligibleZones: ['EPZ', 'EZ']
  },
  {
    sector: 'Manufacturing - Pharmaceuticals',
    taxHolidayYears: 7,
    dutyExemption: 100,
    vaTExemption: true,
    fastTrackEligible: true,
    additionalBenefits: [
      'API manufacturing support',
      'R&D grants available',
      'Export market development fund access'
    ],
    eligibleZones: ['Hi-Tech', 'EZ']
  },
  {
    sector: 'Manufacturing - Electronics',
    taxHolidayYears: 10,
    dutyExemption: 100,
    vaTExemption: true,
    fastTrackEligible: true,
    additionalBenefits: [
      'Hi-tech park incentives',
      'Duty-free import of machinery',
      'Accelerated depreciation (100% first year)'
    ],
    eligibleZones: ['Hi-Tech', 'EPZ', 'EZ']
  },
  {
    sector: 'Manufacturing - Automotive',
    taxHolidayYears: 5,
    dutyExemption: 75,
    vaTExemption: false,
    fastTrackEligible: true,
    additionalBenefits: [
      'Local content development support',
      'Vendor development program access'
    ],
    eligibleZones: ['EZ']
  },
  {
    sector: 'Services - IT/ITES',
    taxHolidayYears: 10,
    dutyExemption: 100,
    vaTExemption: true,
    fastTrackEligible: true,
    additionalBenefits: [
      'Office space rent support (up to 50%)',
      'Visa facilitation for skilled workers',
      'Training grant access',
      'Zero import duty on IT equipment'
    ],
    eligibleZones: ['Hi-Tech']
  },
  {
    sector: 'Services - Tourism',
    taxHolidayYears: 7,
    dutyExemption: 50,
    vaTExemption: false,
    fastTrackEligible: false,
    additionalBenefits: [
      'Infrastructure development support',
      'Marketing grant access'
    ],
    eligibleZones: ['General', 'EZ']
  },
  {
    sector: 'Trading - General',
    taxHolidayYears: 0,
    dutyExemption: 0,
    vaTExemption: false,
    fastTrackEligible: false,
    additionalBenefits: [
      'Standard business registration',
      'Import/Export license support'
    ],
    eligibleZones: ['General']
  },
  {
    sector: 'Agro-Processing',
    taxHolidayYears: 7,
    dutyExemption: 100,
    vaTExemption: true,
    fastTrackEligible: true,
    additionalBenefits: [
      'Cold storage facility support',
      'Export incentives (10-20%)',
      'Value addition grants'
    ],
    eligibleZones: ['EZ', 'General']
  }
];

const ZONE_INCENTIVES: ZoneIncentive[] = [
  {
    zoneName: 'Dhaka EPZ',
    zoneType: 'EPZ',
    taxHoliday: 10,
    dutyFree: true,
    vatExemption: true,
    oneStopService: true,
    landLeaseDiscount: 50,
    utilitySupport: true
  },
  {
    zoneName: 'Chittagong EPZ',
    zoneType: 'EPZ',
    taxHoliday: 10,
    dutyFree: true,
    vatExemption: true,
    oneStopService: true,
    landLeaseDiscount: 50,
    utilitySupport: true
  },
  {
    zoneName: 'Bangabandhu Hi-Tech City',
    zoneType: 'Hi-Tech',
    taxHoliday: 10,
    dutyFree: true,
    vatExemption: true,
    oneStopService: true,
    landLeaseDiscount: 70,
    utilitySupport: true
  },
  {
    zoneName: 'Mirsarai Economic Zone',
    zoneType: 'EZ',
    taxHoliday: 10,
    dutyFree: true,
    vatExemption: true,
    oneStopService: true,
    landLeaseDiscount: 40,
    utilitySupport: true
  },
  {
    zoneName: 'General Industrial Area',
    zoneType: 'General',
    taxHoliday: 5,
    dutyFree: false,
    vatExemption: false,
    oneStopService: false,
    landLeaseDiscount: 0,
    utilitySupport: false
  }
];

// ============================================================================
// CORE CALCULATION FUNCTIONS
// ============================================================================

/**
 * Calculate total investment costs for a given sector
 */
export function calculateInvestmentCosts(
  sector: 'manufacturing' | 'services' | 'trading'
): InvestmentCostBreakdown {
  const itemizedCosts: CostItem[] = [];
  
  let totalRegistrationFees = 0;
  let totalUtilityConnections = 0;
  let totalEnvironmentalFees = 0;
  let totalLicensingFees = 0;
  let totalCustomsFees = 0;

  // Iterate through all agencies and their services
  GOVERNMENT_AGENCIES.forEach(agency => {
    agency.services.forEach(service => {
      // Check if service is applicable for this sector
      const isApplicable = 
        service.applicableFor.includes(sector) || 
        service.applicableFor.includes('all');

      if (isApplicable) {
        // Get payment metadata
        const paymentInfo = paymentRegistry[service.id];
        const amount = service.fee;
        
        const costItem: CostItem = {
          serviceId: service.id,
          serviceName: service.name,
          agency: agency.name,
          amount: amount,
          currency: service.currency,
          category: agency.category,
          waivable: !!(paymentInfo?.waivableConditions),
          waivableConditions: paymentInfo?.waivableConditions
        };

        itemizedCosts.push(costItem);

        // Categorize costs
        switch (agency.category) {
          case 'registration':
            totalRegistrationFees += amount;
            break;
          case 'utilities':
            totalUtilityConnections += amount;
            break;
          case 'environment':
            totalEnvironmentalFees += amount;
            break;
          case 'safety':
          case 'industry':
            totalLicensingFees += amount;
            break;
          case 'customs':
            totalCustomsFees += amount;
            break;
          default:
            totalLicensingFees += amount;
        }
      }
    });
  });

  const grandTotal = 
    totalRegistrationFees +
    totalUtilityConnections +
    totalEnvironmentalFees +
    totalLicensingFees +
    totalCustomsFees;

  return {
    totalRegistrationFees,
    totalUtilityConnections,
    totalEnvironmentalFees,
    totalLicensingFees,
    totalCustomsFees,
    grandTotal,
    itemizedCosts: itemizedCosts.sort((a, b) => b.amount - a.amount)
  };
}

/**
 * Get available incentive package for sector and zone
 */
export function getIncentivePackage(
  sectorName: string,
  zoneName: string,
  investmentAmountUSD: number
): IncentivePackage {
  const sectorIncentive = SECTOR_INCENTIVES.find(s => 
    s.sector.toLowerCase().includes(sectorName.toLowerCase())
  ) || SECTOR_INCENTIVES[SECTOR_INCENTIVES.length - 1]; // fallback to general

  const zoneIncentive = ZONE_INCENTIVES.find(z => 
    z.zoneName.toLowerCase().includes(zoneName.toLowerCase())
  ) || ZONE_INCENTIVES[ZONE_INCENTIVES.length - 1]; // fallback to general

  // Calculate tax holiday savings (assuming 25% corporate tax rate)
  const annualProfit = investmentAmountUSD * 0.15; // 15% annual profit assumption
  const corporateTaxRate = 0.25;
  const taxHolidayYears = Math.max(sectorIncentive.taxHolidayYears, zoneIncentive.taxHoliday);
  const taxHolidaySavings = annualProfit * corporateTaxRate * taxHolidayYears;

  // Calculate duty concessions (on machinery import, assumed 30% of investment)
  const machineryValue = investmentAmountUSD * 0.30;
  const normalDutyRate = 0.25; // 25% import duty
  const dutyExemptionPercentage = sectorIncentive.dutyExemption;
  const dutySavings = machineryValue * normalDutyRate * (dutyExemptionPercentage / 100);

  // Calculate fee waivers
  const costs = calculateInvestmentCosts(
    sectorName.includes('Manufacturing') ? 'manufacturing' : 
    sectorName.includes('Services') ? 'services' : 'trading'
  );
  const waivableCosts = costs.itemizedCosts.filter(c => c.waivable);
  const feeWaiverSavings = waivableCosts.reduce((sum, c) => sum + c.amount, 0) * 0.7; // 70% waiver rate

  const totalIncentiveValue = taxHolidaySavings + dutySavings + feeWaiverSavings;

  return {
    sectorName,
    taxHoliday: {
      eligible: taxHolidayYears > 0,
      years: taxHolidayYears,
      description: `${taxHolidayYears} years corporate tax exemption`,
      estimatedSavings: taxHolidaySavings
    },
    dutyConcessions: {
      eligible: dutyExemptionPercentage > 0,
      percentage: dutyExemptionPercentage,
      description: `${dutyExemptionPercentage}% duty exemption on machinery import`,
      estimatedSavings: dutySavings
    },
    feeWaivers: {
      eligible: waivableCosts.length > 0,
      totalSavings: feeWaiverSavings,
      waivableServices: waivableCosts.map(c => c.serviceName)
    },
    totalIncentiveValue,
    eligibilityCriteria: [
      ...sectorIncentive.additionalBenefits,
      zoneIncentive.oneStopService ? 'One-stop service center access' : '',
      zoneIncentive.utilitySupport ? 'Priority utility connections' : '',
      zoneIncentive.landLeaseDiscount > 0 ? `${zoneIncentive.landLeaseDiscount}% land lease discount` : ''
    ].filter(Boolean)
  };
}

/**
 * Compare ROI with and without incentives
 */
export function compareROI(
  investmentAmountUSD: number,
  sectorName: string,
  zoneName: string
): ROIComparison {
  const incentives = getIncentivePackage(sectorName, zoneName, investmentAmountUSD);
  const costs = calculateInvestmentCosts(
    sectorName.includes('Manufacturing') ? 'manufacturing' : 
    sectorName.includes('Services') ? 'services' : 'trading'
  );

  // Convert BDT to USD (assuming 110 BDT = 1 USD)
  const upfrontCostsBDT = costs.grandTotal;
  const upfrontCostsUSD = upfrontCostsBDT / 110;

  // With incentives
  const withIncentives = {
    upfrontCosts: upfrontCostsUSD - (incentives.feeWaivers.totalSavings / 110),
    fiveYearTaxSavings: incentives.taxHoliday.estimatedSavings,
    dutySavings: incentives.dutyConcessions.estimatedSavings,
    netInvestment: investmentAmountUSD - incentives.totalIncentiveValue,
    breakEvenMonths: Math.round((investmentAmountUSD - incentives.totalIncentiveValue) / ((investmentAmountUSD * 0.15) / 12))
  };

  // Without incentives
  const corporateTax = investmentAmountUSD * 0.15 * 0.25 * 5; // 5 years of tax
  const withoutIncentives = {
    upfrontCosts: upfrontCostsUSD,
    fiveYearTaxSavings: 0,
    dutySavings: 0,
    netInvestment: investmentAmountUSD + corporateTax,
    breakEvenMonths: Math.round((investmentAmountUSD + corporateTax) / ((investmentAmountUSD * 0.15) / 12))
  };

  const savingsDelta = incentives.totalIncentiveValue;
  const percentageSavings = (savingsDelta / investmentAmountUSD) * 100;

  return {
    withIncentives,
    withoutIncentives,
    savingsDelta,
    percentageSavings
  };
}

/**
 * Get all sector incentives for comparison
 */
export function getAllSectorIncentives(): SectorIncentive[] {
  return SECTOR_INCENTIVES;
}

/**
 * Get all zone incentives for comparison
 */
export function getAllZoneIncentives(): ZoneIncentive[] {
  return ZONE_INCENTIVES;
}

/**
 * Calculate potential savings from strategic decisions
 */
export function getStrategicSavingsOpportunities(
  investmentAmountUSD: number,
  currentSector: string,
  currentZone: string
) {
  const currentIncentives = getIncentivePackage(currentSector, currentZone, investmentAmountUSD);
  
  // Find best sector
  const sectorComparisons = SECTOR_INCENTIVES.map(sector => {
    const incentive = getIncentivePackage(sector.sector, currentZone, investmentAmountUSD);
    return {
      sector: sector.sector,
      totalValue: incentive.totalIncentiveValue,
      improvement: incentive.totalIncentiveValue - currentIncentives.totalIncentiveValue
    };
  }).sort((a, b) => b.totalValue - a.totalValue);

  // Find best zone
  const zoneComparisons = ZONE_INCENTIVES.map(zone => {
    const incentive = getIncentivePackage(currentSector, zone.zoneName, investmentAmountUSD);
    return {
      zone: zone.zoneName,
      totalValue: incentive.totalIncentiveValue,
      improvement: incentive.totalIncentiveValue - currentIncentives.totalIncentiveValue
    };
  }).sort((a, b) => b.totalValue - a.totalValue);

  return {
    currentTotal: currentIncentives.totalIncentiveValue,
    bestSectorOption: sectorComparisons[0],
    bestZoneOption: zoneComparisons[0],
    potentialAdditionalSavings: Math.max(
      sectorComparisons[0].improvement,
      zoneComparisons[0].improvement,
      0
    )
  };
}

/**
 * Get quick incentive summary for dashboard display
 */
export function getQuickIncentiveSummary(
  sectorName: string,
  zoneName: string,
  investmentAmountUSD: number
) {
  const incentives = getIncentivePackage(sectorName, zoneName, investmentAmountUSD);
  const roi = compareROI(investmentAmountUSD, sectorName, zoneName);

  return {
    totalIncentiveValue: incentives.totalIncentiveValue,
    taxHolidayYears: incentives.taxHoliday.years,
    dutyExemptionPercent: incentives.dutyConcessions.percentage,
    breakEvenMonthsReduction: roi.withoutIncentives.breakEvenMonths - roi.withIncentives.breakEvenMonths,
    percentageSavings: roi.percentageSavings,
    topBenefits: incentives.eligibilityCriteria.slice(0, 3)
  };
}
