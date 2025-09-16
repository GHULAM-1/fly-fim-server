import { Router } from 'express';
import {
  getAllCities,
  getCityById,
  getCitiesByCityName,
  createCity,
  updateCity,
  deleteCity
} from '../controllers/city-controller';
import { createImageMiddleware } from '../middleware/image-interceptor';

const router = Router();

// GET /api/cities - Get all cities (with optional filtering)
router.get('/', getAllCities);

// GET /api/cities/name/:cityName - Get cities by city name (case-insensitive)
router.get('/name/:cityName', getCitiesByCityName);

// GET /api/cities/:id - Get city by ID
router.get('/:id', getCityById);

// POST /api/cities - Create a new city (with image upload)
router.post('/', ...createImageMiddleware('city'), createCity);

// PUT /api/cities/:id - Update city (with image upload)
router.put('/:id', ...createImageMiddleware('city'), updateCity);

// DELETE /api/cities/:id - Delete city
router.delete('/:id', deleteCity);

export default router;
