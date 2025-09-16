"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoriesByCategoryName = exports.getCategoryById = exports.getAllCategories = void 0;
const server_1 = require("./_generated/server");
const values_1 = require("convex/values");
// -------- Queries (no change) --------
exports.getAllCategories = (0, server_1.query)({
    args: {
        limit: values_1.v.optional(values_1.v.number()),
        offset: values_1.v.optional(values_1.v.number()),
    },
    handler: async (ctx, args) => {
        const { limit = 50, offset = 0 } = args;
        return await ctx.db
            .query("category")
            .order("desc")
            .paginate({ numItems: limit, cursor: offset > 0 ? offset.toString() : null });
    },
});
exports.getCategoryById = (0, server_1.query)({
    args: { id: values_1.v.id("category") },
    handler: async (ctx, args) => ctx.db.get(args.id),
});
exports.getCategoriesByCategoryName = (0, server_1.query)({
    args: { categoryName: values_1.v.string() },
    handler: async (ctx, args) => {
        // Get all categories and filter case-insensitively
        const allCategories = await ctx.db
            .query("category")
            .collect();
        // Filter categories with case-insensitive matching
        const categories = allCategories.filter(category => category.categoryName.toLowerCase() === args.categoryName.toLowerCase());
        return categories;
    },
});
// -------- Mutations --------
// CREATE: categoryName must be unique
exports.createCategory = (0, server_1.mutation)({
    args: {
        categoryName: values_1.v.string(),
    },
    handler: async (ctx, args) => {
        const dup = await ctx.db
            .query("category")
            .withIndex("byCategoryName", (q) => q.eq("categoryName", args.categoryName))
            .first();
        if (dup) {
            throw new Error(`Category '${args.categoryName}' already exists`);
        }
        return await ctx.db.insert("category", {
            categoryName: args.categoryName,
        });
    },
});
// UPDATE: keep uniqueness when changing categoryName
exports.updateCategory = (0, server_1.mutation)({
    args: {
        id: values_1.v.id("category"),
        categoryName: values_1.v.string(),
    },
    handler: async (ctx, { id, categoryName }) => {
        const current = await ctx.db.get(id);
        if (!current)
            throw new Error("Category not found");
        // check if another category with same categoryName exists
        const clash = await ctx.db
            .query("category")
            .withIndex("byCategoryName", (q) => q.eq("categoryName", categoryName))
            .first();
        if (clash && clash._id !== id) {
            throw new Error(`Category '${categoryName}' already exists`);
        }
        await ctx.db.patch(id, { categoryName });
    },
});
exports.deleteCategory = (0, server_1.mutation)({
    args: { id: values_1.v.id("category") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
//# sourceMappingURL=categoryFunctions.js.map