// FX Conversion & Repatriation Service - Critical FDI Feature
import { useState } from 'react';
import { ArrowRightLeft, DollarSign, TrendingUp, Building2, Check, AlertCircle } from 'lucide-react';
import { BankBadge } from './BankBadge';
import { InstrumentCard } from '@/app/components/ui-primitives';

interface FXConversionServiceProps {
  investorId: string;
}

export function FXConversionService({ investorId }: FXConversionServiceProps) {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('BDT');
  const [toCurrency, setToCurrency] = useState('USD');
  const [converted, setConverted] = useState(false);

  // Mock FX rates
  const rates: Record<string, Record<string, number>> = {
    USD: { BDT: 110.5, EUR: 0.92, GBP: 0.79, SGD: 1.35 },
    BDT: { USD: 0.00905, EUR: 0.0083, GBP: 0.0071, SGD: 0.0122 },
    EUR: { USD: 1.09, BDT: 120.5, GBP: 0.86, SGD: 1.47 },
    GBP: { USD: 1.27, BDT: 140.2, EUR: 1.16, SGD: 1.71 },
    SGD: { USD: 0.74, BDT: 81.9, EUR: 0.68, GBP: 0.58 }
  };

  const getRate = (from: string, to: string) => {
    if (from === to) return 1;
    return rates[from]?.[to] || 1;
  };

  const handleConvert = () => {
    setConverted(true);
    setTimeout(() => setConverted(false), 3000);
  };

  const convertedAmount = amount ? (parseFloat(amount) * getRate(fromCurrency, toCurrency)).toFixed(2) : '0.00';
  const rate = getRate(fromCurrency, toCurrency);

  return (
    <InstrumentCard>
      <div className="p-8 bg-gradient-to-br from-[#eef4ff] to-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#3b82f6] flex items-center justify-center">
              <ArrowRightLeft className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0f172a]">FX Conversion & Repatriation</h3>
              <BankBadge size="sm" className="mt-1" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#64748b] mb-1">Live FX Rate</p>
            <p className="text-lg font-semibold text-[#3b82f6]">
              1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
            </p>
          </div>
        </div>

        {/* FX Conversion Form */}
        <div className="bg-white p-6 rounded-xl border border-[#e3ebf7] mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* From Currency */}
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-2">From</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 px-4 py-3 border border-[#e3ebf7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                />
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="px-4 py-3 border border-[#e3ebf7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                >
                  <option value="USD">USD</option>
                  <option value="BDT">BDT</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="SGD">SGD</option>
                </select>
              </div>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-2">To</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={convertedAmount}
                  readOnly
                  placeholder="0.00"
                  className="flex-1 px-4 py-3 border border-[#e3ebf7] rounded-xl bg-[#f8fafc] text-[#0f172a] font-semibold"
                />
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="px-4 py-3 border border-[#e3ebf7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                >
                  <option value="USD">USD</option>
                  <option value="BDT">BDT</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="SGD">SGD</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full px-6 py-3 bg-[#3b82f6] text-white rounded-xl hover:bg-[#2563eb] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
          >
            {converted ? (
              <>
                <Check className="w-5 h-5" />
                Conversion Complete
              </>
            ) : (
              <>
                <ArrowRightLeft className="w-5 h-5" />
                Convert Currency
              </>
            )}
          </button>
        </div>

        {/* Repatriation Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-[#10b981] mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#0f172a] mb-1">100% Profit Repatriation</h4>
                <p className="text-sm text-[#475569]">
                  Bangladesh allows full repatriation of capital, profits, and dividends. No restrictions on FDI outflows.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#eff6ff] border border-[#dbeafe]">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-[#3b82f6] mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#0f172a] mb-1">Bank-Government Integration</h4>
                <p className="text-sm text-[#475569]">
                  Your bank coordinates directly with Bangladesh Bank for swift FX approvals and repatriation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="mt-6 p-4 rounded-xl bg-[#fffbeb] border border-[#fef3c7]">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#f59e0b] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-[#0f172a] text-sm mb-1">Repatriation Requirements</h4>
              <ul className="text-xs text-[#475569] space-y-1">
                <li>• Audited financial statements</li>
                <li>• Tax clearance certificate</li>
                <li>• Board resolution for dividend distribution</li>
                <li>• Bangladesh Bank approval (automatic for FDI)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </InstrumentCard>
  );
}