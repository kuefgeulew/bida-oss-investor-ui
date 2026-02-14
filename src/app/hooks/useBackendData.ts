// 🎣 BACKEND DATA HOOKS — React Query Integration
// PHASE 5: Real-time data fetching with caching, loading, and error states
// ARCHITECTURE: Replace all mock data calls with these hooks

import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import {
  bbidService,
  documentService,
  paymentService,
  workflowService,
  bankService,
  zoneService,
  incentiveService,
  certificateService,
  complianceService,
  ratingService,
  matchmakerService,
  rmService,
  grievanceService,
  esgService,
  fdiService,
  analyticsService,
  type BBIDRecord,
  type Document,
  type Payment,
  type Pipeline,
  type BankConnection,
  type ZoneRecommendation,
  type IncentiveEligibility,
  type Certificate,
  type ComplianceStatus,
  type ServiceRating,
  type SLAMetrics,
  type MatchmakerResult,
  type RMAssignment,
  type GrievanceTicket,
  type ESGMetrics,
  type FDIStatistics,
} from '@/api/enhancedServices';

// ============================================
// BBID QUERIES
// ============================================

/**
 * Hook to lookup BBID by ID
 */
export const useBBID = (bbid?: string, options?: UseQueryOptions<{ bbid: BBIDRecord | null }>) => {
  return useQuery({
    queryKey: ['bbid', bbid],
    queryFn: () => bbidService.lookupBBID(bbid!),
    enabled: !!bbid,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Hook to search BBIDs
 */
export const useSearchBBID = (
  query: { investorId?: string; businessName?: string; sector?: string },
  options?: UseQueryOptions<{ bbids: BBIDRecord[] }>
) => {
  return useQuery({
    queryKey: ['bbid-search', query],
    queryFn: () => bbidService.searchBBID(query),
    enabled: !!(query.investorId || query.businessName || query.sector),
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

/**
 * Mutation to generate BBID
 */
export const useGenerateBBID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bbidService.generateBBID,
    onSuccess: (data) => {
      // Invalidate search queries
      queryClient.invalidateQueries({ queryKey: ['bbid-search'] });
      // Set the new BBID in cache
      queryClient.setQueryData(['bbid', data.bbid.bbid], data);
    },
  });
};

/**
 * Mutation to update BBID
 */
export const useUpdateBBID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bbid, data }: { bbid: string; data: Partial<BBIDRecord> }) =>
      bbidService.updateBBID(bbid, data),
    onSuccess: (data, variables) => {
      // Update cache
      queryClient.setQueryData(['bbid', variables.bbid], data);
      queryClient.invalidateQueries({ queryKey: ['bbid-search'] });
    },
  });
};

// ============================================
// DOCUMENT QUERIES
// ============================================

/**
 * Hook to get documents by investor
 */
export const useDocuments = (investorId: string, options?: UseQueryOptions<{ documents: Document[] }>) => {
  return useQuery({
    queryKey: ['documents', investorId],
    queryFn: () => documentService.getDocuments(investorId),
    enabled: !!investorId,
    staleTime: 1 * 60 * 1000,
    ...options,
  });
};

/**
 * Hook to get single document
 */
export const useDocument = (documentId: string, options?: UseQueryOptions<{ document: Document }>) => {
  return useQuery({
    queryKey: ['document', documentId],
    queryFn: () => documentService.getDocumentById(documentId),
    enabled: !!documentId,
    ...options,
  });
};

/**
 * Mutation to upload document
 */
export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      file,
      metadata,
    }: {
      file: File;
      metadata: { investorId?: string; applicationId?: string; type: string; category: string };
    }) => documentService.uploadDocument(file, metadata),
    onSuccess: (data, variables) => {
      // Invalidate documents list
      if (variables.metadata.investorId) {
        queryClient.invalidateQueries({ queryKey: ['documents', variables.metadata.investorId] });
      }
    },
  });
};

/**
 * Mutation to delete document
 */
export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: documentService.deleteDocument,
    onSuccess: () => {
      // Invalidate all document queries
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};

/**
 * Mutation to process OCR
 */
export const useProcessOCR = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: documentService.processOCR,
    onSuccess: (data, documentId) => {
      // Invalidate the specific document
      queryClient.invalidateQueries({ queryKey: ['document', documentId] });
    },
  });
};

// ============================================
// PAYMENT QUERIES
// ============================================

/**
 * Hook to get payments
 */
export const usePayments = (
  params?: { userId?: string; investorId?: string; bbid?: string; status?: string },
  options?: UseQueryOptions<{ payments: Payment[] }>
) => {
  return useQuery({
    queryKey: ['payments', params],
    queryFn: () => paymentService.getPayments(params),
    staleTime: 30 * 1000, // 30 seconds (payments update frequently)
    ...options,
  });
};

/**
 * Hook to verify payment
 */
export const useVerifyPayment = (transactionId?: string, options?: UseQueryOptions<{ payment: Payment }>) => {
  return useQuery({
    queryKey: ['payment-verify', transactionId],
    queryFn: () => paymentService.verifyPayment(transactionId!),
    enabled: !!transactionId,
    refetchInterval: 5000, // Poll every 5 seconds
    ...options,
  });
};

/**
 * Mutation to initiate payment
 */
export const useInitiatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: paymentService.initiatePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};

// ============================================
// WORKFLOW QUERIES
// ============================================

/**
 * Hook to get approval pipeline
 */
export const usePipeline = (
  investorId: string,
  applicationId?: string,
  options?: UseQueryOptions<{ pipeline: Pipeline }>
) => {
  return useQuery({
    queryKey: ['pipeline', investorId, applicationId],
    queryFn: () => workflowService.getPipeline(investorId, applicationId),
    enabled: !!investorId,
    staleTime: 1 * 60 * 1000,
    ...options,
  });
};

/**
 * Mutation to update pipeline step
 */
export const useUpdatePipelineStep = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ stepId, data }: { stepId: string; data: { status: string; notes?: string } }) =>
      workflowService.updateStepStatus(stepId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pipeline'] });
    },
  });
};

// ============================================
// BANK QUERIES
// ============================================

/**
 * Hook to get bank connections
 */
export const useBankConnections = (investorId: string, options?: UseQueryOptions<{ connections: BankConnection[] }>) => {
  return useQuery({
    queryKey: ['bank-connections', investorId],
    queryFn: () => bankService.getBankConnections(investorId),
    enabled: !!investorId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Mutation to connect bank
 */
export const useConnectBank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bankService.connectBank,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bank-connections', variables.investorId] });
    },
  });
};

/**
 * Mutation to verify bank account
 */
export const useVerifyBankAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bankService.verifyBankAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bank-connections'] });
    },
  });
};

/**
 * Hook to get FX rate
 */
export const useFXRate = (
  from: string,
  to: string,
  amount: number,
  options?: UseQueryOptions<{ rate: number; convertedAmount: number }>
) => {
  return useQuery({
    queryKey: ['fx-rate', from, to, amount],
    queryFn: () => bankService.getFXRate(from, to, amount),
    enabled: !!(from && to && amount),
    staleTime: 60 * 1000, // 1 minute
    ...options,
  });
};

// ============================================
// ZONE QUERIES
// ============================================

/**
 * Hook to get zone recommendations
 */
export const useZoneRecommendations = (
  data: { investorId: string; sector: string; investmentAmount: number; preferences?: string[] },
  options?: UseQueryOptions<{ recommendations: ZoneRecommendation[] }>
) => {
  return useQuery({
    queryKey: ['zone-recommendations', data],
    queryFn: () => zoneService.getRecommendations(data),
    enabled: !!(data.investorId && data.sector && data.investmentAmount),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

/**
 * Hook to get zone details
 */
export const useZoneDetails = (zoneId: string, options?: UseQueryOptions<{ zone: any }>) => {
  return useQuery({
    queryKey: ['zone', zoneId],
    queryFn: () => zoneService.getZoneDetails(zoneId),
    enabled: !!zoneId,
    staleTime: 30 * 60 * 1000,
    ...options,
  });
};

// ============================================
// INCENTIVE QUERIES
// ============================================

/**
 * Hook to calculate incentive eligibility
 */
export const useIncentiveEligibility = (
  data: { investorId: string; bbid?: string; sector: string; investmentAmount: number; zone?: string },
  options?: UseQueryOptions<{ eligibility: IncentiveEligibility }>
) => {
  return useQuery({
    queryKey: ['incentive-eligibility', data],
    queryFn: () => incentiveService.calculateEligibility(data),
    enabled: !!(data.investorId && data.sector && data.investmentAmount),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Hook to get incentive applications
 */
export const useIncentiveApplications = (
  investorId: string,
  options?: UseQueryOptions<{ applications: any[] }>
) => {
  return useQuery({
    queryKey: ['incentive-applications', investorId],
    queryFn: () => incentiveService.getIncentiveApplications(investorId),
    enabled: !!investorId,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

/**
 * Mutation to apply for incentive
 */
export const useApplyForIncentive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: incentiveService.applyForIncentive,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['incentive-applications', variables.investorId] });
    },
  });
};

// ============================================
// CERTIFICATE QUERIES
// ============================================

/**
 * Hook to get certificates
 */
export const useCertificates = (investorId: string, options?: UseQueryOptions<{ certificates: Certificate[] }>) => {
  return useQuery({
    queryKey: ['certificates', investorId],
    queryFn: () => certificateService.getCertificates(investorId),
    enabled: !!investorId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Mutation to issue certificate
 */
export const useIssueCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: certificateService.issueCertificate,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['certificates', variables.investorId] });
    },
  });
};

/**
 * Hook to verify certificate
 */
export const useVerifyCertificate = (
  certificateNo?: string,
  options?: UseQueryOptions<{ valid: boolean; certificate?: Certificate }>
) => {
  return useQuery({
    queryKey: ['certificate-verify', certificateNo],
    queryFn: () => certificateService.verifyCertificate(certificateNo!),
    enabled: !!certificateNo,
    ...options,
  });
};

// ============================================
// COMPLIANCE QUERIES
// ============================================

/**
 * Hook to get compliance status
 */
export const useComplianceStatus = (
  investorId: string,
  options?: UseQueryOptions<{ compliance: ComplianceStatus }>
) => {
  return useQuery({
    queryKey: ['compliance', investorId],
    queryFn: () => complianceService.getComplianceStatus(investorId),
    enabled: !!investorId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Mutation to check compliance
 */
export const useCheckCompliance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ investorId, itemId }: { investorId: string; itemId: string }) =>
      complianceService.checkCompliance(investorId, itemId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['compliance', variables.investorId] });
    },
  });
};

// ============================================
// RATING & SLA QUERIES
// ============================================

/**
 * Mutation to submit rating
 */
export const useSubmitRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ratingService.submitRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sla-metrics'] });
    },
  });
};

/**
 * Hook to get SLA metrics
 */
export const useSLAMetrics = (serviceId: string, options?: UseQueryOptions<{ metrics: SLAMetrics }>) => {
  return useQuery({
    queryKey: ['sla-metrics', serviceId],
    queryFn: () => ratingService.getSLAMetrics(serviceId),
    enabled: !!serviceId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ============================================
// MATCHMAKER QUERIES
// ============================================

/**
 * Hook to find partner matches
 */
export const useMatchmaker = (
  data: { investorId: string; sector: string; partnerType?: string; location?: string },
  options?: UseQueryOptions<{ matches: MatchmakerResult }>
) => {
  return useQuery({
    queryKey: ['matchmaker', data],
    queryFn: () => matchmakerService.findMatches(data),
    enabled: !!(data.investorId && data.sector),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

/**
 * Mutation to request partner connection
 */
export const useRequestConnection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ investorId, partnerId }: { investorId: string; partnerId: string }) =>
      matchmakerService.requestConnection(investorId, partnerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matchmaker'] });
    },
  });
};

// ============================================
// RM QUERIES
// ============================================

/**
 * Hook to get assigned RM
 */
export const useAssignedRM = (investorId: string, options?: UseQueryOptions<{ rm: RMAssignment | null }>) => {
  return useQuery({
    queryKey: ['rm', investorId],
    queryFn: () => rmService.getAssignedRM(investorId),
    enabled: !!investorId,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

/**
 * Mutation to request RM
 */
export const useRequestRM = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rmService.requestRM,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['rm', variables.investorId], data);
    },
  });
};

// ============================================
// GRIEVANCE QUERIES
// ============================================

/**
 * Hook to get grievance tickets
 */
export const useGrievanceTickets = (
  investorId: string,
  options?: UseQueryOptions<{ tickets: GrievanceTicket[] }>
) => {
  return useQuery({
    queryKey: ['grievances', investorId],
    queryFn: () => grievanceService.getTickets(investorId),
    enabled: !!investorId,
    staleTime: 1 * 60 * 1000,
    ...options,
  });
};

/**
 * Mutation to create grievance ticket
 */
export const useCreateGrievance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: grievanceService.createTicket,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['grievances', variables.investorId] });
    },
  });
};

/**
 * Mutation to update grievance ticket
 */
export const useUpdateGrievance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ticketId, data }: { ticketId: string; data: { status?: string; notes?: string } }) =>
      grievanceService.updateTicket(ticketId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grievances'] });
    },
  });
};

// ============================================
// ESG QUERIES
// ============================================

/**
 * Hook to get ESG metrics
 */
export const useESGMetrics = (investorId: string, options?: UseQueryOptions<{ metrics: ESGMetrics }>) => {
  return useQuery({
    queryKey: ['esg', investorId],
    queryFn: () => esgService.getESGMetrics(investorId),
    enabled: !!investorId,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

/**
 * Mutation to submit ESG data
 */
export const useSubmitESGData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: esgService.submitESGData,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['esg', variables.investorId], data);
    },
  });
};

// ============================================
// FDI ANALYTICS QUERIES
// ============================================

/**
 * Hook to get FDI statistics
 */
export const useFDIStatistics = (
  params?: { period?: string; sector?: string; country?: string },
  options?: UseQueryOptions<{ statistics: FDIStatistics }>
) => {
  return useQuery({
    queryKey: ['fdi-statistics', params],
    queryFn: () => fdiService.getFDIStatistics(params),
    staleTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  });
};

/**
 * Hook to get sector trends
 */
export const useSectorTrends = (sector: string, options?: UseQueryOptions<{ trends: any }>) => {
  return useQuery({
    queryKey: ['sector-trends', sector],
    queryFn: () => fdiService.getSectorTrends(sector),
    enabled: !!sector,
    staleTime: 15 * 60 * 1000,
    ...options,
  });
};

// ============================================
// ANALYTICS QUERIES
// ============================================

/**
 * Hook to get investor analytics
 */
export const useInvestorAnalytics = (investorId: string, options?: UseQueryOptions<{ analytics: any }>) => {
  return useQuery({
    queryKey: ['investor-analytics', investorId],
    queryFn: () => analyticsService.getInvestorAnalytics(investorId),
    enabled: !!investorId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Mutation to generate report
 */
export const useGenerateReport = () => {
  return useMutation({
    mutationFn: analyticsService.generateReport,
  });
};

// ============================================
// UTILITY HOOKS
// ============================================

/**
 * Hook to invalidate all queries (useful for logout/refresh)
 */
export const useInvalidateAll = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries();
};

/**
 * Hook to prefetch data (useful for optimistic navigation)
 */
export const usePrefetchData = () => {
  const queryClient = useQueryClient();
  
  return {
    prefetchDocuments: (investorId: string) =>
      queryClient.prefetchQuery({
        queryKey: ['documents', investorId],
        queryFn: () => documentService.getDocuments(investorId),
      }),
    prefetchPayments: (investorId: string) =>
      queryClient.prefetchQuery({
        queryKey: ['payments', { investorId }],
        queryFn: () => paymentService.getPayments({ investorId }),
      }),
    prefetchPipeline: (investorId: string) =>
      queryClient.prefetchQuery({
        queryKey: ['pipeline', investorId],
        queryFn: () => workflowService.getPipeline(investorId),
      }),
  };
};
