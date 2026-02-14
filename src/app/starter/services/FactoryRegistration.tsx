// 🏭 FACTORY REGISTRATION — Initial filing for manufacturing operations
// ARCHITECTURE: UI layer. DIFE factory license application.

import React, { useState } from 'react';
import { CheckCircle, Factory, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { glassCard } from '@/app/config/designSystem';
import { toast } from 'sonner';

interface FactoryRegistrationProps {
  companyName?: string;
  bbid: string;
  investorId: string;
  onComplete?: () => void;
}

export function FactoryRegistration({ companyName = 'Your Company', bbid, investorId, onComplete }: FactoryRegistrationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [factoryType, setFactoryType] = useState<string>('light-manufacturing');
  const [factorySize, setFactorySize] = useState<number>(5000);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    toast.success('✅ Factory Registration submitted to DIFE!', {
      description: 'Initial filing completed. Full license issuance after site inspection (7-14 days).',
      duration: 5000
    });
    
    setIsSubmitting(false);
    if (onComplete) onComplete();
  };

  return (
    <div className="space-y-6">
      <div className={`${glassCard['p-6']} bg-gradient-to-r from-orange-50 to-amber-50`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center">
            <Factory className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Factory Registration (Initial Filing)</h2>
            <p className="text-gray-600">Dept. of Inspection for Factories & Establishments (DIFE)</p>
          </div>
        </div>
      </div>

      <div className={`${glassCard['p-6']}`}>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="text-sm text-amber-800">
            <strong>Required for:</strong> All manufacturing facilities. This initial filing starts the registration process. 
            Full license issued after site inspection and safety compliance verification.
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Factory Type</label>
          <select
            value={factoryType}
            onChange={(e) => setFactoryType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="light-manufacturing">Light Manufacturing</option>
            <option value="heavy-manufacturing">Heavy Manufacturing</option>
            <option value="textiles">Textiles & Garments</option>
            <option value="pharmaceuticals">Pharmaceuticals</option>
            <option value="food-processing">Food Processing</option>
            <option value="electronics">Electronics Assembly</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Factory Size (sq ft)</label>
          <input
            type="number"
            value={factorySize}
            onChange={(e) => setFactorySize(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">Initial Filing Includes:</h3>
          <div className="space-y-2">
            {[
              'Factory location and layout plan submission',
              'Machinery and equipment inventory',
              'Fire safety preliminary assessment',
              'Occupational health & safety plan',
              'Schedule for site inspection',
              'Worker welfare facility details'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Next Steps After Filing:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>DIFE schedules site inspection (3-5 days)</li>
            <li>Inspector verifies safety compliance</li>
            <li>Any deficiencies must be corrected</li>
            <li>Final factory license issued (7-14 days total)</li>
          </ol>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">1 Day</div>
            <div className="text-xs text-gray-600">Filing</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">$400</div>
            <div className="text-xs text-gray-600">Fee</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">DIFE</div>
            <div className="text-xs text-gray-600">Agency</div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
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
          'Submit Factory Registration (Initial Filing)'
        )}
      </button>
    </div>
  );
}