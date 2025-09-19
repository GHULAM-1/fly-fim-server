import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
import {
  ReviewResponse,
  CreateReviewRequest,
  UpdateReviewRequest,
  PaginatedReviewResponse,
} from "../types/review.types";

// GET /api/reviews
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const { limit, offset } = req.query;

    const result = await convexService.query("reviewFunctions:getAllReviews", {
      limit: limit ? Number(limit) : 50,
      offset: offset ? Number(offset) : 0,
    });

    const response: ReviewResponse = {
      success: true,
      data: result.page,
      message: "Reviews retrieved successfully",
    };
    res.json(response);
  } catch (error) {
    const response: ReviewResponse = {
      success: false,
      message: "Failed to retrieve reviews",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

// GET /api/reviews/:id
export const getReviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const review = await convexService.query("reviewFunctions:getReviewById", { id: id as any });

    if (!review) {
      const response: ReviewResponse = {
        success: false,
        message: "Review not found",
      };
      return res.status(404).json(response);
    }

    const response: ReviewResponse = {
      success: true,
      data: review,
      message: "Review retrieved successfully",
    };
    res.json(response);
  } catch (error) {
    const response: ReviewResponse = {
      success: false,
      message: "Failed to retrieve review",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

// GET /api/reviews/experience/:experienceId
export const getReviewsByExperienceId = async (req: Request, res: Response) => {
  try {
    const { experienceId } = req.params;

    const reviews = await convexService.query("reviewFunctions:getReviewsByExperienceId", {
      experienceId: experienceId as any,
    });

    const response: ReviewResponse = {
      success: true,
      data: reviews,
      message: "Reviews retrieved successfully",
    };
    res.json(response);
  } catch (error) {
    const response: ReviewResponse = {
      success: false,
      message: "Failed to retrieve reviews",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

// POST /api/reviews
export const createReview = async (req: Request, res: Response) => {
  try {
    const body: CreateReviewRequest = req.body;

    const newId = await convexService.mutation("reviewFunctions:createReview", body);

    const createdReview = await convexService.query("reviewFunctions:getReviewById", { id: newId });

    const response: ReviewResponse = {
      success: true,
      data: createdReview,
      message: "Review created successfully",
    };
    res.status(201).json(response);
  } catch (error) {
    const response: ReviewResponse = {
      success: false,
      message: "Failed to create review",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

// PATCH /api/reviews/:id
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patch: UpdateReviewRequest = req.body;

    await convexService.mutation("reviewFunctions:updateReview", {
      id: id as any,
      patch,
    });

    const response: ReviewResponse = {
      success: true,
      message: "Review updated successfully",
    };
    res.json(response);
  } catch (error) {
    const response: ReviewResponse = {
      success: false,
      message: "Failed to update review",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

// DELETE /api/reviews/:id
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await convexService.mutation("reviewFunctions:deleteReview", { id: id as any });

    const response: ReviewResponse = {
      success: true,
      message: "Review deleted successfully",
    };
    res.json(response);
  } catch (error) {
    const response: ReviewResponse = {
      success: false,
      message: "Failed to delete review",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};