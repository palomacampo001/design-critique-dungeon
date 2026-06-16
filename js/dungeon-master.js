/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN CRITIQUE DUNGEON - Dungeon Master
   Persona and feedback generation system
   ═══════════════════════════════════════════════════════════════════════════ */

class DungeonMaster {
    constructor() {
        this.iconMap = {
            'visual hierarchy': '👁️',
            'typography': '📝',
            'spacing': '📐',
            'alignment': '📏',
            'color': '🎨',
            'contrast': '🌓',
            'accessibility': '♿',
            'cta': '🎯',
            'call-to-action': '🎯',
            'cognitive load': '🧠',
            'consistency': '🔄',
            'responsive': '📱',
            'usability': '🛡️',
            'navigation': '🧭',
            'whitespace': '✨',
            'layout': '🏗️'
        };
    }
    
    /**
     * Get appropriate icon for a category
     */
    getIconForCategory(category) {
        const lowerCategory = category.toLowerCase();
        
        for (const [key, icon] of Object.entries(this.iconMap)) {
            if (lowerCategory.includes(key)) {
                return icon;
            }
        }
        
        return '⚔️'; // Default icon
    }
    
    /**
     * Render the complete critique results
     */
    renderCritique(analysisData) {
        const resultsArea = document.getElementById('resultsArea');
        resultsArea.innerHTML = '';
        resultsArea.classList.remove('hidden');
        
        // Create critique header
        const header = this.createCritiqueHeader(analysisData);
        resultsArea.appendChild(header);
        
        // Create findings sections
        const findingsContainer = this.createFindingsContainer(analysisData.findings);
        resultsArea.appendChild(findingsContainer);
        
        // Create XP reward section
        const xpReward = this.createXPReward(analysisData);
        resultsArea.appendChild(xpReward);
        
        // Create action buttons
        const actions = this.createActionButtons();
        resultsArea.appendChild(actions);
        
        // Scroll to results
        resultsArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Add stagger animation to findings
        setTimeout(() => {
            findingsContainer.classList.add('stagger-children');
        }, 100);
    }
    
    /**
     * Create critique header with scores
     */
    createCritiqueHeader(analysisData) {
        const header = document.createElement('div');
        header.className = 'critique-header fade-in';
        
        const designScoreClass = this.getScoreClass(analysisData.designScore);
        const accessibilityScoreClass = this.getScoreClass(analysisData.accessibilityScore);
        
        header.innerHTML = `
            <div class="ascii-divider">
═══════════════════════════════════════════════════════════════════════════
            </div>
            <div class="critique-title">
                ⚔️ DUNGEON MASTER'S VERDICT ⚔️
            </div>
            <div class="dm-text">
                <span class="dm-label">[DUNGEON MASTER]:</span>
                ${analysisData.overallImpression}
            </div>
            <div class="critique-scores">
                <div class="score-card">
                    <div class="score-label">Design Score</div>
                    <div class="score-value ${designScoreClass}">${analysisData.designScore}</div>
                    <div class="score-rating">${this.getScoreRating(analysisData.designScore)}</div>
                </div>
                <div class="score-card">
                    <div class="score-label">Accessibility Score</div>
                    <div class="score-value ${accessibilityScoreClass}">${analysisData.accessibilityScore}</div>
                    <div class="score-rating">${this.getScoreRating(analysisData.accessibilityScore)}</div>
                </div>
            </div>
            <div class="ascii-divider">
═══════════════════════════════════════════════════════════════════════════
            </div>
        `;
        
        return header;
    }
    
    /**
     * Create findings container with all critique items
     */
    createFindingsContainer(findings) {
        const container = document.createElement('div');
        container.className = 'findings-container';
        
        // Group findings by type
        const positive = findings.filter(f => f.type === 'POSITIVE');
        const warnings = findings.filter(f => f.type === 'WARNING');
        const critical = findings.filter(f => f.type === 'CRITICAL');
        
        // Render critical first, then warnings, then positive
        if (critical.length > 0) {
            container.appendChild(this.createFindingsSection('Critical Issues', critical, 'critical'));
        }
        
        if (warnings.length > 0) {
            container.appendChild(this.createFindingsSection('Areas for Improvement', warnings, 'warning'));
        }
        
        if (positive.length > 0) {
            container.appendChild(this.createFindingsSection('Strengths & Victories', positive, 'positive'));
        }
        
        return container;
    }
    
    /**
     * Create a findings section
     */
    createFindingsSection(title, findings, type) {
        const section = document.createElement('div');
        section.className = 'critique-section';
        
        const iconMap = {
            'critical': '🔴',
            'warning': '⚠️',
            'positive': '✅'
        };
        
        section.innerHTML = `
            <div class="section-header">
                <span class="section-icon">${iconMap[type]}</span>
                <h3 class="section-title">${title}</h3>
            </div>
            <div class="section-content">
                ${findings.map(finding => this.createFindingItem(finding)).join('')}
            </div>
        `;
        
        return section;
    }
    
    /**
     * Create individual finding item
     */
    createFindingItem(finding) {
        const icon = finding.icon || this.getIconForCategory(finding.category);
        
        return `
            <div class="finding ${finding.type.toLowerCase()}">
                <div class="finding-header">
                    <span class="finding-icon">${icon}</span>
                    <span class="finding-title">${finding.title}</span>
                </div>
                <div class="finding-description">${finding.description}</div>
            </div>
        `;
    }
    
    /**
     * Create XP reward section
     */
    createXPReward(analysisData) {
        const xpReward = document.createElement('div');
        xpReward.className = 'xp-reward';
        
        xpReward.innerHTML = `
            <div class="ascii-divider">
═══════════════════════════════════════════════════════════════════════════
            </div>
            <div class="xp-reward-title">⚡ EXPERIENCE GAINED ⚡</div>
            <div class="xp-amount">+${analysisData.xpReward} XP</div>
            <div class="xp-message">${analysisData.xpMessage}</div>
            <div class="ascii-divider">
═══════════════════════════════════════════════════════════════════════════
            </div>
        `;
        
        return xpReward;
    }
    
    /**
     * Create action buttons
     */
    createActionButtons() {
        const actions = document.createElement('div');
        actions.className = 'action-buttons';
        
        actions.innerHTML = `
            <button class="btn-primary" onclick="location.reload()">
                <span class="btn-icon">🔄</span>
                Analyze Another Interface
            </button>
            <button class="btn-secondary" onclick="dungeonMaster.exportReport()">
                <span class="btn-icon">📄</span>
                Export Report
            </button>
            <button class="btn-secondary" onclick="dungeonMaster.shareResults()">
                <span class="btn-icon">🔗</span>
                Share Results
            </button>
        `;
        
        return actions;
    }
    
    /**
     * Get CSS class for score
     */
    getScoreClass(score) {
        if (score >= 90) return 'excellent';
        if (score >= 75) return 'good';
        if (score >= 60) return 'fair';
        return 'poor';
    }
    
    /**
     * Get rating text for score
     */
    getScoreRating(score) {
        if (score >= 95) return 'Legendary';
        if (score >= 90) return 'Excellent';
        if (score >= 80) return 'Very Good';
        if (score >= 70) return 'Good';
        if (score >= 60) return 'Fair';
        if (score >= 50) return 'Needs Work';
        return 'Critical';
    }
    
    /**
     * Export critique report
     */
    exportReport() {
        const resultsArea = document.getElementById('resultsArea');
        const content = resultsArea.innerText;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `design-critique-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Report exported successfully! 📄', 'success');
    }
    
    /**
     * Share results (copy to clipboard)
     */
    shareResults() {
        const resultsArea = document.getElementById('resultsArea');
        const content = resultsArea.innerText;
        
        navigator.clipboard.writeText(content).then(() => {
            this.showNotification('Results copied to clipboard! 📋', 'success');
        }).catch(() => {
            this.showNotification('Failed to copy results', 'error');
        });
    }
    
    /**
     * Show notification message
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'notification notification-enter';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--terminal-bg-light);
            border: 2px solid ${type === 'success' ? 'var(--terminal-green)' : 'var(--terminal-red)'};
            padding: var(--spacing-md) var(--spacing-lg);
            z-index: 10000;
            box-shadow: var(--shadow-deep);
            color: var(--text-primary);
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
    
    /**
     * Generate loading messages
     */
    getLoadingMessages() {
        return [
            'The Dungeon Master examines your interface...',
            'Scanning for Alignment Goblins...',
            'Testing accessibility enchantments...',
            'Evaluating typography spells...',
            'Measuring whitespace magic...',
            'Analyzing color harmony...',
            'Checking CTA guardian strength...',
            'Assessing cognitive load...',
            'Validating design system consistency...',
            'Preparing your verdict...'
        ];
    }
    
    /**
     * Animate loading text
     */
    animateLoadingText() {
        const loadingText = document.getElementById('loadingText');
        const messages = this.getLoadingMessages();
        let index = 0;
        
        const interval = setInterval(() => {
            if (!document.getElementById('loadingState').classList.contains('hidden')) {
                loadingText.textContent = messages[index];
                index = (index + 1) % messages.length;
            } else {
                clearInterval(interval);
            }
        }, 2000);
        
        return interval;
    }
}

// Initialize Dungeon Master
const dungeonMaster = new DungeonMaster();

// Made with Bob
