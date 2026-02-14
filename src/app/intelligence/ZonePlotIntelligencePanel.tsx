/**
 * 🏗️ ZONE PLOT INTELLIGENCE PANEL — World-class GIS integration
 * 
 * Mounted in: EnhancedZoneExplorer (after infrastructure grid)
 * Powered by: zonePlotEngine + utilityUptimeEngine
 */

import { motion } from 'motion/react';
import { 
  MapPin, 
  Layers, 
  Zap, 
  Droplet, 
  Factory as FactoryIcon,
  TrendingUp,
  CheckCircle,
  DollarSign
} from 'lucide-react';
import { getPlotsForZone, calculatePlotInfrastructureScore, type PlotData } from '@/app/engines/zonePlotEngine';
import { getUtilityMetrics, getUptimeBadgeColor } from '@/app/engines/utilityUptimeEngine';

interface ZonePlotIntelligencePanelProps {
  zoneId: string;
  onPlotSelect?: (plot: PlotData) => void;
}

export function ZonePlotIntelligencePanel({ zoneId, onPlotSelect }: ZonePlotIntelligencePanelProps) {
  // Get plots from engine
  const plots = getPlotsForZone(zoneId);
  const availablePlots = plots.filter(p => p.status === 'available');
  
  // Get utility metrics from engine
  const utilityMetrics = getUtilityMetrics(zoneId);
  
  if (plots.length === 0 || !utilityMetrics) {
    return (
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <p className="text-sm text-gray-600">No plot data available for this zone</p>
      </div>
    );
  }
  
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };
  
  return (
    <div className="space-y-6">
      {/* Live Utility Uptime — TRUST SIGNAL */}
      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              Live Utility Reliability — {utilityMetrics.zoneName}
            </h4>
            <p className="text-xs text-gray-600 mt-1">Real-time uptime monitoring for transparency</p>
          </div>
          <div className="px-3 py-1 bg-white rounded-lg shadow-sm">
            <p className="text-xs text-gray-600">Overall Score</p>
            <p className="text-2xl font-bold text-green-600">{utilityMetrics.overallReliabilityScore.toFixed(1)}/100</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Power */}
          <div className="p-4 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-600" />
              <p className="text-xs font-semibold text-gray-900">Power</p>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-bold mb-2 ${getUptimeBadgeColor(utilityMetrics.power.uptimePercent).bg} ${getUptimeBadgeColor(utilityMetrics.power.uptimePercent).text} border ${getUptimeBadgeColor(utilityMetrics.power.uptimePercent).border}`}>
              {utilityMetrics.power.uptimePercent.toFixed(1)}% uptime
            </div>
            <p className="text-xs text-gray-600">Outages: {utilityMetrics.power.outageCount} this month</p>
          </div>
          
          {/* Water */}
          <div className="p-4 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Droplet className="w-4 h-4 text-blue-600" />
              <p className="text-xs font-semibold text-gray-900">Water</p>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-bold mb-2 ${getUptimeBadgeColor(utilityMetrics.water.uptimePercent).bg} ${getUptimeBadgeColor(utilityMetrics.water.uptimePercent).text} border ${getUptimeBadgeColor(utilityMetrics.water.uptimePercent).border}`}>
              {utilityMetrics.water.uptimePercent.toFixed(1)}% uptime
            </div>
            <p className="text-xs text-gray-600">Quality: {utilityMetrics.water.qualityScore}/100</p>
          </div>
          
          {/* Gas */}
          <div className="p-4 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FactoryIcon className="w-4 h-4 text-orange-600" />
              <p className="text-xs font-semibold text-gray-900">Gas</p>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-bold mb-2 ${getUptimeBadgeColor(utilityMetrics.gas.uptimePercent).bg} ${getUptimeBadgeColor(utilityMetrics.gas.uptimePercent).text} border ${getUptimeBadgeColor(utilityMetrics.gas.uptimePercent).border}`}>
              {utilityMetrics.gas.uptimePercent.toFixed(1)}% uptime
            </div>
            <p className="text-xs text-gray-600">
              {utilityMetrics.gas.pressureConsistent ? '✓ Consistent pressure' : '⚠ Variable pressure'}
            </p>
          </div>
          
          {/* Internet */}
          <div className="p-4 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <p className="text-xs font-semibold text-gray-900">Internet</p>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-bold mb-2 ${getUptimeBadgeColor(utilityMetrics.internet.uptimePercent).bg} ${getUptimeBadgeColor(utilityMetrics.internet.uptimePercent).text} border ${getUptimeBadgeColor(utilityMetrics.internet.uptimePercent).border}`}>
              {utilityMetrics.internet.uptimePercent.toFixed(1)}% uptime
            </div>
            <p className="text-xs text-gray-600">Speed: {utilityMetrics.internet.avgSpeedMbps} Mbps</p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white/60 rounded-lg">
          <p className="text-xs text-gray-700">
            <span className="font-semibold">Last updated:</span> {utilityMetrics.lastUpdated.toLocaleString('en-BD', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
      
      {/* Plot-Level Intelligence */}
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              Available Industrial Plots ({availablePlots.length})
            </h4>
            <p className="text-xs text-gray-600 mt-1">Click plot to view details and simulate factory placement</p>
          </div>
        </div>
        
        {availablePlots.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No available plots in this zone</p>
            <p className="text-xs mt-2">Check back for new releases</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availablePlots.map((plot) => {
              const infraScore = calculatePlotInfrastructureScore(plot);
              
              return (
                <motion.div
                  key={plot.plotId}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onPlotSelect?.(plot)}
                  className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 cursor-pointer hover:shadow-lg transition-all"
                >
                  {/* Plot Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900">{plot.plotId}</p>
                      <p className="text-xs text-gray-600">{plot.sizeAcres.toFixed(1)} acres • {plot.soilType} soil</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Infra Score</p>
                      <p className="text-lg font-bold text-blue-600">{infraScore}/100</p>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-3 p-2 bg-white rounded">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600">Price per acre</p>
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(plot.pricePerAcre)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-600">Total cost</p>
                      <p className="text-sm font-bold text-green-600">
                        {formatCurrency(plot.pricePerAcre * plot.sizeAcres)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Infrastructure Proximity */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">⚡ Power line</span>
                      <span className="font-semibold text-gray-900">
                        {plot.infrastructure.powerLineDistanceM === 0 ? 'Connected' : `${plot.infrastructure.powerLineDistanceM}m`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">🔥 Gas line</span>
                      <span className="font-semibold text-gray-900">
                        {plot.infrastructure.gasLineDistanceM === 0 ? 'Connected' : `${plot.infrastructure.gasLineDistanceM}m`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">💧 Water supply</span>
                      <span className="font-semibold text-gray-900">
                        {plot.infrastructure.waterSupplyDistanceM === 0 ? 'Connected' : `${plot.infrastructure.waterSupplyDistanceM}m`}
                      </span>
                    </div>
                  </div>
                  
                  {/* Suitable For */}
                  <div className="mb-2">
                    <p className="text-xs text-gray-600 mb-1">Suitable for:</p>
                    <div className="flex flex-wrap gap-1">
                      {plot.suitableFor.slice(0, 3).map((sector) => (
                        <span
                          key={sector}
                          className="px-2 py-0.5 bg-white text-xs font-medium text-gray-700 rounded"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="flex items-center gap-3 text-xs">
                    {plot.infrastructure.sewerageAvailable && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-3 h-3" />
                        <span>Sewerage</span>
                      </div>
                    )}
                    {plot.infrastructure.fiberOpticAvailable && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <CheckCircle className="w-3 h-3" />
                        <span>Fiber</span>
                      </div>
                    )}
                    {plot.infrastructure.roadAccessType === 'paved' && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <CheckCircle className="w-3 h-3" />
                        <span>Paved road</span>
                      </div>
                    )}
                  </div>
                  
                  {/* CTA */}
                  <button className="w-full mt-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors">
                    Simulate Factory Here →
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
