// API Layer - Handles backend communication endpoints
import { 
  InvestorProfile, 
  ApprovalStep, 
  SEZZone, 
  Plot, 
  AuditLog,
  mockInvestors,
  approvalSteps,
  sezZones,
  availablePlots,
  auditLogs,
  rjscCompanies,
  fdiStatistics,
  bankServices,
  utilityServices,
  hsCodeDatabase,
  matchmakingOpportunities
} from '@/app/data/mockData';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// API Response type
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

// Investor APIs
export const investorAPI = {
  // Get all investors
  async getAll(): Promise<APIResponse<InvestorProfile[]>> {
    await delay(300);
    return {
      success: true,
      data: mockInvestors,
      timestamp: new Date().toISOString()
    };
  },

  // Get investor by ID
  async getById(id: string): Promise<APIResponse<InvestorProfile>> {
    await delay(200);
    const investor = mockInvestors.find(inv => inv.id === id);
    
    if (!investor) {
      return {
        success: false,
        error: 'Investor not found',
        timestamp: new Date().toISOString()
      };
    }

    return {
      success: true,
      data: investor,
      timestamp: new Date().toISOString()
    };
  },

  // Create new investor
  async create(data: Partial<InvestorProfile>): Promise<APIResponse<InvestorProfile>> {
    await delay(800);
    
    const newInvestor: InvestorProfile = {
      id: `inv-${Date.now()}`,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      nationality: data.nationality || '',
      companyName: data.companyName || '',
      sector: data.sector || '',
      investmentAmount: data.investmentAmount || 0,
      registrationDate: new Date().toISOString(),
      status: 'pending',
      kycStatus: 'pending',
      documents: []
    };

    mockInvestors.push(newInvestor);

    return {
      success: true,
      data: newInvestor,
      timestamp: new Date().toISOString()
    };
  },

  // Update investor
  async update(id: string, data: Partial<InvestorProfile>): Promise<APIResponse<InvestorProfile>> {
    await delay(600);
    
    const index = mockInvestors.findIndex(inv => inv.id === id);
    if (index === -1) {
      return {
        success: false,
        error: 'Investor not found',
        timestamp: new Date().toISOString()
      };
    }

    mockInvestors[index] = { ...mockInvestors[index], ...data };

    return {
      success: true,
      data: mockInvestors[index],
      timestamp: new Date().toISOString()
    };
  }
};

// Approval Steps APIs
export const stepsAPI = {
  async getAll(): Promise<APIResponse<ApprovalStep[]>> {
    await delay(300);
    return {
      success: true,
      data: approvalSteps,
      timestamp: new Date().toISOString()
    };
  },

  async getById(id: string): Promise<APIResponse<ApprovalStep>> {
    await delay(200);
    const step = approvalSteps.find(s => s.id === id);
    
    if (!step) {
      return {
        success: false,
        error: 'Step not found',
        timestamp: new Date().toISOString()
      };
    }

    return {
      success: true,
      data: step,
      timestamp: new Date().toISOString()
    };
  },

  async updateStatus(id: string, status: ApprovalStep['status']): Promise<APIResponse<ApprovalStep>> {
    await delay(500);
    
    const index = approvalSteps.findIndex(s => s.id === id);
    if (index === -1) {
      return {
        success: false,
        error: 'Step not found',
        timestamp: new Date().toISOString()
      };
    }

    approvalSteps[index].status = status;
    if (status === 'completed') {
      approvalSteps[index].completionDate = new Date().toISOString();
    }

    return {
      success: true,
      data: approvalSteps[index],
      timestamp: new Date().toISOString()
    };
  }
};

// SEZ/Zone APIs
export const zoneAPI = {
  async getAll(): Promise<APIResponse<SEZZone[]>> {
    await delay(300);
    return {
      success: true,
      data: sezZones,
      timestamp: new Date().toISOString()
    };
  },

  async getById(id: string): Promise<APIResponse<SEZZone>> {
    await delay(200);
    const zone = sezZones.find(z => z.id === id);
    
    if (!zone) {
      return {
        success: false,
        error: 'Zone not found',
        timestamp: new Date().toISOString()
      };
    }

    return {
      success: true,
      data: zone,
      timestamp: new Date().toISOString()
    };
  },

  async getPlots(zoneId: string): Promise<APIResponse<Plot[]>> {
    await delay(300);
    const plots = availablePlots.filter(p => p.zoneId === zoneId);
    
    return {
      success: true,
      data: plots,
      timestamp: new Date().toISOString()
    };
  }
};

// Bank Services APIs
export const bankAPI = {
  async getServices(): Promise<APIResponse<typeof bankServices>> {
    await delay(300);
    return {
      success: true,
      data: bankServices,
      timestamp: new Date().toISOString()
    };
  },

  async requestService(bankId: string, investorId: string): Promise<APIResponse<{ requestId: string }>> {
    await delay(700);
    
    return {
      success: true,
      data: {
        requestId: `breq-${Date.now()}`
      },
      timestamp: new Date().toISOString()
    };
  }
};

// Utility Services APIs
export const utilityAPI = {
  async getServices(): Promise<APIResponse<typeof utilityServices>> {
    await delay(300);
    return {
      success: true,
      data: utilityServices,
      timestamp: new Date().toISOString()
    };
  },

  async requestConnection(utilityId: string, investorId: string): Promise<APIResponse<{ requestId: string }>> {
    await delay(700);
    
    return {
      success: true,
      data: {
        requestId: `ureq-${Date.now()}`
      },
      timestamp: new Date().toISOString()
    };
  }
};

// RJSC Company Verification API
export const rjscAPI = {
  async checkCompanyName(name: string): Promise<APIResponse<{
    available: boolean;
    existingCompany?: typeof rjscCompanies[0];
    suggestions?: string[];
  }>> {
    await delay(600);
    
    const existing = rjscCompanies.find(
      company => company.name.toLowerCase() === name.toLowerCase()
    );

    if (existing) {
      return {
        success: true,
        data: {
          available: false,
          existingCompany: existing
        },
        timestamp: new Date().toISOString()
      };
    }

    return {
      success: true,
      data: {
        available: true,
        suggestions: [
          `${name} Limited`,
          `${name} Bangladesh`,
          `${name} Industries Ltd`
        ]
      },
      timestamp: new Date().toISOString()
    };
  },

  async registerCompany(data: {
    name: string;
    directors: string[];
    sector: string;
  }): Promise<APIResponse<{ registrationNo: string; certificate: string }>> {
    await delay(1500);
    
    return {
      success: true,
      data: {
        registrationNo: `C-${Math.floor(100000 + Math.random() * 900000)}`,
        certificate: `RJSC-CERT-${Date.now()}`
      },
      timestamp: new Date().toISOString()
    };
  }
};

// NBR TIN Verification API
export const nbrAPI = {
  async verifyTIN(tin: string): Promise<APIResponse<{
    valid: boolean;
    holderName?: string;
    status?: string;
  }>> {
    await delay(500);
    
    // Simple validation: TIN should be 12 digits
    if (tin.length !== 12 || !/^\d+$/.test(tin)) {
      return {
        success: true,
        data: {
          valid: false
        },
        timestamp: new Date().toISOString()
      };
    }

    return {
      success: true,
      data: {
        valid: true,
        holderName: 'Verified Taxpayer',
        status: 'Active'
      },
      timestamp: new Date().toISOString()
    };
  },

  async registerTIN(data: {
    investorId: string;
    companyName: string;
  }): Promise<APIResponse<{ tin: string }>> {
    await delay(1000);
    
    return {
      success: true,
      data: {
        tin: Math.floor(100000000000 + Math.random() * 900000000000).toString()
      },
      timestamp: new Date().toISOString()
    };
  }
};

// HS Code Lookup API
export const hsCodeAPI = {
  async search(query: string): Promise<APIResponse<typeof hsCodeDatabase>> {
    await delay(400);
    
    const results = hsCodeDatabase.filter(
      item => 
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.code.includes(query) ||
        item.sector.toLowerCase().includes(query.toLowerCase())
    );

    return {
      success: true,
      data: results,
      timestamp: new Date().toISOString()
    };
  },

  async getByCode(code: string): Promise<APIResponse<typeof hsCodeDatabase[0]>> {
    await delay(300);
    
    const item = hsCodeDatabase.find(h => h.code === code);
    
    if (!item) {
      return {
        success: false,
        error: 'HS Code not found',
        timestamp: new Date().toISOString()
      };
    }

    return {
      success: true,
      data: item,
      timestamp: new Date().toISOString()
    };
  }
};

// FDI Statistics API
export const fdiAPI = {
  async getStatistics(filters?: {
    year?: number;
    sector?: string;
  }): Promise<APIResponse<typeof fdiStatistics>> {
    await delay(400);
    
    let data = [...fdiStatistics];
    
    if (filters?.year) {
      data = data.filter(stat => stat.year === filters.year);
    }
    
    if (filters?.sector) {
      data = data.filter(stat => 
        stat.sector.toLowerCase().includes(filters.sector!.toLowerCase())
      );
    }

    return {
      success: true,
      data,
      timestamp: new Date().toISOString()
    };
  }
};

// Audit Log API
export const auditAPI = {
  async getLogs(filters?: {
    entityId?: string;
    actor?: string;
    limit?: number;
  }): Promise<APIResponse<AuditLog[]>> {
    await delay(300);
    
    let logs = [...auditLogs].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    if (filters?.entityId) {
      logs = logs.filter(log => log.entity.includes(filters.entityId!));
    }

    if (filters?.actor) {
      logs = logs.filter(log => log.actor.includes(filters.actor!));
    }

    if (filters?.limit) {
      logs = logs.slice(0, filters.limit);
    }

    return {
      success: true,
      data: logs,
      timestamp: new Date().toISOString()
    };
  },

  async createLog(log: Omit<AuditLog, 'id' | 'timestamp'>): Promise<APIResponse<AuditLog>> {
    await delay(200);
    
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...log
    };

    auditLogs.push(newLog);

    return {
      success: true,
      data: newLog,
      timestamp: new Date().toISOString()
    };
  }
};

// Matchmaking API
export const matchmakingAPI = {
  async getOpportunities(filters?: {
    sector?: string;
    minInvestment?: number;
    maxInvestment?: number;
  }): Promise<APIResponse<typeof matchmakingOpportunities>> {
    await delay(400);
    
    let opportunities = [...matchmakingOpportunities];
    
    if (filters?.sector) {
      opportunities = opportunities.filter(opp => 
        opp.sector.toLowerCase().includes(filters.sector!.toLowerCase())
      );
    }

    if (filters?.minInvestment) {
      opportunities = opportunities.filter(opp => 
        opp.investmentRequired >= filters.minInvestment!
      );
    }

    if (filters?.maxInvestment) {
      opportunities = opportunities.filter(opp => 
        opp.investmentRequired <= filters.maxInvestment!
      );
    }

    return {
      success: true,
      data: opportunities,
      timestamp: new Date().toISOString()
    };
  }
};

// Payment API (SSLCommerz Simulation)
export const paymentAPI = {
  async initiatePayment(data: {
    amount: number;
    currency: string;
    description: string;
    investorId: string;
  }): Promise<APIResponse<{
    sessionId: string;
    gatewayUrl: string;
    status: 'pending';
  }>> {
    await delay(800);
    
    return {
      success: true,
      data: {
        sessionId: `ssl-${Date.now()}`,
        gatewayUrl: '#', // In real implementation, this would be SSLCommerz URL
        status: 'pending'
      },
      timestamp: new Date().toISOString()
    };
  },

  async verifyPayment(sessionId: string): Promise<APIResponse<{
    status: 'success' | 'failed' | 'pending';
    transactionId?: string;
    amount?: number;
  }>> {
    await delay(600);
    
    // Simulate successful payment
    return {
      success: true,
      data: {
        status: 'success',
        transactionId: `TXN-${Date.now()}`,
        amount: 50000
      },
      timestamp: new Date().toISOString()
    };
  }
};

// Document API
export const documentAPI = {
  async upload(file: File, metadata: {
    investorId: string;
    type: string;
    stepId?: string;
  }): Promise<APIResponse<{
    documentId: string;
    url: string;
  }>> {
    await delay(1200);
    
    return {
      success: true,
      data: {
        documentId: `doc-${Date.now()}`,
        url: `/documents/${metadata.investorId}/${file.name}`
      },
      timestamp: new Date().toISOString()
    };
  },

  async getByInvestor(investorId: string): Promise<APIResponse<any[]>> {
    await delay(300);
    
    const investor = mockInvestors.find(inv => inv.id === investorId);
    
    return {
      success: true,
      data: investor?.documents || [],
      timestamp: new Date().toISOString()
    };
  }
};

// Export all APIs
export const API = {
  investor: investorAPI,
  steps: stepsAPI,
  zone: zoneAPI,
  bank: bankAPI,
  utility: utilityAPI,
  rjsc: rjscAPI,
  nbr: nbrAPI,
  hsCode: hsCodeAPI,
  fdi: fdiAPI,
  audit: auditAPI,
  matchmaking: matchmakingAPI,
  payment: paymentAPI,
  document: documentAPI
};