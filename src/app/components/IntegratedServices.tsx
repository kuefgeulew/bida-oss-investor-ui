import { motion } from 'motion/react';
import { 
  Building2, Zap, Phone, Wifi, Droplet, CheckCircle2, 
  Clock, Package, DollarSign, TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import { 
  SectorServiceRecommendation, 
  BundledPackages, 
  ServiceDependencyGraph 
} from './EnhancedServices';
import { InstrumentCard, InstrumentSection } from './ui-primitives';

export function IntegratedServices() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const bankServices = [
    {
      id: 'bank-rupali',
      name: 'Rupali Bank',
      service: 'Business Account',
      fee: 'BDT 5,000',
      timeline: '3 days',
      status: 'available',
      statusLabel: 'Ready to Apply',
      description: 'Government-owned bank with competitive rates for FDI',
      requirements: ['Company registration', 'Passport copy', 'Investment approval'],
    },
    {
      id: 'bank-sonali',
      name: 'Sonali Bank',
      service: 'Corporate Account + LC Facility',
      fee: 'BDT 8,000',
      timeline: '5 days',
      status: 'available',
      statusLabel: 'Ready to Apply',
      description: 'Full banking services with trade finance',
      requirements: ['Company registration', 'Business plan', 'Tax clearance'],
    },
  ];

  const utilityServices = [
    {
      id: 'power-desco',
      provider: 'DESCO',
      service: 'Electricity Connection',
      capacity: '500 KW',
      fee: 'BDT 50,000',
      timeline: '15 days',
      status: 'pending',
      statusLabel: 'Application Submitted',
      description: 'Industrial power supply for manufacturing',
    },
    {
      id: 'gas-titas',
      provider: 'Titas Gas',
      service: 'Gas Connection',
      capacity: '1000 CFM',
      fee: 'BDT 75,000',
      timeline: '20 days',
      status: 'available',
      statusLabel: 'Ready to Apply',
      description: 'Natural gas for industrial use',
    },
    {
      id: 'water-wasa',
      provider: 'WASA',
      service: 'Water Connection',
      capacity: '5000 L/day',
      fee: 'BDT 25,000',
      timeline: '10 days',
      status: 'available',
      statusLabel: 'Ready to Apply',
      description: 'Industrial water supply',
    },
  ];

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      {/* Banking Services Section */}
      <InstrumentSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <div>
              <h3 className="text-3xl font-semibold text-[#0f172a] tracking-tight">🏦 Banking Services</h3>
              <p className="text-slate-600">Corporate accounts & financing</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {bankServices.map((bank, index) => (
              <motion.div
                key={bank.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-8 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-1 tracking-tight">{bank.name}</h4>
                    <p className="text-sm text-gray-600">{bank.service}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">{bank.description}</p>

                {bank.status === 'completed' && (
                  <div className="p-4 mb-4 bg-emerald-50/60 backdrop-blur-sm rounded-xl border border-emerald-200">
                    <p className="text-sm text-emerald-700 mb-2 font-medium">
                      ✓ {bank.statusLabel}
                    </p>
                    <p className="text-xs text-emerald-600">Your account is ready for use</p>
                  </div>
                )}

                {bank.status === 'available' && (
                  <div className="p-4 mb-4 bg-blue-50/60 backdrop-blur-sm rounded-xl border border-blue-200">
                    <p className="text-sm text-blue-700 mb-2 font-medium">
                      💰 {bank.statusLabel}
                    </p>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>• Fee: {bank.fee}</p>
                      <p>• Timeline: {bank.timeline}</p>
                    </div>
                  </div>
                )}

                {bank.requirements.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                    <ul className="space-y-1">
                      {bank.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleService(bank.id)}
                    className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedServices.includes(bank.id)
                        ? 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700'
                    }`}
                  >
                    {selectedServices.includes(bank.id) ? '✓ Selected' : 'Apply Now'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </InstrumentSection>

      {/* Utility Services Section */}
      <InstrumentSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-3xl font-semibold text-[#0f172a] tracking-tight">⚡ Utility Connections</h3>
              <p className="text-slate-600">Power, gas, and water setup</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {utilityServices.map((utility, index) => (
              <motion.div
                key={utility.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-6 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-gray-900 mb-1 tracking-tight">{utility.service}</h4>
                  <p className="text-sm text-gray-600">{utility.provider}</p>
                </div>

                <p className="text-sm text-gray-700 mb-4">{utility.description}</p>

                {utility.status === 'pending' && (
                  <div className="p-4 mb-4 bg-amber-50/60 backdrop-blur-sm rounded-xl border border-amber-200">
                    <p className="text-sm text-amber-700 mb-2 font-medium">
                      ⏱ {utility.statusLabel}
                    </p>
                    <p className="text-xs text-amber-600">Expected completion in {utility.timeline}</p>
                  </div>
                )}

                <div className="space-y-2 mb-4 text-xs text-gray-600">
                  <p>• Capacity: {utility.capacity}</p>
                  <p>• Fee: {utility.fee}</p>
                  <p>• Timeline: {utility.timeline}</p>
                </div>

                <button
                  onClick={() => toggleService(utility.id)}
                  className={`w-full px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedServices.includes(utility.id)
                      ? 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700'
                      : utility.status === 'pending'
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700'
                  }`}
                  disabled={utility.status === 'pending'}
                >
                  {selectedServices.includes(utility.id) ? '✓ Selected' : utility.status === 'pending' ? 'In Progress' : 'Apply Now'}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </InstrumentSection>

      {/* Benefits Section */}
      <InstrumentSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-8"
        >
          <h3 className="text-3xl font-semibold text-[#0f172a] mb-6 tracking-tight">✅ Benefits of Integrated Services</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-6 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Time Savings</h4>
                  <p className="text-sm text-gray-600">Apply for all services in one place</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Bundle Discounts</h4>
                  <p className="text-sm text-gray-600">Save up to 20% on bundled services</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Priority Processing</h4>
                  <p className="text-sm text-gray-600">Fast-track your applications</p>
                </div>
              </div>
            </div>
          </div>

          {selectedServices.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50/60 backdrop-blur-sm rounded-xl border border-blue-200">
              <p className="text-sm font-medium text-blue-900 mb-2">
                {selectedServices.length} service(s) selected
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all">
                Proceed with Bundle Application
              </button>
            </div>
          )}
        </motion.div>
      </InstrumentSection>

      {/* Enhanced Service Features */}
      <SectorServiceRecommendation sector="Manufacturing" />
      <BundledPackages />
      <ServiceDependencyGraph />
    </div>
  );
}