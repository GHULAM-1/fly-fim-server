import { query } from "./_generated/server";
import { v } from "convex/values";

// Helper function to validate if a string is a valid Convex storage ID
const isValidStorageId = (id: string): boolean => {
  return !/[\\/\\.]/.test(id) && /^[a-z0-9]+$/i.test(id) && id.length > 20;
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

// General search function for cities and experiences
export const generalSearch = query({
  args: {
    query: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const searchQuery = args.query?.toLowerCase().trim() || '';
    const limit = args.limit || 5;

    // Helper function to shuffle array
    const shuffleArray = (array: any[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Get all cities with image URLs
    const allCities = await ctx.db.query("city").collect();
    const citiesWithUrls = await Promise.all(
      allCities.map(async (city) => ({
        ...city,
        imageUrl: city.image ? await safeGetImageUrl(ctx, city.image) : null
      }))
    );

    // Get all experiences
    const allExperiences = await ctx.db.query("experience").collect();

    let filteredCities: any[] = [];
    let filteredExperiences: any[] = [];

    // Always return random experiences (5-10) regardless of search query
    const experienceLimit = Math.max(5, Math.min(10, limit)); // Ensure 5-10 experiences
    filteredExperiences = shuffleArray(allExperiences).slice(0, experienceLimit);

    if (searchQuery === '') {
      // Return random cities when query is empty
      filteredCities = shuffleArray(citiesWithUrls).slice(0, limit);
    } else {
      // Search cities by cityName and countryName
      filteredCities = citiesWithUrls.filter(city =>
        city.cityName.toLowerCase().includes(searchQuery) ||
        city.countryName.toLowerCase().includes(searchQuery)
      ).slice(0, limit);
    }

    // Structure experiences with simplified data and image URLs
    const structuredExperiences = await Promise.all(
      filteredExperiences.map(async (experience) => {
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

        // Resolve main image URL
        let mainImageUrl: string | null = null;
        if (experience.mainImage) {
          if (Array.isArray(experience.mainImage)) {
            mainImageUrl = await safeGetImageUrl(ctx, experience.mainImage[0]);
          } else {
            mainImageUrl = await safeGetImageUrl(ctx, experience.mainImage);
          }
        }

        return {
          _id: experience._id,
          title: experience.title,
          description: experience.description,
          cityName: (city as any)?.cityName || '',
          cityId: experience.cityId,
          categoryName: (category as any)?.categoryName || '',
          categoryId: experience.categoryId,
          subcategoryId: experience.subcategoryId,
          subcategoryName: (subcategory as any)?.subcategoryName || '',
          price: experience.price,
          oldPrice: experience.oldPrice,
          tagOnCards: experience.tagOnCards,
          images: experience.images,
          imageUrls,
          mainImageUrl
        };
      })
    );

    return {
      cities: filteredCities,
      experiences: structuredExperiences,
      searchQuery: searchQuery || 'random',
      totalResults: {
        cities: filteredCities.length,
        experiences: structuredExperiences.length
      }
    };
  },
});