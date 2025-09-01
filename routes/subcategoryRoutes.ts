import { Router } from 'express';
import {
  getAllSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategoriesByExperience
} from '../controllers/subcategoryController';

const router = Router();

// GET /api/subcategories - Get all subcategories (with optional filtering)
router.get('/', getAllSubcategories);

// GET /api/subcategories/experience/:experienceId - Get subcategories by experience
router.get('/experience/:experienceId', getSubcategoriesByExperience);

// GET /api/subcategories/:id - Get subcategory by ID
router.get('/:id', getSubcategoryById);

// POST /api/subcategories - Create a new subcategory
router.post('/', createSubcategory);

// PUT /api/subcategories/:id - Update subcategory
router.put('/:id', updateSubcategory);

// DELETE /api/subcategories/:id - Delete subcategory
router.delete('/:id', deleteSubcategory);

export default router;
