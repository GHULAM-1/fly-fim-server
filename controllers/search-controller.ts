import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
import { SearchResponse } from "../types/search.types";

export const generalSearch = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string || req.body.query as string || '';
    const limit = parseInt(req.query.limit as string) || parseInt(req.body.limit as string) || 5;

    console.log("General search query:", query, "limit:", limit);

    const searchData = await convexService.query("searchFunctions:generalSearch", {
      query: query || undefined,
      limit: limit,
    });

    const response: SearchResponse = {
      success: true,
      data: searchData,
      message: query ? `Search results for "${query}"` : "Random cities and experiences",
    };

    res.json(response);
  } catch (error) {
    const response: SearchResponse = {
      success: false,
      message: "Failed to perform search",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};