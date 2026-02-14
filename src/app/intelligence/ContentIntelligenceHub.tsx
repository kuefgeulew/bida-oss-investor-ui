import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Download, 
  PlayCircle, 
  FileText, 
  TrendingUp,
  Building2,
  Zap,
  Pill,
  Wheat,
  Factory,
  ChevronRight,
  ExternalLink,
  Mic
} from 'lucide-react';

interface SectorHub {
  id: string;
  name: string;
  icon: any;
  color: string;
  bgColor: string;
  stats: {
    projects: number;
    investment: string;
    growth: string;
  };
  caseStudies: number;
  reports: number;
  videos: number;
}

interface CaseStudy {
  title: string;
  company: string;
  sector: string;
  investment: string;
  jobs: number;
  timeline: string;
  keyMetrics: { label: string; value: string }[];
}

interface Report {
  title: string;
  type: 'Annual' | 'Sector' | 'Policy' | 'Research';
  year: string;
  pages: number;
  size: string;
}

interface Podcast {
  title: string;
  guest: string;
  duration: string;
  topic: string;
}

const sectorHubs: SectorHub[] = [
  {
    id: 'rmg',
    name: 'RMG & Textiles',
    icon: Factory,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    stats: { projects: 487, investment: '$5.8B', growth: '+22.5%' },
    caseStudies: 12,
    reports: 8,
    videos: 15
  },
  {
    id: 'pharma',
    name: 'Pharmaceuticals',
    icon: Pill,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    stats: { projects: 156, investment: '$1.9B', growth: '+18.7%' },
    caseStudies: 8,
    reports: 6,
    videos: 10
  },
  {
    id: 'it',
    name: 'IT & Software',
    icon: Zap,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    stats: { projects: 312, investment: '$2.3B', growth: '+45.2%' },
    caseStudies: 15,
    reports: 10,
    videos: 22
  },
  {
    id: 'agro',
    name: 'Agro Processing',
    icon: Wheat,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    stats: { projects: 203, investment: '$980M', growth: '+28.4%' },
    caseStudies: 10,
    reports: 7,
    videos: 12
  },
  {
    id: 'energy',
    name: 'Energy & Power',
    icon: TrendingUp,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    stats: { projects: 89, investment: '$1.65B', growth: '+12.3%' },
    caseStudies: 6,
    reports: 9,
    videos: 8
  }
];

const featuredCaseStudies: CaseStudy[] = [
  {
    title: 'Samsung Electronics Manufacturing Expansion',
    company: 'Samsung Electronics',
    sector: 'IT & Software',
    investment: '$450M',
    jobs: 12000,
    timeline: '18 months',
    keyMetrics: [
      { label: 'ROI', value: '247%' },
      { label: 'Export Revenue', value: '$1.2B/year' },
      { label: 'Local Content', value: '45%' }
    ]
  },
  {
    title: 'Beximco Pharmaceuticals API Plant',
    company: 'Beximco Pharma',
    sector: 'Pharmaceuticals',
    investment: '$180M',
    jobs: 3500,
    timeline: '24 months',
    keyMetrics: [
      { label: 'Capacity', value: '500 tons/year' },
      { label: 'Markets', value: '67 countries' },
      { label: 'FDA Certified', value: 'Yes' }
    ]
  },
  {
    title: 'H&M Sustainable Sourcing Hub',
    company: 'H&M Group',
    sector: 'RMG & Textiles',
    investment: '$320M',
    jobs: 18000,
    timeline: '14 months',
    keyMetrics: [
      { label: 'Carbon Neutral', value: '2025' },
      { label: 'Organic Cotton', value: '80%' },
      { label: 'LEED Certified', value: 'Gold' }
    ]
  }
];

const downloadableReports: Report[] = [
  { title: 'Bangladesh FDI Annual Report 2024', type: 'Annual', year: '2024', pages: 124, size: '8.2 MB' },
  { title: 'RMG Sector Investment Guide', type: 'Sector', year: '2024', pages: 68, size: '4.5 MB' },
  { title: 'Pharmaceutical Industry Analysis', type: 'Sector', year: '2024', pages: 52, size: '3.8 MB' },
  { title: 'IT Services Export Opportunities', type: 'Sector', year: '2024', pages: 45, size: '2.9 MB' },
  { title: 'Investment Policy Framework 2024-2030', type: 'Policy', year: '2024', pages: 89, size: '5.1 MB' },
  { title: 'Green Energy Transition Roadmap', type: 'Research', year: '2024', pages: 78, size: '6.3 MB' }
];

const podcasts: Podcast[] = [
  { title: 'Why Global Investors Choose Bangladesh', guest: 'BIDA Executive Chairman', duration: '42 min', topic: 'Investment Climate' },
  { title: 'Tech Startup Success Stories', guest: 'Bangladesh Startup Ecosystem', duration: '38 min', topic: 'IT & Software' },
  { title: 'Sustainable Manufacturing in Bangladesh', guest: 'BGMEA President', duration: '45 min', topic: 'RMG & Sustainability' },
  { title: 'Pharma Export Excellence', guest: 'Leading Pharma CEOs', duration: '36 min', topic: 'Pharmaceuticals' }
];

export function ContentIntelligenceHub() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'cases' | 'reports' | 'media'>('overview');

  const handleDownload = (reportName: string) => {
    console.log(`Downloading: ${reportName}`);
    // Mock download functionality
    alert(`Download initiated: ${reportName}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Content Intelligence Hub</h3>
        <p className="text-sm text-gray-600 mt-1">
          Sector insights, success stories, and investment intelligence
        </p>
      </div>

      {/* Sector Hubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {sectorHubs.map((sector) => {
          const Icon = sector.icon;
          return (
            <motion.div
              key={sector.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedSector(sector.id)}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                selectedSector === sector.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className={`p-3 ${sector.bgColor} rounded-lg w-fit mb-3`}>
                <Icon className={`w-6 h-6 ${sector.color}`} />
              </div>
              <p className="font-semibold text-gray-900 text-sm mb-2">{sector.name}</p>
              <div className="space-y-1 text-xs text-gray-600">
                <p>{sector.stats.projects} projects</p>
                <p className="font-bold text-gray-900">{sector.stats.investment}</p>
                <p className="text-green-600 font-medium">{sector.stats.growth}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>{sector.caseStudies} cases</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Content Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium text-sm transition-all ${
            activeTab === 'overview'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Overview
          </div>
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 font-medium text-sm transition-all ${
            activeTab === 'cases'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Case Studies
          </div>
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 font-medium text-sm transition-all ${
            activeTab === 'reports'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Reports & Publications
          </div>
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`px-4 py-2 font-medium text-sm transition-all ${
            activeTab === 'media'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <PlayCircle className="w-4 h-4" />
            Videos & Podcasts
          </div>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <Building2 className="w-8 h-8 text-blue-600 mb-3" />
            <p className="text-3xl font-bold text-gray-900 mb-1">51</p>
            <p className="text-sm text-gray-700">Success Stories</p>
            <p className="text-xs text-gray-600 mt-2">Across all sectors</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <FileText className="w-8 h-8 text-green-600 mb-3" />
            <p className="text-3xl font-bold text-gray-900 mb-1">40+</p>
            <p className="text-sm text-gray-700">Research Reports</p>
            <p className="text-xs text-gray-600 mt-2">Available for download</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
            <PlayCircle className="w-8 h-8 text-purple-600 mb-3" />
            <p className="text-3xl font-bold text-gray-900 mb-1">67</p>
            <p className="text-sm text-gray-700">Video Resources</p>
            <p className="text-xs text-gray-600 mt-2">Guides & testimonials</p>
          </div>
        </div>
      )}

      {activeTab === 'cases' && (
        <div className="space-y-4">
          {featuredCaseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{study.title}</h4>
                  <p className="text-sm text-gray-600">{study.company} • {study.sector}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100"
                >
                  <ExternalLink className="w-4 h-4" />
                  Read Full Story
                </motion.button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Investment</p>
                  <p className="text-lg font-bold text-blue-600">{study.investment}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Jobs Created</p>
                  <p className="text-lg font-bold text-green-600">{study.jobs.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Timeline</p>
                  <p className="text-lg font-bold text-purple-600">{study.timeline}</p>
                </div>
              </div>

              <div className="flex gap-6 pt-4 border-t border-gray-100">
                {study.keyMetrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-xs text-gray-500">{metric.label}</p>
                    <p className="text-sm font-bold text-gray-900">{metric.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {downloadableReports.map((report, index) => (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{report.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">{report.type}</span>
                      <span>{report.year}</span>
                      <span>•</span>
                      <span>{report.pages} pages</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownload(report.title)}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  <Download className="w-4 h-4" />
                  Download
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'media' && (
        <div className="space-y-6">
          {/* Podcasts */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Investment Intelligence Podcast Series
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {podcasts.map((podcast, index) => (
                <motion.div
                  key={podcast.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">{podcast.title}</p>
                      <p className="text-sm text-gray-600 mb-2">{podcast.guest}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span className="px-2 py-1 bg-white rounded">{podcast.duration}</span>
                        <span className="px-2 py-1 bg-white rounded">{podcast.topic}</span>
                      </div>
                    </div>
                    <button className="p-2 bg-white rounded-full hover:bg-purple-100 transition-colors">
                      <PlayCircle className="w-6 h-6 text-purple-600" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Video Library */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <PlayCircle className="w-4 h-4" />
              Video Library
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Zone Tours', 'Success Stories', 'How-to Guides', 'Officer Explanations', 'Sector Masterclasses', 'Visa & Setup'].map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg mb-3 flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-blue-600" />
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">{category}</p>
                  <p className="text-xs text-gray-600">{Math.floor(Math.random() * 15) + 5} videos</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
