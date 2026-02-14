/**
 * Centralized Image Configuration for Bangladesh OSS Platform
 * 
 * ⚠️  DEPRECATED - Use photoManifest.ts instead
 * 
 * This file now re-exports from photoManifest.ts to maintain backward compatibility.
 * All new code should import directly from '@/app/config/photoManifest'
 */

import { oss, agencies, zones as zoneImages } from './photoManifest';

/**
 * Homepage Images
 * @deprecated Import from photoManifest.ts instead
 */
export const homepage = {
  dhakaSkyline: oss.portalHeader,
  ossDiagram: oss.streamlinedPlatform,
  performanceData: oss.publicServicePerformance,
};

/**
 * Agency Logos
 * @deprecated Import from photoManifest.ts instead
 */
export const agencyLogos = agencies;

/**
 * Zone Images
 * @deprecated Import from photoManifest.ts instead
 */
export const zones = {
  mirsaraiSEZ: zoneImages.dhakaEpz,
  monglaEPZ: zoneImages.monglaEpz,
  jessoreEPZ: zoneImages.chittagongEpz,
  dhakaEPZ: zoneImages.dhakaEpz
};
