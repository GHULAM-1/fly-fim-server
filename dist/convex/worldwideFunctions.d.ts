export declare const getCategoryPageData: import("convex/server").RegisteredQuery<"public", {
    categoryId: import("convex/values").GenericId<"category">;
}, Promise<{
    category: any;
    subcategories: any[];
    topExperiences: any[];
    popularExperiences: any[];
    reviews: any[];
    categories?: undefined;
    allCategories?: undefined;
} | {
    categories: {
        categoryName: any;
        subcategories: any[];
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
            packageType: any;
            adultPrice: any;
            childPrice: any;
            infantPrice: any;
            totalLimit: any;
        };
        itinerary: any;
        relationships: {
            cityName: any;
            categoryName: any;
            subcategoryName: any;
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
            packageType: any;
            adultPrice: any;
            childPrice: any;
            infantPrice: any;
            totalLimit: any;
        };
        itinerary: any;
        relationships: {
            cityName: any;
            categoryName: any;
            subcategoryName: any;
        };
    }[];
    reviews: any[];
    allCategories: {
        categoryName: any;
        subcategories: any[];
    }[];
    category?: undefined;
    subcategories?: undefined;
}>>;
export declare const getFilteredCategoryPageData: import("convex/server").RegisteredQuery<"public", {
    sortBy?: "popular" | "lowToHigh" | "highToLow";
    categoryId: import("convex/values").GenericId<"category">;
}, Promise<{
    categories: {
        categoryName: any;
        subcategories: any[];
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
            packageType: any;
            adultPrice: any;
            childPrice: any;
            infantPrice: any;
            totalLimit: any;
        };
        itinerary: any;
        relationships: {
            cityName: any;
            categoryName: any;
            subcategoryName: any;
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
            packageType: any;
            adultPrice: any;
            childPrice: any;
            infantPrice: any;
            totalLimit: any;
        };
        itinerary: any;
        relationships: {
            cityName: any;
            categoryName: any;
            subcategoryName: any;
        };
    }[];
    reviews: any[];
    allCategories: {
        categoryName: any;
        subcategories: any[];
    }[];
}>>;
export declare const getWorldwideSubcategoryPageData: import("convex/server").RegisteredQuery<"public", {
    categoryId: import("convex/values").GenericId<"category">;
    subcategoryName: string;
}, Promise<{
    category: any;
    subcategory: any;
    experiences: any[];
    allCategories?: undefined;
    reviewStats?: undefined;
} | {
    category: {
        categoryName: any;
        subcategories: any[];
    };
    subcategory: {
        subcategoryName: any;
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
            packageType: any;
            adultPrice: any;
            childPrice: any;
            infantPrice: any;
            totalLimit: any;
        };
        itinerary: any;
        relationships: {
            cityName: any;
            categoryName: any;
            subcategoryName: any;
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
export declare const getWorldwideSubcategoryPageDataFiltered: import("convex/server").RegisteredQuery<"public", {
    sortBy?: "popular" | "lowToHigh" | "highToLow";
    categoryId: import("convex/values").GenericId<"category">;
    subcategoryName: string;
}, Promise<{
    category: {
        categoryName: any;
        subcategories: any[];
    };
    subcategory: {
        subcategoryName: any;
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
            packageType: any;
            adultPrice: any;
            childPrice: any;
            infantPrice: any;
            totalLimit: any;
        };
        itinerary: any;
        relationships: {
            cityName: any;
            categoryName: any;
            subcategoryName: any;
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
export declare const getWorldwideData: import("convex/server").RegisteredQuery<"public", {}, Promise<{
    experiences: {
        _id: any;
        title: any;
        cityName: any;
        cityId: any;
        categoryName: any;
        categoryId: any;
        subcategoryId: any;
        subcategoryName: any;
        price: any;
        oldPrice: any;
        tagOnCards: any;
        images: any;
        imageUrls: string[];
    }[];
    categories: {
        subcategories: {
            _id: import("convex/values").GenericId<"subcategory">;
            _creationTime: number;
            subcategoryName: string;
        }[];
        _id: import("convex/values").GenericId<"category">;
        _creationTime: number;
        categoryName: string;
    }[];
    reviews: any[];
}>>;
//# sourceMappingURL=worldwideFunctions.d.ts.map