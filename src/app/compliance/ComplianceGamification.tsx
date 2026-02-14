// 🏆 COMPLIANCE GAMIFICATION — Achievement tracking and unlockable benefits
// FEATURES: Achievement badges, progress tracking, benefit unlocks, leaderboard position

import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Star, Zap, Target, Crown, CheckCircle, Lock, TrendingUp, Gift, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Achievement {
  id: string;
  title: string;
  description: string;
  requirement: string;
  benefit: string;
  icon: typeof Trophy;
  progress: number;
  total: number;
  unlocked: boolean;
  unlockedDate?: Date;
  color: string;
  badgeEmoji: string;
}

export function ComplianceGamification() {
  const [achievements] = useState<Achievement[]>([
    {
      id: 'perfect-compliance-3mo',
      title: '3-Month Perfect Compliance',
      description: 'Maintain 100% compliance for 3 consecutive months',
      requirement: '3 months at 100%',
      benefit: 'Priority support hotline access',
      icon: Star,
      progress: 3,
      total: 3,
      unlocked: true,
      unlockedDate: new Date('2025-11-15'),
      color: 'from-blue-400 to-indigo-500',
      badgeEmoji: '⭐'
    },
    {
      id: 'perfect-compliance-6mo',
      title: '6-Month Perfect Compliance',
      description: 'Maintain 100% compliance for 6 consecutive months',
      requirement: '6 months at 100%',
      benefit: '10% discount on all renewal fees',
      icon: Award,
      progress: 6,
      total: 6,
      unlocked: true,
      unlockedDate: new Date('2026-01-15'),
      color: 'from-purple-400 to-pink-500',
      badgeEmoji: '🎖️'
    }
  ]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalBenefitValue = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => {
      // Estimate benefit value
      if (a.benefit.includes('discount')) return sum + 500;
      if (a.benefit.includes('Fast-track')) return sum + 2000;
      if (a.benefit.includes('Lifetime')) return sum + 5000;
      return sum + 100;
    }, 0);

  const handleClaimBenefit = (achievement: Achievement) => {
    toast.success(`Benefit Claimed!`, {
      description: `${achievement.benefit} is now active on your account.`,
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Achievements</p>
              <p className="text-3xl font-bold text-gray-900">
                {unlockedCount} <span className="text-lg text-gray-600">/ {achievements.length}</span>
              </p>
            </div>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2 mt-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <Gift className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Benefits Unlocked</p>
              <p className="text-3xl font-bold text-gray-900">{unlockedCount}</p>
            </div>
          </div>
          <p className="text-xs text-green-700 mt-2">
            Estimated value: <strong>BDT {totalBenefitValue.toLocaleString()}</strong> saved
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Next Unlock</p>
              <p className="text-xl font-bold text-gray-900">4 months</p>
            </div>
          </div>
          <p className="text-xs text-orange-700 mt-2">
            Until <strong>Compliance Champion</strong> 👑
          </p>
        </motion.div>
      </div>

      {/* Achievement Cards */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          Your Achievements
        </h3>

        <div className="space-y-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const progressPercent = (achievement.progress / achievement.total) * 100;

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-5 rounded-xl border-2 transition-all shadow-sm ${
                  achievement.unlocked
                    ? 'bg-green-50 border-green-300'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${
                    achievement.unlocked
                      ? 'bg-green-100'
                      : achievement.progress > 0
                      ? 'bg-gray-100'
                      : 'bg-gray-50'
                  }`}>
                    {achievement.unlocked ? (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : (
                      <Icon className={`w-8 h-8 ${achievement.progress > 0 ? 'text-gray-600' : 'text-gray-400'}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className={`text-lg font-bold ${achievement.unlocked ? 'text-green-900' : 'text-gray-900'} flex items-center gap-2`}>
                          {achievement.title}
                          <span className="text-xl">{achievement.badgeEmoji}</span>
                        </h4>
                        <p className={`text-sm ${achievement.unlocked ? 'text-green-700' : 'text-gray-600'} mt-1`}>
                          {achievement.description}
                        </p>
                      </div>

                      {achievement.unlocked ? (
                        <span className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-full flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          UNLOCKED
                        </span>
                      ) : (
                        <span className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-bold rounded-full flex items-center gap-1">
                          <Lock className="w-4 h-4" />
                          Locked
                        </span>
                      )}
                    </div>

                    {/* Progress Bar (for locked achievements) */}
                    {!achievement.unlocked && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-semibold text-gray-900">
                            {achievement.progress} / {achievement.total}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`bg-gradient-to-r ${achievement.color} h-3 rounded-full`}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{achievement.requirement}</p>
                      </div>
                    )}

                    {/* Unlocked Date */}
                    {achievement.unlocked && achievement.unlockedDate && (
                      <p className="text-sm text-green-800 mb-3">
                        Unlocked on {achievement.unlockedDate.toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    )}

                    {/* Benefit Box */}
                    <div className={`p-4 rounded-lg ${
                      achievement.unlocked
                        ? 'bg-green-100 border border-green-200'
                        : 'bg-blue-50 border border-blue-200'
                    }`}>
                      <p className={`text-sm mb-2 ${achievement.unlocked ? 'text-green-900' : 'text-blue-900'}`}>
                        <strong className="flex items-center gap-1">
                          <Gift className="w-4 h-4" />
                          Benefit:
                        </strong>
                      </p>
                      <p className={`text-sm ${achievement.unlocked ? 'text-green-800' : 'text-blue-800'}`}>
                        {achievement.benefit}
                      </p>

                      {achievement.unlocked && (
                        <button
                          onClick={() => handleClaimBenefit(achievement)}
                          className="mt-3 px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-opacity-90 transition-all text-sm w-full flex items-center justify-center gap-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          View Benefit Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard Teaser */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Leaderboard Position</h3>
              <p className="text-sm text-gray-600">You're in the top 10% of all investors</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              #12
            </p>
            <p className="text-sm text-gray-600">out of 1,247</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}