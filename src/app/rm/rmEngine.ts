// 🤝 RM ENGINE — Relationship Manager communication and escalation system
// ARCHITECTURE: Business logic for RM assignments, messaging, and escalations

import { assignRMBySector, assignRMBySectorAndRegion, getRMById, type RelationshipManager } from './rmRegistry';
import { getPendingPayments } from '../payments/paymentEngine';
import { getPipeline } from '../gov-agencies/agencyWorkflowEngine';

export interface RMAssignment {
  assignmentId: string;
  bbid: string;
  investorId?: string;
  companyName: string;
  sector: string;
  region?: string;
  assignedRM: RelationshipManager;
  assignedDate: string;
  status: 'active' | 'transferred' | 'closed';
}

export interface RMMessage {
  messageId: string;
  bbid: string;
  fromInvestor: boolean; // true = investor sent, false = RM sent
  senderName: string;
  message: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
}

export interface RMEscalation {
  escalationId: string;
  bbid: string;
  investorId?: string;
  companyName: string;
  issue: string;
  reason: 'payment_overdue' | 'workflow_bottleneck' | 'missing_documents' | 'other';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdDate: string;
  resolvedDate?: string;
  status: 'pending' | 'in_progress' | 'resolved';
  assignedRM?: RelationshipManager;
  notes?: string;
}

// In-memory storage (replace with database in production)
const rmAssignments: Map<string, RMAssignment> = new Map();
const rmMessages: Map<string, RMMessage[]> = new Map();
const rmEscalations: Map<string, RMEscalation> = new Map();

/**
 * 👔 ASSIGN RM TO INVESTOR
 * Auto-assigns appropriate RM based on sector/region
 */
export function assignRM(
  bbid: string,
  companyName: string,
  sector: string,
  region?: string,
  investorId?: string
): RMAssignment {
  // Check if already assigned
  const existing = getAssignment(bbid);
  if (existing && existing.status === 'active') {
    return existing;
  }

  const rm = assignRMBySectorAndRegion(sector, region);
  if (!rm) {
    throw new Error('No suitable RM found for this sector/region');
  }

  const assignmentId = `RM-ASSIGN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const assignment: RMAssignment = {
    assignmentId,
    bbid,
    investorId,
    companyName,
    sector,
    region,
    assignedRM: rm,
    assignedDate: new Date().toISOString(),
    status: 'active'
  };

  rmAssignments.set(bbid, assignment);
  
  // Send welcome message
  sendMessage(bbid, false, rm.name, 
    `Welcome to BIDA! I'm ${rm.name}, your dedicated Relationship Manager. I'm here to support your investment journey in Bangladesh. Feel free to reach out anytime!`
  );

  console.log(`[RM Engine] ✅ Assigned ${rm.name} to ${companyName} (${bbid})`);
  
  return assignment;
}

/**
 * 💬 SEND MESSAGE
 */
export function sendMessage(
  bbid: string,
  fromInvestor: boolean,
  senderName: string,
  message: string,
  attachments?: string[]
): RMMessage {
  const messageId = `MSG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const newMessage: RMMessage = {
    messageId,
    bbid,
    fromInvestor,
    senderName,
    message,
    timestamp: new Date().toISOString(),
    read: false,
    attachments
  };

  const existing = rmMessages.get(bbid) || [];
  existing.push(newMessage);
  rmMessages.set(bbid, existing);

  return newMessage;
}

/**
 * 📋 GET MESSAGES
 */
export function getMessages(bbid: string): RMMessage[] {
  return rmMessages.get(bbid) || [];
}

/**
 * ✅ MARK MESSAGE AS READ
 */
export function markMessageRead(messageId: string): void {
  rmMessages.forEach(messages => {
    const msg = messages.find(m => m.messageId === messageId);
    if (msg) msg.read = true;
  });
}

/**
 * 🔔 GET UNREAD COUNT
 */
export function getUnreadCount(bbid: string): number {
  const messages = getMessages(bbid);
  return messages.filter(m => !m.read && !m.fromInvestor).length;
}

/**
 * 🚨 CREATE ESCALATION
 * Auto-triggers when issues detected
 */
export function createEscalation(
  bbid: string,
  companyName: string,
  issue: string,
  reason: RMEscalation['reason'],
  priority: RMEscalation['priority'],
  investorId?: string
): RMEscalation {
  const escalationId = `ESC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Get assigned RM
  const assignment = getAssignment(bbid);
  
  const escalation: RMEscalation = {
    escalationId,
    bbid,
    investorId,
    companyName,
    issue,
    reason,
    priority,
    createdDate: new Date().toISOString(),
    status: 'pending',
    assignedRM: assignment?.assignedRM
  };

  rmEscalations.set(escalationId, escalation);

  // Notify RM
  if (assignment) {
    sendMessage(bbid, false, 'System Alert',
      `⚠️ Escalation created: ${issue}. Priority: ${priority.toUpperCase()}. Your assigned RM has been notified.`
    );
  }

  console.log(`[RM Engine] 🚨 Escalation created: ${issue} (${priority})`);
  
  return escalation;
}

/**
 * 📊 GET ESCALATIONS
 */
export function getEscalations(bbid?: string): RMEscalation[] {
  const allEscalations = Array.from(rmEscalations.values());
  
  if (bbid) {
    return allEscalations.filter(esc => esc.bbid === bbid);
  }
  
  return allEscalations.sort((a, b) => 
    new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );
}

/**
 * ✅ RESOLVE ESCALATION
 */
export function resolveEscalation(escalationId: string, notes?: string): boolean {
  const escalation = rmEscalations.get(escalationId);
  if (!escalation) return false;

  escalation.status = 'resolved';
  escalation.resolvedDate = new Date().toISOString();
  if (notes) escalation.notes = notes;

  // Notify investor
  sendMessage(escalation.bbid, false, 'System Alert',
    `✅ Your issue "${escalation.issue}" has been resolved. ${notes || ''}`
  );

  return true;
}

/**
 * 📋 GET ASSIGNMENT
 */
export function getAssignment(bbid: string): RMAssignment | null {
  return rmAssignments.get(bbid) || null;
}

/**
 * 🔄 TRANSFER RM
 */
export function transferRM(bbid: string, newRMId: string): RMAssignment | null {
  const assignment = getAssignment(bbid);
  if (!assignment) return null;

  const newRM = getRMById(newRMId);
  if (!newRM) return null;

  const oldRM = assignment.assignedRM;
  assignment.assignedRM = newRM;

  sendMessage(bbid, false, 'System Alert',
    `Your Relationship Manager has been changed from ${oldRM.name} to ${newRM.name}. ${newRM.name} will now be your primary contact.`
  );

  return assignment;
}

/**
 * 🤖 AUTO-DETECT BOTTLENECKS
 * Scans for issues and creates escalations automatically
 */
export function autoDetectBottlenecks(bbid: string, companyName: string, investorId?: string): RMEscalation[] {
  const escalations: RMEscalation[] = [];

  // Check for overdue payments
  const pendingPayments = getPendingPayments(bbid);
  const overduePayments = pendingPayments.filter(p => p.status === 'overdue');
  
  if (overduePayments.length > 0) {
    const esc = createEscalation(
      bbid,
      companyName,
      `${overduePayments.length} overdue payment(s) detected`,
      'payment_overdue',
      'high',
      investorId
    );
    escalations.push(esc);
  }

  // Check for workflow delays
  const pipeline = getPipeline(investorId || bbid);
  if (pipeline) {
    const delayedSteps = pipeline.approvalSteps.filter(step => {
      if (step.status !== 'pending' && step.status !== 'under_review') return false;
      
      const daysSinceSubmission = step.submittedDate 
        ? Math.floor((Date.now() - new Date(step.submittedDate).getTime()) / (1000 * 60 * 60 * 24))
        : 0;
      
      return daysSinceSubmission > step.standardProcessingDays;
    });

    if (delayedSteps.length > 0) {
      const esc = createEscalation(
        bbid,
        companyName,
        `${delayedSteps.length} workflow step(s) delayed beyond SLA`,
        'workflow_bottleneck',
        'medium',
        investorId
      );
      escalations.push(esc);
    }
  }

  return escalations;
}

/**
 * 📊 GET RM STATS
 */
export function getRMStats(rmId: string) {
  const assignments = Array.from(rmAssignments.values()).filter(
    a => a.assignedRM.rmId === rmId && a.status === 'active'
  );

  const escalations = Array.from(rmEscalations.values()).filter(
    e => e.assignedRM?.rmId === rmId
  );

  const pendingEscalations = escalations.filter(e => e.status === 'pending' || e.status === 'in_progress');

  return {
    activeAssignments: assignments.length,
    totalEscalations: escalations.length,
    pendingEscalations: pendingEscalations.length,
    avgResponseTime: '2.5 hours' // Mock - would calculate from messages
  };
}

// 🎯 MOCK DATA: Pre-populate some sample RM assignments
function initializeMockRMData() {
  const mockBBID = 'BBID-2026-001';
  const mockCompany = 'TechVenture Bangladesh Ltd.';
  const mockBBID_INV001 = 'BBID-INV-001'; // For mockInvestors[0]

  // Auto-assign RM for both test cases
  assignRM(mockBBID, mockCompany, 'Manufacturing', 'Dhaka', 'INV-001');
  assignRM(mockBBID_INV001, 'Global Tech Solutions Ltd.', 'Manufacturing', 'Dhaka', 'INV-001');

  // Sample conversation
  sendMessage(mockBBID, true, mockCompany,
    'Hello! I have a question about the environmental clearance process.'
  );
  
  sendMessage(mockBBID, false, 'Dr. Farida Rahman',
    'Hello! The environmental clearance typically takes 15-20 days. I can help expedite this. Have you submitted all required documents?'
  );

  sendMessage(mockBBID, true, mockCompany,
    'Yes, I submitted them yesterday. Is there anything else I need to provide?'
  );

  sendMessage(mockBBID, false, 'Dr. Farida Rahman',
    'Great! Everything looks good. I\'ll coordinate with the Department of Environment and keep you updated on the progress.'
  );
}

// Initialize mock data
if (typeof window !== 'undefined') {
  initializeMockRMData();
}