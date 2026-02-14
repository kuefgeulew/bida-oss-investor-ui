// Officer Risk, Fraud & AML Layer
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Shield, AlertTriangle, CheckCircle2, XCircle, Building2 } from 'lucide-react';
import { calculateRiskScore, getRiskColorClass } from '@/app/officer-intelligence/riskScoring';
import { getBankState } from '@/app/bank-integration/bankMockEngine';
import { BankBadge } from '@/app/bank-integration/BankBadge';

interface OfficerRiskPanelProps {
  application: any;
}

export function OfficerRiskPanel({ application }: OfficerRiskPanelProps) {
  // 24. Risk Score Calculation
  const riskScore = calculateRiskScore(application);
  
  // Get bank state for KYC verification
  const bankState = getBankState(application.investorId);
  const bankKYCVerified = bankState?.kycVerification?.verified === true;

  // 25. Due Diligence Checklist
  const [dueDiligenceItems, setDueDiligenceItems] = useState([
    { id: 1, item: 'Verified investor identity documents', checked: false, critical: true },
    { id: 2, item: 'Confirmed source of funds legitimacy', checked: false, critical: true },
    { id: 3, item: 'Screened against sanctions lists (OFAC, UN, EU)', checked: false, critical: true },
    { id: 4, item: 'Verified Ultimate Beneficial Owner (UBO)', checked: false, critical: true },
    { id: 5, item: 'Checked adverse media and reputational risk', checked: false, critical: false },
    { id: 6, item: 'Confirmed business address and contact details', checked: false, critical: false },
    { id: 7, item: 'Reviewed financial statements authenticity', checked: false, critical: false },
    { id: 8, item: 'Verified previous business track record', checked: false, critical: false },
    { id: 9, item: 'Assessed sector-specific regulatory compliance', checked: false, critical: false },
    { id: 10, item: 'Conducted enhanced due diligence (if high-risk)', checked: false, critical: false }
  ]);

  const completionRate = Math.round(
    (dueDiligenceItems.filter(i => i.checked).length / dueDiligenceItems.length) * 100
  );

  const criticalItemsComplete = dueDiligenceItems
    .filter(i => i.critical)
    .every(i => i.checked);

  // 23. AML (Anti-Money Laundering) Panel
  const amlChecks = {
    sanctionsList: application.onSanctionsList || false,
    pepCheck: application.hasPEP || false,
    adverseMedia: application.hasAdverseMedia || false,
    shellCompany: application.shellCompanyIndicators || 0,
    highRiskJurisdiction: application.highRiskJurisdictions || 0,
    cashIntensive: application.isCashHeavy || false
  };

  const uboData = {
    disclosed: application.uboComplete || false,
    layers: application.ownershipLayers || 1,
    hasOffshore: application.hasOffshoreEntity || false,
    hasNominees: application.hasNomineeShareholders || false
  };

  return (
    <div className="space-y-4">
      {/* Risk Header */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <Shield className="w-5 h-5 text-red-600" />
        <h3 className="font-semibold text-lg">Risk & AML Assessment</h3>
      </div>

      {/* 🏦 BANK KYC VERIFICATION STATUS */}
      {bankState && (
        <Card className={`p-4 ${bankKYCVerified ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Building2 className={`w-5 h-5 ${bankKYCVerified ? 'text-green-600' : 'text-gray-600'}`} />
              <h4 className="font-semibold">Bank KYC Verification</h4>
            </div>
            <BankBadge size="sm" />
          </div>
          
          {bankKYCVerified ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-medium">KYC Performed by Bank Partner: ✓ Verified</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="p-2 bg-white rounded border border-green-200">
                  <p className="text-xs text-gray-600">Verification Date</p>
                  <p className="text-sm font-semibold">{new Date(bankState.kycVerification.verifiedDate).toLocaleDateString()}</p>
                </div>
                <div className="p-2 bg-white rounded border border-green-200">
                  <p className="text-xs text-gray-600">Risk Level</p>
                  <p className="text-sm font-semibold text-green-600">{bankState.kycVerification.riskLevel}</p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-white rounded border border-green-200">
                <p className="text-xs text-gray-600 mb-1">Documents Verified</p>
                <div className="flex flex-wrap gap-1">
                  {bankState.kycVerification.documentsVerified?.map((doc: string, idx: number) => (
                    <span key={idx} className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">
                      ✓ {doc}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded">
                <p className="text-sm text-green-900 font-medium">
                  ✓ Government can rely on bank's KYC verification. Investor financial readiness confirmed.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              <p>Bank KYC not yet completed. Investor should open corporate account for faster approval.</p>
            </div>
          )}
        </Card>
      )}

      {/* Critical Alerts */}
      {(amlChecks.sanctionsList || riskScore.total >= 75) && (
        <Card className="p-4 bg-red-50 border-2 border-red-500">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-red-900 mb-2">🚨 CRITICAL RISK ALERT</h4>
              {amlChecks.sanctionsList && (
                <div className="p-2 bg-red-100 border border-red-300 rounded mb-2">
                  <p className="text-sm font-bold text-red-900">
                    ⛔ SANCTIONS LIST MATCH DETECTED
                  </p>
                  <p className="text-xs text-red-800">
                    DO NOT PROCEED. Escalate to Legal & AML Compliance immediately.
                  </p>
                </div>
              )}
              {riskScore.total >= 75 && (
                <div className="p-2 bg-red-100 border border-red-300 rounded">
                  <p className="text-sm font-bold text-red-900">
                    ⚠️ CRITICAL RISK SCORE: {riskScore.total}/100
                  </p>
                  <p className="text-xs text-red-800">
                    Requires senior officer approval and enhanced due diligence
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* 24. Risk Score Dashboard */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h4 className="font-semibold">Overall Risk Score</h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">{riskScore.total}</span>
            <span className="text-gray-500">/100</span>
          </div>
        </div>

        <Badge className={`${getRiskColorClass(riskScore.total)} border mb-3`}>
          {riskScore.level} Risk
        </Badge>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Country Risk</p>
            <p className="text-lg font-bold">{riskScore.factors.country}/100</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Sector Risk</p>
            <p className="text-lg font-bold">{riskScore.factors.sector}/100</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Ownership Risk</p>
            <p className="text-lg font-bold">{riskScore.factors.ownership}/100</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Financial Risk</p>
            <p className="text-lg font-bold">{riskScore.factors.financialSource}/100</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Compliance</p>
            <p className="text-lg font-bold">{riskScore.factors.compliance}/100</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">AML Risk</p>
            <p className="text-lg font-bold">{riskScore.factors.aml}/100</p>
          </div>
        </div>

        {riskScore.flags.length > 0 && (
          <div className="border-t pt-3">
            <p className="font-semibold text-sm mb-2">🚩 Risk Flags:</p>
            <div className="space-y-1">
              {riskScore.flags.map((flag, idx) => (
                <div key={idx} className="text-sm p-2 bg-yellow-50 border border-yellow-200 rounded">
                  {flag}
                </div>
              ))}
            </div>
          </div>
        )}

        {riskScore.recommendations.length > 0 && (
          <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded">
            <p className="font-semibold text-sm text-orange-900 mb-2">📋 Required Actions:</p>
            <ul className="space-y-1">
              {riskScore.recommendations.map((rec, idx) => (
                <li key={idx} className="text-sm text-orange-800">• {rec}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* 23. AML & UBO Panel */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-purple-600" />
          <h4 className="font-semibold">Anti-Money Laundering (AML) Checks</h4>
        </div>

        <div className="space-y-2 mb-4">
          <div className={`flex items-center justify-between p-2 rounded ${
            amlChecks.sanctionsList ? 'bg-red-100 border border-red-300' : 'bg-green-50 border border-green-200'
          }`}>
            <span className="text-sm">Sanctions List Screening</span>
            {amlChecks.sanctionsList ? (
              <Badge variant="destructive">⚠️ MATCH FOUND</Badge>
            ) : (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">✓ Clear</Badge>
            )}
          </div>

          <div className={`flex items-center justify-between p-2 rounded ${
            amlChecks.pepCheck ? 'bg-yellow-100 border border-yellow-300' : 'bg-green-50 border border-green-200'
          }`}>
            <span className="text-sm">Politically Exposed Person (PEP)</span>
            {amlChecks.pepCheck ? (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">⚠️ Detected</Badge>
            ) : (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">✓ No</Badge>
            )}
          </div>

          <div className={`flex items-center justify-between p-2 rounded ${
            amlChecks.adverseMedia ? 'bg-orange-100 border border-orange-300' : 'bg-green-50 border border-green-200'
          }`}>
            <span className="text-sm">Adverse Media</span>
            {amlChecks.adverseMedia ? (
              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">⚠️ Found</Badge>
            ) : (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">✓ Clear</Badge>
            )}
          </div>

          <div className={`flex items-center justify-between p-2 rounded ${
            amlChecks.shellCompany > 0 ? 'bg-orange-100 border border-orange-300' : 'bg-green-50 border border-green-200'
          }`}>
            <span className="text-sm">Shell Company Indicators</span>
            <Badge variant="outline" className={amlChecks.shellCompany > 0 ? 'bg-orange-100 text-orange-800 border-orange-300' : 'bg-green-100 text-green-800 border-green-300'}>
              {amlChecks.shellCompany} found
            </Badge>
          </div>

          <div className={`flex items-center justify-between p-2 rounded ${
            amlChecks.cashIntensive ? 'bg-yellow-100 border border-yellow-300' : 'bg-green-50 border border-green-200'
          }`}>
            <span className="text-sm">Cash-Intensive Business</span>
            {amlChecks.cashIntensive ? (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Yes</Badge>
            ) : (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">No</Badge>
            )}
          </div>
        </div>

        <div className="border-t pt-3">
          <h5 className="font-semibold text-sm mb-2">Ultimate Beneficial Owner (UBO) Analysis</h5>
          <div className="grid grid-cols-2 gap-2">
            <div className={`p-2 rounded ${uboData.disclosed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className="text-xs text-gray-600">UBO Disclosed</p>
              <p className="font-bold text-sm">{uboData.disclosed ? '✓ Yes' : '✗ No'}</p>
            </div>
            <div className="p-2 bg-gray-50 border rounded">
              <p className="text-xs text-gray-600">Ownership Layers</p>
              <p className="font-bold text-sm">{uboData.layers} levels</p>
            </div>
            <div className={`p-2 rounded ${uboData.hasOffshore ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
              <p className="text-xs text-gray-600">Offshore Entities</p>
              <p className="font-bold text-sm">{uboData.hasOffshore ? '⚠️ Yes' : '✓ No'}</p>
            </div>
            <div className={`p-2 rounded ${uboData.hasNominees ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
              <p className="text-xs text-gray-600">Nominee Shareholders</p>
              <p className="font-bold text-sm">{uboData.hasNominees ? '⚠️ Yes' : '✓ No'}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* 25. Due Diligence Checklist */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold">Due Diligence Checklist</h4>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{completionRate}%</p>
            <p className="text-xs text-gray-600">Complete</p>
          </div>
        </div>

        <div className="mb-3">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${completionRate === 100 ? 'bg-green-500' : completionRate > 70 ? 'bg-blue-500' : 'bg-yellow-500'}`}
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {!criticalItemsComplete && (
          <div className="p-2 bg-red-50 border border-red-200 rounded mb-3">
            <p className="text-sm text-red-900 font-medium">
              ⚠️ Critical items must be completed before approval
            </p>
          </div>
        )}

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {dueDiligenceItems.map((item) => (
            <label
              key={item.id}
              className={`flex items-start gap-3 p-2 rounded border cursor-pointer hover:bg-gray-50 ${
                item.critical && !item.checked ? 'bg-yellow-50 border-yellow-300' : 'bg-white'
              }`}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => {
                  const newItems = dueDiligenceItems.map(i =>
                    i.id === item.id ? { ...i, checked: e.target.checked } : i
                  );
                  setDueDiligenceItems(newItems);
                }}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm">{item.item}</p>
                  {item.critical && (
                    <Badge variant="destructive" className="text-xs">Critical</Badge>
                  )}
                </div>
              </div>
              {item.checked ? (
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
              )}
            </label>
          ))}
        </div>

        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-900">
            {criticalItemsComplete && completionRate === 100
              ? '✓ All due diligence complete - safe to proceed'
              : criticalItemsComplete
              ? '○ Critical items complete - remaining items recommended'
              : '⚠️ Complete critical items before approving application'}
          </p>
        </div>
      </Card>
    </div>
  );
}