// 🚀 ENHANCED API SERVICES — Real Backend Integration Layer
// PHASE 5: Replaces all mock data with actual API calls to Prisma/PostgreSQL backend
// ARCHITECTURE: Centralized API layer for all 26 master features

import apiClient from './client';

// ============================================
// EXTENDED TYPES
// ============================================

export interface BBIDRecord {
  bbid: string;
  investorId: string;
  businessName: string;
  businessType: 'LOCAL' | 'FOREIGN' | 'JOINT_VENTURE';
  sector: string;
  division: string;
  district: string;
  registrationDate: string;
  isActive: boolean;
  qrCode?: string;
  metadata?: Record<string, any>;
}

export interface Document {
  id: string;
  name: string;
  originalName: string;
  type: string;
  size: number;
  url: string;
  category: 'PASSPORT' | 'NID' | 'LICENSE' | 'CERTIFICATE' | 'FINANCIAL' | 'TAX' | 'INCORPORATION' | 'OTHER';
  ocrProcessed: boolean;
  ocrData?: any;
  investorId?: string;
  applicationId?: string;
  uploadedAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  transactionId: string;
  userId: string;
  applicationId?: string;
  bbid?: string;
  investorId?: string;
  serviceName: string;
  amount: number;
  feeAmount: number;
  currency: string;
  method: 'BKASH' | 'NAGAD' | 'CARD' | 'BANK_TRANSFER' | 'CASH';
  gateway?: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  paidAt?: string;
  dueDate: string;
  receiptUrl?: string;
  gatewayResponse?: any;
  createdAt: string;
  updatedAt: string;
}

export interface Pipeline {
  investorId: string;
  applicationId?: string;
  currentStep: number;
  completedSteps: number;
  totalSteps: number;
  status: string;
  steps: PipelineStep[];
  estimatedCompletion?: string;
}

export interface PipelineStep {
  id: string;
  stepNumber: number;
  name: string;
  agency: string;
  department?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED' | 'SKIPPED';
  startDate?: string;
  completedDate?: string;
  slaDeadline: string;
  assignedTo?: string;
  notes?: string;
}

export interface BankConnection {
  id: string;
  investorId: string;
  bbid?: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountType: 'CURRENT' | 'SAVINGS' | 'ESCROW';
  isActive: boolean;
  isPrimary: boolean;
  connectedAt: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'FAILED';
}

export interface ZoneRecommendation {
  zoneId: string;
  zoneName: string;
  matchScore: number;
  incentives: string[];
  infrastructure: string[];
  availablePlots: number;
  estimatedCost: number;
  reasons: string[];
}

export interface IncentiveEligibility {
  investorId: string;
  bbid?: string;
  sector: string;
  investmentAmount: number;
  eligibleIncentives: {
    id: string;
    name: string;
    type: string;
    value: number;
    criteria: string[];
    status: 'ELIGIBLE' | 'APPLIED' | 'APPROVED' | 'CLAIMED';
  }[];
  totalPotentialSavings: number;
  calculatedAt: string;
}

export interface Certificate {
  id: string;
  certificateNo: string;
  type: string;
  investorId: string;
  bbid?: string;
  issuedBy: string;
  issuedAt: string;
  expiresAt?: string;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
  qrCode: string;
  blockchainHash?: string;
  pdfUrl: string;
  metadata?: Record<string, any>;
}

export interface ComplianceStatus {
  investorId: string;
  bbid?: string;
  items: {
    id: string;
    name: string;
    category: string;
    status: 'COMPLIANT' | 'WARNING' | 'EXPIRED' | 'PENDING';
    dueDate?: string;
    lastChecked: string;
    renewalUrl?: string;
  }[];
  overallScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ServiceRating {
  id: string;
  serviceId: string;
  serviceName: string;
  investorId: string;
  rating: number;
  feedback: string;
  category: string;
  createdAt: string;
}

export interface SLAMetrics {
  serviceId: string;
  serviceName: string;
  agency: string;
  averageProcessingTime: number;
  slaTarget: number;
  complianceRate: number;
  totalApplications: number;
  onTimeDeliveries: number;
}

export interface MatchmakerResult {
  investorId: string;
  matches: {
    partnerId: string;
    partnerName: string;
    partnerType: 'SUPPLIER' | 'DISTRIBUTOR' | 'SERVICE_PROVIDER' | 'JOINT_VENTURE';
    matchScore: number;
    sector: string;
    capabilities: string[];
    location: string;
    contactInfo?: string;
  }[];
  calculatedAt: string;
}

export interface RMAssignment {
  investorId: string;
  bbid?: string;
  rmId: string;
  rmName: string;
  rmEmail: string;
  rmPhone: string;
  rmAvatar?: string;
  assignedAt: string;
  expertise: string[];
  languages: string[];
}

export interface GrievanceTicket {
  id: string;
  ticketNo: string;
  investorId: string;
  category: string;
  subject: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
}

export interface ESGMetrics {
  investorId: string;
  bbid?: string;
  environmentScore: number;
  socialScore: number;
  governanceScore: number;
  overallScore: number;
  certifications: string[];
  carbonFootprint?: number;
  renewableEnergyPercent?: number;
  lastAssessed: string;
}

export interface FDIStatistics {
  period: string;
  totalInvestment: number;
  totalInvestors: number;
  topSectors: { sector: string; amount: number; count: number }[];
  topCountries: { country: string; amount: number; count: number }[];
  monthlyTrends: { month: string; amount: number; count: number }[];
  averageInvestmentSize: number;
}

// ============================================
// BBID MANAGEMENT
// ============================================

export const bbidService = {
  /**
   * Generate a new BBID (Bangladesh Business Identity)
   */
  async generateBBID(data: {
    investorId: string;
    businessName: string;
    businessType: string;
    sector: string;
    division: string;
    district: string;
  }): Promise<{ bbid: BBIDRecord }> {
    const response: any = await apiClient.post('/bbid/generate', data);
    return response.data;
  },

  /**
   * Lookup BBID by ID
   */
  async lookupBBID(bbid: string): Promise<{ bbid: BBIDRecord | null }> {
    const response: any = await apiClient.get(`/bbid/${bbid}`);
    return response.data;
  },

  /**
   * Search BBIDs by criteria
   */
  async searchBBID(query: {
    investorId?: string;
    businessName?: string;
    sector?: string;
  }): Promise<{ bbids: BBIDRecord[] }> {
    const response: any = await apiClient.get('/bbid/search', { params: query });
    return response.data;
  },

  /**
   * Update BBID information
   */
  async updateBBID(bbid: string, data: Partial<BBIDRecord>): Promise<{ bbid: BBIDRecord }> {
    const response: any = await apiClient.put(`/bbid/${bbid}`, data);
    return response.data;
  },

  /**
   * Generate BBID QR code
   */
  async generateQRCode(bbid: string): Promise<{ qrCode: string }> {
    const response: any = await apiClient.post(`/bbid/${bbid}/qr`);
    return response.data;
  },
};

// ============================================
// DOCUMENT MANAGEMENT
// ============================================

export const documentService = {
  /**
   * Upload a document
   */
  async uploadDocument(
    file: File,
    metadata: {
      investorId?: string;
      applicationId?: string;
      type: string;
      category: string;
    }
  ): Promise<{ document: Document }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));

    const response: any = await apiClient.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Get documents by investor
   */
  async getDocuments(investorId: string): Promise<{ documents: Document[] }> {
    const response: any = await apiClient.get(`/documents/investor/${investorId}`);
    return response.data;
  },

  /**
   * Get document by ID
   */
  async getDocumentById(id: string): Promise<{ document: Document }> {
    const response: any = await apiClient.get(`/documents/${id}`);
    return response.data;
  },

  /**
   * Delete document
   */
  async deleteDocument(id: string): Promise<void> {
    await apiClient.delete(`/documents/${id}`);
  },

  /**
   * Download document
   */
  async downloadDocument(id: string): Promise<Blob> {
    const response = await apiClient.get(`/documents/${id}/download`, {
      responseType: 'blob',
    });
    return response as unknown as Blob;
  },

  /**
   * Process OCR on document
   */
  async processOCR(id: string): Promise<{ ocrData: any }> {
    const response: any = await apiClient.post(`/documents/${id}/ocr`);
    return response.data;
  },
};

// ============================================
// PAYMENT PROCESSING
// ============================================

export const paymentService = {
  /**
   * Initiate a payment
   */
  async initiatePayment(data: {
    userId: string;
    applicationId?: string;
    bbid?: string;
    investorId?: string;
    serviceName: string;
    amount: number;
    method: string;
    gateway?: string;
  }): Promise<{ payment: Payment; paymentUrl?: string }> {
    const response: any = await apiClient.post('/payments/initiate', data);
    return response.data;
  },

  /**
   * Verify payment status
   */
  async verifyPayment(transactionId: string): Promise<{ payment: Payment }> {
    const response: any = await apiClient.get(`/payments/verify/${transactionId}`);
    return response.data;
  },

  /**
   * Get all payments for a user
   */
  async getPayments(params?: {
    userId?: string;
    investorId?: string;
    bbid?: string;
    status?: string;
  }): Promise<{ payments: Payment[] }> {
    const response: any = await apiClient.get('/payments', { params });
    return response.data;
  },

  /**
   * Get payment receipt
   */
  async getPaymentReceipt(id: string): Promise<{ receiptUrl: string }> {
    const response: any = await apiClient.get(`/payments/${id}/receipt`);
    return response.data;
  },

  /**
   * Process payment webhook (for bKash/Nagad callbacks)
   */
  async processWebhook(data: any): Promise<{ success: boolean }> {
    const response: any = await apiClient.post('/payments/webhook', data);
    return response.data;
  },
};

// ============================================
// WORKFLOW & PIPELINE
// ============================================

export const workflowService = {
  /**
   * Get approval pipeline for investor
   */
  async getPipeline(investorId: string, applicationId?: string): Promise<{ pipeline: Pipeline }> {
    const response: any = await apiClient.get(`/workflow/pipeline/${investorId}`, {
      params: { applicationId },
    });
    return response.data;
  },

  /**
   * Update pipeline step status
   */
  async updateStepStatus(
    stepId: string,
    data: { status: string; notes?: string }
  ): Promise<{ step: PipelineStep }> {
    const response: any = await apiClient.put(`/workflow/steps/${stepId}`, data);
    return response.data;
  },

  /**
   * Get step requirements
   */
  async getStepRequirements(stepId: string): Promise<{ requirements: string[] }> {
    const response: any = await apiClient.get(`/workflow/steps/${stepId}/requirements`);
    return response.data;
  },
};

// ============================================
// BANK INTEGRATION
// ============================================

export const bankService = {
  /**
   * Connect bank account
   */
  async connectBank(data: {
    investorId: string;
    bbid?: string;
    bankCode: string;
    accountNumber: string;
    accountType: string;
  }): Promise<{ connection: BankConnection }> {
    const response: any = await apiClient.post('/banks/connect', data);
    return response.data;
  },

  /**
   * Get bank connections
   */
  async getBankConnections(investorId: string): Promise<{ connections: BankConnection[] }> {
    const response: any = await apiClient.get(`/banks/investor/${investorId}`);
    return response.data;
  },

  /**
   * Verify bank account
   */
  async verifyBankAccount(connectionId: string): Promise<{ verified: boolean }> {
    const response: any = await apiClient.post(`/banks/${connectionId}/verify`);
    return response.data;
  },

  /**
   * Get FX conversion rate
   */
  async getFXRate(from: string, to: string, amount: number): Promise<{ rate: number; convertedAmount: number }> {
    const response: any = await apiClient.get('/banks/fx/convert', {
      params: { from, to, amount },
    });
    return response.data;
  },
};

// ============================================
// ZONE INTELLIGENCE
// ============================================

export const zoneService = {
  /**
   * Get zone recommendations
   */
  async getRecommendations(data: {
    investorId: string;
    sector: string;
    investmentAmount: number;
    preferences?: string[];
  }): Promise<{ recommendations: ZoneRecommendation[] }> {
    const response: any = await apiClient.post('/zones/recommend', data);
    return response.data;
  },

  /**
   * Get zone details
   */
  async getZoneDetails(zoneId: string): Promise<{ zone: any }> {
    const response: any = await apiClient.get(`/zones/${zoneId}`);
    return response.data;
  },

  /**
   * Get available plots in zone
   */
  async getAvailablePlots(zoneId: string): Promise<{ plots: any[] }> {
    const response: any = await apiClient.get(`/zones/${zoneId}/plots`);
    return response.data;
  },
};

// ============================================
// INCENTIVES & ELIGIBILITY
// ============================================

export const incentiveService = {
  /**
   * Calculate incentive eligibility
   */
  async calculateEligibility(data: {
    investorId: string;
    bbid?: string;
    sector: string;
    investmentAmount: number;
    zone?: string;
  }): Promise<{ eligibility: IncentiveEligibility }> {
    const response: any = await apiClient.post('/incentives/calculate', data);
    return response.data;
  },

  /**
   * Apply for incentive
   */
  async applyForIncentive(data: {
    investorId: string;
    incentiveId: string;
    applicationData: any;
  }): Promise<{ application: any }> {
    const response: any = await apiClient.post('/incentives/apply', data);
    return response.data;
  },

  /**
   * Get incentive applications
   */
  async getIncentiveApplications(investorId: string): Promise<{ applications: any[] }> {
    const response: any = await apiClient.get(`/incentives/investor/${investorId}`);
    return response.data;
  },
};

// ============================================
// CERTIFICATES
// ============================================

export const certificateService = {
  /**
   * Issue a certificate
   */
  async issueCertificate(data: {
    investorId: string;
    bbid?: string;
    type: string;
    issuedBy: string;
    expiresAt?: string;
    metadata?: any;
  }): Promise<{ certificate: Certificate }> {
    const response: any = await apiClient.post('/certificates/issue', data);
    return response.data;
  },

  /**
   * Get certificates by investor
   */
  async getCertificates(investorId: string): Promise<{ certificates: Certificate[] }> {
    const response: any = await apiClient.get(`/certificates/investor/${investorId}`);
    return response.data;
  },

  /**
   * Verify certificate (blockchain)
   */
  async verifyCertificate(certificateNo: string): Promise<{ valid: boolean; certificate?: Certificate }> {
    const response: any = await apiClient.get(`/certificates/verify/${certificateNo}`);
    return response.data;
  },

  /**
   * Download certificate PDF
   */
  async downloadCertificate(id: string): Promise<Blob> {
    const response = await apiClient.get(`/certificates/${id}/download`, {
      responseType: 'blob',
    });
    return response as unknown as Blob;
  },
};

// ============================================
// COMPLIANCE TRACKING
// ============================================

export const complianceService = {
  /**
   * Get compliance status
   */
  async getComplianceStatus(investorId: string): Promise<{ compliance: ComplianceStatus }> {
    const response: any = await apiClient.get(`/compliance/investor/${investorId}`);
    return response.data;
  },

  /**
   * Check specific compliance item
   */
  async checkCompliance(investorId: string, itemId: string): Promise<{ status: string }> {
    const response: any = await apiClient.post(`/compliance/check`, { investorId, itemId });
    return response.data;
  },

  /**
   * Renew compliance certificate
   */
  async renewCompliance(itemId: string): Promise<{ renewed: boolean }> {
    const response: any = await apiClient.post(`/compliance/${itemId}/renew`);
    return response.data;
  },
};

// ============================================
// SERVICE RATINGS & SLA
// ============================================

export const ratingService = {
  /**
   * Submit service rating
   */
  async submitRating(data: {
    serviceId: string;
    serviceName: string;
    investorId: string;
    rating: number;
    feedback: string;
    category: string;
  }): Promise<{ rating: ServiceRating }> {
    const response: any = await apiClient.post('/ratings/submit', data);
    return response.data;
  },

  /**
   * Get SLA metrics for service
   */
  async getSLAMetrics(serviceId: string): Promise<{ metrics: SLAMetrics }> {
    const response: any = await apiClient.get(`/sla/service/${serviceId}`);
    return response.data;
  },

  /**
   * Get agency performance
   */
  async getAgencyPerformance(agency: string): Promise<{ performance: any }> {
    const response: any = await apiClient.get(`/sla/agency/${agency}`);
    return response.data;
  },
};

// ============================================
// MATCHMAKING & PARTNERSHIPS
// ============================================

export const matchmakerService = {
  /**
   * Find partner matches
   */
  async findMatches(data: {
    investorId: string;
    sector: string;
    partnerType?: string;
    location?: string;
  }): Promise<{ matches: MatchmakerResult }> {
    const response: any = await apiClient.post('/matchmaker/find', data);
    return response.data;
  },

  /**
   * Request connection with partner
   */
  async requestConnection(investorId: string, partnerId: string): Promise<{ success: boolean }> {
    const response: any = await apiClient.post('/matchmaker/connect', { investorId, partnerId });
    return response.data;
  },
};

// ============================================
// RELATIONSHIP MANAGER
// ============================================

export const rmService = {
  /**
   * Get assigned RM
   */
  async getAssignedRM(investorId: string): Promise<{ rm: RMAssignment | null }> {
    const response: any = await apiClient.get(`/rm/investor/${investorId}`);
    return response.data;
  },

  /**
   * Request RM assignment
   */
  async requestRM(data: {
    investorId: string;
    bbid?: string;
    preferences?: string[];
  }): Promise<{ assignment: RMAssignment }> {
    const response: any = await apiClient.post('/rm/assign', data);
    return response.data;
  },
};

// ============================================
// GRIEVANCE MANAGEMENT
// ============================================

export const grievanceService = {
  /**
   * Create grievance ticket
   */
  async createTicket(data: {
    investorId: string;
    category: string;
    subject: string;
    description: string;
    priority?: string;
  }): Promise<{ ticket: GrievanceTicket }> {
    const response: any = await apiClient.post('/grievances/create', data);
    return response.data;
  },

  /**
   * Get investor tickets
   */
  async getTickets(investorId: string): Promise<{ tickets: GrievanceTicket[] }> {
    const response: any = await apiClient.get(`/grievances/investor/${investorId}`);
    return response.data;
  },

  /**
   * Update ticket status
   */
  async updateTicket(ticketId: string, data: { status?: string; notes?: string }): Promise<{ ticket: GrievanceTicket }> {
    const response: any = await apiClient.put(`/grievances/${ticketId}`, data);
    return response.data;
  },
};

// ============================================
// ESG TRACKING
// ============================================

export const esgService = {
  /**
   * Get ESG metrics
   */
  async getESGMetrics(investorId: string): Promise<{ metrics: ESGMetrics }> {
    const response: any = await apiClient.get(`/esg/investor/${investorId}`);
    return response.data;
  },

  /**
   * Submit ESG data
   */
  async submitESGData(data: {
    investorId: string;
    bbid?: string;
    environmentData?: any;
    socialData?: any;
    governanceData?: any;
  }): Promise<{ metrics: ESGMetrics }> {
    const response: any = await apiClient.post('/esg/submit', data);
    return response.data;
  },
};

// ============================================
// FDI ANALYTICS
// ============================================

export const fdiService = {
  /**
   * Get FDI statistics
   */
  async getFDIStatistics(params?: {
    period?: string;
    sector?: string;
    country?: string;
  }): Promise<{ statistics: FDIStatistics }> {
    const response: any = await apiClient.get('/fdi/statistics', { params });
    return response.data;
  },

  /**
   * Get sector trends
   */
  async getSectorTrends(sector: string): Promise<{ trends: any }> {
    const response: any = await apiClient.get(`/fdi/sectors/${sector}/trends`);
    return response.data;
  },

  /**
   * Get country rankings
   */
  async getCountryRankings(): Promise<{ rankings: any[] }> {
    const response: any = await apiClient.get('/fdi/countries/rankings');
    return response.data;
  },
};

// ============================================
// ANALYTICS & REPORTING
// ============================================

export const analyticsService = {
  /**
   * Get investor dashboard analytics
   */
  async getInvestorAnalytics(investorId: string): Promise<{ analytics: any }> {
    const response: any = await apiClient.get(`/analytics/investor/${investorId}`);
    return response.data;
  },

  /**
   * Generate custom report
   */
  async generateReport(data: {
    type: string;
    filters?: any;
    format?: 'PDF' | 'EXCEL' | 'JSON';
  }): Promise<{ reportUrl: string }> {
    const response: any = await apiClient.post('/analytics/reports/generate', data);
    return response.data;
  },
};
