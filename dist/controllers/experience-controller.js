"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.getExperienceById = exports.getAllExperiences = void 0;
const convex_service_1 = require("../services/convex-service");
const api_1 = require("../convex/_generated/api");
const parse_utils_1 = require("../utils/parse-utils");
const getAllExperiences = async (_req, res) => {
    try {
        const convex = convex_service_1.convexService.getClient();
        const result = await convex.query(api_1.api.experienceFunctions.getAllExperiences, {
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
            message: "Failed to fetch experiences",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getAllExperiences = getAllExperiences;
const getExperienceById = async (req, res) => {
    try {
        const { id } = req.params;
        const convex = convex_service_1.convexService.getClient();
        const experience = await convex.query(api_1.api.experienceFunctions.getExperienceById, { id: id });
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
            message: "Failed to fetch experience",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getExperienceById = getExperienceById;
const createExperience = async (req, res) => {
    try {
        const body = req.body;
        if (!body?.title) {
            const response = {
                success: false,
                message: "title is required",
            };
            return res.status(400).json(response);
        }
        // Parse numeric fields from form data (form-data always sends strings)
        const parsedBody = (0, parse_utils_1.parseExperienceData)(body);
        const convex = convex_service_1.convexService.getClient();
        const newId = await convex.mutation(api_1.api.experienceFunctions.createExperience, parsedBody);
        res.status(201).json({
            success: true,
            message: "Experience created successfully",
            data: { _id: newId, ...parsedBody },
        });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to create experience",
            error: error instanceof Error ? error.message : "Unknown error",
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
        const convex = convex_service_1.convexService.getClient();
        await convex.mutation(api_1.api.experienceFunctions.updateExperience, {
            id: id,
            patch: patch,
        });
        res.json({ success: true, message: "Experience updated successfully" });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to update experience",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.updateExperience = updateExperience;
const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const convex = convex_service_1.convexService.getClient();
        await convex.mutation(api_1.api.experienceFunctions.deleteExperience, {
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