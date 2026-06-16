/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN CRITIQUE DUNGEON - AI Analyzer
   Multi-provider AI integration (Azure OpenAI, Anthropic Claude, OpenAI)
   ═══════════════════════════════════════════════════════════════════════════ */

class AIAnalyzer {
    constructor() {
        // Use proxy server to avoid CORS issues
        this.proxyUrl = window.location.origin;
    }
    
    /**
     * Analyze an image using the configured AI provider
     */
    async analyzeImage(imageBase64) {
        if (!ConfigHelper.hasApiKey()) {
            throw new Error('AI API credentials not configured. Please add your credentials in settings.');
        }
        
        const provider = ConfigHelper.getProvider();
        
        try {
            let analysisData;
            
            if (provider === 'azure') {
                analysisData = await this.analyzeWithAzure(imageBase64);
            } else if (provider === 'anthropic') {
                analysisData = await this.analyzeWithAnthropic(imageBase64);
            } else if (provider === 'openai') {
                analysisData = await this.analyzeWithOpenAI(imageBase64);
            } else {
                throw new Error(`Unknown AI provider: ${provider}`);
            }
            
            return analysisData;
            
        } catch (error) {
            console.error('AI Analysis Error:', error);
            throw error;
        }
    }
    
    /**
     * Analyze with Azure OpenAI (Recommended for enterprise/Copilot users)
     */
    async analyzeWithAzure(imageBase64) {
        const response = await fetch(`${this.proxyUrl}/api/analyze/azure`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                endpoint: CONFIG.AZURE_ENDPOINT.replace(/\/$/, ''),
                apiKey: CONFIG.AZURE_API_KEY,
                deployment: CONFIG.AZURE_DEPLOYMENT_NAME,
                apiVersion: CONFIG.AZURE_API_VERSION,
                imageBase64: imageBase64,
                prompt: CONFIG.ANALYSIS_PROMPT
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || `Azure API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        const content = data.choices[0].message.content;
        
        return this.parseAnalysisResponse(content);
    }
    
    /**
     * Analyze with Anthropic Claude
     */
    async analyzeWithAnthropic(imageBase64) {
        const response = await fetch(`${this.proxyUrl}/api/analyze/anthropic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: CONFIG.ANTHROPIC_API_KEY,
                model: CONFIG.ANTHROPIC_MODEL,
                imageBase64: imageBase64,
                prompt: CONFIG.ANALYSIS_PROMPT
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || `Anthropic API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        const content = data.content[0].text;
        
        return this.parseAnalysisResponse(content);
    }
    
    /**
     * Analyze with OpenAI (Original implementation)
     */
    async analyzeWithOpenAI(imageBase64) {
        const response = await fetch(`${this.proxyUrl}/api/analyze/openai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: CONFIG.OPENAI_API_KEY,
                model: CONFIG.OPENAI_MODEL,
                imageBase64: imageBase64,
                prompt: CONFIG.ANALYSIS_PROMPT
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'OpenAI API request failed');
        }
        
        const data = await response.json();
        const content = data.choices[0].message.content;
        
        return this.parseAnalysisResponse(content);
    }
    
    /**
     * Parse the AI response into structured data
     */
    parseAnalysisResponse(content) {
        try {
            // Try to extract JSON from the response
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                
                // Validate required fields
                if (!parsed.overallImpression || !parsed.designScore || !parsed.findings) {
                    throw new Error('Invalid response structure');
                }
                
                // Ensure scores are numbers
                parsed.designScore = parseInt(parsed.designScore) || 0;
                parsed.accessibilityScore = parseInt(parsed.accessibilityScore) || 0;
                parsed.xpReward = parseInt(parsed.xpReward) || CONFIG.XP_PER_ANALYSIS;
                
                // Ensure findings have required fields
                parsed.findings = parsed.findings.map(finding => ({
                    category: finding.category || 'General',
                    type: finding.type || 'WARNING',
                    title: finding.title || 'Observation',
                    description: finding.description || '',
                    icon: finding.icon || '⚔️'
                }));
                
                return parsed;
            }
            
            throw new Error('Could not parse JSON from response');
            
        } catch (error) {
            console.error('Parse Error:', error);
            // Return fallback analysis
            return this.getFallbackAnalysis();
        }
    }
    
    /**
     * Get fallback analysis if AI fails
     */
    getFallbackAnalysis() {
        return {
            overallImpression: "The Dungeon Master's vision is clouded. A mysterious force prevents full analysis of this interface. However, basic observations can still be made.",
            designScore: 70,
            accessibilityScore: 65,
            findings: [
                {
                    category: 'Analysis Status',
                    type: 'WARNING',
                    title: 'Limited Analysis Available',
                    description: 'The AI analysis encountered an issue. Please try again or check your API configuration.',
                    icon: '⚠️'
                },
                {
                    category: 'General Observation',
                    type: 'POSITIVE',
                    title: 'Interface Detected',
                    description: 'Your interface has been successfully uploaded and is ready for analysis.',
                    icon: '✅'
                }
            ],
            xpReward: 25,
            xpMessage: 'Partial experience awarded for attempting the quest.'
        };
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
        
        // Convert to base64
        const base64Image = await this.imageToBase64(file);
        
        // Analyze with AI
        const analysisData = await this.analyzeImage(base64Image);
        
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
     * Test API connection for current provider
     */
    async testConnection() {
        if (!ConfigHelper.hasApiKey()) {
            return {
                success: false,
                message: 'No API credentials configured'
            };
        }
        
        const provider = ConfigHelper.getProvider();
        
        try {
            if (provider === 'azure') {
                return await this.testAzureConnection();
            } else if (provider === 'anthropic') {
                return await this.testAnthropicConnection();
            } else if (provider === 'openai') {
                return await this.testOpenAIConnection();
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    /**
     * Test Azure OpenAI connection
     */
    async testAzureConnection() {
        try {
            const response = await fetch(`${this.proxyUrl}/api/health`);
            if (response.ok) {
                return {
                    success: true,
                    message: 'Azure OpenAI connection ready (via proxy server)'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'Proxy server not running. Please start the server with: npm start'
            };
        }
    }
    
    /**
     * Test Anthropic connection
     */
    async testAnthropicConnection() {
        try {
            const response = await fetch(`${this.proxyUrl}/api/health`);
            if (response.ok) {
                return {
                    success: true,
                    message: 'Anthropic Claude connection ready (via proxy server)'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'Proxy server not running. Please start the server with: npm start'
            };
        }
    }
    
    /**
     * Test OpenAI connection
     */
    async testOpenAIConnection() {
        try {
            const response = await fetch(`${this.proxyUrl}/api/health`);
            if (response.ok) {
                return {
                    success: true,
                    message: 'OpenAI connection ready (via proxy server)'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'Proxy server not running. Please start the server with: npm start'
            };
        }
    }
}

// Initialize AI Analyzer
const aiAnalyzer = new AIAnalyzer();

// Made with Bob
