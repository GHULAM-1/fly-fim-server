"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoriesByCategoryName = exports.getCategoryById = exports.getAllCategories = void 0;
const convex_service_1 = require("../services/convex-service");
const category_enum_1 = require("../types/enums/category.enum");
const text_transform_1 = require("../utils/text-transform");
const getAllCategories = async (req, res) => {
    try {
        const result = await convex_service_1.convexService.query("categoryFunctions:getAllCategories", {
            limit: 50,
            offset: 0,
        });
        // Extract only the categories array from the paginated result
        const categories = result.page;
        res.json({
            success: true,
            data: categories,
            message: "Categories retrieved successfully",
        });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to fetch categories",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await convex_service_1.convexService.query("categoryFunctions:getCategoryById", { id: id });
        if (!category)
            return res.status(404).json({ success: false, message: 'Category not found' });
        res.json({ success: true, data: category, message: 'Category retrieved successfully' });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to fetch category",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getCategoryById = getCategoryById;
const getCategoriesByCategoryName = async (req, res) => {
    try {
        const { categoryName } = req.params;
        if (!categoryName) {
            const response = {
                success: false,
                message: "categoryName parameter is required",
            };
            return res.status(400).json(response);
        }
        // Normalize the category name to proper case
        const normalizedCategoryName = (0, text_transform_1.normalizeCategoryName)(categoryName);
        // Validate enum value after normalization
        if (!(0, category_enum_1.isCategoryType)(normalizedCategoryName)) {
            const response = {
                success: false,
                message: "Invalid category type. Must be one of: Tickets, Tours, Transportation, Travel Services, Cruises, Food & Drink, Entertainment, Adventure, Water Sports, Wellness, Specials",
            };
            return res.status(400).json(response);
        }
        const categories = await convex_service_1.convexService.query("categoryFunctions:getCategoriesByCategoryName", {
            categoryName: normalizedCategoryName
        });
        const response = {
            success: true,
            data: categories,
            message: `Found ${categories.length} categories matching "${categoryName}"`,
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to fetch categories by name",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getCategoriesByCategoryName = getCategoriesByCategoryName;
const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        // Validation
        if (!categoryName) {
            const response = {
                success: false,
                message: "categoryName is required",
            };
            return res.status(400).json(response);
        }
        // Normalize the category name to proper case
        const normalizedCategoryName = (0, text_transform_1.normalizeCategoryName)(categoryName);
        // Validate enum value after normalization
        if (!(0, category_enum_1.isCategoryType)(normalizedCategoryName)) {
            const response = {
                success: false,
                message: "Invalid category type. Must be one of: Tickets, Tours, Transportation, Travel Services, Cruises, Food & Drink, Entertainment, Adventure, Water Sports, Wellness, Specials",
            };
            return res.status(400).json(response);
        }
        const categoryId = await convex_service_1.convexService.mutation("categoryFunctions:createCategory", {
            categoryName: normalizedCategoryName
        });
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: { _id: categoryId, categoryName: normalizedCategoryName }
        });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to create category",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!updates.categoryName) {
            const response = {
                success: false,
                message: "categoryName is required for update",
            };
            return res.status(400).json(response);
        }
        // Normalize the category name to proper case
        const normalizedCategoryName = (0, text_transform_1.normalizeCategoryName)(updates.categoryName);
        // Validate enum value after normalization
        if (!(0, category_enum_1.isCategoryType)(normalizedCategoryName)) {
            const response = {
                success: false,
                message: "Invalid category type. Must be one of: Tickets, Tours, Transportation, Travel Services, Cruises, Food & Drink, Entertainment, Adventure, Water Sports, Wellness, Specials",
            };
            return res.status(400).json(response);
        }
        await convex_service_1.convexService.mutation("categoryFunctions:updateCategory", {
            id: id,
            categoryName: normalizedCategoryName
        });
        res.json({ success: true, message: 'Category updated successfully' });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to update category",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await convex_service_1.convexService.mutation("categoryFunctions:deleteCategory", { id: id });
        res.json({ success: true, message: 'Category deleted successfully' });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to delete category",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category-controller.js.map