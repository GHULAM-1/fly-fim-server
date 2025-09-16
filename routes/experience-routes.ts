import { Router } from "express";
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience-controller";
import { createImageMiddleware } from "../middleware/image-interceptor";

const router = Router();
// GET /api/experiences - list (paged)
router.get("/", getAllExperiences);

// GET /api/experiences/:id
router.get("/:id", getExperienceById);

// POST /api/experiences (with image upload)
router.post("/", ...createImageMiddleware('experience'), createExperience);

// PUT /api/experiences/:id (with image upload)
router.put("/:id", ...createImageMiddleware('experience'), updateExperience);

// DELETE /api/experiences/:id
router.delete("/:id", deleteExperience);

export default router;
