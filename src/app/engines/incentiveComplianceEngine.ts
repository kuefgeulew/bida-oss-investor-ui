/**
 * 📋 INCENTIVE COMPLIANCE ENGINE
 * 
 * Powers: Real-time compliance monitoring, rule enforcement, auto-warnings
 * Monitors: Export ratios, investment thresholds, workforce requirements, etc.
 */

export interface ComplianceRule {
  id: string;
  incentiveName: string;
  ruleType: 'threshold' | 'ratio' | 'certification' | 'reporting' | 'continuous';
  description: string;
  requirement: string;
  currentValue: number | string;
  requiredValue: number | string;
  unit: string;
  status: 'compliant' | 'warning' | 'violation';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  consequences: string;
  remediation: string;
  lastChecked: string;
  nextCheckDate: string;
  autoMonitored: boolean;
}

export interface ComplianceAlert {
  id: string;
  alertType: 'violation' | 'warning' | 'threshold-approaching' | 'certification-expiring';
  severity: 'critical' | 'high' | 'medium' | 'low';
  incentiveName: string;
  message: string;
  detectedAt: string;
  actionRequired: string;
  deadline?: string;
  autoResolve: boolean;
  resolved: boolean;
}

export interface ComplianceHistory {
  date: string;
  incentiveName: string;
  checkType: string;
  result: 'passed' | 'failed' | 'warning';
  details: string;
}

// ==========================================
// MOCK DATA
// ==========================================

const COMPLIANCE_RULES: ComplianceRule[] = [
  {
    id: 'rule-001',
    incentiveName: 'Export Cash Incentive (4%)',
    ruleType: 'ratio',
    description: 'Maintain minimum 80% export ratio',
    requirement: 'Export sales must be ≥80% of total sales',
    currentValue: 85,
    requiredValue: 80,
    unit: '%',
    status: 'compliant',
    riskLevel: 'low',
    consequences: 'Incentive revoked if export ratio falls below 80% for 2 consecutive quarters',
    remediation: 'Increase export orders or reduce domestic sales',
    lastChecked: '2026-02-10T14:30:00Z',
    nextCheckDate: '2026-03-31T00:00:00Z',
    autoMonitored: true
  },
  {
    id: 'rule-004',
    incentiveName: 'Workforce Training Subsidy',
    ruleType: 'reporting',
    description: 'Submit quarterly training reports',
    requirement: 'Training completion reports due every quarter',
    currentValue: 'Q3 2025 submitted',
    requiredValue: 'Q4 2025 due',
    unit: 'report',
    status: 'violation',
    riskLevel: 'critical',
    consequences: 'Subsidy payments suspended until reports submitted',
    remediation: 'OVERDUE: Submit Q4 2025 training report immediately',
    lastChecked: '2026-02-12T08:00:00Z',
    nextCheckDate: '2026-02-15T00:00:00Z',
    autoMonitored: false
  }
];

const COMPLIANCE_ALERTS: ComplianceAlert[] = [
  {
    id: 'alert-001',
    alertType: 'violation',
    severity: 'critical',
    incentiveName: 'Workforce Training Subsidy',
    message: 'Q4 2025 training report is overdue by 12 days',
    detectedAt: '2026-01-31T00:00:01Z',
    actionRequired: 'Submit training completion certificates immediately',
    deadline: '2026-02-15T00:00:00Z',
    autoResolve: false,
    resolved: false
  }
];

const COMPLIANCE_HISTORY: ComplianceHistory[] = [
  {
    date: '2026-02-10T14:30:00Z',
    incentiveName: 'Export Cash Incentive',
    checkType: 'Export Ratio Verification',
    result: 'passed',
    details: 'Export ratio: 85% (required: 80%). Compliant.'
  },
  {
    date: '2026-01-31T00:00:01Z',
    incentiveName: 'Workforce Training Subsidy',
    checkType: 'Quarterly Report Submission',
    result: 'failed',
    details: 'Q4 2025 report not submitted. OVERDUE.'
  }
];

// ==========================================
// MAIN FUNCTIONS
// ==========================================

/**
 * Get all compliance rules
 */
export function getAllComplianceRules(): ComplianceRule[] {
  return COMPLIANCE_RULES;
}

/**
 * Get rules by status
 */
export function getRulesByStatus(status: 'compliant' | 'warning' | 'violation'): ComplianceRule[] {
  return COMPLIANCE_RULES.filter(rule => rule.status === status);
}

/**
 * Get all active alerts
 */
export function getActiveAlerts(): ComplianceAlert[] {
  return COMPLIANCE_ALERTS.filter(alert => !alert.resolved);
}

/**
 * Get critical alerts
 */
export function getCriticalAlerts(): ComplianceAlert[] {
  return COMPLIANCE_ALERTS.filter(alert => 
    !alert.resolved && (alert.severity === 'critical' || alert.severity === 'high')
  );
}

/**
 * Get compliance history
 */
export function getComplianceHistory(): ComplianceHistory[] {
  return COMPLIANCE_HISTORY.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get compliance statistics
 */
export function getComplianceStats() {
  const totalRules = COMPLIANCE_RULES.length;
  const compliant = COMPLIANCE_RULES.filter(r => r.status === 'compliant').length;
  const warnings = COMPLIANCE_RULES.filter(r => r.status === 'warning').length;
  const violations = COMPLIANCE_RULES.filter(r => r.status === 'violation').length;
  const activeAlerts = getActiveAlerts().length;
  const criticalAlerts = getCriticalAlerts().length;
  
  const complianceScore = Math.round((compliant / totalRules) * 100);
  
  return {
    totalRules,
    compliant,
    warnings,
    violations,
    activeAlerts,
    criticalAlerts,
    complianceScore,
    status: complianceScore >= 80 ? 'good' : complianceScore >= 60 ? 'warning' : 'critical'
  };
}

/**
 * Check specific rule compliance
 */
export function checkRuleCompliance(ruleId: string): ComplianceRule | undefined {
  return COMPLIANCE_RULES.find(rule => rule.id === ruleId);
}

/**
 * Simulate compliance check (for demo)
 */
export function runComplianceCheck(incentiveName: string): {
  passed: boolean;
  message: string;
  details: ComplianceRule[];
} {
  const rules = COMPLIANCE_RULES.filter(r => r.incentiveName === incentiveName);
  const allPassed = rules.every(r => r.status === 'compliant');
  const hasWarnings = rules.some(r => r.status === 'warning');
  const hasViolations = rules.some(r => r.status === 'violation');
  
  let message = '';
  if (hasViolations) {
    message = 'VIOLATION: Immediate action required';
  } else if (hasWarnings) {
    message = 'WARNING: Compliance issues detected';
  } else {
    message = 'COMPLIANT: All requirements met';
  }
  
  return {
    passed: allPassed,
    message,
    details: rules
  };
}

/**
 * Get remediation steps for non-compliant rules
 */
export function getRemediationSteps(): Array<{
  incentiveName: string;
  issue: string;
  steps: string[];
  urgency: 'critical' | 'high' | 'medium';
}> {
  const nonCompliant = COMPLIANCE_RULES.filter(r => r.status !== 'compliant');
  
  return nonCompliant.map(rule => ({
    incentiveName: rule.incentiveName,
    issue: rule.description,
    steps: [
      rule.remediation,
      `Monitor ${rule.requirement}`,
      `Next check: ${new Date(rule.nextCheckDate).toLocaleDateString()}`
    ],
    urgency: rule.status === 'violation' ? 'critical' : 'high'
  }));
}
