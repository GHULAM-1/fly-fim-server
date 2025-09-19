export declare const createPlaceholderImage: import("convex/server").RegisteredAction<"public", {}, Promise<{
    storageId: import("convex/values").GenericId<"_storage">;
}>>;
export declare const uploadImage: import("convex/server").RegisteredAction<"public", {
    imageData: string;
    mimeType: string;
}, Promise<{
    success: boolean;
    storageId: import("convex/values").GenericId<"_storage">;
    imageUrl: string;
    message: string;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: string;
    storageId?: undefined;
    imageUrl?: undefined;
}>>;
export declare const deleteImage: import("convex/server").RegisteredMutation<"public", {
    storageId: import("convex/values").GenericId<"_storage">;
}, Promise<{
    success: boolean;
    message: string;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: string;
}>>;
//# sourceMappingURL=storage.d.ts.map