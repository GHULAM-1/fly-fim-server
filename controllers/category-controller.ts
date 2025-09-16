import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
import { api } from "../convex/_generated/api";
import {
  CategoryResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types/category.types";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const convex = convexService.getClient();
    
    const result = await convex.query(api.categoryFunctions.getAllCategories, {
      limit: 50,
      offset: 0,
    });
    
    // Extract only the categories array from the paginated result
    const categories = result.page;
    
    res.json({
      success: true,
      data: categories,
      message: "Categories retrieved successfully",
    });
  } catch (error) {

    const response: CategoryResponse = {
      success: false,
      message: "Failed to fetch categories",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convex = convexService.getClient();

    const category = await convex.query(api.categoryFunctions.getCategoryById, { id: id as any });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, data: category, message: 'Category retrieved successfully' });
  } catch (error) {

    const response: CategoryResponse = {
      success: false,
      message: "Failed to fetch category",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const getCategoriesByCategoryName = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.params;
    const convex = convexService.getClient();

    if (!categoryName) {
      const response: CategoryResponse = {
        success: false,
        message: "categoryName parameter is required",
      };
      return res.status(400).json(response);
    }

    const categories = await convex.query(api.categoryFunctions.getCategoriesByCategoryName, {
      categoryName: categoryName.trim()
    });

    const response: CategoryResponse = {
      success: true,
      data: categories,
      message: `Found ${categories.length} categories matching "${categoryName}"`,
    };

    res.json(response);
  } catch (error) {

    const response: CategoryResponse = {
      success: false,
      message: "Failed to fetch categories by name",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName }: CreateCategoryRequest = req.body;

    // Validation
    if (!categoryName) {
      const response: CategoryResponse = {
        success: false,
        message: " categoryName are required",
      };
      return res.status(400).json(response);
    }

    const convex = convexService.getClient();

    const categoryId = await convex.mutation(api.categoryFunctions.createCategory, { 
      categoryName
    });
    res.status(201).json({ 
      success: true, 
      message: 'Category created successfully', 
      data: { _id: categoryId, categoryName } 
    });
  } catch (error) {

    const response: CategoryResponse = {
      success: false,
      message: "Failed to create category",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates: UpdateCategoryRequest = req.body;

    if (!updates.categoryName) {
      const response: CategoryResponse = {
        success: false,
        message: "categoryName is required for update",
      };
      return res.status(400).json(response);
    }

    const convex = convexService.getClient();

    await convex.mutation(api.categoryFunctions.updateCategory, { 
      id: id as any, 
      categoryName: updates.categoryName! 
    });
    res.json({ success: true, message: 'Category updated successfully' });
  } catch (error) {

    const response: CategoryResponse = {
      success: false,
      message: "Failed to update category",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convex = convexService.getClient();

    await convex.mutation(api.categoryFunctions.deleteCategory, { id: id as any });
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {

    const response: CategoryResponse = {
      success: false,
      message: "Failed to delete category",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

