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
        // Check current theme
        const isCarbon = document.body.classList.contains('carbon-theme');
        
        // Return appropriate responses based on theme
        const mockResponses = isCarbon ? this.getCarbonResponses() : this.getDungeonResponses();
        
        // Return random mock response
        return mockResponses[Math.floor(Math.random() * mockResponses.length)];
    }
    
    /**
     * Get Dungeon theme responses (fantasy RPG language)
     */
    getDungeonResponses() {
        return [
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
    }
    
    /**
     * Get Carbon theme responses (Creative Director language)
     */
    getCarbonResponses() {
        return [
            {
                overallImpression: "This interface demonstrates solid foundational work with clear potential for refinement. The visual hierarchy is well-established, and there's an evident understanding of user-centered design principles. However, we're seeing some inconsistencies in the spacing system and color application that are diluting the overall impact. Let's elevate this to the next level by tightening up those details and ensuring every pixel serves a purpose.",
                designScore: 78,
                accessibilityScore: 72,
                findings: [
                    {
                        category: "Typography",
                        type: "POSITIVE",
                        title: "Strong Typographic Foundation",
                        description: "The type hierarchy is working well here. IBM Plex Sans is properly implemented with appropriate weights and scales. The 1.5 line-height for body copy ensures comfortable reading, and the heading structure guides users effectively through the content.",
                        icon: "📝"
                    },
                    {
                        category: "Spacing & Layout",
                        type: "CRITICAL",
                        title: "Spacing System Needs Refinement",
                        description: "We're seeing arbitrary spacing values that break the 8px grid rhythm. This creates visual noise and undermines the design's credibility. Let's commit to the spacing tokens: 8px, 16px, 24px, 32px, 48px. Consistency here will dramatically improve the polish.",
                        icon: "📐"
                    },
                    {
                        category: "Color Strategy",
                        type: "WARNING",
                        title: "Color Token Opportunity",
                        description: "Custom colors are introducing unnecessary complexity. By leveraging Carbon's color tokens, we'll ensure accessibility compliance, maintain brand consistency, and simplify future updates. Think of tokens as your design system's vocabulary—use them fluently.",
                        icon: "🎨"
                    },
                    {
                        category: "Accessibility",
                        type: "WARNING",
                        title: "Contrast Ratios Need Attention",
                        description: "Some interactive elements aren't meeting WCAG 2.1 AA standards. This isn't just about compliance—it's about ensuring everyone can use what we're building. Aim for 4.5:1 minimum for text, 3:1 for UI components. Accessibility is non-negotiable.",
                        icon: "♿"
                    },
                    {
                        category: "Component Usage",
                        type: "POSITIVE",
                        title: "Smart Component Application",
                        description: "The button hierarchy is well-executed—primary, secondary, and ghost buttons are used appropriately. Component states are clearly defined, and the 2px focus indicators show attention to keyboard navigation. This is the kind of thoughtful implementation that scales.",
                        icon: "⚛️"
                    },
                    {
                        category: "User Experience",
                        type: "POSITIVE",
                        title: "Clear User Journey",
                        description: "The interface prioritizes efficiency without sacrificing clarity. Information architecture is logical, and users can accomplish their tasks with minimal friction. This productive approach aligns perfectly with enterprise needs.",
                        icon: "⚡"
                    }
                ],
                xpReward: 125,
                xpMessage: "Solid work. Address the spacing and color consistency, and this will really shine. You're on the right track.",
                carbonCompliance: "MEDIUM",
                ibmIdlAlignment: "GOOD"
            },
            {
                overallImpression: "Impressive work here. This interface shows a mature understanding of design systems and user experience principles. The attention to detail is evident—from the precise spacing to the thoughtful motion design. The Carbon implementation is nearly flawless, and the overall experience feels both professional and delightful. There's just a bit of fine-tuning needed on the accessibility front to make this truly exceptional.",
                designScore: 88,
                accessibilityScore: 85,
                findings: [
                    {
                        category: "Spacing & Layout",
                        type: "POSITIVE",
                        title: "Exemplary Grid Implementation",
                        description: "The 8px grid system is executed perfectly. Every element aligns to the rhythm, creating a sense of order and professionalism that users feel even if they can't articulate it. The 16-column grid provides the flexibility needed for responsive layouts. This is textbook execution.",
                        icon: "📐"
                    },
                    {
                        category: "Motion Design",
                        type: "POSITIVE",
                        title: "Purposeful Animation Strategy",
                        description: "The motion design strikes the perfect balance between productive and expressive. Functional transitions are snappy (70-110ms), while moments of delight use more expressive timing (240-400ms). The easing curves follow Carbon standards, creating a cohesive feel throughout. This elevates the entire experience.",
                        icon: "✨"
                    },
                    {
                        category: "Accessibility",
                        type: "WARNING",
                        title: "Keyboard Navigation Enhancement Opportunity",
                        description: "While contrast ratios are excellent, keyboard navigation could be more robust. Some interactive elements need more prominent focus indicators. This is about inclusive design—ensuring everyone, regardless of how they interact with the interface, has a first-class experience.",
                        icon: "♿"
                    },
                    {
                        category: "Color System",
                        type: "POSITIVE",
                        title: "Masterful Color Token Usage",
                        description: "The color implementation is sophisticated and consistent. Proper theme application, correct token usage for backgrounds, text, and interactive elements—it all works together harmoniously. This level of system thinking is what separates good design from great design.",
                        icon: "🎨"
                    },
                    {
                        category: "Design Philosophy",
                        type: "POSITIVE",
                        title: "Balanced Design Approach",
                        description: "This interface embodies the best of both productive and expressive design. It's efficient without being cold, delightful without being frivolous. The micro-interactions add personality while the overall structure maintains professionalism. This is the sweet spot we're always aiming for.",
                        icon: "✨"
                    }
                ],
                xpReward: 175,
                xpMessage: "Excellent execution. Polish the accessibility details and this is portfolio-worthy work. Keep pushing the boundaries.",
                carbonCompliance: "HIGH",
                ibmIdlAlignment: "EXCELLENT"
            },
            {
                overallImpression: "Let's be direct: this needs significant work. While there's a basic understanding of layout principles, the execution is undermining the design's effectiveness. We're seeing custom components where Carbon components should be used, inconsistent spacing that creates visual chaos, and accessibility issues that will block users. The good news? These are all fixable problems. Let's roll up our sleeves and elevate this to professional standards.",
                designScore: 62,
                accessibilityScore: 58,
                findings: [
                    {
                        category: "Component Strategy",
                        type: "CRITICAL",
                        title: "Component Library Misalignment",
                        description: "Custom-built components are creating maintenance debt and inconsistency. Carbon provides battle-tested components for a reason—they're accessible, responsive, and proven at scale. Let's replace these custom elements with Carbon components. It's not about limiting creativity; it's about building on a solid foundation.",
                        icon: "⚛️"
                    },
                    {
                        category: "Typography",
                        type: "CRITICAL",
                        title: "Font Family Violation",
                        description: "Non-IBM Plex fonts are being used, which breaks brand consistency and can cause licensing issues. IBM Plex isn't just a font choice—it's part of our design language. Use Plex Sans for UI, Plex Mono for code, and Plex Serif sparingly for editorial content.",
                        icon: "📝"
                    },
                    {
                        category: "Accessibility",
                        type: "CRITICAL",
                        title: "Critical Accessibility Gaps",
                        description: "Multiple WCAG violations: insufficient contrast (2.8:1 vs required 4.5:1), missing alt text, no keyboard navigation support, poor screen reader compatibility. This isn't optional—accessibility is a fundamental requirement. We need to address these immediately.",
                        icon: "♿"
                    },
                    {
                        category: "Spacing System",
                        type: "WARNING",
                        title: "Inconsistent Spacing Pattern",
                        description: "Random spacing values (7px, 13px, 19px, 27px) create visual inconsistency. The 8px grid system exists to create rhythm and predictability. Commit to the spacing tokens, and watch how much more polished everything becomes. Small details, big impact.",
                        icon: "📐"
                    },
                    {
                        category: "Inclusive Design",
                        type: "WARNING",
                        title: "Universal Design Considerations Missing",
                        description: "The design makes assumptions about user abilities and contexts. Touch targets are too small (below 44x44px), there's no internationalization support, and the interface isn't optimized for assistive technologies. Universal design isn't a nice-to-have—it's how we ensure our work reaches everyone.",
                        icon: "🌍"
                    },
                    {
                        category: "Information Architecture",
                        type: "POSITIVE",
                        title: "Solid Information Structure",
                        description: "Despite other issues, the information hierarchy is clear and logical. Users can understand the page structure and find what they need. This is a strong foundation to build upon. Let's maintain this clarity while we address the other concerns.",
                        icon: "👁️"
                    }
                ],
                xpReward: 75,
                xpMessage: "There's work to do, but every expert started somewhere. Study the Carbon documentation, iterate, and come back stronger. You've got this.",
                carbonCompliance: "LOW",
                ibmIdlAlignment: "NEEDS_IMPROVEMENT"
            }
        ];
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