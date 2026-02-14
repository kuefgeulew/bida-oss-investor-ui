// Admin Portal Shell - Tab-Based Intelligence Dashboard
// 6 smart tabs containing 27 features (Officer-style UX)

import { useState } from 'react';
import { Activity, Shield, Building2, Users, BarChart3, Settings } from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';
import { NotificationPanel } from '../components/NotificationPanel';
import { useAuth } from '@/contexts/AuthContext';
import { comprehensiveMockApplications, comprehensiveMockOfficers, comprehensiveMockAgencies } from '@/app/admin-intelligence/mockData';

// Command Center Panels (3 features)
import { NationalPulsePanel } from '../components/admin-panels/NationalPulsePanel';
import { BottleneckIntelligencePanel } from '../components/admin-panels/BottleneckIntelligencePanel';
import { PolicySimulatorPanel } from '../components/admin-panels/PolicySimulatorPanel';

// Admin Intelligence Panels - Set 1 (9 features)
import { 
  FairnessMonitorPanel, 
  CorruptionRadarPanel, 
  JourneyReplayPanel,
  SLALeaderboardPanel,
  EscalationMonitorPanel,
  DependencyGraphPanel,
  LoadHeatmapPanel,
  SkillCoveragePanel,
  TrainingPredictorPanel,
  GovernmentAnalyticsPanel
} from '../components/admin-panels/admin-intelligence-panels';

// Admin Intelligence Panels - Set 2 (11 features)
import {
  DropOffFunnelPanel,
  FDILossDetectorPanel,
  IncentiveROIPanel,
  AuditLogPanel,
  PrivacyPanelPanel,
  PrivilegeLogPanel,
  SLASimulatorPanel,
  NotificationHealthPanel,
  FeatureUsagePanel,
  EODBTrackerPanel,
  RegionalBenchmarkPanel
} from '../components/admin-panels/admin-intelligence-panels-2';

// Additional Tools
import { DigitalSignature } from '../components/DigitalSignature';
import { InterAgencyDataExchange } from '../components/InterAgencyDataExchange';
import { IntegrationBlueprint } from '../components/IntegrationBlueprint';
import { PublicTransparencyPortal } from '../components/PublicTransparencyPortal';

// 📊 ADVANCED ANALYTICS DASHBOARD - Complete BI Platform
import { AdvancedAnalyticsDashboard } from './AdvancedAnalyticsDashboard';

interface AdminPortalShellProps {
  role: 'admin' | 'superadmin';
}

type TabId = 'pulse' | 'governance' | 'agencies' | 'officers' | 'analytics' | 'system';

export function AdminPortalShell({ role }: AdminPortalShellProps) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('pulse');

  const tabs = [
    { id: 'pulse' as TabId, label: 'National Pulse', icon: Activity },
    { id: 'governance' as TabId, label: 'Governance', icon: Shield },
    { id: 'agencies' as TabId, label: 'Agencies', icon: Building2 },
    { id: 'officers' as TabId, label: 'Officers', icon: Users },
    { id: 'analytics' as TabId, label: 'Analytics', icon: BarChart3 },
    { id: 'system' as TabId, label: 'System & Global', icon: Settings },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'pulse':
        return (
          <div className="space-y-10">
            <NationalPulsePanel 
              applications={comprehensiveMockApplications} 
              officers={comprehensiveMockOfficers} 
              agencies={comprehensiveMockAgencies} 
            />
            <BottleneckIntelligencePanel applications={comprehensiveMockApplications} />
            {role === 'superadmin' && (
              <PolicySimulatorPanel applications={comprehensiveMockApplications} role={role} />
            )}
          </div>
        );

      case 'governance':
        return (
          <div className="space-y-10">
            <FairnessMonitorPanel 
              applications={comprehensiveMockApplications} 
              officers={comprehensiveMockOfficers} 
            />
            <CorruptionRadarPanel role={role} />
            <JourneyReplayPanel applications={comprehensiveMockApplications} />
          </div>
        );

      case 'agencies':
        return (
          <div className="space-y-10">
            <SLALeaderboardPanel />
            <EscalationMonitorPanel />
            <DependencyGraphPanel />
          </div>
        );

      case 'officers':
        return (
          <div className="space-y-10">
            <LoadHeatmapPanel />
            <SkillCoveragePanel />
            <TrainingPredictorPanel />
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-10">
            {/* 📊 ADVANCED ANALYTICS DASHBOARD - Complete BI Platform */}
            <AdvancedAnalyticsDashboard />
          </div>
        );

      case 'system':
        return (
          <div className="space-y-10">
            {role === 'superadmin' && <AuditLogPanel role={role} />}
            <PrivacyPanelPanel role={role} />
            {role === 'superadmin' && <PrivilegeLogPanel role={role} />}
            <SLASimulatorPanel role={role} />
            <NotificationHealthPanel />
            <FeatureUsagePanel />
            <EODBTrackerPanel />
            <RegionalBenchmarkPanel />
            
            {/* Additional Tools */}
            <div className="border-t-4 border-gray-200 pt-10 mt-10">
              <h3 className="text-xl font-bold mb-6 text-gray-700">🔧 Additional Tools</h3>
              <div className="space-y-10">
                <DigitalSignature />
                <InterAgencyDataExchange />
                <IntegrationBlueprint />
                <PublicTransparencyPortal />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      {/* Top Navigation Bar */}
      <div className="glass-navbar sticky top-0 z-50">
        <div className="px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="glass-card px-6 py-3">
                <h1 className="text-xl font-semibold text-[#0f172a]">
                  {role === 'superadmin' ? 'National Command Center' : 'Admin Portal'}
                </h1>
              </div>
              <div className="text-sm text-[#475569] glass-card px-3 py-1">
                {role === 'superadmin' ? 'Super Admin' : 'Admin'}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <NotificationPanel />
              <div className="text-sm text-[#475569]">
                {user?.name}
              </div>
              <button
                onClick={logout}
                className="glass-button px-5 py-3 hover:bg-red-50/50 hover:border-red-200/50 transition-all group"
              >
                <span className="text-sm font-medium text-[#475569] group-hover:text-red-600 transition-colors">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8">
        {/* Tab Navigation - Unified Glass System */}
        <div className="glass-tab-container p-3 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              // All admin tabs use row 1 styling (Sky Blue)
              const activeClass = 'glass-tab-button-active-row1';
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-2 p-4 transition-all ${
                    isActive
                      ? activeClass
                      : 'glass-tab-button'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#0f172a]' : 'text-[#475569]'}`} />
                  <span className={`text-xs font-medium text-center whitespace-nowrap ${
                    isActive ? 'text-[#0f172a]' : 'text-[#475569]'
                  }`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content - Full Width Layout */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* ========== MAIN OPERATIONS AREA (FULL WIDTH) ========== */}
          <div className="col-span-12">
            {renderTab()}
          </div>

        </div>
      </div>
    </div>
  );
}