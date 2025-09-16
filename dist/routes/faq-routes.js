"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faq_controller_1 = require("../controllers/faq-controller");
const router = (0, express_1.Router)();
// GET /api/faqs?limit=50&offset=0
router.get("/", faq_controller_1.getAllFaqs);
// GET /api/faqs/experience/:experienceId
router.get("/experience/:experienceId", faq_controller_1.getFaqsByExperience);
// GET /api/faqs/:id
router.get("/:id", faq_controller_1.getFaqById);
// POST /api/faqs
router.post("/", faq_controller_1.createFaq);
// PUT /api/faqs/:id
router.put("/:id", faq_controller_1.updateFaq);
// DELETE /api/faqs/:id
router.delete("/:id", faq_controller_1.deleteFaq);
exports.default = router;
//# sourceMappingURL=faq-routes.js.map