/**
 * 📱 QR WALLET VERIFICATION — Golden Record Digital ID
 * 
 * Mounted in: Settings tab
 * Purpose: Link physical QR wallet to digital profile
 * Future: Biometric verification integration
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { QrCode, Smartphone, Shield, CheckCircle, AlertCircle, Camera, History } from 'lucide-react';

interface VerificationHistory {
  id: string;
  timestamp: Date;
  method: 'qr_scan' | 'nfc' | 'biometric';
  location: string;
  status: 'success' | 'failed';
}

export function SettingsQRWallet() {
  const [isLinked, setIsLinked] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  
  const verificationHistory: VerificationHistory[] = [
    {
      id: '1',
      timestamp: new Date('2025-02-11T10:30:00'),
      method: 'qr_scan',
      location: 'BIDA HQ, Dhaka',
      status: 'success'
    },
    {
      id: '2',
      timestamp: new Date('2025-02-08T14:15:00'),
      method: 'qr_scan',
      location: 'Chittagong EPZ Office',
      status: 'success'
    },
    {
      id: '3',
      timestamp: new Date('2025-02-05T09:45:00'),
      method: 'qr_scan',
      location: 'Bangladesh Bank',
      status: 'success'
    }
  ];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Golden Record QR Wallet</h2>
        <p className="text-sm text-gray-600 mt-1">
          Your physical QR card linked to your digital investor profile
        </p>
      </div>
      
      {/* Link Status Card */}
      {isLinked ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 bg-blue-50/50 border border-blue-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-xl">
                <QrCode className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Wallet Linked</h3>
                <p className="text-sm text-gray-600 mt-1">Active since January 15, 2025</p>
              </div>
            </div>
            <CheckCircle className="w-16 h-16 text-blue-600" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600">Wallet ID</p>
              <p className="font-mono font-bold mt-1 text-gray-900">BIDA-GR-2025-001234</p>
            </div>
            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600">Last Verified</p>
              <p className="font-bold mt-1 text-gray-900">2 hours ago</p>
            </div>
            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600">Verification Count</p>
              <p className="font-bold mt-1 text-gray-900">47 times</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-orange-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-900">Wallet Not Linked</h3>
              <p className="text-sm text-gray-700 mt-1">
                Link your physical QR wallet to enable instant verification at BIDA offices
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowScanner(true)}
            className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all flex items-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Scan QR Code to Link
          </button>
        </div>
      )}
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Code Preview */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <QrCode className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Your QR Code</h3>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 mb-4">
              {/* Placeholder QR Code */}
              <div className="w-48 h-48 bg-white border-4 border-black flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Simple QR code pattern */}
                  <rect width="100" height="100" fill="white"/>
                  <rect x="0" y="0" width="20" height="20" fill="black"/>
                  <rect x="80" y="0" width="20" height="20" fill="black"/>
                  <rect x="0" y="80" width="20" height="20" fill="black"/>
                  <rect x="40" y="10" width="5" height="5" fill="black"/>
                  <rect x="50" y="15" width="5" height="5" fill="black"/>
                  <rect x="30" y="30" width="10" height="10" fill="black"/>
                  <rect x="60" y="35" width="8" height="8" fill="black"/>
                  <rect x="25" y="60" width="15" height="15" fill="black"/>
                  <rect x="70" y="60" width="10" height="10" fill="black"/>
                </svg>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 text-center mb-4">
              Show this QR code at BIDA offices for instant verification
            </p>
            
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all w-full">
              Download QR Code (PNG)
            </button>
          </div>
        </div>
        
        {/* Security Features */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Security Features</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Encrypted QR Data</p>
                <p className="text-sm text-gray-600">
                  Your QR code contains encrypted investor ID that can only be read by authorized BIDA systems
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Real-Time Verification</p>
                <p className="text-sm text-gray-600">
                  Officers can instantly verify your identity and access your approved documents
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Audit Trail</p>
                <p className="text-sm text-gray-600">
                  Every scan is logged and you can see who accessed your profile
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <Smartphone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Coming Soon: NFC Support</p>
                <p className="text-sm text-gray-600">
                  Tap your phone to BIDA NFC readers for contactless verification
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Verification History */}
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <History className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-bold text-gray-900">Verification History</h3>
        </div>
        
        <div className="space-y-3">
          {verificationHistory.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${
                  record.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {record.method === 'qr_scan' && (
                    <QrCode className={`w-5 h-5 ${
                      record.status === 'success' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  )}
                </div>
                
                <div>
                  <p className="font-semibold text-gray-900">
                    {record.method === 'qr_scan' ? 'QR Code Scan' : 'NFC Tap'}
                  </p>
                  <p className="text-sm text-gray-600">{record.location}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {record.timestamp.toLocaleDateString('en-BD')}
                </p>
                <p className="text-xs text-gray-500">
                  {record.timestamp.toLocaleTimeString('en-BD', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="mt-4 w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all">
          View All History →
        </button>
      </div>
      
      {/* Scanner Modal (Placeholder) */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Scan QR Wallet</h3>
            <div className="w-full h-64 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-16 h-16 text-white" />
            </div>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Position your QR wallet card within the frame
            </p>
            <button
              onClick={() => setShowScanner(false)}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}