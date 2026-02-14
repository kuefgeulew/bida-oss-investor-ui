import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Bell, CheckCircle2, AlertTriangle, Clock, Shield, TrendingUp, Award, FileText, Download, RefreshCw, Loader2, Check, X, Info, Sparkles } from 'lucide-react';
import { complianceCalendar, ComplianceEvent } from '@/data/investmentIntelligence';
import { toast } from 'sonner';

// ============================================
// 🔥 MULTI-STAGE ALERT SYSTEM
// ============================================

interface AlertStage {
  stage: 'future' | 'heads-up' | 'preparation' | 'action-needed' | 'urgent' | 'critical' | 'expired';
  priority: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: typeof Bell;
  emoji: string;
}

function getAlertStage(daysUntil: number): AlertStage {
  if (daysUntil < 0) {
    return {
      stage: 'expired',
      priority: 'critical',
      message: 'Critical - Operations may be affected',
      color: 'text-red-800',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-300',
      icon: AlertTriangle,
      emoji: '🚨'
    };
  }
  
  if (daysUntil === 0) {
    return {
      stage: 'critical',
      priority: 'critical',
      message: 'Critical - Expires today!',
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: AlertTriangle,
      emoji: '⚠️'
    };
  }
  
  if (daysUntil <= 7) {
    return {
      stage: 'urgent',
      priority: 'critical',
      message: 'Urgent - License expires soon',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      icon: AlertTriangle,
      emoji: '⏰'
    };
  }
  
  if (daysUntil <= 30) {
    return {
      stage: 'action-needed',
      priority: 'high',
      message: 'Action needed - Renew now to avoid late fee',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: Clock,
      emoji: '📋'
    };
  }
  
  if (daysUntil <= 60) {
    return {
      stage: 'preparation',
      priority: 'medium',
      message: 'Reminder - Start gathering documents',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: Info,
      emoji: '📝'
    };
  }
  
  if (daysUntil <= 90) {
    return {
      stage: 'heads-up',
      priority: 'low',
      message: `Heads up - ${Math.floor(daysUntil / 30)} months until renewal`,
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      icon: Bell,
      emoji: '🔔'
    };
  }
  
  return {
    stage: 'future',
    priority: 'low',
    message: 'Upcoming',
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    icon: Calendar,
    emoji: '📅'
  };
}

// ============================================
// Compliance Calendar Component
// ============================================

export function ComplianceCalendarView() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [renewedEvents, setRenewedEvents] = useState<string[]>([]);
  
  // Mock compliance events
  const upcomingEvents = [
    {
      ...complianceCalendar[0],
      dueDate: new Date(2026, 2, 15),
      status: 'upcoming' as const,
      id: 'event-1'
    },
    {
      ...complianceCalendar[1],
      dueDate: new Date(2026, 3, 30),
      status: 'upcoming' as const,
      id: 'event-2'
    },
    {
      ...complianceCalendar[2],
      dueDate: new Date(2026, 5, 10),
      status: 'upcoming' as const,
      id: 'event-3'
    },
    {
      ...complianceCalendar[3],
      dueDate: new Date(2026, 2, 7),
      status: 'due-soon' as const,
      id: 'event-4'
    }
  ];

  const dueSoonCount = upcomingEvents.filter(e => e.status === 'due-soon').length;

  // 🔥 WORLD-CLASS: CALENDAR EXPORT (.ICS)
  const exportToCalendar = () => {
    // Generate ICS file content
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//BIDA OSS//Compliance Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:BIDA Compliance Calendar',
      'X-WR-TIMEZONE:Asia/Dhaka',
      ...upcomingEvents.map(event => {
        const formatDate = (date: Date) => {
          return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        
        return [
          'BEGIN:VEVENT',
          `DTSTART:${formatDate(event.dueDate)}`,
          `DTEND:${formatDate(new Date(event.dueDate.getTime() + 60 * 60 * 1000))}`,
          `DTSTAMP:${formatDate(new Date())}`,
          `UID:${event.type}-${event.dueDate.getTime()}@bida.gov.bd`,
          `SUMMARY:${event.title}`,
          `DESCRIPTION:${event.description}\\nAgency: ${event.relatedAgency}`,
          'STATUS:CONFIRMED',
          'SEQUENCE:0',
          `CATEGORIES:${event.priority.toUpperCase()},COMPLIANCE`,
          'BEGIN:VALARM',
          'TRIGGER:-P7D',
          'ACTION:DISPLAY',
          'DESCRIPTION:Compliance deadline in 7 days',
          'END:VALARM',
          'END:VEVENT'
        ].join('\r\n');
      }),
      'END:VCALENDAR'
    ].join('\r\n');
    
    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'BIDA-Compliance-Calendar.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Compliance Calendar</h2>
              <p className="text-gray-600">Never miss a deadline - automated reminders</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* 🔥 WORLD-CLASS: CALENDAR EXPORT BUTTON */}
            <button
              onClick={exportToCalendar}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export (.ics)
            </button>
            {dueSoonCount > 0 && (
              <div className="px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold flex items-center gap-2">
                <Bell className="w-4 h-4" />
                {dueSoonCount} Due Soon
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-pink-50 border border-pink-200 rounded-xl">
          <p className="text-sm text-pink-900">
            <strong>Accidental non-compliance is scary.</strong> Get automated reminders 30-60 days before every deadline with direct links to filing forms.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{dueSoonCount}</div>
          <div className="text-sm text-gray-600">Due This Month</div>
        </div>
        <div className="glass-card p-4 text-center">
          <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">12</div>
          <div className="text-sm text-gray-600">Completed (YTD)</div>
        </div>
        <div className="glass-card p-4 text-center">
          <Bell className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">3</div>
          <div className="text-sm text-gray-600">Reminders Set</div>
        </div>
        <div className="glass-card p-4 text-center">
          <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">0</div>
          <div className="text-sm text-gray-600">Overdue</div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Compliance Obligations</h3>
        <div className="space-y-3">
          {upcomingEvents.map((event, index) => (
            <ComplianceEventCard 
              key={index} 
              event={event} 
              renewedEvents={renewedEvents}
              onRenew={(eventId) => setRenewedEvents([...renewedEvents, eventId])}
            />
          ))}
        </div>
      </div>

      {/* Calendar Grid (Simplified) */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly View</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => (
            <div
              key={i}
              className="aspect-square p-2 glass-button rounded-lg text-center text-sm"
            >
              {i > 0 && i < 32 ? i : ''}
            </div>
          ))}
        </div>
      </div>

      {/* Email Alerts */}
      <div className="glass-card p-6 bg-blue-50 border-2 border-blue-200">
        <div className="flex items-start gap-3">
          <Bell className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-2">Automated Email Alerts</h4>
            <p className="text-sm text-gray-700 mb-3">
              You'll receive email reminders at:
            </p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• 60 days before (for annual renewals)</li>
              <li>• 30 days before (final reminder)</li>
              <li>• 7 days before (urgent)</li>
            </ul>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Manage Alerts
          </button>
        </div>
      </div>
    </div>
  );
}

function ComplianceEventCard({ event, renewedEvents, onRenew }: {
  event: ComplianceEvent & { dueDate: Date; status: 'upcoming' | 'due-soon'; id: string };
  renewedEvents: string[];
  onRenew: (eventId: string) => void;
}) {
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [isRenewing, setIsRenewing] = useState(false);
  
  const typeIcons = {
    renewal: <Calendar className="w-5 h-5" />,
    filing: <FileText className="w-5 h-5" />,
    inspection: <CheckCircle2 className="w-5 h-5" />,
    payment: <TrendingUp className="w-5 h-5" />
  };

  const daysUntil = Math.ceil((event.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isRenewed = renewedEvents.includes(event.id);
  const isRenewalType = event.type === 'renewal';
  
  // 🔥 ENHANCED: Multi-Stage Alert System
  const alertStage = getAlertStage(daysUntil);
  const AlertIcon = alertStage.icon;

  // 🔥 NEW: One-Tap Renewal Handler
  const handleQuickRenewal = async () => {
    setIsRenewing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onRenew(event.id);
    setIsRenewing(false);
    
    toast.success('Renewal submitted successfully!', {
      description: `${event.title} renewed for another year. Confirmation sent to ${event.relatedAgency}.`,
      duration: 5000,
    });
    
    setShowRenewalModal(false);
  };

  return (
    <>
      <div className={`p-4 rounded-xl border-2 ${alertStage.borderColor} ${alertStage.bgColor} ${isRenewed ? 'opacity-60' : ''}`}>
        {/* 🔥 MULTI-STAGE ALERT BANNER */}
        {!isRenewed && alertStage.stage !== 'future' && (
          <div className={`mb-3 p-3 rounded-lg ${alertStage.bgColor} border ${alertStage.borderColor} flex items-center gap-3`}>
            <AlertIcon className={`w-5 h-5 ${alertStage.color} flex-shrink-0`} />
            <div className="flex-1">
              <p className={`text-sm font-semibold ${alertStage.color} flex items-center gap-2`}>
                <span className="text-lg">{alertStage.emoji}</span>
                {alertStage.message}
              </p>
            </div>
          </div>
        )}
        
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            alertStage.priority === 'critical' ? 'bg-red-200 text-red-700' :
            alertStage.priority === 'high' ? 'bg-orange-200 text-orange-700' :
            alertStage.priority === 'medium' ? 'bg-blue-200 text-blue-700' :
            'bg-gray-200 text-gray-700'
          }`}>
            {typeIcons[event.type]}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  {event.title}
                  {isRenewed && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      ✓ Renewed
                    </span>
                  )}
                </h4>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${alertStage.color}`}>
                  {daysUntil} days
                </div>
                <div className="text-xs text-gray-600">until due</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">
                Agency: {event.relatedAgency} • Due: {event.dueDate.toLocaleDateString()}
              </span>
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all">
                  File Now
                </button>
                
                {/* 🔥 NEW: One-Tap Renewal Button (only for renewal type) */}
                {isRenewalType && !isRenewed && (
                  <button
                    onClick={() => setShowRenewalModal(true)}
                    className="px-4 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-1 font-semibold shadow-md"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Quick Renew
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 NEW: Quick Renewal Modal */}
      <AnimatePresence>
        {showRenewalModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isRenewing && setShowRenewalModal(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full z-50 border-2 border-green-500"
            >
              <button
                onClick={() => !isRenewing && setShowRenewalModal(false)}
                disabled={isRenewing}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 disabled:opacity-50"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-green-100 rounded-full">
                  <RefreshCw className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">One-Tap Renewal</h3>
                  <p className="text-gray-600">Instant compliance renewal</p>
                </div>
              </div>
              
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-green-900 mb-2">Renewal Details</h4>
                <div className="space-y-2 text-sm text-green-800">
                  <p>• <strong>Item:</strong> {event.title}</p>
                  <p>• <strong>Agency:</strong> {event.relatedAgency}</p>
                  <p>• <strong>Current expiry:</strong> {event.dueDate.toLocaleDateString()}</p>
                  <p>• <strong>New expiry:</strong> {new Date(event.dueDate.getTime() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                  <p>• <strong>Renewal period:</strong> 1 year</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">What happens next:</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Instant Submission</p>
                      <p className="text-sm text-gray-600">Renewal application sent to {event.relatedAgency}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Auto-Processing</p>
                      <p className="text-sm text-gray-600">System automatically processes standard renewals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Confirmation</p>
                      <p className="text-sm text-gray-600">Email confirmation within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>💡 Pro Tip:</strong> Quick renewals are pre-approved for investors in good standing. Your compliance history score is excellent (92/100).
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRenewalModal(false)}
                  disabled={isRenewing}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleQuickRenewal}
                  disabled={isRenewing}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isRenewing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting Renewal...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Confirm Renewal
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================
// Investor Risk Score Component
// ============================================

export function RiskScoreView() {
  // Mock risk score data
  const riskScore = 78;
  const factors = [
    { name: 'Investment Size', score: 90, weight: 20, description: '$5M+ reduces risk' },
    { name: 'Country of Origin', score: 85, weight: 15, description: 'OECD member country' },
    { name: 'Sector Experience', score: 75, weight: 15, description: 'Established in sector' },
    { name: 'Profile Completeness', score: 100, weight: 10, description: 'All documents submitted' },
    { name: 'Financial Verification', score: 80, weight: 15, description: 'Bank solvency verified' },
    { name: 'Compliance History', score: 65, weight: 10, description: 'New investor (no history)' },
    { name: 'Business Plan Quality', score: 70, weight: 10, description: 'Detailed plan submitted' },
    { name: 'References', score: 50, weight: 5, description: 'No business references yet' }
  ];

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Low Risk', color: 'green', benefit: 'Fast-track approval' };
    if (score >= 60) return { level: 'Medium Risk', color: 'yellow', benefit: 'Standard process' };
    return { level: 'High Risk', color: 'red', benefit: 'Additional review' };
  };

  const risk = getRiskLevel(riskScore);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-600 to-slate-700 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Investor Risk Score</h2>
            <p className="text-gray-600">Faster approvals for vetted investors</p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <p className="text-sm text-gray-900">
            <strong>Trust-building across agencies.</strong> Your risk score helps officers and banks make faster decisions. Higher scores = faster approvals.
          </p>
        </div>
      </div>

      {/* Score Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`glass-card p-8 bg-gradient-to-br from-${risk.color}-50 to-${risk.color}-100 border-2 border-${risk.color}-200`}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Your Risk Score</h3>
            <p className="text-gray-700">Based on 8 factors analyzed by our algorithm</p>
          </div>
          <div className="text-right">
            <div className="text-6xl font-bold text-gray-900">{riskScore}</div>
            <div className="text-sm text-gray-600">out of 100</div>
          </div>
        </div>

        {/* Score Bar */}
        <div className="mb-6">
          <div className="h-4 bg-white rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${riskScore}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r from-${risk.color}-500 to-${risk.color}-600`}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-xl">
            <div className="text-sm text-gray-600 mb-1">Risk Level</div>
            <div className={`text-xl font-bold text-${risk.color}-700`}>{risk.level}</div>
          </div>
          <div className="p-4 bg-white rounded-xl">
            <div className="text-sm text-gray-600 mb-1">Approval Benefit</div>
            <div className="text-xl font-bold text-gray-900">{risk.benefit}</div>
          </div>
          <div className="p-4 bg-white rounded-xl">
            <div className="text-sm text-gray-600 mb-1">Ranking</div>
            <div className="text-xl font-bold text-gray-900">Top 15%</div>
          </div>
        </div>
      </motion.div>

      {/* Factor Breakdown */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Breakdown</h3>
        <div className="space-y-4">
          {factors.map((factor, index) => (
            <FactorCard key={index} factor={factor} />
          ))}
        </div>
      </div>

      {/* How to Improve */}
      <div className="glass-card p-6 bg-blue-50 border-2 border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          How to Improve Your Score
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <Award className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span><strong>Complete profile 100%</strong> - Add all optional information</span>
          </li>
          <li className="flex items-start gap-2">
            <Award className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span><strong>Get business references</strong> - From banks or partners</span>
          </li>
          <li className="flex items-start gap-2">
            <Award className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span><strong>Enhance business plan</strong> - Add market research and projections</span>
          </li>
          <li className="flex items-start gap-2">
            <Award className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span><strong>Build compliance history</strong> - On-time filings increase score</span>
          </li>
        </ul>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h4 className="font-semibold text-gray-900 mb-3">For Officers</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Quick risk assessment
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Prioritize high-quality applications
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Reduce review time
            </li>
          </ul>
        </div>
        <div className="glass-card p-6">
          <h4 className="font-semibold text-gray-900 mb-3">For Banks</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Credit decision support
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Loan approval confidence
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Reduced verification time
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function FactorCard({ factor }: {
  factor: {
    name: string;
    score: number;
    weight: number;
    description: string;
  };
}) {
  const getColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'yellow';
    return 'orange';
  };

  const color = getColor(factor.score);

  return (
    <div className="p-4 glass-button rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{factor.name}</h4>
          <p className="text-xs text-gray-600">{factor.description}</p>
        </div>
        <div className="text-right ml-4">
          <div className={`text-2xl font-bold text-${color}-700`}>{factor.score}</div>
          <div className="text-xs text-gray-600">{factor.weight}% weight</div>
        </div>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-${color}-500`}
          style={{ width: `${factor.score}%` }}
        />
      </div>
    </div>
  );
}