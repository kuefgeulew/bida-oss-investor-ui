// Sector Hub - Consolidated sector intelligence page
// Reads: agencyRegistry, supplyChainEngine, incentiveEngine
// One-stop shop for sector-specific information

import React, { useMemo } from 'react';
import { Factory, TrendingUp, Users, Award, Building2, Package } from 'lucide-react';
import { getSupplyChainMap } from '../supplychain/supplyChainEngine';
import { getIncentivesForSector } from '../engines/incentiveEligibilityEngine';
import { rankDistrictsBySector } from '../engines/talentEngine';

interface SectorHubProps {
  sector: string;
}

export function SectorHub({ sector }: SectorHubProps) {
  const supplyChain = useMemo(() => getSupplyChainMap(sector), [sector]);
  const incentives = useMemo(() => getIncentivesForSector(sector), [sector]);
  const topTalentDistricts = useMemo(() => rankDistrictsBySector(sector).slice(0, 3), [sector]);
  
  const sectorData = getSectorOverview(sector);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-50/30 via-indigo-50/20 to-purple-50/30 rounded-xl p-8 border border-gray-100/50">
        <div className="flex items-center gap-3 mb-3">
          <Factory className="w-10 h-10 text-gray-700" />
          <h1 className="text-3xl font-bold text-gray-900">{sector} Sector Hub</h1>
        </div>
        <p className="text-gray-600 text-lg">Complete intelligence and resources for {sector ? sector.toLowerCase() : 'technology & IT'} investors</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
          <TrendingUp className="w-6 h-6 text-blue-600 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{sectorData.growthRate}%</div>
          <div className="text-sm text-gray-600">Annual Growth</div>
        </div>
        <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
          <Building2 className="w-6 h-6 text-green-600 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{sectorData.activeCompanies}</div>
          <div className="text-sm text-gray-600">Active Companies</div>
        </div>
        <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
          <Users className="w-6 h-6 text-purple-600 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{sectorData.workforce}</div>
          <div className="text-sm text-gray-600">Workforce</div>
        </div>
        <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
          <Award className="w-6 h-6 text-orange-600 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{incentives.length}</div>
          <div className="text-sm text-gray-600">Incentives Available</div>
        </div>
      </div>

      {/* Sector Overview */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sector Overview</h2>
        <div className="prose max-w-none text-gray-700">
          <p>{sectorData.description}</p>
          <h3 className="text-lg font-bold mt-4 mb-2">Key Opportunities</h3>
          <ul className="space-y-1">
            {sectorData.opportunities.map((opp, idx) => (
              <li key={idx}>{opp}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Top Talent Districts */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Talent Hubs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topTalentDistricts.map((ranked, idx) => (
            <div key={ranked.district.districtCode} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  #{idx + 1}
                </div>
                <div className="font-bold text-gray-900">{ranked.district.districtName}</div>
              </div>
              <div className="text-sm text-gray-600 mb-1">Suitability Score: {ranked.suitabilityScore.toFixed(0)}/100</div>
              <div className="text-xs text-blue-700">{ranked.district.totalWorkforce.toLocaleString()} workforce</div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Incentives */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sector Incentives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {incentives.slice(0, 6).map((incentive, idx) => (
            <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
              <div className="font-bold text-gray-900 mb-2">{incentive.name}</div>
              <div className="text-sm text-gray-700 mb-2">{incentive.description}</div>
              <div className="text-xs bg-green-600 text-white px-2 py-1 rounded-full inline-block font-semibold">
                {incentive.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supply Chain Partners */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Supply Chain Ecosystem</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <Package className="w-6 h-6 text-blue-600 mb-2" />
            <div className="text-2xl font-bold text-gray-900">{supplyChain.suppliers.length}</div>
            <div className="text-sm text-gray-600">Suppliers</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <Building2 className="w-6 h-6 text-green-600 mb-2" />
            <div className="text-2xl font-bold text-gray-900">{supplyChain.ports.length}</div>
            <div className="text-sm text-gray-600">Ports & Hubs</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
            <div className="text-2xl font-bold text-gray-900">{supplyChain.exporters.length}</div>
            <div className="text-sm text-gray-600">Export Partners</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getSectorOverview(sector: string): {
  growthRate: number;
  activeCompanies: string;
  workforce: string;
  description: string;
  opportunities: string[];
} {
  // Handle undefined/null/empty sector
  if (!sector) {
    sector = 'Technology & IT'; // Default sector
  }
  
  const sectorLower = sector.toLowerCase();
  
  if (sectorLower.includes('textile') || sectorLower.includes('garment')) {
    return {
      growthRate: 8.2,
      activeCompanies: '4,500+',
      workforce: '4.2M',
      description: 'Bangladesh is the 2nd largest garment exporter globally, with strong RMG sector infrastructure and competitive labor costs.',
      opportunities: [
        'Duty-free access to EU markets under GSP+',
        'Growing demand for sustainable fashion',
        'Vertical integration opportunities',
        'Export to 160+ countries',
      ],
    };
  }
  
  if (sectorLower.includes('tech') || sectorLower.includes('it')) {
    return {
      growthRate: 25.5,
      activeCompanies: '1,200+',
      workforce: '450K',
      description: 'Rapidly growing tech sector with a young, skilled workforce and government support for digital transformation.',
      opportunities: [
        'BPO/KPO outsourcing hub potential',
        'Mobile-first market with 100M+ internet users',
        'Government digital initiatives',
        'Competitive IT talent costs',
      ],
    };
  }
  
  if (sectorLower.includes('pharma')) {
    return {
      growthRate: 12.8,
      activeCompanies: '350+',
      workforce: '125K',
      description: 'Fast-growing pharmaceutical industry with WHO-GMP certified facilities and export capabilities to 150+ countries.',
      opportunities: [
        'Export to USA, EU, and emerging markets',
        'WHO-GMP certified manufacturing',
        'Strong API production capability',
        'LDC benefits for patent exemptions',
      ],
    };
  }
  
  return {
    growthRate: 10.5,
    activeCompanies: '2,000+',
    workforce: '1.5M',
    description: 'Diversified manufacturing sector with growing export capabilities and FDI inflows.',
    opportunities: [
      'Strategic location for South Asian markets',
      'Competitive production costs',
      'Growing domestic consumption',
      'Infrastructure development initiatives',
    ],
  };
}