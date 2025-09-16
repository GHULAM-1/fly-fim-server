import { Router } from 'express';
import {
  getAllCategories,
  getCategoryById,
  getCategoriesByCategoryName,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category-controller';

const router = Router();

// GET /api/categories - Get all categories (with optional filtering)
router.get('/', getAllCategories);

// GET /api/categories/name/:categoryName - Get categories by category name (case-insensitive)
router.get('/name/:categoryName', getCategoriesByCategoryName);

// GET /api/categories/:id - Get category by ID
router.get('/:id', getCategoryById);

// POST /api/categories - Create a new category
router.post('/', createCategory);

// PUT /api/categories/:id - Update category
router.put('/:id', updateCategory);

// DELETE /api/categories/:id - Delete category
router.delete('/:id', deleteCategory);

export default router;
