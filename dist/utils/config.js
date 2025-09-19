"use strict";
/**
 * Environment-based configuration utilities
 * Uses NODE_ENV to determine which environment values to use
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDevelopment = exports.isProduction = exports.getFrontendUrl = void 0;
const getFrontendUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return process.env.PROD_FRONTEND_URL || process.env.FRONTEND_URL || 'http://localhost:3000';
    }
    return process.env.DEV_FRONTEND_URL || process.env.FRONTEND_URL || 'http://localhost:3000';
};
exports.getFrontendUrl = getFrontendUrl;
const isProduction = () => {
    return process.env.NODE_ENV === 'production';
};
exports.isProduction = isProduction;
const isDevelopment = () => {
    return process.env.NODE_ENV === 'development';
};
exports.isDevelopment = isDevelopment;
//# sourceMappingURL=config.js.map