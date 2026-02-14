import apiClient from './client';

// ============================================
// TYPES
// ============================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'INVESTOR' | 'OFFICER' | 'ADMIN' | 'SUPER_ADMIN';
  phone?: string;
  avatar?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
}

export interface InvestorProfile {
  id: string;
  userId: string;
  businessName: string;
  businessType: 'LOCAL' | 'FOREIGN' | 'JOINT_VENTURE';
  sector: string;
  investmentAmount: number;
  numberOfEmployees?: number;
  division: string;
  district: string;
  upazila: string;
  address?: string;
  registrationNumber?: string;
  tinNumber?: string;
  vatNumber?: string;
  binNumber?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  completionPercent: number;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  applicationNo: string;
  investorId: string;
  profileId: string;
  type: string;
  agency: 'BIDA' | 'BEZA' | 'BEPZA' | 'BHTPA' | 'BSCIC' | 'PPPA';
  title: string;
  description?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'DELAYED' | 'CANCELLED';
  currentStep: number;
  totalSteps: number;
  submittedAt: string;
  slaDeadline: string;
  completedAt?: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  isUrgent: boolean;
  isFastTrack: boolean;
  createdAt: string;
  updatedAt: string;
  assignedOfficer?: {
    id: string;
    name: string;
    email: string;
  };
  approvalSteps?: ApprovalStep[];
}

export interface ApprovalStep {
  id: string;
  applicationId: string;
  stepNumber: number;
  name: string;
  agency: string;
  department?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED' | 'SKIPPED';
  startDate?: string;
  completedDate?: string;
  slaDeadline: string;
  assignedTo?: string;
  assignedOfficer?: string;
  notes?: string;
  rejectionReason?: string;
  requirements?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'APPLICATION_STATUS' | 'PAYMENT' | 'DOCUMENT' | 'APPOINTMENT' | 'SLA_ALERT';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  readAt?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  agency: string;
  category: string;
  requirements?: string;
  documents: string[];
  fee?: number;
  currency: string;
  processingTime?: string;
  sla?: number;
  isActive: boolean;
}

// ============================================
// AUTHENTICATION
// ============================================

export const authService = {
  async register(data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    role?: string;
  }): Promise<{ user: User; token: string }> {
    const response: any = await apiClient.post('/auth/register', data);
    return response.data;
  },

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response: any = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  async logout(): Promise<void> {
    // Use global logout to ensure ALL storage is cleared
    // ⚡ FAST LOGOUT: Instant with zero delay
    // Dynamic import to avoid circular dependencies
    const { fastLogout } = await import('@/app/auth/logout');
    fastLogout();
  },

  async getCurrentUser(): Promise<{ user: User }> {
    const response: any = await apiClient.get('/auth/me');
    return response.data;
  },

  async refreshToken(token: string): Promise<{ token: string }> {
    const response: any = await apiClient.post('/auth/refresh', { token });
    return response.data;
  },
};

// ============================================
// PROFILES
// ============================================

export const profileService = {
  async getMyProfile(): Promise<{ profile: InvestorProfile | null }> {
    const response: any = await apiClient.get('/profiles/me');
    return response.data;
  },

  async createProfile(data: Partial<InvestorProfile>): Promise<{ profile: InvestorProfile }> {
    const response: any = await apiClient.post('/profiles', data);
    return response.data;
  },

  async updateProfile(data: Partial<InvestorProfile>): Promise<{ profile: InvestorProfile }> {
    const response: any = await apiClient.put('/profiles/me', data);
    return response.data;
  },

  async getProfileById(id: string): Promise<{ profile: InvestorProfile }> {
    const response: any = await apiClient.get(`/profiles/${id}`);
    return response.data;
  },
};

// ============================================
// APPLICATIONS
// ============================================

export const applicationService = {
  async getApplications(params?: {
    status?: string;
    agency?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    applications: Application[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  }> {
    const response: any = await apiClient.get('/applications', { params });
    return response.data;
  },

  async getApplicationById(id: string): Promise<{ application: Application }> {
    const response: any = await apiClient.get(`/applications/${id}`);
    return response.data;
  },

  async createApplication(data: {
    type: string;
    agency: string;
    title: string;
    description?: string;
    totalSteps?: number;
  }): Promise<{ application: Application }> {
    const response: any = await apiClient.post('/applications', data);
    return response.data;
  },

  async updateApplication(id: string, data: Partial<Application>): Promise<{ application: Application }> {
    const response: any = await apiClient.put(`/applications/${id}`, data);
    return response.data;
  },

  async updateApplicationStatus(
    id: string,
    data: {
      status: string;
      notes?: string;
      assignedOfficerId?: string;
    }
  ): Promise<{ application: Application }> {
    const response: any = await apiClient.put(`/applications/${id}/status`, data);
    return response.data;
  },
};

// ============================================
// NOTIFICATIONS
// ============================================

export const notificationService = {
  async getNotifications(params?: { read?: boolean }): Promise<{
    notifications: Notification[];
    unreadCount: number;
  }> {
    const response: any = await apiClient.get('/notifications', { params });
    return response.data;
  },

  async markAsRead(id: string): Promise<void> {
    await apiClient.put(`/notifications/${id}/read`);
  },

  async clearNotifications(): Promise<void> {
    await apiClient.delete('/notifications');
  },
};

// ============================================
// SERVICES
// ============================================

export const serviceService = {
  async getServices(params?: { category?: string; agency?: string }): Promise<{ services: Service[] }> {
    const response: any = await apiClient.get('/services', { params });
    return response.data;
  },

  async getServiceById(id: string): Promise<{ service: Service }> {
    const response: any = await apiClient.get(`/services/${id}`);
    return response.data;
  },
};

// ============================================
// TRANSPARENCY (Public)
// ============================================

export const transparencyService = {
  async getStats(): Promise<{
    totalApplications: number;
    approvedApplications: number;
    totalInvestors: number;
    totalInvestmentAmount: number;
  }> {
    const response: any = await apiClient.get('/transparency/stats');
    return response.data;
  },

  async getAgencyPerformance(): Promise<{
    agencies: Array<{
      agency: string;
      totalApplications: number;
      approvedApplications: number;
      approvalRate: number;
    }>;
  }> {
    const response: any = await apiClient.get('/transparency/agencies');
    return response.data;
  },
};