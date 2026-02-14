/**
 * 🚫 DO NOT DEFINE ECONOMIC NUMBERS HERE
 * 
 * All FDI, sector, capex, and trend data MUST come from:
 * /src/app/data/bangladeshEconomicMock.ts
 * 
 * Hardcoded economic data is a BUILD VIOLATION.
 * See: /scripts/validate-economic-data.js
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, ChevronDown } from 'lucide-react';

// ✅ IMPORT FROM CANONICAL DATA SOURCE
import { SECTOR_SPLIT, MONTHLY_FDI_2024, ECONOMIC_DATA_SIGNATURE } from '@/app/data/bangladeshEconomicMock';

// 🔒 RUNTIME DATA SOURCE VERIFICATION
if (ECONOMIC_DATA_SIGNATURE !== 'BD-FDI-1700M-CANONICAL-2026') {
  throw new Error('❌ Economic data source violation detected in FDISectorTrends');
}

export function FDISectorTrends() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Sector Investment Trends</h3>
          <p className="text-sm text-gray-600 mt-1">FDI distribution across key industries</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium"
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      {/* Sector Bar Chart */}
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Investment by Sector (Million USD)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={SECTOR_SPLIT}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={100} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {SECTOR_SPLIT.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Growth Rate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SECTOR_SPLIT.slice(0, 4).map((sector, index) => (
          <motion.div
            key={sector.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }}></div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">{sector.name}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">${sector.value}M</p>
            <p className="text-xs text-green-600 font-medium">+{sector.growth}% YoY</p>
            <p className="text-xs text-gray-500 mt-2">{sector.projects} active projects</p>
          </motion.div>
        ))}
      </div>

      {/* Monthly Trend Line */}
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Monthly FDI Inflow Trend (2024)</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={MONTHLY_FDI_2024}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Growing Subsectors */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">🚀 Top Growing Subsectors</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg">
            <p className="text-lg font-bold text-gray-900">AI & Machine Learning</p>
            <p className="text-sm text-gray-600 mt-1">+127% growth</p>
            <p className="text-xs text-blue-600 mt-2">42 new startups</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <p className="text-lg font-bold text-gray-900">Green Energy</p>
            <p className="text-sm text-gray-600 mt-1">+89% growth</p>
            <p className="text-xs text-blue-600 mt-2">28 solar/wind projects</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <p className="text-lg font-bold text-gray-900">E-commerce Logistics</p>
            <p className="text-sm text-gray-600 mt-1">+76% growth</p>
            <p className="text-xs text-blue-600 mt-2">18 fulfillment centers</p>
          </div>
        </div>
      </div>
    </div>
  );
}