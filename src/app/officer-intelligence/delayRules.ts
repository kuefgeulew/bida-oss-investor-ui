// Delay Root Cause Engine - Identifies why applications are delayed

export interface DelayRule {
  condition: string;
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  solution: string;
  responsibleParty: 'investor' | 'officer' | 'agency' | 'system';
}

export interface ApplicationDelay {
  delayDays: number;
  rootCauses: DelayRule[];
  primaryCause: DelayRule | null;
  actionRequired: string;
}

export const delayRules: DelayRule[] = [
  // Document-related delays
  {
    condition: 'missing_fire_layout',
    reason: 'Missing Fire Safety Layout Plan (required for factory setup)',
    severity: 'critical',
    solution: 'Request certified fire layout from investor immediately',
    responsibleParty: 'investor'
  },
  {
    condition: 'outdated_document_version',
    reason: 'Document version outdated - investor uploaded wrong version',
    severity: 'high',
    solution: 'Notify investor to upload latest version with specified format',
    responsibleParty: 'investor'
  },
  {
    condition: 'incomplete_ownership_docs',
    reason: 'Ultimate Beneficial Owner (UBO) documentation incomplete',
    severity: 'critical',
    solution: 'Request complete UBO chain with notarized certificates',
    responsibleParty: 'investor'
  },
  {
    condition: 'missing_environmental_clearance',
    reason: 'Environmental Clearance Certificate pending from DoE',
    severity: 'high',
    solution: 'Escalate to Department of Environment, follow up weekly',
    responsibleParty: 'agency'
  },
  
  // Agency-related delays
  {
    condition: 'rjsc_backlog',
    reason: 'RJSC company registration backlog (currently 15 days behind)',
    severity: 'high',
    solution: 'Escalate to RJSC focal point, mark as priority',
    responsibleParty: 'agency'
  },
  {
    condition: 'nbr_tax_verification_pending',
    reason: 'NBR Tax Identification Number (TIN) verification pending',
    severity: 'medium',
    solution: 'Follow up with NBR, provide investor TIN application proof',
    responsibleParty: 'agency'
  },
  {
    condition: 'bangladesh_bank_slow',
    reason: 'Bangladesh Bank foreign investment approval delayed',
    severity: 'high',
    solution: 'Escalate to Bangladesh Bank FDI division, provide urgency justification',
    responsibleParty: 'agency'
  },
  {
    condition: 'fire_service_inspection_pending',
    reason: 'Fire Service inspection not scheduled (requires 10 days notice)',
    severity: 'medium',
    solution: 'Book Fire Service inspection slot, coordinate with investor',
    responsibleParty: 'officer'
  },
  
  // Investor-related delays
  {
    condition: 'investor_unresponsive',
    reason: 'Investor not responding to officer queries (>7 days)',
    severity: 'high',
    solution: 'Send formal email reminder with escalation warning',
    responsibleParty: 'investor'
  },
  {
    condition: 'incorrect_sector_classification',
    reason: 'Investor classified wrong sector - requires reclassification',
    severity: 'medium',
    solution: 'Guide investor to correct sector category, restart checklist',
    responsibleParty: 'investor'
  },
  {
    condition: 'payment_not_received',
    reason: 'Government fee payment not received or not confirmed',
    severity: 'high',
    solution: 'Request payment proof, verify with finance department',
    responsibleParty: 'investor'
  },
  
  // Officer/System delays
  {
    condition: 'officer_workload_high',
    reason: 'Assigned officer at >90% workload capacity',
    severity: 'medium',
    solution: 'Reassign to available officer or request workload adjustment',
    responsibleParty: 'officer'
  },
  {
    condition: 'awaiting_legal_review',
    reason: 'Application requires legal department review (complex case)',
    severity: 'medium',
    solution: 'Expedite legal review request, provide case summary',
    responsibleParty: 'officer'
  },
  {
    condition: 'sla_breach_imminent',
    reason: 'SLA deadline approaching - requires immediate action',
    severity: 'critical',
    solution: 'Prioritize case, clear roadblocks, update investor daily',
    responsibleParty: 'officer'
  },
  
  // Sector-specific delays
  {
    condition: 'pharmaceutical_license_pending',
    reason: 'Drug Administration approval pending (Pharmaceutical sector)',
    severity: 'high',
    solution: 'Follow up with Directorate General of Drug Administration',
    responsibleParty: 'agency'
  },
  {
    condition: 'food_safety_clearance',
    reason: 'BSTI food safety certificate pending (Food processing sector)',
    severity: 'high',
    solution: 'Coordinate BSTI inspection, ensure factory meets standards',
    responsibleParty: 'agency'
  },
  
  // Zone-related delays
  {
    condition: 'beza_land_allocation_pending',
    reason: 'BEZA land allocation approval pending',
    severity: 'high',
    solution: 'Escalate to BEZA authority, request land availability update',
    responsibleParty: 'agency'
  },
  {
    condition: 'epz_utility_connection_delay',
    reason: 'EPZ utility connection (electricity/gas) delayed',
    severity: 'medium',
    solution: 'Coordinate with BEPZA utilities team, schedule connection',
    responsibleParty: 'agency'
  }
];

// Function to analyze application and detect delays
export function analyzeDelays(application: any): ApplicationDelay {
  const detectedCauses: DelayRule[] = [];
  const today = new Date();
  const submittedDate = new Date(application.submittedDate);
  const delayDays = Math.floor((today.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Check document completeness
  if (application.sector === 'Manufacturing' && !application.documents?.fireLayout) {
    detectedCauses.push(delayRules.find(r => r.condition === 'missing_fire_layout')!);
  }
  
  if (application.documents?.some((d: any) => d.status === 'outdated')) {
    detectedCauses.push(delayRules.find(r => r.condition === 'outdated_document_version')!);
  }
  
  if (!application.uboComplete) {
    detectedCauses.push(delayRules.find(r => r.condition === 'incomplete_ownership_docs')!);
  }
  
  // Check agency approvals
  if (application.approvals?.rjsc === 'pending' && delayDays > 15) {
    detectedCauses.push(delayRules.find(r => r.condition === 'rjsc_backlog')!);
  }
  
  if (application.approvals?.environment === 'pending') {
    detectedCauses.push(delayRules.find(r => r.condition === 'missing_environmental_clearance')!);
  }
  
  if (application.approvals?.bangladeshBank === 'pending' && delayDays > 20) {
    detectedCauses.push(delayRules.find(r => r.condition === 'bangladesh_bank_slow')!);
  }
  
  // Check investor responsiveness
  if (application.lastInvestorResponse && 
      (today.getTime() - new Date(application.lastInvestorResponse).getTime()) / (1000 * 60 * 60 * 24) > 7) {
    detectedCauses.push(delayRules.find(r => r.condition === 'investor_unresponsive')!);
  }
  
  // Check payment status
  if (!application.paymentReceived) {
    detectedCauses.push(delayRules.find(r => r.condition === 'payment_not_received')!);
  }
  
  // Check SLA
  const slaDeadline = new Date(application.slaDeadline);
  const daysUntilSLA = Math.floor((slaDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntilSLA < 3 && daysUntilSLA > 0) {
    detectedCauses.push(delayRules.find(r => r.condition === 'sla_breach_imminent')!);
  }
  
  // Sector-specific checks
  if (application.sector === 'Pharmaceutical' && application.approvals?.drugAdmin === 'pending') {
    detectedCauses.push(delayRules.find(r => r.condition === 'pharmaceutical_license_pending')!);
  }
  
  if (application.sector === 'Food Processing' && application.approvals?.bsti === 'pending') {
    detectedCauses.push(delayRules.find(r => r.condition === 'food_safety_clearance')!);
  }
  
  // Zone-specific checks
  if (application.zone === 'BEZA' && application.approvals?.landAllocation === 'pending') {
    detectedCauses.push(delayRules.find(r => r.condition === 'beza_land_allocation_pending')!);
  }
  
  // Determine primary cause (highest severity)
  const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
  const primaryCause = detectedCauses.sort((a, b) => 
    severityOrder[b.severity] - severityOrder[a.severity]
  )[0] || null;
  
  // Generate action required
  let actionRequired = 'No immediate action required';
  if (primaryCause) {
    actionRequired = primaryCause.solution;
  }
  
  return {
    delayDays,
    rootCauses: detectedCauses,
    primaryCause,
    actionRequired
  };
}

// Get delay summary text
export function getDelaySummary(delay: ApplicationDelay): string {
  if (!delay.primaryCause) {
    return `Application on track (${delay.delayDays} days in process)`;
  }
  
  return `⚠️ Delay: ${delay.primaryCause.reason}`;
}

// Get all delays by responsible party
export function groupDelaysByParty(delay: ApplicationDelay): Record<string, DelayRule[]> {
  return delay.rootCauses.reduce((acc, cause) => {
    if (!acc[cause.responsibleParty]) {
      acc[cause.responsibleParty] = [];
    }
    acc[cause.responsibleParty].push(cause);
    return acc;
  }, {} as Record<string, DelayRule[]>);
}
