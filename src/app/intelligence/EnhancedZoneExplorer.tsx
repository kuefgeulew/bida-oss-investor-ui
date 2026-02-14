import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Map, MapPin, Zap, Droplet, Factory, Wifi, Ship, Plane, 
  CheckCircle, AlertCircle, Info, TreePine 
} from 'lucide-react';
import { getPlotsForZone, calculatePlotInfrastructureScore, type PlotData } from '@/app/engines/zonePlotEngine';
import { getUtilityMetrics, getUptimeBadgeColor } from '@/app/engines/utilityUptimeEngine';
import { simulateCostModel } from '@/app/engines/costModelEngine';
import { ZonePlotIntelligencePanel } from '@/app/intelligence/ZonePlotIntelligencePanel';

interface ZoneInfrastructure {
  power: { status: 'excellent' | 'good' | 'fair'; capacity: string; uptime: number };
  water: { status: 'excellent' | 'good' | 'fair'; capacity: string };
  gas: { status: 'excellent' | 'good' | 'fair'; availability: string };
  internet: { status: 'excellent' | 'good' | 'fair'; speed: string };
  distanceToPort: number;
  distanceToAirport: number;
  environmentalClearance: 'approved' | 'pending' | 'required';
  plotsAvailable: number;
}

interface SimulationInputs {
  industry: string;
  landSize: number;
  workforceSize: number;
  exportPercentage: number;
  utilitiesNeeded: string[];
}

// Map UI zone IDs to engine zone IDs
const ZONE_ID_MAP: Record<string, string> = {
  'beza-dhaka': 'bepza-ez',
  'bepza-chittagong': 'chittagong-epz',
  'bscic-gazipur': 'dhaka-epz'
};

export function EnhancedZoneExplorer() {
  const [selectedZone, setSelectedZone] = useState<string>('beza-dhaka');
  const [showSimulation, setShowSimulation] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<PlotData | null>(null);
  const [simulationInputs, setSimulationInputs] = useState<SimulationInputs>({
    industry: 'manufacturing',
    landSize: 5,
    workforceSize: 200,
    exportPercentage: 80,
    utilitiesNeeded: ['power', 'water', 'gas']
  });

  const zones: Record<string, ZoneInfrastructure> = {
    'beza-dhaka': {
      power: { status: 'excellent', capacity: '500 MW', uptime: 99.8 },
      water: { status: 'excellent', capacity: '50 MGD' },
      gas: { status: 'good', availability: '24/7' },
      internet: { status: 'excellent', speed: '1 Gbps' },
      distanceToPort: 45,
      distanceToAirport: 12,
      environmentalClearance: 'approved',
      plotsAvailable: 47
    },
    'bepza-chittagong': {
      power: { status: 'excellent', capacity: '350 MW', uptime: 99.5 },
      water: { status: 'good', capacity: '35 MGD' },
      gas: { status: 'excellent', availability: '24/7' },
      internet: { status: 'excellent', speed: '1 Gbps' },
      distanceToPort: 8,
      distanceToAirport: 18,
      environmentalClearance: 'approved',
      plotsAvailable: 23
    },
    'bscic-gazipur': {
      power: { status: 'good', capacity: '200 MW', uptime: 98.5 },
      water: { status: 'good', capacity: '25 MGD' },
      gas: { status: 'fair', availability: 'Peak hours' },
      internet: { status: 'good', speed: '500 Mbps' },
      distanceToPort: 52,
      distanceToAirport: 28,
      environmentalClearance: 'approved',
      plotsAvailable: 31
    }
  };

  const currentZone = zones[selectedZone];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'fair': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4" />;
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'fair': return <AlertCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const simulateFactoryPlacement = () => {
    const score = 
      (currentZone.power.uptime / 100) * 30 +
      (currentZone.plotsAvailable > 10 ? 20 : 10) +
      (currentZone.distanceToPort < 50 ? 25 : 15) +
      (simulationInputs.exportPercentage > 50 ? 25 : 15);

    return {
      score: Math.min(score, 100),
      recommendation: score > 80 ? 'Highly Recommended' : score > 60 ? 'Recommended' : 'Consider Alternatives',
      estimatedSetupTime: Math.floor(14 + (100 - score) / 10),
      monthlyCost: simulationInputs.landSize * 2000 + simulationInputs.workforceSize * 95,
      incentiveEligible: simulationInputs.exportPercentage > 50
    };
  };

  const simulation = showSimulation ? simulateFactoryPlacement() : null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Advanced Zone Explorer</h3>
        <p className="text-sm text-gray-600 mt-1">GIS-powered infrastructure analysis & factory simulation</p>
      </div>

      {/* Zone Selector */}
      <div className="flex gap-3">
        {Object.keys(zones).map((zoneId) => (
          <button
            key={zoneId}
            onClick={() => setSelectedZone(zoneId)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              selectedZone === zoneId
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
            }`}
          >
            {zoneId.toUpperCase().replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* GIS Map View */}
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-900">Infrastructure Layer View</h4>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">Power</button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">Water</button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">Gas</button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">Transport</button>
          </div>
        </div>

        {/* Simplified GIS Map */}
        <div className="relative h-80 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Map className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span className="font-medium">Selected Zone Location</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Ship className="w-4 h-4 text-blue-600" />
                  <span>{currentZone.distanceToPort} km to nearest port</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Plane className="w-4 h-4 text-indigo-600" />
                  <span>{currentZone.distanceToAirport} km to airport</span>
                </div>
              </div>
            </div>
          </div>

          {/* Zone boundary overlay */}
          <div className="absolute inset-8 border-4 border-dashed border-blue-400 rounded-lg opacity-50"></div>
        </div>
      </div>

      {/* Infrastructure Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <p className="text-sm font-semibold text-gray-900">Power</p>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getStatusColor(currentZone.power.status)}`}>
              {getStatusIcon(currentZone.power.status)}
              {currentZone.power.status}
            </div>
          </div>
          <p className="text-sm text-gray-600">Capacity: {currentZone.power.capacity}</p>
          <p className="text-sm text-gray-600">Uptime: {currentZone.power.uptime}%</p>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-blue-600" />
              <p className="text-sm font-semibold text-gray-900">Water</p>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getStatusColor(currentZone.water.status)}`}>
              {getStatusIcon(currentZone.water.status)}
              {currentZone.water.status}
            </div>
          </div>
          <p className="text-sm text-gray-600">Capacity: {currentZone.water.capacity}</p>
          <p className="text-sm text-gray-600">Industrial grade</p>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Factory className="w-5 h-5 text-orange-600" />
              <p className="text-sm font-semibold text-gray-900">Gas</p>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getStatusColor(currentZone.gas.status)}`}>
              {getStatusIcon(currentZone.gas.status)}
              {currentZone.gas.status}
            </div>
          </div>
          <p className="text-sm text-gray-600">Available: {currentZone.gas.availability}</p>
          <p className="text-sm text-gray-600">Pipeline connected</p>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-purple-600" />
              <p className="text-sm font-semibold text-gray-900">Internet</p>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getStatusColor(currentZone.internet.status)}`}>
              {getStatusIcon(currentZone.internet.status)}
              {currentZone.internet.status}
            </div>
          </div>
          <p className="text-sm text-gray-600">Speed: {currentZone.internet.speed}</p>
          <p className="text-sm text-gray-600">Fiber optic</p>
        </div>
      </div>

      {/* Environmental & Availability */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <TreePine className="w-5 h-5 text-green-600" />
            <p className="text-sm font-semibold text-gray-900">Environmental Clearance</p>
          </div>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            currentZone.environmentalClearance === 'approved' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {currentZone.environmentalClearance === 'approved' && <CheckCircle className="w-4 h-4" />}
            {currentZone.environmentalClearance.toUpperCase()}
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Map className="w-5 h-5 text-blue-600" />
            <p className="text-sm font-semibold text-gray-900">Plot Availability</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{currentZone.plotsAvailable}</p>
          <p className="text-sm text-gray-600">Ready-to-use industrial plots</p>
        </div>
      </div>

      {/* 🔥 PLOT-LEVEL INTELLIGENCE + UTILITY UPTIME — ENGINE POWERED */}
      <ZonePlotIntelligencePanel 
        zoneId={ZONE_ID_MAP[selectedZone] || selectedZone}
        onPlotSelect={(plot) => {
          setSelectedPlot(plot);
          // Pre-fill simulator with plot data
          setSimulationInputs({
            ...simulationInputs,
            landSize: plot.sizeAcres
          });
          setShowSimulation(true);
        }}
      />

      {/* Factory Simulation */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="flex items-center gap-2 mb-4">
          <Factory className="w-6 h-6 text-blue-600" />
          <h4 className="text-lg font-bold text-gray-900">Simulate My Factory Here</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry Type</label>
            <select
              value={simulationInputs.industry}
              onChange={(e) => setSimulationInputs({ ...simulationInputs, industry: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg"
            >
              <option value="manufacturing">Manufacturing</option>
              <option value="rmg">RMG & Textiles</option>
              <option value="pharma">Pharmaceuticals</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Land Size (acres)</label>
            <input
              type="number"
              value={simulationInputs.landSize}
              onChange={(e) => setSimulationInputs({ ...simulationInputs, landSize: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Workforce Size</label>
            <input
              type="number"
              value={simulationInputs.workforceSize}
              onChange={(e) => setSimulationInputs({ ...simulationInputs, workforceSize: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Export % </label>
            <input
              type="number"
              value={simulationInputs.exportPercentage}
              onChange={(e) => setSimulationInputs({ ...simulationInputs, exportPercentage: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg"
              min="0"
              max="100"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowSimulation(true)}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg"
        >
          Run Simulation
        </motion.button>

        {simulation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 bg-white rounded-lg"
          >
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Zone Match Score</p>
                <p className="text-2xl font-bold text-blue-600">{simulation.score.toFixed(1)}/100</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all"
                  style={{ width: `${simulation.score}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Recommendation</p>
                <p className="text-sm font-bold text-gray-900">{simulation.recommendation}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Est. Setup Time</p>
                <p className="text-sm font-bold text-gray-900">{simulation.estimatedSetupTime} days</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Monthly Operational Cost</p>
                <p className="text-sm font-bold text-gray-900">${simulation.monthlyCost.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Tax Incentive</p>
                <p className="text-sm font-bold text-green-600">
                  {simulation.incentiveEligible ? '✓ Eligible' : 'Not Eligible'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}