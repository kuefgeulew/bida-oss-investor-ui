// Advanced Metrics Panels - Hourly Wages, Utilities, 5-Year NPV
// Component that displays the 3 missing panels for 100% spec completion

import React from 'react';
import { Users, Zap, Calculator, TrendingDown } from 'lucide-react';
import { getCountryBenchmark, type CostComparison } from './countryBenchmarkEngine';

interface AdvancedMetricsPanelsProps {
  selectedCountries: string[];
  costComparisons: CostComparison[];
  entryLevelPercent: number;
  skilledPercent: number;
  managerialPercent: number;
  productionCapacity: number;
  productionUnit: string;
  employeeCount: number;
  formatCurrency: (amount: number, decimals?: number) => string;
  bangladeshIndex: number;
}

export function AdvancedMetricsPanels({
  selectedCountries,
  costComparisons,
  entryLevelPercent,
  skilledPercent,
  managerialPercent,
  productionCapacity,
  productionUnit,
  employeeCount,
  formatCurrency,
  bangladeshIndex
}: AdvancedMetricsPanelsProps) {
  // 🛡️ SAFETY: Guard against undefined arrays
  if (!selectedCountries || !Array.isArray(selectedCountries) || selectedCountries.length === 0) {
    return null;
  }
  
  if (!costComparisons || !Array.isArray(costComparisons) || costComparisons.length === 0) {
    return null;
  }
  
  return (
    <>
      {/* Hourly Wage Breakdown by Skill Level */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Hourly Wage Breakdown by Skill Level</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedCountries.map((code) => {
            const country = getCountryBenchmark(code);
            // Convert monthly wages to hourly (assuming 160 hours/month)
            const entryLevelHourly = country.labor.minimumWage / 160;
            const skilledHourly = country.labor.skilledWage / 160;
            const managerialHourly = (country.labor.skilledWage * 1.8) / 160; // Estimate managerial at 1.8x skilled
            
            // Calculate weighted average hourly rate based on employee mix
            const weightedHourly = (
              (entryLevelHourly * entryLevelPercent / 100) +
              (skilledHourly * skilledPercent / 100) +
              (managerialHourly * managerialPercent / 100)
            );
            
            return (
              <div key={code} className={`p-6 rounded-lg border-2 ${country.code === 'BGD' ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
                <div className="font-bold text-lg text-gray-900 mb-4">{country.country}</div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Entry-Level ({entryLevelPercent}% of workforce)</div>
                    <div className="text-xl font-bold text-blue-600">{formatCurrency(entryLevelHourly, 2)}/hr</div>
                    <div className="text-xs text-gray-500">{formatCurrency(country.labor.minimumWage)}/month</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Skilled ({skilledPercent}% of workforce)</div>
                    <div className="text-xl font-bold text-green-600">{formatCurrency(skilledHourly, 2)}/hr</div>
                    <div className="text-xs text-gray-500">{formatCurrency(country.labor.skilledWage)}/month</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Managerial ({managerialPercent}% of workforce)</div>
                    <div className="text-xl font-bold text-purple-600">{formatCurrency(managerialHourly, 2)}/hr</div>
                    <div className="text-xs text-gray-500">{formatCurrency(country.labor.skilledWage * 1.8)}/month</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="text-sm text-gray-600 mb-1">Weighted Average Hourly Rate</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(weightedHourly, 2)}/hr
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Annual Labor Cost: {formatCurrency(weightedHourly * 160 * 12 * employeeCount)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Utilities Cost Breakdown */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Utilities Cost Breakdown</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedCountries.map((code) => {
            const country = getCountryBenchmark(code);
            // Estimate annual utility consumption for a factory
            const annualElectricity = country.utilities.electricityCostKWh * 500000; // 500K kWh/year
            const annualWater = country.utilities.waterCostM3 * 10000; // 10K m³/year
            const annualGas = country.utilities.gasCostMMBTU * 1200; // 1200 MMBTU/year
            const annualInternet = country.utilities.internetCostMbps * 100 * 12; // 100 Mbps
            const totalUtilities = annualElectricity + annualWater + annualGas + annualInternet;
            
            return (
              <div key={code} className={`p-6 rounded-lg border-2 ${country.code === 'BGD' ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
                <div className="font-bold text-lg text-gray-900 mb-4">{country.country}</div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Electricity</div>
                    <div className="text-lg font-bold text-blue-600">{formatCurrency(country.utilities.electricityCostKWh, 3)}/kWh</div>
                    <div className="text-xs text-gray-500">Annual: {formatCurrency(annualElectricity)}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Water</div>
                    <div className="text-lg font-bold text-green-600">{formatCurrency(country.utilities.waterCostM3, 2)}/m³</div>
                    <div className="text-xs text-gray-500">Annual: {formatCurrency(annualWater)}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Natural Gas</div>
                    <div className="text-lg font-bold text-orange-600">{formatCurrency(country.utilities.gasCostMMBTU, 2)}/MMBTU</div>
                    <div className="text-xs text-gray-500">Annual: {formatCurrency(annualGas)}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Internet</div>
                    <div className="text-lg font-bold text-purple-600">{formatCurrency(country.utilities.internetCostMbps, 2)}/Mbps/mo</div>
                    <div className="text-xs text-gray-500">Annual (100Mbps): {formatCurrency(annualInternet)}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Reliability Score</div>
                    <div className={`text-sm font-bold ${country.utilities.reliabilityScore >= 80 ? 'text-green-600' : country.utilities.reliabilityScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {country.utilities.reliabilityScore}/100
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="text-sm text-gray-600 mb-1">Total Annual Utilities</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalUtilities)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Per unit produced: {formatCurrency(totalUtilities / productionCapacity, 4)}/{productionUnit}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* 5-Year Operational Cost Projection with NPV */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">5-Year Operational Cost Projection & NPV Analysis</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">Country</th>
                <th className="border border-gray-300 px-4 py-2 text-right font-semibold text-gray-900">Year 1</th>
                <th className="border border-gray-300 px-4 py-2 text-right font-semibold text-gray-900">Year 2</th>
                <th className="border border-gray-300 px-4 py-2 text-right font-semibold text-gray-900">Year 3</th>
                <th className="border border-gray-300 px-4 py-2 text-right font-semibold text-gray-900">Year 4</th>
                <th className="border border-gray-300 px-4 py-2 text-right font-semibold text-gray-900">Year 5</th>
                <th className="border border-gray-300 px-4 py-2 text-right font-semibold text-blue-600">NPV</th>
                <th className="border border-gray-300 px-4 py-2 text-right font-semibold text-green-600">Cost/Unit</th>
              </tr>
            </thead>
            <tbody>
              {selectedCountries.map((code, idx) => {
                const country = getCountryBenchmark(code);
                const comparison = costComparisons.find(c => c.country === country.country);
                if (!comparison) return null;
                
                // Calculate yearly costs with 2% inflation
                const baseCost = comparison.yearlyOperating.totalCost;
                const year1 = baseCost;
                const year2 = baseCost * 1.02;
                const year3 = baseCost * 1.02 * 1.02;
                const year4 = baseCost * 1.02 * 1.02 * 1.02;
                const year5 = baseCost * 1.02 * 1.02 * 1.02 * 1.02;
                
                // Calculate NPV (Net Present Value) with 8% discount rate
                const discountRate = 0.08;
                const npv = 
                  (year1 / Math.pow(1 + discountRate, 1)) +
                  (year2 / Math.pow(1 + discountRate, 2)) +
                  (year3 / Math.pow(1 + discountRate, 3)) +
                  (year4 / Math.pow(1 + discountRate, 4)) +
                  (year5 / Math.pow(1 + discountRate, 5));
                
                // Cost per unit production
                const costPerUnit = baseCost / productionCapacity;
                
                return (
                  <tr key={code} className={country.code === 'BGD' ? 'bg-green-50' : idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">{country.country}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">${(year1 / 1000).toFixed(0)}K</td>
                    <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">${(year2 / 1000).toFixed(0)}K</td>
                    <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">${(year3 / 1000).toFixed(0)}K</td>
                    <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">${(year4 / 1000).toFixed(0)}K</td>
                    <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">${(year5 / 1000).toFixed(0)}K</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-bold text-blue-600">${(npv / 1000).toFixed(0)}K</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-bold text-green-600">${costPerUnit.toFixed(2)}/{productionUnit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-700 mb-2">📊 NPV Explanation</div>
            <p className="text-xs text-gray-600">
              Net Present Value (NPV) shows the present value of all 5 years of operational costs discounted at 8% annually. Lower NPV means better long-term cost efficiency.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-700 mb-2">💰 Cost Per Unit</div>
            <p className="text-xs text-gray-600">
              Total annual operating cost divided by production capacity ({productionCapacity.toLocaleString()} {productionUnit}/year). This metric shows your per-unit cost competitiveness.
            </p>
          </div>
        </div>
        
        {bangladeshIndex >= 0 && (
          <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-green-600" />
              <div className="text-sm font-bold text-gray-900">Bangladesh NPV Advantage</div>
            </div>
            <p className="text-sm text-gray-700">
              Over 5 years, Bangladesh's NPV is <span className="font-bold text-green-600">lower</span> than competitors, meaning you'll spend less in present-value terms. This translates to <span className="font-bold">higher cash flow</span> available for reinvestment or profit distribution.
            </p>
          </div>
        )}
      </div>
    </>
  );
}