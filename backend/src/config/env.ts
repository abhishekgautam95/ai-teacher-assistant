import dotenv from 'dotenv';

dotenv.config();

/**
 * Environment configuration
 */
export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-teacher-assistant',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB default
};

// Validate required environment variables
export const validateEnv = (): void => {
  const required = ['JWT_SECRET', 'OPENAI_API_KEY'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0 && config.nodeEnv === 'production') {
    console.warn(`⚠️  Warning: Missing environment variables: ${missing.join(', ')}`);
  }
};
