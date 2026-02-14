// 🧭 NEXT BEST ACTION PANEL — Journey Guidance UI Component
// ARCHITECTURE: Global intelligence ribbon that appears across all tabs
// This removes thinking - the system tells the investor what to do next

import { ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { getNextBestAction, type TabType, type InvestorState } from '@/app/intelligence/journeyGuidanceEngine';
import { motion } from 'motion/react';
import { useLanguage } from '@/app/components/LanguageContext';

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
  
  const { language } = useLanguage();
  
  // 🎯 DEMO-ONLY: Chinese translations for key UI text
  const zh: Record<string, string> = {
    recommendedNextStep: '推荐的下一步',
    urgent: '紧急',
    // Action translations
    'Upload Certificate of Incorporation': '上传公司注册证书',
    'Your incorporation certificate is required to verify your company registration and proceed with approvals.': '您的公司注册证书是验证公司注册和继续批准所必需的。',
    'Upload Certificate': '上传证书',
    'Upload Passport Copy': '上传护照副本',
    'Your passport is required for identity verification and visa processing. Upload a clear, color copy.': '您的护照是身份验证和签证处理所必需的。请上传清晰的彩色副本。',
    'Upload Passport': '上传护照',
    'Complete Your Banking Setup': '完成您的银行设置',
    'Open Business Account': '开设企业账户',
    'Submit Tax Registration': '提交税务登记',
    'Register for Tax': '注册税务',
    'Apply for Trade License': '申请贸易许可证',
    'Apply Now': '立即申请',
    'Complete Environmental Clearance': '完成环境许可',
    'Start Application': '开始申请'
  };
  
  const t = (key: string, fallback: string) => {
    if (language === 'zh' && currentTab === 'overview') {
      return zh[key] || fallback;
    }
    return fallback;
  };
  
  // Get next best action from intelligence engine
  const state: InvestorState = { investorId, bbid, currentTab };
  const action = getNextBestAction(state);
  
  // Translate action data
  const translatedAction = {
    ...action,
    title: t(action.title, action.title),
    description: t(action.description, action.description),
    ctaLabel: t(action.ctaLabel, action.ctaLabel)
  };

  // Handle CTA click
  const handleClick = () => {
    // If on same tab and scroll target exists, scroll instead of navigate
    if (currentTab === action.targetTab && action.scrollTarget && onScroll) {
      onScroll(action.scrollTarget);
    } else {
      onNavigate(action.targetTab);
    }
  };

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
      iconColor: 'text-red-600'
    },
    high: {
      borderColor: 'border-blue-200/40',
      bgColor: 'bg-blue-50/40',
      textColor: 'text-blue-900',
      descColor: 'text-blue-700',
      labelColor: 'text-blue-800',
      buttonColor: 'bg-blue-700 hover:bg-blue-800',
      icon: Sparkles,
      iconColor: 'text-blue-600'
    },
    medium: {
      borderColor: 'border-amber-200/40',
      bgColor: 'bg-amber-50/40',
      textColor: 'text-amber-900',
      descColor: 'text-amber-700',
      labelColor: 'text-amber-800',
      buttonColor: 'bg-amber-600 hover:bg-amber-700',
      icon: Sparkles,
      iconColor: 'text-amber-600'
    },
    low: {
      borderColor: 'border-emerald-200/40',
      bgColor: 'bg-emerald-50/40',
      textColor: 'text-emerald-900',
      descColor: 'text-emerald-700',
      labelColor: 'text-emerald-800',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600'
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
          <p className={`text-sm ${config.labelColor} mb-1 font-medium`}>
            {t('recommendedNextStep', 'Recommended Next Step')}
          </p>
          <h3 className={`text-lg font-semibold ${config.textColor} mb-2`}>
            {translatedAction.title}
          </h3>
          <p className={`text-sm ${config.descColor} mb-4 leading-relaxed`}>
            {translatedAction.description}
          </p>
          <button
            onClick={handleClick}
            className={`px-5 py-2.5 ${config.buttonColor} text-white rounded-lg font-medium transition-colors flex items-center gap-2 group`}
          >
            {translatedAction.ctaLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Priority Badge */}
        {action.priority === 'critical' && (
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
              {t('urgent', 'Urgent')}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}