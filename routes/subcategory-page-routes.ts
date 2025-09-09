import { Router } from "express";
import { getSubcategoryPageData } from "../controllers/subcategory-page-controller";

const router = Router();

router.get("/:cityId/:categoryId/:subcategoryName", getSubcategoryPageData);

export default router;

