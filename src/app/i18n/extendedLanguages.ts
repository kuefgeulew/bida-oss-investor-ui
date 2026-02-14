/**
 * 🌍 LANGUAGE EXTENSION — Adding Japanese & Hindi Support
 * This extends the existing translation system with two new languages
 */

import { Language as BaseLanguage } from './completeTranslations';

// Extended language type
export type ExtendedLanguage = BaseLanguage | 'ja' | 'hi';

export const EXTENDED_LANGUAGE_NAMES = {
  en: 'English',
  nl: 'Nederlands',
  zh: '中文',
  ko: '한국어',
  ja: '日本語',
  hi: 'हिन्दी'
};

export const LANGUAGE_FLAGS = {
  en: '🇬🇧',
  nl: '🇳🇱',
  zh: '🇨🇳',
  ko: '🇰🇷',
  ja: '🇯🇵',
  hi: '🇮🇳'
};

// Core translations for new languages
export const extendedTranslations: Record<string, Record<ExtendedLanguage, string>> = {
  // Common
  'common.welcome': {
    en: 'Welcome to BIDA OSS',
    nl: 'Welkom bij BIDA OSS',
    zh: '欢迎来到BIDA一站式服务平台',
    ko: 'BIDA OSS에 오신 것을 환영합니다',
    ja: 'BIDA OSSへようこそ',
    hi: 'BIDA OSS में आपका स्वागत है'
  },
  'common.back': {
    en: 'Back',
    nl: 'Terug',
    zh: '返回',
    ko: '뒤로',
    ja: '戻る',
    hi: 'वापस'
  },
  'common.next': {
    en: 'Next',
    nl: 'Volgende',
    zh: '下一步',
    ko: '다음',
    ja: '次へ',
    hi: 'अगला'
  },
  'common.submit': {
    en: 'Submit',
    nl: 'Indienen',
    zh: '提交',
    ko: '제출',
    ja: '送信',
    hi: 'जमा करें'
  },
  'common.cancel': {
    en: 'Cancel',
    nl: 'Annuleren',
    zh: '取消',
    ko: '취소',
    ja: 'キャンセル',
    hi: 'रद्द करें'
  },
  'common.save': {
    en: 'Save',
    nl: 'Opslaan',
    zh: '保存',
    ko: '저장',
    ja: '保存',
    hi: 'सहेजें'
  },
  'common.download': {
    en: 'Download',
    nl: 'Downloaden',
    zh: '下载',
    ko: '다운로드',
    ja: 'ダウンロード',
    hi: 'डाउनलोड'
  },
  'common.search': {
    en: 'Search',
    nl: 'Zoeken',
    zh: '搜索',
    ko: '검색',
    ja: '検索',
    hi: 'खोजें'
  },
  'common.loading': {
    en: 'Loading...',
    nl: 'Laden...',
    zh: '加载中...',
    ko: '로딩 중...',
    ja: '読み込み中...',
    hi: 'लोड हो रहा है...'
  },
  'common.logout': {
    en: 'Logout',
    nl: 'Uitloggen',
    zh: '登出',
    ko: '로그아웃',
    ja: 'ログアウト',
    hi: 'लॉग आउट'
  },

  // Navigation
  'nav.dashboard': {
    en: 'Dashboard',
    nl: 'Dashboard',
    zh: '仪表板',
    ko: '대시보드',
    ja: 'ダッシュボード',
    hi: 'डैशबोर्ड'
  },
  'nav.journey': {
    en: 'Journey Tracker',
    nl: 'Reis Tracker',
    zh: '旅程跟踪器',
    ko: '여정 추적기',
    ja: 'ジャーニートラッカー',
    hi: 'यात्रा ट्रैकर'
  },
  'nav.zones': {
    en: 'Investment Zones',
    nl: 'Investeringszones',
    zh: '投资区',
    ko: '투자 구역',
    ja: '投資ゾーン',
    hi: 'निवेश क्षेत्र'
  },
  'nav.services': {
    en: 'Services',
    nl: 'Diensten',
    zh: '服务',
    ko: '서비스',
    ja: 'サービス',
    hi: 'सेवाएं'
  },
  'nav.documents': {
    en: 'Documents',
    nl: 'Documenten',
    zh: '文件',
    ko: '문서',
    ja: '書類',
    hi: 'दस्तावेज़'
  },
  'nav.compliance': {
    en: 'Compliance',
    nl: 'Naleving',
    zh: '合规',
    ko: '규정 준수',
    ja: 'コンプライアンス',
    hi: 'अनुपालन'
  },
  'nav.aftercare': {
    en: 'Aftercare',
    nl: 'Nazorg',
    zh: '售后服务',
    ko: '사후 관리',
    ja: 'アフターケア',
    hi: 'सेवा के बाद'
  },

  // FDI Intelligence
  'fdi.realtime': {
    en: 'Real-time FDI Dashboard',
    nl: 'Real-time FDI Dashboard',
    zh: '实时外国直接投资仪表板',
    ko: '실시간 FDI 대시보드',
    ja: 'リアルタイムFDIダッシュボード',
    hi: 'रीयल-टाइम एफडीआई डैशबोर्ड'
  },
  'fdi.totalInflow': {
    en: 'Total FDI Inflow',
    nl: 'Totale FDI-instroom',
    zh: 'FDI总流入',
    ko: '총 FDI 유입',
    ja: '総FDI流入',
    hi: 'कुल एफडीआई प्रवाह'
  },
  'fdi.projectsApproved': {
    en: 'Projects Approved',
    nl: 'Goedgekeurde projecten',
    zh: '批准的项目',
    ko: '승인된 프로젝트',
    ja: '承認されたプロジェクト',
    hi: 'स्वीकृत परियोजनाएं'
  },
  'fdi.jobsCreated': {
    en: 'Jobs Created',
    nl: 'Gecreëerde banen',
    zh: '创造的就业机会',
    ko: '창출된 일자리',
    ja: '創出された雇用',
    hi: 'रोजगार सृजन'
  },
  'fdi.whyBangladesh': {
    en: 'Why Bangladesh Now?',
    nl: 'Waarom nu Bangladesh?',
    zh: '为什么选择孟加拉国？',
    ko: '왜 지금 방글라데시인가?',
    ja: 'なぜ今バングラデシュなのか？',
    hi: 'अब बांग्लादेश क्यों?'
  },

  // Incentives
  'incentive.calculator': {
    en: 'Incentive Calculator',
    nl: 'Incentive Calculator',
    zh: '激励计算器',
    ko: '인센티브 계산기',
    ja: 'インセンティブ計算機',
    hi: 'प्रोत्साहन कैलकुलेटर'
  },
  'incentive.taxSavings': {
    en: 'Tax Savings',
    nl: 'Belastingbesparingen',
    zh: '税收节省',
    ko: '세금 절감',
    ja: '税金節約',
    hi: 'कर बचत'
  },
  'incentive.roi': {
    en: 'Return on Investment',
    nl: 'Return on Investment',
    zh: '投资回报',
    ko: '투자 수익',
    ja: '投資収益率',
    hi: 'निवेश पर रिटर्न'
  },

  // Timeline
  'timeline.gantt': {
    en: 'Gantt Chart',
    nl: 'Gantt-grafiek',
    zh: '甘特图',
    ko: '간트 차트',
    ja: 'ガントチャート',
    hi: 'गैंट चार्ट'
  },
  'timeline.criticalPath': {
    en: 'Critical Path',
    nl: 'Kritiek pad',
    zh: '关键路径',
    ko: '주요 경로',
    ja: 'クリティカルパス',
    hi: 'महत्वपूर्ण पथ'
  },
  'timeline.parallel': {
    en: 'Parallel Processing',
    nl: 'Parallelle verwerking',
    zh: '并行处理',
    ko: '병렬 처리',
    ja: '並行処理',
    hi: 'समानांतर प्रसंस्करण'
  },

  // Chatbot
  'chatbot.assistant': {
    en: 'BIDA AI Assistant',
    nl: 'BIDA AI-assistent',
    zh: 'BIDA人工智能助手',
    ko: 'BIDA AI 어시스턴트',
    ja: 'BIDA AIアシスタント',
    hi: 'BIDA एआई सहायक'
  },
  'chatbot.online': {
    en: 'Online',
    nl: 'Online',
    zh: '在线',
    ko: '온라인',
    ja: 'オンライン',
    hi: 'ऑनलाइन'
  },
  'chatbot.typeMessage': {
    en: 'Type your message...',
    nl: 'Typ uw bericht...',
    zh: '输入您的消息...',
    ko: '메시지를 입력하세요...',
    ja: 'メッセージを入力...',
    hi: 'अपना संदेश टाइप करें...'
  },

  // Transparency
  'transparency.dashboard': {
    en: 'Public Transparency Dashboard',
    nl: 'Openbaar transparantiedashboard',
    zh: '公共透明度仪表板',
    ko: '공공 투명성 대시보드',
    ja: '公的透明性ダッシュボード',
    hi: 'सार्वजनिक पारदर्शिता डैशबोर्ड'
  },
  'transparency.slaCompliance': {
    en: 'SLA Compliance',
    nl: 'SLA-naleving',
    zh: 'SLA合规性',
    ko: 'SLA 준수',
    ja: 'SLAコンプライアンス',
    hi: 'एसएलए अनुपालन'
  },
  'transparency.rating': {
    en: 'Service Rating',
    nl: 'Servicebeoordeling',
    zh: '服务评级',
    ko: '서비스 평가',
    ja: 'サービス評価',
    hi: 'सेवा रेटिंग'
  }
};

// Helper function to get translation with fallback
export function getExtendedTranslation(key: string, language: ExtendedLanguage): string {
  if (extendedTranslations[key] && extendedTranslations[key][language]) {
    return extendedTranslations[key][language];
  }
  // Fallback to English
  return extendedTranslations[key]?.en || key;
}
