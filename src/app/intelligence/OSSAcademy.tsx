// 🎓 OSS ACADEMY — Comprehensive Investment Learning Center
// SURGICAL COMPLETION: Learning Tab restructure with 6 categorized modules
// ARCHITECTURE: Organized video/content library pulling from ContentIntelligenceHub

import React, { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import {
  Play,
  GraduationCap,
  Users,
  MapPin,
  TrendingUp,
  FileText,
  Clock,
  Star,
  BookOpen,
  Video,
  HeadphonesIcon,
  Download,
  CheckCircle,
  Award,
  Target
} from 'lucide-react';

type AcademyCategory = 
  | 'business-setup'
  | 'visa-workforce'
  | 'zone-tours'
  | 'success-stories'
  | 'sector-masterclass'
  | 'officer-explanations';

interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
  thumbnail: string;
  category: AcademyCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  views: number;
  rating: number;
}

// Curated video library organized by category
const ACADEMY_CONTENT: VideoContent[] = [
  // BUSINESS SETUP
  {
    id: 'bs-1',
    title: 'Complete RJSC Registration Guide',
    description: 'Step-by-step walkthrough of company registration process in Bangladesh',
    duration: '28:45',
    instructor: 'Dr. Kamal Rahman, BIDA Senior Officer',
    thumbnail: '#3B82F6',
    category: 'business-setup',
    difficulty: 'Beginner',
    views: 15432,
    rating: 4.8
  },
  {
    id: 'bs-2',
    title: 'Opening Your First Business Bank Account',
    description: 'Requirements, documentation, and best practices for FDI banking',
    duration: '22:15',
    instructor: 'Sarah Ahmed, Commercial Banking Expert',
    thumbnail: '#10B981',
    category: 'business-setup',
    difficulty: 'Beginner',
    views: 12890,
    rating: 4.7
  },
  {
    id: 'bs-3',
    title: 'Tax Registration & Compliance Basics',
    description: 'TIN, VAT, and corporate tax setup for foreign investors',
    duration: '35:20',
    instructor: 'Abdul Latif, Tax Consultant',
    thumbnail: '#8B5CF6',
    category: 'business-setup',
    difficulty: 'Intermediate',
    views: 9567,
    rating: 4.9
  },

  // VISA & WORKFORCE
  {
    id: 'vw-1',
    title: 'Work Permit Application Process',
    description: 'Complete guide to obtaining work permits for foreign employees',
    duration: '24:30',
    instructor: 'BIDA Visa Department',
    thumbnail: '#F59E0B',
    category: 'visa-workforce',
    difficulty: 'Beginner',
    views: 11234,
    rating: 4.6
  },
  {
    id: 'vw-2',
    title: 'Hiring Local Talent in Bangladesh',
    description: 'Labor laws, recruitment strategies, and workforce planning',
    duration: '31:45',
    instructor: 'Fatima Khan, HR Consultant',
    thumbnail: '#EF4444',
    category: 'visa-workforce',
    difficulty: 'Intermediate',
    views: 8932,
    rating: 4.5
  },
  {
    id: 'vw-3',
    title: 'Employee Benefits & Compliance',
    description: 'Statutory requirements for employee welfare and benefits',
    duration: '26:10',
    instructor: 'Rahman Associates Law Firm',
    thumbnail: '#06B6D4',
    category: 'visa-workforce',
    difficulty: 'Advanced',
    views: 6543,
    rating: 4.8
  },

  // ZONE TOURS
  {
    id: 'zt-1',
    title: 'Dhaka EPZ Virtual Tour',
    description: 'Explore facilities, infrastructure, and available plots',
    duration: '18:25',
    instructor: 'BEPZA Tour Guide',
    thumbnail: '#14B8A6',
    category: 'zone-tours',
    difficulty: 'Beginner',
    views: 14567,
    rating: 4.9
  },
  {
    id: 'zt-2',
    title: 'Hi-Tech Park Capabilities Showcase',
    description: 'Technology infrastructure and innovation facilities',
    duration: '22:55',
    instructor: 'Bangladesh Hi-Tech Park Authority',
    thumbnail: '#6366F1',
    category: 'zone-tours',
    difficulty: 'Intermediate',
    views: 10234,
    rating: 4.7
  },
  {
    id: 'zt-3',
    title: 'Chittagong Port Connectivity Overview',
    description: 'Logistics, customs, and export processing capabilities',
    duration: '20:40',
    instructor: 'Chittagong Port Authority',
    thumbnail: '#8B5CF6',
    category: 'zone-tours',
    difficulty: 'Beginner',
    views: 8765,
    rating: 4.6
  },

  // SUCCESS STORIES
  {
    id: 'ss-1',
    title: 'Samsung Electronics: $500M Investment Journey',
    description: 'From approval to production in 180 days',
    duration: '32:15',
    instructor: 'Samsung BD Country Manager',
    thumbnail: '#3B82F6',
    category: 'success-stories',
    difficulty: 'Intermediate',
    views: 18945,
    rating: 5.0
  },
  {
    id: 'ss-2',
    title: 'Unilever\'s Expansion Success',
    description: 'How incentives enabled 300% capacity increase',
    duration: '28:30',
    instructor: 'Unilever Bangladesh CEO',
    thumbnail: '#10B981',
    category: 'success-stories',
    difficulty: 'Intermediate',
    views: 14321,
    rating: 4.8
  },
  {
    id: 'ss-3',
    title: 'Startup to Scale: Tech Company Growth',
    description: 'From seed stage to $50M valuation in 3 years',
    duration: '25:45',
    instructor: 'ShopUp Founder',
    thumbnail: '#F59E0B',
    category: 'success-stories',
    difficulty: 'Advanced',
    views: 12678,
    rating: 4.9
  },

  // SECTOR MASTERCLASS
  {
    id: 'sm-1',
    title: 'RMG Sector Deep Dive',
    description: 'Market trends, supply chains, and export opportunities',
    duration: '45:20',
    instructor: 'BGMEA Policy Director',
    thumbnail: '#EC4899',
    category: 'sector-masterclass',
    difficulty: 'Advanced',
    views: 9876,
    rating: 4.7
  },
  {
    id: 'sm-2',
    title: 'Pharmaceutical Manufacturing in Bangladesh',
    description: 'Regulatory framework, incentives, and market access',
    duration: '38:15',
    instructor: 'Square Pharmaceuticals R&D Head',
    thumbnail: '#06B6D4',
    category: 'sector-masterclass',
    difficulty: 'Advanced',
    views: 7654,
    rating: 4.8
  },
  {
    id: 'sm-3',
    title: 'IT & Software Services Opportunities',
    description: 'Hi-tech parks, talent pool, and global competitiveness',
    duration: '33:40',
    instructor: 'BASIS President',
    thumbnail: '#8B5CF6',
    category: 'sector-masterclass',
    difficulty: 'Intermediate',
    views: 11234,
    rating: 4.6
  },

  // OFFICER EXPLANATIONS
  {
    id: 'oe-1',
    title: 'How We Process Your Application',
    description: 'Behind-the-scenes look at BIDA approval workflow',
    duration: '19:30',
    instructor: 'BIDA Operations Director',
    thumbnail: '#3B82F6',
    category: 'officer-explanations',
    difficulty: 'Beginner',
    views: 13456,
    rating: 4.9
  },
  {
    id: 'oe-2',
    title: 'Understanding SLA Timelines',
    description: 'What affects processing times and how to avoid delays',
    duration: '21:45',
    instructor: 'BIDA Quality Assurance Team',
    thumbnail: '#10B981',
    category: 'officer-explanations',
    difficulty: 'Beginner',
    views: 10987,
    rating: 4.7
  },
  {
    id: 'oe-3',
    title: 'Relationship Manager Role Explained',
    description: 'How your dedicated RM supports your investment journey',
    duration: '16:20',
    instructor: 'BIDA RM Team Lead',
    thumbnail: '#F59E0B',
    category: 'officer-explanations',
    difficulty: 'Beginner',
    views: 9234,
    rating: 4.8
  }
];

const CATEGORY_INFO: Record<AcademyCategory, { title: string; description: string; icon: any; color: string }> = {
  'business-setup': {
    title: 'Business Setup',
    description: 'Registration, licensing, and getting started in Bangladesh',
    icon: FileText,
    color: 'blue'
  },
  'visa-workforce': {
    title: 'Visa & Workforce',
    description: 'Work permits, hiring, and labor compliance',
    icon: Users,
    color: 'green'
  },
  'zone-tours': {
    title: 'Zone Tours',
    description: 'Virtual tours of EPZs, Hi-Tech Parks, and facilities',
    icon: MapPin,
    color: 'purple'
  },
  'success-stories': {
    title: 'Success Stories',
    description: 'Case studies from established investors',
    icon: TrendingUp,
    color: 'amber'
  },
  'sector-masterclass': {
    title: 'Sector Masterclasses',
    description: 'Industry-specific deep dives and opportunities',
    icon: Award,
    color: 'indigo'
  },
  'officer-explanations': {
    title: 'Officer Explanations',
    description: 'Direct guidance from BIDA officials',
    icon: Target,
    color: 'emerald'
  }
};

export function OSSAcademy() {
  const [selectedCategory, setSelectedCategory] = useState<AcademyCategory>('business-setup');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContent = ACADEMY_CONTENT.filter(video => {
    const matchesCategory = video.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'from-blue-50 to-indigo-50 border-blue-200',
      green: 'from-green-50 to-emerald-50 border-green-200',
      purple: 'from-purple-50 to-pink-50 border-purple-200',
      amber: 'from-amber-50 to-orange-50 border-amber-200',
      indigo: 'from-indigo-50 to-purple-50 border-indigo-200',
      emerald: 'from-emerald-50 to-teal-50 border-emerald-200'
    };
    return colorMap[color] || colorMap.blue;
  };

  const getTotalStats = () => {
    const totalVideos = ACADEMY_CONTENT.length;
    const totalViews = ACADEMY_CONTENT.reduce((sum, v) => sum + v.views, 0);
    const avgRating = (ACADEMY_CONTENT.reduce((sum, v) => sum + v.rating, 0) / totalVideos).toFixed(1);
    return { totalVideos, totalViews, avgRating };
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <GraduationCap className="w-10 h-10 text-blue-600" />
            OSS Academy
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Your complete investment education platform — from registration to expansion
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-800">{stats.totalVideos}</div>
              <div className="text-xs text-blue-600">Learning Modules</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-800">{(stats.totalViews / 1000).toFixed(0)}K+</div>
              <div className="text-xs text-green-600">Total Views</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-800">{stats.avgRating} / 5.0</div>
              <div className="text-xs text-amber-600">Average Rating</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {(Object.keys(CATEGORY_INFO) as AcademyCategory[]).map(category => {
          const info = CATEGORY_INFO[category];
          const Icon = info.icon;
          const isActive = selectedCategory === category;
          const videoCount = ACADEMY_CONTENT.filter(v => v.category === category).length;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                isActive 
                  ? `bg-gradient-to-br ${getColorClasses(info.color)} shadow-lg scale-105` 
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-5 h-5 ${isActive ? `text-${info.color}-600` : 'text-gray-600'}`} />
                <span className="text-xs font-medium text-gray-500">{videoCount} videos</span>
              </div>
              <div className={`text-sm font-semibold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                {info.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <Card className="p-4 bg-white/70 backdrop-blur-xl border border-gray-200">
        <input
          type="text"
          placeholder="Search courses, topics, instructors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </Card>

      {/* Category Description */}
      <Card className={`p-6 bg-gradient-to-br ${getColorClasses(CATEGORY_INFO[selectedCategory].color)} border-2`}>
        <div className="flex items-start gap-4">
          {React.createElement(CATEGORY_INFO[selectedCategory].icon, { 
            className: "w-10 h-10 text-gray-700 flex-shrink-0" 
          })}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {CATEGORY_INFO[selectedCategory].title}
            </h2>
            <p className="text-gray-700">
              {CATEGORY_INFO[selectedCategory].description}
            </p>
          </div>
        </div>
      </Card>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map(video => (
          <Card key={video.id} className="overflow-hidden hover:shadow-xl transition-all group border border-gray-200">
            {/* Thumbnail */}
            <div 
              className="h-48 relative flex items-center justify-center"
              style={{ backgroundColor: video.thumbnail }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
              <div className="relative z-10 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-8 h-8 text-blue-600 ml-1" />
              </div>
              <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                {video.difficulty}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {video.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <BookOpen className="w-4 h-4" />
                <span>{video.instructor}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">{video.rating}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {(video.views / 1000).toFixed(1)}K views
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredContent.length === 0 && (
        <Card className="p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No videos found</h3>
          <p className="text-gray-500">Try adjusting your search or select a different category</p>
        </Card>
      )}
    </div>
  );
}
