"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalSearch = void 0;
const convex_service_1 = require("../services/convex-service");
const generalSearch = async (req, res) => {
    try {
        const query = req.query.q || req.body.query || '';
        const limit = parseInt(req.query.limit) || parseInt(req.body.limit) || 5;
        console.log("General search query:", query, "limit:", limit);
        const searchData = await convex_service_1.convexService.query("searchFunctions:generalSearch", {
            query: query || undefined,
            limit: limit,
        });
        const response = {
            success: true,
            data: searchData,
            message: query ? `Search results for "${query}"` : "Random cities and experiences",
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: "Failed to perform search",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        res.status(500).json(response);
    }
};
exports.generalSearch = generalSearch;
//# sourceMappingURL=search-controller.js.map