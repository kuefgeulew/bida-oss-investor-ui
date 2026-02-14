/**
 * 🪜 GRIEVANCE ESCALATION LADDER
 * 
 * 4-Level escalation system with specific SLA timelines
 * Level 1: Department Head (5 days)
 * Level 2: Agency Head (10 days)
 * Level 3: BIDA Ombudsman (15 days)
 * Level 4: Prime Minister's Office (30 days)
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  User,
  Users,
  Shield,
  Crown,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export interface EscalationLevel {
  level: 1 | 2 | 3 | 4;
  title: string;
  authority: string;
  slaResponseDays: number;
  status: 'pending' | 'active' | 'responded' | 'escalated' | 'completed';
  assignedOfficer?: string;
  responseDate?: string;
  responseMessage?: string;
}

interface GrievanceEscalationLadderProps {
  ticketId?: string;
  currentLevel?: 1 | 2 | 3 | 4;
  escalationHistory?: EscalationLevel[];
  onEscalateToNextLevel?: () => void;
  canEscalate?: boolean;
}

const ESCALATION_CONFIG: Record<1 | 2 | 3 | 4, {
  title: string;
  authority: string;
  slaResponseDays: number;
  icon: typeof User;
  color: string;
  bgColor: string;
  description: string;
}> = {
  1: {
    title: 'Level 1: Department Head',
    authority: 'Department Head',
    slaResponseDays: 5,
    icon: User,
    color: 'blue',
    bgColor: 'bg-blue-100',
    description: 'Initial response from departmental officer'
  },
  2: {
    title: 'Level 2: Agency Head',
    authority: 'Agency Director',
    slaResponseDays: 10,
    icon: Users,
    color: 'yellow',
    bgColor: 'bg-yellow-100',
    description: 'Escalated to agency leadership'
  },
  3: {
    title: 'Level 3: BIDA Ombudsman',
    authority: 'BIDA Ombudsman',
    slaResponseDays: 15,
    icon: Shield,
    color: 'orange',
    bgColor: 'bg-orange-100',
    description: 'Independent review and resolution authority'
  },
  4: {
    title: 'Level 4: Prime Minister\'s Office',
    authority: 'PMO Investment Cell',
    slaResponseDays: 30,
    icon: Crown,
    color: 'red',
    bgColor: 'bg-red-100',
    description: 'Highest authority intervention'
  }
};

export function GrievanceEscalationLadder({
  ticketId = 'DEMO-001',
  currentLevel = 1,
  escalationHistory = [],
  onEscalateToNextLevel = () => {},
  canEscalate = false
}: GrievanceEscalationLadderProps) {
  
  const getLevelStatus = (level: 1 | 2 | 3 | 4): EscalationLevel['status'] => {
    const levelData = escalationHistory.find(h => h.level === level);
    if (!levelData) return level <= currentLevel ? 'pending' : 'pending';
    return levelData.status;
  };

  const getStatusIcon = (status: EscalationLevel['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'responded':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'active':
        return <Clock className="w-5 h-5 text-yellow-600 animate-pulse" />;
      case 'escalated':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Escalation Ladder</h3>
          <p className="text-sm text-gray-600 mt-1">
            Current Level: <span className="font-bold text-red-600">{currentLevel}</span> of 4 • 
            SLA: {ESCALATION_CONFIG[currentLevel].slaResponseDays} days
          </p>
        </div>
        {canEscalate && currentLevel < 4 && (
          <button
            onClick={onEscalateToNextLevel}
            className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all flex items-center gap-2"
          >
            Escalate to Level {currentLevel + 1}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Escalation Levels Timeline */}
      <div className="space-y-4">
        {([1, 2, 3, 4] as const).map((level) => {
          const config = ESCALATION_CONFIG[level];
          const Icon = config.icon;
          const status = getLevelStatus(level);
          const levelData = escalationHistory.find(h => h.level === level);
          const isActive = level === currentLevel;
          const isPassed = level < currentLevel;
          const isFuture = level > currentLevel;

          return (
            <motion.div
              key={level}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: level * 0.1 }}
              className={`relative border-2 rounded-xl p-4 transition-all ${
                isActive
                  ? 'border-red-500 bg-red-50 shadow-lg'
                  : isPassed
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              {/* Level Badge */}
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 text-${config.color}-700`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{config.title}</h4>
                      <p className="text-sm text-gray-600">{config.authority}</p>
                    </div>
                    {getStatusIcon(status)}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>SLA: {config.slaResponseDays} days</span>
                    </div>
                    {levelData?.assignedOfficer && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{levelData.assignedOfficer}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{config.description}</p>

                  {/* Response Details */}
                  {levelData?.responseMessage && (
                    <div className="mt-3 bg-white border-2 border-gray-200 rounded-lg p-3">
                      <p className="text-xs font-bold text-gray-700 mb-1">Response:</p>
                      <p className="text-sm text-gray-900">{levelData.responseMessage}</p>
                      {levelData.responseDate && (
                        <p className="text-xs text-gray-500 mt-2">
                          Responded on: {levelData.responseDate}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Active Level Indicator */}
                  {isActive && (
                    <div className="mt-3 bg-red-100 border-2 border-red-300 rounded-lg p-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-700 flex-shrink-0" />
                      <span className="text-xs font-bold text-red-900">
                        Currently under review at this level
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Arrow */}
              {level < 4 && (
                <div className="absolute left-9 -bottom-6 flex items-center justify-center">
                  <ChevronRight className={`w-6 h-6 rotate-90 ${
                    isPassed ? 'text-green-500' : 'text-gray-300'
                  }`} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* SLA Warning */}
      {currentLevel < 4 && (
        <div className="mt-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold text-yellow-900 mb-1">SLA Escalation Policy</p>
              <p className="text-yellow-800">
                If no response is received within {ESCALATION_CONFIG[currentLevel].slaResponseDays} days, 
                this grievance will automatically escalate to Level {currentLevel + 1}.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}