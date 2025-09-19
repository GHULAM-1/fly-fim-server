"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_page_controller_1 = require("../controllers/category-page-controller");
const router = (0, express_1.Router)();
// ===== CATEGORY PAGE ROUTES =====
router.get("/:cityId/:categoryId", category_page_controller_1.getCategoryPageData);
exports.default = router;
//# sourceMappingURL=category-page-routes.js.map