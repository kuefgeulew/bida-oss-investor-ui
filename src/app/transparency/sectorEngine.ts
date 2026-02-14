/**
 * 🏭 SECTOR ENGINE — Sector-Specific Intelligence Hub
 * ARCHITECTURE: Computes sector analytics from workflow + payment engines
 * SOURCE: getAllPipelines() + paymentRegistry + agencyRegistry
 * LAW: If engines are deleted → sector data vanishes
 */

import { getAllPipelines, ApprovalPipeline } from '@/app/gov-agencies/agencyWorkflowEngine';
import { GOVERNMENT_AGENCIES } from '@/app/gov-agencies/agencyRegistry';
import { getAllPaymentsAcrossAllBBIDs } from '@/app/payments/paymentEngine';

export type SectorType = 'rmg' | 'pharma' | 'it' | 'manufacturing' | 'services' | 'agro';

export interface SectorIntelligence {
  sector: SectorType;
  sectorName: string;
  description: string;
  
  // Investment metrics
  activeInvestors: number;
  totalInvestment: number;
  avgInvestmentSize: number;
  
  // Approval metrics
  avgApprovalTime: number;
  completionRate: number;
  activeApplications: number;
  completedApplications: number;
  
  // Service metrics
  relevantServices: Array<{
    serviceId: string;
    serviceName: string;
    agencyName: string;
    avgDays: number;
    slaInDays: number;
  }>;
  
  // Financial metrics
  totalFeesPaid: number;
  avgFeesPerInvestor: number;
  
  // Bottlenecks
  bottlenecks: Array<{
    serviceName: string;
    agencyName: string;
    frequency: number;
  }>;
}

const SECTOR_METADATA: Record<SectorType, { name: string; description: string; keywords: string[] }> = {
  rmg: {
    name: 'Ready-Made Garments',
    description: 'Textile and garment manufacturing sector',
    keywords: ['garment', 'textile', 'rmg', 'apparel', 'clothing', 'fabric'],
  },
  pharma: {
    name: 'Pharmaceuticals',
    description: 'Pharmaceutical manufacturing and healthcare',
    keywords: ['pharma', 'pharmaceutical', 'medicine', 'drug', 'healthcare'],
  },
  it: {
    name: 'Information Technology',
    description: 'Software, IT services, and technology sector',
    keywords: ['it', 'software', 'technology', 'digital', 'tech', 'computer'],
  },
  manufacturing: {
    name: 'Manufacturing',
    description: 'General manufacturing and industrial production',
    keywords: ['manufacturing', 'factory', 'industrial', 'production'],
  },
  services: {
    name: 'Services',
    description: 'Service-based businesses and consulting',
    keywords: ['service', 'consulting', 'professional'],
  },
  agro: {
    name: 'Agriculture & Food Processing',
    description: 'Agriculture, food processing, and agro-based industries',
    keywords: ['agro', 'agriculture', 'food', 'farming', 'agricultural'],
  },
};

/**
 * 🎯 CLASSIFY PIPELINE BY SECTOR
 * Uses company name and type to infer sector
 */
function classifyPipelineSector(pipeline: ApprovalPipeline): SectorType {
  const companyLower = pipeline.companyName.toLowerCase();
  
  // Check keywords
  for (const [sector, meta] of Object.entries(SECTOR_METADATA)) {
    if (meta.keywords.some(keyword => companyLower.includes(keyword))) {
      return sector as SectorType;
    }
  }
  
  // Fallback based on investor type
  if (pipeline.investorType === 'manufacturing') return 'manufacturing';
  if (pipeline.investorType === 'services') return 'services';
  
  return 'manufacturing'; // default
}

/**
 * 📊 GET SECTOR INTELLIGENCE
 */
export function getSectorIntelligence(sector: SectorType): SectorIntelligence {
  const pipelines = getAllPipelines(); // 🔌 ENGINE DEPENDENCY
  const payments = getAllPaymentsAcrossAllBBIDs(); // 🔌 ENGINE DEPENDENCY
  
  const metadata = SECTOR_METADATA[sector];
  
  // Filter pipelines for this sector
  const sectorPipelines = pipelines.filter(p => classifyPipelineSector(p) === sector);
  
  // Calculate metrics
  const activeInvestors = sectorPipelines.length;
  const completedApplications = sectorPipelines.filter(p => p.overallProgress === 100).length;
  const activeApplications = sectorPipelines.filter(p => p.overallProgress < 100).length;
  
  // Approval time calculation
  const completedPipelines = sectorPipelines.filter(p => p.overallProgress === 100);
  const avgApprovalTime = completedPipelines.length > 0
    ? Math.round(
        completedPipelines.reduce((sum, p) => sum + p.actualElapsedDays, 0) / completedPipelines.length
      )
    : 0;
  
  // Completion rate
  const completionRate = activeInvestors > 0
    ? Math.round((completedApplications / activeInvestors) * 100)
    : 0;
  
  // Calculate investment (using BBID count as proxy)
  const sectorBBIDs = sectorPipelines.map(p => p.bbid);
  const totalInvestment = sectorBBIDs.length * 500000; // Mock: $500k avg per investor
  const avgInvestmentSize = activeInvestors > 0 ? Math.round(totalInvestment / activeInvestors) : 0;
  
  // Fee calculation
  const sectorPayments = payments.filter(p => sectorBBIDs.includes(p.bbid));
  const totalFeesPaid = sectorPayments.reduce((sum, p) => sum + p.amount, 0);
  const avgFeesPerInvestor = activeInvestors > 0 ? Math.round(totalFeesPaid / activeInvestors) : 0;
  
  // Service analysis
  const serviceMap = new Map<string, {
    serviceId: string;
    serviceName: string;
    agencyName: string;
    totalDays: number;
    count: number;
    slaInDays: number;
  }>();
  
  for (const pipeline of sectorPipelines) {
    for (const step of pipeline.approvalSteps) {
      if (step.status !== 'approved') continue;
      
      if (!serviceMap.has(step.serviceId)) {
        serviceMap.set(step.serviceId, {
          serviceId: step.serviceId,
          serviceName: step.serviceName,
          agencyName: step.agencyName,
          totalDays: 0,
          count: 0,
          slaInDays: step.slaInDays,
        });
      }
      
      const service = serviceMap.get(step.serviceId)!;
      service.totalDays += step.daysElapsed;
      service.count++;
    }
  }
  
  const relevantServices = Array.from(serviceMap.values())
    .map(s => ({
      serviceId: s.serviceId,
      serviceName: s.serviceName,
      agencyName: s.agencyName,
      avgDays: Math.round(s.totalDays / s.count),
      slaInDays: s.slaInDays,
    }))
    .sort((a, b) => b.avgDays - a.avgDays)
    .slice(0, 10);
  
  // Bottleneck analysis
  const bottleneckMap = new Map<string, {
    serviceName: string;
    agencyName: string;
    frequency: number;
  }>();
  
  for (const pipeline of sectorPipelines) {
    for (const step of pipeline.approvalSteps) {
      const isBottleneck = 
        (step.status === 'approved' && step.daysElapsed > step.slaInDays) ||
        (step.status === 'under-review' && step.daysRemaining < 3);
      
      if (isBottleneck) {
        if (!bottleneckMap.has(step.serviceId)) {
          bottleneckMap.set(step.serviceId, {
            serviceName: step.serviceName,
            agencyName: step.agencyName,
            frequency: 0,
          });
        }
        bottleneckMap.get(step.serviceId)!.frequency++;
      }
    }
  }
  
  const bottlenecks = Array.from(bottleneckMap.values())
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 5);
  
  return {
    sector,
    sectorName: metadata.name,
    description: metadata.description,
    activeInvestors,
    totalInvestment,
    avgInvestmentSize,
    avgApprovalTime,
    completionRate,
    activeApplications,
    completedApplications,
    relevantServices,
    totalFeesPaid,
    avgFeesPerInvestor,
    bottlenecks,
  };
}

/**
 * 📋 GET ALL SECTOR SUMMARIES
 */
export function getAllSectorSummaries() {
  const sectors: SectorType[] = ['rmg', 'pharma', 'it', 'manufacturing', 'services', 'agro'];
  
  return sectors.map(sector => {
    const intel = getSectorIntelligence(sector);
    return {
      sector,
      name: intel.sectorName,
      activeInvestors: intel.activeInvestors,
      avgApprovalTime: intel.avgApprovalTime,
      completionRate: intel.completionRate,
    };
  }).filter(s => s.activeInvestors > 0);
}

/**
 * 🔍 GET PIPELINES FOR SECTOR
 */
export function getPipelinesForSector(sector: SectorType): ApprovalPipeline[] {
  const pipelines = getAllPipelines();
  return pipelines.filter(p => classifyPipelineSector(p) === sector);
}
