/**
 * 📊 PROFESSIONAL PROGRESS TRACKING SYSTEM
 * 
 * Government-grade progress tracking with:
 * - Clean milestone visualization
 * - Professional status indicators
 * - Certification tracking
 * - Timeline management
 * - Performance metrics
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle,
  Clock,
  Award,
  TrendingUp,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/app/components/LanguageContext';

interface MilestoneStep {
  id: string;
  name: string;
  completed: boolean;
  stepNumber: number;
  icon: string;
}

interface Certification {
  id: string;
  title: string;
  description: string;
  icon: string;
  achieved: boolean;
  achievedDate?: Date;
}

interface ProgressMetrics {
  yourProgress: number;
  averageProgress: number;
  estimatedCompletion: string;
}

export function GamifiedProgressTracker() {
  const { language } = useLanguage();
  
  // 🎯 DEMO-ONLY: Chinese translations
  const zh: Record<string, string> = {
    applicationProgress: '申请进度',
    milestonesCompleted: '个里程碑已完成',
    of: '的',
    overallProgress: '总体进度',
    completed: '已完成',
    pending: '待处理',
    total: '总计',
    applicationMilestones: '申请里程碑',
    inProgress: '进行中',
    businessRegistration: '企业注册',
    taxRegistration: '税务登记',
    bankAccountOpened: '银行账户已开通',
    tradeLicenseApproved: '贸易许可证已批准',
    environmentalClearance: '环境许可',
    factoryInspection: '工厂检查',
    businessOperational: '企业运营',
    certificationsRecognitions: '认证与表彰',
    expeditedProcessing: '加急处理',
    completedInitialRegistration: '在四十八小时内完成初始注册',
    achieved: '达成',
    complianceExcellence: '合规卓越',
    maintained100Compliance: '保持一百%合规率十二个月',
    sectorPioneer: '行业先锋',
    firstPharmaceuticalCompany: '首家通过OSS注册的制药公司',
    performanceMetrics: '绩效指标',
    progressComparison: '进度比较',
    yourProgress: '您的进度',
    averageProgress: '平均进度',
    timelineStatus: '时间线状态',
    estCompletion: '预计完成',
    days: '天',
    status: '状态',
    onTrack: '按计划进行'
  };
  
  const t = (key: string, fallback: string) => {
    if (language === 'zh') {
      return zh[key] || fallback;
    }
    return fallback;
  };

  // 🎯 CHINESE NUMBER CONVERTER
  const toChineseNumber = (num: number | string): string => {
    if (language !== 'zh') return String(num);
    
    const n = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(n)) return String(num);
    
    const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    
    // Handle decimals separately
    if (n !== Math.floor(n)) {
      const [integer, decimal] = String(n).split('.');
      const intChinese = toChineseNumber(parseInt(integer));
      const decChinese = decimal.split('').map(d => digits[parseInt(d)]).join('');
      return `${intChinese}点${decChinese}`;
    }
    
    // Simple numbers 0-99
    if (n === 0) return '零';
    if (n < 10) return digits[n];
    if (n === 10) return '十';
    if (n < 20) return '十' + digits[n % 10];
    if (n < 100) {
      const tens = Math.floor(n / 10);
      const ones = n % 10;
      return digits[tens] + '十' + (ones > 0 ? digits[ones] : '');
    }
    
    // For larger numbers, convert digit by digit for simplicity
    return String(n).split('').map(d => d === '.' ? '点' : digits[parseInt(d)] || d).join('');
  };

  // 🎯 DATE FORMATTER FOR CHINESE
  const formatDate = (date: Date): string => {
    if (language === 'zh') {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${toChineseNumber(year)}年${toChineseNumber(month)}月${toChineseNumber(day)}日`;
    }
    return date.toLocaleDateString();
  };

  // Progress state (0-100%)
  const [targetProgress, setTargetProgress] = useState(43); // Example: 43% complete

  // Application milestones - use useMemo to react to language changes
  const milestones = React.useMemo<MilestoneStep[]>(() => [
    { id: 'base', name: t('businessRegistration', 'Business Registration'), completed: true, stepNumber: 1, icon: '📋' },
    { id: 'tax', name: t('taxRegistration', 'Tax Registration'), completed: true, stepNumber: 2, icon: '📄' },
    { id: 'bank', name: t('bankAccountOpened', 'Bank Account Opened'), completed: true, stepNumber: 3, icon: '🏦' },
    { id: 'license', name: t('tradeLicenseApproved', 'Trade License Approved'), completed: false, stepNumber: 4, icon: '✓' },
    { id: 'environment', name: t('environmentalClearance', 'Environmental Clearance'), completed: false, stepNumber: 5, icon: '🌱' },
    { id: 'inspection', name: t('factoryInspection', 'Factory Inspection'), completed: false, stepNumber: 6, icon: '🏭' },
    { id: 'operational', name: t('businessOperational', 'Business Operational'), completed: false, stepNumber: 7, icon: '✓' }
  ], [language]);

  // Professional certifications - use useMemo to react to language changes
  const certifications = React.useMemo<Certification[]>(() => [
    {
      id: 'fast-track',
      title: t('expeditedProcessing', 'Expedited Processing'),
      description: t('completedInitialRegistration', 'Completed initial registration in 48 hours'),
      icon: '⚡',
      achieved: true,
      achievedDate: new Date('2026-02-10')
    },
    {
      id: 'compliance',
      title: t('complianceExcellence', 'Compliance Excellence'),
      description: t('maintained100Compliance', 'Maintained 100% compliance rate for 12 months'),
      icon: '✓',
      achieved: false
    },
    {
      id: 'pioneer',
      title: t('sectorPioneer', 'Sector Pioneer'),
      description: t('firstPharmaceuticalCompany', 'First pharmaceutical company registered via OSS'),
      icon: '★',
      achieved: true,
      achievedDate: new Date('2026-01-15')
    }
  ], [language]);

  // Progress metrics
  const metrics: ProgressMetrics = {
    yourProgress: 43,
    averageProgress: 38,
    estimatedCompletion: language === 'zh' ? `${toChineseNumber(18)} 天` : '18 days'
  };

  // Calculate progress
  const completedSteps = milestones.filter(s => s.completed).length;
  const totalSteps = milestones.length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="space-y-6">
      {/* Main Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-200 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{t('applicationProgress', 'Application Progress')}</h2>
            <p className="text-sm text-gray-600">{toChineseNumber(completedSteps)} {t('of', 'of')} {toChineseNumber(totalSteps)} {t('milestonesCompleted', 'milestones completed')}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">{t('overallProgress', 'Overall Progress')}</span>
            <span className="text-lg font-semibold text-blue-600">{toChineseNumber(progressPercentage)}%</span>
          </div>
          
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xl font-semibold text-green-600">{toChineseNumber(completedSteps)}</p>
              <p className="text-xs text-gray-600">{t('completed', 'Completed')}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xl font-semibold text-orange-600">{toChineseNumber(totalSteps - completedSteps)}</p>
              <p className="text-xs text-gray-600">{t('pending', 'Pending')}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xl font-semibold text-blue-600">{toChineseNumber(totalSteps)}</p>
              <p className="text-xs text-gray-600">{t('total', 'Total')}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Application Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('applicationMilestones', 'Application Milestones')}</h3>

        <div className="space-y-3">
          {milestones.map((step, idx) => {
            const isActive = step.completed;
            const isCurrent = !step.completed && (idx === 0 || milestones[idx - 1]?.completed);
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-green-50 border-green-200'
                    : isCurrent
                    ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-100'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                {/* Step Number */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  isActive ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {toChineseNumber(step.stepNumber)}
                </div>

                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                  isActive ? 'bg-white' : 'bg-gray-100'
                }`}>
                  {step.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className={`font-medium ${isActive ? 'text-green-900' : isCurrent ? 'text-blue-900' : 'text-gray-600'}`}>
                    {step.name}
                  </h4>
                  {isCurrent && (
                    <p className="text-xs text-blue-600 font-medium mt-1">{t('inProgress', 'In Progress')}</p>
                  )}
                </div>

                {/* Status */}
                {isActive ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : isCurrent ? (
                  <Clock className="w-5 h-5 text-blue-600" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Certifications & Recognitions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('certificationsRecognitions', 'Certifications & Recognitions')}</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
            {toChineseNumber(certifications.filter(c => c.achieved).length)} / {toChineseNumber(certifications.length)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-xl border ${
                cert.achieved
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-gray-50 border-gray-200 opacity-50'
              }`}
            >
              <div className="text-3xl mb-2 text-center">{cert.icon}</div>
              <h4 className={`font-semibold text-sm text-center mb-1 ${cert.achieved ? 'text-gray-900' : 'text-gray-500'}`}>
                {cert.title}
              </h4>
              <p className={`text-xs text-center ${cert.achieved ? 'text-gray-600' : 'text-gray-400'}`}>
                {cert.description}
              </p>

              {cert.achieved && cert.achievedDate && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-xs text-gray-600 text-center">
                    {t('achieved', 'Achieved')} {formatDate(cert.achievedDate)}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('performanceMetrics', 'Performance Metrics')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Progress Comparison */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-700 text-sm">{t('progressComparison', 'Progress Comparison')}</span>
              <FileCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">{t('yourProgress', 'Your Progress')}</span>
                  <span className="font-semibold text-blue-600">{toChineseNumber(metrics.yourProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metrics.yourProgress}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">{t('averageProgress', 'Average Progress')}</span>
                  <span className="font-semibold text-gray-600">{toChineseNumber(metrics.averageProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-400 rounded-full"
                    style={{ width: `${metrics.averageProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Status */}
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-700 text-sm">{t('timelineStatus', 'Timeline Status')}</span>
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                <span className="text-xs text-gray-600">{t('estCompletion', 'Est. Completion')}</span>
                <span className="font-semibold text-gray-900 text-sm">{metrics.estimatedCompletion}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                <span className="text-xs text-gray-600">{t('status', 'Status')}</span>
                <span className="font-semibold text-green-600 text-sm">{t('onTrack', 'On Track')}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}