import { Router } from "express";
import {
  getAllReviews,
  getReviewById,
  getReviewsByExperience,
  getReviewsByUser,
  createReview,
  deleteReview,
} from "../controllers/review-controller";
import { createImageMiddleware } from "../middleware/image-interceptor";

const router = Router();

// // GET /api/reviews
// router.get("/", getAllReviews);

// // GET /api/reviews/:id
// router.get("/:id", getReviewById);

// GET /api/reviews/experience/:experienceId
router.get("/experience/:experienceId", getReviewsByExperience);

// // GET /api/reviews/user/:userId
// router.get("/user/:userId", getReviewsByUser);

// POST /api/reviews (with image upload)
router.post("/", ...createImageMiddleware('review'), createReview);

// // PUT /api/reviews/:id
// router.put("/:id", updateReview);

// // DELETE /api/reviews/:id
// router.delete("/:id", deleteReview);

export default router;
