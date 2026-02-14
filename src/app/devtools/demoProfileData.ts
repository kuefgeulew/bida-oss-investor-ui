// 🎯 DEMO PROFILE AUTO-FILL DATA
// ARCHITECTURE: DEV-only data for fast profile creation
// PURPOSE: Pre-fills investor profile form with realistic Bangladeshi data
// SAFETY: Wrapped in DEV mode checks, never shipped to production

/**
 * Demo investor profile data for instant form filling
 * This data will auto-fill the InvestorProfileForm in DEV mode
 * User just clicks "Next" through the form to proceed
 */
export const DEMO_PROFILE_DATA = {
  // Business Information (Step 1 - Core Info)
  businessName: "Demo Textiles Manufacturing Ltd",
  businessType: "FOREIGN" as const, // LOCAL | FOREIGN | JOINT_VENTURE
  sector: "Textiles & Garments",
  investmentAmount: "5000000", // BDT 5M
  numberOfEmployees: "150",
  
  // Location Information (Step 2 - Location & Contact)
  division: "Dhaka",
  district: "Dhaka",
  upazila: "Gulshan",
  address: "Plot 45, Gulshan Avenue, Dhaka-1212, Bangladesh",
  
  // Contact Information (Step 2 - Contact Details)
  contactPerson: "Md. Abdul Rahman",
  contactEmail: "demo@investor.bd",
  contactPhone: "+8801712345678",
  website: "https://demo-textiles.com.bd",
  
  // Registration Numbers (Step 3 - Legal Documents)
  registrationNumber: "RJSC-2024-DEMO-001",
  tinNumber: "TIN-987654321",
  vatNumber: "VAT-456789123",
  binNumber: "BIN-123456789",
};

/**
 * Validation: Ensure this data matches real profile requirements
 */
export function validateDemoProfileData() {
  const data = DEMO_PROFILE_DATA;
  
  if (!data.businessName || data.businessName.length < 3) {
    throw new Error('[DEMO PROFILE] Invalid business name');
  }
  
  if (!data.contactEmail || !data.contactEmail.includes('@')) {
    throw new Error('[DEMO PROFILE] Invalid email');
  }
  
  if (!data.investmentAmount || parseFloat(data.investmentAmount) <= 0) {
    throw new Error('[DEMO PROFILE] Invalid investment amount');
  }
  
  if (!data.contactPhone || data.contactPhone.length < 10) {
    throw new Error('[DEMO PROFILE] Invalid phone number');
  }
  
  return true;
}

/**
 * Get demo profile data (with validation)
 */
export function getDemoProfileData() {
  if (import.meta.env.MODE === 'production') {
    throw new Error('[DEMO PROFILE] Cannot access demo data in production');
  }
  
  validateDemoProfileData();
  return DEMO_PROFILE_DATA;
}
