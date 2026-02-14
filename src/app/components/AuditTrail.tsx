import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Upload, 
  Eye, 
  Edit, 
  User, 
  DollarSign, 
  CheckCircle2, 
  Trash2, 
  Send, 
  FileText,
  Search,
  Download,
  Filter,
  X,
  Shield
} from 'lucide-react';
import { AuditLog, auditLogs } from '@/app/data/mockData';
import { API } from '@/app/api/mockAPI';
import { InstrumentCard, InstrumentSection } from './ui-primitives';

const actionIcons: Record<string, any> = {
  'Uploaded Document': Upload,
  'Reviewed Document': Eye,
  'Status Update': Edit,
  'Assigned Application': User,
  'Submitted Payment': DollarSign,
  'Approved': CheckCircle2,
  'Rejected': Trash2,
  'Sent Notification': Send,
  'Default': FileText
};

const actionColors: Record<string, string> = {
  'Uploaded Document': 'blue',
  'Reviewed Document': 'purple',
  'Status Update': 'orange',
  'Assigned Application': 'emerald',
  'Submitted Payment': 'green',
  'Approved': 'emerald',
  'Rejected': 'red',
  'Sent Notification': 'blue',
  'Default': 'gray'
};

interface AuditTrailProps {
  filters?: {
    entityId?: string;
    actor?: string;
  };
  limit?: number;
}

export function AuditTrail({ filters, limit }: AuditTrailProps) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  useEffect(() => {
    loadLogs();
  }, [filters, limit]);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const response = await API.audit.getLogs({ ...filters, limit });
      if (response.success && response.data) {
        setLogs(response.data);
      }
    } catch (error) {
      console.error('Failed to load audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    
    return matchesSearch && matchesAction;
  });

  const uniqueActions = Array.from(new Set(logs.map(log => log.action)));

  const getActionIcon = (action: string) => {
    const Icon = actionIcons[action] || actionIcons['Default'];
    return Icon;
  };

  const getActionColor = (action: string) => {
    return actionColors[action] || actionColors['Default'];
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Actor', 'Action', 'Entity', 'Details', 'IP Address'],
      ...filteredLogs.map(log => [
        log.timestamp,
        log.actor,
        log.action,
        log.entity,
        log.details,
        log.ipAddress || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-trail-${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Audit Trail
          </h2>
          <p className="text-gray-600">
            Complete activity log for compliance and transparency
          </p>
        </div>
        <button
          onClick={exportLogs}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 hover:shadow-lg"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <div className="text-2xl font-bold text-gray-900">{logs.length}</div>
          <div className="text-sm text-gray-600">Total Events</div>
        </div>
        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <div className="text-2xl font-bold text-blue-600">
            {logs.filter(l => l.action.includes('Approved')).length}
          </div>
          <div className="text-sm text-gray-600">Approvals</div>
        </div>
        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <div className="text-2xl font-bold text-blue-600">
            {logs.filter(l => l.action.includes('Document')).length}
          </div>
          <div className="text-sm text-gray-600">Document Actions</div>
        </div>
        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <div className="text-2xl font-bold text-blue-600">
            {Array.from(new Set(logs.map(l => l.actor))).length}
          </div>
          <div className="text-sm text-gray-600">Unique Users</div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit logs..."
              className="w-full pl-10 pr-4 py-2 bg-white/60 backdrop-blur-sm border border-blue-100 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/60 backdrop-blur-sm border border-blue-100 rounded-lg focus:outline-none focus:border-blue-500 appearance-none"
            >
              <option value="all">All Actions</option>
              {uniqueActions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading audit trail...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No audit logs found</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200"></div>

            <div className="space-y-6">
              {filteredLogs.map((log, index) => {
                const Icon = getActionIcon(log.action);
                const color = getActionColor(log.action);
                const { date, time } = formatTimestamp(log.timestamp);

                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative pl-16"
                  >
                    {/* Icon */}
                    <div className="absolute left-0 w-12 h-12 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>

                    {/* Content */}
                    <div
                      className="p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => setSelectedLog(log)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{log.action}</h4>
                          <p className="text-sm text-gray-600">{log.entity}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div>{date}</div>
                          <div className="text-xs">{time}</div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-3">{log.details}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium">{log.actor}</span>
                        </div>

                        {log.ipAddress && log.ipAddress !== 'system' && (
                          <span className="text-xs text-gray-500">
                            IP: {log.ipAddress}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedLog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedLog(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card p-8 bg-white/90 backdrop-blur-xl border border-blue-100 rounded-2xl max-w-2xl w-full"
          >
            <h3 className="text-xl font-bold mb-4">Audit Log Details</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Log ID</label>
                  <p className="font-mono text-sm">{selectedLog.id}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Timestamp</label>
                  <p className="font-medium">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Action</label>
                  <p className="font-medium">{selectedLog.action}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Actor</label>
                  <p className="font-medium">{selectedLog.actor}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-gray-600">Entity</label>
                  <p className="font-medium">{selectedLog.entity}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-gray-600">Details</label>
                  <p className="text-gray-700">{selectedLog.details}</p>
                </div>
                {selectedLog.ipAddress && (
                  <div>
                    <label className="text-sm text-gray-600">IP Address</label>
                    <p className="font-mono text-sm">{selectedLog.ipAddress}</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedLog(null)}
              className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}