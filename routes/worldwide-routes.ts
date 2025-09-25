import { Router } from "express";
import { getWorldwideData, getCategoryPageData, getFilteredCategoryPageData, getWorldwideSubcategoryPageData, getWorldwideSubcategoryPageDataFiltered } from "../controllers/worldwide-controller";

const router = Router();

// GET /api/worldwide - Get all data for landing page
router.get("/", getWorldwideData);

// GET /api/worldwide/category/:categoryId - Get all experiences for a specific category
router.get("/category/:categoryId", getCategoryPageData);

// GET /api/worldwide/category/:categoryId/filter - Get sorted experiences for a specific category (with query params)
router.get("/category/:categoryId/filter", getFilteredCategoryPageData);

// GET /api/worldwide/subcategory/:categoryId/:subcategoryName - Get all experiences for a specific subcategory (worldwide)
router.get("/subcategory/:categoryId/:subcategoryName", getWorldwideSubcategoryPageData);

// GET /api/worldwide/subcategory/:categoryId/:subcategoryName/filter - Get sorted experiences for a specific subcategory (worldwide)
router.get("/subcategory/:categoryId/:subcategoryName/filter", getWorldwideSubcategoryPageDataFiltered);

export default router;