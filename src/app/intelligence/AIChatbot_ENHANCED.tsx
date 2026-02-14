// 🤖 ENHANCED AI CHATBOT — Intelligent Investment Assistant
// NEW FEATURES: Multi-language, zone recommendations, incentive explanations, regulatory Q&A, RM escalation
// ARCHITECTURE: AI-powered conversational interface with OSS data integration

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/app/components/ui/card';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  MapPin,
  DollarSign,
  FileText,
  Phone,
  Sparkles,
  Globe,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { getAllSectorIncentives, getAllZoneIncentives, getIncentivePackage } from './incentiveEngine';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  zoneRecommendation?: {
    zone: string;
    reason: string;
    benefits: string[];
  };
  incentiveInfo?: {
    total: number;
    breakdown: { name: string; value: number }[];
  };
}

const LANGUAGE_OPTIONS = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
];

const QUICK_QUESTIONS = [
  "What incentives are available for manufacturing?",
  "Which zone is best for electronics manufacturing?",
  "How long does company registration take?",
  "What are the tax benefits in EPZs?",
  "Do I need work permits for foreign staff?",
  "How can I talk to a relationship manager?"
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    placeholder: "Ask about incentives, zones, regulations, or anything...",
    send: "Send",
    talkToRM: "Talk to Relationship Manager",
    suggestedQuestions: "Suggested Questions",
    typeMessage: "Type your message...",
  },
  bn: {
    placeholder: "প্রণোদনা, জোন, নিয়মকানুন বা যেকোনো বিষয়ে জিজ্ঞাসা করুন...",
    send: "পাঠান",
    talkToRM: "সম্পর্ক ব্যবস্থাপকের সাথে কথা বলুন",
    suggestedQuestions: "প্রস্তাবিত প্রশ্ন",
    typeMessage: "আপনার বার্তা টাইপ করুন...",
  },
  zh: {
    placeholder: "询问激励措施、区域、法规或任何问题...",
    send: "发送",
    talkToRM: "与关系经理交谈",
    suggestedQuestions: "建议的问题",
    typeMessage: "输入您的消息...",
  },
  ja: {
    placeholder: "インセンティブ、ゾーン、規制など、何でもお尋ねください...",
    send: "送信",
    talkToRM: "リレーションシップマネージャーと話す",
    suggestedQuestions: "推奨される質問",
    typeMessage: "メッセージを入力...",
  },
  ko: {
    placeholder: "인센티브, 구역, 규정 또는 무엇이든 질문하세요...",
    send: "보내기",
    talkToRM: "관계 관리자와 대화",
    suggestedQuestions: "추천 질문",
    typeMessage: "메시지를 입력하세요...",
  },
  hi: {
    placeholder: "प्रोत्साहन, क्षेत्र, नियम या कुछ भी पूछें...",
    send: "भेजें",
    talkToRM: "संबंध प्रबंधक से बात करें",
    suggestedQuestions: "सुझाए गए प्रश्न",
    typeMessage: "अपना संदेश टाइप करें...",
  }
};

export function AIChatbotENHANCED() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your BIDA AI Assistant. I can help you with investment incentives, zone recommendations, regulations, and connect you with our team. How can I assist you today?",
      timestamp: new Date(),
      suggestions: QUICK_QUESTIONS.slice(0, 3)
    }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key];

  // AI Response Generator with actual OSS data integration
  const generateResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Zone Recommendation Logic
    if (lowerMessage.includes('zone') || lowerMessage.includes('location') || lowerMessage.includes('where')) {
      const zones = getAllZoneIncentives();
      let recommendedZone = zones[0];
      
      if (lowerMessage.includes('electronic') || lowerMessage.includes('tech')) {
        recommendedZone = zones.find(z => z.name.includes('Hi-Tech')) || zones[0];
      } else if (lowerMessage.includes('export') || lowerMessage.includes('garment')) {
        recommendedZone = zones.find(z => z.name.includes('EPZ')) || zones[0];
      }
      
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Based on your query, I recommend **${recommendedZone.name}**. This zone offers excellent benefits for your industry.`,
        timestamp: new Date(),
        zoneRecommendation: {
          zone: recommendedZone.name,
          reason: recommendedZone.specialBenefits?.[0] || 'Strategic location',
          benefits: recommendedZone.specialBenefits || ['Tax holidays', 'Customs exemptions', 'Infrastructure support']
        },
        suggestions: [
          "Tell me more about this zone",
          "Compare with other zones",
          "What are the setup costs?"
        ]
      };
    }
    
    // Incentive Explanation Logic
    if (lowerMessage.includes('incentive') || lowerMessage.includes('benefit') || lowerMessage.includes('tax')) {
      const sectors = getAllSectorIncentives();
      let selectedSector = 'Manufacturing - Electronics';
      
      if (lowerMessage.includes('pharma')) selectedSector = 'Pharmaceuticals';
      if (lowerMessage.includes('it') || lowerMessage.includes('software')) selectedSector = 'IT & Software';
      if (lowerMessage.includes('textile') || lowerMessage.includes('garment')) selectedSector = 'Textiles & Garments';
      
      const incentives = getIncentivePackage(selectedSector, 'Dhaka EPZ', 5000000);
      
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `For **${selectedSector}**, Bangladesh offers comprehensive incentives including tax holidays, customs duty exemptions, and repatriation benefits. Let me break it down for you:`,
        timestamp: new Date(),
        incentiveInfo: {
          total: incentives.totalEstimatedValue,
          breakdown: incentives.incentives.map(inc => ({
            name: inc.title,
            value: inc.estimatedValue || 0
          }))
        },
        suggestions: [
          "Calculate my exact savings",
          "Compare with other countries",
          "What documents do I need?"
        ]
      };
    }
    
    // Regulatory & Timeline Questions
    if (lowerMessage.includes('how long') || lowerMessage.includes('time') || lowerMessage.includes('duration')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Company registration in Bangladesh typically takes **12-15 working days** through our streamlined process. Here's the breakdown:\n\n✅ BIDA Registration: 1-3 days\n✅ Company Name Clearance: 1-2 days\n✅ RJSC Incorporation: 3-7 days\n✅ TIN & VAT Registration: 2-3 days\n\nWith our fast-track service, this can be reduced to **7 days**.`,
        timestamp: new Date(),
        suggestions: [
          "Show me the detailed timeline",
          "What is fast-track service?",
          "Talk to RM for assistance"
        ]
      };
    }
    
    // Work Permit Questions
    if (lowerMessage.includes('work permit') || lowerMessage.includes('visa') || lowerMessage.includes('foreign staff')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Yes, work permits are required for foreign nationals. BIDA processes work permits in **5-10 working days**. Benefits:\n\n✅ Multiple-entry visa\n✅ 1-3 year validity\n✅ Spouse & dependent visas\n✅ Fast-track processing available\n\nRequired documents: Employment letter, educational certificates, passport copy, medical clearance.`,
        timestamp: new Date(),
        suggestions: [
          "What are the fees?",
          "How many foreign staff can I hire?",
          "Talk to RM"
        ]
      };
    }
    
    // RM Escalation
    if (lowerMessage.includes('talk to') || lowerMessage.includes('relationship manager') || lowerMessage.includes('human') || lowerMessage.includes('officer')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `I'll connect you with a Relationship Manager right away! 📞\n\n**BIDA Relationship Management Team**\n📧 rm@bida.gov.bd\n📱 +880-2-8181051\n🕐 Mon-Thu: 9AM-5PM, Sun: 9AM-1PM\n\nYou can also book a video consultation directly through the dashboard. Would you like me to help you schedule an appointment?`,
        timestamp: new Date(),
        suggestions: [
          "Book video consultation",
          "Send email to RM",
          "Continue chatting with AI"
        ]
      };
    }
    
    // Default Response
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: `I understand you're asking about "${userMessage}". I have access to all BIDA regulations, investment zones, incentive packages, and approval timelines. Could you be more specific? For example:\n\n• "Which zone is best for [your industry]?"\n• "What incentives are available for [sector]?"\n• "How long does [process] take?"\n\nOr I can connect you with a Relationship Manager for personalized assistance.`,
      timestamp: new Date(),
      suggestions: QUICK_QUESTIONS.slice(0, 3)
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateResponse(input);
      setMessages(prev => [...prev, aiResponse]);
    }, 500);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">BIDA AI Assistant</h3>
              <div className="flex items-center gap-1 text-xs opacity-90">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Online
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Globe className="w-5 h-5" />
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 top-12 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 overflow-hidden z-10">
                  {LANGUAGE_OPTIONS.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors flex items-center gap-2 ${
                        language === lang.code ? 'bg-blue-100 font-semibold' : ''
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
            }`}>
              {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            {/* Message Content */}
            <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>

              {/* Zone Recommendation Card */}
              {message.zoneRecommendation && (
                <div className="mt-2 p-3 bg-white border border-gray-200 rounded-lg text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-sm">Zone Recommendation</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{message.zoneRecommendation.zone}</p>
                    <p className="text-gray-600 text-xs">{message.zoneRecommendation.reason}</p>
                    <ul className="text-xs text-gray-600 mt-2 space-y-0.5">
                      {message.zoneRecommendation.benefits.map((benefit, idx) => (
                        <li key={idx}>✓ {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Incentive Info Card */}
              {message.incentiveInfo && (
                <div className="mt-2 p-3 bg-white border border-gray-200 rounded-lg text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-sm">Incentive Breakdown</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <p className="font-bold text-green-600">
                      Total Value: ${(message.incentiveInfo.total).toLocaleString()}
                    </p>
                    <ul className="text-xs text-gray-600 mt-2 space-y-1">
                      {message.incentiveInfo.breakdown.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{item.name}</span>
                          <span className="font-medium">${item.value.toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {message.suggestions && (
                <div className="mt-2 space-y-1">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(suggestion)}
                      className="block text-xs text-blue-600 hover:text-blue-700 hover:underline text-left"
                    >
                      → {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <div className="text-xs text-gray-400 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">{t('suggestedQuestions')}</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.slice(0, 3).map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
        {/* 🆕 SURGICAL COMPLETION: Talk to RM Button */}
        <button
          onClick={() => {
            setInput("I'd like to talk to a relationship manager");
            handleSend();
          }}
          className="w-full mb-3 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Phone className="w-4 h-4" />
          {t('talkToRM')}
        </button>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('typeMessage')}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Card>
  );
}
