/**
 * ⚖️ BIAS & FAIRNESS ANALYZER
 * 
 * Detects potential bias in decision-making patterns
 * Ensures fair treatment across applicants
 */

import { OfficerApplication } from '@/app/officer-core/officerDataEngine';

export interface BiasAnalysis {
  overallScore: number; // 0-100, higher is better (less bias)
  level: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  color: string;
  flags: BiasFlag[];
  recommendations: string[];
  comparisons: {
    byCountry: CountryBias[];
    bySector: SectorBias[];
    byInvestmentSize: SizeBias[];
  };
}

export interface BiasFlag {
  type: 'country' | 'sector' | 'size' | 'timeline';
  severity: 'low' | 'medium' | 'high';
  description: string;
  evidence: string;
}

export interface CountryBias {
  country: string;
  applications: number;
  approvalRate: number;
  avgProcessingDays: number;
  flagged: boolean;
}

export interface SectorBias {
  sector: string;
  applications: number;
  approvalRate: number;
  avgProcessingDays: number;
  flagged: boolean;
}

export interface SizeBias {
  range: string;
  applications: number;
  approvalRate: number;
  avgProcessingDays: number;
  flagged: boolean;
}

/**
 * Analyze bias patterns in officer's decisions
 */
export function analyzeBias(
  applications: OfficerApplication[],
  officerId: string
): BiasAnalysis {
  const flags: BiasFlag[] = [];
  const recommendations: string[] = [];

  // Group by country
  const byCountry = groupByCountry(applications);
  const countryBias = detectCountryBias(byCountry, flags);

  // Group by sector
  const bySector = groupBySector(applications);
  const sectorBias = detectSectorBias(bySector, flags);

  // Group by investment size
  const bySize = groupByInvestmentSize(applications);
  const sizeBias = detectSizeBias(bySize, flags);

  // Calculate overall fairness score
  const overallScore = calculateFairnessScore(flags, applications);

  // Generate recommendations
  if (flags.length === 0) {
    recommendations.push('✓ No significant bias detected in decision patterns');
    recommendations.push('✓ Continue maintaining fair and consistent standards');
  } else {
    flags.forEach(flag => {
      if (flag.type === 'country') {
        recommendations.push(`Review approval criteria for ${flag.description} to ensure consistency`);
      } else if (flag.type === 'sector') {
        recommendations.push(`Examine sector-specific requirements for ${flag.description}`);
      } else if (flag.type === 'size') {
        recommendations.push(`Ensure investment size doesn't disproportionately affect ${flag.description}`);
      }
    });
  }

  const level = getBiasLevel(overallScore);
  const color = getBiasColor(level);

  return {
    overallScore,
    level,
    color,
    flags,
    recommendations,
    comparisons: {
      byCountry: countryBias,
      bySector: sectorBias,
      byInvestmentSize: sizeBias
    }
  };
}

function groupByCountry(apps: OfficerApplication[]): Record<string, OfficerApplication[]> {
  return apps.reduce((acc, app) => {
    if (!acc[app.country]) acc[app.country] = [];
    acc[app.country].push(app);
    return acc;
  }, {} as Record<string, OfficerApplication[]>);
}

function groupBySector(apps: OfficerApplication[]): Record<string, OfficerApplication[]> {
  return apps.reduce((acc, app) => {
    if (!acc[app.sector]) acc[app.sector] = [];
    acc[app.sector].push(app);
    return acc;
  }, {} as Record<string, OfficerApplication[]>);
}

function groupByInvestmentSize(apps: OfficerApplication[]): Record<string, OfficerApplication[]> {
  const grouped: Record<string, OfficerApplication[]> = {
    '< $1M': [],
    '$1M - $5M': [],
    '$5M - $10M': [],
    '$10M - $50M': [],
    '> $50M': []
  };

  apps.forEach(app => {
    const amount = app.investmentAmount;
    if (amount < 1000000) grouped['< $1M'].push(app);
    else if (amount < 5000000) grouped['$1M - $5M'].push(app);
    else if (amount < 10000000) grouped['$5M - $10M'].push(app);
    else if (amount < 50000000) grouped['$10M - $50M'].push(app);
    else grouped['> $50M'].push(app);
  });

  return grouped;
}

function detectCountryBias(
  grouped: Record<string, OfficerApplication[]>,
  flags: BiasFlag[]
): CountryBias[] {
  const analysis: CountryBias[] = [];
  const avgApprovalRate = calculateOverallApprovalRate(Object.values(grouped).flat());

  Object.entries(grouped).forEach(([country, apps]) => {
    if (apps.length === 0) return;

    const approvalRate = calculateApprovalRate(apps);
    const avgDays = calculateAvgProcessingDays(apps);
    
    // Flag if approval rate differs significantly from average
    const deviation = Math.abs(approvalRate - avgApprovalRate);
    const flagged = deviation > 25; // More than 25% deviation

    if (flagged) {
      flags.push({
        type: 'country',
        severity: deviation > 40 ? 'high' : 'medium',
        description: country,
        evidence: `${approvalRate.toFixed(0)}% approval rate vs ${avgApprovalRate.toFixed(0)}% average`
      });
    }

    analysis.push({
      country,
      applications: apps.length,
      approvalRate,
      avgProcessingDays: avgDays,
      flagged
    });
  });

  return analysis.sort((a, b) => b.applications - a.applications);
}

function detectSectorBias(
  grouped: Record<string, OfficerApplication[]>,
  flags: BiasFlag[]
): SectorBias[] {
  const analysis: SectorBias[] = [];
  const avgApprovalRate = calculateOverallApprovalRate(Object.values(grouped).flat());

  Object.entries(grouped).forEach(([sector, apps]) => {
    if (apps.length === 0) return;

    const approvalRate = calculateApprovalRate(apps);
    const avgDays = calculateAvgProcessingDays(apps);
    
    const deviation = Math.abs(approvalRate - avgApprovalRate);
    const flagged = deviation > 25;

    if (flagged) {
      flags.push({
        type: 'sector',
        severity: deviation > 40 ? 'high' : 'medium',
        description: sector,
        evidence: `${approvalRate.toFixed(0)}% approval rate vs ${avgApprovalRate.toFixed(0)}% average`
      });
    }

    analysis.push({
      sector,
      applications: apps.length,
      approvalRate,
      avgProcessingDays: avgDays,
      flagged
    });
  });

  return analysis.sort((a, b) => b.applications - a.applications);
}

function detectSizeBias(
  grouped: Record<string, OfficerApplication[]>,
  flags: BiasFlag[]
): SizeBias[] {
  const analysis: SizeBias[] = [];
  const avgApprovalRate = calculateOverallApprovalRate(Object.values(grouped).flat());

  Object.entries(grouped).forEach(([range, apps]) => {
    if (apps.length === 0) return;

    const approvalRate = calculateApprovalRate(apps);
    const avgDays = calculateAvgProcessingDays(apps);
    
    const deviation = Math.abs(approvalRate - avgApprovalRate);
    const flagged = deviation > 30;

    if (flagged) {
      flags.push({
        type: 'size',
        severity: deviation > 45 ? 'high' : 'medium',
        description: range,
        evidence: `${approvalRate.toFixed(0)}% approval rate vs ${avgApprovalRate.toFixed(0)}% average`
      });
    }

    analysis.push({
      range,
      applications: apps.length,
      approvalRate,
      avgProcessingDays: avgDays,
      flagged
    });
  });

  return analysis;
}

function calculateApprovalRate(apps: OfficerApplication[]): number {
  if (apps.length === 0) return 0;
  const approved = apps.filter(a => a.status === 'approved').length;
  return (approved / apps.length) * 100;
}

function calculateOverallApprovalRate(apps: OfficerApplication[]): number {
  return calculateApprovalRate(apps);
}

function calculateAvgProcessingDays(apps: OfficerApplication[]): number {
  if (apps.length === 0) return 0;
  
  const totalDays = apps.reduce((sum, app) => {
    const submitted = new Date(app.submittedDate);
    const now = new Date();
    const days = Math.floor((now.getTime() - submitted.getTime()) / (1000 * 60 * 60 * 24));
    return sum + days;
  }, 0);
  
  return Math.round(totalDays / apps.length);
}

function calculateFairnessScore(flags: BiasFlag[], apps: OfficerApplication[]): number {
  let score = 100;

  // Deduct points for each flag
  flags.forEach(flag => {
    if (flag.severity === 'high') score -= 20;
    else if (flag.severity === 'medium') score -= 10;
    else score -= 5;
  });

  // Bonus for diversity
  const uniqueCountries = new Set(apps.map(a => a.country)).size;
  const uniqueSectors = new Set(apps.map(a => a.sector)).size;
  
  if (uniqueCountries > 5) score += 5;
  if (uniqueSectors > 5) score += 5;

  return Math.max(0, Math.min(100, score));
}

function getBiasLevel(score: number): 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical' {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Fair';
  if (score >= 40) return 'Poor';
  return 'Critical';
}

function getBiasColor(level: string): string {
  switch (level) {
    case 'Excellent': return 'green';
    case 'Good': return 'blue';
    case 'Fair': return 'yellow';
    case 'Poor': return 'orange';
    case 'Critical': return 'red';
    default: return 'gray';
  }
}
