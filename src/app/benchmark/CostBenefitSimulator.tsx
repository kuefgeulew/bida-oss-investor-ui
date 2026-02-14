// Cost-Benefit Simulator Panel - Compare Bangladesh against Vietnam, India, China, Thailand
// READ-ONLY panel that reads from countryBenchmarkEngine
// Mounts in: Investor → Intelligence Lab tab

import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { DollarSign, TrendingUp, Clock, Award, Globe, ArrowRight, Download, Save, FolderOpen, Trash2, Ship, Building2, Users, Zap, Calculator, TrendingDown } from 'lucide-react';
import { compareCosts, calculateROI, getCountryBenchmark, type CostComparison } from './countryBenchmarkEngine';
import { AdvancedMetricsPanels } from './AdvancedMetricsPanels';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Currency conversion rates (relative to USD)
const CURRENCY_RATES = {
  USD: 1,
  BDT: 110.25,
  EUR: 0.93,
};

type Currency = 'USD' | 'BDT' | 'EUR';

interface SavedScenario {
  id: string;
  name: string;
  timestamp: number;
  investmentSize: number;
  employeeCount: number;
  annualRevenue: number;
  sector: string;
  selectedCountries: string[];
  exportRatio: number;
  currency: Currency;
}

export function CostBenefitSimulator() {
  const [investmentSize, setInvestmentSize] = useState(5000000); // USD
  const [employeeCount, setEmployeeCount] = useState(500);
  const [annualRevenue, setAnnualRevenue] = useState(8000000); // USD
  const [sector, setSector] = useState('Textile & Garments');
  const [selectedCountries, setSelectedCountries] = useState(['BGD', 'VNM', 'IND']);
  const [exportRatio, setExportRatio] = useState(70); // Export percentage (70% export, 30% domestic)
  const [currency, setCurrency] = useState<Currency>('USD'); // NEW: Currency toggle
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]); // NEW: Saved scenarios
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  
  // NEW: Employee skill breakdown (percentages must sum to 100)
  const [entryLevelPercent, setEntryLevelPercent] = useState(60);
  const [skilledPercent, setSkilledPercent] = useState(30);
  const [managerialPercent, setManagerialPercent] = useState(10);
  
  // NEW: Production capacity
  const [productionCapacity, setProductionCapacity] = useState(1000000); // units per year
  const [productionUnit, setProductionUnit] = useState('pieces'); // pieces, tons, units, etc.
  
  // Load saved scenarios from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bida-cost-scenarios');
    if (saved) {
      try {
        setSavedScenarios(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load scenarios:', e);
      }
    }
  }, []);
  
  // Save scenarios to localStorage whenever they change
  useEffect(() => {
    if (savedScenarios.length > 0) {
      localStorage.setItem('bida-cost-scenarios', JSON.stringify(savedScenarios));
    }
  }, [savedScenarios]);
  
  // Currency conversion helper
  const convertCurrency = (amountUSD: number): number => {
    return amountUSD * CURRENCY_RATES[currency];
  };
  
  // Format currency with symbol
  const formatCurrency = (amountUSD: number, decimals: number = 0): string => {
    const converted = convertCurrency(amountUSD);
    const symbols = { USD: '$', BDT: '৳', EUR: '€' };
    const formatted = converted.toLocaleString('en-US', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
    return `${symbols[currency]}${formatted}`;
  };
  
  // Save current scenario
  const saveScenario = () => {
    if (!scenarioName.trim()) return;
    
    const newScenario: SavedScenario = {
      id: Date.now().toString(),
      name: scenarioName,
      timestamp: Date.now(),
      investmentSize,
      employeeCount,
      annualRevenue,
      sector,
      selectedCountries,
      exportRatio,
      currency,
    };
    
    setSavedScenarios([...savedScenarios, newScenario]);
    setScenarioName('');
    setShowSaveDialog(false);
  };
  
  // Load scenario
  const loadScenario = (scenario: SavedScenario) => {
    setInvestmentSize(scenario.investmentSize);
    setEmployeeCount(scenario.employeeCount);
    setAnnualRevenue(scenario.annualRevenue);
    setSector(scenario.sector);
    setSelectedCountries(scenario.selectedCountries);
    setExportRatio(scenario.exportRatio);
    setCurrency(scenario.currency);
    setShowLoadDialog(false);
  };
  
  // Delete scenario
  const deleteScenario = (id: string) => {
    setSavedScenarios(savedScenarios.filter(s => s.id !== id));
  };
  
  // Calculate cost comparisons
  const costComparisons = useMemo(() => {
    return compareCosts(sector, investmentSize, employeeCount, annualRevenue, selectedCountries);
  }, [sector, investmentSize, employeeCount, annualRevenue, selectedCountries]);
  
  // Calculate ROI for all countries
  const roiComparisons = useMemo(() => {
    return selectedCountries.map(code => calculateROI(investmentSize, annualRevenue, code));
  }, [investmentSize, annualRevenue, selectedCountries]);
  
  // Prepare chart data
  const costChartData = costComparisons.map(c => ({
    country: c.country,
    'Labor Cost': c.yearlyOperating.laborCost / 1000,
    'Utility Cost': c.yearlyOperating.utilityCost / 1000,
    'Tax Cost': c.yearlyOperating.taxCost / 1000,
  }));
  
  const setupChartData = costComparisons.map(c => ({
    country: c.country,
    'Setup Time (Days)': c.setup.timeDays,
    'Setup Cost (USD)': c.setup.costUSD,
  }));
  
  const roiChartData = roiComparisons.map(r => ({
    country: r.country,
    '5-Year ROI': r.roi5Year,
    '10-Year ROI': r.roi10Year,
  }));
  
  // Radar chart for comprehensive comparison
  const radarData = selectedCountries.map(code => {
    const country = getCountryBenchmark(code);
    return {
      country: country.country,
      'Labor Cost': 100 - (country.labor.averageWage / 1000) * 100,
      'Infrastructure': (country.infrastructure.portEfficiency + country.infrastructure.digitalInfrastructure) / 2,
      'Tax Benefits': country.taxation.taxHolidayYears * 10,
      'Trade Access': country.trade.ftaCount * 5,
      'Ease of Business': Math.max(0, 100 - country.business.easeOfDoingBusiness / 2),
    };
  });
  
  const bangladeshIndex = costComparisons.findIndex(c => c.country === 'Bangladesh');
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-blue-50/30 rounded-xl p-6 border border-gray-100/50">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Investment Cost-Benefit Simulator</h2>
        <p className="text-gray-600">Compare Bangladesh with competing investment destinations</p>
      </div>

      {/* Input Parameters */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Simulation Parameters</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Investment Size (USD)</label>
            <input
              type="number"
              value={investmentSize}
              onChange={(e) => setInvestmentSize(Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              step="100000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Employee Count</label>
            <input
              type="number"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              step="50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Revenue (USD)</label>
            <input
              type="number"
              value={annualRevenue}
              onChange={(e) => setAnnualRevenue(Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              step="100000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sector</label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option>Textile & Garments</option>
              <option>Technology & IT</option>
              <option>Pharmaceuticals</option>
              <option>Heavy Manufacturing</option>
              <option>Electronics</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Production Capacity (per year)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={productionCapacity}
                onChange={(e) => setProductionCapacity(Number(e.target.value))}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                step="10000"
              />
              <select
                value={productionUnit}
                onChange={(e) => setProductionUnit(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="pieces">pieces</option>
                <option value="tons">tons</option>
                <option value="units">units</option>
                <option value="kg">kg</option>
                <option value="liters">liters</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Employee Skill Breakdown</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Entry-Level %</label>
                <input
                  type="number"
                  value={entryLevelPercent}
                  onChange={(e) => {
                    const val = Math.min(100, Math.max(0, Number(e.target.value)));
                    setEntryLevelPercent(val);
                    const remaining = 100 - val;
                    const skilledRatio = skilledPercent / (skilledPercent + managerialPercent);
                    setSkilledPercent(Math.round(remaining * skilledRatio));
                    setManagerialPercent(remaining - Math.round(remaining * skilledRatio));
                  }}
                  className="w-full px-2 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Skilled %</label>
                <input
                  type="number"
                  value={skilledPercent}
                  onChange={(e) => {
                    const val = Math.min(100, Math.max(0, Number(e.target.value)));
                    setSkilledPercent(val);
                    const remaining = 100 - val;
                    const entryRatio = entryLevelPercent / (entryLevelPercent + managerialPercent);
                    setEntryLevelPercent(Math.round(remaining * entryRatio));
                    setManagerialPercent(remaining - Math.round(remaining * entryRatio));
                  }}
                  className="w-full px-2 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Managerial %</label>
                <input
                  type="number"
                  value={managerialPercent}
                  onChange={(e) => {
                    const val = Math.min(100, Math.max(0, Number(e.target.value)));
                    setManagerialPercent(val);
                    const remaining = 100 - val;
                    const entryRatio = entryLevelPercent / (entryLevelPercent + skilledPercent);
                    setEntryLevelPercent(Math.round(remaining * entryRatio));
                    setSkilledPercent(remaining - Math.round(remaining * entryRatio));
                  }}
                  className="w-full px-2 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Total: {entryLevelPercent + skilledPercent + managerialPercent}% {(entryLevelPercent + skilledPercent + managerialPercent) !== 100 && <span className="text-red-500">(must equal 100%)</span>}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Compare Countries</label>
          <div className="flex flex-wrap gap-3">
            {[
              { code: 'BGD', name: 'Bangladesh', color: 'bg-green-100 text-green-800 border-green-300' },
              { code: 'VNM', name: 'Vietnam', color: 'bg-red-100 text-red-800 border-red-300' },
              { code: 'IND', name: 'India', color: 'bg-orange-100 text-orange-800 border-orange-300' },
              { code: 'CHN', name: 'China', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
              { code: 'THA', name: 'Thailand', color: 'bg-purple-100 text-purple-800 border-purple-300' },
            ].map(country => (
              <button
                key={country.code}
                onClick={() => {
                  if (selectedCountries.includes(country.code)) {
                    if (selectedCountries.length > 1) {
                      setSelectedCountries(selectedCountries.filter(c => c !== country.code));
                    }
                  } else {
                    setSelectedCountries([...selectedCountries, country.code]);
                  }
                }}
                className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all ${
                  selectedCountries.includes(country.code)
                    ? country.color
                    : 'bg-gray-100 text-gray-400 border-gray-300'
                }`}
              >
                {country.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Export Ratio: <span className="text-blue-600 font-bold">{exportRatio}%</span> export, <span className="text-gray-600">{100 - exportRatio}%</span> domestic
          </label>
          <input
            type="range"
            value={exportRatio}
            onChange={(e) => setExportRatio(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            step="5"
            min="0"
            max="100"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0% (Domestic Only)</span>
            <span>50% (Balanced)</span>
            <span>100% (Export Only)</span>
          </div>
          {exportRatio >= 50 && (
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Export Benefits:</strong> Bangladesh offers EU GSP+ duty-free access, saving up to 12% on export duties to European markets.
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="USD">USD ($)</option>
            <option value="BDT">BDT (৳)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
        
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => setShowSaveDialog(true)}
            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            <Save className="w-5 h-5" />
            Save Scenario
          </button>
          <button
            onClick={() => setShowLoadDialog(true)}
            className="flex items-center gap-2 bg-gray-600 text-white hover:bg-gray-700 font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            <FolderOpen className="w-5 h-5" />
            Load Scenario ({savedScenarios.length})
          </button>
        </div>
        
        {/* Save Dialog */}
        {showSaveDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-lg font-bold mb-4">Save Scenario</h3>
              <input
                type="text"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                placeholder="Enter scenario name"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="flex items-center gap-2 bg-gray-300 text-gray-700 hover:bg-gray-400 border-2 border-gray-300 font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={saveScenario}
                  className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-500 border-2 border-blue-600 font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Load Dialog */}
        {showLoadDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-lg font-bold mb-4">Load Scenario</h3>
              <div className="space-y-3">
                {savedScenarios.map(scenario => (
                  <div key={scenario.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-gray-700" />
                      <div className="text-sm text-gray-700">{scenario.name}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Ship className="w-5 h-5 text-gray-700" />
                      <div className="text-sm text-gray-700">{new Date(scenario.timestamp).toLocaleDateString()}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => loadScenario(scenario)}
                        className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-500 border-2 border-blue-600 font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => deleteScenario(scenario.id)}
                        className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-500 border-2 border-red-600 font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowLoadDialog(false)}
                  className="flex items-center gap-2 bg-gray-300 text-gray-700 hover:bg-gray-400 border-2 border-gray-300 font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bangladesh Advantage Highlight */}
      {bangladeshIndex >= 0 && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-green-500 rounded-full p-3">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Bangladesh Competitive Advantage</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="text-sm text-gray-600 mb-1">Annual Cost Savings vs Avg</div>
                  <div className="text-2xl font-bold text-green-600">
                    ${((costComparisons.reduce((sum, c) => sum + c.yearlyOperating.totalCost, 0) / costComparisons.length - costComparisons[bangladeshIndex].yearlyOperating.totalCost) / 1000).toFixed(0)}K
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="text-sm text-gray-600 mb-1">10-Year Tax Holiday</div>
                  <div className="text-2xl font-bold text-green-600">
                    ${((annualRevenue * 0.15 * 0.225 * 10) / 1000000).toFixed(1)}M Saved
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="text-sm text-gray-600 mb-1">EU GSP+ Access</div>
                  <div className="text-2xl font-bold text-green-600">Duty-Free</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Annual Operating Cost Comparison */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Annual Operating Cost Breakdown</h3>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis label={{ value: 'Cost (Thousands USD)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Labor Cost" fill="#3B82F6" />
            <Bar dataKey="Utility Cost" fill="#10B981" />
            <Bar dataKey="Tax Cost" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {costComparisons.map((comparison, idx) => (
            <div key={comparison.country} className={`p-4 rounded-lg border-2 ${idx === bangladeshIndex ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
              <div className="font-bold text-gray-900 mb-2">{comparison.country}</div>
              <div className="text-sm text-gray-600 mb-1">Total Annual Cost</div>
              <div className="text-2xl font-bold text-gray-900">
                ${(comparison.yearlyOperating.totalCost / 1000).toFixed(0)}K
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Comparison */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Return on Investment (ROI)</h3>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={roiChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis label={{ value: 'ROI (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="5-Year ROI" stroke="#3B82F6" strokeWidth={3} />
            <Line type="monotone" dataKey="10-Year ROI" stroke="#10B981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {roiComparisons.map((roi, idx) => (
            <div key={roi.country} className={`p-4 rounded-lg border-2 ${idx === bangladeshIndex ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
              <div className="font-bold text-gray-900 mb-3">{roi.country}</div>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-gray-600">Breakeven</div>
                  <div className="text-lg font-bold text-blue-600">{roi.breakevenYears} years</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">10-Year ROI</div>
                  <div className="text-lg font-bold text-green-600">{roi.roi10Year.toFixed(0)}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Radar Comparison */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Multi-Factor Competitiveness Analysis</h3>
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData[0] ? Object.keys(radarData[0]).filter(k => k !== 'country').map(key => ({
            factor: key,
            ...radarData.reduce((acc, country) => ({ ...acc, [country.country]: country[key as keyof typeof country] }), {})
          })) : []}>
            <PolarGrid />
            <PolarAngleAxis dataKey="factor" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            {selectedCountries.map((code, idx) => {
              const country = getCountryBenchmark(code);
              const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];
              return (
                <Radar
                  key={code}
                  name={country.country}
                  dataKey={country.country}
                  stroke={colors[idx]}
                  fill={colors[idx]}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              );
            })}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* ADVANCED METRICS PANELS - Hourly Wages, Utilities, 5-Year NPV */}
      <AdvancedMetricsPanels
        selectedCountries={selectedCountries}
        costComparisons={costComparisons}
        entryLevelPercent={entryLevelPercent}
        skilledPercent={skilledPercent}
        managerialPercent={managerialPercent}
        productionCapacity={productionCapacity}
        productionUnit={productionUnit}
        employeeCount={employeeCount}
        formatCurrency={formatCurrency}
        bangladeshIndex={bangladeshIndex}
      />

      {/* Summary Recommendation */}
      <div className="bg-gradient-to-br from-green-50/30 via-emerald-50/20 to-green-50/30 rounded-xl p-6 border border-gray-100/50">
        <h3 className="text-xl font-bold mb-3 text-gray-900">Investment Recommendation</h3>
        <p className="text-gray-600 mb-4">
          Based on your parameters ({employeeCount} employees, ${(investmentSize / 1000000).toFixed(1)}M investment, {sector} sector):
        </p>
        <div className="bg-white/60 rounded-lg p-4 border border-gray-200/50">
          <div className="font-bold text-lg mb-2 text-gray-900">Bangladesh offers:</div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Lowest labor costs in the region ({costComparisons[bangladeshIndex]?.yearlyOperating.laborCost && `$${(costComparisons[bangladeshIndex].yearlyOperating.laborCost / 1000).toFixed(0)}K/year`})</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">10-year tax holiday (vs 2-5 years in competitors)</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">EU GSP+ duty-free access for exports</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Fastest ROI: {roiComparisons[bangladeshIndex]?.breakevenYears} years breakeven</span>
            </li>
          </ul>
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => {
              const doc = new jsPDF();
              
              // Title
              doc.setFontSize(18);
              doc.text('Investment Cost-Benefit Analysis Report', 105, 15, { align: 'center' });
              
              // Subtitle
              doc.setFontSize(11);
              doc.text('Bangladesh Investment Development Authority (BIDA)', 105, 22, { align: 'center' });
              
              // Parameters section
              doc.setFontSize(12);
              doc.text('Simulation Parameters', 14, 35);
              doc.setFontSize(10);
              doc.text(`Investment Size: $${(investmentSize / 1000000).toFixed(1)}M USD`, 14, 42);
              doc.text(`Employee Count: ${employeeCount}`, 14, 48);
              doc.text(`Annual Revenue: $${(annualRevenue / 1000000).toFixed(1)}M USD`, 14, 54);
              doc.text(`Sector: ${sector}`, 14, 60);
              doc.text(`Export Ratio: ${exportRatio}% export, ${100 - exportRatio}% domestic`, 14, 66);
              doc.text(`Countries Compared: ${selectedCountries.map(c => getCountryBenchmark(c).country).join(', ')}`, 14, 72);
              
              // Annual Operating Cost Comparison
              autoTable(doc, {
                head: [['Country', 'Labor Cost ($K)', 'Utility Cost ($K)', 'Tax Cost ($K)', 'Total Cost ($K)']],
                body: costComparisons.map(c => [
                  c.country,
                  (c.yearlyOperating.laborCost / 1000).toFixed(0),
                  (c.yearlyOperating.utilityCost / 1000).toFixed(0),
                  (c.yearlyOperating.taxCost / 1000).toFixed(0),
                  (c.yearlyOperating.totalCost / 1000).toFixed(0)
                ]),
                startY: 80,
                theme: 'grid',
                headStyles: { fillColor: [37, 99, 235] },
                styles: { fontSize: 9 }
              });
              
              // ROI Comparison
              autoTable(doc, {
                head: [['Country', 'Breakeven (Years)', '5-Year ROI (%)', '10-Year ROI (%)']],
                body: roiComparisons.map(r => [
                  r.country,
                  r.breakevenYears,
                  r.roi5Year.toFixed(1),
                  r.roi10Year.toFixed(1)
                ]),
                startY: (doc as any).lastAutoTable.finalY + 10,
                theme: 'grid',
                headStyles: { fillColor: [16, 185, 129] },
                styles: { fontSize: 9 }
              });
              
              // Setup Comparison
              autoTable(doc, {
                head: [['Country', 'Setup Time (Days)', 'Setup Cost (USD)', 'Complexity']],
                body: costComparisons.map(c => [
                  c.country,
                  c.setup.timeDays,
                  `$${c.setup.costUSD.toLocaleString()}`,
                  c.setup.complexity
                ]),
                startY: (doc as any).lastAutoTable.finalY + 10,
                theme: 'grid',
                headStyles: { fillColor: [59, 130, 246] },
                styles: { fontSize: 9 }
              });
              
              // Bangladesh Advantages (if Bangladesh is selected)
              if (bangladeshIndex >= 0) {
                doc.setFontSize(12);
                doc.text('Bangladesh Competitive Advantages', 14, (doc as any).lastAutoTable.finalY + 15);
                doc.setFontSize(9);
                const advantages = [
                  `✓ Lowest labor costs: $${(costComparisons[bangladeshIndex].yearlyOperating.laborCost / 1000).toFixed(0)}K/year`,
                  `✓ 10-year tax holiday (saves $${((annualRevenue * 0.15 * 0.225 * 10) / 1000000).toFixed(1)}M)`,
                  `✓ EU GSP+ duty-free access for exports`,
                  `✓ ${roiComparisons[bangladeshIndex].breakevenYears}-year breakeven period`
                ];
                advantages.forEach((adv, i) => {
                  doc.text(adv, 14, (doc as any).lastAutoTable.finalY + 22 + (i * 6));
                });
              }
              
              // Footer
              doc.setFontSize(8);
              doc.text(`Generated on ${new Date().toLocaleDateString()} | BIDA One Stop Service`, 105, 285, { align: 'center' });
              
              doc.save(`Bangladesh_Investment_Analysis_${sector.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
            }}
            className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 border-2 border-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            Download PDF Report
          </button>
        </div>
      </div>
    </div>
  );
}