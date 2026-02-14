// 🆕 UTILITY API INTEGRATIONS - Mock API status dashboard
// Features: Real-time connection status, data sync monitoring, endpoint health
// Mounts: Inside zone utility panel or as standalone view

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Wifi, WifiOff, Database, Clock, CheckCircle2, AlertCircle, Activity, Zap, ExternalLink } from 'lucide-react';
import { getAPIIntegrations, type APIIntegration } from '../engines/utilityUptimeEngine';

export function UtilityAPIIntegrations() {
  const [integrations, setIntegrations] = useState<APIIntegration[]>(getAPIIntegrations());
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
      // Randomly update sync times to simulate live updates
      setIntegrations(prev => prev.map(api => ({
        ...api,
        lastSync: new Date(Date.now() - Math.random() * 300000).toISOString() // Random within last 5 min
      })));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return {
          bg: 'bg-green-50',
          border: 'border-green-300',
          text: 'text-green-700',
          icon: 'text-green-600',
          badge: 'bg-green-500'
        };
      case 'degraded':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-300',
          text: 'text-yellow-700',
          icon: 'text-yellow-600',
          badge: 'bg-yellow-500'
        };
      case 'offline':
        return {
          bg: 'bg-red-50',
          border: 'border-red-300',
          text: 'text-red-700',
          icon: 'text-red-600',
          badge: 'bg-red-500'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-300',
          text: 'text-gray-700',
          icon: 'text-gray-600',
          badge: 'bg-gray-500'
        };
    }
  };

  const getTimeSinceSync = (lastSync: string) => {
    const diff = Date.now() - new Date(lastSync).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    if (minutes < 60) return `${minutes} mins ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  const getUtilityIcon = (providerName: string) => {
    if (providerName.toLowerCase().includes('power') || providerName.toLowerCase().includes('electric')) {
      return { Icon: Zap, color: 'text-orange-600' };
    }
    if (providerName.toLowerCase().includes('gas')) {
      return { Icon: Activity, color: 'text-red-600' };
    }
    if (providerName.toLowerCase().includes('water') || providerName.toLowerCase().includes('wasa')) {
      return { Icon: Database, color: 'text-blue-600' };
    }
    return { Icon: Wifi, color: 'text-purple-600' };
  };

  const connectedCount = integrations.filter(api => api.status === 'connected').length;
  const degradedCount = integrations.filter(api => api.status === 'degraded').length;
  const offlineCount = integrations.filter(api => api.status === 'offline').length;
  const totalDataPoints = integrations.reduce((sum, api) => sum + api.dataPoints, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Live API Integrations</h3>
        <p className="text-green-100 text-sm">Real-time data feeds from utility providers</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-700">{connectedCount}</div>
              <div className="text-xs font-semibold text-green-600">Connected</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold text-yellow-700">{degradedCount}</div>
              <div className="text-xs font-semibold text-yellow-600">Degraded</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <WifiOff className="w-8 h-8 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-red-700">{offlineCount}</div>
              <div className="text-xs font-semibold text-red-600">Offline</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-700">{totalDataPoints.toLocaleString()}</div>
              <div className="text-xs font-semibold text-blue-600">Data Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* API Connection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((api, index) => {
          const colors = getStatusColor(api.status);
          const { Icon: UtilIcon, color: utilColor } = getUtilityIcon(api.provider);

          return (
            <motion.div
              key={api.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`${colors.bg} border-2 ${colors.border} rounded-xl p-5 relative overflow-hidden`}
            >
              {/* Status Indicator Pulse */}
              {api.status === 'connected' && (
                <motion.div
                  className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}

              <div className="flex items-start gap-4">
                {/* Utility Icon */}
                <div className={`p-3 bg-white rounded-lg border-2 ${colors.border}`}>
                  <UtilIcon className={`w-6 h-6 ${utilColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{api.name}</h4>
                      <p className="text-xs text-gray-600 mt-1">{api.provider}</p>
                    </div>
                    <div className={`px-2 py-1 ${colors.badge} text-white rounded text-xs font-bold uppercase flex items-center gap-1`}>
                      {api.status === 'connected' && <CheckCircle2 className="w-3 h-3" />}
                      {api.status === 'degraded' && <AlertCircle className="w-3 h-3" />}
                      {api.status === 'offline' && <WifiOff className="w-3 h-3" />}
                      {api.status}
                    </div>
                  </div>

                  {/* Endpoint */}
                  <div className="bg-white/60 rounded-lg p-2 mb-3 border border-gray-200">
                    <div className="text-xs font-semibold text-gray-600 mb-1">API Endpoint:</div>
                    <div className="text-xs font-mono text-gray-900 break-all flex items-center gap-1">
                      {api.endpoint}
                      <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                        <Clock className="w-3 h-3" />
                        Last Sync
                      </div>
                      <div className={`text-sm font-bold ${colors.text}`}>
                        {getTimeSinceSync(api.lastSync)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                        <Database className="w-3 h-3" />
                        Data Points
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {api.dataPoints.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Status Messages */}
                  {api.status === 'degraded' && (
                    <div className="mt-3 bg-yellow-100 border border-yellow-300 rounded p-2">
                      <p className="text-xs text-yellow-800">
                        ⚠️ Experiencing intermittent connectivity. Data may be delayed.
                      </p>
                    </div>
                  )}

                  {api.status === 'offline' && (
                    <div className="mt-3 bg-red-100 border border-red-300 rounded p-2">
                      <p className="text-xs text-red-800">
                        ❌ Connection lost. Engineering team notified. Using cached data.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Integration Architecture */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4">🏗️ Integration Architecture</h4>
        <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
              <span><span className="font-bold">Real-time Data Sync:</span> APIs polled every 30 seconds for live utility status</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
              <span><span className="font-bold">Redundancy:</span> Multiple data sources per utility (e.g., DESCO + DPDC for power)</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5" />
              <span><span className="font-bold">Caching:</span> 15-minute cache layer ensures data availability during provider outages</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5" />
              <span><span className="font-bold">Authentication:</span> OAuth 2.0 with government API gateway for secure access</span>
            </div>
          </div>
        </div>
      </div>

      {/* World-First Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-400 rounded-full">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-amber-900 mb-2">🏆 World-First IPA Innovation</h4>
            <p className="text-sm text-amber-800 mb-3">
              BIDA is the <span className="font-bold">first Investment Promotion Agency globally</span> to integrate real-time utility company APIs for zone monitoring.
            </p>
            <div className="bg-white rounded-lg p-3 border border-amber-200">
              <div className="text-xs text-gray-700">
                <span className="font-bold">FDI Impact:</span> Investors can make data-driven location decisions with <span className="font-bold text-amber-700">100% transparency</span> on infrastructure reliability—eliminating uncertainty and building trust.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border-2 border-green-200 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-green-700">
            System Online • Last Refresh: {lastRefresh.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}
