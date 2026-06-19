# 🎮 Critique Dungeon 2.0 - Demo Instructions

## How to Test the Quest System Demo

### Quick Start

1. **Open the demo file**:
   - Navigate to: `demo-quest-system.html`
   - Open it in your web browser (Chrome, Firefox, Safari, or Edge)
   - Or use a local server: `python -m http.server 8000` then visit `http://localhost:8000/demo-quest-system.html`

2. **Explore the Interface**:
   - **Character Sheet**: See your level, title, XP, and stats
   - **Quest Statistics**: Track your quest progress
   - **Active Quests**: View all current quests and boss battles

### Interactive Demo Features

#### 🎲 Simulate Design Analysis
- Generates 3-7 random design violations
- Creates quests automatically based on violations
- May trigger boss battles if critical issues detected
- Awards 50 XP for completing analysis

**What to Watch For**:
- New quests appear in the Active Quests section
- Quest cards show title, description, objective, and rewards
- Boss battles have red borders and special styling
- XP bar updates automatically

#### ✨ Simulate Design Improvement
- Simulates fixing design issues
- Updates quest progress
- Completes quests when issues are resolved
- Awards XP for completed quests

**What to Watch For**:
- Quest progress bars increase
- Completed quests disappear from active list
- XP increases and level may increase
- Notifications appear for completions

#### ✅ Complete Random Quest
- Instantly completes a random active quest
- Awards full XP reward
- Useful for testing level-up mechanics

#### 🔄 Reset All Progress
- Clears all quests and XP
- Resets to level 1
- Useful for testing from scratch

### Quest Types You'll See

1. **Grid & Spacing Quests**
   - The Broken Grid (150 XP)
   - The Spacing Demons (100 XP)

2. **Typography Quests**
   - The Lost Hierarchy (120 XP)
   - The Font Chaos (80 XP)

3. **Accessibility Quests**
   - The Accessibility Dragon (300 XP)
   - The Contrast Curse (150 XP)
   - The Invisible Path (100 XP)

4. **Color Quests**
   - The Color Alchemist (180 XP)

5. **Component Quests**
   - The Button Battalion (90 XP)
   - The Component Quest (200 XP)

6. **Layout Quests**
   - The Shapeshifter Challenge (250 XP)

7. **Content Quests**
   - The Wordsmith Trial (80 XP)

### Boss Battles

Boss battles trigger when:
- 5+ critical violations detected → **Chaos Wizard** (500 XP)
- 3+ accessibility issues → **Accessibility Kraken** (600 XP)
- 4+ grid/spacing issues → **Grid Golem** (550 XP)

**Boss Features**:
- Red border and special styling
- Boss health indicator
- Higher XP rewards
- Legendary difficulty badge

### Leveling System

**50 Levels Total**:
- Level 1: Apprentice Designer (0 XP)
- Level 5: Grid Guardian (1,000 XP)
- Level 10: Layout Architect (7,500 XP)
- Level 20: Typography Wizard (60,000 XP)
- Level 30: Grand Master (205,000 XP)
- Level 40: Design Overlord (450,000 XP)
- Level 50: Legendary Creative Director (1,000,000 XP)

### Testing Scenarios

#### Scenario 1: First Quest
1. Click "Simulate Design Analysis"
2. Watch quests generate
3. Check character sheet updates
4. Note XP gained

#### Scenario 2: Quest Completion
1. Generate quests
2. Click "Simulate Design Improvement"
3. Watch progress bars increase
4. See quests complete and XP awarded

#### Scenario 3: Boss Battle
1. Click "Simulate Design Analysis" multiple times
2. Eventually a boss will spawn (red card)
3. Use "Simulate Design Improvement" to damage boss
4. Complete boss for massive XP

#### Scenario 4: Level Up
1. Complete multiple quests
2. Watch XP bar fill
3. See level-up notification
4. New title appears

#### Scenario 5: Full Cycle
1. Start fresh (reset if needed)
2. Generate quests
3. Complete some quests
4. Generate more quests
5. Complete boss battle
6. Level up multiple times

### What Makes This Special

**Dynamic Quest Generation**:
- Quests are generated from actual design violations
- Each violation type maps to a specific quest template
- Boss battles trigger based on severity

**Real Progression**:
- XP persists in localStorage
- Level and title update automatically
- Quest history tracked

**Dual Language Support**:
- Each quest has fantasy text (Dungeon Mode)
- Each quest has professional text (Carbon Mode)
- Demo shows fantasy version

### Technical Details

**Files Involved**:
- `demo-quest-system.html` - Interactive demo interface
- `js/game-engine/quest-system.js` - Quest generation and tracking
- `js/game-engine/xp-system.js` - XP calculation and leveling

**Data Persistence**:
- All data stored in localStorage
- Survives page refreshes
- Use reset button to clear

**Browser Compatibility**:
- Works in all modern browsers
- Requires JavaScript enabled
- No server needed (static HTML)

### Next Steps

After testing the demo, the next phases include:

1. **Dungeon Master AI** - Enhanced AI prompts with quest generation
2. **Dungeon Mode UI** - Full DOS RPG interface
3. **Carbon Mode UI** - Professional IBM interface
4. **Theme Transitions** - Magical mode switching
5. **Mobile Optimization** - Touch-friendly experience

### Troubleshooting

**Quests not generating?**
- Check browser console for errors
- Ensure JavaScript is enabled
- Try refreshing the page

**Progress not saving?**
- Check if localStorage is enabled
- Try a different browser
- Clear cache and try again

**Want to start over?**
- Click "Reset All Progress" button
- Or clear browser localStorage manually

---

**Enjoy exploring the quest system!** ⚔️🛡️

This is just the beginning of the Critique Dungeon 2.0 experience.