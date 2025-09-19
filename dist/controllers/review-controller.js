"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewsByExperienceId = exports.getReviewById = exports.getAllReviews = void 0;
const convex_service_1 = require("../services/convex-service");
// GET /api/reviews
const getAllReviews = async (req, res) => {
    try {
        const { limit, offset } = req.query;
        const result = await convex_service_1.convexService.query("reviewFunctions:getAllReviews", {
            limit: limit ? Number(limit) : 50,
            offset: offset ? Number(offset) : 0,
        });
        const response = {
            success: true,
            data: result.page,
            message: "Reviews retrieved successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to retrieve reviews",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getAllReviews = getAllReviews;
// GET /api/reviews/:id
const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await convex_service_1.convexService.query("reviewFunctions:getReviewById", { id: id });
        if (!review) {
            const response = {
                success: false,
                message: "Review not found",
            };
            return res.status(404).json(response);
        }
        const response = {
            success: true,
            data: review,
            message: "Review retrieved successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to retrieve review",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getReviewById = getReviewById;
// GET /api/reviews/experience/:experienceId
const getReviewsByExperienceId = async (req, res) => {
    try {
        const { experienceId } = req.params;
        const reviews = await convex_service_1.convexService.query("reviewFunctions:getReviewsByExperienceId", {
            experienceId: experienceId,
        });
        const response = {
            success: true,
            data: reviews,
            message: "Reviews retrieved successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to retrieve reviews",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getReviewsByExperienceId = getReviewsByExperienceId;
// POST /api/reviews
const createReview = async (req, res) => {
    try {
        const body = req.body;
        const newId = await convex_service_1.convexService.mutation("reviewFunctions:createReview", body);
        const createdReview = await convex_service_1.convexService.query("reviewFunctions:getReviewById", { id: newId });
        const response = {
            success: true,
            data: createdReview,
            message: "Review created successfully",
        };
        res.status(201).json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to create review",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.createReview = createReview;
// PATCH /api/reviews/:id
const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const patch = req.body;
        await convex_service_1.convexService.mutation("reviewFunctions:updateReview", {
            id: id,
            patch,
        });
        const response = {
            success: true,
            message: "Review updated successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to update review",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.updateReview = updateReview;
// DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        await convex_service_1.convexService.mutation("reviewFunctions:deleteReview", { id: id });
        const response = {
            success: true,
            message: "Review deleted successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to delete review",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.deleteReview = deleteReview;
//# sourceMappingURL=review-controller.js.map