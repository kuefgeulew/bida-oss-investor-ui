import apiClient from './client';
import ossKnowledge from '@/data/ossKnowledge.json';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
  context?: {
    investorProfile?: any;
    currentApplication?: any;
    recentNotifications?: any[];
  };
}

export interface ChatResponse {
  reply: string;
  suggestions?: string[];
  relatedServices?: any[];
}

export const aiService = {
  /**
   * Send a message to the AI chatbot
   * This calls your backend which then calls OpenAI
   */
  async chat(request: ChatRequest): Promise<ChatResponse> {
    // Fast response using fallback - no API call delay
    return {
      reply: this.getFallbackResponse(request.message),
      suggestions: this.getFallbackSuggestions()
    };
  },

  /**
   * Get smart suggestions based on user context
   */
  async getSmartSuggestions(context: {
    investorProfile?: any;
    currentApplication?: any;
  }): Promise<string[]> {
    // Return instant suggestions - no API call
    return this.getFallbackSuggestions();
  },

  /**
   * Analyze HS code and suggest required licenses
   */
  async analyzeProductLicenses(productDescription: string, hsCode?: string): Promise<{
    hsCode: string;
    productName: string;
    requiredLicenses: string[];
    agencies: string[];
    estimatedTimeline: string;
    explanation: string;
  }> {
    try {
      const response: any = await apiClient.post('/ai/analyze-product', {
        productDescription,
        hsCode
      });
      return response.data;
    } catch (error) {
      console.error('Product analysis error:', error);
      return {
        hsCode: hsCode || 'Unknown',
        productName: productDescription,
        requiredLicenses: ['Import Registration Certificate', 'Trade License'],
        agencies: ['CCI&E', 'City Corporation'],
        estimatedTimeline: '10-15 days',
        explanation: 'Basic licenses required for most import/export activities.'
      };
    }
  },

  /**
   * Get next step recommendation based on application status
   */
  async getNextStepAdvice(application: any): Promise<string> {
    try {
      const response: any = await apiClient.post('/ai/next-step', { application });
      return response.data.advice;
    } catch (error) {
      return this.getFallbackNextStep(application);
    }
  },

  /**
   * Fallback responses when API is unavailable
   */
  getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    // Company registration
    if (lowerMessage.includes('register') || lowerMessage.includes('registration') || lowerMessage.includes('company')) {
      return 'To register your company in Bangladesh:\n\n✅ Process: 3-5 working days\n✅ Cost: BDT 5,000-15,000 ($50-150)\n✅ Authority: RJSC (Registrar of Joint Stock Companies)\n\nRequired documents:\n• Memorandum & Articles of Association\n• Director details & signatures\n• Registered office address proof\n• NOC from home country (foreign investors)\n\n💡 Tip: Upload all documents before submission to avoid delays!';
    }

    // Tax holiday
    if (lowerMessage.includes('tax') || lowerMessage.includes('holiday') || lowerMessage.includes('incentive')) {
      return 'Tax Incentives in Bangladesh:\n\n🎯 Tax Holidays:\n• 5 years: Dhaka/Chittagong zones\n• 7 years: Other divisional cities\n• 10 years: Remote areas & hi-tech\n\n💰 Additional Benefits:\n• 100% accelerated depreciation\n• Duty-free import of machinery\n• Exemption on dividend repatriation\n• No tax on royalty/tech fees\n\nWant specific benefits for your sector?';
    }

    // SEZ
    if (lowerMessage.includes('sez') || lowerMessage.includes('zone') || lowerMessage.includes('economic zone') || lowerMessage.includes('epz')) {
      const sezInfo = ossKnowledge.specialEconomicZones;
      return `Bangladesh has ${sezInfo.length} major investment zones:\n\n${sezInfo.slice(0, 5).map(sez => 
        `📍 ${sez.name} (${sez.location})\n   Sectors: ${sez.sectors.slice(0, 2).join(', ')}\n   Plots: ${sez.availablePlots || 'Contact for availability'}`
      ).join('\n\n')}\n\n💡 SEZ benefits: 10-year tax holiday, one-stop service, duty-free imports!\n\nWhich sector interests you?`;
    }

    // Timeline
    if (lowerMessage.includes('how long') || lowerMessage.includes('timeline') || lowerMessage.includes('time') || lowerMessage.includes('duration')) {
      return 'Average Approval Timelines:\n\n⚡ Trading Company: 18 days\n🏭 Manufacturing: 49 days\n💊 Pharmaceuticals: 87 days\n🏢 Real Estate: 85 days\n🏗️ Construction: 62 days\n\n✅ With OSS platform:\n• Real-time tracking\n• Automated reminders\n• Fast-track options available\n\n📌 Note: Complete documentation = Faster approval!';
    }

    // Documents
    if (lowerMessage.includes('document') || lowerMessage.includes('paper') || lowerMessage.includes('requirement')) {
      return 'Essential Documents for FDI:\n\n📄 Basic Requirements:\n• Valid passport copies\n• Company incorporation certificate\n• Business plan (3-5 years)\n• Bank solvency certificate\n• Board resolution\n• NOC from home country\n\n📊 Financial Documents:\n• Audited financial statements (last 3 years)\n• Source of funds declaration\n• Investment commitment letter\n\n💡 All documents can be uploaded through OSS portal!';
    }

    // FDI
    if (lowerMessage.includes('fdi') || lowerMessage.includes('foreign') || lowerMessage.includes('ownership') || lowerMessage.includes('invest')) {
      return '🌍 Foreign Direct Investment in Bangladesh:\n\n✅ 100% FDI allowed in most sectors\n✅ Full repatriation of capital & profits\n✅ Same benefits as local investors + MORE\n\n💰 Minimum Investment:\n• Manufacturing: $50,000\n• Services: $50,000\n• Trading: No minimum (case-by-case)\n\n🚫 Restricted Sectors:\n• Arms & ammunition\n• Nuclear energy\n• Forest plantations\n\nAll other sectors: OPEN! 🎉';
    }

    // Cost/Fees
    if (lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('price') || lowerMessage.includes('how much')) {
      return 'Investment Costs Breakdown:\n\n💵 Registration Fees:\n• RJSC registration: BDT 5,000-15,000\n• Trade license: BDT 3,000-10,000\n• TIN certificate: BDT 500\n• Import registration: BDT 5,000\n\n🏢 Zone-Specific:\n• SEZ land lease: $0.75-2/sq.ft/year\n• EPZ factory: $0.50-1/sq.ft/year\n\n💡 Many fees waived for priority sectors!';
    }

    // Sector-specific
    if (lowerMessage.includes('textile') || lowerMessage.includes('garment') || lowerMessage.includes('rmg')) {
      return '👔 Textile & Garment Sector:\n\n🌟 Why Bangladesh?\n• 2nd largest RMG exporter globally\n• Duty-free access to EU, USA, Canada\n• Competitive labor costs\n• Strong backward linkage\n\n✅ Incentives:\n• 10-year tax holiday\n• Cash incentive: 4% on exports\n• Bonded warehouse facility\n• Fast-track visa processing\n\n📍 Recommended zones: Chittagong EPZ, Dhaka EPZ';
    }

    // IT/Technology
    if (lowerMessage.includes('technology') || lowerMessage.includes('software') || lowerMessage.includes('it') || lowerMessage.includes('tech')) {
      return '💻 IT & Software Sector:\n\n🚀 Special Benefits:\n• 10-year tax holiday (hi-tech parks)\n• Duty-free import of equipment\n• 100% foreign ownership\n• Simplified work permit process\n\n💰 Government Support:\n• Startup funding available\n• R&D grants\n• Export incentives: 10-15%\n\n📍 Recommended: Kaliakoir Hi-Tech Park, Jessore Software Technology Park';
    }

    // Help/Support
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('contact') || lowerMessage.includes('assist')) {
      return '🆘 Need Assistance?\n\n📞 BIDA Helpdesk:\n   +880-967-877-153\n   Available 24/7\n\n📧 Email Support:\n   ossbida@ba-systems.com\n   Response: 2-4 hours\n\n💬 Live Chat:\n   Available right here!\n\n🤝 Book Appointment:\n   Schedule with investment officer\n\nHow can I help you today?';
    }

    // Default
    return '👋 I can help you with:\n\n📋 Company Registration (3-5 days)\n💰 Tax Holidays & Incentives\n🏭 Investment Zones (100+ options)\n📄 Document Requirements\n⏱️ Approval Timelines\n💵 Investment Costs\n🌍 FDI Policies\n🏢 Sector-Specific Guidance\n\n💡 Try asking: "How do I register my company?" or "Which SEZ is best for textiles?"';
  },

  getFallbackSuggestions(): string[] {
    return [
      'How do I register my company?',
      'What tax benefits are available?',
      'Which SEZ is best for my industry?',
      'What is the approval timeline?',
      'Can I get 100% foreign ownership?'
    ];
  },

  getFallbackNextStep(application: any): string {
    if (!application) return 'Please submit your application to get started.';

    const status = application.status;
    const currentStep = application.currentStep;
    const totalSteps = application.totalSteps;

    if (status === 'PENDING') {
      return 'Your application is pending review. Our team will review your documents within 24 hours. Please ensure all required documents are uploaded.';
    }

    if (status === 'IN_PROGRESS') {
      return `You are at step ${currentStep} of ${totalSteps}. The current approval is being processed by the relevant agency. Estimated completion: 3-5 business days.`;
    }

    if (status === 'DELAYED') {
      return 'Your application is experiencing delays. Please check if any additional documents are required. You can contact our support team for assistance.';
    }

    if (status === 'APPROVED') {
      return 'Congratulations! Your application has been approved. You can now proceed with business operations. Download your certificates from the dashboard.';
    }

    return 'Your application is being processed. You can track real-time progress in your dashboard.';
  },

  /**
   * Get OSS knowledge base for context
   */
  getKnowledgeBase(): typeof ossKnowledge {
    return ossKnowledge;
  }
};