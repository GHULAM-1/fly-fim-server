"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubcategory = exports.updateSubcategory = exports.createSubcategory = exports.getSubcategoryById = exports.getAllSubcategories = void 0;
const convex_service_1 = require("../services/convex-service");
const api_1 = require("../convex/_generated/api");
const getAllSubcategories = async (req, res) => {
    try {
        const convex = convex_service_1.convexService.getClient();
        const result = await convex.query(api_1.api.subcategoryFunctions.getAllSubcategories, {
            limit: 50,
            offset: 0,
        });
        // Extract only the subcategories array from the paginated result
        const subcategories = result.page;
        res.json({
            success: true,
            data: subcategories,
            message: "Subcategories retrieved successfully",
        });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to fetch subcategories",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getAllSubcategories = getAllSubcategories;
const getSubcategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const convex = convex_service_1.convexService.getClient();
        const subcategory = await convex.query(api_1.api.subcategoryFunctions.getSubcategoryById, { id: id });
        if (!subcategory)
            return res.status(404).json({ success: false, message: 'Subcategory not found' });
        res.json({ success: true, data: subcategory, message: 'Subcategory retrieved successfully' });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to fetch subcategory",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getSubcategoryById = getSubcategoryById;
const createSubcategory = async (req, res) => {
    try {
        const { subcategoryName } = req.body;
        // Validation
        if (!subcategoryName) {
            const response = {
                success: false,
                message: "subcategoryName are required",
            };
            return res.status(400).json(response);
        }
        const convex = convex_service_1.convexService.getClient();
        const subcategoryId = await convex.mutation(api_1.api.subcategoryFunctions.createSubcategory, {
            subcategoryName
        });
        res.status(201).json({
            success: true,
            message: 'Subcategory created successfully',
            data: { _id: subcategoryId, subcategoryName }
        });
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
const updateSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!updates.subcategoryName) {
            const response = {
                success: false,
                message: "subcategoryName is required for update",
            };
            return res.status(400).json(response);
        }
        const convex = convex_service_1.convexService.getClient();
        await convex.mutation(api_1.api.subcategoryFunctions.updateSubcategory, {
            id: id,
            subcategoryName: updates.subcategoryName
        });
        res.json({ success: true, message: 'Subcategory updated successfully' });
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
const deleteSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const convex = convex_service_1.convexService.getClient();
        await convex.mutation(api_1.api.subcategoryFunctions.deleteSubcategory, { id: id });
        res.json({ success: true, message: 'Subcategory deleted successfully' });
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