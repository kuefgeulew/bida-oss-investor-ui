// Historical Case Database for Similar Cases & Precedents

export interface HistoricalCase {
  id: string;
  sector: string;
  investmentAmount: number;
  country: string;
  zone: string;
  submittedDate: string;
  approvalDate: string | null;
  status: 'approved' | 'rejected' | 'conditional' | 'withdrawn';
  processingDays: number;
  conditions?: string[];
  rejectionReason?: string;
  complexityScore: number;
  riskScore: number;
  officer: string;
}

export const historicalCases: HistoricalCase[] = [
  {
    id: 'CASE-2025-001',
    sector: 'Textile & Garment',
    investmentAmount: 5000000,
    country: 'China',
    zone: 'BEPZA',
    submittedDate: '2025-01-15',
    approvalDate: '2025-03-20',
    status: 'approved',
    processingDays: 64,
    complexityScore: 6.2,
    riskScore: 28,
    officer: 'Rahman, A.'
  },
  {
    id: 'CASE-2025-002',
    sector: 'Textile & Garment',
    investmentAmount: 4800000,
    country: 'South Korea',
    zone: 'BEPZA',
    submittedDate: '2025-02-01',
    approvalDate: '2025-03-25',
    status: 'approved',
    processingDays: 52,
    complexityScore: 5.8,
    riskScore: 15,
    officer: 'Khan, M.'
  },
  {
    id: 'CASE-2025-003',
    sector: 'Textile & Garment',
    investmentAmount: 6200000,
    country: 'India',
    zone: 'BEZA',
    submittedDate: '2025-02-10',
    approvalDate: null,
    status: 'rejected',
    processingDays: 45,
    rejectionReason: 'Incomplete environmental impact assessment',
    complexityScore: 6.5,
    riskScore: 32,
    officer: 'Ahmed, S.'
  },
  {
    id: 'CASE-2024-156',
    sector: 'Pharmaceutical',
    investmentAmount: 12000000,
    country: 'United States',
    zone: 'BHTPA',
    submittedDate: '2024-11-01',
    approvalDate: '2025-02-15',
    status: 'approved',
    processingDays: 106,
    conditions: ['Annual GMP audit required', 'Quality control officer must be PhD holder'],
    complexityScore: 8.5,
    riskScore: 12,
    officer: 'Chowdhury, R.'
  },
  {
    id: 'CASE-2024-178',
    sector: 'Pharmaceutical',
    investmentAmount: 15000000,
    country: 'Switzerland',
    zone: 'BHTPA',
    submittedDate: '2024-12-01',
    approvalDate: '2025-03-10',
    status: 'conditional',
    processingDays: 99,
    conditions: ['Drug Administration quarterly reporting', 'Local partner required (30% equity)'],
    complexityScore: 8.8,
    riskScore: 8,
    officer: 'Hossain, F.'
  },
  {
    id: 'CASE-2025-015',
    sector: 'Food Processing',
    investmentAmount: 3000000,
    country: 'Thailand',
    zone: 'BSCIC',
    submittedDate: '2025-01-20',
    approvalDate: '2025-03-15',
    status: 'approved',
    processingDays: 54,
    complexityScore: 5.5,
    riskScore: 18,
    officer: 'Islam, N.'
  },
  {
    id: 'CASE-2025-018',
    sector: 'IT & Software',
    investmentAmount: 800000,
    country: 'United States',
    zone: 'BHTPA',
    submittedDate: '2025-02-05',
    approvalDate: '2025-02-28',
    status: 'approved',
    processingDays: 23,
    complexityScore: 2.5,
    riskScore: 8,
    officer: 'Karim, T.'
  },
  {
    id: 'CASE-2025-022',
    sector: 'Manufacturing',
    investmentAmount: 7500000,
    country: 'Japan',
    zone: 'BEZA',
    submittedDate: '2025-01-10',
    approvalDate: '2025-03-18',
    status: 'approved',
    processingDays: 67,
    complexityScore: 6.8,
    riskScore: 10,
    officer: 'Rahman, A.'
  },
  {
    id: 'CASE-2024-198',
    sector: 'Real Estate',
    investmentAmount: 25000000,
    country: 'UAE',
    zone: 'General',
    submittedDate: '2024-10-15',
    approvalDate: null,
    status: 'rejected',
    processingDays: 90,
    rejectionReason: 'Source of funds not adequately documented, high AML risk',
    complexityScore: 7.2,
    riskScore: 68,
    officer: 'Ahmed, S.'
  },
  {
    id: 'CASE-2025-030',
    sector: 'Chemical',
    investmentAmount: 9000000,
    country: 'Germany',
    zone: 'BEZA',
    submittedDate: '2025-02-20',
    approvalDate: null,
    status: 'conditional',
    processingDays: 42,
    conditions: ['Environmental monitoring system required', 'Hazardous waste management plan approval'],
    complexityScore: 7.5,
    riskScore: 22,
    officer: 'Khan, M.'
  }
];

// Find similar cases based on sector, investment size, and country
export function findSimilarCases(application: any, limit: number = 5): HistoricalCase[] {
  const sector = application.sector;
  const amount = application.investmentAmount || 0;
  const country = application.country;
  
  // Score similarity
  const scoredCases = historicalCases.map(c => {
    let score = 0;
    
    // Sector match (highest weight)
    if (c.sector === sector) score += 50;
    
    // Investment amount similarity (within 50%)
    const amountDiff = Math.abs(c.investmentAmount - amount) / amount;
    if (amountDiff < 0.5) score += 30 * (1 - amountDiff);
    
    // Country match
    if (c.country === country) score += 20;
    
    // Recent cases score higher
    const daysOld = (new Date().getTime() - new Date(c.submittedDate).getTime()) / (1000 * 60 * 60 * 24);
    if (daysOld < 90) score += 10;
    else if (daysOld < 180) score += 5;
    
    return { case: c, score };
  });
  
  // Sort by score and return top matches
  return scoredCases
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.case);
}

// Get approval rate for similar cases
export function getApprovalRate(sector: string): number {
  const sectorCases = historicalCases.filter(c => c.sector === sector);
  if (sectorCases.length === 0) return 0;
  
  const approved = sectorCases.filter(c => c.status === 'approved' || c.status === 'conditional').length;
  return Math.round((approved / sectorCases.length) * 100);
}

// Get average processing time for sector
export function getAverageProcessingTime(sector: string): number {
  const sectorCases = historicalCases.filter(c => c.sector === sector && c.processingDays > 0);
  if (sectorCases.length === 0) return 60; // default
  
  const total = sectorCases.reduce((sum, c) => sum + c.processingDays, 0);
  return Math.round(total / sectorCases.length);
}

// Get common conditions for sector
export function getCommonConditions(sector: string): string[] {
  const sectorCases = historicalCases.filter(c => 
    c.sector === sector && c.conditions && c.conditions.length > 0
  );
  
  const allConditions = sectorCases.flatMap(c => c.conditions || []);
  
  // Count frequency
  const conditionCount = allConditions.reduce((acc, cond) => {
    acc[cond] = (acc[cond] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Return conditions that appear in >30% of cases
  const threshold = sectorCases.length * 0.3;
  return Object.entries(conditionCount)
    .filter(([, count]) => count >= threshold)
    .map(([cond]) => cond);
}

// Get common rejection reasons for sector
export function getCommonRejectionReasons(sector: string): string[] {
  const rejectedCases = historicalCases.filter(c => 
    c.sector === sector && c.status === 'rejected' && c.rejectionReason
  );
  
  return Array.from(new Set(rejectedCases.map(c => c.rejectionReason!))).slice(0, 5);
}
