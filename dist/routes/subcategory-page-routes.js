"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategory_page_controller_1 = require("../controllers/subcategory-page-controller");
const router = (0, express_1.Router)();
router.get("/:cityId/:categoryId/:subcategoryName", subcategory_page_controller_1.getSubcategoryPageData);
router.get("/filtered/:cityId/:categoryId/:subcategoryName", subcategory_page_controller_1.getSubcategoryPageDataFiltered);
exports.default = router;
//# sourceMappingURL=subcategory-page-routes.js.map