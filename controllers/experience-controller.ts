import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
import { api } from "../convex/_generated/api";
import {
  ExperienceResponse,
  CreateExperienceRequest,
  UpdateExperienceRequest,
  ExperienceListWithFacetsResponse,
} from "../types/experience.types";


export const getAllExperiences = async (_req: Request, res: Response) => {
  try {
    const convex = convexService.getClient();
    const result = await convex.query(
      api.experienceFunctions.getAllExperiences,
      {
        limit: 50,
        offset: 0,
      }
    );
    res.json({
      success: true,
      data: result.page,
      message: "Experiences retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    const response: ExperienceResponse = {
      success: false,
      message: "Failed to fetch experiences",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convex = convexService.getClient();
    const experience = await convex.query(
      api.experienceFunctions.getExperienceById,
      { id: id as any }
    );
    if (!experience)
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    res.json({
      success: true,
      data: experience,
      message: "Experience retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching experience:", error);
    const response: ExperienceResponse = {
      success: false,
      message: "Failed to fetch experience",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    const body: CreateExperienceRequest = req.body;
    if (!body?.title) {
      const response: ExperienceResponse = {
        success: false,
        message: "title is required",
      };
      return res.status(400).json(response);
    }
    const convex = convexService.getClient();
    const newId = await convex.mutation(
      api.experienceFunctions.createExperience,
      body as any
    );
    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: { _id: newId, ...body },
    });
  } catch (error) {
    console.error("Error creating experience:", error);
    const response: ExperienceResponse = {
      success: false,
      message: "Failed to create experience",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patch: UpdateExperienceRequest = req.body;
    if (!patch || Object.keys(patch).length === 0) {
      const response: ExperienceResponse = {
        success: false,
        message: "No fields provided to update",
      };
      return res.status(400).json(response);
    }
    const convex = convexService.getClient();
    await convex.mutation(api.experienceFunctions.updateExperience, {
      id: id as any,
      patch: patch as any,
    });
    res.json({ success: true, message: "Experience updated successfully" });
  } catch (error) {
    console.error("Error updating experience:", error);
    const response: ExperienceResponse = {
      success: false,
      message: "Failed to update experience",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convex = convexService.getClient();
    await convex.mutation(api.experienceFunctions.deleteExperience, {
      id: id as any,
    });
    res.json({ success: true, message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    const response: ExperienceResponse = {
      success: false,
      message: "Failed to delete experience",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

