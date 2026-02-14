// 🔍 BBID LOOKUP — Search and verify Bangladesh Business IDs
// ARCHITECTURE: UI layer. Search interface for BBID verification.

import React, { useState } from 'react';
import { Search, QrCode, Building2, Filter, TrendingUp, MapPin, Briefcase } from 'lucide-react';
import { lookupBBID, searchBBID, verifyBBID, getBBIDStatistics } from './bbidEngine';
import { BBIDCard } from './BBIDCard';
import { glassCard } from '@/app/config/designSystem';
import type { BBIDRecord } from './bbidEngine';

export function BBIDLookup() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BBIDRecord[]>([]);
  const [selectedBBID, setSelectedBBID] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<'bbid' | 'company' | 'all'>('all');
  const [showStats, setShowStats] = useState(true);

  const stats = getBBIDStatistics();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    if (searchType === 'bbid') {
      const record = lookupBBID(searchQuery.trim());
      setSearchResults(record ? [record] : []);
    } else if (searchType === 'company') {
      const results = searchBBID({ companyName: searchQuery });
      setSearchResults(results);
    } else {
      // Search both
      const bbidRecord = lookupBBID(searchQuery.trim());
      const companyResults = searchBBID({ companyName: searchQuery });
      
      const combined = bbidRecord ? [bbidRecord, ...companyResults] : companyResults;
      // Remove duplicates
      const unique = Array.from(new Map(combined.map(r => [r.bbid, r])).values());
      setSearchResults(unique);
    }

    if (searchResults.length > 0) {
      setSelectedBBID(searchResults[0].bbid);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleVerifySelected = () => {
    if (selectedBBID) {
      verifyBBID(selectedBBID, 'manual_lookup', 'USER');
      // Refresh the search to show updated verification status
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${glassCard} p-6`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <QrCode className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">BBID Lookup & Verification</h1>
            <p className="text-gray-600">Search and verify Bangladesh Business IDs</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search by BBID or company name..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Fields</option>
            <option value="bbid">BBID Only</option>
            <option value="company">Company Name</option>
          </select>

          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
          >
            Search
          </button>
        </div>
      </div>

      {/* Statistics */}
      {showStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`${glassCard} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <Building2 className="w-6 h-6 text-blue-500" />
              <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            </div>
            <div className="text-sm text-gray-600">Total BBIDs</div>
          </div>

          <div className={`${glassCard} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>

          <div className={`${glassCard} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <QrCode className="w-6 h-6 text-purple-500" />
              <div className="text-2xl font-bold text-purple-600">{stats.verified}</div>
            </div>
            <div className="text-sm text-gray-600">Verified</div>
          </div>

          <div className={`${glassCard} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <MapPin className="w-6 h-6 text-orange-500" />
              <div className="text-2xl font-bold text-orange-600">{Object.keys(stats.byRegion).length}</div>
            </div>
            <div className="text-sm text-gray-600">Regions</div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Search Results ({searchResults.length})
            </h2>
            {selectedBBID && (
              <button
                onClick={handleVerifySelected}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm"
              >
                Verify Selected
              </button>
            )}
          </div>

          {searchResults.map((record) => (
            <div
              key={record.bbid}
              onClick={() => setSelectedBBID(record.bbid)}
              className={`cursor-pointer transition-all ${
                selectedBBID === record.bbid ? 'ring-2 ring-blue-500 rounded-lg' : ''
              }`}
            >
              <BBIDCard
                bbid={record.bbid}
                variant={selectedBBID === record.bbid ? 'full' : 'compact'}
                showQR={selectedBBID === record.bbid}
                showDetails={selectedBBID === record.bbid}
                onVerify={handleVerifySelected}
              />
            </div>
          ))}
        </div>
      ) : searchQuery && (
        <div className={`${glassCard} p-12 text-center`}>
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <div className="text-xl font-semibold text-gray-700">No Results Found</div>
          <div className="text-gray-500 mt-2">Try searching with a different query</div>
        </div>
      )}

      {/* Sector Distribution */}
      {!searchQuery && (
        <div className={`${glassCard} p-6`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            BBID Distribution by Sector
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.bySector)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 6)
              .map(([sector, count]) => {
                const percentage = ((count / stats.total) * 100).toFixed(1);
                return (
                  <div key={sector}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">{sector}</span>
                      <span className="text-gray-600">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
