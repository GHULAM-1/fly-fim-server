"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.getCitiesByCityName = exports.updateCity = exports.createCity = exports.getCityById = exports.getAllCities = void 0;
const convex_service_1 = require("../services/convex-service");
const text_transform_1 = require("../utils/text-transform");
const getAllCities = async (req, res) => {
    try {
        const result = await convex_service_1.convexService.query("cityFunctions:getAllCities", {
            limit: 50,
            offset: 0,
        });
        const cities = result.page;
        res.json({
            success: true,
            data: cities,
            message: "Cities retrieved successfully",
        });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to fetch cities",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getAllCities = getAllCities;
const getCityById = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await convex_service_1.convexService.query("cityFunctions:getCityById", { id: id });
        if (!city)
            return res.status(404).json({ success: false, message: 'City not found' });
        res.json({ success: true, data: city, message: 'City retrieved successfully' });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to fetch city",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getCityById = getCityById;
const createCity = async (req, res) => {
    try {
        const { image, cityName, countryName } = req.body;
        // Validation
        if (!cityName || !countryName || !image) {
            const response = {
                success: false,
                message: "cityName, countryName and image are required",
            };
            return res.status(400).json(response);
        }
        // Transform city and country names to proper case
        const transformedData = (0, text_transform_1.transformCityCountryData)({
            city: cityName,
            country: countryName
        });
        const cityId = await convex_service_1.convexService.mutation("cityFunctions:createCity", {
            image,
            cityName: transformedData.city,
            countryName: transformedData.country
        });
        res.status(201).json({
            success: true,
            message: 'City created successfully',
            data: {
                _id: cityId,
                image,
                cityName: transformedData.city,
                countryName: transformedData.country
            }
        });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to create city",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.createCity = createCity;
const updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!updates.image && !updates.cityName && !updates.countryName) {
            const response = {
                success: false,
                message: "At least one field (image, cityName, or countryName) is required for update",
            };
            return res.status(400).json(response);
        }
        // Transform city and country names if provided
        const transformedUpdates = { ...updates };
        if (updates.cityName) {
            transformedUpdates.cityName = (0, text_transform_1.transformCityCountryData)({ city: updates.cityName }).city;
        }
        if (updates.countryName) {
            transformedUpdates.countryName = (0, text_transform_1.transformCityCountryData)({ country: updates.countryName }).country;
        }
        await convex_service_1.convexService.mutation("cityFunctions:updateCity", { id: id, ...transformedUpdates });
        res.json({ success: true, message: 'City updated successfully' });
    }
    catch (error) {
        let errorMessage = "Failed to update city";
        let statusCode = 500;
        if (error instanceof Error) {
            // Handle duplicate city error
            if (error.message.includes("already exists")) {
                errorMessage = error.message;
                statusCode = 409; // Conflict
            }
            else if (error.message.includes("not found")) {
                errorMessage = "City not found";
                statusCode = 404;
            }
            else {
                // For other errors, use a generic message
                errorMessage = "Failed to update city";
            }
        }
        const response = {
            success: false,
            message: errorMessage,
        };
        res.status(statusCode).json(response);
    }
};
exports.updateCity = updateCity;
const getCitiesByCityName = async (req, res) => {
    try {
        const { cityName } = req.params;
        if (!cityName) {
            const response = {
                success: false,
                message: "cityName parameter is required",
            };
            return res.status(400).json(response);
        }
        const cities = await convex_service_1.convexService.query("cityFunctions:getCitiesByCityName", {
            cityName: cityName.trim()
        });
        const response = {
            success: true,
            data: cities,
            message: `Found ${cities.length} cities matching "${cityName}"`,
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to fetch cities by name",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.getCitiesByCityName = getCitiesByCityName;
const deleteCity = async (req, res) => {
    try {
        const { id } = req.params;
        await convex_service_1.convexService.mutation("cityFunctions:deleteCity", { id: id });
        res.json({ success: true, message: 'City deleted successfully' });
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to delete city",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.deleteCity = deleteCity;
//# sourceMappingURL=city-controller.js.map