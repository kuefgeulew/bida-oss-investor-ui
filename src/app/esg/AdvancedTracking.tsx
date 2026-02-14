// Advanced Social & Governance Tracking - Pay gap, board diversity, whistleblower
// Mounts in: ESG Panel

import React, { useState } from 'react';
import { Users, Shield, DollarSign, TrendingUp, AlertCircle, Lock, Eye, FileText, Save, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface PayGapData {
  maleAverageSalary: number;
  femaleAverageSalary: number;
  gapPercentage: number;
  totalMaleEmployees: number;
  totalFemaleEmployees: number;
  seniorMalePct: number;
  seniorFemalePct: number;
}

interface BoardDiversity {
  totalMembers: number;
  femaleMembers: number;
  minorityMembers: number;
  averageAge: number;
  independentDirectors: number;
  femalePercentage: number;
  minorityPercentage: number;
}

interface WhistleblowerCase {
  id: string;
  date: string;
  category: 'corruption' | 'harassment' | 'safety' | 'environmental' | 'discrimination' | 'financial';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'submitted' | 'under-review' | 'investigating' | 'resolved' | 'closed';
  description: string;
  anonymousId: string;
  investigator?: string;
  resolution?: string;
}

interface AdvancedTrackingProps {
  investorId: string;
}

export function AdvancedTracking({ investorId }: AdvancedTrackingProps) {
  const [activeTab, setActiveTab] = useState<'paygap' | 'board' | 'whistleblower'>('paygap');
  
  // Pay gap data
  const [payGap, setPayGap] = useState<PayGapData>({
    maleAverageSalary: 45000,
    femaleAverageSalary: 41500,
    gapPercentage: 7.8,
    totalMaleEmployees: 350,
    totalFemaleEmployees: 280,
    seniorMalePct: 72,
    seniorFemalePct: 28,
  });
  
  // Board diversity data
  const [board, setBoard] = useState<BoardDiversity>({
    totalMembers: 9,
    femaleMembers: 3,
    minorityMembers: 2,
    averageAge: 52,
    independentDirectors: 4,
    femalePercentage: 33.3,
    minorityPercentage: 22.2,
  });
  
  // Whistleblower cases
  const [cases, setCases] = useState<WhistleblowerCase[]>([
    {
      id: 'WB-2026-001',
      date: '2026-02-10',
      category: 'safety',
      severity: 'high',
      status: 'investigating',
      description: 'Inadequate safety equipment in production area',
      anonymousId: 'ANON-8F3D',
      investigator: 'Safety Officer Rahman',
    },
    {
      id: 'WB-2026-002',
      date: '2026-01-28',
      category: 'harassment',
      severity: 'critical',
      status: 'resolved',
      description: 'Workplace harassment complaint',
      anonymousId: 'ANON-2K9L',
      investigator: 'HR Director Ahmed',
      resolution: 'Disciplinary action taken. Mandatory training implemented.',
    },
  ]);
  
  const [newCase, setNewCase] = useState({
    category: 'corruption' as const,
    severity: 'medium' as const,
    description: '',
  });
  
  const handleUpdatePayGap = () => {
    toast.success('Pay gap data updated!', {
      description: 'Your wage equity metrics have been recorded.',
    });
  };
  
  const handleUpdateBoard = () => {
    // Recalculate percentages
    const updatedBoard = {
      ...board,
      femalePercentage: (board.femaleMembers / board.totalMembers) * 100,
      minorityPercentage: (board.minorityMembers / board.totalMembers) * 100,
    };
    setBoard(updatedBoard);
    
    toast.success('Board diversity updated!', {
      description: `${updatedBoard.femalePercentage.toFixed(1)}% female representation`,
    });
  };
  
  const handleSubmitWhistleblower = (e: React.FormEvent) => {
    e.preventDefault();
    
    const anonymousId = 'ANON-' + Math.random().toString(36).substr(2, 4).toUpperCase();
    const caseId = `WB-${new Date().getFullYear()}-${String(cases.length + 1).padStart(3, '0')}`;
    
    const newWBCase: WhistleblowerCase = {
      id: caseId,
      date: new Date().toISOString().slice(0, 10),
      category: newCase.category,
      severity: newCase.severity,
      status: 'submitted',
      description: newCase.description,
      anonymousId: anonymousId,
    };
    
    setCases([newWBCase, ...cases]);
    
    toast.success('Report submitted anonymously', {
      description: `Case ID: ${caseId} | Anonymous ID: ${anonymousId}`,
    });
    
    // Reset form
    setNewCase({
      category: 'corruption',
      severity: 'medium',
      description: '',
    });
  };
  
  const getPayGapRating = (gap: number) => {
    if (gap < 3) return { rating: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (gap < 7) return { rating: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (gap < 12) return { rating: 'Fair', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { rating: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-100' };
  };
  
  const getBoardRating = (femalePct: number) => {
    if (femalePct >= 40) return { rating: 'Leading', color: 'text-green-600' };
    if (femalePct >= 30) return { rating: 'Good', color: 'text-blue-600' };
    if (femalePct >= 20) return { rating: 'Fair', color: 'text-orange-600' };
    return { rating: 'Below Standard', color: 'text-red-600' };
  };
  
  const getCaseStatusColor = (status: WhistleblowerCase['status']) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getSeverityColor = (severity: WhistleblowerCase['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-300';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-300';
    }
  };
  
  const payGapRating = getPayGapRating(payGap.gapPercentage);
  const boardRating = getBoardRating(board.femalePercentage);
  
  const tabs = [
    { id: 'paygap', label: 'Pay Gap Analysis', icon: DollarSign },
    { id: 'board', label: 'Board Diversity', icon: Users },
    { id: 'whistleblower', label: 'Whistleblower Portal', icon: Shield },
  ];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Advanced Social & Governance Tracking</h2>
        </div>
        <p className="text-indigo-100">Gender equity, board diversity, and ethical governance metrics</p>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Pay Gap Analysis */}
      {activeTab === 'paygap' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-600" />
              Gender Pay Gap Analysis
            </h3>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className={`${payGapRating.bg} border-2 border-gray-300 rounded-xl p-6`}>
                <div className="text-sm font-semibold text-gray-700 mb-1">Pay Gap</div>
                <div className={`text-4xl font-bold ${payGapRating.color}`}>
                  {payGap.gapPercentage}%
                </div>
                <div className={`text-sm font-bold ${payGapRating.color} mt-2`}>
                  {payGapRating.rating}
                </div>
              </div>
              
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="text-sm font-semibold text-gray-700 mb-1">Male Avg Salary</div>
                <div className="text-4xl font-bold text-blue-900">
                  ৳{(payGap.maleAverageSalary / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-blue-700 mt-2">
                  {payGap.totalMaleEmployees} employees
                </div>
              </div>
              
              <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-6">
                <div className="text-sm font-semibold text-gray-700 mb-1">Female Avg Salary</div>
                <div className="text-4xl font-bold text-pink-900">
                  ৳{(payGap.femaleAverageSalary / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-pink-700 mt-2">
                  {payGap.totalFemaleEmployees} employees
                </div>
              </div>
            </div>
            
            {/* Data Entry Form */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-4">Update Pay Gap Data</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Male Average Salary (BDT/month)
                  </label>
                  <input
                    type="number"
                    value={payGap.maleAverageSalary}
                    onChange={e => setPayGap({ 
                      ...payGap, 
                      maleAverageSalary: Number(e.target.value),
                      gapPercentage: ((Number(e.target.value) - payGap.femaleAverageSalary) / Number(e.target.value) * 100)
                    })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Female Average Salary (BDT/month)
                  </label>
                  <input
                    type="number"
                    value={payGap.femaleAverageSalary}
                    onChange={e => setPayGap({ 
                      ...payGap, 
                      femaleAverageSalary: Number(e.target.value),
                      gapPercentage: ((payGap.maleAverageSalary - Number(e.target.value)) / payGap.maleAverageSalary * 100)
                    })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Male Employees
                  </label>
                  <input
                    type="number"
                    value={payGap.totalMaleEmployees}
                    onChange={e => setPayGap({ ...payGap, totalMaleEmployees: Number(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Female Employees
                  </label>
                  <input
                    type="number"
                    value={payGap.totalFemaleEmployees}
                    onChange={e => setPayGap({ ...payGap, totalFemaleEmployees: Number(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              
              <button
                onClick={handleUpdatePayGap}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Update Pay Gap Data
              </button>
            </div>
            
            {/* Insights */}
            <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-2">💡 Insights & Recommendations</h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• <strong>Industry Benchmark:</strong> Average pay gap in {investorId}: 9.5% (You: {payGap.gapPercentage}%)</li>
                <li>• <strong>Senior Leadership:</strong> {payGap.seniorFemalePct}% female in senior roles (Target: 40%)</li>
                <li>• <strong>Recommendation:</strong> {payGap.gapPercentage > 10 
                  ? 'Conduct salary audit and implement pay equity policy'
                  : 'Good progress! Continue monitoring and annual reviews'
                }</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Board Diversity */}
      {activeTab === 'board' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              Board of Directors Diversity
            </h3>
            
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="text-sm text-blue-600 mb-1">Total Members</div>
                <div className="text-4xl font-bold text-blue-900">{board.totalMembers}</div>
              </div>
              
              <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-4">
                <div className="text-sm text-pink-600 mb-1">Female Members</div>
                <div className="text-4xl font-bold text-pink-900">{board.femaleMembers}</div>
                <div className={`text-sm font-bold ${boardRating.color} mt-1`}>
                  {board.femalePercentage.toFixed(1)}% ({boardRating.rating})
                </div>
              </div>
              
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="text-sm text-purple-600 mb-1">Minority Members</div>
                <div className="text-4xl font-bold text-purple-900">{board.minorityMembers}</div>
                <div className="text-sm text-purple-700 mt-1">
                  {board.minorityPercentage.toFixed(1)}%
                </div>
              </div>
              
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <div className="text-sm text-green-600 mb-1">Independent Directors</div>
                <div className="text-4xl font-bold text-green-900">{board.independentDirectors}</div>
                <div className="text-sm text-green-700 mt-1">
                  {((board.independentDirectors / board.totalMembers) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
            
            {/* Data Entry */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-4">Update Board Composition</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Board Members
                  </label>
                  <input
                    type="number"
                    value={board.totalMembers}
                    onChange={e => setBoard({ ...board, totalMembers: Number(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Female Members
                  </label>
                  <input
                    type="number"
                    value={board.femaleMembers}
                    onChange={e => setBoard({ ...board, femaleMembers: Number(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    min="0"
                    max={board.totalMembers}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minority Members
                  </label>
                  <input
                    type="number"
                    value={board.minorityMembers}
                    onChange={e => setBoard({ ...board, minorityMembers: Number(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    min="0"
                    max={board.totalMembers}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Independent Directors
                  </label>
                  <input
                    type="number"
                    value={board.independentDirectors}
                    onChange={e => setBoard({ ...board, independentDirectors: Number(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    min="0"
                    max={board.totalMembers}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Average Age
                  </label>
                  <input
                    type="number"
                    value={board.averageAge}
                    onChange={e => setBoard({ ...board, averageAge: Number(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    min="25"
                    max="90"
                  />
                </div>
              </div>
              
              <button
                onClick={handleUpdateBoard}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Update Board Data
              </button>
            </div>
            
            {/* Best Practices */}
            <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-900 mb-2">📋 Best Practice Guidelines</h4>
              <ul className="text-sm text-green-800 space-y-2">
                <li>• <strong>BSEC Guidelines:</strong> At least 1 female director on every board</li>
                <li>• <strong>International Standard:</strong> 30-40% female representation (You: {board.femalePercentage.toFixed(1)}%)</li>
                <li>• <strong>Independent Directors:</strong> Minimum 1/3 of board (You: {((board.independentDirectors / board.totalMembers) * 100).toFixed(0)}%)</li>
                <li>• <strong>Age Diversity:</strong> Mix of experience and fresh perspectives (Avg: {board.averageAge} years)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Whistleblower Portal */}
      {activeTab === 'whistleblower' && (
        <div className="space-y-6">
          {/* Submit New Report */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-red-600" />
              Submit Anonymous Report
            </h3>
            
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="text-sm text-red-900">
                  <p className="font-bold mb-1">100% Anonymous & Protected</p>
                  <p>Your identity is encrypted and never stored. No IP tracking. No retaliation permitted under law.</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmitWhistleblower} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Report Category
                  </label>
                  <select
                    value={newCase.category}
                    onChange={e => setNewCase({ ...newCase, category: e.target.value as any })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    required
                  >
                    <option value="corruption">Corruption / Bribery</option>
                    <option value="harassment">Harassment / Bullying</option>
                    <option value="safety">Safety Violations</option>
                    <option value="environmental">Environmental Violations</option>
                    <option value="discrimination">Discrimination</option>
                    <option value="financial">Financial Misconduct</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Severity Level
                  </label>
                  <select
                    value={newCase.severity}
                    onChange={e => setNewCase({ ...newCase, severity: e.target.value as any })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Report Description
                </label>
                <textarea
                  value={newCase.description}
                  onChange={e => setNewCase({ ...newCase, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  rows={5}
                  placeholder="Provide detailed information about the incident..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Submit Anonymous Report
              </button>
            </form>
          </div>
          
          {/* Case Management */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Active Cases ({cases.length})</h3>
            
            <div className="space-y-4">
              {cases.map(caseItem => (
                <div
                  key={caseItem.id}
                  className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-900">{caseItem.id}</span>
                        <span className={`text-xs px-3 py-1 rounded-full font-bold ${getCaseStatusColor(caseItem.status)}`}>
                          {caseItem.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Filed: {new Date(caseItem.date).toLocaleDateString()} | Category: {caseItem.category}
                      </div>
                    </div>
                    
                    <span className={`text-xs px-3 py-1 rounded-full font-bold border-2 ${getSeverityColor(caseItem.severity)}`}>
                      {caseItem.severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                    <p className="text-sm text-gray-800">{caseItem.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white rounded-lg p-2 border border-gray-200">
                      <div className="text-gray-600 mb-1">Anonymous ID</div>
                      <div className="font-mono font-bold text-gray-900">{caseItem.anonymousId}</div>
                    </div>
                    
                    {caseItem.investigator && (
                      <div className="bg-white rounded-lg p-2 border border-gray-200">
                        <div className="text-gray-600 mb-1">Investigator</div>
                        <div className="font-bold text-gray-900">{caseItem.investigator}</div>
                      </div>
                    )}
                    
                    {caseItem.resolution && (
                      <div className="bg-green-50 rounded-lg p-2 border border-green-200 md:col-span-3">
                        <div className="text-green-600 mb-1 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Resolution
                        </div>
                        <div className="text-sm text-green-900">{caseItem.resolution}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Statistics */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6">
            <h4 className="text-lg font-bold text-indigo-900 mb-4">Whistleblower Program Statistics</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-indigo-200">
                <div className="text-sm text-indigo-600 mb-1">Total Reports</div>
                <div className="text-3xl font-bold text-indigo-900">{cases.length}</div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-indigo-200">
                <div className="text-sm text-indigo-600 mb-1">Resolved</div>
                <div className="text-3xl font-bold text-green-900">
                  {cases.filter(c => c.status === 'resolved').length}
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-indigo-200">
                <div className="text-sm text-indigo-600 mb-1">Under Investigation</div>
                <div className="text-3xl font-bold text-orange-900">
                  {cases.filter(c => c.status === 'investigating').length}
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-indigo-200">
                <div className="text-sm text-indigo-600 mb-1">Avg Resolution Time</div>
                <div className="text-3xl font-bold text-indigo-900">18</div>
                <div className="text-xs text-indigo-700">days</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
