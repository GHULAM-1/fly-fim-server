import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ---------------- Query Functions ----------------
export const getAllCities = query({
  args: { 
    limit: v.optional(v.number()),
    offset: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const { limit = 50, offset = 0 } = args;
    
    return await ctx.db
      .query("city")
      .order("desc")
      .paginate({ numItems: limit, cursor: offset > 0 ? offset.toString() : null });
  },
});

export const getCityById = query({
  args: { id: v.id("city") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getCitiesByExperience = query({
  args: { experienceId: v.id("experience") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("city")
      .withIndex("byExperience", (q) => q.eq("experienceId", args.experienceId))
      .collect();
  },
});

export const getCitiesByCityName = query({
  args: { cityName: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("city")
      .withIndex("byCityName", (q) => q.eq("cityName", args.cityName))
      .collect();
  },
});

export const getCitiesByCountryName = query({
  args: { countryName: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("city")
      .withIndex("byCountryName", (q) => q.eq("countryName", args.countryName))
      .collect();
  },
});

// ---------------- Mutation Functions ----------------
export const createCity = mutation({
  args: {
    experienceId: v.id("experience"),
    cityName: v.string(),
    countryName: v.string(),
  },
  handler: async (ctx, args) => {
    // Normalize to make uniqueness case-insensitive (optional)
    const normalized = args.cityName.trim().toLowerCase();

    const existing = await ctx.db
      .query("city")
      .withIndex("byCityName", (q) => q.eq("cityName", normalized))
      .first();

    if (existing) {
      throw new Error(`City '${args.cityName}' already exists`);
    }

    return await ctx.db.insert("city", {
      experienceId: args.experienceId,
      cityName: normalized,
      countryName: args.countryName,
    });
  },
});

export const updateCity = mutation({
  args: {
    id: v.id("city"),
    cityName: v.optional(v.string()),
    countryName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, cityName, countryName } = args;

    const updateData: any = {};

    if (cityName !== undefined) {
      const normalized = cityName.trim().toLowerCase();

      // Check uniqueness (ignore the current document)
      const clash = await ctx.db
        .query("city")
        .withIndex("byCityName", (q) => q.eq("cityName", normalized))
        .first();

      if (clash && clash._id !== id) {
        throw new Error(`City '${cityName}' already exists`);
      }

      updateData.cityName = normalized;
    }

    if (countryName !== undefined) {
      updateData.countryName = countryName;
    }

    if (Object.keys(updateData).length > 0) {
      await ctx.db.patch(id, updateData);
    }
  },
});

export const deleteCity = mutation({
  args: { id: v.id("city") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

