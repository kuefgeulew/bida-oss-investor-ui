// 👥 TALENT ENGINE — Workforce Matching & Skills Database
// ARCHITECTURE: AI-powered talent acquisition and workforce planning
// SOURCE: Skills database + labor market data + training providers
// MOUNT: InvestorPortal (HR/Talent tab) + Workforce planning section

import React, { useState, useMemo } from 'react';
import { Card } from '@/app/components/ui/card';
import { 
  Users,
  Briefcase,
  GraduationCap,
  Award,
  TrendingUp,
  MapPin,
  DollarSign,
  Clock,
  Search,
  Filter,
  Star,
  CheckCircle,
  Building2,
  Globe,
  Target,
  Zap,
  BarChart3,
  BookOpen,
  FileText,
  Phone,
  Mail,
  Download,
  Plus,
  ArrowRight,
  Code,
  Wrench,
  PieChart
} from 'lucide-react';
import { useLanguage } from '@/app/components/LanguageContext';

interface TalentProfile {
  id: string;
  name: string;
  title: string;
  skills: string[];
  experience: number;
  education: string;
  location: string;
  salaryExpectation: number;
  availability: 'immediate' | '2-weeks' | '1-month' | '3-months';
  language: string[];
  certifications: string[];
  matchScore?: number;
}

interface TrainingProgram {
  id: string;
  name: string;
  provider: string;
  duration: string;
  skillsOffered: string[];
  cost: number;
  certificationOffered: boolean;
  type: 'technical' | 'management' | 'language' | 'compliance';
}

interface WorkforceRequirement {
  position: string;
  count: number;
  skills: string[];
  minExperience: number;
  urgency: 'immediate' | 'high' | 'medium' | 'low';
}

const TALENT_POOL: TalentProfile[] = [
  {
    id: 't-1',
    name: 'Karim Hassan',
    title: 'Senior Software Engineer',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
    experience: 7,
    education: 'B.Sc. Computer Science - BUET',
    location: 'Dhaka',
    salaryExpectation: 150000,
    availability: 'immediate',
    language: ['Bengali', 'English'],
    certifications: ['AWS Solutions Architect', 'Google Cloud Professional']
  },
  {
    id: 't-2',
    name: 'Nadia Rahman',
    title: 'Manufacturing Engineer',
    skills: ['Lean Manufacturing', 'Quality Control', 'Six Sigma', 'CAD'],
    experience: 5,
    education: 'B.Sc. Mechanical Engineering - KUET',
    location: 'Chittagong',
    salaryExpectation: 80000,
    availability: '2-weeks',
    language: ['Bengali', 'English', 'Chinese'],
    certifications: ['Six Sigma Black Belt', 'ISO 9001 Lead Auditor']
  },
  {
    id: 't-3',
    name: 'Tanvir Ahmed',
    title: 'Export Manager',
    skills: ['Export Documentation', 'Customs Compliance', 'International Trade', 'Logistics'],
    experience: 10,
    education: 'MBA - IBA, University of Dhaka',
    location: 'Dhaka',
    salaryExpectation: 120000,
    availability: '1-month',
    language: ['Bengali', 'English', 'Arabic'],
    certifications: ['Certified Export Specialist', 'International Trade Certificate']
  },
  {
    id: 't-4',
    name: 'Farzana Islam',
    title: 'Textile Production Manager',
    skills: ['Garment Production', 'Quality Assurance', 'Inventory Management', 'Team Leadership'],
    experience: 12,
    education: 'B.Sc. Textile Engineering - DU',
    location: 'Gazipur',
    salaryExpectation: 95000,
    availability: 'immediate',
    language: ['Bengali', 'English', 'Hindi'],
    certifications: ['Textile Quality Management', 'WRAP Certification']
  },
  {
    id: 't-5',
    name: 'Rafiq Khan',
    title: 'Electrical Engineer',
    skills: ['Power Systems', 'AutoCAD', 'PLC Programming', 'Electrical Design'],
    experience: 8,
    education: 'B.Sc. Electrical Engineering - RUET',
    location: 'Dhaka',
    salaryExpectation: 85000,
    availability: '2-weeks',
    language: ['Bengali', 'English'],
    certifications: ['Professional Engineer License', 'PMP']
  },
  {
    id: 't-6',
    name: 'Saima Akter',
    title: 'HR Manager',
    skills: ['Talent Acquisition', 'Employee Relations', 'Compensation & Benefits', 'HRIS'],
    experience: 6,
    education: 'MBA - NSU',
    location: 'Dhaka',
    salaryExpectation: 90000,
    availability: '1-month',
    language: ['Bengali', 'English'],
    certifications: ['SHRM-CP', 'HR Analytics Certificate']
  }
];

const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'tr-1',
    name: 'Advanced Manufacturing Skills Program',
    provider: 'BIDA Skills Development Center',
    duration: '6 months',
    skillsOffered: ['Lean Manufacturing', 'Quality Control', 'Process Optimization'],
    cost: 50000,
    certificationOffered: true,
    type: 'technical'
  },
  {
    id: 'tr-2',
    name: 'Export Compliance & Documentation',
    provider: 'Bangladesh Foreign Trade Institute',
    duration: '3 months',
    skillsOffered: ['Export Documentation', 'Customs Procedures', 'Trade Finance'],
    cost: 30000,
    certificationOffered: true,
    type: 'compliance'
  },
  {
    id: 'tr-3',
    name: 'Leadership Development Program',
    provider: 'IBA Executive Education',
    duration: '4 months',
    skillsOffered: ['Strategic Planning', 'Team Leadership', 'Change Management'],
    cost: 75000,
    certificationOffered: true,
    type: 'management'
  },
  {
    id: 'tr-4',
    name: 'Chinese Language for Business',
    provider: 'Confucius Institute Dhaka',
    duration: '6 months',
    skillsOffered: ['Business Chinese', 'Cultural Understanding', 'Negotiation Skills'],
    cost: 40000,
    certificationOffered: true,
    type: 'language'
  }
];

const LABOR_MARKET_STATS = {
  totalWorkforce: 68000000,
  literacyRate: 75.6,
  technicallyTrainedAnnually: 450000,
  averageSalaryRanges: {
    'Entry Level': '25,000-35,000 BDT',
    'Mid Level': '50,000-90,000 BDT',
    'Senior Level': '100,000-200,000 BDT',
    'Executive': '200,000-500,000 BDT'
  },
  topSectors: [
    { name: 'Textiles & Garments', percentage: 35 },
    { name: 'IT & Software', percentage: 15 },
    { name: 'Manufacturing', percentage: 20 },
    { name: 'Services', percentage: 30 }
  ]
};

export function TalentEngine({ compact = false, showcase = false }: { compact?: boolean; showcase?: boolean }) {
  const { t } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<'search' | 'training' | 'insights' | 'requirements'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState(0);

  const [workforceRequirements, setWorkforceRequirements] = useState<WorkforceRequirement[]>([
    {
      position: 'Production Supervisor',
      count: 5,
      skills: ['Lean Manufacturing', 'Team Leadership', 'Quality Control'],
      minExperience: 3,
      urgency: 'high'
    },
    {
      position: 'Software Developer',
      count: 10,
      skills: ['React', 'Node.js', 'MongoDB'],
      minExperience: 2,
      urgency: 'immediate'
    }
  ]);

  // LINKEDIN-STYLE SHOWCASE VIEW
  if (showcase) {
    return (
      <div className="w-full">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-md">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Available Talent Pool</h2>
            <p className="text-sm text-gray-600">Pre-vetted professionals ready for your investment</p>
          </div>
          <div className="ml-auto">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Shelf with Fade Edges */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1800px] relative">
            {/* Left Fade Edge */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#f5f7fb] to-transparent z-10" />
            
            {/* Right Fade Edge */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#f5f7fb] to-transparent z-10" />
            
            {/* Scroll Container */}
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide scroll-smooth">
              {TALENT_POOL.slice(0, 8).map(talent => (
                <div
                  key={talent.id}
                  className="snap-start shrink-0 w-[340px] h-[280px] bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer border border-blue-100/50 flex flex-col"
                >
                  {/* Profile Header - Fixed Height */}
                  <div className="flex items-start gap-4 mb-4 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-lg shadow-md">
                      {talent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{talent.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{talent.title}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{talent.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills - Fixed Height with Overflow */}
                  <div className="mb-4 h-[60px] overflow-hidden flex-shrink-0">
                    <div className="flex flex-wrap gap-2">
                      {talent.skills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium whitespace-nowrap"
                        >
                          {skill}
                        </span>
                      ))}
                      {talent.skills.length > 4 && (
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg whitespace-nowrap">
                          +{talent.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details - Fixed Space */}
                  <div className="flex-1 flex flex-col justify-end">
                    <div className="space-y-2 text-sm border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">Experience</span>
                        </span>
                        <span className="font-semibold text-gray-900 flex-shrink-0">{talent.experience} years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">Availability</span>
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                          talent.availability === 'immediate' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {talent.availability}
                        </span>
                      </div>
                      {talent.certifications.length > 0 && (
                        <div className="flex items-center gap-2 text-xs text-purple-600 pt-2 border-t border-gray-100">
                          <Award className="w-4 h-4 flex-shrink-0" />
                          <span className="font-medium truncate">{talent.certifications.length} Certifications</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🎯 CALCULATE MATCH SCORES
  const talentWithScores = useMemo(() => {
    return TALENT_POOL.map(talent => {
      let score = 100;
      
      // Location match
      if (locationFilter !== 'all' && talent.location.toLowerCase() !== locationFilter.toLowerCase()) {
        score -= 20;
      }
      
      // Experience match
      if (talent.experience < experienceFilter) {
        score -= 30;
      }
      
      // Skills match
      if (selectedSkills.length > 0) {
        const matchedSkills = talent.skills.filter(s => 
          selectedSkills.some(sel => s.toLowerCase().includes(sel.toLowerCase()))
        );
        const skillMatchRatio = matchedSkills.length / selectedSkills.length;
        score = score * skillMatchRatio;
      }
      
      // Search query match
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matches = 
          talent.name.toLowerCase().includes(searchLower) ||
          talent.title.toLowerCase().includes(searchLower) ||
          talent.skills.some(s => s.toLowerCase().includes(searchLower));
        if (!matches) score = 0;
      }
      
      return { ...talent, matchScore: Math.max(0, Math.round(score)) };
    }).filter(t => t.matchScore > 0)
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }, [searchQuery, selectedSkills, locationFilter, experienceFilter]);

  // Extract all unique skills
  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    TALENT_POOL.forEach(t => t.skills.forEach(s => skills.add(s)));
    return Array.from(skills).sort();
  }, []);

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  if (compact) {
    // COMPACT VIEW FOR DASHBOARD
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            👥 {t('talent.engine') || 'Talent Engine'}
          </h3>
          <Users className="w-5 h-5 text-blue-600" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50/30 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-600">{TALENT_POOL.length}</div>
            <div className="text-xs text-gray-600 mt-1">{t('talent.available') || 'Available Talent'}</div>
          </div>
          <div className="bg-green-50/30 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">{TRAINING_PROGRAMS.length}</div>
            <div className="text-xs text-gray-600 mt-1">{t('talent.programs') || 'Training Programs'}</div>
          </div>
        </div>

        {/* Top Candidates */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">{t('talent.topMatches') || 'Top Matches'}</h4>
          {TALENT_POOL.slice(0, 3).map(talent => (
            <div key={talent.id} className="flex items-center gap-2 p-2 bg-gray-50/30 backdrop-blur-sm rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{talent.name}</div>
                <div className="text-xs text-gray-500">{talent.title}</div>
              </div>
              <div className="text-xs text-gray-600">{talent.experience}y</div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // FULL TALENT ENGINE
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            👥 {t('talent.engineTitle') || 'Talent & Workforce Engine'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {t('talent.subtitle') || 'Find skilled professionals and plan your workforce'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            {t('talent.exportReport') || 'Export Report'}
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            {t('talent.postJob') || 'Post Job'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{TALENT_POOL.length}</div>
              <div className="text-xs text-gray-600">{t('talent.talentPool') || 'Talent Pool'}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">450K</div>
              <div className="text-xs text-gray-600">{t('talent.trained') || 'Trained Annually'}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{TRAINING_PROGRAMS.length}</div>
              <div className="text-xs text-gray-600">{t('talent.trainingPrograms') || 'Training Programs'}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">75.6%</div>
              <div className="text-xs text-gray-600">{t('talent.literacyRate') || 'Literacy Rate'}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <Card className="p-1">
        <div className="flex gap-1">
          {[
            { id: 'search', label: t('talent.searchTalent') || 'Search Talent', icon: Search },
            { id: 'training', label: t('talent.training') || 'Training Programs', icon: GraduationCap },
            { id: 'insights', label: t('talent.marketInsights') || 'Market Insights', icon: BarChart3 },
            { id: 'requirements', label: t('talent.requirements') || 'My Requirements', icon: Target }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Search Talent Tab */}
      {activeTab === 'search' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <Card className="p-6 lg:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">
              <Filter className="w-4 h-4 inline mr-2" />
              {t('common.filters') || 'Filters'}
            </h3>

            {/* Search */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('common.search') || 'Search'}
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('talent.searchPlaceholder') || 'Name, title, skills...'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('talent.location') || 'Location'}
              </label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('common.all') || 'All Locations'}</option>
                <option value="dhaka">Dhaka</option>
                <option value="chittagong">Chittagong</option>
                <option value="gazipur">Gazipur</option>
              </select>
            </div>

            {/* Experience */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('talent.minExperience') || 'Min Experience'}: {experienceFilter} {t('common.years') || 'years'}
              </label>
              <input
                type="range"
                min="0"
                max="15"
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('talent.skills') || 'Skills'}
              </label>
              <div className="flex flex-wrap gap-1 max-h-64 overflow-y-auto">
                {allSkills.slice(0, 20).map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkillFilter(skill)}
                    className={`px-2 py-1 text-xs rounded ${
                      selectedSkills.includes(skill)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              {selectedSkills.length > 0 && (
                <button
                  onClick={() => setSelectedSkills([])}
                  className="text-xs text-blue-600 mt-2 hover:underline"
                >
                  {t('common.clearAll') || 'Clear all'}
                </button>
              )}
            </div>
          </Card>

          {/* Results */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {talentWithScores.length} {t('talent.candidates') || 'candidates found'}
              </p>
            </div>

            {talentWithScores.map(talent => (
              <Card key={talent.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                      {talent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{talent.name}</h3>
                        {talent.matchScore && talent.matchScore > 70 && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {talent.matchScore}% {t('talent.match') || 'Match'}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{talent.title}</p>
                      <p className="text-sm text-gray-600 mb-3">{talent.education}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {talent.skills.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{talent.experience} {t('common.years') || 'years'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{talent.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>৳{(talent.salaryExpectation / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>{talent.availability}</span>
                        </div>
                      </div>

                      {talent.certifications.length > 0 && (
                        <div className="mt-3 flex items-center gap-2">
                          <Award className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-gray-600">
                            {talent.certifications.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0">
                    {t('talent.viewProfile') || 'View Profile'}
                  </button>
                </div>
              </Card>
            ))}

            {talentWithScores.length === 0 && (
              <Card className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">{t('talent.noResults') || 'No candidates match your criteria'}</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSkills([]);
                    setLocationFilter('all');
                    setExperienceFilter(0);
                  }}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  {t('common.resetFilters') || 'Reset filters'}
                </button>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Training Programs Tab */}
      {activeTab === 'training' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRAINING_PROGRAMS.map(program => (
            <Card key={program.id} className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{program.name}</h3>
                  <p className="text-sm text-gray-600">{program.provider}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t('talent.duration') || 'Duration'}:</span>
                  <span className="font-medium text-gray-900">{program.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t('talent.cost') || 'Cost'}:</span>
                  <span className="font-medium text-gray-900">৳{program.cost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t('talent.certification') || 'Certification'}:</span>
                  <span className="font-medium text-gray-900">
                    {program.certificationOffered ? t('common.yes') || 'Yes' : t('common.no') || 'No'}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  {t('talent.skillsCovered') || 'Skills Covered'}:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {program.skillsOffered.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {t('talent.enrollNow') || 'Enroll Now'}
              </button>
            </Card>
          ))}
        </div>
      )}

      {/* Market Insights Tab */}
      {activeTab === 'insights' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('talent.salaryBenchmarks') || 'Salary Benchmarks (BDT/month)'}
            </h3>
            <div className="space-y-3">
              {Object.entries(LABOR_MARKET_STATS.averageSalaryRanges).map(([level, range]) => (
                <div key={level} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{level}</span>
                  <span className="text-gray-600">৳{range}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('talent.sectorDistribution') || 'Workforce by Sector'}
            </h3>
            <div className="space-y-3">
              {LABOR_MARKET_STATS.topSectors.map(sector => (
                <div key={sector.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{sector.name}</span>
                    <span className="text-sm text-gray-600">{sector.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600"
                      style={{ width: `${sector.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('talent.keyStatistics') || 'Key Labor Market Statistics'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">68M</div>
                <div className="text-sm text-gray-600 mt-1">{t('talent.totalWorkforce') || 'Total Workforce'}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-600">75.6%</div>
                <div className="text-sm text-gray-600 mt-1">{t('talent.literacyRate') || 'Literacy Rate'}</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">450K</div>
                <div className="text-sm text-gray-600 mt-1">{t('talent.trainedAnnually') || 'Trained Annually'}</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Requirements Tab */}
      {activeTab === 'requirements' && (
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('talent.myRequirements') || 'My Workforce Requirements'}
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                {t('talent.addRequirement') || 'Add Requirement'}
              </button>
            </div>

            <div className="space-y-4">
              {workforceRequirements.map((req, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{req.position}</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {req.count} {t('talent.positions') || 'positions'}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          req.urgency === 'immediate' ? 'bg-red-100 text-red-700' :
                          req.urgency === 'high' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {req.urgency}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {t('talent.minExperience') || 'Min Experience'}: {req.minExperience} {t('common.years') || 'years'}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {req.skills.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                      {t('talent.findCandidates') || 'Find Candidates'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}