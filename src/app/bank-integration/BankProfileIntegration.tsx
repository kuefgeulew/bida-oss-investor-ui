// Bank Profile Integration - Corporate Account & KYC for Profile Tab

import { useState } from 'react';
import { Building2, CheckCircle2, Loader, AlertCircle } from 'lucide-react';
import { BankBadge } from './BankBadge';
import { performKYC, openCorporateAccount } from './bracSandboxApi';
import { getBankState, initBankState } from './bankMockEngine';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { InstrumentCard } from '@/app/components/ui-primitives';

interface BankProfileIntegrationProps {
  investorId: string;
  investorName: string;
}

export function BankProfileIntegration({ investorId, investorName }: BankProfileIntegrationProps) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'kyc' | 'account' | 'complete'>('kyc');
  const [refreshKey, setRefreshKey] = useState(0);
  
  const bankState = getBankState(investorId);

  const handleOpenAccount = async () => {
    try {
      setLoading(true);
      setStep('kyc');

      // Initialize bank state if not already initialized
      if (!getBankState(investorId)) {
        const applicationId = 'APP-' + Date.now();
        initBankState(investorId, investorName, applicationId);
        toast.info('Initializing bank integration...');
      }

      // Step 1: Perform KYC
      toast.info('Submitting KYC documents to BRAC Bank...');
      const kycResult = await performKYC(investorId);
      
      if (kycResult.status === 'approved') {
        toast.success('KYC Approved! ✓');
        setStep('account');
        
        // Step 2: Open Corporate Account
        toast.info('Opening corporate bank account...');
        const accountResult = await openCorporateAccount(investorId, investorName);
        
        toast.success(`Corporate Account Opened! Account #${accountResult.accountNumber}`);
        setStep('complete');
        
        // Small delay to ensure state is updated, then trigger re-render
        await new Promise(resolve => setTimeout(resolve, 500));
        setRefreshKey(prev => prev + 1);
      }
    } catch (error: any) {
      toast.error(error.message || 'Bank integration failed');
    } finally {
      setLoading(false);
    }
  };

  // Already has account
  if (bankState?.corporateAccount?.status === 'active') {
    return (
      <InstrumentCard>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-white/60 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#10b981] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#0f172a]">Corporate Banking Active</h3>
                <BankBadge size="sm" className="mt-1" />
              </div>
            </div>
            <CheckCircle2 className="w-8 h-8 text-[#10b981]" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
              <p className="text-sm text-[#475569] mb-1">Account Number</p>
              <p className="text-2xl font-semibold text-[#0f172a]">{bankState.corporateAccount.accountNumber}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
              <p className="text-sm text-[#475569] mb-1">Account Type</p>
              <p className="text-2xl font-semibold text-[#0f172a] capitalize">{bankState.corporateAccount.accountType}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
              <p className="text-sm text-[#475569] mb-1">Status</p>
              <p className="text-2xl font-semibold text-[#10b981] capitalize">{bankState.corporateAccount.status}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
              <p className="text-sm text-[#475569] mb-1">Opened Date</p>
              <p className="text-lg font-semibold text-[#0f172a]">
                {new Date(bankState.corporateAccount.openedDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[#eef4ff] border border-[#e3ebf7]">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#3b82f6] mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#0f172a] mb-1">KYC Verified</h4>
                <p className="text-sm text-[#475569]">
                  All compliance documents approved. Account is fully operational for investment transactions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </InstrumentCard>
    );
  }

  // CTA to open account
  return (
    <InstrumentCard>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-gradient-to-br from-[#eef4ff] to-[#f0f9ff]"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#3b82f6] flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#0f172a]">Open Corporate Account</h3>
            <BankBadge size="sm" className="mt-1" />
          </div>
        </div>

        <p className="text-[#475569] mb-6">
          Accelerate your investment approval by opening a corporate account with BRAC Bank. 
          This enables escrow services, letter of credit, and automatic compliance verification.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-xl border border-[#e3ebf7]">
            <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
            <span className="text-sm text-[#0f172a]">Instant KYC verification</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-xl border border-[#e3ebf7]">
            <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
            <span className="text-sm text-[#0f172a]">Corporate account number issued immediately</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-xl border border-[#e3ebf7]">
            <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
            <span className="text-sm text-[#0f172a]">Unlocks escrow, LC, and loan services</span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 p-6 rounded-xl bg-white/60 backdrop-blur-xl border border-[#e3ebf7]">
            <Loader className="w-6 h-6 animate-spin text-[#3b82f6]" />
            <div>
              <p className="font-semibold text-[#0f172a]">
                {step === 'kyc' && 'Verifying KYC documents...'}
                {step === 'account' && 'Opening corporate account...'}
                {step === 'complete' && 'Finalizing setup...'}
              </p>
              <p className="text-sm text-[#475569]">Processing your request</p>
            </div>
          </div>
        ) : (
          <button
            onClick={handleOpenAccount}
            className="w-full px-8 py-4 bg-[#3b82f6] text-white rounded-xl hover:bg-[#2563eb] transition-all font-semibold text-lg"
          >
            Open Corporate Account with BRAC Bank
          </button>
        )}

        <p className="text-xs text-[#475569] mt-4 text-center">
          🔒 Bank Integration Active — Verified Financial Partnership
        </p>
      </motion.div>
    </InstrumentCard>
  );
}