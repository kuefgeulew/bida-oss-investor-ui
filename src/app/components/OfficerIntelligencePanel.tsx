// Officer Intelligence Layer - Decision Support System
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, Brain, CheckCircle2, Clock, TrendingUp, FileText, ChevronRight } from 'lucide-react';
import { analyzeDelays, getDelaySummary, groupDelaysByParty } from '@/app/officer-intelligence/delayRules';
import { calculateComplexity, getComplexityColor, getComplexityIcon } from '@/app/officer-intelligence/complexityCalculator';
import { findSimilarCases, getApprovalRate, getAverageProcessingTime } from '@/app/officer-intelligence/caseDatabase';
import stepDependencies from '@/app/officer-intelligence/stepDependencies.json';

interface OfficerIntelligencePanelProps {
  application: any;
}

export function OfficerIntelligencePanel({ application }: OfficerIntelligencePanelProps) {
  const [showDelayDetails, setShowDelayDetails] = useState(false);
  const [showApprovalPrediction, setShowApprovalPrediction] = useState(false);
  const [showSimilarCases, setShowSimilarCases] = useState(false);

  // 1. Delay Root Cause Analysis
  const delayAnalysis = analyzeDelays(application);
  const delaysByParty = groupDelaysByParty(delayAnalysis);

  // 2. Complexity Score
  const complexity = calculateComplexity(application);

  // 3. Similar Past Cases
  const similarCases = findSimilarCases(application, 3);
  const approvalRate = getApprovalRate(application.sector);
  const avgProcessingTime = getAverageProcessingTime(application.sector);

  // 4. Approval Prediction (What Happens Next)
  const getCurrentStep = () => {
    return application.currentStep || 'bida_initial_review';
  };

  const getNextSteps = () => {
    const currentStepData = stepDependencies.applicationSteps.find(
      (s: any) => s.id === getCurrentStep()
    );
    return currentStepData?.nextSteps || [];
  };

  const predictApprovalPath = () => {
    // Determine which approval chain applies
    let chain = 'service_general';
    if (application.sector?.includes('Manufacturing')) chain = 'manufacturing_general';
    if (application.sector === 'Pharmaceutical') chain = 'pharmaceutical';
    if (application.zone && ['BEZA', 'BEPZA', 'BHTPA'].includes(application.zone)) chain = 'zone_based';

    const approvalChain = (stepDependencies.approvalChains as any)[chain] || [];
    const currentIndex = approvalChain.indexOf(getCurrentStep());
    
    return approvalChain.slice(currentIndex + 1, currentIndex + 4).map((stepId: string) => {
      const step = stepDependencies.applicationSteps.find((s: any) => s.id === stepId);
      return step;
    }).filter(Boolean);
  };

  // 5. Decision Confidence Meter
  const calculateConfidence = () => {
    let confidence = 50; // base

    // Document completeness
    const docCompleteness = (application.documents?.filter((d: any) => d.status === 'approved').length || 0) /
                           (application.documents?.length || 1);
    confidence += docCompleteness * 20;

    // Complexity factor
    if (complexity.total < 4) confidence += 15;
    else if (complexity.total > 7) confidence -= 10;

    // SLA compliance
    const slaRemaining = new Date(application.slaDeadline).getTime() - new Date().getTime();
    if (slaRemaining > 0) confidence += 10;
    else confidence -= 20;

    // Historical approval rate
    if (approvalRate > 80) confidence += 10;
    else if (approvalRate < 50) confidence -= 15;

    // Payment received
    if (application.paymentReceived) confidence += 5;

    return Math.max(0, Math.min(100, Math.round(confidence)));
  };

  const confidenceScore = calculateConfidence();

  return (
    <div className="space-y-4">
      {/* Intelligence Header */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <Brain className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-lg">Officer Intelligence & Decision Support</h3>
      </div>

      {/* 1. Delay Root Cause Engine */}
      <Card className="p-4 border-l-4 border-l-orange-500">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h4 className="font-semibold">Delay Analysis</h4>
              <Badge variant="outline" className="text-xs">
                {delayAnalysis.delayDays} days in process
              </Badge>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              {getDelaySummary(delayAnalysis)}
            </p>
            
            {delayAnalysis.primaryCause && (
              <div className="bg-orange-50 border border-orange-200 rounded p-3 mb-3">
                <p className="text-sm font-medium text-orange-900 mb-1">
                  Primary Cause: {delayAnalysis.primaryCause.reason}
                </p>
                <p className="text-sm text-orange-700">
                  <strong>Action:</strong> {delayAnalysis.primaryCause.solution}
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  Responsible: {delayAnalysis.primaryCause.responsibleParty}
                </p>
              </div>
            )}

            {delayAnalysis.rootCauses.length > 1 && (
              <button
                onClick={() => setShowDelayDetails(!showDelayDetails)}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                {showDelayDetails ? 'Hide' : 'Show'} all {delayAnalysis.rootCauses.length} delay causes
                <ChevronRight className={`w-4 h-4 transition-transform ${showDelayDetails ? 'rotate-90' : ''}`} />
              </button>
            )}

            {showDelayDetails && (
              <div className="mt-3 space-y-2">
                {Object.entries(delaysByParty).map(([party, causes]) => (
                  <div key={party} className="bg-gray-50 rounded p-2">
                    <p className="text-xs font-semibold text-gray-600 uppercase mb-1">{party}</p>
                    {(causes as any[]).map((cause, idx) => (
                      <div key={idx} className="text-sm text-gray-700 ml-2 mb-1">
                        • {cause.reason}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* 2. Application Complexity Score */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold">Complexity Score</h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">{complexity.total}</span>
            <span className="text-gray-500">/10</span>
          </div>
        </div>

        <Badge className={`${getComplexityColor(complexity.total)} border mb-3`}>
          {getComplexityIcon(complexity.total)} {complexity.level}
        </Badge>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 rounded p-2">
            <p className="text-xs text-gray-600">Sector Risk</p>
            <p className="font-semibold">{complexity.factors.sector.toFixed(1)}/5</p>
          </div>
          <div className="bg-gray-50 rounded p-2">
            <p className="text-xs text-gray-600">Investment Size</p>
            <p className="font-semibold">{complexity.factors.investmentSize.toFixed(1)}/5</p>
          </div>
          <div className="bg-gray-50 rounded p-2">
            <p className="text-xs text-gray-600">Agencies</p>
            <p className="font-semibold">{complexity.factors.agencyCount.toFixed(1)}/5</p>
          </div>
          <div className="bg-gray-50 rounded p-2">
            <p className="text-xs text-gray-600">Regulatory</p>
            <p className="font-semibold">{complexity.factors.regulatoryComplexity.toFixed(1)}/5</p>
          </div>
        </div>

        <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-900">
            <Clock className="w-4 h-4 inline mr-1" />
            Est. {complexity.estimatedDays} days processing time
          </p>
          <p className="text-xs text-blue-700 mt-1">
            Requires: {complexity.requiresExpertise.join(', ')}
          </p>
        </div>
      </Card>

      {/* 3. "If I Approve This" Prediction */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <h4 className="font-semibold">If You Approve This...</h4>
        </div>

        <button
          onClick={() => setShowApprovalPrediction(!showApprovalPrediction)}
          className="w-full text-left bg-green-50 border border-green-200 rounded p-3 hover:bg-green-100 transition-colors"
        >
          <p className="text-sm font-medium text-green-900">
            Next {predictApprovalPath().length} steps will be triggered
          </p>
          <p className="text-xs text-green-700 mt-1">Click to see workflow prediction</p>
        </button>

        {showApprovalPrediction && (
          <div className="mt-3 space-y-2">
            {predictApprovalPath().map((step: any, idx: number) => (
              <div key={idx} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                <div className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{step.name}</p>
                  <p className="text-xs text-gray-600">
                    {step.responsibleParty} • ~{step.estimatedDays} days
                  </p>
                  {step.requiredDocuments.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Requires: {step.requiredDocuments.slice(0, 2).join(', ')}
                      {step.requiredDocuments.length > 2 && ` +${step.requiredDocuments.length - 2} more`}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 4. Similar Past Cases */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-purple-600" />
          <h4 className="font-semibold">Similar Past Cases</h4>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-purple-50 border border-purple-200 rounded p-2">
            <p className="text-xs text-purple-600">Approval Rate</p>
            <p className="text-2xl font-bold text-purple-900">{approvalRate}%</p>
            <p className="text-xs text-purple-700">in {application.sector}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded p-2">
            <p className="text-xs text-purple-600">Avg Processing</p>
            <p className="text-2xl font-bold text-purple-900">{avgProcessingTime}</p>
            <p className="text-xs text-purple-700">days</p>
          </div>
        </div>

        <button
          onClick={() => setShowSimilarCases(!showSimilarCases)}
          className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
        >
          {showSimilarCases ? 'Hide' : 'View'} {similarCases.length} similar cases
          <ChevronRight className={`w-4 h-4 transition-transform ${showSimilarCases ? 'rotate-90' : ''}`} />
        </button>

        {showSimilarCases && (
          <div className="mt-3 space-y-2">
            {similarCases.map((c) => (
              <div key={c.id} className="p-2 bg-gray-50 border border-gray-200 rounded">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-mono text-gray-600">{c.id}</p>
                  <Badge variant={c.status === 'approved' ? 'default' : 'destructive'} className="text-xs">
                    {c.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium">${(c.investmentAmount / 1000000).toFixed(1)}M • {c.country}</p>
                <p className="text-xs text-gray-600">{c.processingDays} days • {c.officer}</p>
                {c.conditions && c.conditions.length > 0 && (
                  <p className="text-xs text-orange-600 mt-1">Conditions applied</p>
                )}
                {c.rejectionReason && (
                  <p className="text-xs text-red-600 mt-1">Rejected: {c.rejectionReason}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 5. Decision Confidence Meter */}
      <Card className="p-4 border-l-4 border-l-blue-500">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold">Decision Confidence</h4>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  confidenceScore > 70 ? 'bg-green-500' :
                  confidenceScore > 50 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${confidenceScore}%` }}
              />
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{confidenceScore}%</p>
            <p className="text-xs text-gray-600">compliant</p>
          </div>
        </div>

        <p className="text-sm text-gray-700 mt-2">
          {confidenceScore > 80 && '✓ High confidence - Approval recommended with standard conditions'}
          {confidenceScore > 60 && confidenceScore <= 80 && '○ Moderate confidence - Review key documents before decision'}
          {confidenceScore > 40 && confidenceScore <= 60 && '⚠ Low confidence - Additional verification required'}
          {confidenceScore <= 40 && '⚠️ Very low confidence - Consider holding application for clarification'}
        </p>
      </Card>
    </div>
  );
}
