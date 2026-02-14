// ESG Engine - Environmental, Social, Governance tracking for investments
// READ-ONLY engine that calculates ESG scores and green investment metrics
// Uses: sector, zone data, certifications

export interface ESGScore {
  overall: number; // 0-100
  environmental: number;
  social: number;
  governance: number;
  
  breakdown: {
    carbonFootprint: number;
    energyEfficiency: number;
    wasteManagement: number;
    waterUsage: number;
    laborPractices: number;
    communityImpact: number;
    diversityInclusion: number;
    transparency: number;
    ethicalGovernance: number;
    complianceRecord: number;
  };
  
  rating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC' | 'CC' | 'C';
  certifications: string[];
  strengths: string[];
  improvements: string[];
}

export interface GreenMetric {
  metric: string;
  value: number;
  unit: string;
  target?: number;
  trend: 'improving' | 'stable' | 'declining';
  lastUpdated: string;
}

export interface SustainabilityGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number; // 0-100
  status: 'on-track' | 'at-risk' | 'achieved' | 'delayed';
  relatedSDG: number; // UN SDG number
}

// Sector-based ESG baseline scores
const sectorESGBaselines: Record<string, Partial<ESGScore['breakdown']>> = {
  'Textile & Garments': {
    carbonFootprint: 45,
    energyEfficiency: 50,
    wasteManagement: 55,
    waterUsage: 40,
    laborPractices: 60,
  },
  'Technology & IT': {
    carbonFootprint: 75,
    energyEfficiency: 80,
    wasteManagement: 70,
    waterUsage: 85,
    laborPractices: 75,
  },
  'Pharmaceuticals': {
    carbonFootprint: 55,
    energyEfficiency: 60,
    wasteManagement: 70,
    waterUsage: 65,
    laborPractices: 70,
  },
  'Heavy Manufacturing': {
    carbonFootprint: 35,
    energyEfficiency: 40,
    wasteManagement: 50,
    waterUsage: 45,
    laborPractices: 55,
  },
};

// Certification impact on ESG scores
const certificationBonus: Record<string, number> = {
  'LEED': 15,
  'ISO 14001': 12,
  'ISO 45001': 10,
  'B Corp': 20,
  'Fair Trade': 15,
  'GOTS': 12,
  'OEKO-TEX': 10,
  'Higg Index': 15,
  'ZDHC': 12,
  'SA8000': 18,
  'Carbon Neutral': 20,
};

// PUBLIC API

export function calculateESGScore(
  sector: string,
  certifications: string[] = [],
  hasETP: boolean = false,
  hasSolarPower: boolean = false,
  greenCoverPercent: number = 0,
  femaleWorkforcePercent: number = 0,
  safetyIncidents: number = 0
): ESGScore {
  // Get baseline for sector
  const baseline = sectorESGBaselines[sector] || {
    carbonFootprint: 50,
    energyEfficiency: 50,
    wasteManagement: 50,
    waterUsage: 50,
    laborPractices: 50,
  };
  
  // Calculate Environmental (E) scores
  let carbonFootprint = baseline.carbonFootprint || 50;
  let energyEfficiency = baseline.energyEfficiency || 50;
  let wasteManagement = baseline.wasteManagement || 50;
  let waterUsage = baseline.waterUsage || 50;
  
  // Apply modifiers
  if (hasSolarPower) energyEfficiency += 15;
  if (hasETP) wasteManagement += 20;
  if (greenCoverPercent > 20) carbonFootprint += 10;
  
  // Certification bonuses
  certifications.forEach(cert => {
    const bonus = certificationBonus[cert] || 0;
    if (cert.includes('LEED') || cert.includes('ISO 14001') || cert.includes('Carbon')) {
      carbonFootprint = Math.min(100, carbonFootprint + bonus);
    }
    if (cert.includes('ZDHC') || cert.includes('ETP')) {
      wasteManagement = Math.min(100, wasteManagement + bonus);
    }
  });
  
  const environmental = (carbonFootprint + energyEfficiency + wasteManagement + waterUsage) / 4;
  
  // Calculate Social (S) scores
  let laborPractices = baseline.laborPractices || 50;
  let communityImpact = 60; // Base score
  let diversityInclusion = 50; // Base score
  
  // Apply social modifiers
  if (femaleWorkforcePercent > 40) diversityInclusion += 20;
  if (safetyIncidents === 0) laborPractices += 15;
  if (safetyIncidents > 5) laborPractices -= 20;
  
  certifications.forEach(cert => {
    const bonus = certificationBonus[cert] || 0;
    if (cert.includes('SA8000') || cert.includes('Fair Trade')) {
      laborPractices = Math.min(100, laborPractices + bonus);
    }
  });
  
  const social = (laborPractices + communityImpact + diversityInclusion) / 3;
  
  // Calculate Governance (G) scores
  const transparency = 70; // Assume decent transparency for registered firms
  const ethicalGovernance = 75; // Base score
  const complianceRecord = safetyIncidents === 0 ? 90 : Math.max(50, 90 - safetyIncidents * 5);
  
  const governance = (transparency + ethicalGovernance + complianceRecord) / 3;
  
  // Overall score
  const overall = (environmental * 0.4 + social * 0.35 + governance * 0.25);
  
  // Rating
  const rating = calculateRating(overall);
  
  // Strengths and improvements
  const strengths: string[] = [];
  const improvements: string[] = [];
  
  if (environmental > 70) strengths.push('Strong environmental practices');
  else if (environmental < 50) improvements.push('Improve environmental management');
  
  if (social > 70) strengths.push('Excellent social responsibility');
  else if (social < 50) improvements.push('Enhance labor and community programs');
  
  if (governance > 75) strengths.push('Robust governance framework');
  else if (governance < 60) improvements.push('Strengthen compliance and transparency');
  
  if (certifications.length > 3) strengths.push('Well-certified operations');
  if (certifications.length === 0) improvements.push('Obtain relevant certifications');
  
  return {
    overall: Math.round(overall),
    environmental: Math.round(environmental),
    social: Math.round(social),
    governance: Math.round(governance),
    breakdown: {
      carbonFootprint: Math.min(100, Math.round(carbonFootprint)),
      energyEfficiency: Math.min(100, Math.round(energyEfficiency)),
      wasteManagement: Math.min(100, Math.round(wasteManagement)),
      waterUsage: Math.min(100, Math.round(waterUsage)),
      laborPractices: Math.min(100, Math.round(laborPractices)),
      communityImpact: Math.min(100, Math.round(communityImpact)),
      diversityInclusion: Math.min(100, Math.round(diversityInclusion)),
      transparency: Math.min(100, Math.round(transparency)),
      ethicalGovernance: Math.min(100, Math.round(ethicalGovernance)),
      complianceRecord: Math.min(100, Math.round(complianceRecord)),
    },
    rating,
    certifications,
    strengths,
    improvements,
  };
}

export function getGreenMetrics(sector: string, investmentSize: number): GreenMetric[] {
  return [
    {
      metric: 'Carbon Emissions',
      value: investmentSize * 0.5, // tons CO2/year
      unit: 'tons CO2e/year',
      target: investmentSize * 0.3,
      trend: 'stable',
      lastUpdated: new Date().toISOString(),
    },
    {
      metric: 'Renewable Energy Usage',
      value: 25,
      unit: '% of total energy',
      target: 50,
      trend: 'improving',
      lastUpdated: new Date().toISOString(),
    },
    {
      metric: 'Water Consumption',
      value: investmentSize * 10, // m³/year
      unit: 'm³/year',
      target: investmentSize * 7,
      trend: 'improving',
      lastUpdated: new Date().toISOString(),
    },
    {
      metric: 'Waste Recycled',
      value: 65,
      unit: '% of total waste',
      target: 80,
      trend: 'stable',
      lastUpdated: new Date().toISOString(),
    },
    {
      metric: 'Female Workforce',
      value: 45,
      unit: '% of workforce',
      target: 50,
      trend: 'improving',
      lastUpdated: new Date().toISOString(),
    },
  ];
}

export function getSustainabilityGoals(sector: string): SustainabilityGoal[] {
  return [
    {
      id: 'goal-001',
      title: 'Achieve Carbon Neutrality',
      description: 'Offset 100% of carbon emissions through renewable energy and carbon credits',
      targetDate: '2028-12-31',
      progress: 35,
      status: 'on-track',
      relatedSDG: 13, // Climate Action
    },
    {
      id: 'goal-002',
      title: 'Zero Waste to Landfill',
      description: 'Recycle or repurpose 100% of operational waste',
      targetDate: '2027-06-30',
      progress: 65,
      status: 'on-track',
      relatedSDG: 12, // Responsible Consumption
    },
    {
      id: 'goal-003',
      title: '50% Female Leadership',
      description: 'Achieve gender parity in management positions',
      targetDate: '2029-12-31',
      progress: 28,
      status: 'at-risk',
      relatedSDG: 5, // Gender Equality
    },
    {
      id: 'goal-004',
      title: 'LEED Gold Certification',
      description: 'Obtain LEED Gold certification for all facilities',
      targetDate: '2027-12-31',
      progress: 50,
      status: 'on-track',
      relatedSDG: 11, // Sustainable Cities
    },
  ];
}

export function compareESGWithPeers(score: ESGScore, sector: string): {
  percentileRank: number;
  betterThan: number;
  gap: {
    environmental: number;
    social: number;
    governance: number;
  };
} {
  // Industry averages (simulated)
  const sectorAverages: Record<string, ESGScore> = {
    'Textile & Garments': {
      overall: 58,
      environmental: 55,
      social: 62,
      governance: 60,
    } as ESGScore,
    'Technology & IT': {
      overall: 72,
      environmental: 78,
      social: 70,
      governance: 68,
    } as ESGScore,
    'Pharmaceuticals': {
      overall: 65,
      environmental: 62,
      social: 68,
      governance: 66,
    } as ESGScore,
  };
  
  const average = sectorAverages[sector] || { overall: 60, environmental: 60, social: 60, governance: 60 } as ESGScore;
  
  const percentileRank = Math.min(95, Math.max(5, 50 + (score.overall - average.overall) * 2));
  const betterThan = Math.round(percentileRank);
  
  return {
    percentileRank,
    betterThan,
    gap: {
      environmental: score.environmental - average.environmental,
      social: score.social - average.social,
      governance: score.governance - average.governance,
    },
  };
}

export function getGreenIncentives(): Array<{
  name: string;
  description: string;
  value: string;
  eligibility: string;
}> {
  return [
    {
      name: 'Green Factory Certification Bonus',
      description: 'Additional 5% tax deduction for LEED-certified facilities',
      value: '5% tax deduction',
      eligibility: 'LEED Silver or higher',
    },
    {
      name: 'Renewable Energy Subsidy',
      description: 'Government subsidy for solar panel installation',
      value: 'Up to 30% of installation cost',
      eligibility: 'All industries',
    },
    {
      name: 'ETP Installation Grant',
      description: 'Grant for effluent treatment plant setup',
      value: 'Up to $100,000',
      eligibility: 'Manufacturing sectors',
    },
    {
      name: 'Green Bond Financing',
      description: 'Preferential interest rates for sustainable projects',
      value: '2% lower interest rate',
      eligibility: 'ESG score > 70',
    },
  ];
}

export function calculateCarbonFootprint(
  sector: string,
  employeeCount: number,
  annualEnergyKWh: number,
  hasRenewableEnergy: boolean
): {
  totalCO2Tons: number;
  perEmployee: number;
  breakdown: {
    energy: number;
    operations: number;
    transport: number;
  };
  offsetRequired: number;
  offsetCost: number;
} {
  // Emissions factors
  const gridEmissionFactor = 0.75; // kg CO2 per kWh (Bangladesh grid)
  const renewableEmissionFactor = 0.05; // kg CO2 per kWh (lifecycle emissions)
  
  const emissionFactor = hasRenewableEnergy ? renewableEmissionFactor : gridEmissionFactor;
  const energyEmissions = (annualEnergyKWh * emissionFactor) / 1000; // tons
  
  // Rough estimates for other emissions
  const operationsEmissions = employeeCount * 0.5; // 0.5 tons per employee
  const transportEmissions = employeeCount * 0.3; // 0.3 tons per employee
  
  const totalCO2Tons = energyEmissions + operationsEmissions + transportEmissions;
  const perEmployee = totalCO2Tons / employeeCount;
  
  // Carbon offset cost (approx $15/ton)
  const offsetCost = totalCO2Tons * 15;
  
  return {
    totalCO2Tons: Math.round(totalCO2Tons),
    perEmployee: parseFloat(perEmployee.toFixed(2)),
    breakdown: {
      energy: Math.round(energyEmissions),
      operations: Math.round(operationsEmissions),
      transport: Math.round(transportEmissions),
    },
    offsetRequired: Math.round(totalCO2Tons),
    offsetCost: Math.round(offsetCost),
  };
}

// Helper function
function calculateRating(score: number): ESGScore['rating'] {
  if (score >= 90) return 'AAA';
  if (score >= 85) return 'AA';
  if (score >= 75) return 'A';
  if (score >= 65) return 'BBB';
  if (score >= 55) return 'BB';
  if (score >= 45) return 'B';
  if (score >= 35) return 'CCC';
  if (score >= 25) return 'CC';
  return 'C';
}
