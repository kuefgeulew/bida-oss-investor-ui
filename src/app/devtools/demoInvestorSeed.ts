/**
 * 🎯 DEMO INVESTOR SEED
 * Pre-populates engines with a fully completed investor profile
 * 
 * ARCHITECTURE: Seeded data, not bypassed logic
 * This represents a RETURNING INVESTOR who has already completed all steps
 * 
 * ⏰ TIME SIMULATION: 6-month journey with realistic event timestamps
 * This creates time depth that populates all dashboards, charts, and reports
 */

import { registerBBID } from '@/app/bbid/bbidEngine';
import { generateApprovalPipeline, savePipeline } from '@/app/gov-agencies/agencyWorkflowEngine';
import { generateCertificate } from '@/app/certificates/certificateEngine';
import { initializeBankAccount } from '@/app/bank-integration/bankMockEngine';
import { addDocument, addDocumentAccessLog } from '@/app/documents/documentEngine';
import { assignRM } from '@/app/rm/rmEngine';
import { generateInvoice, markPaid } from '@/app/payments/paymentEngine';

// ============================================================================
// DEMO INVESTOR IDENTITY
// ============================================================================

export const DEMO_INVESTOR = {
  investorId: 'INV-DEMO-001',
  name: 'Demo Manufacturing Ltd',
  nameBangla: 'ডেমো ম্যানুফ্যাকচারিং লিমিটেড',
  email: 'demo@investor.bd',
  password: 'demo123',
  sector: 'manufacturing',
  subsector: 'Textiles & Garments',
  investmentAmount: 5000000,
  numberOfEmployees: 150,
  legalEntity: {
    type: 'limited_company' as const,
    incorporationCountry: 'Bangladesh',
    incorporationDate: '2024-01-15',
    registrationNumber: 'C-123456',
  },
  registeredAddress: {
    street: '123 Industrial Park Road',
    city: 'Dhaka',
    division: 'Dhaka',
    postalCode: '1216',
    country: 'Bangladesh',
  },
  rjscNumber: 'RJSC-2024-001234',
  tinNumber: 'TIN-987654321',
};

// ============================================================================
// TIME ANCHOR POINTS (6-month journey)
// ============================================================================

const SIX_MONTHS_AGO = new Date('2025-08-12');
const FIVE_MONTHS_AGO = new Date('2025-09-05');
const FOUR_MONTHS_AGO = new Date('2025-10-15');
const THREE_MONTHS_AGO = new Date('2025-11-08');
const TWO_MONTHS_AGO = new Date('2025-12-10');
const ONE_MONTH_AGO = new Date('2026-01-12');
const LAST_WEEK = new Date('2026-02-03');
const YESTERDAY = new Date('2026-02-09');

// ============================================================================
// SEED FUNCTION
// ============================================================================

let isSeeded = false;

export function seedDemoInvestor() {
  // Only seed once
  if (isSeeded) return;
  
  console.log('🌱 [Demo Seed] Simulating 6-month investor journey...');

  try {
    // ========================================================================
    // 📅 6 MONTHS AGO: Initial Registration
    // ========================================================================
    console.log('📅 [Aug 12, 2025] Initial registration...');
    
    const bbidRecord = registerBBID(
      DEMO_INVESTOR.name,
      DEMO_INVESTOR.sector,
      DEMO_INVESTOR.legalEntity,
      DEMO_INVESTOR.registeredAddress,
      DEMO_INVESTOR.investorId,
      {
        companyNameBangla: DEMO_INVESTOR.nameBangla,
        subsector: DEMO_INVESTOR.subsector,
        investmentAmount: DEMO_INVESTOR.investmentAmount,
        currency: 'USD',
        numberOfEmployees: DEMO_INVESTOR.numberOfEmployees,
        rjscNumber: DEMO_INVESTOR.rjscNumber,
        tinNumber: DEMO_INVESTOR.tinNumber,
      }
    );

    console.log(`✅ [Demo Seed] BBID registered: ${bbidRecord.bbid}`);

    // Generate approval pipeline
    const pipeline = generateApprovalPipeline(
      DEMO_INVESTOR.investorId,
      'manufacturing',
      DEMO_INVESTOR.sector
    );

    pipeline.bbid = bbidRecord.bbid;
    pipeline.companyName = DEMO_INVESTOR.name;

    console.log(`✅ [Demo Seed] Pipeline created with ${pipeline.totalSteps} steps`);

    // Assign RM
    try {
      const rmAssignment = assignRM(
        bbidRecord.bbid,
        DEMO_INVESTOR.name,
        DEMO_INVESTOR.sector,
        'Dhaka',
        DEMO_INVESTOR.investorId
      );
      console.log(`✅ [Demo Seed] RM assigned: ${rmAssignment.rmName}`);
    } catch (error) {
      console.log(`⚠️  [Demo Seed] RM assignment skipped`);
    }

    // ========================================================================
    // 📅 5 MONTHS AGO: First Documents & Early Approvals
    // ========================================================================
    console.log('📅 [Sep 2025] First documents uploaded...');
    
    addDocument({
      id: 'doc-001',
      investorId: DEMO_INVESTOR.investorId,
      name: 'Certificate of Incorporation.pdf',
      type: 'Legal',
      uploadedAt: new Date('2025-09-02').toISOString(),
      size: '1.2 MB',
      confidential: false,
      sharedWith: ['rm-001'],
      accessLog: [
        { 
          userId: 'rm-001', 
          userName: 'Mr. Rahman', 
          action: 'viewed', 
          timestamp: new Date('2025-09-03').toISOString()
        }
      ],
      watermark: false
    });

    addDocument({
      id: 'doc-002',
      investorId: DEMO_INVESTOR.investorId,
      name: 'Board Resolution - Investment.pdf',
      type: 'Legal',
      uploadedAt: new Date('2025-09-05').toISOString(),
      size: '856 KB',
      confidential: true,
      sharedWith: ['rm-001', 'rm-002'],
      accessLog: [
        { 
          userId: 'rm-001', 
          userName: 'Mr. Rahman', 
          action: 'viewed', 
          timestamp: new Date('2025-09-06').toISOString()
        },
        { 
          userId: 'rm-002', 
          userName: 'Ms. Sultana', 
          action: 'downloaded', 
          timestamp: new Date('2025-09-07').toISOString()
        }
      ],
      watermark: true
    });

    // Complete first 3 approvals (Sep 2025)
    completeApproval(pipeline, 0, new Date('2025-09-08'), new Date('2025-09-12'), bbidRecord.bbid);
    completeApproval(pipeline, 1, new Date('2025-09-13'), new Date('2025-09-18'), bbidRecord.bbid);
    completeApproval(pipeline, 2, new Date('2025-09-19'), new Date('2025-09-25'), bbidRecord.bbid);

    // ========================================================================
    // 📅 4 MONTHS AGO: More Progress & Bank Setup
    // ========================================================================
    console.log('📅 [Oct 2025] Continued progress...');

    addDocument({
      id: 'doc-003',
      investorId: DEMO_INVESTOR.investorId,
      name: 'Tax Identification Certificate.pdf',
      type: 'Compliance',
      uploadedAt: new Date('2025-10-08').toISOString(),
      size: '645 KB',
      confidential: false,
      sharedWith: ['rm-001'],
      accessLog: [
        { 
          userId: 'rm-001', 
          userName: 'Mr. Rahman', 
          action: 'viewed', 
          timestamp: new Date('2025-10-09').toISOString()
        }
      ],
      watermark: false
    });

    // Initialize bank account
    initializeBankAccount(
      DEMO_INVESTOR.investorId,
      'BRAC Bank',
      '1234567890',
      'active',
      new Date('2025-10-12').toISOString()
    );

    // Complete approvals 3-6 (Oct 2025)
    completeApproval(pipeline, 3, new Date('2025-10-02'), new Date('2025-10-10'), bbidRecord.bbid);
    completeApproval(pipeline, 4, new Date('2025-10-11'), new Date('2025-10-18'), bbidRecord.bbid);
    completeApproval(pipeline, 5, new Date('2025-10-19'), new Date('2025-10-28'), bbidRecord.bbid);

    // ========================================================================
    // 📅 3 MONTHS AGO: ESG & Deal Room Activity
    // ========================================================================
    console.log('📅 [Nov 2025] ESG documentation...');

    addDocument({
      id: 'doc-004',
      investorId: DEMO_INVESTOR.investorId,
      name: 'Environmental Impact Assessment.pdf',
      type: 'Compliance',
      uploadedAt: new Date('2025-11-05').toISOString(),
      size: '5.8 MB',
      confidential: false,
      sharedWith: ['rm-001', 'rm-002', 'rm-003'],
      accessLog: [
        { 
          userId: 'rm-001', 
          userName: 'Mr. Rahman', 
          action: 'viewed', 
          timestamp: new Date('2025-11-06').toISOString()
        },
        { 
          userId: 'rm-002', 
          userName: 'Ms. Sultana', 
          action: 'viewed', 
          timestamp: new Date('2025-11-08').toISOString()
        },
        { 
          userId: 'rm-003', 
          userName: 'Mr. Khan', 
          action: 'downloaded', 
          timestamp: new Date('2025-11-10').toISOString()
        }
      ],
      watermark: false
    });

    addDocument({
      id: 'doc-005',
      investorId: DEMO_INVESTOR.investorId,
      name: 'Social Compliance Certificate.pdf',
      type: 'Compliance',
      uploadedAt: new Date('2025-11-12').toISOString(),
      size: '1.4 MB',
      confidential: false,
      sharedWith: ['rm-001'],
      accessLog: [
        { 
          userId: 'rm-001', 
          userName: 'Mr. Rahman', 
          action: 'viewed', 
          timestamp: new Date('2025-11-13').toISOString()
        }
      ],
      watermark: false
    });

    // Complete approvals 6-8 (Nov 2025)
    completeApproval(pipeline, 6, new Date('2025-11-01'), new Date('2025-11-08'), bbidRecord.bbid);
    completeApproval(pipeline, 7, new Date('2025-11-09'), new Date('2025-11-20'), bbidRecord.bbid);
    completeApproval(pipeline, 8, new Date('2025-11-21'), new Date('2025-11-28'), bbidRecord.bbid);

    // ========================================================================
    // 📅 2 MONTHS AGO: New Services & Some Delays
    // ========================================================================
    console.log('📅 [Dec 2025] New services applied...');

    addDocument({
      id: 'doc-006',
      investorId: DEMO_INVESTOR.investorId,
      name: 'Fire Safety Clearance Application.pdf',
      type: 'Application',
      uploadedAt: new Date('2025-12-05').toISOString(),
      size: '2.1 MB',
      confidential: false,
      sharedWith: ['rm-001', 'rm-002'],
      accessLog: [
        { 
          userId: 'rm-001', 
          userName: 'Mr. Rahman', 
          action: 'viewed', 
          timestamp: new Date('2025-12-06').toISOString()
        },
        { 
          userId: 'rm-002', 
          userName: 'Ms. Sultana', 
          action: 'viewed', 
          timestamp: new Date('2025-12-08').toISOString()
        }
      ],
      watermark: false
    });

    // Complete approvals 9-10 with realistic delays (Dec 2025)
    completeApproval(pipeline, 9, new Date('2025-12-02'), new Date('2025-12-15'), bbidRecord.bbid); // 13 days (slight delay)
    completeApproval(pipeline, 10, new Date('2025-12-16'), new Date('2025-12-28'), bbidRecord.bbid); // 12 days

    // ========================================================================
    // 📅 1 MONTH AGO: Recent Progress
    // ========================================================================
    console.log('📅 [Jan 2026] Recent activity...');

    addDocument({
      id: 'doc-007',
      investorId: DEMO_INVESTOR.investorId,
      name: 'Investment Agreement Draft.pdf',
      type: 'Contract',
      uploadedAt: new Date('2026-01-08').toISOString(),
      size: '2.4 MB',
      confidential: true,
      sharedWith: ['rm-001', 'rm-002'],
      accessLog: [
        { 
          userId: 'rm-001', 
          userName: 'Mr. Rahman', 
          action: 'viewed', 
          timestamp: new Date('2026-01-09').toISOString()
        },
        { 
          userId: 'rm-002', 
          userName: 'Ms. Sultana', 
          action: 'downloaded', 
          timestamp: new Date('2026-01-15').toISOString()
        },
        { 
          userId: 'rm-001', 
          userName: 'Mr. Rahman', 
          action: 'viewed', 
          timestamp: new Date('2026-01-20').toISOString()
        }
      ],
      watermark: true,
      expiryDate: new Date('2026-03-20').toISOString()
    });

    // Complete approval 11 (Jan 2026)
    completeApproval(pipeline, 11, new Date('2026-01-05'), new Date('2026-01-18'), bbidRecord.bbid);

    // ========================================================================
    // 📅 LAST WEEK: Current Activity
    // ========================================================================
    console.log('📅 [Feb 2026] Recent events...');

    addDocument({
      id: 'doc-008',
      investorId: DEMO_INVESTOR.investorId,
      name: 'Financial Projections Q1 2026.xlsx',
      type: 'Financial',
      uploadedAt: new Date('2026-02-05').toISOString(),
      size: '1.2 MB',
      confidential: true,
      sharedWith: ['rm-001'],
      accessLog: [
        { 
          userId: 'rm-001', 
          userName: 'Mr. Rahman', 
          action: 'viewed', 
          timestamp: new Date('2026-02-06').toISOString()
        }
      ],
      expiryDate: new Date('2026-04-05').toISOString(),
      watermark: true
    });

    // Start approval 12 (pending - in progress)
    if (pipeline.approvalSteps.length > 12) {
      const step = pipeline.approvalSteps[12];
      step.status = 'pending';
      step.startDate = new Date('2026-02-08');
      step.assignedOfficer = 'Ms. Sultana';
      
      // Generate pending invoice
      const invoice = generateInvoice(bbidRecord.bbid, step.serviceId, DEMO_INVESTOR.investorId);
      if (invoice) {
        console.log(`  💵 Pending invoice generated: ${invoice.invoiceId}`);
      }
    }

    // ========================================================================
    // 📊 Update Pipeline Stats
    // ========================================================================
    const completedSteps = 12;
    pipeline.completedSteps = completedSteps;
    pipeline.overallProgress = Math.round((completedSteps / pipeline.totalSteps) * 100);
    
    if (completedSteps > 0) {
      const firstStep = pipeline.approvalSteps[0];
      const lastStep = pipeline.approvalSteps[completedSteps - 1];
      if (firstStep.startDate && lastStep.completionDate) {
        const elapsed = Math.ceil(
          (lastStep.completionDate.getTime() - firstStep.startDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        pipeline.actualElapsedDays = elapsed;
      }
    }

    // Save the pipeline
    savePipeline(pipeline);

    // ========================================================================
    // ✅ DEMO INVESTOR READY
    // ========================================================================
    isSeeded = true;
    console.log('🎉 [Demo Seed] 6-month journey simulated successfully!');
    console.log('📧 Login: demo@investor.bd / demo123');
    console.log(`🆔 BBID: ${bbidRecord.bbid}`);
    console.log(`�� Progress: ${completedSteps}/${pipeline.totalSteps} approvals completed`);
    console.log(`📄 Documents: 8 documents across 6 months`);
    console.log(`💰 Payments: ${completedSteps} payments processed`);
    console.log(`📜 Certificates: ${completedSteps} certificates issued`);
    
    return {
      success: true,
      investorId: DEMO_INVESTOR.investorId,
      bbid: bbidRecord.bbid,
      completedSteps: completedSteps,
      totalSteps: pipeline.totalSteps,
    };

  } catch (error) {
    console.error('❌ [Demo Seed] Failed to initialize demo investor:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================================================
// HELPER: Complete Single Approval with Payment & Certificate
// ============================================================================

function completeApproval(
  pipeline: any,
  stepIndex: number,
  startDate: Date,
  completionDate: Date,
  bbid: string
) {
  if (stepIndex >= pipeline.approvalSteps.length) return;

  const step = pipeline.approvalSteps[stepIndex];
  
  // Generate and pay invoice
  const invoice = generateInvoice(bbid, step.serviceId, DEMO_INVESTOR.investorId);
  if (invoice) {
    // Override generated dates with our timeline
    invoice.generatedDate = startDate.toISOString();
    invoice.dueDate = new Date(startDate.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString();
    
    // Mark as paid
    const transactionId = `TXN-${startDate.getTime()}-${Math.random().toString(36).substr(2, 6)}`;
    const receipt = markPaid(transactionId, invoice.invoiceId, 'bank_transfer', `CH-${startDate.getTime()}`);
    
    if (receipt) {
      // Override paid date
      invoice.paidDate = new Date(startDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();
      receipt.paidDate = invoice.paidDate;
    }
  }
  
  // Generate certificate
  const cert = generateCertificate(
    step.serviceId,
    bbid,
    DEMO_INVESTOR.name
  );
  
  if (cert) {
    // Override issue date to match timeline
    cert.issueDate = completionDate.toISOString();
  }
  
  // Mark step as completed
  step.status = 'approved';
  step.startDate = startDate;
  step.completionDate = completionDate;
  step.assignedOfficer = stepIndex % 2 === 0 ? 'Mr. Rahman' : 'Ms. Sultana';
}

/**
 * Reset demo data (for testing)
 */
export function resetDemoInvestor() {
  isSeeded = false;
  console.log('🔄 [Demo Seed] Reset flag - will re-seed on next call');
}

/**
 * Check if demo investor is seeded
 */
export function isDemoSeeded(): boolean {
  return isSeeded;
}

/**
 * Get demo investor summary (for UI display)
 */
export function getDemoInvestorSummary() {
  if (!isSeeded) {
    return null;
  }
  
  return {
    investor: DEMO_INVESTOR,
    credentials: {
      email: DEMO_INVESTOR.email,
      password: DEMO_INVESTOR.password,
    },
    features: [
      '✅ BBID Registered',
      '✅ Corporate Bank Account Active (BRAC Bank)',
      '✅ Deal Room with 3 Documents',
      '✅ 12 Government Approvals Completed',
      '✅ Certificates Issued',
      '✅ Relationship Manager Assigned',
    ],
    description: 'A fully configured investor profile ready for presentation and demo purposes'
  };
}