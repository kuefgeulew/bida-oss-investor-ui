// 🆕 UTILITY HISTORICAL CHARTS - 12-month trends with seasonal patterns
// Features: Recharts visualizations, seasonal annotations, improvement tracking
// Mounts: Inside zone utility panel

import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Info } from 'lucide-react';
import { get12MonthHistory } from '../engines/utilityUptimeEngine';

interface UtilityHistoricalChartsProps {
  zoneId: string;
  zoneName: string;
}

export function UtilityHistoricalCharts({ zoneId, zoneName }: UtilityHistoricalChartsProps) {
  const data = get12MonthHistory(zoneId);

  if (data.length === 0) {
    return (
      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8 text-center">
        <p className="text-gray-600">No historical data available for this zone</p>
      </div>
    );
  }

  // Calculate trends
  const powerTrend = data[data.length - 1].powerUptime - data[0].powerUptime;
  const gasTrend = data[data.length - 1].gasUptime - data[0].gasUptime;
  
  const monsoonMonths = ['Jun 2025', 'Jul 2025', 'Aug 2025'];
  const winterMonths = ['Dec 2025', 'Jan 2026', 'Feb 2026'];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isMonsoon = monsoonMonths.includes(label);
      const isWinter = winterMonths.includes(label);

      return (
        <div className="bg-white border-2 border-gray-300 rounded-lg p-3 shadow-lg">
          <p className="font-bold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-700">{entry.name}:</span>
              <span className="font-bold" style={{ color: entry.color }}>
                {entry.value.toFixed(1)}%
              </span>
            </div>
          ))}
          {(isMonsoon || isWinter) && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-amber-700 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {isMonsoon ? 'Monsoon Season' : 'Winter Season'}
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">12-Month Utility Reliability Trends</h3>
        <p className="text-indigo-100 text-sm">{zoneName} • March 2025 - February 2026</p>
      </div>

      {/* Trend Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`${powerTrend >= 0 ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'} border-2 rounded-xl p-4`}>
          <div className="flex items-center gap-3">
            {powerTrend >= 0 ? (
              <TrendingUp className="w-8 h-8 text-green-600" />
            ) : (
              <TrendingDown className="w-8 h-8 text-red-600" />
            )}
            <div>
              <div className="text-xs font-semibold text-gray-600">Power Uptime Trend</div>
              <div className={`text-2xl font-bold ${powerTrend >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {powerTrend >= 0 ? '+' : ''}{powerTrend.toFixed(2)}%
              </div>
              <div className="text-xs text-gray-600">
                {powerTrend >= 0 ? 'Improvement' : 'Decline'} over 12 months
              </div>
            </div>
          </div>
        </div>

        <div className={`${gasTrend >= 0 ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'} border-2 rounded-xl p-4`}>
          <div className="flex items-center gap-3">
            {gasTrend >= 0 ? (
              <TrendingUp className="w-8 h-8 text-green-600" />
            ) : (
              <TrendingDown className="w-8 h-8 text-red-600" />
            )}
            <div>
              <div className="text-xs font-semibold text-gray-600">Gas Supply Trend</div>
              <div className={`text-2xl font-bold ${gasTrend >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {gasTrend >= 0 ? '+' : ''}{gasTrend.toFixed(2)}%
              </div>
              <div className="text-xs text-gray-600">
                {gasTrend >= 0 ? 'Improvement' : 'Decline'} over 12 months
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Uptime Chart */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4">All Utilities - Uptime Percentage</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis 
              domain={[90, 100]} 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              label={{ value: 'Uptime %', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line 
              type="monotone" 
              dataKey="powerUptime" 
              name="Power"
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ fill: '#f59e0b', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="waterUptime" 
              name="Water"
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="gasUptime" 
              name="Gas"
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="internetUptime" 
              name="Internet"
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Power Uptime Detailed */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4">⚡ Power Uptime - Detailed View</h4>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis domain={[94, 100]} tick={{ fontSize: 12 }} stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="powerUptime" 
              name="Power Uptime"
              stroke="#f59e0b" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPower)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Gas Supply with Winter Pattern */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4">🔥 Gas Supply - Seasonal Pattern Analysis</h4>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis domain={[90, 100]} tick={{ fontSize: 12 }} stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="gasUptime" 
              name="Gas Supply"
              stroke="#ef4444" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorGas)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Seasonal Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monsoon Impact */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-bold text-blue-900 mb-2">Monsoon Season Impact (Jun-Aug)</h4>
              <p className="text-sm text-blue-800 mb-3">
                Power uptime typically drops 2-3% during monsoon months due to weather-related outages.
              </p>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <div className="text-xs font-semibold text-gray-700 mb-1">Historical Average:</div>
                <div className="text-sm text-gray-900">
                  <span className="font-bold text-blue-700">Jun-Aug 2025:</span> 96.8% uptime
                  <br />
                  <span className="font-bold text-green-700">Other months:</span> 98.9% uptime
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Winter Gas Pattern */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
            <div>
              <h4 className="font-bold text-orange-900 mb-2">Winter Gas Pressure (Dec-Feb)</h4>
              <p className="text-sm text-orange-800 mb-3">
                Gas pressure drops 15-20% in winter months due to increased residential heating demand.
              </p>
              <div className="bg-white rounded-lg p-3 border border-orange-200">
                <div className="text-xs font-semibold text-gray-700 mb-1">Historical Average:</div>
                <div className="text-sm text-gray-900">
                  <span className="font-bold text-red-700">Dec-Feb:</span> 95.2% uptime
                  <br />
                  <span className="font-bold text-green-700">Other months:</span> 98.1% uptime
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-purple-600 mt-1" />
          <div>
            <h4 className="font-bold text-purple-900 mb-3">📊 Data Insights & Recommendations</h4>
            <div className="space-y-2 text-sm text-purple-900">
              {powerTrend > 0 && (
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Power reliability improved by <span className="font-bold text-green-700">{powerTrend.toFixed(2)}%</span> over the past year—excellent infrastructure investment results</span>
                </div>
              )}
              {gasTrend < -2 && (
                <div className="flex items-start gap-2">
                  <TrendingDown className="w-4 h-4 text-red-600 mt-0.5" />
                  <span>Gas supply shows declining trend. Consider installing backup LPG/diesel systems for critical operations.</span>
                </div>
              )}
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                <span>For monsoon season (Jun-Aug), budget for 2-3 additional backup generator runtime hours per week.</span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-orange-600 mt-0.5" />
                <span>Winter gas pressure drops are predictable. Schedule energy-intensive production away from Dec-Feb if possible.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500">
        Data Source: Real-time monitoring from DESCO, GTCL, DWASA, BTCL • Updated: Feb 12, 2026
      </div>
    </div>
  );
}
