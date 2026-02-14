import { motion } from 'motion/react';
import { DollarSign, Shield, TrendingUp, PieChart } from 'lucide-react';
import { InstrumentCard } from './ui-primitives';

/**
 * TAB 6 - PAYMENTS: Build Trust, Not Payment
 */

export function GovernmentFeeBreakdown() {
  const fees = [
    {
      agency: 'RJSC (Registrar of Joint Stock Companies)',
      items: [
        { name: 'Company registration fee', amount: 5000 },
        { name: 'Name clearance fee', amount: 500 },
        { name: 'Stamp duty', amount: 2000 }
      ],
      total: 7500,
      color: 'blue'
    },
    {
      agency: 'DOE (Department of Environment)',
      items: [
        { name: 'EIA application fee', amount: 50000 },
        { name: 'Site inspection fee', amount: 10000 },
        { name: 'Clearance certificate fee', amount: 15000 }
      ],
      total: 75000,
      color: 'green'
    },
    {
      agency: 'Fire Service and Civil Defence',
      items: [
        { name: 'Fire safety inspection', amount: 8000 },
        { name: 'Certificate issuance', amount: 3000 }
      ],
      total: 11000,
      color: 'red'
    },
    {
      agency: 'DIFE (Factory Inspection)',
      items: [
        { name: 'Factory license application', amount: 20000 },
        { name: 'Annual inspection fee', amount: 5000 }
      ],
      total: 25000,
      color: 'purple'
    }
  ];

  const grandTotal = fees.reduce((sum, fee) => sum + fee.total, 0);

  return (
    <div className="w-full min-w-0 space-y-8">
      {/* SINGLE CONTAINER - Government Fee Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold">Government Fee Breakdown</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          100% transparency: See exactly where every taka goes
        </p>
        
        {/* BORDERLESS INNER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {fees.map((fee, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-gray-50 rounded-lg w-full min-w-0"
            >
              <h4 className="font-semibold text-gray-900 mb-4 text-base whitespace-normal break-words">
                {fee.agency}
              </h4>
              <div className="space-y-2 mb-4">
                {fee.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-start gap-4">
                    <span className="text-sm text-gray-600 leading-relaxed break-words whitespace-normal flex-1">
                      {item.name}
                    </span>
                    <span className="font-medium text-sm flex-shrink-0">
                      ৳{item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className={`text-xl font-bold text-${fee.color}-600`}>
                    ৳{fee.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* GRAND TOTAL - SINGLE CONTAINER */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-sm p-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90 mb-2">Grand Total (All Government Fees)</p>
            <p className="text-4xl font-bold">৳{grandTotal.toLocaleString()}</p>
          </div>
          <DollarSign className="w-16 h-16 opacity-50" />
        </div>
      </div>
    </div>
  );
}

export function NoUnofficialPaymentsBadge() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-green-900 mb-2">
            ✅ No Unofficial Payments Required
          </h3>
          <p className="text-gray-700 mb-4">
            BIDA OSS is a <strong>corruption-free zone</strong>. All fees are official, regulated, 
            and paid directly to government accounts through digital banking.
          </p>
        </div>
      </div>
      
      {/* BORDERLESS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-5 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-1">✓ Fixed Fees</h4>
          <p className="text-sm text-gray-600">
            All fees set by law. No negotiations, no "speed money"
          </p>
        </div>
        <div className="p-5 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-1">✓ Digital Receipts</h4>
          <p className="text-sm text-gray-600">
            Every payment generates a government-verified receipt
          </p>
        </div>
        <div className="p-5 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-1">✓ Traceable Transactions</h4>
          <p className="text-sm text-gray-600">
            All payments tracked in blockchain-style audit trail
          </p>
        </div>
        <div className="p-5 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-1">✓ Report Corruption</h4>
          <p className="text-sm text-gray-600">
            Hotline: 106 | Email: anticorruption@bida.gov.bd
          </p>
        </div>
      </div>
      
      {/* ALERT WITH LEFT ACCENT ONLY */}
      <div className="p-5 bg-green-50 border-l-4 border-green-600 rounded-md">
        <p className="text-sm font-semibold text-green-900">
          🛡️ BIDA Guarantee: If any official asks for unofficial payment, report immediately. 
          We will fast-track your application and take disciplinary action.
        </p>
      </div>
    </div>
  );
}

/**
 * SINGLE RENDER ONLY
 * DO NOT DUPLICATE OR MOUNT ANOTHER EXCHANGE RATE COMPONENT
 * This is the ONLY currency & exchange rate component in the system.
 * Vertical CurrencyConverter component has been removed to prevent duplication.
 */
export function CurrencyFluctuationNote() {
  const exchangeRates = {
    USD: 110.50,
    EUR: 120.30,
    GBP: 140.80,
    CNY: 15.40,
    JPY: 0.75,
    KRW: 0.085
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-bold">Currency & Exchange Rates</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-6">
        All fees are in BDT (Bangladeshi Taka). Foreign investors should note current exchange rates.
      </p>
      
      {/* HORIZONTAL CURRENCY GRID - RESPONSIVE LAYOUT */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {Object.entries(exchangeRates).map(([currency, rate]) => (
          <div key={currency} className="p-3 bg-gray-50 rounded-lg text-center">
            <div className="text-xs text-gray-600 mb-1 font-medium">{currency}</div>
            <div className="text-sm font-bold text-orange-600">৳{rate}</div>
            <div className="text-xs text-gray-500 mt-1">= 1 {currency}</div>
          </div>
        ))}
      </div>
      
      {/* ALERT WITH LEFT ACCENT */}
      <div className="p-5 bg-orange-50 border-l-4 border-orange-500 rounded-md mb-4">
        <h4 className="font-semibold text-orange-900 mb-2">⚠️ Currency Fluctuation Advisory</h4>
        <ul className="space-y-1 text-sm text-orange-800">
          <li>• Exchange rates updated daily at 10:00 AM Bangladesh time</li>
          <li>• Rates shown are indicative; final rate applied at payment time</li>
          <li>• Payment can be made from foreign currency accounts (auto-converted)</li>
          <li>• For amounts over $100,000, consider hedging currency risk</li>
          <li>• Bangladesh Bank allows 100% profit repatriation at market rates</li>
        </ul>
      </div>
      
      {/* PRO TIP WITH LEFT ACCENT */}
      <div className="p-5 bg-emerald-50 border-l-4 border-emerald-500 rounded-md flex items-center gap-3">
        <div className="text-2xl">💡</div>
        <p className="text-sm text-emerald-800">
          <strong>Pro Tip:</strong> Open a BDT account early to avoid daily exchange rate volatility 
          when paying government fees.
        </p>
      </div>
    </div>
  );
}

// Main container component
export function EnhancedPayments() {
  return (
    <div className="space-y-6">
      <GovernmentFeeBreakdown />
      <NoUnofficialPaymentsBadge />
      <CurrencyFluctuationNote />
    </div>
  );
}