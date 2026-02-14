// 🤝 RM REGISTRY — Maps sectors to dedicated Relationship Managers
// ARCHITECTURE: Read-only data layer. Defines RM assignments by sector/region.

export interface RelationshipManager {
  rmId: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  whatsapp: string;
  specialization: string[];
  languages: string[];
  sectors: string[]; // Sectors they handle
  regions?: string[]; // Optional geographic coverage
  availability: 'online' | 'offline' | 'busy';
  responseTime: string; // Average response time
  photo?: string;
}

/**
 * 🏛️ RELATIONSHIP MANAGER ROSTER
 * Government officers assigned to support investors by sector/region
 */
export const relationshipManagers: RelationshipManager[] = [
  {
    rmId: 'rm-001',
    name: 'Dr. Farida Rahman',
    title: 'Senior Investment Officer - Manufacturing',
    email: 'farida.rahman@bida.gov.bd',
    phone: '+880-2-9559171',
    whatsapp: '+880-1711-123456',
    specialization: ['Textiles & RMG', 'Pharmaceuticals', 'Food Processing'],
    languages: ['Bengali', 'English', 'Hindi'],
    sectors: ['Textiles & RMG', 'Pharmaceuticals', 'Food & Beverages', 'Manufacturing'],
    regions: ['Dhaka', 'Gazipur', 'Narayanganj'],
    availability: 'online',
    responseTime: '< 2 hours',
    photo: '/images/rm/farida.jpg'
  },
  {
    rmId: 'rm-002',
    name: 'Mr. Kamal Hossain',
    title: 'Investment Officer - Technology & IT',
    email: 'kamal.hossain@bida.gov.bd',
    phone: '+880-2-9559172',
    whatsapp: '+880-1711-234567',
    specialization: ['IT/ITES', 'Software Development', 'Startups'],
    languages: ['Bengali', 'English'],
    sectors: ['Information Technology', 'Software & IT Services', 'E-commerce', 'Fintech'],
    regions: ['Dhaka', 'Chittagong'],
    availability: 'online',
    responseTime: '< 3 hours',
    photo: '/images/rm/kamal.jpg'
  },
  {
    rmId: 'rm-003',
    name: 'Ms. Ayesha Siddique',
    title: 'Investment Officer - Infrastructure & Real Estate',
    email: 'ayesha.siddique@bida.gov.bd',
    phone: '+880-2-9559173',
    whatsapp: '+880-1711-345678',
    specialization: ['Infrastructure', 'Construction', 'Real Estate'],
    languages: ['Bengali', 'English', 'Urdu'],
    sectors: ['Infrastructure', 'Construction', 'Real Estate', 'Power & Energy'],
    regions: ['Dhaka', 'Sylhet', 'Khulna'],
    availability: 'online',
    responseTime: '< 4 hours',
    photo: '/images/rm/ayesha.jpg'
  },
  {
    rmId: 'rm-004',
    name: 'Mr. Rafiq Ahmed',
    title: 'Investment Officer - Export Processing Zones',
    email: 'rafiq.ahmed@bida.gov.bd',
    phone: '+880-2-9559174',
    whatsapp: '+880-1711-456789',
    specialization: ['EPZ Operations', 'Export-Oriented Manufacturing', 'Logistics'],
    languages: ['Bengali', 'English', 'Chinese'],
    sectors: ['EPZ Manufacturing', 'Logistics', 'Export Trading'],
    regions: ['Chittagong', 'Mongla', 'Dhaka'],
    availability: 'online',
    responseTime: '< 2 hours',
    photo: '/images/rm/rafiq.jpg'
  },
  {
    rmId: 'rm-005',
    name: 'Dr. Nusrat Jahan',
    title: 'Senior Investment Officer - Healthcare & Education',
    email: 'nusrat.jahan@bida.gov.bd',
    phone: '+880-2-9559175',
    whatsapp: '+880-1711-567890',
    specialization: ['Healthcare', 'Medical Devices', 'Education', 'Skill Development'],
    languages: ['Bengali', 'English', 'Arabic'],
    sectors: ['Healthcare', 'Pharmaceuticals', 'Education', 'Medical Devices'],
    regions: ['Dhaka', 'Rajshahi', 'Khulna'],
    availability: 'online',
    responseTime: '< 3 hours',
    photo: '/images/rm/nusrat.jpg'
  },
  {
    rmId: 'rm-006',
    name: 'Mr. Imran Khan',
    title: 'Investment Officer - Agro & Food Processing',
    email: 'imran.khan@bida.gov.bd',
    phone: '+880-2-9559176',
    whatsapp: '+880-1711-678901',
    specialization: ['Agriculture', 'Food Processing', 'Fisheries'],
    languages: ['Bengali', 'English'],
    sectors: ['Agriculture', 'Food & Beverages', 'Fisheries', 'Livestock'],
    regions: ['Khulna', 'Barisal', 'Rajshahi'],
    availability: 'online',
    responseTime: '< 4 hours',
    photo: '/images/rm/imran.jpg'
  },
  {
    rmId: 'rm-007',
    name: 'Ms. Tahmina Akter',
    title: 'Investment Officer - Green & Renewable Energy',
    email: 'tahmina.akter@bida.gov.bd',
    phone: '+880-2-9559177',
    whatsapp: '+880-1711-789012',
    specialization: ['Renewable Energy', 'Green Technology', 'Environmental Projects'],
    languages: ['Bengali', 'English', 'German'],
    sectors: ['Power & Energy', 'Renewable Energy', 'Environmental Services'],
    regions: ['Dhaka', 'Chittagong', 'Cox\'s Bazar'],
    availability: 'online',
    responseTime: '< 3 hours',
    photo: '/images/rm/tahmina.jpg'
  },
  {
    rmId: 'rm-008',
    name: 'Mr. Shakil Mahmud',
    title: 'Investment Officer - SME & Startups',
    email: 'shakil.mahmud@bida.gov.bd',
    phone: '+880-2-9559178',
    whatsapp: '+880-1711-890123',
    specialization: ['SME Development', 'Startup Ecosystem', 'Innovation'],
    languages: ['Bengali', 'English'],
    sectors: ['SME', 'Startups', 'Innovation', 'E-commerce'],
    regions: ['Dhaka', 'All Regions'],
    availability: 'online',
    responseTime: '< 2 hours',
    photo: '/images/rm/shakil.jpg'
  }
];

/**
 * 🔍 ASSIGN RM BY SECTOR
 * Returns the best-matched RM for a given sector
 */
export function assignRMBySector(sector: string): RelationshipManager | null {
  // Direct sector match
  const directMatch = relationshipManagers.find(rm => 
    rm.sectors.some(s => s.toLowerCase().includes(sector.toLowerCase()))
  );
  
  if (directMatch) return directMatch;

  // Fuzzy match by specialization
  const specializationMatch = relationshipManagers.find(rm =>
    rm.specialization.some(spec => spec.toLowerCase().includes(sector.toLowerCase()))
  );

  if (specializationMatch) return specializationMatch;

  // Default to general RM (first in list)
  return relationshipManagers[0];
}

/**
 * 🔍 ASSIGN RM BY SECTOR AND REGION
 */
export function assignRMBySectorAndRegion(sector: string, region?: string): RelationshipManager | null {
  if (!region) return assignRMBySector(sector);

  // Match both sector and region
  const match = relationshipManagers.find(rm => 
    rm.sectors.some(s => s.toLowerCase().includes(sector.toLowerCase())) &&
    (rm.regions?.some(r => r.toLowerCase().includes(region.toLowerCase())) || rm.regions?.includes('All Regions'))
  );

  if (match) return match;

  // Fallback to sector-only match
  return assignRMBySector(sector);
}

/**
 * 🔍 GET RM BY ID
 */
export function getRMById(rmId: string): RelationshipManager | null {
  return relationshipManagers.find(rm => rm.rmId === rmId) || null;
}

/**
 * 🔍 GET ALL RMs
 */
export function getAllRMs(): RelationshipManager[] {
  return relationshipManagers;
}

/**
 * 🔍 GET AVAILABLE RMs
 */
export function getAvailableRMs(): RelationshipManager[] {
  return relationshipManagers.filter(rm => rm.availability === 'online');
}

/**
 * 🔍 GET RMs BY LANGUAGE
 */
export function getRMsByLanguage(language: string): RelationshipManager[] {
  return relationshipManagers.filter(rm =>
    rm.languages.some(lang => lang.toLowerCase() === language.toLowerCase())
  );
}

/**
 * 🔍 SEARCH RMs
 */
export function searchRMs(query: string): RelationshipManager[] {
  const lowerQuery = query.toLowerCase();
  return relationshipManagers.filter(rm =>
    rm.name.toLowerCase().includes(lowerQuery) ||
    rm.title.toLowerCase().includes(lowerQuery) ||
    rm.specialization.some(spec => spec.toLowerCase().includes(lowerQuery)) ||
    rm.sectors.some(sector => sector.toLowerCase().includes(lowerQuery))
  );
}
