import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, WifiOff, Cloud, CloudOff, Download, Upload,
  CheckCircle2, Clock, AlertCircle, RefreshCw, Database,
  Smartphone, HardDrive, Zap, Activity, TrendingUp,
  Folder, FileText, Image, Video, File, Settings,
  Info, X, Trash2, Eye, ArrowUpCircle, ArrowDownCircle,
  Signal, SignalHigh, SignalLow, SignalZero, Gauge
} from 'lucide-react';
import { glassCard } from '@/app/config/designSystem';
import { useLanguage } from '@/app/components/LanguageContext';
import { toast } from 'sonner';

// 📦 OFFLINE DATA STRUCTURE
interface OfflineData {
  id: string;
  type: 'document' | 'form' | 'image' | 'certificate' | 'application';
  name: string;
  size: number; // bytes
  lastModified: string;
  syncStatus: 'synced' | 'pending' | 'conflict' | 'failed';
  offlineAvailable: boolean;
  cachedAt?: string;
  priority: 'high' | 'medium' | 'low';
}

// 📊 SYNC QUEUE ITEM
interface SyncQueueItem {
  id: string;
  action: 'upload' | 'download' | 'update' | 'delete';
  dataType: string;
  fileName: string;
  size: number;
  status: 'queued' | 'syncing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  lastAttempt?: string;
  errorMessage?: string;
}

// 🗄️ MOCK OFFLINE DATA
const OFFLINE_DATA: OfflineData[] = [
  {
    id: 'offline-001',
    type: 'document',
    name: 'RJSC Incorporation Certificate.pdf',
    size: 2457600,
    lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    syncStatus: 'synced',
    offlineAvailable: true,
    cachedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high'
  },
  {
    id: 'offline-002',
    type: 'application',
    name: 'Environmental Clearance Application (Draft)',
    size: 156800,
    lastModified: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    syncStatus: 'pending',
    offlineAvailable: true,
    cachedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    priority: 'high'
  },
  {
    id: 'offline-003',
    type: 'certificate',
    name: 'Tax Clearance Certificate 2024.pdf',
    size: 1843200,
    lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    syncStatus: 'synced',
    offlineAvailable: true,
    cachedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium'
  },
  {
    id: 'offline-004',
    type: 'image',
    name: 'Factory Layout Blueprint.jpg',
    size: 5242880,
    lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    syncStatus: 'synced',
    offlineAvailable: true,
    cachedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'low'
  },
  {
    id: 'offline-005',
    type: 'form',
    name: 'Work Permit Application Form',
    size: 87040,
    lastModified: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    syncStatus: 'conflict',
    offlineAvailable: true,
    cachedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    priority: 'high'
  }
];

// 📤 MOCK SYNC QUEUE
const SYNC_QUEUE: SyncQueueItem[] = [
  {
    id: 'sync-001',
    action: 'upload',
    dataType: 'Application Form',
    fileName: 'Environmental Clearance Application',
    size: 156800,
    status: 'queued',
    progress: 0,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 'sync-002',
    action: 'update',
    dataType: 'Document',
    fileName: 'Company Profile.pdf',
    size: 524288,
    status: 'syncing',
    progress: 67,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    lastAttempt: new Date(Date.now() - 2 * 60 * 1000).toISOString()
  }
];

export function OfflineFirstMobile() {
  const { t } = useLanguage();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [networkQuality, setNetworkQuality] = useState<'excellent' | 'good' | 'poor' | 'offline'>('excellent');
  const [offlineData, setOfflineData] = useState<OfflineData[]>(OFFLINE_DATA);
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>(SYNC_QUEUE);
  const [storageUsed, setStorageUsed] = useState(12.5); // MB
  const [storageLimit, setStorageLimit] = useState(50); // MB
  const [autoSync, setAutoSync] = useState(true);
  const [selectedData, setSelectedData] = useState<OfflineData | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date(Date.now() - 15 * 60 * 1000));

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setNetworkQuality('excellent');
      toast.success('Back online! Syncing data...');
      if (autoSync) {
        syncPendingData();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setNetworkQuality('offline');
      toast.warning('You are offline. Changes will be saved locally.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [autoSync]);

  const syncPendingData = () => {
    toast.info('Syncing pending changes...');
    setTimeout(() => {
      setOfflineData(prev => prev.map(item => 
        item.syncStatus === 'pending' ? { ...item, syncStatus: 'synced' } : item
      ));
      setSyncQueue([]);
      setLastSyncTime(new Date());
      toast.success('All data synced successfully!');
    }, 2000);
  };

  const forceSync = () => {
    if (!isOnline) {
      toast.error('Cannot sync while offline');
      return;
    }
    syncPendingData();
  };

  const clearOfflineData = () => {
    if (confirm('Clear all offline data? This cannot be undone.')) {
      setOfflineData([]);
      setSyncQueue([]);
      setStorageUsed(0);
      toast.success('Offline data cleared');
    }
  };

  const downloadForOffline = (item: OfflineData) => {
    if (item.offlineAvailable) {
      toast.info('Already available offline');
      return;
    }
    
    toast.info(`Downloading ${item.name}...`);
    setTimeout(() => {
      setOfflineData(prev => prev.map(d => 
        d.id === item.id ? { ...d, offlineAvailable: true, cachedAt: new Date().toISOString() } : d
      ));
      toast.success('Available offline!');
    }, 1500);
  };

  const removeOfflineData = (itemId: string) => {
    setOfflineData(prev => prev.map(d => 
      d.id === itemId ? { ...d, offlineAvailable: false, cachedAt: undefined } : d
    ));
    toast.success('Removed from offline storage');
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-5 h-5" />;
      case 'form': return <File className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      case 'certificate': return <FileText className="w-5 h-5" />;
      case 'application': return <Folder className="w-5 h-5" />;
      default: return <File className="w-5 h-5" />;
    }
  };

  const getSyncStatusBadge = (status: string) => {
    switch (status) {
      case 'synced':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Synced
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'conflict':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
            <AlertCircle className="w-3 h-3" />
            Conflict
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
            <AlertCircle className="w-3 h-3" />
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  const getNetworkIcon = () => {
    if (!isOnline) return <SignalZero className="w-5 h-5 text-red-600" />;
    switch (networkQuality) {
      case 'excellent': return <SignalHigh className="w-5 h-5 text-green-600" />;
      case 'good': return <Signal className="w-5 h-5 text-blue-600" />;
      case 'poor': return <SignalLow className="w-5 h-5 text-orange-600" />;
      default: return <SignalZero className="w-5 h-5 text-red-600" />;
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className={glassCard['p-6']}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isOnline ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-orange-600'
            }`}>
              {isOnline ? <Wifi className="w-6 h-6 text-white" /> : <WifiOff className="w-6 h-6 text-white" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold">Offline-First Mobile</h2>
              <p className="text-sm text-gray-600">Work seamlessly without internet connectivity</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Connection Status Banner */}
      <div className={`mb-6 rounded-xl p-4 border ${
        isOnline 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
          : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getNetworkIcon()}
            <div>
              <h3 className={`font-semibold ${isOnline ? 'text-green-900' : 'text-red-900'}`}>
                {isOnline ? 'Connected' : 'Offline Mode'}
              </h3>
              <p className={`text-sm ${isOnline ? 'text-green-700' : 'text-red-700'}`}>
                {isOnline 
                  ? `Network quality: ${networkQuality} • Last synced ${Math.floor((Date.now() - lastSyncTime.getTime()) / 60000)} mins ago`
                  : 'Your changes are being saved locally and will sync when you\'re back online'
                }
              </p>
            </div>
          </div>
          
          {isOnline && (
            <button
              onClick={forceSync}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Sync Now
            </button>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <HardDrive className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">Storage Used</span>
          </div>
          <p className="text-2xl font-bold text-blue-700">{storageUsed} MB</p>
          <p className="text-xs text-gray-500">of {storageLimit} MB</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">Offline Ready</span>
          </div>
          <p className="text-2xl font-bold text-green-700">
            {offlineData.filter(d => d.offlineAvailable).length}
          </p>
          <p className="text-xs text-gray-500">items cached</p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-gray-600">Pending Sync</span>
          </div>
          <p className="text-2xl font-bold text-yellow-700">
            {offlineData.filter(d => d.syncStatus === 'pending').length}
          </p>
          <p className="text-xs text-gray-500">items queued</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600">Auto-Sync</span>
          </div>
          <p className="text-lg font-bold text-purple-700">
            {autoSync ? 'Enabled' : 'Disabled'}
          </p>
        </div>
      </div>

      {/* Storage Usage Bar */}
      <div className="mb-6 bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Storage Usage</span>
          <span className="text-sm text-gray-600">{((storageUsed / storageLimit) * 100).toFixed(1)}% used</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              (storageUsed / storageLimit) > 0.8 ? 'bg-red-500' :
              (storageUsed / storageLimit) > 0.5 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${(storageUsed / storageLimit) * 100}%` }}
          />
        </div>
      </div>

      {/* Sync Queue */}
      {syncQueue.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Active Sync Queue</h3>
          <div className="space-y-2">
            {syncQueue.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {item.action === 'upload' ? (
                      <ArrowUpCircle className="w-4 h-4 text-blue-600" />
                    ) : item.action === 'download' ? (
                      <ArrowDownCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <RefreshCw className="w-4 h-4 text-purple-600" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{item.fileName}</p>
                      <p className="text-xs text-gray-500">{item.dataType} • {formatBytes(item.size)}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    item.status === 'syncing' ? 'bg-blue-100 text-blue-700' :
                    item.status === 'queued' ? 'bg-gray-100 text-gray-700' :
                    item.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
                {item.status === 'syncing' && (
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-blue-500 transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Offline Data List */}
      <div>
        <h3 className="font-semibold mb-3">Offline Available Data</h3>
        <div className="space-y-2">
          {offlineData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.type === 'document' ? 'bg-blue-100 text-blue-600' :
                    item.type === 'form' ? 'bg-purple-100 text-purple-600' :
                    item.type === 'image' ? 'bg-green-100 text-green-600' :
                    item.type === 'certificate' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {getFileIcon(item.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{item.name}</h4>
                      {getSyncStatusBadge(item.syncStatus)}
                      {item.offlineAvailable && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          <Download className="w-3 h-3" />
                          Offline
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{formatBytes(item.size)}</span>
                      <span>Modified {new Date(item.lastModified).toLocaleDateString()}</span>
                      {item.cachedAt && (
                        <span>Cached {new Date(item.cachedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedData(item)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  
                  {item.offlineAvailable ? (
                    <button
                      onClick={() => removeOfflineData(item.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => downloadForOffline(item)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Offline Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">Auto-Sync</p>
                      <p className="text-xs text-gray-600">Automatically sync when online</p>
                    </div>
                    <button
                      onClick={() => setAutoSync(!autoSync)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        autoSync ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        autoSync ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-medium mb-2">Storage Limit</p>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={storageLimit}
                    onChange={(e) => setStorageLimit(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                    <span>10 MB</span>
                    <span className="font-medium">{storageLimit} MB</span>
                    <span>100 MB</span>
                  </div>
                </div>

                <button
                  onClick={clearOfflineData}
                  className="w-full px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Clear All Offline Data
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Detail Modal */}
      <AnimatePresence>
        {selectedData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedData(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Data Details</h3>
                <button
                  onClick={() => setSelectedData(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                      {getFileIcon(selectedData.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{selectedData.name}</h4>
                      <p className="text-sm text-gray-600 capitalize">{selectedData.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">File Size</p>
                      <p className="font-medium">{formatBytes(selectedData.size)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Sync Status</p>
                      {getSyncStatusBadge(selectedData.syncStatus)}
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Last Modified</p>
                      <p className="font-medium">{new Date(selectedData.lastModified).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Priority</p>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded capitalize ${
                        selectedData.priority === 'high' ? 'bg-red-100 text-red-700' :
                        selectedData.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {selectedData.priority}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedData.offlineAvailable && selectedData.cachedAt && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Download className="w-4 h-4 text-blue-600" />
                      Offline Availability
                    </h4>
                    <p className="text-sm text-gray-700">
                      This file is available offline and was cached on{' '}
                      {new Date(selectedData.cachedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
