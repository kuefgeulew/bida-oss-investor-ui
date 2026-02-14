// ESG Panel - Environmental, Social, Governance dashboard
// READ-ONLY panel that reads from esgEngine
// Mounts in: Investor Dashboard

import React, { useMemo } from 'react';
import { Leaf, Users, Shield, TrendingUp, Award, Target, Zap } from 'lucide-react';
import { calculateESGScore, getGreenMetrics, getSustainabilityGoals, compareESGWithPeers, getGreenIncentives, calculateCarbonFootprint, type ESGScore } from './esgEngine';

interface ESGPanelProps {
  sector: string;
  investmentSize: number;
  certifications?: string[];
  hasETP?: boolean;
  hasSolarPower?: boolean;
  greenCoverPercent?: number;
  femaleWorkforcePercent?: number;
  employeeCount?: number;
}

export function ESGPanel({
  sector,
  investmentSize,
  certifications = [],
  hasETP = false,
  hasSolarPower = false,
  greenCoverPercent = 0,
  femaleWorkforcePercent = 0,
  employeeCount = 500,
}: ESGPanelProps) {
  const esgScore = useMemo(() => 
    calculateESGScore(sector, certifications, hasETP, hasSolarPower, greenCoverPercent, femaleWorkforcePercent, 0),
    [sector, certifications, hasETP, hasSolarPower, greenCoverPercent, femaleWorkforcePercent]
  );
  
  const greenMetrics = useMemo(() => getGreenMetrics(sector, investmentSize), [sector, investmentSize]);
  const sustainabilityGoals = useMemo(() => getSustainabilityGoals(sector), [sector]);
  const peerComparison = useMemo(() => compareESGWithPeers(esgScore, sector), [esgScore, sector]);
  const greenIncentives = useMemo(() => getGreenIncentives(), []);
  const carbonFootprint = useMemo(() => 
    calculateCarbonFootprint(sector, employeeCount, investmentSize * 100, hasSolarPower),
    [sector, employeeCount, investmentSize, hasSolarPower]
  );
  
  const getRatingColor = (rating: ESGScore['rating']) => {
    if (rating.startsWith('A')) return 'text-green-600 bg-green-100 border-green-300';
    if (rating.startsWith('B')) return 'text-blue-600 bg-blue-100 border-blue-300';
    return 'text-orange-600 bg-orange-100 border-orange-300';
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-blue-600';
    return 'text-orange-600';
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Leaf className="w-8 h-8" />
          <h2 className="text-2xl font-bold">ESG & Sustainability Tracker</h2>
        </div>
        <p className="text-green-100">Environmental, Social, and Governance performance metrics</p>
      </div>

      {/* ESG Score Card */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Overall ESG Rating</h3>
          <div className={`px-6 py-3 rounded-xl border-2 font-bold text-2xl ${getRatingColor(esgScore.rating)}`}>
            {esgScore.rating}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-green-600">Environmental</span>
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(esgScore.environmental)}`}>
              {esgScore.environmental}
            </div>
            <div className="text-xs text-gray-600 mt-1">out of 100</div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">Social</span>
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(esgScore.social)}`}>
              {esgScore.social}
            </div>
            <div className="text-xs text-gray-600 mt-1">out of 100</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600">Governance</span>
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(esgScore.governance)}`}>
              {esgScore.governance}
            </div>
            <div className="text-xs text-gray-600 mt-1">out of 100</div>
          </div>
        </div>
        
        {/* Detailed Breakdown */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Detailed Breakdown</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(esgScore.breakdown).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-xs text-gray-600 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className={`text-lg font-bold ${getScoreColor(value)}`}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Peer Comparison */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Industry Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <div className="text-sm text-gray-600 mb-1">Percentile Rank</div>
            <div className="text-3xl font-bold text-blue-600">{Math.round(peerComparison.percentileRank)}th</div>
            <div className="text-xs text-gray-600 mt-1">in {sector}</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <div className="text-sm text-gray-600 mb-1">Better Than</div>
            <div className="text-3xl font-bold text-green-600">{peerComparison.betterThan}%</div>
            <div className="text-xs text-gray-600 mt-1">of peer companies</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-xs font-semibold text-gray-700">Gap Analysis</div>
            {Object.entries(peerComparison.gap).map(([key, gap]) => (
              <div key={key} className="flex items-center justify-between text-xs">
                <span className="text-gray-600 capitalize">{key}:</span>
                <span className={`font-bold ${gap > 0 ? 'text-green-600' : 'text-orange-600'}`}>
                  {gap > 0 ? '+' : ''}{gap}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carbon Footprint */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-bold text-gray-900">Carbon Footprint Analysis</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="text-sm text-gray-600 mb-1">Total Emissions</div>
            <div className="text-2xl font-bold text-orange-600">{carbonFootprint.totalCO2Tons}</div>
            <div className="text-xs text-gray-600">tons CO2e/year</div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="text-sm text-gray-600 mb-1">Per Employee</div>
            <div className="text-2xl font-bold text-red-600">{carbonFootprint.perEmployee}</div>
            <div className="text-xs text-gray-600">tons CO2e</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-sm text-gray-600 mb-1">Offset Required</div>
            <div className="text-2xl font-bold text-green-600">{carbonFootprint.offsetRequired}</div>
            <div className="text-xs text-gray-600">tons</div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-sm text-gray-600 mb-1">Offset Cost</div>
            <div className="text-2xl font-bold text-blue-600">${carbonFootprint.offsetCost.toLocaleString()}</div>
            <div className="text-xs text-gray-600">per year</div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="text-xs font-semibold text-gray-700 mb-2">Emissions Breakdown</div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-sm text-gray-600">Energy</div>
              <div className="text-lg font-bold text-gray-900">{carbonFootprint.breakdown.energy} t</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Operations</div>
              <div className="text-lg font-bold text-gray-900">{carbonFootprint.breakdown.operations} t</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Transport</div>
              <div className="text-lg font-bold text-gray-900">{carbonFootprint.breakdown.transport} t</div>
            </div>
          </div>
        </div>
      </div>

      {/* Green Metrics */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Green Metrics</h3>
        <div className="space-y-3">
          {greenMetrics.map((metric, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold text-gray-900">{metric.metric}</div>
                  <div className="text-xs text-gray-600">Target: {metric.target} {metric.unit}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  metric.trend === 'improving' ? 'bg-green-100 text-green-800' :
                  metric.trend === 'declining' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {metric.trend}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      metric.value >= (metric.target || 100) ? 'bg-green-500' :
                      metric.value >= (metric.target || 100) * 0.7 ? 'bg-blue-500' :
                      'bg-orange-500'
                    }`}
                    style={{ width: `${Math.min(100, (metric.value / (metric.target || 100)) * 100)}%` }}
                  ></div>
                </div>
                <div className="text-lg font-bold text-gray-900 min-w-[80px] text-right">
                  {metric.value} {metric.unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainability Goals */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Sustainability Goals</h3>
        </div>
        
        <div className="space-y-4">
          {sustainabilityGoals.map((goal) => (
            <div key={goal.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">{goal.title}</div>
                  <div className="text-sm text-gray-600 mb-2">{goal.description}</div>
                  <div className="text-xs text-gray-500">Target: {new Date(goal.targetDate).toLocaleDateString()} • UN SDG {goal.relatedSDG}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-3 ${
                  goal.status === 'achieved' ? 'bg-green-100 text-green-800' :
                  goal.status === 'on-track' ? 'bg-blue-100 text-blue-800' :
                  goal.status === 'at-risk' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {goal.status}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      goal.status === 'achieved' ? 'bg-green-500' :
                      goal.status === 'on-track' ? 'bg-blue-500' :
                      goal.status === 'at-risk' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="text-sm font-bold text-gray-900 min-w-[50px] text-right">{goal.progress}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Green Incentives */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-bold text-gray-900">Available Green Incentives</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {greenIncentives.map((incentive, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 border border-green-200">
              <div className="font-bold text-gray-900 mb-1">{incentive.name}</div>
              <div className="text-sm text-gray-600 mb-2">{incentive.description}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Eligibility: {incentive.eligibility}</span>
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-bold">
                  {incentive.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {esgScore.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-bold text-gray-900">Areas for Improvement</h3>
          </div>
          <ul className="space-y-2">
            {esgScore.improvements.map((improvement, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5"></div>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
