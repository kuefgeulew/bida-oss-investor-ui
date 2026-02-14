import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, User, MapPin, DollarSign, Phone, Mail, Save, ArrowLeft } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { InstrumentCard, InstrumentSection } from './ui-primitives';

interface ProfileData {
  companyName: string;
  directors: string;
  sector: string;
  capital: string;
  contact: string;
  email: string;
  address: string;
  passport: string;
  bankAccount: string;
}

interface ProfileCreationProps {
  onComplete: () => void;
  onBack: () => void;
}

export function ProfileCreation({ onComplete, onBack }: ProfileCreationProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ProfileData>({
    companyName: '',
    directors: '',
    sector: '',
    capital: '',
    contact: '',
    email: '',
    address: '',
    passport: '',
    bankAccount: '',
  });

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const sectors = [
    'Manufacturing',
    'Technology',
    'Textiles & Garments',
    'Pharmaceuticals',
    'Real Estate',
    'Agriculture',
    'Energy',
    'Tourism',
  ];

  return (
    <InstrumentSection>
      <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="mb-6 flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/80 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{t('common.back')}</span>
      </motion.button>

      <InstrumentSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#3b82f6] flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#0f172a]">Create Your Profile</h2>
              <p className="text-[#475569]">Step {step} of {totalSteps}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Step {step} of {totalSteps}</span>
              <span className="text-sm text-gray-600">{Math.round((step / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl mb-4">Company Information</h3>
                
                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Company name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    Sector
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select sector</option>
                    {sectors.map((sector) => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Investment Capital (USD)
                  </label>
                  <input
                    type="number"
                    value={formData.capital}
                    onChange={(e) => setFormData({ ...formData, capital: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter investment amount"
                    required
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl mb-4">Contact & Location</h3>
                
                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    <User className="w-4 h-4 inline mr-2" />
                    Director(s) Name
                  </label>
                  <input
                    type="text"
                    value={formData.directors}
                    onChange={(e) => setFormData({ ...formData, directors: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Full name of directors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+880-XXX-XXXXXXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="company@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Business Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Complete business address"
                    rows={3}
                    required
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl mb-4">Legal & Banking</h3>
                
                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    Passport Number
                  </label>
                  <input
                    type="text"
                    value={formData.passport}
                    onChange={(e) => setFormData({ ...formData, passport: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Passport number of primary director"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    Bank Account (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Bangladesh bank account number"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    You can also open a bank account through OSS after profile creation
                  </p>
                </div>

                <InstrumentCard>
                  <div className="p-4">
                    <p className="text-sm text-blue-800">
                      ✓ Your profile will be securely stored and reused across all OSS forms
                    </p>
                    <p className="text-sm text-blue-800 mt-1">
                      ✓ No need to re-enter information for multiple applications
                    </p>
                  </div>
                </InstrumentCard>
              </motion.div>
            )}

            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 rounded-xl"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Previous
                </motion.button>
              )}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 rounded-xl bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-all flex items-center justify-center gap-2"
              >
                {step < totalSteps ? (
                  'Next Step'
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Complete Profile
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </InstrumentSection>
      </div>
    </InstrumentSection>
  );
}