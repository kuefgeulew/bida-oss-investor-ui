// Document Engine - Single source of truth for deal room documents
// READ: getDocumentsByInvestor(investorId)
// WRITE: addDocument(doc)

export interface DealDocument {
  id: string;
  investorId: string;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
  confidential: boolean;
  sharedWith: string[]; // Officer IDs
  accessLog: Array<{
    userId: string;
    userName: string;
    action: 'viewed' | 'downloaded' | 'shared';
    timestamp: string;
  }>;
  expiryDate?: string;
  watermark: boolean;
}

// ========== STATE ==========
const documentStore: DealDocument[] = [];

// ========== READ ==========
export function getDocumentsByInvestor(investorId: string): DealDocument[] {
  return documentStore.filter(d => d.investorId === investorId);
}

export function getDocumentById(documentId: string): DealDocument | undefined {
  return documentStore.find(d => d.id === documentId);
}

export function getAllDocuments(): DealDocument[] {
  return [...documentStore];
}

// ========== WRITE ==========
export function addDocument(doc: DealDocument): void {
  documentStore.push(doc);
}

export function updateDocumentSharing(documentId: string, officerIds: string[]): void {
  const doc = documentStore.find(d => d.id === documentId);
  if (doc) {
    doc.sharedWith = officerIds;
  }
}

export function addDocumentAccessLog(
  documentId: string, 
  log: { userId: string; userName: string; action: 'viewed' | 'downloaded' | 'shared'; timestamp: string }
): void {
  const doc = documentStore.find(d => d.id === documentId);
  if (doc) {
    doc.accessLog.push(log);
  }
}

export function toggleDocumentConfidential(documentId: string, isConfidential: boolean): void {
  const doc = documentStore.find(d => d.id === documentId);
  if (doc) {
    doc.confidential = isConfidential;
  }
}

// ========== UTILITIES ==========
export function getDocumentStats(investorId: string) {
  const docs = getDocumentsByInvestor(investorId);
  return {
    total: docs.length,
    confidential: docs.filter(d => d.confidential).length,
    shared: docs.filter(d => d.sharedWith.length > 0).length,
    recentAccess: docs.reduce((sum, d) => sum + d.accessLog.length, 0),
  };
}