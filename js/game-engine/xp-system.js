/* ═══════════════════════════════════════════════════════════════════════════
   CRITIQUE DUNGEON 2.0 - XP & Leveling System
   Experience points, leveling, and progression tracking
   ═══════════════════════════════════════════════════════════════════════════ */

class XPSystem {
    constructor() {
        this.playerData = this.loadPlayerData();
        this.levelThresholds = this.initializeLevelThresholds();
    }

    /**
     * Initialize level thresholds with titles
     */
    initializeLevelThresholds() {
        return [
            { level: 1, xp: 0, title: 'Apprentice Designer' },
            { level: 2, xp: 100, title: 'Junior Designer' },
            { level: 3, xp: 250, title: 'Design Practitioner' },
            { level: 4, xp: 500, title: 'Design Knight' },
            { level: 5, xp: 1000, title: 'Grid Guardian' },
            { level: 6, xp: 1750, title: 'Typography Adept' },
            { level: 7, xp: 2750, title: 'Color Sage' },
            { level: 8, xp: 4000, title: 'Accessibility Mage' },
            { level: 9, xp: 5500, title: 'Component Master' },
            { level: 10, xp: 7500, title: 'Layout Architect' },
            { level: 11, xp: 10000, title: 'Design Warrior' },
            { level: 12, xp: 13000, title: 'UX Specialist' },
            { level: 13, xp: 16500, title: 'Carbon Champion' },
            { level: 14, xp: 20500, title: 'Brand Guardian' },
            { level: 15, xp: 25000, title: 'Accessibility Champion' },
            { level: 16, xp: 30000, title: 'Master Builder' },
            { level: 17, xp: 36000, title: 'Design Sage' },
            { level: 18, xp: 43000, title: 'Visual Storyteller' },
            { level: 19, xp: 51000, title: 'System Architect' },
            { level: 20, xp: 60000, title: 'Typography Wizard' },
            { level: 21, xp: 70000, title: 'Grid Master' },
            { level: 22, xp: 81000, title: 'Illustration Ranger' },
            { level: 23, xp: 93000, title: 'Motion Designer' },
            { level: 24, xp: 106000, title: 'Brand Oracle' },
            { level: 25, xp: 120000, title: 'Carbon Master' },
            { level: 26, xp: 135000, title: 'Design Director' },
            { level: 27, xp: 151000, title: 'Creative Lead' },
            { level: 28, xp: 168000, title: 'Principal Designer' },
            { level: 29, xp: 186000, title: 'Design Luminary' },
            { level: 30, xp: 205000, title: 'Grand Master' },
            { level: 31, xp: 225000, title: 'Design Deity' },
            { level: 32, xp: 246000, title: 'Legendary Architect' },
            { level: 33, xp: 268000, title: 'IBM Design Legend' },
            { level: 34, xp: 291000, title: 'Carbon Deity' },
            { level: 35, xp: 315000, title: 'Design Immortal' },
            { level: 36, xp: 340000, title: 'Master of All Grids' },
            { level: 37, xp: 366000, title: 'Typography God' },
            { level: 38, xp: 393000, title: 'Accessibility Deity' },
            { level: 39, xp: 421000, title: 'Supreme Designer' },
            { level: 40, xp: 450000, title: 'Design Overlord' },
            { level: 41, xp: 480000, title: 'Cosmic Designer' },
            { level: 42, xp: 511000, title: 'Universal Creator' },
            { level: 43, xp: 543000, title: 'Design Transcendent' },
            { level: 44, xp: 576000, title: 'Eternal Designer' },
            { level: 45, xp: 610000, title: 'Design Omniscient' },
            { level: 46, xp: 645000, title: 'Master of Reality' },
            { level: 47, xp: 681000, title: 'Design Absolute' },
            { level: 48, xp: 718000, title: 'Creative Omnipotent' },
            { level: 49, xp: 756000, title: 'Design Infinite' },
            { level: 50, xp: 1000000, title: 'Legendary Creative Director' }
        ];
    }

    /**
     * Award XP to player
     */
    awardXP(amount, reason = '') {
        const oldXP = this.playerData.totalXP;
        const oldLevel = this.getCurrentLevel();

        this.playerData.totalXP += amount;
        this.playerData.lifetimeXP += amount;

        const newLevel = this.getCurrentLevel();
        const leveledUp = newLevel.level > oldLevel.level;

        // Update stats
        this.playerData.xpGained.push({
            amount,
            reason,
            timestamp: Date.now()
        });

        this.savePlayerData();

        return {
            xpAwarded: amount,
            totalXP: this.playerData.totalXP,
            leveledUp,
            oldLevel: oldLevel,
            newLevel: newLevel,
            reason
        };
    }

    /**
     * Get current level info
     */
    getCurrentLevel() {
        const xp = this.playerData.totalXP;
        
        for (let i = this.levelThresholds.length - 1; i >= 0; i--) {
            if (xp >= this.levelThresholds[i].xp) {
                const current = this.levelThresholds[i];
                const next = this.levelThresholds[i + 1] || current;
                
                const xpIntoLevel = xp - current.xp;
                const xpNeededForNext = next.xp - current.xp;
                const progress = (xpIntoLevel / xpNeededForNext) * 100;

                return {
                    level: current.level,
                    title: current.title,
                    currentXP: xp,
                    levelStartXP: current.xp,
                    nextLevelXP: next.xp,
                    xpToNextLevel: next.xp - xp,
                    progress: Math.min(100, progress),
                    isMaxLevel: i === this.levelThresholds.length - 1
                };
            }
        }

        return this.levelThresholds[0];
    }

    /**
     * Calculate XP for quest completion
     */
    calculateQuestXP(quest, performance = 1.0) {
        let baseXP = quest.xpReward || 100;

        // Difficulty multiplier
        const difficultyMultipliers = {
            'EASY': 1.0,
            'MEDIUM': 1.5,
            'HARD': 2.0,
            'LEGENDARY': 3.0
        };

        baseXP *= difficultyMultipliers[quest.difficulty] || 1.0;

        // Performance multiplier (0.5 to 2.0)
        baseXP *= performance;

        // First attempt bonus
        if (quest.attempts === 1) {
            baseXP *= 1.5;
        }

        // Boss battle bonus
        if (quest.isBossBattle) {
            baseXP *= 2.0;
        }

        return Math.round(baseXP);
    }

    /**
     * Calculate XP for analysis score
     */
    calculateAnalysisXP(designScore, accessibilityScore) {
        let xp = 50; // Base XP

        // Design score bonus
        if (designScore >= 95) {
            xp += 200; // Legendary
        } else if (designScore >= 90) {
            xp += 150; // Excellent
        } else if (designScore >= 80) {
            xp += 100; // Very Good
        } else if (designScore >= 70) {
            xp += 50; // Good
        }

        // Accessibility bonus
        if (accessibilityScore >= 95) {
            xp += 150; // Perfect accessibility
        } else if (accessibilityScore >= 90) {
            xp += 100; // Excellent accessibility
        } else if (accessibilityScore >= 80) {
            xp += 50; // Good accessibility
        }

        // Perfect score bonus
        if (designScore === 100 && accessibilityScore === 100) {
            xp += 500; // Legendary achievement
        }

        return xp;
    }

    /**
     * Get player statistics
     */
    getPlayerStats() {
        const level = this.getCurrentLevel();
        
        return {
            ...this.playerData,
            ...level,
            totalQuestsCompleted: this.playerData.questsCompleted,
            totalBossesDefeated: this.playerData.bossesDefeated,
            averageScore: this.playerData.analysisCount > 0 
                ? this.playerData.totalScore / this.playerData.analysisCount 
                : 0
        };
    }

    /**
     * Record quest completion
     */
    recordQuestCompletion(quest) {
        this.playerData.questsCompleted++;
        
        if (quest.isBossBattle) {
            this.playerData.bossesDefeated++;
        }

        this.savePlayerData();
    }

    /**
     * Record analysis
     */
    recordAnalysis(designScore, accessibilityScore) {
        this.playerData.analysisCount++;
        this.playerData.totalScore += designScore;
        
        if (designScore > this.playerData.highestScore) {
            this.playerData.highestScore = designScore;
        }

        if (accessibilityScore > this.playerData.highestAccessibilityScore) {
            this.playerData.highestAccessibilityScore = accessibilityScore;
        }

        if (designScore === 100 && accessibilityScore === 100) {
            this.playerData.perfectScores++;
        }

        this.savePlayerData();
    }

    /**
     * Get XP history
     */
    getXPHistory(limit = 10) {
        return this.playerData.xpGained
            .slice(-limit)
            .reverse();
    }

    /**
     * Get level progress percentage
     */
    getLevelProgress() {
        const level = this.getCurrentLevel();
        return level.progress;
    }

    /**
     * Check if player can level up
     */
    canLevelUp() {
        const level = this.getCurrentLevel();
        return level.progress >= 100 && !level.isMaxLevel;
    }

    /**
     * Storage methods
     */
    loadPlayerData() {
        const saved = localStorage.getItem('critique_dungeon_player_data');
        
        if (saved) {
            return JSON.parse(saved);
        }

        return {
            totalXP: 0,
            lifetimeXP: 0,
            questsCompleted: 0,
            bossesDefeated: 0,
            analysisCount: 0,
            totalScore: 0,
            highestScore: 0,
            highestAccessibilityScore: 0,
            perfectScores: 0,
            xpGained: [],
            createdAt: Date.now()
        };
    }

    savePlayerData() {
        localStorage.setItem('critique_dungeon_player_data', JSON.stringify(this.playerData));
    }

    /**
     * Reset player data
     */
    resetPlayerData() {
        this.playerData = {
            totalXP: 0,
            lifetimeXP: 0,
            questsCompleted: 0,
            bossesDefeated: 0,
            analysisCount: 0,
            totalScore: 0,
            highestScore: 0,
            highestAccessibilityScore: 0,
            perfectScores: 0,
            xpGained: [],
            createdAt: Date.now()
        };
        this.savePlayerData();
    }
}

// Initialize XP system
const xpSystem = new XPSystem();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = XPSystem;
}

// Made with Bob
