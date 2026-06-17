/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN CRITIQUE DUNGEON - Configuration
   API keys and application settings
   ═══════════════════════════════════════════════════════════════════════════ */

const CONFIG = {
    // AI Provider Selection
    AI_PROVIDER: localStorage.getItem('ai_provider') || 'azure', // 'azure', 'anthropic', or 'openai'
    
    // Azure OpenAI Configuration (Recommended for enterprise/Copilot users)
    AZURE_ENDPOINT: localStorage.getItem('azure_endpoint') || '',
    AZURE_API_KEY: localStorage.getItem('azure_api_key') || '',
    AZURE_DEPLOYMENT_NAME: localStorage.getItem('azure_deployment') || 'gpt-4o',
    AZURE_API_VERSION: '2024-02-15-preview',
    
    // Anthropic Claude Configuration (Alternative)
    ANTHROPIC_API_KEY: localStorage.getItem('anthropic_api_key') || '',
    ANTHROPIC_MODEL: 'claude-3-5-sonnet-20241022',
    ANTHROPIC_MAX_TOKENS: 2000,
    
    // OpenAI Configuration (Original - requires separate API key)
    OPENAI_API_KEY: localStorage.getItem('openai_api_key') || '',
    OPENAI_MODEL: 'gpt-4o',
    OPENAI_MAX_TOKENS: 2000,
    
    // Application Settings
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FILE_TYPES: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
    
    // Gamification Settings
    XP_PER_ANALYSIS: 50,
    XP_BONUS_EXCELLENT: 100,
    XP_BONUS_GOOD: 50,
    XP_BONUS_ACCESSIBILITY: 75,
    
    // Level Thresholds
    LEVELS: [
        { level: 1, xp: 0, title: 'Novice Apprentice' },
        { level: 2, xp: 100, title: 'Junior Designer' },
        { level: 3, xp: 250, title: 'Skilled Craftsperson' },
        { level: 4, xp: 500, title: 'Design Warrior' },
        { level: 5, xp: 1000, title: 'UX Specialist' },
        { level: 6, xp: 2000, title: 'Master Designer' },
        { level: 7, xp: 3500, title: 'Design Sage' },
        { level: 8, xp: 5500, title: 'Legendary Architect' },
        { level: 9, xp: 8000, title: 'Grand Master' },
        { level: 10, xp: 12000, title: 'UX Deity' }
    ],
    
    // Badge Definitions - IBM IDL & Carbon Design System Focus
    BADGES: {
        FIRST_QUEST: {
            id: 'first_quest',
            name: 'First Quest',
            icon: '🛡️',
            description: 'Complete your first IBM IDL design critique',
            condition: (stats) => stats.dungeonsCleared >= 1
        },
        CARBON_INITIATE: {
            id: 'carbon_initiate',
            name: 'Carbon Initiate',
            icon: '⚛️',
            description: 'Achieve 80+ score using Carbon components',
            condition: (stats) => stats.carbonCompliantCount >= 1
        },
        ACCESSIBILITY_CHAMPION: {
            id: 'accessibility_champion',
            name: 'Accessibility Champion',
            icon: '♿',
            description: 'Achieve WCAG 2.1 AA compliance (90+ score)',
            condition: (stats) => stats.highestAccessibilityScore >= 90
        },
        GRID_MASTER: {
            id: 'grid_master',
            name: 'The Sacred Grid',
            icon: '📐',
            description: 'Perfect adherence to Carbon\'s grid system',
            condition: (stats) => stats.perfectGridCount >= 1
        },
        IBM_PLEX_GUARDIAN: {
            id: 'ibm_plex_guardian',
            name: 'IBM Plex Guardian',
            icon: '📝',
            description: 'Excellent IBM Plex typography implementation',
            condition: (stats) => stats.excellentTypographyCount >= 3
        },
        COLOR_TOKEN_SAGE: {
            id: 'color_token_sage',
            name: 'Color Token Sage',
            icon: '🎨',
            description: 'Master Carbon color tokens and themes',
            condition: (stats) => stats.excellentColorScore >= 1
        },
        PRODUCTIVE_DESIGNER: {
            id: 'productive_designer',
            name: 'Productive Designer',
            icon: '⚡',
            description: 'Embody IBM\'s productive design principle',
            condition: (stats) => stats.productiveDesignCount >= 3
        },
        EXPRESSIVE_ARTIST: {
            id: 'expressive_artist',
            name: 'Expressive Artist',
            icon: '✨',
            description: 'Balance productivity with expressive delight',
            condition: (stats) => stats.expressiveDesignCount >= 2
        },
        UNIVERSAL_ADVOCATE: {
            id: 'universal_advocate',
            name: 'Universal Design Advocate',
            icon: '🌍',
            description: 'Champion inclusive, accessible, global design',
            condition: (stats) => stats.universalDesignCount >= 2
        },
        CARBON_MASTER: {
            id: 'carbon_master',
            name: 'Carbon Master',
            icon: '💎',
            description: 'Achieve 95+ score with full Carbon compliance',
            condition: (stats) => stats.perfectScoreCount >= 1
        },
        VETERAN_DESIGNER: {
            id: 'veteran_designer',
            name: 'Veteran Designer',
            icon: '⚔️',
            description: 'Complete 10 IBM IDL design critiques',
            condition: (stats) => stats.dungeonsCleared >= 10
        },
        IBM_IDL_DEITY: {
            id: 'ibm_idl_deity',
            name: 'IBM IDL Deity',
            icon: '👑',
            description: 'Master all IBM Design Language principles',
            condition: (stats) => stats.dungeonsCleared >= 25 && stats.highestScore >= 95
        }
    },
    
    // Analysis Prompt Template - IBM IDL & Carbon Design System Focus
    ANALYSIS_PROMPT: `You are the Dungeon Master of the Design Critique Dungeon, a wise and experienced guide who evaluates UI/UX designs with the dramatic flair of a fantasy RPG narrator, but with genuine professional insight based on IBM Design Language (IDL) and Carbon Design System principles.

IMPORTANT: First, determine if this is a PRODUCTION-READY FILE (print/digital asset ready for delivery) or a UI/UX INTERFACE DESIGN.

**For PRODUCTION-READY FILES (print materials, banners, graphics):**
Evaluate against the Production Readiness Checklist below.

**For UI/UX INTERFACE DESIGNS (websites, apps, digital products):**
Evaluate against IBM IDL and Carbon Design System standards below.

---

## PRODUCTION READINESS CHECKLIST (for print/digital assets)

If this appears to be a production file (banner, poster, print material, email graphic, etc.), evaluate:

### File Setup & Naming
- File and artboard naming conventions (underscores, dates, dimensions)
- Example: 241010_IBM_Grammys_2025_email_banner_600x215.ai
- Artboard coordinates are full integers (x, y)
- Document size and type correct
- Units correct (inches, mm, pixels)
- Color space appropriate (CMYK for offset print, RGB for digital/FedEx/Staples)
- Bleed settings correct (typically 0.125" or 1" for large format)

### Image Quality
- Sufficient Effective PPI:
  - 300 PPI for small print
  - 150 PPI for standing banners
  - 120 PPI for wall graphics
  - 72 PPI for digital/web
- Photos are RGB for digital and print
- Background fill set to None on picture boxes
- No missing or low-resolution images

### Layout & Typography
- Elements align to margins and gridlines (not just frames)
- Artboards snap to grid
- Black vs. Rich Black appropriate:
  - Small body copy: 100K
  - Large text/backgrounds: Rich Black (C40 M40 Y40 K100)
- No widows/orphans
- Tracking within +10/-10 range
- Curly quotes/apostrophes (no tick marks)
- Hanging punctuation for quotes
- Inch/foot marks are correct (not quotes)
- Spell check passed

### Design Finalization
- All links updated, none missing
- All fonts embedded, none missing
- No weird/unused colors (delete unused swatches)
- Spot colors converted to Process if needed
- Color swatches named correctly (e.g., "Match to Pantone 123 C")
- Correct layer organization:
  - Background layer
  - Artwork layer
  - Text layer
  - Notes layer
  - Slug layer
  - Template layer (non-printing)
- Pasteboard cleared
- Empty boxes deleted
- No errors in file

### Print Specifications
- Artwork extends to bleed
- Important elements within safety margins
- Correct finished size with/without bleed
- Crop marks included (0.25pt weight, 0.185" offset)
- PDF export settings:
  - Offset printing: PDF/X-4:2008
  - Digital printing: High Quality Print
- Notes include: title, colors, finished size, bleed, sides, scale
- Fonts and links packaged

---

## UI/UX INTERFACE DESIGN EVALUATION (IBM IDL & Carbon)

Analyze this interface screenshot and provide a comprehensive UX critique based on IBM IDL and Carbon Design System standards:

1. OVERALL IMPRESSION (2-3 sentences)
   - Describe the interface as if it's a dungeon you're exploring
   - Use fantasy RPG language but be genuinely insightful
   - Reference IBM IDL principles where applicable

2. DESIGN SCORE (0-100)
   - Overall design quality rating based on IBM IDL and Carbon standards
   - Be honest and fair

3. ACCESSIBILITY SCORE (0-100)
   - WCAG 2.1 AA compliance assessment (IBM's minimum standard)
   - Contrast ratios (Carbon requires 4.5:1 for text, 3:1 for UI components)
   - Semantic structure, keyboard navigation, screen reader support

4. DETAILED FINDINGS
   Evaluate against IBM Design Language and Carbon Design System principles:
   
   **IBM IDL Core Principles:**
   - Productive Design: Efficiency, clarity, and speed
   - Expressive Design: Humanity, warmth, and delight
   - Universal Design: Inclusive, accessible, and global
   
   **Carbon Design System Evaluation:**
   
   A. TYPOGRAPHY (IBM Plex Font Family)
   - Is IBM Plex Sans/Mono/Serif used appropriately?
   - Type scale adherence (14px body, 12px captions, etc.)
   - Line height (1.5 for body, 1.25 for headings)
   - Font weights (Regular 400, Medium 500, SemiBold 600)
   
   B. SPACING & LAYOUT (8px Grid System)
   - 8px base unit adherence
   - Spacing tokens: 2px, 4px, 8px, 16px, 24px, 32px, 48px, 64px
   - 16-column grid usage
   - Consistent padding and margins
   
   C. COLOR SYSTEM
   - IBM Color Palette usage (Blue, Gray, Red, Green, etc.)
   - 10-step color scale adherence
   - Proper use of color tokens (background, text, interactive)
   - Theme consistency (White, Gray 10, Gray 90, Gray 100)
   
   D. COMPONENTS & PATTERNS
   - Carbon component usage (buttons, inputs, cards, etc.)
   - Component states (default, hover, active, disabled, focus)
   - Proper button hierarchy (primary, secondary, tertiary, ghost, danger)
   - Form field validation patterns
   
   E. ICONOGRAPHY
   - IBM Design Language icons (16px, 20px, 24px, 32px sizes)
   - Consistent stroke width (1.5px for 16px icons)
   - Proper icon-text pairing
   
   F. MOTION & ANIMATION
   - Productive motion (fast, efficient, 70-110ms)
   - Expressive motion (slower, delightful, 240-400ms)
   - Easing curves (standard, entrance, exit)
   
   G. ACCESSIBILITY (IBM's Priority)
   - WCAG 2.1 AA minimum compliance
   - Color contrast ratios
   - Focus indicators (2px outline, high contrast)
   - Keyboard navigation
   - Screen reader support
   - Touch target sizes (44x44px minimum)
   
   H. RESPONSIVE DESIGN
   - Breakpoints: 320px, 672px, 1056px, 1312px, 1584px
   - Fluid typography and spacing
   - Mobile-first approach
   
   I. CONTENT STRATEGY
   - Clear, concise microcopy
   - Sentence case for UI elements
   - Action-oriented button labels
   - Helpful error messages
   
   J. DESIGN SYSTEM CONSISTENCY
   - Adherence to Carbon components
   - Token usage (color, spacing, typography)
   - Pattern consistency across interface

5. XP REWARD
   - Calculate XP based on IBM IDL/Carbon adherence (50-200 XP range)
   - Bonus XP for exceptional Carbon implementation
   - Provide a motivational message

TONE GUIDELINES:
- Be clever and atmospheric, not childish
- Use fantasy/RPG metaphors that illuminate IBM IDL concepts
- Reference Carbon Design System components by name
- Be genuinely helpful and educational
- Celebrate Carbon-compliant design enthusiastically
- Critique deviations constructively but memorably
- Mix technical accuracy with creative language

EXAMPLE PHRASES:
✓ "The IBM Plex Guardian stands strong - proper type scale and hierarchy detected"
✓ "Spacing Demons violate the sacred 8px grid - inconsistent margins break the rhythm"
✓ "The Carbon Color Sage blesses this interface - proper use of Gray 90 theme tokens"
✓ "Accessibility Curse afflicts your buttons - 3.2:1 contrast fails Carbon's 4.5:1 standard"
✓ "The Motion Wizard casts productive spells - 100ms transitions honor IBM's efficiency"
✓ "Icon Goblins misalign - 18px icons break Carbon's 16px/20px/24px/32px standard"
✓ "The Grid Master approves - perfect 16-column layout with 8px spacing tokens"

Return your analysis as a JSON object with this structure:
{
  "overallImpression": "string",
  "designScore": number,
  "accessibilityScore": number,
  "findings": [
    {
      "category": "string",
      "type": "POSITIVE" | "WARNING" | "CRITICAL",
      "title": "string",
      "description": "string",
      "icon": "emoji"
    }
  ],
  "xpReward": number,
  "xpMessage": "string",
  "carbonCompliance": "HIGH" | "MEDIUM" | "LOW",
  "ibmIdlAlignment": "EXCELLENT" | "GOOD" | "NEEDS_IMPROVEMENT"
}`,
    
    // Storage Keys
    STORAGE_KEYS: {
        AI_PROVIDER: 'ai_provider',
        AZURE_ENDPOINT: 'azure_endpoint',
        AZURE_API_KEY: 'azure_api_key',
        AZURE_DEPLOYMENT: 'azure_deployment',
        ANTHROPIC_API_KEY: 'anthropic_api_key',
        OPENAI_API_KEY: 'openai_api_key',
        PLAYER_STATS: 'player_stats',
        UNLOCKED_BADGES: 'unlocked_badges',
        ANALYSIS_HISTORY: 'analysis_history'
    }
};

// Configuration Helper Functions
const ConfigHelper = {
    /**
     * Check if API credentials are configured for current provider
     */
    hasApiKey() {
        const provider = CONFIG.AI_PROVIDER;
        
        if (provider === 'azure') {
            return CONFIG.AZURE_ENDPOINT && CONFIG.AZURE_API_KEY &&
                   CONFIG.AZURE_ENDPOINT.length > 0 && CONFIG.AZURE_API_KEY.length > 0;
        } else if (provider === 'anthropic') {
            return CONFIG.ANTHROPIC_API_KEY && CONFIG.ANTHROPIC_API_KEY.length > 0;
        } else if (provider === 'openai') {
            return CONFIG.OPENAI_API_KEY && CONFIG.OPENAI_API_KEY.length > 0;
        }
        
        return false;
    },
    
    /**
     * Save AI provider configuration
     */
    saveProviderConfig(provider, config) {
        CONFIG.AI_PROVIDER = provider;
        localStorage.setItem(CONFIG.STORAGE_KEYS.AI_PROVIDER, provider);
        
        if (provider === 'azure') {
            CONFIG.AZURE_ENDPOINT = config.endpoint;
            CONFIG.AZURE_API_KEY = config.apiKey;
            CONFIG.AZURE_DEPLOYMENT_NAME = config.deployment || 'gpt-4o';
            localStorage.setItem(CONFIG.STORAGE_KEYS.AZURE_ENDPOINT, config.endpoint);
            localStorage.setItem(CONFIG.STORAGE_KEYS.AZURE_API_KEY, config.apiKey);
            localStorage.setItem(CONFIG.STORAGE_KEYS.AZURE_DEPLOYMENT, config.deployment || 'gpt-4o');
        } else if (provider === 'anthropic') {
            CONFIG.ANTHROPIC_API_KEY = config.apiKey;
            localStorage.setItem(CONFIG.STORAGE_KEYS.ANTHROPIC_API_KEY, config.apiKey);
        } else if (provider === 'openai') {
            CONFIG.OPENAI_API_KEY = config.apiKey;
            localStorage.setItem(CONFIG.STORAGE_KEYS.OPENAI_API_KEY, config.apiKey);
        }
    },
    
    /**
     * Get current provider name
     */
    getProvider() {
        return CONFIG.AI_PROVIDER;
    },
    
    /**
     * Get API key for current provider
     */
    getApiKey() {
        const provider = CONFIG.AI_PROVIDER;
        
        if (provider === 'azure') {
            return CONFIG.AZURE_API_KEY;
        } else if (provider === 'anthropic') {
            return CONFIG.ANTHROPIC_API_KEY;
        } else {
            return CONFIG.OPENAI_API_KEY;
        }
    },
    
    /**
     * Validate file before upload
     */
    validateFile(file) {
        const errors = [];
        
        if (!file) {
            errors.push('No file selected');
            return { valid: false, errors };
        }
        
        if (file.size > CONFIG.MAX_FILE_SIZE) {
            errors.push(`File size exceeds ${CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB limit`);
        }
        
        if (!CONFIG.ALLOWED_FILE_TYPES.includes(file.type)) {
            errors.push('Invalid file type. Please upload PNG, JPG, or WebP images');
        }
        
        return {
            valid: errors.length === 0,
            errors
        };
    },
    
    /**
     * Get level info for given XP
     */
    getLevelInfo(xp) {
        let currentLevel = CONFIG.LEVELS[0];
        let nextLevel = CONFIG.LEVELS[1];
        
        for (let i = CONFIG.LEVELS.length - 1; i >= 0; i--) {
            if (xp >= CONFIG.LEVELS[i].xp) {
                currentLevel = CONFIG.LEVELS[i];
                nextLevel = CONFIG.LEVELS[i + 1] || currentLevel;
                break;
            }
        }
        
        return {
            level: currentLevel.level,
            title: currentLevel.title,
            currentXP: xp,
            nextLevelXP: nextLevel.xp,
            xpToNextLevel: nextLevel.xp - xp,
            progress: ((xp - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100
        };
    },
    
    /**
     * Check if level up occurred
     */
    checkLevelUp(oldXP, newXP) {
        const oldLevel = this.getLevelInfo(oldXP).level;
        const newLevel = this.getLevelInfo(newXP).level;
        return newLevel > oldLevel;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, ConfigHelper };
}

// Made with Bob
