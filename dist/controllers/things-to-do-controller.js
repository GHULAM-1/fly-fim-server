"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThingsToDoPageData = void 0;
const convex_service_1 = require("../services/convex-service");
const getThingsToDoPageData = async (req, res) => {
    try {
        const { cityId } = req.params;
        if (!cityId) {
            return res.status(400).json({
                success: false,
                message: "City ID is required",
            });
        }
        const pageData = await convex_service_1.convexService.query("experienceFunctions:getThingsToDoPageData", {
            cityId: cityId,
        });
        res.json({
            success: true,
            data: pageData,
            message: "Things to do page data retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch things to do page data",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getThingsToDoPageData = getThingsToDoPageData;
//# sourceMappingURL=things-to-do-controller.js.map