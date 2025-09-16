"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubcategoryPageData = exports.getCategoryPageDataFiltered = exports.getCategoryPageData = exports.getThingsToDoPageData = exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.getExperienceById = exports.getAllExperiences = void 0;
const server_1 = require("./_generated/server");
const values_1 = require("convex/values");
// Helper function to structure experience attributes (following schema field names)
const structureExperience = (exp) => ({
    _id: exp._id,
    basicInfo: {
        title: exp.title,
        description: exp.description,
        tagOnCards: exp.tagOnCards,
        price: exp.price,
        oldPrice: exp.oldPrice,
        sale: exp.sale,
        images: exp.images,
        mainImage: exp.mainImage,
    },
    features: {
        features: exp.features,
        featureText: exp.featureText,
    },
    information: {
        highlights: exp.highlights,
        inclusions: exp.inclusions,
        exclusions: exp.exclusions,
        cancellationPolicy: exp.cancellationPolicy,
        ticketValidity: exp.ticketValidity,
        operatingHours: exp.operatingHours,
        yourExperience: exp.yourExperience,
        knowBeforeYouGo: exp.knowBeforeYouGo,
        myTickets: exp.myTickets,
        whereTo: exp.whereTo,
        exploreMore: exp.exploreMore,
    },
    calendar: {
        datePriceRange: exp.datePriceRange,
    },
    packages: {
        packageType: exp.packageType,
    },
    ticketPrice: {
        adultPrice: exp.adultPrice,
        childPrice: exp.childPrice,
        seniorPrice: exp.seniorPrice,
        totalLimit: exp.totalLimit,
    },
    flags: {
        isMainCard: exp.isMainCard,
        isTopExperience: exp.isTopExperience,
        isMustDo: exp.isMustDo,
        isPopular: exp.isPopular,
        blogSlug: exp.blogSlug,
    },
    relationships: {
        categoryId: exp.categoryId,
        subcategoryId: exp.subcategoryId,
        cityId: exp.cityId,
    },
});
// Helper function to validate if a string is a valid Convex storage ID
const isValidStorageId = (id) => {
    // Convex storage IDs are typically alphanumeric strings without special characters like '/' or '.'
    // File paths like '/images/d5.jpg.avif' should be rejected
    return !/[\/\.]/.test(id) && /^[a-z0-9]+$/i.test(id) && id.length > 20;
};
// Helper function to safely get image URL
const safeGetImageUrl = async (ctx, imageId) => {
    if (!isValidStorageId(imageId)) {
        return imageId.startsWith('/') ? imageId : null; // Return file paths as-is, reject invalid IDs
    }
    try {
        const url = await ctx.storage.getUrl(imageId);
        return url;
    }
    catch (error) {
        return null;
    }
};
// Helper function to structure experience attributes with resolved image URLs
const structureExperienceWithImageUrls = async (ctx, exp) => {
    // Resolve main image URLs (now an array)
    let mainImageUrls = [];
    if (exp.mainImage && Array.isArray(exp.mainImage)) {
        mainImageUrls = await Promise.all(exp.mainImage.map((imageId) => safeGetImageUrl(ctx, imageId)));
    }
    // Resolve images array URLs
    let imageUrls = [];
    if (exp.images && Array.isArray(exp.images)) {
        imageUrls = await Promise.all(exp.images.map((imageId) => safeGetImageUrl(ctx, imageId)));
    }
    return {
        _id: exp._id,
        basicInfo: {
            title: exp.title,
            description: exp.description,
            tagOnCards: exp.tagOnCards,
            price: exp.price,
            oldPrice: exp.oldPrice,
            sale: exp.sale,
            images: imageUrls,
            mainImage: mainImageUrls,
        },
        features: {
            features: exp.features,
            featureText: exp.featureText,
        },
        information: {
            highlights: exp.highlights,
            inclusions: exp.inclusions,
            exclusions: exp.exclusions,
            cancellationPolicy: exp.cancellationPolicy,
            ticketValidity: exp.ticketValidity,
            operatingHours: exp.operatingHours,
            yourExperience: exp.yourExperience,
            knowBeforeYouGo: exp.knowBeforeYouGo,
            myTickets: exp.myTickets,
            whereTo: exp.whereTo,
            exploreMore: exp.exploreMore,
        },
        calendar: {
            datePriceRange: exp.datePriceRange,
        },
        packages: {
            packageType: exp.packageType,
        },
        ticketPrice: {
            adultPrice: exp.adultPrice,
            childPrice: exp.childPrice,
            seniorPrice: exp.seniorPrice,
            totalLimit: exp.totalLimit,
        },
        flags: {
            isMainCard: exp.isMainCard,
            isTopExperience: exp.isTopExperience,
            isMustDo: exp.isMustDo,
            isPopular: exp.isPopular,
            blogSlug: exp.blogSlug,
        },
        relationships: {
            categoryId: exp.categoryId,
            subcategoryId: exp.subcategoryId,
            cityId: exp.cityId,
            categoryName: (await ctx.db.get(exp.categoryId))?.categoryName || null,
            subcategoryName: (await ctx.db.get(exp.subcategoryId))?.subcategoryName || null,
            cityName: (await ctx.db.get(exp.cityId))?.cityName || null,
        },
    };
};
// Helper function to structure review with resolved image URLs
const structureReviewWithImageUrls = async (ctx, review) => {
    // Resolve images array URLs
    let imageUrls = [];
    if (review.images && Array.isArray(review.images)) {
        imageUrls = await Promise.all(review.images.map((imageId) => safeGetImageUrl(ctx, imageId)));
    }
    return {
        ...review,
        imageUrls
    };
};
exports.getAllExperiences = (0, server_1.query)({
    args: { limit: values_1.v.optional(values_1.v.number()), offset: values_1.v.optional(values_1.v.number()) },
    handler: async (ctx, args) => {
        const { limit = 50, offset = 0 } = args;
        return await ctx.db
            .query("experience")
            .order("desc")
            .paginate({
            numItems: limit,
            cursor: offset > 0 ? offset.toString() : null,
        });
    },
});
exports.getExperienceById = (0, server_1.query)({
    args: { id: values_1.v.id("experience") },
    handler: async (ctx, args) => ctx.db.get(args.id),
});
exports.createExperience = (0, server_1.mutation)({
    args: {
        title: values_1.v.string(),
        description: values_1.v.string(),
        price: values_1.v.float64(),
        oldPrice: values_1.v.optional(values_1.v.float64()),
        sale: values_1.v.optional(values_1.v.float64()),
        images: values_1.v.array(values_1.v.string()),
        mainImage: values_1.v.array(values_1.v.string()),
        tagOnCards: values_1.v.optional(values_1.v.string()),
        features: values_1.v.array(values_1.v.string()),
        featureText: values_1.v.string(),
        highlights: values_1.v.string(),
        inclusions: values_1.v.string(),
        exclusions: values_1.v.string(),
        cancellationPolicy: values_1.v.string(),
        ticketValidity: values_1.v.string(),
        exploreMore: values_1.v.string(),
        knowBeforeYouGo: values_1.v.string(),
        myTickets: values_1.v.string(),
        operatingHours: values_1.v.array(values_1.v.object({
            startDate: values_1.v.float64(),
            endDate: values_1.v.float64(),
            openTime: values_1.v.string(),
            closeTime: values_1.v.string(),
            lastEntryTime: values_1.v.string(),
            title: values_1.v.string(),
        })),
        whereTo: values_1.v.object({
            address: values_1.v.string(),
            lat: values_1.v.float64(),
            lng: values_1.v.float64(),
        }),
        datePriceRange: values_1.v.array(values_1.v.object({
            startDate: values_1.v.float64(),
            endDate: values_1.v.float64(),
            price: values_1.v.float64(),
        })),
        packageType: values_1.v.object({
            name: values_1.v.string(),
            price: values_1.v.float64(),
            points: values_1.v.array(values_1.v.object({
                title: values_1.v.string(),
                subpoints: values_1.v.optional(values_1.v.array(values_1.v.string())),
            })),
            timePriceSlots: values_1.v.array(values_1.v.object({
                openTime: values_1.v.string(),
                closeTime: values_1.v.string(),
                price: values_1.v.float64(),
            })),
        }),
        adultPrice: values_1.v.float64(),
        childPrice: values_1.v.float64(),
        seniorPrice: values_1.v.float64(),
        totalLimit: values_1.v.float64(),
        // UI Hierarchy Fields
        isMainCard: values_1.v.optional(values_1.v.boolean()),
        isTopExperience: values_1.v.optional(values_1.v.boolean()),
        isMustDo: values_1.v.optional(values_1.v.boolean()),
        isPopular: values_1.v.optional(values_1.v.boolean()),
        blogSlug: values_1.v.optional(values_1.v.string()),
        // Relationship Fields
        categoryId: values_1.v.id("category"),
        subcategoryId: values_1.v.id("subcategory"),
        cityId: values_1.v.id("city"),
    },
    handler: async (ctx, args) => {
        // Ensure only one hierarchy flag is true
        const hierarchyFlags = [
            args.isTopExperience,
            args.isMustDo,
            args.isPopular,
            args.isMainCard,
        ].filter(Boolean);
        if (hierarchyFlags.length > 1) {
            throw new Error("Only one hierarchy flag (isMainCard, isTopExperience, isMustDo, isPopular) can be true at a time");
        }
        return await ctx.db.insert("experience", args);
    },
});
exports.updateExperience = (0, server_1.mutation)({
    args: {
        id: values_1.v.id("experience"),
        patch: values_1.v.object({
            title: values_1.v.optional(values_1.v.string()),
            description: values_1.v.optional(values_1.v.string()),
            price: values_1.v.optional(values_1.v.number()),
            oldPrice: values_1.v.optional(values_1.v.number()),
            sale: values_1.v.optional(values_1.v.number()),
            images: values_1.v.optional(values_1.v.array(values_1.v.string())),
            mainImage: values_1.v.optional(values_1.v.array(values_1.v.string())),
            tagOnCards: values_1.v.optional(values_1.v.string()),
            features: values_1.v.optional(values_1.v.array(values_1.v.string())),
            featureText: values_1.v.optional(values_1.v.string()),
            highlights: values_1.v.optional(values_1.v.string()),
            inclusions: values_1.v.optional(values_1.v.string()),
            exclusions: values_1.v.optional(values_1.v.string()),
            cancellationPolicy: values_1.v.optional(values_1.v.string()),
            ticketValidity: values_1.v.optional(values_1.v.string()),
            exploreMore: values_1.v.optional(values_1.v.string()),
            knowBeforeYouGo: values_1.v.optional(values_1.v.string()),
            myTickets: values_1.v.optional(values_1.v.string()),
            operatingHours: values_1.v.optional(values_1.v.array(values_1.v.object({
                startDate: values_1.v.number(),
                endDate: values_1.v.number(),
                openTime: values_1.v.string(),
                closeTime: values_1.v.string(),
                lastEntryTime: values_1.v.string(),
                title: values_1.v.string(),
            }))),
            whereTo: values_1.v.optional(values_1.v.object({
                address: values_1.v.string(),
                lat: values_1.v.number(),
                lng: values_1.v.number(),
            })),
            datePriceRange: values_1.v.optional(values_1.v.array(values_1.v.object({
                startDate: values_1.v.number(),
                endDate: values_1.v.number(),
                price: values_1.v.number(),
            }))),
            packageType: values_1.v.optional(values_1.v.object({
                name: values_1.v.string(),
                price: values_1.v.number(),
                points: values_1.v.array(values_1.v.object({
                    title: values_1.v.string(),
                    subpoints: values_1.v.optional(values_1.v.array(values_1.v.string())),
                })),
                timePriceSlots: values_1.v.array(values_1.v.object({
                    openTime: values_1.v.string(),
                    closeTime: values_1.v.string(),
                    price: values_1.v.number(),
                })),
            })),
            adultPrice: values_1.v.optional(values_1.v.number()),
            childPrice: values_1.v.optional(values_1.v.number()),
            seniorPrice: values_1.v.optional(values_1.v.number()),
            totalLimit: values_1.v.optional(values_1.v.number()),
            // UI Hierarchy Fields
            isMainCard: values_1.v.optional(values_1.v.boolean()),
            isTopExperience: values_1.v.optional(values_1.v.boolean()),
            isMustDo: values_1.v.optional(values_1.v.boolean()),
            isPopular: values_1.v.optional(values_1.v.boolean()),
            blogSlug: values_1.v.optional(values_1.v.string()),
            // Relationship Fields
            categoryId: values_1.v.optional(values_1.v.id("category")),
            subcategoryId: values_1.v.optional(values_1.v.id("subcategory")),
            cityId: values_1.v.optional(values_1.v.id("city")),
        }),
    },
    handler: async (ctx, { id, patch }) => {
        // If any hierarchy flags are being updated, ensure only one is true
        if (patch.isTopExperience !== undefined ||
            patch.isMustDo !== undefined ||
            patch.isPopular !== undefined ||
            patch.isMainCard !== undefined) {
            // Get current experience data
            const current = await ctx.db.get(id);
            if (!current)
                throw new Error("Experience not found");
            // Merge current data with patch to get final values
            const finalValues = {
                isTopExperience: patch.isTopExperience ?? current.isTopExperience ?? false,
                isMustDo: patch.isMustDo ?? current.isMustDo ?? false,
                isPopular: patch.isPopular ?? current.isPopular ?? false,
                isMainCard: patch.isMainCard ?? current.isMainCard ?? false,
            };
            // Ensure only one hierarchy flag is true
            const hierarchyFlags = [
                finalValues.isTopExperience,
                finalValues.isMustDo,
                finalValues.isPopular,
                finalValues.isMainCard,
            ].filter(Boolean);
            if (hierarchyFlags.length > 1) {
                throw new Error("Only one hierarchy flag (isMainCard, isTopExperience, isMustDo, isPopular) can be true at a time");
            }
            // If setting one flag to true, set others to false
            if (patch.isMainCard === true) {
                patch.isTopExperience = false;
                patch.isMustDo = false;
                patch.isPopular = false;
            }
            else if (patch.isTopExperience === true) {
                patch.isMainCard = false;
                patch.isMustDo = false;
                patch.isPopular = false;
            }
            else if (patch.isMustDo === true) {
                patch.isMainCard = false;
                patch.isTopExperience = false;
                patch.isPopular = false;
            }
            else if (patch.isPopular === true) {
                patch.isMainCard = false;
                patch.isTopExperience = false;
                patch.isMustDo = false;
            }
        }
        await ctx.db.patch(id, patch);
    },
});
exports.deleteExperience = (0, server_1.mutation)({
    args: { id: values_1.v.id("experience") },
    handler: async (ctx, args) => ctx.db.delete(args.id),
});
// ===== THINGS TO DO PAGE QUERIES =====
// Get all data for Things to Do page with structured hierarchy
exports.getThingsToDoPageData = (0, server_1.query)({
    args: {
        cityId: values_1.v.id("city"),
    },
    handler: async (ctx, args) => {
        // 1) Get city document
        const cityDoc = await ctx.db.get(args.cityId);
        if (!cityDoc) {
            return {
                categories: [],
                topExperiences: [],
                mustDoExperiences: [],
                mainCards: [],
            };
        }
        // 2) Get all experiences for this city using the new cityId field
        const experiences = await ctx.db
            .query("experience")
            .withIndex("byCity", (q) => q.eq("cityId", args.cityId))
            .collect();
        // 4) Filter experiences by hierarchy flags
        const topExperiences = experiences.filter((exp) => exp.isTopExperience === true);
        const mustDoExperiences = experiences.filter((exp) => exp.isMustDo === true);
        const mainCards = experiences.filter((exp) => exp.isMainCard === true);
        // 5) Get IDs of experiences that are already in hierarchy sections
        const hierarchyExpIds = new Set([
            ...topExperiences.map((exp) => exp._id),
            ...mustDoExperiences.map((exp) => exp._id),
            ...mainCards.map((exp) => exp._id),
        ]);
        // 6) Filter out experiences that are already in hierarchy sections
        const regularExperiences = experiences.filter((exp) => !hierarchyExpIds.has(exp._id));
        // 7) Get all categories and their subcategories using only regular experiences
        const categoryMap = new Map();
        for (const exp of regularExperiences) {
            // Get category for this experience
            const category = await ctx.db.get(exp.categoryId);
            if (!category)
                continue;
            if (!categoryMap.has(category.categoryName)) {
                categoryMap.set(category.categoryName, {
                    categoryName: category.categoryName,
                    subcategories: new Map(),
                    experiences: [],
                });
            }
            // Add experience to category
            categoryMap.get(category.categoryName).experiences.push(exp);
            // Get subcategory for this experience
            const subcategory = await ctx.db.get(exp.subcategoryId);
            if (!subcategory)
                continue;
            const categoryData = categoryMap.get(category.categoryName);
            if (!categoryData.subcategories.has(subcategory.subcategoryName)) {
                categoryData.subcategories.set(subcategory.subcategoryName, {
                    subcategoryName: subcategory.subcategoryName,
                    experiences: [],
                });
            }
            categoryData.subcategories
                .get(subcategory.subcategoryName)
                .experiences.push(exp);
        }
        // 6) Get reviews for all experiences in this city using the byExperience index
        const reviews = [];
        for (const exp of experiences) {
            const expReviews = await ctx.db
                .query("reviews")
                .withIndex("byExperience", (q) => q.eq("experienceId", exp._id))
                .collect();
            reviews.push(...expReviews);
        }
        // 7) Convert Map to Array and structure response with image URLs
        const categories = await Promise.all(Array.from(categoryMap.values()).map(async (category) => ({
            categoryName: category.categoryName,
            subcategories: await Promise.all(Array.from(category.subcategories.values()).map(async (sub) => ({
                subcategoryName: sub.subcategoryName,
                experiences: await Promise.all(sub.experiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))),
            }))),
        })));
        return {
            categories,
            topExperiences: await Promise.all(topExperiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))),
            mustDoExperiences: await Promise.all(mustDoExperiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))),
            mainCards: await Promise.all(mainCards.map((exp) => structureExperienceWithImageUrls(ctx, exp))),
            reviews: await Promise.all(reviews.map((review) => structureReviewWithImageUrls(ctx, review))),
        };
    },
});
// ===== CATEGORY PAGE QUERIES =====
// Get all data for Category page with structured hierarchy
exports.getCategoryPageData = (0, server_1.query)({
    args: {
        cityId: values_1.v.id("city"),
        categoryId: values_1.v.id("category"),
    },
    handler: async (ctx, args) => {
        // 1) Get city and category documents
        const cityDoc = await ctx.db.get(args.cityId);
        const categoryDoc = await ctx.db.get(args.categoryId);
        if (!cityDoc || !categoryDoc) {
            return {
                category: null,
                subcategories: [],
                topExperiences: [],
                popularExperiences: [],
                reviews: [],
            };
        }
        // 2) Get all experiences for this city and category
        const allCityExperiences = await ctx.db
            .query("experience")
            .withIndex("byCity", (q) => q.eq("cityId", args.cityId))
            .collect();
        // Filter by categoryId in JavaScript instead of Convex filter
        const experiences = allCityExperiences.filter((exp) => exp.categoryId === args.categoryId);
        // 3) Filter experiences by hierarchy flags
        const topExperiences = experiences.filter((exp) => exp.isTopExperience === true);
        const popularExperiences = experiences.filter((exp) => exp.isPopular === true);
        // 4) Get IDs of experiences that are already in hierarchy sections
        const hierarchyExpIds = new Set([
            ...topExperiences.map((exp) => exp._id),
            ...popularExperiences.map((exp) => exp._id),
        ]);
        // 5) Filter out experiences that are already in hierarchy sections
        const regularExperiences = experiences.filter((exp) => !hierarchyExpIds.has(exp._id));
        // 6) Get subcategories using regular experiences
        const subcategoryMap = new Map();
        for (const exp of regularExperiences) {
            const subcategory = await ctx.db.get(exp.subcategoryId);
            if (!subcategory)
                continue;
            if (!subcategoryMap.has(subcategory.subcategoryName)) {
                subcategoryMap.set(subcategory.subcategoryName, {
                    subcategoryName: subcategory.subcategoryName,
                    experiences: [],
                });
            }
            subcategoryMap.get(subcategory.subcategoryName).experiences.push(exp);
        }
        // 7) Convert Map to Array with image URLs
        const subcategories = await Promise.all(Array.from(subcategoryMap.values()).map(async (sub) => ({
            subcategoryName: sub.subcategoryName,
            experiences: await Promise.all(sub.experiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))),
        })));
        // 8) Get reviews for all experiences in this category
        const reviews = [];
        for (const exp of experiences) {
            const expReviews = await ctx.db
                .query("reviews")
                .withIndex("byExperience", (q) => q.eq("experienceId", exp._id))
                .collect();
            reviews.push(...expReviews);
        }
        // Get all categories and subcategories in this city with top experiences (max 15 per subcategory)
        const allCategoriesMap = new Map();
        // Create a map of category -> subcategories based on experiences in this city
        for (const exp of allCityExperiences) {
            const category = await ctx.db.get(exp.categoryId);
            const subcategory = await ctx.db.get(exp.subcategoryId);
            if (!category || !subcategory)
                continue;
            const categoryName = category.categoryName;
            const subcategoryName = subcategory.subcategoryName;
            // Initialize category if it doesn't exist
            if (!allCategoriesMap.has(categoryName)) {
                allCategoriesMap.set(categoryName, new Map());
            }
            // Initialize subcategory if it doesn't exist
            const categoryData = allCategoriesMap.get(categoryName);
            if (!categoryData.has(subcategoryName)) {
                categoryData.set(subcategoryName, []);
            }
        }
        // Now add top experiences to each subcategory (max 15 per subcategory)
        const allCityTopExperiences = allCityExperiences.filter((exp) => exp.isTopExperience === true);
        for (const exp of allCityTopExperiences) {
            const category = await ctx.db.get(exp.categoryId);
            const subcategory = await ctx.db.get(exp.subcategoryId);
            if (!category || !subcategory)
                continue;
            const categoryName = category.categoryName;
            const subcategoryName = subcategory.subcategoryName;
            // Add to the appropriate subcategory if it exists and hasn't reached limit
            if (allCategoriesMap.has(categoryName)) {
                const categoryData = allCategoriesMap.get(categoryName);
                if (categoryData.has(subcategoryName)) {
                    const subcategoryExperiences = categoryData.get(subcategoryName);
                    if (subcategoryExperiences.length < 15) {
                        subcategoryExperiences.push(exp);
                    }
                }
            }
        }
        // Convert to desired structure and limit experiences to 15 per subcategory
        const allCategoriesResult = [];
        for (const [categoryName, subcategoryMap] of allCategoriesMap.entries()) {
            const subcategories = [];
            for (const [subcategoryName, experiences] of subcategoryMap.entries()) {
                subcategories.push({
                    subcategoryName,
                    experiences: experiences.slice(0, 15) // Ensure max 15 experiences
                });
            }
            allCategoriesResult.push({
                categoryName,
                subcategories
            });
        }
        // Structure experiences with image URLs for allCategories
        const structuredAllCategories = await Promise.all(allCategoriesResult.map(async (category) => ({
            categoryName: category.categoryName,
            subcategories: await Promise.all(category.subcategories.map(async (subcategory) => ({
                subcategoryName: subcategory.subcategoryName,
                experiences: await Promise.all(subcategory.experiences.map((exp) => structureExperienceWithImageUrls(ctx, exp)))
            })))
        })));
        return {
            category: {
                categoryName: categoryDoc.categoryName,
                subcategories,
            },
            topExperiences: await Promise.all(topExperiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))),
            popularExperiences: await Promise.all(popularExperiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))),
            reviews: await Promise.all(reviews.map((review) => structureReviewWithImageUrls(ctx, review))),
            allCategories: structuredAllCategories,
        };
    },
});
// ===== FILTERED CATEGORY PAGE QUERIES =====
// Get filtered data for Category page with sorting and subcategory filtering
exports.getCategoryPageDataFiltered = (0, server_1.query)({
    args: {
        cityId: values_1.v.id("city"),
        categoryId: values_1.v.id("category"),
        sortBy: values_1.v.optional(values_1.v.string()), // "popular", "price_low_high", "price_high_low"
        subcategoryNames: values_1.v.optional(values_1.v.array(values_1.v.string())), // Filter by specific subcategory names
    },
    handler: async (ctx, args) => {
        // 1) Get city and category documents
        const cityDoc = await ctx.db.get(args.cityId);
        const categoryDoc = await ctx.db.get(args.categoryId);
        if (!cityDoc || !categoryDoc) {
            return {
                category: null,
                subcategories: [],
                experiences: [],
                reviews: [],
            };
        }
        // 2) Get all experiences for this city and category
        const allCityExperiences = await ctx.db
            .query("experience")
            .withIndex("byCity", (q) => q.eq("cityId", args.cityId))
            .collect();
        // Filter by categoryId in JavaScript instead of Convex filter
        let experiences = allCityExperiences.filter((exp) => exp.categoryId === args.categoryId);
        // Apply subcategory filter if provided
        if (args.subcategoryNames && args.subcategoryNames.length > 0) {
            // Get subcategory documents to match names with IDs
            const subcategoryDocs = await Promise.all(args.subcategoryNames.map((name) => ctx.db
                .query("subcategory")
                .withIndex("bySubcategoryName", (q) => q.eq("subcategoryName", name))
                .first()));
            const validSubcategoryIds = subcategoryDocs
                .filter((doc) => doc !== null)
                .map((doc) => doc._id);
            experiences = experiences.filter((exp) => validSubcategoryIds.includes(exp.subcategoryId));
        }
        // Apply sorting
        if (args.sortBy) {
            switch (args.sortBy) {
                case "popular":
                    experiences = experiences.sort((a, b) => {
                        const aPopular = a.isPopular ? 1 : 0;
                        const bPopular = b.isPopular ? 1 : 0;
                        return bPopular - aPopular; // Popular first
                    });
                    break;
                case "price_low_high":
                    experiences = experiences.sort((a, b) => a.price - b.price);
                    break;
                case "price_high_low":
                    experiences = experiences.sort((a, b) => b.price - a.price);
                    break;
            }
        }
        // 3) Get subcategories using all experiences (not filtered by hierarchy)
        const subcategoryMap = new Map();
        for (const exp of experiences) {
            const subcategory = await ctx.db.get(exp.subcategoryId);
            if (!subcategory)
                continue;
            if (!subcategoryMap.has(subcategory.subcategoryName)) {
                subcategoryMap.set(subcategory.subcategoryName, {
                    subcategoryName: subcategory.subcategoryName,
                    experiences: [],
                });
            }
            subcategoryMap.get(subcategory.subcategoryName).experiences.push(exp);
        }
        // 4) Convert Map to Array with image URLs
        const subcategories = await Promise.all(Array.from(subcategoryMap.values()).map(async (sub) => ({
            subcategoryName: sub.subcategoryName,
            experiences: await Promise.all(sub.experiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))),
        })));
        // 5) Get reviews for all experiences in this category
        const reviews = [];
        for (const exp of experiences) {
            const expReviews = await ctx.db
                .query("reviews")
                .withIndex("byExperience", (q) => q.eq("experienceId", exp._id))
                .collect();
            reviews.push(...expReviews);
        }
        // Get all categories and subcategories in this city with top experiences (max 15 per subcategory)
        const allCategoriesMap = new Map();
        // Create a map of category -> subcategories based on experiences in this city
        for (const exp of allCityExperiences) {
            const category = await ctx.db.get(exp.categoryId);
            const subcategory = await ctx.db.get(exp.subcategoryId);
            if (!category || !subcategory)
                continue;
            const categoryName = category.categoryName;
            const subcategoryName = subcategory.subcategoryName;
            // Initialize category if it doesn't exist
            if (!allCategoriesMap.has(categoryName)) {
                allCategoriesMap.set(categoryName, new Map());
            }
            // Initialize subcategory if it doesn't exist
            const categoryData = allCategoriesMap.get(categoryName);
            if (!categoryData.has(subcategoryName)) {
                categoryData.set(subcategoryName, []);
            }
        }
        // Now add top experiences to each subcategory (max 15 per subcategory)
        const allCityTopExperiences = allCityExperiences.filter((exp) => exp.isTopExperience === true);
        for (const exp of allCityTopExperiences) {
            const category = await ctx.db.get(exp.categoryId);
            const subcategory = await ctx.db.get(exp.subcategoryId);
            if (!category || !subcategory)
                continue;
            const categoryName = category.categoryName;
            const subcategoryName = subcategory.subcategoryName;
            // Add to the appropriate subcategory if it exists and hasn't reached limit
            if (allCategoriesMap.has(categoryName)) {
                const categoryData = allCategoriesMap.get(categoryName);
                if (categoryData.has(subcategoryName)) {
                    const subcategoryExperiences = categoryData.get(subcategoryName);
                    if (subcategoryExperiences.length < 15) {
                        subcategoryExperiences.push(exp);
                    }
                }
            }
        }
        // Convert to desired structure and limit experiences to 15 per subcategory
        const allCategoriesResult = [];
        for (const [categoryName, subcategoryMap] of allCategoriesMap.entries()) {
            const subcategories = [];
            for (const [subcategoryName, experiences] of subcategoryMap.entries()) {
                subcategories.push({
                    subcategoryName,
                    experiences: experiences.slice(0, 15) // Ensure max 15 experiences
                });
            }
            allCategoriesResult.push({
                categoryName,
                subcategories
            });
        }
        // Structure experiences with image URLs for allCategories
        const structuredAllCategories = await Promise.all(allCategoriesResult.map(async (category) => ({
            categoryName: category.categoryName,
            subcategories: await Promise.all(category.subcategories.map(async (subcategory) => ({
                subcategoryName: subcategory.subcategoryName,
                experiences: await Promise.all(subcategory.experiences.map((exp) => structureExperienceWithImageUrls(ctx, exp)))
            })))
        })));
        return {
            category: {
                categoryName: categoryDoc.categoryName,
                subcategories,
            },
            experiences: await Promise.all(experiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))),
            reviews: await Promise.all(reviews.map((review) => structureReviewWithImageUrls(ctx, review))),
            allCategories: structuredAllCategories,
        };
    },
});
// ===== SUBCATEGORY PAGE QUERIES =====
// Get all data for Subcategory page with structured hierarchy
exports.getSubcategoryPageData = (0, server_1.query)({
    args: {
        cityId: values_1.v.id("city"),
        categoryId: values_1.v.id("category"),
        subcategoryName: values_1.v.string(),
    },
    handler: async (ctx, args) => {
        // 1) Get city, category, and subcategory documents
        const cityDoc = await ctx.db.get(args.cityId);
        const categoryDoc = await ctx.db.get(args.categoryId);
        // Find subcategory by name (case-insensitive with dash handling)
        const allSubcategories = await ctx.db
            .query("subcategory")
            .collect();
        // Normalize the received subcategory name: replace dashes with spaces and convert to lowercase
        const normalizedInputName = args.subcategoryName.replace(/-/g, ' ').toLowerCase().trim();
        const subcategoryDoc = allSubcategories.find(sub => {
            // Also normalize the database subcategory name for comparison
            const normalizedDbName = sub.subcategoryName.replace(/-/g, ' ').toLowerCase().trim();
            return normalizedDbName === normalizedInputName;
        });
        if (!cityDoc || !categoryDoc || !subcategoryDoc) {
            return {
                city: null,
                category: null,
                subcategory: null,
                experiences: [],
                reviewStats: {
                    averageRating: 0,
                    totalReviews: 0,
                },
            };
        }
        // 2) Get all experiences for this city and category
        const allCityExperiences = await ctx.db
            .query("experience")
            .withIndex("byCity", (q) => q.eq("cityId", args.cityId))
            .collect();
        // Filter by categoryId and subcategoryId (specific subcategory experiences)
        const specificExperiences = allCityExperiences.filter((exp) => exp.categoryId === args.categoryId && exp.subcategoryId === subcategoryDoc._id);
        // Filter by categoryId only (all experiences in this category for subcategories list)
        const allCategoryExperiences = allCityExperiences.filter((exp) => exp.categoryId === args.categoryId);
        // 3) Get all subcategories in this category (just names)
        const subcategoryNames = new Set();
        for (const exp of allCategoryExperiences) {
            const subcategory = await ctx.db.get(exp.subcategoryId);
            if (subcategory) {
                subcategoryNames.add(subcategory.subcategoryName);
            }
        }
        // 4) Get reviews for specific subcategory experiences
        const reviews = [];
        for (const exp of specificExperiences) {
            const expReviews = await ctx.db
                .query("reviews")
                .withIndex("byExperience", (q) => q.eq("experienceId", exp._id))
                .collect();
            reviews.push(...expReviews);
        }
        // 5) Calculate review statistics for specific subcategory
        const reviewStats = {
            averageRating: reviews.length > 0
                ? reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length
                : 0,
            totalReviews: reviews.length,
        };
        // 6) Get all categories and subcategories in this city with top experiences (max 15 per subcategory)
        const allCategoriesMap = new Map();
        // Create a map of category -> subcategories based on experiences in this city
        for (const exp of allCityExperiences) {
            const category = await ctx.db.get(exp.categoryId);
            const subcategory = await ctx.db.get(exp.subcategoryId);
            if (!category || !subcategory)
                continue;
            const categoryName = category.categoryName;
            const subcategoryName = subcategory.subcategoryName;
            // Initialize category if it doesn't exist
            if (!allCategoriesMap.has(categoryName)) {
                allCategoriesMap.set(categoryName, new Map());
            }
            // Initialize subcategory if it doesn't exist
            const categoryData = allCategoriesMap.get(categoryName);
            if (!categoryData.has(subcategoryName)) {
                categoryData.set(subcategoryName, []);
            }
        }
        // Now add top experiences to each subcategory (max 15 per subcategory)
        const allCityTopExperiences = allCityExperiences.filter((exp) => exp.isTopExperience === true);
        for (const exp of allCityTopExperiences) {
            const category = await ctx.db.get(exp.categoryId);
            const subcategory = await ctx.db.get(exp.subcategoryId);
            if (!category || !subcategory)
                continue;
            const categoryName = category.categoryName;
            const subcategoryName = subcategory.subcategoryName;
            // Add to the appropriate subcategory if it exists and hasn't reached limit
            if (allCategoriesMap.has(categoryName)) {
                const categoryData = allCategoriesMap.get(categoryName);
                if (categoryData.has(subcategoryName)) {
                    const subcategoryExperiences = categoryData.get(subcategoryName);
                    if (subcategoryExperiences.length < 15) {
                        subcategoryExperiences.push(exp);
                    }
                }
            }
        }
        // Convert to desired structure and limit experiences to 15 per subcategory
        const allCategoriesResult = [];
        for (const [categoryName, subcategoryMap] of allCategoriesMap.entries()) {
            const subcategories = [];
            for (const [subcategoryName, experiences] of subcategoryMap.entries()) {
                subcategories.push({
                    subcategoryName,
                    experiences: experiences.slice(0, 15) // Ensure max 15 experiences
                });
            }
            allCategoriesResult.push({
                categoryName,
                subcategories
            });
        }
        // Structure experiences with image URLs for allCategories
        const structuredAllCategories = await Promise.all(allCategoriesResult.map(async (category) => ({
            categoryName: category.categoryName,
            subcategories: await Promise.all(category.subcategories.map(async (subcategory) => ({
                subcategoryName: subcategory.subcategoryName,
                experiences: await Promise.all(subcategory.experiences.map((exp) => structureExperienceWithImageUrls(ctx, exp)))
            })))
        })));
        return {
            category: {
                categoryName: categoryDoc.categoryName,
                subcategories: Array.from(subcategoryNames), // Just names, no experiences
            },
            subcategory: {
                subcategoryName: subcategoryDoc.subcategoryName,
            },
            experiences: await Promise.all(specificExperiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))),
            allCategories: structuredAllCategories,
            reviewStats,
        };
    },
});
//# sourceMappingURL=experienceFunctions.js.map