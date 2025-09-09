import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
import { api } from "../convex/_generated/api";
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
    const convex = convexService.getClient();
    const result = await convex.query(api.faqFunctions.getAllFaqs, {
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
      message: "FAQs retrieved successfully",
    } as PaginatedFaqResponse);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch FAQs",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// GET /api/faqs/:id
export const getFaqById = async (req: Request, res: Response) => {
  try {
    const convex = convexService.getClient();
    const faq = await convex.query(api.faqFunctions.getFaqById, { id: req.params.id as any });
    if (!faq) return res.status(404).json({ success: false, message: "FAQ not found" });
    res.json({ success: true, data: faq, message: "FAQ retrieved successfully" });
  } catch (error) {
    console.error("Error fetching FAQ:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch FAQ",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// GET /api/faqs/experience/:experienceId
export const getFaqsByExperience = async (req: Request, res: Response) => {
  try {
    const convex = convexService.getClient();
    const faqs = await convex.query(api.faqFunctions.getFaqsByExperience, {
      experienceId: req.params.experienceId as any,
    });
    res.json({ success: true, data: faqs, message: "FAQs by experience retrieved successfully" });
  } catch (error) {
    console.error("Error fetching FAQs by experience:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch FAQs by experience",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// POST /api/faqs
export const createFaq = async (req: Request, res: Response) => {
  try {
    const body: CreateFaqRequest = req.body;
    if (!body?.experienceId || !body?.question || !body?.answer) {
      return res.status(400).json({
        success: false,
        message: "experienceId, question and answer are required",
      });
    }
    const convex = convexService.getClient();
    const id = await convex.mutation(api.faqFunctions.createFaq, body as any);
    res.status(201).json({
      success: true,
      data: { _id: id, ...body },
      message: "FAQ created successfully",
    });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create FAQ",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// PUT /api/faqs/:id
export const updateFaq = async (req: Request, res: Response) => {
  try {
    const patch: UpdateFaqRequest = req.body;
    if (!patch || (patch.question === undefined && patch.answer === undefined)) {
      return res.status(400).json({ success: false, message: "No fields provided to update" });
    }
    const convex = convexService.getClient();
    await convex.mutation(api.faqFunctions.updateFaq, {
      id: req.params.id as any,
      question: patch.question,
      answer: patch.answer,
    });
    res.json({ success: true, message: "FAQ updated successfully" });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update FAQ",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// DELETE /api/faqs/:id
export const deleteFaq = async (req: Request, res: Response) => {
  try {
    const convex = convexService.getClient();
    await convex.mutation(api.faqFunctions.deleteFaq, { id: req.params.id as any });
    res.json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete FAQ",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
