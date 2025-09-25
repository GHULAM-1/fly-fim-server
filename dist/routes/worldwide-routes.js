"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const worldwide_controller_1 = require("../controllers/worldwide-controller");
const router = (0, express_1.Router)();
// GET /api/worldwide - Get all data for landing page
router.get("/", worldwide_controller_1.getWorldwideData);
// GET /api/worldwide/category/:categoryId - Get all experiences for a specific category
router.get("/category/:categoryId", worldwide_controller_1.getCategoryPageData);
// GET /api/worldwide/category/:categoryId/filter - Get sorted experiences for a specific category (with query params)
router.get("/category/:categoryId/filter", worldwide_controller_1.getFilteredCategoryPageData);
// GET /api/worldwide/subcategory/:categoryId/:subcategoryName - Get all experiences for a specific subcategory (worldwide)
router.get("/subcategory/:categoryId/:subcategoryName", worldwide_controller_1.getWorldwideSubcategoryPageData);
// GET /api/worldwide/subcategory/:categoryId/:subcategoryName/filter - Get sorted experiences for a specific subcategory (worldwide)
router.get("/subcategory/:categoryId/:subcategoryName/filter", worldwide_controller_1.getWorldwideSubcategoryPageDataFiltered);
exports.default = router;
//# sourceMappingURL=worldwide-routes.js.map