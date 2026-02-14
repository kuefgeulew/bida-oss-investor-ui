// Policy Impact Simulator - Tests policy changes before implementation

export interface PolicyScenario {
  taxHolidayYears: number;
  dutyExemptionPercent: number;
  sectorIncentives: { [sector: string]: number };
  landSubsidyPercent: number;
  fastTrackThreshold: number; // USD
}

export interface PolicyImpact {
  investorROIDelta: number; // percentage points
  fdiAttractivenessScore: number; // 0-100
  fiscalCost: number; // USD per year
  projectedTaxReturn: number; // USD over 10 years
  netBenefit: number; // USD
  competitivenessVsRegion: { country: string; score: number }[];
  recommendation: 'approve' | 'reconsider' | 'reject';
}

const BASELINE_SCENARIO: PolicyScenario = {
  taxHolidayYears: 5,
  dutyExemptionPercent: 50,
  sectorIncentives: {
    'Textile & Garment': 10,
    'Pharmaceutical': 15,
    'IT & Software': 20,
    'Renewable Energy': 25,
    'Manufacturing': 10
  },
  landSubsidyPercent: 20,
  fastTrackThreshold: 5000000
};

const REGIONAL_BASELINES = {
  'Vietnam': 72,
  'India': 68,
  'Indonesia': 65,
  'Thailand': 70,
  'Malaysia': 74,
  'Bangladesh (Current)': 62
};

export function simulatePolicyImpact(
  newScenario: PolicyScenario,
  applications: any[]
): PolicyImpact {
  const baseline = BASELINE_SCENARIO;
  
  // Calculate Investor ROI Delta
  let roiDelta = 0;
  
  // Tax holiday impact
  const taxYearsDiff = newScenario.taxHolidayYears - baseline.taxHolidayYears;
  roiDelta += taxYearsDiff * 2.5; // Each year adds ~2.5% ROI
  
  // Duty exemption impact
  const dutyDiff = newScenario.dutyExemptionPercent - baseline.dutyExemptionPercent;
  roiDelta += dutyDiff * 0.15; // Each 1% duty exemption adds ~0.15% ROI
  
  // Land subsidy impact
  const landDiff = newScenario.landSubsidyPercent - baseline.landSubsidyPercent;
  roiDelta += landDiff * 0.08; // Each 1% land subsidy adds ~0.08% ROI
  
  // FDI Attractiveness Score (0-100)
  let attractivenessScore = 62; // Bangladesh baseline
  
  // Tax holiday contribution
  attractivenessScore += (newScenario.taxHolidayYears / 10) * 15; // Max 15 points
  
  // Duty exemption contribution
  attractivenessScore += (newScenario.dutyExemptionPercent / 100) * 12; // Max 12 points
  
  // Sector incentives contribution
  const avgSectorIncentive = Object.values(newScenario.sectorIncentives).reduce((a, b) => a + b, 0) / 
    Object.keys(newScenario.sectorIncentives).length;
  attractivenessScore += (avgSectorIncentive / 30) * 8; // Max 8 points
  
  // Fast-track threshold (lower is better)
  if (newScenario.fastTrackThreshold < 3000000) attractivenessScore += 5;
  else if (newScenario.fastTrackThreshold < 5000000) attractivenessScore += 3;
  
  attractivenessScore = Math.min(100, Math.max(0, attractivenessScore));
  
  // Fiscal Cost Calculation
  const avgInvestmentSize = applications.reduce((sum, app) => sum + (app.investmentAmount || 0), 0) / applications.length;
  const projectedNewFDI = applications.length * 1.3 * avgInvestmentSize; // 30% increase assumption
  
  // Tax holiday cost
  const corporateTaxRate = 0.25;
  const avgAnnualProfit = avgInvestmentSize * 0.12; // 12% return
  const taxHolidayCost = projectedNewFDI * avgAnnualProfit * corporateTaxRate * newScenario.taxHolidayYears;
  
  // Duty exemption cost
  const avgImportValue = avgInvestmentSize * 0.3; // 30% of investment
  const dutyRate = 0.25;
  const dutyExemptionCost = projectedNewFDI * avgImportValue * dutyRate * (newScenario.dutyExemptionPercent / 100);
  
  // Land subsidy cost
  const avgLandCost = avgInvestmentSize * 0.15;
  const landSubsidyCost = projectedNewFDI * avgLandCost * (newScenario.landSubsidyPercent / 100);
  
  const fiscalCost = taxHolidayCost + dutyExemptionCost + landSubsidyCost;
  
  // Projected Tax Return (10 years)
  const yearsAfterHoliday = Math.max(0, 10 - newScenario.taxHolidayYears);
  const taxFromOperations = projectedNewFDI * avgAnnualProfit * corporateTaxRate * yearsAfterHoliday;
  
  // Employment tax (indirect)
  const jobsPerMillion = 50;
  const jobs = (projectedNewFDI / 1000000) * jobsPerMillion;
  const avgSalary = 8000; // USD per year
  const incomeTaxRate = 0.15;
  const employmentTax = jobs * avgSalary * incomeTaxRate * 10;
  
  // VAT from operations
  const vatRate = 0.15;
  const annualRevenue = avgInvestmentSize * 0.40; // 40% of investment as annual revenue
  const vatCollection = projectedNewFDI * annualRevenue * vatRate * 10;
  
  const projectedTaxReturn = taxFromOperations + employmentTax + vatCollection;
  
  // Net Benefit
  const netBenefit = projectedTaxReturn - fiscalCost;
  
  // Competitiveness vs Region
  const competitivenessVsRegion = Object.entries(REGIONAL_BASELINES).map(([country, baseScore]) => ({
    country,
    score: country === 'Bangladesh (Current)' ? attractivenessScore : baseScore
  })).sort((a, b) => b.score - a.score);
  
  // Recommendation
  let recommendation: 'approve' | 'reconsider' | 'reject';
  if (netBenefit > fiscalCost * 0.5 && attractivenessScore > 70) {
    recommendation = 'approve';
  } else if (netBenefit > 0 && attractivenessScore > 65) {
    recommendation = 'reconsider';
  } else {
    recommendation = 'reject';
  }
  
  return {
    investorROIDelta: Math.round(roiDelta * 10) / 10,
    fdiAttractivenessScore: Math.round(attractivenessScore),
    fiscalCost: Math.round(fiscalCost),
    projectedTaxReturn: Math.round(projectedTaxReturn),
    netBenefit: Math.round(netBenefit),
    competitivenessVsRegion,
    recommendation
  };
}

export function getRecommendationMessage(impact: PolicyImpact): string {
  if (impact.recommendation === 'approve') {
    return `✅ RECOMMENDED: Strong ROI (${impact.investorROIDelta > 0 ? '+' : ''}${impact.investorROIDelta}%), competitive score (${impact.fdiAttractivenessScore}/100), positive net benefit ($${(impact.netBenefit / 1000000).toFixed(1)}M)`;
  } else if (impact.recommendation === 'reconsider') {
    return `⚠️ RECONSIDER: Modest benefits. Consider targeted adjustments to improve attractiveness score or reduce fiscal cost.`;
  } else {
    return `❌ NOT RECOMMENDED: Negative net benefit or insufficient competitiveness gain. Reassess policy parameters.`;
  }
}
