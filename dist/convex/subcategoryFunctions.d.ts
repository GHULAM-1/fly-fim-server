export declare const getAllSubcategories: import("convex/server").RegisteredQuery<"public", {
    limit?: number;
    offset?: number;
}, Promise<import("convex/server").PaginationResult<{
    _id: import("convex/values").GenericId<"subcategory">;
    _creationTime: number;
    subcategoryName: string;
}>>>;
export declare const getSubcategoryById: import("convex/server").RegisteredQuery<"public", {
    id: import("convex/values").GenericId<"subcategory">;
}, Promise<{
    _id: import("convex/values").GenericId<"subcategory">;
    _creationTime: number;
    subcategoryName: string;
}>>;
export declare const createSubcategory: import("convex/server").RegisteredMutation<"public", {
    subcategoryName: string;
}, Promise<import("convex/values").GenericId<"subcategory">>>;
export declare const updateSubcategory: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"subcategory">;
    subcategoryName: string;
}, Promise<void>>;
export declare const deleteSubcategory: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"subcategory">;
}, Promise<void>>;
//# sourceMappingURL=subcategoryFunctions.d.ts.map