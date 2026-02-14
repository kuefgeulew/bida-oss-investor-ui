// Gamified Progress Bar - Enhanced progress visualization with physics animation
// Upgrade for JourneyTracker with milestone celebrations
// READ-ONLY panel that reads from agencyWorkflowEngine

import React, { useEffect, useState, useMemo } from 'react';
import { Trophy, Star, Zap, CheckCircle, Target, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { getPipeline } from '@/app/gov-agencies/agencyWorkflowEngine';

interface GamifiedProgressBarProps {
  investorId: string; // Now self-reading from engine
}

export function GamifiedProgressBar({ investorId }: GamifiedProgressBarProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [recentlyCompleted, setRecentlyCompleted] = useState<number | null>(null);
  
  // ✅ READ FROM REAL ENGINE - NO PROPS
  const pipeline = useMemo(() => getPipeline(investorId), [investorId]);
  
  // If no pipeline, show empty state (ALWAYS VISIBLE)
  if (!pipeline) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-700 mb-2">Journey Not Started</h3>
        <p className="text-gray-600 text-sm">
          Your approval pipeline will appear here once you submit your first application.
        </p>
      </div>
    );
  }
  
  const currentStep = pipeline.currentStep;
  const totalSteps = pipeline.totalSteps;
  const completedSteps = Array.from({ length: pipeline.completedSteps }, (_, i) => i + 1);
  const milestones = [5, 10, 15, 20];
  const showCelebration = true;
  
  const progressPercentage = (completedSteps.length / totalSteps) * 100;
  const isMilestone = milestones.includes(currentStep);
  
  useEffect(() => {
    if (completedSteps.length > 0 && showCelebration) {
      const lastCompleted = completedSteps[completedSteps.length - 1];
      if (lastCompleted !== recentlyCompleted) {
        setRecentlyCompleted(lastCompleted);
        if (milestones.includes(lastCompleted)) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      }
    }
  }, [completedSteps, milestones, recentlyCompleted, showCelebration]);
  
  // Calculate points/badges
  const points = completedSteps.length * 100;
  const badges = Math.floor(completedSteps.length / 3);
  
  return (
    <div className="relative">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][i % 5],
                left: `${Math.random() * 100}%`,
                top: '-20px',
              }}
              initial={{ y: 0, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight + 20,
                opacity: 0,
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 text-white mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-300" />
              <div>
                <div className="text-xs opacity-80">Points</div>
                <div className="text-lg font-bold">{points}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <div>
                <div className="text-xs opacity-80">Badges</div>
                <div className="text-lg font-bold">{badges}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-300" />
              <div>
                <div className="text-xs opacity-80">Progress</div>
                <div className="text-lg font-bold">{Math.round(progressPercentage)}%</div>
              </div>
            </div>
          </div>
          
          {isMilestone && (
            <motion.div
              className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-bold flex items-center gap-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Star className="w-4 h-4 fill-current" />
              Milestone!
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Main Progress Bar */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Journey Progress</h3>
            <p className="text-sm text-gray-600">{completedSteps.length} of {totalSteps} steps completed</p>
          </div>
          
          <div className="flex items-center gap-1">
            {[...Array(badges)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
              >
                <Trophy className="w-6 h-6 text-yellow-500 fill-current" />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="relative bg-gray-200 rounded-full h-8 overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
          
          {/* Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">
            {Math.round(progressPercentage)}%
          </div>
        </div>
        
        {/* Milestone Markers */}
        <div className="relative mt-4">
          <div className="flex justify-between">
            {[...Array(Math.min(totalSteps, 20))].map((_, i) => {
              const step = i + 1;
              const isCompleted = completedSteps.includes(step);
              const isMilestoneStep = milestones.includes(step);
              const isCurrent = step === currentStep;
              
              return (
                <motion.div
                  key={step}
                  className="relative flex flex-col items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                      isCompleted
                        ? 'bg-green-500 text-white border-green-600'
                        : isCurrent
                        ? 'bg-blue-500 text-white border-blue-600 animate-pulse'
                        : 'bg-gray-100 text-gray-400 border-gray-300'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : isMilestoneStep ? (
                      <Star className="w-5 h-5" />
                    ) : (
                      step
                    )}
                  </motion.div>
                  
                  {isMilestoneStep && (
                    <div className="absolute -bottom-6 text-xs font-semibold text-purple-600">
                      Milestone
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Achievement Unlocked */}
      {showConfetti && recentlyCompleted && milestones.includes(recentlyCompleted) && (
        <motion.div
          className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-8 py-4 rounded-2xl shadow-2xl z-50"
          initial={{ y: -100, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 fill-current" />
            <div>
              <div className="font-bold text-lg">Achievement Unlocked!</div>
              <div className="text-sm opacity-90">Milestone {recentlyCompleted} completed</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Simplified version for compact display
export function CompactProgressRing({ percentage, size = 80 }: { percentage: number; size?: number }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="8"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-gray-900">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}
