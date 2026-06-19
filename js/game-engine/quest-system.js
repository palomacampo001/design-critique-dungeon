/* ═══════════════════════════════════════════════════════════════════════════
   CRITIQUE DUNGEON 2.0 - Quest System
   Dynamic quest generation from design critique findings
   ═══════════════════════════════════════════════════════════════════════════ */

class QuestSystem {
    constructor() {
        this.activeQuests = this.loadActiveQuests();
        this.completedQuests = this.loadCompletedQuests();
        this.questHistory = this.loadQuestHistory();
        this.questTemplates = this.initializeQuestTemplates();
    }

    /**
     * Initialize quest templates based on IBM Design Language violations
     */
    initializeQuestTemplates() {
        return {
            // Grid & Spacing Quests
            GRID_ALIGNMENT: {
                id: 'grid_alignment',
                type: 'GRID',
                title: 'The Broken Grid',
                description: 'The sacred IBM 2× Grid has fallen into chaos. Realign every major element to restore balance.',
                objective: 'Align all elements to 8px base grid',
                difficulty: 'MEDIUM',
                xpReward: 150,
                badge: 'grid_guardian',
                icon: '📐',
                dungeonText: 'Young apprentice, the Sacred Grid has been disturbed. Your elements wander like travelers without a map.',
                carbonText: 'This layout would benefit from stronger adherence to the IBM 2× Grid system.',
                triggers: ['grid', 'spacing', 'alignment', '8px', 'margin', 'padding']
            },
            
            SPACING_CONSISTENCY: {
                id: 'spacing_consistency',
                type: 'GRID',
                title: 'The Spacing Demons',
                description: 'Inconsistent spacing plagues your interface. Banish the chaos with proper spacing tokens.',
                objective: 'Use consistent spacing tokens (8px, 16px, 24px, 32px)',
                difficulty: 'EASY',
                xpReward: 100,
                badge: 'spacing_master',
                icon: '📏',
                dungeonText: 'Spacing Demons violate the sacred rhythm. Inconsistent margins break the visual flow.',
                carbonText: 'Apply consistent spacing tokens from the Carbon Design System.',
                triggers: ['spacing', 'inconsistent', 'margin', 'padding', 'gap']
            },

            // Typography Quests
            TYPOGRAPHY_HIERARCHY: {
                id: 'typography_hierarchy',
                type: 'TYPOGRAPHY',
                title: 'The Lost Hierarchy',
                description: 'The ancient readers cannot distinguish your headings. Strengthen the typography hierarchy.',
                objective: 'Establish clear heading hierarchy with IBM Plex',
                difficulty: 'MEDIUM',
                xpReward: 120,
                badge: 'typography_apprentice',
                icon: '📝',
                dungeonText: 'The Typography Spirits whisper of chaos in thy headings. IBM Plex demands hierarchy.',
                carbonText: 'The hierarchy could be strengthened by increasing contrast between heading levels.',
                triggers: ['typography', 'hierarchy', 'heading', 'font', 'type scale']
            },

            FONT_CONSISTENCY: {
                id: 'font_consistency',
                type: 'TYPOGRAPHY',
                title: 'The Font Chaos',
                description: 'Multiple font families battle for dominance. Unite them under IBM Plex.',
                objective: 'Use IBM Plex Sans/Mono/Serif consistently',
                difficulty: 'EASY',
                xpReward: 80,
                badge: 'plex_guardian',
                icon: '✍️',
                dungeonText: 'Font Goblins have invaded! Too many typefaces create visual discord.',
                carbonText: 'Standardize typography using the IBM Plex font family.',
                triggers: ['font', 'typeface', 'plex', 'consistency']
            },

            // Accessibility Quests
            ACCESSIBILITY_DRAGON: {
                id: 'accessibility_dragon',
                type: 'ACCESSIBILITY',
                title: 'The Accessibility Dragon',
                description: 'The mighty Accessibility Dragon has awakened. Only WCAG AA compliance can defeat it.',
                objective: 'Achieve WCAG 2.1 AA compliance',
                difficulty: 'HARD',
                xpReward: 300,
                badge: 'accessibility_slayer',
                icon: '♿',
                dungeonText: 'The Accessibility Dragon guards the gates! Your contrast ratios fail to meet 4.5:1.',
                carbonText: 'Multiple accessibility violations detected. WCAG 2.1 AA compliance required.',
                triggers: ['accessibility', 'contrast', 'wcag', 'a11y', 'aria']
            },

            CONTRAST_CURSE: {
                id: 'contrast_curse',
                type: 'ACCESSIBILITY',
                title: 'The Contrast Curse',
                description: 'A curse of low contrast afflicts your text. Lift it with proper color ratios.',
                objective: 'Achieve 4.5:1 contrast for text, 3:1 for UI',
                difficulty: 'MEDIUM',
                xpReward: 150,
                badge: 'contrast_champion',
                icon: '🌓',
                dungeonText: 'The Contrast Curse weakens readability! Your text fades into the background.',
                carbonText: 'Insufficient color contrast detected. Increase to meet Carbon standards.',
                triggers: ['contrast', 'color', 'readability', 'text']
            },

            FOCUS_INDICATORS: {
                id: 'focus_indicators',
                type: 'ACCESSIBILITY',
                title: 'The Invisible Path',
                description: 'Keyboard warriors cannot see their path. Illuminate it with focus indicators.',
                objective: 'Add visible focus indicators to all interactive elements',
                difficulty: 'EASY',
                xpReward: 100,
                badge: 'focus_master',
                icon: '🎯',
                dungeonText: 'The path remains invisible to keyboard travelers! Focus indicators must shine.',
                carbonText: 'Interactive elements lack visible focus indicators for keyboard navigation.',
                triggers: ['focus', 'keyboard', 'navigation', 'indicator']
            },

            // Color Quests
            COLOR_HARMONY: {
                id: 'color_harmony',
                type: 'COLOR',
                title: 'The Color Alchemist',
                description: 'The colors of your kingdom lack harmony. Restore balance using IBM Design Language.',
                objective: 'Use IBM color tokens and maintain theme consistency',
                difficulty: 'MEDIUM',
                xpReward: 180,
                badge: 'color_sage',
                icon: '🎨',
                dungeonText: 'The Color Alchemist detects discord! Your palette strays from IBM tokens.',
                carbonText: 'Color usage would benefit from Carbon Design System color tokens.',
                triggers: ['color', 'palette', 'token', 'theme']
            },

            // Component Quests
            BUTTON_HIERARCHY: {
                id: 'button_hierarchy',
                type: 'COMPONENTS',
                title: 'The Button Battalion',
                description: 'Your buttons lack proper hierarchy. Organize them into primary, secondary, and tertiary ranks.',
                objective: 'Establish clear button hierarchy',
                difficulty: 'EASY',
                xpReward: 90,
                badge: 'button_commander',
                icon: '🔘',
                dungeonText: 'The Button Battalion stands in disarray! Primary and secondary must be distinguished.',
                carbonText: 'Button hierarchy unclear. Use Carbon button variants appropriately.',
                triggers: ['button', 'cta', 'action', 'hierarchy']
            },

            CARBON_COMPONENTS: {
                id: 'carbon_components',
                type: 'COMPONENTS',
                title: 'The Component Quest',
                description: 'Custom components deviate from Carbon standards. Align them with the design system.',
                objective: 'Use Carbon Design System components',
                difficulty: 'MEDIUM',
                xpReward: 200,
                badge: 'carbon_champion',
                icon: '⚛️',
                carbonText: 'Consider using Carbon Design System components for consistency.',
                dungeonText: 'The Carbon Guardians sense deviation! Your components must honor the system.',
                triggers: ['component', 'carbon', 'design system', 'pattern']
            },

            // Layout Quests
            RESPONSIVE_DESIGN: {
                id: 'responsive_design',
                type: 'LAYOUT',
                title: 'The Shapeshifter Challenge',
                description: 'Your interface struggles to adapt. Master responsive design across all viewports.',
                objective: 'Implement responsive design with Carbon breakpoints',
                difficulty: 'HARD',
                xpReward: 250,
                badge: 'responsive_master',
                icon: '📱',
                dungeonText: 'The Shapeshifter mocks your rigid layout! Embrace fluid design.',
                carbonText: 'Layout lacks responsive design. Implement Carbon breakpoints.',
                triggers: ['responsive', 'mobile', 'breakpoint', 'viewport']
            },

            // Content Quests
            MICROCOPY_CLARITY: {
                id: 'microcopy_clarity',
                type: 'CONTENT',
                title: 'The Wordsmith Trial',
                description: 'Your microcopy confuses travelers. Clarify your message with action-oriented language.',
                objective: 'Improve microcopy clarity and action orientation',
                difficulty: 'EASY',
                xpReward: 80,
                badge: 'wordsmith',
                icon: '✒️',
                dungeonText: 'The Wordsmith finds thy labels vague! Speak clearly and with purpose.',
                carbonText: 'Microcopy could be more clear and action-oriented.',
                triggers: ['copy', 'text', 'label', 'message', 'content']
            }
        };
    }

    /**
     * Generate quests from AI critique findings
     */
    generateQuestsFromFindings(findings) {
        const newQuests = [];
        const criticalFindings = findings.filter(f => f.type === 'CRITICAL' || f.type === 'WARNING');

        criticalFindings.forEach(finding => {
            const quest = this.matchFindingToQuest(finding);
            if (quest && !this.isQuestActive(quest.id)) {
                newQuests.push({
                    ...quest,
                    createdAt: Date.now(),
                    status: 'ACTIVE',
                    progress: 0,
                    originalFinding: finding,
                    attempts: 0
                });
            }
        });

        // Check for boss battle conditions
        const bossQuest = this.checkForBossBattle(findings);
        if (bossQuest) {
            newQuests.push(bossQuest);
        }

        // Add new quests to active quests
        this.activeQuests.push(...newQuests);
        this.saveActiveQuests();

        return newQuests;
    }

    /**
     * Match a finding to a quest template
     */
    matchFindingToQuest(finding) {
        const description = finding.description.toLowerCase();
        const category = finding.category.toLowerCase();
        const searchText = `${description} ${category}`;

        // Find matching quest template
        for (const [key, template] of Object.entries(this.questTemplates)) {
            const matches = template.triggers.some(trigger => 
                searchText.includes(trigger.toLowerCase())
            );

            if (matches) {
                return { ...template };
            }
        }

        return null;
    }

    /**
     * Check if conditions warrant a boss battle
     */
    checkForBossBattle(findings) {
        const criticalCount = findings.filter(f => f.type === 'CRITICAL').length;
        
        // Boss battle triggers
        if (criticalCount >= 5) {
            return this.createBossBattle('CHAOS_WIZARD', findings);
        }

        // Check for specific boss types
        const accessibilityIssues = findings.filter(f => 
            f.category.toLowerCase().includes('accessibility')
        ).length;
        
        if (accessibilityIssues >= 3) {
            return this.createBossBattle('ACCESSIBILITY_KRAKEN', findings);
        }

        const gridIssues = findings.filter(f => 
            f.description.toLowerCase().includes('grid') ||
            f.description.toLowerCase().includes('spacing')
        ).length;

        if (gridIssues >= 4) {
            return this.createBossBattle('GRID_GOLEM', findings);
        }

        return null;
    }

    /**
     * Create a boss battle quest
     */
    createBossBattle(bossType, findings) {
        const bosses = {
            CHAOS_WIZARD: {
                id: 'boss_chaos_wizard',
                type: 'BOSS_BATTLE',
                title: '⚔️ BOSS BATTLE: The Chaos Wizard',
                description: 'A powerful wizard of disorder has cursed your interface with multiple critical violations. Defeat him by fixing all issues.',
                objective: 'Fix all critical design violations',
                difficulty: 'LEGENDARY',
                xpReward: 500,
                badge: 'chaos_slayer',
                icon: '🧙',
                bossHealth: findings.filter(f => f.type === 'CRITICAL').length,
                dungeonText: 'The Chaos Wizard appears! His dark magic has corrupted your design with multiple curses.',
                carbonText: 'Multiple critical violations detected requiring immediate attention.'
            },
            ACCESSIBILITY_KRAKEN: {
                id: 'boss_accessibility_kraken',
                type: 'BOSS_BATTLE',
                title: '⚔️ BOSS BATTLE: The Accessibility Kraken',
                description: 'A massive kraken blocks access to your interface. Only WCAG compliance can defeat this beast.',
                objective: 'Achieve full WCAG 2.1 AA compliance',
                difficulty: 'LEGENDARY',
                xpReward: 600,
                badge: 'kraken_slayer',
                icon: '🦑',
                bossHealth: findings.filter(f => 
                    f.category.toLowerCase().includes('accessibility')
                ).length,
                dungeonText: 'The Accessibility Kraken rises from the depths! Its tentacles block all who cannot see.',
                carbonText: 'Significant accessibility barriers detected. Full WCAG audit required.'
            },
            GRID_GOLEM: {
                id: 'boss_grid_golem',
                type: 'BOSS_BATTLE',
                title: '⚔️ BOSS BATTLE: The Grid Golem',
                description: 'A massive golem of misaligned elements threatens your layout. Restore the sacred grid to defeat it.',
                objective: 'Perfect grid alignment across entire interface',
                difficulty: 'LEGENDARY',
                xpReward: 550,
                badge: 'golem_slayer',
                icon: '🗿',
                bossHealth: findings.filter(f => 
                    f.description.toLowerCase().includes('grid') ||
                    f.description.toLowerCase().includes('spacing')
                ).length,
                dungeonText: 'The Grid Golem awakens! Born from misaligned elements, it seeks to destroy all order.',
                carbonText: 'Severe grid and spacing violations detected throughout the layout.'
            }
        };

        const boss = bosses[bossType];
        return {
            ...boss,
            createdAt: Date.now(),
            status: 'ACTIVE',
            progress: 0,
            relatedFindings: findings,
            attempts: 0,
            isBossBattle: true
        };
    }

    /**
     * Update quest progress based on new analysis
     */
    updateQuestProgress(newFindings) {
        const updates = [];

        this.activeQuests.forEach(quest => {
            if (quest.isBossBattle) {
                // Boss battle progress
                const remainingIssues = this.countRemainingIssues(quest, newFindings);
                const progress = ((quest.bossHealth - remainingIssues) / quest.bossHealth) * 100;
                
                quest.progress = Math.max(0, Math.min(100, progress));
                quest.attempts++;

                if (progress >= 100) {
                    this.completeQuest(quest.id);
                    updates.push({ quest, status: 'COMPLETED' });
                }
            } else {
                // Regular quest progress
                const isResolved = !this.findingStillExists(quest.originalFinding, newFindings);
                
                if (isResolved) {
                    quest.progress = 100;
                    this.completeQuest(quest.id);
                    updates.push({ quest, status: 'COMPLETED' });
                } else {
                    quest.attempts++;
                    quest.progress = Math.min(quest.progress + 20, 90); // Incremental progress
                }
            }
        });

        this.saveActiveQuests();
        return updates;
    }

    /**
     * Check if a finding still exists in new analysis
     */
    findingStillExists(originalFinding, newFindings) {
        return newFindings.some(finding => 
            finding.category === originalFinding.category &&
            finding.type === originalFinding.type
        );
    }

    /**
     * Count remaining issues for boss battle
     */
    countRemainingIssues(bossQuest, newFindings) {
        if (bossQuest.id.includes('accessibility')) {
            return newFindings.filter(f => 
                f.category.toLowerCase().includes('accessibility') &&
                (f.type === 'CRITICAL' || f.type === 'WARNING')
            ).length;
        }
        
        if (bossQuest.id.includes('grid')) {
            return newFindings.filter(f => 
                (f.description.toLowerCase().includes('grid') ||
                 f.description.toLowerCase().includes('spacing')) &&
                (f.type === 'CRITICAL' || f.type === 'WARNING')
            ).length;
        }

        return newFindings.filter(f => f.type === 'CRITICAL').length;
    }

    /**
     * Complete a quest
     */
    completeQuest(questId) {
        const questIndex = this.activeQuests.findIndex(q => q.id === questId);
        
        if (questIndex !== -1) {
            const quest = this.activeQuests[questIndex];
            quest.status = 'COMPLETED';
            quest.completedAt = Date.now();
            
            // Move to completed quests
            this.completedQuests.push(quest);
            this.activeQuests.splice(questIndex, 1);
            
            // Add to history
            this.questHistory.push({
                questId: quest.id,
                title: quest.title,
                xpEarned: quest.xpReward,
                completedAt: quest.completedAt,
                attempts: quest.attempts
            });
            
            this.saveActiveQuests();
            this.saveCompletedQuests();
            this.saveQuestHistory();
            
            return quest;
        }
        
        return null;
    }

    /**
     * Check if quest is already active
     */
    isQuestActive(questId) {
        return this.activeQuests.some(q => q.id === questId);
    }

    /**
     * Get all active quests
     */
    getActiveQuests() {
        return this.activeQuests;
    }

    /**
     * Get quest by ID
     */
    getQuest(questId) {
        return this.activeQuests.find(q => q.id === questId) ||
               this.completedQuests.find(q => q.id === questId);
    }

    /**
     * Get quest statistics
     */
    getQuestStats() {
        return {
            activeCount: this.activeQuests.length,
            completedCount: this.completedQuests.length,
            totalXPEarned: this.questHistory.reduce((sum, q) => sum + q.xpEarned, 0),
            bossesDefeated: this.completedQuests.filter(q => q.isBossBattle).length,
            averageAttempts: this.questHistory.length > 0 
                ? this.questHistory.reduce((sum, q) => sum + q.attempts, 0) / this.questHistory.length 
                : 0
        };
    }

    /**
     * Storage methods
     */
    loadActiveQuests() {
        const saved = localStorage.getItem('critique_dungeon_active_quests');
        return saved ? JSON.parse(saved) : [];
    }

    saveActiveQuests() {
        localStorage.setItem('critique_dungeon_active_quests', JSON.stringify(this.activeQuests));
    }

    loadCompletedQuests() {
        const saved = localStorage.getItem('critique_dungeon_completed_quests');
        return saved ? JSON.parse(saved) : [];
    }

    saveCompletedQuests() {
        localStorage.setItem('critique_dungeon_completed_quests', JSON.stringify(this.completedQuests));
    }

    loadQuestHistory() {
        const saved = localStorage.getItem('critique_dungeon_quest_history');
        return saved ? JSON.parse(saved) : [];
    }

    saveQuestHistory() {
        localStorage.setItem('critique_dungeon_quest_history', JSON.stringify(this.questHistory));
    }

    /**
     * Reset all quests (for testing)
     */
    resetAllQuests() {
        this.activeQuests = [];
        this.completedQuests = [];
        this.questHistory = [];
        this.saveActiveQuests();
        this.saveCompletedQuests();
        this.saveQuestHistory();
    }
}

// Initialize quest system
const questSystem = new QuestSystem();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestSystem;
}

// Made with Bob
