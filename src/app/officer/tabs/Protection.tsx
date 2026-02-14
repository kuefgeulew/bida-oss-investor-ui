// Protection Tab - Legal PDF, Conflict of Interest, Audit Preview, Corruption Banner
import { Card, SectionContainer, IconWrap, Typography } from '@/app/components/ui-primitives';
import { Shield, FileText, AlertTriangle, Eye } from 'lucide-react';
import { OfficerProtectionPanel } from '@/app/components/OfficerProtectionPanel';

export function Protection() {
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
            <Shield className="w-6 h-6" />
          </IconWrap>
          <div>
            <h2 className={Typography.sectionTitle}>Protection Dashboard</h2>
            <p className={Typography.body}>Legal Defense & Compliance Shield</p>
          </div>
        </div>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <FileText className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Legal PDF Generator</p>
            <p className={Typography.muted}>Decision documentation</p>
          </Card>
          <Card>
            <AlertTriangle className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Conflict of Interest</p>
            <p className={Typography.muted}>COI detection</p>
          </Card>
          <Card>
            <Eye className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Audit Preview</p>
            <p className={Typography.muted}>What auditors see</p>
          </Card>
          <Card>
            <Shield className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Corruption Banner</p>
            <p className={Typography.muted}>Red flag alerts</p>
          </Card>
        </div>
      </SectionContainer>

      {/* Protection Panel */}
      <OfficerProtectionPanel application={mockApplication} officer={mockOfficer} />
    </div>
  );
}