// 🏦 Bank Document Generator
// Generates bank documents for Document Vault based on bank state

import { Document } from '@/app/data/mockData';
import { BankDataProvider } from './bankDataProvider';

export function generateBankDocuments(investorId: string): Document[] {
  const bankState = BankDataProvider.getBankState(investorId);
  const bankDocuments: Document[] = [];

  if (!bankState) return bankDocuments;

  // Get bank name
  const bankPartner = BankDataProvider.getBankById(bankState.bankId);
  const bankName = bankPartner?.name || 'Bank';

  // 1. Corporate Account Opening Documents
  if (bankState.corporateAccount?.status === 'active') {
    bankDocuments.push({
      id: `bank-doc-account-${investorId}`,
      name: 'Corporate Account Details',
      type: 'Financial',
      uploadDate: bankState.corporateAccount.openedDate,
      status: 'approved',
      approvedBy: `${bankName} Bank System`,
      fileUrl: `/documents/bank/corporate_account_${investorId}.pdf`,
      category: 'financial',
      source: 'bank_system'
    });

    bankDocuments.push({
      id: `bank-doc-account-cert-${investorId}`,
      name: 'Account Opening Certificate',
      type: 'Financial',
      uploadDate: bankState.corporateAccount.openedDate,
      status: 'approved',
      approvedBy: `${bankName} Bank System`,
      fileUrl: `/documents/bank/account_certificate_${investorId}.pdf`,
      category: 'financial',
      source: 'bank_system'
    });
  }

  // 2. KYC Verification Documents
  if (bankState.kycStatus?.status === 'approved') {
    bankDocuments.push({
      id: `bank-doc-kyc-${investorId}`,
      name: 'Bank KYC Verification Report',
      type: 'Compliance',
      uploadDate: new Date().toISOString(), // Use current date as KYC doesn't have a verified date
      status: 'approved',
      approvedBy: `${bankName} Compliance Officer`,
      fileUrl: `/documents/bank/kyc_verification_${investorId}.pdf`,
      category: 'compliance',
      source: 'bank_system'
    });
  }

  // 3. Escrow Account Documents
  if (bankState.escrowAccount?.status === 'active' || bankState.escrowAccount?.status === 'released') {
    bankDocuments.push({
      id: `bank-doc-escrow-${investorId}`,
      name: 'Escrow Agreement',
      type: 'Legal',
      uploadDate: bankState.escrowAccount.createdDate,
      status: 'approved',
      approvedBy: `${bankName} Legal Department`,
      fileUrl: `/documents/bank/escrow_agreement_${investorId}.pdf`,
      category: 'legal',
      source: 'bank_system'
    });

    bankDocuments.push({
      id: `bank-doc-escrow-confirmation-${investorId}`,
      name: 'Escrow Fund Confirmation',
      type: 'Financial',
      uploadDate: bankState.escrowAccount.createdDate,
      status: 'approved',
      approvedBy: `${bankName} Bank System`,
      fileUrl: `/documents/bank/escrow_confirmation_${investorId}.pdf`,
      category: 'financial',
      source: 'bank_system'
    });

    // If escrow is released, add release document
    if (bankState.escrowAccount?.status === 'released' && bankState.escrowAccount.releasedDate) {
      bankDocuments.push({
        id: `bank-doc-escrow-release-${investorId}`,
        name: 'Escrow Release Certificate',
        type: 'Financial',
        uploadDate: bankState.escrowAccount.releasedDate,
        status: 'approved',
        approvedBy: `${bankName} Bank Manager`,
        fileUrl: `/documents/bank/escrow_release_${investorId}.pdf`,
        category: 'financial',
        source: 'bank_system'
      });
    }
  }

  // 4. Letter of Credit Documents
  if (bankState.letterOfCredit?.status === 'issued') {
    bankDocuments.push({
      id: `bank-doc-lc-${investorId}`,
      name: `Letter of Credit #${bankState.letterOfCredit.lcNumber}`,
      type: 'Financial',
      uploadDate: bankState.letterOfCredit.issuedDate,
      status: 'approved',
      approvedBy: `${bankName} Trade Finance`,
      fileUrl: `/documents/bank/lc_${bankState.letterOfCredit.lcNumber}.pdf`,
      category: 'financial',
      source: 'bank_system'
    });

    bankDocuments.push({
      id: `bank-doc-lc-terms-${investorId}`,
      name: 'LC Terms and Conditions',
      type: 'Legal',
      uploadDate: bankState.letterOfCredit.issuedDate,
      status: 'approved',
      approvedBy: `${bankName} Legal Department`,
      fileUrl: `/documents/bank/lc_terms_${bankState.letterOfCredit.lcNumber}.pdf`,
      category: 'legal',
      source: 'bank_system'
    });
  }

  // 5. Loan Pre-Approval Documents
  if (bankState.loanApplication?.status === 'preapproved' || bankState.loanApplication?.status === 'approved') {
    bankDocuments.push({
      id: `bank-doc-loan-${investorId}`,
      name: 'Investment Loan Pre-Approval Letter',
      type: 'Financial',
      uploadDate: bankState.loanApplication.preApprovedDate || bankState.loanApplication.appliedDate,
      status: 'approved',
      approvedBy: `${bankName} Credit Committee`,
      fileUrl: `/documents/bank/loan_preapproval_${investorId}.pdf`,
      category: 'financial',
      source: 'bank_system'
    });

    bankDocuments.push({
      id: `bank-doc-loan-terms-${investorId}`,
      name: 'Loan Terms Sheet',
      type: 'Financial',
      uploadDate: bankState.loanApplication.preApprovedDate || bankState.loanApplication.appliedDate,
      status: 'approved',
      approvedBy: `${bankName} Credit Officer`,
      fileUrl: `/documents/bank/loan_terms_${investorId}.pdf`,
      category: 'financial',
      source: 'bank_system'
    });
  }

  return bankDocuments;
}

// Helper to check if document is from bank system
export function isBankDocument(doc: Document): boolean {
  return doc.source === 'bank_system' || doc.approvedBy?.includes('Bank');
}