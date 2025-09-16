"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authMiddleware = void 0;
const convex_service_1 = require("../services/convex-service");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.substring(7)
            : null;
        if (!token) {
            return res.status(401).json({
                error: 'Access denied. No token provided.',
                code: 'NO_TOKEN'
            });
        }
        const sessionData = await convex_service_1.convexService.query('userFunctions:getSessionByToken', {
            sessionToken: token
        });
        if (!sessionData || !sessionData.user) {
            return res.status(401).json({
                error: 'Invalid or expired token.',
                code: 'INVALID_TOKEN'
            });
        }
        req.user = sessionData.user;
        req.sessionToken = token;
        next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            error: 'Token validation failed.',
            code: 'TOKEN_VALIDATION_ERROR'
        });
    }
};
exports.authMiddleware = authMiddleware;
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.substring(7)
            : null;
        if (token) {
            const sessionData = await convex_service_1.convexService.query('userFunctions:getSessionByToken', {
                sessionToken: token
            });
            if (sessionData && sessionData.user) {
                req.user = sessionData.user;
                req.sessionToken = token;
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