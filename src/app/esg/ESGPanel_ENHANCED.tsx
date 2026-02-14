// ESG Panel ENHANCED - Complete ESG system with all 9 new features
// Mounts in: Investor Dashboard → Green/ESG Tab

import React, { useMemo, useState } from 'react';
import { Leaf, BarChart, FileText, Globe, Database, Brain, Sun, Users, Award } from 'lucide-react';
import { calculateESGScore, calculateCarbonFootprint } from './esgEngine';

// Import all new components
import { ESGDataEntry } from './ESGDataEntry';
import { AIAnomalyDetection } from './AIAnomalyDetection';
import { ReductionStrategies } from './ReductionStrategies';
import { AdvancedTracking } from './AdvancedTracking';
import { CertificationPortal } from './CertificationPortal';
import { AutomatedReporting } from './AutomatedReporting';
import { BuyerPortal } from './BuyerPortal';
import { RealTimeIntegrations } from './RealTimeIntegrations';

interface ESGPanelEnhancedProps {
  investorId: string;
  companyName: string;
  sector: string;
  investmentSize: number;
  certifications?: string[];
  hasETP?: boolean;
  hasSolarPower?: boolean;
  greenCoverPercent?: number;
  femaleWorkforcePercent?: number;
  employeeCount?: number;
}

type TabId = 'overview' | 'data-entry' | 'ai-insights' | 'reduction' | 'tracking' | 'certifications' | 'reports' | 'buyer-portal' | 'integrations';

export function ESGPanelEnhanced({
  investorId,
  companyName,
  sector,
  investmentSize,
  certifications = [],
  hasETP = false,
  hasSolarPower = false,
  greenCoverPercent = 0,
  femaleWorkforcePercent = 0,
  employeeCount = 500,
}: ESGPanelEnhancedProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  
  const esgScore = useMemo(() => 
    calculateESGScore(sector, certifications, hasETP, hasSolarPower, greenCoverPercent, femaleWorkforcePercent, 0),
    [sector, certifications, hasETP, hasSolarPower, greenCoverPercent, femaleWorkforcePercent]
  );
  
  const carbonFootprint = useMemo(() => 
    calculateCarbonFootprint(sector, employeeCount, investmentSize * 100, hasSolarPower),
    [sector, employeeCount, investmentSize, hasSolarPower]
  );
  
  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: BarChart },
    { id: 'data-entry' as const, label: 'Data Entry', icon: Database },
    { id: 'ai-insights' as const, label: 'AI Insights', icon: Brain },
    { id: 'reduction' as const, label: 'Reduction Strategies', icon: Sun },
    { id: 'tracking' as const, label: 'Advanced Tracking', icon: Users },
    { id: 'certifications' as const, label: 'Certifications', icon: Award },
    { id: 'reports' as const, label: 'Reports', icon: FileText },
    { id: 'buyer-portal' as const, label: 'Buyer Portal', icon: Globe },
    { id: 'integrations' as const, label: 'Integrations', icon: Database },
  ];
  
  const handleDataSubmit = (data: any) => {
    console.log('ESG data submitted:', data);
  };
  
  const handleDataReceived = (source: string, data: any) => {
    console.log('Real-time data received from', source, data);
  };
  
  const handleCertificationGranted = (certId: string) => {
    console.log('Certification granted:', certId);
  };
  
  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Green/ESG Compliance Tracker</h1>
            </div>
            <p className="text-green-100">
              Complete environmental, social, and governance management system
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-green-100 mb-1">Overall ESG Rating</div>
            <div className="text-4xl font-bold">{esgScore.rating}</div>
            <div className="text-sm text-green-100 mt-1">{esgScore.overall}/100</div>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-2">
        <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col md:flex-row items-center justify-center gap-2 px-3 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs md:text-sm hidden md:inline">{tab.label}</span>
                <span className="text-xs md:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <div className="text-sm text-green-600 mb-1">Environmental Score</div>
                <div className="text-4xl font-bold text-green-900">{esgScore.environmental}</div>
                <div className="text-xs text-green-700 mt-2">Carbon: {carbonFootprint.totalCO2Tons} tons/year</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="text-sm text-blue-600 mb-1">Social Score</div>
                <div className="text-4xl font-bold text-blue-900">{esgScore.social}</div>
                <div className="text-xs text-blue-700 mt-2">{femaleWorkforcePercent}% female workforce</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6">
                <div className="text-sm text-purple-600 mb-1">Governance Score</div>
                <div className="text-4xl font-bold text-purple-900">{esgScore.governance}</div>
                <div className="text-xs text-purple-700 mt-2">{certifications.length} certifications</div>
              </div>
            </div>
            
            {/* Feature Grid */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Complete ESG Features</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tabs.slice(1).map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-green-300 transition-all text-left"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="font-bold text-gray-900">{tab.label}</div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {tab.id === 'data-entry' && 'Log environmental, ETP, air quality, and safety data'}
                        {tab.id === 'ai-insights' && 'Real-time anomaly detection and predictive insights'}
                        {tab.id === 'reduction' && 'Solar recommendations and carbon reduction plans'}
                        {tab.id === 'tracking' && 'Pay gap, board diversity, and whistleblower portal'}
                        {tab.id === 'certifications' && 'Apply for ISO 14001, LEED, B Corp, Fair Trade'}
                        {tab.id === 'reports' && 'One-click GRI, SASB, CDP export with PDF generation'}
                        {tab.id === 'buyer-portal' && 'Shareable links for international buyer verification'}
                        {tab.id === 'integrations' && 'IoT sensors, DOE, DESCO, WASA real-time feeds'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'data-entry' && (
          <ESGDataEntry
            investorId={investorId}
            onDataSubmit={handleDataSubmit}
          />
        )}
        
        {activeTab === 'ai-insights' && (
          <AIAnomalyDetection
            investorId={investorId}
          />
        )}
        
        {activeTab === 'reduction' && (
          <ReductionStrategies
            currentEmissions={carbonFootprint.totalCO2Tons}
            sector={sector}
            investmentSize={investmentSize}
          />
        )}
        
        {activeTab === 'tracking' && (
          <AdvancedTracking
            investorId={investorId}
          />
        )}
        
        {activeTab === 'certifications' && (
          <CertificationPortal
            investorId={investorId}
            onCertificationGranted={handleCertificationGranted}
          />
        )}
        
        {activeTab === 'reports' && (
          <AutomatedReporting
            investorId={investorId}
            companyName={companyName}
            esgData={esgScore}
            carbonData={carbonFootprint}
            socialData={{ femaleWorkforcePercent }}
          />
        )}
        
        {activeTab === 'buyer-portal' && (
          <BuyerPortal
            investorId={investorId}
            companyName={companyName}
            esgScore={esgScore}
          />
        )}
        
        {activeTab === 'integrations' && (
          <RealTimeIntegrations
            onDataReceived={handleDataReceived}
          />
        )}
      </div>
    </div>
  );
}
