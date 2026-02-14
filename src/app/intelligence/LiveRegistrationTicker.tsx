/**
 * 🏢 LIVE REGISTRATION TICKER
 * Cinematic scrolling ticker showing real-time company registrations
 * Creates FOMO effect for investors
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Globe } from 'lucide-react';
import { RECENT_REGISTRATIONS } from '@/app/data/bangladeshEconomicMock';
import { useLanguage } from '@/app/components/LanguageContext';

export function LiveRegistrationTicker() {
  const { language } = useLanguage();
  const [tickerItems, setTickerItems] = useState(RECENT_REGISTRATIONS);
  
  // 🎯 DEMO-ONLY: Chinese translations
  const zh: Record<string, string> = {
    liveCompanyRegistrations: '实时企业注册',
    live: '实时',
    companiesRegistered: '家公司在过去四十八小时内注册'
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
    return String(n).split('').map(d => digits[parseInt(d)] || d).join('');
  };
  
  // Simulate new registrations every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate items to simulate new registrations
      setTickerItems(prev => {
        const newItems = [...prev];
        const first = newItems.shift();
        if (first) newItems.push(first);
        return newItems;
      });
    }, 120000); // 2 minutes (reduced from 30 seconds)
    
    return () => clearInterval(interval);
  }, []);
  
  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...tickerItems, ...tickerItems];
  
  return (
    <div className="overflow-hidden bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="relative">
          <Building2 className="w-5 h-5 text-blue-600" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <h3 className="text-sm font-semibold text-gray-900">
          {t('liveCompanyRegistrations', 'Live Company Registrations')}
        </h3>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 rounded-full">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-green-700">{t('live', 'LIVE')}</span>
        </div>
      </div>
      
      {/* Ticker Container */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{
            x: [0, -50 * tickerItems.length * 16] // Approximate width calculation
          }}
          transition={{
            duration: tickerItems.length * 8, // Slower for readability
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.company}-${index}`}
              className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm whitespace-nowrap flex-shrink-0"
            >
              <Globe className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {item.company}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>{item.sector}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-blue-600">{item.country}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="mt-3 text-xs text-center text-gray-500">
        {language === 'zh' 
          ? `${toChineseNumber(tickerItems.length)} ${t('companiesRegistered', 'companies registered in the last 48 hours')}`
          : `${tickerItems.length} ${t('companiesRegistered', 'companies registered in the last 48 hours')}`
        }
      </div>
    </div>
  );
}