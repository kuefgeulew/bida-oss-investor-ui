# 🎯 Demo Investor System

## Overview

The Demo Investor is a **pre-seeded investor profile** with completed data across all engines. This is **not a shortcut or bypass** — it's a fully configured investor that has already completed all onboarding steps.

## Purpose

For **presentations, demos, and vivas**, you can login as a returning investor who already has:

- ✅ Registered BBID
- ✅ Active corporate bank account (BRAC Bank)
- ✅ Completed KYC verification
- ✅ Active escrow account ($2.5M USD)
- ✅ 5 government approvals completed
- ✅ Payment invoices paid
- ✅ Certificates issued
- ✅ Approval pipeline running

## Architecture

This follows the **same architectural principles** as the rest of the system:

```
Engines → State → UI Projection
```

The demo investor is seeded into the engines using **the exact same APIs** that regular users would use. No logic is bypassed.

## Usage

### Quick Login

**Email:** `demo@investor.bd`  
**Password:** `demo123`

### What Happens on Login

1. System recognizes the demo investor email
2. Loads pre-seeded data from engines
3. Dashboard shows completed profile with all features active
4. All panels display live data from engines

### Automatic Seeding

The demo investor is automatically seeded when the app loads (`App.tsx`):

```typescript
useEffect(() => {
  seedDemoInvestor();
}, []);
```

This only runs **once per session** to populate the engines with demo data.

## What Gets Seeded

### 1. BBID Registration
- Company: Demo Manufacturing Ltd
- Sector: Manufacturing (Textiles & Garments)
- Investment: $5M USD
- Employees: 150
- RJSC & TIN numbers

### 2. Bank Integration
- Bank: BRAC Bank
- KYC: Approved
- Corporate Account: Active with balance
- Escrow: $2.5M USD active

### 3. Approval Pipeline
- 5 steps completed
- Payment invoices marked paid
- Certificates issued
- Remaining steps pending

## File Structure

```
/src/app/devtools/
├── demoInvestorSeed.ts    # Main seeding logic
└── README.md              # This file
```

## API Functions

### `seedDemoInvestor()`
Seeds the demo investor data. Called automatically on app load.

### `resetDemoInvestor()`
Resets the seeded flag (for testing).

### `isDemoSeeded()`
Returns `true` if demo data has been seeded.

### `getDemoInvestorSummary()`
Returns a summary object with investor details and features.

## Comparison: Demo vs New Investor

| Feature | Demo Investor | New Investor |
|---------|--------------|--------------|
| Login | Instant | Must register first |
| BBID | Already registered | Must complete form |
| Bank Account | Already active | Must complete wizard |
| Approvals | 5 completed | Must apply |
| Payments | Already paid | Must pay invoices |
| Certificates | Already issued | Generated after approval |
| Dashboard | Fully populated | Empty state |

## For Presentations

The demo investor provides a **complete, realistic view** of the system for:

- ✅ Stakeholder demonstrations
- ✅ Viva presentations
- ✅ Feature showcases
- ✅ User flow demonstrations
- ✅ System capability reviews

## Technical Notes

### No Bypass
Every feature follows the normal flow:
- `registerBBID()` is called
- `BankDataProvider.initialize()` is called
- `generateInvoice()` and `markPaid()` are called
- `generateCertificate()` is called

### State Persistence
Demo data exists in **in-memory engines** only. It resets on page refresh (just like regular data in this prototype).

### User Authentication
The `AuthContext` recognizes the demo investor email and loads the correct `investorId` and `bbid` from the seeded engines.

## Future Enhancements

- [ ] Add demo data for officer and admin roles
- [ ] Allow resetting demo data via admin panel
- [ ] Add demo investors for different sectors
- [ ] Export demo data for testing purposes

---

**Architecture Law:** This is a seeded investor, not a logic bypass. Every panel reads from engines, engines contain real data.
