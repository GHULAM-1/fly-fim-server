"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategory_controller_1 = require("../controllers/subcategory-controller");
const router = (0, express_1.Router)();
// GET /api/subcategories - Get all subcategories (with optional filtering)
router.get('/', subcategory_controller_1.getAllSubcategories);
// GET /api/subcategories/:id - Get subcategory by ID
router.get('/:id', subcategory_controller_1.getSubcategoryById);
// POST /api/subcategories - Create a new subcategory
router.post('/', subcategory_controller_1.createSubcategory);
// PUT /api/subcategories/:id - Update subcategory
router.put('/:id', subcategory_controller_1.updateSubcategory);
// DELETE /api/subcategories/:id - Delete subcategory
router.delete('/:id', subcategory_controller_1.deleteSubcategory);
exports.default = router;
//# sourceMappingURL=subcategory-routes.js.map