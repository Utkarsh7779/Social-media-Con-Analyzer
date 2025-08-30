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
app.use(cors());
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

    const filePath = req.file.path;
    const fileType = path.extname(req.file.originalname).toLowerCase();
    let extractedText = '';
    let analysis = {};

    if (fileType === '.pdf') {
      // Handle PDF files
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text;
      analysis = analyzeContent(extractedText);
    } else {
      // Handle image files with OCR
      const { data: { text } } = await Tesseract.recognize(filePath, 'eng', {
        logger: m => console.log(m)
      });
      extractedText = text;
      analysis = analyzeContent(extractedText);
    }

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      originalName: req.file.originalname,
      extractedText,
      analysis
    });

  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ 
      error: 'Error processing file',
      details: error.message 
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
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
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
