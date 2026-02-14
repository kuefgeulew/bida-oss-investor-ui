// Agencies Tab - Escalation Ladder, Accountability Dashboard, Conditional Approval
import { Card, SectionContainer, IconWrap, Typography } from '@/app/components/ui-primitives';
import { Building2, ArrowUpCircle, Target, CheckSquare } from 'lucide-react';
import { OfficerAgencyPanel } from '@/app/components/OfficerAgencyPanel';

export function Agencies() {
  const mockApplication = {
    id: 'APP-2026-001',
    companyName: 'Global Textiles Ltd',
    sector: 'Textile & Garment',
    status: 'under_review',
    approvals: {
      rjsc: 'pending',
      nbr: 'pending',
      bangladeshBank: 'pending',
      environment: 'pending',
      fire: 'not_required'
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionContainer>
        <div className="flex items-center gap-4 mb-4">
          <IconWrap>
            <Building2 className="w-6 h-6" />
          </IconWrap>
          <div>
            <h2 className={Typography.sectionTitle}>Inter-Agency Coordination</h2>
            <p className={Typography.body}>Cross-Department Approval Management</p>
          </div>
        </div>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <ArrowUpCircle className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Escalation Ladder</p>
            <p className={Typography.muted}>Hierarchy navigation</p>
          </Card>
          <Card>
            <Target className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Accountability Dashboard</p>
            <p className={Typography.muted}>Who's responsible</p>
          </Card>
          <Card>
            <CheckSquare className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Conditional Approval</p>
            <p className={Typography.muted}>Parallel processing</p>
          </Card>
        </div>
      </SectionContainer>

      {/* Agency Panel */}
      <OfficerAgencyPanel application={mockApplication} />
    </div>
  );
}