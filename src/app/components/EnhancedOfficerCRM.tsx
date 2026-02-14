// Enhanced Officer CRM - Bureaucracy Intelligence & Protection System
// Integrates all 11 layers with 36 features

import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, Brain, Shield, Scale, MessageSquare, TrendingUp, Building2, 
  AlertTriangle, MessageCircle, Rocket, Search, Filter, ArrowLeft, 
  BarChart3, Zap, FileText, ChevronRight, CheckCircle2, Clock, XCircle
} from 'lucide-react';

// Import all layer panels
import { OfficerIntelligencePanel } from './OfficerIntelligencePanel';
import { OfficerProtectionPanel } from './OfficerProtectionPanel';
import { OfficerQualityPanel } from './OfficerQualityPanel';
import { OfficerCollaborationPanel } from './OfficerCollaborationPanel';
import { OfficerWorkloadPanel } from './OfficerWorkloadPanel';
import { OfficerAgencyPanel } from './OfficerAgencyPanel';
import { OfficerRiskPanel } from './OfficerRiskPanel';
import { OfficerCommunicationPanel } from './OfficerCommunicationPanel';
import { OfficerAdvancedPanel } from './OfficerAdvancedPanel';

// 🚀 FIX 3: IMPORT RM CONSOLE
import { RMConsole } from '@/app/rm/RMConsole';

// 🚀 FIX 5: IMPORT PAYMENT AND CERTIFICATE ENGINES
import { getPendingPayments, getAllPayments } from '@/app/payments/paymentEngine';
import { getCertificates } from '@/app/certificates/certificateEngine';

// 🤖 COMMAND CENTER: AI INTELLIGENCE PANEL
import { AIChatbot } from '@/app/intelligence/AIChatbot';

// Import officer data engine
import { getApplications, getOfficerProfile, OfficerApplication } from '@/app/officer-core/officerDataEngine';
import { getBankReadinessSummary } from '@/app/bank-integration/bracSandboxApi';
import { BankBadge, BankReadinessBadge } from '@/app/bank-integration/BankBadge';
import { getPipeline, generateApprovalPipeline, getBottlenecks } from '@/app/gov-agencies/agencyWorkflowEngine';
import { getServiceById } from '@/app/gov-agencies/agencyRegistry';

export function EnhancedOfficerCRM() {
  const [selectedApplication, setSelectedApplication] = useState<OfficerApplication | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'under_review' | 'approved' | 'rejected'>('all');

  // Get officer data from engine
  const officer = getOfficerProfile('officer@bida.gov.bd');

  // Get applications from engine
  const allApplications = getApplications({ assignedOfficer: officer.name });
  
  // Filter applications
  const applications = allApplications.filter(app => {
    const matchesSearch = 
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.investorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    under_review: applications.filter(a => a.status === 'under_review').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
      case 'under_review': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (selectedApplication) {
    // 🏛️ GET GOVERNMENT APPROVAL PIPELINE - LIVE DATA
    const govPipeline = selectedApplication.investorId ? getPipeline(selectedApplication.investorId) : null;
    if (!govPipeline && selectedApplication.investorId) {
      // Generate pipeline if it doesn't exist (safe fallback)
      generateApprovalPipeline(selectedApplication.investorId, selectedApplication.sector || 'manufacturing');
    }
    const bottlenecks = govPipeline ? getBottlenecks(govPipeline.investorId) : [];

    // 🚨 AUTO-TRIGGER RM ESCALATION - GAP 3 FIX
    useEffect(() => {
      if (govPipeline && selectedApplication.investorId) {
        const bbid = `BBID-${selectedApplication.investorId}`;
        import('../rm/rmEngine').then(({ autoDetectBottlenecks }) => {
          autoDetectBottlenecks(bbid, govPipeline.companyName || selectedApplication.companyName, selectedApplication.investorId);
        });
      }
    }, [govPipeline?.investorId, selectedApplication.investorId]);

    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedApplication(null)}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Applications List
          </button>

          {/* Application Header */}
          <Card className="p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">{selectedApplication.companyName}</h1>
                <p className="text-gray-600 mb-1">Investor: {selectedApplication.investorName}</p>
                <p className="text-sm text-gray-500">Application ID: {selectedApplication.id}</p>
              </div>
              <div className="text-right">
                <Badge className={`${getStatusColor(selectedApplication.status)} border mb-2`}>
                  {selectedApplication.status.replace('_', ' ').toUpperCase()}
                </Badge>
                <p className="text-sm text-gray-600">
                  ${(selectedApplication.investmentAmount / 1000000).toFixed(1)}M USD
                </p>
                <p className="text-xs text-gray-500">{selectedApplication.sector}</p>
              </div>
            </div>
          </Card>

          {/* 🏛️ GOVERNMENT PIPELINE SUMMARY - LIVE FROM WORKFLOW ENGINE */}
          {govPipeline && (
            <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Government Approval Pipeline</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div>
                      <div className="text-sm text-gray-600">Overall Progress</div>
                      <div className="text-2xl font-bold text-blue-600">{Math.round(govPipeline.overallProgress)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Approvals Status</div>
                      <div className="text-2xl font-bold text-gray-900">{govPipeline.completedSteps}/{govPipeline.totalSteps}</div>
                      <div className="text-xs text-gray-500">steps completed</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Est. Completion</div>
                      <div className="text-2xl font-bold text-gray-900">{govPipeline.estimatedCompletionDays}</div>
                      <div className="text-xs text-gray-500">days remaining</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {bottlenecks.length > 0 ? (
                    <div className="flex flex-col items-end gap-2">
                      <AlertTriangle className="w-8 h-8 text-orange-500" />
                      <div className="text-lg font-bold text-orange-600">{bottlenecks.length}</div>
                      <div className="text-sm text-orange-700">Bottlenecks</div>
                      <div className="text-xs text-gray-600">Requires intervention</div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-end gap-2">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                      <div className="text-sm text-green-700 font-medium">No bottlenecks</div>
                      <div className="text-xs text-gray-600">On track</div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* All 11 Layers in Tabs */}
          <Tabs defaultValue="intelligence" className="space-y-4">
            <TabsList className="grid grid-cols-5 lg:grid-cols-10 gap-2 bg-white p-2 rounded-lg">
              <TabsTrigger value="intelligence" className="flex items-center gap-1">
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">Intelligence</span>
              </TabsTrigger>
              <TabsTrigger value="protection" className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Protection</span>
              </TabsTrigger>
              <TabsTrigger value="quality" className="flex items-center gap-1">
                <Scale className="w-4 h-4" />
                <span className="hidden sm:inline">Quality</span>
              </TabsTrigger>
              <TabsTrigger value="collaboration" className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Team</span>
              </TabsTrigger>
              <TabsTrigger value="workload" className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Workload</span>
              </TabsTrigger>
              <TabsTrigger value="agency" className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                <span className="hidden sm:inline">Agencies</span>
              </TabsTrigger>
              <TabsTrigger value="risk" className="flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden sm:inline">Risk/AML</span>
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Comm</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-1">
                <Rocket className="w-4 h-4" />
                <span className="hidden sm:inline">Advanced</span>
              </TabsTrigger>
              {/* 🚀 FIX 3: ADD RM TAB */}
              <TabsTrigger value="rm" className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">RM</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="intelligence">
              <OfficerIntelligencePanel application={selectedApplication} />
            </TabsContent>

            <TabsContent value="protection">
              <OfficerProtectionPanel application={selectedApplication} officer={officer} />
            </TabsContent>

            <TabsContent value="quality">
              <OfficerQualityPanel application={selectedApplication} officer={officer} />
            </TabsContent>

            <TabsContent value="collaboration">
              <OfficerCollaborationPanel application={selectedApplication} officer={officer} />
            </TabsContent>

            <TabsContent value="workload">
              <OfficerWorkloadPanel officer={officer} />
            </TabsContent>

            <TabsContent value="agency">
              <OfficerAgencyPanel application={selectedApplication} />
            </TabsContent>

            <TabsContent value="risk">
              <OfficerRiskPanel application={selectedApplication} />
            </TabsContent>

            <TabsContent value="communication">
              <OfficerCommunicationPanel application={selectedApplication} officer={officer} />
            </TabsContent>

            <TabsContent value="advanced">
              <OfficerAdvancedPanel application={selectedApplication} officer={officer} />
            </TabsContent>
            
            {/* 🚀 FIX 3: MOUNT RM CONSOLE */}
            <TabsContent value="rm">
              <RMConsole rmId={officer.email} viewMode="dashboard" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Applications List View
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="mb-6 px-8 xl:px-16 2xl:px-24">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Officer Application Management
        </h1>
        <p className="text-gray-600">Bureaucracy Intelligence & Protection System</p>
        
        {/* Instruction Banner */}
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-purple-900 mb-1">
                💡 Click any application below to access all 36 Bureaucracy Intelligence Features
              </p>
              <p className="text-sm text-purple-700">
                9 comprehensive layers: Intelligence, Protection, Quality, Collaboration, Workload, Agency Coordination, Risk/AML, Communication, and Advanced Analytics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🏛️ COMMAND CENTER LAYOUT — 12-Column Grid with Persistent AI Intelligence Panel */}
      <div className="w-full px-8 xl:px-16 2xl:px-24">
        <div className="grid grid-cols-12 gap-8">
          
          {/* ========== MAIN OPERATIONS AREA (FULL WIDTH) ========== */}
          <div className="col-span-12">

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Applications</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Under Review</p>
            <p className="text-2xl font-bold text-blue-600">{stats.under_review}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Approved</p>
            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
          </Card>
              <Card className="p-4">
                <p className="text-sm text-gray-600 mb-1">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </Card>
            </div>

            {/* Search & Filter */}
            <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by investor, company, sector, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border rounded-lg bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            </Card>

            {/* Applications List */}
            <div className="space-y-4">
          {applications.map((app) => {
            // Get bank readiness for this investor
            const bankReadiness = getBankReadinessSummary(app.investorId);
            
            // 🚀 FIX 5: GET PAYMENT & CERTIFICATE STATUS
            const bbid = `BBID-${app.investorId}`;
            const pendingPayments = getPendingPayments(bbid);
            const allPayments = getAllPayments(bbid);
            const certificates = getCertificates(bbid);
            const paidPayments = allPayments.filter((p: any) => p.status === 'paid');
            
            return (
            <Card
              key={app.id}
              className="p-6 hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer border-2 hover:border-purple-300 relative group"
              onClick={() => setSelectedApplication(app)}
            >
              {/* Click indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-lg">
                  <ChevronRight className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-600">View Details & All 36 Features</span>
                </div>
              </div>
              
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold">{app.companyName}</h3>
                    <Badge className={`${getStatusColor(app.status)} border`}>
                      {app.status.replace('_', ' ')}
                    </Badge>
                    {bankReadiness.readinessScore > 0 && <BankBadge size="xs" />}
                    
                    {/* 🚀 FIX 5: PAYMENT BADGE */}
                    {pendingPayments.length > 0 && (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        💰 {pendingPayments.length} Unpaid
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-700 mb-1">Investor: {app.investorName}</p>
                  <p className="text-sm text-gray-600 mb-3">
                    {app.sector} • {app.country} • ${(app.investmentAmount / 1000000).toFixed(1)}M USD
                  </p>
                  
                  {/* Bank Readiness Row */}
                  {bankReadiness.readinessScore > 0 && (
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-xs font-medium text-gray-500">Bank:</span>
                      <BankReadinessBadge complete={bankReadiness.kycComplete} label="KYC" size="xs" />
                      <BankReadinessBadge complete={bankReadiness.accountActive} label="Account" size="xs" />
                      <BankReadinessBadge complete={bankReadiness.escrowActive} label="Escrow" size="xs" />
                      <span className="text-xs font-semibold text-blue-600">{bankReadiness.readinessScore}% Ready</span>
                    </div>
                  )}
                  
                  {/* 🚀 FIX 5: PAYMENT & CERTIFICATE ROW */}
                  {(paidPayments.length > 0 || certificates.length > 0) && (
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-xs font-medium text-gray-500">Status:</span>
                      {paidPayments.length > 0 && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-medium">
                          ✓ {paidPayments.length} Paid
                        </span>
                      )}
                      {certificates.length > 0 && (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">
                          📜 {certificates.length} Certificates
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>ID: {app.id}</span>
                    <span>Submitted: {app.submittedDate}</span>
                    <span>SLA: {app.slaDeadline}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-2">Assigned to</p>
                  <p className="font-medium">{app.assignedOfficer}</p>
                </div>
              </div>
              </Card>
            );
            })}
            </div>

            {applications.length === 0 && (
              <Card className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No applications found matching your criteria</p>
              </Card>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}