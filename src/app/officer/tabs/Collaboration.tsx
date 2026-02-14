// Collaboration Tab - Officer Thread, Ask for Help, Skill Profile
import { Card, SectionContainer, IconWrap, Typography } from '@/app/components/ui-primitives';
import { Users, MessageSquare, HelpCircle, Award } from 'lucide-react';
import { OfficerCollaborationPanel } from '@/app/components/OfficerCollaborationPanel';

export function Collaboration() {
  const mockApplication = {
    id: 'APP-2026-001',
    companyName: 'Global Textiles Ltd',
    sector: 'Textile & Garment',
    status: 'under_review',
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
            <Users className="w-6 h-6" />
          </IconWrap>
          <div>
            <h2 className={Typography.sectionTitle}>Collaboration Dashboard</h2>
            <p className={Typography.body}>Team Communication & Knowledge Sharing</p>
          </div>
        </div>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <MessageSquare className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Officer Thread</p>
            <p className={Typography.muted}>Internal discussions</p>
          </Card>
          <Card>
            <HelpCircle className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Ask for Help</p>
            <p className={Typography.muted}>Expert consultation</p>
          </Card>
          <Card>
            <Award className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Skill Profile</p>
            <p className={Typography.muted}>Expertise mapping</p>
          </Card>
        </div>
      </SectionContainer>

      {/* Collaboration Panel */}
      <OfficerCollaborationPanel application={mockApplication} officer={mockOfficer} />
    </div>
  );
}