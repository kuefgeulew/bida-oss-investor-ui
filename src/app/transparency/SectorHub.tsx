/**
 * 🏭 SECTOR HUB — Sector-Specific Intelligence Dashboard
 * MOUNT: /sectors/[sector] route
 * DEPENDENCY: sectorEngine → agencyWorkflowEngine + paymentEngine
 */

import React from 'react';
import { 
  getSectorIntelligence, 
  getAllSectorSummaries,
  SectorType,
  SectorIntelligence 
} from './sectorEngine';
import { 
  Factory, 
  Pill, 
  Monitor, 
  Building2, 
  Briefcase, 
  Sprout,
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Users,
  BarChart3,
} from 'lucide-react';

const SECTOR_ICONS: Record<SectorType, React.ReactNode> = {
  rmg: <Factory className="w-6 h-6" />,
  pharma: <Pill className="w-6 h-6" />,
  it: <Monitor className="w-6 h-6" />,
  manufacturing: <Building2 className="w-6 h-6" />,
  services: <Briefcase className="w-6 h-6" />,
  agro: <Sprout className="w-6 h-6" />,
};

interface SectorHubProps {
  sector: SectorType;
}

export function SectorHub({ sector }: SectorHubProps) {
  // 🔌 ENGINE DEPENDENCY: Crashes if agencyWorkflowEngine or paymentEngine removed
  const intelligence = getSectorIntelligence(sector);

  return (
    <div className="min-h-screen bg-white/40 backdrop-blur-xl p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
              {SECTOR_ICONS[sector]}
            </div>
            <div>
              <h1 className="text-4xl font-light text-gray-900">
                {intelligence.sectorName}
              </h1>
              <p className="text-gray-600">{intelligence.description}</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Users className="w-6 h-6" />}
            label="Active Investors"
            value={intelligence.activeInvestors}
            color="blue"
          />
          <MetricCard
            icon={<Clock className="w-6 h-6" />}
            label="Avg. Approval Time"
            value={`${intelligence.avgApprovalTime}d`}
            color="purple"
          />
          <MetricCard
            icon={<CheckCircle className="w-6 h-6" />}
            label="Completion Rate"
            value={`${intelligence.completionRate}%`}
            color="green"
          />
          <MetricCard
            icon={<DollarSign className="w-6 h-6" />}
            label="Avg. Fees"
            value={`৳${intelligence.avgFeesPerInvestor.toLocaleString()}`}
            color="orange"
          />
        </div>

        {/* Investment Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Investment Overview
            </h2>
            <div className="space-y-4">
              <StatRow 
                label="Total Investment" 
                value={`$${(intelligence.totalInvestment / 1000000).toFixed(1)}M`} 
              />
              <StatRow 
                label="Average Investment Size" 
                value={`$${(intelligence.avgInvestmentSize / 1000).toFixed(0)}K`} 
              />
              <StatRow 
                label="Total Fees Collected" 
                value={`৳${intelligence.totalFeesPaid.toLocaleString()}`} 
              />
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Application Status
            </h2>
            <div className="space-y-4">
              <StatRow 
                label="Active Applications" 
                value={intelligence.activeApplications.toString()} 
              />
              <StatRow 
                label="Completed Applications" 
                value={intelligence.completedApplications.toString()} 
              />
              <StatRow 
                label="Success Rate" 
                value={`${intelligence.completionRate}%`} 
              />
            </div>
          </div>
        </div>

        {/* Relevant Services */}
        <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-medium mb-6">Key Services for This Sector</h2>
          {intelligence.relevantServices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Service</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Agency</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Avg. Days</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">SLA</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {intelligence.relevantServices.map((service) => {
                    const isOnTime = service.avgDays <= service.slaInDays;
                    return (
                      <tr key={service.serviceId} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 px-4 font-medium">{service.serviceName}</td>
                        <td className="py-3 px-4 text-gray-600">{service.agencyName}</td>
                        <td className={`py-3 px-4 text-right font-medium ${isOnTime ? 'text-green-600' : 'text-red-600'}`}>
                          {service.avgDays}d
                        </td>
                        <td className="py-3 px-4 text-right text-gray-500">{service.slaInDays}d</td>
                        <td className="py-3 px-4 text-right">
                          {isOnTime ? (
                            <span className="text-green-600 font-medium">✓ On Time</span>
                          ) : (
                            <span className="text-red-600 font-medium">⚠ Delayed</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No service data available yet</p>
          )}
        </div>

        {/* Bottlenecks */}
        {intelligence.bottlenecks.length > 0 && (
          <div className="bg-white/60 backdrop-blur-md border border-red-200/50 rounded-2xl p-6">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Common Bottlenecks
            </h2>
            <div className="space-y-3">
              {intelligence.bottlenecks.map((bottleneck, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-red-50/50 border border-red-200/50 rounded-xl">
                  <div>
                    <h3 className="font-medium text-gray-900">{bottleneck.serviceName}</h3>
                    <p className="text-sm text-gray-600">{bottleneck.agencyName}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Frequency</div>
                    <div className="font-medium text-red-600">{bottleneck.frequency}</div>
                  </div>
                </div>
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
  color: 'blue' | 'green' | 'purple' | 'orange';
}) {
  const colorMap = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
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

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

/**
 * 🗂️ SECTOR DIRECTORY
 * Shows all available sectors
 */
export function SectorDirectory() {
  const sectors = getAllSectorSummaries();

  return (
    <div className="min-h-screen bg-white/40 backdrop-blur-xl p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-light mb-2 text-gray-900">Sector Hubs</h1>
          <p className="text-gray-600">Explore investment intelligence by sector</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => (
            <SectorCard key={sector.sector} sector={sector} />
          ))}
        </div>

        {sectors.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No sector data available yet</p>
            <p className="text-gray-400 text-sm mt-2">Data will appear as investors complete workflows</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SectorCard({ sector }: { sector: { sector: SectorType; name: string; activeInvestors: number; avgApprovalTime: number; completionRate: number } }) {
  return (
    <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
          {SECTOR_ICONS[sector.sector]}
        </div>
        <div>
          <h3 className="font-medium text-lg text-gray-900">{sector.name}</h3>
          <p className="text-sm text-gray-600">{sector.activeInvestors} active investors</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-500">Avg. Approval</div>
          <div className="font-medium text-gray-900">{sector.avgApprovalTime}d</div>
        </div>
        <div>
          <div className="text-gray-500">Success Rate</div>
          <div className="font-medium text-gray-900">{sector.completionRate}%</div>
        </div>
      </div>
    </div>
  );
}
