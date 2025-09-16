"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    // Log error for debugging
    res.status(statusCode).json({
        error: {
            message,
            statusCode,
            timestamp: new Date().toISOString()
        }
    });
};
exports.errorHandler = errorHandler;
const notFound = (req, res) => {
    res.status(404).json({
        error: {
            message: `Route ${req.originalUrl} not found`,
            statusCode: 404,
            timestamp: new Date().toISOString()
        }
    });
};
exports.notFound = notFound;
//# sourceMappingURL=error-handler.js.map