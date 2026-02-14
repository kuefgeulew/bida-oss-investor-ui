// 🌍 ENHANCED LANGUAGE SELECTOR — 6 Language Support (EN, NL, ZH, KO, JA, HI)
// NEW: Japanese & Hindi support added

import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { EXTENDED_LANGUAGE_NAMES, LANGUAGE_FLAGS, ExtendedLanguage } from '@/app/i18n/extendedLanguages';

export function LanguageSelectorENHANCED() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: ExtendedLanguage[] = ['en', 'nl', 'zh', 'ko', 'ja', 'hi'];

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as any);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md hover:bg-white/80 rounded-lg transition-all border border-white/20 shadow-sm"
        aria-label="Select Language"
      >
        <Globe className="w-5 h-5 text-gray-700" />
        <span className="text-2xl">{LANGUAGE_FLAGS[language as ExtendedLanguage] || '🇬🇧'}</span>
        <span className="text-sm font-medium text-gray-700">
          {EXTENDED_LANGUAGE_NAMES[language as ExtendedLanguage] || 'English'}
        </span>
        <svg
          className={`w-4 h-4 text-gray-700 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
            <div className="p-2 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
              <p className="text-xs font-medium text-gray-600 px-3 py-1">
                Select Language / 选择语言 / 언어 선택
              </p>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors ${
                    language === lang ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                  }`}
                >
                  <span className="text-3xl">{LANGUAGE_FLAGS[lang]}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">
                      {EXTENDED_LANGUAGE_NAMES[lang]}
                    </div>
                    <div className="text-xs text-gray-500">
                      {lang === 'en' && 'English'}
                      {lang === 'nl' && 'Dutch'}
                      {lang === 'zh' && 'Chinese (Simplified)'}
                      {lang === 'ko' && 'Korean'}
                      {lang === 'ja' && 'Japanese'}
                      {lang === 'hi' && 'Hindi'}
                    </div>
                  </div>
                  {language === lang && (
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                🌍 6 Languages Supported
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
