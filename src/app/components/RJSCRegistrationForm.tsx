import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  User, 
  MapPin, 
  DollarSign, 
  FileText, 
  CheckCircle2,
  Upload,
  Calendar,
  Mail,
  Phone,
  Globe,
  ArrowRight,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { InstrumentCard } from './ui-primitives';
import { toast } from 'sonner';

interface RegistrationFormProps {
  prefilledCompanyName?: string;
  onBack?: () => void;
  onComplete?: (details: any) => void;
}

// Bangladesh Administrative Data
const BANGLADESH_DATA = {
  Dhaka: ['Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Rajbari', 'Shariatpur', 'Tangail'],
  Chittagong: ['Bandarban', 'Brahmanbaria', 'Chandpur', 'Chittagong', 'Comilla', 'Cox\'s Bazar', 'Feni', 'Khagrachari', 'Lakshmipur', 'Noakhali', 'Rangamati'],
  Sylhet: ['Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet'],
  Khulna: ['Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Khulna', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira'],
  Rajshahi: ['Bogra', 'Joypurhat', 'Naogaon', 'Natore', 'Chapainawabganj', 'Pabna', 'Rajshahi', 'Sirajganj'],
  Barisal: ['Barguna', 'Barisal', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur'],
  Rangpur: ['Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon'],
  Mymensingh: ['Jamalpur', 'Mymensingh', 'Netrokona', 'Sherpur']
};

// Upazila/Thana data for each district
const UPAZILA_DATA: { [key: string]: string[] } = {
  // Dhaka Division
  'Dhaka': ['Dhamrai', 'Dohar', 'Keraniganj', 'Nawabganj', 'Savar', 'Tejgaon', 'Mohammadpur', 'Gulshan', 'Motijheel', 'Mirpur', 'Uttara'],
  'Faridpur': ['Alfadanga', 'Bhanga', 'Boalmari', 'Char Bhadrasan', 'Faridpur Sadar', 'Madhukhali', 'Nagarkanda', 'Sadarpur', 'Saltha'],
  'Gazipur': ['Gazipur Sadar', 'Kaliakair', 'Kaliganj', 'Kapasia', 'Sreepur'],
  'Gopalganj': ['Gopalganj Sadar', 'Kashiani', 'Kotalipara', 'Muksudpur', 'Tungipara'],
  'Kishoreganj': ['Austagram', 'Bajitpur', 'Bhairab', 'Hossainpur', 'Itna', 'Karimganj', 'Katiadi', 'Kishoreganj Sadar', 'Kuliarchar', 'Mithamain', 'Nikli', 'Pakundia', 'Tarail'],
  'Madaripur': ['Madaripur Sadar', 'Kalkini', 'Rajoir', 'Shibchar'],
  'Manikganj': ['Manikganj Sadar', 'Singair', 'Shibalaya', 'Saturia', 'Harirampur', 'Ghior', 'Daulatpur'],
  'Munshiganj': ['Munshiganj Sadar', 'Gazaria', 'Lohajang', 'Sirajdikhan', 'Sreenagar', 'Tongibari'],
  'Narayanganj': ['Narayanganj Sadar', 'Araihazar', 'Bandar', 'Rupganj', 'Sonargaon'],
  'Narsingdi': ['Narsingdi Sadar', 'Belabo', 'Monohardi', 'Palash', 'Raipura', 'Shibpur'],
  'Rajbari': ['Rajbari Sadar', 'Baliakandi', 'Goalandaghat', 'Pangsha', 'Kalukhali'],
  'Shariatpur': ['Shariatpur Sadar', 'Bhedarganj', 'Damudya', 'Gosairhat', 'Naria', 'Zajira'],
  'Tangail': ['Tangail Sadar', 'Basail', 'Bhuapur', 'Delduar', 'Ghatail', 'Gopalpur', 'Kalihati', 'Madhupur', 'Mirzapur', 'Nagarpur', 'Sakhipur', 'Dhanbari'],
  
  // Chittagong Division
  'Bandarban': ['Bandarban Sadar', 'Thanchi', 'Lama', 'Naikhongchhari', 'Ali Kadam', 'Rowangchhari', 'Ruma'],
  'Brahmanbaria': ['Brahmanbaria Sadar', 'Ashuganj', 'Nasirnagar', 'Nabinagar', 'Sarail', 'Shahbazpur', 'Kasba', 'Akhaura', 'Bancharampur'],
  'Chandpur': ['Chandpur Sadar', 'Faridganj', 'Haimchar', 'Haziganj', 'Kachua', 'Matlab Uttar', 'Matlab Dakshin', 'Shahrasti'],
  'Chittagong': ['Anwara', 'Banshkhali', 'Boalkhali', 'Chandanaish', 'Fatikchhari', 'Hathazari', 'Lohagara', 'Mirsharai', 'Patiya', 'Rangunia', 'Raozan', 'Sandwip', 'Satkania', 'Sitakunda', 'Chittagong Port'],
  'Comilla': ['Comilla Sadar', 'Barura', 'Brahmanpara', 'Burichang', 'Chandina', 'Chauddagram', 'Daudkandi', 'Debidwar', 'Homna', 'Laksam', 'Meghna', 'Muradnagar', 'Nangalkot', 'Titas'],
  'Cox\'s Bazar': ['Cox\'s Bazar Sadar', 'Chakaria', 'Kutubdia', 'Maheshkhali', 'Ramu', 'Teknaf', 'Ukhia', 'Pekua'],
  'Feni': ['Feni Sadar', 'Chagalnaiya', 'Daganbhuiyan', 'Parshuram', 'Fulgazi', 'Sonagazi'],
  'Khagrachari': ['Khagrachari Sadar', 'Dighinala', 'Panchari', 'Lakshmichhari', 'Mahalchhari', 'Manikchhari', 'Matiranga', 'Ramgarh'],
  'Lakshmipur': ['Lakshmipur Sadar', 'Raipur', 'Ramganj', 'Ramgati', 'Kamalnagar'],
  'Noakhali': ['Noakhali Sadar', 'Begumganj', 'Chatkhil', 'Companiganj', 'Hatiya', 'Senbagh', 'Sonaimuri', 'Subarnachar', 'Kabirhat'],
  'Rangamati': ['Rangamati Sadar', 'Belaichhari', 'Baghaichhari', 'Barkal', 'Juraichhari', 'Rajasthali', 'Kaptai', 'Langadu', 'Naniarchar', 'Kaukhali'],
  
  // Sylhet Division
  'Habiganj': ['Habiganj Sadar', 'Ajmiriganj', 'Bahubal', 'Baniyachong', 'Chunarughat', 'Lakhai', 'Madhabpur', 'Nabiganj', 'Shayestaganj'],
  'Moulvibazar': ['Moulvibazar Sadar', 'Barlekha', 'Juri', 'Kamalganj', 'Kulaura', 'Rajnagar', 'Sreemangal'],
  'Sunamganj': ['Sunamganj Sadar', 'Bishwambarpur', 'Chhatak', 'Derai', 'Dharamapasha', 'Dowarabazar', 'Jagannathpur', 'Jamalganj', 'Shalla', 'Tahirpur'],
  'Sylhet': ['Sylhet Sadar', 'Beanibazar', 'Bishwanath', 'Companiganj', 'Fenchuganj', 'Golapganj', 'Gowainghat', 'Jaintiapur', 'Kanaighat', 'Zakiganj', 'Balaganj', 'Osmaninagar'],
  
  // Khulna Division
  'Bagerhat': ['Bagerhat Sadar', 'Chitalmari', 'Fakirhat', 'Kachua', 'Mollahat', 'Mongla', 'Morrelganj', 'Rampal', 'Sarankhola'],
  'Chuadanga': ['Chuadanga Sadar', 'Alamdanga', 'Damurhuda', 'Jibannagar'],
  'Jessore': ['Jessore Sadar', 'Abhaynagar', 'Bagherpara', 'Chaugachha', 'Jhikargachha', 'Keshabpur', 'Manirampur', 'Sharsha'],
  'Jhenaidah': ['Jhenaidah Sadar', 'Harinakunda', 'Kaliganj', 'Kotchandpur', 'Maheshpur', 'Shailkupa'],
  'Khulna': ['Khulna Sadar', 'Batiaghata', 'Dacope', 'Dumuria', 'Dighalia', 'Koyra', 'Paikgachha', 'Phultala', 'Rupsa', 'Terokhada'],
  'Kushtia': ['Kushtia Sadar', 'Bheramara', 'Daulatpur', 'Khoksa', 'Kumarkhali', 'Mirpur'],
  'Magura': ['Magura Sadar', 'Mohammadpur', 'Shalikha', 'Sreepur'],
  'Meherpur': ['Meherpur Sadar', 'Gangni', 'Mujibnagar'],
  'Narail': ['Narail Sadar', 'Kalia', 'Lohagara'],
  'Satkhira': ['Satkhira Sadar', 'Assasuni', 'Debhata', 'Kalaroa', 'Kaliganj', 'Shyamnagar', 'Tala'],
  
  // Rajshahi Division
  'Bogra': ['Bogra Sadar', 'Adamdighi', 'Dhunat', 'Dhupchanchia', 'Gabtali', 'Kahaloo', 'Nandigram', 'Sariakandi', 'Shajahanpur', 'Sherpur', 'Shibganj', 'Sonatala'],
  'Joypurhat': ['Joypurhat Sadar', 'Akkelpur', 'Kalai', 'Khetlal', 'Panchbibi'],
  'Naogaon': ['Naogaon Sadar', 'Atrai', 'Badalgachhi', 'Manda', 'Dhamoirhat', 'Mohadevpur', 'Niamatpur', 'Patnitala', 'Porsha', 'Raninagar', 'Sapahar'],
  'Natore': ['Natore Sadar', 'Bagatipara', 'Baraigram', 'Gurudaspur', 'Lalpur', 'Natore Sadar', 'Singra'],
  'Chapainawabganj': ['Chapainawabganj Sadar', 'Bholahat', 'Gomastapur', 'Nachole', 'Shibganj'],
  'Pabna': ['Pabna Sadar', 'Atgharia', 'Bera', 'Bhangura', 'Chatmohar', 'Faridpur', 'Ishwardi', 'Santhia', 'Sujanagar'],
  'Rajshahi': ['Rajshahi Sadar', 'Bagha', 'Bagmara', 'Charghat', 'Durgapur', 'Godagari', 'Mohanpur', 'Paba', 'Puthia', 'Tanore'],
  'Sirajganj': ['Sirajganj Sadar', 'Belkuchi', 'Chauhali', 'Kamarkhanda', 'Kazipur', 'Raiganj', 'Shahjadpur', 'Tarash', 'Ullahpara'],
  
  // Barisal Division
  'Barguna': ['Barguna Sadar', 'Amtali', 'Bamna', 'Betagi', 'Patharghata', 'Taltali'],
  'Barisal': ['Barisal Sadar', 'Agailjhara', 'Babuganj', 'Bakerganj', 'Banaripara', 'Gaurnadi', 'Hizla', 'Mehendiganj', 'Muladi', 'Wazirpur'],
  'Bhola': ['Bhola Sadar', 'Burhanuddin', 'Char Fasson', 'Daulatkhan', 'Lalmohan', 'Manpura', 'Tazumuddin'],
  'Jhalokati': ['Jhalokati Sadar', 'Kathalia', 'Nalchity', 'Rajapur'],
  'Patuakhali': ['Patuakhali Sadar', 'Bauphal', 'Dashmina', 'Dumki', 'Galachipa', 'Kalapara', 'Mirzaganj', 'Rangabali'],
  'Pirojpur': ['Pirojpur Sadar', 'Bhandaria', 'Kawkhali', 'Mathbaria', 'Nazirpur', 'Nesarabad', 'Zianagar'],
  
  // Rangpur Division
  'Dinajpur': ['Dinajpur Sadar', 'Birampur', 'Birganj', 'Biral', 'Bochaganj', 'Chirirbandar', 'Phulbari', 'Ghoraghat', 'Hakimpur', 'Kaharole', 'Khansama', 'Nawabganj', 'Parbatipur'],
  'Gaibandha': ['Gaibandha Sadar', 'Fulchhari', 'Gaibandha', 'Gobindaganj', 'Palashbari', 'Sadullapur', 'Saghata', 'Sundarganj'],
  'Kurigram': ['Kurigram Sadar', 'Bhurungamari', 'Char Rajibpur', 'Chilmari', 'Phulbari', 'Nageshwari', 'Rajarhat', 'Raomari', 'Ulipur'],
  'Lalmonirhat': ['Lalmonirhat Sadar', 'Aditmari', 'Hatibandha', 'Kaliganj', 'Patgram'],
  'Nilphamari': ['Nilphamari Sadar', 'Dimla', 'Domar', 'Jaldhaka', 'Kishoreganj', 'Saidpur'],
  'Panchagarh': ['Panchagarh Sadar', 'Atwari', 'Boda', 'Debiganj', 'Tetulia'],
  'Rangpur': ['Rangpur Sadar', 'Badarganj', 'Gangachara', 'Kaunia', 'Mithapukur', 'Pirgachha', 'Pirganj', 'Taraganj'],
  'Thakurgaon': ['Thakurgaon Sadar', 'Baliadangi', 'Haripur', 'Pirganj', 'Ranisankail'],
  
  // Mymensingh Division
  'Jamalpur': ['Jamalpur Sadar', 'Baksiganj', 'Dewanganj', 'Islampur', 'Madarganj', 'Melandaha', 'Sarishabari'],
  'Mymensingh': ['Mymensingh Sadar', 'Bhaluka', 'Dhobaura', 'Fulbaria', 'Gaffargaon', 'Gauripur', 'Haluaghat', 'Ishwarganj', 'Muktagachha', 'Nandail', 'Phulpur', 'Trishal'],
  'Netrokona': ['Netrokona Sadar', 'Atpara', 'Barhatta', 'Durgapur', 'Khaliajuri', 'Kalmakanda', 'Kendua', 'Madan', 'Mohanganj', 'Purbadhala'],
  'Sherpur': ['Sherpur Sadar', 'Jhenaigati', 'Nakla', 'Nalitabari', 'Sreebardi']
};

export function RJSCRegistrationForm({ prefilledCompanyName, onBack, onComplete }: RegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [formData, setFormData] = useState({
    // Company Details
    companyName: prefilledCompanyName || '',
    companyType: '',
    businessActivity: '',
    authorizedCapital: '',
    paidUpCapital: '',
    
    // Registered Address
    division: '',
    district: '',
    upazila: '',
    address: '',
    postcode: '',
    
    // Director Information
    directorName: '',
    directorNationality: '',
    directorPassport: '',
    directorEmail: '',
    directorPhone: '',
    
    // Additional Information
    website: '',
    employeeCount: '',
    startDate: '',
  });

  const totalSteps = 4;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // If division changes, reset district and upazila
      if (field === 'division') {
        updated.district = '';
        updated.upazila = '';
      }
      
      // If district changes, reset upazila
      if (field === 'district') {
        updated.upazila = '';
      }
      
      return updated;
    });
  };

  // Get available districts based on selected division
  const availableDistricts = formData.division 
    ? BANGLADESH_DATA[formData.division as keyof typeof BANGLADESH_DATA] || []
    : [];

  // Get available upazilas based on selected district
  const availableUpazilas = formData.district 
    ? UPAZILA_DATA[formData.district] || []
    : [];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    const newApplicationId = 'RJSC-2026-' + Math.floor(Math.random() * 10000);
    setApplicationId(newApplicationId);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.success('🎉 RJSC Registration Application Submitted Successfully!');
    toast.info('Application ID: ' + newApplicationId);
    if (onComplete) {
      onComplete(formData);
    }
  };

  // Success Screen - Show after submission
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <InstrumentCard>
          <div className="p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-16 h-16 text-emerald-600" />
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Application Submitted Successfully!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your company registration application has been received and is being processed.
            </p>

            <div className="inline-block px-8 py-4 bg-blue-50 rounded-lg mb-8">
              <p className="text-sm text-gray-600 mb-1">Application ID</p>
              <p className="text-2xl font-bold text-blue-600 font-mono">{applicationId}</p>
            </div>

            <div className="max-w-2xl mx-auto mb-8">
              <InstrumentCard>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                  <h3 className="font-semibold text-lg mb-4 flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Next Steps
                  </h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <p className="font-semibold">Payment Confirmation</p>
                        <p className="text-sm text-gray-600">Within 24 hours - You'll receive payment instructions via email</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <p className="font-semibold">Document Verification</p>
                        <p className="text-sm text-gray-600">1-2 business days - RJSC will review your application</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <p className="font-semibold">Certificate Issuance</p>
                        <p className="text-sm text-gray-600">2-3 business days - Receive your incorporation certificate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </InstrumentCard>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold">Email Updates</p>
                <p className="text-sm text-gray-600">Sent to {formData.directorEmail || 'your email'}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <Phone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold">SMS Notifications</p>
                <p className="text-sm text-gray-600">Sent to {formData.directorPhone || 'your phone'}</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg">
                <Calendar className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="font-semibold">Expected Completion</p>
                <p className="text-sm text-gray-600">2-3 business days</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Print Confirmation
              </button>
              <button
                onClick={() => {
                  toast.info('✨ Advancing to next step automatically...');
                }}
                disabled
                className="px-8 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed flex items-center gap-2 opacity-60"
              >
                Advancing Automatically...
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </InstrumentCard>

        <InstrumentCard>
          <div className="p-6 bg-amber-50">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Important Information
            </h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Keep your Application ID ({applicationId}) safe for future reference</li>
              <li>• Check your email regularly for updates and payment instructions</li>
              <li>• The RJSC team may contact you if additional information is needed</li>
              <li>• Processing time: 2-3 business days (SLA: 72 hours maximum)</li>
              <li>• For inquiries, contact RJSC helpline: +880-2-XXXXXXX</li>
            </ul>
          </div>
        </InstrumentCard>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <InstrumentCard>
        <div className="p-6 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">RJSC Company Registration</h2>
            <div className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex-1">
                <div className={`h-2 rounded-full transition-all ${
                  step <= currentStep ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                }`} />
                <div className={`text-xs mt-1 ${step <= currentStep ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
                  {step === 1 && 'Company'}
                  {step === 2 && 'Address'}
                  {step === 3 && 'Directors'}
                  {step === 4 && 'Review'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </InstrumentCard>

      {/* Step 1: Company Details */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <InstrumentCard>
            <div className="p-8 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Company Information</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Company Name *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Company Type *</label>
                  <select
                    value={formData.companyType}
                    onChange={(e) => handleInputChange('companyType', e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                  >
                    <option value="">Select company type</option>
                    <option value="private">Private Limited Company</option>
                    <option value="public">Public Limited Company</option>
                    <option value="branch">Branch Office</option>
                    <option value="liaison">Liaison Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Business Activity *</label>
                  <select
                    value={formData.businessActivity}
                    onChange={(e) => handleInputChange('businessActivity', e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                  >
                    <option value="">Select business sector</option>
                    <option value="textile">Textile & Garments</option>
                    <option value="it">Information Technology</option>
                    <option value="pharma">Pharmaceuticals</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="energy">Energy & Power</option>
                    <option value="agriculture">Agriculture & Food Processing</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="logistics">Logistics & Transportation</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Authorized Capital (BDT) *</label>
                    <input
                      type="number"
                      value={formData.authorizedCapital}
                      onChange={(e) => handleInputChange('authorizedCapital', e.target.value)}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                      placeholder="e.g., 10000000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Paid-up Capital (BDT) *</label>
                    <input
                      type="number"
                      value={formData.paidUpCapital}
                      onChange={(e) => handleInputChange('paidUpCapital', e.target.value)}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                      placeholder="e.g., 2500000"
                    />
                  </div>
                </div>
              </div>
            </div>
          </InstrumentCard>
        </motion.div>
      )}

      {/* Step 2: Registered Address */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <InstrumentCard>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-semibold">Registered Office Address</h3>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Division *</label>
                    <select
                      value={formData.division}
                      onChange={(e) => handleInputChange('division', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select division</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Barisal">Barisal</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Mymensingh">Mymensingh</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">District *</label>
                    <select
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      disabled={!formData.division}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">{formData.division ? 'Select district' : 'Select division first'}</option>
                      {availableDistricts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Upazila / Thana *</label>
                    <select
                      value={formData.upazila}
                      onChange={(e) => handleInputChange('upazila', e.target.value)}
                      disabled={!formData.district}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">{formData.district ? 'Select upazila' : 'Select district first'}</option>
                      {availableUpazilas.map(upazila => (
                        <option key={upazila} value={upazila}>{upazila}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Postcode *</label>
                    <input
                      type="text"
                      value={formData.postcode}
                      onChange={(e) => handleInputChange('postcode', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="e.g., 1205"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Full Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                    rows={3}
                    placeholder="House/Holding no., Road no., Area"
                  />
                </div>
              </div>
            </div>
          </InstrumentCard>
        </motion.div>
      )}

      {/* Step 3: Director Information */}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <InstrumentCard>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-semibold">Primary Director Information</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.directorName}
                    onChange={(e) => handleInputChange('directorName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter director's full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nationality *</label>
                    <input
                      type="text"
                      value={formData.directorNationality}
                      onChange={(e) => handleInputChange('directorNationality', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="e.g., Bangladeshi, Chinese, Japanese"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Passport Number *</label>
                    <input
                      type="text"
                      value={formData.directorPassport}
                      onChange={(e) => handleInputChange('directorPassport', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Enter passport number"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.directorEmail}
                      onChange={(e) => handleInputChange('directorEmail', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="director@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.directorPhone}
                      onChange={(e) => handleInputChange('directorPhone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="+880-XXX-XXXXXXX"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Website (Optional)</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="https://www.company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Expected Start Date *</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </InstrumentCard>
        </motion.div>
      )}

      {/* Step 4: Review & Submit */}
      {currentStep === 4 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <InstrumentCard>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <h3 className="text-xl font-semibold">Review Your Application</h3>
              </div>

              <div className="space-y-6">
                {/* Company Details Summary */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Company Information
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.companyName || 'Not provided'}</span></div>
                    <div><span className="text-gray-600">Type:</span> <span className="font-medium">{formData.companyType || 'Not provided'}</span></div>
                    <div><span className="text-gray-600">Sector:</span> <span className="font-medium">{formData.businessActivity || 'Not provided'}</span></div>
                    <div><span className="text-gray-600">Authorized Capital:</span> <span className="font-medium">BDT {formData.authorizedCapital || 'Not provided'}</span></div>
                  </div>
                </div>

                {/* Address Summary */}
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Registered Address
                  </h4>
                  <div className="text-sm">
                    <p className="font-medium">{formData.address || 'Not provided'}</p>
                    <p className="text-gray-600">{formData.upazila}, {formData.district}, {formData.division} - {formData.postcode}</p>
                  </div>
                </div>

                {/* Director Summary */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Primary Director
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.directorName || 'Not provided'}</span></div>
                    <div><span className="text-gray-600">Nationality:</span> <span className="font-medium">{formData.directorNationality || 'Not provided'}</span></div>
                    <div><span className="text-gray-600">Email:</span> <span className="font-medium">{formData.directorEmail || 'Not provided'}</span></div>
                    <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{formData.directorPhone || 'Not provided'}</span></div>
                  </div>
                </div>

                {/* Fee Information */}
                <div className="p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Registration Fees
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>RJSC Registration Fee</span>
                      <span className="font-semibold">BDT 35,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stamp Duty</span>
                      <span className="font-semibold">BDT 5,000</span>
                    </div>
                    <div className="flex justify-between text-base font-bold pt-2 border-t border-amber-300">
                      <span>Total Amount</span>
                      <span className="text-amber-700">BDT 40,000</span>
                    </div>
                  </div>
                </div>

                {/* Processing Time */}
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Processing Timeline
                  </h4>
                  <p className="text-sm text-gray-700">Expected completion: <span className="font-semibold">2-3 business days</span></p>
                  <p className="text-sm text-gray-700">SLA guarantee: <span className="font-semibold">72 hours maximum</span></p>
                </div>
              </div>
            </div>
          </InstrumentCard>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <InstrumentCard>
        <div className="p-6 flex justify-between items-center">
          <button
            onClick={currentStep === 1 && onBack ? onBack : handlePrevious}
            disabled={currentStep === 1 && !onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep === 1 && onBack ? 'Back to Verification' : 'Previous'}
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Submit Application
            </button>
          )}
        </div>
      </InstrumentCard>
    </div>
  );
}