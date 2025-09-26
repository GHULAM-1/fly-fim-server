import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentCustomDate } from "./dateHelpers";

export const createBooking = mutation({
  args: {
    userId: v.id("users"),
    experienceId: v.id("experience"),
    bookingDate: v.string(),
    experienceDate: v.string(),
    adultCount: v.number(),
    childCount: v.number(),
    infantCount: v.number(),
    totalAmount: v.number(),
    status: v.optional(v.string()),

    // Primary Guest (Adult 1) - Required
    primaryGuest: v.object({
      fullName: v.string(),
      email: v.string(),
      confirmEmail: v.string(),
      phoneNumber: v.string(),
    }),

    // Additional Adults (Adult 2, 3, etc.) - Optional
    additionalAdults: v.optional(v.array(v.object({
      fullName: v.string(),
      phoneNumber: v.string(),
    }))),

    // Children (6-12 years) - Optional
    children: v.optional(v.array(v.object({
      fullName: v.string(),
    }))),
  },
  handler: async (ctx, args) => {
    const currentDate = getCurrentCustomDate();

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

export const getAllBookings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("bookings").collect();
  },
});

export const getBookingsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bookings")
      .withIndex("byUser", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getBookingsByExperience = query({
  args: { experienceId: v.id("experience") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bookings")
      .withIndex("byExperience", (q) => q.eq("experienceId", args.experienceId))
      .collect();
  },
});

export const getBookingsByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bookings")
      .withIndex("byStatus", (q) => q.eq("status", args.status))
      .collect();
  },
});

export const getBookingById = query({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.bookingId);
  },
});

export const updateBookingStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.bookingId, {
      status: args.status,
    });
    return { success: true };
  },
});

export const deleteBooking = mutation({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.bookingId);
    return { success: true };
  },
});

export const getBookingsWithDetails = query({
  args: {},
  handler: async (ctx) => {
    const bookings = await ctx.db.query("bookings").collect();

    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        const user = await ctx.db.get(booking.userId);
        const experience = await ctx.db.get(booking.experienceId);

        return {
          ...booking,
          user: user ? { id: user._id, name: user.name, email: user.email } : null,
          experience: experience ? { id: experience._id, title: experience.title, price: experience.price } : null,
        };
      })
    );

    return bookingsWithDetails;
  },
});