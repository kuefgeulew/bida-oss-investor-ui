# MEDIA ASSET GUIDE — IMAGES, PHOTOS, AND VECTORS

**Purpose:** Document how images, photos, and assets are added, stored, and referenced in the BIDA OSS system  
**Asset Types:** Raster images (PNG/JPG), vector graphics (SVG), icons (Lucide React)  
**Storage Strategy:** Minimal local files, maximize CDN/API usage

---

## ASSET CATEGORIES

### 1. ICONS (Primary Method)
**Library:** Lucide React  
**Location:** Imported from `lucide-react` package  
**Count:** 100+ icons used across system

#### Usage Pattern
```tsx
import { Building2, CheckCircle, Shield, TrendingUp } from 'lucide-react';

// In component:
<Building2 className="w-6 h-6 text-blue-600" />
```

#### Common Icons Used
- **Navigation:** `LayoutDashboard`, `Map`, `FileText`, `Settings`
- **Status:** `CheckCircle`, `AlertCircle`, `Clock`, `Shield`
- **Actions:** `Download`, `Upload`, `Phone`, `Mail`, `LogOut`
- **Business:** `Building2`, `Briefcase`, `DollarSign`, `TrendingUp`
- **Intelligence:** `Brain`, `Bot`, `Sparkles`, `Target`

#### Why Lucide React?
- **Vector-based:** Crisp at any size
- **Lightweight:** Tree-shakeable (only imports used icons)
- **Consistent:** Unified design language
- **Customizable:** Color, size, stroke via props/Tailwind

---

### 2. STOCK PHOTOS (Dynamic Loading via Unsplash)
**Source:** Unsplash API (public, no authentication required)  
**Method:** `ImageWithFallback` component  
**Storage:** None (images loaded from Unsplash CDN at runtime)

#### Component Location
```
/src/app/components/figma/ImageWithFallback.tsx
```
**Status:** Protected file (do not modify)

#### Usage Pattern
```tsx
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback
  src="https://images.unsplash.com/photo-xxxxx"
  alt="Factory building"
  className="w-full h-48 object-cover rounded-lg"
/>
```

#### How Images Are Sourced
1. **During Development:** Developer calls `unsplash_tool` with query
2. **Tool Returns:** CDN URL from Unsplash
3. **Developer Embeds:** URL in component code
4. **Browser Loads:** Image directly from Unsplash CDN

#### Example Queries Used
```
- "modern factory manufacturing"
- "textile factory bangladesh"
- "pharmaceutical laboratory"
- "IT office software development"
- "renewable energy solar panels"
- "logistics shipping container"
- "financial banking office"
```

#### Why Unsplash?
- **Free:** No API key required for public access
- **High Quality:** Professional photography
- **Fast CDN:** Global delivery network
- **Legal:** Free for commercial use

---

### 3. SVG GRAPHICS (Inline Code)
**Source:** Hand-coded SVG or converted from Figma exports  
**Location:** Inline in component JSX  
**Usage:** Complex graphics, logos, custom illustrations

#### Example: Bangladesh Flag SVG
```tsx
<img 
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%23006A4E'/%3E%3Ccircle cx='12' cy='12' r='8' fill='%23F42A41'/%3E%3C/svg%3E"
  alt="Bangladesh" 
  className="w-6 h-6"
/>
```

#### Example: QR Code Pattern
```tsx
<svg viewBox="0 0 100 100" className="w-full h-full">
  <rect width="100" height="100" fill="white"/>
  <rect x="0" y="0" width="20" height="20" fill="black"/>
  <rect x="80" y="0" width="20" height="20" fill="black"/>
  <rect x="0" y="80" width="20" height="20" fill="black"/>
  {/* Pattern continues... */}
</svg>
```

#### When to Use Inline SVG
- **Simple shapes:** Flags, badges, patterns
- **Dynamic content:** QR codes, charts (if not using library)
- **No external dependency:** Self-contained component
- **Small file size:** <5KB

#### When NOT to Use Inline SVG
- **Complex illustrations:** Use Unsplash photos instead
- **Large files:** >10KB (hurts bundle size)
- **Reusable assets:** Import from `/src/imports/` instead

---

### 4. IMPORTED SVG FILES (From Figma)
**Location:** `/src/imports/` directory  
**Naming:** `svg-[hash]` (e.g., `svg-wg56ef214f`)  
**Usage:** Figma-exported vectors

#### Import Pattern
```tsx
import svgPaths from "../imports/svg-wg56ef214f";

<svg viewBox="0 0 100 100" className="w-24 h-24">
  <path d={svgPaths.path1} fill="currentColor" />
  <path d={svgPaths.path2} fill="currentColor" />
</svg>
```

#### Important Notes
- **Do NOT use `figma:asset` for SVGs:** That's for raster images only
- **Use relative paths:** `../imports/svg-xxx`
- **Not manually created:** These files come from Figma code generation
- **Protected imports:** Do not edit `/src/imports/` manually

---

### 5. FIGMA RASTER ASSETS (Special Import Scheme)
**Scheme:** `figma:asset`  
**Usage:** Raster images (PNG, JPG) exported from Figma designs  
**Location:** Virtual module (not in file system)

#### Import Pattern
```tsx
// CORRECT:
import imgA from "figma:asset/76faf8f617b56e6f079c5a7ead8f927f5a5fee32.png";

// INCORRECT (do NOT prefix with path):
import imgA from "../imports/figma:asset/xxxxx.png"; ❌
import imgA from "./figma:asset/xxxxx.png"; ❌
```

#### Why Special Scheme?
- **Virtual Module:** `figma:asset` is handled by build system
- **Not a File Path:** It's a special identifier for Figma assets
- **Bundler Resolves:** Vite knows how to find and bundle these

#### When to Use
- **Figma Imports:** If user imports Figma frame with images
- **Current Project:** NOT USED (no Figma imports in current code)

---

### 6. EMOJI ICONS (Text-Based)
**Method:** Unicode emoji characters  
**Usage:** Quick visual indicators without importing icons

#### Examples in Code
```tsx
// Sector icons
🏭 Manufacturing
💊 Pharmaceuticals
💻 IT & Technology
⚡ Energy
🌾 Agriculture
🏦 Banking

// Status indicators
✓ Complete
⚠️ Warning
🚨 Critical
📊 Analytics
🎯 Target
🎮 Gamification
```

#### When to Use Emoji
- **Quick prototypes:** Fast visual feedback
- **Non-critical UI:** Placeholder icons
- **Playful elements:** Gamification, celebrations

#### When NOT to Use Emoji
- **Professional dashboards:** Use Lucide icons instead
- **Cross-platform consistency:** Emoji render differently per OS
- **Accessibility:** Screen readers may not announce correctly

---

## ASSET WORKFLOW

### Adding a New Image (Step-by-Step)

#### Scenario: Need a pharmaceutical factory image

**Step 1: Determine Asset Type**
- Photo/illustration? → Use Unsplash
- Icon? → Use Lucide React
- Logo/custom graphic? → Inline SVG

**Step 2: For Unsplash Photo:**
```tsx
// 1. Import ImageWithFallback component
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// 2. Request image URL via unsplash_tool (during development)
// Query: "pharmaceutical laboratory clean room"
// Tool returns: https://images.unsplash.com/photo-xxxxx

// 3. Use in component
<ImageWithFallback
  src="https://images.unsplash.com/photo-xxxxx"
  alt="Pharmaceutical laboratory"
  className="w-full h-64 object-cover rounded-xl"
/>
```

**Step 3: For Lucide Icon:**
```tsx
// 1. Check Lucide React catalog: https://lucide.dev/icons
// Search: "pill" → found Pill icon

// 2. Import
import { Pill } from 'lucide-react';

// 3. Use in component
<Pill className="w-6 h-6 text-blue-600" />
```

**Step 4: For Custom SVG:**
```tsx
// 1. Create inline SVG
const CustomLogo = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="50" r="40" fill="#3b82f6" />
    <text x="50" y="50" textAnchor="middle" dy=".3em" fill="white" fontSize="24">
      BD
    </text>
  </svg>
);

// 2. Use like component
<CustomLogo />
```

---

## ASSET STORAGE LOCATIONS

### Current Project Structure
```
/src/
├── app/
│   └── components/
│       └── figma/
│           └── ImageWithFallback.tsx    ← Image wrapper component
├── imports/                             ← Figma-exported SVGs (if any)
└── styles/
    └── fonts.css                        ← Font imports only

/public/                                 ← NOT USED (no static assets)
```

### Why No `/public` Folder?
- **CDN-First Strategy:** Images load from Unsplash
- **Icon Library:** Lucide React (npm package)
- **Inline SVG:** Embedded in components
- **Zero Local Assets:** Faster deployment, smaller bundle

---

## PERFORMANCE CONSIDERATIONS

### Image Optimization
- **Unsplash CDN:** Automatically optimized (WebP, responsive)
- **Lazy Loading:** Browser-native `loading="lazy"`
- **Responsive Images:** Unsplash supports dynamic sizing via URL params

### Bundle Size Impact
- **Lucide Icons:** ~1KB per icon (tree-shaken)
- **Inline SVG:** ~0.5-2KB per graphic
- **Unsplash Images:** 0KB (external CDN)
- **Figma Assets:** N/A (not used in current build)

### Load Time Optimization
```tsx
// GOOD: Lazy load images
<ImageWithFallback
  src="..."
  loading="lazy"
  decoding="async"
/>

// GOOD: Use appropriate sizes
// Unsplash URL supports dynamic sizing:
src="https://images.unsplash.com/photo-xxxxx?w=400&h=300&fit=crop"

// AVOID: Huge images for small UI elements
// Bad: Loading 4K image for 64x64 avatar
```

---

## ACCESSIBILITY GUIDELINES

### Alt Text Best Practices
```tsx
// GOOD:
<ImageWithFallback
  src="..."
  alt="Modern pharmaceutical manufacturing facility in Dhaka"
/>

// BAD:
<ImageWithFallback
  src="..."
  alt="factory"
/>

// DECORATIVE (empty alt):
<ImageWithFallback
  src="..."
  alt=""
  role="presentation"
/>
```

### Icon Accessibility
```tsx
// GOOD: Semantic icon with aria-label
<Building2 className="w-6 h-6" aria-label="Company headquarters" />

// GOOD: Decorative icon (aria-hidden)
<CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" />
<span>Profile Complete</span>
```

---

## FIGMA IMPORT FLOW (Not Currently Used)

### Theoretical Workflow (If Figma Frames Were Imported)

**Step 1: Designer exports Figma frame**
- Code generation in Figma plugin
- Generates React component with asset references

**Step 2: Developer receives two types of imports**
```tsx
// Raster images (PNG/JPG)
import img1 from "figma:asset/hash1.png";
import img2 from "figma:asset/hash2.png";

// SVG vectors
import svgPaths from "../imports/svg-hash3";
```

**Step 3: Components use imports**
```tsx
<img src={img1} alt="Hero banner" />
<svg><path d={svgPaths.mainPath} /></svg>
```

**Why Not Used in Current Project?**
- Project is hand-coded, not Figma-imported
- Using Unsplash + Lucide React instead
- More flexible for rapid prototyping

---

## TROUBLESHOOTING

### Problem: Image Not Loading
**Symptoms:** Broken image icon in browser

**Possible Causes:**
1. **Unsplash URL expired:** Re-fetch from unsplash_tool
2. **Network blocked:** Check firewall/corporate proxy
3. **Invalid URL:** Typo in src attribute

**Solution:**
```tsx
// Add error handling
<ImageWithFallback
  src="https://images.unsplash.com/photo-xxxxx"
  alt="Factory"
  onError={(e) => {
    e.currentTarget.src = 'https://via.placeholder.com/400x300';
  }}
/>
```

### Problem: Icon Not Rendering
**Symptoms:** Icon name shows as text or nothing appears

**Possible Causes:**
1. **Not imported:** Forgot `import { IconName } from 'lucide-react'`
2. **Typo:** `<Buiding2>` instead of `<Building2>`
3. **Package not installed:** `lucide-react` missing from node_modules

**Solution:**
```bash
# Verify Lucide React is installed
npm list lucide-react

# If missing:
npm install lucide-react
```

### Problem: SVG Not Displaying
**Symptoms:** Blank space where SVG should appear

**Possible Causes:**
1. **Missing viewBox:** SVG needs `viewBox="0 0 width height"`
2. **No dimensions:** Add width/height via className
3. **Invalid path data:** Check `d` attribute

**Solution:**
```tsx
// CORRECT:
<svg 
  viewBox="0 0 100 100" 
  className="w-24 h-24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M..." fill="currentColor" />
</svg>
```

---

## BEST PRACTICES SUMMARY

### DO ✅
- Use Lucide React for all icons
- Load photos from Unsplash CDN
- Add meaningful alt text
- Use lazy loading for images
- Inline small SVGs (<5KB)
- Use `ImageWithFallback` for external images

### DON'T ❌
- Don't store large images in `/public`
- Don't use emoji for professional UI
- Don't forget alt text
- Don't load 4K images for thumbnails
- Don't edit `/src/app/components/figma/ImageWithFallback.tsx`
- Don't use `figma:asset` scheme unless Figma imports present

---

## ASSET INVENTORY (Current Project)

**Lucide Icons:** 50+ unique icons used  
**Unsplash Photos:** ~0 (system uses ImageWithFallback but no photos embedded yet)  
**Inline SVGs:** ~5 (flags, QR patterns, simple graphics)  
**Imported SVGs:** 0 (no Figma imports)  
**Local Files:** 0 (zero assets in `/public`)  
**Total Bundle Impact:** <50KB for all assets combined

---

**Last Updated:** 2026-02-14  
**Asset Strategy:** CDN-first, icon library, minimal local storage  
**Performance:** All assets lazy-loadable, optimized for fast initial render
