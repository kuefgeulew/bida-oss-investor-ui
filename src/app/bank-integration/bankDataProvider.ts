// Bank Data Provider - Single source of truth for all bank data across roles
// Pattern: Same architecture as officerDataEngine - one provider for Investor, Officer, Admin

import { 
  BankState, 
  MultiBankState, 
  BankMetrics, 
  BankMessage,
  BANK_PARTNERS,
  getBankById,
  BankPartner 
} from './bankTypes';

// ============================================================================
// IN-MEMORY MULTI-BANK STATE STORE
// ============================================================================

const bankStates: Map<string, MultiBankState> = new Map();
const bankMessages: BankMessage[] = [];

// ============================================================================
// INITIALIZATION
// ============================================================================

export function initializeMultiBankState(
  investorId: string,
  investorName: string,
  applicationId: string,
  defaultBank: string = 'brac'
): void {
  if (bankStates.has(investorId)) return;

  const multiBankState: MultiBankState = {
    investorId,
    investorName,
    applicationId,
    selectedBank: defaultBank,
    banks: {}
  };

  // Initialize default bank
  multiBankState.banks[defaultBank] = createEmptyBankState(
    investorId,
    investorName,
    applicationId,
    defaultBank
  );

  bankStates.set(investorId, multiBankState);
}

function createEmptyBankState(
  investorId: string,
  investorName: string,
  applicationId: string,
  bankId: string
): BankState {
  return {
    investorId,
    investorName,
    applicationId,
    bankId,
    kycStatus: {
      status: 'not_started',
      documents: {
        passport: false,
        businessRegistration: false,
        proofOfAddress: false,
        sourceOfFunds: false
      }
    },
    fxQuotes: [],
    bankReadinessScore: 0,
    completedSteps: [],
    pendingSteps: ['Complete KYC', 'Open Corporate Account', 'Setup Escrow', 'Issue LC', 'Pre-approve Loan']
  };
}

// ============================================================================
// BANK SELECTION
// ============================================================================

export function selectBank(investorId: string, bankId: string): boolean {
  const multiState = bankStates.get(investorId);
  if (!multiState) return false;

  const bank = getBankById(bankId);
  if (!bank) return false;

  // Initialize bank state if doesn't exist
  if (!multiState.banks[bankId]) {
    multiState.banks[bankId] = createEmptyBankState(
      multiState.investorId,
      multiState.investorName,
      multiState.applicationId,
      bankId
    );
  }

  multiState.selectedBank = bankId;
  return true;
}

export function getSelectedBank(investorId: string): string {
  return bankStates.get(investorId)?.selectedBank || 'brac';
}

export function getSelectedBankPartner(investorId: string): BankPartner | undefined {
  const bankId = getSelectedBank(investorId);
  return getBankById(bankId);
}

// ============================================================================
// STATE RETRIEVAL
// ============================================================================

export function getBankState(investorId: string, bankId?: string): BankState | null {
  const multiState = bankStates.get(investorId);
  if (!multiState) return null;

  const targetBank = bankId || multiState.selectedBank;
  return multiState.banks[targetBank] || null;
}

export function getAllBankStates(investorId: string): { [bankId: string]: BankState } {
  const multiState = bankStates.get(investorId);
  return multiState?.banks || {};
}

export function getMultiBankState(investorId: string): MultiBankState | null {
  return bankStates.get(investorId) || null;
}

// ============================================================================
// STATE UPDATES
// ============================================================================

export function updateBankState(
  investorId: string,
  updates: Partial<BankState>,
  bankId?: string
): boolean {
  const multiState = bankStates.get(investorId);
  if (!multiState) return false;

  const targetBank = bankId || multiState.selectedBank;
  const currentState = multiState.banks[targetBank];
  if (!currentState) return false;

  multiState.banks[targetBank] = {
    ...currentState,
    ...updates
  };

  // Recalculate readiness score
  calculateBankReadinessScore(investorId, targetBank);

  return true;
}

// ============================================================================
// READINESS SCORE CALCULATION
// ============================================================================

function calculateBankReadinessScore(investorId: string, bankId: string): void {
  const multiState = bankStates.get(investorId);
  if (!multiState) return;

  const state = multiState.banks[bankId];
  if (!state) return;

  let score = 0;
  const completedSteps: string[] = [];
  const pendingSteps: string[] = [];

  // KYC = 20%
  if (state.kycStatus.status === 'approved') {
    score += 20;
    completedSteps.push('KYC Verified');
  } else {
    pendingSteps.push('Complete KYC');
  }

  // Corporate Account = 20%
  if (state.corporateAccount?.status === 'active') {
    score += 20;
    completedSteps.push('Corporate Account Opened');
  } else {
    pendingSteps.push('Open Corporate Account');
  }

  // Escrow = 20%
  if (state.escrowAccount?.status === 'active' || state.escrowAccount?.status === 'released') {
    score += 20;
    completedSteps.push('Escrow Account Active');
  } else {
    pendingSteps.push('Setup Escrow');
  }

  // LC = 20%
  if (state.letterOfCredit?.status === 'issued') {
    score += 20;
    completedSteps.push('Letter of Credit Issued');
  } else {
    pendingSteps.push('Issue LC');
  }

  // Loan = 20%
  if (state.loanApplication?.status === 'preapproved' || state.loanApplication?.status === 'approved') {
    score += 20;
    completedSteps.push('Loan Pre-Approved');
  } else {
    pendingSteps.push('Pre-approve Loan');
  }

  // Directly update the state without calling updateBankState (prevents infinite recursion)
  multiState.banks[bankId] = {
    ...state,
    bankReadinessScore: score,
    completedSteps,
    pendingSteps
  };
}

// ============================================================================
// BANK READINESS SUMMARY (FOR UI)
// ============================================================================

export interface BankReadinessSummary {
  selectedBank: BankPartner | undefined;
  readinessScore: number;
  kycComplete: boolean;
  accountActive: boolean;
  escrowActive: boolean;
  lcIssued: boolean;
  loanPreapproved: boolean;
  completedSteps: string[];
  pendingSteps: string[];
}

export function getBankReadinessSummary(investorId: string): BankReadinessSummary {
  const bankId = getSelectedBank(investorId);
  const state = getBankState(investorId);
  const bank = getBankById(bankId);

  if (!state) {
    return {
      selectedBank: bank,
      readinessScore: 0,
      kycComplete: false,
      accountActive: false,
      escrowActive: false,
      lcIssued: false,
      loanPreapproved: false,
      completedSteps: [],
      pendingSteps: []
    };
  }

  return {
    selectedBank: bank,
    readinessScore: state.bankReadinessScore,
    kycComplete: state.kycStatus.status === 'approved',
    accountActive: state.corporateAccount?.status === 'active',
    escrowActive: state.escrowAccount?.status === 'active' || state.escrowAccount?.status === 'released',
    lcIssued: state.letterOfCredit?.status === 'issued',
    loanPreapproved: state.loanApplication?.status === 'preapproved' || state.loanApplication?.status === 'approved',
    completedSteps: state.completedSteps,
    pendingSteps: state.pendingSteps
  };
}

// ============================================================================
// MESSAGES
// ============================================================================

export function addBankMessage(message: Omit<BankMessage, 'id' | 'timestamp' | 'read'>): void {
  bankMessages.push({
    ...message,
    id: `bank-msg-${Date.now()}-${Math.random()}`,
    timestamp: new Date().toISOString(),
    read: false
  });
}

export function getBankMessages(
  investorId: string,
  filters?: { bankId?: string; category?: string; unreadOnly?: boolean }
): BankMessage[] {
  let messages = bankMessages.filter(m => 
    m.to === 'investor' || m.to === 'officer'
  );

  if (filters?.bankId) {
    messages = messages.filter(m => m.bankId === filters.bankId);
  }

  if (filters?.category) {
    messages = messages.filter(m => m.category === filters.category);
  }

  if (filters?.unreadOnly) {
    messages = messages.filter(m => !m.read);
  }

  return messages.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function markBankMessageRead(messageId: string): void {
  const message = bankMessages.find(m => m.id === messageId);
  if (message) message.read = true;
}

// ============================================================================
// ADMIN ANALYTICS
// ============================================================================

export function getBankMetrics(): BankMetrics {
  const byBank: { [bankId: string]: any } = {};

  // Initialize all banks
  BANK_PARTNERS.forEach(bank => {
    byBank[bank.id] = {
      totalFDIFinanced: 0,
      lcsIssued: 0,
      escrowAccountsActive: 0,
      avgBankReadinessTime: 0,
      totalCorporateAccounts: 0,
      totalLoansPreapproved: 0,
      averageLoanAmount: 0
    };
  });

  // Aggregate data from all investor states
  let overallFDI = 0;
  let overallLCs = 0;
  let overallEscrows = 0;
  let overallAccounts = 0;
  let overallLoans = 0;
  let totalLoanAmount = 0;

  bankStates.forEach(multiState => {
    Object.entries(multiState.banks).forEach(([bankId, state]) => {
      if (state.corporateAccount?.status === 'active') {
        byBank[bankId].totalCorporateAccounts++;
        overallAccounts++;
      }

      if (state.escrowAccount?.status === 'active') {
        byBank[bankId].escrowAccountsActive++;
        byBank[bankId].totalFDIFinanced += state.escrowAccount.amount;
        overallEscrows++;
        overallFDI += state.escrowAccount.amount;
      }

      if (state.letterOfCredit?.status === 'issued') {
        byBank[bankId].lcsIssued++;
        overallLCs++;
      }

      if (state.loanApplication?.status === 'preapproved' || state.loanApplication?.status === 'approved') {
        byBank[bankId].totalLoansPreapproved++;
        byBank[bankId].averageLoanAmount = state.loanApplication.amount;
        overallLoans++;
        totalLoanAmount += state.loanApplication.amount;
      }
    });
  });

  return {
    byBank,
    overall: {
      totalFDIFinanced: overallFDI,
      lcsIssued: overallLCs,
      escrowAccountsActive: overallEscrows,
      avgBankReadinessTime: 3.2, // Mock average
      totalCorporateAccounts: overallAccounts,
      totalLoansPreapproved: overallLoans,
      averageLoanAmount: overallLoans > 0 ? totalLoanAmount / overallLoans : 0
    }
  };
}

// ============================================================================
// OFFICER VISIBILITY HELPERS
// ============================================================================

export interface OfficerBankView {
  investorId: string;
  investorName: string;
  selectedBank: BankPartner | undefined;
  bankReadiness: number;
  kycStatus: string;
  accountOpened: boolean;
  escrowActive: boolean;
  lcIssued: boolean;
  loanStatus: string;
  recentBankActivity: string[];
}

export function getOfficerBankView(investorId: string): OfficerBankView | null {
  const summary = getBankReadinessSummary(investorId);
  const state = getBankState(investorId);

  if (!state) return null;

  const recentActivity: string[] = [];
  if (summary.kycComplete) recentActivity.push('KYC verified');
  if (summary.accountActive) recentActivity.push('Corporate account opened');
  if (summary.escrowActive) recentActivity.push('Escrow activated');
  if (summary.lcIssued) recentActivity.push('LC issued');
  if (summary.loanPreapproved) recentActivity.push('Loan pre-approved');

  return {
    investorId,
    investorName: state.investorName,
    selectedBank: summary.selectedBank,
    bankReadiness: summary.readinessScore,
    kycStatus: state.kycStatus.status,
    accountOpened: summary.accountActive,
    escrowActive: summary.escrowActive,
    lcIssued: summary.lcIssued,
    loanStatus: state.loanApplication?.status || 'not_applied',
    recentBankActivity: recentActivity
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export const BankDataProvider = {
  // Init
  initialize: initializeMultiBankState,
  
  // Bank Selection
  selectBank,
  getSelectedBank,
  getSelectedBankPartner,
  
  // State
  getBankState,
  getAllBankStates,
  getMultiBankState,
  updateBankState,
  
  // Summaries
  getBankReadinessSummary,
  getOfficerBankView,
  
  // Messages
  addBankMessage,
  getBankMessages,
  markBankMessageRead,
  
  // Analytics
  getBankMetrics,
  
  // Utilities
  getBankPartners: () => BANK_PARTNERS,
  getBankById
};