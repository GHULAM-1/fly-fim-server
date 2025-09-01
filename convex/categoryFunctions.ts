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

export const getCategoriesByExperience = query({
  args: { experienceId: v.id("experience") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("category")
      .withIndex("byExperience", (q) => q.eq("experienceId", args.experienceId))
      .collect();
  },
});

// -------- Mutations with uniqueness --------

// CREATE: (experienceId, categoryName) must be unique
export const createCategory = mutation({
  args: {
    experienceId: v.id("experience"),
    categoryName: v.string(),
  },
  handler: async (ctx, args) => {
    const dup = await ctx.db
      .query("category")
      .withIndex("byExperienceAndCategoryName", (q) =>
        q.eq("experienceId", args.experienceId).eq("categoryName", args.categoryName)
      )
      .first();

    if (dup) {
      throw new Error(
        `Category '${args.categoryName}' already exists for this experience`
      );
    }

    return await ctx.db.insert("category", {
      experienceId: args.experienceId,
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

    // check if another category with same (experienceId, categoryName) exists
    const clash = await ctx.db
      .query("category")
      .withIndex("byExperienceAndCategoryName", (q) =>
        q.eq("experienceId", current.experienceId).eq("categoryName", categoryName)
      )
      .first();

    if (clash && clash._id !== id) {
      throw new Error(
        `Category '${categoryName}' already exists for this experience`
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
