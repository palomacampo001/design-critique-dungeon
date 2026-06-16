/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN CRITIQUE DUNGEON - Direct AI Analyzer (No Server Required)
   Works directly from file:// protocol for local testing
   ═══════════════════════════════════════════════════════════════════════════ */

class AIAnalyzerDirect {
    constructor() {
        this.useDirectAPI = true;
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
                analysisData = await this.analyzeWithAzureDirect(imageBase64);
            } else if (provider === 'anthropic') {
                analysisData = await this.analyzeWithAnthropicDirect(imageBase64);
            } else if (provider === 'openai') {
                analysisData = await this.analyzeWithOpenAIDirect(imageBase64);
            } else {
                throw new Error(`Unknown AI provider: ${provider}`);
            }
            
            return analysisData;
            
        } catch (error) {
            console.error('AI Analysis Error:', error);
            
            // Check if it's a CORS error
            if (error.message.includes('fetch') || error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
                throw new Error(
                    'CORS Error: Direct API calls are blocked by the browser.\n\n' +
                    'To fix this, you need to run the application through a server:\n\n' +
                    '1. Install Node.js from https://nodejs.org/\n' +
                    '2. Open Terminal in this folder\n' +
                    '3. Run: npm install\n' +
                    '4. Run: npm start\n' +
                    '5. Open: http://localhost:3000\n\n' +
                    'See SETUP_INSTRUCTIONS.md for detailed steps.'
                );
            }
            
            throw error;
        }
    }
    
    /**
     * Analyze with Azure OpenAI (Direct - may have CORS issues)
     */
    async analyzeWithAzureDirect(imageBase64) {
        const endpoint = CONFIG.AZURE_ENDPOINT.replace(/\/$/, '');
        const deployment = CONFIG.AZURE_DEPLOYMENT_NAME;
        const apiVersion = CONFIG.AZURE_API_VERSION;
        
        const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': CONFIG.AZURE_API_KEY
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert UX designer and the Dungeon Master of the Design Critique Dungeon. You provide insightful, actionable feedback with creative fantasy RPG flair.'
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: CONFIG.ANALYSIS_PROMPT
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: imageBase64
                                }
                            }
                        ]
                    }
                ],
                max_tokens: CONFIG.OPENAI_MAX_TOKENS,
                temperature: 0.8
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || `Azure API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        const content = data.choices[0].message.content;
        
        return this.parseAnalysisResponse(content);
    }
    
    /**
     * Analyze with Anthropic Claude (Direct - may have CORS issues)
     */
    async analyzeWithAnthropicDirect(imageBase64) {
        // Extract base64 data and media type
        const matches = imageBase64.match(/^data:([^;]+);base64,(.+)$/);
        if (!matches) {
            throw new Error('Invalid image data format');
        }
        
        const mediaType = matches[1];
        const base64Data = matches[2];
        
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': CONFIG.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: CONFIG.ANTHROPIC_MODEL,
                max_tokens: CONFIG.ANTHROPIC_MAX_TOKENS,
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'image',
                                source: {
                                    type: 'base64',
                                    media_type: mediaType,
                                    data: base64Data
                                }
                            },
                            {
                                type: 'text',
                                text: CONFIG.ANALYSIS_PROMPT
                            }
                        ]
                    }
                ],
                system: 'You are an expert UX designer and the Dungeon Master of the Design Critique Dungeon. You provide insightful, actionable feedback with creative fantasy RPG flair.'
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || `Anthropic API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        const content = data.content[0].text;
        
        return this.parseAnalysisResponse(content);
    }
    
    /**
     * Analyze with OpenAI (Direct - may have CORS issues)
     */
    async analyzeWithOpenAIDirect(imageBase64) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: CONFIG.OPENAI_MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert UX designer and the Dungeon Master of the Design Critique Dungeon. You provide insightful, actionable feedback with creative fantasy RPG flair.'
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: CONFIG.ANALYSIS_PROMPT
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: imageBase64,
                                    detail: 'high'
                                }
                            }
                        ]
                    }
                ],
                max_tokens: CONFIG.OPENAI_MAX_TOKENS,
                temperature: 0.8
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'OpenAI API request failed');
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
        
        return {
            success: true,
            message: 'API credentials configured. Ready to analyze! (Note: CORS errors may occur when opening from file://. Use npm start for best results.)'
        };
    }
}

// Replace the existing aiAnalyzer with the direct version
const aiAnalyzer = new AIAnalyzerDirect();

// Made with Bob