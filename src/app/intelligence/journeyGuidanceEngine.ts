// 🧭 JOURNEY GUIDANCE ENGINE — Next Best Action (NBA) Intelligence
// ARCHITECTURE: Reads state from all platform engines to determine the optimal next step for investor
// This is the invisible intelligence layer that separates a dashboard from a sovereign platform.

import { getDocumentsByInvestor } from '@/app/documents/documentEngine';
import { getAllPayments } from '@/app/payments/paymentEngine';
import { lookupBBID, searchBBID } from '@/app/bbid/bbidEngine';
import { getPipeline } from '@/app/gov-agencies/agencyWorkflowEngine';

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
}

export interface InvestorState {
  investorId: string;
  bbid?: string;
  currentTab?: TabType;
}

/**
 * 🎯 GET NEXT BEST ACTION
 * Core intelligence: analyzes investor state and returns the single most important next step
 */
export function getNextBestAction(state: InvestorState): NextBestAction {
  const { investorId, bbid, currentTab } = state;

  // ===== CRITICAL PATH CHECKS (Priority 1) =====
  
  // 1. Check BBID Registration
  const bbidRecords = searchBBID({ investorId });
  if (bbidRecords.length === 0) {
    return {
      title: 'Register Your Business Identity',
      description: 'Complete your BBID registration to unlock all platform services and track your investment journey.',
      ctaLabel: 'Register BBID Now',
      targetTab: 'identity',
      priority: 'critical'
    };
  }

  // 2. Check Documents - Critical documents missing
  const documents = getDocumentsByInvestor(investorId);
  const hasPassport = documents.some(d => d.type.toLowerCase().includes('passport'));
  const hasTradeLicense = documents.some(d => d.type.toLowerCase().includes('trade license'));
  const hasIncorporation = documents.some(d => d.type.toLowerCase().includes('incorporation'));
  
  if (!hasIncorporation) {
    return {
      title: 'Upload Certificate of Incorporation',
      description: 'Your incorporation certificate is required to verify your company registration and proceed with approvals.',
      ctaLabel: 'Upload Certificate',
      targetTab: 'documents',
      priority: 'critical',
      scrollTarget: currentTab === 'documents' ? 'document-vault' : undefined
    };
  }

  if (!hasPassport) {
    return {
      title: 'Upload Passport Copy',
      description: 'Your passport is required for identity verification and visa processing. Upload a clear, color copy.',
      ctaLabel: 'Upload Passport',
      targetTab: 'documents',
      priority: 'critical',
      scrollTarget: currentTab === 'documents' ? 'document-vault' : undefined
    };
  }

  // 3. Check Payments - Outstanding payments
  const payments = getAllPayments();
  const investorPayments = payments.filter(p => p.bbid === bbid || p.investorId === investorId);
  const pendingPayments = investorPayments.filter(p => p.status === 'pending');
  
  if (pendingPayments.length > 0) {
    const payment = pendingPayments[0];
    return {
      title: `Pay ${payment.serviceName} Fee`,
      description: `Outstanding payment of ${payment.feeAmount.toLocaleString()} BDT due by ${new Date(payment.dueDate).toLocaleDateString()}. Complete payment to proceed.`,
      ctaLabel: 'Pay Now',
      targetTab: 'payments',
      priority: 'critical',
      scrollTarget: currentTab === 'payments' ? 'payment-center' : undefined
    };
  }

  // ===== HIGH PRIORITY CHECKS (Priority 2) =====

  // 4. Check Journey Progress
  const pipeline = getPipeline(investorId);
  if (pipeline && pipeline.completedSteps < pipeline.totalSteps) {
    const progressPercent = Math.round((pipeline.completedSteps / pipeline.totalSteps) * 100);
    return {
      title: 'Complete Your Approval Journey',
      description: `You're ${progressPercent}% done! ${pipeline.totalSteps - pipeline.completedSteps} approvals remaining. Track your progress.`,
      ctaLabel: 'View Journey',
      targetTab: 'approvals',
      priority: 'high',
      scrollTarget: currentTab === 'approvals' ? 'journey-tracker' : undefined
    };
  }

  // 5. Check Zone Selection
  // For now, we'll check if the BBID record has zone information
  const bbidRecord = bbid ? lookupBBID(bbid) : null;
  const hasSelectedZone = false; // TODO: Add zone field to BBID record or create separate zone selection tracking
  
  if (!hasSelectedZone) {
    return {
      title: 'Select Your Investment Zone',
      description: 'Choose from 8 economic zones with tailored incentives. Get zone recommendations based on your sector.',
      ctaLabel: 'Explore Zones',
      targetTab: 'zones',
      priority: 'high',
      scrollTarget: currentTab === 'zones' ? 'zone-map' : undefined
    };
  }

  // 6. Check Banking Setup
  const hasBankConnection = false; // TODO: Integrate with bank connection tracking
  
  if (!hasBankConnection) {
    return {
      title: 'Connect Your Bank Account',
      description: 'Link your bank to enable instant payments, FX conversion, and escrow services. Choose from 10+ partner banks.',
      ctaLabel: 'Connect Bank',
      targetTab: 'banking',
      priority: 'high',
      scrollTarget: currentTab === 'banking' ? 'bank-selector' : undefined
    };
  }

  // ===== MEDIUM PRIORITY CHECKS (Priority 3) =====

  // 7. Check Compliance Status
  const hasComplianceExpiring = false; // TODO: Integrate with compliance engine
  
  if (hasComplianceExpiring) {
    return {
      title: 'Renew Environmental Clearance',
      description: 'Your environmental clearance expires in 30 days. Renew now to avoid service disruptions.',
      ctaLabel: 'Renew Now',
      targetTab: 'compliance',
      priority: 'medium'
    };
  }

  // 8. Check Incentive Opportunities
  const hasAppliedForIncentives = false; // TODO: Integrate with incentive engine
  
  if (!hasAppliedForIncentives) {
    return {
      title: 'Apply for Incentives You Qualify For',
      description: 'Based on your sector and investment size, you may qualify for tax holidays and duty exemptions.',
      ctaLabel: 'Check Eligibility',
      targetTab: 'intelligencelab',
      priority: 'medium',
      scrollTarget: currentTab === 'intelligencelab' ? 'incentive-calculator' : undefined
    };
  }

  // 9. Check Visa Requirements
  const hasAppliedForVisa = false; // TODO: Integrate with visa engine
  
  if (!hasAppliedForVisa) {
    return {
      title: 'Apply for Work Permits',
      description: 'Bring your key personnel to Bangladesh. Apply for investor visas and work permits.',
      ctaLabel: 'Apply Now',
      targetTab: 'expansion',
      priority: 'medium'
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
      priority: 'low'
    };
  }

  // ===== DEFAULT: GAMIFICATION BRIDGE =====
  
  // If all operational tasks are complete, guide to Arena
  return {
    title: 'Improve Your Investor Standing',
    description: 'All critical tasks complete! Track your performance, earn achievements, and compete on the leaderboard.',
    ctaLabel: 'Enter Arena',
    targetTab: 'arena',
    priority: 'low'
  };
}

/**
 * 🎯 GET CONTEXT-AWARE ACTION
 * Returns action optimized for current tab context
 */
export function getContextAwareAction(state: InvestorState): NextBestAction {
  const action = getNextBestAction(state);
  
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
 * 🎯 GET ALL PENDING ACTIONS
 * Returns full list of pending actions (for advanced users)
 */
export function getAllPendingActions(state: InvestorState): NextBestAction[] {
  // This would return multiple actions
  // For now, return single action
  // TODO: Implement full action queue
  return [getNextBestAction(state)];
}