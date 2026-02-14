// 💰 VAT REGISTRATION SERVICE — Post-incorporation service
// ARCHITECTURE: UI layer. NBR VAT registration for businesses.

import React, { useState } from 'react';
import { CheckCircle, FileText, DollarSign, Building2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { glassCard } from '@/app/config/designSystem';
import { toast } from 'sonner';

interface VATRegistrationProps {
  companyName?: string;
  bbid: string;
  tin?: string;
  investorId: string;
  onComplete?: () => void;
}

export function VATRegistration({ companyName = 'Your Company', bbid, tin = 'TIN-' + Math.floor(Math.random() * 10000000), investorId, onComplete }: VATRegistrationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [annualTurnover, setAnnualTurnover] = useState<number>(5000000);
  const [businessType, setBusinessType] = useState<string>('manufacturing');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate NBR VAT registration API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    toast.success('✅ VAT Registration submitted to NBR!', {
      description: 'VAT certificate will be issued within 1 business day. BIN number: 000' + Math.floor(Math.random() * 9999999)
    });
    
    setIsSubmitting(false);
    if (onComplete) onComplete();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${glassCard['p-6']} bg-gradient-to-r from-green-50 to-emerald-50`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">VAT Registration</h2>
            <p className="text-gray-600">National Board of Revenue (NBR)</p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className={`${glassCard['p-6']}`}>
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg mb-4">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <strong>VAT Registration is required for:</strong> Businesses with annual turnover exceeding BDT 30 lakh (BDT 3 million).
            Exporters and certain service providers may register voluntarily for VAT refunds.
          </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">TIN Number</label>
            <input
              type="text"
              value={tin}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="manufacturing">Manufacturing</option>
              <option value="trading">Trading</option>
              <option value="services">Services</option>
              <option value="export">Export-Oriented</option>
            </select>
          </div>
        </div>

        {/* Annual Turnover */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Projected Annual Turnover (BDT)
          </label>
          <input
            type="number"
            value={annualTurnover}
            onChange={(e) => setAnnualTurnover(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <div className="mt-2 text-sm">
            {annualTurnover >= 3000000 ? (
              <span className="text-green-600 font-medium">✓ VAT registration required (turnover ≥ BDT 30 lakh)</span>
            ) : (
              <span className="text-yellow-600 font-medium">⚠ Below BDT 30 lakh threshold. Voluntary registration available.</span>
            )}
          </div>
        </div>

        {/* Documents Checklist */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">Required Documents (Auto-attached from BBID):</h3>
          <div className="space-y-2">
            {[
              'Trade License (already submitted)',
              'TIN Certificate (already submitted)',
              'Company Incorporation Certificate (RJSC)',
              'Bank Account Statement',
              'Authorized signatory list'
            ].map((doc, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Details */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">1 Day</div>
            <div className="text-xs text-gray-600">Processing Time</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">FREE</div>
            <div className="text-xs text-gray-600">Government Fee</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">NBR</div>
            <div className="text-xs text-gray-600">Issuing Agency</div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            Submitting to NBR...
          </span>
        ) : (
          'Submit VAT Registration'
        )}
      </button>
    </div>
  );
}