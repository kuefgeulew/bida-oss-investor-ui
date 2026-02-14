// Talent Heatmap - Interactive district skill density visualization
// READ-ONLY panel that reads from talentEngine
// Mounts in: Zone Map + VisaAndWorkforce

import React, { useState, useMemo } from 'react';
import { Users, TrendingUp, DollarSign, GraduationCap, Languages, MapPin, ExternalLink, BarChart3 } from 'lucide-react';
import { getAllDistrictTalent, rankDistrictsBySector, getTalentDensityHeatmap, type DistrictTalent } from '@/app/engines/talentEngine';

interface TalentHeatmapProps {
  sector?: string;
  showCostAnalysis?: boolean;
}

export function TalentHeatmap({ sector = 'Textile & Garments', showCostAnalysis = true }: TalentHeatmapProps) {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictTalent | null>(null);
  const [selectedSector, setSelectedSector] = useState(sector);
  
  const allDistricts = useMemo(() => getAllDistrictTalent(), []);
  const heatmapData = useMemo(() => getTalentDensityHeatmap(), []);
  const rankedDistricts = useMemo(() => rankDistrictsBySector(selectedSector), [selectedSector]);
  
  // Calculate max density for color scaling
  const maxDensity = useMemo(() => {
    return Math.max(...heatmapData.map(d => d.totalDensity));
  }, [heatmapData]);
  
  const getHeatColor = (density: number): string => {
    const intensity = (density / maxDensity) * 100;
    if (intensity > 75) return 'bg-red-500';
    if (intensity > 50) return 'bg-orange-500';
    if (intensity > 25) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const getHeatBorder = (density: number): string => {
    const intensity = (density / maxDensity) * 100;
    if (intensity > 75) return 'border-red-600';
    if (intensity > 50) return 'border-orange-600';
    if (intensity > 25) return 'border-yellow-600';
    return 'border-green-600';
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Talent & Skills Heatmap</h2>
        <p className="text-indigo-100">District-level workforce intelligence for strategic hiring</p>
      </div>

      {/* Sector Selector */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Filter by Sector</label>
        <div className="flex flex-wrap gap-2">
          {['Textile & Garments', 'Technology & IT', 'Pharmaceuticals', 'Heavy Manufacturing', 'Logistics', 'Finance'].map(s => (
            <button
              key={s}
              onClick={() => setSelectedSector(s)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedSector === s
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Recommended Districts */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Talent Hubs for {selectedSector}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rankedDistricts.slice(0, 3).map((ranked, idx) => (
            <div 
              key={ranked.district.districtCode}
              className={`relative bg-gradient-to-br ${
                idx === 0 ? 'from-yellow-50 to-orange-50 border-yellow-400' :
                idx === 1 ? 'from-gray-50 to-slate-50 border-gray-400' :
                'from-orange-50 to-red-50 border-orange-400'
              } border-2 rounded-xl p-6`}
            >
              {/* Rank badge */}
              <div className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                idx === 0 ? 'bg-yellow-500' :
                idx === 1 ? 'bg-gray-500' :
                'bg-orange-500'
              }`}>
                #{idx + 1}
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-2">{ranked.district.districtName}</h4>
              <div className="text-sm text-gray-600 mb-4">Suitability Score: {ranked.suitabilityScore.toFixed(1)}/100</div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Workforce</span>
                  <span className="font-bold text-gray-900">{(ranked.district.totalWorkforce / 1000000).toFixed(1)}M</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Unemployment</span>
                  <span className="font-bold text-green-600">{ranked.district.unemploymentRate}%</span>
                </div>
                
                {/* 🔥 WORLD-CLASS: SALARY BANDS */}
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <BarChart3 className="w-4 h-4 text-gray-600" />
                    <span className="text-xs font-semibold text-gray-700">Salary Bands (Monthly)</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Entry Level</span>
                      <span className="font-semibold text-gray-900">৳{(ranked.district.wages?.entrylevel || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Skilled</span>
                      <span className="font-semibold text-blue-600">৳{(ranked.district.wages?.skilled || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Managerial</span>
                      <span className="font-semibold text-purple-600">৳{(ranked.district.wages?.managerial || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-300">
                <div className="text-xs font-semibold text-gray-700 mb-2">Key Strengths</div>
                <div className="space-y-1">
                  {ranked.strengths.slice(0, 2).map((strength, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs text-green-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      {strength}
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => setSelectedDistrict(ranked.district)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Heatmap */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Skill Density Heatmap</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-600">Highest</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-gray-600">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-600">Lower</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {heatmapData.map(district => (
            <button
              key={district.district}
              onClick={() => {
                const fullDistrict = allDistricts.find(d => d.districtName === district.district);
                if (fullDistrict) setSelectedDistrict(fullDistrict);
              }}
              className={`${getHeatColor(district.totalDensity)} ${getHeatBorder(district.totalDensity)} border-2 rounded-xl p-4 text-white hover:scale-105 transition-transform`}
            >
              <div className="font-bold mb-2">{district.district}</div>
              <div className="text-sm opacity-90">Density: {district.totalDensity.toLocaleString()}</div>
              <div className="mt-3 space-y-1 text-xs">
                {district.topSkills.map((skill, i) => (
                  <div key={i} className="truncate capitalize">{skill.skill}: {skill.density}</div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* All Districts Comparison Table */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Complete District Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-gray-900">District</th>
                <th className="text-right py-3 px-4 font-bold text-gray-900">Workforce</th>
                <th className="text-right py-3 px-4 font-bold text-gray-900">Unemployed</th>
                <th className="text-right py-3 px-4 font-bold text-gray-900">Skilled Wage</th>
                <th className="text-right py-3 px-4 font-bold text-gray-900">Universities</th>
                <th className="text-right py-3 px-4 font-bold text-gray-900">Availability</th>
              </tr>
            </thead>
            <tbody>
              {allDistricts.map((district, idx) => (
                <tr 
                  key={district.districtCode}
                  className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  onClick={() => setSelectedDistrict(district)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span className="font-semibold text-gray-900">{district.districtName}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700">{(district.totalWorkforce / 1000000).toFixed(1)}M</td>
                  <td className="text-right py-3 px-4">
                    <span className={`font-semibold ${district.unemploymentRate < 5 ? 'text-green-600' : 'text-orange-600'}`}>
                      {district.unemploymentRate}%
                    </span>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-blue-600">৳{(district.wages?.skilled || 0).toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-gray-700">{district.education.universities}</td>
                  <td className="text-right py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {district.availability.immediate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* District Detail Modal */}
      {selectedDistrict && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
            onClick={() => setSelectedDistrict(null)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full z-50 border-2 border-indigo-500 max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDistrict(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-indigo-100 rounded-full p-4">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{selectedDistrict.districtName}</h3>
                <p className="text-indigo-600 font-semibold">Comprehensive Talent Profile</p>
              </div>
            </div>
            
            {/* Workforce Overview */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-blue-600 font-semibold">Total Workforce</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{(selectedDistrict.totalWorkforce / 1000000).toFixed(1)}M</div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-600 font-semibold">Youth Population</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{(selectedDistrict.youthPopulation / 1000000).toFixed(1)}M</div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-purple-600 font-semibold">Unemployment</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{selectedDistrict.unemploymentRate}%</div>
              </div>
            </div>
            
            {/* Skill Density */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Skill Density (per 10K population)</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(selectedDistrict.skillDensity).map(([skill, density]) => (
                  <div key={skill} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-600 capitalize mb-1">{skill}</div>
                    <div className="text-xl font-bold text-indigo-600">{density}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Wages */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-gray-900" />
                <h4 className="text-lg font-bold text-gray-900">Monthly Wages (BDT)</h4>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="text-xs text-gray-600 mb-1">Entry Level</div>
                  <div className="text-lg font-bold text-gray-900">৳{selectedDistrict.wages.entrylevel.toLocaleString()}</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="text-xs text-gray-600 mb-1">Skilled</div>
                  <div className="text-lg font-bold text-gray-900">৳{selectedDistrict.wages.skilled.toLocaleString()}</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <div className="text-xs text-gray-600 mb-1">Professional</div>
                  <div className="text-lg font-bold text-gray-900">৳{selectedDistrict.wages.professional.toLocaleString()}</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                  <div className="text-xs text-gray-600 mb-1">Managerial</div>
                  <div className="text-lg font-bold text-gray-900">৳{selectedDistrict.wages.managerial.toLocaleString()}</div>
                </div>
              </div>
            </div>
            
            {/* Education Infrastructure */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-gray-900" />
                <h4 className="text-lg font-bold text-gray-900">Education Infrastructure</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Universities:</span>
                    <span className="font-bold text-gray-900">{selectedDistrict.education.universities}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Technical Institutes:</span>
                    <span className="font-bold text-gray-900">{selectedDistrict.education.technicalInstitutes}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Vocational Centers:</span>
                    <span className="font-bold text-gray-900">{selectedDistrict.education.vocationalCenters}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Graduates/Year:</span>
                    <span className="font-bold text-gray-900">{selectedDistrict.education.graduatesPerYear.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Engineers/Year:</span>
                    <span className="font-bold text-gray-900">{selectedDistrict.education.engineersPerYear.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {/* 🔥 WORLD-CLASS: UNIVERSITY LINKS */}
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="flex items-center gap-2 mb-3">
                  <ExternalLink className="w-4 h-4 text-indigo-600" />
                  <h5 className="text-sm font-bold text-gray-900">Partner Universities for Recruitment</h5>
                </div>
                <div className="space-y-2">
                  {selectedDistrict.districtCode === 'BD-13' && (
                    <>
                      <a href="https://www.du.ac.bd" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 bg-white rounded hover:bg-indigo-100 transition-colors group">
                        <span className="text-sm text-gray-900">University of Dhaka</span>
                        <ExternalLink className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a href="https://www.buet.ac.bd" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 bg-white rounded hover:bg-indigo-100 transition-colors group">
                        <span className="text-sm text-gray-900">BUET (Engineering)</span>
                        <ExternalLink className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a href="https://www.nsu.edu.bd" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 bg-white rounded hover:bg-indigo-100 transition-colors group">
                        <span className="text-sm text-gray-900">North South University (Business/IT)</span>
                        <ExternalLink className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </>
                  )}
                  {selectedDistrict.districtCode === 'BD-02' && (
                    <>
                      <a href="https://www.cu.ac.bd" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 bg-white rounded hover:bg-indigo-100 transition-colors group">
                        <span className="text-sm text-gray-900">University of Chittagong</span>
                        <ExternalLink className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a href="https://www.cuet.ac.bd" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 bg-white rounded hover:bg-indigo-100 transition-colors group">
                        <span className="text-sm text-gray-900">CUET (Engineering & Technology)</span>
                        <ExternalLink className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </>
                  )}
                  {selectedDistrict.districtCode !== 'BD-13' && selectedDistrict.districtCode !== 'BD-02' && (
                    <div className="text-sm text-gray-600 italic">University partnership program available. Contact BIDA for recruitment support.</div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Language Skills */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Languages className="w-5 h-5 text-gray-900" />
                <h4 className="text-lg font-bold text-gray-900">Language Proficiency</h4>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(selectedDistrict.languageSkills).map(([lang, percent]) => (
                  <div key={lang} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-600 capitalize mb-1">{lang}</div>
                    <div className="text-xl font-bold text-blue-600">{percent}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}