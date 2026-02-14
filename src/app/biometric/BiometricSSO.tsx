import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Fingerprint, Shield, CheckCircle2, AlertCircle, Clock,
  Smartphone, Lock, Unlock, Eye, QrCode, Key, 
  RefreshCw, Settings, Trash2, Plus, Info, X,
  Laptop, Tablet, Monitor, Watch, Globe, MapPin,
  Calendar, Activity, TrendingUp, AlertTriangle, Zap
} from 'lucide-react';
import { glassCard } from '@/app/config/designSystem';
import { useLanguage } from '@/app/components/LanguageContext';
import { toast } from 'sonner';

// 🔐 BIOMETRIC DEVICE STRUCTURE
interface BiometricDevice {
  id: string;
  deviceType: 'fingerprint' | 'face-id' | 'iris' | 'voice';
  deviceName: string;
  deviceIcon: 'phone' | 'laptop' | 'tablet' | 'watch';
  platform: string;
  registeredAt: string;
  lastUsed: string;
  location: string;
  status: 'active' | 'disabled' | 'revoked';
  trustLevel: number; // 0-100
  usageCount: number;
  failedAttempts: number;
}

// 👤 SSO SESSION STRUCTURE
interface SSOSession {
  id: string;
  service: string;
  serviceLogo: string;
  authenticatedAt: string;
  expiresAt: string;
  ipAddress: string;
  location: string;
  deviceId: string;
  status: 'active' | 'expired';
}

// 🔒 MOCK BIOMETRIC DEVICES
const BIOMETRIC_DEVICES: BiometricDevice[] = [
  {
    id: 'bio-001',
    deviceType: 'fingerprint',
    deviceName: 'iPhone 15 Pro',
    deviceIcon: 'phone',
    platform: 'iOS 17.2',
    registeredAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    location: 'Dhaka, Bangladesh',
    status: 'active',
    trustLevel: 98,
    usageCount: 234,
    failedAttempts: 2
  },
  {
    id: 'bio-002',
    deviceType: 'face-id',
    deviceName: 'MacBook Pro 16"',
    deviceIcon: 'laptop',
    platform: 'macOS Sonoma 14.2',
    registeredAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    lastUsed: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    location: 'Dhaka, Bangladesh',
    status: 'active',
    trustLevel: 95,
    usageCount: 567,
    failedAttempts: 1
  },
  {
    id: 'bio-003',
    deviceType: 'fingerprint',
    deviceName: 'iPad Pro 12.9"',
    deviceIcon: 'tablet',
    platform: 'iPadOS 17.2',
    registeredAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    location: 'Chittagong, Bangladesh',
    status: 'active',
    trustLevel: 92,
    usageCount: 89,
    failedAttempts: 0
  },
  {
    id: 'bio-004',
    deviceType: 'face-id',
    deviceName: 'Surface Laptop',
    deviceIcon: 'laptop',
    platform: 'Windows 11 Pro',
    registeredAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    lastUsed: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Singapore',
    status: 'disabled',
    trustLevel: 78,
    usageCount: 145,
    failedAttempts: 8
  }
];

// 🌐 MOCK SSO SESSIONS
const SSO_SESSIONS: SSOSession[] = [
  {
    id: 'sso-001',
    service: 'RJSC Portal',
    serviceLogo: '🏛️',
    authenticatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
    ipAddress: '103.92.xxx.xxx',
    location: 'Dhaka, Bangladesh',
    deviceId: 'bio-001',
    status: 'active'
  },
  {
    id: 'sso-002',
    service: 'Bangladesh Bank',
    serviceLogo: '🏦',
    authenticatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
    ipAddress: '103.92.xxx.xxx',
    location: 'Dhaka, Bangladesh',
    deviceId: 'bio-001',
    status: 'active'
  },
  {
    id: 'sso-003',
    service: 'NBR eTax',
    serviceLogo: '💰',
    authenticatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 21 * 60 * 60 * 1000).toISOString(),
    ipAddress: '103.92.xxx.xxx',
    location: 'Dhaka, Bangladesh',
    deviceId: 'bio-002',
    status: 'active'
  },
  {
    id: 'sso-004',
    service: 'BIDA Portal',
    serviceLogo: '🚀',
    authenticatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
    ipAddress: '103.92.xxx.xxx',
    location: 'Dhaka, Bangladesh',
    deviceId: 'bio-001',
    status: 'active'
  }
];

export function BiometricSSO() {
  const { t } = useLanguage();
  const [devices, setDevices] = useState<BiometricDevice[]>(BIOMETRIC_DEVICES);
  const [sessions, setSessions] = useState<SSOSession[]>(SSO_SESSIONS);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState<BiometricDevice | null>(null);
  const [biometricSupported, setBiometricSupported] = useState(true);

  // Simulate biometric enrollment
  const enrollBiometric = (deviceType: BiometricDevice['deviceType']) => {
    setIsEnrolling(true);
    setEnrollmentProgress(0);
    
    const interval = setInterval(() => {
      setEnrollmentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newDevice: BiometricDevice = {
              id: `bio-${Date.now()}`,
              deviceType,
              deviceName: 'New Device',
              deviceIcon: 'phone',
              platform: 'Unknown',
              registeredAt: new Date().toISOString(),
              lastUsed: new Date().toISOString(),
              location: 'Dhaka, Bangladesh',
              status: 'active',
              trustLevel: 100,
              usageCount: 0,
              failedAttempts: 0
            };
            setDevices(prev => [...prev, newDevice]);
            setIsEnrolling(false);
            setShowAddDevice(false);
            toast.success('Biometric device enrolled successfully!');
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const revokeDevice = (deviceId: string) => {
    setDevices(prev => prev.map(d => 
      d.id === deviceId ? { ...d, status: 'revoked' as const } : d
    ));
    toast.success('Device revoked successfully');
  };

  const revokeSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    toast.success('Session terminated');
  };

  const getDeviceIcon = (iconType: string) => {
    switch (iconType) {
      case 'phone': return <Smartphone className="w-5 h-5" />;
      case 'laptop': return <Laptop className="w-5 h-5" />;
      case 'tablet': return <Tablet className="w-5 h-5" />;
      case 'watch': return <Watch className="w-5 h-5" />;
      default: return <Smartphone className="w-5 h-5" />;
    }
  };

  const getBiometricIcon = (type: string) => {
    switch (type) {
      case 'fingerprint': return <Fingerprint className="w-5 h-5" />;
      case 'face-id': return <Eye className="w-5 h-5" />;
      case 'iris': return <Eye className="w-5 h-5" />;
      case 'voice': return <Activity className="w-5 h-5" />;
      default: return <Fingerprint className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'disabled': return 'bg-yellow-100 text-yellow-700';
      case 'revoked': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTrustLevelColor = (level: number) => {
    if (level >= 90) return 'text-green-600';
    if (level >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={glassCard['p-6']}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Fingerprint className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Biometric Single Sign-On</h2>
              <p className="text-sm text-gray-600">Passwordless authentication across all government services</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowAddDevice(true)}
            className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Device
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-purple-900 mb-1">Zero-Password Authentication</h3>
            <p className="text-sm text-purple-700">
              Use biometric authentication (fingerprint, face recognition, iris scan) to instantly access 
              all government portals without remembering passwords. FIDO2 compliant & military-grade encryption.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">Active Devices</span>
          </div>
          <p className="text-2xl font-bold text-green-700">
            {devices.filter(d => d.status === 'active').length}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">SSO Sessions</span>
          </div>
          <p className="text-2xl font-bold text-blue-700">
            {sessions.filter(s => s.status === 'active').length}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600">Total Logins</span>
          </div>
          <p className="text-2xl font-bold text-purple-700">
            {devices.reduce((sum, d) => sum + d.usageCount, 0)}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-gray-600">Avg Trust</span>
          </div>
          <p className="text-2xl font-bold text-orange-700">
            {Math.round(devices.reduce((sum, d) => sum + d.trustLevel, 0) / devices.length)}%
          </p>
        </div>
      </div>

      {/* Registered Biometric Devices */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4">Registered Biometric Devices</h3>
        <div className="space-y-3">
          {devices.map((device) => (
            <div
              key={device.id}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Device Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-purple-600">
                    {getDeviceIcon(device.deviceIcon)}
                  </div>
                  
                  {/* Device Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{device.deviceName}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(device.status)}`}>
                        {device.status.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1 text-purple-600">
                        {getBiometricIcon(device.deviceType)}
                        <span className="text-xs capitalize">{device.deviceType.replace('-', ' ')}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm mb-2">
                      <div>
                        <p className="text-xs text-gray-500">Platform</p>
                        <p className="text-gray-700">{device.platform}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-gray-700 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {device.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Last Used</p>
                        <p className="text-gray-700">{new Date(device.lastUsed).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Usage Count</p>
                        <p className="text-gray-700">{device.usageCount} logins</p>
                      </div>
                    </div>

                    {/* Trust Level Bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">Trust Level</span>
                        <span className={`font-semibold ${getTrustLevelColor(device.trustLevel)}`}>
                          {device.trustLevel}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            device.trustLevel >= 90 ? 'bg-green-500' :
                            device.trustLevel >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${device.trustLevel}%` }}
                        />
                      </div>
                    </div>

                    {device.failedAttempts > 0 && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-orange-600">
                        <AlertTriangle className="w-3 h-3" />
                        {device.failedAttempts} failed attempt{device.failedAttempts > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedDevice(device)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Info className="w-4 h-4 text-gray-600" />
                  </button>
                  
                  {device.status === 'active' && (
                    <button
                      onClick={() => revokeDevice(device.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active SSO Sessions */}
      <div>
        <h3 className="font-semibold mb-4">Active Single Sign-On Sessions</h3>
        <div className="grid grid-cols-2 gap-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{session.serviceLogo}</div>
                  <div>
                    <h4 className="font-semibold">{session.service}</h4>
                    <p className="text-xs text-gray-500">
                      Authenticated {new Date(session.authenticatedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => revokeSession(session.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">IP Address</span>
                  <span className="font-mono text-xs">{session.ipAddress}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {session.location}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Expires</span>
                  <span className="text-xs">{new Date(session.expiresAt).toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Session: {session.id}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-medium">ACTIVE</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sessions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Globe className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No active SSO sessions</p>
          </div>
        )}
      </div>

      {/* Add Device Modal */}
      <AnimatePresence>
        {showAddDevice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => !isEnrolling && setShowAddDevice(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Enroll Biometric Device</h3>
                {!isEnrolling && (
                  <button
                    onClick={() => setShowAddDevice(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {!isEnrolling ? (
                <div className="space-y-3">
                  <button
                    onClick={() => enrollBiometric('fingerprint')}
                    className="w-full p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all border border-purple-200 flex items-center gap-3"
                  >
                    <Fingerprint className="w-8 h-8 text-purple-600" />
                    <div className="text-left">
                      <p className="font-semibold">Fingerprint Scanner</p>
                      <p className="text-xs text-gray-600">Touch ID / Fingerprint Sensor</p>
                    </div>
                  </button>

                  <button
                    onClick={() => enrollBiometric('face-id')}
                    className="w-full p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all border border-blue-200 flex items-center gap-3"
                  >
                    <Eye className="w-8 h-8 text-blue-600" />
                    <div className="text-left">
                      <p className="font-semibold">Face Recognition</p>
                      <p className="text-xs text-gray-600">Face ID / Windows Hello</p>
                    </div>
                  </button>

                  <button
                    onClick={() => enrollBiometric('iris')}
                    className="w-full p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all border border-green-200 flex items-center gap-3"
                  >
                    <Eye className="w-8 h-8 text-green-600" />
                    <div className="text-left">
                      <p className="font-semibold">Iris Scanner</p>
                      <p className="text-xs text-gray-600">Advanced biometric authentication</p>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="py-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Fingerprint className="w-10 h-10 text-white animate-pulse" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Enrolling Biometric...</h4>
                    <p className="text-sm text-gray-600">Please authenticate using your device</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-purple-600">{enrollmentProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 transition-all"
                        style={{ width: `${enrollmentProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Device Detail Modal */}
      <AnimatePresence>
        {selectedDevice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedDevice(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Device Details</h3>
                <button
                  onClick={() => setSelectedDevice(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-purple-600">
                      {getDeviceIcon(selectedDevice.deviceIcon)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{selectedDevice.deviceName}</h4>
                      <p className="text-sm text-gray-600">{selectedDevice.platform}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Biometric Type</p>
                      <p className="font-medium capitalize">{selectedDevice.deviceType.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Status</p>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getStatusColor(selectedDevice.status)}`}>
                        {selectedDevice.status.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Registered</p>
                      <p className="font-medium">{new Date(selectedDevice.registeredAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Last Used</p>
                      <p className="font-medium">{new Date(selectedDevice.lastUsed).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Location</p>
                      <p className="font-medium">{selectedDevice.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Total Logins</p>
                      <p className="font-medium">{selectedDevice.usageCount}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Security Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Trust Level</span>
                        <span className={`font-semibold ${getTrustLevelColor(selectedDevice.trustLevel)}`}>
                          {selectedDevice.trustLevel}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            selectedDevice.trustLevel >= 90 ? 'bg-green-500' :
                            selectedDevice.trustLevel >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${selectedDevice.trustLevel}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">Failed Attempts</p>
                        <p className="font-semibold text-gray-900">{selectedDevice.failedAttempts}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Success Rate</p>
                        <p className="font-semibold text-gray-900">
                          {((selectedDevice.usageCount / (selectedDevice.usageCount + selectedDevice.failedAttempts)) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedDevice.status === 'active' && (
                  <button
                    onClick={() => {
                      revokeDevice(selectedDevice.id);
                      setSelectedDevice(null);
                    }}
                    className="w-full px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
                  >
                    Revoke Device Access
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
