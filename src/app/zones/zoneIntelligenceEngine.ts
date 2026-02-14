// Zone Intelligence Engine - Geographic and infrastructure intelligence for investment zones
// READ-ONLY engine that provides enhanced zone data for multiple features
// Used by: GIS Land Bank, Utility Monitor, Talent Heatmap, Zone Selection

import { SEZZone } from '@/app/data/mockData';

export interface ZoneIntelligence {
  zoneId: string;
  
  // Soil & Environmental
  soilQuality: {
    type: 'clay' | 'loam' | 'sandy' | 'alluvial' | 'mixed';
    phLevel: number;
    drainageRating: number; // 1-10
    contaminationLevel: 'none' | 'low' | 'moderate';
    suitability: {
      heavyIndustry: number; // 1-10
      lightManufacturing: number;
      agriculture: number;
      technology: number;
    };
  };
  
  // Infrastructure Proximity (in km)
  infrastructure: {
    powerLineDistance: number;
    powerCapacityMW: number;
    powerReliability: number; // percentage uptime
    
    gasLineDistance: number;
    gasPressurePSI: number;
    gasAvailability: 'high' | 'medium' | 'low';
    
    portDistance: number;
    nearestPort: string;
    portType: 'seaport' | 'river-port' | 'dry-port';
    
    airportDistance: number;
    nearestAirport: string;
    
    railDistance: number;
    railCapacity: 'high' | 'medium' | 'low';
    
    highwayDistance: number;
    roadQuality: number; // 1-10
  };
  
  // Utility Performance (real-time simulation)
  utilityStatus: {
    powerUptime: number; // percentage
    waterPressure: number; // PSI
    internetSpeed: number; // Mbps
    wasteTreatment: boolean;
    lastUpdated: Date;
  };
  
  // Environmental Compliance
  environmental: {
    airQualityIndex: number;
    waterQualityGrade: 'A' | 'B' | 'C' | 'D';
    noiseLevel: number; // dB
    greenCoverPercent: number;
    effluentTreatmentPlant: boolean;
    solarPotentialKWh: number;
  };
  
  // Economic Indicators
  economics: {
    landPricePerAcre: number; // BDT
    laborCostPerMonth: number; // BDT average
    waterCostPerUnit: number; // BDT
    electricityCostPerKWh: number; // BDT
    developmentCostPerSqFt: number; // BDT
  };
}

// Intelligence database - indexed by zone ID
const zoneIntelligenceDB: Record<string, ZoneIntelligence> = {
  'BEPZA-DHK-01': {
    zoneId: 'BEPZA-DHK-01',
    soilQuality: {
      type: 'alluvial',
      phLevel: 7.2,
      drainageRating: 8,
      contaminationLevel: 'low',
      suitability: {
        heavyIndustry: 7,
        lightManufacturing: 9,
        agriculture: 4,
        technology: 10,
      },
    },
    infrastructure: {
      powerLineDistance: 2.1,
      powerCapacityMW: 150,
      powerReliability: 98.5,
      gasLineDistance: 3.4,
      gasPressurePSI: 250,
      gasAvailability: 'high',
      portDistance: 18.5,
      nearestPort: 'Chittagong Seaport',
      portType: 'seaport',
      airportDistance: 12.3,
      nearestAirport: 'Hazrat Shahjalal Intl',
      railDistance: 5.2,
      railCapacity: 'high',
      highwayDistance: 1.8,
      roadQuality: 9,
    },
    utilityStatus: {
      powerUptime: 99.2,
      waterPressure: 65,
      internetSpeed: 1000,
      wasteTreatment: true,
      lastUpdated: new Date(),
    },
    environmental: {
      airQualityIndex: 75,
      waterQualityGrade: 'B',
      noiseLevel: 58,
      greenCoverPercent: 22,
      effluentTreatmentPlant: true,
      solarPotentialKWh: 4500,
    },
    economics: {
      landPricePerAcre: 15000000,
      laborCostPerMonth: 18000,
      waterCostPerUnit: 25,
      electricityCostPerKWh: 8.5,
      developmentCostPerSqFt: 450,
    },
  },
  
  'BEPZA-CTG-02': {
    zoneId: 'BEPZA-CTG-02',
    soilQuality: {
      type: 'sandy',
      phLevel: 6.8,
      drainageRating: 9,
      contaminationLevel: 'none',
      suitability: {
        heavyIndustry: 9,
        lightManufacturing: 8,
        agriculture: 3,
        technology: 7,
      },
    },
    infrastructure: {
      powerLineDistance: 1.2,
      powerCapacityMW: 200,
      powerReliability: 99.1,
      gasLineDistance: 2.1,
      gasPressurePSI: 280,
      gasAvailability: 'high',
      portDistance: 8.3,
      nearestPort: 'Chittagong Seaport',
      portType: 'seaport',
      airportDistance: 15.7,
      nearestAirport: 'Shah Amanat Intl',
      railDistance: 3.5,
      railCapacity: 'high',
      highwayDistance: 0.9,
      roadQuality: 10,
    },
    utilityStatus: {
      powerUptime: 99.5,
      waterPressure: 70,
      internetSpeed: 1000,
      wasteTreatment: true,
      lastUpdated: new Date(),
    },
    environmental: {
      airQualityIndex: 68,
      waterQualityGrade: 'A',
      noiseLevel: 62,
      greenCoverPercent: 18,
      effluentTreatmentPlant: true,
      solarPotentialKWh: 5200,
    },
    economics: {
      landPricePerAcre: 12000000,
      laborCostPerMonth: 16500,
      waterCostPerUnit: 22,
      electricityCostPerKWh: 8.2,
      developmentCostPerSqFt: 420,
    },
  },
  
  'BEZA-BGD-03': {
    zoneId: 'BEZA-BGD-03',
    soilQuality: {
      type: 'loam',
      phLevel: 7.0,
      drainageRating: 7,
      contaminationLevel: 'none',
      suitability: {
        heavyIndustry: 10,
        lightManufacturing: 8,
        agriculture: 5,
        technology: 6,
      },
    },
    infrastructure: {
      powerLineDistance: 4.5,
      powerCapacityMW: 180,
      powerReliability: 97.8,
      gasLineDistance: 1.8,
      gasPressurePSI: 300,
      gasAvailability: 'high',
      portDistance: 5.2,
      nearestPort: 'Payra Seaport',
      portType: 'seaport',
      airportDistance: 85.0,
      nearestAirport: 'Jessore Airport',
      railDistance: 12.0,
      railCapacity: 'medium',
      highwayDistance: 3.2,
      roadQuality: 8,
    },
    utilityStatus: {
      powerUptime: 98.8,
      waterPressure: 62,
      internetSpeed: 500,
      wasteTreatment: true,
      lastUpdated: new Date(),
    },
    environmental: {
      airQualityIndex: 55,
      waterQualityGrade: 'A',
      noiseLevel: 48,
      greenCoverPercent: 28,
      effluentTreatmentPlant: true,
      solarPotentialKWh: 5800,
    },
    economics: {
      landPricePerAcre: 8500000,
      laborCostPerMonth: 14000,
      waterCostPerUnit: 20,
      electricityCostPerKWh: 7.8,
      developmentCostPerSqFt: 380,
    },
  },
};

// Generate intelligence for zones not in DB
function generateDefaultIntelligence(zoneId: string, zone: SEZZone): ZoneIntelligence {
  // Use location data to simulate realistic values
  const isDhakaNear = zone.location.district.toLowerCase().includes('dhaka');
  const isChittagongNear = zone.location.district.toLowerCase().includes('chit');
  
  return {
    zoneId,
    soilQuality: {
      type: 'mixed',
      phLevel: 6.5 + Math.random() * 1.5,
      drainageRating: Math.floor(6 + Math.random() * 4),
      contaminationLevel: Math.random() > 0.8 ? 'low' : 'none',
      suitability: {
        heavyIndustry: Math.floor(5 + Math.random() * 5),
        lightManufacturing: Math.floor(6 + Math.random() * 4),
        agriculture: Math.floor(3 + Math.random() * 4),
        technology: Math.floor(4 + Math.random() * 6),
      },
    },
    infrastructure: {
      powerLineDistance: 1 + Math.random() * 8,
      powerCapacityMW: 100 + Math.floor(Math.random() * 150),
      powerReliability: 95 + Math.random() * 4,
      gasLineDistance: 1 + Math.random() * 10,
      gasPressurePSI: 200 + Math.floor(Math.random() * 150),
      gasAvailability: Math.random() > 0.3 ? 'high' : 'medium',
      portDistance: isChittagongNear ? 10 + Math.random() * 20 : 50 + Math.random() * 150,
      nearestPort: isChittagongNear ? 'Chittagong Seaport' : 'Mongla Port',
      portType: 'seaport',
      airportDistance: isDhakaNear ? 15 + Math.random() * 20 : 40 + Math.random() * 60,
      nearestAirport: isDhakaNear ? 'Hazrat Shahjalal Intl' : 'Shah Amanat Intl',
      railDistance: 5 + Math.random() * 15,
      railCapacity: Math.random() > 0.5 ? 'medium' : 'low',
      highwayDistance: 2 + Math.random() * 8,
      roadQuality: Math.floor(6 + Math.random() * 4),
    },
    utilityStatus: {
      powerUptime: 96 + Math.random() * 3,
      waterPressure: 55 + Math.floor(Math.random() * 20),
      internetSpeed: Math.random() > 0.5 ? 1000 : 500,
      wasteTreatment: Math.random() > 0.3,
      lastUpdated: new Date(),
    },
    environmental: {
      airQualityIndex: Math.floor(50 + Math.random() * 40),
      waterQualityGrade: Math.random() > 0.6 ? 'A' : 'B',
      noiseLevel: Math.floor(45 + Math.random() * 25),
      greenCoverPercent: Math.floor(15 + Math.random() * 20),
      effluentTreatmentPlant: Math.random() > 0.4,
      solarPotentialKWh: Math.floor(4000 + Math.random() * 2500),
    },
    economics: {
      landPricePerAcre: isDhakaNear ? 12000000 + Math.random() * 5000000 : 6000000 + Math.random() * 4000000,
      laborCostPerMonth: isDhakaNear ? 16000 + Math.random() * 4000 : 12000 + Math.random() * 3000,
      waterCostPerUnit: 18 + Math.random() * 10,
      electricityCostPerKWh: 7.5 + Math.random() * 1.5,
      developmentCostPerSqFt: 350 + Math.random() * 150,
    },
  };
}

// PUBLIC API - Read-only functions

export function getZoneIntelligence(zoneId: string, zone?: SEZZone): ZoneIntelligence {
  if (zoneIntelligenceDB[zoneId]) {
    return zoneIntelligenceDB[zoneId];
  }
  
  if (zone) {
    return generateDefaultIntelligence(zoneId, zone);
  }
  
  throw new Error(`Zone intelligence not found for ${zoneId} and no zone data provided`);
}

export function getAllZoneIntelligence(zones: SEZZone[]): ZoneIntelligence[] {
  return zones.map(zone => getZoneIntelligence(zone.id, zone));
}

export function compareZoneInfrastructure(zoneIds: string[], zones: SEZZone[]) {
  const zoneMap = new Map(zones.map(z => [z.id, z]));
  
  return zoneIds.map(id => {
    const zone = zoneMap.get(id);
    const intel = getZoneIntelligence(id, zone);
    
    return {
      zoneId: id,
      zoneName: zone?.name || id,
      scores: {
        powerAccess: calculatePowerScore(intel),
        gasAccess: calculateGasScore(intel),
        logisticsScore: calculateLogisticsScore(intel),
        utilityReliability: calculateUtilityScore(intel),
        environmentalScore: calculateEnvironmentalScore(intel),
        costCompetitiveness: calculateCostScore(intel),
      },
      totalScore: calculateOverallScore(intel),
    };
  });
}

export function rankZonesBySuitability(zones: SEZZone[], sector: string): Array<{
  zone: SEZZone;
  intelligence: ZoneIntelligence;
  suitabilityScore: number;
  strengths: string[];
  weaknesses: string[];
}> {
  const results = zones.map(zone => {
    const intel = getZoneIntelligence(zone.id, zone);
    const score = calculateSectorSuitability(intel, sector);
    const analysis = analyzeSuitability(intel, sector);
    
    return {
      zone,
      intelligence: intel,
      suitabilityScore: score,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
    };
  });
  
  return results.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}

// Scoring functions
function calculatePowerScore(intel: ZoneIntelligence): number {
  const distanceScore = Math.max(0, 100 - intel.infrastructure.powerLineDistance * 5);
  const capacityScore = Math.min(100, (intel.infrastructure.powerCapacityMW / 200) * 100);
  const reliabilityScore = intel.infrastructure.powerReliability;
  
  return (distanceScore * 0.3 + capacityScore * 0.3 + reliabilityScore * 0.4);
}

function calculateGasScore(intel: ZoneIntelligence): number {
  const distanceScore = Math.max(0, 100 - intel.infrastructure.gasLineDistance * 4);
  const pressureScore = Math.min(100, (intel.infrastructure.gasPressurePSI / 300) * 100);
  const availabilityScore = intel.infrastructure.gasAvailability === 'high' ? 100 : intel.infrastructure.gasAvailability === 'medium' ? 65 : 30;
  
  return (distanceScore * 0.4 + pressureScore * 0.3 + availabilityScore * 0.3);
}

function calculateLogisticsScore(intel: ZoneIntelligence): number {
  const portScore = Math.max(0, 100 - intel.infrastructure.portDistance * 0.5);
  const airportScore = Math.max(0, 100 - intel.infrastructure.airportDistance * 1);
  const railScore = intel.infrastructure.railCapacity === 'high' ? 100 : intel.infrastructure.railCapacity === 'medium' ? 65 : 30;
  const roadScore = intel.infrastructure.roadQuality * 10;
  
  return (portScore * 0.35 + airportScore * 0.25 + railScore * 0.2 + roadScore * 0.2);
}

function calculateUtilityScore(intel: ZoneIntelligence): number {
  const powerUptime = intel.utilityStatus.powerUptime;
  const waterScore = Math.min(100, (intel.utilityStatus.waterPressure / 80) * 100);
  const internetScore = Math.min(100, (intel.utilityStatus.internetSpeed / 1000) * 100);
  
  return (powerUptime * 0.5 + waterScore * 0.25 + internetScore * 0.25);
}

function calculateEnvironmentalScore(intel: ZoneIntelligence): number {
  const airScore = Math.max(0, 100 - intel.environmental.airQualityIndex);
  const waterScore = intel.environmental.waterQualityGrade === 'A' ? 100 : intel.environmental.waterQualityGrade === 'B' ? 75 : 50;
  const greenScore = intel.environmental.greenCoverPercent * 2;
  const treatmentScore = intel.environmental.effluentTreatmentPlant ? 100 : 0;
  
  return (airScore * 0.3 + waterScore * 0.3 + greenScore * 0.2 + treatmentScore * 0.2);
}

function calculateCostScore(intel: ZoneIntelligence): number {
  // Lower costs = higher score (inverted)
  const landScore = Math.max(0, 100 - (intel.economics.landPricePerAcre / 20000000) * 100);
  const laborScore = Math.max(0, 100 - (intel.economics.laborCostPerMonth / 25000) * 100);
  const powerScore = Math.max(0, 100 - (intel.economics.electricityCostPerKWh / 12) * 100);
  
  return (landScore * 0.4 + laborScore * 0.35 + powerScore * 0.25);
}

function calculateOverallScore(intel: ZoneIntelligence): number {
  return (
    calculatePowerScore(intel) * 0.2 +
    calculateGasScore(intel) * 0.15 +
    calculateLogisticsScore(intel) * 0.25 +
    calculateUtilityScore(intel) * 0.15 +
    calculateEnvironmentalScore(intel) * 0.1 +
    calculateCostScore(intel) * 0.15
  );
}

function calculateSectorSuitability(intel: ZoneIntelligence, sector: string): number {
  if (!sector) {
    // Default to general manufacturing if sector is undefined
    return calculateOverallScore(intel);
  }
  const sectorLower = sector.toLowerCase();
  
  // Sector-specific scoring
  if (sectorLower.includes('textile') || sectorLower.includes('garment')) {
    return (
      calculatePowerScore(intel) * 0.25 +
      calculateUtilityScore(intel) * 0.25 +
      calculateLogisticsScore(intel) * 0.2 +
      calculateCostScore(intel) * 0.3
    );
  }
  
  if (sectorLower.includes('tech') || sectorLower.includes('it') || sectorLower.includes('software')) {
    return (
      intel.utilityStatus.internetSpeed / 10 * 0.4 +
      calculatePowerScore(intel) * 0.3 +
      calculateEnvironmentalScore(intel) * 0.15 +
      intel.soilQuality.suitability.technology * 10 * 0.15
    );
  }
  
  if (sectorLower.includes('pharma') || sectorLower.includes('chemical')) {
    return (
      calculateUtilityScore(intel) * 0.3 +
      calculateEnvironmentalScore(intel) * 0.3 +
      intel.environmental.effluentTreatmentPlant ? 100 : 50 * 0.25 +
      calculateLogisticsScore(intel) * 0.15
    );
  }
  
  if (sectorLower.includes('heavy') || sectorLower.includes('steel') || sectorLower.includes('manufacturing')) {
    return (
      intel.soilQuality.suitability.heavyIndustry * 10 * 0.3 +
      calculateGasScore(intel) * 0.25 +
      calculatePowerScore(intel) * 0.25 +
      calculateLogisticsScore(intel) * 0.2
    );
  }
  
  // Default scoring
  return calculateOverallScore(intel);
}

function analyzeSuitability(intel: ZoneIntelligence, sector: string): { strengths: string[]; weaknesses: string[] } {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  // Power
  if (calculatePowerScore(intel) > 80) strengths.push('Excellent power infrastructure');
  else if (calculatePowerScore(intel) < 50) weaknesses.push('Limited power access');
  
  // Logistics
  if (intel.infrastructure.portDistance < 30) strengths.push('Close to seaport');
  else if (intel.infrastructure.portDistance > 100) weaknesses.push('Far from seaport');
  
  // Cost
  if (calculateCostScore(intel) > 70) strengths.push('Cost competitive');
  else if (calculateCostScore(intel) < 40) weaknesses.push('Higher operational costs');
  
  // Utilities
  if (intel.utilityStatus.powerUptime > 98) strengths.push('Highly reliable power');
  if (intel.utilityStatus.internetSpeed >= 1000) strengths.push('Gigabit internet available');
  
  // Environment
  if (intel.environmental.effluentTreatmentPlant) strengths.push('Effluent treatment facility');
  if (intel.environmental.airQualityIndex < 60) strengths.push('Good air quality');
  
  return { strengths, weaknesses };
}