// Bottleneck Intelligence Analyzer - Identifies system delay points

export interface BottleneckData {
  agencyHeatmap: AgencyBottleneck[];
  topDelayStages: DelayStage[];
  impactAnalysis: ImpactAnalysis;
}

export interface AgencyBottleneck {
  agency: string;
  avgDelay: number;
  cases: number;
  slaCompliance: number;
  stages: { stage: string; avgDays: number }[];
}

export interface DelayStage {
  stage: string;
  avgDelay: number;
  cases: number;
  agency: string;
  trend: 'improving' | 'stable' | 'worsening';
}

export interface ImpactAnalysis {
  totalDaysLost: number;
  estimatedFDILost: number; // USD
  potentialSavings: { stage: string; days: number; fdiValue: number }[];
}

const STAGE_NAMES: { [key: string]: string } = {
  rjsc: 'RJSC Company Registration',
  nbr: 'NBR Tax Registration',
  bangladeshBank: 'Bangladesh Bank FX Approval',
  environment: 'Environmental Clearance',
  fire: 'Fire Safety License',
  drugAdmin: 'Drug Administration',
  bida_initial: 'BIDA Initial Review',
  bida_final: 'BIDA Final Approval'
};

const SLA_STANDARDS: { [key: string]: number } = {
  rjsc: 15,
  nbr: 10,
  bangladeshBank: 15,
  environment: 20,
  fire: 10,
  drugAdmin: 30,
  bida_initial: 7,
  bida_final: 5
};

export function analyzeBottlenecks(applications: any[]): BottleneckData {
  const agencyData: { [key: string]: { delays: number[]; stages: { [stage: string]: number[] } } } = {};
  const stageData: { [key: string]: { delays: number[]; agency: string } } = {};
  
  // Collect data from applications
  applications.forEach(app => {
    if (app.approvals) {
      Object.entries(app.approvals).forEach(([stage, status]) => {
        if (status !== 'not_required' && status !== 'not_started') {
          const agency = getAgencyFromStage(stage);
          const delay = app.stageDurations?.[stage] || (Math.random() * 25 + 5); // Mock if not present
          
          // Agency data
          if (!agencyData[agency]) {
            agencyData[agency] = { delays: [], stages: {} };
          }
          agencyData[agency].delays.push(delay);
          
          if (!agencyData[agency].stages[stage]) {
            agencyData[agency].stages[stage] = [];
          }
          agencyData[agency].stages[stage].push(delay);
          
          // Stage data
          const stageName = STAGE_NAMES[stage] || stage;
          if (!stageData[stageName]) {
            stageData[stageName] = { delays: [], agency };
          }
          stageData[stageName].delays.push(delay);
        }
      });
    }
  });
  
  // Build agency heatmap
  const agencyHeatmap: AgencyBottleneck[] = Object.entries(agencyData).map(([agency, data]) => {
    const avgDelay = data.delays.reduce((a, b) => a + b, 0) / data.delays.length;
    const cases = data.delays.length;
    
    // Calculate SLA compliance
    const slaCompliantCount = data.delays.filter(d => {
      const stage = Object.keys(data.stages).find(s => data.stages[s].includes(d));
      const sla = stage ? SLA_STANDARDS[stage] : 15;
      return d <= sla;
    }).length;
    const slaCompliance = (slaCompliantCount / data.delays.length) * 100;
    
    // Stage breakdown
    const stages = Object.entries(data.stages).map(([stage, delays]) => ({
      stage: STAGE_NAMES[stage] || stage,
      avgDays: Math.round(delays.reduce((a, b) => a + b, 0) / delays.length)
    })).sort((a, b) => b.avgDays - a.avgDays);
    
    return { agency, avgDelay: Math.round(avgDelay), cases, slaCompliance: Math.round(slaCompliance), stages };
  }).sort((a, b) => b.avgDelay - a.avgDelay);
  
  // Build top delay stages
  const topDelayStages: DelayStage[] = Object.entries(stageData)
    .map(([stage, data]) => {
      const avgDelay = data.delays.reduce((a, b) => a + b, 0) / data.delays.length;
      const cases = data.delays.length;
      
      // Determine trend (mock logic)
      const recentDelays = data.delays.slice(-5);
      const olderDelays = data.delays.slice(0, 5);
      const recentAvg = recentDelays.reduce((a, b) => a + b, 0) / recentDelays.length;
      const olderAvg = olderDelays.reduce((a, b) => a + b, 0) / olderDelays.length;
      
      let trend: 'improving' | 'stable' | 'worsening' = 'stable';
      if (recentAvg < olderAvg * 0.85) trend = 'improving';
      if (recentAvg > olderAvg * 1.15) trend = 'worsening';
      
      return {
        stage,
        avgDelay: Math.round(avgDelay),
        cases,
        agency: data.agency,
        trend
      };
    })
    .sort((a, b) => b.avgDelay - a.avgDelay)
    .slice(0, 5);
  
  // Impact analysis
  const totalDaysLost = applications.reduce((sum, app) => {
    if (app.submittedDate && app.status !== 'rejected') {
      const submitted = new Date(app.submittedDate);
      const now = new Date();
      const actualDays = (now.getTime() - submitted.getTime()) / (1000 * 60 * 60 * 24);
      const expectedDays = 60; // Standard timeline
      return sum + Math.max(0, actualDays - expectedDays);
    }
    return sum;
  }, 0);
  
  // Estimate FDI lost due to delays (conservative: 5% of delayed pipeline)
  const delayedPipeline = applications
    .filter(app => app.status === 'pending' || app.status === 'under_review')
    .reduce((sum, app) => sum + (app.investmentAmount || 0), 0);
  const estimatedFDILost = delayedPipeline * 0.05;
  
  // Potential savings if top stages fixed
  const potentialSavings = topDelayStages.slice(0, 3).map(stage => {
    const slaTarget = Object.values(SLA_STANDARDS).reduce((a, b) => a + b, 0) / Object.keys(SLA_STANDARDS).length;
    const savableDays = Math.max(0, stage.avgDelay - slaTarget);
    
    // Calculate affected value based on stage occurrences
    const stageKey = Object.keys(STAGE_NAMES).find(key => STAGE_NAMES[key] === stage.stage);
    const affectedApps = applications.filter(app => {
      if (!app.approvals) return false;
      // Check if this stage exists and is active/pending in this application
      const stageStatus = app.approvals[stageKey || ''];
      return stageStatus && stageStatus !== 'not_required' && stageStatus !== 'approved';
    });
    
    const affectedValue = affectedApps.reduce((sum, app) => sum + (app.investmentAmount || 0), 0);
    // If no active cases, use average investment value × number of cases for projection
    const fdiValue = affectedValue > 0 
      ? affectedValue * 0.15  // 15% retention improvement for actual affected cases
      : (applications.reduce((sum, app) => sum + (app.investmentAmount || 0), 0) / applications.length) * stage.cases * 0.12; // 12% for projected impact
    
    return {
      stage: stage.stage,
      days: Math.round(savableDays),
      fdiValue: Math.round(fdiValue)
    };
  });
  
  return {
    agencyHeatmap,
    topDelayStages,
    impactAnalysis: {
      totalDaysLost: Math.round(totalDaysLost),
      estimatedFDILost,
      potentialSavings
    }
  };
}

function getAgencyFromStage(stage: string): string {
  const mapping: { [key: string]: string } = {
    rjsc: 'RJSC',
    nbr: 'NBR',
    bangladeshBank: 'Bangladesh Bank',
    environment: 'DoE',
    fire: 'Fire Service',
    drugAdmin: 'Drug Admin',
    bida_initial: 'BIDA',
    bida_final: 'BIDA'
  };
  return mapping[stage] || 'Unknown';
}