/**
 * 📜 POLICY ALERTS PANEL — HS/Sector-Aware Regulatory Intelligence
 * 
 * Mounted in: Compliance tab
 * Powered by: policyImpactEngine
 * Shows: "New VAT rule affects your imports", sector-specific alerts
 */

import { motion } from 'motion/react';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle,
  Calendar,
  FileText,
  Download,
  ExternalLink,
  Clock,
  TrendingUp
} from 'lucide-react';
import { 
  getPolicyImpacts, 
  getUpcomingDeadlines, 
  getCriticalAlerts,
  type PolicyAlert 
} from '@/app/engines/policyImpactEngine';
import { useMemo } from 'react';
import { useLanguage } from '@/app/components/LanguageContext';

interface PolicyAlertsPanelProps {
  sector: string;
  hsCodes?: string[];
}

export function PolicyAlertsPanel({ sector, hsCodes = ['8541', '8542', '8543'] }: PolicyAlertsPanelProps) {
  // Get all policy impacts
  const allAlerts = useMemo(() => getPolicyImpacts(sector, hsCodes), [sector, hsCodes]);
  
  // Get critical alerts requiring immediate action
  const criticalAlerts = useMemo(() => getCriticalAlerts(sector, hsCodes), [sector, hsCodes]);
  
  // Get upcoming deadlines
  const upcomingDeadlines = useMemo(() => getUpcomingDeadlines(sector, 60), [sector]);
  
  // Categorize alerts
  const highPriorityAlerts = allAlerts.filter(a => a.impactLevel === 'critical' || a.impactLevel === 'high');
  const mediumPriorityAlerts = allAlerts.filter(a => a.impactLevel === 'medium');
  const lowPriorityAlerts = allAlerts.filter(a => a.impactLevel === 'low');
  
  const getImpactColor = (level: string) => {
    switch (level) {
      case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: 'text-red-600' };
      case 'high': return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', icon: 'text-orange-600' };
      case 'medium': return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', icon: 'text-yellow-600' };
      case 'low': return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'text-blue-600' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', icon: 'text-gray-600' };
    }
  };
  
  const getImpactIcon = (level: string) => {
    switch (level) {
      case 'critical': return <AlertTriangle className="w-5 h-5" />;
      case 'high': return <AlertCircle className="w-5 h-5" />;
      case 'medium': return <Info className="w-5 h-5" />;
      case 'low': return <CheckCircle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };
  
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      {/* Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Critical Alerts</p>
              <p className="text-3xl font-bold">{criticalAlerts.length}</p>
              <p className="text-xs opacity-80">require action</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Upcoming Deadlines</p>
              <p className="text-3xl font-bold">{upcomingDeadlines.length}</p>
              <p className="text-xs opacity-80">next 60 days</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Total Policies</p>
              <p className="text-3xl font-bold">{allAlerts.length}</p>
              <p className="text-xs opacity-80">affecting your sector</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Relevance Score</p>
              <p className="text-3xl font-bold">
                {allAlerts.length > 0 ? Math.round(allAlerts.reduce((sum, a) => sum + a.relevanceScore, 0) / allAlerts.length) : 0}
              </p>
              <p className="text-xs opacity-80">average match</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Critical Alerts - Top Priority */}
      {criticalAlerts.length > 0 && (
        <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border-2 border-red-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h3 className="text-xl font-bold text-gray-900">🚨 Critical Alerts Requiring Action</h3>
          </div>
          
          <div className="space-y-3">
            {criticalAlerts.map((alert) => {
              const colors = getImpactColor(alert.impactLevel);
              const daysLeft = alert.actionDeadline 
                ? Math.floor((alert.actionDeadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                : null;
              
              return (
                <motion.div
                  key={alert.policyId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 ${colors.bg} rounded-lg border-2 ${colors.border}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={colors.icon}>
                      {getImpactIcon(alert.impactLevel)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900">{alert.title}</h4>
                        {daysLeft !== null && (
                          <div className="flex items-center gap-1 px-3 py-1 bg-white rounded-full">
                            <Clock className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-bold text-red-600">{daysLeft} days left</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">{alert.summary}</p>
                      
                      <div className="p-3 bg-white/60 rounded mb-2">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Why this affects you:</p>
                        <p className="text-xs text-gray-600">{alert.affectsYou}</p>
                      </div>
                      
                      <div className="p-3 bg-white/60 rounded mb-3">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Recommended action:</p>
                        <p className="text-xs text-gray-600">{alert.recommendedAction}</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700">
                          Take Action Now →
                        </button>
                        <button className="px-4 py-2 bg-white text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 border border-gray-200">
                          <Download className="w-4 h-4 inline mr-1" />
                          Download Policy
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* High Priority Alerts */}
      {highPriorityAlerts.length > 0 && (
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              <h3 className="text-xl font-bold text-gray-900">{t('intelligence.policy.highPriority')}</h3>
            </div>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-bold rounded-full">
              {highPriorityAlerts.length} alerts
            </span>
          </div>
          
          <div className="space-y-3">
            {highPriorityAlerts.map((alert) => {
              const colors = getImpactColor(alert.impactLevel);
              
              return (
                <div
                  key={alert.policyId}
                  className={`p-4 ${colors.bg} rounded-lg border ${colors.border}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                    <div className="flex items-center gap-2">
                      {alert.actionRequired && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
                          {t('intelligence.policy.actionRequired')}
                        </span>
                      )}
                      <span className={`px-2 py-1 ${colors.bg} ${colors.text} text-xs font-bold rounded border ${colors.border}`}>
                        {alert.relevanceScore}/100 {t('intelligence.policy.relevance')}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2">{alert.summary}</p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600">{alert.affectsYou}</p>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                      {t('intelligence.policy.learnMore')} <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Medium & Low Priority */}
      {(mediumPriorityAlerts.length > 0 || lowPriorityAlerts.length > 0) && (
        <div className="p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Additional Policy Updates</h3>
          
          <div className="space-y-2">
            {[...mediumPriorityAlerts, ...lowPriorityAlerts].map((alert) => {
              const colors = getImpactColor(alert.impactLevel);
              
              return (
                <div
                  key={alert.policyId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={colors.icon}>
                      {getImpactIcon(alert.impactLevel)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{alert.title}</p>
                      <p className="text-xs text-gray-600">{alert.affectsYou}</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap">
                    View Details →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Trust Signal */}
      <div className="text-center text-sm text-gray-600 py-4">
        <p>
          <FileText className="w-4 h-4 inline mr-1" />
          Policy data from: NBR, Department of Environment, Ministry of Labour, Bangladesh Customs
        </p>
        <p className="text-xs mt-1">Last updated: {new Date().toLocaleString('en-BD')}</p>
      </div>
    </div>
  );
}