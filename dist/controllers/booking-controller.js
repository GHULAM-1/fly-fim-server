"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBookingStatus = exports.getBookingsByExperience = exports.getBookingsByUser = exports.getBookingsWithDetails = exports.getAllBookings = exports.createBooking = void 0;
const convex_service_1 = require("../services/convex-service");
const createBooking = async (req, res) => {
    try {
        const { userId, experienceId, bookingDate, experienceDate, adultCount, childCount, infantCount, totalAmount, status, primaryGuest, additionalAdults, children, } = req.body;
        if (!userId || !experienceId || !bookingDate || !experienceDate || !adultCount || !totalAmount || !primaryGuest) {
            return res.status(400).json({
                success: false,
                message: "userId, experienceId, bookingDate, experienceDate, adultCount, totalAmount, and primaryGuest are required",
            });
        }
        // Validate primaryGuest structure
        if (!primaryGuest.fullName || !primaryGuest.email || !primaryGuest.confirmEmail || !primaryGuest.phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "primaryGuest must include fullName, email, confirmEmail, and phoneNumber",
            });
        }
        // Validate email confirmation
        if (primaryGuest.email !== primaryGuest.confirmEmail) {
            return res.status(400).json({
                success: false,
                message: "Email and confirm email must match",
            });
        }
        const bookingId = await convex_service_1.convexService.mutation("bookingFunctions:createBooking", {
            userId: userId,
            experienceId: experienceId,
            bookingDate,
            experienceDate,
            adultCount,
            childCount: childCount || 0,
            infantCount: infantCount || 0,
            totalAmount,
            status,
            primaryGuest,
            additionalAdults,
            children,
        });
        res.status(201).json({
            success: true,
            data: { bookingId },
            message: "Booking created successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create booking",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.createBooking = createBooking;
const getAllBookings = async (req, res) => {
    try {
        const bookings = await convex_service_1.convexService.query("bookingFunctions:getAllBookings", {});
        res.json({
            success: true,
            data: bookings,
            message: "Bookings retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getAllBookings = getAllBookings;
const getBookingsWithDetails = async (req, res) => {
    try {
        const bookingsWithDetails = await convex_service_1.convexService.query("bookingFunctions:getBookingsWithDetails", {});
        res.json({
            success: true,
            data: bookingsWithDetails,
            message: "Bookings with details retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings with details",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getBookingsWithDetails = getBookingsWithDetails;
const getBookingsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        const bookings = await convex_service_1.convexService.query("bookingFunctions:getBookingsByUser", {
            userId: userId,
        });
        res.json({
            success: true,
            data: bookings,
            message: "User bookings retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user bookings",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getBookingsByUser = getBookingsByUser;
const getBookingsByExperience = async (req, res) => {
    try {
        const { experienceId } = req.params;
        if (!experienceId) {
            return res.status(400).json({
                success: false,
                message: "Experience ID is required",
            });
        }
        const bookings = await convex_service_1.convexService.query("bookingFunctions:getBookingsByExperience", {
            experienceId: experienceId,
        });
        res.json({
            success: true,
            data: bookings,
            message: "Experience bookings retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch experience bookings",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getBookingsByExperience = getBookingsByExperience;
const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!id || !status) {
            return res.status(400).json({
                success: false,
                message: "Booking ID and status are required",
            });
        }
        await convex_service_1.convexService.mutation("bookingFunctions:updateBookingStatus", {
            bookingId: id,
            status,
        });
        res.json({
            success: true,
            message: "Booking status updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update booking status",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.updateBookingStatus = updateBookingStatus;
const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Booking ID is required",
            });
        }
        await convex_service_1.convexService.mutation("bookingFunctions:deleteBooking", {
            bookingId: id,
        });
        res.json({
            success: true,
            message: "Booking deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete booking",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.deleteBooking = deleteBooking;
//# sourceMappingURL=booking-controller.js.map