export declare const getAllReviews: import("convex/server").RegisteredQuery<"public", {
    limit?: number;
    offset?: number;
}, Promise<{
    page: any[];
    isDone: boolean;
    continueCursor: import("convex/server").Cursor;
    splitCursor?: import("convex/server").Cursor | null;
    pageStatus?: "SplitRecommended" | "SplitRequired" | null;
}>>;
export declare const getReviewById: import("convex/server").RegisteredQuery<"public", {
    id: import("convex/values").GenericId<"reviews">;
}, Promise<any>>;
export declare const getReviewsByExperience: import("convex/server").RegisteredQuery<"public", {
    experienceId: import("convex/values").GenericId<"experience">;
}, Promise<any[]>>;
export declare const getReviewsByUser: import("convex/server").RegisteredQuery<"public", {
    userId: string;
}, Promise<any[]>>;
export declare const createReview: import("convex/server").RegisteredMutation<"public", {
    images: import("convex/values").GenericId<"_storage">[];
    experienceId: import("convex/values").GenericId<"experience">;
    text: string;
    userId: string;
    stars: number;
}, Promise<import("convex/values").GenericId<"reviews">>>;
export declare const updateReview: import("convex/server").RegisteredMutation<"public", {
    images?: import("convex/values").GenericId<"_storage">[];
    text?: string;
    stars?: number;
    id: import("convex/values").GenericId<"reviews">;
}, Promise<void>>;
export declare const deleteReview: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"reviews">;
}, Promise<void>>;
//# sourceMappingURL=reviewFunctions.d.ts.map