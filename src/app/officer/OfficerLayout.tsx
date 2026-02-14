import { useState } from 'react';
import { 
  Briefcase, Brain, Shield, Scale, Users, TrendingUp, 
  Building2, AlertTriangle, MessageCircle, BarChart3, 
  Star, CheckCircle, FileText, HeadphonesIcon, LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Tab pages
import { MyCases } from './tabs/MyCases';
import { Intelligence } from './tabs/Intelligence';
import { Protection } from './tabs/Protection';
import { Quality } from './tabs/Quality';
import { Collaboration } from './tabs/Collaboration';
import { Workload } from './tabs/Workload';
import { Agencies } from './tabs/Agencies';
import { RiskAML } from './tabs/RiskAML';
import { Communication } from './tabs/Communication';
import { Analytics } from './tabs/Analytics';
import { SpecialCases } from './tabs/SpecialCases';
import { PostApproval } from './tabs/PostApproval';
import { Reports } from './tabs/Reports';
import { RMConsole } from '@/app/rm/RMConsole';

type TabType = 
  | 'my-cases'
  | 'intelligence'
  | 'protection'
  | 'quality'
  | 'collaboration'
  | 'workload'
  | 'agencies'
  | 'risk-aml'
  | 'communication'
  | 'analytics'
  | 'special-cases'
  | 'post-approval'
  | 'reports'
  | 'rm-console';

export function OfficerLayout() {
  const { fastLogout } = useAuth(); // ⚡ TRUE INSTANT LOGOUT
  const [activeTab, setActiveTab] = useState<TabType>('my-cases');

  const tabs = [
    { id: 'my-cases' as TabType, label: 'My Cases', icon: Briefcase },
    { id: 'intelligence' as TabType, label: 'Intelligence', icon: Brain },
    { id: 'protection' as TabType, label: 'Protection', icon: Shield },
    { id: 'quality' as TabType, label: 'Quality', icon: Scale },
    { id: 'collaboration' as TabType, label: 'Collaboration', icon: Users },
    { id: 'workload' as TabType, label: 'Workload', icon: TrendingUp },
    { id: 'agencies' as TabType, label: 'Agencies', icon: Building2 },
    { id: 'risk-aml' as TabType, label: 'Risk & AML', icon: AlertTriangle },
    { id: 'communication' as TabType, label: 'Communication', icon: MessageCircle },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
    { id: 'special-cases' as TabType, label: 'Special Cases', icon: Star },
    { id: 'post-approval' as TabType, label: 'Post-Approval', icon: CheckCircle },
    { id: 'reports' as TabType, label: 'Reports', icon: FileText },
    { id: 'rm-console' as TabType, label: 'RM Console', icon: HeadphonesIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'my-cases':
        return <MyCases />;
      case 'intelligence':
        return <Intelligence />;
      case 'protection':
        return <Protection />;
      case 'quality':
        return <Quality />;
      case 'collaboration':
        return <Collaboration />;
      case 'workload':
        return <Workload />;
      case 'agencies':
        return <Agencies />;
      case 'risk-aml':
        return <RiskAML />;
      case 'communication':
        return <Communication />;
      case 'analytics':
        return <Analytics />;
      case 'special-cases':
        return <SpecialCases />;
      case 'post-approval':
        return <PostApproval />;
      case 'reports':
        return <Reports />;
      case 'rm-console':
        return <RMConsole />;
      default:
        return <MyCases />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Header with Logout - Glass Design */}
        <div className="mb-6 glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-2 text-[#0f172a]">
                Bureaucracy Intelligence & Protection System
              </h1>
              <p className="text-[#475569]">Officer Application Management - 36 Features Across 13 Views</p>
            </div>
            <button
              onClick={fastLogout}
              className="glass-button flex items-center gap-2 px-5 py-3 hover:bg-red-50/50 hover:border-red-200/50 transition-all group"
            >
              <LogOut className="w-4 h-4 text-[#475569] group-hover:text-red-600 transition-colors" />
              <span className="font-medium text-[#475569] group-hover:text-red-600 transition-colors">Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation - Unified Glass System */}
        <div className="glass-tab-container p-3 mb-6">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              // Row 1: First 7 tabs (Sky Blue)
              // Row 2: Remaining 7 tabs (Lavender)
              const activeClass = index < 7 ? 'glass-tab-button-active-row1' : 'glass-tab-button-active-row2';
              
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

        {/* Content Area */}
        <div className="min-h-[600px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}