import { Request, Response } from "express";
import { convexService } from "../services/convex-service";
import {
  ExperienceResponse,
  CreateExperienceRequest,
  UpdateExperienceRequest,
  ExperienceListWithFacetsResponse,
} from "../types/experience.types";
import { parseExperienceData } from "../utils/parse-utils";

export const getAllExperiences = async (_req: Request, res: Response) => {
  try {
    const result = await convexService.query("experienceFunctions:getAllExperiences", {
      limit: 50,
      offset: 0,
    });
    res.json({
      success: true,
      data: result.page,
      message: "Experiences retrieved successfully",
    });
  } catch (error) {
    const response: ExperienceResponse = {
      success: false,
      message: "Failed to retrieve experiences",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const experience = await convexService.query("experienceFunctions:getExperienceById", {
      id: id as any
    });
    if (!experience)
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    res.json({
      success: true,
      data: experience,
      message: "Experience retrieved successfully",
    });
  } catch (error) {
    const response: ExperienceResponse = {
      success: false,
      message: "Failed to retrieve experience",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    const body: CreateExperienceRequest = req.body;

    console.log("=== CREATE EXPERIENCE DEBUG ===");
    console.log("Request body keys:", Object.keys(body));
    console.log("Request body:", JSON.stringify(body, null, 2));

    if (!body.title) {
      const response: ExperienceResponse = {
        success: false,
        message: "title is required",
      };
      return res.status(400).json(response);
    }

    // Parse numeric fields from form data (form-data always sends strings)
    const parsedBody = parseExperienceData(body);

    console.log("Parsed body keys:", Object.keys(parsedBody));
    console.log("Parsed body has endPointImage:", !!parsedBody.endPointImage);
    console.log("Parsed body has startPointImage:", !!parsedBody.startPointImage);
    console.log("Parsed body has itinerary:", !!parsedBody.itinerary);
    // Don't log full body as it's too large
    console.log("Parsed body fields count:", Object.keys(parsedBody).length);

    // Define expected fields based on the Convex schema
    const expectedFields = [
      'title', 'description', 'price', 'oldPrice', 'sale', 'images', 'mainImage',
      'tagOnCards', 'features', 'highlights', 'inclusions', 'exclusions',
      'cancellationPolicy', 'ticketValidity', 'exploreMore', 'youExperience', 'knowBeforeYouGo', 'myTickets',
      'operatingHours', 'whereTo', 'datePriceRange', 'packageType', 'adultPrice', 'childPrice',
      'infantPrice', 'totalLimit', 'isMainCard', 'isTopExperience', 'isMustDo', 'isPopular',
      'blogSlug', 'categoryId', 'subcategoryId', 'cityId', 'itinerary'
    ];

    // Check for unexpected fields (allow dynamic image fields)
    const bodyFields = Object.keys(parsedBody);
    const isDynamicImageField = (field: string): boolean => {
      return field.startsWith('nearbyImages_') ||
             field.startsWith('highlightImages_') ||
             field.startsWith('highlightsImages_') || // Handle both variants
             field.startsWith('thingsImages_') ||
             field === 'startPointImage' ||
             field === 'endPointImage';
    };

    const unexpectedFields = bodyFields.filter(field =>
      !expectedFields.includes(field) && !isDynamicImageField(field)
    );

    console.log("Body fields:", bodyFields);
    console.log("Dynamic image fields:", bodyFields.filter(isDynamicImageField));
    console.log("Unexpected fields:", unexpectedFields);

    if (unexpectedFields.length > 0) {
      console.log("Found unexpected fields, returning error");
      const response: ExperienceResponse = {
        success: false,
        message: `Unexpected field(s): ${unexpectedFields.join(', ')}`,
        error: `Expected fields: ${expectedFields.join(', ')} and dynamic image fields (nearbyImages_*, highlightImages_*, thingsImages_*)`,
      };
      return res.status(400).json(response);
    }

    console.log("Calling Convex mutation...");
    const newId = await convexService.mutation("experienceFunctions:createExperience", parsedBody as any);
    console.log("Mutation successful, ID:", newId);

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: { _id: newId, ...parsedBody },
    });
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : "Unknown error";

    console.log("=== CREATE EXPERIENCE ERROR ===");
    console.log("Error:", error);
    console.log("Error message:", errorMessage);

    // Check if it's a Convex validation error and enhance it
    if (errorMessage.includes("Unexpected field")) {
      console.log("Detected Convex validation error");
      const response: ExperienceResponse = {
        success: false,
        message: `Schema validation failed: ${errorMessage}`,
        error: errorMessage,
      };
      return res.status(400).json(response);
    }

    const response: ExperienceResponse = {
      success: false,
      message: "Failed to create experience",
      error: errorMessage,
    };
    res.status(500).json(response);
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patch: UpdateExperienceRequest = req.body;
    if (!patch || Object.keys(patch).length === 0) {
      const response: ExperienceResponse = {
        success: false,
        message: "No fields provided to update",
      };
      return res.status(400).json(response);
    }

    console.log("=== UPDATE EXPERIENCE DEBUG ===");
    console.log("Original patch:", JSON.stringify(patch, null, 2));

    // Parse the patch data using the same logic as create
    const parsedPatch = parseExperienceData(patch);

    console.log("Parsed patch:", JSON.stringify(parsedPatch, null, 2));

    await convexService.mutation("experienceFunctions:updateExperience", {
      id: id as any,
      patch: parsedPatch as any,
    });
    res.json({ success: true, message: "Experience updated successfully" });
  } catch (error) {
    console.log("=== UPDATE EXPERIENCE ERROR ===");
    console.log("Error:", error);
    console.log("Error message:", error instanceof Error ? error.message : "Unknown error");

    let errorMessage = "Failed to update experience";
    let statusCode = 500;

    if (error instanceof Error) {
      // Handle specific errors
      if (error.message.includes("not found")) {
        errorMessage = "Experience not found";
        statusCode = 404;
      } else if (error.message.includes("hierarchy flag")) {
        errorMessage = error.message;
        statusCode = 400; // Bad Request
      } else if (error.message.includes("Date validation failed")) {
        errorMessage = error.message;
        statusCode = 400;
      } else {
        // For debugging, temporarily show actual error
        errorMessage = `Failed to update experience: ${error.message}`;
      }
    }

    const response: ExperienceResponse = {
      success: false,
      message: errorMessage,
    };
    res.status(statusCode).json(response);
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await convexService.mutation("experienceFunctions:deleteExperience", {
      id: id as any,
    });
    res.json({ success: true, message: "Experience deleted successfully" });
  } catch (error) {
    const response: ExperienceResponse = {
      success: false,
      message: "Failed to delete experience",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
};