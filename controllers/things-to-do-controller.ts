import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
import { api } from "../convex/_generated/api";
import { ThingsToDoResponse, ThingsToDoErrorResponse } from "../types/things-to-do.types";

export const getThingsToDoPageData = async (req: Request, res: Response) => {
    try {
      const { cityId } = req.params;
  
      if (!cityId) {
        const errorResponse: ThingsToDoErrorResponse = {
          success: false,
          message: "cityId is required",
        };
        return res.status(400).json(errorResponse);
      }
  
      const convex = convexService.getClient();
      const pageData = await convex.query(
        api.experienceFunctions.getThingsToDoPageData,
        {
          cityId: cityId as any,
        }
      );
  
      const response: ThingsToDoResponse = {
        success: true,
        data: pageData,
        message: "Things to do page data retrieved successfully",
      };
      
      res.json(response);
    } catch (error) {

      const errorResponse: ThingsToDoErrorResponse = {
        success: false,
        message: "Failed to fetch things to do page data",
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(500).json(errorResponse);
    }
  };