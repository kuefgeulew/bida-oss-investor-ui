// 📚 BACKEND INTEGRATION EXAMPLE
// PHASE 5: Complete example showing mock-to-real migration
// USE THIS: As a reference when migrating your own features

import { useState } from 'react';
import { 
  useDocuments, 
  useUploadDocument, 
  useDeleteDocument,
  useBBID,
  useGenerateBBID,
  usePayments,
  useInitiatePayment,
  usePipeline
} from '@/app/hooks/useBackendData';
import { Upload, Trash2, FileText, CheckCircle, Loader2, AlertCircle, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

// ============================================
// EXAMPLE 1: DOCUMENT VAULT (Full CRUD)
// ============================================

export function DocumentVaultExample({ investorId }: { investorId: string }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // ✅ QUERY: Fetch documents
  const { data, isLoading, isError, error, refetch } = useDocuments(investorId);
  
  // ✅ MUTATION: Upload document
  const uploadMutation = useUploadDocument();
  
  // ✅ MUTATION: Delete document
  const deleteMutation = useDeleteDocument();

  const documents = data?.documents || [];

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await uploadMutation.mutateAsync({
        file: selectedFile,
        metadata: {
          investorId,
          type: selectedFile.name,
          category: 'OTHER'
        }
      });
      
      setSelectedFile(null);
      // React Query automatically refetches after mutation!
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleDelete = async (documentId: string) => {
    if (!confirm('Delete this document?')) return;
    
    try {
      await deleteMutation.mutateAsync(documentId);
      // React Query automatically refetches!
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="p-8 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <p className="text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (isError) {
    return (
      <div className="p-8 bg-red-50 rounded-xl border border-red-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">Failed to load documents</p>
            <p className="text-sm text-red-700 mt-1">{error?.message}</p>
            <button 
              onClick={() => refetch()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SUCCESS STATE
  return (
    <div className="p-8 bg-white rounded-xl border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Document Vault</h2>

      {/* Upload Section */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-4">
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="flex-1 text-sm"
            disabled={uploadMutation.isPending}
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploadMutation.isPending}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {uploadMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload
              </>
            )}
          </button>
        </div>
        {uploadMutation.isError && (
          <p className="text-sm text-red-600 mt-2">
            Upload failed: {uploadMutation.error?.message}
          </p>
        )}
      </div>

      {/* Documents List */}
      {documents.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No documents uploaded yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{doc.name}</p>
                  <p className="text-sm text-gray-500">
                    {doc.category} • {(doc.size / 1024).toFixed(0)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(doc.id)}
                disabled={deleteMutation.isPending}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <p className="text-sm text-gray-500 mt-6">
        ✅ Using real API: {data?.documents.length} documents from database
      </p>
    </div>
  );
}

// ============================================
// EXAMPLE 2: BBID REGISTRATION
// ============================================

export function BBIDRegistrationExample({ investorId }: { investorId: string }) {
  // ✅ QUERY: Check if BBID exists
  const { data: searchResult, isLoading: isSearching } = useDocuments(investorId);
  
  // ✅ MUTATION: Generate BBID
  const generateMutation = useGenerateBBID();

  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'FOREIGN' as const,
    sector: 'Technology',
    division: 'Dhaka',
    district: 'Dhaka'
  });

  const handleGenerate = async () => {
    try {
      const result = await generateMutation.mutateAsync({
        investorId,
        ...formData
      });
      
      alert(`BBID Generated: ${result.bbid.bbid}`);
    } catch (err) {
      console.error('BBID generation failed:', err);
    }
  };

  return (
    <div className="p-8 bg-white rounded-xl border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">BBID Registration</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter business name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sector
          </label>
          <select
            value={formData.sector}
            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option>Technology</option>
            <option>Manufacturing</option>
            <option>Healthcare</option>
            <option>Agriculture</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!formData.businessName || generateMutation.isPending}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {generateMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating BBID...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Generate BBID
            </>
          )}
        </button>

        {generateMutation.isError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              {generateMutation.error?.message}
            </p>
          </div>
        )}

        {generateMutation.isSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium">
              ✅ BBID Generated: {generateMutation.data.bbid.bbid}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 3: PAYMENT DASHBOARD
// ============================================

export function PaymentDashboardExample({ investorId }: { investorId: string }) {
  // ✅ QUERY: Fetch payments
  const { data, isLoading } = usePayments({ investorId });
  
  // ✅ MUTATION: Initiate payment
  const paymentMutation = useInitiatePayment();

  const payments = data?.payments || [];
  const pendingPayments = payments.filter(p => p.status === 'PENDING');
  const completedPayments = payments.filter(p => p.status === 'COMPLETED');

  const handlePay = async (serviceName: string, amount: number) => {
    try {
      const result = await paymentMutation.mutateAsync({
        userId: investorId,
        investorId,
        serviceName,
        amount,
        method: 'BKASH',
        gateway: 'bkash'
      });

      if (result.paymentUrl) {
        window.open(result.paymentUrl, '_blank');
      }
    } catch (err) {
      console.error('Payment failed:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 bg-white rounded-xl border border-gray-200">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-xl border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-amber-600" />
            <div>
              <p className="text-2xl font-bold text-amber-900">
                {pendingPayments.length}
              </p>
              <p className="text-sm text-amber-700">Pending Payments</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-900">
                {completedPayments.length}
              </p>
              <p className="text-sm text-green-700">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Payments */}
      {pendingPayments.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Pending Payments</h3>
          <div className="space-y-3">
            {pendingPayments.map(payment => (
              <div key={payment.id} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{payment.serviceName}</p>
                    <p className="text-sm text-gray-600">
                      {payment.amount.toLocaleString()} {payment.currency}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePay(payment.serviceName, payment.amount)}
                    disabled={paymentMutation.isPending}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-sm text-gray-500">
        ✅ Real-time payment data from API
      </p>
    </div>
  );
}

// ============================================
// EXAMPLE 4: APPROVAL PIPELINE TRACKER
// ============================================

export function PipelineTrackerExample({ investorId }: { investorId: string }) {
  // ✅ QUERY: Fetch pipeline
  const { data, isLoading } = usePipeline(investorId);

  const pipeline = data?.pipeline;

  if (isLoading) {
    return (
      <div className="p-8 bg-white rounded-xl border border-gray-200">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
      </div>
    );
  }

  if (!pipeline) {
    return (
      <div className="p-8 bg-gray-50 rounded-xl border border-gray-200 text-center">
        <p className="text-gray-600">No active applications</p>
      </div>
    );
  }

  const progressPercent = Math.round((pipeline.completedSteps / pipeline.totalSteps) * 100);

  return (
    <div className="p-8 bg-white rounded-xl border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Approval Pipeline</h2>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700">Overall Progress</p>
          <p className="text-sm font-bold text-blue-600">{progressPercent}%</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {pipeline.completedSteps} of {pipeline.totalSteps} steps completed
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {pipeline.steps.map((step) => (
          <div 
            key={step.id}
            className={`p-4 rounded-lg border ${
              step.status === 'COMPLETED' ? 'bg-green-50 border-green-200' :
              step.status === 'IN_PROGRESS' ? 'bg-blue-50 border-blue-200' :
              'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {step.status === 'COMPLETED' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : step.status === 'IN_PROGRESS' ? (
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              )}
              <div className="flex-1">
                <p className="font-medium text-gray-900">{step.name}</p>
                <p className="text-sm text-gray-600">{step.agency}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                step.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                step.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {step.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-6">
        ✅ Live pipeline data from workflow engine
      </p>
    </div>
  );
}

// ============================================
// DEMO PAGE: All Examples Together
// ============================================

export function BackendIntegrationDemo() {
  const investorId = 'demo-investor-123'; // In real app, get from auth context

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Phase 5: Backend Integration Examples
          </h1>
          <p className="text-gray-600">
            Real API integration with React Query - Replace your mock data with these patterns
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DocumentVaultExample investorId={investorId} />
          <BBIDRegistrationExample investorId={investorId} />
          <PaymentDashboardExample investorId={investorId} />
          <PipelineTrackerExample investorId={investorId} />
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="font-bold text-blue-900 mb-2">✅ Integration Complete</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• React Query handles caching & refetching automatically</li>
            <li>• Loading & error states managed consistently</li>
            <li>• Mutations auto-invalidate related queries</li>
            <li>• Real-time data synced across components</li>
            <li>• Optimistic updates for better UX</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
