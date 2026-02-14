#!/usr/bin/env node

/**
 * 🚨 DATA POLICE — Economic Data Enforcement
 * 
 * Purpose: Prevent hardcoded economic/FDI data outside canonical source
 * 
 * Rule: ALL economic numbers MUST come from /src/app/data/bangladeshEconomicMock.ts
 * Violation: Build fails if economic data defined elsewhere
 * 
 * Run: node scripts/validate-economic-data.js
 * CI/CD: Add to pre-commit or build pipeline
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CANONICAL_FILE = 'src/app/data/bangladeshEconomicMock.ts';
const SEARCH_DIRS = ['src/app/components', 'src/app/intelligence', 'src/app/engines'];

// Forbidden patterns (indicate local economic data definition)
const FORBIDDEN_PATTERNS = [
  /const\s+sectorData\s*=\s*\[/i,
  /const\s+monthlyTrend\s*=\s*\[/i,
  /const\s+capexData\s*=\s*\[/i,
  /const\s+quarterlyTrend\s*=\s*\[/i,
  /const\s+fdiData\s*=\s*\[/i,
  /const\s+economicData\s*=\s*\[/i,
  // Large hardcoded values (likely FDI amounts in millions)
  /value:\s*[3-9][0-9]{3,}/,
  /amount:\s*[3-9][0-9]{3,}/,
];

const PATTERN_DESCRIPTIONS = [
  'sectorData array definition',
  'monthlyTrend array definition',
  'capexData array definition',
  'quarterlyTrend array definition',
  'fdiData array definition',
  'economicData array definition',
  'large hardcoded value (>3000)',
  'large hardcoded amount (>3000)',
];

// ============================================================================
// FILE SCANNER
// ============================================================================

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// ============================================================================
// VIOLATION DETECTOR
// ============================================================================

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const violations = [];
  
  FORBIDDEN_PATTERNS.forEach((pattern, index) => {
    const matches = content.match(pattern);
    if (matches) {
      const lines = content.substring(0, matches.index).split('\n');
      const lineNumber = lines.length;
      
      violations.push({
        file: filePath,
        line: lineNumber,
        pattern: PATTERN_DESCRIPTIONS[index],
        snippet: matches[0]
      });
    }
  });
  
  return violations;
}

// ============================================================================
// MAIN VALIDATOR
// ============================================================================

function validate() {
  console.log('🚨 DATA POLICE — Scanning for economic data violations...\n');
  
  let allViolations = [];
  let filesScanned = 0;
  
  SEARCH_DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.log(`⚠️  Directory not found: ${dir} (skipping)`);
      return;
    }
    
    const files = getAllFiles(dir);
    filesScanned += files.length;
    
    files.forEach(file => {
      // Skip the canonical file itself
      if (file.includes(CANONICAL_FILE.replace(/\//g, path.sep))) {
        return;
      }
      
      const violations = checkFile(file);
      if (violations.length > 0) {
        allViolations = allViolations.concat(violations);
      }
    });
  });
  
  // ============================================================================
  // REPORT RESULTS
  // ============================================================================
  
  console.log(`📊 Scanned ${filesScanned} files\n`);
  
  if (allViolations.length === 0) {
    console.log('✅ PASS — No economic data violations found');
    console.log('✅ All components use canonical dataset');
    console.log(`✅ Data integrity: ENFORCED\n`);
    return 0; // Success exit code
  } else {
    console.log(`❌ FAIL — Found ${allViolations.length} violation(s)\n`);
    
    allViolations.forEach((v, i) => {
      console.log(`Violation ${i + 1}:`);
      console.log(`  File: ${v.file}`);
      console.log(`  Line: ${v.line}`);
      console.log(`  Issue: ${v.pattern}`);
      console.log(`  Code: ${v.snippet}`);
      console.log('');
    });
    
    console.log('🚫 ENFORCEMENT RULE:');
    console.log('   All FDI, sector, capex, and economic data MUST be imported from:');
    console.log(`   /${CANONICAL_FILE}`);
    console.log('');
    console.log('🔧 FIX:');
    console.log('   1. Remove hardcoded economic arrays from the file(s) above');
    console.log('   2. Import from canonical dataset:');
    console.log('      import { SECTOR_SPLIT, MONTHLY_FDI_2024, ... } from "@/app/data/bangladeshEconomicMock"');
    console.log('');
    
    return 1; // Failure exit code
  }
}

// ============================================================================
// RUN VALIDATOR
// ============================================================================

const exitCode = validate();
process.exit(exitCode);
