// 📦 BUNDLE ENGINE — Business logic for starter bundle management
// ARCHITECTURE: Business logic layer. Handles bundle purchases, tracking, and fulfillment.

import { starterBundles, getBundleById, type StarterBundle, type ServiceItem } from './bundleRegistry';
// Note: Bundle invoices are self-contained and don't use paymentEngine

export interface BundlePurchase {
  purchaseId: string;
  bbid: string;
  investorId?: string;
  companyName: string;
  bundleId: string;
  bundle: StarterBundle;
  purchaseDate: string;
  status: 'pending_payment' | 'paid' | 'in_progress' | 'completed' | 'cancelled';
  
  // Progress tracking
  servicesCompleted: string[]; // Array of serviceIds
  currentService?: string; // Currently processing service
  
  // Payment
  invoiceId?: string;
  amountPaid?: number;
  paymentDate?: string;
  
  // Timeline
  estimatedCompletionDate: string;
  actualCompletionDate?: string;
  
  // Assigned officer
  assignedOfficer?: string;
  
  // Notes
  notes?: string[];
}

export interface BundleProgress {
  purchaseId: string;
  bundleName: string;
  totalServices: number;
  completedServices: number;
  progressPercentage: number;
  remainingDays: number;
  status: BundlePurchase['status'];
  nextService?: ServiceItem;
}

// In-memory storage
const bundlePurchases: Map<string, BundlePurchase> = new Map();

/**
 * 🛒 PURCHASE BUNDLE
 * Initiates a bundle purchase for an investor
 */
export function purchaseBundle(
  bbid: string,
  companyName: string,
  bundleId: string,
  investorId?: string
): BundlePurchase {
  const bundle = getBundleById(bundleId);
  if (!bundle) {
    throw new Error('Bundle not found');
  }

  const purchaseId = `BNDL-PURCH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date();
  const estimatedCompletion = new Date(now.getTime() + bundle.totalTime * 24 * 60 * 60 * 1000);

  const purchase: BundlePurchase = {
    purchaseId,
    bbid,
    investorId,
    companyName,
    bundleId,
    bundle,
    purchaseDate: now.toISOString(),
    status: 'pending_payment',
    servicesCompleted: [],
    estimatedCompletionDate: estimatedCompletion.toISOString(),
    notes: [`Bundle purchased: ${bundle.name}`]
  };

  // Create bundle invoice ID (bundles handle their own invoicing)
  const invoiceId = `BNDL-INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  purchase.invoiceId = invoiceId;
  
  bundlePurchases.set(purchaseId, purchase);

  console.log(`[Bundle Engine] 🛒 Bundle purchased: ${bundle.name} by ${companyName}`);

  return purchase;
}

/**
 * 💳 PROCESS BUNDLE PAYMENT
 * Updates bundle status after payment
 */
export function processBundlePayment(purchaseId: string, paymentDate: string): boolean {
  const purchase = bundlePurchases.get(purchaseId);
  if (!purchase) return false;

  purchase.status = 'in_progress';
  purchase.paymentDate = paymentDate;
  purchase.amountPaid = purchase.bundle.bundlePrice;
  purchase.notes?.push(`Payment received on ${new Date(paymentDate).toLocaleDateString()}`);
  
  // Auto-start first service
  const firstService = purchase.bundle.services[0];
  if (firstService) {
    purchase.currentService = firstService.serviceId;
    purchase.notes?.push(`Started: ${firstService.serviceName}`);
  }

  console.log(`[Bundle Engine] 💳 Payment processed for ${purchase.bundle.name}`);

  return true;
}

/**
 * ✅ COMPLETE SERVICE
 * Marks a service within the bundle as completed
 */
export function completeService(purchaseId: string, serviceId: string): boolean {
  const purchase = bundlePurchases.get(purchaseId);
  if (!purchase) return false;

  const service = purchase.bundle.services.find(s => s.serviceId === serviceId);
  if (!service) return false;

  if (!purchase.servicesCompleted.includes(serviceId)) {
    purchase.servicesCompleted.push(serviceId);
    purchase.notes?.push(`Completed: ${service.serviceName}`);
  }

  // Move to next service
  const currentIndex = purchase.bundle.services.findIndex(s => s.serviceId === serviceId);
  const nextService = purchase.bundle.services[currentIndex + 1];
  
  if (nextService) {
    purchase.currentService = nextService.serviceId;
    purchase.notes?.push(`Started: ${nextService.serviceName}`);
  } else {
    // All services completed
    purchase.status = 'completed';
    purchase.actualCompletionDate = new Date().toISOString();
    purchase.currentService = undefined;
    purchase.notes?.push('Bundle completed successfully! 🎉');
    
    console.log(`[Bundle Engine] ✅ Bundle completed: ${purchase.bundle.name}`);
  }

  return true;
}

/**
 * 📊 GET BUNDLE PROGRESS
 * Returns progress information for a purchase
 */
export function getBundleProgress(purchaseId: string): BundleProgress | null {
  const purchase = bundlePurchases.get(purchaseId);
  if (!purchase) return null;

  const totalServices = purchase.bundle.services.length;
  const completedServices = purchase.servicesCompleted.length;
  const progressPercentage = Math.round((completedServices / totalServices) * 100);

  // Calculate remaining days
  const now = new Date();
  const estimatedEnd = new Date(purchase.estimatedCompletionDate);
  const remainingDays = Math.max(0, Math.ceil((estimatedEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  // Get next service
  const currentServiceIndex = purchase.currentService 
    ? purchase.bundle.services.findIndex(s => s.serviceId === purchase.currentService)
    : 0;
  const nextService = purchase.bundle.services[currentServiceIndex];

  return {
    purchaseId,
    bundleName: purchase.bundle.name,
    totalServices,
    completedServices,
    progressPercentage,
    remainingDays,
    status: purchase.status,
    nextService
  };
}

/**
 * 🔍 GET PURCHASE BY ID
 */
export function getPurchaseById(purchaseId: string): BundlePurchase | null {
  return bundlePurchases.get(purchaseId) || null;
}

/**
 * 🔍 GET PURCHASES BY BBID
 */
export function getPurchasesByBBID(bbid: string): BundlePurchase[] {
  return Array.from(bundlePurchases.values())
    .filter(p => p.bbid === bbid)
    .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime());
}

/**
 * 🔍 GET PURCHASES BY INVESTOR
 */
export function getPurchasesByInvestor(investorId: string): BundlePurchase[] {
  return Array.from(bundlePurchases.values())
    .filter(p => p.investorId === investorId)
    .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime());
}

/**
 * ❌ CANCEL PURCHASE
 */
export function cancelPurchase(purchaseId: string, reason: string): boolean {
  const purchase = bundlePurchases.get(purchaseId);
  if (!purchase) return false;

  if (purchase.status === 'completed') {
    console.error('[Bundle Engine] Cannot cancel completed purchase');
    return false;
  }

  purchase.status = 'cancelled';
  purchase.notes?.push(`Cancelled: ${reason}`);

  console.log(`[Bundle Engine] ❌ Purchase cancelled: ${purchaseId}`);

  return true;
}

/**
 * 👔 ASSIGN OFFICER
 */
export function assignOfficer(purchaseId: string, officerId: string): boolean {
  const purchase = bundlePurchases.get(purchaseId);
  if (!purchase) return false;

  purchase.assignedOfficer = officerId;
  purchase.notes?.push(`Assigned to officer: ${officerId}`);

  return true;
}

/**
 * 📝 ADD NOTE
 */
export function addNote(purchaseId: string, note: string): boolean {
  const purchase = bundlePurchases.get(purchaseId);
  if (!purchase) return false;

  if (!purchase.notes) purchase.notes = [];
  purchase.notes.push(`${new Date().toLocaleDateString()}: ${note}`);

  return true;
}

/**
 * 📊 GET BUNDLE STATISTICS
 */
export function getBundleStatistics() {
  const allPurchases = Array.from(bundlePurchases.values());
  
  const totalPurchases = allPurchases.length;
  const activePurchases = allPurchases.filter(p => p.status === 'in_progress').length;
  const completedPurchases = allPurchases.filter(p => p.status === 'completed').length;
  const pendingPayment = allPurchases.filter(p => p.status === 'pending_payment').length;
  
  const totalRevenue = allPurchases
    .filter(p => p.amountPaid)
    .reduce((sum, p) => sum + (p.amountPaid || 0), 0);
  
  const avgCompletionTime = allPurchases
    .filter(p => p.actualCompletionDate)
    .map(p => {
      const start = new Date(p.purchaseDate);
      const end = new Date(p.actualCompletionDate!);
      return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    })
    .reduce((sum, days, _, arr) => sum + days / arr.length, 0);

  return {
    totalPurchases,
    activePurchases,
    completedPurchases,
    pendingPayment,
    totalRevenue,
    avgCompletionTime: Math.round(avgCompletionTime) || 0
  };
}

/**
 * 🎯 INITIALIZE MOCK DATA
 */
function initializeMockBundleData() {
  // Mock purchase for INV-001
  const mockPurchase = purchaseBundle(
    'BBID-2026-MFG-000123',
    'Global Tech Manufacturing Ltd.',
    'BUNDLE-001',
    'INV-001'
  );
  
  // Simulate payment and progress
  processBundlePayment(mockPurchase.purchaseId, new Date().toISOString());
  completeService(mockPurchase.purchaseId, 'SRV-001'); // Company registration
  completeService(mockPurchase.purchaseId, 'SRV-002'); // Trade license
  completeService(mockPurchase.purchaseId, 'SRV-003'); // TIN
  
  console.log('[Bundle Engine] ✅ Initialized mock bundle data');
}

// Initialize on load
if (typeof window !== 'undefined') {
  initializeMockBundleData();
}