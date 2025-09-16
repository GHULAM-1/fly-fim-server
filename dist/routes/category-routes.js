"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category-controller");
const router = (0, express_1.Router)();
// GET /api/categories - Get all categories (with optional filtering)
router.get('/', category_controller_1.getAllCategories);
// GET /api/categories/name/:categoryName - Get categories by category name (case-insensitive)
router.get('/name/:categoryName', category_controller_1.getCategoriesByCategoryName);
// GET /api/categories/:id - Get category by ID
router.get('/:id', category_controller_1.getCategoryById);
// POST /api/categories - Create a new category
router.post('/', category_controller_1.createCategory);
// PUT /api/categories/:id - Update category
router.put('/:id', category_controller_1.updateCategory);
// DELETE /api/categories/:id - Delete category
router.delete('/:id', category_controller_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=category-routes.js.map