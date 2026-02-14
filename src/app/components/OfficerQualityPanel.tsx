// Officer Quality & Consistency Control Layer
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Scale, Users, FileText, BarChart3, Copy, Search, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { getCommonConditions, getCommonRejectionReasons, historicalCases } from '@/app/officer-intelligence/caseDatabase';
import { getApplications, getAllOfficers, getPeerOfficers } from '@/app/officer-core/officerDataEngine';
import { analyzeBias } from '@/app/officer-intelligence/biasAnalyzer';

interface OfficerQualityPanelProps {
  application: any;
  officer: any;
}

export function OfficerQualityPanel({ application, officer }: OfficerQualityPanelProps) {
  const [showPeerReview, setShowPeerReview] = useState(false);
  const [showPrecedentSearch, setShowPrecedentSearch] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showBiasAnalysis, setShowBiasAnalysis] = useState(false);

  // Get all applications handled by this officer for bias analysis
  const officerApplications = getApplications({ assignedOfficer: officer.name });
  
  // 13. Fairness / Bias Meter - Run analysis
  const biasAnalysis = analyzeBias(officerApplications, officer.id);

  // 10. Decision Review Board (Peer Review) - Get from data engine
  const peerReviewers = getPeerOfficers(officer.email).slice(0, 3);
  
  const requiresPeerReview = () => {
    return (
      application.status === 'pending_rejection' ||
      application.investmentAmount > 5000000 ||
      application.riskScore > 60
    );
  };

  // 11. Case Precedent Database
  const commonConditions = getCommonConditions(application.sector);
  const commonRejections = getCommonRejectionReasons(application.sector);
  
  const precedentStats = {
    totalCases: historicalCases.filter(c => c.sector === application.sector).length,
    approved: historicalCases.filter(c => c.sector === application.sector && c.status === 'approved').length,
    conditional: historicalCases.filter(c => c.sector === application.sector && c.status === 'conditional').length,
    rejected: historicalCases.filter(c => c.sector === application.sector && c.status === 'rejected').length
  };

  // 12. Template Decision Engine
  const decisionTemplates = {
    requestInfo: {
      subject: 'Additional Information Required - Application {appId}',
      body: `Dear {investorName},

Thank you for your investment application (ID: {appId}) for {sector} sector.

After our initial review, we require the following additional information to proceed:

{missingItems}

Please submit these documents within 7 working days to avoid delays.

Required documents can be uploaded through the BIDA OSS Portal: [Upload Link]

If you have any questions, please contact your assigned officer.

Best regards,
{officerName}
Investment Services Officer
Bangladesh Investment Development Authority (BIDA)

This is an automated message from BIDA OSS System.`
    },
    conditionalApproval: {
      subject: 'Conditional Approval - Application {appId}',
      body: `Dear {investorName},

We are pleased to inform you that your investment application (ID: {appId}) has been CONDITIONALLY APPROVED.

Investment Details:
- Sector: {sector}
- Amount: ${application.investmentAmount / 1000000}M USD
- Zone: {zone}

CONDITIONS FOR FINAL APPROVAL:
{conditions}

Timeline: These conditions must be fulfilled within 30 days of this notice.

Next Steps:
1. Review all conditions carefully
2. Submit required documentation
3. Schedule final inspection (if applicable)
4. Await final certificate issuance

Congratulations on this milestone. Our team will support you through the remaining steps.

Best regards,
{officerName}
Investment Services Officer
BIDA

Ref: COND-APPR-{appId}-{date}`
    },
    rejection: {
      subject: 'Application Decision - {appId}',
      body: `Dear {investorName},

We regret to inform you that your investment application (ID: {appId}) cannot be approved at this time.

Reason for Rejection:
{rejectionReason}

Regulatory Basis:
{regulatoryReference}

You have the following options:
1. Address the issues and resubmit (recommended)
2. Request a formal review (within 15 days)
3. Seek clarification from our team

Right to Appeal:
You may appeal this decision within 30 days by submitting a formal request to:
Bangladesh Investment Development Authority
Appeal Division
[Contact Details]

We encourage you to address the concerns raised and consider reapplication.

Best regards,
{officerName}
Investment Services Officer
BIDA

Ref: REJ-{appId}-{date}`
    },
    approval: {
      subject: 'Investment Application Approved - {appId}',
      body: `Dear {investorName},

Congratulations! Your investment application (ID: {appId}) has been APPROVED.

Investment Details:
- Sector: {sector}
- Amount: ${application.investmentAmount / 1000000}M USD
- Zone: {zone}
- Approval Date: {date}

Your Investment Certificate will be issued within 5 working days.

Next Steps:
1. Collect your Investment Certificate
2. Proceed with company registration (if not completed)
3. Begin operational setup
4. Register for aftercare services

Welcome to Bangladesh! Our aftercare team will contact you soon to assist with your operational setup.

Best regards,
{officerName}
Investment Services Officer
BIDA

Ref: APPR-{appId}-{date}
Certificate Number: [To be generated]`
    }
  };

  const fillTemplate = (templateType: keyof typeof decisionTemplates) => {
    const template = decisionTemplates[templateType];
    let filled = template.body;
    
    filled = filled.replace(/{appId}/g, application.id);
    filled = filled.replace(/{investorName}/g, application.investorName);
    filled = filled.replace(/{sector}/g, application.sector);
    filled = filled.replace(/{zone}/g, application.zone || 'General');
    filled = filled.replace(/{officerName}/g, officer.name);
    filled = filled.replace(/{date}/g, new Date().toLocaleDateString());
    
    // Specific replacements
    if (templateType === 'requestInfo') {
      const missingDocs = application.documents
        ?.filter((d: any) => d.status === 'missing')
        .map((d: any, idx: number) => `${idx + 1}. ${d.name}`)
        .join('\n') || '1. [Specify required documents]';
      filled = filled.replace(/{missingItems}/g, missingDocs);
    }
    
    if (templateType === 'conditionalApproval') {
      const conditions = commonConditions.length > 0
        ? commonConditions.map((c, idx) => `${idx + 1}. ${c}`).join('\n')
        : '1. [Specify conditions]';
      filled = filled.replace(/{conditions}/g, conditions);
    }
    
    if (templateType === 'rejection') {
      filled = filled.replace(/{rejectionReason}/g, '[Specify detailed reason]');
      filled = filled.replace(/{regulatoryReference}/g, 'BIDA Act 2016, Section [X]');
    }
    
    return filled;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Template copied to clipboard!');
  };

  return (
    <div className="space-y-4">
      {/* Quality Header */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <Scale className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-lg">Quality & Consistency Control</h3>
      </div>

      {/* 10. Decision Review Board */}
      {requiresPeerReview() && (
        <Card className="p-4 border-l-4 border-l-purple-500">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">Peer Review Required</h4>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
                  High-Value / High-Risk
                </Badge>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                This application requires peer review due to: {
                  application.investmentAmount > 5000000 ? 'High investment amount ($5M+)' :
                  application.riskScore > 60 ? 'High risk score' :
                  'Rejection decision'
                }
              </p>
              <button
                onClick={() => setShowPeerReview(true)}
                className="bg-purple-100 text-purple-800 border border-purple-300 px-4 py-2 rounded hover:bg-purple-200 transition-colors text-sm font-medium"
              >
                <Users className="w-4 h-4 inline mr-2" />
                View Peer Review Status
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* 11. Case Precedent Database */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Search className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold">Case Precedent Database</h4>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-blue-50 border border-blue-200 rounded p-2">
            <p className="text-xs text-blue-600">Total Cases ({application.sector})</p>
            <p className="text-2xl font-bold text-blue-900">{precedentStats.totalCases}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded p-2">
            <p className="text-xs text-green-600">Approved</p>
            <p className="text-2xl font-bold text-green-900">{precedentStats.approved}</p>
            <p className="text-xs text-green-700">{Math.round((precedentStats.approved / precedentStats.totalCases) * 100)}% approval rate</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
            <p className="text-xs text-yellow-600">Conditional</p>
            <p className="text-2xl font-bold text-yellow-900">{precedentStats.conditional}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded p-2">
            <p className="text-xs text-red-600">Rejected</p>
            <p className="text-2xl font-bold text-red-900">{precedentStats.rejected}</p>
          </div>
        </div>

        <button
          onClick={() => setShowPrecedentSearch(true)}
          className="w-full bg-blue-100 text-blue-800 border border-blue-300 px-4 py-2 rounded hover:bg-blue-200 transition-colors font-medium"
        >
          <Search className="w-4 h-4 inline mr-2" />
          Search Full Precedent Database
        </button>
      </Card>

      {/* 12. Template Decision Engine */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-green-600" />
          <h4 className="font-semibold">Decision Templates</h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Use pre-approved professional templates for consistent communication
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setSelectedTemplate('requestInfo');
              setShowTemplates(true);
            }}
            className="bg-blue-100 text-blue-800 border border-blue-300 px-3 py-2 rounded hover:bg-blue-200 transition-colors text-sm"
          >
            📧 Request Info
          </button>
          <button
            onClick={() => {
              setSelectedTemplate('conditionalApproval');
              setShowTemplates(true);
            }}
            className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-3 py-2 rounded hover:bg-yellow-200 transition-colors text-sm"
          >
            ⚠️ Conditional Approval
          </button>
          <button
            onClick={() => {
              setSelectedTemplate('approval');
              setShowTemplates(true);
            }}
            className="bg-green-100 text-green-800 border border-green-300 px-3 py-2 rounded hover:bg-green-200 transition-colors text-sm"
          >
            ✅ Full Approval
          </button>
          <button
            onClick={() => {
              setSelectedTemplate('rejection');
              setShowTemplates(true);
            }}
            className="bg-red-100 text-red-800 border border-red-300 px-3 py-2 rounded hover:bg-red-200 transition-colors text-sm"
          >
            ❌ Rejection
          </button>
        </div>
      </Card>

      {/* 13. Fairness / Bias Meter */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <h4 className="font-semibold">Fairness & Bias Meter</h4>
        </div>
        
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Your Fairness Score</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{biasAnalysis.overallScore}/100</span>
              <Badge variant="outline" className={`bg-${biasAnalysis.color}-100 text-${biasAnalysis.color}-800 border-${biasAnalysis.color}-300`}>
                {biasAnalysis.level}
              </Badge>
            </div>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-${biasAnalysis.color}-500`}
              style={{ width: `${biasAnalysis.overallScore}%` }}
            />
          </div>
        </div>

        <div className="mb-3 space-y-2">
          {biasAnalysis.recommendations.slice(0, 3).map((rec, idx) => (
            <p key={idx} className="text-sm text-gray-700">
              {rec}
            </p>
          ))}
        </div>

        {biasAnalysis.flags.length > 0 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded mb-3">
            <p className="font-semibold text-sm text-yellow-900 mb-2">
              <AlertCircle className="w-4 h-4 inline mr-1" />
              Bias Flags Detected ({biasAnalysis.flags.length})
            </p>
            <div className="space-y-1">
              {biasAnalysis.flags.map((flag, idx) => (
                <p key={idx} className="text-xs text-yellow-800">
                  • {flag.description}: {flag.evidence}
                </p>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowBiasAnalysis(true)}
          className="w-full bg-indigo-100 text-indigo-800 border border-indigo-300 px-4 py-2 rounded hover:bg-indigo-200 transition-colors font-medium"
        >
          <BarChart3 className="w-4 h-4 inline mr-2" />
          View Detailed Bias Analysis
        </button>
      </Card>

      {/* Peer Review Modal */}
      <Dialog open={showPeerReview} onOpenChange={setShowPeerReview}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Peer Review Board Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              This application requires approval from {peerReviewers.length} senior officers before final decision.
            </p>
            {peerReviewers.map((reviewer, idx) => (
              <div key={idx} className="p-3 border rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{reviewer.name}</p>
                    <p className="text-xs text-gray-600">{reviewer.expertise} Specialist</p>
                  </div>
                  <Badge variant={reviewer.status === 'approved' ? 'default' : 'outline'}>
                    {reviewer.status}
                  </Badge>
                </div>
              </div>
            ))}
            <div className="p-3 bg-yellow-50 border border-yellow-300 rounded">
              <p className="text-sm text-yellow-900">
                ⏳ Awaiting {peerReviewers.filter(r => r.status === 'pending').length} more approvals before proceeding
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Precedent Search Modal */}
      <Dialog open={showPrecedentSearch} onOpenChange={setShowPrecedentSearch}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Precedent Database - {application.sector}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {commonConditions.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Common Conditions Applied</h4>
                <div className="space-y-2">
                  {commonConditions.map((condition, idx) => (
                    <div key={idx} className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                      {condition}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {commonRejections.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Common Rejection Reasons</h4>
                <div className="space-y-2">
                  {commonRejections.map((reason, idx) => (
                    <div key={idx} className="p-2 bg-red-50 border border-red-200 rounded text-sm">
                      {reason}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Template Modal */}
      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Decision Template - {selectedTemplate}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 border rounded font-mono text-sm whitespace-pre-wrap">
              {selectedTemplate && fillTemplate(selectedTemplate as any)}
            </div>
            <button
              onClick={() => {
                if (selectedTemplate) {
                  copyToClipboard(fillTemplate(selectedTemplate as any));
                }
              }}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
            >
              <Copy className="w-4 h-4 inline mr-2" />
              Copy Template to Clipboard
            </button>
            <p className="text-xs text-gray-600">
              ℹ️ Template is pre-filled with application data. Edit as needed before sending.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}