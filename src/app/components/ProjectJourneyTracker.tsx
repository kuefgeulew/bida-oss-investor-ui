import { motion } from 'motion/react';
import { CheckCircle2, Clock, AlertCircle, Circle, Calendar, Info, Building2 } from 'lucide-react';
import { EnhancedJourneyStep, enhancedJourneySteps } from './EnhancedJourneyTracker';
import { getBankState } from '../bank-integration/bankMockEngine';
import { BankBadge } from '../bank-integration/BankBadge';
import { InstrumentCard, InstrumentSection } from './ui-primitives';
import { getPipeline, generateApprovalPipeline } from '../gov-agencies/agencyWorkflowEngine';
import { getServiceById } from '../gov-agencies/agencyRegistry';
import { getPendingPayments, isServicePaid } from '../payments/paymentEngine';
import { generateCertificate } from '../certificates/certificateEngine';
import { useEffect } from 'react';

interface Step {
  id: string;
  title: string;
  agency: string;
  status: 'completed' | 'in-progress' | 'pending' | 'delayed';
  startDate: string;
  endDate?: string;
  sla: number; // days
  progress: number; // 0-100
  dependencies?: string[];
  description?: string;
  isBank?: boolean;
}

interface ProjectJourneyTrackerProps {
  investorId?: string;
}

export function ProjectJourneyTracker({ investorId }: ProjectJourneyTrackerProps = {}) {
  // Get bank state if investorId provided
  const bankState = investorId ? getBankState(investorId) : null;

  // 🏛️ GET GOVERNMENT PIPELINE DATA - FROM WORKFLOW ENGINE
  let govPipeline = investorId ? getPipeline(investorId) : null;
  if (!govPipeline && investorId) {
    // Generate pipeline if it doesn't exist
    govPipeline = generateApprovalPipeline(investorId, 'manufacturing');
  }

  // 🚨 AUTO-TRIGGER RM ESCALATION - GAP 3 FIX
  useEffect(() => {
    if (govPipeline && investorId) {
      const bbid = `BBID-${investorId}`;
      import('../rm/rmEngine').then(({ autoDetectBottlenecks }) => {
        autoDetectBottlenecks(bbid, govPipeline.companyName || 'Investor Company', investorId);
      });
    }
  }, [govPipeline?.investorId, investorId]);

  // Bank milestones to inject into timeline
  const bankMilestones = bankState ? [
    {
      id: 'bank-account',
      title: '🏦 Corporate Bank Account Opened',
      agency: 'BRAC Bank',
      status: bankState.corporateAccount?.status === 'active' ? 'completed' as const : 'pending' as const,
      startDate: bankState.corporateAccount?.openedDate || '',
      endDate: bankState.corporateAccount?.openedDate,
      sla: 2,
      progress: bankState.corporateAccount?.status === 'active' ? 100 : 0,
      description: 'FDI-grade corporate account with government-integrated KYC verification',
      isBank: true
    },
    {
      id: 'bank-escrow',
      title: '🏦 Investment Escrow Account Created',
      agency: 'BRAC Bank',
      status: (bankState.escrowAccount?.status === 'active' || bankState.escrowAccount?.status === 'released') ? 'completed' as const : 'pending' as const,
      startDate: bankState.escrowAccount?.createdDate || '',
      endDate: bankState.escrowAccount?.createdDate,
      sla: 1,
      progress: (bankState.escrowAccount?.status === 'active' || bankState.escrowAccount?.status === 'released') ? 100 : 0,
      description: 'Conditional approval escrow for secure investment funds',
      isBank: true
    },
    {
      id: 'bank-lc',
      title: '🏦 Letter of Credit Issued',
      agency: 'BRAC Bank',
      status: bankState.letterOfCredit?.status === 'issued' ? 'completed' as const : 'pending' as const,
      startDate: bankState.letterOfCredit?.issuedDate || '',
      endDate: bankState.letterOfCredit?.issuedDate,
      sla: 3,
      progress: bankState.letterOfCredit?.status === 'issued' ? 100 : 0,
      description: 'LC for machinery and equipment imports',
      isBank: true
    },
    {
      id: 'bank-loan',
      title: '🏦 Investment Loan Pre-Approved',
      agency: 'BRAC Bank',
      status: (bankState.loanApplication?.status === 'preapproved' || bankState.loanApplication?.status === 'approved') ? 'completed' as const : 'pending' as const,
      startDate: bankState.loanApplication?.preApprovedDate || '',
      endDate: bankState.loanApplication?.preApprovedDate,
      sla: 7,
      progress: (bankState.loanApplication?.status === 'preapproved' || bankState.loanApplication?.status === 'approved') ? 100 : 0,
      description: 'Financing secured for investment operations',
      isBank: true
    }
  ] : [];

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-10 space-y-8">
        {/* Process Transparency Engine Header */}
        <InstrumentSection>
          <div className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#eef4ff] flex items-center justify-center shadow-inner flex-shrink-0">
                <Info className="w-7 h-7 text-[#3b82f6]" />
              </div>
              <div>
                <h2 className="text-4xl font-semibold text-[#0f172a] mb-2 tracking-tight">
                  Process Transparency Engine
                </h2>
              </div>
            </div>
          </div>
        </InstrumentSection>

        {/* Enhanced Journey Steps */}
        <div className="space-y-4">
          {enhancedJourneySteps.map((step, index) => (
            <EnhancedJourneyStep 
              key={step.id} 
              step={step} 
              stepNumber={index + 1} 
            />
          ))}
        </div>

        {/* Dependency Visualization */}
        <InstrumentSection>
          <div className="p-8">
            <h3 className="text-3xl font-semibold text-[#0f172a] mb-6 tracking-tight">📊 Dependency Flow Visualization</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#10b981]"></div>
                <span className="text-sm font-medium text-[#0f172a]">Step 1: Company Registration</span>
                <span className="text-slate-400">→</span>
                <span className="text-sm text-slate-600">(No dependencies - can start immediately)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#10b981]"></div>
                <span className="text-sm font-medium text-[#0f172a]">Step 2: BIDA Registration</span>
                <span className="text-slate-400">→</span>
                <span className="text-sm text-slate-600">Requires: Step 1 complete</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#3b82f6]"></div>
                <span className="text-sm font-medium text-[#0f172a]">Step 3: Environmental Clearance</span>
                <span className="text-slate-400">→</span>
                <span className="text-sm text-slate-600">Requires: Step 1 + Land proof</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#3b82f6]"></div>
                <span className="text-sm font-medium text-[#0f172a]">Step 4: Fire Safety</span>
                <span className="text-slate-400">→</span>
                <span className="text-sm text-slate-600">Cannot start before Step 3 in progress</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-slate-400"></div>
                <span className="text-sm font-medium text-[#0f172a]">Step 5: Factory License</span>
                <span className="text-slate-400">→</span>
                <span className="text-sm text-slate-600">Requires: Steps 3 & 4 approved</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-slate-400"></div>
                <span className="text-sm font-medium text-[#0f172a]">Step 6: Commencement</span>
                <span className="text-slate-400">→</span>
                <span className="text-sm text-slate-600">Requires: ALL previous steps complete</span>
              </div>
            </div>
          </div>
        </InstrumentSection>

        {/* Bank Milestones */}
        {bankMilestones.length > 0 && (
          <InstrumentSection>
            <div className="p-8">
              <h3 className="text-3xl font-semibold text-[#0f172a] mb-6 tracking-tight">🏦 Bank Milestones</h3>
              <div className="space-y-3">
                {bankMilestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#3b82f6]"></div>
                    <span className="text-sm font-medium text-[#0f172a]">{milestone.title}</span>
                    <span className="text-slate-400">→</span>
                    <span className="text-sm text-slate-600">{milestone.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </InstrumentSection>
        )}

        {/* 🏛️ GOVERNMENT APPROVAL MILESTONES - FROM WORKFLOW ENGINE */}
        {govPipeline && (
          <InstrumentSection>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-semibold text-[#0f172a] tracking-tight">
                  🏛️ Government Approval Pipeline
                </h3>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#0f172a]">{Math.round(govPipeline.overallProgress)}%</div>
                    <div className="text-sm text-slate-600">Complete</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#0f172a]">{govPipeline.completedSteps}/{govPipeline.totalSteps}</div>
                    <div className="text-sm text-slate-600">Approvals</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#0f172a]">{govPipeline.estimatedCompletionDays}</div>
                    <div className="text-sm text-slate-600">Est. Days</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-[#3b82f6] to-[#0e7490] h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${govPipeline.overallProgress}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {govPipeline.criticalPathSteps.slice(0, 10).map((step, index) => {
                  const serviceInfo = getServiceById(step.serviceId);
                  
                  // 💰 PAYMENT AWARENESS
                  const bbid = `BBID-${investorId}`;
                  const isPaid = investorId ? isServicePaid(bbid, step.serviceId) : true;
                  const requiresPayment = serviceInfo?.service.fee && serviceInfo.service.fee > 0;
                  
                  // Modify status if awaiting payment
                  let displayStatus = step.status;
                  if (requiresPayment && !isPaid && (displayStatus === 'documents-pending' || displayStatus === 'not-started')) {
                    displayStatus = 'awaiting_payment' as any;
                  }
                  
                  const statusColor = 
                    displayStatus === 'approved' ? 'bg-green-500' :
                    displayStatus === 'under-review' ? 'bg-blue-500' :
                    displayStatus === 'rejected' ? 'bg-red-500' :
                    displayStatus === 'on-hold' ? 'bg-orange-500' :
                    displayStatus === 'awaiting_payment' ? 'bg-yellow-500' :
                    'bg-slate-400';
                  
                  return (
                    <motion.div 
                      key={step.serviceId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-4 h-4 rounded-full ${statusColor}`}></div>
                      <span className="text-sm font-medium text-[#0f172a] flex-shrink-0 w-8">
                        {step.serviceName}
                      </span>
                      <span className="text-slate-400">→</span>
                      <span className="text-sm text-slate-600">
                        {step.agencyName} • {step.slaInDays} days SLA
                      </span>
                      {step.status !== 'not-started' && (
                        <>
                          <span className="text-slate-400">•</span>
                          <span className="text-xs text-slate-500">
                            {step.daysElapsed} / {step.slaInDays} days elapsed
                          </span>
                        </>
                      )}
                      
                      {/* 💰 PAYMENT STATUS */}
                      {requiresPayment && !isPaid && (
                        <span className="ml-auto flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-lg text-xs font-medium">
                          💰 Awaiting Payment ({serviceInfo.service.fee.toLocaleString()} BDT)
                        </span>
                      )}
                      
                      {/* 📜 CERTIFICATE DOWNLOAD */}
                      {step.status === 'approved' && investorId && (
                        <button
                          onClick={() => generateCertificate(step.serviceId, bbid)}
                          className="ml-auto flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors"
                        >
                          📜 Download Certificate
                        </button>
                      )}
                      
                      {step.status === 'approved' && !requiresPayment && (
                        <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                      )}
                      {step.daysRemaining < 5 && step.status === 'under-review' && (
                        <AlertCircle className="w-4 h-4 text-orange-500 ml-auto" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {govPipeline.approvalSteps.length > 10 && (
                <div className="mt-4 text-center">
                  <span className="text-sm text-slate-600">
                    + {govPipeline.approvalSteps.length - 10} more approval steps
                  </span>
                </div>
              )}
            </div>
          </InstrumentSection>
        )}
      </div>
    </section>
  );
}