import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileSignature, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  Building,
  Stamp,
  Download,
  Eye,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';

interface Signature {
  id: string;
  signatory: string;
  role: 'investor' | 'officer' | 'agency';
  timestamp: string;
  documentHash: string;
  certificateId: string;
  ipAddress: string;
  deviceInfo: string;
  signatureType: 'digital' | 'e-seal';
  status: 'valid' | 'pending' | 'revoked';
}

interface Document {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  signatures: Signature[];
  requiresSignatures: { role: string; name: string; status: 'pending' | 'signed' }[];
  status: 'draft' | 'pending-signatures' | 'fully-signed' | 'sealed';
  sealTimestamp?: string;
}

export function DigitalSignature() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'doc-001',
      name: 'Business Registration Certificate',
      type: 'registration',
      createdAt: '2026-01-28T10:30:00Z',
      signatures: [
        {
          id: 'sig-001',
          signatory: 'Zhang Wei',
          role: 'investor',
          timestamp: '2026-01-28T11:00:00Z',
          documentHash: 'SHA256:a3f8b9c2d1e4...',
          certificateId: 'CERT-BD-INV-2026-0001',
          ipAddress: '103.92.41.22',
          deviceInfo: 'Chrome 120 on Windows 11',
          signatureType: 'digital',
          status: 'valid'
        }
      ],
      requiresSignatures: [
        { role: 'investor', name: 'Zhang Wei', status: 'signed' },
        { role: 'officer', name: 'RJSC Officer', status: 'pending' },
        { role: 'agency', name: 'BIDA Director', status: 'pending' }
      ],
      status: 'pending-signatures'
    },
    {
      id: 'doc-002',
      name: 'Environmental Clearance Certificate',
      type: 'clearance',
      createdAt: '2026-01-25T14:20:00Z',
      signatures: [
        {
          id: 'sig-002',
          signatory: 'Zhang Wei',
          role: 'investor',
          timestamp: '2026-01-25T15:00:00Z',
          documentHash: 'SHA256:b2c3d4e5f6a7...',
          certificateId: 'CERT-BD-INV-2026-0001',
          ipAddress: '103.92.41.22',
          deviceInfo: 'Chrome 120 on Windows 11',
          signatureType: 'digital',
          status: 'valid'
        },
        {
          id: 'sig-003',
          signatory: 'DoE Officer Rahman',
          role: 'officer',
          timestamp: '2026-01-26T09:30:00Z',
          documentHash: 'SHA256:b2c3d4e5f6a7...',
          certificateId: 'CERT-BD-DOE-2026-1234',
          ipAddress: '202.134.12.45',
          deviceInfo: 'Edge 119 on Windows 10',
          signatureType: 'digital',
          status: 'valid'
        }
      ],
      requiresSignatures: [
        { role: 'investor', name: 'Zhang Wei', status: 'signed' },
        { role: 'officer', name: 'DoE Officer Rahman', status: 'signed' },
        { role: 'agency', name: 'DoE Director', status: 'signed' }
      ],
      status: 'fully-signed',
      sealTimestamp: '2026-01-26T10:00:00Z'
    }
  ]);

  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  function handleSign(docId: string) {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        const newSignature: Signature = {
          id: `sig-${Date.now()}`,
          signatory: 'Current User',
          role: 'investor',
          timestamp: new Date().toISOString(),
          documentHash: `SHA256:${Math.random().toString(36).substring(7)}...`,
          certificateId: 'CERT-BD-INV-2026-0001',
          ipAddress: '103.92.41.22',
          deviceInfo: navigator.userAgent.substring(0, 30),
          signatureType: 'digital',
          status: 'valid'
        };

        return {
          ...doc,
          signatures: [...doc.signatures, newSignature],
          status: 'pending-signatures' as const
        };
      }
      return doc;
    }));
  }

  function handleApplySeal(docId: string) {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId && doc.status === 'fully-signed') {
        return {
          ...doc,
          status: 'sealed' as const,
          sealTimestamp: new Date().toISOString()
        };
      }
      return doc;
    }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <FileSignature className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Digital Signature & e-Seal</h1>
              <p className="text-gray-600">Government-grade document signing infrastructure</p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">256-bit</div>
                    <div className="text-sm text-gray-600">Encryption</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">RFC 3161</div>
                    <div className="text-sm text-gray-600">Timestamp</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-8 h-8 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">PKI</div>
                    <div className="text-sm text-gray-600">Certificate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">Legal</div>
                    <div className="text-sm text-gray-600">Binding</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Standards Reference */}
        <Card className="mb-8 border-l-4 border-l-purple-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stamp className="w-5 h-5" />
              International Standards Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">Reference</Badge>
                <div>
                  <div className="font-semibold">International PKI Standards</div>
                  <p className="text-sm text-gray-600">Corporate digital identity authentication</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">Reference</Badge>
                <div>
                  <div className="font-semibold">EU eIDAS</div>
                  <p className="text-sm text-gray-600">Electronic identification & trust services</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">Reference</Badge>
                <div>
                  <div className="font-semibold">ISO 27001</div>
                  <p className="text-sm text-gray-600">Information security management</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <div className="space-y-4">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{doc.name}</h3>
                        <Badge
                          variant={
                            doc.status === 'sealed' ? 'default' :
                            doc.status === 'fully-signed' ? 'outline' :
                            doc.status === 'pending-signatures' ? 'secondary' :
                            'destructive'
                          }
                        >
                          {doc.status === 'sealed' && <Stamp className="w-3 h-3 mr-1" />}
                          {doc.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Created: {new Date(doc.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedDoc(doc)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Document Signatures & Audit Trail</DialogTitle>
                          </DialogHeader>
                          <DocumentDetails document={doc} />
                        </DialogContent>
                      </Dialog>
                      {doc.status === 'pending-signatures' && (
                        <Button
                          size="sm"
                          onClick={() => handleSign(doc.id)}
                          className="bg-gradient-to-r from-purple-600 to-indigo-600"
                        >
                          <FileSignature className="w-4 h-4 mr-1" />
                          Sign Document
                        </Button>
                      )}
                      {doc.status === 'fully-signed' && !doc.sealTimestamp && (
                        <Button
                          size="sm"
                          onClick={() => handleApplySeal(doc.id)}
                          className="bg-gradient-to-r from-emerald-600 to-green-600"
                        >
                          <Stamp className="w-4 h-4 mr-1" />
                          Apply e-Seal
                        </Button>
                      )}
                      {doc.status === 'sealed' && (
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Signature Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Signature Progress</span>
                      <span>
                        {doc.requiresSignatures.filter(s => s.status === 'signed').length} / {doc.requiresSignatures.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {doc.requiresSignatures.map((req, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border-2 ${
                            req.status === 'signed'
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-300 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {req.status === 'signed' ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-gray-400" />
                            )}
                            <span className="font-semibold text-sm capitalize">{req.role}</span>
                          </div>
                          <p className="text-xs text-gray-600">{req.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* e-Seal Status */}
                  {doc.sealTimestamp && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-500">
                      <div className="flex items-center gap-3">
                        <Stamp className="w-6 h-6 text-emerald-600" />
                        <div>
                          <div className="font-semibold text-emerald-900">Government e-Seal Applied</div>
                          <p className="text-sm text-emerald-700">
                            Sealed at: {new Date(doc.sealTimestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How Digital Signatures Work in OSS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="font-semibold mb-2">Investor Signs</h4>
                <p className="text-sm text-gray-600">Forms are digitally signed with PKI certificate</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-purple-600">2</span>
                </div>
                <h4 className="font-semibold mb-2">Officer Signs</h4>
                <p className="text-sm text-gray-600">Agency officer reviews and signs approval</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-indigo-600">3</span>
                </div>
                <h4 className="font-semibold mb-2">System Stamps</h4>
                <p className="text-sm text-gray-600">RFC 3161 timestamp + identity verification</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-emerald-600">4</span>
                </div>
                <h4 className="font-semibold mb-2">e-Seal Applied</h4>
                <p className="text-sm text-gray-600">Government seal makes document legally executable</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Document Details Dialog Component
function DocumentDetails({ document }: { document: Document }) {
  return (
    <div className="space-y-6">
      {/* Document Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Document Information</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">Document ID:</span>
            <p className="font-mono">{document.id}</p>
          </div>
          <div>
            <span className="text-gray-600">Type:</span>
            <p className="font-mono">{document.type}</p>
          </div>
          <div>
            <span className="text-gray-600">Created:</span>
            <p>{new Date(document.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <span className="text-gray-600">Status:</span>
            <Badge>{document.status}</Badge>
          </div>
        </div>
      </div>

      {/* Signatures Timeline */}
      <div>
        <h3 className="font-semibold mb-3">Signatures & Audit Trail</h3>
        <div className="space-y-3">
          {document.signatures.map((sig) => (
            <div key={sig.id} className="border-l-4 border-emerald-500 pl-4 py-3 bg-emerald-50 rounded-r-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {sig.role === 'investor' && <User className="w-4 h-4 text-blue-600" />}
                  {sig.role === 'officer' && <Shield className="w-4 h-4 text-purple-600" />}
                  {sig.role === 'agency' && <Building className="w-4 h-4 text-indigo-600" />}
                  <span className="font-semibold">{sig.signatory}</span>
                  <Badge variant="outline" className="text-xs">{sig.role}</Badge>
                </div>
                <Badge
                  variant={sig.status === 'valid' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {sig.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 mt-3">
                <div>
                  <span className="text-gray-500">Timestamp:</span>
                  <p className="font-mono">{new Date(sig.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">Certificate ID:</span>
                  <p className="font-mono">{sig.certificateId}</p>
                </div>
                <div>
                  <span className="text-gray-500">Document Hash:</span>
                  <p className="font-mono text-xs">{sig.documentHash}</p>
                </div>
                <div>
                  <span className="text-gray-500">IP Address:</span>
                  <p className="font-mono">{sig.ipAddress}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Device:</span>
                  <p className="font-mono">{sig.deviceInfo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* e-Seal Information */}
      {document.sealTimestamp && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-lg border-2 border-emerald-500">
          <div className="flex items-center gap-3 mb-3">
            <Stamp className="w-6 h-6 text-emerald-600" />
            <h3 className="font-semibold text-emerald-900">Government e-Seal</h3>
          </div>
          <div className="text-sm text-emerald-700 space-y-1">
            <p>✓ Document is legally executable</p>
            <p>✓ All required signatures verified</p>
            <p>✓ Sealed at: {new Date(document.sealTimestamp).toLocaleString()}</p>
            <p>✓ Compliant with Bangladesh Digital Signature Act</p>
          </div>
        </div>
      )}
    </div>
  );
}
