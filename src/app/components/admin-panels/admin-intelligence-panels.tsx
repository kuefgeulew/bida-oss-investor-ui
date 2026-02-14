// Admin Intelligence Panels: Bottleneck Intelligence, Policy Simulator, Executive Dashboard

import { useState } from 'react';
import { Card, SectionContainer, IconWrap, Typography } from '@/app/components/ui-primitives';
import { Badge } from '../ui/badge';
import { 
  Scale, AlertTriangle, PlayCircle, Building2, TrendingUp, Users, Shield, 
  Settings, Globe, Download, Eye, Award, Brain, Target, Database
} from 'lucide-react';
import { 
  getOfficerFairness, 
  getCorruptionSignals, 
  getJourneyTimeline,
  getSLALeaderboard,
  getEscalations,
  getDependencyGraph,
  getLoadHeatmap,
  getSkillCoverage,
  getTrainingNeeds
} from '@/app/admin-core/adminDataProvider';
import { getPipeline, generateApprovalPipeline } from '@/app/gov-agencies/agencyWorkflowEngine';
import { getServiceById, GOVERNMENT_AGENCIES } from '@/app/gov-agencies/agencyRegistry';

// ===== GOVERNANCE PANELS (3 panels) =====

// Feature 4: Decision Fairness Monitor
export function FairnessMonitorPanel({ applications, officers }: { applications: any[], officers: any[] }) {
  const fairnessData = getOfficerFairness();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          ⚖️ Decision Fairness Monitor
        </h1>
        <p className={Typography.body}>Track officer approval patterns for bias detection</p>
      </div>
      
      <Card>
        <div className="mb-4">
          <p className={`${Typography.body} mb-2`}>Team Average Approval Rate: {fairnessData.teamAverage.toFixed(1)}%</p>
        </div>
        <div className="space-y-3">
          {fairnessData.stats.map((stat, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium text-gray-900">{stat.officer}</p>
                <p className={Typography.body}>{stat.total} cases processed</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{stat.approvalRate.toFixed(1)}% approval</p>
                <Badge variant={Math.abs(stat.approvalRate - fairnessData.teamAverage) > 20 ? 'destructive' : 'outline'}>
                  {Math.abs(stat.approvalRate - fairnessData.teamAverage) > 20 ? 'Review Required' : 'Normal'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        {fairnessData.alerts.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded">
            <p className="font-medium text-yellow-900">⚠️ {fairnessData.alerts.length} officers showing significant variance from team average</p>
          </div>
        )}
      </Card>
    </div>
  );
}

// Feature 5: Corruption Risk Radar
export function CorruptionRadarPanel() {
  const corruptionSignals = getCorruptionSignals();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          🚨 Corruption Risk Radar
        </h1>
        <p className={Typography.body}>Detect suspicious patterns in officer behavior</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4 flex items-center gap-2`}>
          <AlertTriangle className="w-5 h-5 text-gray-700" />
          Active Risk Signals
        </h3>
        <div className="space-y-3">
          {corruptionSignals.map(signal => (
            <div key={signal.id} className={`p-3 rounded border-l-4 ${
              signal.risk === 'high' ? 'bg-red-50 border-red-500' :
              signal.risk === 'medium' ? 'bg-orange-50 border-orange-500' :
              'bg-yellow-50 border-yellow-500'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900">{signal.type}</p>
                  <p className={Typography.body}>Officer: {signal.officer}</p>
                  {signal.investor && <p className={Typography.body}>Investor: {signal.investor}</p>}
                  {signal.count && <p className={Typography.body}>Occurrences: {signal.count}</p>}
                </div>
                <Badge variant="outline" className={
                  signal.risk === 'high' ? 'bg-red-100 text-red-800' :
                  signal.risk === 'medium' ? 'bg-orange-100 text-orange-800' :
                  'bg-yellow-100 text-yellow-800'
                }>
                  {signal.risk}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Feature 6: Application Journey Replay
export function JourneyReplayPanel({ applications }: { applications: any[] }) {
  const selectedJourney = applications[0];
  const journeyTimeline = getJourneyTimeline(selectedJourney);

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          ▶️ Journey Replay
        </h1>
        <p className={Typography.body}>Replay complete application journey timeline</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4 flex items-center gap-2`}>
          <PlayCircle className="w-5 h-5 text-gray-700" />
          Application Journey: {selectedJourney?.id}
        </h3>
        <div className="space-y-4">
          {journeyTimeline.map((event, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {event.day}
                </div>
                {idx < journeyTimeline.length - 1 && (
                  <div className="w-0.5 h-12 bg-gray-200" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="font-medium text-gray-900">{event.event}</p>
                <p className={Typography.body}>{event.actor} - {event.action}</p>
                <p className={Typography.muted}>Day {event.day}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ===== INTER-AGENCY PANELS (3 panels) =====

// Feature 7: Agency SLA Leaderboard
export function SLALeaderboardPanel() {
  const agencySLALeaderboard = getSLALeaderboard();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          🏆 Agency SLA Leaderboard
        </h1>
        <p className={Typography.body}>Track inter-agency performance and compliance</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4 flex items-center gap-2`}>
          <Award className="w-5 h-5 text-gray-700" />
          Performance Rankings
        </h3>
        <div className="space-y-3">
          {agencySLALeaderboard.map((agency, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
              <div className="text-2xl">
                {idx === 0 && '🥇'}
                {idx === 1 && '🥈'}
                {idx === 2 && '🥉'}
                {idx > 2 && `${idx + 1}.`}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{agency.agency}</p>
                <p className={Typography.body}>{agency.casesProcessed} cases processed</p>
              </div>
              <div className="text-center px-3">
                <p className={Typography.muted}>SLA</p>
                <p className={`text-lg font-bold ${
                  agency.slaCompliance >= 85 ? 'text-green-600' :
                  agency.slaCompliance >= 70 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>{agency.slaCompliance}%</p>
              </div>
              <div className="text-center px-3">
                <p className={Typography.muted}>Avg Time</p>
                <p className="text-lg font-bold text-gray-900">{agency.avgResponseTime}d</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Feature 8: Escalation Monitor
export function EscalationMonitorPanel() {
  const escalationsInFlight = getEscalations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          🔺 Escalation Monitor
        </h1>
        <p className={Typography.body}>Track active escalations across agencies</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4 flex items-center gap-2`}>
          <TrendingUp className="w-5 h-5 text-gray-700" />
          Escalations In Flight
        </h3>
        <div className="space-y-3">
          {escalationsInFlight.map((esc, idx) => (
            <div key={idx} className="p-3 border-l-4 border-orange-500 bg-orange-50 rounded">
              <p className="font-medium text-gray-900">{esc.caseId}</p>
              <p className={Typography.body}>Investor: {esc.investor}</p>
              <p className={Typography.body}>Officer: {esc.officer}</p>
              <p className="text-sm text-orange-800">{esc.daysOverdue} days overdue</p>
              <p className={Typography.muted}>${(esc.investmentAmount / 1000000).toFixed(1)}M at risk</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Feature 9: Dependency Graph
export function DependencyGraphPanel() {
  const dependencyGraph = getDependencyGraph();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          🔗 Cross-Agency Dependency Graph
        </h1>
        <p className={Typography.body}>Visual map of inter-agency dependencies</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4`}>Agency Workflow Dependencies</h3>
        
        {/* Visual Workflow */}
        <div className="space-y-4">
          {dependencyGraph.map((node, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-16 text-center">
                <div className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-bold">
                  Step {node.step}
                </div>
              </div>
              
              <div className="flex-1 p-4 bg-gray-50 border-l-4 border-gray-900 rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{node.agency}</p>
                    <p className={Typography.body}>{node.stage}</p>
                    {node.dependencies.length > 0 && (
                      <p className={`${Typography.muted} mt-1`}>
                        ⬅️ Requires: {node.dependencies.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={Typography.body}>{node.casesProcessed} cases</p>
                    <p className="text-sm font-bold text-gray-900">{node.avgDays} days avg</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p className={Typography.body}>
            <strong>🔍 How to read:</strong> Each step shows agency dependencies. For example, NBR Tax Registration 
            requires RJSC Company Registration to be completed first. The final BIDA approval depends on 
            Bangladesh Bank, Fire Service, and DoE clearances.
          </p>
        </div>
      </Card>
    </div>
  );
}

// ===== OFFICER ECOSYSTEM PANELS (3 panels) =====

// Feature 10: Officer Load Heatmap
export function LoadHeatmapPanel() {
  const officerLoadHeatmap = getLoadHeatmap();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          📊 Officer Load Heatmap
        </h1>
        <p className={Typography.body}>Monitor workload distribution across officers</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4 flex items-center gap-2`}>
          <Users className="w-5 h-5 text-gray-700" />
          Load vs Capacity Analysis
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {officerLoadHeatmap.map((officer, idx) => (
            <div key={idx} className={`p-4 rounded-lg border-2 ${
              officer.status === 'overload' ? 'bg-red-50 border-red-500' :
              officer.status === 'optimal' ? 'bg-green-50 border-green-500' :
              officer.status === 'healthy' ? 'bg-blue-50 border-blue-500' :
              'bg-yellow-50 border-yellow-500'
            }`}>
              <p className="font-medium text-sm text-gray-900 mb-2">{officer.officer}</p>
              <p className="text-2xl font-bold text-gray-900">{officer.load}/{officer.capacity}</p>
              <Badge variant="outline" className="mt-2 text-xs">
                {officer.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Feature 11: Skill Coverage Map
export function SkillCoveragePanel() {
  const skillCoverage = getSkillCoverage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          🧠 Skill Coverage Map
        </h1>
        <p className={Typography.body}>Track sector expertise across officer team</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4 flex items-center gap-2`}>
          <Brain className="w-5 h-5 text-gray-700" />
          Sector Expertise Coverage
        </h3>
        <div className="space-y-3">
          {Object.entries(skillCoverage).map(([sector, officers]) => (
            <div key={sector} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <p className="font-medium text-gray-900">{sector}</p>
              <div className="flex gap-2">
                {officers.length > 0 ? (
                  officers.map((officer, idx) => (
                    <Badge key={idx} variant="outline">{officer}</Badge>
                  ))
                ) : (
                  <Badge variant="destructive">⚠️ No coverage</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Feature 12: Training Predictor
export function TrainingPredictorPanel() {
  const trainingNeeds = getTrainingNeeds();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          🎯 Training Need Predictor
        </h1>
        <p className={Typography.body}>Identify skill gaps and training priorities</p>
      </div>

      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4 flex items-center gap-2`}>
          <Target className="w-5 h-5 text-gray-700" />
          Predicted Training Needs
        </h3>
        <div className="space-y-3">
          {trainingNeeds.map((need, idx) => (
            <div key={idx} className={`p-3 rounded border-l-4 ${
              need.urgency === 'high' ? 'bg-red-50 border-red-500' :
              'bg-yellow-50 border-yellow-500'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900">{need.officer}</p>
                  <p className={Typography.body}>Needs: {need.skill}</p>
                  <p className={`${Typography.muted} mt-1`}>Reason: {need.reason}</p>
                </div>
                <Badge variant={need.urgency === 'high' ? 'destructive' : 'outline'}>
                  {need.urgency} priority
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// 🏛️ NEW FEATURE: Government Approval Analytics
export function GovernmentAnalyticsPanel({ applications }: { applications: any[] }) {
  // Get government pipeline data for all active applications
  const govPipelines = applications.map(app => {
    let pipeline = getPipeline(app.investorId || app.id);
    if (!pipeline) {
      pipeline = generateApprovalPipeline(app.investorId || app.id, app.sector || 'manufacturing');
    }
    return pipeline;
  }).filter(Boolean);

  // Calculate aggregate statistics
  const totalSteps = govPipelines.reduce((sum, p) => sum + (p?.totalSteps || 0), 0);
  const completedSteps = govPipelines.reduce((sum, p) => sum + (p?.completedSteps || 0), 0);
  const avgProgress = govPipelines.length > 0 
    ? govPipelines.reduce((sum, p) => sum + (p?.overallProgress || 0), 0) / govPipelines.length 
    : 0;

  // Agency performance breakdown
  const agencyStats = new Map<string, { total: number; completed: number; avgDays: number }>();
  
  govPipelines.forEach(pipeline => {
    pipeline?.approvalSteps.forEach(step => {
      const current = agencyStats.get(step.agencyName) || { total: 0, completed: 0, avgDays: 0 };
      current.total++;
      if (step.status === 'approved') current.completed++;
      current.avgDays = (current.avgDays * (current.total - 1) + step.daysElapsed) / current.total;
      agencyStats.set(step.agencyName, current);
    });
  });

  const topAgencies = Array.from(agencyStats.entries())
    .map(([name, stats]) => ({
      name,
      ...stats,
      completionRate: (stats.completed / stats.total * 100).toFixed(1)
    }))
    .sort((a, b) => parseFloat(b.completionRate) - parseFloat(a.completionRate));

  return (
    <div className="space-y-6">
      <div>
        <h1 className={Typography.pageTitle}>
          🏛️ Government Approval Analytics
        </h1>
        <p className={Typography.body}>Real-time insights from government workflow engine</p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">{govPipelines.length}</p>
            <p className={Typography.body}>Active Pipelines</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{Math.round(avgProgress)}%</p>
            <p className={Typography.body}>Avg Progress</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{completedSteps}/{totalSteps}</p>
            <p className={Typography.body}>Steps Complete</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">{GOVERNMENT_AGENCIES.length}</p>
            <p className={Typography.body}>Agencies Tracked</p>
          </div>
        </Card>
      </div>

      {/* Agency Performance Breakdown */}
      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4 flex items-center gap-2`}>
          <Building2 className="w-5 h-5 text-gray-700" />
          Agency Performance Breakdown
        </h3>
        <div className="space-y-3">
          {topAgencies.slice(0, 10).map((agency, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{agency.name}</p>
                <p className={Typography.body}>{agency.total} approval steps</p>
              </div>
              <div className="text-right px-4">
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className={`text-lg font-bold ${
                  parseFloat(agency.completionRate) >= 75 ? 'text-green-600' :
                  parseFloat(agency.completionRate) >= 50 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>{agency.completionRate}%</p>
              </div>
              <div className="text-right px-4">
                <p className="text-sm text-gray-600">Avg Processing</p>
                <p className="text-lg font-bold text-gray-900">{agency.avgDays.toFixed(1)}d</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Critical Path Bottlenecks */}
      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4 flex items-center gap-2`}>
          <AlertTriangle className="w-5 h-5 text-orange-700" />
          System-Wide Bottlenecks
        </h3>
        <div className="space-y-3">
          {govPipelines.slice(0, 5).map((pipeline, idx) => {
            const bottlenecks = pipeline?.approvalSteps.filter(step => 
              step.status === 'under-review' && step.daysElapsed > step.slaInDays * 0.8
            ) || [];
            
            if (bottlenecks.length === 0) return null;

            return (
              <div key={idx} className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="font-medium text-gray-900">Pipeline {pipeline?.investorId}</p>
                <p className={Typography.body}>{bottlenecks.length} bottleneck(s) detected</p>
                <div className="mt-2 space-y-1">
                  {bottlenecks.map((step, stepIdx) => (
                    <p key={stepIdx} className="text-sm text-red-800">
                      • {step.serviceName} ({step.agencyName}) - {step.daysElapsed}/{step.slaInDays} days
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Service Type Distribution */}
      <Card>
        <h3 className={`${Typography.sectionTitle} mb-4 flex items-center gap-2`}>
          <Database className="w-5 h-5 text-gray-700" />
          Service Type Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Environmental', 'Fire Safety', 'Trade License', 'Tax Registration'].map((serviceType, idx) => {
            const count = govPipelines.reduce((sum, p) => 
              sum + (p?.approvalSteps.filter(s => s.serviceName.includes(serviceType)).length || 0), 0
            );
            return (
              <div key={idx} className="p-4 bg-gray-50 rounded text-center">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-sm text-gray-600">{serviceType}</p>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="p-4 bg-purple-50 border border-purple-200 rounded">
        <p className={Typography.body}>
          🔄 <strong>Live Data Source:</strong> Government workflow engine tracking {totalSteps} approval steps across {GOVERNMENT_AGENCIES.length} agencies
        </p>
      </div>
    </div>
  );
}

// Exporting all panels for import
export const AdminIntelligencePanels = {
  FairnessMonitorPanel,
  CorruptionRadarPanel,
  JourneyReplayPanel,
  SLALeaderboardPanel,
  EscalationMonitorPanel,
  DependencyGraphPanel,
  LoadHeatmapPanel,
  SkillCoveragePanel,
  TrainingPredictorPanel,
  GovernmentAnalyticsPanel
};