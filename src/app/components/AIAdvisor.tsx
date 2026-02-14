import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, Bot, User, X, ArrowLeft, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface AIAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
}

// Comprehensive knowledge base - Production ready responses
const KNOWLEDGE_BASE: Record<string, string[]> = {
  pharma: ['pharma', 'pharmaceutical', 'drug', 'medicine', 'dgda'],
  manufacturing: ['manufacturing', 'factory', 'plant', 'production', 'industrial'],
  investment: ['investment', 'capital', 'money', 'fund', 'equity', 'requirement'],
  tax: ['tax', 'incentive', 'benefit', 'holiday', 'exemption'],
  registration: ['registration', 'register', 'incorporate', 'company setup', 'rjsc'],
  time: ['time', 'timeline', 'duration', 'how long', 'schedule', 'when'],
  license: ['license', 'permit', 'approval', 'clearance'],
  zone: ['zone', 'epz', 'sez', 'economic zone', 'location', 'where'],
  cost: ['cost', 'price', 'fee', 'expense', 'charge', 'how much'],
  hire: ['hire', 'employ', 'staff', 'worker', 'salary', 'recruitment', 'employee'],
  bank: ['bank', 'account', 'loan', 'finance', 'credit'],
  visa: ['visa', 'work permit', 'expatriate', 'foreign worker'],
  document: ['document', 'paper', 'certificate', 'requirement', 'what need'],
  sector: ['sector', 'industry', 'business type'],
};

const FAQ_RESPONSES: Record<string, string> = {
  pharma: `🏥 PHARMACEUTICAL FACTORY - COMPLETE SETUP GUIDE

📋 REQUIRED LICENSES & APPROVALS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
1️⃣ Company Registration (RJSC) - 3 days
2️⃣ Trade License - 5 days
3️⃣ Drug Manufacturing License (DGDA) - 20-25 days
4️⃣ Environmental Clearance (DOE) - 15-20 days
5️⃣ Factory License - 10 days
6️⃣ GMP Certification (DGDA) - 30-45 days
7️⃣ Product Registration (per medicine) - 60-90 days
8️⃣ Fire Safety License - 7 days
9️⃣ Utility Connections - 5-7 days
🔟 Bank Account - 2-3 days

💰 INVESTMENT REQUIREMENTS:
• Minimum Capital: $250,000 USD
• Recommended: $500,000 - $2,000,000
• Land: 10,000-50,000 sq ft
• Clean room facilities mandatory
• Quality control lab essential

⏱️ TOTAL TIMELINE: 4-6 months

🎁 SPECIAL INCENTIVES:
✓ 10-year tax holiday
✓ Duty-free import of machinery & raw materials
✓ Fast-track approval for life-saving drugs
✓ Export incentives up to 20% cash subsidy
✓ Full profit repatriation allowed

📍 RECOMMENDED LOCATIONS:
• Dhaka (Tongi, Gazipur) - Pharma hub
• Chattogram - Port access
• Mongla EPZ - Export-oriented

🏆 BANGLADESH PHARMA ADVANTAGES:
• 98% self-sufficient in domestic demand
• Exports to 150+ countries
• WHO-GMP certified facilities
• Skilled pharmaceutical workforce
• Patent waiver till 2033 (LDC status)

Would you like details on any specific step?`,

  manufacturing: `🏭 MANUFACTURING PLANT - COMPLETE SETUP GUIDE

📋 STANDARD REQUIREMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
1️⃣ Company Registration (RJSC) - 3 days
2️⃣ Trade License - 5 days
3️⃣ Environmental Clearance (DOE) - 15-20 days
   • Red Category: Full EIA (30 days)
   • Orange Category: IEE (15-20 days)
   • Green Category: Self-declaration (5 days)
4️⃣ Fire Safety Certificate - 7-10 days
5️⃣ Factory License - 10-15 days
6️⃣ Building Plan Approval - 30 days
7️⃣ Utility Connections - 7-10 days
8️⃣ Bank Account & LC Facility - 2-3 days
9️⃣ IRC (if importing) - 7 days

💰 INVESTMENT BY SECTOR:
• Light Manufacturing: $100,000 - $500,000
• Heavy Industry: $1M - $10M+
• Garments/Textile: $200,000 - $2M
• Food Processing: $150,000 - $1M
• Electronics: $300,000 - $5M

⏱️ TIMELINE: 45-60 working days

🎁 INCENTIVES AVAILABLE:
✓ 5-10 year tax holiday (sector dependent)
✓ Duty-free machinery import
✓ Accelerated depreciation
✓ Export earnings tax exemption
✓ Double taxation avoidance (50+ countries)

📍 STRATEGIC LOCATIONS:
🏭 EPZs (8 zones) - Export-oriented
   • 10-year tax holiday
   • Ready buildings available
   • One-stop service
   • Rent: $3-5/sqft/month

🌟 SEZs (12+ zones) - Domestic & export
   • Can sell locally & abroad
   • Modern infrastructure
   • Freehold land available
   • Price: $3-10/sqft

💻 Hi-Tech Parks - For IT/Technology
   • Tax exemption till 2027
   • High-speed internet
   • Modern facilities

🎯 SECTOR-SPECIFIC NOTES:
• Garments: Green factory benefits
• Food: BSTI & Halal certification needed
• Electronics: Hi-Tech Park advantages
• Chemicals: Strict environmental norms

Need help choosing the right zone?`,

  investment: `💰 INVESTMENT REQUIREMENTS & OPPORTUNITIES

📊 MINIMUM INVESTMENT BY SECTOR:
━━━━━━━━━━━━━━━━━━━━━━━━━━
🏭 Manufacturing: $100,000
💻 ICT/Technology: $50,000
💊 Pharmaceuticals: $250,000
🏗️ Real Estate: $500,000
🍽️ Hotels/Restaurants: $75,000
👕 Textile/RMG: $150,000
⚡ Energy/Power: $1,000,000
🚢 Shipping/Logistics: $500,000
🎓 Education: $100,000
🏥 Healthcare: $200,000

✅ FOREIGN OWNERSHIP:
• 100% foreign ownership allowed in most sectors
• Reserved: Defense, Security printing, Forestry
• Banking/Insurance: Central bank approval needed
• Media: Maximum 49% foreign
• Agriculture: 100% for agro-processing

🎁 INVESTMENT INCENTIVES:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Tax Holidays:
• Pharma, ICT: 10 years
• Less developed areas: 7-10 years
• Agro-based: 5-7 years
• Other manufacturing: 5 years

Additional Benefits:
✓ Duty-free import of capital machinery
✓ Exemption from dividend tax
✓ Full capital repatriation
✓ Full profit repatriation
✓ Accelerated depreciation
✓ Special bonded warehouse
✓ No foreign loan restrictions
✓ Protection against nationalization

💵 FINANCIAL REQUIREMENTS:
• Paid-up capital in installments allowed
• No minimum for services
• Manufacturing needs proof of investment
• LC facility from local banks
• BIDA assists with banking

🌏 INVESTMENT PROTECTION:
Bangladesh has treaties with 30+ countries including USA, UK, Germany, France, Japan, South Korea, China, India.

Which sector interests you?`,

  tax: `💎 TAX BENEFITS & INCENTIVES

🎁 TAX HOLIDAY SCHEDULE:
━━━━━━━━━━━━━━━━━━━━━━━━━━
By Sector:
• Pharmaceuticals: 10 years
• ICT Hardware/Software: 10 years
• Agricultural machinery: 7 years
• Agro-processing: 5-7 years
• Textile & RMG: 5 years
• General manufacturing: 5 years

By Location:
• Dhaka/Chattogram: Base period
• Other divisions: +1 year
• Hill tracts: +2 years
• EPZ/SEZ: 10 years
• Hi-Tech Parks: 10 years

📊 CORPORATE TAX RATES (After Holiday):
• Manufacturing: 20%
• Public companies: 20%
• Private companies: 27.5%

✨ ADDITIONAL BENEFITS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Dividend tax exemption (during holiday)
✓ Accelerated depreciation:
  - ICT equipment: 100% year 1
  - Machinery: 50% year 1
✓ Export earnings 100% tax exempt
✓ R&D expenses fully deductible
✓ Training expenses deductible

💰 CUSTOMS DUTY EXEMPTIONS:
✓ Capital machinery: 0% duty
✓ Raw materials (bonded): Duty-free
✓ Spare parts: Reduced rates
✓ Technology imports: Preferential rates

🌍 DOUBLE TAXATION AVOIDANCE:
Treaties with 35+ countries including USA, UK, Canada, Germany, France, Japan, South Korea, Singapore, China, India.

🎯 SECTOR-SPECIFIC:
━━━━━━━━━━━━━━━━━━━━━━━━━━
ICT:
• Tax exemption till 2027
• Zero import duty
• 10% cash incentive on exports

Garments:
• 1% tax for green factories
• 4-5% cash incentive
• Duty-free fabric import

Agriculture:
• Tax holiday for processing
• 5% subsidized loans
• Cold storage benefits

Want details for your sector?`,

  registration: `📋 COMPANY REGISTRATION - COMPLETE PROCESS

🏢 STEP-BY-STEP GUIDE:
━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1: Name Clearance (Same Day)
• Submit 3 names to RJSC
• Check online availability
• Fee: BDT 500

STEP 2: Document Preparation (1-2 days)
Required:
• Memorandum & Articles of Association
• Declaration by subscribers
• Consent of directors (Form IX)
• Address proof of registered office
• Passport copies (all directors/shareholders)
• Digital signatures (optional)

STEP 3: Submission to RJSC (1 day)
• Submit online or in-person
• Pay registration fees
• Get acknowledgment

STEP 4: Certificate of Incorporation (1 day)
• RJSC reviews & approves
• Company officially exists

⏱️ TOTAL: 3 Working Days

💰 REGISTRATION COSTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Based on Authorized Capital:
• Up to BDT 1 lakh: BDT 3,500
• BDT 1-5 lakh: BDT 7,500
• BDT 5-10 lakh: BDT 10,000
• BDT 10-50 lakh: BDT 15,000
• Above BDT 1 crore: BDT 25,000+

Legal fees: BDT 30,000 - 100,000

📝 POST-INCORPORATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━
1️⃣ Trade License (5 days)
2️⃣ TIN Certificate (Same day)
3️⃣ VAT Registration (2-3 days)
4️⃣ Bank Account (1-2 weeks)
5️⃣ IRC if importing (7 days)

🌟 COMPANY TYPES:
• Private Limited (Most common)
• Public Limited (Large investments)
• Branch Office (Parent abroad)
• Liaison Office (No commercial ops)
• Subsidiary (Separate entity)

🔑 KEY REQUIREMENTS:
• Min 2 shareholders (Max 50 private)
• Min 2 directors (1 local resident)
• Registered office in Bangladesh
• Min 1 share per subscriber

📱 ONLINE REGISTRATION:
Available at www.roc.gov.bd
• E-filing available
• Digital signatures accepted
• Track application status
• Faster processing

Need document templates?`,

  time: `⏱️ COMPLETE TIMELINE FOR BUSINESS SETUP

📅 FAST TRACK (Services/ICT): 25-30 Days
━━━━━━━━━━━━━━━━━━━━━━━━━━
Day 1: Name reservation
Day 1-3: Company registration
Day 4-5: Trade license
Day 6: TIN & VAT registration
Day 7-10: Bank account
Day 11-25: Office setup
Day 25-30: Commence operations

📅 STANDARD MANUFACTURING: 45-60 Days
━━━━━━━━━━━━━━━━━━━━━━━━━━
Day 1-3: Company registration
Day 4-8: Trade license
Day 9: TIN & VAT
Day 10-17: Bank account
Day 18-35: Environmental clearance
Day 20-27: Fire safety
Day 28-38: Factory license
Day 30-37: Utilities
Day 40-60: Setup & trial

📅 PHARMACEUTICAL: 75-120 Days
━━━━━━━━━━━━━━━━━━━━━━━━━━
Day 1-3: Registration
Day 10-30: Environmental
Day 30-50: Construction approval
Day 40-70: GMP facility
Day 60-90: Drug license
Day 80-100: GMP certification
Day 90-120: Product registration

⚡ BIDA ONE-STOP SERVICE:
━━━━━━━━━━━━━━━━━━━━━━━━━━
For investments > $1M:
• All approvals coordinated
• Inter-agency meetings
• 20-30% faster
• Dedicated officer
• Regular updates
• Problem resolution

💡 PRO TIPS FOR SPEED:
━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Engage consultant early
✓ Submit all docs simultaneously
✓ Use BIDA one-stop service
✓ Choose pre-approved zones
✓ Opt for green/orange category
✓ Use digital signatures
✓ Order machinery during licensing

What type of timeline do you need?`,

  license: `📜 COMPLETE LICENSING GUIDE

🔑 MANDATORY FOR ALL:
━━━━━━━━━━━━━━━━━━━━━━━━━━
1️⃣ Certificate of Incorporation (RJSC)
   Timeline: 3 days | Cost: BDT 3,500-25,000

2️⃣ Trade License
   Timeline: 5-7 days | Cost: BDT 5,000-100,000
   Renewal: Annual

3️⃣ TIN Certificate
   Timeline: Same day | Cost: Free

4️⃣ VAT Registration (if turnover > BDT 50 lakh)
   Timeline: 2-3 days | Cost: Free

🏭 MANUFACTURING SPECIFIC:
━━━━━━━━━━━━━━━━━━━━━━━━━━
5️⃣ Factory License
   Timeline: 10-15 days | Cost: BDT 2,000-20,000
   Authority: Chief Inspector of Factories

6️⃣ Environmental Clearance
   Timeline: 15-45 days | Cost: BDT 5,000-150,000
   Categories:
   • Green: Self-declaration (5 days)
   • Orange: IEE required (15-20 days)
   • Red: Full EIA (30-45 days)

7️⃣ Fire Safety Certificate
   Timeline: 7-10 days | Cost: BDT 5,000-30,000

8️⃣ Building Plan Approval
   Timeline: 30-45 days | Authority: RAJUK

💊 PHARMACEUTICAL SPECIFIC:
━━━━━━━━━━━━━━━━━━━━━━━━━━
9️⃣ Drug Manufacturing License
   Timeline: 20-30 days | Cost: BDT 50,000-200,000
   Requirements:
   • Qualified pharmacist
   • GMP facility
   • Quality control lab

🔟 GMP Certification
   Timeline: 30-60 days | Cost: BDT 100,000+
   Validity: 3 years

1️⃣1️⃣ Product Registration
   Timeline: 60-120 days per product
   Cost: BDT 20,000-100,000
   Validity: 5 years

🍽️ FOOD & BEVERAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━
1️⃣2️⃣ BSTI Certification
   Timeline: 30-60 days | Cost: BDT 10,000-50,000

1️⃣3️⃣ HALAL Certification
   Timeline: 15-30 days | Cost: BDT 15,000-40,000

📦 IMPORT/EXPORT:
━━━━━━━━━━━━━━━━━━━━━━━━━━
1️⃣4️⃣ IRC (Import Registration)
   Timeline: 7 days | Cost: BDT 3,000
   Validity: Lifetime

1️⃣5️⃣ ERC (Export Registration)
   Timeline: 7 days | Cost: BDT 5,000
   Validity: Lifetime

⚡ UTILITIES:
━━━━━━━━━━━━━━━━━━━━━━━━━━
• Electricity: 5-30 days
• Gas: 15-30 days
• Water: 7-15 days

Which license do you need help with?`,

  zone: `📍 INVESTMENT ZONES - COMPLETE GUIDE

🏭 EXPORT PROCESSING ZONES (EPZs) - 8 Zones
━━━━━━━━━━━━━━━━━━━━━━━━━━
Managed by: BEPZA

Major Zones:
1. Dhaka EPZ (Savar) - 115 hectares
   109 companies, 67,000+ workers
   
2. Chattogram EPZ - 105 hectares
   76 companies, 80,000+ workers
   Port: 8 km

3. Karnaphuli EPZ - 345 hectares
   Largest EPZ, Port: 3 km

Others: Mongla, Comilla, Ishwardi, Uttara, Adamjee

EPZ Benefits:
✓ 10-year tax holiday
✓ Duty-free machinery/raw materials
✓ One-stop service
✓ Ready buildings available
✓ 100% foreign ownership
✓ Full profit repatriation
✓ Dedicated customs
✓ Rent: $3-5/sqft/month

🌟 SPECIAL ECONOMIC ZONES (SEZs) - 12+ Zones
━━━━━━━━━━━━━━━━━━━━━━━━━━
Managed by: BEZA

Government SEZs:
• Mongla SEZ - 800 hectares
• Mirsarai SEZ - 30,000 acres (Mega)
• Srihatta SEZ - 565 acres
• Jamalpur, Sirajganj, Anwara

Private SEZs:
• Chinese SEZ - 788 acres
• Abdul Monem SEZ - 329 acres
• KEPZ (Korean) - 365 acres

SEZ Benefits:
✓ 10-year tax holiday
✓ Can sell domestically
✓ Modern infrastructure
✓ One-stop service
✓ Freehold land available
✓ Price: $3-10/sqft

💻 HI-TECH PARKS - 7 Locations
━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Kaliakoir (Gazipur) - 232 acres
   30+ companies (Samsung, Walton)
   
2. Jessore Software Park
3. Mohakhali IT Village (Dhaka)
4. Sylhet, Rajshahi, Chattogram, Khulna

Benefits:
✓ Tax exemption till 2027
✓ Duty-free IT equipment
✓ 10% cash incentive
✓ High-speed internet
✓ Modern offices

💰 COST COMPARISON:
━━━━━━━━━━━━━━━━━━━━━━━━━━
EPZ Rent: $3-5/sqft/month
EPZ Land: $0.40-0.80/sqft/year
SEZ Land: $3-10/sqft (freehold)
Hi-Tech: $8-12/sqft
Outside: $10-50/sqft (Dhaka)

🏆 ZONE SELECTION:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Choose EPZ if:
✓ 100% export-oriented
✓ Want ready infrastructure
✓ Need immediate setup
✓ Prefer rental

Choose SEZ if:
✓ Mixed domestic & export
✓ Want land ownership
✓ Need larger plot
✓ Long-term expansion

Choose Hi-Tech if:
✓ IT/ITES sector
✓ Need tech infrastructure
✓ Service-based business

Need zone recommendations?`,

  cost: `💰 COMPLETE COST BREAKDOWN

📊 PHASE 1: REGISTRATION
━━━━━━━━━━━━━━━━━━━━━━━━━━
Company Registration:
• Fees: BDT 3,500 - 25,000
• Legal fees: BDT 30,000 - 100,000
Total: $400 - $1,500

Trade License: BDT 5,000 - 100,000 ($60-$1,200)
TIN/VAT: Free
IRC/ERC: BDT 8,000 ($100)

📋 PHASE 2: LICENSES
━━━━━━━━━━━━━━━━━━━━━━━━━━
Manufacturing:
• Environmental: BDT 5,000 - 150,000
• Factory license: BDT 2,000 - 20,000
• Fire safety: BDT 5,000 - 30,000
• Building approval: BDT 20,000 - 100,000
Total: $400 - $4,000

Pharmaceutical (Additional):
• Drug license: BDT 50,000 - 200,000
• GMP certification: BDT 100,000 - 300,000
• Product registration: BDT 20,000 - 100,000 each
Total: $2,000 - $8,000

🏢 PHASE 3: OFFICE/FACILITY
━━━━━━━━━━━━━━━━━━━━━━━━━━
Office (Dhaka Monthly Rent):
• Gulshan: $15-30/sqft
• Banani: $10-20/sqft
• Uttara: $8-15/sqft

Factory/Warehouse:
• EPZ ready building: $3-5/sqft/month
• Outside EPZ: $2-8/sqft/month
• Land purchase: $10-100/sqft

⚡ PHASE 4: UTILITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━
Electricity:
• Connection: BDT 10,000 - 100,000
• Deposit (100 KW): ~BDT 500,000
Total: $1,200 - $15,000

Gas: BDT 50,000 - 500,000 ($600-$8,000)
Water: BDT 20,000 - 100,000 ($350-$1,800)
Internet: BDT 50,000 - 200,000 setup

👥 PHASE 5: SALARIES (Monthly)
━━━━━━━━━━━━━━━━━━━━━━━━━━
• Factory worker: $80 - $150
• Entry level: $100 - $250
• Mid-level: $300 - $700
• Manager: $800 - $2,000
• Expatriate: $2,000 - $8,000

Benefits: 15-25% of gross salary

🏦 PHASE 6: BANKING
━━━━━━━━━━━━━━━━━━━━━━━━━━
Bank Account:
• Minimum balance: BDT 50,000 - 500,000
• LC charges: 0.25-0.50% of value
• Loan interest: 9-14% p.a.

💻 PHASE 7: TECHNOLOGY
━━━━━━━━━━━━━━━━━━━━━━━━━━
Software: BDT 30,000 - 300,000
ERP: BDT 500,000 - 5,000,000
Computers (10): $8,000 - $25,000

🏭 INDUSTRY-SPECIFIC TOTALS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
IT Company: $40,000 - $50,000
Small Manufacturing: $300,000 - $700,000
Pharmaceutical: $2M - $6M
Restaurant: $80,000 - $140,000

Need detailed estimate for your sector?`,

  hire: `👥 HIRING & EMPLOYMENT GUIDE

📊 LABOR MARKET:
━━━━━━━━━━━━━━━━━━━━━━━━━━
• Workforce: 68+ million
• Manufacturing: 20+ million
• Garment: 4+ million
• IT professionals: 500,000+
• Literacy: 75%
• Median age: 27 years

💰 SALARY RANGES (Monthly BDT):
━━━━━━━━━━━━━━━━━━━━━━━━━━
Manufacturing:
• Worker: 8,000 - 15,000
• Operator: 12,000 - 20,000
• Supervisor: 15,000 - 30,000
• Manager: 40,000 - 80,000

IT Sector:
• Junior developer: 25,000 - 40,000
• Mid-level: 50,000 - 80,000
• Senior: 80,000 - 150,000
• Tech lead: 120,000 - 200,000

Corporate:
• Entry officer: 15,000 - 30,000
• Executive: 30,000 - 50,000
• Manager: 60,000 - 120,000
• General Manager: 150,000 - 300,000

Expatriates:
• Entry: 180,000 - 300,000
• Senior: 600,000 - 1,200,000
Plus housing, car, education

📋 EMPLOYMENT REGULATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Minimum Wage:
• Garments: BDT 12,500/month
• Overtime: 200% regular wage

Working Hours:
• Standard: 8 hrs/day, 48 hrs/week
• Weekly holiday: Friday or Saturday
• Annual leave: 1 day per 18 worked
• Casual: 10 days/year
• Sick: 14 days/year

Mandatory Benefits:
• Festival bonuses: 2 per year
• Maternity: 16 weeks
• Provident fund: 8.33% (if 40+ staff)
• Gratuity: After 5 years

🔍 RECRUITMENT CHANNELS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Online Portals:
• bdjobs.com (Largest)
• Prothomalo Jobs
• LinkedIn
Cost: BDT 5,000 - 50,000

Recruitment Agencies:
• Fee: 1 month salary/hire
• Executive search: 15-25% annual

Campus Recruitment:
• BUET, DU, NSU, BRAC, IBA
• Fresh grads: BDT 20,000 - 40,000

🌍 HIRING EXPATRIATES:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Quota System:
• Manufacturing: 20% can be expat
• Services: 15% can be expat
• Specialized: Exemptions available

Work Permit:
• Employment visa first
• BIDA work permit
• 30-day processing
• Cost: BDT 50,000 - 200,000/year

👨‍💼 TALENT AVAILABILITY:
━━━━━━━━━━━━━━━━━━━━━━━━━━
High Availability:
✓ Garment workers
✓ General labor
✓ Customer service
✓ Junior developers
✓ Accountants

May Need Expats:
• C-level executives
• Niche specialists
• Advanced R&D
• International BD

Need hiring strategy?`,

  bank: `🏦 BANKING & FINANCE GUIDE

💳 OPENING CORPORATE ACCOUNT:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Required Documents:
✓ Certificate of Incorporation
✓ Memorandum & Articles
✓ Board resolution
✓ Director/shareholder details
✓ Passport copies
✓ Trade license
✓ TIN certificate
✓ Office address proof
✓ Business plan

Timeline: 7-14 days
Initial Deposit:
• Local banks: BDT 50,000 - 200,000
• Foreign banks: BDT 500,000 - 2M

🏦 RECOMMENDED BANKS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Foreign Banks:
1. Standard Chartered
   • International network
   • Premium services
   • Multi-currency

2. HSBC Bangladesh
   • Global banking
   • Trade finance expert

3. Citibank
   • US$ transactions
   • Treasury services

Leading Local Banks:
4. Dutch-Bangla Bank (DBBL)
   • Best digital banking
   • Largest ATM network

5. BRAC Bank
   • SME focused
   • Good service

6. Eastern Bank (EBL)
   • Corporate friendly
   • Trade finance strong

7. City Bank
   • Modern banking
   • Quick processing

💼 BANKING SERVICES:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Account:
• No interest
• Unlimited transactions
• Overdraft available
• Min: BDT 50,000 - 500,000

Foreign Currency Account:
• USD, EUR, GBP available
• For import/export
• Regulatory approval needed

Fixed Deposit:
• Interest: 5-7% p.a.
• Collateral use possible

💼 TRADE FINANCE:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Letter of Credit:
• LC charges: 0.25-0.50%
• Insurance: 0.05-0.10%
• Bank margin: 10-30%
• Interest: 8-12% p.a.

Bank Guarantee:
• Bid bond: 1-2%
• Performance: 5-10%
• Commission: 1-2% per quarter

📊 LOAN FACILITIES:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Working Capital:
• Purpose: Operations
• Interest: 9-14% p.a.
• Tenure: 1 year
• Collateral: 150-200%

Term Loan:
• Purpose: Machinery
• Interest: 10-15% p.a.
• Tenure: 3-10 years
• Grace: 6-24 months

SME Loan:
• Up to BDT 5 crore
• Interest: 9-12% p.a.
• Less stringent

Export Credit:
• Pre/Post shipment
• Interest: 7-9% (subsidized)
• Up to 180 days

🌍 INTERNATIONAL TRANSACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Inward Remittance:
• Swift: 1-3 days
• TT: 2-5 days
• Charges: BDT 500 - 2,000

Outward Remittance:
• Requires BB approval
• Profit repatriation allowed
• After tax clearance

💳 DIGITAL BANKING:
━━━━━━━━━━━━━━━━━━━━━━━━━━
• Internet banking 24/7
• Mobile banking (bKash, Nagad)
• RTGS (same-day, min BDT 1 lakh)
• BEFTN (next day, any amount)

💡 BANKING TIPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Open account early
✓ Choose bank with trade finance strength
✓ Multiple banks common
✓ Maintain good relationship
✓ Foreign banks for international ease
✓ Local banks for local market
✓ DBBL for digital
✓ BRAC/Prime for SME

Need bank selection help?`,

  visa: `🛂 VISA & WORK PERMIT GUIDE

👔 EMPLOYMENT VISA:
━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1: Get Employment Visa
From Bangladesh Embassy:

Required:
✓ Valid passport (6+ months)
✓ Employment contract
✓ Company recommendation
✓ Educational certificates (attested)
✓ Experience certificates
✓ Police clearance
✓ Medical certificate
✓ Photos

Timeline: 2-4 weeks
Validity: 1-2 years
Fee: $160 - $300

STEP 2: Work Permit
Apply through BIDA after arrival:

Timeline: 30 days
Validity: 1-2 years
Fee: BDT 50,000 - 200,000/year

STEP 3: Residence Permit
From Immigration:
Timeline: 15-30 days

📊 QUOTA SYSTEM:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Expatriate Limits:
• Manufacturing: 20% of staff
• Services: 15% of staff
• EPZ: 5% of staff
• Specialized: Exemptions available

Positions Usually Approved:
✓ CEO/Managing Director
✓ CFO, CTO
✓ Specialized engineers
✓ Technical experts
✓ Senior management

🏢 BUSINESS VISA:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Single Entry:
• Validity: 3 months
• Stay: 30 days
• Fee: $51

Multiple Entry:
• Validity: 6-12 months
• Stay: 30 days/visit
• Fee: $110 - $160

On Arrival:
• Available: 61 countries
• Stay: 30 days
• Fee: $51

💼 INVESTOR VISA:
━━━━━━━━━━━━━━━━━━━━━━━━━━
For Foreign Investors:
• BIDA registration needed
• Multiple entry
• Up to 5 years validity
• Family inclusion possible

💑 DEPENDENT VISA:
━━━━━━━━━━━━━━━━━━━━━━━━━━
For Spouse & Children:
Eligible: Spouse + kids under 18
Required:
✓ Employee's work permit
✓ Marriage certificate
✓ Birth certificates
✓ Passports

Validity: Same as primary
Benefits:
• Can study
• Spouse can work (with approval)

🌏 ON-ARRIVAL COUNTRIES:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Available for 61 countries:
• EU countries
• USA, Canada
• Japan, South Korea
• Australia, New Zealand
• Singapore, Malaysia
• And more

💡 TIPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Start 3 months early
✓ All docs must be attested
✓ Keep multiple copies
✓ Engage local consultant
✓ BIDA helps large investments
✓ Police clearance valid 6 months
✓ Don't work before permit

Need visa application help?`,

  document: `📄 COMPLETE DOCUMENT CHECKLIST

🏢 COMPANY REGISTRATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Personal Documents:
✓ Passport copies (all directors)
✓ Photos (4 copies each)
✓ National ID (locals)
✓ Address proof
✓ Email & phone

Company Documents:
✓ Proposed names (3 options)
✓ Memorandum of Association
✓ Articles of Association
✓ Capital details
✓ Business description
✓ Office address proof
✓ Director consents (Form IX)
✓ Declaration (Form XII)

🏭 TRADE LICENSE:
━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Certificate of Incorporation
✓ Memorandum & Articles
✓ TIN certificate
✓ Office rental/ownership
✓ Holding tax receipt
✓ Business activities list

🏭 MANUFACTURING:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Factory License:
✓ Building plan approval
✓ Factory layout
✓ Machinery list
✓ Power requirement
✓ Worker count
✓ Safety equipment

Environmental:
✓ Project description
✓ Land documents
✓ Site plan
✓ Process flowchart
✓ Emission details
✓ IEE/EIA report

Fire Safety:
✓ Building plan
✓ Fire equipment list
✓ Emergency exits
✓ Fire drill procedure

💊 PHARMACEUTICAL:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Drug License:
✓ Pharmacist appointment
✓ Pharmacist credentials
✓ GMP facility layout
✓ QC lab details
✓ Manufacturing process
✓ Storage specs

Product Registration:
✓ Product formula
✓ Manufacturing process
✓ Quality specs
✓ Packaging details
✓ Stability data
✓ Clinical data (new drugs)

🏦 BANK ACCOUNT:
━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Certificate of Incorporation
✓ Memorandum & Articles
✓ Board resolution
✓ Authorized signatories
✓ Director details
✓ Passports & photos
✓ Trade license
✓ TIN certificate
✓ Office address proof
✓ Business plan

📦 IMPORT/EXPORT:
━━━━━━━━━━━━━━━━━━━━━━━━━━
IRC/ERC:
✓ Trade license
✓ TIN certificate
✓ Bank certificate
✓ Incorporation certificate
✓ Products list

💡 DOCUMENT TIPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Foreign docs must be:
  • Translated (if needed)
  • Notarized
  • Embassy attested (some cases)

✓ Keep multiple copies:
  • Originals for submission
  • Certified copies backup
  • Scanned for quick access

✓ Digital signatures:
  • Accepted for most
  • Speeds up process

Need document templates?`,

  sector: `🏭 SECTOR-WISE OPPORTUNITIES

1️⃣ PHARMACEUTICALS 💊
Market: $4.5B, Growth: 12%
Investment: $250,000+
Tax holiday: 10 years
Exports: 150+ countries
Local production: 98%

2️⃣ TEXTILES & GARMENTS 👔
2nd largest RMG exporter
Exports: $45B+/year
Investment: $150,000+
Green factory incentives
Strong labor force

3️⃣ ICT & SOFTWARE 💻
Fast-growing sector
Tax exemption till 2027
Investment: $50,000+
Export incentive: 10%
500,000+ IT professionals
Hi-Tech Parks available

4️⃣ LEATHER & FOOTWEAR 👞
2% global market share
Dedicated industrial estate
Investment: $200,000+
Tax holiday: 7-10 years

5️⃣ FOOD PROCESSING 🍽️
Strong agri base
Growing middle class
Investment: $150,000+
Halal certification advantage
Middle East exports

6️⃣ HEALTHCARE 🏥
Expanding needs
Private sector growing
Investment: $200,000+
Medical tourism potential

7️⃣ ENERGY & POWER ⚡
High demand
Government support
Investment: $1M+
PPP opportunities

8️⃣ REAL ESTATE 🏗️
Booming market
Investment: $500,000+
Urban development

9️⃣ LOGISTICS 🚢
Strategic location
Investment: $500,000+
Port development

🔟 AGRO-PROCESSING 🌾
Agriculture-based
Value addition
Investment: $100,000+
Tax holiday: 5-7 years

Which sector interests you?`,

  hello: `👋 Welcome to BIDA AI Business Advisor!

I'm your intelligent assistant with comprehensive knowledge about investing in Bangladesh. I can help you with:

🏢 BUSINESS SETUP:
• Complete registration process
• All licenses & permits
• Timeline breakdowns
• Cost estimations

💰 INVESTMENT:
• Sector-wise requirements
• Tax benefits & incentives
• Economic zones
• Financial planning

🌏 OPERATIONS:
• Banking & finance
• Hiring & employment
• Import/export
• Regulatory compliance

📊 SECTORS I COVER:
• Manufacturing
• Pharmaceuticals
• IT & Technology
• Textiles & Garments
• Food processing
• Real estate
• Healthcare
• Energy & more

💡 I PROVIDE:
✓ Step-by-step guidance
✓ Accurate timelines & costs
✓ Tax incentive details
✓ Zone recommendations
✓ License requirements
✓ Hiring strategies
✓ Banking advice
✓ Compliance help

🎯 Try asking:
• "How do I open a pharmaceutical factory?"
• "What are investment requirements for manufacturing?"
• "Tell me about tax benefits"
• "Which zone is best for my business?"
• "What's the complete timeline?"
• "How much does it cost?"

Ask me anything! 🚀`,
};

export function AIAdvisor({ isOpen, onClose }: AIAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "👋 Welcome to BIDA AI Business Advisor!\n\nI'm your intelligent assistant with comprehensive knowledge about investing in Bangladesh.\n\n💡 I can help you with:\n✅ Complete business setup procedures\n✅ License & permit requirements\n✅ Investment costs & incentives\n✅ Accurate timeline estimates\n✅ Banking & finance guidance\n✅ Hiring & employment strategies\n✅ Zone selection & recommendations\n\nWhat would you like to know about setting up your business in Bangladesh?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "How do I open a pharmaceutical factory?",
    "What are the investment requirements?",
    "Tell me about tax benefits and incentives",
    "Which economic zone should I choose?",
  ];

  const findBestResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Check knowledge base for best match
    for (const [category, keywords] of Object.entries(KNOWLEDGE_BASE)) {
      for (const keyword of keywords) {
        if (lowerInput.includes(keyword)) {
          return FAQ_RESPONSES[category] || FAQ_RESPONSES['hello'];
        }
      }
    }

    // Default helpful response
    return `I'd be happy to help! I have comprehensive information about:

📋 **Business Setup & Registration**
• Step-by-step company incorporation
• Trade license requirements
• Complete documentation

🏭 **Sector-Specific Guidance**
• Pharmaceutical factories
• Manufacturing plants
• IT & Technology
• Food processing & more

💰 **Investment & Finance**
• Capital requirements by sector
• Tax benefits & incentives (up to 10 years!)
• Banking & loan facilities
• Detailed cost breakdowns

📍 **Zones & Locations**
• EPZs, SEZs, Hi-Tech Parks
• Zone selection guidance
• Comparative benefits

👥 **Operations & Compliance**
• Hiring & employment
• Visa & work permits
• Timeline planning

🎯 **Popular Questions:**
• "How do I open a pharmaceutical factory?"
• "What are the investment requirements for manufacturing?"
• "Tell me about Special Economic Zones"
• "What's the complete timeline for business setup?"
• "How much does it cost to start?"
• "What documents do I need?"
• "How do I hire employees?"
• "Which bank should I choose?"

What specific information would you like?`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking with realistic delay
    setTimeout(() => {
      const responseContent = findBestResponse(currentInput);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-50 overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Business Advisor</h1>
              <p className="text-sm text-gray-600">Powered by BIDA Intelligence</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-green-700">Online</span>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden flex flex-col max-w-6xl mx-auto w-full px-6 py-6">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                message.type === 'bot'
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                  : 'bg-gradient-to-br from-gray-600 to-gray-700'
              }`}>
                {message.type === 'bot' ? (
                  <Bot className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-4 rounded-2xl ${
                  message.type === 'bot'
                    ? 'bg-white shadow-md border border-gray-200'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                }`}>
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 px-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <div className="mb-4 flex-shrink-0">
            <p className="text-sm text-gray-600 mb-3 font-medium">💡 Try asking:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-left px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all text-sm group"
                >
                  <Sparkles className="w-4 h-4 inline mr-2 text-blue-500 group-hover:text-purple-500 transition-colors" />
                  {question}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-xl p-4 flex-shrink-0">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your investment in Bangladesh..."
              className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl font-medium"
            >
              <Send className="w-5 h-5" />
              <span className="hidden sm:inline">Send</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="text-blue-500 mt-1 text-lg">📋</div>
              <div>
                <strong className="text-gray-900">Process Guidance</strong>
                <p className="text-gray-600 text-xs">Step-by-step for any business type</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="text-purple-500 mt-1 text-lg">⏱</div>
              <div>
                <strong className="text-gray-900">Time Estimates</strong>
                <p className="text-gray-600 text-xs">Accurate SLA for all approvals</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="text-green-500 mt-1 text-lg">💼</div>
              <div>
                <strong className="text-gray-900">Investment Info</strong>
                <p className="text-gray-600 text-xs">Capital requirements & incentives</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}