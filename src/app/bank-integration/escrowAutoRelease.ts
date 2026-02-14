// 🏦 Escrow Auto-Release Hook
// Automatically releases escrow when application is approved

import { BankDataProvider } from './bankDataProvider';
import { updateBankState, getBankState } from './bankMockEngine';

// Function to trigger escrow release when approval is complete
export function triggerEscrowRelease(investorId: string, applicationId: string): void {
  const bankState = getBankState(investorId);
  
  if (!bankState) {
    console.log('[Escrow Auto-Release] No bank state found for investor:', investorId);
    return;
  }

  // Check if escrow is active
  if (bankState.escrowAccount?.status !== 'active') {
    console.log('[Escrow Auto-Release] No active escrow for investor:', investorId);
    return;
  }

  // Release escrow
  const releasedDate = new Date().toISOString();
  
  updateBankState(investorId, {
    escrowAccount: {
      ...bankState.escrowAccount,
      status: 'released',
      releasedDate: releasedDate,
      releaseReason: 'Final approval granted by BIDA'
    }
  });

  console.log(`[Escrow Auto-Release] ✅ Escrow released for investor ${investorId} on ${releasedDate}`);
  
  // Add system notification
  BankDataProvider.addBankMessage({
    investorId,
    type: 'escrow_released',
    message: `Escrow funds released! $${(bankState.escrowAccount.amount / 1000).toFixed(0)}K transferred to corporate account. You can now proceed with operations.`,
    priority: 'high',
    actionRequired: false,
    from: `${bankState.selectedBank} Bank System`,
    bankId: bankState.selectedBank
  });
}

// Mock function - would be called when application status changes to "approved"
export function onApplicationApproved(investorId: string, applicationId: string): void {
  console.log('[Application Approved] Triggering post-approval workflows...');
  
  // Auto-release escrow
  triggerEscrowRelease(investorId, applicationId);
  
  // Other post-approval actions could go here...
}

// Simulated application approval for demo purposes
export function simulateApproval(investorId: string, applicationId: string): void {
  setTimeout(() => {
    console.log(`[Demo] Simulating approval for investor ${investorId}...`);
    onApplicationApproved(investorId, applicationId);
  }, 1000);
}

// Check escrow status
export function getEscrowStatus(investorId: string): {
  hasEscrow: boolean;
  status?: 'active' | 'released';
  amount?: number;
  releasedDate?: string;
} {
  const bankState = getBankState(investorId);
  
  if (!bankState || !bankState.escrowAccount) {
    return { hasEscrow: false };
  }

  return {
    hasEscrow: true,
    status: bankState.escrowAccount.status as 'active' | 'released',
    amount: bankState.escrowAccount.amount,
    releasedDate: bankState.escrowAccount.releasedDate
  };
}
