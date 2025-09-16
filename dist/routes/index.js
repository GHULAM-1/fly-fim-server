"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const city_routes_1 = __importDefault(require("./city-routes"));
const category_routes_1 = __importDefault(require("./category-routes"));
const subcategory_routes_1 = __importDefault(require("./subcategory-routes"));
const experience_routes_1 = __importDefault(require("./experience-routes"));
const things_to_do_routes_1 = __importDefault(require("./things-to-do-routes"));
const category_page_routes_1 = __importDefault(require("./category-page-routes"));
const subcategory_page_routes_1 = __importDefault(require("./subcategory-page-routes"));
const faq_routes_1 = __importDefault(require("./faq-routes"));
const review_routes_1 = __importDefault(require("./review-routes"));
const auth_routes_1 = __importDefault(require("./auth-routes"));
const router = (0, express_1.Router)();
// API routes
router.use('/api/v1/cities', city_routes_1.default);
router.use('/api/v1/categories', category_routes_1.default);
router.use('/api/v1/subcategories', subcategory_routes_1.default);
router.use('/api/v1/experiences', experience_routes_1.default);
router.use('/api/v1/things-to-do', things_to_do_routes_1.default);
router.use('/api/v1/category-page', category_page_routes_1.default);
router.use('/api/v1/subcategory-page', subcategory_page_routes_1.default);
router.use('/api/v1/faqs', faq_routes_1.default);
router.use('/api/v1/reviews', review_routes_1.default);
router.use('/api/v1/auth', auth_routes_1.default);
// Health check route
router.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Root route
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to Fly-FIM Server with ConvexDB!' });
});
exports.default = router;
//# sourceMappingURL=index.js.map