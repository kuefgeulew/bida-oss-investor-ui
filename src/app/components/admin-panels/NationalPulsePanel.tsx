// Feature 1: National Pulse - Real-time FDI governance intelligence
import { useState, useEffect } from 'react';
import { Card, Typography, IconWrap } from '@/app/components/ui-primitives';
import { Badge } from '../ui/badge';
import { 
  TrendingUp, DollarSign, Clock, CheckCircle2, Activity
} from 'lucide-react';
import { calculateNationalPulse, formatCurrency, type NationalPulseMetrics } from '@/app/admin-intelligence/nationalPulseEngine';

interface NationalPulsePanelProps {
  applications: any[];
  officers: any[];
  agencies: any[];
}

export function NationalPulsePanel({ applications, officers, agencies }: NationalPulsePanelProps) {
  const [pulseMetrics, setPulseMetrics] = useState<NationalPulseMetrics | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    refreshData();
    
    if (autoRefresh) {
      const interval = setInterval(refreshData, 120000); // Refresh every 2 minutes
      return () => clearInterval(interval);
    }
  }, [applications, officers, agencies, autoRefresh]);

  const refreshData = () => {
    setPulseMetrics(calculateNationalPulse(applications, officers, agencies));
  };

  if (!pulseMetrics) {
    return <div className="p-8 text-center">Loading National Pulse...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={Typography.pageTitle}>
            📊 National Pulse
          </h1>
          <p className={Typography.body}>Real-time FDI governance intelligence</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge 
            variant="outline"
            className={
              pulseMetrics.systemHealth === 'healthy' ? 'bg-green-100 text-green-800 border-green-300' :
              pulseMetrics.systemHealth === 'warning' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
              'bg-red-100 text-red-800 border-red-300'
            }
          >
            <Activity className="w-3 h-3 mr-1" />
            System: {pulseMetrics.systemHealth.toUpperCase()}
          </Badge>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-1.5 rounded text-sm ${
              autoRefresh ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {autoRefresh ? '● Live' : '○ Paused'}
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <p className={Typography.muted}>Total Pipeline Value</p>
            <DollarSign className="w-5 h-5 text-gray-700" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {formatCurrency(pulseMetrics.totalPipelineValue)}
          </p>
          <p className={`${Typography.muted} mt-1`}>{applications.length} active applications</p>
        </Card>

        <Card className="bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <p className={Typography.muted}>Approvals This Month</p>
            <CheckCircle2 className="w-5 h-5 text-gray-700" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{pulseMetrics.approvalsThisMonth}</p>
          <p className="text-sm text-gray-700 mt-1">
            <TrendingUp className="w-3 h-3 inline" /> +12% vs last month
          </p>
        </Card>

        <Card className="bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <p className={Typography.muted}>Avg Approval Time</p>
            <Clock className="w-5 h-5 text-gray-700" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{pulseMetrics.avgApprovalTime} days</p>
          <p className="text-sm text-gray-700 mt-1">Target: 60 days</p>
        </Card>

        <Card className="bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <p className={Typography.muted}>VIP Applications</p>
            <Activity className="w-5 h-5 text-gray-700" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{pulseMetrics.vipApplicationsActive}</p>
          <p className="text-sm text-gray-700 mt-1">Requiring priority attention</p>
        </Card>
      </div>

      {/* Status Distribution */}
      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4`}>Application Status Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-900">{pulseMetrics.pendingApplications}</p>
            <p className="text-sm text-yellow-700">Pending Review</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-900">{pulseMetrics.underReviewApplications}</p>
            <p className="text-sm text-blue-700">Under Review</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-900">{pulseMetrics.approvalsThisMonth}</p>
            <p className="text-sm text-green-700">Approved (This Month)</p>
          </div>
        </div>
      </Card>

      {/* Live Alerts */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className={Typography.sectionTitle}>🚨 Live Alerts</h3>
          <Badge variant="outline">{pulseMetrics.liveAlerts.length} active</Badge>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {pulseMetrics.liveAlerts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">✅ No active alerts - system running smoothly</p>
          ) : (
            pulseMetrics.liveAlerts.map(alert => (
              <div
                key={alert.id}
                className={`p-3 rounded border-l-4 ${
                  alert.severity === 'critical' ? 'bg-red-50 border-red-500' :
                  alert.severity === 'high' ? 'bg-orange-50 border-orange-500' :
                  alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{alert.message}</p>
                    <p className={`${Typography.muted} mt-1`}>
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {alert.severity}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Agency Delays */}
      {pulseMetrics.delayingAgencies.length > 0 && (
        <Card>
          <h3 className={`${Typography.sectionTitle} mb-4`}>⏰ Agencies Causing Delays</h3>
          <div className="space-y-3">
            {pulseMetrics.delayingAgencies.map((agency, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{agency.agency}</p>
                  <p className={Typography.body}>{agency.count} pending cases</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-600">{Math.round(agency.avgDelay)} days</p>
                  <p className={Typography.muted}>avg delay</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Officer Overload */}
      {pulseMetrics.overloadedOfficers.length > 0 && (
        <Card className="border-l-4 border-l-red-500">
          <h3 className={`${Typography.sectionTitle} mb-4`}>⚠️ Officers Under Overload</h3>
          <div className="space-y-3">
            {pulseMetrics.overloadedOfficers.map((officer, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">{officer.officer}</p>
                  <p className={Typography.body}>Capacity: {officer.maxCapacity} cases</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-600">{officer.load}</p>
                  <p className="text-xs text-red-700">+{officer.load - officer.maxCapacity} over limit</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}