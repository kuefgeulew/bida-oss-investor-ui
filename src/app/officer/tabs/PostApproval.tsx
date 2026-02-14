// Post-Approval Tab - Implementation Tracker, Success Metrics
import { useState } from 'react';
import { Card, SectionContainer, IconWrap, Typography, PrimaryButton, SecondaryButton } from '@/app/components/ui-primitives';
import { Badge } from '@/app/components/ui/badge';
import { CheckCircle, TrendingUp, MapPin, Users, DollarSign, Calendar } from 'lucide-react';
import { getPostApprovalData } from '@/app/officer-core/officerDataEngine';

export function PostApproval() {
  // Get post-approval data from engine
  const approvedInvestments = getPostApprovalData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'On Track':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Delayed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getMilestoneColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in-progress':
        return 'text-blue-600';
      case 'pending':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionContainer>
        <div className="flex items-center gap-4 mb-4">
          <IconWrap>
            <CheckCircle className="w-6 h-6" />
          </IconWrap>
          <div>
            <h2 className={Typography.sectionTitle}>Post-Approval Tracking</h2>
            <p className={Typography.body}>Implementation Monitoring & Success Metrics</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <p className={Typography.muted}>Total Approved</p>
            <p className="text-2xl font-bold text-gray-900">{approvedInvestments.length}</p>
          </Card>
          <Card>
            <p className={Typography.muted}>On Track</p>
            <p className="text-2xl font-bold text-gray-900">
              {approvedInvestments.filter((i) => i.implementationStatus === 'On Track').length}
            </p>
          </Card>
          <Card>
            <p className={Typography.muted}>Completed</p>
            <p className="text-2xl font-bold text-gray-900">
              {approvedInvestments.filter((i) => i.implementationStatus === 'Completed').length}
            </p>
          </Card>
          <Card>
            <p className={Typography.muted}>Delayed</p>
            <p className="text-2xl font-bold text-gray-900">
              {approvedInvestments.filter((i) => i.implementationStatus === 'Delayed').length}
            </p>
          </Card>
        </div>
      </SectionContainer>

      {/* Approved Investments List */}
      <div className="space-y-4">
        {approvedInvestments.map((investment) => (
          <Card key={investment.id}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className={Typography.cardTitle}>{investment.companyName}</h3>
                <p className={Typography.body}>
                  {investment.sector} • Approved: {investment.approvalDate}
                </p>
              </div>
              <Badge className={`${getStatusColor(investment.implementationStatus)} border`}>
                {investment.implementationStatus}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-900">Implementation Progress</p>
                <p className="text-sm font-bold text-gray-900">{investment.completion}%</p>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-900 transition-all"
                  style={{ width: `${investment.completion}%` }}
                ></div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-gray-700" />
                  <p className={Typography.muted}>Jobs Created</p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {investment.metrics.jobsCreated} / {investment.metrics.targetJobs}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-gray-700" />
                  <p className={Typography.muted}>Investment Disbursed</p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  ${(investment.metrics.investmentDisbursed / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-gray-700" />
                  <p className={Typography.muted}>Total Investment</p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  ${(investment.metrics.totalInvestment / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-gray-700" />
                  <p className={Typography.muted}>Disbursement Rate</p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {Math.round(
                    (investment.metrics.investmentDisbursed / investment.metrics.totalInvestment) * 100
                  )}
                  %
                </p>
              </div>
            </div>

            {/* Milestones */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">Implementation Milestones</p>
              <div className="space-y-2">
                {investment.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className={`w-5 h-5 ${getMilestoneColor(milestone.status)}`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${getMilestoneColor(milestone.status)}`}>
                        {milestone.task}
                      </p>
                      <p className={Typography.muted}>{milestone.date}</p>
                    </div>
                    <Badge
                      className={`text-xs ${
                        milestone.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : milestone.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {milestone.status.replace('-', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <PrimaryButton>
                View Full Report
              </PrimaryButton>
              <SecondaryButton>
                Request Update
              </SecondaryButton>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}