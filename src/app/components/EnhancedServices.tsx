import { motion } from 'motion/react';
import { Zap, Package, GitBranch, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

/**
 * TAB 5 - SERVICES: Decision Engine
 */

export function SectorServiceRecommendation({ sector }: { sector: string }) {
  const sectorServices: Record<string, string[]> = {
    'Textiles': [
      'Environmental Clearance (DOE)',
      'Fire Safety Certificate',
      'Factory License (DIFE)',
      'Effluent Treatment Plant Approval',
      'Electricity Connection (High Voltage)',
      'Work Permits for Foreign Technicians',
      'Import Registration Certificate (IRC)'
    ],
    'IT Services': [
      'BIDA Registration',
      'Trade License',
      'Tax Identification Number (TIN)',
      'Work Permits for Foreign Staff',
      'Office Space Lease Registration'
    ],
    'Manufacturing': [
      'Environmental Clearance',
      'Fire Safety Certificate',
      'Factory License',
      'Boiler License',
      'Electricity Connection',
      'Gas Connection',
      'Work Permits'
    ]
  };

  const services = sectorServices[sector] || sectorServices['Manufacturing'];

  return (
    <div className="p-6 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">You Will Need These {services.length} Services</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Auto-generated for {sector} sector based on industry requirements
      </p>
      
      <div className="space-y-2 mb-4">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-purple-200 hover:shadow-md transition-all cursor-pointer"
            onClick={() => toast.info(`Viewing details: ${service}`)}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              {idx + 1}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{service}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-600" />
          </motion.div>
        ))}
      </div>
      
      <button
        onClick={() => toast.success('Applying for all recommended services...')}
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:from-purple-600 hover:to-purple-700 transition-all"
      >
        Apply for All Services (Save Time)
      </button>
    </div>
  );
}

export function BundledPackages() {
  const packages = [
    {
      name: 'Factory Setup Bundle',
      icon: '🏭',
      services: [
        'Environmental Clearance',
        'Fire Safety Certificate',
        'Factory License',
        'Electricity Connection',
        'Gas Connection'
      ],
      price: 'BDT 500,000',
      savings: '15% discount',
      timeline: '90 days average'
    },
    {
      name: 'Foreign Staff Bundle',
      icon: '👥',
      services: [
        'Work Permit (5 staff)',
        'Visa Recommendation Letter',
        'Immigration Clearance',
        'Police Verification'
      ],
      price: 'BDT 150,000',
      savings: '20% discount',
      timeline: '30 days average'
    },
    {
      name: 'Export Business Bundle',
      icon: '🚢',
      services: [
        'Export Registration Certificate',
        'Customs Clearance Setup',
        'Port Authority Registration',
        'Export Incentive Registration'
      ],
      price: 'BDT 200,000',
      savings: '10% discount',
      timeline: '45 days average'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="p-6 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
            <Package className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Bundled Service Packages</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Save time and money with pre-configured service bundles
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {packages.map((pkg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            onClick={() => toast.info(`Viewing bundle: ${pkg.name}`)}
          >
            <div className="text-5xl mb-3 text-center">{pkg.icon}</div>
            <h4 className="text-lg font-bold text-center mb-3 text-gray-900">{pkg.name}</h4>
            
            <div className="space-y-2 mb-4">
              {pkg.services.map((service, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Price:</span>
                <span className="font-bold text-blue-600">{pkg.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Savings:</span>
                <span className="font-bold text-emerald-600">{pkg.savings}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Timeline:</span>
                <span className="font-bold text-purple-600">{pkg.timeline}</span>
              </div>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                toast.success(`Applied for ${pkg.name}!`);
              }}
              className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Select Bundle
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ServiceDependencyGraph() {
  return (
    <div className="p-6 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
          <GitBranch className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Service Dependency Graph</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-6">
        Visual map showing which services depend on others
      </p>
      
      <div className="relative">
        {/* Level 1 */}
        <div className="flex justify-center mb-8">
          <div className="px-6 py-3 bg-emerald-50/80 backdrop-blur-sm border-2 border-emerald-600 rounded-xl font-semibold text-center text-gray-900">
            Company Registration (RJSC)
          </div>
        </div>
        
        {/* Arrow */}
        <div className="flex justify-center mb-4">
          <div className="text-2xl">⬇️</div>
        </div>
        
        {/* Level 2 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="px-4 py-3 bg-blue-50/80 backdrop-blur-sm border-2 border-blue-600 rounded-xl text-center text-sm font-semibold text-gray-900">
            BIDA Registration
          </div>
          <div className="px-4 py-3 bg-blue-50/80 backdrop-blur-sm border-2 border-blue-600 rounded-xl text-center text-sm font-semibold text-gray-900">
            Bank Account
          </div>
          <div className="px-4 py-3 bg-blue-50/80 backdrop-blur-sm border-2 border-blue-600 rounded-xl text-center text-sm font-semibold text-gray-900">
            Tax Registration
          </div>
        </div>
        
        {/* Arrow */}
        <div className="flex justify-center mb-4">
          <div className="text-2xl">⬇️</div>
        </div>
        
        {/* Level 3 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="px-4 py-3 bg-amber-50/80 backdrop-blur-sm border-2 border-amber-600 rounded-xl text-center text-sm font-semibold text-gray-900">
            Environmental Clearance
          </div>
          <div className="px-4 py-3 bg-amber-50/80 backdrop-blur-sm border-2 border-amber-600 rounded-xl text-center text-sm font-semibold text-gray-900">
            Fire Safety Certificate
          </div>
        </div>
        
        {/* Arrow */}
        <div className="flex justify-center mb-4">
          <div className="text-2xl">⬇️</div>
        </div>
        
        {/* Level 4 */}
        <div className="flex justify-center mb-8">
          <div className="px-6 py-3 bg-purple-50/80 backdrop-blur-sm border-2 border-purple-600 rounded-xl font-semibold text-center text-gray-900">
            Factory License
          </div>
        </div>
        
        {/* Arrow */}
        <div className="flex justify-center mb-4">
          <div className="text-2xl">⬇️</div>
        </div>
        
        {/* Level 5 */}
        <div className="flex justify-center">
          <div className="px-6 py-3 bg-emerald-50/80 backdrop-blur-sm border-2 border-emerald-600 rounded-xl font-semibold text-center text-gray-900">
            ✅ Commencement of Operations
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50/60 backdrop-blur-sm rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 <strong>Pro Tip:</strong> You can apply for services in parallel if they're at the same level. 
          For example, Environmental Clearance and Fire Safety can be processed simultaneously.
        </p>
      </div>
    </div>
  );
}