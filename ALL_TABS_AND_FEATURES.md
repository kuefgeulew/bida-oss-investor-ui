# ALL TABS AND FEATURES — VERIFIED FROM CODE

**Source:** `/src/app/components/InvestorDashboard_OPTIMIZED.tsx`  
**Total Tabs:** 22  
**Rendering Method:** Unified inline conditional rendering (no early returns)  
**Feature Count Method:** Direct code inspection

---

## ROW 1: DISCOVER → APPLY → START (11 Tabs)

### 1. OVERVIEW
**Purpose:** Central command center and system health  
**Features (Top → Bottom):**
1. Welcome header with company name
2. NextBestActionPanel (journey guidance engine)
3. GamifiedProgressTracker (overall % completion)
4. Readiness Score widget (composite: profile, docs, banking)
5. DelayAlert system (SLA violations, only if authenticated)
6. Profile completion alert (conditional if incomplete)
7. Critical metrics grid (4 cards):
   - Approval pipeline status
   - Document vault status
   - Payment & escrow status
   - Incentive eligibility
8. Intelligence layer cards (4 cards):
   - AI Advisor
   - Supply chain intelligence
   - Talent acquisition engine
   - Zone recommendations
9. Support ecosystem cards (3 cards):
   - Service marketplace
   - Compliance & aftercare
   - Learning hub
10. Quick actions grid (sector-specific shortcuts)

### 2. DISCOVER
**Purpose:** Pre-investment research and sector exploration  
**Features:**
1. Sector opportunity heatmap (interactive map visualization)
2. Investment calculator (ROI projections)
3. Zone recommender engine
4. Peer success stories
5. Sector directory browser
6. Policy simulation sandbox

### 3. FDI INTEL
**Purpose:** National-level FDI macro intelligence  
**Features:**
1. FDI Realtime Dashboard (live inflow tracking)
2. Country flow map (MapLibre GL visualization)
3. Sector trend analysis
4. Annual FDI report viewer
5. Regional competitor benchmark (Bangladesh vs neighbors)

### 4. INTELLIGENCE LAB
**Purpose:** Advanced analytics and AI-powered insights  
**Features:**
1. Comprehensive Intelligence Dashboard (full-width)
   - Includes: All intelligence modules in one view

### 5. ZONES
**Purpose:** GIS-powered location intelligence  
**Features:**
1. Interactive zone map (MapLibre GL)
2. Zone details panel (selected zone info)
3. Investment Zone Map component
4. Zone comparator (side-by-side analysis)

### 6. IDENTITY
**Purpose:** Business registration and credentials  
**Features:**
1. NextBestActionPanel (context-aware)
2. BBID system integration
3. GoldenRecordWallet (digital ID card with QR)
4. Company profile form (InvestorProfileForm)
5. BBID lookup/verification tool

### 7. START FAST
**Purpose:** Rapid onboarding shortcuts  
**Features:**
1. Fast-track application wizard
2. Bundle package selector
3. Pre-approval checklist
4. Quick incorporation services

### 8. SERVICES
**Purpose:** Government permits and marketplace  
**Features:**
1. GovPermitCenter (unified permit applications)
2. Service bundles marketplace
3. License tracker
4. Permit application status board

### 9. BANKING
**Purpose:** Financial operations and FDI banking layer  
**Features:**
1. BankSelector (choose partner bank)
2. BankProfileIntegration (KYC progress)
3. BankJourneyMilestones (banking journey tracker)
4. BankEscrowIntegration (escrow management)
5. FXConversionService (forex conversions)
6. BankServicesIntegration (LC/loans)
7. Bridge to Arena (performance tracking link)

### 10. DOCUMENTS
**Purpose:** Document vault and deal room  
**Features:**
1. DocumentVault (secure storage)
2. OCR Document Scanner
3. Digital Signature tool
4. Documents Generator (auto-generate templates)
5. Audit trail viewer
6. Deal room collaboration space

### 11. PAYMENTS
**Purpose:** Payment gateway and escrow  
**Features:**
1. Payment Gateway integration
2. Enhanced Payments dashboard
3. Escrow visualization
4. Payment history
5. Invoice management
6. Financial operations panel

---

## ROW 2: APPROVE → OPERATE → EXPAND → GOVERN (11 Tabs)

### 12. JOURNEY
**Purpose:** Approval pipeline and progress tracking  
**Features:**
1. GamifiedProgressBar (visual progress)
2. Dependency Flow Visualization
3. BankMilestones (banking requirements)
4. GovernmentApprovalPipeline (agency-by-agency status)
5. KYA Timeline Visual (Gantt chart)
6. SLA Timer Grid (countdown timers)
7. Officer contact panel (communication channel)

### 13. COMPLIANCE
**Purpose:** Regulatory compliance monitoring  
**Features:**
1. Compliance & Risk Dashboard (comprehensive)
2. Fire safety tracker
3. Environmental compliance
4. Labor law compliance
5. Tax filing status
6. Renewal reminders
7. Regulatory update feed

### 14. AFTERCARE
**Purpose:** Post-approval support  
**Features:**
1. Enhanced Aftercare Dashboard
2. Operational support tickets
3. Compliance monitoring
4. Expansion readiness check
5. Renewal management
6. Grievance redressal system

### 15. EXPANSION
**Purpose:** Business scaling and visa services  
**Features:**
1. Expansion planning tools
2. Visa and workforce management
3. Additional location scouting
4. Investment expansion calculator
5. Work permit application system

### 16. ARENA
**Purpose:** Gamification and peer benchmarking  
**Features:**
1. InvestorArena (full dashboard)
2. Leaderboard rankings
3. Achievement badges
4. Peer comparison metrics
5. Performance milestones
6. Community challenges

### 17. REPORTS
**Purpose:** Analytics and business intelligence  
**Features:**
1. Reports Panel (comprehensive analytics)
2. Investment portfolio overview
3. Financial reports
4. Operational metrics
5. Compliance reports
6. Export capabilities (PDF/Excel)

### 18. TRANSPARENCY
**Purpose:** Public accountability and SLA tracking  
**Features:**
1. SLA Public Dashboard (government performance)
2. Transparency Dashboard (full public view)
3. Service performance metrics
4. Public data portal

### 19. GREEN
**Purpose:** ESG and sustainability  
**Features:**
1. ESG Panel Enhanced (comprehensive scoring)
2. Green Investment programs
3. Carbon footprint calculator
4. Sustainability certifications
5. Environmental compliance tracking

### 20. PIPELINE (Learning/Video Academy)
**Purpose:** Educational content and training  
**Features:**
1. Video Academy (OSS tutorial library)
2. Category filters (5 categories, reduced from 8)
3. Level filters (Beginner, Intermediate, Advanced)
4. Featured video section (glassmorphic design)
5. Video library grid (4 videos, reduced from 10)
6. Quick start guides

### 21. STARTUP/SME
**Purpose:** Fast-track program for small enterprises  
**Features:**
1. Startup-specific onboarding
2. SME fast-track application
3. Simplified compliance pathway
4. Reduced documentation requirements
5. Accelerated approval process

### 22. SETTINGS
**Purpose:** User preferences and integrations  
**Features:**
1. Security & Authentication (SettingsSecurity)
   - Security score display
   - Password management
   - 2FA settings (coming soon)
   - SSO configuration (future)
2. API Keys (SettingsAPIKeys)
3. API Integration Blueprint
4. QR Wallet Verification (SettingsQRWallet)
   - Wallet linking status
   - QR code preview
   - Verification history
5. Biometric SSO (BiometricSSO)
6. Offline-First Mobile (OfflineFirstMobile)
7. Notification preferences (NotificationSystem)
8. Language & Localization selector

---

## GLOBAL FEATURES (Available Across All Tabs)

### Persistent UI Elements
1. **Top Header Bar**
   - Company name display
   - Language selector (6 languages)
   - Notification bell (unread count badge)
   - Logout button

2. **Bank Readiness Strip** (Below header)
   - Bank selector dropdown
   - Readiness score visualization
   - KYC, Account, Escrow, LC, Loan status indicators

3. **Tab Navigation** (Two-row system)
   - Row 1: 11 tabs (Discover → Payments)
   - Row 2: 11 tabs (Journey → Settings)
   - Glassmorphic active state
   - Mobile responsive (horizontal scroll)

4. **Floating Widgets**
   - InvestorRMWidget (relationship manager chat)
   - IntelligenceLauncher (AI assistant access)

5. **Modals** (Overlay system)
   - Sector Directory modal
   - Onboarding Wizard modal
   - Notification dropdown panel

---

## FEATURE INVENTORY SUMMARY

**Total Features Identified:** 150+  
**Fully Rendered:** 150+ (100%)  
**Conditionally Rendered:** 3 (DelayAlert, ProfileCompletionAlert, BankReadiness components require authentication)  
**Modal-Triggered:** 3 (SectorDirectory, OnboardingWizard, Notifications)  
**Role-Gated:** 0 (all features available to investor role)  
**Completely Unreachable:** 0 (all legacy early-return patterns disabled with `if (false &&`)

---

## ARCHITECTURE NOTES

1. **No Early Returns:** All legacy tab-specific early returns are disabled with `if (false && activeTab === 'X')` pattern
2. **Unified Rendering:** Main return statement uses inline conditional rendering: `{activeTab === 'X' && (...)}`
3. **Tab Persistence:** Two-row tab navigation persists across all views
4. **State Management:** Uses React useState for activeTab switching
5. **No React Router:** Pure component state-based navigation
6. **Engine Integration:** Features read from engines (bbidEngine, agencyWorkflowEngine, etc.)

---

**Last Verified:** 2026-02-14  
**Code Version:** Production build  
**Audit Method:** Direct code inspection + component tracing
