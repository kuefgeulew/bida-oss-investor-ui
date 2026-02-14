// Bank Journey Milestones - Show bank integration steps in Journey timeline

import { Building2, CheckCircle2, Clock } from 'lucide-react';
import { BankBadge } from './BankBadge';
import { getBankState } from './bankMockEngine';
import { motion } from 'motion/react';
import { InstrumentCard } from '@/app/components/ui-primitives';

interface BankJourneyMilestonesProps {
  investorId: string;
}

export function BankJourneyMilestones({ investorId }: BankJourneyMilestonesProps) {
  const bankState = getBankState(investorId);

  const milestones = [
    {
      title: 'Corporate Account Opened',
      description: 'BRAC Bank corporate account with KYC verification',
      completed: bankState?.corporateAccount?.status === 'active',
      completedDate: bankState?.corporateAccount?.openedDate,
      icon: Building2,
      color: '#3b82f6'
    },
    {
      title: 'Escrow Account Created',
      description: 'Investment escrow for conditional approval',
      completed: bankState?.escrowAccount?.status === 'active' || bankState?.escrowAccount?.status === 'released',
      completedDate: bankState?.escrowAccount?.createdDate,
      icon: Building2,
      color: '#6366f1'
    },
    {
      title: 'Letter of Credit Issued',
      description: 'LC for machinery and equipment imports',
      completed: bankState?.letterOfCredit?.status === 'issued',
      completedDate: bankState?.letterOfCredit?.issuedDate,
      icon: Building2,
      color: '#8b5cf6'
    },
    {
      title: 'Investment Loan Pre-Approved',
      description: 'Financing secured for investment operations',
      completed: bankState?.loanApplication?.status === 'preapproved' || bankState?.loanApplication?.status === 'approved',
      completedDate: bankState?.loanApplication?.preApprovedDate,
      icon: Building2,
      color: '#10b981'
    },
  ];

  const completedCount = milestones.filter(m => m.completed).length;

  return (
    <InstrumentCard>
      <div className="p-8 bg-gradient-to-br from-[#eef4ff] to-[#f0f9ff]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#3b82f6] flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0f172a]">Bank Integration Milestones</h3>
              <BankBadge size="sm" className="mt-1" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-[#3b82f6]">{completedCount}/4</p>
            <p className="text-sm text-[#475569]">Completed</p>
          </div>
        </div>

        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-xl border ${
                milestone.completed
                  ? 'bg-white/80 border-[#10b981]'
                  : 'bg-white/40 border-[#e3ebf7]'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  milestone.completed ? 'bg-[#10b981]' : 'bg-[#e3ebf7]'
                }`}
                style={{
                  backgroundColor: milestone.completed ? milestone.color : undefined
                }}
              >
                {milestone.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : (
                  <Clock className="w-6 h-6 text-[#475569]" />
                )}
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-[#0f172a]">{milestone.title}</h4>
                <p className="text-sm text-[#475569] mt-1">{milestone.description}</p>
                {milestone.completed && milestone.completedDate && (
                  <p className="text-xs text-[#10b981] mt-1">
                    Completed: {new Date(milestone.completedDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              {milestone.completed ? (
                <div className="px-3 py-1 rounded-lg bg-[#f0fdf4] text-[#10b981] text-sm font-semibold">
                  ✓ Complete
                </div>
              ) : (
                <div className="px-3 py-1 rounded-lg bg-[#fef2f2] text-[#ef4444] text-sm font-semibold">
                  Pending
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {completedCount === 4 && (
          <div className="mt-6 p-4 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#10b981] mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#0f172a] mb-1">Bank Integration Complete! 🎉</h4>
                <p className="text-sm text-[#475569]">
                  All banking services are fully operational. Your investment approval is now accelerated through
                  government-bank collaboration.
                </p>
              </div>
            </div>
          </div>
        )}

        {completedCount === 0 && (
          <div className="mt-6 p-4 rounded-xl bg-[#fffbeb] border border-[#fef3c7]">
            <p className="text-sm text-[#92400e]">
              💡 Complete banking setup in the <strong>Profile</strong>, <strong>Payments</strong>, and <strong>Services</strong> tabs
              to unlock government-bank integrated approvals.
            </p>
          </div>
        )}
      </div>
    </InstrumentCard>
  );
}