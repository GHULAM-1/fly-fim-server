import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all reviews (paged)
export const getAllReviews = query({
  args: { limit: v.optional(v.number()), offset: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const { limit = 50, offset = 0 } = args;
    return await ctx.db
      .query("reviews")
      .order("desc")
      .paginate({ numItems: limit, cursor: offset > 0 ? offset.toString() : null });
  },
});

// Get review by id
export const getReviewById = query({
  args: { id: v.id("reviews") },
  handler: async (ctx, args) => ctx.db.get(args.id),
});

// Get reviews for an experience
export const getReviewsByExperience = query({
  args: { experienceId: v.id("experience") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .withIndex("byExperience", (q) => q.eq("experienceId", args.experienceId))
      .collect();
  },
});

// Get reviews by user
export const getReviewsByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .withIndex("byUser", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Create review
export const createReview = mutation({
  args: {
    userId: v.string(),
    experienceId: v.id("experience"),
    stars: v.number(),
    images: v.array(v.id("_storage")),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("reviews", args);
  },
});

// Update review (user can edit)
export const updateReview = mutation({
  args: {
    id: v.id("reviews"),
    stars: v.optional(v.number()),
    images: v.optional(v.array(v.id("_storage"))),
    text: v.optional(v.string()),
  },
  handler: async (ctx, { id, stars, images, text }) => {
    const patch: any = {};
    if (stars !== undefined) patch.stars = stars;
    if (images !== undefined) patch.images = images;
    if (text !== undefined) patch.text = text;
    if (Object.keys(patch).length > 0) {
      await ctx.db.patch(id, patch);
    }
  },
});

// Delete review
export const deleteReview = mutation({
  args: { id: v.id("reviews") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
