// 📸 SLA SNAPSHOT — Quick preview of service performance for investors
// ARCHITECTURE: UI layer. Reads slaEngine for quick metrics (compact version of SLADashboard).

import React from 'react';
import { getSLAOverview } from './slaEngine';
import { glassCard } from '@/app/config/designSystem';
import { 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  ExternalLink,
  Activity
} from 'lucide-react';
import { useLanguage } from '@/app/components/LanguageContext';

export function SLASnapshot() {
  const { language } = useLanguage();
  
  // 🎯 DEMO-ONLY: Chinese translations
  const zh: Record<string, string> = {
    servicePerformanceTransparency: '服务绩效透明度',
    realTimeSLAMetrics: '所有政府机构的实时SLA指标',
    viewFullDashboard: '查看完整仪表板',
    agencies: '机构',
    onTime: '准时',
    avgDays: '平均天数',
    breaches: '违规',
    transparencyBuilds: '透明度建立信任：',
    allServiceMetrics: '所有服务交付指标都实时发布。这是您的问责保证。'
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
    
    // Handle decimals
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
    
    // For larger numbers, convert digit by digit
    return String(n).split('').map(d => d === '.' ? '点' : digits[parseInt(d)] || d).join('');
  };
  
  // 🔌 ENGINE DEPENDENCY: Reads from slaEngine
  const overview = getSLAOverview();

  return (
    <div className={glassCard['p-6']}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            {t('servicePerformanceTransparency', 'Service Performance Transparency')}
          </h3>
          <p className="text-sm text-gray-600">
            {t('realTimeSLAMetrics', 'Real-time SLA metrics across all government agencies')}
          </p>
        </div>
        <a
          href="/transparency"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          {t('viewFullDashboard', 'View Full Dashboard')}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Agencies */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/50">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-blue-900 font-medium">{t('agencies', 'Agencies')}</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">
            {toChineseNumber(overview.totalAgencies)}
          </p>
        </div>

        {/* On-Time Percentage */}
        <div className="p-4 rounded-xl bg-green-50 border border-green-200/50">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-900 font-medium">{t('onTime', 'On-Time')}</span>
          </div>
          <p className="text-2xl font-bold text-green-900">
            {toChineseNumber(overview.overallOnTimePercentage)}%
          </p>
        </div>

        {/* Average Completion Days */}
        <div className="p-4 rounded-xl bg-purple-50 border border-purple-200/50">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-purple-600" />
            <span className="text-xs text-purple-900 font-medium">{t('avgDays', 'Avg. Days')}</span>
          </div>
          <p className="text-2xl font-bold text-purple-900">
            {toChineseNumber(overview.avgCompletionDays)}d
          </p>
        </div>

        {/* SLA Breaches */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <span className="text-xs text-amber-900 font-medium">{t('breaches', 'Breaches')}</span>
          </div>
          <p className="text-2xl font-bold text-amber-900">
            {toChineseNumber(overview.totalSLABreaches)}
          </p>
        </div>
      </div>

      {/* Trust Message */}
      <div className="mt-4 p-3 bg-white/50 rounded-lg border border-gray-200/50">
        <p className="text-xs text-gray-700">
          ✅ <strong>{t('transparencyBuilds', 'Transparency builds trust:')}</strong> {t('allServiceMetrics', 'All service delivery metrics are published in real-time. This is your guarantee of accountability.')}
        </p>
      </div>
    </div>
  );
}