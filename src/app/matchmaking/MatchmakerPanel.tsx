// Matchmaker Panel - AI-powered B2B partner matching interface
// READ-ONLY panel that reads from matchmakerEngine and partnerRegistry
// Mounts in: Investor Dashboard

import React, { useState, useMemo } from 'react';
import { Handshake, Star, MapPin, Mail, Phone, Award, TrendingUp, Users, Building2, MessageCircle, Send, X } from 'lucide-react';
import { findAllMatches, recommendPartnerPipeline, getMatchmakerStats, searchPartners, type MatchScore } from './matchmakerEngine';
import { type Partner } from './partnerRegistry';
import { toast } from 'sonner';

interface MatchmakerPanelProps {
  investorSector: string;
  investmentSize?: number;
  preferredLocation?: string;
}

// 🔥 NEW: Message interface
interface Message {
  id: string;
  sender: 'investor' | 'partner';
  text: string;
  timestamp: Date;
}

export function MatchmakerPanel({ investorSector, investmentSize = 5000000, preferredLocation }: MatchmakerPanelProps) {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'recommended' | 'pipeline' | 'search'>('recommended');
  
  // 🔥 NEW: Messaging state
  const [messagingPartner, setMessagingPartner] = useState<Partner | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [messageInput, setMessageInput] = useState('');
  
  const matches = useMemo(() => 
    findAllMatches({ investorSector, investmentSize, location: preferredLocation }),
    [investorSector, investmentSize, preferredLocation]
  );
  
  const pipeline = useMemo(() =>\n    recommendPartnerPipeline(investorSector, investmentSize),
    [investorSector, investmentSize]
  );
  
  const searchResults = useMemo(() => 
    searchQuery.length > 2 ? searchPartners(searchQuery) : [],
    [searchQuery]
  );
  
  const stats = useMemo(() => getMatchmakerStats(), []);
  
  // 🔥 NEW: Messaging functions
  const handleSendMessage = () => {
    if (!messagingPartner || messageInput.trim() === '') return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'investor',
      text: messageInput,
      timestamp: new Date(),
    };
    
    setMessages(prev => ({
      ...prev,
      [messagingPartner.id]: [...(prev[messagingPartner.id] || []), newMessage],
    }));
    
    setMessageInput('');
    toast.success('Message sent!');
    
    // Simulate partner response
    setTimeout(() => {
      const responses = [
        "Hello! Thank you for reaching out. I'd be happy to discuss how we can support your project.",
        "Great to hear from you! Let's schedule a call to discuss your requirements in detail.",
        "Thank you for your interest. We have extensive experience in this sector and would love to collaborate.",
        "Hello! I've reviewed your profile and believe we'd be a great fit. When can we connect?"
      ];
      
      const partnerResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'partner',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      
      setMessages(prev => ({
        ...prev,
        [messagingPartner.id]: [...(prev[messagingPartner.id] || []), partnerResponse],
      }));
      
      toast.info(`${messagingPartner.name} replied`);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Handshake className="w-8 h-8" />
          <h2 className="text-2xl font-bold">B2B Partner Matchmaker</h2>
        </div>
        <p className="text-pink-100">AI-powered matching with vetted local partners • {stats.totalPartners} verified businesses</p>
      </div>

      {/* View Mode Selector */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('recommended')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              viewMode === 'recommended'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Recommended Matches
          </button>
          <button
            onClick={() => setViewMode('pipeline')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              viewMode === 'pipeline'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Setup Pipeline
          </button>
          <button
            onClick={() => setViewMode('search')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              viewMode === 'search'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Search Partners
          </button>
        </div>
      </div>

      {/* Recommended Matches View */}
      {viewMode === 'recommended' && (
        <div className="space-y-6">
          {Object.entries(matches).map(([type, matchScores]) => (
            <div key={type} className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 capitalize flex items-center gap-2">
                <Building2 className="w-5 h-5 text-pink-600" />
                {type.replace('-', ' ')} Partners
              </h3>
              
              {matchScores.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No matches found for this category</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {matchScores.map((match) => (
                    <PartnerMatchCard key={match.partner.id} match={match} onSelect={setSelectedPartner} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pipeline View */}
      {viewMode === 'pipeline' && (
        <div className="space-y-4">
          {pipeline.map((phase, idx) => (
            <div key={idx} className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    phase.priority === 'critical' ? 'bg-red-500' :
                    phase.priority === 'high' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{phase.phase}</h3>
                    <p className="text-sm text-gray-600 capitalize">Priority: {phase.priority}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  phase.priority === 'critical' ? 'bg-red-100 text-red-800' :
                  phase.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {phase.partnerType}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phase.recommendedPartners.map((match) => (
                  <PartnerMatchCard key={match.partner.id} match={match} onSelect={setSelectedPartner} compact />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search View */}
      {viewMode === 'search' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <input
              type="text"
              placeholder="Search by name, service, or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 text-lg"
            />
          </div>
          
          {searchQuery.length > 2 && (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Search Results ({searchResults.length})
              </h3>
              
              {searchResults.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No partners found matching "{searchQuery}"</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((partner) => (
                    <button
                      key={partner.id}
                      onClick={() => setSelectedPartner(partner)}
                      className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 text-left hover:bg-pink-50 hover:border-pink-300 transition-all"
                    >
                      <div className="font-bold text-gray-900 mb-1">{partner.name}</div>
                      <div className="text-sm text-pink-600 font-semibold mb-2">{partner.category}</div>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-bold text-gray-900">{partner.rating.overall}</span>
                        <span className="text-xs text-gray-500">({partner.rating.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {partner.location.district}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Partner Detail Modal */}
      {selectedPartner && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
            onClick={() => setSelectedPartner(null)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full z-50 border-2 border-pink-500 max-h-[80vh] overflow-y-auto">
            <PartnerDetailView 
              partner={selectedPartner} 
              onClose={() => setSelectedPartner(null)} 
              onOpenMessaging={() => {
                setMessagingPartner(selectedPartner);
                setSelectedPartner(null);
              }}
            />
          </div>
        </>
      )}
      
      {/* 🔥 NEW: Messaging Modal */}
      {messagingPartner && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
            onClick={() => setMessagingPartner(null)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full z-50 border-2 border-pink-500 max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setMessagingPartner(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 rounded-full p-4">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">Message {messagingPartner.name}</h3>
                <p className="text-blue-600 font-semibold">{messagingPartner.category}</p>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-300 mb-6 max-h-[300px] overflow-y-auto">
              {(!messages[messagingPartner.id] || messages[messagingPartner.id].length === 0) ? (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages[messagingPartner.id].map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'investor' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === 'investor' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white border-2 border-gray-200 text-gray-900'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'investor' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Message Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-all hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send
              </button>
            </div>
            
            {/* Contact Info */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="text-sm font-bold text-blue-900 mb-2">Direct Contact</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-3 h-3 text-blue-600" />
                  <a href={`mailto:${messagingPartner.profile.email}`} className="text-blue-600 hover:underline">
                    {messagingPartner.profile.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-3 h-3 text-blue-600" />
                  <span>{messagingPartner.profile.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function PartnerMatchCard({ match, onSelect, compact = false }: { match: MatchScore; onSelect: (p: Partner) => void; compact?: boolean }) {
  return (
    <button
      onClick={() => onSelect(match.partner)}
      className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-lg p-4 text-left hover:border-pink-400 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="font-bold text-gray-900 mb-1">{match.partner.name}</div>
          <div className="text-xs text-pink-600 font-semibold">{match.partner.category}</div>
        </div>
        <div className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          {match.score}%
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-yellow-500 fill-current" />
        <span className="text-sm font-bold text-gray-900">{match.partner.rating.overall}</span>
        <span className="text-xs text-gray-500">({match.partner.rating.reviews})</span>
      </div>
      
      {!compact && (
        <div className="space-y-1 mb-3">
          {match.matchReasons.slice(0, 2).map((reason, i) => (
            <div key={i} className="flex items-start gap-1 text-xs text-gray-700">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1"></div>
              <span>{reason}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-center gap-1 text-xs text-gray-600">
        <MapPin className="w-3 h-3" />
        {match.partner.location.district}
      </div>
    </button>
  );
}

function PartnerDetailView({ partner, onClose, onOpenMessaging }: { partner: Partner; onClose: () => void; onOpenMessaging: () => void }) {
  return (
    <div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 text-2xl font-bold"
      >
        ×
      </button>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-pink-100 rounded-full p-4">
          <Building2 className="w-8 h-8 text-pink-600" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-gray-900">{partner.name}</h3>
          <p className="text-pink-600 font-semibold">{partner.category}</p>
        </div>
      </div>
      
      {/* Rating */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <div>
              <div className="text-3xl font-bold text-gray-900">{partner.rating.overall}</div>
              <div className="text-sm text-gray-600">{partner.rating.reviews} reviews</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="text-center">
              <div className="font-bold text-gray-900">{partner.rating.reliability}</div>
              <div className="text-gray-600">Reliability</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900">{partner.rating.quality}</div>
              <div className="text-gray-600">Quality</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900">{partner.rating.communication}</div>
              <div className="text-gray-600">Communication</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-600 font-semibold">Experience</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{partner.experience.yearsInBusiness} years</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-600 font-semibold">Clients</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{partner.experience.clientsServed}</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-purple-600 font-semibold">Success Rate</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{partner.experience.successRate}%</div>
        </div>
      </div>
      
      {/* Services */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900 mb-3">Services Offered</h4>
        <div className="flex flex-wrap gap-2">
          {partner.services.map((service, i) => (
            <span key={i} className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full font-medium">
              {service}
            </span>
          ))}
        </div>
      </div>
      
      {/* Certifications */}
      {partner.certifications.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-900 mb-3">Certifications</h4>
          <div className="flex flex-wrap gap-2">
            {partner.certifications.map((cert, i) => (
              <span key={i} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                <Award className="w-3 h-3" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* 🔥 NEW: Messaging Button */}
      <button
        onClick={onOpenMessaging}
        className="w-full mb-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 text-lg shadow-lg"
      >
        <MessageCircle className="w-6 h-6" />
        Send Message
      </button>
      
      {/* Contact */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
        <h4 className="text-lg font-bold text-gray-900 mb-3">Contact Information</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-gray-600" />
            <a href={`mailto:${partner.profile.email}`} className="text-pink-600 hover:underline font-medium">
              {partner.profile.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-gray-600" />
            <span className="text-gray-900 font-medium">{partner.profile.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="text-gray-900">{partner.location.address}, {partner.location.district}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
