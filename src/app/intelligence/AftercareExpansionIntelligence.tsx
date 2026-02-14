import { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  Users,
  GraduationCap,
  Building2,
  DollarSign,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Target,
  BarChart3,
  MapPin
} from 'lucide-react';

interface ExpansionEligibility {
  eligible: boolean;
  reasons: string[];
  incentives: { name: string; value: string }[];
  nextSteps: string[];
  score: number;
}

interface UniversityPartner {
  name: string;
  location: string;
  specialization: string;
  graduates: number;
  placementRate: number;
  collaborationTypes: string[];
}

interface IssueTracking {
  id: string;
  type: 'operational' | 'regulatory' | 'infrastructure' | 'workforce';
  title: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  slaStatus: 'on-time' | 'at-risk' | 'breached';
  createdDate: string;
  responseTime: string;
  assignedTo: string;
}

const universityPartners: UniversityPartner[] = [
  {
    name: 'BUET (Bangladesh University of Engineering & Technology)',
    location: 'Dhaka',
    specialization: 'Engineering, IT, Manufacturing',
    graduates: 1500,
    placementRate: 94,
    collaborationTypes: ['Internships', 'Research', 'Training', 'Recruitment']
  },
  {
    name: 'Dhaka University',
    location: 'Dhaka',
    specialization: 'Business, Sciences, Humanities',
    graduates: 3200,
    placementRate: 87,
    collaborationTypes: ['Internships', 'Case Studies', 'Recruitment']
  },
  {
    name: 'BRAC University',
    location: 'Dhaka',
    specialization: 'Business, IT, Architecture',
    graduates: 2100,
    placementRate: 91,
    collaborationTypes: ['Internships', 'Joint Programs', 'Recruitment']
  },
  {
    name: 'NSU (North South University)',
    location: 'Dhaka',
    specialization: 'IT, Business, Pharma',
    graduates: 1800,
    placementRate: 89,
    collaborationTypes: ['Internships', 'Research', 'Recruitment']
  },
  {
    name: 'Chittagong University of Engineering & Technology',
    location: 'Chittagong',
    specialization: 'Engineering, Manufacturing',
    graduates: 1200,
    placementRate: 92,
    collaborationTypes: ['Internships', 'Training', 'Recruitment']
  }
];

const issuesTracker: IssueTracking[] = [
  {
    id: 'ISS-2024-047',
    type: 'infrastructure',
    title: 'Power Supply Fluctuation in Zone',
    description: 'Voltage fluctuations affecting production equipment',
    status: 'investigating',
    priority: 'high',
    slaStatus: 'on-time',
    createdDate: '2024-11-10',
    responseTime: '2 hours',
    assignedTo: 'BEZA Operations Team'
  },
  {
    id: 'ISS-2024-042',
    type: 'regulatory',
    title: 'Customs Clearance Delay',
    description: 'Imported machinery stuck at port for 5 days',
    status: 'open',
    priority: 'high',
    slaStatus: 'at-risk',
    createdDate: '2024-11-08',
    responseTime: '4 hours',
    assignedTo: 'NBR Liaison Office'
  },
  {
    id: 'ISS-2024-038',
    type: 'workforce',
    title: 'Skilled Worker Shortage',
    description: 'Difficulty finding certified CNC operators',
    status: 'investigating',
    priority: 'medium',
    slaStatus: 'on-time',
    createdDate: '2024-11-05',
    responseTime: '24 hours',
    assignedTo: 'Workforce Development Unit'
  }
];

export function AftercareExpansionIntelligence() {
  const [selectedTab, setSelectedTab] = useState<'expansion' | 'talent' | 'issues'>('expansion');
  const [yearsOperating, setYearsOperating] = useState(3);
  const [currentInvestment, setCurrentInvestment] = useState(5000000);
  const [currentWorkforce, setCurrentWorkforce] = useState(250);
  const [showEligibility, setShowEligibility] = useState(false);

  const checkExpansionEligibility = (): ExpansionEligibility => {
    const score =
      (yearsOperating >= 2 ? 30 : 0) +
      (currentInvestment >= 1000000 ? 30 : 0) +
      (currentWorkforce >= 100 ? 20 : 0) +
      20; // Base score

    const eligible = score >= 70;
    const reasons = [];
    const incentives = [];

    if (yearsOperating >= 2) {
      reasons.push('✅ Operating for 2+ years (eligible for expansion incentives)');
      incentives.push({ name: 'Expansion Tax Credit', value: '10% of new investment' });
    } else {
      reasons.push('❌ Need 2+ years of operation for expansion incentives');
    }

    if (currentInvestment >= 5000000) {
      reasons.push('✅ Significant initial investment (eligible for additional financing)');
      incentives.push({ name: 'Preferred Financing Rate', value: '6.5% APR' });
    }

    if (currentWorkforce >= 200) {
      reasons.push('✅ Large workforce (priority for expansion zone allocation)');
      incentives.push({ name: 'Priority Land Allocation', value: 'Fast-track approval' });
    }

    if (yearsOperating >= 2) {
      incentives.push({ name: 'New Equipment Import Duty Waiver', value: '100% for 3 years' });
      incentives.push({ name: 'Additional Hiring Tax Credit', value: 'BDT 50,000/employee' });
    }

    return {
      eligible,
      reasons,
      incentives,
      nextSteps: [
        'Submit expansion proposal through BIDA portal',
        'Schedule consultation with investment officer',
        'Conduct feasibility study for expansion site',
        'Apply for additional zone allocation'
      ],
      score
    };
  };

  const eligibility = showEligibility ? checkExpansionEligibility() : null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSLAColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'text-green-600';
      case 'at-risk': return 'text-orange-600';
      case 'breached': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Expansion & Aftercare Intelligence</h3>
        <p className="text-sm text-gray-600 mt-1">
          Growth opportunities, talent connections, and issue resolution
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
          <p className="text-3xl font-bold text-gray-900">{yearsOperating}</p>
          <p className="text-sm text-gray-700">Years Operating</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <Building2 className="w-6 h-6 text-blue-600 mb-2" />
          <p className="text-3xl font-bold text-gray-900">
            ${(currentInvestment / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm text-gray-700">Current Investment</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
          <Users className="w-6 h-6 text-purple-600 mb-2" />
          <p className="text-3xl font-bold text-gray-900">{currentWorkforce}</p>
          <p className="text-sm text-gray-700">Workforce Size</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
          <AlertCircle className="w-6 h-6 text-orange-600 mb-2" />
          <p className="text-3xl font-bold text-gray-900">{issuesTracker.filter(i => i.status !== 'resolved').length}</p>
          <p className="text-sm text-gray-700">Active Issues</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setSelectedTab('expansion')}
          className={`px-4 py-2 font-medium text-sm transition-all ${
            selectedTab === 'expansion'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Expansion Eligibility
          </div>
        </button>
        <button
          onClick={() => setSelectedTab('talent')}
          className={`px-4 py-2 font-medium text-sm transition-all ${
            selectedTab === 'talent'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            University Talent Pipeline
          </div>
        </button>
        <button
          onClick={() => setSelectedTab('issues')}
          className={`px-4 py-2 font-medium text-sm transition-all ${
            selectedTab === 'issues'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Issue Escalation & SLA
          </div>
        </button>
      </div>

      {/* Tab Content */}
      {selectedTab === 'expansion' && (
        <div className="space-y-6">
          {/* Expansion Calculator */}
          <div className="p-6 bg-white rounded-xl border border-gray-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Expansion Eligibility Checker</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years Operating in Bangladesh
                </label>
                <input
                  type="number"
                  value={yearsOperating}
                  onChange={(e) => setYearsOperating(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Investment (USD)
                </label>
                <input
                  type="number"
                  value={currentInvestment}
                  onChange={(e) => setCurrentInvestment(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Workforce Size
                </label>
                <input
                  type="number"
                  value={currentWorkforce}
                  onChange={(e) => setCurrentWorkforce(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  min="0"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowEligibility(true)}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700"
            >
              Check Eligibility & Incentives
            </motion.button>
          </div>

          {/* Eligibility Results */}
          {eligibility && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Status Banner */}
              <div className={`p-6 rounded-xl border-2 ${
                eligibility.eligible
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500'
                  : 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-500'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  {eligibility.eligible ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-orange-600" />
                  )}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {eligibility.eligible ? 'Eligible for Expansion' : 'Partially Eligible'}
                    </h4>
                    <p className="text-sm text-gray-700">
                      Eligibility Score: {eligibility.score}/100
                    </p>
                  </div>
                </div>
                <div className="w-full bg-white rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      eligibility.score >= 70 ? 'bg-green-600' : 'bg-orange-600'
                    }`}
                    style={{ width: `${eligibility.score}%` }}
                  ></div>
                </div>
              </div>

              {/* Eligibility Reasons */}
              <div className="p-6 bg-white rounded-xl border border-gray-200">
                <h5 className="font-semibold text-gray-900 mb-3">Eligibility Assessment</h5>
                <div className="space-y-2">
                  {eligibility.reasons.map((reason, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Incentives */}
              {eligibility.incentives.length > 0 && (
                <div className="p-6 bg-white rounded-xl border border-gray-200">
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    Available Expansion Incentives
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {eligibility.incentives.map((incentive, index) => (
                      <div key={index} className="p-4 bg-blue-50 rounded-lg">
                        <p className="font-semibold text-gray-900 mb-1">{incentive.name}</p>
                        <p className="text-sm text-blue-600 font-medium">{incentive.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Steps */}
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-600" />
                  Recommended Next Steps
                </h5>
                <div className="space-y-2">
                  {eligibility.nextSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-sm text-gray-700 pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {selectedTab === 'talent' && (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200">
            <p className="text-sm text-purple-900">
              <strong>University Talent Connector:</strong> Connect with Bangladesh's top universities
              for internships, recruitment, and research collaboration.
            </p>
          </div>

          {universityPartners.map((university, index) => (
            <motion.div
              key={university.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{university.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    {university.location} • {university.specialization}
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-sm">
                  Connect Now
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Annual Graduates</p>
                  <p className="text-lg font-bold text-gray-900">{university.graduates}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Placement Rate</p>
                  <p className="text-lg font-bold text-green-600">{university.placementRate}%</p>
                </div>
                <div className="col-span-2 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-2">Collaboration Types</p>
                  <div className="flex flex-wrap gap-1">
                    {university.collaborationTypes.map((type) => (
                      <span key={type} className="px-2 py-0.5 bg-white text-blue-700 rounded text-xs font-medium">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedTab === 'issues' && (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Issue Escalation & SLA Tracking:</strong> Real-time monitoring of your
              operational issues with guaranteed response times.
            </p>
          </div>

          {issuesTracker.map((issue, index) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-xl border border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-sm text-gray-600">{issue.id}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                      {issue.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      issue.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      issue.status === 'investigating' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {issue.status.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{issue.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{issue.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Created: {issue.createdDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {issue.assignedTo}
                    </div>
                    <div className={`flex items-center gap-1 font-medium ${getSLAColor(issue.slaStatus)}`}>
                      <Target className="w-3 h-3" />
                      SLA: {issue.slaStatus.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                  View Details
                </button>
                <button className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200">
                  Add Update
                </button>
              </div>
            </motion.div>
          ))}

          <div className="p-6 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-3">Need to escalate a new issue?</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                Report New Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
