// 🆕 UTILITY ALERT SUBSCRIPTION - Subscribe to zone utility alerts
// Features: SMS/email notifications for outages, maintenance, warnings
// Mounts: Inside zone utility panel or as standalone modal

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Mail, Smartphone, CheckCircle2, AlertTriangle, Calendar, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface UtilityAlertSubscriptionProps {
  zoneId: string;
  zoneName: string;
}

export function UtilityAlertSubscription({ zoneId, zoneName }: UtilityAlertSubscriptionProps) {
  const [email, setEmail] = useState('investor@company.com');
  const [phone, setPhone] = useState('+880-1712345678');
  
  const [alerts, setAlerts] = useState({
    powerOutages: true,
    gasInterruptions: true,
    waterIssues: true,
    scheduledMaintenance: false,
    seasonalWarnings: true
  });

  const [channels, setChannels] = useState({
    email: true,
    sms: true,
    push: false
  });

  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    // Simulate subscription
    setTimeout(() => {
      setIsSubscribed(true);
      toast.success('Alert Subscription Activated!', {
        description: `You'll receive ${Object.values(channels).filter(Boolean).length} types of notifications for ${zoneName}`
      });
    }, 500);
  };

  const handleUnsubscribe = () => {
    setIsSubscribed(false);
    toast.info('Subscription Cancelled', {
      description: 'You will no longer receive utility alerts for this zone'
    });
  };

  const alertTypes = [
    {
      id: 'powerOutages',
      icon: Zap,
      label: 'Unplanned Power Outages',
      description: 'Instant notifications when power goes down + estimated restoration time',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200'
    },
    {
      id: 'gasInterruptions',
      icon: AlertTriangle,
      label: 'Gas Supply Interruptions',
      description: 'Alerts for gas pressure drops or supply issues',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200'
    },
    {
      id: 'waterIssues',
      icon: AlertTriangle,
      label: 'Water Quality/Supply Issues',
      description: 'Notifications for water quality test failures or supply disruptions',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      id: 'scheduledMaintenance',
      icon: Calendar,
      label: 'Scheduled Maintenance',
      description: '48-hour advance notice of planned utility maintenance',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200'
    },
    {
      id: 'seasonalWarnings',
      icon: Bell,
      label: 'Seasonal Warnings',
      description: 'Winter gas pressure drops, monsoon power issues, etc.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="w-6 h-6" />
          <h3 className="text-xl font-bold">Subscribe to Utility Alerts</h3>
        </div>
        <p className="text-blue-100 text-sm">
          Get real-time notifications for <span className="font-semibold">{zoneName}</span>
        </p>
      </div>

      {/* Contact Information */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4">Contact Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              <Smartphone className="w-4 h-4 inline mr-1" />
              Phone Number (SMS)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
              placeholder="+880-XXXXXXXXXX"
            />
          </div>
        </div>
      </div>

      {/* Alert Types */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4">Alert Types</h4>
        <div className="space-y-3">
          {alertTypes.map(alert => (
            <div
              key={alert.id}
              className={`${alert.bg} border-2 ${alert.border} rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                alerts[alert.id] ? 'ring-2 ring-blue-400' : ''
              }`}
              onClick={() => setAlerts({ ...alerts, [alert.id]: !alerts[alert.id] })}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    checked={alerts[alert.id]}
                    onChange={() => {}}
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <alert.icon className={`w-4 h-4 ${alert.color}`} />
                    <span className="font-semibold text-gray-900 text-sm">{alert.label}</span>
                  </div>
                  <p className="text-xs text-gray-600">{alert.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Channels */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4">Notification Channels</h4>
        <div className="space-y-3">
          <div
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              channels.email ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-400' : 'bg-gray-50 border-gray-200'
            }`}
            onClick={() => setChannels({ ...channels, email: !channels.email })}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={channels.email}
                onChange={() => {}}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <Mail className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">Email Notifications</div>
                <div className="text-xs text-gray-600">Detailed alerts with full context to {email}</div>
              </div>
            </div>
          </div>

          <div
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              channels.sms ? 'bg-green-50 border-green-300 ring-2 ring-green-400' : 'bg-gray-50 border-gray-200'
            }`}
            onClick={() => setChannels({ ...channels, sms: !channels.sms })}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={channels.sms}
                onChange={() => {}}
                className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
              />
              <Smartphone className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">SMS Alerts</div>
                <div className="text-xs text-gray-600">Instant text messages to {phone}</div>
              </div>
            </div>
          </div>

          <div
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              channels.push ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-400' : 'bg-gray-50 border-gray-200'
            }`}
            onClick={() => setChannels({ ...channels, push: !channels.push })}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={channels.push}
                onChange={() => {}}
                className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <Bell className="w-5 h-5 text-purple-600" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">App Push Notifications</div>
                <div className="text-xs text-gray-600">Real-time in-app alerts (requires mobile app)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Subscription Status */}
      {isSubscribed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
            <div className="flex-1">
              <h4 className="font-bold text-green-900 mb-2">✓ Subscription Active</h4>
              <p className="text-sm text-green-800 mb-3">
                You're now subscribed to {Object.values(alerts).filter(Boolean).length} alert types for {zoneName} via {Object.values(channels).filter(Boolean).length} channels.
              </p>
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="text-xs font-semibold text-gray-700 mb-2">Recent Alert Example:</div>
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-orange-600 mt-0.5" />
                  <div className="flex-1 text-xs">
                    <div className="font-semibold text-gray-900">Planned Maintenance Alert</div>
                    <div className="text-gray-600 mt-1">
                      Feb 20, 2026 - Power substation upgrade scheduled 8:00 AM - 12:00 PM. Backup generators will be active.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {!isSubscribed ? (
          <button
            onClick={handleSubscribe}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
          >
            Subscribe to Alerts
          </button>
        ) : (
          <button
            onClick={handleUnsubscribe}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all"
          >
            Unsubscribe
          </button>
        )}
      </div>

      {/* Info Footer */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-xs text-blue-900">
            <span className="font-bold">FDI Confidence Signal:</span> By publishing real-time utility data and proactive alerts, BIDA demonstrates transparency and investor care—a world-first among IPAs.
          </div>
        </div>
      </div>
    </div>
  );
}
