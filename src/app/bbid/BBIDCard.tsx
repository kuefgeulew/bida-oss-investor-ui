// 🆔 BBID CARD — Visual display component for Bangladesh Business ID
// ARCHITECTURE: UI layer. Displays BBID with QR code, status, and verification.

import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle, 
  AlertTriangle, 
  MapPin, 
  Calendar,
  User,
  Briefcase,
  DollarSign,
  Users,
  ExternalLink,
  Download,
  QrCode,
  Copy,
  CheckCheck
} from 'lucide-react';
import { 
  lookupBBID, 
  verifyBBID,
  type BBIDRecord 
} from './bbidEngine';
import { 
  getBBIDColor,
  parseBBID,
  getSectorFromCode,
  generateBBIDQRData
} from './bbidRegistry';
import { glassCard } from '@/app/config/designSystem';
import QRCode from 'qrcode';

interface BBIDCardProps {
  bbid: string;
  variant?: 'full' | 'compact' | 'badge';
  showQR?: boolean;
  showDetails?: boolean;
  onVerify?: () => void;
}

export function BBIDCard({ 
  bbid, 
  variant = 'full', 
  showQR = true,
  showDetails = true,
  onVerify 
}: BBIDCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const record = lookupBBID(bbid);
  const colors = getBBIDColor(bbid);
  const parsed = parseBBID(bbid);

  React.useEffect(() => {
    if (showQR && record) {
      const qrData = generateBBIDQRData(bbid, record.companyName);
      QRCode.toDataURL(qrData, { width: 200, margin: 1 })
        .then(setQrDataUrl)
        .catch(console.error);
    }
  }, [bbid, record, showQR]);

  const handleCopy = () => {
    navigator.clipboard.writeText(bbid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    verifyBBID(bbid, 'manual_lookup', 'USER');
    onVerify?.();
  };

  if (!record) {
    return (
      <div className={`${glassCard} p-6 border-l-4 border-red-500`}>
        <div className="flex items-center gap-3 text-red-600">
          <AlertTriangle className="w-6 h-6" />
          <div>
            <div className="font-semibold">BBID Not Found</div>
            <div className="text-sm text-red-500">{bbid}</div>
          </div>
        </div>
      </div>
    );
  }

  // Badge variant - minimal display
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}>
        <Building2 className="w-4 h-4" />
        <span className="font-mono font-medium text-sm">{bbid}</span>
        {record.verified && <CheckCircle className="w-3 h-3" />}
      </div>
    );
  }

  // Compact variant - single line
  if (variant === 'compact') {
    return (
      <div className={`${glassCard} p-4 border-l-4 ${colors.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
              <Building2 className={`w-6 h-6 ${colors.text}`} />
            </div>
            <div>
              <div className="font-semibold text-gray-800">{record.companyName}</div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-mono">{bbid}</span>
                {record.verified && (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            {copied ? <CheckCheck className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
          </button>
        </div>
      </div>
    );
  }

  // Full variant - complete details
  return (
    <div className={`${glassCard} p-6 border-l-4 ${colors.border}`}>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-16 h-16 rounded-xl ${colors.bg} flex items-center justify-center`}>
                <Building2 className={`w-8 h-8 ${colors.text}`} />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800">{record.companyName}</div>
                {record.companyNameBangla && (
                  <div className="text-sm text-gray-600">{record.companyNameBangla}</div>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-lg font-semibold text-gray-700">{bbid}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1 hover:bg-gray-100 rounded transition-all"
                    title="Copy BBID"
                  >
                    {copied ? <CheckCheck className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              record.status === 'active' ? 'bg-green-100 text-green-700' :
              record.status === 'suspended' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {record.status.toUpperCase()}
            </div>
          </div>

          {/* Verification Status */}
          {record.verified ? (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Verified BBID</span>
              {record.verificationDate && (
                <span className="text-sm text-green-600">
                  • {new Date(record.verificationDate).toLocaleDateString()}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between bg-orange-50 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2 text-orange-600">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Pending Verification</span>
              </div>
              <button
                onClick={handleVerify}
                className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all text-sm"
              >
                Verify Now
              </button>
            </div>
          )}

          {/* Details Grid */}
          {showDetails && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-700">
                <Briefcase className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Sector</div>
                  <div className="font-medium">{record.sector}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Legal Entity</div>
                  <div className="font-medium capitalize">{record.legalEntity.replace('_', ' ')}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="font-medium">{record.registeredAddress.district}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Registered</div>
                  <div className="font-medium">{new Date(record.registrationDate).toLocaleDateString()}</div>
                </div>
              </div>

              {record.investmentAmount && (
                <div className="flex items-center gap-2 text-gray-700">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Investment</div>
                    <div className="font-medium">
                      {record.currency} {record.investmentAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}

              {record.numberOfEmployees && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Employees</div>
                    <div className="font-medium">{record.numberOfEmployees}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* External Links */}
          {(record.rjscNumber || record.tinNumber) && (
            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm font-medium text-gray-600 mb-2">Linked Systems</div>
              <div className="flex flex-wrap gap-2">
                {record.rjscNumber && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm">
                    <ExternalLink className="w-3 h-3" />
                    RJSC: {record.rjscNumber}
                  </div>
                )}
                {record.tinNumber && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm">
                    <ExternalLink className="w-3 h-3" />
                    TIN: {record.tinNumber}
                  </div>
                )}
                {record.importerCode && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm">
                    <ExternalLink className="w-3 h-3" />
                    Importer: {record.importerCode}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* QR Code */}
        {showQR && (
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="BBID QR Code" className="w-48 h-48" />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center bg-gray-100">
                  <QrCode className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="mt-3 text-center">
              <div className="text-xs text-gray-500">Scan to verify</div>
              <button className="mt-2 text-sm text-blue-600 hover:underline flex items-center gap-1">
                <Download className="w-3 h-3" />
                Download QR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
