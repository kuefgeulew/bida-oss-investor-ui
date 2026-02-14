/**
 * ═══════════════════════════════════════════════════════════════════════════
 * QUICK REFERENCE - UI PRIMITIVES CHEAT SHEET
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// IMPORT (Always use this, never DesignSystem.tsx directly)
// ═══════════════════════════════════════════════════════════════════════════

import { 
  InstrumentSection,
  InstrumentCard,
  InstrumentPanel,
  InstrumentButton,
  InstrumentGrid,
  InstrumentIcon,
  InstrumentStat,
  InstrumentNameplate
} from '@/app/components/ui-primitives';

// ═══════════════════════════════════════════════════════════════════════════
// REPLACEMENTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ❌ <section>
 * ✅ <InstrumentSection>
 * 
 * ❌ <div className="card shadow-xl rounded-2xl p-8">
 * ✅ <InstrumentCard>
 * 
 * ❌ <button className="px-4 py-2 bg-blue-500 rounded-lg">
 * ✅ <InstrumentButton variant="primary">
 * 
 * ❌ <div className="grid grid-cols-3 gap-6">
 * ✅ <InstrumentGrid cols={3} gap={6}>
 * 
 * ❌ <div className="w-14 h-14 rounded-2xl bg-blue-50">
 * ✅ <InstrumentIcon>
 * 
 * ❌ <div className="p-6 bg-white rounded-xl shadow">
 * ✅ <InstrumentStat>
 * 
 * ❌ <div className="inline-block px-7 py-3.5 bg-white rounded-2xl">
 * ✅ <InstrumentNameplate>
 */

// ═══════════════════════════════════════════════════════════════════════════
// COMMON PATTERNS
// ═══════════════════════════════════════════════════════════════════════════

// PATTERN 1: Stats Grid
function StatsSection() {
  return (
    <InstrumentSection>
      <InstrumentGrid cols={4} gap={8}>
        <InstrumentCard>
          <InstrumentStat>
            <div className="text-3xl font-bold">$15B+</div>
            <div className="text-sm text-slate-600">FDI Approved</div>
          </InstrumentStat>
        </InstrumentCard>
      </InstrumentGrid>
    </InstrumentSection>
  );
}

// PATTERN 2: Interactive Card
function FeatureCard({ title, icon: Icon, onClick }) {
  return (
    <InstrumentCard hoverable onClick={onClick}>
      <InstrumentIcon>
        <Icon className="w-6 h-6 text-[#0e7490]" />
      </InstrumentIcon>
      <h3 className="text-lg font-semibold mt-4">{title}</h3>
    </InstrumentCard>
  );
}

// PATTERN 3: Action Panel
function ActionPanel() {
  return (
    <InstrumentSection>
      <InstrumentCard>
        <InstrumentNameplate>
          <span className="text-sm font-semibold text-[#0f172a]">
            Action Required
          </span>
        </InstrumentNameplate>
        
        <div className="flex gap-4 mt-6">
          <InstrumentButton variant="primary" onClick={handleSubmit}>
            Submit Application
          </InstrumentButton>
          <InstrumentButton variant="secondary" onClick={handleCancel}>
            Cancel
          </InstrumentButton>
        </div>
      </InstrumentCard>
    </InstrumentSection>
  );
}

// PATTERN 4: Tab Content (with panel transitions)
function TabContent({ activeTab }) {
  return (
    <InstrumentPanel panelKey={activeTab}>
      <InstrumentGrid cols={3} gap={8}>
        <InstrumentCard>...</InstrumentCard>
        <InstrumentCard>...</InstrumentCard>
        <InstrumentCard>...</InstrumentCard>
      </InstrumentGrid>
    </InstrumentPanel>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT API
// ═══════════════════════════════════════════════════════════════════════════

/**
 * InstrumentSection
 * - Automatic scroll-in animation
 * - Use for major page sections
 * Props: className
 */

/**
 * InstrumentCard
 * - Neumorphic surface treatment
 * - Optional hover animation
 * Props: className, onClick, hoverable
 */

/**
 * InstrumentPanel
 * - Sliding panel transitions for tabs
 * - Use within tab contexts
 * Props: panelKey, className
 */

/**
 * InstrumentButton
 * - Hardware press physics
 * - Two variants: primary (blue) / secondary (glass)
 * Props: className, onClick, disabled, variant
 */

/**
 * InstrumentGrid
 * - Responsive grid with automatic breakpoints
 * - Enforces spacing rhythm
 * Props: cols (1-6), gap (2|3|4|6|8|12), className
 */

/**
 * InstrumentIcon
 * - Machined button feel for icon containers
 * - 56x56px standard size
 * Props: className
 */

/**
 * InstrumentStat
 * - Micro-elevation for metrics
 * - Use within cards for data display
 * Props: className
 */

/**
 * InstrumentNameplate
 * - Engraved badge style for headers
 * - Rim-light etching effect
 * Props: className
 */

// ═══════════════════════════════════════════════════════════════════════════
// QUICK TEST
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Open your component file.
 * 
 * ✅ PASS: You see imports from ui-primitives
 * ❌ FAIL: You see <div className="shadow-xl rounded-2xl">
 * 
 * That's the line.
 */

export {};
