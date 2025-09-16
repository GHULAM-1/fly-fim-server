"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const experience_controller_1 = require("../controllers/experience-controller");
const image_interceptor_1 = require("../middleware/image-interceptor");
const router = (0, express_1.Router)();
// GET /api/experiences - list (paged)
router.get("/", experience_controller_1.getAllExperiences);
// GET /api/experiences/:id
router.get("/:id", experience_controller_1.getExperienceById);
// POST /api/experiences (with image upload)
router.post("/", ...(0, image_interceptor_1.createImageMiddleware)('experience'), experience_controller_1.createExperience);
// PUT /api/experiences/:id (with image upload)
router.put("/:id", ...(0, image_interceptor_1.createImageMiddleware)('experience'), experience_controller_1.updateExperience);
// DELETE /api/experiences/:id
router.delete("/:id", experience_controller_1.deleteExperience);
exports.default = router;
//# sourceMappingURL=experience-routes.js.map