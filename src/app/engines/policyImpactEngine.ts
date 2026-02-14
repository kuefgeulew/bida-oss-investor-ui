/**
 * 📜 POLICY IMPACT ENGINE — HS/Sector-Aware Alerts
 * 
 * Features:
 * - Maps HS codes + sector → policy updates
 * - Proactive alerts for regulatory changes
 * - "New VAT rule affects your imports"
 * 
 * Mounted in: Compliance tab (ComplianceAlerts component)
 */

export interface PolicyUpdate {
  id: string;
  title: string;
  description: string;
  effectiveDate: Date;
  impactLevel: 'critical' | 'high' | 'medium' | 'low';
  affectedSectors: string[];
  affectedHSCodes: string[];
  type: 'tax' | 'customs' | 'environmental' | 'labor' | 'trade' | 'regulatory';
  actionRequired: boolean;
  actionDeadline?: Date;
  sourceAuthority: string;
  documentUrl?: string;
}

export interface PolicyAlert {
  policyId: string;
  title: string;
  summary: string;
  impactLevel: 'critical' | 'high' | 'medium' | 'low';
  relevanceScore: number; // 0-100
  actionRequired: boolean;
  actionDeadline?: Date;
  affectsYou: string; // Personalized explanation
  recommendedAction: string;
  timestamp: Date;
}

// Policy database (in production, this would be from government API)
const POLICY_UPDATES: PolicyUpdate[] = [
  {
    id: 'policy-2025-vat-001',
    title: 'VAT Exemption for Electronic Components Import',
    description: 'New VAT exemption introduced for imported electronic components used in export-oriented manufacturing. Applies to HS codes 8541-8542 (semiconductors and ICs).',
    effectiveDate: new Date('2025-03-01'),
    impactLevel: 'high',
    affectedSectors: ['Manufacturing - Electronics', 'Manufacturing - IT Hardware'],
    affectedHSCodes: ['8541', '8542', '8543'],
    type: 'tax',
    actionRequired: true,
    actionDeadline: new Date('2025-04-30'),
    sourceAuthority: 'National Board of Revenue (NBR)',
    documentUrl: 'https://nbr.gov.bd/vat-exemption-2025'
  },
  {
    id: 'policy-2025-env-002',
    title: 'Updated Emission Standards for Industrial Facilities',
    description: 'New emission limits for manufacturing facilities. All factories must comply with revised particulate matter and CO2 standards by June 2025.',
    effectiveDate: new Date('2025-06-01'),
    impactLevel: 'critical',
    affectedSectors: ['Manufacturing - Textiles', 'Manufacturing - Chemicals', 'Manufacturing - Cement'],
    affectedHSCodes: [],
    type: 'environmental',
    actionRequired: true,
    actionDeadline: new Date('2025-05-31'),
    sourceAuthority: 'Department of Environment',
    documentUrl: 'https://doe.gov.bd/emission-standards-2025'
  },
  {
    id: 'policy-2025-customs-003',
    title: 'Reduced Customs Duty for Renewable Energy Equipment',
    description: 'Customs duty reduced from 10% to 2% for solar panels, wind turbines, and battery storage systems to promote green energy.',
    effectiveDate: new Date('2025-02-15'),
    impactLevel: 'medium',
    affectedSectors: ['Renewable Energy', 'Manufacturing - Solar'],
    affectedHSCodes: ['8541.40', '8502.31', '8507.60'],
    type: 'customs',
    actionRequired: false,
    sourceAuthority: 'Bangladesh Customs',
    documentUrl: 'https://customs.gov.bd/green-energy-duty-2025'
  },
  {
    id: 'policy-2025-labor-004',
    title: 'Minimum Wage Increase for Manufacturing Sector',
    description: 'Minimum wage for manufacturing workers increased to BDT 15,000 per month, effective April 2025.',
    effectiveDate: new Date('2025-04-01'),
    impactLevel: 'high',
    affectedSectors: ['Manufacturing - Textiles', 'Manufacturing - Electronics', 'Manufacturing - Pharmaceuticals'],
    affectedHSCodes: [],
    type: 'labor',
    actionRequired: true,
    actionDeadline: new Date('2025-03-31'),
    sourceAuthority: 'Ministry of Labour and Employment'
  },
  {
    id: 'policy-2025-trade-005',
    title: 'Export Incentive for IT Services Extended',
    description: '10% cash incentive for IT and software export earnings extended until December 2027. Online application portal now available.',
    effectiveDate: new Date('2025-01-01'),
    impactLevel: 'medium',
    affectedSectors: ['IT Services', 'Software Development', 'BPO'],
    affectedHSCodes: [],
    type: 'trade',
    actionRequired: false,
    sourceAuthority: 'Ministry of Commerce'
  },
  {
    id: 'policy-2025-reg-006',
    title: 'Mandatory Fire Safety Audit for All Factories',
    description: 'Annual fire safety audit now mandatory for all manufacturing facilities. First audit must be completed by July 2025.',
    effectiveDate: new Date('2025-07-01'),
    impactLevel: 'critical',
    affectedSectors: ['Manufacturing - Textiles', 'Manufacturing - Electronics', 'Manufacturing - Chemicals', 'Manufacturing - Food Processing'],
    affectedHSCodes: [],
    type: 'regulatory',
    actionRequired: true,
    actionDeadline: new Date('2025-06-30'),
    sourceAuthority: 'Fire Service & Civil Defence'
  },
  {
    id: 'policy-2025-tax-007',
    title: 'Tax Holiday Extension for Hi-Tech Industries',
    description: 'Tax holiday period extended from 5 to 7 years for industries in Hi-Tech Parks and Economic Zones investing over $10 million.',
    effectiveDate: new Date('2025-05-01'),
    impactLevel: 'high',
    affectedSectors: ['Manufacturing - IT Hardware', 'Software Development', 'Pharmaceuticals - R&D'],
    affectedHSCodes: [],
    type: 'tax',
    actionRequired: false,
    sourceAuthority: 'Bangladesh Hi-Tech Park Authority'
  },
  {
    id: 'policy-2025-customs-008',
    title: 'Import Restrictions on Single-Use Plastics',
    description: 'Import of single-use plastic items banned. Biodegradable alternatives must be used. Existing stock clearance by March 2025.',
    effectiveDate: new Date('2025-03-01'),
    impactLevel: 'critical',
    affectedSectors: ['Manufacturing - Packaging', 'Retail', 'Food Processing'],
    affectedHSCodes: ['3923.21', '3923.29', '3924.10'],
    type: 'environmental',
    actionRequired: true,
    actionDeadline: new Date('2025-02-28'),
    sourceAuthority: 'Department of Environment'
  }
];

/**
 * Get policy impacts for specific investor profile
 */
export function getPolicyImpacts(
  sector: string,
  hsCodes: string[] = [],
  location?: string
): PolicyAlert[] {
  if (!sector && hsCodes.length === 0) {
    // If no sector or HS codes provided, return general policies
    return POLICY_UPDATES.filter(p => p.affectedSectors.includes('All Industries'));
  }
  
  const relevantPolicies = POLICY_UPDATES.filter(policy => {
    // Check sector match
    const sectorMatch = sector && policy.affectedSectors.some(s => 
      s.toLowerCase().includes(sector.toLowerCase()) || 
      sector.toLowerCase().includes(s.toLowerCase())
    );
    
    // Check HS code match
    const hsMatch = hsCodes.length === 0 || policy.affectedHSCodes.some(code =>
      hsCodes.some(userCode => userCode.startsWith(code) || code.startsWith(userCode))
    );
    
    return sectorMatch || (policy.affectedHSCodes.length > 0 && hsMatch);
  });
  
  // Convert to alerts with personalized context
  return relevantPolicies.map(policy => {
    const relevanceScore = calculateRelevanceScore(policy, sector, hsCodes);
    
    return {
      policyId: policy.id,
      title: policy.title,
      summary: policy.description,
      impactLevel: policy.impactLevel,
      relevanceScore,
      actionRequired: policy.actionRequired,
      actionDeadline: policy.actionDeadline,
      affectsYou: generatePersonalizedImpact(policy, sector, hsCodes),
      recommendedAction: generateRecommendedAction(policy, sector),
      timestamp: new Date()
    };
  }).sort((a, b) => {
    // Sort by impact level, then relevance
    const impactOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    if (impactOrder[a.impactLevel] !== impactOrder[b.impactLevel]) {
      return impactOrder[a.impactLevel] - impactOrder[b.impactLevel];
    }
    return b.relevanceScore - a.relevanceScore;
  });
}

/**
 * Calculate how relevant a policy is to the investor
 */
function calculateRelevanceScore(
  policy: PolicyUpdate,
  sector: string,
  hsCodes: string[]
): number {
  let score = 0;
  
  // Sector match (0-60 points)
  const exactSectorMatch = policy.affectedSectors.some(s => s.toLowerCase() === sector.toLowerCase());
  const partialSectorMatch = policy.affectedSectors.some(s => 
    s.toLowerCase().includes(sector.toLowerCase()) || 
    sector.toLowerCase().includes(s.toLowerCase())
  );
  
  if (exactSectorMatch) score += 60;
  else if (partialSectorMatch) score += 40;
  
  // HS code match (0-40 points)
  if (hsCodes.length > 0 && policy.affectedHSCodes.length > 0) {
    const hsMatches = policy.affectedHSCodes.filter(code =>
      hsCodes.some(userCode => userCode.startsWith(code) || code.startsWith(userCode))
    ).length;
    score += Math.min(40, hsMatches * 20);
  }
  
  // Impact level bonus
  const impactBonus = {
    critical: 20,
    high: 15,
    medium: 10,
    low: 5
  };
  score += impactBonus[policy.impactLevel] || 0;
  
  // Action required urgency
  if (policy.actionRequired && policy.actionDeadline) {
    const daysUntilDeadline = Math.floor(
      (policy.actionDeadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntilDeadline < 30) score += 15;
    else if (daysUntilDeadline < 60) score += 10;
  }
  
  return Math.min(100, score);
}

/**
 * Generate personalized impact explanation
 */
function generatePersonalizedImpact(
  policy: PolicyUpdate,
  sector: string,
  hsCodes: string[]
): string {
  const impacts: string[] = [];
  
  // Sector-specific impact
  if (policy.affectedSectors.some(s => s.toLowerCase().includes(sector.toLowerCase()))) {
    impacts.push(`This directly affects your ${sector} operations`);
  }
  
  // HS code impact
  const matchingHSCodes = policy.affectedHSCodes.filter(code =>
    hsCodes.some(userCode => userCode.startsWith(code))
  );
  if (matchingHSCodes.length > 0) {
    impacts.push(`Impacts your imports under HS codes: ${matchingHSCodes.join(', ')}`);
  }
  
  // Type-specific impact
  switch (policy.type) {
    case 'tax':
      impacts.push('Will affect your tax obligations and potential savings');
      break;
    case 'customs':
      impacts.push('Changes your import/export costs and procedures');
      break;
    case 'environmental':
      impacts.push('Requires environmental compliance updates');
      break;
    case 'labor':
      impacts.push('Affects your labor costs and workforce management');
      break;
    case 'trade':
      impacts.push('Opens new trade opportunities or modifies existing ones');
      break;
    case 'regulatory':
      impacts.push('New compliance requirements for your operations');
      break;
  }
  
  return impacts.join('. ') + '.';
}

/**
 * Generate recommended action
 */
function generateRecommendedAction(policy: PolicyUpdate, sector: string): string {
  if (!policy.actionRequired) {
    return 'Review policy details and assess potential benefits for your operations.';
  }
  
  const actions: string[] = [];
  
  switch (policy.type) {
    case 'tax':
      actions.push('Consult with your tax advisor to understand implications');
      actions.push('Update tax planning and projections');
      break;
    case 'customs':
      actions.push('Review your import/export documentation');
      actions.push('Update customs bond if applicable');
      break;
    case 'environmental':
      actions.push('Schedule environmental compliance audit');
      actions.push('Engage certified environmental consultant');
      break;
    case 'labor':
      actions.push('Update payroll and employee contracts');
      actions.push('Budget for increased labor costs');
      break;
    case 'regulatory':
      actions.push('Review compliance requirements with legal team');
      actions.push('Prepare required documentation');
      break;
  }
  
  if (policy.actionDeadline) {
    const daysLeft = Math.floor(
      (policy.actionDeadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    actions.push(`Complete by ${policy.actionDeadline.toLocaleDateString()} (${daysLeft} days remaining)`);
  }
  
  return actions.join('. ') + '.';
}

/**
 * Get upcoming policy deadlines
 */
export function getUpcomingDeadlines(sector: string, days: number = 30): PolicyAlert[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() + days);
  
  const alerts = getPolicyImpacts(sector);
  
  return alerts.filter(alert => 
    alert.actionRequired && 
    alert.actionDeadline && 
    alert.actionDeadline <= cutoffDate
  ).sort((a, b) => {
    if (!a.actionDeadline || !b.actionDeadline) return 0;
    return a.actionDeadline.getTime() - b.actionDeadline.getTime();
  });
}

/**
 * Get policy updates by type
 */
export function getPoliciesByType(type: PolicyUpdate['type']): PolicyUpdate[] {
  return POLICY_UPDATES.filter(p => p.type === type)
    .sort((a, b) => b.effectiveDate.getTime() - a.effectiveDate.getTime());
}

/**
 * Get critical alerts
 */
export function getCriticalAlerts(sector: string, hsCodes: string[] = []): PolicyAlert[] {
  const alerts = getPolicyImpacts(sector, hsCodes);
  return alerts.filter(a => a.impactLevel === 'critical' && a.actionRequired);
}