import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Clock, AlertCircle, FileText, Users, 
  AlertTriangle, Info, BookOpen, GitBranch, ChevronDown, ChevronUp
} from 'lucide-react';
import { useState } from 'react';

interface JourneyStep {
  id: string;
  title: string;
  agency: string;
  status: 'completed' | 'in_progress' | 'pending' | 'delayed';
  legalBasis: string;
  whatOfficersCheck: string[];
  delayCauses: string[];
  dependencies: string[];
  estimatedDays: number;
  daysRemaining?: number;
  completedDate?: string;
}

interface EnhancedJourneyStepProps {
  step: JourneyStep;
  stepNumber: number;
}

/**
 * ENHANCED JOURNEY STEP
 * Shows legal basis, what officers check, delay causes, and dependencies
 */
function EnhancedJourneyStep({ step, stepNumber }: EnhancedJourneyStepProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-300';
      case 'in_progress': return 'bg-blue-100 border-blue-300';
      case 'delayed': return 'bg-red-100 border-red-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'delayed': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 border-2 ${getStatusColor(step.status)}`}
    >
      {/* Step Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
          {stepNumber}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{step.agency} • {step.estimatedDays} days</p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(step.status)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                step.status === 'completed' ? 'bg-green-600 text-white' :
                step.status === 'in_progress' ? 'bg-blue-600 text-white' :
                step.status === 'delayed' ? 'bg-red-600 text-white' :
                'bg-gray-400 text-white'
              }`}>
                {step.status === 'completed' ? 'Completed' :
                 step.status === 'in_progress' ? 'In Progress' :
                 step.status === 'delayed' ? 'Delayed' : 'Pending'}
              </span>
            </div>
          </div>

          {step.daysRemaining && step.status === 'in_progress' && (
            <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-900">
                ⏰ {step.daysRemaining} days remaining until SLA deadline
              </p>
            </div>
          )}

          {step.completedDate && (
            <div className="mb-3 p-2 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-900">
                ✓ Completed on {step.completedDate}
              </p>
            </div>
          )}

          {/* WORLD-CLASS ADDITION: Legal Basis */}
          <div className="mb-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-purple-900 mb-1">WHY THIS STEP EXISTS (Legal Basis)</p>
                <p className="text-sm text-purple-800">{step.legalBasis}</p>
              </div>
            </div>
          </div>

          {/* Expandable Details */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {isExpanded ? 'Hide Details' : 'Show Details (What Officers Check, Delay Causes, Dependencies)'}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pl-14 space-y-4 mt-4 pt-4 border-t border-gray-200">
              {/* WORLD-CLASS ADDITION: What Officers Check */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2 mb-3">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <h4 className="font-semibold text-blue-900">What Officers Check in This Step</h4>
                </div>
                <ul className="space-y-2">
                  {step.whatOfficersCheck.map((check, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-blue-800">
                      <span className="text-blue-600 mt-0.5">✓</span>
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WORLD-CLASS ADDITION: What Causes Delays */}
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <h4 className="font-semibold text-yellow-900">Common Delay Causes (Pre-emptive Education)</h4>
                </div>
                <ul className="space-y-2">
                  {step.delayCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-yellow-800">
                      <span className="text-yellow-600 mt-0.5">⚠</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WORLD-CLASS ADDITION: Dependencies */}
              {step.dependencies.length > 0 && (
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-start gap-2 mb-3">
                    <GitBranch className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <h4 className="font-semibold text-orange-900">Dependencies (Must Complete First)</h4>
                  </div>
                  <ul className="space-y-2">
                    {step.dependencies.map((dep, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-orange-800">
                        <span className="text-orange-600 mt-0.5">→</span>
                        <span>{dep}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 p-2 bg-white rounded border border-orange-300">
                    <p className="text-xs text-orange-700">
                      <Info className="w-3 h-3 inline mr-1" />
                      This step cannot start until all dependencies are completed
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * MOCK DATA: Enhanced journey steps with world-class transparency
 */
export const enhancedJourneySteps: JourneyStep[] = [
  {
    id: 'step-1',
    title: 'Company Registration (RJSC)',
    agency: 'Registrar of Joint Stock Companies and Firms',
    status: 'completed',
    completedDate: 'January 18, 2026',
    estimatedDays: 7,
    legalBasis: 'Required under Companies Act 1994, Section 3. Every foreign company must be registered as a legal entity in Bangladesh before conducting business operations.',
    whatOfficersCheck: [
      'Uniqueness of company name (not duplicating existing entities)',
      'Completeness of Memorandum and Articles of Association',
      'Valid passport and address proof of foreign directors',
      'Proper notarization and attestation of foreign documents',
      'Payment of registration fees and stamp duties'
    ],
    delayCauses: [
      'Company name already taken or too similar to existing entity',
      'Missing signatures on incorporation documents',
      'Foreign documents not properly notarized by embassy',
      'Incomplete director information (missing address proof)',
      'Payment delays or incorrect fee calculation'
    ],
    dependencies: []
  },
  {
    id: 'step-2',
    title: 'BIDA Registration',
    agency: 'Bangladesh Investment Development Authority',
    status: 'completed',
    completedDate: 'January 20, 2026',
    estimatedDays: 10,
    legalBasis: 'Required under Foreign Private Investment (Promotion and Protection) Act 1980. BIDA registration ensures you qualify for FDI benefits, repatriation rights, and work permit eligibility.',
    whatOfficersCheck: [
      'Proof of foreign equity investment (minimum $50,000 for services, $100,000 for industrial)',
      'RJSC incorporation certificate',
      'Business plan with sector details and investment timeline',
      'Source of funds documentation',
      'Compliance with sector-specific regulations'
    ],
    delayCauses: [
      'Investment amount below recommended threshold',
      'Business plan lacks sufficient detail or market analysis',
      'Source of funds not clearly documented',
      'Sector requires additional clearances (e.g., telecom, banking)',
      'Incomplete RJSC registration documents'
    ],
    dependencies: ['Company Registration (RJSC) must be completed first']
  },
  {
    id: 'step-3',
    title: 'Environmental Clearance',
    agency: 'Department of Environment (DOE)',
    status: 'in_progress',
    daysRemaining: 5,
    estimatedDays: 60,
    legalBasis: 'Mandatory under Environmental Conservation Act 1995 and Environmental Conservation Rules 1997. All industrial projects categorized as Red/Orange must obtain environmental clearance before operations.',
    whatOfficersCheck: [
      'Environmental Impact Assessment (EIA) report completeness',
      'Site location compliance with zoning laws',
      'Proposed waste management and effluent treatment plans',
      'Air emission control measures',
      'Noise pollution mitigation strategies',
      'Green belt and tree plantation commitments'
    ],
    delayCauses: [
      'Incomplete EIA report (missing baseline environmental data)',
      'Site located in ecologically critical area without proper justification',
      'Inadequate effluent treatment plant design',
      'Missing details on hazardous waste disposal',
      'Site inspection scheduling delays',
      'Public hearing objections from local community'
    ],
    dependencies: [
      'Company Registration must be completed',
      'Land lease agreement or ownership proof required',
      'Factory design blueprints must be ready'
    ]
  },
  {
    id: 'step-4',
    title: 'Fire Safety Certificate',
    agency: 'Fire Service and Civil Defence',
    status: 'in_progress',
    daysRemaining: 2,
    estimatedDays: 20,
    legalBasis: 'Required under Fire Prevention and Extinction Act 2003. All factories and commercial buildings must have fire safety clearance before starting operations to ensure worker safety.',
    whatOfficersCheck: [
      'Adequate fire exits (minimum 2 per floor)',
      'Fire extinguisher placement and accessibility',
      'Sprinkler system installation and water pressure',
      'Emergency evacuation plan and signage',
      'Electrical safety compliance',
      'Storage of flammable materials in designated areas'
    ],
    delayCauses: [
      'Insufficient fire exits or blocked emergency routes',
      'Fire extinguishers expired or not properly maintained',
      'No sprinkler system or inadequate water supply',
      'Electrical wiring not up to code',
      'Site inspection reveals structural fire hazards',
      'Missing emergency evacuation drills documentation'
    ],
    dependencies: [
      'Factory construction must be at least 70% complete',
      'Building plan approval from City Corporation/Pourashava',
      'Environmental Clearance should be in progress'
    ]
  },
  {
    id: 'step-5',
    title: 'Factory License',
    agency: 'Department of Inspection for Factories and Establishments (DIFE)',
    status: 'pending',
    estimatedDays: 30,
    legalBasis: 'Mandatory under Bangladesh Labour Act 2006, Section 9. All factories employing 10+ workers must obtain a factory license to ensure compliance with labor laws and worker safety standards.',
    whatOfficersCheck: [
      'Adequate working space per worker (minimum 9.9 sq ft)',
      'Proper ventilation and lighting systems',
      'Sanitary facilities (toilets, drinking water) adequacy',
      'Worker safety equipment and first aid provisions',
      'Machinery safety guards and operational safety measures',
      'Compliance with minimum wage and working hours regulations'
    ],
    delayCauses: [
      'Factory space per worker below legal requirement',
      'Insufficient toilets or drinking water points',
      'Machinery lacks safety guards',
      'No dedicated first aid room or medical facilities',
      'Site inspection scheduling conflicts',
      'Missing worker welfare committee formation documents'
    ],
    dependencies: [
      'Fire Safety Certificate cannot start before Environmental Clearance is in progress',
      'Factory construction must be 90%+ complete',
      'Environmental Clearance must be approved',
      'Fire Safety Certificate must be obtained'
    ]
  },
  {
    id: 'step-6',
    title: 'Commencement of Operations',
    agency: 'BIDA / Zone Authority',
    status: 'pending',
    estimatedDays: 7,
    legalBasis: 'Final clearance step. BIDA or zone authority verifies all regulatory approvals are in place before issuing formal permission to commence commercial operations.',
    whatOfficersCheck: [
      'All licenses and clearances obtained and valid',
      'Utilities connected (electricity, gas, water)',
      'Work permits for foreign nationals approved',
      'Insurance coverage in place (workers compensation, fire)',
      'Initial workforce hired and registered',
      'Bank account operational and foreign equity received'
    ],
    delayCauses: [
      'One or more licenses pending or expired',
      'Utility connections not finalized',
      'Work permits still under processing',
      'Missing insurance documentation',
      'Foreign equity not yet transferred to Bangladesh account',
      'Final site inspection reveals non-compliance issues'
    ],
    dependencies: [
      'ALL previous steps must be completed',
      'Factory License approved',
      'Fire Safety Certificate valid',
      'Environmental Clearance valid',
      'BIDA registration active'
    ]
  }
];

export { EnhancedJourneyStep };
