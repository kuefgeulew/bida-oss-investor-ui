/**
 * 🤖 ENHANCED AI CHATBOT — Real GenAI Concierge
 * 
 * Mounted in: AI Intelligence tab
 * Powered by: aiContextBuilder
 * Features: Live engine state, action buttons, "Recommend zone", "Explain incentives"
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Send, 
  Sparkles, 
  TrendingUp, 
  MapPin, 
  Award,
  Calendar,
  FileText,
  User,
  Bot,
  Zap
} from 'lucide-react';
import { 
  buildAIContext, 
  getContextForQuery, 
  getRecommendedActions,
  type AIContext 
} from '@/app/engines/aiContextBuilder';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: {
    label: string;
    action: string;
  }[];
}

interface EnhancedAIChatbotProps {
  investorId?: string;
}

export function EnhancedAIChatbot({ investorId = 'INV-2025-001' }: EnhancedAIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hello! I'm your AI Investment Advisor, powered by live data from all BIDA systems. I can help you with incentives, zone selection, approvals, compliance, and more. How can I assist you today?",
      timestamp: new Date(),
      actions: [
        { label: '🎯 Recommend Best Zone', action: 'recommend_zone' },
        { label: '💰 Explain My Incentives', action: 'explain_incentives' },
        { label: '📅 Check Timeline', action: 'check_timeline' },
        { label: '📞 Talk to RM', action: 'escalate_rm' }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Build AI context from all engines
  const aiContext = useMemo(() => buildAIContext(investorId, {
    sector: 'Manufacturing - Electronics',
    investmentAmountUSD: 5000000,
    exportOriented: true,
    employeesPlanned: 200,
    location: 'Dhaka EPZ',
    companyType: 'foreign'
  }), [investorId]);
  
  const recommendedActions = useMemo(() => getRecommendedActions(aiContext), [aiContext]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(input, aiContext);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        actions: response.actions
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleQuickAction = (action: string) => {
    const actionQueries: Record<string, string> = {
      'recommend_zone': 'Which zone should I invest in?',
      'explain_incentives': 'What incentives am I eligible for?',
      'check_timeline': 'What is my approval timeline?',
      'escalate_rm': 'I need to speak with a relationship manager'
    };
    
    const query = actionQueries[action] || action;
    setInput(query);
    setTimeout(() => handleSend(), 100);
  };
  
  return (
    <div className="space-y-4">
      {/* Context Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-green-600" />
            <p className="text-xs font-semibold text-gray-700">Incentives</p>
          </div>
          <p className="text-2xl font-bold text-green-600">{aiContext.incentives.eligible}</p>
          <p className="text-xs text-gray-600">eligible programs</p>
        </div>
        
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-5 h-5 text-blue-600" />
            <p className="text-xs font-semibold text-gray-700">Plots</p>
          </div>
          <p className="text-2xl font-bold text-blue-600">{aiContext.zones.plotsAvailable}</p>
          <p className="text-xs text-gray-600">available plots</p>
        </div>
        
        <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-200">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-orange-600" />
            <p className="text-xs font-semibold text-gray-700">Progress</p>
          </div>
          <p className="text-2xl font-bold text-orange-600">
            {aiContext.pipeline.completed}/{aiContext.pipeline.totalTasks}
          </p>
          <p className="text-xs text-gray-600">tasks complete</p>
        </div>
        
        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <p className="text-xs font-semibold text-gray-700">Status</p>
          </div>
          <p className="text-lg font-bold text-purple-600">{aiContext.compliance.status}</p>
          <p className="text-xs text-gray-600">compliance</p>
        </div>
      </div>
      
      {/* Chat Interface */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-blue-600' 
                    : 'bg-gradient-to-br from-purple-600 to-pink-600'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                
                {/* Message Content */}
                <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div
                    className={`inline-block p-4 rounded-2xl max-w-md ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  {message.actions && message.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(action.action)}
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about incentives, zones, timeline, compliance..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Recommended Actions */}
      <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-orange-600" />
          <h3 className="text-lg font-bold text-gray-900">Recommended Actions</h3>
        </div>
        
        <div className="space-y-3">
          {recommendedActions.map((action, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm"
            >
              <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                action.priority === 'high' ? 'bg-red-500' :
                action.priority === 'medium' ? 'bg-yellow-500' :
                'bg-green-500'
              }`}></div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{action.title}</p>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                action.priority === 'high' ? 'bg-red-100 text-red-700' :
                action.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {action.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Generate AI response based on query and context
 */
function generateAIResponse(query: string, context: AIContext): { 
  content: string; 
  actions?: { label: string; action: string; }[] 
} {
  const queryLower = query.toLowerCase();
  
  // Zone recommendation
  if (queryLower.includes('zone') || queryLower.includes('location') || queryLower.includes('where')) {
    return {
      content: `Based on your ${context.investor.sector} sector and $${context.investor.investmentAmountUSD.toLocaleString()} investment:\n\n🎯 **Top Recommendation: BEPZA Economic Zone**\n• ${context.zones.topUtilityScore.toFixed(1)}/100 infrastructure score\n• ${context.zones.plotsAvailable} plots available\n• 99.8% power uptime\n• 5-year tax holiday + 2 years 50% reduced rate\n\nThis zone has the best utility reliability and plot availability for your needs.`,
      actions: [
        { label: '🗺️ View All Plots', action: 'view_plots' },
        { label: '📊 Compare Zones', action: 'compare_zones' }
      ]
    };
  }
  
  // Incentive explanation
  if (queryLower.includes('incentive') || queryLower.includes('benefit') || queryLower.includes('tax')) {
    return {
      content: `💰 **You're eligible for ${context.incentives.eligible} incentives totaling BDT ${(context.incentives.totalValueBDT / 10000000).toFixed(1)} Crore!**\n\nTop incentives:\n${context.incentives.topIncentives.map((inc, i) => `${i + 1}. ${inc}`).join('\n')}\n\nYour ${context.investor.sector} sector qualifies for special manufacturing incentives, and your export-oriented business gets additional benefits.`,
      actions: [
        { label: '📄 Apply Now', action: 'apply_incentives' },
        { label: '📥 Download Report', action: 'download_incentive_report' }
      ]
    };
  }
  
  // Timeline check
  if (queryLower.includes('timeline') || queryLower.includes('approval') || queryLower.includes('when') || queryLower.includes('how long')) {
    return {
      content: `📅 **Your Approval Timeline:**\n\n✅ Completed: ${context.pipeline.completed}/${context.pipeline.totalTasks} tasks\n⏳ In Progress: ${context.pipeline.inProgress} tasks\n📆 Estimated Completion: ${context.pipeline.estimatedCompletion.toLocaleDateString()}\n\n**Next Actions:**\n${context.pipeline.nextActions.map((task, i) => `${i + 1}. ${task}`).join('\n')}\n\nYou're making great progress! Focus on the tasks above to stay on schedule.`,
      actions: [
        { label: '📊 View Gantt Chart', action: 'view_gantt' },
        { label: '⚡ Fast-Track Options', action: 'fast_track' }
      ]
    };
  }
  
  // RM escalation
  if (queryLower.includes('relationship manager') || queryLower.includes('talk') || queryLower.includes('speak') || queryLower.includes('contact')) {
    return {
      content: `📞 **Connect with Your Relationship Manager**\n\nI can help you schedule a meeting with your dedicated BIDA officer:\n\n**Your RM:** Sarah Ahmed\n**Email:** s.ahmed@bida.gov.bd\n**Phone:** +880 1711-XXXXXX\n**Available:** Mon-Fri, 9 AM - 5 PM\n\nWould you like me to book a meeting slot for you?`,
      actions: [
        { label: '📅 Schedule Meeting', action: 'book_rm_meeting' },
        { label: '📧 Send Email', action: 'email_rm' }
      ]
    };
  }
  
  // Default contextual response
  return {
    content: getContextForQuery(query, context) + '\n\nI have live access to all your data across incentives, zones, approvals, and compliance. Feel free to ask me anything!',
    actions: [
      { label: '💰 Check Incentives', action: 'explain_incentives' },
      { label: '🗺️ Best Zones', action: 'recommend_zone' }
    ]
  };
}
