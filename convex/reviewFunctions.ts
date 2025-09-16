import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Helper function to validate if a string is a valid Convex storage ID
const isValidStorageId = (id: string): boolean => {
  // Convex storage IDs are typically alphanumeric strings without special characters like '/' or '.'
  // File paths like '/images/d5.jpg.avif' should be rejected
  return !/[\/\.]/.test(id) && /^[a-z0-9]+$/i.test(id) && id.length > 20;
};

// Helper function to safely get image URL
const safeGetImageUrl = async (ctx: any, imageId: string): Promise<string | null> => {
  if (!isValidStorageId(imageId)) {
    return imageId.startsWith('/') ? imageId : null; // Return file paths as-is, reject invalid IDs
  }

  try {
    const url = await ctx.storage.getUrl(imageId);
    return url;
  } catch (error) {
    return null;
  }
};

// Helper function to structure review with resolved image URLs
const structureReviewWithImageUrls = async (ctx: any, review: any) => {
  // Resolve images array URLs
  let imageUrls: (string | null)[] = [];
  if (review.images && Array.isArray(review.images)) {
    imageUrls = await Promise.all(
      review.images.map((imageId: string) => safeGetImageUrl(ctx, imageId))
    );
  }

  return {
    ...review,
    imageUrls
  };
};

// List all reviews (paged)
export const getAllReviews = query({
  args: { limit: v.optional(v.number()), offset: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const { limit = 50, offset = 0 } = args;
    const result = await ctx.db
      .query("reviews")
      .order("desc")
      .paginate({ numItems: limit, cursor: offset > 0 ? offset.toString() : null });

    // Convert image IDs to URLs
    const reviewsWithUrls = await Promise.all(
      result.page.map((review) => structureReviewWithImageUrls(ctx, review))
    );

    return {
      ...result,
      page: reviewsWithUrls
    };
  },
});

// Get review by id
export const getReviewById = query({
  args: { id: v.id("reviews") },
  handler: async (ctx, args) => {
    const review = await ctx.db.get(args.id);
    if (!review) return null;
    return await structureReviewWithImageUrls(ctx, review);
  },
});

// Get reviews for an experience
export const getReviewsByExperience = query({
  args: { experienceId: v.id("experience") },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("byExperience", (q) => q.eq("experienceId", args.experienceId))
      .collect();

    return await Promise.all(
      reviews.map((review) => structureReviewWithImageUrls(ctx, review))
    );
  },
});

// Get reviews by user
export const getReviewsByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("byUser", (q) => q.eq("userId", args.userId))
      .collect();

    return await Promise.all(
      reviews.map((review) => structureReviewWithImageUrls(ctx, review))
    );
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
