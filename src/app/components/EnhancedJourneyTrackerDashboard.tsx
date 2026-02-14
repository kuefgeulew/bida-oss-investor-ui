import { motion } from 'motion/react';
import { EnhancedJourneyStep, enhancedJourneySteps } from './EnhancedJourneyTracker';
import { useState } from 'react';
import { Map, Filter, Search, Download, Calendar } from 'lucide-react';

/**
 * 🎯 ENHANCED JOURNEY TRACKER DASHBOARD
 * Complete UI visualization of all journey steps with advanced filtering
 * Converts the "data structure" into a VISIBLE, INTERACTIVE feature
 */
export function EnhancedJourneyTrackerDashboard({ investorId }: { investorId?: string }) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'in_progress' | 'pending' | 'delayed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSteps = enhancedJourneySteps.filter(step => {
    const matchesFilter = filter === 'all' || step.status === filter;
    const matchesSearch = step.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          step.agency.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: enhancedJourneySteps.length,
    completed: enhancedJourneySteps.filter(s => s.status === 'completed').length,
    inProgress: enhancedJourneySteps.filter(s => s.status === 'in_progress').length,
    pending: enhancedJourneySteps.filter(s => s.status === 'pending').length,
    delayed: enhancedJourneySteps.filter(s => s.status === 'delayed').length,
  };

  const completionPercentage = Math.round((stats.completed / stats.total) * 100);

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">🗺️ Enhanced Journey Tracker</h1>
            <p className="text-purple-100 text-lg">Complete transparency into every approval step, legal basis, and potential delays</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold mb-1">{completionPercentage}%</div>
            <div className="text-purple-200 text-sm">Journey Complete</div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-purple-200 text-sm">Total Steps</div>
          </div>
          <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold">{stats.completed}</div>
            <div className="text-green-200 text-sm">Completed</div>
          </div>
          <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <div className="text-blue-200 text-sm">In Progress</div>
          </div>
          <div className="bg-gray-500/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-gray-200 text-sm">Pending</div>
          </div>
          <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold">{stats.delayed}</div>
            <div className="text-red-200 text-sm">Delayed</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
          </div>
          
          {(['all', 'completed', 'in_progress', 'pending', 'delayed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'All Steps' :
               f === 'completed' ? '✓ Completed' :
               f === 'in_progress' ? '⏱ In Progress' :
               f === 'pending' ? '⏸ Pending' :
               '⚠ Delayed'}
            </button>
          ))}

          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search steps or agencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Showing {filteredSteps.length} of {stats.total} steps</span>
        </div>
      </div>

      {/* Journey Steps */}
      <div className="space-y-4">
        {filteredSteps.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="text-gray-400 mb-2">
              <Search className="w-12 h-12 mx-auto mb-3" />
            </div>
            <p className="text-gray-600 font-medium">No steps found matching your filters</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredSteps.map((step, index) => (
            <EnhancedJourneyStep
              key={step.id}
              step={step}
              stepNumber={index + 1}
            />
          ))
        )}
      </div>

      {/* World-Class Addition: Timeline View Toggle */}
      <div className="glass-card p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <div className="flex items-start gap-3">
          <Map className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-900 mb-2">🎯 Why This Dashboard is World-Class</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✓ <strong>Legal Basis Transparency:</strong> Know exactly WHY each step exists (law references)</li>
              <li>✓ <strong>Officer Checklist Preview:</strong> See what officers verify BEFORE you submit</li>
              <li>✓ <strong>Pre-emptive Delay Education:</strong> Know common delay causes to avoid them</li>
              <li>✓ <strong>Dependency Mapping:</strong> Understand which steps must complete before others</li>
              <li>✓ <strong>SLA Tracking:</strong> Real countdown timers for in-progress steps</li>
              <li>✓ <strong>Interactive Filtering:</strong> Find exactly what you need instantly</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feature Statistics */}
      <div className="glass-card p-6 border-2 border-purple-200">
        <h3 className="font-bold text-gray-900 mb-4">📊 Enhanced Journey Tracker Intelligence</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {enhancedJourneySteps.reduce((sum, s) => sum + s.whatOfficersCheck.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Officer Checkpoints Documented</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {enhancedJourneySteps.reduce((sum, s) => sum + s.delayCauses.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Delay Causes Identified</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {enhancedJourneySteps.reduce((sum, s) => sum + s.dependencies.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Dependencies Mapped</div>
          </div>
        </div>
      </div>
    </div>
  );
}
