// 📅 ENHANCED KYA TIMELINE — World-Class Project Management Dashboard
// NEW FEATURES: Gantt chart, parallel approvals, critical path, historical processing times
// ARCHITECTURE: Visual project timeline with intelligence overlays

import React, { useState, useMemo } from 'react';
import { Card } from '@/app/components/ui/card';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  Calendar,
  Zap,
  Activity,
  Target,
  GitBranch,
  FastForward,
  BarChart3
} from 'lucide-react';

interface TimelineStep {
  id: string;
  name: string;
  department: string;
  duration: number; // days
  avgProcessingTime: number; // historical average
  fastestTime: number; // fastest recorded
  dependencies: string[]; // IDs of steps that must complete first
  canRunParallel: boolean;
  criticalPath: boolean;
  status: 'pending' | 'in-progress' | 'completed';
  startDay?: number;
  endDay?: number;
}

const ALL_STEPS: TimelineStep[] = [
  {
    id: 'bida-reg',
    name: 'BIDA Registration',
    department: 'BIDA',
    duration: 3,
    avgProcessingTime: 2.5,
    fastestTime: 1,
    dependencies: [],
    canRunParallel: false,
    criticalPath: true,
    status: 'completed'
  },
  {
    id: 'rjsc-name',
    name: 'Company Name Clearance',
    department: 'RJSC',
    duration: 2,
    avgProcessingTime: 1.8,
    fastestTime: 1,
    dependencies: ['bida-reg'],
    canRunParallel: false,
    criticalPath: true,
    status: 'in-progress'
  },
  {
    id: 'rjsc-reg',
    name: 'Company Incorporation',
    department: 'RJSC',
    duration: 7,
    avgProcessingTime: 5.2,
    fastestTime: 3,
    dependencies: ['rjsc-name'],
    canRunParallel: false,
    criticalPath: true,
    status: 'pending'
  },
  {
    id: 'tin',
    name: 'TIN Registration',
    department: 'NBR',
    duration: 2,
    avgProcessingTime: 1.5,
    fastestTime: 1,
    dependencies: ['rjsc-reg'],
    canRunParallel: true,
    criticalPath: false,
    status: 'pending'
  },
  {
    id: 'vat',
    name: 'VAT Registration',
    department: 'NBR',
    duration: 3,
    avgProcessingTime: 2.2,
    fastestTime: 1,
    dependencies: ['rjsc-reg'],
    canRunParallel: true,
    criticalPath: false,
    status: 'pending'
  },
  {
    id: 'bank',
    name: 'Bank Account Opening',
    department: 'Bangladesh Bank',
    duration: 5,
    avgProcessingTime: 4.1,
    fastestTime: 2,
    dependencies: ['rjsc-reg'],
    canRunParallel: true,
    criticalPath: false,
    status: 'pending'
  },
  {
    id: 'trade-license',
    name: 'Trade License',
    department: 'City Corporation',
    duration: 7,
    avgProcessingTime: 5.8,
    fastestTime: 3,
    dependencies: ['rjsc-reg'],
    canRunParallel: true,
    criticalPath: true,
    status: 'pending'
  },
  {
    id: 'fire',
    name: 'Fire License',
    department: 'Fire Service',
    duration: 10,
    avgProcessingTime: 8.5,
    fastestTime: 5,
    dependencies: ['trade-license'],
    canRunParallel: true,
    criticalPath: false,
    status: 'pending'
  },
  {
    id: 'env',
    name: 'Environmental Clearance',
    department: 'DoE',
    duration: 30,
    avgProcessingTime: 28.3,
    fastestTime: 21,
    dependencies: ['trade-license'],
    canRunParallel: true,
    criticalPath: true,
    status: 'pending'
  },
  {
    id: 'factory-license',
    name: 'Factory License',
    department: 'DIFE',
    duration: 14,
    avgProcessingTime: 12.7,
    fastestTime: 10,
    dependencies: ['env', 'fire'],
    canRunParallel: false,
    criticalPath: true,
    status: 'pending'
  },
  {
    id: 'work-permit',
    name: 'Work Permits (Foreign Staff)',
    department: 'BIDA',
    duration: 10,
    avgProcessingTime: 8.9,
    fastestTime: 5,
    dependencies: ['rjsc-reg'],
    canRunParallel: true,
    criticalPath: false,
    status: 'pending'
  },
  {
    id: 'customs',
    name: 'Customs Bonded Warehouse',
    department: 'NBR Customs',
    duration: 15,
    avgProcessingTime: 13.2,
    fastestTime: 10,
    dependencies: ['factory-license'],
    canRunParallel: true,
    criticalPath: false,
    status: 'pending'
  }
];

export function KYATimelineENHANCED() {
  const [viewMode, setViewMode] = useState<'gantt' | 'timeline' | 'stats'>('gantt');
  const [showParallelOnly, setShowParallelOnly] = useState(false);
  const [showCriticalPath, setShowCriticalPath] = useState(false);

  // Calculate timeline positions
  const timelineData = useMemo(() => {
    const steps = [...ALL_STEPS];
    let currentDay = 0;
    const processed = new Set<string>();
    const result: TimelineStep[] = [];

    while (processed.size < steps.length) {
      // Find steps that can start now (all dependencies met)
      const ready = steps.filter(step => 
        !processed.has(step.id) && 
        step.dependencies.every(dep => processed.has(dep))
      );

      if (ready.length === 0) break;

      // Group parallel steps
      const parallel = ready.filter(s => s.canRunParallel);
      const sequential = ready.filter(s => !s.canRunParallel);

      // Process sequential first (usually critical path)
      sequential.forEach(step => {
        const enriched = {
          ...step,
          startDay: currentDay,
          endDay: currentDay + step.duration
        };
        result.push(enriched);
        processed.add(step.id);
      });

      if (sequential.length > 0) {
        currentDay += Math.max(...sequential.map(s => s.duration));
      }

      // Process parallel steps
      if (parallel.length > 0) {
        const parallelStartDay = currentDay;
        parallel.forEach(step => {
          const enriched = {
            ...step,
            startDay: parallelStartDay,
            endDay: parallelStartDay + step.duration
          };
          result.push(enriched);
          processed.add(step.id);
        });
        currentDay = Math.max(...parallel.map(s => parallelStartDay + s.duration));
      }
    }

    return result;
  }, []);

  const totalDuration = Math.max(...timelineData.map(s => s.endDay || 0));
  const criticalPathSteps = timelineData.filter(s => s.criticalPath);
  const criticalPathDuration = Math.max(...criticalPathSteps.map(s => s.endDay || 0));
  const fastestPossible = timelineData
    .filter(s => s.criticalPath)
    .reduce((sum, s) => sum + s.fastestTime, 0);

  const avgProcessingTime = timelineData.reduce((sum, s) => sum + s.avgProcessingTime, 0);

  const displaySteps = showCriticalPath 
    ? timelineData.filter(s => s.criticalPath)
    : showParallelOnly
    ? timelineData.filter(s => s.canRunParallel)
    : timelineData;

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card className="p-6 bg-white/40 backdrop-blur-xl border-white/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-2xl font-semibold">Investment Setup Timeline</h2>
              <p className="text-sm text-gray-600">Gantt chart with parallel approvals & critical path</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('gantt')}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === 'gantt'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white/60 text-gray-700 hover:bg-white/80'
              }`}
            >
              Gantt Chart
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === 'timeline'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white/60 text-gray-700 hover:bg-white/80'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setViewMode('stats')}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === 'stats'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white/60 text-gray-700 hover:bg-white/80'
              }`}
            >
              Statistics
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setShowCriticalPath(!showCriticalPath)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              showCriticalPath
                ? 'bg-red-100 text-red-700 border-2 border-red-300'
                : 'bg-white/60 text-gray-700 hover:bg-white/80'
            }`}
          >
            <Target className="w-4 h-4 inline mr-1" />
            Critical Path Only
          </button>
          <button
            onClick={() => setShowParallelOnly(!showParallelOnly)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              showParallelOnly
                ? 'bg-green-100 text-green-700 border-2 border-green-300'
                : 'bg-white/60 text-gray-700 hover:bg-white/80'
            }`}
          >
            <GitBranch className="w-4 h-4 inline mr-1" />
            Parallel Approvals Only
          </button>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <Clock className="w-8 h-8 mb-2 opacity-90" />
          <div className="text-sm opacity-90">Total Duration</div>
          <div className="text-3xl font-bold">{totalDuration} days</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-red-500 to-red-600 text-white">
          <Target className="w-8 h-8 mb-2 opacity-90" />
          <div className="text-sm opacity-90">Critical Path</div>
          <div className="text-3xl font-bold">{criticalPathDuration} days</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <FastForward className="w-8 h-8 mb-2 opacity-90" />
          <div className="text-sm opacity-90">Fastest Possible</div>
          <div className="text-3xl font-bold">{fastestPossible} days</div>
          <div className="text-xs opacity-80">With fast-track</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <BarChart3 className="w-8 h-8 mb-2 opacity-90" />
          <div className="text-sm opacity-90">Historical Avg</div>
          <div className="text-3xl font-bold">{Math.round(avgProcessingTime)} days</div>
        </Card>
      </div>

      {/* Gantt Chart View */}
      {viewMode === 'gantt' && (
        <Card className="p-6 bg-white/40 backdrop-blur-xl border-white/20 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Gantt Chart View</h3>
          
          {/* Timeline Header */}
          <div className="mb-4">
            <div className="flex gap-2 text-xs text-gray-600 ml-64">
              {Array.from({ length: Math.ceil(totalDuration / 10) + 1 }, (_, i) => (
                <div key={i} className="w-24 text-center">
                  Day {i * 10}
                </div>
              ))}
            </div>
          </div>

          {/* Gantt Bars */}
          <div className="space-y-2">
            {displaySteps.map((step) => (
              <div key={step.id} className="flex items-center gap-3">
                {/* Step Name */}
                <div className="w-60 text-sm font-medium truncate">
                  {step.name}
                  {step.criticalPath && (
                    <span className="ml-2 text-red-600 text-xs">⚡ Critical</span>
                  )}
                  {step.canRunParallel && (
                    <span className="ml-2 text-green-600 text-xs">∥ Parallel</span>
                  )}
                </div>

                {/* Gantt Bar */}
                <div className="flex-1 relative h-8 bg-gray-100 rounded-lg">
                  <div
                    className={`absolute h-full rounded-lg flex items-center px-2 text-xs text-white font-medium ${
                      step.criticalPath
                        ? 'bg-gradient-to-r from-red-500 to-red-600'
                        : step.canRunParallel
                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600'
                    }`}
                    style={{
                      left: `${((step.startDay || 0) / totalDuration) * 100}%`,
                      width: `${(step.duration / totalDuration) * 100}%`
                    }}
                  >
                    <span className="truncate">{step.duration}d</span>
                  </div>
                </div>

                {/* Department */}
                <div className="w-32 text-xs text-gray-600 truncate">
                  {step.department}
                </div>

                {/* Status */}
                <div className="w-24">
                  {step.status === 'completed' && (
                    <span className="text-green-600 text-xs flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Done
                    </span>
                  )}
                  {step.status === 'in-progress' && (
                    <span className="text-blue-600 text-xs flex items-center gap-1">
                      <Activity className="w-3 h-3" /> Active
                    </span>
                  )}
                  {step.status === 'pending' && (
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <Card className="p-6 bg-white/40 backdrop-blur-xl border-white/20">
          <h3 className="text-lg font-semibold mb-4">Linear Timeline View</h3>
          <div className="space-y-4">
            {displaySteps.map((step, idx) => (
              <div key={step.id} className="flex gap-4">
                {/* Day Marker */}
                <div className="w-16 text-right">
                  <div className="text-sm font-medium text-gray-900">Day {step.startDay}</div>
                  <div className="text-xs text-gray-500">to {step.endDay}</div>
                </div>

                {/* Timeline Connector */}
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${
                    step.status === 'completed' ? 'bg-green-500' :
                    step.status === 'in-progress' ? 'bg-blue-500' :
                    'bg-gray-300'
                  }`} />
                  {idx < displaySteps.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-300 flex-1" />
                  )}
                </div>

                {/* Step Card */}
                <div className="flex-1 pb-4">
                  <div className={`p-4 rounded-lg border-l-4 ${
                    step.criticalPath ? 'border-red-500 bg-red-50' :
                    step.canRunParallel ? 'border-green-500 bg-green-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{step.name}</h4>
                        <p className="text-sm text-gray-600">{step.department}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{step.duration} days</div>
                        <div className="text-xs text-gray-500">Avg: {step.avgProcessingTime}d</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Statistics View */}
      {viewMode === 'stats' && (
        <Card className="p-6 bg-white/40 backdrop-blur-xl border-white/20">
          <h3 className="text-lg font-semibold mb-4">Processing Time Statistics</h3>
          <div className="space-y-3">
            {timelineData.map((step) => (
              <div key={step.id} className="p-4 bg-white/60 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{step.name}</h4>
                  <span className="text-sm text-gray-600">{step.department}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Standard</div>
                    <div className="font-semibold text-blue-600">{step.duration} days</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Historical Avg</div>
                    <div className="font-semibold text-orange-600">{step.avgProcessingTime} days</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Fastest</div>
                    <div className="font-semibold text-green-600">{step.fastestTime} days</div>
                  </div>
                </div>

                {/* Performance Bar */}
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${(step.fastestTime / step.duration) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Legend */}
      <Card className="p-4 bg-white/40 backdrop-blur-xl border-white/20">
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded" />
            <span>Critical Path (Cannot be delayed)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span>Parallel Processing (Can run simultaneously)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded" />
            <span>Sequential (Requires previous completion)</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
