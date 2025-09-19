"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("../controllers/review-controller");
const image_interceptor_1 = require("../middleware/image-interceptor");
const router = (0, express_1.Router)();
// // GET /api/reviews
// router.get("/", getAllReviews);
// // GET /api/reviews/:id
// router.get("/:id", getReviewById);
// GET /api/reviews/experience/:experienceId
router.get("/experience/:experienceId", review_controller_1.getReviewsByExperienceId);
// // GET /api/reviews/user/:userId
// router.get("/user/:userId", getReviewsByUser);
// POST /api/reviews (with image upload)
router.post("/", ...(0, image_interceptor_1.createImageMiddleware)('review'), review_controller_1.createReview);
// // PUT /api/reviews/:id
// router.put("/:id", updateReview);
// // DELETE /api/reviews/:id
// router.delete("/:id", deleteReview);
exports.default = router;
//# sourceMappingURL=review-routes.js.map