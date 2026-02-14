// 🤝 RM CONSOLE — Officer dashboard for managing investor relationships
// ARCHITECTURE: UI layer. Reads rmEngine. Officer-facing component.

import React, { useState, useEffect } from 'react';
import {
  Users,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Send,
  Phone,
  Mail,
  ExternalLink,
  Building2,
  MapPin,
  Briefcase,
  Calendar,
  AlertCircle,
  XCircle,
  Globe
} from 'lucide-react';
import {
  getRMById,
  getAllRMs,
  type RelationshipManager
} from './rmRegistry';
import {
  getRMStats,
  getAssignment,
  sendMessage,
  getEscalations,
  resolveEscalation,
  type RMEscalation,
  type RMAssignment
} from './rmEngine';
import { glassCard } from '@/app/config/designSystem';

interface RMConsoleProps {
  rmId: string; // Current logged-in RM officer
  viewMode?: 'dashboard' | 'messages' | 'escalations' | 'assignments';
}

export function RMConsole({ rmId, viewMode = 'dashboard' }: RMConsoleProps) {
  const [activeView, setActiveView] = useState<typeof viewMode>(viewMode);
  const [selectedInvestor, setSelectedInvestor] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');

  const rm = getRMById(rmId);
  const stats = getRMStats(rmId);
  const allEscalations = getEscalations();
  
  // Filter escalations for this RM
  const myEscalations = allEscalations.filter(
    esc => esc.assignedRM?.rmId === rmId
  );

  const filteredEscalations = myEscalations.filter(esc => {
    const matchesPriority = filterPriority === 'all' || esc.priority === filterPriority;
    const matchesSearch = esc.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         esc.issue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch && esc.status !== 'resolved';
  });

  if (!rm) {
    return (
      <div className={`${glassCard} p-12 text-center`}>
        <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <div className="text-xl font-semibold text-gray-700">RM Not Found</div>
        <div className="text-gray-500 mt-2">Invalid Relationship Manager ID</div>
      </div>
    );
  }

  const handleSendMessage = (bbid: string) => {
    if (!messageInput.trim()) return;
    sendMessage(bbid, false, rm.name, messageInput.trim());
    setMessageInput('');
  };

  const handleResolveEscalation = (escalationId: string, notes: string) => {
    resolveEscalation(escalationId, notes);
    // Refresh view
  };

  const getPriorityColor = (priority: RMEscalation['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  const getStatusColor = (status: RMEscalation['status']) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'resolved': return 'bg-green-100 text-green-700';
    }
  };

  // Dashboard View
  if (activeView === 'dashboard') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className={`${glassCard} p-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{rm.name}</h1>
                <p className="text-gray-600">{rm.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                rm.availability === 'online' ? 'bg-green-100 text-green-700' :
                rm.availability === 'busy' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {rm.availability}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Languages</div>
              <div className="font-medium text-gray-800">{rm.languages.join(', ')}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Response Time</div>
              <div className="font-medium text-gray-800">{rm.responseTime}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Email</div>
              <a href={`mailto:${rm.email}`} className="font-medium text-blue-600 hover:underline text-sm">
                {rm.email}
              </a>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Phone</div>
              <a href={`tel:${rm.phone}`} className="font-medium text-blue-600 hover:underline text-sm">
                {rm.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`${glassCard} p-6`}>
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-500" />
              <div className="text-3xl font-bold text-gray-800">{stats.activeAssignments}</div>
            </div>
            <div className="text-sm text-gray-600">Active Assignments</div>
          </div>

          <div className={`${glassCard} p-6`}>
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-orange-500" />
              <div className="text-3xl font-bold text-orange-600">{stats.pendingEscalations}</div>
            </div>
            <div className="text-sm text-gray-600">Pending Escalations</div>
          </div>

          <div className={`${glassCard} p-6`}>
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="text-3xl font-bold text-green-600">{stats.totalEscalations - stats.pendingEscalations}</div>
            </div>
            <div className="text-sm text-gray-600">Resolved Issues</div>
          </div>

          <div className={`${glassCard} p-6`}>
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-purple-500" />
              <div className="text-3xl font-bold text-purple-600">{stats.avgResponseTime}</div>
            </div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`${glassCard} p-2 flex gap-2`}>
          <button
            onClick={() => setActiveView('dashboard')}
            className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium shadow-lg"
          >
            <TrendingUp className="w-5 h-5 inline mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('escalations')}
            className="flex-1 px-4 py-3 text-gray-600 hover:bg-white/50 rounded-lg font-medium transition-all"
          >
            <AlertTriangle className="w-5 h-5 inline mr-2" />
            Escalations ({stats.pendingEscalations})
          </button>
          <button
            onClick={() => setActiveView('messages')}
            className="flex-1 px-4 py-3 text-gray-600 hover:bg-white/50 rounded-lg font-medium transition-all"
          >
            <MessageCircle className="w-5 h-5 inline mr-2" />
            Messages
          </button>
          <button
            onClick={() => setActiveView('assignments')}
            className="flex-1 px-4 py-3 text-gray-600 hover:bg-white/50 rounded-lg font-medium transition-all"
          >
            <Users className="w-5 h-5 inline mr-2" />
            My Portfolio
          </button>
        </div>

        {/* Specialization & Sectors */}
        <div className={`${glassCard} p-6`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Specialization & Coverage</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-3">Sectors</div>
              <div className="flex flex-wrap gap-2">
                {rm.sectors.map((sector, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 mb-3">Regions</div>
              <div className="flex flex-wrap gap-2">
                {rm.regions?.map((region, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                  >
                    <MapPin className="w-3 h-3 inline mr-1" />
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Overview of Pending Escalations */}
        {filteredEscalations.length > 0 && (
          <div className={`${glassCard} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                🚨 Urgent Escalations Requiring Attention
              </h3>
              <button
                onClick={() => setActiveView('escalations')}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {filteredEscalations.slice(0, 3).map((esc) => (
                <div key={esc.escalationId} className={`p-4 border rounded-lg ${getPriorityColor(esc.priority)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{esc.companyName}</div>
                      <div className="text-sm text-gray-700 mt-1">{esc.issue}</div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                        <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(esc.status)}`}>
                          {esc.status.replace('_', ' ')}
                        </span>
                        <span>{new Date(esc.createdDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleResolveEscalation(esc.escalationId, 'Resolved via RM Console')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Escalations View
  if (activeView === 'escalations') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Escalations Management</h2>
            <p className="text-gray-600">Track and resolve investor issues</p>
          </div>
          <button
            onClick={() => setActiveView('dashboard')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Filters */}
        <div className={`${glassCard} p-4 flex gap-4`}>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company or issue..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Escalations List */}
        <div className="space-y-4">
          {filteredEscalations.length === 0 ? (
            <div className={`${glassCard} p-12 text-center`}>
              <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
              <div className="text-xl font-semibold text-gray-700">All Clear!</div>
              <div className="text-gray-500 mt-2">No pending escalations at the moment</div>
            </div>
          ) : (
            filteredEscalations.map((esc) => (
              <div key={esc.escalationId} className={`${glassCard} p-6 border-l-4 ${
                esc.priority === 'critical' ? 'border-red-500' :
                esc.priority === 'high' ? 'border-orange-500' :
                esc.priority === 'medium' ? 'border-yellow-500' :
                'border-blue-500'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="font-semibold text-lg text-gray-800">{esc.companyName}</div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(esc.priority)}`}>
                        {esc.priority.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(esc.status)}`}>
                        {esc.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-gray-700 mb-3">{esc.issue}</div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Created: {new Date(esc.createdDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Reason: {esc.reason.replace('_', ' ')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {esc.bbid}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleResolveEscalation(esc.escalationId, 'Resolved by RM')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all whitespace-nowrap"
                    >
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      Mark Resolved
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all whitespace-nowrap">
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Contact Investor
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Messages View
  if (activeView === 'messages') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
            <p className="text-gray-600">Communicate with your assigned investors</p>
          </div>
          <button
            onClick={() => setActiveView('dashboard')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className={`${glassCard} p-12 text-center`}>
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <div className="text-xl font-semibold text-gray-700">Messages View</div>
          <div className="text-gray-500 mt-2">Select an investor to view conversation history</div>
        </div>
      </div>
    );
  }

  // Assignments View
  if (activeView === 'assignments') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Investment Portfolio</h2>
            <p className="text-gray-600">Investors assigned to you</p>
          </div>
          <button
            onClick={() => setActiveView('dashboard')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className={`${glassCard} p-12 text-center`}>
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <div className="text-xl font-semibold text-gray-700">Portfolio Overview</div>
          <div className="text-gray-500 mt-2">{stats.activeAssignments} active assignments</div>
        </div>
      </div>
    );
  }

  return null;
}