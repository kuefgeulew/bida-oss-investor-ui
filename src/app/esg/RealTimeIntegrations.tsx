// Real-Time Integrations - Mock IoT sensors, DOE, utility APIs
// Simulates real-time data feeds

import React, { useState, useEffect } from 'react';
import { Activity, Wifi, Database, Zap, Droplet, Wind, TrendingUp, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DataSource {
  id: string;
  name: string;
  type: 'iot' | 'api' | 'manual';
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync: Date;
  frequency: string;
  icon: any;
  metrics: string[];
}

interface RealTimeIntegrationsProps {
  onDataReceived: (source: string, data: any) => void;
}

export function RealTimeIntegrations({ onDataReceived }: RealTimeIntegrationsProps) {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: 'desco-api',
      name: 'DESCO Electricity Meter',
      type: 'api',
      status: 'connected',
      lastSync: new Date(),
      frequency: 'Real-time',
      icon: Zap,
      metrics: ['kWh consumption', 'Peak demand', 'Power factor'],
    },
    {
      id: 'wasa-api',
      name: 'WASA Water Meter',
      type: 'api',
      status: 'connected',
      lastSync: new Date(),
      frequency: 'Hourly',
      icon: Droplet,
      metrics: ['Water consumption', 'Flow rate', 'Pressure'],
    },
    {
      id: 'doe-api',
      name: 'Department of Environment',
      type: 'api',
      status: 'connected',
      lastSync: new Date(),
      frequency: 'Daily',
      icon: Wind,
      metrics: ['Air quality index', 'Emissions data', 'Compliance status'],
    },
    {
      id: 'iot-energy',
      name: 'IoT Energy Sensors (24 units)',
      type: 'iot',
      status: 'connected',
      lastSync: new Date(),
      frequency: 'Real-time',
      icon: Activity,
      metrics: ['Machine-level consumption', 'Idle time', 'Efficiency'],
    },
    {
      id: 'iot-water',
      name: 'IoT Water Flow Sensors (8 units)',
      type: 'iot',
      status: 'connected',
      lastSync: new Date(),
      frequency: 'Real-time',
      icon: Droplet,
      metrics: ['Zone consumption', 'Leak detection', 'Usage patterns'],
    },
    {
      id: 'iot-air',
      name: 'Air Quality Monitors (6 units)',
      type: 'iot',
      status: 'syncing',
      lastSync: new Date(Date.now() - 300000),
      frequency: 'Real-time',
      icon: Wind,
      metrics: ['PM2.5', 'PM10', 'CO2', 'Temperature', 'Humidity'],
    },
  ]);
  
  const [liveData, setLiveData] = useState<any>({
    electricity: { value: 18.5, unit: 'kW', trend: 'stable' },
    water: { value: 125, unit: 'L/min', trend: 'increasing' },
    airQuality: { value: 42, unit: 'AQI', trend: 'good' },
    emissions: { value: 1850, unit: 'tCO2e/year', trend: 'decreasing' },
  });
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev: any) => ({
        electricity: {
          value: 15 + Math.random() * 10,
          unit: 'kW',
          trend: Math.random() > 0.5 ? 'stable' : 'increasing',
        },
        water: {
          value: 100 + Math.random() * 50,
          unit: 'L/min',
          trend: Math.random() > 0.7 ? 'increasing' : 'stable',
        },
        airQuality: {
          value: 35 + Math.random() * 20,
          unit: 'AQI',
          trend: prev.airQuality.value < 50 ? 'good' : 'moderate',
        },
        emissions: {
          value: 1800 + Math.random() * 100,
          unit: 'tCO2e/year',
          trend: 'decreasing',
        },
      }));
      
      // Update last sync times
      setDataSources(sources => sources.map(source => ({
        ...source,
        lastSync: new Date(),
      })));
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const getStatusColor = (status: DataSource['status']) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800 border-green-300';
      case 'syncing': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'disconnected': return 'bg-red-100 text-red-800 border-red-300';
    }
  };
  
  const getStatusIcon = (status: DataSource['status']) => {
    switch (status) {
      case 'connected': return '🟢';
      case 'syncing': return '🟡';
      case 'disconnected': return '🔴';
    }
  };
  
  const handleTestConnection = (sourceId: string) => {
    toast.success(`Testing connection to ${dataSources.find(s => s.id === sourceId)?.name}...`, {
      description: 'Connection test successful',
    });
  };
  
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-orange-600';
      case 'decreasing': return 'text-green-600';
      case 'stable': return 'text-blue-600';
      case 'good': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Wifi className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Real-Time Integrations</h2>
        </div>
        <p className="text-cyan-100">Live data from IoT sensors, utilities, and government systems</p>
      </div>
      
      {/* Live Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-semibold text-orange-900">Live Electricity</span>
          </div>
          <div className="text-3xl font-bold text-orange-900">
            {liveData.electricity.value.toFixed(1)}
          </div>
          <div className="text-xs text-orange-700 mt-1">
            {liveData.electricity.unit} • <span className={getTrendColor(liveData.electricity.trend)}>{liveData.electricity.trend}</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">Live Water Flow</span>
          </div>
          <div className="text-3xl font-bold text-blue-900">
            {Math.round(liveData.water.value)}
          </div>
          <div className="text-xs text-blue-700 mt-1">
            {liveData.water.unit} • <span className={getTrendColor(liveData.water.trend)}>{liveData.water.trend}</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-900">Air Quality</span>
          </div>
          <div className="text-3xl font-bold text-green-900">
            {Math.round(liveData.airQuality.value)}
          </div>
          <div className="text-xs text-green-700 mt-1">
            {liveData.airQuality.unit} • <span className={getTrendColor(liveData.airQuality.trend)}>{liveData.airQuality.trend}</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-900">Emissions</span>
          </div>
          <div className="text-3xl font-bold text-purple-900">
            {Math.round(liveData.emissions.value)}
          </div>
          <div className="text-xs text-purple-700 mt-1">
            {liveData.emissions.unit} • <span className={getTrendColor(liveData.emissions.trend)}>{liveData.emissions.trend}</span>
          </div>
        </div>
      </div>
      
      {/* Data Sources */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Connected Data Sources</h3>
        
        <div className="space-y-3">
          {dataSources.map(source => {
            const Icon = source.icon;
            
            return (
              <div
                key={source.id}
                className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900">{source.name}</h4>
                        <span className={`text-xs px-3 py-1 rounded-full font-bold border-2 ${getStatusColor(source.status)}`}>
                          {getStatusIcon(source.status)} {source.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        Type: {source.type.toUpperCase()} • Update Frequency: {source.frequency}
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Last sync: {source.lastSync.toLocaleTimeString()} ({Math.round((Date.now() - source.lastSync.getTime()) / 1000)}s ago)
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleTestConnection(source.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2"
                  >
                    <Database className="w-4 h-4" />
                    Test
                  </button>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-xs font-semibold text-gray-700 mb-2">Metrics Tracked:</div>
                  <div className="flex flex-wrap gap-2">
                    {source.metrics.map((metric, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Integration Benefits */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
        <h4 className="text-lg font-bold text-green-900 mb-4">Integration Benefits</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="font-bold text-green-900 mb-2">✅ Automated Data Collection</div>
            <p className="text-sm text-green-800">
              No manual entry required. Data flows automatically from meters and sensors.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="font-bold text-green-900 mb-2">🔍 Real-Time Monitoring</div>
            <p className="text-sm text-green-800">
              Track consumption, emissions, and compliance in real-time. Instant anomaly detection.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="font-bold text-green-900 mb-2">📊 100% Accuracy</div>
            <p className="text-sm text-green-800">
              Eliminates human error. Verified data for audits and buyer requirements.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="font-bold text-green-900 mb-2">⚡ Instant Alerts</div>
            <p className="text-sm text-green-800">
              Get notified immediately when thresholds are exceeded or anomalies detected.
            </p>
          </div>
        </div>
      </div>
      
      {/* API Documentation */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          Integration Setup
        </h4>
        
        <div className="space-y-3 text-sm text-blue-800">
          <div>
            <div className="font-semibold mb-1">📡 IoT Sensor Integration:</div>
            <p>Contact BIDA IoT Team: iot@bida.gov.bd | +880-2-9876543</p>
            <p className="text-xs">Supported protocols: MQTT, HTTP, ModbusTCP</p>
          </div>
          
          <div>
            <div className="font-semibold mb-1">⚡ DESCO API Access:</div>
            <p>Register at: https://api.desco.gov.bd | Approval: 5 business days</p>
          </div>
          
          <div>
            <div className="font-semibold mb-1">💧 WASA Data Feed:</div>
            <p>Submit request: wasa-api@dhakawasa.gov.bd | Smart meter required</p>
          </div>
          
          <div>
            <div className="font-semibold mb-1">🌍 DOE Environmental Data:</div>
            <p>API Key: Available to all BIDA-registered companies | Auto-approved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
