"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesWithSubcategories = void 0;
const convex_service_1 = require("../services/convex-service");
const getCategoriesWithSubcategories = async (req, res) => {
    try {
        const result = await convex_service_1.convexService.query("notFoundFunctions:getCategoriesWithSubcategories", {});
        res.json({
            success: true,
            data: result,
            message: "Categories with subcategories retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve categories with subcategories",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getCategoriesWithSubcategories = getCategoriesWithSubcategories;
//# sourceMappingURL=not-found-controller.js.map