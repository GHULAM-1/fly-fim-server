import { Request, Response } from "express";
import { convexService } from "../services/convex-service";

export const getCategoriesWithSubcategories = async (req: Request, res: Response) => {
  try {
    const result = await convexService.query("notFoundFunctions:getCategoriesWithSubcategories", {});

    res.json({
      success: true,
      data: result,
      message: "Categories with subcategories retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve categories with subcategories",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};