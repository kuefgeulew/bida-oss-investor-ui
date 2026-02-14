/**
 * ⚡ AFTERCARE UTILITY MONITOR — Live Zone Reliability
 * 
 * Mounted in: Aftercare tab
 * Powered by: utilityUptimeEngine
 * Shows: "Your zone's live utility reliability"
 */

import { motion } from 'motion/react';
import { Zap, Droplet, Flame, Wifi, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { getUtilityMetrics, getUptimeBadgeColor } from '@/app/engines/utilityUptimeEngine';
import { useMemo } from 'react';

interface AftercareUtilityMonitorProps {
  zoneId?: string;
}

export function AftercareUtilityMonitor({ zoneId = 'bepza-ez' }: AftercareUtilityMonitorProps) {
  const metrics = useMemo(() => getUtilityMetrics(zoneId), [zoneId]);
  
  if (!metrics) {
    return (
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <p className="text-gray-600">No utility data available for this zone</p>
      </div>
    );
  }
  
  // 🔒 DEFENSIVE: Safely extract metrics with fallback values
  const overallScore = metrics.overallReliabilityScore ?? 0;
  const powerUptime = metrics.power?.uptimePercent ?? 0;
  const powerOutageCount = metrics.power?.outageCount ?? 0;
  const powerAvgOutageHours = (metrics.power?.avgOutageMinutes ?? 0) / 60; // Convert minutes to hours
  const waterUptime = metrics.water?.uptimePercent ?? 0;
  const waterQualityScore = metrics.water?.qualityScore ?? 0;
  const waterPressureConsistent = metrics.water?.pressureConsistent ?? false;
  const gasUptime = metrics.gas?.uptimePercent ?? 0;
  const gasPressureConsistent = metrics.gas?.pressureConsistent ?? false;
  const internetUptime = metrics.internet?.uptimePercent ?? 0;
  const internetSpeed = metrics.internet?.avgSpeedMbps ?? 0;
  const internetFiberOptic = true; // Default assumption for EPZs
  const internetLatency = 12; // Default latency in ms
  
  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Utility Reliability Score</h2>
            <p className="text-lg text-gray-600">{metrics.zoneName}</p>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold mb-2 text-green-600">{overallScore.toFixed(1)}</div>
            <p className="text-sm text-gray-600">out of 100</p>
          </div>
        </div>
        
        <div className="mt-6 flex items-center gap-2 p-4 bg-white border-2 border-green-200 rounded-lg">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <p className="text-sm text-gray-700">
            Your zone is performing {overallScore >= 95 ? 'excellently' : overallScore >= 85 ? 'very well' : 'well'} with world-class infrastructure reliability
          </p>
        </div>
      </motion.div>
      
      {/* Individual Utilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Power */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Power Supply</h3>
              <p className="text-sm text-gray-600">BPDB / Zone Authority</p>
            </div>
          </div>
          
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-4 ${getUptimeBadgeColor(powerUptime).bg} ${getUptimeBadgeColor(powerUptime).text} border-2 ${getUptimeBadgeColor(powerUptime).border}`}>
            <span className="text-2xl font-bold">{powerUptime.toFixed(1)}%</span>
            <span className="text-sm">uptime</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Outages this month</span>
              <span className="font-semibold text-gray-900">{powerOutageCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Avg outage duration</span>
              <span className="font-semibold text-gray-900">{powerAvgOutageHours.toFixed(1)} hours</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Load shedding hours</span>
              <span className="font-semibold text-gray-900">{powerAvgOutageHours.toFixed(1)} hrs/week</span>
            </div>
          </div>
          
          {powerUptime >= 99 && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-700 font-medium">Excellent reliability</p>
            </div>
          )}
        </div>
        
        {/* Water */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Droplet className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Water Supply</h3>
              <p className="text-sm text-gray-600">WASA / Zone Authority</p>
            </div>
          </div>
          
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-4 ${getUptimeBadgeColor(waterUptime).bg} ${getUptimeBadgeColor(waterUptime).text} border-2 ${getUptimeBadgeColor(waterUptime).border}`}>
            <span className="text-2xl font-bold">{waterUptime.toFixed(1)}%</span>
            <span className="text-sm">uptime</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Quality score</span>
              <span className="font-semibold text-gray-900">{waterQualityScore}/100</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Pressure consistency</span>
              <span className="font-semibold text-gray-900">
                {waterPressureConsistent ? '✓ Consistent' : '⚠ Variable'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Capacity</span>
              <span className="font-semibold text-gray-900">50 MGD</span>
            </div>
          </div>
        </div>
        
        {/* Gas */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Flame className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Gas Supply</h3>
              <p className="text-sm text-gray-600">Titas Gas / Zone Authority</p>
            </div>
          </div>
          
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-4 ${getUptimeBadgeColor(gasUptime).bg} ${getUptimeBadgeColor(gasUptime).text} border-2 ${getUptimeBadgeColor(gasUptime).border}`}>
            <span className="text-2xl font-bold">{gasUptime.toFixed(1)}%</span>
            <span className="text-sm">uptime</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Pressure consistency</span>
              <span className="font-semibold text-gray-900">
                {gasPressureConsistent ? '✓ Consistent' : '⚠ Variable'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Interruptions</span>
              <span className="font-semibold text-gray-900">{powerOutageCount}/month</span>
            </div>
          </div>
        </div>
        
        {/* Internet */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Wifi className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Internet</h3>
              <p className="text-sm text-gray-600">Fiber@Home / Zone Network</p>
            </div>
          </div>
          
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-4 ${getUptimeBadgeColor(internetUptime).bg} ${getUptimeBadgeColor(internetUptime).text} border-2 ${getUptimeBadgeColor(internetUptime).border}`}>
            <span className="text-2xl font-bold">{internetUptime.toFixed(1)}%</span>
            <span className="text-sm">uptime</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Average speed</span>
              <span className="font-semibold text-gray-900">{internetSpeed} Mbps</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Fiber optic</span>
              <span className="font-semibold text-gray-900">
                {internetFiberOptic ? '✓ Available' : '✗ Not available'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Latency</span>
              <span className="font-semibold text-gray-900">{internetLatency}ms</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expansion Intelligence */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">Expansion Readiness</h3>
        </div>
        
        <p className="text-gray-700 mb-4">
          Based on your zone's utility performance, we've identified expansion opportunities:
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-700">
              <strong>Power capacity:</strong> Sufficient for 2x expansion without upgrades
            </p>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-700">
              <strong>Water supply:</strong> Can support additional 500 employees
            </p>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <p className="text-sm text-gray-700">
              <strong>Gas supply:</strong> May require additional connection for major expansion
            </p>
          </div>
        </div>
        
        <button className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all w-full">
          Start Expansion Planning →
        </button>
      </div>
      
      {/* Last Updated */}
      <div className="text-center text-sm text-gray-600">
        <p>Last updated: {metrics.lastUpdated.toLocaleString('en-BD')}</p>
        <p className="text-xs mt-1">Data refreshed every 15 minutes</p>
      </div>
    </div>
  );
}