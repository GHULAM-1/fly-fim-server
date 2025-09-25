"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFaq = exports.getFaqsByExperience = exports.updateFaq = exports.createFaq = exports.getFaqById = exports.getAllFaqs = void 0;
const convex_service_1 = require("../services/convex-service");
// GET /api/faqs
const getAllFaqs = async (req, res) => {
    try {
        const { limit, offset } = req.query;
        const result = await convex_service_1.convexService.query("faqFunctions:getAllFaqs", {
            limit: limit ? Number(limit) : 50,
            offset: offset ? Number(offset) : 0,
        });
        const response = {
            success: true,
            data: result.page,
            message: "FAQs retrieved successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to retrieve FAQs",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getAllFaqs = getAllFaqs;
// GET /api/faqs/:id
const getFaqById = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await convex_service_1.convexService.query("faqFunctions:getFaqById", {
            id: id,
        });
        if (!faq) {
            const response = {
                success: false,
                message: "FAQ not found",
            };
            return res.status(404).json(response);
        }
        const response = {
            success: true,
            data: faq,
            message: "FAQ retrieved successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to retrieve FAQ",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getFaqById = getFaqById;
// POST /api/faqs
const createFaq = async (req, res) => {
    try {
        const body = req.body;
        const newId = await convex_service_1.convexService.mutation("faqFunctions:createFaq", body);
        const createdFaq = await convex_service_1.convexService.query("faqFunctions:getFaqById", { id: newId });
        const response = {
            success: true,
            data: createdFaq,
            message: "FAQ created successfully",
        };
        res.status(201).json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to create FAQ",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.createFaq = createFaq;
// PATCH /api/faqs/:id
const updateFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const patch = req.body;
        await convex_service_1.convexService.mutation("faqFunctions:updateFaq", {
            id: id,
            patch,
        });
        const response = {
            success: true,
            message: "FAQ updated successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to update FAQ",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.updateFaq = updateFaq;
// GET /api/faqs/experience/:experienceId
const getFaqsByExperience = async (req, res) => {
    try {
        const { experienceId } = req.params;
        const faqs = await convex_service_1.convexService.query("faqFunctions:getFaqsByExperience", {
            experienceId: experienceId,
        });
        const response = {
            success: true,
            data: faqs,
            message: "FAQs retrieved successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to retrieve FAQs",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getFaqsByExperience = getFaqsByExperience;
// DELETE /api/faqs/:id
const deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;
        await convex_service_1.convexService.mutation("faqFunctions:deleteFaq", { id: id });
        const response = {
            success: true,
            message: "FAQ deleted successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to delete FAQ",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.deleteFaq = deleteFaq;
//# sourceMappingURL=faq-controller.js.map