/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN CRITIQUE DUNGEON - Main Application
   Core application logic and event handlers
   ═══════════════════════════════════════════════════════════════════════════ */

class DesignCritiqueDungeon {
    constructor() {
        this.currentFile = null;
        this.currentAnalysis = null;
        this.init();
    }
    
    /**
     * Initialize the application
     */
    init() {
        this.setupEventListeners();
        this.checkApiKeyStatus();
    }
    
    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Upload zone events
        const uploadZone = document.getElementById('uploadZone');
        const fileInput = document.getElementById('fileInput');
        
        uploadZone.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Drag and drop events
        uploadZone.addEventListener('dragover', (e) => this.handleDragOver(e));
        uploadZone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        uploadZone.addEventListener('drop', (e) => this.handleDrop(e));
        
        // Button events
        document.getElementById('btnAnalyze').addEventListener('click', () => this.startAnalysis());
        document.getElementById('btnRemove').addEventListener('click', () => this.removeImage());
        document.getElementById('btnSettings').addEventListener('click', () => this.openSettings());
        document.getElementById('btnCloseModal').addEventListener('click', () => this.closeSettings());
        document.getElementById('btnSaveConfig').addEventListener('click', () => this.saveConfiguration());
        
        // Provider selection
        document.getElementById('providerSelect').addEventListener('change', (e) => this.handleProviderChange(e));
        
        // Close modal on outside click
        document.getElementById('configModal').addEventListener('click', (e) => {
            if (e.target.id === 'configModal') {
                this.closeSettings();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSettings();
            }
        });
    }
    
    /**
     * Check API key status on load
     */
    checkApiKeyStatus() {
        // In demo mode, show demo message instead
        if (typeof aiAnalyzer !== 'undefined' && aiAnalyzer.demoMode) {
            setTimeout(() => {
                this.showDemoMessage();
            }, 1000);
        } else if (!ConfigHelper.hasApiKey()) {
            setTimeout(() => {
                this.showApiKeyPrompt();
            }, 1000);
        }
    }
    
    /**
     * Show demo mode message
     */
    showDemoMessage() {
        alert(
            '🎮 DEMO MODE ACTIVE!\n\n' +
            '✨ No API key required!\n\n' +
            'Upload any design screenshot to see a sample AI critique.\n\n' +
            'This demo uses pre-written responses to show you how the app works.\n\n' +
            'Perfect for testing and showing to stakeholders!'
        );
    }
    
    /**
     * Show API key prompt
     */
    showApiKeyPrompt() {
        const prompt = confirm(
            '⚔️ Welcome to the Design Critique Dungeon!\n\n' +
            'To begin your quest, you need to configure an AI provider.\n\n' +
            'Would you like to configure it now?'
        );
        
        if (prompt) {
            this.openSettings();
        }
    }
    
    /**
     * Handle provider selection change
     */
    handleProviderChange(event) {
        const provider = event.target.value;
        
        // Hide all provider configs
        document.getElementById('azureConfig').classList.add('hidden');
        document.getElementById('anthropicConfig').classList.add('hidden');
        document.getElementById('openaiConfig').classList.add('hidden');
        
        // Show selected provider config
        if (provider === 'azure') {
            document.getElementById('azureConfig').classList.remove('hidden');
        } else if (provider === 'anthropic') {
            document.getElementById('anthropicConfig').classList.remove('hidden');
        } else if (provider === 'openai') {
            document.getElementById('openaiConfig').classList.remove('hidden');
        }
    }
    
    /**
     * Handle file selection
     */
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this.loadImage(file);
        }
    }
    
    /**
     * Handle drag over
     */
    handleDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.classList.add('dragover');
    }
    
    /**
     * Handle drag leave
     */
    handleDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.classList.remove('dragover');
    }
    
    /**
     * Handle file drop
     */
    handleDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.classList.remove('dragover');
        
        const file = event.dataTransfer.files[0];
        if (file) {
            this.loadImage(file);
        }
    }
    
    /**
     * Load and preview image
     */
    async loadImage(file) {
        // Validate file
        const validation = ConfigHelper.validateFile(file);
        if (!validation.valid) {
            alert('❌ ' + validation.errors.join('\n'));
            return;
        }
        
        try {
            // Store file
            this.currentFile = file;
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('previewImage').src = e.target.result;
                
                // Show preview, hide upload zone
                document.getElementById('uploadZone').classList.add('hidden');
                document.getElementById('imagePreview').classList.remove('hidden');
                document.getElementById('imagePreview').classList.add('fade-in');
            };
            reader.readAsDataURL(file);
            
        } catch (error) {
            console.error('Error loading image:', error);
            alert('❌ Failed to load image. Please try again.');
        }
    }
    
    /**
     * Remove current image
     */
    removeImage() {
        this.currentFile = null;
        document.getElementById('fileInput').value = '';
        document.getElementById('previewImage').src = '';
        
        // Show upload zone, hide preview
        document.getElementById('imagePreview').classList.add('hidden');
        document.getElementById('uploadZone').classList.remove('hidden');
        document.getElementById('resultsArea').classList.add('hidden');
    }
    
    /**
     * Start analysis process
     */
    async startAnalysis() {
        if (!this.currentFile) {
            alert('❌ Please upload an image first.');
            return;
        }
        
        if (!ConfigHelper.hasApiKey()) {
            alert('❌ Please configure your AI provider credentials in settings.');
            this.openSettings();
            return;
        }
        
        try {
            // Show loading state
            this.showLoadingState();
            
            // Start loading animation
            const loadingInterval = dungeonMaster.animateLoadingText();
            
            // Perform analysis
            const analysisData = await aiAnalyzer.performAnalysis(this.currentFile);
            this.currentAnalysis = analysisData;
            
            // Clear loading interval
            clearInterval(loadingInterval);
            
            // Hide loading state
            this.hideLoadingState();
            
            // Record analysis in gamification system
            gamificationSystem.recordAnalysis(analysisData);
            
            // Award XP
            gamificationSystem.awardXP(analysisData.xpReward, 'Dungeon cleared');
            
            // Render results
            dungeonMaster.renderCritique(analysisData);
            
        } catch (error) {
            console.error('Analysis Error:', error);
            this.hideLoadingState();
            
            alert(
                '❌ Analysis Failed\n\n' +
                error.message + '\n\n' +
                'Please check your API key and try again.'
            );
        }
    }
    
    /**
     * Show loading state
     */
    showLoadingState() {
        document.getElementById('imagePreview').classList.add('hidden');
        document.getElementById('resultsArea').classList.add('hidden');
        document.getElementById('loadingState').classList.remove('hidden');
        document.getElementById('loadingState').classList.add('fade-in');
    }
    
    /**
     * Hide loading state
     */
    hideLoadingState() {
        document.getElementById('loadingState').classList.add('hidden');
    }
    
    /**
     * Open settings modal
     */
    openSettings() {
        const modal = document.getElementById('configModal');
        const providerSelect = document.getElementById('providerSelect');
        
        // Set current provider
        providerSelect.value = ConfigHelper.getProvider();
        
        // Pre-fill current credentials
        if (CONFIG.AI_PROVIDER === 'azure') {
            document.getElementById('azureEndpoint').value = CONFIG.AZURE_ENDPOINT;
            document.getElementById('azureApiKey').value = CONFIG.AZURE_API_KEY;
            document.getElementById('azureDeployment').value = CONFIG.AZURE_DEPLOYMENT_NAME;
        } else if (CONFIG.AI_PROVIDER === 'anthropic') {
            document.getElementById('anthropicApiKey').value = CONFIG.ANTHROPIC_API_KEY;
        } else if (CONFIG.AI_PROVIDER === 'openai') {
            document.getElementById('openaiApiKey').value = CONFIG.OPENAI_API_KEY;
        }
        
        // Show correct config section
        this.handleProviderChange({ target: providerSelect });
        
        modal.classList.remove('hidden');
        modal.classList.add('fade-in');
    }
    
    /**
     * Close settings modal
     */
    closeSettings() {
        const modal = document.getElementById('configModal');
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('fade-out');
        }, 300);
    }
    
    /**
     * Save configuration
     */
    async saveConfiguration() {
        const provider = document.getElementById('providerSelect').value;
        let config = {};
        
        // Gather credentials based on provider
        if (provider === 'azure') {
            const endpoint = document.getElementById('azureEndpoint').value.trim();
            const apiKey = document.getElementById('azureApiKey').value.trim();
            const deployment = document.getElementById('azureDeployment').value.trim();
            
            if (!endpoint || !apiKey || !deployment) {
                alert('❌ Please fill in all Azure OpenAI fields.');
                return;
            }
            
            config = { endpoint, apiKey, deployment };
        } else if (provider === 'anthropic') {
            const apiKey = document.getElementById('anthropicApiKey').value.trim();
            
            if (!apiKey) {
                alert('❌ Please enter your Anthropic API key.');
                return;
            }
            
            config = { apiKey };
        } else if (provider === 'openai') {
            const apiKey = document.getElementById('openaiApiKey').value.trim();
            
            if (!apiKey) {
                alert('❌ Please enter your OpenAI API key.');
                return;
            }
            
            config = { apiKey };
        }
        
        // Save configuration
        ConfigHelper.saveProviderConfig(provider, config);
        
        // Test connection
        const testResult = await aiAnalyzer.testConnection();
        
        if (testResult.success) {
            alert(`✅ Configuration saved successfully!\n\n${testResult.message}`);
            this.closeSettings();
        } else {
            alert(
                '⚠️ Configuration saved, but connection test failed:\n\n' +
                testResult.message + '\n\n' +
                'Please verify your credentials.'
            );
        }
    }
    
    /**
     * Show welcome tutorial (optional)
     */
    showTutorial() {
        const tutorial = `
╔═══════════════════════════════════════════════════════════════════════════╗
║                         WELCOME, BRAVE DESIGNER                           ║
╚═══════════════════════════════════════════════════════════════════════════╝

You have entered the Design Critique Dungeon, where interfaces are tested
and designers level up their craft.

HOW TO PLAY:
1. Upload a screenshot of any UI/interface
2. Click "Enter the Dungeon" to begin analysis
3. Receive detailed feedback from the Dungeon Master
4. Earn XP and level up your design skills
5. Unlock badges for achievements

TIPS:
• Higher quality designs earn more XP
• Accessibility matters - it's worth bonus XP
• Each analysis helps you improve
• Track your progress in the stats panel

Ready to begin your quest?
        `;
        
        console.log(tutorial);
    }
}

// Initialize application when DOM is ready
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new DesignCritiqueDungeon();
    });
} else {
    app = new DesignCritiqueDungeon();
}

// Log welcome message
console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║                    DESIGN CRITIQUE DUNGEON v2.0                          ║
║                                                                           ║
║                  ⚔️  Enter. Analyze. Level Up.  🛡️                       ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝

Welcome to the Design Critique Dungeon!

Built with:
- OpenAI GPT-4o (multimodal)
- Vanilla JavaScript
- Retro Terminal Aesthetics
- Gamification & XP System

Need help? Check the README or open an issue on GitHub.
`);

// Made with Bob
