/**
 * 👁️ OFFICER ACCESS LOG — Virtual Deal Room Security
 * 
 * Mounted in: Documents tab
 * Shows: Who viewed your file, when, what they accessed
 * Trust: Complete transparency on government access
 */

import { motion } from 'motion/react';
import { Eye, FileText, Download, Clock, User, MapPin, Shield } from 'lucide-react';
import { useState, useMemo } from 'react';

interface AccessRecord {
  id: string;
  officerName: string;
  officerRole: string;
  department: string;
  documentAccessed: string;
  action: 'viewed' | 'downloaded' | 'edited' | 'approved';
  timestamp: Date;
  ipAddress: string;
  location: string;
  duration: number; // seconds
}

interface OfficerAccessLogProps {
  investorId: string;
}

export function OfficerAccessLog({ investorId }: OfficerAccessLogProps) {
  const [filter, setFilter] = useState<'all' | 'viewed' | 'downloaded' | 'edited'>('all');
  
  // Generate realistic access logs (in production, fetch from backend)
  const accessLogs = useMemo((): AccessRecord[] => {
    const now = new Date();
    return [
      {
        id: '1',
        officerName: 'Sarah Ahmed',
        officerRole: 'Senior Investment Officer',
        department: 'BIDA - Manufacturing Division',
        documentAccessed: 'Company Incorporation Certificate',
        action: 'viewed',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        ipAddress: '103.92.xxx.xxx',
        location: 'BIDA HQ, Dhaka',
        duration: 180
      },
      {
        id: '2',
        officerName: 'Rahman Khan',
        officerRole: 'Compliance Officer',
        department: 'NBR - Tax Division',
        documentAccessed: 'Tax Clearance Certificate',
        action: 'approved',
        timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
        ipAddress: '103.92.xxx.xxx',
        location: 'NBR Office, Dhaka',
        duration: 420
      },
      {
        id: '3',
        officerName: 'Fatima Begum',
        officerRole: 'Document Verification Specialist',
        department: 'BIDA - Legal Division',
        documentAccessed: 'Memorandum of Association',
        action: 'downloaded',
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
        ipAddress: '103.92.xxx.xxx',
        location: 'BIDA HQ, Dhaka',
        duration: 90
      },
      {
        id: '4',
        officerName: 'Michael Chen',
        officerRole: 'Foreign Investment Analyst',
        department: 'BIDA - FDI Division',
        documentAccessed: 'Business Plan',
        action: 'viewed',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        ipAddress: '103.92.xxx.xxx',
        location: 'BIDA HQ, Dhaka',
        duration: 600
      },
      {
        id: '5',
        officerName: 'Nasrin Islam',
        officerRole: 'Environmental Compliance Officer',
        department: 'Department of Environment',
        documentAccessed: 'Environmental Impact Assessment',
        action: 'viewed',
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        ipAddress: '103.92.xxx.xxx',
        location: 'DoE Office, Dhaka',
        duration: 840
      },
      {
        id: '6',
        officerName: 'Sarah Ahmed',
        officerRole: 'Senior Investment Officer',
        department: 'BIDA - Manufacturing Division',
        documentAccessed: 'Financial Statements 2024',
        action: 'downloaded',
        timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        ipAddress: '103.92.xxx.xxx',
        location: 'BIDA HQ, Dhaka',
        duration: 240
      },
      {
        id: '7',
        officerName: 'Ahmed Hossain',
        officerRole: 'Sector Specialist',
        department: 'BIDA - Technology Division',
        documentAccessed: 'Technical Specifications',
        action: 'viewed',
        timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        ipAddress: '103.92.xxx.xxx',
        location: 'BIDA HQ, Dhaka',
        duration: 360
      }
    ];
  }, []);
  
  const filteredLogs = useMemo(() => {
    if (filter === 'all') return accessLogs;
    return accessLogs.filter(log => log.action === filter);
  }, [accessLogs, filter]);
  
  const stats = useMemo(() => {
    return {
      totalAccesses: accessLogs.length,
      uniqueOfficers: new Set(accessLogs.map(log => log.officerName)).size,
      totalDownloads: accessLogs.filter(log => log.action === 'downloaded').length,
      last24Hours: accessLogs.filter(log => 
        (new Date().getTime() - log.timestamp.getTime()) < 24 * 60 * 60 * 1000
      ).length
    };
  }, [accessLogs]);
  
  const getActionColor = (action: string) => {
    switch (action) {
      case 'viewed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'downloaded': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'edited': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'viewed': return <Eye className="w-4 h-4" />;
      case 'downloaded': return <Download className="w-4 h-4" />;
      case 'edited': return <FileText className="w-4 h-4" />;
      case 'approved': return <Shield className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };
  
  const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };
  
  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <div className="flex items-center gap-3">
            <Eye className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total Accesses</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalAccesses}</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Officers</p>
              <p className="text-3xl font-bold text-gray-900">{stats.uniqueOfficers}</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <div className="flex items-center gap-3">
            <Download className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Downloads</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalDownloads}</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6 bg-blue-50/50 border border-blue-100">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Last 24 Hours</p>
              <p className="text-3xl font-bold text-gray-900">{stats.last24Hours}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust Signal */}
      <div className="glass-card p-4 bg-blue-50/50 border border-blue-100">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-600" />
          <div>
            <p className="font-semibold text-gray-900">Complete Transparency</p>
            <p className="text-sm text-gray-700">
              Every government officer's access to your documents is logged and visible to you in real-time.
              This is your virtual deal room with full audit trail.
            </p>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex items-center gap-3">
        <p className="text-sm font-semibold text-gray-700">Filter by action:</p>
        <div className="flex gap-2">
          {['all', 'viewed', 'downloaded', 'edited'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-blue-50/50 hover:bg-blue-50 hover:shadow-lg ${
                filter === f
                  ? 'border-2 border-blue-600 shadow-lg'
                  : 'border border-blue-100'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Access Log Table */}
      <div className="glass-card bg-blue-50/50 rounded-xl border border-blue-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Officer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log, idx) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{log.officerName}</p>
                      <p className="text-sm text-gray-600">{log.officerRole}</p>
                      <p className="text-xs text-gray-500">{log.department}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">{log.documentAccessed}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${getActionColor(log.action)}`}>
                      {getActionIcon(log.action)}
                      <span className="text-sm font-semibold capitalize">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatTimeAgo(log.timestamp)}</p>
                      <p className="text-xs text-gray-500">{log.timestamp.toLocaleString('en-BD')}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">
                      {Math.floor(log.duration / 60)}m {log.duration % 60}s
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-900">{log.location}</p>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Export Options */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600">
          Need a complete audit report? Export all access logs for your records.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg">
          <Download className="w-4 h-4 inline mr-2" />
          Export Access Log (CSV)
        </button>
      </div>
      
      {/* Footer */}
      <div className="text-center text-xs text-gray-600">
        <p>All access logs are stored securely and retained for 7 years as per BIDA data retention policy</p>
        <p className="mt-1">IP addresses are masked for privacy • Last updated: {new Date().toLocaleString('en-BD')}</p>
      </div>
    </div>
  );
}