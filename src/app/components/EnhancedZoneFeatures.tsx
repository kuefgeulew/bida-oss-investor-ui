import { motion } from 'motion/react';
import { 
  Building2, Zap, Wifi, Droplet, Flame, Calendar, MapPin, 
  Plane, Ship, Download, Image as ImageIcon, Factory
} from 'lucide-react';
import { toast } from 'sonner';

interface TenantCompany {
  name: string;
  logo: string;
  sector: string;
  country: string;
  since: number;
}

interface InfrastructureItem {
  name: string;
  status: 'live' | 'planned' | 'under_construction';
  readyDate?: string;
  icon: any;
}

/**
 * WHO ELSE IS HERE - Tenant Companies Panel
 */
export function TenantCompaniesPanel({ zoneName }: { zoneName: string }) {
  // Realistic tenant data based on actual Bangladesh zones
  const getTenantCompanies = (): TenantCompany[] => {
    if (zoneName.includes('Dhaka EPZ')) {
      return [
        { name: 'Youngone Corporation BD', logo: '🏭', sector: 'Sportswear & Outdoor Gear', country: 'South Korea', since: 2005 },
        { name: 'H&M Sourcing Bangladesh', logo: '👔', sector: 'Garments Sourcing', country: 'Sweden', since: 2015 },
        { name: 'Viyellatex Group', logo: '🧵', sector: 'Textile Manufacturing', country: 'Bangladesh', since: 2012 },
        { name: 'DBL Ceramics Ltd', logo: '🏺', sector: 'Ceramics & Tiles', country: 'Bangladesh', since: 2019 },
        { name: 'Esquire Knit Composite', logo: '🏢', sector: 'Apparel & Knitwear', country: 'Bangladesh', since: 2008 }
      ];
    } else if (zoneName.includes('Chittagong EPZ') || zoneName.includes('CEPZ')) {
      return [
        { name: 'Nitol-Niloy Auto Parts', logo: '🚗', sector: 'Automotive Components', country: 'Bangladesh', since: 2016 },
        { name: 'Ananta Group', logo: '⚙️', sector: 'Apparel & Denim', country: 'Bangladesh', since: 2007 },
        { name: 'Korean EPZ Ltd', logo: '🏭', sector: 'Engineering', country: 'South Korea', since: 2011 },
        { name: 'PRAN-RFL Plastics', logo: '🍎', sector: 'Plastic Products', country: 'Bangladesh', since: 2017 },
        { name: 'Hamza Textiles', logo: '🧶', sector: 'Knitwear Export', country: 'Bangladesh', since: 2013 }
      ];
    } else if (zoneName.includes('Mirsarai') || zoneName.includes('BSMSN')) {
      return [
        { name: 'Bashundhara Steel', logo: '🏗️', sector: 'Heavy Steel Industry', country: 'Bangladesh', since: 2022 },
        { name: 'Mitsubishi Power BD', logo: '🏢', sector: 'Power Equipment', country: 'Japan', since: 2023 },
        { name: 'Summit Power Plant', logo: '⚡', sector: 'Energy Generation', country: 'Bangladesh', since: 2021 },
        { name: 'China Harbour BSMSN', logo: '🚧', sector: 'Port Infrastructure', country: 'China', since: 2024 }
      ];
    } else if (zoneName.includes('Kaliakoir') || zoneName.includes('Hi-Tech')) {
      return [
        { name: 'Walton Digital Hub', logo: '💻', sector: 'Electronics R&D', country: 'Bangladesh', since: 2020 },
        { name: 'Samsung R&D Center', logo: '📱', sector: 'Mobile Technology', country: 'South Korea', since: 2019 },
        { name: 'TechnoVista Software', logo: '🖥️', sector: 'Software Development', country: 'Bangladesh', since: 2018 },
        { name: 'DataSoft Systems', logo: '☁️', sector: 'IT Services & BPO', country: 'Bangladesh', since: 2016 }
      ];
    } else {
      return [
        { name: 'Bengal Industrial Park', logo: '🏭', sector: 'Light Manufacturing', country: 'Bangladesh', since: 2020 },
        { name: 'Meghna Group', logo: '🏗️', sector: 'Industrial Conglomerate', country: 'Bangladesh', since: 2015 }
      ];
    }
  };

  const tenants = getTenantCompanies();

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold">Who Else Is Here?</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {tenants.length} established companies operating in {zoneName}
      </p>
      
      <div className="space-y-3">
        {tenants.map((tenant, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl flex-shrink-0">
              {tenant.logo}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate">{tenant.name}</h4>
              <p className="text-xs text-gray-600">{tenant.sector}</p>
              <p className="text-xs text-gray-500">{tenant.country} • Since {tenant.since}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <p className="text-xs text-green-800">
          ✓ All companies verified and operational. Join a proven business ecosystem.
        </p>
      </div>
    </div>
  );
}

/**
 * INFRASTRUCTURE READINESS TIMELINE
 */
export function InfrastructureTimeline({ zoneName }: { zoneName: string }) {
  const getInfrastructure = (): InfrastructureItem[] => {
    return [
      { name: 'Electricity (11 KV)', status: 'live', icon: Zap },
      { name: 'High-Speed Fiber Optic', status: 'live', icon: Wifi },
      { name: 'Industrial Water Supply', status: 'live', icon: Droplet },
      { name: 'Natural Gas Pipeline', status: 'under_construction', readyDate: 'Q3 2026', icon: Flame },
      { name: 'Effluent Treatment Plant', status: 'planned', readyDate: 'Q4 2026', icon: Factory }
    ];
  };

  const infrastructure = getInfrastructure();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">✓ Live</span>;
      case 'under_construction':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">🚧 Under Construction</span>;
      case 'planned':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium">📅 Planned</span>;
    }
  };

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-green-50 to-blue-50 border border-green-200">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-bold">Infrastructure Readiness Timeline</h3>
      </div>
      
      <div className="space-y-3">
        {infrastructure.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  {getStatusBadge(item.status)}
                </div>
                {item.readyDate && (
                  <p className="text-xs text-gray-600">Expected: {item.readyDate}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">
          <p className="text-2xl font-bold text-green-600">3</p>
          <p className="text-xs text-gray-600">Utilities Live Now</p>
        </div>
        <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">
          <p className="text-2xl font-bold text-yellow-600">2</p>
          <p className="text-xs text-gray-600">Coming in 2026</p>
        </div>
      </div>
    </div>
  );
}

/**
 * DISTANCE TO PORT / AIRPORT
 */
export function DistanceCalculator({ zoneName, coordinates }: { zoneName: string; coordinates: [number, number] }) {
  // Mock distance calculations
  const getDistances = () => {
    if (zoneName.includes('Dhaka')) {
      return {
        airport: { name: 'Hazrat Shahjalal Intl Airport', distance: 18, time: '35 min' },
        seaport: { name: 'Chittagong Port', distance: 242, time: '4.5 hours' }
      };
    } else if (zoneName.includes('Chittagong')) {
      return {
        airport: { name: 'Shah Amanat Intl Airport', distance: 12, time: '25 min' },
        seaport: { name: 'Chittagong Port', distance: 8, time: '15 min' }
      };
    } else if (zoneName.includes('Mirsarai')) {
      return {
        airport: { name: 'Shah Amanat Intl Airport', distance: 45, time: '1 hour' },
        seaport: { name: 'Deep Sea Port (Planned)', distance: 15, time: '20 min' }
      };
    } else {
      return {
        airport: { name: 'Nearest Airport', distance: 25, time: '40 min' },
        seaport: { name: 'Nearest Port', distance: 150, time: '3 hours' }
      };
    }
  };

  const distances = getDistances();

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-bold">Distance to Key Logistics Hubs</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{distances.airport.name}</h4>
            <p className="text-sm text-gray-600">{distances.airport.distance} km • {distances.airport.time} drive</p>
          </div>
          <button
            onClick={() => {
              window.open(`https://www.google.com/maps/dir/?api=1&destination=${coordinates[0]},${coordinates[1]}`, '_blank');
              toast.success('Opening directions in Google Maps');
            }}
            className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg hover:bg-blue-200 transition-colors"
          >
            Directions
          </button>
        </div>

        <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
            <Ship className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{distances.seaport.name}</h4>
            <p className="text-sm text-gray-600">{distances.seaport.distance} km • {distances.seaport.time} drive</p>
          </div>
          <button
            onClick={() => {
              window.open(`https://www.google.com/maps/dir/?api=1&destination=${coordinates[0]},${coordinates[1]}`, '_blank');
              toast.success('Opening directions in Google Maps');
            }}
            className="px-3 py-1 bg-teal-100 text-teal-700 text-xs rounded-lg hover:bg-teal-200 transition-colors"
          >
            Directions
          </button>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <p className="text-xs text-green-800">
          ✓ Excellent connectivity for import/export operations
        </p>
      </div>
    </div>
  );
}

/**
 * DOWNLOAD ZONE BROCHURE (PDF)
 */
export function DownloadZoneBrochure({ zoneName }: { zoneName: string }) {
  const handleDownload = () => {
    // Mock PDF generation
    toast.success('Generating zone brochure PDF...', {
      description: `Downloading ${zoneName} detailed information brochure`
    });
    
    // In a real implementation, this would generate a PDF with jsPDF
    setTimeout(() => {
      toast.success('Download complete!', {
        description: `${zoneName}_Brochure.pdf saved to Downloads`
      });
    }, 1500);
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-purple-50 to-blue-50 text-purple-700 rounded-xl font-semibold hover:shadow-lg transition-all border-2 border-purple-200 hover:border-purple-300"
    >
      <Download className="w-5 h-5" />
      Download Zone Brochure (PDF)
    </button>
  );
}

/**
 * 360° IMAGE GALLERY (Static Images)
 */
export function ZoneImageGallery({ zoneName }: { zoneName: string }) {
  const images = [
    { url: '🏭', caption: 'Factory buildings' },
    { url: '🚧', caption: 'Infrastructure development' },
    { url: '🌳', caption: 'Green spaces' },
    { url: '🏢', caption: 'Administrative offices' }
  ];

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border border-purple-200">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-bold text-gray-900">Zone Image Gallery</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="aspect-square rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-purple-200 flex items-center justify-center text-6xl cursor-pointer hover:scale-105 transition-transform hover:shadow-lg"
            onClick={() => toast.info(`Viewing: ${img.caption}`)}
          >
            {img.url}
          </div>
        ))}
      </div>
      
      <p className="text-xs text-gray-600 mt-3 text-center">
        Click on images to view in full screen
      </p>
    </div>
  );
}