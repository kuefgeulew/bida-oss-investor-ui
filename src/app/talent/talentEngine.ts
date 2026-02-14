// 🧑‍💼 TALENT ENGINE — Workforce & Skill Recommendation System
// ARCHITECTURE: AI-driven talent pool matching based on sector and approvals
// SOURCE: Links to agencyWorkflowEngine (work permits) + visa quotas
// MOUNT: VisaAndWorkforce.tsx + HR modules

/**
 * 🎯 TALENT RECOMMENDATION INTERFACE
 */
export interface TalentRecommendation {
  id: string;
  name: string;
  country: string;
  position: string;
  skillset: string[];
  experience: string;
  qualification: string;
  language: string[];
  availability: 'immediate' | 'within-30-days' | 'within-60-days';
  estimatedSalary: string;
  matchScore: number; // 0-100
}

/**
 * 🗂️ TALENT POOL DATABASE
 * Pre-qualified candidates for Bangladesh FDI sectors
 */
const TALENT_POOL: TalentRecommendation[] = [
  // Manufacturing Sector
  {
    id: 'talent-001',
    name: 'Dr. Chen Wei',
    country: 'China',
    position: 'Manufacturing Operations Director',
    skillset: ['Lean Manufacturing', 'Six Sigma', 'Quality Control', 'Supply Chain'],
    experience: '15+ years in textile manufacturing',
    qualification: 'PhD Industrial Engineering',
    language: ['English', 'Chinese', 'Bengali (Basic)'],
    availability: 'within-30-days',
    estimatedSalary: '$4,500-6,000/month',
    matchScore: 95
  },
  {
    id: 'talent-002',
    name: 'Rajesh Kumar',
    country: 'India',
    position: 'Production Manager',
    skillset: ['Garment Production', 'Team Management', 'Process Optimization'],
    experience: '10 years in RMG sector',
    qualification: 'MBA Operations Management',
    language: ['English', 'Hindi', 'Bengali'],
    availability: 'immediate',
    estimatedSalary: '$2,500-3,500/month',
    matchScore: 88
  },
  
  // IT/Software Sector
  {
    id: 'talent-003',
    name: 'Sarah Johnson',
    country: 'United States',
    position: 'Chief Technology Officer',
    skillset: ['Cloud Architecture', 'DevOps', 'Team Leadership', 'AI/ML'],
    experience: '12 years in tech startups',
    qualification: 'MS Computer Science',
    language: ['English'],
    availability: 'within-60-days',
    estimatedSalary: '$7,000-10,000/month',
    matchScore: 92
  },
  {
    id: 'talent-004',
    name: 'Kim Min-jun',
    country: 'South Korea',
    position: 'Senior Software Architect',
    skillset: ['System Design', 'Microservices', 'React', 'Node.js'],
    experience: '8 years in fintech',
    qualification: 'BS Software Engineering',
    language: ['English', 'Korean'],
    availability: 'within-30-days',
    estimatedSalary: '$5,000-7,000/month',
    matchScore: 90
  },

  // Pharmaceutical Sector
  {
    id: 'talent-005',
    name: 'Dr. Hans Mueller',
    country: 'Germany',
    position: 'Quality Assurance Director',
    skillset: ['GMP Compliance', 'Quality Systems', 'Regulatory Affairs', 'Validation'],
    experience: '18 years pharmaceutical industry',
    qualification: 'PhD Pharmaceutical Sciences',
    language: ['English', 'German'],
    availability: 'within-60-days',
    estimatedSalary: '$6,500-8,500/month',
    matchScore: 96
  },
  {
    id: 'talent-006',
    name: 'Priya Sharma',
    country: 'India',
    position: 'Regulatory Affairs Manager',
    skillset: ['Drug Registration', 'WHO-GMP', 'Documentation', 'Compliance'],
    experience: '9 years in pharma regulatory',
    qualification: 'M.Pharm Regulatory Affairs',
    language: ['English', 'Hindi'],
    availability: 'immediate',
    estimatedSalary: '$3,000-4,000/month',
    matchScore: 87
  },

  // Agriculture/Food Processing
  {
    id: 'talent-007',
    name: 'Maria Santos',
    country: 'Philippines',
    position: 'Food Safety Manager',
    skillset: ['HACCP', 'Food Safety', 'Quality Assurance', 'ISO 22000'],
    experience: '11 years in food processing',
    qualification: 'BS Food Technology',
    language: ['English', 'Filipino'],
    availability: 'within-30-days',
    estimatedSalary: '$2,800-3,800/month',
    matchScore: 85
  },

  // Construction/Infrastructure
  {
    id: 'talent-008',
    name: 'Ahmed Al-Rashid',
    country: 'UAE',
    position: 'Project Director',
    skillset: ['Project Management', 'Civil Engineering', 'Cost Control', 'Safety'],
    experience: '14 years in infrastructure projects',
    qualification: 'MSc Civil Engineering, PMP',
    language: ['English', 'Arabic'],
    availability: 'within-60-days',
    estimatedSalary: '$5,500-7,500/month',
    matchScore: 91
  },

  // Finance/Accounting
  {
    id: 'talent-009',
    name: 'Emily Chen',
    country: 'Singapore',
    position: 'Chief Financial Officer',
    skillset: ['Financial Planning', 'Tax Strategy', 'Compliance', 'FDI Structuring'],
    experience: '13 years in multinational corporations',
    qualification: 'CPA, MBA Finance',
    language: ['English', 'Chinese'],
    availability: 'within-30-days',
    estimatedSalary: '$6,000-8,000/month',
    matchScore: 94
  },

  // Technical/Engineering
  {
    id: 'talent-010',
    name: 'Takeshi Yamamoto',
    country: 'Japan',
    position: 'Automation Engineer',
    skillset: ['Industrial Automation', 'PLC Programming', 'Robotics', 'SCADA'],
    experience: '10 years in manufacturing automation',
    qualification: 'MS Electrical Engineering',
    language: ['English', 'Japanese'],
    availability: 'within-30-days',
    estimatedSalary: '$5,000-6,500/month',
    matchScore: 89
  }
];

/**
 * 🎯 SECTOR MAPPING
 * Links business sectors to required skill categories
 */
const SECTOR_SKILL_MAP: Record<string, string[]> = {
  'manufacturing': ['Lean Manufacturing', 'Quality Control', 'Production Management', 'Supply Chain'],
  'textile': ['Garment Production', 'Quality Control', 'Lean Manufacturing'],
  'pharmaceutical': ['GMP Compliance', 'Quality Systems', 'Regulatory Affairs', 'Validation'],
  'it': ['Cloud Architecture', 'Software Development', 'DevOps', 'System Design'],
  'software': ['System Design', 'Microservices', 'Team Leadership'],
  'agriculture': ['HACCP', 'Food Safety', 'Quality Assurance'],
  'food-processing': ['Food Safety', 'HACCP', 'Quality Assurance'],
  'construction': ['Project Management', 'Civil Engineering', 'Safety'],
  'infrastructure': ['Project Management', 'Cost Control'],
  'finance': ['Financial Planning', 'Tax Strategy', 'Compliance']
};

/**
 * 🔍 RECOMMEND TALENT BASED ON SECTOR & QUOTA
 * 🔌 ENGINE CONNECTION: agencyWorkflowEngine provides approved work permits
 */
export function recommendTalent(
  sector: string,
  approvedWorkPermits: number = 0,
  requiredPositions?: string[]
): TalentRecommendation[] {
  if (!sector) {
    sector = 'Technology'; // Default sector if undefined
  }
  const sectorLower = sector.toLowerCase();
  const relevantSkills = SECTOR_SKILL_MAP[sectorLower] || [];
  
  // Filter talent pool by sector relevance
  let recommendations = TALENT_POOL.filter(talent => {
    // Check if talent has any required skills
    const hasRelevantSkills = relevantSkills.some(skill => 
      talent.skillset.some(ts => ts.toLowerCase().includes(skill.toLowerCase()))
    );
    
    // Check if position matches requirements
    const matchesPosition = requiredPositions 
      ? requiredPositions.some(pos => talent.position.toLowerCase().includes(pos.toLowerCase()))
      : true;
    
    return hasRelevantSkills && matchesPosition;
  });

  // Sort by match score
  recommendations.sort((a, b) => b.matchScore - a.matchScore);

  // Limit recommendations based on quota
  // If you have 5 approved work permits, show top 5-8 candidates
  const maxRecommendations = approvedWorkPermits > 0 
    ? Math.min(approvedWorkPermits + 3, 10)
    : 5;

  return recommendations.slice(0, maxRecommendations);
}

/**
 * 📊 GET TALENT STATISTICS
 */
export function getTalentPoolStats() {
  const byCountry = TALENT_POOL.reduce((acc, talent) => {
    acc[talent.country] = (acc[talent.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byAvailability = TALENT_POOL.reduce((acc, talent) => {
    acc[talent.availability] = (acc[talent.availability] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: TALENT_POOL.length,
    byCountry,
    byAvailability,
    averageMatchScore: Math.round(
      TALENT_POOL.reduce((sum, t) => sum + t.matchScore, 0) / TALENT_POOL.length
    )
  };
}

/**
 * 🔎 GET TALENT BY ID
 */
export function getTalentById(id: string): TalentRecommendation | undefined {
  return TALENT_POOL.find(t => t.id === id);
}

/**
 * 🔍 SEARCH TALENT BY KEYWORD
 */
export function searchTalent(keyword: string): TalentRecommendation[] {
  const lowerKeyword = keyword.toLowerCase();
  
  return TALENT_POOL.filter(talent => 
    talent.name.toLowerCase().includes(lowerKeyword) ||
    talent.position.toLowerCase().includes(lowerKeyword) ||
    talent.country.toLowerCase().includes(lowerKeyword) ||
    talent.skillset.some(skill => skill.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * 🌍 GET TALENT BY COUNTRY
 */
export function getTalentByCountry(country: string): TalentRecommendation[] {
  return TALENT_POOL.filter(t => 
    t.country.toLowerCase() === country.toLowerCase()
  );
}

/**
 * 💼 GET TALENT BY POSITION CATEGORY
 */
export function getTalentByCategory(category: 'management' | 'technical' | 'specialized'): TalentRecommendation[] {
  const categoryKeywords = {
    management: ['director', 'manager', 'chief', 'head'],
    technical: ['engineer', 'architect', 'specialist'],
    specialized: ['phd', 'doctor', 'consultant', 'expert']
  };

  const keywords = categoryKeywords[category] || [];
  
  return TALENT_POOL.filter(talent => 
    keywords.some(kw => talent.position.toLowerCase().includes(kw))
  );
}