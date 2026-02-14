/**
 * NLP ENGINE FOR BIDA AI ADVISOR
 * Implements multiple NLP algorithms:
 * - TF-IDF (Term Frequency-Inverse Document Frequency)
 * - Bag of Words (BoW)
 * - Cosine Similarity
 * - Named Entity Recognition (NER)
 * - Intent Classification
 */

export interface Document {
  id: string;
  text: string;
  metadata?: any;
}

export interface TFIDFResult {
  documentId: string;
  score: number;
  text: string;
}

export interface Entity {
  text: string;
  type: 'ORGANIZATION' | 'LOCATION' | 'MONEY' | 'DATE' | 'SECTOR' | 'PERSON';
  start: number;
  end: number;
}

export interface IntentResult {
  intent: string;
  confidence: number;
  entities: Entity[];
}

/**
 * STOPWORDS - Common words to filter out in NLP
 */
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'will', 'with', 'i', 'you', 'can', 'do', 'what',
  'how', 'when', 'where', 'why', 'which', 'who', 'does', 'my', 'me'
]);

/**
 * TOKENIZER - Breaks text into words
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ') // Replace punctuation with spaces
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOPWORDS.has(word));
}

/**
 * BAG OF WORDS (BoW)
 * Creates a frequency map of words in a document
 */
export function bagOfWords(text: string): Map<string, number> {
  const tokens = tokenize(text);
  const bow = new Map<string, number>();
  
  for (const token of tokens) {
    bow.set(token, (bow.get(token) || 0) + 1);
  }
  
  return bow;
}

/**
 * TF (Term Frequency)
 * Measures how frequently a term occurs in a document
 */
function termFrequency(term: string, document: string): number {
  const tokens = tokenize(document);
  const termCount = tokens.filter(t => t === term).length;
  return termCount / Math.max(tokens.length, 1);
}

/**
 * IDF (Inverse Document Frequency)
 * Measures how important a term is across all documents
 */
function inverseDocumentFrequency(term: string, documents: Document[]): number {
  const docsWithTerm = documents.filter(doc => 
    tokenize(doc.text).includes(term)
  ).length;
  
  return Math.log((documents.length + 1) / (docsWithTerm + 1)) + 1;
}

/**
 * TF-IDF SCORE
 * Combines TF and IDF to rank document relevance
 */
function tfidfScore(term: string, document: string, allDocuments: Document[]): number {
  const tf = termFrequency(term, document);
  const idf = inverseDocumentFrequency(term, allDocuments);
  return tf * idf;
}

/**
 * DOCUMENT VECTOR
 * Creates a vector representation of a document using TF-IDF
 */
function createTFIDFVector(document: string, vocabulary: string[], allDocuments: Document[]): number[] {
  return vocabulary.map(term => tfidfScore(term, document, allDocuments));
}

/**
 * COSINE SIMILARITY
 * Measures similarity between two vectors (0 = completely different, 1 = identical)
 */
export function cosineSimilarity(vec1: number[], vec2: number[]): number {
  if (vec1.length !== vec2.length) return 0;
  
  let dotProduct = 0;
  let mag1 = 0;
  let mag2 = 0;
  
  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    mag1 += vec1[i] * vec1[i];
    mag2 += vec2[i] * vec2[i];
  }
  
  const magnitude = Math.sqrt(mag1) * Math.sqrt(mag2);
  return magnitude === 0 ? 0 : dotProduct / magnitude;
}

/**
 * TF-IDF SEARCH
 * Finds most relevant documents for a query using TF-IDF and cosine similarity
 */
export function tfidfSearch(query: string, documents: Document[], topK: number = 5): TFIDFResult[] {
  // Build vocabulary from all documents + query
  const allTexts = [...documents.map(d => d.text), query];
  const allTokens = allTexts.flatMap(text => tokenize(text));
  const vocabulary = Array.from(new Set(allTokens));
  
  // Create query vector
  const queryVector = createTFIDFVector(query, vocabulary, documents);
  
  // Calculate similarity scores for each document
  const scores = documents.map(doc => {
    const docVector = createTFIDFVector(doc.text, vocabulary, documents);
    const similarity = cosineSimilarity(queryVector, docVector);
    
    return {
      documentId: doc.id,
      score: similarity,
      text: doc.text
    };
  });
  
  // Sort by score descending and return top K
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/**
 * NAMED ENTITY RECOGNITION (NER)
 * Extracts entities like organizations, locations, money, dates
 */
export function extractEntities(text: string): Entity[] {
  const entities: Entity[] = [];
  
  // Organization patterns
  const orgPatterns = [
    /\b(BIDA|BEZA|BEPZA|BHTPA|RJSC|NBR|DOE|DIFE|Bangladesh Bank)\b/gi,
    /\b([A-Z][a-z]+ (?:Bank|Corporation|Authority|Ltd|Limited|Inc|Company))\b/g
  ];
  
  // Location patterns
  const locationPatterns = [
    /\b(Bangladesh|Dhaka|Chittagong|Chattogram|Sylhet|Rajshahi|Khulna|Barisal|Rangpur|Mymensingh)\b/gi,
    /\b(Mirsarai|Mongla|Savar|Kaliakoir|Gazipur|Jamalpur|Patenga)\b/gi,
    /\b(EPZ|SEZ|Zone)\b/gi
  ];
  
  // Money patterns
  const moneyPatterns = [
    /\b(USD|BDT|EUR|CNY|GBP)\s*[\d,]+(?:\.\d{2})?\b/gi,
    /\b[\d,]+(?:\.\d{2})?\s*(dollar|taka|euro|yuan|million|billion)\b/gi
  ];
  
  // Date patterns
  const datePatterns = [
    /\b\d{1,2}[-/]\d{1,2}[-/]\d{2,4}\b/g,
    /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi,
    /\b\d{1,2}\s+(?:days|weeks|months|years)\b/gi
  ];
  
  // Sector patterns
  const sectorPatterns = [
    /\b(textile|garment|RMG|manufacturing|IT|software|pharmaceuticals?|electronics?|agriculture|real estate)\b/gi
  ];
  
  // Extract organizations
  orgPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: 'ORGANIZATION',
        start: match.index,
        end: match.index + match[0].length
      });
    }
  });
  
  // Extract locations
  locationPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: 'LOCATION',
        start: match.index,
        end: match.index + match[0].length
      });
    }
  });
  
  // Extract money
  moneyPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: 'MONEY',
        start: match.index,
        end: match.index + match[0].length
      });
    }
  });
  
  // Extract dates
  datePatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: 'DATE',
        start: match.index,
        end: match.index + match[0].length
      });
    }
  });
  
  // Extract sectors
  sectorPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: 'SECTOR',
        start: match.index,
        end: match.index + match[0].length
      });
    }
  });
  
  // Remove duplicates and sort by position
  return entities
    .filter((entity, index, self) => 
      index === self.findIndex(e => e.start === entity.start && e.text === entity.text)
    )
    .sort((a, b) => a.start - b.start);
}

/**
 * INTENT CLASSIFICATION
 * Determines what the user wants to do
 */
export function classifyIntent(text: string): IntentResult {
  const lowerText = text.toLowerCase();
  const entities = extractEntities(text);
  
  // Define intent patterns with confidence scores
  const intentPatterns: Record<string, { patterns: RegExp[], confidence: number }> = {
    'QUESTION_WHAT': {
      patterns: [/^what (is|are|does)/i, /tell me (about|what)/i],
      confidence: 0.95
    },
    'QUESTION_HOW': {
      patterns: [/^how (do|can|to|much|long)/i, /^how do i/i],
      confidence: 0.95
    },
    'QUESTION_WHERE': {
      patterns: [/^where (is|are|can|to)/i, /^which (zone|location|place)/i],
      confidence: 0.90
    },
    'QUESTION_WHY': {
      patterns: [/^why (is|are|should)/i, /^what.*reason/i],
      confidence: 0.90
    },
    'QUESTION_WHEN': {
      patterns: [/^when (is|do|can|will)/i, /how long/i],
      confidence: 0.90
    },
    'REQUEST_COST': {
      patterns: [/cost|price|fee|expense|how much/i, /budget/i],
      confidence: 0.85
    },
    'REQUEST_PROCESS': {
      patterns: [/process|procedure|step|how to/i, /apply|register/i],
      confidence: 0.85
    },
    'REQUEST_TIMELINE': {
      patterns: [/timeline|duration|how long|time.*take/i, /when.*complete/i],
      confidence: 0.85
    },
    'REQUEST_DOCUMENT': {
      patterns: [/document|paper|form|certificate/i, /what.*need/i],
      confidence: 0.80
    },
    'REQUEST_ZONE': {
      patterns: [/zone|epz|sez|location|where.*invest/i],
      confidence: 0.80
    },
    'REQUEST_TAX': {
      patterns: [/tax|incentive|benefit|exemption/i],
      confidence: 0.80
    },
    'REQUEST_VISA': {
      patterns: [/visa|work permit|immigration/i],
      confidence: 0.80
    },
    'GREETING': {
      patterns: [/^(hi|hello|hey|good morning|good afternoon)/i],
      confidence: 0.95
    },
    'THANKS': {
      patterns: [/thank/i, /appreciate/i, /grateful/i],
      confidence: 0.90
    }
  };
  
  // Check each intent pattern
  for (const [intent, { patterns, confidence }] of Object.entries(intentPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(lowerText)) {
        return { intent, confidence, entities };
      }
    }
  }
  
  // Default to general question
  return { 
    intent: 'QUESTION_GENERAL', 
    confidence: 0.5, 
    entities 
  };
}

/**
 * SEMANTIC SIMILARITY
 * Checks if two texts are semantically similar using word overlap
 */
export function semanticSimilarity(text1: string, text2: string): number {
  const tokens1 = new Set(tokenize(text1));
  const tokens2 = new Set(tokenize(text2));
  
  const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
  const union = new Set([...tokens1, ...tokens2]);
  
  return intersection.size / union.size; // Jaccard similarity
}

/**
 * TEXT PREPROCESSING
 * Cleans and normalizes text for NLP
 */
export function preprocessText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/[^\w\s-]/g, '') // Remove special chars except hyphens
    .substring(0, 500); // Limit length
}

/**
 * EXTRACT KEYWORDS
 * Gets most important words from text using simple frequency
 */
export function extractKeywords(text: string, topN: number = 5): string[] {
  const bow = bagOfWords(text);
  
  return Array.from(bow.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word]) => word);
}

/**
 * CONTEXTUAL SEARCH
 * Combines TF-IDF with entity matching for better results
 */
export function contextualSearch(
  query: string, 
  documents: Document[], 
  topK: number = 3
): TFIDFResult[] {
  const queryEntities = extractEntities(query);
  const tfidfResults = tfidfSearch(query, documents, topK * 2);
  
  // Boost scores if document contains same entities as query
  const boostedResults = tfidfResults.map(result => {
    const docEntities = extractEntities(result.text);
    const entityBoost = queryEntities.reduce((boost, queryEntity) => {
      const matchingEntity = docEntities.find(
        de => de.text.toLowerCase() === queryEntity.text.toLowerCase()
      );
      return matchingEntity ? boost + 0.2 : boost;
    }, 0);
    
    return {
      ...result,
      score: result.score + entityBoost
    };
  });
  
  return boostedResults
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
