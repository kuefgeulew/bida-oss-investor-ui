// 🏦 BANK INTELLIGENCE PANEL - Admin Analytics
// Shows aggregate banking metrics across all investors

import { Building2, TrendingUp, DollarSign, Shield, CheckCircle2, FileText, CreditCard } from 'lucide-react';
import { BankBadge } from '@/app/bank-integration/BankBadge';
import { getBankState } from '@/app/bank-integration/bankDataProvider';
import { BANK_PARTNERS } from '@/app/bank-integration/bankTypes';

interface BankIntelligencePanelProps {
  applications?: any[];
}

export function BankIntelligencePanelAdmin({ applications = [] }: BankIntelligencePanelProps) {
  // Get aggregate bank metrics across all investors
  const bankMetrics = {
    totalInvestorsUsingBanks: 0,
    totalFDIWithBanks: 0,
    activeEscrowAccounts: 0,
    totalEscrowValue: 0,
    lcsIssued: 0,
    totalLCValue: 0,
    loansPreapproved: 0,
    totalLoanValue: 0,
    avgBankReadinessTime: 0,
    kycVerified: 0,
    corporateAccountsActive: 0
  };

  // Calculate metrics from applications
  applications.forEach(app => {
    const bankState = getBankState(app.investorId);
    if (bankState) {
      // Has banking activity
      if (bankState.corporateAccount?.status === 'active' || 
          bankState.kycVerification?.verified || 
          bankState.escrowAccount?.status) {
        bankMetrics.totalInvestorsUsingBanks++;
        
        // Parse investment amount
        const investmentAmount = typeof app.investmentAmount === 'string' 
          ? parseFloat(app.investmentAmount.replace(/[^0-9.-]+/g, '')) 
          : app.investmentAmount || 0;
        bankMetrics.totalFDIWithBanks += investmentAmount;
      }

      // Escrow metrics
      if (bankState.escrowAccount?.status === 'active' || bankState.escrowAccount?.status === 'released') {
        bankMetrics.activeEscrowAccounts++;
        bankMetrics.totalEscrowValue += bankState.escrowAccount.amount || 0;
      }

      // LC metrics
      if (bankState.letterOfCredit?.status === 'issued') {
        bankMetrics.lcsIssued++;
        bankMetrics.totalLCValue += bankState.letterOfCredit.amount || 0;
      }

      // Loan metrics
      if (bankState.loanApplication?.status === 'preapproved' || bankState.loanApplication?.status === 'approved') {
        bankMetrics.loansPreapproved++;
        bankMetrics.totalLoanValue += bankState.loanApplication.requestedAmount || 0;
      }

      // KYC metrics
      if (bankState.kycVerification?.verified) {
        bankMetrics.kycVerified++;
      }

      // Corporate account metrics
      if (bankState.corporateAccount?.status === 'active') {
        bankMetrics.corporateAccountsActive++;
      }
    }
  });

  // Calculate average bank readiness time (mock data)
  bankMetrics.avgBankReadinessTime = bankMetrics.totalInvestorsUsingBanks > 0 ? 8.5 : 0;

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#6366f1] flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0f172a]">🏦 Bank Intelligence & FDI Banking Layer</h2>
            <p className="text-sm text-[#475569]">Real-time banking metrics across all investors</p>
          </div>
        </div>
        <BankBadge size="lg" />
      </div>

      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* Total FDI Using Banks */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">Total FDI with Banks</span>
          </div>
          <p className="text-3xl font-bold text-blue-900">{formatCurrency(bankMetrics.totalFDIWithBanks)}</p>
          <p className="text-xs text-blue-700 mt-1">{bankMetrics.totalInvestorsUsingBanks} investors</p>
        </div>

        {/* Active Escrow Accounts */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-white border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-xs text-green-600 font-medium">Escrow Accounts Active</span>
          </div>
          <p className="text-3xl font-bold text-green-900">{bankMetrics.activeEscrowAccounts}</p>
          <p className="text-xs text-green-700 mt-1">Value: {formatCurrency(bankMetrics.totalEscrowValue)}</p>
        </div>

        {/* LCs Issued */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <span className="text-xs text-purple-600 font-medium">LCs Issued</span>
          </div>
          <p className="text-3xl font-bold text-purple-900">{bankMetrics.lcsIssued}</p>
          <p className="text-xs text-purple-700 mt-1">Value: {formatCurrency(bankMetrics.totalLCValue)}</p>
        </div>

        {/* Loans Pre-approved */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-white border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-5 h-5 text-orange-600" />
            <span className="text-xs text-orange-600 font-medium">Loans Pre-approved</span>
          </div>
          <p className="text-3xl font-bold text-orange-900">{bankMetrics.loansPreapproved}</p>
          <p className="text-xs text-orange-700 mt-1">Value: {formatCurrency(bankMetrics.totalLoanValue)}</p>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">KYC Verified by Banks</span>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{bankMetrics.kycVerified}</p>
          <p className="text-xs text-gray-600 mt-1">Reduces gov. verification time by 2-3 weeks</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Corporate Accounts Active</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{bankMetrics.corporateAccountsActive}</p>
          <p className="text-xs text-gray-600 mt-1">Ready for operations</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Avg Bank Readiness Time</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{bankMetrics.avgBankReadinessTime} days</p>
          <p className="text-xs text-gray-600 mt-1">Time to complete all banking steps</p>
        </div>
      </div>

      {/* Bank Partner Breakdown */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-[#eef4ff] to-white border border-[#e3ebf7]">
        <h3 className="text-lg font-semibold text-[#0f172a] mb-4">Bank Partner Network</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {BANK_PARTNERS.map(bank => (
            <div key={bank.id} className="p-3 rounded-lg bg-white border border-gray-200">
              <p className="font-semibold text-sm text-gray-900 mb-1">{bank.name}</p>
              <p className="text-xs text-gray-600 mb-2">{bank.country}</p>
              <div className="flex flex-wrap gap-1">
                {bank.capabilities.slice(0, 3).map(cap => (
                  <span key={cap} className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Banking Impact Summary */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-white border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Banking Layer Impact</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-green-800 mb-2">For Investors</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>✓ Faster KYC verification (bank-verified)</li>
              <li>✓ Escrow for conditional approvals</li>
              <li>✓ LC for machinery imports</li>
              <li>✓ Pre-approved project financing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-green-800 mb-2">For Government</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>✓ Verified financial readiness</li>
              <li>✓ Reduced AML/KYC workload</li>
              <li>✓ Real-time fund tracking</li>
              <li>✓ 94% approval rate for bank-integrated investors</li>
            </ul>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#f0fdf4] border border-green-200">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-green-900">
            Banking System: Operational
          </span>
        </div>
        <span className="text-xs text-green-700">
          Last sync: {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}