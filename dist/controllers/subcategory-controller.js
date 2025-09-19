"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubcategory = exports.updateSubcategory = exports.createSubcategory = exports.getSubcategoryById = exports.getAllSubcategories = void 0;
const convex_service_1 = require("../services/convex-service");
// GET /api/subcategories
const getAllSubcategories = async (req, res) => {
    try {
        const { limit, offset } = req.query;
        const result = await convex_service_1.convexService.query("subcategoryFunctions:getAllSubcategories", {
            limit: limit ? Number(limit) : 50,
            offset: offset ? Number(offset) : 0,
        });
        const response = {
            success: true,
            data: result.page,
            message: "Subcategories retrieved successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to retrieve subcategories",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getAllSubcategories = getAllSubcategories;
// GET /api/subcategories/:id
const getSubcategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const subcategory = await convex_service_1.convexService.query("subcategoryFunctions:getSubcategoryById", { id: id });
        if (!subcategory) {
            const response = {
                success: false,
                message: "Subcategory not found",
            };
            return res.status(404).json(response);
        }
        const response = {
            success: true,
            data: subcategory,
            message: "Subcategory retrieved successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to retrieve subcategory",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getSubcategoryById = getSubcategoryById;
// POST /api/subcategories
const createSubcategory = async (req, res) => {
    try {
        const body = req.body;
        const newId = await convex_service_1.convexService.mutation("subcategoryFunctions:createSubcategory", body);
        const createdSubcategory = await convex_service_1.convexService.query("subcategoryFunctions:getSubcategoryById", { id: newId });
        const response = {
            success: true,
            data: createdSubcategory,
            message: "Subcategory created successfully",
        };
        res.status(201).json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to create subcategory",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.createSubcategory = createSubcategory;
// PATCH /api/subcategories/:id
const updateSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const patch = req.body;
        await convex_service_1.convexService.mutation("subcategoryFunctions:updateSubcategory", {
            id: id,
            patch,
        });
        const response = {
            success: true,
            message: "Subcategory updated successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to update subcategory",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.updateSubcategory = updateSubcategory;
// DELETE /api/subcategories/:id
const deleteSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        await convex_service_1.convexService.mutation("subcategoryFunctions:deleteSubcategory", { id: id });
        const response = {
            success: true,
            message: "Subcategory deleted successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to delete subcategory",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.deleteSubcategory = deleteSubcategory;
//# sourceMappingURL=subcategory-controller.js.map