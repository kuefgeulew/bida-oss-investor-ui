/**
 * 🏛️ GOVERNMENT PERMIT CENTER - COMPACT YOUTUBE STYLE
 * Complete permit and license tracking with workflow management
 * Plugs into: InvestorDashboard → Services Tab
 */

import { useState } from 'react';
import { 
  FileCheck, 
  Clock, 
  CheckCircle2,
  Upload,
  ChevronRight,
  PlayCircle,
  Calendar,
  Building2,
  AlertTriangle,
  Search,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InstrumentCard, InstrumentSection, SecondaryButton } from './ui-primitives';

interface GovPermitCenterProps {
  investorId: string;
  investorType: 'manufacturing' | 'services' | 'trading';
  bbid?: string;
  compact?: boolean;
}

export function GovPermitCenter({ investorId, investorType, bbid, compact }: GovPermitCenterProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data - always display this
  const mockPermits = [
    {
      id: 'bida-reg-001',
      serviceName: 'BIDA Company Registration',
      agencyName: 'Bangladesh Investment Development Authority',
      status: 'approved' as const,
      daysRemaining: 0,
      completedDate: '15 Jan 2025',
      fee: 5000
    },
    {
      id: 'trade-lic-001',
      serviceName: 'Trade License',
      agencyName: 'City Corporation',
      status: 'under-review' as const,
      daysRemaining: 8,
      fee: 3500
    },
    {
      id: 'env-clear-001',
      serviceName: 'Environmental Clearance',
      agencyName: 'Department of Environment',
      status: 'documents-pending' as const,
      daysRemaining: 12,
      fee: 15000
    },
    {
      id: 'fire-lic-001',
      serviceName: 'Fire License',
      agencyName: 'Fire Service & Civil Defence',
      status: 'not-started' as const,
      daysRemaining: 25,
      fee: 2500
    }
  ];

  // Filter permits
  const filteredSteps = mockPermits.filter(permit => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'pending' && permit.status === 'not-started') ||
      (filter === 'in-progress' && (permit.status === 'under-review' || permit.status === 'documents-pending')) ||
      (filter === 'completed' && permit.status === 'approved');
    
    const matchesSearch = 
      searchQuery === '' ||
      permit.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.agencyName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const completedCount = mockPermits.filter(p => p.status === 'approved').length;
  const inProgressCount = mockPermits.filter(p => p.status === 'under-review' || p.status === 'documents-pending').length;
  const overallProgress = Math.round((completedCount / mockPermits.length) * 100);

  const statusConfig = {
    'approved': {
      iconBg: 'from-green-500 to-emerald-600',
      icon: CheckCircle2,
      badge: '✓ Approved',
      badgeClass: 'bg-green-100 text-green-700'
    },
    'under-review': {
      iconBg: 'from-blue-500 to-cyan-600',
      icon: PlayCircle,
      badge: '⏳ In Review',
      badgeClass: 'bg-blue-100 text-blue-700'
    },
    'documents-pending': {
      iconBg: 'from-yellow-500 to-amber-600',
      icon: Upload,
      badge: '📄 Pending',
      badgeClass: 'bg-yellow-100 text-yellow-700'
    },
    'not-started': {
      iconBg: 'from-indigo-500 to-purple-600',
      icon: FileCheck,
      badge: '⏸ Not Started',
      badgeClass: 'bg-indigo-100 text-indigo-700'
    }
  };

  return (
    <InstrumentSection>
      <div className="space-y-3">
        {/* 📊 COMPACT HEADER STATS */}
        <InstrumentCard>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-bold bg-gradient-to-r from-[#0f172a] via-[#475569] to-[#64748b] bg-clip-text text-transparent">
                🏛️ Government Permits
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">Track your approval status</p>
            </div>
            <SecondaryButton className="gap-1 text-xs px-2 py-1">
              <RefreshCw className="w-3 h-3" />
              Refresh
            </SecondaryButton>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-700">Overall Progress</span>
              <span className="text-sm font-bold bg-gradient-to-r from-[#3b82f6] to-[#0e7490] bg-clip-text text-transparent">
                {overallProgress}%
              </span>
            </div>
            <div className="relative w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#0e7490] to-[#06b6d4] h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2 border border-green-200">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-green-700">Done</span>
              </div>
              <div className="text-xl font-bold text-green-600">{completedCount}</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-2 border border-blue-200">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <PlayCircle className="w-3 h-3 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-blue-700">Active</span>
              </div>
              <div className="text-xl font-bold text-blue-600">{inProgressCount}</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-2 border border-purple-200">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <Calendar className="w-3 h-3 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-purple-700">Days</span>
              </div>
              <div className="text-xl font-bold text-purple-600">{mockPermits.reduce((sum, p) => sum + p.daysRemaining, 0)}</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-2 border border-orange-200">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                  <AlertTriangle className="w-3 h-3 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-orange-700">Urgent</span>
              </div>
              <div className="text-xl font-bold text-orange-600">{mockPermits.filter(p => p.status === 'documents-pending').length}</div>
            </div>
          </div>
        </InstrumentCard>

        {/* 🚨 COMPACT ALERT BANNERS */}
        <AnimatePresence>
          {mockPermits.filter(p => p.status === 'not-started').length > 0 && (
            <motion.div
              key="ready-banner"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 border-l-4 border-blue-500 rounded-lg p-2.5 shadow-md"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                  <PlayCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#0f172a]">
                    ✅ {mockPermits.filter(p => p.status === 'not-started').length} Permit{mockPermits.filter(p => p.status === 'not-started').length > 1 ? 's' : ''} Ready
                  </h4>
                  <p className="text-[10px] text-slate-600">Prerequisites complete - start application</p>
                </div>
              </div>
            </motion.div>
          )}

          {mockPermits.filter(p => p.status === 'documents-pending').length > 0 && (
            <motion.div
              key="warning-banner"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 border-l-4 border-orange-500 rounded-lg p-2.5 shadow-md"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#0f172a]">
                    ⚠️ {mockPermits.filter(p => p.status === 'documents-pending').length} SLA Warning
                  </h4>
                  <p className="text-[10px] text-slate-600">Documents pending - upload required</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔍 COMPACT FILTER BAR */}
        <InstrumentCard>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search permits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 pr-2 py-1.5 bg-white/60 backdrop-blur-sm border border-[#e3ebf7] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 transition-all"
              />
            </div>
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
              {(['all', 'in-progress', 'completed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-all ${
                    filter === f
                      ? 'bg-white text-[#0f172a] shadow-sm'
                      : 'text-slate-600 hover:text-[#0f172a]'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'in-progress' ? 'Active' : 'Done'}
                </button>
              ))}
            </div>
          </div>
        </InstrumentCard>

        {/* 📋 YOUTUBE-STYLE PERMIT CARDS */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e3ebf7] shadow-md p-3">
          <h4 className="text-xs font-bold text-[#0f172a] mb-2 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-600" />
            Recent Permits ({filteredSteps.length})
          </h4>
          <div className="space-y-2">
            {filteredSteps.slice(0, 4).map((permit, index) => {
              const config = statusConfig[permit.status];
              const StatusIcon = config.icon;

              return (
                <motion.div
                  key={permit.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 3 }}
                  className="group"
                >
                  <div className="flex items-center gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-lg border border-[#e3ebf7] hover:border-[#3b82f6]/30 hover:shadow-md transition-all cursor-pointer">
                    {/* Icon Badge */}
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.iconBg} shadow-md flex items-center justify-center flex-shrink-0`}>
                      <StatusIcon className="w-5 h-5 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-[#0f172a] truncate group-hover:text-[#3b82f6] transition-colors">
                        {permit.serviceName}
                      </h5>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                        <span className="truncate">{permit.agencyName}</span>
                        <span>•</span>
                        <span className={
                          permit.daysRemaining < 5 ? 'text-red-600 font-semibold' :
                          permit.daysRemaining < 10 ? 'text-orange-600 font-semibold' :
                          'text-slate-600'
                        }>
                          {permit.daysRemaining}d left
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${config.badgeClass}`}>
                        {config.badge}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#3b82f6] transition-colors" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View All Link */}
          {filteredSteps.length > 4 && (
            <div className="mt-2 pt-2 border-t border-slate-200">
              <button className="w-full text-xs font-semibold text-[#3b82f6] hover:text-[#0e7490] transition-colors">
                View all {filteredSteps.length} permits →
              </button>
            </div>
          )}
        </div>

        {/* No Results */}
        {filteredSteps.length === 0 && (
          <InstrumentCard>
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-700 mb-1">No permits found</h4>
              <p className="text-xs text-slate-600">
                Try adjusting your filters
              </p>
            </div>
          </InstrumentCard>
        )}
      </div>
    </InstrumentSection>
  );
}
