import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
import { api } from "../convex/_generated/api";

export const getNotFoundPageData = async (req: Request, res: Response) => {
  try {
    const convex = convexService.getClient();

    // Get categories with their associated subcategories
    const categoriesWithSubcategories = await convex.query(api.notFoundFunctions.getCategoriesWithSubcategories, {});

    res.json({
      success: true,
      data: categoriesWithSubcategories as any,
      message: "Not found page data retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch not found page data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};