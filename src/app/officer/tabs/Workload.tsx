// Workload Tab - Heatmap, Time Analytics, Burnout Indicator
import { Card, SectionContainer, IconWrap, Typography } from '@/app/components/ui-primitives';
import { TrendingUp, Clock, Activity, AlertCircle } from 'lucide-react';
import { OfficerWorkloadPanel } from '@/app/components/OfficerWorkloadPanel';

export function Workload() {
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
            <TrendingUp className="w-6 h-6" />
          </IconWrap>
          <div>
            <h2 className={Typography.sectionTitle}>Workload Management Dashboard</h2>
            <p className={Typography.body}>Capacity Planning & Burnout Prevention</p>
          </div>
        </div>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <Activity className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Workload Heatmap</p>
            <p className={Typography.muted}>Visual distribution</p>
          </Card>
          <Card>
            <Clock className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Time Analytics</p>
            <p className={Typography.muted}>Processing patterns</p>
          </Card>
          <Card>
            <AlertCircle className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Burnout Indicator</p>
            <p className={Typography.muted}>Wellness monitoring</p>
          </Card>
        </div>
      </SectionContainer>

      {/* Workload Panel */}
      <OfficerWorkloadPanel officer={mockOfficer} />
    </div>
  );
}