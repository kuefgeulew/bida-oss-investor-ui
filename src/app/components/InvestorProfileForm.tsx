import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Building2, User, MapPin, DollarSign, Phone, Mail, Save, Loader2, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Mock InvestorProfile type (NO BACKEND)
interface InvestorProfile {
  businessName: string;
  businessType: 'LOCAL' | 'FOREIGN' | 'JOINT_VENTURE';
  sector: string;
  investmentAmount?: number;
  numberOfEmployees?: number;
  division: string;
  district: string;
  upazila: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  registrationNumber?: string;
  tinNumber?: string;
  vatNumber?: string;
  binNumber?: string;
}

interface InvestorProfileFormProps {
  onComplete?: () => void;
}

export function InvestorProfileForm({ onComplete }: InvestorProfileFormProps) {
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Partial<InvestorProfile> | null>(null);
  const [demoDataLoaded, setDemoDataLoaded] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'LOCAL' as 'LOCAL' | 'FOREIGN' | 'JOINT_VENTURE',
    sector: '',
    investmentAmount: '',
    numberOfEmployees: '',
    division: '',
    district: '',
    upazila: '',
    address: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    registrationNumber: '',
    tinNumber: '',
    vatNumber: '',
    binNumber: '',
  });

  // 🎯 DEMO AUTO-FILL FUNCTION (DEV ONLY)
  const handleDemoAutoFill = async () => {
    if (!import.meta.env.DEV) return;

    try {
      const { DEMO_PROFILE_DATA } = await import(
        '@/app/devtools/demoProfileData'
      );

      setFormData({
        businessName: DEMO_PROFILE_DATA.businessName,
        businessType: DEMO_PROFILE_DATA.businessType,
        sector: DEMO_PROFILE_DATA.sector,
        investmentAmount: DEMO_PROFILE_DATA.investmentAmount,
        numberOfEmployees: DEMO_PROFILE_DATA.numberOfEmployees,
        division: DEMO_PROFILE_DATA.division,
        district: DEMO_PROFILE_DATA.district,
        upazila: DEMO_PROFILE_DATA.upazila,
        address: DEMO_PROFILE_DATA.address,
        contactPerson: DEMO_PROFILE_DATA.contactPerson,
        contactEmail: DEMO_PROFILE_DATA.contactEmail,
        contactPhone: DEMO_PROFILE_DATA.contactPhone,
        website: DEMO_PROFILE_DATA.website,
        registrationNumber: DEMO_PROFILE_DATA.registrationNumber,
        tinNumber: DEMO_PROFILE_DATA.tinNumber,
        vatNumber: DEMO_PROFILE_DATA.vatNumber,
        binNumber: DEMO_PROFILE_DATA.binNumber,
      });

      setDemoDataLoaded(true);
    } catch (err) {
      console.error('Demo auto-fill failed', err);
    }
  };

  // Load existing profile from localStorage (NO BACKEND)
  useEffect(() => {
    const loadProfile = () => {
      try {
        // Try loading from localStorage
        const stored = localStorage.getItem('bida_investor_profile');
        if (stored) {
          const existingProfile = JSON.parse(stored);
          setProfile(existingProfile);
          setFormData({
            businessName: existingProfile.businessName || '',
            businessType: existingProfile.businessType || 'LOCAL',
            sector: existingProfile.sector || '',
            investmentAmount: existingProfile.investmentAmount?.toString() || '',
            numberOfEmployees: existingProfile.numberOfEmployees?.toString() || '',
            division: existingProfile.division || '',
            district: existingProfile.district || '',
            upazila: existingProfile.upazila || '',
            address: existingProfile.address || '',
            contactPerson: existingProfile.contactPerson || '',
            contactEmail: existingProfile.contactEmail || '',
            contactPhone: existingProfile.contactPhone || '',
            website: existingProfile.website || '',
            registrationNumber: existingProfile.registrationNumber || '',
            tinNumber: existingProfile.tinNumber || '',
            vatNumber: existingProfile.vatNumber || '',
            binNumber: existingProfile.binNumber || '',
          });
        }
      } catch (error: any) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Simulate API delay (NO BACKEND)
    setTimeout(() => {
      try {
        const data: InvestorProfile = {
          businessName: formData.businessName,
          businessType: formData.businessType,
          sector: formData.sector,
          investmentAmount: parseFloat(formData.investmentAmount) || 0,
          numberOfEmployees: formData.numberOfEmployees ? parseInt(formData.numberOfEmployees) : undefined,
          division: formData.division,
          district: formData.district,
          upazila: formData.upazila,
          address: formData.address || '',
          contactPerson: formData.contactPerson || '',
          contactEmail: formData.contactEmail || '',
          contactPhone: formData.contactPhone || '',
          website: formData.website,
          registrationNumber: formData.registrationNumber,
          tinNumber: formData.tinNumber,
          vatNumber: formData.vatNumber,
          binNumber: formData.binNumber,
        };

        // Save to localStorage
        localStorage.setItem('bida_investor_profile', JSON.stringify(data));
        
        setProfile(data);
        
        toast.success(profile ? 'Profile updated successfully!' : 'Profile created successfully!');

        // Refresh user data
        refreshUser();

        if (onComplete) {
          setTimeout(() => {
            onComplete();
          }, 500);
        }
      } catch (error: any) {
        toast.error(error.message || 'Failed to save profile');
      } finally {
        setSaving(false);
      }
    }, 1000);
  };

  const sectors = [
    'Manufacturing',
    'Information Technology',
    'Textiles & Garments',
    'Pharmaceuticals',
    'Real Estate',
    'Agriculture',
    'Energy & Power',
    'Tourism & Hospitality',
    'Financial Services',
    'Healthcare',
    'Education',
    'Construction',
  ];

  const divisions = [
    'Dhaka',
    'Chittagong',
    'Rajshahi',
    'Khulna',
    'Sylhet',
    'Barisal',
    'Rangpur',
    'Mymensingh',
  ];

  if (loading) {
    return (
      <div className="w-full px-8 xl:px-16 2xl:px-24">
        <div className="p-8 text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-8 xl:px-16 2xl:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Demo Button */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {profile ? 'Update' : 'Create'} Investor Profile
              </h2>
              <p className="text-gray-600">This profile will auto-fill all your OSS forms</p>
            </div>
          </div>

          {/* 🎯 DEMO AUTO-FILL BUTTON (DEV ONLY) */}
          {import.meta.env.DEV && !profile && (
            <button
              type="button"
              onClick={handleDemoAutoFill}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2 shrink-0"
            >
              <Zap className="w-4 h-4" />
              🎯 Auto Fill Demo Data
            </button>
          )}
        </div>

        {/* Demo Data Loaded Badge */}
        {demoDataLoaded && import.meta.env.DEV && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 px-4 py-3 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200 rounded-lg flex items-center gap-3"
          >
            <Zap className="w-5 h-5 text-emerald-600" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-emerald-900">Demo Data Loaded</p>
              <p className="text-xs text-emerald-700">Review the fields and click "Create Profile" to proceed</p>
            </div>
          </motion.div>
        )}

        {profile && profile.completionPercent !== undefined && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Profile Completion</span>
              <span className="text-sm font-semibold text-purple-600">{profile.completionPercent}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                style={{ width: `${profile.completionPercent}%` }}
              />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business Information */}
          <div className="p-6 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-600" />
              Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your company name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type *
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value as any })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="LOCAL">Local</option>
                  <option value="FOREIGN">Foreign</option>
                  <option value="JOINT_VENTURE">Joint Venture</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sector *
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select sector</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount (BDT) *
                </label>
                <input
                  type="number"
                  value={formData.investmentAmount}
                  onChange={(e) => setFormData({ ...formData, investmentAmount: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="USD"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Employees
                </label>
                <input
                  type="number"
                  value={formData.numberOfEmployees}
                  onChange={(e) => setFormData({ ...formData, numberOfEmployees: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Number of employees"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="p-6 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Division *
                </label>
                <select
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select division</option>
                  {divisions.map((division) => (
                    <option key={division} value={division}>{division}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District *
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter district"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upazila *
                </label>
                <input
                  type="text"
                  value={formData.upazila}
                  onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter upazila"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Business address"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-6 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-purple-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Director names"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="contact@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="+880-XXX-XXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Company website"
                />
              </div>
            </div>
          </div>

          {/* Company Registration */}
          <div className="p-6 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-600" />
              Company Registration (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="RJSC registration number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TIN Number
                </label>
                <input
                  type="text"
                  value={formData.tinNumber}
                  onChange={(e) => setFormData({ ...formData, tinNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Tax Identification Number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  VAT Number
                </label>
                <input
                  type="text"
                  value={formData.vatNumber}
                  onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="VAT registration number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BIN Number
                </label>
                <input
                  type="text"
                  value={formData.binNumber}
                  onChange={(e) => setFormData({ ...formData, binNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Business Identification Number"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {profile ? 'Update Profile' : 'Create Profile'}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}