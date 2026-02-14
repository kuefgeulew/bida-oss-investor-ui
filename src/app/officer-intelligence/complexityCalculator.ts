// Application Complexity Score Calculator (1-10 scale)

export interface ComplexityFactors {
  sector: number;
  investmentSize: number;
  agencyCount: number;
  foreignStaff: number;
  zoneType: number;
  regulatoryComplexity: number;
}

export interface ComplexityScore {
  total: number; // 1-10
  factors: ComplexityFactors;
  level: 'Simple' | 'Moderate' | 'Complex' | 'Highly Complex' | 'Extreme';
  color: string;
  estimatedDays: number;
  requiresExpertise: string[];
}

// Calculate sector complexity
function calculateSectorComplexity(sector: string): number {
  const sectorScores: Record<string, number> = {
    'IT & Software': 1,
    'Consulting': 1,
    'E-commerce': 1.5,
    'Retail': 1.5,
    'Trading': 2,
    'Education': 2,
    'Tourism': 2,
    'Textile & Garment': 2.5,
    'Food Processing': 3,
    'Manufacturing': 3,
    'Automotive': 3.5,
    'Chemical': 4,
    'Pharmaceutical': 4.5,
    'Energy & Power': 4.5,
    'Banking & Finance': 5,
    'Telecom': 5
  };
  
  return sectorScores[sector] || 2.5;
}

// Calculate investment size complexity
function calculateInvestmentSizeComplexity(amount: number): number {
  // Amount in millions USD
  if (amount < 0.1) return 0.5;
  if (amount < 0.5) return 1;
  if (amount < 1) return 1.5;
  if (amount < 5) return 2;
  if (amount < 10) return 2.5;
  if (amount < 50) return 3;
  if (amount < 100) return 3.5;
  if (amount < 500) return 4;
  return 5;
}

// Calculate agency count complexity
function calculateAgencyComplexity(agencies: string[]): number {
  const baseScore = Math.min(agencies.length * 0.5, 5);
  
  // Add extra weight for complex agencies
  const complexAgencies = [
    'Drug Administration',
    'BTRC',
    'Bangladesh Bank (Banking)',
    'Energy Regulatory Commission',
    'BSTI (Food Safety)'
  ];
  
  const hasComplexAgency = agencies.some(a => complexAgencies.includes(a));
  return baseScore + (hasComplexAgency ? 1 : 0);
}

// Calculate foreign staff complexity
function calculateForeignStaffComplexity(count: number): number {
  if (count === 0) return 0;
  if (count <= 5) return 1;
  if (count <= 10) return 1.5;
  if (count <= 20) return 2;
  if (count <= 50) return 2.5;
  return 3;
}

// Calculate zone type complexity
function calculateZoneComplexity(zone: string): number {
  const zoneScores: Record<string, number> = {
    'General': 1,
    'City Corporation': 1.5,
    'BSCIC': 2,
    'BHTPA (Hi-Tech Park)': 2.5,
    'BEPZA (EPZ)': 3,
    'BEZA (Economic Zone)': 3.5,
    'SEZ (Special Economic Zone)': 4
  };
  
  return zoneScores[zone] || 2;
}

// Calculate regulatory complexity
function calculateRegulatoryComplexity(application: any): number {
  let score = 0;
  
  // Environmental impact
  if (application.requiresEnvironmentalClearance) score += 1.5;
  
  // Fire safety
  if (application.requiresFireSafety) score += 1;
  
  // Special licenses
  if (application.requiresSectorLicense) score += 2;
  
  // Land acquisition
  if (application.requiresLandAllocation) score += 1.5;
  
  // Export-oriented
  if (application.isExportOriented) score += 0.5;
  
  // Multiple products
  if (application.productCount > 5) score += 1;
  
  return Math.min(score, 5);
}

// Main calculation function
export function calculateComplexity(application: any): ComplexityScore {
  const factors: ComplexityFactors = {
    sector: calculateSectorComplexity(application.sector),
    investmentSize: calculateInvestmentSizeComplexity(application.investmentAmount / 1000000),
    agencyCount: calculateAgencyComplexity(application.requiredAgencies || []),
    foreignStaff: calculateForeignStaffComplexity(application.foreignStaffCount || 0),
    zoneType: calculateZoneComplexity(application.zone || 'General'),
    regulatoryComplexity: calculateRegulatoryComplexity(application)
  };
  
  // Calculate weighted total (max 10)
  const total = Math.min(
    (factors.sector * 0.25) +
    (factors.investmentSize * 0.20) +
    (factors.agencyCount * 0.20) +
    (factors.foreignStaff * 0.10) +
    (factors.zoneType * 0.10) +
    (factors.regulatoryComplexity * 0.15),
    10
  );
  
  // Determine level
  let level: ComplexityScore['level'];
  let color: string;
  let estimatedDays: number;
  let requiresExpertise: string[];
  
  if (total < 2.5) {
    level = 'Simple';
    color = 'green';
    estimatedDays = 20;
    requiresExpertise = ['Junior Officer'];
  } else if (total < 4.5) {
    level = 'Moderate';
    color = 'blue';
    estimatedDays = 40;
    requiresExpertise = ['Standard Officer'];
  } else if (total < 6.5) {
    level = 'Complex';
    color = 'yellow';
    estimatedDays = 60;
    requiresExpertise = ['Senior Officer', 'Sector Specialist'];
  } else if (total < 8.5) {
    level = 'Highly Complex';
    color = 'orange';
    estimatedDays = 90;
    requiresExpertise = ['Senior Officer', 'Sector Specialist', 'Legal Review'];
  } else {
    level = 'Extreme';
    color = 'red';
    estimatedDays = 120;
    requiresExpertise = ['Deputy Director', 'Sector Specialist', 'Legal Review', 'Executive Approval'];
  }
  
  return {
    total: Math.round(total * 10) / 10,
    factors,
    level,
    color,
    estimatedDays,
    requiresExpertise
  };
}

// Get complexity badge color
export function getComplexityColor(score: number): string {
  if (score < 2.5) return 'bg-green-100 text-green-800 border-green-300';
  if (score < 4.5) return 'bg-blue-100 text-blue-800 border-blue-300';
  if (score < 6.5) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  if (score < 8.5) return 'bg-orange-100 text-orange-800 border-orange-300';
  return 'bg-red-100 text-red-800 border-red-300';
}

// Get complexity icon
export function getComplexityIcon(score: number): string {
  if (score < 2.5) return '✓';
  if (score < 4.5) return '○';
  if (score < 6.5) return '◐';
  if (score < 8.5) return '◆';
  return '⚠';
}
