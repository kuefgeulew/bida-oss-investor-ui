/**
 * 🔌 MOCK DATA PROVIDER
 * 
 * Simple getter layer that reads from the mock universe.
 * No logic. No state. Pure data access.
 * 
 * All Officer components should import from THIS file, not from the universe directly.
 */

import {
  MOCK_APPLICATIONS,
  MOCK_OFFICERS,
  MOCK_COMMUNICATIONS,
  MOCK_AGENCY_STATS,
  MOCK_POST_APPROVAL,
  MOCK_OFFICER_MESSAGES
} from './mockOfficerUniverse';

import type {
  OfficerApplication,
  Officer,
  Communication,
  AgencyPerformance,
  PostApprovalTracking,
  OfficerMessage
} from './officerDataEngine';

// ============================================================================
// APPLICATION GETTERS
// ============================================================================

/**
 * Get all applications (optionally filtered)
 */
export function getApplications(filter?: {
  status?: string;
  assignedOfficer?: string;
  isVIP?: boolean;
  isProblem?: boolean;
  isEmergency?: boolean;
}): OfficerApplication[] {
  let apps = [...MOCK_APPLICATIONS];

  if (filter) {
    if (filter.status && filter.status !== 'all') {
      apps = apps.filter(a => a.status === filter.status);
    }
    if (filter.assignedOfficer) {
      apps = apps.filter(a => a.assignedOfficer === filter.assignedOfficer);
    }
    if (filter.isVIP) {
      apps = apps.filter(a => a.isVIP === true);
    }
    if (filter.isProblem) {
      apps = apps.filter(a => a.isProblem === true);
    }
    if (filter.isEmergency) {
      apps = apps.filter(a => a.isEmergency === true);
    }
  }

  return apps;
}

/**
 * Get single application by ID
 */
export function getApplication(id: string): OfficerApplication | undefined {
  return MOCK_APPLICATIONS.find(a => a.id === id);
}

/**
 * Get special cases (VIP, Problem, Emergency)
 */
export function getSpecialCases() {
  return {
    vip: MOCK_APPLICATIONS.filter(a => a.isVIP === true),
    problem: MOCK_APPLICATIONS.filter(a => a.isProblem === true),
    emergency: MOCK_APPLICATIONS.filter(a => a.isEmergency === true)
  };
}

// ============================================================================
// OFFICER GETTERS
// ============================================================================

/**
 * Get officer profile by email
 */
export function getOfficerProfile(email: string = 'officer@bida.gov.bd'): Officer {
  return MOCK_OFFICERS.find(o => o.email === email) || MOCK_OFFICERS[0];
}

/**
 * Get officer by ID
 */
export function getOfficerById(id: string): Officer | undefined {
  return MOCK_OFFICERS.find(o => o.id === id);
}

/**
 * Get all officers
 */
export function getAllOfficers(): Officer[] {
  return [...MOCK_OFFICERS];
}

/**
 * Get peer officers (excluding self)
 */
export function getPeerOfficers(excludeEmail: string): Officer[] {
  return MOCK_OFFICERS.filter(o => o.email !== excludeEmail);
}

// ============================================================================
// COMMUNICATION GETTERS
// ============================================================================

/**
 * Get communications for an application (or all)
 */
export function getCommunications(applicationId?: string): Communication[] {
  if (applicationId) {
    return MOCK_COMMUNICATIONS.filter(c => c.applicationId === applicationId);
  }
  return [...MOCK_COMMUNICATIONS];
}

/**
 * Get recent communications (last N)
 */
export function getRecentCommunications(limit: number = 10): Communication[] {
  return MOCK_COMMUNICATIONS.slice(0, limit);
}

// ============================================================================
// AGENCY GETTERS
// ============================================================================

/**
 * Get agency performance stats
 */
export function getAgencyStats(): AgencyPerformance[] {
  return [...MOCK_AGENCY_STATS];
}

/**
 * Get single agency stats
 */
export function getAgencyStat(agencyName: string): AgencyPerformance | undefined {
  return MOCK_AGENCY_STATS.find(a => a.agency === agencyName);
}

// ============================================================================
// POST-APPROVAL GETTERS
// ============================================================================

/**
 * Get post-approval tracking data
 */
export function getPostApprovalData(): PostApprovalTracking[] {
  return [...MOCK_POST_APPROVAL];
}

/**
 * Get single post-approval project
 */
export function getPostApprovalProject(id: string): PostApprovalTracking | undefined {
  return MOCK_POST_APPROVAL.find(p => p.id === id);
}

// ============================================================================
// COLLABORATION GETTERS
// ============================================================================

/**
 * Get officer messages for application (or all)
 */
export function getOfficerMessages(applicationId?: string): OfficerMessage[] {
  if (applicationId) {
    return MOCK_OFFICER_MESSAGES.filter(m => m.applicationId === applicationId);
  }
  return [...MOCK_OFFICER_MESSAGES];
}

/**
 * Get recent officer messages
 */
export function getRecentOfficerMessages(limit: number = 5): OfficerMessage[] {
  return MOCK_OFFICER_MESSAGES.slice(0, limit);
}

// ============================================================================
// ANALYTICS & INTELLIGENCE GETTERS
// ============================================================================

/**
 * Calculate bottlenecks from current applications
 */
export function getBottleneckData() {
  const apps = MOCK_APPLICATIONS.filter(a => a.status !== 'approved' && a.status !== 'rejected');

  // Analyze which stages have most pending applications
  const stageCount: Record<string, { count: number; totalDays: number }> = {};

  apps.forEach(app => {
    const stage = app.currentStep;
    if (!stageCount[stage]) {
      stageCount[stage] = { count: 0, totalDays: 0 };
    }
    stageCount[stage].count++;

    // Calculate days elapsed
    const submitted = new Date(app.submittedDate);
    const now = new Date();
    const daysElapsed = Math.floor((now.getTime() - submitted.getTime()) / (1000 * 60 * 60 * 24));
    stageCount[stage].totalDays += daysElapsed;
  });

  // Convert to array and calculate averages
  const bottlenecks = Object.entries(stageCount)
    .map(([stage, data]) => ({
      stage,
      count: data.count,
      avgDays: Math.round(data.totalDays / data.count)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return bottlenecks;
}

/**
 * Get workload statistics for current week
 * (Simulates activity based on applications assigned)
 */
export function getWorkloadStats(officerEmail: string) {
  const officer = getOfficerProfile(officerEmail);
  const apps = getApplications({ assignedOfficer: officer.name });

  // Calculate actual workload from applications
  const today = new Date();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const workloadData = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i));
    const dayName = daysOfWeek[date.getDay()];

    // Simulate daily application load (would be from actual activity log)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseLoad = isWeekend ? 3 : 10;
    const variance = Math.floor(Math.random() * 5);

    workloadData.push({
      day: dayName,
      applications: baseLoad + variance,
      slaBreaches: Math.floor(Math.random() * 2),
      lateNight: Math.random() > 0.7,
      weekend: isWeekend
    });
  }

  return workloadData;
}

/**
 * Get sector distribution from applications
 */
export function getSectorDistribution() {
  const sectorCount: Record<string, number> = {};

  MOCK_APPLICATIONS.forEach(app => {
    sectorCount[app.sector] = (sectorCount[app.sector] || 0) + 1;
  });

  return Object.entries(sectorCount)
    .map(([sector, count]) => ({ sector, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get country distribution from applications
 */
export function getCountryDistribution() {
  const countryCount: Record<string, number> = {};

  MOCK_APPLICATIONS.forEach(app => {
    countryCount[app.country] = (countryCount[app.country] || 0) + 1;
  });

  return Object.entries(countryCount)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get risk distribution
 */
export function getRiskDistribution() {
  const low = MOCK_APPLICATIONS.filter(a => a.riskScore < 30).length;
  const medium = MOCK_APPLICATIONS.filter(a => a.riskScore >= 30 && a.riskScore < 60).length;
  const high = MOCK_APPLICATIONS.filter(a => a.riskScore >= 60).length;

  return { low, medium, high };
}

/**
 * Get total investment value
 */
export function getTotalInvestmentValue() {
  return MOCK_APPLICATIONS.reduce((sum, app) => sum + app.investmentAmount, 0);
}

/**
 * Get average processing time (simulated)
 */
export function getAverageProcessingTime() {
  const completedApps = MOCK_APPLICATIONS.filter(
    a => a.status === 'approved' || a.status === 'rejected'
  );

  if (completedApps.length === 0) return 0;

  let totalDays = 0;
  completedApps.forEach(app => {
    const submitted = new Date(app.submittedDate);
    const sla = new Date(app.slaDeadline);
    const days = Math.floor((sla.getTime() - submitted.getTime()) / (1000 * 60 * 60 * 24));
    totalDays += days;
  });

  return Math.round(totalDays / completedApps.length);
}
