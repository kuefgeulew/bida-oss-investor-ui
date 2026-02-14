/**
 * ⚡ UTILITY UPTIME ENGINE — Real-time reliability monitoring
 * 
 * Powers: Zone utility reliability, aftercare monitoring
 * Tracks: Power, water, gas uptime by zone (monthly rolling)
 * Trust signal: Transparency on infrastructure performance
 * 
 * 🆕 ENHANCED WITH:
 * - 12-month historical data
 * - Planned maintenance schedules
 * - ISP provider details
 * - Mock API integrations (DESCO, GTCL, DWASA)
 * - Seasonal warnings (winter gas, monsoon power)
 */

export interface UtilityMetrics {
  zoneId: string;
  zoneName: string;
  month: string;
  power: {
    uptimePercent: number;
    outageCount: number;
    avgOutageMinutes: number;
    lastOutage: string | null;
    reliability: 'excellent' | 'good' | 'fair' | 'poor';
  };
  water: {
    uptimePercent: number;
    pressureConsistent: boolean;
    qualityScore: number; // 0-100
    reliability: 'excellent' | 'good' | 'fair' | 'poor';
  };
  gas: {
    uptimePercent: number;
    pressureConsistent: boolean;
    reliability: 'excellent' | 'good' | 'fair' | 'poor';
  };
  internet: {
    uptimePercent: number;
    avgSpeedMbps: number;
    reliability: 'excellent' | 'good' | 'fair' | 'poor';
  };
  overallReliabilityScore: number; // 0-100
  lastUpdated: Date;
}

// 🆕 PLANNED MAINTENANCE INTERFACE
export interface PlannedMaintenance {
  id: string;
  zoneId: string;
  utility: 'power' | 'water' | 'gas' | 'internet';
  title: string;
  description: string;
  scheduledDate: string;
  duration: string; // e.g., "2 hours"
  impactLevel: 'high' | 'medium' | 'low';
  provider: string;
}

// 🆕 ISP PROVIDER INTERFACE
export interface ISPProvider {
  name: string;
  bandwidth: string;
  latencyMs: number;
  uptimePercent: number;
  monthlyPriceBDT: number;
  technology: 'Fiber' | 'Cable' | 'Wireless';
}

// 🆕 WATER QUALITY TEST INTERFACE
export interface WaterQualityTest {
  date: string;
  grade: 'A' | 'B' | 'C';
  pH: number;
  tdsPPM: number;
  chlorineMgL: number;
  bacteria: 'None Detected' | 'Low' | 'High';
  testedBy: string;
}

// 🆕 MOCK API INTEGRATION STATUS
export interface APIIntegration {
  name: string;
  provider: string;
  status: 'connected' | 'degraded' | 'offline';
  lastSync: string;
  endpoint: string;
  dataPoints: number;
}

// Utility performance database (simulated from zone monitoring)
const UTILITY_PERFORMANCE: Record<string, UtilityMetrics> = {
  'dhaka-epz': {
    zoneId: 'dhaka-epz',
    zoneName: 'Dhaka EPZ',
    month: 'February 2026',
    power: {
      uptimePercent: 99.2,
      outageCount: 2,
      avgOutageMinutes: 18,
      lastOutage: '2026-02-08 14:30',
      reliability: 'excellent'
    },
    water: {
      uptimePercent: 99.8,
      pressureConsistent: true,
      qualityScore: 95,
      reliability: 'excellent'
    },
    gas: {
      uptimePercent: 98.5,
      pressureConsistent: true,
      reliability: 'excellent'
    },
    internet: {
      uptimePercent: 99.9,
      avgSpeedMbps: 850,
      reliability: 'excellent'
    },
    overallReliabilityScore: 98.9,
    lastUpdated: new Date('2026-02-11T09:30:00')
  },
  'chittagong-epz': {
    zoneId: 'chittagong-epz',
    zoneName: 'Chittagong EPZ',
    month: 'February 2026',
    power: {
      uptimePercent: 97.8,
      outageCount: 5,
      avgOutageMinutes: 32,
      lastOutage: '2026-02-09 11:15',
      reliability: 'good'
    },
    water: {
      uptimePercent: 98.5,
      pressureConsistent: true,
      qualityScore: 92,
      reliability: 'excellent'
    },
    gas: {
      uptimePercent: 96.2,
      pressureConsistent: false,
      reliability: 'good'
    },
    internet: {
      uptimePercent: 99.3,
      avgSpeedMbps: 650,
      reliability: 'excellent'
    },
    overallReliabilityScore: 97.2,
    lastUpdated: new Date('2026-02-11T09:30:00')
  },
  'mongla-epz': {
    zoneId: 'mongla-epz',
    zoneName: 'Mongla EPZ',
    month: 'February 2026',
    power: {
      uptimePercent: 95.4,
      outageCount: 8,
      avgOutageMinutes: 45,
      lastOutage: '2026-02-10 16:20',
      reliability: 'good'
    },
    water: {
      uptimePercent: 97.2,
      pressureConsistent: true,
      qualityScore: 88,
      reliability: 'good'
    },
    gas: {
      uptimePercent: 94.8,
      pressureConsistent: false,
      reliability: 'fair'
    },
    internet: {
      uptimePercent: 96.5,
      avgSpeedMbps: 420,
      reliability: 'good'
    },
    overallReliabilityScore: 95.1,
    lastUpdated: new Date('2026-02-11T09:30:00')
  },
  'bepza-ez': {
    zoneId: 'bepza-ez',
    zoneName: 'BEPZA Economic Zone',
    month: 'February 2026',
    power: {
      uptimePercent: 99.5,
      outageCount: 1,
      avgOutageMinutes: 12,
      lastOutage: '2026-02-03 08:45',
      reliability: 'excellent'
    },
    water: {
      uptimePercent: 99.7,
      pressureConsistent: true,
      qualityScore: 97,
      reliability: 'excellent'
    },
    gas: {
      uptimePercent: 99.1,
      pressureConsistent: true,
      reliability: 'excellent'
    },
    internet: {
      uptimePercent: 99.9,
      avgSpeedMbps: 1200,
      reliability: 'excellent'
    },
    overallReliabilityScore: 99.3,
    lastUpdated: new Date('2026-02-11T09:30:00')
  },
  'karnaphuli-epz': {
    zoneId: 'karnaphuli-epz',
    zoneName: 'Karnaphuli EPZ',
    month: 'February 2026',
    power: {
      uptimePercent: 98.1,
      outageCount: 4,
      avgOutageMinutes: 25,
      lastOutage: '2026-02-07 19:50',
      reliability: 'good'
    },
    water: {
      uptimePercent: 98.9,
      pressureConsistent: true,
      qualityScore: 93,
      reliability: 'excellent'
    },
    gas: {
      uptimePercent: 97.5,
      pressureConsistent: true,
      reliability: 'good'
    },
    internet: {
      uptimePercent: 98.8,
      avgSpeedMbps: 720,
      reliability: 'excellent'
    },
    overallReliabilityScore: 98.1,
    lastUpdated: new Date('2026-02-11T09:30:00')
  }
};

/**
 * Get utility metrics for a specific zone
 */
export function getUtilityMetrics(zoneId: string): UtilityMetrics | null {
  return UTILITY_PERFORMANCE[zoneId] || null;
}

/**
 * Get all zone utility metrics
 */
export function getAllUtilityMetrics(): UtilityMetrics[] {
  return Object.values(UTILITY_PERFORMANCE);
}

/**
 * Get zone reliability ranking
 */
export function getZoneReliabilityRanking(): Array<{
  zoneId: string;
  zoneName: string;
  score: number;
  rank: number;
}> {
  const metrics = getAllUtilityMetrics();
  
  const ranked = metrics
    .map(m => ({
      zoneId: m.zoneId,
      zoneName: m.zoneName,
      score: m.overallReliabilityScore,
      rank: 0
    }))
    .sort((a, b) => b.score - a.score);
  
  // Assign ranks
  ranked.forEach((item, idx) => {
    item.rank = idx + 1;
  });
  
  return ranked;
}

/**
 * Calculate uptime badge color
 */
export function getUptimeBadgeColor(uptimePercent: number): {
  bg: string;
  text: string;
  border: string;
} {
  if (uptimePercent >= 99) {
    return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
  } else if (uptimePercent >= 97) {
    return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
  } else if (uptimePercent >= 95) {
    return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' };
  } else {
    return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
  }
}

/**
 * Get reliability level description
 */
export function getReliabilityDescription(reliability: string): string {
  const descriptions = {
    excellent: 'World-class infrastructure performance',
    good: 'Reliable with minor interruptions',
    fair: 'Adequate with occasional issues',
    poor: 'Infrastructure upgrades recommended'
  };
  return descriptions[reliability] || 'Performance data unavailable';
}

/**
 * Calculate historical trend (simulated)
 */
export function getUtilityTrend(zoneId: string): Array<{
  month: string;
  powerUptime: number;
  waterUptime: number;
  gasUptime: number;
  internetUptime: number;
}> {
  const months = ['Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026'];
  
  // Base values from current metrics
  const current = getUtilityMetrics(zoneId);
  if (!current) return [];
  
  // Generate trend showing improvement
  return months.map((month, idx) => {
    const progress = idx / 5; // 0 to 1
    const improvement = progress * 2; // up to 2% improvement
    
    return {
      month,
      powerUptime: Math.min(100, current.power.uptimePercent - (5 - idx) * 0.5),
      waterUptime: Math.min(100, current.water.uptimePercent - (5 - idx) * 0.3),
      gasUptime: Math.min(100, current.gas.uptimePercent - (5 - idx) * 0.6),
      internetUptime: Math.min(100, current.internet.uptimePercent - (5 - idx) * 0.2)
    };
  });
}

/**
 * Compare zone reliability with national average
 */
export function compareWithNationalAverage(zoneId: string): {
  zone: number;
  national: number;
  delta: number;
  betterThanAverage: boolean;
} {
  const zone = getUtilityMetrics(zoneId);
  const all = getAllUtilityMetrics();
  
  const nationalAvg = all.reduce((sum, m) => sum + m.overallReliabilityScore, 0) / all.length;
  const zoneScore = zone?.overallReliabilityScore || 0;
  const delta = zoneScore - nationalAvg;
  
  return {
    zone: zoneScore,
    national: nationalAvg,
    delta,
    betterThanAverage: delta > 0
  };
}

/**
 * Get live status (for dashboard indicators)
 */
export function getLiveUtilityStatus(zoneId: string): {
  power: 'online' | 'degraded' | 'offline';
  water: 'online' | 'degraded' | 'offline';
  gas: 'online' | 'degraded' | 'offline';
  internet: 'online' | 'degraded' | 'offline';
} {
  const metrics = getUtilityMetrics(zoneId);
  
  if (!metrics) {
    return {
      power: 'offline',
      water: 'offline',
      gas: 'offline',
      internet: 'offline'
    };
  }
  
  const getStatus = (uptime: number): 'online' | 'degraded' | 'offline' => {
    if (uptime >= 99) return 'online';
    if (uptime >= 95) return 'degraded';
    return 'offline';
  };
  
  return {
    power: getStatus(metrics.power.uptimePercent),
    water: getStatus(metrics.water.uptimePercent),
    gas: getStatus(metrics.gas.uptimePercent),
    internet: getStatus(metrics.internet.uptimePercent)
  };
}

/**
 * Get utility uptime for a zone by name (helper for ZoneRecommender)
 */
export function getUtilityUptimeForZone(zoneName: string): {
  power: { uptime: number };
  water: { uptime: number };
  gas: { uptime: number };
} {
  // Map zone names to zone IDs
  const zoneIdMap: Record<string, string> = {
    'Dhaka EPZ': 'dhaka-epz',
    'Chittagong EPZ': 'chittagong-epz',
    'Mongla EPZ': 'mongla-epz',
    'BEPZA Economic Zone': 'bepza-ez',
    'Karnaphuli EPZ': 'karnaphuli-epz'
  };
  
  const zoneId = zoneIdMap[zoneName] || zoneName.toLowerCase().replace(/\s+/g, '-');
  const metrics = getUtilityMetrics(zoneId);
  
  if (!metrics) {
    // Return default values
    return {
      power: { uptime: 97 },
      water: { uptime: 98 },
      gas: { uptime: 96 }
    };
  }
  
  return {
    power: { uptime: metrics.power.uptimePercent },
    water: { uptime: metrics.water.uptimePercent },
    gas: { uptime: metrics.gas.uptimePercent }
  };
}

// 🆕 PLANNED MAINTENANCE DATABASE
const PLANNED_MAINTENANCE: Record<string, PlannedMaintenance[]> = {
  'dhaka-epz': [
    {
      id: 'maint-001',
      zoneId: 'dhaka-epz',
      utility: 'power',
      title: 'Substation Transformer Upgrade',
      description: 'Replacing 132kV transformer to increase capacity by 20MW',
      scheduledDate: '2026-02-20',
      duration: '4 hours',
      impactLevel: 'medium',
      provider: 'DESCO'
    },
    {
      id: 'maint-002',
      zoneId: 'dhaka-epz',
      utility: 'water',
      title: 'Water Pipeline Inspection',
      description: 'Routine inspection and cleaning of main water distribution lines',
      scheduledDate: '2026-02-27',
      duration: '2 hours',
      impactLevel: 'low',
      provider: 'DWASA'
    }
  ],
  'chittagong-epz': [
    {
      id: 'maint-003',
      zoneId: 'chittagong-epz',
      utility: 'gas',
      title: 'Gas Pressure Regulator Maintenance',
      description: 'Calibration and testing of pressure control systems',
      scheduledDate: '2026-02-15',
      duration: '3 hours',
      impactLevel: 'medium',
      provider: 'GTCL'
    }
  ],
  'mongla-epz': [
    {
      id: 'maint-004',
      zoneId: 'mongla-epz',
      utility: 'power',
      title: 'Emergency Backup Generator Test',
      description: 'Monthly testing of diesel generators for emergency backup',
      scheduledDate: '2026-02-18',
      duration: '1 hour',
      impactLevel: 'low',
      provider: 'REB'
    }
  ]
};

// 🆕 ISP PROVIDERS BY ZONE
const ISP_PROVIDERS: Record<string, ISPProvider[]> = {
  'dhaka-epz': [
    {
      name: 'Fiber@Home',
      bandwidth: '1 Gbps',
      latencyMs: 8,
      uptimePercent: 99.9,
      monthlyPriceBDT: 15000,
      technology: 'Fiber'
    },
    {
      name: 'Summit Communications',
      bandwidth: '500 Mbps',
      latencyMs: 12,
      uptimePercent: 99.5,
      monthlyPriceBDT: 10000,
      technology: 'Fiber'
    },
    {
      name: 'Amber IT',
      bandwidth: '1 Gbps',
      latencyMs: 10,
      uptimePercent: 99.7,
      monthlyPriceBDT: 14000,
      technology: 'Fiber'
    }
  ],
  'chittagong-epz': [
    {
      name: 'BD Link',
      bandwidth: '500 Mbps',
      latencyMs: 15,
      uptimePercent: 99.3,
      monthlyPriceBDT: 12000,
      technology: 'Fiber'
    },
    {
      name: 'Sam Online',
      bandwidth: '300 Mbps',
      latencyMs: 18,
      uptimePercent: 98.8,
      monthlyPriceBDT: 8000,
      technology: 'Cable'
    }
  ],
  'mongla-epz': [
    {
      name: 'Link3 Technologies',
      bandwidth: '300 Mbps',
      latencyMs: 20,
      uptimePercent: 98.5,
      monthlyPriceBDT: 9000,
      technology: 'Wireless'
    }
  ]
};

// 🆕 WATER QUALITY TESTS
const WATER_QUALITY_TESTS: Record<string, WaterQualityTest[]> = {
  'dhaka-epz': [
    {
      date: '2026-02-01',
      grade: 'A',
      pH: 7.2,
      tdsPPM: 320,
      chlorineMgL: 0.8,
      bacteria: 'None Detected',
      testedBy: 'DWASA Lab - Dhaka'
    },
    {
      date: '2026-01-01',
      grade: 'A',
      pH: 7.1,
      tdsPPM: 315,
      chlorineMgL: 0.9,
      bacteria: 'None Detected',
      testedBy: 'DWASA Lab - Dhaka'
    }
  ],
  'chittagong-epz': [
    {
      date: '2026-02-01',
      grade: 'A',
      pH: 7.3,
      tdsPPM: 340,
      chlorineMgL: 0.7,
      bacteria: 'None Detected',
      testedBy: 'CWASA Lab - Chittagong'
    }
  ]
};

// 🆕 MOCK API INTEGRATIONS
const API_INTEGRATIONS: APIIntegration[] = [
  {
    name: 'DESCO Power Grid',
    provider: 'Dhaka Electric Supply Company',
    status: 'connected',
    lastSync: '2026-02-12T09:45:00',
    endpoint: 'https://api.desco.gov.bd/v2/grid-status',
    dataPoints: 1248
  },
  {
    name: 'DPDC Distribution',
    provider: 'Dhaka Power Distribution Company',
    status: 'connected',
    lastSync: '2026-02-12T09:43:00',
    endpoint: 'https://api.dpdc.gov.bd/v1/realtime',
    dataPoints: 892
  },
  {
    name: 'REB Rural Grid',
    provider: 'Rural Electrification Board',
    status: 'connected',
    lastSync: '2026-02-12T09:40:00',
    endpoint: 'https://api.reb.gov.bd/monitoring',
    dataPoints: 645
  },
  {
    name: 'GTCL Gas Network',
    provider: 'Gas Transmission Company Limited',
    status: 'connected',
    lastSync: '2026-02-12T09:42:00',
    endpoint: 'https://api.gtcl.gov.bd/v3/pressure',
    dataPoints: 523
  },
  {
    name: 'DWASA Water Supply',
    provider: 'Dhaka Water Supply & Sewerage Authority',
    status: 'connected',
    lastSync: '2026-02-12T09:38:00',
    endpoint: 'https://api.dwasa.gov.bd/water-quality',
    dataPoints: 734
  },
  {
    name: 'CWASA Chittagong',
    provider: 'Chittagong WASA',
    status: 'degraded',
    lastSync: '2026-02-12T08:15:00',
    endpoint: 'https://api.cwasa.gov.bd/monitoring',
    dataPoints: 412
  },
  {
    name: 'BTCL Backbone',
    provider: 'Bangladesh Telecommunications Company',
    status: 'connected',
    lastSync: '2026-02-12T09:46:00',
    endpoint: 'https://api.btcl.gov.bd/network-status',
    dataPoints: 1567
  }
];

// 🆕 12-MONTH HISTORICAL DATA
export function get12MonthHistory(zoneId: string): Array<{
  month: string;
  powerUptime: number;
  waterUptime: number;
  gasUptime: number;
  internetUptime: number;
}> {
  const current = getUtilityMetrics(zoneId);
  if (!current) return [];

  const months = [
    'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 
    'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025', 
    'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026'
  ];

  return months.map((month, idx) => {
    // Simulate seasonal patterns
    const isMonsoon = idx >= 3 && idx <= 5; // Jun-Aug: monsoon impact
    const isWinter = idx >= 9 && idx <= 11; // Dec-Feb: winter gas issues
    
    const monsoonImpact = isMonsoon ? -2 : 0;
    const winterGasImpact = isWinter ? -3 : 0;
    const improvement = (idx / 11) * 1.5; // Gradual improvement over time

    return {
      month,
      powerUptime: Math.min(100, current.power.uptimePercent - (11 - idx) * 0.3 + monsoonImpact + improvement),
      waterUptime: Math.min(100, current.water.uptimePercent - (11 - idx) * 0.2 + improvement),
      gasUptime: Math.min(100, current.gas.uptimePercent - (11 - idx) * 0.4 + winterGasImpact + improvement),
      internetUptime: Math.min(100, current.internet.uptimePercent - (11 - idx) * 0.1 + improvement)
    };
  });
}

// 🆕 GET PLANNED MAINTENANCE
export function getPlannedMaintenance(zoneId: string): PlannedMaintenance[] {
  return PLANNED_MAINTENANCE[zoneId] || [];
}

// 🆕 GET ISP PROVIDERS
export function getISPProviders(zoneId: string): ISPProvider[] {
  return ISP_PROVIDERS[zoneId] || [];
}

// 🆕 GET WATER QUALITY TESTS
export function getWaterQualityTests(zoneId: string): WaterQualityTest[] {
  return WATER_QUALITY_TESTS[zoneId] || [];
}

// 🆕 GET API INTEGRATIONS
export function getAPIIntegrations(): APIIntegration[] {
  return API_INTEGRATIONS;
}

// 🆕 SEASONAL WARNINGS
export function getSeasonalWarnings(zoneId: string): Array<{
  type: 'info' | 'warning' | 'alert';
  utility: string;
  message: string;
}> {
  const currentMonth = new Date().getMonth(); // 0-11
  const warnings: Array<{ type: 'info' | 'warning' | 'alert'; utility: string; message: string }> = [];

  // Winter gas warnings (Dec-Feb)
  if (currentMonth >= 11 || currentMonth <= 1) {
    warnings.push({
      type: 'warning',
      utility: 'gas',
      message: 'Winter Season: Gas pressure may drop 15-20% due to increased demand. Consider backup fuel sources.'
    });
  }

  // Monsoon power warnings (Jun-Aug)
  if (currentMonth >= 5 && currentMonth <= 7) {
    warnings.push({
      type: 'warning',
      utility: 'power',
      message: 'Monsoon Season: Power outages may increase by 2-3% due to weather conditions. Backup generators recommended.'
    });
  }

  // Load shedding info
  const metrics = getUtilityMetrics(zoneId);
  if (metrics && metrics.power.uptimePercent < 98) {
    warnings.push({
      type: 'info',
      utility: 'power',
      message: 'No scheduled load shedding currently. Monitor for updates during peak demand hours (6-10 PM).'
    });
  }

  return warnings;
}