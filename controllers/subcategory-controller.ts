import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
import {
  SubcategoryResponse,
  CreateSubcategoryRequest,
  UpdateSubcategoryRequest,
} from "../types/subcategory.types";
import { normalizeSubcategoryName } from "../utils/text-transform";

// GET /api/subcategories
export const getAllSubcategories = async (req: Request, res: Response) => {
  try {
    const { limit, offset } = req.query;

    const result = await convexService.query("subcategoryFunctions:getAllSubcategories", {
      limit: limit ? Number(limit) : 50,
      offset: offset ? Number(offset) : 0,
    });

    const response: SubcategoryResponse = {
      success: true,
      data: result.page,
      message: "Subcategories retrieved successfully",
    };
    res.json(response);
  } catch (error) {
    const response: SubcategoryResponse = {
      success: false,
      message: "Failed to retrieve subcategories",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

// GET /api/subcategories/:id
export const getSubcategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const subcategory = await convexService.query("subcategoryFunctions:getSubcategoryById", { id: id as any });

    if (!subcategory) {
      const response: SubcategoryResponse = {
        success: false,
        message: "Subcategory not found",
      };
      return res.status(404).json(response);
    }

    const response: SubcategoryResponse = {
      success: true,
      data: subcategory,
      message: "Subcategory retrieved successfully",
    };
    res.json(response);
  } catch (error) {
    const response: SubcategoryResponse = {
      success: false,
      message: "Failed to retrieve subcategory",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

// POST /api/subcategories
export const createSubcategory = async (req: Request, res: Response) => {
  try {
    const body: CreateSubcategoryRequest = req.body;

    // Normalize subcategory name
    const normalizedData = {
      ...body,
      subcategoryName: normalizeSubcategoryName(body.subcategoryName)
    };

    const newId = await convexService.mutation("subcategoryFunctions:createSubcategory", normalizedData);

    const createdSubcategory = await convexService.query("subcategoryFunctions:getSubcategoryById", { id: newId });

    const response: SubcategoryResponse = {
      success: true,
      data: createdSubcategory,
      message: "Subcategory created successfully",
    };
    res.status(201).json(response);
  } catch (error) {
    const response: SubcategoryResponse = {
      success: false,
      message: "Failed to create subcategory",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

// PATCH /api/subcategories/:id
export const updateSubcategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patch: UpdateSubcategoryRequest = req.body;

    // Normalize subcategory name if provided
    const normalizedPatch = { ...patch };
    if (patch.subcategoryName) {
      normalizedPatch.subcategoryName = normalizeSubcategoryName(patch.subcategoryName);
    }

    await convexService.mutation("subcategoryFunctions:updateSubcategory", {
      id: id as any,
      subcategoryName: normalizedPatch.subcategoryName,
    });

    const response: SubcategoryResponse = {
      success: true,
      message: "Subcategory updated successfully",
    };
    res.json(response);
  } catch (error) {
    let errorMessage = "Failed to update subcategory";
    let statusCode = 500;

    if (error instanceof Error) {
      // Handle duplicate subcategory error
      if (error.message.includes("already exists")) {
        errorMessage = error.message;
        statusCode = 409; // Conflict
      } else if (error.message.includes("not found")) {
        errorMessage = "Subcategory not found";
        statusCode = 404;
      } else {
        // For other errors, use a generic message
        errorMessage = "Failed to update subcategory";
      }
    }

    const response: SubcategoryResponse = {
      success: false,
      message: errorMessage,
    };
    res.status(statusCode).json(response);
  }
};

// DELETE /api/subcategories/:id
export const deleteSubcategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await convexService.mutation("subcategoryFunctions:deleteSubcategory", { id: id as any });

    const response: SubcategoryResponse = {
      success: true,
      message: "Subcategory deleted successfully",
    };
    res.json(response);
  } catch (error) {
    const response: SubcategoryResponse = {
      success: false,
      message: "Failed to delete subcategory",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};