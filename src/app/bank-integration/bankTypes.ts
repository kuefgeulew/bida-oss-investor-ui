// Bank Integration Types - Global FDI Banking Layer

// ============================================================================
// BANK PARTNER DEFINITIONS
// ============================================================================

export type BankCapability =
  | 'kyc'
  | 'corporate_account'
  | 'escrow'
  | 'lc'
  | 'fx'
  | 'loan'
  | 'repatriation'
  | 'project_finance';

export interface BankPartner {
  id: string;
  name: string;
  country: string;
  logo?: string;
  capabilities: BankCapability[];
  description: string;
  tier: 'premium' | 'standard';
  processingTime: {
    kyc: number; // hours
    accountOpening: number; // hours
    lcIssuance: number; // hours
    loanApproval: number; // days
  };
}

// FDI-Grade Bank Partners
export const BANK_PARTNERS: BankPartner[] = [
  {
    id: 'brac',
    name: 'BRAC Bank',
    country: 'Bangladesh',
    capabilities: ['kyc', 'corporate_account', 'escrow', 'lc', 'fx', 'loan', 'repatriation'],
    description: 'Leading SME bank with government partnership for FDI support',
    tier: 'premium',
    processingTime: {
      kyc: 2,
      accountOpening: 4,
      lcIssuance: 24,
      loanApproval: 7
    }
  },
  {
    id: 'dbs',
    name: 'DBS Bank',
    country: 'Singapore',
    capabilities: ['kyc', 'corporate_account', 'escrow', 'lc', 'fx', 'loan', 'repatriation', 'project_finance'],
    description: 'Asia\'s safest bank with advanced FDI financing solutions',
    tier: 'premium',
    processingTime: {
      kyc: 1,
      accountOpening: 2,
      lcIssuance: 12,
      loanApproval: 5
    }
  },
  {
    id: 'emirates',
    name: 'Emirates NBD',
    country: 'UAE',
    capabilities: ['kyc', 'corporate_account', 'escrow', 'lc', 'fx', 'loan', 'repatriation', 'project_finance'],
    description: 'Middle East\'s largest banking group specializing in cross-border investment',
    tier: 'premium',
    processingTime: {
      kyc: 2,
      accountOpening: 3,
      lcIssuance: 16,
      loanApproval: 6
    }
  },
  {
    id: 'kigali',
    name: 'Bank of Kigali',
    country: 'Rwanda',
    capabilities: ['kyc', 'corporate_account', 'escrow', 'lc', 'fx', 'loan'],
    description: 'Rwanda\'s largest bank supporting government FDI initiatives',
    tier: 'standard',
    processingTime: {
      kyc: 3,
      accountOpening: 6,
      lcIssuance: 48,
      loanApproval: 10
    }
  },
];

export function getBankById(bankId: string): BankPartner | undefined {
  return BANK_PARTNERS.find(bank => bank.id === bankId);
}

// ============================================================================
// CORE BANKING TYPES
// ============================================================================

export interface BankAccount {
  accountNumber: string;
  accountType: 'corporate' | 'escrow';
  status: 'pending' | 'active' | 'frozen';
  balance: number;
  currency: string;
  openedDate: string;
  bankId: string; // Track which bank
}

export interface KYCStatus {
  status: 'not_started' | 'pending' | 'approved' | 'rejected';
  submittedDate?: string;
  approvedDate?: string;
  documents: {
    passport: boolean;
    businessRegistration: boolean;
    proofOfAddress: boolean;
    sourceOfFunds: boolean;
  };
}

export interface EscrowAccount {
  escrowId: string;
  applicationId: string;
  status: 'not_created' | 'active' | 'released' | 'refunded';
  amount: number;
  currency: string;
  purpose: string;
  createdDate?: string;
  releaseConditions: string[];
  releasedDate?: string;
}

export interface LetterOfCredit {
  lcNumber: string;
  applicationId: string;
  status: 'not_issued' | 'issued' | 'utilized' | 'expired';
  amount: number;
  currency: string;
  beneficiary: string;
  purpose: string;
  issuedDate?: string;
  expiryDate?: string;
}

export interface LoanApplication {
  loanId: string;
  status: 'not_applied' | 'preapproved' | 'applied' | 'approved' | 'disbursed';
  amount: number;
  currency: string;
  interestRate: number;
  term: number; // months
  purpose: string;
  preApprovedDate?: string;
  approvedDate?: string;
}

export interface FXQuote {
  quoteId: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  exchangeRate: number;
  quotedAmount: number;
  validUntil: string;
  createdDate: string;
}

export interface BankState {
  investorId: string;
  investorName: string;
  applicationId: string;
  bankId: string; // NEW: Track which bank this state belongs to
  
  // Core Banking
  kycStatus: KYCStatus;
  corporateAccount?: BankAccount;
  
  // Investment Services
  escrowAccount?: EscrowAccount;
  letterOfCredit?: LetterOfCredit;
  loanApplication?: LoanApplication;
  
  // Supporting Services
  fxQuotes: FXQuote[];
  
  // Timeline
  bankReadinessScore: number; // 0-100
  completedSteps: string[];
  pendingSteps: string[];
}

export interface BankMessage {
  id: string;
  from: string; // Changed from 'BRAC Bank' to allow any bank
  bankId: string; // NEW: Track which bank sent this
  to: 'investor' | 'officer';
  subject: string;
  message: string;
  timestamp: string;
  category: 'kyc' | 'account' | 'escrow' | 'lc' | 'loan' | 'fx' | 'general' | 'repatriation';
  read: boolean;
}

export interface BankMetrics {
  byBank: {
    [bankId: string]: {
      totalFDIFinanced: number;
      lcsIssued: number;
      escrowAccountsActive: number;
      avgBankReadinessTime: number; // days
      totalCorporateAccounts: number;
      totalLoansPreapproved: number;
      averageLoanAmount: number;
    };
  };
  overall: {
    totalFDIFinanced: number;
    lcsIssued: number;
    escrowAccountsActive: number;
    avgBankReadinessTime: number;
    totalCorporateAccounts: number;
    totalLoansPreapproved: number;
    averageLoanAmount: number;
  };
}

// ============================================================================
// REPATRIATION & FX TYPES
// ============================================================================

export interface RepatriationRequest {
  requestId: string;
  investorId: string;
  amount: number;
  currency: string;
  purpose: 'profit' | 'capital' | 'dividend' | 'liquidation';
  status: 'pending' | 'approved' | 'processing' | 'completed' | 'rejected';
  requestedDate: string;
  approvedDate?: string;
  completedDate?: string;
  bankId: string;
  bbApprovalRequired: boolean; // Bangladesh Bank approval
  bbApprovalStatus?: 'pending' | 'approved' | 'rejected';
}

export interface FXConversion {
  conversionId: string;
  investorId: string;
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  exchangeRate: number;
  status: 'quote' | 'confirmed' | 'completed';
  quoteValidUntil?: string;
  executedDate?: string;
  bankId: string;
}