import { Router } from "express";
import { getCategoryPageData, getCategoryPageDataFiltered } from "../controllers/category-page-controller";

const router = Router();

// ===== CATEGORY PAGE ROUTES =====
router.get("/:cityId/:categoryId", getCategoryPageData);
router.get("/filtered/:cityId/:categoryId", getCategoryPageDataFiltered);

export default router;
