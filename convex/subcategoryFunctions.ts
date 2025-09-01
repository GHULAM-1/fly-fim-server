import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// -------- Queries --------
export const getAllSubcategories = query({
  args: {
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { limit = 50, offset = 0 } = args;
    return await ctx.db
      .query("subcategory")
      .order("desc")
      .paginate({ numItems: limit, cursor: offset > 0 ? offset.toString() : null });
  },
});

export const getSubcategoryById = query({
  args: { id: v.id("subcategory") },
  handler: async (ctx, args) => ctx.db.get(args.id),
});

export const getSubcategoriesByExperience = query({
  args: { experienceId: v.id("experience") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("subcategory")
      .withIndex("byExperience", (q) => q.eq("experienceId", args.experienceId))
      .collect();
  },
});

// -------- Mutations with uniqueness --------

// CREATE: (experienceId, subcategoryName) must be unique
export const createSubcategory = mutation({
  args: {
    experienceId: v.id("experience"),
    subcategoryName: v.string(),
  },
  handler: async (ctx, args) => {
    const dup = await ctx.db
      .query("subcategory")
      .withIndex("byExperienceAndSubcategoryName", (q) =>
        q.eq("experienceId", args.experienceId).eq("subcategoryName", args.subcategoryName)
      )
      .first();

    if (dup) {
      throw new Error(
        `Subcategory '${args.subcategoryName}' already exists for this experience`
      );
    }

    return await ctx.db.insert("subcategory", {
      experienceId: args.experienceId,
      subcategoryName: args.subcategoryName,
    });
  },
});

// UPDATE: keep uniqueness when renaming subcategory
export const updateSubcategory = mutation({
  args: {
    id: v.id("subcategory"),
    subcategoryName: v.string(),
  },
  handler: async (ctx, { id, subcategoryName }) => {
    const current = await ctx.db.get(id);
    if (!current) throw new Error("Subcategory not found");

    const clash = await ctx.db
      .query("subcategory")
      .withIndex("byExperienceAndSubcategoryName", (q) =>
        q.eq("experienceId", current.experienceId).eq("subcategoryName", subcategoryName)
      )
      .first();

    if (clash && clash._id !== id) {
      throw new Error(
        `Subcategory '${subcategoryName}' already exists for this experience`
      );
    }

    await ctx.db.patch(id, { subcategoryName });
  },
});

export const deleteSubcategory = mutation({
  args: { id: v.id("subcategory") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
