# 🗡️ DESIGN CRITIQUE DUNGEON

> *"Enter the dungeon, brave designer. Your interface awaits judgment by IBM Design Language and Carbon Design System standards."*


## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed ([Download here](https://nodejs.org/))
- An AI provider API key (Azure OpenAI, Anthropic Claude, or OpenAI)

### Installation & Running

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   npm start
   ```

3. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Click the ⚙️ settings button to configure your AI provider
   - Upload an interface screenshot and start analyzing!

### 🌐 Deploy Online

The application now includes a **proxy server** that solves CORS issues for online deployment:

- ✅ Works on any hosting platform (Heroku, Railway, Render, Vercel)
- ✅ Handles large image uploads (up to 10MB)
- ✅ Secure API key management
- ✅ No CORS errors

📖 **[Read the Deployment Guide →](./DEPLOYMENT_GUIDE.md)** for step-by-step instructions.

An AI-powered UX critique platform that analyzes UI screenshots through the persona of a retro fantasy RPG Dungeon Master. Combining serious UX analysis based on **IBM Design Language (IDL)** and **Carbon Design System** with gamification and atmospheric terminal aesthetics.

## 🎨 IBM IDL & Carbon Design System Integration

All critiques are now based on IBM's official design standards:
- ✅ **IBM Design Language** - Productive, Expressive, and Universal design principles
- ✅ **Carbon Design System** - Components, patterns, and tokens
- ✅ **8px Grid System** - Spacing and layout standards
- ✅ **IBM Plex Typography** - Font family and type scale
- ✅ **Carbon Color Tokens** - Palette and theme compliance
- ✅ **WCAG 2.1 AA** - IBM's minimum accessibility standard

📖 **[Read the full IBM IDL & Carbon Integration Guide →](./IBM_CARBON_INTEGRATION.md)**

## ✨ Features

### Dual Analysis Modes

#### 🎨 UI/UX Interface Design (IBM IDL & Carbon Focus)
- **IBM Plex Typography** - Font family, type scale, line height, weights
- **8px Grid System** - Spacing tokens, alignment, layout consistency
- **Carbon Color Tokens** - Palette usage, theme compliance, contrast ratios
- **Carbon Components** - Proper component usage, states, and patterns
- **Accessibility Evaluation** - WCAG 2.1 AA compliance (IBM minimum standard)
- **IBM IDL Principles** - Productive, Expressive, and Universal design
- **Iconography Standards** - Size compliance (16px, 20px, 24px, 32px)
- **Motion Design** - Productive (70-110ms) and Expressive (240-400ms) motion
- **Responsive Design** - Carbon breakpoints and mobile-first approach
- **Content Strategy** - Microcopy, sentence case, action-oriented labels

#### 📄 Production Readiness Check (Print & Digital Assets)
- **File Setup** - Naming conventions, artboard setup, color space, units
- **Image Quality** - PPI requirements (300 for print, 150 for banners, 72 for web)
- **Layout & Typography** - Alignment, grid snapping, black vs. rich black, no widows/orphans
- **Design Finalization** - Links, fonts, colors, layers, pasteboard cleanup
- **Print Specifications** - Bleed, crop marks, PDF export settings, production notes
- **Quality Assurance** - Spell check, error detection, packaging for delivery

### Gamification
- **XP System** - Earn experience for good design practices
- **Level Progression** - Advance from "Novice Apprentice" to "Legendary UX Architect"
- **Design Score** - Overall interface quality rating
- **Accessibility Score** - Separate accessibility compliance rating
- **Unlockable Titles** - Achievement-based badges
- **Quest Completion** - Design challenge tracking

### Dungeon Master Persona
Feedback delivered as:
- "⚔️ Alignment Goblins detected inconsistent padding"
- "🛡️ Accessibility Curse afflicts your footer contrast"
- "✨ Legendary whitespace grants clarity to travelers"
- "🎯 The CTA Guardian stands strong and visible"

## 🎮 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **AI Providers** (choose one):
  - **Azure OpenAI** - Recommended for Enterprise/Copilot users
  - **Anthropic Claude** - Latest AI with strong reasoning
  - **OpenAI Direct** - Original GPT-4o access
- **Styling**: Custom CSS with terminal aesthetics
- **No Framework**: Pure web technologies for maximum control

## 🚀 Quick Start

### Prerequisites
- AI provider credentials (choose one):
  - **Azure OpenAI** - [Setup Guide](./AZURE_SETUP.md) ⭐ Recommended for enterprise
  - **Anthropic Claude** - Get key at [console.anthropic.com](https://console.anthropic.com)
  - **OpenAI Direct** - Get key at [platform.openai.com](https://platform.openai.com)
- Modern web browser
- Local web server

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/design-critique-dungeon.git
cd design-critique-dungeon
```

2. Run locally:
```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx serve

# Option 3: PHP
php -S localhost:8000
```

3. Open `http://localhost:8000` in your browser

4. Configure your AI provider:
   - Click the **⚙️ Settings** button
   - Select your AI provider
   - Enter your credentials
   - Save configuration

### Provider Setup Guides
- 📘 [Azure OpenAI Setup](./AZURE_SETUP.md) - For enterprise/Copilot users
- 📊 [Provider Comparison](./PROVIDER_COMPARISON.md) - Compare all options

## 📖 Usage

1. **Upload Screenshot** - Drag & drop or click to upload UI screenshots
2. **Initiate Analysis** - Click "Enter the Dungeon" to begin critique
3. **Receive Feedback** - Get detailed analysis in dungeon master style
4. **Earn Rewards** - Gain XP, level up, unlock titles
5. **Iterate** - Upload improved versions to track progress

## 🎨 Visual Style

- **Retro Terminal** - IBM/UNIX inspired interface
- **ASCII Art** - Dividers, borders, decorative elements
- **Minimal Palette** - Green/amber terminal colors with strategic accents
- **Premium Typography** - Monospace fonts with careful hierarchy
- **Cyberpunk Fantasy** - Blend of sci-fi and medieval aesthetics

## 🏗️ Project Structure

```
design-critique-dungeon/
├── index.html              # Main application
├── css/
│   ├── main.css           # Core styles
│   ├── terminal.css       # Terminal aesthetics
│   └── animations.css     # Transitions & effects
├── js/
│   ├── app.js             # Main application logic
│   ├── ai-analyzer.js     # OpenAI integration
│   ├── gamification.js    # XP, levels, badges
│   ├── dungeon-master.js  # Persona & feedback generation
│   └── config.js          # Configuration
├── assets/
│   ├── ascii/             # ASCII art elements
│   └── sounds/            # Optional sound effects
└── README.md
```

## 🎯 Roadmap

### Phase 1 (Current)
- [x] Core UI upload and analysis
- [x] AI-powered critique generation
- [x] Gamification system
- [x] Retro terminal aesthetic

### Phase 2 (Planned)
- [ ] Figma plugin integration
- [ ] Team critique mode
- [ ] Design system validation
- [ ] Historical score tracking
- [ ] Exportable PDF reports

### Phase 3 (Future)
- [ ] AI-generated redesign suggestions
- [ ] Collaborative review sessions
- [ ] Design challenge library
- [ ] Community leaderboards

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines and submit pull requests.

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Inspired by classic RPGs and terminal interfaces
- Built with modern UX principles
- Powered by Azure OpenAI, Anthropic Claude, and OpenAI GPT-4o

## 📧 Contact

Questions? Feedback? Open an issue or reach out!

---

*"May your interfaces be accessible, your hierarchies clear, and your padding consistent."*

**⚔️ Enter the Dungeon. Face the Critique. Emerge Victorious. 🛡️**