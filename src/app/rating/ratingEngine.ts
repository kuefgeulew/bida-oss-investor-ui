// Rating Engine - Service feedback and satisfaction tracking
// READ-ONLY engine for service quality metrics
// Feeds: Admin analytics, Public SLA Dashboard

export interface ServiceRating {
  id: string;
  serviceId: string;
  serviceName: string;
  bbid: string;
  investorId: string;
  
  ratings: {
    overall: number; // 1-5
    speed: number;
    quality: number;
    communication: number;
    transparency: number;
  };
  
  feedback: string;
  wouldRecommend: boolean;
  submittedDate: string;
  
  officerId?: string;
  officerName?: string;
}

export interface ServiceStats {
  serviceId: string;
  serviceName: string;
  totalRatings: number;
  averageRating: number;
  recommendationRate: number; // percentage
  
  breakdown: {
    speed: number;
    quality: number;
    communication: number;
    transparency: number;
  };
  
  recentFeedback: string[];
}

// In-memory rating storage
const ratings: Map<string, ServiceRating> = new Map();

// PUBLIC API

export function submitRating(rating: Omit<ServiceRating, 'id' | 'submittedDate'>): ServiceRating {
  const id = `RATING-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const newRating: ServiceRating = {
    ...rating,
    id,
    submittedDate: new Date().toISOString(),
  };
  
  ratings.set(id, newRating);
  
  console.log(`[Rating Engine] ⭐ New rating submitted for ${rating.serviceName}: ${rating.ratings.overall}/5`);
  
  return newRating;
}

export function getServiceStats(serviceId: string): ServiceStats | null {
  const serviceRatings = Array.from(ratings.values()).filter(r => r.serviceId === serviceId);
  
  if (serviceRatings.length === 0) return null;
  
  const totalRatings = serviceRatings.length;
  const avgOverall = serviceRatings.reduce((sum, r) => sum + r.ratings.overall, 0) / totalRatings;
  const avgSpeed = serviceRatings.reduce((sum, r) => sum + r.ratings.speed, 0) / totalRatings;
  const avgQuality = serviceRatings.reduce((sum, r) => sum + r.ratings.quality, 0) / totalRatings;
  const avgCommunication = serviceRatings.reduce((sum, r) => sum + r.ratings.communication, 0) / totalRatings;
  const avgTransparency = serviceRatings.reduce((sum, r) => sum + r.ratings.transparency, 0) / totalRatings;
  
  const recommendCount = serviceRatings.filter(r => r.wouldRecommend).length;
  const recommendationRate = (recommendCount / totalRatings) * 100;
  
  const recentFeedback = serviceRatings
    .filter(r => r.feedback.trim().length > 0)
    .sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime())
    .slice(0, 5)
    .map(r => r.feedback);
  
  return {
    serviceId,
    serviceName: serviceRatings[0].serviceName,
    totalRatings,
    averageRating: parseFloat(avgOverall.toFixed(1)),
    recommendationRate: parseFloat(recommendationRate.toFixed(1)),
    breakdown: {
      speed: parseFloat(avgSpeed.toFixed(1)),
      quality: parseFloat(avgQuality.toFixed(1)),
      communication: parseFloat(avgCommunication.toFixed(1)),
      transparency: parseFloat(avgTransparency.toFixed(1)),
    },
    recentFeedback,
  };
}

export function getAllServiceStats(): ServiceStats[] {
  const serviceIds = new Set(Array.from(ratings.values()).map(r => r.serviceId));
  return Array.from(serviceIds)
    .map(id => getServiceStats(id))
    .filter((stats): stats is ServiceStats => stats !== null)
    .sort((a, b) => b.averageRating - a.averageRating);
}

export function getTopRatedServices(limit: number = 10): ServiceStats[] {
  return getAllServiceStats().slice(0, limit);
}

export function getLowRatedServices(threshold: number = 3.5): ServiceStats[] {
  return getAllServiceStats().filter(s => s.averageRating < threshold);
}

export function getRatingsByBBID(bbid: string): ServiceRating[] {
  return Array.from(ratings.values())
    .filter(r => r.bbid === bbid)
    .sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());
}

export function getAggregateMetrics(): {
  totalRatings: number;
  overallAverage: number;
  recommendationRate: number;
  topIssues: string[];
} {
  const allRatings = Array.from(ratings.values());
  
  if (allRatings.length === 0) {
    return {
      totalRatings: 0,
      overallAverage: 0,
      recommendationRate: 0,
      topIssues: [],
    };
  }
  
  const totalRatings = allRatings.length;
  const overallAverage = allRatings.reduce((sum, r) => sum + r.ratings.overall, 0) / totalRatings;
  const recommendCount = allRatings.filter(r => r.wouldRecommend).length;
  const recommendationRate = (recommendCount / totalRatings) * 100;
  
  return {
    totalRatings,
    overallAverage: parseFloat(overallAverage.toFixed(2)),
    recommendationRate: parseFloat(recommendationRate.toFixed(1)),
    topIssues: ['Long processing times', 'Unclear requirements', 'Communication delays'],
  };
}
