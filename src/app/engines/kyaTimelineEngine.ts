/**
 * ⏱️ KYA TIMELINE ENGINE — Smart Gantt with Dependencies
 * 
 * Features:
 * - Each approval: duration, dependencies
 * - Calculates parallel path
 * - Calculates critical path
 * - Predicts completion date
 * - "Fastest possible completion: 41 days"
 * 
 * Mounted in: Journey tab (KYATimelineVisual component)
 */

export interface ApprovalTask {
  id: string;
  name: string;
  authority: string;
  durationDays: number;
  dependencies: string[]; // IDs of tasks that must complete first
  canRunInParallel: boolean;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  startDay?: number; // Calculated
  endDay?: number; // Calculated
  isCriticalPath?: boolean; // Calculated
}

export interface TimelineResult {
  tasks: ApprovalTask[];
  totalDuration: number;
  fastestCompletion: number; // With parallel processing
  criticalPath: string[];
  parallelGroups: string[][]; // Groups of tasks that can run together
  completionDate: Date;
  milestones: {
    day: number;
    name: string;
    tasksCompleted: string[];
  }[];
}

// KYA Process Tasks (Bangladesh Investment Approval Flow)
const KYA_TASKS: ApprovalTask[] = [
  {
    id: 'bida-registration',
    name: 'BIDA Registration',
    authority: 'Bangladesh Investment Development Authority',
    durationDays: 1,
    dependencies: [],
    canRunInParallel: false,
    priority: 'critical',
    status: 'completed'
  },
  {
    id: 'sector-clearance',
    name: 'Sector-Specific Clearance',
    authority: 'Ministry of Industry',
    durationDays: 7,
    dependencies: ['bida-registration'],
    canRunInParallel: false,
    priority: 'critical',
    status: 'in-progress'
  },
  {
    id: 'environmental-clearance',
    name: 'Environmental Impact Assessment',
    authority: 'Department of Environment',
    durationDays: 14,
    dependencies: ['bida-registration'],
    canRunInParallel: true,
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'land-allocation',
    name: 'Land Allocation Approval',
    authority: 'BEZA/BEPZA',
    durationDays: 10,
    dependencies: ['bida-registration'],
    canRunInParallel: true,
    priority: 'high',
    status: 'pending'
  },
  {
    id: 'fire-safety',
    name: 'Fire Safety Clearance',
    authority: 'Fire Service & Civil Defense',
    durationDays: 5,
    dependencies: ['land-allocation'],
    canRunInParallel: true,
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 'utility-connection',
    name: 'Utility Connection Approval',
    authority: 'DESA/WASA/Titas Gas',
    durationDays: 7,
    dependencies: ['land-allocation'],
    canRunInParallel: true,
    priority: 'high',
    status: 'pending'
  },
  {
    id: 'construction-permit',
    name: 'Construction Permit',
    authority: 'RAJUK/Local Authority',
    durationDays: 8,
    dependencies: ['environmental-clearance', 'fire-safety'],
    canRunInParallel: false,
    priority: 'critical',
    status: 'pending'
  },
  {
    id: 'trade-license',
    name: 'Trade License',
    authority: 'City Corporation',
    durationDays: 3,
    dependencies: ['sector-clearance'],
    canRunInParallel: true,
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 'import-registration',
    name: 'Import Registration Certificate',
    authority: 'CCI&E',
    durationDays: 5,
    dependencies: ['trade-license'],
    canRunInParallel: true,
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 'customs-bond',
    name: 'Customs Bond License',
    authority: 'Customs',
    durationDays: 6,
    dependencies: ['import-registration'],
    canRunInParallel: true,
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 'factory-license',
    name: 'Factory License & Inspection',
    authority: 'Department of Inspection for Factories',
    durationDays: 10,
    dependencies: ['construction-permit', 'utility-connection'],
    canRunInParallel: false,
    priority: 'critical',
    status: 'pending'
  },
  {
    id: 'final-clearance',
    name: 'Final Investment Clearance',
    authority: 'BIDA',
    durationDays: 2,
    dependencies: ['factory-license', 'customs-bond'],
    canRunInParallel: false,
    priority: 'critical',
    status: 'pending'
  }
];

/**
 * Calculate timeline with parallel processing and critical path
 */
export function buildKyaTimeline(customTasks?: ApprovalTask[]): TimelineResult {
  const tasks = customTasks || JSON.parse(JSON.stringify(KYA_TASKS)); // Deep clone
  
  // Track completion times
  const completionTimes: Record<string, number> = {};
  
  // Calculate start and end days for each task
  tasks.forEach(task => {
    if (task.dependencies.length === 0) {
      // No dependencies - can start immediately
      task.startDay = 0;
    } else {
      // Start after all dependencies complete
      const depCompletionTimes = task.dependencies.map(depId => completionTimes[depId] || 0);
      task.startDay = Math.max(...depCompletionTimes);
    }
    
    task.endDay = task.startDay + task.durationDays;
    completionTimes[task.id] = task.endDay;
  });
  
  // Find critical path (longest path through network)
  const criticalPath: string[] = [];
  let currentTaskId = tasks.reduce((longest, task) => 
    (task.endDay || 0) > (longest.endDay || 0) ? task : longest
  ).id;
  
  while (currentTaskId) {
    criticalPath.unshift(currentTaskId);
    const currentTask = tasks.find(t => t.id === currentTaskId);
    if (!currentTask || currentTask.dependencies.length === 0) break;
    
    // Find dependency with latest completion (on critical path)
    currentTaskId = currentTask.dependencies.reduce((latest, depId) => {
      const latestTime = completionTimes[latest] || 0;
      const depTime = completionTimes[depId] || 0;
      return depTime > latestTime ? depId : latest;
    }, currentTask.dependencies[0]);
  }
  
  // Mark critical path tasks
  tasks.forEach(task => {
    task.isCriticalPath = criticalPath.includes(task.id);
  });
  
  // Group parallel tasks
  const parallelGroups: string[][] = [];
  const processed = new Set<string>();
  
  tasks.forEach(task => {
    if (processed.has(task.id)) return;
    
    if (task.canRunInParallel && task.startDay !== undefined) {
      // Find all tasks that can run at the same time
      const group = tasks
        .filter(t => 
          t.startDay === task.startDay && 
          t.canRunInParallel && 
          !processed.has(t.id)
        )
        .map(t => {
          processed.add(t.id);
          return t.id;
        });
      
      if (group.length > 1) {
        parallelGroups.push(group);
      }
    }
  });
  
  // Calculate milestones
  const milestones = [];
  const sortedTasks = [...tasks].sort((a, b) => (a.endDay || 0) - (b.endDay || 0));
  
  let currentDay = 0;
  let tasksAtMilestone: string[] = [];
  
  sortedTasks.forEach(task => {
    if ((task.endDay || 0) > currentDay) {
      if (tasksAtMilestone.length > 0) {
        milestones.push({
          day: currentDay,
          name: `${tasksAtMilestone.length} approvals completed`,
          tasksCompleted: [...tasksAtMilestone]
        });
      }
      currentDay = task.endDay || 0;
      tasksAtMilestone = [task.name];
    } else {
      tasksAtMilestone.push(task.name);
    }
  });
  
  // Final milestone
  if (tasksAtMilestone.length > 0) {
    milestones.push({
      day: currentDay,
      name: 'All approvals complete',
      tasksCompleted: tasksAtMilestone
    });
  }
  
  // Calculate total and fastest completion
  const totalDuration = Math.max(...tasks.map(t => t.endDay || 0));
  const fastestCompletion = totalDuration; // Already optimized with parallel
  
  // Completion date
  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + fastestCompletion);
  
  return {
    tasks,
    totalDuration,
    fastestCompletion,
    criticalPath,
    parallelGroups,
    completionDate,
    milestones
  };
}

/**
 * Get summary statistics
 */
export function getTimelineSummary(timeline: TimelineResult) {
  const completed = timeline.tasks.filter(t => t.status === 'completed').length;
  const inProgress = timeline.tasks.filter(t => t.status === 'in-progress').length;
  const pending = timeline.tasks.filter(t => t.status === 'pending').length;
  const blocked = timeline.tasks.filter(t => t.status === 'blocked').length;
  
  const completionPercentage = (completed / timeline.tasks.length) * 100;
  
  return {
    totalTasks: timeline.tasks.length,
    completed,
    inProgress,
    pending,
    blocked,
    completionPercentage,
    daysRemaining: timeline.fastestCompletion - (timeline.tasks.find(t => t.status === 'in-progress')?.startDay || 0),
    parallelTaskGroups: timeline.parallelGroups.length
  };
}

/**
 * Simulate progress (for demo)
 */
export function simulateProgress(timeline: TimelineResult, currentDay: number): TimelineResult {
  const updatedTimeline = { ...timeline };
  
  updatedTimeline.tasks = timeline.tasks.map(task => {
    const updatedTask = { ...task };
    
    if ((task.endDay || 0) < currentDay) {
      updatedTask.status = 'completed';
    } else if ((task.startDay || 0) <= currentDay && (task.endDay || 0) >= currentDay) {
      updatedTask.status = 'in-progress';
    } else if ((task.startDay || 0) > currentDay) {
      // Check if dependencies are met
      const depsCompleted = task.dependencies.every(depId => {
        const dep = timeline.tasks.find(t => t.id === depId);
        return dep && (dep.endDay || 0) < currentDay;
      });
      updatedTask.status = depsCompleted ? 'pending' : 'blocked';
    }
    
    return updatedTask;
  });
  
  return updatedTimeline;
}

/**
 * Get next actionable tasks
 */
export function getNextTasks(timeline: TimelineResult): ApprovalTask[] {
  return timeline.tasks
    .filter(t => t.status === 'pending' || t.status === 'in-progress')
    .sort((a, b) => {
      // Critical path first
      if (a.isCriticalPath && !b.isCriticalPath) return -1;
      if (!a.isCriticalPath && b.isCriticalPath) return 1;
      
      // Then by start day
      return (a.startDay || 0) - (b.startDay || 0);
    })
    .slice(0, 5);
}
