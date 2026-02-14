/**
 * 🏛️ GOVERNMENT APPROVAL PIPELINE
 * Restructured with clear visual hierarchy - 3-row card layout per approval
 */

import React from 'react';
import { CheckCircle, Clock, FileText, Download, DollarSign, AlertCircle } from 'lucide-react';
import type { ApprovalStep, ApprovalPipeline } from '@/app/gov-agencies/agencyWorkflowEngine';
import { isServicePaid } from '@/app/payments/paymentEngine';
import { hasCertificate } from '@/app/certificates/certificateEngine';

interface GovernmentApprovalPipelineProps {
  pipeline: ApprovalPipeline;
  onDownloadCertificate?: (serviceId: string) => void;
}

export function GovernmentApprovalPipeline({ 
  pipeline, 
  onDownloadCertificate 
}: GovernmentApprovalPipelineProps) {
  
  const getStatusBadge = (step: ApprovalStep) => {
    switch (step.status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" />
            In Progress
          </span>
        );
      case 'awaiting-payment':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
            <DollarSign className="w-3 h-3" />
            Awaiting Payment
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            <AlertCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
            <FileText className="w-3 h-3" />
            Not Started
          </span>
        );
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-purple-200/50 rounded-2xl p-8 shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-purple-900">
          🏛️ Government Approval Pipeline
        </h2>
        <p className="text-sm text-gray-600">
          {pipeline.completedSteps} of {pipeline.totalSteps} approvals completed
        </p>
      </div>

      <div className="space-y-6">
        {pipeline.approvalSteps.map((step, index) => {
          const isPaid = isServicePaid(pipeline.investorId, step.serviceId);
          const hasDocument = hasCertificate(pipeline.investorId, step.serviceId);
          
          return (
            <div 
              key={step.serviceId}
              className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* ROW 1: Approval Name & Agency */}
              <div className="mb-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {index + 1}. {step.serviceName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {step.agencyName}
                    </p>
                  </div>
                  
                  {step.criticalPath && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                      Critical Path
                    </span>
                  )}
                </div>
              </div>

              {/* ROW 2: Metadata (SLA, Elapsed, Status) */}
              <div className="flex flex-wrap items-center gap-6 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">SLA:</span>
                  <span>{step.slaInDays} days</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span>•</span>
                  <span className="font-medium">Elapsed:</span>
                  <span className={step.daysElapsed > step.slaInDays ? 'text-red-600 font-medium' : ''}>
                    {step.daysElapsed}/{step.slaInDays} days
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span>•</span>
                  {getStatusBadge(step)}
                </div>
              </div>

              {/* ROW 3: Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-200/50">
                <div className="flex flex-wrap gap-3">
                  {/* Payment button */}
                  {!isPaid && step.status === 'awaiting-payment' && (
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                      <DollarSign className="w-4 h-4" />
                      Pay Fee (15,000 BDT)
                    </button>
                  )}
                  
                  {isPaid && step.status !== 'completed' && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Payment Complete
                    </span>
                  )}
                </div>

                {/* Download certificate */}
                {hasDocument && step.status === 'completed' && (
                  <button 
                    onClick={() => onDownloadCertificate?.(step.serviceId)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Certificate
                  </button>
                )}
              </div>

              {/* Prerequisites info */}
              {step.prerequisites.length > 0 && step.status === 'not-started' && (
                <div className="mt-3 pt-3 border-t border-gray-200/50">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Blocked by:</span> {step.prerequisites.join(', ')}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
