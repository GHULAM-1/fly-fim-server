"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("convex/server");
const values_1 = require("convex/values");
exports.default = (0, server_1.defineSchema)({
    experience: (0, server_1.defineTable)({
        title: values_1.v.string(),
        description: values_1.v.string(),
        price: values_1.v.number(),
        oldPrice: values_1.v.optional(values_1.v.number()),
        sale: values_1.v.optional(values_1.v.number()),
        images: values_1.v.array(values_1.v.string()),
        mainImage: values_1.v.optional(values_1.v.union(values_1.v.string(), values_1.v.array(values_1.v.string()))),
        tagOnCards: values_1.v.optional(values_1.v.string()),
        features: values_1.v.array(values_1.v.string()),
        featureText: values_1.v.string(),
        highlights: values_1.v.optional(values_1.v.string()),
        inclusions: values_1.v.optional(values_1.v.string()),
        exclusions: values_1.v.optional(values_1.v.string()),
        cancellationPolicy: values_1.v.optional(values_1.v.string()),
        ticketValidity: values_1.v.optional(values_1.v.string()),
        exploreMore: values_1.v.optional(values_1.v.string()),
        knowBeforeYouGo: values_1.v.optional(values_1.v.string()),
        youExperience: values_1.v.optional(values_1.v.string()),
        myTickets: values_1.v.optional(values_1.v.string()),
        operatingHours: values_1.v.array(values_1.v.object({
            startDate: values_1.v.string(),
            endDate: values_1.v.string(),
            openTime: values_1.v.string(),
            closeTime: values_1.v.string(),
            lastEntryTime: values_1.v.string(),
            title: values_1.v.string(),
        })),
        whereTo: values_1.v.object({
            address: values_1.v.string(),
            lat: values_1.v.number(),
            lng: values_1.v.number(),
        }),
        datePriceRange: values_1.v.array(values_1.v.object({
            startDate: values_1.v.string(),
            endDate: values_1.v.string(),
            price: values_1.v.number(),
        })),
        packageType: values_1.v.object({
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
        }),
        adultPrice: values_1.v.number(),
        childPrice: values_1.v.number(),
        seniorPrice: values_1.v.number(),
        totalLimit: values_1.v.number(),
        // Itinerary (Optional)
        itinerary: values_1.v.optional(values_1.v.object({
            title: values_1.v.string(),
            totalDuration: values_1.v.optional(values_1.v.string()),
            modeOfTransport: values_1.v.optional(values_1.v.string()),
            startPoint: values_1.v.object({
                name: values_1.v.string(),
                description: values_1.v.optional(values_1.v.string()),
                image: values_1.v.optional(values_1.v.string()),
                duration: values_1.v.optional(values_1.v.string()),
                location: values_1.v.optional(values_1.v.object({
                    address: values_1.v.optional(values_1.v.string()),
                    lat: values_1.v.optional(values_1.v.number()),
                    lng: values_1.v.optional(values_1.v.number()),
                })),
                highlights: values_1.v.optional(values_1.v.array(values_1.v.string())),
                thingsToDo: values_1.v.optional(values_1.v.array(values_1.v.string())),
                nearbyThingsToDo: values_1.v.optional(values_1.v.array(values_1.v.object({
                    name: values_1.v.string(),
                    image: values_1.v.optional(values_1.v.string()),
                    description: values_1.v.optional(values_1.v.string()),
                }))),
            }),
            points: values_1.v.array(values_1.v.object({
                order: values_1.v.number(),
                name: values_1.v.string(),
                description: values_1.v.optional(values_1.v.string()),
                image: values_1.v.optional(values_1.v.string()),
                duration: values_1.v.optional(values_1.v.string()),
                distance: values_1.v.optional(values_1.v.string()),
                travelTime: values_1.v.optional(values_1.v.string()),
                location: values_1.v.optional(values_1.v.object({
                    address: values_1.v.optional(values_1.v.string()),
                    lat: values_1.v.optional(values_1.v.number()),
                    lng: values_1.v.optional(values_1.v.number()),
                })),
                highlights: values_1.v.optional(values_1.v.array(values_1.v.string())),
                thingsToDo: values_1.v.optional(values_1.v.array(values_1.v.string())),
                attractions: values_1.v.optional(values_1.v.number()),
                ticketsIncluded: values_1.v.optional(values_1.v.boolean()),
                nearbyThingsToDo: values_1.v.optional(values_1.v.array(values_1.v.object({
                    name: values_1.v.string(),
                    image: values_1.v.optional(values_1.v.string()),
                    description: values_1.v.optional(values_1.v.string()),
                }))),
            })),
            endPoint: values_1.v.object({
                name: values_1.v.string(),
                description: values_1.v.optional(values_1.v.string()),
                image: values_1.v.optional(values_1.v.string()),
                location: values_1.v.optional(values_1.v.object({
                    address: values_1.v.optional(values_1.v.string()),
                    lat: values_1.v.optional(values_1.v.number()),
                    lng: values_1.v.optional(values_1.v.number()),
                })),
            }),
        })),
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
    })
        .index("byTitle", ["title"])
        .index("byTopExperience", ["isTopExperience"])
        .index("byMustDo", ["isMustDo"])
        .index("byPopular", ["isPopular"])
        .index("byMainCard", ["isMainCard"])
        .index("byCategory", ["categoryId"])
        .index("bySubcategory", ["subcategoryId"])
        .index("byCity", ["cityId"]),
    category: (0, server_1.defineTable)({
        categoryName: values_1.v.string(),
    })
        .index("byCategoryName", ["categoryName"]),
    subcategory: (0, server_1.defineTable)({
        subcategoryName: values_1.v.string(),
    })
        .index("bySubcategoryName", ["subcategoryName"]),
    city: (0, server_1.defineTable)({
        image: values_1.v.optional(values_1.v.string()),
        cityName: values_1.v.string(),
        countryName: values_1.v.string(),
    })
        .index("byCityName", ["cityName"])
        .index("byCountryName", ["countryName"]),
    faq: (0, server_1.defineTable)({
        experienceId: values_1.v.id("experience"),
        question: values_1.v.string(),
        answer: values_1.v.string(),
    }).index("byExperience", ["experienceId"]),
    reviews: (0, server_1.defineTable)({
        userId: values_1.v.string(),
        experienceId: values_1.v.id("experience"),
        stars: values_1.v.number(),
        images: values_1.v.array(values_1.v.string()),
        text: values_1.v.string(),
    })
        .index("byExperience", ["experienceId"])
        .index("byUser", ["userId"]),
    users: (0, server_1.defineTable)({
        name: values_1.v.optional(values_1.v.string()),
        email: values_1.v.string(),
        image: values_1.v.optional(values_1.v.string()),
        provider: values_1.v.string(),
        providerId: values_1.v.string(),
        createdAt: values_1.v.string(),
        updatedAt: values_1.v.string(),
    })
        .index("byEmail", ["email"])
        .index("byProvider", ["provider", "providerId"]),
});
//# sourceMappingURL=schema.js.map