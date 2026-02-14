import { useState } from 'react';
import { Card } from '../ui/card';
import { Zap } from 'lucide-react';
import { formatCurrency } from '@/app/admin-intelligence/nationalPulseEngine';
import { getPolicyImpact } from '@/app/admin-core/adminDataProvider';

interface PolicyScenario {
  taxHolidayYears: number;
  dutyExemptionPercent: number;
  sectorIncentives: Record<string, number>;
  landSubsidyPercent: number;
  fastTrackThreshold: number;
}

interface PolicyImpact {
  investorROIDelta: number;
  fdiAttractivenessScore: number;
  fiscalCost: number;
  projectedTaxReturn: number;
  netBenefit: number;
  competitivenessVsRegion: { country: string; score: number }[];
  recommendation: 'approve' | 'reconsider' | 'reject';
}

function simulatePolicyImpact(scenario: PolicyScenario, applications: any[]): PolicyImpact {
  // Calculate fiscal cost based on incentives
  const totalInvestment = applications.reduce((sum, app) => sum + app.investmentAmount, 0);
  const fiscalCost = (
    (scenario.taxHolidayYears * 0.1 * totalInvestment) +
    (scenario.dutyExemptionPercent / 100 * totalInvestment * 0.05) +
    (scenario.landSubsidyPercent / 100 * totalInvestment * 0.02)
  );

  // Calculate investor ROI delta
  const baseROI = 15;
  const roiBoost = (
    scenario.taxHolidayYears * 2 +
    scenario.dutyExemptionPercent * 0.1 +
    scenario.landSubsidyPercent * 0.2
  );
  const investorROIDelta = roiBoost;

  // Calculate FDI attractiveness
  const fdiAttractivenessScore = Math.min(100, 60 + roiBoost);

  // Calculate projected tax return (10 years)
  const projectedTaxReturn = totalInvestment * 0.25 * (10 - scenario.taxHolidayYears);

  // Net benefit
  const netBenefit = projectedTaxReturn - fiscalCost;

  // Regional competitiveness
  const competitivenessVsRegion = [
    { country: 'Singapore', score: 92 },
    { country: 'Malaysia', score: 78 },
    { country: 'Bangladesh (with policy)', score: Math.round(fdiAttractivenessScore) },
    { country: 'Vietnam', score: 75 },
    { country: 'Thailand', score: 72 }
  ].sort((a, b) => b.score - a.score);

  // Recommendation
  let recommendation: 'approve' | 'reconsider' | 'reject' = 'approve';
  if (netBenefit < 0) recommendation = 'reject';
  else if (netBenefit < fiscalCost * 0.5) recommendation = 'reconsider';

  return {
    investorROIDelta,
    fdiAttractivenessScore,
    fiscalCost,
    projectedTaxReturn,
    netBenefit,
    competitivenessVsRegion,
    recommendation
  };
}

function getRecommendationMessage(impact: PolicyImpact): string {
  if (impact.recommendation === 'approve') {
    return '✅ Policy is projected to deliver strong ROI and competitive advantage. Recommended for implementation.';
  } else if (impact.recommendation === 'reconsider') {
    return '⚠️ Policy shows moderate benefits but high fiscal cost. Consider adjustment or phased rollout.';
  } else {
    return '❌ Policy cost exceeds projected benefits. Not recommended without significant revisions.';
  }
}

interface PolicySimulatorPanelProps {
  applications: any[];
  role?: 'admin' | 'superadmin';
}

export function PolicySimulatorPanel({ applications, role }: PolicySimulatorPanelProps) {
  const [policyScenario, setPolicyScenario] = useState<PolicyScenario>({
    taxHolidayYears: 5,
    dutyExemptionPercent: 50,
    sectorIncentives: {
      'Textile & Garment': 10,
      'Pharmaceutical': 15,
      'IT & Software': 20,
      'Renewable Energy': 25,
      'Manufacturing': 10
    },
    landSubsidyPercent: 20,
    fastTrackThreshold: 5000000
  });
  const [policyImpact, setPolicyImpact] = useState<PolicyImpact | null>(null);

  const runSimulation = () => {
    const impact = simulatePolicyImpact(policyScenario, applications);
    setPolicyImpact(impact);
  };

  // SuperAdmin-only feature
  if (role !== 'superadmin') {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto bg-yellow-50 border-2 border-yellow-300 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-900 mb-4">🔒 SuperAdmin Access Required</h2>
          <p className="text-yellow-800">
            Policy Simulator is a SuperAdmin-only feature. Contact your system administrator for elevated access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          ⚙️ Policy Impact Simulator
        </h1>
        <p className="text-gray-600">Model impact of investment policies</p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">⚙️ Policy Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Tax Holiday (years): {policyScenario.taxHolidayYears}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={policyScenario.taxHolidayYears}
              onChange={(e) => setPolicyScenario({
                ...policyScenario,
                taxHolidayYears: parseInt(e.target.value)
              })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Duty Exemption (%): {policyScenario.dutyExemptionPercent}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={policyScenario.dutyExemptionPercent}
              onChange={(e) => setPolicyScenario({
                ...policyScenario,
                dutyExemptionPercent: parseInt(e.target.value)
              })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Land Subsidy (%): {policyScenario.landSubsidyPercent}
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={policyScenario.landSubsidyPercent}
              onChange={(e) => setPolicyScenario({
                ...policyScenario,
                landSubsidyPercent: parseInt(e.target.value)
              })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Fast-Track Threshold: ${(policyScenario.fastTrackThreshold / 1000000).toFixed(1)}M
            </label>
            <input
              type="range"
              min="1000000"
              max="10000000"
              step="1000000"
              value={policyScenario.fastTrackThreshold}
              onChange={(e) => setPolicyScenario({
                ...policyScenario,
                fastTrackThreshold: parseInt(e.target.value)
              })}
              className="w-full"
            />
          </div>
        </div>

        <button
          onClick={runSimulation}
          className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
        >
          <Zap className="w-5 h-5 inline mr-2" />
          Run Policy Simulation
        </button>
      </Card>

      {policyImpact && (
        <>
          <Card className={`p-6 border-l-4 ${
            policyImpact.recommendation === 'approve' ? 'border-green-500 bg-green-50' :
            policyImpact.recommendation === 'reconsider' ? 'border-yellow-500 bg-yellow-50' :
            'border-red-500 bg-red-50'
          }`}>
            <h3 className="font-semibold mb-2">Recommendation</h3>
            <p className="text-sm">{getRecommendationMessage(policyImpact)}</p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <p className="text-sm text-gray-600 mb-2">Investor ROI Delta</p>
              <p className={`text-3xl font-bold ${
                policyImpact.investorROIDelta > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {policyImpact.investorROIDelta > 0 ? '+' : ''}{policyImpact.investorROIDelta}%
              </p>
            </Card>

            <Card className="p-6">
              <p className="text-sm text-gray-600 mb-2">FDI Attractiveness Score</p>
              <p className="text-3xl font-bold text-blue-600">{policyImpact.fdiAttractivenessScore}/100</p>
            </Card>

            <Card className="p-6">
              <p className="text-sm text-gray-600 mb-2">Fiscal Cost (Annual)</p>
              <p className="text-3xl font-bold text-orange-600">
                {formatCurrency(policyImpact.fiscalCost)}
              </p>
            </Card>

            <Card className="p-6">
              <p className="text-sm text-gray-600 mb-2">Projected Tax Return (10yr)</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(policyImpact.projectedTaxReturn)}
              </p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Net Benefit Analysis</h3>
            <p className={`text-4xl font-bold ${
              policyImpact.netBenefit > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(policyImpact.netBenefit)}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {policyImpact.netBenefit > 0 
                ? 'Positive return on investment over 10 years' 
                : 'Negative return - policy cost exceeds projected benefits'}
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Regional Competitiveness</h3>
            <div className="space-y-2">
              {policyImpact.competitivenessVsRegion.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    {idx === 0 && <span className="text-xl">🥇</span>}
                    {idx === 1 && <span className="text-xl">🥈</span>}
                    {idx === 2 && <span className="text-xl">🥉</span>}
                    <span className={item.country.includes('Bangladesh') ? 'font-bold' : ''}>
                      {item.country}
                    </span>
                  </div>
                  <span className="font-bold">{item.score}/100</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}