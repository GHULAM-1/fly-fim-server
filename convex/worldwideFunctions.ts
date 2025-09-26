import { query } from "./_generated/server";
import { v } from "convex/values";

// Helper function to validate if a string is a valid Convex storage ID
const isValidStorageId = (id: string): boolean => {
  return !/[\/\.]/.test(id) && /^[a-z0-9]+$/i.test(id) && id.length > 20;
};

// Helper function to safely get image URL
const safeGetImageUrl = async (ctx: any, imageId: string): Promise<string | null> => {
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

// Helper function to structure experience with only required fields and resolved image URLs
const structureSimplifiedExperience = async (ctx: any, experience: any) => {
  // Get city, category, and subcategory data
  const city = await ctx.db.get(experience.cityId);
  const category = await ctx.db.get(experience.categoryId);
  const subcategory = await ctx.db.get(experience.subcategoryId);

  // Resolve images array URLs
  let imageUrls: (string | null)[] = [];
  if (experience.images && Array.isArray(experience.images)) {
    imageUrls = await Promise.all(
      experience.images.map((imageId: string) => safeGetImageUrl(ctx, imageId))
    );
  }

  return {
    _id: experience._id,
    title: experience.title,
    cityName: city?.cityName || '',
    cityId: experience.cityId,
    categoryName: category?.categoryName || '',
    categoryId: experience.categoryId,
    subcategoryId: experience.subcategoryId,
    subcategoryName: subcategory?.subcategoryName || '',
    price: experience.price,
    oldPrice: experience.oldPrice,
    tagOnCards: experience.tagOnCards,
    images: experience.images,
    imageUrls
  };
};

// Helper function to structure review with resolved image URLs and experience title
const structureReviewWithImageUrls = async (ctx: any, review: any) => {
  // Get experience data to get the title
  const experience = await ctx.db.get(review.experienceId);

  // Get user data to get the name
  const user = await ctx.db.query("users").filter((q: any) => q.eq(q.field("providerId"), review.userId)).first();

  let imageUrls: (string | null)[] = [];
  if (review.images && Array.isArray(review.images)) {
    imageUrls = await Promise.all(
      review.images.map((imageId: string) => safeGetImageUrl(ctx, imageId))
    );
  }

  return {
    ...review,
    experienceTitle: experience?.title || '',
    userName: user?.name || 'Anonymous User',
    imageUrls
  };
};

// Helper function to structure experience with full data and resolved image URLs (like original category page)
const structureFullExperienceWithImageUrls = async (ctx: any, experience: any) => {
  // Resolve main image URL
  let mainImageUrl: string | null = null;
  if (experience.mainImage) {
    if (Array.isArray(experience.mainImage)) {
      mainImageUrl = await safeGetImageUrl(ctx, experience.mainImage[0]);
    } else {
      mainImageUrl = await safeGetImageUrl(ctx, experience.mainImage);
    }
  }

  // Resolve images array URLs
  let imageUrls: (string | null)[] = [];
  if (experience.images && Array.isArray(experience.images)) {
    imageUrls = await Promise.all(
      experience.images.map((imageId: string) => safeGetImageUrl(ctx, imageId))
    );
  }

  return {
    ...experience,
    mainImageUrl,
    imageUrls
  };
};

// Get category page data - same structure as experienceFunctions:getCategoryPageData but for all cities
export const getCategoryPageData = query({
  args: { categoryId: v.id("category") },
  handler: async (ctx, args) => {
    // Helper function to structure experience with detailed sections (like experienceFunctions)
    const structureDetailedExperience = async (exp: any) => {
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

      // Get relationships
      const city = await ctx.db.get(exp.cityId);
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

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
          yourExperience: exp.youExperience,
          knowBeforeYouGo: exp.knowBeforeYouGo,
          myTickets: exp.myTickets,
          whereTo: exp.whereTo,
          exploreMore: exp.exploreMore,
        },
        calendar: {
          datePriceRange: exp.datePriceRange,
          packageType: exp.packageType,
          adultPrice: exp.adultPrice,
          childPrice: exp.childPrice,
          infantPrice: exp.infantPrice,
          totalLimit: exp.totalLimit,
        },
        itinerary: exp.itinerary,
        relationships: {
          cityName: (city as any)?.cityName || '',
          categoryName: (category as any)?.categoryName || '',
          subcategoryName: (subcategory as any)?.subcategoryName || ''
        }
      };
    };

    // 1) Get category document
    const categoryDoc = await ctx.db.get(args.categoryId);

    if (!categoryDoc) {
      return {
        category: null,
        subcategories: [],
        topExperiences: [],
        popularExperiences: [],
        reviews: [],
      };
    }

    // 2) Get all experiences for this category (across all cities)
    const experiences = await ctx.db
      .query("experience")
      .withIndex("byCategory", (q) => q.eq("categoryId", args.categoryId))
      .collect();

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

    // 6) Get all unique subcategories for this category and group experiences
    const subcategoryIds = [...new Set(experiences.map(exp => exp.subcategoryId))];
    const subcategoriesWithExperiences = [];

    for (const subcategoryId of subcategoryIds) {
      const subcategoryDoc = await ctx.db.get(subcategoryId);
      if (subcategoryDoc) {
        // Get regular experiences for this subcategory (excluding top/popular to avoid duplicates)
        const subcategoryExperiences = regularExperiences.filter(exp => exp.subcategoryId === subcategoryId);

        // Structure experiences with detailed sections
        const structuredExperiences = await Promise.all(
          subcategoryExperiences.map(exp => structureDetailedExperience(exp))
        );

        subcategoriesWithExperiences.push({
          ...subcategoryDoc,
          experiences: structuredExperiences,
        });
      }
    }

    // 8) Structure top and popular experiences with detailed sections
    const structuredTopExperiences = await Promise.all(
      topExperiences.map(exp => structureDetailedExperience(exp))
    );

    const structuredPopularExperiences = await Promise.all(
      popularExperiences.map(exp => structureDetailedExperience(exp))
    );

    // 9) Get all reviews for experiences in this category
    const experienceIds = experiences.map(exp => exp._id);
    const allReviews = [];

    for (const expId of experienceIds) {
      const expReviews = await ctx.db
        .query("reviews")
        .withIndex("byExperience", (q) => q.eq("experienceId", expId))
        .collect();
      allReviews.push(...expReviews);
    }

    const reviewsWithUrls = await Promise.all(
      allReviews.map((review) => structureReviewWithImageUrls(ctx, review))
    );

    // 10) Get all categories and subcategories (across all cities) with top experiences (max 15 per subcategory)
    const allExperiences = await ctx.db.query("experience").collect();
    const allCategoriesMap = new Map();

    // Create a map of category -> subcategories based on all experiences
    for (const exp of allExperiences) {
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

      if (!category || !subcategory) continue;

      const categoryName = (category as any).categoryName;
      const subcategoryName = (subcategory as any).subcategoryName;

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
    const allTopExperiences = allExperiences.filter(
      (exp) => (exp as any).isTopExperience === true
    );

    for (const exp of allTopExperiences) {
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

      if (!category || !subcategory) continue;

      const categoryName = (category as any).categoryName;
      const subcategoryName = (subcategory as any).subcategoryName;

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

    // Structure experiences with detailed sections for allCategories
    const structuredAllCategories = await Promise.all(
      allCategoriesResult.map(async (category) => ({
        categoryName: category.categoryName,
        subcategories: await Promise.all(
          category.subcategories.map(async (subcategory: any) => ({
            subcategoryName: subcategory.subcategoryName,
            experiences: await Promise.all(
              subcategory.experiences.map((exp: any) => structureDetailedExperience(exp))
            )
          }))
        )
      }))
    );

    // 11) Return the structure with categories array (current category only) and allCategories
    return {
      categories: [
        {
          categoryName: (categoryDoc as any).categoryName,
          subcategories: subcategoriesWithExperiences,
        }
      ],
      topExperiences: structuredTopExperiences,
      popularExperiences: structuredPopularExperiences,
      reviews: reviewsWithUrls,
      allCategories: structuredAllCategories,
    };
  },
});

// Get filtered category page data with sorting
export const getFilteredCategoryPageData = query({
  args: {
    categoryId: v.id("category"),
    sortBy: v.optional(v.union(
      v.literal("popular"),
      v.literal("lowToHigh"),
      v.literal("highToLow")
    ))
  },
  handler: async (ctx, args) => {
    // Helper function to structure experience with detailed sections (like experienceFunctions)
    const structureDetailedExperience = async (exp: any) => {
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

      // Get relationships
      const city = await ctx.db.get(exp.cityId);
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

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
          yourExperience: exp.youExperience,
          knowBeforeYouGo: exp.knowBeforeYouGo,
          myTickets: exp.myTickets,
          whereTo: exp.whereTo,
          exploreMore: exp.exploreMore,
        },
        calendar: {
          datePriceRange: exp.datePriceRange,
          packageType: exp.packageType,
          adultPrice: exp.adultPrice,
          childPrice: exp.childPrice,
          infantPrice: exp.infantPrice,
          totalLimit: exp.totalLimit,
        },
        itinerary: exp.itinerary,
        relationships: {
          cityName: (city as any)?.cityName || '',
          categoryName: (category as any)?.categoryName || '',
          subcategoryName: (subcategory as any)?.subcategoryName || ''
        }
      };
    };

    // 1) Get category document
    const categoryDoc = await ctx.db.get(args.categoryId);

    if (!categoryDoc) {
      return {
        categories: [],
        topExperiences: [],
        popularExperiences: [],
        reviews: [],
        allCategories: [],
      };
    }

    // 2) Get all experiences for this category (across all cities)
    let experiences = await ctx.db
      .query("experience")
      .withIndex("byCategory", (q) => q.eq("categoryId", args.categoryId))
      .collect();

    // 3) Apply sorting if provided
    if (args.sortBy) {
      switch (args.sortBy) {
        case "popular":
          // Sort by popular tag on cards
          experiences = experiences.sort((a, b) => {
            const aPopular = (a as any).tagOnCards?.toLowerCase().includes('popular') ? 1 : 0;
            const bPopular = (b as any).tagOnCards?.toLowerCase().includes('popular') ? 1 : 0;
            if (aPopular !== bPopular) return bPopular - aPopular;
            return a.title.localeCompare(b.title); // Alphabetical as secondary sort
          });
          break;
        case "lowToHigh":
          experiences = experiences.sort((a, b) => a.price - b.price);
          break;
        case "highToLow":
          experiences = experiences.sort((a, b) => b.price - a.price);
          break;
      }
    }

    // 4) Filter experiences by hierarchy flags
    const topExperiences = experiences.filter(
      (exp) => (exp as any).isTopExperience === true
    );
    const popularExperiences = experiences.filter(
      (exp) => (exp as any).isPopular === true
    );

    // 5) Get IDs of experiences that are already in hierarchy sections
    const hierarchyExpIds = new Set([
      ...topExperiences.map((exp) => exp._id),
      ...popularExperiences.map((exp) => exp._id),
    ]);

    // 6) Filter out experiences that are already in hierarchy sections
    const regularExperiences = experiences.filter(
      (exp) => !hierarchyExpIds.has(exp._id)
    );

    // 7) Get all unique subcategories for this category and group experiences
    const subcategoryIds = [...new Set(experiences.map(exp => exp.subcategoryId))];
    const subcategoriesWithExperiences = [];

    for (const subcategoryId of subcategoryIds) {
      const subcategoryDoc = await ctx.db.get(subcategoryId);
      if (subcategoryDoc) {
        // Get regular experiences for this subcategory (excluding top/popular to avoid duplicates)
        const subcategoryExperiences = regularExperiences.filter(exp => exp.subcategoryId === subcategoryId);

        // Structure experiences with detailed sections
        const structuredExperiences = await Promise.all(
          subcategoryExperiences.map(exp => structureDetailedExperience(exp))
        );

        subcategoriesWithExperiences.push({
          ...subcategoryDoc,
          experiences: structuredExperiences,
        });
      }
    }

    // 8) Structure top and popular experiences with detailed sections
    const structuredTopExperiences = await Promise.all(
      topExperiences.map(exp => structureDetailedExperience(exp))
    );

    const structuredPopularExperiences = await Promise.all(
      popularExperiences.map(exp => structureDetailedExperience(exp))
    );

    // 9) Get all reviews for experiences in this category
    const experienceIds = experiences.map(exp => exp._id);
    const allReviews = [];

    for (const expId of experienceIds) {
      const expReviews = await ctx.db
        .query("reviews")
        .withIndex("byExperience", (q) => q.eq("experienceId", expId))
        .collect();
      allReviews.push(...expReviews);
    }

    const reviewsWithUrls = await Promise.all(
      allReviews.map((review) => structureReviewWithImageUrls(ctx, review))
    );

    // 10) Get all categories and subcategories (across all cities) with top experiences (max 15 per subcategory)
    const allExperiences = await ctx.db.query("experience").collect();
    const allCategoriesMap = new Map();

    // Create a map of category -> subcategories based on all experiences
    for (const exp of allExperiences) {
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

      if (!category || !subcategory) continue;

      const categoryName = (category as any).categoryName;
      const subcategoryName = (subcategory as any).subcategoryName;

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
    const allTopExperiences = allExperiences.filter(
      (exp) => (exp as any).isTopExperience === true
    );

    for (const exp of allTopExperiences) {
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

      if (!category || !subcategory) continue;

      const categoryName = (category as any).categoryName;
      const subcategoryName = (subcategory as any).subcategoryName;

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

    // Structure experiences with detailed sections for allCategories
    const structuredAllCategories = await Promise.all(
      allCategoriesResult.map(async (category) => ({
        categoryName: category.categoryName,
        subcategories: await Promise.all(
          category.subcategories.map(async (subcategory: any) => ({
            subcategoryName: subcategory.subcategoryName,
            experiences: await Promise.all(
              subcategory.experiences.map((exp: any) => structureDetailedExperience(exp))
            )
          }))
        )
      }))
    );

    // 11) Return the structure with categories array (current category only) and allCategories
    return {
      categories: [
        {
          categoryName: (categoryDoc as any).categoryName,
          subcategories: subcategoriesWithExperiences,
        }
      ],
      topExperiences: structuredTopExperiences,
      popularExperiences: structuredPopularExperiences,
      reviews: reviewsWithUrls,
      allCategories: structuredAllCategories,
    };
  },
});

// Get worldwide subcategory page data
export const getWorldwideSubcategoryPageData = query({
  args: {
    categoryId: v.id("category"),
    subcategoryName: v.string(),
  },
  handler: async (ctx, args) => {
    // Helper function to structure experience with detailed sections
    const structureDetailedExperience = async (exp: any) => {
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

      // Get relationships
      const city = await ctx.db.get(exp.cityId);
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

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
          yourExperience: exp.youExperience,
          knowBeforeYouGo: exp.knowBeforeYouGo,
          myTickets: exp.myTickets,
          whereTo: exp.whereTo,
          exploreMore: exp.exploreMore,
        },
        calendar: {
          datePriceRange: exp.datePriceRange,
          packageType: exp.packageType,
          adultPrice: exp.adultPrice,
          childPrice: exp.childPrice,
          infantPrice: exp.infantPrice,
          totalLimit: exp.totalLimit,
        },
        itinerary: exp.itinerary,
        relationships: {
          cityName: (city as any)?.cityName || '',
          categoryName: (category as any)?.categoryName || '',
          subcategoryName: (subcategory as any)?.subcategoryName || ''
        }
      };
    };

    // 1) Get category and subcategory documents
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

    if (!categoryDoc || !subcategoryDoc) {
      return {
        category: null,
        subcategory: null,
        experiences: [],
      };
    }

    // 2) Get all experiences for this category and subcategory (across all cities)
    const experiences = await ctx.db
      .query("experience")
      .withIndex("byCategory", (q) => q.eq("categoryId", args.categoryId))
      .collect();

    // Filter by subcategory
    const subcategoryExperiences = experiences.filter(
      exp => exp.subcategoryId === subcategoryDoc._id
    );

    // 3) Structure experiences with detailed sections
    const structuredExperiences = await Promise.all(
      subcategoryExperiences.map(exp => structureDetailedExperience(exp))
    );

    // 4) Build categories array with all subcategories for this category (across all cities)
    const categoryExperiences = await ctx.db
      .query("experience")
      .withIndex("byCategory", (q) => q.eq("categoryId", args.categoryId))
      .collect();

    // Get unique subcategory IDs for this category
    const categorySubcategoryIds = [...new Set(categoryExperiences.map(exp => exp.subcategoryId))];
    const categorySubcategoryNames = [];

    for (const subId of categorySubcategoryIds) {
      const subDoc = await ctx.db.get(subId);
      if (subDoc) {
        categorySubcategoryNames.push((subDoc as any).subcategoryName);
      }
    }

    // 5) Build allCategories array with comprehensive structure
    const allExperiences = await ctx.db.query("experience").collect();
    const allCategoriesMap = new Map();

    // Create a map of category -> subcategories based on all experiences
    for (const exp of allExperiences) {
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

      if (!category || !subcategory) continue;

      const categoryName = (category as any).categoryName;
      const subcategoryName = (subcategory as any).subcategoryName;

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
    const allTopExperiences = allExperiences.filter(
      (exp) => (exp as any).isTopExperience === true
    );

    for (const exp of allTopExperiences) {
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

      if (!category || !subcategory) continue;

      const categoryName = (category as any).categoryName;
      const subcategoryName = (subcategory as any).subcategoryName;

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

    // Structure experiences with detailed sections for allCategories
    const structuredAllCategories = await Promise.all(
      allCategoriesResult.map(async (category) => ({
        categoryName: category.categoryName,
        subcategories: await Promise.all(
          category.subcategories.map(async (subcategory: any) => ({
            subcategoryName: subcategory.subcategoryName,
            experiences: await Promise.all(
              subcategory.experiences.map((exp: any) => structureDetailedExperience(exp))
            )
          }))
        )
      }))
    );

    // 6) Calculate review stats for this subcategory
    const subcategoryExperienceIds = subcategoryExperiences.map(exp => exp._id);
    const allReviews = [];

    for (const expId of subcategoryExperienceIds) {
      const expReviews = await ctx.db
        .query("reviews")
        .withIndex("byExperience", (q) => q.eq("experienceId", expId))
        .collect();
      allReviews.push(...expReviews);
    }

    const reviewStats = {
      averageRating: allReviews.length > 0
        ? allReviews.reduce((sum, review) => sum + review.stars, 0) / allReviews.length
        : 0,
      totalReviews: allReviews.length
    };

    return {
      category: {
        categoryName: (categoryDoc as any).categoryName,
        subcategories: categorySubcategoryNames,
      },
      subcategory: {
        subcategoryName: (subcategoryDoc as any).subcategoryName,
      },
      experiences: structuredExperiences,
      allCategories: structuredAllCategories,
      reviewStats,
    };
  },
});

// Get filtered worldwide subcategory page data with sorting
export const getWorldwideSubcategoryPageDataFiltered = query({
  args: {
    categoryId: v.id("category"),
    subcategoryName: v.string(),
    sortBy: v.optional(v.union(
      v.literal("popular"),
      v.literal("lowToHigh"),
      v.literal("highToLow")
    ))
  },
  handler: async (ctx, args) => {
    // Helper function to structure experience with detailed sections
    const structureDetailedExperience = async (exp: any) => {
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

      // Get relationships
      const city = await ctx.db.get(exp.cityId);
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

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
          yourExperience: exp.youExperience,
          knowBeforeYouGo: exp.knowBeforeYouGo,
          myTickets: exp.myTickets,
          whereTo: exp.whereTo,
          exploreMore: exp.exploreMore,
        },
        calendar: {
          datePriceRange: exp.datePriceRange,
          packageType: exp.packageType,
          adultPrice: exp.adultPrice,
          childPrice: exp.childPrice,
          infantPrice: exp.infantPrice,
          totalLimit: exp.totalLimit,
        },
        itinerary: exp.itinerary,
        relationships: {
          cityName: (city as any)?.cityName || '',
          categoryName: (category as any)?.categoryName || '',
          subcategoryName: (subcategory as any)?.subcategoryName || ''
        }
      };
    };

    // 1) Get category and subcategory documents
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

    if (!categoryDoc || !subcategoryDoc) {
      return {
        category: {
          categoryName: '',
          subcategories: [],
        },
        subcategory: {
          subcategoryName: '',
        },
        experiences: [],
        allCategories: [],
        reviewStats: {
          averageRating: 0,
          totalReviews: 0
        },
      };
    }

    // 2) Get all experiences for this category and subcategory (across all cities)
    let experiences = await ctx.db
      .query("experience")
      .withIndex("byCategory", (q) => q.eq("categoryId", args.categoryId))
      .collect();

    // Filter by subcategory
    let subcategoryExperiences = experiences.filter(
      exp => exp.subcategoryId === subcategoryDoc._id
    );

    // 3) Apply sorting if provided
    if (args.sortBy) {
      switch (args.sortBy) {
        case "popular":
          // Sort by popular tag on cards
          subcategoryExperiences = subcategoryExperiences.sort((a, b) => {
            const aPopular = (a as any).tagOnCards?.toLowerCase().includes('popular') ? 1 : 0;
            const bPopular = (b as any).tagOnCards?.toLowerCase().includes('popular') ? 1 : 0;
            if (aPopular !== bPopular) return bPopular - aPopular;
            return a.title.localeCompare(b.title); // Alphabetical as secondary sort
          });
          break;
        case "lowToHigh":
          subcategoryExperiences = subcategoryExperiences.sort((a, b) => a.price - b.price);
          break;
        case "highToLow":
          subcategoryExperiences = subcategoryExperiences.sort((a, b) => b.price - a.price);
          break;
      }
    }

    // 4) Structure experiences with detailed sections
    const structuredExperiences = await Promise.all(
      subcategoryExperiences.map(exp => structureDetailedExperience(exp))
    );

    // 5) Build categories array with all subcategories for this category (across all cities)
    const categoryExperiences = await ctx.db
      .query("experience")
      .withIndex("byCategory", (q) => q.eq("categoryId", args.categoryId))
      .collect();

    // Get unique subcategory IDs for this category
    const categorySubcategoryIds = [...new Set(categoryExperiences.map(exp => exp.subcategoryId))];
    const categorySubcategoryNames = [];

    for (const subId of categorySubcategoryIds) {
      const subDoc = await ctx.db.get(subId);
      if (subDoc) {
        categorySubcategoryNames.push((subDoc as any).subcategoryName);
      }
    }

    // 6) Build allCategories array with comprehensive structure
    const allExperiences = await ctx.db.query("experience").collect();
    const allCategoriesMap = new Map();

    // Create a map of category -> subcategories based on all experiences
    for (const exp of allExperiences) {
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

      if (!category || !subcategory) continue;

      const categoryName = (category as any).categoryName;
      const subcategoryName = (subcategory as any).subcategoryName;

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
    const allTopExperiences = allExperiences.filter(
      (exp) => (exp as any).isTopExperience === true
    );

    for (const exp of allTopExperiences) {
      const category = await ctx.db.get(exp.categoryId);
      const subcategory = await ctx.db.get(exp.subcategoryId);

      if (!category || !subcategory) continue;

      const categoryName = (category as any).categoryName;
      const subcategoryName = (subcategory as any).subcategoryName;

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

    // Structure experiences with detailed sections for allCategories
    const structuredAllCategories = await Promise.all(
      allCategoriesResult.map(async (category) => ({
        categoryName: category.categoryName,
        subcategories: await Promise.all(
          category.subcategories.map(async (subcategory: any) => ({
            subcategoryName: subcategory.subcategoryName,
            experiences: await Promise.all(
              subcategory.experiences.map((exp: any) => structureDetailedExperience(exp))
            )
          }))
        )
      }))
    );

    // 7) Calculate review stats for this subcategory
    const subcategoryExperienceIds = subcategoryExperiences.map(exp => exp._id);
    const allReviews = [];

    for (const expId of subcategoryExperienceIds) {
      const expReviews = await ctx.db
        .query("reviews")
        .withIndex("byExperience", (q) => q.eq("experienceId", expId))
        .collect();
      allReviews.push(...expReviews);
    }

    const reviewStats = {
      averageRating: allReviews.length > 0
        ? allReviews.reduce((sum, review) => sum + review.stars, 0) / allReviews.length
        : 0,
      totalReviews: allReviews.length
    };

    return {
      category: {
        categoryName: (categoryDoc as any).categoryName,
        subcategories: categorySubcategoryNames,
      },
      subcategory: {
        subcategoryName: (subcategoryDoc as any).subcategoryName,
      },
      experiences: structuredExperiences,
      allCategories: structuredAllCategories,
      reviewStats,
    };
  },
});

// Get worldwide data for landing page
export const getWorldwideData = query({
  args: {},
  handler: async (ctx) => {
    // Get all experiences with simplified structure and image URLs
    const experiences = await ctx.db.query("experience").collect();
    const simplifiedExperiences = await Promise.all(
      experiences.map((experience) => structureSimplifiedExperience(ctx, experience))
    );

    // Get all categories
    const categories = await ctx.db.query("category").collect();

    // Get all subcategories
    const subcategories = await ctx.db.query("subcategory").collect();

    // Create categories with only linked subcategories (based on experiences)
    const categoriesWithSubcategories = await Promise.all(
      categories.map(async (category) => {
        // Find experiences for this category
        const categoryExperiences = await ctx.db
          .query("experience")
          .withIndex("byCategory", (q) => q.eq("categoryId", category._id))
          .collect();

        // Get unique subcategory IDs used by experiences in this category
        const usedSubcategoryIds = [...new Set(
          categoryExperiences.map(exp => exp.subcategoryId)
        )];

        // Filter subcategories to only include those actually used
        const linkedSubcategories = subcategories.filter(sub =>
          usedSubcategoryIds.includes(sub._id)
        );

        return {
          ...category,
          subcategories: linkedSubcategories
        };
      })
    );

    // Get all reviews with image URLs
    const reviews = await ctx.db.query("reviews").collect();
    const reviewsWithUrls = await Promise.all(
      reviews.map((review) => structureReviewWithImageUrls(ctx, review))
    );

    // Get all cities for additional context
    const cities = await ctx.db.query("city").collect();
    const citiesWithUrls = await Promise.all(
      cities.map(async (city) => ({
        ...city,
        imageUrl: city.image ? await safeGetImageUrl(ctx, city.image) : null
      }))
    );

    return {
      experiences: simplifiedExperiences,
      categories: categoriesWithSubcategories,
      reviews: reviewsWithUrls,
    };
  },
});