import { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, TrendingUp, Building2, DollarSign } from 'lucide-react';

interface CountryInvestment {
  country: string;
  flag: string;
  investment: number;
  projects: number;
  growth: number;
  topSector: string;
}

const topSourceCountries: CountryInvestment[] = [
  { country: 'China', flag: '🇨🇳', investment: 4200, projects: 487, growth: 28.5, topSector: 'Infrastructure' },
  { country: 'India', flag: '🇮🇳', investment: 2800, projects: 612, growth: 22.3, topSector: 'IT Services' },
  { country: 'United States', flag: '🇺🇸', investment: 2100, projects: 234, growth: 15.7, topSector: 'Energy' },
  { country: 'Japan', flag: '🇯🇵', investment: 1650, projects: 189, growth: 12.4, topSector: 'Automotive' },
  { country: 'South Korea', flag: '🇰🇷', investment: 1420, projects: 267, growth: 35.2, topSector: 'Electronics' },
  { country: 'United Kingdom', flag: '🇬🇧', investment: 980, projects: 156, growth: 8.9, topSector: 'Finance' },
  { country: 'Singapore', flag: '🇸🇬', investment: 870, projects: 201, growth: 18.6, topSector: 'Logistics' },
  { country: 'Malaysia', flag: '🇲🇾', investment: 620, projects: 143, growth: 11.2, topSector: 'Manufacturing' },
  { country: 'Netherlands', flag: '🇳🇱', investment: 540, projects: 89, growth: 14.8, topSector: 'Agro-tech' },
  { country: 'Germany', flag: '🇩🇪', investment: 490, projects: 67, growth: 9.3, topSector: 'Engineering' }
];

export function FDISourceCountryMap() {
  const [selectedCountry, setSelectedCountry] = useState<CountryInvestment | null>(null);

  const totalInvestment = topSourceCountries.reduce((sum, c) => sum + c.investment, 0);
  const totalProjects = topSourceCountries.reduce((sum, c) => sum + c.projects, 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">FDI Source Countries</h3>
        <p className="text-sm text-gray-600 mt-1">Investment origins and distribution</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <p className="text-sm font-medium text-gray-700">Source Countries</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{topSourceCountries.length}</p>
          <p className="text-xs text-gray-600 mt-1">Across 5 continents</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium text-gray-700">Total Investment</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">${(totalInvestment / 1000).toFixed(1)}B</p>
          <p className="text-xs text-gray-600 mt-1">From top 10 sources</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-purple-600" />
            <p className="text-sm font-medium text-gray-700">Active Projects</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalProjects.toLocaleString()}</p>
          <p className="text-xs text-gray-600 mt-1">Operational & pipeline</p>
        </div>
      </div>

      {/* Interactive World Map Visual */}
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-900">Global Investment Distribution</h4>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-600">Asia Pacific</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600">Americas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-xs text-gray-600">Europe</span>
            </div>
          </div>
        </div>

        {/* Simplified map representation */}
        <div className="relative h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 flex items-center justify-center">
          <div className="text-center">
            <Globe className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600">67 source countries worldwide</p>
            <p className="text-xs text-gray-500 mt-1">Click on countries below for details</p>
          </div>
        </div>
      </div>

      {/* Country List with Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topSourceCountries.map((country, index) => (
          <motion.div
            key={country.country}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedCountry(country)}
            className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="text-3xl">{country.flag}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{country.country}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div>
                      <p className="text-xs text-gray-500">Investment</p>
                      <p className="text-sm font-bold text-gray-900">${country.investment}M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Projects</p>
                      <p className="text-sm font-bold text-gray-900">{country.projects}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium mb-2">
                  <TrendingUp className="w-4 h-4" />
                  +{country.growth}%
                </div>
                <div className="px-2 py-1 bg-blue-50 rounded text-xs text-blue-700">
                  {country.topSector}
                </div>
              </div>
            </div>

            {/* Progress bar showing investment share */}
            <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all"
                style={{ width: `${(country.investment / totalInvestment) * 100}%` }}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Country Detail Modal */}
      {selectedCountry && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCountry(null)}
        >
          <div 
            className="bg-white rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">{selectedCountry.flag}</div>
              <h3 className="text-2xl font-bold text-gray-900">{selectedCountry.country}</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Total Investment</p>
                <p className="text-2xl font-bold text-blue-600">${selectedCountry.investment}M</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Projects</p>
                  <p className="text-xl font-bold text-gray-900">{selectedCountry.projects}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Growth</p>
                  <p className="text-xl font-bold text-green-600">+{selectedCountry.growth}%</p>
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Primary Sector</p>
                <p className="text-lg font-bold text-purple-600">{selectedCountry.topSector}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCountry(null)}
              className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
