// 🚨 POLICY ALERT HUB — Complete Policy Management System
// Includes: Personalized Alerts, Legislative Tracker, Comment Periods, Alert Preferences, Delivery Channels

import React, { useState, useMemo } from 'react';
import { 
  Bell, Settings, Mail, MessageSquare, CheckCircle, AlertCircle, 
  FileText, Calendar, ExternalLink, Send, Building2, Phone, MessageCircle,
  Filter, Download, ArrowRight, Gavel, Users, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  getFilteredPolicyAlerts, 
  getCommentPeriodAlerts,
  getLegislativeTrackerAlerts,
  calculatePersonalizedImpact,
  type PolicyAlert,
  type InvestorProfile
} from './policyEngine';
import { glassCard } from '../config/designSystem';
import { RegulatoryCalendar } from './RegulatoryCalendar';

interface PolicyAlertHubProps {
  investorProfile: InvestorProfile;
}

type TabType = 'alerts' | 'calendar' | 'legislative' | 'comments' | 'preferences';

export function PolicyAlertHub({ investorProfile }: PolicyAlertHubProps) {
  const [activeTab, setActiveTab] = useState<TabType>('alerts');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<PolicyAlert | null>(null);
  
  // Alert Preferences State
  const [emailDigest, setEmailDigest] = useState<'daily' | 'weekly' | 'disabled'>('weekly');
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [criticalAlertsOnly, setCriticalAlertsOnly] = useState(false);

  // Get filtered alerts
  const filteredAlerts = useMemo(() => 
    getFilteredPolicyAlerts({
      sector: investorProfile.sector,
      location: investorProfile.location,
      companySize: investorProfile.companySize,
      hsCodes: investorProfile.hsCodes,
      includeAll: false
    }),
    [investorProfile]
  );

  const commentPeriodAlerts = useMemo(() => getCommentPeriodAlerts(), []);
  const legislativeAlerts = useMemo(() => getLegislativeTrackerAlerts(), []);

  // Calculate personalized impacts
  const alertsWithImpact = useMemo(() => 
    filteredAlerts.map(alert => ({
      alert,
      impact: calculatePersonalizedImpact(alert, investorProfile)
    })),
    [filteredAlerts, investorProfile]
  );

  const handleSendTestEmail = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Sending test email...',
        success: () => {
          return `✅ Test email sent to ${investorProfile.companyName}@example.com`;
        },
        error: 'Failed to send test email'
      }
    );
  };

  const handleSendTestSMS = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1200)),
      {
        loading: 'Sending test SMS...',
        success: '✅ Test SMS sent to +880 1XXX-XXXXXX',
        error: 'Failed to send test SMS'
      }
    );
  };

  const handleSendTestWhatsApp = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1300)),
      {
        loading: 'Sending test WhatsApp message...',
        success: '✅ Test message sent via WhatsApp',
        error: 'Failed to send WhatsApp message'
      }
    );
  };

  const handleSubmitComment = (alertId: string, comment: string) => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: 'Submitting your feedback...',
        success: () => {
          return `✅ Comment submitted successfully! Reference ID: PC-${Date.now()}`;
        },
        error: 'Failed to submit comment'
      }
    );
  };

  const handleActionIntegration = (alert: PolicyAlert) => {
    if (alert.relatedFormId) {
      toast.success(`Redirecting to ${alert.relatedFormId} form...`, {
        description: 'Opening form in OSS workflow system'
      });
      // In real implementation, this would navigate to the actual form
    } else {
      toast.info('No direct form integration available for this alert');
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {[
          { id: 'alerts' as const, label: 'Personalized Alerts', count: filteredAlerts.length },
          { id: 'calendar' as const, label: 'Regulatory Calendar', count: 0 },
          { id: 'legislative' as const, label: 'Legislative Tracker', count: legislativeAlerts.length },
          { id: 'comments' as const, label: 'Comment Periods', count: commentPeriodAlerts.length },
          { id: 'preferences' as const, label: 'Alert Preferences', count: 0 }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {/* Personalized Alerts Tab */}
        {activeTab === 'alerts' && (
          <motion.div
            key="alerts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Profile Summary */}
            <div className={`${glassCard['p-4']} bg-gradient-to-r from-green-50 to-blue-50`}>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Sector:</span>
                  <span className="ml-2 font-semibold text-gray-900">{investorProfile.sector}</span>
                </div>
                <div className="w-px h-4 bg-gray-300" />
                <div>
                  <span className="text-gray-600">Location:</span>
                  <span className="ml-2 font-semibold text-gray-900">{investorProfile.location}</span>
                </div>
                <div className="w-px h-4 bg-gray-300" />
                <div>
                  <span className="text-gray-600">Size:</span>
                  <span className="ml-2 font-semibold text-gray-900">{investorProfile.companySize}</span>
                </div>
                <div className="w-px h-4 bg-gray-300" />
                <div>
                  <span className="text-gray-600">Revenue:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    BDT {(investorProfile.annualRevenue / 10000000).toFixed(1)} Cr
                  </span>
                </div>
              </div>
            </div>

            {/* Alerts with Personalized Impact */}
            {alertsWithImpact.map(({ alert, impact }, idx) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`${glassCard['p-6']} border-l-4 ${
                  alert.priority === 'critical' ? 'border-red-500' :
                  alert.priority === 'high' ? 'border-orange-500' :
                  alert.priority === 'medium' ? 'border-yellow-500' :
                  'border-blue-500'
                }`}
              >
                <div className="space-y-4">
                  {/* Alert Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          alert.priority === 'critical' ? 'bg-red-100 text-red-700' :
                          alert.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {alert.priority.toUpperCase()}
                        </span>
                        <span className="text-xs font-semibold text-gray-500 uppercase">{alert.type}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{alert.source}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{alert.title}</h3>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">Relevance</div>
                      <div className={`text-3xl font-bold ${
                        impact.relevanceScore >= 80 ? 'text-green-600' :
                        impact.relevanceScore >= 50 ? 'text-yellow-600' :
                        'text-gray-600'
                      }`}>
                        {impact.relevanceScore}%
                      </div>
                    </div>
                  </div>

                  {/* Personalized Impact */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-semibold text-blue-900 mb-1">Impact on Your Business</div>
                        <div className="text-sm text-blue-800 mb-2">{impact.impactSummary}</div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {impact.financialImpact !== 0 && (
                            <div>
                              <span className="text-blue-700">Financial Impact:</span>
                              <span className={`ml-2 font-semibold ${
                                impact.financialImpact > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {impact.financialImpact > 0 ? '+' : ''}
                                BDT {Math.abs(impact.financialImpact).toLocaleString()}
                              </span>
                            </div>
                          )}
                          <div>
                            <span className="text-blue-700">Timeline:</span>
                            <span className="ml-2 font-semibold text-blue-900">{impact.timelineImpact}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Steps */}
                  {alert.actionSteps && alert.actionSteps.length > 0 && (
                    <div className="space-y-2">
                      <div className="font-semibold text-gray-900 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Required Action Steps:
                      </div>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 ml-6">
                        {alert.actionSteps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    {alert.relatedFormId && (
                      <button
                        onClick={() => handleActionIntegration(alert)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        File Form Now
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    {alert.detailsUrl && (
                      <button
                        onClick={() => window.open(alert.detailsUrl, '_blank')}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Official Document
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedAlert(alert)}
                      className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Regulatory Calendar Tab */}
        {activeTab === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <RegulatoryCalendar sector={investorProfile.sector} daysAhead={90} />
          </motion.div>
        )}

        {/* Legislative Tracker Tab */}
        {activeTab === 'legislative' && (
          <motion.div
            key="legislative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className={`${glassCard['p-6']} bg-gradient-to-r from-purple-50 to-indigo-50`}>
              <div className="flex items-center gap-4">
                <Gavel className="w-12 h-12 text-purple-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Legislative Tracker</h2>
                  <p className="text-gray-600">Bills under consideration in Parliament & draft regulations</p>
                </div>
              </div>
            </div>

            {legislativeAlerts.map((alert, idx) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`${glassCard['p-6']}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    alert.legislativeStatus === 'parliament' ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <Gavel className={`w-6 h-6 ${
                      alert.legislativeStatus === 'parliament' ? 'text-purple-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        alert.legislativeStatus === 'parliament' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {alert.legislativeStatus === 'parliament' ? 'IN PARLIAMENT' : 'DRAFT'}
                      </span>
                      <span className="text-xs text-gray-500">{alert.source}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{alert.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        Expected: {new Date(alert.effectiveDate).toLocaleDateString()}
                      </div>
                      {alert.commentPeriodOpen && alert.commentDeadline && (
                        <div className="flex items-center gap-2 text-green-600">
                          <Users className="w-4 h-4" />
                          Comments open until {new Date(alert.commentDeadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Comment Periods Tab */}
        {activeTab === 'comments' && (
          <motion.div
            key="comments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className={`${glassCard['p-6']} bg-gradient-to-r from-green-50 to-teal-50`}>
              <div className="flex items-center gap-4">
                <MessageSquare className="w-12 h-12 text-green-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Open Comment Periods</h2>
                  <p className="text-gray-600">Submit feedback on draft policies and regulations</p>
                </div>
              </div>
            </div>

            {commentPeriodAlerts.map((alert, idx) => (
              <CommentPeriodCard 
                key={alert.id} 
                alert={alert} 
                onSubmit={(comment) => handleSubmitComment(alert.id, comment)}
                delay={idx * 0.05}
              />
            ))}
          </motion.div>
        )}

        {/* Alert Preferences Tab */}
        {activeTab === 'preferences' && (
          <motion.div
            key="preferences"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className={`${glassCard['p-6']} bg-gradient-to-r from-blue-50 to-indigo-50`}>
              <div className="flex items-center gap-4">
                <Settings className="w-12 h-12 text-blue-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Alert Preferences</h2>
                  <p className="text-gray-600">Customize how you receive policy notifications</p>
                </div>
              </div>
            </div>

            {/* Email Digest */}
            <div className={`${glassCard['p-6']}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Email Digest</h3>
                  <p className="text-sm text-gray-600">Receive consolidated policy alerts via email</p>
                </div>
              </div>
              <div className="space-y-3">
                {['daily', 'weekly', 'disabled'].map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="emailDigest"
                      checked={emailDigest === option}
                      onChange={() => setEmailDigest(option as any)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700 capitalize">{option}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={handleSendTestEmail}
                className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Test Email
              </button>
            </div>

            {/* SMS Alerts */}
            <div className={`${glassCard['p-6']}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">SMS Alerts</h3>
                    <p className="text-sm text-gray-600">Urgent/deadline-based notifications via SMS</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsEnabled}
                    onChange={(e) => setSmsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <button
                onClick={handleSendTestSMS}
                disabled={!smsEnabled}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                Send Test SMS
              </button>
            </div>

            {/* WhatsApp Integration */}
            <div className={`${glassCard['p-6']}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">WhatsApp Notifications</h3>
                    <p className="text-sm text-gray-600">Receive alerts via WhatsApp Business</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={whatsappEnabled}
                    onChange={(e) => setWhatsappEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <button
                onClick={handleSendTestWhatsApp}
                disabled={!whatsappEnabled}
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                Send Test WhatsApp
              </button>
            </div>

            {/* Filter Options */}
            <div className={`${glassCard['p-6']}`}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Alert Filters</h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={criticalAlertsOnly}
                  onChange={(e) => setCriticalAlertsOnly(e.target.checked)}
                  className="w-4 h-4 text-red-600"
                />
                <span className="text-gray-700">Only show critical alerts</span>
              </label>
            </div>

            {/* Save Button */}
            <button
              onClick={() => toast.success('Preferences saved successfully!')}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Preferences
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Comment Period Card Component
function CommentPeriodCard({ 
  alert, 
  onSubmit,
  delay = 0
}: { 
  alert: PolicyAlert; 
  onSubmit: (comment: string) => void;
  delay?: number;
}) {
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  const daysRemaining = alert.commentDeadline 
    ? Math.ceil((new Date(alert.commentDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`${glassCard['p-6']}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-green-100 rounded-lg">
          <MessageSquare className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              COMMENT PERIOD OPEN
            </span>
            <span className="text-xs text-gray-500">{alert.source}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{alert.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className={`font-semibold ${
                daysRemaining <= 7 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {daysRemaining} days remaining
              </span>
            </div>
            <div className="text-gray-600">
              Deadline: {alert.commentDeadline && new Date(alert.commentDeadline).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Submit Your Feedback
        </button>
      ) : (
        <div className="space-y-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your feedback and recommendations..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-32"
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                onSubmit(comment);
                setComment('');
                setShowForm(false);
              }}
              disabled={!comment.trim()}
              className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Submit Comment
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}