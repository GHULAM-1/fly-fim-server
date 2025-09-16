"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFaq = exports.updateFaq = exports.createFaq = exports.getFaqsByExperience = exports.getFaqById = exports.getAllFaqs = void 0;
const server_1 = require("./_generated/server");
const values_1 = require("convex/values");
// List all FAQs (paged)
exports.getAllFaqs = (0, server_1.query)({
    args: { limit: values_1.v.optional(values_1.v.number()), offset: values_1.v.optional(values_1.v.number()) },
    handler: async (ctx, args) => {
        const { limit = 50, offset = 0 } = args;
        return await ctx.db
            .query("faq")
            .order("desc")
            .paginate({ numItems: limit, cursor: offset > 0 ? offset.toString() : null });
    },
});
// Get one FAQ by id
exports.getFaqById = (0, server_1.query)({
    args: { id: values_1.v.id("faq") },
    handler: async (ctx, args) => ctx.db.get(args.id),
});
// Get FAQs for an experience
exports.getFaqsByExperience = (0, server_1.query)({
    args: { experienceId: values_1.v.id("experience") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("faq")
            .withIndex("byExperience", (q) => q.eq("experienceId", args.experienceId))
            .collect();
    },
});
// Create FAQ
exports.createFaq = (0, server_1.mutation)({
    args: {
        experienceId: values_1.v.id("experience"),
        question: values_1.v.string(),
        answer: values_1.v.string(),
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
exports.updateFaq = (0, server_1.mutation)({
    args: {
        id: values_1.v.id("faq"),
        question: values_1.v.optional(values_1.v.string()),
        answer: values_1.v.optional(values_1.v.string()),
    },
    handler: async (ctx, { id, question, answer }) => {
        const patch = {};
        if (question !== undefined)
            patch.question = question;
        if (answer !== undefined)
            patch.answer = answer;
        if (Object.keys(patch).length > 0) {
            await ctx.db.patch(id, patch);
        }
    },
});
// Delete FAQ
exports.deleteFaq = (0, server_1.mutation)({
    args: { id: values_1.v.id("faq") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
//# sourceMappingURL=faqFunctions.js.map