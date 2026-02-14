// Supply Chain Visualizer Panel - Interactive supply chain network diagram
// READ-ONLY panel that reads from supplyChainEngine
// Mounts in: Sector Hub pages, Investor Dashboard

import React, { useState, useMemo } from 'react';
import { Package, Anchor, Plane, TrendingUp, MapPin, Mail, Award } from 'lucide-react';
import { getSupplyChainMap, calculateSupplyChainCost, type Supplier, type Port, type Exporter } from './supplyChainEngine';

interface SupplyChainVisualizerProps {
  sector: string;
  showCostAnalysis?: boolean;
}

export function SupplyChainVisualizer({ sector, showCostAnalysis = true }: SupplyChainVisualizerProps) {
  const [selectedNode, setSelectedNode] = useState<{ type: 'supplier' | 'port' | 'exporter'; data: any } | null>(null);
  const [productionVolume, setProductionVolume] = useState(1000000); // USD
  const [exportDestination, setExportDestination] = useState('USA');
  
  const supplyChain = useMemo(() => getSupplyChainMap(sector), [sector]);
  const costAnalysis = useMemo(
    () => calculateSupplyChainCost(sector, productionVolume, exportDestination),
    [sector, productionVolume, exportDestination]
  );
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Supply Chain Network</h2>
        <p className="text-purple-100">{sector} — Complete ecosystem mapping</p>
      </div>

      {/* Network Visualization */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Supplier → Manufacturing → Export Flow</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Suppliers ({supplyChain.suppliers.length})</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Ports ({supplyChain.ports.length})</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">Exporters ({supplyChain.exporters.length})</span>
            </div>
          </div>
        </div>
        
        {/* Visual Flow Diagram */}
        <div className="relative">
          {/* Stage 1: Suppliers */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-blue-600" />
              <h4 className="font-bold text-gray-900">Raw Materials & Components</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supplyChain.suppliers.map(supplier => (
                <button
                  key={supplier.id}
                  onClick={() => setSelectedNode({ type: 'supplier', data: supplier })}
                  className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-left hover:bg-blue-100 hover:border-blue-400 transition-all"
                >
                  <div className="font-semibold text-gray-900 mb-1">{supplier.name}</div>
                  <div className="text-xs text-blue-600 font-medium mb-2 capitalize">{supplier.type.replace('-', ' ')}</div>
                  <div className="text-xs text-gray-600">{supplier.products[0]}</div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {supplier.location.district}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Arrow */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center">
              <div className="h-12 w-0.5 bg-gray-300"></div>
              <div className="text-gray-500 text-sm font-medium bg-white px-4 py-1 rounded-full border-2 border-gray-300">
                Manufacturing & Processing
              </div>
              <div className="h-12 w-0.5 bg-gray-300"></div>
            </div>
          </div>
          
          {/* Stage 2: Ports */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Anchor className="w-5 h-5 text-green-600" />
              <h4 className="font-bold text-gray-900">Logistics & Export Hubs</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supplyChain.ports.slice(0, 6).map(port => (
                <button
                  key={port.id}
                  onClick={() => setSelectedNode({ type: 'port', data: port })}
                  className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-left hover:bg-green-100 hover:border-green-400 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {port.type === 'seaport' && <Anchor className="w-4 h-4 text-green-600" />}
                    {port.type === 'airport' && <Plane className="w-4 h-4 text-green-600" />}
                    <div className="font-semibold text-gray-900">{port.name}</div>
                  </div>
                  <div className="text-xs text-green-600 font-medium mb-1 capitalize">{port.type}</div>
                  <div className="text-xs text-gray-600">Clearance: {port.customsClearanceHours}h</div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {port.location.district}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Arrow */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center">
              <div className="h-12 w-0.5 bg-gray-300"></div>
              <div className="text-gray-500 text-sm font-medium bg-white px-4 py-1 rounded-full border-2 border-gray-300">
                Export Operations
              </div>
              <div className="h-12 w-0.5 bg-gray-300"></div>
            </div>
          </div>
          
          {/* Stage 3: Exporters */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h4 className="font-bold text-gray-900">Export Partners</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supplyChain.exporters.map(exporter => (
                <button
                  key={exporter.id}
                  onClick={() => setSelectedNode({ type: 'exporter', data: exporter })}
                  className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-left hover:bg-purple-100 hover:border-purple-400 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-900">{exporter.name}</div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Award className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold">{exporter.rating}</span>
                    </div>
                  </div>
                  <div className="text-xs text-purple-600 font-medium mb-2">{exporter.exportVolume}</div>
                  <div className="text-xs text-gray-600">
                    {exporter.destinations.slice(0, 3).join(', ')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cost Analysis */}
      {showCostAnalysis && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Supply Chain Cost Calculator</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Production Volume (USD)</label>
              <input
                type="number"
                value={productionVolume}
                onChange={(e) => setProductionVolume(Number(e.target.value))}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                step="100000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Export Destination</label>
              <select
                value={exportDestination}
                onChange={(e) => setExportDestination(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option>USA</option>
                <option>EU</option>
                <option>UK</option>
                <option>Asia-Pacific</option>
                <option>Middle East</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-sm text-blue-600 mb-1">Supplier Costs</div>
              <div className="text-2xl font-bold text-gray-900">${(costAnalysis.supplierCost / 1000).toFixed(0)}K</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-sm text-green-600 mb-1">Logistics</div>
              <div className="text-2xl font-bold text-gray-900">${(costAnalysis.logisticsCost / 1000).toFixed(0)}K</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="text-sm text-purple-600 mb-1">Port Fees</div>
              <div className="text-2xl font-bold text-gray-900">${(costAnalysis.portFees / 1000).toFixed(0)}K</div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-400">
              <div className="text-sm text-orange-600 mb-1 font-semibold">Total Cost</div>
              <div className="text-2xl font-bold text-orange-600">${(costAnalysis.totalCost / 1000).toFixed(0)}K</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Recommended Port</div>
                <div className="font-bold text-gray-900">{costAnalysis.recommendedPort}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Estimated Lead Time</div>
                <div className="font-bold text-gray-900">{costAnalysis.estimatedLeadTime}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Panel */}
      {selectedNode && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
            onClick={() => setSelectedNode(null)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full z-50 border-2 border-blue-500 max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
            
            {selectedNode.type === 'supplier' && (
              <SupplierDetail supplier={selectedNode.data} />
            )}
            {selectedNode.type === 'port' && (
              <PortDetail port={selectedNode.data} />
            )}
            {selectedNode.type === 'exporter' && (
              <ExporterDetail exporter={selectedNode.data} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

function SupplierDetail({ supplier }: { supplier: Supplier }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 rounded-full p-3">
          <Package className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{supplier.name}</h3>
          <p className="text-blue-600 font-semibold capitalize">{supplier.type.replace('-', ' ')}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="text-sm font-semibold text-gray-700 mb-2">Products & Services</div>
          <div className="flex flex-wrap gap-2">
            {supplier.products.map((product, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                {product}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Capacity</div>
            <div className="font-bold text-gray-900">{supplier.capacity}</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Lead Time</div>
            <div className="font-bold text-gray-900">{supplier.leadTimeDays} days</div>
          </div>
        </div>
        
        <div>
          <div className="text-sm font-semibold text-gray-700 mb-2">Certifications</div>
          <div className="flex flex-wrap gap-2">
            {supplier.certifications.map((cert, i) => (
              <span key={i} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                <Award className="w-3 h-3" />
                {cert}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">Contact</span>
          </div>
          <a href={`mailto:${supplier.contactEmail}`} className="text-blue-600 hover:underline font-medium">
            {supplier.contactEmail}
          </a>
        </div>
      </div>
    </div>
  );
}

function PortDetail({ port }: { port: Port }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 rounded-full p-3">
          {port.type === 'seaport' && <Anchor className="w-6 h-6 text-green-600" />}
          {port.type === 'airport' && <Plane className="w-6 h-6 text-green-600" />}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{port.name}</h3>
          <p className="text-green-600 font-semibold capitalize">{port.type}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="text-sm font-semibold text-gray-700 mb-2">Capabilities</div>
          <div className="flex flex-wrap gap-2">
            {port.capabilities.map((cap, i) => (
              <span key={i} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                {cap}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Customs Clearance</div>
            <div className="font-bold text-gray-900">{port.customsClearanceHours} hours</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Storage Capacity</div>
            <div className="font-bold text-gray-900">{port.storageCapacity}</div>
          </div>
        </div>
        
        {port.throughputTEU && (
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-sm text-gray-600 mb-1">Annual Throughput</div>
            <div className="text-2xl font-bold text-green-600">{(port.throughputTEU / 1000000).toFixed(1)}M TEU</div>
          </div>
        )}
      </div>
    </div>
  );
}

function ExporterDetail({ exporter }: { exporter: Exporter }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 rounded-full p-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{exporter.name}</h3>
            <p className="text-purple-600 font-semibold">{exporter.sector}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
          <Award className="w-5 h-5 text-yellow-500 fill-current" />
          <span className="text-2xl font-bold text-gray-900">{exporter.rating}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="text-sm text-gray-600 mb-1">Annual Export Volume</div>
          <div className="text-3xl font-bold text-purple-600">{exporter.exportVolume}</div>
        </div>
        
        <div>
          <div className="text-sm font-semibold text-gray-700 mb-2">Export Destinations</div>
          <div className="flex flex-wrap gap-2">
            {exporter.destinations.map((dest, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                {dest}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
            <MapPin className="w-4 h-4" />
            <span className="font-semibold">Location</span>
          </div>
          <div className="text-gray-900 font-medium">{exporter.location.district}, Bangladesh</div>
        </div>
      </div>
    </div>
  );
}
