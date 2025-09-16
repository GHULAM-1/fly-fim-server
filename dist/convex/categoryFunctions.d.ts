export declare const getAllCategories: import("convex/server").RegisteredQuery<"public", {
    limit?: number | undefined;
    offset?: number | undefined;
}, Promise<import("convex/server").PaginationResult<{
    _id: import("convex/values").GenericId<"category">;
    _creationTime: number;
    categoryName: string;
}>>>;
export declare const getCategoryById: import("convex/server").RegisteredQuery<"public", {
    id: import("convex/values").GenericId<"category">;
}, Promise<{
    _id: import("convex/values").GenericId<"category">;
    _creationTime: number;
    categoryName: string;
} | null>>;
export declare const getCategoriesByCategoryName: import("convex/server").RegisteredQuery<"public", {
    categoryName: string;
}, Promise<{
    _id: import("convex/values").GenericId<"category">;
    _creationTime: number;
    categoryName: string;
}[]>>;
export declare const createCategory: import("convex/server").RegisteredMutation<"public", {
    categoryName: string;
}, Promise<import("convex/values").GenericId<"category">>>;
export declare const updateCategory: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"category">;
    categoryName: string;
}, Promise<void>>;
export declare const deleteCategory: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"category">;
}, Promise<void>>;
//# sourceMappingURL=categoryFunctions.d.ts.map