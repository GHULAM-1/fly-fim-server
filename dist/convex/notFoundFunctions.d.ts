export declare const getCategoriesWithSubcategories: import("convex/server").RegisteredQuery<"public", {}, Promise<{
    _id: import("convex/values").GenericId<"category">;
    _creationTime: number;
    categoryName: string;
    subcategories: ({
        _id: import("convex/values").GenericId<"subcategory">;
        _creationTime: number;
        subcategoryName: string;
    } | undefined)[];
}[]>>;
//# sourceMappingURL=notFoundFunctions.d.ts.map