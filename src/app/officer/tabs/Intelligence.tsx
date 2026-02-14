// Intelligence Tab - Complexity Score, Delay Analyzer, Similar Cases, Approval Prediction, Confidence Meter
import { useState } from 'react';
import { Card, SectionContainer, IconWrap, Typography } from '@/app/components/ui-primitives';
import { Brain, TrendingUp, Clock, Target, Zap } from 'lucide-react';
import { OfficerIntelligencePanel } from '@/app/components/OfficerIntelligencePanel';

export function Intelligence() {
  // Sample application data
  const mockApplication = {
    id: 'APP-2026-001',
    investorName: 'John Smith',
    investorEmail: 'john.smith@example.com',
    companyName: 'Global Textiles Ltd',
    sector: 'Textile & Garment',
    country: 'United States',
    investmentAmount: 5000000,
    zone: 'BEPZA',
    status: 'under_review',
    submittedDate: '2026-01-15',
    slaDeadline: '2026-03-15',
    documents: [
      { name: 'Business Plan', status: 'approved' },
      { name: 'Fire Layout Plan', status: 'missing' },
      { name: 'Passport Copy', status: 'approved' },
      { name: 'Financial Statements', status: 'approved' }
    ],
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'pending',
      fire: 'not_required'
    },
    paymentReceived: true,
    uboComplete: true,
    riskScore: 25,
    currentStep: 'bida_initial_review',
    assignedOfficer: 'Ahmed Khan'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionContainer>
        <div className="flex items-center gap-4 mb-4">
          <IconWrap>
            <Brain className="w-6 h-6" />
          </IconWrap>
          <div>
            <h2 className={Typography.sectionTitle}>Intelligence Dashboard</h2>
            <p className={Typography.body}>AI-Powered Decision Support System</p>
          </div>
        </div>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <Card>
            <TrendingUp className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Complexity Score</p>
            <p className={Typography.muted}>Multi-factor analysis</p>
          </Card>
          <Card>
            <Clock className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Delay Root Cause</p>
            <p className={Typography.muted}>Party accountability</p>
          </Card>
          <Card>
            <Brain className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Similar Cases</p>
            <p className={Typography.muted}>Historical matching</p>
          </Card>
          <Card>
            <Target className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Approval Prediction</p>
            <p className={Typography.muted}>What happens next</p>
          </Card>
          <Card>
            <Zap className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Confidence Meter</p>
            <p className={Typography.muted}>Decision certainty</p>
          </Card>
        </div>
      </SectionContainer>

      {/* Intelligence Panel */}
      <OfficerIntelligencePanel application={mockApplication} />
    </div>
  );
}