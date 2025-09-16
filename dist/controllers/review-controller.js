"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.createReview = exports.getReviewsByUser = exports.getReviewsByExperience = exports.getReviewById = exports.getAllReviews = void 0;
const convex_service_1 = require("../services/convex-service");
const api_1 = require("../convex/_generated/api");
const getAllReviews = async (req, res) => {
    try {
        const { limit, offset } = req.query;
        const convex = convex_service_1.convexService.getClient();
        const result = await convex.query(api_1.api.reviewFunctions.getAllReviews, {
            limit: limit ? Number(limit) : 50,
            offset: offset ? Number(offset) : 0,
        });
        res.json({
            success: true,
            data: result.page,
            pagination: {
                limit: Number(limit ?? 50),
                offset: Number(offset ?? 0),
                hasMore: !result.isDone,
                nextOffset: Number(result.continueCursor ?? 0),
            },
            message: "Reviews retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch reviews",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getAllReviews = getAllReviews;
const getReviewById = async (req, res) => {
    try {
        const convex = convex_service_1.convexService.getClient();
        const review = await convex.query(api_1.api.reviewFunctions.getReviewById, { id: req.params.id });
        if (!review)
            return res.status(404).json({ success: false, message: "Review not found" });
        res.json({ success: true, data: review, message: "Review retrieved successfully" });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch review",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getReviewById = getReviewById;
const getReviewsByExperience = async (req, res) => {
    try {
        const convex = convex_service_1.convexService.getClient();
        const reviews = await convex.query(api_1.api.reviewFunctions.getReviewsByExperience, {
            experienceId: req.params.experienceId,
        });
        res.json({ success: true, data: reviews, message: "Reviews by experience retrieved successfully" });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch reviews by experience",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getReviewsByExperience = getReviewsByExperience;
const getReviewsByUser = async (req, res) => {
    try {
        const convex = convex_service_1.convexService.getClient();
        const reviews = await convex.query(api_1.api.reviewFunctions.getReviewsByUser, {
            userId: req.params.userId,
        });
        res.json({ success: true, data: reviews, message: "Reviews by user retrieved successfully" });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch reviews by user",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getReviewsByUser = getReviewsByUser;
const createReview = async (req, res) => {
    try {
        const body = req.body;
        if (!body?.userId || !body?.experienceId || body.stars === undefined) {
            return res.status(400).json({
                success: false,
                message: "userId, experienceId, and stars are required",
            });
        }
        const convex = convex_service_1.convexService.getClient();
        const id = await convex.mutation(api_1.api.reviewFunctions.createReview, body);
        res.status(201).json({
            success: true,
            data: { _id: id, ...body },
            message: "Review created successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create review",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.createReview = createReview;
// export const updateReview = async (req: Request, res: Response) => {
//   try {
//     const patch: UpdateReviewRequest = req.body;
//     if (!patch || Object.keys(patch).length === 0) {
//       return res.status(400).json({ success: false, message: "No fields provided to update" });
//     }
//     const convex = convexService.getClient();
//     await convex.mutation(api.reviewFunctions.updateReview, {
//       id: req.params.id as any,
//       ...patch,
//     });
//     res.json({ success: true, message: "Review updated successfully" });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update review",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };
const deleteReview = async (req, res) => {
    try {
        const convex = convex_service_1.convexService.getClient();
        await convex.mutation(api_1.api.reviewFunctions.deleteReview, { id: req.params.id });
        res.json({ success: true, message: "Review deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete review",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.deleteReview = deleteReview;
//# sourceMappingURL=review-controller.js.map