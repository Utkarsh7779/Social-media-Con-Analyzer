const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: [
    'https://social-media-con-analyzer.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF and image files are allowed!'));
    }
  }
});

// Routes
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Check file size before processing
    if (req.file.size > 5 * 1024 * 1024) { // 5MB limit for free tier
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ 
        error: 'File too large for free tier. Please use files under 5MB or upgrade your plan.' 
      });
    }

    const filePath = req.file.path;
    const fileType = path.extname(req.file.originalname).toLowerCase();
    let extractedText = '';
    let analysis = {};

    // Set timeout for processing
    const processingTimeout = setTimeout(() => {
      console.error('Processing timeout - file too complex');
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return res.status(408).json({ 
        error: 'Processing timeout. File may be too complex for free tier.' 
      });
    }, 30000); // 30 second timeout

    try {
      if (fileType === '.pdf') {
        // Handle PDF files with memory management
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        extractedText = pdfData.text;
        
        // Limit text length for free tier
        if (extractedText.length > 10000) {
          extractedText = extractedText.substring(0, 10000) + '... (truncated for free tier)';
        }
        
        analysis = analyzeContent(extractedText);
      } else {
        // Handle image files with OCR and memory limits
        const { data: { text } } = await Tesseract.recognize(filePath, 'eng', {
          logger: m => console.log(m),
          workerOptions: {
            workerPath: undefined,
            corePath: undefined,
            langPath: undefined,
            cachePath: undefined,
            dataPath: undefined,
            gzip: false
          }
        });
        
        extractedText = text;
        
        // Limit text length for free tier
        if (extractedText.length > 5000) {
          extractedText = extractedText.substring(0, 5000) + '... (truncated for free tier)';
        }
        
        analysis = analyzeContent(extractedText);
      }

      // Clear timeout since processing succeeded
      clearTimeout(processingTimeout);

      // Clean up uploaded file
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      res.json({
        success: true,
        originalName: req.file.originalname,
        extractedText,
        analysis,
        note: 'Free tier: Processing limited for optimal performance'
      });

    } catch (processingError) {
      clearTimeout(processingTimeout);
      throw processingError;
    }

  } catch (error) {
    console.error('Error processing file:', error);
    
    // Clean up file if it exists
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    // Provide more specific error messages
    let errorMessage = 'Error processing file';
    let statusCode = 500;
    
    if (error.message.includes('timeout')) {
      errorMessage = 'Processing timeout - file too complex';
      statusCode = 408;
    } else if (error.message.includes('memory')) {
      errorMessage = 'Memory limit exceeded - file too large or complex';
      statusCode = 413;
    } else if (error.message.includes('ENOENT')) {
      errorMessage = 'File processing error - please try again';
      statusCode = 500;
    }
    
    res.status(statusCode).json({ 
      error: errorMessage,
      details: error.message,
      suggestion: 'Try a smaller file or upgrade to a paid plan for better performance'
    });
  }
});

// Content analysis function
function analyzeContent(text) {
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
  
  // Basic engagement metrics
  const avgWordsPerSentence = words.length / sentences.length;
  const readabilityScore = calculateReadability(text);
  
  // Engagement suggestions
  const suggestions = generateSuggestions(text, avgWordsPerSentence, readabilityScore);
  
  return {
    statistics: {
      wordCount: words.length,
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length,
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 100) / 100,
      readabilityScore: Math.round(readabilityScore * 100) / 100
    },
    suggestions
  };
}

function calculateReadability(text) {
  // Simple Flesch Reading Ease approximation
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  const syllables = countSyllables(text);
  
  if (words.length === 0 || sentences.length === 0) return 0;
  
  const score = 206.835 - (1.015 * (words.length / sentences.length)) - (84.6 * (syllables / words.length));
  return Math.max(0, Math.min(100, score));
}

function countSyllables(text) {
  // Simple syllable counting approximation
  const words = text.toLowerCase().split(/\s+/);
  let syllableCount = 0;
  
  words.forEach(word => {
    if (word.length <= 3) {
      syllableCount += 1;
    } else {
      const vowels = word.match(/[aeiouy]+/g);
      syllableCount += vowels ? vowels.length : 1;
    }
  });
  
  return syllableCount;
}

function generateSuggestions(text, avgWordsPerSentence, readabilityScore) {
  const suggestions = [];
  
  if (avgWordsPerSentence > 25) {
    suggestions.push("Consider breaking down long sentences for better readability");
  }
  
  if (readabilityScore < 30) {
    suggestions.push("Content may be too complex. Consider simplifying language for broader audience");
  } else if (readabilityScore > 70) {
    suggestions.push("Content is very readable. Great for social media engagement!");
  }
  
  if (text.length < 100) {
    suggestions.push("Content is quite short. Consider adding more context or details");
  } else if (text.length > 1000) {
    suggestions.push("Content is quite long. Consider breaking it into smaller, digestible posts");
  }
  
  if (!text.includes('#')) {
    suggestions.push("Consider adding relevant hashtags to increase discoverability");
  }
  
  if (!text.includes('@')) {
    suggestions.push("Consider tagging relevant accounts to increase engagement");
  }
  
  if (suggestions.length === 0) {
    suggestions.push("Great content! Your post is well-balanced for social media engagement");
  }
  
  return suggestions;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  const memUsage = process.memoryUsage();
  const memUsageMB = {
    rss: Math.round(memUsage.rss / 1024 / 1024 * 100) / 100,
    heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024 * 100) / 100,
    heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024 * 100) / 100,
    external: Math.round(memUsage.external / 1024 / 1024 * 100) / 100
  };
  
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    memory: memUsageMB,
    uptime: process.uptime(),
    platform: process.platform,
    nodeVersion: process.version
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
