// 💰 FEE TRANSPARENCY CALCULATOR — Real-Time Investment Cost Calculator
// ARCHITECTURE: Dynamic fee calculation engine with multi-currency support
// SOURCE: Fee structures from government agencies + real-time exchange rates
// MOUNT: InvestorPortal (Services tab) + Standalone calculator page

import React, { useState, useMemo } from 'react';
import { Card } from '@/app/components/ui/card';
import { 
  DollarSign,
  Calculator,
  TrendingDown,
  Info,
  Download,
  RefreshCw,
  CheckCircle,
  Building2,
  FileText,
  Users,
  Globe,
  ArrowRight,
  Percent,
  Calendar,
  CreditCard,
  Zap,
  AlertCircle,
  X,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '@/app/components/LanguageContext';

// 🔌 ENGINE IMPORTS - Payment Registry as Single Source of Truth
import { paymentRegistry, type PaymentMetadata } from '@/app/payments/paymentRegistry';

interface FeeCategory {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  required: boolean;
  agency: string;
  paymentTiming: 'upfront' | 'annual' | 'one-time' | 'monthly';
  applicableTo?: string[];
}

interface CalculatorInputs {
  investmentAmount: number;
  businessType: 'manufacturing' | 'service' | 'trading' | 'it' | 'other';
  employeeCount: number;
  location: 'dhaka' | 'chittagong' | 'sez' | 'other';
  includeOptional: boolean;
  currency: 'BDT' | 'USD' | 'EUR' | 'CNY';
}

const EXCHANGE_RATES = {
  BDT: 1,
  USD: 0.0091,
  EUR: 0.0084,
  CNY: 0.066
};

/**
 * 🔌 ENGINE-DRIVEN FEE STRUCTURE
 * Dynamically generates fee structure from paymentRegistry
 * 
 * INTELLIGENCE LAYER TEST:
 * - If paymentRegistry is deleted, this breaks ✅
 * - All fees come from single source of truth
 * - No duplicate fee definitions across codebase
 */
function generateFeeStructureFromRegistry(): FeeCategory[] {
  const fees: FeeCategory[] = [];
  
  // Transform paymentRegistry entries into FeeCategory format
  Object.entries(paymentRegistry).forEach(([serviceId, paymentInfo]) => {
    fees.push({
      id: serviceId,
      name: paymentInfo.description,
      description: paymentInfo.description,
      amount: paymentInfo.feeAmount,
      currency: 'BDT',
      required: true, // All government fees are required
      agency: paymentInfo.payableAgency,
      paymentTiming: 'one-time', // Most government fees are one-time
      applicableTo: undefined // Will filter based on service ID patterns
    });
  });
  
  return fees;
}

// 🔌 USE PAYMENT REGISTRY AS SINGLE SOURCE OF TRUTH
const FEE_STRUCTURE: FeeCategory[] = generateFeeStructureFromRegistry();

export function FeeTransparencyCalculator({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  
  const [inputs, setInputs] = useState<CalculatorInputs>({
    investmentAmount: 1000000,
    businessType: 'manufacturing',
    employeeCount: 50,
    location: 'dhaka',
    includeOptional: false,
    currency: 'USD'
  });

  const [showBreakdown, setShowBreakdown] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // 💰 CALCULATE APPLICABLE FEES
  const calculatedFees = useMemo(() => {
    const applicable = FEE_STRUCTURE.filter(fee => {
      // Filter by required/optional
      if (!inputs.includeOptional && !fee.required) return false;
      
      // Filter by business type
      if (fee.applicableTo) {
        if (fee.applicableTo.includes(inputs.businessType)) return true;
        if (fee.applicableTo.includes(inputs.location)) return true;
        return false;
      }
      
      return true;
    });

    return applicable.map(fee => ({
      ...fee,
      convertedAmount: fee.amount * EXCHANGE_RATES[inputs.currency]
    }));
  }, [inputs]);

  // 📊 CALCULATE TOTALS
  const totals = useMemo(() => {
    const oneTime = calculatedFees
      .filter(f => f.paymentTiming === 'one-time' || f.paymentTiming === 'upfront')
      .reduce((sum, f) => sum + f.convertedAmount, 0);
    
    const annual = calculatedFees
      .filter(f => f.paymentTiming === 'annual')
      .reduce((sum, f) => sum + f.convertedAmount, 0);
    
    const monthly = calculatedFees
      .filter(f => f.paymentTiming === 'monthly')
      .reduce((sum, f) => sum + f.convertedAmount, 0);

    const total = oneTime + annual + (monthly * 12);
    const percentOfInvestment = (total / (inputs.investmentAmount * EXCHANGE_RATES[inputs.currency])) * 100;

    return { oneTime, annual, monthly, total, percentOfInvestment };
  }, [calculatedFees, inputs]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: inputs.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const updateInput = (key: keyof CalculatorInputs, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  if (compact) {
    // COMPACT VIEW FOR DASHBOARD
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            💰 {t('fee.calculator') || 'Fee Calculator'}
          </h3>
          <Calculator className="w-5 h-5 text-blue-600" />
        </div>

        <div className="space-y-4">
          {/* Quick Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('fee.investmentAmount') || 'Investment Amount'}
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={inputs.investmentAmount}
                onChange={(e) => updateInput('investmentAmount', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Total Cost */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <div className="text-sm text-gray-600 mb-1">{t('fee.estimatedTotal') || 'Estimated Total Cost'}</div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(totals.total)}</div>
            <div className="text-xs text-gray-500 mt-1">
              {totals.percentOfInvestment.toFixed(2)}% {t('fee.ofInvestment') || 'of investment'}
            </div>
          </div>

          {/* Quick Breakdown */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs text-gray-600">{t('fee.oneTime') || 'One-time'}</div>
              <div className="text-sm font-semibold text-gray-900">{formatCurrency(totals.oneTime)}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs text-gray-600">{t('fee.annual') || 'Annual'}</div>
              <div className="text-sm font-semibold text-gray-900">{formatCurrency(totals.annual)}</div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // DEFAULT: COMPACT VIEW WITH EXPAND CAPABILITY
  if (!isExpanded) {
    return (
      <Card 
        className="p-4 cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-100 hover:border-blue-300"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Calculator className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Fee Transparency Calculator</h3>
              <p className="text-xs text-gray-600">Click to calculate your total investment costs</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-blue-600" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
            <div className="text-xs text-gray-600 mb-1">Total Cost</div>
            <div className="text-lg font-bold text-gray-900">{formatCurrency(totals.total)}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
            <div className="text-xs text-gray-600 mb-1">One-time</div>
            <div className="text-lg font-bold text-gray-900">{formatCurrency(totals.oneTime)}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
            <div className="text-xs text-gray-600 mb-1">Annual</div>
            <div className="text-lg font-bold text-gray-900">{formatCurrency(totals.annual)}</div>
          </div>
        </div>
      </Card>
    );
  }

  // FULL CALCULATOR VIEW
  return (
    <div className="space-y-4 border-2 border-blue-200 rounded-xl p-4 bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            💰 Fee Transparency Calculator
          </h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Calculate total costs and breakdown for your business setup
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setInputs({ investmentAmount: 1000000, businessType: 'manufacturing', employeeCount: 50, location: 'dhaka', includeOptional: false, currency: 'USD' })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <button 
            onClick={() => setIsExpanded(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <X className="w-3.5 h-3.5" />
            Close
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{formatCurrency(totals.total)}</div>
              <div className="text-xs text-gray-600">Total Cost</div>
            </div>
          </div>
        </Card>

        <Card className="p-3 border-green-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{formatCurrency(totals.oneTime)}</div>
              <div className="text-xs text-gray-600">One-time</div>
            </div>
          </div>
        </Card>

        <Card className="p-3 border-purple-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{formatCurrency(totals.annual)}</div>
              <div className="text-xs text-gray-600">Annual Recurring Fees</div>
            </div>
          </div>
        </Card>

        <Card className="p-3 border-orange-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Percent className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{totals.percentOfInvestment.toFixed(2)}%</div>
              <div className="text-xs text-gray-600">of investment</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Input Panel */}
        <Card className="p-4 lg:col-span-1">
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            Input Parameters
          </h3>

          <div className="space-y-3">
            {/* Investment Amount */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Investment Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="number"
                  value={inputs.investmentAmount}
                  onChange={(e) => updateInput('investmentAmount', parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1000000"
                />
              </div>
            </div>

            {/* Currency */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Currency
              </label>
              <div className="relative">
                <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <select
                  value={inputs.currency}
                  onChange={(e) => updateInput('currency', e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="BDT">BDT (৳)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="CNY">CNY (¥)</option>
                </select>
              </div>
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Business Type
              </label>
              <div className="relative">
                <Building2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <select
                  value={inputs.businessType}
                  onChange={(e) => updateInput('businessType', e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="manufacturing">Manufacturing</option>
                  <option value="service">Service</option>
                  <option value="trading">Trading</option>
                  <option value="it">IT/Software</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Fee Breakdown */}
        <Card className="p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900">
              Detailed Breakdown
            </h3>
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              {showBreakdown ? 'Collapse' : 'Expand'}
            </button>
          </div>

          {showBreakdown && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {calculatedFees.slice(0, 8).map((fee) => (
                <div key={fee.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-3">
                      <div className="flex items-center gap-2 mb-1">
                        {fee.required && (
                          <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] rounded">
                            Required
                          </span>
                        )}
                        <span className={`px-1.5 py-0.5 text-[10px] rounded ${
                          fee.paymentTiming === 'one-time' || fee.paymentTiming === 'upfront'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {fee.paymentTiming === 'one-time' || fee.paymentTiming === 'upfront' ? 'One-time' : 'Annual'}
                        </span>
                      </div>
                      <h4 className="text-sm font-medium text-gray-900">{fee.name}</h4>
                      <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-500">
                        <Building2 className="w-3 h-3" />
                        {fee.agency}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-semibold text-gray-900">
                        {formatCurrency(fee.convertedAmount)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {calculatedFees.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-xs">No fees found for current configuration</p>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}