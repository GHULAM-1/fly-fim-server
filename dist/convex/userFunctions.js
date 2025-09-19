"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByProvider = exports.getUserByEmail = exports.getUserById = exports.createUser = void 0;
const values_1 = require("convex/values");
const server_1 = require("./_generated/server");
const dateHelpers_1 = require("./dateHelpers");
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
            await ctx.db.patch(existingUser._id, {
                updatedAt: (0, dateHelpers_1.getCurrentCustomDate)(),
                name: args.name || existingUser.name,
                image: args.image || existingUser.image,
            });
            return existingUser._id;
        }
        const currentDate = (0, dateHelpers_1.getCurrentCustomDate)();
        const userId = await ctx.db.insert("users", {
            email: args.email,
            name: args.name,
            image: args.image,
            provider: args.provider,
            providerId: args.providerId,
            createdAt: currentDate,
            updatedAt: currentDate,
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
exports.getUserByProvider = (0, server_1.query)({
    args: {
        provider: values_1.v.string(),
        providerId: values_1.v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("byProvider", (q) => q.eq("provider", args.provider).eq("providerId", args.providerId))
            .first();
    },
});
//# sourceMappingURL=userFunctions.js.map