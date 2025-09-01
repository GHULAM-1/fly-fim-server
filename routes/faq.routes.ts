import { Router } from "express";
import {
  getAllFaqs,
  getFaqById,
  getFaqsByExperience,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../controllers/faqController";

const router = Router();

// GET /api/faqs?limit=50&offset=0
router.get("/", getAllFaqs);

// GET /api/faqs/experience/:experienceId
router.get("/experience/:experienceId", getFaqsByExperience);

// GET /api/faqs/:id
router.get("/:id", getFaqById);

// POST /api/faqs
router.post("/", createFaq);

// PUT /api/faqs/:id
router.put("/:id", updateFaq);

// DELETE /api/faqs/:id
router.delete("/:id", deleteFaq);

export default router;
