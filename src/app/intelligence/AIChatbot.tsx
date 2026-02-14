// 🎯 BIDA INTELLIGENCE CONSOLE — Live Diagnostic Intelligence Feed
// ARCHITECTURE: Real-time engine state projection, not conversational chat
// SOURCE: All BIDA engines continuously monitored
// MOUNT: InvestorPortal, Officer CRM, Admin Analytics

import React, { useState, useEffect } from 'react';
import { 
  Send,
  Bot,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  DollarSign,
  Building2,
  FileText,
  Clock,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Activity,
  Users, // 🤖 FIX 3
  Phone  // 🤖 FIX 3
} from 'lucide-react';
import { useLanguage } from '@/app/components/LanguageContext';

// 🔌 ENGINE IMPORTS - Full Intelligence Integration
import { GOVERNMENT_AGENCIES } from '@/app/gov-agencies/agencyRegistry';
import { getPipeline } from '@/app/gov-agencies/agencyWorkflowEngine';
import { getAllPayments, getPendingPayments, getTotalPaidAmount, getTotalPendingAmount } from '@/app/payments/paymentEngine';
import { getCertificates } from '@/app/certificates/certificateEngine';
import { getEscalations } from '@/app/rm/rmEngine';
import { calculateIncentiveEligibility } from '@/app/intelligence/incentiveEngine';

interface IntelligenceCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'success' | 'info';
}

function IntelligenceCard({ title, icon, children, variant = 'default' }: IntelligenceCardProps) {
  const variantStyles = {
    default: 'bg-white border-gray-200',
    warning: 'bg-amber-50 border-amber-200',
    success: 'bg-green-50 border-green-200',
    info: 'bg-blue-50 border-blue-200'
  };

  return (
    <div className={`rounded-xl p-4 shadow-sm border-2 ${variantStyles[variant]}`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <div className="text-sm space-y-2">
        {children}
      </div>
    </div>
  );
}

interface AIChatbotProps {
  compact?: boolean;
  userProfile?: any;
  onTriggerComponent?: (componentName: 'zone' | 'incentive' | 'timeline', data?: any) => void; // 🤖 FIX 3: Component trigger callback
}

export function AIChatbot({ compact = false, userProfile, onTriggerComponent }: AIChatbotProps) {
  const { t, language } = useLanguage();
  
  // State for query responses (not chat history)
  const [queryResponse, setQueryResponse] = useState<string | null>(null);
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRMContact, setShowRMContact] = useState(false); // 🤖 FIX 3: RM contact modal

  // 📊 LIVE INTELLIGENCE STATE - Read from engines
  const investorId = userProfile?.id;
  const bbid = investorId ? `BBID-${investorId}` : null;
  
  const pipeline = investorId ? getPipeline(investorId) : null;
  const pendingPayments = bbid ? getPendingPayments(bbid) : [];
  const totalPaid = bbid ? getTotalPaidAmount(bbid) : 0;
  const totalPending = bbid ? getTotalPendingAmount(bbid) : 0;
  const certificates = bbid ? getCertificates(bbid) : [];
  const escalations = investorId ? getEscalations(investorId) : [];

  // Derived intelligence
  const bottlenecks = pipeline?.approvalSteps.filter(s => 
    (s.status === 'in-progress' || s.status === 'pending') && s.slaInDays < 7
  ) || [];
  
  const completedSteps = pipeline?.approvalSteps.filter(s => s.status === 'approved') || [];
  const pendingSteps = pipeline?.approvalSteps.filter(s => s.status === 'pending' || s.status === 'in-progress') || [];
  const activeCertificates = certificates.filter(c => c.status === 'active');
  const openEscalations = escalations.filter(e => e.status === 'open' || e.status === 'investigating');

  // 🧠 INTELLIGENCE QUERY PROCESSOR
  const handleQuery = async () => {
    if (!inputQuery.trim()) return;

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      const query = inputQuery.toLowerCase();
      let response = '';

      // 🤖 FIX 3: REAL COMPONENT TRIGGERS
      // Zone recommendation queries
      if (query.includes('zone') || query.includes('location') || query.includes('where')) {
        response = `🗺️ **Zone Intelligence Activated**\\n\\nAnalyzing your profile for optimal zone placement...\\n\\nTriggering ZoneRecommender with your sector and investment data.`;
        if (onTriggerComponent) {
          onTriggerComponent('zone', { 
            sector: userProfile?.sector || 'General Industry',
            investmentSize: userProfile?.investmentAmount || 0 
          });
        }
      }
      // Incentive queries
      else if (query.includes('incentive') || query.includes('tax') || query.includes('benefit')) {
        response = `💰 **Incentive Calculator Activated**\\n\\nCalculating available incentives for ${userProfile?.sector || 'your sector'}...\\n\\nTriggering IncentiveCalculator with your investment details.`;
        if (onTriggerComponent) {
          onTriggerComponent('incentive', {
            sector: userProfile?.sector || 'General Industry',
            investmentSize: userProfile?.investmentAmount || 0
          });
        }
      }
      // Timeline/Journey queries
      else if (query.includes('timeline') || query.includes('gantt') || query.includes('schedule') || query.includes('how long')) {
        response = `📅 **Journey Timeline Activated**\\n\\nGenerating Gantt chart for your approval pipeline...\\n\\nTriggering KYAGanttEngine with your project data.`;
        if (onTriggerComponent) {
          onTriggerComponent('timeline', {
            sector: userProfile?.sector || 'General Industry',
            investmentSize: userProfile?.investmentAmount || 0
          });
        }
      }
      // Status queries
      else if (query.includes('status') || query.includes('progress')) {
        response = `📊 **Current Status:**\n\nProgress: ${pipeline?.overallProgress || 0}%\n${completedSteps.length} steps completed\n${pendingSteps.length} steps pending\nEstimated completion: ${pipeline?.estimatedCompletionDays || 0} days`;
      }
      // Payment queries
      else if (query.includes('payment') || query.includes('fee')) {
        response = `💰 **Payment Summary:**\n\nPaid: ${totalPaid.toLocaleString()} BDT\nPending: ${totalPending.toLocaleString()} BDT\n${pendingPayments.length} outstanding invoices`;
      }
      // Certificate queries
      else if (query.includes('certificate') || query.includes('license')) {
        response = `📋 **Certificates:**\n\n${activeCertificates.length} active certificates\n${certificates.filter(c => c.status === 'expired').length} expired\n\nLatest: ${activeCertificates[0]?.certificateName || 'None'}`;
      }
      // Bottleneck queries
      else if (query.includes('bottleneck') || query.includes('delay')) {
        response = bottlenecks.length > 0
          ? `🚨 **Bottlenecks Detected:**\n\n${bottlenecks.map(b => `• ${b.serviceName} (${b.slaInDays} days left)`).join('\n')}`
          : '✅ No bottlenecks detected. All processes on track.';
      }
      // Default
      else {
        response = `I can help you with:\n• Investment status & progress\n• Payment & fee information\n• Certificate status\n• Bottleneck analysis\n• Incentive eligibility\n\nWhat would you like to know?`;
      }

      setQueryResponse(response);
      setInputQuery('');
      setIsProcessing(false);
    }, 800);
  };

  const refreshIntelligence = () => {
    setQueryResponse(null);
  };

  // 🎯 SELF-STICKY INTELLIGENCE CONSOLE
  return (
    <div className="sticky top-6 h-[calc(100vh-120px)] overflow-y-auto px-4">
      <div className="flex flex-col gap-4">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Intelligence Console</h3>
              <p className="text-xs text-white/80">Live engine monitoring</p>
            </div>
          </div>
          <button
            onClick={refreshIntelligence}
            className="w-8 h-8 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* ========== BLOCK 1: INVESTOR/CASE CONTEXT ========== */}
        <IntelligenceCard
          title="Case Status"
          icon={<Activity className="w-4 h-4 text-blue-600" />}
          variant={bottlenecks.length > 0 ? 'warning' : 'success'}
        >
          {pipeline ? (
            <>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-bold text-blue-600">{pipeline.overallProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${pipeline.overallProgress}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div className="bg-green-100 p-2 rounded">
                  <div className="text-green-800 font-semibold">{completedSteps.length}</div>
                  <div className="text-green-600">Completed</div>
                </div>
                <div className="bg-amber-100 p-2 rounded">
                  <div className="text-amber-800 font-semibold">{pendingSteps.length}</div>
                  <div className="text-amber-600">Pending</div>
                </div>
              </div>
              {bottlenecks.length > 0 && (
                <div className="mt-2 p-2 bg-amber-100 rounded border border-amber-300">
                  <div className="flex items-center gap-1 text-amber-800 font-semibold text-xs">
                    <AlertTriangle className="w-3 h-3" />
                    {bottlenecks.length} Bottleneck{bottlenecks.length > 1 ? 's' : ''} Detected
                  </div>
                  <div className="mt-1 text-xs text-amber-700">
                    {bottlenecks[0]?.serviceName} ({bottlenecks[0]?.slaInDays} days left)
                  </div>
                </div>
              )}
              <div className="text-xs text-gray-500 mt-2">
                Est. completion: {pipeline.estimatedCompletionDays} days
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-xs">No active pipeline data</div>
          )}
        </IntelligenceCard>

        {/* ========== BLOCK 2: FINANCIAL STATE ========== */}
        <IntelligenceCard
          title="Financial Overview"
          icon={<DollarSign className="w-4 h-4 text-green-600" />}
          variant={pendingPayments.length > 0 ? 'warning' : 'default'}
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Paid</span>
              <span className="font-bold text-green-600">{totalPaid.toLocaleString()} BDT</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending</span>
              <span className="font-bold text-amber-600">{totalPending.toLocaleString()} BDT</span>
            </div>
            {pendingPayments.length > 0 && (
              <div className="mt-2 p-2 bg-amber-50 rounded border border-amber-200">
                <div className="text-xs font-semibold text-amber-800 mb-1">
                  {pendingPayments.length} Outstanding Invoice{pendingPayments.length > 1 ? 's' : ''}
                </div>
                {pendingPayments.slice(0, 2).map((payment, idx) => (
                  <div key={idx} className="text-xs text-amber-700 flex justify-between">
                    <span className="truncate">{payment.serviceName}</span>
                    <span className="font-semibold ml-2">{payment.feeAmount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Certificates Section */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center gap-1">
                <FileText className="w-3 h-3" />
                Certificates
              </span>
              <span className="font-bold text-blue-600">{activeCertificates.length}</span>
            </div>
            {activeCertificates.length > 0 && (
              <div className="mt-2 space-y-1">
                {activeCertificates.slice(0, 3).map((cert, idx) => (
                  <div key={idx} className="text-xs bg-blue-50 p-2 rounded flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-blue-600" />
                    <span className="truncate">{cert.certificateName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </IntelligenceCard>

        {/* ========== BLOCK 3: RISK & ALERTS ========== */}
        <IntelligenceCard
          title="Risk & Compliance"
          icon={<Shield className="w-4 h-4 text-red-600" />}
          variant={openEscalations.length > 0 || bottlenecks.length > 0 ? 'warning' : 'success'}
        >
          {openEscalations.length === 0 && bottlenecks.length === 0 ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-semibold">All systems nominal</span>
            </div>
          ) : (
            <div className="space-y-2">
              {openEscalations.length > 0 && (
                <div className="p-2 bg-red-50 rounded border border-red-200">
                  <div className="flex items-center gap-1 text-red-800 font-semibold text-xs mb-1">
                    <AlertTriangle className="w-3 h-3" />
                    {openEscalations.length} Active Escalation{openEscalations.length > 1 ? 's' : ''}
                  </div>
                  {openEscalations.slice(0, 2).map((esc, idx) => (
                    <div key={idx} className="text-xs text-red-700 mt-1">
                      • {esc.title}
                    </div>
                  ))}
                </div>
              )}
              {bottlenecks.filter(b => b.slaInDays < 3).length > 0 && (
                <div className="p-2 bg-amber-50 rounded border border-amber-200">
                  <div className="flex items-center gap-1 text-amber-800 font-semibold text-xs mb-1">
                    <Clock className="w-3 h-3" />
                    Critical SLA Warning
                  </div>
                  {bottlenecks.filter(b => b.slaInDays < 3).slice(0, 2).map((b, idx) => (
                    <div key={idx} className="text-xs text-amber-700">
                      • {b.serviceName} ({b.slaInDays}d left)
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* SLA Performance */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-xs text-gray-600 mb-1">SLA Compliance</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${bottlenecks.length > 0 ? 'bg-amber-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.max(80, 100 - (bottlenecks.length * 10))}%` }}
                />
              </div>
              <span className="text-xs font-semibold">
                {Math.max(80, 100 - (bottlenecks.length * 10))}%
              </span>
            </div>
          </div>
        </IntelligenceCard>

        {/* ========== BLOCK 4: SECTOR/INCENTIVES INSIGHT ========== */}
        <IntelligenceCard
          title="Incentives & Opportunities"
          icon={<TrendingUp className="w-4 h-4 text-purple-600" />}
          variant="info"
        >
          {userProfile?.sector && userProfile?.investmentAmount ? (
            <>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">Sector</span>
                  <span className="font-semibold text-purple-600">{userProfile.sector}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">Investment Size</span>
                  <span className="font-semibold">${userProfile.investmentAmount?.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-3 p-2 bg-purple-50 rounded border border-purple-200">
                <div className="text-xs font-semibold text-purple-800 mb-1 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Eligible Incentives
                </div>
                <div className="space-y-1 text-xs text-purple-700">
                  {userProfile.sector.includes('Manufacturing') && (
                    <>
                      <div>• 5-7 year tax holiday</div>
                      <div>• Duty-free machinery import</div>
                    </>
                  )}
                  {userProfile.investmentAmount > 1000000 && (
                    <div>• Priority fast-track processing</div>
                  )}
                  <div>• SEZ preferential rates</div>
                </div>
              </div>
              
              <button className="mt-2 w-full text-xs bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                View Full Incentive Report
              </button>
            </>
          ) : (
            <div className="text-xs text-gray-500">
              Complete your profile to see incentive eligibility
            </div>
          )}
        </IntelligenceCard>

        {/* ========== QUERY RESPONSE CARD (if exists) ========== */}
        {queryResponse && (
          <IntelligenceCard
            title="Query Response"
            icon={<Bot className="w-4 h-4 text-blue-600" />}
            variant="default"
          >
            <div className="text-xs text-gray-700 whitespace-pre-line">
              {queryResponse}
            </div>
            <button
              onClick={() => setQueryResponse(null)}
              className="mt-2 text-xs text-blue-600 hover:underline"
            >
              Clear response
            </button>
          </IntelligenceCard>
        )}

        {/* ========== INTELLIGENCE QUERY INPUT ========== */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-xs text-gray-600 mb-2 font-semibold">Ask Intelligence</div>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
              placeholder="Ask about status, payments, approvals, incentives..."
              className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleQuery}
              disabled={!inputQuery.trim() || isProcessing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* 🤖 FIX 3: TALK TO RM BUTTON */}
        <button
          onClick={() => setShowRMContact(true)}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
        >
          <Bot className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Talk to Relationship Manager
        </button>

        {/* RM Contact Modal */}
        {showRMContact && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Contact Your Relationship Manager</h3>
              <p className="text-gray-600 mb-4">
                Your dedicated RM is here to help with any questions or concerns about your investment journey.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-sm">Sarah Ahmed</div>
                    <div className="text-xs text-gray-600">Senior Investment Officer</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div className="text-sm">+880-2-9567890 ext. 234</div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRMContact(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert('Call initiated to RM (Demo)');
                    setShowRMContact(false);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Call Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Engine Status Footer */}
        <div className="text-xs text-gray-400 text-center pb-4">\n
          <div className="flex items-center justify-center gap-1">
            <Activity className="w-3 h-3" />
            <span>Live feed from {pipeline ? '12' : '0'} engines</span>
          </div>
        </div>
      </div>
    </div>
  );
}
