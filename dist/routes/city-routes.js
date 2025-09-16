"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const city_controller_1 = require("../controllers/city-controller");
const image_interceptor_1 = require("../middleware/image-interceptor");
const router = (0, express_1.Router)();
// GET /api/cities - Get all cities (with optional filtering)
router.get('/', city_controller_1.getAllCities);
// GET /api/cities/name/:cityName - Get cities by city name (case-insensitive)
router.get('/name/:cityName', city_controller_1.getCitiesByCityName);
// GET /api/cities/:id - Get city by ID
router.get('/:id', city_controller_1.getCityById);
// POST /api/cities - Create a new city (with image upload)
router.post('/', ...(0, image_interceptor_1.createImageMiddleware)('city'), city_controller_1.createCity);
// PUT /api/cities/:id - Update city (with image upload)
router.put('/:id', ...(0, image_interceptor_1.createImageMiddleware)('city'), city_controller_1.updateCity);
// DELETE /api/cities/:id - Delete city
router.delete('/:id', city_controller_1.deleteCity);
exports.default = router;
//# sourceMappingURL=city-routes.js.map