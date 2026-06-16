# 🎨 IBM Design Language & Carbon Design System Integration

## Overview

The Design Critique Dungeon has been enhanced to provide comprehensive UX critiques based on **IBM Design Language (IDL)** and the **Carbon Design System**. All analyses now evaluate interfaces against IBM's official design standards, principles, and component specifications.

---

## 🏛️ IBM Design Language Principles

The Dungeon Master evaluates designs against IBM's three core pillars:

### 1. **Productive Design** ⚡
- **Focus**: Efficiency, clarity, and speed
- **Evaluation**: Task completion efficiency, clear information hierarchy, streamlined workflows
- **Examples**: Fast load times, minimal cognitive load, direct user paths

### 2. **Expressive Design** ✨
- **Focus**: Humanity, warmth, and delight
- **Evaluation**: Emotional engagement, brand personality, thoughtful interactions
- **Examples**: Micro-interactions, expressive motion, human-centered copy

### 3. **Universal Design** 🌍
- **Focus**: Inclusive, accessible, and global
- **Evaluation**: WCAG compliance, cultural sensitivity, device flexibility
- **Examples**: Screen reader support, keyboard navigation, responsive layouts

---

## ⚛️ Carbon Design System Evaluation

### Typography - IBM Plex Font Family

**Evaluated Elements:**
- ✅ IBM Plex Sans for UI text
- ✅ IBM Plex Mono for code/data
- ✅ IBM Plex Serif for editorial content

**Type Scale Standards:**
```
Display: 42px, 54px, 76px
Heading: 32px, 28px, 24px, 20px
Body: 16px, 14px
Caption: 12px
Helper: 12px
Legal: 11px
```

**Line Height:**
- Body text: 1.5 (150%)
- Headings: 1.25 (125%)
- Captions: 1.33 (133%)

**Font Weights:**
- Regular: 400
- Medium: 500
- SemiBold: 600

---

### Spacing & Layout - 8px Grid System

**Base Unit:** 8px

**Spacing Scale:**
```
2px  - Micro spacing
4px  - Tiny spacing
8px  - Base unit
16px - Small spacing
24px - Medium spacing
32px - Large spacing
48px - XL spacing
64px - XXL spacing
```

**Grid System:**
- 16-column grid
- Gutter: 32px (desktop), 16px (mobile)
- Margins: 16px minimum

**Breakpoints:**
```
Small:    320px - 671px
Medium:   672px - 1055px
Large:    1056px - 1311px
X-Large:  1312px - 1583px
Max:      1584px+
```

---

### Color System

**IBM Color Palette:**
- Blue (primary brand color)
- Gray (neutral scale)
- Red (error/danger)
- Green (success)
- Yellow (warning)
- Purple, Cyan, Magenta, Teal (accent colors)

**10-Step Color Scale:**
Each color has 10 shades (10, 20, 30, 40, 50, 60, 70, 80, 90, 100)

**Themes:**
- **White Theme**: Background Gray 10, Text Gray 100
- **Gray 10 Theme**: Background Gray 10, Text Gray 100
- **Gray 90 Theme**: Background Gray 90, Text Gray 10
- **Gray 100 Theme**: Background Gray 100, Text Gray 10

**Color Tokens:**
- `$background` - Surface colors
- `$text-primary` - Main text
- `$text-secondary` - Supporting text
- `$interactive` - Links and interactive elements
- `$border` - Dividers and borders

---

### Components & Patterns

**Evaluated Components:**
- Buttons (Primary, Secondary, Tertiary, Ghost, Danger)
- Form inputs (Text, Select, Checkbox, Radio, Toggle)
- Cards and containers
- Navigation (Header, Side nav, Tabs)
- Notifications (Toast, Inline, Modal)
- Data tables
- Loading states
- Empty states

**Component States:**
- Default
- Hover
- Active
- Focus (2px outline, high contrast)
- Disabled
- Error/Warning/Success

**Button Hierarchy:**
```
Primary:   High emphasis, main action
Secondary: Medium emphasis, secondary action
Tertiary:  Low emphasis, alternative action
Ghost:     Minimal emphasis, subtle action
Danger:    Destructive action
```

---

### Iconography

**Icon Sizes:**
- 16px (small UI elements)
- 20px (standard UI)
- 24px (larger UI elements)
- 32px (prominent features)

**Standards:**
- Stroke width: 1.5px for 16px icons
- Consistent visual weight
- 2px padding around icon
- Proper icon-text alignment

---

### Motion & Animation

**Productive Motion** (Fast, Efficient)
- Duration: 70-110ms
- Use: Micro-interactions, state changes
- Easing: Standard (0.2s cubic-bezier)

**Expressive Motion** (Slower, Delightful)
- Duration: 240-400ms
- Use: Page transitions, reveals
- Easing: Entrance/Exit curves

**Motion Tokens:**
```
$duration-fast-01: 70ms
$duration-fast-02: 110ms
$duration-moderate-01: 150ms
$duration-moderate-02: 240ms
$duration-slow-01: 400ms
$duration-slow-02: 700ms
```

---

### Accessibility Standards

**WCAG 2.1 AA Compliance** (IBM Minimum)

**Contrast Ratios:**
- Text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum
- Graphical objects: 3:1 minimum

**Focus Indicators:**
- 2px outline
- High contrast color
- Visible on all interactive elements

**Touch Targets:**
- Minimum: 44x44px
- Recommended: 48x48px

**Keyboard Navigation:**
- All interactive elements accessible
- Logical tab order
- Skip links for navigation
- Escape key to close modals

**Screen Reader Support:**
- Semantic HTML
- ARIA labels where needed
- Alt text for images
- Descriptive link text

---

## 🎯 Critique Categories

The Dungeon Master evaluates interfaces across these Carbon-specific categories:

1. **IBM Plex Typography** - Font family, scale, weights, line height
2. **8px Grid System** - Spacing tokens, alignment, consistency
3. **Color Tokens** - Palette usage, theme compliance, contrast
4. **Carbon Components** - Proper component usage and states
5. **Iconography** - Size standards, visual weight, alignment
6. **Motion Design** - Duration, easing, purposeful animation
7. **Accessibility** - WCAG 2.1 AA compliance, inclusive design
8. **Responsive Design** - Breakpoint usage, mobile-first approach
9. **Content Strategy** - Microcopy, sentence case, action-oriented
10. **Design System Consistency** - Token usage, pattern adherence

---

## 🏆 Carbon-Specific Achievements

### Badges

1. **🛡️ First Quest** - Complete your first IBM IDL design critique
2. **⚛️ Carbon Initiate** - Achieve 80+ score using Carbon components
3. **♿ Accessibility Champion** - Achieve WCAG 2.1 AA compliance (90+ score)
4. **📐 8px Grid Master** - Perfect adherence to Carbon's 8px grid system
5. **📝 IBM Plex Guardian** - Excellent IBM Plex typography implementation
6. **🎨 Color Token Sage** - Master Carbon color tokens and themes
7. **⚡ Productive Designer** - Embody IBM's productive design principle
8. **✨ Expressive Artist** - Balance productivity with expressive delight
9. **🌍 Universal Design Advocate** - Champion inclusive, accessible, global design
10. **💎 Carbon Master** - Achieve 95+ score with full Carbon compliance
11. **⚔️ Veteran Designer** - Complete 10 IBM IDL design critiques
12. **👑 IBM IDL Deity** - Master all IBM Design Language principles

---

## 📚 Resources

### Official Documentation
- [IBM Design Language](https://www.ibm.com/design/language/)
- [Carbon Design System](https://carbondesignsystem.com/)
- [Carbon Components](https://carbondesignsystem.com/components/overview/)
- [Carbon Patterns](https://carbondesignsystem.com/patterns/overview/)
- [IBM Plex Fonts](https://www.ibm.com/plex/)

### Design Tools
- [Carbon Design Kit (Figma)](https://www.figma.com/@carbon)
- [Carbon Design Kit (Sketch)](https://github.com/carbon-design-system/carbon-design-kit)
- [Carbon React Components](https://react.carbondesignsystem.com/)
- [Carbon Web Components](https://web-components.carbondesignsystem.com/)

### Learning Resources
- [Carbon Tutorial](https://carbondesignsystem.com/tutorial/overview)
- [IBM Design Thinking](https://www.ibm.com/design/thinking/)
- [Accessibility Guidelines](https://www.ibm.com/able/)

---

## 🎮 How to Use

1. **Upload Interface Screenshot** - Any UI/UX design
2. **Receive IBM IDL Critique** - Detailed analysis against Carbon standards
3. **Earn XP & Badges** - Progress through Carbon mastery levels
4. **Iterate & Improve** - Apply feedback and re-analyze

### Example Feedback

**Positive:**
> ✅ "The IBM Plex Guardian stands strong - proper type scale and hierarchy detected with 16px body text and 1.5 line height"

**Warning:**
> ⚠️ "Spacing Demons violate the sacred 8px grid - inconsistent 12px margins break the rhythm"

**Critical:**
> 🔴 "Accessibility Curse afflicts your buttons - 3.2:1 contrast fails Carbon's 4.5:1 standard for WCAG AA compliance"

---

## 🔧 Configuration

The system is pre-configured with IBM IDL and Carbon standards. No additional setup required beyond AI provider credentials.

### Supported AI Providers
- **Azure OpenAI** (Recommended for IBM/Enterprise)
- **Anthropic Claude**
- **OpenAI Direct**

---

## 📊 Scoring System

**Design Score (0-100):**
- 95-100: Legendary (Full Carbon compliance)
- 90-94: Excellent (Strong Carbon adherence)
- 80-89: Very Good (Good Carbon usage)
- 70-79: Good (Partial Carbon compliance)
- 60-69: Fair (Needs Carbon improvements)
- Below 60: Needs Work (Major Carbon deviations)

**Accessibility Score (0-100):**
- 90-100: WCAG 2.1 AA+ Compliant
- 80-89: Mostly Accessible
- 70-79: Some Issues
- Below 70: Critical Issues

---

## 🚀 Best Practices

### For Best Results:
1. Upload high-resolution screenshots
2. Include full page context when possible
3. Show interactive states if available
4. Include mobile and desktop views
5. Capture actual Carbon components in use

### Common Issues Detected:
- Non-IBM Plex fonts
- Spacing not on 8px grid
- Non-Carbon color values
- Missing focus indicators
- Insufficient contrast ratios
- Incorrect component states
- Non-standard icon sizes

---

## 🤝 Contributing

Help improve IBM IDL and Carbon evaluation:
- Report false positives/negatives
- Suggest additional evaluation criteria
- Share example interfaces
- Contribute to documentation

---

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ⚔️ for better IBM Design Language compliance**

*"May your grids be 8px, your Plex be IBM, and your contrast ratios be WCAG compliant."*

⚔️ **Enter the Dungeon. Face the Carbon Critique. Emerge Compliant.** 🛡️