import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { standardGlassCard, cardPadding, cardShadow, borderRadius } from '@/app/config/designSystem';

// ═══════════════════════════════════════════════════════════════════════════
// UI OPERATING SYSTEM - INSTRUMENT PRIMITIVES
// ═══════════════════════════════════════════════════════════════════════════
// 
// ⚠️  DO NOT IMPORT FROM THIS FILE DIRECTLY
// ⚠️  Import from: @/app/components/ui-primitives
// 
// WHY:
// Direct imports bypass enforcement. Use ui-primitives.ts as the single
// entry point to ensure architectural compliance.
// 
// CORRECT:   import { InstrumentCard } from '@/app/components/ui-primitives';
// INCORRECT: import { InstrumentCard } from '@/app/components/DesignSystem';
// 
// See: /src/app/components/UI_ENFORCEMENT_RULES.ts
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// SOOTHING, POSH, MINIMAL DESIGN SYSTEM
// Government-grade calm intelligence — NOT flashy, NOT playful, NOT loud
// ═══════════════════════════════════════════════════════════════════════════

// COLOR PALETTE - Used VERY sparingly
export const Colors = {
  // Base
  baseBg: '#f5f7fb',
  cardWhite: 'rgba(255, 255, 255, 0.62)',
  
  // Accent (only for buttons, icons, links, highlights)
  primary: '#3b82f6',
  primarySoft: '#eef4ff',
  borderTint: '#e3ebf7',
  
  // Text hierarchy
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  
  // Semantic
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

// TYPOGRAPHY CONSTANTS - Posh, generous spacing
export const Typography = {
  pageTitle: 'text-[42px] font-semibold tracking-tight text-[#0f172a]',
  sectionTitle: 'text-[28px] font-semibold tracking-tight text-[#0f172a]',
  cardTitle: 'text-[18px] font-semibold tracking-tight text-[#0f172a]',
  body: 'text-[15px] text-[#475569]',
  muted: 'text-[14px] text-[#94a3b8]',
};

// LAYOUT CONTAINERS - Generous, breathable spacing
export const PageContainer = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`max-w-[1400px] mx-auto px-24 py-24 ${className}`}>
    {children}
  </div>
);

export const SectionContainer = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mb-24 ${className}`}>
    {children}
  </div>
);

// PREMIUM GLASS CARD - Using design system constants
export const Card = ({ 
  children, 
  className = '',
  onClick
}: { 
  children: ReactNode; 
  className?: string;
  onClick?: () => void;
}) => (
  <div 
    onClick={onClick}
    className={`${standardGlassCard} transition-all duration-300 ${onClick ? 'cursor-pointer hover:shadow-xl' : ''} ${className}`}
  >
    {children}
  </div>
);

// PRIMARY BUTTON - Only place for bold blue
export const PrimaryButton = ({ 
  children, 
  className = '',
  onClick,
  disabled = false
}: { 
  children: ReactNode; 
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${cardPadding.md} ${borderRadius.base} bg-[#3b82f6] text-white font-medium text-[15px] transition-all duration-300 hover:bg-[#2563eb] hover:shadow-[0_8px_24px_rgba(59,130,246,0.2)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

// SECONDARY BUTTON - Calm glass
export const SecondaryButton = ({ 
  children, 
  className = '',
  onClick,
  disabled = false
}: { 
  children: ReactNode; 
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`glass-button px-6 py-3 text-[#475569] font-medium text-[15px] ${className}`}
  >
    {children}
  </button>
);

// ICON WRAPPER - Soft blue background for icons
export const IconWrap = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) => (
  <div className={`w-14 h-14 rounded-2xl bg-[#eef4ff] flex items-center justify-center ${className}`}>
    {children}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// INSTRUMENT PHYSICS ENGINE
// Product-grade motion grammar and surface contract
// ═══════════════════════════════════════════════════════════════════════════

// Spring physics constants - mechanical precision
const INSTRUMENT_SPRING = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20,
  mass: 0.6
};

const PANEL_SPRING = {
  type: "spring" as const,
  stiffness: 220,
  damping: 22
};

// INSTRUMENT SECTION - Continuity scroll transitions
export const InstrumentSection = ({ 
  children, 
  className = '',
  style
}: { 
  children: ReactNode; 
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={INSTRUMENT_SPRING}
    className={className}
    style={style}
  >
    {children}
  </motion.section>
);

// INSTRUMENT BUTTON - Pressable hardware physics
export const InstrumentButton = ({ 
  children, 
  className = '',
  onClick,
  disabled = false,
  variant = 'primary'
}: { 
  children: ReactNode; 
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}) => {
  const baseClasses = variant === 'primary'
    ? 'bg-[#3b82f6] text-white hover:bg-[#2563eb] hover:shadow-[0_8px_24px_rgba(59,130,246,0.2)]'
    : 'glass-button text-[#475569]';

  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.96 }}
      transition={INSTRUMENT_SPRING}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-medium text-[15px] disabled:opacity-50 disabled:cursor-not-allowed ${baseClasses} ${className}`}
    >
      {children}
    </motion.button>
  );
};

// INSTRUMENT PANEL - Tab context transitions (sliding panels)
export const InstrumentPanel = ({ 
  children, 
  panelKey,
  className = '' 
}: { 
  children: ReactNode; 
  panelKey: string;
  className?: string;
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={panelKey}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={PANEL_SPRING}
      className={className}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// INSTRUMENT CARD - Neumorphic surface with hover response
export const InstrumentCard = ({ 
  children, 
  className = '',
  onClick,
  hoverable = false
}: { 
  children: ReactNode; 
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}) => {
  const Card = hoverable ? motion.div : 'div';
  const hoverProps = hoverable ? {
    whileHover: { y: -3, scale: 1.01 },
    transition: INSTRUMENT_SPRING
  } : {};

  return (
    <Card
      onClick={onClick}
      className={`neu-surface p-8 ${onClick ? 'cursor-pointer' : ''} ${hoverable ? 'neu-surface-hover' : ''} ${className}`}
      {...hoverProps}
    >
      {children}
    </Card>
  );
};

// INSTRUMENT ICON CONTAINER - Machined button feel
export const InstrumentIcon = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) => (
  <div className={`neu-icon-container w-14 h-14 flex items-center justify-center ${className}`}>
    {children}
  </div>
);

// INSTRUMENT STAT - Micro-elevation for metrics
export const InstrumentStat = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) => (
  <div className={`neu-stat p-6 ${className}`}>
    {children}
  </div>
);

// INSTRUMENT NAMEPLATE - Engraved header badges
export const InstrumentNameplate = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) => (
  <div className={`neu-nameplate px-7 py-3.5 inline-block ${className}`}>
    {children}
  </div>
);

// INSTRUMENT GRID - Layout rhythm enforcement
export const InstrumentGrid = ({ 
  children, 
  cols = 3,
  gap = 8,
  className = '' 
}: { 
  children: ReactNode; 
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 2 | 3 | 4 | 6 | 8 | 12;
  className?: string;
}) => {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6'
  }[cols];

  const gapClass = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12'
  }[gap];

  return (
    <div className={`grid ${colsClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
};