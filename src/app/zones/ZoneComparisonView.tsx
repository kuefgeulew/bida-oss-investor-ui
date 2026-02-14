// 🆕 ZONE COMPARISON VIEW - Side-by-side utility comparison
// World-first feature: Compare infrastructure reliability across zones
// Mounts: Standalone modal/page accessible from zone map

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, TrendingUp, TrendingDown, Minus, Award } from 'lucide-react';
import { getAllUtilityMetrics } from '../engines/utilityUptimeEngine';

interface ZoneComparisonViewProps {
  onClose: () => void;
}

export function ZoneComparisonView({ onClose }: ZoneComparisonViewProps) {
  const allZones = getAllUtilityMetrics();
  const [selectedZones, setSelectedZones] = useState<string[]>([
    'dhaka-epz',
    'chittagong-epz',
    'mongla-epz'
  ]);

  const toggleZone = (zoneId: string) => {
    if (selectedZones.includes(zoneId)) {
      if (selectedZones.length > 1) {
        setSelectedZones(selectedZones.filter(id => id !== zoneId));
      }
    } else {
      if (selectedZones.length < 5) {
        setSelectedZones([...selectedZones, zoneId]);
      }
    }
  };

  const comparisonData = allZones.filter(z => selectedZones.includes(z.zoneId));
  
  // Find best performer for highlighting
  const bestOverall = comparisonData.reduce((best, zone) => 
    zone.overallReliabilityScore > (best?.overallReliabilityScore || 0) ? zone : best
  , comparisonData[0]);

  const getComparisonIcon = (value: number, avg: number) => {
    const diff = value - avg;
    if (Math.abs(diff) < 0.5) return <Minus className="w-4 h-4 text-gray-400" />;
    return diff > 0 ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const getValueColor = (value: number, avg: number) => {
    const diff = value - avg;
    if (Math.abs(diff) < 0.5) return 'text-gray-900';
    return diff > 0 ? 'text-green-700' : 'text-red-700';
  };

  // Calculate averages
  const avgPower = comparisonData.reduce((sum, z) => sum + z.power.uptimePercent, 0) / comparisonData.length;
  const avgWater = comparisonData.reduce((sum, z) => sum + z.water.uptimePercent, 0) / comparisonData.length;
  const avgGas = comparisonData.reduce((sum, z) => sum + z.gas.uptimePercent, 0) / comparisonData.length;
  const avgInternet = comparisonData.reduce((sum, z) => sum + z.internet.uptimePercent, 0) / comparisonData.length;
  const avgOverall = comparisonData.reduce((sum, z) => sum + z.overallReliabilityScore, 0) / comparisonData.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-6 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Zone Utility Comparison</h2>
              <p className="text-gray-600 text-sm">Compare infrastructure reliability across investment zones</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/60 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Zone Selector */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">Select zones to compare (1-5):</p>
            <div className="flex flex-wrap gap-2">
              {allZones.map(zone => (
                <button
                  key={zone.zoneId}
                  onClick={() => toggleZone(zone.zoneId)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedZones.includes(zone.zoneId)
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                      : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
                  }`}
                >
                  {zone.zoneName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-280px)]">
          <div className="grid gap-6">
            {/* Overall Score */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                Overall Reliability Score
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {comparisonData.map(zone => (
                  <div
                    key={zone.zoneId}
                    className={`text-center p-4 rounded-lg ${
                      zone.zoneId === bestOverall.zoneId
                        ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 shadow-lg'
                        : 'bg-white border-2 border-amber-200'
                    }`}
                  >
                    {zone.zoneId === bestOverall.zoneId && (
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Award className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-bold text-amber-700">BEST</span>
                      </div>
                    )}
                    <div className="text-xs font-semibold mb-2 line-clamp-2 text-gray-700">{zone.zoneName}</div>
                    <div className="text-3xl font-bold text-amber-600">
                      {zone.overallReliabilityScore.toFixed(1)}
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {getComparisonIcon(zone.overallReliabilityScore, avgOverall)}
                      <span className={`text-xs font-semibold ${getValueColor(zone.overallReliabilityScore, avgOverall)}`}>
                        {zone.overallReliabilityScore > avgOverall ? '+' : ''}
                        {(zone.overallReliabilityScore - avgOverall).toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Average: <span className="font-bold text-gray-900">{avgOverall.toFixed(1)}</span>
              </div>
            </div>

            {/* Power Uptime */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Power Uptime (Last 30 Days)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Zone</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Uptime %</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Outages</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Avg Duration</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">vs Avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map(zone => (
                      <tr key={zone.zoneId} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-900">{zone.zoneName}</td>
                        <td className="text-center py-3 px-4">
                          <span className={`font-bold ${getValueColor(zone.power.uptimePercent, avgPower)}`}>
                            {zone.power.uptimePercent.toFixed(1)}%
                          </span>
                        </td>
                        <td className="text-center py-3 px-4 text-gray-700">{zone.power.outageCount}</td>
                        <td className="text-center py-3 px-4 text-gray-700">{zone.power.avgOutageMinutes} min</td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            {getComparisonIcon(zone.power.uptimePercent, avgPower)}
                            <span className={`font-semibold ${getValueColor(zone.power.uptimePercent, avgPower)}`}>
                              {zone.power.uptimePercent > avgPower ? '+' : ''}
                              {(zone.power.uptimePercent - avgPower).toFixed(1)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Average: <span className="font-bold text-gray-900">{avgPower.toFixed(1)}%</span>
              </div>
            </div>

            {/* Water Quality */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">💧 Water Supply</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {comparisonData.map(zone => (
                  <div key={zone.zoneId} className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                    <div className="text-xs font-semibold text-gray-700 mb-2 line-clamp-2">{zone.zoneName}</div>
                    <div className={`text-2xl font-bold ${getValueColor(zone.water.uptimePercent, avgWater)}`}>
                      {zone.water.uptimePercent.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Uptime</div>
                    <div className="mt-2">
                      <span className="text-xs font-semibold text-blue-700">Quality: {zone.water.qualityScore}/100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gas Supply */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🔥 Gas Supply</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {comparisonData.map(zone => (
                  <div key={zone.zoneId} className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 text-center">
                    <div className="text-xs font-semibold text-gray-700 mb-2 line-clamp-2">{zone.zoneName}</div>
                    <div className={`text-2xl font-bold ${getValueColor(zone.gas.uptimePercent, avgGas)}`}>
                      {zone.gas.uptimePercent.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Uptime</div>
                    <div className="mt-2">
                      <span className={`text-xs font-semibold ${
                        zone.gas.pressureConsistent ? 'text-green-700' : 'text-orange-700'
                      }`}>
                        {zone.gas.pressureConsistent ? '✓ Stable' : '⚠ Variable'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internet */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📶 Internet Connectivity</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {comparisonData.map(zone => (
                  <div key={zone.zoneId} className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-center">
                    <div className="text-xs font-semibold text-gray-700 mb-2 line-clamp-2">{zone.zoneName}</div>
                    <div className="text-2xl font-bold text-purple-700">
                      {zone.internet.avgSpeedMbps}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Mbps</div>
                    <div className="mt-2">
                      <span className={`text-xs font-semibold ${getValueColor(zone.internet.uptimePercent, avgInternet)}`}>
                        {zone.internet.uptimePercent.toFixed(1)}% uptime
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🎯 Key Insights</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-bold text-green-900">Best Overall Performance</div>
                      <div className="text-sm text-gray-700 mt-1">
                        <span className="font-semibold">{bestOverall.zoneName}</span> leads with {bestOverall.overallReliabilityScore.toFixed(1)} reliability score
                      </div>
                    </div>
                  </div>
                </div>

                {comparisonData.filter(z => z.power.uptimePercent < 96).length > 0 && (
                  <div className="bg-white rounded-lg p-4 border-2 border-yellow-200">
                    <div className="flex items-start gap-3">
                      <TrendingDown className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <div className="font-bold text-yellow-900">Power Reliability Alert</div>
                        <div className="text-sm text-gray-700 mt-1">
                          {comparisonData.filter(z => z.power.uptimePercent < 96).map(z => z.zoneName).join(', ')} may require backup power solutions
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-bold text-blue-900">Selection Recommendation</div>
                      <div className="text-sm text-gray-700 mt-1">
                        For high-power industries, prioritize {comparisonData.sort((a, b) => b.power.uptimePercent - a.power.uptimePercent)[0].zoneName} (99.{comparisonData[0].power.uptimePercent.toFixed(0)}% uptime)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t-2 border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Data updated: February 12, 2026 at 9:30 AM</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
            >
              Close Comparison
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}