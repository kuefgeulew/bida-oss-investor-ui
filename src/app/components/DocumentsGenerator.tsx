import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { documentsDatabase, DocumentRequirement } from '@/data/investmentIntelligence';
import { InstrumentSection } from './ui-primitives';

export function DocumentsGenerator() {
  const [sector, setSector] = useState('');
  const [investorType, setInvestorType] = useState<'foreign' | 'local'>('foreign');
  const [needsLand, setNeedsLand] = useState(false);
  const [documents, setDocuments] = useState<DocumentRequirement[]>([]);

  const handleGenerate = () => {
    // Filter documents based on selections
    const filtered = documentsDatabase.filter(doc => {
      // All investors need these
      if (doc.requiredFor.includes('All investors') || doc.requiredFor.includes('All sectors')) {
        return true;
      }
      
      // Foreign investor specific
      if (investorType === 'foreign' && doc.requiredFor.includes('Foreign investors')) {
        return true;
      }
      
      // Sector specific
      if (sector && doc.requiredFor.some(req => req.toLowerCase().includes(sector.toLowerCase()))) {
        return true;
      }
      
      // Land based
      if (needsLand && doc.requiredFor.includes('Land-based projects')) {
        return true;
      }
      
      // Company registration docs
      if (doc.requiredFor.includes('Company registration')) {
        return true;
      }
      
      return false;
    });
    
    setDocuments(filtered);
  };

  const downloadPDF = () => {
    // Create downloadable checklist
    const content = `
BIDA OSS - Required Documents Checklist
Generated: ${new Date().toLocaleDateString()}

Investor Type: ${investorType}
Sector: ${sector || 'Not specified'}
Land Required: ${needsLand ? 'Yes' : 'No'}

REQUIRED DOCUMENTS:
${documents.filter(d => d.mandatory).map((doc, i) => `
${i + 1}. ${doc.documentName}
   Format: ${doc.format}
   Description: ${doc.description}
   Sample Available: ${doc.sampleAvailable ? 'Yes' : 'No'}
`).join('\n')}

OPTIONAL DOCUMENTS:
${documents.filter(d => !d.mandatory).map((doc, i) => `
${i + 1}. ${doc.documentName}
   Format: ${doc.format}
   Description: ${doc.description}
`).join('\n')}

---
For assistance, contact BIDA: support@bida.gov.bd
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BIDA_Documents_Checklist.txt';
    a.click();
  };

  const mandatoryDocs = documents.filter(d => d.mandatory);
  const optionalDocs = documents.filter(d => !d.mandatory);

  return (
    <div className="space-y-6">
      {/* Header - Full Width Horizontal Layout */}
      <InstrumentSection>
        <div className="p-8 rounded-2xl border border-[#e3ebf7]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Title & Icon */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Required Documents Generator</h2>
                <p className="text-gray-600 text-lg mt-1">Get exact checklist for your investment</p>
              </div>
            </div>

            {/* Right Side - Description */}
            <div className="p-5 bg-purple-50 border border-purple-200 rounded-xl">
              <p className="text-sm text-purple-900">
                <strong>Clarity removes confusion.</strong> No more repeated trips or missing documents. Get the complete list before you start.
              </p>
            </div>
          </div>
        </div>
      </InstrumentSection>

      {/* Input Form - Full Width Horizontal Layout */}
      <InstrumentSection>
        <div className="p-8 rounded-2xl border border-[#e3ebf7]">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Configure Your Requirements:</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Investor Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Investor Type
              </label>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setInvestorType('foreign')}
                  className={`px-4 py-3 rounded-xl transition-all ${
                    investorType === 'foreign'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Foreign Investor
                </button>
                <button
                  onClick={() => setInvestorType('local')}
                  className={`px-4 py-3 rounded-xl transition-all ${
                    investorType === 'local'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Local Investor
                </button>
              </div>
            </div>

            {/* Sector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Business Sector
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select sector</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Trading">Trading / Import-Export</option>
                <option value="Pharmaceuticals">Pharmaceuticals</option>
                <option value="IT/ITES">IT / ITES</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Agro-processing">Agro-processing</option>
              </select>
              
              {/* Land checkbox - moved here */}
              <div className="mt-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="needsLand"
                  checked={needsLand}
                  onChange={(e) => setNeedsLand(e.target.checked)}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                />
                <label htmlFor="needsLand" className="text-sm text-gray-700">
                  My project requires land/plot allocation
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex items-end">
              <button
                onClick={handleGenerate}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Generate Document Checklist
              </button>
            </div>
          </div>
        </div>
      </InstrumentSection>

      {/* Results */}
      {documents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Summary */}
          <InstrumentSection>
            <div className="p-8 rounded-2xl border border-[#e3ebf7] bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {documents.length} Documents Required
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {mandatoryDocs.length} mandatory • {optionalDocs.length} optional
                  </p>
                </div>
                <button
                  onClick={downloadPDF}
                  className="px-6 py-3 bg-white text-purple-700 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 border-2 border-purple-200"
                >
                  <Download className="w-5 h-5" />
                  Download Checklist
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{mandatoryDocs.length}</div>
                  <div className="text-sm text-gray-600">Mandatory</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <AlertCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{optionalDocs.length}</div>
                  <div className="text-sm text-gray-600">Optional</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {documents.filter(d => d.sampleAvailable).length}
                  </div>
                  <div className="text-sm text-gray-600">Samples Available</div>
                </div>
              </div>
            </div>
          </InstrumentSection>

          {/* Mandatory Documents */}
          {mandatoryDocs.length > 0 && (
            <InstrumentSection>
              <div className="p-8 rounded-2xl border border-[#e3ebf7]">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-red-600" />
                  Mandatory Documents ({mandatoryDocs.length})
                </h3>
                <div className="space-y-3">
                  {mandatoryDocs.map((doc, index) => (
                    <DocumentCard key={index} doc={doc} index={index + 1} />
                  ))}
                </div>
              </div>
            </InstrumentSection>
          )}

          {/* Optional Documents */}
          {optionalDocs.length > 0 && (
            <InstrumentSection>
              <div className="p-8 rounded-2xl border border-[#e3ebf7]">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Optional Documents ({optionalDocs.length})
                </h3>
                <div className="space-y-3">
                  {optionalDocs.map((doc, index) => (
                    <DocumentCard key={index} doc={doc} index={index + 1} optional />
                  ))}
                </div>
              </div>
            </InstrumentSection>
          )}

          {/* Help Box */}
          <InstrumentSection>
            <div className="p-8 rounded-2xl border border-[#e3ebf7] bg-blue-50 border-2 border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Options:</h3>
              <p className="text-sm text-gray-700 mb-4">
                BIDA provides document templates and can connect you with certified consultants for document preparation.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-lg hover:bg-white/80 transition-all">
                  <Download className="w-4 h-4" />
                  Download Templates
                </button>
                <button className="px-4 py-2 rounded-lg hover:bg-white/80 transition-all">
                  Contact Support
                </button>
              </div>
            </div>
          </InstrumentSection>
        </motion.div>
      )}
    </div>
  );
}

function DocumentCard({ doc, index, optional = false }: { 
  doc: DocumentRequirement; 
  index: number; 
  optional?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-4 rounded-xl"
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
          optional ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
        }`}>
          {index}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-900">{doc.documentName}</h4>
            {doc.sampleAvailable && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                Sample Available
              </span>
            )}
          </div>
          <p className="text-sm text-gray-700 mb-2">{doc.description}</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
              Format: {doc.format}
            </span>
            {doc.requiredFor.map((req, i) => (
              <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                {req}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}