import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Shield, Lock, Key, Database, Users, Activity, Clock, CheckCircle, XCircle,
  Eye, EyeOff, Edit, Trash2, Plus, Search, Settings, Server
} from 'lucide-react';
import { InstrumentSection, InstrumentCard } from './ui-primitives';

type ConfigTabType = 'access' | 'api-keys' | 'audit' | 'system' | 'users';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'officer' | 'investor';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  created: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}

interface AuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  ip: string;
  status: 'success' | 'failure';
}

export function SystemConfig() {
  const [activeTab, setActiveTab] = useState<ConfigTabType>('access');
  const [showApiKey, setShowApiKey] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'access' as ConfigTabType, label: 'Access Controls', icon: Shield },
    { id: 'api-keys' as ConfigTabType, label: 'API Management', icon: Key },
    { id: 'audit' as ConfigTabType, label: 'Audit Logs', icon: Activity },
    { id: 'users' as ConfigTabType, label: 'User Management', icon: Users },
    { id: 'system' as ConfigTabType, label: 'System Settings', icon: Server }
  ];

  const users: User[] = [
    {
      id: '1',
      name: 'Shahin Ahmed',
      email: 'shahin.ahmed@bida.gov.bd',
      role: 'super_admin',
      status: 'active',
      lastLogin: '2026-02-01 14:35'
    },
    {
      id: '2',
      name: 'Fatima Rahman',
      email: 'fatima.rahman@bida.gov.bd',
      role: 'admin',
      status: 'active',
      lastLogin: '2026-02-01 12:20'
    },
    {
      id: '3',
      name: 'Ahmed Khan',
      email: 'ahmed.khan@bida.gov.bd',
      role: 'officer',
      status: 'active',
      lastLogin: '2026-02-01 09:15'
    },
    {
      id: '4',
      name: 'Inactive User',
      email: 'old.user@bida.gov.bd',
      role: 'officer',
      status: 'suspended',
      lastLogin: '2025-12-15 10:30'
    }
  ];

  const apiKeys: APIKey[] = [
    {
      id: '1',
      name: 'Bangladesh Geo API',
      key: 'bd_geo_7a8b9c0d1e2f3g4h5i6j7k8l9m0n',
      permissions: ['read:locations', 'read:divisions', 'read:districts'],
      created: '2026-01-15',
      lastUsed: '2026-02-01 14:22',
      status: 'active'
    },
    {
      id: '2',
      name: 'RJSC Integration',
      key: 'rjsc_api_1a2b3c4d5e6f7g8h9i0j1k2l3m4n',
      permissions: ['read:companies', 'verify:registration'],
      created: '2026-01-10',
      lastUsed: '2026-02-01 13:45',
      status: 'active'
    },
    {
      id: '3',
      name: 'Digital Signature Service',
      key: 'dsig_key_9z8y7x6w5v4u3t2s1r0q9p8o7n6m',
      permissions: ['create:signature', 'verify:signature', 'seal:document'],
      created: '2026-01-20',
      lastUsed: '2026-02-01 11:30',
      status: 'active'
    },
    {
      id: '4',
      name: 'Old API Key (Deprecated)',
      key: 'old_api_key_deprecated_xxxxxxxxxx',
      permissions: ['read:all'],
      created: '2025-11-01',
      lastUsed: '2025-12-31 23:59',
      status: 'revoked'
    }
  ];

  const auditLogs: AuditLog[] = [
    {
      id: '1',
      user: 'Shahin Ahmed',
      action: 'API Key Generated',
      target: 'Digital Signature Service',
      timestamp: '2026-02-01 14:35:22',
      ip: '103.49.168.12',
      status: 'success'
    },
    {
      id: '2',
      user: 'Fatima Rahman',
      action: 'User Role Modified',
      target: 'Ahmed Khan',
      timestamp: '2026-02-01 12:18:45',
      ip: '103.49.168.15',
      status: 'success'
    },
    {
      id: '3',
      user: 'Ahmed Khan',
      action: 'Login Attempt',
      target: 'Officer Portal',
      timestamp: '2026-02-01 09:15:33',
      ip: '103.49.168.18',
      status: 'success'
    },
    {
      id: '4',
      user: 'Unknown User',
      action: 'Failed Login',
      target: 'Admin Panel',
      timestamp: '2026-02-01 03:22:11',
      ip: '192.168.1.100',
      status: 'failure'
    },
    {
      id: '5',
      user: 'System',
      action: 'Backup Completed',
      target: 'Database Backup',
      timestamp: '2026-02-01 00:00:15',
      ip: 'localhost',
      status: 'success'
    }
  ];

  const accessControls = [
    {
      resource: 'Investor Portal',
      roles: ['investor', 'officer', 'admin', 'super_admin'],
      description: 'Access to investor-facing features'
    },
    {
      resource: 'Officer CRM',
      roles: ['officer', 'admin', 'super_admin'],
      description: 'Investor management and tracking'
    },
    {
      resource: 'Policy Simulation',
      roles: ['admin', 'super_admin'],
      description: 'Policy modeling and forecasting tools'
    },
    {
      resource: 'Inter-Agency Data Exchange',
      roles: ['admin', 'super_admin'],
      description: 'Cross-agency integration management'
    },
    {
      resource: 'System Configuration',
      roles: ['super_admin'],
      description: 'System-wide settings and security'
    },
    {
      resource: 'API Management',
      roles: ['super_admin'],
      description: 'API key generation and management'
    },
    {
      resource: 'Audit Logs',
      roles: ['admin', 'super_admin'],
      description: 'System activity and security logs'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'access':
        return (
          <div className="space-y-6">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Role-Based Access Control</h2>
              <div className="space-y-4">
                {accessControls.map((control, index) => (
                  <InstrumentCard key={index}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-6 rounded-xl hover:bg-white/50 transition-all border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{control.resource}</h3>
                          <p className="text-sm text-gray-600 mt-1">{control.description}</p>
                        </div>
                        <button className="px-4 py-2 rounded-lg hover:bg-white/80">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {control.roles.map((role, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              role === 'super_admin' ? 'bg-red-100 text-red-700' :
                              role === 'admin' ? 'bg-purple-100 text-purple-700' :
                              role === 'officer' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                            }`}
                          >
                            {role.replace('_', ' ').toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </InstrumentCard>
                ))}
              </div>
            </div>
          </div>
        );

      case 'api-keys':
        return (
          <div className="space-y-6">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">API Key Management</h2>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Generate New Key
                </button>
              </div>
              
              <div className="space-y-4">
                {apiKeys.map((key, index) => (
                  <motion.div
                    key={key.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 rounded-xl hover:bg-white/50 transition-all border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{key.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            key.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {key.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <code className="text-sm bg-gray-900 text-emerald-400 px-3 py-1 rounded">
                            {showApiKey === key.id ? key.key : '••••••••••••••••••••••••••••'}
                          </code>
                          <button
                            onClick={() => setShowApiKey(showApiKey === key.id ? null : key.id)}
                            className="p-2 rounded-lg hover:bg-white/80"
                          >
                            {showApiKey === key.id ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {key.permissions.map((perm, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                            >
                              {perm}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="mr-4">Created: {key.created}</span>
                          <span>Last Used: {key.lastUsed}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {key.status === 'active' && (
                          <button className="p-2 rounded-lg hover:bg-white/80" title="Revoke">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'audit':
        return (
          <div className="space-y-6">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">System Audit Logs</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                {auditLogs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-xl hover:bg-white/50 transition-all border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-2 h-2 rounded-full ${
                          log.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-semibold text-gray-900">{log.user}</span>
                            <span className="text-gray-600">→</span>
                            <span className="text-gray-600">{log.action}</span>
                            {log.target && (
                              <>
                                <span className="text-gray-400">on</span>
                                <span className="text-blue-600">{log.target}</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {log.timestamp}
                            </span>
                            <span>IP: {log.ip}</span>
                          </div>
                        </div>
                      </div>
                      {log.status === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New User
                </button>
              </div>
              
              <div className="space-y-4">
                {users.map((user, index) => (
                  <InstrumentCard key={user.id}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-6 rounded-xl hover:bg-white/50 transition-all border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                            user.role === 'super_admin' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                            user.role === 'admin' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                            user.role === 'officer' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                            'bg-gradient-to-br from-green-500 to-green-600'
                          }`}>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                user.status === 'active' ? 'bg-green-100 text-green-700' :
                                user.status === 'suspended' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {user.status.toUpperCase()}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                user.role === 'super_admin' ? 'bg-red-100 text-red-700' :
                                user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                user.role === 'officer' ? 'bg-blue-100 text-blue-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {user.role.replace('_', ' ').toUpperCase()}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-1">{user.email}</div>
                            <div className="text-xs text-gray-500">Last login: {user.lastLogin}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 rounded-lg hover:bg-white/80" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          {user.status !== 'suspended' && (
                            <button className="p-2 rounded-lg hover:bg-white/80" title="Suspend">
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </InstrumentCard>
                ))}
              </div>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="space-y-6">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <InstrumentCard>
                  <div className="p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Database className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Database Status</h3>
                        <p className="text-sm text-green-600">Operational</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Storage Used:</span>
                        <span className="font-medium">45.2 GB / 100 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Backup:</span>
                        <span className="font-medium">2026-02-01 00:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Connection Pool:</span>
                        <span className="font-medium">28 / 50 active</span>
                      </div>
                    </div>
                  </div>
                </InstrumentCard>

                <InstrumentCard>
                  <div className="p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <Server className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Server Health</h3>
                        <p className="text-sm text-green-600">Excellent</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Uptime:</span>
                        <span className="font-medium">45 days 3 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CPU Usage:</span>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Memory:</span>
                        <span className="font-medium">12.4 GB / 32 GB</span>
                      </div>
                    </div>
                  </div>
                </InstrumentCard>

                <InstrumentCard>
                  <div className="p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Security Status</h3>
                        <p className="text-sm text-green-600">Protected</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>SSL Certificate:</span>
                        <span className="font-medium text-green-600">Valid</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Firewall:</span>
                        <span className="font-medium text-green-600">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2FA Enabled:</span>
                        <span className="font-medium text-green-600">Yes</span>
                      </div>
                    </div>
                  </div>
                </InstrumentCard>

                <InstrumentCard>
                  <div className="p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">API Performance</h3>
                        <p className="text-sm text-green-600">Optimal</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Avg Response Time:</span>
                        <span className="font-medium">145ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Requests (24h):</span>
                        <span className="font-medium">142,567</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Success Rate:</span>
                        <span className="font-medium text-green-600">99.8%</span>
                      </div>
                    </div>
                  </div>
                </InstrumentCard>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl mb-2 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          System Configuration
        </h1>
        <p className="text-xl text-gray-600">Super Admin Controls & Security Management</p>
      </div>

      {/* Navigation Tabs */}
      <InstrumentCard>
        <div className="p-8">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-red-600 to-purple-600 text-white shadow-lg'
                    : 'hover:bg-white/60 text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </InstrumentCard>

      {/* Main Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}