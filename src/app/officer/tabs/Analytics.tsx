// Analytics Tab - Predictive Engine, Bottleneck Detector, Performance Predictor
import { Card, SectionContainer, IconWrap, Typography } from '@/app/components/ui-primitives';
import { BarChart3, TrendingUp, AlertCircle, Target } from 'lucide-react';
import { OfficerAdvancedPanel } from '@/app/components/OfficerAdvancedPanel';

export function Analytics() {
  const mockApplication = {
    id: 'APP-2026-001',
    companyName: 'Global Textiles Ltd',
    sector: 'Textile & Garment',
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
            <BarChart3 className="w-6 h-6" />
          </IconWrap>
          <div>
            <h2 className={Typography.sectionTitle}>Advanced Analytics</h2>
            <p className={Typography.body}>Predictive Intelligence & Performance Metrics</p>
          </div>
        </div>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <TrendingUp className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Predictive Engine</p>
            <p className={Typography.muted}>Future outcomes</p>
          </Card>
          <Card>
            <AlertCircle className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Bottleneck Detector</p>
            <p className={Typography.muted}>Process slowdowns</p>
          </Card>
          <Card>
            <Target className="w-6 h-6 text-gray-700 mb-2" />
            <p className="font-semibold text-sm text-gray-900">Performance Predictor</p>
            <p className={Typography.muted}>SLA forecasting</p>
          </Card>
        </div>
      </SectionContainer>

      {/* Advanced Panel */}
      <OfficerAdvancedPanel application={mockApplication} officer={mockOfficer} />
    </div>
  );
}