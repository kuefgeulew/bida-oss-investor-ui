// 🧭 JOURNEY GUIDANCE ENGINE — Next Best Action (NBA) Intelligence (ENHANCED)
// PHASE 5: Real backend integration - reads from actual database via API calls
// ARCHITECTURE: Async version that fetches real data from all platform engines

import {
  documentService,
  paymentService,
  bbidService,
  workflowService,
  bankService,
  complianceService,
  incentiveService,
  type Document,
  type Payment,
  type BBIDRecord,
  type Pipeline,
  type BankConnection,
  type ComplianceStatus,
  type IncentiveEligibility,
} from '@/api/enhancedServices';

export type TabType = 'overview' | 'approvals' | 'documents' | 'payments' | 'identity' | 'zones' | 'services' | 
                'banking' | 'compliance' | 'aftercare' | 'expansion' | 'fdi' | 'intelligencelab' | 'arena' | 'reports' | 
                'transparency' | 'learning' | 'startup' | 'green' | 'settings';

export interface NextBestAction {
  title: string;
  description: string;
  ctaLabel: string;
  targetTab: TabType;
  priority: 'critical' | 'high' | 'medium' | 'low';
  scrollTarget?: string; // Element ID to scroll to instead of switching tab
  dataSource: 'real' | 'mock'; // Track if using real or mock data
}

export interface InvestorState {
  investorId: string;
  bbid?: string;
  currentTab?: TabType;
}

/**
 * 🎯 GET NEXT BEST ACTION (ASYNC VERSION)
 * Core intelligence: analyzes investor state and returns the single most important next step
 * ENHANCED: Fetches real data from backend APIs
 */
export async function getNextBestAction(state: InvestorState): Promise<NextBestAction> {
  const { investorId, bbid, currentTab } = state;

  try {
    // ===== CRITICAL PATH CHECKS (Priority 1) =====
    
    // 1. Check BBID Registration (REAL API)
    const bbidResult = await bbidService.searchBBID({ investorId });
    const bbidRecords = bbidResult.bbids || [];
    
    if (bbidRecords.length === 0) {
      return {
        title: 'Register Your Business Identity',
        description: 'Complete your BBID registration to unlock all platform services and track your investment journey.',
        ctaLabel: 'Register BBID Now',
        targetTab: 'identity',
        priority: 'critical',
        dataSource: 'real'
      };
    }

    // 2. Check Documents - Critical documents missing (REAL API)
    const documentsResult = await documentService.getDocuments(investorId);
    const documents = documentsResult.documents || [];
    
    const hasPassport = documents.some(d => d.category === 'PASSPORT' || d.type.toLowerCase().includes('passport'));
    const hasTradeLicense = documents.some(d => d.category === 'LICENSE' || d.type.toLowerCase().includes('trade license'));
    const hasIncorporation = documents.some(d => d.category === 'INCORPORATION' || d.type.toLowerCase().includes('incorporation'));
    
    if (!hasIncorporation) {
      return {
        title: 'Upload Certificate of Incorporation',
        description: 'Your incorporation certificate is required to verify your company registration and proceed with approvals.',
        ctaLabel: 'Upload Certificate',
        targetTab: 'documents',
        priority: 'critical',
        scrollTarget: currentTab === 'documents' ? 'document-vault' : undefined,
        dataSource: 'real'
      };
    }

    if (!hasPassport) {
      return {
        title: 'Upload Passport Copy',
        description: 'Your passport is required for identity verification and visa processing. Upload a clear, color copy.',
        ctaLabel: 'Upload Passport',
        targetTab: 'documents',
        priority: 'critical',
        scrollTarget: currentTab === 'documents' ? 'document-vault' : undefined,
        dataSource: 'real'
      };
    }

    // 3. Check Payments - Outstanding payments (REAL API)
    const paymentsResult = await paymentService.getPayments({ investorId, bbid });
    const payments = paymentsResult.payments || [];
    const pendingPayments = payments.filter(p => p.status === 'PENDING' || p.status === 'PROCESSING');
    
    if (pendingPayments.length > 0) {
      const payment = pendingPayments[0];
      return {
        title: `Pay ${payment.serviceName} Fee`,
        description: `Outstanding payment of ${payment.amount.toLocaleString()} ${payment.currency} due by ${new Date(payment.dueDate).toLocaleDateString()}. Complete payment to proceed.`,
        ctaLabel: 'Pay Now',
        targetTab: 'payments',
        priority: 'critical',
        scrollTarget: currentTab === 'payments' ? 'payment-center' : undefined,
        dataSource: 'real'
      };
    }

    // ===== HIGH PRIORITY CHECKS (Priority 2) =====

    // 4. Check Journey Progress (REAL API)
    const pipelineResult = await workflowService.getPipeline(investorId);
    const pipeline = pipelineResult.pipeline;
    
    if (pipeline && pipeline.completedSteps < pipeline.totalSteps) {
      const progressPercent = Math.round((pipeline.completedSteps / pipeline.totalSteps) * 100);
      return {
        title: 'Complete Your Approval Journey',
        description: `You're ${progressPercent}% done! ${pipeline.totalSteps - pipeline.completedSteps} approvals remaining. Track your progress.`,
        ctaLabel: 'View Journey',
        targetTab: 'approvals',
        priority: 'high',
        scrollTarget: currentTab === 'approvals' ? 'journey-tracker' : undefined,
        dataSource: 'real'
      };
    }

    // 5. Check Zone Selection
    // TODO: Add zone selection tracking to backend
    const hasSelectedZone = false; // Placeholder until backend endpoint is ready
    
    if (!hasSelectedZone) {
      return {
        title: 'Select Your Investment Zone',
        description: 'Choose from 8 economic zones with tailored incentives. Get zone recommendations based on your sector.',
        ctaLabel: 'Explore Zones',
        targetTab: 'zones',
        priority: 'high',
        scrollTarget: currentTab === 'zones' ? 'zone-map' : undefined,
        dataSource: 'mock'
      };
    }

    // 6. Check Banking Setup (REAL API)
    const bankConnectionsResult = await bankService.getBankConnections(investorId);
    const bankConnections = bankConnectionsResult.connections || [];
    const hasBankConnection = bankConnections.length > 0 && bankConnections.some(bc => bc.isActive);
    
    if (!hasBankConnection) {
      return {
        title: 'Connect Your Bank Account',
        description: 'Link your bank to enable instant payments, FX conversion, and escrow services. Choose from 10+ partner banks.',
        ctaLabel: 'Connect Bank',
        targetTab: 'banking',
        priority: 'high',
        scrollTarget: currentTab === 'banking' ? 'bank-selector' : undefined,
        dataSource: 'real'
      };
    }

    // ===== MEDIUM PRIORITY CHECKS (Priority 3) =====

    // 7. Check Compliance Status (REAL API)
    const complianceResult = await complianceService.getComplianceStatus(investorId);
    const compliance = complianceResult.compliance;
    const hasComplianceExpiring = compliance?.items.some(item => {
      if (!item.dueDate) return false;
      const daysUntilExpiry = Math.floor((new Date(item.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    });
    
    if (hasComplianceExpiring) {
      const expiringItem = compliance.items.find(item => {
        if (!item.dueDate) return false;
        const daysUntilExpiry = Math.floor((new Date(item.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
      });
      
      if (expiringItem) {
        return {
          title: `Renew ${expiringItem.name}`,
          description: `Your ${expiringItem.name} expires soon. Renew now to avoid service disruptions.`,
          ctaLabel: 'Renew Now',
          targetTab: 'compliance',
          priority: 'medium',
          dataSource: 'real'
        };
      }
    }

    // 8. Check Incentive Opportunities
    // This would require sector and investment amount from profile
    // TODO: Integrate with profile API to get this data
    const hasAppliedForIncentives = false; // Placeholder
    
    if (!hasAppliedForIncentives) {
      return {
        title: 'Apply for Incentives You Qualify For',
        description: 'Based on your sector and investment size, you may qualify for tax holidays and duty exemptions.',
        ctaLabel: 'Check Eligibility',
        targetTab: 'intelligencelab',
        priority: 'medium',
        scrollTarget: currentTab === 'intelligencelab' ? 'incentive-calculator' : undefined,
        dataSource: 'mock'
      };
    }

    // 9. Check Visa Requirements
    // TODO: Integrate with visa/workforce API
    const hasAppliedForVisa = false; // Placeholder
    
    if (!hasAppliedForVisa) {
      return {
        title: 'Apply for Work Permits',
        description: 'Bring your key personnel to Bangladesh. Apply for investor visas and work permits.',
        ctaLabel: 'Apply Now',
        targetTab: 'expansion',
        priority: 'medium',
        dataSource: 'mock'
      };
    }

    // ===== EXPANSION & OPTIMIZATION (Priority 4) =====

    // 10. Check Expansion Eligibility
    const isEligibleForExpansion = pipeline?.completedSteps === pipeline?.totalSteps;
    
    if (isEligibleForExpansion) {
      return {
        title: 'Expand Your Investment',
        description: 'Your initial setup is complete! Explore expansion opportunities, new facilities, or additional zones.',
        ctaLabel: 'Explore Expansion',
        targetTab: 'expansion',
        priority: 'low',
        dataSource: 'real'
      };
    }

    // ===== DEFAULT: GAMIFICATION BRIDGE =====
    
    // If all operational tasks are complete, guide to Arena
    return {
      title: 'Improve Your Investor Standing',
      description: 'All critical tasks complete! Track your performance, earn achievements, and compete on the leaderboard.',
      ctaLabel: 'Enter Arena',
      targetTab: 'arena',
      priority: 'low',
      dataSource: 'real'
    };

  } catch (error) {
    // FALLBACK: If API fails, return a generic action
    console.error('Error fetching next best action:', error);
    return {
      title: 'Check Your Dashboard',
      description: 'Review your current progress and see what needs attention.',
      ctaLabel: 'View Dashboard',
      targetTab: 'overview',
      priority: 'medium',
      dataSource: 'mock'
    };
  }
}

/**
 * 🎯 GET CONTEXT-AWARE ACTION (ASYNC VERSION)
 * Returns action optimized for current tab context
 */
export async function getContextAwareAction(state: InvestorState): Promise<NextBestAction> {
  const action = await getNextBestAction(state);
  
  // If user is already on the target tab, provide scroll target instead
  if (state.currentTab === action.targetTab && action.scrollTarget) {
    return {
      ...action,
      ctaLabel: `Go to ${action.scrollTarget.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`
    };
  }
  
  return action;
}

/**
 * 🎯 GET ALL PENDING ACTIONS (ASYNC VERSION)
 * Returns full list of pending actions (for advanced users)
 */
export async function getAllPendingActions(state: InvestorState): Promise<NextBestAction[]> {
  // For now, return single action
  // TODO: Implement full action queue by checking all conditions
  const action = await getNextBestAction(state);
  return [action];
}

/**
 * 🎯 SYNC VERSION (For backward compatibility)
 * Returns a Promise-wrapped version that can be awaited
 * This allows gradual migration from sync to async
 */
export function getNextBestActionSync(state: InvestorState): Promise<NextBestAction> {
  return getNextBestAction(state);
}