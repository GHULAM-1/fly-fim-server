"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubcategoryPageDataFiltered = exports.getSubcategoryPageData = void 0;
const convex_service_1 = require("../services/convex-service");
const getSubcategoryPageData = async (req, res) => {
    try {
        const { cityId, categoryId, subcategoryName } = req.params;
        if (!cityId || !categoryId || !subcategoryName) {
            return res.status(400).json({
                success: false,
                message: "City ID, Category ID, and Subcategory Name are required",
            });
        }
        const pageData = await convex_service_1.convexService.query("experienceFunctions:getSubcategoryPageData", {
            cityId: cityId,
            categoryId: categoryId,
            subcategoryName: subcategoryName
        });
        res.json({
            success: true,
            data: pageData,
            message: "Subcategory page data retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch subcategory page data",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getSubcategoryPageData = getSubcategoryPageData;
const getSubcategoryPageDataFiltered = async (req, res) => {
    try {
        const { cityId, categoryId, subcategoryName } = req.params;
        const { sortBy } = req.query;
        if (!cityId || !categoryId || !subcategoryName) {
            return res.status(400).json({
                success: false,
                message: "City ID, Category ID, and Subcategory Name are required",
            });
        }
        const pageData = await convex_service_1.convexService.query("experienceFunctions:getSubcategoryPageDataFiltered", {
            cityId: cityId,
            categoryId: categoryId,
            subcategoryName: subcategoryName,
            sortBy: sortBy
        });
        res.json({
            success: true,
            data: pageData,
            message: "Filtered subcategory page data retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch filtered subcategory page data",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getSubcategoryPageDataFiltered = getSubcategoryPageDataFiltered;
//# sourceMappingURL=subcategory-page-controller.js.map