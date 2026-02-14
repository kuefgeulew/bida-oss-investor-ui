// 📜 CERTIFICATE VIEWER — Display and download certificates
// ARCHITECTURE: UI layer. Reads certificateEngine. No business logic.

import React, { useState, useEffect } from 'react';
import { 
  FileCheck, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Calendar,
  Building2,
  Shield,
  RefreshCw,
  Eye,
  ExternalLink
} from 'lucide-react';
import {
  getCertificates,
  getActiveCertificates,
  getExpiringCertificates,
  getCertificateStats,
  generateCertificatePDF,
  type Certificate
} from './certificateEngine';
import { glassCard } from '@/app/config/designSystem';
import { CompactRatingPrompt } from '@/app/transparency/ServiceRatingWidget';
import { QRCertificateVerification } from '@/app/intelligence/QRCertificateVerification';

interface CertificateViewerProps {
  bbid: string;
  investorId?: string;
  compactMode?: boolean;
}

export function CertificateViewer({ bbid, investorId, compactMode = false }: CertificateViewerProps) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'expiring'>('active');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadCertificates();
  }, [bbid, filter]);

  const loadCertificates = () => {
    let certs: Certificate[];
    
    switch (filter) {
      case 'active':
        certs = getActiveCertificates(bbid);
        break;
      case 'expiring':
        certs = getExpiringCertificates(bbid, 30);
        break;
      default:
        certs = getCertificates(bbid);
    }
    
    setCertificates(certs);
  };

  const stats = getCertificateStats(bbid);

  const handleDownloadPDF = (cert: Certificate) => {
    const pdfContent = generateCertificatePDF(cert);
    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cert.certificateNumber.replace(/\//g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePreview = (cert: Certificate) => {
    setSelectedCert(cert);
    setShowPreview(true);
  };

  const getCertificateIcon = (cert: Certificate) => {
    switch (cert.status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'expired':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'revoked':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getCertificateStatusBadge = (cert: Certificate) => {
    const badges = {
      active: 'bg-green-100 text-green-700',
      expired: 'bg-orange-100 text-orange-700',
      revoked: 'bg-red-100 text-red-700'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[cert.status]}`}>
        {cert.status.toUpperCase()}
      </span>
    );
  };

  const getDaysUntilExpiry = (cert: Certificate): number | null => {
    if (!cert.expiryDate) return null;
    const now = new Date();
    const expiry = new Date(cert.expiryDate);
    const diff = expiry.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (compactMode) {
    return (
      <div className="space-y-3">
        {certificates.slice(0, 3).map((cert) => (
          <div key={cert.certificateId} className={`${glassCard} p-4 flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              {getCertificateIcon(cert)}
              <div>
                <div className="font-medium text-sm">{cert.serviceName}</div>
                <div className="text-xs text-gray-600">{cert.certificateNumber}</div>
              </div>
            </div>
            <button
              onClick={() => handleDownloadPDF(cert)}
              className="p-2 hover:bg-white/50 rounded-lg transition-all"
            >
              <Download className="w-4 h-4 text-blue-500" />
            </button>
          </div>
        ))}
        {certificates.length > 3 && (
          <div className="text-center text-sm text-gray-600">
            +{certificates.length - 3} more certificates
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`${glassCard} p-4`}>
          <div className="flex items-center justify-between mb-2">
            <FileCheck className="w-8 h-8 text-blue-500" />
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
          </div>
          <div className="text-sm text-gray-600">Total Certificates</div>
        </div>

        <div className={`${glassCard} p-4`}>
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>

        <div className={`${glassCard} p-4`}>
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-orange-500" />
            <div className="text-2xl font-bold text-orange-600">{stats.expiringSoon}</div>
          </div>
          <div className="text-sm text-gray-600">Expiring Soon</div>
        </div>

        <div className={`${glassCard} p-4`}>
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-8 h-8 text-gray-400" />
            <div className="text-2xl font-bold text-gray-600">{stats.expired}</div>
          </div>
          <div className="text-sm text-gray-600">Expired</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={`${glassCard} p-2 flex gap-2`}>
        <button
          onClick={() => setFilter('active')}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'active'
              ? 'bg-green-500 text-white shadow-lg'
              : 'text-gray-600 hover:bg-white/50'
          }`}
        >
          <CheckCircle className="w-4 h-4 inline mr-2" />
          Active ({stats.active})
        </button>
        <button
          onClick={() => setFilter('expiring')}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'expiring'
              ? 'bg-orange-500 text-white shadow-lg'
              : 'text-gray-600 hover:bg-white/50'
          }`}
        >
          <AlertCircle className="w-4 h-4 inline mr-2" />
          Expiring Soon ({stats.expiringSoon})
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'all'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'text-gray-600 hover:bg-white/50'
          }`}
        >
          <FileCheck className="w-4 h-4 inline mr-2" />
          All Certificates ({stats.total})
        </button>
      </div>

      {/* Certificates List */}
      <div className="space-y-4">
        {certificates.length === 0 ? (
          <div className={`${glassCard} p-12 text-center`}>
            <FileCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <div className="text-xl font-medium text-gray-700">No Certificates Found</div>
            <div className="text-gray-500 mt-2">
              Certificates will appear here once your applications are approved
            </div>
          </div>
        ) : (
          certificates.map((cert) => {
            const daysUntilExpiry = getDaysUntilExpiry(cert);
            
            return (
              <div key={cert.certificateId} className={`${glassCard} p-6`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {getCertificateIcon(cert)}
                      <div>
                        <div className="text-lg font-semibold text-gray-800">
                          {cert.serviceName}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600 font-mono">
                            {cert.certificateNumber}
                          </span>
                          {getCertificateStatusBadge(cert)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600 mb-1">Issuing Agency</div>
                        <div className="font-medium flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          {cert.issuingAgency}
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-600 mb-1">Issued Date</div>
                        <div className="font-medium flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(cert.issuedDate).toLocaleDateString('en-BD')}
                        </div>
                      </div>

                      {cert.expiryDate ? (
                        <div>
                          <div className="text-gray-600 mb-1">Expiry Date</div>
                          <div className="font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {new Date(cert.expiryDate).toLocaleDateString('en-BD')}
                            {daysUntilExpiry !== null && daysUntilExpiry > 0 && (
                              <span className="text-xs text-orange-600">
                                ({daysUntilExpiry}d left)
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-gray-600 mb-1">Validity</div>
                          <div className="font-medium flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-500" />
                            Permanent
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 🆕 SURGICAL COMPLETION: QR Verification Component */}
                    <div className="mt-4">
                      <QRCertificateVerification id={cert.certificateNumber} />
                    </div>

                    {/* Verification Link */}
                    {cert.qrCode && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Verify Certificate:</div>
                        <a 
                          href={cert.qrCode} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline font-mono flex items-center gap-1"
                        >
                          {cert.qrCode}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => handlePreview(cert)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(cert)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    {cert.status === 'expired' && (
                      <button
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all flex items-center gap-2 whitespace-nowrap"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Renew
                      </button>
                    )}
                  </div>
                </div>

                {/* ⭐ RATING WIDGET - Show for active certificates */}
                {cert.status === 'active' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <CompactRatingPrompt
                      bbid={bbid}
                      serviceId={cert.serviceId}
                      serviceName={cert.serviceName}
                      agencyId={cert.agencyId || 'unknown'}
                      agencyName={cert.issuingAgency}
                      investorName={cert.companyName}
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && selectedCert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${glassCard} p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Certificate Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div 
              className="border border-gray-200 rounded-lg p-8 bg-white"
              dangerouslySetInnerHTML={{ __html: generateCertificatePDF(selectedCert) }}
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleDownloadPDF(selectedCert)}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Certificate
              </button>
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}