/**
 * 🏷️ TAG FILTER ENGINE — Service Categorization & Filtering
 * ARCHITECTURE: Reads agencyRegistry for tagged services
 * SOURCE: GOVERNMENT_AGENCIES with service.tags
 * LAW: If agencyRegistry is deleted → all filters fail
 */

import { GOVERNMENT_AGENCIES, AgencyService, GovernmentAgency } from '@/app/gov-agencies/agencyRegistry';

export type ServiceTag = 'startup' | 'sme' | 'green' | 'export' | 'tech' | 'priority';

export interface TaggedService {
  serviceId: string;
  serviceName: string;
  agencyId: string;
  agencyName: string;
  slaInDays: number;
  fee: number;
  currency: 'BDT' | 'USD';
  tags: ServiceTag[];
  description: string;
}

/**
 * 🔍 GET SERVICES BY TAG
 * Returns all services that have the specified tag
 */
export function getServicesByTag(tag: ServiceTag): TaggedService[] {
  const services: TaggedService[] = [];
  
  // 🔌 ENGINE DEPENDENCY: Reads from agencyRegistry
  for (const agency of GOVERNMENT_AGENCIES) {
    for (const service of agency.services) {
      if (service.tags?.includes(tag)) {
        services.push({
          serviceId: service.id,
          serviceName: service.name,
          agencyId: agency.id,
          agencyName: agency.name,
          slaInDays: service.slaInDays,
          fee: service.fee,
          currency: service.currency,
          tags: service.tags,
          description: service.description,
        });
      }
    }
  }
  
  return services;
}

/**
 * 🎯 GET ALL TAGGED SERVICES
 * Returns all services that have at least one tag
 */
export function getAllTaggedServices(): TaggedService[] {
  const services: TaggedService[] = [];
  
  for (const agency of GOVERNMENT_AGENCIES) {
    for (const service of agency.services) {
      if (service.tags && service.tags.length > 0) {
        services.push({
          serviceId: service.id,
          serviceName: service.name,
          agencyId: agency.id,
          agencyName: agency.name,
          slaInDays: service.slaInDays,
          fee: service.fee,
          currency: service.currency,
          tags: service.tags,
          description: service.description,
        });
      }
    }
  }
  
  return services;
}

/**
 * 📊 GET TAG STATISTICS
 * Count services per tag
 */
export function getTagStatistics() {
  const stats: Record<ServiceTag, number> = {
    startup: 0,
    sme: 0,
    green: 0,
    export: 0,
    tech: 0,
    priority: 0,
  };
  
  for (const agency of GOVERNMENT_AGENCIES) {
    for (const service of agency.services) {
      if (service.tags) {
        for (const tag of service.tags) {
          stats[tag]++;
        }
      }
    }
  }
  
  return stats;
}

/**
 * 🏷️ GET SERVICES WITH MULTIPLE TAGS
 * Filter services that match ALL specified tags
 */
export function getServicesByMultipleTags(tags: ServiceTag[]): TaggedService[] {
  const services: TaggedService[] = [];
  
  for (const agency of GOVERNMENT_AGENCIES) {
    for (const service of agency.services) {
      if (service.tags && tags.every(tag => service.tags?.includes(tag))) {
        services.push({
          serviceId: service.id,
          serviceName: service.name,
          agencyId: agency.id,
          agencyName: agency.name,
          slaInDays: service.slaInDays,
          fee: service.fee,
          currency: service.currency,
          tags: service.tags,
          description: service.description,
        });
      }
    }
  }
  
  return services;
}

/**
 * 🔍 GET SERVICES BY ANY TAG
 * Filter services that match ANY of the specified tags
 */
export function getServicesByAnyTag(tags: ServiceTag[]): TaggedService[] {
  const services: TaggedService[] = [];
  const seen = new Set<string>();
  
  for (const agency of GOVERNMENT_AGENCIES) {
    for (const service of agency.services) {
      if (service.tags && service.tags.some(tag => tags.includes(tag))) {
        if (!seen.has(service.id)) {
          seen.add(service.id);
          services.push({
            serviceId: service.id,
            serviceName: service.name,
            agencyId: agency.id,
            agencyName: agency.name,
            slaInDays: service.slaInDays,
            fee: service.fee,
            currency: service.currency,
            tags: service.tags,
            description: service.description,
          });
        }
      }
    }
  }
  
  return services;
}

/**
 * 📋 GET AVAILABLE TAGS
 * Returns all unique tags currently in use
 */
export function getAvailableTags(): ServiceTag[] {
  const tags = new Set<ServiceTag>();
  
  for (const agency of GOVERNMENT_AGENCIES) {
    for (const service of agency.services) {
      if (service.tags) {
        service.tags.forEach(tag => tags.add(tag));
      }
    }
  }
  
  return Array.from(tags);
}

/**
 * 🎨 GET TAG METADATA
 */
export const TAG_METADATA: Record<ServiceTag, { label: string; description: string; color: string }> = {
  startup: {
    label: 'Startup',
    description: 'Essential services for startups and new businesses',
    color: 'blue',
  },
  sme: {
    label: 'SME',
    description: 'Services tailored for small and medium enterprises',
    color: 'green',
  },
  green: {
    label: 'Green/Eco',
    description: 'Environmental and sustainability-focused services',
    color: 'emerald',
  },
  export: {
    label: 'Export',
    description: 'Services for export-oriented businesses',
    color: 'purple',
  },
  tech: {
    label: 'Technology',
    description: 'Tech industry specific services',
    color: 'cyan',
  },
  priority: {
    label: 'Priority',
    description: 'Fast-track and priority processing services',
    color: 'orange',
  },
};
