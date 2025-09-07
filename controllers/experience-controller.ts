import { Request, Response } from "express";
import { convexService } from "../services/convexService";
import { api } from "../convex/_generated/api";
import {
  ExperienceResponse,
  CreateExperienceRequest,
  UpdateExperienceRequest,
  ExperienceListWithFacetsResponse,
} from "../types/experience.types";


export const getExperiencesWithDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { limit } = req.query;
    const convex = convexService.getClient();
    const experiences = await convex.query(
      api.experienceFunctions.getExperiencesWithDetails,
      {
        limit: limit ? Number(limit) : 10,
      }
    );

    res.json({
      success: true,
      data: experiences,
      message: "Experiences with details retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching experiences with details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch experiences with details",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getExperiencesByCity = async (req: Request, res: Response) => {
  try {
    const { cityId } = req.params;
    const { limit, offset } = req.query;

    const convex = convexService.getClient();
    const result = await convex.query(
      api.experienceFunctions.getExperiencesByCity,
      {
        cityId: cityId as any,
        limit: limit ? Number(limit) : 50,
        offset: offset ? Number(offset) : 0,
      }
    );

    res.json({
      success: true,
      data: result.page,
      pagination: {
        total: result.total,
        limit: Number(limit ?? 50),
        offset: Number(offset ?? 0),
        hasMore: !result.isDone,
        nextOffset: Number(result.continueCursor ?? 0),
      },
      categories: result.distinctCategories,
      subcategories: result.distinctSubcategories,
      message: "Experiences by city retrieved successfully",
    } as ExperienceListWithFacetsResponse);
  } catch (error) {
    console.error("Error fetching experiences by city:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch experiences by city",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getExperiencesByCategory = async (req: Request, res: Response) => {
  try {
    const { cityId, categoryName } = req.params;
    const { limit, offset } = req.query;

    if (!cityId || !categoryName) {
      return res.status(400).json({
        success: false,
        message: "cityId and categoryName are required",
      });
    }

    const convex = convexService.getClient();
    const result = await convex.query(
      api.experienceFunctions.getExperiencesByCategory, 
      {
        cityId: cityId as any,
        categoryName,
        limit: limit ? Number(limit) : 50,
        offset: offset ? Number(offset) : 0,
      }
    );

    res.json({
      success: true,
      data: result.page,
      categories: result.distinctCategories,
      subcategories: result.distinctSubcategories,
      pagination: {
        total: result.total,
        limit: Number(limit ?? 50),
        offset: Number(offset ?? 0),
        hasMore: !result.isDone,
        nextOffset: Number(result.continueCursor ?? 0),
      },
      message: `Experiences for cityId "${cityId}" and category "${categoryName}" retrieved successfully`,
    });
  } catch (error) {
    console.error("Error fetching experiences by city & category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch experiences by city & category",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * GET /api/experiences/by-city-category-subcategory/:cityId/:categoryName/:subcategoryName?limit=50&offset=0
 */
export const getExperiencesBySubcategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { cityId, categoryName, subcategoryName } = req.params;
    const { limit, offset } = req.query;

    if (!cityId || !categoryName || !subcategoryName) {
      return res.status(400).json({
        success: false,
        message: "cityId, categoryName and subcategoryName are required",
      });
    }

    const convex = convexService.getClient();
    const result = await convex.query(
      api.experienceFunctions.getExperiencesBySubcategory,
      {
        cityId: cityId as any,
        categoryName,
        subcategoryName,
        limit: limit ? Number(limit) : 50,
        offset: offset ? Number(offset) : 0,
      }
    );

    res.json({
      success: true,
      data: result.page,
      categories: result.distinctCategories,
      subcategories: result.distinctSubcategories,
      pagination: {
        total: result.total,
        limit: Number(limit ?? 50),
        offset: Number(offset ?? 0),
        hasMore: !result.isDone,
        nextOffset: Number(result.continueCursor ?? 0),
      },
      message: `Experiences for cityId "${cityId}", category "${categoryName}" and subcategory "${subcategoryName}" retrieved successfully`,
    });
  } catch (error) {
    console.error(
      "Error fetching experiences by city, category & subcategory:",
      error
    );
    res.status(500).json({
      success: false,
      message: "Failed to fetch experiences by city, category & subcategory",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

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
