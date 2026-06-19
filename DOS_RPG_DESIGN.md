# 🎮 Dungeon Mode: Authentic DOS RPG Design Specification

## Vision Statement

**"I can't believe someone turned an IBM design critique tool into a real 1992 DOS Dungeons & Dragons game."**

This is NOT a modern app with fantasy colors. This is an authentic tribute to SSI Gold Box games, Eye of the Beholder, and classic DOS fantasy RPGs from 1988-1994.

---

## 🎯 Core Inspiration

### Primary References:
- **Pool of Radiance** (1988) - SSI Gold Box
- **Curse of the Azure Bonds** (1989)
- **Champions of Krynn** (1990)
- **Secret of the Silver Blades** (1990)
- **Eye of the Beholder** (1991)
- **Forgotten Realms DOS games**

### Key Characteristics:
- VGA 256-color palette
- Pixel art illustration windows
- Heavy bordered panels (stone, iron, wood)
- ANSI-style colored ASCII art
- Bitmap pixel fonts
- High contrast black backgrounds
- RPG dialogue narration
- Multiple framed windows
- Authentic DOS terminal feel

---

## 🖥️ Desktop Layout (Primary Experience)

### Panel Structure (Classic RPG Multi-Window Interface)

```
┌─────────────────────────────────────────────────────────────────┐
│ ╔═══════════════════════════════════════════════════════════╗ │
│ ║  CARBON QUEST - DESIGN CRITIQUE DUNGEON                   ║ │
│ ╚═══════════════════════════════════════════════════════════╝ │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────┐ ┌────────────────────────────────────┐│
│ │ ILLUSTRATION WINDOW  │ │ PARTY STATUS                       ││
│ │                      │ │ ┌────────────────────────────────┐ ││
│ │  [Pixel Art Image]   │ │ │ Adventurer: [Name]             │ ││
│ │                      │ │ │ Guild Rank: Apprentice         │ ││
│ │  Wizard studying     │ │ │ Level: 3                       │ ││
│ │  ancient scrolls     │ │ │ XP: 1,250 / 2,000             │ ││
│ │                      │ │ │ Quests: 12                     │ ││
│ │                      │ │ │ Victories: 8                   │ ││
│ └──────────────────────┘ │ └────────────────────────────────┘ ││
│                          │                                    ││
│                          │ CURRENT QUEST                      ││
│                          │ ┌────────────────────────────────┐ ││
│                          │ │ Analyze Design Scroll          │ ││
│                          │ │ Difficulty: ★★★☆☆             │ ││
│                          │ └────────────────────────────────┘ ││
│                          └────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│ ╔═══════════════════════════════════════════════════════════╗ │
│ ║ DUNGEON MASTER                                            ║ │
│ ╠═══════════════════════════════════════════════════════════╣ │
│ ║ The Dungeon Master carefully examines your design        ║ │
│ ║ scroll. Ancient runes glow as the analysis begins...     ║ │
│ ║                                                           ║ │
│ ║ > Submit your design scroll for critique                 ║ │
│ ╚═══════════════════════════════════════════════════════════╝ │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────┐ ┌────────────────────────────────────┐│
│ │ ARTIFACTS            │ │ ACHIEVEMENTS                       ││
│ │ ┌──────────────────┐ │ │ ┌────────────────────────────────┐││
│ │ │ 🛡️ First Quest   │ │ │ │ ⚔️ Veteran Designer           │││
│ │ │ ⚛️ Carbon Init   │ │ │ │ 📐 8px Grid Master            │││
│ │ │ ♿ A11y Champ    │ │ │ │ 💎 Carbon Master              │││
│ │ └──────────────────┘ │ │ └────────────────────────────────┘││
│ └──────────────────────┘ └────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Visual Design System

### VGA Color Palette (Authentic DOS Colors)

```css
/* Background */
--dos-black: #000000;
--dos-dark-gray: #1a1a1a;

/* Stone & Metal */
--dos-stone: #808080;
--dos-iron: #505050;
--dos-silver: #c0c0c0;

/* Gold & Treasure */
--dos-gold: #ffaa00;
--dos-gold-dark: #cc8800;
--dos-bronze: #cd7f32;

/* Magic & Energy */
--dos-cyan: #00ffff;
--dos-bright-cyan: #55ffff;
--dos-magenta: #ff00ff;
--dos-purple: #aa00aa;

/* Nature */
--dos-green: #00ff00;
--dos-emerald: #00aa00;
--dos-lime: #55ff55;

/* Fire & Danger */
--dos-red: #ff0000;
--dos-bright-red: #ff5555;
--dos-orange: #ff8800;

/* Text */
--dos-white: #ffffff;
--dos-light-gray: #aaaaaa;
--dos-parchment: #ffeecc;

/* UI Elements */
--dos-blue: #0000ff;
--dos-bright-blue: #5555ff;
--dos-yellow: #ffff00;
--dos-bright-yellow: #ffff55;
```

### Panel Border Styles

**Stone Frame:**
```
╔═══════════════════════════════════╗
║                                   ║
║         CONTENT AREA              ║
║                                   ║
╚═══════════════════════════════════╝
```

**Iron Frame:**
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                   ┃
┃         CONTENT AREA              ┃
┃                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Wood Frame:**
```
┌───────────────────────────────────┐
│                                   │
│         CONTENT AREA              │
│                                   │
└───────────────────────────────────┘
```

**Decorative Corners:**
```
╔═══════════════════════════════════╗
║ ⚔                             ⚔ ║
║                                   ║
║         CONTENT AREA              ║
║                                   ║
║ ⚔                             ⚔ ║
╚═══════════════════════════════════╝
```

---

## 🖼️ Pixel Art Illustration Windows

### Scenes to Create:

1. **Wizard Studying Scrolls** - Default/Upload state
2. **Knight in Library** - Analysis in progress
3. **Dungeon Entrance** - Quest selection
4. **Ancient Castle** - Results overview
5. **Dragon Guardian** - High score achievement
6. **Treasure Room** - XP rewards
7. **Magic Portal** - Theme switching
8. **Dungeon Master** - Critique delivery
9. **Ancient Books** - Documentation
10. **Magic Artifacts** - Achievements

### Style Guidelines:
- 256-color VGA palette
- Dithered shading (authentic DOS technique)
- 320x200 or 640x480 resolution aesthetic
- NOT modern pixel art
- NOT voxel or cartoon style
- Think: Larry Elmore, Keith Parkinson fantasy art rendered in VGA

### Implementation:
- Use CSS to create pixel-perfect borders
- Placeholder colored blocks until real pixel art is commissioned
- Each scene should be 256x192px or similar DOS resolution

---

## 🎭 ASCII Art Elements

### Decorative Headers:

```
╔═══════════════════════════════════════════════════════════╗
║  ⚔️  CARBON QUEST - DESIGN CRITIQUE DUNGEON  ⚔️          ║
╚═══════════════════════════════════════════════════════════╝
```

### Torch Brackets:
```
🔥                                                        🔥
║                    CONTENT AREA                        ║
🔥                                                        🔥
```

### Quest Separator:
```
═══════════════════════════════════════════════════════════
        ⚔️  THE SCROLL OF TYPOGRAPHY  ⚔️
═══════════════════════════════════════════════════════════
```

### Dragon Border:
```
    🐉═══════════════════════════════════════════🐉
```

### Book Decoration:
```
    📖 THE TOME OF ACCESSIBILITY 📖
```

### Shield Frame:
```
        🛡️
    ┌─────────┐
    │ CONTENT │
    └─────────┘
        ⚔️
```

### Map Corner:
```
🗺️ ═══════════════════════════════════════════ 🗺️
```

---

## 🔤 Typography System

### Pixel Fonts (Load from Google Fonts or similar):

**Primary Display:**
- `Press Start 2P` - Authentic 8-bit pixel font
- Use for: Titles, headers, labels

**Secondary Display:**
- `VT323` - VGA terminal font
- Use for: Dialogue, narration, body text

**Monospace:**
- `IBM Plex Mono` - For code/data (Carbon compatibility)
- Use for: Technical details, stats

### Font Sizes:
```css
--font-title: 24px;      /* Large pixel headers */
--font-heading: 16px;    /* Section titles */
--font-body: 14px;       /* Readable text */
--font-small: 12px;      /* Labels, captions */
--font-tiny: 10px;       /* Fine print */
```

### Text Effects:
- **Glowing text**: `text-shadow: 0 0 8px var(--dos-cyan);`
- **Embossed**: Multiple shadows for 3D effect
- **Pixelated**: `image-rendering: pixelated;`

---

## 💬 Dungeon Master Narration

### Upload State:
```
╔═══════════════════════════════════════════════════════════╗
║ DUNGEON MASTER                                            ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║ Greetings, brave adventurer! The Guild of Design         ║
║ Architects awaits your submission.                       ║
║                                                           ║
║ Present your design scroll for critique, and the         ║
║ ancient wisdom of the Carbon Oracle shall be revealed.   ║
║                                                           ║
║ > Submit Design Scroll                                   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### Loading Sequence:
```
╔═══════════════════════════════════════════════════════════╗
║ DUNGEON MASTER                                            ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║ ⚔️ Opening Ancient Codex...                              ║
║ 📖 Reading Forgotten Scrolls...                          ║
║ 🔮 Consulting the Guild Architects...                    ║
║ ⚡ Summoning the Design Wizard...                        ║
║ ♿ Casting Accessibility Divination...                   ║
║ 🎲 Rolling Design Check... [18/20]                       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### Results Delivered:
```
╔═══════════════════════════════════════════════════════════╗
║ DUNGEON MASTER                                            ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║ The Carbon Oracle has spoken! Your design scroll has     ║
║ been examined by the Guild's finest architects.          ║
║                                                           ║
║ Behold the ancient wisdom contained within these         ║
║ sacred tomes...                                          ║
║                                                           ║
║ > View Critique Scrolls                                  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

---

## 📜 Results as Magical Codex Pages

### Category Headers (Tome Style):

```
═══════════════════════════════════════════════════════════
        📖 THE SCROLL OF HIERARCHY 📖
═══════════════════════════════════════════════════════════

✓ The Sacred Order is maintained - proper heading levels
  detected throughout your design scroll.

⚠️ Warning: The Balance Mage senses uneven spacing in
  section divisions. Consult the 8px Grid for harmony.

═══════════════════════════════════════════════════════════
```

### Finding Format:

```
┌───────────────────────────────────────────────────────────┐
│ ✓ BLESSING OF THE TYPOGRAPHY SAGE                        │
├───────────────────────────────────────────────────────────┤
│ The ancient IBM Plex Guardian stands strong. Your type   │
│ scale follows the sacred 16px body text with proper      │
│ 1.5 line height. The readability spirits are pleased.    │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│ ⚠️ WARNING FROM THE SPACING ORACLE                        │
├───────────────────────────────────────────────────────────┤
│ Spacing demons violate the sacred 8px grid! Inconsistent │
│ 12px margins break the rhythm. Realign to 8, 16, or 24px │
│ to restore balance to your design.                       │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│ 🔴 CURSE OF THE ACCESSIBILITY MAGE                        │
├───────────────────────────────────────────────────────────┤
│ Dark magic afflicts your buttons! 3.2:1 contrast fails   │
│ the Carbon standard of 4.5:1 for WCAG AA compliance.     │
│ The blind shall not pass. Increase contrast immediately.  │
└───────────────────────────────────────────────────────────┘
```

---

## 🎁 XP Rewards & Achievements

### XP Gained Animation:

```
╔═══════════════════════════════════════════════════════════╗
║                    ✨ QUEST COMPLETE ✨                   ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║                  💎 +150 XP GAINED 💎                    ║
║                                                           ║
║              ⭐⭐⭐⭐☆ (4/5 Stars)                        ║
║                                                           ║
║         "The Guild is impressed with your work!"         ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### Level Up:

```
╔═══════════════════════════════════════════════════════════╗
║                  🎉 LEVEL UP! 🎉                         ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║              You are now Level 4!                        ║
║                                                           ║
║         New Guild Rank: Journeyman Designer              ║
║                                                           ║
║              ⚔️ +1 Critique Slot                         ║
║              📖 New Tome Unlocked                        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### Achievement Unlocked:

```
┌───────────────────────────────────────────────────────────┐
│              🏆 ACHIEVEMENT UNLOCKED 🏆                   │
├───────────────────────────────────────────────────────────┤
│                                                           │
│                    ⚛️ CARBON INITIATE                     │
│                                                           │
│         "Achieve 80+ score using Carbon components"      │
│                                                           │
│                  Reward: +50 Bonus XP                    │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 📱 Mobile Layout (Game Boy Advance Style)

### Concept: Handheld RPG Console

```
┌─────────────────────────┐
│ ╔═══════════════════╗   │
│ ║ CARBON QUEST      ║   │
│ ╚═══════════════════╝   │
├─────────────────────────┤
│ ┌───────────────────┐   │
│ │ [Pixel Art]       │   │
│ │                   │   │
│ │ Wizard studying   │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ ╔═══════════════════╗   │
│ ║ PARTY STATUS      ║   │
│ ╠═══════════════════╣   │
│ ║ Level: 3          ║   │
│ ║ XP: 1250/2000     ║   │
│ ╚═══════════════════╝   │
├─────────────────────────┤
│ ╔═══════════════════╗   │
│ ║ DUNGEON MASTER    ║   │
│ ╠═══════════════════╣   │
│ ║ Submit your       ║   │
│ ║ design scroll...  ║   │
│ ╚═══════════════════╝   │
├─────────────────────────┤
│ [═══════════════════]   │
│ [  Submit Scroll   ]   │
│ [═══════════════════]   │
└─────────────────────────┘
```

### Mobile Characteristics:
- Vertical stacking (no side panels)
- Thinner borders (but still pixel-style)
- Smaller illustration window
- Condensed text
- Touch-friendly buttons (48px minimum)
- Simplified ASCII decorations
- Same VGA colors
- Same pixel fonts
- Same RPG narration
- **Still feels like a handheld RPG game**

---

## 🎮 Implementation Strategy

### Phase 1: Core Structure
1. Create DOS-style panel layout
2. Implement VGA color system
3. Add pixel fonts
4. Build bordered containers

### Phase 2: Visual Elements
5. Add ASCII art decorations
6. Create placeholder pixel art windows
7. Style buttons as RPG UI elements
8. Implement high-contrast text

### Phase 3: Narration
9. Write Dungeon Master dialogue
10. Create loading sequences
11. Transform results into tome pages
12. Add RPG-style notifications

### Phase 4: Polish
13. Add subtle pixel animations
14. Implement XP sparkles
15. Create achievement popups
16. Fine-tune mobile layout

### Phase 5: Testing
17. Verify DOS aesthetic on desktop
18. Test handheld feel on mobile
19. Ensure Carbon theme unchanged
20. Get user feedback

---

## ✅ Success Criteria

**User Reaction:**
> "I can't believe someone turned an IBM design critique tool into a real 1992 DOS Dungeons & Dragons game."

**Desktop Experience:**
- Feels like launching Pool of Radiance
- Multiple framed RPG panels
- Pixel art illustration window
- Authentic VGA colors
- ANSI-style ASCII art
- Immersive DM narration

**Mobile Experience:**
- Feels like Game Boy Advance RPG
- Vertical stacked panels
- Maintains fantasy atmosphere
- Touch-friendly but still retro
- NOT a generic responsive site

**Carbon Theme:**
- Remains completely unchanged
- Professional IBM aesthetic
- Clean, modern, productive

---

## 🚫 What to AVOID

❌ Modern rounded cards
❌ Gradient backgrounds
❌ Smooth animations
❌ Sans-serif body text in Dungeon mode
❌ Minimalist design
❌ Flat colors
❌ Generic responsive layout
❌ Business report formatting
❌ Modern pixel art style
❌ Cartoon aesthetics
❌ Simplifying desktop for mobile

---

## 📚 Technical Notes

### CSS Strategy:
- Separate `dos-rpg-dungeon.css` file
- Use CSS Grid for panel layout
- Box-drawing characters for borders
- Text shadows for glow effects
- Image rendering: pixelated
- High contrast colors
- Monospace fonts

### JavaScript:
- Dynamic narration system
- Loading sequence controller
- XP animation triggers
- Achievement popup manager
- Theme-specific text content

### Assets Needed:
- Pixel fonts (Press Start 2P, VT323)
- Placeholder pixel art (colored blocks)
- ASCII art library
- Sound effects (optional, future)

---

**This is the authentic DOS RPG experience we're building.**

🎮 Let's make it legendary! ⚔️