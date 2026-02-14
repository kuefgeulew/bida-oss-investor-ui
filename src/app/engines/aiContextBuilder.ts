/**
 * 🤖 AI CONTEXT BUILDER — Real GenAI Concierge
 * 
 * Features:
 * - Feeds: incentives, zones, pipeline, compliance, bank status
 * - Builds comprehensive context for AI
 * - Powers intelligent recommendations
 * 
 * Mounted in: AI Intelligence tab (AIChatbot component)
 */

import { autoDetectIncentives, type InvestorProfile } from './incentiveEligibilityEngine';
import { getPlotsForZone, calculatePlotInfrastructureScore } from './zonePlotEngine';
import { getUtilityMetrics } from './utilityUptimeEngine';
import { buildKyaTimeline, getTimelineSummary } from './kyaTimelineEngine';
import { simulateCostModel } from './costModelEngine';

export interface AIContext {
  investor: {
    id: string;
    name: string;
    sector: string;
    investmentAmountUSD: number;
    status: string;
  };
  incentives: {
    eligible: number;
    totalValueBDT: number;
    topIncentives: string[];
  };
  zones: {
    recommended: string[];
    plotsAvailable: number;
    topUtilityScore: number;
  };
  pipeline: {
    totalTasks: number;
    completed: number;
    inProgress: number;
    estimatedCompletion: Date;
    nextActions: string[];
  };
  compliance: {
    status: 'compliant' | 'warning' | 'critical';
    alerts: string[];
    documentsNeeded: string[];
  };
  banking: {
    connected: boolean;
    bankName?: string;
    accountStatus?: string;
    fxServiceAvailable: boolean;
  };
  recommendations: {
    immediate: string[];
    strategic: string[];
    opportunities: string[];
  };
  timestamp: Date;
}

/**
 * Build comprehensive AI context from all engines
 */
export function buildAIContext(investorId: string, investorProfile?: Partial<InvestorProfile>): AIContext {
  // Default investor data (in real app, fetch from database)
  const investor = {
    id: investorId,
    name: 'TechCorp International',
    sector: investorProfile?.sector || 'Manufacturing - Electronics',
    investmentAmountUSD: investorProfile?.investmentAmountUSD || 5000000,
    status: 'active'
  };
  
  // Build full investor profile
  const fullProfile: InvestorProfile = {
    investmentAmountUSD: investor.investmentAmountUSD,
    sector: investor.sector,
    exportOriented: investorProfile?.exportOriented ?? true,
    employeesPlanned: investorProfile?.employeesPlanned || 200,
    location: investorProfile?.location || 'Dhaka EPZ',
    companyType: investorProfile?.companyType || 'foreign'
  };
  
  // Get incentives
  const incentiveResult = autoDetectIncentives(fullProfile);
  const incentives = {
    eligible: incentiveResult.incentiveCount,
    totalValueBDT: incentiveResult.totalSavingsBDT,
    topIncentives: incentiveResult.qualifyingIncentives.slice(0, 5).map(inc => inc.name)
  };
  
  // Get zone recommendations
  const topZones = ['bepza-ez', 'chittagong-epz', 'dhaka-epz'];
  const allPlots = topZones.flatMap(zone => getPlotsForZone(zone));
  const availablePlots = allPlots.filter(p => p.status === 'available');
  
  // Get utility scores
  const utilityScores = topZones.map(zone => {
    const metrics = getUtilityMetrics(zone);
    return metrics?.overallReliabilityScore || 0;
  });
  
  const zones = {
    recommended: topZones,
    plotsAvailable: availablePlots.length,
    topUtilityScore: Math.max(...utilityScores)
  };
  
  // Get pipeline status
  const timeline = buildKyaTimeline();
  const summary = getTimelineSummary(timeline);
  
  const pipeline = {
    totalTasks: summary.totalTasks,
    completed: summary.completed,
    inProgress: summary.inProgress,
    estimatedCompletion: timeline.completionDate,
    nextActions: timeline.tasks
      .filter(t => t.status === 'in-progress' || t.status === 'pending')
      .slice(0, 3)
      .map(t => t.name)
  };
  
  // Compliance status (simplified - in real app, check actual compliance data)
  const compliance = {
    status: 'compliant' as const,
    alerts: [],
    documentsNeeded: ['Audited Financial Statements', 'Board Resolution']
  };
  
  // Banking status (simplified)
  const banking = {
    connected: true,
    bankName: 'Dutch-Bangla Bank',
    accountStatus: 'active',
    fxServiceAvailable: true
  };
  
  // Generate recommendations
  const recommendations = generateRecommendations(
    investor,
    incentives,
    zones,
    pipeline,
    compliance,
    banking
  );
  
  return {
    investor,
    incentives,
    zones,
    pipeline,
    compliance,
    banking,
    recommendations,
    timestamp: new Date()
  };
}

/**
 * Generate intelligent recommendations based on context
 */
function generateRecommendations(
  investor: any,
  incentives: any,
  zones: any,
  pipeline: any,
  compliance: any,
  banking: any
) {
  const immediate: string[] = [];
  const strategic: string[] = [];
  const opportunities: string[] = [];
  
  // Immediate actions
  if (pipeline.inProgress > 0) {
    immediate.push(`Complete ${pipeline.nextActions[0]} to stay on schedule`);
  }
  
  if (compliance.documentsNeeded.length > 0) {
    immediate.push(`Upload ${compliance.documentsNeeded.length} pending documents`);
  }
  
  if (!banking.connected) {
    immediate.push('Connect your bank account for faster processing');
  }
  
  // Strategic recommendations
  if (incentives.eligible > 5) {
    strategic.push(`Apply for ${incentives.eligible} eligible incentives worth BDT ${(incentives.totalValueBDT / 10000000).toFixed(1)}Cr`);
  }
  
  if (zones.plotsAvailable > 10) {
    strategic.push(`Explore ${zones.plotsAvailable} available plots in recommended zones`);
  }
  
  if (investor.investmentAmountUSD >= 5000000) {
    strategic.push('You qualify for fast-track approval process');
  }
  
  // Opportunities
  if (zones.topUtilityScore > 95) {
    opportunities.push('Consider BEPZA-EZ with 99.8% power uptime for manufacturing');
  }
  
  if (investor.sector.includes('Electronics') || investor.sector.includes('IT')) {
    opportunities.push('Hi-Tech Park offers additional tax incentives for tech companies');
  }
  
  opportunities.push('Schedule meeting with BIDA relationship manager for personalized guidance');
  
  return {
    immediate,
    strategic,
    opportunities
  };
}

/**
 * Get context for specific query types
 */
export function getContextForQuery(query: string, context: AIContext): string {
  const queryLower = query.toLowerCase();
  
  // Incentive queries
  if (queryLower.includes('incentive') || queryLower.includes('tax') || queryLower.includes('benefit')) {
    return `You are eligible for ${context.incentives.eligible} incentives totaling BDT ${(context.incentives.totalValueBDT / 10000000).toFixed(1)} Crore. Top incentives include: ${context.incentives.topIncentives.join(', ')}. Your ${context.investor.sector} sector in ${context.investor.investmentAmountUSD >= 5000000 ? 'large-scale' : 'medium-scale'} investment qualifies for special benefits.`;
  }
  
  // Zone queries
  if (queryLower.includes('zone') || queryLower.includes('location') || queryLower.includes('plot')) {
    return `We recommend ${context.zones.recommended.length} zones for your sector. There are ${context.zones.plotsAvailable} plots available with infrastructure scores up to ${context.zones.topUtilityScore.toFixed(1)}/100. Our top recommendation has ${context.zones.topUtilityScore.toFixed(1)}% utility reliability.`;
  }
  
  // Timeline/approval queries
  if (queryLower.includes('timeline') || queryLower.includes('approval') || queryLower.includes('how long')) {
    return `Your approval process has ${context.pipeline.totalTasks} tasks. ${context.pipeline.completed} completed, ${context.pipeline.inProgress} in progress. Estimated completion: ${context.pipeline.estimatedCompletion.toLocaleDateString()}. Next actions: ${context.pipeline.nextActions.join(', ')}.`;
  }
  
  // Compliance queries
  if (queryLower.includes('document') || queryLower.includes('compliance') || queryLower.includes('requirement')) {
    return `Your compliance status is ${context.compliance.status}. Documents needed: ${context.compliance.documentsNeeded.join(', ')}. ${context.compliance.alerts.length} alerts require attention.`;
  }
  
  // Banking queries
  if (queryLower.includes('bank') || queryLower.includes('payment') || queryLower.includes('fx')) {
    return context.banking.connected 
      ? `Your ${context.banking.bankName} account is ${context.banking.accountStatus}. FX conversion ${context.banking.fxServiceAvailable ? 'is available' : 'coming soon'}.`
      : 'No bank account connected. Connect your account for faster payments and FX services.';
  }
  
  // General context
  return `Investment: $${context.investor.investmentAmountUSD.toLocaleString()} in ${context.investor.sector}. ${context.incentives.eligible} incentives available. ${context.pipeline.completed}/${context.pipeline.totalTasks} approvals complete. ${context.zones.plotsAvailable} plots available.`;
}

/**
 * Get recommended actions based on context
 */
export function getRecommendedActions(context: AIContext): Array<{
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}> {
  const actions = [];
  
  // High priority
  if (context.pipeline.inProgress > 0) {
    actions.push({
      title: 'Complete Pending Approvals',
      description: `${context.pipeline.inProgress} approvals in progress`,
      action: 'view_pipeline',
      priority: 'high' as const
    });
  }
  
  if (context.compliance.documentsNeeded.length > 0) {
    actions.push({
      title: 'Upload Required Documents',
      description: `${context.compliance.documentsNeeded.length} documents needed`,
      action: 'upload_documents',
      priority: 'high' as const
    });
  }
  
  // Medium priority
  if (context.incentives.eligible > 0) {
    actions.push({
      title: 'Apply for Incentives',
      description: `${context.incentives.eligible} incentives worth BDT ${(context.incentives.totalValueBDT / 10000000).toFixed(1)}Cr`,
      action: 'view_incentives',
      priority: 'medium' as const
    });
  }
  
  if (context.zones.plotsAvailable > 0) {
    actions.push({
      title: 'Explore Available Plots',
      description: `${context.zones.plotsAvailable} plots in recommended zones`,
      action: 'view_zones',
      priority: 'medium' as const
    });
  }
  
  // Low priority
  actions.push({
    title: 'Schedule RM Meeting',
    description: 'Get personalized guidance from BIDA expert',
    action: 'book_meeting',
    priority: 'low' as const
  });
  
  return actions;
}