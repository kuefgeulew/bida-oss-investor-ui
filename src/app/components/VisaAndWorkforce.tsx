/**
 * Visa and Workforce Management
 * Foreign investor visa tracking and workforce quota management
 * Plugs into: InvestorDashboard → Services Tab
 */

import React, { useState } from 'react';
import { Card } from './ui/card';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  UserCheck,
  Calendar,
  Building2,
  Globe,
  Briefcase,
  TrendingUp,
  Download,
  Upload,
  Search,
  Filter,
  Award,
  Target,
  UserPlus
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { InstrumentSection, InstrumentCard, PrimaryButton, SecondaryButton } from './DesignSystem';
import { motion } from 'motion/react';

// 🔌 ENGINE IMPORTS - Real Talent & Workflow Integration
import { recommendTalent, getTalentPoolStats, getTalentByCategory, type TalentRecommendation } from '@/app/talent/talentEngine';
import { getPipeline } from '@/app/gov-agencies/agencyWorkflowEngine';
import { visaApplications, foreignWorkers } from '@/app/data/visaWorkforceMockData';

// TypeScript Interfaces
interface VisaApplication {
  id: string;
  applicantName: string;
  applicantCountry: string;
  visaType: 'investor' | 'work-permit' | 'employment' | 'business';
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  appliedDate: Date;
  estimatedCompletionDate: Date;
  documents: {
    name: string;
    uploaded: boolean;
  }[];
}

interface ForeignWorker {
  id: string;
  name: string;
  country: string;
  position: string;
  qualification: string;
  visaStatus: 'active' | 'expired' | 'pending' | 'renewal';
  visaExpiryDate: Date;
}

interface WorkforceQuota {
  total: number;
  used: number;
  available: number;
  byCategory: {
    [key: string]: {
      quota: number;
      used: number;
    };
  };
}

export function VisaAndWorkforce() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'visas' | 'workforce' | 'quota' | 'talent'>('visas');

  // 🔌 ENGINE CONNECTION: Get investor's pipeline data
  // This would be passed as a prop in real implementation
  const mockInvestorId = 'INV-001';
  const pipeline = getPipeline(mockInvestorId);
  
  // Calculate approved work permits from pipeline
  const approvedWorkPermits = pipeline?.approvalSteps.filter(
    step => step.serviceName.toLowerCase().includes('work permit') && step.status === 'approved'
  ).length || 0;
  
  // Get sector from pipeline (default to manufacturing)
  const investorSector = pipeline?.sector || 'manufacturing';
  
  // 🎯 TALENT RECOMMENDATIONS - Engine-driven
  const talentRecommendations = recommendTalent(investorSector, approvedWorkPermits);
  const talentStats = getTalentPoolStats();
  const managementTalent = getTalentByCategory('management');
  const technicalTalent = getTalentByCategory('technical');

  const workforceQuota: WorkforceQuota = {
    total: 50,
    used: 12,
    available: 38,
    byCategory: {
      management: { quota: 15, used: 4 },
      technical: { quota: 25, used: 6 },
      specialized: { quota: 10, used: 2 },
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': case 'active': return 'bg-green-50 text-green-700 border-green-200';
      case 'under-review': case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'rejected': case 'expired': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': case 'active': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'under-review': case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected': case 'expired': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <InstrumentSection>
      <div className="p-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight mb-1">
            Visa & Workforce Management
          </h2>
          <p className="text-sm text-slate-600">
            Manage foreign investor visas, work permits, and workforce quotas
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <InstrumentCard>
            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-1">
                <Users className="w-6 h-6 text-[#3b82f6]" />
                <span className="text-xl font-bold text-[#0f172a]">{foreignWorkers.length}</span>
              </div>
              <div className="text-xs text-slate-600">Foreign Workers</div>
            </div>
          </InstrumentCard>

          <InstrumentCard>
            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-1">
                <FileText className="w-6 h-6 text-[#3b82f6]" />
                <span className="text-xl font-bold text-[#0f172a]">{visaApplications.length}</span>
              </div>
              <div className="text-xs text-slate-600">Active Applications</div>
            </div>
          </InstrumentCard>

          <InstrumentCard>
            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-1">
                <Briefcase className="w-6 h-6 text-[#3b82f6]" />
                <span className="text-xl font-bold text-[#0f172a]">{workforceQuota.available}</span>
              </div>
              <div className="text-xs text-slate-600">Available Quota</div>
            </div>
          </InstrumentCard>

          <InstrumentCard>
            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-1">
                <Calendar className="w-6 h-6 text-[#3b82f6]" />
                <span className="text-xl font-bold text-[#0f172a]">20</span>
              </div>
              <div className="text-xs text-slate-600">Avg. Processing Days</div>
            </div>
          </InstrumentCard>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {(['visas', 'workforce', 'quota', 'talent'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl font-medium transition-all shadow-md ${
                activeTab === tab
                  ? 'bg-[#3b82f6] text-white shadow-lg'
                  : 'bg-white/60 backdrop-blur-sm text-slate-600 hover:bg-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Visa Applications Tab */}
        {activeTab === 'visas' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#0f172a]">Visa Applications</h3>
              <PrimaryButton className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                New Visa Application
              </PrimaryButton>
            </div>

            {visaApplications.map((visa, index) => (
              <motion.div
                key={visa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <InstrumentCard>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center">
                          {getStatusIcon(visa.status)}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-bold text-[#0f172a]">{visa.applicantName}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(visa.status)}`}>
                              {visa.status.replace('-', ' ')}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                              {visa.visaType.replace('-', ' ')}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-slate-600 mb-4">
                            <Globe className="w-4 h-4" />
                            <span>{visa.applicantCountry}</span>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                              <div className="text-sm text-slate-600">Applied Date</div>
                              <div className="font-semibold text-[#0f172a]">
                                {visa.appliedDate.toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-slate-600">Est. Completion</div>
                              <div className="font-semibold text-[#0f172a]">
                                {visa.estimatedCompletionDate.toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-slate-600">Documents</div>
                              <div className="font-semibold text-[#0f172a]">
                                {visa.documents.filter(d => d.uploaded).length} / {visa.documents.length}
                              </div>
                            </div>
                          </div>

                          <div className="bg-slate-50 rounded-xl p-4">
                            <div className="text-sm font-medium text-slate-700 mb-2">Required Documents:</div>
                            <div className="space-y-2">
                              {visa.documents.map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                  <span className="text-sm text-slate-600">{doc.name}</span>
                                  {doc.uploaded ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <SecondaryButton>View Details</SecondaryButton>
                    </div>
                  </div>
                </InstrumentCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* Foreign Workforce Tab */}
        {activeTab === 'workforce' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#0f172a]">Foreign Workforce</h3>
              <PrimaryButton className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Add Worker
              </PrimaryButton>
            </div>

            {foreignWorkers.map((worker, index) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <InstrumentCard>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center">
                          <Users className="w-6 h-6 text-[#3b82f6]" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-bold text-[#0f172a]">{worker.name}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(worker.visaStatus)}`}>
                              {worker.visaStatus}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-slate-600 mb-4">
                            <Globe className="w-4 h-4" />
                            <span>{worker.country}</span>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <div className="text-sm text-slate-600">Position</div>
                              <div className="font-semibold text-[#0f172a]">{worker.position}</div>
                            </div>
                            <div>
                              <div className="text-sm text-slate-600">Qualification</div>
                              <div className="font-semibold text-[#0f172a]">{worker.qualification}</div>
                            </div>
                            <div>
                              <div className="text-sm text-slate-600">Visa Expiry</div>
                              <div className="font-semibold text-[#0f172a]">
                                {worker.visaExpiryDate.toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <SecondaryButton>View Details</SecondaryButton>
                    </div>
                  </div>
                </InstrumentCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* Workforce Quota Tab */}
        {activeTab === 'quota' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#0f172a]">Foreign Workforce Quota</h3>

            {/* Overall Quota */}
            <InstrumentCard>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-[#0f172a] mb-4">Overall Quota</h4>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-600">Used: {workforceQuota.used} / {workforceQuota.total}</span>
                  <span className="text-2xl font-bold text-[#0f172a]">
                    {Math.round((workforceQuota.used / workforceQuota.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
                  <div
                    className="bg-[#3b82f6] h-3 rounded-full"
                    style={{ width: `${(workforceQuota.used / workforceQuota.total) * 100}%` }}
                  />
                </div>
                <div className="text-lg font-semibold text-[#0f172a]">
                  {workforceQuota.available} positions available
                </div>
              </div>
            </InstrumentCard>

            {/* By Category */}
            <div className="grid gap-4">
              {Object.entries(workforceQuota.byCategory).map(([category, data]) => (
                <InstrumentCard key={category}>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-[#0f172a] mb-4 capitalize">{category}</h4>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-slate-600">Used: {data.used} / {data.quota}</span>
                      <span className="text-xl font-bold text-[#0f172a]">
                        {Math.round((data.used / data.quota) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-[#3b82f6] h-2 rounded-full"
                        style={{ width: `${(data.used / data.quota) * 100}%` }}
                      />
                    </div>
                  </div>
                </InstrumentCard>
              ))}
            </div>
          </div>
        )}

        {/* Talent Recommendations Tab */}
        {activeTab === 'talent' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold text-[#0f172a]">Recommended Talent for {investorSector}</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Based on {approvedWorkPermits} approved work permits • {talentRecommendations.length} candidates matched
                </p>
              </div>
              <div className="px-4 py-2 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-700">
                  Avg Match Score: {talentStats.averageMatchScore}%
                </span>
              </div>
            </div>

            {/* Talent Pool Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0f172a]">{talentStats.total}</div>
                    <div className="text-xs text-slate-600">Total Pool</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0f172a]">{talentRecommendations.length}</div>
                    <div className="text-xs text-slate-600">Sector Matches</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0f172a]">{approvedWorkPermits}</div>
                    <div className="text-xs text-slate-600">Work Permits</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Talent Cards */}
            <div className="grid grid-cols-1 gap-4">
              {talentRecommendations.map((talent, index) => (
                <motion.div
                  key={talent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl font-bold text-white">
                              {talent.matchScore}
                            </span>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-xl font-bold text-[#0f172a]">{talent.name}</h4>
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                {talent.matchScore}% Match
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                talent.availability === 'immediate' ? 'bg-green-100 text-green-700' :
                                talent.availability === 'within-30-days' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {talent.availability.replace('-', ' ')}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 mb-3 text-sm text-slate-600">
                              <div className="flex items-center gap-1">
                                <Globe className="w-4 h-4" />
                                <span>{talent.country}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                <span>{talent.position}</span>
                              </div>
                            </div>

                            <div className="mb-3">
                              <div className="text-sm text-slate-600 mb-1">Experience & Qualification:</div>
                              <div className="text-sm font-medium text-[#0f172a]">
                                {talent.qualification} • {talent.experience}
                              </div>
                            </div>

                            <div className="mb-3">
                              <div className="text-sm text-slate-600 mb-1">Key Skills:</div>
                              <div className="flex flex-wrap gap-2">
                                {talent.skillset.map((skill, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-slate-600">Languages</div>
                                <div className="text-sm font-medium text-[#0f172a]">
                                  {talent.language.join(', ')}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-slate-600">Est. Salary</div>
                                <div className="text-sm font-medium text-[#0f172a]">
                                  {talent.estimatedSalary}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Contact
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {talentRecommendations.length === 0 && (
                <Card className="p-8 text-center">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-slate-700 mb-2">No Talent Recommendations</h4>
                  <p className="text-sm text-slate-600">
                    Get work permits approved to unlock talent recommendations
                  </p>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </InstrumentSection>
  );
}