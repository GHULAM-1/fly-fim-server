import { Router } from "express";
import { getSubcategoryPageData, getSubcategoryPageDataFiltered } from "../controllers/subcategory-page-controller";

const router = Router();

router.get("/:cityId/:categoryId/:subcategoryName", getSubcategoryPageData);
router.get("/filtered/:cityId/:categoryId/:subcategoryName", getSubcategoryPageDataFiltered);

export default router;

