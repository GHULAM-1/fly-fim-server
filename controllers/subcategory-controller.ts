import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
import { api } from "../convex/_generated/api";
import {
  SubcategoryResponse,
  CreateSubcategoryRequest,
  UpdateSubcategoryRequest,
} from "../types/subcategory.types";
import { normalizeSubcategoryName } from "../utils/text-transform";

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
    const { subcategoryName }: CreateSubcategoryRequest = req.body;

    // Validation
    if (!subcategoryName) {
      const response: SubcategoryResponse = {
        success: false,
        message: "subcategoryName is required",
      };
      return res.status(400).json(response);
    }

    // Normalize and validate subcategory name
    const normalizedSubcategoryName = normalizeSubcategoryName(subcategoryName);

    const convex = convexService.getClient();

    const subcategoryId = await convex.mutation(api.subcategoryFunctions.createSubcategory, {
      subcategoryName: normalizedSubcategoryName
    });
    res.status(201).json({
      success: true,
      message: 'Subcategory created successfully',
      data: { _id: subcategoryId, subcategoryName: normalizedSubcategoryName }
    });
  } catch (error) {

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

    // Normalize and validate subcategory name
    const normalizedSubcategoryName = normalizeSubcategoryName(updates.subcategoryName);

    const convex = convexService.getClient();

    await convex.mutation(api.subcategoryFunctions.updateSubcategory, {
      id: id as any,
      subcategoryName: normalizedSubcategoryName
    });
    res.json({ success: true, message: 'Subcategory updated successfully' });
  } catch (error) {

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

    const response: SubcategoryResponse = {
      success: false,
      message: "Failed to delete subcategory",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

