# Image Asset Guide

## Image Repository Location

All images are stored in:
```
/public/photos/
```

Subdirectory structure:
```
/public/photos/
├── placeholders/    # SVG fallback images
├── ui/              # UI screenshots
├── zones/           # Economic zone photos
├── sectors/         # Sector images
├── officers/        # Officer profile photos
├── testimonials/    # Investor testimonial portraits
├── admin/           # Admin dashboard images
├── banks/           # Bank partner logos
├── documents/       # Document process images
└── agencies/        # Government agency logos
```

## Allowed Formats

- JPEG (.jpg) - For photographs and zone images
- PNG (.png) - For logos with transparency and screenshots
- SVG (.svg) - For icons and placeholders (preferred for scalability)

File size recommendations:
- Hero images: Max 500KB
- Zone/sector photos: Max 300KB
- Profile photos: Max 100KB
- Logos: Max 50KB
- Placeholders: Max 10KB

## How to Import and Render Images Correctly

### Step 1: Import SafeImage Component
```typescript
import SafeImage from '@/app/components/SafeImage';
import { photoManifest } from '@/app/config/photoManifest';
```

### Step 2: Use SafeImage with photoManifest
```typescript
<SafeImage
  src={photoManifest.zones.dhakaEpz}
  fallback={photoManifest.placeholders.zone}
  alt="Dhaka EPZ"
  className="w-full h-64 object-cover"
  loading="lazy"
/>
```

### Step 3: Always Provide Fallback
Every SafeImage must have a fallback prop pointing to a placeholder SVG from photoManifest.placeholders.

## Rules to Preserve Glassmorphism and Light Theme

### Background Opacity
All image containers must use light backgrounds with 20-30% opacity:
```typescript
className="bg-white/20 backdrop-blur-xl"
```

### No Dark Overlays
Never use dark overlays on images. Use subtle light overlays instead:
```typescript
// WRONG
<div className="bg-black/50">

// CORRECT
<div className="bg-white/10">
```

### Preserve Transparency
When using glassmorphism cards with images:
```typescript
<div className="glass-card p-6">
  <SafeImage 
    src={photoManifest.sectors.textile}
    fallback={photoManifest.placeholders.sector}
    alt="Textile Sector"
    className="rounded-lg mb-4"
  />
</div>
```

### Border and Shadow Consistency
Use consistent border styling:
```typescript
className="border border-white/50 shadow-lg rounded-2xl"
```

## What NOT to Do

### Never Hardcode Image Paths
```typescript
// WRONG
<img src="/photos/zones/dhaka-epz.jpg" />

// WRONG
<img src="/images/zone.jpg" />

// CORRECT
<SafeImage 
  src={photoManifest.zones.dhakaEpz}
  fallback={photoManifest.placeholders.zone}
  alt="Zone"
/>
```

### Never Use Inline Base64
```typescript
// WRONG
<img src="data:image/png;base64,iVBORw0KG..." />

// CORRECT
Add image to /public/photos/, add to photoManifest, use SafeImage
```

### Never Skip Fallback Prop
```typescript
// WRONG
<SafeImage src={photoManifest.zones.dhakaEpz} alt="Zone" />

// CORRECT
<SafeImage 
  src={photoManifest.zones.dhakaEpz}
  fallback={photoManifest.placeholders.zone}
  alt="Zone"
/>
```

### Never Use Dark Background Images
Images should complement the light glassmorphism aesthetic. Avoid images with:
- Pure black backgrounds
- Heavy dark textures
- High contrast that clashes with white/light UI

## Shared Image Components

### SafeImage Component
Location: `/src/app/components/SafeImage.tsx`

Features:
- Automatic fallback on image load failure
- Development-time validation (detects /images/ path violations)
- Lazy loading support
- Tailwind className support

Props:
- src (required) - Image path from photoManifest
- alt (required) - Accessibility description
- fallback (required) - Fallback image path from photoManifest.placeholders
- className (optional) - Tailwind CSS classes
- loading (optional) - 'lazy' or 'eager' (default: lazy)

### ImageWithFallback Component
Location: `/src/app/components/figma/ImageWithFallback.tsx`

**⚠️ DEPRECATED - Legacy System Component**

This is a protected system component maintained for backwards compatibility only. The component resides in a legacy folder structure and should not be modified.

**For all new code, use SafeImage instead:**
```typescript
import SafeImage from '@/app/components/SafeImage';
```

SafeImage provides superior functionality with photoManifest integration, better error handling, and consistent placeholder behavior.

## Helper Functions

### getZoneImage
```typescript
import { getZoneImage } from '@/app/config/photoManifest';

const { src, fallback } = getZoneImage('dhaka-epz');
<SafeImage src={src} fallback={fallback} alt="Dhaka EPZ" />
```

### getSectorImage
```typescript
import { getSectorImage } from '@/app/config/photoManifest';

const { src, fallback } = getSectorImage('textile');
<SafeImage src={src} fallback={fallback} alt="Textile Sector" />
```

### getOfficerImage
```typescript
import { getOfficerImage } from '@/app/config/photoManifest';

const { src, fallback } = getOfficerImage('ahmed-khan');
<SafeImage src={src} fallback={fallback} alt="Officer" />
```

## Adding New Images

### Step 1: Place Image File
Add the image to the appropriate subdirectory:
```
/public/photos/sectors/sector-agriculture.jpg
```

### Step 2: Update photoManifest.ts
Edit `/src/app/config/photoManifest.ts`:
```typescript
export const sectors = {
  textile: '/photos/sectors/sector-textile.jpg',
  pharma: '/photos/sectors/sector-pharma.jpg',
  agriculture: '/photos/sectors/sector-agriculture.jpg', // NEW
};
```

### Step 3: Use in Component
```typescript
import SafeImage from '@/app/components/SafeImage';
import { photoManifest } from '@/app/config/photoManifest';

<SafeImage
  src={photoManifest.sectors.agriculture}
  fallback={photoManifest.placeholders.sector}
  alt="Agriculture Sector"
  className="w-full h-64 object-cover rounded-lg"
/>
```

## Replacing Existing Images

To replace an image without touching code:

1. Find the image key in photoManifest (e.g., zones.dhakaEpz)
2. Find the corresponding file path (e.g., /photos/zones/zone-dhaka-epz.jpg)
3. Replace the file at that path with the new image
4. Keep the same filename
5. No code changes required - updates automatically everywhere

Example:
```bash
# Replace existing file
cp new-dhaka-epz-photo.jpg /public/photos/zones/zone-dhaka-epz.jpg

# Image updates throughout entire application
```

## Naming Conventions

### File Naming
Format: `{category}-{identifier}.{ext}`

Examples:
- zone-dhaka-epz.jpg
- sector-textile.jpg
- officer-ahmed-khan.jpg
- bank-brac.png

### Manifest Key Naming
Format: camelCase

Examples:
- dhakaEpz (not dhaka-epz)
- textile (not Textile)
- ahmedKhan (not ahmed_khan)

## Troubleshooting

### Image Not Displaying
1. Verify file exists at /public/photos/[category]/[filename]
2. Check photoManifest.ts has correct path
3. Check spelling of manifest key
4. Verify fallback prop is provided
5. Open browser DevTools Network tab to check if file is 404

### Fallback Always Showing
1. Check actual image file exists
2. Verify file permissions
3. Test direct URL in browser: http://localhost:5173/photos/zones/zone-dhaka-epz.jpg
4. Check image file is not corrupted

### Console Warning About /images/
This means a component is using hardcoded /images/ path instead of photoManifest. Fix by:
1. Import photoManifest
2. Replace hardcoded path with manifest key
3. Use SafeImage instead of img tag

### TypeScript Error on Manifest Key
1. Check key exists in photoManifest
2. Verify correct category (zones vs sectors vs officers)
3. Use TypeScript autocomplete to find available keys