import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowLeft, ArrowRight, Factory, ShoppingBag, Stethoscope, Home } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from './LanguageContext';
import { InstrumentCard, InstrumentSection } from './ui-primitives';

interface OnboardingWizardProps {
  onComplete: () => void;
  onBack?: () => void;
}

const businessTypes = [
  {
    id: 'manufacturing',
    name: 'Manufacturing Plant',
    icon: Factory,
    description: 'Industrial production facility',
    color: 'from-blue-500 to-blue-600',
    steps: [
      { title: 'Company Registration', agency: 'RJSC', sla: '3 days' },
      { title: 'Trade License', agency: 'City Corporation', sla: '5 days' },
      { title: 'Environmental Clearance', agency: 'DOE', sla: '15 days' },
      { title: 'Fire Safety Certificate', agency: 'Fire Service', sla: '7 days' },
      { title: 'Factory License', agency: 'DIFE', sla: '10 days' },
      { title: 'Utility Connections', agency: 'DESCO/DESA', sla: '7 days' },
      { title: 'Bank Account Setup', agency: 'Partner Banks', sla: '2 days' },
    ],
  },
  {
    id: 'trading',
    name: 'Trading Company',
    icon: ShoppingBag,
    description: 'Import/export business',
    color: 'from-green-500 to-green-600',
    steps: [
      { title: 'Company Registration', agency: 'RJSC', sla: '3 days' },
      { title: 'Trade License', agency: 'City Corporation', sla: '5 days' },
      { title: 'Import Registration Certificate', agency: 'CCI&E', sla: '7 days' },
      { title: 'Bank Account Setup', agency: 'Partner Banks', sla: '2 days' },
      { title: 'TIN Certificate', agency: 'NBR', sla: '1 day' },
    ],
  },
  {
    id: 'pharma',
    name: 'Pharmaceutical Company',
    icon: Stethoscope,
    description: 'Medicine manufacturing',
    color: 'from-purple-500 to-purple-600',
    steps: [
      { title: 'Company Registration', agency: 'RJSC', sla: '3 days' },
      { title: 'Drug License', agency: 'DGDA', sla: '20 days' },
      { title: 'Environmental Clearance', agency: 'DOE', sla: '15 days' },
      { title: 'Factory License', agency: 'DIFE', sla: '10 days' },
      { title: 'GMP Certification', agency: 'DGDA', sla: '30 days' },
      { title: 'Utility Connections', agency: 'DESCO/DESA', sla: '7 days' },
      { title: 'Bank Account Setup', agency: 'Partner Banks', sla: '2 days' },
    ],
  },
  {
    id: 'real-estate',
    name: 'Real Estate Development',
    icon: Home,
    description: 'Property development',
    color: 'from-orange-500 to-orange-600',
    steps: [
      { title: 'Company Registration', agency: 'RJSC', sla: '3 days' },
      { title: 'RAJUK Approval', agency: 'RAJUK', sla: '45 days' },
      { title: 'Land Registration', agency: 'Land Office', sla: '10 days' },
      { title: 'Environmental Clearance', agency: 'DOE', sla: '15 days' },
      { title: 'Utility Connections', agency: 'WASA/DESCO', sla: '10 days' },
      { title: 'Bank Account Setup', agency: 'Partner Banks', sla: '2 days' },
    ],
  },
];

export function OnboardingWizard({ onComplete, onBack }: OnboardingWizardProps) {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedBusiness = businessTypes.find((b) => b.id === selectedType);

  const handleConfirm = async () => {
    if (!selectedBusiness) return;
    
    setLoading(true);
    
    // Generate application number
    setTimeout(() => {
      const applicationNo = `APP-${Date.now().toString().slice(-8)}`;
      
      setConfirmed(true);
      toast.success(`Application ${applicationNo} created successfully!`);
      
      setTimeout(() => {
        onComplete();
      }, 1500);
      
      setLoading(false);
    }, 1000);
  };

  return (
    <InstrumentSection>
      <div className="w-full px-8 xl:px-16 2xl:px-24">
        {/* Back Button */}
        {onBack && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="mb-6 flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('common.back')}</span>
          </motion.button>
        )}

        <InstrumentSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#3b82f6] flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#0f172a]">Business Type Selection</h2>
                <p className="text-[#475569]">Choose your investment category</p>
              </div>
            </div>

            {!selectedType ? (
              <div className="grid md:grid-cols-2 gap-6">
                {businessTypes.map((type, index) => (
                  <InstrumentCard key={type.id} onClick={() => setSelectedType(type.id)}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-6 cursor-pointer text-left group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <type.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl mb-1">{type.name}</h3>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-1 transition-all" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="p-3 rounded-full bg-gray-100">
                          {type.steps.length} steps required
                        </span>
                      </div>
                    </motion.div>
                  </InstrumentCard>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedBusiness?.color} flex items-center justify-center`}>
                      {selectedBusiness && <selectedBusiness.icon className="w-5 h-5 text-white" />}
                    </div>
                    {selectedBusiness?.name}
                  </h3>
                  <button
                    onClick={() => setSelectedType(null)}
                    className="px-4 py-2 rounded-lg hover:bg-white/80"
                  >
                    Change
                  </button>
                </div>

                <InstrumentCard>
                  <div className="p-6">
                    <h4 className="text-lg mb-2">📋 Required Steps Overview</h4>
                    <p className="text-sm text-gray-700">
                      Your {selectedBusiness?.name.toLowerCase()} will require {selectedBusiness?.steps.length} approvals from various agencies. We'll guide you through each step with pre-filled forms.
                    </p>
                  </div>
                </InstrumentCard>

                <div className="space-y-3 mb-8 mt-6">
                  {selectedBusiness?.steps.map((step, index) => (
                    <InstrumentCard key={index}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                          {confirmed ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <CheckCircle className="w-5 h-5" />
                            </motion.div>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1">{step.title}</h4>
                          <p className="text-sm text-gray-600">{step.agency}</p>
                        </div>
                        <div className="text-right">
                          <div className="status-badge status-pending">
                            {step.sla}
                          </div>
                        </div>
                      </motion.div>
                    </InstrumentCard>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedType(null)}
                    className="px-6 py-3 rounded-xl hover:bg-white/80"
                  >
                    Go Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConfirm}
                    disabled={confirmed || loading}
                    className="flex-1 px-6 py-3 rounded-xl bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-all disabled:opacity-50"
                  >
                    {confirmed ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Journey Started!
                      </span>
                    ) : loading ? (
                      <CheckCircle className="w-5 h-5 animate-spin" />
                    ) : (
                      'Start My Journey'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </InstrumentSection>
      </div>
    </InstrumentSection>
  );
}