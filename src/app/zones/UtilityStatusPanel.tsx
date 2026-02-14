// Utility Status Panel - Real-time utility monitoring for investment zones
// READ-ONLY panel that reads from zoneIntelligenceEngine
// Mounts inside: Zone view, InvestmentZoneMap

import React from 'react';
import { Zap, Droplet, Wifi, Wind, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { getZoneIntelligence, type ZoneIntelligence } from './zoneIntelligenceEngine';
import { type SEZZone } from '@/app/data/mockData';

interface UtilityStatusPanelProps {
  zone: SEZZone;
  showDetailed?: boolean;
}

export function UtilityStatusPanel({ zone, showDetailed = true }: UtilityStatusPanelProps) {
  const intelligence = getZoneIntelligence(zone.id, zone);
  const { utilityStatus, infrastructure, environmental } = intelligence;
  
  const getUptimeColor = (uptime: number) => {
    if (uptime >= 98) return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', icon: 'text-green-500' };
    if (uptime >= 95) return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', icon: 'text-blue-500' };
    if (uptime >= 90) return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-600', icon: 'text-yellow-500' };
    return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', icon: 'text-red-500' };
  };
  
  const powerColor = getUptimeColor(utilityStatus.powerUptime);
  const waterStatus = utilityStatus.waterPressure >= 60 ? 'excellent' : utilityStatus.waterPressure >= 45 ? 'good' : 'fair';
  const internetStatus = utilityStatus.internetSpeed >= 1000 ? 'gigabit' : utilityStatus.internetSpeed >= 500 ? 'high-speed' : 'standard';
  
  return (
    <div className="space-y-4">
      {/* Header */}
      {showDetailed && (
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-5 h-5" />
            <h3 className="text-lg font-bold">Utility Status Monitor</h3>
          </div>
          <p className="text-cyan-100 text-sm">{zone.name} • Real-time infrastructure metrics</p>
        </div>
      )}

      {/* Quick Status Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Power */}
        <div className={`${powerColor.bg} border-2 ${powerColor.border} rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-2">
            <Zap className={`w-4 h-4 ${powerColor.icon}`} />
            <span className={`text-xs font-semibold ${powerColor.text}`}>Power</span>
          </div>
          <div className={`text-2xl font-bold ${powerColor.text}`}>{utilityStatus.powerUptime.toFixed(1)}%</div>
          <div className="text-xs text-gray-600 mt-1">Uptime</div>
        </div>
        
        {/* Water */}
        <div className={`${waterStatus === 'excellent' ? 'bg-blue-50 border-blue-200' : 'bg-cyan-50 border-cyan-200'} border-2 rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-2">
            <Droplet className={`w-4 h-4 ${waterStatus === 'excellent' ? 'text-blue-500' : 'text-cyan-500'}`} />
            <span className={`text-xs font-semibold ${waterStatus === 'excellent' ? 'text-blue-600' : 'text-cyan-600'}`}>Water</span>
          </div>
          <div className={`text-2xl font-bold ${waterStatus === 'excellent' ? 'text-blue-600' : 'text-cyan-600'}`}>
            {utilityStatus.waterPressure} PSI
          </div>
          <div className="text-xs text-gray-600 mt-1 capitalize">{waterStatus}</div>
        </div>
        
        {/* Internet */}
        <div className={`${internetStatus === 'gigabit' ? 'bg-purple-50 border-purple-200' : 'bg-indigo-50 border-indigo-200'} border-2 rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-2">
            <Wifi className={`w-4 h-4 ${internetStatus === 'gigabit' ? 'text-purple-500' : 'text-indigo-500'}`} />
            <span className={`text-xs font-semibold ${internetStatus === 'gigabit' ? 'text-purple-600' : 'text-indigo-600'}`}>Internet</span>
          </div>
          <div className={`text-2xl font-bold ${internetStatus === 'gigabit' ? 'text-purple-600' : 'text-indigo-600'}`}>
            {utilityStatus.internetSpeed}
          </div>
          <div className="text-xs text-gray-600 mt-1">Mbps</div>
        </div>
        
        {/* Waste Treatment */}
        <div className={`${utilityStatus.wasteTreatment ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'} border-2 rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-2">
            <Wind className={`w-4 h-4 ${utilityStatus.wasteTreatment ? 'text-green-500' : 'text-orange-500'}`} />
            <span className={`text-xs font-semibold ${utilityStatus.wasteTreatment ? 'text-green-600' : 'text-orange-600'}`}>Waste</span>
          </div>
          <div className="flex items-center gap-1 text-lg font-bold">
            {utilityStatus.wasteTreatment ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <AlertCircle className="w-6 h-6 text-orange-600" />
            )}
          </div>
          <div className="text-xs text-gray-600 mt-1">{utilityStatus.wasteTreatment ? 'ETP Active' : 'No ETP'}</div>
        </div>
      </div>

      {/* Detailed Infrastructure Info */}
      {showDetailed && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Infrastructure Details</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Power Infrastructure */}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-bold text-gray-900">Power Infrastructure</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-bold text-gray-900">{infrastructure.powerCapacityMW} MW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance to Grid:</span>
                  <span className="font-bold text-gray-900">{infrastructure.powerLineDistance.toFixed(1)} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reliability:</span>
                  <span className="font-bold text-green-600">{infrastructure.powerReliability.toFixed(1)}%</span>
                </div>
              </div>
            </div>
            
            {/* Gas Infrastructure */}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Wind className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-gray-900">Gas Infrastructure</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pressure:</span>
                  <span className="font-bold text-gray-900">{infrastructure.gasPressurePSI} PSI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance to Pipeline:</span>
                  <span className="font-bold text-gray-900">{infrastructure.gasLineDistance.toFixed(1)} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Availability:</span>
                  <span className={`font-bold capitalize ${
                    infrastructure.gasAvailability === 'high' ? 'text-green-600' :
                    infrastructure.gasAvailability === 'medium' ? 'text-blue-600' :
                    'text-orange-600'
                  }`}>
                    {infrastructure.gasAvailability}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Environmental Quality */}
      {showDetailed && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Environmental Quality</h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-xs text-gray-600 mb-1">Air Quality</div>
              <div className={`text-2xl font-bold ${
                environmental.airQualityIndex < 60 ? 'text-green-600' :
                environmental.airQualityIndex < 80 ? 'text-blue-600' :
                'text-orange-600'
              }`}>
                {environmental.airQualityIndex}
              </div>
              <div className="text-xs text-gray-500">AQI</div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-gray-600 mb-1">Water Quality</div>
              <div className={`text-2xl font-bold ${
                environmental.waterQualityGrade === 'A' ? 'text-green-600' :
                environmental.waterQualityGrade === 'B' ? 'text-blue-600' :
                'text-orange-600'
              }`}>
                {environmental.waterQualityGrade}
              </div>
              <div className="text-xs text-gray-500">Grade</div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-gray-600 mb-1">Noise Level</div>
              <div className={`text-2xl font-bold ${
                environmental.noiseLevel < 55 ? 'text-green-600' :
                environmental.noiseLevel < 70 ? 'text-blue-600' :
                'text-orange-600'
              }`}>
                {environmental.noiseLevel}
              </div>
              <div className="text-xs text-gray-500">dB</div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-gray-600 mb-1">Green Cover</div>
              <div className="text-2xl font-bold text-green-600">{environmental.greenCoverPercent}%</div>
              <div className="text-xs text-gray-500">Area</div>
            </div>
          </div>
        </div>
      )}

      {/* Logistics Proximity */}
      {showDetailed && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Logistics & Connectivity</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm bg-gray-50 rounded p-2">
              <span className="text-gray-600">Nearest Port ({infrastructure.nearestPort}):</span>
              <span className="font-bold text-gray-900">{infrastructure.portDistance.toFixed(1)} km</span>
            </div>
            
            <div className="flex items-center justify-between text-sm bg-gray-50 rounded p-2">
              <span className="text-gray-600">Nearest Airport ({infrastructure.nearestAirport}):</span>
              <span className="font-bold text-gray-900">{infrastructure.airportDistance.toFixed(1)} km</span>
            </div>
            
            <div className="flex items-center justify-between text-sm bg-gray-50 rounded p-2">
              <span className="text-gray-600">Rail Access:</span>
              <span className={`font-bold capitalize ${
                infrastructure.railCapacity === 'high' ? 'text-green-600' :
                infrastructure.railCapacity === 'medium' ? 'text-blue-600' :
                'text-orange-600'
              }`}>
                {infrastructure.railDistance.toFixed(1)} km • {infrastructure.railCapacity}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm bg-gray-50 rounded p-2">
              <span className="text-gray-600">Highway Access:</span>
              <span className="font-bold text-gray-900">{infrastructure.highwayDistance.toFixed(1)} km • Road Quality: {infrastructure.roadQuality}/10</span>
            </div>
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="text-xs text-gray-500 text-center">
        Last updated: {new Date(utilityStatus.lastUpdated).toLocaleString()}
      </div>
    </div>
  );
}

// Compact version for map tooltips
export function UtilityStatusCompact({ zone }: { zone: SEZZone }) {
  const intelligence = getZoneIntelligence(zone.id, zone);
  const { utilityStatus } = intelligence;
  
  return (
    <div className="grid grid-cols-2 gap-2 text-xs">
      <div className="flex items-center gap-1">
        <Zap className="w-3 h-3 text-yellow-600" />
        <span className="font-semibold">{utilityStatus.powerUptime.toFixed(0)}%</span>
      </div>
      <div className="flex items-center gap-1">
        <Droplet className="w-3 h-3 text-blue-600" />
        <span className="font-semibold">{utilityStatus.waterPressure} PSI</span>
      </div>
      <div className="flex items-center gap-1">
        <Wifi className="w-3 h-3 text-purple-600" />
        <span className="font-semibold">{utilityStatus.internetSpeed} Mbps</span>
      </div>
      <div className="flex items-center gap-1">
        {utilityStatus.wasteTreatment ? (
          <CheckCircle className="w-3 h-3 text-green-600" />
        ) : (
          <AlertCircle className="w-3 h-3 text-orange-600" />
        )}
        <span className="font-semibold">ETP</span>
      </div>
    </div>
  );
}
