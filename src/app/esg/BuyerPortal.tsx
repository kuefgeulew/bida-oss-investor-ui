// Buyer Portal - Public ESG verification portal with shareable links
// Creates: Public route for buyers to verify ESG compliance

import React, { useState } from 'react';
import { Link2, Eye, Shield, CheckCircle, Clock, BarChart, Globe, Copy, Calendar, Download } from 'lucide-react';
import { toast } from 'sonner';

interface ShareableLink {
  id: string;
  token: string;
  createdDate: string;
  expiryDate: string;
  accessCount: number;
  maxAccess: number;
  buyerEmail?: string;
  isActive: boolean;
}

interface BuyerPortalProps {
  investorId: string;
  companyName: string;
  esgScore: any;
}

export function BuyerPortal({ investorId, companyName, esgScore }: BuyerPortalProps) {
  const [links, setLinks] = useState<ShareableLink[]>([
    {
      id: 'link-001',
      token: 'BP-8F3D-KL9M-2N7Q',
      createdDate: '2026-02-01',
      expiryDate: '2026-05-01',
      accessCount: 12,
      maxAccess: 100,
      buyerEmail: 'procurement@h&m.com',
      isActive: true,
    },
  ]);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newLinkConfig, setNewLinkConfig] = useState({
    expiryDays: 90,
    maxAccess: 100,
    buyerEmail: '',
    passwordProtected: false,
  });
  
  const generateShareableLink = () => {
    const token = 'BP-' + Math.random().toString(36).substr(2, 4).toUpperCase() + 
                  '-' + Math.random().toString(36).substr(2, 4).toUpperCase() +
                  '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
    
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + newLinkConfig.expiryDays);
    
    const newLink: ShareableLink = {
      id: `link-${Date.now()}`,
      token: token,
      createdDate: new Date().toISOString().slice(0, 10),
      expiryDate: expiryDate.toISOString().slice(0, 10),
      accessCount: 0,
      maxAccess: newLinkConfig.maxAccess,
      buyerEmail: newLinkConfig.buyerEmail || undefined,
      isActive: true,
    };
    
    setLinks([newLink, ...links]);
    
    const fullUrl = `${window.location.origin}/buyer-portal/${investorId}/${token}`;
    
    navigator.clipboard.writeText(fullUrl);
    
    toast.success('Shareable link created!', {
      description: 'Link copied to clipboard',
    });
    
    setShowCreateModal(false);
    setNewLinkConfig({
      expiryDays: 90,
      maxAccess: 100,
      buyerEmail: '',
      passwordProtected: false,
    });
  };
  
  const copyToClipboard = (token: string) => {
    const fullUrl = `${window.location.origin}/buyer-portal/${investorId}/${token}`;
    navigator.clipboard.writeText(fullUrl);
    
    toast.success('Link copied to clipboard!');
  };
  
  const revokeLink = (linkId: string) => {
    setLinks(links.map(link => 
      link.id === linkId ? { ...link, isActive: false } : link
    ));
    
    toast.success('Link revoked successfully');
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Buyer Verification Portal</h2>
            </div>
            <p className="text-indigo-100">Share real-time ESG data with international buyers</p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Link2 className="w-5 h-5" />
            Create New Link
          </button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Active Links</div>
          <div className="text-3xl font-bold text-indigo-900">
            {links.filter(l => l.isActive).length}
          </div>
        </div>
        
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Total Views</div>
          <div className="text-3xl font-bold text-blue-900">
            {links.reduce((sum, l) => sum + l.accessCount, 0)}
          </div>
        </div>
        
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">This Month</div>
          <div className="text-3xl font-bold text-green-900">
            {links.filter(l => new Date(l.createdDate).getMonth() === new Date().getMonth()).length}
          </div>
        </div>
        
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">ESG Score</div>
          <div className="text-3xl font-bold text-purple-900">
            {esgScore?.overall || 'B+'}
          </div>
        </div>
      </div>
      
      {/* Active Links */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Active Shareable Links</h3>
        
        <div className="space-y-3">
          {links.filter(l => l.isActive).map(link => (
            <div
              key={link.id}
              className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="px-3 py-1 bg-indigo-100 text-indigo-900 rounded font-mono font-bold text-sm">
                      {link.token}
                    </code>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-bold">
                      ACTIVE
                    </span>
                  </div>
                  
                  {link.buyerEmail && (
                    <div className="text-sm text-gray-600 mb-1">
                      Buyer: {link.buyerEmail}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    Created: {new Date(link.createdDate).toLocaleDateString()} | 
                    Expires: {new Date(link.expiryDate).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(link.token)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy</span>
                  </button>
                  
                  <button
                    onClick={() => revokeLink(link.id)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                  >
                    Revoke
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-xs text-gray-600 mb-1">Views</div>
                  <div className="font-bold text-gray-900">{link.accessCount}</div>
                </div>
                
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-xs text-gray-600 mb-1">Max Views</div>
                  <div className="font-bold text-gray-900">{link.maxAccess}</div>
                </div>
                
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-xs text-gray-600 mb-1">Days Left</div>
                  <div className="font-bold text-gray-900">
                    {Math.ceil((new Date(link.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-xs text-gray-600 mb-1">Usage</div>
                  <div className="font-bold text-gray-900">
                    {Math.round((link.accessCount / link.maxAccess) * 100)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* What Buyers See */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
          <Eye className="w-6 h-6" />
          What Buyers Can Access
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <BarChart className="w-5 h-5 text-blue-600" />
              <div className="font-bold text-gray-900">Real-Time ESG Score</div>
            </div>
            <p className="text-sm text-gray-700">Live environmental, social, and governance metrics</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="font-bold text-gray-900">Certifications</div>
            </div>
            <p className="text-sm text-gray-700">ISO 14001, LEED, B Corp, and other verified credentials</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <div className="font-bold text-gray-900">Compliance Data</div>
            </div>
            <p className="text-sm text-gray-700">Labor practices, safety records, environmental compliance</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <div className="font-bold text-gray-900">Carbon Footprint</div>
            </div>
            <p className="text-sm text-gray-700">Emissions data, reduction targets, and progress tracking</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Download className="w-5 h-5 text-teal-600" />
              <div className="font-bold text-gray-900">Downloadable Reports</div>
            </div>
            <p className="text-sm text-gray-700">GRI, SASB, CDP formatted reports ready to download</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-pink-600" />
              <div className="font-bold text-gray-900">Audit History</div>
            </div>
            <p className="text-sm text-gray-700">Third-party audits, inspection results, and compliance records</p>
          </div>
        </div>
      </div>
      
      {/* Create Link Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Create Shareable Link</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Buyer Email (optional)
                </label>
                <input
                  type="email"
                  value={newLinkConfig.buyerEmail}
                  onChange={e => setNewLinkConfig({ ...newLinkConfig, buyerEmail: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="procurement@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expiry (days)
                </label>
                <select
                  value={newLinkConfig.expiryDays}
                  onChange={e => setNewLinkConfig({ ...newLinkConfig, expiryDays: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                >
                  <option value={30}>30 days</option>
                  <option value={60}>60 days</option>
                  <option value={90}>90 days (Recommended)</option>
                  <option value={180}>180 days</option>
                  <option value={365}>1 year</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Maximum Access Count
                </label>
                <input
                  type="number"
                  value={newLinkConfig.maxAccess}
                  onChange={e => setNewLinkConfig({ ...newLinkConfig, maxAccess: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  min="1"
                  max="1000"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newLinkConfig.passwordProtected}
                  onChange={e => setNewLinkConfig({ ...newLinkConfig, passwordProtected: e.target.checked })}
                  className="w-5 h-5"
                />
                <label className="text-sm font-semibold text-gray-700">
                  Password protected (coming soon)
                </label>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={generateShareableLink}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Link2 className="w-5 h-5" />
                Generate Link
              </button>
              
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
