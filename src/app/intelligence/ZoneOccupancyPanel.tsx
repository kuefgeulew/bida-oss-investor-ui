/**
 * 🏭 ZONE OCCUPANCY PANEL
 * Shows real-time occupancy rates for BEPZA, BEZA, Hi-Tech Parks, and Private EPZs
 * Demonstrates ecosystem momentum
 */

import { motion } from 'motion/react';
import { Factory, TrendingUp, Building2 } from 'lucide-react';
import { ZONE_OCCUPANCY } from '@/app/data/bangladeshEconomicMock';

export function ZoneOccupancyPanel() {
  const formatCurrency = (value: number) => {
    return `$${value}M`;
  };
  
  const getOccupancyColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (rate >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (rate >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-orange-600 bg-orange-50 border-orange-200';
  };
  
  const getProgressColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-500';
    if (rate >= 60) return 'bg-blue-500';
    if (rate >= 40) return 'bg-yellow-500';
    return 'bg-orange-500';
  };
  
  const totalOccupancy = ZONE_OCCUPANCY.reduce((sum, z) => 
    sum + (z.occupiedPlots / z.totalPlots) * 100, 0
  ) / ZONE_OCCUPANCY.length;
  
  const totalFDI = ZONE_OCCUPANCY.reduce((sum, z) => sum + z.fdiAmount, 0);
  const totalCompanies = ZONE_OCCUPANCY.reduce((sum, z) => sum + z.companies, 0);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Factory className="w-5 h-5 text-blue-600" />
            Economic Zone Occupancy
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Real-time capacity utilization across investment zones
          </p>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <p className="text-sm font-semibold text-gray-700">Avg Occupancy</p>
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {totalOccupancy.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Across {ZONE_OCCUPANCY.length} zone types
          </p>
        </div>
        
        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-green-600" />
            <p className="text-sm font-semibold text-gray-700">Total FDI</p>
          </div>
          <p className="text-3xl font-bold text-green-600">
            {formatCurrency(totalFDI)}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            In economic zones
          </p>
        </div>
        
        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Factory className="w-5 h-5 text-purple-600" />
            <p className="text-sm font-semibold text-gray-700">Companies</p>
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {totalCompanies.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Operating in zones
          </p>
        </div>
      </div>
      
      {/* Zone Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ZONE_OCCUPANCY.map((zone, index) => (
          <motion.div
            key={zone.zoneType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                  {zone.zoneType}
                </h4>
                <p className="text-sm text-gray-600">
                  {zone.totalZones} zones • {zone.totalPlots.toLocaleString()} total plots
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full border text-xs font-bold ${getOccupancyColor(zone.occupancyRate)}`}
              >
                {zone.occupancyRate}%
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Occupied</span>
                <span className="font-semibold text-gray-900">
                  {zone.occupiedPlots.toLocaleString()} / {zone.totalPlots.toLocaleString()}
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${zone.occupancyRate}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full ${getProgressColor(zone.occupancyRate)} rounded-full`}
                ></motion.div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">FDI Amount</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(zone.fdiAmount)}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Companies</p>
                <p className="text-lg font-bold text-gray-900">
                  {zone.companies}
                </p>
              </div>
            </div>
            
            {/* Availability Indicator */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Available Plots
                </p>
                <p className="text-sm font-bold text-blue-600">
                  {(zone.totalPlots - zone.occupiedPlots).toLocaleString()} plots
                </p>
              </div>
              {zone.occupancyRate < 70 && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Good availability for new investors
                </p>
              )}
              {zone.occupancyRate >= 70 && zone.occupancyRate < 85 && (
                <p className="text-xs text-yellow-600 mt-1">
                  ⚠ Limited availability - book soon
                </p>
              )}
              {zone.occupancyRate >= 85 && (
                <p className="text-xs text-red-600 mt-1">
                  🔥 High demand - waitlist possible
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Momentum Indicator */}
      <div className="p-6 bg-gradient-to-r from-blue-50/40 to-indigo-50/40 rounded-xl border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold mb-2 text-gray-900">Ecosystem Momentum</h4>
            <p className="text-gray-600 text-sm">
              {totalOccupancy >= 70 
                ? '🔥 High investor demand - zones filling rapidly'
                : '✓ Good availability across all zone types'
              }
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-gray-900">
              {totalOccupancy.toFixed(0)}%
            </p>
            <p className="text-gray-600 text-sm">Overall occupancy</p>
          </div>
        </div>
      </div>
    </div>
  );
}