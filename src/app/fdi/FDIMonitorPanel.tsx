// 📊 FDI MONITOR PANEL — Strategic Investment Intelligence Dashboard
// ARCHITECTURE: UI layer reading fdiDataEngine for analytics visualization
// MOUNT: Admin Dashboard + Home Page

import React, { useMemo } from 'react';
import { Card } from '@/app/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  Globe, 
  DollarSign, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Activity
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
  Legend
} from 'recharts';
import {
  getFDIOverview,
  getSectorBreakdown,
  getAgencyWorkload,
  getApprovalVelocity,
  getSystemBottlenecks,
  getCountryBreakdown
} from './fdiDataEngine';
import { useLanguage } from '@/app/components/LanguageContext';

interface FDIMonitorPanelProps {
  compact?: boolean; // For HomePage vs Admin full view
}

export function FDIMonitorPanel({ compact = false }: FDIMonitorPanelProps) {
  const { language } = useLanguage();
  
  // 🎯 DEMO-ONLY: Chinese translations
  const zh: Record<string, string> = {
    fdiMonitor: 'FDI监测',
    liveIntelligence: '实时情报',
    totalProjects: '项目总数',
    investment: '投资额',
    active: '活跃',
    avgApproval: '平均批准时间',
    topSectors: '顶级行业',
    manufacturing: '制造业',
    electronics: '电子产品',
    automotiveParts: '汽车零部件'
  };
  
  const t = (key: string, fallback: string) => {
    if (language === 'zh') {
      return zh[key] || fallback;
    }
    return fallback;
  };

  // 🎯 CHINESE NUMBER CONVERTER
  const toChineseNumber = (num: number | string): string => {
    if (language !== 'zh') return String(num);
    
    const n = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(n)) return String(num);
    
    const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    
    // Handle decimals
    if (n !== Math.floor(n)) {
      const [integer, decimal] = String(n).split('.');
      const intChinese = toChineseNumber(parseInt(integer));
      const decChinese = decimal.split('').map(d => digits[parseInt(d)]).join('');
      return `${intChinese}点${decChinese}`;
    }
    
    // Simple numbers 0-99
    if (n === 0) return '零';
    if (n < 10) return digits[n];
    if (n === 10) return '十';
    if (n < 20) return '十' + digits[n % 10];
    if (n < 100) {
      const tens = Math.floor(n / 10);
      const ones = n % 10;
      return digits[tens] + '十' + (ones > 0 ? digits[ones] : '');
    }
    
    // For larger numbers, convert digit by digit
    return String(n).split('').map(d => d === '.' ? '点' : digits[parseInt(d)] || d).join('');
  };
  
  // 📊 LIVE DATA FROM ENGINE
  const overview = useMemo(() => getFDIOverview(), []);
  const sectorData = useMemo(() => getSectorBreakdown(), []);
  const agencyLoad = useMemo(() => getAgencyWorkload(), []);
  const velocity = useMemo(() => getApprovalVelocity(), []);
  const bottlenecks = useMemo(() => getSystemBottlenecks(), []);
  const countries = useMemo(() => getCountryBreakdown(), []);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'moderate': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'severe': return 'bg-red-100 text-red-800 border-red-300';
      case 'critical': return 'bg-red-200 text-red-900 border-red-400';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (compact) {
    // COMPACT VIEW FOR HOMEPAGE
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">📊 {t('fdiMonitor', 'FDI Monitor')}</h3>
          <span className="text-sm text-gray-600">{t('liveIntelligence', 'Live Intelligence')}</span>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{toChineseNumber(overview.totalProjects)}</div>
                <div className="text-xs text-gray-600">{t('totalProjects', 'Total Projects')}</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ${toChineseNumber((overview.totalInvestment / 1000000000).toFixed(1))}B
                </div>
                <div className="text-xs text-gray-600">{t('investment', 'Investment')}</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{toChineseNumber(overview.activeProjects)}</div>
                <div className="text-xs text-gray-600">{t('active', 'Active')}</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{toChineseNumber(overview.avgApprovalTime)}d</div>
                <div className="text-xs text-gray-600">{t('avgApproval', 'Avg Approval')}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Top Sectors */}
        <Card className="p-4">
          <h4 className="font-semibold text-gray-900 mb-3">{t('topSectors', 'Top Sectors')}</h4>
          <div className="space-y-2">
            {sectorData.slice(0, 3).map((sector, idx) => {
              // Translate sector names
              let sectorName = sector.sector;
              if (language === 'zh') {
                if (sector.sector === 'Manufacturing') sectorName = t('manufacturing', 'Manufacturing');
                else if (sector.sector === 'Electronics') sectorName = t('electronics', 'Electronics');
                else if (sector.sector === 'Automotive Parts') sectorName = t('automotiveParts', 'Automotive Parts');
              }
              
              return (
                <div key={sector.sector} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: COLORS[idx] }} />
                    <span className="text-sm text-gray-700">{sectorName}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    ${toChineseNumber((sector.totalInvestment / 1000000).toFixed(1))}M
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }

  // FULL VIEW FOR ADMIN DASHBOARD
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">📊 FDI Intelligence Monitor</h2>
          <p className="text-sm text-gray-600 mt-1">
            Real-time analytics from operational workflow engine
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
          <Activity className="w-4 h-4" />
          <span>Live Data</span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{overview.totalProjects}</div>
          <div className="text-sm text-gray-600">Total Projects</div>
          <div className="mt-2 text-xs text-green-600 font-medium">
            {overview.activeProjects} active, {overview.completedProjects} completed
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            ${(overview.totalInvestment / 1000000000).toFixed(2)}B
          </div>
          <div className="text-sm text-gray-600">Total Investment</div>
          <div className="mt-2 text-xs text-green-600 font-medium">
            ${(overview.totalRevenue / 1000000).toFixed(1)}M in revenue
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{overview.topCountry}</div>
          <div className="text-sm text-gray-600">Top Source Country</div>
          <div className="mt-2 text-xs text-gray-600 font-medium">
            Leading in {overview.topSector}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <TrendingDown className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{overview.avgApprovalTime}</div>
          <div className="text-sm text-gray-600">Avg Approval Days</div>
          <div className="mt-2 text-xs text-orange-600 font-medium">
            Target: 45 days
          </div>
        </Card>
      </div>

      {/* Charts Row 1: Sector Breakdown & Approval Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Investment Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment by Sector</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sectorData.slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="sector" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: number) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Bar dataKey="totalInvestment" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Approval Velocity Trends */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Velocity (6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={velocity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="approvals" stroke="#10b981" strokeWidth={2} name="Approvals" />
              <Line type="monotone" dataKey="rejections" stroke="#ef4444" strokeWidth={2} name="Rejections" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2: Agency Workload & Country Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agency Workload */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Agency Workload Analysis</h3>
          <div className="space-y-3">
            {agencyLoad.slice(0, 6).map((agency) => (
              <div key={agency.agency} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{agency.agency}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getWorkloadColor(agency.workload)}`}>
                      {agency.workload}
                    </span>
                    <span className="text-xs text-gray-600">{agency.totalApplications} apps</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div 
                    className="h-2 bg-yellow-400 rounded-l"
                    style={{ width: `${(agency.pending / agency.totalApplications) * 100}%` }}
                    title={`Pending: ${agency.pending}`}
                  />
                  <div 
                    className="h-2 bg-blue-400"
                    style={{ width: `${(agency.inProgress / agency.totalApplications) * 100}%` }}
                    title={`In Progress: ${agency.inProgress}`}
                  />
                  <div 
                    className="h-2 bg-green-400 rounded-r"
                    style={{ width: `${(agency.approved / agency.totalApplications) * 100}%` }}
                    title={`Approved: ${agency.approved}`}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{agency.pending} pending</span>
                  <span>{agency.inProgress} in progress</span>
                  <span>{agency.approved} approved</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Country Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment by Source Country</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={countries.slice(0, 6)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ country, percent }) => `${country} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="investment"
              >
                {countries.slice(0, 6).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `$${(value / 1000000).toFixed(1)}M`}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* System Bottlenecks */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">🚨 System Bottlenecks</h3>
          <span className="text-sm text-gray-600">SLA violations & delays</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-medium text-gray-600 pb-3">Service</th>
                <th className="text-left text-xs font-medium text-gray-600 pb-3">Agency</th>
                <th className="text-left text-xs font-medium text-gray-600 pb-3">Avg Delay</th>
                <th className="text-left text-xs font-medium text-gray-600 pb-3">Projects</th>
                <th className="text-left text-xs font-medium text-gray-600 pb-3">Severity</th>
              </tr>
            </thead>
            <tbody>
              {bottlenecks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-sm">No bottlenecks detected</div>
                  </td>
                </tr>
              ) : (
                bottlenecks.slice(0, 5).map((bottleneck) => (
                  <tr key={bottleneck.serviceId} className="border-b border-gray-100">
                    <td className="py-3 text-sm text-gray-900">{bottleneck.serviceName}</td>
                    <td className="py-3 text-sm text-gray-600">{bottleneck.agency}</td>
                    <td className="py-3 text-sm font-semibold text-orange-600">+{bottleneck.averageDelay} days</td>
                    <td className="py-3 text-sm text-gray-600">{bottleneck.impactedProjects}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(bottleneck.severity)}`}>
                        {bottleneck.severity}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}