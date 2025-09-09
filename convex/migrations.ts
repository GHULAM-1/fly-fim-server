import { mutation } from "./_generated/server";

// Utility to safely parse a string to a float, returning 0 if invalid.
const safeParseFloat = (value: any): number => {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

export const migratePricesAndAddFields = mutation({
  args: {},
  handler: async (ctx) => {
    const experiences = await ctx.db.query("experience").collect();
    let updatedCount = 0;

    for (const exp of experiences) {
      // Build a patch object with all necessary changes
      const patch: any = {};

      // --- Field Type Migrations (string -> number) ---
      if (typeof exp.price === "string")
        patch.price = safeParseFloat(exp.price);
      if (exp.oldPrice !== undefined && typeof exp.oldPrice === "string")
        patch.oldPrice = safeParseFloat(exp.oldPrice);
      if (exp.sale !== undefined && typeof exp.sale === "string")
        patch.sale = safeParseFloat(exp.sale);
      if (typeof exp.adultPrice === "string")
        patch.adultPrice = safeParseFloat(exp.adultPrice);
      if (typeof exp.childPrice === "string")
        patch.childPrice = safeParseFloat(exp.childPrice);
      if (typeof exp.seniorPrice === "string")
        patch.seniorPrice = safeParseFloat(exp.seniorPrice);
      if (typeof exp.totalLimit === "string")
        patch.totalLimit = parseInt(exp.totalLimit, 10) || 0;

      if (exp.packageType && typeof exp.packageType.price === "string") {
        patch.packageType = {
          ...exp.packageType,
          price: safeParseFloat(exp.packageType.price),
        };
      }
      if (exp.packageType && exp.packageType.timePriceSlots) {
        const updatedSlots = exp.packageType.timePriceSlots.map((slot) =>
          typeof slot.price === "string"
            ? { ...slot, price: safeParseFloat(slot.price) }
            : slot
        );
        patch.packageType = {
          ...(patch.packageType || exp.packageType),
          timePriceSlots: updatedSlots,
        };
      }
      if (exp.datePriceRange) {
        const updatedRanges = exp.datePriceRange.map((range) =>
          typeof range.price === "string"
            ? { ...range, price: safeParseFloat(range.price) }
            : range
        );
        patch.datePriceRange = updatedRanges;
      }

      // --- Add Missing Required Fields ---
      if (exp.description === undefined) {
        patch.description =
          "This is a default description for an amazing experience.";
      }
      if (exp.rating === undefined) {
        patch.rating = 4.5; // Default rating
      }
      if (exp.reviews === undefined) {
        patch.reviews = 100; // Default review count
      }

      // Only patch if there are changes to be made
      if (Object.keys(patch).length > 0) {
        await ctx.db.patch(exp._id, patch);
        updatedCount++;
      }
    }

    return `✅ Migration complete. Updated ${updatedCount} experience documents.`;
  },
});
