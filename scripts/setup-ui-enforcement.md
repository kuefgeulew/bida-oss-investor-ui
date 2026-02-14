# UI Enforcement Setup Guide

## What This Does

This enforcement system prevents UI rendering protocol violations from being committed to the codebase. It runs automatically in three places:

1. **Pre-commit hook** - Blocks commits with violations
2. **CI pipeline** - Blocks PRs with violations  
3. **Manual audit** - Run anytime with `npm run ui-audit`

## Setup Instructions

### 1. Install Husky (for pre-commit hooks)

```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm run ui-audit"
```

### 2. Make scripts executable

```bash
chmod +x scripts/ui-audit.sh
chmod +x .husky/pre-commit
```

### 3. Configure Git hooks path (if needed)

```bash
git config core.hooksPath .husky
```

### 4. Test the setup

```bash
# Run the audit manually
npm run ui-audit

# Should output:
# ✅ SUCCESS: No UI rendering protocol violations detected
```

### 5. Test enforcement

Try creating a violation:

```tsx
// Create a test file: src/app/components/Test.tsx
export function Test() {
  return <div className="shadow-xl rounded-2xl">Violation</div>;
}
```

Then try to commit:

```bash
git add src/app/components/Test.tsx
git commit -m "test violation"

# Should output:
# ❌ COMMIT REJECTED: UI rendering protocol violations detected
```

## Manual Audit

Run anytime to check for violations:

```bash
npm run ui-audit
```

## Bypass (Emergency Only)

To bypass the pre-commit hook in emergencies:

```bash
git commit --no-verify
```

**WARNING**: This should only be used in true emergencies. Bypassing enforcement degrades the system over time.

## CI Integration

The GitHub Actions workflow runs automatically on:
- Push to `main` or `develop`
- Pull requests to `main` or `develop`

If violations are detected, the CI build fails and the PR cannot be merged.

## What Gets Checked

### ❌ Banned Patterns

1. **Manual shadow classes**
   ```tsx
   className="shadow-xl"  // ❌ BANNED
   ```

2. **Manual rounded classes**
   ```tsx
   className="rounded-2xl"  // ❌ BANNED
   ```

3. **Manual bg-white classes**
   ```tsx
   className="bg-white"  // ❌ BANNED
   ```

4. **Manual backdrop-blur classes**
   ```tsx
   className="backdrop-blur"  // ❌ BANNED
   ```

5. **Direct DesignSystem.tsx imports**
   ```tsx
   import { InstrumentCard } from './DesignSystem';  // ❌ BANNED
   ```

6. **Deprecated glass-* classes**
   ```tsx
   className="glass-card"  // ⚠️ DEPRECATED
   ```

### ✅ Correct Patterns

```tsx
import { InstrumentCard } from '@/app/components/ui-primitives';

export function MyComponent() {
  return (
    <InstrumentCard>
      {/* Content */}
    </InstrumentCard>
  );
}
```

## Files Excluded from Audit

The following files are exempt from enforcement:
- `DesignSystem.tsx` - Core implementation
- `ui-primitives.ts` - Export layer
- `UI_*.ts` - Documentation files
- `UI_*.tsx` - Documentation files

## Troubleshooting

### Audit script not running

Check if the script is executable:
```bash
chmod +x scripts/ui-audit.sh
```

### Pre-commit hook not working

1. Check Husky installation:
   ```bash
   npx husky install
   ```

2. Verify hook exists:
   ```bash
   cat .husky/pre-commit
   ```

3. Make it executable:
   ```bash
   chmod +x .husky/pre-commit
   ```

### False positives

If the audit detects something that should be allowed, you can:

1. Add it to the exclusion list in `scripts/ui-audit.sh`
2. Update the grep patterns to be more specific
3. Add a comment explaining why it's necessary

## The Bloomberg Move

This is the exact enforcement strategy used by:
- **Bloomberg Terminal** - UI compiler with linting rules
- **Stripe Dashboard** - Design system with CI checks
- **Apple Frameworks** - Type system prevents manual styling

You've now implemented the same level of enforcement for BIDA OSS.

## The Test (3 Months From Now)

Someone under pressure adds a quick feature.

**With enforcement:**
```bash
git commit -m "quick fix"
❌ COMMIT REJECTED: UI rendering protocol violations detected
```

**Without enforcement:**
```bash
git commit -m "quick fix"
✅ Commit successful
(Design system slowly degrades)
```

That's the difference between a product that maintains quality and one that doesn't.

## Summary

You've implemented a **UI constitution with enforcement**, not just guidelines.

The system now **defends itself** against violations.

This is what separates real products from student projects.
