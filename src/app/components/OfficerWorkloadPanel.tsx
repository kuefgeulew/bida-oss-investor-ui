// Officer Workload & Stress Intelligence Layer
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getWorkloadStats, Officer } from '@/app/officer-core/officerDataEngine';

interface OfficerWorkloadPanelProps {
  officer: Officer;
}

export function OfficerWorkloadPanel({ officer }: OfficerWorkloadPanelProps) {
  const [timeSpent, setTimeSpent] = useState(0);
  const [applicationStartTime] = useState(Date.now());

  // 18. Time Spent Per Application - Auto timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - applicationStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [applicationStartTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // 17. Workload Heatmap - Get from data engine
  const workloadData = getWorkloadStats(officer.email);

  const getHeatmapColor = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count < 5) return 'bg-green-200';
    if (count < 10) return 'bg-yellow-300';
    if (count < 15) return 'bg-orange-400';
    return 'bg-red-500';
  };

  // 19. Burnout Indicator
  const calculateBurnoutScore = () => {
    let score = 0;
    
    // Late night work
    const lateNightDays = workloadData.filter(d => d.lateNight).length;
    score += lateNightDays * 15;
    
    // Weekend work
    const weekendDays = workloadData.filter(d => d.weekend && d.applications > 0).length;
    score += weekendDays * 20;
    
    // SLA slips
    const totalBreaches = workloadData.reduce((sum, d) => sum + d.slaBreaches, 0);
    score += totalBreaches * 10;
    
    // High daily load
    const highLoadDays = workloadData.filter(d => d.applications > 12).length;
    score += highLoadDays * 10;
    
    return Math.min(100, score);
  };

  const burnoutScore = calculateBurnoutScore();

  const getBurnoutLevel = (score: number) => {
    if (score < 25) return { level: 'Healthy', color: 'green', message: '✓ Work-life balance maintained' };
    if (score < 50) return { level: 'Moderate', color: 'yellow', message: '○ Monitor workload closely' };
    if (score < 75) return { level: 'High', color: 'orange', message: '⚠️ Consider workload adjustment' };
    return { level: 'Critical', color: 'red', message: '🚨 Immediate intervention required' };
  };

  const burnoutStatus = getBurnoutLevel(burnoutScore);

  const weeklyStats = {
    totalApplications: workloadData.reduce((sum, d) => sum + d.applications, 0),
    avgPerDay: Math.round(workloadData.reduce((sum, d) => sum + d.applications, 0) / 5), // Weekdays only
    peakDay: workloadData.reduce((max, d) => d.applications > max.applications ? d : max),
    totalSLABreaches: workloadData.reduce((sum, d) => sum + d.slaBreaches, 0),
    lateNightSessions: workloadData.filter(d => d.lateNight).length,
    weekendWork: workloadData.filter(d => d.weekend && d.applications > 0).length
  };

  return (
    <div className="space-y-4">
      {/* Workload Header */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <TrendingUp className="w-5 h-5 text-teal-600" />
        <h3 className="font-semibold text-lg">Workload & Wellness</h3>
      </div>

      {/* 18. Time Spent Tracker */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <div>
              <h4 className="font-semibold">Time Spent on This Application</h4>
              <p className="text-sm text-gray-600">Auto-tracked since opening</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-900">{formatTime(timeSpent)}</p>
            <p className="text-xs text-blue-600">Active session</p>
          </div>
        </div>
        <div className="mt-3 p-2 bg-white/70 rounded">
          <p className="text-xs text-gray-700">
            ℹ️ Average processing time for this complexity: 45 minutes
          </p>
        </div>
      </Card>

      {/* 17. Workload Heatmap */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h4 className="font-semibold">Weekly Workload Heatmap</h4>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {workloadData.map((day, idx) => (
            <div key={idx} className="text-center">
              <p className="text-xs font-medium mb-1 text-gray-600">{day.day}</p>
              <div
                className={`${getHeatmapColor(day.applications)} aspect-square rounded flex items-center justify-center border-2 ${
                  day.weekend ? 'border-blue-400' : 'border-gray-300'
                }`}
              >
                <span className="font-bold text-sm">{day.applications}</span>
              </div>
              <div className="mt-1 space-y-0.5">
                {day.lateNight && (
                  <p className="text-xs text-orange-600">🌙 Late</p>
                )}
                {day.slaBreaches > 0 && (
                  <p className="text-xs text-red-600">⚠️ {day.slaBreaches}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 bg-gray-50 rounded text-center">
            <p className="text-xs text-gray-600">Weekly Total</p>
            <p className="text-xl font-bold">{weeklyStats.totalApplications}</p>
          </div>
          <div className="p-2 bg-gray-50 rounded text-center">
            <p className="text-xs text-gray-600">Avg/Day</p>
            <p className="text-xl font-bold">{weeklyStats.avgPerDay}</p>
          </div>
          <div className="p-2 bg-gray-50 rounded text-center">
            <p className="text-xs text-gray-600">Peak Day</p>
            <p className="text-xl font-bold">{weeklyStats.peakDay.day}</p>
            <p className="text-xs text-gray-600">({weeklyStats.peakDay.applications} apps)</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-200 rounded"></div>
            <span>Light (1-4)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-300 rounded"></div>
            <span>Moderate (5-9)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-400 rounded"></div>
            <span>Heavy (10-14)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Overload (15+)</span>
          </div>
        </div>
      </Card>

      {/* 19. Burnout Indicator */}
      <Card className={`p-4 border-l-4 border-l-${burnoutStatus.color}-500`}>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className={`w-5 h-5 text-${burnoutStatus.color}-600`} />
          <h4 className="font-semibold">Burnout Risk Assessment</h4>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Burnout Score</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{burnoutScore}/100</span>
              <Badge
                variant="outline"
                className={`bg-${burnoutStatus.color}-100 text-${burnoutStatus.color}-800 border-${burnoutStatus.color}-300`}
              >
                {burnoutStatus.level}
              </Badge>
            </div>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-${burnoutStatus.color}-500 transition-all`}
              style={{ width: `${burnoutScore}%` }}
            />
          </div>
        </div>

        <div className={`p-3 bg-${burnoutStatus.color}-50 border border-${burnoutStatus.color}-300 rounded mb-3`}>
          <p className={`text-sm text-${burnoutStatus.color}-900 font-medium`}>
            {burnoutStatus.message}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-700">🌙 Late night work sessions</span>
            <Badge variant="outline">{weeklyStats.lateNightSessions} this week</Badge>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-700">📅 Weekend work days</span>
            <Badge variant="outline">{weeklyStats.weekendWork} this week</Badge>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-700">⏰ SLA breaches</span>
            <Badge variant="outline">{weeklyStats.totalSLABreaches} this week</Badge>
          </div>
        </div>

        {burnoutScore > 50 && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded">
            <p className="font-semibold text-sm text-yellow-900 mb-2">⚠️ Recommended Actions:</p>
            <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
              <li>Request workload redistribution from supervisor</li>
              <li>Prioritize SLA-critical cases only</li>
              <li>Delegate routine reviews to junior officers</li>
              <li>Take scheduled breaks between applications</li>
              {weeklyStats.weekendWork > 0 && <li>Avoid weekend work - enforce rest days</li>}
              {weeklyStats.lateNightSessions > 2 && <li>Set strict end-of-day cutoff (6 PM)</li>}
            </ul>
          </div>
        )}

        {burnoutScore >= 75 && (
          <div className="mt-3">
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors font-medium">
              <AlertTriangle className="w-4 h-4 inline mr-2" />
              Request Emergency Workload Adjustment
            </button>
          </div>
        )}
      </Card>

      {/* Wellness Tips */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-teal-50">
        <h4 className="font-semibold mb-2">💚 Wellness Tips</h4>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Take a 5-minute break every hour</li>
          <li>Use decision templates to save time</li>
          <li>Ask for help early - don't wait until stuck</li>
          <li>Log off on time - applications will be there tomorrow</li>
          <li>Your wellbeing enables better decisions</li>
        </ul>
      </Card>
    </div>
  );
}