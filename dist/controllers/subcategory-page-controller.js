"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubcategoryPageData = void 0;
const convex_service_1 = require("../services/convex-service");
const api_1 = require("../convex/_generated/api");
const getSubcategoryPageData = async (req, res) => {
    try {
        const { cityId, categoryId, subcategoryName } = req.params;
        if (!cityId || !categoryId || !subcategoryName) {
            return res.status(400).json({
                success: false,
                message: "City ID, Category ID, and Subcategory Name are required",
            });
        }
        const convex = convex_service_1.convexService.getClient();
        const pageData = await convex.query(api_1.api.experienceFunctions.getSubcategoryPageData, {
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
//# sourceMappingURL=subcategory-page-controller.js.map