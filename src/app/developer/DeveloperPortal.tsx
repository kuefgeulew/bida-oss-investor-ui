/**
 * 🔌 OPEN API GATEWAY - DEVELOPER PORTAL
 * 
 * Complete developer ecosystem for third-party integrations:
 * - 5 core API endpoints (Company, Application, Document, License, Incentive)
 * - API key management with OAuth 2.0
 * - Sandbox environment
 * - Interactive API explorer
 * - Rate limiting & SLA monitoring
 * - Webhook configuration
 * - Partner program & app marketplace
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code,
  Key,
  Terminal,
  BookOpen,
  Zap,
  Globe,
  Shield,
  Activity,
  TrendingUp,
  Copy,
  CheckCircle,
  ExternalLink,
  Play,
  Settings,
  Package,
  Bell,
  Users,
  Award,
  BarChart3,
  FileCode,
  Download,
  Plus,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

interface APIKey {
  id: string;
  name: string;
  key: string;
  environment: 'sandbox' | 'production';
  createdDate: string;
  lastUsed?: string;
  requestsThisMonth: number;
  status: 'active' | 'revoked';
}

interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  category: string;
  authRequired: boolean;
  rateLimit: string;
  sla: string;
}

interface WebhookSubscription {
  id: string;
  event: string;
  url: string;
  status: 'active' | 'inactive';
  createdDate: string;
  lastTriggered?: string;
}

const MOCK_API_KEYS: APIKey[] = [
  {
    id: 'key_1',
    name: 'Production Key - ERP Integration',
    key: 'bida_prod_sk_1a2b3c4d5e6f7g8h9i0j',
    environment: 'production',
    createdDate: '2026-01-15',
    lastUsed: '2026-02-12 08:45 AM',
    requestsThisMonth: 12847,
    status: 'active'
  },
  {
    id: 'key_2',
    name: 'Sandbox Key - Testing',
    key: 'bida_test_sk_9z8y7x6w5v4u3t2s1r0q',
    environment: 'sandbox',
    createdDate: '2026-02-01',
    lastUsed: '2026-02-11 03:22 PM',
    requestsThisMonth: 342,
    status: 'active'
  }
];

const API_ENDPOINTS: APIEndpoint[] = [
  {
    id: 'ep1',
    method: 'GET',
    path: '/api/v1/company/{bbid}',
    description: 'Returns company profile, directors, registration status',
    category: 'Company Information',
    authRequired: true,
    rateLimit: '1000/hour',
    sla: '99.9% uptime'
  },
  {
    id: 'ep2',
    method: 'GET',
    path: '/api/v1/applications/{bbid}/status',
    description: 'Returns all pending/approved applications',
    category: 'Application Status',
    authRequired: true,
    rateLimit: '500/hour',
    sla: '99.9% uptime'
  },
  {
    id: 'ep3',
    method: 'POST',
    path: '/api/v1/applications/{id}/documents',
    description: 'Upload supporting documents programmatically',
    category: 'Document Submission',
    authRequired: true,
    rateLimit: '100/hour',
    sla: '99.5% uptime'
  },
  {
    id: 'ep4',
    method: 'GET',
    path: '/api/v1/licenses/verify/{qr_code}',
    description: 'Validates license authenticity (public endpoint)',
    category: 'License Verification',
    authRequired: false,
    rateLimit: '2000/hour',
    sla: '99.9% uptime'
  },
  {
    id: 'ep5',
    method: 'POST',
    path: '/api/v1/incentives/check',
    description: 'Submit company profile, get eligible incentives list',
    category: 'Incentive Eligibility',
    authRequired: true,
    rateLimit: '200/hour',
    sla: '99.5% uptime'
  }
];

const WEBHOOK_EVENTS = [
  { id: 'app.submitted', name: 'Application Submitted', description: 'Triggered when new application is filed' },
  { id: 'app.approved', name: 'Application Approved', description: 'Triggered when application is approved' },
  { id: 'license.issued', name: 'License Issued', description: 'Triggered when license is generated' },
  { id: 'license.expiring', name: 'License Expiring', description: 'Triggered 30 days before expiry' },
  { id: 'payment.received', name: 'Payment Received', description: 'Triggered when payment is confirmed' },
  { id: 'document.required', name: 'Document Required', description: 'Triggered when additional documents needed' }
];

const PARTNER_APPS = [
  {
    id: 'app1',
    name: 'AutoFile HR',
    description: 'HR management tool that auto-files employee registrations',
    category: 'HR & Compliance',
    installs: 847,
    rating: 4.8,
    certified: true
  },
  {
    id: 'app2',
    name: 'TaxSync Pro',
    description: 'Accounting tool that auto-renews VAT registration',
    category: 'Accounting',
    installs: 1203,
    rating: 4.9,
    certified: true
  },
  {
    id: 'app3',
    name: 'RegWatch',
    description: 'Legal research tool with regulatory change feeds',
    category: 'Legal Research',
    installs: 562,
    rating: 4.6,
    certified: true
  },
  {
    id: 'app4',
    name: 'ComplianceBot',
    description: 'AI-powered compliance assistant with real-time alerts',
    category: 'Compliance',
    installs: 389,
    rating: 4.7,
    certified: false
  }
];

export function DeveloperPortal() {
  const [activeTab, setActiveTab] = useState<'overview' | 'endpoints' | 'keys' | 'webhooks' | 'marketplace' | 'docs'>('overview');
  const [apiKeys, setApiKeys] = useState<APIKey[]>(MOCK_API_KEYS);
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);
  const [showCreateKeyModal, setShowCreateKeyModal] = useState(false);
  const [showAddWebhookModal, setShowAddWebhookModal] = useState(false);
  const [webhookSubscriptions, setWebhookSubscriptions] = useState<WebhookSubscription[]>([]);
  const [sandboxMode, setSandboxMode] = useState(true);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const createNewAPIKey = (name: string, environment: 'sandbox' | 'production') => {
    const newKey: APIKey = {
      id: `key_${Date.now()}`,
      name,
      key: `bida_${environment === 'production' ? 'prod' : 'test'}_sk_${Math.random().toString(36).substr(2, 20)}`,
      environment,
      createdDate: new Date().toISOString().split('T')[0],
      requestsThisMonth: 0,
      status: 'active'
    };
    setApiKeys([...apiKeys, newKey]);
    toast.success('API key created successfully!', {
      description: 'Make sure to copy your key now - you won\'t see it again',
      duration: 5000
    });
  };

  const revokeAPIKey = (keyId: string) => {
    setApiKeys(apiKeys.map(k => k.id === keyId ? { ...k, status: 'revoked' as const } : k));
    toast.success('API key revoked');
  };

  const addWebhook = (event: string, url: string) => {
    const newWebhook: WebhookSubscription = {
      id: `wh_${Date.now()}`,
      event,
      url,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setWebhookSubscriptions([...webhookSubscriptions, newWebhook]);
    toast.success('Webhook subscription created!');
  };

  const getMethodColor = (method: string) => {
    const colors = {
      'GET': 'bg-green-100 text-green-700 border-green-300',
      'POST': 'bg-blue-100 text-blue-700 border-blue-300',
      'PUT': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'DELETE': 'bg-red-100 text-red-700 border-red-300'
    };
    return colors[method as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-8 bg-blue-50/50 border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
              <Code className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900">BanglaBiz API Gateway</h1>
              <p className="text-gray-600">
                Build powerful integrations • OAuth 2.0 secured • 99.9% SLA • RESTful architecture
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.open('https://docs.bida.gov.bd/api', '_blank')}
              className="px-6 py-3 bg-white/60 backdrop-blur-sm border border-blue-100 font-bold rounded-xl hover:bg-white hover:shadow-lg transition-all flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-gray-900">Documentation</span>
            </button>
            <button
              onClick={() => setShowCreateKeyModal(true)}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create API Key
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
            <p className="text-gray-600 text-sm mb-1">API Requests (30d)</p>
            <p className="text-3xl font-bold text-gray-900">13,189</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
            <p className="text-gray-600 text-sm mb-1">Active Keys</p>
            <p className="text-3xl font-bold text-gray-900">{apiKeys.filter(k => k.status === 'active').length}</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
            <p className="text-gray-600 text-sm mb-1">Uptime (30d)</p>
            <p className="text-3xl font-bold text-gray-900">99.97%</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
            <p className="text-gray-600 text-sm mb-1">Avg Response</p>
            <p className="text-3xl font-bold text-gray-900">142ms</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-2 flex gap-2">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'endpoints', label: 'API Endpoints', icon: Terminal },
          { id: 'keys', label: 'API Keys', icon: Key },
          { id: 'webhooks', label: 'Webhooks', icon: Bell },
          { id: 'marketplace', label: 'App Marketplace', icon: Package },
          { id: 'docs', label: 'Documentation', icon: FileCode }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Quick Start */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-purple-600" />
                Quick Start Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold mb-3">
                    1
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Create API Key</h4>
                  <p className="text-sm text-gray-600">
                    Generate your authentication credentials for sandbox or production
                  </p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold mb-3">
                    2
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Test in Sandbox</h4>
                  <p className="text-sm text-gray-600">
                    Use sandbox environment to test integration without affecting live data
                  </p>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold mb-3">
                    3
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Go Live</h4>
                  <p className="text-sm text-gray-600">
                    Switch to production key and start serving real users
                  </p>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-World Use Cases</h3>
              <div className="space-y-3">
                {[
                  { icon: '🏦', title: 'Bank Account Verification', desc: 'Banks verify company before opening account using Company Information API' },
                  { icon: '📊', title: 'ERP Dashboard Integration', desc: 'Investor\'s ERP dashboard pulls real-time application status' },
                  { icon: '📑', title: 'Auto-Submit Tax Returns', desc: 'Accounting software auto-submits tax returns via Document Submission API' },
                  { icon: '✅', title: 'Supplier Compliance Check', desc: 'International buyers verify supplier licenses using QR code API' },
                  { icon: '🎁', title: 'Incentive Discovery', desc: 'Consultancy firms check client eligibility for government incentives' }
                ].map((useCase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 flex items-start gap-3"
                  >
                    <span className="text-2xl">{useCase.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{useCase.title}</h4>
                      <p className="text-sm text-gray-600">{useCase.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-bold text-gray-900">OAuth 2.0</p>
                  <p className="text-xs text-gray-600">Secure Auth</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FileCode className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-bold text-gray-900">OpenAPI 3.0</p>
                  <p className="text-xs text-gray-600">Standard Spec</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-bold text-gray-900">99.9% SLA</p>
                  <p className="text-xs text-gray-600">Guaranteed Uptime</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Globe className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="font-bold text-gray-900">RESTful</p>
                  <p className="text-xs text-gray-600">JSON Response</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'endpoints' && (
          <motion.div
            key="endpoints"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Sandbox Toggle */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-bold text-gray-900">Interactive API Explorer</h3>
                  <p className="text-sm text-gray-600">Test endpoints directly from your browser</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">Environment:</span>
                <button
                  onClick={() => setSandboxMode(!sandboxMode)}
                  className={`px-4 py-2 rounded-lg font-bold border-2 transition-all ${
                    sandboxMode
                      ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                      : 'bg-green-100 text-green-700 border-green-300'
                  }`}
                >
                  {sandboxMode ? '🔬 Sandbox' : '🚀 Production'}
                </button>
              </div>
            </div>

            {/* Endpoints List */}
            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
              <div className="p-6 border-b-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Available Endpoints</h3>
                <p className="text-sm text-gray-600 mt-1">Click any endpoint to see details and test</p>
              </div>
              <div className="divide-y-2 divide-gray-200">
                {API_ENDPOINTS.map((endpoint, idx) => (
                  <motion.div
                    key={endpoint.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedEndpoint(endpoint)}
                    className={`p-5 cursor-pointer hover:bg-gray-50 transition-all ${
                      selectedEndpoint?.id === endpoint.id ? 'bg-purple-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-lg font-mono text-xs font-bold border-2 ${getMethodColor(endpoint.method)}`}>
                            {endpoint.method}
                          </span>
                          <code className="text-sm font-mono text-gray-900">{endpoint.path}</code>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            {endpoint.authRequired ? <Shield className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                            {endpoint.authRequired ? 'Auth Required' : 'Public'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Activity className="w-3 h-3" />
                            {endpoint.rateLimit}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {endpoint.sla}
                          </span>
                        </div>
                      </div>
                      <button
                        className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Try It
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Endpoint Detail */}
            {selectedEndpoint && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border-2 border-purple-300 p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {selectedEndpoint.category} API
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <code className="text-green-400 font-mono text-sm">
                    curl -X {selectedEndpoint.method} "https://api.bida.gov.bd{selectedEndpoint.path}" \<br />
                    {selectedEndpoint.authRequired && (
                      <>  -H "Authorization: Bearer YOUR_API_KEY" \<br /></>
                    )}
                      -H "Content-Type: application/json"
                  </code>
                </div>
                <button
                  onClick={() => copyToClipboard(`curl -X ${selectedEndpoint.method} "https://api.bida.gov.bd${selectedEndpoint.path}"`, 'cURL command')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy cURL
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'keys' && (
          <motion.div
            key="keys"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* API Keys List */}
            <div className="bg-white rounded-xl border-2 border-gray-200">
              <div className="p-6 border-b-2 border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Your API Keys</h3>
                  <p className="text-sm text-gray-600 mt-1">Manage authentication credentials for your integrations</p>
                </div>
                <button
                  onClick={() => setShowCreateKeyModal(true)}
                  className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create New Key
                </button>
              </div>
              <div className="divide-y-2 divide-gray-200">
                {apiKeys.map((key, idx) => (
                  <motion.div
                    key={key.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{key.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                            key.environment === 'production'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {key.environment.toUpperCase()}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                            key.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {key.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => revokeAPIKey(key.id)}
                        disabled={key.status === 'revoked'}
                        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-all flex items-center gap-1 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Revoke
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 mb-3 flex items-center justify-between">
                      <code className="text-sm font-mono text-gray-900">
                        {visibleKeys.has(key.id) ? key.key : '•'.repeat(32)}
                      </code>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleKeyVisibility(key.id)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-all"
                        >
                          {visibleKeys.has(key.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(key.key, 'API key')}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-all"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">Created</p>
                        <p className="font-semibold text-gray-900">{key.createdDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Last Used</p>
                        <p className="font-semibold text-gray-900">{key.lastUsed || 'Never'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Requests (30d)</p>
                        <p className="font-semibold text-gray-900">{key.requestsThisMonth.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Rate Limiting Info */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-700 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-yellow-900 mb-2">Fair Usage Policy</h3>
                  <p className="text-sm text-yellow-800 mb-3">
                    All API keys are subject to rate limiting to ensure fair access for all developers.
                  </p>
                  <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                    <li>Sandbox: 100 requests/hour per key</li>
                    <li>Production: 2,000 requests/hour per key (contact sales for higher limits)</li>
                    <li>Burst allowance: 2x limit for 60 seconds</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'webhooks' && (
          <motion.div
            key="webhooks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl border-2 border-gray-200">
              <div className="p-6 border-b-2 border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Webhook Subscriptions</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Receive real-time notifications when events occur
                  </p>
                </div>
                <button
                  onClick={() => setShowAddWebhookModal(true)}
                  className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Webhook
                </button>
              </div>

              {webhookSubscriptions.length === 0 ? (
                <div className="p-12 text-center">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-semibold">No webhook subscriptions yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Subscribe to events to receive real-time notifications
                  </p>
                </div>
              ) : (
                <div className="divide-y-2 divide-gray-200">
                  {webhookSubscriptions.map((webhook, idx) => (
                    <div key={webhook.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{webhook.event}</h4>
                          <p className="text-sm text-gray-600 mb-2">{webhook.url}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Created: {webhook.createdDate}</span>
                            {webhook.lastTriggered && <span>Last triggered: {webhook.lastTriggered}</span>}
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                          webhook.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {webhook.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Available Events */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Available Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {WEBHOOK_EVENTS.map((event, idx) => (
                  <div key={event.id} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-1">{event.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <code className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">{event.id}</code>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'marketplace' && (
          <motion.div
            key="marketplace"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-6 h-6 text-purple-600" />
                BanglaBiz App Store
              </h3>
              <p className="text-gray-600 mb-6">
                Discover certified third-party applications that extend BanglaBiz functionality
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PARTNER_APPS.map((app, idx) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5 hover:border-purple-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900">{app.name}</h4>
                          {app.certified && (
                            <Award className="w-4 h-4 text-blue-600" title="BIDA Certified" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{app.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-500 mb-1">
                          <span className="text-sm font-bold">{app.rating}</span>
                          <span>★</span>
                        </div>
                        <p className="text-xs text-gray-500">{app.installs} installs</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{app.description}</p>
                    <button className="w-full px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all">
                      Learn More
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Partner Program */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <Users className="w-8 h-8" />
                <div>
                  <h3 className="text-2xl font-bold">Become a Certified Partner</h3>
                  <p className="text-blue-100 mt-1">
                    Join our developer ecosystem and reach 10,000+ businesses
                  </p>
                </div>
              </div>
              <button className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-blue-50 transition-all">
                Apply for Partnership →
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'docs' && (
          <motion.div
            key="docs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Download Documentation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5 hover:border-purple-300 transition-all flex items-center gap-4 text-left">
                  <FileCode className="w-10 h-10 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">OpenAPI Specification</h4>
                    <p className="text-sm text-gray-600">Download YAML/JSON spec file</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5 hover:border-purple-300 transition-all flex items-center gap-4 text-left">
                  <BookOpen className="w-10 h-10 text-green-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">Integration Guide (PDF)</h4>
                    <p className="text-sm text-gray-600">Complete developer handbook</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5 hover:border-purple-300 transition-all flex items-center gap-4 text-left">
                  <Code className="w-10 h-10 text-purple-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">Code Samples (GitHub)</h4>
                    <p className="text-sm text-gray-600">Node.js, Python, Java, PHP examples</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5 hover:border-purple-300 transition-all flex items-center gap-4 text-left">
                  <Terminal className="w-10 h-10 text-orange-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">Postman Collection</h4>
                    <p className="text-sm text-gray-600">Import and test immediately</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create API Key Modal */}
      <AnimatePresence>
        {showCreateKeyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateKeyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Create New API Key</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Key Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Production ERP Integration"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Environment</label>
                  <select className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none">
                    <option value="sandbox">Sandbox (Testing)</option>
                    <option value="production">Production (Live)</option>
                  </select>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowCreateKeyModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      createNewAPIKey('New Integration Key', 'sandbox');
                      setShowCreateKeyModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all"
                  >
                    Create Key
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}