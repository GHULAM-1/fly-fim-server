import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  // ----------------------------
  // Experience (parent)
  // ----------------------------
  experience: defineTable({
    type: v.string(),
    title: v.string(), // unique (enforce in code)
    price: v.string(),
    sale: v.string(),
    images: v.array(v.id("_storage")),
    mainImage: v.id("_storage"), // Required again since we have real data
    experienceType: v.string(),
    tagOnCards: v.string(),
    features: v.array(v.string()), // enforce length=6 in code
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
        startDate: v.number(), // ms since epoch
        endDate: v.number(),
        openTime: v.string(),  // "HH:mm"
        closeTime: v.string(),
        lastEntryTime: v.string(),
        title: v.string(),
      })
    ),
    whereTo: v.object({
      address: v.string(),
      lat: v.number(),
      lng: v.number(),
    }),
    datePriceRange: v.array(
      v.object({
        startDate: v.number(),
        endDate: v.number(),
        price: v.string(),
      })
    ),
    packageType: v.object({
      name: v.string(),  // enum candidate
      price: v.string(),
      points: v.array(
        v.object({
          title: v.string(),
          subpoints: v.optional(v.array(v.string())),
        })
      ),
      // combo (openTime, closeTime, price) should be unique within this array – enforce in code
      timePriceSlots: v.array(
        v.object({
          openTime: v.string(),
          closeTime: v.string(),
          price: v.string(),
        })
      ),
    }),
    adultPrice: v.string(),
    childPrice: v.string(),
    seniorPrice: v.string(),
    totalLimit: v.string(),
  })
    .index("byTitle", ["title"]),
  // ----------------------------
  // Category (child of Experience; sibling to City/Subcategory/FAQ)
  // Uniqueness: (experienceId, categoryName) should be unique → enforce in code
  // ----------------------------
  category: defineTable({
    experienceId: v.id("experience"),
    categoryName: v.string(), // enum candidate
  })
    .index("byExperience", ["experienceId"])
    .index("byExperienceAndCategoryName", ["experienceId", "categoryName"])
    .index("byCategoryName", ["categoryName"]),

  // ----------------------------
  // Subcategory (child of Experience; sibling)
  // Uniqueness: (experienceId, subcategoryName) should be unique → enforce in code
  // ----------------------------
  subcategory: defineTable({
    experienceId: v.id("experience"),
    subcategoryName: v.string(), // enum candidate
  })
    .index("byExperience", ["experienceId"])
    .index("byExperienceAndSubcategoryName", ["experienceId", "subcategoryName"])
    .index("bySubcategoryName", ["subcategoryName"]),

  // ----------------------------
  // City (child of Experience; sibling)
  // You originally required cityName and countryName unique. We'll keep global lookups,
  // AND add an experienceId so it sits under an experience as you requested.
  // If you need uniqueness per experience instead of globally, check (experienceId, cityName, countryName).
  // ----------------------------
  city: defineTable({
    experienceId: v.id("experience"),
    cityName: v.string(),    // originally unique
    countryName: v.string(), // originally unique
  })
    .index("byExperience", ["experienceId"])
    .index("byCityName", ["cityName"])
    .index("byCountryName", ["countryName"])
    // Optional per-experience uniqueness check in code using:
    // .index("byExperienceCityCountry", ["experienceId", "cityName", "countryName"])
  ,
  // ----------------------------
  // FAQ (child of Experience; sibling)
  // ----------------------------
  faq: defineTable({
    experienceId: v.id("experience"),
    question: v.string(),
    answer: v.string(),
  })
    .index("byExperience", ["experienceId"]),
  // ----------------------------
  // Reviews (separate; linked to Experience)
  // ----------------------------
  reviews: defineTable({
    userId: v.string(),                // keep string (no users table defined)
    experienceId: v.id("experience"),
    stars: v.number(),
    images: v.array(v.id("_storage")),
    text: v.string(),
  })
    .index("byExperience", ["experienceId"])
    .index("byUser", ["userId"]),
});