// Country Benchmark Engine - Compare Bangladesh with competing investment destinations
// READ-ONLY engine for cost-benefit analysis
// Used by: CostBenefitSimulator panel

export interface CountryBenchmark {
  country: string;
  code: string;
  
  // Labor Economics
  labor: {
    minimumWage: number; // USD/month
    averageWage: number; // USD/month
    skilledWage: number; // USD/month
    productivityIndex: number; // 0-100
    laborAvailability: 'high' | 'medium' | 'low';
    educationLevel: number; // years average
    languageBarrier: 'low' | 'medium' | 'high';
  };
  
  // Operating Costs
  utilities: {
    electricityCostKWh: number; // USD
    waterCostM3: number; // USD
    gasCostMMBTU: number; // USD
    internetCostMbps: number; // USD/month per Mbps
    reliabilityScore: number; // 0-100
  };
  
  // Land & Real Estate (NEW)
  land: {
    industrialLandPerSqFt: number; // USD per sq ft purchase
    warehouseRentalPerSqFt: number; // USD per sq ft per month
    officeRentalPerSqFt: number; // USD per sq ft per month
    averagePlotSize: number; // sq ft typical for FDI
    availability: 'high' | 'medium' | 'low';
  };
  
  // Logistics & Shipping (NEW)
  logistics: {
    portToEU: number; // USD per 40ft container
    portToUSA: number; // USD per 40ft container
    portToChina: number; // USD per 40ft container
    portToMiddleEast: number; // USD per 40ft container
    domesticTransportPerKm: number; // USD per km per ton
    averageCustomsClearanceDays: number;
  };
  
  // Taxation
  taxation: {
    corporateTaxRate: number; // percentage
    vatRate: number; // percentage
    importDuty: number; // percentage average
    exportIncentives: boolean;
    taxHolidayYears: number;
    doubleDeductionRAndD: boolean;
  };
  
  // Setup & Compliance
  business: {
    setupTimeDays: number;
    setupCostUSD: number;
    regulatoryComplexity: 'low' | 'medium' | 'high' | 'very-high';
    corruptionIndex: number; // 0-100, higher is better
    easeOfDoingBusiness: number; // rank
    contractEnforcementDays: number;
  };
  
  // Infrastructure
  infrastructure: {
    portEfficiency: number; // 0-100
    airportConnectivity: number; // 0-100
    roadQuality: number; // 0-100
    railCoverage: number; // 0-100
    digitalInfrastructure: number; // 0-100
  };
  
  // Trade
  trade: {
    gspAccess: boolean;
    euGspPlus: boolean;
    ftaCount: number;
    exportGrowthRate: number; // percentage
    importRestrictions: 'low' | 'medium' | 'high';
  };
  
  // Incentives
  incentives: {
    cashGrants: boolean;
    landSubsidy: boolean;
    trainingSupport: boolean;
    rAndDCredits: boolean;
    exportBonuses: boolean;
    specialZoneBenefits: boolean;
  };
}

const countryDatabase: Record<string, CountryBenchmark> = {
  BGD: {
    country: 'Bangladesh',
    code: 'BGD',
    labor: {
      minimumWage: 113,
      averageWage: 180,
      skilledWage: 320,
      productivityIndex: 68,
      laborAvailability: 'high',
      educationLevel: 6.8,
      languageBarrier: 'low',
    },
    utilities: {
      electricityCostKWh: 0.09,
      waterCostM3: 0.35,
      gasCostMMBTU: 2.8,
      internetCostMbps: 8.5,
      reliabilityScore: 78,
    },
    land: {
      industrialLandPerSqFt: 1.5,
      warehouseRentalPerSqFt: 0.5,
      officeRentalPerSqFt: 0.7,
      averagePlotSize: 10000,
      availability: 'high',
    },
    logistics: {
      portToEU: 1500,
      portToUSA: 1800,
      portToChina: 1200,
      portToMiddleEast: 1600,
      domesticTransportPerKm: 0.05,
      averageCustomsClearanceDays: 5,
    },
    taxation: {
      corporateTaxRate: 22.5,
      vatRate: 15,
      importDuty: 14.6,
      exportIncentives: true,
      taxHolidayYears: 10,
      doubleDeductionRAndD: true,
    },
    business: {
      setupTimeDays: 19,
      setupCostUSD: 1200,
      regulatoryComplexity: 'medium',
      corruptionIndex: 26,
      easeOfDoingBusiness: 168,
      contractEnforcementDays: 1442,
    },
    infrastructure: {
      portEfficiency: 62,
      airportConnectivity: 58,
      roadQuality: 54,
      railCoverage: 48,
      digitalInfrastructure: 72,
    },
    trade: {
      gspAccess: true,
      euGspPlus: true,
      ftaCount: 3,
      exportGrowthRate: 8.2,
      importRestrictions: 'medium',
    },
    incentives: {
      cashGrants: false,
      landSubsidy: true,
      trainingSupport: true,
      rAndDCredits: true,
      exportBonuses: true,
      specialZoneBenefits: true,
    },
  },
  
  VNM: {
    country: 'Vietnam',
    code: 'VNM',
    labor: {
      minimumWage: 190,
      averageWage: 280,
      skilledWage: 480,
      productivityIndex: 74,
      laborAvailability: 'high',
      educationLevel: 8.2,
      languageBarrier: 'medium',
    },
    utilities: {
      electricityCostKWh: 0.08,
      waterCostM3: 0.42,
      gasCostMMBTU: 4.2,
      internetCostMbps: 6.8,
      reliabilityScore: 82,
    },
    land: {
      industrialLandPerSqFt: 2.0,
      warehouseRentalPerSqFt: 0.6,
      officeRentalPerSqFt: 0.8,
      averagePlotSize: 12000,
      availability: 'high',
    },
    logistics: {
      portToEU: 1400,
      portToUSA: 1700,
      portToChina: 1100,
      portToMiddleEast: 1500,
      domesticTransportPerKm: 0.04,
      averageCustomsClearanceDays: 4,
    },
    taxation: {
      corporateTaxRate: 20,
      vatRate: 10,
      importDuty: 9.5,
      exportIncentives: true,
      taxHolidayYears: 4,
      doubleDeductionRAndD: true,
    },
    business: {
      setupTimeDays: 25,
      setupCostUSD: 1850,
      regulatoryComplexity: 'medium',
      corruptionIndex: 36,
      easeOfDoingBusiness: 70,
      contractEnforcementDays: 295,
    },
    infrastructure: {
      portEfficiency: 76,
      airportConnectivity: 72,
      roadQuality: 68,
      railCoverage: 52,
      digitalInfrastructure: 78,
    },
    trade: {
      gspAccess: true,
      euGspPlus: false,
      ftaCount: 15,
      exportGrowthRate: 12.4,
      importRestrictions: 'low',
    },
    incentives: {
      cashGrants: true,
      landSubsidy: true,
      trainingSupport: true,
      rAndDCredits: true,
      exportBonuses: true,
      specialZoneBenefits: true,
    },
  },
  
  IND: {
    country: 'India',
    code: 'IND',
    labor: {
      minimumWage: 145,
      averageWage: 215,
      skilledWage: 420,
      productivityIndex: 71,
      laborAvailability: 'high',
      educationLevel: 6.5,
      languageBarrier: 'low',
    },
    utilities: {
      electricityCostKWh: 0.07,
      waterCostM3: 0.28,
      gasCostMMBTU: 6.5,
      internetCostMbps: 4.2,
      reliabilityScore: 68,
    },
    land: {
      industrialLandPerSqFt: 2.5,
      warehouseRentalPerSqFt: 0.7,
      officeRentalPerSqFt: 0.9,
      averagePlotSize: 15000,
      availability: 'high',
    },
    logistics: {
      portToEU: 1300,
      portToUSA: 1600,
      portToChina: 1000,
      portToMiddleEast: 1400,
      domesticTransportPerKm: 0.03,
      averageCustomsClearanceDays: 3,
    },
    taxation: {
      corporateTaxRate: 25.2,
      vatRate: 18,
      importDuty: 13.8,
      exportIncentives: true,
      taxHolidayYears: 5,
      doubleDeductionRAndD: true,
    },
    business: {
      setupTimeDays: 18,
      setupCostUSD: 950,
      regulatoryComplexity: 'high',
      corruptionIndex: 40,
      easeOfDoingBusiness: 63,
      contractEnforcementDays: 1445,
    },
    infrastructure: {
      portEfficiency: 68,
      airportConnectivity: 82,
      roadQuality: 62,
      railCoverage: 78,
      digitalInfrastructure: 74,
    },
    trade: {
      gspAccess: true,
      euGspPlus: false,
      ftaCount: 12,
      exportGrowthRate: 9.1,
      importRestrictions: 'high',
    },
    incentives: {
      cashGrants: true,
      landSubsidy: true,
      trainingSupport: true,
      rAndDCredits: true,
      exportBonuses: true,
      specialZoneBenefits: true,
    },
  },
  
  CHN: {
    country: 'China',
    code: 'CHN',
    labor: {
      minimumWage: 380,
      averageWage: 620,
      skilledWage: 1100,
      productivityIndex: 88,
      laborAvailability: 'medium',
      educationLevel: 9.9,
      languageBarrier: 'high',
    },
    utilities: {
      electricityCostKWh: 0.08,
      waterCostM3: 0.55,
      gasCostMMBTU: 8.2,
      internetCostMbps: 5.5,
      reliabilityScore: 92,
    },
    land: {
      industrialLandPerSqFt: 3.0,
      warehouseRentalPerSqFt: 0.8,
      officeRentalPerSqFt: 1.0,
      averagePlotSize: 20000,
      availability: 'medium',
    },
    logistics: {
      portToEU: 1200,
      portToUSA: 1500,
      portToChina: 900,
      portToMiddleEast: 1300,
      domesticTransportPerKm: 0.02,
      averageCustomsClearanceDays: 2,
    },
    taxation: {
      corporateTaxRate: 25,
      vatRate: 13,
      importDuty: 7.5,
      exportIncentives: true,
      taxHolidayYears: 2,
      doubleDeductionRAndD: true,
    },
    business: {
      setupTimeDays: 27,
      setupCostUSD: 3200,
      regulatoryComplexity: 'high',
      corruptionIndex: 42,
      easeOfDoingBusiness: 31,
      contractEnforcementDays: 496,
    },
    infrastructure: {
      portEfficiency: 94,
      airportConnectivity: 96,
      roadQuality: 88,
      railCoverage: 92,
      digitalInfrastructure: 90,
    },
    trade: {
      gspAccess: false,
      euGspPlus: false,
      ftaCount: 19,
      exportGrowthRate: 5.2,
      importRestrictions: 'medium',
    },
    incentives: {
      cashGrants: true,
      landSubsidy: true,
      trainingSupport: true,
      rAndDCredits: true,
      exportBonuses: true,
      specialZoneBenefits: true,
    },
  },
  
  THA: {
    country: 'Thailand',
    code: 'THA',
    labor: {
      minimumWage: 310,
      averageWage: 450,
      skilledWage: 720,
      productivityIndex: 76,
      laborAvailability: 'high',
      educationLevel: 7.9,
      languageBarrier: 'medium',
    },
    utilities: {
      electricityCostKWh: 0.10,
      waterCostM3: 0.48,
      gasCostMMBTU: 9.5,
      internetCostMbps: 7.2,
      reliabilityScore: 85,
    },
    land: {
      industrialLandPerSqFt: 2.0,
      warehouseRentalPerSqFt: 0.6,
      officeRentalPerSqFt: 0.8,
      averagePlotSize: 12000,
      availability: 'high',
    },
    logistics: {
      portToEU: 1400,
      portToUSA: 1700,
      portToChina: 1100,
      portToMiddleEast: 1500,
      domesticTransportPerKm: 0.04,
      averageCustomsClearanceDays: 4,
    },
    taxation: {
      corporateTaxRate: 20,
      vatRate: 7,
      importDuty: 8.3,
      exportIncentives: true,
      taxHolidayYears: 8,
      doubleDeductionRAndD: true,
    },
    business: {
      setupTimeDays: 22,
      setupCostUSD: 1650,
      regulatoryComplexity: 'medium',
      corruptionIndex: 35,
      easeOfDoingBusiness: 21,
      contractEnforcementDays: 440,
    },
    infrastructure: {
      portEfficiency: 80,
      airportConnectivity: 84,
      roadQuality: 75,
      railCoverage: 42,
      digitalInfrastructure: 82,
    },
    trade: {
      gspAccess: true,
      euGspPlus: false,
      ftaCount: 13,
      exportGrowthRate: 6.8,
      importRestrictions: 'low',
    },
    incentives: {
      cashGrants: true,
      landSubsidy: true,
      trainingSupport: true,
      rAndDCredits: true,
      exportBonuses: true,
      specialZoneBenefits: true,
    },
  },
};

// PUBLIC API

export function getCountryBenchmark(code: string): CountryBenchmark {
  const benchmark = countryDatabase[code];
  if (!benchmark) {
    throw new Error(`Country benchmark not found for ${code}`);
  }
  return benchmark;
}

export function getAllCountries(): CountryBenchmark[] {
  return Object.values(countryDatabase);
}

export function compareCountries(codes: string[]): CountryBenchmark[] {
  return codes.map(code => getCountryBenchmark(code));
}

export interface CostComparison {
  country: string;
  setup: {
    timeDays: number;
    costUSD: number;
    complexity: string;
  };
  yearlyOperating: {
    laborCost: number;
    utilityCost: number;
    taxCost: number;
    totalCost: number;
  };
  advantages: string[];
  disadvantages: string[];
}

export function compareCosts(
  sector: string,
  investmentSizeUSD: number,
  employeeCount: number,
  annualRevenue: number,
  countryCodes: string[] = ['BGD', 'VNM', 'IND', 'CHN', 'THA']
): CostComparison[] {
  return countryCodes.map(code => {
    const country = getCountryBenchmark(code);
    
    // Calculate yearly costs
    const laborCost = employeeCount * country.labor.averageWage * 12;
    
    // Estimate utility consumption
    const electricityKWh = investmentSizeUSD * 0.5; // Rough estimate
    const waterM3 = employeeCount * 50;
    const utilityCost = (electricityKWh * country.utilities.electricityCostKWh) + (waterM3 * country.utilities.waterCostM3);
    
    // Tax calculation
    const taxableIncome = annualRevenue * 0.15; // Rough profit margin
    const corporateTax = taxableIncome * (country.taxation.corporateTaxRate / 100);
    const vat = annualRevenue * (country.taxation.vatRate / 100) * 0.3; // Partial VAT burden
    const taxCost = corporateTax + vat;
    
    const totalCost = laborCost + utilityCost + taxCost;
    
    // Identify advantages
    const advantages: string[] = [];
    const disadvantages: string[] = [];
    
    if (country.labor.minimumWage < 150) advantages.push('Low labor costs');
    if (country.taxation.taxHolidayYears >= 5) advantages.push(`${country.taxation.taxHolidayYears}-year tax holiday`);
    if (country.trade.euGspPlus) advantages.push('EU GSP+ duty-free access');
    if (country.infrastructure.portEfficiency > 75) advantages.push('Efficient port infrastructure');
    if (country.business.setupTimeDays < 20) advantages.push('Fast company setup');
    if (country.utilities.reliabilityScore > 80) advantages.push('Reliable utilities');
    
    if (country.labor.minimumWage > 300) disadvantages.push('Higher labor costs');
    if (country.business.regulatoryComplexity === 'high' || country.business.regulatoryComplexity === 'very-high') {
      disadvantages.push('Complex regulations');
    }
    if (country.labor.languageBarrier === 'high') disadvantages.push('Language barriers');
    if (country.trade.importRestrictions === 'high') disadvantages.push('Import restrictions');
    
    return {
      country: country.country,
      setup: {
        timeDays: country.business.setupTimeDays,
        costUSD: country.business.setupCostUSD,
        complexity: country.business.regulatoryComplexity,
      },
      yearlyOperating: {
        laborCost,
        utilityCost,
        taxCost,
        totalCost,
      },
      advantages,
      disadvantages,
    };
  });
}

export function calculateROI(
  investmentUSD: number,
  annualRevenue: number,
  countryCode: string
): {
  country: string;
  breakevenYears: number;
  year5NetProfit: number;
  year10NetProfit: number;
  effectiveTaxRate: number;
  roi5Year: number;
  roi10Year: number;
} {
  const country = getCountryBenchmark(countryCode);
  
  // Simplified profit calculation
  const annualProfit = annualRevenue * 0.15; // 15% profit margin assumption
  
  // Tax holidays
  const taxHolidayYears = country.taxation.taxHolidayYears;
  const effectiveTaxRate = country.taxation.corporateTaxRate / 100;
  
  let cumulativeProfit = 0;
  let breakevenYears = 0;
  
  for (let year = 1; year <= 10; year++) {
    const yearlyTax = year <= taxHolidayYears ? 0 : annualProfit * effectiveTaxRate;
    const netProfit = annualProfit - yearlyTax;
    cumulativeProfit += netProfit;
    
    if (breakevenYears === 0 && cumulativeProfit >= investmentUSD) {
      breakevenYears = year;
    }
  }
  
  // Calculate 5-year and 10-year cumulative
  let profit5Year = 0;
  let profit10Year = 0;
  
  for (let year = 1; year <= 10; year++) {
    const yearlyTax = year <= taxHolidayYears ? 0 : annualProfit * effectiveTaxRate;
    const netProfit = annualProfit - yearlyTax;
    
    if (year <= 5) profit5Year += netProfit;
    profit10Year += netProfit;
  }
  
  return {
    country: country.country,
    breakevenYears: breakevenYears || 10,
    year5NetProfit: profit5Year,
    year10NetProfit: profit10Year,
    effectiveTaxRate: country.taxation.corporateTaxRate,
    roi5Year: ((profit5Year - investmentUSD) / investmentUSD) * 100,
    roi10Year: ((profit10Year - investmentUSD) / investmentUSD) * 100,
  };
}