/**
 * 🤖 COMMUNICATION AUTOMATION ENGINE
 * 
 * Auto-generates appropriate messages based on application stage and events
 * Reduces manual work and ensures consistent communication
 */

import { OfficerApplication } from './officerDataEngine';

export interface AutomatedMessage {
  trigger: string;
  channel: 'email' | 'portal' | 'sms';
  subject: string;
  body: string;
  priority: 'low' | 'medium' | 'high';
  shouldSend: boolean;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  enabled: boolean;
  channel: 'email' | 'portal' | 'sms';
  template: string;
}

/**
 * Get automated message for application stage change
 */
export function getAutomatedMessage(
  application: OfficerApplication,
  event: 'submitted' | 'docs_missing' | 'agency_pending' | 'approved' | 'rejected' | 'sla_warning',
  officer: { name: string; email: string }
): AutomatedMessage | null {
  const templates = getMessageTemplates();
  
  switch (event) {
    case 'submitted':
      return {
        trigger: 'Application Submitted',
        channel: 'email',
        subject: `Application Received - ${application.id}`,
        body: templates.submitted
          .replace('{investorName}', application.investorName)
          .replace('{appId}', application.id)
          .replace('{sector}', application.sector)
          .replace('{officerName}', officer.name),
        priority: 'medium',
        shouldSend: true
      };
      
    case 'docs_missing':
      const missingDocs = application.documents
        .filter(d => d.status === 'missing' || d.status === 'pending')
        .map(d => `- ${d.name}`)
        .join('\n');
        
      return {
        trigger: 'Documents Missing',
        channel: 'email',
        subject: `Additional Documents Required - ${application.id}`,
        body: templates.docs_missing
          .replace('{investorName}', application.investorName)
          .replace('{appId}', application.id)
          .replace('{missingDocs}', missingDocs)
          .replace('{officerName}', officer.name),
        priority: 'high',
        shouldSend: application.documents.some(d => d.status === 'missing')
      };
      
    case 'agency_pending':
      const pendingAgencies = Object.entries(application.approvals)
        .filter(([_, status]) => status === 'pending')
        .map(([agency, _]) => agency.toUpperCase())
        .join(', ');
        
      return {
        trigger: 'Agency Approvals Pending',
        channel: 'portal',
        subject: `Application Status Update - ${application.id}`,
        body: templates.agency_pending
          .replace('{investorName}', application.investorName)
          .replace('{appId}', application.id)
          .replace('{agencies}', pendingAgencies)
          .replace('{officerName}', officer.name),
        priority: 'medium',
        shouldSend: pendingAgencies.length > 0
      };
      
    case 'approved':
      return {
        trigger: 'Application Approved',
        channel: 'email',
        subject: `🎉 Application Approved - ${application.id}`,
        body: templates.approved
          .replace('{investorName}', application.investorName)
          .replace('{appId}', application.id)
          .replace('{companyName}', application.companyName)
          .replace('{sector}', application.sector)
          .replace('{amount}', (application.investmentAmount / 1000000).toFixed(2))
          .replace('{zone}', application.zone)
          .replace('{officerName}', officer.name),
        priority: 'high',
        shouldSend: true
      };
      
    case 'rejected':
      return {
        trigger: 'Application Rejected',
        channel: 'email',
        subject: `Application Decision - ${application.id}`,
        body: templates.rejected
          .replace('{investorName}', application.investorName)
          .replace('{appId}', application.id)
          .replace('{officerName}', officer.name),
        priority: 'high',
        shouldSend: true
      };
      
    case 'sla_warning':
      const daysRemaining = Math.ceil(
        (new Date(application.slaDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      
      return {
        trigger: 'SLA Deadline Approaching',
        channel: 'portal',
        subject: `⏰ Deadline Reminder - ${application.id}`,
        body: templates.sla_warning
          .replace('{investorName}', application.investorName)
          .replace('{appId}', application.id)
          .replace('{daysRemaining}', daysRemaining.toString())
          .replace('{deadline}', application.slaDeadline)
          .replace('{officerName}', officer.name),
        priority: daysRemaining < 7 ? 'high' : 'medium',
        shouldSend: daysRemaining < 14
      };
      
    default:
      return null;
  }
}

/**
 * Get all available automation rules
 */
export function getAutomationRules(): AutomationRule[] {
  return [
    {
      id: 'auto-1',
      name: 'Application Received Confirmation',
      trigger: 'On application submission',
      enabled: true,
      channel: 'email',
      template: 'submitted'
    },
    {
      id: 'auto-2',
      name: 'Missing Documents Reminder',
      trigger: 'When documents are incomplete',
      enabled: true,
      channel: 'email',
      template: 'docs_missing'
    },
    {
      id: 'auto-3',
      name: 'Agency Status Update',
      trigger: 'When agency approvals are pending',
      enabled: true,
      channel: 'portal',
      template: 'agency_pending'
    },
    {
      id: 'auto-4',
      name: 'Approval Notification',
      trigger: 'On application approval',
      enabled: true,
      channel: 'email',
      template: 'approved'
    },
    {
      id: 'auto-5',
      name: 'SLA Deadline Warning',
      trigger: '14 days before SLA deadline',
      enabled: true,
      channel: 'portal',
      template: 'sla_warning'
    },
    {
      id: 'auto-6',
      name: 'Weekly Progress Update',
      trigger: 'Every Friday at 5 PM',
      enabled: false,
      channel: 'email',
      template: 'weekly_update'
    },
    {
      id: 'auto-7',
      name: 'Payment Reminder',
      trigger: 'When payment is not received',
      enabled: true,
      channel: 'sms',
      template: 'payment_reminder'
    },
    {
      id: 'auto-8',
      name: 'Conditional Approval Notice',
      trigger: 'On conditional approval',
      enabled: true,
      channel: 'email',
      template: 'conditional'
    }
  ];
}

/**
 * Toggle automation rule
 */
export function toggleAutomationRule(ruleId: string, enabled: boolean): void {
  // In a real system, this would update database
  console.log(`Automation rule ${ruleId} ${enabled ? 'enabled' : 'disabled'}`);
}

/**
 * Get suggested automations for an application
 */
export function getSuggestedAutomations(application: OfficerApplication): string[] {
  if (!application) return [];
  
  const suggestions: string[] = [];
  
  // Check for missing documents
  if (application.documents && Array.isArray(application.documents)) {
    const missingDocs = application.documents.filter(d => d.status === 'missing' || d.status === 'pending');
    if (missingDocs.length > 0) {
      suggestions.push(`Send missing documents reminder (${missingDocs.length} documents pending)`);
    }
  }
  
  // Check SLA
  if (application.slaDeadline) {
    const daysRemaining = Math.ceil(
      (new Date(application.slaDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysRemaining < 14 && daysRemaining > 0) {
      suggestions.push(`Send SLA deadline warning (${daysRemaining} days remaining)`);
    }
  }
  
  // Check payment
  if (application.paymentReceived === false) {
    suggestions.push('Send payment reminder');
  }
  
  // Check UBO
  if (application.uboComplete === false) {
    suggestions.push('Request UBO disclosure');
  }
  
  // Check pending agencies
  if (application.approvals) {
    const pendingAgencies = Object.entries(application.approvals)
      .filter(([_, status]) => status === 'pending')
      .length;
    if (pendingAgencies > 0) {
      suggestions.push(`Send agency status update (${pendingAgencies} agencies pending)`);
    }
  }
  
  return suggestions;
}

function getMessageTemplates() {
  return {
    submitted: `Dear {investorName},

Thank you for submitting your investment application to BIDA.

Application Details:
- Application ID: {appId}
- Sector: {sector}
- Status: Received and under initial review

Your application has been assigned to {officerName} who will guide you through the approval process.

You can track your application status through the BIDA OSS Portal at any time.

We will contact you if additional information is required.

Best regards,
Bangladesh Investment Development Authority (BIDA)
One Stop Service (OSS)`,

    docs_missing: `Dear {investorName},

Thank you for your investment application (ID: {appId}).

After our initial review, we require the following additional documents to proceed:

{missingDocs}

Please submit these documents within 7 working days to avoid processing delays.

Documents can be uploaded through the BIDA OSS Portal: [Upload Link]

If you have any questions, please contact your assigned officer.

Best regards,
{officerName}
Investment Services Officer
Bangladesh Investment Development Authority (BIDA)`,

    agency_pending: `Dear {investorName},

Your investment application ({appId}) is currently awaiting approvals from the following government agencies:

{agencies}

We are actively coordinating with these agencies to expedite the approval process. You will be notified once we receive their responses.

Current estimated timeline: 15-30 working days for agency approvals.

You can track real-time status through your BIDA OSS Portal dashboard.

Best regards,
{officerName}
Bangladesh Investment Development Authority (BIDA)`,

    approved: `Dear {investorName},

Congratulations! We are pleased to inform you that your investment application has been APPROVED.

Application Details:
- Application ID: {appId}
- Company Name: {companyName}
- Sector: {sector}
- Investment Amount: ${amount}M USD
- Zone: {zone}

Next Steps:
1. Download your official approval letter from the BIDA OSS Portal
2. Complete company registration with RJSC (if not already done)
3. Coordinate with your assigned officer for post-approval support

You can now proceed with your investment plans in Bangladesh. Our team will continue to support you during the implementation phase.

Welcome to Bangladesh!

Best regards,
{officerName}
Investment Services Officer
Bangladesh Investment Development Authority (BIDA)`,

    rejected: `Dear {investorName},

After careful review, we regret to inform you that your investment application ({appId}) has not been approved at this time.

Detailed reasons for this decision have been documented and are available through your BIDA OSS Portal account.

You have the right to:
1. Request a detailed explanation of the decision
2. Appeal this decision within 30 days
3. Reapply after addressing the concerns raised

If you would like to discuss this decision or explore alternative options, please contact your assigned officer.

Best regards,
{officerName}
Bangladesh Investment Development Authority (BIDA)`,

    sla_warning: `Dear {investorName},

This is a friendly reminder that your application ({appId}) has a processing deadline of {deadline}.

Days Remaining: {daysRemaining}

We are working diligently to complete the review within the service level agreement timeframe.

If you have any pending documents or information requests, please submit them as soon as possible to avoid delays.

Track your application progress: BIDA OSS Portal

Best regards,
{officerName}
Bangladesh Investment Development Authority (BIDA)`
  };
}