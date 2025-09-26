"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingsWithDetails = exports.deleteBooking = exports.updateBookingStatus = exports.getBookingById = exports.getBookingsByStatus = exports.getBookingsByExperience = exports.getBookingsByUser = exports.getAllBookings = exports.createBooking = void 0;
const values_1 = require("convex/values");
const server_1 = require("./_generated/server");
const dateHelpers_1 = require("./dateHelpers");
exports.createBooking = (0, server_1.mutation)({
    args: {
        userId: values_1.v.id("users"),
        experienceId: values_1.v.id("experience"),
        bookingDate: values_1.v.string(),
        experienceDate: values_1.v.string(),
        adultCount: values_1.v.number(),
        childCount: values_1.v.number(),
        infantCount: values_1.v.number(),
        totalAmount: values_1.v.number(),
        status: values_1.v.optional(values_1.v.string()),
        // Primary Guest (Adult 1) - Required
        primaryGuest: values_1.v.object({
            fullName: values_1.v.string(),
            email: values_1.v.string(),
            confirmEmail: values_1.v.string(),
            phoneNumber: values_1.v.string(),
        }),
        // Additional Adults (Adult 2, 3, etc.) - Optional
        additionalAdults: values_1.v.optional(values_1.v.array(values_1.v.object({
            fullName: values_1.v.string(),
            phoneNumber: values_1.v.string(),
        }))),
        // Children (6-12 years) - Optional
        children: values_1.v.optional(values_1.v.array(values_1.v.object({
            fullName: values_1.v.string(),
        }))),
    },
    handler: async (ctx, args) => {
        const currentDate = (0, dateHelpers_1.getCurrentCustomDate)();
        const bookingId = await ctx.db.insert("bookings", {
            userId: args.userId,
            experienceId: args.experienceId,
            bookingDate: args.bookingDate,
            experienceDate: args.experienceDate,
            adultCount: args.adultCount,
            childCount: args.childCount,
            infantCount: args.infantCount,
            totalAmount: args.totalAmount,
            status: args.status || "pending",
            createdAt: currentDate,
            primaryGuest: args.primaryGuest,
            additionalAdults: args.additionalAdults,
            children: args.children,
        });
        return bookingId;
    },
});
exports.getAllBookings = (0, server_1.query)({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("bookings").collect();
    },
});
exports.getBookingsByUser = (0, server_1.query)({
    args: { userId: values_1.v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("bookings")
            .withIndex("byUser", (q) => q.eq("userId", args.userId))
            .collect();
    },
});
exports.getBookingsByExperience = (0, server_1.query)({
    args: { experienceId: values_1.v.id("experience") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("bookings")
            .withIndex("byExperience", (q) => q.eq("experienceId", args.experienceId))
            .collect();
    },
});
exports.getBookingsByStatus = (0, server_1.query)({
    args: { status: values_1.v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("bookings")
            .withIndex("byStatus", (q) => q.eq("status", args.status))
            .collect();
    },
});
exports.getBookingById = (0, server_1.query)({
    args: { bookingId: values_1.v.id("bookings") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.bookingId);
    },
});
exports.updateBookingStatus = (0, server_1.mutation)({
    args: {
        bookingId: values_1.v.id("bookings"),
        status: values_1.v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.bookingId, {
            status: args.status,
        });
        return { success: true };
    },
});
exports.deleteBooking = (0, server_1.mutation)({
    args: { bookingId: values_1.v.id("bookings") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.bookingId);
        return { success: true };
    },
});
exports.getBookingsWithDetails = (0, server_1.query)({
    args: {},
    handler: async (ctx) => {
        const bookings = await ctx.db.query("bookings").collect();
        const bookingsWithDetails = await Promise.all(bookings.map(async (booking) => {
            const user = await ctx.db.get(booking.userId);
            const experience = await ctx.db.get(booking.experienceId);
            return {
                ...booking,
                user: user ? { id: user._id, name: user.name, email: user.email } : null,
                experience: experience ? { id: experience._id, title: experience.title, price: experience.price } : null,
            };
        }));
        return bookingsWithDetails;
    },
});
//# sourceMappingURL=bookingFunctions.js.map