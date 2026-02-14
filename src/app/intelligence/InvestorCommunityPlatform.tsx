/**
 * 🤝 INVESTOR COMMUNITY PLATFORM
 * 
 * Private networking space for existing and prospective investors
 * BREAKTHROUGH: No other IPA has an active investor community - they only have static directories
 * 
 * INSPIRATION:
 * - LinkedIn Groups
 * - Reddit communities
 * 
 * FEATURES:
 * 1. Discussion Forums (by sector) - Moderated by BIDA staff
 * 2. Mentorship Program - Established investors guide newcomers
 * 3. Events Calendar - Meetups, roundtables, site visits
 * 4. Success Story Sharing - Like/comment/celebrate feature
 * 5. Job Board - FDI companies post openings, Bangladeshi talent applies
 * 
 * IMPACT: Network effects (investors attract other investors); peer validation > government marketing
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MessageSquare,
  Users,
  Calendar,
  Trophy,
  Briefcase,
  ThumbsUp,
  MessageCircle,
  Share2,
  Award,
  UserPlus,
  MapPin,
  Clock,
  TrendingUp,
  CheckCircle,
  Star,
  Heart,
  Eye,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Factory,
  Building2,
  Zap,
  Globe,
  Mail,
  ExternalLink,
  Sparkles,
  Target,
  ShieldCheck,
  BadgeCheck
} from 'lucide-react';

// ============================================
// 1. DISCUSSION FORUMS
// ============================================

interface ForumPost {
  id: string;
  forum: 'rmg' | 'pharma' | 'it-software' | 'food-bev' | 'energy';
  author: string;
  authorCompany: string;
  authorCountry: string;
  title: string;
  excerpt: string;
  replies: number;
  views: number;
  likes: number;
  timestamp: string;
  tags: string[];
  pinned?: boolean;
  moderated?: boolean;
}

const FORUM_POSTS: ForumPost[] = [
  {
    id: 'f1',
    forum: 'rmg',
    author: 'Li Wei',
    authorCompany: 'Youngone Corporation',
    authorCountry: 'China',
    title: 'RMG Compliance Standards: What You Need to Know in 2025',
    excerpt: 'After 10 years operating in Bangladesh, here\'s my comprehensive guide to staying compliant with international labor standards...',
    replies: 34,
    views: 1289,
    likes: 87,
    timestamp: '2 hours ago',
    tags: ['Compliance', 'Labor Law', 'Best Practices'],
    pinned: true,
    moderated: true
  },
  {
    id: 'f2',
    forum: 'pharma',
    author: 'Dr. Sarah Johnson',
    authorCompany: 'GlaxoSmithKline Bangladesh',
    authorCountry: 'UK',
    title: 'DGDA Approval Process: My Experience & Timeline',
    excerpt: 'Just received WHO-GMP certification after 8 months. Here\'s a detailed breakdown of the approval process and documentation requirements...',
    replies: 28,
    views: 976,
    likes: 63,
    timestamp: '5 hours ago',
    tags: ['DGDA', 'Regulatory', 'WHO-GMP'],
    moderated: true
  },
  {
    id: 'f3',
    forum: 'it-software',
    author: 'Raj Patel',
    authorCompany: 'Tech Solutions BD',
    authorCountry: 'India',
    title: 'Hiring Software Engineers in Dhaka: Salary Expectations?',
    excerpt: 'Planning to open a dev center with 50 engineers. What\'s the market rate for senior developers in Bangladesh?',
    replies: 42,
    views: 1567,
    likes: 91,
    timestamp: '1 day ago',
    tags: ['Hiring', 'IT Sector', 'Salaries']
  },
  {
    id: 'f4',
    forum: 'pharma',
    author: 'Kim Sung-ho',
    authorCompany: 'Korea Pharma Co.',
    authorCountry: 'South Korea',
    title: 'Export Opportunities: Which Markets to Target First?',
    excerpt: 'We\'re exporting generic drugs from Bangladesh. Europe? Africa? Middle East? What\'s worked for you?',
    replies: 19,
    views: 734,
    likes: 45,
    timestamp: '2 days ago',
    tags: ['Export', 'Market Entry', 'Strategy']
  },
  {
    id: 'f5',
    forum: 'energy',
    author: 'Hans Mueller',
    authorCompany: 'Solar Energy Systems',
    authorCountry: 'Germany',
    title: 'Land Acquisition for Solar Projects: Process & Timeline',
    excerpt: 'Looking to set up 50MW solar farm. Any advice on land leasing and DOE clearances?',
    replies: 15,
    views: 542,
    likes: 32,
    timestamp: '3 days ago',
    tags: ['Renewable Energy', 'Land', 'DOE']
  },
  {
    id: 'f6',
    forum: 'food-bev',
    author: 'Maria Garcia',
    authorCompany: 'FoodCorp International',
    authorCountry: 'Spain',
    title: 'BSTI Certification: Food Safety Standards',
    excerpt: 'Starting a food processing plant in Mongla SEZ. What are the BSTI requirements for export-quality products?',
    replies: 11,
    views: 438,
    likes: 27,
    timestamp: '4 days ago',
    tags: ['Food Safety', 'BSTI', 'Certification']
  }
];

// ============================================
// 2. MENTORSHIP PROGRAM
// ============================================

interface Mentor {
  id: string;
  name: string;
  company: string;
  country: string;
  sector: string;
  yearsInBangladesh: number;
  expertise: string[];
  availability: string;
  mentees: number;
  bio: string;
  featured?: boolean;
}

const MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Li Wei',
    company: 'Youngone Corporation',
    country: 'China',
    sector: 'RMG & Textiles',
    yearsInBangladesh: 12,
    expertise: ['Factory Setup', 'RMG Compliance', 'Export Management', 'Labor Relations'],
    availability: 'Open to new mentees',
    mentees: 8,
    bio: 'I entered Bangladesh in 2012 with $50M investment. Now we operate 15 factories with 12,000 employees. Happy to guide newcomers through the setup process.',
    featured: true
  },
  {
    id: 'm2',
    name: 'Dr. Akiko Tanaka',
    company: 'Japan Pharmaceutical BD',
    country: 'Japan',
    sector: 'Pharmaceuticals',
    yearsInBangladesh: 8,
    expertise: ['DGDA Approval', 'WHO-GMP Certification', 'Quality Control', 'R&D Setup'],
    availability: 'Open to new mentees',
    mentees: 5,
    bio: 'Established pharma operations in Bangladesh in 2017. Successfully obtained all regulatory approvals and now export to 15 countries.',
    featured: true
  },
  {
    id: 'm3',
    name: 'Raj Malhotra',
    company: 'Tech Innovations BD',
    country: 'India',
    sector: 'IT & Software',
    yearsInBangladesh: 6,
    expertise: ['Software Development', 'Talent Hiring', 'Tech Infrastructure', 'Client Acquisition'],
    availability: 'Currently full (3 mentees)',
    mentees: 3,
    bio: 'Built a 200-person software development center in Dhaka. Can help with hiring, infrastructure, and scaling operations.'
  },
  {
    id: 'm4',
    name: 'Hans Schmidt',
    company: 'Green Energy Solutions',
    country: 'Germany',
    sector: 'Renewable Energy',
    yearsInBangladesh: 4,
    expertise: ['Solar Projects', 'Land Acquisition', 'DOE Clearances', 'Grid Connection'],
    availability: 'Open to new mentees',
    mentees: 2,
    bio: 'Pioneer in Bangladesh solar energy. Completed 3 major projects totaling 100MW. Know the regulatory landscape inside out.'
  },
  {
    id: 'm5',
    name: 'Sarah Johnson',
    company: 'Food Processing International',
    country: 'UK',
    sector: 'Food & Beverage',
    yearsInBangladesh: 5,
    expertise: ['Food Safety', 'BSTI Certification', 'Export Compliance', 'Supply Chain'],
    availability: 'Open to new mentees',
    mentees: 4,
    bio: 'Set up export-quality food processing plant in Mongla SEZ. Can guide through BSTI standards and international certifications.'
  }
];

// ============================================
// 3. EVENTS CALENDAR
// ============================================

interface Event {
  id: string;
  type: 'meetup' | 'roundtable' | 'site-visit' | 'webinar';
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  sector?: string;
  organizer: string;
  attendees: number;
  maxCapacity: number;
  rsvpStatus?: 'yes' | 'maybe' | 'no';
}

const EVENTS: Event[] = [
  {
    id: 'e1',
    type: 'meetup',
    title: 'Monthly Investor Networking Meetup',
    description: 'Casual networking dinner for all FDI investors in Bangladesh. Share experiences, challenges, and opportunities.',
    date: 'Feb 20, 2025',
    time: '7:00 PM - 10:00 PM',
    location: 'Radisson Blu Dhaka',
    organizer: 'BIDA Community Team',
    attendees: 87,
    maxCapacity: 120
  },
  {
    id: 'e2',
    type: 'roundtable',
    title: 'Pharma Sector Roundtable: Regulatory Updates',
    description: 'DGDA officials discuss new pharmaceutical regulations and export opportunities with investors.',
    date: 'Feb 25, 2025',
    time: '2:00 PM - 5:00 PM',
    location: 'BIDA Headquarters, Dhaka',
    sector: 'Pharmaceuticals',
    organizer: 'BIDA & DGDA',
    attendees: 42,
    maxCapacity: 60
  },
  {
    id: 'e3',
    type: 'site-visit',
    title: 'Mirsarai SEZ Site Visit',
    description: 'Guided tour of Bangladesh\'s largest economic zone with available plots and incentives presentation.',
    date: 'Mar 5, 2025',
    time: '9:00 AM - 4:00 PM',
    location: 'Mirsarai Economic Zone, Chattogram',
    organizer: 'BEZA',
    attendees: 35,
    maxCapacity: 50
  },
  {
    id: 'e4',
    type: 'roundtable',
    title: 'IT Sector Growth: Opportunities & Challenges',
    description: 'Discussion with ICT Division on digital infrastructure, talent pool, and government incentives.',
    date: 'Mar 10, 2025',
    time: '3:00 PM - 6:00 PM',
    location: 'BIDA Headquarters, Dhaka',
    sector: 'IT & Software',
    organizer: 'BIDA & ICT Division',
    attendees: 56,
    maxCapacity: 80
  },
  {
    id: 'e5',
    type: 'meetup',
    title: 'Chinese Investors Association Meetup',
    description: 'Special gathering for Chinese business community in Bangladesh. Language: Mandarin & English.',
    date: 'Mar 15, 2025',
    time: '6:00 PM - 9:00 PM',
    location: 'Pan Pacific Sonargaon Hotel',
    organizer: 'China-Bangladesh Business Council',
    attendees: 68,
    maxCapacity: 100
  },
  {
    id: 'e6',
    type: 'site-visit',
    title: 'Mongla EPZ Factory Tour',
    description: 'Visit successful food processing and packaging facilities. See operations in action.',
    date: 'Mar 20, 2025',
    time: '10:00 AM - 3:00 PM',
    location: 'Mongla Export Processing Zone',
    sector: 'Food & Beverage',
    organizer: 'BEPZA',
    attendees: 22,
    maxCapacity: 30
  }
];

// ============================================
// 4. SUCCESS STORIES
// ============================================

interface SuccessStory {
  id: string;
  author: string;
  authorCompany: string;
  authorCountry: string;
  milestone: string;
  description: string;
  metrics?: { label: string; value: string }[];
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  celebrations: number;
  image?: string;
}

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 's1',
    author: 'Li Wei',
    authorCompany: 'Youngone Corporation',
    authorCountry: 'China',
    milestone: 'We just hit $10M export milestone! 🎉',
    description: 'Proud to announce our Bangladesh operations just reached $10M in monthly exports to USA and Europe. Started with 500 workers in 2020, now at 5,000 employees across 3 factories.',
    metrics: [
      { label: 'Monthly Exports', value: '$10M' },
      { label: 'Employees', value: '5,000' },
      { label: 'Factories', value: '3' }
    ],
    timestamp: '3 hours ago',
    likes: 234,
    comments: 42,
    shares: 18,
    celebrations: 156,
    image: '#3B82F6'
  },
  {
    id: 's2',
    author: 'Dr. Akiko Tanaka',
    authorCompany: 'Japan Pharmaceutical BD',
    authorCountry: 'Japan',
    milestone: 'WHO-GMP Certification Achieved!',
    description: 'After 18 months of rigorous preparation, we received WHO-GMP certification from DGDA. Now qualified to export to 50+ countries. Special thanks to BIDA team for support throughout the process.',
    metrics: [
      { label: 'Certification Time', value: '18 months' },
      { label: 'Export Markets', value: '50+' },
      { label: 'Investment', value: '$15M' }
    ],
    timestamp: '1 day ago',
    likes: 189,
    comments: 31,
    shares: 24,
    celebrations: 127
  },
  {
    id: 's3',
    author: 'Raj Malhotra',
    authorCompany: 'Tech Innovations BD',
    authorCountry: 'India',
    milestone: '100th Software Engineer Hired! 🚀',
    description: 'Milestone alert: We just welcomed our 100th engineer to the Dhaka development center. Bangladesh talent pool is incredible - highly skilled, cost-effective, and dedicated.',
    metrics: [
      { label: 'Engineers', value: '100' },
      { label: 'Projects Delivered', value: '45' },
      { label: 'Revenue Growth', value: '300%' }
    ],
    timestamp: '2 days ago',
    likes: 156,
    comments: 28,
    shares: 15,
    celebrations: 98
  },
  {
    id: 's4',
    author: 'Hans Schmidt',
    authorCompany: 'Green Energy Solutions',
    authorCountry: 'Germany',
    milestone: 'First 50MW Solar Farm Operational!',
    description: 'Our first major solar project is now live and feeding 50MW to the national grid. From land acquisition to commissioning took 24 months. Bangladesh is serious about renewable energy!',
    metrics: [
      { label: 'Capacity', value: '50MW' },
      { label: 'Investment', value: '$40M' },
      { label: 'Timeline', value: '24 months' }
    ],
    timestamp: '3 days ago',
    likes: 203,
    comments: 36,
    shares: 29,
    celebrations: 141
  },
  {
    id: 's5',
    author: 'Sarah Johnson',
    authorCompany: 'Food Processing International',
    authorCountry: 'UK',
    milestone: 'BSTI Certification + First Export Container!',
    description: 'Received BSTI certification and shipped our first 40ft container of packaged foods to Europe. The quality standards in Bangladesh are world-class. Exciting times ahead!',
    metrics: [
      { label: 'Certifications', value: 'BSTI + HACCP' },
      { label: 'First Shipment', value: '40ft container' },
      { label: 'Target Markets', value: 'EU, Middle East' }
    ],
    timestamp: '5 days ago',
    likes: 174,
    comments: 23,
    shares: 19,
    celebrations: 112
  }
];

// ============================================
// 5. JOB BOARD
// ============================================

interface JobPosting {
  id: string;
  company: string;
  title: string;
  type: 'full-time' | 'part-time' | 'contract';
  location: string;
  sector: string;
  salary: string;
  experience: string;
  posted: string;
  applications: number;
  featured?: boolean;
}

const JOB_POSTINGS: JobPosting[] = [
  {
    id: 'j1',
    company: 'Youngone Corporation',
    title: 'Production Manager - RMG',
    type: 'full-time',
    location: 'Gazipur',
    sector: 'RMG & Textiles',
    salary: 'BDT 80,000 - 120,000/month',
    experience: '5+ years in garment manufacturing',
    posted: '2 days ago',
    applications: 34,
    featured: true
  },
  {
    id: 'j2',
    company: 'Japan Pharmaceutical BD',
    title: 'Quality Assurance Specialist',
    type: 'full-time',
    location: 'Dhaka',
    sector: 'Pharmaceuticals',
    salary: 'BDT 70,000 - 100,000/month',
    experience: '3+ years in pharma QA',
    posted: '3 days ago',
    applications: 28
  },
  {
    id: 'j3',
    company: 'Tech Innovations BD',
    title: 'Senior Software Engineer (Python/Django)',
    type: 'full-time',
    location: 'Dhaka (Hybrid)',
    sector: 'IT & Software',
    salary: 'BDT 90,000 - 150,000/month',
    experience: '4+ years in web development',
    posted: '1 day ago',
    applications: 67,
    featured: true
  },
  {
    id: 'j4',
    company: 'Green Energy Solutions',
    title: 'Solar Project Engineer',
    type: 'full-time',
    location: 'Chattogram',
    sector: 'Renewable Energy',
    salary: 'BDT 65,000 - 95,000/month',
    experience: '2+ years in solar installations',
    posted: '4 days ago',
    applications: 19
  },
  {
    id: 'j5',
    company: 'Food Processing International',
    title: 'Food Safety Manager',
    type: 'full-time',
    location: 'Mongla SEZ',
    sector: 'Food & Beverage',
    salary: 'BDT 75,000 - 110,000/month',
    experience: '4+ years in food safety/BSTI standards',
    posted: '5 days ago',
    applications: 22
  },
  {
    id: 'j6',
    company: 'Korea Electronics BD',
    title: 'Supply Chain Coordinator',
    type: 'full-time',
    location: 'Dhaka',
    sector: 'Electronics',
    salary: 'BDT 60,000 - 85,000/month',
    experience: '3+ years in supply chain management',
    posted: '1 week ago',
    applications: 41
  }
];

export function InvestorCommunityPlatform() {
  const [activeTab, setActiveTab] = useState<'forums' | 'mentors' | 'events' | 'stories' | 'jobs'>('forums');
  const [selectedForum, setSelectedForum] = useState<'all' | 'rmg' | 'pharma' | 'it-software' | 'food-bev' | 'energy'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredForumPosts = FORUM_POSTS.filter(p => 
    (selectedForum === 'all' || p.forum === selectedForum) &&
    (searchQuery === '' || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getForumIcon = (forum: string) => {
    switch (forum) {
      case 'rmg': return Factory;
      case 'pharma': return Building2;
      case 'it-software': return Zap;
      case 'food-bev': return Globe;
      case 'energy': return TrendingUp;
      default: return MessageSquare;
    }
  };

  const getForumColor = (forum: string) => {
    switch (forum) {
      case 'rmg': return 'bg-blue-100 text-blue-700';
      case 'pharma': return 'bg-green-100 text-green-700';
      case 'it-software': return 'bg-purple-100 text-purple-700';
      case 'food-bev': return 'bg-orange-100 text-orange-700';
      case 'energy': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card p-8 border-2 border-blue-100/50">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center border border-blue-100">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-semibold mb-2 text-[#0f172a]">Investor Community Platform</h1>
            <p className="text-[#475569] text-lg">Private networking space for existing and prospective investors</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-[#0f172a]">2,847 Active Investors</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-[#0f172a]">1,234 Forum Discussions</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-[#0f172a]">BIDA Moderated</span>
          </div>
        </div>

        <div className="mt-6 bg-blue-50/50 border border-blue-100 rounded-xl p-4">
          <p className="text-sm flex items-center gap-2 text-[#475569]">
            <Award className="w-4 h-4 text-blue-600" />
            <strong className="text-[#0f172a]">World First:</strong> Bangladesh is the only IPA with an active investor community platform - not just a static directory!
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search community content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-lg"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-3 border-b-2 border-gray-200 overflow-x-auto">
        {[
          { id: 'forums', label: 'Discussion Forums', icon: MessageSquare, count: FORUM_POSTS.length },
          { id: 'mentors', label: 'Mentorship Program', icon: UserPlus, count: MENTORS.length },
          { id: 'events', label: 'Events Calendar', icon: Calendar, count: EVENTS.length },
          { id: 'stories', label: 'Success Stories', icon: Trophy, count: SUCCESS_STORIES.length },
          { id: 'jobs', label: 'Job Board', icon: Briefcase, count: JOB_POSTINGS.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-b-4 border-indigo-600 text-indigo-600 -mb-0.5'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
            <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full font-bold">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ============================================ */}
      {/* TAB 1: DISCUSSION FORUMS */}
      {/* ============================================ */}
      {activeTab === 'forums' && (
        <div className="space-y-6">
          {/* Forum Category Filter */}
          <div className="flex gap-3 flex-wrap">
            {[
              { value: 'all', label: 'All Forums', icon: MessageSquare },
              { value: 'rmg', label: 'RMG Manufacturers', icon: Factory },
              { value: 'pharma', label: 'Pharma Investors', icon: Building2 },
              { value: 'it-software', label: 'IT/Software Entrepreneurs', icon: Zap },
              { value: 'food-bev', label: 'Food & Beverage', icon: Globe },
              { value: 'energy', label: 'Energy & Power', icon: TrendingUp }
            ].map((forum) => (
              <button
                key={forum.value}
                onClick={() => setSelectedForum(forum.value as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedForum === forum.value
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-indigo-300'
                }`}
              >
                <forum.icon className="w-4 h-4" />
                {forum.label}
              </button>
            ))}
          </div>

          {/* Create Post Button */}
          <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Start a New Discussion
          </button>

          {/* Forum Posts */}
          <div className="space-y-4">
            {filteredForumPosts.map((post, idx) => {
              const ForumIcon = getForumIcon(post.forum);
              
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all p-6 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {/* Author Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {post.author.charAt(0)}
                    </div>

                    {/* Post Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900">{post.author}</h3>
                            {post.moderated && (
                              <BadgeCheck className="w-4 h-4 text-blue-600" title="BIDA Verified" />
                            )}
                            <span className="text-sm text-gray-500">• {post.authorCompany}</span>
                            <span className="text-sm text-gray-400">• {post.authorCountry}</span>
                          </div>
                          <p className="text-xs text-gray-500">{post.timestamp}</p>
                        </div>
                        {post.pinned && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-700" />
                            PINNED
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                      <p className="text-gray-600 mb-3">{post.excerpt}</p>

                      {/* Tags */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getForumColor(post.forum)}`}>
                          <ForumIcon className="w-3 h-3 inline mr-1" />
                          {post.forum.toUpperCase()}
                        </span>
                        {post.tags.map((tag, tidx) => (
                          <span key={tidx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Engagement Stats */}
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer">
                          <ThumbsUp className="w-4 h-4" />
                          {post.likes} likes
                        </span>
                        <span className="flex items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer">
                          <MessageCircle className="w-4 h-4" />
                          {post.replies} replies
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views} views
                        </span>
                        <button className="ml-auto flex items-center gap-1 hover:text-indigo-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* TAB 2: MENTORSHIP PROGRAM */}
      {/* ============================================ */}
      {activeTab === 'mentors' && (
        <div className="space-y-6">
          {/* Program Description */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mentorship Program</h3>
                <p className="text-gray-700 mb-3">
                  Established investors volunteer to guide newcomers through the Bangladesh investment process.
                  Get 1-on-1 advice from those who've successfully navigated setup, approvals, and operations.
                </p>
                <button className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all">
                  Apply to Become a Mentee
                </button>
              </div>
            </div>
          </div>

          {/* Mentor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MENTORS.map((mentor, idx) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-2xl p-6 border-2 hover:shadow-xl transition-all ${
                  mentor.featured
                    ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300'
                    : 'bg-white border-gray-200'
                }`}
              >
                {mentor.featured && (
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full flex items-center gap-1 w-fit">
                      <Star className="w-3 h-3 fill-yellow-900" />
                      FEATURED MENTOR
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {mentor.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">{mentor.company}</p>
                    <p className="text-sm text-gray-500">{mentor.country}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-indigo-600" />
                    <span className="font-semibold text-gray-700">Sector:</span>
                    <span className="text-gray-600">{mentor.sector}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-gray-700">Experience:</span>
                    <span className="text-gray-600">{mentor.yearsInBangladesh} years in Bangladesh</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-gray-700">Current Mentees:</span>
                    <span className="text-gray-600">{mentor.mentees}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4 italic">"{mentor.bio}"</p>

                {/* Expertise Tags */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((exp, eidx) => (
                      <span key={eidx} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-lg">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability Status */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    mentor.availability.includes('Open')
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {mentor.availability}
                  </span>
                  <button
                    disabled={!mentor.availability.includes('Open')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      mentor.availability.includes('Open')
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Mail className="w-4 h-4 inline mr-1" />
                    Request Mentorship
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Become a Mentor CTA */}
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Become a Mentor</h3>
                <p className="text-gray-700">Share your experience and help new investors succeed in Bangladesh</p>
              </div>
              <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all whitespace-nowrap">
                Apply as Mentor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* TAB 3: EVENTS CALENDAR */}
      {/* ============================================ */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          {/* Event Type Filter */}
          <div className="flex gap-3 flex-wrap">
            {[
              { value: 'all', label: 'All Events' },
              { value: 'meetup', label: 'Networking Meetups' },
              { value: 'roundtable', label: 'Sector Roundtables' },
              { value: 'site-visit', label: 'Site Visits' }
            ].map((filter) => (
              <button
                key={filter.value}
                className="px-4 py-2 bg-white text-gray-600 border-2 border-gray-200 hover:border-purple-300 rounded-lg font-medium transition-all"
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {EVENTS.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all p-6"
              >
                <div className="flex items-start gap-6">
                  {/* Date Box */}
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0">
                    <div className="text-xs font-medium">{event.date.split(',')[0]}</div>
                    <div className="text-2xl font-bold">{event.date.split(' ')[1]}</div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          event.type === 'meetup' ? 'bg-blue-100 text-blue-700' :
                          event.type === 'roundtable' ? 'bg-green-100 text-green-700' :
                          event.type === 'site-visit' ? 'bg-orange-100 text-orange-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {event.type.toUpperCase()}
                        </span>
                        {event.sector && (
                          <span className="ml-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                            {event.sector}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-3">{event.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span>Organized by {event.organizer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-700">
                          {event.attendees}/{event.maxCapacity} attending
                        </span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden ml-2">
                          <div
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: `${(event.attendees / event.maxCapacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <button className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all">
                      RSVP for Event
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* TAB 4: SUCCESS STORIES */}
      {/* ============================================ */}
      {activeTab === 'stories' && (
        <div className="space-y-6">
          {/* Share Story CTA */}
          <button className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5" />
            Share Your Success Story
          </button>

          {/* Success Stories */}
          <div className="space-y-6">
            {SUCCESS_STORIES.map((story, idx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border-2 border-gray-200 hover:border-green-300 hover:shadow-xl transition-all p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {story.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{story.author}</h3>
                      <span className="text-sm text-gray-500">• {story.authorCompany}</span>
                      <span className="text-sm text-gray-400">• {story.authorCountry}</span>
                    </div>
                    <p className="text-xs text-gray-500">{story.timestamp}</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">{story.milestone}</h2>
                <p className="text-gray-700 mb-4">{story.description}</p>

                {/* Metrics */}
                {story.metrics && (
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {story.metrics.map((metric, midx) => (
                      <div key={midx} className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-green-600">{metric.value}</p>
                        <p className="text-xs text-gray-600 font-medium">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Engagement Actions */}
                <div className="flex items-center gap-6 pt-4 border-t-2 border-gray-100">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span className="font-medium">{story.likes} likes</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{story.comments} comments</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="font-medium">{story.shares} shares</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors ml-auto">
                    <Trophy className="w-5 h-5" />
                    <span className="font-medium">{story.celebrations} celebrations</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* TAB 5: JOB BOARD */}
      {/* ============================================ */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          {/* Post Job CTA */}
          <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Post a Job Opening
          </button>

          {/* Job Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {JOB_POSTINGS.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-2xl p-6 border-2 hover:shadow-xl transition-all ${
                  job.featured
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300'
                    : 'bg-white border-gray-200'
                }`}
              >
                {job.featured && (
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center gap-1 w-fit">
                      <Sparkles className="w-3 h-3" />
                      FEATURED JOB
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-sm text-gray-600 font-medium mb-4">{job.company}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Building2 className="w-4 h-4 text-green-600" />
                    <span>{job.sector}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="capitalize">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  <strong>Requirements:</strong> {job.experience}
                </p>

                <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{job.applications} applications</span>
                    <span className="mx-2">•</span>
                    <span>Posted {job.posted}</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center gap-1">
                    Apply Now
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Impact Statement */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-blue-600" />
              <p className="text-sm text-gray-700">
                <strong>Impact:</strong> The Job Board reduces hiring friction by connecting FDI companies directly with Bangladesh's skilled talent pool, 
                accelerating recruitment and supporting business growth.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Impact Stats */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6">Community Impact</h3>
        <div className="grid grid-cols-5 gap-6">
          <div>
            <div className="text-4xl font-bold">2,847</div>
            <div className="text-indigo-100 text-sm">Active Investors</div>
          </div>
          <div>
            <div className="text-4xl font-bold">1,234</div>
            <div className="text-indigo-100 text-sm">Forum Discussions</div>
          </div>
          <div>
            <div className="text-4xl font-bold">15</div>
            <div className="text-indigo-100 text-sm">Active Mentors</div>
          </div>
          <div>
            <div className="text-4xl font-bold">48</div>
            <div className="text-indigo-100 text-sm">Upcoming Events</div>
          </div>
          <div>
            <div className="text-4xl font-bold">156</div>
            <div className="text-indigo-100 text-sm">Job Openings</div>
          </div>
        </div>
        <p className="mt-6 text-indigo-100 text-sm">
          <strong>Network Effects:</strong> Investors attract other investors • <strong>Peer Validation:</strong> More powerful than government marketing • 
          <strong>World First:</strong> Only IPA with active community, not static directory
        </p>
      </div>
    </div>
  );
}