import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
import { api } from "../convex/_generated/api";
import {
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
  ReviewResponse,
  PaginatedReviewResponse,
} from "../types/review.types";

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const { limit, offset } = req.query;
    const convex = convexService.getClient();
    const result = await convex.query(api.reviewFunctions.getAllReviews, {
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
    } as PaginatedReviewResponse);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const convex = convexService.getClient();
    const review = await convex.query(api.reviewFunctions.getReviewById, { id: req.params.id as any });
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });
    res.json({ success: true, data: review, message: "Review retrieved successfully" });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch review",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getReviewsByExperience = async (req: Request, res: Response) => {
  try {
    const convex = convexService.getClient();
    const reviews = await convex.query(api.reviewFunctions.getReviewsByExperience, {
      experienceId: req.params.experienceId as any,
    });
    res.json({ success: true, data: reviews, message: "Reviews by experience retrieved successfully" });
  } catch (error) {
    console.error("Error fetching reviews by experience:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews by experience",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getReviewsByUser = async (req: Request, res: Response) => {
  try {
    const convex = convexService.getClient();
    const reviews = await convex.query(api.reviewFunctions.getReviewsByUser, {
      userId: req.params.userId,
    });
    res.json({ success: true, data: reviews, message: "Reviews by user retrieved successfully" });
  } catch (error) {
    console.error("Error fetching reviews by user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews by user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const body: CreateReviewRequest = req.body;
    if (!body?.userId || !body?.experienceId || body.stars === undefined) {
      return res.status(400).json({
        success: false,
        message: "userId, experienceId, and stars are required",
      });
    }
    const convex = convexService.getClient();
    const id = await convex.mutation(api.reviewFunctions.createReview, body as any);
    res.status(201).json({
      success: true,
      data: { _id: id, ...body },
      message: "Review created successfully",
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

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
//     console.error("Error updating review:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update review",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const convex = convexService.getClient();
    await convex.mutation(api.reviewFunctions.deleteReview, { id: req.params.id as any });
    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
