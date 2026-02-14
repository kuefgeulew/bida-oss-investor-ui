// Risk Scoring Engine for FDI Applications (0-100 scale)

export interface RiskFactors {
  country: number;
  sector: number;
  ownership: number;
  financialSource: number;
  compliance: number;
  aml: number;
}

export interface RiskScore {
  total: number; // 0-100
  factors: RiskFactors;
  level: 'Low' | 'Medium' | 'High' | 'Critical';
  color: string;
  flags: string[];
  recommendations: string[];
  requiresDueDiligence: boolean;
}

// Country risk scoring
function calculateCountryRisk(country: string): number {
  // Lower score = lower risk
  const countryRiskScores: Record<string, number> = {
    // Low risk countries (0-20)
    'United States': 5,
    'United Kingdom': 5,
    'Germany': 5,
    'Japan': 5,
    'South Korea': 8,
    'Singapore': 5,
    'Australia': 5,
    'Canada': 5,
    'Netherlands': 5,
    'Switzerland': 3,
    'Sweden': 5,
    'Norway': 5,
    
    // Medium risk countries (20-40)
    'China': 25,
    'India': 20,
    'Thailand': 18,
    'Vietnam': 22,
    'Malaysia': 15,
    'Indonesia': 25,
    'Turkey': 30,
    'Brazil': 28,
    'Mexico': 25,
    'UAE': 20,
    
    // Higher risk countries (40-60)
    'Russia': 50,
    'Pakistan': 45,
    'Nigeria': 50,
    'Myanmar': 55,
    'Afghanistan': 75,
    'Iran': 70,
    'North Korea': 95
  };
  
  return countryRiskScores[country] || 30; // Default medium risk
}

// Sector risk scoring
function calculateSectorRisk(sector: string): number {
  const sectorRiskScores: Record<string, number> = {
    'IT & Software': 5,
    'Consulting': 5,
    'Education': 8,
    'E-commerce': 10,
    'Retail': 12,
    'Trading': 15,
    'Textile & Garment': 10,
    'Manufacturing': 15,
    'Food Processing': 15,
    'Automotive': 18,
    'Real Estate': 25,
    'Cryptocurrency': 60,
    'Gambling': 70,
    'Chemical': 20,
    'Pharmaceutical': 15,
    'Banking & Finance': 30,
    'Telecom': 20,
    'Mining': 35,
    'Arms & Defense': 50,
    'Precious Metals': 40
  };
  
  return sectorRiskScores[sector] || 15;
}

// Ownership structure risk
function calculateOwnershipRisk(application: any): number {
  let risk = 0;
  
  // Complex ownership structures increase risk
  const ownershipLayers = application.ownershipLayers || 1;
  if (ownershipLayers > 3) risk += 15;
  else if (ownershipLayers > 2) risk += 10;
  else if (ownershipLayers > 1) risk += 5;
  
  // Offshore entities
  const hasOffshoreEntity = application.hasOffshoreEntity || false;
  if (hasOffshoreEntity) risk += 20;
  
  // Nominee shareholders
  const hasNominees = application.hasNomineeShareholders || false;
  if (hasNominees) risk += 15;
  
  // UBO disclosure
  const uboComplete = application.uboComplete || false;
  if (!uboComplete) risk += 25;
  
  // Politically Exposed Person (PEP)
  const hasPEP = application.hasPEP || false;
  if (hasPEP) risk += 30;
  
  return Math.min(risk, 100);
}

// Financial source risk
function calculateFinancialRisk(application: any): number {
  let risk = 0;
  
  // Source of funds documentation
  const hasSourceOfFunds = application.hasSourceOfFundsDocs || false;
  if (!hasSourceOfFunds) risk += 30;
  
  // Cash-heavy business model
  const isCashHeavy = application.isCashHeavy || false;
  if (isCashHeavy) risk += 15;
  
  // Multiple funding sources
  const fundingSourceCount = application.fundingSourceCount || 1;
  if (fundingSourceCount > 3) risk += 10;
  
  // Investment size vs. investor profile mismatch
  const investmentAmount = application.investmentAmount || 0;
  const investorNetWorth = application.investorNetWorth || investmentAmount;
  if (investmentAmount > investorNetWorth * 0.8) risk += 20;
  
  // Loan-financed investment
  const isLoanFinanced = application.isLoanFinanced || false;
  if (isLoanFinanced) risk += 5;
  
  return Math.min(risk, 100);
}

// Compliance history risk
function calculateComplianceRisk(application: any): number {
  let risk = 0;
  
  // Previous applications
  const previousApplications = application.previousApplications || 0;
  const previousRejections = application.previousRejections || 0;
  if (previousRejections > 0) risk += previousRejections * 15;
  
  // Documentation quality
  const documentQuality = application.documentQuality || 'good';
  if (documentQuality === 'poor') risk += 20;
  else if (documentQuality === 'incomplete') risk += 30;
  
  // Response time to queries
  const avgResponseDays = application.avgResponseDays || 2;
  if (avgResponseDays > 7) risk += 15;
  else if (avgResponseDays > 5) risk += 10;
  
  // Document discrepancies
  const hasDiscrepancies = application.hasDocumentDiscrepancies || false;
  if (hasDiscrepancies) risk += 25;
  
  return Math.min(risk, 100);
}

// AML (Anti-Money Laundering) risk
function calculateAMLRisk(application: any): number {
  let risk = 0;
  
  // Sanctions list check
  const onSanctionsList = application.onSanctionsList || false;
  if (onSanctionsList) risk += 80;
  
  // Adverse media
  const hasAdverseMedia = application.hasAdverseMedia || false;
  if (hasAdverseMedia) risk += 30;
  
  // Shell company indicators
  const shellCompanyIndicators = application.shellCompanyIndicators || 0;
  risk += shellCompanyIndicators * 15;
  
  // Rapid fund movement
  const rapidFundMovement = application.rapidFundMovement || false;
  if (rapidFundMovement) risk += 20;
  
  // High-risk jurisdiction involvement
  const highRiskJurisdictions = application.highRiskJurisdictions || 0;
  risk += highRiskJurisdictions * 10;
  
  return Math.min(risk, 100);
}

// Main risk calculation
export function calculateRiskScore(application: any): RiskScore {
  const factors: RiskFactors = {
    country: calculateCountryRisk(application.country || 'Unknown'),
    sector: calculateSectorRisk(application.sector || 'Unknown'),
    ownership: calculateOwnershipRisk(application),
    financialSource: calculateFinancialRisk(application),
    compliance: calculateComplianceRisk(application),
    aml: calculateAMLRisk(application)
  };
  
  // Weighted total
  const total = Math.min(
    Math.round(
      (factors.country * 0.15) +
      (factors.sector * 0.10) +
      (factors.ownership * 0.25) +
      (factors.financialSource * 0.20) +
      (factors.compliance * 0.15) +
      (factors.aml * 0.15)
    ),
    100
  );
  
  // Determine level
  let level: RiskScore['level'];
  let color: string;
  let requiresDueDiligence: boolean;
  
  if (total < 25) {
    level = 'Low';
    color = 'green';
    requiresDueDiligence = false;
  } else if (total < 50) {
    level = 'Medium';
    color = 'yellow';
    requiresDueDiligence = false;
  } else if (total < 75) {
    level = 'High';
    color = 'orange';
    requiresDueDiligence = true;
  } else {
    level = 'Critical';
    color = 'red';
    requiresDueDiligence = true;
  }
  
  // Generate flags
  const flags: string[] = [];
  if (factors.country > 40) flags.push('High-risk country of origin');
  if (factors.sector > 30) flags.push('High-risk sector');
  if (factors.ownership > 40) flags.push('Complex ownership structure');
  if (factors.financialSource > 40) flags.push('Financial source verification required');
  if (factors.compliance > 30) flags.push('Compliance concerns');
  if (factors.aml > 40) flags.push('⚠️ AML red flag - requires immediate review');
  if (application.onSanctionsList) flags.push('🚨 SANCTIONS LIST MATCH - DO NOT PROCEED');
  if (application.hasPEP) flags.push('Politically Exposed Person (PEP) detected');
  if (!application.uboComplete) flags.push('Ultimate Beneficial Owner (UBO) not disclosed');
  
  // Generate recommendations
  const recommendations: string[] = [];
  if (total >= 50) {
    recommendations.push('Conduct enhanced due diligence (EDD)');
    recommendations.push('Verify all source of funds documentation');
    recommendations.push('Request additional background information on beneficial owners');
  }
  if (factors.ownership > 40) {
    recommendations.push('Request complete UBO ownership chart with proof');
  }
  if (factors.aml > 40) {
    recommendations.push('⚠️ Escalate to AML compliance officer before approval');
  }
  if (application.onSanctionsList) {
    recommendations.push('🚨 STOP: Do not process. Escalate to legal department immediately');
  }
  if (factors.country > 40) {
    recommendations.push('Request embassy verification or reference letter');
  }
  if (total >= 75) {
    recommendations.push('Require senior officer approval');
    recommendations.push('Document all decision rationale for audit');
  }
  
  return {
    total,
    factors,
    level,
    color,
    flags,
    recommendations,
    requiresDueDiligence
  };
}

// Get risk color class
export function getRiskColorClass(score: number): string {
  if (score < 25) return 'bg-green-100 text-green-800 border-green-300';
  if (score < 50) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  if (score < 75) return 'bg-orange-100 text-orange-800 border-orange-300';
  return 'bg-red-100 text-red-800 border-red-300';
}