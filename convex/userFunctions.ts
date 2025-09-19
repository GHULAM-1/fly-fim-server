import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentCustomDate } from "./dateHelpers";

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    provider: v.string(),
    providerId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("byProvider", (q) =>
        q.eq("provider", args.provider).eq("providerId", args.providerId)
      )
      .first();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        updatedAt: getCurrentCustomDate(),
        name: args.name || existingUser.name,
        image: args.image || existingUser.image,
      });
      return existingUser._id;
    }

    const currentDate = getCurrentCustomDate();
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

export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("byEmail", (q) => q.eq("email", args.email))
      .first();
  },
});

export const getUserByProvider = query({
  args: {
    provider: v.string(),
    providerId: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("byProvider", (q) =>
        q.eq("provider", args.provider).eq("providerId", args.providerId)
      )
      .first();
  },
});

