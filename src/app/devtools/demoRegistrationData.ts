// 🎯 DEMO AUTO-FILLED REGISTRATION DATA
// ARCHITECTURE: DEV-only data for fast demo registration
// PURPOSE: Pre-fills registration form with realistic data
// SAFETY: Wrapped in DEV mode checks, never shipped to production

/**
 * Demo registration profile for instant onboarding
 * This data will auto-fill the registration form in DEV mode
 * User just clicks "Agree & Continue" to proceed
 */
export const DEMO_REGISTRATION_DATA = {
  // Company Information
  companyName: "Demo Textiles Manufacturing Ltd",
  sector: "Textiles & Garments",
  companyType: "private_limited" as const,
  investmentAmount: 5000000, // BDT 5M
  employeePlanned: 150,
  
  // Owner Information
  ownerName: "John Demo",
  email: "newdemo@investor.bd",
  phone: "+8801700000000",
  nationality: "United States",
  
  // Address Information
  division: "Dhaka",
  district: "Dhaka",
  area: "Gulshan",
  address: "Plot 45, Gulshan Avenue, Dhaka-1212, Bangladesh",
  
  // Registration Documents
  tin: "TIN-987654321",
  tradeLicense: "TL-2024-DEMO-001",
  passportNumber: "US123456789",
  
  // Bank Preferences
  bankPreference: "BRAC Bank",
  bankAccountType: "Corporate",
  
  // Project Details
  projectDescription: "Establishing a state-of-the-art textile manufacturing facility specializing in export-quality garments for international markets. The facility will employ modern machinery and sustainable practices.",
  
  // Zone Preference
  preferredZone: "BSMSN",
  plotSize: "5 acres",
};

/**
 * Validation: Ensure this data matches real registration requirements
 */
export function validateDemoRegistrationData() {
  const data = DEMO_REGISTRATION_DATA;
  
  if (!data.companyName || data.companyName.length < 3) {
    throw new Error('[DEMO DATA] Invalid company name');
  }
  
  if (!data.email || !data.email.includes('@')) {
    throw new Error('[DEMO DATA] Invalid email');
  }
  
  if (!data.investmentAmount || data.investmentAmount < 0) {
    throw new Error('[DEMO DATA] Invalid investment amount');
  }
  
  return true;
}
