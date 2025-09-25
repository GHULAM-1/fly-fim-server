export declare const generalSearch: import("convex/server").RegisteredQuery<"public", {
    query?: string;
    limit?: number;
}, Promise<{
    cities: any[];
    experiences: {
        _id: any;
        title: any;
        description: any;
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
        mainImageUrl: string;
    }[];
    searchQuery: string;
    totalResults: {
        cities: number;
        experiences: number;
    };
}>>;
//# sourceMappingURL=searchFunctions.d.ts.map