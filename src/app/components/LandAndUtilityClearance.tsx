/**
 * Land and Utility Clearance Tracker
 * Land allocation, building permits, and utility connection management
 * Plugs into: InvestorDashboard → Services Tab
 */

import { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  Zap, 
  Droplet, 
  Flame,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { InstrumentCard, InstrumentSection, PrimaryButton, SecondaryButton } from './ui-primitives';
import { useLanguage } from './LanguageContext';

interface LandRequest {
  id: string;
  location: string;
  area: number;
  areaUnit: 'sqft' | 'acres';
  purpose: string;
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  appliedDate: Date;
  estimatedCompletionDate: Date;
  ministry: string;
}

interface BuildingPermit {
  id: string;
  projectName: string;
  buildingType: 'factory' | 'office' | 'warehouse';
  floors: number;
  totalArea: number;
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  appliedDate: Date;
  authority: string;
}

interface UtilityConnection {
  id: string;
  utilityType: 'electricity' | 'water' | 'gas';
  provider: string;
  capacity: string;
  status: 'pending' | 'in-progress' | 'connected' | 'on-hold';
  appliedDate: Date;
  estimatedConnectionDate: Date;
  slaInDays: number;
  daysElapsed: number;
}

export function LandAndUtilityClearance() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'land' | 'building' | 'utilities'>('land');

  // Mock data
  const landRequests: LandRequest[] = [
    {
      id: 'land-001',
      location: 'Dhaka EPZ, Plot 42',
      area: 50000,
      areaUnit: 'sqft',
      purpose: 'Manufacturing Facility',
      status: 'under-review',
      appliedDate: new Date('2025-12-01'),
      estimatedCompletionDate: new Date('2026-03-01'),
      ministry: 'Ministry of Land'
    }
  ];

  const buildingPermits: BuildingPermit[] = [
    {
      id: 'building-001',
      projectName: 'Factory Building A',
      buildingType: 'factory',
      floors: 3,
      totalArea: 45000,
      status: 'pending',
      appliedDate: new Date('2026-01-10'),
      authority: 'Dhaka South City Corporation'
    }
  ];

  const utilityConnections: UtilityConnection[] = [
    {
      id: 'utility-001',
      utilityType: 'electricity',
      provider: 'DPDC',
      capacity: '500 KW',
      status: 'in-progress',
      appliedDate: new Date('2025-12-15'),
      estimatedConnectionDate: new Date('2026-02-15'),
      slaInDays: 45,
      daysElapsed: 23
    },
    {
      id: 'utility-002',
      utilityType: 'water',
      provider: 'WASA',
      capacity: '10,000 gallons/day',
      status: 'pending',
      appliedDate: new Date('2026-01-05'),
      estimatedConnectionDate: new Date('2026-02-05'),
      slaInDays: 30,
      daysElapsed: 10
    },
    {
      id: 'utility-003',
      utilityType: 'gas',
      provider: 'Titas Gas',
      capacity: '2000 cubic ft/hr',
      status: 'pending',
      appliedDate: new Date('2026-01-12'),
      estimatedConnectionDate: new Date('2026-03-12'),
      slaInDays: 60,
      daysElapsed: 5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': case 'connected': return 'bg-green-50 text-green-700 border-green-200';
      case 'under-review': case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'rejected': case 'on-hold': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getUtilityIcon = (type: string) => {
    switch (type) {
      case 'electricity': return <Zap className="w-6 h-6 text-yellow-500" />;
      case 'water': return <Droplet className="w-6 h-6 text-blue-500" />;
      case 'gas': return <Flame className="w-6 h-6 text-orange-500" />;
      default: return <Zap className="w-6 h-6 text-slate-400" />;
    }
  };

  return (
    <InstrumentSection className="opacity-100">
      <div className="p-6 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
        {/* Compact Header with Inline Stats */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight mb-1">
              Land & Utility Clearances
            </h2>
            <p className="text-sm text-slate-600">
              Track land acquisition, building permits, and utility connections
            </p>
          </div>
          
          {/* Inline Quick Stats */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
              <MapPin className="w-5 h-5 text-[#3b82f6]" />
              <div>
                <div className="text-xl font-bold text-[#0f172a]">{landRequests.length}</div>
                <div className="text-xs text-slate-600">Land</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
              <Building2 className="w-5 h-5 text-[#3b82f6]" />
              <div>
                <div className="text-xl font-bold text-[#0f172a]">{buildingPermits.length}</div>
                <div className="text-xs text-slate-600">Permits</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
              <Zap className="w-5 h-5 text-[#3b82f6]" />
              <div>
                <div className="text-xl font-bold text-[#0f172a]">{utilityConnections.length}</div>
                <div className="text-xs text-slate-600">Utilities</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-xl font-bold text-[#0f172a]">1</div>
                <div className="text-xs text-slate-600">Connected</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-5">
          {(['land', 'building', 'utilities'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all shadow-md ${
                activeTab === tab
                  ? 'bg-[#3b82f6] text-white shadow-lg'
                  : 'bg-white/60 backdrop-blur-sm text-slate-600 hover:bg-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Land Requests Tab - Compact Grid Layout */}
        {activeTab === 'land' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-[#0f172a]">Land Acquisition</h3>
              <PrimaryButton className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                New Land Request
              </PrimaryButton>
            </div>

            {landRequests.map((land, index) => (
              <motion.div
                key={land.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <InstrumentCard>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-[#3b82f6]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-bold text-[#0f172a]">{land.location}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(land.status)}`}>
                              {land.status.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="text-sm text-slate-600">{land.purpose}</div>
                        </div>
                      </div>
                      <SecondaryButton className="text-sm">View Details</SecondaryButton>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-xs text-slate-600">Area</div>
                        <div className="font-semibold text-[#0f172a]">
                          {land.area.toLocaleString()} {land.areaUnit}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Applied</div>
                        <div className="font-semibold text-[#0f172a]">
                          {land.appliedDate.toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Est. Completion</div>
                        <div className="font-semibold text-[#0f172a]">
                          {land.estimatedCompletionDate.toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Authority</div>
                        <div className="font-semibold text-[#0f172a]">{land.ministry}</div>
                      </div>
                    </div>
                  </div>
                </InstrumentCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* Building Permits Tab - Compact Grid Layout */}
        {activeTab === 'building' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-[#0f172a]">Building Permits</h3>
              <PrimaryButton className="flex items-center gap-2 text-sm">
                <Building2 className="w-4 h-4" />
                New Permit Request
              </PrimaryButton>
            </div>

            {buildingPermits.map((permit, index) => (
              <motion.div
                key={permit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <InstrumentCard>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-[#3b82f6]" />
                        </div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-[#0f172a]">{permit.projectName}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(permit.status)}`}>
                            {permit.status.replace('-', ' ')}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 capitalize">
                            {permit.buildingType}
                          </span>
                        </div>
                      </div>
                      <SecondaryButton className="text-sm">View Details</SecondaryButton>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-xs text-slate-600">Floors</div>
                        <div className="font-semibold text-[#0f172a]">{permit.floors}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Total Area</div>
                        <div className="font-semibold text-[#0f172a]">
                          {permit.totalArea.toLocaleString()} sqft
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Applied</div>
                        <div className="font-semibold text-[#0f172a]">
                          {permit.appliedDate.toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Authority</div>
                        <div className="font-semibold text-[#0f172a]">{permit.authority}</div>
                      </div>
                    </div>
                  </div>
                </InstrumentCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* Utilities Tab - Compact Grid Layout */}
        {activeTab === 'utilities' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-[#0f172a]">Utility Connections</h3>
              <PrimaryButton className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" />
                New Connection Request
              </PrimaryButton>
            </div>

            {utilityConnections.map((utility, index) => (
              <motion.div
                key={utility.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <InstrumentCard>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center">
                          {getUtilityIcon(utility.utilityType)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-bold text-[#0f172a] capitalize">{utility.utilityType}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(utility.status)}`}>
                              {utility.status.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="text-sm text-slate-600">{utility.provider}</div>
                        </div>
                      </div>
                      <SecondaryButton className="text-sm">View Details</SecondaryButton>
                    </div>

                    <div className="grid grid-cols-5 gap-4 text-sm mb-3">
                      <div>
                        <div className="text-xs text-slate-600">Capacity</div>
                        <div className="font-semibold text-[#0f172a]">{utility.capacity}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Applied</div>
                        <div className="font-semibold text-[#0f172a]">
                          {utility.appliedDate.toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Est. Connection</div>
                        <div className="font-semibold text-[#0f172a]">
                          {utility.estimatedConnectionDate.toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">SLA Progress</div>
                        <div className="font-semibold text-[#0f172a]">
                          {utility.daysElapsed} / {utility.slaInDays} days
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Completion</div>
                        <div className="font-semibold text-[#0f172a]">
                          {Math.round((utility.daysElapsed / utility.slaInDays) * 100)}%
                        </div>
                      </div>
                    </div>

                    {/* Compact Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div
                        className="bg-[#3b82f6] h-1.5 rounded-full transition-all"
                        style={{ width: `${(utility.daysElapsed / utility.slaInDays) * 100}%` }}
                      />
                    </div>
                  </div>
                </InstrumentCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </InstrumentSection>
  );
}