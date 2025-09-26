"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.getAllUsers = void 0;
const convex_service_1 = require("../services/convex-service");
const getAllUsers = async (req, res) => {
    try {
        const users = await convex_service_1.convexService.query("userFunctions:getAllUsers", {});
        res.json({
            success: true,
            data: users,
            message: "Users retrieved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getAllUsers = getAllUsers;
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        await convex_service_1.convexService.mutation("userFunctions:deleteUserById", { userId: id });
        res.json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        let errorMessage = "Failed to delete user";
        let statusCode = 500;
        if (error instanceof Error) {
            if (error.message.includes("not found")) {
                errorMessage = "User not found";
                statusCode = 404;
            }
        }
        res.status(statusCode).json({
            success: false,
            message: errorMessage,
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=user-controller.js.map