// 🔗 VALUE CHAIN FLOW - Redesigned horizontal flow visualization
// Replaces the vertical list-based ecosystem view with a modern horizontal flow

import React from 'react';
import { 
  Package, Users, Wrench, TruckIcon, Plane,
  Bell, BellOff, Maximize2
} from 'lucide-react';
import type { 
  Supplier, 
  PeerCompany, 
  SupportService, 
  DownstreamPartner, 
  Exporter 
} from './supplyChainEngine';

interface ValueChainFlowProps {
  suppliers: Supplier[];
  peerCompanies: PeerCompany[];
  supportServices: SupportService[];
  downstreamPartners: DownstreamPartner[];
  exporters: Exporter[];
  notifySubscriptions: Set<string>;
  onToggleNotify: (category: string) => void;
  onSelectNode: (type: string, data: any) => void;
  onViewModeChange: (mode: string) => void;
}

export function ValueChainFlow({
  suppliers,
  peerCompanies,
  supportServices,
  downstreamPartners,
  exporters,
  notifySubscriptions,
  onToggleNotify,
  onSelectNode,
  onViewModeChange
}: ValueChainFlowProps) {
  return (
    <div className="space-y-6">
      {/* Visual Flow Header */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">🔗 Complete Value Chain Map</h3>
        <p className="text-gray-600">Visual journey from raw materials to export markets</p>
      </div>

      {/* Horizontal Value Chain Flow */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-8 overflow-x-auto">
        <div className="flex gap-6 min-w-max pb-4">
          {/* Stage 1: Upstream Suppliers */}
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0 w-80">
              <div className="bg-blue-50/50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 rounded-xl p-3">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Upstream Suppliers</h4>
                    <p className="text-xs text-gray-600">Raw materials & components</p>
                  </div>
                  <button
                    onClick={() => onToggleNotify('suppliers')}
                    className={`p-2 rounded-lg transition-all ${
                      notifySubscriptions.has('suppliers')
                        ? 'bg-green-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                    title={notifySubscriptions.has('suppliers') ? 'Notifications enabled' : 'Enable notifications'}
                  >
                    {notifySubscriptions.has('suppliers') ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                  </button>
                </div>
                
                <div className="bg-white rounded-lg p-3 mb-3 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{suppliers.length}</div>
                  <div className="text-xs text-gray-600">Active Suppliers</div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {suppliers.slice(0, 2).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onSelectNode('supplier', s)}
                      className="w-full bg-white hover:bg-blue-50 border border-blue-200 rounded-lg p-3 text-left transition-all"
                    >
                      <div className="font-semibold text-sm text-gray-900 mb-1 truncate">{s.name}</div>
                      <div className="text-xs text-blue-600 truncate">{s.products[0]}</div>
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => onViewModeChange('suppliers')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all"
                >
                  View All {suppliers.length} →
                </button>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="text-2xl">→</div>
              </div>
            </div>
          </div>

          {/* Stage 2: Peer Companies */}
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0 w-80">
              <div className="bg-purple-50/50 border-2 border-purple-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-600 rounded-xl p-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Peer Benchmarking</h4>
                    <p className="text-xs text-gray-600">Similar companies in sector</p>
                  </div>
                  <button
                    onClick={() => onToggleNotify('peer-companies')}
                    className={`p-2 rounded-lg transition-all ${
                      notifySubscriptions.has('peer-companies')
                        ? 'bg-green-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                    title={notifySubscriptions.has('peer-companies') ? 'Notifications enabled' : 'Enable notifications'}
                  >
                    {notifySubscriptions.has('peer-companies') ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                  </button>
                </div>
                
                <div className="bg-white rounded-lg p-3 mb-3 border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{peerCompanies.length}</div>
                  <div className="text-xs text-gray-600">Peer Companies</div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {peerCompanies.slice(0, 2).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onSelectNode('peer', p)}
                      className="w-full bg-white hover:bg-purple-50 border border-purple-200 rounded-lg p-3 text-left transition-all"
                    >
                      <div className="font-semibold text-sm text-gray-900 mb-1 truncate">{p.name}</div>
                      <div className="text-xs text-purple-600">{p.size} • {p.employeeCount} emp</div>
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => onViewModeChange('peer')}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-all"
                >
                  View All {peerCompanies.length} →
                </button>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="text-2xl">→</div>
              </div>
            </div>
          </div>

          {/* Stage 3: Support Services */}
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0 w-80">
              <div className="bg-orange-50/50 border-2 border-orange-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-600 rounded-xl p-3">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Support Services</h4>
                    <p className="text-xs text-gray-600">Consulting & enablement</p>
                  </div>
                  <button
                    onClick={() => onToggleNotify('support-services')}
                    className={`p-2 rounded-lg transition-all ${
                      notifySubscriptions.has('support-services')
                        ? 'bg-green-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                    title={notifySubscriptions.has('support-services') ? 'Notifications enabled' : 'Enable notifications'}
                  >
                    {notifySubscriptions.has('support-services') ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                  </button>
                </div>
                
                <div className="bg-white rounded-lg p-3 mb-3 border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600 mb-1">{supportServices.length}</div>
                  <div className="text-xs text-gray-600">Service Providers</div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {supportServices.slice(0, 2).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onSelectNode('support', s)}
                      className="w-full bg-white hover:bg-orange-50 border border-orange-200 rounded-lg p-3 text-left transition-all"
                    >
                      <div className="font-semibold text-sm text-gray-900 mb-1 truncate">{s.name}</div>
                      <div className="text-xs text-orange-600 capitalize truncate">{s.category}</div>
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => onViewModeChange('support')}
                  className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-all"
                >
                  View All {supportServices.length} →
                </button>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="text-2xl">→</div>
              </div>
            </div>
          </div>

          {/* Stage 4: Downstream Partners */}
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0 w-80">
              <div className="bg-green-50/50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 rounded-xl p-3">
                    <TruckIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Downstream Partners</h4>
                    <p className="text-xs text-gray-600">Distribution & logistics</p>
                  </div>
                  <button
                    onClick={() => onToggleNotify('downstream-partners')}
                    className={`p-2 rounded-lg transition-all ${
                      notifySubscriptions.has('downstream-partners')
                        ? 'bg-green-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                    title={notifySubscriptions.has('downstream-partners') ? 'Notifications enabled' : 'Enable notifications'}
                  >
                    {notifySubscriptions.has('downstream-partners') ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                  </button>
                </div>
                
                <div className="bg-white rounded-lg p-3 mb-3 border border-green-200">
                  <div className="text-2xl font-bold text-green-600 mb-1">{downstreamPartners.length}</div>
                  <div className="text-xs text-gray-600">Distribution Partners</div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {downstreamPartners.slice(0, 2).map((d) => (
                    <button
                      key={d.id}
                      onClick={() => onSelectNode('downstream', d)}
                      className="w-full bg-white hover:bg-green-50 border border-green-200 rounded-lg p-3 text-left transition-all"
                    >
                      <div className="font-semibold text-sm text-gray-900 mb-1 truncate">{d.name}</div>
                      <div className="text-xs text-green-600 capitalize truncate">{d.type.replace('-', ' ')}</div>
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => onViewModeChange('downstream')}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-all"
                >
                  View All {downstreamPartners.length} →
                </button>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="text-2xl">→</div>
              </div>
            </div>
          </div>

          {/* Stage 5: Export Partners */}
          <div className="flex-shrink-0 w-80">
            <div className="bg-indigo-50/50 border-2 border-indigo-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-600 rounded-xl p-3">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Export Markets</h4>
                  <p className="text-xs text-gray-600">International destinations</p>
                </div>
                <button
                  onClick={() => onToggleNotify('exporters')}
                  className={`p-2 rounded-lg transition-all ${
                    notifySubscriptions.has('exporters')
                      ? 'bg-green-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                  title={notifySubscriptions.has('exporters') ? 'Notifications enabled' : 'Enable notifications'}
                >
                  {notifySubscriptions.has('exporters') ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-3 mb-3 border border-indigo-200">
                <div className="text-2xl font-bold text-indigo-600 mb-1">{exporters.length}</div>
                <div className="text-xs text-gray-600">Export Partners</div>
              </div>
              
              <div className="space-y-2 mb-4">
                {exporters.slice(0, 2).map((e) => (
                  <button
                    key={e.id}
                    onClick={() => onSelectNode('exporter', e)}
                    className="w-full bg-white hover:bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-left transition-all"
                  >
                    <div className="font-semibold text-sm text-gray-900 mb-1 truncate">{e.name}</div>
                    <div className="text-xs text-indigo-600 truncate">{e.exportVolume}</div>
                  </button>
                ))}
              </div>
              
              <div className="bg-white border border-indigo-200 rounded-lg p-3 text-center">
                <div className="text-xs text-gray-600 mb-1">Total Export Markets</div>
                <div className="font-bold text-indigo-600">
                  {exporters.reduce((acc, e) => acc + e.destinations.length, 0)} Countries
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll hint */}
        <div className="text-center text-sm text-gray-500 mt-4">
          <span className="inline-flex items-center gap-2">
            <Maximize2 className="w-4 h-4" />
            Scroll horizontally to explore the complete value chain
          </span>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white border-2 border-blue-200 rounded-xl p-4">
          <Package className="w-8 h-8 mb-2 text-blue-600" />
          <div className="text-2xl font-bold text-gray-900">{suppliers.length}</div>
          <div className="text-xs text-gray-600">Suppliers</div>
        </div>
        
        <div className="bg-white border-2 border-purple-200 rounded-xl p-4">
          <Users className="w-8 h-8 mb-2 text-purple-600" />
          <div className="text-2xl font-bold text-gray-900">{peerCompanies.length}</div>
          <div className="text-xs text-gray-600">Peer Companies</div>
        </div>
        
        <div className="bg-white border-2 border-orange-200 rounded-xl p-4">
          <Wrench className="w-8 h-8 mb-2 text-orange-600" />
          <div className="text-2xl font-bold text-gray-900">{supportServices.length}</div>
          <div className="text-xs text-gray-600">Support Services</div>
        </div>
        
        <div className="bg-white border-2 border-green-200 rounded-xl p-4">
          <TruckIcon className="w-8 h-8 mb-2 text-green-600" />
          <div className="text-2xl font-bold text-gray-900">{downstreamPartners.length}</div>
          <div className="text-xs text-gray-600">Distributors</div>
        </div>
        
        <div className="bg-white border-2 border-indigo-200 rounded-xl p-4">
          <Plane className="w-8 h-8 mb-2 text-indigo-600" />
          <div className="text-2xl font-bold text-gray-900">
            {exporters.reduce((acc, e) => acc + e.destinations.length, 0)}
          </div>
          <div className="text-xs text-gray-600">Export Markets</div>
        </div>
      </div>
    </div>
  );
}