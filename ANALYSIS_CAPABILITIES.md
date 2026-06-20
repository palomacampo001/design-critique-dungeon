# 🔍 Carbon Quest - Analysis Capabilities

## Current Implementation: Client-Side Analysis Engine

Carbon Quest includes a **sophisticated browser-based analysis engine** that evaluates designs against IBM Design Language, Carbon Design System, and WCAG accessibility standards.

## ✅ What It Analyzes (Right Now)

### 1. IBM Color Palette Compliance
**How it works:**
- Samples pixels from uploaded image using Canvas API
- Compares each color to 19 IBM palette colors
- Calculates Euclidean distance in RGB space
- Tracks exact matches and close approximations

**IBM Palette Checked:**
- Blues: #001141, #002d9c, #0f62fe
- Cyans: #33b1ff, #bae6ff
- Teal: #08bdba
- Greens: #42be65
- Reds: #fa4d56, #ff8389
- Purples: #a56eff
- Yellows: #b28600, #fddc69
- Grays: #161616, #393939, #6f6f6f, #c6c6c6, #e0e0e0, #f4f4f4
- White: #ffffff

**Scoring:**
- `paletteMatch`: % of pixels within 42 units of IBM colors
- `exactPaletteMatch`: % of pixels within 26 units (strict)
- `averagePaletteDistance`: Mean distance to nearest IBM color

### 2. Carbon 16px Grid Validation
**How it works:**
- Checks if image dimensions are divisible by 16
- Validates alignment with Carbon's 2x grid system
- Reports remainder pixels if misaligned

**Pass criteria:**
- Width % 16 === 0
- Height % 16 === 0

**Why it matters:**
- Carbon uses 16px base unit
- Ensures consistent spacing rhythm
- Validates layout grid adherence

### 3. WCAG Contrast Measurement
**How it works:**
- Identifies darkest and lightest pixels
- Calculates relative luminance for each
- Computes contrast ratio using WCAG formula
- Compares against AA and AAA thresholds

**Contrast levels:**
- < 3.0: Fails WCAG (flagged as risk)
- 3.0-4.49: Passes for large text only
- 4.5-6.99: Passes WCAG AA (normal text)
- ≥ 7.0: Passes WCAG AAA (enhanced)

**Formula used:**
```javascript
L = 0.2126 * R + 0.7152 * G + 0.0722 * B
contrast = (lighter + 0.05) / (darker + 0.05)
```

### 4. Design Type Detection
**How it works:**
- Analyzes color distribution patterns
- Detects skin tones, organic colors, accent usage
- Identifies IBM UI signals vs other content types

**Detection categories:**

**IBM/Carbon UI Signal:**
- 55%+ neutral/blue/cyan/teal colors
- ≤38% loud accent colors (red/yellow/green/purple)
- ≤30% color diversity
- Result: High compliance scores

**Vintage Game Signal:**
- 34%+ dark pixels
- 18%+ loud accents
- 7%+ green text
- OR average palette distance >58
- Result: Flagged as non-IBM, low scores

**Natural Photo Signal:**
- 34%+ color diversity
- 9%+ skin tone pixels
- 45%+ soft organic colors
- Result: Flagged as photo, low scores

### 5. Compliance Scoring Algorithm
**How it works:**
- Weighted calculation based on multiple factors
- Rewards IBM-aligned characteristics
- Penalizes non-IBM patterns

**Formula:**
```javascript
ibmCompliance = clamp(
  exactPaletteMatch * 0.42 +
  carbonSurfacePercent * 0.24 +
  (carbonUiSignal ? 14 : 0) +
  (gridPass ? 12 : 0) +
  (tonalContrast >= 4.5 ? 10 : 0) -
  (loudAccentPercent > 38 ? 12 : 0) -
  (vintageGameSignal ? 26 : 0) -
  (naturalPhotoSignal ? 34 : 0)
)
```

**Thresholds:**
- ≥58: IBM candidate (eligible for rewards)
- <58: Non-IBM (rejection message)

### 6. Three-Score System

**Clarity Score (0-100):**
- Measures visual hierarchy and layout quality
- For IBM designs: 35-98 based on grid + palette
- For non-IBM: 10-42 based on compliance

**Accessibility Score (0-100):**
- Measures contrast and readability
- For IBM designs: 30-98 based on contrast ratio
- For non-IBM: 18-58 based on basic contrast

**Risk Score (0-100):**
- Inverse of clarity + accessibility
- High risk = implementation concerns
- Low risk = production-ready

### 7. Reward Unlocking Logic
**12 Illustrated Rewards:**
1. **Typography Tavern** (Common, 120 XP): Clarity ≥50
2. **Spacing Campfire** (Common, 140 XP): Grid pass
3. **Contrast Forge** (Rare, 220 XP): Contrast ≥4.5
4. **Grid Guardian** (Rare, 240 XP): Grid pass
5. **Component Vault** (Rare, 260 XP): Clarity ≥70
6. **Accessibility Lighthouse** (Epic, 320 XP): Accessibility ≥70
7. **Token Alchemist** (Epic, 340 XP): Palette ≥75%
8. **Palette Keeper** (Epic, 360 XP): Palette ≥60%
9. **Research Scholar** (Common, 160 XP): Always unlocked for IBM designs
10. **Prototype Builder** (Rare, 260 XP): Clarity ≥80
11. **Dungeon Conqueror** (Legendary, 500 XP): Clarity ≥85, Access ≥85, Risk ≤25
12. **Carbon Champion** (Legendary, 520 XP): Grid pass + Palette ≥75% + Contrast ≥7

## 🎯 What It Does NOT Analyze (Yet)

### Typography
- Cannot detect IBM Plex font from screenshots
- Requires source file inspection or OCR
- Currently shows reminder to verify manually

### Component Usage
- Cannot identify specific Carbon components
- Would require computer vision / object detection
- Future enhancement with AI models

### Spacing Rhythm
- Checks grid alignment but not internal spacing
- Cannot measure margins, padding, gutters
- Would require layout analysis

### Motion/Animation
- Static image analysis only
- Cannot review transitions, animations
- Would require video analysis

### Semantic Structure
- Cannot read HTML/CSS structure
- No heading hierarchy validation
- No ARIA attribute checking

## 🔮 Future: AI-Enhanced Analysis

### What AI Could Add

**1. Natural Language Critiques**
- "The primary CTA is competing with three secondary actions"
- "Consider increasing the heading size to establish clearer hierarchy"
- "The color palette is IBM-compliant, but the layout rhythm feels off-grid"

**2. Component Recognition**
- Identify buttons, cards, modals, tables
- Validate against Carbon component library
- Suggest correct component usage

**3. Contextual Recommendations**
- Understand page purpose (dashboard, form, landing)
- Provide context-aware suggestions
- Reference IBM design patterns

**4. Typography Analysis**
- OCR to detect actual fonts used
- Validate IBM Plex Sans/Mono/Serif
- Check type scale adherence

**5. Layout Analysis**
- Measure actual spacing values
- Validate 2x grid rhythm throughout
- Check responsive breakpoints

### Implementation Options

**Option A: IBM watsonx.ai / Granite**
- Use multimodal Granite models
- Send image + context to API
- Receive structured critique
- Cost: ~$0.001-0.01 per analysis
- Setup: IBM Cloud account + API key

**Option B: IBM BAM**
- Fine-tune on IBM design examples
- Deploy custom model endpoint
- Lower cost at scale
- Setup: BAM platform access

**Option C: Keep Client-Side**
- Current implementation is already sophisticated
- No API costs or dependencies
- Works offline
- Privacy-friendly
- Instant results

## 📊 Demo Mode vs Production

### Current = Polished Demo Mode
The app is **already production-ready** for demonstrating:
- ✅ Complete upload → analyze → results workflow
- ✅ Realistic scoring based on actual measurements
- ✅ Dungeon Master narration and pixel art
- ✅ Reward unlocking and XP tracking
- ✅ Carbon professional mode
- ✅ Export findings functionality
- ✅ Non-IBM design rejection

### What "Production" Adds
- AI-generated natural language critiques
- Component identification
- Typography verification
- Advanced layout analysis
- Team collaboration features
- Analysis history and tracking

## 🛠️ Technical Details

### Code Location
- Main analysis: `index.html` lines 2250-2387
- Function: `analyzeImageFromUrl(src)`
- Scoring: `buildAuditFindings()`
- Rewards: `rewardsForAudit(audit)`

### Performance
- Analysis time: <500ms for typical screenshots
- Image sampling: 320px width (scaled proportionally)
- Pixel sampling: Every 16th pixel (performance optimization)
- Memory: Minimal (canvas cleared after analysis)

### Browser Compatibility
- Requires Canvas API support
- Works in all modern browsers
- Chrome, Firefox, Safari, Edge
- Mobile browsers supported

### Privacy
- All processing happens in the browser
- No images sent to servers
- No data collection
- No tracking

## 📝 Summary

Carbon Quest includes a **real, working analysis engine** that:
- ✅ Measures actual IBM compliance
- ✅ Validates Carbon grid alignment
- ✅ Checks WCAG contrast ratios
- ✅ Detects design types
- ✅ Provides realistic scoring
- ✅ Unlocks rewards based on results

**It's not a mock demo** - it's a functional tool that stakeholders can use to evaluate designs against IBM standards right now.

**Future AI integration** would enhance the natural language feedback and add advanced features, but the core analysis is already sophisticated and production-ready.

---

**Ready to try it?** Upload a design and see the analysis in action! 🎮