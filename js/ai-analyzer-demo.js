/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN CRITIQUE DUNGEON - Demo Mode (No API Required)
   Mock AI responses for testing and demonstration
   ═══════════════════════════════════════════════════════════════════════════ */

class AIAnalyzerDemo {
    constructor() {
        this.demoMode = true;
    }
    
    /**
     * Analyze an image using mock responses (no API needed)
     */
    async analyzeImage(imageBase64) {
        // Simulate API delay
        await this.delay(3000);
        
        // Return mock analysis
        return this.getMockAnalysis();
    }
    
    /**
     * Delay helper
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * Get mock analysis response
     */
    getMockAnalysis() {
        const mockResponses = [
            {
                overallImpression: "Brave designer, you have entered the Design Critique Dungeon with a interface that shows promise! The layout demonstrates understanding of IBM's Productive Design principle with its clean, efficient structure. However, the sacred 8px grid has been violated in several places, and the Color Token Sage detects inconsistent use of Carbon's palette. Your typography shows respect for IBM Plex, but spacing demons lurk in the margins.",
                designScore: 78,
                accessibilityScore: 72,
                findings: [
                    {
                        category: "IBM Plex Typography",
                        type: "POSITIVE",
                        title: "The IBM Plex Guardian Approves",
                        description: "Excellent use of IBM Plex Sans throughout the interface. Font weights are properly applied (Regular 400 for body, SemiBold 600 for headings), and the type scale follows Carbon's standards. Line height of 1.5 for body text ensures readability.",
                        icon: "📝"
                    },
                    {
                        category: "8px Grid System",
                        type: "CRITICAL",
                        title: "Spacing Demons Detected",
                        description: "The sacred 8px grid has been violated! Several elements use 15px, 22px, and 35px spacing which breaks Carbon's spacing scale. Use only multiples of 8: 8px, 16px, 24px, 32px, 48px. The Grid Master demands consistency.",
                        icon: "📐"
                    },
                    {
                        category: "Carbon Color Tokens",
                        type: "WARNING",
                        title: "Color Token Inconsistency",
                        description: "Custom colors detected instead of Carbon tokens. Use $ui-01 through $ui-05 for backgrounds, $text-01 through $text-04 for text, and $interactive-01 for primary actions. The Color Sage recommends consulting the Carbon palette.",
                        icon: "🎨"
                    },
                    {
                        category: "Accessibility",
                        type: "WARNING",
                        title: "Contrast Curse Afflicts Buttons",
                        description: "Some interactive elements fail WCAG 2.1 AA standards with contrast ratios below 4.5:1. Carbon requires minimum 4.5:1 for text and 3:1 for UI components. The Accessibility Champion demands better contrast.",
                        icon: "♿"
                    },
                    {
                        category: "Component Usage",
                        type: "POSITIVE",
                        title: "Carbon Components Detected",
                        description: "Proper use of Carbon button hierarchy (primary, secondary, ghost) and form inputs. Component states (hover, active, focus) are correctly implemented with 2px focus indicators.",
                        icon: "⚛️"
                    },
                    {
                        category: "Productive Design",
                        type: "POSITIVE",
                        title: "Efficiency Enchantment Active",
                        description: "The interface embodies IBM's Productive Design principle with clear information hierarchy, efficient use of space, and task-focused layout. Users can accomplish their goals quickly.",
                        icon: "⚡"
                    }
                ],
                xpReward: 125,
                xpMessage: "Well fought, designer! You've earned 125 XP for facing the Dungeon Master's critique. Address the spacing and color issues to level up further.",
                carbonCompliance: "MEDIUM",
                ibmIdlAlignment: "GOOD"
            },
            {
                overallImpression: "A formidable interface appears before the Dungeon Master! This design demonstrates strong adherence to IBM Design Language principles, particularly in its expressive use of motion and delightful micro-interactions. The Carbon Design System flows through this interface like magic through a wizard's staff. However, even the mightiest designs have room for improvement in the realm of universal accessibility.",
                designScore: 88,
                accessibilityScore: 85,
                findings: [
                    {
                        category: "8px Grid System",
                        type: "POSITIVE",
                        title: "The Grid Master Celebrates",
                        description: "Perfect adherence to Carbon's 8px grid system! All spacing uses proper tokens: 8px, 16px, 24px, 32px, 48px. The 16-column grid is properly implemented with consistent gutters. This is the way.",
                        icon: "📐"
                    },
                    {
                        category: "Motion Design",
                        type: "POSITIVE",
                        title: "The Motion Wizard Approves",
                        description: "Excellent implementation of IBM's motion principles! Productive motion (70-110ms) for functional transitions, expressive motion (240-400ms) for delightful moments. Easing curves follow Carbon standards.",
                        icon: "✨"
                    },
                    {
                        category: "Accessibility",
                        type: "WARNING",
                        title: "Keyboard Navigation Quest Incomplete",
                        description: "While contrast ratios are excellent, keyboard navigation could be improved. Some interactive elements lack visible focus indicators. Add 2px outlines with high contrast for all focusable elements.",
                        icon: "♿"
                    },
                    {
                        category: "Carbon Color Tokens",
                        type: "POSITIVE",
                        title: "Color Token Sage Blesses This Design",
                        description: "Masterful use of Carbon color tokens! Proper theme implementation (Gray 90), correct use of $ui tokens for backgrounds, $text tokens for typography, and $interactive tokens for actions. The palette sings in harmony.",
                        icon: "🎨"
                    },
                    {
                        category: "Expressive Design",
                        type: "POSITIVE",
                        title: "Humanity and Delight Detected",
                        description: "This interface embodies IBM's Expressive Design principle with thoughtful micro-interactions, warm color choices, and delightful moments that make users smile. Well balanced with productivity.",
                        icon: "✨"
                    }
                ],
                xpReward: 175,
                xpMessage: "Legendary work, designer! You've earned 175 XP for this excellent Carbon-compliant design. Polish the accessibility and you'll reach mastery!",
                carbonCompliance: "HIGH",
                ibmIdlAlignment: "EXCELLENT"
            },
            {
                overallImpression: "The Dungeon Master examines this interface with a critical eye. While the foundation shows understanding of design principles, this interface has strayed far from the path of IBM Design Language and Carbon Design System. Custom components replace Carbon's battle-tested patterns, spacing is chaotic, and accessibility concerns abound. Fear not, brave designer - every master was once a novice. Let this critique guide you toward Carbon enlightenment.",
                designScore: 62,
                accessibilityScore: 58,
                findings: [
                    {
                        category: "Component Usage",
                        type: "CRITICAL",
                        title: "Custom Components Detected",
                        description: "Custom-built components instead of Carbon components. This creates inconsistency and maintenance burden. Replace with Carbon buttons, inputs, cards, and modals from the official library.",
                        icon: "⚛️"
                    },
                    {
                        category: "Typography",
                        type: "CRITICAL",
                        title: "Font Family Violation",
                        description: "Non-IBM Plex fonts detected! The IBM Plex Guardian is displeased. Use IBM Plex Sans for UI, IBM Plex Mono for code, and IBM Plex Serif for editorial content only.",
                        icon: "📝"
                    },
                    {
                        category: "Accessibility",
                        type: "CRITICAL",
                        title: "Multiple WCAG Violations",
                        description: "Severe accessibility issues: insufficient color contrast (2.8:1 vs required 4.5:1), missing alt text on images, no keyboard navigation, and poor screen reader support. This blocks users with disabilities.",
                        icon: "♿"
                    },
                    {
                        category: "8px Grid System",
                        type: "WARNING",
                        title: "Grid Chaos Reigns",
                        description: "Random spacing values throughout: 7px, 13px, 19px, 27px. The Grid Master weeps. Adopt Carbon's 8px base unit and spacing tokens immediately.",
                        icon: "📐"
                    },
                    {
                        category: "Universal Design",
                        type: "WARNING",
                        title: "Inclusivity Quest Failed",
                        description: "Design lacks consideration for diverse users. Small touch targets (below 44x44px), English-only content without i18n support, and assumptions about user abilities. IBM's Universal Design principle demands better.",
                        icon: "🌍"
                    },
                    {
                        category: "Visual Hierarchy",
                        type: "POSITIVE",
                        title: "Clear Information Structure",
                        description: "Despite other issues, the visual hierarchy is clear. Users can understand the page structure and find important information. This is a solid foundation to build upon.",
                        icon: "👁️"
                    }
                ],
                xpReward: 75,
                xpMessage: "You've earned 75 XP for facing the critique. Study the Carbon Design System documentation and return stronger. Every expert was once a beginner!",
                carbonCompliance: "LOW",
                ibmIdlAlignment: "NEEDS_IMPROVEMENT"
            }
        ];
        
        // Return random mock response
        return mockResponses[Math.floor(Math.random() * mockResponses.length)];
    }
    
    /**
     * Convert image file to base64 data URL
     */
    async imageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            
            reader.onerror = (error) => {
                reject(error);
            };
            
            reader.readAsDataURL(file);
        });
    }
    
    /**
     * Validate image before analysis
     */
    validateImage(file) {
        return ConfigHelper.validateFile(file);
    }
    
    /**
     * Perform complete analysis workflow
     */
    async performAnalysis(file) {
        // Validate file
        const validation = this.validateImage(file);
        if (!validation.valid) {
            throw new Error(validation.errors.join(', '));
        }
        
        // Convert to base64 (for preview, not used in demo)
        await this.imageToBase64(file);
        
        // Get mock analysis
        const analysisData = await this.analyzeImage(null);
        
        // Add bonus XP based on scores
        analysisData.xpReward += this.calculateBonusXP(analysisData);
        
        return analysisData;
    }
    
    /**
     * Calculate bonus XP based on scores
     */
    calculateBonusXP(analysisData) {
        let bonus = 0;
        
        // Design score bonus
        if (analysisData.designScore >= 95) {
            bonus += CONFIG.XP_BONUS_EXCELLENT;
        } else if (analysisData.designScore >= 85) {
            bonus += CONFIG.XP_BONUS_GOOD;
        }
        
        // Accessibility bonus
        if (analysisData.accessibilityScore >= 90) {
            bonus += CONFIG.XP_BONUS_ACCESSIBILITY;
        }
        
        return bonus;
    }
    
    /**
     * Test API connection (always succeeds in demo mode)
     */
    async testConnection() {
        return {
            success: true,
            message: '🎮 DEMO MODE: No API key required! Upload any image to see a sample critique.'
        };
    }
}

// Replace the existing aiAnalyzer with the demo version
const aiAnalyzer = new AIAnalyzerDemo();

// Made with Bob