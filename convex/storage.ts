import { action, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createPlaceholderImage = action({
  args: {},
  handler: async (ctx) => {
    try {
      // Create a simple 1x1 pixel transparent PNG
      const placeholderImageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
      
      // Convert base64 to blob
      const response = await fetch(placeholderImageData);
      const blob = await response.blob();
      
      // Upload to Convex storage
      const storageId = await ctx.storage.store(blob);
      
      return { storageId };
    } catch (error) {
      throw new Error("Failed to create placeholder image");
    }
  },
});

export const uploadImage = action({
  args: {
    imageData: v.string(), // Base64 encoded image data
    mimeType: v.string(), // MIME type of the image
  },
  handler: async (ctx, args) => {
    try {
      // Convert base64 to Uint8Array (Convex compatible)
      const binaryString = atob(args.imageData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Convert to Blob for Convex storage
      const blob = new Blob([bytes], { type: args.mimeType });
      
      // Upload the blob to Convex storage
      const storageId = await ctx.storage.store(blob);
      
      // Get the URL for the uploaded image
      const imageUrl = await ctx.storage.getUrl(storageId);
      
      return {
        success: true,
        storageId,
        imageUrl,
        message: "Image uploaded successfully"
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to upload image",
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  },
});

export const deleteImage = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    try {
      await ctx.storage.delete(args.storageId);
      return {
        success: true,
        message: "Image deleted successfully"
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to delete image",
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  },
});
