import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  experience: defineTable({
    type: v.string(),
    title: v.string(),
    description: v.string(),
    price: v.number(),
    oldPrice: v.optional(v.number()),
    sale: v.optional(v.number()),
    images: v.array(v.string()),
    mainImage: v.string(),
    experienceType: v.string(),
    tagOnCards: v.optional(v.string()),
    rating: v.number(),
    reviews: v.number(),
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
        startDate: v.number(),
        endDate: v.number(),
        openTime: v.string(),
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
        price: v.number(),
      })
    ),
    packageType: v.object({
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
    }),
    adultPrice: v.number(),
    childPrice: v.number(),
    seniorPrice: v.number(),
    totalLimit: v.number(),
  }).index("byTitle", ["title"]),

  category: defineTable({
    experienceId: v.id("experience"),
    categoryName: v.string(),
  })
    .index("byExperience", ["experienceId"])
    .index("byExperienceAndCategoryName", ["experienceId", "categoryName"])
    .index("byCategoryName", ["categoryName"]),
  subcategory: defineTable({
    experienceId: v.id("experience"),
    subcategoryName: v.string(),
  })
    .index("byExperience", ["experienceId"])
    .index("byExperienceAndSubcategoryName", [
      "experienceId",
      "subcategoryName",
    ])
    .index("bySubcategoryName", ["subcategoryName"]),
  city: defineTable({
    experienceId: v.id("experience"),
    cityName: v.string(),
    countryName: v.string(),
  })
    .index("byExperience", ["experienceId"])
    .index("byCityName", ["cityName"])
    .index("byCountryName", ["countryName"]),
  faq: defineTable({
    experienceId: v.id("experience"),
    question: v.string(),
    answer: v.string(),
  }).index("byExperience", ["experienceId"]),
  reviews: defineTable({
    userId: v.string(),
    experienceId: v.id("experience"),
    stars: v.number(),
    images: v.array(v.string()),
    text: v.string(),
  })
    .index("byExperience", ["experienceId"])
    .index("byUser", ["userId"]),
});
