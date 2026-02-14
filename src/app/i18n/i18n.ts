/**
 * 🌐 I18N ENGINE — Internationalization System
 * LANGUAGES: English (en), Bengali (bn), Chinese (zh), Dutch (nl), Korean (ko)
 * ARCHITECTURE: Client-side translation with JSON language files
 */

import enTranslations from './translations/en.json';
import bnTranslations from './translations/bn.json';
import zhTranslations from './translations/zh.json';

export type Language = 'en' | 'bn' | 'zh' | 'nl' | 'ko';

interface Translations {
  [key: string]: string | Translations;
}

const translations: Record<Language, Translations> = {
  en: enTranslations,
  bn: bnTranslations,
  zh: zhTranslations,
  nl: enTranslations, // Fallback to English for now
  ko: enTranslations, // Fallback to English for now
};

/**
 * Current language state
 */
let currentLanguage: Language = 'en';

/**
 * 🔄 SET LANGUAGE
 */
export function setLanguage(language: Language) {
  currentLanguage = language;
  
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('bida-language', language);
  }
}

/**
 * 🌍 GET CURRENT LANGUAGE
 */
export function getCurrentLanguage(): Language {
  // Check localStorage on first load
  if (typeof window !== 'undefined' && currentLanguage === 'en') {
    const saved = localStorage.getItem('bida-language') as Language | null;
    if (saved && ['en', 'bn', 'zh', 'nl', 'ko'].includes(saved)) {
      currentLanguage = saved;
    }
  }
  
  return currentLanguage;
}

/**
 * 🔍 GET NESTED VALUE FROM OBJECT
 */
function getNestedValue(obj: Translations, path: string): string | undefined {
  const keys = path.split('.');
  let current: any = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  
  return typeof current === 'string' ? current : undefined;
}

/**
 * 📝 TRANSLATE FUNCTION
 * Usage: t('common.dashboard') → 'Dashboard'
 * Usage: t('investor.title') → 'Investor Dashboard'
 */
export function t(key: string, fallback?: string): string {
  const lang = getCurrentLanguage();
  const translation = getNestedValue(translations[lang], key);
  
  if (translation) {
    return translation;
  }
  
  // Fallback to English
  if (lang !== 'en') {
    const enTranslation = getNestedValue(translations.en, key);
    if (enTranslation) {
      return enTranslation;
    }
  }
  
  // Return fallback or key itself
  return fallback || key;
}

/**
 * 🌐 LANGUAGE METADATA
 */
export const LANGUAGES: Record<Language, { name: string; nativeName: string; flag: string }> = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
  },
  bn: {
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇧🇩',
  },
  zh: {
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
  },
  nl: {
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: '🇳🇱',
  },
  ko: {
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
  },
};

/**
 * 🎨 LANGUAGE SWITCHER COMPONENT (React Hook)
 */
export function useLanguage() {
  const [language, setLang] = React.useState<Language>(getCurrentLanguage());
  
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setLang(lang);
    
    // Trigger re-render of components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('languagechange'));
    }
  };
  
  return { language, changeLanguage, t };
}

// Import React for the hook
import React from 'react';
