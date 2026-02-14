// 🛠️ AFTERCARE PORTAL — Post-Establishment Support & Business Growth Services
// ARCHITECTURE: Comprehensive aftercare for established businesses
// SOURCE: BIDA aftercare services + RM escalation system + expansion programs
// MOUNT: InvestorPortal (Aftercare tab) + Post-operational dashboard

import React, { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { 
  Handshake,
  MessageCircle,
  FileText,
  TrendingUp,
  Users,
  Briefcase,
  GraduationCap,
  Globe,
  Shield,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  ExternalLink,
  Phone,
  Mail,
  Calendar,
  Building2,
  DollarSign,
  Target,
  Rocket,
  Search,
  Filter,
  Plus,
  Send,
  PieChart,
  BarChart3,
  Bell,
  MessageSquare,
  BookOpen,
  Headphones
} from 'lucide-react';
import { useLanguage } from '@/app/components/LanguageContext';

// 🔌 ENGINE IMPORTS - Real Escalation & Support System
import { createEscalation, getEscalations, type RMEscalation } from '@/app/rm/rmEngine';
import { getPipeline } from '@/app/gov-agencies/agencyWorkflowEngine';

interface AftercareService {
  id: string;
  category: 'expansion' | 'compliance' | 'operational' | 'advisory' | 'grievance';
  title: string;
  description: string;
  status: 'available' | 'requested' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  requestedDate?: Date;
  assignedOfficer?: string;
  estimatedDays?: number;
}

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdDate: Date;
  lastUpdate: Date;
  assignedTo?: string;
  messages: number;
}

interface ExpansionOpportunity {
  id: string;
  type: 'new-location' | 'product-line' | 'capacity' | 'export-market';
  title: string;
  description: string;
  potentialIncentives: string[];
  estimatedTimeline: string;
}

const AFTERCARE_SERVICES: AftercareService[] = [
  {
    id: 'as-1',
    category: 'expansion',
    title: 'Business Expansion Consultation',
    description: 'Guidance on expanding operations, new facilities, or product lines',
    status: 'available',
    priority: 'medium',
    estimatedDays: 7
  },
  {
    id: 'as-2',
    category: 'expansion',
    title: 'Additional Land Allocation',
    description: 'Request for additional land in SEZ or industrial zones',
    status: 'available',
    priority: 'high',
    estimatedDays: 30
  },
  {
    id: 'as-3',
    category: 'compliance',
    title: 'Annual Compliance Review',
    description: 'Comprehensive review of regulatory compliance requirements',
    status: 'completed',
    priority: 'high',
    requestedDate: new Date('2024-11-15'),
    assignedOfficer: 'Rahman Ahmed'
  },
  {
    id: 'as-4',
    category: 'compliance',
    title: 'License Renewal Assistance',
    description: 'Support for renewing trade licenses, permits, and certifications',
    status: 'in-progress',
    priority: 'high',
    requestedDate: new Date('2025-01-10'),
    assignedOfficer: 'Fatima Khan',
    estimatedDays: 5
  },
  {
    id: 'as-5',
    category: 'operational',
    title: 'Utility Connection Enhancement',
    description: 'Upgrade power, water, or gas connection capacity',
    status: 'available',
    priority: 'medium',
    estimatedDays: 21
  },
  {
    id: 'as-6',
    category: 'operational',
    title: 'Customs Clearance Support',
    description: 'Expedited customs processing for import/export',
    status: 'requested',
    priority: 'high',
    requestedDate: new Date('2025-02-01'),
    estimatedDays: 3
  },
  {
    id: 'as-7',
    category: 'advisory',
    title: 'Tax Optimization Consultation',
    description: 'Advisory on tax planning and available incentives',
    status: 'available',
    priority: 'medium',
    estimatedDays: 14
  },
  {
    id: 'as-8',
    category: 'advisory',
    title: 'Export Market Development',
    description: 'Support for entering new export markets',
    status: 'available',
    priority: 'low',
    estimatedDays: 30
  },
  {
    id: 'as-9',
    category: 'grievance',
    title: 'Issue Resolution Fast Track',
    description: 'Escalate and resolve operational challenges',
    status: 'available',
    priority: 'urgent',
    estimatedDays: 2
  }
];

const SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'ticket-1',
    subject: 'Environmental Clearance Renewal Delay',
    category: 'Compliance',
    status: 'in-progress',
    priority: 'high',
    createdDate: new Date('2025-01-28'),
    lastUpdate: new Date('2025-02-05'),
    assignedTo: 'DOE Liaison Team',
    messages: 5
  },
  {
    id: 'ticket-2',
    subject: 'Work Permit Extension for 3 Foreign Staff',
    category: 'Immigration',
    status: 'open',
    priority: 'urgent',
    createdDate: new Date('2025-02-04'),
    lastUpdate: new Date('2025-02-04'),
    assignedTo: 'BIDA Immigration',
    messages: 2
  },
  {
    id: 'ticket-3',
    subject: 'Utility Bill Discrepancy - Electricity',
    category: 'Operational',
    status: 'resolved',
    priority: 'medium',
    createdDate: new Date('2025-01-15'),
    lastUpdate: new Date('2025-01-22'),
    assignedTo: 'Utility Coordination',
    messages: 8
  }
];

const EXPANSION_OPPORTUNITIES: ExpansionOpportunity[] = [
  {
    id: 'exp-1',
    type: 'new-location',
    title: 'Expand to Mongla SEZ',
    description: 'Opportunity to establish satellite facility in southern region with export-focused incentives',
    potentialIncentives: ['10-year tax holiday', 'Duty-free imports', 'Export subsidies 15%'],
    estimatedTimeline: '6-9 months'
  },
  {
    id: 'exp-2',
    type: 'export-market',
    title: 'EU Market Access Program',
    description: 'BIDA-supported initiative for GSP+ market access to European Union',
    potentialIncentives: ['Trade mission support', 'B2B matchmaking', 'Certification assistance'],
    estimatedTimeline: '3-6 months'
  },
  {
    id: 'exp-3',
    type: 'capacity',
    title: 'Green Technology Upgrade Grant',
    description: 'Government subsidy for adopting eco-friendly manufacturing processes',
    potentialIncentives: ['40% capital subsidy', 'Accelerated depreciation', 'Green certification'],
    estimatedTimeline: '4-8 months'
  }
];

export function AftercarePortal({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<'services' | 'tickets' | 'expansion' | 'contact'>('services');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = AFTERCARE_SERVICES.filter(service => {
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': case 'resolved': case 'closed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'requested': case 'open': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'expansion': return TrendingUp;
      case 'compliance': return FileText;
      case 'operational': return Shield;
      case 'advisory': return BookOpen;
      case 'grievance': return AlertTriangle;
      default: return Briefcase;
    }
  };

  if (compact) {
    // COMPACT VIEW FOR DASHBOARD
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            🏢 {t('aftercare.title') || 'Aftercare Services'}
          </h3>
          <Bell className="w-5 h-5 text-blue-600" />
        </div>

        {/* Active Services Count */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {AFTERCARE_SERVICES.filter(s => s.status === 'in-progress').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">{t('aftercare.active') || 'Active'}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">
              {AFTERCARE_SERVICES.filter(s => s.status === 'completed').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">{t('aftercare.completed') || 'Completed'}</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {SUPPORT_TICKETS.filter(t => t.status === 'open' || t.status === 'in-progress').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">{t('aftercare.tickets') || 'Tickets'}</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">{t('aftercare.recent') || 'Recent Activity'}</h4>
          {AFTERCARE_SERVICES.filter(s => s.status !== 'available').slice(0, 3).map(service => (
            <div key={service.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                service.status === 'completed' ? 'bg-green-500' :
                service.status === 'in-progress' ? 'bg-blue-500' : 'bg-yellow-500'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{service.title}</div>
                <div className="text-xs text-gray-500">{service.assignedOfficer}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // FULL AFTERCARE PORTAL
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            🏢 {t('aftercare.portalTitle') || 'Investor Aftercare Portal'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {t('aftercare.subtitle') || 'Ongoing support for established investors'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            {t('aftercare.newRequest') || 'New Request'}
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {AFTERCARE_SERVICES.filter(s => s.status === 'in-progress').length}
              </div>
              <div className="text-xs text-gray-600">{t('aftercare.activeServices') || 'Active Services'}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {SUPPORT_TICKETS.filter(t => t.status === 'open' || t.status === 'in-progress').length}
              </div>
              <div className="text-xs text-gray-600">{t('aftercare.openTickets') || 'Open Tickets'}</div>
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
                {AFTERCARE_SERVICES.filter(s => s.status === 'completed').length}
              </div>
              <div className="text-xs text-gray-600">{t('aftercare.completed') || 'Completed'}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{EXPANSION_OPPORTUNITIES.length}</div>
              <div className="text-xs text-gray-600">{t('aftercare.opportunities') || 'Opportunities'}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <Card className="p-1">
        <div className="flex gap-1">
          {[
            { id: 'services', label: t('aftercare.services') || 'Services', icon: Briefcase },
            { id: 'tickets', label: t('aftercare.supportTickets') || 'Support Tickets', icon: MessageSquare },
            { id: 'expansion', label: t('aftercare.expansion') || 'Expansion', icon: TrendingUp },
            { id: 'contact', label: t('aftercare.contact') || 'Contact', icon: Headphones }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          {/* Filters */}
          <Card className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('common.search') || 'Search services...'}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                {['all', 'expansion', 'compliance', 'operational', 'advisory', 'grievance'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      filterCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t(`aftercare.category.${cat}`) || cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map(service => {
              const Icon = getCategoryIcon(service.category);
              return (
                <Card key={service.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 text-xs rounded ${getStatusColor(service.status)}`}>
                      {t(`status.${service.status}`) || service.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(service.priority)}`}>
                      {t(`priority.${service.priority}`) || service.priority}
                    </span>
                  </div>

                  {service.assignedOfficer && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Users className="w-4 h-4" />
                      <span>{service.assignedOfficer}</span>
                    </div>
                  )}

                  {service.estimatedDays && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Clock className="w-4 h-4" />
                      <span>{service.estimatedDays} {t('common.days') || 'days'} estimated</span>
                    </div>
                  )}

                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    {service.status === 'available' 
                      ? t('aftercare.requestService') || 'Request Service'
                      : t('aftercare.viewDetails') || 'View Details'}
                  </button>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Tickets Tab */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              {SUPPORT_TICKETS.map(ticket => (
                <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                        <span className={`px-2 py-1 text-xs rounded ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {ticket.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {ticket.assignedTo}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {ticket.messages} {t('aftercare.messages') || 'messages'}
                        </span>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      {t('aftercare.viewTicket') || 'View Ticket'}
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Created: {ticket.createdDate.toLocaleDateString()} • Last update: {ticket.lastUpdate.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Expansion Tab */}
      {activeTab === 'expansion' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {EXPANSION_OPPORTUNITIES.map(opp => (
              <Card key={opp.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{opp.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{opp.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        {t('aftercare.incentives') || 'Potential Incentives'}:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {opp.potentialIncentives.map((incentive, idx) => (
                          <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            ✓ {incentive}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{opp.estimatedTimeline}</span>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        {t('aftercare.learnMore') || 'Learn More'}
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('aftercare.dedicatedSupport') || 'Your Dedicated Support Team'}
            </h3>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Rahman Ahmed</h4>
                    <p className="text-sm text-gray-600">Senior Investment Officer</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+880-2-9513843</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>rahman.ahmed@bida.gov.bd</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fatima Khan</h4>
                    <p className="text-sm text-gray-600">Aftercare Specialist</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+880-2-9513844</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>fatima.khan@bida.gov.bd</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('aftercare.quickContact') || 'Quick Contact'}
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('common.subject') || 'Subject'}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('aftercare.subjectPlaceholder') || 'Enter subject'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('common.category') || 'Category'}
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>{t('aftercare.category.expansion') || 'Business Expansion'}</option>
                  <option>{t('aftercare.category.compliance') || 'Compliance'}</option>
                  <option>{t('aftercare.category.operational') || 'Operational Support'}</option>
                  <option>{t('aftercare.category.advisory') || 'Advisory'}</option>
                  <option>{t('aftercare.category.grievance') || 'Grievance'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('common.message') || 'Message'}
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder={t('aftercare.messagePlaceholder') || 'Describe your request or issue'}
                />
              </div>

              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {t('common.submit') || 'Submit Request'}
              </button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}