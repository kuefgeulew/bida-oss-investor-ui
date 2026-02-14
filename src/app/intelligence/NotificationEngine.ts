// 🔔 NOTIFICATION ENGINE — Proactive Alert System
// SURGICAL COMPLETION: Push notifications for compliance, SLA, and incentive triggers
// ARCHITECTURE: Event-driven notification system with toast integration

import { toast } from 'sonner';

export interface NotificationTrigger {
  type: 'compliance' | 'sla' | 'incentive' | 'document' | 'payment' | 'general';
  severity: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
  timestamp: Date;
  investorId?: string;
  metadata?: Record<string, any>;
}

export interface ComplianceDeadline {
  taskName: string;
  dueDate: Date;
  daysRemaining: number;
  severity: 'critical' | 'warning' | 'info';
}

export interface SLABreach {
  serviceName: string;
  slaDeadline: Date;
  currentDays: number;
  maxDays: number;
  breachPercentage: number;
}

export interface IncentiveEligibility {
  incentiveName: string;
  eligibleAfterYears: number;
  currentYears: number;
  estimatedValue: number;
  requirements: string[];
}

/**
 * Notification Engine Class
 * Manages all system notifications and triggers
 */
export class NotificationEngineCore {
  private listeners: ((notification: NotificationTrigger) => void)[] = [];
  
  constructor() {
    // Auto-start monitoring on instantiation
    this.startMonitoring();
  }

  /**
   * Register a notification listener
   */
  subscribe(callback: (notification: NotificationTrigger) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  /**
   * Emit notification to all listeners
   */
  private emit(notification: NotificationTrigger) {
    this.listeners.forEach(callback => callback(notification));
    
    // Also show toast notification
    this.showToast(notification);
  }

  /**
   * Show toast notification
   */
  private showToast(notification: NotificationTrigger) {
    const toastConfig = {
      description: notification.message,
      action: notification.actionUrl ? {
        label: notification.actionLabel || 'View',
        onClick: () => {
          if (notification.actionUrl) {
            window.location.href = notification.actionUrl;
          }
        }
      } : undefined
    };

    switch (notification.severity) {
      case 'error':
        toast.error(notification.title, toastConfig);
        break;
      case 'warning':
        toast.warning(notification.title, toastConfig);
        break;
      case 'success':
        toast.success(notification.title, toastConfig);
        break;
      default:
        toast.info(notification.title, toastConfig);
    }
  }

  /**
   * Check for compliance deadline triggers
   */
  checkComplianceDeadlines(deadlines: ComplianceDeadline[]) {
    deadlines.forEach(deadline => {
      if (deadline.daysRemaining <= 3 && deadline.daysRemaining > 0) {
        this.emit({
          type: 'compliance',
          severity: deadline.severity === 'critical' ? 'error' : 'warning',
          title: '⚠️ Compliance Deadline Approaching',
          message: `${deadline.taskName} is due in ${deadline.daysRemaining} days`,
          actionUrl: '#compliance',
          actionLabel: 'View Task',
          timestamp: new Date(),
          metadata: { deadline }
        });
      } else if (deadline.daysRemaining <= 0) {
        this.emit({
          type: 'compliance',
          severity: 'error',
          title: '🚨 Compliance Deadline Overdue',
          message: `${deadline.taskName} is overdue by ${Math.abs(deadline.daysRemaining)} days`,
          actionUrl: '#compliance',
          actionLabel: 'Take Action',
          timestamp: new Date(),
          metadata: { deadline }
        });
      }
    });
  }

  /**
   * Check for SLA breaches
   */
  checkSLABreaches(breaches: SLABreach[]) {
    breaches.forEach(breach => {
      if (breach.breachPercentage >= 90) {
        this.emit({
          type: 'sla',
          severity: 'error',
          title: '🔥 SLA Breach Alert',
          message: `${breach.serviceName} has exceeded ${breach.breachPercentage.toFixed(0)}% of SLA timeline`,
          actionUrl: '#approvals',
          actionLabel: 'Contact Officer',
          timestamp: new Date(),
          metadata: { breach }
        });
      } else if (breach.breachPercentage >= 75) {
        this.emit({
          type: 'sla',
          severity: 'warning',
          title: '⏰ SLA Warning',
          message: `${breach.serviceName} is at ${breach.breachPercentage.toFixed(0)}% of SLA limit`,
          actionUrl: '#approvals',
          actionLabel: 'Check Status',
          timestamp: new Date(),
          metadata: { breach }
        });
      }
    });
  }

  /**
   * Check for incentive eligibility (after 2 years)
   */
  checkIncentiveEligibility(eligibilities: IncentiveEligibility[]) {
    eligibilities.forEach(incentive => {
      if (incentive.currentYears >= incentive.eligibleAfterYears && 
          incentive.currentYears < incentive.eligibleAfterYears + 0.25) { // Within 3 months of eligibility
        this.emit({
          type: 'incentive',
          severity: 'success',
          title: '🎉 New Incentive Eligible!',
          message: `You're now eligible for ${incentive.incentiveName} (Est. value: $${incentive.estimatedValue.toLocaleString()})`,
          actionUrl: '#services',
          actionLabel: 'Apply Now',
          timestamp: new Date(),
          metadata: { incentive }
        });
      }
    });
  }

  /**
   * Send document upload reminder
   */
  sendDocumentReminder(documentName: string, serviceName: string) {
    this.emit({
      type: 'document',
      severity: 'info',
      title: '📄 Document Required',
      message: `${documentName} is needed for ${serviceName}`,
      actionUrl: '#documents',
      actionLabel: 'Upload Now',
      timestamp: new Date()
    });
  }

  /**
   * Send payment reminder
   */
  sendPaymentReminder(serviceName: string, amount: number, dueDate: Date) {
    const daysUntilDue = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    this.emit({
      type: 'payment',
      severity: daysUntilDue <= 3 ? 'warning' : 'info',
      title: '💳 Payment Due',
      message: `${serviceName} payment of BDT ${amount.toLocaleString()} due in ${daysUntilDue} days`,
      actionUrl: '#payments',
      actionLabel: 'Pay Now',
      timestamp: new Date(),
      metadata: { amount, dueDate }
    });
  }

  /**
   * Start automated monitoring (runs every 5 minutes)
   */
  private startMonitoring() {
    // Check every 5 minutes for triggers
    setInterval(() => {
      this.runPeriodicChecks();
    }, 5 * 60 * 1000);

    // Also run immediately on startup
    setTimeout(() => this.runPeriodicChecks(), 2000);
  }

  /**
   * Run periodic checks for all notification triggers
   */
  private async runPeriodicChecks() {
    // In production, these would fetch from API/database
    // For now, we'll use mock data for demonstration
    
    // Mock compliance deadlines - ONLY show if investor has real deadlines
    // Empty array to prevent showing mock notifications to all users
    const mockDeadlines: ComplianceDeadline[] = [
      // Commented out to prevent mock notifications on login screen
      // {
      //   taskName: 'Annual Tax Filing',
      //   dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      //   daysRemaining: 2,
      //   severity: 'critical'
      // }
    ];

    // Mock SLA breaches
    const mockBreaches: SLABreach[] = [
      // Would be populated from actual application data
    ];

    // Mock incentive eligibilities
    const mockIncentives: IncentiveEligibility[] = [
      // Would check investor's registration date vs. current date
    ];

    this.checkComplianceDeadlines(mockDeadlines);
    this.checkSLABreaches(mockBreaches);
    this.checkIncentiveEligibility(mockIncentives);
  }
}

// Singleton instance
let engineInstance: NotificationEngineCore | null = null;

/**
 * Get or create notification engine instance
 */
export function getNotificationEngine(): NotificationEngineCore {
  if (!engineInstance) {
    engineInstance = new NotificationEngineCore();
  }
  return engineInstance;
}

/**
 * Hook to use notification engine in React components
 */
export function useNotificationEngine() {
  return getNotificationEngine();
}

/**
 * Utility functions for quick notifications
 */
export const NotificationUtils = {
  complianceDeadline: (taskName: string, daysRemaining: number) => {
    const engine = getNotificationEngine();
    engine.checkComplianceDeadlines([{
      taskName,
      dueDate: new Date(Date.now() + daysRemaining * 24 * 60 * 60 * 1000),
      daysRemaining,
      severity: daysRemaining <= 1 ? 'critical' : 'warning'
    }]);
  },

  slaBreach: (serviceName: string, currentDays: number, maxDays: number) => {
    const engine = getNotificationEngine();
    const breachPercentage = (currentDays / maxDays) * 100;
    engine.checkSLABreaches([{
      serviceName,
      slaDeadline: new Date(Date.now() + (maxDays - currentDays) * 24 * 60 * 60 * 1000),
      currentDays,
      maxDays,
      breachPercentage
    }]);
  },

  incentiveEligible: (incentiveName: string, estimatedValue: number) => {
    const engine = getNotificationEngine();
    engine.checkIncentiveEligibility([{
      incentiveName,
      eligibleAfterYears: 2,
      currentYears: 2,
      estimatedValue,
      requirements: []
    }]);
  },

  documentRequired: (documentName: string, serviceName: string) => {
    const engine = getNotificationEngine();
    engine.sendDocumentReminder(documentName, serviceName);
  },

  paymentDue: (serviceName: string, amount: number, daysUntilDue: number) => {
    const engine = getNotificationEngine();
    const dueDate = new Date(Date.now() + daysUntilDue * 24 * 60 * 60 * 1000);
    engine.sendPaymentReminder(serviceName, amount, dueDate);
  }
};

export default NotificationEngineCore;