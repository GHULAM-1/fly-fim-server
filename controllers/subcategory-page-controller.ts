import { Request, Response } from "express";
import { convexService } from "../services/convexService";
import { api } from "../convex/_generated/api";

export const getSubcategoryPageData = async (req: Request, res: Response) => {
  try {
    const { cityId, categoryId, subcategoryName } = req.params;
    
    if (!cityId || !categoryId || !subcategoryName) {
      return res.status(400).json({
        success: false,
        message: "City ID, Category ID, and Subcategory Name are required",
      });
    }

    const convex = convexService.getClient();
    const pageData = await convex.query(
      api.experienceFunctions.getSubcategoryPageData,
      { 
        cityId: cityId as any,
        categoryId: categoryId as any,
        subcategoryName: subcategoryName
      }
    );

    res.json({
      success: true,
      data: pageData,
      message: "Subcategory page data retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching subcategory page data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subcategory page data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
