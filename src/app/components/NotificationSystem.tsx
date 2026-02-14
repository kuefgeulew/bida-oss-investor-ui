import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  XCircle, 
  X,
  Mail,
  MessageSquare,
  Clock
} from 'lucide-react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

interface NotificationSystemProps {
  notifications?: Notification[];
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
  onClearAll: () => void;
}

export function NotificationSystem({ 
  notifications = [], 
  onMarkAsRead, 
  onDismiss,
  onClearAll 
}: NotificationSystemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [latestNotification, setLatestNotification] = useState<Notification | null>(null);

  const unreadCount = (notifications || []).filter(n => !n.read).length;

  // Show toast for new notifications
  useEffect(() => {
    const latest = notifications[0];
    if (latest && !latest.read && latest !== latestNotification) {
      setLatestNotification(latest);
      setShowToast(true);
      
      // Auto-hide toast after 5 seconds
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notifications, latestNotification]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Notification Bell Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 hover:bg-white/20 rounded-lg transition-all"
        >
          <Bell className="w-6 h-6 text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-96 shadow-xl z-50 max-h-[500px] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Notifications</h3>
                  <p className="text-xs text-gray-600">{unreadCount} unread</p>
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={() => {
                      onClearAll();
                      setIsOpen(false);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="overflow-y-auto flex-1">
                {notifications.length === 0 ? (
                  <div className="p-12 text-center">
                    <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`p-4 hover:bg-gray-50 transition-all cursor-pointer ${
                          !notification.read ? 'bg-blue-50/50' : ''
                        }`}
                        onClick={() => onMarkAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-medium text-sm">{notification.title}</h4>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDismiss(notification.id);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTime(notification.timestamp)}
                              </span>
                              {notification.actionLabel && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    notification.onAction?.();
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                >
                                  {notification.actionLabel} →
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && latestNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-0 left-1/2 z-[100] w-96"
          >
            <div className={`p-4 border-2 ${getBgColor(latestNotification.type)} shadow-xl`}>
              <div className="flex gap-3">
                {getIcon(latestNotification.type)}
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{latestNotification.title}</h4>
                  <p className="text-sm text-gray-700">{latestNotification.message}</p>
                </div>
                <button
                  onClick={() => setShowToast(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const dismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Auto-load system notifications
  useEffect(() => {
    const systemNotifications = [
      {
        type: 'success' as const,
        title: 'Document Approved',
        message: 'Your passport copy has been verified and approved by BIDA officer.',
        actionLabel: 'View Document'
      },
      {
        type: 'info' as const,
        title: 'Step Completed',
        message: 'Company Registration with RJSC has been completed successfully.',
        actionLabel: 'View Journey'
      },
      {
        type: 'warning' as const,
        title: 'Action Required',
        message: 'Environment Clearance requires additional documents. Please upload within 48 hours.',
        actionLabel: 'Upload Now'
      }
    ];

    systemNotifications.forEach((notif, index) => {
      setTimeout(() => {
        addNotification(notif);
      }, (index + 1) * 2000);
    });
  }, []);

  return {
    notifications,
    addNotification,
    markAsRead,
    dismiss,
    clearAll
  };
}

// Email/SMS notification sender (simulation)
export const sendNotification = async (
  recipient: { email: string; phone?: string },
  notification: {
    subject: string;
    message: string;
    type: 'email' | 'sms' | 'both';
  }
) => {
  // Simulate API call to EmailJS or Twilio
  await new Promise(resolve => setTimeout(resolve, 500));

  console.log('📧 Notification sent:', {
    to: notification.type === 'sms' ? recipient.phone : recipient.email,
    subject: notification.subject,
    message: notification.message,
    via: notification.type
  });

  return {
    success: true,
    messageId: `msg-${Date.now()}`,
    timestamp: new Date().toISOString()
  };
};