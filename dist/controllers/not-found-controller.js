"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotFoundPageData = void 0;
const convex_service_1 = require("../services/convex-service");
const api_1 = require("../convex/_generated/api");
const getNotFoundPageData = async (req, res) => {
    try {
        const convex = convex_service_1.convexService.getClient();
        // Get categories with their associated subcategories
        const categoriesWithSubcategories = await convex.query(api_1.api.notFoundFunctions.getCategoriesWithSubcategories, {});
        res.json({
            success: true,
            data: categoriesWithSubcategories,
            message: "Not found page data retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch not found page data",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getNotFoundPageData = getNotFoundPageData;
//# sourceMappingURL=not-found-controller.js.map