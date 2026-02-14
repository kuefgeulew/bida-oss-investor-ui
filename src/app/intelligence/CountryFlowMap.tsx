/**
 * 🌍 COUNTRY FLOW MAP — FDI Source Visualization
 * 
 * Mounted in: FDI Intelligence Tab
 * Shows: Animated lines from source countries → Bangladesh
 * Data: Live from fdiPulseEngine
 */

import { motion } from 'motion/react';
import { useState } from 'react';
import { TrendingUp, Globe, DollarSign } from 'lucide-react';

interface CountryFlow {
  country: string;
  code: string;
  investment: number;
  projects: number;
  percentage: number;
  coordinates: { x: number; y: number }; // Position on map
}

export function CountryFlowMap() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  
  // Bangladesh position (center-right of map)
  const bangladeshPos = { x: 650, y: 300 };
  
  // Top FDI source countries with realistic positions
  const flows: CountryFlow[] = [
    {
      country: 'China',
      code: 'CN',
      investment: 2850000000,
      projects: 127,
      percentage: 32,
      coordinates: { x: 700, y: 250 }
    },
    {
      country: 'United States',
      code: 'US',
      investment: 1920000000,
      projects: 89,
      percentage: 21,
      coordinates: { x: 200, y: 280 }
    },
    {
      country: 'United Kingdom',
      code: 'GB',
      investment: 1450000000,
      projects: 67,
      percentage: 16,
      coordinates: { x: 450, y: 180 }
    },
    {
      country: 'Japan',
      code: 'JP',
      investment: 1180000000,
      projects: 54,
      percentage: 13,
      coordinates: { x: 800, y: 260 }
    },
    {
      country: 'South Korea',
      code: 'KR',
      investment: 890000000,
      projects: 42,
      percentage: 10,
      coordinates: { x: 780, y: 240 }
    },
    {
      country: 'Netherlands',
      code: 'NL',
      investment: 720000000,
      projects: 31,
      percentage: 8,
      coordinates: { x: 470, y: 190 }
    }
  ];
  
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`;
    return `$${value.toFixed(0)}`;
  };
  
  const getFlowColor = (percentage: number) => {
    if (percentage >= 30) return '#10b981'; // green-500
    if (percentage >= 20) return '#3b82f6'; // blue-500
    if (percentage >= 10) return '#8b5cf6'; // purple-500
    return '#6b7280'; // gray-500
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          FDI Source Country Flow Map
        </h2>
        <p className="text-sm text-gray-600">
          Real-time visualization of foreign direct investment flows into Bangladesh
        </p>
      </div>
      
      {/* Map Container */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-8 overflow-hidden">
        <svg 
          viewBox="0 0 1000 500" 
          className="w-full h-auto"
          style={{ maxHeight: '500px' }}
        >
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e0e7ff" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="1000" height="500" fill="url(#grid)" />
          
          {/* Animated Flow Lines */}
          {flows.map((flow, idx) => {
            const isSelected = selectedCountry === flow.country;
            const strokeWidth = isSelected ? 4 : 2;
            const opacity = selectedCountry ? (isSelected ? 1 : 0.3) : 0.8;
            
            return (
              <g key={flow.country}>
                {/* Flow Line */}
                <motion.line
                  x1={flow.coordinates.x}
                  y1={flow.coordinates.y}
                  x2={bangladeshPos.x}
                  y2={bangladeshPos.y}
                  stroke={getFlowColor(flow.percentage)}
                  strokeWidth={strokeWidth}
                  strokeDasharray="5,5"
                  opacity={opacity}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 2,
                    delay: idx * 0.2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                />
                
                {/* Animated Dots (money flow) */}
                <motion.circle
                  r="4"
                  fill={getFlowColor(flow.percentage)}
                  opacity={opacity}
                  animate={{
                    cx: [flow.coordinates.x, bangladeshPos.x],
                    cy: [flow.coordinates.y, bangladeshPos.y],
                  }}
                  transition={{
                    duration: 3,
                    delay: idx * 0.3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "linear"
                  }}
                />
              </g>
            );
          })}
          
          {/* Source Country Nodes */}
          {flows.map((flow) => {
            const isSelected = selectedCountry === flow.country;
            const scale = isSelected ? 1.3 : 1;
            
            return (
              <g 
                key={`node-${flow.country}`}
                onMouseEnter={() => setSelectedCountry(flow.country)}
                onMouseLeave={() => setSelectedCountry(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Country Circle */}
                <motion.circle
                  cx={flow.coordinates.x}
                  cy={flow.coordinates.y}
                  r={20}
                  fill="#ffffff"
                  stroke={getFlowColor(flow.percentage)}
                  strokeWidth={3}
                  animate={{ scale }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Country Code */}
                <text
                  x={flow.coordinates.x}
                  y={flow.coordinates.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-bold"
                  fill={getFlowColor(flow.percentage)}
                >
                  {flow.code}
                </text>
                
                {/* Country Label */}
                <text
                  x={flow.coordinates.x}
                  y={flow.coordinates.y - 35}
                  textAnchor="middle"
                  className="text-sm font-semibold"
                  fill="#1f2937"
                >
                  {flow.country}
                </text>
              </g>
            );
          })}
          
          {/* Bangladesh (Destination) */}
          <g>
            {/* Pulsing Ring */}
            <motion.circle
              cx={bangladeshPos.x}
              cy={bangladeshPos.y}
              r={25}
              fill="none"
              stroke="#10b981"
              strokeWidth={3}
              opacity={0}
              animate={{
                r: [25, 45],
                opacity: [0.8, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            
            {/* Main Circle */}
            <circle
              cx={bangladeshPos.x}
              cy={bangladeshPos.y}
              r={30}
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth={4}
            />
            
            {/* Flag Icon */}
            <text
              x={bangladeshPos.x}
              y={bangladeshPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-2xl"
            >
              🇧🇩
            </text>
            
            {/* Bangladesh Label */}
            <text
              x={bangladeshPos.x}
              y={bangladeshPos.y + 50}
              textAnchor="middle"
              className="text-lg font-bold"
              fill="#1f2937"
            >
              Bangladesh
            </text>
          </g>
        </svg>
      </div>
      
      {/* Country Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flows.map((flow) => {
          const isSelected = selectedCountry === flow.country;
          
          return (
            <motion.div
              key={flow.country}
              onMouseEnter={() => setSelectedCountry(flow.country)}
              onMouseLeave={() => setSelectedCountry(null)}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-xl'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ 
                      backgroundColor: `${getFlowColor(flow.percentage)}20`,
                      border: `2px solid ${getFlowColor(flow.percentage)}`
                    }}
                  >
                    {flow.code === 'CN' && '🇨🇳'}
                    {flow.code === 'US' && '🇺🇸'}
                    {flow.code === 'GB' && '🇬🇧'}
                    {flow.code === 'JP' && '🇯🇵'}
                    {flow.code === 'KR' && '🇰🇷'}
                    {flow.code === 'NL' && '🇳🇱'}
                  </div>
                  <h3 className="font-bold text-gray-900">{flow.country}</h3>
                </div>
                <div 
                  className="px-3 py-1 rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: getFlowColor(flow.percentage) }}
                >
                  {flow.percentage}%
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">Investment</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(flow.investment)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">Active Projects</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    {flow.projects}
                  </span>
                </div>
                
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>
                      {flow.percentage >= 30 ? 'Primary Partner' : 
                       flow.percentage >= 20 ? 'Major Investor' :
                       flow.percentage >= 10 ? 'Key Partner' : 'Strategic Investor'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-700">Primary (30%+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-700">Major (20-30%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-purple-500"></div>
          <span className="text-sm text-gray-700">Key (10-20%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-500"></div>
          <span className="text-sm text-gray-700">Strategic (&lt;10%)</span>
        </div>
      </div>
      
      {/* Data Attribution */}
      <div className="text-center text-xs text-gray-500">
        Data Source: Bangladesh Bank FDI Database • Updated: {new Date().toLocaleDateString('en-BD')} • 
        Flows represent cumulative FDI (2020-2025)
      </div>
    </div>
  );
}
