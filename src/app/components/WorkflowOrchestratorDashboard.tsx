import { motion } from 'motion/react';
import { useState } from 'react';
import { 
  Network, Play, Pause, CheckCircle2, Clock, 
  AlertCircle, GitBranch, Zap, Activity, 
  BarChart3, TrendingUp, FileText, ArrowRight
} from 'lucide-react';

/**
 * 🎼 WORKFLOW ORCHESTRATOR DASHBOARD
 * Visual process flow designer and orchestration monitoring
 * Converts the orchestration engine into a visible, interactive feature
 */

interface WorkflowStep {
  id: string;
  name: string;
  type: 'start' | 'process' | 'decision' | 'parallel' | 'merge' | 'end';
  status: 'completed' | 'active' | 'pending' | 'failed' | 'skipped';
  duration?: number; // minutes
  startTime?: string;
  endTime?: string;
  retries?: number;
  output?: string;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'completed' | 'failed' | 'paused';
  progress: number;
  steps: WorkflowStep[];
  startedAt: string;
  estimatedCompletion?: string;
}

const mockWorkflows: Workflow[] = [
  {
    id: 'wf-1',
    name: 'New Investor Onboarding',
    description: 'Complete investor registration and initial setup workflow',
    status: 'running',
    progress: 60,
    startedAt: 'Feb 13, 2026 09:00 AM',
    estimatedCompletion: '15 minutes',
    steps: [
      { id: 's1', name: 'Start: New Registration', type: 'start', status: 'completed', duration: 1, startTime: '09:00', endTime: '09:01', output: 'User ID: INV-2026-0842' },
      { id: 's2', name: 'Validate Email & Phone', type: 'process', status: 'completed', duration: 2, startTime: '09:01', endTime: '09:03', output: 'Email verified, SMS OTP sent' },
      { id: 's3', name: 'KYC Document Upload', type: 'process', status: 'completed', duration: 8, startTime: '09:03', endTime: '09:11', output: '3 documents uploaded: Passport, Address Proof, Business Plan' },
      { id: 's4', name: 'Auto-OCR Processing', type: 'process', status: 'active', duration: 4, startTime: '09:11', output: 'Extracting text from documents...' },
      { id: 's5', name: 'Decision: Manual Review Needed?', type: 'decision', status: 'pending' },
      { id: 's6', name: 'Create BIDA Account', type: 'process', status: 'pending' },
      { id: 's7', name: 'Send Welcome Email', type: 'process', status: 'pending' },
      { id: 's8', name: 'End: Onboarding Complete', type: 'end', status: 'pending' }
    ]
  },
  {
    id: 'wf-2',
    name: 'RJSC Registration Workflow',
    description: 'Company registration with RJSC including document submission and approval',
    status: 'completed',
    progress: 100,
    startedAt: 'Feb 12, 2026 10:30 AM',
    estimatedCompletion: 'Completed',
    steps: [
      { id: 's1', name: 'Start: RJSC Application', type: 'start', status: 'completed', duration: 1, output: 'Application ID: RJSC-2026-3421' },
      { id: 's2', name: 'Submit Company Documents', type: 'process', status: 'completed', duration: 5, output: 'Memorandum, Articles, Director Info submitted' },
      { id: 's3', name: 'Name Availability Check', type: 'process', status: 'completed', duration: 10, output: 'Company name "TechBridge BD Ltd" approved' },
      { id: 's4', name: 'Fee Calculation', type: 'process', status: 'completed', duration: 2, output: 'Total fees: BDT 25,000' },
      { id: 's5', name: 'Payment Processing', type: 'process', status: 'completed', duration: 3, output: 'Payment received via Bkash' },
      { id: 's6', name: 'RJSC Officer Review', type: 'process', status: 'completed', duration: 120, output: 'Approved by Officer Khan, RJSC' },
      { id: 's7', name: 'Generate Certificate', type: 'process', status: 'completed', duration: 5, output: 'Certificate #RJSC-2026-3421 issued' },
      { id: 's8', name: 'End: Registration Complete', type: 'end', status: 'completed' }
    ]
  },
  {
    id: 'wf-3',
    name: 'Multi-Agency Parallel Approval',
    description: 'Parallel processing of DOE and Fire Service clearances',
    status: 'running',
    progress: 45,
    startedAt: 'Feb 10, 2026 02:00 PM',
    estimatedCompletion: '3 days',
    steps: [
      { id: 's1', name: 'Start: Parallel Track Initiated', type: 'start', status: 'completed' },
      { id: 's2', name: 'Branch: DOE + Fire Service', type: 'parallel', status: 'completed' },
      { id: 's3a', name: 'DOE: EIA Report Submission', type: 'process', status: 'active', duration: 180, output: 'Under review by DOE officer' },
      { id: 's3b', name: 'Fire: Safety Inspection', type: 'process', status: 'active', duration: 60, output: 'Site inspection scheduled' },
      { id: 's4', name: 'Merge: Wait for Both', type: 'merge', status: 'pending' },
      { id: 's5', name: 'Proceed to DIFE', type: 'process', status: 'pending' },
      { id: 's6', name: 'End: Clearances Obtained', type: 'end', status: 'pending' }
    ]
  }
];

export function WorkflowOrchestratorDashboard() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);

  const stats = {
    totalWorkflows: mockWorkflows.length,
    running: mockWorkflows.filter(w => w.status === 'running').length,
    completed: mockWorkflows.filter(w => w.status === 'completed').length,
    failed: mockWorkflows.filter(w => w.status === 'failed').length,
    avgCompletionTime: '2.5 hours'
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'start': return <Play className="w-5 h-5 text-green-600" />;
      case 'end': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'process': return <Activity className="w-5 h-5 text-blue-600" />;
      case 'decision': return <GitBranch className="w-5 h-5 text-orange-600" />;
      case 'parallel': return <Network className="w-5 h-5 text-purple-600" />;
      case 'merge': return <ArrowRight className="w-5 h-5 text-indigo-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-400';
      case 'active': return 'bg-blue-100 border-blue-400 animate-pulse';
      case 'failed': return 'bg-red-100 border-red-400';
      case 'pending': return 'bg-gray-100 border-gray-300';
      case 'skipped': return 'bg-yellow-100 border-yellow-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const getWorkflowStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'border-blue-400 bg-blue-50';
      case 'completed': return 'border-green-400 bg-green-50';
      case 'failed': return 'border-red-400 bg-red-50';
      case 'paused': return 'border-yellow-400 bg-yellow-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Network className="w-10 h-10" />
              Workflow Orchestrator Dashboard
            </h1>
            <p className="text-purple-100 text-lg">Visual process flows, orchestration monitoring, and automation analytics</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold mb-1">{stats.running}</div>
            <div className="text-purple-200 text-sm">Active Workflows</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-4">
        <div className="glass-card p-6 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <Network className="w-6 h-6 text-purple-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalWorkflows}</div>
          </div>
          <div className="text-sm text-gray-600">Total Workflows</div>
        </div>

        <div className="glass-card p-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-6 h-6 text-blue-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.running}</div>
          </div>
          <div className="text-sm text-gray-600">Running Now</div>
        </div>

        <div className="glass-card p-6 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>

        <div className="glass-card p-6 border-2 border-red-200">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.failed}</div>
          </div>
          <div className="text-sm text-gray-600">Failed</div>
        </div>

        <div className="glass-card p-6 border-2 border-orange-200">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-orange-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.avgCompletionTime}</div>
          </div>
          <div className="text-sm text-gray-600">Avg Time</div>
        </div>
      </div>

      {/* Active Workflows */}
      <div className="space-y-4">
        {mockWorkflows.map((workflow) => (
          <motion.div
            key={workflow.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-card p-6 border-2 cursor-pointer ${getWorkflowStatusColor(workflow.status)}`}
            onClick={() => setSelectedWorkflow(selectedWorkflow === workflow.id ? null : workflow.id)}
          >
            {/* Workflow Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{workflow.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Started: {workflow.startedAt}</span>
                  </div>
                  {workflow.estimatedCompletion && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>ETA: {workflow.estimatedCompletion}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className={`px-4 py-2 rounded-full text-sm font-bold mb-2 ${
                  workflow.status === 'running' ? 'bg-blue-600 text-white' :
                  workflow.status === 'completed' ? 'bg-green-600 text-white' :
                  workflow.status === 'failed' ? 'bg-red-600 text-white' :
                  'bg-yellow-600 text-white'
                }`}>
                  {workflow.status.toUpperCase()}
                </div>
                <div className="text-3xl font-bold text-gray-900">{workflow.progress}%</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    workflow.status === 'completed' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                    workflow.status === 'failed' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                    'bg-gradient-to-r from-blue-500 to-purple-600'
                  }`}
                  style={{ width: `${workflow.progress}%` }}
                />
              </div>
            </div>

            {/* Workflow Steps (Expanded View) */}
            {selectedWorkflow === workflow.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-6 pt-6 border-t-2 border-gray-300"
              >
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-indigo-600" />
                  Workflow Steps
                </h4>
                
                <div className="space-y-2">
                  {workflow.steps.map((step, index) => (
                    <div key={step.id} className="relative">
                      {/* Connection Line */}
                      {index > 0 && (
                        <div className="absolute left-6 -top-2 w-0.5 h-2 bg-gray-300" />
                      )}

                      <div className={`flex items-start gap-4 p-4 rounded-lg border-2 ${getStatusColor(step.status)}`}>
                        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-gray-300">
                          {getStepIcon(step.type)}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h5 className="font-bold text-gray-900">{step.name}</h5>
                              <div className="text-xs text-gray-600 mt-1">
                                Type: {step.type} {step.duration && `• Duration: ${step.duration} min`}
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              step.status === 'completed' ? 'bg-green-600 text-white' :
                              step.status === 'active' ? 'bg-blue-600 text-white' :
                              step.status === 'failed' ? 'bg-red-600 text-white' :
                              'bg-gray-400 text-white'
                            }`}>
                              {step.status}
                            </span>
                          </div>

                          {step.output && (
                            <div className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200">
                              <strong>Output:</strong> {step.output}
                            </div>
                          )}

                          {step.startTime && step.endTime && (
                            <div className="text-xs text-gray-500 mt-1">
                              {step.startTime} → {step.endTime}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Orchestrator Capabilities */}
      <div className="glass-card p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-indigo-600" />
          Workflow Orchestrator Capabilities
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-indigo-200">
            <div className="font-semibold text-indigo-900 mb-2">🔄 Auto-Retry Logic</div>
            <p className="text-sm text-gray-700">
              Failed steps automatically retry with exponential backoff. Configure max retries per step.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="font-semibold text-purple-900 mb-2">⚡ Parallel Execution</div>
            <p className="text-sm text-gray-700">
              Run independent steps simultaneously. Merge results when all parallel tracks complete.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="font-semibold text-blue-900 mb-2">🔍 Conditional Branching</div>
            <p className="text-sm text-gray-700">
              Decision nodes evaluate conditions and route to appropriate next steps dynamically.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="font-semibold text-green-900 mb-2">📊 Real-time Monitoring</div>
            <p className="text-sm text-gray-700">
              Track workflow progress in real-time. See exactly which step is executing and its status.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <div className="font-semibold text-orange-900 mb-2">⏸ Pause & Resume</div>
            <p className="text-sm text-gray-700">
              Pause workflows mid-execution. Resume from exact checkpoint when ready (e.g., waiting for payment).
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <div className="font-semibold text-red-900 mb-2">🔙 Rollback Support</div>
            <p className="text-sm text-gray-700">
              Undo completed steps if errors occur. Maintains data integrity during failure recovery.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Architecture */}
      <div className="glass-card p-6 border-2 border-purple-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6 text-purple-600" />
          Orchestrator Architecture
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span><strong>Event-Driven:</strong> Each step completion triggers events that activate downstream steps</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span><strong>State Persistence:</strong> Workflow state saved to database after each step (survives server restarts)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span><strong>Error Handling:</strong> Comprehensive try-catch with automatic rollback on critical failures</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span><strong>Dependency Resolution:</strong> Analyzes step dependencies and determines optimal execution order</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span><strong>Resource Management:</strong> Queues workflows to prevent system overload, with priority scheduling</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span><strong>Audit Trail:</strong> Complete execution history with timestamps, inputs, outputs, and errors logged</span>
          </div>
        </div>
      </div>
    </div>
  );
}
