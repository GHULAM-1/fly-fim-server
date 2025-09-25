"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorldwideSubcategoryPageDataFiltered = exports.getWorldwideSubcategoryPageData = exports.getFilteredCategoryPageData = exports.getCategoryPageData = exports.getWorldwideData = void 0;
const convex_service_1 = require("../services/convex-service");
const getWorldwideData = async (req, res) => {
    try {
        const data = await convex_service_1.convexService.query("worldwideFunctions:getWorldwideData", {});
        const response = {
            success: true,
            data,
            message: "Worldwide data retrieved successfully",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to retrieve worldwide data",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getWorldwideData = getWorldwideData;
const getCategoryPageData = async (req, res) => {
    try {
        const { categoryId } = req.params;
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required",
            });
        }
        console.log(categoryId);
        const pageData = await convex_service_1.convexService.query("worldwideFunctions:getCategoryPageData", {
            categoryId: categoryId,
        });
        console.log(pageData);
        res.json({
            success: true,
            data: pageData,
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
const getFilteredCategoryPageData = async (req, res) => {
    try {
        const { categoryId } = req.params;
        let sortBy = req.body.sortBy || req.query.sortBy;
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required",
            });
        }
        // Map alternative sort parameter names to our expected values
        if (sortBy) {
            const sortMapping = {
                "price_low_high": "lowToHigh",
                "price_high_low": "highToLow",
                "most_popular": "mostPopular",
                "picked_for_you": "pickedForYou",
                "lowToHigh": "lowToHigh",
                "highToLow": "highToLow",
                "mostPopular": "mostPopular",
                "pickedForYou": "pickedForYou"
            };
            sortBy = sortMapping[sortBy] || sortBy;
        }
        console.log("Sorting category:", categoryId, "with sortBy:", sortBy);
        const pageData = await convex_service_1.convexService.query("worldwideFunctions:getFilteredCategoryPageData", {
            categoryId: categoryId,
            sortBy: sortBy || undefined,
        });
        res.json({
            success: true,
            data: pageData,
            message: "Sorted category page data retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch sorted category page data",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getFilteredCategoryPageData = getFilteredCategoryPageData;
const getWorldwideSubcategoryPageData = async (req, res) => {
    try {
        const { categoryId, subcategoryName } = req.params;
        if (!categoryId || !subcategoryName) {
            return res.status(400).json({
                success: false,
                message: "Category ID and Subcategory Name are required",
            });
        }
        console.log("Getting worldwide subcategory data for:", categoryId, subcategoryName);
        const pageData = await convex_service_1.convexService.query("worldwideFunctions:getWorldwideSubcategoryPageData", {
            categoryId: categoryId,
            subcategoryName: subcategoryName,
        });
        res.json({
            success: true,
            data: pageData,
            message: "Worldwide subcategory page data retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch worldwide subcategory page data",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getWorldwideSubcategoryPageData = getWorldwideSubcategoryPageData;
const getWorldwideSubcategoryPageDataFiltered = async (req, res) => {
    try {
        const { categoryId, subcategoryName } = req.params;
        let sortBy = req.body.sortBy || req.query.sortBy;
        if (!categoryId || !subcategoryName) {
            return res.status(400).json({
                success: false,
                message: "Category ID and Subcategory Name are required",
            });
        }
        // Map alternative sort parameter names to our expected values
        if (sortBy) {
            const sortMapping = {
                "price_low_high": "lowToHigh",
                "price_high_low": "highToLow",
                "most_popular": "popular",
                "picked_for_you": "popular",
                "popular": "popular",
                "lowToHigh": "lowToHigh",
                "highToLow": "highToLow"
            };
            sortBy = sortMapping[sortBy] || sortBy;
        }
        console.log("Getting filtered worldwide subcategory data for:", categoryId, subcategoryName, "with sortBy:", sortBy);
        const pageData = await convex_service_1.convexService.query("worldwideFunctions:getWorldwideSubcategoryPageDataFiltered", {
            categoryId: categoryId,
            subcategoryName: subcategoryName,
            sortBy: sortBy || undefined,
        });
        res.json({
            success: true,
            data: pageData,
            message: "Filtered worldwide subcategory page data retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch filtered worldwide subcategory page data",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getWorldwideSubcategoryPageDataFiltered = getWorldwideSubcategoryPageDataFiltered;
//# sourceMappingURL=worldwide-controller.js.map