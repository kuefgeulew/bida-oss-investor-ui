// BRAC Bank State Engine - Centralized state management for bank integration
// Provides backward compatibility wrapper for BankDataProvider

import { BankState, BankMessage, BankMetrics } from './bankTypes';
import { BankDataProvider } from './bankDataProvider';

// ============================================================================
// BACKWARD COMPATIBILITY WRAPPERS
// These maintain the old API while using the new multi-bank provider
// ============================================================================

export function initBankState(investorId: string, investorName: string, applicationId: string): BankState {
  BankDataProvider.initialize(investorId, investorName, applicationId, 'brac');
  const state = BankDataProvider.getBankState(investorId);
  return state || createFallbackState(investorId, investorName, applicationId);
}

function createFallbackState(investorId: string, investorName: string, applicationId: string): BankState {
  return {
    investorId,
    investorName,
    applicationId,
    bankId: 'brac',
    kycStatus: {
      status: 'not_started',
      documents: {
        passport: false,
        businessRegistration: false,
        proofOfAddress: false,
        sourceOfFunds: false,
      },
    },
    fxQuotes: [],
    bankReadinessScore: 0,
    completedSteps: [],
    pendingSteps: [
      'Complete KYC',
      'Open Corporate Account',
      'Create Escrow',
      'Issue Letter of Credit',
      'Apply for Loan',
    ],
  };
}

export function getBankState(investorId: string): BankState | null {
  return BankDataProvider.getBankState(investorId);
}

export function updateBankState(investorId: string, updates: Partial<BankState>): BankState {
  const current = BankDataProvider.getBankState(investorId);
  if (!current) {
    throw new Error('Bank state not initialized for investor');
  }

  BankDataProvider.updateBankState(investorId, updates);
  return { ...current, ...updates };
}

export function calculateReadinessScore(state: BankState): number {
  let score = 0;

  if (state.kycStatus.status === 'approved') score += 20;
  if (state.corporateAccount?.status === 'active') score += 20;
  if (state.escrowAccount?.status === 'active' || state.escrowAccount?.status === 'released') score += 20;
  if (state.letterOfCredit?.status === 'issued') score += 20;
  if (state.loanApplication?.status === 'preapproved' || state.loanApplication?.status === 'approved') score += 20;

  return score;
}

export function getBankMetrics(): BankMetrics {
  return BankDataProvider.getBankMetrics();
}

export function addBankMessage(investorId: string, message: Omit<BankMessage, 'id' | 'timestamp' | 'from' | 'bankId' | 'read'>): void {
  BankDataProvider.addBankMessage({
    ...message,
    from: 'BRAC Bank',
    bankId: 'brac'
  });
}

export function getBankMessages(investorId: string): BankMessage[] {
  return BankDataProvider.getBankMessages(investorId);
}

export function markMessageAsRead(messageId: string): void {
  BankDataProvider.markBankMessageRead(messageId);
}

// Utility functions for tracking steps
export function completeStep(investorId: string, stepName: string): void {
  const state = BankDataProvider.getBankState(investorId);
  if (!state) return;

  const completedSteps = [...state.completedSteps];
  if (!completedSteps.includes(stepName)) {
    completedSteps.push(stepName);
  }

  const pendingSteps = state.pendingSteps.filter(s => s !== stepName);

  BankDataProvider.updateBankState(investorId, {
    completedSteps,
    pendingSteps
  });
}

export function getAllBankStates(): BankState[] {
  // Not implemented in new provider - kept for compatibility
  return [];
}

export function resetBankState(investorId: string): void {
  // Re-initialize with fresh state
  initBankState(investorId, '', '');
}

export function getBankReadinessSummary(investorId: string) {
  return BankDataProvider.getBankReadinessSummary(investorId);
}

// ============================================================================
// DEMO REGISTRATION SUPPORT
// Initialize bank account from registration data
// ============================================================================

export interface BankAccountInitData {
  bbid: string;
  investorId: string;
  bankName: string;
  accountType: string;
  initialDeposit: number;
  companyName: string;
}

/**
 * Initialize a bank account for demo investor during registration
 * This is a real engine call, not a shortcut
 */
export function initializeBankAccount(data: BankAccountInitData) {
  // Initialize bank state with BRAC as default
  BankDataProvider.initialize(data.investorId, data.companyName, data.bbid, 'brac');
  
  // Create corporate account with initial deposit
  const accountNumber = `BRAC-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
  
  const account = {
    accountNumber,
    accountType: data.accountType,
    balance: data.initialDeposit,
    currency: 'BDT',
    status: 'active' as const,
    openedDate: new Date().toISOString(),
  };

  // Update bank state with active account
  const state = BankDataProvider.getBankState(data.investorId);
  if (state) {
    BankDataProvider.updateBankState(data.investorId, {
      corporateAccount: account,
      kycStatus: {
        status: 'approved',
        documents: {
          passport: true,
          businessRegistration: true,
          proofOfAddress: true,
          sourceOfFunds: true,
        },
        submittedDate: new Date().toISOString(),
        approvedDate: new Date().toISOString(),
      },
      completedSteps: ['Complete KYC', 'Open Corporate Account'],
      pendingSteps: ['Create Escrow', 'Issue Letter of Credit', 'Apply for Loan'],
      bankReadinessScore: 40, // KYC (20) + Account (20)
    });
  }

  return account;
}