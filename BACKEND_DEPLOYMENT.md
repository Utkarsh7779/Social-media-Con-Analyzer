# Backend Deployment Guide

## Overview
Your backend is a Node.js/Express server with file upload, OCR, and PDF processing capabilities. Due to the heavy dependencies (Tesseract.js, PDF parsing), some platforms may have limitations.

## 🚀 **Recommended: Render (Best Option)**

### Step 1: Prepare Your Repository
1. Ensure your `server/` folder is in your GitHub repository
2. Make sure `server/package.json` exists and has all dependencies

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com) and create an account
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name:** `social-media-analyzer-backend`
   - **Root Directory:** `server` (important!)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid for better performance)

### Step 3: Environment Variables
Add these in Render dashboard:
- `PORT` (Render sets this automatically)
- `NODE_ENV=production`

### Step 4: Deploy
Click "Create Web Service" and wait for deployment.

---

## 🚂 **Alternative: Railway**

### Step 1: Deploy on Railway
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the `server` directory
4. Railway will auto-detect Node.js and deploy

---

## ⚠️ **Important Deployment Considerations**

### File Upload Limitations
- **Render Free Plan:** 512MB RAM, may struggle with large files
- **Railway:** Better performance, more generous limits
- **Heroku:** File system is ephemeral (uploads don't persist)

### Memory Requirements
Your app uses Tesseract.js which requires significant memory:
- **Minimum:** 512MB RAM
- **Recommended:** 1GB+ RAM

### CORS Configuration
Update your frontend URL in the backend after deployment:

```javascript
// In server/index.js, update CORS if needed
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

---

## 🔧 **Post-Deployment Steps**

### 1. Test Your Backend
```bash
# Test the health endpoint
curl https://your-backend-url.onrender.com/api/health
```

### 2. Update Frontend Configuration
In your frontend code, update the API base URL:
```javascript
// Change from localhost:5000 to your deployed backend URL
const API_BASE_URL = 'https://your-backend-url.onrender.com';
```

### 3. Test File Upload
Try uploading a small image or PDF to ensure OCR and PDF parsing work.

---

## 🚨 **Common Issues & Solutions**

### Issue: Build Fails
- **Solution:** Ensure `server/` is the root directory in deployment settings

### Issue: Memory Errors
- **Solution:** Upgrade to paid plan with more RAM

### Issue: CORS Errors
- **Solution:** Update CORS configuration with your frontend domain

### Issue: File Upload Fails
- **Solution:** Check file size limits and ensure uploads directory exists

---

## 📊 **Performance Monitoring**

After deployment, monitor:
- Response times
- Memory usage
- File processing success rates
- Error logs

---

## 🔗 **Next Steps**

1. Choose a deployment platform (Render recommended)
2. Follow the step-by-step guide above
3. Test your deployed backend
4. Update frontend configuration
5. Monitor performance and adjust as needed

**Need help?** Check the platform's documentation or community forums for specific issues.
