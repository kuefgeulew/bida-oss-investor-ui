// AI Anomaly Detection - Real-time pattern detection for ESG metrics
// Mounts in: ESG Panel

import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Zap, Droplet, Trash2, Wind } from 'lucide-react';
import { toast } from 'sonner';

interface Anomaly {
  id: string;
  type: 'spike' | 'drop' | 'trend' | 'threshold';
  category: 'energy' | 'water' | 'waste' | 'emissions' | 'safety';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  suggestion: string;
  detectedAt: Date;
  value: number;
  baseline: number;
  percentChange: number;
  icon: any;
}

interface AIAnomalyDetectionProps {
  investorId: string;
  environmentalData?: any[];
}

export function AIAnomalyDetection({ investorId, environmentalData = [] }: AIAnomalyDetectionProps) {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalyzed, setLastAnalyzed] = useState<Date | null>(null);
  
  // Mock AI detection algorithm
  const detectAnomalies = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const detectedAnomalies: Anomaly[] = [];
    
    // Anomaly 1: Water usage spike
    detectedAnomalies.push({
      id: 'anomaly-1',
      type: 'spike',
      category: 'water',
      severity: 'warning',
      title: 'Water Usage Spiked 42%',
      description: 'Water consumption increased from 45,000L to 63,900L this month',
      suggestion: 'Potential leak detected. Check water lines in Production Area B. Schedule immediate inspection.',
      detectedAt: new Date(),
      value: 63900,
      baseline: 45000,
      percentChange: 42,
      icon: Droplet,
    });
    
    // Anomaly 2: Energy efficiency trend
    detectedAnomalies.push({
      id: 'anomaly-2',
      type: 'trend',
      category: 'energy',
      severity: 'info',
      title: 'Improving Energy Efficiency Trend',
      description: 'Energy consumption per unit has decreased 8% over last 3 months',
      suggestion: 'Great progress! Consider applying for Green Factory certification to maximize benefits.',
      detectedAt: new Date(),
      value: 14200,
      baseline: 15435,
      percentChange: -8,
      icon: Zap,
    });
    
    // Anomaly 3: Emissions threshold
    detectedAnomalies.push({
      id: 'anomaly-3',
      type: 'threshold',
      category: 'emissions',
      severity: 'warning',
      title: 'CO₂ Emissions Above Sector Average',
      description: 'Current emissions: 1,850 tons/year. Sector average: 1,420 tons/year (30% higher)',
      suggestion: 'Switching to solar power can reduce emissions by 35%. Contact SREDA-approved solar providers: SolarTech BD, Green Energy Solutions.',
      detectedAt: new Date(),
      value: 1850,
      baseline: 1420,
      percentChange: 30,
      icon: Wind,
    });
    
    // Anomaly 4: Waste management drop
    detectedAnomalies.push({
      id: 'anomaly-4',
      type: 'drop',
      category: 'waste',
      severity: 'info',
      title: 'Waste Generation Reduced 15%',
      description: 'Total waste decreased from 2,400kg to 2,040kg per month',
      suggestion: 'Excellent! This improvement qualifies you for "Waste Reduction Champion" achievement.',
      detectedAt: new Date(),
      value: 2040,
      baseline: 2400,
      percentChange: -15,
      icon: Trash2,
    });
    
    // Anomaly 5: Safety pattern
    detectedAnomalies.push({
      id: 'anomaly-5',
      type: 'trend',
      category: 'safety',
      severity: 'critical',
      title: 'Safety Incidents Trending Upward',
      description: 'Near-miss incidents increased from 2/month to 7/month over 3 months',
      suggestion: 'URGENT: Schedule comprehensive safety audit. Review training programs. Consider ISO 45001 certification.',
      detectedAt: new Date(),
      value: 7,
      baseline: 2,
      percentChange: 250,
      icon: AlertTriangle,
    });
    
    // Anomaly 6: Renewable energy opportunity
    detectedAnomalies.push({
      id: 'anomaly-6',
      type: 'threshold',
      category: 'energy',
      severity: 'info',
      title: 'Low Renewable Energy Usage',
      description: 'Only 5% of energy from renewable sources (Industry leaders: 25-40%)',
      suggestion: 'Solar installation ROI: 3.2 years. Available incentives: 15% tax rebate + accelerated depreciation. Recommended: 250kW rooftop system.',
      detectedAt: new Date(),
      value: 5,
      baseline: 30,
      percentChange: -83,
      icon: Zap,
    });
    
    setAnomalies(detectedAnomalies);
    setLastAnalyzed(new Date());
    setIsAnalyzing(false);
    
    // Show toast for critical anomalies
    const criticalCount = detectedAnomalies.filter(a => a.severity === 'critical').length;
    const warningCount = detectedAnomalies.filter(a => a.severity === 'warning').length;
    
    if (criticalCount > 0) {
      toast.error(`${criticalCount} critical anomalies detected!`, {
        description: 'Immediate action required',
      });
    } else if (warningCount > 0) {
      toast.warning(`${warningCount} warnings detected`, {
        description: 'Review recommended actions',
      });
    } else {
      toast.success('All systems operating normally', {
        description: `${detectedAnomalies.length} insights generated`,
      });
    }
  };
  
  // Auto-analyze on mount
  useEffect(() => {
    detectAnomalies();
    
    // Re-analyze every 5 minutes (simulating real-time monitoring)
    const interval = setInterval(detectAnomalies, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getSeverityStyles = (severity: Anomaly['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          badge: 'bg-red-600 text-white',
          icon: 'text-red-600',
        };
      case 'warning':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          badge: 'bg-orange-600 text-white',
          icon: 'text-orange-600',
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          badge: 'bg-blue-600 text-white',
          icon: 'text-blue-600',
        };
    }
  };
  
  const getTypeIcon = (type: Anomaly['type']) => {
    switch (type) {
      case 'spike': return TrendingUp;
      case 'drop': return TrendingDown;
      case 'trend': return TrendingUp;
      case 'threshold': return AlertTriangle;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-8 h-8" />
              <h2 className="text-2xl font-bold">AI Anomaly Detection</h2>
            </div>
            <p className="text-purple-100">Real-time pattern recognition and predictive insights</p>
          </div>
          
          <button
            onClick={detectAnomalies}
            disabled={isAnalyzing}
            className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                Re-analyze
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Total Insights</div>
          <div className="text-3xl font-bold text-gray-900">{anomalies.length}</div>
        </div>
        
        <div className="bg-red-50 rounded-xl border-2 border-red-200 p-4">
          <div className="text-sm text-red-600 mb-1">Critical</div>
          <div className="text-3xl font-bold text-red-900">
            {anomalies.filter(a => a.severity === 'critical').length}
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-xl border-2 border-orange-200 p-4">
          <div className="text-sm text-orange-600 mb-1">Warnings</div>
          <div className="text-3xl font-bold text-orange-900">
            {anomalies.filter(a => a.severity === 'warning').length}
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-4">
          <div className="text-sm text-blue-600 mb-1">Insights</div>
          <div className="text-3xl font-bold text-blue-900">
            {anomalies.filter(a => a.severity === 'info').length}
          </div>
        </div>
      </div>
      
      {lastAnalyzed && (
        <div className="text-sm text-gray-600 text-center">
          Last analyzed: {lastAnalyzed.toLocaleString()}
        </div>
      )}
      
      {/* Anomaly Cards */}
      <div className="space-y-4">
        {anomalies.map(anomaly => {
          const styles = getSeverityStyles(anomaly.severity);
          const TypeIcon = getTypeIcon(anomaly.type);
          const CategoryIcon = anomaly.icon;
          
          return (
            <div
              key={anomaly.id}
              className={`${styles.bg} border-2 ${styles.border} rounded-xl p-6 transition-all hover:shadow-lg`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-white border-2 ${styles.border} flex items-center justify-center`}>
                    <CategoryIcon className={`w-6 h-6 ${styles.icon}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{anomaly.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-3 py-1 rounded-full font-bold ${styles.badge}`}>
                        {anomaly.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <TypeIcon className="w-3 h-3" />
                        {anomaly.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-3xl font-bold ${anomaly.percentChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {anomaly.percentChange > 0 ? '+' : ''}{anomaly.percentChange}%
                  </div>
                  <div className="text-xs text-gray-600">vs baseline</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">📊 Analysis:</div>
                  <p className="text-sm text-gray-800">{anomaly.description}</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                  <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-600" />
                    AI Recommendation:
                  </div>
                  <p className="text-sm text-gray-800">{anomaly.suggestion}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-gray-600 mb-1">Current Value</div>
                    <div className="font-bold text-gray-900">{anomaly.value.toLocaleString()}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-gray-600 mb-1">Baseline</div>
                    <div className="font-bold text-gray-900">{anomaly.baseline.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* AI Capabilities */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
          <Brain className="w-6 h-6" />
          AI Monitoring Capabilities
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="font-bold text-gray-900 mb-2">📈 Pattern Detection</div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Trend analysis across 6+ months</li>
              <li>• Seasonal pattern recognition</li>
              <li>• Peer comparison anomalies</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="font-bold text-gray-900 mb-2">⚡ Real-Time Alerts</div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Immediate spike detection</li>
              <li>• Threshold breach warnings</li>
              <li>• Equipment failure prediction</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="font-bold text-gray-900 mb-2">🎯 Predictive Insights</div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Resource usage forecasting</li>
              <li>• Maintenance scheduling</li>
              <li>• Cost optimization suggestions</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="font-bold text-gray-900 mb-2">🔗 Integration Sources</div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• IoT sensor networks</li>
              <li>• Utility company APIs</li>
              <li>• DOE monitoring systems</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
