import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all FAQs (paged)
export const getAllFaqs = query({
  args: { limit: v.optional(v.number()), offset: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const { limit = 50, offset = 0 } = args;
    return await ctx.db
      .query("faq")
      .order("desc")
      .paginate({ numItems: limit, cursor: offset > 0 ? offset.toString() : null });
  },
});

// Get one FAQ by id
export const getFaqById = query({
  args: { id: v.id("faq") },
  handler: async (ctx, args) => ctx.db.get(args.id),
});

// Get FAQs for an experience
export const getFaqsByExperience = query({
  args: { experienceId: v.id("experience") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("faq")
      .withIndex("byExperience", (q) => q.eq("experienceId", args.experienceId))
      .collect();
  },
});

// Create FAQ
export const createFaq = mutation({
  args: {
    experienceId: v.id("experience"),
    question: v.string(),
    answer: v.string(),
  },
  handler: async (ctx, args) => {
    // OPTIONAL uniqueness per experience (question):
    // const dup = await ctx.db
    //   .query("faq")
    //   .withIndex("byExperience", q => q.eq("experienceId", args.experienceId))
    //   .collect();
    // if (dup.some(f => f.question.trim().toLowerCase() === args.question.trim().toLowerCase())) {
    //   throw new Error("FAQ question already exists for this experience");
    // }

    return await ctx.db.insert("faq", {
      experienceId: args.experienceId,
      question: args.question,
      answer: args.answer,
    });
  },
});

// Update FAQ (partial)
export const updateFaq = mutation({
  args: {
    id: v.id("faq"),
    question: v.optional(v.string()),
    answer: v.optional(v.string()),
  },
  handler: async (ctx, { id, question, answer }) => {
    const patch: any = {};
    if (question !== undefined) patch.question = question;
    if (answer !== undefined) patch.answer = answer;
    if (Object.keys(patch).length > 0) {
      await ctx.db.patch(id, patch);
    }
  },
});

// Delete FAQ
export const deleteFaq = mutation({
  args: { id: v.id("faq") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
