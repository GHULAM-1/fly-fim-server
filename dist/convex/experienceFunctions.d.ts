export declare const getAllExperiences: import("convex/server").RegisteredQuery<"public", {
    limit?: number;
    offset?: number;
}, Promise<import("convex/server").PaginationResult<{
    _id: import("convex/values").GenericId<"experience">;
    _creationTime: number;
    oldPrice?: number;
    sale?: number;
    mainImage?: string | string[];
    tagOnCards?: string;
    highlights?: string;
    inclusions?: string;
    exclusions?: string;
    cancellationPolicy?: string;
    ticketValidity?: string;
    exploreMore?: string;
    knowBeforeYouGo?: string;
    youExperience?: string;
    myTickets?: string;
    itinerary?: {
        totalDuration?: string;
        modeOfTransport?: string;
        title: string;
        points: {
            description?: string;
            highlights?: string[];
            image?: string;
            duration?: string;
            location?: {
                address?: string;
                lat?: number;
                lng?: number;
            };
            thingsToDo?: string[];
            nearbyThingsToDo?: {
                description?: string;
                image?: string;
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
            description?: string;
            highlights?: string[];
            image?: string;
            duration?: string;
            location?: {
                address?: string;
                lat?: number;
                lng?: number;
            };
            thingsToDo?: string[];
            nearbyThingsToDo?: {
                description?: string;
                image?: string;
                name: string;
            }[];
            name: string;
        };
        endPoint: {
            description?: string;
            image?: string;
            location?: {
                address?: string;
                lat?: number;
                lng?: number;
            };
            name: string;
        };
    };
    isMainCard?: boolean;
    isTopExperience?: boolean;
    isMustDo?: boolean;
    isPopular?: boolean;
    blogSlug?: string;
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
}>>>;
export declare const getExperienceById: import("convex/server").RegisteredQuery<"public", {
    id: import("convex/values").GenericId<"experience">;
}, Promise<{
    images: string[];
    mainImage: string[];
    itinerary: {
        totalDuration?: string;
        modeOfTransport?: string;
        title: string;
        points: {
            description?: string;
            highlights?: string[];
            image?: string;
            duration?: string;
            location?: {
                address?: string;
                lat?: number;
                lng?: number;
            };
            thingsToDo?: string[];
            nearbyThingsToDo?: {
                description?: string;
                image?: string;
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
            description?: string;
            highlights?: string[];
            image?: string;
            duration?: string;
            location?: {
                address?: string;
                lat?: number;
                lng?: number;
            };
            thingsToDo?: string[];
            nearbyThingsToDo?: {
                description?: string;
                image?: string;
                name: string;
            }[];
            name: string;
        };
        endPoint: {
            description?: string;
            image?: string;
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
    highlights?: string;
    inclusions?: string;
    exclusions?: string;
    cancellationPolicy?: string;
    ticketValidity?: string;
    exploreMore?: string;
    knowBeforeYouGo?: string;
    youExperience?: string;
    myTickets?: string;
    isMainCard?: boolean;
    isTopExperience?: boolean;
    isMustDo?: boolean;
    isPopular?: boolean;
    blogSlug?: string;
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
}>>;
export declare const createExperience: import("convex/server").RegisteredMutation<"public", {
    oldPrice?: number;
    sale?: number;
    tagOnCards?: string;
    isMainCard?: boolean;
    isTopExperience?: boolean;
    isMustDo?: boolean;
    isPopular?: boolean;
    blogSlug?: string;
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
}, Promise<import("convex/values").GenericId<"experience">>>;
export declare const updateExperience: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"experience">;
    patch: {
        title?: string;
        description?: string;
        price?: number;
        oldPrice?: number;
        sale?: number;
        images?: string[];
        mainImage?: string[];
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
        seniorPrice?: number;
        totalLimit?: number;
        isMainCard?: boolean;
        isTopExperience?: boolean;
        isMustDo?: boolean;
        isPopular?: boolean;
        blogSlug?: string;
        categoryId?: import("convex/values").GenericId<"category">;
        subcategoryId?: import("convex/values").GenericId<"subcategory">;
        cityId?: import("convex/values").GenericId<"city">;
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