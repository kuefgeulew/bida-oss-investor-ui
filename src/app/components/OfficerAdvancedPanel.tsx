// Officer Advanced Features - Layers 9, 10, 11 (Analytics, Special Situations, Post-Approval)
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, AlertTriangle, Zap, Star, Rocket, CheckCircle2, Factory, Users2, DollarSign, TrendingDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { getBottleneckData } from '@/app/officer-core/officerDataEngine';

interface OfficerAdvancedPanelProps {
  application: any;
  officer: any;
}

export function OfficerAdvancedPanel({ application, officer }: OfficerAdvancedPanelProps) {
  const [showVIPMode, setShowVIPMode] = useState(false);
  const [showFastTrack, setShowFastTrack] = useState(false);
  const [fastTrackJustification, setFastTrackJustification] = useState('');

  // ===== LAYER 9: ANALYTICS & PREDICTION =====

  // 29. Predictive Approval Engine
  const calculateApprovalProbability = () => {
    let probability = 50; // base

    // Document completeness
    const docsComplete = application.documents?.filter((d: any) => d.status === 'approved').length || 0;
    const totalDocs = application.documents?.length || 1;
    probability += (docsComplete / totalDocs) * 30;

    // Sector approval rate
    const sectorApprovalRate = 75; // from historical data
    probability += (sectorApprovalRate - 50) / 2;

    // Risk score
    const riskScore = application.riskScore || 30;
    if (riskScore < 30) probability += 15;
    else if (riskScore > 60) probability -= 20;

    // Payment received
    if (application.paymentReceived) probability += 5;

    // SLA compliance
    const slaRemaining = new Date(application.slaDeadline).getTime() - new Date().getTime();
    if (slaRemaining > 0) probability += 5;
    else probability -= 10;

    return Math.max(0, Math.min(100, Math.round(probability)));
  };

  const approvalProbability = calculateApprovalProbability();

  const watchItems = [
    { item: 'Fire Safety License', criticality: 'high', status: application.approvals?.fire === 'approved' ? 'ok' : 'watch' },
    { item: 'Director Passport Verification', criticality: 'medium', status: 'ok' },
    { item: 'Source of Funds Documentation', criticality: 'high', status: application.hasSourceOfFundsDocs ? 'ok' : 'watch' }
  ];

  // 30. Bottleneck Detector - NOW FROM CENTRAL DATA
  const bottleneckAnalysis = getBottleneckData();
  const bottleneckData = {
    thisMonth: bottleneckAnalysis,
    topDelays: [
      'Fire Service inspection backlog',
      'RJSC name approval delays',
      'Missing investor documents'
    ]
  };

  // 31. Officer Performance Predictor
  const slaBreachRisk = () => {
    const slaDeadline = new Date(application.slaDeadline);
    const now = new Date();
    const daysRemaining = Math.ceil((slaDeadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    const pendingSteps = 5; // mock
    const avgDaysPerStep = 3;
    const daysNeeded = pendingSteps * avgDaysPerStep;
    
    if (daysNeeded > daysRemaining) {
      return { risk: 'High', color: 'red', message: `Need ${daysNeeded} days but only ${daysRemaining} remain` };
    } else if (daysNeeded > daysRemaining * 0.8) {
      return { risk: 'Medium', color: 'yellow', message: `Tight schedule - ${daysRemaining} days left` };
    }
    return { risk: 'Low', color: 'green', message: `On track - ${daysRemaining} days buffer` };
  };

  const breachRisk = slaBreachRisk();

  // ===== LAYER 10: SPECIAL SITUATIONS =====

  // 32. VIP / Strategic Investor Mode
  const isVIPInvestor = application.investmentAmount > 10000000 || application.isStrategicSector;
  const vipBenefits = [
    'Dedicated senior officer assignment',
    'Fast-track processing (50% time reduction)',
    'Priority agency coordination',
    'CEO-level support available',
    'Quarterly review meetings',
    'Aftercare concierge service'
  ];

  // 33. Problem Case Escalation
  const isProblemCase = () => {
    return application.slaBreaches > 0 || application.investorComplaints > 0 || breachRisk.risk === 'High';
  };

  const escalateProblemCase = () => {
    alert('🚨 ESCALATION INITIATED\n\nThis case has been flagged to:\n• Your supervisor\n• Deputy Director\n• Senior management team\n\nYou will receive guidance within 2 hours.');
  };

  // 34. Emergency / Fast Track Mode
  const requestFastTrack = () => {
    if (!fastTrackJustification.trim()) {
      alert('Please provide justification for fast-track request');
      return;
    }
    alert(`✅ FAST-TRACK REQUEST SUBMITTED\n\nJustification: ${fastTrackJustification}\n\nApproval required from Deputy Director.\nExpected response: Within 4 hours.`);
    setShowFastTrack(false);
    setFastTrackJustification('');
  };

  // ===== LAYER 11: POST-APPROVAL & RETENTION =====

  // 35. Implementation Tracker (for approved applications)
  const implementationMilestones = [
    { milestone: 'Land Acquisition', status: 'completed', date: '2024-01-15', progress: 100 },
    { milestone: 'Factory Construction Started', status: 'in_progress', date: '2024-02-01', progress: 65 },
    { milestone: 'Equipment Installation', status: 'pending', date: null, progress: 0 },
    { milestone: 'Staff Recruitment', status: 'in_progress', date: '2024-02-10', progress: 40 },
    { milestone: 'Production Trial Run', status: 'pending', date: null, progress: 0 },
    { milestone: 'Commercial Operations', status: 'pending', date: null, progress: 0 }
  ];

  // 36. Investor Success Metrics
  const successMetrics = {
    jobsCreated: 145,
    localJobs: 132,
    foreignJobs: 13,
    exportValue: 2800000, // USD
    taxPaid: 450000, // USD
    localSourcing: 62, // percentage
    operationalMonths: 8,
    expansionPlanned: true
  };

  return (
    <div className="space-y-4">
      {/* Advanced Features Header */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <Rocket className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-lg">Advanced Features</h3>
      </div>

      {/* ===== LAYER 9: ANALYTICS & PREDICTION ===== */}
      
      {/* 29. Predictive Approval Engine */}
      <Card className="p-4 border-l-4 border-l-blue-500">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold">Predictive Approval Engine</h4>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Approval Probability</span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">{approvalProbability}%</span>
            <Badge
              variant="outline"
              className={
                approvalProbability > 75 ? 'bg-green-100 text-green-800 border-green-300' :
                approvalProbability > 50 ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                'bg-red-100 text-red-800 border-red-300'
              }
            >
              {approvalProbability > 75 ? 'High' : approvalProbability > 50 ? 'Moderate' : 'Low'}
            </Badge>
          </div>
        </div>

        <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full ${
              approvalProbability > 75 ? 'bg-green-500' :
              approvalProbability > 50 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
            style={{ width: `${approvalProbability}%` }}
          />
        </div>

        <p className="text-sm text-gray-700 mb-3">
          {approvalProbability > 75
            ? '✓ High chance of approval - all key factors favorable'
            : approvalProbability > 50
            ? '○ Moderate chance - watch items below'
            : '⚠️ Low probability - address critical issues first'}
        </p>

        <div className="border-t pt-3">
          <p className="font-semibold text-sm mb-2">Watch These Items:</p>
          <div className="space-y-2">
            {watchItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">{item.item}</span>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      item.criticality === 'high' ? 'border-red-300 text-red-700' : 'border-yellow-300 text-yellow-700'
                    }`}
                  >
                    {item.criticality}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      item.status === 'ok' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {item.status === 'ok' ? '✓' : '⚠️'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 30. Bottleneck Detector */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          <h4 className="font-semibold">System-Wide Bottleneck Detector</h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">Most common delays this month:</p>
        <div className="space-y-2 mb-3">
          {bottleneckData.thisMonth.map((stage, idx) => (
            <div key={idx} className="p-2 bg-orange-50 border border-orange-200 rounded">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sm">{stage.stage}</p>
                <Badge variant="outline" className="text-xs">{stage.count} cases</Badge>
              </div>
              <p className="text-xs text-gray-600">Avg: {stage.avgDays} days</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600">💡 Based on real-time data from all officers</p>
      </Card>

      {/* 31. Officer Performance Predictor */}
      <Card className={`p-4 border-l-4 border-l-${breachRisk.color}-500`}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className={`w-5 h-5 text-${breachRisk.color}-600`} />
          <h4 className="font-semibold">SLA Breach Predictor</h4>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Breach Risk</span>
          <Badge
            variant="outline"
            className={`bg-${breachRisk.color}-100 text-${breachRisk.color}-800 border-${breachRisk.color}-300`}
          >
            {breachRisk.risk}
          </Badge>
        </div>
        <p className="text-sm text-gray-700">{breachRisk.message}</p>
        {breachRisk.risk !== 'Low' && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-300 rounded">
            <p className="text-sm text-yellow-900 font-medium">⚡ Recommended: Enable fast-track or request support</p>
          </div>
        )}
      </Card>

      {/* ===== LAYER 10: SPECIAL SITUATIONS ===== */}

      {/* 32. VIP / Strategic Investor Mode */}
      {isVIPInvestor && (
        <Card className="p-4 bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-2 border-yellow-400">
          <div className="flex items-start gap-3">
            <Star className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-yellow-900">⭐ VIP / Strategic Investor</h4>
                <Badge className="bg-yellow-600 text-white">PRIORITY</Badge>
              </div>
              <p className="text-sm text-yellow-800 mb-3">
                Investment: ${(application.investmentAmount / 1000000).toFixed(1)}M USD
                {application.isStrategicSector && ' • Strategic Sector'}
              </p>
              <button
                onClick={() => setShowVIPMode(true)}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors text-sm font-medium"
              >
                <Star className="w-4 h-4 inline mr-2" />
                Activate VIP Protocol
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* 33. Problem Case Escalation */}
      {isProblemCase() && (
        <Card className="p-4 border-l-4 border-l-red-500">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold">Problem Case Detected</h4>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            This case requires immediate attention due to delays or complaints.
          </p>
          <button
            onClick={escalateProblemCase}
            className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors font-medium"
          >
            <Rocket className="w-4 h-4 inline mr-2" />
            Escalate to Senior Management
          </button>
        </Card>
      )}

      {/* 34. Emergency / Fast Track Mode */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-purple-600" />
          <h4 className="font-semibold">Emergency Fast-Track</h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Request fast-track processing for urgent cases (requires approval)
        </p>
        <button
          onClick={() => setShowFastTrack(true)}
          className="w-full bg-purple-100 text-purple-800 border border-purple-300 px-4 py-2 rounded hover:bg-purple-200 transition-colors font-medium"
        >
          <Zap className="w-4 h-4 inline mr-2" />
          Request Fast-Track Approval
        </button>
      </Card>

      {/* ===== LAYER 11: POST-APPROVAL & RETENTION ===== */}

      {/* 35. Implementation Tracker */}
      {application.status === 'approved' && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Factory className="w-5 h-5 text-cyan-600" />
            <h4 className="font-semibold">Implementation Progress Tracker</h4>
          </div>
          <div className="space-y-3">
            {implementationMilestones.map((milestone, idx) => (
              <div key={idx} className="p-3 border rounded">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm">{milestone.milestone}</p>
                  <Badge
                    variant="outline"
                    className={
                      milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                      milestone.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-600'
                    }
                  >
                    {milestone.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#3b82f6]"
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{milestone.progress}%</span>
                </div>
                {milestone.date && (
                  <p className="text-xs text-gray-500 mt-1">Date: {milestone.date}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 36. Investor Success Metrics */}
      {application.status === 'approved' && (
        <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold">Investor Success Metrics</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded border">
              <div className="flex items-center gap-2 mb-1">
                <Users2 className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-gray-600">Jobs Created</p>
              </div>
              <p className="text-2xl font-bold">{successMetrics.jobsCreated}</p>
              <p className="text-xs text-gray-500">{successMetrics.localJobs} local, {successMetrics.foreignJobs} foreign</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-green-600" />
                <p className="text-xs text-gray-600">Export Value</p>
              </div>
              <p className="text-2xl font-bold">${(successMetrics.exportValue / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-gray-500">{successMetrics.operationalMonths} months</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <p className="text-xs text-gray-600">Tax Paid</p>
              </div>
              <p className="text-2xl font-bold">${(successMetrics.taxPaid / 1000).toFixed(0)}K</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <div className="flex items-center gap-2 mb-1">
                <Factory className="w-4 h-4 text-orange-600" />
                <p className="text-xs text-gray-600">Local Sourcing</p>
              </div>
              <p className="text-2xl font-bold">{successMetrics.localSourcing}%</p>
            </div>
          </div>
          {successMetrics.expansionPlanned && (
            <div className="mt-3 p-2 bg-green-100 border border-green-300 rounded">
              <p className="text-sm text-green-900 font-medium">
                🎉 Investor planning expansion - excellent success story!
              </p>
            </div>
          )}
        </Card>
      )}

      {/* VIP Mode Modal */}
      <Dialog open={showVIPMode} onOpenChange={setShowVIPMode}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>⭐ VIP Investor Protocol Activated</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              This investor qualifies for premium service:
            </p>
            <div className="space-y-2">
              {vipBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{benefit}</p>
                </div>
              ))}
            </div>
            <div className="p-3 bg-amber-50 border border-amber-300 rounded">
              <p className="text-sm text-amber-900 font-medium">
                Senior officer and CEO have been notified. You will receive dedicated support.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fast-Track Modal */}
      <Dialog open={showFastTrack} onOpenChange={setShowFastTrack}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>⚡ Emergency Fast-Track Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              Fast-track processing reduces timeline by 50% but requires justification and approval.
            </p>
            <div>
              <label className="text-sm font-medium mb-2 block">Justification (required):</label>
              <textarea
                value={fastTrackJustification}
                onChange={(e) => setFastTrackJustification(e.target.value)}
                placeholder="E.g., Strategic government priority, job creation urgency, investor deadline..."
                className="w-full px-3 py-2 border rounded text-sm"
                rows={4}
              />
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded">
              <p className="text-sm text-purple-900">
                ℹ️ Deputy Director will review within 4 hours. You will be notified of decision.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFastTrack(false)}
                className="flex-1 px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={requestFastTrack}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Submit Request
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}