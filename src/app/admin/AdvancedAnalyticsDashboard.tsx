/**
 * 📊 ADVANCED ANALYTICS DASHBOARD FOR GOVERNMENT
 * 
 * Complete Business Intelligence Platform for Policymakers with:
 * 1. Real-Time Metrics (FDI pipeline, conversion rates, bottlenecks, geography)
 * 2. Predictive Analytics (FDI projections, sector trends, early warnings)
 * 3. Comparative Benchmarking (Bangladesh vs competitors, zone performance, agency rankings)
 * 4. User Behavior Insights (feature usage, friction points, search queries, chatbot trends)
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  MapPin,
  Building2,
  DollarSign,
  Users,
  Clock,
  Target,
  BarChart3,
  Activity,
  Globe,
  Zap,
  Search,
  MessageSquare,
  MousePointer,
  Eye,
  Filter,
  Download,
  Calendar,
  Award
} from 'lucide-react';

// Mock data for geographic distribution (Bangladesh divisions)
const BANGLADESH_DIVISIONS = [
  { name: 'Dhaka', keyIndustries: ['ICT & Software', 'Financial Services', 'Pharmaceuticals'] },
  { name: 'Chattogram', keyIndustries: ['RMG & Textiles', 'Logistics & Transport', 'Manufacturing'] },
  { name: 'Khulna', keyIndustries: ['Shipbuilding', 'Shrimp Processing', 'Jute'] },
  { name: 'Rajshahi', keyIndustries: ['Agriculture', 'Silk Production', 'Dairy'] },
  { name: 'Sylhet', keyIndustries: ['Tea Production', 'Natural Gas', 'Tourism'] },
  { name: 'Barishal', keyIndustries: ['Rice Mills', 'Fishing', 'Coconut Processing'] },
  { name: 'Rangpur', keyIndustries: ['Tobacco', 'Dairy', 'Textiles'] },
  { name: 'Mymensingh', keyIndustries: ['Agriculture', 'Food Processing', 'Handicrafts'] }
];

// Mock data for SEZs
const BANGLADESH_SEZS = [
  { name: 'Mongla Economic Zone', location: 'Bagerhat' },
  { name: 'Mirsarai Economic Zone', location: 'Chattogram' },
  { name: 'Moheshkhali Economic Zone', location: 'Cox\'s Bazar' },
  { name: 'Anwara Economic Zone', location: 'Chattogram' },
  { name: 'Sirajganj Economic Zone', location: 'Sirajganj' },
  { name: 'Jamalpur Economic Zone', location: 'Jamalpur' }
];

export function AdvancedAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  // ============================================
  // 1. REAL-TIME METRICS
  // ============================================
  
  // FDI Pipeline Value (Applications in Progress)
  const pipelineMetrics = {
    totalValue: 2.34, // billion USD
    applications: 127,
    avgTicketSize: 18.4, // million USD
    byStage: [
      { stage: 'Inquiry', count: 43, value: 0.52 },
      { stage: 'Application', count: 38, value: 0.89 },
      { stage: 'Under Review', count: 28, value: 0.62 },
      { stage: 'Approved', count: 18, value: 0.31 }
    ]
  };

  // Conversion Rate (Inquiries → Applications → Approvals)
  const conversionFunnel = [
    { stage: 'Inquiry', count: 450, percentage: 100, conversion: null },
    { stage: 'Application Submitted', count: 315, percentage: 70, conversion: 70 },
    { stage: 'Under Review', count: 189, percentage: 42, conversion: 60 },
    { stage: 'Approved', count: 142, percentage: 31.6, conversion: 75 },
    { stage: 'Operational', count: 98, percentage: 21.8, conversion: 69 }
  ];

  // Bottleneck Identification
  const bottlenecks = [
    { 
      step: 'Environmental Clearance', 
      agency: 'Department of Environment',
      avgDays: 42, 
      targetDays: 21,
      delayFactor: 2.0,
      affectedApps: 23,
      severity: 'critical'
    },
    { 
      step: 'Fire Safety Certificate', 
      agency: 'Fire Service & Civil Defence',
      avgDays: 28, 
      targetDays: 15,
      delayFactor: 1.87,
      affectedApps: 18,
      severity: 'high'
    },
    { 
      step: 'Factory Inspection', 
      agency: 'DIFE',
      avgDays: 19, 
      targetDays: 10,
      delayFactor: 1.9,
      affectedApps: 15,
      severity: 'high'
    },
    { 
      step: 'Trade License', 
      agency: 'City Corporation',
      avgDays: 14, 
      targetDays: 7,
      delayFactor: 2.0,
      affectedApps: 31,
      severity: 'medium'
    }
  ];

  // Geographic Distribution
  const geographicData = BANGLADESH_DIVISIONS.map(div => ({
    division: div.name,
    applications: Math.floor(Math.random() * 50) + 10,
    totalValue: (Math.random() * 500 + 100).toFixed(2),
    topSectors: div.keyIndustries.slice(0, 2)
  }));

  // ============================================
  // 2. PREDICTIVE ANALYTICS
  // ============================================
  
  // FDI Projection
  const fdiProjection = {
    currentQuarter: 1.7, // billion USD (from canonical data)
    nextQuarter: 2.3,
    confidence: 87,
    trend: 'up',
    factors: [
      { factor: 'Pipeline velocity increasing', impact: '+0.4B' },
      { factor: 'Avg approval time decreased 12%', impact: '+0.2B' },
      { factor: 'Global textile demand rising', impact: '+0.3B' },
      { factor: 'Seasonal slowdown expected', impact: '-0.3B' }
    ]
  };

  // Sector Trend Analysis
  const sectorTrends = [
    { sector: 'Pharmaceuticals', growth: -15, applications: 12, trend: 'down', alert: 'Applications in pharma sector declined 15% this month' },
    { sector: 'Textile & Garment', growth: 8, applications: 45, trend: 'stable', alert: null },
    { sector: 'IT & Software', growth: 22, applications: 8, trend: 'up', alert: null },
    { sector: 'Manufacturing', growth: 12, applications: 28, trend: 'up', alert: null },
    { sector: 'Renewable Energy', growth: 18, applications: 7, trend: 'up', alert: null }
  ];

  // ============================================
  // 3. COMPARATIVE BENCHMARKING
  // ============================================
  
  // Bangladesh vs. Competitors
  const competitorComparison = [
    { country: 'Bangladesh', processingTime: 45, cost: 820, rank: 1, change: 0 },
    { country: 'Vietnam', processingTime: 38, cost: 950, rank: 2, change: 0 },
    { country: 'India', processingTime: 62, cost: 1240, rank: 5, change: -1 },
    { country: 'Indonesia', processingTime: 51, cost: 1080, rank: 3, change: +1 },
    { country: 'Thailand', processingTime: 48, cost: 1150, rank: 4, change: -1 }
  ];

  // Zone Performance Comparison
  const zonePerformance = BANGLADESH_SEZS.map(sez => ({
    zone: sez.name,
    occupancy: Math.floor(Math.random() * 40) + 40,
    avgApprovalTime: Math.floor(Math.random() * 20) + 25,
    satisfaction: Math.floor(Math.random() * 20) + 75,
    investmentValue: (Math.random() * 200 + 50).toFixed(1)
  }));

  // Agency Efficiency Rankings
  const agencyRankings = [
    { agency: 'NBR (Tax)', completionRate: 94, avgDays: 3.2, rank: 1 },
    { agency: 'BIDA One-Stop Service', completionRate: 91, avgDays: 5.1, rank: 2 },
    { agency: 'RJSC', completionRate: 88, avgDays: 7.5, rank: 3 },
    { agency: 'Bangladesh Bank', completionRate: 85, avgDays: 8.2, rank: 4 },
    { agency: 'City Corporation', completionRate: 78, avgDays: 14.3, rank: 5 },
    { agency: 'Fire Service', completionRate: 72, avgDays: 19.8, rank: 6 },
    { agency: 'Department of Environment', completionRate: 68, avgDays: 24.5, rank: 7 }
  ];

  // ============================================
  // 4. USER BEHAVIOR INSIGHTS
  // ============================================
  
  // Feature Usage Analytics
  const featureUsage = [
    { feature: 'Document Upload', usage: 92, avgTime: '2m 14s', completionRate: 87 },
    { feature: 'Payment Gateway', usage: 89, avgTime: '1m 43s', completionRate: 94 },
    { feature: 'Journey Tracker', usage: 78, avgTime: '3m 21s', completionRate: 100 },
    { feature: 'AI Chatbot', usage: 64, avgTime: '5m 12s', completionRate: 71 },
    { feature: 'Sector Directory', usage: 58, avgTime: '7m 45s', completionRate: 82 },
    { feature: 'Incentive Calculator', usage: 52, avgTime: '4m 33s', completionRate: 68 },
    { feature: 'Developer Portal', usage: 23, avgTime: '11m 22s', completionRate: 45 }
  ];

  // Where Users Get Stuck (Friction Points)
  const frictionPoints = [
    { page: 'Document Upload - Trade License', abandonRate: 34, issue: 'File size limit confusion', users: 127 },
    { page: 'Payment - Bank Transfer', abandonRate: 28, issue: 'Unclear instructions', users: 89 },
    { page: 'Registration - Company Info', abandonRate: 22, issue: 'Too many required fields', users: 76 },
    { page: 'Incentive Calculator', abandonRate: 19, issue: 'Complex eligibility criteria', users: 54 }
  ];

  // Common Search Queries
  const searchQueries = [
    { query: 'tax exemption eligibility', count: 342, intent: 'Incentive information gap' },
    { query: 'environmental clearance requirements', count: 298, intent: 'Process unclear' },
    { query: 'how long approval takes', count: 276, intent: 'Timeline transparency needed' },
    { query: 'sector-specific incentives', count: 213, intent: 'Sector directory usage' },
    { query: 'appeal rejected application', count: 187, intent: 'Grievance feature awareness' }
  ];

  // Chatbot Question Trends
  const chatbotTrends = [
    { category: 'Approval Timeline', questions: 456, avgSatisfaction: 78, trend: 'stable' },
    { category: 'Document Requirements', questions: 389, avgSatisfaction: 82, trend: 'up' },
    { category: 'Tax & Incentives', questions: 312, avgSatisfaction: 71, trend: 'down' },
    { category: 'Zone Information', questions: 234, avgSatisfaction: 85, trend: 'up' },
    { category: 'Banking Setup', questions: 198, avgSatisfaction: 88, trend: 'up' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Activity className="w-10 h-10 text-blue-600" />
            Advanced Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Business Intelligence Platform for Data-Driven Policy Decisions
          </p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex gap-2">
          {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ==================== SECTION 1: REAL-TIME METRICS ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <Zap className="w-7 h-7 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-900">1. Real-Time Metrics</h2>
        </div>

        {/* FDI Pipeline Value */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">FDI Pipeline Value</h3>
              <p className="text-gray-600">Applications currently in progress</p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-4xl font-bold text-blue-600">${pipelineMetrics.totalValue}B</p>
              <p className="text-sm text-gray-600 mt-1">Total Pipeline</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-4xl font-bold text-purple-600">{pipelineMetrics.applications}</p>
              <p className="text-sm text-gray-600 mt-1">Active Applications</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-4xl font-bold text-green-600">${pipelineMetrics.avgTicketSize}M</p>
              <p className="text-sm text-gray-600 mt-1">Avg Ticket Size</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-4xl font-bold text-orange-600">+15%</p>
              <p className="text-sm text-gray-600 mt-1">vs. Last Month</p>
            </div>
          </div>

          {/* Pipeline by Stage */}
          <div className="bg-white rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-4">Pipeline Distribution by Stage</h4>
            <div className="space-y-3">
              {pipelineMetrics.byStage.map((stage, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-700">{stage.stage}</span>
                    <span className="text-sm text-gray-600">{stage.count} apps • ${stage.value}B</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      style={{ width: `${(stage.value / pipelineMetrics.totalValue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Conversion Rate Analysis</h3>
              <p className="text-gray-600">Inquiries → Applications → Approvals</p>
            </div>
          </div>
          
          <div className="relative">
            {conversionFunnel.map((stage, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      idx === 0 ? 'bg-blue-600' :
                      idx === 1 ? 'bg-purple-600' :
                      idx === 2 ? 'bg-indigo-600' :
                      idx === 3 ? 'bg-green-600' :
                      'bg-emerald-600'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{stage.stage}</p>
                      <p className="text-sm text-gray-600">{stage.count} applications</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{stage.percentage.toFixed(1)}%</p>
                    {stage.conversion !== null && (
                      <p className={`text-sm font-semibold ${
                        stage.conversion >= 70 ? 'text-green-600' :
                        stage.conversion >= 50 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {stage.conversion}% conversion
                      </p>
                    )}
                  </div>
                </div>
                {idx < conversionFunnel.length - 1 && (
                  <div className="ml-5 h-6 w-0.5 bg-gray-300" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-700">
              <strong className="text-green-700">Overall Conversion Rate:</strong> 21.8% of inquiries become operational businesses
              (Industry benchmark: 15-18%)
            </p>
          </div>
        </div>

        {/* Bottleneck Identification */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-red-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Bottleneck Identification</h3>
              <p className="text-gray-600">Approval steps taking longest vs. target SLA</p>
            </div>
          </div>

          <div className="space-y-4">
            {bottlenecks.map((bottleneck, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl border-2 ${
                  bottleneck.severity === 'critical' ? 'bg-red-100 border-red-300' :
                  bottleneck.severity === 'high' ? 'bg-orange-100 border-orange-300' :
                  'bg-yellow-100 border-yellow-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{bottleneck.step}</h4>
                    <p className="text-sm text-gray-700">{bottleneck.agency}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full font-bold uppercase text-xs ${
                    bottleneck.severity === 'critical' ? 'bg-red-600 text-white' :
                    bottleneck.severity === 'high' ? 'bg-orange-600 text-white' :
                    'bg-yellow-600 text-white'
                  }`}>
                    {bottleneck.severity}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Avg Processing</p>
                    <p className="text-2xl font-bold text-gray-900">{bottleneck.avgDays} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Target SLA</p>
                    <p className="text-2xl font-bold text-green-600">{bottleneck.targetDays} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delay Factor</p>
                    <p className="text-2xl font-bold text-red-600">{bottleneck.delayFactor}x</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Affected Apps</p>
                    <p className="text-2xl font-bold text-purple-600">{bottleneck.affectedApps}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all">
            Generate Bottleneck Resolution Report →
          </button>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Geographic Distribution</h3>
              <p className="text-gray-600">Investment spread across Bangladesh divisions</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {geographicData.map((division, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">{division.division}</h4>
                  <span className="text-2xl font-bold text-blue-600">{division.applications}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Total Value: <strong>${division.totalValue}M</strong>
                </p>
                <div className="flex gap-2">
                  {division.topSectors.map((sector, sidx) => (
                    <span key={sidx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ==================== SECTION 2: PREDICTIVE ANALYTICS ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <TrendingUp className="w-7 h-7 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">2. Predictive Analytics</h2>
        </div>

        {/* FDI Projection */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">FDI Inflow Projection</h3>
              <p className="text-gray-600">AI-powered forecast based on current pipeline</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6">
              <p className="text-sm text-gray-600 mb-2">Current Quarter (Q1 2026)</p>
              <p className="text-5xl font-bold text-gray-900">${fdiProjection.currentQuarter}B</p>
              <p className="text-sm text-green-600 font-semibold mt-2">✓ On track</p>
            </div>
            <div className="bg-gradient-to-br from-green-50/30 via-emerald-50/20 to-green-50/30 rounded-xl p-6 border border-gray-100/50">
              <p className="text-sm text-gray-600 mb-2">Projected Next Quarter (Q2 2026)</p>
              <p className="text-5xl font-bold text-gray-900">${fdiProjection.nextQuarter}B</p>
              <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +35% increase • {fdiProjection.confidence}% confidence
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-4">Projection Factors</h4>
            <div className="space-y-3">
              {fdiProjection.factors.map((factor, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{factor.factor}</p>
                  <span className={`font-bold ${factor.impact.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {factor.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sector Trend Analysis & Early Warnings */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-8 h-8 text-indigo-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Sector Trend Analysis</h3>
              <p className="text-gray-600">Month-over-month growth with early warnings</p>
            </div>
          </div>

          <div className="space-y-3">
            {sectorTrends.map((sector, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{sector.sector}</h4>
                    <p className="text-sm text-gray-600">{sector.applications} applications this month</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${
                        sector.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {sector.growth > 0 ? '+' : ''}{sector.growth}%
                      </p>
                      <p className="text-sm text-gray-600">MoM Growth</p>
                    </div>
                    {sector.trend === 'up' ? (
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    ) : sector.trend === 'down' ? (
                      <TrendingDown className="w-6 h-6 text-red-600" />
                    ) : (
                      <Activity className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {sector.alert && (
                  <div className="mt-2 p-4 bg-red-50 border-l-4 border-red-600 rounded">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <p className="text-sm font-semibold text-red-900">Early Warning:</p>
                    </div>
                    <p className="text-sm text-red-700 mt-1">{sector.alert}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ==================== SECTION 3: COMPARATIVE BENCHMARKING ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <Globe className="w-7 h-7 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">3. Comparative Benchmarking</h2>
        </div>

        {/* Bangladesh vs. Competitors */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Bangladesh vs. Regional Competitors</h3>
              <p className="text-gray-600">Processing time and cost comparison</p>
            </div>
          </div>

          <div className="space-y-3">
            {competitorComparison.map((country, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl ${
                  country.country === 'Bangladesh'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                    : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl font-bold ${
                      country.country === 'Bangladesh' ? 'text-white' : 'text-gray-400'
                    }`}>
                      #{country.rank}
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold ${
                        country.country === 'Bangladesh' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {country.country}
                        {country.country === 'Bangladesh' && ' 🇧🇩'}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className={`text-sm ${
                        country.country === 'Bangladesh' ? 'text-green-100' : 'text-gray-600'
                      }`}>
                        Processing Time
                      </p>
                      <p className={`text-2xl font-bold ${
                        country.country === 'Bangladesh' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {country.processingTime} days
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm ${
                        country.country === 'Bangladesh' ? 'text-green-100' : 'text-gray-600'
                      }`}>
                        Setup Cost
                      </p>
                      <p className={`text-2xl font-bold ${
                        country.country === 'Bangladesh' ? 'text-white' : 'text-gray-900'
                      }`}>
                        ${country.cost}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone Performance Comparison */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">SEZ Performance Comparison</h3>
              <p className="text-gray-600">Occupancy, efficiency, and satisfaction metrics</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {zonePerformance.map((zone, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-4">{zone.zone}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Occupancy</p>
                    <p className="text-2xl font-bold text-blue-600">{zone.occupancy}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Investment</p>
                    <p className="text-2xl font-bold text-green-600">${zone.investmentValue}M</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Approval</p>
                    <p className="text-2xl font-bold text-purple-600">{zone.avgApprovalTime}d</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Satisfaction</p>
                    <p className="text-2xl font-bold text-orange-600">{zone.satisfaction}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agency Efficiency Rankings */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Agency Efficiency Rankings</h3>
              <p className="text-gray-600">Completion rate and average processing time</p>
            </div>
          </div>

          <div className="space-y-3">
            {agencyRankings.map((agency, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    idx < 3 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gray-400'
                  }`}>
                    {agency.rank}
                  </div>
                  <p className="font-bold text-gray-900">{agency.agency}</p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Completion Rate</p>
                    <p className={`text-xl font-bold ${
                      agency.completionRate >= 85 ? 'text-green-600' :
                      agency.completionRate >= 70 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {agency.completionRate}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Avg Processing</p>
                    <p className="text-xl font-bold text-gray-900">{agency.avgDays} days</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ==================== SECTION 4: USER BEHAVIOR INSIGHTS ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <Users className="w-7 h-7 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">4. User Behavior Insights</h2>
        </div>

        {/* Feature Usage Analytics */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <MousePointer className="w-8 h-8 text-indigo-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Feature Usage Analytics</h3>
              <p className="text-gray-600">Which features are most/least used</p>
            </div>
          </div>

          <div className="space-y-3">
            {featureUsage.map((feature, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">{feature.feature}</h4>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Usage Rate</p>
                      <p className="text-xl font-bold text-blue-600">{feature.usage}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Avg Time</p>
                      <p className="text-xl font-bold text-purple-600">{feature.avgTime}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Completion</p>
                      <p className={`text-xl font-bold ${
                        feature.completionRate >= 80 ? 'text-green-600' :
                        feature.completionRate >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {feature.completionRate}%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    style={{ width: `${feature.usage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Friction Points (Where Users Get Stuck) */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-red-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Friction Points</h3>
              <p className="text-gray-600">Where users get stuck and abandon</p>
            </div>
          </div>

          <div className="space-y-4">
            {frictionPoints.map((point, idx) => (
              <div key={idx} className="p-6 bg-white rounded-xl border-2 border-orange-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-900">{point.page}</h4>
                  <span className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-full">
                    {point.abandonRate}% abandon rate
                  </span>
                </div>
                <p className="text-gray-700 mb-2"><strong>Issue:</strong> {point.issue}</p>
                <p className="text-sm text-gray-600">{point.users} users affected this month</p>
                <button className="mt-3 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all">
                  Create Improvement Ticket
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Common Search Queries */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Common Search Queries</h3>
              <p className="text-gray-600">Reveals unmet information needs</p>
            </div>
          </div>

          <div className="space-y-3">
            {searchQueries.map((query, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <p className="font-bold text-gray-900">"{query.query}"</p>
                  <p className="text-sm text-blue-600 mt-1">→ {query.intent}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{query.count}</p>
                  <p className="text-sm text-gray-600">searches</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              <strong className="text-blue-700">Insight:</strong> High search volume for "tax exemption eligibility" suggests need for
              improved Incentive Calculator visibility
            </p>
          </div>
        </div>

        {/* Chatbot Question Trends */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">AI Chatbot Question Trends</h3>
              <p className="text-gray-600">Most common question categories and satisfaction</p>
            </div>
          </div>

          <div className="space-y-3">
            {chatbotTrends.map((category, idx) => (
              <div key={idx} className="p-6 bg-white rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900">{category.category}</h4>
                    <p className="text-sm text-gray-600">{category.questions} questions this month</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Satisfaction</p>
                      <p className={`text-2xl font-bold ${
                        category.avgSatisfaction >= 80 ? 'text-green-600' :
                        category.avgSatisfaction >= 70 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {category.avgSatisfaction}%
                      </p>
                    </div>
                    {category.trend === 'up' ? (
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    ) : category.trend === 'down' ? (
                      <TrendingDown className="w-6 h-6 text-red-600" />
                    ) : (
                      <Activity className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${category.avgSatisfaction}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Export Controls */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-blue-50/30 rounded-2xl border border-gray-100/50">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Export Analytics Report</h3>
          <p className="text-gray-600 mt-1">Download complete dashboard data for policy review</p>
        </div>
        <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2">
          <Download className="w-5 h-5" />
          Download PDF Report
        </button>
      </div>
    </div>
  );
}