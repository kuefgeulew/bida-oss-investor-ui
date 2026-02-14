import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, CheckCircle2, AlertTriangle, Clock, Hash,
  FileCheck, Download, ExternalLink, Copy, Search,
  Lock, Unlock, Eye, EyeOff, QrCode, Fingerprint,
  Server, Globe, Link as LinkIcon, RefreshCw, Award,
  ShieldCheck, Calendar, Building2, User, FileText,
  Zap, TrendingUp, Activity, Info, X
} from 'lucide-react';
import { glassCard } from '@/app/config/designSystem';
import { useLanguage } from '@/app/components/LanguageContext';
import { toast } from 'sonner';

// 🔗 BLOCKCHAIN RECORD STRUCTURE
interface BlockchainRecord {
  txHash: string;
  blockNumber: number;
  timestamp: string;
  documentType: string;
  documentId: string;
  issuer: string;
  holder: string;
  status: 'verified' | 'pending' | 'revoked' | 'expired';
  verificationLevel: 'gold' | 'silver' | 'bronze';
  merkleRoot: string;
  ipfsHash: string;
  smartContractAddress: string;
  gasUsed: number;
  confirmations: number;
  metadata: {
    documentName: string;
    issueDate: string;
    expiryDate?: string;
    jurisdiction: string;
    regulatoryBody: string;
  };
}

// 🏛️ MOCK BLOCKCHAIN DATABASE
const BLOCKCHAIN_RECORDS: BlockchainRecord[] = [
  {
    txHash: '0x7f9c8e3b2a5d6f1e4c9b8a7d6e5f4c3b2a1d9e8f7c6b5a4d3e2f1a9b8c7d6e5f',
    blockNumber: 18456789,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    documentType: 'Business License',
    documentId: 'RJSC-2024-BD-00145',
    issuer: 'Registrar of Joint Stock Companies & Firms',
    holder: 'TechCorp Bangladesh Ltd.',
    status: 'verified',
    verificationLevel: 'gold',
    merkleRoot: '0x4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b',
    ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
    smartContractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    gasUsed: 142567,
    confirmations: 1245,
    metadata: {
      documentName: 'Certificate of Incorporation',
      issueDate: '2024-01-15',
      jurisdiction: 'Dhaka, Bangladesh',
      regulatoryBody: 'RJSC'
    }
  },
  {
    txHash: '0x3e4d5c6b7a8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
    blockNumber: 18467234,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    documentType: 'Environmental Clearance',
    documentId: 'DOE-EC-2024-0892',
    issuer: 'Department of Environment',
    holder: 'TechCorp Bangladesh Ltd.',
    status: 'verified',
    verificationLevel: 'gold',
    merkleRoot: '0x9f8e7d6c5b4a3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e',
    ipfsHash: 'QmXyZ123ABCdefGHI456JKLmno789PQRstu012VWXyz345',
    smartContractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    gasUsed: 98432,
    confirmations: 987,
    metadata: {
      documentName: 'Environmental Clearance Certificate',
      issueDate: '2024-01-28',
      expiryDate: '2029-01-28',
      jurisdiction: 'National',
      regulatoryBody: 'DoE'
    }
  },
  {
    txHash: '0x8d7c6b5a4e3d2f1e0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f',
    blockNumber: 18478901,
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    documentType: 'Tax Clearance',
    documentId: 'NBR-TCC-2024-3456',
    issuer: 'National Board of Revenue',
    holder: 'TechCorp Bangladesh Ltd.',
    status: 'verified',
    verificationLevel: 'silver',
    merkleRoot: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    ipfsHash: 'QmABC789DEFghi123JKLmno456PQRstu789VWXyz012345',
    smartContractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    gasUsed: 76543,
    confirmations: 654,
    metadata: {
      documentName: 'Tax Clearance Certificate',
      issueDate: '2024-02-01',
      expiryDate: '2025-02-01',
      jurisdiction: 'National',
      regulatoryBody: 'NBR'
    }
  },
  {
    txHash: '0x5f4e3d2c1b0a9e8d7c6b5a4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f',
    blockNumber: 18489456,
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    documentType: 'Import License',
    documentId: 'CCI&E-IL-2024-7890',
    issuer: 'Chief Controller of Imports & Exports',
    holder: 'TechCorp Bangladesh Ltd.',
    status: 'verified',
    verificationLevel: 'gold',
    merkleRoot: '0x6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d',
    ipfsHash: 'QmDEF456GHIjkl789MNOpqr012STUvwx345YZabc678901',
    smartContractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    gasUsed: 112345,
    confirmations: 432,
    metadata: {
      documentName: 'Import Registration Certificate',
      issueDate: '2024-02-10',
      expiryDate: '2025-02-10',
      jurisdiction: 'National',
      regulatoryBody: 'CCI&E'
    }
  }
];

export function BlockchainLicenseVerification() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'txHash' | 'documentId' | 'holder'>('documentId');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<BlockchainRecord | null>(null);
  const [showAllRecords, setShowAllRecords] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<BlockchainRecord | null>(null);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate blockchain query delay
    setTimeout(() => {
      let result: BlockchainRecord | undefined;
      
      if (searchType === 'txHash') {
        result = BLOCKCHAIN_RECORDS.find(r => r.txHash.toLowerCase().includes(searchQuery.toLowerCase()));
      } else if (searchType === 'documentId') {
        result = BLOCKCHAIN_RECORDS.find(r => r.documentId.toLowerCase().includes(searchQuery.toLowerCase()));
      } else {
        result = BLOCKCHAIN_RECORDS.find(r => r.holder.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      
      if (result) {
        setSearchResult(result);
        toast.success('Document verified on blockchain!');
      } else {
        setSearchResult(null);
        toast.error('No blockchain record found');
      }
      
      setIsSearching(false);
    }, 1500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Verified
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        );
      case 'revoked':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            <AlertTriangle className="w-4 h-4" />
            Revoked
          </span>
        );
      default:
        return null;
    }
  };

  const getVerificationBadge = (level: string) => {
    switch (level) {
      case 'gold':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            <Award className="w-4 h-4" />
            Gold Tier
          </span>
        );
      case 'silver':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            <Award className="w-4 h-4" />
            Silver Tier
          </span>
        );
      case 'bronze':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
            <Award className="w-4 h-4" />
            Bronze Tier
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={glassCard['p-6']}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Blockchain License Verification</h2>
            <p className="text-sm text-gray-600">Immutable proof of government-issued licenses and permits</p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-indigo-900 mb-1">Powered by Ethereum Blockchain</h3>
            <p className="text-sm text-indigo-700">
              All government licenses are hashed and stored on-chain with cryptographic proof. 
              This ensures tamper-proof verification, instant authenticity checks, and permanent audit trails.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">Verified Records</span>
          </div>
          <p className="text-2xl font-bold text-green-700">
            {BLOCKCHAIN_RECORDS.filter(r => r.status === 'verified').length}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">Confirmations</span>
          </div>
          <p className="text-2xl font-bold text-blue-700">
            {Math.max(...BLOCKCHAIN_RECORDS.map(r => r.confirmations))}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600">Avg Gas Used</span>
          </div>
          <p className="text-2xl font-bold text-purple-700">
            {Math.round(BLOCKCHAIN_RECORDS.reduce((sum, r) => sum + r.gasUsed, 0) / BLOCKCHAIN_RECORDS.length / 1000)}K
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Server className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-gray-600">Network</span>
          </div>
          <p className="text-lg font-bold text-orange-700">Ethereum</p>
          <p className="text-xs text-gray-500">Mainnet</p>
        </div>
      </div>

      {/* Search Interface */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold mb-4">Verify Document on Blockchain</h3>
        
        <div className="space-y-4">
          {/* Search Type Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setSearchType('documentId')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                searchType === 'documentId'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-1" />
              Document ID
            </button>
            <button
              onClick={() => setSearchType('txHash')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                searchType === 'txHash'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Hash className="w-4 h-4 inline mr-1" />
              Transaction Hash
            </button>
            <button
              onClick={() => setSearchType('holder')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                searchType === 'holder'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <User className="w-4 h-4 inline mr-1" />
              Company Name
            </button>
          </div>

          {/* Search Input */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  searchType === 'documentId' 
                    ? 'Enter document ID (e.g., RJSC-2024-BD-00145)' 
                    : searchType === 'txHash'
                    ? 'Enter transaction hash (0x...)'
                    : 'Enter company name'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery}
              className="px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Verify
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search Result */}
        <AnimatePresence>
          {searchResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <h4 className="text-lg font-bold text-green-900">Blockchain Verification Successful</h4>
                  </div>
                  <p className="text-sm text-green-700">This document is cryptographically verified on Ethereum blockchain</p>
                </div>
                <button
                  onClick={() => setSelectedRecord(searchResult)}
                  className="px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                >
                  View Full Details
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Document Type</p>
                  <p className="font-semibold text-gray-900">{searchResult.documentType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Document ID</p>
                  <p className="font-mono text-sm text-gray-900">{searchResult.documentId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Issuer</p>
                  <p className="text-sm text-gray-900">{searchResult.issuer}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Status</p>
                  {getStatusBadge(searchResult.status)}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-green-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Block #{searchResult.blockNumber.toLocaleString()}</span>
                  <span className="text-gray-600">{searchResult.confirmations} confirmations</span>
                  <span className="text-gray-600">{new Date(searchResult.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* All Blockchain Records */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Your Blockchain-Verified Documents</h3>
          <button
            onClick={() => setShowAllRecords(!showAllRecords)}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {showAllRecords ? 'Hide' : 'Show All'} ({BLOCKCHAIN_RECORDS.length})
          </button>
        </div>

        <AnimatePresence>
          {showAllRecords && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-3 overflow-hidden"
            >
              {BLOCKCHAIN_RECORDS.map((record) => (
                <div
                  key={record.txHash}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FileCheck className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-semibold">{record.metadata.documentName}</h4>
                      </div>
                      <p className="text-sm text-gray-600 font-mono">{record.documentId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(record.status)}
                      {getVerificationBadge(record.verificationLevel)}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Issuer</p>
                      <p className="text-gray-700">{record.metadata.regulatoryBody}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Issue Date</p>
                      <p className="text-gray-700">{new Date(record.metadata.issueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Block Number</p>
                      <p className="text-gray-700 font-mono">#{record.blockNumber.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Confirmations</p>
                      <p className="text-gray-700">{record.confirmations}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Hash className="w-3 h-3" />
                      <span className="font-mono">{record.txHash.substring(0, 20)}...</span>
                      <button
                        onClick={() => copyToClipboard(record.txHash, 'Transaction hash')}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedRecord(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedRecord.metadata.documentName}</h3>
                  <p className="text-sm text-gray-600 font-mono">{selectedRecord.documentId}</p>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Status & Verification */}
                <div className="flex items-center gap-3">
                  {getStatusBadge(selectedRecord.status)}
                  {getVerificationBadge(selectedRecord.verificationLevel)}
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {selectedRecord.confirmations} Confirmations
                  </span>
                </div>

                {/* Document Info */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold">Document Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Document Type</p>
                      <p className="font-medium">{selectedRecord.documentType}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Holder</p>
                      <p className="font-medium">{selectedRecord.holder}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Issuer</p>
                      <p className="font-medium">{selectedRecord.issuer}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Regulatory Body</p>
                      <p className="font-medium">{selectedRecord.metadata.regulatoryBody}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Issue Date</p>
                      <p className="font-medium">{new Date(selectedRecord.metadata.issueDate).toLocaleDateString()}</p>
                    </div>
                    {selectedRecord.metadata.expiryDate && (
                      <div>
                        <p className="text-gray-600 mb-1">Expiry Date</p>
                        <p className="font-medium">{new Date(selectedRecord.metadata.expiryDate).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Blockchain Details */}
                <div className="bg-indigo-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Blockchain Details</h4>
                    <button
                      onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                      className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                    >
                      {showTechnicalDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showTechnicalDetails ? 'Hide' : 'Show'} Technical
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Transaction Hash</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">{selectedRecord.txHash.substring(0, 16)}...</span>
                        <button
                          onClick={() => copyToClipboard(selectedRecord.txHash, 'Transaction hash')}
                          className="p-1 hover:bg-indigo-100 rounded"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Block Number</span>
                      <span className="font-mono">#{selectedRecord.blockNumber.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Timestamp</span>
                      <span>{new Date(selectedRecord.timestamp).toLocaleString()}</span>
                    </div>

                    <AnimatePresence>
                      {showTechnicalDetails && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-2 pt-2 border-t border-indigo-100 overflow-hidden"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Smart Contract</span>
                            <span className="font-mono text-xs">{selectedRecord.smartContractAddress.substring(0, 20)}...</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Merkle Root</span>
                            <span className="font-mono text-xs">{selectedRecord.merkleRoot.substring(0, 20)}...</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">IPFS Hash</span>
                            <span className="font-mono text-xs">{selectedRecord.ipfsHash}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Gas Used</span>
                            <span>{selectedRecord.gasUsed.toLocaleString()} wei</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors font-medium flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Certificate
                  </button>
                  <button className="flex-1 px-6 py-3 border-2 border-indigo-500 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors font-medium flex items-center justify-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    View on Etherscan
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
