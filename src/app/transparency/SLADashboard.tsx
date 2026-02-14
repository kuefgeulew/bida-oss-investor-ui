/**
 * 📊 PUBLIC SLA DASHBOARD
 * MOUNT: Public homepage + Admin transparency tab
 * DEPENDENCY: slaEngine → agencyWorkflowEngine (if workflow engine dies, this crashes)
 */

import React from 'react';
import { 
  getSLAOverview, 
  getAgencySLAMetrics, 
  getServiceSLAMetrics,
  getBottlenecks,
  SLAMetrics,
  ServiceSLAMetrics,
  BottleneckAnalysis,
} from './slaEngine';
import { Clock, TrendingUp, AlertTriangle, CheckCircle, XCircle, Activity } from 'lucide-react';

export function SLADashboard() {
  // 🔌 ENGINE DEPENDENCY: If agencyWorkflowEngine is deleted, these calls fail
  const overview = getSLAOverview();
  const agencyMetrics = getAgencySLAMetrics();
  const serviceMetrics = getServiceSLAMetrics();
  const bottlenecks = getBottlenecks();

  return (
    <div className="min-h-screen bg-white/40 backdrop-blur-xl p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-light mb-2 text-gray-900">
            Service Level Agreement Performance
          </h1>
          <p className="text-gray-600">
            Real-time transparency into government service delivery
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Activity className="w-6 h-6" />}
            label="Total Agencies"
            value={overview.totalAgencies}
            color="blue"
          />
          <MetricCard
            icon={<CheckCircle className="w-6 h-6" />}
            label="On-Time Delivery"
            value={`${overview.overallOnTimePercentage}%`}
            color="green"
          />
          <MetricCard
            icon={<Clock className="w-6 h-6" />}
            label="Avg. Completion"
            value={`${overview.avgCompletionDays}d`}
            color="purple"
          />
          <MetricCard
            icon={<XCircle className="w-6 h-6" />}
            label="SLA Breaches"
            value={overview.totalSLABreaches}
            color="red"
          />
        </div>

        {/* Agency Performance Table */}
        <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Agency Performance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Agency</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Total Services</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Completed</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Avg. Days</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">SLA</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">On-Time %</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Breaches</th>
                </tr>
              </thead>
              <tbody>
                {agencyMetrics.map((metric) => (
                  <AgencyRow key={metric.agencyId} metric={metric} />
                ))}
                {agencyMetrics.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No workflow data available yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Service Performance */}
        <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-light mb-6">Service-Level Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Agency</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Processed</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Avg. Days</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">SLA</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">On-Time</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Late</th>
                </tr>
              </thead>
              <tbody>
                {serviceMetrics.slice(0, 15).map((metric) => (
                  <ServiceRow key={metric.serviceId} metric={metric} />
                ))}
                {serviceMetrics.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No completed services yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottlenecks */}
        {bottlenecks.length > 0 && (
          <div className="bg-white/60 backdrop-blur-md border border-red-200/50 rounded-2xl p-6">
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              Identified Bottlenecks
            </h2>
            <div className="space-y-4">
              {bottlenecks.slice(0, 10).map((bottleneck) => (
                <BottleneckCard key={bottleneck.serviceId} bottleneck={bottleneck} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, color }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number; 
  color: 'blue' | 'green' | 'purple' | 'red';
}) {
  const colorMap = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    red: 'bg-red-50 border-red-200 text-red-600',
  };

  return (
    <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6">
      <div className={`inline-flex p-3 rounded-xl mb-4 ${colorMap[color]}`}>
        {icon}
      </div>
      <div className="text-3xl font-light mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

function AgencyRow({ metric }: { metric: SLAMetrics }) {
  const performanceColor = 
    metric.onTimePercentage >= 90 ? 'text-green-600' :
    metric.onTimePercentage >= 70 ? 'text-yellow-600' :
    'text-red-600';

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      <td className="py-3 px-4 font-medium">{metric.agencyName}</td>
      <td className="py-3 px-4 text-right text-gray-600">{metric.totalServices}</td>
      <td className="py-3 px-4 text-right text-gray-600">{metric.completedServices}</td>
      <td className="py-3 px-4 text-right text-gray-600">{metric.averageCompletionDays}</td>
      <td className="py-3 px-4 text-right text-gray-500">{metric.avgSLA}d</td>
      <td className={`py-3 px-4 text-right font-medium ${performanceColor}`}>
        {metric.onTimePercentage}%
      </td>
      <td className="py-3 px-4 text-right text-red-600">{metric.slaBreaches}</td>
    </tr>
  );
}

function ServiceRow({ metric }: { metric: ServiceSLAMetrics }) {
  const isOnTime = metric.avgDaysToComplete <= metric.slaDays;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      <td className="py-3 px-4 font-medium">{metric.serviceName}</td>
      <td className="py-3 px-4 text-gray-600">{metric.agencyName}</td>
      <td className="py-3 px-4 text-right text-gray-600">{metric.totalProcessed}</td>
      <td className={`py-3 px-4 text-right font-medium ${isOnTime ? 'text-green-600' : 'text-red-600'}`}>
        {metric.avgDaysToComplete}d
      </td>
      <td className="py-3 px-4 text-right text-gray-500">{metric.slaDays}d</td>
      <td className="py-3 px-4 text-right text-green-600">{metric.onTimeCount}</td>
      <td className="py-3 px-4 text-right text-red-600">{metric.lateCount}</td>
    </tr>
  );
}

function BottleneckCard({ bottleneck }: { bottleneck: BottleneckAnalysis }) {
  return (
    <div className="flex items-start justify-between p-4 bg-red-50/50 border border-red-200/50 rounded-xl">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 mb-1">{bottleneck.serviceName}</h3>
        <p className="text-sm text-gray-600">{bottleneck.agencyName}</p>
      </div>
      <div className="flex gap-6 text-sm">
        <div className="text-right">
          <div className="text-gray-500">Frequency</div>
          <div className="font-medium text-red-600">{bottleneck.frequency}</div>
        </div>
        <div className="text-right">
          <div className="text-gray-500">Avg. Delay</div>
          <div className="font-medium text-red-600">{bottleneck.avgDelayDays}d</div>
        </div>
        <div className="text-right">
          <div className="text-gray-500">Investors</div>
          <div className="font-medium text-red-600">{bottleneck.affectedInvestors}</div>
        </div>
      </div>
    </div>
  );
}
