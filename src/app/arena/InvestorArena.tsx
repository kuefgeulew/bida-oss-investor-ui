/**
 * 🏆 INVESTOR ARENA
 * 
 * Prestige chamber for gamification, recognition, and performance tracking
 * Separates competitive/achievement features from operational workflow
 * 
 * Features:
 * - Level & XP progression
 * - Achievement badges & milestones
 * - Global leaderboard
 * - Performance analytics
 * - Jobs created statistics
 * - Daily streak tracking
 */

import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ArrowLeft } from 'lucide-react';
import { GamifiedProgressTracker } from '@/app/gamification/GamifiedProgressTracker';
import { JobsCreatedCounter } from '@/app/intelligence/JobsCreatedCounter';

interface InvestorArenaProps {
  onBack: () => void;
}

export function InvestorArena({ onBack }: InvestorArenaProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-purple-50/30">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Overview
          </button>
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Investor Arena</h1>
              <p className="text-gray-600 mt-1">
                Track your performance, unlock achievements, and compete globally
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Prestige Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl">🎖️</div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Welcome to the Arena
              </h2>
              <p className="text-sm text-gray-600">
                Your investment performance, achievements, and global ranking — all in one prestige chamber. 
                Complete milestones, climb the leaderboard, and demonstrate platform excellence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Gamified Progress Tracker - Full Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GamifiedProgressTracker />
        </motion.div>

        {/* Jobs Created Counter - Expanded View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <JobsCreatedCounter compact={false} animated={true} />
        </motion.div>

        {/* Performance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📊 Your Investment Impact
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600">$5.2M</div>
              <div className="text-sm text-gray-600 mt-2">Total Investment Committed</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl">
              <div className="text-3xl font-bold text-green-600">142</div>
              <div className="text-sm text-gray-600 mt-2">Jobs Created</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600">47</div>
              <div className="text-sm text-gray-600 mt-2">Global Rank</div>
            </div>
          </div>
        </motion.div>

        {/* Why Arena Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            💡 Why competitive performance matters
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Higher ranks unlock priority support and faster processing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Achievement badges demonstrate commitment to officers reviewing your case</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Global leaderboard visibility attracts partnership opportunities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>XP points reflect your platform expertise and compliance history</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
