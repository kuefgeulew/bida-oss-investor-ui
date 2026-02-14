import { motion } from 'motion/react';
import { useState } from 'react';
import { 
  Flag, ToggleLeft, ToggleRight, Zap, Users, 
  Beaker, TrendingUp, AlertCircle, CheckCircle2, 
  Eye, EyeOff, Settings, BarChart3
} from 'lucide-react';

/**
 * 🚩 FEATURE FLAGS CONTROL PANEL
 * Manage feature rollouts, A/B testing, and experimental features
 * Makes the "configuration system" into a visible, interactive feature
 */

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  status: 'stable' | 'beta' | 'experimental' | 'deprecated';
  rollout: number; // Percentage of users seeing this feature
  impact: 'low' | 'medium' | 'high';
  category: 'core' | 'enhancement' | 'experimental' | 'integration';
  usersAffected: number;
}

const initialFlags: FeatureFlag[] = [
  {
    id: 'next-best-action',
    name: 'Next Best Action Panel',
    description: 'Proactive guidance system telling investors exactly what to do next',
    enabled: true,
    status: 'stable',
    rollout: 100,
    impact: 'high',
    category: 'core',
    usersAffected: 2847
  },
  {
    id: 'enhanced-journey',
    name: 'Enhanced Journey Tracker',
    description: 'Advanced journey visualization with legal basis and delay causes',
    enabled: true,
    status: 'stable',
    rollout: 100,
    impact: 'high',
    category: 'core',
    usersAffected: 2847
  },
  {
    id: 'ai-chatbot',
    name: 'AI Investment Assistant',
    description: 'GPT-4 powered chatbot for investment queries and guidance',
    enabled: true,
    status: 'beta',
    rollout: 75,
    impact: 'medium',
    category: 'enhancement',
    usersAffected: 2135
  },
  {
    id: 'blockchain-verify',
    name: 'Blockchain Document Verification',
    description: 'Verify document authenticity using blockchain immutable ledger',
    enabled: false,
    status: 'experimental',
    rollout: 10,
    impact: 'low',
    category: 'experimental',
    usersAffected: 285
  },
  {
    id: 'predictive-delays',
    name: 'Predictive Delay Analytics',
    description: 'ML model predicting approval delays before they occur',
    enabled: true,
    status: 'beta',
    rollout: 50,
    impact: 'medium',
    category: 'enhancement',
    usersAffected: 1424
  },
  {
    id: 'gamification',
    name: 'Investor Arena & Gamification',
    description: 'Leaderboards, achievements, and XP system',
    enabled: true,
    status: 'stable',
    rollout: 100,
    impact: 'medium',
    category: 'enhancement',
    usersAffected: 2847
  },
  {
    id: 'voice-assistant',
    name: 'Voice Command Interface',
    description: 'Control OSS with voice commands (experimental)',
    enabled: false,
    status: 'experimental',
    rollout: 5,
    impact: 'low',
    category: 'experimental',
    usersAffected: 142
  },
  {
    id: 'legacy-upload',
    name: 'Legacy File Upload (Old UI)',
    description: 'Previous version of document upload interface',
    enabled: false,
    status: 'deprecated',
    rollout: 0,
    impact: 'low',
    category: 'core',
    usersAffected: 0
  }
];

export function FeatureFlagsControlPanel() {
  const [flags, setFlags] = useState(initialFlags);
  const [filter, setFilter] = useState<'all' | 'stable' | 'beta' | 'experimental' | 'deprecated'>('all');

  const toggleFlag = (id: string) => {
    setFlags(prev => prev.map(flag => 
      flag.id === id ? { ...flag, enabled: !flag.enabled } : flag
    ));
  };

  const filteredFlags = flags.filter(flag => filter === 'all' || flag.status === filter);

  const stats = {
    total: flags.length,
    enabled: flags.filter(f => f.enabled).length,
    stable: flags.filter(f => f.status === 'stable').length,
    beta: flags.filter(f => f.status === 'beta').length,
    experimental: flags.filter(f => f.status === 'experimental').length,
    totalUsers: Math.max(...flags.map(f => f.usersAffected))
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800 border-green-300';
      case 'beta': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'experimental': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'deprecated': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Flag className="w-10 h-10" />
              Feature Flags Control Panel
            </h1>
            <p className="text-orange-100 text-lg">Manage feature rollouts, A/B testing, and experimental features across OSS</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold mb-1">{stats.enabled}/{stats.total}</div>
            <div className="text-orange-200 text-sm">Features Enabled</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-4">
        <div className="glass-card p-6 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.stable}</div>
          </div>
          <div className="text-sm text-gray-600">Stable Features</div>
        </div>

        <div className="glass-card p-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Beaker className="w-6 h-6 text-blue-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.beta}</div>
          </div>
          <div className="text-sm text-gray-600">Beta Features</div>
        </div>

        <div className="glass-card p-6 border-2 border-orange-200">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-orange-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.experimental}</div>
          </div>
          <div className="text-sm text-gray-600">Experimental</div>
        </div>

        <div className="glass-card p-6 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-purple-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
          </div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>

        <div className="glass-card p-6 border-2 border-indigo-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            <div className="text-2xl font-bold text-gray-900">
              {Math.round((stats.enabled / stats.total) * 100)}%
            </div>
          </div>
          <div className="text-sm text-gray-600">Enabled Rate</div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <Settings className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter by status:</span>
          
          {(['all', 'stable', 'beta', 'experimental', 'deprecated'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Flags List */}
      <div className="space-y-3">
        {filteredFlags.map((flag) => (
          <motion.div
            key={flag.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-card p-6 border-2 ${
              flag.enabled ? 'border-green-300 bg-green-50/30' : 'border-gray-300 bg-gray-50/30'
            }`}
          >
            <div className="flex items-start justify-between">
              {/* Flag Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{flag.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(flag.status)}`}>
                    {flag.status.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    flag.category === 'core' ? 'bg-purple-100 text-purple-800' :
                    flag.category === 'enhancement' ? 'bg-blue-100 text-blue-800' :
                    flag.category === 'experimental' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {flag.category}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-3">{flag.description}</p>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <BarChart3 className={`w-4 h-4 ${getImpactColor(flag.impact)}`} />
                    <span className="text-gray-600">
                      Impact: <strong className={getImpactColor(flag.impact)}>{flag.impact.toUpperCase()}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">
                      Users: <strong>{flag.usersAffected.toLocaleString()}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">
                      Rollout: <strong>{flag.rollout}%</strong>
                    </span>
                  </div>
                </div>

                {/* Rollout Progress Bar */}
                {flag.enabled && flag.rollout < 100 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Gradual Rollout Progress</span>
                      <span>{flag.rollout}% of users</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${flag.rollout}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => toggleFlag(flag.id)}
                className={`ml-6 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  flag.enabled
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                {flag.enabled ? (
                  <>
                    <Eye className="w-5 h-5" />
                    ENABLED
                  </>
                ) : (
                  <>
                    <EyeOff className="w-5 h-5" />
                    DISABLED
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Info */}
      <div className="glass-card p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-purple-600" />
          Feature Flag System Capabilities
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="font-semibold text-purple-900 mb-2">🎯 Gradual Rollout</div>
            <p className="text-sm text-gray-700">
              Release features to a percentage of users first, then gradually increase rollout based on metrics and feedback.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="font-semibold text-blue-900 mb-2">🧪 A/B Testing</div>
            <p className="text-sm text-gray-700">
              Test multiple feature variants simultaneously. Track user engagement and conversion to determine winners.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="font-semibold text-green-900 mb-2">⚡ Instant Kill Switch</div>
            <p className="text-sm text-gray-700">
              Disable problematic features instantly without code deployment. Critical for incident response.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <div className="font-semibold text-orange-900 mb-2">🔍 Impact Analysis</div>
            <p className="text-sm text-gray-700">
              Track which features affect user experience most. Make data-driven decisions about feature prioritization.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="glass-card p-6 border-2 border-indigo-200">
        <h3 className="font-bold text-gray-900 mb-4">🔧 Feature Flag Architecture</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>Real-time Updates:</strong> Feature flags update without page refresh using WebSocket connections</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>User Segmentation:</strong> Target specific user groups (role, sector, location) for feature access</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>Performance Tracking:</strong> Monitor feature impact on load times and system performance</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>Audit Trail:</strong> Complete history of flag changes with timestamps and admin info</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>Dependency Management:</strong> Automatically disable dependent features when parent feature is turned off</span>
          </div>
        </div>
      </div>
    </div>
  );
}
