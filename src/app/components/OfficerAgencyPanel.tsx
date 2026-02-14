// Officer Inter-Agency Coordination Layer
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Building2, AlertCircle, CheckCircle2, ChevronRight, Clock, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { getAgencyPerformance } from '@/app/officer-core/officerDataEngine';
import { getPipeline, generateApprovalPipeline, getBottlenecks } from '@/app/gov-agencies/agencyWorkflowEngine';
import { getServiceById, GOVERNMENT_AGENCIES } from '@/app/gov-agencies/agencyRegistry';

interface OfficerAgencyPanelProps {
  application: any;
}

export function OfficerAgencyPanel({ application }: OfficerAgencyPanelProps) {
  const [showEscalation, setShowEscalation] = useState(false);
  const [showConditionalModal, setShowConditionalModal] = useState(false);

  // 21. Agency Accountability Dashboard - Performance tracking from data engine
  const agencyPerformance = getAgencyPerformance();

  // 🏛️ GET GOVERNMENT APPROVAL PIPELINE - LIVE DATA FROM WORKFLOW ENGINE
  let govPipeline = getPipeline(application.investorId || application.id);
  if (!govPipeline) {
    govPipeline = generateApprovalPipeline(application.investorId || application.id, application.sector || 'manufacturing');
  }

  // Get bottlenecks for officer intervention
  const bottlenecks = govPipeline ? getBottlenecks(govPipeline.investorId) : [];

  // Agency data with SLA tracking
  const agencies = [
    {
      name: 'RJSC',
      fullName: 'Registrar of Joint Stock Companies',
      status: application.approvals?.rjsc || 'pending',
      daysElapsed: 12,
      slaDeadline: 15,
      contact: 'focal.rjsc@gov.bd',
      phone: '+880-2-9560091'
    },
    {
      name: 'NBR',
      fullName: 'National Board of Revenue',
      status: application.approvals?.nbr || 'pending',
      daysElapsed: 8,
      slaDeadline: 10,
      contact: 'tin.nbr@gov.bd',
      phone: '+880-2-8391704'
    },
    {
      name: 'Bangladesh Bank',
      fullName: 'Central Bank - FX Approval',
      status: application.approvals?.bangladeshBank || 'pending',
      daysElapsed: 18,
      slaDeadline: 15,
      contact: 'fdi.bb@gov.bd',
      phone: '+880-2-9530100'
    },
    {
      name: 'DoE',
      fullName: 'Department of Environment',
      status: application.approvals?.environment || 'not_required',
      daysElapsed: 0,
      slaDeadline: 20,
      contact: 'clearance.doe@gov.bd',
      phone: '+880-2-9512639'
    },
    {
      name: 'Fire Service',
      fullName: 'Fire Service & Civil Defense',
      status: application.approvals?.fire || 'not_required',
      daysElapsed: 0,
      slaDeadline: 10,
      contact: 'inspection.fire@gov.bd',
      phone: '+880-2-9555555'
    }
  ];

  // 20. Agency Escalation Ladder
  const getEscalationLevel = (daysElapsed: number, slaDeadline: number) => {
    const percentUsed = (daysElapsed / slaDeadline) * 100;
    
    if (percentUsed < 60) return { level: 'None', action: 'Monitor', color: 'green' };
    if (percentUsed < 80) return { level: 'Email Reminder', action: 'Send email to focal point', color: 'yellow' };
    if (percentUsed < 100) return { level: 'Call Supervisor', action: 'Phone call to department head', color: 'orange' };
    return { level: 'Director Escalation', action: 'Escalate to director level', color: 'red' };
  };

  // 22. Conditional Approval System
  const conditionalApprovalConditions = [
    { id: 1, condition: 'Pending RJSC company registration', critical: true, checked: false },
    { id: 2, condition: 'Awaiting Bangladesh Bank FX approval', critical: true, checked: false },
    { id: 3, condition: 'Fire safety inspection to be completed', critical: false, checked: false },
    { id: 4, condition: 'Environmental clearance pending', critical: false, checked: false },
    { id: 5, condition: 'TIN certificate from NBR required', critical: true, checked: false }
  ];

  const [conditions, setConditions] = useState(conditionalApprovalConditions);

  const grantConditionalApproval = () => {
    const selectedConditions = conditions.filter(c => c.checked);
    if (selectedConditions.length === 0) {
      alert('Please select at least one condition');
      return;
    }
    alert(`✅ CONDITIONAL BIDA APPROVAL GRANTED\n\nConditions:\n${selectedConditions.map(c => `• ${c.condition}`).join('\n')}\n\nInvestor can proceed with parallel activities while agencies complete their reviews.`);
    setShowConditionalModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Inter-Agency Header */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <Building2 className="w-5 h-5 text-cyan-600" />
        <h3 className="font-semibold text-lg">Inter-Agency Coordination</h3>
      </div>

      {/* 🏛️ LIVE GOVERNMENT APPROVAL PIPELINE - FROM WORKFLOW ENGINE */}
      {govPipeline && (
        <Card className="p-4 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold">🏛️ Government Approval Pipeline (Live)</h4>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-lg font-bold text-purple-600">{Math.round(govPipeline.overallProgress)}%</div>
                <div className="text-xs text-gray-600">Complete</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-purple-600">{govPipeline.completedSteps}/{govPipeline.totalSteps}</div>
                <div className="text-xs text-gray-600">Approved</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-purple-600">{govPipeline.estimatedCompletionDays}</div>
                <div className="text-xs text-gray-600">Est. Days</div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                style={{ width: `${govPipeline.overallProgress}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-gray-700 pb-2 border-b">
              <span>Service</span>
              <span>Agency</span>
              <span>SLA</span>
              <span>Status</span>
            </div>
            {govPipeline.criticalPathSteps.slice(0, 8).map((step, index) => {
              const serviceInfo = getServiceById(step.serviceId);
              const statusBadge = 
                step.status === 'approved' ? 'bg-green-100 text-green-800 border-green-300' :
                step.status === 'under-review' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                step.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-300' :
                step.status === 'on-hold' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                'bg-gray-100 text-gray-800 border-gray-300';
              
              return (
                <div key={step.serviceId} className="flex items-center justify-between text-xs py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900 flex-1">{step.serviceName}</span>
                  <span className="text-gray-600 flex-1 text-center">{step.agencyName}</span>
                  <span className="text-gray-600 flex-1 text-center">{step.slaInDays}d</span>
                  <div className="flex-1 flex justify-end">
                    <Badge variant="outline" className={`text-xs ${statusBadge}`}>
                      {step.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
            {govPipeline.approvalSteps.length > 8 && (
              <div className="text-center text-xs text-gray-500 pt-2">
                + {govPipeline.approvalSteps.length - 8} more approval steps
              </div>
            )}
          </div>

          {/* Bottlenecks Alert */}
          {bottlenecks.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <h5 className="font-semibold text-sm text-red-900">⚠️ Bottlenecks Detected ({bottlenecks.length})</h5>
              </div>
              <div className="space-y-1">
                {bottlenecks.slice(0, 3).map((bottleneck, idx) => (
                  <div key={idx} className="text-xs text-red-800">
                    • {bottleneck.serviceName} ({bottleneck.agencyName}) - {bottleneck.daysElapsed}/{bottleneck.slaInDays} days
                  </div>
                ))}
              </div>
              <p className="text-xs text-red-700 mt-2">
                💡 These approvals are behind schedule and may require officer intervention
              </p>
            </div>
          )}

          <p className="text-xs text-gray-600 mt-3">
            🔄 Live data from government workflow engine
          </p>
        </Card>
      )}

      {/* Agency Status Overview */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3">Required Agency Approvals</h4>
        <div className="space-y-3">
          {agencies.map((agency, idx) => {
            const escalation = getEscalationLevel(agency.daysElapsed, agency.slaDeadline);
            return (
              <div key={idx} className="p-3 border rounded">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-semibold">{agency.name}</h5>
                      <Badge
                        variant="outline"
                        className={
                          agency.status === 'approved' ? 'bg-green-100 text-green-800 border-green-300' :
                          agency.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                          agency.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-300' :
                          'bg-gray-100 text-gray-600 border-gray-300'
                        }
                      >
                        {agency.status === 'not_required' ? 'N/A' : agency.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{agency.fullName}</p>
                  </div>
                  {agency.status === 'pending' && (
                    <Badge
                      variant="outline"
                      className={`text-xs bg-${escalation.color}-100 text-${escalation.color}-800 border-${escalation.color}-300`}
                    >
                      {escalation.level}
                    </Badge>
                  )}
                </div>

                {agency.status === 'pending' && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Progress: {agency.daysElapsed} / {agency.slaDeadline} days</span>
                      <span>{Math.round((agency.daysElapsed / agency.slaDeadline) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          (agency.daysElapsed / agency.slaDeadline) < 0.6 ? 'bg-green-500' :
                          (agency.daysElapsed / agency.slaDeadline) < 0.8 ? 'bg-yellow-500' :
                          (agency.daysElapsed / agency.slaDeadline) < 1 ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(100, (agency.daysElapsed / agency.slaDeadline) * 100)}%` }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-xs text-gray-600">
                        <p>📧 {agency.contact}</p>
                        <p>📞 {agency.phone}</p>
                      </div>
                      {escalation.level !== 'None' && (
                        <button
                          onClick={() => setShowEscalation(true)}
                          className={`text-xs px-2 py-1 rounded bg-${escalation.color}-100 text-${escalation.color}-800 hover:bg-${escalation.color}-200`}
                        >
                          {escalation.action}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* 20. Agency Escalation Ladder */}
      <Card className="p-4 border-l-4 border-l-orange-500">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          <h4 className="font-semibold">Escalation Timeline</h4>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 bg-green-50 border border-green-200 rounded">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              1
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Day 15: Email Reminder</p>
              <p className="text-xs text-gray-600">Automated email to agency focal point</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              2
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Day 20: Call Department Head</p>
              <p className="text-xs text-gray-600">Phone follow-up with supervisor</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 bg-orange-50 border border-orange-200 rounded">
            <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              3
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Day 25: Escalate to Director</p>
              <p className="text-xs text-gray-600">Formal escalation to agency director</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 bg-red-50 border border-red-200 rounded">
            <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              4
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Day 30: BIDA Executive Review</p>
              <p className="text-xs text-gray-600">CEO-level intervention meeting</p>
            </div>
          </div>
        </div>
      </Card>

      {/* 21. Agency Accountability Dashboard */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3">Agency Performance Metrics</h4>
        <div className="space-y-2">
          {agencyPerformance.map((perf, idx) => (
            <div key={idx} className="p-2 bg-gray-50 border rounded">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sm">{perf.agency}</p>
                <Badge
                  variant="outline"
                  className={
                    perf.slaCompliance >= 85 ? 'bg-green-100 text-green-800 border-green-300' :
                    perf.slaCompliance >= 70 ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                    'bg-red-100 text-red-800 border-red-300'
                  }
                >
                  {perf.slaCompliance}% SLA
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                <div>
                  <p>Avg: {perf.avgDays} days</p>
                </div>
                <div>
                  <p>Backlog: {perf.currentBacklog}</p>
                </div>
                <div>
                  <p className={
                    perf.slaCompliance >= 85 ? 'text-green-600 font-semibold' :
                    perf.slaCompliance >= 70 ? 'text-yellow-600' :
                    'text-red-600 font-semibold'
                  }>
                    {perf.slaCompliance >= 85 ? '✓ Good' : perf.slaCompliance >= 70 ? '○ Fair' : '⚠️ Poor'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-3">
          ℹ️ Real-time performance data from integrated agency systems
        </p>
      </Card>

      {/* 22. Conditional Approval System */}
      <Card className="p-4 border-l-4 border-l-blue-500">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold">Conditional BIDA Approval</h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Grant BIDA approval while agencies complete their reviews. Investor can proceed with parallel activities.
        </p>
        <button
          onClick={() => setShowConditionalModal(true)}
          className="w-full bg-blue-100 text-blue-800 border border-blue-300 px-4 py-2 rounded hover:bg-blue-200 transition-colors font-medium"
        >
          <CheckCircle2 className="w-4 h-4 inline mr-2" />
          Grant Conditional Approval
        </button>
        <p className="text-xs text-gray-600 mt-2">
          ⚡ Speeds up process by allowing parallel workflows
        </p>
      </Card>

      {/* Escalation Actions Modal */}
      <Dialog open={showEscalation} onOpenChange={setShowEscalation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escalation Actions</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              Choose an escalation action to expedite the approval from the agency.
            </p>
            <button className="w-full bg-yellow-100 text-yellow-800 border border-yellow-300 px-4 py-2 rounded hover:bg-yellow-200 transition-colors text-left">
              <p className="font-medium">📧 Send Automated Reminder Email</p>
              <p className="text-xs text-yellow-700">Template email to agency focal point</p>
            </button>
            <button className="w-full bg-orange-100 text-orange-800 border border-orange-300 px-4 py-2 rounded hover:bg-orange-200 transition-colors text-left">
              <p className="font-medium">📞 Schedule Call with Supervisor</p>
              <p className="text-xs text-orange-700">Direct phone follow-up</p>
            </button>
            <button className="w-full bg-red-100 text-red-800 border border-red-300 px-4 py-2 rounded hover:bg-red-200 transition-colors text-left">
              <p className="font-medium">🚨 Escalate to Agency Director</p>
              <p className="text-xs text-red-700">Formal escalation (requires justification)</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Conditional Approval Modal */}
      <Dialog open={showConditionalModal} onOpenChange={setShowConditionalModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Grant Conditional BIDA Approval</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Select conditions that investor must fulfill for final approval:
            </p>
            <div className="space-y-2">
              {conditions.map((cond) => (
                <label
                  key={cond.id}
                  className="flex items-start gap-3 p-3 border rounded hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={cond.checked}
                    onChange={(e) => {
                      const newConditions = conditions.map(c =>
                        c.id === cond.id ? { ...c, checked: e.target.checked } : c
                      );
                      setConditions(newConditions);
                    }}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{cond.condition}</p>
                    {cond.critical && (
                      <Badge variant="destructive" className="mt-1 text-xs">Critical</Badge>
                    )}
                  </div>
                </label>
              ))}
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-900 font-medium mb-1">
                ℹ️ What Conditional Approval Means:
              </p>
              <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                <li>Investor receives BIDA approval letter immediately</li>
                <li>Can proceed with land acquisition, hiring, setup</li>
                <li>Final certificate issued when all conditions met</li>
                <li>Speeds up investment timeline by 30-60 days</li>
              </ul>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConditionalModal(false)}
                className="flex-1 px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={grantConditionalApproval}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Grant Conditional Approval
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}