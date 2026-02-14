// 📦 PACKAGE TIER SELECTOR — UI for choosing Basic/Standard/Premium packages
// ARCHITECTURE: UI layer. Investor selects their preferred package tier.

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Star, Crown, ChevronRight, Info } from 'lucide-react';
import { PACKAGE_TIERS, type PackageTier } from './packageTiers';
import { glassCard } from '@/app/config/designSystem';
import { toast } from 'sonner';

interface PackageTierSelectorProps {
  onSelectPackage: (tier: PackageTier) => void;
  preSelectedTier?: 'basic' | 'standard' | 'premium';
}

export function PackageTierSelector({ onSelectPackage, preSelectedTier }: PackageTierSelectorProps) {
  const [selectedTier, setSelectedTier] = useState<'basic' | 'standard' | 'premium'>(
    preSelectedTier || 'standard'
  );
  const [showComparison, setShowComparison] = useState(false);

  const handleSelectTier = (tier: PackageTier) => {
    setSelectedTier(tier.id);
    toast.success(`${tier.name} selected! ${tier.totalApprovals} approvals in ${tier.duration} days.`);
  };

  const handleProceed = () => {
    const tier = PACKAGE_TIERS.find(t => t.id === selectedTier);
    if (tier) {
      onSelectPackage(tier);
    }
  };

  const getTierIcon = (tierId: 'basic' | 'standard' | 'premium') => {
    switch (tierId) {
      case 'basic': return Zap;
      case 'standard': return Star;
      case 'premium': return Crown;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Business Starter Package
          </h1>
          <p className="text-lg text-gray-600">
            Fast-track your company registration with our all-in-one packages
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              One-stop solution • Government-approved • Money-back guarantee
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-6">
          <div className={`${glassCard['p-4']} text-center`}>
            <div className="text-3xl font-bold text-blue-600">3-7</div>
            <div className="text-sm text-gray-600">Days to completion</div>
          </div>
          <div className={`${glassCard['p-4']} text-center`}>
            <div className="text-3xl font-bold text-purple-600">11</div>
            <div className="text-sm text-gray-600">Government approvals</div>
          </div>
          <div className={`${glassCard['p-4']} text-center`}>
            <div className="text-3xl font-bold text-green-600">27%</div>
            <div className="text-sm text-gray-600">Savings vs individual</div>
          </div>
        </div>
      </div>

      {/* Package Cards */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid md:grid-cols-3 gap-6">
          {PACKAGE_TIERS.map((tier, idx) => {
            const Icon = getTierIcon(tier.id);
            const isSelected = selectedTier === tier.id;
            
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative ${glassCard['p-6']} cursor-pointer transition-all ${
                  isSelected 
                    ? 'ring-4 ring-blue-500 shadow-2xl scale-105' 
                    : 'hover:shadow-xl hover:scale-102'
                } ${tier.recommended ? 'md:scale-105' : ''}`}
                onClick={() => handleSelectTier(tier)}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full">
                    {tier.badge}
                  </div>
                )}

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  tier.id === 'basic' ? 'bg-blue-100' :
                  tier.id === 'standard' ? 'bg-purple-100' :
                  'bg-gradient-to-br from-yellow-100 to-orange-100'
                }`}>
                  <Icon className={`w-8 h-8 ${
                    tier.id === 'basic' ? 'text-blue-600' :
                    tier.id === 'standard' ? 'text-purple-600' :
                    'text-orange-600'
                  }`} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-center mb-2">{tier.name}</h3>
                
                {/* Duration */}
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {tier.duration} Days
                  </div>
                  <div className="text-sm text-gray-500">{tier.totalApprovals} Government Approvals</div>
                </div>

                {/* Price */}
                <div className="text-center mb-6 pb-6 border-b">
                  <div className="text-3xl font-bold text-gray-900">${tier.price}</div>
                  <div className="text-sm text-green-600 font-medium">
                    Save ${tier.savings} ({tier.discountPercentage}% off)
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {tier.features.slice(0, 6).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Best For */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="text-xs font-semibold text-gray-500 mb-2">BEST FOR:</div>
                  <div className="space-y-1">
                    {tier.bestFor.slice(0, 2).map((item, i) => (
                      <div key={i} className="text-xs text-gray-600">• {item}</div>
                    ))}
                  </div>
                </div>

                {/* Select Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectTier(tier);
                  }}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Select Package'}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Comparison Table Toggle */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all font-medium text-gray-700"
        >
          <Info className="w-5 h-5" />
          {showComparison ? 'Hide' : 'Show'} Detailed Comparison
        </button>
      </div>

      {/* Comparison Table */}
      {showComparison && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="max-w-7xl mx-auto mb-8"
        >
          <div className={`${glassCard['p-6']} overflow-x-auto`}>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Service</th>
                  <th className="text-center py-3 px-4 font-semibold">Basic</th>
                  <th className="text-center py-3 px-4 font-semibold">Standard</th>
                  <th className="text-center py-3 px-4 font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {/* Core Services */}
                <tr className="bg-blue-50">
                  <td colSpan={4} className="py-2 px-4 font-bold text-sm text-blue-800">
                    INCORPORATION SERVICES (Days 1-3)
                  </td>
                </tr>
                {['Name Clearance', 'Bank Account', 'Company Incorporation', 'e-TIN', 'Trade License'].map((svc, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 px-4 text-sm">{svc}</td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                ))}
                
                {/* Post-Incorporation Services */}
                <tr className="bg-purple-50">
                  <td colSpan={4} className="py-2 px-4 font-bold text-sm text-purple-800">
                    POST-INCORPORATION SERVICES (Days 4-7)
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">VAT Registration</td>
                  <td className="text-center text-gray-300">—</td>
                  <td className="text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">Import-Export Certificate (IRC/ERC)</td>
                  <td className="text-center text-gray-300">—</td>
                  <td className="text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">Employee Provident Fund</td>
                  <td className="text-center text-gray-300">—</td>
                  <td className="text-center text-gray-300">—</td>
                  <td className="text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">Social Security Registration</td>
                  <td className="text-center text-gray-300">—</td>
                  <td className="text-center text-gray-300">—</td>
                  <td className="text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">Factory Registration</td>
                  <td className="text-center text-gray-300">—</td>
                  <td className="text-center text-gray-300">—</td>
                  <td className="text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">Environmental Clearance</td>
                  <td className="text-center text-gray-300">—</td>
                  <td className="text-center text-gray-300">—</td>
                  <td className="text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>

                {/* Totals */}
                <tr className="bg-gray-100 font-bold">
                  <td className="py-3 px-4">Total Services</td>
                  <td className="text-center">5</td>
                  <td className="text-center">7</td>
                  <td className="text-center">11</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="py-3 px-4">Duration</td>
                  <td className="text-center">3 days</td>
                  <td className="text-center">5 days</td>
                  <td className="text-center">7 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Proceed Button */}
      <div className="max-w-7xl mx-auto text-center">
        <button
          onClick={handleProceed}
          className="inline-flex items-center gap-3 px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105"
        >
          Proceed with {PACKAGE_TIERS.find(t => t.id === selectedTier)?.name}
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="mt-4 text-sm text-gray-500">
          You can upgrade or add services later if needed
        </div>
      </div>
    </div>
  );
}
