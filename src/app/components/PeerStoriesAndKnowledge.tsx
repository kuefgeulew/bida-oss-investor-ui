import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Building2, DollarSign, Clock, MapPin, Quote, Book, ExternalLink, Search, FileText } from 'lucide-react';
import { peerStories, PeerStory } from '@/data/investmentIntelligence';
import ossKnowledge from '@/data/ossKnowledge.json';

// ============================================
// Main Component Export (Combines Both Views)
// ============================================

export function PeerStoriesAndKnowledge() {
  const [activeView, setActiveView] = useState<'stories' | 'knowledge'>('stories');

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveView('stories')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeView === 'stories'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'glass-button hover:bg-white/80'
          }`}
        >
          👥 Investor Success Stories
        </button>
        <button
          onClick={() => setActiveView('knowledge')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeView === 'knowledge'
              ? 'bg-violet-600 text-white shadow-lg'
              : 'glass-button hover:bg-white/80'
          }`}
        >
          📚 Regulatory Knowledge Base
        </button>
      </div>

      {/* Views */}
      {activeView === 'stories' ? <PeerStoriesView /> : <RegulatoryKnowledgeView />}
    </div>
  );
}

// ============================================
// Peer Stories Component
// ============================================

export function PeerStoriesView() {
  const [selectedSector, setSelectedSector] = useState('all');

  const filtered = selectedSector === 'all'
    ? peerStories
    : peerStories.filter(story => story.sector.toLowerCase().includes(selectedSector.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-8 rounded-2xl border border-[#e3ebf7]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Investor Peer Stories</h2>
            <p className="text-gray-600">Real success cases - investors trust examples, not promises</p>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-900">
            <strong>Social proof builds confidence.</strong> See real timelines from actual foreign investors who successfully set up in Bangladesh.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedSector('all')}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedSector === 'all'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'glass-button hover:bg-white/80'
          }`}
        >
          All Sectors
        </button>
        <button
          onClick={() => setSelectedSector('textiles')}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedSector === 'textiles'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'glass-button hover:bg-white/80'
          }`}
        >
          Textiles
        </button>
        <button
          onClick={() => setSelectedSector('power')}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedSector === 'power'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'glass-button hover:bg-white/80'
          }`}
        >
          Power & Energy
        </button>
        <button
          onClick={() => setSelectedSector('automotive')}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedSector === 'automotive'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'glass-button hover:bg-white/80'
          }`}
        >
          Automotive
        </button>
      </div>

      {/* Stories */}
      <div className="space-y-6">
        {filtered.map((story, index) => (
          <StoryCard key={index} story={story} index={index} />
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-6">
        <div className="glass-card p-8 rounded-2xl border border-[#e3ebf7] text-center">
          <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-900">{peerStories.length}+</div>
          <div className="text-sm text-gray-600">Success Stories</div>
        </div>
        <div className="glass-card p-8 rounded-2xl border border-[#e3ebf7] text-center">
          <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-900">
            ${peerStories.reduce((sum, s) => sum + parseFloat(s.investmentSize.replace(/[$,million]/g, '')), 0).toFixed(1)}B
          </div>
          <div className="text-sm text-gray-600">Total Investment</div>
        </div>
        <div className="glass-card p-8 rounded-2xl border border-[#e3ebf7] text-center">
          <Clock className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-900">
            {Math.round(peerStories.reduce((sum, s) => sum + s.timeline.allApprovals, 0) / peerStories.length)}
          </div>
          <div className="text-sm text-gray-600">Avg. Days to Approval</div>
        </div>
      </div>
    </div>
  );
}

function StoryCard({ story, index }: { story: PeerStory; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-8 rounded-2xl border border-[#e3ebf7] border-l-4 border-blue-500"
    >
      <div className="flex items-start gap-6">
        {/* Company Logo Placeholder */}
        <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
          {story.companyName.substring(0, 2).toUpperCase()}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{story.companyName}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {story.country}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {story.sector}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {story.investmentSize}
                </span>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              {story.year}
            </span>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">Registration</div>
              <div className="text-2xl font-bold text-blue-700">{story.timeline.registration}</div>
              <div className="text-xs text-gray-600">days</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">All Approvals</div>
              <div className="text-2xl font-bold text-green-700">{story.timeline.allApprovals}</div>
              <div className="text-xs text-gray-600">days</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">Operational</div>
              <div className="text-2xl font-bold text-purple-700">{story.timeline.operational}</div>
              <div className="text-xs text-gray-600">days</div>
            </div>
          </div>

          {/* Zone */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Investment Zone: </span>
            <span className="font-semibold text-gray-900">{story.zone}</span>
          </div>

          {/* Testimonial */}
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <Quote className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-gray-700 italic">"{story.testimonial}"</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// Regulatory Knowledge Base Component
// ============================================

export function RegulatoryKnowledgeView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'agencies', name: 'Government Agencies' },
    { id: 'business-types', name: 'Business Types' },
    { id: 'incentives', name: 'Incentives & Tax' },
    { id: 'zones', name: 'Economic Zones' },
    { id: 'rules', name: 'Rules & Regulations' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-8 rounded-2xl border border-[#e3ebf7]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Book className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Regulatory Knowledge Base</h2>
            <p className="text-gray-600">Legal grounding for every approval step</p>
          </div>
        </div>

        <div className="p-4 bg-violet-50 border border-violet-200 rounded-xl">
          <p className="text-sm text-violet-900">
            <strong>Serious investors want legal grounding.</strong> Every approval step is linked to relevant laws, acts, and government circulars.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="glass-card p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search regulations, laws, agencies, or procedures..."
            className="w-full pl-12 pr-4 py-4 glass-button rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-lg"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === cat.id
                ? 'bg-violet-600 text-white shadow-lg'
                : 'glass-button hover:bg-white/80'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* Agencies */}
        {(selectedCategory === 'all' || selectedCategory === 'agencies') && (
          <KnowledgeSection
            title="Government Agencies"
            icon={<Building2 className="w-6 h-6 text-blue-600" />}
            items={ossKnowledge.agencies.map(agency => ({
              title: agency.name,
              description: agency.role,
              details: agency.services.join(', '),
              link: '#'
            }))}
          />
        )}

        {/* Business Types */}
        {(selectedCategory === 'all' || selectedCategory === 'business-types') && (
          <KnowledgeSection
            title="Business Types & Approval Processes"
            icon={<FileText className="w-6 h-6 text-green-600" />}
            items={ossKnowledge.businessTypes.map(type => ({
              title: type.name,
              description: type.description,
              details: `Total SLA: ${type.totalSLA} | Min Capital: ${type.requiredCapital}`,
              link: '#'
            }))}
          />
        )}

        {/* Rules */}
        {(selectedCategory === 'all' || selectedCategory === 'rules') && (
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Key Rules & Regulations</h3>
            </div>
            <ul className="space-y-3">
              {ossKnowledge.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Legal References (Placeholder) */}
        <div className="glass-card p-8 rounded-2xl border border-[#e3ebf7] bg-amber-50 border-2 border-amber-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Book className="w-5 h-5 text-amber-600" />
            Legal References & Acts
          </h3>
          <div className="space-y-3">
            <LegalReference
              title="Foreign Exchange Regulation Act, 1947"
              description="Governs foreign investment, repatriation of funds, and currency exchange"
              link="#"
            />
            <LegalReference
              title="Bangladesh Investment Development Authority Act, 2016"
              description="Establishes BIDA as the one-stop service provider for investors"
              link="#"
            />
            <LegalReference
              title="Companies Act, 1994"
              description="Governs company registration, incorporation, and compliance"
              link="#"
            />
            <LegalReference
              title="Environment Conservation Act, 1995"
              description="Mandates environmental clearance for industrial projects"
              link="#"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function KnowledgeSection({ title, icon, items }: {
  title: string;
  icon: React.ReactNode;
  items: Array<{ title: string; description: string; details: string; link: string }>;
}) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="p-4 glass-button rounded-xl hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="text-xs text-gray-500">{item.details}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-violet-600 flex-shrink-0 ml-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LegalReference({ title, description, link }: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <a
      href={link}
      className="block p-4 glass-button rounded-xl hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <ExternalLink className="w-5 h-5 text-amber-600 flex-shrink-0 ml-4" />
      </div>
    </a>
  );
}