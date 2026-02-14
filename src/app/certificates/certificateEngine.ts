// 📜 CERTIFICATE ENGINE — Auto-generate government certificates on workflow approval
// ARCHITECTURE: Triggered by agencyWorkflowEngine. Reads agencyRegistry + paymentRegistry.

import { getPaymentInfo } from '../payments/paymentRegistry';

export interface Certificate {
  certificateId: string;
  certificateType: 
    | 'company_registration' 
    | 'trade_license' 
    | 'work_permit' 
    | 'environmental_clearance'
    | 'fire_safety'
    | 'factory_license'
    | 'import_registration'
    | 'export_registration'
    | 'tax_certificate'
    | 'vat_registration'
    | 'pharmaceutical_license'
    | 'product_certification'
    | 'visa_recommendation'
    | 'investment_approval';
  
  bbid: string;
  investorId?: string;
  companyName: string;
  serviceId: string;
  serviceName: string;
  issuingAgency: string;
  issuedDate: string;
  expiryDate?: string;
  certificateNumber: string;
  status: 'active' | 'expired' | 'revoked';
  pdfUrl: string;
  qrCode?: string; // For verification
  blockchainHash?: string; // Blockchain notarization hash
  blockchainTimestamp?: string; // When notarized
  metadata: Record<string, any>; // Certificate-specific data
}

// In-memory certificate storage (replace with database in production)
const certificates: Map<string, Certificate> = new Map();

// 🎯 MOCK/DEMO CERTIFICATES - Pre-populate for demo purposes
function initializeMockCertificates() {
  const mockCerts: Certificate[] = [
    {
      certificateId: 'CERT-DEMO-001',
      certificateType: 'company_registration',
      bbid: 'BBID-001',
      investorId: '001',
      companyName: 'Demo Tech Solutions Ltd.',
      serviceId: 'bida-001',
      serviceName: 'Company Registration Certificate',
      issuingAgency: 'BIDA - Bangladesh Investment Development Authority',
      issuedDate: '2025-01-15T10:00:00.000Z',
      expiryDate: undefined, // Permanent
      certificateNumber: 'BIDA/CR/2025/001234',
      status: 'active',
      pdfUrl: '/api/certificates/CERT-DEMO-001.pdf',
      qrCode: 'https://verify.bida.gov.bd/cert/CERT-DEMO-001?num=BIDA/CR/2025/001234',
      blockchainHash: 'bc7f3a8e9d2c1b4a5e6f7890abcdef1234567890',
      blockchainTimestamp: '2025-01-15T10:05:00.000Z',
      metadata: {
        registrationNumber: 'C-123456',
        incorporationDate: '2025-01-15'
      }
    },
    {
      certificateId: 'CERT-DEMO-002',
      certificateType: 'trade_license',
      bbid: 'BBID-001',
      investorId: '001',
      companyName: 'Demo Tech Solutions Ltd.',
      serviceId: 'city-001',
      serviceName: 'Trade License',
      issuingAgency: 'Dhaka City Corporation',
      issuedDate: '2025-01-20T14:30:00.000Z',
      expiryDate: '2026-01-20T14:30:00.000Z', // 1 year validity
      certificateNumber: 'DCC/TL/2025/567890',
      status: 'active',
      pdfUrl: '/api/certificates/CERT-DEMO-002.pdf',
      qrCode: 'https://verify.bida.gov.bd/cert/CERT-DEMO-002?num=DCC/TL/2025/567890',
      blockchainHash: '3f8a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a',
      blockchainTimestamp: '2025-01-20T14:35:00.000Z',
      metadata: {
        businessType: 'Technology Services',
        licenseCategory: 'A'
      }
    },
    {
      certificateId: 'CERT-DEMO-003',
      certificateType: 'environmental_clearance',
      bbid: 'BBID-001',
      investorId: '001',
      companyName: 'Demo Tech Solutions Ltd.',
      serviceId: 'doe-001',
      serviceName: 'Environmental Clearance Certificate',
      issuingAgency: 'Department of Environment',
      issuedDate: '2025-01-25T09:15:00.000Z',
      expiryDate: '2028-01-25T09:15:00.000Z', // 3 years validity
      certificateNumber: 'DOE/EC/2025/789012',
      status: 'active',
      pdfUrl: '/api/certificates/CERT-DEMO-003.pdf',
      qrCode: 'https://verify.bida.gov.bd/cert/CERT-DEMO-003?num=DOE/EC/2025/789012',
      blockchainHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
      blockchainTimestamp: '2025-01-25T09:20:00.000Z',
      metadata: {
        projectType: 'IT Office',
        environmentalCategory: 'Green'
      }
    },
    {
      certificateId: 'CERT-DEMO-004',
      certificateType: 'fire_safety',
      bbid: 'BBID-001',
      investorId: '001',
      companyName: 'Demo Tech Solutions Ltd.',
      serviceId: 'fire-001',
      serviceName: 'Fire Safety Certificate',
      issuingAgency: 'Fire Service & Civil Defence',
      issuedDate: '2025-02-01T11:00:00.000Z',
      expiryDate: '2026-02-01T11:00:00.000Z', // 1 year validity
      certificateNumber: 'FSCD/FS/2025/345678',
      status: 'active',
      pdfUrl: '/api/certificates/CERT-DEMO-004.pdf',
      qrCode: 'https://verify.bida.gov.bd/cert/CERT-DEMO-004?num=FSCD/FS/2025/345678',
      blockchainHash: '5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e',
      blockchainTimestamp: '2025-02-01T11:05:00.000Z',
      metadata: {
        buildingType: 'Commercial Office',
        floors: 5,
        inspectionDate: '2025-01-28'
      }
    },
    {
      certificateId: 'CERT-DEMO-005',
      certificateType: 'vat_registration',
      bbid: 'BBID-001',
      investorId: '001',
      companyName: 'Demo Tech Solutions Ltd.',
      serviceId: 'nbd-002',
      serviceName: 'VAT Registration Certificate',
      issuingAgency: 'National Board of Revenue',
      issuedDate: '2025-02-05T13:45:00.000Z',
      expiryDate: undefined, // Permanent
      certificateNumber: 'NBR/VAT/2025/901234',
      status: 'active',
      pdfUrl: '/api/certificates/CERT-DEMO-005.pdf',
      qrCode: 'https://verify.bida.gov.bd/cert/CERT-DEMO-005?num=NBR/VAT/2025/901234',
      blockchainHash: '2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d',
      blockchainTimestamp: '2025-02-05T13:50:00.000Z',
      metadata: {
        vatNumber: 'VAT-2025-901234',
        registrationType: 'Standard'
      }
    },
    {
      certificateId: 'CERT-DEMO-006',
      certificateType: 'work_permit',
      bbid: 'BBID-001',
      investorId: '001',
      companyName: 'Demo Tech Solutions Ltd.',
      serviceId: 'mofa-001',
      serviceName: 'Work Permit Certificate',
      issuingAgency: 'Ministry of Foreign Affairs',
      issuedDate: '2025-02-10T10:30:00.000Z',
      expiryDate: '2027-02-10T10:30:00.000Z', // 2 years validity
      certificateNumber: 'MOFA/WP/2025/456789',
      status: 'active',
      pdfUrl: '/api/certificates/CERT-DEMO-006.pdf',
      qrCode: 'https://verify.bida.gov.bd/cert/CERT-DEMO-006?num=MOFA/WP/2025/456789',
      blockchainHash: '8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
      blockchainTimestamp: '2025-02-10T10:35:00.000Z',
      metadata: {
        nationality: 'Foreign',
        occupation: 'Chief Technology Officer',
        permitType: 'Professional'
      }
    }
  ];

  // Add all mock certificates to the Map
  mockCerts.forEach(cert => {
    certificates.set(cert.certificateId, cert);
  });

  console.log(`[Certificate Engine] ✅ Initialized ${mockCerts.length} mock certificates`);
}

// Initialize mock certificates on module load
initializeMockCertificates();

/**
 * 📜 GENERATE CERTIFICATE
 * Main entry point - auto-triggered when workflow step is approved
 */
export function generateCertificate(
  serviceId: string,
  bbid: string,
  companyName: string,
  metadata: Record<string, any> = {},
  investorId?: string
): Certificate | null {
  const certificateType = mapServiceToCertificateType(serviceId);
  if (!certificateType) {
    console.warn(`[Certificate Engine] No certificate mapping for service: ${serviceId}`);
    return null;
  }

  const paymentInfo = getPaymentInfo(serviceId);
  if (!paymentInfo) {
    console.error(`[Certificate Engine] No payment info for service: ${serviceId}`);
    return null;
  }

  const certificateId = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const certificateNumber = generateCertificateNumber(certificateType, bbid);
  const issuedDate = new Date().toISOString();
  const expiryDate = calculateExpiryDate(certificateType);

  const certificate: Certificate = {
    certificateId,
    certificateType,
    bbid,
    investorId,
    companyName,
    serviceId,
    serviceName: paymentInfo.description,
    issuingAgency: paymentInfo.payableAgency,
    issuedDate,
    expiryDate,
    certificateNumber,
    status: 'active',
    pdfUrl: `/api/certificates/${certificateId}.pdf`,
    qrCode: generateQRCode(certificateId, certificateNumber),
    metadata
  };

  certificates.set(certificateId, certificate);
  
  console.log(`[Certificate Engine] ✅ Generated: ${certificateType} for ${companyName} (${certificateNumber})`);
  
  return certificate;
}

/**
 * 🔗 BLOCKCHAIN NOTARIZATION
 * Generate cryptographic hash for certificate immutability
 */
export function notarizeCertificate(certificateId: string): string | null {
  const cert = certificates.get(certificateId);
  if (!cert) return null;
  
  // Generate blockchain hash from certificate data
  const blockchainHash = generateBlockchainHash(cert);
  const timestamp = new Date().toISOString();
  
  // Update certificate with blockchain data
  cert.blockchainHash = blockchainHash;
  cert.blockchainTimestamp = timestamp;
  
  console.log(`[Certificate Engine] 🔗 Notarized: ${cert.certificateNumber} - Hash: ${blockchainHash.substring(0, 16)}...`);
  
  return blockchainHash;
}

/**
 * 🔐 GENERATE BLOCKCHAIN HASH
 * Creates SHA-256 hash of certificate data for blockchain notarization
 */
function generateBlockchainHash(certificate: Certificate): string {
  // In production, this would use actual crypto library (e.g., crypto-js or Web Crypto API)
  // For now, we'll simulate a hash using certificate data
  
  const dataToHash = JSON.stringify({
    certificateId: certificate.certificateId,
    certificateNumber: certificate.certificateNumber,
    certificateType: certificate.certificateType,
    bbid: certificate.bbid,
    companyName: certificate.companyName,
    issuedDate: certificate.issuedDate,
    expiryDate: certificate.expiryDate,
    issuingAgency: certificate.issuingAgency,
  });
  
  // Simulate SHA-256 hash (64 hex characters)
  // In production: use crypto.subtle.digest('SHA-256', data) or crypto-js
  let hash = '0x';
  for (let i = 0; i < dataToHash.length; i++) {
    const charCode = dataToHash.charCodeAt(i);
    hash += charCode.toString(16).padStart(2, '0');
  }
  
  // Pad/truncate to 64 characters after '0x'
  hash = hash.substring(0, 66);
  while (hash.length < 66) {
    hash += '0';
  }
  
  return hash;
}

/**
 * ✅ VERIFY BLOCKCHAIN HASH
 * Verify certificate hasn't been tampered with by regenerating hash
 */
export function verifyBlockchainHash(certificateId: string): {
  verified: boolean;
  storedHash?: string;
  computedHash?: string;
  message: string;
} {
  const cert = certificates.get(certificateId);
  if (!cert) {
    return {
      verified: false,
      message: 'Certificate not found',
    };
  }
  
  if (!cert.blockchainHash) {
    return {
      verified: false,
      message: 'Certificate has not been notarized',
    };
  }
  
  const storedHash = cert.blockchainHash;
  const computedHash = generateBlockchainHash(cert);
  
  if (storedHash === computedHash) {
    return {
      verified: true,
      storedHash,
      computedHash,
      message: 'Certificate is authentic and unmodified',
    };
  } else {
    return {
      verified: false,
      storedHash,
      computedHash,
      message: 'WARNING: Certificate data has been tampered with',
    };
  }
}

/**
 * 📋 GET BLOCKCHAIN NOTARIZATION INFO
 */
export function getNotarizationInfo(certificateId: string): {
  notarized: boolean;
  hash?: string;
  timestamp?: string;
  blockchainUrl?: string;
} | null {
  const cert = certificates.get(certificateId);
  if (!cert) return null;
  
  if (!cert.blockchainHash) {
    return {
      notarized: false,
    };
  }
  
  return {
    notarized: true,
    hash: cert.blockchainHash,
    timestamp: cert.blockchainTimestamp,
    blockchainUrl: `https://blockchain.gov.bd/tx/${cert.blockchainHash}`,
  };
}

/**
 * 🗺️ MAP SERVICE TO CERTIFICATE TYPE
 */
function mapServiceToCertificateType(serviceId: string): Certificate['certificateType'] | null {
  const mapping: Record<string, Certificate['certificateType']> = {
    // RJSC
    'rjsc-001': 'company_registration',
    'rjsc-registration': 'company_registration', // Alternative ID
    'rjsc-002': 'company_registration',
    'rjsc-name-clearance': 'company_registration', // Alternative ID
    'rjsc-003': 'company_registration',
    
    // NBR
    'nbr-001': 'tax_certificate',
    'nbr-etin': 'tax_certificate', // Alternative ID
    'nbr-002': 'vat_registration',
    'nbr-vat': 'vat_registration', // Alternative ID
    'nbr-003': 'import_registration',
    'nbr-ebin': 'tax_certificate', // Alternative ID
    'nbr-004': 'export_registration',
    
    // Bangladesh Bank
    'bb-001': 'investment_approval',
    'bb-002': 'investment_approval',
    
    // Department of Environment
    'doe-001': 'environmental_clearance',
    'doe-clearance': 'environmental_clearance', // Alternative ID
    'doe-002': 'environmental_clearance',
    'doe-renewal': 'environmental_clearance', // Alternative ID
    
    // Fire Service
    'fire-001': 'fire_safety',
    'fire-clearance': 'fire_safety', // Alternative ID
    'fire-002': 'fire_safety',
    
    // Utility Connections
    'dpdc-connection': 'factory_license', // Using factory_license as utility connection certificate
    'wasa-connection': 'factory_license',
    'titas-connection': 'factory_license',
    
    // BIDA
    'bida-001': 'investment_approval',
    'bida-registration': 'investment_approval', // Alternative ID
    'bida-002': 'work_permit',
    'bida-003': 'visa_recommendation',
    
    // DGDA
    'dgda-001': 'pharmaceutical_license',
    'dgda-002': 'pharmaceutical_license',
    
    // BSTI
    'bsti-001': 'product_certification',
    'bsti-002': 'product_certification',
    
    // Immigration
    'dip-001': 'work_permit',
    'dip-002': 'work_permit',
    
    // Ministry of Commerce
    'moc-001': 'trade_license',
    'moc-002': 'trade_license'
  };

  return mapping[serviceId] || null;
}

/**
 * 🔢 GENERATE CERTIFICATE NUMBER
 */
function generateCertificateNumber(
  certificateType: Certificate['certificateType'],
  bbid: string
): string {
  const year = new Date().getFullYear();
  const prefix = getCertificatePrefix(certificateType);
  const randomSuffix = Math.random().toString(36).substr(2, 6).toUpperCase();
  
  return `${prefix}/${year}/${bbid.split('-').pop()}/${randomSuffix}`;
}

/**
 * 🏷️ GET CERTIFICATE PREFIX
 */
function getCertificatePrefix(certificateType: Certificate['certificateType']): string {
  const prefixes: Record<Certificate['certificateType'], string> = {
    company_registration: 'RJSC-REG',
    trade_license: 'TL',
    work_permit: 'WP',
    environmental_clearance: 'DOE-ECC',
    fire_safety: 'FSC',
    factory_license: 'FL',
    import_registration: 'IRC',
    export_registration: 'ERC',
    tax_certificate: 'TIN',
    vat_registration: 'VAT',
    pharmaceutical_license: 'DGDA-PL',
    product_certification: 'BSTI-PC',
    visa_recommendation: 'VRL',
    investment_approval: 'BIDA-IA'
  };

  return prefixes[certificateType] || 'CERT';
}

/**
 * 📅 CALCULATE EXPIRY DATE
 */
function calculateExpiryDate(certificateType: Certificate['certificateType']): string | undefined {
  const validityPeriods: Partial<Record<Certificate['certificateType'], number>> = {
    trade_license: 365, // 1 year
    work_permit: 730, // 2 years
    environmental_clearance: 1095, // 3 years
    fire_safety: 365, // 1 year
    factory_license: 1095, // 3 years
    import_registration: 1825, // 5 years
    export_registration: 1825, // 5 years
    vat_registration: 1825, // 5 years
    pharmaceutical_license: 1095, // 3 years
    product_certification: 730 // 2 years
  };

  const days = validityPeriods[certificateType];
  if (!days) return undefined; // Permanent certificates

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);
  return expiryDate.toISOString();
}

/**
 * 🔲 GENERATE QR CODE (Mock)
 */
function generateQRCode(certificateId: string, certificateNumber: string): string {
  // In production, this would generate a real QR code
  // For now, return a verification URL
  return `https://verify.bida.gov.bd/cert/${certificateId}?num=${certificateNumber}`;
}

/**
 * 📋 GET ALL CERTIFICATES FOR A BUSINESS
 */
export function getCertificates(bbid: string): Certificate[] {
  const businessCerts: Certificate[] = [];
  
  certificates.forEach(cert => {
    if (cert.bbid === bbid) {
      // Check expiry
      if (cert.expiryDate && new Date(cert.expiryDate) < new Date()) {
        cert.status = 'expired';
      }
      businessCerts.push(cert);
    }
  });

  return businessCerts.sort((a, b) => 
    new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime()
  );
}

/**
 * 📋 GET CERTIFICATE BY ID
 */
export function getCertificate(certificateId: string): Certificate | null {
  return certificates.get(certificateId) || null;
}

/**
 * ✅ CHECK IF CERTIFICATE EXISTS FOR INVESTOR + SERVICE
 */
export function hasCertificate(investorId: string, serviceId: string): boolean {
  let found = false;
  certificates.forEach(cert => {
    if (cert.investorId === investorId && cert.serviceId === serviceId) {
      found = true;
    }
  });
  return found;
}

/**
 * 📋 GET CERTIFICATES BY TYPE
 */
export function getCertificatesByType(
  bbid: string, 
  certificateType: Certificate['certificateType']
): Certificate[] {
  return getCertificates(bbid).filter(cert => cert.certificateType === certificateType);
}

/**
 * 📋 GET ACTIVE CERTIFICATES
 */
export function getActiveCertificates(bbid: string): Certificate[] {
  return getCertificates(bbid).filter(cert => cert.status === 'active');
}

/**
 * 📋 GET EXPIRING CERTIFICATES
 */
export function getExpiringCertificates(bbid: string, daysThreshold: number = 30): Certificate[] {
  const threshold = new Date();
  threshold.setDate(threshold.getDate() + daysThreshold);

  return getCertificates(bbid).filter(cert => {
    if (!cert.expiryDate || cert.status !== 'active') return false;
    const expiryDate = new Date(cert.expiryDate);
    return expiryDate <= threshold && expiryDate >= new Date();
  });
}

/**
 * ❌ REVOKE CERTIFICATE
 */
export function revokeCertificate(certificateId: string, reason: string): boolean {
  const cert = certificates.get(certificateId);
  if (!cert) return false;

  cert.status = 'revoked';
  cert.metadata.revocationReason = reason;
  cert.metadata.revokedDate = new Date().toISOString();

  console.log(`[Certificate Engine] ❌ Revoked: ${cert.certificateNumber} - Reason: ${reason}`);
  return true;
}

/**
 * 🔄 RENEW CERTIFICATE
 */
export function renewCertificate(certificateId: string): Certificate | null {
  const oldCert = certificates.get(certificateId);
  if (!oldCert) return null;

  // Generate new certificate with same details but new dates
  const newCert = generateCertificate(
    oldCert.serviceId,
    oldCert.bbid,
    oldCert.companyName,
    { ...oldCert.metadata, renewedFrom: certificateId },
    oldCert.investorId
  );

  // Mark old certificate as expired
  oldCert.status = 'expired';
  oldCert.metadata.renewedTo = newCert?.certificateId;

  console.log(`[Certificate Engine] 🔄 Renewed: ${oldCert.certificateNumber} → ${newCert?.certificateNumber}`);
  return newCert;
}

/**
 * ✅ VERIFY CERTIFICATE
 */
export function verifyCertificate(certificateNumber: string): Certificate | null {
  let found: Certificate | null = null;
  
  certificates.forEach(cert => {
    if (cert.certificateNumber === certificateNumber) {
      found = cert;
    }
  });

  return found;
}

/**
 * 📊 GET CERTIFICATE STATS
 */
export function getCertificateStats(bbid: string) {
  const allCerts = getCertificates(bbid);
  const active = allCerts.filter(c => c.status === 'active').length;
  const expired = allCerts.filter(c => c.status === 'expired').length;
  const expiringSoon = getExpiringCertificates(bbid, 30).length;

  return {
    total: allCerts.length,
    active,
    expired,
    expiringSoon,
    revoked: allCerts.filter(c => c.status === 'revoked').length
  };
}

/**
 * 📄 GENERATE PDF CONTENT (Mock)
 * In production, this would use a PDF library to generate actual PDFs
 */
export function generateCertificatePDF(certificate: Certificate): string {
  // This would generate actual PDF bytes
  // For now, return HTML template that can be converted to PDF
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${certificate.serviceName} - ${certificate.certificateNumber}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: white; }
    .cert-header { text-align: center; border-bottom: 3px solid #1e40af; padding-bottom: 20px; margin-bottom: 30px; }
    .cert-title { font-size: 28px; font-weight: bold; color: #1e40af; margin: 10px 0; }
    .cert-body { margin: 30px 0; line-height: 1.8; }
    .cert-footer { margin-top: 60px; border-top: 1px solid #ccc; padding-top: 20px; }
    .seal { width: 100px; height: 100px; border: 2px solid #1e40af; border-radius: 50%; 
            display: inline-flex; align-items: center; justify-content: center; 
            font-weight: bold; color: #1e40af; }
  </style>
</head>
<body>
  <div class="cert-header">
    <div style="font-size: 24px; font-weight: bold;">Government of the People's Republic of Bangladesh</div>
    <div style="font-size: 20px; margin-top: 10px;">${certificate.issuingAgency}</div>
    <div class="cert-title">${certificate.serviceName}</div>
    <div style="font-size: 14px; color: #666;">Certificate No: ${certificate.certificateNumber}</div>
  </div>
  
  <div class="cert-body">
    <p>This is to certify that:</p>
    
    <p style="text-align: center; font-size: 20px; font-weight: bold; margin: 20px 0;">
      ${certificate.companyName}
    </p>
    
    <p style="text-align: center; font-size: 16px; color: #666; margin-bottom: 30px;">
      Business Bangladesh ID: ${certificate.bbid}
    </p>
    
    <p>has been duly registered/approved under the applicable laws and regulations of Bangladesh.</p>
    
    ${certificate.expiryDate ? `
      <p><strong>Valid Until:</strong> ${new Date(certificate.expiryDate).toLocaleDateString('en-BD', { 
        year: 'numeric', month: 'long', day: 'numeric' 
      })}</p>
    ` : '<p><strong>Validity:</strong> Permanent</p>'}
    
    <p><strong>Issued On:</strong> ${new Date(certificate.issuedDate).toLocaleDateString('en-BD', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    })}</p>
  </div>
  
  <div class="cert-footer">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div class="seal">OFFICIAL<br/>SEAL</div>
      </div>
      <div style="text-align: right;">
        <div style="border-top: 2px solid #000; width: 200px; margin-bottom: 5px;"></div>
        <div><strong>Authorized Signatory</strong></div>
        <div style="color: #666; font-size: 14px;">${certificate.issuingAgency}</div>
      </div>
    </div>
    
    <div style="margin-top: 30px; padding: 15px; background: #f3f4f6; border-radius: 8px; text-align: center;">
      <div style="font-size: 12px; color: #666;">Verify this certificate at:</div>
      <div style="font-family: monospace; font-size: 11px; margin-top: 5px;">${certificate.qrCode}</div>
    </div>
  </div>
</body>
</html>
  `.trim();
}