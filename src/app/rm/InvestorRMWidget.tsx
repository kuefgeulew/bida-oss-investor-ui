// 🤝 INVESTOR RM WIDGET — Compact chat interface for investor-RM communication
// ARCHITECTURE: UI layer. Reads rmEngine. Investor-facing component.

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Mail, 
  MessageSquare, 
  X,
  User,
  Clock,
  CheckCircle,
  Paperclip,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { 
  getAssignment, 
  getMessages, 
  sendMessage, 
  getUnreadCount,
  markMessageRead,
  type RMMessage 
} from './rmEngine';
import { glassCard } from '@/app/config/designSystem';

interface InvestorRMWidgetProps {
  bbid: string;
  investorId?: string;
  compactMode?: boolean;
}

export function InvestorRMWidget({ bbid, investorId, compactMode = false }: InvestorRMWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<RMMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const assignment = getAssignment(bbid);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 120000); // Poll for new messages every 2 minutes
    return () => clearInterval(interval);
  }, [bbid]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = () => {
    const msgs = getMessages(bbid);
    setMessages(msgs);
    setUnreadCount(getUnreadCount(bbid));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !assignment) return;

    sendMessage(bbid, true, 'You', newMessage.trim());
    setNewMessage('');
    loadMessages();

    // Simulate RM response after a delay
    setTimeout(() => {
      const responses = [
        "Thank you for reaching out! I'm looking into this and will get back to you shortly.",
        "I've received your message. Let me check on that for you.",
        "Great question! I'll coordinate with the relevant department and update you soon.",
        "I'm on it! I'll have an answer for you within the next few hours."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      sendMessage(bbid, false, assignment.assignedRM.name, randomResponse);
      loadMessages();
    }, 2000 + Math.random() * 3000);
  };

  const handleMarkRead = () => {
    messages.forEach(msg => {
      if (!msg.fromInvestor && !msg.read) {
        markMessageRead(msg.messageId);
      }
    });
    loadMessages();
  };

  if (!assignment) {
    return null; // No RM assigned yet
  }

  const rm = assignment.assignedRM;

  // Floating chat button
  if (!isOpen && !compactMode) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            setIsOpen(true);
            handleMarkRead();
          }}
          className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 flex items-center justify-center"
        >
          <MessageCircle className="w-7 h-7" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {unreadCount}
            </div>
          )}
        </button>
      </div>
    );
  }

  // Compact inline mode
  if (compactMode) {
    return (
      <div className={`${glassCard} p-6`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-800">{rm.name}</div>
            <div className="text-sm text-gray-600">{rm.title}</div>
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {rm.availability}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <a
            href={`mailto:${rm.email}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all text-sm"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href={`tel:${rm.phone}`}
            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all text-sm"
          >
            <Phone className="w-4 h-4" />
            Call
          </a>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Avg. response: {rm.responseTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>{messages.length} messages exchanged</span>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Open Chat
        </button>
      </div>
    );
  }

  // Full chat window
  return (
    <div className="fixed bottom-6 right-6 w-96 z-50">
      <div className={`${glassCard} shadow-2xl rounded-2xl overflow-hidden`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold">{rm.name}</div>
                <div className="text-xs opacity-90">{rm.title}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                {rm.availability}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {rm.responseTime}
              </div>
            </div>
          )}
        </div>

        {!isMinimized && (
          <>
            {/* Quick Actions */}
            <div className="p-3 bg-gray-50 border-b border-gray-200">
              <div className="flex gap-2">
                <a
                  href={`mailto:${rm.email}`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-xs"
                >
                  <Mail className="w-3 h-3" />
                  Email
                </a>
                <a
                  href={`tel:${rm.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-xs"
                >
                  <Phone className="w-3 h-3" />
                  Call
                </a>
                <a
                  href={`https://wa.me/${rm.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-xs"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-white space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm">No messages yet</p>
                  <p className="text-xs mt-1">Start a conversation with your RM</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.messageId}
                    className={`flex ${msg.fromInvestor ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] ${
                        msg.fromInvestor
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      } rounded-2xl px-4 py-2`}
                    >
                      {!msg.fromInvestor && (
                        <div className="text-xs font-semibold mb-1 opacity-75">
                          {msg.senderName}
                        </div>
                      )}
                      <p className="text-sm">{msg.message}</p>
                      <div
                        className={`flex items-center gap-1 mt-1 text-xs ${
                          msg.fromInvestor ? 'text-white/70' : 'text-gray-500'
                        }`}
                      >
                        <span>
                          {new Date(msg.timestamp).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </span>
                        {msg.fromInvestor && msg.read && (
                          <CheckCircle className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-200 rounded-lg transition-all">
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}