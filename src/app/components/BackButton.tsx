/**
 * 🔙 UNIVERSAL BACK BUTTON
 * Appears on every screen for easy navigation
 */

import { ArrowLeft } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface BackButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
}

export function BackButton({ onClick, label, className = '' }: BackButtonProps) {
  const { t } = useLanguage();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      // Default: go back in browser history
      window.history.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label || t('common.back')}
    </button>
  );
}

/**
 * Floating Back Button (always visible in bottom-left)
 */
export function FloatingBackButton({ onClick }: { onClick?: () => void }) {
  const { t } = useLanguage();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      window.history.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-2xl transition-all hover:scale-105"
      title={t('common.back')}
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="hidden sm:inline">{t('common.back')}</span>
    </button>
  );
}
