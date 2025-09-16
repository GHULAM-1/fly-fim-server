export declare const getAllFaqs: import("convex/server").RegisteredQuery<"public", {
    limit?: number | undefined;
    offset?: number | undefined;
}, Promise<import("convex/server").PaginationResult<{
    _id: import("convex/values").GenericId<"faq">;
    _creationTime: number;
    experienceId: import("convex/values").GenericId<"experience">;
    question: string;
    answer: string;
}>>>;
export declare const getFaqById: import("convex/server").RegisteredQuery<"public", {
    id: import("convex/values").GenericId<"faq">;
}, Promise<{
    _id: import("convex/values").GenericId<"faq">;
    _creationTime: number;
    experienceId: import("convex/values").GenericId<"experience">;
    question: string;
    answer: string;
} | null>>;
export declare const getFaqsByExperience: import("convex/server").RegisteredQuery<"public", {
    experienceId: import("convex/values").GenericId<"experience">;
}, Promise<{
    _id: import("convex/values").GenericId<"faq">;
    _creationTime: number;
    experienceId: import("convex/values").GenericId<"experience">;
    question: string;
    answer: string;
}[]>>;
export declare const createFaq: import("convex/server").RegisteredMutation<"public", {
    experienceId: import("convex/values").GenericId<"experience">;
    question: string;
    answer: string;
}, Promise<import("convex/values").GenericId<"faq">>>;
export declare const updateFaq: import("convex/server").RegisteredMutation<"public", {
    question?: string | undefined;
    answer?: string | undefined;
    id: import("convex/values").GenericId<"faq">;
}, Promise<void>>;
export declare const deleteFaq: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"faq">;
}, Promise<void>>;
//# sourceMappingURL=faqFunctions.d.ts.map