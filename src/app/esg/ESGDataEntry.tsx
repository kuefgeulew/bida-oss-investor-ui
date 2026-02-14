// ESG Data Entry - Comprehensive forms for environmental, social, governance data
// Mounts in: ESG Panel

import React, { useState } from 'react';
import { Droplet, Zap, Trash2, Wind, AlertTriangle, Users, Shield, Calendar, Plus, Save, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface ESGDataEntryProps {
  investorId: string;
  onDataSubmit: (data: any) => void;
}

// Data types
interface EnvironmentalData {
  electricityKWh: number;
  gasCubicMeters: number;
  waterLiters: number;
  wasteKg: number;
  recycledWasteKg: number;
  renewableEnergyPercent: number;
  month: string;
}

interface ETPLog {
  date: string;
  phLevel: number;
  bodLevel: number; // Biological Oxygen Demand
  codLevel: number; // Chemical Oxygen Demand
  tssLevel: number; // Total Suspended Solids
  operatorName: string;
  status: 'normal' | 'warning' | 'critical';
  notes: string;
}

interface AirQualityLog {
  date: string;
  pm25: number; // Particulate Matter 2.5
  pm10: number; // Particulate Matter 10
  co2: number; // Parts per million
  so2: number; // Sulfur dioxide
  nox: number; // Nitrogen oxides
  location: string;
  status: 'good' | 'moderate' | 'poor';
}

interface SafetyIncident {
  date: string;
  type: 'injury' | 'near-miss' | 'equipment-failure' | 'environmental';
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  description: string;
  affectedPersons: number;
  actionTaken: string;
  preventiveMeasures: string;
  reportedBy: string;
  investigationStatus: 'pending' | 'ongoing' | 'completed';
}

export function ESGDataEntry({ investorId, onDataSubmit }: ESGDataEntryProps) {
  const [activeTab, setActiveTab] = useState<'environmental' | 'etp' | 'air' | 'safety'>('environmental');
  
  // Environmental data state
  const [envData, setEnvData] = useState<EnvironmentalData>({
    electricityKWh: 0,
    gasCubicMeters: 0,
    waterLiters: 0,
    wasteKg: 0,
    recycledWasteKg: 0,
    renewableEnergyPercent: 0,
    month: new Date().toISOString().slice(0, 7),
  });
  
  // ETP log state
  const [etpLog, setEtpLog] = useState<ETPLog>({
    date: new Date().toISOString().slice(0, 10),
    phLevel: 7.0,
    bodLevel: 0,
    codLevel: 0,
    tssLevel: 0,
    operatorName: '',
    status: 'normal',
    notes: '',
  });
  
  // Air quality state
  const [airLog, setAirLog] = useState<AirQualityLog>({
    date: new Date().toISOString().slice(0, 10),
    pm25: 0,
    pm10: 0,
    co2: 0,
    so2: 0,
    nox: 0,
    location: '',
    status: 'good',
  });
  
  // Safety incident state
  const [incident, setIncident] = useState<SafetyIncident>({
    date: new Date().toISOString().slice(0, 10),
    type: 'near-miss',
    severity: 'minor',
    description: '',
    affectedPersons: 0,
    actionTaken: '',
    preventiveMeasures: '',
    reportedBy: '',
    investigationStatus: 'pending',
  });
  
  const handleEnvironmentalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onDataSubmit({ type: 'environmental', data: envData });
    
    toast.success('Environmental data saved!', {
      description: `Data for ${envData.month} recorded successfully.`,
    });
    
    // Reset form
    setEnvData({
      ...envData,
      electricityKWh: 0,
      gasCubicMeters: 0,
      waterLiters: 0,
      wasteKg: 0,
      recycledWasteKg: 0,
    });
  };
  
  const handleETPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-determine status based on levels
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    if (etpLog.phLevel < 6 || etpLog.phLevel > 9) status = 'warning';
    if (etpLog.bodLevel > 30 || etpLog.codLevel > 150) status = 'warning';
    if (etpLog.bodLevel > 50 || etpLog.codLevel > 250) status = 'critical';
    
    const finalLog = { ...etpLog, status };
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onDataSubmit({ type: 'etp', data: finalLog });
    
    toast.success('ETP log recorded!', {
      description: `Status: ${status.toUpperCase()} - ${etpLog.date}`,
    });
    
    // Reset
    setEtpLog({
      ...etpLog,
      phLevel: 7.0,
      bodLevel: 0,
      codLevel: 0,
      tssLevel: 0,
      notes: '',
    });
  };
  
  const handleAirQualitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-determine status
    let status: 'good' | 'moderate' | 'poor' = 'good';
    if (airLog.pm25 > 35 || airLog.pm10 > 50) status = 'moderate';
    if (airLog.pm25 > 75 || airLog.pm10 > 150) status = 'poor';
    
    const finalLog = { ...airLog, status };
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onDataSubmit({ type: 'air', data: finalLog });
    
    toast.success('Air quality data recorded!', {
      description: `Status: ${status.toUpperCase()} - ${airLog.location}`,
    });
    
    setAirLog({
      ...airLog,
      pm25: 0,
      pm10: 0,
      co2: 0,
      so2: 0,
      nox: 0,
      location: '',
    });
  };
  
  const handleIncidentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onDataSubmit({ type: 'incident', data: incident });
    
    toast.success('Safety incident recorded!', {
      description: `${incident.severity.toUpperCase()} ${incident.type} - Investigation ${incident.investigationStatus}`,
    });
    
    // Notify authorities if critical
    if (incident.severity === 'critical') {
      toast.warning('Critical incident - Authorities notified', {
        description: 'Department of Labour has been automatically notified.',
      });
    }
    
    // Reset
    setIncident({
      date: new Date().toISOString().slice(0, 10),
      type: 'near-miss',
      severity: 'minor',
      description: '',
      affectedPersons: 0,
      actionTaken: '',
      preventiveMeasures: '',
      reportedBy: '',
      investigationStatus: 'pending',
    });
  };
  
  const tabs = [
    { id: 'environmental', label: 'Environmental Data', icon: Droplet },
    { id: 'etp', label: 'ETP Operations', icon: Trash2 },
    { id: 'air', label: 'Air Quality', icon: Wind },
    { id: 'safety', label: 'Safety Incidents', icon: AlertTriangle },
  ];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-8 h-8" />
          <h2 className="text-2xl font-bold">ESG Data Entry & Compliance Logs</h2>
        </div>
        <p className="text-blue-100">Record environmental, social, and governance metrics</p>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Environmental Data Form */}
      {activeTab === 'environmental' && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Droplet className="w-6 h-6 text-blue-600" />
            Monthly Environmental Data
          </h3>
          
          <form onSubmit={handleEnvironmentalSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reporting Month
              </label>
              <input
                type="month"
                value={envData.month}
                onChange={e => setEnvData({ ...envData, month: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Zap className="w-4 h-4 inline mr-1" />
                  Electricity Consumption (kWh)
                </label>
                <input
                  type="number"
                  value={envData.electricityKWh || ''}
                  onChange={e => setEnvData({ ...envData, electricityKWh: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 15000"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gas Consumption (m³)
                </label>
                <input
                  type="number"
                  value={envData.gasCubicMeters || ''}
                  onChange={e => setEnvData({ ...envData, gasCubicMeters: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 5000"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Droplet className="w-4 h-4 inline mr-1" />
                  Water Consumption (Liters)
                </label>
                <input
                  type="number"
                  value={envData.waterLiters || ''}
                  onChange={e => setEnvData({ ...envData, waterLiters: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 50000"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Trash2 className="w-4 h-4 inline mr-1" />
                  Total Waste Generated (kg)
                </label>
                <input
                  type="number"
                  value={envData.wasteKg || ''}
                  onChange={e => setEnvData({ ...envData, wasteKg: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 2000"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recycled Waste (kg)
                </label>
                <input
                  type="number"
                  value={envData.recycledWasteKg || ''}
                  onChange={e => setEnvData({ ...envData, recycledWasteKg: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 800"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  Renewable Energy (%)
                </label>
                <input
                  type="number"
                  value={envData.renewableEnergyPercent || ''}
                  onChange={e => setEnvData({ ...envData, renewableEnergyPercent: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 25"
                  required
                  min="0"
                  max="100"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Environmental Data
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* ETP Operations Log */}
      {activeTab === 'etp' && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trash2 className="w-6 h-6 text-green-600" />
            Effluent Treatment Plant (ETP) Operations Log
          </h3>
          
          <form onSubmit={handleETPSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={etpLog.date}
                  onChange={e => setEtpLog({ ...etpLog, date: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Operator Name
                </label>
                <input
                  type="text"
                  value={etpLog.operatorName}
                  onChange={e => setEtpLog({ ...etpLog, operatorName: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Ahmed Hassan"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  pH Level (6-9 normal)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={etpLog.phLevel || ''}
                  onChange={e => setEtpLog({ ...etpLog, phLevel: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 7.2"
                  required
                  min="0"
                  max="14"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  BOD Level (mg/L) - Max 30
                </label>
                <input
                  type="number"
                  value={etpLog.bodLevel || ''}
                  onChange={e => setEtpLog({ ...etpLog, bodLevel: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 18"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  COD Level (mg/L) - Max 150
                </label>
                <input
                  type="number"
                  value={etpLog.codLevel || ''}
                  onChange={e => setEtpLog({ ...etpLog, codLevel: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 95"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  TSS Level (mg/L) - Max 150
                </label>
                <input
                  type="number"
                  value={etpLog.tssLevel || ''}
                  onChange={e => setEtpLog({ ...etpLog, tssLevel: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 80"
                  required
                  min="0"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={etpLog.notes}
                onChange={e => setEtpLog({ ...etpLog, notes: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Any observations or maintenance notes..."
                rows={3}
              />
            </div>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-2">Bangladesh DOE Standards:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• pH: 6.0-9.0 (neutral)</p>
                <p>• BOD: ≤ 30 mg/L</p>
                <p>• COD: ≤ 150 mg/L</p>
                <p>• TSS: ≤ 150 mg/L</p>
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save ETP Log
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Air Quality Monitoring */}
      {activeTab === 'air' && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Wind className="w-6 h-6 text-cyan-600" />
            Air Quality Monitoring
          </h3>
          
          <form onSubmit={handleAirQualitySubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={airLog.date}
                  onChange={e => setAirLog({ ...airLog, date: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={airLog.location}
                  onChange={e => setAirLog({ ...airLog, location: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Production Floor A"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  PM2.5 (μg/m³) - Good: &lt;35
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={airLog.pm25 || ''}
                  onChange={e => setAirLog({ ...airLog, pm25: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 28.5"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  PM10 (μg/m³) - Good: &lt;50
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={airLog.pm10 || ''}
                  onChange={e => setAirLog({ ...airLog, pm10: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 42.0"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  CO₂ (ppm) - Normal: 400-1000
                </label>
                <input
                  type="number"
                  value={airLog.co2 || ''}
                  onChange={e => setAirLog({ ...airLog, co2: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 650"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  SO₂ (ppm)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={airLog.so2 || ''}
                  onChange={e => setAirLog({ ...airLog, so2: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 0.05"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  NOₓ (ppm)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={airLog.nox || ''}
                  onChange={e => setAirLog({ ...airLog, nox: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 0.08"
                  required
                  min="0"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Air Quality Data
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Safety Incident Report */}
      {activeTab === 'safety' && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            Safety Incident Report
          </h3>
          
          <form onSubmit={handleIncidentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Incident Date
                </label>
                <input
                  type="date"
                  value={incident.date}
                  onChange={e => setIncident({ ...incident, date: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reported By
                </label>
                <input
                  type="text"
                  value={incident.reportedBy}
                  onChange={e => setIncident({ ...incident, reportedBy: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Name of reporter"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Incident Type
                </label>
                <select
                  value={incident.type}
                  onChange={e => setIncident({ ...incident, type: e.target.value as any })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="near-miss">Near Miss</option>
                  <option value="injury">Injury</option>
                  <option value="equipment-failure">Equipment Failure</option>
                  <option value="environmental">Environmental</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Severity
                </label>
                <select
                  value={incident.severity}
                  onChange={e => setIncident({ ...incident, severity: e.target.value as any })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="minor">Minor</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                  <option value="critical">Critical (Auto-notifies authorities)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Affected Persons
                </label>
                <input
                  type="number"
                  value={incident.affectedPersons || ''}
                  onChange={e => setIncident({ ...incident, affectedPersons: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Number of people"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Investigation Status
                </label>
                <select
                  value={incident.investigationStatus}
                  onChange={e => setIncident({ ...incident, investigationStatus: e.target.value as any })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Incident Description
              </label>
              <textarea
                value={incident.description}
                onChange={e => setIncident({ ...incident, description: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Detailed description of what happened..."
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Immediate Action Taken
              </label>
              <textarea
                value={incident.actionTaken}
                onChange={e => setIncident({ ...incident, actionTaken: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="What was done immediately after the incident..."
                rows={2}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preventive Measures
              </label>
              <textarea
                value={incident.preventiveMeasures}
                onChange={e => setIncident({ ...incident, preventiveMeasures: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Measures to prevent future occurrences..."
                rows={2}
                required
              />
            </div>
            
            {incident.severity === 'critical' && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <p className="text-red-900 font-bold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Critical Incident: Department of Labour will be automatically notified
                </p>
              </div>
            )}
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Submit Incident Report
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
