/**
 * 🎉 NEW INCENTIVE ALERTS
 * 
 * Powers: Policy monitoring, new incentive discovery, automatic re-eligibility checks
 * Mounted: Investor Dashboard → Intelligence Lab
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  TrendingUp,
  Award,
  Bell,
  CheckCircle,
  ExternalLink,
  X,
  Calendar,
  DollarSign,
  Target,
} from 'lucide-react';
import { toast } from 'sonner';

// ==========================================
// TYPES
// ==========================================

interface NewIncentive {
  id: string;
  name: string;
  category: 'tax' | 'duty' | 'grant' | 'subsidy';
  announcedDate: string;
  effectiveDate: string;
  source: string;
  isNew: boolean; // Completely new
  isUpdated: boolean; // Existing incentive updated
  eligible: boolean;
  estimatedValue: number; // BDT
  duration: string;
  description: string;
  eligibilityCriteria: string[];
  howQualified: string; // Why investor is eligible
  changes?: string; // For updated incentives
  applyBy?: string; // Deadline
  authority: string;
  applicationUrl?: string;
}

// ==========================================
// MOCK DATA
// ==========================================

const NEW_INCENTIVES: NewIncentive[] = [
  {
    id: 'new-001',
    name: 'Green Factory Bonus (2026)',
    category: 'subsidy',
    announcedDate: '2026-02-01T00:00:00Z',
    effectiveDate: '2026-03-01T00:00:00Z',
    source: 'Ministry of Finance Budget Speech 2026',
    isNew: true,
    isUpdated: false,
    eligible: true,
    estimatedValue: 55000000, // BDT 5.5 Cr
    duration: '5 years',
    description: 'New cash bonus for factories with certified green infrastructure (solar panels, wastewater treatment, energy-efficient machinery)',
    eligibilityCriteria: [
      'Minimum 30% renewable energy usage',
      'Certified wastewater treatment plant',
      'Energy-efficient machinery (ISO 50001)',
      'Green building certification (LEED/equivalent)'
    ],
    howQualified: 'You have solar panels installed (35% renewable energy) and are eligible!',
    applyBy: '2026-06-30T00:00:00Z',
    authority: 'SREDA (Sustainable & Renewable Energy Development Authority)',
    applicationUrl: '/incentives/apply/green-factory-bonus'
  },
  {
    id: 'new-002',
    name: 'Female Workforce Bonus (Threshold Lowered)',
    category: 'grant',
    announcedDate: '2026-01-15T00:00:00Z',
    effectiveDate: '2026-02-01T00:00:00Z',
    source: 'Ministry of Labour & Employment Circular 2026-01',
    isNew: false,
    isUpdated: true,
    eligible: true,
    estimatedValue: 23000000, // BDT 2.3 Cr
    duration: 'Ongoing',
    description: 'Female workforce requirement lowered from 40% to 25%',
    eligibilityCriteria: [
      'Minimum 25% female workforce (previously 40%)',
      'Registered with BIDA',
      'Manufacturing or service sector'
    ],
    howQualified: 'Your female workforce is 28% (previously did not qualify at 40% threshold)',
    changes: 'Threshold reduced: 40% → 25%. You now qualify!',
    authority: 'Ministry of Labour & Employment',
    applicationUrl: '/incentives/apply/female-workforce'
  },
  {
    id: 'new-003',
    name: 'Tech Startup Accelerator Grant',
    category: 'grant',
    announcedDate: '2026-01-20T00:00:00Z',
    effectiveDate: '2026-04-01T00:00:00Z',
    source: 'Bangladesh Startup Act 2026',
    isNew: true,
    isUpdated: false,
    eligible: false,
    estimatedValue: 15000000, // BDT 1.5 Cr
    duration: '3 years',
    description: 'Grant for tech startups in AI, blockchain, fintech, healthtech',
    eligibilityCriteria: [
      'Registered as startup (less than 5 years old)',
      'Tech-focused (AI, blockchain, fintech, healthtech)',
      'Minimum 3 full-time employees',
      'Prototype/MVP developed'
    ],
    howQualified: 'Not eligible: Your company is 8 years old (startup requirement: <5 years)',
    authority: 'Bangladesh Startup Authority',
    applicationUrl: '/incentives/apply/tech-startup'
  },
  {
    id: 'new-004',
    name: 'Export Diversification Incentive',
    category: 'subsidy',
    announcedDate: '2026-02-05T00:00:00Z',
    effectiveDate: '2026-07-01T00:00:00Z',
    source: 'Export Promotion Bureau Policy Update 2026',
    isNew: true,
    isUpdated: false,
    eligible: true,
    estimatedValue: 18000000, // BDT 1.8 Cr
    duration: 'Annual',
    description: 'Bonus for exporting to new markets (non-traditional export destinations)',
    eligibilityCriteria: [
      'Export to at least 3 non-traditional markets',
      'Non-traditional: Africa, Latin America, Central Asia, Oceania',
      'Minimum USD 100,000 export value per market',
      'First-time export to these markets'
    ],
    howQualified: 'You export to Kenya, Brazil, and Kazakhstan (3 non-traditional markets)',
    applyBy: '2026-12-31T00:00:00Z',
    authority: 'Export Promotion Bureau',
    applicationUrl: '/incentives/apply/export-diversification'
  },
  {
    id: 'new-005',
    name: 'R&D Tax Credit (Rate Increased)',
    category: 'tax',
    announcedDate: '2026-01-10T00:00:00Z',
    effectiveDate: '2026-01-01T00:00:00Z',
    source: 'NBR Tax Policy 2026',
    isNew: false,
    isUpdated: true,
    eligible: true,
    estimatedValue: 8000000, // BDT 80 Lakh
    duration: 'Ongoing',
    description: 'R&D expenditure tax credit increased from 5% to 10%',
    eligibilityCriteria: [
      'Registered R&D facility',
      'Minimum BDT 10 Lakh annual R&D spend',
      'Research team with qualified scientists'
    ],
    howQualified: 'You have R&D facility and spend BDT 80 Lakh/year (credit doubled to 10%)',
    changes: 'Tax credit rate: 5% → 10%. Your benefit doubles!',
    authority: 'National Board of Revenue',
    applicationUrl: '/incentives/apply/rd-tax-credit'
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export function NewIncentiveAlerts() {
  const [selectedIncentive, setSelectedIncentive] = useState<NewIncentive | null>(null);
  const [filter, setFilter] = useState<'all' | 'eligible' | 'new' | 'updated'>('all');

  const filteredIncentives = NEW_INCENTIVES.filter(inc => {
    if (filter === 'eligible') return inc.eligible;
    if (filter === 'new') return inc.isNew;
    if (filter === 'updated') return inc.isUpdated;
    return true;
  });

  const eligibleCount = NEW_INCENTIVES.filter(i => i.eligible).length;
  const totalNewValue = NEW_INCENTIVES
    .filter(i => i.eligible)
    .reduce((sum, i) => sum + i.estimatedValue, 0);

  const handleApply = (incentive: NewIncentive) => {
    toast.success(`Applying for ${incentive.name}...`);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8 text-slate-700" />
              <h2 className="text-2xl font-bold text-slate-900">New Incentives Available</h2>
            </div>
            <p className="text-slate-600 text-base">
              Discover new opportunities • Automatic eligibility checks
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-5">
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-slate-600 mb-1">New This Month</div>
            <div className="text-2xl font-bold text-slate-900">{NEW_INCENTIVES.length}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              You're Eligible
            </div>
            <div className="text-2xl font-bold text-green-600">{eligibleCount}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-slate-600 mb-1">New Programs</div>
            <div className="text-2xl font-bold text-slate-900">
              {NEW_INCENTIVES.filter(i => i.isNew).length}
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-slate-600 mb-1">Estimated Value</div>
            <div className="text-xl font-bold text-slate-900">
              BDT {(totalNewValue / 10000000).toFixed(1)} Cr
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2">
        {(['all', 'eligible', 'new', 'updated'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              filter === f
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? 'All Incentives' : 
             f === 'eligible' ? `You're Eligible (${eligibleCount})` :
             f === 'new' ? 'New Programs' : 'Updated Programs'}
          </button>
        ))}
      </div>

      {/* INCENTIVE LIST */}
      <div className="space-y-4">
        {filteredIncentives.map((incentive) => (
          <NewIncentiveCard
            key={incentive.id}
            incentive={incentive}
            onViewDetails={() => setSelectedIncentive(incentive)}
            onApply={handleApply}
          />
        ))}
      </div>

      {filteredIncentives.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700 mb-2">No incentives found</p>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      )}

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedIncentive && (
          <IncentiveDetailModal
            incentive={selectedIncentive}
            onClose={() => setSelectedIncentive(null)}
            onApply={handleApply}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// NEW INCENTIVE CARD
// ==========================================

function NewIncentiveCard({
  incentive,
  onViewDetails,
  onApply,
}: {
  incentive: NewIncentive;
  onViewDetails: () => void;
  onApply: (incentive: NewIncentive) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-6 border-2 cursor-pointer hover:shadow-lg transition-shadow ${
        incentive.eligible
          ? 'bg-green-50 border-green-300'
          : 'bg-gray-50 border-gray-300'
      }`}
      onClick={onViewDetails}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {incentive.isNew && (
              <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                NEW
              </span>
            )}
            {incentive.isUpdated && (
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                UPDATED
              </span>
            )}
            {incentive.eligible && (
              <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                YOU QUALIFY
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">{incentive.name}</h3>
          <p className="text-gray-700 mb-3">{incentive.description}</p>

          {incentive.changes && (
            <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-3 mb-3">
              <p className="text-sm font-semibold text-blue-900">What Changed:</p>
              <p className="text-blue-700">{incentive.changes}</p>
            </div>
          )}

          <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3">
            <p className="text-sm font-semibold text-gray-700 mb-1">
              {incentive.eligible ? 'Why You Qualify:' : 'Why Not Eligible:'}
            </p>
            <p className={incentive.eligible ? 'text-green-700' : 'text-gray-700'}>{incentive.howQualified}</p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Effective: {new Date(incentive.effectiveDate).toLocaleDateString()}</span>
            </div>
            <div>Authority: {incentive.authority}</div>
          </div>
        </div>

        <div className="ml-4 text-right">
          <div className="text-sm text-gray-600 mb-1">Estimated Value</div>
          <div className="text-2xl font-bold text-purple-600 mb-1">
            BDT {(incentive.estimatedValue / 10000000).toFixed(2)} Cr
          </div>
          <div className="text-sm text-gray-600 mb-3">{incentive.duration}</div>

          {incentive.eligible && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onApply(incentive);
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Target className="w-5 h-5" />
              Apply Now
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// DETAIL MODAL
// ==========================================

function IncentiveDetailModal({
  incentive,
  onClose,
  onApply,
}: {
  incentive: NewIncentive;
  onClose: () => void;
  onApply: (incentive: NewIncentive) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{incentive.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Status Badges */}
          <div className="flex items-center gap-2">
            {incentive.isNew && (
              <span className="px-3 py-1 bg-purple-600 text-white text-sm font-bold rounded-full">NEW</span>
            )}
            {incentive.isUpdated && (
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">UPDATED</span>
            )}
            {incentive.eligible && (
              <span className="px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-full">YOU QUALIFY</span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Description:</h3>
            <p className="text-gray-700">{incentive.description}</p>
          </div>

          {/* Changes */}
          {incentive.changes && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 mb-2">What Changed:</h3>
              <p className="text-blue-700">{incentive.changes}</p>
            </div>
          )}

          {/* Eligibility */}
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Eligibility Criteria:</h3>
            <ul className="space-y-2">
              {incentive.eligibilityCriteria.map((criteria, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">{criteria}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Qualified */}
          <div className={`rounded-lg border-2 p-4 ${
            incentive.eligible ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`font-bold mb-2 ${incentive.eligible ? 'text-green-900' : 'text-gray-900'}`}>
              {incentive.eligible ? 'Why You Qualify:' : 'Why Not Eligible:'}
            </h3>
            <p className={incentive.eligible ? 'text-green-700' : 'text-gray-700'}>
              {incentive.howQualified}
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Authority:</h3>
              <p className="text-gray-700">{incentive.authority}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Source:</h3>
              <p className="text-gray-700">{incentive.source}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Effective Date:</h3>
              <p className="text-gray-700">{new Date(incentive.effectiveDate).toLocaleDateString()}</p>
            </div>
            {incentive.applyBy && (
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Apply By:</h3>
                <p className="text-red-700 font-semibold">{new Date(incentive.applyBy).toLocaleDateString()}</p>
              </div>
            )}
          </div>

          {/* Value */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <h3 className="font-bold text-purple-900 mb-2">Estimated Value:</h3>
            <div className="text-3xl font-bold text-purple-600">
              BDT {(incentive.estimatedValue / 10000000).toFixed(2)} Cr
            </div>
            <div className="text-sm text-purple-700 mt-1">Duration: {incentive.duration}</div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            {incentive.eligible && (
              <button
                onClick={() => onApply(incentive)}
                className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Target className="w-5 h-5" />
                Apply for This Incentive
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}