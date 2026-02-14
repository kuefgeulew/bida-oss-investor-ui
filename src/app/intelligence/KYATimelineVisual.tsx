// 📅 KYA TIMELINE VISUAL — Know Your Approvals Dependency Gantt Chart
// ARCHITECTURE: Pure visualization of workflow DAG from agencyWorkflowEngine
// SOURCE: Reads approval pipeline to render timeline with dependencies
// MOUNT: InvestorPortal (Services section)

import React, { useMemo, useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Circle,
  ArrowRight,
  Calendar,
  TrendingUp,
  Filter,
  Download,
  Maximize2
} from 'lucide-react';
import { ApprovalPipeline, ApprovalStep } from '@/app/gov-agencies/agencyWorkflowEngine';
import { useLanguage } from '@/app/components/LanguageContext';

interface KYATimelineVisualProps {
  pipeline?: ApprovalPipeline;
  compact?: boolean;
}

interface TimelineRow {
  step: ApprovalStep;
  startDay: number;
  endDay: number;
  dependencies: ApprovalStep[];
}

export function KYATimelineVisual({ pipeline, compact = false }: KYATimelineVisualProps) {
  const { t } = useLanguage();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [showCriticalPathOnly, setShowCriticalPathOnly] = useState(false);

  // 📊 COMPUTE TIMELINE DATA
  const timelineData = useMemo(() => {
    if (!pipeline?.approvalSteps) return [];
    
    const rows: TimelineRow[] = [];
    const stepMap = new Map<string, ApprovalStep>();
    pipeline.approvalSteps.forEach(s => stepMap.set(s.serviceId, s));

    // Calculate earliest start time for each step based on dependencies
    const earliestStart = new Map<string, number>();

    function getEarliestStart(step: ApprovalStep): number {
      if (earliestStart.has(step.serviceId)) {
        return earliestStart.get(step.serviceId)!;
      }

      let maxPrereqEnd = 0;
      for (const prereqId of step.prerequisites) {
        const prereqStep = stepMap.get(prereqId);
        if (prereqStep) {
          const prereqStart = getEarliestStart(prereqStep);
          maxPrereqEnd = Math.max(maxPrereqEnd, prereqStart + prereqStep.slaInDays);
        }
      }

      earliestStart.set(step.serviceId, maxPrereqEnd);
      return maxPrereqEnd;
    }

    pipeline.approvalSteps.forEach(step => {
      const startDay = getEarliestStart(step);
      const endDay = startDay + step.slaInDays;
      const dependencies = step.prerequisites
        .map(prereqId => stepMap.get(prereqId))
        .filter(Boolean) as ApprovalStep[];

      rows.push({ step, startDay, endDay, dependencies });
    });

    return rows;
  }, [pipeline]);

  // 📈 CALCULATE METRICS
  const maxDays = useMemo(() => {
    return Math.max(...timelineData.map(r => r.endDay), pipeline?.estimatedCompletionDays || 0);
  }, [timelineData, pipeline?.estimatedCompletionDays]);

  const criticalPath = useMemo(() => {
    return timelineData.filter(r => r.step.criticalPath);
  }, [timelineData]);

  // 🔍 FILTER DATA
  const filteredData = useMemo(() => {
    let data = timelineData;

    if (showCriticalPathOnly) {
      data = data.filter(r => r.step.criticalPath);
    }

    if (filterStatus !== 'all') {
      data = data.filter(r => {
        if (filterStatus === 'completed') return r.step.status === 'approved';
        if (filterStatus === 'in-progress') return ['in-progress', 'under-review', 'documents-pending'].includes(r.step.status);
        if (filterStatus === 'pending') return ['not-started', 'pending'].includes(r.step.status);
        return true;
      });
    }

    return data;
  }, [timelineData, filterStatus, showCriticalPathOnly]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'in-progress':
      case 'under-review':
      case 'documents-pending': return 'bg-blue-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress':
      case 'under-review':
      case 'documents-pending': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'rejected': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return t('status.approved') || 'Approved';
      case 'in-progress': return t('status.inProgress') || 'In Progress';
      case 'under-review': return t('status.underReview') || 'Under Review';
      case 'documents-pending': return t('status.documentsPending') || 'Docs Pending';
      case 'rejected': return t('status.rejected') || 'Rejected';
      case 'not-started': return t('status.notStarted') || 'Not Started';
      case 'pending': return t('status.pending') || 'Pending';
      default: return status;
    }
  };

  if (compact) {
    // COMPACT VIEW FOR DASHBOARD
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">📅 {t('kya.timeline') || 'Approval Timeline'}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{pipeline?.estimatedCompletionDays} {t('common.days') || 'days'} estimated</span>
          </div>
        </div>

        {/* Mini Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">{t('common.progress') || 'Progress'}</span>
            <span className="font-semibold text-gray-900">{Math.round(pipeline?.overallProgress || 0)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"
              style={{ width: `${pipeline?.overallProgress || 0}%` }}
            />
          </div>
        </div>

        {/* Simplified Timeline List */}
        <div className="space-y-3">
          {filteredData.slice(0, 5).map((row, idx) => (
            <div key={row.step.serviceId} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {getStatusIcon(row.step.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{row.step.serviceName}</div>
                <div className="text-xs text-gray-500">{row.step.agencyName}</div>
              </div>
              <div className="flex-shrink-0 text-xs text-gray-600">
                Day {row.startDay}-{row.endDay}
              </div>
            </div>
          ))}
          {filteredData.length > 5 && (
            <div className="text-center text-sm text-gray-500 pt-2">
              +{filteredData.length - 5} more steps
            </div>
          )}
        </div>
      </Card>
    );
  }

  // FULL GANTT CHART VIEW
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            📅 {t('kya.timelineTitle') || 'Know Your Approvals Timeline'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {t('kya.subtitle') || 'Gantt chart visualization with dependency tracking'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            {t('common.export') || 'Export'}
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Maximize2 className="w-4 h-4" />
            {t('common.fullscreen') || 'Fullscreen'}
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{pipeline?.totalSteps || 0}</div>
              <div className="text-xs text-gray-600">{t('kya.totalSteps') || 'Total Steps'}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{pipeline?.completedSteps || 0}</div>
              <div className="text-xs text-gray-600">{t('kya.completed') || 'Completed'}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{criticalPath.length}</div>
              <div className="text-xs text-gray-600">{t('kya.criticalPath') || 'Critical Path'}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{maxDays}</div>
              <div className="text-xs text-gray-600">{t('kya.estimatedDays') || 'Estimated Days'}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">{t('common.filters') || 'Filters'}:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 text-sm rounded-lg ${
                filterStatus === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('common.all') || 'All'}
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1 text-sm rounded-lg ${
                filterStatus === 'pending' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('status.pending') || 'Pending'}
            </button>
            <button
              onClick={() => setFilterStatus('in-progress')}
              className={`px-3 py-1 text-sm rounded-lg ${
                filterStatus === 'in-progress' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('status.inProgress') || 'In Progress'}
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1 text-sm rounded-lg ${
                filterStatus === 'completed' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('status.completed') || 'Completed'}
            </button>
          </div>

          <div className="ml-auto">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showCriticalPathOnly}
                onChange={(e) => setShowCriticalPathOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{t('kya.showCriticalPathOnly') || 'Critical Path Only'}</span>
            </label>
          </div>
        </div>
      </Card>

      {/* Gantt Chart */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Timeline Header */}
            <div className="flex mb-4 border-b border-gray-200 pb-2">
              <div className="w-64 flex-shrink-0 font-semibold text-sm text-gray-700">
                {t('kya.approvalStep') || 'Approval Step'}
              </div>
              <div className="flex-1 relative">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  {Array.from({ length: Math.ceil(maxDays / 10) + 1 }, (_, i) => (
                    <span key={i} className="flex-1 text-center">Day {i * 10}</span>
                  ))}
                </div>
                <div className="w-full h-px bg-gray-300" />
              </div>
            </div>

            {/* Timeline Rows */}
            <div className="space-y-4">
              {filteredData.map((row, idx) => {
                const widthPercent = ((row.endDay - row.startDay) / maxDays) * 100;
                const leftPercent = (row.startDay / maxDays) * 100;

                return (
                  <div key={row.step.serviceId} className="flex items-center group">
                    {/* Step Info */}
                    <div className="w-64 flex-shrink-0 pr-4">
                      <div className="flex items-start gap-2">
                        <div className="mt-1">
                          {getStatusIcon(row.step.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {row.step.serviceName}
                          </div>
                          <div className="text-xs text-gray-500 truncate">{row.step.agencyName}</div>
                          {row.step.criticalPath && (
                            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                              <TrendingUp className="w-3 h-3" />
                              {t('kya.critical') || 'Critical'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Bar */}
                    <div className="flex-1 relative h-12">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex">
                        {Array.from({ length: Math.ceil(maxDays / 10) }, (_, i) => (
                          <div key={i} className="flex-1 border-r border-gray-100" />
                        ))}
                      </div>

                      {/* Dependency Lines */}
                      {row.dependencies.map((dep) => {
                        const depRow = timelineData.find(r => r.step.serviceId === dep.serviceId);
                        if (!depRow) return null;
                        
                        const depEndPercent = (depRow.endDay / maxDays) * 100;
                        const currentStartPercent = (row.startDay / maxDays) * 100;

                        return (
                          <div
                            key={dep.serviceId}
                            className="absolute top-6 h-px bg-gray-400 opacity-50"
                            style={{
                              left: `${depEndPercent}%`,
                              width: `${currentStartPercent - depEndPercent}%`
                            }}
                          >
                            <ArrowRight className="w-3 h-3 text-gray-400 absolute right-0 -top-1" />
                          </div>
                        );
                      })}

                      {/* Progress Bar */}
                      <div
                        className={`absolute top-3 h-6 rounded-lg ${getStatusColor(row.step.status)} opacity-80 hover:opacity-100 transition-opacity cursor-pointer shadow-sm`}
                        style={{
                          left: `${leftPercent}%`,
                          width: `${widthPercent}%`,
                          minWidth: '40px'
                        }}
                        title={`${row.step.serviceName}: ${row.startDay}-${row.endDay} days (${row.step.slaInDays}d SLA)`}
                      >
                        <div className="flex items-center justify-center h-full px-2">
                          <span className="text-xs text-white font-medium truncate">
                            {row.step.slaInDays}d
                          </span>
                        </div>
                      </div>

                      {/* Hover Details */}
                      <div className="absolute left-0 top-12 hidden group-hover:block z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-64">
                        <div className="text-sm font-semibold text-gray-900 mb-2">{row.step.serviceName}</div>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>{t('kya.agency') || 'Agency'}:</span>
                            <span className="font-medium">{row.step.agencyName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t('kya.startDay') || 'Start Day'}:</span>
                            <span className="font-medium">{row.startDay}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t('kya.endDay') || 'End Day'}:</span>
                            <span className="font-medium">{row.endDay}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t('kya.sla') || 'SLA'}:</span>
                            <span className="font-medium">{row.step.slaInDays} {t('common.days') || 'days'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t('kya.status') || 'Status'}:</span>
                            <span className="font-medium">{getStatusText(row.step.status)}</span>
                          </div>
                          {row.dependencies.length > 0 && (
                            <div className="border-t border-gray-200 pt-1 mt-1">
                              <div className="font-medium mb-1">{t('kya.dependencies') || 'Dependencies'}:</div>
                              {row.dependencies.map(dep => (
                                <div key={dep.serviceId} className="text-gray-500">• {dep.serviceName}</div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-6 text-sm">
                <span className="font-medium text-gray-700">{t('kya.legend') || 'Legend'}:</span>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded" />
                  <span className="text-gray-600">{t('status.approved') || 'Approved'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded" />
                  <span className="text-gray-600">{t('status.inProgress') || 'In Progress'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded" />
                  <span className="text-gray-600">{t('status.notStarted') || 'Not Started'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded" />
                  <span className="text-gray-600">{t('status.rejected') || 'Rejected'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}