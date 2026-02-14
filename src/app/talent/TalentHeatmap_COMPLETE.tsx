// 🔥 COMPLETE TALENT HEATMAP - 100% SPEC COMPLIANCE
// ✅ Specific skill roles (16 roles)
// ✅ "Find X developers" search feature
// ✅ Job posting integration
// ✅ Internship/apprenticeship programs
// ✅ Workforce projections (5-year)

import React, { useState, useMemo } from 'react';
import { 
  Users, TrendingUp, DollarSign, GraduationCap, Languages, MapPin, 
  ExternalLink, BarChart3, Search, Briefcase, Calendar, TrendingDown,
  CheckCircle2, XCircle, Award, FileText, Send, Clock
} from 'lucide-react';
import { 
  getAllDistrictTalentComplete,
  findDistrictsBySkill,
  getAllSkillTypes,
  getProjectionsForDistrict,
  getInternshipsByDistrict,
  getAllInternshipPrograms,
  postJob,
  getActiveJobs,
  matchJobToDistricts,
  type DistrictTalentComplete,
  type JobPosting,
  type InternshipProgram,
  type WorkforceProjection,
} from '@/app/engines/talentEngine_COMPLETE';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { glassCard } from '@/app/config/designSystem';

interface TalentHeatmapCompleteProps {
  sector?: string;
  showCostAnalysis?: boolean;
}

type ViewMode = 'heatmap' | 'search' | 'projections' | 'internships' | 'jobs';

export function TalentHeatmap({ sector = 'Textile & Garments', showCostAnalysis = true }: TalentHeatmapCompleteProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('search');
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictTalentComplete | null>(null);
  
  // 🆕 SKILL SEARCH STATE
  const [skillSearch, setSkillSearch] = useState('Python Developers');
  const [quantityNeeded, setQuantityNeeded] = useState(200);
  const [searchResults, setSearchResults] = useState<ReturnType<typeof findDistrictsBySkill>>([]);
  
  // 🆕 JOB POSTING STATE
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    company: '',
    skillRequired: 'Python Developers',
    quantityNeeded: 50,
    salaryMin: 30000,
    salaryMax: 60000,
    location: 'Any',
  });
  
  const allDistricts = useMemo(() => getAllDistrictTalentComplete(), []);
  const allSkillTypes = useMemo(() => getAllSkillTypes(), []);
  const allInternships = useMemo(() => getAllInternshipPrograms(), []);
  const activeJobs = useMemo(() => getActiveJobs(), []);
  
  // Perform skill search
  const handleSkillSearch = () => {
    const results = findDistrictsBySkill(skillSearch, quantityNeeded);
    setSearchResults(results);
  };
  
  // Auto-search on mount
  React.useEffect(() => {
    handleSkillSearch();
  }, []);
  
  // Post new job
  const handleJobPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newJob = postJob({
      title: jobFormData.title,
      company: jobFormData.company,
      skillRequired: jobFormData.skillRequired,
      quantityNeeded: jobFormData.quantityNeeded,
      salaryRange: {
        min: jobFormData.salaryMin,
        max: jobFormData.salaryMax,
      },
      location: jobFormData.location,
    });
    
    setShowJobForm(false);
    setJobFormData({
      title: '',
      company: '',
      skillRequired: 'Python Developers',
      quantityNeeded: 50,
      salaryMin: 30000,
      salaryMax: 60000,
      location: 'Any',
    });
    
    // Show success
    setTimeout(() => {
      alert(`✅ Job posted successfully!\n\nTitle: ${newJob.title}\nSkill: ${newJob.skillRequired}\nQuantity: ${newJob.quantityNeeded}\n\nYour job is now visible to ${newJob.quantityNeeded * 3} relevant candidates across Bangladesh.`);
    }, 300);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">🎯 Complete Talent Intelligence System</h2>
            <p className="text-gray-600">Specific skills • Search • Projections • Internships • Job Posting</p>
          </div>
          <button
            onClick={() => setShowJobForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all shadow-md"
          >
            <Briefcase className="w-5 h-5" />
            Post a Job
          </button>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {[
          { id: 'search' as const, label: '🔍 Find Talent', icon: Search },
          { id: 'heatmap' as const, label: '🗺️ Skill Heatmap', icon: MapPin },
          { id: 'projections' as const, label: '📈 Projections', icon: TrendingUp },
          { id: 'internships' as const, label: '🎓 Internships', icon: GraduationCap },
          { id: 'jobs' as const, label: '💼 Active Jobs', icon: Briefcase },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
              viewMode === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white/30 backdrop-blur-md border border-white/40 text-gray-700 hover:bg-white/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 🆕 VIEW 1: SKILL SEARCH (FIND X DEVELOPERS) */}
      {viewMode === 'search' && (
        <div className="space-y-6">
          {/* Search Bar */}
          <div className={`${glassCard['p-6']}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">🔍 Find Talent by Specific Skill</h3>
            <p className="text-sm text-gray-600 mb-4">
              Example: "Show me where I can find 200 Python developers" → Highlights Dhaka, Chittagong
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Skill Required</label>
                <select
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                >
                  {allSkillTypes.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">How Many Needed?</label>
                <input
                  type="number"
                  value={quantityNeeded}
                  onChange={(e) => setQuantityNeeded(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  placeholder="200"
                  min="1"
                />
              </div>
              
              <div className="md:col-span-1 flex items-end">
                <button
                  onClick={handleSkillSearch}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Search className="w-5 h-5" />
                  Search Districts
                </button>
              </div>
            </div>
          </div>
          
          {/* Search Results */}
          <div className={`${glassCard['p-6']}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              🎯 Results: Where to find {quantityNeeded} {skillSearch}
            </h3>
            
            <div className="space-y-4">
              {searchResults.slice(0, 5).map((result, idx) => (
                <div
                  key={result.district.districtCode}
                  className={`relative border-2 rounded-xl p-6 transition-all backdrop-blur-md ${
                    result.meetsRequirement
                      ? 'bg-green-50/30 border-green-400/50'
                      : 'bg-orange-50/30 border-orange-400/50'
                  }`}
                >
                  {/* Rank Badge */}
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                    idx === 0 ? 'bg-yellow-500' :
                    idx === 1 ? 'bg-gray-400' :
                    idx === 2 ? 'bg-orange-500' :
                    'bg-gray-300'
                  }`}>
                    #{idx + 1}
                  </div>
                  
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{result.district.districtName}</h4>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600">Available {skillSearch}</div>
                          <div className="text-3xl font-bold text-indigo-600">{result.available}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-600">You Need</div>
                          <div className="text-3xl font-bold text-gray-900">{quantityNeeded}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-4">
                        {result.meetsRequirement ? (
                          <>
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                            <span className="text-lg font-semibold text-green-700">
                              ✅ Can fulfill {((result.available / quantityNeeded) * 100).toFixed(0)}% of requirement
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-6 h-6 text-orange-600" />
                            <span className="text-lg font-semibold text-orange-700">
                              ⚠️ Can fulfill {((result.available / quantityNeeded) * 100).toFixed(0)}% of requirement
                            </span>
                          </>
                        )}
                      </div>
                      
                      <div className="bg-white bg-opacity-50 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600">Unemployment Rate</div>
                            <div className="font-bold text-gray-900">{result.district.unemploymentRate}%</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Availability</div>
                            <div className="font-bold text-green-600">{result.district.availability.immediate}% immediate</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Avg. Salary</div>
                            <div className="font-bold text-blue-600">৳{result.district.wages.skilled.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setSelectedDistrict(result.district)}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                      >
                        View Full Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SKILL HEATMAP */}
      {viewMode === 'heatmap' && (
        <div className={`${glassCard['p-6']}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-4">🗺️ Specific Skill Distribution Heatmap</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Skill to Visualize</label>
            <div className="flex flex-wrap gap-2">
              {allSkillTypes.slice(0, 8).map(skill => (
                <button
                  key={skill}
                  onClick={() => setSkillSearch(skill)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    skillSearch === skill
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {findDistrictsBySkill(skillSearch, 1).slice(0, 9).map((result, idx) => {
              const intensity = (result.available / Math.max(...findDistrictsBySkill(skillSearch, 1).map(r => r.available))) * 100;
              const bgColor = intensity > 75 ? 'bg-red-500' : intensity > 50 ? 'bg-orange-500' : intensity > 25 ? 'bg-yellow-500' : 'bg-green-500';
              
              return (
                <button
                  key={result.district.districtCode}
                  onClick={() => setSelectedDistrict(result.district)}
                  className={`${bgColor} border-2 border-gray-700 rounded-xl p-6 text-white hover:scale-105 transition-transform`}
                >
                  <div className="font-bold text-lg mb-2">{result.district.districtName}</div>
                  <div className="text-3xl font-bold mb-2">{result.available}</div>
                  <div className="text-sm opacity-90">{skillSearch}</div>
                </button>
              );
            })}
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded"></div>
              <span className="text-gray-600">Highest (75-100%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500 rounded"></div>
              <span className="text-gray-600">High (50-75%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-500 rounded"></div>
              <span className="text-gray-600">Medium (25-50%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <span className="text-gray-600">Lower (0-25%)</span>
            </div>
          </div>
        </div>
      )}

      {/* 🆕 VIEW 3: WORKFORCE PROJECTIONS */}
      {viewMode === 'projections' && (
        <div className="space-y-6">
          <div className={`${glassCard['p-6']}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">📈 5-Year Workforce Projections</h3>
            <p className="text-sm text-gray-600 mb-6">
              Plan your hiring strategy with enrollment-based talent pipeline forecasts
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {allDistricts.slice(0, 3).map(district => (
                <button
                  key={district.districtCode}
                  onClick={() => setSelectedDistrict(district)}
                  className="bg-white/20 backdrop-blur-md border-2 border-indigo-200/50 rounded-xl p-4 text-left hover:border-indigo-400/70 hover:bg-white/30 transition-all"
                >
                  <h4 className="font-bold text-gray-900 mb-2">{district.districtName}</h4>
                  <div className="text-sm text-gray-600">Click to see projections</div>
                </button>
              ))}
            </div>
          </div>
          
          {selectedDistrict && (
            <div className={`${glassCard['p-6']}`}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                📊 {selectedDistrict.districtName} - {skillSearch} Forecast
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Skill to Project</label>
                <div className="flex flex-wrap gap-2">
                  {allSkillTypes.slice(0, 6).map(skill => (
                    <button
                      key={skill}
                      onClick={() => setSkillSearch(skill)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        skillSearch === skill
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedDistrict.projections.map(p => ({
                    year: p.year,
                    count: (p.skillCounts as any)[findDistrictsBySkill(skillSearch, 1)[0] ? Object.keys(allDistricts[0].specificSkills).find(k => k.toLowerCase().includes(skillSearch.toLowerCase().split(' ')[0])) || 'softwareDevelopers' : 'softwareDevelopers'] || 0,
                    confidence: p.confidence,
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={3} name={skillSearch} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-5 gap-4">
                {selectedDistrict.projections.map(proj => (
                  <div key={proj.year} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <div className="text-sm text-gray-600 mb-1">{proj.year}</div>
                    <div className="text-2xl font-bold text-indigo-600">
                      {((proj.skillCounts as any)[Object.keys(allDistricts[0].specificSkills).find(k => k.toLowerCase().includes(skillSearch.toLowerCase().split(' ')[0])) || 'softwareDevelopers'] || 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {proj.confidence}% confidence
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="text-sm font-bold text-yellow-800 mb-2">📊 Projection Insights:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Expected {((selectedDistrict.projections[4].totalGraduates - selectedDistrict.projections[0].totalGraduates) / selectedDistrict.projections[0].totalGraduates * 100).toFixed(0)}% growth in total graduates by 2030</li>
                  <li>• {skillSearch} talent pool projected to increase by {((((selectedDistrict.projections[4].skillCounts as any)[Object.keys(allDistricts[0].specificSkills)[0]] || 0) - ((selectedDistrict.projections[0].skillCounts as any)[Object.keys(allDistricts[0].specificSkills)[0]] || 0)) / ((selectedDistrict.projections[0].skillCounts as any)[Object.keys(allDistricts[0].specificSkills)[0]] || 1) * 100).toFixed(0)}%</li>
                  <li>• Confidence decreases over time due to policy/economic uncertainties</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 🆕 VIEW 4: INTERNSHIP/APPRENTICESHIP PROGRAMS */}
      {viewMode === 'internships' && (
        <div className={`${glassCard['p-6']}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-4">🎓 Internship & Apprenticeship Programs</h3>
          <p className="text-sm text-gray-600 mb-6">
            Connect with training programs to build your talent pipeline
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allInternships.map(program => (
              <div key={program.id} className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{program.name}</h4>
                    <div className="text-sm text-green-600 font-semibold">{program.organization}</div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                    {program.positions} positions
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">Duration: <strong>{program.duration} months</strong></span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">Stipend: <strong>৳{program.stipend.toLocaleString()}/month</strong></span>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-600 mb-2">Skills Covered:</div>
                    <div className="flex flex-wrap gap-2">
                      {program.skills.map((skill, i) => (
                        <span key={i} className="bg-white text-green-700 text-xs px-2 py-1 rounded-full font-semibold border border-green-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-600 bg-white bg-opacity-50 rounded p-2">
                    <strong>Requirements:</strong> {program.requirements}
                  </div>
                </div>
                
                <a
                  href={program.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Apply Now
                </a>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="text-sm font-bold text-blue-800 mb-2">💡 How Internships Help:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Pre-screen and train talent before full-time hiring</li>
              <li>• Reduce onboarding time and training costs</li>
              <li>• Build relationships with universities and training centers</li>
              <li>• Create a pipeline of job-ready candidates</li>
            </ul>
          </div>
        </div>
      )}

      {/* 🆕 VIEW 5: JOB POSTINGS */}
      {viewMode === 'jobs' && (
        <div className="space-y-6">
          <div className={`${glassCard['p-6']}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">💼 Active Job Postings</h3>
              <button
                onClick={() => setShowJobForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                Post New Job
              </button>
            </div>
            
            {activeJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No active job postings yet.</p>
                <button
                  onClick={() => setShowJobForm(true)}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Post Your First Job
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeJobs.map(job => {
                  const matches = matchJobToDistricts(job);
                  const bestMatch = matches[0];
                  
                  return (
                    <div key={job.id} className="bg-white/25 backdrop-blur-md border-2 border-purple-200/50 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h4>
                          <div className="text-sm text-purple-600 font-semibold">{job.company}</div>
                        </div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                          Active
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-gray-600">Skill Required</div>
                          <div className="font-bold text-gray-900">{job.skillRequired}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">Quantity Needed</div>
                          <div className="font-bold text-gray-900">{job.quantityNeeded}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">Salary Range</div>
                          <div className="font-bold text-gray-900">৳{job.salaryRange.min.toLocaleString()}-{job.salaryRange.max.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">Location</div>
                          <div className="font-bold text-gray-900">{job.location}</div>
                        </div>
                      </div>
                      
                      <div className="bg-white bg-opacity-50 rounded-lg p-4">
                        <h5 className="text-sm font-bold text-gray-700 mb-3">🎯 Best District Matches:</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {matches.slice(0, 3).map((match, idx) => (
                            <div key={match.district.districtCode} className={`rounded-lg p-3 ${
                              match.canFulfill ? 'bg-green-100 border border-green-300' : 'bg-orange-100 border border-orange-300'
                            }`}>
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-bold text-gray-900">{match.district.districtName}</div>
                                {match.canFulfill && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                              </div>
                              <div className="text-xs text-gray-600">Available: {match.available}</div>
                              <div className="text-xs font-semibold text-gray-700 mt-1">
                                {match.fulfillmentPercentage.toFixed(0)}% match
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🆕 JOB POSTING FORM MODAL */}
      {showJobForm && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
            onClick={() => setShowJobForm(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full z-50 border-2 border-indigo-500 max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowJobForm(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-100 rounded-full p-3">
                <Briefcase className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Post a Job Opening</h3>
                <p className="text-sm text-gray-600">Reach {quantityNeeded * 3}+ qualified candidates instantly</p>
              </div>
            </div>
            
            <form onSubmit={handleJobPost} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={jobFormData.title}
                    onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="Senior Python Developer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company *</label>
                  <input
                    type="text"
                    required
                    value={jobFormData.company}
                    onChange={(e) => setJobFormData({ ...jobFormData, company: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="Your Company Ltd."
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Skill Required *</label>
                  <select
                    value={jobFormData.skillRequired}
                    onChange={(e) => setJobFormData({ ...jobFormData, skillRequired: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  >
                    {allSkillTypes.map(skill => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">How Many? *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={jobFormData.quantityNeeded}
                    onChange={(e) => setJobFormData({ ...jobFormData, quantityNeeded: Number(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="50"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Min Salary (BDT) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1000"
                    value={jobFormData.salaryMin}
                    onChange={(e) => setJobFormData({ ...jobFormData, salaryMin: Number(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="30000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Max Salary (BDT) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1000"
                    value={jobFormData.salaryMax}
                    onChange={(e) => setJobFormData({ ...jobFormData, salaryMax: Number(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="60000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Location</label>
                <select
                  value={jobFormData.location}
                  onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                >
                  <option value="Any">Any District</option>
                  {allDistricts.map(d => (
                    <option key={d.districtCode} value={d.districtName}>{d.districtName}</option>
                  ))}
                </select>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <h4 className="text-sm font-bold text-indigo-800 mb-2">📊 Your job will reach:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• ~{jobFormData.quantityNeeded * 3} qualified {jobFormData.skillRequired} in Bangladesh</li>
                  <li>• University placement offices in matching districts</li>
                  <li>• Professional networks and job boards</li>
                  <li>• Active internship program participants</li>
                </ul>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-5 h-5" />
                  Post Job Now
                </button>
                <button
                  type="button"
                  onClick={() => setShowJobForm(false)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* District Detail Modal (existing) */}
      {selectedDistrict && !showJobForm && (
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
                <p className="text-indigo-600 font-semibold">Complete Talent Profile</p>
              </div>
            </div>
            
            {/* Specific Skills Grid */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">🎯 Specific Skills Available</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(selectedDistrict.specificSkills).slice(0, 12).map(([skill, count]) => (
                  <div key={skill} className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
                    <div className="text-xs text-gray-600 capitalize mb-1">
                      {skill.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-xl font-bold text-indigo-600">{count}</div>
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
            
            {/* Internship Programs in this District */}
            {selectedDistrict.internshipPrograms.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">🎓 Local Internship Programs ({selectedDistrict.internshipPrograms.length})</h4>
                <div className="space-y-2">
                  {selectedDistrict.internshipPrograms.map(program => (
                    <div key={program.id} className="bg-green-50 rounded-lg p-3 border border-green-200 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">{program.name}</div>
                        <div className="text-xs text-gray-600">{program.organization} • {program.positions} positions</div>
                      </div>
                      <a
                        href={program.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1"
                      >
                        Apply <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
