/**
 * 🔐 SECURITY SETTINGS — SSO & Future Authentication
 * 
 * Mounted in: Settings tab
 * Purpose: SSO placeholder, 2FA, biometric preparation
 * Future: Real SSO integration with govt identity systems
 */

import { motion } from 'motion/react';
import { Shield, Fingerprint, Smartphone, Lock, Key, CheckCircle, AlertTriangle, Globe } from 'lucide-react';

export function SettingsSecurity() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Security & Authentication</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage your login methods and security preferences
        </p>
      </div>
      
      {/* Current Security Status */}
      <div className="glass-card p-8 bg-blue-50/50 border border-blue-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-100 rounded-xl">
              <Shield className="w-12 h-12 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Security Score: 85/100</h3>
              <p className="text-sm text-gray-600 mt-1">Very Good Protection</p>
            </div>
          </div>
          <CheckCircle className="w-16 h-16 text-blue-600" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100">
            <p className="text-sm text-gray-600">Active Since</p>
            <p className="font-bold mt-1 text-gray-900">January 15, 2025</p>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100">
            <p className="text-sm text-gray-600">Last Login</p>
            <p className="font-bold mt-1 text-gray-900">2 hours ago</p>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100">
            <p className="text-sm text-gray-600">Failed Attempts</p>
            <p className="font-bold mt-1 text-gray-900">0 (last 30 days)</p>
          </div>
        </div>
      </div>
      
      {/* Authentication Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Method: Password */}
        <div className="p-6 bg-white rounded-xl border-2 border-green-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Password Login</h3>
                <p className="text-sm text-gray-600">Currently Active</p>
              </div>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Last changed</span>
              <span className="font-semibold text-gray-900">30 days ago</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Strength</span>
              <span className="font-semibold text-green-600">Strong</span>
            </div>
          </div>
          
          <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all">
            Change Password
          </button>
        </div>
        
        {/* 2FA */}
        <div className="p-6 bg-white rounded-xl border-2 border-orange-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Smartphone className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Two-Factor Auth (2FA)</h3>
                <p className="text-sm text-gray-600">Not Enabled</p>
              </div>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
          
          <p className="text-sm text-gray-700 mb-4">
            Add an extra layer of security by requiring a code from your phone in addition to your password.
          </p>
          
          <button className="w-full px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all">
            Enable 2FA (Coming Soon)
          </button>
        </div>
      </div>
      
      {/* SSO Integration - Future */}
      <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-4 bg-blue-600 rounded-xl">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Single Sign-On (SSO)</h3>
            <p className="text-gray-700 mb-4">
              Login to BIDA OSS using your existing government or corporate identity credentials.
              One login for all government services.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Bangladesh National ID */}
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%23006A4E'/%3E%3Ccircle cx='12' cy='12' r='8' fill='%23F42A41'/%3E%3C/svg%3E"
                    alt="Bangladesh" 
                    className="w-6 h-6"
                  />
                  <p className="font-semibold text-gray-900">National ID</p>
                </div>
                <p className="text-xs text-gray-600 mb-3">Login with Bangladesh NID</p>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full inline-block">
                  Coming Q3 2025
                </div>
              </div>
              
              {/* Corporate SSO */}
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Key className="w-6 h-6 text-blue-600" />
                  <p className="font-semibold text-gray-900">Corporate SSO</p>
                </div>
                <p className="text-xs text-gray-600 mb-3">Azure AD, Okta, Google Workspace</p>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full inline-block">
                  Coming Q4 2025
                </div>
              </div>
              
              {/* Biometric */}
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Fingerprint className="w-6 h-6 text-purple-600" />
                  <p className="font-semibold text-gray-900">Biometric Auth</p>
                </div>
                <p className="text-xs text-gray-600 mb-3">Face ID, Fingerprint, Iris Scan</p>
                <div className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full inline-block">
                  In Research
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg border-2 border-blue-300">
              <p className="text-sm text-gray-700">
                <strong>🎯 Vision:</strong> BIDA is working with the Bangladesh Computer Council and 
                Election Commission to enable seamless login using National ID credentials, making 
                BIDA OSS part of the Bangladesh Digital Government ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Security Recommendations */}
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Security Recommendations</h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">✓ Strong password in use</p>
              <p className="text-sm text-gray-600">Your password meets all security requirements</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">⚠ Enable Two-Factor Authentication</p>
              <p className="text-sm text-gray-600 mb-2">
                Protect your account from unauthorized access by enabling 2FA
              </p>
              <button className="px-4 py-2 bg-orange-600 text-white text-sm font-semibold rounded-lg hover:bg-orange-700">
                Enable 2FA
              </button>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">✓ No suspicious activity detected</p>
              <p className="text-sm text-gray-600">Your account shows normal login patterns</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Session Management */}
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Active Sessions</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Smartphone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Current Session</p>
                <p className="text-sm text-gray-600">Chrome on Windows • Dhaka, Bangladesh</p>
                <p className="text-xs text-gray-500">Started 2 hours ago</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
              Active
            </span>
          </div>
          
          <button className="w-full px-6 py-3 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-all">
            Sign Out All Other Sessions
          </button>
        </div>
      </div>
    </div>
  );
}