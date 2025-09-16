"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubcategory = exports.updateSubcategory = exports.createSubcategory = exports.getSubcategoryById = exports.getAllSubcategories = void 0;
const server_1 = require("./_generated/server");
const values_1 = require("convex/values");
// -------- Queries --------
exports.getAllSubcategories = (0, server_1.query)({
    args: {
        limit: values_1.v.optional(values_1.v.number()),
        offset: values_1.v.optional(values_1.v.number()),
    },
    handler: async (ctx, args) => {
        const { limit = 50, offset = 0 } = args;
        return await ctx.db
            .query("subcategory")
            .order("desc")
            .paginate({ numItems: limit, cursor: offset > 0 ? offset.toString() : null });
    },
});
exports.getSubcategoryById = (0, server_1.query)({
    args: { id: values_1.v.id("subcategory") },
    handler: async (ctx, args) => ctx.db.get(args.id),
});
// -------- Mutations with uniqueness --------
// CREATE: (subcategoryName) must be unique
exports.createSubcategory = (0, server_1.mutation)({
    args: {
        subcategoryName: values_1.v.string(),
    },
    handler: async (ctx, args) => {
        const dup = await ctx.db
            .query("subcategory")
            .withIndex("bySubcategoryName", (q) => q.eq("subcategoryName", args.subcategoryName))
            .first();
        if (dup) {
            throw new Error(`Subcategory '${args.subcategoryName}' already exists for this experience`);
        }
        return await ctx.db.insert("subcategory", {
            subcategoryName: args.subcategoryName,
        });
    },
});
// UPDATE: keep uniqueness when renaming subcategory
exports.updateSubcategory = (0, server_1.mutation)({
    args: {
        id: values_1.v.id("subcategory"),
        subcategoryName: values_1.v.string(),
    },
    handler: async (ctx, { id, subcategoryName }) => {
        const current = await ctx.db.get(id);
        if (!current)
            throw new Error("Subcategory not found");
        const clash = await ctx.db
            .query("subcategory")
            .withIndex("bySubcategoryName", (q) => q.eq("subcategoryName", subcategoryName))
            .first();
        if (clash && clash._id !== id) {
            throw new Error(`Subcategory '${subcategoryName}' already exists for this experience`);
        }
        await ctx.db.patch(id, { subcategoryName });
    },
});
exports.deleteSubcategory = (0, server_1.mutation)({
    args: { id: values_1.v.id("subcategory") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
//# sourceMappingURL=subcategoryFunctions.js.map