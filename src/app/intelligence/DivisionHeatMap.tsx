/**
 * 🗺️ BANGLADESH DIVISION HEAT MAP
 * Geographic visualization showing FDI distribution across 8 divisions
 * Heat intensity based on investment concentration
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, TrendingUp } from 'lucide-react';
import { DIVISION_FDI } from '@/app/data/bangladeshEconomicMock';

export function DivisionHeatMap() {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  
  const maxAmount = Math.max(...DIVISION_FDI.map(d => d.amount));
  
  const formatCurrency = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}B`;
    return `$${value}M`;
  };
  
  const getHeatColor = (intensity: number) => {
    if (intensity >= 0.8) return 'from-red-500 to-red-600';
    if (intensity >= 0.6) return 'from-orange-500 to-orange-600';
    if (intensity >= 0.4) return 'from-amber-500 to-amber-600';
    if (intensity >= 0.2) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };
  
  const selected = selectedDivision 
    ? DIVISION_FDI.find(d => d.division === selectedDivision)
    : null;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            FDI Heat Map by Division
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Geographic distribution across Bangladesh's 8 administrative divisions
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heat Map Visualization */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
          <div className="space-y-3">
            {DIVISION_FDI.map((division) => {
              const widthPercent = (division.amount / maxAmount) * 100;
              const isSelected = selectedDivision === division.division;
              
              return (
                <motion.div
                  key={division.division}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedDivision(division.division)}
                  className={`cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: division.color }}
                      ></div>
                      <p className="text-sm font-semibold text-gray-900">
                        {division.division}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        {formatCurrency(division.amount)}
                      </p>
                      <p className="text-xs text-gray-600">
                        {division.projects} projects
                      </p>
                    </div>
                  </div>
                  
                  {/* Heat Bar */}
                  <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPercent}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className={`h-full bg-gradient-to-r ${getHeatColor(division.intensity)} flex items-center justify-end pr-3`}
                    >
                      <span className="text-xs font-bold text-white drop-shadow">
                        {Math.round((division.amount / 1700) * 100)}%
                      </span>
                    </motion.div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">
                      Intensity: {(division.intensity * 100).toFixed(0)}%
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      +{division.growth}% YoY
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Heat Legend */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-2">Heat Intensity Scale</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-4 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500 rounded"></div>
              <div className="flex justify-between w-full text-xs text-gray-600">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Division Details Panel */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
          {selected ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selected.color }}
                  ></div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {selected.division}
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  Division Investment Profile
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Total Investment</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(selected.amount)}
                  </p>
                </div>
                
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {selected.projects}
                  </p>
                </div>
                
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">YoY Growth</p>
                  <p className="text-2xl font-bold text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-5 h-5" />
                    +{selected.growth}%
                  </p>
                </div>
                
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Market Share</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round((selected.amount / 1700) * 100)}%
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-blue-200">
                <p className="text-xs text-gray-600">
                  Coordinates: {selected.latitude.toFixed(4)}°N, {selected.longitude.toFixed(4)}°E
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MapPin className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-sm text-gray-600">
                Click on a division to see detailed investment profile
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
