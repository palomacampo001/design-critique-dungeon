/* ═══════════════════════════════════════════════════════════════════════════
   QUEST SYSTEM INTEGRATION
   Connects the quest system with the main application
   ═══════════════════════════════════════════════════════════════════════════ */

class QuestIntegration {
    constructor() {
        this.questSystem = null;
        this.xpSystem = null;
        this.initialized = false;
    }

    /**
     * Initialize the quest integration
     */
    init() {
        if (typeof QuestSystem === 'undefined' || typeof XPSystem === 'undefined') {
            console.warn('Quest system modules not loaded yet');
            return;
        }

        this.questSystem = new QuestSystem();
        this.xpSystem = new XPSystem();
        this.initialized = true;

        // Update UI with current player data
        this.updatePlayerUI();
        this.updateQuestLog();
        this.updateStatistics();

        console.log('✅ Quest System Integration initialized');
    }

    /**
     * Process analysis results and generate quests
     */
    processAnalysis(analysisData) {
        if (!this.initialized) {
            console.warn('Quest system not initialized');
            return;
        }

        // Award base XP for completing analysis
        const baseXP = 50;
        this.xpSystem.awardXP(baseXP, 'Design Analysis Completed');

        // Generate quests from critique findings
        if (analysisData.findings && analysisData.findings.length > 0) {
            const quests = this.questSystem.generateQuestsFromFindings(analysisData.findings);
            
            if (quests.length > 0) {
                this.showQuestNotification(quests.length);
            }
        }

        // Update all UI elements
        this.updatePlayerUI();
        this.updateQuestLog();
        this.updateStatistics();

        // Check for level up
        this.checkLevelUp();
    }

    /**
     * Update player UI (level, XP, title)
     */
    updatePlayerUI() {
        const playerData = this.xpSystem.getPlayerData();
        const levelInfo = this.xpSystem.getLevelInfo(playerData.level);

        // Update level
        const levelEl = document.getElementById('playerLevel');
        if (levelEl) levelEl.textContent = playerData.level;

        // Update title
        const titleEl = document.getElementById('playerTitle');
        if (titleEl) titleEl.textContent = levelInfo.title;

        // Update XP
        const currentXPEl = document.getElementById('currentXP');
        const nextLevelXPEl = document.getElementById('nextLevelXP');
        const xpFillEl = document.getElementById('xpFill');

        if (currentXPEl) currentXPEl.textContent = playerData.currentXP.toLocaleString();
        if (nextLevelXPEl) nextLevelXPEl.textContent = levelInfo.xpRequired.toLocaleString();
        
        if (xpFillEl) {
            const progress = this.xpSystem.getProgressToNextLevel();
            xpFillEl.style.width = `${progress}%`;
        }

        // Update total XP
        const totalXPEl = document.getElementById('totalXP');
        if (totalXPEl) totalXPEl.textContent = playerData.lifetimeXP.toLocaleString();
    }

    /**
     * Update quest log display
     */
    updateQuestLog() {
        const questLogEl = document.getElementById('questLog');
        if (!questLogEl) return;

        const activeQuests = this.questSystem.getActiveQuests();

        if (activeQuests.length === 0) {
            questLogEl.innerHTML = `
                <div class="empty-state" data-carbon="Complete an analysis to unlock quests" data-dungeon="Submit a design to receive quests from the guild">
                    Complete an analysis to unlock quests
                </div>
            `;
            return;
        }

        // Render quest cards
        questLogEl.innerHTML = activeQuests.map(quest => this.renderQuestCard(quest)).join('');

        // Add event listeners for quest actions
        this.attachQuestEventListeners();
    }

    /**
     * Render a single quest card
     */
    renderQuestCard(quest) {
        const isBoss = quest.isBoss || false;
        const cardClass = isBoss ? 'quest-card boss-quest' : 'quest-card';
        const difficultyClass = quest.difficulty.toLowerCase();
        const progressPercent = quest.progress || 0;

        return `
            <div class="${cardClass}" data-quest-id="${quest.id}">
                <div class="quest-header">
                    <div class="quest-icon">${quest.icon}</div>
                    <div class="quest-info">
                        <h5 class="quest-title">${quest.title}</h5>
                        <span class="quest-difficulty ${difficultyClass}">${quest.difficulty}</span>
                    </div>
                    <div class="quest-xp">+${quest.xpReward} XP</div>
                </div>
                <p class="quest-description">${quest.description}</p>
                <p class="quest-objective"><strong>Objective:</strong> ${quest.objective}</p>
                ${isBoss ? `<p class="boss-health">Boss Health: ${quest.bossHealth || 100}%</p>` : ''}
                <div class="quest-progress">
                    <div class="progress-bar">
                        <div class="progress-fill ${isBoss ? 'boss-progress' : ''}" style="width: ${progressPercent}%"></div>
                    </div>
                    <span class="progress-text">${progressPercent}%</span>
                </div>
                <div class="quest-footer">
                    <span class="quest-attempts">Attempts: ${quest.attempts || 0}</span>
                    ${progressPercent >= 100 ? '<button class="btn-complete-quest" data-quest-id="' + quest.id + '">Complete Quest</button>' : ''}
                </div>
            </div>
        `;
    }

    /**
     * Attach event listeners to quest cards
     */
    attachQuestEventListeners() {
        const completeButtons = document.querySelectorAll('.btn-complete-quest');
        completeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const questId = e.target.dataset.questId;
                this.completeQuest(questId);
            });
        });
    }

    /**
     * Complete a quest
     */
    completeQuest(questId) {
        const quest = this.questSystem.getQuestById(questId);
        if (!quest) return;

        // Award XP
        const xpAwarded = this.xpSystem.awardXP(quest.xpReward, `Quest Completed: ${quest.title}`);

        // Mark quest as complete
        this.questSystem.completeQuest(questId);

        // Show notification
        this.showCompletionNotification(quest, xpAwarded);

        // Update UI
        this.updatePlayerUI();
        this.updateQuestLog();
        this.updateStatistics();

        // Check for level up
        this.checkLevelUp();
    }

    /**
     * Update statistics display
     */
    updateStatistics() {
        const playerData = this.xpSystem.getPlayerData();
        const questStats = this.questSystem.getStatistics();

        // Update quest stats
        const questsCompletedEl = document.getElementById('questsCompleted');
        if (questsCompletedEl) questsCompletedEl.textContent = questStats.completedQuests;

        const bossesDefeatedEl = document.getElementById('bossesDefeated');
        if (bossesDefeatedEl) bossesDefeatedEl.textContent = questStats.bossesDefeated;

        const analysisCountEl = document.getElementById('analysisCount');
        if (analysisCountEl) analysisCountEl.textContent = playerData.analysisCount || 0;
    }

    /**
     * Check for level up and show notification
     */
    checkLevelUp() {
        const levelUpData = this.xpSystem.checkLevelUp();
        
        if (levelUpData.leveledUp) {
            this.showLevelUpNotification(levelUpData);
        }
    }

    /**
     * Show quest generation notification
     */
    showQuestNotification(questCount) {
        const isDungeon = document.body.classList.contains('dungeon-theme');
        const message = isDungeon 
            ? `⚔️ ${questCount} new quest${questCount > 1 ? 's' : ''} received from the guild!`
            : `✨ ${questCount} new design challenge${questCount > 1 ? 's' : ''} unlocked!`;

        this.showNotification(message, 'quest');
    }

    /**
     * Show quest completion notification
     */
    showCompletionNotification(quest, xpAwarded) {
        const isDungeon = document.body.classList.contains('dungeon-theme');
        const isBoss = quest.isBoss || false;
        
        let message;
        if (isBoss) {
            message = isDungeon
                ? `🏆 Boss Defeated! ${quest.title} - +${xpAwarded} XP`
                : `🏆 Critical Issue Resolved! +${xpAwarded} XP`;
        } else {
            message = isDungeon
                ? `✅ Quest Complete! ${quest.title} - +${xpAwarded} XP`
                : `✅ Challenge Complete! +${xpAwarded} XP`;
        }

        this.showNotification(message, isBoss ? 'boss' : 'success');
    }

    /**
     * Show level up notification
     */
    showLevelUpNotification(levelUpData) {
        const isDungeon = document.body.classList.contains('dungeon-theme');
        const message = isDungeon
            ? `🎉 LEVEL UP! You are now Level ${levelUpData.newLevel} - ${levelUpData.newTitle}`
            : `🎉 LEVEL UP! Level ${levelUpData.newLevel} - ${levelUpData.newTitle}`;

        this.showNotification(message, 'levelup');
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `quest-notification ${type}`;
        notification.textContent = message;

        // Add to body
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);

        // Remove after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    /**
     * Simulate design improvement (for testing)
     */
    simulateImprovement() {
        if (!this.initialized) return;

        const activeQuests = this.questSystem.getActiveQuests();
        if (activeQuests.length === 0) return;

        // Update progress on random quest
        const randomQuest = activeQuests[Math.floor(Math.random() * activeQuests.length)];
        const newProgress = Math.min(100, (randomQuest.progress || 0) + 25);
        
        this.questSystem.updateQuestProgress(randomQuest.id, newProgress);
        this.updateQuestLog();

        if (newProgress >= 100) {
            this.showNotification('Quest ready to complete!', 'info');
        }
    }

    /**
     * Get current player stats for display
     */
    getPlayerStats() {
        if (!this.initialized) return null;

        const playerData = this.xpSystem.getPlayerData();
        const levelInfo = this.xpSystem.getLevelInfo(playerData.level);
        const questStats = this.questSystem.getStatistics();

        return {
            level: playerData.level,
            title: levelInfo.title,
            currentXP: playerData.currentXP,
            lifetimeXP: playerData.lifetimeXP,
            xpToNextLevel: levelInfo.xpRequired,
            progressPercent: this.xpSystem.getProgressToNextLevel(),
            questsCompleted: questStats.completedQuests,
            bossesDefeated: questStats.bossesDefeated,
            activeQuests: questStats.activeQuests
        };
    }
}

// Create global instance
const questIntegration = new QuestIntegration();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => questIntegration.init(), 100);
    });
} else {
    setTimeout(() => questIntegration.init(), 100);
}

// Made with Bob
