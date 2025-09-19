import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
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

    res.status(500).json({
      success: false,
      message: "Failed to fetch subcategory page data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getSubcategoryPageDataFiltered = async (req: Request, res: Response) => {
  try {
    const { cityId, categoryId, subcategoryName } = req.params;
    const { sortBy } = req.query;

    if (!cityId || !categoryId || !subcategoryName) {
      return res.status(400).json({
        success: false,
        message: "City ID, Category ID, and Subcategory Name are required",
      });
    }

    const convex = convexService.getClient();
    const pageData = await convex.query(
      api.experienceFunctions.getSubcategoryPageDataFiltered,
      {
        cityId: cityId as any,
        categoryId: categoryId as any,
        subcategoryName: subcategoryName,
        sortBy: sortBy as string
      }
    );

    res.json({
      success: true,
      data: pageData,
      message: "Filtered subcategory page data retrieved successfully",
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch filtered subcategory page data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
