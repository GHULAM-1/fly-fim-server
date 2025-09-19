export declare const getAllExperiences: import("convex/server").RegisteredQuery<"public", {
    limit?: number | undefined;
    offset?: number | undefined;
}, Promise<import("convex/server").PaginationResult<{
    _id: import("convex/values").GenericId<"experience">;
    _creationTime: number;
    oldPrice?: number | undefined;
    sale?: number | undefined;
    mainImage?: string | string[] | undefined;
    tagOnCards?: string | undefined;
    highlights?: string | undefined;
    inclusions?: string | undefined;
    exclusions?: string | undefined;
    cancellationPolicy?: string | undefined;
    ticketValidity?: string | undefined;
    exploreMore?: string | undefined;
    knowBeforeYouGo?: string | undefined;
    youExperience?: string | undefined;
    myTickets?: string | undefined;
    itinerary?: {
        totalDuration?: string | undefined;
        modeOfTransport?: string | undefined;
        title: string;
        points: {
            description?: string | undefined;
            highlights?: string[] | undefined;
            image?: string | undefined;
            duration?: string | undefined;
            location?: {
                address?: string | undefined;
                lat?: number | undefined;
                lng?: number | undefined;
            } | undefined;
            thingsToDo?: string[] | undefined;
            nearbyThingsToDo?: {
                description?: string | undefined;
                image?: string | undefined;
                name: string;
            }[] | undefined;
            distance?: string | undefined;
            travelTime?: string | undefined;
            attractions?: number | undefined;
            ticketsIncluded?: boolean | undefined;
            name: string;
            order: number;
        }[];
        startPoint: {
            description?: string | undefined;
            highlights?: string[] | undefined;
            image?: string | undefined;
            duration?: string | undefined;
            location?: {
                address?: string | undefined;
                lat?: number | undefined;
                lng?: number | undefined;
            } | undefined;
            thingsToDo?: string[] | undefined;
            nearbyThingsToDo?: {
                description?: string | undefined;
                image?: string | undefined;
                name: string;
            }[] | undefined;
            name: string;
        };
        endPoint: {
            description?: string | undefined;
            image?: string | undefined;
            location?: {
                address?: string | undefined;
                lat?: number | undefined;
                lng?: number | undefined;
            } | undefined;
            name: string;
        };
    } | undefined;
    isMainCard?: boolean | undefined;
    isTopExperience?: boolean | undefined;
    isMustDo?: boolean | undefined;
    isPopular?: boolean | undefined;
    blogSlug?: string | undefined;
    title: string;
    description: string;
    price: number;
    images: string[];
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
            subpoints?: string[] | undefined;
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
}>>>;
export declare const getExperienceById: import("convex/server").RegisteredQuery<"public", {
    id: import("convex/values").GenericId<"experience">;
}, Promise<{
    images: (string | null)[];
    mainImage: (string | null)[];
    itinerary: {
        totalDuration?: string | undefined;
        modeOfTransport?: string | undefined;
        title: string;
        points: {
            description?: string | undefined;
            highlights?: string[] | undefined;
            image?: string | undefined;
            duration?: string | undefined;
            location?: {
                address?: string | undefined;
                lat?: number | undefined;
                lng?: number | undefined;
            } | undefined;
            thingsToDo?: string[] | undefined;
            nearbyThingsToDo?: {
                description?: string | undefined;
                image?: string | undefined;
                name: string;
            }[] | undefined;
            distance?: string | undefined;
            travelTime?: string | undefined;
            attractions?: number | undefined;
            ticketsIncluded?: boolean | undefined;
            name: string;
            order: number;
        }[];
        startPoint: {
            description?: string | undefined;
            highlights?: string[] | undefined;
            image?: string | undefined;
            duration?: string | undefined;
            location?: {
                address?: string | undefined;
                lat?: number | undefined;
                lng?: number | undefined;
            } | undefined;
            thingsToDo?: string[] | undefined;
            nearbyThingsToDo?: {
                description?: string | undefined;
                image?: string | undefined;
                name: string;
            }[] | undefined;
            name: string;
        };
        endPoint: {
            description?: string | undefined;
            image?: string | undefined;
            location?: {
                address?: string | undefined;
                lat?: number | undefined;
                lng?: number | undefined;
            } | undefined;
            name: string;
        };
    } | undefined;
    categoryName: string | null;
    subcategoryName: string | null;
    cityName: string | null;
    _id: import("convex/values").GenericId<"experience">;
    _creationTime: number;
    oldPrice?: number | undefined;
    sale?: number | undefined;
    tagOnCards?: string | undefined;
    highlights?: string | undefined;
    inclusions?: string | undefined;
    exclusions?: string | undefined;
    cancellationPolicy?: string | undefined;
    ticketValidity?: string | undefined;
    exploreMore?: string | undefined;
    knowBeforeYouGo?: string | undefined;
    youExperience?: string | undefined;
    myTickets?: string | undefined;
    isMainCard?: boolean | undefined;
    isTopExperience?: boolean | undefined;
    isMustDo?: boolean | undefined;
    isPopular?: boolean | undefined;
    blogSlug?: string | undefined;
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
            subpoints?: string[] | undefined;
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
} | null>>;
export declare const createExperience: import("convex/server").RegisteredMutation<"public", {
    oldPrice?: number | undefined;
    sale?: number | undefined;
    tagOnCards?: string | undefined;
    isMainCard?: boolean | undefined;
    isTopExperience?: boolean | undefined;
    isMustDo?: boolean | undefined;
    isPopular?: boolean | undefined;
    blogSlug?: string | undefined;
    title: string;
    description: string;
    price: number;
    images: string[];
    mainImage: string[];
    features: string[];
    featureText: string;
    highlights: string;
    inclusions: string;
    exclusions: string;
    cancellationPolicy: string;
    ticketValidity: string;
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
            subpoints?: string[] | undefined;
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
}, Promise<import("convex/values").GenericId<"experience">>>;
export declare const updateExperience: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"experience">;
    patch: {
        title?: string | undefined;
        description?: string | undefined;
        price?: number | undefined;
        oldPrice?: number | undefined;
        sale?: number | undefined;
        images?: string[] | undefined;
        mainImage?: string[] | undefined;
        tagOnCards?: string | undefined;
        features?: string[] | undefined;
        featureText?: string | undefined;
        highlights?: string | undefined;
        inclusions?: string | undefined;
        exclusions?: string | undefined;
        cancellationPolicy?: string | undefined;
        ticketValidity?: string | undefined;
        exploreMore?: string | undefined;
        knowBeforeYouGo?: string | undefined;
        myTickets?: string | undefined;
        operatingHours?: {
            title: string;
            startDate: string;
            endDate: string;
            openTime: string;
            closeTime: string;
            lastEntryTime: string;
        }[] | undefined;
        whereTo?: {
            address: string;
            lat: number;
            lng: number;
        } | undefined;
        datePriceRange?: {
            price: number;
            startDate: string;
            endDate: string;
        }[] | undefined;
        packageType?: {
            price: number;
            name: string;
            points: {
                subpoints?: string[] | undefined;
                title: string;
            }[];
            timePriceSlots: {
                price: number;
                openTime: string;
                closeTime: string;
            }[];
        } | undefined;
        adultPrice?: number | undefined;
        childPrice?: number | undefined;
        seniorPrice?: number | undefined;
        totalLimit?: number | undefined;
        isMainCard?: boolean | undefined;
        isTopExperience?: boolean | undefined;
        isMustDo?: boolean | undefined;
        isPopular?: boolean | undefined;
        blogSlug?: string | undefined;
        categoryId?: import("convex/values").GenericId<"category"> | undefined;
        subcategoryId?: import("convex/values").GenericId<"subcategory"> | undefined;
        cityId?: import("convex/values").GenericId<"city"> | undefined;
    };
}, Promise<void>>;
export declare const deleteExperience: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"experience">;
}, Promise<void>>;
export declare const getThingsToDoPageData: import("convex/server").RegisteredQuery<"public", {
    cityId: import("convex/values").GenericId<"city">;
}, Promise<{
    categories: never[];
    topExperiences: never[];
    mustDoExperiences: never[];
    mainCards: never[];
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
            images: (string | null)[];
            mainImage: (string | null)[];
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
            seniorPrice: any;
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
            images: (string | null)[];
            mainImage: (string | null)[];
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
            seniorPrice: any;
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
            images: (string | null)[];
            mainImage: (string | null)[];
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
            seniorPrice: any;
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
    category: null;
    subcategories: never[];
    topExperiences: never[];
    popularExperiences: never[];
    reviews: never[];
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
            images: (string | null)[];
            mainImage: (string | null)[];
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
            seniorPrice: any;
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
            images: (string | null)[];
            mainImage: (string | null)[];
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
            seniorPrice: any;
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
    sortBy?: string | undefined;
    categoryId: import("convex/values").GenericId<"category">;
    cityId: import("convex/values").GenericId<"city">;
    subcategoryName: string;
}, Promise<{
    category: null;
    subcategory: null;
    experiences: never[];
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
            images: (string | null)[];
            mainImage: (string | null)[];
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
            seniorPrice: any;
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
    city: null;
    category: null;
    subcategory: null;
    experiences: never[];
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
            images: (string | null)[];
            mainImage: (string | null)[];
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
            seniorPrice: any;
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