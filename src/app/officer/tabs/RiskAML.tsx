// Risk & AML Tab - AML Panel, Risk Score, Due Diligence Checklist
import { Card, SectionContainer, IconWrap, Typography } from '@/app/components/ui-primitives';
import { AlertTriangle, Shield, CheckCircle, Search } from 'lucide-react';
import { OfficerRiskPanel } from '@/app/components/OfficerRiskPanel';

export function RiskAML() {
  const mockApplication = {
    id: 'APP-2026-001',
    companyName: 'Global Textiles Ltd',
    sector: 'Textile & Garment',
    country: 'United States',
    investmentAmount: 5000000,
    status: 'under_review',
    riskScore: 25,
    uboComplete: true,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionContainer>
        <div className="flex items-center gap-4 mb-4">
          <IconWrap>
            <AlertTriangle className="w-6 h-6" />
          </IconWrap>
          <div>
            <h2 className={Typography.sectionTitle}>Risk & AML Monitoring</h2>
            <p className={Typography.body}>Compliance & Security Screening</p>
          </div>
        </div>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <Shield className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">AML Panel</p>
            <p className={Typography.muted}>Money laundering checks</p>
          </Card>
          <Card>
            <AlertTriangle className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Risk Score</p>
            <p className={Typography.muted}>Multi-factor assessment</p>
          </Card>
          <Card>
            <CheckCircle className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Due Diligence</p>
            <p className={Typography.muted}>Verification checklist</p>
          </Card>
        </div>
      </SectionContainer>

      {/* Risk Panel */}
      <OfficerRiskPanel application={mockApplication} />
    </div>
  );
}