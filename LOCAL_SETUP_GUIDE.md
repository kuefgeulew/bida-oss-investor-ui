# LOCAL SETUP GUIDE — ZERO-ASSUMPTION INSTRUCTIONS

**Target Audience:** Developers, evaluators, demo presenters  
**Prerequisites:** Node.js 18+, npm/pnpm, modern browser  
**Environment:** Local development only (no production deployment)

---

## STEP 1: VERIFY PREREQUISITES

### Check Node.js Version
```bash
node --version
```
**Required:** v18.0.0 or higher  
**Recommended:** v20.x or v22.x

**If not installed:**
- Download from https://nodejs.org/
- Or use nvm: `nvm install 20 && nvm use 20`

### Check Package Manager
```bash
npm --version
```
**Required:** npm 9.0.0 or higher (comes with Node.js)

**Alternative (optional):**
```bash
pnpm --version
```
If using pnpm: v8.0.0+ required

---

## STEP 2: CLONE OR EXTRACT PROJECT

### Option A: If from Git Repository
```bash
git clone <repository-url>
cd <project-folder>
```

### Option B: If from ZIP Archive
1. Extract ZIP to a folder (e.g., `bida-oss/`)
2. Open terminal in that folder

### Verify Project Structure
```bash
ls -la
```
**Expected files/folders:**
```
package.json
vite.config.ts
tsconfig.json
src/
  ├── app/
  ├── styles/
  ├── main.tsx
  └── ...
```

---

## STEP 3: INSTALL DEPENDENCIES

### Using npm (Default)
```bash
npm install
```
**Expected output:** Installing 200+ packages (React, TypeScript, Vite, etc.)  
**Duration:** 2-5 minutes depending on internet speed

### Using pnpm (Alternative)
```bash
pnpm install
```
**Duration:** 1-3 minutes (faster than npm)

### Troubleshooting Installation
**Problem:** `EACCES` permission error  
**Solution:** 
```bash
sudo chown -R $USER ~/.npm
npm install
```

**Problem:** `ERESOLVE` dependency conflict  
**Solution:** 
```bash
npm install --legacy-peer-deps
```

**Problem:** Network timeout  
**Solution:** 
```bash
npm config set registry https://registry.npmjs.org/
npm install
```

---

## STEP 4: VERIFY INSTALLATION

### Check node_modules
```bash
ls node_modules/ | wc -l
```
**Expected:** 200+ folders (installed packages)

### Check package-lock.json
```bash
ls -lh package-lock.json
```
**Expected:** File exists (proves installation completed)

---

## STEP 5: START DEVELOPMENT SERVER

### Start Vite Dev Server
```bash
npm run dev
```
**Expected output:**
```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Alternative Start Command
```bash
npm start
```
(If `npm start` is aliased in package.json)

### Open in Browser
**Automatic:** Some terminals auto-open browser  
**Manual:** Navigate to http://localhost:5173/

---

## STEP 6: LOGIN TO SYSTEM

### Default Landing Page
**URL:** http://localhost:5173/  
**Expected:** Login screen appears

### Demo Investor Credentials
```
Email: demo@investor.bd
Password: demo123
```

**What happens after login:**
- System detects demo investor (`INV-DEMO-001`)
- Skips starter wizard (profile already exists)
- Loads dashboard with 22 tabs
- Bank readiness strip visible at top

### Other Role Credentials (Optional)
**Officer:**
```
Email: officer@bida.gov.bd
Password: officer123
```

**Admin:**
```
Email: admin@bida.gov.bd
Password: admin123
```

---

## STEP 7: VERIFY SYSTEM WORKS

### Test 1: Tab Navigation
- Click "DISCOVER" tab (second in Row 1)
- Page should switch without reload
- URL stays `localhost:5173` (no route change)

### Test 2: Bank Selector
- Click bank dropdown (top of page)
- Select "HSBC Bangladesh"
- Watch readiness indicators update

### Test 3: Language Switching
- Click language selector (top-right, globe icon)
- Select "中文 (Chinese)"
- Navigate to "OVERVIEW" tab
- Text should translate to Chinese
- Numbers should become Chinese characters

### Test 4: AI Concierge
- Click "AI Concierge" in Overview tab (or floating button)
- Type: "What documents do I need?"
- AI should respond with structured answer

### Test 5: Interactive Map
- Click "ZONES" tab (fifth in Row 1)
- Interactive GIS map should load
- Click on a zone → details panel appears

**If all 5 tests pass:** System is working correctly ✅

---

## STEP 8: TROUBLESHOOTING

### Problem: Blank White Screen
**Possible Causes:**
1. JavaScript error (check browser console)
2. Missing dependencies
3. Port conflict

**Solution:**
```bash
# Stop server (Ctrl+C)
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Problem: "Cannot find module" Error
**Solution:**
```bash
npm install <missing-module-name>
npm run dev
```

### Problem: Port 5173 Already in Use
**Solution:**
```bash
# Kill existing process
lsof -ti:5173 | xargs kill -9
# Or use different port
npm run dev -- --port 3000
```

### Problem: Slow Performance
**Possible Causes:**
1. Too many browser tabs open
2. Low RAM (<8GB)
3. Running on old hardware

**Solution:**
- Close other applications
- Use Chrome (faster React DevTools)
- Disable browser extensions temporarily

### Problem: Map Not Loading (ZONES tab)
**Expected Behavior:** Maps work offline (no API key required)  
**If broken:** Check browser console for errors

**Solution:**
```bash
# Reinstall map libraries
npm install maplibre-gl leaflet
npm run dev
```

### Problem: Styles Look Broken
**Possible Cause:** Tailwind CSS not compiling

**Solution:**
```bash
# Check if Tailwind is installed
npm list tailwindcss
# Should show: tailwindcss@4.x.x

# If missing:
npm install tailwindcss@next
npm run dev
```

---

## STEP 9: DEVELOPMENT WORKFLOW

### File Structure (Where to Find Things)
```
src/
├── app/
│   ├── components/
│   │   ├── InvestorDashboard_OPTIMIZED.tsx  ← Main dashboard
│   │   ├── InvestorPortal.tsx                ← Entry wrapper
│   │   └── ...                                ← 100+ components
│   ├── intelligence/
│   │   ├── investorEngine.ts                  ← Data engine
│   │   └── NotificationEngine.ts              ← Alert system
│   ├── bbid/
│   │   └── bbidEngine.ts                      ← BBID registry
│   ├── gov-agencies/
│   │   └── agencyWorkflowEngine.ts            ← Approval pipeline
│   └── ...
├── styles/
│   ├── theme.css                              ← Tailwind config
│   └── fonts.css                              ← Font imports
└── main.tsx                                   ← React entry point
```

### Hot Module Replacement (HMR)
- Edit any `.tsx` file
- Save (Ctrl+S / Cmd+S)
- Browser updates instantly (no manual refresh)

### Code Changes Take Effect Immediately
**Example:**
1. Open `src/app/components/InvestorDashboard_OPTIMIZED.tsx`
2. Change line 2334: `<h2 className="text-3xl mb-2">` → `<h2 className="text-4xl mb-2">`
3. Save file
4. Browser updates header size instantly

### Inspecting State
**Using React DevTools:**
1. Install React DevTools extension
2. Open browser DevTools (F12)
3. Go to "Components" tab
4. Select `<InvestorDashboard>` component
5. View all state variables (activeTab, notifications, etc.)

---

## STEP 10: STOPPING THE SERVER

### Graceful Shutdown
```bash
# In terminal running npm run dev:
Ctrl+C  (or Cmd+C on Mac)
```

### Verify Server Stopped
```bash
lsof -ti:5173
```
**Expected:** No output (port is free)

---

## ADVANCED: BUILDING FOR PRODUCTION (Not Recommended)

### Why Not Recommended?
- System uses mock data (no real backend)
- Not configured for static hosting
- Environment variables not set

### If You Must Build Anyway:
```bash
npm run build
```
**Output:** `dist/` folder with static files

### Preview Production Build:
```bash
npm run preview
```
**URL:** http://localhost:4173/

---

## SYSTEM REQUIREMENTS

### Minimum
- **CPU:** Dual-core 2.0GHz
- **RAM:** 4GB
- **Disk:** 500MB free space
- **OS:** Windows 10, macOS 10.15, Ubuntu 20.04
- **Browser:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Recommended
- **CPU:** Quad-core 2.5GHz+
- **RAM:** 8GB+
- **Disk:** 1GB free space (for node_modules)
- **OS:** Latest version
- **Browser:** Chrome 110+ (best React DevTools support)

---

## NO FIGMA DEPENDENCY

### Important Note
- **This project does NOT require Figma**
- **This project does NOT require Figma API keys**
- All assets are embedded in code or use public URLs

### Why No Figma?
- Original design may have used Figma
- Final code is self-contained
- Images use:
  - `unsplash_tool` (public API, no key needed)
  - Inline SVGs
  - Data URIs
  - No external asset loading

---

## ENVIRONMENT VARIABLES

### Current State: None Required
```bash
# No .env file needed
# No API keys required
# No configuration step
```

### Why No .env?
- Mock data only (no database connection)
- Maps use MapLibre (free, no token)
- Unsplash uses public endpoint (no auth)

### If You See .env.example:
**Ignore it.** File may exist from boilerplate but is not used.

---

## COMMON QUESTIONS

### Q: Do I need a database?
**A:** No. System uses client-side engines (TypeScript files as data stores).

### Q: Do I need to configure Tailwind?
**A:** No. Using Tailwind CSS v4 (config-free, uses `@theme` in CSS).

### Q: Do I need to set up authentication?
**A:** No. Use pre-seeded demo credentials (demo@investor.bd / demo123).

### Q: Can I use this in production?
**A:** No. This is a demo/prototype. No backend, no security, no data persistence.

### Q: Can I deploy to Vercel/Netlify?
**A:** Technically yes, but not recommended. System expects local dev environment.

### Q: How do I reset demo data?
**A:** Refresh browser (F5). All data regenerates from engines.

### Q: Can I add new investors?
**A:** No. System is single-user demo (INV-DEMO-001 only).

---

## SUPPORT

### If Setup Fails
1. Check Node.js version: `node --version` (must be 18+)
2. Delete and reinstall: `rm -rf node_modules && npm install`
3. Try different terminal (Command Prompt vs PowerShell vs Bash)
4. Disable antivirus temporarily (may block npm)
5. Check firewall settings (may block port 5173)

### Console Errors
**Open browser DevTools:**
- Chrome/Edge: F12 or Ctrl+Shift+I
- Firefox: F12 or Ctrl+Shift+K
- Safari: Cmd+Option+I

**Look for:**
- Red errors in Console tab
- Failed network requests in Network tab
- React warnings in Components tab (if DevTools installed)

### Known Issues
1. **HMR fails after 50+ edits:** Restart dev server (Ctrl+C, then `npm run dev`)
2. **Memory leak after 2+ hours:** Restart browser
3. **Tailwind classes not applying:** Check `src/styles/theme.css` loaded

---

**Last Updated:** 2026-02-14  
**Tested On:**
- macOS 14 (Sonoma) + Chrome 120
- Windows 11 + Edge 120
- Ubuntu 22.04 + Firefox 121  
**Setup Time:** 5-10 minutes (assuming npm install completes without errors)
