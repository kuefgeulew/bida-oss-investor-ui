// 📊 FDI DATA ENGINE — Foreign Direct Investment Analytics Intelligence
// ARCHITECTURE: Reads agencyWorkflowEngine to compute sector trends, approval velocity, bottlenecks
// SOURCE: Completed pipelines + workflow state
// OUTPUT: FDI analytics for strategic decision-making

import { getAllPipelines, ApprovalPipeline } from '@/app/gov-agencies/agencyWorkflowEngine';
import { getAllPaymentsAcrossAllBBIDs } from '@/app/payments/paymentEngine';

export interface FDISectorData {
  sector: string;
  projectCount: number;
  totalInvestment: number;
  avgApprovalTime: number;
  completionRate: number;
  activeProjects: number;
  completedProjects: number;
}

export interface FDIAgencyLoad {
  agency: string;
  totalApplications: number;
  pending: number;
  inProgress: number;
  approved: number;
  rejected: number;
  avgProcessingTime: number;
  workload: 'low' | 'medium' | 'high' | 'critical';
}

export interface FDIApprovalVelocity {
  month: string;
  approvals: number;
  rejections: number;
  avgDays: number;
}

export interface FDIBottleneck {
  serviceId: string;
  serviceName: string;
  agency: string;
  averageDelay: number;
  impactedProjects: number;
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
}

export interface FDIOverview {
  totalProjects: number;
  totalInvestment: number;
  activeProjects: number;
  completedProjects: number;
  avgApprovalTime: number;
  totalRevenue: number;
  topSector: string;
  topCountry: string;
}

/**
 * 📊 GET FDI OVERVIEW
 * High-level dashboard metrics
 */
export function getFDIOverview(): FDIOverview {
  const pipelines = getAllPipelines();
  const payments = getAllPaymentsAcrossAllBBIDs();

  const activeProjects = pipelines.filter(p => p.overallProgress < 100 && p.overallProgress > 0).length;
  const completedProjects = pipelines.filter(p => p.overallProgress === 100).length;

  // Calculate total investment from pipeline data
  const totalInvestment = pipelines.reduce((sum, p) => {
    return sum + (p.investmentAmount || 0);
  }, 0);

  // Calculate average approval time
  const completedPipelines = pipelines.filter(p => p.overallProgress === 100);
  const avgApprovalTime = completedPipelines.length > 0
    ? completedPipelines.reduce((sum, p) => {
        const totalDays = p.approvalSteps.reduce((s, step) => s + step.daysElapsed, 0);
        return sum + totalDays;
      }, 0) / completedPipelines.length
    : 0;

  // Calculate total revenue
  const totalRevenue = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  // Find top sector
  const sectorCounts = new Map<string, number>();
  pipelines.forEach(p => {
    const sector = p.sector || 'Other';
    sectorCounts.set(sector, (sectorCounts.get(sector) || 0) + 1);
  });
  const topSector = Array.from(sectorCounts.entries())
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Manufacturing';

  // Find top country
  const countryData = getCountryBreakdown();
  const topCountry = countryData.length > 0 ? countryData[0].country : 'USA';

  return {
    totalProjects: pipelines.length,
    totalInvestment,
    activeProjects,
    completedProjects,
    avgApprovalTime: Math.round(avgApprovalTime),
    totalRevenue,
    topSector,
    topCountry
  };
}

/**
 * 📈 GET SECTOR BREAKDOWN
 * Investment and project distribution by sector
 */
export function getSectorBreakdown(): FDISectorData[] {
  const pipelines = getAllPipelines();
  const sectorMap = new Map<string, ApprovalPipeline[]>();

  // Group by sector
  pipelines.forEach(p => {
    const sector = p.sector || 'Other';
    if (!sectorMap.has(sector)) {
      sectorMap.set(sector, []);
    }
    sectorMap.get(sector)!.push(p);
  });

  return Array.from(sectorMap.entries()).map(([sector, pipelines]) => {
    const completedProjects = pipelines.filter(p => p.overallProgress === 100).length;
    const activeProjects = pipelines.filter(p => p.overallProgress > 0 && p.overallProgress < 100).length;
    
    const avgApprovalTime = completedProjects > 0
      ? pipelines
          .filter(p => p.overallProgress === 100)
          .reduce((sum, p) => {
            const totalDays = p.approvalSteps.reduce((s, step) => s + step.daysElapsed, 0);
            return sum + totalDays;
          }, 0) / completedProjects
      : 0;

    // Calculate actual total investment for this sector
    const totalInvestment = pipelines.reduce((sum, p) => sum + (p.investmentAmount || 0), 0);

    return {
      sector,
      projectCount: pipelines.length,
      totalInvestment,
      avgApprovalTime: Math.round(avgApprovalTime),
      completionRate: pipelines.length > 0 ? Math.round((completedProjects / pipelines.length) * 100) : 0,
      activeProjects,
      completedProjects
    };
  }).sort((a, b) => b.totalInvestment - a.totalInvestment);
}

/**
 * 🏛️ GET AGENCY WORKLOAD
 * Process load and performance by government agency
 */
export function getAgencyWorkload(): FDIAgencyLoad[] {
  const pipelines = getAllPipelines();
  const agencyMap = new Map<string, {
    totalApplications: number;
    pending: number;
    inProgress: number;
    approved: number;
    rejected: number;
    totalProcessingDays: number;
  }>();

  // Aggregate by agency
  pipelines.forEach(pipeline => {
    pipeline.approvalSteps.forEach(step => {
      const agency = step.agencyName;
      
      if (!agencyMap.has(agency)) {
        agencyMap.set(agency, {
          totalApplications: 0,
          pending: 0,
          inProgress: 0,
          approved: 0,
          rejected: 0,
          totalProcessingDays: 0
        });
      }

      const data = agencyMap.get(agency)!;
      data.totalApplications++;

      switch (step.status) {
        case 'not-started':
        case 'pending':
          data.pending++;
          break;
        case 'in-progress':
        case 'documents-pending':
        case 'under-review':
          data.inProgress++;
          break;
        case 'approved':
          data.approved++;
          data.totalProcessingDays += step.daysElapsed;
          break;
        case 'rejected':
          data.rejected++;
          break;
      }
    });
  });

  return Array.from(agencyMap.entries()).map(([agency, data]) => {
    const avgProcessingTime = data.approved > 0
      ? Math.round(data.totalProcessingDays / data.approved)
      : 0;

    // Calculate workload severity
    const workloadScore = (data.pending + data.inProgress) / Math.max(data.totalApplications, 1);
    let workload: 'low' | 'medium' | 'high' | 'critical';
    if (workloadScore < 0.3) workload = 'low';
    else if (workloadScore < 0.6) workload = 'medium';
    else if (workloadScore < 0.8) workload = 'high';
    else workload = 'critical';

    return {
      agency,
      totalApplications: data.totalApplications,
      pending: data.pending,
      inProgress: data.inProgress,
      approved: data.approved,
      rejected: data.rejected,
      avgProcessingTime,
      workload
    };
  }).sort((a, b) => b.totalApplications - a.totalApplications);
}

/**
 * ⚡ GET APPROVAL VELOCITY
 * Time-series analysis of approval trends
 */
export function getApprovalVelocity(): FDIApprovalVelocity[] {
  const pipelines = getAllPipelines();
  const monthlyData = new Map<string, {
    approvals: number;
    rejections: number;
    totalDays: number;
  }>();

  pipelines.forEach(pipeline => {
    pipeline.approvalSteps.forEach(step => {
      if (step.completionDate) {
        const date = new Date(step.completionDate);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!monthlyData.has(monthKey)) {
          monthlyData.set(monthKey, { approvals: 0, rejections: 0, totalDays: 0 });
        }

        const data = monthlyData.get(monthKey)!;
        if (step.status === 'approved') {
          data.approvals++;
          data.totalDays += step.daysElapsed;
        } else if (step.status === 'rejected') {
          data.rejections++;
        }
      }
    });
  });

  // Generate last 6 months of data
  const result: FDIApprovalVelocity[] = [];
  const now = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    const data = monthlyData.get(monthKey) || { approvals: 0, rejections: 0, totalDays: 0 };
    const avgDays = data.approvals > 0 ? Math.round(data.totalDays / data.approvals) : 0;

    result.push({
      month: monthName,
      approvals: data.approvals,
      rejections: data.rejections,
      avgDays
    });
  }

  return result;
}

/**
 * 🚨 GET BOTTLENECKS
 * Identify services causing delays across all projects
 */
export function getSystemBottlenecks(): FDIBottleneck[] {
  const pipelines = getAllPipelines();
  const serviceMap = new Map<string, {
    serviceName: string;
    agency: string;
    totalDelay: number;
    projectCount: number;
    slaViolations: number;
  }>();

  pipelines.forEach(pipeline => {
    pipeline.approvalSteps.forEach(step => {
      const delay = step.daysElapsed - step.slaInDays;
      
      if (delay > 0) {
        if (!serviceMap.has(step.serviceId)) {
          serviceMap.set(step.serviceId, {
            serviceName: step.serviceName,
            agency: step.agencyName,
            totalDelay: 0,
            projectCount: 0,
            slaViolations: 0
          });
        }

        const data = serviceMap.get(step.serviceId)!;
        data.totalDelay += delay;
        data.projectCount++;
        data.slaViolations++;
      }
    });
  });

  return Array.from(serviceMap.entries())
    .map(([serviceId, data]) => {
      const averageDelay = Math.round(data.totalDelay / data.projectCount);
      
      let severity: 'minor' | 'moderate' | 'severe' | 'critical';
      if (averageDelay < 3) severity = 'minor';
      else if (averageDelay < 7) severity = 'moderate';
      else if (averageDelay < 14) severity = 'severe';
      else severity = 'critical';

      return {
        serviceId,
        serviceName: data.serviceName,
        agency: data.agency,
        averageDelay,
        impactedProjects: data.projectCount,
        severity
      };
    })
    .sort((a, b) => b.averageDelay - a.averageDelay)
    .slice(0, 10); // Top 10 bottlenecks
}

/**
 * 🌍 GET COUNTRY BREAKDOWN
 * Investment distribution by country of origin
 */
export function getCountryBreakdown(): Array<{ country: string; projects: number; investment: number }> {
  const pipelines = getAllPipelines();
  const countryMap = new Map<string, { projects: number; investment: number }>();

  // Aggregate by country
  pipelines.forEach(p => {
    const country = p.countryOfOrigin || 'Unknown';
    if (!countryMap.has(country)) {
      countryMap.set(country, { projects: 0, investment: 0 });
    }
    const data = countryMap.get(country)!;
    data.projects++;
    data.investment += p.investmentAmount || 0;
  });

  // Sort by investment amount and return top countries
  return Array.from(countryMap.entries())
    .map(([country, data]) => ({
      country,
      projects: data.projects,
      investment: data.investment
    }))
    .sort((a, b) => b.investment - a.investment)
    .slice(0, 10); // Top 10 countries
}