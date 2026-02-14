/**
 * 🔔 INCENTIVE RENEWAL REMINDERS
 * 
 * Powers: Expiry warnings, renewal deadlines, action alerts
 * Mounted: Investor Dashboard → Intelligence Lab
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
  FileText,
  ExternalLink,
  X,
  Phone,
  Mail,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  getUpcomingRenewals,
  getUrgentRenewals,
  getReminderStats,
  formatBDT,
  type IncentiveRenewal,
} from '@/app/engines/incentiveReminderEngine';
import { useAuth } from '@/contexts/AuthContext'; // ✅ ADDED: Authentication gate

export function IncentiveRenewalReminders() {
  const { user } = useAuth(); // ✅ ADDED: Authentication gate
  
  // 🔒 AUTHENTICATION GATE: Do not render renewal reminders when logged out
  // ENFORCEMENT: No CSS hiding, no opacity, true conditional rendering
  if (!user) {
    return null; // No flash of content, clean render prevention
  }
  
  const [showAllRenewals, setShowAllRenewals] = useState(false);
  
  const stats = getReminderStats();
  const urgentRenewals = getUrgentRenewals();
  const allRenewals = getUpcomingRenewals();
  const displayRenewals = showAllRenewals ? allRenewals : urgentRenewals;

  const handleRenew = (renewal: IncentiveRenewal) => {
    toast.success(`Redirecting to renewal form for ${renewal.incentiveName}...`);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-8 h-8 text-slate-700" />
              <h2 className="text-2xl font-bold text-slate-900">Renewal Reminders</h2>
            </div>
            <p className="text-slate-600 text-base">
              Don't lose your incentives - stay on top of renewals
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-5">
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Urgent Renewals
            </div>
            <div className="text-2xl font-bold text-orange-600">{stats.urgentRenewals}</div>
            <div className="text-xs text-slate-600 mt-1">{"<"}60 days</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-slate-600 mb-1">Total Renewals</div>
            <div className="text-2xl font-bold text-slate-900">{stats.totalRenewals}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-slate-600 mb-1">Value at Risk</div>
            <div className="text-xl font-bold text-slate-900">{formatBDT(stats.totalValueAtRisk)}</div>
            <div className="text-xs text-slate-600 mt-1">per year</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-slate-600 mb-1">Overdue Items</div>
            <div className="text-2xl font-bold text-red-600">{stats.overdueItems}</div>
          </div>
        </div>
      </div>

      {/* TOGGLE */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">
          {showAllRenewals ? 'All Renewals' : 'Urgent Renewals (< 60 days)'}
        </h3>
        <button
          onClick={() => setShowAllRenewals(!showAllRenewals)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          {showAllRenewals ? 'Show Urgent Only' : 'Show All'}
        </button>
      </div>

      {/* RENEWAL LIST */}
      {displayRenewals.length === 0 ? (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-green-900 mb-2">All Clear!</h3>
          <p className="text-green-700">No urgent renewals at this time</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayRenewals.map((renewal) => (
            <RenewalCard
              key={renewal.id}
              renewal={renewal}
              onRenew={handleRenew}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// RENEWAL CARD
// ==========================================

function RenewalCard({
  renewal,
  onRenew,
}: {
  renewal: IncentiveRenewal;
  onRenew: (renewal: IncentiveRenewal) => void;
}) {
  const statusConfig = {
    urgent: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', badge: 'bg-red-600' },
    warning: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', badge: 'bg-orange-600' },
    upcoming: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', badge: 'bg-blue-600' },
  };

  const config = statusConfig[renewal.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${config.bg} border-2 ${config.border} rounded-xl p-6`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 ${config.badge} text-white text-xs font-bold rounded-full`}>
              {renewal.status.toUpperCase()}
            </span>
            <span className="text-sm text-gray-600">
              {renewal.daysUntilExpiry} days until expiry
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">{renewal.incentiveName}</h3>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className="text-sm text-gray-600">Expiry Date</div>
              <div className="font-semibold text-gray-900">
                {new Date(renewal.expiryDate).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Value at Risk</div>
              <div className="font-semibold text-purple-600">
                {formatBDT(renewal.valueAtRisk)}/year
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3">
            <div className="text-sm font-semibold text-gray-700 mb-2">Action Required:</div>
            <p className="text-gray-900">{renewal.actionRequired}</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="text-sm font-semibold text-gray-700 mb-2">Renewal Process:</div>
            <p className="text-gray-700 text-sm mb-2">{renewal.renewalProcess}</p>
            <div className="text-sm text-gray-600">
              Processing time: {renewal.estimatedProcessingDays} days
            </div>
          </div>
        </div>

        <button
          onClick={() => onRenew(renewal)}
          className={`ml-4 px-6 py-3 ${config.badge} text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2`}
        >
          <FileText className="w-5 h-5" />
          Renew Now
        </button>
      </div>

      {/* Required Documents */}
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <div className="text-sm font-semibold text-gray-700 mb-2">
          Required Documents ({renewal.requiredDocuments.length}):
        </div>
        <div className="grid grid-cols-2 gap-2">
          {renewal.requiredDocuments.map((doc, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>{doc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reminders Sent */}
      {renewal.remindersSent > 0 && (
        <div className="mt-3 text-sm text-gray-600">
          <Bell className="w-4 h-4 inline mr-1" />
          {renewal.remindersSent} reminder(s) sent · Last reminder: {new Date(renewal.lastReminderDate).toLocaleDateString()}
        </div>
      )}
    </motion.div>
  );
}