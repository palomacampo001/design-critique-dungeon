/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN CRITIQUE DUNGEON - Theme Switcher
   Toggle between Dungeon and Carbon themes
   ═══════════════════════════════════════════════════════════════════════════ */

class ThemeSwitcher {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dungeon';
        this.init();
    }
    
    init() {
        // Apply saved theme
        this.applyTheme(this.currentTheme);
        
        // Setup button listener
        const button = document.getElementById('themeSwitcher');
        if (button) {
            button.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dungeon' ? 'carbon' : 'dungeon';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
    
    applyTheme(theme) {
        if (theme === 'carbon') {
            document.body.classList.add('carbon-theme');
            this.updateButtonText('🎮 Dungeon Mode');
        } else {
            document.body.classList.remove('carbon-theme');
            this.updateButtonText('🎨 Carbon Mode');
        }
    }
    
    updateButtonText(text) {
        const button = document.getElementById('themeSwitcher');
        if (button) {
            button.textContent = text;
        }
    }
    
    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Initialize theme switcher
const themeSwitcher = new ThemeSwitcher();

// Made with Bob