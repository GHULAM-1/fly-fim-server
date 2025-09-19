export declare const createAuthToken: import("convex/server").RegisteredMutation<"public", {
    userId: import("convex/values").GenericId<"users">;
    sessionToken: string;
    expires: number;
}, Promise<import("convex/values").GenericId<"authSessions">>>;
export declare const validateToken: import("convex/server").RegisteredQuery<"public", {
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
export declare const revokeToken: import("convex/server").RegisteredMutation<"public", {
    sessionToken: string;
}, Promise<boolean>>;
//# sourceMappingURL=auth.d.ts.map