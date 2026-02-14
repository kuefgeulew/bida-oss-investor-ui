// Public API Gateway - Public verification endpoints
// READ-ONLY API for external parties to verify credentials
// Exposes: verifyBBID, verifyCertificate, serviceStatus

export interface BBIDVerificationResult {
  valid: boolean;
  bbid: string;
  companyName?: string;
  registrationDate?: string;
  status?: 'active' | 'suspended' | 'revoked';
  sector?: string;
  message?: string;
}

export interface CertificateVerificationResult {
  valid: boolean;
  certificateId: string;
  certificateType?: string;
  issuedTo?: string;
  bbid?: string;
  issuedDate?: string;
  expiryDate?: string;
  status?: 'valid' | 'expired' | 'revoked';
  issuer?: string;
  message?: string;
}

export interface ServiceStatusResult {
  operational: boolean;
  services: {
    registration: 'operational' | 'degraded' | 'down';
    payments: 'operational' | 'degraded' | 'down';
    certificates: 'operational' | 'degraded' | 'down';
    workflows: 'operational' | 'degraded' | 'down';
  };
  lastUpdated: string;
  uptime: number; // percentage
}

// Mock database (would be real database in production)
const bbidRegistry: Record<string, BBIDVerificationResult> = {
  'BBID-2024-001234': {
    valid: true,
    bbid: 'BBID-2024-001234',
    companyName: 'TechVentures Bangladesh Ltd',
    registrationDate: '2024-03-15',
    status: 'active',
    sector: 'Technology & IT',
  },
  'BBID-2024-000001': {
    valid: true,
    bbid: 'BBID-2024-000001',
    companyName: 'Demo Investor Company',
    registrationDate: '2024-01-15',
    status: 'active',
    sector: 'Textile & Garments',
  },
};

const certificateRegistry: Record<string, CertificateVerificationResult> = {
  'CERT-REG-2024-001': {
    valid: true,
    certificateId: 'CERT-REG-2024-001',
    certificateType: 'Registration Certificate',
    issuedTo: 'TechVentures Bangladesh Ltd',
    bbid: 'BBID-2024-001234',
    issuedDate: '2024-03-20',
    status: 'valid',
    issuer: 'BIDA',
  },
  'CERT-WORK-2024-055': {
    valid: true,
    certificateId: 'CERT-WORK-2024-055',
    certificateType: 'Work Permit',
    issuedTo: 'John Smith',
    bbid: 'BBID-2024-001234',
    issuedDate: '2024-04-10',
    expiryDate: '2027-04-10',
    status: 'valid',
    issuer: 'Ministry of Expatriates\' Welfare',
  },
};

// PUBLIC API FUNCTIONS

/**
 * Verify BBID (Bangladesh Business ID)
 * @param bbid - The BBID to verify (e.g., "BBID-2024-001234")
 * @returns Verification result with company details
 */
export async function verifyBBID(bbid: string): Promise<BBIDVerificationResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Clean input
  const cleanBBID = bbid.trim().toUpperCase();
  
  // Check registry
  const result = bbidRegistry[cleanBBID];
  
  if (result) {
    return result;
  }
  
  // Not found
  return {
    valid: false,
    bbid: cleanBBID,
    message: 'BBID not found in registry. Please verify the ID and try again.',
  };
}

/**
 * Verify Certificate
 * @param certificateId - The certificate ID to verify
 * @returns Verification result with certificate details
 */
export async function verifyCertificate(certificateId: string): Promise<CertificateVerificationResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Clean input
  const cleanCertId = certificateId.trim().toUpperCase();
  
  // Check registry
  const result = certificateRegistry[cleanCertId];
  
  if (result) {
    // Check if expired
    if (result.expiryDate) {
      const expiryDate = new Date(result.expiryDate);
      const now = new Date();
      
      if (expiryDate < now) {
        return {
          ...result,
          valid: false,
          status: 'expired',
          message: 'Certificate has expired',
        };
      }
    }
    
    return result;
  }
  
  // Not found
  return {
    valid: false,
    certificateId: cleanCertId,
    message: 'Certificate not found in registry. Please verify the ID and try again.',
  };
}

/**
 * Get Service Status
 * @returns Current operational status of all services
 */
export async function getServiceStatus(): Promise<ServiceStatusResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In production, this would check real service health
  return {
    operational: true,
    services: {
      registration: 'operational',
      payments: 'operational',
      certificates: 'operational',
      workflows: 'operational',
    },
    lastUpdated: new Date().toISOString(),
    uptime: 99.8,
  };
}

/**
 * Verify multiple BBIDs in batch
 * @param bbids - Array of BBIDs to verify
 * @returns Array of verification results
 */
export async function verifyBBIDsBatch(bbids: string[]): Promise<BBIDVerificationResult[]> {
  // Limit batch size
  if (bbids.length > 100) {
    throw new Error('Batch size limit exceeded. Maximum 100 BBIDs per request.');
  }
  
  return Promise.all(bbids.map(bbid => verifyBBID(bbid)));
}

/**
 * Verify multiple certificates in batch
 * @param certificateIds - Array of certificate IDs to verify
 * @returns Array of verification results
 */
export async function verifyCertificatesBatch(certificateIds: string[]): Promise<CertificateVerificationResult[]> {
  // Limit batch size
  if (certificateIds.length > 100) {
    throw new Error('Batch size limit exceeded. Maximum 100 certificates per request.');
  }
  
  return Promise.all(certificateIds.map(id => verifyCertificate(id)));
}

/**
 * Get API statistics (for monitoring)
 */
export async function getAPIStats(): Promise<{
  totalBBIDs: number;
  totalCertificates: number;
  apiVersion: string;
  rateLimit: {
    requestsPerHour: number;
    remaining: number;
  };
}> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    totalBBIDs: Object.keys(bbidRegistry).length,
    totalCertificates: Object.keys(certificateRegistry).length,
    apiVersion: '1.0.0',
    rateLimit: {
      requestsPerHour: 1000,
      remaining: 873,
    },
  };
}

// Helper function to add BBID to registry (for internal use)
export function registerBBID(data: Omit<BBIDVerificationResult, 'valid'>): void {
  bbidRegistry[data.bbid] = {
    ...data,
    valid: true,
  };
}

// Helper function to add certificate to registry (for internal use)
export function registerCertificate(data: Omit<CertificateVerificationResult, 'valid'>): void {
  certificateRegistry[data.certificateId] = {
    ...data,
    valid: true,
  };
}

// Export types
export type { BBIDVerificationResult, CertificateVerificationResult, ServiceStatusResult };
