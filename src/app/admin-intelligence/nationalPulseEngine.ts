// National FDI Pulse Engine - Aggregates system health metrics

// Agency name mapping
const AGENCY_NAMES: { [key: string]: string } = {
  rjsc: 'RJSC',
  nbr: 'NBR',
  bangladeshBank: 'Bangladesh Bank',
  environment: 'DoE',
  fire: 'Fire Service',
  drugAdmin: 'Drug Administration',
  bida_initial: 'BIDA',
  bida_final: 'BIDA'
};

export interface NationalPulseMetrics {
  totalPipelineValue: number;
  approvalsThisMonth: number;
  avgApprovalTime: number;
  activeApplications: number;
  pendingApplications: number;
  underReviewApplications: number;
  delayingAgencies: { agency: string; avgDelay: number; count: number }[];
  overloadedOfficers: { officer: string; load: number; maxCapacity: number }[];
  vipApplicationsActive: number;
  liveAlerts: Alert[];
  systemHealth: 'healthy' | 'warning' | 'critical';
}

export interface Alert {
  id: string;
  type: 'sla_breach' | 'complaint_spike' | 'system_error' | 'corruption_flag' | 'officer_overload';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  applicationId?: string;
  officerId?: string;
  agencyId?: string;
}

export function calculateNationalPulse(applications: any[], officers: any[], agencies: any[]): NationalPulseMetrics {
  const now = new Date();
  const thisMonth = now.getMonth();
  
  // Total pipeline value
  const totalPipelineValue = applications
    .filter(app => app.status !== 'rejected')
    .reduce((sum, app) => sum + (app.investmentAmount || 0), 0);
  
  // Approvals this month
  const approvalsThisMonth = applications.filter(app => {
    if (app.status !== 'approved') return false;
    const approvalDate = app.approvalDate ? new Date(app.approvalDate) : null;
    return approvalDate && approvalDate.getMonth() === thisMonth;
  }).length;
  
  // Average approval time
  const approvedApps = applications.filter(app => app.status === 'approved' && app.submittedDate && app.approvalDate);
  const avgApprovalTime = approvedApps.length > 0
    ? approvedApps.reduce((sum, app) => {
        const submitted = new Date(app.submittedDate).getTime();
        const approved = new Date(app.approvalDate).getTime();
        return sum + (approved - submitted) / (1000 * 60 * 60 * 24);
      }, 0) / approvedApps.length
    : 0;
  
  // Status counts
  const activeApplications = applications.filter(app => app.status === 'under_review').length;
  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  const underReviewApplications = activeApplications;
  
  // Delaying agencies
  const agencyDelays: { [key: string]: { total: number; count: number } } = {};
  applications.forEach(app => {
    if (app.approvals) {
      Object.entries(app.approvals).forEach(([agency, status]) => {
        if (status === 'pending' || status === 'delayed') {
          if (!agencyDelays[agency]) {
            agencyDelays[agency] = { total: 0, count: 0 };
          }
          const daysElapsed = app.daysInCurrentStage || Math.random() * 20;
          agencyDelays[agency].total += daysElapsed;
          agencyDelays[agency].count += 1;
        }
      });
    }
  });
  
  const delayingAgencies = Object.entries(agencyDelays)
    .map(([agency, data]) => ({
      agency: AGENCY_NAMES[agency] || agency,
      avgDelay: data.total / data.count,
      count: data.count
    }))
    .sort((a, b) => b.avgDelay - a.avgDelay)
    .slice(0, 5);
  
  // Overloaded officers
  const officerLoads: { [key: string]: number } = {};
  applications.forEach(app => {
    if (app.assignedOfficer && app.status !== 'completed' && app.status !== 'rejected') {
      officerLoads[app.assignedOfficer] = (officerLoads[app.assignedOfficer] || 0) + 1;
    }
  });
  
  const overloadedOfficers = Object.entries(officerLoads)
    .map(([officer, load]) => ({
      officer,
      load,
      maxCapacity: 15 // Standard capacity
    }))
    .filter(o => o.load > o.maxCapacity)
    .sort((a, b) => b.load - a.load);
  
  // VIP applications
  const vipApplicationsActive = applications.filter(app => 
    (app.investmentAmount > 10000000 || app.isStrategicSector) && 
    app.status !== 'approved' && 
    app.status !== 'rejected'
  ).length;
  
  // Generate live alerts
  const liveAlerts: Alert[] = [];
  
  // SLA breach alerts
  applications.forEach(app => {
    if (app.status !== 'approved' && app.status !== 'rejected') {
      const deadline = new Date(app.slaDeadline);
      if (deadline < now) {
        liveAlerts.push({
          id: `sla-${app.id}`,
          type: 'sla_breach',
          severity: 'high',
          message: `SLA breached for ${app.companyName} (${app.id})`,
          timestamp: now.toISOString(),
          applicationId: app.id
        });
      }
    }
  });
  
  // Officer overload alerts
  overloadedOfficers.forEach(officer => {
    liveAlerts.push({
      id: `overload-${officer.officer}`,
      type: 'officer_overload',
      severity: 'medium',
      message: `Officer ${officer.officer} handling ${officer.load} cases (max ${officer.maxCapacity})`,
      timestamp: now.toISOString(),
      officerId: officer.officer
    });
  });
  
  // System health determination
  let systemHealth: 'healthy' | 'warning' | 'critical' = 'healthy';
  const criticalAlerts = liveAlerts.filter(a => a.severity === 'critical').length;
  const highAlerts = liveAlerts.filter(a => a.severity === 'high').length;
  
  if (criticalAlerts > 0 || highAlerts > 5) {
    systemHealth = 'critical';
  } else if (highAlerts > 0 || liveAlerts.length > 10) {
    systemHealth = 'warning';
  }
  
  return {
    totalPipelineValue,
    approvalsThisMonth,
    avgApprovalTime: Math.round(avgApprovalTime),
    activeApplications,
    pendingApplications,
    underReviewApplications,
    delayingAgencies,
    overloadedOfficers,
    vipApplicationsActive,
    liveAlerts: liveAlerts.slice(0, 10), // Top 10 alerts
    systemHealth
  };
}

export function formatCurrency(amount: number): string {
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(2)}B`;
  }
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(2)}K`;
  }
  return `$${amount.toFixed(2)}`;
}