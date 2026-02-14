// 🌱 ENVIRONMENTAL CLEARANCE APPLICATION — Post-incorporation service
// ARCHITECTURE: UI layer. DoE environmental compliance certificate.

import React, { useState } from 'react';
import { CheckCircle, Leaf, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { glassCard } from '@/app/config/designSystem';
import { toast } from 'sonner';

interface EnvironmentalClearanceProps {
  companyName?: string;
  bbid: string;
  investorId: string;
  onComplete?: () => void;
}

export function EnvironmentalClearance({ companyName = 'Your Company', bbid, investorId, onComplete }: EnvironmentalClearanceProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectCategory, setProjectCategory] = useState<'green' | 'orange-a' | 'orange-b' | 'red'>('orange-a');
  const [wasteManagementPlan, setWasteManagementPlan] = useState<boolean>(true);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    toast.success('✅ Environmental Clearance Application submitted to DoE!', {
      description: 'Site assessment scheduled. Certificate issued after compliance verification (7-30 days based on category).',
      duration: 5000
    });
    
    setIsSubmitting(false);
    if (onComplete) onComplete();
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'green':
        return { color: 'green', days: '7-14', description: 'Low environmental impact' };
      case 'orange-a':
        return { color: 'orange', days: '14-21', description: 'Moderate impact, requires monitoring' };
      case 'orange-b':
        return { color: 'orange', days: '21-30', description: 'Moderate-high impact, detailed assessment' };
      case 'red':
        return { color: 'red', days: '30-60', description: 'High impact, comprehensive EIA required' };
      default:
        return { color: 'gray', days: 'TBD', description: 'Category not specified' };
    }
  };

  const categoryInfo = getCategoryInfo(projectCategory);

  return (
    <div className="space-y-6">
      <div className={`${glassCard['p-6']} bg-gradient-to-r from-green-50 to-teal-50`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Environmental Clearance Application</h2>
            <p className="text-gray-600">Department of Environment (DoE)</p>
          </div>
        </div>
      </div>

      <div className={`${glassCard['p-6']}`}>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="text-sm text-green-800">
            <strong>Environmental Clearance is required for:</strong> All manufacturing, processing, and construction projects 
            to ensure compliance with Environmental Conservation Act 1995. Category determines assessment depth.
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Environmental Category</label>
          <select
            value={projectCategory}
            onChange={(e) => setProjectCategory(e.target.value as any)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="green">Green (Low Impact) - IT, services, light assembly</option>
            <option value="orange-a">Orange-A (Moderate) - Food processing, textiles (small)</option>
            <option value="orange-b">Orange-B (Moderate-High) - Chemicals, textiles (large), metal</option>
            <option value="red">Red (High Impact) - Heavy industry, refineries, tanneries</option>
          </select>
          <div className={`mt-2 text-sm font-medium text-${categoryInfo.color}-600`}>
            {categoryInfo.description} • Processing: {categoryInfo.days} days
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={wasteManagementPlan}
              onChange={(e) => setWasteManagementPlan(e.target.checked)}
              className="w-5 h-5 text-green-600"
            />
            <div>
              <div className="font-medium">Waste Management Plan Prepared</div>
              <div className="text-sm text-gray-600">Detailed plan for waste treatment, disposal, and environmental protection</div>
            </div>
          </label>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">Application Includes:</h3>
          <div className="space-y-2">
            {[
              'Project description and location map',
              'Environmental impact assessment (EIA) report',
              'Waste management and treatment plan',
              'Effluent treatment system (ETP) details',
              'Air quality control measures',
              'Noise and vibration mitigation plan',
              'Emergency response procedures'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {projectCategory === 'red' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-800">
              <strong>Red Category projects require:</strong> Comprehensive Environmental Impact Assessment (EIA), 
              public hearing, and detailed monitoring plan. Additional documentation may be requested.
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">Compliance Requirements:</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div>✓ Effluent Treatment Plant (ETP) mandatory for manufacturing</div>
            <div>✓ Regular monitoring reports (monthly/quarterly)</div>
            <div>✓ Annual environmental audit</div>
            <div>✓ Compliance with DoE emission standards</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">1 Day</div>
            <div className="text-xs text-gray-600">Submission</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">$500</div>
            <div className="text-xs text-gray-600">Fee</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">DoE</div>
            <div className="text-xs text-gray-600">Agency</div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !wasteManagementPlan}
        className="w-full py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
        ) : !wasteManagementPlan ? (
          'Waste Management Plan Required'
        ) : (
          'Submit Environmental Clearance Application'
        )}
      </button>
    </div>
  );
}