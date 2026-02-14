import { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  Factory,
  Cpu,
  ShoppingBag,
  Building2,
  Leaf,
  Zap,
  Star,
  Gift,
  Target,
  DollarSign,
  Users,
  Award,
  ArrowUpRight
} from 'lucide-react';

interface Sector {
  id: string;
  name: string;
  description: string;
  ease: number; // 1-100
  growth: number; // 1-100
  incentives: string[];
  fdiTarget: string;
  jobs: string;
  priority: 'high' | 'medium' | 'emerging';
  icon: string;
  color: string;
  details: string;
}

export function SectorOpportunityHeatmap() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const sectors: Sector[] = [
    {
      id: 'textiles',
      name: 'Textile & Garments',
      description: 'Ready-made garments, knitwear, and fabric manufacturing',
      ease: 92,
      growth: 85,
      incentives: ['Tax holiday 10 years', 'Export subsidies', 'Duty-free imports'],
      fdiTarget: '$510M', // ✅ Realistic: 30% of $1.7B total FDI
      jobs: '150,000+',
      priority: 'high',
      icon: '👕',
      color: 'from-red-50 to-red-100',
      details: 'The textile and garments sector is a cornerstone of Bangladesh\'s economy, offering significant growth potential and numerous government incentives to attract foreign direct investment (FDI).'
    },
    {
      id: 'pharma',
      name: 'Pharmaceuticals',
      description: 'Generic drugs, APIs, and healthcare products',
      ease: 88,
      growth: 88,
      incentives: ['R&D tax breaks', '10-year holiday', 'Fast approvals'],
      fdiTarget: '$306M', // ✅ Realistic: 18% of total FDI
      jobs: '85,000+',
      priority: 'high',
      icon: '💊',
      color: 'from-blue-50 to-blue-100',
      details: 'The pharmaceuticals sector in Bangladesh is rapidly growing, driven by a strong demand for generic drugs and healthcare products. The government offers various incentives to encourage FDI in this sector.'
    },
    {
      id: 'ict',
      name: 'ICT & Software',
      description: 'Software development, BPO, and IT services',
      ease: 95,
      growth: 92,
      incentives: ['Hi-Tech Park benefits', 'No VAT on exports', 'Skilled workforce'],
      fdiTarget: '$204M', // ✅ Realistic: 12% of total FDI
      jobs: '120,000+',
      priority: 'high',
      icon: '💻',
      color: 'from-green-50 to-green-100',
      details: 'The ICT and software sector is a key driver of economic growth in Bangladesh, with a focus on software development, business process outsourcing (BPO), and IT services. The government provides numerous incentives to attract FDI in this sector.'
    },
    {
      id: 'agro',
      name: 'Agro Processing',
      description: 'Food processing, cold storage, and agricultural tech',
      ease: 78,
      growth: 78,
      incentives: ['Agro subsidies', 'Export incentives', 'SEZ access'],
      fdiTarget: '$85M', // ✅ Realistic: 5% of total FDI
      jobs: '65,000+',
      priority: 'medium',
      icon: '🌾',
      color: 'from-yellow-50 to-yellow-100',
      details: 'The agro processing sector in Bangladesh is focused on food processing, cold storage, and agricultural technology. The government offers various incentives to encourage FDI in this sector.'
    },
    {
      id: 'logistics',
      name: 'Logistics & Transport',
      description: 'Warehousing, shipping, and supply chain management',
      ease: 82,
      growth: 82,
      incentives: ['Fast-track approvals', 'Land lease benefits', 'Port access'],
      fdiTarget: '$136M', // ✅ Realistic: 8% of total FDI
      jobs: '45,000+',
      priority: 'medium',
      icon: '🚢',
      color: 'from-orange-50 to-orange-100',
      details: 'The logistics and transport sector in Bangladesh is crucial for the country\'s economic growth, with a focus on warehousing, shipping, and supply chain management. The government provides various incentives to attract FDI in this sector.'
    },
    {
      id: 'energy',
      name: 'Energy & Renewables',
      description: 'Solar, wind, and clean energy infrastructure',
      ease: 85,
      growth: 85,
      incentives: ['15-year tax holiday', 'Accelerated depreciation', 'Feed-in tariffs'],
      fdiTarget: '$170M', // ✅ Realistic: 10% of total FDI (Infrastructure & Energy)
      jobs: '38,000+',
      priority: 'emerging',
      icon: '⚡',
      color: 'from-pink-50 to-pink-100',
      details: 'The energy and renewables sector in Bangladesh is emerging as a key area for investment, with a focus on solar, wind, and clean energy infrastructure. The government offers various incentives to encourage FDI in this sector.'
    },
    {
      id: 'manufacturing',
      name: 'Light Manufacturing',
      description: 'Electronics assembly, automotive parts, consumer goods',
      ease: 72,
      growth: 72,
      incentives: ['Local assembly benefits', 'Import duty exemptions', 'Training grants'],
      fdiTarget: '$170M', // ✅ Realistic: 10% of total FDI
      jobs: '52,000+',
      priority: 'emerging',
      icon: '🏭',
      color: 'from-gray-50 to-gray-100',
      details: 'The light manufacturing sector in Bangladesh is emerging as a key area for investment, with a focus on electronics assembly, automotive parts, and consumer goods. The government offers various incentives to encourage FDI in this sector.'
    },
    {
      id: 'fintech',
      name: 'Fintech & Banking',
      description: 'Digital payments, mobile banking, financial services',
      ease: 90,
      growth: 90,
      incentives: ['Innovation program', 'Regulatory support', 'No equity restrictions'],
      fdiTarget: '$119M', // ✅ Realistic: 7% of total FDI (Financial Services)
      jobs: '28,000+',
      priority: 'emerging',
      icon: '🏦',
      color: 'from-indigo-50 to-indigo-100',
      details: 'The fintech and banking sector in Bangladesh is emerging as a key area for investment, with a focus on digital payments, mobile banking, and financial services. The government offers various incentives to encourage FDI in this sector.'
    }
  ];

  const selected = sectors.find(s => s.id === selectedSector);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-blue-600 bg-blue-100';
      case 'emerging': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Strategic';
      case 'emerging': return 'Emerging';
      default: return priority;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-4"
        >
          <span className="text-purple-700 font-semibold flex items-center gap-2">
            <Target className="w-4 h-4" />
            Where Bangladesh Is Encouraging FDI
          </span>
        </motion.div>
        <h2 className="text-3xl font-bold mb-3">Sector Opportunity Heatmap</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Visual guide showing which sectors have the highest growth potential, government incentives, and FDI targets
        </p>
      </div>

      {/* Heatmap Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sectors.map((sector, index) => (
          <motion.div
            key={sector.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedSector(sector.id === selectedSector ? null : sector.id)}
            className={`glass-card p-6 cursor-pointer transition-all hover:shadow-xl ${
              selectedSector === sector.id ? 'ring-2 ring-purple-500 shadow-xl' : ''
            }`}
          >
            {/* Priority Badge */}
            <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-3 ${getPriorityColor(sector.priority)}`}>
              {getPriorityLabel(sector.priority)}
            </div>

            {/* Icon */}
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${sector.color} flex items-center justify-center mb-4`}>
              <span className="text-3xl">{sector.icon}</span>
            </div>

            {/* Name */}
            <h3 className="font-bold text-lg mb-2">{sector.name}</h3>

            {/* Growth Bar */}
            <div className="space-y-1 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Growth Score</span>
                <span className="font-semibold text-purple-600">{sector.growth}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${sector.growth}%` }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.6 }}
                  className={`h-full bg-gradient-to-r ${sector.color}`}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span>Target: {sector.fdiTarget}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{sector.jobs} jobs</span>
              </div>
            </div>

            {/* View Details Arrow */}
            {selectedSector === sector.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex items-center gap-2 text-purple-600 font-semibold text-sm"
              >
                <ArrowUpRight className="w-4 h-4" />
                Details below
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Selected Sector Details */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Overview */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selected.color} flex items-center justify-center`}>
                  <span className="text-4xl">{selected.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selected.name}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${getPriorityColor(selected.priority)}`}>
                    {getPriorityLabel(selected.priority)}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{selected.details}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{selected.growth}%</div>
                  <div className="text-xs text-gray-600">Growth</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-blue-600">{selected.fdiTarget}</div>
                  <div className="text-xs text-gray-600">FDI Target</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                  <Users className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-emerald-600">{selected.jobs}</div>
                  <div className="text-xs text-gray-600">Jobs</div>
                </div>
              </div>
            </div>

            {/* Right: Incentives */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-purple-600" />
                <h4 className="font-bold text-lg">Available Incentives</h4>
              </div>

              <div className="space-y-3 mb-6">
                {selected.incentives.map((incentive, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg"
                  >
                    <Award className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{incentive}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2">
                Apply for {selected.name}
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-600">High Priority Sectors</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-gray-600">Strategic Sectors</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-gray-600">Emerging Opportunities</span>
        </div>
      </div>
    </div>
  );
}