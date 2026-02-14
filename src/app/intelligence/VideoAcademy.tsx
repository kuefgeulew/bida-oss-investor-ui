import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Clock, BookOpen, Award, Video, Users, TrendingUp, Building2, FileText, Briefcase } from 'lucide-react';

interface VideoContent {
  id: string;
  title: string;
  category: string;
  duration: string;
  instructor: string;
  views: number;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

const videoLibrary: VideoContent[] = [
  {
    id: '1',
    title: 'How to Register Your Business in Bangladesh',
    category: 'Business Setup',
    duration: '12:45',
    instructor: 'RJSC Officer',
    views: 15420,
    thumbnail: '🏢',
    level: 'Beginner',
    description: 'Complete walkthrough of company registration process'
  },
  {
    id: '2',
    title: 'Understanding Work Permit & Visa Requirements',
    category: 'Visa & Immigration',
    duration: '18:30',
    instructor: 'Immigration Expert',
    views: 12380,
    thumbnail: '✈️',
    level: 'Beginner',
    description: 'Step-by-step visa application and work permit guide'
  },
  {
    id: '3',
    title: 'RMG Industry Success Story: From 0 to $50M',
    category: 'Success Stories',
    duration: '25:40',
    instructor: 'Industry Leader',
    views: 18920,
    thumbnail: '👔',
    level: 'Advanced',
    description: 'Real investor journey in garments manufacturing'
  },
  {
    id: '4',
    title: 'Tax Incentives Explained by NBR',
    category: 'Compliance & Tax',
    duration: '16:20',
    instructor: 'NBR Official',
    views: 11240,
    thumbnail: '💰',
    level: 'Intermediate',
    description: 'Understanding tax holidays, VAT exemptions, and benefits'
  }
];

const categories = [
  { name: 'All', icon: Video },
  { name: 'Business Setup', icon: Building2 },
  { name: 'Visa & Immigration', icon: Users },
  { name: 'Success Stories', icon: Award },
  { name: 'Compliance & Tax', icon: FileText }
];

export function VideoAcademy() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const filteredVideos = videoLibrary.filter(video => {
    const categoryMatch = selectedCategory === 'All' || video.category === selectedCategory;
    const levelMatch = selectedLevel === 'All' || video.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-blue-100 text-blue-700';
      case 'Advanced': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">OSS Academy</h3>
          <p className="text-sm text-gray-600 mt-1">Learn everything about investing in Bangladesh</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-xs text-gray-600">Total Videos</p>
            <p className="text-lg font-bold text-blue-600">{videoLibrary.length}</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap flex items-center gap-2 transition-all ${
                selectedCategory === category.name
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Level Filter */}
      <div className="flex gap-2">
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              selectedLevel === level
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Featured Video */}
      {selectedCategory === 'All' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 bg-blue-50/50 border border-blue-100 rounded-xl"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="px-3 py-1 bg-blue-100 rounded-full text-xs font-medium text-blue-700">
                  Featured
                </div>
                <div className="px-3 py-1 bg-blue-100 rounded-full text-xs font-medium text-blue-700">
                  Most Watched
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Complete Investor Onboarding Guide</h3>
              <p className="text-gray-600 mb-4">45-minute comprehensive video covering all steps from registration to operations</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>45:30</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>23,540 views</span>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all"
            >
              <Play className="w-5 h-5" />
              Watch Now
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <div className="text-6xl">{video.thumbnail}</div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <Play className="w-8 h-8 text-blue-600 ml-1" />
                </motion.div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                {video.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(video.level)}`}>
                  {video.level}
                </span>
                <span className="text-xs text-gray-500">{video.views.toLocaleString()} views</span>
              </div>

              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h4>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{video.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-700 font-medium">{video.instructor}</span>
                </div>
                <button className="text-blue-600 text-xs font-medium hover:underline">
                  Watch →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Learning Path Suggestion */}
      <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-purple-600" />
          Recommended Learning Path
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2 text-purple-600 font-bold">
              1
            </div>
            <p className="text-sm font-semibold text-gray-900">Start Here</p>
            <p className="text-xs text-gray-600 mt-1">Business Setup Basics</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2 text-purple-600 font-bold">
              2
            </div>
            <p className="text-sm font-semibold text-gray-900">Then Learn</p>
            <p className="text-xs text-gray-600 mt-1">Zone Selection & Visit</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2 text-purple-600 font-bold">
              3
            </div>
            <p className="text-sm font-semibold text-gray-900">Master</p>
            <p className="text-xs text-gray-600 mt-1">Compliance & Tax</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2 text-purple-600 font-bold">
              4
            </div>
            <p className="text-sm font-semibold text-gray-900">Advance</p>
            <p className="text-xs text-gray-600 mt-1">Sector Deep Dives</p>
          </div>
        </div>
      </div>
    </div>
  );
}
