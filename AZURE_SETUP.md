# Azure OpenAI Setup Guide for Design Critique Dungeon

This guide will help you configure the Design Critique Dungeon to work with **Azure OpenAI Service**, which is the recommended option for enterprise users and those with Microsoft Copilot access.

## Why Azure OpenAI?

- ✅ **Enterprise-ready**: Better security, compliance, and data privacy
- ✅ **Microsoft Copilot integration**: Use your existing Azure resources
- ✅ **Regional deployment**: Keep data in your preferred region
- ✅ **Cost control**: Better billing and quota management
- ✅ **Same GPT-4o model**: Identical capabilities to OpenAI's direct API

---

## Prerequisites

1. An Azure subscription
2. Access to Azure OpenAI Service (requires approval)
3. A deployed GPT-4o model in your Azure OpenAI resource

---

## Step 1: Create Azure OpenAI Resource

### Option A: Using Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"**
3. Search for **"Azure OpenAI"**
4. Click **"Create"**
5. Fill in the details:
   - **Subscription**: Select your subscription
   - **Resource group**: Create new or use existing
   - **Region**: Choose a region (e.g., East US, West Europe)
   - **Name**: Give it a unique name (e.g., `my-design-dungeon-ai`)
   - **Pricing tier**: Standard S0
6. Click **"Review + create"** then **"Create"**

### Option B: Using Azure CLI

```bash
# Login to Azure
az login

# Create resource group
az group create --name design-dungeon-rg --location eastus

# Create Azure OpenAI resource
az cognitiveservices account create \
  --name my-design-dungeon-ai \
  --resource-group design-dungeon-rg \
  --kind OpenAI \
  --sku S0 \
  --location eastus
```

---

## Step 2: Deploy GPT-4o Model

1. In Azure Portal, navigate to your Azure OpenAI resource
2. Click **"Model deployments"** in the left menu
3. Click **"Create new deployment"**
4. Configure the deployment:
   - **Model**: Select **gpt-4o** (or gpt-4o-mini for lower cost)
   - **Deployment name**: `gpt-4o` (remember this name!)
   - **Model version**: Latest available
   - **Deployment type**: Standard
5. Click **"Create"**

### Using Azure OpenAI Studio

Alternatively, use [Azure OpenAI Studio](https://oai.azure.com):
1. Select your resource
2. Go to **"Deployments"**
3. Click **"Create new deployment"**
4. Follow the same steps as above

---

## Step 3: Get Your Credentials

You need three pieces of information:

### 1. Endpoint URL
- In Azure Portal, go to your Azure OpenAI resource
- Click **"Keys and Endpoint"** in the left menu
- Copy the **"Endpoint"** (e.g., `https://my-design-dungeon-ai.openai.azure.com`)

### 2. API Key
- On the same page, copy **"KEY 1"** or **"KEY 2"**
- Keep this secure! Don't share it publicly

### 3. Deployment Name
- This is the name you gave your model deployment (e.g., `gpt-4o`)

---

## Step 4: Configure Design Critique Dungeon

1. Open the Design Critique Dungeon application
2. Click the **⚙️ Settings** button (bottom right)
3. In the configuration modal:
   - **AI Provider**: Select **"Azure OpenAI (Recommended for Enterprise/Copilot)"**
   - **Azure Endpoint**: Paste your endpoint URL
   - **Azure API Key**: Paste your API key
   - **Deployment Name**: Enter your deployment name (e.g., `gpt-4o`)
4. Click **"Save Configuration"**
5. The system will test the connection

✅ If successful, you'll see: "Azure OpenAI connection successful"

---

## Troubleshooting

### Error: "Azure connection failed: 401"
- **Cause**: Invalid API key
- **Solution**: Double-check your API key in Azure Portal

### Error: "Azure connection failed: 404"
- **Cause**: Incorrect endpoint or deployment name
- **Solution**: Verify your endpoint URL and deployment name

### Error: "Azure connection failed: 429"
- **Cause**: Rate limit exceeded
- **Solution**: Wait a moment and try again, or check your quota in Azure Portal

### Error: "DeploymentNotFound"
- **Cause**: The deployment name doesn't match
- **Solution**: Go to Azure OpenAI Studio → Deployments and verify the exact name

### Model doesn't support vision
- **Cause**: Wrong model deployed
- **Solution**: Ensure you deployed **gpt-4o** or **gpt-4o-mini**, not gpt-3.5 or gpt-4 (non-vision)

---

## Cost Estimation

Azure OpenAI pricing for GPT-4o (as of 2024):
- **Input**: ~$2.50 per 1M tokens
- **Output**: ~$10.00 per 1M tokens

Typical design critique:
- **Per analysis**: ~2,000-3,000 tokens
- **Estimated cost**: $0.03-$0.05 per critique

💡 **Tip**: Use gpt-4o-mini for lower costs (~10x cheaper) with slightly reduced quality.

---

## Security Best Practices

1. **Never commit API keys to Git**
   - Keys are stored in browser localStorage only
   - Clear browser data to remove keys

2. **Use Azure RBAC**
   - Assign minimal permissions
   - Use managed identities when possible

3. **Monitor usage**
   - Set up Azure Monitor alerts
   - Track costs in Azure Cost Management

4. **Rotate keys regularly**
   - Azure allows two keys for zero-downtime rotation

---

## Using with Microsoft Copilot

If you have Microsoft 365 Copilot:

1. Your organization may already have Azure OpenAI resources
2. Contact your IT admin for:
   - Azure OpenAI endpoint
   - API key or managed identity access
   - Approved deployment names

3. Use the same configuration steps above with your organization's credentials

---

## Next Steps

- ✅ Configuration complete? Upload a design and start analyzing!
- 📚 Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for general usage instructions
- 🎮 Check [EXAMPLES.md](./EXAMPLES.md) for sample critiques

---

## Support

- **Azure OpenAI Documentation**: https://learn.microsoft.com/azure/ai-services/openai/
- **Pricing**: https://azure.microsoft.com/pricing/details/cognitive-services/openai-service/
- **Support**: https://azure.microsoft.com/support/

---

**Made with ⚔️ for better UX**