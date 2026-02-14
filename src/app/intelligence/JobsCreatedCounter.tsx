// 👥 JOBS CREATED COUNTER — Real-time Employment Impact Widget
// SURGICAL COMPLETION: Extracted standalone component from FDIRealtimeDashboard
// MOUNT: FDI Intelligence tab, Admin dashboard, Public transparency portal

import { useState, useEffect } from 'react';
import { Card } from '@/app/components/ui/card';
import { Users, TrendingUp, Briefcase, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

interface JobsCreatedCounterProps {
  initialCount?: number;
  showBreakdown?: boolean;
  compact?: boolean;
  animated?: boolean;
}

interface JobsBreakdown {
  direct: number;
  indirect: number;
  manufacturing: number;
  services: number;
  technology: number;
}

export function JobsCreatedCounter({ 
  initialCount = 125400, 
  showBreakdown = true,
  compact = false,
  animated = true
}: JobsCreatedCounterProps) {
  const [totalJobs, setTotalJobs] = useState(initialCount);
  const [quarterlyGrowth] = useState(3240);

  // Calculate breakdown (realistic proportions)
  const breakdown: JobsBreakdown = {
    direct: Math.floor(totalJobs * 0.62),
    indirect: Math.floor(totalJobs * 0.38),
    manufacturing: Math.floor(totalJobs * 0.48),
    services: Math.floor(totalJobs * 0.35),
    technology: Math.floor(totalJobs * 0.17)
  };

  // Simulate live counter animation
  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setTotalJobs(prev => prev + Math.floor(Math.random() * 10));
    }, 60000); // Every 1 minute (reduced from 5 seconds)

    return () => clearInterval(interval);
  }, [animated]);

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  // Compact view
  if (compact) {
    return (
      <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-medium text-purple-700 mb-1">Jobs Created</div>
            <div className="text-2xl font-bold text-purple-800">
              {formatNumber(totalJobs)}
            </div>
            <div className="text-xs text-purple-600 mt-1">
              +{formatNumber(quarterlyGrowth)} this quarter
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Full view
  return (
    <div className="space-y-4">
      {/* Main Counter Card */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 border-2 border-purple-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Jobs Created</h3>
              <p className="text-xs text-gray-500">Through FDI Projects</p>
            </div>
          </div>
          {animated && (
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium">Live</span>
            </div>
          )}
        </div>

        <motion.div
          key={totalJobs}
          initial={animated ? { scale: 1 } : {}}
          animate={animated ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <div className="text-5xl font-bold text-purple-800">
            {formatNumber(totalJobs)}
          </div>
          <div className="text-sm text-purple-600 mt-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>+{formatNumber(quarterlyGrowth)} new jobs this quarter</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-purple-200">
          <div className="text-center p-3 bg-white/60 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">
              {formatNumber(breakdown.direct)}
            </div>
            <div className="text-xs text-gray-600 mt-1">Direct Employment</div>
          </div>
          <div className="text-center p-3 bg-white/60 rounded-lg">
            <div className="text-2xl font-bold text-indigo-700">
              {formatNumber(breakdown.indirect)}
            </div>
            <div className="text-xs text-gray-600 mt-1">Indirect Employment</div>
          </div>
        </div>
      </Card>

      {/* Sector Breakdown */}
      {showBreakdown && (
        <Card className="p-5 bg-white/70 backdrop-blur-xl border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-600" />
            Jobs by Sector
          </h4>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Manufacturing
                </span>
                <span className="font-semibold text-gray-900">
                  {formatNumber(breakdown.manufacturing)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: '48%' }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-600" />
                  Services
                </span>
                <span className="font-semibold text-gray-900">
                  {formatNumber(breakdown.services)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: '35%' }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-700 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  Technology
                </span>
                <span className="font-semibold text-gray-900">
                  {formatNumber(breakdown.technology)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: '17%' }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}