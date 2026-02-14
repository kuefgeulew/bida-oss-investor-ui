// Bank Escrow Integration - Create Escrow for Conditional Approval (Payments Tab)

import { useState } from 'react';
import { Shield, CheckCircle2, Loader, DollarSign, AlertCircle, Unlock } from 'lucide-react';
import { BankBadge } from './BankBadge';
import { createEscrow } from './bracSandboxApi';
import { getBankState } from './bankMockEngine';
import { getEscrowStatus, simulateApproval } from './escrowAutoRelease';
import { toast } from 'sonner';
import { motion } from 'motion/react';

interface BankEscrowIntegrationProps {
  investorId: string;
  applicationId: string;
}

export function BankEscrowIntegration({ investorId, applicationId }: BankEscrowIntegrationProps) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('500000');
  
  const bankState = getBankState(investorId);

  const handleCreateEscrow = async () => {
    try {
      setLoading(true);

      toast.info('Creating escrow account with BRAC Bank...');
      
      const escrowResult = await createEscrow(
        investorId,
        applicationId,
        parseFloat(amount),
        'Conditional approval escrow for investment project'
      );
      
      toast.success(`Escrow Account Created! ID: ${escrowResult.escrowId}`);
      
    } catch (error: any) {
      toast.error(error.message || 'Escrow creation failed');
    } finally {
      setLoading(false);
    }
  };

  // Already has escrow
  if (bankState?.escrowAccount) {
    const escrow = bankState.escrowAccount;
    const isActive = escrow.status === 'active';
    const isReleased = escrow.status === 'released';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-2xl border border-[#e3ebf7] bg-white/60 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isActive ? 'bg-[#3b82f6]' : isReleased ? 'bg-[#10b981]' : 'bg-gray-400'
            }`}>
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0f172a]">Escrow Account</h3>
              <BankBadge size="sm" className="mt-1" />
            </div>
          </div>
          <div className={`px-4 py-2 rounded-xl font-semibold ${
            isActive ? 'bg-[#eef4ff] text-[#3b82f6]' :
            isReleased ? 'bg-[#f0fdf4] text-[#10b981]' :
            'bg-gray-100 text-gray-600'
          }`}>
            {escrow.status.toUpperCase().replace('_', ' ')}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 rounded-xl bg-[#f0f9ff] border border-[#e3ebf7]">
            <p className="text-sm text-[#475569] mb-1">Escrow ID</p>
            <p className="text-xl font-semibold text-[#0f172a]">{escrow.escrowId}</p>
          </div>

          <div className="p-4 rounded-xl bg-[#f0f9ff] border border-[#e3ebf7]">
            <p className="text-sm text-[#475569] mb-1">Amount</p>
            <p className="text-2xl font-semibold text-[#0f172a]">
              {escrow.amount.toLocaleString()} {escrow.currency}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#fafafa] border border-[#e3ebf7] mb-6">
          <p className="text-sm text-[#475569] mb-2">Purpose</p>
          <p className="text-sm text-[#0f172a]">{escrow.purpose}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#fffbeb] border border-[#fef3c7]">
          <h4 className="font-semibold text-[#0f172a] mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#f59e0b]" />
            Release Conditions
          </h4>
          <ul className="space-y-2">
            {escrow.releaseConditions.map((condition, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-[#475569]">
                {isReleased ? (
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-[#e3ebf7]" />
                )}
                {condition}
              </li>
            ))}
          </ul>
        </div>

        {isReleased && escrow.releasedDate && (
          <div className="mt-6 p-4 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#10b981] mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#0f172a] mb-1">Funds Released</h4>
                <p className="text-sm text-[#475569]">
                  Released on {new Date(escrow.releasedDate).toLocaleDateString()}. 
                  Funds transferred to corporate account.
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  // Check if corporate account exists
  const hasAccount = bankState?.corporateAccount?.status === 'active';

  if (!hasAccount) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-2xl border border-[#e3ebf7] bg-[#fef2f2]"
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-8 h-8 text-[#ef4444]" />
          <div>
            <h3 className="text-xl font-semibold text-[#0f172a]">Corporate Account Required</h3>
            <p className="text-sm text-[#475569] mt-1">
              You must open a corporate bank account before creating an escrow.
            </p>
          </div>
        </div>
        <p className="text-sm text-[#475569]">
          Go to the <strong>Profile</strong> tab to open your corporate account with BRAC Bank.
        </p>
      </motion.div>
    );
  }

  // CTA to create escrow
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-2xl border border-[#e3ebf7] bg-gradient-to-br from-[#eef4ff] to-[#f0f9ff]"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#3b82f6] flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#0f172a]">Create Escrow for Conditional Approval</h3>
          <BankBadge size="sm" className="mt-1" />
        </div>
      </div>

      <p className="text-[#475569] mb-6">
        Escrow accounts demonstrate financial commitment and accelerate government approvals. 
        Funds are released only when all regulatory conditions are met.
      </p>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#0f172a] mb-2">Escrow Amount (USD)</label>
        <div className="relative">
          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#e3ebf7] bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-lg font-semibold"
            placeholder="500000"
          />
        </div>
        <p className="text-xs text-[#475569] mt-2">
          Recommended: 20-30% of total investment amount
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-xl border border-[#e3ebf7]">
          <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
          <span className="text-sm text-[#0f172a]">Funds held securely until all approvals granted</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-xl border border-[#e3ebf7]">
          <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
          <span className="text-sm text-[#0f172a]">Signals financial credibility to BIDA officers</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-xl border border-[#e3ebf7]">
          <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
          <span className="text-sm text-[#0f172a]">Automatic release upon condition fulfillment</span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-3 p-6 rounded-xl bg-white/60 backdrop-blur-xl border border-[#e3ebf7]">
          <Loader className="w-6 h-6 animate-spin text-[#3b82f6]" />
          <div>
            <p className="font-semibold text-[#0f172a]">Creating escrow account...</p>
            <p className="text-sm text-[#475569]">Setting up security and compliance checks</p>
          </div>
        </div>
      ) : (
        <button
          onClick={handleCreateEscrow}
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full px-8 py-4 bg-[#3b82f6] text-white rounded-xl hover:bg-[#2563eb] transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Escrow Account
        </button>
      )}

      <p className="text-xs text-[#475569] mt-4 text-center">
        🔒 Escrow Service — Conditional Funds Release Upon Approval
      </p>
    </motion.div>
  );
}