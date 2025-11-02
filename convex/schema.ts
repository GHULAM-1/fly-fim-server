import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  experience: defineTable({
    featureText: v.optional(v.string()),
    ticketValidity: v.optional(v.string()),


    title: v.string(),
    description: v.string(),
    price: v.number(),
    oldPrice: v.optional(v.number()),
    sale: v.optional(v.number()),
    images: v.array(v.string()),
    mainImage: v.optional(v.array(v.string())),
    tagOnCards: v.optional(v.string()),
    features: v.array(v.string()),

//remaining fields
    highlights: v.optional(v.string()),
    inclusions: v.optional(v.string()),
    exclusions: v.optional(v.string()),
    cancellationPolicy: v.optional(v.string()),
    youExperience:v.optional(v.string()),
    knowBeforeYouGo: v.optional(v.string()),
    myTickets: v.optional(v.string()),
    exploreMore: v.optional(v.string()),
    
    // Itinerary (Optional)
    blogSlug: v.optional(v.array(v.string())),
    //till
    
    itinerary: v.optional(v.object({
      title: v.string(),
      totalDuration: v.optional(v.string()),
      modeOfTransport: v.optional(v.string()),
      startPoint: v.object({
        name: v.string(),
        description: v.optional(v.string()),
        image: v.optional(v.string()),
        duration: v.optional(v.string()),
        location: v.optional(v.object({
          address: v.optional(v.string()),
          lat: v.optional(v.number()),
          lng: v.optional(v.number()),
        })),
        highlights: v.optional(v.array(v.object({
          name: v.string(),
          image: v.optional(v.string()),
          description: v.optional(v.string()),
        }))),
        thingsToDo: v.optional(v.array(v.object({
          name: v.string(),
          image: v.optional(v.string()),
          description: v.optional(v.string()),
        }))),
        nearbyThingsToDo: v.optional(v.array(v.object({
          name: v.string(),
          image: v.optional(v.string()),
          description: v.optional(v.string()),
        }))),
      }),
      points: v.array(v.object({
        order: v.number(),
        name: v.string(),
        description: v.optional(v.string()),
        image: v.optional(v.string()),
        duration: v.optional(v.string()),
        distance: v.optional(v.string()),
        travelTime: v.optional(v.string()),
        location: v.optional(v.object({
          address: v.optional(v.string()),
          lat: v.optional(v.number()),
          lng: v.optional(v.number()),
        })),
        highlights: v.optional(v.array(v.object({
          name: v.string(),
          image: v.optional(v.string()),
          description: v.optional(v.string()),
        }))),
        thingsToDo: v.optional(v.array(v.object({
          name: v.string(),
          image: v.optional(v.string()),
          description: v.optional(v.string()),
        }))),
        attractions: v.optional(v.number()),
        ticketsIncluded: v.optional(v.boolean()),
        nearbyThingsToDo: v.optional(v.array(v.object({
          name: v.string(),
          image: v.optional(v.string()),
          description: v.optional(v.string()),
        }))),
      })),
      endPoint: v.object({
        name: v.string(),
        description: v.optional(v.string()),
        image: v.optional(v.string()),
        location: v.optional(v.object({
          address: v.optional(v.string()),
          lat: v.optional(v.number()),
          lng: v.optional(v.number()),
        })),
      }),
    })),
    operatingHours: v.array(
      v.object({
        startDate: v.string(),
        endDate: v.string(),
        openTime: v.string(),
        closeTime: v.string(),
        lastEntryTime: v.string(),
        title: v.string(),
        excludedDays: v.optional(v.array(v.string())),
      })
    ),
    whereTo: v.object({
      address: v.string(),
      lat: v.number(),
      lng: v.number(),
    }),
    datePriceRange: v.array(
      v.object({
        startDate: v.string(),
        endDate: v.string(),
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
    infantPrice: v.number(),
    totalLimit: v.number(),


    // UI Hierarchy Fields
    isMainCard: v.optional(v.boolean()),
    isTopExperience: v.optional(v.boolean()),
    isMustDo: v.optional(v.boolean()),
    isPopular: v.optional(v.boolean()),


    
    // Relationship Fields
    categoryId: v.id("category"),
    subcategoryId: v.id("subcategory"),
    cityId: v.id("city"),
  })
    .index("byTitle", ["title"])
    .index("byTopExperience", ["isTopExperience"])
    .index("byMustDo", ["isMustDo"])
    .index("byPopular", ["isPopular"])
    .index("byMainCard", ["isMainCard"])
    .index("byCategory", ["categoryId"])
    .index("bySubcategory", ["subcategoryId"])
    .index("byCity", ["cityId"]),

  category: defineTable({
    categoryName: v.string(),
  })
    .index("byCategoryName", ["categoryName"]),
  subcategory: defineTable({
    subcategoryName: v.string(),
  })
    .index("bySubcategoryName", ["subcategoryName"]),
  city: defineTable({
    image: v.optional(v.string()),
    cityName: v.string(),
    countryName: v.string(),
  })
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

  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    image: v.optional(v.string()),
    provider: v.string(),
    providerId: v.string(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("byEmail", ["email"])
    .index("byProvider", ["provider", "providerId"]),

  bookings: defineTable({
    userId: v.id("users"),
    experienceId: v.id("experience"),
    bookingDate: v.string(),
    experienceDate: v.string(),
    adultCount: v.number(),
    childCount: v.number(),
    infantCount: v.number(),
    totalAmount: v.number(),
    status: v.string(), // "pending", "confirmed", "cancelled"
    createdAt: v.string(),

    // Primary Guest (Adult 1) - Required
    primaryGuest: v.object({
      fullName: v.string(),
      email: v.string(),
      confirmEmail: v.string(),
      phoneNumber: v.string(),
    }),

    // Additional Adults (Adult 2, 3, etc.) - Optional
    additionalAdults: v.optional(v.array(v.object({
      fullName: v.string(),
      phoneNumber: v.string(),
    }))),

    // Children (6-12 years) - Optional
    children: v.optional(v.array(v.object({
      fullName: v.string(),
    }))),

    // Note: Infants/Children Under 5 - Only counted for pricing, no details collected
  })
    .index("byUser", ["userId"])
    .index("byExperience", ["experienceId"])
    .index("byStatus", ["status"]),
});
