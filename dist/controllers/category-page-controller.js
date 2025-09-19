"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryPageData = void 0;
const convex_service_1 = require("../services/convex-service");
const api_1 = require("../convex/_generated/api");
const getCategoryPageData = async (req, res) => {
    try {
        const { cityId, categoryId } = req.params;
        if (!cityId || !categoryId) {
            return res.status(400).json({
                success: false,
                message: "City ID and Category ID are required",
            });
        }
        const convex = convex_service_1.convexService.getClient();
        const pageData = await convex.query(api_1.api.experienceFunctions.getCategoryPageData, {
            cityId: cityId,
            categoryId: categoryId
        });
        // Collect all experiences from different arrays
        const allExperiences = [
            ...pageData.topExperiences,
            ...pageData.popularExperiences,
            ...(pageData.category?.subcategories?.flatMap(sub => sub.experiences) || [])
        ];
        // Extract unique categories and subcategories from all experiences
        const categoryMap = new Map();
        allExperiences.forEach(exp => {
            const categoryName = exp.relationships?.categoryName;
            const subcategoryName = exp.relationships?.subcategoryName;
            if (categoryName && subcategoryName) {
                if (!categoryMap.has(categoryName)) {
                    categoryMap.set(categoryName, new Set());
                }
                categoryMap.get(categoryName).add(subcategoryName);
            }
        });
        // Convert to desired structure
        const categories = Array.from(categoryMap.entries()).map(([categoryName, subcategorySet]) => ({
            categoryName,
            subcategories: Array.from(subcategorySet).map(subcategoryName => ({
                subcategoryName
            }))
        }));
        res.json({
            success: true,
            data: {
                ...pageData,
                categories
            },
            message: "Category page data retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch category page data",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getCategoryPageData = getCategoryPageData;
//# sourceMappingURL=category-page-controller.js.map