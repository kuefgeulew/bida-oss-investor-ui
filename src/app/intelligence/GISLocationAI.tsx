// 🗺️ GIS + LOCATION AI — Intelligent Investment Zone Recommendation System
// ARCHITECTURE: Combines zone data with AI recommendation engine for optimal location selection
// SOURCE: Reads sezZones data + applies ML-style scoring algorithms
// MOUNT: Investor Dashboard (Zone Map tab) + Services tab

import React, { useState, useMemo } from 'react';
import { Card } from '@/app/components/ui/card';
import { 
  MapPin, 
  Building2, 
  TrendingUp, 
  Zap,
  Filter,
  Star,
  CheckCircle,
  AlertCircle,
  Navigation,
  Layers,
  BarChart3,
  Search,
  Award,
  Target,
  DollarSign,
  Clock,
  Users,
  Factory,
  Lightbulb
} from 'lucide-react';
import { sezZones, SEZZone } from '@/app/data/mockData';
import { useLanguage } from '@/app/components/LanguageContext';

interface GISLocationAIProps {
  investorProfile?: {
    sector?: string;
    investmentSize?: number;
    employeeCount?: number;
    preferredRegion?: string;
    requiredInfra?: string[];
  };
  compact?: boolean;
}

interface ZoneScore {
  zone: SEZZone;
  totalScore: number;
  scores: {
    sectorMatch: number;
    infrastructure: number;
    incentives: number;
    accessibility: number;
    cost: number;
    availability: number;
  };
  recommendations: string[];
  warnings: string[];
}

export function GISLocationAI({ investorProfile, compact = false }: GISLocationAIProps) {
  const { t } = useLanguage();
  
  // Filters
  const [selectedSector, setSelectedSector] = useState(investorProfile?.sector || 'all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [minInvestment, setMinInvestment] = useState(0);
  const [maxInvestment, setMaxInvestment] = useState(10000000);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'cost' | 'availability'>('score');

  // 🤖 AI SCORING ENGINE
  const analyzeZones = useMemo(() => {
    const scoredZones: ZoneScore[] = sezZones.map(zone => {
      const scores = {
        sectorMatch: calculateSectorMatch(zone, selectedSector, investorProfile?.sector),
        infrastructure: calculateInfrastructureScore(zone),
        incentives: calculateIncentiveScore(zone),
        accessibility: calculateAccessibilityScore(zone),
        cost: calculateCostScore(zone),
        availability: calculateAvailabilityScore(zone)
      };

      const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / 6;

      const recommendations = generateRecommendations(zone, scores, investorProfile);
      const warnings = generateWarnings(zone, scores, investorProfile);

      return { zone, totalScore, scores, recommendations, warnings };
    });

    // Apply filters
    let filtered = scoredZones.filter(zs => {
      if (selectedType !== 'all' && zs.zone.type !== selectedType) return false;
      if (searchQuery && !zs.zone.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'score') return b.totalScore - a.totalScore;
      if (sortBy === 'cost') return a.scores.cost - b.scores.cost;
      if (sortBy === 'availability') return b.scores.availability - a.scores.availability;
      return 0;
    });

    return filtered;
  }, [selectedSector, selectedType, searchQuery, sortBy, investorProfile]);

  // Top 3 recommendations
  const topRecommendations = analyzeZones.slice(0, 3);

  if (compact) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {t('gis.aiRecommendations') || 'AI Zone Recommendations'}
            </h3>
          </div>
          <span className="text-xs text-gray-600">{t('gis.poweredByAI') || 'Powered by AI'}</span>
        </div>

        <div className="space-y-3">
          {topRecommendations.map((zs, idx) => (
            <div key={zs.zone.id} className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">{zs.zone.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-gray-900">{zs.totalScore.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{zs.zone.type} • {zs.zone.address.split(',')[1] || zs.zone.address}</p>
                  {zs.recommendations[0] && (
                    <div className="flex items-start gap-2 text-xs text-green-700 bg-green-50 p-2 rounded">
                      <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>{zs.recommendations[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // FULL VIEW
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            🗺️ {t('gis.title') || 'GIS + Location Intelligence'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {t('gis.subtitle') || 'Smart zone recommendations based on your investment profile'}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-lg">
          <Lightbulb className="w-4 h-4" />
          <span className="text-sm font-medium">{t('gis.intelligent') || 'Intelligent'}</span>
        </div>
      </div>

      {/* Top Recommendations Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topRecommendations.map((zs, idx) => (
          <Card key={zs.zone.id} className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 transform rotate-45 translate-x-8 -translate-y-8" />
            <div className="absolute top-3 right-3">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            
            <div className="mb-4">
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                #{idx + 1} {t('gis.recommended') || 'Recommended'}
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">{zs.zone.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{zs.zone.location.district}</p>

            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">{(zs.totalScore * 10).toFixed(1)}</span>
              <span className="text-sm text-gray-600">/ 10</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">{t('gis.sectorFit') || 'Sector Fit'}</span>
                <span className="font-semibold text-gray-900">{(zs.scores.sectorMatch * 10).toFixed(1)}/10</span>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${zs.scores.sectorMatch * 100}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">
            {t('gis.filters') || 'Filters & Search'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('gis.searchZone') || 'Search Zone'}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('gis.searchPlaceholder') || 'Type zone name...'}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('gis.zoneType') || 'Zone Type'}
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">{t('common.all') || 'All Types'}</option>
              <option value="SEZ">SEZ</option>
              <option value="EPZ">EPZ</option>
              <option value="Hi-Tech Park">Hi-Tech Park</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('gis.sector') || 'Sector'}
            </label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">{t('common.all') || 'All Sectors'}</option>
              <option value="Textile">Textile & Garments</option>
              <option value="Electronics">Electronics</option>
              <option value="Pharmaceuticals">Pharmaceuticals</option>
              <option value="IT">IT & Software</option>
              <option value="Food">Food Processing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('gis.sortBy') || 'Sort By'}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="score">{t('gis.aiScore') || 'AI Score'}</option>
              <option value="cost">{t('gis.lowestCost') || 'Lowest Cost'}</option>
              <option value="availability">{t('gis.availability') || 'Availability'}</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Map Stats - Map rendering now in InvestmentZoneMap component */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {t('gis.zoneStatistics') || 'Investment Zone Statistics'}
          </h3>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{analyzeZones.length}</div>
            <div className="text-sm text-gray-600 mt-1">{t('gis.totalZones') || 'Total Zones'}</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">
              {analyzeZones.reduce((sum, z) => sum + z.zone.availablePlots, 0)}
            </div>
            <div className="text-sm text-gray-600 mt-1">{t('gis.availablePlots') || 'Available Plots'}</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">
              {topRecommendations.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">{t('gis.topMatches') || 'AI Matches'}</div>
          </div>
        </div>
      </Card>

      {/* Zone Comparison Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('gis.zoneComparison') || 'Zone Comparison & Analysis'}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  {t('gis.rank') || 'Rank'}
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  {t('gis.zone') || 'Zone'}
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  {t('gis.aiScore') || 'AI Score'}
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  {t('gis.sectorFit') || 'Sector Fit'}
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  {t('gis.infrastructure') || 'Infrastructure'}
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  {t('gis.cost') || 'Cost'}
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  {t('gis.availability') || 'Availability'}
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  {t('gis.keyBenefit') || 'Key Benefit'}
                </th>
              </tr>
            </thead>
            <tbody>
              {analyzeZones.map((zs, idx) => (
                <tr key={zs.zone.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx < 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {idx + 1}
                      </span>
                      {idx < 3 && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-semibold text-gray-900">{zs.zone.name}</div>
                      <div className="text-xs text-gray-500">{zs.zone.type} • {zs.zone.location.district}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-bold text-gray-900">{(zs.totalScore * 10).toFixed(1)}</div>
                      <div className="text-xs text-gray-500">/10</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <ScoreBadge score={zs.scores.sectorMatch} />
                  </td>
                  <td className="py-4 px-4">
                    <ScoreBadge score={zs.scores.infrastructure} />
                  </td>
                  <td className="py-4 px-4">
                    <ScoreBadge score={zs.scores.cost} />
                  </td>
                  <td className="py-4 px-4">
                    <ScoreBadge score={zs.scores.availability} />
                  </td>
                  <td className="py-4 px-4">
                    {zs.recommendations[0] && (
                      <div className="flex items-start gap-2 max-w-xs">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">{zs.recommendations[0]}</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detailed Analysis for Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topRecommendations.map((zs, idx) => (
          <Card key={zs.zone.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">{zs.zone.name}</h4>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-gray-900">{(zs.totalScore * 10).toFixed(1)}</span>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-3 mb-4">
              {Object.entries(zs.scores).map(([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-semibold text-gray-900">{(value * 10).toFixed(1)}/10</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getScoreColor(value)}`}
                      style={{ width: `${value * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            {zs.recommendations.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {t('gis.strengths') || 'Strengths'}
                </div>
                <div className="space-y-1">
                  {zs.recommendations.map((rec, i) => (
                    <div key={i} className="text-xs text-gray-700 pl-4 border-l-2 border-green-300">
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {zs.warnings.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-orange-700 mb-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {t('gis.considerations') || 'Considerations'}
                </div>
                <div className="space-y-1">
                  {zs.warnings.map((warn, i) => (
                    <div key={i} className="text-xs text-gray-700 pl-4 border-l-2 border-orange-300">
                      {warn}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ==================== HELPER COMPONENTS ====================

function ScoreBadge({ score }: { score: number }) {
  const getColor = () => {
    if (score >= 0.8) return 'bg-green-100 text-green-800 border-green-300';
    if (score >= 0.6) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (score >= 0.4) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getColor()}`}>
      {(score * 10).toFixed(1)}
    </div>
  );
}

function getScoreColor(score: number): string {
  if (score >= 0.8) return 'bg-green-500';
  if (score >= 0.6) return 'bg-blue-500';
  if (score >= 0.4) return 'bg-yellow-500';
  return 'bg-red-500';
}

// ==================== AI SCORING ALGORITHMS ====================

function calculateSectorMatch(zone: SEZZone, selectedSector: string, profileSector?: string): number {
  const targetSector = profileSector || selectedSector;
  if (targetSector === 'all') return 0.7; // Neutral score

  const zoneSectors = zone.sectors.map(s => s.toLowerCase());
  const target = targetSector.toLowerCase();

  // Exact match
  if (zoneSectors.some(s => s.includes(target))) return 1.0;
  
  // Partial match
  if (zoneSectors.some(s => target.includes(s.split(' ')[0]))) return 0.8;
  
  // General manufacturing zones score well for all
  if (zoneSectors.includes('manufacturing')) return 0.6;
  
  return 0.4;
}

function calculateInfrastructureScore(zone: SEZZone): number {
  let score = 0.5; // Base score

  // Use utilities array instead of infrastructure (which doesn't exist)
  const infrastructure = zone.utilities || [];
  
  if (infrastructure.includes('Gas')) score += 0.1;
  if (infrastructure.includes('Power')) score += 0.1;
  if (infrastructure.includes('Broadband')) score += 0.1;
  if (infrastructure.includes('Port Access')) score += 0.15;
  if (infrastructure.includes('Airport Access')) score += 0.05;

  return Math.min(score, 1.0);
}

function calculateIncentiveScore(zone: SEZZone): number {
  const incentiveCount = zone.incentives.length;
  
  // More incentives = higher score
  let score = 0.4 + (incentiveCount * 0.12);
  
  // Bonus for key incentives
  if (zone.incentives.some(i => i.includes('Tax Holiday'))) score += 0.1;
  if (zone.incentives.some(i => i.includes('Duty-free'))) score += 0.1;
  
  return Math.min(score, 1.0);
}

function calculateAccessibilityScore(zone: SEZZone): number {
  let score = 0.5;

  // Use utilities array instead of infrastructure
  const infrastructure = zone.utilities || [];
  
  if (infrastructure.includes('Port Access')) score += 0.2;
  if (infrastructure.includes('Airport Access')) score += 0.1;
  if (infrastructure.includes('Highway')) score += 0.1;
  
  // District proximity to Dhaka/Chittagong
  if (['Dhaka', 'Chittagong', 'Narayanganj'].includes(zone.location.district)) {
    score += 0.1;
  }

  return Math.min(score, 1.0);
}

function calculateCostScore(zone: SEZZone): number {
  // Lower land price = higher score
  const landPrice = zone.landPrice || 1000000; // Default to 1M BDT
  
  // Normalize based on realistic Bangladesh land prices (500K - 2M BDT per acre)
  const minPrice = 500000;   // Cheapest zones
  const maxPrice = 2000000;  // Most expensive zones
  
  // Clamp the price to our range
  const clampedPrice = Math.max(minPrice, Math.min(maxPrice, landPrice));
  
  // Convert to 0-1 scale (inverted: lower price = higher score)
  const normalizedScore = 1.0 - ((clampedPrice - minPrice) / (maxPrice - minPrice));
  
  return normalizedScore;
}

function calculateAvailabilityScore(zone: SEZZone): number {
  // Mock: would read from availablePlots data
  // For now, use random based on zone ID for consistency
  const hash = zone.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 0.5 + ((hash % 50) / 100);
}

function generateRecommendations(
  zone: SEZZone, 
  scores: ZoneScore['scores'], 
  profile?: GISLocationAIProps['investorProfile']
): string[] {
  const recs: string[] = [];
  const infrastructure = zone.utilities || [];

  if (scores.sectorMatch >= 0.8) {
    recs.push('Perfect sector alignment for your industry');
  }

  if (scores.infrastructure >= 0.8) {
    recs.push('Excellent infrastructure readiness');
  }

  if (scores.incentives >= 0.7) {
    recs.push('Strong tax and duty incentives available');
  }

  if (scores.cost <= 0.3) {
    recs.push('Highly cost-effective land pricing');
  }

  if (scores.accessibility >= 0.7) {
    recs.push('Superior logistics and transport connectivity');
  }

  if (infrastructure.includes('Port Access')) {
    recs.push('Direct access to international shipping');
  }

  return recs.slice(0, 3); // Top 3 recommendations
}

function generateWarnings(
  zone: SEZZone, 
  scores: ZoneScore['scores'], 
  profile?: GISLocationAIProps['investorProfile']
): string[] {
  const warnings: string[] = [];
  const infrastructure = zone.utilities || [];

  if (scores.sectorMatch < 0.5) {
    warnings.push('Limited sector-specific infrastructure');
  }

  if (scores.cost >= 0.7) {
    warnings.push('Higher land acquisition costs');
  }

  if (scores.availability < 0.4) {
    warnings.push('Limited plot availability - early booking recommended');
  }

  if (!infrastructure.includes('Broadband')) {
    warnings.push('Consider arranging dedicated internet connectivity');
  }

  return warnings.slice(0, 2); // Top 2 warnings
}

// ==================== MAP COMPONENT ====================
// Map rendering now handled by InvestmentZoneMap component