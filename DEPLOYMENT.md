# Carbon Quest - Deployment Guide

## 🎮 Live Demo
The app is deployed at: **https://palomacampo001.github.io/design-critique-dungeon/**

## 📋 Current Status

### ✅ Working Features (Client-Side Analysis)
The app currently runs **100% in the browser** with sophisticated client-side analysis:

1. **Image Analysis Engine**
   - Canvas-based pixel sampling
   - IBM color palette proximity detection
   - Carbon 16px grid alignment validation
   - WCAG contrast ratio measurement
   - IBM vs non-IBM design detection

2. **Scoring System**
   - Clarity score (hierarchy, layout quality)
   - Accessibility score (contrast, readability)
   - Risk score (implementation concerns)

3. **Reward System**
   - 12 illustrated pixel-art rewards
   - Unlocked based on analysis results
   - XP tracking and progression

4. **Dual Themes**
   - Dungeon Mode: Retro RPG aesthetic
   - Carbon Mode: Professional IBM design

### 🔧 Analysis Logic
Located in `index.html` lines 2250-2387:
- `analyzeImageFromUrl()`: Main analysis function
- Checks: grid alignment, palette match, contrast, color diversity
- Detects: IBM UI signals, vintage game graphics, natural photos
- Calculates: compliance scores, clarity, accessibility, risk

## 🚀 Deploy to GitHub Pages

### Step 1: Commit Changes
```bash
git add .
git commit -m "Deploy Carbon Quest with client-side analysis"
git push origin main
```

### Step 2: Enable GitHub Pages
1. Go to: https://github.com/palomacampo001/design-critique-dungeon/settings/pages
2. Under "Source", select: **Deploy from a branch**
3. Select branch: **main**
4. Select folder: **/ (root)**
5. Click **Save**

### Step 3: Wait for Deployment
- GitHub will build and deploy automatically (1-2 minutes)
- Check deployment status at: https://github.com/palomacampo001/design-critique-dungeon/deployments

### Step 4: Access Your App
Your app will be live at:
```
https://palomacampo001.github.io/design-critique-dungeon/
```

## 📱 Usage

### For Stakeholders
1. Open the live URL
2. Upload a design screenshot (PNG, JPG, etc.)
3. Click "Submit for Analysis" (Dungeon) or "Analyze" (Carbon)
4. View results:
   - Dungeon Master narration
   - HP/XP/Risk meters
   - Unlocked rewards
   - Carbon findings and export

### Test Images
Try uploading:
- ✅ IBM Carbon UI screenshots (high scores)
- ✅ IBM.com pages (good compliance)
- ❌ Non-IBM designs (rejection/low scores)
- ❌ Photos or game graphics (detected and flagged)

## 🔮 Future: Real AI Analysis

### Option 1: IBM watsonx.ai / Granite Models
**What it would add:**
- Natural language critique generation
- Semantic understanding of UI patterns
- Context-aware recommendations
- Multi-modal analysis (text + visual)

**Setup:**
1. Get IBM Cloud account
2. Create watsonx.ai instance
3. Get API key and project ID
4. Add environment variables:
   ```bash
   WATSONX_API_KEY=your_key
   WATSONX_PROJECT_ID=your_project
   ```
5. Update analysis function to call watsonx API
6. Keep client-side analysis as fallback

**Cost:** Pay-as-you-go, ~$0.001-0.01 per analysis

### Option 2: IBM BAM (Build a Model)
**What it would add:**
- Custom fine-tuned models
- IBM design-specific training
- Faster inference
- Lower cost at scale

**Setup:**
1. Access IBM BAM platform
2. Fine-tune on IBM design examples
3. Deploy model endpoint
4. Update app to call BAM API

### Option 3: Keep Client-Side (Current)
**Advantages:**
- ✅ No API costs
- ✅ Works offline
- ✅ Instant results
- ✅ Privacy-friendly (no data sent)
- ✅ Already sophisticated

**Current Analysis Checks:**
- IBM color palette (19 colors, distance matching)
- Carbon 16px grid (dimension validation)
- WCAG contrast (luminance calculation)
- Design type detection (UI vs photo vs game)
- Compliance scoring (weighted algorithm)

## 📊 Demo Mode vs Production

### Current Implementation = Demo Mode
The app is **already a working demo** with realistic analysis:
- Real pixel sampling
- Real color distance calculations
- Real contrast measurements
- Real grid validation
- Realistic scoring algorithms

### What "Production" Would Add
1. **AI-Generated Critiques**
   - Natural language explanations
   - Contextual recommendations
   - Design pattern recognition

2. **Advanced Checks**
   - Component identification
   - Typography verification (requires font metadata)
   - Spacing rhythm analysis
   - Motion/animation review (requires video)

3. **Team Features**
   - Save analysis history
   - Share findings
   - Track improvements
   - Team dashboards

## 🛠️ Local Development

### Run Locally
```bash
# Option 1: Python
python3 -m http.server 4173

# Option 2: Node.js (if installed)
npx serve -p 4173

# Option 3: Direct file
# Open index.html in browser (some features may be limited)
```

Then open: http://127.0.0.1:4173/index.html

### File Structure
```
design-critique-dungeon/
├── index.html              # Main app (2,830 lines, all-in-one)
├── package.json            # Static hosting scripts
├── BOB_README.md          # Technical documentation
├── DEPLOYMENT.md          # This file
└── config/
    └── static-hosting-notes.json
```

## 🎯 Key Points for Stakeholders

1. **It Works Now**: Upload and analyze designs immediately
2. **No Setup Required**: Pure client-side, no API keys needed
3. **Real Analysis**: Actual pixel sampling and IBM compliance checks
4. **Dual Experience**: Switch between Dungeon and Carbon themes
5. **Reward System**: Gamified feedback with unlockable achievements
6. **Export Ready**: Download findings as text file

## 📝 Notes

- The app is intentionally a single HTML file for easy deployment
- All CSS and JavaScript are inline (no build step required)
- Pixel art graphics are generated with CSS
- Analysis runs in the browser using Canvas API
- No external dependencies or frameworks
- Works on desktop and mobile (responsive)

## 🔗 Links

- **Repository**: https://github.com/palomacampo001/design-critique-dungeon
- **Live App**: https://palomacampo001.github.io/design-critique-dungeon/
- **Issues**: https://github.com/palomacampo001/design-critique-dungeon/issues

---

**Ready to deploy?** Follow the steps above to make it live! 🚀