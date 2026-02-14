/**
 * 🤖 GenAI INVESTMENT CONCIERGE
 * 
 * GPT-4 powered conversational assistant providing instant, intelligent answers
 * 
 * Features:
 * - Natural language understanding in 5+ languages
 * - Context-aware conversation memory
 * - Complex scenario-based question answering
 * - Document understanding and analysis
 * - Escalation to human specialists
 * - 24/7/365 availability
 * 
 * Mock Implementation:
 * - Comprehensive knowledge base (no backend needed)
 * - Pattern matching + keyword detection
 * - Simulated AI responses with context awareness
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Send,
  Upload,
  Globe,
  Sparkles,
  Bot,
  User,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  X,
  Loader,
  Languages,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Download,
  Zap,
  TrendingUp,
  Shield,
  DollarSign,
  Building2,
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { toast } from 'sonner';

type Language = 'en' | 'zh' | 'ja' | 'ko' | 'hi';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  language?: Language;
  relatedDocs?: string[];
  suggestedActions?: string[];
  escalated?: boolean;
}

interface ConversationContext {
  sector?: string;
  investmentAmount?: number;
  nationality?: string;
  currentTopic?: string;
  previousQuestions: string[];
}

// Comprehensive AI Knowledge Base
const AI_KNOWLEDGE_BASE = {
  // PROFIT REPATRIATION
  profitRepatriation: {
    keywords: ['repatriate', 'profit', 'dividend', 'remit', 'transfer', 'money back', 'send money', '100%', 'full'],
    response: `✅ **YES - 100% Profit Repatriation Allowed!**

Bangladesh offers **full profit repatriation** for foreign investors:

📋 **What You Can Repatriate:**
• Net profits after taxes (100%)
• Capital gains from sale of shares (100%)
• Proceeds from liquidation (100%)
• Dividends (100%)
• Technical/royalty fees (as per agreement)

🔐 **Protection:**
• Guaranteed under Foreign Private Investment (Promotion & Protection) Act, 1980
• Protected by bilateral investment treaties (50+ countries)

⏱️ **Process:**
• Timeline: 2-3 business days
• Method: Through authorized dealer banks
• Documentation: Audited financials, tax clearance, board resolution

💱 **Currency:**
• Repatriated in freely convertible currency (USD, EUR, GBP, etc.)
• No restrictions on amount or frequency
• No waiting period

📄 **Required Documents:**
1. Audited financial statements
2. Tax clearance certificate
3. Board resolution for dividend declaration
4. Bangladesh Bank approval (automatic for registered foreign investment)

🇨🇳 **For Chinese Investors:**
Special advantage under Bangladesh-China BIT (Bilateral Investment Treaty) - additional protection and dispute resolution mechanism.

**Next Step:** Would you like details on the tax rates on profits before repatriation?`,
    relatedTopics: ['taxation', 'banking', 'foreign exchange', 'investment protection']
  },

  // BIDA vs BEZA
  bidaVsBeza: {
    keywords: ['BIDA vs BEZA', 'BEZA vs BIDA', 'difference between', 'BIDA or BEZA', 'which authority', 'who to contact'],
    response: `🏢 **BIDA vs BEZA - Key Differences**

**BIDA (Bangladesh Investment Development Authority):**
• General investments anywhere in Bangladesh
• ALL sectors (pharma, IT, manufacturing, services, etc.)
• Standard incentives + sector-specific benefits
• One-Stop Service (17 agencies)
• Timeline: 30-90 days depending on sector

**BEZA (Bangladesh Economic Zones Authority):**
• ONLY for investments inside Economic Zones (100+ EZs nationwide)
• Manufacturing and export-oriented industries
• **Enhanced incentives** (longer tax holidays)
• Dedicated infrastructure (power, gas, water, waste treatment)
• Timeline: 15-45 days (faster)

📊 **Comparison Table:**

| Aspect | BIDA | BEZA |
|--------|------|------|
| **Location** | Anywhere in Bangladesh | Only inside Economic Zones |
| **Sectors** | All sectors | Manufacturing, IT, export industries |
| **Tax Holiday** | 5-10 years | 10-15 years |
| **Infrastructure** | You arrange | Pre-built (plug & play) |
| **Land** | You purchase/lease | Lease from BEZA (50-99 years) |
| **Utilities** | You connect | Already connected |
| **Timeline** | 30-90 days | 15-45 days |
| **Duty-Free Import** | For export industries | For ALL imports (capital + raw materials) |

💡 **Which to Choose?**

**Choose BIDA if:**
• You need to be in a specific city (Dhaka, Chittagong)
• Service sector (IT, consulting, healthcare)
• Domestic market-focused business
• Need flexibility in location

**Choose BEZA if:**
• Manufacturing or export business
• Want maximum tax benefits (10+ year holiday)
• Need ready infrastructure
• High power/water requirements
• Want duty-free imports

🎯 **Can You Use Both?**
Yes! Many investors register with BIDA for general approval, then locate their factory in a BEZA Economic Zone to get both sets of benefits.

**Example:** Chinese pharma company = Register with BIDA + set up manufacturing in Mongla Economic Zone (BEZA) = Best of both worlds!

**Next Step:** Would you like me to recommend specific Economic Zones for your industry?`,
    relatedTopics: ['economic zones', 'tax incentives', 'infrastructure', 'registration']
  },

  // ENVIRONMENTAL CLEARANCE
  environmentalClearance: {
    keywords: ['environmental clearance', 'ECC', 'environmental approval', 'pollution', 'clearance time', 'how long', 'textile', 'dyeing'],
    response: `🌿 **Environmental Clearance Certificate (ECC) - Timeline & Process**

**For Textile Dyeing Unit:**

⏱️ **Timeline:**
• **Green Category:** 15-30 days
• **Orange-A Category:** 45-60 days (Most textile dyeing units)
• **Orange-B Category:** 60-90 days
• **Red Category:** 90-120 days (Heavy pollution industries)

**Textile dyeing is typically Orange-A = 45-60 days**

📋 **Required Documents:**
1. Project feasibility report
2. Environmental Impact Assessment (EIA) - if required
3. Effluent Treatment Plant (ETP) design
4. Factory layout plan
5. Process flow diagram
6. Company registration documents

🏭 **For Textile Dyeing - Mandatory Requirements:**

**Effluent Treatment Plant (ETP):**
• Capacity: Must handle 100% of wastewater
• Technology: Chemical + biological treatment
• Outlet standard: DoE parameters (pH 6-9, BOD <50 mg/L, COD <200 mg/L)
• Cost: ~$200K - $500K for medium-scale unit

**Air Quality:**
• Boiler emissions control
• Dust collection system
• Stack height as per DoE norms

**Solid Waste:**
• Sludge disposal plan
• Chemical storage facility

💰 **Fees:**
• Application: ৳5,000
• ECC issuance: ৳25,000 - ৳100,000 (based on project size)
• Annual renewal: ৳10,000 - ৳50,000

✅ **Fast-Track Options:**

1. **BEZA Economic Zones:**
   • Pre-cleared environmental zones
   • Centralized ETP (you don't need individual ETP)
   • Timeline: 15-30 days only!

2. **Export Processing Zones (EPZ):**
   • Streamlined environmental approvals
   • Shared infrastructure
   • Timeline: 20-40 days

🎯 **Pro Tip for Textile Investors:**
Locate in **Mongla Economic Zone** or **Meghna Economic Zone** - they have:
• Centralized Effluent Treatment Plants
• Pre-approved environmental status
• 70% faster clearance (15-25 days vs 45-60 days)
• Lower cost (no individual ETP needed)

📞 **Department of Environment (DoE):**
• Online portal: www.doe.gov.bd
• Helpline: +880-2-9585777
• One-Stop Service through BIDA

**Next Step:** Would you like the specific DoE parameters for textile dyeing wastewater, or help with ETP vendor selection?`,
    relatedTopics: ['textile sector', 'economic zones', 'compliance', 'manufacturing']
  },

  // WORK PERMITS
  workPermits: {
    keywords: ['work permit', 'visa', 'employment', 'foreign staff', 'expatriate', 'work visa', 'how many', 'Chinese staff'],
    response: `👥 **Work Permits for Foreign Staff**

✅ **Policy: Liberal & Investor-Friendly**

**Quotas:**
• **Investment < $500K:** Up to 5 foreign employees
• **Investment $500K - $5M:** Up to 10 foreign employees
• **Investment > $5M:** Up to 20% of total workforce (no hard cap)

**For Chinese Pharmaceutical Company Example:**
If you hire 200 employees total → You can have up to 40 Chinese expatriates

📋 **Eligible Positions (No Quota):**
• Directors and C-level executives (CEO, CFO, CTO)
• Senior technical specialists
• Project managers
• Quality control experts
• R&D scientists

**Cannot hire foreigners for:**
• Entry-level positions
• Administrative/clerical roles
• Security guards
• Drivers

⏱️ **Processing Time:**
• Work permit: 7-10 business days
• Employment visa: 3-5 business days
• Total: ~2 weeks from application to arrival

💰 **Costs:**
• Work permit fee: ৳10,000/year
• Visa fee: $160 (1 year), $300 (2 years), $500 (5 years)
• Multiple entry visa: Available

📄 **Required Documents:**
1. Passport copy (6 months validity)
2. Employment contract
3. Educational certificates (notarized)
4. Experience certificates
5. Police clearance from home country
6. Medical fitness certificate
7. Company registration documents
8. Investment registration certificate (IRC)

🇨🇳 **Special Benefits for Chinese Nationals:**

Under **Bangladesh-China FTA & Strategic Partnership:**
• Expedited processing (5 days vs 10 days)
• Multiple-entry 5-year visa available
• Visa-on-arrival for business visits (15 days)
• Spouse dependent visa (automatic approval)

👨‍👩‍👧 **Dependent Visas:**
• Spouse: Automatic approval
• Children under 18: Automatic approval
• Parents: Case-by-case (if sponsored employee earns >$50K/year)

🔄 **Renewal:**
• Annual renewal required
• Can be done 60 days before expiry
• Online system available through BIDA One-Stop

💡 **Pro Tip:**
Apply for work permits DURING company registration (parallel processing) to save 2 weeks!

**Next Step:** Would you like the specific document checklist for Chinese nationals, or help with the work permit application form?`,
    relatedTopics: ['immigration', 'human resources', 'company setup', 'compliance']
  },

  // SECTOR-SPECIFIC: PHARMACEUTICALS
  pharmaceuticalsSector: {
    keywords: ['pharmaceutical', 'pharma', 'drug', 'medicine', 'API', 'generic', 'DGDA', 'GMP', 'clinical trial'],
    response: `💊 **Pharmaceutical Sector in Bangladesh - Complete Guide**

**Market Opportunity:**
• Market Size: $3.2B (2025) → $5.8B (2030)
• Growth Rate: 12.8% annually
• Exports: $150M to 50+ countries (USA, EU, ASEAN)
• 85% import substitution (local production)

🏆 **Why Bangladesh for Pharma?**

1. **LDC Benefits (until 2029):**
   • Patent waiver (can manufacture patented drugs without royalty)
   • Zero tariff to EU for pharma exports
   
2. **Low Manufacturing Cost:**
   • 40% cheaper than India
   • 70% cheaper than China
   • Skilled chemists at $300-800/month

3. **Strong Ecosystem:**
   • 350 manufacturers (12 large-scale)
   • 120 WHO-GMP certified facilities
   • 8 EU-GMP certified
   • 2 US FDA approved

📋 **Investment Requirements:**

**Minimum Investment:**
• Small-scale: $500K (generic drugs)
• Medium-scale: $3M (API + formulations)
• Large-scale: $10M+ (WHO-GMP facility)

**Licensing Timeline:**
• DGDA drug manufacturing license: 6-12 months
• WHO-GMP certification: 12-18 months
• US FDA approval: 24-36 months

💰 **Incentives:**

**Tax Benefits:**
• 10-year tax holiday (investment >$10M)
• 5-year tax holiday (API manufacturing)
• 10% corporate tax (vs 25% standard) - permanent benefit!

**Duty-Free Imports:**
• 150+ raw materials & APIs (0% duty)
  HS Codes: 2936, 2941, 3003, 3004
• Manufacturing equipment (0% duty)
  HS Codes: 8419, 8421, 8422
• Testing equipment (0% duty)

**Export Incentives:**
• 20% cash incentive on pharma exports
• 15% cash incentive on API exports
• Duty drawback (100% refund)

🏭 **Infrastructure:**

**API Manufacturing:**
• 25 existing API plants
• Capacity: 15,000 MT/year
• Key APIs: Paracetamol, Metformin, Azithromycin

**Quality Testing:**
• 1 DGDA central lab
• 8 NABL-accredited labs
• 150+ private QC labs

**Recommended Locations:**

1. **Gazipur** - Hub of pharma industry (Square, Incepta)
2. **Chittagong** - Port access, GSK facility
3. **Mongla Economic Zone** - Tax benefits + infrastructure

📊 **Success Stories:**

**Square Pharmaceuticals (Local):**
• Started: $25M (2015)
• Now: $480M revenue, 28% ROI
• US FDA approved, exports to 50 countries

**Beximco Pharma (JV with Daiichi Sankyo - Japan):**
• Investment: $50M → $180M expanded
• Revenue: $384M, 24% ROI
• WHO-GMP, EU-GMP, US FDA approved

**GSK Bangladesh (UK):**
• $80M recent expansion
• 22% ROI
• "Best ROI in South Asia" - Managing Director

🎯 **For Chinese Pharma Company:**

**Advantages:**
• Replicate China+1 strategy
• Access EU market duty-free (until 2029)
• Lower costs than China domestic
• No US-China trade war impact
• Bangladesh-China BIT protection

**Recommended Entry:**
1. Start with generic formulations ($3-5M)
2. Get WHO-GMP certified (18 months)
3. Add API manufacturing ($10M+)
4. Target US FDA approval (3 years)
5. Export to regulated markets

**Next Step:** Would you like details on DGDA licensing procedures, or should I connect you with our pharma sector specialist for site visits?`,
    relatedTopics: ['manufacturing', 'exports', 'licensing', 'quality standards']
  },

  // TAXATION
  taxation: {
    keywords: ['tax', 'corporate tax', 'VAT', 'customs', 'duty', 'tax rate', 'withholding', 'tax holiday'],
    response: `💰 **Bangladesh Tax System - Comprehensive Guide**

**Corporate Income Tax:**

**Standard Rates (2025-26):**
• Publicly traded companies: 20%
• Non-publicly traded: 25%
• Banks/financial institutions: 37.5%
• Mobile operators: 40%

**Foreign Company Branch:**
• Tax rate: 35%
• Recommendation: Incorporate local subsidiary (25% vs 35%)

🎁 **Tax Holidays (Sector-Specific):**

| Sector | Location | Duration |
|--------|----------|----------|
| **Pharmaceuticals** | Anywhere | 10 years (if >$10M) |
| **IT/Software** | Hi-Tech Parks | 10 years |
| **Manufacturing** | Economic Zones | 10-15 years |
| **Textiles** | EPZs | 10 years |
| **Power (renewable)** | Anywhere | 15 years |
| **Agro-processing** | Rural areas | 7-10 years |

**After Tax Holiday:**
• Reduced rate: 10-15% (vs 25% standard)
• Varies by sector and export percentage

📊 **VAT (Value Added Tax):**
• Standard rate: 15%
• Reduced rate: 5% (specific goods)
• Zero-rated: Exports, pharmaceuticals for export
• Registration threshold: ৳30 lakh turnover

**Import Duties:**
• Capital machinery: 0-5%
• Raw materials: 0-15%
• Finished goods: 15-45%
• **Export industries: 0% on all imports (duty-free)**

💸 **Withholding Tax:**

**Dividends:**
• To residents: 10-20% (depending on shareholder type)
• To non-residents: 20% (can be reduced by tax treaty)

**Bangladesh-China Tax Treaty:**
• Dividend withholding: 10% (vs 20% standard)
• Royalty/technical fees: 10%
• Interest: 10%
• Capital gains: Exempt in many cases

**Royalties & Technical Fees:**
• Standard: 20%
• With treaty: 10%
• No restriction on amount (subject to transfer pricing rules)

🌍 **Tax Treaties:**
Bangladesh has treaties with 35+ countries including:
• China, Japan, South Korea
• USA, UK, Canada
• India, Singapore, Malaysia

📋 **Transfer Pricing:**
• Applies to related-party transactions >৳30 crore
• Arm's length principle
• Documentation required
• TP study by certified accountant

🎯 **Tax Optimization Strategies:**

**For Chinese Pharmaceutical Company:**

**Structure 1: Direct Subsidiary**
• 10-year tax holiday (investment >$10M)
• Years 1-10: 0% tax
• Year 11+: 10% tax (pharma benefit)
• Dividend to China: 10% withholding (treaty rate)

**Structure 2: Via Singapore Holding Company**
• Bangladesh → Singapore: 5% dividend withholding (treaty)
• Singapore → China: Participation exemption (0%)
• **Total tax: 5% only!**

**Structure 3: Economic Zone**
• 15-year tax holiday
• Year 1-15: 0% tax
• Year 16+: 10% tax
• **Better than direct subsidiary**

💡 **Compliance Requirements:**

**Filing Deadlines:**
• Corporate tax return: 15th day of 7th month after year-end
• Monthly VAT return: 15th of following month
• TDS/withholding: Within 15 days of payment

**Penalties:**
• Late filing: 10% of tax
• Tax evasion: 100-300% penalty + criminal prosecution
• Wrong VAT declaration: ৳10,000 fine

🔐 **Tax Audit:**
• Random selection: 5% of companies annually
• High-risk sectors: More frequent
• Transfer pricing audit: Common for foreign companies
• Keep records for 6 years

**Next Step:** Would you like a detailed tax calculation for your specific investment scenario, or guidance on tax treaty benefits for China?`,
    relatedTopics: ['finance', 'compliance', 'incentives', 'investment structure']
  },

  // LAND ACQUISITION
  landAcquisition: {
    keywords: ['land', 'property', 'real estate', 'lease', 'purchase', 'buy land', 'land cost', 'ownership'],
    response: `🏞️ **Land Acquisition & Real Estate in Bangladesh**

**Foreign Ownership Rules:**

❌ **Cannot Own:**
• Agricultural land
• Residential property (with exceptions)

✅ **Can Own/Lease:**
• Industrial land (for factories)
• Commercial property (offices)
• Land in Economic Zones (50-99 year lease)
• Land through subsidiary company

📋 **Options for Foreign Investors:**

**Option 1: Bangladesh Subsidiary Company (Recommended)**
• Incorporate local company (foreign ownership 100%)
• Company can purchase industrial land
• No restrictions on amount
• Owned in company name (you control via shares)

**Option 2: Long-Term Lease**
• 30-99 years lease from private owners
• Renewable
• Transferable
• Common in industrial areas

**Option 3: Economic Zone (Best for Manufacturing)**
• 50-year lease (renewable to 99 years)
• Ready infrastructure
• Plug-and-play
• Lower cost

💰 **Land Costs (2025):**

**Dhaka (Industrial Areas):**
• Gazipur: $8-15/sq ft
• Savar: $10-18/sq ft
• Ashulia: $12-20/sq ft

**Chittagong:**
• Industrial zone: $6-12/sq ft
• Port area: $15-25/sq ft

**Economic Zones:**
• BSCIC zones: $0.50-2/sq ft/year (lease)
• BEZA zones: $0.30-1.50/sq ft/year (lease)
• **Example:** 50,000 sq ft = $15,000-75,000/year only!

**Other Cities:**
• Sylhet: $3-8/sq ft
• Khulna: $3-7/sq ft
• Rajshahi: $2-5/sq ft

⏱️ **Land Purchase Timeline:**

1. **Identify land:** 1-2 weeks
2. **Title verification:** 2-4 weeks
3. **Negotiation:** 1-2 weeks
4. **Sale deed preparation:** 1 week
5. **Registration:** 3-5 days
6. **Mutation:** 2-4 weeks
**Total: 2-3 months**

📄 **Required Documents:**

**For Purchase:**
• Company registration certificate
• Board resolution
• IRC (Investment Registration Certificate)
• Tax clearance
• Land survey report
• Title deed verification

**Costs:**
• Stamp duty: 1.5% of value
• Registration fee: 1% of value
• Legal fees: 0.5-1% of value
• Survey: ৳50,000-200,000

🏭 **Economic Zone Options (Recommended):**

**For Pharmaceutical Company:**

**1. Mongla Economic Zone (Khulna)**
• Land: $0.50/sq ft/year lease
• 50-year lease (renewable)
• Deep sea port access
• Utilities: Ready
• 15-year tax holiday

**2. Meghna Economic Zone (Munshiganj)**
• Land: $0.80/sq ft/year
• Near Dhaka (1 hour)
• River port
• Gas connection
• 10-year tax holiday

**3. Bangabandhu Sheikh Mujib Shilpa Nagar (Chittagong)**
• Land: $1.20/sq ft/year
• Largest EZ in Bangladesh
• Chattogram port (30 km)
• International standard
• Japanese investment

**Cost Comparison Example (50,000 sq ft facility):**

**Purchase in Gazipur:**
• Land cost: $500K-750K (one-time)
• Utilities: $100K-200K (setup)
• Total: $600K-950K

**Lease in Economic Zone:**
• Lease: $25K-60K/year
• Utilities: Pre-connected (included)
• Total: $25K-60K/year
• **Savings in first year: $575K-890K!**

🎯 **Recommendation for Foreign Investors:**

**Manufacturing Business:**
→ Economic Zone lease (best value + tax benefits)

**Office/Warehouse:**
→ Purchase through subsidiary (Dhaka/Chittagong)

**Large Factory (>100,000 sq ft):**
→ BEZA Economic Zone (longest tax holiday)

⚠️ **Pitfalls to Avoid:**

1. **Don't buy land before company registration**
   • Company must be registered first
   • Land purchased in company name

2. **Verify title thoroughly**
   • Hire reputable lawyer
   • Check land records office
   • Survey land boundaries

3. **Check zoning**
   • Industrial land for factory
   • Commercial for office
   • Wrong zoning = permit issues

4. **Utility availability**
   • Confirm electricity (load capacity)
   • Gas connection (if needed)
   • Water supply
   • EZ has all this ready!

**Next Step:** Would you like me to recommend specific Economic Zones for your pharma factory, or connect you with BEZA for a site visit?`,
    relatedTopics: ['economic zones', 'company setup', 'infrastructure', 'investment planning']
  },

  // BANKING & FINANCE
  banking: {
    keywords: ['bank', 'account', 'finance', 'loan', 'credit', 'LC', 'foreign exchange', 'SWIFT', 'bank account'],
    response: `🏦 **Banking & Financial Services in Bangladesh**

**Opening Business Bank Account:**

⏱️ **Timeline:** 3-7 business days

📋 **Required Documents:**
• Company registration certificate
• Memorandum & Articles of Association
• Board resolution for account opening
• IRC (Investment Registration Certificate)
• Tax Identification Number (TIN)
• Director passports & photos
• Proof of business address

💼 **Types of Accounts:**

1. **Foreign Currency Account (Offshore)**
   • Hold USD, EUR, GBP, JPY, CNY
   • For export proceeds and foreign investment
   • No conversion required
   • Freely remittable

2. **Local Currency Account (Onshore)**
   • Bangladesh Taka (BDT)
   • For local transactions
   • Salaries, suppliers, utilities

3. **Export Retention Account (ERA)**
   • Keep export earnings in foreign currency
   • Up to 100% of export value
   • No conversion for 6 months

🏦 **Recommended Banks for Foreign Investors:**

**International Banks in Bangladesh:**
• **Standard Chartered** - Best for Chinese investors
• **HSBC** - Global network, trade finance
• **Citi Bank** - USD transactions
• **Commercial Bank of Ceylon** - South Asian focus

**Local Banks (Strong Foreign Desk):**
• **BRAC Bank** - Innovative, SME-friendly
• **Dutch-Bangla Bank** - Best online banking
• **Eastern Bank** - Foreign trade expertise
• **Prime Bank** - Corporate banking

💰 **Financing Options:**

**Working Capital Loan:**
• Interest rate: 9-11%
• Tenure: 1 year (renewable)
• Collateral: 100-125% of loan
• Foreign companies: Usually approved

**Term Loan (Project Finance):**
• Interest rate: 10-12%
• Tenure: 5-10 years
• Collateral: Project assets + land/building
• Loan-to-value: 70-80%

**Export Credit:**
• Pre-shipment: 7-9%
• Post-shipment: 7-9%
• Subsidized rate for export industries
• Government refinancing available

**Letter of Credit (LC):**
• Import LC: For machinery/raw materials
• Export LC: For foreign buyers
• Charges: 0.15-0.25% per quarter
• Documents: Invoice, packing list, B/L, certificate of origin

💱 **Foreign Exchange:**

**Incoming Investment:**
• Bring in USD, EUR, CNY, etc.
• Convert to BDT as needed
• Bank certificates issued (proof for repatriation)

**Current Exchange Rates (Approx):**
• USD 1 = BDT 110
• EUR 1 = BDT 120
• CNY 1 = BDT 15
• JPY 100 = BDT 75

**No Restrictions on:**
• Import of capital machinery
• Import of raw materials
• Repatriation of profits (100%)
• Dividend payments
• Loan repayments

📊 **Bangladesh Bank Regulations:**

**Investment Registration:**
• Register foreign investment with Bangladesh Bank
• Automatic approval (no permission needed)
• Get Investment Registration Certificate (IRC)
• Required for profit repatriation

**Reporting Requirements:**
• Annual statement of foreign liabilities
• Form IFC (for foreign investment)
• Quarterly foreign exchange transactions

🌐 **International Transfers:**

**SWIFT Network:**
• All major banks SWIFT-enabled
• Transfer time: 1-2 business days
• Charges: 0.125% + $10-25 fixed

**Remittance to China:**
• Direct: 2-3 days via SWIFT
• Via correspondent bank: 3-5 days
• Bank of China (Hong Kong) widely used

💳 **Payment Methods:**

**For Business:**
• Bank transfer (preferred)
• Cheque
• LC (import/export)
• Mobile banking (small amounts)

**Not Recommended:**
• Cash (limits + security risk)
• Cryptocurrency (not legally recognized)

🎯 **Recommended Banking Setup for Chinese Pharma Company:**

**Primary Account:**
• **Standard Chartered** (has strong China desk)
• Foreign currency account (USD)
• Local currency account (BDT)
• Trade finance facility

**Secondary Account:**
• **BRAC Bank** (for local operations)
• Salary disbursement
• Supplier payments

**Why Standard Chartered?**
• Presence in China (smooth transfers)
• Understands Chinese business culture
• Dedicated Relationship Manager
• Best online banking platform

💡 **Pro Tips:**

1. **Open account BEFORE importing machinery**
   • Need LC facility ready
   • Saves 2-3 weeks

2. **Maintain both USD and BDT accounts**
   • Pay imports in USD
   • Pay salaries in BDT
   • Save on conversion costs

3. **Build banking relationship early**
   • Future loan approval easier
   • Better interest rates
   • Priority service

4. **Use Bangladesh Bank EFT for large transfers**
   • Electronic Funds Transfer
   • Same day clearing
   • Lower charges than SWIFT

**Next Step:** Would you like an introduction to Standard Chartered's Foreign Investment Desk, or help with the IRC application to Bangladesh Bank?`,
    relatedTopics: ['finance', 'foreign exchange', 'investment registration', 'trade']
  },

  // COMPANY REGISTRATION
  companyRegistration: {
    keywords: ['register company', 'incorporation', 'company setup', 'registration', 'business registration', 'ROC', 'RJSC', 'how to start'],
    response: `🏢 **Company Registration in Bangladesh - Complete Guide**

**Timeline: 7-21 Days Total**

📋 **Step-by-Step Process:**

**Step 1: Name Clearance (2-3 days)**
• Apply online: www.roc.gov.bd
• Propose 3 names (order of preference)
• Fee: ৳600
• Avoid: Religious, government, misleading names

**Step 2: Prepare Documents (3-5 days)**
• Memorandum of Association (MoA)
• Articles of Association (AoA)
• Directors' details (passport, photo, address)
• Shareholder details
• Office address proof (rent agreement/deed)

**Step 3: File Incorporation (7-10 days)**
• Submit to RJSC (Registrar of Joint Stock Companies)
• Fee: ৳5,000 - ৳50,000 (based on capital)
• Get Certificate of Incorporation

**Step 4: Post-Incorporation (3-5 days)**
• TIN (Tax Identification Number)
• VAT registration (if turnover >৳30 lakh)
• Trade license (from City Corporation)
• Fire license
• Environmental clearance (if required)

💰 **Costs Breakdown:**

| Item | Cost (USD) |
|------|-----------|
| Name clearance | $7 |
| RJSC filing | $60 - $600 |
| Legal fees | $500 - $2,000 |
| Digital signature | $30 |
| TIN registration | Free |
| VAT registration | Free |
| Trade license | $50 - $200 |
| **Total (approx)** | **$650 - $3,000** |

🏭 **Company Types:**

**1. Private Limited Company (Recommended)**
• Minimum 2 shareholders (max 50)
• Minimum 2 directors
• Limited liability
• Can be 100% foreign-owned
• **Best for: Manufacturing, services, most businesses**

**2. Public Limited Company**
• Minimum 7 shareholders
• Minimum 3 directors
• Can issue shares publicly
• Stock exchange listing possible
• **Best for: Large enterprises planning IPO**

**3. Branch Office**
• Extension of foreign company
• No separate legal entity
• Limited activities (liaison, marketing)
• 35% tax (vs 25% for subsidiary)
• **Not recommended for manufacturing**

**4. Representative/Liaison Office**
• Cannot earn revenue in Bangladesh
• Only liaison/marketing
• Approval from Bangladesh Bank needed
• **Best for: Market research, testing**

📊 **Share Capital Requirements:**

**Authorized Capital:**
• Minimum: ৳1 lakh ($1,000)
• Recommended: ৳1 crore ($100,000) for foreign investors
• No maximum limit

**Paid-up Capital:**
• Minimum: 10% of authorized capital at incorporation
• Balance can be called up later
• For large projects: Show higher paid-up (banks prefer this)

**Foreign Ownership:**
• 100% foreign ownership allowed
• No local partner required (except few sectors)
• Sectors requiring local partner:
  - Media/newspapers
  - Courier services
  - Real estate (residential)

👥 **Director Requirements:**

**Minimum Directors: 2**

**Nationality:**
• Can be 100% foreign directors
• OR mix of foreign + Bangladeshi
• No mandatory Bangladeshi director (unlike India)

**Residency:**
• No residency requirement
• Directors can be based anywhere

**Disqualifications:**
• Undischarged bankrupt
• Convicted of fraud
• Minor (under 18)

📋 **Required Documents (For Foreign Investors):**

**For Company:**
• Passport copies (all directors/shareholders)
• Photos (passport size)
• Address proof (utility bill, bank statement)
• Home country company documents (if corporate shareholder)
• Board resolution (if corporate shareholder)

**For Office:**
• Rent agreement (minimum 1 year)
• OR ownership deed
• NOC from landlord
• Utility connection proof

🎯 **For Chinese Pharmaceutical Company:**

**Recommended Structure:**

**Name:** [YourBrand] Pharmaceuticals (Bangladesh) Ltd.

**Authorized Capital:** ৳10 crore ($1M)
• Shows seriousness
• Easier bank financing

**Paid-up Capital:** ৳1 crore ($100K) initially
• Balance paid as project progresses

**Shareholders:**
• 100% Chinese parent company

**Directors:**
• 2-3 Chinese nationals (CEO, CFO, Technical Director)
• Optional: 1 Bangladeshi (helps with local liaison)

**Registered Office:**
• Gulshan, Dhaka (prestigious address for HQ)
• Factory location: Separate (Gazipur or Economic Zone)

⏱️ **Fast-Track via BIDA One-Stop Service:**

**Standard Process:** 21+ days
**BIDA One-Stop:** 7-10 days

**BIDA Advantages:**
• Dedicated officer assigned
• Parallel processing
• Name clearance: 1 day (vs 3 days)
• Incorporation: 3 days (vs 10 days)
• TIN/VAT: Same day (vs 5 days)

**Cost:** No extra charge (free government service)

**Eligible:** All foreign investments >$50K

🔐 **Post-Registration Compliance:**

**Annual Requirements:**
• File annual return with RJSC (within 60 days of year-end)
• File income tax return (within 7 months)
• Hold AGM (Annual General Meeting) once a year
• Maintain statutory books (minutes, registers)

**Penalties for Non-Compliance:**
• Late annual return: ৳500/day
• Non-filing tax return: 10% penalty
• Max penalty: ৳50,000

💡 **Pro Tips:**

1. **Hire a Local Law Firm**
   • Cost: $500-2,000
   • Saves weeks of confusion
   • Ensures compliance
   • Recommended: Get referral from BIDA

2. **Use BIDA One-Stop Service**
   • Free assistance
   • Faster processing
   • Single point of contact

3. **Get Digital Signature Early**
   • Required for online filings
   • From Certification Authority
   • Cost: $30, takes 2-3 days

4. **Rent Office Before Filing**
   • Need address proof at incorporation
   • Virtual office NOT accepted
   • Minimum 1-year lease

**Next Step:** Would you like a referral to recommended law firms for company registration, or should I connect you with BIDA One-Stop Service officer for guided registration?`,
    relatedTopics: ['legal', 'compliance', 'one-stop service', 'investment registration']
  }
};

// Quick action suggestions
const QUICK_ACTIONS = [
  { icon: <DollarSign className="w-4 h-4" />, label: "Can I repatriate 100% profits?", query: "profit repatriation" },
  { icon: <Building2 className="w-4 h-4" />, label: "BIDA vs BEZA?", query: "BIDA vs BEZA difference" },
  { icon: <Shield className="w-4 h-4" />, label: "Environmental clearance timeline?", query: "environmental clearance textile dyeing" },
  { icon: <Users className="w-4 h-4" />, label: "Work permits for foreign staff?", query: "work permit Chinese staff" },
  { icon: <TrendingUp className="w-4 h-4" />, label: "Pharma sector opportunities?", query: "pharmaceutical sector Bangladesh" },
  { icon: <MapPin className="w-4 h-4" />, label: "Land acquisition rules?", query: "buy land foreign investor" },
];

// Language translations
const TRANSLATIONS: Record<Language, any> = {
  en: {
    title: "AI Investment Concierge",
    subtitle: "24/7 intelligent assistance in your language",
    placeholder: "Ask anything about investing in Bangladesh...",
    send: "Send",
    upload: "Upload Document",
    typing: "AI Concierge is thinking",
    escalate: "Talk to Human Specialist",
    quickActions: "Quick Questions",
    languages: "Language",
    newChat: "New Conversation"
  },
  zh: {
    title: "AI投资礼宾",
    subtitle: "24/7智能协助，使用您的语言",
    placeholder: "询问有关在孟加拉国投资的任何问题...",
    send: "发送",
    upload: "上传文档",
    typing: "AI礼宾正在思考",
    escalate: "与人工专家交谈",
    quickActions: "快速提问",
    languages: "语言",
    newChat: "新对话"
  },
  ja: {
    title: "AI投資コンシェルジュ",
    subtitle: "24時間365日、あなたの言語でサポート",
    placeholder: "バングラデシュへの投資について何でも質問してください...",
    send: "送信",
    upload: "ドキュメントをアップロード",
    typing: "AIコンシェルジュが考えています",
    escalate: "人間の専門家と話す",
    quickActions: "クイック質問",
    languages: "言語",
    newChat: "新しい会話"
  },
  ko: {
    title: "AI 투자 컨시어지",
    subtitle: "귀하의 언어로 24시간 연중무휴 지원",
    placeholder: "방글라데시 투자에 대해 무엇이든 물어보세요...",
    send: "보내기",
    upload: "문서 업로드",
    typing: "AI 컨시어지가 생각하고 있습니다",
    escalate: "전문가와 상담",
    quickActions: "빠른 질문",
    languages: "언어",
    newChat: "새 대화"
  },
  hi: {
    title: "एआई निवेश सहायक",
    subtitle: "आपकी भाषा में 24/7 सहायता",
    placeholder: "बांग्लादेश में निवेश के बारे में कुछ भी पूछें...",
    send: "भेजें",
    upload: "दस्तावेज़ अपलोड करें",
    typing: "एआई सहायक सोच रहा है",
    escalate: "विशेषज्ञ से बात करें",
    quickActions: "त्वरित प्रश्न",
    languages: "भाषा",
    newChat: "नई बातचीत"
  }
};

export function AIConciergeChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `👋 Welcome! I'm your AI Investment Concierge, powered by advanced language models and trained on Bangladesh's complete investment ecosystem.

I can help you with:
• Investment procedures & timelines
• Sector-specific opportunities
• Regulatory requirements
• Tax & incentives
• Company registration
• Work permits & visas
• And much more!

Ask me anything in **English, Chinese (中文), Japanese (日本語), Korean (한국어), or Hindi (हिंदी)**!

What would you like to know?`,
      timestamp: new Date(),
      suggestedActions: [
        "Can I repatriate 100% of profits?",
        "What's the difference between BIDA and BEZA?",
        "Tell me about pharma sector opportunities"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [context, setContext] = useState<ConversationContext>({
    previousQuestions: []
  });
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mock AI Response Engine
  const generateAIResponse = (userQuery: string): string => {
    const query = userQuery.toLowerCase();

    // Check each knowledge base entry
    for (const [key, knowledge] of Object.entries(AI_KNOWLEDGE_BASE)) {
      const matches = knowledge.keywords.some(keyword => 
        query.includes(keyword.toLowerCase())
      );
      
      if (matches) {
        // Update context
        setContext(prev => ({
          ...prev,
          currentTopic: key,
          previousQuestions: [...prev.previousQuestions, userQuery]
        }));
        
        return knowledge.response;
      }
    }

    // Context-aware follow-up questions
    if (context.currentTopic) {
      if (query.includes('what about') || query.includes('how about') || query.includes('what if')) {
        const currentKnowledge = AI_KNOWLEDGE_BASE[context.currentTopic as keyof typeof AI_KNOWLEDGE_BASE];
        if (currentKnowledge && currentKnowledge.relatedTopics) {
          return `Based on our previous discussion about **${context.currentTopic}**, I can help with related topics:\n\n${currentKnowledge.relatedTopics.map((topic, i) => `${i + 1}. ${topic}`).join('\n')}\n\nWhich would you like to explore?`;
        }
      }
    }

    // Generic helpful response
    return `I understand you're asking about: "${userQuery}"

While I don't have specific information on that exact query in my current knowledge base, I can help with:

📋 **Investment Procedures:**
• Company registration (7-21 days)
• Investment registration (BIDA/BEZA)
• Sector-specific licensing

💰 **Financial Matters:**
• Profit repatriation (100% allowed)
• Banking & finance
• Tax incentives & holidays

🏭 **Sector Intelligence:**
• Pharmaceuticals ($3.2B market)
• Textiles ($44B exports)
• IT & Technology
• Manufacturing

🌍 **Regulatory:**
• Environmental clearance
• Work permits & visas
• Import/export procedures

Could you rephrase your question, or would you like me to connect you with a **human specialist** for personalized assistance?

📞 **[Talk to Human Specialist]** → Get expert help within 24 hours`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse = generateAIResponse(input);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleQuickAction = (query: string) => {
    setInput(query);
    setTimeout(() => handleSend(), 100);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toast.success(`Document uploaded: ${file.name}`, {
      description: 'AI is analyzing your document...',
      duration: 3000
    });

    // Simulate document analysis
    setTimeout(() => {
      const analysisMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `📄 **Document Analysis Complete: ${file.name}**

I've analyzed your business plan. Here's what I found:

✅ **Business Type:** Pharmaceutical Manufacturing
✅ **Investment Amount:** $5 million
✅ **Required Approvals:**

1. **BIDA Investment Registration** (5-7 days)
2. **Company Registration** with RJSC (7-10 days)
3. **DGDA Drug Manufacturing License** (6-12 months)
4. **Environmental Clearance** (45-60 days)
5. **Factory License** from local authority (15 days)
6. **WHO-GMP Certification** (12-18 months) - Recommended

💡 **Recommended Incentives:**
• 10-year tax holiday (investment >$5M qualifies!)
• 0% duty on raw materials (150+ APIs)
• 20% export cash incentive

📍 **Location Recommendation:**
• **Mongla Economic Zone** - Best for pharma
• 15-year tax holiday
• Ready infrastructure
• Centralized ETP

**Next Steps:**
1. Start with BIDA investment registration
2. Parallel: Company incorporation
3. Apply for DGDA license (longest timeline)

Would you like me to connect you with our **pharma sector specialist** for a detailed consultation?`,
        timestamp: new Date(),
        relatedDocs: [file.name]
      };

      setMessages(prev => [...prev, analysisMessage]);
      toast.success('Document analysis complete!');
    }, 3000);
  };

  const handleEscalate = () => {
    toast.success('Connecting to human specialist...', {
      description: 'Our Relationship Manager will contact you within 24 hours',
      duration: 5000
    });

    const escalationMessage: Message = {
      id: Date.now().toString(),
      role: 'system',
      content: `🤝 **Escalated to Human Specialist**

Your conversation has been forwarded to our expert team:

**Assigned Specialist:** 
• Name: Sarah Rahman
• Title: Senior Relationship Manager - Pharmaceuticals
• Email: sarah.rahman@bida.gov.bd
• Phone: +880-1711-123456

**What happens next:**
1. Sarah will review our conversation history
2. She'll contact you within 24 hours
3. You'll get personalized guidance for your investment

**In the meantime**, I'm still here to answer any other questions!

Is there anything else I can help with?`,
      timestamp: new Date(),
      escalated: true
    };

    setMessages(prev => [...prev, escalationMessage]);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Message copied to clipboard');
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: `👋 Welcome back! Starting a fresh conversation.

What would you like to know about investing in Bangladesh?`,
        timestamp: new Date()
      }
    ]);
    setContext({ previousQuestions: [] });
    toast.success('New conversation started');
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden flex flex-col h-[800px]">
      {/* Header */}
      <div className="glass-card p-6 bg-blue-50/50 border-b border-blue-100 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center border-2 border-blue-200">
                <Bot className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                  {t.title}
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </h2>
                <p className="text-gray-600 text-sm">{t.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="p-2 bg-white/60 backdrop-blur-sm rounded-lg hover:bg-white border border-blue-100 transition-all"
                  title={t.languages}
                >
                  <Languages className="w-5 h-5" />
                </button>

                <AnimatePresence>
                  {showLanguageMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border-2 border-gray-200 overflow-hidden z-50 w-48"
                    >
                      {[
                        { code: 'en' as Language, label: 'English', flag: '🇬🇧' },
                        { code: 'zh' as Language, label: '中文', flag: '🇨🇳' },
                        { code: 'ja' as Language, label: '日本語', flag: '🇯🇵' },
                        { code: 'ko' as Language, label: '한국어', flag: '🇰🇷' },
                        { code: 'hi' as Language, label: 'हिंदी', flag: '🇮🇳' }
                      ].map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setShowLanguageMenu(false);
                            toast.success(`Language changed to ${lang.label}`);
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                            language === lang.code ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <span>{lang.label}</span>
                          {language === lang.code && <CheckCircle className="w-4 h-4 ml-auto" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* New Chat */}
              <button
                onClick={handleNewChat}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all border border-white/30"
                title={t.newChat}
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              {/* Escalate to Human */}
              <button
                onClick={handleEscalate}
                className="px-3 py-2 bg-white/60 backdrop-blur-sm rounded-lg hover:bg-white border border-blue-100 transition-all flex items-center gap-2 text-sm font-semibold text-gray-900"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">{t.escalate}</span>
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Online • Avg response: 2 seconds</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-gray-50 border-b-2 border-gray-200">
        <p className="text-xs font-bold text-gray-600 mb-2">{t.quickActions}</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {QUICK_ACTIONS.map((action, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickAction(action.query)}
              className="px-3 py-2 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center gap-2 text-sm font-semibold text-gray-700 whitespace-nowrap"
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, idx) => (
          <MessageBubble
            key={message.id}
            message={message}
            onCopy={handleCopy}
            onQuickAction={handleQuickAction}
          />
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin text-indigo-600" />
              <span className="text-sm text-gray-600">{t.typing}...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t-2 border-gray-200">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t.placeholder}
              className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 resize-none"
              rows={2}
            />
            
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-3 bottom-3 p-2 text-gray-400 hover:text-indigo-600 transition-colors"
              title={t.upload}
            >
              <Upload className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">{t.send}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Message Bubble Component
function MessageBubble({ message, onCopy, onQuickAction }: { 
  message: Message; 
  onCopy: (content: string) => void;
  onQuickAction: (query: string) => void;
}) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-3`}
    >
      {!isUser && (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          isSystem ? 'bg-gradient-to-br from-orange-100 to-amber-100' : 'bg-gradient-to-br from-indigo-100 to-purple-100'
        }`}>
          {isSystem ? <AlertCircle className="w-5 h-5 text-orange-600" /> : <Bot className="w-5 h-5 text-indigo-600" />}
        </div>
      )}

      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-indigo-600 text-white' 
            : isSystem
            ? 'bg-orange-50 border-2 border-orange-200 text-gray-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown content={message.content} />
          </div>
        </div>

        {/* Timestamp */}
        <div className={`flex items-center gap-2 mt-1 px-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Actions */}
        {!isUser && (
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => onCopy(message.content)}
              className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors"
              title="Copy message"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-green-600 transition-colors" title="Helpful">
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors" title="Not helpful">
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Suggested Actions */}
        {message.suggestedActions && message.suggestedActions.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-xs font-bold text-gray-600 px-2">💡 Suggested questions:</p>
            {message.suggestedActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => onQuickAction(action)}
                className="w-full text-left px-3 py-2 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center justify-between text-sm text-gray-700 group"
              >
                <span>{action}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
              </button>
            ))}
          </div>
        )}

        {/* Related Docs */}
        {message.relatedDocs && message.relatedDocs.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.relatedDocs.map((doc, idx) => (
              <div key={idx} className="px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200 flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-blue-700 font-semibold">{doc}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
          <User className="w-5 h-5" />
        </div>
      )}
    </motion.div>
  );
}

// Simple Markdown renderer
function ReactMarkdown({ content }: { content: string }) {
  const lines = content.split('\n');
  
  return (
    <div className="space-y-2">
      {lines.map((line, idx) => {
        // Headers
        if (line.startsWith('###')) {
          return <h3 key={idx} className="text-lg font-bold mt-4 mb-2">{line.replace('###', '').trim()}</h3>;
        }
        if (line.startsWith('##')) {
          return <h2 key={idx} className="text-xl font-bold mt-4 mb-2">{line.replace('##', '').trim()}</h2>;
        }
        if (line.startsWith('#')) {
          return <h1 key={idx} className="text-2xl font-bold mt-4 mb-2">{line.replace('#', '').trim()}</h1>;
        }
        
        // Bold
        const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Bullet points
        if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
          return <li key={idx} className="ml-4" dangerouslySetInnerHTML={{ __html: boldLine.replace(/^[•-]\s*/, '') }} />;
        }
        
        // Numbered lists
        if (/^\d+\./.test(line.trim())) {
          return <li key={idx} className="ml-4" dangerouslySetInnerHTML={{ __html: boldLine.replace(/^\d+\.\s*/, '') }} />;
        }
        
        // Tables (simple detection)
        if (line.includes('|')) {
          const cells = line.split('|').filter(c => c.trim());
          return (
            <div key={idx} className="flex gap-2 border-b border-gray-200 py-1">
              {cells.map((cell, i) => (
                <div key={i} className="flex-1" dangerouslySetInnerHTML={{ __html: cell.trim() }} />
              ))}
            </div>
          );
        }
        
        // Regular paragraph
        if (line.trim()) {
          return <p key={idx} dangerouslySetInnerHTML={{ __html: boldLine }} />;
        }
        
        return <br key={idx} />;
      })}
    </div>
  );
}
