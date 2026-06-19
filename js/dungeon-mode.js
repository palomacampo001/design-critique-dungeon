/* ═══════════════════════════════════════════════════════════════════════════
   DUNGEON MODE - DOS RPG Interface Controller
   Handles the authentic DOS RPG experience
   ═══════════════════════════════════════════════════════════════════════════ */

class DungeonMode {
    constructor() {
        this.currentFile = null;
        this.isAnalyzing = false;
        this.init();
    }

    /**
     * Initialize Dungeon Mode
     */
    init() {
        console.log('⚔️ Initializing Dungeon Mode...');
        this.setupEventListeners();
        this.updateCharacterSheet();
        this.updateQuestLog();
        this.typewriterEffect(document.getElementById('dmText'), document.getElementById('dmText').textContent);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // File upload
        document.getElementById('btnUpload').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.handleFileSelect(e);
        });

        // Remove image
        const btnRemove = document.getElementById('btnRemove');
        if (btnRemove) {
            btnRemove.addEventListener('click', () => this.removeImage());
        }

        // Analyze
        const btnAnalyze = document.getElementById('btnAnalyze');
        if (btnAnalyze) {
            btnAnalyze.addEventListener('click', () => this.startAnalysis());
        }

        // Mode switch
        const btnSwitchMode = document.getElementById('btnSwitchMode');
        if (btnSwitchMode) {
            btnSwitchMode.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }

        // Settings
        const btnSettings = document.getElementById('btnSettings');
        if (btnSettings) {
            btnSettings.addEventListener('click', () => this.openSettings());
        }

        const btnCloseSettings = document.getElementById('btnCloseSettings');
        if (btnCloseSettings) {
            btnCloseSettings.addEventListener('click', () => this.closeSettings());
        }

        const btnSaveSettings = document.getElementById('btnSaveSettings');
        if (btnSaveSettings) {
            btnSaveSettings.addEventListener('click', () => this.saveSettings());
        }

        // AI Provider change
        const aiProvider = document.getElementById('aiProvider');
        if (aiProvider) {
            aiProvider.addEventListener('change', (e) => {
                const apiKeySection = document.getElementById('apiKeySection');
                if (apiKeySection) {
                    apiKeySection.style.display = e.target.value === 'demo' ? 'none' : 'block';
                }
            });
        }
    }

    /**
     * Handle file selection
     */
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            this.showDMMessage('That is not a valid design scroll! Please submit an image file.', 'error');
            return;
        }

        this.currentFile = file;
        
        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewImage = document.getElementById('previewImage');
            previewImage.src = e.target.result;
            document.getElementById('imagePreview').style.display = 'block';
            document.getElementById('uploadArea').style.display = 'none';
            
            this.showDMMessage(
                'Excellent! Your design scroll has been received. When you are ready, enter the dungeon to receive your critique and quests.',
                'success'
            );
        };
        reader.readAsDataURL(file);
    }

    /**
     * Remove current image
     */
    removeImage() {
        this.currentFile = null;
        document.getElementById('fileInput').value = '';
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('uploadArea').style.display = 'block';
        
        this.showDMMessage('Your design scroll has been discarded. Submit another when you are ready.', 'info');
    }

    /**
     * Start analysis
     */
    async startAnalysis() {
        if (!this.currentFile) {
            this.showDMMessage('You must submit a design scroll first!', 'error');
            return;
        }

        if (this.isAnalyzing) return;

        this.isAnalyzing = true;

        // Hide upload, show loading
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('loadingState').style.display = 'block';
        document.getElementById('resultsArea').style.display = 'none';

        // Animate loading text
        this.animateLoadingText();

        // Simulate analysis (in real app, this would call AI)
        setTimeout(() => {
            this.completeAnalysis();
        }, 3000);
    }

    /**
     * Animate loading text
     */
    animateLoadingText() {
        const messages = [
            'The Dungeon Master examines your scroll...',
            'Ancient runes begin to glow...',
            'Consulting the Carbon Codex...',
            'Checking IBM Design Language compliance...',
            'Evaluating accessibility standards...',
            'Generating your quests...',
            'Calculating XP rewards...'
        ];

        let index = 0;
        const loadingText = document.getElementById('loadingText');
        
        const interval = setInterval(() => {
            if (!this.isAnalyzing) {
                clearInterval(interval);
                return;
            }

            loadingText.innerHTML = messages.slice(0, index + 1).join('<br>');
            index = (index + 1) % messages.length;
        }, 500);
    }

    /**
     * Complete analysis
     */
    completeAnalysis() {
        this.isAnalyzing = false;

        // Hide loading
        document.getElementById('loadingState').style.display = 'none';

        // Generate mock results
        const results = this.generateMockResults();

        // Show results
        this.displayResults(results);

        // Generate quests
        this.generateQuests(results);

        // Award XP
        this.awardXP(50, 'Design Analysis Completed');

        // Update UI
        this.updateCharacterSheet();
        this.updateQuestLog();

        // Show results area
        document.getElementById('resultsArea').style.display = 'block';
        document.getElementById('uploadArea').style.display = 'block';
    }

    /**
     * Generate mock results (for demo)
     */
    generateMockResults() {
        return {
            score: Math.floor(Math.random() * 30) + 70,
            findings: [
                {
                    category: 'Grid System',
                    severity: 'medium',
                    message: 'Some elements do not align to the 8px grid system',
                    suggestion: 'Ensure all spacing uses 8px increments'
                },
                {
                    category: 'Typography',
                    severity: 'low',
                    message: 'Font sizes could better follow IBM Plex type scale',
                    suggestion: 'Use standard type scale values'
                },
                {
                    category: 'Accessibility',
                    severity: 'high',
                    message: 'Color contrast ratio below WCAG AA standards',
                    suggestion: 'Increase contrast for text elements'
                }
            ]
        };
    }

    /**
     * Display analysis results
     */
    displayResults(results) {
        const resultsDiv = document.getElementById('critiqueResults');
        
        let html = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="font-size: 2rem; color: var(--dos-gold); margin-bottom: 0.5rem;">
                    OVERALL SCORE: ${results.score}/100
                </div>
                <div style="color: var(--dos-text-gray);">
                    ${this.getScoreRank(results.score)}
                </div>
            </div>
            <hr class="dos-divider">
        `;

        results.findings.forEach((finding, index) => {
            const severityColor = {
                high: 'var(--dos-danger-red)',
                medium: 'var(--dos-gold)',
                low: 'var(--dos-health-green)'
            }[finding.severity];

            html += `
                <div style="margin-bottom: 1.5rem;">
                    <div style="color: ${severityColor}; font-weight: bold; margin-bottom: 0.5rem;">
                        ${index + 1}. ${finding.category} [${finding.severity.toUpperCase()}]
                    </div>
                    <div style="color: var(--dos-text-gray); margin-left: 1rem; margin-bottom: 0.5rem;">
                        ${finding.message}
                    </div>
                    <div style="color: var(--dos-magic-cyan); margin-left: 1rem;">
                        → ${finding.suggestion}
                    </div>
                </div>
            `;
        });

        resultsDiv.innerHTML = html;
    }

    /**
     * Get score rank
     */
    getScoreRank(score) {
        if (score >= 90) return '⭐⭐⭐⭐⭐ LEGENDARY';
        if (score >= 80) return '⭐⭐⭐⭐ EXCELLENT';
        if (score >= 70) return '⭐⭐⭐ GOOD';
        if (score >= 60) return '⭐⭐ FAIR';
        return '⭐ NEEDS WORK';
    }

    /**
     * Generate quests from results
     */
    generateQuests(results) {
        if (typeof questIntegration !== 'undefined' && questIntegration.initialized) {
            questIntegration.processAnalysis(results);
        }
    }

    /**
     * Award XP
     */
    awardXP(amount, reason) {
        if (typeof questIntegration !== 'undefined' && questIntegration.initialized) {
            questIntegration.xpSystem.awardXP(amount, reason);
        }
    }

    /**
     * Update character sheet
     */
    updateCharacterSheet() {
        if (typeof questIntegration === 'undefined' || !questIntegration.initialized) return;

        const stats = questIntegration.getPlayerStats();
        if (!stats) return;

        // Update level and title
        document.getElementById('characterLevel').textContent = stats.level;
        document.getElementById('guildRank').textContent = stats.title;

        // Update XP
        document.getElementById('currentXP').textContent = stats.currentXP.toLocaleString();
        document.getElementById('nextLevelXP').textContent = stats.xpToNextLevel.toLocaleString();
        document.getElementById('xpBar').style.width = `${stats.progressPercent}%`;

        // Update quest counts
        document.getElementById('questCount').textContent = stats.questsCompleted;
        document.getElementById('bossCount').textContent = stats.bossesDefeated;

        // Update stats
        document.getElementById('totalXP').textContent = stats.lifetimeXP.toLocaleString();
    }

    /**
     * Update quest log
     */
    updateQuestLog() {
        if (typeof questIntegration === 'undefined' || !questIntegration.initialized) return;

        const questSystem = questIntegration.questSystem;
        const activeQuests = questSystem.getActiveQuests();

        const questsDiv = document.getElementById('activeQuests');

        if (activeQuests.length === 0) {
            questsDiv.innerHTML = `
                <div style="text-align: center; padding: 2rem; font-family: 'VT323', monospace; color: var(--dos-text-dim);">
                    No active quests.<br>
                    Submit a design to receive quests!
                </div>
            `;
            return;
        }

        questsDiv.innerHTML = activeQuests.map(quest => `
            <div class="dos-quest-item ${quest.isBoss ? 'boss-quest' : ''}">
                <div class="dos-quest-title">
                    <span class="dos-quest-icon">${quest.icon}</span>
                    <span style="flex: 1;">${quest.title}</span>
                    <span class="dos-quest-difficulty ${quest.difficulty.toLowerCase()}">${quest.difficulty}</span>
                </div>
                <div class="dos-quest-description">${quest.description}</div>
                <div class="dos-quest-reward">+${quest.xpReward} XP</div>
                <div class="dos-xp-bar" style="margin-top: 0.5rem;">
                    <div class="dos-xp-fill" style="width: ${quest.progress || 0}%; background: ${quest.isBoss ? 'var(--dos-danger-red)' : 'var(--dos-health-green)'}"></div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Show Dungeon Master message
     */
    showDMMessage(message, type = 'info') {
        const dmText = document.getElementById('dmText');
        const dmPrompt = document.getElementById('dmPrompt');

        const typeColors = {
            info: 'var(--dos-text-white)',
            success: 'var(--dos-health-green)',
            error: 'var(--dos-danger-red)',
            warning: 'var(--dos-gold)'
        };

        dmText.style.color = typeColors[type] || typeColors.info;
        this.typewriterEffect(dmText, message);
        
        if (dmPrompt) {
            dmPrompt.style.display = type === 'error' ? 'none' : 'block';
        }
    }

    /**
     * Typewriter effect for text
     */
    typewriterEffect(element, text, speed = 30) {
        element.textContent = '';
        let index = 0;

        const interval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    }

    /**
     * Open settings
     */
    openSettings() {
        document.getElementById('settingsModal').style.display = 'block';
    }

    /**
     * Close settings
     */
    closeSettings() {
        document.getElementById('settingsModal').style.display = 'none';
    }

    /**
     * Save settings
     */
    saveSettings() {
        const provider = document.getElementById('aiProvider').value;
        const apiKey = document.getElementById('apiKey').value;

        // Save to localStorage
        localStorage.setItem('ai_provider', provider);
        if (apiKey) {
            localStorage.setItem('api_key', apiKey);
        }

        this.showDMMessage('Your settings have been saved to the guild records!', 'success');
        this.closeSettings();
    }
}

// Initialize Dungeon Mode when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.dungeonMode = new DungeonMode();
    });
} else {
    window.dungeonMode = new DungeonMode();
}

// Made with Bob
