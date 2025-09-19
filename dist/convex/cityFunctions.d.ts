export declare const getAllCities: import("convex/server").RegisteredQuery<"public", {
    limit?: number;
    offset?: number;
}, Promise<{
    page: {
        imageUrl: any;
        _id: import("convex/values").GenericId<"city">;
        _creationTime: number;
        image?: string;
        cityName: string;
        countryName: string;
    }[];
    isDone: boolean;
    continueCursor: import("convex/server").Cursor;
    splitCursor?: import("convex/server").Cursor | null;
    pageStatus?: "SplitRecommended" | "SplitRequired" | null;
}>>;
export declare const getCityById: import("convex/server").RegisteredQuery<"public", {
    id: import("convex/values").GenericId<"city">;
}, Promise<{
    imageUrl: any;
    _id: import("convex/values").GenericId<"city">;
    _creationTime: number;
    image?: string;
    cityName: string;
    countryName: string;
}>>;
export declare const getCitiesByCityName: import("convex/server").RegisteredQuery<"public", {
    cityName: string;
}, Promise<{
    imageUrl: any;
    _id: import("convex/values").GenericId<"city">;
    _creationTime: number;
    image?: string;
    cityName: string;
    countryName: string;
}[]>>;
export declare const getCitiesByCountryName: import("convex/server").RegisteredQuery<"public", {
    countryName: string;
}, Promise<{
    imageUrl: any;
    _id: import("convex/values").GenericId<"city">;
    _creationTime: number;
    image?: string;
    cityName: string;
    countryName: string;
}[]>>;
export declare const createCity: import("convex/server").RegisteredMutation<"public", {
    image?: string;
    cityName: string;
    countryName: string;
}, Promise<import("convex/values").GenericId<"city">>>;
export declare const updateCity: import("convex/server").RegisteredMutation<"public", {
    image?: string;
    cityName?: string;
    countryName?: string;
    id: import("convex/values").GenericId<"city">;
}, Promise<void>>;
export declare const deleteCity: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"city">;
}, Promise<void>>;
//# sourceMappingURL=cityFunctions.d.ts.map