/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN CRITIQUE DUNGEON - Gamification System
   XP, levels, badges, and player progression
   ═══════════════════════════════════════════════════════════════════════════ */

class GamificationSystem {
    constructor() {
        this.playerStats = this.loadPlayerStats();
        this.unlockedBadges = this.loadUnlockedBadges();
        this.init();
    }
    
    /**
     * Initialize the gamification system
     */
    init() {
        this.updateStatsDisplay();
        this.updateBadgesDisplay();
    }
    
    /**
     * Load player stats from localStorage
     */
    loadPlayerStats() {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.PLAYER_STATS);
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Default stats - IBM IDL & Carbon Design System tracking
        return {
            totalXP: 0,
            level: 1,
            title: 'Novice Apprentice',
            dungeonsCleared: 0,
            totalScore: 0,
            highestScore: 0,
            highestAccessibilityScore: 0,
            perfectScoreCount: 0,
            excellentTypographyCount: 0,
            excellentColorScore: 0,
            perfectAlignmentCount: 0,
            consistencyPraiseCount: 0,
            // Carbon Design System specific stats
            carbonCompliantCount: 0,
            perfectGridCount: 0,
            productiveDesignCount: 0,
            expressiveDesignCount: 0,
            universalDesignCount: 0
        };
    }
    
    /**
     * Load unlocked badges from localStorage
     */
    loadUnlockedBadges() {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.UNLOCKED_BADGES);
        if (saved) {
            return JSON.parse(saved);
        }
        return [];
    }
    
    /**
     * Save player stats to localStorage
     */
    savePlayerStats() {
        localStorage.setItem(
            CONFIG.STORAGE_KEYS.PLAYER_STATS,
            JSON.stringify(this.playerStats)
        );
    }
    
    /**
     * Save unlocked badges to localStorage
     */
    saveUnlockedBadges() {
        localStorage.setItem(
            CONFIG.STORAGE_KEYS.UNLOCKED_BADGES,
            JSON.stringify(this.unlockedBadges)
        );
    }
    
    /**
     * Award XP to the player
     */
    awardXP(amount, reason = '') {
        const oldXP = this.playerStats.totalXP;
        this.playerStats.totalXP += amount;
        
        // Check for level up
        const leveledUp = ConfigHelper.checkLevelUp(oldXP, this.playerStats.totalXP);
        
        if (leveledUp) {
            const levelInfo = ConfigHelper.getLevelInfo(this.playerStats.totalXP);
            this.playerStats.level = levelInfo.level;
            this.playerStats.title = levelInfo.title;
            this.showLevelUpNotification(levelInfo);
        }
        
        this.savePlayerStats();
        this.updateStatsDisplay();
        
        return leveledUp;
    }
    
    /**
     * Record a completed analysis
     */
    recordAnalysis(analysisData) {
        this.playerStats.dungeonsCleared++;
        this.playerStats.totalScore += analysisData.designScore;
        
        // Update highest scores
        if (analysisData.designScore > this.playerStats.highestScore) {
            this.playerStats.highestScore = analysisData.designScore;
        }
        
        if (analysisData.accessibilityScore > this.playerStats.highestAccessibilityScore) {
            this.playerStats.highestAccessibilityScore = analysisData.accessibilityScore;
        }
        
        // Track perfect scores
        if (analysisData.designScore === 100) {
            this.playerStats.perfectScoreCount++;
        }
        
        // Track specific achievements based on findings
        this.trackAchievements(analysisData.findings);
        
        this.savePlayerStats();
        this.checkAndUnlockBadges();
        this.updateStatsDisplay();
    }
    
    /**
     * Track achievements from analysis findings - IBM IDL & Carbon focus
     */
    trackAchievements(findings) {
        findings.forEach(finding => {
            if (finding.type === 'POSITIVE') {
                const category = finding.category.toLowerCase();
                const description = finding.description.toLowerCase();
                
                // IBM Plex typography
                if (category.includes('typography') || description.includes('ibm plex')) {
                    this.playerStats.excellentTypographyCount++;
                }
                
                // Carbon color tokens
                if (category.includes('color') || description.includes('carbon') || description.includes('token')) {
                    this.playerStats.excellentColorScore++;
                }
                
                // 8px grid system
                if (category.includes('spacing') || category.includes('grid') ||
                    description.includes('8px') || description.includes('grid')) {
                    this.playerStats.perfectAlignmentCount++;
                    this.playerStats.perfectGridCount++;
                }
                
                // Design system consistency
                if (category.includes('consistency') || description.includes('carbon')) {
                    this.playerStats.consistencyPraiseCount++;
                }
                
                // IBM IDL principles
                if (description.includes('productive') || description.includes('efficiency')) {
                    this.playerStats.productiveDesignCount++;
                }
                
                if (description.includes('expressive') || description.includes('delight')) {
                    this.playerStats.expressiveDesignCount++;
                }
                
                if (description.includes('universal') || description.includes('inclusive') ||
                    description.includes('accessible')) {
                    this.playerStats.universalDesignCount++;
                }
                
                // Carbon compliance
                if (description.includes('carbon') && finding.type === 'POSITIVE') {
                    this.playerStats.carbonCompliantCount++;
                }
            }
        });
        
        this.savePlayerStats();
    }
    
    /**
     * Check and unlock badges based on current stats
     */
    checkAndUnlockBadges() {
        const newlyUnlocked = [];
        
        Object.values(CONFIG.BADGES).forEach(badge => {
            // Skip if already unlocked
            if (this.unlockedBadges.includes(badge.id)) {
                return;
            }
            
            // Check if condition is met
            if (badge.condition(this.playerStats)) {
                this.unlockedBadges.push(badge.id);
                newlyUnlocked.push(badge);
            }
        });
        
        if (newlyUnlocked.length > 0) {
            this.saveUnlockedBadges();
            this.updateBadgesDisplay();
            this.showBadgeUnlockNotification(newlyUnlocked);
        }
    }
    
    /**
     * Update stats display in the UI
     */
    updateStatsDisplay() {
        const levelInfo = ConfigHelper.getLevelInfo(this.playerStats.totalXP);
        
        // Update level and title (with null checks)
        const playerLevel = document.getElementById('playerLevel');
        if (playerLevel) playerLevel.textContent = levelInfo.level;
        
        const playerTitle = document.getElementById('playerTitle');
        if (playerTitle) playerTitle.textContent = levelInfo.title;
        
        // Update XP
        const currentXP = document.getElementById('currentXP');
        if (currentXP) currentXP.textContent = this.playerStats.totalXP;
        
        const nextLevelXP = document.getElementById('nextLevelXP');
        if (nextLevelXP) nextLevelXP.textContent = levelInfo.nextLevelXP;
        
        // Update XP bar
        const xpFill = document.getElementById('xpFill');
        if (xpFill) xpFill.style.width = `${levelInfo.progress}%`;
        
        // Update other stats (with null checks)
        const dungeonsCleared = document.getElementById('dungeonsCleared');
        if (dungeonsCleared) dungeonsCleared.textContent = this.playerStats.dungeonsCleared;
        
        const totalScore = document.getElementById('totalScore');
        if (totalScore) totalScore.textContent = Math.round(this.playerStats.totalScore);
    }
    
    /**
     * Update badges display in the UI
     */
    updateBadgesDisplay() {
        const container = document.getElementById('badgesContainer');
        if (!container) return; // Exit early if container doesn't exist
        
        container.innerHTML = '';
        
        Object.values(CONFIG.BADGES).forEach(badge => {
            const isUnlocked = this.unlockedBadges.includes(badge.id);
            
            const badgeEl = document.createElement('div');
            badgeEl.className = `badge ${isUnlocked ? 'unlocked' : 'locked'}`;
            badgeEl.title = badge.description;
            
            if (isUnlocked) {
                badgeEl.classList.add('hover-lift');
            }
            
            badgeEl.innerHTML = `
                <span class="badge-icon">${badge.icon}</span>
                <span class="badge-name">${badge.name}</span>
            `;
            
            container.appendChild(badgeEl);
        });
    }
    
    /**
     * Show level up notification
     */
    showLevelUpNotification(levelInfo) {
        // Remove any existing notification
        const existing = document.querySelector('.level-up-notification');
        if (existing) {
            existing.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-title">⚔️ LEVEL UP! 🛡️</div>
            <div class="level-up-details">
                <div class="new-level">${levelInfo.level}</div>
                <div class="new-title">${levelInfo.title}</div>
            </div>
            <button class="btn-primary" onclick="this.parentElement.remove()">
                Continue Your Quest
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.add('fade-out');
                setTimeout(() => notification.remove(), 500);
            }
        }, 5000);
    }
    
    /**
     * Show badge unlock notification
     */
    showBadgeUnlockNotification(badges) {
        badges.forEach((badge, index) => {
            setTimeout(() => {
                this.showSingleBadgeNotification(badge);
            }, index * 1000);
        });
    }
    
    /**
     * Show single badge notification
     */
    showSingleBadgeNotification(badge) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'badge-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--terminal-bg-light);
            border: 2px solid var(--terminal-green);
            padding: var(--spacing-lg);
            z-index: 10000;
            box-shadow: var(--glow-green), var(--shadow-deep);
            min-width: 300px;
        `;
        
        notification.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: var(--spacing-sm);">
                    ${badge.icon}
                </div>
                <div style="color: var(--terminal-amber); font-weight: 600; margin-bottom: var(--spacing-xs);">
                    BADGE UNLOCKED!
                </div>
                <div style="color: var(--terminal-green); font-size: 1.1rem; font-weight: 600; margin-bottom: var(--spacing-sm);">
                    ${badge.name}
                </div>
                <div style="color: var(--text-secondary); font-size: 0.9rem;">
                    ${badge.description}
                </div>
            </div>
        `;
        
        notification.classList.add('badge-unlock', 'slide-in-right');
        document.body.appendChild(notification);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }
    
    /**
     * Get player stats summary
     */
    getStatsSummary() {
        const levelInfo = ConfigHelper.getLevelInfo(this.playerStats.totalXP);
        return {
            ...this.playerStats,
            ...levelInfo,
            unlockedBadgesCount: this.unlockedBadges.length,
            totalBadgesCount: Object.keys(CONFIG.BADGES).length
        };
    }
    
    /**
     * Reset player progress (for testing or user request)
     */
    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.removeItem(CONFIG.STORAGE_KEYS.PLAYER_STATS);
            localStorage.removeItem(CONFIG.STORAGE_KEYS.UNLOCKED_BADGES);
            this.playerStats = this.loadPlayerStats();
            this.unlockedBadges = this.loadUnlockedBadges();
            this.updateStatsDisplay();
            this.updateBadgesDisplay();
            alert('Progress reset successfully!');
        }
    }
}

// Initialize gamification system when DOM is ready
let gamificationSystem;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        gamificationSystem = new GamificationSystem();
    });
} else {
    gamificationSystem = new GamificationSystem();
}

// Made with Bob
