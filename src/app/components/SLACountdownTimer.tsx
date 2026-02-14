import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, AlertCircle, CheckCircle2, TrendingDown } from 'lucide-react';
import { InstrumentCard } from './ui-primitives';

interface SLACountdownTimerProps {
  slaHours: number;
  hoursRemaining: number;
  status: 'completed' | 'in-progress' | 'pending' | 'delayed';
  stepName: string;
  compact?: boolean;
}

export function SLACountdownTimer({ 
  slaHours, 
  hoursRemaining, 
  status, 
  stepName,
  compact = false 
}: SLACountdownTimerProps) {
  const [displayTime, setDisplayTime] = useState(hoursRemaining);

  // Simulate live countdown
  useEffect(() => {
    if (status === 'in-progress' && hoursRemaining > 0) {
      const interval = setInterval(() => {
        setDisplayTime(prev => Math.max(0, prev - 0.1));
      }, 360000); // Update every 6 minutes (simulating hourly changes faster)

      return () => clearInterval(interval);
    }
  }, [status, hoursRemaining]);

  const formatTime = (hours: number) => {
    const days = Math.floor(hours / 24);
    const remainingHours = Math.floor(hours % 24);
    const minutes = Math.floor((hours % 1) * 60);

    if (days > 0) {
      return { value: days, unit: days === 1 ? 'day' : 'days', hours: remainingHours };
    } else if (remainingHours > 0) {
      return { value: remainingHours, unit: remainingHours === 1 ? 'hour' : 'hours', minutes };
    } else {
      return { value: minutes, unit: minutes === 1 ? 'minute' : 'minutes' };
    }
  };

  const getProgressPercentage = () => {
    if (status === 'completed') return 100;
    if (status === 'pending') return 0;
    return ((slaHours - displayTime) / slaHours) * 100;
  };

  const getStatusColor = () => {
    if (status === 'completed') return 'emerald';
    if (status === 'delayed') return 'red';
    
    const percentRemaining = (displayTime / slaHours) * 100;
    if (percentRemaining > 50) return 'blue';
    if (percentRemaining > 25) return 'orange';
    return 'red';
  };

  const time = formatTime(displayTime);
  const color = getStatusColor();
  const progress = getProgressPercentage();

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {status === 'completed' ? (
          <div className="flex items-center gap-1 text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-medium">Completed</span>
          </div>
        ) : status === 'delayed' ? (
          <div className="flex items-center gap-1 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Delayed</span>
          </div>
        ) : status === 'pending' ? (
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Pending</span>
          </div>
        ) : (
          <div className={`flex items-center gap-1 text-${color}-600`}>
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">
              {time.value} {time.unit} left
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-4 border-l-4 border-${color}-500`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{stepName}</h4>
          <p className="text-sm text-gray-600">SLA: {slaHours} hours</p>
        </div>
        
        {status === 'completed' ? (
          <div className={`w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center`}>
            <CheckCircle2 className={`w-6 h-6 text-emerald-600`} />
          </div>
        ) : status === 'delayed' ? (
          <div className={`w-12 h-12 rounded-full bg-red-100 flex items-center justify-center`}>
            <AlertCircle className={`w-6 h-6 text-red-600`} />
          </div>
        ) : (
          <div className={`w-12 h-12 rounded-full bg-${color}-100 flex items-center justify-center`}>
            <Clock className={`w-6 h-6 text-${color}-600`} />
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full bg-${color}-500`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Time Remaining */}
      <div className="flex items-center justify-between">
        {status === 'completed' ? (
          <span className="text-sm font-medium text-emerald-600">
            ✓ Completed on time
          </span>
        ) : status === 'delayed' ? (
          <span className="text-sm font-medium text-red-600 flex items-center gap-1">
            <TrendingDown className="w-4 h-4" />
            Overdue by {Math.abs(time.value)} {time.unit}
          </span>
        ) : status === 'pending' ? (
          <span className="text-sm text-gray-600">
            Waiting to start
          </span>
        ) : (
          <div>
            <span className={`text-2xl font-bold text-${color}-600`}>
              {time.value}
            </span>
            <span className={`text-sm text-${color}-600 ml-1`}>
              {time.unit} remaining
            </span>
            {time.hours !== undefined && (
              <span className="text-xs text-gray-500 ml-2">
                ({time.hours}h)
              </span>
            )}
          </div>
        )}
        
        <span className="text-xs text-gray-500">
          {progress.toFixed(0)}% complete
        </span>
      </div>

      {/* Warning if less than 25% time remaining */}
      {status === 'in-progress' && (displayTime / slaHours) < 0.25 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded flex items-start gap-2"
        >
          <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-orange-800">
            <span className="font-semibold">Urgent:</span> Less than 25% of SLA time remaining. Please prioritize this step.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

// Grid display of multiple SLA timers
interface SLATimerGridProps {
  steps?: Array<{
    id: string;
    name: string;
    slaHours: number;
    hoursRemaining: number;
    status: 'completed' | 'in-progress' | 'pending' | 'delayed';
  }>;
  applications?: any[]; // Legacy support
}

export function SLATimerGrid({ steps, applications }: SLATimerGridProps) {
  // Use steps if provided, otherwise create mock steps
  const actualSteps = steps || [
    {
      id: '1',
      name: 'Document Verification',
      slaHours: 48,
      hoursRemaining: 32,
      status: 'in-progress' as const
    },
    {
      id: '2',
      name: 'KYC Approval',
      slaHours: 72,
      hoursRemaining: 15,
      status: 'in-progress' as const
    },
    {
      id: '3',
      name: 'Initial Registration',
      slaHours: 24,
      hoursRemaining: 0,
      status: 'completed' as const
    },
    {
      id: '4',
      name: 'Tax Clearance',
      slaHours: 96,
      hoursRemaining: -12,
      status: 'delayed' as const
    },
    {
      id: '5',
      name: 'Final Approval',
      slaHours: 120,
      hoursRemaining: 120,
      status: 'pending' as const
    }
  ];

  const activeSteps = actualSteps.filter(s => s.status === 'in-progress');
  const delayedSteps = actualSteps.filter(s => s.status === 'delayed');
  const completedSteps = actualSteps.filter(s => s.status === 'completed');

  const stats = {
    active: activeSteps.length,
    completed: completedSteps.length,
    atRisk: delayedSteps.length,
    breached: delayedSteps.length,
    total: actualSteps.length
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-5 gap-4">
        <InstrumentCard>
          <div className="p-8 rounded-2xl border border-[#e3ebf7]">
            <div className="text-3xl font-bold text-blue-600">{stats.active}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
        </InstrumentCard>
        <InstrumentCard>
          <div className="p-8 rounded-2xl border border-[#e3ebf7]">
            <div className="text-3xl font-bold text-emerald-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </InstrumentCard>
        <InstrumentCard>
          <div className="p-8 rounded-2xl border border-[#e3ebf7]">
            <div className="text-3xl font-bold text-orange-600">{stats.atRisk}</div>
            <div className="text-sm text-gray-600">At Risk</div>
          </div>
        </InstrumentCard>
        <InstrumentCard>
          <div className="p-8 rounded-2xl border border-[#e3ebf7]">
            <div className="text-3xl font-bold text-red-600">{stats.breached}</div>
            <div className="text-sm text-gray-600">Breached</div>
          </div>
        </InstrumentCard>
        <InstrumentCard>
          <div className="p-8 rounded-2xl border border-[#e3ebf7]">
            <div className="text-3xl font-bold text-gray-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Steps</div>
          </div>
        </InstrumentCard>
      </div>

      {/* Active Timers */}
      {activeSteps.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Active SLA Timers
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {activeSteps.map(step => (
              <SLACountdownTimer
                key={step.id}
                stepName={step.name}
                slaHours={step.slaHours}
                hoursRemaining={step.hoursRemaining}
                status={step.status}
              />
            ))}
          </div>
        </div>
      )}

      {/* Delayed Steps */}
      {delayedSteps.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Delayed Steps Requiring Attention
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {delayedSteps.map(step => (
              <SLACountdownTimer
                key={step.id}
                stepName={step.name}
                slaHours={step.slaHours}
                hoursRemaining={step.hoursRemaining}
                status={step.status}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}