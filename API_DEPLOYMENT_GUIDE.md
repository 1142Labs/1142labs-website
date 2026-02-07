# 1142 LABS AI API BACKEND - DEPLOYMENT GUIDE

This guide will help you deploy the AI backend API proxy to Vercel Serverless Functions, enabling real Grok, OpenAI, and Gemini API calls.

---

## 📋 PREREQUISITES

1. **Vercel Account** - Sign up at https://vercel.com
2. **API Keys** - You need keys for:
   - Grok (xAI): https://console.x.ai
   - OpenAI: https://platform.openai.com/api-keys
   - Google Gemini: https://ai.google.dev

3. **GitHub Repository** - Your 1142labs-website repo

---

## 🚀 DEPLOYMENT STEPS

### **Step 1: Install Vercel CLI (Optional)**

```bash
npm install -g vercel
```

### **Step 2: Set Environment Variables in Vercel**

Go to your Vercel project dashboard:
1. Navigate to **Settings** → **Environment Variables**
2. Add the following secrets:

**XAI_API_KEY**
- Value: Your Grok API key from https://console.x.ai
- Environment: Production, Preview, Development

**OPENAI_API_KEY**
- Value: Your OpenAI API key from https://platform.openai.com
- Environment: Production, Preview, Development

**GEMINI_API_KEY**
- Value: Your Google Gemini API key from https://ai.google.dev
- Environment: Production, Preview, Development

### **Step 3: Deploy to Vercel**

**Option A: Automatic (via GitHub)**
1. Push your code to GitHub (already done)
2. Vercel will auto-deploy when it detects changes
3. Check deployment status in Vercel dashboard

**Option B: Manual (via CLI)**
```bash
cd /path/to/1142labs-website
vercel --prod
```

### **Step 4: Verify API Endpoint**

Your API will be available at:
```
https://your-domain.vercel.app/api/ai
```

Test with curl:
```bash
curl -X POST https://your-domain.vercel.app/api/ai \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok",
    "prompt": "Generate a profound insight about consciousness",
    "page": "test"
  }'
```

Expected response:
```json
{
  "content": "AI-generated text...",
  "model": "grok",
  "timestamp": "2026-02-06T23:30:00Z",
  "page": "test"
}
```

---

## 🔧 API ENDPOINT DOCUMENTATION

### **POST /api/ai**

Generate AI content using Grok, OpenAI, or Gemini.

**Request Body:**
```json
{
  "model": "grok",           // Required: "grok", "openai", or "gemini"
  "prompt": "Your prompt",   // Required: Text prompt for AI
  "page": "index",           // Optional: Page context
  "temperature": 0.7         // Optional: 0.0-1.0 (default: 0.7)
}
```

**Response:**
```json
{
  "content": "AI-generated response",
  "model": "grok",
  "timestamp": "2026-02-06T23:30:00Z",
  "page": "index"
}
```

**Error Response:**
```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad request (missing/invalid parameters)
- `405` - Method not allowed (only POST accepted)
- `500` - Server error (API failure)

---

## 🔐 SECURITY FEATURES

### **1. API Key Protection**
- API keys stored as Vercel environment variables
- Never exposed in frontend code
- Accessed only in serverless functions

### **2. CORS Configuration**
- Allows requests from any origin (can be restricted)
- Handles preflight OPTIONS requests
- Secure headers included

### **3. Input Validation**
- Validates model parameter
- Requires prompt field
- Sanitizes user input

### **4. Rate Limiting**
- Vercel automatically rate limits serverless functions
- 10-second max duration per request
- 1024 MB memory allocation

---

## 🎯 FRONTEND INTEGRATION

The frontend (`assets/js/ai-integration.js`) needs to be updated to use the real API endpoint.

**Current (Simulated):**
```javascript
async callAI(model, prompt, options = {}) {
    // Simulated responses
    const responses = {
        grok: await this.simulateGrokResponse(prompt),
        openai: await this.simulateOpenAIResponse(prompt),
        gemini: await this.simulateGeminiResponse(prompt)
    };
    return responses[model];
}
```

**Updated (Real API):**
```javascript
async callAI(model, prompt, options = {}) {
    const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: model,
            prompt: prompt,
            page: document.body.dataset.page || 'unknown',
            temperature: options.temperature || 0.7
        })
    });
    
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.content;
}
```

---

## 🧪 TESTING

### **Test Each AI Model**

**Grok:**
```bash
curl -X POST https://your-domain.vercel.app/api/ai \
  -H "Content-Type: application/json" \
  -d '{"model":"grok","prompt":"What is consciousness?"}'
```

**OpenAI:**
```bash
curl -X POST https://your-domain.vercel.app/api/ai \
  -H "Content-Type: application/json" \
  -d '{"model":"openai","prompt":"Explain neuroplasticity"}'
```

**Gemini:**
```bash
curl -X POST https://your-domain.vercel.app/api/ai \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini","prompt":"Describe LSD pharmacology"}'
```

### **Test Error Handling**

**Missing model:**
```bash
curl -X POST https://your-domain.vercel.app/api/ai \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Test"}'
```

Expected: `400 Bad Request`

**Invalid model:**
```bash
curl -X POST https://your-domain.vercel.app/api/ai \
  -H "Content-Type: application/json" \
  -d '{"model":"invalid","prompt":"Test"}'
```

Expected: `400 Bad Request`

---

## 📊 MONITORING

### **Vercel Dashboard**
- View function invocations
- Monitor response times
- Check error rates
- Track bandwidth usage

### **Logs**
Access logs via:
```bash
vercel logs
```

Or in Vercel dashboard: **Deployments** → **Functions** → **Logs**

---

## 💰 COST ESTIMATION

### **Vercel (Free Tier)**
- 100 GB bandwidth/month
- 100 GB-hours serverless function execution
- Unlimited API requests (within limits)

### **AI APIs**

**Grok (xAI):**
- Pricing: https://x.ai/pricing
- Model: grok-2-1212
- ~$0.002 per 1K tokens

**OpenAI:**
- Pricing: https://openai.com/pricing
- Model: gpt-4
- ~$0.03 per 1K tokens (input)
- ~$0.06 per 1K tokens (output)

**Google Gemini:**
- Pricing: https://ai.google.dev/pricing
- Model: gemini-2.0-flash-exp
- Free tier: 1,500 requests/day
- Paid: ~$0.00025 per 1K tokens

**Estimated Monthly Cost (1000 requests):**
- Grok: ~$2-5
- OpenAI: ~$30-60
- Gemini: Free (under 1,500/day)
- **Total: ~$35-70/month**

---

## 🔄 UPDATING THE API

### **Modify API Logic**
1. Edit `api/ai.js`
2. Commit and push to GitHub
3. Vercel auto-deploys

### **Add New AI Models**
1. Add new function (e.g., `callClaude()`)
2. Update `validModels` array
3. Add switch case
4. Set environment variable
5. Deploy

---

## 🐛 TROUBLESHOOTING

### **"API Key Not Configured" Error**
- Verify environment variables in Vercel dashboard
- Ensure variable names match exactly: `XAI_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY`
- Redeploy after adding variables

### **403/404 Errors**
- Check API key validity
- Verify API endpoint URLs
- Ensure API keys have correct permissions

### **CORS Errors**
- Verify CORS headers in `api/ai.js`
- Check browser console for specific error
- Ensure OPTIONS requests are handled

### **Timeout Errors**
- Increase `maxDuration` in `vercel.json` (max 60s on Pro plan)
- Reduce `max_tokens` in API calls
- Check AI service status

---

## 🎯 NEXT STEPS

1. **Deploy Backend** - Follow steps above
2. **Update Frontend** - Modify `ai-integration.js` to use real API
3. **Test Thoroughly** - Verify all three AI models work
4. **Monitor Usage** - Track API costs and performance
5. **Optimize** - Add caching, rate limiting, error handling

---

## 📚 RESOURCES

- **Vercel Docs:** https://vercel.com/docs/functions/serverless-functions
- **Grok API:** https://docs.x.ai
- **OpenAI API:** https://platform.openai.com/docs
- **Gemini API:** https://ai.google.dev/docs

---

**Your AI backend is ready to deploy. Follow these steps, and the 1142 LABS website will have real AI-powered features using Grok, OpenAI, and Gemini.**
