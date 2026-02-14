// Talent & Skills Engine - District-level workforce intelligence
// READ-ONLY engine providing talent density, skills availability, and labor market data
// Used by: TalentHeatmap, VisaAndWorkforce, Zone Selection

export interface DistrictTalent {
  districtName: string;
  districtCode: string;
  coordinates: { lat: number; lng: number };
  
  // Workforce Demographics
  totalWorkforce: number;
  unemploymentRate: number;
  youthPopulation: number; // 18-35 age group
  
  // Skill Density (per 10,000 population)
  skillDensity: {
    textile: number;
    manufacturing: number;
    technology: number;
    engineering: number;
    healthcare: number;
    logistics: number;
    agriculture: number;
    finance: number;
  };
  
  // Education Infrastructure
  education: {
    universities: number;
    technicalInstitutes: number;
    vocationalCenters: number;
    graduatesPerYear: number;
    engineersPerYear: number;
  };
  
  // Language Proficiency
  languageSkills: {
    english: number; // percentage proficient
    chinese: number;
    japanese: number;
    korean: number;
  };
  
  // Labor Costs
  wages: {
    entrylevel: number; // BDT per month
    skilled: number;
    professional: number;
    managerial: number;
  };
  
  // Availability Score (0-100)
  availability: {
    immediate: number; // Ready to hire
    training3Months: number; // Can be trained in 3 months
    training6Months: number; // Can be trained in 6 months
  };
}

// District talent database
const districtTalentDB: DistrictTalent[] = [
  {
    districtName: 'Dhaka',
    districtCode: 'DHK',
    coordinates: { lat: 23.8103, lng: 90.4125 },
    totalWorkforce: 8500000,
    unemploymentRate: 4.2,
    youthPopulation: 3200000,
    skillDensity: {
      textile: 850,
      manufacturing: 720,
      technology: 1200,
      engineering: 680,
      healthcare: 450,
      logistics: 380,
      agriculture: 120,
      finance: 920,
    },
    education: {
      universities: 52,
      technicalInstitutes: 28,
      vocationalCenters: 145,
      graduatesPerYear: 85000,
      engineersPerYear: 12000,
    },
    languageSkills: {
      english: 38,
      chinese: 5,
      japanese: 3,
      korean: 4,
    },
    wages: {
      entrylevel: 15000,
      skilled: 25000,
      professional: 45000,
      managerial: 85000,
    },
    availability: {
      immediate: 78,
      training3Months: 88,
      training6Months: 95,
    },
  },
  
  {
    districtName: 'Chittagong',
    districtCode: 'CTG',
    coordinates: { lat: 22.3569, lng: 91.7832 },
    totalWorkforce: 4200000,
    unemploymentRate: 5.1,
    youthPopulation: 1800000,
    skillDensity: {
      textile: 620,
      manufacturing: 880,
      technology: 420,
      engineering: 520,
      healthcare: 320,
      logistics: 950,
      agriculture: 180,
      finance: 380,
    },
    education: {
      universities: 18,
      technicalInstitutes: 12,
      vocationalCenters: 68,
      graduatesPerYear: 28000,
      engineersPerYear: 4500,
    },
    languageSkills: {
      english: 28,
      chinese: 8,
      japanese: 6,
      korean: 5,
    },
    wages: {
      entrylevel: 13500,
      skilled: 22000,
      professional: 38000,
      managerial: 72000,
    },
    availability: {
      immediate: 82,
      training3Months: 90,
      training6Months: 96,
    },
  },
  
  {
    districtName: 'Gazipur',
    districtCode: 'GAZ',
    coordinates: { lat: 24.0022, lng: 90.4264 },
    totalWorkforce: 2800000,
    unemploymentRate: 3.8,
    youthPopulation: 1200000,
    skillDensity: {
      textile: 1450,
      manufacturing: 1120,
      technology: 380,
      engineering: 420,
      healthcare: 280,
      logistics: 520,
      agriculture: 220,
      finance: 180,
    },
    education: {
      universities: 8,
      technicalInstitutes: 15,
      vocationalCenters: 92,
      graduatesPerYear: 18000,
      engineersPerYear: 2800,
    },
    languageSkills: {
      english: 22,
      chinese: 3,
      japanese: 2,
      korean: 7,
    },
    wages: {
      entrylevel: 12500,
      skilled: 20000,
      professional: 35000,
      managerial: 65000,
    },
    availability: {
      immediate: 85,
      training3Months: 92,
      training6Months: 97,
    },
  },
  
  {
    districtName: 'Narayanganj',
    districtCode: 'NAR',
    coordinates: { lat: 23.6144, lng: 90.5000 },
    totalWorkforce: 1500000,
    unemploymentRate: 4.5,
    youthPopulation: 620000,
    skillDensity: {
      textile: 1680,
      manufacturing: 920,
      technology: 280,
      engineering: 350,
      healthcare: 220,
      logistics: 420,
      agriculture: 150,
      finance: 280,
    },
    education: {
      universities: 4,
      technicalInstitutes: 8,
      vocationalCenters: 48,
      graduatesPerYear: 9500,
      engineersPerYear: 1200,
    },
    languageSkills: {
      english: 18,
      chinese: 4,
      japanese: 2,
      korean: 3,
    },
    wages: {
      entrylevel: 12000,
      skilled: 19000,
      professional: 32000,
      managerial: 58000,
    },
    availability: {
      immediate: 88,
      training3Months: 94,
      training6Months: 98,
    },
  },
  
  {
    districtName: 'Sylhet',
    districtCode: 'SYL',
    coordinates: { lat: 24.8949, lng: 91.8687 },
    totalWorkforce: 1200000,
    unemploymentRate: 6.2,
    youthPopulation: 520000,
    skillDensity: {
      textile: 180,
      manufacturing: 220,
      technology: 320,
      engineering: 280,
      healthcare: 380,
      logistics: 280,
      agriculture: 520,
      finance: 280,
    },
    education: {
      universities: 6,
      technicalInstitutes: 5,
      vocationalCenters: 28,
      graduatesPerYear: 8500,
      engineersPerYear: 1100,
    },
    languageSkills: {
      english: 42,
      chinese: 2,
      japanese: 1,
      korean: 2,
    },
    wages: {
      entrylevel: 11000,
      skilled: 18000,
      professional: 30000,
      managerial: 55000,
    },
    availability: {
      immediate: 72,
      training3Months: 82,
      training6Months: 90,
    },
  },
  
  {
    districtName: 'Khulna',
    districtCode: 'KHL',
    coordinates: { lat: 22.8456, lng: 89.5403 },
    totalWorkforce: 1800000,
    unemploymentRate: 5.8,
    youthPopulation: 780000,
    skillDensity: {
      textile: 280,
      manufacturing: 520,
      technology: 220,
      engineering: 380,
      healthcare: 320,
      logistics: 420,
      agriculture: 680,
      finance: 280,
    },
    education: {
      universities: 9,
      technicalInstitutes: 7,
      vocationalCenters: 42,
      graduatesPerYear: 12000,
      engineersPerYear: 1800,
    },
    languageSkills: {
      english: 24,
      chinese: 3,
      japanese: 2,
      korean: 2,
    },
    wages: {
      entrylevel: 10500,
      skilled: 17000,
      professional: 28000,
      managerial: 52000,
    },
    availability: {
      immediate: 76,
      training3Months: 85,
      training6Months: 92,
    },
  },
];

// PUBLIC API

export function getDistrictTalent(districtName: string): DistrictTalent | undefined {
  return districtTalentDB.find(
    d => d.districtName.toLowerCase() === districtName.toLowerCase() || 
         d.districtCode.toLowerCase() === districtName.toLowerCase()
  );
}

export function getAllDistrictTalent(): DistrictTalent[] {
  return districtTalentDB;
}

export function rankDistrictsBySector(sector: string): Array<{
  district: DistrictTalent;
  suitabilityScore: number;
  strengths: string[];
}> {
  const sectorKey = mapSectorToSkill(sector);
  
  const ranked = districtTalentDB.map(district => {
    const skillScore = district.skillDensity[sectorKey] || 0;
    const availabilityScore = district.availability.immediate;
    const costScore = 100 - (district.wages.skilled / 500); // Lower wage = higher score
    const educationScore = Math.min(100, district.education.graduatesPerYear / 1000);
    
    const suitabilityScore = (
      skillScore * 0.4 +
      availabilityScore * 0.25 +
      costScore * 0.2 +
      educationScore * 0.15
    );
    
    const strengths: string[] = [];
    if (skillScore > 800) strengths.push('High skill density');
    if (availabilityScore > 80) strengths.push('Immediate workforce availability');
    if (district.wages.skilled < 20000) strengths.push('Cost competitive');
    if (district.education.graduatesPerYear > 20000) strengths.push('Strong education pipeline');
    
    return {
      district,
      suitabilityScore,
      strengths,
    };
  });
  
  return ranked.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}

export function calculateTalentCosts(
  districtName: string,
  headcount: {
    entrylevel: number;
    skilled: number;
    professional: number;
    managerial: number;
  }
): {
  monthlyCost: number;
  annualCost: number;
  breakdown: Record<string, number>;
} | null {
  const district = getDistrictTalent(districtName);
  if (!district) return null;
  
  const breakdown = {
    entrylevel: headcount.entrylevel * district.wages.entrylevel,
    skilled: headcount.skilled * district.wages.skilled,
    professional: headcount.professional * district.wages.professional,
    managerial: headcount.managerial * district.wages.managerial,
  };
  
  const monthlyCost = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);
  
  return {
    monthlyCost,
    annualCost: monthlyCost * 12,
    breakdown,
  };
}

export function findTalentGaps(
  requiredSkills: string[],
  districtName: string
): {
  available: string[];
  scarce: string[];
  trainingRecommended: string[];
} {
  const district = getDistrictTalent(districtName);
  if (!district) {
    return { available: [], scarce: requiredSkills, trainingRecommended: requiredSkills };
  }
  
  const available: string[] = [];
  const scarce: string[] = [];
  const trainingRecommended: string[] = [];
  
  requiredSkills.forEach(skill => {
    const mappedSkill = mapSectorToSkill(skill);
    const density = district.skillDensity[mappedSkill] || 0;
    
    if (density > 500) {
      available.push(skill);
    } else if (density > 200) {
      trainingRecommended.push(skill);
    } else {
      scarce.push(skill);
    }
  });
  
  return { available, scarce, trainingRecommended };
}

export function getLanguageProficiency(districtName: string, language: 'english' | 'chinese' | 'japanese' | 'korean'): number {
  const district = getDistrictTalent(districtName);
  return district?.languageSkills[language] || 0;
}

export function compareDistrictWages(districtNames: string[]): Array<{
  district: string;
  averageWage: number;
  competitiveness: 'high' | 'medium' | 'low';
}> {
  return districtNames.map(name => {
    const district = getDistrictTalent(name);
    if (!district) {
      return { district: name, averageWage: 0, competitiveness: 'low' as const };
    }
    
    const averageWage = (
      district.wages.entrylevel +
      district.wages.skilled +
      district.wages.professional +
      district.wages.managerial
    ) / 4;
    
    let competitiveness: 'high' | 'medium' | 'low' = 'medium';
    if (averageWage < 25000) competitiveness = 'high';
    else if (averageWage > 40000) competitiveness = 'low';
    
    return {
      district: district.districtName,
      averageWage,
      competitiveness,
    };
  });
}

export function getTalentDensityHeatmap(): Array<{
  district: string;
  coordinates: { lat: number; lng: number };
  totalDensity: number;
  topSkills: Array<{ skill: string; density: number }>;
}> {
  return districtTalentDB.map(district => {
    const densities = Object.entries(district.skillDensity);
    const totalDensity = densities.reduce((sum, [_, density]) => sum + density, 0);
    const topSkills = densities
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([skill, density]) => ({ skill, density }));
    
    return {
      district: district.districtName,
      coordinates: district.coordinates,
      totalDensity,
      topSkills,
    };
  });
}

// Helper function
function mapSectorToSkill(sector: string): keyof DistrictTalent['skillDensity'] {
  if (!sector) {
    return 'manufacturing'; // default if sector is undefined
  }
  const sectorLower = sector.toLowerCase();
  
  if (sectorLower.includes('textile') || sectorLower.includes('garment')) return 'textile';
  if (sectorLower.includes('tech') || sectorLower.includes('it') || sectorLower.includes('software')) return 'technology';
  if (sectorLower.includes('engineer') || sectorLower.includes('heavy')) return 'engineering';
  if (sectorLower.includes('pharma') || sectorLower.includes('health')) return 'healthcare';
  if (sectorLower.includes('logistic') || sectorLower.includes('transport')) return 'logistics';
  if (sectorLower.includes('agri') || sectorLower.includes('farm')) return 'agriculture';
  if (sectorLower.includes('finance') || sectorLower.includes('bank')) return 'finance';
  
  return 'manufacturing'; // default
}