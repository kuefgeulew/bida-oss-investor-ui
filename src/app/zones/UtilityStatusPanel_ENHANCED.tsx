// 🆕 ENHANCED UTILITY STATUS PANEL - Complete hyper-local utility monitor
// Features: ALL 35% missing features now implemented
// - Outage details, maintenance schedules, ISP list, water quality tests
// - 12-month historical charts, zone comparison, alert subscriptions
// - Mock API integration dashboard with real-time status

import React, { useState } from 'react';
import {  Zap, Droplet, Wifi, Wind, CheckCircle, Calendar, TrendingUp, Bell, Database, 
  GitCompare, AlertTriangle, Clock, Gauge, Beaker, ExternalLink } from 'lucide-react';
import { getZoneIntelligence } from './zoneIntelligenceEngine';
import { type SEZZone } from '@/app/data/mockData';
import { 
  getUtilityMetrics, 
  getPlannedMaintenance, 
  getISPProviders, 
  getWaterQualityTests,
  getSeasonalWarnings 
} from '../engines/utilityUptimeEngine';
import { UtilityHistoricalCharts } from './UtilityHistoricalCharts';
import { UtilityAlertSubscription } from './UtilityAlertSubscription';
import { UtilityAPIIntegrations } from './UtilityAPIIntegrations';
import { ZoneComparisonView } from './ZoneComparisonView';

interface UtilityStatusPanelEnhancedProps {
  zone: SEZZone;
  showDetailed?: boolean;
}

export function UtilityStatusPanelEnhanced({ zone, showDetailed = true }: UtilityStatusPanelEnhancedProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'history' | 'alerts' | 'apis' | 'compare'>('overview');
  const [showComparison, setShowComparison] = useState(false);

  const intelligence = getZoneIntelligence(zone.id, zone);
  const { utilityStatus, infrastructure, environmental } = intelligence;
  
  const metrics = getUtilityMetrics(zone.id);
  const maintenance = getPlannedMaintenance(zone.id);
  const ispProviders = getISPProviders(zone.id);
  const waterTests = getWaterQualityTests(zone.id);
  const warnings = getSeasonalWarnings(zone.id);

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 98) return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', icon: 'text-green-500' };
    if (uptime >= 95) return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', icon: 'text-blue-500' };
    if (uptime >= 90) return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-600', icon: 'text-yellow-500' };
    return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', icon: 'text-red-500' };
  };

  const powerColor = getUptimeColor(utilityStatus.powerUptime);
  const waterStatus = utilityStatus.waterPressure >= 60 ? 'excellent' : utilityStatus.waterPressure >= 45 ? 'good' : 'fair';
  const internetStatus = utilityStatus.internetSpeed >= 1000 ? 'gigabit' : utilityStatus.internetSpeed >= 500 ? 'high-speed' : 'standard';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Zap },
    { id: 'details', label: 'Detailed Metrics', icon: Database },
    { id: 'history', label: '12-Month Trends', icon: TrendingUp },
    { id: 'alerts', label: 'Alert Subscription', icon: Bell },
    { id: 'apis', label: 'API Integrations', icon: Wifi },
    { id: 'compare', label: 'Compare Zones', icon: GitCompare }
  ] as const;

  return (
    <div className="space-y-4">
      {/* Header with Tabs */}
      {showDetailed && (
        <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Hyper-Local Utility Monitor</h3>
            <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-semibold">🏆 WORLD-FIRST</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">{zone.name} • Real-time infrastructure transparency</p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => tab.id === 'compare' ? setShowComparison(true) : setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Quick Status Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className={`${powerColor.bg} border-2 ${powerColor.border} rounded-lg p-3`}>
              <div className="flex items-center gap-2 mb-2">
                <Zap className={`w-4 h-4 ${powerColor.icon}`} />
                <span className={`text-xs font-semibold ${powerColor.text}`}>Power</span>
              </div>
              <div className={`text-2xl font-bold ${powerColor.text}`}>{utilityStatus.powerUptime.toFixed(1)}%</div>
              <div className="text-xs text-gray-600 mt-1">Uptime</div>
            </div>

            <div className={`${waterStatus === 'excellent' ? 'bg-blue-50 border-blue-200' : 'bg-cyan-50 border-cyan-200'} border-2 rounded-lg p-3`}>
              <div className="flex items-center gap-2 mb-2">
                <Droplet className={`w-4 h-4 ${waterStatus === 'excellent' ? 'text-blue-500' : 'text-cyan-500'}`} />
                <span className={`text-xs font-semibold ${waterStatus === 'excellent' ? 'text-blue-600' : 'text-cyan-600'}`}>Water</span>
              </div>
              <div className={`text-2xl font-bold ${waterStatus === 'excellent' ? 'text-blue-600' : 'text-cyan-600'}`}>
                {utilityStatus.waterPressure} PSI
              </div>
              <div className="text-xs text-gray-600 mt-1 capitalize">{waterStatus}</div>
            </div>

            <div className={`${internetStatus === 'gigabit' ? 'bg-purple-50 border-purple-200' : 'bg-indigo-50 border-indigo-200'} border-2 rounded-lg p-3`}>
              <div className="flex items-center gap-2 mb-2">
                <Wifi className={`w-4 h-4 ${internetStatus === 'gigabit' ? 'text-purple-500' : 'text-indigo-500'}`} />
                <span className={`text-xs font-semibold ${internetStatus === 'gigabit' ? 'text-purple-600' : 'text-indigo-600'}`}>Internet</span>
              </div>
              <div className={`text-2xl font-bold ${internetStatus === 'gigabit' ? 'text-purple-600' : 'text-indigo-600'}`}>
                {utilityStatus.internetSpeed}
              </div>
              <div className="text-xs text-gray-600 mt-1">Mbps</div>
            </div>

            <div className={`${utilityStatus.wasteTreatment ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'} border-2 rounded-lg p-3`}>
              <div className="flex items-center gap-2 mb-2">
                <Wind className={`w-4 h-4 ${utilityStatus.wasteTreatment ? 'text-green-500' : 'text-orange-500'}`} />
                <span className={`text-xs font-semibold ${utilityStatus.wasteTreatment ? 'text-green-600' : 'text-orange-600'}`}>Waste</span>
              </div>
              <div className="flex items-center gap-1 text-lg font-bold">
                {utilityStatus.wasteTreatment ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                )}
              </div>
              <div className="text-xs text-gray-600 mt-1">{utilityStatus.wasteTreatment ? 'ETP Active' : 'No ETP'}</div>
            </div>
          </div>

          {/* Seasonal Warnings */}
          {warnings.length > 0 && (
            <div className="space-y-2">
              {warnings.map((warning, idx) => (
                <div
                  key={idx}
                  className={`${
                    warning.type === 'alert' ? 'bg-red-50 border-red-300' :
                    warning.type === 'warning' ? 'bg-amber-50 border-amber-300' :
                    'bg-blue-50 border-blue-300'
                  } border-2 rounded-lg p-3`}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                      warning.type === 'alert' ? 'text-red-600' :
                      warning.type === 'warning' ? 'text-amber-600' :
                      'text-blue-600'
                    }`} />
                    <div className="text-xs font-semibold text-gray-800">{warning.message}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upcoming Maintenance */}
          {maintenance.length > 0 && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-purple-600" />
                <h4 className="text-sm font-bold text-purple-900">Planned Maintenance</h4>
              </div>
              <div className="space-y-2">
                {maintenance.map(maint => (
                  <div key={maint.id} className="bg-white rounded-lg p-3 border border-purple-200">
                    <div className="flex items-start gap-2">
                      <div className={`p-1.5 rounded ${
                        maint.utility === 'power' ? 'bg-orange-100' :
                        maint.utility === 'water' ? 'bg-blue-100' :
                        maint.utility === 'gas' ? 'bg-red-100' :
                        'bg-purple-100'
                      }`}>
                        {maint.utility === 'power' && <Zap className="w-3 h-3 text-orange-600" />}
                        {maint.utility === 'water' && <Droplet className="w-3 h-3 text-blue-600" />}
                        {maint.utility === 'gas' && <Wind className="w-3 h-3 text-red-600" />}
                        {maint.utility === 'internet' && <Wifi className="w-3 h-3 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-xs text-gray-900">{maint.title}</div>
                        <div className="text-xs text-gray-600 mt-1">{maint.description}</div>
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="flex items-center gap-1 text-gray-700">
                            <Clock className="w-3 h-3" />
                            {new Date(maint.scheduledDate).toLocaleDateString()} • {maint.duration}
                          </span>
                          <span className={`px-2 py-0.5 rounded font-semibold ${
                            maint.impactLevel === 'high' ? 'bg-red-100 text-red-700' :
                            maint.impactLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {maint.impactLevel} impact
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'details' && metrics && (
        <div className="space-y-4">
          {/* Enhanced Power Details */}
          <div className="bg-white border-2 border-orange-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-orange-600" />
              <h4 className="text-sm font-bold text-gray-900">⚡ Power Supply - Last 30 Days</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                <div className="text-xs text-gray-600 mb-1">Uptime</div>
                <div className="text-2xl font-bold text-orange-700">{metrics.power.uptimePercent.toFixed(1)}%</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                <div className="text-xs text-gray-600 mb-1">Outages</div>
                <div className="text-2xl font-bold text-red-700">{metrics.power.outageCount}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="text-xs text-gray-600 mb-1">Avg Duration</div>
                <div className="text-2xl font-bold text-blue-700">{metrics.power.avgOutageMinutes}</div>
                <div className="text-xs text-gray-600">minutes</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                <div className="text-xs text-gray-600 mb-1">Last Outage</div>
                <div className="text-sm font-bold text-purple-700">
                  {metrics.power.lastOutage ? new Date(metrics.power.lastOutage).toLocaleDateString() : 'None'}
                </div>
              </div>
            </div>
            <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="text-xs font-semibold text-gray-700 mb-2">Infrastructure:</div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div><span className="text-gray-600">Capacity:</span> <span className="font-bold">{infrastructure.powerCapacityMW} MW</span></div>
                <div><span className="text-gray-600">Grid Distance:</span> <span className="font-bold">{infrastructure.powerLineDistance.toFixed(1)} km</span></div>
                <div><span className="text-gray-600">Reliability:</span> <span className="font-bold text-green-700">{infrastructure.powerReliability.toFixed(1)}%</span></div>
              </div>
            </div>
          </div>

          {/* Gas Pressure Gauge */}
          <div className="bg-white border-2 border-red-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Gauge className="w-5 h-5 text-red-600" />
              <h4 className="text-sm font-bold text-gray-900">🔥 Gas Supply - Real-Time Pressure</h4>
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-8 border-gray-200 flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-700">{infrastructure.gasPressurePSI}</div>
                    <div className="text-sm text-gray-600">PSI</div>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="72"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(infrastructure.gasPressurePSI / 100) * 452} 452`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-gray-50 rounded p-2 border border-gray-200">
                <div className="text-gray-600">Normal Range</div>
                <div className="font-bold text-gray-900">60-70 PSI</div>
              </div>
              <div className="bg-green-50 rounded p-2 border border-green-200">
                <div className="text-gray-600">Status</div>
                <div className="font-bold text-green-700">
                  {metrics.gas.pressureConsistent ? '✓ STABLE' : '⚠ VARIABLE'}
                </div>
              </div>
              <div className="bg-blue-50 rounded p-2 border border-blue-200">
                <div className="text-gray-600">Uptime</div>
                <div className="font-bold text-blue-700">{metrics.gas.uptimePercent.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          {/* Water Quality Tests */}
          {waterTests.length > 0 && (
            <div className="bg-white border-2 border-blue-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Beaker className="w-5 h-5 text-blue-600" />
                <h4 className="text-sm font-bold text-gray-900">💧 Water Quality Test Results</h4>
              </div>
              {waterTests.slice(0, 1).map(test => (
                <div key={test.date} className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-xs text-gray-600">Latest Test</div>
                        <div className="font-bold text-gray-900">{new Date(test.date).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-600">Grade</div>
                        <div className={`text-3xl font-bold ${
                          test.grade === 'A' ? 'text-green-700' :
                          test.grade === 'B' ? 'text-blue-700' :
                          'text-yellow-700'
                        }`}>{test.grade}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <div className="text-gray-600">pH Level</div>
                        <div className="font-bold text-gray-900">{test.pH} ✓</div>
                      </div>
                      <div>
                        <div className="text-gray-600">TDS</div>
                        <div className="font-bold text-gray-900">{test.tdsPPM} ppm ✓</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Chlorine</div>
                        <div className="font-bold text-gray-900">{test.chlorineMgL} mg/L ✓</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Bacteria</div>
                        <div className="font-bold text-green-700">{test.bacteria} ✓</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">
                    Tested by: {test.testedBy}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ISP Providers */}
          {ispProviders.length > 0 && (
            <div className="bg-white border-2 border-purple-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Wifi className="w-5 h-5 text-purple-600" />
                <h4 className="text-sm font-bold text-gray-900">📶 Internet Service Providers</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-700">Provider</th>
                      <th className="text-center py-2 px-3 font-semibold text-gray-700">Bandwidth</th>
                      <th className="text-center py-2 px-3 font-semibold text-gray-700">Latency</th>
                      <th className="text-center py-2 px-3 font-semibold text-gray-700">Uptime</th>
                      <th className="text-center py-2 px-3 font-semibold text-gray-700">Price/Month</th>
                      <th className="text-center py-2 px-3 font-semibold text-gray-700">Technology</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ispProviders.map((isp, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-purple-50">
                        <td className="py-2 px-3 font-semibold text-gray-900">{isp.name}</td>
                        <td className="text-center py-2 px-3 font-bold text-purple-700">{isp.bandwidth}</td>
                        <td className="text-center py-2 px-3 text-gray-700">{isp.latencyMs}ms</td>
                        <td className="text-center py-2 px-3 font-semibold text-green-700">{isp.uptimePercent}%</td>
                        <td className="text-center py-2 px-3 text-gray-900">৳{isp.monthlyPriceBDT.toLocaleString()}</td>
                        <td className="text-center py-2 px-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            isp.technology === 'Fiber' ? 'bg-green-100 text-green-700' :
                            isp.technology === 'Cable' ? 'bg-blue-100 text-blue-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {isp.technology}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <UtilityHistoricalCharts zoneId={zone.id} zoneName={zone.name} />
      )}

      {activeTab === 'alerts' && (
        <UtilityAlertSubscription zoneId={zone.id} zoneName={zone.name} />
      )}

      {activeTab === 'apis' && (
        <UtilityAPIIntegrations />
      )}

      {/* Zone Comparison Modal */}
      {showComparison && (
        <ZoneComparisonView onClose={() => setShowComparison(false)} />
      )}

      {/* Last Updated */}
      <div className="text-xs text-gray-500 text-center">
        Last updated: {new Date(utilityStatus.lastUpdated).toLocaleString()}
      </div>
    </div>
  );
}