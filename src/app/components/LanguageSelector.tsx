import { useLanguage, Language } from './LanguageContext';
import { Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { LANGUAGE_NAMES } from '@/app/i18n/completeTranslations';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en' as const, label: 'English', flag: '🇬🇧' },
    { code: 'nl' as const, label: 'Nederlands', flag: '🇳🇱' },
    { code: 'zh' as const, label: '中文', flag: '🇨🇳' },
    { code: 'ko' as const, label: '한국어', flag: '🇰🇷' },
  ];

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-[#475569]" />
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-2 rounded-lg transition-all ${
            language === lang.code
              ? 'bg-[#3b82f6] text-white shadow-md'
              : 'bg-white/50 hover:bg-white/80 text-[#475569]'
          }`}
          title={lang.label}
        >
          <span className="text-lg">{lang.flag}</span>
        </motion.button>
      ))}
    </div>
  );
}