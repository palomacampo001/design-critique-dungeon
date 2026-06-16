/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN CRITIQUE DUNGEON - Proxy Server
   Handles API calls to avoid CORS issues
   ═══════════════════════════════════════════════════════════════════════════ */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('.'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Design Critique Dungeon API is running' });
});

// Azure OpenAI proxy endpoint
app.post('/api/analyze/azure', async (req, res) => {
    try {
        const { endpoint, apiKey, deployment, apiVersion, imageBase64, prompt } = req.body;
        
        if (!endpoint || !apiKey || !deployment) {
            return res.status(400).json({ error: 'Missing required Azure configuration' });
        }
        
        const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
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
                                text: prompt
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
                max_tokens: 2000,
                temperature: 0.8
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json({ error: error.error?.message || 'Azure API request failed' });
        }
        
        const data = await response.json();
        res.json(data);
        
    } catch (error) {
        console.error('Azure proxy error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Anthropic Claude proxy endpoint
app.post('/api/analyze/anthropic', async (req, res) => {
    try {
        const { apiKey, model, imageBase64, prompt } = req.body;
        
        if (!apiKey) {
            return res.status(400).json({ error: 'Missing Anthropic API key' });
        }
        
        // Extract base64 data and media type
        const matches = imageBase64.match(/^data:([^;]+);base64,(.+)$/);
        if (!matches) {
            return res.status(400).json({ error: 'Invalid image data format' });
        }
        
        const mediaType = matches[1];
        const base64Data = matches[2];
        
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: model,
                max_tokens: 2000,
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
                                text: prompt
                            }
                        ]
                    }
                ],
                system: 'You are an expert UX designer and the Dungeon Master of the Design Critique Dungeon. You provide insightful, actionable feedback with creative fantasy RPG flair.'
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json({ error: error.error?.message || 'Anthropic API request failed' });
        }
        
        const data = await response.json();
        res.json(data);
        
    } catch (error) {
        console.error('Anthropic proxy error:', error);
        res.status(500).json({ error: error.message });
    }
});

// OpenAI proxy endpoint
app.post('/api/analyze/openai', async (req, res) => {
    try {
        const { apiKey, model, imageBase64, prompt } = req.body;
        
        if (!apiKey) {
            return res.status(400).json({ error: 'Missing OpenAI API key' });
        }
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
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
                                text: prompt
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
                max_tokens: 2000,
                temperature: 0.8
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json({ error: error.error?.message || 'OpenAI API request failed' });
        }
        
        const data = await response.json();
        res.json(data);
        
    } catch (error) {
        console.error('OpenAI proxy error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║                    DESIGN CRITIQUE DUNGEON SERVER                        ║
║                                                                           ║
║                         Server is running on:                            ║
║                        http://localhost:${PORT}                             ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
    `);
});

// Made with Bob
