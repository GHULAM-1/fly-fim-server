import { Router } from "express";
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience-controller";

const router = Router();
// GET /api/experiences - list (paged)
router.get("/", getAllExperiences);

// GET /api/experiences/:id
router.get("/:id", getExperienceById);

// POST /api/experiences
router.post("/", createExperience);

// PUT /api/experiences/:id
router.put("/:id", updateExperience);

// DELETE /api/experiences/:id
router.delete("/:id", deleteExperience);

export default router;
