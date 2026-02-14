import { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingDown, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

interface BenchmarkInputs {
  industry: string;
  workforce: number;
  officeSize: number;
  exportPercentage: number;
}

interface CountryComparison {
  country: string;
  flag: string;
  laborCost: number;
  electricityCost: number;
  corporateTax: number;
  setupTime: number;
  incentiveValue: number;
  totalCostYear1: number;
  ranking: number;
}

export function CompetitorBenchmark() {
  const [inputs, setInputs] = useState<BenchmarkInputs>({
    industry: 'manufacturing',
    workforce: 100,
    officeSize: 5000,
    exportPercentage: 80
  });

  const [showResults, setShowResults] = useState(false);

  const calculateComparison = (): CountryComparison[] => {
    const { workforce, officeSize, exportPercentage } = inputs;

    // Base calculations (simplified model)
    const baseLabor = workforce * 12; // months
    const baseElectricity = officeSize * 0.12; // per sq ft
    const baseSetup = 50000;

    return [
      {
        country: 'Bangladesh',
        flag: '🇧🇩',
        laborCost: workforce * 95, // $95/month avg
        electricityCost: officeSize * 0.08,
        corporateTax: exportPercentage > 50 ? 12 : 22.5,
        setupTime: 14,
        incentiveValue: exportPercentage > 50 ? baseSetup * 0.25 : baseSetup * 0.15,
        totalCostYear1: (workforce * 95 * 12) + (officeSize * 0.08 * 12) + baseSetup,
        ranking: 1
      },
      {
        country: 'Vietnam',
        flag: '🇻🇳',
        laborCost: workforce * 180,
        electricityCost: officeSize * 0.11,
        corporateTax: 20,
        setupTime: 21,
        incentiveValue: baseSetup * 0.18,
        totalCostYear1: (workforce * 180 * 12) + (officeSize * 0.11 * 12) + baseSetup * 1.2,
        ranking: 2
      },
      {
        country: 'India',
        flag: '🇮🇳',
        laborCost: workforce * 240,
        electricityCost: officeSize * 0.14,
        corporateTax: 25,
        setupTime: 45,
        incentiveValue: baseSetup * 0.12,
        totalCostYear1: (workforce * 240 * 12) + (officeSize * 0.14 * 12) + baseSetup * 1.4,
        ranking: 3
      },
      {
        country: 'Indonesia',
        flag: '🇮🇩',
        laborCost: workforce * 210,
        electricityCost: officeSize * 0.13,
        corporateTax: 22,
        setupTime: 38,
        incentiveValue: baseSetup * 0.10,
        totalCostYear1: (workforce * 210 * 12) + (officeSize * 0.13 * 12) + baseSetup * 1.35,
        ranking: 4
      },
      {
        country: 'Thailand',
        flag: '🇹🇭',
        laborCost: workforce * 320,
        electricityCost: officeSize * 0.12,
        corporateTax: 20,
        setupTime: 28,
        incentiveValue: baseSetup * 0.15,
        totalCostYear1: (workforce * 320 * 12) + (officeSize * 0.12 * 12) + baseSetup * 1.25,
        ranking: 5
      }
    ];
  };

  const comparison = showResults ? calculateComparison() : [];
  const bangladesh = comparison.find(c => c.country === 'Bangladesh');

  const calculateSavings = (country: CountryComparison) => {
    if (!bangladesh) return 0;
    return ((country.totalCostYear1 - bangladesh.totalCostYear1) / country.totalCostYear1 * 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Bangladesh vs. Competitors</h3>
        <p className="text-sm text-gray-600 mt-1">Compare operational costs across Asian manufacturing hubs</p>
      </div>

      {/* Input Form */}
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h4 className="text-sm font-semibold text-gray-900">Your Business Parameters</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <select
              value={inputs.industry}
              onChange={(e) => setInputs({ ...inputs, industry: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="manufacturing">Manufacturing</option>
              <option value="rmg">RMG & Textiles</option>
              <option value="it">IT Services</option>
              <option value="pharma">Pharmaceuticals</option>
              <option value="agro">Agro Processing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Workforce Size</label>
            <input
              type="number"
              value={inputs.workforce}
              onChange={(e) => setInputs({ ...inputs, workforce: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Factory/Office Size (sq ft)</label>
            <input
              type="number"
              value={inputs.officeSize}
              onChange={(e) => setInputs({ ...inputs, officeSize: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Export Percentage (%)</label>
            <input
              type="number"
              value={inputs.exportPercentage}
              onChange={(e) => setInputs({ ...inputs, exportPercentage: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="100"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowResults(true)}
          className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          Calculate Cost Comparison
        </motion.button>
      </div>

      {/* Results */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Winner Card */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-6xl">🇧🇩</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-2xl font-bold text-gray-900">Bangladesh</h4>
                    <div className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                      BEST VALUE
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Most cost-effective for your business</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Total Year 1 Cost</p>
                <p className="text-3xl font-bold text-green-600">
                  ${bangladesh?.totalCostYear1.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Country</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Labor Cost/Month</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Corporate Tax</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Setup Time</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Incentive Value</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Total Year 1</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparison.map((country) => {
                  const savings = calculateSavings(country);
                  return (
                    <tr key={country.country} className={country.country === 'Bangladesh' ? 'bg-green-50' : ''}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{country.flag}</span>
                          <span className="font-medium text-gray-900">{country.country}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-gray-700">${country.laborCost}</td>
                      <td className="px-4 py-3 text-right text-sm text-gray-700">{country.corporateTax}%</td>
                      <td className="px-4 py-3 text-right text-sm text-gray-700">{country.setupTime} days</td>
                      <td className="px-4 py-3 text-right text-sm text-green-600 font-medium">
                        ${country.incentiveValue.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-gray-900">
                        ${country.totalCostYear1.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {country.country === 'Bangladesh' ? (
                          <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                        ) : (
                          <div className="flex items-center justify-end gap-1 text-red-600 text-sm font-medium">
                            <TrendingUp className="w-4 h-4" />
                            +{savings.toFixed(1)}%
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 10-Year ROI Projection */}
          <div className="p-6 bg-white rounded-xl border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">10-Year Cost Savings (Bangladesh vs. Average Competitor)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Savings</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${((comparison.reduce((sum, c) => sum + c.totalCostYear1, 0) / comparison.length - (bangladesh?.totalCostYear1 || 0)) * 10).toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Tax Saved (Export)</p>
                <p className="text-2xl font-bold text-green-600">
                  ${((inputs.workforce * 95 * 12 * 0.10) * 10).toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Incentive ROI</p>
                <p className="text-2xl font-bold text-purple-600">
                  {((bangladesh?.incentiveValue || 0) / (bangladesh?.totalCostYear1 || 1) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
