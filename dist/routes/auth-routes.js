"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const convex_service_1 = require("../services/convex-service");
const auth_middleware_1 = require("../middleware/auth-middleware");
const email_service_1 = require("../services/email-service");
const config_1 = require("../utils/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post("/signin", async (req, res) => {
    try {
        const { provider, code, redirectUri } = req.body;
        if (!provider || !code) {
            return res.status(400).json({
                error: "Provider and authorization code are required",
            });
        }
        let userInfo;
        if (provider === "google") {
            const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    client_id: process.env.AUTH_GOOGLE_ID,
                    client_secret: process.env.AUTH_GOOGLE_SECRET,
                    code,
                    grant_type: "authorization_code",
                    redirect_uri: redirectUri || `${(0, config_1.getFrontendUrl)()}/auth/callback`,
                }),
            });
            const tokenData = await tokenResponse.json();
            if (!tokenData.access_token) {
                return res.status(400).json({ error: "Failed to get access token" });
            }
            const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
            });
            userInfo = await userResponse.json();
            userInfo.providerId = userInfo.id;
        }
        else {
            return res.status(400).json({ error: "Unsupported provider" });
        }
        // Check if user exists with a different provider
        const emailCheck = await convex_service_1.convexService.query("userFunctions:checkEmailExists", {
            email: userInfo.email.toLowerCase(),
        });
        if (emailCheck.exists && emailCheck.provider !== provider) {
            const providerName = emailCheck.provider === "email" ? "magic link" : emailCheck.provider;
            return res.status(409).json({
                error: "EMAIL_ALREADY_EXISTS",
                message: `An account with this email already exists using ${providerName} authentication. Please sign in using ${providerName} instead.`,
                existingProvider: emailCheck.provider,
                attemptedProvider: provider,
            });
        }
        const userId = await convex_service_1.convexService.mutation("userFunctions:createUser", {
            email: userInfo.email,
            name: userInfo.name || userInfo.login,
            image: userInfo.picture || userInfo.avatar_url,
            provider,
            providerId: userInfo.providerId,
        });
        // Create JWT token with only userId and email
        const jwtPayload = {
            userId: userId,
            email: userInfo.email,
        };
        const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        // Set HTTP-only cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            path: "/",
        });
        res.json({
            success: true,
            user: {
                id: userId,
                email: userInfo.email,
                name: userInfo.name || userInfo.login,
                image: userInfo.picture || userInfo.avatar_url,
            },
        });
    }
    catch (error) {
        console.error("Sign in error:", error);
        res.status(500).json({ error: "Internal server error during sign in" });
    }
});
router.get("/verify", async (req, res) => {
    try {
        const { token } = req.query;
        if (!token || typeof token !== "string") {
            return res.status(400).json({
                error: "Invalid verification token",
            });
        }
        // Verify JWT magic link token (no database lookup needed!)
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (jwtError) {
            return res.status(400).json({
                error: "Invalid or expired magic link",
            });
        }
        // Verify it's actually a magic link token
        if (decoded.purpose !== "magic-link") {
            return res.status(400).json({
                error: "Invalid token type",
            });
        }
        // Check if user exists with a different provider
        const emailCheck = await convex_service_1.convexService.query("userFunctions:checkEmailExists", {
            email: decoded.email.toLowerCase(),
        });
        if (emailCheck.exists && emailCheck.provider !== "email") {
            const providerName = emailCheck.provider === "email" ? "magic link" : emailCheck.provider;
            return res.status(409).json({
                error: "EMAIL_ALREADY_EXISTS",
                message: `An account with this email already exists using ${providerName} authentication. Please sign in using ${providerName} instead.`,
                existingProvider: emailCheck.provider,
                attemptedProvider: "email",
            });
        }
        // Create or get user
        const userId = await convex_service_1.convexService.mutation("userFunctions:createUser", {
            email: decoded.email,
            name: decoded.email.split("@")[0], // Use email prefix as default name
            provider: "email",
            providerId: decoded.email,
        });
        // Create auth JWT token (different from magic link token)
        const authPayload = {
            userId: userId,
            email: decoded.email,
        };
        const authToken = jsonwebtoken_1.default.sign(authPayload, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        // Debug: Log before setting cookie
        console.log("Setting cookie with authToken:", authToken.substring(0, 20) + "...");
        // Set HTTP-only cookie
        res.cookie("authToken", authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            path: "/",
        });
        console.log("Cookie set, returning success response...");
        // Return JSON success response instead of redirecting
        // Let the frontend handle the redirect
        return res.status(200).json({
            success: true,
            message: "Magic link verified successfully",
            user: {
                id: userId,
                email: decoded.email,
            },
        });
    }
    catch (error) {
        console.error("Magic link verification error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/me", auth_middleware_1.authMiddleware, async (req, res) => {
    try {
        const jwtUser = req.user; // This comes from JWT payload
        if (!jwtUser) {
            return res.status(401).json({
                error: "User not authenticated",
                code: "NOT_AUTHENTICATED",
            });
        }
        // Get full user data from database using userId from JWT
        const fullUser = await convex_service_1.convexService.query("userFunctions:getUserById", {
            userId: jwtUser.userId,
        });
        if (!fullUser) {
            return res.status(401).json({
                error: "User not found",
                code: "USER_NOT_FOUND",
            });
        }
        res.json({
            success: true,
            user: {
                id: fullUser._id,
                email: fullUser.email,
                name: fullUser.name,
                image: fullUser.image,
                provider: fullUser.provider,
                createdAt: fullUser.createdAt,
                updatedAt: fullUser.updatedAt,
            },
            authenticated: true,
        });
    }
    catch (error) {
        console.error("Get current user error:", error);
        res.status(500).json({
            error: "Internal server error",
            code: "INTERNAL_ERROR",
        });
    }
});
router.post("/signout", async (req, res) => {
    try {
        // Clear the authentication cookie
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });
        res.json({
            success: true,
            message: "Signed out successfully",
        });
    }
    catch (error) {
        console.error("Sign out error:", error);
        res.status(500).json({ error: "Internal server error during sign out" });
    }
});
// Pre-authentication email conflict check
router.post("/check-email", async (req, res) => {
    try {
        const { email, intendedProvider } = req.body;
        if (!email || !email.includes("@")) {
            return res.status(400).json({
                error: "Valid email address is required",
            });
        }
        if (!intendedProvider) {
            return res.status(400).json({
                error: "Intended provider is required",
            });
        }
        // Check if user exists with a different provider
        const emailCheck = await convex_service_1.convexService.query("userFunctions:checkEmailExists", {
            email: email.toLowerCase(),
        });
        if (emailCheck.exists && emailCheck.provider !== intendedProvider) {
            const providerName = emailCheck.provider === "email" ? "magic link" : emailCheck.provider;
            return res.status(409).json({
                error: "EMAIL_ALREADY_EXISTS",
                message: `An account with this email already exists using ${providerName} authentication. Please sign in using ${providerName} instead.`,
                existingProvider: emailCheck.provider,
                attemptedProvider: intendedProvider,
            });
        }
        // Email is available or already exists with the same provider
        res.json({
            success: true,
            message: "Email can be used with the intended provider",
            emailExists: emailCheck.exists,
            provider: emailCheck.exists ? emailCheck.provider : null,
        });
    }
    catch (error) {
        console.error("Email check error:", error);
        res.status(500).json({ error: "Internal server error during email check" });
    }
});
// Magic Link Authentication Routes
router.post("/send-magic-link", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email || !email.includes("@")) {
            return res.status(400).json({
                error: "Valid email address is required",
            });
        }
        // Check if user exists with a different provider before sending magic link
        const emailCheck = await convex_service_1.convexService.query("userFunctions:checkEmailExists", {
            email: email.toLowerCase(),
        });
        if (emailCheck.exists && emailCheck.provider !== "email") {
            const providerName = emailCheck.provider === "email" ? "magic link" : emailCheck.provider;
            return res.status(409).json({
                error: `An account with this email already exists using ${providerName} authentication. Please sign in using ${providerName} instead.`,
                message: `An account with this email already exists using ${providerName} authentication. Please sign in using ${providerName} instead.`,
                existingProvider: emailCheck.provider,
                attemptedProvider: "email",
            });
        }
        // Create JWT magic link token (no database needed!)
        const magicToken = jsonwebtoken_1.default.sign({
            email: email.toLowerCase(),
            purpose: "magic-link",
        }, process.env.JWT_SECRET, { expiresIn: "15m" });
        // Send magic link email
        const emailSent = await (0, email_service_1.sendMagicLink)(email, magicToken);
        if (!emailSent) {
            return res.status(500).json({
                error: "Failed to send magic link email",
            });
        }
        res.json({
            success: true,
            message: "Magic link sent to your email",
        });
    }
    catch (error) {
        console.error("Send magic link error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = router;
//# sourceMappingURL=auth-routes.js.map