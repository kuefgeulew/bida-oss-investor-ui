// Policy Engine - Predictive policy alerts and incentive detection
// READ-ONLY engine that monitors sector/HS code for policy changes
// Uses: agencyRegistry tags, workflow services, incentiveEngine

import { getIncentivesForSector } from '@/app/engines/incentiveEngine';

export interface PolicyAlert {
  id: string;
  type: 'incentive' | 'regulation' | 'tariff' | 'procedure' | 'opportunity';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  affectedSectors: string[];
  affectedLocations?: string[]; // NEW: Location-based filtering
  companySizeFilter?: 'SME' | 'Medium' | 'Large' | 'All'; // NEW: Company size filtering
  hsCodeRanges?: string[];
  effectiveDate: string;
  expiryDate?: string;
  actionRequired: boolean;
  actionDeadline?: string;
  actionSteps?: string[]; // NEW: Detailed action recommendations
  impact: 'positive' | 'neutral' | 'negative';
  source: string;
  detailsUrl?: string;
  relatedFormId?: string; // NEW: Action integration with OSS forms
  commentPeriodOpen?: boolean; // NEW: Comment period integration
  commentDeadline?: string; // NEW: Comment period deadline
  legislativeStatus?: 'parliament' | 'draft' | 'enacted'; // NEW: Legislative tracker
}

// NEW: Investor Profile for personalized filtering
export interface InvestorProfile {
  bbid: string;
  companyName: string;
  sector: string;
  location: string; // e.g., "Dhaka", "Chattogram"
  companySize: 'SME' | 'Medium' | 'Large';
  annualRevenue: number; // in BDT
  hsCodes?: string[]; // Import/export HS codes
  exportOriented: boolean;
}

// NEW: Personalized Impact Calculation
export interface PersonalizedImpact {
  impactSummary: string; // "Your tax will increase from 10% to 12%"
  financialImpact: number; // in BDT (positive = savings, negative = cost)
  timelineImpact: string; // "Effective July 1, 2026"
  actionRecommendation: string; // "Update pricing model by June 30"
  relevanceScore: number; // 0-100 (how relevant to this investor)
}

// Policy Alert Database
const policyAlertsDB: PolicyAlert[] = [
  {
    id: 'alert-001',
    type: 'incentive',
    priority: 'high',
    title: 'New Export Bonus for Textile Sector',
    description: 'Government announces 5% cash incentive on all textile exports to EU markets. Valid for shipments made between January 2026 - December 2026.',
    affectedSectors: ['Textile & Garments', 'Apparel', 'Textile Manufacturing'],
    companySizeFilter: 'All',
    effectiveDate: '2026-01-01',
    expiryDate: '2026-12-31',
    actionRequired: true,
    actionDeadline: '2026-03-01',
    actionSteps: [
      'Register for export bonus scheme at Bangladesh Bank',
      'Ensure all export documentation is up to date',
      'Submit claim within 30 days of shipment',
      'Maintain separate accounting for export sales'
    ],
    impact: 'positive',
    source: 'Ministry of Commerce',
    detailsUrl: 'https://mincom.gov.bd/export-bonus-2026',
    relatedFormId: 'export-bonus-registration',
  },
  
  {
    id: 'alert-002',
    type: 'regulation',
    priority: 'critical',
    title: 'Updated Environmental Compliance Standards',
    description: 'New effluent treatment standards come into effect. All manufacturing units must install certified ETPs by June 2026.',
    affectedSectors: ['Manufacturing', 'Textile & Garments', 'Pharmaceuticals', 'Heavy Manufacturing'],
    affectedLocations: ['Dhaka', 'Chattogram', 'Gazipur', 'Narayanganj'],
    companySizeFilter: 'All',
    effectiveDate: '2026-06-01',
    actionRequired: true,
    actionDeadline: '2026-06-01',
    actionSteps: [
      'Conduct environmental audit of current facilities',
      'Engage certified ETP installation contractor',
      'Submit ETP installation plan to Department of Environment',
      'Complete installation and obtain DoE certification'
    ],
    impact: 'neutral',
    source: 'Department of Environment',
    detailsUrl: 'https://doe.gov.bd/etp-standards-2026',
    relatedFormId: 'environmental-clearance',
  },
  
  {
    id: 'alert-003',
    type: 'tariff',
    priority: 'high',
    title: 'Reduced Import Duty on Machinery',
    description: 'Import duty reduced from 10% to 5% for capital machinery used in export-oriented industries. Applies to HS codes 8401-8487.',
    affectedSectors: ['All Industries'],
    hsCodeRanges: ['8401-8487'],
    companySizeFilter: 'All',
    effectiveDate: '2026-02-15',
    expiryDate: '2027-02-14',
    actionRequired: false,
    impact: 'positive',
    source: 'National Board of Revenue',
    detailsUrl: 'https://nbr.gov.bd/sro-machinery-2026',
  },
  
  {
    id: 'alert-004',
    type: 'opportunity',
    priority: 'medium',
    title: 'Bangladesh-India Trade Agreement Expansion',
    description: 'New trade corridor opens for pharmaceutical exports. Simplified customs procedures at Benapole land port.',
    affectedSectors: ['Pharmaceuticals', 'Healthcare'],
    affectedLocations: ['Jessore', 'Khulna'],
    effectiveDate: '2026-03-01',
    actionRequired: false,
    impact: 'positive',
    source: 'Ministry of Foreign Affairs',
  },
  
  {
    id: 'alert-005',
    type: 'procedure',
    priority: 'high',
    title: 'Digital Signature Mandatory for All Applications',
    description: 'From March 2026, all investment applications must include digital signatures. Paper submissions will not be accepted.',
    affectedSectors: ['All Industries'],
    companySizeFilter: 'All',
    effectiveDate: '2026-03-01',
    actionRequired: true,
    actionDeadline: '2026-02-28',
    actionSteps: [
      'Obtain digital signature certificate from authorized provider',
      'Install digital signature software on company computers',
      'Update internal document signing procedures',
      'Train staff on digital signature usage'
    ],
    impact: 'neutral',
    source: 'BIDA',
    detailsUrl: 'https://bida.gov.bd/digital-signature',
    relatedFormId: 'digital-signature-registration',
  },
  
  {
    id: 'alert-006',
    type: 'incentive',
    priority: 'medium',
    title: 'R&D Tax Credit Increased to 200%',
    description: 'Companies investing in R&D can now claim 200% tax deduction (up from 150%) on qualifying expenditure.',
    affectedSectors: ['Technology & IT', 'Pharmaceuticals', 'Manufacturing'],
    companySizeFilter: 'Medium',
    effectiveDate: '2026-07-01',
    actionRequired: false,
    impact: 'positive',
    source: 'National Board of Revenue',
  },
  
  {
    id: 'alert-008',
    type: 'regulation',
    priority: 'critical',
    title: 'New Fire Safety Standards for Dhaka Factories',
    description: 'All factories in Dhaka division must comply with updated fire safety standards by May 2026.',
    affectedSectors: ['Manufacturing', 'Textile & Garments'],
    affectedLocations: ['Dhaka', 'Gazipur', 'Narayanganj', 'Munshiganj'],
    effectiveDate: '2026-05-01',
    actionRequired: true,
    actionDeadline: '2026-05-01',
    actionSteps: [
      'Schedule fire safety audit',
      'Install required fire suppression systems',
      'Conduct employee fire drill training',
      'Obtain Fire Safety Certificate from FSCD'
    ],
    impact: 'neutral',
    source: 'Fire Service & Civil Defence',
    relatedFormId: 'fire-safety-certificate',
  },
  
  {
    id: 'alert-009',
    type: 'procedure',
    priority: 'medium',
    title: 'Proposed Tax Reform Bill Under Parliamentary Review',
    description: 'Corporate tax rate may be reduced to 20% for manufacturing sector. Bill currently in parliament committee stage.',
    affectedSectors: ['Manufacturing', 'Textile & Garments', 'Pharmaceuticals'],
    companySizeFilter: 'All',
    effectiveDate: '2026-07-01',
    actionRequired: false,
    impact: 'positive',
    source: 'Ministry of Finance',
    legislativeStatus: 'parliament',
    commentPeriodOpen: true,
    commentDeadline: '2026-03-15',
  },
  
  {
    id: 'alert-010',
    type: 'tariff',
    priority: 'high',
    title: 'Draft Customs Duty Revision - Public Comment Period',
    description: 'Proposed increase in customs duty on finished goods imports (15% to 25%). Draft regulation open for public feedback.',
    affectedSectors: ['Retail', 'Import/Export', 'Trading'],
    effectiveDate: '2026-08-01',
    actionRequired: false,
    impact: 'negative',
    source: 'Bangladesh Customs',
    legislativeStatus: 'draft',
    commentPeriodOpen: true,
    commentDeadline: '2026-03-31',
  },
];

// Incentive matching logic
const incentiveRulesDB = [
  {
    id: 'inc-rule-001',
    name: '10-Year Tax Holiday',
    sectors: ['Textile & Garments', 'Manufacturing', 'Technology & IT'],
    requirements: [
      'BBID registered',
      'Investment > $1M',
      'Located in designated SEZ',
      'Export-oriented (>70% of production)',
    ],
    value: '0% corporate tax for 10 years',
    estimatedSavingsMultiplier: 0.225, // 22.5% of revenue
    complexity: 'medium' as const,
    processingTime: '4-6 weeks',
  },
  
  {
    id: 'inc-rule-002',
    name: 'Export Bonus Scheme',
    sectors: ['Textile & Garments', 'Leather', 'Handicrafts'],
    requirements: [
      'Export license obtained',
      'Bank account registered',
      'Export to eligible destinations',
    ],
    value: '5% cash back on exports',
    estimatedSavingsMultiplier: 0.05,
    complexity: 'easy' as const,
    processingTime: '2-3 weeks',
  },
  
  {
    id: 'inc-rule-003',
    name: 'R&D Double Deduction',
    sectors: ['Technology & IT', 'Pharmaceuticals', 'Electronics'],
    requirements: [
      'Dedicated R&D facility',
      'Qualified R&D personnel',
      'Annual R&D expenditure documented',
    ],
    value: '200% tax deduction on R&D expenses',
    estimatedSavingsMultiplier: 0.45, // 200% * 22.5% tax rate
    complexity: 'complex' as const,
    processingTime: '6-8 weeks',
  },
  
  {
    id: 'inc-rule-004',
    name: 'Machinery Import Duty Exemption',
    sectors: ['All Industries'],
    requirements: [
      'Export-oriented industry',
      'Machinery for direct production use',
      'Letter of credit opened',
    ],
    value: '0% import duty on capital machinery',
    estimatedSavingsMultiplier: 0.10, // Typical 10% duty saved
    complexity: 'easy' as const,
    processingTime: '1-2 weeks',
  },
];

// PUBLIC API

export function getPolicyAlerts(sector: string, includeAll: boolean = false): PolicyAlert[] {
  return policyAlertsDB.filter(alert => {
    if (includeAll || alert.affectedSectors.includes('All Industries')) return true;
    return alert.affectedSectors.some(s => 
      s.toLowerCase().includes(sector.toLowerCase()) || 
      sector.toLowerCase().includes(s.toLowerCase())
    );
  }).sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

export function getCriticalAlerts(sector: string): PolicyAlert[] {
  return getPolicyAlerts(sector).filter(alert => 
    alert.priority === 'critical' && alert.actionRequired
  );
}

export function getUpcomingDeadlines(sector: string, daysAhead: number = 90): PolicyAlert[] {
  const today = new Date();
  const futureDate = new Date(today.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  
  return getPolicyAlerts(sector).filter(alert => {
    if (!alert.actionDeadline) return false;
    const deadline = new Date(alert.actionDeadline);
    return deadline >= today && deadline <= futureDate;
  });
}

export function autoDetectEligibleIncentives(
  bbid: string,
  sector: string,
  investmentSize: number,
  exportOriented: boolean,
  location?: string
): EligibleIncentive[] {
  const eligible: EligibleIncentive[] = [];
  
  for (const rule of incentiveRulesDB) {
    // Check sector match
    if (!rule.sectors.includes('All Industries')) {
      const sectorMatch = rule.sectors.some(s => 
        s.toLowerCase().includes(sector.toLowerCase()) || 
        sector.toLowerCase().includes(s.toLowerCase())
      );
      if (!sectorMatch) continue;
    }
    
    // Calculate eligibility
    const met: string[] = [];
    const missing: string[] = [];
    let score = 0;
    
    rule.requirements.forEach(req => {
      const reqLower = req.toLowerCase();
      
      // BBID check
      if (reqLower.includes('bbid') && bbid) {
        met.push(req);
        score += 100 / rule.requirements.length;
      }
      // Investment size check
      else if (reqLower.includes('investment') && reqLower.includes('$1m')) {
        if (investmentSize >= 1000000) {
          met.push(req);
          score += 100 / rule.requirements.length;
        } else {
          missing.push(req);
        }
      }
      // Export-oriented check
      else if (reqLower.includes('export-oriented') || reqLower.includes('70%')) {
        if (exportOriented) {
          met.push(req);
          score += 100 / rule.requirements.length;
        } else {
          missing.push(req);
        }
      }
      // Location check (SEZ)
      else if (reqLower.includes('sez') || reqLower.includes('designated')) {
        if (location && location.toLowerCase().includes('epz')) {
          met.push(req);
          score += 100 / rule.requirements.length;
        } else {
          missing.push(req);
        }
      }
      // Default assumption for other requirements
      else {
        // Give partial credit for unverifiable requirements
        met.push(req);
        score += 70 / rule.requirements.length; // 70% credit
      }
    });
    
    // Only include if at least 50% eligible
    if (score >= 50) {
      eligible.push({
        incentiveId: rule.id,
        name: rule.name,
        value: rule.value,
        eligibilityScore: Math.round(score),
        requirements: rule.requirements,
        missingRequirements: missing,
        estimatedSavings: investmentSize * rule.estimatedSavingsMultiplier,
        applicationComplexity: rule.complexity,
        processingTime: rule.processingTime,
      });
    }
  }
  
  return eligible.sort((a, b) => b.eligibilityScore - a.eligibilityScore);
}

export function monitorPolicyChanges(sector: string, hsCode?: string): {
  recentChanges: PolicyAlert[];
  upcomingChanges: PolicyAlert[];
  actionItems: PolicyAlert[];
} {
  const alerts = getPolicyAlerts(sector, true);
  const today = new Date();
  const oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  const oneMonthAhead = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  const recentChanges = alerts.filter(alert => {
    const effectiveDate = new Date(alert.effectiveDate);
    return effectiveDate >= oneMonthAgo && effectiveDate <= today;
  });
  
  const upcomingChanges = alerts.filter(alert => {
    const effectiveDate = new Date(alert.effectiveDate);
    return effectiveDate > today && effectiveDate <= oneMonthAhead;
  });
  
  const actionItems = alerts.filter(alert => alert.actionRequired);
  
  return {
    recentChanges,
    upcomingChanges,
    actionItems,
  };
}

export function searchPolicyAlerts(query: string): PolicyAlert[] {
  const queryLower = query.toLowerCase();
  return policyAlertsDB.filter(alert =>
    alert.title.toLowerCase().includes(queryLower) ||
    alert.description.toLowerCase().includes(queryLower) ||
    alert.affectedSectors.some(s => s.toLowerCase().includes(queryLower))
  );
}

export function getPolicyAlertById(id: string): PolicyAlert | undefined {
  return policyAlertsDB.find(alert => alert.id === id);
}

export function calculateIncentiveValue(
  incentives: EligibleIncentive[],
  annualRevenue: number,
  years: number = 10
): {
  totalSavings: number;
  yearlyBreakdown: Record<string, number>;
  topIncentives: Array<{ name: string; value: number }>;
} {
  let totalSavings = 0;
  const yearlyBreakdown: Record<string, number> = {};
  const incentiveValues: Record<string, number> = {};
  
  incentives.forEach(incentive => {
    const yearlySaving = incentive.estimatedSavings;
    const totalIncentiveSavings = yearlySaving * years;
    
    totalSavings += totalIncentiveSavings;
    incentiveValues[incentive.name] = totalIncentiveSavings;
    
    for (let year = 1; year <= years; year++) {
      const key = `Year ${year}`;
      yearlyBreakdown[key] = (yearlyBreakdown[key] || 0) + yearlySaving;
    }
  });
  
  const topIncentives = Object.entries(incentiveValues)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  
  return {
    totalSavings,
    yearlyBreakdown,
    topIncentives,
  };
}

// ============================================================================
// NEW ENHANCED FUNCTIONS FOR PREDICTIVE POLICY ENGINE
// ============================================================================

/**
 * Advanced Filtered Policy Alerts with Location & Company Size
 */
export function getFilteredPolicyAlerts(filters: {
  sector: string;
  location?: string;
  companySize?: 'SME' | 'Medium' | 'Large';
  hsCodes?: string[];
  includeAll?: boolean;
}): PolicyAlert[] {
  return policyAlertsDB.filter(alert => {
    // Sector filtering
    const sectorMatch = filters.includeAll || 
      alert.affectedSectors.includes('All Industries') ||
      alert.affectedSectors.some(s => 
        s.toLowerCase().includes(filters.sector.toLowerCase()) || 
        filters.sector.toLowerCase().includes(s.toLowerCase())
      );
    if (!sectorMatch) return false;

    // Location filtering (NEW)
    if (filters.location && alert.affectedLocations) {
      const locationMatch = alert.affectedLocations.some(loc =>
        loc.toLowerCase().includes(filters.location!.toLowerCase()) ||
        filters.location!.toLowerCase().includes(loc.toLowerCase())
      );
      if (!locationMatch) return false;
    }

    // Company size filtering (NEW)
    if (filters.companySize && alert.companySizeFilter) {
      if (alert.companySizeFilter !== 'All' && alert.companySizeFilter !== filters.companySize) {
        return false;
      }
    }

    // HS Code filtering
    if (filters.hsCodes && alert.hsCodeRanges) {
      const hsMatch = filters.hsCodes.some(code =>
        alert.hsCodeRanges!.some(range => code.startsWith(range) || range.startsWith(code))
      );
      if (!hsMatch) return false;
    }

    return true;
  }).sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Get Alerts with Open Comment Periods
 */
export function getCommentPeriodAlerts(): PolicyAlert[] {
  const today = new Date();
  return policyAlertsDB.filter(alert => {
    if (!alert.commentPeriodOpen || !alert.commentDeadline) return false;
    const deadline = new Date(alert.commentDeadline);
    return deadline >= today;
  }).sort((a, b) => {
    const deadlineA = new Date(a.commentDeadline!).getTime();
    const deadlineB = new Date(b.commentDeadline!).getTime();
    return deadlineA - deadlineB;
  });
}

/**
 * Legislative Tracker - Bills & Draft Regulations
 */
export function getLegislativeTrackerAlerts(): PolicyAlert[] {
  return policyAlertsDB.filter(alert =>
    alert.legislativeStatus === 'parliament' || alert.legislativeStatus === 'draft'
  ).sort((a, b) => {
    const statusOrder = { parliament: 0, draft: 1 };
    const statusA = statusOrder[a.legislativeStatus as 'parliament' | 'draft'] ?? 2;
    const statusB = statusOrder[b.legislativeStatus as 'parliament' | 'draft'] ?? 2;
    return statusA - statusB;
  });
}

/**
 * Personalized Impact Calculator - "Your tax will increase by BDT X"
 */
export function calculatePersonalizedImpact(
  alert: PolicyAlert,
  profile: InvestorProfile
): PersonalizedImpact {
  let impactSummary = '';
  let financialImpact = 0;
  let actionRecommendation = '';
  let relevanceScore = 50; // Base relevance

  // Calculate relevance score
  const sectorMatch = alert.affectedSectors.some(s =>
    s.toLowerCase().includes(profile.sector.toLowerCase())
  );
  if (sectorMatch) relevanceScore += 30;

  const locationMatch = alert.affectedLocations?.some(loc =>
    loc.toLowerCase().includes(profile.location.toLowerCase())
  );
  if (locationMatch) relevanceScore += 15;

  const sizeMatch = alert.companySizeFilter === profile.companySize || alert.companySizeFilter === 'All';
  if (sizeMatch) relevanceScore += 5;

  // Calculate personalized financial impact based on alert type
  if (alert.type === 'incentive' && alert.impact === 'positive') {
    if (alert.title.includes('Export Bonus') && profile.exportOriented) {
      financialImpact = profile.annualRevenue * 0.05; // 5% export bonus
      impactSummary = `You could earn up to BDT ${financialImpact.toLocaleString()} in export incentives based on your current revenue.`;
      actionRecommendation = 'Register for export bonus scheme before deadline to maximize savings';
    } else if (alert.title.includes('R&D Tax Credit')) {
      const estimatedRnD = profile.annualRevenue * 0.03; // Assume 3% of revenue on R&D
      financialImpact = estimatedRnD * 2 * 0.225; // 200% deduction at 22.5% tax rate
      impactSummary = `Estimated annual tax savings of BDT ${financialImpact.toLocaleString()} if you invest 3% of revenue in R&D.`;
      actionRecommendation = 'Set up dedicated R&D facility and document all R&D expenditure';
    } else if (alert.title.includes('Tax Holiday')) {
      financialImpact = profile.annualRevenue * 0.225; // Save 22.5% corporate tax
      impactSummary = `Save BDT ${financialImpact.toLocaleString()} annually in corporate taxes.`;
      actionRecommendation = 'Ensure you meet all eligibility criteria for tax holiday';
    }
  } else if (alert.type === 'regulation' && alert.impact === 'neutral') {
    if (alert.title.includes('Environmental') || alert.title.includes('ETP')) {
      financialImpact = -5000000; // Estimated BDT 50 lakh for ETP installation
      impactSummary = `Estimated one-time cost of BDT 50-70 lakh for ETP installation and certification.`;
      actionRecommendation = 'Budget for ETP installation and engage contractor at least 3 months before deadline';
    } else if (alert.title.includes('Fire Safety')) {
      financialImpact = -2000000; // Estimated BDT 20 lakh for fire safety
      impactSummary = `Estimated cost of BDT 20-30 lakh for fire safety system upgrades and certification.`;
      actionRecommendation = 'Schedule fire safety audit immediately and plan installation timeline';
    } else if (alert.title.includes('Digital Signature')) {
      financialImpact = -50000; // Estimated BDT 50k
      impactSummary = `One-time setup cost of approximately BDT 50,000 for digital signature infrastructure.`;
      actionRecommendation = 'Obtain digital signature certificate and train staff on usage';
    }
  } else if (alert.type === 'regulation' && alert.title.includes('VAT Threshold')) {
    if (profile.companySize === 'SME' && profile.annualRevenue < 5000000) {
      financialImpact = profile.annualRevenue * 0.15 * 0.15; // Save 15% VAT on 15% of expenses
      impactSummary = `You may be exempt from VAT registration, saving approximately BDT ${financialImpact.toLocaleString()} in VAT compliance costs.`;
      actionRecommendation = 'Review your turnover and consider deregistering from VAT if below threshold';
    }
  } else if (alert.type === 'tariff') {
    if (alert.title.includes('Reduced Import Duty')) {
      const estimatedMachineryImport = profile.annualRevenue * 0.10; // 10% of revenue
      financialImpact = estimatedMachineryImport * 0.05; // 5% duty reduction
      impactSummary = `Save BDT ${financialImpact.toLocaleString()} on machinery imports (5% duty reduction).`;
      actionRecommendation = 'Plan capital machinery purchases to take advantage of reduced duty rate';
    } else if (alert.impact === 'negative' && alert.title.includes('Customs Duty')) {
      const estimatedImports = profile.annualRevenue * 0.20; // 20% of revenue
      financialImpact = -(estimatedImports * 0.10); // 10% duty increase (from 15% to 25%)
      impactSummary = `Your import costs will increase by approximately BDT ${Math.abs(financialImpact).toLocaleString()} annually due to higher customs duty.`;
      actionRecommendation = 'Consider local sourcing alternatives or submit feedback during comment period';
    }
  }

  // Default fallback
  if (!impactSummary) {
    impactSummary = `This ${alert.type} may affect your business operations. Review the details to assess specific impact.`;
    actionRecommendation = alert.actionRequired ? 
      'Complete required actions before deadline to remain compliant' :
      'Monitor this change and assess potential impacts on your business';
  }

  const effectiveDate = new Date(alert.effectiveDate);
  const timelineImpact = `Effective ${effectiveDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })}`;

  return {
    impactSummary,
    financialImpact,
    timelineImpact,
    actionRecommendation,
    relevanceScore: Math.min(100, relevanceScore)
  };
}

/**
 * Simulate Email Digest Delivery
 */
export async function sendEmailDigest(
  recipientEmail: string,
  alerts: PolicyAlert[],
  frequency: 'daily' | 'weekly'
): Promise<{ success: boolean; message: string }> {
  // Simulate email sending
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log(`📧 EMAIL DIGEST SENT`);
  console.log(`To: ${recipientEmail}`);
  console.log(`Frequency: ${frequency}`);
  console.log(`Alerts included: ${alerts.length}`);
  console.log(`Subject: ${frequency === 'daily' ? 'Daily' : 'Weekly'} Policy Alert Digest`);
  
  return {
    success: true,
    message: `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} digest sent to ${recipientEmail}`
  };
}

/**
 * Simulate SMS Alert Delivery
 */
export async function sendSMSAlert(
  phoneNumber: string,
  alert: PolicyAlert
): Promise<{ success: boolean; message: string }> {
  // Simulate SMS sending
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  console.log(`📱 SMS ALERT SENT`);
  console.log(`To: ${phoneNumber}`);
  console.log(`Message: URGENT: ${alert.title.substring(0, 100)}...`);
  console.log(`Priority: ${alert.priority}`);
  
  return {
    success: true,
    message: `SMS sent to ${phoneNumber}`
  };
}

/**
 * Simulate WhatsApp Notification
 */
export async function sendWhatsAppNotification(
  phoneNumber: string,
  alert: PolicyAlert
): Promise<{ success: boolean; message: string }> {
  // Simulate WhatsApp Business API
  await new Promise(resolve => setTimeout(resolve, 1300));
  
  console.log(`💬 WHATSAPP MESSAGE SENT`);
  console.log(`To: ${phoneNumber}`);
  console.log(`Message: ${alert.title}`);
  console.log(`Action Required: ${alert.actionRequired}`);
  
  return {
    success: true,
    message: `WhatsApp message sent to ${phoneNumber}`
  };
}