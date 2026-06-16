# 🗡️ Design Critique Dungeon - Setup Guide

Complete guide to getting started with the Design Critique Dungeon.

## 📋 Prerequisites

Before you begin, ensure you have:

1. **OpenAI API Key** with GPT-4o access
   - Sign up at [OpenAI Platform](https://platform.openai.com/)
   - Navigate to [API Keys](https://platform.openai.com/api-keys)
   - Create a new API key
   - Ensure you have credits/billing set up

2. **Modern Web Browser**
   - Chrome 90+
   - Firefox 88+
   - Safari 14+
   - Edge 90+

3. **Local Web Server** (choose one):
   - Python 3.x
   - Node.js
   - PHP
   - VS Code Live Server extension

## 🚀 Installation Steps

### Step 1: Download the Project

```bash
# Clone the repository
git clone https://github.com/yourusername/design-critique-dungeon.git

# Navigate to the project directory
cd design-critique-dungeon
```

Or download and extract the ZIP file.

### Step 2: Project Structure

Verify your project has this structure:

```
design-critique-dungeon/
├── index.html
├── css/
│   ├── main.css
│   ├── terminal.css
│   └── animations.css
├── js/
│   ├── config.js
│   ├── gamification.js
│   ├── dungeon-master.js
│   ├── ai-analyzer.js
│   └── app.js
├── README.md
└── SETUP_GUIDE.md
```

### Step 3: Start Local Server

Choose your preferred method:

#### Option A: Python

```bash
# Python 3
python -m http.server 8000

# Python 2 (if needed)
python -m SimpleHTTPServer 8000
```

#### Option B: Node.js

```bash
# Install serve globally (one-time)
npm install -g serve

# Run server
serve -p 8000
```

#### Option C: PHP

```bash
php -S localhost:8000
```

#### Option D: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

### Step 4: Open in Browser

Navigate to:
```
http://localhost:8000
```

## ⚙️ Configuration

### First-Time Setup

1. **Open the Application**
   - You'll see a welcome message from the Dungeon Master
   - A prompt will ask you to configure your API key

2. **Add Your API Key**
   - Click the ⚙️ settings button (bottom-right corner)
   - Paste your OpenAI API key
   - Click "Save Configuration"
   - The system will test your connection

3. **Verify Setup**
   - If successful, you'll see: "✅ Configuration saved successfully!"
   - If failed, check your API key and internet connection

### API Key Storage

- Your API key is stored **locally** in your browser's localStorage
- It is **never sent to any server** except OpenAI's API
- You can clear it anytime by clearing browser data

## 🎮 How to Use

### Basic Workflow

1. **Upload Screenshot**
   - Drag & drop an image onto the upload zone
   - Or click to browse and select a file
   - Supported formats: PNG, JPG, WebP
   - Max size: 10MB

2. **Start Analysis**
   - Click "⚔️ ENTER THE DUNGEON 🗡️"
   - Wait for the AI analysis (15-30 seconds)
   - Watch the loading messages for entertainment

3. **Review Feedback**
   - Read the Dungeon Master's overall impression
   - Check your Design Score and Accessibility Score
   - Review detailed findings by category
   - Note positive strengths and areas for improvement

4. **Earn Rewards**
   - Gain XP based on your design quality
   - Level up and unlock new titles
   - Earn badges for achievements
   - Track progress in the stats panel

5. **Iterate**
   - Click "Analyze Another Interface"
   - Upload improved versions
   - Track your improvement over time

### Understanding Scores

#### Design Score (0-100)
- **95-100**: Legendary - Exceptional design
- **90-94**: Excellent - Very strong design
- **80-89**: Very Good - Solid design with minor issues
- **70-79**: Good - Decent design, room for improvement
- **60-69**: Fair - Needs significant work
- **Below 60**: Critical - Major issues to address

#### Accessibility Score (0-100)
- Based on WCAG 2.1 guidelines
- Considers contrast ratios, semantic HTML, keyboard navigation
- 90+ earns bonus XP and badges

### XP & Leveling System

#### XP Sources
- **Base XP**: 50 XP per analysis
- **Design Quality Bonus**: Up to 100 XP for excellent designs
- **Accessibility Bonus**: 75 XP for 90+ accessibility score

#### Level Progression
1. **Level 1** - Novice Apprentice (0 XP)
2. **Level 2** - Junior Designer (100 XP)
3. **Level 3** - Skilled Craftsperson (250 XP)
4. **Level 4** - Design Warrior (500 XP)
5. **Level 5** - UX Specialist (1000 XP)
6. **Level 6** - Master Designer (2000 XP)
7. **Level 7** - Design Sage (3500 XP)
8. **Level 8** - Legendary Architect (5500 XP)
9. **Level 9** - Grand Master (8000 XP)
10. **Level 10** - UX Deity (12000 XP)

### Badges & Achievements

- 🛡️ **First Quest** - Complete your first analysis
- ♿ **Accessibility Champion** - Achieve 90+ accessibility score
- 📐 **Alignment Master** - Receive praise for perfect alignment
- 🎨 **Color Sage** - Master color contrast and harmony
- 📝 **Typography Expert** - Achieve excellent typography 3 times
- ⚔️ **Veteran Designer** - Complete 10 analyses
- ✨ **Perfectionist** - Achieve a perfect 100 score
- 🔄 **Consistency Guardian** - Maintain design system consistency

## 🔧 Troubleshooting

### Common Issues

#### "API request failed"
**Solution:**
- Verify your API key is correct
- Check you have credits in your OpenAI account
- Ensure you have GPT-4o access
- Check your internet connection

#### "Invalid file type"
**Solution:**
- Only PNG, JPG, and WebP are supported
- Ensure file is under 10MB
- Try converting to PNG if issues persist

#### "Could not parse JSON from response"
**Solution:**
- This is usually temporary
- Try the analysis again
- If persistent, check OpenAI API status

#### Images not loading
**Solution:**
- Ensure you're running a local server (not opening file:// directly)
- Check browser console for errors
- Try a different browser

#### Stats not saving
**Solution:**
- Check browser localStorage is enabled
- Don't use private/incognito mode
- Clear browser cache and try again

### Browser Console

For debugging, open browser console:
- **Chrome/Edge**: F12 or Ctrl+Shift+J (Cmd+Option+J on Mac)
- **Firefox**: F12 or Ctrl+Shift+K (Cmd+Option+K on Mac)
- **Safari**: Cmd+Option+C

Look for error messages and check the network tab for API calls.

## 🔒 Privacy & Security

### Data Handling
- **Images**: Sent only to OpenAI's API for analysis
- **API Key**: Stored locally in browser, never sent to our servers
- **Stats**: Stored locally in browser localStorage
- **No Server**: This is a client-side only application

### Best Practices
- Don't share your API key
- Don't analyze sensitive/confidential interfaces
- Rotate your API key periodically
- Monitor your OpenAI usage dashboard

## 💡 Tips for Best Results

### Screenshot Quality
- Use high-resolution screenshots (1920x1080 or higher)
- Capture full page or complete sections
- Ensure text is readable
- Include context (don't crop too tightly)

### What to Analyze
✅ **Good candidates:**
- Landing pages
- Dashboard interfaces
- Mobile app screens
- Form designs
- Navigation menus
- Product pages

❌ **Less effective:**
- Wireframes (too low fidelity)
- Prototypes with placeholder content
- Partial screenshots
- Very small UI elements

### Interpreting Feedback
- Focus on patterns across multiple analyses
- Prioritize critical issues first
- Use warnings as learning opportunities
- Celebrate positive feedback
- Track improvement over time

## 🎯 Advanced Usage

### Keyboard Shortcuts
- **Escape**: Close settings modal
- **Ctrl/Cmd + R**: Reload page (start fresh)

### Exporting Reports
- Click "📄 Export Report" to download as text file
- Click "🔗 Share Results" to copy to clipboard
- Use for documentation or team reviews

### Resetting Progress
Open browser console and run:
```javascript
gamificationSystem.resetProgress()
```

## 📊 API Usage & Costs

### Estimated Costs (as of 2026)
- GPT-4o: ~$0.005-0.015 per analysis
- Depends on image size and response length
- More cost-effective than previous vision models
- Monitor usage in OpenAI dashboard

### Rate Limits
- Free tier: 3 requests/minute
- Paid tier: Higher limits based on plan
- If you hit limits, wait a minute and retry

## 🆘 Getting Help

### Resources
- **README.md**: Project overview
- **GitHub Issues**: Report bugs or request features
- **OpenAI Docs**: [platform.openai.com/docs](https://platform.openai.com/docs)

### Community
- Share your results on social media with #DesignCritiqueDungeon
- Contribute improvements via pull requests
- Report issues on GitHub

## 🎉 You're Ready!

You've completed the setup. Now:

1. Upload your first interface screenshot
2. Enter the dungeon
3. Receive your critique
4. Level up your design skills

**May your interfaces be accessible, your hierarchies clear, and your padding consistent!**

⚔️ **Enter the Dungeon. Face the Critique. Emerge Victorious.** 🛡️