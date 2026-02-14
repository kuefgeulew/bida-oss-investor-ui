// Reports Tab - Comprehensive Reporting System
import { useState } from 'react';
import { Card, SectionContainer, IconWrap, Typography, PrimaryButton, SecondaryButton } from '@/app/components/ui-primitives';
import { FileText, Download, Calendar, Filter, BarChart3, FileSpreadsheet, FilePieChart } from 'lucide-react';

export function Reports() {
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);

  const reportTypes = [
    {
      id: 'performance',
      name: 'Officer Performance Report',
      description: 'Individual and team productivity metrics',
      icon: BarChart3,
      color: 'blue',
    },
    {
      id: 'processing',
      name: 'Application Processing Report',
      description: 'Processing times, bottlenecks, and delays',
      icon: FileSpreadsheet,
      color: 'green',
    },
    {
      id: 'sector',
      name: 'Sector Analysis Report',
      description: 'Investment trends by industry sector',
      icon: FilePieChart,
      color: 'purple',
    },
    {
      id: 'compliance',
      name: 'Compliance & Risk Report',
      description: 'AML checks, risk scores, and compliance status',
      icon: FileText,
      color: 'red',
    },
    {
      id: 'sla',
      name: 'SLA Compliance Report',
      description: 'Service level agreement adherence',
      icon: Calendar,
      color: 'orange',
    },
  ];

  const recentReports = [
    {
      name: 'Monthly Performance - January 2026',
      type: 'Performance',
      generatedDate: '2026-02-01',
      generatedBy: 'System Auto',
      size: '2.4 MB',
    },
    {
      name: 'Q4 2025 Sector Analysis',
      type: 'Sector Analysis',
      generatedDate: '2026-01-05',
      generatedBy: 'Ahmed Khan',
      size: '3.1 MB',
    },
    {
      name: 'Weekly SLA Compliance',
      type: 'SLA',
      generatedDate: '2026-01-28',
      generatedBy: 'System Auto',
      size: '1.2 MB',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionContainer>
        <div className="flex items-center gap-4 mb-4">
          <IconWrap>
            <FileText className="w-6 h-6" />
          </IconWrap>
          <div>
            <h2 className={Typography.sectionTitle}>Reports & Analytics</h2>
            <p className={Typography.body}>Generate, View, and Export System Reports</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mt-6">
          <PrimaryButton className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Generate New Report
          </PrimaryButton>
          <SecondaryButton className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Report
          </SecondaryButton>
          <SecondaryButton className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Custom Filters
          </SecondaryButton>
        </div>
      </SectionContainer>

      {/* Report Types */}
      <div>
        <h3 className={Typography.sectionTitle}>Available Report Types</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <Card
                key={report.id}
                className={`cursor-pointer ${
                  selectedReportType === report.id ? 'ring-2 ring-gray-900' : ''
                }`}
                onClick={() => setSelectedReportType(report.id)}
              >
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>
                <h4 className={Typography.cardTitle}>{report.name}</h4>
                <p className={`${Typography.body} mb-4`}>{report.description}</p>
                <SecondaryButton className="w-full">
                  Generate Report
                </SecondaryButton>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h3 className={Typography.sectionTitle}>Recent Reports</h3>
        <Card className="divide-y mt-4">
          {recentReports.map((report, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{report.name}</p>
                    <p className={Typography.muted}>
                      {report.type} • Generated {report.generatedDate} by {report.generatedBy}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={Typography.muted}>{report.size}</span>
                  <SecondaryButton className="p-2">
                    <Download className="w-4 h-4" />
                  </SecondaryButton>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Report Preview */}
      {selectedReportType && (
        <Card>
          <h3 className={`${Typography.sectionTitle} mb-4`}>Report Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Date Range</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  defaultValue="2026-01-01"
                />
                <input
                  type="date"
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  defaultValue="2026-02-04"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Format</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>PDF</option>
                <option>Excel (XLSX)</option>
                <option>CSV</option>
                <option>JSON</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Include Sections</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-900">Summary Statistics</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-900">Detailed Breakdown</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-900">Charts and Graphs</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-900">Raw Data Export</span>
                </label>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <PrimaryButton>
                Generate Report
              </PrimaryButton>
              <SecondaryButton onClick={() => setSelectedReportType(null)}>
                Cancel
              </SecondaryButton>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}