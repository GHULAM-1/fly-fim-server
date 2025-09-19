export declare const createUser: import("convex/server").RegisteredMutation<"public", {
    name?: string | undefined;
    image?: string | undefined;
    email: string;
    provider: string;
    providerId: string;
}, Promise<import("convex/values").GenericId<"users">>>;
export declare const getUserById: import("convex/server").RegisteredQuery<"public", {
    userId: import("convex/values").GenericId<"users">;
}, Promise<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
    name?: string | undefined;
    image?: string | undefined;
    email: string;
    provider: string;
    providerId: string;
    createdAt: string;
    updatedAt: string;
} | null>>;
export declare const getUserByEmail: import("convex/server").RegisteredQuery<"public", {
    email: string;
}, Promise<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
    name?: string | undefined;
    image?: string | undefined;
    email: string;
    provider: string;
    providerId: string;
    createdAt: string;
    updatedAt: string;
} | null>>;
export declare const getUserByProvider: import("convex/server").RegisteredQuery<"public", {
    provider: string;
    providerId: string;
}, Promise<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
    name?: string | undefined;
    image?: string | undefined;
    email: string;
    provider: string;
    providerId: string;
    createdAt: string;
    updatedAt: string;
} | null>>;
//# sourceMappingURL=userFunctions.d.ts.map