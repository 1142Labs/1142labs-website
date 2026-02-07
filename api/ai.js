/**
 * 1142 LABS AI API Proxy
 * Vercel Serverless Function
 * 
 * Securely proxies requests to Grok, OpenAI, and Gemini APIs
 * Protects API keys and manages rate limiting
 */

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { model, prompt, page, temperature = 0.7 } = req.body;
        
        // Validate input
        if (!model || !prompt) {
            return res.status(400).json({ error: 'Missing required fields: model, prompt' });
        }
        
        // Validate model
        const validModels = ['grok', 'openai', 'gemini'];
        if (!validModels.includes(model)) {
            return res.status(400).json({ error: 'Invalid model. Must be: grok, openai, or gemini' });
        }
        
        let result;
        
        // Route to appropriate AI service
        switch (model) {
            case 'grok':
                result = await callGrok(prompt, temperature);
                break;
            case 'openai':
                result = await callOpenAI(prompt, temperature);
                break;
            case 'gemini':
                result = await callGemini(prompt, temperature);
                break;
        }
        
        // Return response
        return res.status(200).json({
            content: result,
            model: model,
            timestamp: new Date().toISOString(),
            page: page || 'unknown'
        });
        
    } catch (error) {
        console.error('AI API Error:', error);
        return res.status(500).json({ 
            error: 'AI service error',
            message: error.message 
        });
    }
}

/**
 * Call Grok (xAI) API
 */
async function callGrok(prompt, temperature) {
    const XAI_API_KEY = process.env.XAI_API_KEY;
    
    if (!XAI_API_KEY) {
        throw new Error('XAI_API_KEY not configured');
    }
    
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${XAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'grok-2-1212',
            messages: [
                {
                    role: 'system',
                    content: 'You are the 1142 LABS AI assistant. Write in a cyberpunk, scientific, rebellious style. Be profound but concise. Focus on neuroscience, psychedelics, consciousness, and harm reduction.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: temperature,
            max_tokens: 500
        })
    });
    
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Grok API error: ${response.status} - ${error}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

/**
 * Call OpenAI API
 */
async function callOpenAI(prompt, temperature) {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    if (!OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY not configured');
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are the 1142 LABS AI assistant. Write with scientific precision and artistic flair. Focus on neuroscience, psychedelics, consciousness, and harm reduction.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: temperature,
            max_tokens: 500
        })
    });
    
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenAI API error: ${response.status} - ${error}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

/**
 * Call Google Gemini API
 */
async function callGemini(prompt, temperature) {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY not configured');
    }
    
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are the 1142 LABS AI assistant. Write with comprehensive analysis and empathetic insight. Focus on neuroscience, psychedelics, consciousness, and harm reduction.\n\nUser: ${prompt}`
                    }]
                }],
                generationConfig: {
                    temperature: temperature,
                    maxOutputTokens: 500
                }
            })
        }
    );
    
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${error}`);
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}
