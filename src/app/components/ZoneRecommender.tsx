import { useState } from 'react';
import { motion } from 'motion/react';
import { Map, Zap, Droplet, Anchor, Factory, TrendingUp, MapPin, Star, Activity } from 'lucide-react';
import { zoneDatabase, ZoneSuitability } from '@/data/investmentIntelligence';
import { getPlotsForZone } from '@/app/engines/zonePlotEngine';
import { getUtilityUptimeForZone } from '@/app/engines/utilityUptimeEngine';

export function ZoneRecommender() {
  const [sector, setSector] = useState('');
  const [powerNeed, setPowerNeed] = useState<'high' | 'medium' | 'low'>('medium');
  const [portAccess, setPortAccess] = useState(false);
  const [waterRequirements, setWaterRequirements] = useState<'high' | 'medium' | 'low'>('medium');
  const [landSize, setLandSize] = useState('');
  const [proximityToCity, setProximityToCity] = useState(false);
  const [recommendations, setRecommendations] = useState<Array<ZoneSuitability & { score: number }>>([]);

  const handleRecommend = () => {
    // Score each zone based on requirements
    const scored = zoneDatabase.map(zone => {
      let score = 0;
      
      // Map zone name to zone ID for engine lookups
      const zoneIdMap: Record<string, string> = {
        'Dhaka EPZ': 'dhaka-epz',
        'Chittagong EPZ': 'chittagong-epz',
        'Mongla EPZ': 'mongla-epz',
        'BEPZA Economic Zone': 'bepza-ez',
        'Karnaphuli EPZ': 'karnaphuli-epz'
      };
      const zoneId = zoneIdMap[zone.zoneName] || zone.zoneName.toLowerCase().replace(/\s+/g, '-');
      
      // Sector match (30 points)
      if (sector && zone.bestFor.some(s => s.toLowerCase().includes(sector.toLowerCase()))) {
        score += 30;
      }
      
      // 🔥 WORLD-CLASS ENHANCEMENT: UTILITY UPTIME SCORING (25 points)
      const utilityData = getUtilityUptimeForZone(zone.zoneName);
      if (powerNeed === 'high') {
        // High power need: heavily weight uptime
        if (utilityData.power.uptime >= 99) score += 25;
        else if (utilityData.power.uptime >= 97) score += 20;
        else if (utilityData.power.uptime >= 95) score += 15;
        else score += 10;
      } else if (powerNeed === 'medium') {
        if (utilityData.power.uptime >= 95) score += 20;
        else score += 15;
      } else {
        score += 15; // Low need
      }
      
      // Port access (20 points)
      if (portAccess) {
        if (zone.infrastructure.port === 'adjacent') score += 20;
        else if (zone.infrastructure.port === 'nearby') score += 10;
      } else {
        score += 10; // Not needed, so no penalty
      }
      
      // 🔥 WORLD-CLASS ENHANCEMENT: GAS UPTIME (15 points)
      if (zone.infrastructure.gas === 'available') {
        if (utilityData.gas.uptime >= 98) score += 15;
        else if (utilityData.gas.uptime >= 95) score += 12;
        else score += 8;
      } else if (zone.infrastructure.gas === 'planned') score += 8;
      
      // 🔥 WORLD-CLASS ENHANCEMENT: PLOT AVAILABILITY (15 points)
      const plots = getPlotsForZone(zoneId);
      const availablePlots = plots.filter(p => p.status === 'available');
      const plotAvailabilityScore = plots.length > 0 ? (availablePlots.length / plots.length) * 15 : 0;
      score += plotAvailabilityScore;
      
      // Water requirements (10 points) + WATER UPTIME
      if (waterRequirements === 'high') {
        if (zone.infrastructure.water === 'excellent' && utilityData.water.uptime >= 98) score += 10;
        else if (zone.infrastructure.water === 'excellent') score += 8;
        else score += 5;
      } else if (waterRequirements === 'medium' && zone.infrastructure.water !== 'adequate') {
        score += 5;
      } else if (waterRequirements === 'low') {
        score += 2;
      }
      
      // Land size (10 points) - ENHANCED WITH PLOT-LEVEL MATCHING
      if (landSize) {
        const matchingPlots = availablePlots.filter(p => {
          const sizeNum = parseFloat(landSize);
          return p.sizeAcres >= sizeNum * 0.8 && p.sizeAcres <= sizeNum * 1.2;
        });
        if (matchingPlots.length > 0) score += 10;
        else if (zone.plotSizes.includes(landSize)) score += 7;
        else if (zone.plotSizes.some(size => size.includes(landSize))) score += 5;
      }
      
      // Proximity to city (5 points) - based on port access as a proxy
      if (proximityToCity && zone.infrastructure.port !== 'distant') score += 5;
      
      return { ...zone, score, utilityData, availablePlots: availablePlots.length };
    });
    
    // Sort by score
    const sorted = scored.sort((a, b) => b.score - a.score);
    setRecommendations(sorted);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-8 rounded-2xl border border-[#e3ebf7]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
            <Map className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Zone Suitability Recommender</h2>
            <p className="text-gray-600">Find the best SEZ/EPZ matching for your business</p>
          </div>
        </div>

        <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl">
          <p className="text-sm text-teal-900">
            <strong>Remove blind zone selection.</strong> Get data-driven recommendations based on infrastructure, sector clusters, and incentives.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <div className="glass-card p-8 rounded-2xl border border-[#e3ebf7]">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Requirements:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Sector *
            </label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full px-4 py-3 glass-button rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select sector</option>
              <option value="Textiles">Textiles & Garments</option>
              <option value="Heavy industry">Heavy Industry</option>
              <option value="Electronics">Electronics</option>
              <option value="Pharmaceuticals">Pharmaceuticals</option>
              <option value="Agro-processing">Agro-processing</option>
              <option value="Automotive">Automotive</option>
              <option value="IT">IT / Software</option>
            </select>
          </div>

          {/* Power Need */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Power Requirements
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setPowerNeed('low')}
                className={`flex-1 px-4 py-3 rounded-xl transition-all text-sm ${
                  powerNeed === 'low'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'glass-button hover:bg-white/80'
                }`}
              >
                Low
              </button>
              <button
                onClick={() => setPowerNeed('medium')}
                className={`flex-1 px-4 py-3 rounded-xl transition-all text-sm ${
                  powerNeed === 'medium'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'glass-button hover:bg-white/80'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setPowerNeed('high')}
                className={`flex-1 px-4 py-3 rounded-xl transition-all text-sm ${
                  powerNeed === 'high'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'glass-button hover:bg-white/80'
                }`}
              >
                High
              </button>
            </div>
          </div>
        </div>

        {/* Port Access */}
        <div className="mt-6 flex items-center gap-3">
          <input
            type="checkbox"
            id="portAccess"
            checked={portAccess}
            onChange={(e) => setPortAccess(e.target.checked)}
            className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
          />
          <label htmlFor="portAccess" className="text-sm text-gray-700">
            I need seaport access for import/export
          </label>
        </div>

        {/* Water Requirements */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Water Requirements
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setWaterRequirements('low')}
              className={`flex-1 px-4 py-3 rounded-xl transition-all text-sm ${
                waterRequirements === 'low'
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'glass-button hover:bg-white/80'
              }`}
            >
              Low
            </button>
            <button
              onClick={() => setWaterRequirements('medium')}
              className={`flex-1 px-4 py-3 rounded-xl transition-all text-sm ${
                waterRequirements === 'medium'
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'glass-button hover:bg-white/80'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setWaterRequirements('high')}
              className={`flex-1 px-4 py-3 rounded-xl transition-all text-sm ${
                waterRequirements === 'high'
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'glass-button hover:bg-white/80'
              }`}
            >
              High
            </button>
          </div>
        </div>

        {/* Land Size */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Land Size
          </label>
          <input
            type="text"
            value={landSize}
            onChange={(e) => setLandSize(e.target.value)}
            className="w-full px-4 py-3 glass-button rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="e.g., 10 acres"
          />
        </div>

        {/* Proximity to City */}
        <div className="mt-6 flex items-center gap-3">
          <input
            type="checkbox"
            id="proximityToCity"
            checked={proximityToCity}
            onChange={(e) => setProximityToCity(e.target.checked)}
            className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
          />
          <label htmlFor="proximityToCity" className="text-sm text-gray-700">
            I need proximity to a city
          </label>
        </div>

        <button
          onClick={handleRecommend}
          disabled={!sector}
          className="mt-6 w-full px-6 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          Get Zone Recommendations
        </button>
      </div>

      {/* Results */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {recommendations.map((zone, index) => (
            <ZoneCard key={zone.zoneName} zone={zone} rank={index + 1} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

function ZoneCard({ zone, rank }: { zone: ZoneSuitability & { score: number; utilityData?: any; availablePlots?: number }; rank: number }) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-500 to-amber-600';
    if (rank === 2) return 'from-gray-400 to-gray-500';
    if (rank === 3) return 'from-amber-600 to-orange-600';
    return 'from-gray-300 to-gray-400';
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇 Best Match';
    if (rank === 2) return '🥈 2nd Best';
    if (rank === 3) return '🥉 3rd Best';
    return `#${rank}`;
  };

  const getInfraIcon = (level: string) => {
    if (level === 'excellent' || level === 'available' || level === 'adjacent') return '✓';
    if (level === 'good' || level === 'nearby') return '○';
    return '△';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className={`glass-card p-6 ${rank === 1 ? 'border-2 border-yellow-300 shadow-xl' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getRankColor(rank)} flex items-center justify-center`}>
            <span className="text-2xl font-bold text-white">#{rank}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-gray-900">{zone.zoneName}</h3>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                {getRankBadge(rank)}
              </span>
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {zone.location}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-teal-700">{zone.score.toFixed(0)}</div>
          <div className="text-xs text-gray-600">Match Score</div>
        </div>
      </div>

      {/* Best For */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Best suited for:</h4>
        <div className="flex flex-wrap gap-2">
          {zone.bestFor.map((sector, i) => (
            <span key={i} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
              {sector}
            </span>
          ))}
        </div>
      </div>

      {/* 🔥 WORLD-CLASS: UTILITY UPTIME BADGES */}
      {zone.utilityData && (
        <div className="mb-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-green-600" />
            <h4 className="text-sm font-semibold text-gray-900">Live Utility Reliability</h4>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{zone.utilityData.power.uptime}%</div>
              <div className="text-xs text-gray-600">Power Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{zone.utilityData.gas.uptime}%</div>
              <div className="text-xs text-gray-600">Gas Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">{zone.utilityData.water.uptime}%</div>
              <div className="text-xs text-gray-600">Water Uptime</div>
            </div>
          </div>
        </div>
      )}

      {/* Infrastructure */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <InfraItem
          icon={<Zap className="w-5 h-5 text-yellow-600" />}
          label="Power"
          value={zone.infrastructure.power}
          status={getInfraIcon(zone.infrastructure.power)}
        />
        <InfraItem
          icon={<Factory className="w-5 h-5 text-blue-600" />}
          label="Gas"
          value={zone.infrastructure.gas}
          status={getInfraIcon(zone.infrastructure.gas)}
        />
        <InfraItem
          icon={<Droplet className="w-5 h-5 text-cyan-600" />}
          label="Water"
          value={zone.infrastructure.water}
          status={getInfraIcon(zone.infrastructure.water)}
        />
        <InfraItem
          icon={<Anchor className="w-5 h-5 text-purple-600" />}
          label="Port"
          value={zone.infrastructure.port}
          status={getInfraIcon(zone.infrastructure.port)}
        />
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Available Plot Sizes</div>
          <div className="font-semibold text-gray-900 text-sm">
            {zone.plotSizes.join(', ')}
          </div>
          {/* 🔥 WORLD-CLASS: AVAILABLE PLOTS COUNT */}
          {zone.availablePlots !== undefined && (
            <div className="mt-2 text-xs text-green-600 font-semibold">
              {zone.availablePlots} plots available now
            </div>
          )}
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Occupancy Rate</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-600"
                style={{ width: `${zone.occupancyRate}%` }}
              />
            </div>
            <span className="font-semibold text-gray-900 text-sm">{zone.occupancyRate}%</span>
          </div>
        </div>
      </div>

      {/* Established Companies */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          Established companies (sector cluster):
        </h4>
        <div className="flex flex-wrap gap-2">
          {zone.establishedCompanies.map((company, i) => (
            <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
              {company}
            </span>
          ))}
        </div>
      </div>

      {/* Incentives */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Zone Incentives:</h4>
        <div className="grid grid-cols-2 gap-2">
          {zone.incentives.map((incentive, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <Star className="w-4 h-4 text-green-600" />
              {incentive}
            </div>
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="mt-6 flex gap-3">
        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
          Apply for {zone.zoneName}
        </button>
        <button className="px-6 py-3 glass-button rounded-xl hover:bg-white/80 transition-all">
          Virtual Tour
        </button>
      </div>
    </motion.div>
  );
}

function InfraItem({ icon, label, value, status }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: string;
}) {
  return (
    <div className="p-3 glass-button rounded-lg">
      <div className="flex items-center justify-between mb-1">
        {icon}
        <span className="text-lg">{status}</span>
      </div>
      <div className="text-xs text-gray-600">{label}</div>
      <div className="text-sm font-semibold text-gray-900 capitalize">{value}</div>
    </div>
  );
}