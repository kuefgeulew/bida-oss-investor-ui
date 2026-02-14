import { useState } from 'react';
import { motion } from 'motion/react';
import { Rocket, Zap, Users, DollarSign, TrendingUp, CheckCircle, Building2, Award } from 'lucide-react';

export function StartupSMETrack() {
  const [businessType, setBusinessType] = useState<'startup' | 'sme'>('startup');

  const startupBenefits = [
    { icon: Zap, title: 'Fast-Track Registration', desc: '5-day incorporation for tech startups' },
    { icon: DollarSign, title: 'Tax Holiday', desc: '5 years tax exemption for IT startups' },
    { icon: Users, title: 'VC Connections', desc: 'Access to 15+ verified investors' },
    { icon: Building2, title: 'Co-working Spaces', desc: 'Subsidized space in innovation hubs' }
  ];

  const smeBenefits = [
    { icon: CheckCircle, title: 'Simplified Compliance', desc: 'Reduced reporting requirements' },
    { icon: DollarSign, title: 'SME Loan Access', desc: 'Priority access to SME financing' },
    { icon: TrendingUp, title: 'Export Support', desc: 'EPB one-stop service' },
    { icon: Award, title: 'BSCIC Support', desc: 'Industrial plot allocation' }
  ];

  const benefits = businessType === 'startup' ? startupBenefits : smeBenefits;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Startup & SME Fast Track</h3>
        <p className="text-sm text-gray-600 mt-1">Accelerated pathway for entrepreneurs and small businesses</p>
      </div>

      {/* Toggle */}
      <div className="flex gap-4">
        <button
          onClick={() => setBusinessType('startup')}
          className={`flex-1 p-4 rounded-xl border-2 transition-all ${
            businessType === 'startup'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <Rocket className={`w-6 h-6 ${businessType === 'startup' ? 'text-blue-600' : 'text-gray-400'}`} />
            <h4 className="text-lg font-bold text-gray-900">Startup</h4>
          </div>
          <p className="text-sm text-gray-600">Tech & innovation-driven businesses</p>
        </button>

        <button
          onClick={() => setBusinessType('sme')}
          className={`flex-1 p-4 rounded-xl border-2 transition-all ${
            businessType === 'sme'
              ? 'border-green-600 bg-green-50'
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <Building2 className={`w-6 h-6 ${businessType === 'sme' ? 'text-green-600' : 'text-gray-400'}`} />
            <h4 className="text-lg font-bold text-gray-900">SME</h4>
          </div>
          <p className="text-sm text-gray-600">Small & medium enterprises</p>
        </button>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-xl border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${businessType === 'startup' ? 'bg-blue-50' : 'bg-green-50'}`}>
                  <Icon className={`w-6 h-6 ${businessType === 'startup' ? 'text-blue-600' : 'text-green-600'}`} />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-1">{benefit.title}</h5>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Start Wizard */}
      <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Start Registration</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Your Company Ltd." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option>Software/IT</option>
              <option>E-commerce</option>
              <option>Fintech</option>
              <option>Manufacturing</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
            <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="5" />
          </div>
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg">
          Start Registration
        </button>
      </div>

      {/* VC/Incubator Connections */}
      {businessType === 'startup' && (
        <div className="p-6 bg-white rounded-xl border border-gray-200">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Connected Investors & Incubators</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Bangladesh Angels', 'Startup Bangladesh', 'ICT Division Incubator'].map((name) => (
              <div key={name} className="p-4 border border-gray-200 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">{name}</p>
                <button className="text-sm text-blue-600 hover:underline">Connect →</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
