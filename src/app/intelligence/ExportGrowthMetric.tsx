/**
 * 📦 EXPORT GROWTH METRIC
 * Tracks export performance from FDI-backed companies
 * Demonstrates FDI → export success story
 */

import { motion } from 'motion/react';
import { TrendingUp, Package, Globe, ArrowUpRight } from 'lucide-react';
import { FDI_EXPORT_METRICS } from '@/app/data/bangladeshEconomicMock';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function ExportGrowthMetric() {
  const formatCurrency = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}B`;
    return `$${value}M`;
  };
  
  const sectorData = FDI_EXPORT_METRICS.topExportSectors.map(s => ({
    name: s.sector.replace(' & ', '\n'),
    exports: s.exports,
    growth: s.growth
  }));
  
  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            FDI Export Contribution
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Export performance from foreign-invested companies
          </p>
        </div>
      </div>
      
      {/* Hero Metric */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 p-6 bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-6 h-6 text-gray-700" />
                <p className="text-sm font-semibold text-gray-700">
                  Total FDI Company Exports (2024)
                </p>
              </div>
              <p className="text-5xl font-bold mb-2 text-gray-900">
                {formatCurrency(FDI_EXPORT_METRICS.totalExports)}
              </p>
              <div className="flex items-center gap-2 text-green-600">
                <ArrowUpRight className="w-5 h-5" />
                <span className="text-lg font-bold">
                  +{FDI_EXPORT_METRICS.yoyGrowth}%
                </span>
                <span className="text-sm">vs 2023</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Previous Year</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(FDI_EXPORT_METRICS.previousYearExports)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">% of Total Exports</p>
              <p className="text-2xl font-bold text-gray-900">
                {FDI_EXPORT_METRICS.percentageOfTotalExports}%
              </p>
            </div>
          </div>
        </div>
        
        {/* Key Insight */}
        <div className="p-6 bg-white rounded-xl border-2 border-green-200 flex flex-col justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-2">Export Growth Rate</p>
            <p className="text-4xl font-bold text-green-600 mb-2">
              +{FDI_EXPORT_METRICS.yoyGrowth}%
            </p>
            <p className="text-xs text-gray-500">
              Fastest growing export segment
            </p>
          </div>
        </div>
      </div>
      
      {/* Top Export Sectors Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h4 className="text-base font-bold text-gray-900 mb-4">
          Top Export Sectors from FDI Companies
        </h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={sectorData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11 }}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: 11 }}
              tickFormatter={(value) => `$${value}M`}
            />
            <Tooltip 
              formatter={(value: number) => [`${formatCurrency(value)}`, 'Exports']}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Bar dataKey="exports" radius={[8, 8, 0, 0]}>
              {sectorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Sector Growth Badges */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-4">
          {FDI_EXPORT_METRICS.topExportSectors.map((sector, index) => (
            <div key={sector.sector} className="p-2 bg-gray-50 rounded-lg text-center">
              <p className="text-xs text-gray-600 truncate">{sector.sector.split(' & ')[0]}</p>
              <p className="text-sm font-bold text-green-600">+{sector.growth}%</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Top Export Destinations */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h4 className="text-base font-bold text-gray-900 mb-4">
          Top Export Destinations
        </h4>
        <div className="space-y-3">
          {FDI_EXPORT_METRICS.topDestinations.map((dest, index) => (
            <motion.div
              key={dest.country}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-gray-900">{dest.country}</p>
                  <p className="text-sm font-bold text-gray-900">
                    {formatCurrency(dest.amount)}
                  </p>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dest.percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  ></motion.div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{dest.percentage}% of total</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Success Story Banner */}
      <div className="p-6 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-blue-50/30 rounded-xl border border-gray-100/50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xl font-bold mb-2 text-gray-900">FDI → Export Success Story</h4>
            <p className="text-gray-600 text-sm max-w-xl">
              Foreign-invested companies contributed <span className="font-bold text-gray-900">{formatCurrency(FDI_EXPORT_METRICS.totalExports)}</span> in exports, 
              representing <span className="font-bold text-gray-900">{FDI_EXPORT_METRICS.percentageOfTotalExports}%</span> of Bangladesh's total export earnings 
              and growing at <span className="font-bold text-green-600">+{FDI_EXPORT_METRICS.yoyGrowth}%</span> annually.
            </p>
          </div>
          <div className="hidden md:block">
            <Package className="w-24 h-24 text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}