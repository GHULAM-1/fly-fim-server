import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { convexService } from '../services/convex-service';

interface AuthenticatedRequest extends Request {
  user?: any;
  sessionToken?: string;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
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

    const sessionData = await convexService.query('userFunctions:getSessionByToken', {
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
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      error: 'Token validation failed.',
      code: 'TOKEN_VALIDATION_ERROR'
    });
  }
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null;

    if (token) {
      const sessionData = await convexService.query('userFunctions:getSessionByToken', {
        sessionToken: token
      });

      if (sessionData && sessionData.user) {
        req.user = sessionData.user;
        req.sessionToken = token;
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next();
  }
};