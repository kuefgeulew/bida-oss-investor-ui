// Why Bank Integration Matters - Explainer Card for Investors
import { Building2, Zap, Shield, TrendingUp } from 'lucide-react';
import { BankBadge } from './BankBadge';

export function WhyBankMatters() {
  return (
    <div className="p-8 rounded-2xl border border-[#e3ebf7] bg-gradient-to-br from-[#eef4ff] to-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#3b82f6] flex items-center justify-center">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#0f172a]">Why Bank Integration Accelerates Your Approval</h3>
          <BankBadge size="sm" className="mt-1" />
        </div>
      </div>

      <p className="text-[#475569] mb-6 leading-relaxed">
        Completing bank integration accelerates approval because <strong>officers can verify KYC, escrow, and 
        financial readiness instantly</strong> through government-bank collaboration. This eliminates weeks of 
        manual verification.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-white border border-[#e3ebf7]">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-[#3b82f6] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-[#0f172a] mb-1">Faster Processing</h4>
              <p className="text-sm text-[#475569]">
                Bank-verified KYC eliminates 2-3 weeks of government due diligence. Officers trust bank verification.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e3ebf7]">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-[#0f172a] mb-1">Financial Credibility</h4>
              <p className="text-sm text-[#475569]">
                Active corporate account + escrow proves you have funds. No need to submit bank statements repeatedly.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e3ebf7]">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-[#6366f1] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-[#0f172a] mb-1">Higher Approval Rate</h4>
              <p className="text-sm text-[#475569]">
                Investors with bank integration have 94% approval rate vs 67% without. It signals serious commitment.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e3ebf7]">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-[#f59e0b] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-[#0f172a] mb-1">Pre-Approval Escrow</h4>
              <p className="text-sm text-[#475569]">
                Escrow for conditional approval shows you're ready to invest. Government releases funds upon final approval.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#fffbeb] border border-[#fef3c7]">
        <p className="text-sm text-[#92400e] font-medium">
          💡 <strong>Pro Tip:</strong> Complete Profile → Services → Payments tabs to activate all banking features. 
          Your "Bank Readiness Score" appears on your dashboard and is visible to reviewing officers.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="text-center p-3 rounded-xl bg-white border border-[#e3ebf7]">
          <p className="text-2xl font-bold text-[#3b82f6]">15-20 days</p>
          <p className="text-xs text-[#475569] mt-1">Average time saved</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-white border border-[#e3ebf7]">
          <p className="text-2xl font-bold text-[#10b981]">94%</p>
          <p className="text-xs text-[#475569] mt-1">Approval rate</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-white border border-[#e3ebf7]">
          <p className="text-2xl font-bold text-[#6366f1]">$2.1B+</p>
          <p className="text-xs text-[#475569] mt-1">FDI processed</p>
        </div>
      </div>
    </div>
  );
}
