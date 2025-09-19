/**
 * Environment-based configuration utilities
 * Uses NODE_ENV to determine which environment values to use
 */

export const getFrontendUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.PROD_FRONTEND_URL || process.env.FRONTEND_URL || 'http://localhost:3000';
  }
  return process.env.DEV_FRONTEND_URL || process.env.FRONTEND_URL || 'http://localhost:3000';
};

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};