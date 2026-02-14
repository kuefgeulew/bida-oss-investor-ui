import { InstrumentCard, InstrumentSection } from './ui-primitives';
import { ZoneMapDisplay } from './ZoneMapDisplay';
import { UtilityStatusPanelEnhanced } from '../zones/UtilityStatusPanel_ENHANCED';
import { getZoneIntelligence } from '../zones/zoneIntelligenceEngine';
import { 
  TenantCompaniesPanel, 
  InfrastructureTimeline, 
  DistanceCalculator, 
  DownloadZoneBrochure, 
  ZoneImageGallery 
} from './EnhancedZoneFeatures';

import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Building2, CheckCircle2, TrendingUp, Filter, Navigation, Zap } from 'lucide-react';
import { sezZones, availablePlots, SEZZone } from '@/app/data/mockData';
import { useLanguage } from './LanguageContext';
import { toast } from 'sonner';

interface InvestmentZoneMapProps {
  onZoneSelect?: (zone: SEZZone) => void;
}

export function InvestmentZoneMap({ onZoneSelect }: InvestmentZoneMapProps) {
  const [selectedZone, setSelectedZone] = useState<SEZZone | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  const [ipaFilter, setIpaFilter] = useState<string>('all');
  const [mapCenter, setMapCenter] = useState<[number, number]>([23.8103, 90.4125]); // Dhaka, Bangladesh
  const [mapZoom, setMapZoom] = useState(7);
  
  const { t } = useLanguage();

  const handleZoneClick = (zone: SEZZone) => {
    setSelectedZone(zone);
    onZoneSelect?.(zone);
    
    // Center map on selected zone
    setMapCenter([zone.location.lat, zone.location.lng]);
    setMapZoom(10);
    
    toast.success(`${t('zones.viewDetails')}: ${zone.name}`);
  };

  const zonePlots = selectedZone 
    ? availablePlots.filter(p => p.zoneId === selectedZone.id)
    : [];

  // Filter zones by IPA agency
  const filteredZones = sezZones.filter(zone => {
    if (ipaFilter === 'all') return true;
    const ipaMapping: Record<string, string> = {
      'SEZ': 'BEZA',
      'EPZ': 'BEPZA',
      'Hi-Tech Park': 'BHTPA'
    };
    return ipaMapping[zone.type] === ipaFilter;
  });

  // Get recommended zones based on textile sector
  const recommendedZones = sezZones
    .filter(zone => zone.sectors.some(s => s.toLowerCase().includes('textile') || s.toLowerCase().includes('garment')))
    .slice(0, 3);

  const ipas = [
    { 
      id: 'all', 
      name: t('zones.allZones'), 
      icon: '🌐',
      zones: sezZones.length, 
      color: 'gray' 
    },
    { 
      id: 'BEZA', 
      name: t('zones.beza'), 
      icon: '🏭',
      zones: sezZones.filter(z => z.type === 'SEZ').length, 
      color: 'blue', 
      full: t('zones.bezaFull')
    },
    { 
      id: 'BEPZA', 
      name: t('zones.bepza'), 
      icon: '🏗️',
      zones: sezZones.filter(z => z.type === 'EPZ').length, 
      color: 'purple', 
      full: t('zones.bepzaFull')
    },
    { 
      id: 'BHTPA', 
      name: t('zones.bhtpa'), 
      icon: '💻',
      zones: sezZones.filter(z => z.type === 'Hi-Tech Park').length, 
      color: 'emerald', 
      full: t('zones.bhtpaFull')
    },
  ];

  const getIpaButtonClass = (ipa: typeof ipas[0]) => {
    const isActive = ipaFilter === ipa.id;
    
    const activeClasses: Record<string, string> = {
      'gray': 'bg-gradient-to-br from-gray-500 to-gray-600 text-white shadow-lg scale-105',
      'blue': 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-105',
      'purple': 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg scale-105',
      'emerald': 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg scale-105',
    };
    
    return isActive ? activeClasses[ipa.color] : 'hover:shadow-md';
  };

  const handleApplyForPlot = (plotId?: string) => {
    const message = plotId 
      ? `Application started for plot ${plotId}`
      : `Application started for zone: ${selectedZone?.name}`;
    toast.success(message);
  };

  const handleGetDirections = () => {
    if (selectedZone) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedZone.location.lat},${selectedZone.location.lng}`;
      window.open(url, '_blank');
      toast.info(t('zones.getDirections'));
    }
  };

  const handleReserveZone = (zone: SEZZone) => {
    toast.success(`Reservation request sent for ${zone.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <InstrumentSection>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {t('zones.title')}
          </h1>
          <p className="text-gray-600">
            {t('zones.clickZoneForDetails')}
          </p>
        </motion.div>
      </InstrumentSection>

      {/* IPA Filter Buttons */}
      <InstrumentSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-lg">{t('zones.filterByIPA')}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ipas.map((ipa) => (
              <button
                key={ipa.id}
                onClick={() => {
                  setIpaFilter(ipa.id);
                  toast.info(`${t('zones.filterByIPA')}: ${ipa.name}`);
                }}
                className={`p-4 rounded-xl transition-all ${getIpaButtonClass(ipa)}`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{ipa.icon}</div>
                  <div className="text-lg font-bold">{ipa.name}</div>
                  <div className={`text-xs ${ipaFilter === ipa.id ? 'text-white/80' : 'text-gray-600'}`}>
                    {ipa.zones} zones
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </InstrumentSection>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Recommended Zones */}
        <div className="space-y-4">
          <InstrumentCard>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                {t('zones.recommendedForYou')}
              </h3>
              <p className="text-xs text-gray-600 mb-4">{t('zones.basedOnSector')}: Textiles</p>
              
              <div className="space-y-3">
                {recommendedZones.map((zone) => (
                  <motion.div
                    key={zone.id}
                    className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 cursor-pointer hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleZoneClick(zone)}
                  >
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">{zone.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">📍 {zone.address}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-600 font-medium">
                        {zone.availablePlots} {t('zones.availablePlots').toLowerCase()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReserveZone(zone);
                        }}
                        className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        {t('zones.reserveNow')}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </InstrumentCard>

          {/* Legend */}
          <InstrumentCard>
            <div className="p-4">
              <h4 className="font-semibold mb-3">{t('zones.zoneTypes')}</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-sm">{t('zones.sez')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                  <span className="text-sm">{t('zones.epz')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                  <span className="text-sm">{t('zones.hiTechPark')}</span>
                </div>
              </div>
            </div>
          </InstrumentCard>
        </div>

        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <InstrumentCard>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Bangladesh Investment Zones
              </h3>
              
              <ZoneMapDisplay
                key={`map-${ipaFilter}`}
                zones={filteredZones}
                onZoneClick={handleZoneClick}
                center={mapCenter}
                zoom={mapZoom}
              />
            </div>
          </InstrumentCard>
        </div>

        {/* Right Panel: Zone Details */}
        <div className="space-y-4">
          {selectedZone ? (
            <InstrumentCard>
              <motion.div
                key={selectedZone.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl border border-[#e3ebf7] space-y-4"
              >
                <div className="mb-3">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                    selectedZone.type === 'SEZ' ? 'bg-blue-100 text-blue-700' :
                    selectedZone.type === 'EPZ' ? 'bg-purple-100 text-purple-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {selectedZone.type}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-1">{selectedZone.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">📍 {selectedZone.address}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {t('zones.zoneInformation')}
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">{t('zones.totalArea')}:</span> <span className="font-medium">{selectedZone.totalArea}</span></p>
                    <p><span className="text-gray-600">{t('zones.availablePlots')}:</span> <span className="font-medium text-emerald-600">{selectedZone.availablePlots}</span></p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">{t('zones.suitableSectors')}</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedZone.sectors.map((sector, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <button 
                    onClick={() => handleApplyForPlot()}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    {t('zones.applyForPlot')}
                  </button>
                  <button
                    onClick={handleGetDirections}
                    className="w-full px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    {t('zones.getDirections')}
                  </button>
                </div>
              </motion.div>
            </InstrumentCard>
          ) : (
            <InstrumentCard>
              <div className="p-8 rounded-2xl border border-[#e3ebf7] text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">{t('zones.selectZoneFromMap')}</p>
              </div>
            </InstrumentCard>
          )}
        </div>

        {/* Zone Details - Full Width Below Map */}
        {selectedZone && (
          <div className="lg:col-span-4 space-y-6">
            {/* Incentives & Utilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Incentives */}
              <InstrumentCard>
                <div className="p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    {t('zones.incentives')}
                  </h4>
                  <ul className="space-y-2">
                    {selectedZone.incentives.map((incentive, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{incentive}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </InstrumentCard>

              {/* Utilities Available */}
              <InstrumentCard>
                <div className="p-6">
                  <h4 className="text-lg font-semibold mb-4">{t('zones.utilitiesAvailable')}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedZone.utilities.map((utility, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span>{utility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </InstrumentCard>
            </div>
            
            {/* Utility Status Monitor - Enhanced Intelligence */}
            <InstrumentCard>
              <div className="p-6">
                <UtilityStatusPanelEnhanced zone={selectedZone} showDetailed={true} />
              </div>
            </InstrumentCard>

            {/* Available Plots - Full Width */}
            {zonePlots.length > 0 && (
              <InstrumentCard>
                <div className="p-6">
                  <h4 className="text-lg font-semibold mb-4">{t('zones.availablePlots')}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {zonePlots.map((plot) => (
                      <div key={plot.id} className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-gray-900">{t('zones.plot')} {plot.plotNumber}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            plot.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {t(`zones.${plot.status}` as any) || plot.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {plot.area} • <span className="font-semibold text-blue-600">BDT {(plot.price / 1000000).toFixed(1)}M</span>
                        </p>
                        {plot.status === 'available' && (
                          <button
                            onClick={() => handleApplyForPlot(plot.plotNumber)}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                          >
                            {t('zones.reserveNow')}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </InstrumentCard>
            )}
          </div>
        )}

        {/* Enhanced Zone Features - Full Width Below */}
        {selectedZone && (
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <TenantCompaniesPanel zoneName={selectedZone.name} />
            <InfrastructureTimeline zoneName={selectedZone.name} />
            <DistanceCalculator zoneName={selectedZone.name} coordinates={[selectedZone.location.lat, selectedZone.location.lng]} />
            <DownloadZoneBrochure zoneName={selectedZone.name} />
            <ZoneImageGallery zoneName={selectedZone.name} />
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InstrumentCard>
          <div className="p-8">
            <div className="text-2xl font-bold text-blue-600">{sezZones.filter(z => z.type === 'SEZ').length}</div>
            <div className="text-sm text-gray-600">{t('zones.sezZones')}</div>
          </div>
        </InstrumentCard>
        <InstrumentCard>
          <div className="p-8">
            <div className="text-2xl font-bold text-purple-600">{sezZones.filter(z => z.type === 'EPZ').length}</div>
            <div className="text-sm text-gray-600">{t('zones.epzZones')}</div>
          </div>
        </InstrumentCard>
        <InstrumentCard>
          <div className="p-8">
            <div className="text-2xl font-bold text-emerald-600">{sezZones.filter(z => z.type === 'Hi-Tech Park').length}</div>
            <div className="text-sm text-gray-600">{t('zones.hiTechParks')}</div>
          </div>
        </InstrumentCard>
        <InstrumentCard>
          <div className="p-8">
            <div className="text-2xl font-bold text-orange-600">{availablePlots.filter(p => p.status === 'available').length}</div>
            <div className="text-sm text-gray-600">{t('zones.availablePlotsCount')}</div>
          </div>
        </InstrumentCard>
      </div>
    </div>
  );
}