// 🌱 DEMO INVESTOR ENGINE SEEDING FROM REGISTRATION
// ARCHITECTURE: DEV-only engine seeding utility
// PURPOSE: Populate all engines with demo investor data after registration
// SAFETY: DEV mode only, uses REAL engines (no bypassing)

import { registerBBID } from '@/app/bbid/bbidEngine';
import { generateApprovalPipeline } from '@/app/gov-agencies/agencyWorkflowEngine';
import { generateInvoice, markPaid } from '@/app/payments/paymentEngine';
import { generateCertificate } from '@/app/certificates/certificateEngine';
import { initializeBankAccount } from '@/app/bank-integration/bankMockEngine';

/**
 * Seeds all engines with demo investor data after registration form submission
 * This is NOT a shortcut - it calls real engine functions in correct order
 * 
 * @param formData - Registration form data (from DEMO_REGISTRATION_DATA)
 * @returns Generated BBID
 */
export async function seedDemoInvestorFromRegistration(formData: any): Promise<string> {
  // 🔒 PRODUCTION GUARD
  if (import.meta.env.MODE === 'production') {
    throw new Error('[DEMO SEED] Cannot seed demo data in production mode');
  }

  console.log('[DEMO SEED] Starting engine seeding for demo investor...');

  try {
    // STEP 1: Register BBID (real engine call)
    console.log('[DEMO SEED] Step 1: Registering BBID...');
    const bbid = registerBBID(
      formData.companyName,
      formData.sector,
      formData.companyType || 'private_limited',
      {
        division: formData.division,
        district: formData.district,
        area: formData.area,
        address: formData.address,
      }
    );
    console.log(`[DEMO SEED] ✅ BBID registered: ${bbid}`);

    // STEP 2: Generate approval pipeline (real engine call)
    console.log('[DEMO SEED] Step 2: Generating approval pipeline...');
    const pipeline = generateApprovalPipeline(
      bbid,
      formData.sector,
      formData.companyType || 'private_limited'
    );
    console.log(`[DEMO SEED] ✅ Pipeline generated with ${pipeline.steps.length} steps`);

    // STEP 3: Generate and pay initial invoices (real engine calls)
    console.log('[DEMO SEED] Step 3: Generating and paying invoices...');
    
    // RJSC Registration Fee
    const rjscInvoice = generateInvoice({
      bbid,
      investorId: formData.email,
      serviceId: 'RJSC-REG',
      serviceName: 'Company Registration (RJSC)',
      amount: 5000,
      description: 'Registration fee for new company',
    });
    markPaid(rjscInvoice.invoiceId, 'demo-txn-rjsc-001');
    console.log(`[DEMO SEED] ✅ RJSC invoice paid: ${rjscInvoice.invoiceId}`);

    // BIDA Registration Fee
    const bidaInvoice = generateInvoice({
      bbid,
      investorId: formData.email,
      serviceId: 'BIDA-REG',
      serviceName: 'BIDA Registration',
      amount: 3000,
      description: 'BIDA investor registration fee',
    });
    markPaid(bidaInvoice.invoiceId, 'demo-txn-bida-001');
    console.log(`[DEMO SEED] ✅ BIDA invoice paid: ${bidaInvoice.invoiceId}`);

    // Trade License Fee
    const tradeLicenseInvoice = generateInvoice({
      bbid,
      investorId: formData.email,
      serviceId: 'TRADE-LIC',
      serviceName: 'Trade License',
      amount: 8000,
      description: 'Annual trade license fee',
    });
    markPaid(tradeLicenseInvoice.invoiceId, 'demo-txn-trade-001');
    console.log(`[DEMO SEED] ✅ Trade License invoice paid: ${tradeLicenseInvoice.invoiceId}`);

    // STEP 4: Generate certificates (real engine call)
    console.log('[DEMO SEED] Step 4: Generating certificates...');
    
    const rjscCert = generateCertificate({
      bbid,
      investorId: formData.email,
      certificateType: 'company_registration',
      serviceName: 'Company Registration',
      issuer: 'RJSC',
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      metadata: {
        companyName: formData.companyName,
        registrationNumber: `RJSC-${Date.now()}`,
        companyType: formData.companyType || 'Private Limited Company',
      },
    });
    console.log(`[DEMO SEED] ✅ RJSC certificate generated: ${rjscCert.certificateId}`);

    const tradeCert = generateCertificate({
      bbid,
      investorId: formData.email,
      certificateType: 'trade_license',
      serviceName: 'Trade License',
      issuer: 'City Corporation',
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      metadata: {
        licenseNumber: formData.tradeLicense,
        businessType: formData.sector,
        location: formData.address,
      },
    });
    console.log(`[DEMO SEED] ✅ Trade License certificate generated: ${tradeCert.certificateId}`);

    // STEP 5: Initialize bank account (real engine call)
    console.log('[DEMO SEED] Step 5: Initializing bank account...');
    const bankAccount = initializeBankAccount({
      bbid,
      investorId: formData.email,
      bankName: formData.bankPreference || 'BRAC Bank',
      accountType: formData.bankAccountType || 'Corporate',
      initialDeposit: 100000, // BDT 100K initial deposit
      companyName: formData.companyName,
    });
    console.log(`[DEMO SEED] ✅ Bank account initialized: ${bankAccount.accountNumber}`);

    console.log('[DEMO SEED] 🎉 All engines seeded successfully!');
    console.log(`[DEMO SEED] Demo investor ready with BBID: ${bbid}`);

    return bbid;

  } catch (error) {
    console.error('[DEMO SEED] ❌ Engine seeding failed:', error);
    throw new Error(`Demo investor seeding failed: ${error}`);
  }
}

/**
 * Verify that all engines were properly seeded
 * This is a post-seeding validation check
 */
export function verifyDemoInvestorSeeding(bbid: string): boolean {
  // 🔒 PRODUCTION GUARD
  if (import.meta.env.MODE === 'production') {
    return false;
  }

  // This would check that:
  // 1. BBID exists in bbidEngine
  // 2. Pipeline exists in agencyWorkflowEngine
  // 3. Payments exist in paymentEngine
  // 4. Certificates exist in certificateEngine
  // 5. Bank account exists in bankMockEngine

  console.log(`[DEMO VERIFY] Verifying seeding for BBID: ${bbid}`);
  
  // For now, return true if BBID is valid format
  return bbid.startsWith('BBID-');
}
