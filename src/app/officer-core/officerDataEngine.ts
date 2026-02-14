/**
 * 🏛️ OFFICER DATA ENGINE
 * 
 * Central source of truth for all Officer data.
 * Simulates a backend with in-memory state management.
 * All Officer panels read from and write to this engine.
 * 
 * NOTE: Data now comes from mockOfficerUniverse.ts for consistency
 */

// Import mock universe data
import {
  MOCK_APPLICATIONS,
  MOCK_OFFICERS,
  MOCK_COMMUNICATIONS,
  MOCK_AGENCY_STATS,
  MOCK_POST_APPROVAL,
  MOCK_OFFICER_MESSAGES
} from './mockOfficerUniverse';

// ============================================================================
// TYPES
// ============================================================================

export interface OfficerApplication {
  id: string;
  investorName: string;
  investorEmail: string;
  companyName: string;
  sector: string;
  country: string;
  investmentAmount: number;
  zone: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'conditional';
  submittedDate: string;
  slaDeadline: string;
  documents: Array<{ name: string; status: string }>;
  approvals: {
    rjsc?: string;
    nbr?: string;
    bangladeshBank?: string;
    environment?: string;
    fire?: string;
  };
  paymentReceived: boolean;
  uboComplete: boolean;
  riskScore: number;
  currentStep: string;
  assignedOfficer: string;
  isVIP?: boolean;
  isProblem?: boolean;
  isEmergency?: boolean;
  problemReason?: string;
  emergencyReason?: string;
  onSanctionsList?: boolean;
  hasPEP?: boolean;
  hasAdverseMedia?: boolean;
  shellCompanyIndicators?: number;
  highRiskJurisdictions?: number;
  isCashHeavy?: boolean;
  ownershipLayers?: number;
  hasOffshoreEntity?: boolean;
  hasNomineeShareholders?: boolean;
  hasSourceOfFundsDocs?: boolean;
  isStrategicSector?: boolean;
}

export interface Officer {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  expertise: string[];
  languages: string[];
  certifications: string[];
  experience: string;
  successRate: number;
  avgResponseTime: string;
  totalApplications: number;
  specialSkills: string[];
  available: boolean;
  workload: number;
}

export interface Communication {
  id: number;
  channel: 'email' | 'phone' | 'whatsapp' | 'portal';
  from: string;
  to: string;
  subject: string;
  timestamp: string;
  status: 'sent' | 'received' | 'read' | 'completed';
  duration?: string;
  applicationId: string;
}

export interface AgencyPerformance {
  agency: string;
  fullName: string;
  avgDays: number;
  slaCompliance: number;
  currentBacklog: number;
}

export interface PostApprovalTracking {
  id: string;
  companyName: string;
  sector: string;
  approvalDate: string;
  investmentAmount: number;
  implementationStatus: 'On Track' | 'Delayed' | 'Completed';
  completion: number;
  milestones: Array<{
    task: string;
    status: 'completed' | 'in-progress' | 'pending';
    date: string;
  }>;
  metrics: {
    jobsCreated: number;
    targetJobs: number;
    investmentDisbursed: number;
    totalInvestment: number;
  };
}

export interface WorkloadDay {
  day: string;
  applications: number;
  slaBreaches: number;
  lateNight: boolean;
  weekend?: boolean;
}

export interface OfficerMessage {
  id: number;
  officer: string;
  message: string;
  timestamp: string;
  avatar: string;
  applicationId?: string;
}

// ============================================================================
// IN-MEMORY DATA STORE
// ============================================================================

export const officerStore = {
  applications: [...MOCK_APPLICATIONS] as OfficerApplication[],
  officers: [...MOCK_OFFICERS] as Officer[],
  communications: [...MOCK_COMMUNICATIONS] as Communication[],
  agencyStats: [...MOCK_AGENCY_STATS] as AgencyPerformance[],
  postApproval: [...MOCK_POST_APPROVAL] as PostApprovalTracking[],
  officerMessages: [...MOCK_OFFICER_MESSAGES] as OfficerMessage[]
};

// ============================================================================
// DATA ACCESS FUNCTIONS
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
}) {
  let apps = [...officerStore.applications];
  
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
export function getApplication(id: string) {
  return officerStore.applications.find(a => a.id === id);
}

/**
 * Update application
 */
export function updateApplication(id: string, patch: Partial<OfficerApplication>) {
  const index = officerStore.applications.findIndex(a => a.id === id);
  if (index !== -1) {
    officerStore.applications[index] = {
      ...officerStore.applications[index],
      ...patch
    };
  }
  return officerStore.applications[index];
}

/**
 * Get officer profile by email
 */
export function getOfficerProfile(email: string = 'officer@bida.gov.bd'): Officer {
  return officerStore.officers.find(o => o.email === email) || officerStore.officers[0];
}

/**
 * Get all officers
 */
export function getAllOfficers(): Officer[] {
  return [...officerStore.officers];
}

/**
 * Get peer officers (excluding self)
 */
export function getPeerOfficers(excludeEmail: string): Officer[] {
  return officerStore.officers.filter(o => o.email !== excludeEmail);
}

/**
 * Log communication
 */
export function logCommunication(comm: Omit<Communication, 'id'>) {
  const newComm = {
    ...comm,
    id: officerStore.communications.length + 1
  };
  officerStore.communications.push(newComm);
  return newComm;
}

/**
 * Get communications for an application
 */
export function getCommunications(applicationId?: string): Communication[] {
  if (applicationId) {
    return officerStore.communications.filter(c => c.applicationId === applicationId);
  }
  return [...officerStore.communications];
}

/**
 * Get agency performance stats
 */
export function getAgencyPerformance(): AgencyPerformance[] {
  return [...officerStore.agencyStats];
}

/**
 * Update agency stats (simulated real-time update)
 */
export function updateAgencyStats(agency: string, updates: Partial<AgencyPerformance>) {
  const index = officerStore.agencyStats.findIndex(a => a.agency === agency);
  if (index !== -1) {
    officerStore.agencyStats[index] = {
      ...officerStore.agencyStats[index],
      ...updates
    };
  }
}

/**
 * Get post-approval tracking data
 */
export function getPostApprovalData(): PostApprovalTracking[] {
  return [...officerStore.postApproval];
}

/**
 * Update post-approval milestone
 */
export function updatePostApprovalMilestone(
  projectId: string,
  milestoneIndex: number,
  status: 'completed' | 'in-progress' | 'pending'
) {
  const project = officerStore.postApproval.find(p => p.id === projectId);
  if (project && project.milestones[milestoneIndex]) {
    project.milestones[milestoneIndex].status = status;
    
    // Recalculate completion
    const completed = project.milestones.filter(m => m.status === 'completed').length;
    project.completion = Math.round((completed / project.milestones.length) * 100);
    
    // Update status
    if (project.completion === 100) {
      project.implementationStatus = 'Completed';
    }
  }
}

/**
 * Get workload statistics for current week
 */
export function getWorkloadStats(officerEmail: string): WorkloadDay[] {
  const apps = getApplications({ assignedOfficer: getOfficerProfile(officerEmail).name });
  
  // Calculate actual workload from applications
  const today = new Date();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const workloadData: WorkloadDay[] = [];
  
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
 * Add officer message to thread
 */
export function addOfficerMessage(message: Omit<OfficerMessage, 'id' | 'timestamp'>) {
  const newMessage = {
    ...message,
    id: officerStore.officerMessages.length + 1,
    timestamp: 'Just now'
  };
  officerStore.officerMessages.push(newMessage);
  return newMessage;
}

/**
 * Get officer messages for application
 */
export function getOfficerMessages(applicationId?: string): OfficerMessage[] {
  if (applicationId) {
    return officerStore.officerMessages.filter(m => m.applicationId === applicationId);
  }
  return [...officerStore.officerMessages];
}

/**
 * Get special cases (VIP, Problem, Emergency)
 */
export function getSpecialCases() {
  return {
    vip: getApplications({ isVIP: true }),
    problem: getApplications({ isProblem: true }),
    emergency: getApplications({ isEmergency: true })
  };
}

/**
 * Calculate bottlenecks from current applications
 */
export function getBottleneckData() {
  const apps = officerStore.applications;
  
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