// 🏷️ TAG FILTERED SERVICES — Curated service discovery by investor profile
// ARCHITECTURE: UI layer. Reads tagFilterEngine to display categorized services.

import React, { useState } from 'react';
import { getServicesByTag, type TaggedService, type ServiceTag } from './tagFilterEngine';
import { glassCard } from '@/app/config/designSystem';
import { 
  Rocket, 
  Building2, 
  Leaf, 
  TrendingUp, 
  Cpu, 
  Star,
  Clock,
  DollarSign,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ServiceTagSectionProps {
  title: string;
  icon: React.ElementType;
  color: string;
  services: TaggedService[];
  defaultExpanded?: boolean;
}

function ServiceTagSection({ 
  title, 
  icon: Icon, 
  color, 
  services,
  defaultExpanded = false 
}: ServiceTagSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (services.length === 0) {
    return null;
  }

  return (
    <div className={glassCard['p-6']}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between mb-4 hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="px-3 py-1 rounded-full text-sm bg-white/50">
            {services.length} service{services.length !== 1 ? 's' : ''}
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {/* Services Grid */}
      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.serviceId}
              className="p-4 rounded-xl bg-white/40 hover:bg-white/60 transition-all border border-gray-200/50"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm">{service.serviceName}</h4>
                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </div>
              
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {service.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  <span>{service.agencyName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{service.slaInDays}d</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  <span>
                    {service.fee === 0 
                      ? 'Free' 
                      : `${service.fee.toLocaleString()} ${service.currency}`}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-xs bg-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function TagFilteredServices() {
  // 🔌 ENGINE DEPENDENCY: Reads from tagFilterEngine
  const startupServices = getServicesByTag('startup');
  const smeServices = getServicesByTag('sme');
  const greenServices = getServicesByTag('green');
  const exportServices = getServicesByTag('export');
  const techServices = getServicesByTag('tech');
  const priorityServices = getServicesByTag('priority');

  const totalTaggedServices = 
    startupServices.length + 
    smeServices.length + 
    greenServices.length + 
    exportServices.length + 
    techServices.length + 
    priorityServices.length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Smart Service Discovery</h2>
        <p className="text-sm text-gray-600">
          Services curated by investor profile—no need to browse everything. 
          Found <strong>{totalTaggedServices}</strong> categorized services.
        </p>
      </div>

      {/* Tagged Service Sections */}
      <ServiceTagSection
        title="🚀 Startup Friendly Services"
        icon={Rocket}
        color="#8b5cf6" // purple
        services={startupServices}
        defaultExpanded={true}
      />

      <ServiceTagSection
        title="🏭 SME Focused Services"
        icon={Building2}
        color="#3b82f6" // blue
        services={smeServices}
      />

      <ServiceTagSection
        title="🌱 Green / ESG Services"
        icon={Leaf}
        color="#10b981" // green
        services={greenServices}
      />

      <ServiceTagSection
        title="📦 Export-Oriented Services"
        icon={TrendingUp}
        color="#f59e0b" // amber
        services={exportServices}
      />

      <ServiceTagSection
        title="💻 Tech & Innovation Services"
        icon={Cpu}
        color="#ec4899" // pink
        services={techServices}
      />

      <ServiceTagSection
        title="⭐ Priority Fast-Track Services"
        icon={Star}
        color="#ef4444" // red
        services={priorityServices}
      />

      {/* Help Text */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200/50">
        <p className="text-xs text-blue-900">
          💡 <strong>Tip:</strong> Services shown here match your investor profile. 
          Can't find what you need? Check the full services list in Government Permits.
        </p>
      </div>
    </div>
  );
}
