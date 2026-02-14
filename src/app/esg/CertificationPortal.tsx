// Certification Application Portal - Apply for ISO 14001, LEED, B Corp, Fair Trade
// Mounts in: ESG Panel

import React, { useState } from 'react';
import { Award, CheckCircle, Clock, FileText, Upload, Send, Download, ExternalLink, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Certification {
  id: string;
  name: string;
  category: 'environmental' | 'social' | 'governance';
  description: string;
  benefits: string[];
  requirements: string[];
  cost: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  provider: string;
  website: string;
  icon: string;
  esgBonus: number;
}

interface Application {
  id: string;
  certificationId: string;
  certificationName: string;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
  submittedDate?: string;
  reviewDate?: string;
  expiryDate?: string;
  documents: string[];
  notes: string;
}

interface CertificationPortalProps {
  investorId: string;
  onCertificationGranted: (certId: string) => void;
}

export function CertificationPortal({ investorId, onCertificationGranted }: CertificationPortalProps) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'app-001',
      certificationId: 'iso-14001',
      certificationName: 'ISO 14001',
      status: 'under-review',
      submittedDate: '2026-01-15',
      documents: ['EMS Manual', 'Environmental Policy', 'Objectives'],
      notes: 'Initial audit scheduled for Feb 20',
    },
  ]);
  
  const certifications: Certification[] = [
    {
      id: 'iso-14001',
      name: 'ISO 14001:2015',
      category: 'environmental',
      description: 'International standard for Environmental Management Systems (EMS)',
      benefits: [
        'Reduced waste and energy consumption',
        'Enhanced regulatory compliance',
        'Improved public image',
        'Better environmental performance',
        '+12 ESG score bonus',
      ],
      requirements: [
        'Environmental policy statement',
        'Objectives and targets',
        'Environmental management system documentation',
        'Internal audit program',
        'Management review process',
      ],
      cost: 'BDT 250,000 - 500,000',
      duration: '6-12 months',
      difficulty: 'intermediate',
      provider: 'ISO',
      website: 'https://www.iso.org/iso-14001',
      icon: '🌍',
      esgBonus: 12,
    },
    {
      id: 'leed',
      name: 'LEED Certification',
      category: 'environmental',
      description: 'Leadership in Energy and Environmental Design for green buildings',
      benefits: [
        '20-30% energy savings',
        'Lower operating costs',
        'Healthier workspace',
        'Marketing advantage',
        '+15 ESG score bonus',
      ],
      requirements: [
        'Energy efficiency measures',
        'Water conservation',
        'Sustainable materials',
        'Indoor environmental quality',
        'Innovation in design',
      ],
      cost: 'BDT 500,000 - 1,500,000',
      duration: '8-18 months',
      difficulty: 'advanced',
      provider: 'USGBC',
      website: 'https://www.usgbc.org/leed',
      icon: '🏢',
      esgBonus: 15,
    },
    {
      id: 'b-corp',
      name: 'B Corp Certification',
      category: 'governance',
      description: 'Certified Benefit Corporation for social and environmental performance',
      benefits: [
        'Attract impact investors',
        'Competitive advantage',
        'Employee retention',
        'Legal protection for mission',
        '+20 ESG score bonus',
      ],
      requirements: [
        'B Impact Assessment (80+ score)',
        'Legal accountability',
        'Transparency requirements',
        'Annual recertification',
      ],
      cost: 'BDT 150,000 - 300,000/year',
      duration: '3-6 months',
      difficulty: 'advanced',
      provider: 'B Lab',
      website: 'https://www.bcorporation.net',
      icon: '🅱️',
      esgBonus: 20,
    },
    {
      id: 'fair-trade',
      name: 'Fair Trade Certified',
      category: 'social',
      description: 'Certification for ethical sourcing and fair labor practices',
      benefits: [
        'Premium pricing',
        'Access to ethical markets',
        'Worker empowerment',
        'Community development',
        '+15 ESG score bonus',
      ],
      requirements: [
        'Fair wages and working conditions',
        'Direct trade relationships',
        'Democratic organization',
        'Environmental standards',
        'Community premium fund',
      ],
      cost: 'BDT 200,000 - 400,000',
      duration: '4-10 months',
      difficulty: 'intermediate',
      provider: 'Fair Trade International',
      website: 'https://www.fairtrade.net',
      icon: '🤝',
      esgBonus: 15,
    },
    {
      id: 'iso-45001',
      name: 'ISO 45001:2018',
      category: 'social',
      description: 'Occupational Health and Safety Management System',
      benefits: [
        'Reduced workplace accidents',
        'Lower insurance costs',
        'Better employee morale',
        'Legal compliance',
        '+10 ESG score bonus',
      ],
      requirements: [
        'OH&S policy and objectives',
        'Hazard identification process',
        'Risk assessment procedures',
        'Incident investigation system',
        'Worker participation',
      ],
      cost: 'BDT 200,000 - 400,000',
      duration: '5-9 months',
      difficulty: 'intermediate',
      provider: 'ISO',
      website: 'https://www.iso.org/iso-45001',
      icon: '⚡',
      esgBonus: 10,
    },
    {
      id: 'gots',
      name: 'GOTS Certification',
      category: 'environmental',
      description: 'Global Organic Textile Standard for organic fiber products',
      benefits: [
        'Access to premium markets',
        'Brand differentiation',
        'Environmental credibility',
        'Supply chain transparency',
        '+12 ESG score bonus',
      ],
      requirements: [
        'Organic fiber content (70%+)',
        'No toxic chemicals',
        'Wastewater treatment',
        'Social criteria compliance',
        'Annual inspection',
      ],
      cost: 'BDT 180,000 - 350,000',
      duration: '6-12 months',
      difficulty: 'intermediate',
      provider: 'GOTS',
      website: 'https://www.global-standard.org',
      icon: '🧵',
      esgBonus: 12,
    },
  ];
  
  const handleStartApplication = (cert: Certification) => {
    setSelectedCert(cert);
    setShowApplication(true);
  };
  
  const handleSubmitApplication = () => {
    if (!selectedCert) return;
    
    const newApp: Application = {
      id: `app-${Date.now()}`,
      certificationId: selectedCert.id,
      certificationName: selectedCert.name,
      status: 'submitted',
      submittedDate: new Date().toISOString().slice(0, 10),
      documents: [],
      notes: 'Application submitted - awaiting initial review',
    };
    
    setApplications([newApp, ...applications]);
    
    toast.success(`Application submitted for ${selectedCert.name}!`, {
      description: 'You will receive a confirmation email within 2 business days.',
    });
    
    setShowApplication(false);
    setSelectedCert(null);
  };
  
  const handleUploadToWallet = (certId: string) => {
    toast.success('Certificate uploaded to Golden Wallet!', {
      description: 'Now visible to all stakeholders',
    });
    
    onCertificationGranted(certId);
  };
  
  const getDifficultyColor = (difficulty: Certification['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-300';
    }
  };
  
  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
    }
  };
  
  const getCategoryColor = (category: Certification['category']) => {
    switch (category) {
      case 'environmental': return 'text-green-600';
      case 'social': return 'text-blue-600';
      case 'governance': return 'text-purple-600';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Certification Application Portal</h2>
        </div>
        <p className="text-amber-100">Apply for ESG certifications and track application status</p>
      </div>
      
      {/* My Applications */}
      {applications.length > 0 && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">My Applications ({applications.length})</h3>
          
          <div className="space-y-3">
            {applications.map(app => (
              <div
                key={app.id}
                className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{app.certificationName}</h4>
                    <div className="text-sm text-gray-600">
                      Application ID: {app.id}
                    </div>
                  </div>
                  
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${getStatusColor(app.status)}`}>
                    {app.status.toUpperCase().replace('-', ' ')}
                  </span>
                </div>
                
                {app.submittedDate && (
                  <div className="text-sm text-gray-600 mb-2">
                    Submitted: {new Date(app.submittedDate).toLocaleDateString()}
                  </div>
                )}
                
                {app.notes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <p className="text-sm text-blue-900">{app.notes}</p>
                  </div>
                )}
                
                {app.status === 'approved' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUploadToWallet(app.certificationId)}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload to Golden Wallet
                    </button>
                    
                    <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Certificate
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Available Certifications */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Available Certifications</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map(cert => (
            <div
              key={cert.id}
              className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{cert.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{cert.name}</h4>
                    <div className={`text-sm font-semibold capitalize ${getCategoryColor(cert.category)}`}>
                      {cert.category}
                    </div>
                  </div>
                </div>
                
                <span className={`text-xs px-3 py-1 rounded-full font-bold border-2 ${getDifficultyColor(cert.difficulty)}`}>
                  {cert.difficulty.toUpperCase()}
                </span>
              </div>
              
              <p className="text-sm text-gray-700 mb-4">{cert.description}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="text-xs text-blue-600 mb-1">Duration</div>
                  <div className="font-bold text-blue-900">{cert.duration}</div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="text-xs text-green-600 mb-1">ESG Bonus</div>
                  <div className="font-bold text-green-900">+{cert.esgBonus} points</div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200 col-span-2">
                  <div className="text-xs text-orange-600 mb-1">Investment</div>
                  <div className="font-bold text-orange-900">{cert.cost}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-xs font-semibold text-gray-700 mb-2">Key Benefits:</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {cert.benefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx}>• {benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleStartApplication(cert)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Apply Now
                </button>
                
                <a
                  href={cert.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Application Modal */}
      {showApplication && selectedCert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold">Apply for {selectedCert.name}</h3>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Requirements Checklist */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Requirements:</h4>
                <div className="space-y-2">
                  {selectedCert.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <input
                        type="checkbox"
                        className="mt-1 w-5 h-5 text-amber-600"
                      />
                      <span className="text-sm text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Document Upload */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Upload Documents:</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to select</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Choose Files
                  </button>
                </div>
              </div>
              
              {/* Benefits Preview */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-900 mb-2">Upon Certification You'll Receive:</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  {selectedCert.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Next Steps */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">Next Steps:</h4>
                <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                  <li>Submit application and documents</li>
                  <li>Initial review by {selectedCert.provider} (5-10 business days)</li>
                  <li>On-site audit scheduled (if applicable)</li>
                  <li>Final review and decision</li>
                  <li>Certificate issued to Golden Wallet</li>
                </ol>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmitApplication}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Submit Application
                </button>
                
                <button
                  onClick={() => {
                    setShowApplication(false);
                    setSelectedCert(null);
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Help Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          Need Help?
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-semibold text-blue-900 mb-2">📞 Certification Support</div>
            <p className="text-blue-800">Call: +880-2-9876543</p>
            <p className="text-blue-800">Email: certifications@bida.gov.bd</p>
          </div>
          
          <div>
            <div className="font-semibold text-blue-900 mb-2">💰 Financing Available</div>
            <p className="text-blue-800">IDCOL Green Financing: Up to 70% subsidy</p>
            <p className="text-blue-800">Bangladesh Bank Green Fund: Low-interest loans</p>
          </div>
        </div>
      </div>
    </div>
  );
}
