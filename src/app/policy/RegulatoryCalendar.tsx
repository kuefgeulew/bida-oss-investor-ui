// 📅 REGULATORY CALENDAR — Timeline view of upcoming policy changes
// Shows 90-day view of upcoming regulatory changes and deadlines

import React, { useMemo, useState } from 'react';
import { Calendar, AlertCircle, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { getUpcomingDeadlines, type PolicyAlert } from './policyEngine';
import { glassCard } from '../config/designSystem';

interface RegulatoryCalendarProps {
  sector: string;
  daysAhead?: number;
}

export function RegulatoryCalendar({ sector, daysAhead = 90 }: RegulatoryCalendarProps) {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  
  const upcomingAlerts = useMemo(() => 
    getUpcomingDeadlines(sector, daysAhead),
    [sector, daysAhead]
  );

  // Group alerts by month
  const alertsByMonth = useMemo(() => {
    const grouped: Record<string, PolicyAlert[]> = {};
    upcomingAlerts.forEach(alert => {
      if (!alert.actionDeadline) return;
      const date = new Date(alert.actionDeadline);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      if (!grouped[monthKey]) grouped[monthKey] = [];
      grouped[monthKey].push(alert);
    });
    return grouped;
  }, [upcomingAlerts]);

  // Generate next 3 months
  const months = useMemo(() => {
    const result = [];
    const today = new Date();
    for (let i = 0; i < 3; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      result.push({
        name: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        key: `${date.getFullYear()}-${date.getMonth()}`,
        alertCount: alertsByMonth[`${date.getFullYear()}-${date.getMonth()}`]?.length || 0
      });
    }
    return result;
  }, [alertsByMonth]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diff = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${glassCard['p-6']} bg-gradient-to-r from-purple-50 to-blue-50`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Regulatory Calendar</h2>
            <p className="text-gray-600">Upcoming changes and deadlines for the next {daysAhead} days</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Critical Deadlines</p>
              <p className="text-3xl font-bold">
                {upcomingAlerts.filter(a => a.priority === 'critical').length}
              </p>
              <p className="text-xs opacity-80">require action</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Next 30 Days</p>
              <p className="text-3xl font-bold">
                {upcomingAlerts.filter(a => a.actionDeadline && getDaysUntilDeadline(a.actionDeadline) <= 30).length}
              </p>
              <p className="text-xs opacity-80">upcoming</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Total Changes</p>
              <p className="text-3xl font-bold">{upcomingAlerts.length}</p>
              <p className="text-xs opacity-80">in next 90 days</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Action Required</p>
              <p className="text-3xl font-bold">
                {upcomingAlerts.filter(a => a.actionRequired).length}
              </p>
              <p className="text-xs opacity-80">must complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Month Tabs */}
      <div className="flex gap-2 border-b">
        {months.map((month, idx) => (
          <button
            key={month.key}
            onClick={() => setSelectedMonth(idx)}
            className={`px-6 py-3 font-semibold transition-all ${
              selectedMonth === idx
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {month.name}
            {month.alertCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {month.alertCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Timeline View */}
      <div className="space-y-4">
        {upcomingAlerts
          .filter(alert => {
            if (!alert.actionDeadline) return false;
            const date = new Date(alert.actionDeadline);
            const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
            return monthKey === months[selectedMonth].key;
          })
          .sort((a, b) => {
            if (!a.actionDeadline || !b.actionDeadline) return 0;
            return new Date(a.actionDeadline).getTime() - new Date(b.actionDeadline).getTime();
          })
          .map((alert, idx) => {
            const daysUntil = alert.actionDeadline ? getDaysUntilDeadline(alert.actionDeadline) : 0;
            const deadlineDate = alert.actionDeadline ? new Date(alert.actionDeadline) : new Date();
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`${glassCard['p-6']} border-l-4 ${
                  alert.priority === 'critical' ? 'border-red-500' :
                  alert.priority === 'high' ? 'border-orange-500' :
                  alert.priority === 'medium' ? 'border-yellow-500' :
                  'border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(alert.priority)}`} />
                      <span className="text-xs font-semibold text-gray-500 uppercase">
                        {alert.type}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{alert.source}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{alert.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          Deadline: {deadlineDate.toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className={`font-semibold ${
                          daysUntil <= 7 ? 'text-red-600' :
                          daysUntil <= 30 ? 'text-orange-600' :
                          'text-gray-600'
                        }`}>
                          {daysUntil} days remaining
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      alert.priority === 'critical' ? 'bg-red-100 text-red-700' :
                      alert.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                      alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {alert.priority.toUpperCase()}
                    </span>
                    
                    {alert.actionRequired && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm">
                        Take Action
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        
        {upcomingAlerts.filter(alert => {
          if (!alert.actionDeadline) return false;
          const date = new Date(alert.actionDeadline);
          const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
          return monthKey === months[selectedMonth].key;
        }).length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Deadlines This Month</h3>
            <p className="text-gray-600">You're all caught up for {months[selectedMonth].name}!</p>
          </div>
        )}
      </div>
    </div>
  );
}
