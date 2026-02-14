/**
 * ⭐ INVESTMENT OF THE MONTH SPOTLIGHT
 * Featured card highlighting the biggest or most significant investment
 * Creates aspirational effect for new investors
 */

import { motion } from 'motion/react';
import { Trophy, Building2, Users, TrendingUp, MapPin, Calendar } from 'lucide-react';
import { useMemo } from 'react';

export function InvestmentSpotlight() {
  // Feature the largest recent investment
  const spotlight = useMemo(() => ({
    company: 'H&M Manufacturing Hub',
    country: 'Sweden',
    sector: 'RMG & Textiles',
    amount: 45000000, // $45M
    jobs: 2800,
    location: 'Chittagong EPZ',
    date: 'February 2026',
    quote: 'Bangladesh offers the perfect combination of skilled workforce, competitive costs, and strategic location for our South Asian operations.',
    executive: 'Anders Larsson',
    title: 'Regional Director, H&M Asia',
    highlights: [
      'Largest textile investment in Q1 2026',
      'Creating 2,800 direct jobs',
      'EU GSP+ duty-free export access',
      '100% export-oriented production'
    ],
    impact: {
      exportValue: 28000000, // $28M annual exports
      localProcurement: 15000000, // $15M local sourcing
      femaleEmployment: 75 // 75% female workforce
    }
  }), []);
  
  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-600" />
        <h3 className="text-lg font-bold text-gray-900">Investment of the Month</h3>
      </div>
      
      {/* Spotlight Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-blue-50 rounded-2xl border-2 border-yellow-200 shadow-xl"
      >
        {/* Decorative Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full shadow-lg">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">Featured</span>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {spotlight.company.charAt(0)}
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-1">
                  {spotlight.company}
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">{spotlight.country}</span>
                  <span>•</span>
                  <span>{spotlight.sector}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {spotlight.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <p className="text-xs text-gray-600">Investment</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(spotlight.amount)}
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-gray-600">Jobs Created</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {spotlight.jobs.toLocaleString()}
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                <p className="text-xs text-gray-600">Location</p>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {spotlight.location}
              </p>
            </div>
          </div>
          
          {/* Quote */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-600 mb-6">
            <p className="text-gray-700 italic mb-3 text-lg leading-relaxed">
              "{spotlight.quote}"
            </p>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                {spotlight.executive.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{spotlight.executive}</p>
                <p className="text-xs text-gray-600">{spotlight.title}</p>
              </div>
            </div>
          </div>
          
          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {spotlight.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200"
              >
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <p className="text-sm text-gray-700">{highlight}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Impact Metrics */}
          <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <h5 className="text-sm font-bold text-gray-900 mb-4">Economic Impact</h5>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Annual Exports</p>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(spotlight.impact.exportValue)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Local Sourcing</p>
                <p className="text-xl font-bold text-blue-600">
                  {formatCurrency(spotlight.impact.localProcurement)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Female Workforce</p>
                <p className="text-xl font-bold text-purple-600">
                  {spotlight.impact.femaleEmployment}%
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="px-8 pb-8">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white text-center">
            <p className="text-sm font-semibold mb-1">Join Bangladesh's Investment Success Story</p>
            <p className="text-xs text-blue-100">Over 1,200 companies have already chosen Bangladesh in 2024-2025</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
