// API Configuration
const config = {
  // Development environment
  development: {
    apiBaseUrl: 'http://localhost:5000'
  },
  // Production environment
  production: {
    apiBaseUrl: 'https://social-media-con-analyzer-1.onrender.com'
  }
};

// Get current environment
const environment = process.env.NODE_ENV || 'development';

// Export the appropriate configuration
export const apiBaseUrl = config[environment].apiBaseUrl;

export default config[environment];
