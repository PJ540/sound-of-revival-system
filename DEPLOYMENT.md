# 🚀 Deployment Guide - Sound of Revival Management System

This guide covers multiple deployment options for the Sound of Revival Christian Band Management System.

## 📋 Prerequisites

- Node.js 18+ application with MongoDB database
- Git repository (already set up)
- Environment variables configured

## 🌐 Deployment Options

### 1. 🔥 **Heroku** (Recommended for Full Features)

**Step 1: Install Heroku CLI**
```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

**Step 2: Login and Create App**
```bash
heroku login
heroku create sound-of-revival-app
```

**Step 3: Add MongoDB Atlas**
```bash
heroku addons:create mongolab:sandbox
# Or use MongoDB Atlas connection string
heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
```

**Step 4: Set Environment Variables**
```bash
heroku config:set SESSION_SECRET="your-super-secret-session-key"
heroku config:set JWT_SECRET="your-jwt-secret-key"
heroku config:set NODE_ENV="production"
```

**Step 5: Deploy**
```bash
git push heroku main
```

**Step 6: Initialize Database**
```bash
heroku run node scripts/init-data.js
```

---

### 2. 🚂 **Railway** (Modern & Fast)

**Step 1: Connect GitHub**
- Go to [Railway.app](https://railway.app)
- Sign up with GitHub
- Click "New Project" → "Deploy from GitHub repo"
- Select your `sound-of-revival-system` repository

**Step 2: Add Database**
- Click "New" → "Database" → "MongoDB"
- Copy the connection string

**Step 3: Set Environment Variables**
```
MONGODB_URI=your-railway-mongodb-connection-string
SESSION_SECRET=your-super-secret-session-key
JWT_SECRET=your-jwt-secret-key
NODE_ENV=production
```

**Step 4: Deploy**
- Railway automatically deploys on git push
- Run initialization: Use Railway's console to run `node scripts/init-data.js`

---

### 3. 🎨 **Render** (Free Tier Available)

**Step 1: Connect Repository**
- Go to [Render.com](https://render.com)
- Sign up and click "New Web Service"
- Connect your GitHub repository

**Step 2: Configure Service**
```
Name: sound-of-revival
Environment: Node
Build Command: npm install
Start Command: npm start
```

**Step 3: Add Database**
- Create a new MongoDB service on Render
- Or use MongoDB Atlas

**Step 4: Environment Variables**
```
MONGODB_URI=your-mongodb-connection-string
SESSION_SECRET=your-super-secret-session-key
JWT_SECRET=your-jwt-secret-key
NODE_ENV=production
```

---

### 4. ⚡ **Vercel** (Serverless)

**Step 1: Install Vercel CLI**
```bash
npm i -g vercel
```

**Step 2: Deploy**
```bash
vercel --prod
```

**Step 3: Set Environment Variables**
```bash
vercel env add MONGODB_URI
vercel env add SESSION_SECRET
vercel env add JWT_SECRET
```

**Note:** Vercel works best with serverless functions. The current setup may need modifications for optimal performance.

---

### 5. 🌐 **Netlify** (Static Preview Only)

**For Static Preview:**
- The `public/index.html` file provides a static preview
- Full functionality requires Node.js hosting
- Deploy the `public` folder to Netlify for a demo

**Step 1: Deploy to Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=public
```

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

**Step 1: Create Cluster**
- Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a free cluster
- Create a database user
- Whitelist IP addresses (0.0.0.0/0 for all)

**Step 2: Get Connection String**
```
mongodb+srv://username:password@cluster.mongodb.net/sound_of_revival?retryWrites=true&w=majority
```

**Step 3: Initialize Data**
After deployment, run the initialization script:
```bash
node scripts/init-data.js
```

---

## 🔧 Environment Variables

Required for all deployments:

```env
MONGODB_URI=your-mongodb-connection-string
SESSION_SECRET=your-super-secret-session-key-min-32-chars
JWT_SECRET=your-jwt-secret-key
NODE_ENV=production
PORT=3001
```

---

## 🎯 Recommended Deployment Flow

### For Full Application (Recommended):

1. **Railway** - Modern, fast, great developer experience
2. **Heroku** - Reliable, well-documented, many addons
3. **Render** - Good free tier, easy setup

### For Static Preview:

1. **Netlify** - Great for static sites and demos
2. **Vercel** - Excellent for static sites and serverless

---

## 🔍 Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Database connection works
- [ ] Admin login works (`admin@sor.com` / `admin123`)
- [ ] Member registration works
- [ ] File uploads work (photos)
- [ ] All routes are accessible
- [ ] Environment variables are set
- [ ] HTTPS is enabled

---

## 🆘 Troubleshooting

### Common Issues:

**Database Connection Failed:**
- Check MONGODB_URI format
- Verify database user permissions
- Check IP whitelist settings

**File Upload Issues:**
- Ensure upload directory exists
- Check file size limits
- Verify multer configuration

**Session Issues:**
- Verify SESSION_SECRET is set
- Check session configuration
- Ensure cookies are enabled

**Build Failures:**
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review build logs for specific errors

---

## 📞 Support

For deployment issues:
- Check the platform-specific documentation
- Review application logs
- Create an issue in the GitHub repository

---

**Designed by Peter J**  
Sound of Revival Christian Band Management System