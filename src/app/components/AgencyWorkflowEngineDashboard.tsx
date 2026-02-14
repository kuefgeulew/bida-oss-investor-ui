import { motion } from 'motion/react';
import { useState } from 'react';
import { 
  GitBranch, Clock, CheckCircle2, AlertCircle, Users, 
  ArrowRight, Zap, Activity, TrendingUp, FileText
} from 'lucide-react';

/**
 * 🎯 AGENCY WORKFLOW ENGINE DASHBOARD
 * Visualizes the workflow orchestration between government agencies
 * Shows routing logic, parallel processing, and coordination state
 */

interface WorkflowNode {
  id: string;
  agency: string;
  status: 'completed' | 'active' | 'pending' | 'blocked';
  type: 'sequential' | 'parallel' | 'conditional';
  dependencies: string[];
  sla: number;
  elapsed: number;
  nextActions: string[];
}

const mockWorkflowNodes: WorkflowNode[] = [
  {
    id: 'rjsc',
    agency: 'RJSC',
    status: 'completed',
    type: 'sequential',
    dependencies: [],
    sla: 7,
    elapsed: 5,
    nextActions: ['BIDA Registration triggered automatically']
  },
  {
    id: 'bida',
    agency: 'BIDA',
    status: 'completed',
    type: 'sequential',
    dependencies: ['rjsc'],
    sla: 10,
    elapsed: 8,
    nextActions: ['Parallel track initiated: DOE + Fire Service']
  },
  {
    id: 'doe',
    agency: 'Dept of Environment',
    status: 'active',
    type: 'parallel',
    dependencies: ['bida'],
    sla: 60,
    elapsed: 23,
    nextActions: ['Site inspection scheduled', 'EIA report under review']
  },
  {
    id: 'fire',
    agency: 'Fire Service',
    status: 'active',
    type: 'parallel',
    dependencies: ['bida'],
    sla: 20,
    elapsed: 12,
    nextActions: ['Fire safety inspection pending', 'Waiting for 70% construction completion']
  },
  {
    id: 'dife',
    agency: 'DIFE',
    status: 'blocked',
    type: 'conditional',
    dependencies: ['doe', 'fire'],
    sla: 30,
    elapsed: 0,
    nextActions: ['Waiting for DOE and Fire Service clearances']
  },
  {
    id: 'final',
    agency: 'BIDA Final Clearance',
    status: 'pending',
    type: 'sequential',
    dependencies: ['dife'],
    sla: 7,
    elapsed: 0,
    nextActions: ['Will auto-trigger after DIFE approval']
  }
];

export function AgencyWorkflowEngineDashboard() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const stats = {
    totalAgencies: mockWorkflowNodes.length,
    completed: mockWorkflowNodes.filter(n => n.status === 'completed').length,
    active: mockWorkflowNodes.filter(n => n.status === 'active').length,
    pending: mockWorkflowNodes.filter(n => n.status === 'pending').length,
    parallelTracks: mockWorkflowNodes.filter(n => n.type === 'parallel').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-400 text-green-800';
      case 'active': return 'bg-blue-100 border-blue-400 text-blue-800';
      case 'pending': return 'bg-gray-100 border-gray-400 text-gray-800';
      case 'blocked': return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      default: return 'bg-gray-100 border-gray-400 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'active': return <Activity className="w-5 h-5 text-blue-600 animate-pulse" />;
      case 'pending': return <Clock className="w-5 h-5 text-gray-600" />;
      case 'blocked': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">⚙️ Agency Workflow Engine</h1>
            <p className="text-indigo-100 text-lg">Real-time visualization of inter-agency workflow orchestration and routing logic</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold mb-1">{stats.completed}/{stats.totalAgencies}</div>
            <div className="text-indigo-200 text-sm">Agencies Complete</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-4">
        <div className="glass-card p-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-blue-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalAgencies}</div>
          </div>
          <div className="text-sm text-gray-600">Total Agencies</div>
        </div>

        <div className="glass-card p-6 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>

        <div className="glass-card p-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-6 h-6 text-blue-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
          </div>
          <div className="text-sm text-gray-600">Active Now</div>
        </div>

        <div className="glass-card p-6 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <GitBranch className="w-6 h-6 text-purple-600" />
            <div className="text-2xl font-bold text-gray-900">{stats.parallelTracks}</div>
          </div>
          <div className="text-sm text-gray-600">Parallel Tracks</div>
        </div>

        <div className="glass-card p-6 border-2 border-orange-200">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-orange-600" />
            <div className="text-2xl font-bold text-gray-900">
              {Math.round((stats.completed / stats.totalAgencies) * 100)}%
            </div>
          </div>
          <div className="text-sm text-gray-600">Completion</div>
        </div>
      </div>

      {/* Workflow Visualization */}
      <div className="glass-card p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-indigo-600" />
          Workflow State Machine
        </h2>

        <div className="space-y-4">
          {mockWorkflowNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connection Line */}
              {index > 0 && (
                <div className="absolute left-8 -top-4 w-0.5 h-4 bg-gray-300" />
              )}

              {/* Node Card */}
              <div
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  getStatusColor(node.status)
                } ${selectedNode === node.id ? 'ring-4 ring-blue-500 ring-opacity-50 scale-105' : ''}`}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {getStatusIcon(node.status)}
                    </div>

                    {/* Agency Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg">{node.agency}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          node.type === 'parallel' ? 'bg-purple-200 text-purple-800' :
                          node.type === 'conditional' ? 'bg-orange-200 text-orange-800' :
                          'bg-blue-200 text-blue-800'
                        }`}>
                          {node.type}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      {node.status === 'active' && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress: {Math.round((node.elapsed / node.sla) * 100)}%</span>
                            <span>{node.elapsed} / {node.sla} days</span>
                          </div>
                          <div className="h-2 bg-white rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                              style={{ width: `${Math.min((node.elapsed / node.sla) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Dependencies */}
                      {node.dependencies.length > 0 && (
                        <div className="text-xs text-gray-600 mb-2">
                          <strong>Depends on:</strong> {node.dependencies.join(', ').toUpperCase()}
                        </div>
                      )}

                      {/* Next Actions */}
                      <div className="space-y-1">
                        {node.nextActions.map((action, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-600" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="ml-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${
                      node.status === 'completed' ? 'bg-green-600 text-white' :
                      node.status === 'active' ? 'bg-blue-600 text-white' :
                      node.status === 'blocked' ? 'bg-yellow-600 text-white' :
                      'bg-gray-400 text-white'
                    }`}>
                      {node.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Engine Capabilities */}
      <div className="glass-card p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-purple-600" />
          Workflow Engine Capabilities
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="font-semibold text-purple-900 mb-2">🔄 Automatic Routing</div>
            <p className="text-sm text-gray-700">
              Engine automatically triggers next agency when dependencies complete. No manual handoffs needed.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="font-semibold text-blue-900 mb-2">⚡ Parallel Processing</div>
            <p className="text-sm text-gray-700">
              Multiple agencies can work simultaneously when no dependencies exist (e.g., DOE + Fire Service).
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <div className="font-semibold text-orange-900 mb-2">🔍 Dependency Resolution</div>
            <p className="text-sm text-gray-700">
              Engine checks prerequisites before allowing step progression. Prevents incomplete submissions.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="font-semibold text-green-900 mb-2">📊 Real-time State Tracking</div>
            <p className="text-sm text-gray-700">
              Every workflow state change is tracked in real-time. Investors see exactly where they are.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="glass-card p-6 border-2 border-indigo-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-600" />
          Engine Architecture
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>State Machine Pattern:</strong> Each agency is a state node with defined transitions</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>Event-Driven:</strong> State changes emit events that trigger downstream workflows</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>Conditional Logic:</strong> Rules engine evaluates prerequisites before state transitions</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>SLA Monitoring:</strong> Built-in timers track elapsed time vs. SLA deadlines</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>Rollback Support:</strong> Engine can revert to previous states if errors occur</span>
          </div>
        </div>
      </div>
    </div>
  );
}
