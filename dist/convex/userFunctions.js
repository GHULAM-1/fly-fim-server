"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupExpiredSessions = exports.deleteSession = exports.getSessionByToken = exports.createSession = exports.getCurrentUser = exports.getUserByEmail = exports.getUserById = exports.createUser = void 0;
const values_1 = require("convex/values");
const server_1 = require("./_generated/server");
const auth_1 = require("./auth");
exports.createUser = (0, server_1.mutation)({
    args: {
        email: values_1.v.string(),
        name: values_1.v.optional(values_1.v.string()),
        image: values_1.v.optional(values_1.v.string()),
        provider: values_1.v.string(),
        providerId: values_1.v.string(),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("users")
            .withIndex("byProvider", (q) => q.eq("provider", args.provider).eq("providerId", args.providerId))
            .first();
        if (existingUser) {
            return existingUser._id;
        }
        const now = Date.now();
        const userId = await ctx.db.insert("users", {
            email: args.email,
            name: args.name,
            image: args.image,
            provider: args.provider,
            providerId: args.providerId,
            createdAt: now,
            updatedAt: now,
        });
        return userId;
    },
});
exports.getUserById = (0, server_1.query)({
    args: { userId: values_1.v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.userId);
    },
});
exports.getUserByEmail = (0, server_1.query)({
    args: { email: values_1.v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("byEmail", (q) => q.eq("email", args.email))
            .first();
    },
});
exports.getCurrentUser = (0, server_1.query)({
    args: {},
    handler: async (ctx) => {
        const identity = await auth_1.auth.getUserIdentity(ctx);
        if (!identity) {
            return null;
        }
        const user = await ctx.db
            .query("users")
            .withIndex("byProvider", (q) => q.eq("provider", identity.tokenIdentifier.split("|")[0])
            .eq("providerId", identity.tokenIdentifier.split("|")[1]))
            .first();
        return user;
    },
});
exports.createSession = (0, server_1.mutation)({
    args: {
        userId: values_1.v.id("users"),
        sessionToken: values_1.v.string(),
        expires: values_1.v.number(),
    },
    handler: async (ctx, args) => {
        const sessionId = await ctx.db.insert("authSessions", {
            userId: args.userId,
            sessionToken: args.sessionToken,
            expires: args.expires,
            createdAt: Date.now(),
        });
        return sessionId;
    },
});
exports.getSessionByToken = (0, server_1.query)({
    args: { sessionToken: values_1.v.string() },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("authSessions")
            .withIndex("bySessionToken", (q) => q.eq("sessionToken", args.sessionToken))
            .first();
        if (!session || session.expires < Date.now()) {
            return null;
        }
        const user = await ctx.db.get(session.userId);
        return { session, user };
    },
});
exports.deleteSession = (0, server_1.mutation)({
    args: { sessionToken: values_1.v.string() },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("authSessions")
            .withIndex("bySessionToken", (q) => q.eq("sessionToken", args.sessionToken))
            .first();
        if (session) {
            await ctx.db.delete(session._id);
        }
    },
});
exports.cleanupExpiredSessions = (0, server_1.mutation)({
    args: {},
    handler: async (ctx) => {
        const now = Date.now();
        const expiredSessions = await ctx.db
            .query("authSessions")
            .withIndex("byExpiry", (q) => q.lt("expires", now))
            .collect();
        for (const session of expiredSessions) {
            await ctx.db.delete(session._id);
        }
        return expiredSessions.length;
    },
});
//# sourceMappingURL=userFunctions.js.map