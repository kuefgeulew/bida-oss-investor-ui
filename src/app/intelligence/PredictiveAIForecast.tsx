/**
 * 🤖 PREDICTIVE AI FORECAST
 * AI-powered projection of annual FDI based on current trends
 * Uses linear regression for credible forecasting
 */

import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Brain, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { predictAnnualFDI } from '@/app/engines/fdiPulseEngine';
import { ANNUAL_FDI } from '@/app/data/bangladeshEconomicMock';

export function PredictiveAIForecast() {
  const forecast = useMemo(() => predictAnnualFDI(), []);
  
  const formatCurrency = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}B`;
    return `$${value}M`;
  };
  
  const currentYear = ANNUAL_FDI[2024];
  const growthFromCurrent = ((forecast.projectedAmount - currentYear) / currentYear) * 100;
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-600 bg-green-50 border-green-200';
    if (confidence >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  };
  
  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 85) return CheckCircle;
    return AlertCircle;
  };
  
  const ConfidenceIcon = getConfidenceIcon(forecast.confidence);
  
  return (
    <div className="space-y-4">
      {/* Main Forecast Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30 rounded-2xl border border-gray-100/50"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(99,102,241,.05) 35px, rgba(99,102,241,.05) 70px)`
          }}></div>
        </div>
        
        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/60 rounded-xl backdrop-blur border border-gray-200/50">
              <Brain className="w-8 h-8 text-gray-700" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                FDI Forecast
              </h3>
              <p className="text-gray-600 text-sm">
                Predictive analytics based on current market trends
              </p>
            </div>
          </div>
          
          {/* Main Projection */}
          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-2">Projected 2026 FDI</p>
            <motion.p
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-6xl md:text-7xl font-bold text-gray-900 mb-2"
            >
              {formatCurrency(forecast.projectedAmount)}
            </motion.p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-lg font-bold text-green-600">
                +{growthFromCurrent.toFixed(1)}%
              </span>
              <span className="text-gray-600 text-sm">
                from 2024 baseline
              </span>
            </div>
          </div>
          
          {/* Confidence Meter */}
          <div className="p-4 bg-white/60 backdrop-blur rounded-xl border border-gray-200/50 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ConfidenceIcon className="w-5 h-5 text-gray-700" />
                <p className="text-sm font-semibold text-gray-900">
                  Forecast Confidence
                </p>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {forecast.confidence}%
              </span>
            </div>
            <div className="h-3 bg-gray-200/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${forecast.confidence}%` }}
                transition={{ delay: 0.4, duration: 1 }}
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
              ></motion.div>
            </div>
          </div>
          
          {/* Methodology */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/60 backdrop-blur rounded-xl border border-gray-200/50">
              <p className="text-xs text-gray-600 mb-1">Methodology</p>
              <p className="text-sm font-medium text-gray-900">
                {forecast.methodology}
              </p>
            </div>
            <div className="p-4 bg-white/60 backdrop-blur rounded-xl border border-gray-200/50">
              <p className="text-xs text-gray-600 mb-1">Timeframe</p>
              <p className="text-sm font-medium text-gray-900">
                {forecast.timeframe}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Supporting Context */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <p className="text-xs font-semibold text-gray-600">2024 Actual</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(currentYear)}
          </p>
        </div>
        
        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <p className="text-xs font-semibold text-gray-600">2025 Projected</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(ANNUAL_FDI[2025])}
          </p>
        </div>
        
        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-3 h-3 text-purple-600" />
            <p className="text-xs font-semibold text-purple-600">2026 Forecast</p>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {formatCurrency(forecast.projectedAmount)}
          </p>
        </div>
      </div>
      
      {/* Confidence Explanation */}
      <div className={`p-4 rounded-xl border ${getConfidenceColor(forecast.confidence)}`}>
        <div className="flex items-start gap-3">
          <ConfidenceIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold mb-1">
              {forecast.confidence >= 85 ? 'High Confidence Forecast' : 'Moderate Confidence Forecast'}
            </p>
            <p className="text-xs">
              {forecast.confidence >= 85 
                ? 'Strong upward trend with consistent monthly growth patterns. Current trajectory supports this projection with high statistical confidence.'
                : 'Forecast based on available trend data. Actual results may vary based on global economic conditions and policy changes.'
              }
            </p>
          </div>
        </div>
      </div>
      
      {/* Key Drivers */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h4 className="text-base font-bold text-gray-900 mb-4">Key Growth Drivers</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Consistent monthly FDI growth in 2024-2025',
            'Expanding economic zones with 72% avg occupancy',
            'Export growth of +23% from FDI companies',
            'Government policy reforms improving ease of business',
            'Regional shift towards Bangladesh manufacturing',
            'EU GSP+ trade preferences driving investment'
          ].map((driver, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">{driver}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}