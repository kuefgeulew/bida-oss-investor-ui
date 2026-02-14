/**
 * 📋 INCENTIVE COMPLIANCE MONITOR
 * 
 * Powers: Real-time compliance tracking, rule enforcement, auto-warnings
 * Monitors: Export ratios, investment thresholds, workforce requirements
 * Mounted: Investor Dashboard → Intelligence Lab
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Info,
  AlertCircle,
  FileCheck,
  Target,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  getAllComplianceRules,
  getRulesByStatus,
  getActiveAlerts,
  getCriticalAlerts,
  getComplianceStats,
  getComplianceHistory,
  getRemediationSteps,
  type ComplianceRule,
  type ComplianceAlert,
} from '@/app/engines/incentiveComplianceEngine';
import { useAuth } from '@/contexts/AuthContext'; // ✅ ADDED: Authentication gate

export function IncentiveComplianceMonitor() {
  const { user } = useAuth(); // ✅ ADDED: Authentication gate
  
  // 🔒 AUTHENTICATION GATE: Do not render compliance monitor when logged out
  // ENFORCEMENT: No CSS hiding, no opacity, true conditional rendering
  if (!user) {
    return null; // No flash of content, clean render prevention
  }
  
  const [selectedRule, setSelectedRule] = useState<ComplianceRule | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'compliant' | 'warning' | 'violation'>('all');
  
  const stats = getComplianceStats();
  const allRules = getAllComplianceRules();
  const alerts = getActiveAlerts();
  const criticalAlerts = getCriticalAlerts();
  const history = getComplianceHistory();
  const remediationSteps = getRemediationSteps();
  
  const displayRules = filterStatus === 'all' 
    ? allRules 
    : getRulesByStatus(filterStatus);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-slate-700" />
              <h2 className="text-2xl font-bold text-slate-900">Compliance Monitor</h2>
            </div>
            <p className="text-slate-600 text-base">
              Real-time monitoring • Automatic warnings • Rule enforcement
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-xs text-slate-600 mb-1">Compliance Score</div>
            <div className="text-4xl font-bold text-slate-900">{stats.complianceScore}%</div>
            <div className={`text-sm font-semibold mt-1 ${
              stats.status === 'good' ? 'text-green-600' : 
              stats.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {stats.status === 'good' ? '✓ GOOD STANDING' : 
               stats.status === 'warning' ? '⚠ NEEDS ATTENTION' : '✗ CRITICAL'}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mt-5">
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-slate-600 mb-1">Total Rules</div>
            <div className="text-2xl font-bold text-slate-900">{stats.totalRules}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Compliant
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.compliant}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Warnings
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.warnings}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
              <XCircle className="w-3 h-3" />
              Violations
            </div>
            <div className="text-2xl font-bold text-red-600">{stats.violations}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-slate-600 mb-1">Active Alerts</div>
            <div className="text-2xl font-bold text-orange-600">{stats.activeAlerts}</div>
          </div>
        </div>
      </div>

      {/* CRITICAL ALERTS */}
      {criticalAlerts.length > 0 && (
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="text-xl font-bold text-red-900">
                {criticalAlerts.length} Critical Alert{criticalAlerts.length > 1 ? 's' : ''}
              </h3>
              <p className="text-red-700">Immediate action required to maintain incentives</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {criticalAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      )}

      {/* REMEDIATION STEPS */}
      {remediationSteps.length > 0 && (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
            <FileCheck className="w-6 h-6" />
            Action Required ({remediationSteps.length} issue{remediationSteps.length > 1 ? 's' : ''})
          </h3>
          
          <div className="space-y-4">
            {remediationSteps.map((step, idx) => (
              <div key={idx} className="bg-white rounded-lg border-2 border-orange-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">{step.incentiveName}</h4>
                    <p className="text-sm text-gray-700">{step.issue}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    step.urgency === 'critical' ? 'bg-red-600 text-white' : 'bg-orange-600 text-white'
                  }`}>
                    {step.urgency.toUpperCase()}
                  </span>
                </div>
                
                <div className="mt-3 space-y-1">
                  {step.steps.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="font-bold text-orange-600">{i + 1}.</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FILTERS */}
      <div className="flex gap-2">
        {(['all', 'compliant', 'warning', 'violation'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              filterStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'All Rules' : status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && ` (${getRulesByStatus(status).length})`}
          </button>
        ))}
      </div>

      {/* COMPLIANCE RULES */}
      <div className="space-y-4">
        {displayRules.map((rule) => (
          <ComplianceRuleCard
            key={rule.id}
            rule={rule}
            onClick={() => setSelectedRule(rule)}
          />
        ))}
      </div>

      {/* COMPLIANCE HISTORY */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Recent Compliance Checks
        </h3>
        
        <div className="space-y-2">
          {history.slice(0, 10).map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                {item.result === 'passed' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : item.result === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <div>
                  <div className="font-semibold text-gray-900">{item.incentiveName}</div>
                  <div className="text-sm text-gray-600">{item.checkType}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-900">{item.details}</div>
                <div className="text-xs text-gray-600">{new Date(item.date).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedRule && (
          <ComplianceRuleModal
            rule={selectedRule}
            onClose={() => setSelectedRule(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// ALERT CARD
// ==========================================

function AlertCard({ alert }: { alert: ComplianceAlert }) {
  const severityConfig = {
    critical: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-700' },
    high: { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-700' },
    medium: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-700' },
    low: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700' },
  };

  const config = severityConfig[alert.severity];

  return (
    <div className={`${config.bg} border-2 ${config.border} rounded-lg p-4`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-1 bg-red-600 text-white text-xs font-bold rounded`}>
              {alert.alertType.toUpperCase().replace(/-/g, ' ')}
            </span>
            <span className="text-sm text-gray-600">
              {new Date(alert.detectedAt).toLocaleDateString()}
            </span>
          </div>
          <h4 className="font-bold text-gray-900 mb-1">{alert.incentiveName}</h4>
          <p className={`${config.text} font-semibold mb-2`}>{alert.message}</p>
          <p className="text-gray-700 text-sm">{alert.actionRequired}</p>
          {alert.deadline && (
            <p className="text-sm text-gray-600 mt-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Deadline: {new Date(alert.deadline).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPLIANCE RULE CARD
// ==========================================

function ComplianceRuleCard({
  rule,
  onClick,
}: {
  rule: ComplianceRule;
  onClick: () => void;
}) {
  const statusConfig = {
    compliant: { bg: 'bg-green-50', border: 'border-green-300', icon: CheckCircle, iconColor: 'text-green-600' },
    warning: { bg: 'bg-orange-50', border: 'border-orange-300', icon: AlertTriangle, iconColor: 'text-orange-600' },
    violation: { bg: 'bg-red-50', border: 'border-red-300', icon: XCircle, iconColor: 'text-red-600' },
  };

  const config = statusConfig[rule.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${config.bg} border-2 ${config.border} rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <StatusIcon className={`w-6 h-6 ${config.iconColor}`} />
            <h3 className="text-lg font-bold text-gray-900">{rule.incentiveName}</h3>
          </div>

          <p className="text-gray-700 mb-3">{rule.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="text-sm text-gray-600 mb-1">Current Value</div>
              <div className="text-xl font-bold text-gray-900">
                {typeof rule.currentValue === 'number' ? rule.currentValue.toLocaleString() : rule.currentValue} {rule.unit}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="text-sm text-gray-600 mb-1">Required Value</div>
              <div className="text-xl font-bold text-gray-900">
                {typeof rule.requiredValue === 'number' ? rule.requiredValue.toLocaleString() : rule.requiredValue} {rule.unit}
              </div>
            </div>
          </div>

          {rule.status !== 'compliant' && (
            <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3">
              <div className="text-sm font-semibold text-gray-700 mb-1">Remediation:</div>
              <p className="text-gray-900 text-sm">{rule.remediation}</p>
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              {rule.autoMonitored ? (
                <Activity className="w-4 h-4 text-blue-600" />
              ) : (
                <Info className="w-4 h-4 text-gray-600" />
              )}
              <span>{rule.autoMonitored ? 'Auto-monitored' : 'Manual check'}</span>
            </div>
            <div>
              Next check: {new Date(rule.nextCheckDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="ml-4 text-center">
          <span className={`inline-block px-4 py-2 rounded-lg font-bold text-sm ${
            rule.riskLevel === 'critical' ? 'bg-red-600 text-white' :
            rule.riskLevel === 'high' ? 'bg-orange-600 text-white' :
            rule.riskLevel === 'medium' ? 'bg-yellow-600 text-white' :
            'bg-blue-600 text-white'
          }`}>
            {rule.riskLevel.toUpperCase()} RISK
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// COMPLIANCE RULE MODAL
// ==========================================

function ComplianceRuleModal({
  rule,
  onClose,
}: {
  rule: ComplianceRule;
  onClose: () => void;
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
        className="bg-white rounded-2xl max-w-2xl w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{rule.incentiveName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Requirement:</h3>
            <p className="text-gray-700">{rule.requirement}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Current Value</div>
              <div className="text-2xl font-bold text-gray-900">
                {typeof rule.currentValue === 'number' ? rule.currentValue.toLocaleString() : rule.currentValue} {rule.unit}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Required Value</div>
              <div className="text-2xl font-bold text-gray-900">
                {typeof rule.requiredValue === 'number' ? rule.requiredValue.toLocaleString() : rule.requiredValue} {rule.unit}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">Consequences:</h3>
            <p className="text-red-700">{rule.consequences}</p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">Remediation:</h3>
            <p className="text-gray-700">{rule.remediation}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              Last checked: {new Date(rule.lastChecked).toLocaleString()}
            </div>
            <div>
              Next check: {new Date(rule.nextCheckDate).toLocaleDateString()}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}