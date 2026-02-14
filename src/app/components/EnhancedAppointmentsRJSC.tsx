import { motion } from 'motion/react';
import { User, Award, Calendar, CheckCircle2, FileText, Download, Shield, Building } from 'lucide-react';
import { toast } from 'sonner';

/**
 * TAB 7 - APPOINTMENTS: Premium Experience
 */

export function OfficerProfileCard() {
  const officers = [
    {
      name: 'Dr. Fatima Rahman',
      title: 'Senior Investment Officer',
      agency: 'BIDA',
      experience: '12 years',
      specialization: ['Textile Sector', 'Chinese Investments', 'Zone Selection'],
      languages: ['Bengali', 'English', 'Mandarin'],
      successRate: '94%',
      avgResponseTime: '2 hours',
      photo: '👩‍💼'
    },
    {
      name: 'Md. Karim Ahmed',
      title: 'Environmental Clearance Specialist',
      agency: 'Department of Environment',
      experience: '8 years',
      specialization: ['EIA Review', 'Industrial Projects', 'Compliance Audits'],
      languages: ['Bengali', 'English'],
      successRate: '89%',
      avgResponseTime: '4 hours',
      photo: '👨‍💼'
    }
  ];

  return (
    <div className="space-y-4">
      {officers.map((officer, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="glass-card p-6 hover:shadow-xl transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="text-6xl">{officer.photo}</div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{officer.name}</h3>
              <p className="text-sm text-gray-600">{officer.title}</p>
              <p className="text-xs text-purple-600 font-medium">{officer.agency}</p>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600">Experience</p>
                  <p className="font-semibold text-blue-600">{officer.experience}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-600">Success Rate</p>
                  <p className="font-semibold text-green-600">{officer.successRate}</p>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-xs text-gray-600 mb-1">Specialization:</p>
                <div className="flex flex-wrap gap-1">
                  {officer.specialization.map((spec, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-xs text-gray-600 mb-1">Languages:</p>
                <p className="text-sm">{officer.languages.join(' • ')}</p>
              </div>
              
              <button
                onClick={() => toast.success(`Booking appointment with ${officer.name}...`)}
                className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function PreMeetingChecklist() {
  const checklist = [
    { item: 'Company incorporation certificate (original + 2 copies)', status: 'ready' },
    { item: 'Passport and visa copies of all directors', status: 'ready' },
    { item: 'Business plan with financial projections', status: 'ready' },
    { item: 'Bank statement showing capital availability', status: 'pending' },
    { item: 'List of questions for the officer', status: 'ready' },
    { item: 'Previous correspondence (if any)', status: 'ready' }
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-bold">Prepare These Documents Before Meeting</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Come prepared to make the most of your appointment
      </p>
      
      <div className="space-y-2">
        {checklist.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg border-2 flex items-center gap-3 ${
              item.status === 'ready' 
                ? 'bg-green-50 border-green-200' 
                : 'bg-yellow-50 border-yellow-200'
            }`}
          >
            {item.status === 'ready' ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            ) : (
              <Calendar className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            )}
            <span className="text-sm text-gray-900">{item.item}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-800">
          💡 <strong>Pro Tip:</strong> Bring digital copies on USB drive as backup. Officers appreciate organized investors.
        </p>
      </div>
    </div>
  );
}

export function MeetingOutcomeTemplate() {
  return (
    <div className="glass-card p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold">Meeting Outcome Template Preview</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        After your meeting, you'll receive this structured outcome report
      </p>
      
      <div className="p-6 bg-white rounded-lg border-2 border-purple-300">
        <div className="text-center mb-4 pb-4 border-b">
          <div className="text-3xl mb-2">🇧🇩</div>
          <h4 className="font-bold text-lg">Bangladesh Investment Development Authority</h4>
          <p className="text-sm text-gray-600">Official Meeting Outcome Report</p>
        </div>
        
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold text-gray-700">Meeting Date:</p>
            <p className="text-gray-900">February 10, 2026 at 2:00 PM</p>
          </div>
          
          <div>
            <p className="font-semibold text-gray-700">Officer:</p>
            <p className="text-gray-900">Dr. Fatima Rahman, Senior Investment Officer</p>
          </div>
          
          <div>
            <p className="font-semibold text-gray-700">Investor:</p>
            <p className="text-gray-900">John Chen, Textile International Ltd.</p>
          </div>
          
          <div>
            <p className="font-semibold text-gray-700">Discussion Summary:</p>
            <ul className="list-disc list-inside text-gray-900 space-y-1 mt-1">
              <li>Reviewed environmental clearance requirements</li>
              <li>Discussed timeline for zone plot allocation</li>
              <li>Clarified work permit procedures for 5 foreign staff</li>
            </ul>
          </div>
          
          <div>
            <p className="font-semibold text-gray-700">Action Items:</p>
            <div className="space-y-2 mt-2">
              <div className="p-2 bg-blue-50 rounded border border-blue-200">
                <p className="font-medium">Investor to complete:</p>
                <ul className="list-disc list-inside text-xs mt-1">
                  <li>Submit EIA report by Feb 15</li>
                  <li>Upload bank solvency certificate</li>
                </ul>
              </div>
              <div className="p-2 bg-green-50 rounded border border-green-200">
                <p className="font-medium">BIDA to complete:</p>
                <ul className="list-disc list-inside text-xs mt-1">
                  <li>Provide zone infrastructure timeline</li>
                  <li>Fast-track work permit applications</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <p className="font-semibold text-gray-700">Next Meeting:</p>
            <p className="text-gray-900">February 25, 2026 (progress review)</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t flex justify-between items-center">
          <p className="text-xs text-gray-500">Document ID: MTG-2026-02-001</p>
          <button
            onClick={() => toast.success('Downloading meeting report...')}
            className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700"
          >
            <Download className="w-3 h-3 inline mr-1" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * TAB 8 - RJSC: Due Diligence Tool
 */

export function DirectorRiskFlags() {
  const directors = [
    {
      name: 'John Chen',
      passport: 'P1234567',
      nationality: 'Singapore',
      riskChecks: {
        legalCases: 'clear',
        creditScore: 'excellent',
        previousCompanies: '3 active',
        sanctions: 'none',
        pep: 'not listed'
      }
    },
    {
      name: 'Sarah Kim',
      passport: 'K9876543',
      nationality: 'South Korea',
      riskChecks: {
        legalCases: 'clear',
        creditScore: 'good',
        previousCompanies: '1 active',
        sanctions: 'none',
        pep: 'not listed'
      }
    }
  ];

  return (
    <div className="space-y-4">
      {directors.map((director, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{director.name}</h3>
              <p className="text-sm text-gray-600">{director.passport} • {director.nationality}</p>
            </div>
            <div className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-semibold">
              ✓ ALL CLEAR
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-green-600" />
                <p className="text-xs text-gray-600">Legal Cases</p>
              </div>
              <p className="font-semibold text-green-600">No legal cases found ✓</p>
            </div>
            
            <div className="p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-green-600" />
                <p className="text-xs text-gray-600">Credit Score</p>
              </div>
              <p className="font-semibold text-green-600 capitalize">{director.riskChecks.creditScore} ✓</p>
            </div>
            
            <div className="p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Building className="w-4 h-4 text-green-600" />
                <p className="text-xs text-gray-600">Previous Companies</p>
              </div>
              <p className="font-semibold text-green-600">{director.riskChecks.previousCompanies} ✓</p>
            </div>
            
            <div className="p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-green-600" />
                <p className="text-xs text-gray-600">Sanctions Check</p>
              </div>
              <p className="font-semibold text-green-600">None found ✓</p>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-green-100 rounded-lg">
            <p className="text-xs text-green-800">
              ✅ Director passed all due diligence checks. Verified against OFAC, UN, EU sanctions lists.
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function CompanyAgeBadge() {
  return (
    <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <div className="flex items-center gap-4">
        <div className="text-6xl">🏢</div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">Textile International Ltd.</h3>
          <p className="text-sm text-gray-600 mb-3">RJSC Registration: C-123456789</p>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded-lg border border-blue-200 text-center">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-xs text-gray-600">Years Operating</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-green-200 text-center">
              <p className="text-2xl font-bold text-green-600">Active</p>
              <p className="text-xs text-gray-600">Status</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-purple-200 text-center">
              <p className="text-2xl font-bold text-purple-600">AAA</p>
              <p className="text-xs text-gray-600">Credit Rating</p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-xs text-blue-800">
              ✓ Company registered on January 15, 2014. Compliance record: Excellent. 
              No pending legal issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VerificationReportDownload() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Download className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-bold">Download Verification Reports</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Official verification documents you can submit to banks, embassies, and partners
      </p>
      
      <div className="space-y-3">
        <button
          onClick={() => toast.success('Generating Company Verification Report...')}
          className="w-full p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg hover:shadow-lg transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-blue-900">Company Verification Report</p>
              <p className="text-xs text-blue-700">RJSC certified • Valid for 90 days</p>
            </div>
            <Download className="w-5 h-5 text-blue-600" />
          </div>
        </button>
        
        <button
          onClick={() => toast.success('Generating Director Verification Report...')}
          className="w-full p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-lg hover:shadow-lg transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-green-900">Director Due Diligence Report</p>
              <p className="text-xs text-green-700">All directors • Background check included</p>
            </div>
            <Download className="w-5 h-5 text-green-600" />
          </div>
        </button>
        
        <button
          onClick={() => toast.success('Generating Good Standing Certificate...')}
          className="w-full p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg hover:shadow-lg transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-purple-900">Certificate of Good Standing</p>
              <p className="text-xs text-purple-700">For visa applications & bank accounts</p>
            </div>
            <Download className="w-5 h-5 text-purple-600" />
          </div>
        </button>
      </div>
      
      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-700">
          📄 All reports include QR verification codes and can be authenticated at verify.rjsc.gov.bd
        </p>
      </div>
    </div>
  );
}
