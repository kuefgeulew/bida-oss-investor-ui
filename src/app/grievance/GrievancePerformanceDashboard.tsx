/**
 * 📊 GRIEVANCE PERFORMANCE METRICS - PUBLIC DASHBOARD
 * 
 * Transparency dashboard showing:
 * - Average resolution time by issue type
 * - % resolved within SLA
 * - Repeat issues flagged for systemic fixes
 * - Real-time performance metrics
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Target,
  RefreshCw,
  Award,
  AlertOctagon,
  Calendar,
  Activity,
  FileText
} from 'lucide-react';

export interface PerformanceMetrics {
  totalTickets: number;
  resolvedTickets: number;
  averageResolutionDays: number;
  slaComplianceRate: number;
  activeTickets: number;
  escalatedTickets: number;
}

export interface IssueTypeMetrics {
  category: string;
  totalIssues: number;
  resolvedIssues: number;
  averageResolutionDays: number;
  slaComplianceRate: number;
  repeatIssues: number;
  trending: 'up' | 'down' | 'stable';
}

export interface RepeatIssue {
  issue: string;
  occurrences: number;
  affectedAgency: string;
  status: 'investigating' | 'systemic-fix-planned' | 'resolved';
  lastReported: string;
}

// Mock data based on Bangladesh Economic Mock Dataset principles
const PERFORMANCE_METRICS: PerformanceMetrics = {
  totalTickets: 487,
  resolvedTickets: 423,
  averageResolutionDays: 6.2,
  slaComplianceRate: 91.4,
  activeTickets: 64,
  escalatedTickets: 12
};

const ISSUE_TYPE_METRICS: IssueTypeMetrics[] = [
  {
    category: 'License/Approval Delays',
    totalIssues: 142,
    resolvedIssues: 128,
    averageResolutionDays: 8.5,
    slaComplianceRate: 88.7,
    repeatIssues: 23,
    trending: 'down'
  },
  {
    category: 'Utility Connection Problems',
    totalIssues: 89,
    resolvedIssues: 82,
    averageResolutionDays: 4.2,
    slaComplianceRate: 94.3,
    repeatIssues: 8,
    trending: 'stable'
  },
  {
    category: 'Customs Clearance Disputes',
    totalIssues: 76,
    resolvedIssues: 68,
    averageResolutionDays: 7.1,
    slaComplianceRate: 89.5,
    repeatIssues: 15,
    trending: 'down'
  },
  {
    category: 'Labor Inspection Issues',
    totalIssues: 54,
    resolvedIssues: 51,
    averageResolutionDays: 5.8,
    slaComplianceRate: 92.6,
    repeatIssues: 4,
    trending: 'stable'
  },
  {
    category: 'Taxation Disputes',
    totalIssues: 68,
    resolvedIssues: 58,
    averageResolutionDays: 9.4,
    slaComplianceRate: 85.3,
    repeatIssues: 12,
    trending: 'up'
  },
  {
    category: 'Land Acquisition Challenges',
    totalIssues: 58,
    resolvedIssues: 36,
    averageResolutionDays: 18.7,
    slaComplianceRate: 62.1,
    repeatIssues: 19,
    trending: 'up'
  }
];

const REPEAT_ISSUES: RepeatIssue[] = [
  {
    issue: 'Work permit processing delays at BIDA office',
    occurrences: 23,
    affectedAgency: 'BIDA',
    status: 'systemic-fix-planned',
    lastReported: '2026-02-10'
  },
  {
    issue: 'Land deed verification delays at DC offices',
    occurrences: 19,
    affectedAgency: 'Deputy Commissioner Offices',
    status: 'investigating',
    lastReported: '2026-02-09'
  },
  {
    issue: 'Customs duty calculation errors for textile imports',
    occurrences: 15,
    affectedAgency: 'Bangladesh Customs',
    status: 'systemic-fix-planned',
    lastReported: '2026-02-08'
  },
  {
    issue: 'Tax holiday certificate issuance delays',
    occurrences: 12,
    affectedAgency: 'NBR',
    status: 'resolved',
    lastReported: '2026-01-28'
  },
  {
    issue: 'BEPZA power connection approval workflow issues',
    occurrences: 8,
    affectedAgency: 'BEPZA',
    status: 'investigating',
    lastReported: '2026-02-07'
  }
];

export function GrievancePerformanceDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [showRepeatIssues, setShowRepeatIssues] = useState(true);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'down') return <TrendingUp className="w-4 h-4 text-green-600 rotate-180" />;
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-red-600" />;
    return <Activity className="w-4 h-4 text-gray-600" />;
  };

  const getStatusBadge = (status: RepeatIssue['status']) => {
    const badges = {
      'investigating': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'systemic-fix-planned': 'bg-blue-100 text-blue-800 border-blue-300',
      'resolved': 'bg-green-100 text-green-800 border-green-300'
    };
    const labels = {
      'investigating': 'Investigating',
      'systemic-fix-planned': 'Fix Planned',
      'resolved': 'Resolved'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-900 rounded-2xl p-6 shadow-sm border-2 border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Grievance Performance Metrics</h2>
              <p className="text-gray-600">Public transparency dashboard • Updated in real-time</p>
            </div>
          </div>
          <div className="flex gap-2">
            {(['7d', '30d', '90d', '1y'] as const).map(period => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-blue-100 hover:bg-blue-50'
                }`}
              >
                {period === '7d' && 'Last 7 Days'}
                {period === '30d' && 'Last 30 Days'}
                {period === '90d' && 'Last 90 Days'}
                {period === '1y' && 'Last Year'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-gray-200 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <FileText className="w-10 h-10 text-blue-600" />
            <Target className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{PERFORMANCE_METRICS.totalTickets}</h3>
          <p className="text-sm text-gray-600">Total Grievances Filed</p>
          <div className="mt-3 flex items-center gap-2 text-xs text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>{PERFORMANCE_METRICS.resolvedTickets} resolved</span>
          </div>
        </motion.div>

        {/* Average Resolution Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border-2 border-gray-200 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-10 h-10 text-green-600" />
            <TrendingUp className="w-6 h-6 text-green-600 rotate-180" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{PERFORMANCE_METRICS.averageResolutionDays} days</h3>
          <p className="text-sm text-gray-600">Average Resolution Time</p>
          <div className="mt-3 text-xs text-green-600 font-bold">
            ✓ Under 7-day SLA target
          </div>
        </motion.div>

        {/* SLA Compliance Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-2 border-gray-200 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <Award className="w-10 h-10 text-purple-600" />
            <CheckCircle className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{PERFORMANCE_METRICS.slaComplianceRate}%</h3>
          <p className="text-sm text-gray-600">SLA Compliance Rate</p>
          <div className="mt-3 bg-purple-100 border-2 border-purple-300 rounded-lg p-2">
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${PERFORMANCE_METRICS.slaComplianceRate}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Active Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-2 border-yellow-300 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <RefreshCw className="w-10 h-10 text-yellow-600" />
            <Activity className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{PERFORMANCE_METRICS.activeTickets}</h3>
          <p className="text-sm text-gray-600">Active Tickets In Progress</p>
          <div className="mt-3 text-xs text-yellow-700 font-bold">
            {PERFORMANCE_METRICS.escalatedTickets} escalated
          </div>
        </motion.div>

        {/* Resolution Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border-2 border-green-300 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <CheckCircle className="w-10 h-10 text-green-600" />
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">
            {((PERFORMANCE_METRICS.resolvedTickets / PERFORMANCE_METRICS.totalTickets) * 100).toFixed(1)}%
          </h3>
          <p className="text-sm text-gray-600">Resolution Success Rate</p>
          <div className="mt-3 text-xs text-green-600 font-bold">
            +2.3% from last month
          </div>
        </motion.div>

        {/* Escalation Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border-2 border-red-300 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="w-10 h-10 text-red-600" />
            <TrendingUp className="w-6 h-6 text-green-600 rotate-180" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">
            {((PERFORMANCE_METRICS.escalatedTickets / PERFORMANCE_METRICS.totalTickets) * 100).toFixed(1)}%
          </h3>
          <p className="text-sm text-gray-600">Escalation Rate</p>
          <div className="mt-3 text-xs text-green-600 font-bold">
            -1.2% from last month
          </div>
        </motion.div>
      </div>

      {/* Performance by Issue Type */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          Performance by Issue Type
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Issue Category</th>
                <th className="text-center py-3 px-4 text-sm font-bold text-gray-700">Total</th>
                <th className="text-center py-3 px-4 text-sm font-bold text-gray-700">Resolved</th>
                <th className="text-center py-3 px-4 text-sm font-bold text-gray-700">Avg Resolution</th>
                <th className="text-center py-3 px-4 text-sm font-bold text-gray-700">SLA Compliance</th>
                <th className="text-center py-3 px-4 text-sm font-bold text-gray-700">Repeat Issues</th>
                <th className="text-center py-3 px-4 text-sm font-bold text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {ISSUE_TYPE_METRICS.map((metric, idx) => (
                <motion.tr
                  key={metric.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className="font-semibold text-gray-900">{metric.category}</span>
                  </td>
                  <td className="py-3 px-4 text-center text-gray-700">{metric.totalIssues}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-green-600 font-bold">{metric.resolvedIssues}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`font-bold ${
                      metric.averageResolutionDays <= 7 ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {metric.averageResolutionDays} days
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`font-bold ${
                      metric.slaComplianceRate >= 90 ? 'text-green-600' : 
                      metric.slaComplianceRate >= 75 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {metric.slaComplianceRate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {metric.repeatIssues > 0 ? (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                        {metric.repeatIssues}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {getTrendIcon(metric.trending)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Repeat Issues - Systemic Fix Tracking */}
      <div className="bg-white border-2 border-orange-300 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <AlertOctagon className="w-6 h-6 text-orange-600" />
            Repeat Issues - Systemic Fix Tracking
          </h3>
          <button
            onClick={() => setShowRepeatIssues(!showRepeatIssues)}
            className="text-sm font-bold text-orange-600 hover:text-orange-700"
          >
            {showRepeatIssues ? 'Hide' : 'Show'} Details
          </button>
        </div>
        
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-orange-900">
            <strong>Accountability Mechanism:</strong> Issues reported 5+ times are flagged for systemic investigation 
            and process improvement. Agencies are required to submit action plans within 15 days.
          </p>
        </div>

        {showRepeatIssues && (
          <div className="space-y-3">
            {REPEAT_ISSUES.map((issue, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">{issue.issue}</h4>
                    <p className="text-sm text-gray-600">Affected Agency: {issue.affectedAgency}</p>
                  </div>
                  {getStatusBadge(issue.status)}
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-orange-600" />
                    <span className="font-bold text-orange-700">{issue.occurrences} occurrences</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Last: {issue.lastReported}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Transparency Note */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-bold mb-1">Transparency & Accountability</p>
            <p>
              This public dashboard demonstrates Bangladesh's commitment to investor confidence. 
              All metrics are updated in real-time and independently auditable. 
              Poor-performing agencies are flagged for process improvement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}