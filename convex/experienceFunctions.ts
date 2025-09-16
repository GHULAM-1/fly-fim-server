import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Helper function to structure experience attributes (following schema field names)
const structureExperience = (exp: any) => ({
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

 information:{
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
const isValidStorageId = (id: string): boolean => {
  // Convex storage IDs are typically alphanumeric strings without special characters like '/' or '.'
  // File paths like '/images/d5.jpg.avif' should be rejected
  return !/[\/\.]/.test(id) && /^[a-z0-9]+$/i.test(id) && id.length > 20;
};

// Helper function to safely get image URL
const safeGetImageUrl = async (ctx: any, imageId: string): Promise<string | null> => {
  if (!isValidStorageId(imageId)) {
    return imageId.startsWith('/') ? imageId : null; // Return file paths as-is, reject invalid IDs
  }

  try {
    const url = await ctx.storage.getUrl(imageId);
    return url;
  } catch (error) {
    return null;
  }
};

// Helper function to structure experience attributes with resolved image URLs
const structureExperienceWithImageUrls = async (ctx: any, exp: any) => {
  // Resolve main image URLs (now an array)
  let mainImageUrls: (string | null)[] = [];
  if (exp.mainImage && Array.isArray(exp.mainImage)) {
    mainImageUrls = await Promise.all(
      exp.mainImage.map((imageId: string) => safeGetImageUrl(ctx, imageId))
    );
  }

  // Resolve images array URLs
  let imageUrls: (string | null)[] = [];
  if (exp.images && Array.isArray(exp.images)) {
    imageUrls = await Promise.all(
      exp.images.map((imageId: string) => safeGetImageUrl(ctx, imageId))
    );
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

   information:{
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
const structureReviewWithImageUrls = async (ctx: any, review: any) => {
  // Resolve images array URLs
  let imageUrls: (string | null)[] = [];
  if (review.images && Array.isArray(review.images)) {
    imageUrls = await Promise.all(
      review.images.map((imageId: string) => safeGetImageUrl(ctx, imageId))
    );
  }

  return {
    ...review,
    imageUrls
  };
};

export const getAllExperiences = query({
  args: { limit: v.optional(v.number()), offset: v.optional(v.number()) },
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

export const getExperienceById = query({
  args: { id: v.id("experience") },
  handler: async (ctx, args) => ctx.db.get(args.id),
});

export const createExperience = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    price: v.float64(),
    oldPrice: v.optional(v.float64()),
    sale: v.optional(v.float64()),
    images: v.array(v.string()),
    mainImage: v.array(v.string()),
    tagOnCards: v.optional(v.string()),
    features: v.array(v.string()),
    featureText: v.string(),
    highlights: v.string(),
    inclusions: v.string(),
    exclusions: v.string(),
    cancellationPolicy: v.string(),
    ticketValidity: v.string(),
    exploreMore: v.string(),
    knowBeforeYouGo: v.string(),
    myTickets: v.string(),
    operatingHours: v.array(
      v.object({
        startDate: v.float64(),
        endDate: v.float64(),
        openTime: v.string(),
        closeTime: v.string(),
        lastEntryTime: v.string(),
        title: v.string(),
      })
    ),
    whereTo: v.object({
      address: v.string(),
      lat: v.float64(),
      lng: v.float64(),
    }),
    datePriceRange: v.array(
      v.object({
        startDate: v.float64(),
        endDate: v.float64(),
        price: v.float64(),
      })
    ),
    packageType: v.object({
      name: v.string(),
      price: v.float64(),
      points: v.array(
        v.object({
          title: v.string(),
          subpoints: v.optional(v.array(v.string())),
        })
      ),
      timePriceSlots: v.array(
        v.object({
          openTime: v.string(),
          closeTime: v.string(),
          price: v.float64(),
        })
      ),
    }),
    adultPrice: v.float64(),
    childPrice: v.float64(),
    seniorPrice: v.float64(),
    totalLimit: v.float64(),

    // UI Hierarchy Fields
    isMainCard: v.optional(v.boolean()),
    isTopExperience: v.optional(v.boolean()),
    isMustDo: v.optional(v.boolean()),
    isPopular: v.optional(v.boolean()),
    blogSlug: v.optional(v.string()),

    // Relationship Fields
    categoryId: v.id("category"),
    subcategoryId: v.id("subcategory"),
    cityId: v.id("city"),
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
      throw new Error(
        "Only one hierarchy flag (isMainCard, isTopExperience, isMustDo, isPopular) can be true at a time"
      );
    }

    return await ctx.db.insert("experience", args);
  },
});

export const updateExperience = mutation({
  args: {
    id: v.id("experience"),
    patch: v.object({
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      price: v.optional(v.number()),
      oldPrice: v.optional(v.number()),
      sale: v.optional(v.number()),
      images: v.optional(v.array(v.string())),
      mainImage: v.optional(v.array(v.string())),
      tagOnCards: v.optional(v.string()),
      features: v.optional(v.array(v.string())),
      featureText: v.optional(v.string()),
      highlights: v.optional(v.string()),
      inclusions: v.optional(v.string()),
      exclusions: v.optional(v.string()),
      cancellationPolicy: v.optional(v.string()),
      ticketValidity: v.optional(v.string()),
      exploreMore: v.optional(v.string()),
      knowBeforeYouGo: v.optional(v.string()),
      myTickets: v.optional(v.string()),
      operatingHours: v.optional(
        v.array(
          v.object({
            startDate: v.number(),
            endDate: v.number(),
            openTime: v.string(),
            closeTime: v.string(),
            lastEntryTime: v.string(),
            title: v.string(),
          })
        )
      ),
      whereTo: v.optional(
        v.object({
          address: v.string(),
          lat: v.number(),
          lng: v.number(),
        })
      ),
      datePriceRange: v.optional(
        v.array(
          v.object({
            startDate: v.number(),
            endDate: v.number(),
            price: v.number(),
          })
        )
      ),
      packageType: v.optional(
        v.object({
          name: v.string(),
          price: v.number(),
          points: v.array(
            v.object({
              title: v.string(),
              subpoints: v.optional(v.array(v.string())),
            })
          ),
          timePriceSlots: v.array(
            v.object({
              openTime: v.string(),
              closeTime: v.string(),
              price: v.number(),
            })
          ),
        })
      ),
      adultPrice: v.optional(v.number()),
      childPrice: v.optional(v.number()),
      seniorPrice: v.optional(v.number()),
      totalLimit: v.optional(v.number()),

      // UI Hierarchy Fields
      isMainCard: v.optional(v.boolean()),
      isTopExperience: v.optional(v.boolean()),
      isMustDo: v.optional(v.boolean()),
      isPopular: v.optional(v.boolean()),
      blogSlug: v.optional(v.string()),

      // Relationship Fields
      categoryId: v.optional(v.id("category")),
      subcategoryId: v.optional(v.id("subcategory")),
      cityId: v.optional(v.id("city")),
    }),
  },
  handler: async (ctx, { id, patch }) => {
    // If any hierarchy flags are being updated, ensure only one is true
    if (
      patch.isTopExperience !== undefined ||
      patch.isMustDo !== undefined ||
      patch.isPopular !== undefined ||
      patch.isMainCard !== undefined
    ) {
      // Get current experience data
      const current = await ctx.db.get(id);
      if (!current) throw new Error("Experience not found");

      // Merge current data with patch to get final values
      const finalValues = {
        isTopExperience:
          patch.isTopExperience ?? current.isTopExperience ?? false,
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
        throw new Error(
          "Only one hierarchy flag (isMainCard, isTopExperience, isMustDo, isPopular) can be true at a time"
        );
      }

      // If setting one flag to true, set others to false
      if (patch.isMainCard === true) {
        patch.isTopExperience = false;
        patch.isMustDo = false;
        patch.isPopular = false;
      } else if (patch.isTopExperience === true) {
        patch.isMainCard = false;
        patch.isMustDo = false;
        patch.isPopular = false;
      } else if (patch.isMustDo === true) {
        patch.isMainCard = false;
        patch.isTopExperience = false;
        patch.isPopular = false;
      } else if (patch.isPopular === true) {
        patch.isMainCard = false;
        patch.isTopExperience = false;
        patch.isMustDo = false;
      }
    }

    await ctx.db.patch(id, patch);
  },
});

export const deleteExperience = mutation({
  args: { id: v.id("experience") },
  handler: async (ctx, args) => ctx.db.delete(args.id),
});

// ===== THINGS TO DO PAGE QUERIES =====

// Get all data for Things to Do page with structured hierarchy
export const getThingsToDoPageData = query({
  args: {
    cityId: v.id("city"),
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
    const topExperiences = experiences.filter(
      (exp) => (exp as any).isTopExperience === true
    );
    const mustDoExperiences = experiences.filter(
      (exp) => (exp as any).isMustDo === true
    );
    const mainCards = experiences.filter(
      (exp) => (exp as any).isMainCard === true
    );

    // 5) Get IDs of experiences that are already in hierarchy sections
    const hierarchyExpIds = new Set([
      ...topExperiences.map((exp) => exp._id),
      ...mustDoExperiences.map((exp) => exp._id),
      ...mainCards.map((exp) => exp._id),
    ]);

    // 6) Filter out experiences that are already in hierarchy sections
    const regularExperiences = experiences.filter(
      (exp) => !hierarchyExpIds.has(exp._id)
    );

    // 7) Get all categories and their subcategories using only regular experiences
    const categoryMap = new Map();

    for (const exp of regularExperiences) {
      // Get category for this experience
      const category = await ctx.db.get(exp.categoryId);
      if (!category) continue;

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
      if (!subcategory) continue;

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
    const categories = await Promise.all(
      Array.from(categoryMap.values()).map(async (category) => ({
        categoryName: category.categoryName,
        subcategories: await Promise.all(
          Array.from(category.subcategories.values()).map(async (sub: any) => ({
            subcategoryName: sub.subcategoryName,
            experiences: await Promise.all(
              sub.experiences.map((exp: any) =>
                structureExperienceWithImageUrls(ctx, exp)
              )
            ),
          }))
        ),
      }))
    );

    return {
      categories,
      topExperiences: await Promise.all(
        topExperiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))
      ),
      mustDoExperiences: await Promise.all(
        mustDoExperiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))
      ),
      mainCards: await Promise.all(
        mainCards.map((exp) => structureExperienceWithImageUrls(ctx, exp))
      ),
      reviews: await Promise.all(
        reviews.map((review) => structureReviewWithImageUrls(ctx, review))
      ),
    };
  },
});

// ===== CATEGORY PAGE QUERIES =====

// Get all data for Category page with structured hierarchy
export const getCategoryPageData = query({
  args: {
    cityId: v.id("city"),
    categoryId: v.id("category"),
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
    const experiences = allCityExperiences.filter(
      (exp) => exp.categoryId === args.categoryId
    );


    // 3) Filter experiences by hierarchy flags
    const topExperiences = experiences.filter(
      (exp) => (exp as any).isTopExperience === true
    );
    const popularExperiences = experiences.filter(
      (exp) => (exp as any).isPopular === true
    );

    // 4) Get IDs of experiences that are already in hierarchy sections
    const hierarchyExpIds = new Set([
      ...topExperiences.map((exp) => exp._id),
      ...popularExperiences.map((exp) => exp._id),
    ]);

    // 5) Filter out experiences that are already in hierarchy sections
    const regularExperiences = experiences.filter(
      (exp) => !hierarchyExpIds.has(exp._id)
    );

    // 6) Get subcategories using regular experiences
    const subcategoryMap = new Map();

    for (const exp of regularExperiences) {
      const subcategory = await ctx.db.get(exp.subcategoryId);
      if (!subcategory) continue;

      if (!subcategoryMap.has(subcategory.subcategoryName)) {
        subcategoryMap.set(subcategory.subcategoryName, {
          subcategoryName: subcategory.subcategoryName,
          experiences: [],
        });
      }
      subcategoryMap.get(subcategory.subcategoryName).experiences.push(exp);
    }

    // 7) Convert Map to Array with image URLs
    const subcategories = await Promise.all(
      Array.from(subcategoryMap.values()).map(async (sub: any) => ({
        subcategoryName: sub.subcategoryName,
        experiences: await Promise.all(
          sub.experiences.map((exp: any) =>
            structureExperienceWithImageUrls(ctx, exp)
          )
        ),
      }))
    );

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

      if (!category || !subcategory) continue;

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
    const allCityTopExperiences = allCityExperiences.filter(
      (exp) => (exp as any).isTopExperience === true
    );

    for (const exp of allCityTopExperiences) {
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

      if (!category || !subcategory) continue;

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
    const allCategoriesResult: any[] = [];
    for (const [categoryName, subcategoryMap] of allCategoriesMap.entries()) {
      const subcategories: any[] = [];
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
    const structuredAllCategories = await Promise.all(
      allCategoriesResult.map(async (category) => ({
        categoryName: category.categoryName,
        subcategories: await Promise.all(
          category.subcategories.map(async (subcategory: any) => ({
            subcategoryName: subcategory.subcategoryName,
            experiences: await Promise.all(
              subcategory.experiences.map((exp: any) => structureExperienceWithImageUrls(ctx, exp))
            )
          }))
        )
      }))
    );

    return {
      category: {
        categoryName: categoryDoc.categoryName,
        subcategories,
      },
      topExperiences: await Promise.all(
        topExperiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))
      ),
      popularExperiences: await Promise.all(
        popularExperiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))
      ),
      reviews: await Promise.all(
        reviews.map((review) => structureReviewWithImageUrls(ctx, review))
      ),
      allCategories: structuredAllCategories,
    };
  },
});

// ===== FILTERED CATEGORY PAGE QUERIES =====

// Get filtered data for Category page with sorting and subcategory filtering
export const getCategoryPageDataFiltered = query({
  args: {
    cityId: v.id("city"),
    categoryId: v.id("category"),
    sortBy: v.optional(v.string()), // "popular", "price_low_high", "price_high_low"
    subcategoryNames: v.optional(v.array(v.string())), // Filter by specific subcategory names
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
    let experiences = allCityExperiences.filter(
      (exp) => exp.categoryId === args.categoryId
    );

    // Apply subcategory filter if provided
    if (args.subcategoryNames && args.subcategoryNames.length > 0) {
      // Get subcategory documents to match names with IDs
      const subcategoryDocs = await Promise.all(
        args.subcategoryNames.map((name) =>
          ctx.db
            .query("subcategory")
            .withIndex("bySubcategoryName", (q) =>
              q.eq("subcategoryName", name)
            )
            .first()
        )
      );

      const validSubcategoryIds = subcategoryDocs
        .filter((doc) => doc !== null)
        .map((doc) => doc!._id);

      experiences = experiences.filter((exp) =>
        validSubcategoryIds.includes(exp.subcategoryId)
      );
    }

    // Apply sorting
    if (args.sortBy) {
      switch (args.sortBy) {
        case "popular":
          experiences = experiences.sort((a, b) => {
            const aPopular = (a as any).isPopular ? 1 : 0;
            const bPopular = (b as any).isPopular ? 1 : 0;
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
      if (!subcategory) continue;

      if (!subcategoryMap.has(subcategory.subcategoryName)) {
        subcategoryMap.set(subcategory.subcategoryName, {
          subcategoryName: subcategory.subcategoryName,
          experiences: [],
        });
      }
      subcategoryMap.get(subcategory.subcategoryName).experiences.push(exp);
    }

    // 4) Convert Map to Array with image URLs
    const subcategories = await Promise.all(
      Array.from(subcategoryMap.values()).map(async (sub: any) => ({
        subcategoryName: sub.subcategoryName,
        experiences: await Promise.all(
          sub.experiences.map((exp: any) =>
            structureExperienceWithImageUrls(ctx, exp)
          )
        ),
      }))
    );

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

      if (!category || !subcategory) continue;

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
    const allCityTopExperiences = allCityExperiences.filter(
      (exp) => (exp as any).isTopExperience === true
    );

    for (const exp of allCityTopExperiences) {
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

      if (!category || !subcategory) continue;

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
    const allCategoriesResult: any[] = [];
    for (const [categoryName, subcategoryMap] of allCategoriesMap.entries()) {
      const subcategories: any[] = [];
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
    const structuredAllCategories = await Promise.all(
      allCategoriesResult.map(async (category) => ({
        categoryName: category.categoryName,
        subcategories: await Promise.all(
          category.subcategories.map(async (subcategory: any) => ({
            subcategoryName: subcategory.subcategoryName,
            experiences: await Promise.all(
              subcategory.experiences.map((exp: any) => structureExperienceWithImageUrls(ctx, exp))
            )
          }))
        )
      }))
    );

    return {
      category: {
        categoryName: categoryDoc.categoryName,
        subcategories,
      },
      experiences: await Promise.all(
        experiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))
      ),
      reviews: await Promise.all(
        reviews.map((review) => structureReviewWithImageUrls(ctx, review))
      ),
      allCategories: structuredAllCategories,
    };
  },
});

// ===== SUBCATEGORY PAGE QUERIES =====

// Get all data for Subcategory page with structured hierarchy
export const getSubcategoryPageData = query({
  args: {
    cityId: v.id("city"),
    categoryId: v.id("category"),
    subcategoryName: v.string(),
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
    const specificExperiences = allCityExperiences.filter(
      (exp) => exp.categoryId === args.categoryId && exp.subcategoryId === subcategoryDoc._id
    );

    // Filter by categoryId only (all experiences in this category for subcategories list)
    const allCategoryExperiences = allCityExperiences.filter(
      (exp) => exp.categoryId === args.categoryId
    );

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

      if (!category || !subcategory) continue;

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
    const allCityTopExperiences = allCityExperiences.filter(
      (exp) => (exp as any).isTopExperience === true
    );

    for (const exp of allCityTopExperiences) {
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

      if (!category || !subcategory) continue;

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
    const allCategoriesResult: any[] = [];
    for (const [categoryName, subcategoryMap] of allCategoriesMap.entries()) {
      const subcategories: any[] = [];
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
    const structuredAllCategories = await Promise.all(
      allCategoriesResult.map(async (category) => ({
        categoryName: category.categoryName,
        subcategories: await Promise.all(
          category.subcategories.map(async (subcategory: any) => ({
            subcategoryName: subcategory.subcategoryName,
            experiences: await Promise.all(
              subcategory.experiences.map((exp: any) => structureExperienceWithImageUrls(ctx, exp))
            )
          }))
        )
      }))
    );

    return {
      category: {
        categoryName: categoryDoc.categoryName,
        subcategories: Array.from(subcategoryNames), // Just names, no experiences
      },
      subcategory: {
        subcategoryName: subcategoryDoc.subcategoryName,
      },
      experiences: await Promise.all(
        specificExperiences.map((exp) => structureExperienceWithImageUrls(ctx, exp))
      ),
      allCategories: structuredAllCategories,
      reviewStats,
    };
  },
});
