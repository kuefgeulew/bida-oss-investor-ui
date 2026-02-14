/**
 * 🔑 API KEYS MANAGEMENT — Developer Integration
 * 
 * Mounted in: Settings tab
 * Purpose: Allow investors to generate API keys for integration
 * Future: Real backend integration
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Key, Copy, Eye, EyeOff, Trash2, Plus, RefreshCw, Shield, Code, CheckCircle } from 'lucide-react';
import { APIDocumentation } from './APIDocumentation';

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: Date;
  lastUsed?: Date;
  permissions: string[];
  status: 'active' | 'revoked';
}

export function SettingsAPIKeys() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production Integration',
      key: 'bida_live_sk_Xjk9dK2mL4pQr8vT3nY7wE1sA6cF0bH5',
      created: new Date('2025-01-15'),
      lastUsed: new Date('2025-02-10'),
      permissions: ['read:profile', 'read:documents', 'write:applications'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Testing Environment',
      key: 'bida_test_sk_M8nQ2pR5tY7wE3jK1xL4vT6sA9cF0bH2',
      created: new Date('2025-01-20'),
      lastUsed: new Date('2025-02-08'),
      permissions: ['read:profile', 'read:documents'],
      status: 'active'
    }
  ]);
  
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);
  
  const toggleKeyVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleKeys(newVisible);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In production, show toast notification
  };
  
  const maskKey = (key: string) => {
    const prefix = key.substring(0, 12);
    const suffix = key.substring(key.length - 4);
    return `${prefix}${'•'.repeat(20)}${suffix}`;
  };
  
  return (
    <div className="space-y-6">
      {/* Show Documentation if toggled */}
      {showDocumentation ? (
        <div>
          <button
            onClick={() => setShowDocumentation(false)}
            className="mb-4 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all flex items-center gap-2"
          >
            ← Back to API Keys
          </button>
          <APIDocumentation />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">API Keys</h2>
              <p className="text-sm text-gray-600 mt-1">
                Integrate BIDA OSS with your own systems using our REST API
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create API Key
            </button>
          </div>
          
          {/* Info Banner */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Secure API Integration</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Use API keys to programmatically access your investment data, submit applications,
                  and integrate BIDA OSS into your ERP or business systems.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <button 
                    onClick={() => setShowDocumentation(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Code className="w-4 h-4" />
                    View API Documentation
                  </button>
                  <button 
                    onClick={() => setShowDocumentation(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Code className="w-4 h-4" />
                    Code Examples
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* API Keys List */}
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <motion.div
                key={apiKey.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 bg-white rounded-xl border-2 shadow-lg ${
                  apiKey.status === 'active' ? 'border-green-200' : 'border-red-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${
                      apiKey.status === 'active' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <Key className={`w-6 h-6 ${
                        apiKey.status === 'active' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{apiKey.name}</h3>
                      <p className="text-sm text-gray-600">
                        Created {apiKey.created.toLocaleDateString()} • 
                        Last used {apiKey.lastUsed?.toLocaleDateString() || 'Never'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {apiKey.status === 'active' && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                        Active
                      </span>
                    )}
                    {apiKey.status === 'revoked' && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">
                        Revoked
                      </span>
                    )}
                  </div>
                </div>
                
                {/* API Key Display */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono text-gray-900">
                      {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                    </code>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title={visibleKeys.has(apiKey.id) ? 'Hide' : 'Show'}
                      >
                        {visibleKeys.has(apiKey.id) ? (
                          <EyeOff className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(apiKey.key)}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Permissions */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">PERMISSIONS</p>
                  <div className="flex flex-wrap gap-2">
                    {apiKey.permissions.map((perm) => (
                      <span
                        key={perm}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </button>
                  <button className="px-4 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-200 transition-all flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Revoke
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Usage Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">API Requests (30 days)</p>
              <p className="text-3xl font-bold text-gray-900">12,845</p>
              <p className="text-xs text-gray-500 mt-1">+23% from last month</p>
            </div>
            
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Success Rate</p>
              <p className="text-3xl font-bold text-green-600">99.8%</p>
              <p className="text-xs text-gray-500 mt-1">Excellent uptime</p>
            </div>
            
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Rate Limit</p>
              <p className="text-3xl font-bold text-gray-900">1000/hr</p>
              <p className="text-xs text-gray-500 mt-1">Upgrade for higher limits</p>
            </div>
          </div>
          
          {/* Create Modal (Placeholder) */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Create New API Key</h3>
                <p className="text-sm text-gray-600 mb-6">
                  This feature will be available in the next release. Contact BIDA support for early access.
                </p>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  Got it
                </button>
              </motion.div>
            </div>
          )}
        </>
      )}
    </div>
  );
}