import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Shield, Lock, Key, Users, Globe, Clock, 
  Activity, AlertTriangle, CheckCircle2, Smartphone,
  Monitor, MapPin, TrendingUp, FileText
} from 'lucide-react';

/**
 * 🔐 AUTH SYSTEM DASHBOARD
 * Security monitoring and authentication analytics
 * Visualizes the authentication backend as a visible feature
 */

interface Session {
  id: string;
  device: string;
  location: string;
  ip: string;
  loginTime: string;
  lastActive: string;
  status: 'active' | 'expired';
}

interface SecurityEvent {
  id: string;
  type: 'login_success' | 'login_failed' | 'password_changed' | 'mfa_enabled' | 'suspicious_activity';
  timestamp: string;
  device: string;
  location: string;
  details: string;
}

const mockSessions: Session[] = [
  {
    id: 'sess-1',
    device: 'Chrome on Windows (Desktop)',
    location: 'Dhaka, Bangladesh',
    ip: '103.92.xxx.xxx',
    loginTime: 'Feb 13, 2026 09:15 AM',
    lastActive: '2 minutes ago',
    status: 'active'
  },
  {
    id: 'sess-2',
    device: 'Safari on iPhone 15',
    location: 'Dhaka, Bangladesh',
    ip: '103.92.xxx.xxx',
    loginTime: 'Feb 12, 2026 02:30 PM',
    lastActive: '5 hours ago',
    status: 'active'
  },
  {
    id: 'sess-3',
    device: 'Chrome on Android',
    location: 'Chittagong, Bangladesh',
    ip: '103.78.xxx.xxx',
    loginTime: 'Feb 10, 2026 11:00 AM',
    lastActive: '3 days ago',
    status: 'expired'
  }
];

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: 'evt-1',
    type: 'login_success',
    timestamp: 'Feb 13, 2026 09:15:23 AM',
    device: 'Chrome on Windows',
    location: 'Dhaka, Bangladesh',
    details: 'Successful login with email + password'
  },
  {
    id: 'evt-2',
    type: 'password_changed',
    timestamp: 'Feb 11, 2026 03:45:10 PM',
    device: 'Chrome on Windows',
    location: 'Dhaka, Bangladesh',
    details: 'Password updated successfully'
  },
  {
    id: 'evt-3',
    type: 'login_failed',
    timestamp: 'Feb 10, 2026 08:22:15 AM',
    device: 'Unknown device',
    location: 'Mumbai, India',
    details: 'Failed login attempt - incorrect password (3 attempts)'
  },
  {
    id: 'evt-4',
    type: 'mfa_enabled',
    timestamp: 'Feb 8, 2026 10:30:00 AM',
    device: 'Safari on iPhone',
    location: 'Dhaka, Bangladesh',
    details: 'Two-factor authentication enabled via SMS'
  }
];

export function AuthSystemDashboard() {
  const [activeSessions, setActiveSessions] = useState(mockSessions.filter(s => s.status === 'active'));
  const [recentEvents, setRecentEvents] = useState(mockSecurityEvents);
  const [stats, setStats] = useState({
    totalLogins: 247,
    failedAttempts: 12,
    activeSessions: 2,
    mfaEnabled: true,
    lastLogin: '2 minutes ago',
    accountAge: '45 days'
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login_success': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'login_failed': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'password_changed': return <Key className="w-5 h-5 text-blue-600" />;
      case 'mfa_enabled': return <Shield className="w-5 h-5 text-purple-600" />;
      case 'suspicious_activity': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default: return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'login_success': return 'bg-green-50 border-green-200';
      case 'login_failed': return 'bg-red-50 border-red-200';
      case 'password_changed': return 'bg-blue-50 border-blue-200';
      case 'mfa_enabled': return 'bg-purple-50 border-purple-200';
      case 'suspicious_activity': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Shield className="w-10 h-10" />
              Authentication System Dashboard
            </h1>
            <p className="text-blue-100 text-lg">Complete security monitoring, session management, and auth analytics</p>
          </div>
          <div className="text-right">
            <div className={`text-5xl font-bold mb-1 ${stats.mfaEnabled ? 'text-green-300' : 'text-yellow-300'}`}>
              {stats.mfaEnabled ? '✓' : '⚠'}
            </div>
            <div className="text-blue-200 text-sm">
              {stats.mfaEnabled ? 'MFA Enabled' : 'MFA Disabled'}
            </div>
          </div>
        </div>
      </div>

      {/* Security Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card p-6 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalLogins}</div>
          </div>
          <div className="text-sm text-gray-600">Total Logins</div>
          <div className="text-xs text-green-600 mt-1">Last: {stats.lastLogin}</div>
        </div>

        <div className="glass-card p-6 border-2 border-red-200">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.failedAttempts}</div>
          </div>
          <div className="text-sm text-gray-600">Failed Attempts</div>
          <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
        </div>

        <div className="glass-card p-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Monitor className="w-6 h-6 text-blue-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.activeSessions}</div>
          </div>
          <div className="text-sm text-gray-600">Active Sessions</div>
          <div className="text-xs text-blue-600 mt-1">View all →</div>
        </div>

        <div className="glass-card p-6 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-purple-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.accountAge}</div>
          </div>
          <div className="text-sm text-gray-600">Account Age</div>
          <div className="text-xs text-gray-500 mt-1">Since Dec 30, 2025</div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Monitor className="w-6 h-6 text-blue-600" />
          Active Sessions
        </h2>
        <div className="space-y-3">
          {activeSessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    {session.device.includes('iPhone') || session.device.includes('Android') ? (
                      <Smartphone className="w-6 h-6" />
                    ) : (
                      <Monitor className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">{session.device}</div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {session.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {session.ip}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Last active: {session.lastActive}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Login: {session.loginTime}
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                  Revoke Session
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Events Log */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6 text-purple-600" />
          Security Events Log
        </h2>
        <div className="space-y-2">
          {recentEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`border-2 rounded-lg p-4 ${getEventColor(event.type)}`}
            >
              <div className="flex items-start gap-3">
                {getEventIcon(event.type)}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-semibold text-gray-900">
                      {event.type === 'login_success' && 'Successful Login'}
                      {event.type === 'login_failed' && 'Failed Login Attempt'}
                      {event.type === 'password_changed' && 'Password Changed'}
                      {event.type === 'mfa_enabled' && 'MFA Enabled'}
                      {event.type === 'suspicious_activity' && 'Suspicious Activity Detected'}
                    </div>
                    <span className="text-xs text-gray-500">{event.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{event.details}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Monitor className="w-3 h-3" />
                      {event.device}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Features */}
      <div className="glass-card p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-600" />
          Authentication System Features
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="font-semibold text-green-900 mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Password Security
            </div>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✓ bcrypt hashing (cost factor 12)</li>
              <li>✓ Minimum 8 characters</li>
              <li>✓ Special character enforcement</li>
              <li>✓ Password history tracking</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Key className="w-5 h-5" />
              Multi-Factor Auth
            </div>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✓ SMS OTP verification</li>
              <li>✓ Authenticator app support</li>
              <li>✓ Backup codes generated</li>
              <li>✓ Device trust management</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Session Management
            </div>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✓ JWT token-based auth</li>
              <li>✓ 24-hour session timeout</li>
              <li>✓ Concurrent session limits</li>
              <li>✓ Remote session revocation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* System Architecture */}
      <div className="glass-card p-6 border-2 border-indigo-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-indigo-600" />
          Auth System Architecture
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>Token Strategy:</strong> JWT access tokens (15min) + refresh tokens (7 days)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>Rate Limiting:</strong> Max 5 login attempts per 15 minutes per IP</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>Encryption:</strong> All passwords salted + hashed with bcrypt</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>Session Store:</strong> Redis-backed session management with auto-expiry</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>Audit Trail:</strong> All auth events logged to secure database</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>Anomaly Detection:</strong> Machine learning flags suspicious login patterns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
