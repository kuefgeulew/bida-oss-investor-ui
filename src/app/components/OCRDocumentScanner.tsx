import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, FileCheck, Camera, Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import Tesseract from 'tesseract.js';
import { SafeImage } from './SafeImage';
import { InstrumentCard, InstrumentSection } from './ui-primitives';

interface ExtractedData {
  name?: string;
  passportNumber?: string;
  nidNumber?: string;
  dateOfBirth?: string;
  nationality?: string;
  expiryDate?: string;
  rawText: string;
}

interface OCRDocumentScannerProps {
  documentType: 'passport' | 'nid';
  onDataExtracted: (data: ExtractedData) => void;
}

export function OCRDocumentScanner({ documentType, onDataExtracted }: OCRDocumentScannerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setExtractedData(null);
      setError(null);
    }
  };

  const extractPassportData = (text: string): ExtractedData => {
    const data: ExtractedData = { rawText: text };

    // Extract passport number (usually starts with letters followed by numbers)
    const passportMatch = text.match(/[A-Z]{1,2}\d{7,9}/);
    if (passportMatch) {
      data.passportNumber = passportMatch[0];
    }

    // Extract name (usually in capital letters on specific lines)
    const nameMatch = text.match(/(?:Name|Surname|Given Names?)[:\s]+([A-Z\s]+)/i);
    if (nameMatch) {
      data.name = nameMatch[1].trim();
    }

    // Extract nationality
    const nationalityMatch = text.match(/(?:Nationality)[:\s]+([A-Z\s]+)/i);
    if (nationalityMatch) {
      data.nationality = nationalityMatch[1].trim();
    }

    // Extract date of birth (various formats)
    const dobMatch = text.match(/(?:Date of Birth|DOB)[:\s]+(\d{1,2}[\s\/-]\d{1,2}[\s\/-]\d{2,4})/i);
    if (dobMatch) {
      data.dateOfBirth = dobMatch[1];
    }

    // Extract expiry date
    const expiryMatch = text.match(/(?:Date of Expiry|Expiry)[:\s]+(\d{1,2}[\s\/-]\d{1,2}[\s\/-]\d{2,4})/i);
    if (expiryMatch) {
      data.expiryDate = expiryMatch[1];
    }

    return data;
  };

  const extractNIDData = (text: string): ExtractedData => {
    const data: ExtractedData = { rawText: text };

    // Extract NID number (10 or 13 or 17 digits in Bangladesh)
    const nidMatch = text.match(/\b\d{10,17}\b/);
    if (nidMatch) {
      data.nidNumber = nidMatch[0];
    }

    // Extract name (Bangla or English)
    const nameMatch = text.match(/(?:Name|নাম)[:\s]+([A-Za-z\s]+)/i);
    if (nameMatch) {
      data.name = nameMatch[1].trim();
    }

    // Extract date of birth
    const dobMatch = text.match(/(?:Date of Birth|জন্ম তারিখ)[:\s]+(\d{1,2}[\s\/-]\d{1,2}[\s\/-]\d{2,4})/i);
    if (dobMatch) {
      data.dateOfBirth = dobMatch[1];
    }

    return data;
  };

  const processDocument = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const result = await Tesseract.recognize(
        selectedFile,
        'eng', // Can add 'ben' for Bangla if needed
        {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setProgress(Math.round(m.progress * 100));
            }
          }
        }
      );

      const text = result.data.text;
      
      let extracted: ExtractedData;
      if (documentType === 'passport') {
        extracted = extractPassportData(text);
      } else {
        extracted = extractNIDData(text);
      }

      setExtractedData(extracted);
      onDataExtracted(extracted);

    } catch (err) {
      console.error('OCR Error:', err);
      setError('Failed to process document. Please ensure the image is clear and try again.');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <InstrumentCard>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <Camera className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold">
              {documentType === 'passport' ? 'Passport' : 'National ID'} OCR Scanner
            </h3>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Upload a clear photo or scan of your {documentType === 'passport' ? 'passport' : 'national ID card'} to automatically extract information.
          </p>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block">
              <div className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                selectedFile 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}>
                {previewUrl ? (
                  <div className="space-y-4">
                    <SafeImage 
                      src={previewUrl} 
                      alt="Document preview" 
                      className="max-h-64 mx-auto rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-600">
                      {selectedFile?.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-700 font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>

          {/* Process Button */}
          {selectedFile && !extractedData && (
            <button
              onClick={processDocument}
              disabled={isProcessing}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing... {progress}%
                </>
              ) : (
                <>
                  <FileCheck className="w-5 h-5" />
                  Scan & Extract Data
                </>
              )}
            </button>
          )}

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Error</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </motion.div>
          )}
        </div>
      </InstrumentCard>

      {/* Extracted Data */}
      {extractedData && (
        <InstrumentCard>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <h3 className="text-xl font-semibold">Extracted Information</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {extractedData.name && (
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <p className="font-medium text-gray-900">{extractedData.name}</p>
                </div>
              )}
              
              {extractedData.passportNumber && (
                <div>
                  <label className="text-sm text-gray-600">Passport Number</label>
                  <p className="font-medium text-gray-900">{extractedData.passportNumber}</p>
                </div>
              )}

              {extractedData.nidNumber && (
                <div>
                  <label className="text-sm text-gray-600">NID Number</label>
                  <p className="font-medium text-gray-900">{extractedData.nidNumber}</p>
                </div>
              )}

              {extractedData.dateOfBirth && (
                <div>
                  <label className="text-sm text-gray-600">Date of Birth</label>
                  <p className="font-medium text-gray-900">{extractedData.dateOfBirth}</p>
                </div>
              )}

              {extractedData.nationality && (
                <div>
                  <label className="text-sm text-gray-600">Nationality</label>
                  <p className="font-medium text-gray-900">{extractedData.nationality}</p>
                </div>
              )}

              {extractedData.expiryDate && (
                <div>
                  <label className="text-sm text-gray-600">Expiry Date</label>
                  <p className="font-medium text-gray-900">{extractedData.expiryDate}</p>
                </div>
              )}
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Please verify the extracted information and make corrections if needed before proceeding.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
                setExtractedData(null);
              }}
              className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
            >
              Scan Another Document
            </button>
          </motion.div>
        </InstrumentCard>
      )}
    </div>
  );
}