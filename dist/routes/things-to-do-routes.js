"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const things_to_do_controller_1 = require("../controllers/things-to-do-controller");
const router = (0, express_1.Router)();
// ===== THINGS TO DO PAGE ROUTES =====
// GET /api/things-to-do/:cityId
router.get("/:cityId", things_to_do_controller_1.getThingsToDoPageData);
exports.default = router;
//# sourceMappingURL=things-to-do-routes.js.map