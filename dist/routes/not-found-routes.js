"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const not_found_controller_1 = require("../controllers/not-found-controller");
const router = (0, express_1.Router)();
router.get("/", not_found_controller_1.getCategoriesWithSubcategories);
exports.default = router;
//# sourceMappingURL=not-found-routes.js.map