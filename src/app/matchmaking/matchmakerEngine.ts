// Matchmaker Engine - AI-powered B2B partner matching
// READ-ONLY engine that matches investors with service providers
// Uses: investor sector, agencyRegistry tags, partner capabilities

import { partnerRegistry, type Partner, type PartnerType } from './partnerRegistry';

export interface MatchScore {
  partner: Partner;
  score: number; // 0-100
  matchReasons: string[];
  compatibilityFactors: {
    sectorAlignment: number;
    experienceMatch: number;
    capacityFit: number;
    locationProximity: number;
    ratingScore: number;
  };
}

export interface MatchCriteria {
  investorSector: string;
  investmentSize?: number; // USD
  location?: string; // Preferred district
  urgency?: 'immediate' | 'normal' | 'flexible';
  specificNeeds?: string[]; // e.g., ['ISO certified', 'export experience']
}

// PUBLIC API

export function findMatches(
  partnerType: PartnerType,
  criteria: MatchCriteria,
  maxResults: number = 5
): MatchScore[] {
  const candidates = partnerRegistry.filter(p => p.type === partnerType);
  
  const scored = candidates.map(partner => {
    const score = calculateMatchScore(partner, criteria);
    const reasons = generateMatchReasons(partner, criteria, score.compatibilityFactors);
    
    return {
      partner,
      score: score.totalScore,
      matchReasons: reasons,
      compatibilityFactors: score.compatibilityFactors,
    };
  });
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

export function findAllMatches(criteria: MatchCriteria): Record<PartnerType, MatchScore[]> {
  const types: PartnerType[] = ['supplier', 'service-provider', 'financial', 'consultant', 'legal', 'technology'];
  
  const matches: Partial<Record<PartnerType, MatchScore[]>> = {};
  
  types.forEach(type => {
    matches[type] = findMatches(type, criteria, 3);
  });
  
  return matches as Record<PartnerType, MatchScore[]>;
}

export function searchPartners(query: string, partnerType?: PartnerType): Partner[] {
  const queryLower = query.toLowerCase();
  let partners = partnerType 
    ? partnerRegistry.filter(p => p.type === partnerType)
    : partnerRegistry;
  
  return partners.filter(partner => 
    partner.name.toLowerCase().includes(queryLower) ||
    partner.category.toLowerCase().includes(queryLower) ||
    partner.services.some(s => s.toLowerCase().includes(queryLower)) ||
    partner.tags.some(t => t.toLowerCase().includes(queryLower))
  );
}

export function getPartnerById(id: string): Partner | undefined {
  return partnerRegistry.find(p => p.id === id);
}

export function getPartnersByType(type: PartnerType): Partner[] {
  return partnerRegistry.filter(p => p.type === type);
}

export function getTopRatedPartners(count: number = 5): Partner[] {
  return [...partnerRegistry]
    .sort((a, b) => b.rating.overall - a.rating.overall)
    .slice(0, count);
}

export function recommendPartnerPipeline(
  investorSector: string,
  investmentSize: number
): {
  phase: string;
  partnerType: PartnerType;
  priority: 'critical' | 'high' | 'medium';
  recommendedPartners: MatchScore[];
}[] {
  const criteria: MatchCriteria = { investorSector, investmentSize };
  
  return [
    {
      phase: 'Setup & Incorporation',
      partnerType: 'legal',
      priority: 'critical',
      recommendedPartners: findMatches('legal', criteria, 2),
    },
    {
      phase: 'Financial Planning',
      partnerType: 'financial',
      priority: 'critical',
      recommendedPartners: findMatches('financial', criteria, 2),
    },
    {
      phase: 'Technology Infrastructure',
      partnerType: 'technology',
      priority: 'high',
      recommendedPartners: findMatches('technology', criteria, 2),
    },
    {
      phase: 'Supply Chain Setup',
      partnerType: 'supplier',
      priority: 'high',
      recommendedPartners: findMatches('supplier', criteria, 2),
    },
    {
      phase: 'Compliance & Certification',
      partnerType: 'consultant',
      priority: 'high',
      recommendedPartners: findMatches('consultant', { ...criteria, specificNeeds: ['compliance', 'certification'] }, 2),
    },
    {
      phase: 'Logistics & Operations',
      partnerType: 'service-provider',
      priority: 'medium',
      recommendedPartners: findMatches('service-provider', criteria, 2),
    },
  ];
}

// PRIVATE FUNCTIONS

function calculateMatchScore(partner: Partner, criteria: MatchCriteria): {
  totalScore: number;
  compatibilityFactors: MatchScore['compatibilityFactors'];
} {
  // 1. Sector Alignment (30%)
  const sectorAlignment = calculateSectorAlignment(partner, criteria.investorSector);
  
  // 2. Experience Match (25%)
  const experienceMatch = calculateExperienceMatch(partner, criteria.investmentSize);
  
  // 3. Capacity Fit (20%)
  const capacityFit = calculateCapacityFit(partner, criteria.investmentSize);
  
  // 4. Location Proximity (10%)
  const locationProximity = criteria.location 
    ? calculateLocationProximity(partner, criteria.location)
    : 75; // neutral if no location preference
  
  // 5. Rating Score (15%)
  const ratingScore = partner.rating.overall * 20; // Convert 1-5 to 0-100
  
  const totalScore = (
    sectorAlignment * 0.30 +
    experienceMatch * 0.25 +
    capacityFit * 0.20 +
    locationProximity * 0.10 +
    ratingScore * 0.15
  );
  
  return {
    totalScore: Math.round(totalScore),
    compatibilityFactors: {
      sectorAlignment,
      experienceMatch,
      capacityFit,
      locationProximity,
      ratingScore,
    },
  };
}

function calculateSectorAlignment(partner: Partner, investorSector: string): number {
  const sectorLower = investorSector.toLowerCase();
  
  // Check if partner serves this sector
  const servesAllIndustries = partner.sectors.some(s => s.toLowerCase().includes('all'));
  if (servesAllIndustries) return 85;
  
  const directMatch = partner.sectors.some(s => 
    s.toLowerCase().includes(sectorLower) || sectorLower.includes(s.toLowerCase())
  );
  if (directMatch) return 100;
  
  // Check tags
  const tagMatch = partner.tags.some(t => sectorLower.includes(t) || t.includes(sectorLower));
  if (tagMatch) return 70;
  
  return 40; // Base score
}

function calculateExperienceMatch(partner: Partner, investmentSize?: number): number {
  const yearsScore = Math.min(100, (partner.experience.yearsInBusiness / 20) * 100);
  const successScore = partner.experience.successRate;
  const clientsScore = Math.min(100, (partner.experience.clientsServed / 500) * 100);
  
  return (yearsScore * 0.4 + successScore * 0.4 + clientsScore * 0.2);
}

function calculateCapacityFit(partner: Partner, investmentSize?: number): number {
  // For now, use revenue as proxy for capacity
  const revenueLower = partner.profile.revenue.toLowerCase();
  
  if (!investmentSize) return 75; // Neutral
  
  // Extract revenue number
  const revenueMatch = revenueLower.match(/\$?([\d.]+)m/i);
  if (!revenueMatch) return 75;
  
  const revenueM = parseFloat(revenueMatch[1]);
  const investmentM = investmentSize / 1000000;
  
  // Partner should have revenue at least 2x the project size for comfort
  const ratio = revenueM / (investmentM / 2);
  
  if (ratio >= 2) return 100;
  if (ratio >= 1) return 80;
  if (ratio >= 0.5) return 60;
  return 40;
}

function calculateLocationProximity(partner: Partner, preferredLocation: string): number {
  const partnerLocation = partner.location.district.toLowerCase();
  const preferred = preferredLocation.toLowerCase();
  
  if (partnerLocation === preferred) return 100;
  if (partnerLocation.includes(preferred) || preferred.includes(partnerLocation)) return 90;
  
  // Dhaka-based partners are generally accessible
  if (partnerLocation.includes('dhaka')) return 70;
  
  return 50;
}

function generateMatchReasons(
  partner: Partner,
  criteria: MatchCriteria,
  factors: MatchScore['compatibilityFactors']
): string[] {
  const reasons: string[] = [];
  
  // Sector alignment
  if (factors.sectorAlignment > 90) {
    reasons.push(`Specialized in ${criteria.investorSector} sector`);
  } else if (factors.sectorAlignment > 80) {
    reasons.push('Serves multiple industries including yours');
  }
  
  // Experience
  if (partner.experience.yearsInBusiness > 10) {
    reasons.push(`${partner.experience.yearsInBusiness} years of proven track record`);
  }
  
  if (partner.experience.successRate > 95) {
    reasons.push(`${partner.experience.successRate}% success rate`);
  }
  
  // Rating
  if (partner.rating.overall >= 4.7) {
    reasons.push(`Highly rated (${partner.rating.overall}/5.0) by ${partner.rating.reviews} clients`);
  }
  
  // Certifications
  if (partner.certifications.length > 0) {
    reasons.push(`Certified: ${partner.certifications.slice(0, 2).join(', ')}`);
  }
  
  // Location
  if (criteria.location && factors.locationProximity > 90) {
    reasons.push(`Located in ${partner.location.district}`);
  }
  
  // Specific capabilities
  if (partner.capabilities.leadTime) {
    reasons.push(`Quick turnaround: ${partner.capabilities.leadTime}`);
  }
  
  return reasons.slice(0, 4); // Top 4 reasons
}

export function getMatchmakerStats(): {
  totalPartners: number;
  byType: Record<PartnerType, number>;
  avgRating: number;
  topCategories: Array<{ category: string; count: number }>;
} {
  const byType: Partial<Record<PartnerType, number>> = {};
  const categories: Record<string, number> = {};
  
  let totalRating = 0;
  
  partnerRegistry.forEach(partner => {
    byType[partner.type] = (byType[partner.type] || 0) + 1;
    categories[partner.category] = (categories[partner.category] || 0) + 1;
    totalRating += partner.rating.overall;
  });
  
  const topCategories = Object.entries(categories)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  return {
    totalPartners: partnerRegistry.length,
    byType: byType as Record<PartnerType, number>,
    avgRating: totalRating / partnerRegistry.length,
    topCategories,
  };
}
