/**
 * 🧠 INVESTOR INTELLIGENCE ENGINE
 * 
 * The central brain that computes investor-specific intelligence from mock data.
 * All tabs read from this engine to provide coherent, contextual information.
 * 
 * This is what transforms a portal into a digital investment officer.
 */

import { format, addDays, differenceInDays, parseISO, isBefore, addMonths } from 'date-fns';

// ============================================================================
// TYPES
// ============================================================================

export interface InvestorProfile {
  id: string;
  name: string;
  country: string;
  sector: string;
  investmentAmount: number; // USD
  selectedZone: string;
  factorySize: number; // sq meters
  employeesExpected: number;
  startDate: Date;
  currentStep: string;
  isFirstTime: boolean;
  preferredLanguage: string;
}

export interface RiskAssessment {
  overallScore: number; // 0-100 (100 = no risk)
  factors: {
    documentCompleteness: number;
    slaRisk: number;
    taxCompliance: number;
    financialStability: number;
  };
  criticalIssues: string[];
  warnings: string[];
}

export interface PredictedTimeline {
  expectedCompletionDate: Date;
  daysRemaining: number;
  confidence: number; // 0-100
  bottlenecks: string[];
  parallelOpportunities: string[];
}

export interface ThisWeekActions {
  priority: 'critical' | 'high' | 'medium';
  action: string;
  deadline: Date;
  impact: string;
  relatedTab: string;
}

export interface ComplianceEvent {
  id: string;
  title: string;
  date: Date;
  category: 'tax' | 'renewal' | 'inspection' | 'meeting' | 'deadline';
  status: 'upcoming' | 'overdue' | 'completed';
  description: string;
  relatedTo: string;
}

export interface ScenarioAnalysis {
  scenario: string;
  roi5Year: number;
  breakEvenMonths: number;
  taxBenefits: number;
  riskScore: number;
  netProfit: number;
}

export interface ZoneSuitability {
  zoneName: string;
  suitabilityScore: number; // 0-100
  factors: {
    sectorMatch: number;
    infrastructure: number;
    laborAvailability: number;
    costEfficiency: number;
    logisticsAccess: number;
  };
  pros: string[];
  cons: string[];
  comparison: {
    zone: string;
    scoreDifference: number;
  }[];
}

export interface TaxExposure {
  estimatedAnnualLiability: number; // BDT
  dttBenefits: number; // BDT saved
  nextDeadline: Date;
  deadlineType: string;
  vatStatus: string;
  tinStatus: string;
}

export interface WorkPermitStatus {
  foreignStaffQuota: number;
  currentForeignStaff: number;
  pendingApplications: number;
  nextVisaExpiry: Date | null;
  expiringIn30Days: number;
  bidaRecommendationStatus: 'approved' | 'pending' | 'not_required';
}

export interface ImportExportReadiness {
  ircStatus: 'active' | 'pending' | 'not_applied';
  ercStatus: 'active' | 'pending' | 'not_applied';
  hsCodeKnown: boolean;
  bondedWarehouseEligible: boolean;
  exportIncentiveEstimate: number; // USD
  dutyExposure: number; // BDT
}

export interface OfficerQueueStatus {
  currentPosition: number;
  totalInQueue: number;
  estimatedWaitDays: number;
  officerName: string;
  officerWorkload: 'light' | 'moderate' | 'heavy';
  canExpedite: boolean;
}

export interface InvestorConfidence {
  score: number; // 0-100
  factors: {
    processClarity: number;
    timelinePredictability: number;
    supportQuality: number;
    documentationEase: number;
  };
  sentiment: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface LCRScore {
  score: number; // 0-100 (Local Content Requirement compliance)
  localContent: number; // percentage
  suggestedSuppliers: string[];
  resilienceRating: 'high' | 'medium' | 'low';
}

// ============================================================================
// INTELLIGENCE ENGINE CLASS
// ============================================================================

export class InvestorIntelligenceEngine {
  private profile: InvestorProfile;
  private mockSteps = [
    { id: 'rjsc', name: 'Company Registration', avgDays: 7, completed: true, completedDate: '2026-01-15' },
    { id: 'doe', name: 'Environmental Clearance', avgDays: 21, completed: true, completedDate: '2026-01-28' },
    { id: 'fire', name: 'Fire Safety Certificate', avgDays: 14, completed: false, startedDate: '2026-02-01' },
    { id: 'dife', name: 'Factory License', avgDays: 12, completed: false, startedDate: null },
    { id: 'bida', name: 'Work Permits', avgDays: 10, completed: false, startedDate: null },
    { id: 'customs', name: 'Import/Export License', avgDays: 8, completed: false, startedDate: null }
  ];

  constructor(profile: InvestorProfile) {
    this.profile = profile;
  }

  // ========================================================================
  // PREDICTIVE TIMELINE (Linear Regression)
  // ========================================================================

  predictTimeline(): PredictedTimeline {
    const completedSteps = this.mockSteps.filter(s => s.completed).length;
    const totalSteps = this.mockSteps.length;
    const remainingSteps = this.mockSteps.filter(s => !s.completed);
    
    // Calculate remaining days using historical avg + 20% buffer
    const remainingDays = remainingSteps.reduce((sum, step) => sum + step.avgDays, 0) * 1.2;
    
    const today = new Date();
    const expectedDate = addDays(today, Math.round(remainingDays));
    
    // Find bottlenecks (steps taking > avg)
    const bottlenecks = remainingSteps
      .filter(s => s.avgDays > 15)
      .map(s => s.name);
    
    // Find parallel opportunities
    const parallelOpportunities: string[] = [];
    if (!this.mockSteps.find(s => s.id === 'fire')?.completed && 
        !this.mockSteps.find(s => s.id === 'dife')?.completed) {
      parallelOpportunities.push('You can apply for Factory License while waiting for Fire Certificate');
    }
    if (!this.mockSteps.find(s => s.id === 'customs')?.completed && 
        !this.mockSteps.find(s => s.id === 'bida')?.completed) {
      parallelOpportunities.push('Import/Export License can be processed in parallel with Work Permits');
    }

    return {
      expectedCompletionDate: expectedDate,
      daysRemaining: Math.round(remainingDays),
      confidence: 85, // Based on completion rate + sector history
      bottlenecks,
      parallelOpportunities
    };
  }

  // ========================================================================
  // RISK ASSESSMENT
  // ========================================================================

  assessRisk(): RiskAssessment {
    // Mock document completeness (80% = 2 docs missing)
    const documentCompleteness = 80;
    
    // SLA risk based on current step timing
    const currentStepDays = 12; // Mock: Fire certificate on day 12 of 14
    const slaRisk = (currentStepDays / 14) > 0.8 ? 60 : 90; // 60 = high risk
    
    // Tax compliance (mock)
    const taxCompliance = 95; // Good standing
    
    // Financial stability (mock based on investment size)
    const financialStability = this.profile.investmentAmount > 1000000 ? 90 : 75;
    
    const overallScore = Math.round(
      (documentCompleteness * 0.3) +
      (slaRisk * 0.3) +
      (taxCompliance * 0.2) +
      (financialStability * 0.2)
    );

    const criticalIssues: string[] = [];
    const warnings: string[] = [];

    if (documentCompleteness < 85) {
      warnings.push('2 documents pending: Trade License renewal, Bank Reference Letter');
    }
    if (slaRisk < 70) {
      criticalIssues.push('Fire Certificate approval at risk - 2 days to SLA breach');
    }
    if (financialStability < 80) {
      warnings.push('Consider additional bank guarantees for faster processing');
    }

    return {
      overallScore,
      factors: {
        documentCompleteness,
        slaRisk,
        taxCompliance,
        financialStability
      },
      criticalIssues,
      warnings
    };
  }

  // ========================================================================
  // THIS WEEK'S ACTIONS
  // ========================================================================

  getThisWeekActions(): ThisWeekActions[] {
    const actions: ThisWeekActions[] = [];
    const today = new Date();

    // Action 1: Upcoming deadline
    actions.push({
      priority: 'critical',
      action: 'Submit Fire Safety compliance photos',
      deadline: addDays(today, 2),
      impact: 'Required to complete Fire Certificate (worth ৳2.1 lakh delay cost)',
      relatedTab: 'documents'
    });

    // Action 2: Tax deadline
    actions.push({
      priority: 'high',
      action: 'File quarterly VAT return',
      deadline: addDays(today, 8),
      impact: '15% penalty if missed',
      relatedTab: 'tax'
    });

    // Action 3: Opportunity
    actions.push({
      priority: 'medium',
      action: 'Book DIFE inspection appointment',
      deadline: addDays(today, 5),
      impact: 'Can save 7 days on Factory License if booked this week',
      relatedTab: 'appointments'
    });

    return actions.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  // ========================================================================
  // OFFICER QUEUE STATUS
  // ========================================================================

  getOfficerQueueStatus(): OfficerQueueStatus {
    return {
      currentPosition: 2,
      totalInQueue: 8,
      estimatedWaitDays: 3,
      officerName: 'Eng. Habibur Rahman',
      officerWorkload: 'moderate',
      canExpedite: true // Available if investor pays expedite fee or has priority status
    };
  }

  // ========================================================================
  // INVESTOR CONFIDENCE METER
  // ========================================================================

  calculateConfidence(): InvestorConfidence {
    // Mock based on journey progress + feedback
    const processClarity = 92; // High transparency
    const timelinePredictability = 88; // Good prediction accuracy
    const supportQuality = 95; // RM + AI advisor
    const documentationEase = 85; // Digital vault

    const score = Math.round(
      (processClarity + timelinePredictability + supportQuality + documentationEase) / 4
    );

    let sentiment: 'excellent' | 'good' | 'fair' | 'poor';
    if (score >= 90) sentiment = 'excellent';
    else if (score >= 75) sentiment = 'good';
    else if (score >= 60) sentiment = 'fair';
    else sentiment = 'poor';

    return {
      score,
      factors: {
        processClarity,
        timelinePredictability,
        supportQuality,
        documentationEase
      },
      sentiment
    };
  }

  // ========================================================================
  // COMPLIANCE CALENDAR
  // ========================================================================

  getComplianceCalendar(months: number = 3): ComplianceEvent[] {
    const today = new Date();
    const events: ComplianceEvent[] = [
      {
        id: 'vat-q1',
        title: 'Quarterly VAT Return',
        date: addDays(today, 8),
        category: 'tax',
        status: 'upcoming',
        description: 'File Q1 2026 VAT return with NBR',
        relatedTo: 'Tax Dashboard'
      },
      {
        id: 'fire-renewal',
        title: 'Fire License Renewal',
        date: addDays(today, 45),
        category: 'renewal',
        status: 'upcoming',
        description: 'Annual fire safety certificate renewal',
        relatedTo: 'Documents'
      },
      {
        id: 'doe-inspection',
        title: 'DoE Site Inspection',
        date: addDays(today, 15),
        category: 'inspection',
        status: 'upcoming',
        description: 'Environmental compliance site visit',
        relatedTo: 'Appointments'
      },
      {
        id: 'work-permit-expiry',
        title: 'Work Permit Expiry (3 staff)',
        date: addDays(today, 28),
        category: 'deadline',
        status: 'upcoming',
        description: '3 foreign staff work permits expire - renew 30 days before',
        relatedTo: 'Work Permits'
      },
      {
        id: 'agm',
        title: 'Annual General Meeting',
        date: addDays(today, 60),
        category: 'meeting',
        status: 'upcoming',
        description: 'Statutory AGM required by Companies Act',
        relatedTo: 'RJSC'
      }
    ];

    return events.filter(e => 
      differenceInDays(e.date, today) <= months * 30
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  // ========================================================================
  // ZONE SUITABILITY SCORING
  // ========================================================================

  scoreZoneSuitability(zoneName: string): ZoneSuitability {
    const sectorWeights: Record<string, Record<string, number>> = {
      'Textiles': {
        'Dhaka Economic Zone': 75,
        'Chittagong Economic Zone': 85,
        'Mirsarai Economic Zone': 92,
        'Mongla Economic Zone': 70
      },
      'IT Services': {
        'Dhaka Economic Zone': 95,
        'Chittagong Economic Zone': 80,
        'Mirsarai Economic Zone': 70,
        'Mongla Economic Zone': 65
      },
      'Pharmaceuticals': {
        'Dhaka Economic Zone': 90,
        'Chittagong Economic Zone': 88,
        'Mirsarai Economic Zone': 85,
        'Mongla Economic Zone': 75
      }
    };

    const baseScore = sectorWeights[this.profile.sector]?.[zoneName] || 70;

    // Factor breakdown
    const factors = {
      sectorMatch: baseScore,
      infrastructure: zoneName.includes('Mirsarai') ? 95 : 85,
      laborAvailability: zoneName.includes('Dhaka') ? 90 : 80,
      costEfficiency: zoneName.includes('Mirsarai') ? 88 : 75,
      logisticsAccess: zoneName.includes('Chittagong') ? 95 : 80
    };

    const suitabilityScore = Math.round(
      (factors.sectorMatch * 0.3) +
      (factors.infrastructure * 0.25) +
      (factors.laborAvailability * 0.2) +
      (factors.costEfficiency * 0.15) +
      (factors.logisticsAccess * 0.1)
    );

    // Pros/Cons
    const pros: string[] = [];
    const cons: string[] = [];

    if (suitabilityScore >= 85) {
      pros.push('Optimal sector match', 'World-class infrastructure', 'Strong labor pool');
    } else if (suitabilityScore >= 75) {
      pros.push('Good infrastructure', 'Reasonable costs');
      cons.push('May need additional labor training');
    } else {
      pros.push('Lower land costs');
      cons.push('Limited sector clustering', 'Infrastructure under development');
    }

    // Comparison with other zones
    const allZones = Object.keys(sectorWeights[this.profile.sector] || {});
    const comparison = allZones
      .filter(z => z !== zoneName)
      .map(z => ({
        zone: z,
        scoreDifference: suitabilityScore - (sectorWeights[this.profile.sector]?.[z] || 70)
      }))
      .sort((a, b) => b.scoreDifference - a.scoreDifference)
      .slice(0, 2);

    return {
      zoneName,
      suitabilityScore,
      factors,
      pros,
      cons,
      comparison
    };
  }

  // ========================================================================
  // TAX EXPOSURE CALCULATION
  // ========================================================================

  calculateTaxExposure(): TaxExposure {
    const revenue = this.profile.investmentAmount * 0.15; // Assume 15% revenue in year 1
    const corporateTax = revenue * 0.225; // 22.5% corporate tax
    const vatLiability = revenue * 0.15; // 15% VAT
    const dttSavings = corporateTax * 0.10; // 10% saved via DTT

    return {
      estimatedAnnualLiability: Math.round((corporateTax + vatLiability) * 110), // USD to BDT
      dttBenefits: Math.round(dttSavings * 110),
      nextDeadline: addDays(new Date(), 8),
      deadlineType: 'Quarterly VAT Return',
      vatStatus: 'Registered',
      tinStatus: 'Active'
    };
  }

  // ========================================================================
  // WORK PERMIT STATUS
  // ========================================================================

  getWorkPermitStatus(): WorkPermitStatus {
    const quota = Math.max(5, Math.floor(this.profile.employeesExpected * 0.05)); // 5% foreign staff
    
    return {
      foreignStaffQuota: quota,
      currentForeignStaff: 3,
      pendingApplications: 2,
      nextVisaExpiry: addDays(new Date(), 28),
      expiringIn30Days: 3,
      bidaRecommendationStatus: 'approved'
    };
  }

  // ========================================================================
  // IMPORT/EXPORT READINESS
  // ========================================================================

  getImportExportReadiness(): ImportExportReadiness {
    const isExporter = this.profile.sector === 'Textiles' || this.profile.sector === 'Pharmaceuticals';
    const exportVolume = isExporter ? this.profile.investmentAmount * 0.4 : 0;
    const exportIncentive = exportVolume * 0.07; // 7% cash incentive

    return {
      ircStatus: 'active',
      ercStatus: isExporter ? 'active' : 'not_applied',
      hsCodeKnown: true,
      bondedWarehouseEligible: this.profile.investmentAmount > 500000,
      exportIncentiveEstimate: Math.round(exportIncentive),
      dutyExposure: Math.round(this.profile.investmentAmount * 0.05 * 110) // 5% avg duty
    };
  }

  // ========================================================================
  // SCENARIO ANALYSIS (5-Year ROI)
  // ========================================================================

  analyzeScenario(scenario: 'conservative' | 'realistic' | 'optimistic'): ScenarioAnalysis {
    const multipliers = {
      conservative: { revenue: 0.12, growth: 0.05, risk: 25 },
      realistic: { revenue: 0.18, growth: 0.08, risk: 15 },
      optimistic: { revenue: 0.25, growth: 0.12, risk: 35 }
    };

    const params = multipliers[scenario];
    const year1Revenue = this.profile.investmentAmount * params.revenue;
    
    // Calculate 5-year cumulative
    let totalRevenue = 0;
    for (let year = 1; year <= 5; year++) {
      totalRevenue += year1Revenue * Math.pow(1 + params.growth, year - 1);
    }

    const totalCosts = this.profile.investmentAmount * 1.3; // 130% total cost base
    const netProfit = totalRevenue - totalCosts;
    const roi5Year = (netProfit / this.profile.investmentAmount) * 100;
    const breakEvenMonths = Math.round((this.profile.investmentAmount / (year1Revenue / 12)));

    // Tax benefits (10-year holiday + DTT + export incentives)
    const taxBenefits = totalRevenue * 0.08; // 8% effective benefit

    return {
      scenario,
      roi5Year: Math.round(roi5Year),
      breakEvenMonths,
      taxBenefits: Math.round(taxBenefits),
      riskScore: params.risk,
      netProfit: Math.round(netProfit)
    };
  }

  // ========================================================================
  // LCR (Local Content Requirement) SCORE
  // ========================================================================

  calculateLCRScore(): LCRScore {
    // Mock: 60% local content target for most sectors
    const localContent = 62; // Slightly above target
    const score = Math.min(100, (localContent / 60) * 100);

    const resilienceRating: 'high' | 'medium' | 'low' = 
      localContent >= 60 ? 'high' :
      localContent >= 40 ? 'medium' : 'low';

    const suggestedSuppliers = [
      'ACI Chemicals (Dhaka)',
      'Beximco Textiles (Gazipur)',
      'Square Pharmaceuticals (Dhaka)',
      'Walton Industries (Gazipur)'
    ];

    return {
      score: Math.round(score),
      localContent,
      suggestedSuppliers,
      resilienceRating
    };
  }

  // ========================================================================
  // DELAY IMPACT CALCULATOR
  // ========================================================================

  calculateDelayImpact(delayDays: number): {
    costImpact: number; // BDT
    revenueImpact: number; // USD
    newCompletionDate: Date;
    cascadeEffects: string[];
  } {
    const timeline = this.predictTimeline();
    const dailyRevenueLoss = (this.profile.investmentAmount * 0.15) / 365; // Assume 15% year 1 revenue
    const dailyCostIncrease = 50000; // BDT fixed costs per day

    const costImpact = delayDays * dailyCostIncrease;
    const revenueImpact = delayDays * dailyRevenueLoss;
    const newCompletionDate = addDays(timeline.expectedCompletionDate, delayDays);

    const cascadeEffects: string[] = [];
    if (delayDays > 7) {
      cascadeEffects.push('Miss early bird export incentive window');
    }
    if (delayDays > 14) {
      cascadeEffects.push('Work permit applications delayed for incoming foreign staff');
    }
    if (delayDays > 30) {
      cascadeEffects.push('Lease payments start before revenue generation');
      cascadeEffects.push('Risk losing pre-booked machinery installation slot');
    }

    return {
      costImpact,
      revenueImpact: Math.round(revenueImpact),
      newCompletionDate,
      cascadeEffects
    };
  }

  // ========================================================================
  // AI CONTEXT FOR ADVISOR
  // ========================================================================

  getAIContext(): string {
    const timeline = this.predictTimeline();
    const risk = this.assessRisk();
    const tax = this.calculateTaxExposure();
    const workPermit = this.getWorkPermitStatus();

    return `
Investor Context:
- Name: ${this.profile.name}
- Country: ${this.profile.country}
- Sector: ${this.profile.sector}
- Investment: $${this.profile.investmentAmount.toLocaleString()}
- Zone: ${this.profile.selectedZone}
- Current Step: ${this.profile.currentStep}
- Expected Completion: ${format(timeline.expectedCompletionDate, 'MMM dd, yyyy')}
- Days Remaining: ${timeline.daysRemaining}
- Risk Score: ${risk.overallScore}/100
- Critical Issues: ${risk.criticalIssues.join(', ') || 'None'}
- Next Tax Deadline: ${format(tax.nextDeadline, 'MMM dd, yyyy')}
- Foreign Staff: ${workPermit.currentForeignStaff}/${workPermit.foreignStaffQuota}
- First-time Investor: ${this.profile.isFirstTime ? 'Yes' : 'No'}

Use this context to provide highly personalized, actionable advice.
`.trim();
  }
}

// ============================================================================
// FACTORY FUNCTION
// ============================================================================

export function createIntelligenceEngine(profile: InvestorProfile): InvestorIntelligenceEngine {
  return new InvestorIntelligenceEngine(profile);
}

// ============================================================================
// MOCK PROFILE FOR DEMO
// ============================================================================

export const mockInvestorProfile: InvestorProfile = {
  id: 'INV-2026-001',
  name: 'John Chen',
  country: 'Singapore',
  sector: 'Textiles',
  investmentAmount: 2500000, // $2.5M USD
  selectedZone: 'Mirsarai Economic Zone',
  factorySize: 50000, // 50,000 sq meters
  employeesExpected: 350,
  startDate: new Date('2026-01-10'),
  currentStep: 'Fire Safety Certificate',
  isFirstTime: false,
  preferredLanguage: 'en'
};

/**
 * ============================================================================
 * NEW OPERATIONAL INTELLIGENCE FUNCTIONS (15-20)
 * Added to support post-approval lifecycle management
 * ============================================================================
 */

/**
 * 15. PREDICT CASH CRUNCH - 90-day cashflow warning
 * Analyzes burn rate, receivables, payables to predict cash shortage
 */
export function predictCashCrunch(profile: InvestorProfile): {
  risk: 'low' | 'medium' | 'high';
  daysUntilCrunch: number | null;
  shortfallAmount: number;
  recommendations: string[];
} {
  // Mock calculation based on investment size and operational months
  const monthlyBurn = profile.investmentAmount * 0.08; // 8% of investment per month
  const currentCash = profile.investmentAmount * 0.25; // Assume 25% cash remaining
  const monthlyRevenue = profile.investmentAmount * 0.04; // 4% revenue

  const netBurn = monthlyBurn - monthlyRevenue;
  const daysUntilCrunch = currentCash > 0 ? Math.floor((currentCash / netBurn) * 30) : 0;

  let risk: 'low' | 'medium' | 'high' = 'low';
  if (daysUntilCrunch < 30) risk = 'high';
  else if (daysUntilCrunch < 60) risk = 'medium';

  const recommendations = [];
  if (risk === 'high') {
    recommendations.push('Immediate action: Arrange bridge financing');
    recommendations.push('Accelerate receivables collection');
    recommendations.push('Defer non-critical capital expenditure');
  } else if (risk === 'medium') {
    recommendations.push('Monitor cashflow weekly');
    recommendations.push('Consider line of credit from bank');
  }

  return {
    risk,
    daysUntilCrunch: daysUntilCrunch > 0 ? daysUntilCrunch : null,
    shortfallAmount: netBurn * 3, // 3 months
    recommendations
  };
}

/**
 * 16. DETECT COMPLIANCE GAP - Real-time regulation change monitoring
 * Identifies gaps between current operations and new/changed regulations
 */
export function detectComplianceGap(profile: InvestorProfile): {
  gaps: Array<{
    regulation: string;
    agency: string;
    changeDate: Date;
    impact: 'high' | 'medium' | 'low';
    actionRequired: string;
    deadline: Date;
  }>;
  overallRisk: number; // 0-100
} {
  // Mock regulatory changes
  const gaps = [
    {
      regulation: 'Minimum Wage Increase - Textiles Sector',
      agency: 'Ministry of Labour',
      changeDate: new Date('2026-07-01'),
      impact: 'high' as const,
      actionRequired: 'Update payroll system to new minimum ৳14,500/month',
      deadline: new Date('2026-06-30')
    },
    {
      regulation: 'Environmental Audit Frequency Change',
      agency: 'Department of Environment',
      changeDate: new Date('2026-04-01'),
      impact: 'medium' as const,
      actionRequired: 'Schedule quarterly audits (changed from annual)',
      deadline: new Date('2026-03-31')
    }
  ];

  const overallRisk = gaps.reduce((acc, gap) => {
    return acc + (gap.impact === 'high' ? 30 : gap.impact === 'medium' ? 15 : 5);
  }, 0);

  return {
    gaps: profile.sector === 'Textiles' ? gaps : [],
    overallRisk: Math.min(overallRisk, 100)
  };
}

/**
 * 17. OPTIMIZE PRODUCTION SCHEDULE - Order vs capacity matching
 * Analyzes orders against production capacity to optimize scheduling
 */
export function optimizeProductionSchedule(profile: InvestorProfile): {
  currentUtilization: number; // percentage
  bottlenecks: string[];
  recommendations: Array<{
    action: string;
    impact: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  projectedEfficiency: number;
} {
  const baseUtilization = 87; // Mock current utilization

  const bottlenecks = [];
  const recommendations = [];

  if (baseUtilization > 95) {
    bottlenecks.push('Production Line 2 at maximum capacity');
    recommendations.push({
      action: 'Add second shift on Line 2',
      impact: '+15% capacity increase',
      priority: 'high' as const
    });
  }

  if (profile.sector === 'Textiles') {
    recommendations.push({
      action: 'Implement preventive maintenance schedule',
      impact: 'Reduce downtime by 20%',
      priority: 'medium' as const
    });
  }

  return {
    currentUtilization: baseUtilization,
    bottlenecks,
    recommendations,
    projectedEfficiency: baseUtilization + 5 // 5% improvement potential
  };
}

/**
 * 18. CALCULATE EMPLOYEE TURNOVER - HR risk assessment
 * Tracks and predicts employee attrition patterns
 */
export function calculateEmployeeTurnover(profile: InvestorProfile): {
  monthlyTurnoverRate: number;
  annualizedRate: number;
  riskLevel: 'low' | 'medium' | 'high';
  topReasons: string[];
  benchmarkComparison: {
    yourRate: number;
    industryAverage: number;
    percentile: number;
  };
} {
  // Mock turnover calculation
  const monthlyRate = 2.3; // 2.3% per month
  const annualizedRate = monthlyRate * 12; // 27.6% annual

  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  if (annualizedRate > 30) riskLevel = 'high';
  else if (annualizedRate > 20) riskLevel = 'medium';

  return {
    monthlyTurnoverRate: monthlyRate,
    annualizedRate,
    riskLevel,
    topReasons: [
      'Better opportunities elsewhere (45%)',
      'Salary expectations (30%)',
      'Work-life balance (15%)',
      'Career growth (10%)'
    ],
    benchmarkComparison: {
      yourRate: annualizedRate,
      industryAverage: profile.sector === 'Textiles' ? 32 : 25,
      percentile: 35 // Better than 35% of companies
    }
  };
}

/**
 * 19. PREDICT CUSTOMS DELAY - Import timeline forecasting
 * Uses historical data to predict customs clearance delays
 */
export function predictCustomsDelay(shipment: {
  port: string;
  valueUSD: number;
  category: string;
}): {
  expectedDays: number;
  delayRisk: 'low' | 'medium' | 'high';
  factors: Array<{
    factor: string;
    impact: string;
  }>;
  recommendations: string[];
} {
  let baseDays = 5; // Normal clearance time
  let delayRisk: 'low' | 'medium' | 'high' = 'low';

  const factors = [];

  // Port congestion
  if (shipment.port === 'Chittagong') {
    baseDays += 2;
    factors.push({
      factor: 'Port Congestion',
      impact: '+2 days (high traffic period)'
    });
  }

  // High value items get extra scrutiny
  if (shipment.valueUSD > 100000) {
    baseDays += 1;
    delayRisk = 'medium';
    factors.push({
      factor: 'High Value Shipment',
      impact: '+1 day (additional verification)'
    });
  }

  const recommendations = [];
  if (delayRisk !== 'low') {
    recommendations.push('Pre-clear documents with customs agent');
    recommendations.push('Ensure all invoices match shipping documents');
  }

  return {
    expectedDays: baseDays,
    delayRisk,
    factors,
    recommendations
  };
}

/**
 * 20. ANALYZE PROFIT MARGIN - Product-level profitability
 * Breaks down profitability by product line
 */
export function analyzeProfitMargin(profile: InvestorProfile): {
  overall: {
    revenue: number;
    cogs: number;
    grossMargin: number;
    netMargin: number;
  };
  byProduct: Array<{
    product: string;
    revenue: number;
    margin: number;
    recommendation: string;
  }>;
  trends: {
    direction: 'improving' | 'stable' | 'declining';
    changePercentage: number;
  };
} {
  const monthlyRevenue = profile.investmentAmount * 0.15; // 15% of investment
  const cogs = monthlyRevenue * 0.55; // 55% COGS
  const grossMargin = ((monthlyRevenue - cogs) / monthlyRevenue) * 100;
  const netMargin = grossMargin - 15; // After operating expenses

  const products = [
    {
      product: 'Cotton T-Shirts',
      revenue: monthlyRevenue * 0.4,
      margin: 48,
      recommendation: 'High margin - increase production'
    },
    {
      product: 'Polyester Shirts',
      revenue: monthlyRevenue * 0.35,
      margin: 42,
      recommendation: 'Stable - maintain current levels'
    },
    {
      product: 'Denim Jeans',
      revenue: monthlyRevenue * 0.25,
      margin: 38,
      recommendation: 'Low margin - renegotiate raw material costs'
    }
  ];

  return {
    overall: {
      revenue: monthlyRevenue,
      cogs,
      grossMargin,
      netMargin
    },
    byProduct: profile.sector === 'Textiles' ? products : [],
    trends: {
      direction: 'stable' as const,
      changePercentage: 2.3
    }
  };
}