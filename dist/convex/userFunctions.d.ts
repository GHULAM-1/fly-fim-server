export declare const createUser: import("convex/server").RegisteredMutation<"public", {
    image?: string;
    name?: string;
    email: string;
    provider: string;
    providerId: string;
}, Promise<import("convex/values").GenericId<"users">>>;
export declare const checkEmailExists: import("convex/server").RegisteredQuery<"public", {
    email: string;
}, Promise<{
    exists: boolean;
    provider: string;
} | {
    exists: boolean;
    provider?: undefined;
}>>;
export declare const getUserById: import("convex/server").RegisteredQuery<"public", {
    userId: import("convex/values").GenericId<"users">;
}, Promise<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
    image?: string;
    name?: string;
    email: string;
    provider: string;
    providerId: string;
    createdAt: string;
    updatedAt: string;
}>>;
export declare const getUserByEmail: import("convex/server").RegisteredQuery<"public", {
    email: string;
}, Promise<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
    image?: string;
    name?: string;
    email: string;
    provider: string;
    providerId: string;
    createdAt: string;
    updatedAt: string;
}>>;
export declare const getUserByProvider: import("convex/server").RegisteredQuery<"public", {
    provider: string;
    providerId: string;
}, Promise<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
    image?: string;
    name?: string;
    email: string;
    provider: string;
    providerId: string;
    createdAt: string;
    updatedAt: string;
}>>;
export declare const getAllUsers: import("convex/server").RegisteredQuery<"public", {}, Promise<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
    image?: string;
    name?: string;
    email: string;
    provider: string;
    providerId: string;
    createdAt: string;
    updatedAt: string;
}[]>>;
export declare const deleteUserById: import("convex/server").RegisteredMutation<"public", {
    userId: import("convex/values").GenericId<"users">;
}, Promise<{
    success: boolean;
}>>;
//# sourceMappingURL=userFunctions.d.ts.map