// 👥 EMPLOYEE PROVIDENT FUND REGISTRATION — Post-incorporation service
// ARCHITECTURE: UI layer. EPFB registration for employee benefits.

import React, { useState } from 'react';
import { CheckCircle, Users, Shield, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import { glassCard } from '@/app/config/designSystem';
import { toast } from 'sonner';

interface EPFRegistrationProps {
  companyName?: string;
  bbid: string;
  investorId: string;
  onComplete?: () => void;
}

export function EPFRegistration({ companyName = 'Your Company', bbid, investorId, onComplete }: EPFRegistrationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employeeCount, setEmployeeCount] = useState<number>(50);
  const [averageSalary, setAverageSalary] = useState<number>(25000);

  const monthlyContribution = employeeCount * averageSalary * 0.10; // 10% of salary (5% employer + 5% employee)

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    toast.success('✅ EPF Registration submitted to EPFB!', {
      description: `Registration number will be issued within 1 business day. Est. monthly contribution: BDT ${monthlyContribution.toLocaleString()}`,
      duration: 5000
    });
    
    setIsSubmitting(false);
    if (onComplete) onComplete();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${glassCard['p-6']} bg-gradient-to-r from-purple-50 to-indigo-50`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Employee Provident Fund Registration</h2>
            <p className="text-gray-600">Employees Provident Fund Board (EPFB)</p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className={`${glassCard['p-6']}`}>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <strong>EPF is mandatory for:</strong> Companies with 20 or more employees. 
              Employers contribute 5% and employees contribute 5% of basic salary + dearness allowance.
              Provides retirement benefits and financial security for workers.
            </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">BBID</label>
            <input
              type="text"
              value={bbid}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-900"
            />
          </div>
        </div>

        {/* Employee Details */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Employees
          </label>
          <input
            type="number"
            value={employeeCount}
            onChange={(e) => setEmployeeCount(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <div className="mt-2 text-sm">
            {employeeCount >= 20 ? (
              <span className="text-green-600 font-medium">✓ EPF registration required (≥20 employees)</span>
            ) : (
              <span className="text-yellow-600 font-medium">⚠ Below 20 employees. Voluntary registration available.</span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Monthly Salary (BDT)
          </label>
          <input
            type="number"
            value={averageSalary}
            onChange={(e) => setAverageSalary(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Contribution Calculator */}
        <div className="bg-purple-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-purple-600" />
            Monthly Contribution Estimate:
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-600">Employer (5%)</div>
              <div className="text-lg font-bold text-purple-600">
                BDT {(monthlyContribution / 2).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Employee (5%)</div>
              <div className="text-lg font-bold text-purple-600">
                BDT {(monthlyContribution / 2).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Total (10%)</div>
              <div className="text-lg font-bold text-purple-600">
                BDT {monthlyContribution.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">EPF Benefits for Employees:</h3>
          <div className="space-y-2">
            {[
              'Retirement savings with guaranteed returns',
              'Employer matching contributions (5%)',
              'Tax benefits under Income Tax Act',
              'Loan facilities against EPF balance',
              'Withdrawal for housing, education, medical emergencies',
              'Nominee benefits in case of death'
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">Required Documents (Auto-attached):</h3>
          <div className="space-y-2">
            {[
              'Trade License',
              'Company Incorporation Certificate',
              'TIN Certificate',
              'List of employees with details',
              'Salary structure document'
            ].map((doc, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Details */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">1 Day</div>
            <div className="text-xs text-gray-600">Processing Time</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">FREE</div>
            <div className="text-xs text-gray-600">Registration Fee</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">EPFB</div>
            <div className="text-xs text-gray-600">Issuing Agency</div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            Submitting to EPFB...
          </span>
        ) : (
          'Submit EPF Registration'
        )}
      </button>
    </div>
  );
}