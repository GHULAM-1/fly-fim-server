import { Router } from "express";
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  getExperiencesByCity,
  getExperiencesByCategory,
  getExperiencesBySubcategory,
} from "../controllers/experience-controller";

const router = Router();

// GET /api/experiences - list (paged)
router.get("/", getAllExperiences);

// GET /api/experiences/by-category/:categoryName
router.get("/by-city-category/:cityId/:categoryName", getExperiencesByCategory);

// GET /api/experiences/by-category-subcategory/:categoryName/:subcategoryName
router.get(
  "/by-city-category-subcategory/:cityId/:categoryName/:subcategoryName",
  getExperiencesBySubcategory
);

// GET /api/experiences/by-city/:cityId?limit=50&offset=0
router.get("/by-city/:cityId", getExperiencesByCity);

// GET /api/experiences/:id
router.get("/:id", getExperienceById);

// POST /api/experiences
router.post("/", createExperience);

// PUT /api/experiences/:id
router.put("/:id", updateExperience);

// DELETE /api/experiences/:id
router.delete("/:id", deleteExperience);

export default router;
