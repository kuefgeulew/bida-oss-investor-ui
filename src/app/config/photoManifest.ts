/**
 * Photo Manifest - Central registry of all image paths
 * 
 * ARCHITECTURE ENFORCEMENT:
 * All photos MUST be stored in /public/photos/ directory.
 * This manifest is the ONLY place where file paths are defined.
 * Components reference keys from this manifest, never direct paths.
 * 
 * REPLACEABILITY GUARANTEE:
 * Designers can replace any image in /public/photos/ folders
 * without touching code - just match the filename.
 */

// Placeholder Images (SVG - always available)
export const placeholders = {
  hero: '/photos/placeholders/feature.svg',
  zone: '/photos/placeholders/feature.svg',
  officer: '/photos/placeholders/avatar.svg',
  sector: '/photos/placeholders/feature.svg',
  testimonial: '/photos/placeholders/avatar.svg',
  feature: '/photos/placeholders/feature.svg',
  admin: '/photos/placeholders/feature.svg',
  document: '/photos/placeholders/document.svg',
  avatar: '/photos/placeholders/avatar.svg',
};

// Homepage Images
export const homepage = {
  hero: '/photos/ui/homepage-hero-factory.jpg',
  featureDigital: '/photos/ui/homepage-feature-digital.jpg',
  featureCollaboration: '/photos/ui/homepage-feature-collaboration.jpg',
  featureTransparency: '/photos/ui/homepage-feature-transparency.jpg',
  featureGlobal: '/photos/ui/homepage-feature-global.jpg',
};

// Economic Zone Images
export const zones = {
  dhakaEpz: '/photos/zones/zone-dhaka-epz.jpg',
  chittagongEpz: '/photos/zones/zone-chittagong-epz.jpg',
  monglaEpz: '/photos/zones/zone-mongla-epz.jpg',
  bepzaKarnaphuli: '/photos/zones/zone-bepza-karnaphuli.jpg',
  adamjeeEpz: '/photos/zones/zone-adamjee-epz.jpg',
  comillaEpz: '/photos/zones/zone-comilla-epz.jpg',
  ishwardiEpz: '/photos/zones/zone-ishwardi-epz.jpg',
  uttaraEpz: '/photos/zones/zone-uttara-epz.jpg',
};

// Sector Images
export const sectors = {
  textile: '/photos/sectors/sector-textile.jpg',
  pharma: '/photos/sectors/sector-pharma.jpg',
  it: '/photos/sectors/sector-it.jpg',
  energy: '/photos/sectors/sector-energy.jpg',
  manufacturing: '/photos/sectors/sector-manufacturing.jpg',
  realEstate: '/photos/sectors/sector-realestate.jpg',
  electronics: '/photos/sectors/sector-electronics.jpg',
  logistics: '/photos/sectors/sector-logistics.jpg',
};

// Officer Profile Images
export const officers = {
  ahmedKhan: '/photos/officers/officer-ahmed-khan.jpg',
  fatimaRahman: '/photos/officers/officer-fatima-rahman.jpg',
  drRahman: '/photos/officers/officer-dr-rahman.jpg',
  msSultana: '/photos/officers/officer-ms-sultana.jpg',
  mrIslam: '/photos/officers/officer-mr-islam.jpg',
  msBegum: '/photos/officers/officer-ms-begum.jpg',
};

// Investor Testimonial Images
export const testimonials = {
  portrait1: '/photos/testimonials/testimonial-portrait-1.jpg',
  portrait2: '/photos/testimonials/testimonial-portrait-2.jpg',
  portrait3: '/photos/testimonials/testimonial-portrait-3.jpg',
  portrait4: '/photos/testimonials/testimonial-portrait-4.jpg',
};

// Admin Dashboard Images
export const admin = {
  controlCenter: '/photos/admin/admin-control-center.jpg',
  dataCenter: '/photos/admin/admin-data-center.jpg',
  meetingRoom: '/photos/admin/admin-meeting-room.jpg',
};

// Bank Partner Images
export const banks = {
  brac: '/photos/banks/bank-brac.jpg',
  cityBank: '/photos/banks/bank-city.jpg',
  ebl: '/photos/banks/bank-ebl.jpg',
  dbbl: '/photos/banks/bank-dbbl.jpg',
};

// Document Process Images
export const documents = {
  upload: '/photos/documents/document-upload.jpg',
  verification: '/photos/documents/document-verification.jpg',
  processing: '/photos/documents/document-processing.jpg',
};

// OSS Platform UI Screenshots
export const oss = {
  portalHeader: '/photos/ui/oss-portal-header.png',
  publicServicePerformance: '/photos/ui/public-service-performance.png',
  agencyStatistics: '/photos/ui/agency-statistics.png',
  agencyTable: '/photos/ui/agency-table.png',
  streamlinedPlatform: '/photos/ui/oss-streamlined-platform.png',
  apiExplorer: '/photos/ui/api-explorer.png',
};

// Government Agency Logos
export const agencies = {
  bida: '/photos/agencies/bida-logo.png',
  beza: '/photos/agencies/beza-logo.png',
  bepza: '/photos/agencies/bepza-logo.png',
  bhtpa: '/photos/agencies/bhtpa-logo.png',
  bscic: '/photos/agencies/bscic-logo.png',
  pppa: '/photos/agencies/pppa-logo.png',
};

// Consolidated photoManifest export
export const photoManifest = {
  placeholders,
  homepage,
  zones,
  sectors,
  officers,
  testimonials,
  admin,
  banks,
  documents,
  oss,
  agencies,
};

// Legacy exports for backward compatibility
export const homepageImages = homepage;
export const zoneImages = { ...zones, fallback: placeholders.zone };
export const sectorImages = { ...sectors, fallback: placeholders.sector };
export const officerImages = { ...officers, fallback: placeholders.officer };
export const testimonialImages = { ...testimonials, fallback: placeholders.testimonial };
export const featureImages = { fallback: placeholders.feature };
export const adminImages = { ...admin, fallback: placeholders.admin };

// Helper function to get zone image with fallback
export function getZoneImage(zoneId: string): { src: string; fallback: string } {
  const key = zoneId.toLowerCase().replace(/\s+/g, '-') as keyof typeof zoneImages;
  return {
    src: zoneImages[key] || zoneImages.fallback,
    fallback: zoneImages.fallback
  };
}

// Helper function to get sector image with fallback
export function getSectorImage(sector: string): { src: string; fallback: string } {
  if (!sector) {
    return {
      src: sectorImages.fallback,
      fallback: sectorImages.fallback
    };
  }
  const key = sector.toLowerCase().replace(/\s+/g, '') as keyof typeof sectorImages;
  return {
    src: sectorImages[key] || sectorImages.fallback,
    fallback: sectorImages.fallback
  };
}

// Helper function to get officer image with fallback
export function getOfficerImage(officerName: string): { src: string; fallback: string } {
  const key = officerName.toLowerCase().replace(/\s+/g, '-') as keyof typeof officerImages;
  return {
    src: officerImages[key] || officerImages.fallback,
    fallback: officerImages.fallback
  };
}

// Helper function to get testimonial image with fallback
export function getTestimonialImage(investorName: string): { src: string; fallback: string } {
  const key = investorName.toLowerCase().replace(/\s+/g, '-') as keyof typeof testimonialImages;
  return {
    src: testimonialImages[key] || testimonialImages.fallback,
    fallback: testimonialImages.fallback
  };
}

// Helper function to get homepage image with fallback
export function getHomepageImage(type: string = 'hero'): { src: string; fallback: string } {
  const key = type as keyof typeof homepage;
  return {
    src: homepage[key] || homepage.hero,
    fallback: placeholders.hero
  };
}

// Helper function to get feature image with fallback
export function getFeatureImage(feature: string): { src: string; fallback: string } {
  return {
    src: placeholders.feature,
    fallback: placeholders.feature
  };
}

// Helper function to get admin image with fallback
export function getAdminImage(type: string = 'controlCenter'): { src: string; fallback: string } {
  const key = type as keyof typeof admin;
  return {
    src: admin[key] || admin.controlCenter,
    fallback: placeholders.admin
  };
}