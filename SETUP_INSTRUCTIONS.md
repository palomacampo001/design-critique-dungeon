# 🚀 Complete Setup Instructions

Follow these steps to get the Design Critique Dungeon running on your system.

## Step 1: Install Node.js

### macOS (your system)

**Option A: Using Homebrew (Recommended)**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

**Option B: Direct Download**
1. Go to https://nodejs.org/
2. Download the LTS version (Long Term Support)
3. Run the installer
4. Follow the installation wizard

**Verify Installation:**
```bash
node --version
npm --version
```

You should see version numbers like `v18.x.x` and `9.x.x`

## Step 2: Install Project Dependencies

Open Terminal and navigate to the project directory:

```bash
cd /Users/palomejaibm/Desktop/design-critique-dungeon
npm install
```

This will install:
- `express` - Web server framework
- `cors` - CORS handling
- `node-fetch` - HTTP requests

## Step 3: Start the Server

```bash
npm start
```

You should see:
```
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║                    DESIGN CRITIQUE DUNGEON SERVER                        ║
║                                                                           ║
║                         Server is running on:                            ║
║                        http://localhost:3000                             ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

## Step 4: Open in Browser

1. Open your web browser
2. Go to: `http://localhost:3000`
3. You should see the Design Critique Dungeon interface

## Step 5: Configure AI Provider

1. Click the **⚙️ settings button** (bottom right corner)
2. Choose your AI provider:
   - **Azure OpenAI** (Recommended if you have Microsoft 365 Copilot)
   - **Anthropic Claude**
   - **OpenAI**

3. Enter your credentials:

### For Azure OpenAI:
- **Endpoint**: `https://your-resource.openai.azure.com`
- **API Key**: Your Azure API key
- **Deployment Name**: `gpt-4o` (or your deployment name)

### For Anthropic Claude:
- **API Key**: `sk-ant-...`

### For OpenAI:
- **API Key**: `sk-...`

4. Click **Save Configuration**
5. You should see: "✅ Configuration saved successfully!"

## Step 6: Test the Application

1. **Upload an image**:
   - Click the upload zone or drag & drop an image
   - Supported formats: PNG, JPG, WebP
   - Max size: 10MB

2. **Start analysis**:
   - Click "⚔️ ENTER THE DUNGEON 🗡️"
   - Wait for the analysis (usually 10-30 seconds)

3. **View results**:
   - See your design score
   - Read the detailed critique
   - Earn XP and level up!

## Troubleshooting

### "npm: command not found"
- Node.js is not installed. Go back to Step 1.

### "Cannot find module 'express'"
- Dependencies not installed. Run `npm install`

### "Port 3000 is already in use"
- Another application is using port 3000
- Solution: Kill the process or change the port in `server.js`
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process (replace PID with actual process ID)
kill -9 PID
```

### "Proxy server not running"
- Make sure you ran `npm start` and the server is running
- Check the terminal for error messages

### "API request failed"
- Verify your API key is correct
- Check your API provider's status page
- Ensure you have API credits/quota available

### Image upload fails
- Check file size (must be under 10MB)
- Ensure file type is PNG, JPG, or WebP
- Try a smaller or different image

## Testing Checklist

- [ ] Node.js installed and verified
- [ ] Dependencies installed (`npm install`)
- [ ] Server started (`npm start`)
- [ ] Browser opened to `http://localhost:3000`
- [ ] AI provider configured in settings
- [ ] Test image uploaded successfully
- [ ] Analysis completed without errors
- [ ] Results displayed correctly
- [ ] XP awarded and stats updated

## Next Steps

Once everything works locally:

1. **Deploy Online**: Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. **Customize**: Modify the prompts in `js/config.js`
3. **Share**: Deploy and share with your team!

## Getting API Keys

### Azure OpenAI
1. Go to https://portal.azure.com
2. Create an Azure OpenAI resource
3. Deploy a GPT-4o model
4. Get your endpoint and API key from "Keys and Endpoint"

### Anthropic Claude
1. Go to https://console.anthropic.com
2. Sign up for an account
3. Go to API Keys section
4. Create a new API key

### OpenAI
1. Go to https://platform.openai.com
2. Sign up for an account
3. Go to API Keys section
4. Create a new API key

## Support

If you encounter issues:
1. Check the console for error messages (F12 in browser)
2. Check the terminal for server errors
3. Review the troubleshooting section above
4. Check the GitHub issues page

---

**Made with ⚔️ by Bob**