/* ═══════════════════════════════════════════════════════════════════════════
   CARBON MODE - Professional IBM Carbon Design System Interface Controller
   Executive-level design critique experience
   ═══════════════════════════════════════════════════════════════════════════ */

class CarbonMode {
    constructor() {
        this.currentFile = null;
        this.isAnalyzing = false;
        this.init();
    }

    /**
     * Initialize Carbon Mode
     */
    init() {
        console.log('💎 Initializing Carbon Mode...');
        this.setupEventListeners();
        this.updateProgressCard();
        this.updateQuestCards();
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
                window.location.href = 'index-dungeon.html';
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

        const btnCancelSettings = document.getElementById('btnCancelSettings');
        if (btnCancelSettings) {
            btnCancelSettings.addEventListener('click', () => this.closeSettings());
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

        // Export
        const btnExport = document.getElementById('btnExport');
        if (btnExport) {
            btnExport.addEventListener('click', () => this.exportReport());
        }
    }

    /**
     * Handle file selection
     */
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            this.showNotification('Please select a valid image file', 'error');
            return;
        }

        this.currentFile = file;
        
        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewImage = document.getElementById('previewImage');
            previewImage.src = e.target.result;
            document.getElementById('imagePreview').style.display = 'block';
            
            this.showNotification('Design file uploaded successfully', 'success');
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
        
        this.showNotification('Design file removed', 'info');
    }

    /**
     * Start analysis
     */
    async startAnalysis() {
        if (!this.currentFile) {
            this.showNotification('Please upload a design file first', 'error');
            return;
        }

        if (this.isAnalyzing) return;

        this.isAnalyzing = true;

        // Hide upload, show loading
        document.getElementById('uploadCard').style.display = 'none';
        document.getElementById('loadingState').style.display = 'block';
        document.getElementById('resultsCard').style.display = 'none';

        // Animate loading messages
        this.animateLoadingMessages();

        // Simulate analysis (in real app, this would call AI)
        setTimeout(() => {
            this.completeAnalysis();
        }, 3000);
    }

    /**
     * Animate loading messages
     */
    animateLoadingMessages() {
        const messages = [
            'Evaluating Carbon compliance',
            'Checking IBM Design Language principles',
            'Analyzing accessibility standards',
            'Reviewing component usage',
            'Calculating design quality score'
        ];

        let index = 0;
        const loadingMessage = document.getElementById('loadingMessage');
        
        const interval = setInterval(() => {
            if (!this.isAnalyzing) {
                clearInterval(interval);
                return;
            }

            loadingMessage.textContent = messages[index];
            index = (index + 1) % messages.length;
        }, 600);
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
        this.updateProgressCard();
        this.updateQuestCards();

        // Show results
        document.getElementById('resultsCard').style.display = 'block';
        document.getElementById('uploadCard').style.display = 'block';

        this.showNotification('Analysis complete', 'success');
    }

    /**
     * Generate mock results (for demo)
     */
    generateMockResults() {
        const score = Math.floor(Math.random() * 30) + 70;
        return {
            overallScore: score,
            designScore: Math.floor(Math.random() * 20) + 75,
            carbonScore: Math.floor(Math.random() * 20) + 70,
            accessibilityScore: Math.floor(Math.random() * 20) + 80,
            findings: [
                {
                    category: 'Grid System',
                    severity: 'medium',
                    message: 'Some elements do not align to the 8px grid system',
                    suggestion: 'Ensure all spacing uses 8px increments (8, 16, 24, 32, etc.)',
                    impact: 'Visual consistency'
                },
                {
                    category: 'Typography',
                    severity: 'low',
                    message: 'Font sizes could better follow IBM Plex type scale',
                    suggestion: 'Use standard type scale values from Carbon Design System',
                    impact: 'Readability and hierarchy'
                },
                {
                    category: 'Accessibility',
                    severity: 'high',
                    message: 'Color contrast ratio below WCAG AA standards',
                    suggestion: 'Increase contrast to meet minimum 4.5:1 ratio for normal text',
                    impact: 'User accessibility'
                },
                {
                    category: 'Components',
                    severity: 'medium',
                    message: 'Custom components used instead of Carbon components',
                    suggestion: 'Replace with standard Carbon components for consistency',
                    impact: 'Design system compliance'
                }
            ]
        };
    }

    /**
     * Display analysis results
     */
    displayResults(results) {
        // Update scores
        document.getElementById('overallScore').textContent = results.overallScore;
        document.getElementById('designScore').textContent = results.designScore;
        document.getElementById('carbonScore').textContent = results.carbonScore;
        document.getElementById('accessibilityScore').textContent = results.accessibilityScore;

        // Display findings
        const findingsSection = document.getElementById('findingsSection');
        
        let html = '<h3 class="carbon-heading-03" style="margin-bottom: 1rem;">Findings & Recommendations</h3>';

        results.findings.forEach((finding, index) => {
            const severityColors = {
                high: 'var(--carbon-support-error)',
                medium: 'var(--carbon-support-warning)',
                low: 'var(--carbon-support-info)'
            };

            const severityTags = {
                high: 'carbon-tag-red',
                medium: 'carbon-tag-yellow',
                low: 'carbon-tag-blue'
            };

            html += `
                <div class="carbon-notification carbon-notification-${finding.severity === 'high' ? 'error' : finding.severity === 'medium' ? 'warning' : 'info'}" style="margin-bottom: 1rem;">
                    <div class="carbon-notification-icon">
                        ${finding.severity === 'high' ? '⚠️' : finding.severity === 'medium' ? '⚡' : 'ℹ️'}
                    </div>
                    <div class="carbon-notification-content">
                        <div class="carbon-notification-title">
                            ${finding.category}
                            <span class="carbon-tag ${severityTags[finding.severity]}" style="margin-left: 0.5rem;">
                                ${finding.severity.toUpperCase()}
                            </span>
                        </div>
                        <div class="carbon-notification-subtitle" style="margin-top: 0.5rem;">
                            <strong>Issue:</strong> ${finding.message}
                        </div>
                        <div class="carbon-notification-subtitle" style="margin-top: 0.5rem;">
                            <strong>Recommendation:</strong> ${finding.suggestion}
                        </div>
                        <div class="carbon-notification-subtitle" style="margin-top: 0.5rem; color: var(--carbon-text-helper);">
                            <strong>Impact:</strong> ${finding.impact}
                        </div>
                    </div>
                </div>
            `;
        });

        findingsSection.innerHTML = html;
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
     * Update progress card
     */
    updateProgressCard() {
        if (typeof questIntegration === 'undefined' || !questIntegration.initialized) return;

        const stats = questIntegration.getPlayerStats();
        if (!stats) return;

        // Update level and title
        document.getElementById('playerLevel').textContent = stats.level;
        document.getElementById('playerTitle').textContent = stats.title;

        // Update XP
        document.getElementById('currentXP').textContent = stats.currentXP.toLocaleString();
        document.getElementById('nextLevelXP').textContent = stats.xpToNextLevel.toLocaleString();
        document.getElementById('xpBar').style.width = `${stats.progressPercent}%`;

        // Update stats
        document.getElementById('questsCompleted').textContent = stats.questsCompleted;
        document.getElementById('bossesDefeated').textContent = stats.bossesDefeated;
        document.getElementById('totalXP').textContent = stats.lifetimeXP.toLocaleString();
    }

    /**
     * Update quest cards
     */
    updateQuestCards() {
        if (typeof questIntegration === 'undefined' || !questIntegration.initialized) return;

        const questSystem = questIntegration.questSystem;
        const activeQuests = questSystem.getActiveQuests();

        const questsDiv = document.getElementById('activeQuests');

        if (activeQuests.length === 0) {
            questsDiv.innerHTML = `
                <p class="carbon-body-01" style="color: var(--carbon-text-secondary); text-align: center; padding: 2rem 0;">
                    Complete an analysis to unlock challenges
                </p>
            `;
            return;
        }

        questsDiv.innerHTML = activeQuests.map(quest => `
            <div class="carbon-quest-card">
                <div class="carbon-quest-card-header">
                    <div class="carbon-quest-card-title">
                        <span>${quest.icon}</span>
                        <span>${quest.title}</span>
                    </div>
                    <div class="carbon-quest-card-xp">+${quest.xpReward} XP</div>
                </div>
                <div class="carbon-quest-card-description">${quest.description}</div>
                <span class="carbon-tag carbon-tag-${quest.difficulty === 'Easy' ? 'green' : quest.difficulty === 'Medium' ? 'yellow' : quest.difficulty === 'Hard' ? 'red' : 'purple'}">
                    ${quest.difficulty}
                </span>
                <div class="carbon-quest-card-progress">
                    <div class="carbon-quest-card-progress-label">
                        <span>Progress</span>
                        <span>${quest.progress || 0}%</span>
                    </div>
                    <div class="carbon-progress-bar">
                        <div class="carbon-progress-fill ${quest.progress >= 100 ? 'carbon-progress-fill-success' : ''}" style="width: ${quest.progress || 0}%"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `carbon-notification carbon-notification-${type}`;
        notification.style.cssText = 'position: fixed; top: 4rem; right: 1rem; z-index: 10000; max-width: 400px; animation: slideIn 0.3s ease;';
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        notification.innerHTML = `
            <div class="carbon-notification-icon">${icons[type]}</div>
            <div class="carbon-notification-content">
                <div class="carbon-notification-title">${message}</div>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
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

        this.showNotification('Settings saved successfully', 'success');
        this.closeSettings();
    }

    /**
     * Export report
     */
    exportReport() {
        this.showNotification('Report export feature coming soon', 'info');
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize Carbon Mode when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.carbonMode = new CarbonMode();
    });
} else {
    window.carbonMode = new CarbonMode();
}

// Made with Bob
