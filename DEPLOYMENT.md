# Deployment Guide

This guide covers deploying the Social Media Content Analyzer to various hosting platforms.

## 🚀 Quick Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - Recommended

#### Frontend (Vercel)
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set build command: `cd client && npm install && npm run build`
   - Set output directory: `client/build`
   - Deploy

#### Backend (Railway)
1. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Set root directory to `server`
   - Add environment variable: `NODE_ENV=production`
   - Deploy

2. **Update Frontend API URL**
   - In Vercel, add environment variable: `REACT_APP_API_URL=https://your-railway-app.railway.app`

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend (Netlify)
1. **Build locally**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `client/build` folder to [netlify.com](https://netlify.com)
   - Or connect your GitHub repository

#### Backend (Render)
1. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repository
   - Set root directory to `server`
   - Set build command: `npm install`
   - Set start command: `npm start`

### Option 3: Heroku (Full Stack)

1. **Prepare for Heroku**
   ```bash
   # Create Procfile in root
   echo "web: cd server && npm start" > Procfile
   
   # Create app.json
   echo '{
     "name": "social-media-analyzer",
     "description": "Social Media Content Analyzer",
     "repository": "https://github.com/yourusername/social-media-analyzer",
     "keywords": ["node", "react", "social-media"],
     "env": {
       "NODE_ENV": "production"
     }
   }' > app.json
   ```

2. **Deploy to Heroku**
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

## 🌐 Environment Variables

### Frontend
```bash
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend
```bash
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-frontend-url.com
```

## 🔧 Production Optimizations

### Frontend
1. **Build Optimization**
   ```bash
   cd client
   npm run build
   ```
   - Minified and optimized for production
   - Static assets with cache headers

2. **Performance**
   - Enable gzip compression
   - Set cache headers for static assets
   - Use CDN for global distribution

### Backend
1. **Security**
   - Set proper CORS origins
   - Enable rate limiting
   - Add request validation

2. **Performance**
   - Enable compression
   - Set proper cache headers
   - Monitor memory usage

## 📊 Monitoring & Analytics

### Health Checks
- Backend: `GET /api/health`
- Frontend: Built-in error boundaries

### Logging
- Backend: Morgan logging middleware
- Frontend: Console logging for debugging

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for your frontend domain
   - Check environment variables

2. **File Upload Failures**
   - Verify file size limits
   - Check file type validation
   - Ensure upload directory permissions

3. **OCR Processing Issues**
   - Tesseract.js may take time for large images
   - Check browser console for errors
   - Verify image format support

### Debug Mode
Enable debug logging in production:
```bash
DEBUG=* npm start
```

## 🔒 Security Checklist

- [ ] CORS properly configured
- [ ] File upload validation
- [ ] Rate limiting enabled
- [ ] Security headers set
- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] File cleanup implemented

## 📈 Scaling Considerations

### Frontend
- Use CDN for static assets
- Implement lazy loading
- Optimize bundle size

### Backend
- Add load balancing
- Implement caching
- Use database for file metadata (optional)
- Consider microservices architecture

---

**Need help?** Check the main README.md or create an issue in the repository.
