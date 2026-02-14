import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Award, AlertCircle, CheckCircle2, Clock, BarChart3 } from 'lucide-react';

interface AgencyPerformance {
  agencyName: string;
  agencyCode: string;
  avgApprovalTime: number; // days
  slaTarget: number; // days
  slaComplianceRate: number; // percentage
  applicationsProcessed: number;
  backlog: number;
  trend: 'up' | 'down' | 'stable';
  rank: number;
}

// Main export alias
export function PerformanceScoreboard() {
  return <PerformanceScoreboardView />;
}

export function PerformanceScoreboardView() {
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  const [sortBy, setSortBy] = useState<'time' | 'compliance' | 'volume'>('time');

  // Mock performance data
  const agencies: AgencyPerformance[] = [
    {
      agencyName: 'RJSC (Registrar of Joint Stock Companies)',
      agencyCode: 'RJSC',
      avgApprovalTime: 3.2,
      slaTarget: 5,
      slaComplianceRate: 98,
      applicationsProcessed: 523,
      backlog: 12,
      trend: 'up',
      rank: 1
    },
    {
      agencyName: 'Bangladesh Investment Development Authority',
      agencyCode: 'BIDA',
      avgApprovalTime: 4.5,
      slaTarget: 7,
      slaComplianceRate: 96,
      applicationsProcessed: 412,
      backlog: 18,
      trend: 'up',
      rank: 2
    },
    {
      agencyName: 'Department of Environment',
      agencyCode: 'DOE',
      avgApprovalTime: 16.5,
      slaTarget: 15,
      slaComplianceRate: 85,
      applicationsProcessed: 187,
      backlog: 45,
      trend: 'down',
      rank: 5
    },
    {
      agencyName: 'Department of Inspection for Factories',
      agencyCode: 'DIFE',
      avgApprovalTime: 9.8,
      slaTarget: 10,
      slaComplianceRate: 92,
      applicationsProcessed: 312,
      backlog: 24,
      trend: 'stable',
      rank: 3
    },
    {
      agencyName: 'Fire Service and Civil Defence',
      agencyCode: 'FSCD',
      avgApprovalTime: 7.2,
      slaTarget: 7,
      slaComplianceRate: 89,
      applicationsProcessed: 278,
      backlog: 31,
      trend: 'stable',
      rank: 4
    },
    {
      agencyName: 'National Board of Revenue',
      agencyCode: 'NBR',
      avgApprovalTime: 1.5,
      slaTarget: 3,
      slaComplianceRate: 99,
      applicationsProcessed: 892,
      backlog: 5,
      trend: 'up',
      rank: 1
    }
  ];

  const sortedAgencies = [...agencies].sort((a, b) => {
    if (sortBy === 'time') return a.avgApprovalTime - b.avgApprovalTime;
    if (sortBy === 'compliance') return b.slaComplianceRate - a.slaComplianceRate;
    return b.applicationsProcessed - a.applicationsProcessed;
  });

  const avgTime = agencies.reduce((sum, a) => sum + a.avgApprovalTime, 0) / agencies.length;
  const avgCompliance = agencies.reduce((sum, a) => sum + a.slaComplianceRate, 0) / agencies.length;
  const totalProcessed = agencies.reduce((sum, a) => sum + a.applicationsProcessed, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Agency Performance Scoreboard</h2>
              <p className="text-gray-700">Public accountability drives performance</p>
            </div>
          </div>
          <div className="text-right">
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
              ✓ LIVE DATA
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl">
          <p className="text-sm text-gray-900">
            <strong>Transparency creates internal pressure to perform.</strong> All agencies know their performance is publicly visible. This approach has proven to improve approval times globally.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setTimeframe('month')}
            className={`px-4 py-2 rounded-lg transition-all ${
              timeframe === 'month'
                ? 'bg-amber-600 text-white shadow-lg'
                : 'glass-button hover:bg-white/80'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeframe('quarter')}
            className={`px-4 py-2 rounded-lg transition-all ${
              timeframe === 'quarter'
                ? 'bg-amber-600 text-white shadow-lg'
                : 'glass-button hover:bg-white/80'
            }`}
          >
            This Quarter
          </button>
          <button
            onClick={() => setTimeframe('year')}
            className={`px-4 py-2 rounded-lg transition-all ${
              timeframe === 'year'
                ? 'bg-amber-600 text-white shadow-lg'
                : 'glass-button hover:bg-white/80'
            }`}
          >
            This Year
          </button>
        </div>

        <div className="flex gap-2">
          <span className="text-sm text-gray-600 self-center mr-2">Sort by:</span>
          <button
            onClick={() => setSortBy('time')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              sortBy === 'time'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'glass-button hover:bg-white/80'
            }`}
          >
            Approval Time
          </button>
          <button
            onClick={() => setSortBy('compliance')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              sortBy === 'compliance'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'glass-button hover:bg-white/80'
            }`}
          >
            SLA Compliance
          </button>
          <button
            onClick={() => setSortBy('volume')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              sortBy === 'volume'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'glass-button hover:bg-white/80'
            }`}
          >
            Volume
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900">{avgTime.toFixed(1)}</div>
          <div className="text-sm text-gray-600">Avg. Days</div>
        </div>
        <div className="glass-card p-4 text-center">
          <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900">{avgCompliance.toFixed(0)}%</div>
          <div className="text-sm text-gray-600">Avg. SLA Met</div>
        </div>
        <div className="glass-card p-4 text-center">
          <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900">{totalProcessed}</div>
          <div className="text-sm text-gray-600">Total Processed</div>
        </div>
        <div className="glass-card p-4 text-center">
          <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900">+12%</div>
          <div className="text-sm text-gray-600">vs Last Period</div>
        </div>
      </div>

      {/* Agency Rankings */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Agency Performance Rankings</h3>
        <div className="space-y-3">
          {sortedAgencies.map((agency, index) => (
            <AgencyCard key={agency.agencyCode} agency={agency} index={index} />
          ))}
        </div>
      </div>

      {/* Month-over-Month Comparison */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Month-over-Month Improvements</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ImprovementCard
            agency="RJSC"
            metric="Approval Time"
            change={-15}
            unit="%"
          />
          <ImprovementCard
            agency="BIDA"
            metric="SLA Compliance"
            change={+8}
            unit="%"
          />
          <ImprovementCard
            agency="NBR"
            metric="Volume Processed"
            change={+22}
            unit="%"
          />
          <ImprovementCard
            agency="DIFE"
            metric="Backlog Reduction"
            change={-18}
            unit="%"
          />
          <ImprovementCard
            agency="DOE"
            metric="Approval Time"
            change={+12}
            unit="%" 
            negative
          />
          <ImprovementCard
            agency="FSCD"
            metric="SLA Compliance"
            change={-3}
            unit="%"
            negative
          />
        </div>
      </div>

      {/* Public Commitment */}
      <div className="glass-card p-6 bg-blue-50 border-2 border-blue-200">
        <div className="flex items-start gap-3">
          <Award className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">BIDA Performance Commitment</h4>
            <p className="text-sm text-gray-700 mb-4">
              By making these metrics public, we commit to transparency and continuous improvement. 
              Our target: <strong>Reduce average approval time to 30 days by 2027</strong>.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-white rounded-lg">
                <div className="text-xs text-gray-600">Target 2026</div>
                <div className="text-xl font-bold text-blue-700">35 days</div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="text-xs text-gray-600">Target 2027</div>
                <div className="text-xl font-bold text-green-700">30 days</div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="text-xs text-gray-600">Global Best Practice</div>
                <div className="text-xl font-bold text-purple-700">28 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgencyCard({ agency, index }: { agency: AgencyPerformance; index: number }) {
  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: '🥇', color: 'from-yellow-500 to-amber-600' };
    if (rank === 2) return { icon: '🥈', color: 'from-gray-400 to-gray-500' };
    if (rank === 3) return { icon: '🥉', color: 'from-amber-600 to-orange-600' };
    return { icon: `#${rank}`, color: 'from-gray-300 to-gray-400' };
  };

  const rankBadge = getRankBadge(agency.rank);
  const meetingSLA = agency.avgApprovalTime <= agency.slaTarget;
  const trendIcons = {
    up: <TrendingUp className="w-4 h-4 text-green-600" />,
    down: <TrendingDown className="w-4 h-4 text-red-600" />,
    stable: <div className="w-4 h-4" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-4 glass-button rounded-xl hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-4">
        {/* Rank Badge */}
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${rankBadge.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
          {rankBadge.icon}
        </div>

        {/* Agency Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900">{agency.agencyName}</h4>
            {trendIcons[agency.trend]}
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>Code: {agency.agencyCode}</span>
            <span>•</span>
            <span>{agency.applicationsProcessed} processed</span>
            <span>•</span>
            <span>{agency.backlog} backlog</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          {/* Approval Time */}
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">Avg. Time</div>
            <div className={`text-xl font-bold ${meetingSLA ? 'text-green-700' : 'text-orange-700'}`}>
              {agency.avgApprovalTime} d
            </div>
            <div className="text-xs text-gray-600">SLA: {agency.slaTarget}d</div>
          </div>

          {/* SLA Compliance */}
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">SLA Met</div>
            <div className={`text-xl font-bold ${
              agency.slaComplianceRate >= 95 ? 'text-green-700' :
              agency.slaComplianceRate >= 85 ? 'text-yellow-700' : 'text-red-700'
            }`}>
              {agency.slaComplianceRate}%
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full ${
                  agency.slaComplianceRate >= 95 ? 'bg-green-600' :
                  agency.slaComplianceRate >= 85 ? 'bg-yellow-600' : 'bg-red-600'
                }`}
                style={{ width: `${agency.slaComplianceRate}%` }}
              />
            </div>
          </div>

          {/* Status */}
          <div className="text-center">
            {meetingSLA && agency.slaComplianceRate >= 95 ? (
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-6 h-6 text-green-600 mb-1" />
                <div className="text-xs font-semibold text-green-700">Excellent</div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <AlertCircle className="w-6 h-6 text-orange-600 mb-1" />
                <div className="text-xs font-semibold text-orange-700">Needs Improvement</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ImprovementCard({ agency, metric, change, unit, negative = false }: {
  agency: string;
  metric: string;
  change: number;
  unit: string;
  negative?: boolean;
}) {
  const isImprovement = negative ? change < 0 : change > 0;
  
  return (
    <div className={`p-4 rounded-xl border-2 ${
      isImprovement 
        ? 'bg-green-50 border-green-200' 
        : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <h5 className="font-semibold text-gray-900 text-sm">{agency}</h5>
        {isImprovement ? (
          <TrendingUp className="w-5 h-5 text-green-600" />
        ) : (
          <TrendingDown className="w-5 h-5 text-red-600" />
        )}
      </div>
      <div className="text-xs text-gray-600 mb-1">{metric}</div>
      <div className={`text-2xl font-bold ${isImprovement ? 'text-green-700' : 'text-red-700'}`}>
        {change > 0 ? '+' : ''}{change}{unit}
      </div>
    </div>
  );
}