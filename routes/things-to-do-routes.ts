import { Router } from "express";
import { getThingsToDoPageData } from "../controllers/things-to-do-controller";

const router = Router();

// ===== THINGS TO DO PAGE ROUTES =====

// GET /api/things-to-do/:cityId
router.get("/:cityId", getThingsToDoPageData);

export default router;
