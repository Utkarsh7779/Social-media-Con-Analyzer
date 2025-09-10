// API Configuration
const config = {
  development: {
    apiBaseUrl: 'http://localhost:5000'
  },
  production: {
    apiBaseUrl: 'https://social-media-con-analyzer-1.onrender.com'
  }
};

// Get current environment
const environment = process.env.NODE_ENV || 'development';

// Export the appropriate configuration
export const apiBaseUrl = config[environment].apiBaseUrl;

export default config[environment];
