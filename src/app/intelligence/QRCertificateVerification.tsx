// 📱 QR CERTIFICATE VERIFICATION — Digital Certificate Authentication
// FEATURES: QR code generation, verification, certificate validation, blockchain-ready

import React, { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import {
  QrCode,
  Shield,
  CheckCircle,
  AlertCircle,
  Download,
  Share2,
  Printer,
  Search,
  Verified,
  FileCheck,
  Calendar,
  Building2,
  User
} from 'lucide-react';

interface Certificate {
  id: string;
  type: 'company_registration' | 'tin' | 'vat' | 'trade_license' | 'work_permit' | 'factory_license';
  companyName: string;
  certificateNumber: string;
  issuedDate: Date;
  expiryDate?: Date;
  issuingAuthority: string;
  status: 'valid' | 'expired' | 'revoked';
  qrData: string;
}

const CERTIFICATE_TYPES = {
  company_registration: { label: 'Company Registration', color: 'blue', icon: Building2 },
  tin: { label: 'TIN Certificate', color: 'green', icon: FileCheck },
  vat: { label: 'VAT Registration', color: 'purple', icon: FileCheck },
  trade_license: { label: 'Trade License', color: 'orange', icon: Shield },
  work_permit: { label: 'Work Permit', color: 'cyan', icon: User },
  factory_license: { label: 'Factory License', color: 'red', icon: Building2 }
};

// Demo certificates
const DEMO_CERTIFICATES: Certificate[] = [
  {
    id: 'CERT-2024-001234',
    type: 'company_registration',
    companyName: 'TechVenture Bangladesh Ltd.',
    certificateNumber: 'RJSC/C-198765/2024',
    issuedDate: new Date('2024-01-15'),
    issuingAuthority: 'RJSC',
    status: 'valid',
    qrData: 'BIDA-CERT-RJSC-C-198765-2024-VALID'
  },
  {
    id: 'CERT-2024-001235',
    type: 'tin',
    companyName: 'TechVenture Bangladesh Ltd.',
    certificateNumber: 'TIN-445566778899',
    issuedDate: new Date('2024-01-20'),
    issuingAuthority: 'NBR',
    status: 'valid',
    qrData: 'BIDA-CERT-NBR-TIN-445566778899-VALID'
  },
  {
    id: 'CERT-2024-001236',
    type: 'work_permit',
    companyName: 'TechVenture Bangladesh Ltd.',
    certificateNumber: 'WP/2024/12345',
    issuedDate: new Date('2024-02-01'),
    expiryDate: new Date('2027-02-01'),
    issuingAuthority: 'BIDA',
    status: 'valid',
    qrData: 'BIDA-CERT-BIDA-WP-12345-2024-VALID'
  }
];

export function QRCertificateVerification() {
  const [verificationMode, setVerificationMode] = useState<'generate' | 'verify'>('generate');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [verificationInput, setVerificationInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<Certificate | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Generate QR Code (simplified - in production use a proper QR library)
  const generateQRPlaceholder = (data: string) => {
    // This would use a real QR code library like 'qrcode.react' in production
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <text x="100" y="100" text-anchor="middle" font-size="12" fill="black">
          QR Code
        </text>
        <text x="100" y="120" text-anchor="middle" font-size="8" fill="gray">
          ${data.substring(0, 20)}...
        </text>
      </svg>
    `)}`;
  };

  const handleVerify = () => {
    setVerificationStatus('loading');
    
    // Simulate verification
    setTimeout(() => {
      const found = DEMO_CERTIFICATES.find(
        cert => cert.qrData === verificationInput || cert.certificateNumber === verificationInput
      );

      if (found) {
        setVerificationResult(found);
        setVerificationStatus('success');
      } else {
        setVerificationResult(null);
        setVerificationStatus('error');
      }
    }, 1000);
  };

  const downloadCertificate = (cert: Certificate) => {
    alert(`Downloading certificate ${cert.certificateNumber}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">QR Certificate Verification</h1>
            <p className="text-gray-600">
              Instant digital certificate authentication with QR codes
            </p>
          </div>
          <QrCode className="w-16 h-16 text-blue-500 opacity-40" />
        </div>
      </Card>

      {/* Mode Selector */}
      <div className="flex gap-4">
        <button
          onClick={() => setVerificationMode('generate')}
          className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
            verificationMode === 'generate'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <QrCode className="w-6 h-6 mx-auto mb-2" />
          Generate QR Code
        </button>
        <button
          onClick={() => setVerificationMode('verify')}
          className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
            verificationMode === 'verify'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Shield className="w-6 h-6 mx-auto mb-2" />
          Verify Certificate
        </button>
      </div>

      {/* Generate Mode */}
      {verificationMode === 'generate' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Certificate List */}
          <Card className="p-6 bg-white/40 backdrop-blur-xl border-white/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              Your Certificates
            </h3>
            <div className="space-y-3">
              {DEMO_CERTIFICATES.map((cert) => {
                const certType = CERTIFICATE_TYPES[cert.type];
                const Icon = certType.icon;
                return (
                  <button
                    key={cert.id}
                    onClick={() => setSelectedCertificate(cert)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedCertificate?.id === cert.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white/60 hover:bg-white/80'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-${certType.color}-100`}>
                        <Icon className={`w-5 h-5 text-${certType.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{certType.label}</h4>
                        <p className="text-sm text-gray-600">{cert.certificateNumber}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            cert.status === 'valid' ? 'bg-green-100 text-green-700' :
                            cert.status === 'expired' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {cert.status.toUpperCase()}
                          </div>
                          <span className="text-xs text-gray-500">
                            {cert.issuingAuthority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* QR Code Display */}
          <Card className="p-6 bg-white/40 backdrop-blur-xl border-white/20">
            {selectedCertificate ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="inline-block p-4 bg-white rounded-xl shadow-lg">
                    <img
                      src={generateQRPlaceholder(selectedCertificate.qrData)}
                      alt="QR Code"
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Scan this QR code to verify certificate
                  </p>
                </div>

                <div className="p-4 bg-white/60 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Certificate ID:</span>
                    <span className="font-medium">{selectedCertificate.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Company:</span>
                    <span className="font-medium">{selectedCertificate.companyName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Issued:</span>
                    <span className="font-medium">
                      {selectedCertificate.issuedDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Authority:</span>
                    <span className="font-medium">{selectedCertificate.issuingAuthority}</span>
                  </div>
                  {selectedCertificate.expiryDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expires:</span>
                      <span className="font-medium">
                        {selectedCertificate.expiryDate.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => downloadCertificate(selectedCertificate)}
                    className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    className="flex-1 py-3 px-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    className="py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Printer className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a certificate to generate QR code</p>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Verify Mode */}
      {verificationMode === 'verify' && (
        <Card className="p-6 bg-white/40 backdrop-blur-xl border-white/20">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            Verify Certificate
          </h3>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Enter Certificate Number or QR Data
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={verificationInput}
                  onChange={(e) => setVerificationInput(e.target.value)}
                  placeholder="e.g., RJSC/C-198765/2024 or scan QR code"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleVerify}
                  disabled={!verificationInput || verificationStatus === 'loading'}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {verificationStatus === 'loading' ? 'Verifying...' : 'Verify'}
                </button>
              </div>
            </div>

            {/* Quick Test Buttons */}
            <div className="flex flex-wrap gap-2">
              <p className="w-full text-sm text-gray-600 mb-2">Quick test:</p>
              {DEMO_CERTIFICATES.map((cert) => (
                <button
                  key={cert.id}
                  onClick={() => setVerificationInput(cert.certificateNumber)}
                  className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {cert.certificateNumber}
                </button>
              ))}
            </div>

            {/* Verification Result */}
            {verificationStatus === 'success' && verificationResult && (
              <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-green-900">Certificate Verified ✓</h4>
                    <p className="text-sm text-green-700">This is a valid BIDA certificate</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Certificate Type</div>
                    <div className="font-semibold text-gray-900">
                      {CERTIFICATE_TYPES[verificationResult.type].label}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Company Name</div>
                    <div className="font-semibold text-gray-900">
                      {verificationResult.companyName}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Certificate Number</div>
                    <div className="font-semibold text-gray-900">
                      {verificationResult.certificateNumber}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Issuing Authority</div>
                    <div className="font-semibold text-gray-900">
                      {verificationResult.issuingAuthority}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Issued Date</div>
                    <div className="font-semibold text-gray-900">
                      {verificationResult.issuedDate.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Status</div>
                    <div className="flex items-center gap-1">
                      <Verified className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-600">
                        {verificationResult.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {verificationStatus === 'error' && (
              <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-red-900">Verification Failed</h4>
                    <p className="text-sm text-red-700">
                      Certificate not found or invalid. Please check the certificate number.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Info Box */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              Secure & Tamper-Proof
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              All certificates issued through BIDA OSS include encrypted QR codes for instant verification.
              Each QR code contains a unique cryptographic signature that cannot be forged.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Blockchain-ready</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Instant verification</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Works offline</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
