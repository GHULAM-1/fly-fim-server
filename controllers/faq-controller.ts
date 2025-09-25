import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
import {
  Faq,
  CreateFaqRequest,
  UpdateFaqRequest,
  FaqResponse,
  PaginatedFaqResponse,
} from "../types/faq.types";

// GET /api/faqs
export const getAllFaqs = async (req: Request, res: Response) => {
  try {
    const { limit, offset } = req.query;

    const result = await convexService.query("faqFunctions:getAllFaqs", {
      limit: limit ? Number(limit) : 50,
      offset: offset ? Number(offset) : 0,
    });

    const response: FaqResponse = {
      success: true,
      data: result.page,
      message: "FAQs retrieved successfully",
    };
    res.json(response);
  } catch (error) {
    const response: FaqResponse = {
      success: false,
      message: "Failed to retrieve FAQs",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

// GET /api/faqs/:id
export const getFaqById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const faq = await convexService.query("faqFunctions:getFaqById", {
      id: id as any,
    });

    if (!faq) {
      const response: FaqResponse = {
        success: false,
        message: "FAQ not found",
      };
      return res.status(404).json(response);
    }

    const response: FaqResponse = {
      success: true,
      data: faq,
      message: "FAQ retrieved successfully",
    };
    res.json(response);
  } catch (error) {
    const response: FaqResponse = {
      success: false,
      message: "Failed to retrieve FAQ",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

// POST /api/faqs
export const createFaq = async (req: Request, res: Response) => {
  try {
    const body: CreateFaqRequest = req.body;

    const newId = await convexService.mutation("faqFunctions:createFaq", body);

    const createdFaq = await convexService.query("faqFunctions:getFaqById", { id: newId });

    const response: FaqResponse = {
      success: true,
      data: createdFaq,
      message: "FAQ created successfully",
    };
    res.status(201).json(response);
  } catch (error) {
    const response: FaqResponse = {
      success: false,
      message: "Failed to create FAQ",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

// PATCH /api/faqs/:id
export const updateFaq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patch: UpdateFaqRequest = req.body;

    await convexService.mutation("faqFunctions:updateFaq", {
      id: id as any,
      patch,
    });

    const response: FaqResponse = {
      success: true,
      message: "FAQ updated successfully",
    };
    res.json(response);
  } catch (error) {
    const response: FaqResponse = {
      success: false,
      message: "Failed to update FAQ",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

// GET /api/faqs/experience/:experienceId
export const getFaqsByExperience = async (req: Request, res: Response) => {
  try {
    const { experienceId } = req.params;

    const faqs = await convexService.query("faqFunctions:getFaqsByExperience", {
      experienceId: experienceId as any,
    });

    const response: FaqResponse = {
      success: true,
      data: faqs,
      message: "FAQs retrieved successfully",
    };
    res.json(response);
  } catch (error) {
    const response: FaqResponse = {
      success: false,
      message: "Failed to retrieve FAQs",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

// DELETE /api/faqs/:id
export const deleteFaq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await convexService.mutation("faqFunctions:deleteFaq", { id: id as any });

    const response: FaqResponse = {
      success: true,
      message: "FAQ deleted successfully",
    };
    res.json(response);
  } catch (error) {
    const response: FaqResponse = {
      success: false,
      message: "Failed to delete FAQ",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};