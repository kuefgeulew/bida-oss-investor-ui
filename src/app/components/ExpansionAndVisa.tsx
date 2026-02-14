import { useState } from 'react';
import { motion } from 'motion/react';
import { RefreshCcw, CheckCircle2, ArrowRight, FileUser, Users, FileText, Globe, Clock, AlertCircle } from 'lucide-react';

// ============================================
// Re-Investment / Expansion Component
// ============================================

export function ExpansionModeView() {
  const [expandType, setExpandType] = useState<'capacity' | 'product' | 'location'>('capacity');
  
  // Mock existing investment data
  const existingInvestment = {
    companyName: 'ABC Manufacturing Ltd.',
    registeredDate: '2024-03-15',
    currentCapacity: '50,000 units/month',
    employees: 250,
    zone: 'Dhaka EPZ',
    status: 'Operational'
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center">
            <RefreshCcw className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">Re-Investment / Expansion Fast-Track</h2>
            <p className="text-gray-700">70% faster approval for existing investors</p>
          </div>
        </div>

        <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100">
          <p className="text-sm text-gray-900">
            <strong>Reinvestment is the biggest source of FDI globally.</strong> Existing investors get fast-tracked approvals with pre-filled data and streamlined process.
          </p>
        </div>
      </div>

      {/* Main Content Grid - Distributed Horizontally */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Current Investment */}
        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Current Investment</h3>
          <div className="space-y-3">
            <InfoBox label="Company" value={existingInvestment.companyName} />
            <InfoBox label="Registered" value={existingInvestment.registeredDate} />
            <InfoBox label="Status" value={existingInvestment.status} badge />
            <InfoBox label="Current Capacity" value={existingInvestment.currentCapacity} />
            <InfoBox label="Employees" value={existingInvestment.employees.toString()} />
            <InfoBox label="Zone" value={existingInvestment.zone} />
          </div>
        </div>

        {/* Middle Column - Expansion Options */}
        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Expansion Type:</h3>
          <div className="space-y-3">
            <ExpansionOption
              type="capacity"
              selected={expandType === 'capacity'}
              onClick={() => setExpandType('capacity')}
              title="Increase Capacity"
              description="Expand production volume in existing facility"
              icon={<RefreshCcw className="w-6 h-6" />}
              benefits={['No new land needed', '3-5 day approval', 'Same location benefits']}
            />
            <ExpansionOption
              type="product"
              selected={expandType === 'product'}
              onClick={() => setExpandType('product')}
              title="Add Product Line"
              description="Diversify into new product categories"
              icon={<FileText className="w-6 h-6" />}
              benefits={['Leverage existing setup', '7-10 day approval', 'Additional incentives']}
            />
            <ExpansionOption
              type="location"
              selected={expandType === 'location'}
              onClick={() => setExpandType('location')}
              title="New Location"
              description="Open additional facility in different zone"
              icon={<Globe className="w-6 h-6" />}
              benefits={['Multi-zone presence', '15-20 day approval', 'Group company benefits']}
            />
          </div>
        </div>

        {/* Right Column - Benefits & Timeline */}
        <div className="space-y-6">
          <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              What You Keep
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                All company registration data
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                Existing tax holiday (continues)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                Duty-free import status
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                Officer relationship
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                Banking relationships
              </li>
            </ul>
          </div>

          <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Timeline Comparison
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">New Investor</span>
                  <span className="font-semibold text-gray-900">45 days</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-gray-600 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Expansion (You)</span>
                  <span className="font-semibold text-blue-700">7 days</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '15.5%' }} />
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-sm font-semibold text-blue-700">
                  ⚡ 84% faster approval
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-card p-8 bg-blue-50/50 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Expand?</h3>
            <p className="text-gray-700">Start your fast-track expansion application now</p>
          </div>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2">
            Start Expansion Application
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value, badge = false }: { label: string; value: string; badge?: boolean }) {
  return (
    <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100">
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      {badge ? (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
          {value}
        </span>
      ) : (
        <div className="font-semibold text-gray-900">{value}</div>
      )}
    </div>
  );
}

function ExpansionOption({ type, selected, onClick, title, description, icon, benefits }: {
  type: string;
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}) {
  return (
    <button
      onClick={onClick}
      className={`p-5 rounded-xl text-left transition-all bg-blue-50/50 hover:bg-blue-50 hover:shadow-lg ${
        selected
          ? 'border-2 border-blue-600 shadow-lg'
          : 'border border-blue-100'
      }`}
    >
      <div className={`w-12 h-12 rounded-lg mb-3 flex items-center justify-center ${
        selected ? 'bg-blue-600' : 'bg-blue-100'
      }`}>
        <div className={selected ? 'text-white' : 'text-blue-600'}>
          {icon}
        </div>
      </div>
      <h4 className={`font-bold mb-1 text-gray-900`}>{title}</h4>
      <p className={`text-sm mb-3 text-gray-600`}>{description}</p>
      <ul className="space-y-1">
        {benefits.map((benefit, i) => (
          <li key={i} className={`text-xs flex items-center gap-1 ${selected ? 'text-blue-700' : 'text-gray-600'}`}>
            <CheckCircle2 className={`w-3 h-3 ${selected ? 'text-blue-600' : ''}`} />
            {benefit}
          </li>
        ))}
      </ul>
    </button>
  );
}

// ============================================
// Visa & Work Permit Guidance Component
// ============================================

export function VisaGuidanceView() {
  const [visaType, setVisaType] = useState<'investor' | 'work' | 'dependent'>('work');

  const visaInfo = {
    investor: {
      title: 'Investor Visa',
      duration: '5 years (renewable)',
      timeline: '7-10 business days',
      requirements: [
        'BIDA investment registration certificate',
        'Passport copy with 6 months validity',
        'Investment proof (bank statement)',
        'Business plan',
        'Company incorporation certificate'
      ],
      process: [
        'Submit documents to BIDA',
        'BIDA forwards to Home Ministry',
        'Security clearance (3-5 days)',
        'Visa issued'
      ]
    },
    work: {
      title: 'Work Visa for Foreign Employees',
      duration: '1 year (renewable)',
      timeline: '10-15 business days',
      requirements: [
        'Employment contract',
        'Educational certificates',
        'Work permit from BIDA',
        'Passport copy',
        'Company recommendation letter',
        'Tax clearance'
      ],
      process: [
        'Apply for work permit at BIDA',
        'Submit visa application',
        'Security clearance',
        'Visa issued'
      ]
    },
    dependent: {
      title: 'Dependent Visa (Family)',
      duration: 'Same as sponsor visa',
      timeline: '7-10 business days',
      requirements: [
        'Sponsor\'s visa copy',
        'Marriage certificate / birth certificate',
        'Passport copies',
        'Proof of relationship',
        'Sponsor\'s employment letter'
      ],
      process: [
        'Submit with sponsor documents',
        'Verification',
        'Visa issued'
      ]
    }
  };

  const currentVisa = visaInfo[visaType];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
            <FileUser className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Visa & Work Permit Guidance</h2>
            <p className="text-gray-600">Foreign staffing made clear</p>
          </div>
        </div>

        <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100">
          <p className="text-sm text-gray-900">
            <strong>Bringing foreign experts is a major concern.</strong> Get complete guidance on visas, work permits, and quota compliance.
          </p>
        </div>
      </div>

      {/* Visa Type Selector */}
      <div className="flex gap-3">
        <button
          onClick={() => setVisaType('investor')}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all bg-blue-50/50 hover:bg-blue-50 hover:shadow-lg ${
            visaType === 'investor'
              ? 'border-2 border-blue-600 shadow-lg'
              : 'border border-blue-100'
          }`}
        >
          <FileUser className="w-5 h-5 inline mr-2" />
          Investor Visa
        </button>
        <button
          onClick={() => setVisaType('work')}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all bg-blue-50/50 hover:bg-blue-50 hover:shadow-lg ${
            visaType === 'work'
              ? 'border-2 border-blue-600 shadow-lg'
              : 'border border-blue-100'
          }`}
        >
          <Users className="w-5 h-5 inline mr-2" />
          Work Visa
        </button>
        <button
          onClick={() => setVisaType('dependent')}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all bg-blue-50/50 hover:bg-blue-50 hover:shadow-lg ${
            visaType === 'dependent'
              ? 'border-2 border-blue-600 shadow-lg'
              : 'border border-blue-100'
          }`}
        >
          <Users className="w-5 h-5 inline mr-2" />
          Dependent Visa
        </button>
      </div>

      {/* Visa Details */}
      <motion.div
        key={visaType}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 bg-blue-50/50 border border-blue-100"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{currentVisa.title}</h3>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100">
            <Clock className="w-6 h-6 text-blue-600 mb-2" />
            <div className="text-sm text-gray-600">Processing Time</div>
            <div className="text-xl font-bold text-gray-900">{currentVisa.timeline}</div>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100">
            <CheckCircle2 className="w-6 h-6 text-blue-600 mb-2" />
            <div className="text-sm text-gray-600">Validity</div>
            <div className="text-xl font-bold text-gray-900">{currentVisa.duration}</div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Required Documents
          </h4>
          <ul className="space-y-2">
            {currentVisa.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Process */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-blue-600" />
            Application Process
          </h4>
          <div className="space-y-3">
            {currentVisa.process.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100">
                  <span className="text-gray-700">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quota Rules */}
      <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Foreign Employee Quota Rules</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-semibold">• Maximum 5%</span> of total workforce can be foreign nationals
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">• Exceptions:</span> SEZ/EPZ may allow higher percentages
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">• Training requirement:</span> Foreign staff must train local employees
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">• Renewal:</span> Demonstrate local skill development for renewal
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Need Visa Assistance?</h4>
            <p className="text-sm text-gray-600">BIDA provides visa facilitation services for registered investors</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            Contact BIDA
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Main Component - Combines Expansion and Visa
// ============================================

export function ExpansionAndVisa({ investorId }: { investorId: string }) {
  const [activeView, setActiveView] = useState<'expansion' | 'visa'>('expansion');

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveView('expansion')}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
            activeView === 'expansion'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'glass-button hover:bg-white/80'
          }`}
        >
          <RefreshCcw className="w-5 h-5 inline mr-2" />
          Re-Investment & Expansion
        </button>
        <button
          onClick={() => setActiveView('visa')}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
            activeView === 'visa'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'glass-button hover:bg-white/80'
          }`}
        >
          <FileUser className="w-5 h-5 inline mr-2" />
          Visa & Work Permits
        </button>
      </div>

      {/* Content */}
      {activeView === 'expansion' ? <ExpansionModeView /> : <VisaGuidanceView />}
    </div>
  );
}

export default ExpansionAndVisa;