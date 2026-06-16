# 🚀 Deployment Guide - Design Critique Dungeon

This guide explains how to deploy the Design Critique Dungeon online.

## 📋 Prerequisites

- Node.js 14+ installed
- An AI provider API key (Azure OpenAI, Anthropic Claude, or OpenAI)
- A hosting platform account (Heroku, Railway, Render, or similar)

## 🔧 Local Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Keys

Open the application in your browser and click the ⚙️ settings button to configure your AI provider credentials. These are stored locally in your browser.

### 3. Start the Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🌐 Online Deployment

### Option 1: Deploy to Heroku

1. **Create a Heroku account** at https://heroku.com

2. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

3. **Login to Heroku**
   ```bash
   heroku login
   ```

4. **Create a new Heroku app**
   ```bash
   heroku create your-app-name
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

6. **Open your app**
   ```bash
   heroku open
   ```

### Option 2: Deploy to Railway

1. **Create a Railway account** at https://railway.app

2. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

3. **Login to Railway**
   ```bash
   railway login
   ```

4. **Initialize and deploy**
   ```bash
   railway init
   railway up
   ```

5. **Generate domain**
   ```bash
   railway domain
   ```

### Option 3: Deploy to Render

1. **Create a Render account** at https://render.com

2. **Create a new Web Service**
   - Connect your GitHub repository
   - Select "Node" as the environment
   - Build command: `npm install`
   - Start command: `npm start`

3. **Deploy**
   - Render will automatically deploy your app
   - You'll get a URL like `https://your-app.onrender.com`

### Option 4: Deploy to Vercel (with Serverless Functions)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Create `vercel.json`** (already included in the project)

3. **Deploy**
   ```bash
   vercel
   ```

4. **Production deployment**
   ```bash
   vercel --prod
   ```

## 🔐 Security Considerations

### API Key Storage

**IMPORTANT:** API keys are stored in the browser's localStorage and are NEVER sent to any server except the AI provider's API (via the proxy).

- Keys are stored locally on each user's device
- Each user must configure their own API keys
- Keys are not shared between users
- The proxy server does not store or log API keys

### For Production Use

If you want to provide a shared service:

1. **Server-side API key management**: Store API keys as environment variables on your server
2. **User authentication**: Implement user accounts and authentication
3. **Rate limiting**: Add rate limiting to prevent abuse
4. **Usage tracking**: Monitor API usage and costs

Example environment variables for server-side keys:

```bash
# .env file (DO NOT COMMIT THIS FILE)
AZURE_ENDPOINT=https://your-resource.openai.azure.com
AZURE_API_KEY=your-azure-key
AZURE_DEPLOYMENT=gpt-4o
ANTHROPIC_API_KEY=your-anthropic-key
OPENAI_API_KEY=your-openai-key
```

Then modify `server.js` to use these instead of accepting them from the client.

## 🧪 Testing Your Deployment

1. **Open your deployed URL**
2. **Click the ⚙️ settings button**
3. **Configure your AI provider**
4. **Upload a test image**
5. **Click "Enter the Dungeon"**

If you see an error about the proxy server, make sure:
- The server is running
- The port is correctly configured
- Your hosting platform allows the required ports

## 📊 Monitoring

### Check Server Status

Visit `https://your-app-url.com/api/health` to verify the server is running.

Expected response:
```json
{
  "status": "ok",
  "message": "Design Critique Dungeon API is running"
}
```

### View Logs

**Heroku:**
```bash
heroku logs --tail
```

**Railway:**
```bash
railway logs
```

**Render:**
Check the logs in the Render dashboard

## 🐛 Troubleshooting

### "Proxy server not running" error

**Solution:** Make sure the server is started with `npm start`

### CORS errors

**Solution:** The proxy server handles CORS. Ensure you're accessing the app through the same domain as the server.

### Image upload fails

**Solution:** 
- Check file size (max 10MB)
- Ensure file type is PNG, JPG, or WebP
- Try a smaller image

### API connection fails

**Solution:**
- Verify your API keys are correct
- Check your API provider's status page
- Ensure you have sufficient API credits

## 💰 Cost Considerations

### API Costs

- **Azure OpenAI**: Typically included with Microsoft 365 Copilot subscriptions
- **Anthropic Claude**: Pay-per-use, ~$3-15 per 1M tokens
- **OpenAI**: Pay-per-use, ~$2.50-10 per 1M tokens

Each analysis uses approximately 1,000-2,000 tokens depending on image complexity.

### Hosting Costs

- **Heroku**: Free tier available (with limitations)
- **Railway**: $5/month for hobby plan
- **Render**: Free tier available
- **Vercel**: Free tier available

## 🔄 Updates

To update your deployed application:

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Redeploy**
   - Heroku: `git push heroku main`
   - Railway: `railway up`
   - Render: Automatic on git push
   - Vercel: `vercel --prod`

## 📞 Support

For issues or questions:
- Check the [README.md](README.md)
- Review [SETUP_GUIDE.md](SETUP_GUIDE.md)
- Open an issue on GitHub

---

**Made with ⚔️ by Bob**