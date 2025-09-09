import { Request, Response } from "express";
import { convexService } from "../services/convexService";
import { api } from "../convex/_generated/api";

export const getThingsToDoPageData = async (req: Request, res: Response) => {
    try {
      const { cityId } = req.params;
  
      if (!cityId) {
        return res.status(400).json({
          success: false,
          message: "cityId is required",
        });
      }
  
      const convex = convexService.getClient();
      const pageData = await convex.query(
        api.experienceFunctions.getThingsToDoPageData,
        {
          cityId: cityId as any,
        }
      );
  
      res.json({
        success: true,
        data: pageData,
        message: "Things to do page data retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching things to do page data:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch things to do page data",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };