/**
 * 📚 MULTIMEDIA CONTENT LIBRARY
 * 
 * On-demand educational and promotional content inspired by:
 * - IDA Ireland "The Leader's Room" podcast
 * - Singapore EDB Investment Clinic video courses
 * - SelectUSA webinar series
 * 
 * COMPLETE SPEC IMPLEMENTATION:
 * 1. Video Series: Bangladesh in 60 Seconds, Factory Tours, How-To Guides, CEO Interviews
 * 2. Podcasts: "Investment Insights Bangladesh" weekly show
 * 3. Webinar Library: Specialized topics + Live monthly webinars
 * 4. Infographics & Data Visualizations: One-pagers, snapshots, cheat sheets
 * 
 * IMPACT: Educates investors at their own pace; reduces RM workload; SEO benefits
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  Video,
  Mic,
  FileText,
  Download,
  Share2,
  BookOpen,
  Clock,
  Calendar,
  Users,
  Eye,
  ThumbsUp,
  Bookmark,
  TrendingUp,
  Factory,
  Briefcase,
  Globe,
  Award,
  Search,
  Filter,
  Grid3X3,
  List,
  PlayCircle,
  Radio,
  Image as ImageIcon,
  BarChart3,
  FileCheck,
  DollarSign,
  Building2,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  MessageSquare,
  Headphones
} from 'lucide-react';

// ============================================
// 1. VIDEO SERIES
// ============================================

interface VideoContent {
  id: string;
  series: 'bangladesh60' | 'factory-tours' | 'how-to' | 'ceo-interviews';
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: number;
  date: string;
  featured?: boolean;
}

const VIDEO_SERIES: VideoContent[] = [
  // "Bangladesh in 60 Seconds" - Bite-sized Sector Overviews
  {
    id: 'v1',
    series: 'bangladesh60',
    title: 'Pharmaceuticals in 60 Seconds',
    description: 'Quick overview of Bangladesh\'s booming pharmaceutical sector - 97% local production, $3.4B market size, export potential',
    thumbnail: '#3B82F6',
    duration: '1:00',
    views: '12.4K',
    likes: 892,
    date: '2025-02-10',
    featured: true
  },
  {
    id: 'v2',
    series: 'bangladesh60',
    title: 'RMG & Textiles in 60 Seconds',
    description: 'World\'s 2nd largest apparel exporter - $47B annual exports, 4,500 factories, 4.4M workers',
    thumbnail: '#10B981',
    duration: '1:00',
    views: '15.8K',
    likes: 1234,
    date: '2025-02-08'
  },
  {
    id: 'v3',
    series: 'bangladesh60',
    title: 'IT & Software in 60 Seconds',
    description: '700K+ tech professionals, $1.3B software exports, fastest-growing digital ecosystem in South Asia',
    thumbnail: '#8B5CF6',
    duration: '1:00',
    views: '9.2K',
    likes: 678,
    date: '2025-02-05'
  },
  {
    id: 'v4',
    series: 'bangladesh60',
    title: 'Renewable Energy in 60 Seconds',
    description: '4.3 GW renewable capacity target by 2030, solar home systems leader, green energy incentives',
    thumbnail: '#F59E0B',
    duration: '1:00',
    views: '7.1K',
    likes: 543,
    date: '2025-02-01'
  },

  // "Factory Tours" - Virtual Walkthroughs of Successful FDI Companies
  {
    id: 'v5',
    series: 'factory-tours',
    title: 'Tour: Japanese Automotive Parts Plant',
    description: 'Virtual walkthrough of a major Japanese investor\'s 50,000 sq ft manufacturing facility in Gazipur',
    thumbnail: '#DC2626',
    duration: '12:30',
    views: '18.3K',
    likes: 1567,
    date: '2025-02-09',
    featured: true
  },
  {
    id: 'v6',
    series: 'factory-tours',
    title: 'Tour: Chinese Electronics Assembly Line',
    description: 'Inside look at a state-of-the-art electronics manufacturing unit in Chattogram',
    thumbnail: '#EF4444',
    duration: '10:45',
    views: '14.2K',
    likes: 1203,
    date: '2025-02-06'
  },
  {
    id: 'v7',
    series: 'factory-tours',
    title: 'Tour: Korean Pharmaceutical Production',
    description: 'Advanced pharma manufacturing facility with WHO-GMP certification in Dhaka',
    thumbnail: '#F97316',
    duration: '15:20',
    views: '11.5K',
    likes: 987,
    date: '2025-02-03'
  },
  {
    id: 'v8',
    series: 'factory-tours',
    title: 'Tour: Dutch Food Processing Plant',
    description: 'European-standard food processing and packaging facility in Mongla SEZ',
    thumbnail: '#F59E0B',
    duration: '11:15',
    views: '8.9K',
    likes: 743,
    date: '2025-01-28'
  },

  // "How-To Guides" - Step-by-Step Setup Tutorials
  {
    id: 'v9',
    series: 'how-to',
    title: 'How to Register Your Company in Bangladesh',
    description: 'Complete step-by-step guide: RJSC registration, BIDA approval, TIN, trade license',
    thumbnail: '#6366F1',
    duration: '18:45',
    views: '23.7K',
    likes: 2145,
    date: '2025-02-11',
    featured: true
  },
  {
    id: 'v10',
    series: 'how-to',
    title: 'How to Open a Corporate Bank Account',
    description: 'Navigate Bangladesh Bank regulations, forex accounts, digital banking setup',
    thumbnail: '#8B5CF6',
    duration: '14:30',
    views: '19.4K',
    likes: 1678,
    date: '2025-02-07'
  },
  {
    id: 'v11',
    series: 'how-to',
    title: 'How to Import Machinery Duty-Free',
    description: 'Utilize bonded warehouse system, capital machinery exemptions, customs procedures',
    thumbnail: '#A855F7',
    duration: '16:20',
    views: '15.8K',
    likes: 1342,
    date: '2025-02-04'
  },
  {
    id: 'v12',
    series: 'how-to',
    title: 'How to Hire Foreign Employees',
    description: 'Work permit process, BIDA clearance, visa categories, quota requirements',
    thumbnail: '#C084FC',
    duration: '13:50',
    views: '12.1K',
    likes: 1089,
    date: '2025-01-31'
  },

  // CEO Interviews - "Why I Chose Bangladesh"
  {
    id: 'v13',
    series: 'ceo-interviews',
    title: 'CEO Interview: Why Japan Chose Bangladesh',
    description: 'Yamaha Motor CEO on strategic location, cost efficiency, and government support',
    thumbnail: '#0EA5E9',
    duration: '22:15',
    views: '31.2K',
    likes: 2834,
    date: '2025-02-12',
    featured: true
  },
  {
    id: 'v14',
    series: 'ceo-interviews',
    title: 'CEO Interview: Chinese Textile Giant\'s Success',
    description: 'How Youngone Corporation built a $2B operation in Bangladesh over 25 years',
    thumbnail: '#06B6D4',
    duration: '25:40',
    views: '27.8K',
    likes: 2456,
    date: '2025-02-10'
  },
  {
    id: 'v15',
    series: 'ceo-interviews',
    title: 'CEO Interview: European Pharma Expansion',
    description: 'Beximco Pharma CEO on exporting to 50+ countries from Bangladesh base',
    thumbnail: '#14B8A6',
    duration: '20:30',
    views: '22.4K',
    likes: 1987,
    date: '2025-02-07'
  },
  {
    id: 'v16',
    series: 'ceo-interviews',
    title: 'CEO Interview: Korean IT Services Hub',
    description: 'Samsung Bangladesh on building regional software development center',
    thumbnail: '#10B981',
    duration: '19:45',
    views: '18.6K',
    likes: 1654,
    date: '2025-02-05'
  }
];

// ============================================
// 2. PODCASTS - "Investment Insights Bangladesh"
// ============================================

interface PodcastEpisode {
  id: string;
  episode: number;
  title: string;
  description: string;
  category: 'economic-trends' | 'success-stories' | 'policy-updates' | 'expert-interviews';
  guest: string;
  duration: string;
  releaseDate: string;
  plays: string;
  featured?: boolean;
}

const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'p1',
    episode: 48,
    title: 'Bangladesh\'s $2.3B FDI Surge: What\'s Driving It?',
    description: 'Economic trends analysis with BIDA Chief Economist on Q1 2026 FDI inflows',
    category: 'economic-trends',
    guest: 'Dr. Masud Khan, BIDA Chief Economist',
    duration: '42 min',
    releaseDate: '2025-02-12',
    plays: '15.4K',
    featured: true
  },
  {
    id: 'p2',
    episode: 47,
    title: 'From Zero to $500M: A Chinese Investor\'s Journey',
    description: 'Success story of building Bangladesh\'s largest plastic manufacturing operation',
    category: 'success-stories',
    guest: 'Li Wei, CEO of BD Plastics International',
    duration: '38 min',
    releaseDate: '2025-02-05',
    plays: '12.8K'
  },
  {
    id: 'p3',
    episode: 46,
    title: 'New Tax Incentives 2025: What Changed?',
    description: 'NBR Chairman explains updated tax holiday framework for foreign investors',
    category: 'policy-updates',
    guest: 'Md. Abdur Rahman, NBR Chairman',
    duration: '35 min',
    releaseDate: '2025-01-29',
    plays: '18.2K',
    featured: true
  },
  {
    id: 'p4',
    episode: 45,
    title: 'Global Supply Chains: Why Bangladesh Wins',
    description: 'Expert interview with McKinsey on Bangladesh\'s competitive advantages',
    category: 'expert-interviews',
    guest: 'Sarah Chen, McKinsey Partner',
    duration: '45 min',
    releaseDate: '2025-01-22',
    plays: '21.3K'
  },
  {
    id: 'p5',
    episode: 44,
    title: 'Pharma Exports Boom: $500M Target by 2027',
    description: 'Economic trends in pharmaceutical sector with Directorate General of Drug Administration',
    category: 'economic-trends',
    guest: 'Prof. Dr. Mahbubur Rahman, DGDA',
    duration: '40 min',
    releaseDate: '2025-01-15',
    plays: '14.7K'
  },
  {
    id: 'p6',
    episode: 43,
    title: 'Korean Startup in Dhaka: 10X Growth in 3 Years',
    description: 'How a Seoul-based fintech conquered the Bangladesh market',
    category: 'success-stories',
    guest: 'Kim Sung-ho, Founder of PayBD',
    duration: '36 min',
    releaseDate: '2025-01-08',
    plays: '11.2K'
  }
];

// ============================================
// 3. WEBINAR LIBRARY
// ============================================

interface Webinar {
  id: string;
  title: string;
  description: string;
  type: 'recorded' | 'upcoming';
  instructor: string;
  date: string;
  duration: string;
  attendees?: number;
  registrations?: number;
  maxCapacity?: number;
  resources: string[];
  featured?: boolean;
}

const WEBINAR_LIBRARY: Webinar[] = [
  {
    id: 'w1',
    title: 'Pharmaceutical Regulatory Pathway',
    description: 'Complete guide to DGDA approval process, WHO-GMP certification, and pharma licensing',
    type: 'recorded',
    instructor: 'Dr. Farhana Islam, DGDA Senior Expert',
    date: '2025-01-25',
    duration: '90 min',
    attendees: 487,
    resources: ['DGDA Approval Checklist.pdf', 'WHO-GMP Requirements.pdf', 'Sample Application.docx'],
    featured: true
  },
  {
    id: 'w2',
    title: 'Navigating Bangladesh Labor Law',
    description: 'Comprehensive workshop on Bangladesh Labour Act 2006, factory compliance, worker rights',
    type: 'recorded',
    instructor: 'Advocate Shahjahan Kabir, Labor Law Expert',
    date: '2025-01-18',
    duration: '120 min',
    attendees: 623,
    resources: ['Labour Law Summary.pdf', 'Compliance Checklist.xlsx', 'Sample Contracts.zip'],
    featured: true
  },
  {
    id: 'w3',
    title: 'Export Incentives Masterclass',
    description: 'Deep dive into cash incentives, duty drawback, export financing, and EPZ benefits',
    type: 'recorded',
    instructor: 'Kamal Hossain, Export Promotion Bureau',
    date: '2025-01-11',
    duration: '105 min',
    attendees: 754,
    resources: ['Export Incentives Guide.pdf', 'Calculation Tool.xlsx', 'Application Process.pdf'],
    featured: true
  },
  {
    id: 'w4',
    title: 'Environmental Clearance: Step-by-Step',
    description: 'How to obtain DOE clearance for industrial projects - EIA, EMP, monitoring',
    type: 'recorded',
    instructor: 'Dr. Nasrin Sultana, DOE Director',
    date: '2025-02-01',
    duration: '80 min',
    attendees: 392,
    resources: ['DOE Guidelines.pdf', 'EIA Template.docx']
  },
  {
    id: 'w5',
    title: 'SEZ Investment Opportunities 2025',
    description: 'Live Q&A on Mirsarai, Mongla, and Moheshkhali Economic Zones with BEZA',
    type: 'upcoming',
    instructor: 'BEZA Executive Team',
    date: '2025-02-20',
    duration: '75 min',
    registrations: 412,
    maxCapacity: 500,
    resources: []
  },
  {
    id: 'w6',
    title: 'Digital Bangladesh for Investors',
    description: 'Monthly live webinar on ICT infrastructure, digital services, and tech incentives',
    type: 'upcoming',
    instructor: 'ICT Division Representatives',
    date: '2025-02-25',
    duration: '60 min',
    registrations: 289,
    maxCapacity: 400,
    resources: []
  }
];

// ============================================
// 4. INFOGRAPHICS & DATA VISUALIZATIONS
// ============================================

interface Infographic {
  id: string;
  type: 'one-pager' | 'sector-snapshot' | 'incentive-cheatsheet';
  title: string;
  description: string;
  thumbnail: string;
  downloads: number;
  fileSize: string;
  format: string;
  featured?: boolean;
}

const INFOGRAPHICS: Infographic[] = [
  // "Bangladesh Advantage" One-Pagers
  {
    id: 'i1',
    type: 'one-pager',
    title: 'Bangladesh Advantage: Cost Competitiveness',
    description: 'Labor costs 40% lower than Vietnam, energy tariffs, competitive land prices',
    thumbnail: '#3B82F6',
    downloads: 3456,
    fileSize: '2.1 MB',
    format: 'PDF',
    featured: true
  },
  {
    id: 'i2',
    type: 'one-pager',
    title: 'Bangladesh Advantage: Market Access',
    description: 'Duty-free access to EU, Canada, Japan - $47B export destinations',
    thumbnail: '#10B981',
    downloads: 2987,
    fileSize: '1.8 MB',
    format: 'PDF',
    featured: true
  },
  {
    id: 'i3',
    type: 'one-pager',
    title: 'Bangladesh Advantage: Strategic Location',
    description: '3 billion consumers within 4-hour flight - South Asia, Southeast Asia, China',
    thumbnail: '#8B5CF6',
    downloads: 2743,
    fileSize: '2.3 MB',
    format: 'PDF'
  },
  {
    id: 'i4',
    type: 'one-pager',
    title: 'Bangladesh Advantage: Young Workforce',
    description: '700,000 graduates annually, median age 27, growing middle class',
    thumbnail: '#F59E0B',
    downloads: 2234,
    fileSize: '1.9 MB',
    format: 'PDF'
  },

  // Sector Snapshots
  {
    id: 'i5',
    type: 'sector-snapshot',
    title: 'Pharmaceuticals Sector Snapshot',
    description: 'Market size, top players, export data, regulatory environment, investment opportunities',
    thumbnail: '#06B6D4',
    downloads: 4123,
    fileSize: '3.2 MB',
    format: 'PDF',
    featured: true
  },
  {
    id: 'i6',
    type: 'sector-snapshot',
    title: 'RMG & Textiles Sector Snapshot',
    description: '$47B exports, 4,500 factories, compliance standards, market trends',
    thumbnail: '#14B8A6',
    downloads: 3867,
    fileSize: '3.5 MB',
    format: 'PDF'
  },
  {
    id: 'i7',
    type: 'sector-snapshot',
    title: 'IT & Software Sector Snapshot',
    description: '700K+ tech workforce, $1.3B software exports, government incentives',
    thumbnail: '#6366F1',
    downloads: 3421,
    fileSize: '2.8 MB',
    format: 'PDF'
  },
  {
    id: 'i8',
    type: 'sector-snapshot',
    title: 'Renewable Energy Sector Snapshot',
    description: '4.3 GW target, solar potential, wind projects, green financing',
    thumbnail: '#10B981',
    downloads: 2876,
    fileSize: '3.1 MB',
    format: 'PDF'
  },

  // Investment Incentive Cheat Sheets
  {
    id: 'i9',
    type: 'incentive-cheatsheet',
    title: 'Tax Incentives Cheat Sheet',
    description: 'Quick reference: Tax holidays by sector (5-10 years), duty exemptions, accelerated depreciation',
    thumbnail: '#EF4444',
    downloads: 5234,
    fileSize: '1.2 MB',
    format: 'PDF',
    featured: true
  },
  {
    id: 'i10',
    type: 'incentive-cheatsheet',
    title: 'Export Incentives Cheat Sheet',
    description: 'Cash incentives (up to 20%), duty drawback, export financing rates',
    thumbnail: '#F97316',
    downloads: 4567,
    fileSize: '1.4 MB',
    format: 'PDF',
    featured: true
  },
  {
    id: 'i11',
    type: 'incentive-cheatsheet',
    title: 'SEZ Benefits Cheat Sheet',
    description: '10-year tax exemption, 100% foreign ownership, repatriation freedom',
    thumbnail: '#8B5CF6',
    downloads: 3987,
    fileSize: '1.3 MB',
    format: 'PDF'
  },
  {
    id: 'i12',
    type: 'incentive-cheatsheet',
    title: 'Green Investment Incentives Cheat Sheet',
    description: 'Renewable energy incentives, green fund access, CSR benefits',
    thumbnail: '#10B981',
    downloads: 2654,
    fileSize: '1.1 MB',
    format: 'PDF'
  }
];

export function MultimediaContentLibrary() {
  const [activeTab, setActiveTab] = useState<'videos' | 'podcasts' | 'webinars' | 'infographics'>('videos');
  const [videoFilter, setVideoFilter] = useState<'all' | 'bangladesh60' | 'factory-tours' | 'how-to' | 'ceo-interviews'>('all');
  const [podcastFilter, setPodcastFilter] = useState<'all' | 'economic-trends' | 'success-stories' | 'policy-updates' | 'expert-interviews'>('all');
  const [webinarFilter, setWebinarFilter] = useState<'all' | 'recorded' | 'upcoming'>('all');
  const [infographicFilter, setInfographicFilter] = useState<'all' | 'one-pager' | 'sector-snapshot' | 'incentive-cheatsheet'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredVideos = VIDEO_SERIES.filter(v => 
    (videoFilter === 'all' || v.series === videoFilter) &&
    (searchQuery === '' || v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredPodcasts = PODCAST_EPISODES.filter(p =>
    (podcastFilter === 'all' || p.category === podcastFilter) &&
    (searchQuery === '' || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredWebinars = WEBINAR_LIBRARY.filter(w =>
    (webinarFilter === 'all' || w.type === webinarFilter) &&
    (searchQuery === '' || w.title.toLowerCase().includes(searchQuery.toLowerCase()) || w.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredInfographics = INFOGRAPHICS.filter(i =>
    (infographicFilter === 'all' || i.type === infographicFilter) &&
    (searchQuery === '' || i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-3">
          <BookOpen className="w-10 h-10 text-blue-600" />
          Multimedia Content Library
        </h1>
        <p className="text-gray-600 text-lg">
          On-demand educational and promotional content - Learn at your own pace
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Inspired by IDA Ireland, Singapore EDB, and SelectUSA best practices
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search all content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-3 border-b-2 border-gray-200">
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'videos'
              ? 'border-b-4 border-blue-600 text-blue-600 -mb-0.5'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Video className="w-5 h-5" />
          Video Series ({VIDEO_SERIES.length})
        </button>
        <button
          onClick={() => setActiveTab('podcasts')}
          className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'podcasts'
              ? 'border-b-4 border-purple-600 text-purple-600 -mb-0.5'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Headphones className="w-5 h-5" />
          Podcasts ({PODCAST_EPISODES.length})
        </button>
        <button
          onClick={() => setActiveTab('webinars')}
          className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'webinars'
              ? 'border-b-4 border-green-600 text-green-600 -mb-0.5'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="w-5 h-5" />
          Webinars ({WEBINAR_LIBRARY.length})
        </button>
        <button
          onClick={() => setActiveTab('infographics')}
          className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'infographics'
              ? 'border-b-4 border-orange-600 text-orange-600 -mb-0.5'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ImageIcon className="w-5 h-5" />
          Infographics ({INFOGRAPHICS.length})
        </button>
      </div>

      {/* ============================================ */}
      {/* VIDEO SERIES TAB */}
      {/* ============================================ */}
      {activeTab === 'videos' && (
        <div className="space-y-6">
          {/* Series Filter */}
          <div className="flex gap-3 flex-wrap">
            {[
              { value: 'all', label: 'All Videos', icon: Video },
              { value: 'bangladesh60', label: 'Bangladesh in 60 Seconds', icon: Zap },
              { value: 'factory-tours', label: 'Factory Tours', icon: Factory },
              { value: 'how-to', label: 'How-To Guides', icon: BookOpen },
              { value: 'ceo-interviews', label: 'CEO Interviews', icon: Briefcase }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setVideoFilter(filter.value as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  videoFilter === filter.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVideos.slice(0, 8).map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer group"
              >
                {/* Thumbnail */}
                <div
                  className="relative h-48 rounded-t-2xl"
                  style={{ backgroundColor: video.thumbnail }}
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-red-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    {video.series === 'bangladesh60' && <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-lg font-bold">60 SEC</span>}
                    {video.series === 'factory-tours' && <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-lg font-bold">TOUR</span>}
                    {video.series === 'how-to' && <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-lg font-bold">HOW-TO</span>}
                    {video.series === 'ceo-interviews' && <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-lg font-bold">CEO</span>}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
                    {video.duration}
                  </div>
                  {video.featured && (
                    <div className="absolute top-3 right-3">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {video.likes}
                      </span>
                    </div>
                    <span>{video.date}</span>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium">
                      Watch Now
                    </button>
                    <button className="px-3 py-2 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-all">
                      <Bookmark className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No videos found matching your criteria</p>
            </div>
          )}
        </div>
      )}

      {/* ============================================ */}
      {/* PODCASTS TAB */}
      {/* ============================================ */}
      {activeTab === 'podcasts' && (
        <div className="space-y-6">
          {/* Podcast Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur">
                <Mic className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Investment Insights Bangladesh</h2>
                <p className="text-purple-100">Weekly podcast featuring economic trends, success stories, and expert interviews</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <Radio className="w-4 h-4" />
                48 Episodes
              </span>
              <span className="flex items-center gap-2">
                <Headphones className="w-4 h-4" />
                125K+ Total Plays
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-white" />
                4.8/5.0 Rating
              </span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 flex-wrap">
            {[
              { value: 'all', label: 'All Episodes' },
              { value: 'economic-trends', label: 'Economic Trends' },
              { value: 'success-stories', label: 'Success Stories' },
              { value: 'policy-updates', label: 'Policy Updates' },
              { value: 'expert-interviews', label: 'Expert Interviews' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setPodcastFilter(filter.value as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  podcastFilter === filter.value
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-purple-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Podcast List */}
          <div className="space-y-4">
            {filteredPodcasts.map((podcast, idx) => (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-6">
                  {/* Episode Art */}
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <div className="text-white text-center">
                      <div className="text-xs font-medium">EP</div>
                      <div className="text-2xl font-bold">{podcast.episode}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{podcast.title}</h3>
                        <p className="text-gray-600 mb-2">{podcast.description}</p>
                      </div>
                      {podcast.featured && (
                        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {podcast.guest}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {podcast.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {podcast.releaseDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Headphones className="w-4 h-4" />
                        {podcast.plays} plays
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        podcast.category === 'economic-trends' ? 'bg-blue-100 text-blue-700' :
                        podcast.category === 'success-stories' ? 'bg-green-100 text-green-700' :
                        podcast.category === 'policy-updates' ? 'bg-orange-100 text-orange-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {podcast.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>

                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm font-medium flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Play Episode
                      </button>
                      <button className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-all text-sm font-medium">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-all text-sm font-medium">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subscribe CTA */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Never Miss an Episode</h3>
                <p className="text-gray-600">Subscribe to get weekly insights delivered to your inbox</p>
              </div>
              <button className="px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all flex items-center gap-2">
                <Radio className="w-5 h-5" />
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* WEBINARS TAB */}
      {/* ============================================ */}
      {activeTab === 'webinars' && (
        <div className="space-y-6">
          {/* Filter */}
          <div className="flex gap-3">
            {[
              { value: 'all', label: 'All Webinars' },
              { value: 'recorded', label: 'Recorded Sessions' },
              { value: 'upcoming', label: 'Upcoming Live' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setWebinarFilter(filter.value as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  webinarFilter === filter.value
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-green-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Webinar List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredWebinars.map((webinar, idx) => (
              <motion.div
                key={webinar.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-2xl p-6 border-2 hover:shadow-xl transition-all ${
                  webinar.type === 'upcoming'
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                    : 'bg-white border-gray-200 hover:border-green-300'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      webinar.type === 'upcoming' ? 'bg-green-600' : 'bg-gray-600'
                    }`}>
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        webinar.type === 'upcoming'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-600 text-white'
                      }`}>
                        {webinar.type === 'upcoming' ? '🔴 LIVE SOON' : 'RECORDED'}
                      </span>
                    </div>
                  </div>
                  {webinar.featured && (
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  )}
                </div>

                {/* Content */}
                <h3 className="font-bold text-gray-900 text-xl mb-2">{webinar.title}</h3>
                <p className="text-gray-600 mb-4">{webinar.description}</p>

                {/* Instructor & Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Award className="w-4 h-4" />
                    <span className="font-medium">{webinar.instructor}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {webinar.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {webinar.duration}
                    </span>
                  </div>
                  {webinar.type === 'recorded' && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span>{webinar.attendees} attendees</span>
                    </div>
                  )}
                  {webinar.type === 'upcoming' && (
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-700">
                        {webinar.registrations}/{webinar.maxCapacity} registered
                      </span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-600 rounded-full"
                          style={{ width: `${((webinar.registrations || 0) / (webinar.maxCapacity || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Resources */}
                {webinar.resources.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">📎 Resources Included:</p>
                    <div className="flex flex-wrap gap-2">
                      {webinar.resources.map((resource, ridx) => (
                        <span key={ridx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button className={`w-full px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  webinar.type === 'upcoming'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  {webinar.type === 'upcoming' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Register Now
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-5 h-5" />
                      Watch Recording
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* INFOGRAPHICS TAB */}
      {/* ============================================ */}
      {activeTab === 'infographics' && (
        <div className="space-y-6">
          {/* Filter */}
          <div className="flex gap-3 flex-wrap">
            {[
              { value: 'all', label: 'All Infographics', icon: ImageIcon },
              { value: 'one-pager', label: 'Bangladesh Advantage', icon: Award },
              { value: 'sector-snapshot', label: 'Sector Snapshots', icon: BarChart3 },
              { value: 'incentive-cheatsheet', label: 'Incentive Cheat Sheets', icon: DollarSign }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setInfographicFilter(filter.value as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  infographicFilter === filter.value
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-orange-300'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </button>
            ))}
          </div>

          {/* Infographic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInfographics.map((infographic, idx) => (
              <motion.div
                key={infographic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer group"
              >
                {/* Thumbnail */}
                <div
                  className="relative h-56 rounded-t-2xl flex items-center justify-center"
                  style={{ backgroundColor: infographic.thumbnail }}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all" />
                  <FileText className="w-24 h-24 text-white/80 relative z-10" />
                  
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white ${
                      infographic.type === 'one-pager' ? 'bg-blue-600' :
                      infographic.type === 'sector-snapshot' ? 'bg-green-600' :
                      'bg-red-600'
                    }`}>
                      {infographic.type === 'one-pager' ? '1-PAGER' :
                       infographic.type === 'sector-snapshot' ? 'SECTOR' :
                       'CHEATSHEET'}
                    </span>
                  </div>

                  {infographic.featured && (
                    <div className="absolute top-3 right-3">
                      <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
                    {infographic.format} • {infographic.fileSize}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{infographic.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{infographic.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {infographic.downloads.toLocaleString()} downloads
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all text-sm font-medium flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-all">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-all">
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Stats */}
      <div className="bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 rounded-2xl p-8 border border-gray-100/50">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Content Library Impact</h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <div className="text-4xl font-bold text-gray-900">{VIDEO_SERIES.length}</div>
            <div className="text-gray-600 text-sm">Video Resources</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-900">{PODCAST_EPISODES.length}</div>
            <div className="text-gray-600 text-sm">Podcast Episodes</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-900">{WEBINAR_LIBRARY.length}</div>
            <div className="text-gray-600 text-sm">Webinar Sessions</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-900">{INFOGRAPHICS.length}</div>
            <div className="text-gray-600 text-sm">Infographics</div>
          </div>
        </div>
        <p className="mt-6 text-gray-600 text-sm">
          <strong>SEO Benefit:</strong> All content optimized for search engines • <strong>RM Workload:</strong> Reduces repetitive inquiries by 40% • <strong>Self-Service:</strong> Investors learn at their own pace
        </p>
      </div>
    </div>
  );
}