import { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Zap, Droplet, Wind, Sun, TrendingUp, Award, DollarSign } from 'lucide-react';

export function GreenInvestment() {
  const [projectType, setProjectType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [showResults, setShowResults] = useState(false);

  const calculate = () => {
    setShowResults(true);
  };

  const greenIncentives = [
    { title: '15-Year Tax Holiday', desc: 'For renewable energy projects', icon: DollarSign, color: 'green' },
    { title: 'Fast-Track Approval', desc: '30-day clearance guarantee', icon: Zap, color: 'yellow' },
    { title: 'Carbon Credit Eligible', desc: 'International carbon trading', icon: TrendingUp, color: 'blue' },
    { title: 'Duty-Free Import', desc: 'Green tech equipment exemption', icon: Award, color: 'purple' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Green Investment Hub</h3>
        <p className="text-sm text-gray-600 mt-1">Sustainable & renewable energy investment pathway</p>
      </div>

      {/* ESG Score Banner */}
      <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-6 h-6" />
              <h4 className="text-2xl font-bold">Bangladesh ESG Rating: A-</h4>
            </div>
            <p className="text-green-100">Top 3 in South Asia for renewable energy growth</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-100 mb-1">Green Projects</p>
            <p className="text-3xl font-bold">287</p>
          </div>
        </div>
      </div>

      {/* Green Sectors */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: 'Solar Power', icon: Sun, projects: 142, capacity: '450 MW' },
          { name: 'Wind Energy', icon: Wind, projects: 38, capacity: '120 MW' },
          { name: 'Hydroelectric', icon: Droplet, projects: 67, capacity: '230 MW' },
          { name: 'Biogas', icon: Leaf, projects: 40, capacity: '85 MW' }
        ].map((sector) => {
          const Icon = sector.icon;
          return (
            <div key={sector.name} className="p-4 bg-white rounded-xl border border-gray-200">
              <Icon className="w-8 h-8 text-green-600 mb-2" />
              <h5 className="font-semibold text-gray-900 mb-1">{sector.name}</h5>
              <p className="text-xs text-gray-600">{sector.projects} projects</p>
              <p className="text-xs text-gray-600">{sector.capacity} capacity</p>
            </div>
          );
        })}
      </div>

      {/* Incentive Calculator */}
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4">ESG Incentive Calculator</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select type</option>
              <option value="solar">Solar Power Plant</option>
              <option value="wind">Wind Farm</option>
              <option value="hydro">Hydroelectric</option>
              <option value="biogas">Biogas Plant</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Capacity (MW)</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="10"
            />
          </div>
        </div>
        <button
          onClick={calculate}
          className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg"
        >
          Calculate Incentives
        </button>

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-green-50 rounded-lg"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Tax Savings (15 years)</p>
                <p className="text-2xl font-bold text-green-600">${parseInt(capacity || '0') * 500000}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Carbon Credits/Year</p>
                <p className="text-2xl font-bold text-green-600">${parseInt(capacity || '0') * 12000}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Green Incentives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {greenIncentives.map((incentive, index) => {
          const Icon = incentive.icon;
          return (
            <motion.div
              key={incentive.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-xl border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-${incentive.color}-50`}>
                  <Icon className={`w-6 h-6 text-${incentive.color}-600`} />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-1">{incentive.title}</h5>
                  <p className="text-sm text-gray-600">{incentive.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Renewable Zones */}
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Priority Green Zones</h4>
        <div className="space-y-3">
          {[
            { zone: 'Cox\'s Bazar Renewable Zone', focus: 'Solar & Wind', available: '500 acres' },
            { zone: 'Sylhet Green Energy Hub', focus: 'Hydro & Biogas', available: '320 acres' },
            { zone: 'Chittagong Offshore Wind', focus: 'Wind Energy', available: 'Sea area' }
          ].map((zone) => (
            <div key={zone.zone} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{zone.zone}</p>
                <p className="text-sm text-gray-600">{zone.focus}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Available</p>
                <p className="text-sm font-bold text-green-600">{zone.available}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
