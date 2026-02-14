// ⚠️ COMPLIANCE ALERTS — Real-Time Regulatory Monitoring & Alert System
// ARCHITECTURE: Proactive notification engine for regulatory changes and deadlines
// SOURCE: Government regulations + compliance calendar + policy updates
// MOUNT: InvestorPortal (Compliance tab) + Dashboard notifications

import React, { useState, useMemo } from 'react';
import { Card } from '@/app/components/ui/card';
import { 
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  AlertCircle,
  Info,
  Shield,
  FileText,
  Calendar,
  TrendingUp,
  Filter,
  Search,
  Download,
  Settings,
  Mail,
  MessageSquare,
  Zap,
  Target,
  Building2,
  Globe,
  Briefcase,
  X,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/app/components/LanguageContext';
import { useAuth } from '@/contexts/AuthContext'; // ✅ ADDED: Authentication gate

// 🔌 ENGINE IMPORTS - Workflow-Driven Compliance
import { getPipeline, getAllPipelines } from '@/app/gov-agencies/agencyWorkflowEngine';
import { paymentRegistry } from '@/app/payments/paymentRegistry';
import { getCertificates } from '@/app/certificates/certificateEngine';

interface ComplianceAlert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  category: 'deadline' | 'regulation-change' | 'policy-update' | 'license-renewal' | 'tax-filing' | 'reporting';
  title: string;
  description: string;
  dueDate?: Date;
  dateIssued: Date;
  affectedEntities: string[];
  actionRequired: string;
  relatedLinks?: string[];
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed';
  source: string;
  daysUntilDue?: number;
}

interface ComplianceCategory {
  id: string;
  name: string;
  icon: any;
  activeAlerts: number;
  upcomingDeadlines: number;
}

const COMPLIANCE_ALERTS: ComplianceAlert[] = [
  {
    id: 'alert-1',
    severity: 'critical',
    category: 'deadline',
    title: 'Annual Tax Return Filing Deadline - 7 Days',
    description: 'Corporate income tax return for fiscal year 2024 must be filed by February 15, 2025',
    dueDate: new Date('2025-02-15'),
    dateIssued: new Date('2025-02-01'),
    affectedEntities: ['All Foreign Companies'],
    actionRequired: 'File annual tax return with NBR through online portal',
    relatedLinks: ['NBR Online Portal', 'Tax Return Guide'],
    status: 'active',
    source: 'National Board of Revenue (NBR)',
    daysUntilDue: 7
  },
  {
    id: 'alert-2',
    severity: 'high',
    category: 'license-renewal',
    title: 'Trade License Renewal Due',
    description: 'City Corporation trade license expires on February 28, 2025. Renewal application should be submitted at least 15 days before expiry',
    dueDate: new Date('2025-02-13'),
    dateIssued: new Date('2025-01-28'),
    affectedEntities: ['Companies in Dhaka, Chittagong'],
    actionRequired: 'Submit trade license renewal application with required documents',
    relatedLinks: ['City Corporation Portal', 'Renewal Checklist'],
    status: 'active',
    source: 'City Corporation',
    daysUntilDue: 5
  },
  {
    id: 'alert-3',
    severity: 'high',
    category: 'regulation-change',
    title: 'New Environmental Compliance Requirements for Manufacturing',
    description: 'Department of Environment has updated ETP (Effluent Treatment Plant) standards effective March 1, 2025',
    dueDate: new Date('2025-03-01'),
    dateIssued: new Date('2025-02-03'),
    affectedEntities: ['Manufacturing Companies', 'Textile Industry'],
    actionRequired: 'Review new standards and submit compliance plan if applicable',
    relatedLinks: ['DOE Notification', 'Compliance Guidelines'],
    status: 'active',
    source: 'Department of Environment (DOE)',
    daysUntilDue: 22
  },
  {
    id: 'alert-4',
    severity: 'medium',
    category: 'policy-update',
    title: 'Updated Export Incentive Rates Announced',
    description: 'Government has revised cash incentive rates for priority export products from 10% to 12%',
    dateIssued: new Date('2025-01-25'),
    affectedEntities: ['Export-Oriented Companies'],
    actionRequired: 'Review new rates and adjust export projections',
    relatedLinks: ['Ministry of Commerce Notice', 'Incentive Calculator'],
    status: 'acknowledged',
    source: 'Ministry of Commerce'
  },
  {
    id: 'alert-5',
    severity: 'critical',
    category: 'deadline',
    title: 'Work Permit Renewal - 14 Days',
    description: 'Work permits for 3 foreign employees expire on February 22, 2025',
    dueDate: new Date('2025-02-22'),
    dateIssued: new Date('2025-01-08'),
    affectedEntities: ['Companies with Foreign Staff'],
    actionRequired: 'Submit work permit renewal applications through BIDA',
    relatedLinks: ['BIDA Work Permit Portal', 'Required Documents'],
    status: 'active',
    source: 'BIDA Immigration Services',
    daysUntilDue: 14
  },
  {
    id: 'alert-6',
    severity: 'medium',
    category: 'reporting',
    title: 'Quarterly Financial Report Due',
    description: 'Submit Q4 2024 financial report to Bangladesh Bank',
    dueDate: new Date('2025-02-20'),
    dateIssued: new Date('2025-02-01'),
    affectedEntities: ['Foreign-Owned Companies'],
    actionRequired: 'Prepare and submit financial report in prescribed format',
    relatedLinks: ['Report Template', 'Submission Portal'],
    status: 'active',
    source: 'Bangladesh Bank',
    daysUntilDue: 12
  },
  {
    id: 'alert-7',
    severity: 'info',
    category: 'policy-update',
    title: 'New Tax Holiday Benefits for IT Sector',
    description: 'Extended tax exemption period from 5 to 7 years for IT/software companies',
    dateIssued: new Date('2025-01-30'),
    affectedEntities: ['IT & Software Companies'],
    actionRequired: 'Review eligibility criteria and apply if qualified',
    relatedLinks: ['NBR Circular', 'Application Form'],
    status: 'active',
    source: 'National Board of Revenue (NBR)'
  },
  {
    id: 'alert-8',
    severity: 'low',
    category: 'regulation-change',
    title: 'Updated Labor Law Guidelines',
    description: 'Ministry of Labour has published updated guidelines for workplace safety and employee welfare',
    dueDate: new Date('2025-03-15'),
    dateIssued: new Date('2025-02-05'),
    affectedEntities: ['All Employers'],
    actionRequired: 'Review guidelines and ensure compliance',
    relatedLinks: ['Labour Ministry Portal', 'Safety Guidelines'],
    status: 'active',
    source: 'Ministry of Labour',
    daysUntilDue: 37
  }
];

const COMPLIANCE_CATEGORIES: ComplianceCategory[] = [
  { id: 'all', name: 'All Alerts', icon: Bell, activeAlerts: 8, upcomingDeadlines: 5 },
  { id: 'deadline', name: 'Deadlines', icon: Clock, activeAlerts: 3, upcomingDeadlines: 3 },
  { id: 'regulation-change', name: 'Regulations', icon: FileText, activeAlerts: 2, upcomingDeadlines: 1 },
  { id: 'policy-update', name: 'Policy Updates', icon: Info, activeAlerts: 2, upcomingDeadlines: 0 },
  { id: 'license-renewal', name: 'Renewals', icon: Shield, activeAlerts: 1, upcomingDeadlines: 1 },
  { id: 'tax-filing', name: 'Tax Filing', icon: Briefcase, activeAlerts: 0, upcomingDeadlines: 0 },
  { id: 'reporting', name: 'Reporting', icon: TrendingUp, activeAlerts: 1, upcomingDeadlines: 1 }
];

/**
 * 🔌 ENGINE-DRIVEN COMPLIANCE ALERT GENERATOR
 * Generates alerts from LIVE workflow data instead of static arrays
 * 
 * INTELLIGENCE LAYER TEST:
 * - If agencyWorkflowEngine is deleted, this function breaks ✅
 * - If certificateEngine is deleted, certificate renewal alerts break ✅
 * - Alerts are calculated from real approval expiry dates
 */
function generateAlertsFromWorkflow(investorId: string): ComplianceAlert[] {
  const generatedAlerts: ComplianceAlert[] = [];
  
  // Get investor's pipeline
  const pipeline = getPipeline(investorId);
  if (!pipeline) return generatedAlerts;
  
  const bbid = `BBID-${investorId}`;
  
  // 1️⃣ GENERATE LICENSE RENEWAL ALERTS from approved steps
  pipeline.approvalSteps
    .filter(step => step.status === 'approved')
    .forEach(step => {
      // Calculate expiry date (1 year from approval for most licenses)
      const approvalDate = step.lastUpdated;
      const expiryDate = new Date(approvalDate);
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      
      const today = new Date();
      const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      // Generate alert if expiring within 90 days
      if (daysUntilExpiry > 0 && daysUntilExpiry <= 90) {
        const severity: ComplianceAlert['severity'] = 
          daysUntilExpiry <= 14 ? 'critical' :
          daysUntilExpiry <= 30 ? 'high' : 'medium';
        
        generatedAlerts.push({
          id: `renewal-${step.serviceId}-${investorId}`,
          severity,
          category: 'license-renewal',
          title: `${step.serviceName} Renewal Due`,
          description: `Your ${step.serviceName} expires on ${expiryDate.toLocaleDateString()}. Renewal application should be submitted at least 15 days before expiry.`,
          dueDate: new Date(expiryDate.getTime() - (15 * 24 * 60 * 60 * 1000)), // 15 days before expiry
          dateIssued: today,
          affectedEntities: [pipeline.companyName],
          actionRequired: `Submit renewal application for ${step.serviceName} through ${step.agencyId.toUpperCase()} portal`,
          relatedLinks: [`${step.agencyId.toUpperCase()} Portal`, 'Renewal Checklist'],
          status: 'active',
          source: step.agencyId.toUpperCase(),
          daysUntilDue: daysUntilExpiry - 15
        });
      }
    });
  
  // 2️⃣ GENERATE CERTIFICATE EXPIRY ALERTS
  const certificates = getCertificates(bbid);
  certificates.forEach(cert => {
    if (cert.status === 'active' && cert.expiryDate) {
      const expiryDate = new Date(cert.expiryDate);
      const today = new Date();
      const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry > 0 && daysUntilExpiry <= 90) {
        const severity: ComplianceAlert['severity'] = 
          daysUntilExpiry <= 14 ? 'critical' :
          daysUntilExpiry <= 30 ? 'high' : 'medium';
        
        generatedAlerts.push({
          id: `cert-expiry-${cert.certificateId}`,
          severity,
          category: 'deadline',
          title: `${cert.certificateName} Expiring`,
          description: `Your ${cert.certificateName} (${cert.certificateNumber}) expires on ${expiryDate.toLocaleDateString()}.`,
          dueDate: expiryDate,
          dateIssued: today,
          affectedEntities: [pipeline.companyName],
          actionRequired: `Renew ${cert.certificateName} before expiry`,
          relatedLinks: [`${cert.issuedBy} Portal`, 'Certificate Renewal'],
          status: 'active',
          source: cert.issuedBy,
          daysUntilDue: daysUntilExpiry
        });
      }
    }
  });
  
  // 3️⃣ GENERATE SLA DEADLINE ALERTS from in-progress steps
  pipeline.approvalSteps
    .filter(step => step.status === 'in-progress')
    .forEach(step => {
      if (step.slaInDays <= 7) {
        generatedAlerts.push({
          id: `sla-${step.serviceId}-${investorId}`,
          severity: step.slaInDays <= 3 ? 'critical' : 'high',
          category: 'deadline',
          title: `${step.serviceName} SLA Deadline Approaching`,
          description: `The ${step.serviceName} approval is approaching its ${step.slaInDays}-day SLA deadline. Current status: ${step.currentStage}.`,
          dueDate: new Date(Date.now() + step.slaInDays * 24 * 60 * 60 * 1000),
          dateIssued: new Date(),
          affectedEntities: [pipeline.companyName],
          actionRequired: `Contact ${step.agencyId.toUpperCase()} or your Relationship Manager if additional documents are needed`,
          relatedLinks: [`${step.agencyId.toUpperCase()} Portal`, 'Track Application'],
          status: 'active',
          source: step.agencyId.toUpperCase(),
          daysUntilDue: step.slaInDays
        });
      }
    });
  
  return generatedAlerts;
}

export function ComplianceAlerts({ compact = false, investorId }: { compact?: boolean; investorId?: string }) {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  
  // 🔒 HARD GATE: COMPLIANCE REQUIRES AUTHENTICATED INVESTOR WITH JOURNEY
  // RULE: Compliance is a post-identity concern. Block generation at source.
  // Not just UI hiding - prevent notification engine from firing pre-login.
  const canShowCompliance = 
    isAuthenticated && 
    user !== null && 
    user.role === 'investor' &&
    investorId !== undefined;
  
  if (!canShowCompliance) {
    return null; // Zero compliance UI visible pre-authentication
  }
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // 🔌 ENGINE-DRIVEN ALERTS - Generate from workflow + certificates
  const workflowAlerts = investorId ? generateAlertsFromWorkflow(investorId) : [];
  
  // Combine static alerts with generated alerts
  const allAlerts = [...COMPLIANCE_ALERTS, ...workflowAlerts];

  const filteredAlerts = useMemo(() => {
    return allAlerts.filter(alert => {
      const matchesCategory = selectedCategory === 'all' || alert.category === selectedCategory;
      const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
      const matchesSearch = 
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.source.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSeverity && matchesSearch && alert.status === 'active';
    }).sort((a, b) => {
      // Sort by severity and days until due
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
      const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
      if (severityDiff !== 0) return severityDiff;
      
      if (a.daysUntilDue && b.daysUntilDue) {
        return a.daysUntilDue - b.daysUntilDue;
      }
      return 0;
    });
  }, [selectedCategory, selectedSeverity, searchQuery]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'info': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-5 h-5" />;
      case 'high': return <AlertCircle className="w-5 h-5" />;
      case 'medium': return <Clock className="w-5 h-5" />;
      case 'low': return <Info className="w-5 h-5" />;
      case 'info': return <Info className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = COMPLIANCE_CATEGORIES.find(c => c.id === category);
    return cat ? <cat.icon className="w-4 h-4" /> : <Bell className="w-4 h-4" />;
  };

  if (compact) {
    // COMPACT VIEW FOR DASHBOARD
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            ⚠️ {t('compliance.alerts') || 'Compliance Alerts'}
          </h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-red-600">
              {COMPLIANCE_ALERTS.filter(a => a.severity === 'critical' && a.status === 'active').length}
            </span>
          </div>
        </div>

        {/* Alert Count by Severity */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-2">
            <div className="text-lg font-bold text-red-600">
              {COMPLIANCE_ALERTS.filter(a => a.severity === 'critical').length}
            </div>
            <div className="text-xs text-gray-600">{t('compliance.critical') || 'Critical'}</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
            <div className="text-lg font-bold text-orange-600">
              {COMPLIANCE_ALERTS.filter(a => a.severity === 'high').length}
            </div>
            <div className="text-xs text-gray-600">{t('compliance.high') || 'High'}</div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">{t('compliance.urgent') || 'Urgent'}</h4>
          {COMPLIANCE_ALERTS.filter(a => a.severity === 'critical' || a.severity === 'high')
            .slice(0, 3)
            .map(alert => (
              <div key={alert.id} className={`p-2 border rounded-lg ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start gap-2">
                  {getSeverityIcon(alert.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{alert.title}</div>
                    {alert.daysUntilDue !== undefined && (
                      <div className="text-xs mt-1">{alert.daysUntilDue} {t('common.days') || 'days'} left</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Card>
    );
  }

  // FULL COMPLIANCE ALERTS SYSTEM
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            ⚠️ {t('compliance.alertsTitle') || 'Compliance Alerts & Regulatory Monitoring'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {t('compliance.subtitle') || 'Stay ahead of regulatory changes and deadlines'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Settings className="w-4 h-4" />
            {t('compliance.settings') || 'Settings'}
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            {t('compliance.exportReport') || 'Export Report'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {COMPLIANCE_ALERTS.filter(a => a.severity === 'critical' && a.status === 'active').length}
              </div>
              <div className="text-xs text-gray-700">{t('compliance.critical') || 'Critical Alerts'}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {COMPLIANCE_ALERTS.filter(a => a.daysUntilDue && a.daysUntilDue <= 14).length}
              </div>
              <div className="text-xs text-gray-700">{t('compliance.dueIn14Days') || 'Due in 14 Days'}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {COMPLIANCE_ALERTS.filter(a => a.category === 'regulation-change' && a.status === 'active').length}
              </div>
              <div className="text-xs text-gray-600">{t('compliance.newRegulations') || 'New Regulations'}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {COMPLIANCE_ALERTS.filter(a => a.status === 'resolved').length}
              </div>
              <div className="text-xs text-gray-600">{t('compliance.resolved') || 'Resolved'}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Category Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {COMPLIANCE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{cat.name}</span>
              {cat.activeAlerts > 0 && (
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  selectedCategory === cat.id ? 'bg-white/20' : 'bg-blue-100 text-blue-700'
                }`}>
                  {cat.activeAlerts}
                </span>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('compliance.searchAlerts') || 'Search alerts...'}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t('compliance.allSeverities') || 'All Severities'}</option>
              <option value="critical">{t('compliance.critical') || 'Critical'}</option>
              <option value="high">{t('compliance.high') || 'High'}</option>
              <option value="medium">{t('compliance.medium') || 'Medium'}</option>
              <option value="low">{t('compliance.low') || 'Low'}</option>
              <option value="info">{t('compliance.info') || 'Info'}</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map(alert => (
          <Card key={alert.id} className={`p-6 border-l-4 ${
            alert.severity === 'critical' ? 'border-l-red-500' :
            alert.severity === 'high' ? 'border-l-orange-500' :
            alert.severity === 'medium' ? 'border-l-yellow-500' :
            'border-l-blue-500'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                  {getSeverityIcon(alert.severity)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200 flex items-center gap-1">
                      {getCategoryIcon(alert.category)}
                      {alert.category.replace('-', ' ')}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{alert.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {alert.dueDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          <strong>{t('compliance.dueDate') || 'Due'}:</strong> {alert.dueDate.toLocaleDateString()}
                          {alert.daysUntilDue !== undefined && (
                            <span className={`ml-2 font-semibold ${
                              alert.daysUntilDue <= 7 ? 'text-red-600' :
                              alert.daysUntilDue <= 14 ? 'text-orange-600' :
                              'text-gray-600'
                            }`}>
                              ({alert.daysUntilDue} {t('common.days') || 'days'} left)
                            </span>
                          )}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">
                        <strong>{t('compliance.source') || 'Source'}:</strong> {alert.source}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">
                        <strong>{t('compliance.affects') || 'Affects'}:</strong> {alert.affectedEntities.join(', ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">
                        <strong>{t('compliance.issued') || 'Issued'}:</strong> {alert.dateIssued.toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {t('compliance.actionRequired') || 'Action Required'}
                        </div>
                        <div className="text-sm text-gray-700">{alert.actionRequired}</div>
                      </div>
                    </div>
                  </div>

                  {alert.relatedLinks && alert.relatedLinks.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {alert.relatedLinks.map((link, idx) => (
                        <button
                          key={idx}
                          className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {link}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                  {t('compliance.takeAction') || 'Take Action'}
                </button>
                <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                  {t('compliance.acknowledge') || 'Acknowledge'}
                </button>
                <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                  {t('compliance.dismiss') || 'Dismiss'}
                </button>
              </div>
            </div>
          </Card>
        ))}

        {filteredAlerts.length === 0 && (
          <Card className="p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-gray-900 font-semibold mb-2">
              {t('compliance.noAlerts') || 'All clear! No active alerts.'}
            </p>
            <p className="text-sm text-gray-600">
              {t('compliance.noAlertsDescription') || 'You\'re up to date with all compliance requirements.'}
            </p>
          </Card>
        )}
      </div>

      {/* Notification Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {t('compliance.notificationSettings') || 'Notification Settings'}
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    {t('compliance.emailNotifications') || 'Email Notifications'}
                  </h4>
                  <div className="space-y-2">
                    {['Critical alerts immediately', 'High priority alerts daily', 'Weekly compliance summary'].map((item, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* In-App Notifications */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    {t('compliance.inAppNotifications') || 'In-App Notifications'}
                  </h4>
                  <div className="space-y-2">
                    {['Show desktop notifications', 'Play sound for critical alerts', 'Badge count on dashboard'].map((item, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* SMS Notifications */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    {t('compliance.smsNotifications') || 'SMS Notifications'}
                  </h4>
                  <div className="space-y-2">
                    {['Critical alerts only', 'Deadline reminders (7 days before)'].map((item, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={idx === 0}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {t('common.cancel') || 'Cancel'}
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {t('common.save') || 'Save Settings'}
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}