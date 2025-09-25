"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_controller_1 = require("../controllers/search-controller");
const router = (0, express_1.Router)();
// GET /api/search - General search for cities and experiences
// Query parameters: ?q=searchTerm&limit=5
router.get("/", search_controller_1.generalSearch);
// POST /api/search - General search for cities and experiences
// Body: { query: "searchTerm", limit: 5 }
router.post("/", search_controller_1.generalSearch);
exports.default = router;
//# sourceMappingURL=search-routes.js.map