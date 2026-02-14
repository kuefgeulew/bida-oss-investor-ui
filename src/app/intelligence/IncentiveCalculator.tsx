// 💰 INCENTIVE CALCULATOR — Investment Decision Intelligence Dashboard
// ARCHITECTURE: UI layer reading incentiveEngine for strategic decision support
// MOUNT: Investor Dashboard

import React, { useState, useMemo } from 'react';
import { Card } from '@/app/components/ui/card';
import {
  DollarSign,
  TrendingDown,
  Award,
  Target,
  Clock,
  MapPin,
  Building2,
  ArrowRight,
  Calculator,
  FileText,
  CheckCircle,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';
import {
  calculateInvestmentCosts,
  getIncentivePackage,
  compareROI,
  getAllSectorIncentives,
  getAllZoneIncentives,
  getStrategicSavingsOpportunities,
  getQuickIncentiveSummary
} from './incentiveEngine';

interface IncentiveCalculatorProps {
  compact?: boolean;
  defaultInvestment?: number;
  defaultSector?: string;
  defaultZone?: string;
}

export function IncentiveCalculator({
  compact = false,
  defaultInvestment = 5000000,
  defaultSector = 'Manufacturing - Electronics',
  defaultZone = 'Dhaka EPZ'
}: IncentiveCalculatorProps) {
  const [investmentAmount, setInvestmentAmount] = useState(defaultInvestment || 5000000);
  const [selectedSector, setSelectedSector] = useState(defaultSector);
  const [selectedZone, setSelectedZone] = useState(defaultZone);
  const [showDetails, setShowDetails] = useState(!compact);

  // Get all available options
  const sectors = useMemo(() => getAllSectorIncentives(), []);
  const zones = useMemo(() => getAllZoneIncentives(), []);

  // Calculate incentives
  const incentivePackage = useMemo(
    () => getIncentivePackage(selectedSector, selectedZone, investmentAmount),
    [selectedSector, selectedZone, investmentAmount]
  );

  const roiComparison = useMemo(
    () => compareROI(investmentAmount, selectedSector, selectedZone),
    [selectedSector, selectedZone, investmentAmount]
  );

  const costs = useMemo(
    () => calculateInvestmentCosts(
      selectedSector.includes('Manufacturing') ? 'manufacturing' :
      selectedSector.includes('Services') ? 'services' : 'trading'
    ),
    [selectedSector]
  );

  const strategicOpportunities = useMemo(
    () => getStrategicSavingsOpportunities(investmentAmount, selectedSector, selectedZone),
    [investmentAmount, selectedSector, selectedZone]
  );

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  // Format currency
  const formatUSD = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

  const formatBDT = (amount: number) => 
    new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', minimumFractionDigits: 0 }).format(amount);

  // 🆕 SURGICAL COMPLETION: 10-year tax savings & ROI calculation
  const tenYearCalculations = useMemo(() => {
    const exchangeRate = 109.85; // USD to BDT
    const corporateTaxRate = 0.22; // 22% corporate tax in Bangladesh
    const investmentBDT = investmentAmount * exchangeRate;
    
    // Calculate 10-year tax savings
    const annualProfit = investmentAmount * 0.15; // Assume 15% annual ROI
    const taxSavedPerYear = annualProfit * corporateTaxRate;
    const tenYearTaxSaved = taxSavedPerYear * incentivePackage.taxHoliday.years;
    const tenYearTaxSavedBDT = tenYearTaxSaved * exchangeRate;
    
    // Calculate ROI improvement
    const roiBoost = (tenYearTaxSaved / investmentAmount) * 100;
    
    return {
      investmentBDT,
      tenYearTaxSaved,
      tenYearTaxSavedBDT,
      roiBoost,
      totalIncentivesBDT: incentivePackage.totalIncentiveValue * exchangeRate
    };
  }, [investmentAmount, incentivePackage]);

  // Compact view for investor dashboard
  if (compact) {
    const summary = getQuickIncentiveSummary(selectedSector, selectedZone, investmentAmount);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">💰 Incentive Calculator</h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-900">Total Incentives</span>
            </div>
            <div className="text-2xl font-bold text-green-700">
              {formatUSD(summary.totalIncentiveValue)}
            </div>
            <div className="text-xs text-green-600 mt-1">
              {summary.percentageSavings.toFixed(1)}% of investment
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-900">Tax Holiday</span>
            </div>
            <div className="text-2xl font-bold text-blue-700">
              {summary.taxHolidayYears} years
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Corporate tax exemption
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-medium text-purple-900">Break-even</span>
            </div>
            <div className="text-2xl font-bold text-purple-700">
              -{summary.breakEvenMonthsReduction} mos
            </div>
            <div className="text-xs text-purple-600 mt-1">
              Faster ROI
            </div>
          </Card>
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <Card className="p-4 bg-white/70 backdrop-blur-xl border border-gray-200">
            <div className="space-y-4">
              {/* Input Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-2 block">
                    Investment Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    step="100000"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-2 block">
                    Sector
                  </label>
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {sectors.map(s => (
                      <option key={s.sector} value={s.sector}>{s.sector}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-2 block">
                    Zone
                  </label>
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {zones.map(z => (
                      <option key={z.zoneName} value={z.zoneName}>{z.zoneName}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Top Benefits */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">Top Benefits</span>
                </div>
                <ul className="space-y-1">
                  {summary.topBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-blue-700">
                      <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }

  // Full detailed view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Calculator className="w-7 h-7 text-blue-600" />
            Incentive Calculator
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Strategic investment decision intelligence powered by live government data
          </p>
        </div>
      </div>

      {/* Input Controls */}
      <Card className="p-6 bg-white/70 backdrop-blur-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-900 mb-3 block flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              Investment Amount (USD)
            </label>
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="100000"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-900 mb-3 block flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              Sector
            </label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sectors.map(s => (
                <option key={s.sector} value={s.sector}>{s.sector}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-900 mb-3 block flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              Zone
            </label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {zones.map(z => (
                <option key={z.zoneName} value={z.zoneName}>{z.zoneName}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-green-700">Total Incentives</div>
              <div className="text-2xl font-bold text-green-800">
                {formatUSD(incentivePackage.totalIncentiveValue)}
              </div>
            </div>
          </div>
          <div className="text-xs text-green-600 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            {roiComparison.percentageSavings.toFixed(1)}% of investment saved
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-blue-700">Tax Holiday</div>
              <div className="text-2xl font-bold text-blue-800">
                {incentivePackage.taxHoliday.years} years
              </div>
            </div>
          </div>
          <div className="text-xs text-blue-600 flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {formatUSD(incentivePackage.taxHoliday.estimatedSavings)} saved
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-purple-700">Duty Exemption</div>
              <div className="text-2xl font-bold text-purple-800">
                {incentivePackage.dutyConcessions.percentage}%
              </div>
            </div>
          </div>
          <div className="text-xs text-purple-600 flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {formatUSD(incentivePackage.dutyConcessions.estimatedSavings)} saved
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-orange-700">Break-even</div>
              <div className="text-2xl font-bold text-orange-800">
                {roiComparison.withIncentives.breakEvenMonths} mos
              </div>
            </div>
          </div>
          <div className="text-xs text-orange-600 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            {roiComparison.withoutIncentives.breakEvenMonths - roiComparison.withIncentives.breakEvenMonths} months faster
          </div>
        </Card>
      </div>

      {/* ROI Comparison Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/70 backdrop-blur-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-blue-600" />
            Investment Comparison
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                {
                  name: 'With Incentives',
                  'Net Investment': roiComparison.withIncentives.netInvestment,
                  'Break-even': roiComparison.withIncentives.breakEvenMonths * 10000
                },
                {
                  name: 'Without Incentives',
                  'Net Investment': roiComparison.withoutIncentives.netInvestment,
                  'Break-even': roiComparison.withoutIncentives.breakEvenMonths * 10000
                }
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value: number) => formatUSD(value)}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Net Investment" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-white/70 backdrop-blur-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Cost Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Registration', value: costs.totalRegistrationFees },
                  { name: 'Utilities', value: costs.totalUtilityConnections },
                  { name: 'Environment', value: costs.totalEnvironmentalFees },
                  { name: 'Licensing', value: costs.totalLicensingFees },
                  { name: 'Customs', value: costs.totalCustomsFees }
                ].filter(item => item.value > 0)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatBDT(value)}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Incentive Details */}
      <Card className="p-6 bg-white/70 backdrop-blur-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-600" />
          Available Incentives & Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {incentivePackage.eligibilityCriteria.map((benefit, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
            >
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-800">{benefit}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 🆕 SURGICAL COMPLETION: 10-Year Tax Savings & ROI Impact Card */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-300">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
            <TrendingDown className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-900 mb-3">
              💰 10-Year Tax Savings Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white/80 rounded-lg p-4 border border-indigo-200">
                <div className="text-xs text-gray-600 mb-1">Investment in BDT</div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatBDT(tenYearCalculations.investmentBDT)}
                </div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-indigo-200">
                <div className="text-xs text-gray-600 mb-1">Total Incentives (BDT)</div>
                <div className="text-2xl font-bold text-green-700">
                  {formatBDT(tenYearCalculations.totalIncentivesBDT)}
                </div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-purple-200">
                <div className="text-xs text-gray-600 mb-1">ROI Improvement</div>
                <div className="text-2xl font-bold text-purple-700">
                  +{tenYearCalculations.roiBoost.toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 border-2 border-green-300">
              <div className="text-sm font-semibold text-green-900 mb-2">
                💎 Over 10 years you save:
              </div>
              <div className="text-3xl font-bold text-green-800 mb-1">
                {formatBDT(tenYearCalculations.tenYearTaxSavedBDT)}
              </div>
              <div className="text-xs text-green-700">
                ({formatUSD(tenYearCalculations.tenYearTaxSaved)} USD) in corporate tax savings 
                from {incentivePackage.taxHoliday.years}-year tax holiday
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Strategic Opportunities */}
      {strategicOpportunities.potentialAdditionalSavings > 0 && (
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900 mb-2">
                💡 Strategic Optimization Opportunity
              </h3>
              <p className="text-sm text-amber-800 mb-3">
                You could save an additional{' '}
                <span className="font-bold">{formatUSD(strategicOpportunities.potentialAdditionalSavings)}</span>
                {' '}by considering:
              </p>
              <div className="space-y-2">
                {strategicOpportunities.bestSectorOption.improvement > 0 && (
                  <div className="flex items-center gap-2 text-sm text-amber-800">
                    <ArrowRight className="w-4 h-4" />
                    <span>
                      <strong>{strategicOpportunities.bestSectorOption.sector}</strong> sector
                      (+{formatUSD(strategicOpportunities.bestSectorOption.improvement)})
                    </span>
                  </div>
                )}
                {strategicOpportunities.bestZoneOption.improvement > 0 && (
                  <div className="flex items-center gap-2 text-sm text-amber-800">
                    <ArrowRight className="w-4 h-4" />
                    <span>
                      <strong>{strategicOpportunities.bestZoneOption.zone}</strong> location
                      (+{formatUSD(strategicOpportunities.bestZoneOption.improvement)})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Itemized Costs Table */}
      <Card className="p-6 bg-white/70 backdrop-blur-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-600" />
          Itemized Government Fees
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Service</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Agency</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-700">Amount</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">Waivable</th>
              </tr>
            </thead>
            <tbody>
              {costs.itemizedCosts.slice(0, 10).map((cost, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 text-gray-900">{cost.serviceName}</td>
                  <td className="py-3 px-2 text-gray-600">{cost.agency}</td>
                  <td className="py-3 px-2 text-right font-medium text-gray-900">
                    {formatBDT(cost.amount)}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {cost.waivable ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        <CheckCircle className="w-3 h-3" />
                        Yes
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300 font-semibold">
                <td colSpan={2} className="py-3 px-2 text-gray-900">Total Upfront Costs</td>
                <td className="py-3 px-2 text-right text-gray-900">{formatBDT(costs.grandTotal)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        {costs.itemizedCosts.length > 10 && (
          <p className="text-xs text-gray-500 mt-3 text-center">
            Showing top 10 of {costs.itemizedCosts.length} services
          </p>
        )}
      </Card>
    </div>
  );
}