/* ═══════════════════════════════════════════════════════════════════════════
   CARBON QUEST - MOBILE APP LOGIC
   Main application controller
   ═══════════════════════════════════════════════════════════════════════════ */

class CarbonQuestApp {
    constructor() {
        this.currentImage = null;
        this.currentResults = null;
        this.currentTheme = localStorage.getItem('theme') || 'carbon';
        
        this.init();
    }
    
    init() {
        this.setupTheme();
        this.updateThemeLanguage(this.currentTheme); // Set initial language
        this.setupUpload();
        this.setupSettings();
        this.setupNavigation();
        this.loadProgress();
    }
    
    /* ─────────────────────────────────────────────────────────────────────
       Theme Management
       ───────────────────────────────────────────────────────────────────── */
    setupTheme() {
        document.body.className = `${this.currentTheme}-theme`;
        
        // Theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Theme options in settings
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = e.target.dataset.theme;
                this.setTheme(theme);
            });
            
            if (btn.dataset.theme === this.currentTheme) {
                btn.classList.add('active');
            }
        });
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'carbon' ? 'dungeon' : 'carbon';
        this.setTheme(newTheme);
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        document.body.className = `${theme}-theme`;
        localStorage.setItem('theme', theme);
        
        // Update active state in settings
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
        
        // Update language for theme
        this.updateThemeLanguage(theme);
    }
    
    updateThemeLanguage(theme) {
        // Update all elements with data attributes for theme-specific text
        document.querySelectorAll('[data-carbon][data-dungeon]').forEach(el => {
            const text = theme === 'carbon' ? el.dataset.carbon : el.dataset.dungeon;
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        });
    }
    
    /* ─────────────────────────────────────────────────────────────────────
       Upload Management
       ───────────────────────────────────────────────────────────────────── */
    setupUpload() {
        const uploadZone = document.getElementById('uploadZone');
        const fileInput = document.getElementById('fileInput');
        const removeBtn = document.getElementById('removeImage');
        const analyzeBtn = document.getElementById('analyzeButton');
        
        // Click to upload
        uploadZone.addEventListener('click', () => fileInput.click());
        
        // File selection
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleImageUpload(file);
            }
        });
        
        // Drag and drop
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = 'var(--color-primary)';
        });
        
        uploadZone.addEventListener('dragleave', () => {
            uploadZone.style.borderColor = '';
        });
        
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = '';
            
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleImageUpload(file);
            }
        });
        
        // Remove image
        if (removeBtn) {
            removeBtn.addEventListener('click', () => this.removeImage());
        }
        
        // Analyze button
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => this.analyzeImage());
        }
    }
    
    handleImageUpload(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            this.currentImage = e.target.result;
            this.showImagePreview(e.target.result);
        };
        
        reader.readAsDataURL(file);
    }
    
    showImagePreview(imageData) {
        const uploadZone = document.getElementById('uploadZone');
        const imagePreview = document.getElementById('imagePreview');
        const previewImage = document.getElementById('previewImage');
        
        uploadZone.style.display = 'none';
        previewImage.src = imageData;
        imagePreview.style.display = 'block';
        
        // Hide results if showing
        document.getElementById('resultsSection').style.display = 'none';
    }
    
    removeImage() {
        this.currentImage = null;
        document.getElementById('uploadZone').style.display = 'flex';
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('fileInput').value = '';
    }
    
    /* ─────────────────────────────────────────────────────────────────────
       Analysis
       ───────────────────────────────────────────────────────────────────── */
    async analyzeImage() {
        if (!this.currentImage) return;
        
        // Show loading
        this.showSection('loading');
        
        // Simulate analysis (replace with actual API call)
        await this.simulateAnalysis();
        
        // Show results
        this.showSection('results');
    }
    
    async simulateAnalysis() {
        // Use demo analyzer
        if (window.DemoAnalyzer) {
            const analyzer = new window.DemoAnalyzer();
            this.currentResults = await analyzer.analyzeImage(this.currentImage);
            this.displayResults(this.currentResults);
        } else {
            // Fallback demo data
            await new Promise(resolve => setTimeout(resolve, 3000));
            this.currentResults = this.getDemoResults();
            this.displayResults(this.currentResults);
        }
    }
    
    displayResults(results) {
        // Overall score
        document.getElementById('overallScore').textContent = Math.round((results.designScore + results.accessibilityScore) / 2);
        document.getElementById('designScore').textContent = results.designScore;
        document.getElementById('accessibilityScore').textContent = results.accessibilityScore;
        
        // Stars
        const avgScore = (results.designScore + results.accessibilityScore) / 2;
        const stars = Math.round(avgScore / 20);
        document.getElementById('scoreStars').textContent = '★'.repeat(stars) + '☆'.repeat(5 - stars);
        
        // Label
        const label = avgScore >= 90 ? 'Excellent' : avgScore >= 75 ? 'Good' : avgScore >= 60 ? 'Fair' : 'Needs Work';
        document.getElementById('scoreLabel').textContent = label;
        
        // Critique cards
        this.displayCritiqueCards(results.findings);
        
        // XP reward
        if (results.xpReward) {
            this.showXPReward(results.xpReward, results.xpMessage);
        }
    }
    
    displayCritiqueCards(findings) {
        const container = document.getElementById('critiqueCards');
        container.innerHTML = '';
        
        // Group findings by category
        const categories = {};
        findings.forEach(finding => {
            if (!categories[finding.category]) {
                categories[finding.category] = [];
            }
            categories[finding.category].push(finding);
        });
        
        // Create cards with theme-appropriate titles
        Object.entries(categories).forEach(([category, items]) => {
            const themeCategory = this.getThemeCategory(category);
            const card = this.createCritiqueCard(themeCategory, items);
            container.appendChild(card);
        });
    }
    
    getThemeCategory(category) {
        if (this.currentTheme === 'dungeon') {
            const dungeonNames = {
                'Visual Hierarchy': 'The Scroll of Hierarchy',
                'Typography': 'The Book of Typography',
                'Accessibility': 'The Tome of Accessibility',
                'Spacing': 'The Sacred Grid',
                'Color': 'The Oracle of Color',
                'Components': 'The Codex of Components',
                'Consistency': 'The Book of Consistency',
                '8px Grid System': 'The Sacred Grid'
            };
            return dungeonNames[category] || category;
        }
        return category;
    }
    
    createCritiqueCard(category, findings) {
        const card = document.createElement('div');
        card.className = 'critique-card';
        
        const icon = findings[0].icon || '📋';
        
        card.innerHTML = `
            <div class="card-header">
                <div class="card-title-group">
                    <span class="card-icon">${icon}</span>
                    <h3 class="card-title">${category}</h3>
                </div>
                <div class="card-toggle">▼</div>
            </div>
            <div class="card-body">
                ${findings.map(f => `
                    <div class="finding-item ${f.type.toLowerCase()}">
                        <div class="finding-title">${f.title}</div>
                        <div class="finding-description">${f.description}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Toggle functionality
        const header = card.querySelector('.card-header');
        header.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
        
        return card;
    }
    
    showXPReward(xp, message) {
        const xpCard = document.getElementById('xpCard');
        document.getElementById('xpAmount').textContent = `+${xp} XP`;
        document.getElementById('xpMessage').textContent = message;
        xpCard.style.display = 'block';
        
        // Update progress
        if (window.gamification) {
            window.gamification.addXP(xp);
            this.updateProgressDisplay();
        }
    }
    
    /* ─────────────────────────────────────────────────────────────────────
       Settings
       ───────────────────────────────────────────────────────────────────── */
    setupSettings() {
        const settingsToggle = document.getElementById('settingsToggle');
        const closeSettings = document.getElementById('closeSettings');
        const drawer = document.getElementById('settingsDrawer');
        const overlay = document.getElementById('drawerOverlay');
        
        settingsToggle.addEventListener('click', () => {
            drawer.classList.add('open');
        });
        
        const closeDrawer = () => {
            drawer.classList.remove('open');
        };
        
        closeSettings.addEventListener('click', closeDrawer);
        overlay.addEventListener('click', closeDrawer);
        
        // AI Provider selection
        const aiProvider = document.getElementById('aiProvider');
        const apiKeyGroup = document.getElementById('apiKeyGroup');
        
        aiProvider.addEventListener('change', (e) => {
            apiKeyGroup.style.display = e.target.value === 'demo' ? 'none' : 'block';
        });
    }
    
    /* ─────────────────────────────────────────────────────────────────────
       Navigation
       ───────────────────────────────────────────────────────────────────── */
    setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.navigateToSection(section);
                
                // Update active state
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });
        
        // Result actions
        const newAnalysisBtn = document.getElementById('newAnalysis');
        if (newAnalysisBtn) {
            newAnalysisBtn.addEventListener('click', () => {
                this.removeImage();
                this.navigateToSection('upload');
            });
        }
    }
    
    navigateToSection(section) {
        // Hide all sections
        document.getElementById('uploadSection').style.display = section === 'upload' ? 'block' : 'none';
        document.getElementById('resultsSection').style.display = section === 'results' ? 'block' : 'none';
        document.getElementById('progressSection').style.display = section === 'progress' ? 'block' : 'none';
        document.getElementById('loadingSection').style.display = 'none';
    }
    
    showSection(section) {
        const sections = {
            upload: 'uploadSection',
            loading: 'loadingSection',
            results: 'resultsSection',
            progress: 'progressSection'
        };
        
        Object.entries(sections).forEach(([key, id]) => {
            document.getElementById(id).style.display = key === section ? 'block' : 'none';
        });
    }
    
    /* ─────────────────────────────────────────────────────────────────────
       Progress Management
       ───────────────────────────────────────────────────────────────────── */
    loadProgress() {
        if (window.gamification) {
            this.updateProgressDisplay();
            this.displayAchievements();
        }
    }
    
    updateProgressDisplay() {
        const stats = window.gamification.getStats();
        
        document.getElementById('playerLevel').textContent = stats.level;
        document.getElementById('currentXP').textContent = stats.xp;
        document.getElementById('nextLevelXP').textContent = stats.nextLevelXP;
        
        const xpPercent = (stats.xp / stats.nextLevelXP) * 100;
        document.getElementById('xpFill').style.width = `${xpPercent}%`;
    }
    
    displayAchievements() {
        const container = document.getElementById('achievementsGrid');
        const badges = window.gamification.badges;
        
        container.innerHTML = badges.map(badge => `
            <div class="achievement-badge ${badge.unlocked ? '' : 'locked'}">
                <div class="badge-icon-large">${badge.icon}</div>
                <div class="badge-name">${badge.name}</div>
            </div>
        `).join('');
    }
    
    /* ─────────────────────────────────────────────────────────────────────
       Demo Data
       ───────────────────────────────────────────────────────────────────── */
    getDemoResults() {
        return {
            designScore: 78,
            accessibilityScore: 85,
            xpReward: 125,
            xpMessage: "Great analysis! Keep improving your designs.",
            findings: [
                {
                    category: "Visual Hierarchy",
                    type: "POSITIVE",
                    title: "Clear Information Architecture",
                    description: "The layout demonstrates good visual hierarchy with proper heading structure.",
                    icon: "👁️"
                },
                {
                    category: "Typography",
                    type: "WARNING",
                    title: "Font Size Inconsistency",
                    description: "Some text elements don't follow the IBM Plex type scale.",
                    icon: "📝"
                },
                {
                    category: "Accessibility",
                    type: "POSITIVE",
                    title: "Good Color Contrast",
                    description: "Text meets WCAG AA standards for contrast ratios.",
                    icon: "♿"
                },
                {
                    category: "Spacing",
                    type: "CRITICAL",
                    title: "Grid System Violations",
                    description: "Several elements don't align to the 8px grid system.",
                    icon: "📐"
                }
            ]
        };
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.carbonQuestApp = new CarbonQuestApp();
    });
} else {
    window.carbonQuestApp = new CarbonQuestApp();
}

// Made with Bob
