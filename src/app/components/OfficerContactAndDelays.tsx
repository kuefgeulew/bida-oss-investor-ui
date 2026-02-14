import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, Globe, Clock, AlertTriangle, CheckCircle2, MessageSquare } from 'lucide-react';
import { officerDatabase, OfficerContact } from '@/data/investmentIntelligence';

// ============================================
// Officer Contact Component
// ============================================

export function OfficerContactView() {
  // In real app, this would be fetched based on application ID
  const assignedOfficer = officerDatabase[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#3b82f6] flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#0f172a]">Your Assigned Officer</h3>
            <p className="text-sm text-[#475569]">Direct point of contact for your application</p>
          </div>
        </div>

        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
          <p className="text-sm text-indigo-900">
            <strong>No black hole bureaucracy.</strong> You have a dedicated officer who knows your case and is available to help.
          </p>
        </div>
      </div>

      {/* Main Grid Layout - Officer Card and All Officers Side by Side */}
      <div className="grid grid-cols-2 gap-6">
        {/* Officer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200"
        >
          <div className="flex flex-col items-center text-center mb-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-3">
              {assignedOfficer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-4">
              ● Available Now
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{assignedOfficer.name}</h3>
            <p className="text-lg text-indigo-700 mb-6">{assignedOfficer.designation}</p>
          </div>

          {/* Contact Info Grid */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-gray-700 justify-center">
              <Mail className="w-5 h-5 text-indigo-600" />
              <a href={`mailto:${assignedOfficer.email}`} className="text-sm hover:text-indigo-600">
                {assignedOfficer.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-700 justify-center">
              <Phone className="w-5 h-5 text-indigo-600" />
              <a href={`tel:${assignedOfficer.phone}`} className="text-sm hover:text-indigo-600">
                {assignedOfficer.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-700 justify-center">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span className="text-sm">{assignedOfficer.availability}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 justify-center">
              <Globe className="w-5 h-5 text-indigo-600" />
              <span className="text-sm">{assignedOfficer.languages.join(', ')}</span>
            </div>
          </div>

          {/* Specialization */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2 text-center">Specialization:</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {assignedOfficer.specialization.map((spec, i) => (
                <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full px-6 py-3 bg-[#3b82f6] text-white rounded-xl font-semibold hover:bg-[#2563eb] transition-all">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Send Message
            </button>
            <button className="w-full px-6 py-3 glass-button rounded-xl hover:bg-white/80 transition-all">
              Schedule Meeting
            </button>
          </div>
        </motion.div>

        {/* All Officers */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">BIDA Investment Officers Team</h3>
          <div className="space-y-4">
            {officerDatabase.map((officer, index) => (
              <OfficerListItem key={index} officer={officer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OfficerListItem({ officer }: { officer: OfficerContact }) {
  return (
    <div className="p-4 glass-button rounded-xl flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
        {officer.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{officer.name}</h4>
        <p className="text-sm text-gray-600">{officer.designation}</p>
      </div>
      <div className="text-right text-sm text-gray-600">
        <div>{officer.email}</div>
        <div>{officer.phone}</div>
      </div>
    </div>
  );
}

// ============================================
// Delay Explanation Component
// ============================================

interface DelayInfo {
  status: 'delayed';
  reason: string;
  agency: string;
  expectedResolution: string;
  currentStep: string;
  actionRequired: boolean;
  officerNote: string;
}

export function DelayExplanationView() {
  // Mock delay data - in real app, fetch from API
  const [delayInfo] = useState<DelayInfo>({
    status: 'delayed',
    reason: 'Environmental clearance pending site inspection scheduling',
    agency: 'Department of Environment (DOE)',
    expectedResolution: '5-7 business days',
    currentStep: 'Step 3 of 7: Environmental Clearance',
    actionRequired: false,
    officerNote: 'DOE inspection team is currently backlogged. Your site is scheduled for next week. No action needed from your side at this moment.'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Application Status: Delayed</h2>
            <p className="text-gray-600">Transparency builds trust - here's what's happening</p>
          </div>
        </div>

        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-900">
            <strong>We know delays are frustrating.</strong> Instead of silence, we give you real-time transparency on what's causing the delay and when it will be resolved.
          </p>
        </div>
      </div>

      {/* Delay Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 border-2 border-orange-200"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Why is my application delayed?</h3>
            <p className="text-lg text-gray-700">{delayInfo.reason}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Responsible Agency</h4>
            </div>
            <p className="text-gray-700">{delayInfo.agency}</p>
          </div>

          <div className="p-4 bg-green-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Expected Resolution</h4>
            </div>
            <p className="text-gray-700">{delayInfo.expectedResolution}</p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Current Step</h4>
          <p className="text-gray-700">{delayInfo.currentStep}</p>
        </div>

        {delayInfo.actionRequired ? (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-900 mb-1">Action Required from You</h4>
                <p className="text-sm text-red-800">
                  Please submit the missing documents to proceed with your application.
                </p>
                <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">
                  Upload Documents
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-900 mb-1">No Action Required</h4>
                <p className="text-sm text-green-800">
                  Everything is in order. We're waiting on the agency's internal process.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 bg-indigo-50 border border-indigo-200 rounded-xl">
          <div className="flex items-start gap-3">
            <User className="w-6 h-6 text-indigo-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Note from Your Officer</h4>
              <p className="text-gray-700 mb-4">{delayInfo.officerNote}</p>
              <button className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-all">
                Contact My Officer
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timeline View */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Timeline</h3>
        <div className="space-y-4">
          <TimelineItem
            status="completed"
            title="Application Submitted"
            date="Jan 15, 2026"
            description="Your application was received and initial review completed"
          />
          <TimelineItem
            status="completed"
            title="Company Registration Approved"
            date="Jan 18, 2026"
            description="RJSC approved company registration"
          />
          <TimelineItem
            status="delayed"
            title="Environmental Clearance"
            date="In Progress"
            description="Waiting for DOE site inspection (delayed)"
            isActive
          />
          <TimelineItem
            status="pending"
            title="Fire Safety Certificate"
            date="Pending"
            description="Will begin after environmental clearance"
          />
          <TimelineItem
            status="pending"
            title="Final BIDA Approval"
            date="Pending"
            description="Final step after all clearances"
          />
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ status, title, date, description, isActive = false }: {
  status: 'completed' | 'delayed' | 'pending';
  title: string;
  date: string;
  description: string;
  isActive?: boolean;
}) {
  const colors = {
    completed: 'bg-green-100 text-green-700 border-green-200',
    delayed: 'bg-orange-100 text-orange-700 border-orange-200',
    pending: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  const icons = {
    completed: <CheckCircle2 className="w-6 h-6 text-green-600" />,
    delayed: <AlertTriangle className="w-6 h-6 text-orange-600 animate-pulse" />,
    pending: <Clock className="w-6 h-6 text-gray-400" />
  };

  return (
    <div className={`p-4 rounded-xl border-2 ${colors[status]} ${isActive ? 'ring-2 ring-offset-2 ring-orange-400' : ''}`}>
      <div className="flex items-start gap-4">
        {icons[status]}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <span className="text-sm text-gray-600">{date}</span>
          </div>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Main Combined Component
// ============================================

export function OfficerContactAndDelays({ applicationId }: { applicationId: string }) {
  const [activeView, setActiveView] = useState<'contact' | 'delays'>('contact');

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveView('contact')}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
            activeView === 'contact'
              ? 'bg-[#3b82f6] text-white shadow-lg'
              : 'glass-button hover:bg-white/80'
          }`}
        >
          <User className="w-5 h-5 inline mr-2" />
          My Officer
        </button>
        <button
          onClick={() => setActiveView('delays')}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
            activeView === 'delays'
              ? 'bg-orange-600 text-white shadow-lg'
              : 'glass-button hover:bg-white/80'
          }`}
        >
          <AlertTriangle className="w-5 h-5 inline mr-2" />
          Status & Delays
        </button>
      </div>

      {/* Content */}
      {activeView === 'contact' ? <OfficerContactView /> : <DelayExplanationView />}
    </div>
  );
}