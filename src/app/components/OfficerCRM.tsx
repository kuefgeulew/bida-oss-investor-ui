import { motion } from 'motion/react';
import { 
  Users, Clock, CheckCircle2, AlertTriangle, Search,
  MessageSquare, FileText, TrendingUp, Filter, Calendar,
  BarChart3, Network, Activity, FileCode, Globe
} from 'lucide-react';
import { useState } from 'react';
import { PolicySimulation } from './PolicySimulation';
import { InterAgencyDataExchange } from './InterAgencyDataExchange';
import { IntegrationBlueprint } from './IntegrationBlueprint';
import { PublicTransparencyPortal } from './PublicTransparencyPortal';
import { ApplicationsList } from './ApplicationsList';
import { EnhancedOfficerCRM } from './EnhancedOfficerCRM';
import { Typography } from '@/lib/utils';
import { InstrumentCard, InstrumentSection } from './ui-primitives';

interface Investor {
  id: string;
  companyName: string;
  sector: string;
  status: 'active' | 'delayed' | 'completed';
  progress: number;
  officer: string;
  startDate: string;
  pendingItems: number;
  lastContact: string;
}

type ViewType = 'investors' | 'analytics' | 'policy-sim' | 'inter-agency' | 'integration' | 'transparency' | 'enhanced';

export function OfficerCRM() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'delayed' | 'completed'>('all');
  const [currentView, setCurrentView] = useState<ViewType>('enhanced');

  const investors: Investor[] = [
    {
      id: '1',
      companyName: 'Garments International Ltd',
      sector: 'Textiles',
      status: 'delayed',
      progress: 42,
      officer: 'Ahmed Khan',
      startDate: '2026-01-15',
      pendingItems: 3,
      lastContact: '2026-01-28',
    },
    {
      id: '2',
      companyName: 'Tech Solutions Bangladesh',
      sector: 'Technology',
      status: 'active',
      progress: 65,
      officer: 'Fatima Rahman',
      startDate: '2026-01-10',
      pendingItems: 2,
      lastContact: '2026-01-29',
    },
    {
      id: '3',
      companyName: 'Pharma Plus Industries',
      sector: 'Pharmaceuticals',
      status: 'active',
      progress: 78,
      officer: 'Ahmed Khan',
      startDate: '2026-01-08',
      pendingItems: 1,
      lastContact: '2026-01-30',
    },
    {
      id: '4',
      companyName: 'Green Energy Corp',
      sector: 'Renewable Energy',
      status: 'completed',
      progress: 100,
      officer: 'Fatima Rahman',
      startDate: '2025-12-20',
      pendingItems: 0,
      lastContact: '2026-01-25',
    },
  ];

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (investor.sector && investor.sector.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || investor.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: investors.length,
    active: investors.filter(i => i.status === 'active').length,
    delayed: investors.filter(i => i.status === 'delayed').length,
    completed: investors.filter(i => i.status === 'completed').length,
  };

  const getStatusColor = (status: Investor['status']) => {
    switch (status) {
      case 'completed':
        return 'status-badge status-completed';
      case 'active':
        return 'status-badge status-pending';
      case 'delayed':
        return 'status-badge status-delayed';
    }
  };

  // Render content based on current view
  const renderContent = () => {
    switch (currentView) {
      case 'policy-sim':
        return (
          <div className="mb-8">
            <button
              onClick={() => setCurrentView('investors')}
              className="mb-6 px-6 py-3 rounded-xl hover:bg-white/80 flex items-center gap-2"
            >
              ← Back to Investor Management
            </button>
            <PolicySimulation />
          </div>
        );
      case 'inter-agency':
        return (
          <div className="mb-8">
            <button
              onClick={() => setCurrentView('investors')}
              className="mb-6 px-6 py-3 rounded-xl hover:bg-white/80 flex items-center gap-2"
            >
              ← Back to Investor Management
            </button>
            <InterAgencyDataExchange />
          </div>
        );
      case 'integration':
        return (
          <div className="mb-8">
            <button
              onClick={() => setCurrentView('investors')}
              className="mb-6 px-6 py-3 rounded-xl hover:bg-white/80 flex items-center gap-2"
            >
              ← Back to Investor Management
            </button>
            <IntegrationBlueprint />
          </div>
        );
      case 'transparency':
        return (
          <div className="mb-8">
            <button
              onClick={() => setCurrentView('investors')}
              className="mb-6 px-6 py-3 rounded-xl hover:bg-white/80 flex items-center gap-2"
            >
              ← Back to Investor Management
            </button>
            <PublicTransparencyPortal />
          </div>
        );
      case 'enhanced':
        return <EnhancedOfficerCRM />;
      default:
        return renderInvestorManagement();
    }
  };

  const renderInvestorManagement = () => (
    <ApplicationsList />
  );

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={Typography.pageTitle}>
          BIDA Officer CRM
        </h1>
        <p className="text-xl text-gray-900">Investor Relations & Application Management</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 p-2 rounded-2xl border border-[#e3ebf7]">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setCurrentView('investors')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
              currentView === 'investors'
                ? 'bg-[#3b82f6] text-white shadow-md'
                : 'hover:bg-white/60 text-[#475569]'
            }`}
          >
            <Users className="w-5 h-5" />
            Investor Management
          </button>
          <button
            onClick={() => setCurrentView('analytics')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
              currentView === 'analytics'
                ? 'bg-[#3b82f6] text-white shadow-md'
                : 'hover:bg-white/60 text-[#475569]'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </button>
          <button
            onClick={() => setCurrentView('policy-sim')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
              currentView === 'policy-sim'
                ? 'bg-[#3b82f6] text-white shadow-md'
                : 'hover:bg-white/60 text-[#475569]'
            }`}
          >
            <Activity className="w-5 h-5" />
            Policy Simulation
          </button>
          <button
            onClick={() => setCurrentView('inter-agency')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
              currentView === 'inter-agency'
                ? 'bg-[#3b82f6] text-white shadow-md'
                : 'hover:bg-white/60 text-[#475569]'
            }`}
          >
            <Network className="w-5 h-5" />
            Inter-Agency Exchange
          </button>
          <button
            onClick={() => setCurrentView('integration')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
              currentView === 'integration'
                ? 'bg-[#3b82f6] text-white shadow-md'
                : 'hover:bg-white/60 text-[#475569]'
            }`}
          >
            <FileCode className="w-5 h-5" />
            Integration Blueprint
          </button>
          <button
            onClick={() => setCurrentView('transparency')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
              currentView === 'transparency'
                ? 'bg-[#3b82f6] text-white shadow-md'
                : 'hover:bg-white/60 text-[#475569]'
            }`}
          >
            <Globe className="w-5 h-5" />
            Public Transparency
          </button>
          <button
            onClick={() => setCurrentView('enhanced')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
              currentView === 'enhanced'
                ? 'bg-[#3b82f6] text-white shadow-md'
                : 'hover:bg-white/60 text-[#475569]'
            }`}
          >
            <Globe className="w-5 h-5" />
            Enhanced CRM
          </button>
        </div>
      </div>

      {/* Stats Overview - Show only on investors view */}
      {currentView === 'investors' && (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <InstrumentCard>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl">{stats.total}</span>
              </div>
              <h3 className="text-sm text-gray-900">Total Investors</h3>
            </motion.div>
          </InstrumentCard>

          <InstrumentCard>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl">{stats.active}</span>
              </div>
              <h3 className="text-sm text-gray-900">Active Applications</h3>
            </motion.div>
          </InstrumentCard>

          <InstrumentCard>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl">{stats.delayed}</span>
              </div>
              <h3 className="text-sm text-gray-900">Delayed Cases</h3>
            </motion.div>
          </InstrumentCard>

          <InstrumentCard>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl">{stats.completed}</span>
              </div>
              <h3 className="text-sm text-gray-900">Completed This Month</h3>
            </motion.div>
          </InstrumentCard>
        </div>
      )}

      {/* Main Content */}
      <motion.div
        key={currentView}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}