"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../controllers/booking-controller");
const router = (0, express_1.Router)();
// POST /api/v1/bookings - Create a new booking
router.post('/', booking_controller_1.createBooking);
// GET /api/v1/bookings - Get all bookings
router.get('/', booking_controller_1.getAllBookings);
// GET /api/v1/bookings/details - Get all bookings with user and experience details
router.get('/details', booking_controller_1.getBookingsWithDetails);
// GET /api/v1/bookings/user/:userId - Get bookings by user ID
router.get('/user/:userId', booking_controller_1.getBookingsByUser);
// GET /api/v1/bookings/experience/:experienceId - Get bookings by experience ID
router.get('/experience/:experienceId', booking_controller_1.getBookingsByExperience);
// PATCH /api/v1/bookings/:id/status - Update booking status
router.patch('/:id/status', booking_controller_1.updateBookingStatus);
// DELETE /api/v1/bookings/:id - Delete booking
router.delete('/:id', booking_controller_1.deleteBooking);
exports.default = router;
//# sourceMappingURL=booking-routes.js.map