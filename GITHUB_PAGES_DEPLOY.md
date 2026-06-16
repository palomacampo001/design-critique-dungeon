# 🚀 Deploy to GitHub Pages (Free Hosting!)

This guide will help you deploy the Design Critique Dungeon to GitHub Pages so anyone can access it online for FREE.

## 📋 Prerequisites

- A GitHub account (free) - Sign up at https://github.com
- Git installed on your computer

## 🎯 Step-by-Step Deployment

### Step 1: Create a GitHub Repository

1. Go to https://github.com
2. Click the **"+"** button in the top right
3. Select **"New repository"**
4. Name it: `design-critique-dungeon`
5. Make it **Public**
6. Click **"Create repository"**

### Step 2: Initialize Git in Your Project

Open Terminal and run these commands:

```bash
cd /Users/palomejaibm/Desktop/design-critique-dungeon

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Design Critique Dungeon"
```

### Step 3: Connect to GitHub

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/design-critique-dungeon.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Click **"Pages"** in the left sidebar
4. Under "Source", select **"main"** branch
5. Click **"Save"**

### Step 5: Wait for Deployment

- GitHub will build your site (takes 1-2 minutes)
- You'll see a message: "Your site is published at https://YOUR_USERNAME.github.io/design-critique-dungeon/"

### Step 6: Access Your Site

Your site will be live at:
```
https://YOUR_USERNAME.github.io/design-critique-dungeon/
```

Share this URL with anyone! 🎉

## ⚙️ Configuration for Users

When people visit your site, they need to:

1. Click the **⚙️ settings button**
2. Enter their own AI provider API key
3. Start analyzing designs!

**Note:** Each user needs their own API key. Keys are stored locally in their browser and never shared.

## 🔄 Updating Your Site

To update the site after making changes:

```bash
# Make your changes to files

# Add changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

GitHub Pages will automatically rebuild your site in 1-2 minutes.

## 🎨 Customization

### Change the Repository Name

If you want a different URL, you can:

1. Go to repository Settings
2. Change the repository name
3. Your URL will become: `https://YOUR_USERNAME.github.io/NEW_NAME/`

### Use a Custom Domain

If you own a domain:

1. Go to repository Settings → Pages
2. Enter your custom domain
3. Follow GitHub's instructions to configure DNS

## 🐛 Troubleshooting

### "404 - Page not found"

- Wait 2-3 minutes after enabling Pages
- Make sure you pushed to the `main` branch
- Check that `index.html` is in the root directory

### "Site not updating"

- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait a few minutes for GitHub to rebuild
- Check the Actions tab for build status

### CORS Errors

The static version uses a CORS proxy. If you encounter issues:

1. Users can install a CORS browser extension temporarily
2. Or deploy with the Node.js server (see DEPLOYMENT_GUIDE.md)

## 💡 Alternative: Netlify (Even Easier!)

If GitHub Pages doesn't work, try Netlify:

1. Go to https://netlify.com
2. Sign up (free)
3. Drag and drop your project folder
4. Done! You get a URL like `https://your-site.netlify.app`

## 📊 Monitoring

### View Site Traffic

1. Go to repository Insights → Traffic
2. See visitors, views, and clones

### Check Build Status

1. Go to repository Actions tab
2. See deployment history and status

## 🔒 Security Notes

- API keys are stored in users' browsers only
- No server-side storage of credentials
- Each user provides their own API key
- Keys never leave the user's device

## 🎯 What Users See

When someone visits your deployed site:

1. **Beautiful terminal interface** with IBM Design Language theme
2. **Upload zone** for design screenshots
3. **Settings button** to configure their API key
4. **Analysis results** with scores and feedback
5. **Gamification** with XP, levels, and badges

## 📱 Mobile Friendly

The site works on:
- ✅ Desktop browsers
- ✅ Mobile phones
- ✅ Tablets
- ✅ Any device with a modern browser

## 🚀 Next Steps

After deployment:

1. **Share the URL** with your team
2. **Add to README** on GitHub
3. **Tweet about it** or share on LinkedIn
4. **Get feedback** and iterate

## 💬 Support

If you need help:
- Check GitHub Pages documentation
- Open an issue on your repository
- Ask in GitHub Discussions

---

**Your site will be live at:**
```
https://YOUR_USERNAME.github.io/design-critique-dungeon/
```

**Made with ⚔️ by Bob**