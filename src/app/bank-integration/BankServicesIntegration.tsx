// Bank Services Integration - LC & Loan (Services Tab)

import { useState } from 'react';
import { FileText, DollarSign, CheckCircle2, Loader, TrendingUp } from 'lucide-react';
import { BankBadge } from './BankBadge';
import { issueLC, preApproveLoan } from './bracSandboxApi';
import { getBankState } from './bankMockEngine';
import { toast } from 'sonner';
import { motion } from 'motion/react';

interface BankServicesIntegrationProps {
  investorId: string;
  applicationId: string;
}

export function BankServicesIntegration({ investorId, applicationId }: BankServicesIntegrationProps) {
  const [lcLoading, setLcLoading] = useState(false);
  const [loanLoading, setLoanLoading] = useState(false);
  
  const [lcAmount, setLcAmount] = useState('750000');
  const [lcBeneficiary, setLcBeneficiary] = useState('International Machinery Supplier Ltd.');
  
  const [loanAmount, setLoanAmount] = useState('2000000');
  const [loanTerm, setLoanTerm] = useState('60');
  
  const bankState = getBankState(investorId);

  const handleIssueLCClick = async () => {
    try {
      setLcLoading(true);

      toast.info('Issuing Letter of Credit...');
      
      const lcResult = await issueLC(
        investorId,
        applicationId,
        parseFloat(lcAmount),
        lcBeneficiary,
        'Machinery import for textile factory'
      );
      
      toast.success(`LC Issued! LC Number: ${lcResult.lcNumber}`);
      
    } catch (error: any) {
      toast.error(error.message || 'LC issuance failed');
    } finally {
      setLcLoading(false);
    }
  };

  const handleApplyLoan = async () => {
    try {
      setLoanLoading(true);

      toast.info('Submitting loan pre-approval request...');
      
      const loanResult = await preApproveLoan(
        investorId,
        parseFloat(loanAmount),
        'Investment capital for factory setup and operations',
        parseInt(loanTerm)
      );
      
      toast.success(`Loan Pre-Approved! Loan ID: ${loanResult.loanId} at ${loanResult.interestRate}%`);
      
    } catch (error: any) {
      toast.error(error.message || 'Loan application failed');
    } finally {
      setLoanLoading(false);
    }
  };

  const hasAccount = bankState?.corporateAccount?.status === 'active';
  const lc = bankState?.letterOfCredit;
  const loan = bankState?.loanApplication;

  return (
    <div className="space-y-6">
      {/* LETTER OF CREDIT SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-2xl border border-[#e3ebf7] bg-white/60 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#6366f1] flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#0f172a]">Letter of Credit</h3>
            <BankBadge size="sm" className="mt-1" />
          </div>
        </div>

        {lc && lc.status === 'issued' ? (
          <div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 rounded-xl bg-[#eef2ff] border border-[#e0e7ff]">
                <p className="text-sm text-[#475569] mb-1">LC Number</p>
                <p className="text-xl font-semibold text-[#0f172a]">{lc.lcNumber}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#eef2ff] border border-[#e0e7ff]">
                <p className="text-sm text-[#475569] mb-1">Amount</p>
                <p className="text-2xl font-semibold text-[#0f172a]">
                  {lc.amount.toLocaleString()} {lc.currency}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#eef2ff] border border-[#e0e7ff]">
                <p className="text-sm text-[#475569] mb-1">Beneficiary</p>
                <p className="text-sm font-semibold text-[#0f172a]">{lc.beneficiary}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#eef2ff] border border-[#e0e7ff]">
                <p className="text-sm text-[#475569] mb-1">Expiry Date</p>
                <p className="text-sm font-semibold text-[#0f172a]">
                  {lc.expiryDate ? new Date(lc.expiryDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#10b981] mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#0f172a] mb-1">LC Issued Successfully</h4>
                  <p className="text-sm text-[#475569]">
                    Purpose: {lc.purpose}
                  </p>
                  <p className="text-sm text-[#475569] mt-1">
                    Issued: {lc.issuedDate ? new Date(lc.issuedDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-[#475569] mb-6">
              A Letter of Credit from BRAC Bank enables you to import machinery and equipment with 
              guaranteed payment to your suppliers.
            </p>

            {!hasAccount ? (
              <div className="p-4 rounded-xl bg-[#fef2f2] border border-[#fecaca]">
                <p className="text-sm text-[#ef4444]">
                  ⚠️ Corporate account required. Go to Profile tab to open an account.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0f172a] mb-2">LC Amount (USD)</label>
                  <input
                    type="number"
                    value={lcAmount}
                    onChange={(e) => setLcAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#e3ebf7] bg-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                    placeholder="750000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0f172a] mb-2">Beneficiary Name</label>
                  <input
                    type="text"
                    value={lcBeneficiary}
                    onChange={(e) => setLcBeneficiary(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#e3ebf7] bg-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                    placeholder="Supplier company name"
                  />
                </div>

                {lcLoading ? (
                  <div className="flex items-center justify-center gap-3 p-6 rounded-xl bg-[#eef2ff] border border-[#e0e7ff]">
                    <Loader className="w-6 h-6 animate-spin text-[#6366f1]" />
                    <p className="font-semibold text-[#0f172a]">Issuing Letter of Credit...</p>
                  </div>
                ) : (
                  <button
                    onClick={handleIssueLCClick}
                    disabled={!lcAmount || !lcBeneficiary}
                    className="w-full px-8 py-4 bg-[#6366f1] text-white rounded-xl hover:bg-[#5558d9] transition-all font-semibold disabled:opacity-50"
                  >
                    Issue Letter of Credit
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* INVESTMENT LOAN SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-8 rounded-2xl border border-[#e3ebf7] bg-white/60 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#10b981] flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#0f172a]">Investment Loan – BRAC Bank</h3>
            <BankBadge size="sm" className="mt-1" />
          </div>
        </div>

        {loan && (loan.status === 'preapproved' || loan.status === 'approved') ? (
          <div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
                <p className="text-sm text-[#475569] mb-1">Loan ID</p>
                <p className="text-xl font-semibold text-[#0f172a]">{loan.loanId}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
                <p className="text-sm text-[#475569] mb-1">Amount</p>
                <p className="text-2xl font-semibold text-[#0f172a]">
                  {loan.amount.toLocaleString()} {loan.currency}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
                <p className="text-sm text-[#475569] mb-1">Interest Rate</p>
                <p className="text-2xl font-semibold text-[#10b981]">{loan.interestRate}% p.a.</p>
                <p className="text-xs text-[#475569] mt-1">Pre-approved rate</p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
                <p className="text-sm text-[#475569] mb-1">Term</p>
                <p className="text-2xl font-semibold text-[#0f172a]">{loan.term} months</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#eef4ff] border border-[#e3ebf7]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3b82f6] mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#0f172a] mb-1">
                    {loan.status === 'preapproved' ? 'Pre-Approved' : 'Approved'}
                  </h4>
                  <p className="text-sm text-[#475569]">
                    Purpose: {loan.purpose}
                  </p>
                  <p className="text-sm text-[#475569] mt-1">
                    {loan.preApprovedDate && 
                      `Pre-approved: ${new Date(loan.preApprovedDate).toLocaleDateString()}`
                    }
                  </p>
                  <p className="text-sm text-[#475569] mt-2">
                    Final approval and disbursement subject to regulatory clearances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-[#475569] mb-6">
              Get pre-approved financing for your investment project. BRAC Bank offers competitive 
              rates for FDI projects with BIDA approval.
            </p>

            {!hasAccount ? (
              <div className="p-4 rounded-xl bg-[#fef2f2] border border-[#fecaca]">
                <p className="text-sm text-[#ef4444]">
                  ⚠️ Corporate account and KYC required. Go to Profile tab to complete setup.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0f172a] mb-2">Loan Amount (USD)</label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#e3ebf7] bg-white focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                    placeholder="2000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0f172a] mb-2">Loan Term (Months)</label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#e3ebf7] bg-white focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                  >
                    <option value="36">36 months (3 years)</option>
                    <option value="60">60 months (5 years)</option>
                    <option value="84">84 months (7 years)</option>
                    <option value="120">120 months (10 years)</option>
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-[#fffbeb] border border-[#fef3c7]">
                  <p className="text-sm text-[#92400e]">
                    <strong>Indicative Rate:</strong> 7.2% p.a.
                  </p>
                  <p className="text-xs text-[#92400e] mt-1">
                    Actual rates depend on project assessment, collateral, and market conditions.
                  </p>
                </div>

                {loanLoading ? (
                  <div className="flex items-center justify-center gap-3 p-6 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
                    <Loader className="w-6 h-6 animate-spin text-[#10b981]" />
                    <p className="font-semibold text-[#0f172a]">Processing loan pre-approval...</p>
                  </div>
                ) : (
                  <button
                    onClick={handleApplyLoan}
                    disabled={!loanAmount || parseFloat(loanAmount) <= 0}
                    className="w-full px-8 py-4 bg-[#10b981] text-white rounded-xl hover:bg-[#059669] transition-all font-semibold disabled:opacity-50"
                  >
                    Apply for Investment Loan
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </motion.div>

      <p className="text-xs text-[#475569] text-center">
        🔒 Bank Services Integration — LC & Investment Loan Facilities Active
      </p>
    </div>
  );
}
