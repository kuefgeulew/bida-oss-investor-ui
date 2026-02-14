// 📦 STARTER PACKAGE WIZARD — Sequential onboarding flow  
// ARCHITECTURE: UI layer. Guides new investors through essential services.

import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Building2, CreditCard, FileText, Shield, Zap } from 'lucide-react';
import { RJSCVerification } from '@/app/components/RJSCVerification';
import { BankProfileIntegration } from '@/app/bank-integration/BankProfileIntegration';
import { PaymentCenter } from '@/app/payments/PaymentCenter';
import { registerBBID } from '@/app/bbid/bbidEngine';
import { glassCard } from '@/app/config/designSystem';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { DEMO_REGISTRATION_DATA } from '@/app/devtools/demoRegistrationData';
import { seedDemoInvestorFromRegistration } from '@/app/devtools/seedDemoInvestorFromRegistration';
import { PackageTierSelector } from './PackageTierSelector';
import { VATRegistration } from './services/VATRegistration';
import { IRCERCRegistration } from './services/IRCERCRegistration';
import { EPFRegistration } from './services/EPFRegistration';
import { SocialSecurityRegistration } from './services/SocialSecurityRegistration';
import { FactoryRegistration } from './services/FactoryRegistration';
import { EnvironmentalClearance } from './services/EnvironmentalClearance';
import { type PackageTier } from './packageTiers';

interface StarterPackageWizardProps {
  investorId: string;
  investorName: string;
  onComplete: (bbid: string) => void;
  onSkip?: () => void;
}

type WizardStep = 
  | 'welcome'
  | 'package-selection'
  | 'rjsc'
  | 'bbid'
  | 'bank'
  | 'etin'
  | 'trade-license'
  | 'post-incorporation-intro'
  | 'vat'
  | 'irc-erc'
  | 'epf'
  | 'social-security'
  | 'factory-registration'
  | 'environmental-clearance'
  | 'complete';

const STEPS: Array<{ id: WizardStep; label: string; icon: any }> = [
  { id: 'welcome', label: 'Welcome', icon: Shield },
  { id: 'package-selection', label: 'Package Selection', icon: Zap },
  { id: 'rjsc', label: 'Company Registration', icon: Building2 },
  { id: 'bbid', label: 'Business ID', icon: Shield },
  { id: 'bank', label: 'Bank Account', icon: CreditCard },
  { id: 'etin', label: 'Tax Registration', icon: FileText },
  { id: 'trade-license', label: 'Trade License', icon: FileText },
  { id: 'post-incorporation-intro', label: 'Post-Incorporation Services', icon: Building2 },
  { id: 'vat', label: 'VAT Registration', icon: FileText },
  { id: 'irc-erc', label: 'IRC/ERC Registration', icon: FileText },
  { id: 'epf', label: 'EPF Registration', icon: FileText },
  { id: 'social-security', label: 'Social Security Registration', icon: FileText },
  { id: 'factory-registration', label: 'Factory Registration', icon: FileText },
  { id: 'environmental-clearance', label: 'Environmental Clearance', icon: FileText },
  { id: 'complete', label: 'Complete', icon: CheckCircle },
];

export function StarterPackageWizard({ 
  investorId, 
  investorName,
  onComplete,
  onSkip 
}: StarterPackageWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>('welcome');
  const [completedSteps, setCompletedSteps] = useState<Set<WizardStep>>(new Set());
  const [bbid, setBbid] = useState<string>('');
  const [rjscVerified, setRjscVerified] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [isAutoFillMode, setIsAutoFillMode] = useState(false);
  const [selectedPackageTier, setSelectedPackageTier] = useState<PackageTier | null>(null);

  // 🎯 CONDITIONAL STEP LOGIC - Determine which steps to show based on package tier
  const shouldShowStep = (step: WizardStep): boolean => {
    if (!selectedPackageTier) return true; // Show all steps if no tier selected yet
    
    const tier = selectedPackageTier.id;
    
    // Core steps (always shown)
    const coreSteps: WizardStep[] = ['welcome', 'package-selection', 'rjsc', 'bbid', 'bank', 'etin', 'trade-license', 'complete'];
    if (coreSteps.includes(step)) return true;
    
    // Post-incorporation intro (shown for Standard and Premium)
    if (step === 'post-incorporation-intro' && (tier === 'standard' || tier === 'premium')) return true;
    
    // Standard tier steps (5 days): VAT + IRC/ERC
    if ((step === 'vat' || step === 'irc-erc') && (tier === 'standard' || tier === 'premium')) return true;
    
    // Premium tier steps (7 days): EPF + Social Security + Factory + Environmental
    if ((step === 'epf' || step === 'social-security' || step === 'factory-registration' || step === 'environmental-clearance') && tier === 'premium') return true;
    
    return false;
  };

  // Get the next visible step
  const getNextStep = (current: WizardStep): WizardStep | null => {
    const currentIndex = STEPS.findIndex(s => s.id === current);
    for (let i = currentIndex + 1; i < STEPS.length; i++) {
      if (shouldShowStep(STEPS[i].id)) {
        return STEPS[i].id;
      }
    }
    return null;
  };

  // Get the previous visible step
  const getPreviousStep = (current: WizardStep): WizardStep | null => {
    const currentIndex = STEPS.findIndex(s => s.id === current);
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (shouldShowStep(STEPS[i].id)) {
        return STEPS[i].id;
      }
    }
    return null;
  };

  // 🎯 DETECT DEMO AUTO-FILL MODE
  useEffect(() => {
    if (import.meta.env.DEV && investorId === 'newdemo@investor.bd') {
      setIsAutoFillMode(true);
      console.log('[DEMO MODE] Auto-fill registration detected');
    }
  }, [investorId]);

  // 🚀 AUTO-FILL DEMO: Seed engines immediately on welcome screen
  const handleDemoAutoFillStart = async () => {
    if (!import.meta.env.DEV) return;
    
    try {
      toast.info('🚀 Auto-filling demo registration...');
      
      // Seed all engines with demo data
      const generatedBBID = await seedDemoInvestorFromRegistration({
        ...DEMO_REGISTRATION_DATA,
        email: investorId,
      });
      
      setBbid(generatedBBID);
      setCompanyDetails({
        companyName: DEMO_REGISTRATION_DATA.companyName,
        sector: DEMO_REGISTRATION_DATA.sector,
        address: DEMO_REGISTRATION_DATA.address,
      });
      setRjscVerified(true);
      
      // Mark all steps as complete
      STEPS.forEach(step => markStepComplete(step.id));
      
      toast.success(`✅ Demo registration complete! BBID: ${generatedBBID}`);
      
      // Jump to complete screen
      setTimeout(() => {
        setCurrentStep('complete');
      }, 1000);
      
    } catch (error) {
      console.error('[DEMO MODE] Auto-fill failed:', error);
      toast.error('Demo auto-fill failed. Please try manual registration.');
    }
  };

  const currentStepIndex = STEPS.findIndex(s => s.id === currentStep);
  const progressPercentage = ((currentStepIndex + 1) / STEPS.length) * 100;

  const markStepComplete = (step: WizardStep) => {
    setCompletedSteps(prev => new Set([...prev, step]));
  };

  const goToNext = () => {
    const nextStep = getNextStep(currentStep);
    if (nextStep) {
      markStepComplete(currentStep);
      setCurrentStep(nextStep);
    }
  };

  const goToPrevious = () => {
    const prevStep = getPreviousStep(currentStep);
    if (prevStep) {
      setCurrentStep(prevStep);
    }
  };

  const handleRJSCVerified = (details: any) => {
    setRjscVerified(true);
    setCompanyDetails(details);
    toast.success('RJSC registration completed!');
    // Automatically advance to next step
    setTimeout(() => {
      markStepComplete('rjsc');
      goToNext();
    }, 1500); // Small delay to let user see the success message
  };

  const handleBBIDGeneration = () => {
    if (!companyDetails) {
      toast.error('Please complete RJSC verification first');
      return;
    }

    // Generate BBID
    const newBBID = registerBBID(
      companyDetails.companyName || investorName,
      companyDetails.sector || 'Services',
      'private_limited',
      {
        division: 'Dhaka',
        district: 'Dhaka',
        area: 'Gulshan',
        address: companyDetails.address || 'Not provided',
        postalCode: '1212'
      },
      investorId
    );

    setBbid(newBBID.bbid);
    toast.success(`BBID Generated: ${newBBID.bbid}`);
    markStepComplete('bbid');
    goToNext();
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      // Skip to complete
      setCurrentStep('complete');
    }
  };

  // Welcome Screen
  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${glassCard} max-w-2xl w-full p-12 text-center`}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to OSS Starter Package
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We'll guide you through essential steps to get your business started in Bangladesh. 
            This process typically takes 30-45 minutes.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Fast Track Setup</h3>
              </div>
              <p className="text-sm text-gray-600">Complete all essential registrations in one session</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">Integrated Services</h3>
              </div>
              <p className="text-sm text-gray-600">All government agencies in one place</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold">BBID Generation</h3>
              </div>
              <p className="text-sm text-gray-600">Get your unique Bangladesh Business ID</p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold">Bank Integration</h3>
              </div>
              <p className="text-sm text-gray-600">Direct connection to banking services</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={goToNext}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2"
            >
              Start Setup
              <ArrowRight className="w-5 h-5" />
            </button>
            
            {onSkip && (
              <button
                onClick={handleSkip}
                className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all"
              >
                Skip for Now
              </button>
            )}
          </div>

          {/* 🚀 AUTO-FILL DEMO BUTTON */}
          {isAutoFillMode && (
            <button
              onClick={handleDemoAutoFillStart}
              className="mt-4 px-8 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium"
            >
              Auto-fill Demo Registration
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  // Complete Screen
  if (currentStep === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${glassCard} max-w-2xl w-full p-12 text-center`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎉 Setup Complete!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your business is now registered in Bangladesh. You can start your investment journey.
          </p>

          {bbid && (
            <div className="p-6 bg-blue-50 rounded-xl mb-6">
              <div className="text-sm text-gray-600 mb-2">Your Business ID</div>
              <div className="text-3xl font-mono font-bold text-blue-600">{bbid}</div>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {Array.from(completedSteps).map((step, idx) => {
              const stepInfo = STEPS.find(s => s.id === step);
              if (!stepInfo) return null;
              const Icon = stepInfo.icon;
              return (
                <div key={step} className="p-4 bg-white rounded-lg border border-gray-200">
                  <Icon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">{stepInfo.label}</div>
                  <div className="text-xs text-green-600">✓ Completed</div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => bbid && onComplete(bbid)}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  // Main Wizard Flow
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">OSS Starter Package</h2>
          <span className="text-sm text-gray-600">
            Step {currentStepIndex + 1} of {STEPS.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = completedSteps.has(step.id);
            const isCurrent = step.id === currentStep;
            
            return (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  idx === 0 || idx === STEPS.length - 1 ? '' : 'flex-1'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <div className="text-xs text-center mt-1 hidden md:block">{step.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={glassCard}
          >
            {/* Package Selection Step */}
            {currentStep === 'package-selection' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Your Package Tier</h2>
                <p className="text-gray-600 mb-6">
                  Choose the package that best suits your business needs
                </p>
                
                <PackageTierSelector 
                  onSelectPackage={(tier) => {
                    setSelectedPackageTier(tier);
                    toast.success(`${tier.name} selected!`);
                    markStepComplete('package-selection');
                    goToNext();
                  }}
                />
              </div>
            )}

            {/* RJSC Step */}
            {currentStep === 'rjsc' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Registration (RJSC)</h2>
                <p className="text-gray-600 mb-6">
                  Verify your company registration with the Registrar of Joint Stock Companies
                </p>
                
                <RJSCVerification onVerificationComplete={handleRJSCVerified} />
                
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={goToPrevious}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  
                  <button
                    onClick={goToNext}
                    disabled={!rjscVerified}
                    className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                      rjscVerified
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* BBID Step */}
            {currentStep === 'bbid' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Generate Business ID (BBID)</h2>
                <p className="text-gray-600 mb-6">
                  Your unique Bangladesh Business Identification Number
                </p>
                
                {companyDetails && (
                  <div className="p-6 bg-blue-50 rounded-xl mb-6">
                    <h3 className="font-semibold mb-3">Company Information</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Company Name:</span>
                        <div className="font-medium">{companyDetails.companyName || investorName}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Sector:</span>
                        <div className="font-medium">{companyDetails.sector || 'Services'}</div>
                      </div>
                    </div>
                  </div>
                )}

                {!bbid ? (
                  <button
                    onClick={handleBBIDGeneration}
                    disabled={!rjscVerified}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    Generate BBID
                  </button>
                ) : (
                  <div className="p-6 bg-green-50 rounded-xl text-center">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <div className="text-sm text-gray-600 mb-2">Your BBID</div>
                    <div className="text-3xl font-mono font-bold text-green-600">{bbid}</div>
                  </div>
                )}
                
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={goToPrevious}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  
                  {bbid && (
                    <button
                      onClick={goToNext}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Bank Step */}
            {currentStep === 'bank' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Bank Account Setup</h2>
                <p className="text-gray-600 mb-6">
                  Connect with partner banks for corporate account opening
                </p>
                
                <BankProfileIntegration 
                  investorId={investorId} 
                  investorName={investorName}
                />
                
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={goToPrevious}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  
                  <button
                    onClick={goToNext}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* eTIN Step */}
            {currentStep === 'etin' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Tax Registration (eTIN)</h2>
                <p className="text-gray-600 mb-6">
                  Register for Electronic Tax Identification Number with NBR
                </p>
                
                <div className="p-6 bg-yellow-50 rounded-xl mb-6">
                  <h3 className="font-semibold mb-3">Required Documents</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Incorporation Certificate (from RJSC)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Trade License
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Bank Account Details
                    </li>
                  </ul>
                </div>

                <div className="text-center p-8 bg-gray-50 rounded-xl">
                  <FileText className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    eTIN application will be submitted to NBR automatically
                  </p>
                  <button
                    onClick={() => {
                      toast.success('eTIN application submitted to NBR');
                      markStepComplete('etin');
                      goToNext();
                    }}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                  >
                    Submit eTIN Application
                  </button>
                </div>
                
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={goToPrevious}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                </div>
              </div>
            )}

            {/* Trade License Step */}
            {currentStep === 'trade-license' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Trade License</h2>
                <p className="text-gray-600 mb-6">
                  Apply for trade license from your City Corporation
                </p>
                
                <div className="p-6 bg-purple-50 rounded-xl mb-6">
                  <h3 className="font-semibold mb-3">Application Details</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Authority:</span>
                      <div className="font-medium">Dhaka South City Corporation</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Processing Time:</span>
                      <div className="font-medium">10 days</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Fee:</span>
                      <div className="font-medium">5,000 BDT</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Validity:</span>
                      <div className="font-medium">1 year (renewable)</div>
                    </div>
                  </div>
                </div>

                {bbid && (
                  <PaymentCenter bbid={bbid} investorId={investorId} />
                )}
                
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={goToPrevious}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  
                  <button
                    onClick={() => {
                      markStepComplete('trade-license');
                      setCurrentStep('complete');
                    }}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2"
                  >
                    Complete Setup
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Post-Incorporation Intro Step */}
            {currentStep === 'post-incorporation-intro' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Post-Incorporation Services</h2>
                <p className="text-gray-600 mb-6">
                  Choose additional services to support your business growth
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold">VAT Registration</h3>
                    </div>
                    <p className="text-sm text-gray-600">Register for Value Added Tax</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold">IRC/ERC Registration</h3>
                    </div>
                    <p className="text-sm text-gray-600">Register for Import/Export Clearance</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold">EPF Registration</h3>
                    </div>
                    <p className="text-sm text-gray-600">Register for Employee Provident Fund</p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5 text-orange-600" />
                      <h3 className="font-semibold">Social Security Registration</h3>
                    </div>
                    <p className="text-sm text-gray-600">Register for Social Security</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-gray-600" />
                      <h3 className="font-semibold">Factory Registration</h3>
                    </div>
                    <p className="text-sm text-gray-600">Register your factory with the government</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-gray-600" />
                      <h3 className="font-semibold">Environmental Clearance</h3>
                    </div>
                    <p className="text-sm text-gray-600">Obtain environmental clearance for your operations</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={goToPrevious}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  
                  <button
                    onClick={goToNext}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* VAT Registration Step */}
            {currentStep === 'vat' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">VAT Registration</h2>
                <p className="text-gray-600 mb-6">
                  Register for Value Added Tax with the Bangladesh National Board of Revenue (NBR)
                </p>
                
                <VATRegistration bbid={bbid} investorId={investorId} />
                
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={goToPrevious}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  
                  <button
                    onClick={goToNext}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* IRC/ERC Registration Step */}
            {currentStep === 'irc-erc' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">IRC/ERC Registration</h2>
                <p className="text-gray-600 mb-6">
                  Register for Import/Export Clearance with the Bangladesh National Board of Revenue (NBR)
                </p>
                
                <IRCERCRegistration bbid={bbid} investorId={investorId} />
                
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={goToPrevious}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  
                  <button
                    onClick={goToNext}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* EPF Registration Step */}
            {currentStep === 'epf' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">EPF Registration</h2>
                <p className="text-gray-600 mb-6">
                  Register for Employee Provident Fund with the Bangladesh National Board of Revenue (NBR)
                </p>
                
                <EPFRegistration bbid={bbid} investorId={investorId} />
                
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={goToPrevious}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  
                  <button
                    onClick={goToNext}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Social Security Registration Step */}
            {currentStep === 'social-security' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Social Security Registration</h2>
                <p className="text-gray-600 mb-6">
                  Register for Social Security with the Bangladesh National Board of Revenue (NBR)
                </p>
                
                <SocialSecurityRegistration bbid={bbid} investorId={investorId} />
                
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={goToPrevious}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  
                  <button
                    onClick={goToNext}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Factory Registration Step */}
            {currentStep === 'factory-registration' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Factory Registration</h2>
                <p className="text-gray-600 mb-6">
                  Register your factory with the Bangladesh National Board of Revenue (NBR)
                </p>
                
                <FactoryRegistration bbid={bbid} investorId={investorId} />
                
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={goToPrevious}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  
                  <button
                    onClick={goToNext}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Environmental Clearance Step */}
            {currentStep === 'environmental-clearance' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Environmental Clearance</h2>
                <p className="text-gray-600 mb-6">
                  Obtain environmental clearance for your operations with the Bangladesh National Board of Revenue (NBR)
                </p>
                
                <EnvironmentalClearance bbid={bbid} investorId={investorId} />
                
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={goToPrevious}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  
                  <button
                    onClick={goToNext}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}