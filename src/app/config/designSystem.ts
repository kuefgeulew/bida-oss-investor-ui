/**
 * BIDA OSS Glass Design System
 * 
 * Ultra-premium, minimal, white, Apple-grade, government command center aesthetic
 * Consistent spacing, shadows, borders, and glass effects
 */

// Card Padding - Standard scales
export const cardPadding = {
  xs: 'p-3',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
} as const;

// Card Shadows - Glass depth levels
export const cardShadow = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  base: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
} as const;

// Border Radius - Consistent curves
export const borderRadius = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  base: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  full: 'rounded-full',
} as const;

// Glass Effects - Premium translucent backgrounds
export const glassEffect = {
  light: 'bg-white/60 backdrop-blur-xl border border-white/40',
  medium: 'bg-white/70 backdrop-blur-xl border border-white/50',
  strong: 'bg-white/80 backdrop-blur-xl border border-white/60',
  solid: 'bg-white border border-gray-200',
} as const;

// Spacing - Consistent gaps and margins
export const spacing = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-10',
  '3xl': 'gap-12',
} as const;

// Standard Glass Card - Most common combination
export const standardGlassCard = `${cardPadding.md} ${cardShadow.lg} ${borderRadius.base} ${glassEffect.medium}`;

// Small Glass Card - For compact items
export const smallGlassCard = `${cardPadding.sm} ${cardShadow.base} ${borderRadius.base} ${glassEffect.light}`;

// Large Glass Card - For major sections
export const largeGlassCard = `${cardPadding.lg} ${cardShadow.xl} ${borderRadius.lg} ${glassEffect.strong}`;

// Solid White Card - For high importance
export const solidWhiteCard = `${cardPadding.md} ${cardShadow.lg} ${borderRadius.base} ${glassEffect.solid}`;

// Glass Card (backward compatible) - replaces "glass-card p-X" throughout codebase
export const glassCard = {
  // glass-card alone without padding
  base: 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-lg',
  // glass-card with common padding variants
  'p-2': 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-lg p-2',
  'p-3': 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-lg p-3',
  'p-4': 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-lg p-4',
  'p-6': 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-lg p-6',
  'p-8': 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-lg p-8',
  // Common utilities
  sm: smallGlassCard,
  md: standardGlassCard,
  lg: largeGlassCard,
} as const;

// Button Base - Consistent button styling
export const buttonBase = `${borderRadius.base} transition-all duration-200`;

// Input Base - Consistent input styling
export const inputBase = `${borderRadius.base} ${cardPadding.sm} border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`;

// Container Max Width - Consistent content bounds
export const containerWidth = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
} as const;