"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFaq = exports.updateFaq = exports.createFaq = exports.getFaqsByExperience = exports.getFaqById = exports.getAllFaqs = void 0;
const convex_service_1 = require("../services/convex-service");
const api_1 = require("../convex/_generated/api");
// GET /api/faqs
const getAllFaqs = async (req, res) => {
    try {
        const { limit, offset } = req.query;
        const convex = convex_service_1.convexService.getClient();
        const result = await convex.query(api_1.api.faqFunctions.getAllFaqs, {
            limit: limit ? Number(limit) : 50,
            offset: offset ? Number(offset) : 0,
        });
        res.json({
            success: true,
            data: result.page,
            pagination: {
                limit: Number(limit ?? 50),
                offset: Number(offset ?? 0),
                hasMore: !result.isDone,
                nextOffset: Number(result.continueCursor ?? 0),
            },
            message: "FAQs retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch FAQs",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getAllFaqs = getAllFaqs;
// GET /api/faqs/:id
const getFaqById = async (req, res) => {
    try {
        const convex = convex_service_1.convexService.getClient();
        const faq = await convex.query(api_1.api.faqFunctions.getFaqById, { id: req.params.id });
        if (!faq)
            return res.status(404).json({ success: false, message: "FAQ not found" });
        res.json({ success: true, data: faq, message: "FAQ retrieved successfully" });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch FAQ",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getFaqById = getFaqById;
// GET /api/faqs/experience/:experienceId
const getFaqsByExperience = async (req, res) => {
    try {
        const convex = convex_service_1.convexService.getClient();
        const faqs = await convex.query(api_1.api.faqFunctions.getFaqsByExperience, {
            experienceId: req.params.experienceId,
        });
        res.json({ success: true, data: faqs, message: "FAQs by experience retrieved successfully" });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch FAQs by experience",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getFaqsByExperience = getFaqsByExperience;
// POST /api/faqs
const createFaq = async (req, res) => {
    try {
        const body = req.body;
        if (!body?.experienceId || !body?.question || !body?.answer) {
            return res.status(400).json({
                success: false,
                message: "experienceId, question and answer are required",
            });
        }
        const convex = convex_service_1.convexService.getClient();
        const id = await convex.mutation(api_1.api.faqFunctions.createFaq, body);
        res.status(201).json({
            success: true,
            data: { _id: id, ...body },
            message: "FAQ created successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create FAQ",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.createFaq = createFaq;
// PUT /api/faqs/:id
const updateFaq = async (req, res) => {
    try {
        const patch = req.body;
        if (!patch || (patch.question === undefined && patch.answer === undefined)) {
            return res.status(400).json({ success: false, message: "No fields provided to update" });
        }
        const convex = convex_service_1.convexService.getClient();
        await convex.mutation(api_1.api.faqFunctions.updateFaq, {
            id: req.params.id,
            question: patch.question,
            answer: patch.answer,
        });
        res.json({ success: true, message: "FAQ updated successfully" });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update FAQ",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.updateFaq = updateFaq;
// DELETE /api/faqs/:id
const deleteFaq = async (req, res) => {
    try {
        const convex = convex_service_1.convexService.getClient();
        await convex.mutation(api_1.api.faqFunctions.deleteFaq, { id: req.params.id });
        res.json({ success: true, message: "FAQ deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete FAQ",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.deleteFaq = deleteFaq;
//# sourceMappingURL=faq-controller.js.map