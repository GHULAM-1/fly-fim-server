"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThingsToDoPageData = void 0;
const convex_service_1 = require("../services/convex-service");
const api_1 = require("../convex/_generated/api");
const getThingsToDoPageData = async (req, res) => {
    try {
        const { cityId } = req.params;
        if (!cityId) {
            const errorResponse = {
                success: false,
                message: "cityId is required",
            };
            return res.status(400).json(errorResponse);
        }
        const convex = convex_service_1.convexService.getClient();
        const pageData = await convex.query(api_1.api.experienceFunctions.getThingsToDoPageData, {
            cityId: cityId,
        });
        const response = {
            success: true,
            data: pageData,
            message: "Things to do page data retrieved successfully",
        };
        res.json(response);
    }
    catch (error) {
        const errorResponse = {
            success: false,
            message: "Failed to fetch things to do page data",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(errorResponse);
    }
};
exports.getThingsToDoPageData = getThingsToDoPageData;
//# sourceMappingURL=things-to-do-controller.js.map