/**
 * 📚 COMPREHENSIVE API DOCUMENTATION
 * 
 * Complete developer documentation for BIDA OSS API
 * Including: OpenAPI spec, endpoints, examples, authentication guide
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Code, 
  Book, 
  Key, 
  Terminal, 
  Copy, 
  CheckCircle, 
  ExternalLink, 
  FileCode, 
  Shield,
  Zap,
  Globe,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  auth: boolean;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  requestBody?: {
    type: string;
    example: string;
  };
  response: {
    status: number;
    example: string;
  };
  codeExample: {
    curl: string;
    javascript: string;
    python: string;
  };
}

const API_ENDPOINTS: Array<{ category: string; endpoints: Endpoint[] }> = [
  {
    category: 'Investor Profile',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/investor/profile',
        description: 'Get current investor profile information',
        auth: true,
        response: {
          status: 200,
          example: `{
  "id": "inv_12345",
  "name": "Acme Manufacturing Ltd",
  "country": "USA",
  "sector": "Manufacturing - Electronics",
  "investmentAmount": 5000000,
  "status": "active",
  "registrationDate": "2025-01-15T00:00:00Z",
  "contact": {
    "email": "investor@acme.com",
    "phone": "+1-555-0123"
  }
}`
        },
        codeExample: {
          curl: `curl -X GET "https://api.bida.gov.bd/v1/investor/profile" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
          javascript: `const response = await fetch('https://api.bida.gov.bd/v1/investor/profile', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
console.log(data);`,
          python: `import requests

url = "https://api.bida.gov.bd/v1/investor/profile"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`
        }
      },
      {
        method: 'PUT',
        path: '/api/v1/investor/profile',
        description: 'Update investor profile information',
        auth: true,
        requestBody: {
          type: 'application/json',
          example: `{
  "contact": {
    "email": "newemail@acme.com",
    "phone": "+1-555-9999"
  },
  "investmentAmount": 7500000
}`
        },
        response: {
          status: 200,
          example: `{
  "success": true,
  "message": "Profile updated successfully",
  "updatedFields": ["contact.email", "contact.phone", "investmentAmount"]
}`
        },
        codeExample: {
          curl: `curl -X PUT "https://api.bida.gov.bd/v1/investor/profile" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"contact":{"email":"newemail@acme.com"}}'`,
          javascript: `const response = await fetch('https://api.bida.gov.bd/v1/investor/profile', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    contact: {
      email: "newemail@acme.com",
      phone: "+1-555-9999"
    }
  })
});`,
          python: `import requests

url = "https://api.bida.gov.bd/v1/investor/profile"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
data = {"contact": {"email": "newemail@acme.com"}}

response = requests.put(url, headers=headers, json=data)`
        }
      }
    ]
  },
  {
    category: 'Applications',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/applications',
        description: 'List all applications with status',
        auth: true,
        parameters: [
          { name: 'status', type: 'string', required: false, description: 'Filter by status (pending, approved, rejected)' },
          { name: 'limit', type: 'number', required: false, description: 'Number of results (default: 20)' },
          { name: 'offset', type: 'number', required: false, description: 'Pagination offset (default: 0)' }
        ],
        response: {
          status: 200,
          example: `{
  "total": 15,
  "applications": [
    {
      "id": "app_67890",
      "type": "registration",
      "status": "approved",
      "submittedAt": "2025-01-20T10:30:00Z",
      "approvedAt": "2025-01-25T14:20:00Z",
      "officer": "officer_456"
    }
  ],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "hasMore": false
  }
}`
        },
        codeExample: {
          curl: `curl -X GET "https://api.bida.gov.bd/v1/applications?status=approved&limit=10" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
          javascript: `const params = new URLSearchParams({
  status: 'approved',
  limit: '10'
});

const response = await fetch(\`https://api.bida.gov.bd/v1/applications?\${params}\`, {
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
});`,
          python: `params = {'status': 'approved', 'limit': 10}
response = requests.get(
    'https://api.bida.gov.bd/v1/applications',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    params=params
)`
        }
      },
      {
        method: 'POST',
        path: '/api/v1/applications',
        description: 'Submit a new application',
        auth: true,
        requestBody: {
          type: 'application/json',
          example: `{
  "type": "work_permit",
  "data": {
    "employeeName": "John Doe",
    "position": "Senior Engineer",
    "nationality": "USA",
    "salary": 50000
  }
}`
        },
        response: {
          status: 201,
          example: `{
  "success": true,
  "applicationId": "app_78901",
  "status": "pending",
  "estimatedProcessingDays": 7,
  "message": "Application submitted successfully"
}`
        },
        codeExample: {
          curl: `curl -X POST "https://api.bida.gov.bd/v1/applications" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"type":"work_permit","data":{"employeeName":"John Doe"}}'`,
          javascript: `const response = await fetch('https://api.bida.gov.bd/v1/applications', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'work_permit',
    data: {
      employeeName: 'John Doe',
      position: 'Senior Engineer'
    }
  })
});`,
          python: `data = {
    'type': 'work_permit',
    'data': {
        'employeeName': 'John Doe',
        'position': 'Senior Engineer'
    }
}
response = requests.post(
    'https://api.bida.gov.bd/v1/applications',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json=data
)`
        }
      }
    ]
  },
  {
    category: 'Documents',
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/documents/upload',
        description: 'Upload a document to your investor vault',
        auth: true,
        requestBody: {
          type: 'multipart/form-data',
          example: `FormData:
  file: <binary>
  type: "passport" | "incorporation" | "financial"
  category: "identity" | "legal" | "financial"
  description: "Optional description"`
        },
        response: {
          status: 201,
          example: `{
  "success": true,
  "documentId": "doc_45678",
  "url": "https://vault.bida.gov.bd/documents/doc_45678",
  "fileName": "passport_johndoe.pdf",
  "uploadedAt": "2025-02-11T10:30:00Z",
  "verified": false
}`
        },
        codeExample: {
          curl: `curl -X POST "https://api.bida.gov.bd/v1/documents/upload" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@/path/to/document.pdf" \\
  -F "type=passport" \\
  -F "category=identity"`,
          javascript: `const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('type', 'passport');
formData.append('category', 'identity');

const response = await fetch('https://api.bida.gov.bd/v1/documents/upload', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});`,
          python: `files = {'file': open('document.pdf', 'rb')}
data = {'type': 'passport', 'category': 'identity'}

response = requests.post(
    'https://api.bida.gov.bd/v1/documents/upload',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    files=files,
    data=data
)`
        }
      },
      {
        method: 'GET',
        path: '/api/v1/documents',
        description: 'List all uploaded documents',
        auth: true,
        parameters: [
          { name: 'category', type: 'string', required: false, description: 'Filter by category' },
          { name: 'verified', type: 'boolean', required: false, description: 'Filter by verification status' }
        ],
        response: {
          status: 200,
          example: `{
  "total": 8,
  "documents": [
    {
      "id": "doc_45678",
      "fileName": "passport_johndoe.pdf",
      "type": "passport",
      "category": "identity",
      "uploadedAt": "2025-02-11T10:30:00Z",
      "verified": true,
      "verifiedBy": "officer_123",
      "url": "https://vault.bida.gov.bd/documents/doc_45678"
    }
  ]
}`
        },
        codeExample: {
          curl: `curl -X GET "https://api.bida.gov.bd/v1/documents?verified=true" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
          javascript: `const response = await fetch('https://api.bida.gov.bd/v1/documents?verified=true', {
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
});
const data = await response.json();`,
          python: `params = {'verified': 'true'}
response = requests.get(
    'https://api.bida.gov.bd/v1/documents',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    params=params
)`
        }
      }
    ]
  },
  {
    category: 'Incentives',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/incentives/eligible',
        description: 'Get list of incentives you qualify for',
        auth: true,
        response: {
          status: 200,
          example: `{
  "total": 7,
  "totalValue": 430000,
  "incentives": [
    {
      "id": "inc_001",
      "name": "10-Year Tax Holiday",
      "category": "Tax Exemption",
      "value": 250000,
      "description": "Full corporate tax exemption for 10 years",
      "eligible": true,
      "requirements": ["Export-oriented", "Min $5M investment"]
    }
  ]
}`
        },
        codeExample: {
          curl: `curl -X GET "https://api.bida.gov.bd/v1/incentives/eligible" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
          javascript: `const response = await fetch('https://api.bida.gov.bd/v1/incentives/eligible', {
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
});
const incentives = await response.json();`,
          python: `response = requests.get(
    'https://api.bida.gov.bd/v1/incentives/eligible',
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)
incentives = response.json()`
        }
      },
      {
        method: 'POST',
        path: '/api/v1/incentives/apply',
        description: 'Apply for specific incentives',
        auth: true,
        requestBody: {
          type: 'application/json',
          example: `{
  "incentiveIds": ["inc_001", "inc_002", "inc_003"]
}`
        },
        response: {
          status: 201,
          example: `{
  "success": true,
  "applicationsSubmitted": 3,
  "estimatedProcessingDays": 14,
  "trackingIds": ["trk_001", "trk_002", "trk_003"]
}`
        },
        codeExample: {
          curl: `curl -X POST "https://api.bida.gov.bd/v1/incentives/apply" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"incentiveIds":["inc_001","inc_002"]}'`,
          javascript: `const response = await fetch('https://api.bida.gov.bd/v1/incentives/apply', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    incentiveIds: ['inc_001', 'inc_002']
  })
});`,
          python: `data = {'incentiveIds': ['inc_001', 'inc_002']}
response = requests.post(
    'https://api.bida.gov.bd/v1/incentives/apply',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json=data
)`
        }
      }
    ]
  }
];

export function APIDocumentation() {
  const [selectedLanguage, setSelectedLanguage] = useState<'curl' | 'javascript' | 'python'>('curl');
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'POST': return 'bg-green-100 text-green-700 border-green-300';
      case 'PUT': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'DELETE': return 'bg-red-100 text-red-700 border-red-300';
      case 'PATCH': return 'bg-purple-100 text-purple-700 border-purple-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">BIDA OSS API Documentation</h1>
            <p className="text-gray-600">
              Complete REST API reference for integrating with Bangladesh Investment Development Authority One-Stop Service
            </p>
          </div>
          <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold border-2 border-green-300">
            v1.0.0
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-5 h-5 text-blue-600" />
              <p className="text-sm font-semibold text-blue-900">Base URL</p>
            </div>
            <code className="text-xs text-blue-700">https://api.bida.gov.bd/v1</code>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm font-semibold text-green-900">Uptime</p>
            </div>
            <p className="text-lg font-bold text-green-700">99.9%</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-purple-600" />
              <p className="text-sm font-semibold text-purple-900">Rate Limit</p>
            </div>
            <p className="text-lg font-bold text-purple-700">1000/hour</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-1">
              <Terminal className="w-5 h-5 text-orange-600" />
              <p className="text-sm font-semibold text-orange-900">Endpoints</p>
            </div>
            <p className="text-lg font-bold text-orange-700">{API_ENDPOINTS.reduce((sum, cat) => sum + cat.endpoints.length, 0)}</p>
          </div>
        </div>
      </div>

      {/* Authentication Guide */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Authentication</h2>
            <p className="text-sm text-gray-600">All API requests require authentication via Bearer token</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">Authorization Header:</p>
          <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-300">
            <code className="text-sm text-gray-900">Authorization: Bearer YOUR_API_KEY</code>
            <button
              onClick={() => copyCode('Authorization: Bearer YOUR_API_KEY', 'auth-header')}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              {copiedCode === 'auth-header' ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-900">
            <strong>⚠️ Security:</strong> Never expose your API key in client-side code or public repositories. 
            Keep your keys secure and rotate them regularly.
          </p>
        </div>
      </div>

      {/* Language Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-700">Code Examples:</span>
        <div className="flex items-center gap-2">
          {(['curl', 'javascript', 'python'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedLanguage === lang
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {lang === 'curl' ? 'cURL' : lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* API Endpoints by Category */}
      {API_ENDPOINTS.map((category, catIndex) => (
        <div key={catIndex} className="glass-card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.category}</h2>
          
          <div className="space-y-4">
            {category.endpoints.map((endpoint, endIndex) => {
              const endpointId = `${catIndex}-${endIndex}`;
              const isExpanded = expandedEndpoint === endpointId;

              return (
                <div key={endIndex} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  {/* Endpoint Header */}
                  <button
                    onClick={() => setExpandedEndpoint(isExpanded ? null : endpointId)}
                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-md font-bold text-sm border-2 ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono text-gray-900">{endpoint.path}</code>
                      {endpoint.auth && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                          🔒 Auth Required
                        </span>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    )}
                  </button>

                  {/* Endpoint Details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 bg-white border-t-2 border-gray-200"
                    >
                      <p className="text-gray-700 mb-4">{endpoint.description}</p>

                      {/* Parameters */}
                      {endpoint.parameters && endpoint.parameters.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-bold text-gray-900 mb-2">Query Parameters:</h4>
                          <div className="space-y-2">
                            {endpoint.parameters.map((param, idx) => (
                              <div key={idx} className="p-3 bg-gray-50 rounded border border-gray-200">
                                <div className="flex items-center gap-2 mb-1">
                                  <code className="text-sm font-bold text-blue-600">{param.name}</code>
                                  <span className="text-xs text-gray-600">{param.type}</span>
                                  {param.required && (
                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">
                                      Required
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600">{param.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Request Body */}
                      {endpoint.requestBody && (
                        <div className="mb-4">
                          <h4 className="text-sm font-bold text-gray-900 mb-2">Request Body ({endpoint.requestBody.type}):</h4>
                          <div className="bg-gray-900 rounded-lg p-4 relative">
                            <pre className="text-sm text-green-400 overflow-x-auto">
                              <code>{endpoint.requestBody.example}</code>
                            </pre>
                            <button
                              onClick={() => copyCode(endpoint.requestBody!.example, `req-${endpointId}`)}
                              className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded transition-colors"
                            >
                              {copiedCode === `req-${endpointId}` ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Response */}
                      <div className="mb-4">
                        <h4 className="text-sm font-bold text-gray-900 mb-2">
                          Response ({endpoint.response.status}):
                        </h4>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                          <pre className="text-sm text-green-400 overflow-x-auto">
                            <code>{endpoint.response.example}</code>
                          </pre>
                          <button
                            onClick={() => copyCode(endpoint.response.example, `res-${endpointId}`)}
                            className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded transition-colors"
                          >
                            {copiedCode === `res-${endpointId}` ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Code Example */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-2">Code Example:</h4>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                          <pre className="text-sm text-green-400 overflow-x-auto">
                            <code>{endpoint.codeExample[selectedLanguage]}</code>
                          </pre>
                          <button
                            onClick={() => copyCode(endpoint.codeExample[selectedLanguage], `code-${endpointId}`)}
                            className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded transition-colors"
                          >
                            {copiedCode === `code-${endpointId}` ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Additional Resources */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Resources</h2>
        <div className="grid grid-cols-2 gap-4">
          <a
            href="#"
            className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-colors flex items-center gap-3"
          >
            <FileCode className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-bold text-gray-900">OpenAPI Specification</p>
              <p className="text-xs text-gray-600">Download YAML/JSON spec</p>
            </div>
            <ExternalLink className="w-4 h-4 text-blue-600 ml-auto" />
          </a>
          <a
            href="#"
            className="p-4 bg-green-50 rounded-lg border-2 border-green-200 hover:border-green-400 transition-colors flex items-center gap-3"
          >
            <Book className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-bold text-gray-900">Integration Guide</p>
              <p className="text-xs text-gray-600">Step-by-step tutorials</p>
            </div>
            <ExternalLink className="w-4 h-4 text-green-600 ml-auto" />
          </a>
          <a
            href="#"
            className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-colors flex items-center gap-3"
          >
            <Terminal className="w-6 h-6 text-purple-600" />
            <div>
              <p className="font-bold text-gray-900">Postman Collection</p>
              <p className="text-xs text-gray-600">Import ready-to-use requests</p>
            </div>
            <ExternalLink className="w-4 h-4 text-purple-600 ml-auto" />
          </a>
          <a
            href="#"
            className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200 hover:border-orange-400 transition-colors flex items-center gap-3"
          >
            <Code className="w-6 h-6 text-orange-600" />
            <div>
              <p className="font-bold text-gray-900">SDK Libraries</p>
              <p className="text-xs text-gray-600">Node.js, Python, PHP, Java</p>
            </div>
            <ExternalLink className="w-4 h-4 text-orange-600 ml-auto" />
          </a>
        </div>
      </div>

      {/* Support */}
      <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Need Help?</h2>
        <p className="text-gray-700 mb-4">
          Our developer support team is here to help you integrate successfully.
        </p>
        <div className="flex items-center gap-3">
          <a
            href="mailto:api-support@bida.gov.bd"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
          >
            Contact API Support
          </a>
          <a
            href="#"
            className="px-6 py-3 bg-white text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all border-2 border-gray-300"
          >
            Join Developer Community
          </a>
        </div>
      </div>
    </div>
  );
}
