import { Router } from 'express';
import {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity
} from '../controllers/city-controller';

const router = Router();

// GET /api/cities - Get all cities (with optional filtering)
router.get('/', getAllCities);

// GET /api/cities/:id - Get city by ID
router.get('/:id', getCityById);

// POST /api/cities - Create a new city
router.post('/', createCity);

// PUT /api/cities/:id - Update city
router.put('/:id', updateCity);

// DELETE /api/cities/:id - Delete city
router.delete('/:id', deleteCity);

export default router;
