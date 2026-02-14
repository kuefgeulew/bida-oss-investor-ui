import { useState } from 'react';
import { Card, SectionContainer, IconWrap, Typography, PrimaryButton, SecondaryButton } from '../ui-primitives';
import { Badge } from '../ui/badge';
import { Download, Eye, Shield, Settings, Globe } from 'lucide-react';
import {
  getDropOffFunnel,
  getFDILoss,
  getIncentiveROI,
  getAuditLogs,
  getPrivacyMetrics,
  getPrivilegeLogs,
  getSLAImpactSimulation,
  getNotificationHealth,
  getFeatureUsage,
  getEODBMetrics,
  getRegionalBenchmark
} from '@/app/admin-core/adminDataProvider';

// Reusable Access Denied Component
function AccessDenied({ featureName }: { featureName: string }) {
  return (
    <div className="p-8">
      <Card className="max-w-2xl mx-auto bg-yellow-50 border-2 border-yellow-300 text-center">
        <h2 className={`${Typography.sectionTitle} text-yellow-900 mb-4`}>🔒 SuperAdmin Access Required</h2>
        <p className="text-yellow-800">
          {featureName} is a SuperAdmin-only feature. Contact your system administrator for elevated access.
        </p>
      </Card>
    </div>
  );
}

// ===== NATIONAL ANALYTICS PANELS (3 panels) =====

// Feature 13: Drop-Off Funnel
export function DropOffFunnelPanel() {
  const dropOffFunnel = getDropOffFunnel();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          📉 Investor Drop-Off Funnel
        </h1>
        <p className={Typography.body}>Analyze where investors abandon the process</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4`}>Conversion Funnel Analysis</h3>
        <div className="space-y-3">
          {dropOffFunnel.map((stage, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-gray-900">{stage.stage}</p>
                <p className={Typography.body}>{stage.count} investors</p>
              </div>
              <div className="h-12 bg-gray-900 rounded flex items-center justify-between px-4 text-white"
                style={{ width: `${(stage.count / dropOffFunnel[0].count) * 100}%` }}
              >
                <span className="font-bold">{stage.count}</span>
                {stage.dropRate > 0 && (
                  <span className="text-sm">-{stage.dropRate.toFixed(1)}% drop</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Feature 14: FDI Loss Detector
export function FDILossDetectorPanel() {
  const fdiLossCalculation = getFDILoss();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          💰 FDI Loss Detector
        </h1>
        <p className={Typography.body}>Calculate investment loss due to delays</p>
      </div>

      <Card className="bg-red-50">
        <h3 className={`${Typography.sectionTitle} mb-4 text-red-900`}>FDI Loss Due to Delays</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className={Typography.muted}>Current Avg Approval Time</p>
            <p className="text-3xl font-bold text-red-900">{fdiLossCalculation.avgApprovalDays} days</p>
          </div>
          <div>
            <p className={Typography.muted}>Target Time</p>
            <p className="text-3xl font-bold text-green-900">{fdiLossCalculation.targetDays} days</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded border-2 border-red-300">
          <p className={`${Typography.muted} mb-2`}>Estimated FDI Lost to Delays</p>
          <p className="text-4xl font-bold text-red-600">
            ${(fdiLossCalculation.estimatedLoss / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm text-red-700 mt-2">
            If approval time reduced to {fdiLossCalculation.targetDays} days → Potential to retain this value
          </p>
        </div>
      </Card>
    </div>
  );
}

// Feature 15: Incentive ROI Tracker
export function IncentiveROIPanel() {
  const incentiveROI = getIncentiveROI();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          💵 Incentive ROI Tracker
        </h1>
        <p className={Typography.body}>Measure return on investment incentive programs</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4`}>Incentive ROI Analysis</h3>
        <div className="space-y-3">
          {incentiveROI.map((inc, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">{inc.incentive}</p>
                <Badge variant="outline" className={inc.roi > 3 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  ROI: {inc.roi}x
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className={Typography.muted}>Cost</p>
                  <p className="font-bold text-gray-900">${(inc.cost / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className={Typography.muted}>Tax Return</p>
                  <p className="font-bold text-green-600">${(inc.returnTax / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className={Typography.muted}>Jobs</p>
                  <p className="font-bold text-gray-900">{inc.returnJobs}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ===== SECURITY & AUDIT PANELS (3 panels) =====

// Feature 16: Audit Log Viewer
export function AuditLogPanel({ role }: { role?: 'admin' | 'superadmin' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const auditLogs = getAuditLogs();

  // SuperAdmin-only feature
  if (role !== 'superadmin') {
    return <AccessDenied featureName="Audit Log" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          📋 Admin Audit Log
        </h1>
        <p className={Typography.body}>Track all administrative actions and changes</p>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`${Typography.sectionTitle} flex items-center gap-2`}>
            <Eye className="w-5 h-5 text-gray-700" />
            Action Audit Trail
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            />
            <PrimaryButton className="px-3 py-1 text-sm flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export
            </PrimaryButton>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left text-gray-900">Timestamp</th>
                <th className="p-2 text-left text-gray-900">User</th>
                <th className="p-2 text-left text-gray-900">Action</th>
                <th className="p-2 text-left text-gray-900">Module</th>
                <th className="p-2 text-left text-gray-900">IP</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.filter(log => 
                !searchTerm || log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                log.user.toLowerCase().includes(searchTerm.toLowerCase())
              ).map(log => (
                <tr key={log.id} className="border-t">
                  <td className={`p-2 ${Typography.muted}`}>{log.timestamp}</td>
                  <td className="p-2 font-medium text-gray-900">{log.user}</td>
                  <td className="p-2 text-gray-900">{log.action}</td>
                  <td className="p-2"><Badge variant="outline">{log.module}</Badge></td>
                  <td className={`p-2 ${Typography.muted}`}>{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// Feature 17: Privacy Compliance Panel
export function PrivacyPanelPanel() {
  const privacyMetrics = getPrivacyMetrics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          🔐 Privacy Compliance
        </h1>
        <p className={Typography.body}>Monitor GDPR and data protection compliance</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4 flex items-center gap-2`}>
          <Shield className="w-5 h-5 text-gray-700" />
          Data Privacy & GDPR Compliance
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded">
            <p className={Typography.muted}>Consent Logs Recorded</p>
            <p className="text-3xl font-bold text-gray-900">{privacyMetrics.consentLogsRecorded}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <p className={Typography.muted}>GDPR Compliance Score</p>
            <p className="text-3xl font-bold text-gray-900">{privacyMetrics.gdprCompliance}%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <p className={Typography.muted}>Data Deletion Requests</p>
            <p className="text-3xl font-bold text-gray-900">{privacyMetrics.dataDeletionRequests}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <p className={Typography.muted}>PII Masking</p>
            <p className="text-xl font-bold text-gray-900">
              {privacyMetrics.piiMaskingEnabled ? '✅ Enabled' : '❌ Disabled'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Feature 18: Privilege Log
export function PrivilegeLogPanel() {
  const privilegeEscalations = getPrivilegeLogs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          🔑 Privilege Escalation Log
        </h1>
        <p className={Typography.body}>Track temporary privilege elevation events</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4`}>Recent Privilege Escalations</h3>
        <div className="space-y-3">
          {privilegeEscalations.map((esc, idx) => (
            <div key={idx} className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900">{esc.user}</p>
                  <p className={Typography.body}>Elevated to: {esc.elevated}</p>
                </div>
                <Badge variant="outline">Duration: {esc.duration}</Badge>
              </div>
              <p className={Typography.body}>Reason: {esc.reason}</p>
              <div className={Typography.muted}>
                <p>Granted: {esc.granted}</p>
                <p>Expires: {esc.expires}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ===== SYSTEM CONFIG PANELS (3 panels) =====

// Feature 19: SLA Simulator
export function SLASimulatorPanel() {
  const [slaSimulationDays, setSlaSimulationDays] = useState(60);
  const slaImpact = getSLAImpactSimulation(slaSimulationDays);

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          ⚙️ SLA Sensitivity Simulator
        </h1>
        <p className={Typography.body}>Model impact of SLA policy changes</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4 flex items-center gap-2`}>
          <Settings className="w-5 h-5 text-gray-700" />
          SLA Impact Simulation
        </h3>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            SLA Target (days): {slaSimulationDays}
          </label>
          <input
            type="range"
            min="30"
            max="90"
            value={slaSimulationDays}
            onChange={(e) => setSlaSimulationDays(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded">
            <p className={Typography.muted}>Officer Load Impact</p>
            <p className="text-3xl font-bold text-gray-900">{slaImpact.officerLoad.toFixed(0)}%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <p className={Typography.muted}>Expected Delays</p>
            <p className="text-3xl font-bold text-gray-900">{slaImpact.expectedDelays.toFixed(0)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <p className={Typography.muted}>Investor Satisfaction</p>
            <p className="text-3xl font-bold text-gray-900">{slaImpact.investorSatisfaction.toFixed(0)}%</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Feature 20: Notification Health
export function NotificationHealthPanel() {
  const notificationStats = getNotificationHealth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          🔔 Notification Health Monitor
        </h1>
        <p className={Typography.body}>Detect alert fatigue and notification overload</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4`}>Notification System Health</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded">
            <p className={Typography.muted}>Avg Notifications Per User</p>
            <p className="text-3xl font-bold text-gray-900">{notificationStats.avgPerUser}/week</p>
          </div>

          <div className="p-4 bg-gray-50 rounded">
            <p className={`${Typography.muted} mb-2`}>System Health Status</p>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              {notificationStats.systemHealth}
            </Badge>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">High Alert Users:</p>
            <div className="space-y-2">
              {notificationStats.highAlertUsers.map((user, idx) => (
                <div key={idx} className="p-2 bg-yellow-50 rounded text-sm text-gray-900">
                  {user}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Feature 21: Feature Usage Analytics
export function FeatureUsagePanel() {
  const featureUsage = getFeatureUsage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          📊 Feature Usage Analytics
        </h1>
        <p className={Typography.body}>Track adoption of platform features</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4`}>Feature Adoption Rates</h3>
        <div className="space-y-3">
          {featureUsage.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-gray-900">{item.feature}</p>
                <p className={Typography.body}>{item.usage}%</p>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    item.usage >= 75 ? 'bg-green-500' :
                    item.usage >= 50 ? 'bg-blue-500' :
                    item.usage >= 25 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${item.usage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ===== EODB & BENCHMARK PANELS (2 panels) =====

// Feature 22: EODB Reform Tracker
export function EODBTrackerPanel() {
  const eodbMetrics = getEODBMetrics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          📈 EODB Reform Tracker
        </h1>
        <p className={Typography.body}>Monitor Ease of Doing Business improvements</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4 flex items-center gap-2`}>
          <Globe className="w-5 h-5 text-gray-700" />
          EODB Indicators Progress
        </h3>
        <div className="space-y-4">
          {eodbMetrics.map((metric, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded">
              <p className="font-medium text-gray-900 mb-2">{metric.indicator}</p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className={Typography.muted}>BD Score</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.bdScore}</p>
                </div>
                <div>
                  <p className={Typography.muted}>Target</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.targetScore}</p>
                </div>
                <div>
                  <p className={Typography.muted}>World Avg</p>
                  <p className="text-2xl font-bold text-gray-700">{metric.worldAvg}</p>
                </div>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gray-900"
                  style={{ width: `${(metric.bdScore / metric.targetScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Feature 23: Regional Benchmark
export function RegionalBenchmarkPanel() {
  const regionalBenchmark = getRegionalBenchmark();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          🌏 Regional Benchmark Comparison
        </h1>
        <p className={Typography.body}>Compare Bangladesh FDI performance vs regional peers</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4`}>Regional Competitiveness Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left text-gray-900">Country</th>
                <th className="p-2 text-center text-gray-900">FDI Score</th>
                <th className="p-2 text-center text-gray-900">Approval Days</th>
                <th className="p-2 text-center text-gray-900">Digital Score</th>
              </tr>
            </thead>
            <tbody>
              {regionalBenchmark.map((country, idx) => (
                <tr key={idx} className={`border-t ${country.country === 'Bangladesh' ? 'bg-blue-50 font-bold' : ''}`}>
                  <td className="p-2 text-gray-900">{country.country}</td>
                  <td className="p-2 text-center">
                    <span className={`font-bold ${
                      country.fdiScore >= 80 ? 'text-green-600' :
                      country.fdiScore >= 65 ? 'text-blue-600' :
                      'text-orange-600'
                    }`}>{country.fdiScore}</span>
                  </td>
                  <td className="p-2 text-center text-gray-900">{country.approvalDays} days</td>
                  <td className="p-2 text-center text-gray-900">{country.digitalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// Export all panels
export const AdditionalAdminPanels = {
  DropOffFunnelPanel,
  FDILossDetectorPanel,
  IncentiveROIPanel,
  AuditLogPanel,
  PrivacyPanelPanel,
  PrivilegeLogPanel,
  SLASimulatorPanel,
  NotificationHealthPanel,
  FeatureUsagePanel,
  EODBTrackerPanel,
  RegionalBenchmarkPanel
};