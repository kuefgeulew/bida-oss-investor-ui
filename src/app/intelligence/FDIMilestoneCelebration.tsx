/**
 * 🎉 FDI MILESTONE CELEBRATIONS
 * Celebratory popups for national FDI achievements
 * Creates excitement and demonstrates momentum
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, TrendingUp, Building2, Users, Sparkles, X, PartyPopper } from 'lucide-react';

// Define milestone types
interface FDIMilestone {
  id: string;
  type: 'sector' | 'country' | 'zone' | 'total' | 'export' | 'jobs';
  title: string;
  description: string;
  value: string;
  achievement: string;
  icon: typeof Trophy;
  color: string;
  bgGradient: string;
  timestamp: Date;
  celebrationLevel: 'standard' | 'major' | 'mega';
}

// Mock milestones based on canonical data
const MOCK_MILESTONES: FDIMilestone[] = [
  {
    id: 'milestone-1',
    type: 'sector',
    title: '🎯 Pharmaceutical Sector Milestone',
    description: 'Pharmaceutical sector crosses $200M investment threshold this quarter!',
    value: '$204M',
    achievement: 'Q1 2026 Achievement',
    icon: Trophy,
    color: 'text-green-600',
    bgGradient: 'from-green-500 to-emerald-600',
    timestamp: new Date('2026-02-12T10:00:00'),
    celebrationLevel: 'major'
  },
  {
    id: 'milestone-2',
    type: 'total',
    title: '🚀 Bangladesh Crosses $1.7B Annual FDI',
    description: 'Historic achievement! Bangladesh attracts record-breaking foreign investment in 2024.',
    value: '$1.7B',
    achievement: 'Annual Record 2024',
    icon: PartyPopper,
    color: 'text-purple-600',
    bgGradient: 'from-purple-500 to-pink-600',
    timestamp: new Date('2026-02-10T15:30:00'),
    celebrationLevel: 'mega'
  },
  {
    id: 'milestone-3',
    type: 'zone',
    title: '🏭 BEPZA Zones Hit 85% Occupancy',
    description: 'High investor demand! BEPZA zones reach 85% capacity with 1,058 plots occupied.',
    value: '85%',
    achievement: 'Zone Momentum Alert',
    icon: Building2,
    color: 'text-blue-600',
    bgGradient: 'from-blue-500 to-indigo-600',
    timestamp: new Date('2026-02-11T09:15:00'),
    celebrationLevel: 'standard'
  },
  {
    id: 'milestone-4',
    type: 'export',
    title: '📦 FDI Companies Export $2.34B',
    description: 'Foreign-invested companies contribute record exports, growing 23.2% year-over-year!',
    value: '$2.34B',
    achievement: 'Export Success Story',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgGradient: 'from-orange-500 to-red-600',
    timestamp: new Date('2026-02-09T14:00:00'),
    celebrationLevel: 'major'
  },
  {
    id: 'milestone-5',
    type: 'jobs',
    title: '👥 156,000+ Jobs Created by FDI',
    description: 'Foreign investment creates over 156,000 employment opportunities this year!',
    value: '156K',
    achievement: 'Employment Impact',
    icon: Users,
    color: 'text-teal-600',
    bgGradient: 'from-teal-500 to-cyan-600',
    timestamp: new Date('2026-02-08T11:20:00'),
    celebrationLevel: 'major'
  },
  {
    id: 'milestone-6',
    type: 'country',
    title: '🌍 47 Countries Now Investing in Bangladesh',
    description: 'Global diversification milestone! Bangladesh attracts FDI from record number of countries.',
    value: '47',
    achievement: 'Global Reach Expanded',
    icon: Sparkles,
    color: 'text-indigo-600',
    bgGradient: 'from-indigo-500 to-violet-600',
    timestamp: new Date('2026-02-07T16:45:00'),
    celebrationLevel: 'standard'
  }
];

interface FDIMilestoneCelebrationProps {
  autoShow?: boolean;
  showInterval?: number; // milliseconds
}

export function FDIMilestoneCelebration({ 
  autoShow = true, 
  showInterval = 120000 // 2 minutes between celebrations
}: FDIMilestoneCelebrationProps) {
  const [activeMilestone, setActiveMilestone] = useState<FDIMilestone | null>(null);
  const [shownMilestones, setShownMilestones] = useState<Set<string>>(new Set());
  const [confetti, setConfetti] = useState(false);
  
  useEffect(() => {
    if (!autoShow) return;
    
    // Show milestones sequentially
    const interval = setInterval(() => {
      const unshownMilestones = MOCK_MILESTONES.filter(m => !shownMilestones.has(m.id));
      
      if (unshownMilestones.length > 0) {
        const nextMilestone = unshownMilestones[0];
        setActiveMilestone(nextMilestone);
        setShownMilestones(prev => new Set([...prev, nextMilestone.id]));
        
        // Trigger confetti for mega celebrations
        if (nextMilestone.celebrationLevel === 'mega') {
          setConfetti(true);
          setTimeout(() => setConfetti(false), 3000);
        }
        
        // Auto-dismiss after 8 seconds
        setTimeout(() => {
          setActiveMilestone(null);
        }, 8000);
      } else {
        // Reset after showing all milestones
        setShownMilestones(new Set());
      }
    }, showInterval);
    
    return () => clearInterval(interval);
  }, [autoShow, showInterval, shownMilestones]);
  
  const handleDismiss = () => {
    setActiveMilestone(null);
    setConfetti(false);
  };
  
  return (
    <>
      {/* Confetti Effect for Mega Celebrations */}
      <AnimatePresence>
        {confetti && (
          <div className="fixed inset-0 pointer-events-none z-[9999]">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: -20,
                  rotate: 0,
                  opacity: 1
                }}
                animate={{ 
                  y: window.innerHeight + 20,
                  rotate: Math.random() * 720,
                  opacity: 0
                }}
                transition={{ 
                  duration: 3,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut'
                }}
                className={`absolute w-3 h-3 ${
                  i % 5 === 0 ? 'bg-yellow-400' :
                  i % 5 === 1 ? 'bg-blue-400' :
                  i % 5 === 2 ? 'bg-green-400' :
                  i % 5 === 3 ? 'bg-purple-400' :
                  'bg-pink-400'
                } rounded-full`}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      
      {/* Milestone Celebration Modal */}
      <AnimatePresence>
        {activeMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9998] p-4"
            onClick={handleDismiss}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full"
            >
              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
              
              {/* Celebration Card */}
              <div className={`relative overflow-hidden bg-gradient-to-br ${activeMilestone.bgGradient} rounded-2xl shadow-2xl`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <motion.div
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{ 
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                    className="w-full h-full"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
                      backgroundSize: '200% 200%'
                    }}
                  />
                </div>
                
                <div className="relative p-8">
                  {/* Icon with Pulse Animation */}
                  <div className="flex justify-center mb-6">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center"
                    >
                      <activeMilestone.icon className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-2xl font-bold text-white text-center mb-3">
                    {activeMilestone.title}
                  </h2>
                  
                  {/* Description */}
                  <p className="text-white/90 text-center mb-6 text-lg">
                    {activeMilestone.description}
                  </p>
                  
                  {/* Value Display */}
                  <div className="p-6 bg-white/20 backdrop-blur rounded-xl border border-white/30 mb-6">
                    <div className="text-center">
                      <p className="text-white/80 text-sm mb-2">{activeMilestone.achievement}</p>
                      <p className="text-5xl font-bold text-white">
                        {activeMilestone.value}
                      </p>
                    </div>
                  </div>
                  
                  {/* Celebration Level Indicator */}
                  <div className="flex items-center justify-center gap-2">
                    {activeMilestone.celebrationLevel === 'mega' && (
                      <>
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                        <span className="text-white font-semibold">MEGA MILESTONE</span>
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                      </>
                    )}
                    {activeMilestone.celebrationLevel === 'major' && (
                      <>
                        <Trophy className="w-4 h-4 text-yellow-300" />
                        <span className="text-white font-medium">Major Achievement</span>
                      </>
                    )}
                    {activeMilestone.celebrationLevel === 'standard' && (
                      <span className="text-white/80 text-sm">Milestone Achieved ✓</span>
                    )}
                  </div>
                  
                  {/* Share the News */}
                  <div className="mt-6 p-4 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                    <p className="text-white/90 text-center text-sm">
                      🎉 Share this achievement with investors and partners!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Compact Toast Version for Non-Intrusive Celebrations
 */
export function FDIMilestoneToast() {
  const [toasts, setToasts] = useState<FDIMilestone[]>([]);
  
  useEffect(() => {
    // Show toast notifications sequentially
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < MOCK_MILESTONES.length) {
        const milestone = MOCK_MILESTONES[currentIndex];
        setToasts(prev => [...prev, milestone]);
        
        // Remove after 5 seconds
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== milestone.id));
        }, 5000);
        
        currentIndex++;
      } else {
        currentIndex = 0; // Loop
      }
    }, 120000); // Every 2 minutes (reduced from 25 seconds)
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed bottom-4 right-4 z-[9997] space-y-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((milestone) => (
          <motion.div
            key={milestone.id}
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className={`p-4 bg-gradient-to-r ${milestone.bgGradient} rounded-xl shadow-xl border border-white/20 backdrop-blur`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <milestone.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white mb-1">
                  {milestone.title}
                </p>
                <p className="text-xs text-white/80 mb-2">
                  {milestone.achievement}: <span className="font-bold">{milestone.value}</span>
                </p>
              </div>
              <button
                onClick={() => setToasts(prev => prev.filter(t => t.id !== milestone.id))}
                className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Milestone List View for Dashboard Display
 */
export function FDIMilestonesList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-600" />
          Recent FDI Milestones
        </h3>
        <span className="text-sm text-gray-500">{MOCK_MILESTONES.length} achievements</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_MILESTONES.map((milestone) => (
          <motion.div
            key={milestone.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${milestone.bgGradient}`}>
                <milestone.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm mb-1">
                  {milestone.title.replace(/^[^\s]+\s/, '')} {/* Remove emoji */}
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  {milestone.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    {milestone.value}
                  </span>
                  <span className="text-xs text-gray-500">
                    {milestone.timestamp.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}