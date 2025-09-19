import { Router } from "express";
import { getCategoriesWithSubcategories } from "../controllers/not-found-controller";

const router = Router();

router.get("/", getCategoriesWithSubcategories);

export default router;