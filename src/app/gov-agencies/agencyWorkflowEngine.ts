/**
 * Agency Workflow Engine
 * Rule engine that determines required approvals based on investor profile
 * and generates live approval pipelines
 */

import { 
  GOVERNMENT_AGENCIES, 
  GovernmentAgency, 
  AgencyService, 
  ServiceStatus,
  getServiceById 
} from './agencyRegistry';

export type InvestorType = 'manufacturing' | 'services' | 'trading';

export interface ApprovalStep {
  serviceId: string;
  agencyId: string;
  agencyName: string;
  serviceName: string;
  slaInDays: number;
  status: ServiceStatus;
  startDate: Date | null;
  completionDate: Date | null;
  daysElapsed: number;
  daysRemaining: number;
  requiredDocuments: string[];
  uploadedDocuments: string[];
  prerequisites: string[];
  assignedOfficer: string | null;
  notes: string;
  criticalPath: boolean;
}

export interface ApprovalPipeline {
  investorId: string;
  investorType: InvestorType;
  totalSteps: number;
  completedSteps: number;
  approvalSteps: ApprovalStep[];
  criticalPathSteps: ApprovalStep[];
  estimatedCompletionDays: number;
  actualElapsedDays: number;
  overallProgress: number;
  bbid: string;
  companyName: string;
  sector?: string; // 🎯 SECTOR FIELD for FDI analytics
  countryOfOrigin?: string; // 🌍 COUNTRY for FDI intelligence
  investmentAmount?: number; // 💰 INVESTMENT SIZE for analytics
}

/**
 * Generate required approval pipeline based on investor type
 */
export function generateApprovalPipeline(
  investorId: string,
  investorType: InvestorType,
  sector?: string
): ApprovalPipeline {
  const applicableServices: { agency: GovernmentAgency; service: AgencyService }[] = [];

  // Collect all applicable services
  for (const agency of GOVERNMENT_AGENCIES) {
    for (const service of agency.services) {
      if (
        service.applicableFor.includes('all') ||
        service.applicableFor.includes(investorType)
      ) {
        applicableServices.push({ agency, service });
      }
    }
  }

  // Sort services by prerequisite dependencies (topological sort)
  const sortedServices = topologicalSort(applicableServices);

  // Create approval steps
  const approvalSteps: ApprovalStep[] = sortedServices.map(({ agency, service }) => ({
    serviceId: service.id,
    agencyId: agency.id,
    agencyName: agency.name,
    serviceName: service.name,
    slaInDays: service.slaInDays,
    status: 'not-started' as ServiceStatus,
    startDate: null,
    completionDate: null,
    daysElapsed: 0,
    daysRemaining: service.slaInDays,
    requiredDocuments: service.documents.filter(d => d.required).map(d => d.id),
    uploadedDocuments: [],
    prerequisites: service.prerequisites,
    assignedOfficer: null,
    notes: '',
    criticalPath: agency.criticalPath
  }));

  const criticalPathSteps = approvalSteps.filter(s => s.criticalPath);
  const estimatedDays = calculateEstimatedDays(approvalSteps);

  return {
    investorId,
    investorType,
    totalSteps: approvalSteps.length,
    completedSteps: 0,
    approvalSteps,
    criticalPathSteps,
    estimatedCompletionDays: estimatedDays,
    actualElapsedDays: 0,
    overallProgress: 0,
    bbid: '',
    companyName: '',
    sector: sector
  };
}

/**
 * Topological sort for service dependencies
 */
function topologicalSort(
  services: { agency: GovernmentAgency; service: AgencyService }[]
): { agency: GovernmentAgency; service: AgencyService }[] {
  const sorted: { agency: GovernmentAgency; service: AgencyService }[] = [];
  const visited = new Set<string>();

  function visit(item: { agency: GovernmentAgency; service: AgencyService }) {
    if (visited.has(item.service.id)) return;
    visited.add(item.service.id);

    // Visit prerequisites first
    for (const prereqId of item.service.prerequisites) {
      const prereq = services.find(s => s.service.id === prereqId);
      if (prereq && !visited.has(prereqId)) {
        visit(prereq);
      }
    }

    sorted.push(item);
  }

  for (const service of services) {
    visit(service);
  }

  return sorted;
}

/**
 * Calculate estimated completion days (critical path method)
 */
function calculateEstimatedDays(steps: ApprovalStep[]): number {
  // Build dependency graph
  const stepMap = new Map<string, ApprovalStep>();
  steps.forEach(s => stepMap.set(s.serviceId, s));

  // Calculate earliest finish time for each step
  const earliestFinish = new Map<string, number>();

  function getEarliestFinish(stepId: string): number {
    if (earliestFinish.has(stepId)) {
      return earliestFinish.get(stepId)!;
    }

    const step = stepMap.get(stepId);
    if (!step) return 0;

    let maxPrereqFinish = 0;
    for (const prereqId of step.prerequisites) {
      maxPrereqFinish = Math.max(maxPrereqFinish, getEarliestFinish(prereqId));
    }

    const finish = maxPrereqFinish + step.slaInDays;
    earliestFinish.set(stepId, finish);
    return finish;
  }

  // Calculate for all steps
  let maxFinish = 0;
  for (const step of steps) {
    maxFinish = Math.max(maxFinish, getEarliestFinish(step.serviceId));
  }

  return maxFinish;
}

/**
 * Update step status
 */
export function updateStepStatus(
  pipeline: ApprovalPipeline,
  serviceId: string,
  status: ServiceStatus,
  officer?: string
): ApprovalPipeline {
  const updatedSteps = pipeline.approvalSteps.map(step => {
    if (step.serviceId === serviceId) {
      const now = new Date();
      
      return {
        ...step,
        status,
        startDate: status !== 'not-started' && !step.startDate ? now : step.startDate,
        completionDate: status === 'approved' ? now : null,
        assignedOfficer: officer || step.assignedOfficer,
        daysElapsed: step.startDate 
          ? Math.floor((now.getTime() - step.startDate.getTime()) / (1000 * 60 * 60 * 24))
          : 0,
        daysRemaining: step.startDate
          ? Math.max(0, step.slaInDays - Math.floor((now.getTime() - step.startDate.getTime()) / (1000 * 60 * 60 * 24)))
          : step.slaInDays
      };
    }
    return step;
  });

  const completedSteps = updatedSteps.filter(s => s.status === 'approved').length;
  const overallProgress = (completedSteps / pipeline.totalSteps) * 100;

  // 📜 AUTO-CERTIFICATE GENERATION ON APPROVAL - GAP 2 FIX
  if (status === 'approved') {
    // Lazy import to avoid circular dependencies
    import('../certificates/certificateEngine').then(({ generateCertificate }) => {
      generateCertificate(
        serviceId,
        pipeline.bbid,
        pipeline.companyName,
        {},
        pipeline.investorId
      );
    });
  }

  return {
    ...pipeline,
    approvalSteps: updatedSteps,
    completedSteps,
    overallProgress
  };
}

/**
 * Add uploaded document to step
 */
export function addDocumentToStep(
  pipeline: ApprovalPipeline,
  serviceId: string,
  documentId: string
): ApprovalPipeline {
  const updatedSteps = pipeline.approvalSteps.map(step => {
    if (step.serviceId === serviceId) {
      return {
        ...step,
        uploadedDocuments: [...new Set([...step.uploadedDocuments, documentId])]
      };
    }
    return step;
  });

  return {
    ...pipeline,
    approvalSteps: updatedSteps
  };
}

/**
 * Check if step can start (all prerequisites met)
 */
export function canStepStart(pipeline: ApprovalPipeline, serviceId: string): boolean {
  const step = pipeline.approvalSteps.find(s => s.serviceId === serviceId);
  if (!step) return false;

  for (const prereqId of step.prerequisites) {
    const prereqStep = pipeline.approvalSteps.find(s => s.serviceId === prereqId);
    if (!prereqStep || prereqStep.status !== 'approved') {
      return false;
    }
  }

  return true;
}

/**
 * Get next available steps (prerequisites met, not yet started)
 */
export function getNextAvailableSteps(pipeline: ApprovalPipeline): ApprovalStep[] {
  return pipeline.approvalSteps.filter(step => 
    step.status === 'not-started' && canStepStart(pipeline, step.serviceId)
  );
}

/**
 * Get bottlenecks (steps overdue or nearing SLA breach)
 */
export function getBottlenecks(pipeline: ApprovalPipeline): ApprovalStep[] {
  return pipeline.approvalSteps.filter(step => 
    step.status === 'under-review' && 
    step.daysRemaining < 5
  );
}

/**
 * Get critical path
 */
export function getCriticalPath(pipeline: ApprovalPipeline): ApprovalStep[] {
  return pipeline.approvalSteps.filter(s => s.criticalPath);
}

/**
 * Calculate agency performance metrics
 */
export interface AgencyMetrics {
  agencyId: string;
  agencyName: string;
  totalServices: number;
  completedServices: number;
  averageDaysToComplete: number;
  slaBreaches: number;
  onTimePercentage: number;
}

export function calculateAgencyMetrics(pipelines: ApprovalPipeline[]): AgencyMetrics[] {
  const metrics = new Map<string, {
    agencyId: string;
    agencyName: string;
    total: number;
    completed: number;
    totalDays: number;
    breaches: number;
  }>();

  for (const pipeline of pipelines) {
    for (const step of pipeline.approvalSteps) {
      if (!metrics.has(step.agencyId)) {
        metrics.set(step.agencyId, {
          agencyId: step.agencyId,
          agencyName: step.agencyName,
          total: 0,
          completed: 0,
          totalDays: 0,
          breaches: 0
        });
      }

      const metric = metrics.get(step.agencyId)!;
      metric.total++;

      if (step.status === 'approved') {
        metric.completed++;
        metric.totalDays += step.daysElapsed;
        
        if (step.daysElapsed > step.slaInDays) {
          metric.breaches++;
        }
      }
    }
  }

  return Array.from(metrics.values()).map(m => ({
    agencyId: m.agencyId,
    agencyName: m.agencyName,
    totalServices: m.total,
    completedServices: m.completed,
    averageDaysToComplete: m.completed > 0 ? m.totalDays / m.completed : 0,
    slaBreaches: m.breaches,
    onTimePercentage: m.completed > 0 ? ((m.completed - m.breaches) / m.completed) * 100 : 100
  }));
}

/**
 * Get services by agency
 */
export function getServicesByAgency(agencyId: string): AgencyService[] {
  const agency = GOVERNMENT_AGENCIES.find(a => a.id === agencyId);
  return agency ? agency.services : [];
}

/**
 * Check document completeness for a step
 */
export function isStepDocumentComplete(step: ApprovalStep): boolean {
  return step.requiredDocuments.every(docId => 
    step.uploadedDocuments.includes(docId)
  );
}

/**
 * Get missing documents for a step
 */
export function getMissingDocuments(step: ApprovalStep): string[] {
  return step.requiredDocuments.filter(docId => 
    !step.uploadedDocuments.includes(docId)
  );
}

/**
 * Mock pipeline storage (in production, this would be database)
 */
const pipelineStore = new Map<string, ApprovalPipeline>();

export function savePipeline(pipeline: ApprovalPipeline): void {
  pipelineStore.set(pipeline.investorId, pipeline);
}

export function getPipeline(investorId: string): ApprovalPipeline | undefined {
  return pipelineStore.get(investorId);
}

export function getAllPipelines(): ApprovalPipeline[] {
  return Array.from(pipelineStore.values());
}

// 🎲 MOCK DATA SEEDING FOR FDI INTELLIGENCE
// Pre-populate with 60+ realistic investment projects for demos and presentations
// This makes the FDI Monitor and SLA Dashboard show believable, substantial data

function seedMockFDIData() {
  const sectors = [
    'Technology', 'Manufacturing', 'RMG & Textiles', 'Pharmaceuticals', 
    'Agriculture & Agro-processing', 'Renewable Energy', 'Real Estate & Construction',
    'Healthcare & Medical Devices', 'Food Processing', 'Logistics & Supply Chain',
    'Financial Services', 'Education Technology', 'Automotive Parts', 'Electronics',
    'Chemical & Petrochemical', 'Tourism & Hospitality', 'Telecommunication'
  ];

  const countries = [
    'USA', 'China', 'India', 'Japan', 'South Korea', 'Singapore', 'UAE', 
    'UK', 'Germany', 'Netherlands', 'Malaysia', 'Thailand', 'Australia',
    'Canada', 'France', 'Italy', 'Spain', 'Switzerland', 'Sweden'
  ];

  const companyPrefixes = ['Global', 'Asia', 'Pacific', 'International', 'Eastern', 'Metro', 'Prime', 'United'];
  const companySuffixes = ['Industries', 'Solutions', 'Technologies', 'Enterprises', 'Corporation', 'Group', 'Holdings', 'Limited'];

  const investorTypes: InvestorType[] = ['manufacturing', 'services', 'trading'];

  // Generate 65 mock projects with realistic variety
  for (let i = 1; i <= 65; i++) {
    const sector = sectors[Math.floor(Math.random() * sectors.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const investorType = investorTypes[Math.floor(Math.random() * investorTypes.length)];
    const companyName = `${companyPrefixes[i % companyPrefixes.length]} ${sector.split(' ')[0]} ${companySuffixes[i % companySuffixes.length]}`;
    
    // Investment amounts (varied from $500K to $75M)
    const investmentTiers = [500000, 1000000, 2500000, 5000000, 10000000, 25000000, 50000000, 75000000];
    const investmentAmount = investmentTiers[Math.floor(Math.random() * investmentTiers.length)];

    // Create base pipeline
    const pipeline = generateApprovalPipeline(`investor-${i}`, investorType, sector);
    pipeline.bbid = `BBID${String(i).padStart(6, '0')}`;
    pipeline.companyName = companyName;
    pipeline.sector = sector;
    pipeline.countryOfOrigin = country;
    pipeline.investmentAmount = investmentAmount;

    // Determine completion stage (varied distribution)
    let targetProgress: number;
    if (i <= 25) {
      targetProgress = 100; // 25 completed projects
    } else if (i <= 45) {
      targetProgress = 60 + Math.random() * 35; // 20 near completion (60-95%)
    } else if (i <= 58) {
      targetProgress = 30 + Math.random() * 30; // 13 mid-progress (30-60%)
    } else {
      targetProgress = 5 + Math.random() * 25; // 7 early stage (5-30%)
    }

    // Simulate step completion and timing
    const stepsToComplete = Math.floor((targetProgress / 100) * pipeline.totalSteps);
    
    for (let j = 0; j < stepsToComplete && j < pipeline.approvalSteps.length; j++) {
      const step = pipeline.approvalSteps[j];
      
      // Simulate realistic start dates (projects started over past 12 months)
      const daysAgo = Math.floor(Math.random() * 365);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysAgo);
      
      // Realistic processing time with some variance
      const baseDays = step.slaInDays;
      const variance = Math.random() < 0.7 ? -2 + Math.random() * 4 : 5 + Math.random() * 10; // 70% on-time, 30% delayed
      const actualDays = Math.max(1, Math.floor(baseDays + variance));
      
      const completionDate = new Date(startDate);
      completionDate.setDate(completionDate.getDate() + actualDays);

      step.status = 'approved';
      step.startDate = startDate;
      step.completionDate = completionDate;
      step.daysElapsed = actualDays;
      step.daysRemaining = 0;
      step.assignedOfficer = `Officer-${j % 20 + 1}`;
      step.uploadedDocuments = step.requiredDocuments;
    }

    // Set some steps to in-progress for active projects
    if (targetProgress < 100 && stepsToComplete < pipeline.approvalSteps.length) {
      const inProgressCount = Math.min(2, pipeline.approvalSteps.length - stepsToComplete);
      for (let k = 0; k < inProgressCount; k++) {
        const step = pipeline.approvalSteps[stepsToComplete + k];
        if (step) {
          const startDate = new Date();
          startDate.setDate(startDate.getDate() - Math.floor(Math.random() * step.slaInDays));
          
          step.status = k === 0 ? 'under-review' : 'in-progress';
          step.startDate = startDate;
          step.daysElapsed = Math.floor(Math.random() * step.slaInDays);
          step.daysRemaining = step.slaInDays - step.daysElapsed;
          step.assignedOfficer = `Officer-${(stepsToComplete + k) % 20 + 1}`;
          
          // Some documents uploaded but not all
          const docProgress = Math.random();
          const docsToUpload = Math.floor(step.requiredDocuments.length * docProgress);
          step.uploadedDocuments = step.requiredDocuments.slice(0, docsToUpload);
        }
      }
    }

    // Calculate actual progress
    const completedSteps = pipeline.approvalSteps.filter(s => s.status === 'approved').length;
    pipeline.completedSteps = completedSteps;
    pipeline.overallProgress = (completedSteps / pipeline.totalSteps) * 100;

    // Calculate elapsed days
    const completedWithDates = pipeline.approvalSteps.filter(s => s.status === 'approved' && s.completionDate);
    if (completedWithDates.length > 0) {
      pipeline.actualElapsedDays = completedWithDates.reduce((sum, s) => sum + s.daysElapsed, 0);
    }

    savePipeline(pipeline);
  }

  console.log('✅ Mock FDI data seeded: 65 projects across', sectors.length, 'sectors and', countries.length, 'countries');
}

// Auto-seed on module load (only if store is empty)
if (pipelineStore.size === 0) {
  seedMockFDIData();
}