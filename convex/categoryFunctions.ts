import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// -------- Queries (no change) --------
export const getAllCategories = query({
  args: {
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { limit = 50, offset = 0 } = args;
    return await ctx.db
      .query("category")
      .order("desc")
      .paginate({ numItems: limit, cursor: offset > 0 ? offset.toString() : null });
  },
});

export const getCategoryById = query({
  args: { id: v.id("category") },
  handler: async (ctx, args) => ctx.db.get(args.id),
});

// -------- Mutations --------

// CREATE: categoryName must be unique
export const createCategory = mutation({
  args: {
    categoryName: v.string(),
  },
  handler: async (ctx, args) => {
    const dup = await ctx.db
      .query("category")
      .withIndex("byCategoryName", (q) =>
        q.eq("categoryName", args.categoryName)
      )
      .first();

    if (dup) {
      throw new Error(
        `Category '${args.categoryName}' already exists`
      );
    }

    return await ctx.db.insert("category", {
      categoryName: args.categoryName,
    });
  },
});

// UPDATE: keep uniqueness when changing categoryName
export const updateCategory = mutation({
  args: {
    id: v.id("category"),
    categoryName: v.string(),
  },
  handler: async (ctx, { id, categoryName }) => {
    const current = await ctx.db.get(id);
    if (!current) throw new Error("Category not found");

    // check if another category with same categoryName exists
    const clash = await ctx.db
      .query("category")
      .withIndex("byCategoryName", (q) =>
        q.eq("categoryName", categoryName)
      )
      .first();

    if (clash && clash._id !== id) {
      throw new Error(
        `Category '${categoryName}' already exists`
      );
    }

    await ctx.db.patch(id, { categoryName });
  },
});

export const deleteCategory = mutation({
  args: { id: v.id("category") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
