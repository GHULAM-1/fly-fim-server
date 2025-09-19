declare const _default: import("convex/server").SchemaDefinition<{
    experience: import("convex/server").TableDefinition<import("convex/values").VObject<{
        mainImage?: string | string[];
        oldPrice?: number;
        sale?: number;
        tagOnCards?: string;
        highlights?: string;
        inclusions?: string;
        exclusions?: string;
        cancellationPolicy?: string;
        ticketValidity?: string;
        exploreMore?: string;
        knowBeforeYouGo?: string;
        myTickets?: string;
        isMainCard?: boolean;
        isTopExperience?: boolean;
        isMustDo?: boolean;
        isPopular?: boolean;
        blogSlug?: string;
        youExperience?: string;
        itinerary?: {
            totalDuration?: string;
            modeOfTransport?: string;
            title: string;
            points: {
                image?: string;
                description?: string;
                highlights?: string[];
                duration?: string;
                location?: {
                    address?: string;
                    lat?: number;
                    lng?: number;
                };
                thingsToDo?: string[];
                nearbyThingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                distance?: string;
                travelTime?: string;
                attractions?: number;
                ticketsIncluded?: boolean;
                name: string;
                order: number;
            }[];
            startPoint: {
                image?: string;
                description?: string;
                highlights?: string[];
                duration?: string;
                location?: {
                    address?: string;
                    lat?: number;
                    lng?: number;
                };
                thingsToDo?: string[];
                nearbyThingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                name: string;
            };
            endPoint: {
                image?: string;
                description?: string;
                location?: {
                    address?: string;
                    lat?: number;
                    lng?: number;
                };
                name: string;
            };
        };
        images: string[];
        title: string;
        description: string;
        price: number;
        features: string[];
        featureText: string;
        operatingHours: {
            title: string;
            startDate: string;
            endDate: string;
            openTime: string;
            closeTime: string;
            lastEntryTime: string;
        }[];
        whereTo: {
            address: string;
            lat: number;
            lng: number;
        };
        datePriceRange: {
            price: number;
            startDate: string;
            endDate: string;
        }[];
        packageType: {
            price: number;
            name: string;
            points: {
                subpoints?: string[];
                title: string;
            }[];
            timePriceSlots: {
                price: number;
                openTime: string;
                closeTime: string;
            }[];
        };
        adultPrice: number;
        childPrice: number;
        seniorPrice: number;
        totalLimit: number;
        categoryId: import("convex/values").GenericId<"category">;
        subcategoryId: import("convex/values").GenericId<"subcategory">;
        cityId: import("convex/values").GenericId<"city">;
    }, {
        title: import("convex/values").VString<string, "required">;
        description: import("convex/values").VString<string, "required">;
        price: import("convex/values").VFloat64<number, "required">;
        oldPrice: import("convex/values").VFloat64<number, "optional">;
        sale: import("convex/values").VFloat64<number, "optional">;
        images: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">;
        mainImage: import("convex/values").VUnion<string | string[], [import("convex/values").VString<string, "required">, import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">], "optional", never>;
        tagOnCards: import("convex/values").VString<string, "optional">;
        features: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">;
        featureText: import("convex/values").VString<string, "required">;
        highlights: import("convex/values").VString<string, "optional">;
        inclusions: import("convex/values").VString<string, "optional">;
        exclusions: import("convex/values").VString<string, "optional">;
        cancellationPolicy: import("convex/values").VString<string, "optional">;
        ticketValidity: import("convex/values").VString<string, "optional">;
        exploreMore: import("convex/values").VString<string, "optional">;
        knowBeforeYouGo: import("convex/values").VString<string, "optional">;
        youExperience: import("convex/values").VString<string, "optional">;
        myTickets: import("convex/values").VString<string, "optional">;
        operatingHours: import("convex/values").VArray<{
            title: string;
            startDate: string;
            endDate: string;
            openTime: string;
            closeTime: string;
            lastEntryTime: string;
        }[], import("convex/values").VObject<{
            title: string;
            startDate: string;
            endDate: string;
            openTime: string;
            closeTime: string;
            lastEntryTime: string;
        }, {
            startDate: import("convex/values").VString<string, "required">;
            endDate: import("convex/values").VString<string, "required">;
            openTime: import("convex/values").VString<string, "required">;
            closeTime: import("convex/values").VString<string, "required">;
            lastEntryTime: import("convex/values").VString<string, "required">;
            title: import("convex/values").VString<string, "required">;
        }, "required", "title" | "startDate" | "endDate" | "openTime" | "closeTime" | "lastEntryTime">, "required">;
        whereTo: import("convex/values").VObject<{
            address: string;
            lat: number;
            lng: number;
        }, {
            address: import("convex/values").VString<string, "required">;
            lat: import("convex/values").VFloat64<number, "required">;
            lng: import("convex/values").VFloat64<number, "required">;
        }, "required", "address" | "lat" | "lng">;
        datePriceRange: import("convex/values").VArray<{
            price: number;
            startDate: string;
            endDate: string;
        }[], import("convex/values").VObject<{
            price: number;
            startDate: string;
            endDate: string;
        }, {
            startDate: import("convex/values").VString<string, "required">;
            endDate: import("convex/values").VString<string, "required">;
            price: import("convex/values").VFloat64<number, "required">;
        }, "required", "price" | "startDate" | "endDate">, "required">;
        packageType: import("convex/values").VObject<{
            price: number;
            name: string;
            points: {
                subpoints?: string[];
                title: string;
            }[];
            timePriceSlots: {
                price: number;
                openTime: string;
                closeTime: string;
            }[];
        }, {
            name: import("convex/values").VString<string, "required">;
            price: import("convex/values").VFloat64<number, "required">;
            points: import("convex/values").VArray<{
                subpoints?: string[];
                title: string;
            }[], import("convex/values").VObject<{
                subpoints?: string[];
                title: string;
            }, {
                title: import("convex/values").VString<string, "required">;
                subpoints: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "optional">;
            }, "required", "title" | "subpoints">, "required">;
            timePriceSlots: import("convex/values").VArray<{
                price: number;
                openTime: string;
                closeTime: string;
            }[], import("convex/values").VObject<{
                price: number;
                openTime: string;
                closeTime: string;
            }, {
                openTime: import("convex/values").VString<string, "required">;
                closeTime: import("convex/values").VString<string, "required">;
                price: import("convex/values").VFloat64<number, "required">;
            }, "required", "price" | "openTime" | "closeTime">, "required">;
        }, "required", "price" | "name" | "points" | "timePriceSlots">;
        adultPrice: import("convex/values").VFloat64<number, "required">;
        childPrice: import("convex/values").VFloat64<number, "required">;
        seniorPrice: import("convex/values").VFloat64<number, "required">;
        totalLimit: import("convex/values").VFloat64<number, "required">;
        itinerary: import("convex/values").VObject<{
            totalDuration?: string;
            modeOfTransport?: string;
            title: string;
            points: {
                image?: string;
                description?: string;
                highlights?: string[];
                duration?: string;
                location?: {
                    address?: string;
                    lat?: number;
                    lng?: number;
                };
                thingsToDo?: string[];
                nearbyThingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                distance?: string;
                travelTime?: string;
                attractions?: number;
                ticketsIncluded?: boolean;
                name: string;
                order: number;
            }[];
            startPoint: {
                image?: string;
                description?: string;
                highlights?: string[];
                duration?: string;
                location?: {
                    address?: string;
                    lat?: number;
                    lng?: number;
                };
                thingsToDo?: string[];
                nearbyThingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                name: string;
            };
            endPoint: {
                image?: string;
                description?: string;
                location?: {
                    address?: string;
                    lat?: number;
                    lng?: number;
                };
                name: string;
            };
        }, {
            title: import("convex/values").VString<string, "required">;
            totalDuration: import("convex/values").VString<string, "optional">;
            modeOfTransport: import("convex/values").VString<string, "optional">;
            startPoint: import("convex/values").VObject<{
                image?: string;
                description?: string;
                highlights?: string[];
                duration?: string;
                location?: {
                    address?: string;
                    lat?: number;
                    lng?: number;
                };
                thingsToDo?: string[];
                nearbyThingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                name: string;
            }, {
                name: import("convex/values").VString<string, "required">;
                description: import("convex/values").VString<string, "optional">;
                image: import("convex/values").VString<string, "optional">;
                duration: import("convex/values").VString<string, "optional">;
                location: import("convex/values").VObject<{
                    address?: string;
                    lat?: number;
                    lng?: number;
                }, {
                    address: import("convex/values").VString<string, "optional">;
                    lat: import("convex/values").VFloat64<number, "optional">;
                    lng: import("convex/values").VFloat64<number, "optional">;
                }, "optional", "address" | "lat" | "lng">;
                highlights: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "optional">;
                thingsToDo: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "optional">;
                nearbyThingsToDo: import("convex/values").VArray<{
                    image?: string;
                    description?: string;
                    name: string;
                }[], import("convex/values").VObject<{
                    image?: string;
                    description?: string;
                    name: string;
                }, {
                    name: import("convex/values").VString<string, "required">;
                    image: import("convex/values").VString<string, "optional">;
                    description: import("convex/values").VString<string, "optional">;
                }, "required", "image" | "description" | "name">, "optional">;
            }, "required", "image" | "description" | "highlights" | "name" | "duration" | "location" | "thingsToDo" | "nearbyThingsToDo" | "location.address" | "location.lat" | "location.lng">;
            points: import("convex/values").VArray<{
                image?: string;
                description?: string;
                highlights?: string[];
                duration?: string;
                location?: {
                    address?: string;
                    lat?: number;
                    lng?: number;
                };
                thingsToDo?: string[];
                nearbyThingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                distance?: string;
                travelTime?: string;
                attractions?: number;
                ticketsIncluded?: boolean;
                name: string;
                order: number;
            }[], import("convex/values").VObject<{
                image?: string;
                description?: string;
                highlights?: string[];
                duration?: string;
                location?: {
                    address?: string;
                    lat?: number;
                    lng?: number;
                };
                thingsToDo?: string[];
                nearbyThingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                distance?: string;
                travelTime?: string;
                attractions?: number;
                ticketsIncluded?: boolean;
                name: string;
                order: number;
            }, {
                order: import("convex/values").VFloat64<number, "required">;
                name: import("convex/values").VString<string, "required">;
                description: import("convex/values").VString<string, "optional">;
                image: import("convex/values").VString<string, "optional">;
                duration: import("convex/values").VString<string, "optional">;
                distance: import("convex/values").VString<string, "optional">;
                travelTime: import("convex/values").VString<string, "optional">;
                location: import("convex/values").VObject<{
                    address?: string;
                    lat?: number;
                    lng?: number;
                }, {
                    address: import("convex/values").VString<string, "optional">;
                    lat: import("convex/values").VFloat64<number, "optional">;
                    lng: import("convex/values").VFloat64<number, "optional">;
                }, "optional", "address" | "lat" | "lng">;
                highlights: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "optional">;
                thingsToDo: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "optional">;
                attractions: import("convex/values").VFloat64<number, "optional">;
                ticketsIncluded: import("convex/values").VBoolean<boolean, "optional">;
                nearbyThingsToDo: import("convex/values").VArray<{
                    image?: string;
                    description?: string;
                    name: string;
                }[], import("convex/values").VObject<{
                    image?: string;
                    description?: string;
                    name: string;
                }, {
                    name: import("convex/values").VString<string, "required">;
                    image: import("convex/values").VString<string, "optional">;
                    description: import("convex/values").VString<string, "optional">;
                }, "required", "image" | "description" | "name">, "optional">;
            }, "required", "image" | "description" | "highlights" | "name" | "duration" | "location" | "thingsToDo" | "nearbyThingsToDo" | "location.address" | "location.lat" | "location.lng" | "order" | "distance" | "travelTime" | "attractions" | "ticketsIncluded">, "required">;
            endPoint: import("convex/values").VObject<{
                image?: string;
                description?: string;
                location?: {
                    address?: string;
                    lat?: number;
                    lng?: number;
                };
                name: string;
            }, {
                name: import("convex/values").VString<string, "required">;
                description: import("convex/values").VString<string, "optional">;
                image: import("convex/values").VString<string, "optional">;
                location: import("convex/values").VObject<{
                    address?: string;
                    lat?: number;
                    lng?: number;
                }, {
                    address: import("convex/values").VString<string, "optional">;
                    lat: import("convex/values").VFloat64<number, "optional">;
                    lng: import("convex/values").VFloat64<number, "optional">;
                }, "optional", "address" | "lat" | "lng">;
            }, "required", "image" | "description" | "name" | "location" | "location.address" | "location.lat" | "location.lng">;
        }, "optional", "title" | "points" | "totalDuration" | "modeOfTransport" | "startPoint" | "endPoint" | "startPoint.image" | "startPoint.description" | "startPoint.highlights" | "startPoint.name" | "startPoint.duration" | "startPoint.location" | "startPoint.thingsToDo" | "startPoint.nearbyThingsToDo" | "startPoint.location.address" | "startPoint.location.lat" | "startPoint.location.lng" | "endPoint.image" | "endPoint.description" | "endPoint.name" | "endPoint.location" | "endPoint.location.address" | "endPoint.location.lat" | "endPoint.location.lng">;
        isMainCard: import("convex/values").VBoolean<boolean, "optional">;
        isTopExperience: import("convex/values").VBoolean<boolean, "optional">;
        isMustDo: import("convex/values").VBoolean<boolean, "optional">;
        isPopular: import("convex/values").VBoolean<boolean, "optional">;
        blogSlug: import("convex/values").VString<string, "optional">;
        categoryId: import("convex/values").VId<import("convex/values").GenericId<"category">, "required">;
        subcategoryId: import("convex/values").VId<import("convex/values").GenericId<"subcategory">, "required">;
        cityId: import("convex/values").VId<import("convex/values").GenericId<"city">, "required">;
    }, "required", "mainImage" | "images" | "title" | "description" | "price" | "oldPrice" | "sale" | "tagOnCards" | "features" | "featureText" | "highlights" | "inclusions" | "exclusions" | "cancellationPolicy" | "ticketValidity" | "exploreMore" | "knowBeforeYouGo" | "myTickets" | "operatingHours" | "whereTo" | "datePriceRange" | "packageType" | "adultPrice" | "childPrice" | "seniorPrice" | "totalLimit" | "isMainCard" | "isTopExperience" | "isMustDo" | "isPopular" | "blogSlug" | "categoryId" | "subcategoryId" | "cityId" | "youExperience" | "itinerary" | "whereTo.address" | "whereTo.lat" | "whereTo.lng" | "packageType.price" | "packageType.name" | "packageType.points" | "packageType.timePriceSlots" | "itinerary.title" | "itinerary.points" | "itinerary.totalDuration" | "itinerary.modeOfTransport" | "itinerary.startPoint" | "itinerary.endPoint" | "itinerary.startPoint.image" | "itinerary.startPoint.description" | "itinerary.startPoint.highlights" | "itinerary.startPoint.name" | "itinerary.startPoint.duration" | "itinerary.startPoint.location" | "itinerary.startPoint.thingsToDo" | "itinerary.startPoint.nearbyThingsToDo" | "itinerary.startPoint.location.address" | "itinerary.startPoint.location.lat" | "itinerary.startPoint.location.lng" | "itinerary.endPoint.image" | "itinerary.endPoint.description" | "itinerary.endPoint.name" | "itinerary.endPoint.location" | "itinerary.endPoint.location.address" | "itinerary.endPoint.location.lat" | "itinerary.endPoint.location.lng">, {
        byTitle: ["title", "_creationTime"];
        byTopExperience: ["isTopExperience", "_creationTime"];
        byMustDo: ["isMustDo", "_creationTime"];
        byPopular: ["isPopular", "_creationTime"];
        byMainCard: ["isMainCard", "_creationTime"];
        byCategory: ["categoryId", "_creationTime"];
        bySubcategory: ["subcategoryId", "_creationTime"];
        byCity: ["cityId", "_creationTime"];
    }, {}, {}>;
    category: import("convex/server").TableDefinition<import("convex/values").VObject<{
        categoryName: string;
    }, {
        categoryName: import("convex/values").VString<string, "required">;
    }, "required", "categoryName">, {
        byCategoryName: ["categoryName", "_creationTime"];
    }, {}, {}>;
    subcategory: import("convex/server").TableDefinition<import("convex/values").VObject<{
        subcategoryName: string;
    }, {
        subcategoryName: import("convex/values").VString<string, "required">;
    }, "required", "subcategoryName">, {
        bySubcategoryName: ["subcategoryName", "_creationTime"];
    }, {}, {}>;
    city: import("convex/server").TableDefinition<import("convex/values").VObject<{
        image?: string;
        cityName: string;
        countryName: string;
    }, {
        image: import("convex/values").VString<string, "optional">;
        cityName: import("convex/values").VString<string, "required">;
        countryName: import("convex/values").VString<string, "required">;
    }, "required", "image" | "cityName" | "countryName">, {
        byCityName: ["cityName", "_creationTime"];
        byCountryName: ["countryName", "_creationTime"];
    }, {}, {}>;
    faq: import("convex/server").TableDefinition<import("convex/values").VObject<{
        experienceId: import("convex/values").GenericId<"experience">;
        question: string;
        answer: string;
    }, {
        experienceId: import("convex/values").VId<import("convex/values").GenericId<"experience">, "required">;
        question: import("convex/values").VString<string, "required">;
        answer: import("convex/values").VString<string, "required">;
    }, "required", "experienceId" | "question" | "answer">, {
        byExperience: ["experienceId", "_creationTime"];
    }, {}, {}>;
    reviews: import("convex/server").TableDefinition<import("convex/values").VObject<{
        images: string[];
        experienceId: import("convex/values").GenericId<"experience">;
        text: string;
        userId: string;
        stars: number;
    }, {
        userId: import("convex/values").VString<string, "required">;
        experienceId: import("convex/values").VId<import("convex/values").GenericId<"experience">, "required">;
        stars: import("convex/values").VFloat64<number, "required">;
        images: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">;
        text: import("convex/values").VString<string, "required">;
    }, "required", "images" | "experienceId" | "text" | "userId" | "stars">, {
        byExperience: ["experienceId", "_creationTime"];
        byUser: ["userId", "_creationTime"];
    }, {}, {}>;
    users: import("convex/server").TableDefinition<import("convex/values").VObject<{
        image?: string;
        name?: string;
        provider: string;
        email: string;
        providerId: string;
        createdAt: string;
        updatedAt: string;
    }, {
        name: import("convex/values").VString<string, "optional">;
        email: import("convex/values").VString<string, "required">;
        image: import("convex/values").VString<string, "optional">;
        provider: import("convex/values").VString<string, "required">;
        providerId: import("convex/values").VString<string, "required">;
        createdAt: import("convex/values").VString<string, "required">;
        updatedAt: import("convex/values").VString<string, "required">;
    }, "required", "image" | "name" | "provider" | "email" | "providerId" | "createdAt" | "updatedAt">, {
        byEmail: ["email", "_creationTime"];
        byProvider: ["provider", "providerId", "_creationTime"];
    }, {}, {}>;
}, true>;
export default _default;
//# sourceMappingURL=schema.d.ts.map