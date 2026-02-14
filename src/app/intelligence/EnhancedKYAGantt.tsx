/**
 * 📅 ENHANCED KYA GANTT PANEL — World-Class Timeline with Intelligence
 * 
 * Mounted in: Journey tab
 * Powered by: kyaTimelineEngine
 * Shows: Smart Gantt, parallel paths, critical path, "Fastest completion: 41 days"
 * 
 * ✨ NEW ENHANCEMENTS:
 * - Interactive scenario controls (zone selection, expedite approvals)
 * - Visual dependency arrows (curved SVG lines)
 * - Before/After comparison (side-by-side BIDA vs BEZA)
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Circle,
  ArrowRight,
  Calendar,
  TrendingUp,
  Zap,
  Target,
  Timer,
  GitBranch,
  FastForward,
  MapPin,
  RefreshCw,
  BarChart3,
  ChevronDown
} from 'lucide-react';
import { 
  buildKyaTimeline, 
  getTimelineSummary, 
  getNextTasks,
  simulateProgress,
  type ApprovalTask 
} from '@/app/engines/kyaTimelineEngine';
import { useState, useMemo } from 'react';

interface EnhancedKYAGanttProps {
  compact?: boolean;
  currentDay?: number; // For demo/simulation
}

type ZoneType = 'BIDA' | 'BEZA' | 'BEPZA';

// Zone-specific timeline adjustments
const ZONE_MODIFIERS: Record<ZoneType, { name: string; speedup: number; removedTasks: string[]; description: string }> = {
  'BIDA': {
    name: 'BIDA (Standard Process)',
    speedup: 1.0,
    removedTasks: [],
    description: 'Full regulatory process with all approvals'
  },
  'BEZA': {
    name: 'BEZA Economic Zone',
    speedup: 0.75, // 25% faster
    removedTasks: ['trade-license'], // BEZA provides land, skips some steps
    description: 'Streamlined process in economic zones with OSS'
  },
  'BEPZA': {
    name: 'BEPZA Export Processing Zone',
    speedup: 0.6, // 40% faster
    removedTasks: ['trade-license', 'import-registration'],
    description: 'Fastest process for export-oriented industries'
  }
};

export function EnhancedKYAGantt({ compact = false, currentDay = 8 }: EnhancedKYAGanttProps) {
  // 🎮 SCENARIO STATE
  const [selectedZone, setSelectedZone] = useState<ZoneType>('BIDA');
  const [expeditedTasks, setExpeditedTasks] = useState<Set<string>>(new Set());
  const [showComparison, setShowComparison] = useState(false);
  
  // Build timelines with scenario modifications
  const buildScenarioTimeline = (zone: ZoneType, expedited: Set<string>) => {
    const baseTimeline = buildKyaTimeline();
    const modifier = ZONE_MODIFIERS[zone];
    
    // Apply zone-specific modifications
    const modifiedTasks = baseTimeline.tasks
      .filter(task => !modifier.removedTasks.includes(task.id))
      .map(task => {
        let newDuration = task.durationDays * modifier.speedup;
        
        // Apply expedite (additional 30% reduction)
        if (expedited.has(task.id)) {
          newDuration = newDuration * 0.7;
        }
        
        return {
          ...task,
          durationDays: Math.ceil(newDuration)
        };
      });
    
    // Rebuild timeline with modified tasks
    return buildKyaTimeline(modifiedTasks);
  };
  
  const baseTimeline = useMemo(() => buildScenarioTimeline(selectedZone, expeditedTasks), [selectedZone, expeditedTasks]);
  const timeline = useMemo(() => simulateProgress(baseTimeline, currentDay), [baseTimeline, currentDay]);
  const summary = useMemo(() => getTimelineSummary(timeline), [timeline]);
  const nextTasks = useMemo(() => getNextTasks(timeline), [timeline]);
  
  // Comparison timeline (always BIDA for baseline)
  const comparisonTimeline = useMemo(() => {
    if (!showComparison || selectedZone === 'BIDA') return null;
    return buildScenarioTimeline('BIDA', new Set());
  }, [showComparison, selectedZone]);
  
  const maxDay = timeline.fastestCompletion;
  
  // Calculate time savings
  const timeSavings = comparisonTimeline 
    ? comparisonTimeline.fastestCompletion - timeline.fastestCompletion 
    : 0;
  
  // Handle expedite toggle
  const toggleExpedite = (taskId: string) => {
    const newExpedited = new Set(expeditedTasks);
    if (newExpedited.has(taskId)) {
      newExpedited.delete(taskId);
    } else {
      newExpedited.add(taskId);
    }
    setExpeditedTasks(newExpedited);
  };
  
  // Status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 border-green-600';
      case 'in-progress': return 'bg-blue-500 border-blue-600';
      case 'pending': return 'bg-gray-300 border-gray-400';
      case 'blocked': return 'bg-red-500 border-red-600';
      default: return 'bg-gray-300 border-gray-400';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-600 animate-pulse" />;
      case 'pending': return <Circle className="w-4 h-4 text-gray-400" />;
      case 'blocked': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };
  
  // Generate dependency arrows (SVG paths)
  const generateDependencyArrows = (tasks: ApprovalTask[], ganttMaxDay: number) => {
    const arrows: JSX.Element[] = [];
    const taskHeight = 56; // Height of each gantt row (h-12 + gap)
    const taskNameWidth = 256; // w-64 in pixels
    
    tasks.forEach((task, taskIndex) => {
      task.dependencies.forEach(depId => {
        const depTaskIndex = tasks.findIndex(t => t.id === depId);
        if (depTaskIndex === -1) return;
        
        const depTask = tasks[depTaskIndex];
        
        // Calculate positions
        const depEndX = taskNameWidth + ((depTask.endDay! / ganttMaxDay) * 100); // percentage
        const depY = depTaskIndex * taskHeight + taskHeight / 2;
        const taskStartX = taskNameWidth + ((task.startDay! / ganttMaxDay) * 100);
        const taskY = taskIndex * taskHeight + taskHeight / 2;
        
        // Create curved path
        const midY = (depY + taskY) / 2;
        
        arrows.push(
          <path
            key={`${depId}-${task.id}`}
            d={`M ${depEndX}% ${depY} Q ${depEndX}% ${midY}, ${(depEndX + taskStartX) / 2}% ${midY} T ${taskStartX}% ${taskY}`}
            fill="none"
            stroke="#9333ea"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.4"
            markerEnd="url(#arrowhead)"
            className="dependency-arrow"
          />
        );
      });
    });
    
    return arrows;
  };

  return (
    <div className="space-y-6">
      {/* 🎮 SCENARIO CONTROL PANEL */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-gray-900">Scenario Simulator</h3>
          </div>
          <button
            onClick={() => {
              setSelectedZone('BIDA');
              setExpeditedTasks(new Set());
              setShowComparison(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Zone Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Investment Zone
            </label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value as ZoneType)}
              className="w-full px-3 py-2 bg-white border-2 border-indigo-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {Object.entries(ZONE_MODIFIERS).map(([zone, info]) => (
                <option key={zone} value={zone}>
                  {info.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-600">
              {ZONE_MODIFIERS[selectedZone].description}
            </p>
          </div>
          
          {/* Expedite Options */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FastForward className="w-4 h-4 inline mr-1" />
              Expedite Approvals
            </label>
            <div className="relative">
              <select
                onChange={(e) => {
                  if (e.target.value) toggleExpedite(e.target.value);
                  e.target.value = ''; // Reset
                }}
                className="w-full px-3 py-2 bg-white border-2 border-indigo-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
              >
                <option value="">Select to expedite (-30%)...</option>
                {timeline.tasks
                  .filter(t => t.status !== 'completed' && !expeditedTasks.has(t.id))
                  .map(task => (
                    <option key={task.id} value={task.id}>
                      {task.name}
                    </option>
                  ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {expeditedTasks.size > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {Array.from(expeditedTasks).map(taskId => {
                  const task = timeline.tasks.find(t => t.id === taskId);
                  return task ? (
                    <span
                      key={taskId}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full cursor-pointer hover:bg-indigo-200"
                      onClick={() => toggleExpedite(taskId)}
                    >
                      {task.name.slice(0, 15)}...
                      <span className="text-indigo-600">×</span>
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
          
          {/* Comparison Toggle */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              Comparison View
            </label>
            <button
              onClick={() => setShowComparison(!showComparison)}
              disabled={selectedZone === 'BIDA'}
              className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                showComparison
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {showComparison ? '✓ Showing Before/After' : 'Show Before/After'}
            </button>
            {selectedZone === 'BIDA' && (
              <p className="mt-1 text-xs text-gray-500">
                Select BEZA or BEPZA to compare
              </p>
            )}
            {showComparison && timeSavings > 0 && (
              <p className="mt-1 text-xs font-semibold text-green-600">
                ⚡ Saves {timeSavings} days!
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* 🎯 KEY METRICS DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Fastest Completion</p>
              <p className="text-3xl font-bold">{timeline.fastestCompletion} days</p>
              {timeSavings > 0 && (
                <p className="text-xs opacity-90">
                  <span className="line-through">{comparisonTimeline!.fastestCompletion}d</span> -{timeSavings}d
                </p>
              )}
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Completion Rate</p>
              <p className="text-3xl font-bold">{summary.completionPercentage.toFixed(0)}%</p>
              <p className="text-xs opacity-80">{summary.completed}/{summary.totalTasks} tasks</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center gap-3">
            <Timer className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Days Remaining</p>
              <p className="text-3xl font-bold">{summary.daysRemaining}</p>
              <p className="text-xs opacity-80">Est: {timeline.completionDate.toLocaleDateString()}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center gap-3">
            <GitBranch className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Parallel Tasks</p>
              <p className="text-3xl font-bold">{timeline.parallelGroups.length}</p>
              <p className="text-xs opacity-80">groups running together</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* 🔥 NEXT ACTIONS */}
      <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-orange-600" />
          <h3 className="text-xl font-bold text-gray-900">Next Actions Required</h3>
        </div>
        
        <div className="space-y-3">
          {nextTasks.map((task, idx) => (
            <div
              key={task.id}
              className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm"
            >
              <div className="flex-shrink-0">
                {getStatusIcon(task.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">{task.name}</p>
                  {task.isCriticalPath && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">
                      CRITICAL PATH
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{task.authority} • {task.durationDays} days</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">Day {task.startDay}-{task.endDay}</p>
                <p className="text-xs text-gray-500">{task.priority} priority</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 📊 GANTT CHART */}
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Smart Gantt Timeline</h3>
            <p className="text-sm text-gray-600 mt-1">
              Parallel processing enabled • Critical path highlighted • Dependency arrows shown
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-300 rounded"></div>
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowRight className="w-3 h-3 text-purple-600" />
              <span>Dependencies</span>
            </div>
          </div>
        </div>
        
        {/* Timeline Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="w-64 font-semibold text-sm text-gray-700">Approval Task</div>
          <div className="flex-1 flex justify-between text-xs text-gray-500 px-2">
            {Array.from({ length: Math.ceil(maxDay / 10) + 1 }, (_, i) => (
              <span key={i}>Day {i * 10}</span>
            ))}
          </div>
        </div>
        
        {/* Gantt Container with Arrows */}
        <div className="relative">
          {/* Dependency Arrows Layer */}
          <svg 
            className="absolute top-0 left-0 w-full pointer-events-none" 
            style={{ height: `${timeline.tasks.length * 56}px` }}
          >
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9333ea" />
              </marker>
            </defs>
            {generateDependencyArrows(timeline.tasks, maxDay)}
          </svg>
          
          {/* Gantt Rows */}
          <div className="space-y-2 relative">
            {timeline.tasks.map((task) => {
              const widthPercent = ((task.endDay! - task.startDay!) / maxDay) * 100;
              const leftPercent = (task.startDay! / maxDay) * 100;
              
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 group"
                >
                  {/* Task Name */}
                  <div className="w-64">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{task.name}</p>
                        <p className="text-xs text-gray-500">{task.durationDays}d • {task.authority.slice(0, 20)}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Gantt Bar */}
                  <div className="flex-1 relative h-12 bg-gray-50 rounded border border-gray-200">
                    {/* Current day indicator */}
                    {currentDay >= task.startDay! && currentDay <= task.endDay! && (
                      <div
                        className="absolute top-0 bottom-0 w-px bg-blue-500 z-10"
                        style={{ left: `${((currentDay - task.startDay!) / (task.endDay! - task.startDay!)) * widthPercent + leftPercent}%` }}
                      >
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    )}
                    
                    {/* Task bar */}
                    <div
                      className={`absolute top-1 bottom-1 rounded transition-all group-hover:scale-105 ${getStatusColor(task.status)} ${
                        task.isCriticalPath ? 'ring-2 ring-red-500 ring-offset-1' : ''
                      }`}
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`
                      }}
                    >
                      <div className="h-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-white truncate px-2">
                          {task.startDay}-{task.endDay}d
                        </span>
                      </div>
                    </div>
                    
                    {/* Expedited indicator */}
                    {expeditedTasks.has(task.id) && (
                      <div
                        className="absolute -top-2 -left-2 bg-indigo-600 text-white rounded-full p-1"
                      >
                        <FastForward className="w-3 h-3" />
                      </div>
                    )}
                    
                    {/* Parallel indicator */}
                    {task.canRunInParallel && (
                      <div
                        className="absolute -top-1 -right-1"
                        style={{ left: `${leftPercent + widthPercent}%` }}
                      >
                        <GitBranch className="w-3 h-3 text-purple-600" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* 🎯 CRITICAL PATH EXPLANATION */}
      <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border-2 border-red-200">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-6 h-6 text-red-600" />
          <h3 className="text-lg font-bold text-gray-900">Critical Path Analysis</h3>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          The critical path determines your fastest possible completion time. Any delay in these tasks will extend your overall timeline.
        </p>
        <div className="flex flex-wrap gap-2">
          {timeline.criticalPath.map((taskId) => {
            const task = timeline.tasks.find(t => t.id === taskId);
            return task ? (
              <span
                key={taskId}
                className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full"
              >
                {task.name}
              </span>
            ) : null;
          })}
        </div>
      </div>
      
      {/* 🔄 PARALLEL PROCESSING GROUPS */}
      {timeline.parallelGroups.length > 0 && (
        <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">
              Parallel Processing ({timeline.parallelGroups.length} groups)
            </h3>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            These tasks can run simultaneously, reducing your overall timeline significantly.
          </p>
          <div className="space-y-3">
            {timeline.parallelGroups.map((group, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg">
                <p className="text-xs font-semibold text-purple-700 mb-2">GROUP {idx + 1}</p>
                <div className="flex flex-wrap gap-2">
                  {group.map((taskId) => {
                    const task = timeline.tasks.find(t => t.id === taskId);
                    return task ? (
                      <span
                        key={taskId}
                        className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded"
                      >
                        {task.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 📊 BEFORE/AFTER COMPARISON VIEW */}
      <AnimatePresence>
        {showComparison && comparisonTimeline && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Before/After Comparison</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">
                    -{timeSavings} days
                  </div>
                  <div className="text-xs text-gray-600">
                    {((timeSavings / comparisonTimeline.fastestCompletion) * 100).toFixed(1)}% faster
                  </div>
                </div>
              </div>
              
              {/* Side-by-side Comparison */}
              <div className="grid grid-cols-2 gap-6">
                {/* BEFORE (BIDA) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-700">❌ Before (BIDA Standard)</h4>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded">
                      {comparisonTimeline.fastestCompletion} days
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    {comparisonTimeline.tasks.map((task) => {
                      const widthPercent = ((task.endDay! - task.startDay!) / comparisonTimeline.fastestCompletion) * 100;
                      const leftPercent = (task.startDay! / comparisonTimeline.fastestCompletion) * 100;
                      
                      return (
                        <div key={task.id} className="flex items-center gap-2">
                          <div className="w-32 text-xs text-gray-600 truncate">{task.name}</div>
                          <div className="flex-1 relative h-6 bg-gray-100 rounded border border-gray-200">
                            <div
                              className="absolute top-0.5 bottom-0.5 rounded bg-gray-400"
                              style={{
                                left: `${leftPercent}%`,
                                width: `${widthPercent}%`
                              }}
                            >
                              <span className="text-[10px] text-white px-1">
                                {task.durationDays}d
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="pt-3 border-t border-gray-300">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Tasks:</span>
                      <span className="font-semibold">{comparisonTimeline.tasks.length}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Parallel Groups:</span>
                      <span className="font-semibold">{comparisonTimeline.parallelGroups.length}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Completion:</span>
                      <span className="font-semibold">{comparisonTimeline.completionDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* AFTER (Selected Zone) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-green-700">
                      ✅ After ({ZONE_MODIFIERS[selectedZone].name})
                    </h4>
                    <span className="px-2 py-1 bg-green-200 text-green-800 text-xs font-bold rounded">
                      {timeline.fastestCompletion} days
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    {timeline.tasks.map((task) => {
                      const widthPercent = ((task.endDay! - task.startDay!) / timeline.fastestCompletion) * 100;
                      const leftPercent = (task.startDay! / timeline.fastestCompletion) * 100;
                      const isExpedited = expeditedTasks.has(task.id);
                      
                      return (
                        <div key={task.id} className="flex items-center gap-2">
                          <div className="w-32 text-xs text-gray-600 truncate flex items-center gap-1">
                            {task.name}
                            {isExpedited && <FastForward className="w-3 h-3 text-indigo-600" />}
                          </div>
                          <div className="flex-1 relative h-6 bg-green-50 rounded border border-green-200">
                            <div
                              className={`absolute top-0.5 bottom-0.5 rounded ${
                                isExpedited ? 'bg-gradient-to-r from-indigo-500 to-green-500' : 'bg-green-500'
                              }`}
                              style={{
                                left: `${leftPercent}%`,
                                width: `${widthPercent}%`
                              }}
                            >
                              <span className="text-[10px] text-white px-1">
                                {task.durationDays}d
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="pt-3 border-t border-green-300">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Tasks:</span>
                      <span className="font-semibold text-green-700">
                        {timeline.tasks.length}
                        {comparisonTimeline.tasks.length > timeline.tasks.length && (
                          <span className="text-xs ml-1">
                            (-{comparisonTimeline.tasks.length - timeline.tasks.length} removed)
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Parallel Groups:</span>
                      <span className="font-semibold text-green-700">{timeline.parallelGroups.length}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Completion:</span>
                      <span className="font-semibold text-green-700">{timeline.completionDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Key Improvements */}
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h5 className="font-bold text-sm text-gray-900 mb-3">🎯 Key Improvements</h5>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      -{timeSavings}
                    </div>
                    <div className="text-xs text-gray-600">Days Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {ZONE_MODIFIERS[selectedZone].removedTasks.length}
                    </div>
                    <div className="text-xs text-gray-600">Steps Removed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {expeditedTasks.size}
                    </div>
                    <div className="text-xs text-gray-600">Expedited Tasks</div>
                  </div>
                </div>
              </div>
              
              {/* Recommendations */}
              {timeSavings > 10 && (
                <div className="mt-4 p-4 bg-green-100 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 text-sm">💡 Strong Recommendation</p>
                      <p className="text-sm text-green-800 mt-1">
                        By choosing {ZONE_MODIFIERS[selectedZone].name}, you can save {timeSavings} days 
                        ({((timeSavings / comparisonTimeline.fastestCompletion) * 100).toFixed(0)}% faster). 
                        This could accelerate your market entry significantly!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}