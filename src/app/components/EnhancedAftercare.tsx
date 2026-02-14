import { motion } from 'motion/react';
import { TrendingUp, Award, Factory, ArrowRight, Zap, DollarSign, Users } from 'lucide-react';
import { toast } from 'sonner';

/**
 * TAB 13 - AFTERCARE: Relationship Dashboard
 */

export function ExpansionReadinessScore() {
  const metrics = [
    { name: 'Financial Capacity', score: 85, color: 'green' },
    { name: 'Compliance Record', score: 92, color: 'blue' },
    { name: 'Market Performance', score: 78, color: 'purple' },
    { name: 'Infrastructure Readiness', score: 88, color: 'orange' }
  ];

  const overallScore = Math.round(metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length);

  const getScoreLabel = (score: number) => {
    if (score >= 85) return { label: 'Excellent', desc: 'Ready for major expansion' };
    if (score >= 70) return { label: 'Good', desc: 'Consider expansion planning' };
    if (score >= 60) return { label: 'Fair', desc: 'Strengthen fundamentals first' };
    return { label: 'Needs Work', desc: 'Focus on current operations' };
  };

  const status = getScoreLabel(overallScore);

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-bold">Expansion Readiness Score</h3>
      </div>
      
      <div className="flex items-center gap-8 mb-6">
        {/* Circular Score */}
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="url(#expansionGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 56}
              strokeDashoffset={2 * Math.PI * 56 * (1 - overallScore / 100)}
              initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - overallScore / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="expansionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-green-600">{overallScore}</span>
            <span className="text-xs text-gray-600">/ 100</span>
          </div>
        </div>
        
        {/* Status */}
        <div className="flex-1">
          <h4 className="text-2xl font-bold text-gray-900 mb-1">{status.label}</h4>
          <p className="text-gray-600 mb-4">{status.desc}</p>
          
          <div className="space-y-2">
            {metrics.map((metric, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{metric.name}</span>
                  <span className="text-sm font-bold">{metric.score}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.score}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className={`h-full bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {overallScore >= 80 && (
        <div className="p-4 bg-green-100 rounded-lg border border-green-300">
          <p className="text-sm text-green-900 font-semibold">
            🎉 Congratulations! Your company is ready for expansion. Consider our growth programs below.
          </p>
        </div>
      )}
    </div>
  );
}

export function NewIncentivesQualified() {
  const newIncentives = [
    {
      name: 'Export Excellence Award',
      type: 'Cash Grant',
      amount: 'BDT 5,000,000',
      qualified: 'Based on $20M+ exports in 2025',
      deadline: 'Apply by March 31, 2026',
      status: 'newly_qualified'
    },
    {
      name: 'Green Factory Certification Bonus',
      type: 'Tax Credit',
      amount: '3-year additional tax relief',
      qualified: 'LEED Gold certification achieved',
      deadline: 'Auto-applied',
      status: 'newly_qualified'
    },
    {
      name: 'Employment Generation Incentive',
      type: 'Subsidy',
      amount: 'BDT 2,000 per employee/month',
      qualified: 'Created 500+ jobs in 2025',
      deadline: 'Claim quarterly',
      status: 'eligible'
    }
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-6 h-6 text-yellow-600" />
        <h3 className="text-xl font-bold">New Incentives You Now Qualify For</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Based on your company's performance, you're eligible for these additional benefits
      </p>
      
      <div className="space-y-3">
        {newIncentives.map((incentive, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-lg border-2 ${
              incentive.status === 'newly_qualified'
                ? 'bg-yellow-50 border-yellow-400'
                : 'bg-blue-50 border-blue-300'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900">{incentive.name}</h4>
                  {incentive.status === 'newly_qualified' && (
                    <span className="px-2 py-0.5 bg-yellow-600 text-white text-xs rounded-full font-semibold">
                      NEW!
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600">{incentive.type}</p>
              </div>
              <DollarSign className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            </div>
            
            <div className="space-y-1 text-sm mb-3">
              <p><strong>Value:</strong> {incentive.amount}</p>
              <p><strong>Qualified because:</strong> {incentive.qualified}</p>
              <p><strong>Deadline:</strong> {incentive.deadline}</p>
            </div>
            
            <button
              onClick={() => toast.success(`Applying for ${incentive.name}...`)}
              className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Claim This Incentive
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function OpenSecondFactoryButton() {
  return (
    <div className="glass-card p-8 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 border-4 border-purple-400">
      <div className="text-center">
        <div className="text-7xl mb-4">🏭</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Ready to Scale Up?
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Your first factory is thriving. Open a second facility and multiply your success. 
          BIDA offers special fast-track programs for existing successful investors.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded-lg border-2 border-purple-300">
            <Factory className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-bold text-gray-900 mb-1">Fast-Track Approval</h4>
            <p className="text-sm text-gray-600">
              Existing investors get 50% faster processing
            </p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border-2 border-blue-300">
            <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-bold text-gray-900 mb-1">Additional Incentives</h4>
            <p className="text-sm text-gray-600">
              Expansion bonus: Extra 2-year tax holiday
            </p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border-2 border-green-300">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-bold text-gray-900 mb-1">Dedicated Support</h4>
            <p className="text-sm text-gray-600">
              VIP account manager for expansion projects
            </p>
          </div>
        </div>
        
        <button
          onClick={() => toast.success('Opening Second Factory wizard...')}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white text-xl rounded-2xl font-bold hover:shadow-2xl transition-all flex items-center justify-center gap-3 mx-auto"
        >
          <Factory className="w-6 h-6" />
          Open Second Factory
          <ArrowRight className="w-6 h-6" />
        </button>
        
        <p className="text-xs text-gray-500 mt-4">
          Or explore: Vertical expansion • New product lines • Export diversification
        </p>
      </div>
    </div>
  );
}

export function InvestorMilestones() {
  const milestones = [
    { title: 'First Export Shipment', date: 'March 2024', achieved: true },
    { title: '500+ Employees Hired', date: 'June 2024', achieved: true },
    { title: '$10M Revenue Milestone', date: 'September 2025', achieved: true },
    { title: 'LEED Certification', date: 'January 2026', achieved: true },
    { title: 'Second Factory Launch', date: 'Target: Q3 2026', achieved: false }
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold">Your Investment Milestones</h3>
      </div>
      
      <div className="space-y-3">
        {milestones.map((milestone, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg border-2 flex items-center gap-3 ${
              milestone.achieved
                ? 'bg-green-50 border-green-300'
                : 'bg-gray-50 border-gray-300'
            }`}
          >
            {milestone.achieved ? (
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg">✓</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg">○</span>
              </div>
            )}
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{milestone.title}</p>
              <p className="text-xs text-gray-600">{milestone.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
