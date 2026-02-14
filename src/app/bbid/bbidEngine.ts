// 🆔 BBID ENGINE — Business logic for BBID lifecycle management
// ARCHITECTURE: Business logic layer. Handles BBID issuance, verification, and tracking.

import { 
  generateBBID, 
  validateBBIDFormat, 
  parseBBID,
  mockBBIDRecords,
  type BBIDRecord,
  type BBIDVerification 
} from './bbidRegistry';

// In-memory storage (replace with database in production)
const bbidRecords: Map<string, BBIDRecord> = new Map();
const verificationLog: BBIDVerification[] = [];

/**
 * 🎯 INITIALIZE MOCK DATA
 */
function initializeBBIDData() {
  mockBBIDRecords.forEach(record => {
    bbidRecords.set(record.bbid, record);
  });
  
  console.log(`[BBID Engine] ✅ Initialized ${bbidRecords.size} BBID records`);
}

/**
 * 📝 REGISTER NEW BBID
 * Issues a new Bangladesh Business ID
 */
export function registerBBID(
  companyName: string,
  sector: string,
  legalEntity: BBIDRecord['legalEntity'],
  registeredAddress: BBIDRecord['registeredAddress'],
  investorId?: string,
  options?: {
    companyNameBangla?: string;
    subsector?: string;
    investmentAmount?: number;
    currency?: string;
    numberOfEmployees?: number;
    rjscNumber?: string;
    tinNumber?: string;
  }
): BBIDRecord {
  // Generate BBID
  const bbid = generateBBID(sector);
  
  // Check for duplicates (shouldn't happen with random generation, but just in case)
  if (bbidRecords.has(bbid)) {
    return registerBBID(companyName, sector, legalEntity, registeredAddress, investorId, options);
  }

  const now = new Date().toISOString();
  
  const record: BBIDRecord = {
    bbid,
    investorId,
    companyName,
    companyNameBangla: options?.companyNameBangla,
    sector,
    subsector: options?.subsector,
    legalEntity,
    registrationDate: now.split('T')[0],
    status: 'active',
    issuedBy: 'SYSTEM', // In production, use actual officer ID
    issuanceDate: now,
    registeredAddress,
    investmentAmount: options?.investmentAmount,
    currency: options?.currency || 'USD',
    numberOfEmployees: options?.numberOfEmployees,
    verified: false, // Requires verification
    rjscNumber: options?.rjscNumber,
    tinNumber: options?.tinNumber,
    createdAt: now,
    updatedAt: now
  };

  bbidRecords.set(bbid, record);
  
  console.log(`[BBID Engine] 🆔 Registered new BBID: ${bbid} for ${companyName}`);
  
  return record;
}

/**
 * 🔍 LOOKUP BBID
 * Retrieves BBID record by ID
 */
export function lookupBBID(bbid: string): BBIDRecord | null {
  if (!validateBBIDFormat(bbid)) {
    return null;
  }
  
  return bbidRecords.get(bbid) || null;
}

/**
 * 🔍 SEARCH BBID
 * Search by company name, investor ID, or other fields
 */
export function searchBBID(query: {
  companyName?: string;
  investorId?: string;
  sector?: string;
  status?: BBIDRecord['status'];
  district?: string;
}): BBIDRecord[] {
  const results: BBIDRecord[] = [];
  
  bbidRecords.forEach(record => {
    let match = true;
    
    if (query.companyName && !record.companyName.toLowerCase().includes(query.companyName.toLowerCase())) {
      match = false;
    }
    
    if (query.investorId && record.investorId !== query.investorId) {
      match = false;
    }
    
    if (query.sector && record.sector !== query.sector) {
      match = false;
    }
    
    if (query.status && record.status !== query.status) {
      match = false;
    }
    
    if (query.district && record.registeredAddress.district !== query.district) {
      match = false;
    }
    
    if (match) {
      results.push(record);
    }
  });
  
  return results;
}

/**
 * ✅ VERIFY BBID
 * Performs verification and logs the attempt
 */
export function verifyBBID(
  bbid: string,
  method: BBIDVerification['method'] = 'manual_lookup',
  verifiedBy: string = 'SYSTEM'
): BBIDVerification {
  const record = lookupBBID(bbid);
  
  const verification: BBIDVerification = {
    bbid,
    verifiedBy,
    verifiedAt: new Date().toISOString(),
    method,
    valid: record !== null && record.status === 'active',
    details: record || undefined,
    errorMessage: !record ? 'BBID not found' : 
                  record.status !== 'active' ? `BBID status: ${record.status}` : 
                  undefined
  };
  
  verificationLog.push(verification);
  
  // Update record verification status
  if (record && !record.verified) {
    record.verified = true;
    record.verificationDate = verification.verifiedAt;
    record.verificationMethod = method;
    record.updatedAt = verification.verifiedAt;
  }
  
  return verification;
}

/**
 * 🔄 UPDATE BBID STATUS
 */
export function updateBBIDStatus(
  bbid: string,
  status: BBIDRecord['status'],
  notes?: string
): boolean {
  const record = lookupBBID(bbid);
  if (!record) return false;
  
  record.status = status;
  record.updatedAt = new Date().toISOString();
  if (notes) record.notes = notes;
  
  console.log(`[BBID Engine] 🔄 Updated ${bbid} status to ${status}`);
  
  return true;
}

/**
 * 📝 UPDATE BBID RECORD
 */
export function updateBBIDRecord(
  bbid: string,
  updates: Partial<Omit<BBIDRecord, 'bbid' | 'createdAt'>>
): BBIDRecord | null {
  const record = lookupBBID(bbid);
  if (!record) return null;
  
  Object.assign(record, updates);
  record.updatedAt = new Date().toISOString();
  
  return record;
}

/**
 * 🔗 LINK BBID TO EXTERNAL SYSTEMS
 */
export function linkBBIDToExternalSystems(
  bbid: string,
  links: {
    rjscNumber?: string;
    tinNumber?: string;
    importerCode?: string;
    exporterCode?: string;
  }
): boolean {
  const record = lookupBBID(bbid);
  if (!record) return false;
  
  if (links.rjscNumber) record.rjscNumber = links.rjscNumber;
  if (links.tinNumber) record.tinNumber = links.tinNumber;
  if (links.importerCode) record.importerCode = links.importerCode;
  if (links.exporterCode) record.exporterCode = links.exporterCode;
  
  record.updatedAt = new Date().toISOString();
  
  console.log(`[BBID Engine] 🔗 Linked ${bbid} to external systems`);
  
  return true;
}

/**
 * 📊 GET BBID STATISTICS
 */
export function getBBIDStatistics() {
  const allRecords = Array.from(bbidRecords.values());
  
  const active = allRecords.filter(r => r.status === 'active').length;
  const verified = allRecords.filter(r => r.verified).length;
  const suspended = allRecords.filter(r => r.status === 'suspended').length;
  
  const bySector = allRecords.reduce((acc, record) => {
    acc[record.sector] = (acc[record.sector] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byRegion = allRecords.reduce((acc, record) => {
    const division = record.registeredAddress.division;
    acc[division] = (acc[division] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total: allRecords.length,
    active,
    verified,
    suspended,
    bySector,
    byRegion,
    totalInvestment: allRecords.reduce((sum, r) => sum + (r.investmentAmount || 0), 0),
    totalEmployees: allRecords.reduce((sum, r) => sum + (r.numberOfEmployees || 0), 0)
  };
}

/**
 * 📋 GET VERIFICATION LOG
 */
export function getVerificationLog(bbid?: string): BBIDVerification[] {
  if (bbid) {
    return verificationLog.filter(v => v.bbid === bbid);
  }
  return verificationLog;
}

/**
 * 🎯 GET ALL BBIDS
 */
export function getAllBBIDs(filter?: {
  status?: BBIDRecord['status'];
  sector?: string;
  verified?: boolean;
}): BBIDRecord[] {
  let results = Array.from(bbidRecords.values());
  
  if (filter) {
    if (filter.status) {
      results = results.filter(r => r.status === filter.status);
    }
    if (filter.sector) {
      results = results.filter(r => r.sector === filter.sector);
    }
    if (filter.verified !== undefined) {
      results = results.filter(r => r.verified === filter.verified);
    }
  }
  
  return results.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * 🔐 VALIDATE BBID OWNERSHIP
 * Checks if investorId matches BBID record
 */
export function validateBBIDOwnership(bbid: string, investorId: string): boolean {
  const record = lookupBBID(bbid);
  return record !== null && record.investorId === investorId;
}

// Initialize on load
if (typeof window !== 'undefined') {
  initializeBBIDData();
}
