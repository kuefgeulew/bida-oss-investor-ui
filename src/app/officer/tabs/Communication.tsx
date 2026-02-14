// Communication Tab - Tone Checker, Communication Log, Automations
import { Card, SectionContainer, IconWrap, Typography } from '@/app/components/ui-primitives';
import { MessageCircle, Volume2, History, Zap } from 'lucide-react';
import { OfficerCommunicationPanel } from '@/app/components/OfficerCommunicationPanel';

export function Communication() {
  const mockApplication = {
    id: 'APP-2026-001',
    companyName: 'Global Textiles Ltd',
    investorName: 'John Smith',
    investorEmail: 'john.smith@example.com',
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
            <MessageCircle className="w-6 h-6" />
          </IconWrap>
          <div>
            <h2 className={Typography.sectionTitle}>Communication Hub</h2>
            <p className={Typography.body}>Investor Messaging & Automation</p>
          </div>
        </div>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <Volume2 className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Tone Checker</p>
            <p className={Typography.muted}>Professional language</p>
          </Card>
          <Card>
            <History className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Communication Log</p>
            <p className={Typography.muted}>Message history</p>
          </Card>
          <Card>
            <Zap className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Automations</p>
            <p className={Typography.muted}>Auto-notifications</p>
          </Card>
        </div>
      </SectionContainer>

      {/* Communication Panel */}
      <OfficerCommunicationPanel application={mockApplication} officer={mockOfficer} />
    </div>
  );
}