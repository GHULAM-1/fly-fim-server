"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.updateCity = exports.createCity = exports.getCitiesByCountryName = exports.getCitiesByCityName = exports.getCityById = exports.getAllCities = void 0;
const server_1 = require("./_generated/server");
const values_1 = require("convex/values");
// ---------------- Query Functions ----------------
exports.getAllCities = (0, server_1.query)({
    args: {
        limit: values_1.v.optional(values_1.v.number()),
        offset: values_1.v.optional(values_1.v.number())
    },
    handler: async (ctx, args) => {
        const { limit = 50, offset = 0 } = args;
        const result = await ctx.db
            .query("city")
            .order("desc")
            .paginate({ numItems: limit, cursor: offset > 0 ? offset.toString() : null });
        // Helper function to validate if a string is a valid Convex storage ID
        const isValidStorageId = (id) => {
            return !/[\/\.]/.test(id) && /^[a-z0-9]+$/i.test(id) && id.length > 20;
        };
        // Helper function to safely get image URL
        const safeGetImageUrl = async (imageId) => {
            if (!isValidStorageId(imageId)) {
                return imageId.startsWith('/') ? imageId : null;
            }
            try {
                const url = await ctx.storage.getUrl(imageId);
                return url;
            }
            catch (error) {
                return null;
            }
        };
        // Get image URLs for all cities
        const citiesWithUrls = await Promise.all(result.page.map(async (city) => {
            let imageUrl = null;
            if (city.image) {
                imageUrl = await safeGetImageUrl(city.image);
            }
            return {
                ...city,
                imageUrl
            };
        }));
        return {
            ...result,
            page: citiesWithUrls
        };
    },
});
exports.getCityById = (0, server_1.query)({
    args: { id: values_1.v.id("city") },
    handler: async (ctx, args) => {
        const city = await ctx.db.get(args.id);
        if (!city)
            return null;
        // Helper functions (same as above)
        const isValidStorageId = (id) => {
            return !/[\/\.]/.test(id) && /^[a-z0-9]+$/i.test(id) && id.length > 20;
        };
        const safeGetImageUrl = async (imageId) => {
            if (!isValidStorageId(imageId)) {
                return imageId.startsWith('/') ? imageId : null;
            }
            try {
                return await ctx.storage.getUrl(imageId);
            }
            catch (error) {
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
exports.getCitiesByCityName = (0, server_1.query)({
    args: { cityName: values_1.v.string() },
    handler: async (ctx, args) => {
        // Get all cities and filter case-insensitively
        const allCities = await ctx.db
            .query("city")
            .collect();
        // Filter cities with case-insensitive matching
        const cities = allCities.filter(city => city.cityName.toLowerCase() === args.cityName.toLowerCase());
        // Helper functions
        const isValidStorageId = (id) => {
            return !/[\/\.]/.test(id) && /^[a-z0-9]+$/i.test(id) && id.length > 20;
        };
        const safeGetImageUrl = async (imageId) => {
            if (!isValidStorageId(imageId)) {
                return imageId.startsWith('/') ? imageId : null;
            }
            try {
                return await ctx.storage.getUrl(imageId);
            }
            catch (error) {
                return null;
            }
        };
        // Get image URLs for all cities
        const citiesWithUrls = await Promise.all(cities.map(async (city) => {
            let imageUrl = null;
            if (city.image) {
                imageUrl = await safeGetImageUrl(city.image);
            }
            return {
                ...city,
                imageUrl
            };
        }));
        return citiesWithUrls;
    },
});
exports.getCitiesByCountryName = (0, server_1.query)({
    args: { countryName: values_1.v.string() },
    handler: async (ctx, args) => {
        const cities = await ctx.db
            .query("city")
            .withIndex("byCountryName", (q) => q.eq("countryName", args.countryName))
            .collect();
        // Helper functions
        const isValidStorageId = (id) => {
            return !/[\/\.]/.test(id) && /^[a-z0-9]+$/i.test(id) && id.length > 20;
        };
        const safeGetImageUrl = async (imageId) => {
            if (!isValidStorageId(imageId)) {
                return imageId.startsWith('/') ? imageId : null;
            }
            try {
                return await ctx.storage.getUrl(imageId);
            }
            catch (error) {
                return null;
            }
        };
        // Get image URLs for all cities
        const citiesWithUrls = await Promise.all(cities.map(async (city) => {
            let imageUrl = null;
            if (city.image) {
                imageUrl = await safeGetImageUrl(city.image);
            }
            return {
                ...city,
                imageUrl
            };
        }));
        return citiesWithUrls;
    },
});
// ---------------- Mutation Functions ----------------
exports.createCity = (0, server_1.mutation)({
    args: {
        image: values_1.v.optional(values_1.v.string()),
        cityName: values_1.v.string(),
        countryName: values_1.v.string(),
    },
    handler: async (ctx, args) => {
        // Check for duplicates using case-insensitive comparison
        const allCities = await ctx.db.query("city").collect();
        const normalizedForCheck = args.cityName.trim().toLowerCase();
        const existing = allCities.find(city => city.cityName.toLowerCase() === normalizedForCheck);
        if (existing) {
            throw new Error(`City '${args.cityName}' already exists`);
        }
        return await ctx.db.insert("city", {
            image: args.image,
            cityName: args.cityName,
            countryName: args.countryName,
        });
    },
});
exports.updateCity = (0, server_1.mutation)({
    args: {
        id: values_1.v.id("city"),
        image: values_1.v.optional(values_1.v.string()),
        cityName: values_1.v.optional(values_1.v.string()),
        countryName: values_1.v.optional(values_1.v.string()),
    },
    handler: async (ctx, args) => {
        const { id, image, cityName, countryName } = args;
        const updateData = {};
        if (image !== undefined) {
            updateData.image = image;
        }
        if (cityName !== undefined) {
            // Check for duplicates using case-insensitive comparison (exclude current record)
            const allCities = await ctx.db.query("city").collect();
            const normalizedForCheck = cityName.trim().toLowerCase();
            const existing = allCities.find(city => city.cityName.toLowerCase() === normalizedForCheck && city._id !== id);
            if (existing) {
                throw new Error(`City '${cityName}' already exists`);
            }
            updateData.cityName = cityName; // Save the properly formatted name, not lowercase
        }
        if (countryName !== undefined) {
            updateData.countryName = countryName;
        }
        if (Object.keys(updateData).length > 0) {
            await ctx.db.patch(id, updateData);
        }
    },
});
exports.deleteCity = (0, server_1.mutation)({
    args: { id: values_1.v.id("city") },
    handler: async (ctx, args) => {
        // First, find and delete all experiences that belong to this city
        const experiences = await ctx.db
            .query("experience")
            .withIndex("byCity", (q) => q.eq("cityId", args.id))
            .collect();
        // Delete all related experiences
        for (const experience of experiences) {
            await ctx.db.delete(experience._id);
        }
        // Then delete the city itself
        await ctx.db.delete(args.id);
    },
});
//# sourceMappingURL=cityFunctions.js.map