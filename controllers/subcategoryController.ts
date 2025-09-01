import { Request, Response } from "express";
import { convexService } from "../services/convexService";
import { api } from "../convex/_generated/api";
import {
  SubcategoryResponse,
  CreateSubcategoryRequest,
  UpdateSubcategoryRequest,
} from "../types/subcategory.types";

export const getAllSubcategories = async (req: Request, res: Response) => {
  try {
    const convex = convexService.getClient();
    
    const result = await convex.query(api.subcategoryFunctions.getAllSubcategories, {
      limit: 50,
      offset: 0,
    });
    
    // Extract only the subcategories array from the paginated result
    const subcategories = result.page;
    
    res.json({
      success: true,
      data: subcategories,
      message: "Subcategories retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    const response: SubcategoryResponse = {
      success: false,
      message: "Failed to fetch subcategories",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const getSubcategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convex = convexService.getClient();

    const subcategory = await convex.query(api.subcategoryFunctions.getSubcategoryById, { id: id as any });
    if (!subcategory) return res.status(404).json({ success: false, message: 'Subcategory not found' });
    res.json({ success: true, data: subcategory, message: 'Subcategory retrieved successfully' });
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    const response: SubcategoryResponse = {
      success: false,
      message: "Failed to fetch subcategory",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const createSubcategory = async (req: Request, res: Response) => {
  try {
    const { experienceId, subcategoryName }: CreateSubcategoryRequest = req.body;

    // Validation
    if (!experienceId || !subcategoryName) {
      const response: SubcategoryResponse = {
        success: false,
        message: "experienceId and subcategoryName are required",
      };
      return res.status(400).json(response);
    }

    const convex = convexService.getClient();

    const subcategoryId = await convex.mutation(api.subcategoryFunctions.createSubcategory, { 
      experienceId: experienceId as any, 
      subcategoryName
    });
    res.status(201).json({ 
      success: true, 
      message: 'Subcategory created successfully', 
      data: { _id: subcategoryId, experienceId, subcategoryName } 
    });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    const response: SubcategoryResponse = {
      success: false,
      message: "Failed to create subcategory",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const updateSubcategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates: UpdateSubcategoryRequest = req.body;

    if (!updates.subcategoryName) {
      const response: SubcategoryResponse = {
        success: false,
        message: "subcategoryName is required for update",
      };
      return res.status(400).json(response);
    }

    const convex = convexService.getClient();

    await convex.mutation(api.subcategoryFunctions.updateSubcategory, { 
      id: id as any, 
      subcategoryName: updates.subcategoryName! 
    });
    res.json({ success: true, message: 'Subcategory updated successfully' });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    const response: SubcategoryResponse = {
      success: false,
      message: "Failed to update subcategory",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const deleteSubcategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convex = convexService.getClient();

    await convex.mutation(api.subcategoryFunctions.deleteSubcategory, { id: id as any });
    res.json({ success: true, message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    const response: SubcategoryResponse = {
      success: false,
      message: "Failed to delete subcategory",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const getSubcategoriesByExperience = async (req: Request, res: Response) => {
  try {
    const { experienceId } = req.params;
    const convex = convexService.getClient();

    const subcategories = await convex.query(api.subcategoryFunctions.getSubcategoriesByExperience, { experienceId: experienceId as any });
    res.json({ success: true, data: subcategories, message: `Subcategories for experience ${experienceId} retrieved successfully` });
  } catch (error) {
    console.error("Error fetching subcategories by experience:", error);
    const response: SubcategoryResponse = {
      success: false,
      message: "Failed to fetch subcategories by experience",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};
