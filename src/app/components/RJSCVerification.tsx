import { useState } from 'react';
import { Search, CheckCircle, XCircle, AlertCircle, ArrowRight, Loader2, Building2, FileText, User, CheckCircle2 } from 'lucide-react';
import { API } from '@/app/api/mockAPI';
import { RJSCRegistrationForm } from './RJSCRegistrationForm';
import { DEMO_REGISTRATION_DATA } from '@/app/devtools/demoRegistrationData';
import { InstrumentCard } from './ui-primitives';
import { motion, AnimatePresence } from 'motion/react';

interface RJSCVerificationProps {
  onVerificationComplete?: (details: any) => void;
  isAutoFillDemo?: boolean; // Flag for demo auto-fill mode
}

export function RJSCVerification({ onVerificationComplete, isAutoFillDemo = false }: RJSCVerificationProps = {}) {
  const [companyName, setCompanyName] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [result, setResult] = useState<{
    available: boolean;
    existingCompany?: any;
    suggestions?: string[];
  } | null>(null);

  const checkAvailability = async () => {
    if (!companyName.trim()) return;

    setIsChecking(true);
    setResult(null);

    try {
      const response = await API.rjsc.checkCompanyName(companyName);
      if (response.success && response.data) {
        setResult(response.data);
      }
    } catch (error) {
      console.error('RJSC check failed:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleProceedToRegister = () => {
    // Store the approved company name for use in registration
    sessionStorage.setItem('approvedCompanyName', companyName);
    
    // Show the registration form
    setShowRegistrationForm(true);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReserveName = () => {
    // Store the reserved company name
    sessionStorage.setItem('reservedCompanyName', companyName);
    
    // Show success notification
    alert(`✅ Company name "${companyName}" has been reserved for 60 days.\n\nReservation ID: RES-${Date.now()}\n\nYou can complete registration at any time within the validity period.`);
  };

  const handleBackToVerification = () => {
    setShowRegistrationForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistrationComplete = (details: any) => {
    // Call the parent's verification complete callback
    if (onVerificationComplete) {
      onVerificationComplete(details);
    }
  };

  // If registration form is active, show it
  if (showRegistrationForm) {
    return (
      <RJSCRegistrationForm 
        prefilledCompanyName={companyName} 
        onBack={handleBackToVerification}
        onComplete={handleRegistrationComplete}
      />
    );
  }

  return (
    <div className="space-y-6">
      <InstrumentCard>
        <div className="p-8 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">RJSC Company Name Verification</h3>
              <p className="text-sm text-gray-600">Check company name availability in Bangladesh</p>
            </div>
          </div>

          {/* Search Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">Company Name</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkAvailability()}
                placeholder="Enter proposed company name..."
                className="flex-1 px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
              />
              <button
                onClick={checkAvailability}
                disabled={!companyName.trim() || isChecking}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isChecking ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Check
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {result.available ? (
                  <InstrumentCard>
                    <div className="p-6 bg-emerald-50">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-emerald-900 mb-2">
                            ✓ Name Available!
                          </h4>
                          <p className="text-emerald-800 mb-4">
                            "<span className="font-semibold">{companyName}</span>" is available for registration with RJSC.
                          </p>

                          {result.suggestions && result.suggestions.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium text-emerald-900 mb-2">Similar available names:</p>
                              <div className="space-y-2">
                                {result.suggestions.map((suggestion, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setCompanyName(suggestion)}
                                    className="block w-full px-4 py-2 bg-white border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-all text-left"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="mt-6 flex gap-3">
                            <button
                              onClick={handleProceedToRegister}
                              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
                            >
                              Proceed to Register
                            </button>
                            <button
                              onClick={handleReserveName}
                              className="px-6 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-all"
                            >
                              Reserve Name
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </InstrumentCard>
                ) : (
                  <InstrumentCard>
                    <div className="p-6 bg-red-50">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                          <XCircle className="w-7 h-7 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-red-900 mb-2">
                            Name Not Available
                          </h4>
                          <p className="text-red-800 mb-4">
                            "<span className="font-semibold">{companyName}</span>" is already registered.
                          </p>

                          {result.existingCompany && (
                            <InstrumentCard>
                              <div className="p-8">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-medium mb-3 flex items-center gap-2">
                                      <FileText className="w-4 h-4" />
                                      Existing Company Details:
                                    </h5>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600">Name:</span>
                                        <span className="font-medium">{result.existingCompany.name}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600">Status:</span>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                          result.existingCompany.status === 'registered' 
                                            ? 'bg-emerald-100 text-emerald-700' 
                                            : 'bg-orange-100 text-orange-700'
                                        }`}>
                                          {result.existingCompany.status}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600">Registration No:</span>
                                        <span className="font-mono text-xs">{result.existingCompany.registrationNo}</span>
                                      </div>
                                      {result.existingCompany.directors && result.existingCompany.directors.length > 0 && (
                                        <div className="flex items-start gap-2">
                                          <User className="w-4 h-4 text-gray-500 mt-0.5" />
                                          <span className="text-gray-600">Directors:</span>
                                          <span className="font-medium">{result.existingCompany.directors.join(', ')}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </InstrumentCard>
                          )}

                          <InstrumentCard>
                            <div className="p-3 bg-blue-50">
                              <p className="text-sm text-blue-800 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <span>Try modifying the name by adding "Limited", "Bangladesh", "Industries", or your sector name.</span>
                              </p>
                            </div>
                          </InstrumentCard>

                          <button
                            onClick={() => {
                              setCompanyName('');
                              setResult(null);
                            }}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                          >
                            Try Different Name
                          </button>
                        </div>
                      </div>
                    </div>
                  </InstrumentCard>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Section */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <InstrumentCard>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-blue-900">Name Requirements</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Must be unique</li>
                  <li>• Cannot be offensive or misleading</li>
                  <li>• Should reflect business nature</li>
                  <li>• Must end with appropriate suffix (Ltd, Pvt Ltd, etc.)</li>
                </ul>
              </div>
            </InstrumentCard>

            <InstrumentCard>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-purple-900">Processing Time</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Name approval: Instant</li>
                  <li>• Name reservation: 60 days validity</li>
                  <li>• Full registration: 2-3 business days</li>
                  <li>• SLA: 72 hours maximum</li>
                </ul>
              </div>
            </InstrumentCard>
          </div>
        </div>
      </InstrumentCard>

      {/* Registration Guide */}
      <InstrumentCard>
        <div className="p-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Next Steps After Name Approval
          </h3>
          <div className="space-y-3">
            {[
              { step: 1, title: 'Prepare Documents', desc: 'Memorandum & Articles of Association, ID proofs, address proof' },
              { step: 2, title: 'Pay Registration Fee', desc: 'BDT 25,000 - 50,000 depending on authorized capital' },
              { step: 3, title: 'Submit Application', desc: 'Online through RJSC portal or visit RJSC office' },
              { step: 4, title: 'Receive Certificate', desc: 'Get Certificate of Incorporation within 72 hours' }
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </InstrumentCard>
    </div>
  );
}