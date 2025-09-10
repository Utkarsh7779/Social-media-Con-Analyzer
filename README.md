# Social Media Content Analyzer

A modern web application that analyzes social media content by extracting text from PDFs and images using OCR technology, then provides engagement suggestions and content optimization recommendations.

## 🚀 Features

### Core Functionality
- **Document Upload**: Support for PDF files and image files (PNG, JPG, JPEG, GIF)
- **Drag & Drop Interface**: Modern, intuitive file upload with visual feedback
- **Text Extraction**: 
  - PDF parsing with formatting preservation
  - OCR (Optical Character Recognition) for scanned documents and images
- **Content Analysis**: Comprehensive analysis including:
  - Word, sentence, and paragraph counts
  - Average words per sentence
  - Flesch Reading Ease score for readability
- **Engagement Suggestions**: AI-powered recommendations for social media optimization

### Technical Features
- **Real-time Processing**: Live file analysis with progress indicators
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Responsive Design**: Mobile-first design that works on all devices
- **Security**: File validation, size limits, and secure processing
- **Performance**: Optimized for fast processing and smooth user experience

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for modern, responsive styling
- **React Dropzone** for drag-and-drop file uploads
- **Lucide React** for beautiful, consistent icons

### Backend
- **Node.js** with Express.js framework
- **Multer** for file upload handling
- **PDF-parse** for PDF text extraction
- **Tesseract.js** for OCR processing
- **Helmet** for security headers
- **Morgan** for request logging

### Development Tools
- **Concurrently** for running frontend and backend simultaneously
- **Nodemon** for backend development with auto-reload
- **TypeScript** for enhanced development experience

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn package manager
- Modern web browser with JavaScript enabled

## 🚀 Quick Start

### 🎯 **For Project Submission (Recommended)**
1. **Double-click** `start-local.bat` (Windows)
2. **Wait** for both services to start
3. **Open** http://localhost:3000 in your browser
4. **Test** with sample files for reliable demonstration

### 🔧 **Manual Development Setup**
1. **Clone the Repository**
```bash
git clone <your-repo-url>
cd social-media-content-analyzer
```

2. **Install Dependencies**
```bash
npm run install-all
```

3. **Start Development Servers**
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

4. **Open Your Browser**
Navigate to `http://localhost:3000` to use the application.

## 📁 Project Structure

```
social-media-content-analyzer/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── types.ts       # TypeScript definitions
│   │   ├── App.tsx        # Main application
│   │   └── index.tsx      # Entry point
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
├── server/                 # Node.js backend
│   ├── index.js           # Express server
│   ├── package.json       # Backend dependencies
│   └── uploads/           # Temporary file storage
├── package.json            # Root package.json
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables
The application uses default configurations, but you can customize:

- **Backend Port**: Set `PORT` environment variable (default: 5000)
- **File Size Limit**: Modify `maxSize` in `server/index.js` (default: 10MB)
- **Supported File Types**: Update `fileFilter` in multer configuration

### File Processing
- **PDF Files**: Processed using pdf-parse library
- **Image Files**: Processed using Tesseract.js OCR engine
- **Text Analysis**: Custom algorithms for engagement metrics

## 📊 How It Works

### 1. File Upload
- User drags and drops or selects a file
- Frontend validates file type and size
- File is uploaded to backend via FormData

### 2. Text Extraction
- **PDFs**: Direct text extraction using pdf-parse
- **Images**: OCR processing using Tesseract.js
- Extracted text is cleaned and formatted

### 3. Content Analysis
- Statistical analysis (word count, sentence structure)
- Readability scoring using Flesch Reading Ease
- Engagement optimization suggestions

### 4. Results Display
- Interactive tabs for different analysis views
- Visual charts and metrics
- Actionable suggestions for content improvement

## 🎯 Use Cases

- **Content Creators**: Analyze blog posts and articles before social media sharing
- **Marketing Teams**: Optimize content for better engagement
- **Social Media Managers**: Get data-driven insights for post optimization
- **Students/Researchers**: Analyze document readability and structure

## 🔒 Security Features

- File type validation
- File size limits
- Secure file handling with automatic cleanup
- CORS protection
- Security headers with Helmet
- Input sanitization

## 🚀 Deployment

### Frontend Build
```bash
cd client
npm run build
```

### Backend Production
```bash
cd server
npm start
```

### Environment Setup
- Set `NODE_ENV=production`
- Configure production database if needed
- Set up proper CORS origins
- Configure reverse proxy (nginx/Apache)

## 🧪 Testing

The application includes basic error handling and validation. For production use, consider adding:

- Unit tests for analysis algorithms
- Integration tests for file processing
- End-to-end tests for user workflows
- Performance testing for large files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Tesseract.js** for OCR capabilities
- **PDF-parse** for PDF text extraction
- **React Dropzone** for file upload functionality
- **Tailwind CSS** for the beautiful UI framework

## 📞 Support

For questions or issues:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include file types and error messages for better assistance

---

**Built with ❤️ for the Software Engineering Technical Assessment**
