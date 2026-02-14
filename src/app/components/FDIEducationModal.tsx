import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Users, Handshake, CheckCircle, Info, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface FDIEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FDIEducationModal({ isOpen, onClose }: FDIEducationModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'greenfield' | 'brownfield' | 'jointventure' | 'legal'>('overview');
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Info className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{t('fdi.whatIsFDI')}</h2>
                      <p className="text-blue-100 text-sm">Understanding Foreign Direct Investment in Bangladesh</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      activeTab === 'overview'
                        ? 'bg-white text-blue-600'
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('greenfield')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      activeTab === 'greenfield'
                        ? 'bg-white text-green-600'
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    🌱 Greenfield
                  </button>
                  <button
                    onClick={() => setActiveTab('brownfield')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      activeTab === 'brownfield'
                        ? 'bg-white text-orange-600'
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    🏗️ Brownfield
                  </button>
                  <button
                    onClick={() => setActiveTab('jointventure')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      activeTab === 'jointventure'
                        ? 'bg-white text-purple-600'
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    🤝 Joint Venture
                  </button>
                  <button
                    onClick={() => setActiveTab('legal')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      activeTab === 'legal'
                        ? 'bg-white text-red-600'
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    ⚖️ Legal Requirements
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                      <h3 className="text-xl font-bold text-blue-900 mb-3">
                        What is FDI? (Foreign Direct Investment)
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {t('fdi.definition')}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200">
                        <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                          <X className="w-5 h-5" />
                          NOT FDI - Portfolio Investment
                        </h4>
                        <p className="text-sm text-gray-700">
                          Buying stocks from far away WITHOUT control or management influence. Just passive investment in the stock market.
                        </p>
                      </div>

                      <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                        <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          TRUE FDI
                        </h4>
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li>✅ Control & management voice</li>
                          <li>✅ Long-term presence in country</li>
                          <li>✅ Brings capital + technology + expertise</li>
                          <li>✅ Part of real economy, not just financial</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        🌳 Think of FDI as "Planting Economic Roots"
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">🌱</span>
                          <div>
                            <strong className="text-green-700">Greenfield:</strong> Plant a NEW tree (build new company from scratch)
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">🏗️</span>
                          <div>
                            <strong className="text-orange-700">Brownfield:</strong> Buy and grow an EXISTING tree (invest in local company)
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">🤝</span>
                          <div>
                            <strong className="text-purple-700">Joint Venture:</strong> Co-plant a tree with locals (partnership)
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>💡 Key Point:</strong> All three methods above are considered FDI in Bangladesh. Click the tabs above to learn about each method in detail.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'greenfield' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{t('fdi.greenfield')}</h3>
                        <p className="text-gray-600">Creating a Brand-New Company in Bangladesh</p>
                      </div>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
                      <p className="text-gray-700 leading-relaxed">
                        {t('fdi.greenfieldDesc')}
                      </p>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ArrowRight className="w-5 h-5 text-green-600" />
                        Step-by-Step Process:
                      </h4>
                      <div className="space-y-4">
                        {[
                          { step: 1, title: 'Register new legal entity', desc: 'File with RJSC (Registrar of Joint Stock Companies)' },
                          { step: 2, title: 'Bring foreign equity capital', desc: 'Transfer money from abroad through Bangladesh Bank' },
                          { step: 3, title: 'Buy land, build factory/office', desc: 'Purchase property in SEZ or industrial zone' },
                          { step: 4, title: 'Hire local workers', desc: 'Recruit and train Bangladeshi employees' },
                          { step: 5, title: 'Start operations', desc: 'Begin manufacturing, trading, or providing services' },
                        ].map((item) => (
                          <div key={item.step} className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                              {item.step}
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900">{item.title}</h5>
                              <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h4 className="font-bold text-blue-900 mb-3">📊 Real Examples in Bangladesh:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• <strong>Honda Bangladesh Limited</strong> - Built motorcycle plant from scratch</li>
                        <li>• <strong>Berger Fosroc Limited</strong> - Set up new paint manufacturing facility</li>
                        <li>• <strong>100% foreign garment factories in EPZs</strong> - New textile production units</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 border-2 border-green-300 p-4 rounded-lg">
                      <h4 className="font-bold text-green-900 mb-2">✅ Effect on Bangladesh Economy:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>🎯 <strong>NEW capacity created</strong></li>
                        <li>💼 New jobs for Bangladeshi workers</li>
                        <li>🏭 New production facilities</li>
                        <li>📦 New exports and revenue</li>
                        <li>🔬 Technology transfer and training</li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'brownfield' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{t('fdi.brownfield')}</h3>
                        <p className="text-gray-600">Investing in an Existing Bangladeshi Company</p>
                      </div>
                    </div>

                    <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
                      <p className="text-gray-700 leading-relaxed">
                        {t('fdi.brownfieldDesc')}
                      </p>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ArrowRight className="w-5 h-5 text-orange-600" />
                        How It Works:
                      </h4>
                      <div className="space-y-4">
                        {[
                          { step: 1, title: 'Purchase equity from local company', desc: 'Buy shares from existing owners or inject new capital' },
                          { step: 2, title: 'Take board seats', desc: 'Join board of directors for decision-making power' },
                          { step: 3, title: 'Gain management influence', desc: 'Participate in strategic and operational decisions' },
                          { step: 4, title: 'Expand & modernize business', desc: 'Bring technology, expertise, and investment for growth' },
                        ].map((item) => (
                          <div key={item.step} className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                              {item.step}
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900">{item.title}</h5>
                              <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h4 className="font-bold text-blue-900 mb-3">📊 Real Examples in Bangladesh:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• <strong>Grameenphone</strong> - Owned by Norway's Telenor (acquired major stake)</li>
                        <li>• <strong>bKash Limited</strong> - Investment from China's Ant Group (Alibaba)</li>
                        <li>• <strong>Foreign stakes in local banks</strong> - International banks buying into Bangladeshi banks</li>
                        <li>• <strong>Pharmaceutical companies</strong> - Foreign pharma investing in local manufacturers</li>
                        <li>• <strong>Power plants</strong> - International energy companies buying into existing plants</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 border-2 border-orange-300 p-4 rounded-lg">
                      <h4 className="font-bold text-orange-900 mb-2">✅ Effect on Bangladesh Economy:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>🎯 <strong>Existing capacity becomes stronger</strong></li>
                        <li>⚡ More efficient operations</li>
                        <li>🔬 Technology upgrade</li>
                        <li>💰 More capital for expansion</li>
                        <li>🌍 Access to global markets and expertise</li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'jointventure' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <Handshake className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{t('fdi.jointVenture')}</h3>
                        <p className="text-gray-600">Foreign + Local Partnership</p>
                      </div>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
                      <p className="text-gray-700 leading-relaxed">
                        {t('fdi.jointVentureDesc')}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                        <h4 className="font-bold text-blue-900 mb-3">🌍 Foreign Partner Brings:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>✅ Capital (money)</li>
                          <li>✅ Technology & expertise</li>
                          <li>✅ Global market access</li>
                          <li>✅ Brand reputation</li>
                          <li>✅ Management systems</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                        <h4 className="font-bold text-green-900 mb-3">🇧🇩 Local Partner Brings:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>✅ Local knowledge</li>
                          <li>✅ Government relationships</li>
                          <li>✅ Distribution networks</li>
                          <li>✅ Cultural understanding</li>
                          <li>✅ Land & facilities</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4">🤝 Typical Structure:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="w-24 text-center">
                            <div className="text-2xl font-bold text-blue-600">40-60%</div>
                            <div className="text-xs text-gray-600">Foreign</div>
                          </div>
                          <div className="text-2xl">+</div>
                          <div className="w-24 text-center">
                            <div className="text-2xl font-bold text-green-600">40-60%</div>
                            <div className="text-xs text-gray-600">Local</div>
                          </div>
                          <div className="text-2xl">=</div>
                          <div className="flex-1">
                            <div className="text-lg font-bold text-purple-600">New Joint Company</div>
                            <div className="text-xs text-gray-600">Both partners share ownership & control</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h4 className="font-bold text-blue-900 mb-3">📊 Real Examples in Bangladesh:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• <strong>LafargeHolcim Bangladesh Limited</strong> - Swiss cement giant + local sponsors</li>
                        <li>• <strong>Honda Bangladesh Limited</strong> - Japanese Honda + Bangladeshi partners</li>
                        <li>• <strong>Many garment factories</strong> - Foreign buyers + local manufacturers</li>
                        <li>• <strong>Pharmaceutical JVs</strong> - International pharma + local companies</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 border-2 border-purple-300 p-4 rounded-lg">
                      <h4 className="font-bold text-purple-900 mb-2">✅ Effect on Bangladesh Economy:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>🎯 <strong>Best of both worlds</strong></li>
                        <li>💼 Local knowledge meets global expertise</li>
                        <li>🤝 Risk sharing between partners</li>
                        <li>🌱 Faster market entry</li>
                        <li>💡 Knowledge transfer to local partner</li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'legal' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{t('fdi.legalRequirement')}</h3>
                        <p className="text-gray-600">What Makes It Legally "FDI" in Bangladesh?</p>
                      </div>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                      <p className="text-gray-700 leading-relaxed">
                        {t('fdi.legalRequirementDesc')}
                      </p>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4">⚖️ Three Legal Criteria for FDI:</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                            1
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">Money Comes from Abroad as Equity</h5>
                            <p className="text-sm text-gray-600 mt-1">Not a loan, not portfolio investment. Must be equity capital (ownership stake) transferred from foreign country.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                            2
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">Investor Owns 10%+ With Control/Voice</h5>
                            <p className="text-sm text-gray-600 mt-1">Must own at least 10% of company AND have management influence (board seat, voting rights, operational control).</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                          <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                            3
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">Registered with BIDA & Reported to Bangladesh Bank</h5>
                            <p className="text-sm text-gray-600 mt-1">Must register with Bangladesh Investment Development Authority (BIDA) and report all foreign currency inflows to Bangladesh Bank.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-xl">
                      <h4 className="font-bold text-yellow-900 mb-3">⚠️ Not FDI If:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>❌ Just buying stocks in stock market without control = <strong>Portfolio Investment</strong></li>
                        <li>❌ Loan from foreign bank = <strong>Foreign Debt</strong></li>
                        <li>❌ Exporting goods to Bangladesh = <strong>Trade</strong></li>
                        <li>❌ Contract manufacturing/outsourcing = <strong>Trade Agreement</strong></li>
                      </ul>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4">📋 Practical FDI Flow in Bangladesh:</h4>
                      <div className="space-y-3">
                        {[
                          { step: 1, title: 'Decide sector & business type', agency: 'Self' },
                          { step: 2, title: 'Register with BIDA', agency: 'BIDA (Bangladesh Investment Development Authority)' },
                          { step: 3, title: 'Open bank account', agency: 'Any Bangladeshi bank' },
                          { step: 4, title: 'Bring foreign currency', agency: 'Wire transfer from abroad' },
                          { step: 5, title: 'Convert to BDT through bank', agency: 'Bank records as FDI inflow' },
                          { step: 6, title: 'Use money to build/buy equity', agency: 'Start operations' },
                          { step: 7, title: 'Repatriate profits later', agency: 'Can send profits abroad legally through banks' },
                        ].map((item) => (
                          <div key={item.step} className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-gray-700 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                              {item.step}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900">{item.title}</h5>
                              <p className="text-sm text-gray-600">{item.agency}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-green-50 border-2 border-green-300 p-4 rounded-lg">
                      <h4 className="font-bold text-green-900 mb-2">✅ Who Tracks FDI in Bangladesh:</h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• <strong>BIDA</strong> - Registration & facilitation</li>
                        <li>• <strong>Bangladesh Bank</strong> - Currency flows & statistics</li>
                        <li>• <strong>RJSC</strong> - Company registration</li>
                        <li>• <strong>NBR</strong> - Tax compliance</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 border-t border-gray-200 p-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  💡 All three methods (Greenfield, Brownfield, Joint Venture) are FDI
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Got It!
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
