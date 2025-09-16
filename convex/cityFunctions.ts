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
    
    const result = await ctx.db
      .query("city")
      .order("desc")
      .paginate({ numItems: limit, cursor: offset > 0 ? offset.toString() : null });
    
    // Helper function to validate if a string is a valid Convex storage ID
    const isValidStorageId = (id: string): boolean => {
      return !/[\/\.]/.test(id) && /^[a-z0-9]+$/i.test(id) && id.length > 20;
    };

    // Helper function to safely get image URL
    const safeGetImageUrl = async (imageId: string): Promise<string | null> => {
      if (!isValidStorageId(imageId)) {
        return imageId.startsWith('/') ? imageId : null;
      }
      try {
        const url = await ctx.storage.getUrl(imageId);
        return url;
      } catch (error) {
        return null;
      }
    };

    // Get image URLs for all cities
    const citiesWithUrls = await Promise.all(
      result.page.map(async (city) => {
        let imageUrl = null;
        if (city.image) {
          imageUrl = await safeGetImageUrl(city.image);
        }
        return {
          ...city,
          imageUrl
        };
      })
    );
    
    return {
      ...result,
      page: citiesWithUrls
    };
  },
});

export const getCityById = query({
  args: { id: v.id("city") },
  handler: async (ctx, args) => {
    const city = await ctx.db.get(args.id);
    if (!city) return null;

    // Helper functions (same as above)
    const isValidStorageId = (id: string): boolean => {
      return !/[\/\.]/.test(id) && /^[a-z0-9]+$/i.test(id) && id.length > 20;
    };

    const safeGetImageUrl = async (imageId: string): Promise<string | null> => {
      if (!isValidStorageId(imageId)) {
        return imageId.startsWith('/') ? imageId : null;
      }
      try {
        return await ctx.storage.getUrl(imageId);
      } catch (error) {
        return null;
      }
    };

    // Get image URL if image exists
    let imageUrl = null;
    if (city.image) {
      imageUrl = await safeGetImageUrl(city.image);
    }

    return {
      ...city,
      imageUrl
    };
  },
});


export const getCitiesByCityName = query({
  args: { cityName: v.string() },
  handler: async (ctx, args) => {
    // Get all cities and filter case-insensitively
    const allCities = await ctx.db
      .query("city")
      .collect();
    
    // Filter cities with case-insensitive matching
    const cities = allCities.filter(city => 
      city.cityName.toLowerCase() === args.cityName.toLowerCase()
    );
    
    // Helper functions
    const isValidStorageId = (id: string): boolean => {
      return !/[\/\.]/.test(id) && /^[a-z0-9]+$/i.test(id) && id.length > 20;
    };

    const safeGetImageUrl = async (imageId: string): Promise<string | null> => {
      if (!isValidStorageId(imageId)) {
        return imageId.startsWith('/') ? imageId : null;
      }
      try {
        return await ctx.storage.getUrl(imageId);
      } catch (error) {
        return null;
      }
    };

    // Get image URLs for all cities
    const citiesWithUrls = await Promise.all(
      cities.map(async (city) => {
        let imageUrl = null;
        if (city.image) {
          imageUrl = await safeGetImageUrl(city.image);
        }
        return {
          ...city,
          imageUrl
        };
      })
    );
    
    return citiesWithUrls;
  },
});

export const getCitiesByCountryName = query({
  args: { countryName: v.string() },
  handler: async (ctx, args) => {
    const cities = await ctx.db
      .query("city")
      .withIndex("byCountryName", (q) => q.eq("countryName", args.countryName))
      .collect();
    
    // Helper functions
    const isValidStorageId = (id: string): boolean => {
      return !/[\/\.]/.test(id) && /^[a-z0-9]+$/i.test(id) && id.length > 20;
    };

    const safeGetImageUrl = async (imageId: string): Promise<string | null> => {
      if (!isValidStorageId(imageId)) {
        return imageId.startsWith('/') ? imageId : null;
      }
      try {
        return await ctx.storage.getUrl(imageId);
      } catch (error) {
        return null;
      }
    };

    // Get image URLs for all cities
    const citiesWithUrls = await Promise.all(
      cities.map(async (city) => {
        let imageUrl = null;
        if (city.image) {
          imageUrl = await safeGetImageUrl(city.image);
        }
        return {
          ...city,
          imageUrl
        };
      })
    );
    
    return citiesWithUrls;
  },
});


// ---------------- Mutation Functions ----------------
export const createCity = mutation({
  args: {
    image: v.optional(v.string()),
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
      image: args.image,
      cityName: normalized,
      countryName: args.countryName,
    });
  },
});

export const updateCity = mutation({
  args: {
    id: v.id("city"),
    image: v.optional(v.string()),
    cityName: v.optional(v.string()),
    countryName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, image, cityName, countryName } = args;

    const updateData: any = {};

    if (image !== undefined) {
      updateData.image = image;
    }

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

