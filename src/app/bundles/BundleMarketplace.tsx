// 📦 BUNDLE MARKETPLACE — Browse and purchase starter bundles
// ARCHITECTURE: UI layer. Display and purchase interface for bundles.

import React, { useState } from 'react';
import {
  Package,
  Clock,
  DollarSign,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  ArrowRight,
  Info,
  Zap,
  Target
} from 'lucide-react';
import { starterBundles, recommendBundles, getBundleStats, type StarterBundle } from './bundleRegistry';
import { purchaseBundle, getBundleProgress } from './bundleEngine';
import { glassCard } from '@/app/config/designSystem';
import { toast } from 'sonner';

interface BundleMarketplaceProps {
  bbid?: string;
  investorId?: string;
  companyName?: string;
  sector?: string;
  investmentSize?: StarterBundle['targetInvestmentSize'];
  onPurchase?: (bundleId: string) => void;
}

export function BundleMarketplace({
  bbid,
  investorId,
  companyName = 'Your Company',
  sector,
  investmentSize,
  onPurchase
}: BundleMarketplaceProps) {
  const [selectedBundle, setSelectedBundle] = useState<StarterBundle | null>(null);
  const [filterSector, setFilterSector] = useState<string>(sector || 'all');
  const [showRecommended, setShowRecommended] = useState(true);

  const stats = getBundleStats();
  const recommendedBundles = sector || investmentSize 
    ? recommendBundles(sector, investmentSize)
    : starterBundles.filter(b => b.active);

  const displayBundles = showRecommended && recommendedBundles.length > 0
    ? recommendedBundles
    : starterBundles.filter(b => 
        b.active && 
        (filterSector === 'all' || b.targetSector.includes(filterSector))
      );

  const handlePurchase = (bundle: StarterBundle) => {
    if (!bbid) {
      toast.error('BBID required to purchase bundle');
      return;
    }

    try {
      const purchase = purchaseBundle(bbid, companyName, bundle.bundleId, investorId);
      toast.success(`${bundle.name} added to cart! Invoice #${purchase.invoiceId}`);
      onPurchase?.(bundle.bundleId);
      setSelectedBundle(null);
    } catch (error) {
      toast.error('Failed to purchase bundle');
      console.error(error);
    }
  };

  const getBundleIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      'Factory': <Package className="w-8 h-8" />,
      'Laptop': <Zap className="w-8 h-8" />,
      'Ship': <TrendingUp className="w-8 h-8" />,
      'MapPin': <Target className="w-8 h-8" />,
      'Briefcase': <Users className="w-8 h-8" />
    };
    return icons[iconName] || <Package className="w-8 h-8" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${glassCard} p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Package className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Starter Bundle Marketplace</h1>
              <p className="text-gray-600">Pre-packaged services to fast-track your investment</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.activeBundles}</div>
            <div className="text-sm text-gray-600">Active Bundles</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.totalUsers}+</div>
            <div className="text-sm text-gray-600">Companies Served</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stats.avgDiscount}%</div>
            <div className="text-sm text-gray-600">Avg. Savings</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{stats.avgTimeSaved}</div>
            <div className="text-sm text-gray-600">Days Saved</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`${glassCard} p-4 flex gap-3`}>
        <button
          onClick={() => setShowRecommended(!showRecommended)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            showRecommended
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Star className="w-4 h-4 inline mr-2" />
          Recommended for You
        </button>
        
        <select
          value={filterSector}
          onChange={(e) => setFilterSector(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Sectors</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="ICT">ICT/Software</option>
          <option value="Textiles">Textiles</option>
          <option value="Services">Services</option>
          <option value="Agriculture">Agriculture</option>
        </select>
      </div>

      {/* Bundle Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayBundles.map((bundle) => (
          <div
            key={bundle.bundleId}
            className={`${glassCard} p-6 hover:shadow-xl transition-all cursor-pointer border-2 ${
              selectedBundle?.bundleId === bundle.bundleId
                ? 'border-blue-500'
                : 'border-transparent'
            }`}
            onClick={() => setSelectedBundle(bundle)}
          >
            {/* Icon & Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                {getBundleIcon(bundle.icon)}
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold">{bundle.popularity}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-2">{bundle.name}</h3>
            {bundle.nameLocal && (
              <p className="text-sm text-gray-600 mb-3">{bundle.nameLocal}</p>
            )}

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{bundle.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-4 h-4 text-blue-500" />
                <div>
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="font-semibold text-sm">{bundle.totalTime} days</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <div>
                  <div className="text-xs text-gray-500">Services</div>
                  <div className="font-semibold text-sm">{bundle.services.length}</div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs text-gray-600 line-through">
                    ${bundle.individualPrice.toLocaleString()}
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    ${bundle.bundlePrice.toLocaleString()}
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-bold">
                  Save {bundle.discountPercentage}%
                </div>
              </div>
              {bundle.fastTrackDays && (
                <div className="flex items-center gap-1 mt-2 text-sm text-purple-600">
                  <Zap className="w-4 h-4" />
                  {bundle.fastTrackDays} days faster
                </div>
              )}
            </div>

            {/* Popularity */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Users className="w-4 h-4" />
              <span>{bundle.usedBy}+ companies chose this</span>
            </div>

            {/* CTA */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePurchase(bundle);
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
            >
              Purchase Bundle
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Selected Bundle Details Modal */}
      {selectedBundle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className={`${glassCard} max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedBundle.name}</h2>
                <p className="text-gray-600 mt-1">{selectedBundle.description}</p>
              </div>
              <button
                onClick={() => setSelectedBundle(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Included Services */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Included Services ({selectedBundle.services.length})
              </h3>
              <div className="space-y-2">
                {selectedBundle.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{service.serviceName}</div>
                      <div className="text-sm text-gray-600">{service.agency} • {service.processingDays} days</div>
                      {service.description && (
                        <div className="text-xs text-gray-500 mt-1">{service.description}</div>
                      )}
                    </div>
                    <div className="font-semibold text-gray-700">
                      ${service.fee}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended For */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Recommended For:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedBundle.recommendedFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Eligibility */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                Eligibility Criteria:
              </h3>
              <ul className="space-y-2">
                {selectedBundle.eligibilityCriteria.map((criteria, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {criteria}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action */}
            <button
              onClick={() => handlePurchase(selectedBundle)}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium text-lg flex items-center justify-center gap-2"
            >
              Purchase for ${selectedBundle.bundlePrice.toLocaleString()}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
