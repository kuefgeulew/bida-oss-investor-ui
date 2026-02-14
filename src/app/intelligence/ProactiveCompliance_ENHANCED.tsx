import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Bell,
  RefreshCw,
  FileText,
  Calendar,
  TrendingUp,
  Shield,
  Zap,
  X,
  ChevronRight
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  type: 'renewal' | 'filing' | 'policy' | 'inspection';
  title: string;
  description: string;
  dueDate: string;
  daysUntilDue: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  canRenewOnline: boolean;
  estimatedTime?: string;
  fee?: string;
  relatedSector?: string;
}

interface PolicyUpdate {
  id: string;
  title: string;
  sector: string;
  type: 'incentive' | 'regulation' | 'requirement';
  impact: 'positive' | 'neutral' | 'action-required';
  date: string;
  summary: string;
}

const complianceItems: ComplianceItem[] = [
  {
    id: 'tax-2024',
    type: 'filing',
    title: 'Annual Tax Return Filing',
    description: 'Submit corporate income tax return for FY 2023-24',
    dueDate: '2024-12-31',
    daysUntilDue: 45,
    priority: 'high',
    status: 'pending',
    canRenewOnline: true,
    estimatedTime: '30 mins',
    fee: 'No fee'
  },
  {
    id: 'trade-license',
    type: 'renewal',
    title: 'Trade License Renewal',
    description: 'Renew annual trade license with city corporation',
    dueDate: '2024-11-30',
    daysUntilDue: 15,
    priority: 'critical',
    status: 'pending',
    canRenewOnline: true,
    estimatedTime: '15 mins',
    fee: 'BDT 5,000'
  }
];

const policyUpdates: PolicyUpdate[] = [
  {
    id: 'it-tax-2024',
    title: 'Extended Tax Holiday for IT Startups',
    sector: 'IT & Software',
    type: 'incentive',
    impact: 'positive',
    date: '2024-10-15',
    summary: 'Government extends tax holiday for IT startups from 5 to 7 years. Effective immediately for new registrations.'
  },
  {
    id: 'green-incentive-2024',
    title: 'New Green Investment Fast-Track',
    sector: 'Energy',
    type: 'incentive',
    impact: 'positive',
    date: '2024-10-10',
    summary: 'Renewable energy projects now eligible for 30-day approval fast-track and 15-year tax exemption.'
  },
  {
    id: 'export-req-2024',
    title: 'Updated Export Documentation Requirements',
    sector: 'RMG & Textiles',
    type: 'requirement',
    impact: 'action-required',
    date: '2024-10-08',
    summary: 'New digital certificate of origin required for all textile exports starting Dec 1, 2024.'
  },
  {
    id: 'pharma-gmp-2024',
    title: 'Enhanced GMP Standards',
    sector: 'Pharmaceuticals',
    type: 'regulation',
    impact: 'action-required',
    date: '2024-10-01',
    summary: 'Updated Good Manufacturing Practice standards aligned with WHO guidelines. Compliance deadline: March 2025.'
  }
];

export function ProactiveCompliance_ENHANCED() {
  const [items, setItems] = useState(complianceItems);
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);
  const [renewalInProgress, setRenewalInProgress] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'critical' | 'renewable'>('all');

  const handleOneClickRenew = (itemId: string) => {
    setRenewalInProgress(itemId);
    
    // Simulate renewal process
    setTimeout(() => {
      setItems(prev => prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'in-progress' as const }
          : item
      ));
      
      setTimeout(() => {
        setItems(prev => prev.map(item => 
          item.id === itemId 
            ? { ...item, status: 'completed' as const }
            : item
        ));
        setRenewalInProgress(null);
        setSelectedItem(null);
      }, 2000);
    }, 1500);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'renewal': return RefreshCw;
      case 'filing': return FileText;
      case 'policy': return Bell;
      case 'inspection': return Shield;
      default: return Clock;
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === 'critical') return item.priority === 'critical' || item.daysUntilDue <= 7;
    if (filter === 'renewable') return item.canRenewOnline;
    return true;
  });

  const upcomingCount = items.filter(i => i.status === 'pending').length;
  const criticalCount = items.filter(i => i.priority === 'critical' && i.status === 'pending').length;
  const renewableCount = items.filter(i => i.canRenewOnline && i.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Proactive Compliance Center</h3>
        <p className="text-sm text-gray-600 mt-1">
          Automated reminders, one-click renewals, and policy updates
        </p>
      </div>

      {/* Alert Banner for Critical Items */}
      {criticalCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 animate-pulse" />
              <div>
                <p className="font-semibold text-red-900">
                  {criticalCount} Critical {criticalCount === 1 ? 'Item' : 'Items'} Require Immediate Attention
                </p>
                <p className="text-sm text-red-700">Some deadlines are within 7 days</p>
              </div>
            </div>
            <button
              onClick={() => setFilter('critical')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              View Now
            </button>
          </div>
        </motion.div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <Clock className="w-6 h-6 text-blue-600 mb-2" />
          <p className="text-3xl font-bold text-gray-900">{upcomingCount}</p>
          <p className="text-sm text-gray-700">Upcoming Items</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200">
          <AlertTriangle className="w-6 h-6 text-red-600 mb-2" />
          <p className="text-3xl font-bold text-gray-900">{criticalCount}</p>
          <p className="text-sm text-gray-700">Critical Priority</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <Zap className="w-6 h-6 text-green-600 mb-2" />
          <p className="text-3xl font-bold text-gray-900">{renewableCount}</p>
          <p className="text-sm text-gray-700">One-Click Renewable</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
          <Bell className="w-6 h-6 text-purple-600 mb-2" />
          <p className="text-3xl font-bold text-gray-900">{policyUpdates.length}</p>
          <p className="text-sm text-gray-700">Policy Updates</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          All Items
        </button>
        <button
          onClick={() => setFilter('critical')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            filter === 'critical'
              ? 'bg-red-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Critical Only
        </button>
        <button
          onClick={() => setFilter('renewable')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            filter === 'renewable'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          One-Click Renewable
        </button>
      </div>

      {/* Compliance Items List */}
      <div className="space-y-3">
        {filteredItems.map((item, index) => {
          const Icon = getTypeIcon(item.type);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-5 bg-white rounded-xl border transition-all ${
                item.status === 'completed'
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-lg ${
                    item.status === 'completed' ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {item.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Icon className="w-6 h-6 text-gray-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <div className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                        {item.priority.toUpperCase()}
                      </div>
                      {item.canRenewOnline && item.status === 'pending' && (
                        <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          One-Click
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Due: {item.dueDate}
                      </div>
                      {item.daysUntilDue <= 30 && (
                        <div className={`flex items-center gap-1 ${
                          item.daysUntilDue <= 7 ? 'text-red-600 font-bold' : 'text-orange-600'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {item.daysUntilDue} days left
                        </div>
                      )}
                      {item.estimatedTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.estimatedTime}
                        </div>
                      )}
                      {item.fee && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {item.fee}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {item.status === 'completed' ? (
                    <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </div>
                  ) : item.canRenewOnline ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedItem(item)}
                      disabled={renewalInProgress === item.id || item.status === 'in-progress'}
                      className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${
                        renewalInProgress === item.id || item.status === 'in-progress'
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {renewalInProgress === item.id || item.status === 'in-progress' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          Renew Now
                        </>
                      )}
                    </motion.button>
                  ) : (
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 flex items-center gap-2">
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Policy Updates Section */}
      <div>
        <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Recent Policy Updates
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {policyUpdates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-5 rounded-xl border ${
                update.impact === 'positive'
                  ? 'bg-green-50 border-green-200'
                  : update.impact === 'action-required'
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    update.impact === 'positive' ? 'bg-green-100 text-green-700' :
                    update.impact === 'action-required' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {update.type}
                  </div>
                  <span className="text-xs text-gray-600">{update.date}</span>
                </div>
              </div>
              <h5 className="font-semibold text-gray-900 mb-1">{update.title}</h5>
              <p className="text-sm text-gray-700 mb-2">{update.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600 px-2 py-1 bg-white rounded">
                  {update.sector}
                </span>
                <button className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
                  Learn more
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Renewal Confirmation Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => !renewalInProgress && setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900">Confirm One-Click Renewal</h4>
              {!renewalInProgress && (
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Item</p>
                <p className="font-semibold text-gray-900">{selectedItem.title}</p>
              </div>
              {selectedItem.fee && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Fee</p>
                  <p className="font-semibold text-gray-900">{selectedItem.fee}</p>
                </div>
              )}
              {selectedItem.estimatedTime && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Processing Time</p>
                  <p className="font-semibold text-gray-900">{selectedItem.estimatedTime}</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-blue-50 rounded-lg mb-4">
              <p className="text-sm text-blue-900">
                <strong>One-Click Renewal:</strong> Payment will be processed automatically
                using your registered payment method. You'll receive a confirmation email.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => !renewalInProgress && setSelectedItem(null)}
                disabled={!!renewalInProgress}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleOneClickRenew(selectedItem.id)}
                disabled={!!renewalInProgress}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {renewalInProgress === selectedItem.id ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Confirm & Renew
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}