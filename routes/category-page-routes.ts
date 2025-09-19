import { Router } from "express";
import { getCategoryPageData } from "../controllers/category-page-controller";

const router = Router();

// ===== CATEGORY PAGE ROUTES =====
router.get("/:cityId/:categoryId", getCategoryPageData);

export default router;
