import { getPipeline, generateApprovalPipeline, getMissingDocuments } from '@/app/gov-agencies/agencyWorkflowEngine';
import { getServiceById } from '@/app/gov-agencies/agencyRegistry';
import { CertificateViewer } from '@/app/certificates/CertificateViewer';
import { getAllPayments } from '@/app/payments/paymentEngine';
import { FileText, Upload, Download, Eye, Trash2, Search, Filter, CheckCircle2, AlertCircle, Clock, ChevronRight, Building2, XCircle, Calendar, Folder } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BankBadge } from '@/app/bank-integration/BankBadge';
import { InstrumentCard, InstrumentSection } from './DesignSystem';
import { QRCertificateVerification } from '@/app/intelligence/QRCertificateVerification'; // 🔍 FIX 4: QR Verification

interface DocumentVaultProps {
  investorId: string;
}

// Document type definition
interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'approved' | 'pending' | 'rejected';
  approvedBy?: string;
  size?: string;
  url?: string;
  bankDocument?: boolean;
}

// Helper function to check if document is from bank integration
function isBankDocument(doc: Document): boolean {
  return doc.bankDocument === true || doc.type === 'Bank Integration';
}

// Helper function to generate bank documents
function generateBankDocuments(investorId: string): Document[] {
  return [
    {
      id: 'bank-001',
      name: '🏦 Bank Account Verification',
      type: 'Bank Integration',
      uploadDate: new Date().toISOString(),
      status: 'approved',
      approvedBy: 'Bank Integration System',
      bankDocument: true
    },
    {
      id: 'bank-002',
      name: '🏦 Financial Readiness Certificate',
      type: 'Bank Integration',
      uploadDate: new Date().toISOString(),
      status: 'approved',
      approvedBy: 'Bank Integration System',
      bankDocument: true
    }
  ];
}

// Mock API for document upload
const API = {
  document: {
    upload: async (file: File, options: any) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        data: {
          documentId: `doc-${Date.now()}`,
          url: `/documents/${file.name}`
        }
      };
    }
  }
};

// Stub components for enhancements
function DocumentChecklist({ currentStep }: { currentStep: string }) {
  return (
    <div className="p-6 rounded-xl border border-[#e3ebf7] bg-white">
      <h3 className="font-semibold mb-2">Document Checklist</h3>
      <p className="text-sm text-gray-600">Current step: {currentStep}</p>
    </div>
  );
}

function ExpiryPrediction() {
  return (
    <div className="p-6 rounded-xl border border-[#e3ebf7] bg-white">
      <h3 className="font-semibold mb-2">Expiry Prediction</h3>
      <p className="text-sm text-gray-600">No expiring documents</p>
    </div>
  );
}

function VersionHistory() {
  return (
    <div className="p-6 rounded-xl border border-[#e3ebf7] bg-white">
      <h3 className="font-semibold mb-2">Version History</h3>
      <p className="text-sm text-gray-600">Track document versions</p>
    </div>
  );
}

function DocumentUsage() {
  return (
    <div className="p-6 rounded-xl border border-[#e3ebf7] bg-white">
      <h3 className="font-semibold mb-2">Document Usage</h3>
      <p className="text-sm text-gray-600">View how documents are used</p>
    </div>
  );
}

const documentCategories = [
  { id: 'identity', name: 'Identity Documents', icon: FileText, color: 'blue' },
  { id: 'legal', name: 'Legal Documents', icon: FileText, color: 'purple' },
  { id: 'financial', name: 'Financial Documents', icon: FileText, color: 'emerald' },
  { id: 'business', name: 'Business Plan', icon: FileText, color: 'orange' },
  { id: 'compliance', name: 'Compliance & Clearances', icon: FileText, color: 'red' },
  { id: 'other', name: 'Other Documents', icon: FileText, color: 'gray' }
];

const documentTypes = [
  'Passport Copy',
  'National ID',
  'Company Certificate',
  'Trade License',
  'Bank Statement',
  'Investment Proposal',
  'Environmental Clearance',
  'Fire License',
  'Tax Certificate',
  'Work Permit',
  'Memorandum of Association',
  'Board Resolution',
  'Other'
];

export function DocumentVault({ investorId }: DocumentVaultProps) {
  // 🏦 Generate bank documents dynamically
  const bankDocuments = generateBankDocuments(investorId);

  // 🏛️ GET GOVERNMENT DOCUMENT REQUIREMENTS
  let govPipeline = getPipeline(investorId);
  if (!govPipeline) {
    govPipeline = generateApprovalPipeline(investorId, 'manufacturing');
  }
  
  // 💰 GET PAYMENT RECEIPTS
  const bbid = `BBID-${investorId}`;
  const paymentReceipts = getAllPayments(bbid)
    .filter((inv: any) => inv.status === 'paid')
    .map((inv: any, idx: number) => ({
      id: `receipt-${idx}`,
      name: `Payment Receipt - ${inv.serviceName}`,
      type: 'Financial',
      uploadDate: inv.paidDate || new Date().toISOString(),
      status: 'approved' as const,
      approvedBy: 'Payment System',
      size: '124 KB',
      url: `/receipts/${inv.transactionId}.pdf`
    }));
  
  const [documents, setDocuments] = useState<Document[]>([
    ...bankDocuments, // 🏦 INJECT BANK DOCUMENTS FIRST
    ...paymentReceipts, // 💰 INJECT PAYMENT RECEIPTS
    {
      id: 'doc-001',
      name: 'Passport Copy',
      type: 'Identity',
      uploadDate: '2025-01-15T10:30:00',
      status: 'approved',
      approvedBy: 'Officer Rahman'
    },
    {
      id: 'doc-002',
      name: 'Investment Proposal',
      type: 'Business Plan',
      uploadDate: '2025-01-16T14:20:00',
      status: 'approved',
      approvedBy: 'Officer Kamal'
    },
    {
      id: 'doc-003',
      name: 'Bank Statement',
      type: 'Financial',
      uploadDate: '2025-01-16T15:45:00',
      status: 'pending'
    },
    {
      id: 'doc-004',
      name: 'Environmental Impact Assessment',
      type: 'Compliance',
      uploadDate: '2025-01-20T09:15:00',
      status: 'pending'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    file: null as File | null,
    type: '',
    category: '',
    notes: ''
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadForm({ ...uploadForm, file });
    }
  };

  const handleUpload = async () => {
    if (!uploadForm.file || !uploadForm.type) return;

    setIsUploading(true);

    try {
      // Simulate upload
      const response = await API.document.upload(uploadForm.file, {
        investorId,
        type: uploadForm.type,
        stepId: undefined
      });

      if (response.success && response.data) {
        const newDoc: Document = {
          id: response.data.documentId,
          name: uploadForm.type,
          type: uploadForm.category,
          uploadDate: new Date().toISOString(),
          status: 'pending',
          url: response.data.url
        };

        setDocuments([...documents, newDoc]);
        setShowUploadModal(false);
        setUploadForm({ file: null, type: '', category: '', notes: '' });
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (docId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== docId));
    }
  };

  // Filter documents
  const filteredDocs = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.type === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Document Vault</h2>
          <p className="text-gray-600">
            Secure storage for all your investment-related documents
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Upload className="w-5 h-5" />
          Upload Document
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <InstrumentCard>
          <div className="p-8 rounded-2xl border border-[#e3ebf7]">
            <div className="text-2xl font-bold text-gray-900">{documents.length}</div>
            <div className="text-sm text-gray-600">Total Documents</div>
          </div>
        </InstrumentCard>
        <InstrumentCard>
          <div className="p-8 rounded-2xl border border-[#e3ebf7]">
            <div className="text-2xl font-bold text-emerald-600">
              {documents.filter(d => d.status === 'approved').length}
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
        </InstrumentCard>
        <InstrumentCard>
          <div className="p-8 rounded-2xl border border-[#e3ebf7]">
            <div className="text-2xl font-bold text-orange-600">
              {documents.filter(d => d.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </InstrumentCard>
        <InstrumentCard>
          <div className="p-8 rounded-2xl border border-[#e3ebf7]">
            <div className="text-2xl font-bold text-red-600">
              {documents.filter(d => d.status === 'rejected').length}
            </div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
        </InstrumentCard>
      </div>

      {/* Filters */}
      <InstrumentCard>
        <div className="p-8 rounded-2xl border border-[#e3ebf7]">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents by name or category..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 appearance-none"
              >
                <option value="all">All Categories</option>
                {documentCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </InstrumentCard>

      {/* 🏛️ GOVERNMENT DOCUMENT REQUIREMENTS - FROM WORKFLOW ENGINE */}
      {govPipeline && govPipeline.approvalSteps.filter(step => getMissingDocuments(step).length > 0).length > 0 && (
        <InstrumentCard>
          <div className="p-6 rounded-2xl border border-orange-200 bg-orange-50">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#0f172a] mb-2">
                  🏛️ Missing Government Documents
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  The following documents are required for your government approvals
                </p>
                <div className="space-y-3">
                  {govPipeline.approvalSteps
                    .filter(step => getMissingDocuments(step).length > 0)
                    .slice(0, 5)
                    .map(step => {
                      const missing = getMissingDocuments(step);
                      const serviceInfo = getServiceById(step.serviceId);
                      
                      return (
                        <div key={step.serviceId} className="bg-white rounded-lg p-4 border border-orange-200">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-semibold text-[#0f172a]">{step.serviceName}</div>
                              <div className="text-sm text-slate-600">{step.agencyName}</div>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                              {missing.length} missing
                            </span>
                          </div>
                          <div className="space-y-1">
                            {serviceInfo?.service.documents
                              .filter(doc => missing.includes(doc.id))
                              .map(doc => (
                                <div key={doc.id} className="flex items-center gap-2 text-sm">
                                  <XCircle className="w-4 h-4 text-orange-500" />
                                  <span className="text-slate-700">{doc.name}</span>
                                  {doc.required && (
                                    <span className="text-xs text-red-600">(Required)</span>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
                {govPipeline.approvalSteps.filter(step => getMissingDocuments(step).length > 0).length > 5 && (
                  <div className="mt-3 text-center text-sm text-slate-600">
                    + {govPipeline.approvalSteps.filter(step => getMissingDocuments(step).length > 0).length - 5} more services need documents
                  </div>
                )}
              </div>
            </div>
          </div>
        </InstrumentCard>
      )}

      {/* Documents Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredDocs.map((doc) => (
            <InstrumentCard key={doc.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 rounded-2xl border border-[#e3ebf7] hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isBankDocument(doc) ? 'bg-gradient-to-br from-indigo-500 to-blue-500' : 'bg-gradient-to-br from-blue-500 to-purple-500'}`}>
                      {isBankDocument(doc) ? (
                        <Building2 className="w-6 h-6 text-white" />
                      ) : (
                        <FileText className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base mb-1 truncate">{doc.name}</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm text-gray-600">{doc.type}</p>
                        {isBankDocument(doc) && <BankBadge size="xs" />}
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 flex-shrink-0 ${getStatusColor(doc.status)}`}>
                    {getStatusIcon(doc.status)}
                    {doc.status}
                  </div>
                </div>

                <div className="space-y-2.5 mb-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(doc.uploadDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  {doc.approvedBy && (
                    <div className="text-sm text-gray-600">
                      Approved by: <span className="font-medium">{doc.approvedBy}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="flex-1 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="px-4 py-2.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </InstrumentCard>
          ))}
        </AnimatePresence>
      </div>

      {filteredDocs.length === 0 && (
        <InstrumentCard>
          <div className="p-12 rounded-2xl border border-[#e3ebf7] text-center">
            <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No documents found</p>
          </div>
        </InstrumentCard>
      )}

      {/* WORLD-CLASS ENHANCEMENTS */}
      <div className="space-y-6">
        {/* 📜 CERTIFICATES - Auto-generated on approval */}
        <InstrumentSection title="Government Certificates" subtitle="Auto-generated certificates from approved applications">
          <CertificateViewer bbid={`BBID-${investorId}`} investorId={investorId} />
        </InstrumentSection>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            onClick={() => setShowUploadModal(false)}
          >
            <InstrumentCard>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="p-8 rounded-2xl border border-[#e3ebf7] max-w-lg w-full"
              >
                <h3 className="text-xl font-bold mb-4">Upload Document</h3>

                <div className="space-y-4">
                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Select File</label>
                    <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-all">
                      {uploadForm.file ? (
                        <div>
                          <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <p className="text-sm font-medium">{uploadForm.file.name}</p>
                          <p className="text-xs text-gray-500">{(uploadForm.file.size / 1024).toFixed(0)} KB</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        </div>
                      )}
                      <input
                        type="file"
                        onChange={handleFileSelect}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                    </label>
                  </div>

                  {/* Document Type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Document Type</label>
                    <select
                      value={uploadForm.type}
                      onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select type...</option>
                      {documentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={uploadForm.category}
                      onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select category...</option>
                      {documentCategories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                    <textarea
                      value={uploadForm.notes}
                      onChange={(e) => setUploadForm({ ...uploadForm, notes: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                      rows={3}
                      placeholder="Add any additional notes..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleUpload}
                    disabled={!uploadForm.file || !uploadForm.type || isUploading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? 'Uploading...' : 'Upload Document'}
                  </button>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </InstrumentCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            onClick={() => setPreviewDoc(null)}
          >
            <InstrumentCard>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="p-8 rounded-2xl border border-[#e3ebf7] max-w-2xl w-full"
              >
                <h3 className="text-xl font-bold mb-4">{previewDoc.name}</h3>
                <div className="bg-gray-100 rounded-lg p-12 text-center mb-4">
                  <FileText className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Document preview would appear here</p>
                </div>
                
                {/* 🔍 FIX 4: QR Verification in Document Preview */}
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Document Verification</h4>
                  <QRCertificateVerification id={previewDoc.id} />
                </div>

                <button
                  onClick={() => setPreviewDoc(null)}
                  className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Close
                </button>
              </motion.div>
            </InstrumentCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}