import { Request, Response } from "express";
import { convexService } from "../services/convex-service";


export const getCategoryPageData = async (req: Request, res: Response) => {
  try {
    const { cityId, categoryId } = req.params;

    if (!cityId || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "City ID and Category ID are required",
      });
    }

    console.log(cityId, categoryId);
    const pageData = await convexService.query(
      "experienceFunctions:getCategoryPageData",
      {
        cityId: cityId as any,
        categoryId: categoryId as any
      }
    );
    console.log(pageData);

    // Collect all experiences from different arrays
    const allExperiences = [
      ...pageData.topExperiences,
      ...pageData.popularExperiences,
      ...(pageData.category?.subcategories?.flatMap(sub => sub.experiences) || [])
    ];

    // Extract unique categories and subcategories from all experiences
    const categoryMap = new Map();

    allExperiences.forEach(exp => {
      const categoryName = exp.relationships?.categoryName;
      const subcategoryName = exp.relationships?.subcategoryName;

      if (categoryName && subcategoryName) {
        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, new Set());
        }
        categoryMap.get(categoryName).add(subcategoryName);
      }
    });

    // Convert to desired structure
    const categories = Array.from(categoryMap.entries()).map(([categoryName, subcategorySet]) => ({
      categoryName,
      subcategories: Array.from(subcategorySet).map(subcategoryName => ({
        subcategoryName
      }))
    }));

    res.json({
      success: true,
      data: {
        ...pageData,
        categories
      },
      message: "Category page data retrieved successfully",
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch category page data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

