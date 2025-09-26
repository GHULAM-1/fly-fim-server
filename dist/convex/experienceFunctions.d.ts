export declare const getAllExperiences: import("convex/server").RegisteredQuery<"public", {
    limit?: number;
    offset?: number;
}, Promise<{
    page: {
        images: string[];
        mainImage: string[];
        itinerary: {
            totalDuration?: string;
            modeOfTransport?: string;
            title: string;
            startPoint: {
                image?: string;
                description?: string;
                highlights?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                nearbyThingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                thingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                duration?: string;
                location?: {
                    address?: string;
                    lat?: number;
                    lng?: number;
                };
                name: string;
            };
            points: {
                image?: string;
                description?: string;
                highlights?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                nearbyThingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                thingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                duration?: string;
                location?: {
                    address?: string;
                    lat?: number;
                    lng?: number;
                };
                distance?: string;
                travelTime?: string;
                attractions?: number;
                ticketsIncluded?: boolean;
                name: string;
                order: number;
            }[];
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
        cityName: string;
        countryName: string;
        subcategoryName: string;
        categoryName: string;
        _id: import("convex/values").GenericId<"experience">;
        _creationTime: number;
        oldPrice?: number;
        sale?: number;
        tagOnCards?: string;
        featureText?: string;
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
        blogSlug?: string[];
        youExperience?: string;
        title: string;
        description: string;
        price: number;
        features: string[];
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
        infantPrice: number;
        totalLimit: number;
        categoryId: import("convex/values").GenericId<"category">;
        subcategoryId: import("convex/values").GenericId<"subcategory">;
        cityId: import("convex/values").GenericId<"city">;
    }[];
    isDone: boolean;
    continueCursor: import("convex/server").Cursor;
    splitCursor?: import("convex/server").Cursor | null;
    pageStatus?: "SplitRecommended" | "SplitRequired" | null;
}>>;
export declare const getExperienceById: import("convex/server").RegisteredQuery<"public", {
    id: import("convex/values").GenericId<"experience">;
}, Promise<{
    images: string[];
    mainImage: string[];
    itinerary: {
        totalDuration?: string;
        modeOfTransport?: string;
        title: string;
        startPoint: {
            image?: string;
            description?: string;
            highlights?: {
                image?: string;
                description?: string;
                name: string;
            }[];
            nearbyThingsToDo?: {
                image?: string;
                description?: string;
                name: string;
            }[];
            thingsToDo?: {
                image?: string;
                description?: string;
                name: string;
            }[];
            duration?: string;
            location?: {
                address?: string;
                lat?: number;
                lng?: number;
            };
            name: string;
        };
        points: {
            image?: string;
            description?: string;
            highlights?: {
                image?: string;
                description?: string;
                name: string;
            }[];
            nearbyThingsToDo?: {
                image?: string;
                description?: string;
                name: string;
            }[];
            thingsToDo?: {
                image?: string;
                description?: string;
                name: string;
            }[];
            duration?: string;
            location?: {
                address?: string;
                lat?: number;
                lng?: number;
            };
            distance?: string;
            travelTime?: string;
            attractions?: number;
            ticketsIncluded?: boolean;
            name: string;
            order: number;
        }[];
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
    categoryName: string;
    subcategoryName: string;
    cityName: string;
    _id: import("convex/values").GenericId<"experience">;
    _creationTime: number;
    oldPrice?: number;
    sale?: number;
    tagOnCards?: string;
    featureText?: string;
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
    blogSlug?: string[];
    youExperience?: string;
    title: string;
    description: string;
    price: number;
    features: string[];
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
    infantPrice: number;
    totalLimit: number;
    categoryId: import("convex/values").GenericId<"category">;
    subcategoryId: import("convex/values").GenericId<"subcategory">;
    cityId: import("convex/values").GenericId<"city">;
}>>;
export declare const createExperience: import("convex/server").RegisteredMutation<"public", {
    oldPrice?: number;
    sale?: number;
    tagOnCards?: string;
    isMainCard?: boolean;
    isTopExperience?: boolean;
    isMustDo?: boolean;
    isPopular?: boolean;
    blogSlug?: string[];
    itinerary?: {
        totalDuration?: string;
        modeOfTransport?: string;
        title: string;
        startPoint: {
            image?: string;
            description?: string;
            highlights?: {
                image?: string;
                description?: string;
                name: string;
            }[];
            nearbyThingsToDo?: {
                image?: string;
                description?: string;
                name: string;
            }[];
            thingsToDo?: {
                image?: string;
                description?: string;
                name: string;
            }[];
            duration?: string;
            location?: {
                address?: string;
                lat?: number;
                lng?: number;
            };
            name: string;
        };
        points: {
            image?: string;
            description?: string;
            highlights?: {
                image?: string;
                description?: string;
                name: string;
            }[];
            nearbyThingsToDo?: {
                image?: string;
                description?: string;
                name: string;
            }[];
            thingsToDo?: {
                image?: string;
                description?: string;
                name: string;
            }[];
            duration?: string;
            location?: {
                address?: string;
                lat?: number;
                lng?: number;
            };
            distance?: string;
            travelTime?: string;
            attractions?: number;
            ticketsIncluded?: boolean;
            name: string;
            order: number;
        }[];
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
    mainImage: string[];
    images: string[];
    title: string;
    description: string;
    price: number;
    features: string[];
    highlights: string;
    inclusions: string;
    exclusions: string;
    cancellationPolicy: string;
    exploreMore: string;
    knowBeforeYouGo: string;
    myTickets: string;
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
    infantPrice: number;
    totalLimit: number;
    categoryId: import("convex/values").GenericId<"category">;
    subcategoryId: import("convex/values").GenericId<"subcategory">;
    cityId: import("convex/values").GenericId<"city">;
    youExperience: string;
}, Promise<import("convex/values").GenericId<"experience">>>;
export declare const updateExperience: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"experience">;
    patch: {
        mainImage?: string[];
        images?: string[];
        title?: string;
        description?: string;
        price?: number;
        oldPrice?: number;
        sale?: number;
        tagOnCards?: string;
        features?: string[];
        featureText?: string;
        highlights?: string;
        inclusions?: string;
        exclusions?: string;
        cancellationPolicy?: string;
        ticketValidity?: string;
        exploreMore?: string;
        knowBeforeYouGo?: string;
        myTickets?: string;
        operatingHours?: {
            title: string;
            startDate: string;
            endDate: string;
            openTime: string;
            closeTime: string;
            lastEntryTime: string;
        }[];
        whereTo?: {
            address: string;
            lat: number;
            lng: number;
        };
        datePriceRange?: {
            price: number;
            startDate: string;
            endDate: string;
        }[];
        packageType?: {
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
        adultPrice?: number;
        childPrice?: number;
        infantPrice?: number;
        totalLimit?: number;
        isMainCard?: boolean;
        isTopExperience?: boolean;
        isMustDo?: boolean;
        isPopular?: boolean;
        blogSlug?: string[];
        categoryId?: import("convex/values").GenericId<"category">;
        subcategoryId?: import("convex/values").GenericId<"subcategory">;
        cityId?: import("convex/values").GenericId<"city">;
        itinerary?: {
            totalDuration?: string;
            modeOfTransport?: string;
            title: string;
            startPoint: {
                image?: string;
                description?: string;
                highlights?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                nearbyThingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                thingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                duration?: string;
                location?: {
                    address?: string;
                    lat?: number;
                    lng?: number;
                };
                name: string;
            };
            points: {
                image?: string;
                description?: string;
                highlights?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                nearbyThingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                thingsToDo?: {
                    image?: string;
                    description?: string;
                    name: string;
                }[];
                duration?: string;
                location?: {
                    address?: string;
                    lat?: number;
                    lng?: number;
                };
                distance?: string;
                travelTime?: string;
                attractions?: number;
                ticketsIncluded?: boolean;
                name: string;
                order: number;
            }[];
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
        youExperience: string;
    };
}, Promise<void>>;
export declare const deleteExperience: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"experience">;
}, Promise<void>>;
export declare const getThingsToDoPageData: import("convex/server").RegisteredQuery<"public", {
    cityId: import("convex/values").GenericId<"city">;
}, Promise<{
    categories: any[];
    topExperiences: any[];
    mustDoExperiences: any[];
    mainCards: any[];
    reviews?: undefined;
} | {
    categories: {
        categoryName: any;
        subcategories: {
            subcategoryName: any;
            experiences: any[];
        }[];
    }[];
    topExperiences: {
        _id: any;
        basicInfo: {
            title: any;
            description: any;
            tagOnCards: any;
            price: any;
            oldPrice: any;
            sale: any;
            images: string[];
            mainImage: string[];
        };
        features: {
            features: any;
            featureText: any;
        };
        information: {
            highlights: any;
            inclusions: any;
            exclusions: any;
            cancellationPolicy: any;
            ticketValidity: any;
            operatingHours: any;
            yourExperience: any;
            knowBeforeYouGo: any;
            myTickets: any;
            whereTo: any;
            exploreMore: any;
        };
        calendar: {
            datePriceRange: any;
        };
        packages: {
            packageType: any;
        };
        ticketPrice: {
            adultPrice: any;
            childPrice: any;
            infantPrice: any;
            totalLimit: any;
        };
        flags: {
            isMainCard: any;
            isTopExperience: any;
            isMustDo: any;
            isPopular: any;
            blogSlug: any;
        };
        relationships: {
            categoryId: any;
            subcategoryId: any;
            cityId: any;
            categoryName: any;
            subcategoryName: any;
            cityName: any;
        };
    }[];
    mustDoExperiences: {
        _id: any;
        basicInfo: {
            title: any;
            description: any;
            tagOnCards: any;
            price: any;
            oldPrice: any;
            sale: any;
            images: string[];
            mainImage: string[];
        };
        features: {
            features: any;
            featureText: any;
        };
        information: {
            highlights: any;
            inclusions: any;
            exclusions: any;
            cancellationPolicy: any;
            ticketValidity: any;
            operatingHours: any;
            yourExperience: any;
            knowBeforeYouGo: any;
            myTickets: any;
            whereTo: any;
            exploreMore: any;
        };
        calendar: {
            datePriceRange: any;
        };
        packages: {
            packageType: any;
        };
        ticketPrice: {
            adultPrice: any;
            childPrice: any;
            infantPrice: any;
            totalLimit: any;
        };
        flags: {
            isMainCard: any;
            isTopExperience: any;
            isMustDo: any;
            isPopular: any;
            blogSlug: any;
        };
        relationships: {
            categoryId: any;
            subcategoryId: any;
            cityId: any;
            categoryName: any;
            subcategoryName: any;
            cityName: any;
        };
    }[];
    mainCards: {
        _id: any;
        basicInfo: {
            title: any;
            description: any;
            tagOnCards: any;
            price: any;
            oldPrice: any;
            sale: any;
            images: string[];
            mainImage: string[];
        };
        features: {
            features: any;
            featureText: any;
        };
        information: {
            highlights: any;
            inclusions: any;
            exclusions: any;
            cancellationPolicy: any;
            ticketValidity: any;
            operatingHours: any;
            yourExperience: any;
            knowBeforeYouGo: any;
            myTickets: any;
            whereTo: any;
            exploreMore: any;
        };
        calendar: {
            datePriceRange: any;
        };
        packages: {
            packageType: any;
        };
        ticketPrice: {
            adultPrice: any;
            childPrice: any;
            infantPrice: any;
            totalLimit: any;
        };
        flags: {
            isMainCard: any;
            isTopExperience: any;
            isMustDo: any;
            isPopular: any;
            blogSlug: any;
        };
        relationships: {
            categoryId: any;
            subcategoryId: any;
            cityId: any;
            categoryName: any;
            subcategoryName: any;
            cityName: any;
        };
    }[];
    reviews: any[];
}>>;
export declare const getCategoryPageData: import("convex/server").RegisteredQuery<"public", {
    categoryId: import("convex/values").GenericId<"category">;
    cityId: import("convex/values").GenericId<"city">;
}, Promise<{
    category: any;
    subcategories: any[];
    topExperiences: any[];
    popularExperiences: any[];
    reviews: any[];
    allCategories?: undefined;
} | {
    category: {
        categoryName: string;
        subcategories: {
            subcategoryName: any;
            experiences: any[];
        }[];
    };
    topExperiences: {
        _id: any;
        basicInfo: {
            title: any;
            description: any;
            tagOnCards: any;
            price: any;
            oldPrice: any;
            sale: any;
            images: string[];
            mainImage: string[];
        };
        features: {
            features: any;
            featureText: any;
        };
        information: {
            highlights: any;
            inclusions: any;
            exclusions: any;
            cancellationPolicy: any;
            ticketValidity: any;
            operatingHours: any;
            yourExperience: any;
            knowBeforeYouGo: any;
            myTickets: any;
            whereTo: any;
            exploreMore: any;
        };
        calendar: {
            datePriceRange: any;
        };
        packages: {
            packageType: any;
        };
        ticketPrice: {
            adultPrice: any;
            childPrice: any;
            infantPrice: any;
            totalLimit: any;
        };
        flags: {
            isMainCard: any;
            isTopExperience: any;
            isMustDo: any;
            isPopular: any;
            blogSlug: any;
        };
        relationships: {
            categoryId: any;
            subcategoryId: any;
            cityId: any;
            categoryName: any;
            subcategoryName: any;
            cityName: any;
        };
    }[];
    popularExperiences: {
        _id: any;
        basicInfo: {
            title: any;
            description: any;
            tagOnCards: any;
            price: any;
            oldPrice: any;
            sale: any;
            images: string[];
            mainImage: string[];
        };
        features: {
            features: any;
            featureText: any;
        };
        information: {
            highlights: any;
            inclusions: any;
            exclusions: any;
            cancellationPolicy: any;
            ticketValidity: any;
            operatingHours: any;
            yourExperience: any;
            knowBeforeYouGo: any;
            myTickets: any;
            whereTo: any;
            exploreMore: any;
        };
        calendar: {
            datePriceRange: any;
        };
        packages: {
            packageType: any;
        };
        ticketPrice: {
            adultPrice: any;
            childPrice: any;
            infantPrice: any;
            totalLimit: any;
        };
        flags: {
            isMainCard: any;
            isTopExperience: any;
            isMustDo: any;
            isPopular: any;
            blogSlug: any;
        };
        relationships: {
            categoryId: any;
            subcategoryId: any;
            cityId: any;
            categoryName: any;
            subcategoryName: any;
            cityName: any;
        };
    }[];
    reviews: any[];
    allCategories: {
        categoryName: any;
        subcategories: any[];
    }[];
    subcategories?: undefined;
}>>;
export declare const getSubcategoryPageDataFiltered: import("convex/server").RegisteredQuery<"public", {
    sortBy?: string;
    categoryId: import("convex/values").GenericId<"category">;
    cityId: import("convex/values").GenericId<"city">;
    subcategoryName: string;
}, Promise<{
    category: any;
    subcategory: any;
    experiences: any[];
    reviewStats: {
        averageRating: number;
        totalReviews: number;
    };
    allCategories?: undefined;
} | {
    category: {
        categoryName: string;
        subcategories: unknown[];
    };
    subcategory: {
        subcategoryName: string;
    };
    experiences: {
        _id: any;
        basicInfo: {
            title: any;
            description: any;
            tagOnCards: any;
            price: any;
            oldPrice: any;
            sale: any;
            images: string[];
            mainImage: string[];
        };
        features: {
            features: any;
            featureText: any;
        };
        information: {
            highlights: any;
            inclusions: any;
            exclusions: any;
            cancellationPolicy: any;
            ticketValidity: any;
            operatingHours: any;
            yourExperience: any;
            knowBeforeYouGo: any;
            myTickets: any;
            whereTo: any;
            exploreMore: any;
        };
        calendar: {
            datePriceRange: any;
        };
        packages: {
            packageType: any;
        };
        ticketPrice: {
            adultPrice: any;
            childPrice: any;
            infantPrice: any;
            totalLimit: any;
        };
        flags: {
            isMainCard: any;
            isTopExperience: any;
            isMustDo: any;
            isPopular: any;
            blogSlug: any;
        };
        relationships: {
            categoryId: any;
            subcategoryId: any;
            cityId: any;
            categoryName: any;
            subcategoryName: any;
            cityName: any;
        };
    }[];
    allCategories: {
        categoryName: any;
        subcategories: any[];
    }[];
    reviewStats: {
        averageRating: number;
        totalReviews: number;
    };
}>>;
export declare const getSubcategoryPageData: import("convex/server").RegisteredQuery<"public", {
    categoryId: import("convex/values").GenericId<"category">;
    cityId: import("convex/values").GenericId<"city">;
    subcategoryName: string;
}, Promise<{
    city: any;
    category: any;
    subcategory: any;
    experiences: any[];
    reviewStats: {
        averageRating: number;
        totalReviews: number;
    };
    allCategories?: undefined;
} | {
    category: {
        categoryName: string;
        subcategories: unknown[];
    };
    subcategory: {
        subcategoryName: string;
    };
    experiences: {
        _id: any;
        basicInfo: {
            title: any;
            description: any;
            tagOnCards: any;
            price: any;
            oldPrice: any;
            sale: any;
            images: string[];
            mainImage: string[];
        };
        features: {
            features: any;
            featureText: any;
        };
        information: {
            highlights: any;
            inclusions: any;
            exclusions: any;
            cancellationPolicy: any;
            ticketValidity: any;
            operatingHours: any;
            yourExperience: any;
            knowBeforeYouGo: any;
            myTickets: any;
            whereTo: any;
            exploreMore: any;
        };
        calendar: {
            datePriceRange: any;
        };
        packages: {
            packageType: any;
        };
        ticketPrice: {
            adultPrice: any;
            childPrice: any;
            infantPrice: any;
            totalLimit: any;
        };
        flags: {
            isMainCard: any;
            isTopExperience: any;
            isMustDo: any;
            isPopular: any;
            blogSlug: any;
        };
        relationships: {
            categoryId: any;
            subcategoryId: any;
            cityId: any;
            categoryName: any;
            subcategoryName: any;
            cityName: any;
        };
    }[];
    allCategories: {
        categoryName: any;
        subcategories: any[];
    }[];
    reviewStats: {
        averageRating: number;
        totalReviews: number;
    };
    city?: undefined;
}>>;
//# sourceMappingURL=experienceFunctions.d.ts.map