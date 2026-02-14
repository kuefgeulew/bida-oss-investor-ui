// 💰 PAYMENT ENGINE — Transaction orchestration and state management
// ARCHITECTURE: Business logic for payment processing. Reads paymentRegistry + agencyWorkflowEngine.

import { paymentRegistry, getPaymentInfo, type PaymentMetadata } from './paymentRegistry';

export interface PaymentInvoice {
  invoiceId: string;
  bbid: string; // Business Bangladesh ID
  investorId?: string; // Legacy compatibility
  serviceId: string;
  serviceName: string;
  feeAmount: number;
  payableAgency: string;
  status: 'pending' | 'paid' | 'waived' | 'overdue';
  generatedDate: string;
  dueDate: string;
  paidDate?: string;
  transactionId?: string;
  paymentMethod?: 'bank_transfer' | 'card' | 'mobile_banking' | 'treasury_challan';
  challanNumber?: string;
}

export interface PaymentReceipt {
  receiptId: string;
  invoiceId: string;
  bbid: string;
  transactionId: string;
  serviceId: string;
  serviceName: string;
  amount: number;
  agency: string;
  paidDate: string;
  paymentMethod: string;
  challanNumber?: string;
  receiptUrl?: string; // PDF download URL
}

// In-memory payment state (replace with database in production)
const paymentInvoices: Map<string, PaymentInvoice> = new Map();
const paymentReceipts: Map<string, PaymentReceipt> = new Map();

/**
 * 🧾 GENERATE INVOICE
 * Creates a payment invoice for a specific service
 */
export function generateInvoice(
  bbid: string,
  serviceId: string,
  investorId?: string
): PaymentInvoice | null {
  const paymentInfo = getPaymentInfo(serviceId);
  if (!paymentInfo) {
    console.error(`[Payment Engine] No payment info for service: ${serviceId}`);
    return null;
  }

  // Don't create invoice for free services
  if (paymentInfo.feeAmount === 0) {
    return null;
  }

  const invoiceId = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const generatedDate = new Date().toISOString();
  const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days

  const invoice: PaymentInvoice = {
    invoiceId,
    bbid,
    investorId,
    serviceId,
    serviceName: paymentInfo.description,
    feeAmount: paymentInfo.feeAmount,
    payableAgency: paymentInfo.payableAgency,
    status: 'pending',
    generatedDate,
    dueDate
  };

  paymentInvoices.set(invoiceId, invoice);
  return invoice;
}

/**
 * 💳 MARK PAYMENT AS PAID
 * Records successful payment transaction
 */
export function markPaid(
  transactionId: string,
  invoiceId: string,
  paymentMethod: PaymentInvoice['paymentMethod'],
  challanNumber?: string
): PaymentReceipt | null {
  const invoice = paymentInvoices.get(invoiceId);
  if (!invoice) {
    console.error(`[Payment Engine] Invoice not found: ${invoiceId}`);
    return null;
  }

  if (invoice.status === 'paid') {
    console.warn(`[Payment Engine] Invoice already paid: ${invoiceId}`);
    return paymentReceipts.get(invoice.transactionId!) || null;
  }

  // Update invoice
  invoice.status = 'paid';
  invoice.paidDate = new Date().toISOString();
  invoice.transactionId = transactionId;
  invoice.paymentMethod = paymentMethod;
  invoice.challanNumber = challanNumber;

  // Generate receipt
  const receipt = generateReceipt(transactionId, invoice);
  
  return receipt;
}

/**
 * 📄 GENERATE RECEIPT
 * Creates payment receipt after successful payment
 */
export function generateReceipt(
  transactionId: string,
  invoice: PaymentInvoice
): PaymentReceipt {
  const receiptId = `RCP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const receipt: PaymentReceipt = {
    receiptId,
    invoiceId: invoice.invoiceId,
    bbid: invoice.bbid,
    transactionId,
    serviceId: invoice.serviceId,
    serviceName: invoice.serviceName,
    amount: invoice.feeAmount,
    agency: invoice.payableAgency,
    paidDate: invoice.paidDate!,
    paymentMethod: invoice.paymentMethod!,
    challanNumber: invoice.challanNumber,
    receiptUrl: `/api/receipts/${receiptId}.pdf` // Mock PDF endpoint
  };

  paymentReceipts.set(receiptId, receipt);
  return receipt;
}

/**
 * 📋 GET PENDING PAYMENTS
 * Returns all unpaid invoices for a business
 */
export function getPendingPayments(bbid: string): PaymentInvoice[] {
  const pending: PaymentInvoice[] = [];
  
  paymentInvoices.forEach(invoice => {
    if (invoice.bbid === bbid && invoice.status === 'pending') {
      // Check if overdue
      if (new Date(invoice.dueDate) < new Date()) {
        invoice.status = 'overdue';
      }
      pending.push(invoice);
    }
  });

  return pending.sort((a, b) => 
    new Date(a.generatedDate).getTime() - new Date(b.generatedDate).getTime()
  );
}

/**
 * 📋 GET ALL PAYMENTS (for a business)
 */
export function getAllPayments(bbid: string): PaymentInvoice[] {
  const payments: PaymentInvoice[] = [];
  
  paymentInvoices.forEach(invoice => {
    if (invoice.bbid === bbid) {
      payments.push(invoice);
    }
  });

  return payments.sort((a, b) => 
    new Date(b.generatedDate).getTime() - new Date(a.generatedDate).getTime()
  );
}

/**
 * 🧾 GET INVOICE BY ID
 */
export function getInvoice(invoiceId: string): PaymentInvoice | null {
  return paymentInvoices.get(invoiceId) || null;
}

/**
 * 📄 GET RECEIPT BY ID
 */
export function getReceipt(receiptId: string): PaymentReceipt | null {
  return paymentReceipts.get(receiptId) || null;
}

/**
 * 📄 GET ALL RECEIPTS (for a business)
 */
export function getAllReceipts(bbid: string): PaymentReceipt[] {
  const receipts: PaymentReceipt[] = [];
  
  paymentReceipts.forEach(receipt => {
    if (receipt.bbid === bbid) {
      receipts.push(receipt);
    }
  });

  return receipts.sort((a, b) => 
    new Date(b.paidDate).getTime() - new Date(a.paidDate).getTime()
  );
}

/**
 * 💰 GET TOTAL PAID AMOUNT
 */
export function getTotalPaidAmount(bbid: string): number {
  const receipts = getAllReceipts(bbid);
  return receipts.reduce((total, receipt) => total + receipt.amount, 0);
}

/**
 * 💰 GET TOTAL PENDING AMOUNT
 */
export function getTotalPendingAmount(bbid: string): number {
  const pending = getPendingPayments(bbid);
  return pending.reduce((total, invoice) => total + invoice.feeAmount, 0);
}

/**
 * 📊 ADMIN: GET ALL PAYMENTS ACROSS ALL BBIDs
 * For revenue analytics and admin dashboards
 */
export function getAllPaymentsAcrossAllBBIDs(): PaymentInvoice[] {
  return Array.from(paymentInvoices.values());
}

/**
 * ✅ CHECK IF SERVICE IS PAID
 * Critical for workflow progression
 */
export function isServicePaid(bbid: string, serviceId: string): boolean {
  const paymentInfo = getPaymentInfo(serviceId);
  
  // Free services are always "paid"
  if (!paymentInfo || paymentInfo.feeAmount === 0) {
    return true;
  }

  // Check if there's a paid invoice for this service
  let isPaid = false;
  paymentInvoices.forEach(invoice => {
    if (invoice.bbid === bbid && invoice.serviceId === serviceId && invoice.status === 'paid') {
      isPaid = true;
    }
  });

  return isPaid;
}

/**
 * 🔄 AUTO-GENERATE INVOICES FOR WORKFLOW
 * Called when a workflow step requires payment
 */
export function autoGenerateInvoicesForWorkflow(
  bbid: string,
  serviceIds: string[],
  investorId?: string
): PaymentInvoice[] {
  const invoices: PaymentInvoice[] = [];

  serviceIds.forEach(serviceId => {
    // Skip if already paid or has existing pending invoice
    if (isServicePaid(bbid, serviceId)) {
      return;
    }

    // Check for existing pending invoice
    const existingPending = getPendingPayments(bbid).find(inv => inv.serviceId === serviceId);
    if (existingPending) {
      invoices.push(existingPending);
      return;
    }

    // Generate new invoice
    const invoice = generateInvoice(bbid, serviceId, investorId);
    if (invoice) {
      invoices.push(invoice);
    }
  });

  return invoices;
}

// 🎯 MOCK DATA: Pre-populate some sample invoices for testing
function initializeMockPayments() {
  // Sample investor with pending payments
  const mockBBID = 'BBID-2026-001';
  
  const invoice1 = generateInvoice(mockBBID, 'rjsc-001', 'INV-001');
  const invoice2 = generateInvoice(mockBBID, 'nbr-002', 'INV-001');
  const invoice3 = generateInvoice(mockBBID, 'fire-001', 'INV-001');

  // Mark one as paid
  if (invoice1) {
    markPaid('TXN-2026-001', invoice1.invoiceId, 'bank_transfer', 'CH-123456');
  }
}

// Initialize mock data
if (typeof window !== 'undefined') {
  initializeMockPayments();
}