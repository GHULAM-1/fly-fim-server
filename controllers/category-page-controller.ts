import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
import { api } from "../convex/_generated/api";

export const getCategoryPageData = async (req: Request, res: Response) => {
  try {
    const { cityId, categoryId } = req.params;
    
    if (!cityId || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "City ID and Category ID are required",
      });
    }

    const convex = convexService.getClient();
    const pageData = await convex.query(
      api.experienceFunctions.getCategoryPageData,
      { 
        cityId: cityId as any,
        categoryId: categoryId as any
      }
    );

    res.json({
      success: true,
      data: pageData,
      message: "Category page data retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching category page data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch category page data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getCategoryPageDataFiltered = async (req: Request, res: Response) => {
  try {
    const { cityId, categoryId } = req.params;
    const { sortBy, subcategoryNames } = req.query;
    
    if (!cityId || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "City ID and Category ID are required",
      });
    }

    // Parse subcategoryNames if provided
    let parsedSubcategoryNames;
    if (subcategoryNames) {
      try {
        parsedSubcategoryNames = typeof subcategoryNames === 'string' 
          ? JSON.parse(subcategoryNames) 
          : subcategoryNames;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid subcategoryNames format. Expected JSON array.",
        });
      }
    }

    const convex = convexService.getClient();
    const pageData = await convex.query(
      api.experienceFunctions.getCategoryPageDataFiltered,
      { 
        cityId: cityId as any,
        categoryId: categoryId as any,
        sortBy: sortBy as string,
        subcategoryNames: parsedSubcategoryNames
      }
    );

    res.json({
      success: true,
      data: pageData,
      message: "Filtered category page data retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching filtered category page data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch filtered category page data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
