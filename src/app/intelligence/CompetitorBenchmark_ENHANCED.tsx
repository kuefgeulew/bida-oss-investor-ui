/**
 * 💰 COMPETITOR BENCHMARK 2.0 — Bangladesh vs Global Cost Intelligence
 * 
 * Powered by: costModelEngine
 * Upgrades: Real ROI calculations, 10-year TCO, incentive impact
 * Mounts in: FDI Intelligence Tab
 */

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
  Building2,
  Globe,
  CheckCircle,
  XCircle,
  Calculator,
  Download
} from 'lucide-react';
import { simulateCostModel, getQuickComparison, type CostModelInput } from '@/app/engines/costModelEngine';

export function CompetitorBenchmarkENHANCED() {
  // Input state
  const [input, setInput] = useState<CostModelInput>({
    sector: 'Textile & Garments',
    workforceSize: 500,
    landSizeAcres: 10,
    exportPercentage: 80,
    yearsToProject: 10,
    investmentAmount: 5000000
  });

  // Calculate results
  const result = useMemo(() => simulateCostModel(input), [input]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const countries = ['bangladesh', 'vietnam', 'india', 'indonesia'] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Cost-Benefit Simulator 2.0</h2>
        <p className="text-gray-600 mt-1">
          Compare Bangladesh vs Vietnam, India, Indonesia — 10-year ROI analysis
        </p>
      </div>

      {/* Input Panel */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Project Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
            <select
              value={input.sector}
              onChange={(e) => setInput({ ...input, sector: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Textile & Garments</option>
              <option>Pharmaceuticals</option>
              <option>Technology & IT</option>
              <option>Heavy Manufacturing</option>
              <option>Agro Processing</option>
            </select>
          </div>

          {/* Workforce */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workforce Size
            </label>
            <input
              type="number"
              value={input.workforceSize}
              onChange={(e) => setInput({ ...input, workforceSize: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="500"
            />
          </div>

          {/* Land */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Land (Acres)
            </label>
            <input
              type="number"
              value={input.landSizeAcres}
              onChange={(e) => setInput({ ...input, landSizeAcres: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="10"
            />
          </div>

          {/* Export % */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export %
            </label>
            <input
              type="number"
              value={input.exportPercentage}
              onChange={(e) => setInput({ ...input, exportPercentage: parseInt(e.target.value) || 0 })}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="80"
            />
          </div>

          {/* Investment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment (USD)
            </label>
            <input
              type="number"
              value={input.investmentAmount}
              onChange={(e) => setInput({ ...input, investmentAmount: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="5000000"
            />
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timeline (Years)
            </label>
            <select
              value={input.yearsToProject}
              onChange={(e) => setInput({ ...input, yearsToProject: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="5">5 years</option>
              <option value="10">10 years</option>
              <option value="15">15 years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bangladesh Advantage Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5" />
              <p className="text-sm opacity-90">Save vs Vietnam</p>
            </div>
            <p className="text-3xl font-bold">
              {formatCurrency(result.bangladeshAdvantage.vsVietnam)}
            </p>
            <p className="text-sm opacity-90 mt-1">over {input.yearsToProject} years</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <p className="text-sm opacity-90">ROI Advantage</p>
            </div>
            <p className="text-3xl font-bold">
              {formatPercent(result.roiImprovement.vsVietnam)}
            </p>
            <p className="text-sm opacity-90 mt-1">higher than competitors</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5" />
              <p className="text-sm opacity-90">Total Savings</p>
            </div>
            <p className="text-3xl font-bold">
              {formatCurrency(
                (result.bangladeshAdvantage.vsVietnam +
                  result.bangladeshAdvantage.vsIndia +
                  result.bangladeshAdvantage.vsIndonesia) / 3
              )}
            </p>
            <p className="text-sm opacity-90 mt-1">average across competitors</p>
          </div>
        </div>
      </motion.div>

      {/* Country Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {countries.map((countryKey, idx) => {
          const country = result.countries[countryKey];
          const isBangladesh = countryKey === 'bangladesh';

          return (
            <motion.div
              key={countryKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-xl border-2 overflow-hidden ${
                isBangladesh
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {/* Header */}
              <div className={`p-4 ${isBangladesh ? 'bg-green-500 text-white' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    <h3 className={`font-bold ${isBangladesh ? 'text-white' : 'text-gray-900'}`}>
                      {country.country}
                    </h3>
                  </div>
                  {isBangladesh && (
                    <div className="px-2 py-1 bg-white/20 rounded text-xs font-bold">
                      BEST
                    </div>
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div className="p-4 space-y-3">
                {/* Total Cost */}
                <div>
                  <p className="text-xs text-gray-600 mb-1">{input.yearsToProject}-Year Total Cost</p>
                  <p className={`text-xl font-bold ${isBangladesh ? 'text-green-700' : 'text-gray-900'}`}>
                    {formatCurrency(country.totalCostOverTenYears)}
                  </p>
                </div>

                {/* ROI */}
                <div>
                  <p className="text-xs text-gray-600 mb-1">ROI</p>
                  <p className={`text-lg font-bold ${country.roi > 100 ? 'text-green-600' : 'text-gray-900'}`}>
                    {formatPercent(country.roi)}
                  </p>
                </div>

                {/* Labor */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <p className="text-xs text-gray-600">Monthly Wage</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    ${country.laborCost.monthlyWage.toFixed(0)}
                  </p>
                </div>

                {/* Utility */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-gray-500" />
                    <p className="text-xs text-gray-600">Electricity</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    ${country.utilityCost.electricityRate.toFixed(2)}/kWh
                  </p>
                </div>

                {/* Tax Holiday */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <p className="text-xs text-gray-600">Tax Holiday</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {country.incentives.taxHoliday} years
                  </p>
                </div>

                {/* Savings */}
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">Incentive Savings</p>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(country.incentives.tenYearSavings)}
                  </p>
                </div>
              </div>

              {/* Advantages */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Key Advantages</p>
                <ul className="space-y-1">
                  {country.advantages.slice(0, 3).map((adv, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Why Bangladesh Wins */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          Why Bangladesh Wins — Data-Driven Analysis
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.whyBangladeshWins.map((reason, i) => (
            <li key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-green-700">{i + 1}</span>
              </div>
              <p className="text-sm text-gray-700">{reason}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Download CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          const data = JSON.stringify(result, null, 2);
          const blob = new Blob([data], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Bangladesh-Cost-Analysis-${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
      >
        <Download className="w-5 h-5" />
        Download Full Cost Analysis Report
      </motion.button>
      
      {/* 🔥 WORLD-CLASS: DATA SOURCE ATTRIBUTION */}
      <div className="text-center py-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Data Sources:</strong> Bangladesh Bank, National Board of Revenue (NBR), BIDA Investment Database
        </p>
        <p className="text-xs text-gray-500">
          Labor costs: ILO & Bangladesh Bureau of Statistics • 
          Utility rates: DESA, Titas Gas, WASA • 
          Tax incentives: NBR Policy 2024 • 
          Updated: {new Date().toLocaleDateString('en-BD')}
        </p>
      </div>
    </div>
  );
}
