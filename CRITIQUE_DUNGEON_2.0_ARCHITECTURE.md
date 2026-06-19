# Critique Dungeon 2.0 - Complete Architecture

## Executive Summary

This document outlines the complete rebuild of Design Critique Dungeon into an immersive RPG experience with dual modes: **Dungeon Master Mode** (fantasy RPG) and **IBM Carbon Mode** (professional design tool).

## Core Philosophy

**Current State**: A modern web app wearing a fantasy costume  
**Target State**: An authentic 80s DOS RPG that teaches IBM Design Language through gameplay

## Architecture Overview

### Dual-Mode System

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Core                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Shared Game Engine & AI Analysis             │   │
│  │  • Quest System    • XP/Leveling   • AI Critique     │   │
│  │  • Achievements    • Boss Battles  • IBM Knowledge   │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│         ┌─────────────────┴─────────────────┐               │
│         ▼                                   ▼               │
│  ┌─────────────────┐              ┌─────────────────┐      │
│  │  Dungeon Mode   │              │   Carbon Mode   │      │
│  │                 │              │                 │      │
│  │ • DOS RPG UI    │              │ • IBM Carbon UI │      │
│  │ • Fantasy Lang  │              │ • Professional  │      │
│  │ • Pixel Art     │              │ • Clean Design  │      │
│  │ • Quest Log     │              │ • Executive     │      │
│  │ • Character     │              │ • Analytics     │      │
│  └─────────────────┘              └─────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## File Structure

```
critique-dungeon-2.0/
├── index.html                          # Main entry point
├── index-dungeon.html                  # Dungeon mode (desktop)
├── index-carbon.html                   # Carbon mode (desktop)
├── index-mobile.html                   # Mobile unified experience
│
├── css/
│   ├── core/
│   │   ├── reset.css                   # CSS reset
│   │   ├── variables.css               # Shared CSS variables
│   │   └── utilities.css               # Utility classes
│   │
│   ├── dungeon/
│   │   ├── dos-rpg.css                 # DOS RPG aesthetics
│   │   ├── pixel-art.css               # Pixel art styles
│   │   ├── animations-dungeon.css      # Fantasy animations
│   │   ├── quest-log.css               # Quest UI
│   │   ├── character-sheet.css         # Character stats
│   │   ├── guild-hall.css              # Hub area
│   │   └── boss-battles.css            # Boss UI
│   │
│   ├── carbon/
│   │   ├── carbon-base.css             # IBM Carbon foundation
│   │   ├── carbon-components.css       # Carbon components
│   │   ├── carbon-grid.css             # 2x Grid system
│   │   ├── carbon-typography.css       # IBM Plex
│   │   └── animations-carbon.css       # Professional motion
│   │
│   ├── mobile/
│   │   ├── mobile-dungeon.css          # Mobile fantasy
│   │   └── mobile-carbon.css           # Mobile professional
│   │
│   └── transitions/
│       └── mode-switch.css             # Theme transition effects
│
├── js/
│   ├── core/
│   │   ├── app.js                      # Main application controller
│   │   ├── config.js                   # Configuration
│   │   ├── storage.js                  # LocalStorage management
│   │   └── router.js                   # Mode routing
│   │
│   ├── game-engine/
│   │   ├── quest-system.js             # Quest generation & tracking
│   │   ├── xp-system.js                # XP calculation & leveling
│   │   ├── achievement-system.js       # Badges & achievements
│   │   ├── boss-battles.js             # Boss encounter logic
│   │   ├── progression.js              # Player progression
│   │   └── inventory.js                # Unlockables & rewards
│   │
│   ├── ai/
│   │   ├── ai-analyzer.js              # AI integration
│   │   ├── dungeon-master-ai.js        # Fantasy persona
│   │   ├── carbon-executive-ai.js      # Professional persona
│   │   ├── quest-generator.js          # AI quest creation
│   │   └── ibm-knowledge-base.js       # IBM Design Language rules
│   │
│   ├── ui/
│   │   ├── dungeon-ui.js               # Dungeon mode UI
│   │   ├── carbon-ui.js                # Carbon mode UI
│   │   ├── quest-log-ui.js             # Quest interface
│   │   ├── character-sheet-ui.js       # Character display
│   │   ├── guild-hall-ui.js            # Hub interface
│   │   ├── loading-sequences.js        # Animated loading
│   │   └── notifications.js            # Toast/modal system
│   │
│   ├── transitions/
│   │   └── mode-switcher.js            # Magical theme transitions
│   │
│   └── mobile/
│       ├── mobile-controller.js        # Mobile-specific logic
│       └── touch-handlers.js           # Touch interactions
│
├── assets/
│   ├── fonts/
│   │   ├── ibm-plex/                   # IBM Plex family
│   │   ├── vt323/                      # DOS-style font
│   │   └── press-start-2p/             # Pixel font
│   │
│   ├── images/
│   │   ├── dungeon/
│   │   │   ├── portraits/              # Character portraits
│   │   │   ├── icons/                  # Pixel icons
│   │   │   ├── backgrounds/            # Fantasy backgrounds
│   │   │   └── sprites/                # Animated sprites
│   │   │
│   │   └── carbon/
│   │       ├── icons/                  # IBM icons
│   │       └── illustrations/          # IBM illustrations
│   │
│   ├── audio/
│   │   ├── dungeon/
│   │   │   ├── ambient/                # Background music
│   │   │   ├── sfx/                    # Sound effects
│   │   │   └── voice/                  # Dungeon Master voice
│   │   │
│   │   └── carbon/
│   │       └── ui-sounds/              # Subtle UI feedback
│   │
│   └── data/
│       ├── quests.json                 # Quest templates
│       ├── achievements.json           # Achievement definitions
│       ├── boss-battles.json           # Boss encounters
│       └── ibm-knowledge.json          # IBM Design Language rules
│
├── docs/
│   ├── PLAYER_GUIDE.md                 # How to play
│   ├── GAME_MECHANICS.md               # System documentation
│   ├── IBM_INTEGRATION.md              # IBM knowledge base
│   └── API_DOCUMENTATION.md            # Developer docs
│
└── server.js                           # Node.js proxy server
```

## Core Systems

### 1. Quest System

**Purpose**: Transform critique findings into playable quests

**Components**:
- Quest Generator (AI-powered)
- Quest Tracker
- Quest Completion Validator
- Quest Rewards System

**Quest Types**:
```javascript
{
  GRID_QUEST: {
    trigger: "Grid violations detected",
    objective: "Realign elements to IBM 2x Grid",
    reward: { xp: 150, badge: "Grid Guardian" }
  },
  TYPOGRAPHY_QUEST: {
    trigger: "Typography hierarchy issues",
    objective: "Strengthen heading hierarchy",
    reward: { xp: 120, badge: "Typography Apprentice" }
  },
  ACCESSIBILITY_QUEST: {
    trigger: "WCAG violations",
    objective: "Achieve WCAG AA compliance",
    reward: { xp: 300, badge: "Accessibility Slayer" }
  },
  COLOR_QUEST: {
    trigger: "Color harmony issues",
    objective: "Restore color balance using IBM tokens",
    reward: { xp: 180, badge: "Color Sage" }
  },
  BOSS_BATTLE: {
    trigger: "Critical design violations",
    objective: "Defeat the design boss",
    reward: { xp: 500, badge: "Boss Slayer", title: "Legendary" }
  }
}
```

### 2. XP & Leveling System

**XP Sources**:
- Base analysis: 50 XP
- Quest completion: 100-500 XP
- Boss defeats: 500-1000 XP
- Perfect scores: +200 XP bonus
- Accessibility excellence: +150 XP bonus
- Carbon compliance: +100 XP bonus

**Level Progression**:
```javascript
LEVELS: [
  { level: 1, xp: 0, title: "Apprentice Designer" },
  { level: 5, xp: 1000, title: "Design Knight" },
  { level: 10, xp: 5000, title: "Grid Guardian" },
  { level: 15, xp: 12000, title: "Accessibility Mage" },
  { level: 20, xp: 25000, title: "Typography Wizard" },
  { level: 25, xp: 50000, title: "Carbon Champion" },
  { level: 30, xp: 100000, title: "Master Builder" },
  { level: 35, xp: 200000, title: "Visual Storyteller" },
  { level: 40, xp: 400000, title: "Brand Oracle" },
  { level: 50, xp: 1000000, title: "Legendary Creative Director" }
]
```

### 3. Boss Battle System

**Boss Types**:
- **The Contrast Dragon**: Color contrast violations
- **The Chaos Wizard**: Layout inconsistencies
- **The Grid Golem**: Spacing violations
- **The Typography Lich**: Font hierarchy issues
- **The Accessibility Kraken**: WCAG violations
- **The Spacing Ogre**: Margin/padding chaos

**Boss Mechanics**:
- Triggered by critical design violations
- Multi-stage battles (upload → improve → validate)
- Special rewards for defeating bosses
- Boss health = number of violations
- Player attacks = design improvements

### 4. Achievement System

**Categories**:
- **Mastery Badges**: Skill-based achievements
- **Milestone Badges**: Progress achievements
- **Secret Badges**: Hidden Easter eggs
- **Boss Badges**: Boss defeat rewards
- **Perfect Badges**: Flawless execution

**Examples**:
```javascript
ACHIEVEMENTS: {
  PIXEL_PERFECT: {
    name: "Pixel Perfect",
    description: "Achieve 100% grid alignment",
    icon: "📐",
    secret: true
  },
  CARBON_MASTER: {
    name: "Carbon Master",
    description: "Perfect Carbon compliance",
    icon: "💎",
    secret: false
  },
  LEGENDARY_SCROLL: {
    name: "Legendary Scroll",
    description: "Upload a design scoring 98+",
    icon: "📜",
    secret: true
  }
}
```

## Dungeon Master AI Persona

### Personality Traits
- Wise and experienced
- Occasionally sarcastic but never mean
- Encouraging and educational
- Uses fantasy metaphors to explain IBM principles
- Storytelling approach to feedback

### Language Examples

**Grid Violations**:
```
"Young apprentice, the Sacred Grid has been disturbed. 
Your elements wander like travelers without a map. 
The IBM 2x Grid demands discipline—8px, 16px, 24px, 32px. 
Realign your components, and the Grid Spirits shall smile upon you."
```

**Typography Issues**:
```
"The Typography Spirits whisper of chaos in thy headings. 
IBM Plex demands hierarchy—bold for importance, regular for body. 
Your h1 and h2 appear as twins when they should be king and knight."
```

**Accessibility Success**:
```
"The Accessibility Oracle sees clearly through your interface! 
4.5:1 contrast achieved. Focus indicators present. 
ARIA labels properly cast. The WCAG guardians bow in respect."
```

**Carbon Compliance**:
```
"Excellent work, brave designer! 
The Carbon Guardians recognize thy discipline. 
Proper button hierarchy. Correct spacing tokens. 
The Council of Designers shall hear of this victory!"
```

## Loading Sequences

### Dungeon Mode Loading
```
⚔️ Lighting the torches...
📖 Opening the Ancient Codex...
🏛️ Consulting IBM Archives...
✨ Summoning the Typography Spirits...
♿ Calling the Accessibility Oracle...
⚛️ Inspecting Carbon Components...
📐 Measuring the Sacred Grid...
📜 Reading the Scroll...
⚖️ Preparing Final Judgment...
```

### Carbon Mode Loading
```
Analyzing design system compliance...
Evaluating IBM Design Language principles...
Checking Carbon component usage...
Measuring grid adherence...
Assessing accessibility standards...
Validating typography scale...
Reviewing color token usage...
Generating professional feedback...
```

## UI Components

### Dungeon Mode Components

**Character Sheet**:
```
╔═══════════════════════════════════════╗
║        CHARACTER SHEET                ║
╠═══════════════════════════════════════╣
║ Name: [Player Name]                   ║
║ Level: 12                             ║
║ Title: Grid Guardian                  ║
║ XP: 5,420 / 12,000                   ║
║                                       ║
║ STATS:                                ║
║ ⚔️  Design Power: 85                  ║
║ 🛡️  Accessibility: 92                 ║
║ 📐  Grid Mastery: 78                  ║
║ 🎨  Color Wisdom: 88                  ║
║ 📝  Typography: 81                    ║
╚═══════════════════════════════════════╝
```

**Quest Log**:
```
╔═══════════════════════════════════════╗
║           ACTIVE QUESTS               ║
╠═══════════════════════════════════════╣
║ ⚔️ The Broken Grid                    ║
║    Realign elements to 2x Grid        ║
║    Reward: +150 XP, Grid Guardian     ║
║    Progress: ████░░░░░░ 40%          ║
║                                       ║
║ ⚔️ Typography Challenge               ║
║    Fix heading hierarchy              ║
║    Reward: +120 XP                    ║
║    Progress: ██░░░░░░░░ 20%          ║
╚═══════════════════════════════════════╝
```

**Boss Battle UI**:
```
╔═══════════════════════════════════════╗
║      ⚔️ BOSS BATTLE ⚔️                ║
╠═══════════════════════════════════════╣
║                                       ║
║     THE CONTRAST DRAGON               ║
║     ▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░ 50%        ║
║                                       ║
║  Violations Remaining: 5              ║
║  • Low contrast text (3)              ║
║  • Insufficient button contrast (2)   ║
║                                       ║
║  Your Progress:                       ║
║  ████████████████░░░░ 80%            ║
║                                       ║
║  [Upload Improved Design]             ║
╚═══════════════════════════════════════╝
```

### Carbon Mode Components

**Analysis Dashboard**:
```
┌─────────────────────────────────────┐
│ Design Analysis Results             │
├─────────────────────────────────────┤
│                                     │
│ Overall Score: 87/100               │
│ ████████████████████░░░░░░░░        │
│                                     │
│ Carbon Compliance: High             │
│ IBM IDL Alignment: Excellent        │
│                                     │
│ Breakdown:                          │
│ • Typography: 92/100                │
│ • Grid System: 85/100               │
│ • Color Tokens: 88/100              │
│ • Accessibility: 90/100             │
│ • Components: 84/100                │
│                                     │
└─────────────────────────────────────┘
```

## Theme Transition Animation

**Dungeon → Carbon**:
1. Screen ripple effect
2. Pixel art dissolves into clean vectors
3. Fantasy colors fade to IBM palette
4. DOS font morphs into IBM Plex
5. Quest log transforms into analytics
6. Character sheet becomes profile

**Carbon → Dungeon**:
1. Portal opens in center
2. Professional UI gets "pulled in"
3. Pixel particles emerge
4. Fantasy colors bloom
5. DOS aesthetic materializes
6. Analytics become quest log

## Mobile Adaptation

### Mobile Dungeon Mode
- Vertical scrolling quest log
- Swipeable character sheet
- Touch-optimized buttons (44x44px minimum)
- Collapsible inventory
- Sticky action bar
- Simplified pixel art (performance)

### Mobile Carbon Mode
- Card-based layout
- Swipeable analysis sections
- Bottom sheet for details
- Floating action button
- Responsive grid
- Touch-friendly controls

## IBM Knowledge Integration

### Enhanced AI Prompt Structure

```javascript
DUNGEON_MASTER_PROMPT: `
You are the Dungeon Master, an ancient guardian of IBM Design Language.

EVALUATION FRAMEWORK:

1. IBM 2x Grid System
   - 8px base unit
   - 16-column grid
   - Proper spacing tokens

2. IBM Plex Typography
   - Font family usage
   - Type scale adherence
   - Line height standards

3. Carbon Components
   - Proper component usage
   - Correct states
   - Pattern compliance

4. IBM Color Tokens
   - Palette adherence
   - Theme consistency
   - Contrast ratios

5. Accessibility (WCAG 2.1 AA)
   - Color contrast
   - Focus indicators
   - Semantic structure

QUEST GENERATION:
For each violation, create a quest with:
- Fantasy title
- Clear objective
- XP reward
- Badge unlock condition

BOSS BATTLES:
Critical violations trigger boss battles:
- Boss name and type
- Health (violation count)
- Victory conditions
- Epic rewards

TONE:
- Wise and encouraging
- Fantasy metaphors
- Never robotic
- Educational storytelling
`
```

## Implementation Phases

### Phase 1: Core Architecture (Week 1)
- [ ] Set up new file structure
- [ ] Build quest system foundation
- [ ] Implement XP/leveling engine
- [ ] Create achievement system
- [ ] Build boss battle mechanics

### Phase 2: Dungeon Mode UI (Week 2)
- [ ] DOS RPG interface design
- [ ] Character sheet component
- [ ] Quest log interface
- [ ] Guild hall hub
- [ ] Pixel art integration
- [ ] Loading sequences

### Phase 3: Carbon Mode UI (Week 3)
- [ ] IBM Carbon implementation
- [ ] Professional dashboard
- [ ] Analytics interface
- [ ] Executive feedback system
- [ ] Carbon components

### Phase 4: AI Enhancement (Week 4)
- [ ] Enhanced Dungeon Master persona
- [ ] Quest generation AI
- [ ] IBM knowledge base integration
- [ ] Boss battle AI
- [ ] Dual-mode prompts

### Phase 5: Theme Transitions (Week 5)
- [ ] Magical transition animations
- [ ] Mode switcher UI
- [ ] Theme-aware components
- [ ] Smooth state management

### Phase 6: Mobile Optimization (Week 6)
- [ ] Mobile dungeon interface
- [ ] Mobile carbon interface
- [ ] Touch handlers
- [ ] Responsive layouts
- [ ] Performance optimization

### Phase 7: Polish & Testing (Week 7)
- [ ] Sound effects
- [ ] Easter eggs
- [ ] Performance tuning
- [ ] Cross-browser testing
- [ ] Accessibility audit

### Phase 8: Documentation (Week 8)
- [ ] Player guide
- [ ] Game mechanics docs
- [ ] Developer documentation
- [ ] Deployment guide

## Success Metrics

### Player Engagement
- Average session duration > 10 minutes
- Return rate > 60%
- Quest completion rate > 70%
- Level progression curve smooth

### Educational Impact
- IBM Design Language knowledge increase
- Carbon compliance improvement over time
- Accessibility awareness growth

### Technical Performance
- Load time < 2 seconds
- Smooth 60fps animations
- Mobile performance optimized
- Cross-browser compatibility

## Conclusion

This architecture transforms Design Critique Dungeon from a themed web app into an authentic RPG experience that teaches IBM Design Language through gameplay. The dual-mode system ensures both playful engagement and professional utility, making it valuable for designers at all levels.

The quest system, boss battles, and progression mechanics create genuine game loops that motivate continuous improvement, while the IBM knowledge integration ensures all feedback is grounded in real design principles.

---

**Next Steps**: Begin Phase 1 implementation with core game engine development.