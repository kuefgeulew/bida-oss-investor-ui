// 🚢 IRC/ERC REGISTRATION SERVICE — Import-Export Registration Certificate
// ARCHITECTURE: UI layer. CCI&E registration for international trade.

import React, { useState } from 'react';
import { CheckCircle, Ship, Globe, Package } from 'lucide-react';
import { motion } from 'motion/react';
import { glassCard } from '@/app/config/designSystem';
import { toast } from 'sonner';

interface IRCERCRegistrationProps {
  companyName?: string;
  bbid: string;
  investorId: string;
  onComplete?: () => void;
}

export function IRCERCRegistration({ companyName = 'Your Company', bbid, investorId, onComplete }: IRCERCRegistrationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationType, setRegistrationType] = useState<'both' | 'irc' | 'erc'>('both');
  const [productCategory, setProductCategory] = useState<string>('general');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate CCI&E API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const certificates = registrationType === 'both' ? 'IRC & ERC' : 
                        registrationType === 'irc' ? 'IRC' : 'ERC';
    
    toast.success(`✅ ${certificates} submitted to Chief Controller!`, {
      description: 'Certificate(s) will be issued within 1 business day.',
      duration: 5000
    });
    
    setIsSubmitting(false);
    if (onComplete) onComplete();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${glassCard['p-6']} bg-gradient-to-r from-blue-50 to-cyan-50`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
            <Ship className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Import-Export Registration</h2>
            <p className="text-gray-600">Chief Controller of Imports & Exports (CCI&E)</p>
          </div>
        </div>
      </div>

      {/* Certificate Type Selection */}
      <div className={`${glassCard['p-6']}`}>
        <h3 className="font-semibold mb-4">Select Certificate Type:</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setRegistrationType('both')}
            className={`p-4 rounded-xl border-2 transition-all ${
              registrationType === 'both'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <Globe className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="font-bold">Both (Recommended)</div>
            <div className="text-xs text-gray-600">IRC + ERC</div>
            <div className="text-sm font-semibold text-green-600 mt-2">$350</div>
          </button>

          <button
            onClick={() => setRegistrationType('irc')}
            className={`p-4 rounded-xl border-2 transition-all ${
              registrationType === 'irc'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <Package className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="font-bold">IRC Only</div>
            <div className="text-xs text-gray-600">Import Registration</div>
            <div className="text-sm font-semibold text-green-600 mt-2">$200</div>
          </button>

          <button
            onClick={() => setRegistrationType('erc')}
            className={`p-4 rounded-xl border-2 transition-all ${
              registrationType === 'erc'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <Ship className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="font-bold">ERC Only</div>
            <div className="text-xs text-gray-600">Export Registration</div>
            <div className="text-sm font-semibold text-green-600 mt-2">$200</div>
          </button>
        </div>

        {/* Pre-filled Data */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={companyName}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">BBID</label>
            <input
              type="text"
              value={bbid}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-900"
            />
          </div>
        </div>

        {/* Product Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Product Category
          </label>
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="general">General Merchandise</option>
            <option value="textiles">Textiles & Garments</option>
            <option value="electronics">Electronics</option>
            <option value="pharmaceuticals">Pharmaceuticals</option>
            <option value="food">Food & Agricultural Products</option>
            <option value="machinery">Machinery & Equipment</option>
          </select>
        </div>

        {/* What's Included */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">What's Included:</h3>
          <div className="space-y-2">
            {registrationType === 'both' && (
              <>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    <strong>IRC:</strong> Import capital machinery, raw materials, and equipment duty-free or at reduced rates
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    <strong>ERC:</strong> Export products internationally, access export incentives and cash subsidies
                  </span>
                </div>
              </>
            )}
            {registrationType === 'irc' && (
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Import raw materials, machinery, and equipment with customs clearance
                </span>
              </div>
            )}
            {registrationType === 'erc' && (
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Export goods internationally, access export subsidies (4-20% of FOB value)
                </span>
              </div>
            )}
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm">Eligible for bonded warehouse licenses</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm">Valid for 3 years (renewable)</span>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">1 Day</div>
            <div className="text-xs text-gray-600">Processing Time</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              ${registrationType === 'both' ? '350' : '200'}
            </div>
            <div className="text-xs text-gray-600">Total Fee</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">3 Yrs</div>
            <div className="text-xs text-gray-600">Validity</div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            Submitting to CCI&E...
          </span>
        ) : (
          `Submit ${registrationType === 'both' ? 'IRC & ERC' : registrationType.toUpperCase()} Application`
        )}
      </button>
    </div>
  );
}