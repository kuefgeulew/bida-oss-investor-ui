/**
 * 📊 SLA ENGINE — Service Level Agreement Analytics
 * ARCHITECTURE: Reads agencyWorkflowEngine to compute real-time SLA performance
 * SOURCE: getAllPipelines() from agencyWorkflowEngine
 * LAW: If agencyWorkflowEngine is deleted → this engine MUST crash
 */

import { getAllPipelines, ApprovalPipeline, ApprovalStep } from '@/app/gov-agencies/agencyWorkflowEngine';
import { GOVERNMENT_AGENCIES, GovernmentAgency } from '@/app/gov-agencies/agencyRegistry';

export interface SLAMetrics {
  agencyId: string;
  agencyName: string;
  totalServices: number;
  completedServices: number;
  averageCompletionDays: number;
  slaBreaches: number;
  onTimePercentage: number;
  activeServices: number;
  avgSLA: number;
}

export interface ServiceSLAMetrics {
  serviceId: string;
  serviceName: string;
  agencyName: string;
  totalProcessed: number;
  avgDaysToComplete: number;
  slaDays: number;
  breachRate: number;
  onTimeCount: number;
  lateCount: number;
}

export interface BottleneckAnalysis {
  serviceId: string;
  serviceName: string;
  agencyId: string;
  agencyName: string;
  frequency: number;
  avgDelayDays: number;
  affectedInvestors: number;
}

export interface SLAOverview {
  totalAgencies: number;
  totalServices: number;
  totalCompletedServices: number;
  overallOnTimePercentage: number;
  totalSLABreaches: number;
  avgCompletionDays: number;
  totalActiveInvestors: number;
}

/**
 * 📈 COMPUTE AGENCY-WISE SLA PERFORMANCE
 * SOURCE: Live pipelines from agencyWorkflowEngine
 */
export function getAgencySLAMetrics(): SLAMetrics[] {
  const pipelines = getAllPipelines(); // 🔌 ENGINE DEPENDENCY

  const agencyMap = new Map<string, {
    agencyId: string;
    agencyName: string;
    total: number;
    completed: number;
    totalDays: number;
    breaches: number;
    active: number;
    slaSum: number;
  }>();

  // Process all steps across all pipelines
  for (const pipeline of pipelines) {
    for (const step of pipeline.approvalSteps) {
      if (!agencyMap.has(step.agencyId)) {
        agencyMap.set(step.agencyId, {
          agencyId: step.agencyId,
          agencyName: step.agencyName,
          total: 0,
          completed: 0,
          totalDays: 0,
          breaches: 0,
          active: 0,
          slaSum: 0,
        });
      }

      const metric = agencyMap.get(step.agencyId)!;
      metric.total++;
      metric.slaSum += step.slaInDays;

      if (step.status === 'approved') {
        metric.completed++;
        metric.totalDays += step.daysElapsed;

        if (step.daysElapsed > step.slaInDays) {
          metric.breaches++;
        }
      } else if (step.status === 'under-review' || step.status === 'documents-pending') {
        metric.active++;
      }
    }
  }

  return Array.from(agencyMap.values()).map(m => ({
    agencyId: m.agencyId,
    agencyName: m.agencyName,
    totalServices: m.total,
    completedServices: m.completed,
    averageCompletionDays: m.completed > 0 ? Math.round(m.totalDays / m.completed) : 0,
    slaBreaches: m.breaches,
    onTimePercentage: m.completed > 0 ? Math.round(((m.completed - m.breaches) / m.completed) * 100) : 100,
    activeServices: m.active,
    avgSLA: m.total > 0 ? Math.round(m.slaSum / m.total) : 0,
  }));
}

/**
 * 📊 COMPUTE SERVICE-WISE SLA PERFORMANCE
 * Groups all instances of the same service across investors
 */
export function getServiceSLAMetrics(): ServiceSLAMetrics[] {
  const pipelines = getAllPipelines(); // 🔌 ENGINE DEPENDENCY

  const serviceMap = new Map<string, {
    serviceId: string;
    serviceName: string;
    agencyName: string;
    slaDays: number;
    totalProcessed: number;
    totalDays: number;
    onTime: number;
    late: number;
  }>();

  for (const pipeline of pipelines) {
    for (const step of pipeline.approvalSteps) {
      if (step.status !== 'approved') continue;

      if (!serviceMap.has(step.serviceId)) {
        serviceMap.set(step.serviceId, {
          serviceId: step.serviceId,
          serviceName: step.serviceName,
          agencyName: step.agencyName,
          slaDays: step.slaInDays,
          totalProcessed: 0,
          totalDays: 0,
          onTime: 0,
          late: 0,
        });
      }

      const metric = serviceMap.get(step.serviceId)!;
      metric.totalProcessed++;
      metric.totalDays += step.daysElapsed;

      if (step.daysElapsed <= step.slaInDays) {
        metric.onTime++;
      } else {
        metric.late++;
      }
    }
  }

  return Array.from(serviceMap.values())
    .map(m => ({
      serviceId: m.serviceId,
      serviceName: m.serviceName,
      agencyName: m.agencyName,
      totalProcessed: m.totalProcessed,
      avgDaysToComplete: m.totalProcessed > 0 ? Math.round(m.totalDays / m.totalProcessed) : 0,
      slaDays: m.slaDays,
      breachRate: m.totalProcessed > 0 ? Math.round((m.late / m.totalProcessed) * 100) : 0,
      onTimeCount: m.onTime,
      lateCount: m.late,
    }))
    .filter(m => m.totalProcessed > 0)
    .sort((a, b) => b.totalProcessed - a.totalProcessed);
}

/**
 * 🚨 IDENTIFY BOTTLENECKS
 * Services that frequently cause delays
 */
export function getBottlenecks(): BottleneckAnalysis[] {
  const pipelines = getAllPipelines(); // 🔌 ENGINE DEPENDENCY

  const bottleneckMap = new Map<string, {
    serviceId: string;
    serviceName: string;
    agencyId: string;
    agencyName: string;
    delays: number;
    totalDelayDays: number;
    investors: Set<string>;
  }>();

  for (const pipeline of pipelines) {
    for (const step of pipeline.approvalSteps) {
      // Consider as bottleneck if: approved but took longer than SLA OR currently under-review with < 3 days left
      const isBottleneck = 
        (step.status === 'approved' && step.daysElapsed > step.slaInDays) ||
        (step.status === 'under-review' && step.daysRemaining < 3);

      if (isBottleneck) {
        if (!bottleneckMap.has(step.serviceId)) {
          bottleneckMap.set(step.serviceId, {
            serviceId: step.serviceId,
            serviceName: step.serviceName,
            agencyId: step.agencyId,
            agencyName: step.agencyName,
            delays: 0,
            totalDelayDays: 0,
            investors: new Set(),
          });
        }

        const metric = bottleneckMap.get(step.serviceId)!;
        metric.delays++;
        metric.investors.add(pipeline.bbid);

        if (step.status === 'approved') {
          metric.totalDelayDays += (step.daysElapsed - step.slaInDays);
        }
      }
    }
  }

  return Array.from(bottleneckMap.values())
    .map(m => ({
      serviceId: m.serviceId,
      serviceName: m.serviceName,
      agencyId: m.agencyId,
      agencyName: m.agencyName,
      frequency: m.delays,
      avgDelayDays: m.delays > 0 ? Math.round(m.totalDelayDays / m.delays) : 0,
      affectedInvestors: m.investors.size,
    }))
    .filter(m => m.frequency > 0)
    .sort((a, b) => b.frequency - a.frequency);
}

/**
 * 📋 OVERALL SLA OVERVIEW
 */
export function getSLAOverview(): SLAOverview {
  const pipelines = getAllPipelines(); // 🔌 ENGINE DEPENDENCY
  const agencyMetrics = getAgencySLAMetrics();

  let totalCompleted = 0;
  let totalBreaches = 0;
  let totalDays = 0;

  for (const metric of agencyMetrics) {
    totalCompleted += metric.completedServices;
    totalBreaches += metric.slaBreaches;
    totalDays += (metric.averageCompletionDays * metric.completedServices);
  }

  return {
    totalAgencies: GOVERNMENT_AGENCIES.length,
    totalServices: agencyMetrics.reduce((sum, m) => sum + m.totalServices, 0),
    totalCompletedServices: totalCompleted,
    overallOnTimePercentage: totalCompleted > 0 
      ? Math.round(((totalCompleted - totalBreaches) / totalCompleted) * 100) 
      : 100,
    totalSLABreaches: totalBreaches,
    avgCompletionDays: totalCompleted > 0 ? Math.round(totalDays / totalCompleted) : 0,
    totalActiveInvestors: pipelines.length,
  };
}

/**
 * 🎯 GET SLA PERFORMANCE FOR SPECIFIC AGENCY
 */
export function getAgencySLAById(agencyId: string): SLAMetrics | null {
  const metrics = getAgencySLAMetrics();
  return metrics.find(m => m.agencyId === agencyId) || null;
}
