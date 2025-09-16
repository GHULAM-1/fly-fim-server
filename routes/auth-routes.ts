import { Router, Request, Response } from 'express';
import { convexService } from '../services/convex-service';
import { authMiddleware } from '../middleware/auth-middleware';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const router = Router();

interface AuthenticatedRequest extends Request {
  user?: any;
  sessionToken?: string;
}

router.post('/signin', async (req: Request, res: Response) => {
  try {
    const { provider, code, redirectUri } = req.body;

    if (!provider || !code) {
      return res.status(400).json({
        error: 'Provider and authorization code are required'
      });
    }

    let userInfo;

    if (provider === 'google') {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.AUTH_GOOGLE_ID!,
          client_secret: process.env.AUTH_GOOGLE_SECRET!,
          code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri || 'http://localhost:3000/auth/callback',
        }),
      });

      const tokenData = await tokenResponse.json();

      if (!tokenData.access_token) {
        return res.status(400).json({ error: 'Failed to get access token' });
      }

      const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      });

      userInfo = await userResponse.json();
      userInfo.providerId = userInfo.id;
    } else {
      return res.status(400).json({ error: 'Unsupported provider' });
    }

    const userId = await convexService.mutation('userFunctions:createUser', {
      email: userInfo.email,
      name: userInfo.name || userInfo.login,
      image: userInfo.picture || userInfo.avatar_url,
      provider,
      providerId: userInfo.providerId,
    });

    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days

    await convexService.mutation('userFunctions:createSession', {
      userId,
      sessionToken,
      expires,
    });

    res.json({
      success: true,
      user: {
        id: userId,
        email: userInfo.email,
        name: userInfo.name || userInfo.login,
        image: userInfo.picture || userInfo.avatar_url,
      },
      sessionToken,
      expires,
    });

  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ error: 'Internal server error during sign in' });
  }
});

router.post('/signout', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.sessionToken) {
      await convexService.mutation('userFunctions:deleteSession', {
        sessionToken: req.sessionToken,
      });
    }

    res.json({ success: true, message: 'Signed out successfully' });
  } catch (error) {
    console.error('Sign out error:', error);
    res.status(500).json({ error: 'Internal server error during sign out' });
  }
});

router.get('/me', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        error: 'User not authenticated',
        code: 'NOT_AUTHENTICATED'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        image: user.image,
        provider: user.provider,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      authenticated: true,
    });

  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

router.get('/session/cleanup', async (req: Request, res: Response) => {
  try {
    const deletedCount = await convexService.mutation('userFunctions:cleanupExpiredSessions', {});

    res.json({
      success: true,
      message: `Cleaned up ${deletedCount} expired sessions`,
      deletedCount,
    });
  } catch (error) {
    console.error('Session cleanup error:', error);
    res.status(500).json({ error: 'Internal server error during cleanup' });
  }
});

export default router;