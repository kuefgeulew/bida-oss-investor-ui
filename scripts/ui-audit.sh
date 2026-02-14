#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════
# UI OPERATING SYSTEM - ENFORCEMENT AUDIT
# ═══════════════════════════════════════════════════════════════════════════
# 
# This script detects UI rendering protocol violations.
# Run before commit or in CI to prevent design system regression.
#
# Usage:
#   npm run ui-audit
#   ./scripts/ui-audit.sh
#
# Exit codes:
#   0 = No violations (system is clean)
#   1 = Violations detected (system has regressed)
# ═══════════════════════════════════════════════════════════════════════════

set -e

VIOLATIONS=0
COMPONENTS_DIR="src/app/components"

echo "═══════════════════════════════════════════════════════════════════════════"
echo "UI RENDERING PROTOCOL AUDIT"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

# ═══════════════════════════════════════════════════════════════════════════
# CHECK 1: Manual shadow classes
# ═══════════════════════════════════════════════════════════════════════════
echo "🔍 Checking for manual shadow classes..."

SHADOW_VIOLATIONS=$(grep -r 'className=".*shadow' "$COMPONENTS_DIR" \
  --include="*.tsx" \
  --exclude="DesignSystem.tsx" \
  --exclude="ui-primitives.ts" \
  --exclude="UI_*.ts" \
  --exclude="UI_*.tsx" \
  2>/dev/null | wc -l || echo 0)

if [ "$SHADOW_VIOLATIONS" -gt 0 ]; then
  echo "❌ FAIL: Found $SHADOW_VIOLATIONS manual shadow classes"
  grep -rn 'className=".*shadow' "$COMPONENTS_DIR" \
    --include="*.tsx" \
    --exclude="DesignSystem.tsx" \
    --exclude="ui-primitives.ts" \
    --exclude="UI_*.ts" \
    --exclude="UI_*.tsx" \
    --color=always 2>/dev/null || true
  VIOLATIONS=$((VIOLATIONS + SHADOW_VIOLATIONS))
  echo ""
else
  echo "✅ PASS: No manual shadow classes"
  echo ""
fi

# ═══════════════════════════════════════════════════════════════════════════
# CHECK 2: Manual rounded classes
# ═══════════════════════════════════════════════════════════════════════════
echo "🔍 Checking for manual rounded classes..."

ROUNDED_VIOLATIONS=$(grep -r 'className=".*rounded-[2-3]xl' "$COMPONENTS_DIR" \
  --include="*.tsx" \
  --exclude="DesignSystem.tsx" \
  --exclude="ui-primitives.ts" \
  --exclude="UI_*.ts" \
  --exclude="UI_*.tsx" \
  2>/dev/null | wc -l || echo 0)

if [ "$ROUNDED_VIOLATIONS" -gt 0 ]; then
  echo "❌ FAIL: Found $ROUNDED_VIOLATIONS manual rounded classes"
  grep -rn 'className=".*rounded-[2-3]xl' "$COMPONENTS_DIR" \
    --include="*.tsx" \
    --exclude="DesignSystem.tsx" \
    --exclude="ui-primitives.ts" \
    --exclude="UI_*.ts" \
    --exclude="UI_*.tsx" \
    --color=always 2>/dev/null || true
  VIOLATIONS=$((VIOLATIONS + ROUNDED_VIOLATIONS))
  echo ""
else
  echo "✅ PASS: No manual rounded classes"
  echo ""
fi

# ═══════════════════════════════════════════════════════════════════════════
# CHECK 3: Manual bg-white classes
# ═══════════════════════════════════════════════════════════════════════════
echo "🔍 Checking for manual bg-white classes..."

BG_VIOLATIONS=$(grep -r 'className=".*bg-white' "$COMPONENTS_DIR" \
  --include="*.tsx" \
  --exclude="DesignSystem.tsx" \
  --exclude="ui-primitives.ts" \
  --exclude="UI_*.ts" \
  --exclude="UI_*.tsx" \
  2>/dev/null | wc -l || echo 0)

if [ "$BG_VIOLATIONS" -gt 0 ]; then
  echo "❌ FAIL: Found $BG_VIOLATIONS manual bg-white classes"
  grep -rn 'className=".*bg-white' "$COMPONENTS_DIR" \
    --include="*.tsx" \
    --exclude="DesignSystem.tsx" \
    --exclude="ui-primitives.ts" \
    --exclude="UI_*.ts" \
    --exclude="UI_*.tsx" \
    --color=always 2>/dev/null || true
  VIOLATIONS=$((VIOLATIONS + BG_VIOLATIONS))
  echo ""
else
  echo "✅ PASS: No manual bg-white classes"
  echo ""
fi

# ═══════════════════════════════════════════════════════════════════════════
# CHECK 4: Manual backdrop-blur classes
# ═══════════════════════════════════════════════════════════════════════════
echo "🔍 Checking for manual backdrop-blur classes..."

BLUR_VIOLATIONS=$(grep -r 'className=".*backdrop-blur' "$COMPONENTS_DIR" \
  --include="*.tsx" \
  --exclude="DesignSystem.tsx" \
  --exclude="ui-primitives.ts" \
  --exclude="UI_*.ts" \
  --exclude="UI_*.tsx" \
  2>/dev/null | wc -l || echo 0)

if [ "$BLUR_VIOLATIONS" -gt 0 ]; then
  echo "❌ FAIL: Found $BLUR_VIOLATIONS manual backdrop-blur classes"
  grep -rn 'className=".*backdrop-blur' "$COMPONENTS_DIR" \
    --include="*.tsx" \
    --exclude="DesignSystem.tsx" \
    --exclude="ui-primitives.ts" \
    --exclude="UI_*.ts" \
    --exclude="UI_*.tsx" \
    --color=always 2>/dev/null || true
  VIOLATIONS=$((VIOLATIONS + BLUR_VIOLATIONS))
  echo ""
else
  echo "✅ PASS: No manual backdrop-blur classes"
  echo ""
fi

# ═══════════════════════════════════════════════════════════════════════════
# CHECK 5: Direct imports from DesignSystem.tsx
# ═══════════════════════════════════════════════════════════════════════════
echo "🔍 Checking for direct DesignSystem.tsx imports..."

IMPORT_VIOLATIONS=$(grep -r "from.*['\"].*DesignSystem['\"]" "$COMPONENTS_DIR" \
  --include="*.tsx" \
  --include="*.ts" \
  --exclude="DesignSystem.tsx" \
  --exclude="ui-primitives.ts" \
  --exclude="UI_*.ts" \
  --exclude="UI_*.tsx" \
  2>/dev/null | grep -c "Instrument" || echo 0)

if [ "$IMPORT_VIOLATIONS" -gt 0 ]; then
  echo "❌ FAIL: Found $IMPORT_VIOLATIONS direct DesignSystem.tsx imports"
  grep -rn "from.*['\"].*DesignSystem['\"]" "$COMPONENTS_DIR" \
    --include="*.tsx" \
    --include="*.ts" \
    --exclude="DesignSystem.tsx" \
    --exclude="ui-primitives.ts" \
    --exclude="UI_*.ts" \
    --exclude="UI_*.tsx" \
    --color=always 2>/dev/null | grep "Instrument" || true
  VIOLATIONS=$((VIOLATIONS + IMPORT_VIOLATIONS))
  echo ""
else
  echo "✅ PASS: No direct DesignSystem.tsx imports"
  echo ""
fi

# ═══════════════════════════════════════════════════════════════════════════
# CHECK 6: Glass system usage (deprecated)
# ═══════════════════════════════════════════════════════════════════════════
echo "🔍 Checking for deprecated glass-* classes..."

GLASS_VIOLATIONS=$(grep -r 'className=".*glass-' "$COMPONENTS_DIR" \
  --include="*.tsx" \
  --exclude="DesignSystem.tsx" \
  --exclude="ui-primitives.ts" \
  --exclude="UI_*.ts" \
  --exclude="UI_*.tsx" \
  2>/dev/null | wc -l || echo 0)

if [ "$GLASS_VIOLATIONS" -gt 0 ]; then
  echo "⚠️  WARNING: Found $GLASS_VIOLATIONS deprecated glass-* classes"
  grep -rn 'className=".*glass-' "$COMPONENTS_DIR" \
    --include="*.tsx" \
    --exclude="DesignSystem.tsx" \
    --exclude="ui-primitives.ts" \
    --exclude="UI_*.ts" \
    --exclude="UI_*.tsx" \
    --color=always 2>/dev/null || true
  echo "   (These should be migrated to Instrument* components)"
  echo ""
else
  echo "✅ PASS: No deprecated glass classes"
  echo ""
fi

# ════════════════════��══════════════════════════════════════════════════════
# FINAL REPORT
# ═══════════════════════════════════════════════════════════════════════════
echo "═══════════════════════════════════════════════════════════════════════════"
echo "AUDIT COMPLETE"
echo "═══════════════════════════════════════════════════════════════════════════"

if [ "$VIOLATIONS" -eq 0 ]; then
  echo ""
  echo "✅ SUCCESS: No UI rendering protocol violations detected"
  echo ""
  echo "The system is clean. All components follow the enforcement rules."
  echo ""
  exit 0
else
  echo ""
  echo "❌ FAILURE: $VIOLATIONS violations detected"
  echo ""
  echo "NEXT STEPS:"
  echo "1. Review violations listed above"
  echo "2. Replace manual classes with Instrument* components"
  echo "3. Import from ui-primitives.ts, not DesignSystem.tsx"
  echo "4. Run 'npm run ui-audit' again"
  echo ""
  echo "See: /src/app/components/UI_ENFORCEMENT_RULES.ts"
  echo "See: /src/app/components/UI_PRIMITIVES_CHEATSHEET.ts"
  echo ""
  exit 1
fi
