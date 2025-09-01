import { action } from "./_generated/server";
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
      console.error("Error creating placeholder image:", error);
      throw new Error("Failed to create placeholder image");
    }
  },
});
