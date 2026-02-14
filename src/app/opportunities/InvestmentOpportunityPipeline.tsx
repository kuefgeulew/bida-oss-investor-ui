/**
 * 💼 INVESTMENT OPPORTUNITY PIPELINE
 * 
 * Curated investment deals and partnership opportunities
 * Mounted in: Intelligence Tab, Services Tab
 * Features: Deal matching, sector filtering, contact owners, save favorites
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  TrendingUp,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  Star,
  Send,
  Filter,
  Search,
  Heart,
  Building2,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  Globe,
  Award,
  Sparkles,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

type InvestmentSize = 'small' | 'medium' | 'large' | 'mega';
type DealStage = 'concept' | 'feasibility' | 'ready' | 'funded';
type DealType = 'greenfield' | 'brownfield' | 'jv' | 'acquisition' | 'ppp' | 'privatization';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  sector: string;
  location: string;
  investmentSize: InvestmentSize;
  investmentRange: string;
  dealType: DealType;
  stage: DealStage;
  roi: string;
  paybackPeriod: string;
  jobsCreated: number;
  sponsor: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  postedDate: string;
  highlights: string[];
  incentivesAvailable: string[];
  featured: boolean;
  matchScore: number; // 0-100
}

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'OPP-001',
    title: 'Smart Textile Manufacturing Hub - Chittagong Export Zone',
    description: 'State-of-the-art garment manufacturing facility with EU/US compliance. Existing infrastructure includes 50,000 sqft factory shell, power backup, and water treatment. Seeking technology partner for automation upgrade.',
    sector: 'Textile & Garments',
    location: 'Chittagong EPZ',
    investmentSize: 'medium',
    investmentRange: '$3M - $5M',
    dealType: 'jv',
    stage: 'ready',
    roi: '22-28% annually',
    paybackPeriod: '4.5 years',
    jobsCreated: 450,
    sponsor: 'BEPZA & Local Manufacturer',
    contactPerson: 'Md. Rahman (BEPZA)',
    contactEmail: 'investment@bepza.gov.bd',
    contactPhone: '+880-1712-345678',
    postedDate: '2026-02-08',
    highlights: [
      'Pre-approved buyers (H&M, Zara commitments)',
      'Existing workforce trained',
      '10-year tax holiday eligible',
      'Land lease locked at $2/sqft'
    ],
    incentivesAvailable: ['Tax Holiday', 'Duty-Free Import', 'Repatriation'],
    featured: true,
    matchScore: 95
  },
  {
    id: 'OPP-007',
    title: 'Bangladesh Shipping Corporation - 30% Equity Stake',
    description: 'Strategic privatization of 30% government stake in state-owned Bangladesh Shipping Corporation (BSC). BSC operates 15 cargo vessels with routes to Middle East, Southeast Asia, and Europe. Profitable operations with steady cargo volumes from RMG exports.',
    sector: 'Maritime & Shipping',
    location: 'Chittagong',
    investmentSize: 'mega',
    investmentRange: '$25M - $35M',
    dealType: 'privatization',
    stage: 'ready',
    roi: '12-16% annually',
    paybackPeriod: '7.5 years',
    jobsCreated: 850,
    sponsor: 'Ministry of Finance - Privatization Commission',
    contactPerson: 'Mr. Chowdhury (Privatization Commission)',
    contactEmail: 'privatization@mof.gov.bd',
    contactPhone: '+880-1718-123456',
    postedDate: '2026-02-10',
    highlights: [
      '30% stake (retaining board representation)',
      'Profitable for 8 consecutive years',
      '15 vessels valued at $180M',
      'Exclusive govt contracts for RMG exports'
    ],
    incentivesAvailable: ['Repatriation Rights', 'Board Seats', 'Preferential Cargo Rights'],
    featured: true,
    matchScore: 92
  },
  {
    id: 'OPP-008',
    title: 'Titas Gas Transmission & Distribution - Equity Partnership',
    description: 'Government divesting 25% stake in Titas Gas, Bangladesh\'s largest gas distribution company serving Dhaka and surrounding regions. 1.2M customers, 3,500km pipeline network. Regulated returns with expansion opportunities.',
    sector: 'Energy & Utilities',
    location: 'Dhaka',
    investmentSize: 'mega',
    investmentRange: '$45M - $60M',
    dealType: 'privatization',
    stage: 'feasibility',
    roi: '14-18% annually',
    paybackPeriod: '6.8 years',
    jobsCreated: 320,
    sponsor: 'Energy & Mineral Resources Division',
    contactPerson: 'Dr. Haque (EMRD)',
    contactEmail: 'privatization@emrd.gov.bd',
    contactPhone: '+880-1719-234567',
    postedDate: '2026-02-06',
    highlights: [
      '25% equity with expansion rights',
      '1.2M customers (growing 8% annually)',
      'Regulated tariff with cost-pass-through',
      'Government guaranteed minimum returns'
    ],
    incentivesAvailable: ['Guaranteed Returns', 'Expansion Rights', 'Foreign Currency Settlement'],
    featured: true,
    matchScore: 90
  },
  {
    id: 'OPP-002',
    title: 'Pharmaceutical API Manufacturing Plant',
    description: 'WHO-GMP certified facility for Active Pharmaceutical Ingredients. Bangladesh has LDC benefits for pharma exports until 2026. Plant designed for insulin, antibiotics, and oncology drugs.',
    sector: 'Pharmaceuticals',
    location: 'Dhaka, Gazipur',
    investmentSize: 'large',
    investmentRange: '$12M - $18M',
    dealType: 'greenfield',
    stage: 'feasibility',
    roi: '35-42% annually',
    paybackPeriod: '3.8 years',
    jobsCreated: 280,
    sponsor: 'Ministry of Health & Square Pharma',
    contactPerson: 'Dr. Khan',
    contactEmail: 'api@squarepharma.com.bd',
    contactPhone: '+880-1713-987654',
    postedDate: '2026-02-05',
    highlights: [
      'Export market: India, Africa, ASEAN',
      'Government co-investment available',
      'Patent-free generic drugs',
      'Skilled workforce pool'
    ],
    incentivesAvailable: ['R&D Tax Credit', 'Export Subsidy', 'Accelerated Depreciation'],
    featured: true,
    matchScore: 88
  }
];

export function InvestmentOpportunityPipeline() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(MOCK_OPPORTUNITIES);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSector, setFilterSector] = useState<string>('all');
  const [filterSize, setFilterSize] = useState<InvestmentSize | 'all'>('all');
  const [filterStage, setFilterStage] = useState<DealStage | 'all'>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  // Filter opportunities
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           opp.sector.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector = filterSector === 'all' || opp.sector === filterSector;
      const matchesSize = filterSize === 'all' || opp.investmentSize === filterSize;
      const matchesStage = filterStage === 'all' || opp.stage === filterStage;
      
      return matchesSearch && matchesSector && matchesSize && matchesStage;
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [opportunities, searchQuery, filterSector, filterSize, filterStage]);
  
  // Get unique sectors
  const sectors = Array.from(new Set(opportunities.map(o => o.sector)));
  
  // Toggle favorite
  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
      toast.info('Removed from favorites');
    } else {
      newFavorites.add(id);
      toast.success('Added to favorites');
    }
    setFavorites(newFavorites);
  };
  
  // Contact sponsor
  const handleContact = (opp: Opportunity) => {
    toast.success('Contact request sent!', {
      description: `${opp.contactPerson} will reach out within 24 hours`,
      duration: 5000,
    });
  };
  
  // Investment size badge
  const getSizeBadge = (size: InvestmentSize) => {
    const badges = {
      small: { label: 'Small', color: 'bg-blue-100 text-blue-700' },
      medium: { label: 'Medium', color: 'bg-green-100 text-green-700' },
      large: { label: 'Large', color: 'bg-purple-100 text-purple-700' },
      mega: { label: 'Mega', color: 'bg-red-100 text-red-700' },
    };
    return badges[size];
  };
  
  // Deal stage badge
  const getStageBadge = (stage: DealStage) => {
    const badges = {
      concept: { label: 'Concept', color: 'bg-gray-100 text-gray-700' },
      feasibility: { label: 'Feasibility', color: 'bg-yellow-100 text-yellow-700' },
      ready: { label: 'Ready', color: 'bg-green-100 text-green-700' },
      funded: { label: 'Funded', color: 'bg-blue-100 text-blue-700' },
    };
    return badges[stage];
  };
  
  // Deal type label
  const getDealTypeLabel = (type: DealType) => {
    const labels = {
      greenfield: 'Greenfield',
      brownfield: 'Brownfield',
      jv: 'Joint Venture',
      acquisition: 'Acquisition',
      ppp: 'Public-Private Partnership',
      privatization: 'Privatization'
    };
    return labels[type];
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-50/30 via-teal-50/20 to-green-50/30 rounded-2xl p-8 border border-gray-100/50">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-200/50">
              <Briefcase className="w-8 h-8 text-gray-700" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Investment Opportunity Pipeline</h2>
              <p className="text-gray-600">Curated deals matched to your profile • {filteredOpportunities.length} opportunities available</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">{favorites.size}</span>
            </div>
            <p className="text-sm text-gray-600">Saved</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50">
            <p className="text-gray-600 text-sm mb-1">Featured Deals</p>
            <p className="text-3xl font-bold text-gray-900">{opportunities.filter(o => o.featured).length}</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50">
            <p className="text-gray-600 text-sm mb-1">Ready to Invest</p>
            <p className="text-3xl font-bold text-gray-900">{opportunities.filter(o => o.stage === 'ready').length}</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50">
            <p className="text-gray-600 text-sm mb-1">Avg ROI</p>
            <p className="text-3xl font-bold text-gray-900">26%</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50">
            <p className="text-gray-600 text-sm mb-1">Jobs Available</p>
            <p className="text-3xl font-bold text-gray-900">{opportunities.reduce((sum, o) => sum + o.jobsCreated, 0).toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
          </div>
          
          {/* Sector Filter */}
          <select
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none font-semibold"
          >
            <option value="all">All Sectors</option>
            {sectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
          
          {/* Size Filter */}
          <select
            value={filterSize}
            onChange={(e) => setFilterSize(e.target.value as any)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none font-semibold"
          >
            <option value="all">All Sizes</option>
            <option value="small">Small ($0.5M-$2M)</option>
            <option value="medium">Medium ($2M-$10M)</option>
            <option value="large">Large ($10M+)</option>
          </select>
          
          {/* Stage Filter */}
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value as any)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none font-semibold"
          >
            <option value="all">All Stages</option>
            <option value="concept">Concept</option>
            <option value="feasibility">Feasibility</option>
            <option value="ready">Ready to Invest</option>
            <option value="funded">Funded</option>
          </select>
        </div>
      </div>
      
      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOpportunities.map((opp, idx) => {
          const sizeBadge = getSizeBadge(opp.investmentSize);
          const stageBadge = getStageBadge(opp.stage);
          const isFavorite = favorites.has(opp.id);
          
          return (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-white rounded-xl border-2 overflow-hidden transition-all hover:shadow-xl ${
                opp.featured ? 'border-emerald-400 ring-4 ring-emerald-100' : 'border-gray-200'
              }`}
            >
              {/* Featured Badge */}
              {opp.featured && (
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-bold">FEATURED OPPORTUNITY</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span className="text-sm font-bold">{opp.matchScore}% Match</span>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{opp.title}</h3>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${sizeBadge.color}`}>
                        {sizeBadge.label}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${stageBadge.color}`}>
                        {stageBadge.label}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full font-bold bg-indigo-100 text-indigo-700">
                        {getDealTypeLabel(opp.dealType)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(opp.id)}
                    className="flex-shrink-0"
                  >
                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
                  </button>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{opp.description}</p>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-gray-600">Investment</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{opp.investmentRange}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-600">ROI</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{opp.roi}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span className="text-xs text-gray-600">Location</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{opp.location}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-xs text-gray-600">Jobs</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{opp.jobsCreated}+</p>
                  </div>
                </div>
                
                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-gray-700 mb-2">Key Highlights</h4>
                  <ul className="space-y-1">
                    {opp.highlights.slice(0, 3).map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Incentives */}
                {opp.incentivesAvailable.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-gray-700 mb-2">Incentives Available</h4>
                    <div className="flex items-center gap-2 flex-wrap">
                      {opp.incentivesAvailable.map((incentive, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-orange-50 text-orange-700 rounded-full font-medium">
                          {incentive}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                  <div className="text-xs text-gray-500">
                    <p className="font-semibold text-gray-700">{opp.sponsor}</p>
                    <p>Posted {new Date(opp.postedDate).toLocaleDateString()}</p>
                  </div>
                  
                  <button
                    onClick={() => handleContact(opp)}
                    className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-all flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Contact
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {filteredOpportunities.length === 0 && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-semibold">No opportunities match your filters</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}