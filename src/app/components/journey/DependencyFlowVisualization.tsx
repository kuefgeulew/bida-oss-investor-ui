/**
 * 🔗 DEPENDENCY FLOW VISUALIZATION
 * Shows approval dependency chains in a clear vertical timeline
 */

import React from 'react';
import { CheckCircle, Clock, Lock } from 'lucide-react';

interface DependencyStep {
  id: string;
  name: string;
  dependencies: string[];
  status: 'completed' | 'in-progress' | 'locked';
}

const APPROVAL_DEPENDENCIES: DependencyStep[] = [
  {
    id: 'company-reg',
    name: 'Company Registration (RJSC)',
    dependencies: [],
    status: 'completed'
  },
  {
    id: 'bida-reg',
    name: 'BIDA Registration',
    dependencies: ['Company Registration'],
    status: 'in-progress'
  },
  {
    id: 'environmental',
    name: 'Environmental Clearance',
    dependencies: ['Company Registration', 'Land proof documents'],
    status: 'locked'
  },
  {
    id: 'fire-safety',
    name: 'Fire Safety Certificate',
    dependencies: ['Environmental Clearance in progress'],
    status: 'locked'
  },
  {
    id: 'factory-license',
    name: 'Factory Operating License',
    dependencies: ['Environmental Clearance approved', 'Fire Safety approved'],
    status: 'locked'
  },
  {
    id: 'commencement',
    name: 'Commencement Certificate',
    dependencies: ['All previous approvals completed'],
    status: 'locked'
  }
];

export function DependencyFlowVisualization() {
  return (
    <div className="bg-white/60 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-8 shadow-lg">
      <h2 className="text-xl font-semibold mb-2 text-blue-900">
        🔗 How Approvals Depend on Each Other
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Understanding the dependency chain helps you plan document preparation and timeline expectations
      </p>
      
      <div className="border-l-4 border-blue-300 pl-6 space-y-6">
        {APPROVAL_DEPENDENCIES.map((step, index) => (
          <div key={step.id} className="relative">
            {/* Step indicator */}
            <div className="absolute -left-[34px] top-1 w-6 h-6 rounded-full bg-white border-4 border-blue-300 flex items-center justify-center">
              {step.status === 'completed' && <CheckCircle className="w-3 h-3 text-green-600" />}
              {step.status === 'in-progress' && <Clock className="w-3 h-3 text-amber-600" />}
              {step.status === 'locked' && <Lock className="w-3 h-3 text-gray-400" />}
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-medium text-gray-500">STEP {index + 1}</span>
                {step.status === 'completed' && (
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                    Completed
                  </span>
                )}
                {step.status === 'in-progress' && (
                  <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                    In Progress
                  </span>
                )}
                {step.status === 'locked' && (
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    Locked
                  </span>
                )}
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1">{step.name}</h3>
              
              {step.dependencies.length === 0 ? (
                <p className="text-sm text-green-600">
                  ✓ No dependencies — can start immediately
                </p>
              ) : (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Requires:</span>
                  <ul className="ml-4 mt-1 space-y-0.5">
                    {step.dependencies.map((dep, i) => (
                      <li key={i} className="list-disc">{dep}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
