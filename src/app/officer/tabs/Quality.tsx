// Quality Tab - Peer Review, Precedent Database, Template Engine, Fairness Meter
import { Card, SectionContainer, IconWrap, Typography } from '@/app/components/ui-primitives';
import { Scale, Users, Database, FileText, Gauge } from 'lucide-react';
import { OfficerQualityPanel } from '@/app/components/OfficerQualityPanel';

export function Quality() {
  const mockApplication = {
    id: 'APP-2026-001',
    companyName: 'Global Textiles Ltd',
    sector: 'Textile & Garment',
    status: 'under_review',
    investmentAmount: 5000000,
  };

  const mockOfficer = {
    id: 'OFF-001',
    name: 'Ahmed Khan',
    email: 'officer@bida.gov.bd',
    department: 'Investment Services',
    role: 'Senior Officer'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionContainer>
        <div className="flex items-center gap-4 mb-4">
          <IconWrap>
            <Scale className="w-6 h-6" />
          </IconWrap>
          <div>
            <h2 className={Typography.sectionTitle}>Quality Assurance Dashboard</h2>
            <p className={Typography.body}>Consistency & Standards Enforcement</p>
          </div>
        </div>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <Users className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Peer Review</p>
            <p className={Typography.muted}>Second opinion system</p>
          </Card>
          <Card>
            <Database className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Precedent Database</p>
            <p className={Typography.muted}>Similar past decisions</p>
          </Card>
          <Card>
            <FileText className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Template Engine</p>
            <p className={Typography.muted}>Standard documents</p>
          </Card>
          <Card>
            <Gauge className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Fairness Meter</p>
            <p className={Typography.muted}>Equity check</p>
          </Card>
        </div>
      </SectionContainer>

      {/* Quality Panel */}
      <OfficerQualityPanel application={mockApplication} officer={mockOfficer} />
    </div>
  );
}