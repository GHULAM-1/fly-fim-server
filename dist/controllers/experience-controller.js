"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.getExperienceById = exports.getAllExperiences = void 0;
const convex_service_1 = require("../services/convex-service");
const parse_utils_1 = require("../utils/parse-utils");
const getAllExperiences = async (_req, res) => {
    try {
        const result = await convex_service_1.convexService.query("experienceFunctions:getAllExperiences", {
            limit: 50,
            offset: 0,
        });
        res.json({
            success: true,
            data: result.page,
            message: "Experiences retrieved successfully",
        });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to retrieve experiences",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getAllExperiences = getAllExperiences;
const getExperienceById = async (req, res) => {
    try {
        const { id } = req.params;
        const experience = await convex_service_1.convexService.query("experienceFunctions:getExperienceById", {
            id: id
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
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to retrieve experience",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getExperienceById = getExperienceById;
const createExperience = async (req, res) => {
    try {
        const body = req.body;
        console.log("=== CREATE EXPERIENCE DEBUG ===");
        console.log("Request body keys:", Object.keys(body));
        console.log("Request body:", JSON.stringify(body, null, 2));
        if (!body.title) {
            const response = {
                success: false,
                message: "title is required",
            };
            return res.status(400).json(response);
        }
        // Parse numeric fields from form data (form-data always sends strings)
        const parsedBody = (0, parse_utils_1.parseExperienceData)(body);
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
        const isDynamicImageField = (field) => {
            return field.startsWith('nearbyImages_') ||
                field.startsWith('highlightImages_') ||
                field.startsWith('highlightsImages_') || // Handle both variants
                field.startsWith('thingsImages_') ||
                field === 'startPointImage' ||
                field === 'endPointImage';
        };
        const unexpectedFields = bodyFields.filter(field => !expectedFields.includes(field) && !isDynamicImageField(field));
        console.log("Body fields:", bodyFields);
        console.log("Dynamic image fields:", bodyFields.filter(isDynamicImageField));
        console.log("Unexpected fields:", unexpectedFields);
        if (unexpectedFields.length > 0) {
            console.log("Found unexpected fields, returning error");
            const response = {
                success: false,
                message: `Unexpected field(s): ${unexpectedFields.join(', ')}`,
                error: `Expected fields: ${expectedFields.join(', ')} and dynamic image fields (nearbyImages_*, highlightImages_*, thingsImages_*)`,
            };
            return res.status(400).json(response);
        }
        console.log("Calling Convex mutation...");
        const newId = await convex_service_1.convexService.mutation("experienceFunctions:createExperience", parsedBody);
        console.log("Mutation successful, ID:", newId);
        res.status(201).json({
            success: true,
            message: "Experience created successfully",
            data: { _id: newId, ...parsedBody },
        });
    }
    catch (error) {
        let errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.log("=== CREATE EXPERIENCE ERROR ===");
        console.log("Error:", error);
        console.log("Error message:", errorMessage);
        // Check if it's a Convex validation error and enhance it
        if (errorMessage.includes("Unexpected field")) {
            console.log("Detected Convex validation error");
            const response = {
                success: false,
                message: `Schema validation failed: ${errorMessage}`,
                error: errorMessage,
            };
            return res.status(400).json(response);
        }
        const response = {
            success: false,
            message: "Failed to create experience",
            error: errorMessage,
        };
        res.status(500).json(response);
    }
};
exports.createExperience = createExperience;
const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const patch = req.body;
        if (!patch || Object.keys(patch).length === 0) {
            const response = {
                success: false,
                message: "No fields provided to update",
            };
            return res.status(400).json(response);
        }
        console.log("=== UPDATE EXPERIENCE DEBUG ===");
        console.log("Original patch:", JSON.stringify(patch, null, 2));
        // Parse the patch data using the same logic as create
        const parsedPatch = (0, parse_utils_1.parseExperienceData)(patch);
        console.log("Parsed patch:", JSON.stringify(parsedPatch, null, 2));
        await convex_service_1.convexService.mutation("experienceFunctions:updateExperience", {
            id: id,
            patch: parsedPatch,
        });
        res.json({ success: true, message: "Experience updated successfully" });
    }
    catch (error) {
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
            }
            else if (error.message.includes("hierarchy flag")) {
                errorMessage = error.message;
                statusCode = 400; // Bad Request
            }
            else if (error.message.includes("Date validation failed")) {
                errorMessage = error.message;
                statusCode = 400;
            }
            else {
                // For debugging, temporarily show actual error
                errorMessage = `Failed to update experience: ${error.message}`;
            }
        }
        const response = {
            success: false,
            message: errorMessage,
        };
        res.status(statusCode).json(response);
    }
};
exports.updateExperience = updateExperience;
const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        await convex_service_1.convexService.mutation("experienceFunctions:deleteExperience", {
            id: id,
        });
        res.json({ success: true, message: "Experience deleted successfully" });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to delete experience",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.deleteExperience = deleteExperience;
//# sourceMappingURL=experience-controller.js.map