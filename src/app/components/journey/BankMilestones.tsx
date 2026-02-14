/**
 * 🏦 BANK MILESTONES
 * Shows banking milestones aligned with government approvals
 */

import React from 'react';
import { Building2, Shield, CreditCard, TrendingUp, CheckCircle, Clock } from 'lucide-react';

interface BankMilestone {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'in-progress' | 'pending';
  linkedApproval?: string;
}

export function BankMilestones() {
  const milestones: BankMilestone[] = [
    {
      id: 'corporate-account',
      title: 'Corporate Bank Account Opened',
      description: 'FDI-grade corporate account with KYC completed',
      icon: <Building2 className="w-5 h-5" />,
      status: 'completed',
      linkedApproval: 'Company Registration'
    },
    {
      id: 'escrow',
      title: 'Investment Escrow Created',
      description: 'Secure holding for investment funds',
      icon: <Shield className="w-5 h-5" />,
      status: 'in-progress',
      linkedApproval: 'BIDA Registration'
    },
    {
      id: 'letter-of-credit',
      title: 'Letter of Credit Issued',
      description: 'LC for machinery import',
      icon: <CreditCard className="w-5 h-5" />,
      status: 'pending',
      linkedApproval: 'Environmental Clearance'
    },
    {
      id: 'investment-loan',
      title: 'Investment Loan Pre-approved',
      description: 'Financing secured for operations',
      icon: <TrendingUp className="w-5 h-5" />,
      status: 'pending',
      linkedApproval: 'Factory License'
    }
  ];

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-teal-200/50 rounded-2xl p-8 shadow-lg">
      <h2 className="text-xl font-semibold mb-2 text-teal-900">
        🏦 Banking Milestones Aligned with Approvals
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Your banking journey progresses alongside government approvals
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {milestones.map((milestone) => (
          <div 
            key={milestone.id}
            className="bg-white/80 border border-gray-200/50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2 rounded-lg ${
                milestone.status === 'completed' ? 'bg-green-100 text-green-700' :
                milestone.status === 'in-progress' ? 'bg-amber-100 text-amber-700' :
                'bg-gray-100 text-gray-500'
              }`}>
                {milestone.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                  {milestone.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                  {milestone.status === 'in-progress' && (
                    <Clock className="w-4 h-4 text-amber-600" />
                  )}
                </div>
                
                <p className="text-sm text-gray-600">{milestone.description}</p>
                
                {milestone.linkedApproval && (
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="font-medium">Linked to:</span> {milestone.linkedApproval}
                  </div>
                )}
              </div>
            </div>
            
            {/* Status badge */}
            <div className="mt-3 pt-3 border-t border-gray-200/50">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                milestone.status === 'completed' ? 'bg-green-100 text-green-700' :
                milestone.status === 'in-progress' ? 'bg-amber-100 text-amber-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {milestone.status === 'completed' && '✓ Completed'}
                {milestone.status === 'in-progress' && '⏳ In Progress'}
                {milestone.status === 'pending' && '⏸ Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
