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


// -------- Mutations with uniqueness --------

// CREATE: (subcategoryName) must be unique
export const createSubcategory = mutation({
  args: {
    subcategoryName: v.string(),
  },
  handler: async (ctx, args) => {
    // Check for duplicates using case-insensitive comparison
    const allSubcategories = await ctx.db.query("subcategory").collect();
    const normalizedForCheck = args.subcategoryName.trim().toLowerCase();

    const existing = allSubcategories.find(subcategory =>
      subcategory.subcategoryName.toLowerCase() === normalizedForCheck
    );

    if (existing) {
      throw new Error(
        `Subcategory '${args.subcategoryName}' already exists`
      );
    }

    return await ctx.db.insert("subcategory", {
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

    // Check for duplicates using case-insensitive comparison
    const allSubcategories = await ctx.db.query("subcategory").collect();
    const normalizedForCheck = subcategoryName.trim().toLowerCase();

    const existing = allSubcategories.find(subcategory =>
      subcategory.subcategoryName.toLowerCase() === normalizedForCheck && subcategory._id !== id
    );

    if (existing) {
      throw new Error(
        `Subcategory '${subcategoryName}' already exists`
      );
    }

    await ctx.db.patch(id, { subcategoryName });
  },
});

export const deleteSubcategory = mutation({
  args: { id: v.id("subcategory") },
  handler: async (ctx, args) => {
    // First, find and delete all experiences that belong to this subcategory
    const experiences = await ctx.db
      .query("experience")
      .withIndex("bySubcategory", (q) => q.eq("subcategoryId", args.id))
      .collect();

    // Delete all related experiences
    for (const experience of experiences) {
      await ctx.db.delete(experience._id);
    }

    // Then delete the subcategory itself
    await ctx.db.delete(args.id);
  },
});
