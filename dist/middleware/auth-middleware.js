"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = async (req, res, next) => {
    try {
        // Try to get token from Authorization header first, then from cookies
        let token = req.headers.authorization?.startsWith('Bearer ')
            ? req.headers.authorization.substring(7)
            : null;
        // If no header token, try to get from cookies
        if (!token) {
            token = req.cookies?.authToken;
        }
        if (!token) {
            return res.status(401).json({
                error: 'Access denied. No token provided.',
                code: 'NO_TOKEN'
            });
        }
        // Verify JWT token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decoded.userId,
            email: decoded.email
        };
        next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            error: 'Invalid or expired token.',
            code: 'INVALID_TOKEN'
        });
    }
};
exports.authMiddleware = authMiddleware;
const optionalAuth = async (req, res, next) => {
    try {
        // Try to get token from Authorization header first, then from cookies
        let token = req.headers.authorization?.startsWith('Bearer ')
            ? req.headers.authorization.substring(7)
            : null;
        // If no header token, try to get from cookies
        if (!token) {
            token = req.cookies?.authToken;
        }
        if (token) {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                req.user = {
                    userId: decoded.userId,
                    email: decoded.email
                };
            }
            catch (error) {
                // Invalid token, but continue without authentication
                console.warn('Optional auth failed:', error);
            }
        }
        next();
    }
    catch (error) {
        console.error('Optional auth middleware error:', error);
        next();
    }
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=auth-middleware.js.map