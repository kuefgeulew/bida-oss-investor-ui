// BRAC Bank Integration API - Handles bank API communication and data exchange

import { 
  BankAccount, 
  KYCStatus, 
  EscrowAccount, 
  LetterOfCredit, 
  LoanApplication,
  FXQuote 
} from './bankTypes';
import { BankDataProvider } from './bankDataProvider';
import {
  getBankState,
  updateBankState,
  completeStep,
  addBankMessage,
  calculateReadinessScore,
} from './bankMockEngine';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate realistic account number
function generateAccountNumber(): string {
  const prefix = 'BRAC';
  const digits = Math.floor(10000000 + Math.random() * 90000000);
  return `${prefix}${digits}`;
}

// Generate realistic LC number
function generateLCNumber(): string {
  const prefix = 'LC';
  const year = new Date().getFullYear();
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${year}${digits}`;
}

// Generate realistic escrow ID
function generateEscrowId(): string {
  const prefix = 'ESC';
  const timestamp = Date.now().toString().slice(-8);
  return `${prefix}${timestamp}`;
}

// Generate realistic loan ID
function generateLoanId(): string {
  const prefix = 'LOAN';
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${digits}`;
}

/**
 * Perform KYC verification
 */
export async function performKYC(investorId: string): Promise<KYCStatus> {
  await delay(1500); // Simulate API call

  const state = getBankState(investorId);
  if (!state) {
    throw new Error('Bank state not initialized');
  }

  const kycStatus: KYCStatus = {
    status: 'approved',
    submittedDate: new Date().toISOString(),
    approvedDate: new Date().toISOString(),
    documents: {
      passport: true,
      businessRegistration: true,
      proofOfAddress: true,
      sourceOfFunds: true,
    },
  };

  updateBankState(investorId, { kycStatus });
  completeStep(investorId, 'Complete KYC');

  addBankMessage(investorId, {
    to: 'investor',
    subject: 'KYC Verification Approved',
    message: 'Your KYC verification has been successfully completed. You can now open a corporate account.',
    category: 'kyc',
  });

  return kycStatus;
}

/**
 * Open corporate bank account
 */
export async function openCorporateAccount(
  investorId: string,
  investorName: string
): Promise<BankAccount> {
  await delay(2000); // Simulate API call

  const state = getBankState(investorId);
  if (!state) {
    throw new Error('Bank state not initialized');
  }

  if (state.kycStatus.status !== 'approved') {
    throw new Error('KYC must be approved before opening account');
  }

  const account: BankAccount = {
    accountNumber: generateAccountNumber(),
    accountType: 'corporate',
    status: 'active',
    balance: 0,
    currency: 'USD',
    openedDate: new Date().toISOString(),
  };

  updateBankState(investorId, { corporateAccount: account });
  completeStep(investorId, 'Open Corporate Account');

  addBankMessage(investorId, {
    to: 'investor',
    subject: 'Corporate Account Opened Successfully',
    message: `Your corporate account ${account.accountNumber} has been activated. You can now use this account for business transactions.`,
    category: 'account',
  });

  // Notify officer
  addBankMessage(investorId, {
    to: 'officer',
    subject: `Corporate Account Opened - ${investorName}`,
    message: `BRAC Bank has opened a corporate account (${account.accountNumber}) for ${investorName}. Bank readiness verified.`,
    category: 'account',
  });

  return account;
}

/**
 * Create escrow account for conditional approval
 */
export async function createEscrow(
  investorId: string,
  applicationId: string,
  amount: number,
  purpose: string
): Promise<EscrowAccount> {
  await delay(1800); // Simulate API call

  const state = getBankState(investorId);
  if (!state) {
    throw new Error('Bank state not initialized');
  }

  if (!state.corporateAccount || state.corporateAccount.status !== 'active') {
    throw new Error('Active corporate account required');
  }

  const escrow: EscrowAccount = {
    escrowId: generateEscrowId(),
    applicationId,
    status: 'active',
    amount,
    currency: 'USD',
    purpose,
    createdDate: new Date().toISOString(),
    releaseConditions: [
      'All regulatory approvals obtained',
      'Environmental clearance issued',
      'Factory license granted',
      'BIDA officer approval',
    ],
  };

  updateBankState(investorId, { escrowAccount: escrow });
  completeStep(investorId, 'Create Escrow');

  addBankMessage(investorId, {
    to: 'investor',
    subject: 'Escrow Account Created',
    message: `Escrow account ${escrow.escrowId} created with ${amount.toLocaleString()} ${escrow.currency}. Funds will be released upon meeting all conditions.`,
    category: 'escrow',
  });

  addBankMessage(investorId, {
    to: 'officer',
    subject: `Escrow Created - ${state.investorName}`,
    message: `BRAC Bank has created an escrow account for ${state.investorName} with ${amount.toLocaleString()} USD. Release pending regulatory approvals.`,
    category: 'escrow',
  });

  return escrow;
}

/**
 * Issue Letter of Credit
 */
export async function issueLC(
  investorId: string,
  applicationId: string,
  amount: number,
  beneficiary: string,
  purpose: string
): Promise<LetterOfCredit> {
  await delay(2200); // Simulate API call

  const state = getBankState(investorId);
  if (!state) {
    throw new Error('Bank state not initialized');
  }

  if (!state.corporateAccount || state.corporateAccount.status !== 'active') {
    throw new Error('Active corporate account required');
  }

  const issuedDate = new Date();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 180); // 6 months validity

  const lc: LetterOfCredit = {
    lcNumber: generateLCNumber(),
    applicationId,
    status: 'issued',
    amount,
    currency: 'USD',
    beneficiary,
    purpose,
    issuedDate: issuedDate.toISOString(),
    expiryDate: expiryDate.toISOString(),
  };

  updateBankState(investorId, { letterOfCredit: lc });
  completeStep(investorId, 'Issue Letter of Credit');

  addBankMessage(investorId, {
    to: 'investor',
    subject: 'Letter of Credit Issued',
    message: `LC ${lc.lcNumber} has been issued for ${amount.toLocaleString()} ${lc.currency} in favor of ${beneficiary}. Valid until ${new Date(lc.expiryDate).toLocaleDateString()}.`,
    category: 'lc',
  });

  addBankMessage(investorId, {
    to: 'officer',
    subject: `LC Issued - ${state.investorName}`,
    message: `BRAC Bank issued LC ${lc.lcNumber} for ${amount.toLocaleString()} USD to ${beneficiary}. Purpose: ${purpose}`,
    category: 'lc',
  });

  return lc;
}

/**
 * Pre-approve investment loan
 */
export async function preApproveLoan(
  investorId: string,
  amount: number,
  purpose: string,
  term: number = 60 // months
): Promise<LoanApplication> {
  await delay(2500); // Simulate API call

  const state = getBankState(investorId);
  if (!state) {
    throw new Error('Bank state not initialized');
  }

  if (state.kycStatus.status !== 'approved') {
    throw new Error('KYC approval required');
  }

  const loan: LoanApplication = {
    loanId: generateLoanId(),
    status: 'preapproved',
    amount,
    currency: 'USD',
    interestRate: 7.2, // Indicative rate
    term,
    purpose,
    preApprovedDate: new Date().toISOString(),
  };

  updateBankState(investorId, { loanApplication: loan });
  completeStep(investorId, 'Apply for Loan');

  addBankMessage(investorId, {
    to: 'investor',
    subject: 'Investment Loan Pre-Approved',
    message: `Congratulations! Your loan application ${loan.loanId} for ${amount.toLocaleString()} ${loan.currency} has been pre-approved at ${loan.interestRate}% p.a. for ${term} months. Final approval subject to regulatory clearances.`,
    category: 'loan',
  });

  addBankMessage(investorId, {
    to: 'officer',
    subject: `Loan Pre-Approved - ${state.investorName}`,
    message: `BRAC Bank has pre-approved a ${amount.toLocaleString()} USD loan for ${state.investorName}. This demonstrates financial capability for the investment.`,
    category: 'loan',
  });

  return loan;
}

/**
 * Get FX quote
 */
export async function requestFXQuote(
  investorId: string,
  fromCurrency: string,
  toCurrency: string,
  amount: number
): Promise<FXQuote> {
  await delay(800); // Simulate API call

  // Mock exchange rates
  const rates: Record<string, number> = {
    'USD-BDT': 110.50,
    'EUR-BDT': 118.20,
    'GBP-BDT': 135.80,
    'CNY-BDT': 15.30,
    'BDT-USD': 0.00905,
  };

  const rateKey = `${fromCurrency}-${toCurrency}`;
  const rate = rates[rateKey] || 1;

  const validUntil = new Date();
  validUntil.setMinutes(validUntil.getMinutes() + 15); // 15 minutes validity

  const quote: FXQuote = {
    quoteId: `FX${Date.now()}`,
    fromCurrency,
    toCurrency,
    amount,
    exchangeRate: rate,
    quotedAmount: amount * rate,
    validUntil: validUntil.toISOString(),
    createdDate: new Date().toISOString(),
  };

  const state = getBankState(investorId);
  if (state) {
    const fxQuotes = [...state.fxQuotes, quote];
    updateBankState(investorId, { fxQuotes });
  }

  return quote;
}

/**
 * Release escrow (called by officer after approval)
 */
export async function releaseEscrow(investorId: string): Promise<EscrowAccount> {
  await delay(1500); // Simulate API call

  const state = getBankState(investorId);
  if (!state || !state.escrowAccount) {
    throw new Error('No escrow account found');
  }

  const releasedEscrow: EscrowAccount = {
    ...state.escrowAccount,
    status: 'released',
    releasedDate: new Date().toISOString(),
  };

  updateBankState(investorId, { escrowAccount: releasedEscrow });

  addBankMessage(investorId, {
    to: 'investor',
    subject: 'Escrow Funds Released',
    message: `Your escrow account ${releasedEscrow.escrowId} has been released. All conditions have been met. Funds are now available in your corporate account.`,
    category: 'escrow',
  });

  return releasedEscrow;
}

/**
 * Get bank readiness summary (for dashboard display)
 */
export function getBankReadinessSummary(investorId: string) {
  const state = getBankState(investorId);
  if (!state) {
    return {
      kycComplete: false,
      accountActive: false,
      escrowActive: false,
      lcIssued: false,
      loanPreapproved: false,
      readinessScore: 0,
    };
  }

  return {
    kycComplete: state.kycStatus.status === 'approved',
    accountActive: state.corporateAccount?.status === 'active',
    escrowActive: state.escrowAccount?.status === 'active',
    lcIssued: state.letterOfCredit?.status === 'issued',
    loanPreapproved: ['preapproved', 'approved', 'disbursed'].includes(state.loanApplication?.status || ''),
    readinessScore: calculateReadinessScore(state),
  };
}