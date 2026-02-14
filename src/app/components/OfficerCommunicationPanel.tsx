// Officer Communication Quality & Multi-Channel Layer
import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MessageCircle, Mail, Phone, MessageSquare, Send, Sparkles, Zap, Check, Building2 } from 'lucide-react';
import { getCommunications, logCommunication } from '@/app/officer-core/officerDataEngine';
import { getAutomatedMessage, getAutomationRules, getSuggestedAutomations } from '@/app/officer-core/communicationAutomation';
import { getBankState } from '@/app/bank-integration/bankMockEngine';
import { BankBadge } from '@/app/bank-integration/BankBadge';

interface OfficerCommunicationPanelProps {
  application: any;
  officer: any;
}

export function OfficerCommunicationPanel({ application, officer }: OfficerCommunicationPanelProps) {
  const [message, setMessage] = useState('');
  const [toneAnalysis, setToneAnalysis] = useState<any>(null);
  const [automations, setAutomations] = useState(getAutomationRules());
  const [suggestedAutomations, setSuggestedAutomations] = useState<string[]>([]);

  // Get communication history from data engine
  const communicationHistory = getCommunications(application.id);
  
  // Get bank state for this investor
  const bankState = getBankState(application.investorId);
  
  // Generate bank system messages
  const bankMessages = [];
  if (bankState) {
    if (bankState.corporateAccount?.status === 'active') {
      bankMessages.push({
        id: 'bank-account',
        channel: 'system',
        timestamp: bankState.corporateAccount.openedDate,
        subject: '🏦 Corporate Bank Account Opened',
        message: `BRAC Bank confirmed corporate account opening with KYC verification complete for ${application.companyName}`,
        direction: 'system',
        from: 'BRAC Bank System'
      });
    }
    if (bankState.escrowAccount?.status === 'active' || bankState.escrowAccount?.status === 'released') {
      bankMessages.push({
        id: 'bank-escrow',
        channel: 'system',
        timestamp: bankState.escrowAccount.createdDate,
        subject: '🏦 Escrow Account Created',
        message: `Investment escrow account activated for conditional approval. Funds secured: $${(bankState.escrowAccount.amount / 1000).toFixed(0)}K`,
        direction: 'system',
        from: 'BRAC Bank System'
      });
    }
    if (bankState.letterOfCredit?.status === 'issued') {
      bankMessages.push({
        id: 'bank-lc',
        channel: 'system',
        timestamp: bankState.letterOfCredit.issuedDate,
        subject: '🏦 Letter of Credit Issued',
        message: `LC issued for machinery and equipment imports. Amount: $${(bankState.letterOfCredit.amount / 1000).toFixed(0)}K`,
        direction: 'system',
        from: 'BRAC Bank System'
      });
    }
    if (bankState.loanApplication?.status === 'preapproved' || bankState.loanApplication?.status === 'approved') {
      bankMessages.push({
        id: 'bank-loan',
        channel: 'system',
        timestamp: bankState.loanApplication.preApprovedDate,
        subject: '🏦 Investment Loan Pre-Approved',
        message: `Project financing pre-approved. Loan amount: $${(bankState.loanApplication.requestedAmount / 1000).toFixed(0)}K at ${bankState.loanApplication.interestRate}% interest`,
        direction: 'system',
        from: 'BRAC Bank System'
      });
    }
  }
  
  // Merge bank messages with regular communications
  const allCommunications = [...communicationHistory, ...bankMessages].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  useEffect(() => {
    // Get suggested automations for this application
    setSuggestedAutomations(getSuggestedAutomations(application));
  }, [application]);

  // 26. Tone Checker
  const analyzeTone = (text: string) => {
    const negativeWords = ['reject', 'denied', 'refused', 'failed', 'impossible', 'cannot', 'unacceptable', 'wrong'];
    const urgentWords = ['urgent', 'immediately', 'asap', 'critical', 'emergency'];
    const professionalWords = ['kindly', 'please', 'thank you', 'appreciate', 'regards'];
    
    const words = text.toLowerCase().split(/\s+/);
    const negativeCount = words.filter(w => negativeWords.some(nw => w.includes(nw))).length;
    const urgentCount = words.filter(w => urgentWords.some(uw => w.includes(uw))).length;
    const professionalCount = words.filter(w => professionalWords.some(pw => w.includes(pw))).length;
    
    let tone = 'Neutral';
    let color = 'blue';
    let suggestions: string[] = [];
    
    if (negativeCount > 2) {
      tone = 'Too Negative';
      color = 'red';
      suggestions.push('Consider softer language when delivering bad news');
      suggestions.push('Use "we are unable to" instead of "we cannot"');
    } else if (urgentCount > 1 && negativeCount > 0) {
      tone = 'Harsh';
      color = 'orange';
      suggestions.push('Balance urgency with politeness');
    } else if (professionalCount >= 2) {
      tone = 'Professional';
      color = 'green';
      suggestions.push('✓ Good tone - clear and professional');
    }
    
    if (text.length < 20) {
      suggestions.push('Message may be too brief - add context');
    }
    
    if (!text.match(/\b(please|kindly|thank)\b/i) && text.length > 50) {
      suggestions.push('Consider adding courteous phrases');
    }
    
    return { tone, color, suggestions, negativeCount, urgentCount, professionalCount };
  };

  const handleToneCheck = () => {
    if (!message.trim()) return;
    const analysis = analyzeTone(message);
    setToneAnalysis(analysis);
  };

  // 27. Multi-Channel Communication Log
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'whatsapp': return <MessageCircle className="w-4 h-4" />;
      case 'portal': return <MessageSquare className="w-4 h-4" />;
      case 'system': return <Building2 className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'email': return 'bg-blue-100 text-blue-700';
      case 'phone': return 'bg-green-100 text-green-700';
      case 'whatsapp': return 'bg-emerald-100 text-emerald-700';
      case 'portal': return 'bg-purple-100 text-purple-700';
      case 'system': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // 28. Proactive Engagement Automations
  const sendProactiveMessage = (template: any) => {
    alert(`✅ Proactive message sent:\n\n"${template.message}"\n\nInvestor will receive this via email and portal notification.`);
  };

  return (
    <div className="space-y-4">
      {/* Communication Header */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <MessageCircle className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-lg">Communication Quality</h3>
      </div>

      {/* 26. Tone Checker */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h4 className="font-semibold">AI Tone Checker</h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Check the tone of your message before sending to ensure professionalism
        </p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message to investor..."
          className="w-full px-3 py-2 border rounded text-sm mb-3"
          rows={4}
        />
        <button
          onClick={handleToneCheck}
          className="w-full bg-purple-100 text-purple-800 border border-purple-300 px-4 py-2 rounded hover:bg-purple-200 transition-colors font-medium mb-3"
        >
          <Sparkles className="w-4 h-4 inline mr-2" />
          Analyze Tone
        </button>

        {toneAnalysis && (
          <div className={`p-3 bg-${toneAnalysis.color}-50 border border-${toneAnalysis.color}-300 rounded`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`font-semibold text-${toneAnalysis.color}-900`}>
                Tone: {toneAnalysis.tone}
              </p>
              <div className="flex gap-2 text-xs">
                <Badge variant="outline">Professional: {toneAnalysis.professionalCount}</Badge>
                <Badge variant="outline">Negative: {toneAnalysis.negativeCount}</Badge>
                <Badge variant="outline">Urgent: {toneAnalysis.urgentCount}</Badge>
              </div>
            </div>
            <div className="space-y-1">
              {toneAnalysis.suggestions.map((suggestion: string, idx: number) => (
                <p key={idx} className={`text-sm text-${toneAnalysis.color}-800`}>
                  {suggestion}
                </p>
              ))}
            </div>
            {toneAnalysis.tone === 'Professional' && (
              <button className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                <Send className="w-4 h-4 inline mr-2" />
                Send Message
              </button>
            )}
          </div>
        )}
      </Card>

      {/* 27. Multi-Channel Communication Log */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          <h4 className="font-semibold">Multi-Channel Communication Log</h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          All communication with investor (email, phone, WhatsApp, portal)
        </p>

        <div className="space-y-2">
          {allCommunications.map((comm) => (
            <div key={comm.id} className={`p-3 border rounded ${comm.channel === 'system' ? 'bg-indigo-50 border-indigo-200' : ''}`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded ${getChannelColor(comm.channel)}`}>
                  {getChannelIcon(comm.channel)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{comm.subject}</p>
                    <span className="text-xs text-gray-500">{new Date(comm.timestamp).toLocaleDateString()}</span>
                  </div>
                  {comm.message && (
                    <p className="text-xs text-gray-700 mb-2">{comm.message}</p>
                  )}
                  <p className="text-xs text-gray-600">
                    {comm.from}{comm.to && ` → ${comm.to}`}
                  </p>
                  {comm.duration && (
                    <p className="text-xs text-gray-500 mt-1">Duration: {comm.duration}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    {comm.status && (
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          comm.status === 'sent' ? 'bg-blue-50 text-blue-700' :
                          comm.status === 'read' ? 'bg-green-50 text-green-700' :
                          comm.status === 'completed' ? 'bg-purple-50 text-purple-700' :
                          'bg-gray-50 text-gray-700'
                        }`}
                      >
                        {comm.status}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {comm.channel.toUpperCase()}
                    </Badge>
                    {comm.channel === 'system' && <BankBadge size="xs" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="bg-blue-100 text-blue-800 border border-blue-300 px-3 py-2 rounded hover:bg-blue-200 transition-colors text-sm">
            <Mail className="w-4 h-4 inline mr-1" />
            Send Email
          </button>
          <button className="bg-green-100 text-green-800 border border-green-300 px-3 py-2 rounded hover:bg-green-200 transition-colors text-sm">
            <Phone className="w-4 h-4 inline mr-1" />
            Log Call
          </button>
          <button className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-2 rounded hover:bg-emerald-200 transition-colors text-sm">
            <MessageCircle className="w-4 h-4 inline mr-1" />
            WhatsApp
          </button>
          <button className="bg-purple-100 text-purple-800 border border-purple-300 px-3 py-2 rounded hover:bg-purple-200 transition-colors text-sm">
            <MessageSquare className="w-4 h-4 inline mr-1" />
            Portal Msg
          </button>
        </div>
      </Card>

      {/* 28. Proactive Engagement Automations */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-pink-600" />
          <h4 className="font-semibold">Proactive Engagement Templates</h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Build positive relationships with automated thoughtful messages
        </p>

        <div className="space-y-2">
          {automations.map((template) => (
            <div key={template.id} className="p-3 border rounded hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{template.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">{template.title}</p>
                  <p className="text-xs text-gray-600 mb-2">{template.message}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {template.trigger.replace(/_/g, ' ')}
                    </Badge>
                    <button
                      onClick={() => sendProactiveMessage(template)}
                      className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded hover:bg-pink-200 transition-colors"
                    >
                      Send Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 p-3 bg-pink-50 border border-pink-200 rounded">
          <p className="text-sm text-pink-900">
            💡 Proactive communication reduces anxiety, builds trust, and improves investor satisfaction scores
          </p>
        </div>
      </Card>
    </div>
  );
}