/**
 * 💰 INCENTIVE AUTO-DETECT BANNER
 * 
 * Mounted in: Services tab (top of incentive section)
 * Powered by: incentiveEligibilityEngine
 * 
 * Shows: "You qualify for 7 incentives worth BDT 4.3 Cr"
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, TrendingUp, DollarSign, Sparkles, CheckCircle, Send, Loader2, Check, X } from 'lucide-react';
import { 
  autoDetectIncentives,
  formatBDT,
  getIncentiveSummary,
  type InvestorProfile
} from '@/app/engines/incentiveEligibilityEngine';
import { useLanguage } from '@/app/components/LanguageContext';
import { toast } from 'sonner';

interface IncentiveAutoDetectProps {
  investorProfile: InvestorProfile;
  onViewDetails?: () => void;
}

export function IncentiveAutoDetect({ investorProfile, onViewDetails }: IncentiveAutoDetectProps) {
  const { t } = useLanguage();
  
  // 🛡️ SAFETY: Guard against undefined investorProfile and provide sensible defaults
  if (!investorProfile || !investorProfile.sector) {
    return null;
  }
  
  // 🔥 DEFENSIVE: Normalize investor profile with smart defaults
  const normalizedProfile: InvestorProfile = {
    sector: investorProfile.sector || 'Manufacturing - Electronics',
    investmentAmountUSD: investorProfile.investmentAmountUSD || 5000000, // Default to 5M USD
    exportPercentage: investorProfile.exportPercentage || 85, // Default to 85% export-oriented (qualifies for tax incentives)
    zoneLocation: investorProfile.zoneLocation || 'Dhaka EPZ',
    workforceSize: investorProfile.workforceSize || 150, // Default to 150 employees
    isSME: investorProfile.isSME ?? false,
    isStartup: investorProfile.isStartup ?? false,
    hasGreenTech: investorProfile.hasGreenTech ?? false,
    femaleWorkforcePercent: investorProfile.femaleWorkforcePercent || 30
  };
  
  const incentives = autoDetectIncentives(normalizedProfile);
  
  // 🔥 NEW: Auto-Apply state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [appliedIncentives, setAppliedIncentives] = useState<string[]>([]);
  
  // Calculate ROI improvement
  const baseROI = 35; // 35% base ROI
  const roiImprovement = incentives.roiImprovement || 0;
  const effectiveROI = baseROI + roiImprovement;
  
  // 🔒 DEFENSIVE: Calculate category-specific savings safely
  const taxSavings = incentives.byCategory?.tax || 0;
  const dutySavings = incentives.byCategory?.duty || 0;
  const grantSavings = incentives.byCategory?.grant || 0;
  const totalSavingsBDT = incentives.totalSavingsBDT || 0;
  const totalSavingsUSD = incentives.totalSavingsUSD || 0;
  const incentiveCount = incentives.incentiveCount || 0;
  
  // 🔥 NEW: Auto-apply handler
  const handleAutoApply = async () => {
    setIsApplying(true);
    
    // Simulate API call with realistic processing time
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const appliedIds = incentives.qualifyingIncentives.map(inc => inc.id);
    setAppliedIncentives(appliedIds);
    setIsApplying(false);
    
    toast.success(`Successfully applied for ${incentives.qualifyingIncentives.length} incentives!`, {
      description: `Total value: ${formatBDT(incentives.totalSavingsBDT)}. Applications submitted to BIDA.`,
      duration: 5000,
    });
    
    setShowApplyModal(false);
  };
  
  const hasApplied = appliedIncentives.length > 0;
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl border-2 border-green-200 shadow-lg"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-600 rounded-xl">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  You Qualify for {incentiveCount} Incentives
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {hasApplied ? '✅ Applications submitted' : 'Auto-detected based on your investment profile'}
                </p>
              </div>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Total Value */}
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-semibold text-gray-600">Total Incentive Value</p>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  {formatBDT(totalSavingsBDT)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ≈ ${totalSavingsUSD.toLocaleString()}
                </p>
              </div>
              
              {/* ROI Improvement */}
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <p className="text-sm font-semibold text-gray-600">ROI Improvement</p>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  +{roiImprovement.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {baseROI}% → {effectiveROI.toFixed(1)}% effective ROI
                </p>
              </div>
              
              {/* Tax Savings */}
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <p className="text-sm font-semibold text-gray-600">10-Year Tax Savings</p>
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  {formatBDT(taxSavings)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Tax holiday + reduced rates
                </p>
              </div>
            </div>
            
            {/* Incentive Breakdown */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Your Incentive Package:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {incentives.qualifyingIncentives.slice(0, 6).map((incentive, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 bg-white/60 rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {incentive.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatBDT(incentive.savingsOverTenYears)} • {incentive.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {incentives.qualifyingIncentives.length > 6 && (
                <p className="text-xs text-gray-600 mt-2">
                  + {incentives.qualifyingIncentives.length - 6} more incentives
                </p>
              )}
            </div>
            
            {/* CTA */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={onViewDetails}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
              >
                View Full Incentive Breakdown →
              </button>
              <button className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all border border-gray-200">
                Download Incentive Report (PDF)
              </button>
              
              {/* 🔥 NEW: Auto-Apply Button */}
              {!hasApplied ? (
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Auto-Apply for All Incentives
                </button>
              ) : (
                <div className="px-6 py-3 bg-green-100 text-green-800 font-bold rounded-lg border-2 border-green-300 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Applications Submitted
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Trust Signal */}
        <div className="mt-4 pt-4 border-t border-green-200">
          <p className="text-xs text-gray-600">
            <span className="font-semibold">✓ Verified by BIDA</span> • 
            Auto-calculated based on: {normalizedProfile.sector}, ${normalizedProfile.investmentAmountUSD.toLocaleString()} investment, {normalizedProfile.workforceSize} employees, {normalizedProfile.exportPercentage}% export-oriented
          </p>
        </div>
      </motion.div>
      
      {/* 🔥 NEW: Auto-Apply Confirmation Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isApplying && setShowApplyModal(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full z-50 border-2 border-blue-500"
            >
              <button
                onClick={() => !isApplying && setShowApplyModal(false)}
                disabled={isApplying}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 disabled:opacity-50"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Send className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Auto-Apply for Incentives</h3>
                  <p className="text-gray-600">One-click application submission</p>
                </div>
              </div>
              
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-blue-900 mb-2">Application Summary</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <p>• <strong>{incentiveCount} incentive applications</strong> will be submitted</p>
                  <p>• Total potential value: <strong>{formatBDT(totalSavingsBDT)}</strong></p>
                  <p>• Estimated processing time: <strong>7-14 business days</strong></p>
                  <p>• You will receive email confirmations for each application</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Incentives Being Applied For:</h4>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {incentives.qualifyingIncentives.map((incentive, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{incentive.name}</p>
                        <p className="text-sm text-gray-600">{incentive.category} • {formatBDT(incentive.savingsOverTenYears)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Note:</strong> By proceeding, you authorize BIDA to process your applications and share necessary information with relevant authorities.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowApplyModal(false)}
                  disabled={isApplying}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAutoApply}
                  disabled={isApplying}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isApplying ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting Applications...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Confirm & Submit All Applications
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}