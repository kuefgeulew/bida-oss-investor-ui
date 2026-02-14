import { useState } from 'react';
import { motion } from 'motion/react';
import { Plane, CheckCircle2, Upload, Calendar, FileCheck, Globe, ArrowRight } from 'lucide-react';

interface PreArrivalStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  canDo: 'before-arrival' | 'after-arrival';
}

export function PreArrivalMode() {
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'documents'>('overview');
  
  const steps: PreArrivalStep[] = [
    {
      id: 1,
      title: 'Create OSS Account',
      description: 'Register on BIDA OSS platform with passport details',
      status: 'completed',
      canDo: 'before-arrival'
    },
    {
      id: 2,
      title: 'Upload Passport & NOC',
      description: 'Submit passport copy and No Objection Certificate from home country',
      status: 'in-progress',
      canDo: 'before-arrival'
    },
    {
      id: 3,
      title: 'Business Plan Submission',
      description: 'Upload detailed business plan with financial projections',
      status: 'pending',
      canDo: 'before-arrival'
    },
    {
      id: 4,
      title: 'Pre-Verification',
      description: 'BIDA officers review documents and provide feedback',
      status: 'pending',
      canDo: 'before-arrival'
    },
    {
      id: 5,
      title: 'Schedule Appointment',
      description: 'Book in-person meeting with investment officer',
      status: 'pending',
      canDo: 'before-arrival'
    },
    {
      id: 6,
      title: 'Bank Solvency Certificate',
      description: 'Obtain and upload proof of financial capability',
      status: 'pending',
      canDo: 'before-arrival'
    },
    {
      id: 7,
      title: 'Arrival & In-Person Meeting',
      description: 'Meet assigned officer and finalize documentation',
      status: 'pending',
      canDo: 'after-arrival'
    },
    {
      id: 8,
      title: 'Submit Physical Application',
      description: 'Final submission with original documents',
      status: 'pending',
      canDo: 'after-arrival'
    }
  ];

  const beforeArrivalSteps = steps.filter(s => s.canDo === 'before-arrival');
  const afterArrivalSteps = steps.filter(s => s.canDo === 'after-arrival');

  const completedCount = steps.filter(s => s.status === 'completed').length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-8 rounded-2xl border border-[#e3ebf7] bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900">Pre-Arrival Mode</h2>
            <p className="text-gray-700">Complete 70% of setup before flying to Bangladesh</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-orange-700">{completedCount}/{steps.length}</div>
            <div className="text-sm text-gray-600">Steps Completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-3 bg-white/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-orange-500 to-red-600"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{Math.round(progress)}% complete</p>
        </div>

        <div className="p-4 bg-white rounded-xl">
          <p className="text-sm text-gray-900">
            <strong>🌍 For foreign investors:</strong> Complete document verification, 
            schedule appointments, and get pre-approval BEFORE you travel. 
            Save time, reduce risk, and arrive ready to start business.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'overview'
              ? 'bg-orange-600 text-white shadow-lg'
              : 'glass-button hover:bg-white/80'
          }`}
        >
          <Globe className="w-5 h-5 inline mr-2" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('steps')}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'steps'
              ? 'bg-orange-600 text-white shadow-lg'
              : 'glass-button hover:bg-white/80'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 inline mr-2" />
          Steps
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'documents'
              ? 'bg-orange-600 text-white shadow-lg'
              : 'glass-button hover:bg-white/80'
          }`}
        >
          <Upload className="w-5 h-5 inline mr-2" />
          Documents
        </button>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before Arrival */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 rounded-2xl border border-[#e3ebf7] border-2 border-green-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Before Arrival</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              You can complete these {beforeArrivalSteps.length} steps from anywhere in the world
            </p>
            <ul className="space-y-3">
              {beforeArrivalSteps.map((step) => (
                <li key={step.id} className="flex items-start gap-3">
                  <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    step.status === 'completed' 
                      ? 'text-green-600' 
                      : 'text-gray-400'
                  }`} />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{step.title}</h4>
                    <p className="text-xs text-gray-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After Arrival */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 rounded-2xl border border-[#e3ebf7] border-2 border-orange-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Plane className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">After Arrival</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Only {afterArrivalSteps.length} steps require physical presence in Bangladesh
            </p>
            <ul className="space-y-3">
              {afterArrivalSteps.map((step) => (
                <li key={step.id} className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{step.title}</h4>
                    <p className="text-xs text-gray-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}

      {activeTab === 'steps' && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Complete Investment Journey</h3>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Document Upload Center</h3>
          
          <div className="space-y-4">
            <DocumentUploadBox
              title="Passport Copy"
              description="Colored scan of valid passport (all pages)"
              status="uploaded"
            />
            <DocumentUploadBox
              title="No Objection Certificate"
              description="Notarized NOC from country of origin"
              status="pending"
            />
            <DocumentUploadBox
              title="Business Plan"
              description="Detailed plan with financial projections (PDF)"
              status="pending"
            />
            <DocumentUploadBox
              title="Bank Solvency Certificate"
              description="Proof of financial capability on bank letterhead"
              status="pending"
            />
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-900">
              <strong>✓ Documents uploaded here are pre-verified by BIDA officers.</strong> 
              You'll receive feedback within 48 hours. This ensures faster processing when you arrive.
            </p>
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BenefitCard
          icon={<CheckCircle2 className="w-8 h-8 text-green-600" />}
          title="70% Complete Before Arrival"
          description="Arrive with most approvals already processed"
        />
        <BenefitCard
          icon={<Calendar className="w-8 h-8 text-blue-600" />}
          title="Pre-Scheduled Meetings"
          description="No waiting - your officer is ready when you land"
        />
        <BenefitCard
          icon={<FileCheck className="w-8 h-8 text-purple-600" />}
          title="Document Pre-Verification"
          description="Fix issues before traveling - save time & money"
        />
      </div>

      {/* CTA */}
      <div className="glass-card p-8 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Ready to Start Pre-Arrival Process?
            </h3>
            <p className="text-gray-700">
              Create your account and begin document submission today
            </p>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StepCard({ step, index }: { step: PreArrivalStep; index: number }) {
  const statusColors = {
    completed: 'bg-green-100 text-green-700 border-green-200',
    'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
    pending: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  const statusIcons = {
    completed: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    'in-progress': <Calendar className="w-5 h-5 text-blue-600 animate-pulse" />,
    pending: <Calendar className="w-5 h-5 text-gray-400" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`p-4 rounded-xl border-2 ${statusColors[step.status]}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {statusIcons[step.status]}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h4 className="font-semibold text-gray-900">{step.title}</h4>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              step.canDo === 'before-arrival' 
                ? 'bg-green-100 text-green-700'
                : 'bg-orange-100 text-orange-700'
            }`}>
              {step.canDo === 'before-arrival' ? '🌐 Remote' : '✈️ In-Person'}
            </span>
          </div>
          <p className="text-sm text-gray-700">{step.description}</p>
        </div>
        <div className="flex-shrink-0">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[step.status]}`}>
            {step.status}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function DocumentUploadBox({ title, description, status }: {
  title: string;
  description: string;
  status: 'uploaded' | 'pending';
}) {
  return (
    <div className={`p-4 rounded-xl border-2 ${
      status === 'uploaded' 
        ? 'bg-green-50 border-green-200' 
        : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {status === 'uploaded' ? (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          ) : (
            <Upload className="w-6 h-6 text-gray-400" />
          )}
          <div>
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        {status === 'pending' ? (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Upload
          </button>
        ) : (
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm">
            ✓ Uploaded
          </span>
        )}
      </div>
    </div>
  );
}

function BenefitCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="glass-card p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}