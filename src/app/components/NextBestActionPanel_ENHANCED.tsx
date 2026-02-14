// 🧭 NEXT BEST ACTION PANEL — Journey Guidance UI Component (ENHANCED)
// PHASE 5: Real backend integration - uses async data from API
// ARCHITECTURE: Global intelligence ribbon with real-time data fetching

import { ArrowRight, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { getNextBestAction, type TabType, type InvestorState } from '@/app/intelligence/journeyGuidanceEngine_ENHANCED';
import { motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';

interface NextBestActionPanelProps {
  investorId: string;
  bbid?: string;
  currentTab?: TabType;
  onNavigate: (tab: TabType) => void;
  onScroll?: (elementId: string) => void;
}

export function NextBestActionPanel({ 
  investorId, 
  bbid, 
  currentTab, 
  onNavigate,
  onScroll 
}: NextBestActionPanelProps) {
  
  // Get next best action from intelligence engine (REAL API)
  const state: InvestorState = { investorId, bbid, currentTab };
  
  const { data: action, isLoading, isError } = useQuery({
    queryKey: ['next-best-action', investorId, bbid, currentTab],
    queryFn: () => getNextBestAction(state),
    staleTime: 30 * 1000, // Refresh every 30 seconds
    refetchInterval: 60 * 1000, // Auto-refresh every minute
    retry: 2,
  });

  // Handle CTA click
  const handleClick = () => {
    if (!action) return;
    
    // If on same tab and scroll target exists, scroll instead of navigate
    if (currentTab === action.targetTab && action.scrollTarget && onScroll) {
      onScroll(action.scrollTarget);
    } else {
      onNavigate(action.targetTab);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 border-2 border-gray-200/50 rounded-2xl bg-gray-50/40 shadow-md mb-6">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
          <p className="text-sm text-gray-600">Analyzing your progress...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !action) {
    return (
      <div className="p-6 border-2 border-amber-200/50 rounded-2xl bg-amber-50/40 shadow-md mb-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-900">Unable to load guidance</p>
            <p className="text-xs text-amber-700 mt-1">Check your connection and try again</p>
          </div>
        </div>
      </div>
    );
  }

  // Priority-based styling
  const priorityConfig = {
    critical: {
      borderColor: 'border-red-200/50',
      bgColor: 'bg-red-50/40',
      textColor: 'text-red-900',
      descColor: 'text-red-700',
      labelColor: 'text-red-800',
      buttonColor: 'bg-red-600 hover:bg-red-700',
      icon: AlertCircle,
      iconColor: 'text-red-600',
      badgeColor: 'bg-red-100 text-red-700 border-red-200'
    },
    high: {
      borderColor: 'border-blue-200/40',
      bgColor: 'bg-blue-50/40',
      textColor: 'text-blue-900',
      descColor: 'text-blue-700',
      labelColor: 'text-blue-800',
      buttonColor: 'bg-blue-700 hover:bg-blue-800',
      icon: Sparkles,
      iconColor: 'text-blue-600',
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    medium: {
      borderColor: 'border-amber-200/40',
      bgColor: 'bg-amber-50/40',
      textColor: 'text-amber-900',
      descColor: 'text-amber-700',
      labelColor: 'text-amber-800',
      buttonColor: 'bg-amber-600 hover:bg-amber-700',
      icon: Sparkles,
      iconColor: 'text-amber-600',
      badgeColor: 'bg-amber-100 text-amber-700 border-amber-200'
    },
    low: {
      borderColor: 'border-emerald-200/40',
      bgColor: 'bg-emerald-50/40',
      textColor: 'text-emerald-900',
      descColor: 'text-emerald-700',
      labelColor: 'text-emerald-800',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    }
  };

  const config = priorityConfig[action.priority];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-6 border-2 ${config.borderColor} rounded-2xl ${config.bgColor} shadow-md mb-6`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
        </div>

        {/* Content */}
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <p className={`text-sm ${config.labelColor} font-medium`}>
              Recommended Next Step
            </p>
            {/* Data Source Indicator */}
            {action.dataSource === 'real' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                Live Data
              </span>
            )}
          </div>
          
          <h3 className={`text-lg font-semibold ${config.textColor} mb-2`}>
            {action.title}
          </h3>
          
          <p className={`text-sm ${config.descColor} mb-4 leading-relaxed`}>
            {action.description}
          </p>
          
          <button
            onClick={handleClick}
            className={`px-5 py-2.5 ${config.buttonColor} text-white rounded-lg font-medium transition-colors flex items-center gap-2 group`}
          >
            {action.ctaLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Priority Badge */}
        {action.priority === 'critical' && (
          <div className="flex-shrink-0">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.badgeColor} border`}>
              Urgent
            </span>
          </div>
        )}
        {action.priority === 'high' && (
          <div className="flex-shrink-0">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.badgeColor} border`}>
              Important
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
