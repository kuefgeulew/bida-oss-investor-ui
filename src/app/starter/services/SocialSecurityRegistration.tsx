// 🛡️ SOCIAL SECURITY REGISTRATION — Post-incorporation service
// ARCHITECTURE: UI layer. Ministry of Labour social security compliance.

import React, { useState } from 'react';
import { CheckCircle, Heart, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { glassCard } from '@/app/config/designSystem';
import { toast } from 'sonner';

interface SocialSecurityRegistrationProps {
  companyName?: string;
  bbid: string;
  investorId: string;
  onComplete?: () => void;
}

export function SocialSecurityRegistration({ companyName = 'Your Company', bbid, investorId, onComplete }: SocialSecurityRegistrationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employeeCount, setEmployeeCount] = useState<number>(50);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    toast.success('✅ Social Security Registration submitted!', {
      description: 'Ministry of Labour will issue registration within 1 business day.',
      duration: 5000
    });
    
    setIsSubmitting(false);
    if (onComplete) onComplete();
  };

  return (
    <div className="space-y-6">
      <div className={`${glassCard['p-6']} bg-gradient-to-r from-pink-50 to-rose-50`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Social Security Registration</h2>
            <p className="text-gray-600">Ministry of Labour & Employment</p>
          </div>
        </div>
      </div>

      <div className={`${glassCard['p-6']}`}>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="text-sm text-blue-800">
            <strong>Social Security provides:</strong> Worker welfare programs including maternity benefits, 
            injury compensation, medical allowances, and retirement benefits under Labour Act 2006.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input type="text" value={companyName} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">BBID</label>
            <input type="text" value={bbid} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
          <input
            type="number"
            value={employeeCount}
            onChange={(e) => setEmployeeCount(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">Coverage Includes:</h3>
          <div className="space-y-2">
            {[
              'Maternity benefits (16 weeks paid leave)',
              'Work injury compensation',
              'Medical benefits and healthcare',
              'Old age pension schemes',
              'Death and disability benefits',
              'Festival allowances'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-pink-50 rounded-lg">
            <div className="text-2xl font-bold text-pink-600">1 Day</div>
            <div className="text-xs text-gray-600">Processing</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">FREE</div>
            <div className="text-xs text-gray-600">Fee</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">MoL</div>
            <div className="text-xs text-gray-600">Agency</div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            Submitting...
          </span>
        ) : (
          'Submit Social Security Registration'
        )}
      </button>
    </div>
  );
}