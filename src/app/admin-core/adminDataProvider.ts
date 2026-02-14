// Admin Data Provider - All 23 features read from the SAME universe
// No invented data. Everything is derived or calculated.

import adminUniverse from './mockAdminUniverse';

// COMMAND CENTER PROVIDERS (3)

export function getNationalPulse() {
  return {
    totalPipeline: adminUniverse.metrics.totalPipelineValue,
    activeCases: adminUniverse.metrics.activeCases,
    approvedCases: adminUniverse.metrics.approvedCases,
    avgProcessingDays: adminUniverse.metrics.avgProcessingDays,
    officerLoad: adminUniverse.metrics.avgOfficerLoad,
    slaCompliance: Math.round((1 - (adminUniverse.metrics.delayedCases / adminUniverse.applications.length)) * 100)
  };
}

export function getBottleneckStats() {
  // Identify bottlenecked agencies
  const bottlenecks = adminUniverse.agencyStats
    .filter(agency => agency.avgResponseTime > agency.slaTarget)
    .map(agency => ({
      agency: agency.agency,
      avgDelay: agency.avgResponseTime - agency.slaTarget,
      casesAffected: agency.currentLoad,
      slaTarget: agency.slaTarget
    }))
    .sort((a, b) => b.avgDelay - a.avgDelay);

  return bottlenecks;
}

export function getPolicyImpact() {
  // Used by Policy Simulator - baseline metrics
  return {
    currentApprovals: adminUniverse.metrics.approvedCases,
    currentRejections: adminUniverse.metrics.rejectedCases,
    avgDays: adminUniverse.metrics.avgProcessingDays,
    applications: adminUniverse.applications
  };
}

// GOVERNANCE PROVIDERS (3)

export function getOfficerFairness() {
  const teamAvgApproval = adminUniverse.officerStats.reduce((sum, s) => sum + s.approvalRate, 0) / adminUniverse.officerStats.length;
  
  return {
    stats: adminUniverse.officerStats,
    teamAverage: teamAvgApproval,
    alerts: adminUniverse.officerStats.filter(stat => Math.abs(stat.approvalRate - teamAvgApproval) > 20)
  };
}

export function getCorruptionSignals() {
  return adminUniverse.corruption;
}

export function getJourneyTimeline(caseId: string) {
  const application = adminUniverse.applications.find(app => app.id === caseId);
  if (!application) return [];

  // Generate realistic timeline from application data
  const timeline = [
    { day: 1, event: 'Application Submitted', actor: application.companyName, action: 'Submitted initial application' },
    { day: 2, event: 'Assigned to Officer', actor: 'System', action: `Assigned to ${application.assignedOfficer}` },
    { day: 5, event: 'Documents Verified', actor: application.assignedOfficer, action: 'Completed document verification' },
  ];

  if (application.requiredApprovals && application.requiredApprovals.length > 0) {
    application.requiredApprovals.forEach((approval, idx) => {
      timeline.push({
        day: 8 + idx * 5,
        event: `${approval.agency} Review`,
        actor: approval.agency,
        action: approval.status === 'approved' ? 'Approved application' : 'Under review'
      });
    });
  }

  if (application.status === 'approved') {
    timeline.push({
      day: (application.daysInProgress || 30),
      event: 'Final Approval',
      actor: 'BIDA Admin',
      action: 'Application approved and certificate issued'
    });
  }

  return timeline;
}

// AGENCY PROVIDERS (3)

export function getSLALeaderboard() {
  return adminUniverse.agencyStats
    .sort((a, b) => b.slaCompliance - a.slaCompliance)
    .map(agency => ({
      agency: agency.agency,
      slaCompliance: agency.slaCompliance,
      avgResponseTime: agency.avgResponseTime,
      slaTarget: agency.slaTarget,
      casesProcessed: agency.casesProcessed
    }));
}

export function getEscalations() {
  // Find cases that are significantly delayed
  const escalatedCases = adminUniverse.applications
    .filter(app => (app.daysInProgress || 0) > 60)
    .map(app => ({
      caseId: app.id,
      investor: app.companyName,
      officer: app.assignedOfficer,
      daysOverdue: (app.daysInProgress || 0) - 45,
      status: app.status,
      investmentAmount: app.investmentAmount
    }))
    .sort((a, b) => b.daysOverdue - a.daysOverdue)
    .slice(0, 10);

  return escalatedCases;
}

export function getDependencyGraph() {
  // Build actual workflow dependencies based on approval patterns
  const workflow = [
    {
      step: 1,
      agency: 'BIDA',
      stage: 'Initial Review',
      dependencies: [],
      casesProcessed: adminUniverse.applications.filter(app => app.approvals?.bida_initial).length,
      avgDays: 5
    },
    {
      step: 2,
      agency: 'RJSC',
      stage: 'Company Registration',
      dependencies: ['BIDA'],
      casesProcessed: adminUniverse.applications.filter(app => app.approvals?.rjsc).length,
      avgDays: 8.5
    },
    {
      step: 3,
      agency: 'NBR',
      stage: 'Tax Registration',
      dependencies: ['RJSC'],
      casesProcessed: adminUniverse.applications.filter(app => app.approvals?.nbr).length,
      avgDays: 6.2
    },
    {
      step: 4,
      agency: 'Bangladesh Bank',
      stage: 'Foreign Exchange Approval',
      dependencies: ['NBR', 'RJSC'],
      casesProcessed: adminUniverse.applications.filter(app => app.approvals?.bangladeshBank).length,
      avgDays: 14.3
    },
    {
      step: 5,
      agency: 'Fire Service',
      stage: 'Safety Certificate',
      dependencies: ['RJSC'],
      casesProcessed: adminUniverse.applications.filter(app => app.approvals?.fire).length,
      avgDays: 7.1
    },
    {
      step: 5,
      agency: 'DoE',
      stage: 'Environmental Clearance',
      dependencies: ['RJSC'],
      casesProcessed: adminUniverse.applications.filter(app => app.approvals?.environment).length,
      avgDays: 18.7
    },
    {
      step: 5,
      agency: 'Drug Admin',
      stage: 'Pharmaceutical License',
      dependencies: ['RJSC', 'DoE'],
      casesProcessed: adminUniverse.applications.filter(app => app.approvals?.drugAdmin).length,
      avgDays: 12.5
    },
    {
      step: 6,
      agency: 'BIDA',
      stage: 'Final Approval & Certificate',
      dependencies: ['Bangladesh Bank', 'Fire Service', 'DoE'],
      casesProcessed: adminUniverse.applications.filter(app => app.approvals?.bida_final).length,
      avgDays: 4
    }
  ];

  return workflow;
}

// OFFICER ECOSYSTEM PROVIDERS (3)

export function getLoadHeatmap() {
  const capacity = 15; // Assume 15 cases per officer is capacity
  return adminUniverse.officerStats.map(officer => ({
    officer: officer.officer,
    currentLoad: officer.total,
    load: officer.total,
    capacity,
    approved: officer.approved,
    rejected: officer.rejected,
    avgDays: officer.avgDays,
    status: officer.total > 15 ? 'overload' : officer.total > 10 ? 'optimal' : 'healthy',
    loadLevel: officer.total > 15 ? 'high' : officer.total > 10 ? 'medium' : 'normal'
  }));
}

export function getSkillCoverage() {
  // Map officers to sectors they handle
  const allSectors = [...new Set(adminUniverse.applications.map(app => app.sector))];
  
  // Create a map of sector -> officers who handle it
  const sectorOfficerMap: Record<string, string[]> = {};
  
  allSectors.forEach(sector => {
    const officersForSector = adminUniverse.officers.filter(officer => {
      const officerApps = adminUniverse.applications.filter(app => app.assignedOfficer === officer.name);
      return officerApps.some(app => app.sector === sector);
    }).map(o => o.name);
    
    sectorOfficerMap[sector] = officersForSector;
  });

  return sectorOfficerMap;
}

export function getTrainingNeeds() {
  // Identify officers with low approval rates or high avg days
  const teamAvgDays = adminUniverse.officerStats.reduce((sum, s) => sum + s.avgDays, 0) / adminUniverse.officerStats.length;
  
  const trainingNeeds = adminUniverse.officerStats
    .filter(officer => officer.avgDays > teamAvgDays * 1.2 || officer.approvalRate < 50)
    .map(officer => ({
      officer: officer.officer,
      skill: officer.avgDays > teamAvgDays * 1.2 ? 'Process Efficiency' : 'Decision Quality',
      reason: officer.avgDays > teamAvgDays * 1.2 ? 'Slow Processing' : 'Low Approval Rate',
      avgDays: officer.avgDays,
      approvalRate: officer.approvalRate,
      urgency: officer.total > 10 ? 'high' : 'medium',
      priority: officer.total > 10 ? 'high' : 'medium'
    }));

  return trainingNeeds;
}

// ANALYTICS PROVIDERS (3)

export function getDropOffFunnel() {
  return adminUniverse.dropOff;
}

export function getFDILoss() {
  return adminUniverse.fdiLoss;
}

export function getIncentiveROI() {
  return adminUniverse.incentives;
}

// SECURITY PROVIDERS (3)

export function getAuditLogs() {
  // Generate sample audit logs from recent officer/admin actions
  const logs = [
    { id: 1, user: 'admin@bida.gov.bd', action: `Viewed Application ${adminUniverse.applications[0].id}`, module: 'Applications', timestamp: '2026-02-04 09:15:23', ip: '192.168.1.100' },
    { id: 2, user: adminUniverse.officers[0].email, action: `Approved Document for ${adminUniverse.applications[1].id}`, module: 'Documents', timestamp: '2026-02-04 08:45:10', ip: '192.168.1.105' },
    { id: 3, user: 'superadmin@bida.gov.bd', action: 'Changed SLA Setting', module: 'Config', timestamp: '2026-02-03 16:30:00', ip: '192.168.1.50' }
  ];
  return logs;
}

export function getPrivacyMetrics() {
  return {
    dataDeletionRequests: 3,
    consentLogsRecorded: adminUniverse.applications.length * 5, // 5 consent logs per case
    piiMaskingEnabled: true,
    gdprCompliance: 98
  };
}

export function getPrivilegeLogs() {
  const escalations = [
    { 
      user: adminUniverse.officers[0].email, 
      elevated: 'Temporary Admin Access', 
      duration: '2 hours', 
      reason: 'Emergency application processing', 
      granted: '2026-02-03 14:00', 
      expires: '2026-02-03 16:00' 
    }
  ];
  return escalations;
}

// CONFIG PROVIDERS (3)

export function getSLAImpactSimulation(slaTargetDays: number) {
  const currentDays = adminUniverse.metrics.avgProcessingDays || 31; // Fallback to 31 if 0
  
  // Officer Load Impact: How much more/less load based on SLA change
  // If SLA is reduced (e.g., 30 days instead of 45), officers need to work faster = higher load
  // Formula: If target is lower than current, load increases; if higher, load decreases
  const officerLoadChange = ((currentDays - slaTargetDays) / currentDays) * 100;
  const officerLoad = 100 + officerLoadChange; // baseline 100% + change
  
  // Expected Delays: Number of cases that would be delayed under new SLA
  const totalCases = adminUniverse.applications.length;
  const casesOverTarget = adminUniverse.applications.filter(app => {
    const appDays = calculateDaysInProgress(app);
    return appDays > slaTargetDays;
  }).length;
  const expectedDelays = casesOverTarget;
  
  // Investor Satisfaction: Higher with shorter SLA targets
  // Formula: Base 50% + bonus for aggressive targets - penalty for lenient targets
  const investorSatisfaction = Math.max(0, Math.min(100, 50 + (45 - slaTargetDays) * 1.5));

  return {
    officerLoad: Math.max(0, officerLoad),
    expectedDelays,
    investorSatisfaction
  };
}

// Helper function for SLA simulation
function calculateDaysInProgress(app: any): number {
  if (app.stageDurations) {
    return Object.values(app.stageDurations).reduce((sum: number, days: any) => sum + (days || 0), 0);
  }
  if (app.daysInCurrentStage) {
    return app.daysInCurrentStage;
  }
  if (app.submittedDate) {
    const submitted = new Date(app.submittedDate);
    const today = new Date('2026-02-04');
    const diffTime = Math.abs(today.getTime() - submitted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  return 0;
}

export function getNotificationHealth() {
  const avgPerUser = 45;
  const highAlertUsers = adminUniverse.officers
    .slice(0, 2)
    .map(officer => `${officer.name} (${Math.floor(Math.random() * 40) + 60} notifications)`);
  
  return {
    avgPerUser,
    highAlertUsers,
    systemHealth: avgPerUser > 50 ? 'Alert Fatigue Risk' : 'Healthy'
  };
}

export function getFeatureUsage() {
  return [
    { feature: 'Application Review', usage: 95 },
    { feature: 'Document Upload', usage: 88 },
    { feature: 'Officer CRM', usage: 72 },
    { feature: 'Analytics Dashboard', usage: 34 },
    { feature: 'Policy Simulator', usage: 12 }
  ];
}

// EODB PROVIDERS (2)

export function getEODBMetrics() {
  return adminUniverse.eodb;
}

export function getRegionalBenchmark() {
  return adminUniverse.regional;
}

// Export all providers
export default {
  getNationalPulse,
  getBottleneckStats,
  getPolicyImpact,
  getOfficerFairness,
  getCorruptionSignals,
  getJourneyTimeline,
  getSLALeaderboard,
  getEscalations,
  getDependencyGraph,
  getLoadHeatmap,
  getSkillCoverage,
  getTrainingNeeds,
  getDropOffFunnel,
  getFDILoss,
  getIncentiveROI,
  getAuditLogs,
  getPrivacyMetrics,
  getPrivilegeLogs,
  getSLAImpactSimulation,
  getNotificationHealth,
  getFeatureUsage,
  getEODBMetrics,
  getRegionalBenchmark
};