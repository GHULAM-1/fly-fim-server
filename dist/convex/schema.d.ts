declare const _default: import("convex/server").SchemaDefinition<{
    experience: import("convex/server").TableDefinition<import("convex/values").VObject<{
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
            startDate: number;
            endDate: number;
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
            startDate: number;
            endDate: number;
        }[];
        packageType: {
            name: string;
            price: number;
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
    }, {
        title: import("convex/values").VString<string, "required">;
        description: import("convex/values").VString<string, "required">;
        price: import("convex/values").VFloat64<number, "required">;
        oldPrice: import("convex/values").VFloat64<number | undefined, "optional">;
        sale: import("convex/values").VFloat64<number | undefined, "optional">;
        images: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">;
        mainImage: import("convex/values").VUnion<string | string[] | undefined, [import("convex/values").VString<string, "required">, import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">], "optional", never>;
        tagOnCards: import("convex/values").VString<string | undefined, "optional">;
        features: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">;
        featureText: import("convex/values").VString<string, "required">;
        highlights: import("convex/values").VString<string | undefined, "optional">;
        inclusions: import("convex/values").VString<string | undefined, "optional">;
        exclusions: import("convex/values").VString<string | undefined, "optional">;
        cancellationPolicy: import("convex/values").VString<string | undefined, "optional">;
        ticketValidity: import("convex/values").VString<string | undefined, "optional">;
        exploreMore: import("convex/values").VString<string | undefined, "optional">;
        knowBeforeYouGo: import("convex/values").VString<string | undefined, "optional">;
        youExperience: import("convex/values").VString<string | undefined, "optional">;
        myTickets: import("convex/values").VString<string | undefined, "optional">;
        operatingHours: import("convex/values").VArray<{
            title: string;
            startDate: number;
            endDate: number;
            openTime: string;
            closeTime: string;
            lastEntryTime: string;
        }[], import("convex/values").VObject<{
            title: string;
            startDate: number;
            endDate: number;
            openTime: string;
            closeTime: string;
            lastEntryTime: string;
        }, {
            startDate: import("convex/values").VFloat64<number, "required">;
            endDate: import("convex/values").VFloat64<number, "required">;
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
            startDate: number;
            endDate: number;
        }[], import("convex/values").VObject<{
            price: number;
            startDate: number;
            endDate: number;
        }, {
            startDate: import("convex/values").VFloat64<number, "required">;
            endDate: import("convex/values").VFloat64<number, "required">;
            price: import("convex/values").VFloat64<number, "required">;
        }, "required", "price" | "startDate" | "endDate">, "required">;
        packageType: import("convex/values").VObject<{
            name: string;
            price: number;
            points: {
                subpoints?: string[] | undefined;
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
                subpoints?: string[] | undefined;
                title: string;
            }[], import("convex/values").VObject<{
                subpoints?: string[] | undefined;
                title: string;
            }, {
                title: import("convex/values").VString<string, "required">;
                subpoints: import("convex/values").VArray<string[] | undefined, import("convex/values").VString<string, "required">, "optional">;
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
        }, "required", "name" | "price" | "points" | "timePriceSlots">;
        adultPrice: import("convex/values").VFloat64<number, "required">;
        childPrice: import("convex/values").VFloat64<number, "required">;
        seniorPrice: import("convex/values").VFloat64<number, "required">;
        totalLimit: import("convex/values").VFloat64<number, "required">;
        isMainCard: import("convex/values").VBoolean<boolean | undefined, "optional">;
        isTopExperience: import("convex/values").VBoolean<boolean | undefined, "optional">;
        isMustDo: import("convex/values").VBoolean<boolean | undefined, "optional">;
        isPopular: import("convex/values").VBoolean<boolean | undefined, "optional">;
        blogSlug: import("convex/values").VString<string | undefined, "optional">;
        categoryId: import("convex/values").VId<import("convex/values").GenericId<"category">, "required">;
        subcategoryId: import("convex/values").VId<import("convex/values").GenericId<"subcategory">, "required">;
        cityId: import("convex/values").VId<import("convex/values").GenericId<"city">, "required">;
    }, "required", "title" | "description" | "price" | "oldPrice" | "sale" | "images" | "mainImage" | "tagOnCards" | "features" | "featureText" | "highlights" | "inclusions" | "exclusions" | "cancellationPolicy" | "ticketValidity" | "exploreMore" | "knowBeforeYouGo" | "youExperience" | "myTickets" | "operatingHours" | "whereTo" | "datePriceRange" | "packageType" | "adultPrice" | "childPrice" | "seniorPrice" | "totalLimit" | "isMainCard" | "isTopExperience" | "isMustDo" | "isPopular" | "blogSlug" | "categoryId" | "subcategoryId" | "cityId" | "whereTo.address" | "whereTo.lat" | "whereTo.lng" | "packageType.name" | "packageType.price" | "packageType.points" | "packageType.timePriceSlots">, {
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
        image?: string | undefined;
        cityName: string;
        countryName: string;
    }, {
        image: import("convex/values").VString<string | undefined, "optional">;
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
        userId: string;
        stars: number;
        text: string;
    }, {
        userId: import("convex/values").VString<string, "required">;
        experienceId: import("convex/values").VId<import("convex/values").GenericId<"experience">, "required">;
        stars: import("convex/values").VFloat64<number, "required">;
        images: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">;
        text: import("convex/values").VString<string, "required">;
    }, "required", "images" | "experienceId" | "userId" | "stars" | "text">, {
        byExperience: ["experienceId", "_creationTime"];
        byUser: ["userId", "_creationTime"];
    }, {}, {}>;
    users: import("convex/server").TableDefinition<import("convex/values").VObject<{
        name?: string | undefined;
        image?: string | undefined;
        email: string;
        provider: string;
        providerId: string;
        createdAt: number;
        updatedAt: number;
    }, {
        name: import("convex/values").VString<string | undefined, "optional">;
        email: import("convex/values").VString<string, "required">;
        image: import("convex/values").VString<string | undefined, "optional">;
        provider: import("convex/values").VString<string, "required">;
        providerId: import("convex/values").VString<string, "required">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VFloat64<number, "required">;
    }, "required", "name" | "image" | "email" | "provider" | "providerId" | "createdAt" | "updatedAt">, {
        byEmail: ["email", "_creationTime"];
        byProvider: ["provider", "providerId", "_creationTime"];
    }, {}, {}>;
    authSessions: import("convex/server").TableDefinition<import("convex/values").VObject<{
        userId: import("convex/values").GenericId<"users">;
        createdAt: number;
        sessionToken: string;
        expires: number;
    }, {
        userId: import("convex/values").VId<import("convex/values").GenericId<"users">, "required">;
        sessionToken: import("convex/values").VString<string, "required">;
        expires: import("convex/values").VFloat64<number, "required">;
        createdAt: import("convex/values").VFloat64<number, "required">;
    }, "required", "userId" | "createdAt" | "sessionToken" | "expires">, {
        bySessionToken: ["sessionToken", "_creationTime"];
        byUserId: ["userId", "_creationTime"];
        byExpiry: ["expires", "_creationTime"];
    }, {}, {}>;
}, true>;
export default _default;
//# sourceMappingURL=schema.d.ts.map