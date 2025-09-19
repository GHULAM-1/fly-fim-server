"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeToken = exports.validateToken = exports.createAuthToken = void 0;
const values_1 = require("convex/values");
const server_1 = require("./_generated/server");
exports.createAuthToken = (0, server_1.mutation)({
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
exports.validateToken = (0, server_1.query)({
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
exports.revokeToken = (0, server_1.mutation)({
    args: { sessionToken: values_1.v.string() },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("authSessions")
            .withIndex("bySessionToken", (q) => q.eq("sessionToken", args.sessionToken))
            .first();
        if (session) {
            await ctx.db.delete(session._id);
            return true;
        }
        return false;
    },
});
//# sourceMappingURL=auth.js.map