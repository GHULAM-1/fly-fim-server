"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesWithSubcategories = void 0;
const server_1 = require("./_generated/server");
exports.getCategoriesWithSubcategories = (0, server_1.query)({
    args: {},
    handler: async (ctx) => {
        // Get all categories
        const categories = await ctx.db.query("category").collect();
        // Get all experiences to find which subcategories are used with each category
        const experiences = await ctx.db.query("experience").collect();
        // Group experiences by category and collect unique subcategories for each
        const categorySubcategoryMap = new Map();
        for (const exp of experiences) {
            const categoryId = exp.categoryId;
            const subcategoryId = exp.subcategoryId;
            if (!categorySubcategoryMap.has(categoryId)) {
                categorySubcategoryMap.set(categoryId, new Set());
            }
            categorySubcategoryMap.get(categoryId).add(subcategoryId);
        }
        // Get all subcategories
        const allSubcategories = await ctx.db.query("subcategory").collect();
        const subcategoryMap = new Map(allSubcategories.map(sub => [sub._id, sub]));
        // Build the final result
        const result = [];
        for (const category of categories) {
            const subcategoryIds = categorySubcategoryMap.get(category._id) || new Set();
            const subcategories = Array.from(subcategoryIds)
                .map(id => subcategoryMap.get(id))
                .filter(Boolean); // Remove any undefined entries
            result.push({
                _id: category._id,
                _creationTime: category._creationTime,
                categoryName: category.categoryName,
                subcategories: subcategories
            });
        }
        return result;
    },
});
//# sourceMappingURL=notFoundFunctions.js.map