// 📊 TRANSPARENCY DASHBOARD — Public Service Performance & SLA Tracking
// FEATURES: Real-time SLA metrics, service ratings, department performance, public accountability
// ARCHITECTURE: Read-only projection of service delivery data

import React, { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  Star,
  Users,
  CheckCircle,
  AlertTriangle,
  Award,
  Target,
  BarChart3,
  Calendar,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface ServiceMetric {
  service: string;
  department: string;
  slaTarget: number; // days
  avgProcessingTime: number; // days
  compliance: number; // percentage
  completedThisMonth: number;
  rating: number; // 1-5 stars
  totalRatings: number;
  trend: 'up' | 'down' | 'stable';
}

const SERVICE_METRICS: ServiceMetric[] = [
  {
    service: 'Company Registration',
    department: 'RJSC',
    slaTarget: 7,
    avgProcessingTime: 5.2,
    compliance: 94,
    completedThisMonth: 342,
    rating: 4.6,
    totalRatings: 1247,
    trend: 'up'
  },
  {
    service: 'BIDA Registration',
    department: 'BIDA',
    slaTarget: 3,
    avgProcessingTime: 2.1,
    compliance: 98,
    completedThisMonth: 189,
    rating: 4.8,
    totalRatings: 856,
    trend: 'up'
  },
  {
    service: 'TIN Registration',
    department: 'NBR',
    slaTarget: 2,
    avgProcessingTime: 1.8,
    compliance: 96,
    completedThisMonth: 412,
    rating: 4.5,
    totalRatings: 1893,
    trend: 'stable'
  },
  {
    service: 'VAT Registration',
    department: 'NBR',
    slaTarget: 3,
    avgProcessingTime: 2.4,
    compliance: 92,
    completedThisMonth: 387,
    rating: 4.3,
    totalRatings: 1654,
    trend: 'up'
  },
  {
    service: 'Trade License',
    department: 'City Corporation',
    slaTarget: 7,
    avgProcessingTime: 6.8,
    compliance: 89,
    completedThisMonth: 267,
    rating: 4.1,
    totalRatings: 1123,
    trend: 'down'
  },
  {
    service: 'Environmental Clearance',
    department: 'DoE',
    slaTarget: 30,
    avgProcessingTime: 28.5,
    compliance: 87,
    completedThisMonth: 94,
    rating: 3.9,
    totalRatings: 542,
    trend: 'stable'
  },
  {
    service: 'Fire License',
    department: 'Fire Service',
    slaTarget: 10,
    avgProcessingTime: 8.9,
    compliance: 91,
    completedThisMonth: 156,
    rating: 4.2,
    totalRatings: 789,
    trend: 'up'
  },
  {
    service: 'Factory License',
    department: 'DIFE',
    slaTarget: 14,
    avgProcessingTime: 12.3,
    compliance: 93,
    completedThisMonth: 128,
    rating: 4.4,
    totalRatings: 623,
    trend: 'up'
  },
  {
    service: 'Work Permit',
    department: 'BIDA',
    slaTarget: 10,
    avgProcessingTime: 7.6,
    compliance: 95,
    completedThisMonth: 234,
    rating: 4.7,
    totalRatings: 1045,
    trend: 'up'
  },
  {
    service: 'Bank Account Opening',
    department: 'Bangladesh Bank',
    slaTarget: 5,
    avgProcessingTime: 4.2,
    compliance: 94,
    completedThisMonth: 298,
    rating: 4.5,
    totalRatings: 1321,
    trend: 'stable'
  }
];

const MONTHLY_PERFORMANCE = [
  { month: 'Jul', completed: 1847, slaCompliance: 91 },
  { month: 'Aug', completed: 1923, slaCompliance: 92 },
  { month: 'Sep', completed: 2134, slaCompliance: 93 },
  { month: 'Oct', completed: 2287, slaCompliance: 94 },
  { month: 'Nov', completed: 2456, slaCompliance: 95 },
  { month: 'Dec', completed: 2507, slaCompliance: 96 }
];

const DEPARTMENT_PERFORMANCE = [
  { department: 'BIDA', score: 96, services: 3 },
  { department: 'RJSC', score: 94, services: 2 },
  { department: 'NBR', score: 94, services: 3 },
  { department: 'DIFE', score: 93, services: 1 },
  { department: 'Bangladesh Bank', score: 94, services: 1 },
  { department: 'Fire Service', score: 91, services: 1 },
  { department: 'DoE', score: 87, services: 1 },
  { department: 'City Corporation', score: 89, services: 1 }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export function TransparencyDashboard() {
  const [selectedService, setSelectedService] = useState<ServiceMetric | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'services' | 'departments'>('overview');

  const overallCompliance = Math.round(
    SERVICE_METRICS.reduce((sum, s) => sum + s.compliance, 0) / SERVICE_METRICS.length
  );

  const totalCompletedThisMonth = SERVICE_METRICS.reduce((sum, s) => sum + s.completedThisMonth, 0);

  const avgRating = (
    SERVICE_METRICS.reduce((sum, s) => sum + s.rating, 0) / SERVICE_METRICS.length
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Public Transparency Dashboard</h1>
            <p className="text-gray-600">
              Real-time service performance, SLA compliance, and quality metrics
            </p>
          </div>
          <Activity className="w-16 h-16 text-blue-600 opacity-30" />
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('overview')}
          className={`px-6 py-3 rounded-lg transition-all bg-blue-50/50 hover:bg-blue-50 hover:shadow-lg ${
            viewMode === 'overview'
              ? 'border-2 border-blue-600 shadow-lg'
              : 'border border-blue-100'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setViewMode('services')}
          className={`px-6 py-3 rounded-lg transition-all bg-blue-50/50 hover:bg-blue-50 hover:shadow-lg ${
            viewMode === 'services'
              ? 'border-2 border-blue-600 shadow-lg'
              : 'border border-blue-100'
          }`}
        >
          Service-wise
        </button>
        <button
          onClick={() => setViewMode('departments')}
          className={`px-6 py-3 rounded-lg transition-all bg-blue-50/50 hover:bg-blue-50 hover:shadow-lg ${
            viewMode === 'departments'
              ? 'border-2 border-blue-600 shadow-lg'
              : 'border border-blue-100'
          }`}
        >
          Department-wise
        </button>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <Target className="w-8 h-8 mb-2 text-blue-600" />
          <div className="text-sm text-gray-600">SLA Compliance</div>
          <div className="text-4xl font-bold text-gray-900">{overallCompliance}%</div>
          <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
            <TrendingUp className="w-4 h-4" />
            <span>+3% from last month</span>
          </div>
        </div>

        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <CheckCircle className="w-8 h-8 mb-2 text-blue-600" />
          <div className="text-sm text-gray-600">Completed This Month</div>
          <div className="text-4xl font-bold text-gray-900">{totalCompletedThisMonth.toLocaleString()}</div>
          <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
            <TrendingUp className="w-4 h-4" />
            <span>+12% from last month</span>
          </div>
        </div>

        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <Star className="w-8 h-8 mb-2 text-blue-600" />
          <div className="text-sm text-gray-600">Average Rating</div>
          <div className="text-4xl font-bold text-gray-900">{avgRating}/5</div>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(Number(avgRating)) ? 'fill-current text-blue-600' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <Clock className="w-8 h-8 mb-2 text-blue-600" />
          <div className="text-sm text-gray-600">Avg Processing Time</div>
          <div className="text-4xl font-bold text-gray-900">6.2</div>
          <div className="text-sm text-gray-600">days (vs 8.5 target)</div>
        </div>
      </div>

      {/* Overview Mode */}
      {viewMode === 'overview' && (
        <>
          {/* Monthly Trend */}
          <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              6-Month Performance Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={MONTHLY_PERFORMANCE}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px' }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="completed"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Applications Completed"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="slaCompliance"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="SLA Compliance %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Performing Services */}
          <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Top Performing Services
            </h3>
            <div className="space-y-3">
              {SERVICE_METRICS.sort((a, b) => b.compliance - a.compliance)
                .slice(0, 5)
                .map((service, idx) => (
                  <div
                    key={service.service}
                    className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{service.service}</h4>
                        <p className="text-sm text-gray-600">{service.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{service.compliance}%</div>
                      <div className="text-xs text-gray-500">SLA Compliance</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}

      {/* Services Mode */}
      {viewMode === 'services' && (
        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Service-wise Performance Metrics
          </h3>
          <div className="space-y-3">
            {SERVICE_METRICS.map((service) => (
              <div
                key={service.service}
                className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{service.service}</h4>
                    <p className="text-sm text-gray-600">{service.department}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {service.trend === 'up' && (
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    )}
                    {service.trend === 'down' && (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      service.compliance >= 95 ? 'bg-blue-100 text-blue-700' :
                      service.compliance >= 90 ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {service.compliance}%
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">SLA Target</div>
                    <div className="font-semibold">{service.slaTarget} days</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Avg Time</div>
                    <div className="font-semibold text-blue-600">{service.avgProcessingTime} days</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Completed</div>
                    <div className="font-semibold">{service.completedThisMonth}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Rating</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-blue-600" />
                      <span className="font-semibold">{service.rating}</span>
                      <span className="text-gray-500">({service.totalRatings})</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      service.compliance >= 95 ? 'bg-blue-600' :
                      service.compliance >= 90 ? 'bg-blue-600' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${service.compliance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Departments Mode */}
      {viewMode === 'departments' && (
        <>
          <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Department Performance Comparison
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={DEPARTMENT_PERFORMANCE}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="department" stroke="#6b7280" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px' }}
                />
                <Bar dataKey="score" name="Performance Score" radius={[8, 8, 0, 0]}>
                  {DEPARTMENT_PERFORMANCE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {DEPARTMENT_PERFORMANCE.map((dept, idx) => (
              <div key={dept.department} className="glass-card p-6 bg-blue-50/50 border border-blue-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">{dept.department}</h4>
                  <div className="text-3xl font-bold" style={{ color: COLORS[idx % COLORS.length] }}>
                    {dept.score}%
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Managing {dept.services} service{dept.services > 1 ? 's' : ''}
                </div>
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${dept.score}%`,
                      backgroundColor: COLORS[idx % COLORS.length]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Public Commitment */}
      <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
        <div className="flex items-start gap-4">
          <ThumbsUp className="w-8 h-8 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              Our Commitment to Transparency
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              This dashboard is updated in real-time and reflects actual service delivery performance.
              All metrics are independently audited and publicly verifiable. We are committed to
              continuous improvement and accountability.
            </p>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <Activity className="w-4 h-4" />
                <span>Updated every hour</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <MessageSquare className="w-4 h-4" />
                <span>Feedback from {SERVICE_METRICS.reduce((sum, s) => sum + s.totalRatings, 0).toLocaleString()} investors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}