import { Building2 } from 'lucide-react';
import { useLanguage } from '@/app/components/LanguageContext';

interface BankBadgeProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export function BankBadge({ size = 'md', showIcon = true, className = '' }: BankBadgeProps) {
  const { language } = useLanguage();
  
  // 🎯 DEMO-ONLY: Chinese translations
  const zh: Record<string, string> = {
    connected: '已连接',
    bracBank: '布拉克银行'
  };
  
  const t = (key: string, fallback: string) => {
    if (language === 'zh') {
      return zh[key] || fallback;
    }
    return fallback;
  };

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const iconSizes = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 
        rounded-full 
        border border-[#e3ebf7] 
        bg-white/60 backdrop-blur-xl
        text-[#3b82f6] font-medium
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {showIcon && <Building2 className={iconSizes[size]} />}
      <span>{t('bracBank', 'BRAC Bank')}</span>
      <span className="text-emerald-600">✓ {t('connected', 'Connected')}</span>
    </span>
  );
}

interface BankReadinessBadgeProps {
  complete: boolean;
  label: string;
  size?: 'xs' | 'sm' | 'md';
}

export function BankReadinessBadge({ complete, label, size = 'md' }: BankReadinessBadgeProps) {
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 
        rounded-xl 
        border 
        font-medium
        ${complete 
          ? 'border-[#10b981] bg-[#10b981]/10 text-[#10b981]' 
          : 'border-[#e3ebf7] bg-white/60 backdrop-blur-xl text-slate-400'
        }
        ${sizeClasses[size]}
      `}
    >
      {complete && <span>✓</span>}
      {label}
    </span>
  );
}