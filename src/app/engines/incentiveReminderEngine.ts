/**
 * 🔔 INCENTIVE REMINDER ENGINE
 * 
 * Powers: Renewal reminders, compliance deadlines, expiry warnings
 * Returns: Upcoming renewals, overdue items, action required
 */

export interface IncentiveRenewal {
  id: string;
  incentiveName: string;
  expiryDate: string;
  daysUntilExpiry: number;
  status: 'urgent' | 'warning' | 'upcoming';
  renewalProcess: string;
  requiredDocuments: string[];
  estimatedProcessingDays: number;
  valueAtRisk: number; // BDT
  remindersSent: number;
  lastReminderDate: string;
  actionRequired: string;
  renewalUrl?: string;
}

export interface ComplianceDeadline {
  id: string;
  incentiveName: string;
  requirementType: 'report' | 'inspection' | 'certification' | 'audit' | 'verification';
  description: string;
  dueDate: string;
  daysUntilDue: number;
  status: 'overdue' | 'urgent' | 'upcoming';
  consequences: string;
  submissionUrl?: string;
  contactOfficer?: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface ReminderNotification {
  id: string;
  type: 'renewal' | 'compliance' | 'expiry' | 'new-incentive';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  message: string;
  actionText: string;
  actionUrl?: string;
  createdAt: string;
  read: boolean;
  dismissable: boolean;
}

// ==========================================
// MOCK DATA
// ==========================================

const MOCK_RENEWALS: IncentiveRenewal[] = [
  {
    id: 'renewal-001',
    incentiveName: 'Tax Holiday Certificate (10 years)',
    expiryDate: '2026-03-15T00:00:00Z',
    daysUntilExpiry: 31,
    status: 'urgent',
    renewalProcess: 'Submit annual compliance report + financial statements to NBR',
    requiredDocuments: [
      'Annual financial statements (audited)',
      'Export evidence (LC copies)',
      'Tax compliance certificate',
      'Company incorporation certificate'
    ],
    estimatedProcessingDays: 21,
    valueAtRisk: 12500000, // BDT 1.25 Cr per year
    remindersSent: 3,
    lastReminderDate: '2026-02-10T10:30:00Z',
    actionRequired: 'Submit compliance report by March 1, 2026 to avoid lapse',
    renewalUrl: '/incentives/renew/tax-holiday'
  },
  {
    id: 'renewal-002',
    incentiveName: 'Export Cash Incentive (4%)',
    expiryDate: '2026-06-01T00:00:00Z',
    daysUntilExpiry: 108,
    status: 'warning',
    renewalProcess: 'Provide export documentation for last 12 months to EPB',
    requiredDocuments: [
      'Export invoices (last 12 months)',
      'LC documents',
      'Customs clearance certificates',
      'Bank realization certificates'
    ],
    estimatedProcessingDays: 14,
    valueAtRisk: 8000000, // BDT 80 Lakh per year
    remindersSent: 1,
    lastReminderDate: '2026-02-01T08:00:00Z',
    actionRequired: 'Prepare export documentation for renewal',
    renewalUrl: '/incentives/renew/export-cash'
  },
  {
    id: 'renewal-003',
    incentiveName: 'Duty-Free Machinery Import License',
    expiryDate: '2026-09-20T00:00:00Z',
    daysUntilExpiry: 219,
    status: 'upcoming',
    renewalProcess: 'Submit machinery utilization report to BIDA',
    requiredDocuments: [
      'Machinery installation certificate',
      'Production capacity report',
      'Employment proof',
      'BIDA registration renewal'
    ],
    estimatedProcessingDays: 7,
    valueAtRisk: 3500000, // BDT 35 Lakh
    remindersSent: 0,
    lastReminderDate: '',
    actionRequired: 'Track machinery installation progress',
    renewalUrl: '/incentives/renew/duty-free'
  }
];

const MOCK_COMPLIANCE_DEADLINES: ComplianceDeadline[] = [
  {
    id: 'compliance-001',
    incentiveName: 'Export Cash Incentive (4%)',
    requirementType: 'report',
    description: 'Quarterly export report (Q4 2025)',
    dueDate: '2026-01-31T00:00:00Z',
    daysUntilDue: -12, // Overdue
    status: 'overdue',
    consequences: 'Incentive payment suspended until report submitted',
    submissionUrl: '/compliance/submit/quarterly-export',
    contactOfficer: {
      name: 'Khalid Hasan',
      phone: '+880-2-9556666',
      email: 'khalid.hasan@epb.gov.bd'
    }
  },
  {
    id: 'compliance-002',
    incentiveName: 'Tax Holiday Certificate',
    requirementType: 'audit',
    description: 'Maintain 80% export ratio verification',
    dueDate: '2026-02-28T00:00:00Z',
    daysUntilDue: 16,
    status: 'urgent',
    consequences: 'Tax holiday may be revoked if export ratio falls below 80%',
    submissionUrl: '/compliance/verify/export-ratio',
    contactOfficer: {
      name: 'Sarah Rahman',
      phone: '+880-2-8181010',
      email: 'sarah.rahman@nbr.gov.bd'
    }
  },
  {
    id: 'compliance-003',
    incentiveName: 'Workforce Training Subsidy',
    requirementType: 'certification',
    description: 'Submit training completion certificates',
    dueDate: '2026-03-31T00:00:00Z',
    daysUntilDue: 47,
    status: 'upcoming',
    consequences: 'Subsidy reimbursement delayed until certificates provided',
    submissionUrl: '/compliance/submit/training-certificates'
  },
  {
    id: 'compliance-004',
    incentiveName: 'Green Tech Tax Incentive',
    requirementType: 'inspection',
    description: 'Solar panel installation verification (site visit)',
    dueDate: '2026-04-15T00:00:00Z',
    daysUntilDue: 62,
    status: 'upcoming',
    consequences: 'Incentive approval pending inspection completion',
    contactOfficer: {
      name: 'Ahmed Khan',
      phone: '+880-2-9876543',
      email: 'ahmed.khan@sreda.gov.bd'
    }
  }
];

// ==========================================
// MAIN FUNCTIONS
// ==========================================

/**
 * Get all upcoming renewals
 */
export function getUpcomingRenewals(): IncentiveRenewal[] {
  return MOCK_RENEWALS.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
}

/**
 * Get urgent renewals (< 60 days)
 */
export function getUrgentRenewals(): IncentiveRenewal[] {
  return MOCK_RENEWALS.filter(r => r.daysUntilExpiry < 60);
}

/**
 * Get all compliance deadlines
 */
export function getComplianceDeadlines(): ComplianceDeadline[] {
  return MOCK_COMPLIANCE_DEADLINES.sort((a, b) => a.daysUntilDue - b.daysUntilDue);
}

/**
 * Get overdue compliance items
 */
export function getOverdueCompliance(): ComplianceDeadline[] {
  return MOCK_COMPLIANCE_DEADLINES.filter(c => c.status === 'overdue');
}

/**
 * Generate notifications
 */
export function generateReminderNotifications(): ReminderNotification[] {
  const notifications: ReminderNotification[] = [];
  
  // Renewal notifications
  MOCK_RENEWALS.forEach(renewal => {
    if (renewal.status === 'urgent') {
      notifications.push({
        id: `notif-renewal-${renewal.id}`,
        type: 'renewal',
        priority: 'critical',
        title: `URGENT: ${renewal.incentiveName} expires in ${renewal.daysUntilExpiry} days`,
        message: `Action required: ${renewal.actionRequired}. Value at risk: BDT ${(renewal.valueAtRisk / 100000).toFixed(1)} Lakh/year.`,
        actionText: 'Renew Now',
        actionUrl: renewal.renewalUrl,
        createdAt: new Date().toISOString(),
        read: false,
        dismissable: false
      });
    }
  });
  
  // Compliance notifications
  MOCK_COMPLIANCE_DEADLINES.forEach(deadline => {
    if (deadline.status === 'overdue') {
      notifications.push({
        id: `notif-compliance-${deadline.id}`,
        type: 'compliance',
        priority: 'critical',
        title: `OVERDUE: ${deadline.description}`,
        message: `${Math.abs(deadline.daysUntilDue)} days overdue. ${deadline.consequences}`,
        actionText: 'Submit Now',
        actionUrl: deadline.submissionUrl,
        createdAt: new Date().toISOString(),
        read: false,
        dismissable: false
      });
    } else if (deadline.status === 'urgent') {
      notifications.push({
        id: `notif-compliance-${deadline.id}`,
        type: 'compliance',
        priority: 'high',
        title: `Due Soon: ${deadline.description}`,
        message: `Due in ${deadline.daysUntilDue} days. ${deadline.consequences}`,
        actionText: 'View Details',
        actionUrl: deadline.submissionUrl,
        createdAt: new Date().toISOString(),
        read: false,
        dismissable: true
      });
    }
  });
  
  return notifications.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Get reminder statistics
 */
export function getReminderStats() {
  const urgentRenewals = getUrgentRenewals();
  const overdueCompliance = getOverdueCompliance();
  const allDeadlines = getComplianceDeadlines();
  
  return {
    totalRenewals: MOCK_RENEWALS.length,
    urgentRenewals: urgentRenewals.length,
    totalValueAtRisk: MOCK_RENEWALS.reduce((sum, r) => sum + r.valueAtRisk, 0),
    overdueItems: overdueCompliance.length,
    upcomingDeadlines: allDeadlines.filter(d => d.status === 'upcoming').length,
    criticalNotifications: generateReminderNotifications().filter(n => n.priority === 'critical').length
  };
}

/**
 * Calculate days until expiry
 */
export function calculateDaysUntil(dateString: string): number {
  const targetDate = new Date(dateString);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Format BDT currency
 */
export function formatBDT(amount: number): string {
  if (amount >= 10000000) {
    return `BDT ${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `BDT ${(amount / 100000).toFixed(2)} Lakh`;
  } else {
    return `BDT ${amount.toLocaleString()}`;
  }
}
