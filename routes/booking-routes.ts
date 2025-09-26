import { Router } from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingsWithDetails,
  getBookingsByUser,
  getBookingsByExperience,
  updateBookingStatus,
  deleteBooking
} from '../controllers/booking-controller';

const router = Router();

// POST /api/v1/bookings - Create a new booking
router.post('/', createBooking);

// GET /api/v1/bookings - Get all bookings
router.get('/', getAllBookings);

// GET /api/v1/bookings/details - Get all bookings with user and experience details
router.get('/details', getBookingsWithDetails);

// GET /api/v1/bookings/user/:userId - Get bookings by user ID
router.get('/user/:userId', getBookingsByUser);

// GET /api/v1/bookings/experience/:experienceId - Get bookings by experience ID
router.get('/experience/:experienceId', getBookingsByExperience);

// PATCH /api/v1/bookings/:id/status - Update booking status
router.patch('/:id/status', updateBookingStatus);

// DELETE /api/v1/bookings/:id - Delete booking
router.delete('/:id', deleteBooking);

export default router;