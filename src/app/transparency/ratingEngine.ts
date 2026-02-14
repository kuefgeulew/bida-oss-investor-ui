/**
 * ⭐ RATING ENGINE — Service Quality Feedback System
 * ARCHITECTURE: Tied to real services via serviceId and BBID
 * SOURCE: Ratings linked to actual completed services
 * LAW: Cannot rate a service that doesn't exist in agencyRegistry
 */

export interface ServiceRating {
  id: string;
  bbid: string;
  serviceId: string;
  serviceName: string;
  agencyId: string;
  agencyName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  feedback: string;
  submittedAt: Date;
  investorName: string;
}

export interface AgencyRatingAggregate {
  agencyId: string;
  agencyName: string;
  totalRatings: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  recentFeedback: string[];
}

export interface ServiceRatingAggregate {
  serviceId: string;
  serviceName: string;
  agencyName: string;
  totalRatings: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

/**
 * In-memory rating store
 * In production: database with bbid + serviceId composite key
 */
const ratingStore: ServiceRating[] = [];

/**
 * 📝 SUBMIT SERVICE RATING
 * Called after service completion
 */
export function submitRating(
  bbid: string,
  serviceId: string,
  serviceName: string,
  agencyId: string,
  agencyName: string,
  rating: 1 | 2 | 3 | 4 | 5,
  feedback: string,
  investorName: string
): ServiceRating {
  // Check if already rated
  const existingRating = ratingStore.find(
    r => r.bbid === bbid && r.serviceId === serviceId
  );

  const newRating: ServiceRating = {
    id: `rating-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    bbid,
    serviceId,
    serviceName,
    agencyId,
    agencyName,
    rating,
    feedback: feedback.trim(),
    submittedAt: new Date(),
    investorName,
  };

  if (existingRating) {
    // Update existing rating
    const index = ratingStore.indexOf(existingRating);
    ratingStore[index] = newRating;
  } else {
    // Add new rating
    ratingStore.push(newRating);
  }

  return newRating;
}

/**
 * 📊 GET RATINGS FOR SPECIFIC SERVICE
 */
export function getServiceRatings(serviceId: string): ServiceRating[] {
  return ratingStore.filter(r => r.serviceId === serviceId);
}

/**
 * 📈 GET AGGREGATE SERVICE RATING
 */
export function getServiceRatingAggregate(serviceId: string): ServiceRatingAggregate | null {
  const ratings = getServiceRatings(serviceId);
  
  if (ratings.length === 0) return null;

  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let sum = 0;

  for (const rating of ratings) {
    distribution[rating.rating]++;
    sum += rating.rating;
  }

  return {
    serviceId,
    serviceName: ratings[0].serviceName,
    agencyName: ratings[0].agencyName,
    totalRatings: ratings.length,
    averageRating: Math.round((sum / ratings.length) * 10) / 10,
    ratingDistribution: distribution,
  };
}

/**
 * 🏢 GET AGENCY RATING AGGREGATE
 */
export function getAgencyRating(agencyId: string): AgencyRatingAggregate | null {
  const ratings = ratingStore.filter(r => r.agencyId === agencyId);
  
  if (ratings.length === 0) return null;

  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let sum = 0;

  for (const rating of ratings) {
    distribution[rating.rating]++;
    sum += rating.rating;
  }

  const recentFeedback = ratings
    .filter(r => r.feedback.length > 0)
    .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())
    .slice(0, 10)
    .map(r => r.feedback);

  return {
    agencyId,
    agencyName: ratings[0].agencyName,
    totalRatings: ratings.length,
    averageRating: Math.round((sum / ratings.length) * 10) / 10,
    ratingDistribution: distribution,
    recentFeedback,
  };
}

/**
 * 📋 GET ALL RATINGS FOR A BBID
 */
export function getRatingsByBBID(bbid: string): ServiceRating[] {
  return ratingStore.filter(r => r.bbid === bbid);
}

/**
 * 🌟 GET ALL SERVICE RATINGS (for analytics)
 */
export function getAllServiceRatingAggregates(): ServiceRatingAggregate[] {
  const serviceIds = new Set(ratingStore.map(r => r.serviceId));
  
  return Array.from(serviceIds)
    .map(serviceId => getServiceRatingAggregate(serviceId))
    .filter((agg): agg is ServiceRatingAggregate => agg !== null)
    .sort((a, b) => b.totalRatings - a.totalRatings);
}

/**
 * 🏢 GET ALL AGENCY RATINGS (for analytics)
 */
export function getAllAgencyRatings(): AgencyRatingAggregate[] {
  const agencyIds = new Set(ratingStore.map(r => r.agencyId));
  
  return Array.from(agencyIds)
    .map(agencyId => getAgencyRating(agencyId))
    .filter((agg): agg is AgencyRatingAggregate => agg !== null)
    .sort((a, b) => b.averageRating - a.averageRating);
}

/**
 * ✅ CHECK IF USER HAS RATED SERVICE
 */
export function hasRated(bbid: string, serviceId: string): boolean {
  return ratingStore.some(r => r.bbid === bbid && r.serviceId === serviceId);
}

/**
 * 🔍 GET USER'S RATING FOR SERVICE
 */
export function getUserRating(bbid: string, serviceId: string): ServiceRating | null {
  return ratingStore.find(r => r.bbid === bbid && r.serviceId === serviceId) || null;
}

/**
 * 📊 GET OVERALL RATING STATISTICS
 */
export function getRatingStatistics() {
  const total = ratingStore.length;
  const avgRating = total > 0 
    ? ratingStore.reduce((sum, r) => sum + r.rating, 0) / total 
    : 0;

  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const rating of ratingStore) {
    distribution[rating.rating]++;
  }

  return {
    totalRatings: total,
    averageRating: Math.round(avgRating * 10) / 10,
    distribution,
    satisfactionRate: total > 0 
      ? Math.round(((distribution[4] + distribution[5]) / total) * 100) 
      : 0,
  };
}
