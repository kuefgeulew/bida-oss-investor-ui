import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Check, Loader2, Trash2, Info, CheckCircle2, AlertTriangle, XCircle, FileText, CreditCard, Calendar } from 'lucide-react';
import { toast } from 'sonner';

// Mock Notification type (NO BACKEND)
interface Notification {
  id: string;
  type: 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO' | 'APPLICATION_STATUS' | 'PAYMENT' | 'APPOINTMENT' | 'SLA_ALERT';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Mock notifications data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'APPLICATION_STATUS',
    title: 'Application Approved',
    message: 'Your trade license application has been approved by City Corporation',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
  },
  {
    id: '2',
    type: 'SLA_ALERT',
    title: 'SLA Warning',
    message: 'Environmental clearance approaching deadline (3 days remaining)',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 hours ago
  },
  {
    id: '3',
    type: 'PAYMENT',
    title: 'Payment Confirmed',
    message: 'Registration fee payment of BDT 15,000 has been processed',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: '4',
    type: 'APPOINTMENT',
    title: 'Appointment Reminder',
    message: 'BIDA office visit scheduled for tomorrow at 10:00 AM',
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString() // 30 min ago
  },
  {
    id: '5',
    type: 'SUCCESS',
    title: 'Document Verified',
    message: 'Your passport copy has been verified successfully',
    read: true,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() // 2 days ago
  }
];

export function NotificationPanel() {
  const [showPanel, setShowPanel] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load notifications from localStorage or use mock data (NO BACKEND)
  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    try {
      // Try to load from localStorage first
      const stored = localStorage.getItem('bida_notifications');
      if (stored) {
        const notifs = JSON.parse(stored);
        setNotifications(notifs);
        setUnreadCount(notifs.filter((n: Notification) => !n.read).length);
      } else {
        // Use mock data
        setNotifications(MOCK_NOTIFICATIONS);
        setUnreadCount(MOCK_NOTIFICATIONS.filter(n => !n.read).length);
        // Save to localStorage
        localStorage.setItem('bida_notifications', JSON.stringify(MOCK_NOTIFICATIONS));
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
      // Fallback to mock data
      setNotifications(MOCK_NOTIFICATIONS);
      setUnreadCount(MOCK_NOTIFICATIONS.filter(n => !n.read).length);
    }
  };

  const saveNotifications = (notifs: Notification[]) => {
    try {
      localStorage.setItem('bida_notifications', JSON.stringify(notifs));
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  };

  const handleMarkAsRead = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
    saveNotifications(updated);
  };

  const handleMarkAllRead = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const updated = notifications.map(n => ({ ...n, read: true }));
      setNotifications(updated);
      setUnreadCount(0);
      saveNotifications(updated);
      toast.success('All notifications marked as read');
      setLoading(false);
    }, 500);
  };

  const handleClearAll = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setNotifications([]);
      setUnreadCount(0);
      localStorage.removeItem('bida_notifications');
      toast.success('All notifications cleared');
      setLoading(false);
    }, 500);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'ERROR':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'WARNING':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'APPLICATION_STATUS':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'PAYMENT':
        return <CreditCard className="w-5 h-5 text-purple-600" />;
      case 'APPOINTMENT':
        return <Calendar className="w-5 h-5 text-indigo-600" />;
      case 'SLA_ALERT':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default:
        return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'SUCCESS':
        return 'bg-green-50 border-green-200';
      case 'ERROR':
        return 'bg-red-50 border-red-200';
      case 'WARNING':
        return 'bg-yellow-50 border-yellow-200';
      case 'APPLICATION_STATUS':
        return 'bg-blue-50 border-blue-200';
      case 'PAYMENT':
        return 'bg-purple-50 border-purple-200';
      case 'APPOINTMENT':
        return 'bg-indigo-50 border-indigo-200';
      case 'SLA_ALERT':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        className="relative p-2 rounded-xl hover:shadow-md transition-all"
        onClick={() => setShowPanel(!showPanel)}
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {showPanel && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPanel(false)}
              className="fixed inset-0 z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="absolute right-0 top-12 w-96 max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <div>
                    <h3 className="font-bold">Notifications</h3>
                    <p className="text-xs text-white/80">{unreadCount} unread</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPanel(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Actions */}
              {notifications.length > 0 && (
                <div className="p-3 border-b border-gray-200 flex gap-2">
                  <button
                    onClick={handleMarkAllRead}
                    disabled={loading || unreadCount === 0}
                    className="flex-1 px-3 py-2 text-sm rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Mark All Read
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleClearAll}
                    disabled={loading}
                    className="flex-1 px-3 py-2 text-sm rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </div>
              )}

              {/* Notifications List */}
              <div className="overflow-y-auto max-h-[450px]">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No notifications</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {notifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`mb-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          notif.read 
                            ? 'bg-white border-gray-200 opacity-60' 
                            : `${getNotificationColor(notif.type)}`
                        }`}
                        onClick={() => handleMarkAsRead(notif.id)}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900 text-sm">
                                {notif.title}
                              </h4>
                              {!notif.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                              {notif.message}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatTime(notif.createdAt)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}