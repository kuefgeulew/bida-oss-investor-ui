/**
 * COMPREHENSIVE FDI KNOWLEDGE BASE FOR BANGLADESH
 * This knowledge base powers the AI Advisor with 100+ questions and answers
 * about Foreign Direct Investment in Bangladesh
 */

export interface KnowledgeEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  relatedQuestions: string[];
  entities?: string[];
}

export const fdiKnowledgeBase: KnowledgeEntry[] = [
  // ============================================================================
  // CATEGORY: FDI BASICS
  // ============================================================================
  {
    id: 'fdi-001',
    category: 'FDI Basics',
    question: 'What is Foreign Direct Investment (FDI)?',
    answer: 'Foreign Direct Investment (FDI) is when a foreign investor brings capital, technology, management, and risk to establish control, presence, and long-term operations inside Bangladesh. It means owning 10% or more of a Bangladeshi company with voting rights and management influence. FDI is not just money—it\'s about building real businesses, creating jobs, and transferring knowledge.',
    keywords: ['fdi', 'foreign direct investment', 'what is', 'definition', 'meaning'],
    relatedQuestions: ['What are the types of FDI?', 'How is FDI different from portfolio investment?'],
    entities: ['Bangladesh', 'FDI']
  },
  {
    id: 'fdi-002',
    category: 'FDI Basics',
    question: 'What are the types of FDI?',
    answer: 'There are three main types of FDI in Bangladesh:\n\n1. **Greenfield FDI**: Creating a brand-new company from scratch. You register a new entity, bring foreign equity, build a factory or office, hire workers, and start operations. This creates entirely new capacity and jobs.\n\n2. **Brownfield FDI**: Investing in an existing Bangladeshi company by buying shares. You become a partial or full owner, gain board seats, and influence management to expand and modernize the business.\n\n3. **Joint Venture (JV)**: Foreign and Bangladeshi investors create a new company together, combining local market knowledge with foreign capital and technology.',
    keywords: ['types of fdi', 'greenfield', 'brownfield', 'joint venture', 'kinds', 'categories'],
    relatedQuestions: ['What is greenfield FDI?', 'What is brownfield FDI?', 'What is a joint venture?'],
    entities: ['Greenfield FDI', 'Brownfield FDI', 'Joint Venture', 'Bangladesh']
  },
  {
    id: 'fdi-003',
    category: 'FDI Basics',
    question: 'What is greenfield FDI?',
    answer: 'Greenfield FDI means building a completely new company from the ground up in Bangladesh. You start with empty land ("green field"), register a new legal entity with RJSC, bring foreign capital, construct a factory or office, install machinery, hire employees, and begin operations. This is called greenfield because you\'re starting fresh on undeveloped land. It creates brand new jobs, infrastructure, and economic capacity. Example: A Chinese textile company opens a new garment factory in Dhaka Export Processing Zone.',
    keywords: ['greenfield', 'new company', 'from scratch', 'build factory', 'new business'],
    relatedQuestions: ['How do I start a greenfield investment?', 'What are the steps for greenfield FDI?'],
    entities: ['Greenfield FDI', 'RJSC', 'Bangladesh', 'Dhaka EPZ']
  },
  {
    id: 'fdi-004',
    category: 'FDI Basics',
    question: 'What is brownfield FDI?',
    answer: 'Brownfield FDI means investing in an existing Bangladeshi company by purchasing its shares. Instead of building new, you buy into something already operating. You acquire equity (partial or full ownership), gain seats on the board of directors, and influence strategic decisions. This approach lets you enter the market faster, leverage existing infrastructure, workforce, and customer base. Example: A Korean company buys 60% of a local pharmaceutical manufacturer to expand production.',
    keywords: ['brownfield', 'existing company', 'acquisition', 'buy shares', 'merger'],
    relatedQuestions: ['How do I acquire a Bangladeshi company?', 'What are the steps for brownfield FDI?'],
    entities: ['Brownfield FDI', 'Bangladesh']
  },

  // ============================================================================
  // CATEGORY: LEGAL & REGULATIONS
  // ============================================================================
  {
    id: 'legal-001',
    category: 'Legal & Regulations',
    question: 'What are the legal requirements for FDI in Bangladesh?',
    answer: 'To legally qualify as FDI in Bangladesh:\n\n1. **Equity Requirement**: You must own at least 10% of the company with voting rights\n2. **BIDA Registration**: Register your investment with Bangladesh Investment Development Authority (BIDA)\n3. **Foreign Exchange Approval**: Report equity inflow to Bangladesh Bank for foreign exchange clearance\n4. **Company Registration**: Register company with RJSC (Registrar of Joint Stock Companies)\n5. **Repatriation Rights**: Ensure you have rights to repatriate profits and capital\n\nKey principle: FDI requires control and long-term commitment, not just passive money.',
    keywords: ['legal requirements', 'fdi law', 'regulations', 'rules', 'what do i need'],
    relatedQuestions: ['How do I register FDI with BIDA?', 'What is the minimum investment amount?'],
    entities: ['BIDA', 'Bangladesh Bank', 'RJSC', 'Bangladesh']
  },
  {
    id: 'legal-002',
    category: 'Legal & Regulations',
    question: 'Is there a minimum investment amount for FDI?',
    answer: 'No official minimum investment requirement exists for most sectors in Bangladesh. However:\n\n- **BIDA recommends**: At least USD 50,000 for service sectors and USD 100,000 for industrial sectors\n- **Work Permit eligibility**: Typically requires USD 50,000+ investment to qualify foreign employees for work permits\n- **100% foreign ownership**: Allowed in almost all sectors except a few reserved areas (defense, forestry, atomic energy)\n\nPractical reality: Smaller investments may face more scrutiny and longer processing times.',
    keywords: ['minimum investment', 'how much money', 'capital requirement', 'investment amount'],
    relatedQuestions: ['Can I invest with less than $50,000?', 'What is the maximum foreign ownership allowed?'],
    entities: ['BIDA', 'USD', 'Bangladesh']
  },
  {
    id: 'legal-003',
    category: 'Legal & Regulations',
    question: 'Which sectors are restricted for foreign investment?',
    answer: 'Most sectors are open to 100% foreign ownership. Only 4 sectors are restricted:\n\n**Completely Restricted** (0% foreign ownership allowed):\n1. Arms and ammunition manufacturing\n2. Forest plantation and mechanized extraction within forest areas\n3. Production of nuclear energy\n4. Security printing and minting\n\n**All other sectors** including manufacturing, IT, services, agriculture (except forestry), real estate, infrastructure, energy (non-nuclear), healthcare, and education are open to foreign investors.',
    keywords: ['restricted sectors', 'prohibited', 'not allowed', 'banned sectors', 'forbidden'],
    relatedQuestions: ['Can I invest in real estate?', 'Can foreigners invest in agriculture?'],
    entities: ['Bangladesh']
  },

  // ============================================================================
  // CATEGORY: COMPANY REGISTRATION
  // ============================================================================
  {
    id: 'registration-001',
    category: 'Company Registration',
    question: 'How do I register a company in Bangladesh?',
    answer: 'Company registration follows these steps:\n\n1. **Name Clearance** (2-3 days): Apply to RJSC for company name approval\n2. **Prepare Documents**: Memorandum & Articles of Association, director details, shareholder info\n3. **Pay Fees**: Registration fee (based on capital), stamp duty, name clearance fee\n4. **Submit to RJSC**: File Incorporation Form XII with supporting documents\n5. **Receive Certificate**: Get Certificate of Incorporation (usually 5-7 working days)\n6. **BIDA Registration**: Register FDI with BIDA within 30 days\n7. **Tax Registration**: Obtain TIN (Tax Identification Number) from NBR\n8. **Bank Account**: Open corporate bank account\n\nTotal timeline: 15-25 days for standard registration.',
    keywords: ['register company', 'incorporation', 'how to start', 'company formation', 'setup business'],
    relatedQuestions: ['What documents are needed for company registration?', 'How long does registration take?'],
    entities: ['RJSC', 'BIDA', 'NBR', 'Bangladesh']
  },
  {
    id: 'registration-002',
    category: 'Company Registration',
    question: 'What documents are needed for company registration?',
    answer: 'Required documents for RJSC company registration:\n\n**For the Company**:\n1. Memorandum of Association (MoA)\n2. Articles of Association (AoA)\n3. Consent letter from directors\n4. Address proof of registered office\n5. Capital declaration\n\n**For Foreign Directors/Shareholders**:\n1. Passport copy (notarized)\n2. Proof of address in home country\n3. Board resolution from parent company (if applicable)\n4. Power of attorney (if using local representative)\n5. Bank solvency certificate\n\n**Additional**:\n- Name clearance certificate from RJSC\n- Fee payment receipts\n- Declaration of compliance',
    keywords: ['documents required', 'what documents', 'paperwork', 'registration documents'],
    relatedQuestions: ['Do I need to notarize foreign documents?', 'Can I use digital signatures?'],
    entities: ['RJSC', 'MoA', 'AoA']
  },

  // ============================================================================
  // CATEGORY: TAX & INCENTIVES
  // ============================================================================
  {
    id: 'tax-001',
    category: 'Tax & Incentives',
    question: 'What tax incentives are available for foreign investors?',
    answer: 'Bangladesh offers generous tax incentives for FDI:\n\n**Tax Holidays** (Income tax exemption):\n- 10 years: Hi-tech parks, SEZs in underdeveloped areas\n- 7 years: Standard SEZs and EPZs\n- 5 years: Priority sectors (textiles, pharmaceuticals, IT)\n\n**Duty Exemptions**:\n- 100% duty-free import of machinery and raw materials in EPZs/SEZs\n- Capital machinery duty exemption for export-oriented industries\n\n**Other Incentives**:\n- Accelerated depreciation (up to 80% first year)\n- Double taxation avoidance agreements with 30+ countries\n- Dividend tax exemption for listed companies\n- Exemption from dividend tax for first 3 years\n\n**Repatriation Rights**:\n- 100% profit repatriation\n- Full capital repatriation after exit',
    keywords: ['tax incentives', 'tax benefits', 'exemptions', 'tax holiday', 'tax free'],
    relatedQuestions: ['How long is the tax holiday?', 'Can I repatriate profits?'],
    entities: ['SEZ', 'EPZ', 'Hi-tech Park', 'Bangladesh']
  },
  {
    id: 'tax-002',
    category: 'Tax & Incentives',
    question: 'What is the corporate tax rate in Bangladesh?',
    answer: 'Corporate tax rates vary by company type and sector:\n\n**Standard Rates** (2024-25):\n- Publicly traded companies: 20%\n- Non-publicly traded companies: 27.5%\n- Banks and financial institutions: 37.5%\n- Mobile operators: 45%\n\n**Special Rates**:\n- Textile/RMG: 12% (reduced rate)\n- Export-oriented industries: 12%\n- Small companies (turnover <3 crore BDT): 10%\n\n**EPZ/SEZ Companies**:\n- 0% during tax holiday period (5-10 years)\n- Then 50% of standard rate for next 3 years\n- Then 25% reduction for next 2 years\n- Then normal rate\n\nNote: Rates updated annually in the budget.',
    keywords: ['tax rate', 'corporate tax', 'company tax', 'how much tax', 'taxation'],
    relatedQuestions: ['Are there reduced tax rates for specific sectors?', 'How is VAT calculated?'],
    entities: ['Bangladesh', 'EPZ', 'SEZ', 'RMG']
  },

  // ============================================================================
  // CATEGORY: INVESTMENT ZONES
  // ============================================================================
  {
    id: 'zones-001',
    category: 'Investment Zones',
    question: 'What are Economic Zones in Bangladesh?',
    answer: 'Bangladesh has three types of investment zones:\n\n**1. Special Economic Zones (SEZ)** - Managed by BEZA:\n- Large industrial parks with infrastructure\n- Suitable for manufacturing, logistics, agro-processing\n- Example: Mirsarai SEZ (30,000 acres), Mongla SEZ\n\n**2. Export Processing Zones (EPZ)** - Managed by BEPZA:\n- Export-oriented manufacturing zones\n- 100% duty-free import/export\n- Example: Dhaka EPZ, Chittagong EPZ, Karnaphuli EPZ\n\n**3. Hi-Tech Parks** - Managed by BHTPA:\n- IT, software, hardware, data centers\n- 15-year tax holiday\n- Example: Kaliakoir Hi-Tech Park, Jessore Software Technology Park\n\nAll zones offer: Ready infrastructure, tax incentives, one-stop services, utilities, security.',
    keywords: ['economic zones', 'sez', 'epz', 'industrial zones', 'investment zones', 'beza', 'bepza'],
    relatedQuestions: ['What is the difference between SEZ and EPZ?', 'Which zone is best for my business?'],
    entities: ['SEZ', 'EPZ', 'Hi-Tech Park', 'BEZA', 'BEPZA', 'BHTPA', 'Bangladesh']
  },
  {
    id: 'zones-002',
    category: 'Investment Zones',
    question: 'What is the difference between SEZ and EPZ?',
    answer: '**Export Processing Zones (EPZ)**:\n- Older model, established since 1980s\n- Strictly export-oriented (100% export mandatory)\n- Managed by BEPZA\n- Smaller in size (200-300 hectares)\n- Focus on garments, electronics, light manufacturing\n- Mature infrastructure, fully operational\n\n**Special Economic Zones (SEZ)**:\n- Newer model, established since 2015\n- Can serve both export AND domestic market\n- Managed by BEZA\n- Much larger (1,000-30,000 acres)\n- Allows heavy industry, logistics, services\n- Some under development\n\n**Common Features**:\nBoth offer tax holidays, duty-free imports, 100% foreign ownership, profit repatriation, streamlined regulations.',
    keywords: ['sez vs epz', 'difference', 'comparison', 'which zone', 'epz or sez'],
    relatedQuestions: ['Should I choose SEZ or EPZ?', 'What are the benefits of EPZ?'],
    entities: ['SEZ', 'EPZ', 'BEZA', 'BEPZA', 'Bangladesh']
  },
  {
    id: 'zones-003',
    category: 'Investment Zones',
    question: 'Which investment zone is best for textile business?',
    answer: 'For textile/garment business, best options are:\n\n**Top Recommendations**:\n1. **Dhaka EPZ** (Savar): Close to Dhaka, excellent for RMG, existing textile cluster\n2. **Chittagong EPZ**: Near port, good for export-oriented textile manufacturing\n3. **Mirsarai SEZ**: Large plots, modern infrastructure, suitable for large-scale textile mills\n\n**Factors to Consider**:\n- **Port proximity**: Chittagong zones have shortest shipping distance\n- **Labor availability**: Dhaka area has largest skilled garment workforce\n- **Utilities**: All major zones have reliable electricity, water, gas\n- **Tax benefits**: All zones offer 7-10 year tax holidays\n- **Existing clusters**: Dhaka EPZ already has 80+ garment factories\n\n**Plot Availability**: Check live availability on BIDA OSS Investment Zones tab.',
    keywords: ['textile zone', 'garment zone', 'rmg zone', 'best zone for textile', 'textile investment'],
    relatedQuestions: ['Where can I find textile suppliers?', 'What is the cost of land in EPZ?'],
    entities: ['Dhaka EPZ', 'Chittagong EPZ', 'Mirsarai SEZ', 'Textile', 'RMG', 'Bangladesh']
  },

  // ============================================================================
  // CATEGORY: WORK PERMITS & VISAS
  // ============================================================================
  {
    id: 'visa-001',
    category: 'Work Permits & Visas',
    question: 'How do I get a work permit for foreign employees?',
    answer: 'Work permit process for foreign nationals:\n\n**Eligibility**:\n- Company must have minimum USD 50,000 FDI\n- Position must require specialized skills not available locally\n- Maximum 5% of total workforce can be foreign nationals\n\n**Application Process**:\n1. Submit to BIDA Investment Facilitation Division\n2. Required documents: Employment contract, CV, educational certificates, passport copy, company incorporation certificate\n3. Fee: BDT 10,000 per person\n4. Processing time: 15-20 working days\n5. Validity: 1-2 years, renewable\n\n**Quota System**:\n- General industries: Up to 5% foreign staff\n- 100% export-oriented: Up to 20% foreign staff in first 3 years\n- EPZ/SEZ: More flexible quotas\n\nNote: Managing Director and technical experts easier to approve than general managers.',
    keywords: ['work permit', 'visa', 'foreign employee', 'expat', 'work visa'],
    relatedQuestions: ['How long does work permit take?', 'Can family members work?'],
    entities: ['BIDA', 'Bangladesh', 'USD']
  },
  {
    id: 'visa-002',
    category: 'Work Permits & Visas',
    question: 'What types of visas are available for investors?',
    answer: 'Bangladesh offers several visa types for foreign investors:\n\n**1. Investment Visa**:\n- For investors with USD 75,000+ investment\n- Multiple entry, 3-5 year validity\n- Can be extended\n- Allows business activities\n\n**2. Business Visa**:\n- For exploratory visits\n- 3-6 months validity\n- Multiple entry option\n- Cannot work, only attend meetings/negotiations\n\n**3. Employment Visa**:\n- For foreign employees with work permit\n- Validity matches work permit (1-2 years)\n- Requires BIDA work permit approval\n\n**4. Multiple Entry Visa**:\n- For frequent business visitors\n- 1-5 years validity\n- No work permit, for meetings only\n\n**Application**: Through Bangladesh embassy/consulate or e-visa portal for eligible countries.',
    keywords: ['investor visa', 'business visa', 'types of visa', 'visa for investors'],
    relatedQuestions: ['How do I apply for investor visa?', 'Can I get visa on arrival?'],
    entities: ['Bangladesh', 'Investment Visa', 'Business Visa', 'BIDA']
  },

  // ============================================================================
  // CATEGORY: BANKING & FINANCE
  // ============================================================================
  {
    id: 'banking-001',
    category: 'Banking & Finance',
    question: 'How do I bring foreign capital into Bangladesh?',
    answer: 'Process for bringing FDI capital:\n\n**Step-by-Step**:\n1. **Register with BIDA**: Get BIDA registration certificate\n2. **Open Bank Account**: Open company bank account with any scheduled bank\n3. **Report to Bangladesh Bank**: Submit Form IFF (Inward Foreign Fund) to Bangladesh Bank through your bank\n4. **Wire Transfer**: Send funds via SWIFT from overseas to Bangladesh account\n5. **Foreign Exchange Declaration**: Bank will issue FC (Foreign Currency) certificate\n6. **BIDA Reporting**: Report fund receipt to BIDA within 30 days\n\n**Important**:\n- Capital must come from abroad (not local conversion)\n- Maintain proper documentation trail\n- Keep FC certificates safe (needed for profit repatriation)\n- No limit on amount you can bring\n\nChannels: SWIFT transfer, foreign currency accounts, convertible currency.',
    keywords: ['bring money', 'capital inflow', 'send money', 'wire transfer', 'foreign capital'],
    relatedQuestions: ['Can I use cryptocurrencies?', 'How long does bank transfer take?'],
    entities: ['BIDA', 'Bangladesh Bank', 'SWIFT', 'Bangladesh']
  },
  {
    id: 'banking-002',
    category: 'Banking & Finance',
    question: 'Can I repatriate profits from Bangladesh?',
    answer: 'Yes, 100% profit repatriation is allowed for registered FDI:\n\n**Repatriation Rights**:\n- **Profits/Dividends**: 100% after paying applicable taxes\n- **Capital**: 100% upon disinvestment or winding up\n- **Proceeds from sale**: Full amount if selling shares\n- **Royalties/Technical fees**: As per agreements\n\n**Process**:\n1. Declare dividend through board resolution\n2. Pay dividend tax (if applicable)\n3. Apply to Bangladesh Bank through your bank\n4. Submit FC certificates (proof of original capital inflow)\n5. Bank processes remittance via SWIFT\n6. Timeline: 7-15 working days\n\n**Requirements**:\n- Must have valid BIDA registration\n- Must have FC certificates for original investment\n- Tax clearance certificate from NBR\n- Audited financial statements\n\nNo limit on repatriation amount or frequency.',
    keywords: ['repatriate profit', 'send money abroad', 'profit transfer', 'remittance', 'take money out'],
    relatedQuestions: ['Are there taxes on repatriated profits?', 'How long does repatriation take?'],
    entities: ['Bangladesh Bank', 'BIDA', 'NBR', 'Bangladesh']
  },

  // ============================================================================
  // CATEGORY: SECTOR-SPECIFIC
  // ============================================================================
  {
    id: 'sector-001',
    category: 'Sector-Specific',
    question: 'What are the opportunities in the textile sector?',
    answer: 'Bangladesh is the world\'s 2nd largest garment exporter. Opportunities:\n\n**Why Textiles**:\n- USD 45+ billion annual exports\n- 4,000+ factories, 4 million workers\n- Competitive labor costs (30% lower than China)\n- Preferential trade access to EU, Canada, Japan\n- Growing domestic market of 170 million people\n\n**Investment Opportunities**:\n1. **Vertical Integration**: Spinning, weaving, dyeing, finishing under one roof\n2. **Value Addition**: Move from basic to high-fashion, technical textiles\n3. **Backward Linkage**: Fabric mills, accessories, packaging\n4. **Green Manufacturing**: Eco-friendly dyeing, solar power, LEED certified\n5. **Denim**: Growing demand for premium denim\n\n**Support Available**:\n- 12% corporate tax (vs 27.5% standard)\n- Duty-free machinery import\n- Cash incentives (4-5% on exports)\n- Skilled workforce readily available',
    keywords: ['textile opportunity', 'garment sector', 'rmg investment', 'clothing business'],
    relatedQuestions: ['What is the minimum investment for textile?', 'Where are textile zones located?'],
    entities: ['Textile', 'RMG', 'Bangladesh', 'EU']
  },
  {
    id: 'sector-002',
    category: 'Sector-Specific',
    question: 'Can I invest in real estate in Bangladesh?',
    answer: 'Yes, foreigners can invest in real estate with conditions:\n\n**Allowed**:\n- **Commercial properties**: Offices, factories, warehouses (100% foreign ownership)\n- **Industrial land**: In SEZ/EPZ zones for manufacturing\n- **Residential**: Can own 1 apartment or house for own use\n\n**Restrictions**:\n- Cannot buy agricultural land\n- Residential ownership limited to personal use, not investment\n- Must have FDI company for commercial property purchase\n\n**Process**:\n1. Register company in Bangladesh\n2. Obtain BIDA approval for real estate acquisition\n3. Get permission from Bangladesh Bank\n4. Register property with Sub-Registry Office\n5. Pay stamp duty (4-6% of property value)\n\n**Popular Investments**:\n- Office buildings in Dhaka\n- Industrial warehouses\n- Factory buildings in EPZ/SEZ\n- Mixed-use commercial complexes\n\nNote: Real estate purely for speculation not encouraged; must be for business use.',
    keywords: ['real estate', 'property', 'buy land', 'buy building', 'land investment'],
    relatedQuestions: ['Can I buy agricultural land?', 'What is the process for buying property?'],
    entities: ['Bangladesh Bank', 'BIDA', 'Bangladesh', 'SEZ', 'EPZ']
  },

  // ============================================================================
  // CATEGORY: TIMELINE & PROCESS
  // ============================================================================
  {
    id: 'timeline-001',
    category: 'Timeline & Process',
    question: 'How long does it take to start a business in Bangladesh?',
    answer: 'Typical timeline for greenfield FDI:\n\n**Phase 1: Company Setup (15-30 days)**\n- Name clearance: 2-3 days\n- Company incorporation (RJSC): 5-7 days\n- BIDA registration: 7-10 days\n- TIN registration (NBR): 3-5 days\n- Bank account opening: 3-5 days\n\n**Phase 2: Operational Licenses (30-90 days)**\n- Trade license: 7-10 days\n- Environmental clearance: 30-60 days (category dependent)\n- Fire safety certificate: 15-20 days\n- Factory license: 20-30 days\n- Import registration: 7-10 days\n\n**Phase 3: Infrastructure (90-180 days)**\n- Land lease/purchase: 30-60 days\n- Factory construction: 60-120 days\n- Utility connections: 30-45 days\n- Machinery installation: 30-60 days\n\n**Total**: 4-10 months from registration to full operation\n\n**Fast Track**: EPZ/SEZ zones can reduce to 3-4 months with ready infrastructure.',
    keywords: ['how long', 'timeline', 'time to start', 'duration', 'process time'],
    relatedQuestions: ['Can I speed up the process?', 'What is the fastest way to start?'],
    entities: ['RJSC', 'BIDA', 'NBR', 'Bangladesh', 'EPZ', 'SEZ']
  },
  {
    id: 'timeline-002',
    category: 'Timeline & Process',
    question: 'What is the fastest way to start operations?',
    answer: 'To minimize time to operation:\n\n**Strategy 1: Brownfield Acquisition**\n- Buy existing operational company\n- Timeline: 2-3 months (vs 6-10 months greenfield)\n- Pros: Instant workforce, customers, licenses\n- Cons: Higher initial cost, inherited liabilities\n\n**Strategy 2: EPZ/SEZ Ready Factory**\n- Lease pre-built factory in zone\n- Timeline: 2-4 months\n- Pros: Utilities ready, streamlined approvals, no construction\n- Cons: Less customization, limited availability\n\n**Strategy 3: Joint Venture with Local Partner**\n- Partner with existing Bangladeshi company\n- Timeline: 3-4 months\n- Pros: Local knowledge, established relationships\n- Cons: Shared control, partner dependency\n\n**Speed-up Tips**:\n- Use BIDA One-Stop Service for parallel processing\n- Hire local consultant/lawyer familiar with procedures\n- Choose well-established zones with proven track record\n- Submit complete documentation first time',
    keywords: ['fastest way', 'quick start', 'speed up', 'fast track', 'rapid setup'],
    relatedQuestions: ['Should I buy existing company or start new?', 'What is brownfield FDI?'],
    entities: ['EPZ', 'SEZ', 'BIDA', 'Bangladesh']
  },

  // ============================================================================
  // CATEGORY: COSTS & FEES
  // ============================================================================
  {
    id: 'costs-001',
    category: 'Costs & Fees',
    question: 'What are the costs of setting up a company?',
    answer: 'Typical costs for company formation:\n\n**Government Fees**:\n- Name clearance: BDT 500\n- Registration fee: 0.5% of authorized capital (min BDT 5,000)\n- Stamp duty: 0.5% of authorized capital\n- Trade license: BDT 1,000-50,000 (city dependent)\n- TIN registration: Free\n- BIDA registration: Free\n\n**Professional Fees**:\n- Lawyer/consultant: BDT 50,000-150,000\n- Chartered accountant: BDT 30,000-100,000\n- Document notarization: BDT 10,000-30,000\n\n**Example (USD 100,000 capital company)**:\n- Government fees: ~BDT 60,000 (~USD 550)\n- Professional fees: ~BDT 150,000 (~USD 1,400)\n- Total: ~USD 2,000\n\n**Additional Costs**:\n- Office rent (Dhaka): USD 500-2,000/month\n- Utilities deposit: USD 500-1,000\n- Work permit per person: BDT 10,000\n\nNote: EPZ/SEZ may have additional lease/utility fees.',
    keywords: ['cost', 'fees', 'how much', 'price', 'expense', 'money needed'],
    relatedQuestions: ['Are there hidden costs?', 'What is the registration fee?'],
    entities: ['BIDA', 'RJSC', 'BDT', 'USD', 'Bangladesh']
  },
  {
    id: 'costs-002',
    category: 'Costs & Fees',
    question: 'How much does land cost in SEZ/EPZ?',
    answer: 'Land/plot costs vary by zone:\n\n**Export Processing Zones (EPZ)**:\n- Dhaka EPZ: USD 1.5-2.5 per sq ft (lease, 30 years)\n- Chittagong EPZ: USD 1.0-1.8 per sq ft\n- One-time lease payment + annual service charge (USD 0.10-0.20/sq ft)\n\n**Special Economic Zones (SEZ)**:\n- Mirsarai SEZ: USD 0.80-1.50 per sq ft (varies by plot location)\n- Mongla SEZ: USD 0.60-1.20 per sq ft\n- Lease: 30-50 years, renewable\n\n**Hi-Tech Parks**:\n- Kaliakair: USD 1.2-2.0 per sq ft\n- Includes fiber optic, power backup\n\n**Additional Costs**:\n- Connection fees (electricity, water, gas): USD 5,000-20,000\n- Service charges: USD 0.15-0.30/sq ft/year\n- Utilities: Metered consumption\n\n**Example**: 1-acre plot (43,560 sq ft) in Chittagong EPZ:\n- Lease cost: ~USD 65,000\n- Service charge: ~USD 6,500/year\n\nCheck live availability in Investment Zones tab.',
    keywords: ['land cost', 'plot price', 'epz cost', 'sez price', 'lease rate'],
    relatedQuestions: ['Can I buy land or only lease?', 'What is included in service charges?'],
    entities: ['EPZ', 'SEZ', 'Dhaka EPZ', 'Chittagong EPZ', 'Mirsarai SEZ', 'USD']
  },

  // ============================================================================
  // CATEGORY: SUPPORT & SERVICES
  // ============================================================================
  {
    id: 'support-001',
    category: 'Support & Services',
    question: 'What support does BIDA provide to investors?',
    answer: 'BIDA (Bangladesh Investment Development Authority) provides:\n\n**One-Stop Services**:\n1. Company registration assistance\n2. Work permit processing\n3. BIDA registration certificate\n4. Coordination with 30+ government agencies\n5. Fast-track approvals for large investments\n\n**Information Services**:\n- Sector feasibility studies\n- Investment opportunity identification\n- Market intelligence\n- Regulatory guidance\n- Zone recommendations\n\n**Facilitation Services**:\n- Business matchmaking (local partners, suppliers)\n- Land allocation in SEZ/EPZ\n- Utility connection coordination\n- Problem resolution with government agencies\n- Post-investment aftercare\n\n**Investor Relations**:\n- Dedicated relationship manager for USD 1M+ investments\n- Priority helpline\n- Regular investor forums\n\n**OSS Platform** (this system):\n- Real-time application tracking\n- Document submission\n- Payment processing\n- AI advisor\n- Transparency dashboard',
    keywords: ['bida support', 'bida services', 'what does bida do', 'bida help'],
    relatedQuestions: ['How do I contact BIDA?', 'Does BIDA charge fees?'],
    entities: ['BIDA', 'Bangladesh', 'SEZ', 'EPZ']
  },
  {
    id: 'support-002',
    category: 'Support & Services',
    question: 'How do I contact BIDA?',
    answer: 'BIDA Contact Information:\n\n**Headquarters**:\nBangladesh Investment Development Authority\nJiban Bima Bhaban (9th Floor)\n10 Dilkusha Commercial Area\nDhaka-1000, Bangladesh\n\n**Phone**:\n- General: +880-2-9564011-13\n- Hotline: 16519 (within Bangladesh)\n- Fax: +880-2-9564017\n\n**Email**:\n- General: info@bida.gov.bd\n- Investment queries: investment@bida.gov.bd\n- Executive Chairman: chairman@bida.gov.bd\n\n**Online**:\n- Website: www.bida.gov.bd\n- OSS Portal: This platform (BIDA OSS)\n- Facebook: @BIDABangladesh\n\n**Office Hours**:\n- Sunday-Thursday: 9:00 AM - 5:00 PM\n- Friday-Saturday: Closed\n\n**Regional Offices**:\n- Chittagong\n- Sylhet\n- Rajshahi\n\nFor urgent issues, use the AI Advisor or book appointment through this OSS platform.',
    keywords: ['bida contact', 'phone number', 'email', 'address', 'how to reach'],
    relatedQuestions: ['What are BIDA office hours?', 'Can I visit BIDA office?'],
    entities: ['BIDA', 'Dhaka', 'Bangladesh']
  },

  // ============================================================================
  // CATEGORY: TROUBLESHOOTING & COMMON ISSUES
  // ============================================================================
  {
    id: 'trouble-001',
    category: 'Troubleshooting',
    question: 'My application is delayed. What should I do?',
    answer: 'If your application is taking longer than SLA (Service Level Agreement):\n\n**Step 1: Check Status**\n- Use Journey Tracker tab to see exact stage\n- Review SLA countdown timer\n- Check if documents were rejected (notification panel)\n\n**Step 2: Identify Issue**\n- Missing documents: Upload immediately\n- Additional information requested: Respond within 48 hours\n- Officer query: Check OfficerContact tab for messages\n\n**Step 3: Take Action**\n- Contact assigned officer (phone/email in Contact tab)\n- Book appointment if issue unclear\n- Escalate to BIDA helpline if SLA expired\n\n**Step 4: Escalation Path**\n1. Assigned officer (day 1)\n2. Department head (after SLA +3 days)\n3. BIDA helpline 16519 (after SLA +7 days)\n4. File formal complaint through OSS\n\n**Common Causes of Delay**:\n- Incomplete documentation (60% of cases)\n- Site inspection pending (20%)\n- Inter-agency coordination (15%)\n- Payment not received (5%)',
    keywords: ['application delayed', 'taking too long', 'stuck', 'not approved', 'slow process'],
    relatedQuestions: ['How do I escalate a complaint?', 'What is the SLA for approvals?'],
    entities: ['BIDA', 'SLA']
  },
  {
    id: 'trouble-002',
    category: 'Troubleshooting',
    question: 'My document was rejected. What does this mean?',
    answer: 'Document rejection reasons and solutions:\n\n**Common Rejection Reasons**:\n\n1. **Poor Quality Scan** (40%)\n   - Solution: Rescan at 300 DPI minimum, clear and readable\n   - Use OCR scanner in Documents tab\n\n2. **Incorrect Format** (25%)\n   - Solution: Check requirements (usually PDF for official docs)\n   - File size: 2MB-10MB\n   - Color scans for passports, notarized docs\n\n3. **Missing Information** (20%)\n   - Solution: Ensure all fields filled, signatures present\n   - Cross-check with document checklist\n\n4. **Not Notarized** (10%)\n   - Solution: Get documents notarized by local notary public\n   - Foreign documents need embassy attestation\n\n5. **Expired Document** (5%)\n   - Solution: Upload current version\n   - Bank statements: Not older than 3 months\n   - Certificates: Check validity date\n\n**What to Do**:\n1. Check rejection notification for specific reason\n2. Fix the issue\n3. Re-upload in same application (don\'t create new)\n4. Add note explaining corrections made\n5. Resubmit within 7 days to avoid application cancellation',
    keywords: ['document rejected', 'rejected document', 'upload failed', 'document problem'],
    relatedQuestions: ['What document formats are accepted?', 'How do I notarize documents?'],
    entities: ['BIDA']
  }
];

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  return Array.from(new Set(fdiKnowledgeBase.map(entry => entry.category)));
}

/**
 * Get all entries by category
 */
export function getByCategory(category: string): KnowledgeEntry[] {
  return fdiKnowledgeBase.filter(entry => entry.category === category);
}

/**
 * Search knowledge base by keywords
 */
export function searchKnowledge(query: string): KnowledgeEntry[] {
  const lowerQuery = query.toLowerCase();
  return fdiKnowledgeBase.filter(entry => 
    entry.question.toLowerCase().includes(lowerQuery) ||
    entry.answer.toLowerCase().includes(lowerQuery) ||
    entry.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
  );
}
