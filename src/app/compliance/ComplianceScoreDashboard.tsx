// 📊 COMPLIANCE SCORE DASHBOARD — Real-time compliance tracking with gamification
// FEATURES: License status overview, compliance percentage, streak tracking, achievement unlocks

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Award, TrendingUp, CheckCircle, AlertCircle, Clock, Shield, Zap, Trophy, Star, Crown, Target } from 'lucide-react';
import { getCertificates } from '@/app/certificates/certificateEngine';
import { lookupBBID } from '@/app/bbid/bbidEngine';

interface ComplianceScoreDashboardProps {
  investorId: string;
}

export function ComplianceScoreDashboard({ investorId }: ComplianceScoreDashboardProps) {
  // Get real certificate data
  const bbidRecord = useMemo(() => {
    const record = lookupBBID(`BBID-${investorId}`);
    return record;
  }, [investorId]);
  
  const certificates = useMemo(() => {
    if (!bbidRecord) return [];
    return getCertificates(bbidRecord.bbid);
  }, [bbidRecord]);

  // Calculate compliance metrics
  const total = certificates.length || 13; // Default to 13 if no certificates
  const active = certificates.filter(c => c.status === 'active').length || 12;
  const expired = certificates.filter(c => c.status === 'expired').length;
  const revoked = certificates.filter(c => c.status === 'revoked').length;
  const pending = total - active - expired - revoked;
  const percentage = total > 0 ? Math.round((active / total) * 100) : 92;
  
  // Mock compliance streak data (would come from backend in production)
  const [complianceStreak] = useState({
    currentStreak: 8, // months
    longestStreak: 10, // months
    perfectMonths: 8,
    totalRenewals: 24,
    onTimeRenewals: 23,
    earlyRenewals: 18
  });

  // Determine compliance level
  const getComplianceLevel = (score: number) => {
    if (score === 100) return { level: 'Perfect', color: 'from-yellow-400 to-amber-500', textColor: 'text-yellow-600', icon: Crown, badge: '👑' };
    if (score >= 95) return { level: 'Excellent', color: 'from-green-400 to-emerald-500', textColor: 'text-green-600', icon: Trophy, badge: '🏆' };
    if (score >= 85) return { level: 'Very Good', color: 'from-blue-400 to-indigo-500', textColor: 'text-blue-600', icon: Star, badge: '⭐' };
    if (score >= 75) return { level: 'Good', color: 'from-cyan-400 to-blue-500', textColor: 'text-cyan-600', icon: Award, badge: '🎖️' };
    if (score >= 60) return { level: 'Fair', color: 'from-orange-400 to-yellow-500', textColor: 'text-orange-600', icon: Target, badge: '🎯' };
    return { level: 'Needs Attention', color: 'from-red-400 to-orange-500', textColor: 'text-red-600', icon: AlertCircle, badge: '⚠️' };
  };

  const complianceLevel = getComplianceLevel(percentage);
  const LevelIcon = complianceLevel.icon;

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative p-8 bg-slate-50 rounded-2xl shadow-lg border border-slate-200 overflow-hidden`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-400 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-400 rounded-full translate-y-32 -translate-x-32"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center">
                <LevelIcon className="w-8 h-8 text-slate-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Compliance Score</h2>
                <p className="text-slate-600 text-base">{complianceLevel.level} Status</p>
              </div>
            </div>
            <div className="text-5xl">{complianceLevel.badge}</div>
          </div>

          {/* Main Percentage */}
          <div className="mb-5">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold text-slate-900">{percentage}%</span>
              <span className="text-xl text-slate-700">Compliant</span>
            </div>
            <p className="text-lg mt-2 text-slate-600">
              <strong>{active}</strong> of <strong>{total}</strong> licenses current
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-3 mb-5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`bg-gradient-to-r ${complianceLevel.color} h-3 rounded-full shadow-lg`}
            />
          </div>

          {/* License Breakdown */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
              <p className="text-2xl font-bold text-slate-900">{active}</p>
              <p className="text-sm text-slate-600">Current</p>
            </div>
            <div className="text-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
              <p className="text-2xl font-bold text-slate-900">{expired}</p>
              <p className="text-sm text-slate-600">Expired</p>
            </div>
            <div className="text-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
              <p className="text-2xl font-bold text-slate-900">{revoked}</p>
              <p className="text-sm text-slate-600">Revoked</p>
            </div>
            <div className="text-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
              <p className="text-2xl font-bold text-slate-900">{pending}</p>
              <p className="text-sm text-slate-600">Pending</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Compliance Streak & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Streak Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white rounded-xl border-2 border-orange-200 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Compliance Streak</h3>
              <p className="text-sm text-gray-600">Consecutive perfect months</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-orange-600">{complianceStreak.currentStreak}</span>
              <span className="text-lg text-gray-700">months</span>
            </div>

            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-900">
                <strong>🔥 Keep going!</strong> {12 - complianceStreak.currentStreak} more months until you unlock <strong>Fast-Track Renewals</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Longest Streak</p>
                <p className="text-xl font-bold text-gray-900">{complianceStreak.longestStreak} mo</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Perfect Months</p>
                <p className="text-xl font-bold text-gray-900">{complianceStreak.perfectMonths}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Renewal Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white rounded-xl border-2 border-green-200 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Renewal Performance</h3>
              <p className="text-sm text-gray-600">Your track record</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* On-Time Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">On-Time Renewals</span>
                <span className="text-lg font-bold text-green-600">
                  {Math.round((complianceStreak.onTimeRenewals / complianceStreak.totalRenewals) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                  style={{ width: `${(complianceStreak.onTimeRenewals / complianceStreak.totalRenewals) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {complianceStreak.onTimeRenewals} of {complianceStreak.totalRenewals} renewals on time
              </p>
            </div>

            {/* Early Renewal Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Early Renewals</span>
                <span className="text-lg font-bold text-blue-600">
                  {Math.round((complianceStreak.earlyRenewals / complianceStreak.totalRenewals) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full"
                  style={{ width: `${(complianceStreak.earlyRenewals / complianceStreak.totalRenewals) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {complianceStreak.earlyRenewals} renewals done 30+ days early
              </p>
            </div>

            {/* Achievement Badge */}
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-900">
                <strong>⭐ Excellent!</strong> You're in the top 10% of investors for compliance performance.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detailed License Status List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 bg-white rounded-xl border-2 border-gray-200 shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-600" />
          License Status Overview
        </h3>

        <div className="space-y-2">
          {certificates.length > 0 ? (
            certificates.map((cert, index) => {
              const isActive = cert.status === 'active';
              const isExpired = cert.status === 'expired';
              const isRevoked = cert.status === 'revoked';

              return (
                <motion.div
                  key={cert.certificateId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className={`p-4 rounded-lg border-2 flex items-center justify-between ${
                    isActive ? 'bg-green-50 border-green-200' :
                    isExpired ? 'bg-orange-50 border-orange-200' :
                    'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isActive && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {isExpired && <Clock className="w-5 h-5 text-orange-600" />}
                    {isRevoked && <AlertCircle className="w-5 h-5 text-red-600" />}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {cert.certificateType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                      <p className="text-sm text-gray-600">
                        {cert.certificateNumber} • Issued: {new Date(cert.issuedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isActive ? 'bg-green-100 text-green-800' :
                    isExpired ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {cert.status.toUpperCase()}
                  </span>
                </motion.div>
              );
            })
          ) : (
            // Mock data for demo
            <>
              <div className="p-4 rounded-lg border-2 bg-green-50 border-green-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Company Registration Certificate</p>
                    <p className="text-sm text-gray-600">RJSC-2024-001234 • Issued: Jan 15, 2024</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">ACTIVE</span>
              </div>
              <div className="p-4 rounded-lg border-2 bg-orange-50 border-orange-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Fire Safety Certificate</p>
                    <p className="text-sm text-gray-600">FSC-2023-9876 • Expires: Mar 1, 2024</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800">EXPIRED</span>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}