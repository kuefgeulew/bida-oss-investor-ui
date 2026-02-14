// Reduction Strategies - Carbon reduction recommendations & solar provider marketplace
// Mounts in: ESG Panel

import React, { useState } from 'react';
import { Sun, TrendingDown, DollarSign, Zap, CheckCircle, Phone, Mail, MapPin, Award, Calculator } from 'lucide-react';
import { toast } from 'sonner';

interface SolarProvider {
  id: string;
  name: string;
  logo: string;
  rating: number;
  projectsCompleted: number;
  capacity: string;
  priceRange: string;
  paybackPeriod: string;
  certifications: string[];
  phone: string;
  email: string;
  location: string;
  specialties: string[];
  sredaApproved: boolean;
}

interface ReductionStrategy {
  id: string;
  title: string;
  category: 'energy' | 'water' | 'waste' | 'transport';
  impact: 'high' | 'medium' | 'low';
  emissionReduction: number; // percentage
  costSaving: number; // annual BDT
  implementation: string;
  paybackPeriod: string;
  icon: any;
  difficulty: 'easy' | 'moderate' | 'complex';
}

interface ReductionStrategiesProps {
  currentEmissions: number; // tons CO2/year
  sector: string;
  investmentSize: number;
}

export function ReductionStrategies({ currentEmissions, sector, investmentSize }: ReductionStrategiesProps) {
  const [showSolarProviders, setShowSolarProviders] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<SolarProvider | null>(null);
  
  // SREDA-approved solar providers
  const solarProviders: SolarProvider[] = [
    {
      id: 'provider-1',
      name: 'SolarTech Bangladesh Ltd.',
      logo: '🌞',
      rating: 4.8,
      projectsCompleted: 150,
      capacity: '50kW - 5MW',
      priceRange: 'BDT 60-75/Wp',
      paybackPeriod: '3-4 years',
      certifications: ['SREDA Approved', 'ISO 9001', 'IEC 61215'],
      phone: '+880-2-9876543',
      email: 'info@solartechbd.com',
      location: 'Dhaka, Bangladesh',
      specialties: ['Rooftop Solar', 'Industrial', 'Grid-Tied Systems'],
      sredaApproved: true,
    },
    {
      id: 'provider-2',
      name: 'Green Energy Solutions',
      logo: '⚡',
      rating: 4.9,
      projectsCompleted: 200,
      capacity: '25kW - 10MW',
      priceRange: 'BDT 58-72/Wp',
      paybackPeriod: '2.8-3.5 years',
      certifications: ['SREDA Approved', 'ISO 14001', 'BNBC Certified'],
      phone: '+880-2-8765432',
      email: 'contact@greenenergy-bd.com',
      location: 'Chittagong, Bangladesh',
      specialties: ['Hybrid Systems', 'Battery Storage', 'Off-Grid'],
      sredaApproved: true,
    },
    {
      id: 'provider-3',
      name: 'Renewable Power BD',
      logo: '🔆',
      rating: 4.7,
      projectsCompleted: 120,
      capacity: '100kW - 3MW',
      priceRange: 'BDT 62-78/Wp',
      paybackPeriod: '3.2-4 years',
      certifications: ['SREDA Approved', 'PV Installer Certified'],
      phone: '+880-2-7654321',
      email: 'info@renewablepowerbd.com',
      location: 'Gazipur, Bangladesh',
      specialties: ['Factory Installations', 'Maintenance', 'Monitoring'],
      sredaApproved: true,
    },
  ];
  
  // Reduction strategies based on current emissions
  const strategies: ReductionStrategy[] = [
    {
      id: 'strategy-1',
      title: 'Install Rooftop Solar System',
      category: 'energy',
      impact: 'high',
      emissionReduction: 35,
      costSaving: 1250000, // BDT per year
      implementation: 'Install 250kW rooftop solar system. Covers 40% of electricity needs. SREDA-approved providers available.',
      paybackPeriod: '3.2 years',
      icon: Sun,
      difficulty: 'moderate',
    },
    {
      id: 'strategy-2',
      title: 'Upgrade to LED Lighting',
      category: 'energy',
      impact: 'medium',
      emissionReduction: 8,
      costSaving: 280000,
      implementation: 'Replace all fluorescent/incandescent bulbs with LED. Reduces electricity consumption by 50% for lighting.',
      paybackPeriod: '1.5 years',
      icon: Zap,
      difficulty: 'easy',
    },
    {
      id: 'strategy-3',
      title: 'Implement Water Recycling System',
      category: 'water',
      impact: 'medium',
      emissionReduction: 5,
      costSaving: 180000,
      implementation: 'Install closed-loop water recycling for non-potable uses. Reduces water consumption by 30%.',
      paybackPeriod: '2.8 years',
      icon: TrendingDown,
      difficulty: 'moderate',
    },
    {
      id: 'strategy-4',
      title: 'Optimize HVAC Systems',
      category: 'energy',
      impact: 'medium',
      emissionReduction: 12,
      costSaving: 420000,
      implementation: 'Install smart thermostats, improve insulation, and schedule maintenance. Reduces cooling costs by 25%.',
      paybackPeriod: '2 years',
      icon: Zap,
      difficulty: 'easy',
    },
    {
      id: 'strategy-5',
      title: 'Waste Heat Recovery',
      category: 'energy',
      impact: 'high',
      emissionReduction: 18,
      costSaving: 630000,
      implementation: 'Capture and reuse waste heat from production processes. Particularly effective for manufacturing.',
      paybackPeriod: '3.5 years',
      icon: TrendingDown,
      difficulty: 'complex',
    },
  ];
  
  // Calculate potential savings
  const totalPotentialReduction = strategies.reduce((sum, s) => sum + s.emissionReduction, 0);
  const totalPotentialSavings = strategies.reduce((sum, s) => sum + s.costSaving, 0);
  const newEmissions = currentEmissions * (1 - totalPotentialReduction / 100);
  
  const handleContactProvider = (provider: SolarProvider) => {
    setSelectedProvider(provider);
    toast.success(`Contact request sent to ${provider.name}`, {
      description: 'They will reach out within 24 hours',
    });
  };
  
  const handleCalculateROI = () => {
    toast.success('ROI Calculator opened', {
      description: 'Detailed financial analysis available',
    });
  };
  
  const getImpactColor = (impact: ReductionStrategy['impact']) => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const getDifficultyColor = (difficulty: ReductionStrategy['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'moderate': return 'text-orange-600';
      case 'complex': return 'text-red-600';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <TrendingDown className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Carbon Reduction Strategies</h2>
        </div>
        <p className="text-green-100">Actionable recommendations to reduce emissions and save costs</p>
      </div>
      
      {/* Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
          <div className="text-sm text-green-600 mb-1">Potential Emission Reduction</div>
          <div className="text-4xl font-bold text-green-900">{totalPotentialReduction}%</div>
          <div className="text-xs text-green-700 mt-2">
            {currentEmissions.toLocaleString()} → {Math.round(newEmissions).toLocaleString()} tons CO₂/year
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
          <div className="text-sm text-blue-600 mb-1">Annual Cost Savings</div>
          <div className="text-4xl font-bold text-blue-900">
            ৳{(totalPotentialSavings / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-blue-700 mt-2">
            Total: BDT {totalPotentialSavings.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6">
          <div className="text-sm text-orange-600 mb-1">Available Strategies</div>
          <div className="text-4xl font-bold text-orange-900">{strategies.length}</div>
          <div className="text-xs text-orange-700 mt-2">
            {strategies.filter(s => s.difficulty === 'easy').length} easy, {strategies.filter(s => s.difficulty === 'moderate').length} moderate
          </div>
        </div>
      </div>
      
      {/* Reduction Strategies */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Recommended Actions</h3>
        
        {strategies.map((strategy, index) => {
          const Icon = strategy.icon;
          
          return (
            <div
              key={strategy.id}
              className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{strategy.title}</h4>
                      <span className={`text-xs px-3 py-1 rounded-full font-bold border-2 ${getImpactColor(strategy.impact)}`}>
                        {strategy.impact.toUpperCase()} IMPACT
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{strategy.implementation}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <div className="text-xs text-green-600 mb-1">Emission Reduction</div>
                        <div className="text-xl font-bold text-green-900">{strategy.emissionReduction}%</div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="text-xs text-blue-600 mb-1">Annual Savings</div>
                        <div className="text-xl font-bold text-blue-900">
                          ৳{(strategy.costSaving / 1000).toLocaleString()}K
                        </div>
                      </div>
                      
                      <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                        <div className="text-xs text-orange-600 mb-1">Payback Period</div>
                        <div className="text-xl font-bold text-orange-900">{strategy.paybackPeriod}</div>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                        <div className="text-xs text-purple-600 mb-1">Difficulty</div>
                        <div className={`text-xl font-bold capitalize ${getDifficultyColor(strategy.difficulty)}`}>
                          {strategy.difficulty}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {index === 0 && (
                <div className="mt-4 pt-4 border-t-2 border-gray-200">
                  <button
                    onClick={() => setShowSolarProviders(!showSolarProviders)}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Sun className="w-5 h-5" />
                    View SREDA-Approved Solar Providers
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Solar Provider Marketplace */}
      {showSolarProviders && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Sun className="w-6 h-6 text-orange-600" />
              SREDA-Approved Solar Providers
            </h3>
            <button
              onClick={handleCalculateROI}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Calculate ROI
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solarProviders.map(provider => (
              <div
                key={provider.id}
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{provider.logo}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{provider.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-yellow-600">
                      {'⭐'.repeat(Math.floor(provider.rating))}
                      <span className="ml-1 text-gray-600">{provider.rating}</span>
                    </div>
                  </div>
                </div>
                
                {provider.sredaApproved && (
                  <div className="mb-4 px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full inline-block">
                    ✓ SREDA APPROVED
                  </div>
                )}
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2 text-sm">
                    <Award className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-700">Projects Completed</div>
                      <div className="text-gray-900">{provider.projectsCompleted}+</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 text-sm">
                    <Zap className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-700">Capacity Range</div>
                      <div className="text-gray-900">{provider.capacity}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-700">Price Range</div>
                      <div className="text-gray-900">{provider.priceRange}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 text-sm">
                    <TrendingDown className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-700">Payback Period</div>
                      <div className="text-gray-900">{provider.paybackPeriod}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-700 mb-2">Specialties:</div>
                  <div className="flex flex-wrap gap-1">
                    {provider.specialties.map(specialty => (
                      <span
                        key={specialty}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2 text-xs text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    <a href={`tel:${provider.phone}`} className="hover:text-blue-600">{provider.phone}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <a href={`mailto:${provider.email}`} className="hover:text-blue-600">{provider.email}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span>{provider.location}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleContactProvider(provider)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Request Quote
                </button>
              </div>
            ))}
          </div>
          
          {/* Incentives */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
            <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6" />
              Available Solar Incentives
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="font-bold text-green-900 mb-1">15% Tax Rebate</div>
                <p className="text-sm text-green-800">
                  On total system cost (SREDA approved installations only)
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="font-bold text-green-900 mb-1">Accelerated Depreciation</div>
                <p className="text-sm text-green-800">
                  80% depreciation in Year 1 for tax purposes
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="font-bold text-green-900 mb-1">Net Metering</div>
                <p className="text-sm text-green-800">
                  Sell excess power back to grid at retail rate
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Additional Resources */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Additional Resources</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-semibold text-gray-700 mb-2">📘 Implementation Guides</div>
            <ul className="space-y-1 text-gray-600">
              <li>• Solar Installation Best Practices</li>
              <li>• Energy Audit Checklist</li>
              <li>• Water Conservation Handbook</li>
            </ul>
          </div>
          
          <div>
            <div className="font-semibold text-gray-700 mb-2">🏛️ Government Programs</div>
            <ul className="space-y-1 text-gray-600">
              <li>• SREDA Green Financing</li>
              <li>• Infrastructure Development Company Limited (IDCOL)</li>
              <li>• Bangladesh Bank Green Transformation Fund</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
