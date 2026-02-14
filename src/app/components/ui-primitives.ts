/**
 * UI OPERATING SYSTEM - INSTRUMENT PRIMITIVES
 * 
 * This is the ONLY legal way to build layout UI in this project.
 * 
 * BANNED PATTERNS (compile-time violations):
 * ❌ <section>
 * ❌ <button>
 * ❌ <div className="shadow...">
 * ❌ <div className="rounded...">
 * ❌ <div className="bg-white...">
 * ❌ <div className="p-8...">
 * 
 * LEGAL PATTERNS:
 * ✅ <InstrumentSection>
 * ✅ <InstrumentButton>
 * ✅ <InstrumentCard>
 * ✅ <InstrumentGrid>
 * 
 * WHY THIS EXISTS:
 * Design systems die when enforcement is social, not technical.
 * This file makes it impossible to violate the rendering protocol.
 * 
 * RULE:
 * If a component doesn't import from ui-primitives, it's broken.
 */

// Re-export ONLY the instrument primitives
export {
  InstrumentSection,
  InstrumentCard,
  InstrumentPanel,
  InstrumentButton,
  InstrumentGrid,
  InstrumentIcon,
  InstrumentStat,
  InstrumentNameplate,
  // Legacy components (to be migrated to Instrument* equivalents)
  PrimaryButton,
  SecondaryButton,
  Card,
  SectionContainer,
  PageContainer,
  IconWrap,
  Typography
} from './DesignSystem';

/**
 * ENFORCEMENT CONTRACT:
 * 
 * 1. ALL layout components must import from this file
 * 2. Raw HTML layout elements (<section>, <div className="card">) are violations
 * 3. Manual shadow/rounded/bg classes are violations
 * 4. This is not a recommendation - it's architecture
 * 
 * EXAMPLE (CORRECT):
 * ```tsx
 * import { InstrumentCard, InstrumentButton } from '@/app/components/ui-primitives';
 * 
 * export function MyFeature() {
 *   return (
 *     <InstrumentCard>
 *       <InstrumentButton>Action</InstrumentButton>
 *     </InstrumentCard>
 *   );
 * }
 * ```
 * 
 * EXAMPLE (VIOLATION):
 * ```tsx
 * export function MyFeature() {
 *   return (
 *     <div className="p-8 bg-white rounded-2xl shadow-xl">
 *       <button className="px-4 py-2">Action</button>
 *     </div>
 *   );
 * }
 * ```
 * 
 * THE TEST:
 * Open any component. If you don't see "ui-primitives" in the imports,
 * that component is broken.
 */