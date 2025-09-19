import { Request, Response } from "express";
import { convexService } from "../services/convex-service";

export const getThingsToDoPageData = async (req: Request, res: Response) => {
  try {
    const { cityId } = req.params;

    if (!cityId) {
      return res.status(400).json({
        success: false,
        message: "City ID is required",
      });
    }

    const pageData = await convexService.query("experienceFunctions:getThingsToDoPageData", {
      cityId: cityId as any,
    });

    res.json({
      success: true,
      data: pageData,
      message: "Things to do page data retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch things to do page data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};