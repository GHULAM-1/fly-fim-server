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
    createdAt: number;
    updatedAt: number;
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
    createdAt: number;
    updatedAt: number;
} | null>>;
export declare const getCurrentUser: import("convex/server").RegisteredQuery<"public", {}, Promise<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
    name?: string | undefined;
    image?: string | undefined;
    email: string;
    provider: string;
    providerId: string;
    createdAt: number;
    updatedAt: number;
} | null>>;
export declare const createSession: import("convex/server").RegisteredMutation<"public", {
    userId: import("convex/values").GenericId<"users">;
    sessionToken: string;
    expires: number;
}, Promise<import("convex/values").GenericId<"authSessions">>>;
export declare const getSessionByToken: import("convex/server").RegisteredQuery<"public", {
    sessionToken: string;
}, Promise<{
    session: {
        _id: import("convex/values").GenericId<"authSessions">;
        _creationTime: number;
        userId: import("convex/values").GenericId<"users">;
        createdAt: number;
        sessionToken: string;
        expires: number;
    };
    user: {
        _id: import("convex/values").GenericId<"users">;
        _creationTime: number;
        name?: string | undefined;
        image?: string | undefined;
        email: string;
        provider: string;
        providerId: string;
        createdAt: number;
        updatedAt: number;
    } | null;
} | null>>;
export declare const deleteSession: import("convex/server").RegisteredMutation<"public", {
    sessionToken: string;
}, Promise<void>>;
export declare const cleanupExpiredSessions: import("convex/server").RegisteredMutation<"public", {}, Promise<number>>;
//# sourceMappingURL=userFunctions.d.ts.map