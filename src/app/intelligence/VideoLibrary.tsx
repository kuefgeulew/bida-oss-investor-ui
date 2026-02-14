// 📹 VIDEO/WEBINAR LIBRARY — On-Demand Training & Educational Resources
// ARCHITECTURE: Content management system for investor education
// SOURCE: BIDA training materials + webinar recordings + tutorial videos
// MOUNT: InvestorPortal (Resources tab) + Learning center

import React, { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { 
  Play,
  Video,
  Calendar,
  Clock,
  Users,
  Download,
  Bookmark,
  Share2,
  Search,
  Filter,
  Star,
  Eye,
  ThumbsUp,
  MessageSquare,
  Grid3X3,
  List,
  TrendingUp,
  Award,
  BookOpen,
  FileText,
  Globe,
  CheckCircle,
  PlayCircle,
  Radio,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/app/components/LanguageContext';

interface VideoContent {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in seconds
  category: 'registration' | 'compliance' | 'taxation' | 'export' | 'sez' | 'general';
  type: 'webinar' | 'tutorial' | 'case-study' | 'recorded-session';
  instructor: string;
  datePublished: Date;
  views: number;
  likes: number;
  language: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  resources?: string[];
  transcript?: boolean;
}

interface UpcomingWebinar {
  id: string;
  title: string;
  description: string;
  date: Date;
  duration: number;
  instructor: string;
  topic: string;
  registrations: number;
  maxCapacity: number;
}

const VIDEO_LIBRARY: VideoContent[] = [
  {
    id: 'v-1',
    title: 'Complete Guide to BIDA Registration Process',
    description: 'Step-by-step walkthrough of the investment registration process through BIDA One Stop Service',
    thumbnail: '#4F46E5',
    duration: 1800, // 30 minutes
    category: 'registration',
    type: 'tutorial',
    instructor: 'Dr. Kamal Rahman, BIDA Senior Officer',
    datePublished: new Date('2024-12-15'),
    views: 3456,
    likes: 289,
    language: ['en', 'bn'],
    difficulty: 'beginner',
    tags: ['Registration', 'OSS', 'Getting Started'],
    resources: ['Registration Checklist.pdf', 'Sample Application.docx'],
    transcript: true
  },
  {
    id: 'v-2',
    title: 'Tax Incentives for Foreign Investors in Bangladesh',
    description: 'Comprehensive overview of available tax holidays, duty exemptions, and fiscal incentives',
    thumbnail: '#10B981',
    duration: 2700, // 45 minutes
    category: 'taxation',
    type: 'webinar',
    instructor: 'Ayesha Khan, Tax Consultant',
    datePublished: new Date('2025-01-10'),
    views: 2134,
    likes: 187,
    language: ['en', 'zh'],
    difficulty: 'intermediate',
    tags: ['Tax', 'Incentives', 'Finance'],
    resources: ['Tax Incentives Guide.pdf', 'Calculation Examples.xlsx'],
    transcript: true
  },
  {
    id: 'v-3',
    title: 'Navigating Export Procedures and Documentation',
    description: 'Master the export process including customs clearance, documentation, and compliance',
    thumbnail: '#F59E0B',
    duration: 3600, // 60 minutes
    category: 'export',
    type: 'tutorial',
    instructor: 'Rahman Hossain, Export Specialist',
    datePublished: new Date('2025-01-20'),
    views: 1876,
    likes: 156,
    language: ['en', 'bn'],
    difficulty: 'intermediate',
    tags: ['Export', 'Customs', 'Documentation'],
    resources: ['Export Checklist.pdf', 'Sample Documents.zip'],
    transcript: true
  },
  {
    id: 'v-4',
    title: 'SEZ Investment: Benefits and Setup Process',
    description: 'Everything you need to know about investing in Special Economic Zones',
    thumbnail: '#8B5CF6',
    duration: 2400, // 40 minutes
    category: 'sez',
    type: 'recorded-session',
    instructor: 'Nasrin Akter, BEZA Representative',
    datePublished: new Date('2024-11-30'),
    views: 4123,
    likes: 341,
    language: ['en', 'zh', 'ko'],
    difficulty: 'beginner',
    tags: ['SEZ', 'BEZA', 'Zone Investment'],
    resources: ['SEZ Comparison Chart.pdf', 'Application Form.pdf'],
    transcript: true
  },
  {
    id: 'v-5',
    title: 'Environmental Compliance for Manufacturing',
    description: 'Meeting DOE requirements and obtaining environmental clearances',
    thumbnail: '#059669',
    duration: 2100, // 35 minutes
    category: 'compliance',
    type: 'webinar',
    instructor: 'Dr. Salma Begum, Environmental Consultant',
    datePublished: new Date('2025-01-05'),
    views: 1567,
    likes: 123,
    language: ['en', 'bn'],
    difficulty: 'advanced',
    tags: ['Environment', 'DOE', 'Manufacturing'],
    resources: ['Compliance Checklist.pdf', 'EIA Template.docx'],
    transcript: true
  },
  {
    id: 'v-6',
    title: 'Case Study: Successful Japanese Investment in Bangladesh',
    description: 'Real-world example of a major Japanese automotive company setup',
    thumbnail: '#DC2626',
    duration: 1500, // 25 minutes
    category: 'general',
    type: 'case-study',
    instructor: 'Tanvir Ahmed, Investment Analyst',
    datePublished: new Date('2025-02-01'),
    views: 987,
    likes: 89,
    language: ['en', 'zh', 'ko', 'nl'],
    difficulty: 'intermediate',
    tags: ['Case Study', 'Manufacturing', 'Success Story'],
    resources: ['Full Case Study.pdf'],
    transcript: true
  },
  {
    id: 'v-7',
    title: 'Work Permits and Immigration for Foreign Staff',
    description: 'Complete guide to obtaining work permits and visas for expatriate employees',
    thumbnail: '#6366F1',
    duration: 1800, // 30 minutes
    category: 'compliance',
    type: 'tutorial',
    instructor: 'Farah Rahman, Immigration Specialist',
    datePublished: new Date('2024-12-20'),
    views: 2345,
    likes: 201,
    language: ['en', 'zh'],
    difficulty: 'beginner',
    tags: ['Immigration', 'Work Permit', 'Visa'],
    resources: ['Work Permit Guide.pdf', 'Application Checklist.pdf'],
    transcript: true
  },
  {
    id: 'v-8',
    title: 'Annual Compliance Requirements for Foreign Companies',
    description: 'Stay compliant with annual reporting, license renewals, and regulatory updates',
    thumbnail: '#EC4899',
    duration: 2700, // 45 minutes
    category: 'compliance',
    type: 'webinar',
    instructor: 'Mahmud Khan, Legal Advisor',
    datePublished: new Date('2025-01-15'),
    views: 1678,
    likes: 134,
    language: ['en', 'bn'],
    difficulty: 'intermediate',
    tags: ['Compliance', 'Annual Reporting', 'Legal'],
    resources: ['Compliance Calendar.pdf', 'Checklist.xlsx'],
    transcript: true
  }
];

const UPCOMING_WEBINARS: UpcomingWebinar[] = [
  {
    id: 'uw-1',
    title: 'Q&A Session: Investment Incentives 2025',
    description: 'Live Q&A with BIDA executives about new incentive programs',
    date: new Date('2025-02-15T15:00:00'),
    duration: 90,
    instructor: 'BIDA Executive Team',
    topic: 'Incentives & Policy',
    registrations: 245,
    maxCapacity: 500
  },
  {
    id: 'uw-2',
    title: 'Digital Bangladesh Initiative for Investors',
    description: 'How digitization benefits foreign investors in Bangladesh',
    date: new Date('2025-02-20T14:00:00'),
    duration: 60,
    instructor: 'Dr. Ahmed Karim, ICT Division',
    topic: 'Technology & Innovation',
    registrations: 178,
    maxCapacity: 300
  },
  {
    id: 'uw-3',
    title: 'Banking & Finance for Foreign Investors',
    description: 'Understanding the banking system, forex, and financial regulations',
    date: new Date('2025-02-25T16:00:00'),
    duration: 75,
    instructor: 'Rina Das, Bangladesh Bank',
    topic: 'Finance & Banking',
    registrations: 312,
    maxCapacity: 400
  }
];

export function VideoLibrary({ compact = false, showcase = false }: { compact?: boolean; showcase?: boolean }) {
  const { t, language } = useLanguage();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'library' | 'upcoming' | 'saved'>('library');

  const filteredVideos = VIDEO_LIBRARY.filter(video => {
    const matchesSearch = 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || video.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || video.difficulty === difficultyFilter;
    const matchesLanguage = video.language.includes(language);
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'registration': return 'bg-blue-100 text-blue-700';
      case 'compliance': return 'bg-purple-100 text-purple-700';
      case 'taxation': return 'bg-green-100 text-green-700';
      case 'export': return 'bg-orange-100 text-orange-700';
      case 'sez': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // YOUTUBE-STYLE SHOWCASE VIEW
  if (showcase) {
    return (
      <div className="w-full">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-md">
            <PlayCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Video Intelligence Library</h2>
            <p className="text-sm text-gray-600">On-demand training and investor education</p>
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
              {VIDEO_LIBRARY.slice(0, 8).map(video => (
                <div
                  key={video.id}
                  className="snap-start shrink-0 w-[360px] h-[320px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col"
                >
                  {/* Thumbnail - Fixed Height */}
                  <div className="relative h-[200px] rounded-t-2xl overflow-hidden flex-shrink-0" style={{ backgroundColor: video.thumbnail }}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-red-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
                      {formatDuration(video.duration)}
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 text-xs rounded-lg font-medium ${getCategoryColor(video.category)}`}>
                        {video.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Content - Fixed Height with Overflow Control */}
                  <div className="p-4 flex-1 flex flex-col justify-between overflow-hidden">
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 h-[40px] leading-tight mb-2">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <span className="font-medium text-gray-700 truncate">BIDA Intelligence</span>
                        <span>•</span>
                        <span className="truncate">{video.views > 1000 ? `${(video.views / 1000).toFixed(1)}K` : video.views} views</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto">
                      <Users className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{video.instructor}</span>
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

  if (compact) {
    // COMPACT VIEW FOR DASHBOARD
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            📹 {t('video.library') || 'Video Library'}
          </h3>
          <Video className="w-5 h-5 text-blue-600" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-600">{VIDEO_LIBRARY.length}</div>
            <div className="text-xs text-gray-600 mt-1">{t('video.videos') || 'Videos'}</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-600">{UPCOMING_WEBINARS.length}</div>
            <div className="text-xs text-gray-600 mt-1">{t('video.upcoming') || 'Upcoming'}</div>
          </div>
        </div>

        {/* Recent Videos */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">{t('video.recent') || 'Recent Videos'}</h4>
          {VIDEO_LIBRARY.slice(0, 3).map(video => (
            <div key={video.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
              <div className="w-12 h-12 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{video.title}</div>
                <div className="text-xs text-gray-500">{formatDuration(video.duration)}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // FULL VIDEO LIBRARY
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            📹 {t('video.libraryTitle') || 'Video & Webinar Library'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {t('video.subtitle') || 'On-demand training and educational resources for investors'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Bookmark className="w-4 h-4" />
            {t('video.saved') || 'Saved'}
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Radio className="w-4 h-4" />
            {t('video.live') || 'Live Webinars'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Video className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{VIDEO_LIBRARY.length}</div>
              <div className="text-xs text-gray-600">{t('video.totalVideos') || 'Total Videos'}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{UPCOMING_WEBINARS.length}</div>
              <div className="text-xs text-gray-600">{t('video.upcomingWebinars') || 'Upcoming Webinars'}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {(VIDEO_LIBRARY.reduce((sum, v) => sum + v.views, 0) / 1000).toFixed(1)}K
              </div>
              <div className="text-xs text-gray-600">{t('video.totalViews') || 'Total Views'}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(VIDEO_LIBRARY.reduce((sum, v) => sum + v.duration, 0) / 3600)}h
              </div>
              <div className="text-xs text-gray-600">{t('video.totalContent') || 'Total Content'}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <Card className="p-1">
        <div className="flex gap-1">
          {[
            { id: 'library', label: t('video.videoLibrary') || 'Video Library', icon: Video },
            { id: 'upcoming', label: t('video.upcomingWebinars') || 'Upcoming Webinars', icon: Calendar },
            { id: 'saved', label: t('video.savedVideos') || 'Saved Videos', icon: Bookmark }
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

      {/* Library Tab */}
      {activeTab === 'library' && (
        <>
          {/* Search and Filters */}
          <Card className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('video.search') || 'Search videos, topics, tags...'}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">{t('video.allCategories') || 'All Categories'}</option>
                  <option value="registration">{t('video.registration') || 'Registration'}</option>
                  <option value="compliance">{t('video.compliance') || 'Compliance'}</option>
                  <option value="taxation">{t('video.taxation') || 'Taxation'}</option>
                  <option value="export">{t('video.export') || 'Export'}</option>
                  <option value="sez">{t('video.sez') || 'SEZ'}</option>
                  <option value="general">{t('video.general') || 'General'}</option>
                </select>

                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">{t('video.allLevels') || 'All Levels'}</option>
                  <option value="beginner">{t('video.beginner') || 'Beginner'}</option>
                  <option value="intermediate">{t('video.intermediate') || 'Intermediate'}</option>
                  <option value="advanced">{t('video.advanced') || 'Advanced'}</option>
                </select>
              </div>

              <div className="flex items-center gap-1 ml-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>

          {/* Video Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map(video => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  {/* Thumbnail */}
                  <div className="relative h-48 flex items-center justify-center" style={{ backgroundColor: video.thumbnail }}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <Play className="w-16 h-16 text-white relative z-10 group-hover:scale-110 transition-transform" />
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                      {formatDuration(video.duration)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(video.category)}`}>
                        {video.category}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(video.difficulty)}`}>
                        {video.difficulty}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <Users className="w-3 h-3" />
                      <span className="truncate">{video.instructor}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {(video.views / 1000).toFixed(1)}K
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {video.likes}
                        </span>
                      </div>
                      <span>{video.datePublished.toLocaleDateString()}</span>
                    </div>

                    {video.resources && video.resources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                          <Download className="w-3 h-3" />
                          <span>{video.resources.length} {t('video.resources') || 'resources'}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVideos.map(video => (
                <Card key={video.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex gap-6">
                    {/* Thumbnail */}
                    <div className="relative w-64 h-36 flex-shrink-0 rounded-lg overflow-hidden" style={{ backgroundColor: video.thumbnail }}>
                      <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center">
                        <PlayCircle className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                        {formatDuration(video.duration)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(video.category)}`}>
                              {video.category}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(video.difficulty)}`}>
                              {video.difficulty}
                            </span>
                            {video.transcript && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                {t('video.transcript') || 'Transcript'}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{video.description}</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0">
                          <Play className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <Users className="w-4 h-4" />
                        <span>{video.instructor}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {(video.views / 1000).toFixed(1)}K {t('video.views') || 'views'}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {video.likes}
                          </span>
                          <span>{video.datePublished.toLocaleDateString()}</span>
                        </div>

                        {video.resources && video.resources.length > 0 && (
                          <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                            <Download className="w-4 h-4" />
                            {video.resources.length} {t('video.resources') || 'resources'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {filteredVideos.length === 0 && (
            <Card className="p-12 text-center">
              <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">{t('video.noResults') || 'No videos match your criteria'}</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                  setDifficultyFilter('all');
                }}
                className="mt-4 text-blue-600 hover:underline"
              >
                {t('common.resetFilters') || 'Reset filters'}
              </button>
            </Card>
          )}
        </>
      )}

      {/* Upcoming Webinars Tab */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {UPCOMING_WEBINARS.map(webinar => (
            <Card key={webinar.id} className="p-6">
              <div className="flex items-start gap-6">
                {/* Date Badge */}
                <div className="flex-shrink-0 w-20 text-center">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg p-3">
                    <div className="text-2xl font-bold">{webinar.date.getDate()}</div>
                    <div className="text-xs">
                      {webinar.date.toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{webinar.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{webinar.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{webinar.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{webinar.duration} {t('common.minutes') || 'min'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{webinar.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>{webinar.registrations}/{webinar.maxCapacity}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      {t('video.register') || 'Register Now'}
                    </button>
                    <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      {t('video.addCalendar') || 'Add to Calendar'}
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Saved Videos Tab */}
      {activeTab === 'saved' && (
        <Card className="p-12 text-center">
          <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">{t('video.noSaved') || 'No saved videos yet'}</p>
          <p className="text-sm text-gray-500">{t('video.saveHint') || 'Bookmark videos to watch them later'}</p>
        </Card>
      )}
    </div>
  );
}