# 🔑 OpenAI API Key Setup Guide

## How to Get Your OpenAI API Key

Follow these steps to obtain and configure your OpenAI API key for the Design Critique Dungeon.

---

## 📋 Step 1: Create an OpenAI Account

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Click **"Sign Up"** (or **"Log In"** if you already have an account)
3. Complete the registration process
4. Verify your email address

---

## 💳 Step 2: Add Billing Information

**IMPORTANT:** You need to add a payment method to use the API.

1. Go to [Billing Settings](https://platform.openai.com/account/billing/overview)
2. Click **"Add payment method"**
3. Enter your credit/debit card information
4. Set up a usage limit (recommended: start with $5-10)

**Cost Estimate:**
- Each design analysis costs approximately **$0.005-0.015**
- $5 credit = ~300-1000 analyses
- $10 credit = ~600-2000 analyses

---

## 🔑 Step 3: Generate Your API Key

1. Go to [API Keys Page](https://platform.openai.com/api-keys)
2. Click **"Create new secret key"**
3. Give it a name (e.g., "Design Critique Dungeon")
4. Click **"Create secret key"**
5. **COPY THE KEY IMMEDIATELY** - You won't be able to see it again!

Your API key will look like this:
```
sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## ⚙️ Step 4: Configure the Application

### Option A: Using the Settings Modal (Recommended)

1. Open `index.html` in your browser
2. Click the **⚙️ Settings** button in the top right
3. Paste your API key into the input field
4. Click **"Save Configuration"**
5. The app will test the connection automatically

### Option B: Direct Configuration (Advanced)

Edit `js/config.js` and replace the empty string:

```javascript
const CONFIG = {
    OPENAI_API_KEY: 'sk-proj-your-actual-key-here',
    // ... rest of config
};
```

**⚠️ WARNING:** Never commit your API key to version control!

---

## ✅ Step 5: Verify It Works

1. Upload a UI screenshot
2. Click **"Enter the Dungeon"**
3. Wait for the analysis (10-30 seconds)
4. You should see the Dungeon Master's critique!

---

## 🔒 Security Best Practices

### DO:
✅ Store your API key securely
✅ Use the browser's localStorage (Settings modal)
✅ Set usage limits in OpenAI dashboard
✅ Monitor your usage regularly
✅ Regenerate keys if compromised

### DON'T:
❌ Share your API key publicly
❌ Commit keys to GitHub
❌ Use the same key across multiple projects
❌ Leave keys in plain text files
❌ Skip setting usage limits

---

## 🚨 Troubleshooting

### "Invalid API Key" Error
- Double-check you copied the entire key
- Make sure there are no extra spaces
- Verify the key hasn't been revoked
- Check you're using a valid OpenAI account

### "Insufficient Credits" or "Quota Exceeded" Error

**This is the most common error for new users!**

The error message says:
> "You exceeded your current quota, please check your plan and billing details"

**Solution:**
1. Go to [OpenAI Billing](https://platform.openai.com/account/billing/overview)
2. Click **"Add payment method"** if you haven't already
3. Add a credit/debit card
4. Click **"Add to credit balance"** and add at least $5
5. Wait 5-10 minutes for the payment to process
6. Try the analysis again

**Important Notes:**
- OpenAI requires a payment method even for small usage
- Free trial credits may have expired
- You need to manually add credits to your account
- Minimum recommended: $5 (covers ~300-1000 analyses)

**Check Your Status:**
- [Billing Overview](https://platform.openai.com/account/billing/overview) - See your balance
- [Usage Dashboard](https://platform.openai.com/usage) - Track your spending
- [Limits](https://platform.openai.com/account/limits) - Check your tier limits

### "Model Not Available" Error
- Ensure your account has access to GPT-4o
- Some accounts need to make a minimum payment first
- Contact OpenAI support if needed

### "Rate Limit Exceeded" Error
- You're making too many requests
- Wait a few minutes and try again
- Consider upgrading your tier

---

## 💰 Pricing Information (as of 2026)

### GPT-4o Pricing:
- **Input:** $5.00 per 1M tokens
- **Output:** $15.00 per 1M tokens
- **Images:** Varies by resolution

### Typical Analysis Cost:
- **Input tokens:** ~1,500 (prompt + image)
- **Output tokens:** ~500 (critique response)
- **Total cost:** ~$0.005-0.015 per analysis

### Monthly Estimates:
- **Light use** (10 analyses/month): ~$0.10
- **Regular use** (50 analyses/month): ~$0.50
- **Heavy use** (200 analyses/month): ~$2.00

---

## 🔗 Useful Links

- [OpenAI Platform](https://platform.openai.com/)
- [API Keys Management](https://platform.openai.com/api-keys)
- [Billing Dashboard](https://platform.openai.com/account/billing/overview)
- [Usage Dashboard](https://platform.openai.com/usage)
- [API Documentation](https://platform.openai.com/docs)
- [Pricing Page](https://openai.com/pricing)

---

## 📞 Need Help?

### OpenAI Support:
- [Help Center](https://help.openai.com/)
- [Community Forum](https://community.openai.com/)
- Email: support@openai.com

### Application Issues:
- Check the SETUP_GUIDE.md
- Review the MIGRATION_SUMMARY.md
- Open an issue on GitHub

---

## 🎮 Ready to Start!

Once you have your API key configured:

1. ✅ Upload a UI screenshot
2. ✅ Click "Enter the Dungeon"
3. ✅ Receive your critique
4. ✅ Earn XP and level up!

**The Dungeon Master awaits your designs!** ⚔️🛡️

---

**Last Updated:** 2026-05-27
**Application Version:** 2.0
**Model:** GPT-4o