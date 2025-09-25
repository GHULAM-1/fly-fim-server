"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewsByUser = exports.getReviewsByExperience = exports.getReviewById = exports.getAllReviews = void 0;
const server_1 = require("./_generated/server");
const values_1 = require("convex/values");
// Helper function to validate if a string is a valid Convex storage ID
const isValidStorageId = (id) => {
    // Convex storage IDs are typically alphanumeric strings without special characters like '/' or '.'
    // File paths like '/images/d5.jpg.avif' should be rejected
    return !/[\/\.]/.test(id) && /^[a-z0-9]+$/i.test(id) && id.length > 20;
};
// Helper function to safely get image URL
const safeGetImageUrl = async (ctx, imageId) => {
    if (!isValidStorageId(imageId)) {
        return imageId.startsWith('/') ? imageId : null; // Return file paths as-is, reject invalid IDs
    }
    try {
        const url = await ctx.storage.getUrl(imageId);
        return url;
    }
    catch (error) {
        return null;
    }
};
// Helper function to structure review with resolved image URLs
const structureReviewWithImageUrls = async (ctx, review) => {
    // Get user data to get the name
    const user = await ctx.db.query("users").filter((q) => q.eq(q.field("providerId"), review.userId)).first();
    // Resolve images array URLs
    let imageUrls = [];
    if (review.images && Array.isArray(review.images)) {
        imageUrls = await Promise.all(review.images.map((imageId) => safeGetImageUrl(ctx, imageId)));
    }
    return {
        ...review,
        userName: user?.name || 'Anonymous User',
        imageUrls
    };
};
// List all reviews (paged)
exports.getAllReviews = (0, server_1.query)({
    args: { limit: values_1.v.optional(values_1.v.number()), offset: values_1.v.optional(values_1.v.number()) },
    handler: async (ctx, args) => {
        const { limit = 50, offset = 0 } = args;
        const result = await ctx.db
            .query("reviews")
            .order("desc")
            .paginate({ numItems: limit, cursor: offset > 0 ? offset.toString() : null });
        // Convert image IDs to URLs
        const reviewsWithUrls = await Promise.all(result.page.map((review) => structureReviewWithImageUrls(ctx, review)));
        return {
            ...result,
            page: reviewsWithUrls
        };
    },
});
// Get review by id
exports.getReviewById = (0, server_1.query)({
    args: { id: values_1.v.id("reviews") },
    handler: async (ctx, args) => {
        const review = await ctx.db.get(args.id);
        if (!review)
            return null;
        return await structureReviewWithImageUrls(ctx, review);
    },
});
// Get reviews for an experience
exports.getReviewsByExperience = (0, server_1.query)({
    args: { experienceId: values_1.v.id("experience") },
    handler: async (ctx, args) => {
        const reviews = await ctx.db
            .query("reviews")
            .withIndex("byExperience", (q) => q.eq("experienceId", args.experienceId))
            .collect();
        return await Promise.all(reviews.map((review) => structureReviewWithImageUrls(ctx, review)));
    },
});
// Get reviews by user
exports.getReviewsByUser = (0, server_1.query)({
    args: { userId: values_1.v.string() },
    handler: async (ctx, args) => {
        const reviews = await ctx.db
            .query("reviews")
            .withIndex("byUser", (q) => q.eq("userId", args.userId))
            .collect();
        return await Promise.all(reviews.map((review) => structureReviewWithImageUrls(ctx, review)));
    },
});
// Create review
exports.createReview = (0, server_1.mutation)({
    args: {
        userId: values_1.v.string(),
        experienceId: values_1.v.id("experience"),
        stars: values_1.v.number(),
        images: values_1.v.array(values_1.v.id("_storage")),
        text: values_1.v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("reviews", args);
    },
});
// Update review (user can edit)
exports.updateReview = (0, server_1.mutation)({
    args: {
        id: values_1.v.id("reviews"),
        stars: values_1.v.optional(values_1.v.number()),
        images: values_1.v.optional(values_1.v.array(values_1.v.id("_storage"))),
        text: values_1.v.optional(values_1.v.string()),
    },
    handler: async (ctx, { id, stars, images, text }) => {
        const patch = {};
        if (stars !== undefined)
            patch.stars = stars;
        if (images !== undefined)
            patch.images = images;
        if (text !== undefined)
            patch.text = text;
        if (Object.keys(patch).length > 0) {
            await ctx.db.patch(id, patch);
        }
    },
});
// Delete review
exports.deleteReview = (0, server_1.mutation)({
    args: { id: values_1.v.id("reviews") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
//# sourceMappingURL=reviewFunctions.js.map