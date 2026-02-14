import { motion } from 'motion/react';
import {
  Code,
  Database,
  Key,
  Globe,
  Server,
  Shield,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  GitBranch,
  FileCode,
  Building
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { toast } from 'sonner';

interface APIEndpoint {
  id: string;
  name: string;
  endpoint: string;
  method: string;
  description: string;
  required: boolean;
  agency: string;
  status: 'implemented' | 'required' | 'planned';
  sampleRequest?: string;
  sampleResponse?: string;
}

const requiredAPIs: APIEndpoint[] = [
  {
    id: 'rjsc-company',
    name: 'RJSC Company Search',
    endpoint: '/api/v1/rjsc/companies/search',
    method: 'GET',
    description: 'Search and verify registered companies',
    required: true,
    agency: 'RJSC',
    status: 'required',
    sampleRequest: '?companyName=ABC%20Limited&tin=123456789',
    sampleResponse: '{"companyId": "123", "name": "ABC Limited", "status": "active", "tin": "123456789"}'
  },
  {
    id: 'rjsc-register',
    name: 'RJSC Company Registration',
    endpoint: '/api/v1/rjsc/companies/register',
    method: 'POST',
    description: 'Submit new company registration application',
    required: true,
    agency: 'RJSC',
    status: 'required',
    sampleRequest: '{"companyName": "...", "directors": [...], "capital": 1000000}',
    sampleResponse: '{"applicationId": "REG-2026-001", "status": "submitted", "estimatedDays": 7}'
  },
  {
    id: 'nbr-tin',
    name: 'NBR TIN Issuance',
    endpoint: '/api/v1/nbr/tin/issue',
    method: 'POST',
    description: 'Apply for Tax Identification Number',
    required: true,
    agency: 'NBR',
    status: 'required',
    sampleRequest: '{"applicantName": "...", "nid": "...", "companyId": "123"}',
    sampleResponse: '{"tin": "987654321", "issueDate": "2026-01-30", "status": "active"}'
  },
  {
    id: 'nbr-verify',
    name: 'NBR TIN Verification',
    endpoint: '/api/v1/nbr/tin/verify',
    method: 'GET',
    description: 'Verify TIN status and details',
    required: true,
    agency: 'NBR',
    status: 'required'
  },
  {
    id: 'doe-clearance',
    name: 'DoE Environmental Clearance',
    endpoint: '/api/v1/doe/clearance/apply',
    method: 'POST',
    description: 'Submit environmental clearance application',
    required: true,
    agency: 'DoE',
    status: 'required'
  },
  {
    id: 'doe-status',
    name: 'DoE Application Status',
    endpoint: '/api/v1/doe/clearance/status',
    method: 'GET',
    description: 'Check clearance application status',
    required: true,
    agency: 'DoE',
    status: 'required'
  },
  {
    id: 'bank-account',
    name: 'Bank Account Opening',
    endpoint: '/api/v1/banking/accounts/open',
    method: 'POST',
    description: 'Initiate corporate bank account opening',
    required: true,
    agency: 'Bangladesh Bank',
    status: 'required'
  },
  {
    id: 'utility-connection',
    name: 'Utility Connection Request',
    endpoint: '/api/v1/utilities/connect',
    method: 'POST',
    description: 'Request power, water, gas connection',
    required: true,
    agency: 'Utilities',
    status: 'required'
  },
  {
    id: 'geo-divisions',
    name: 'Bangladesh Geo Data',
    endpoint: '/api/v2.0/geo/divisions',
    method: 'GET',
    description: 'Get divisions, districts, upazilas',
    required: false,
    agency: 'Public API',
    status: 'implemented'
  }
];

const technicalRequirements = [
  {
    category: 'Authentication',
    items: [
      'OAuth 2.0 / OpenID Connect for API authentication',
      'JWT tokens with 1-hour expiry',
      'API keys for server-to-server communication',
      'Rate limiting: 100 requests/minute per client'
    ]
  },
  {
    category: 'Security',
    items: [
      'TLS 1.3 encryption for all API calls',
      'IP whitelisting for government agency endpoints',
      'Request signing with HMAC-SHA256',
      'Audit logging of all API requests'
    ]
  },
  {
    category: 'Data Format',
    items: [
      'JSON request/response format',
      'UTF-8 encoding',
      'ISO 8601 date format',
      'Standardized error codes and messages'
    ]
  },
  {
    category: 'Performance',
    items: [
      'Maximum response time: 500ms (95th percentile)',
      '99.9% uptime SLA',
      'Webhook support for async operations',
      'Pagination for large datasets (max 100 records/page)'
    ]
  }
];

export function IntegrationBlueprint() {
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  }

  const byAgency = requiredAPIs.reduce((acc, api) => {
    if (!acc[api.agency]) acc[api.agency] = [];
    acc[api.agency].push(api);
    return acc;
  }, {} as Record<string, APIEndpoint[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">API Integration Blueprint</h1>
              <p className="text-gray-600">Technical roadmap for government agencies to connect to OSS</p>
            </div>
          </div>

          <Card className="border-l-4 border-l-cyan-600 bg-gradient-to-r from-cyan-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Database className="w-8 h-8 text-cyan-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">This Document Enables "Go Live Tomorrow"</h3>
                  <p className="text-gray-700 mb-3">
                    This blueprint provides the exact API specifications government agencies need to implement 
                    for OSS to become a fully operational platform. Once these APIs are deployed, the system 
                    becomes fully integrated across all agencies.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-semibold">8 Required APIs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-semibold">REST Architecture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-semibold">OAuth 2.0 Auth</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Server className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{requiredAPIs.length}</div>
                  <div className="text-sm text-gray-600">Total Endpoints</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {requiredAPIs.filter(a => a.status === 'required').length}
                  </div>
                  <div className="text-sm text-gray-600">Required Now</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {requiredAPIs.filter(a => a.status === 'implemented').length}
                  </div>
                  <div className="text-sm text-gray-600">Implemented</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Building className="w-8 h-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{Object.keys(byAgency).length}</div>
                  <div className="text-sm text-gray-600">Agencies</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Catalog */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto">
            <TabsTrigger value="all">All APIs</TabsTrigger>
            <TabsTrigger value="rjsc">RJSC</TabsTrigger>
            <TabsTrigger value="nbr">NBR</TabsTrigger>
            <TabsTrigger value="doe">DoE</TabsTrigger>
            <TabsTrigger value="bank">Banking</TabsTrigger>
            <TabsTrigger value="util">Utilities</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {Object.entries(byAgency).map(([agency, apis]) => (
                <Card key={agency}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      {agency}
                      <Badge variant="outline">{apis.length} endpoints</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {apis.map(api => (
                        <APICard key={api.id} api={api} onCopy={copyToClipboard} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {Object.entries(byAgency).map(([agency, apis]) => (
            <TabsContent key={agency} value={agency.toLowerCase().replace(/\s+/g, '-')} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{agency} API Endpoints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {apis.map(api => (
                      <APICard key={api.id} api={api} onCopy={copyToClipboard} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Technical Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Technical Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {technicalRequirements.map((req, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    {req.category}
                  </h4>
                  <ul className="space-y-2">
                    {req.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Implementation Phases */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              Implementation Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">Phase 1: Core Registry APIs (Weeks 1-4)</h4>
                  <p className="text-gray-600 mb-2">RJSC company search, registration, and NBR TIN issuance</p>
                  <Badge>Priority: Critical</Badge>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-purple-600">2</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">Phase 2: Regulatory Clearances (Weeks 5-8)</h4>
                  <p className="text-gray-600 mb-2">DoE environmental clearance, DIFE factory license</p>
                  <Badge variant="secondary">Priority: High</Badge>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-emerald-600">3</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">Phase 3: Financial & Utility Integration (Weeks 9-12)</h4>
                  <p className="text-gray-600 mb-2">Banking APIs, utility connection requests</p>
                  <Badge variant="outline">Priority: Medium</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function APICard({ api, onCopy }: { api: APIEndpoint; onCopy: (text: string) => void }) {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-900">{api.name}</h4>
            <Badge
              variant={api.method === 'GET' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {api.method}
            </Badge>
            <Badge
              variant={api.status === 'implemented' ? 'default' : 'destructive'}
              className="text-xs"
            >
              {api.status}
            </Badge>
            {api.required && <Badge variant="outline" className="text-xs">Required</Badge>}
          </div>
          <p className="text-sm text-gray-600 mb-2">{api.description}</p>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
              {api.endpoint}
            </code>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onCopy(api.endpoint)}
              className="h-6 px-2"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {api.sampleRequest && (
        <div className="mt-3 space-y-2">
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-1">Sample Request:</div>
            <code className="text-xs bg-blue-50 px-2 py-1 rounded block font-mono text-blue-800">
              {api.sampleRequest}
            </code>
          </div>
          {api.sampleResponse && (
            <div>
              <div className="text-xs font-semibold text-gray-700 mb-1">Sample Response:</div>
              <code className="text-xs bg-emerald-50 px-2 py-1 rounded block font-mono text-emerald-800">
                {api.sampleResponse}
              </code>
            </div>
          )}
        </div>
      )}
    </div>
  );
}