"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const router = (0, express_1.Router)();
// GET /api/v1/users - Get all users
router.get('/', user_controller_1.getAllUsers);
// DELETE /api/v1/users/:id - Delete user by ID
router.delete('/:id', user_controller_1.deleteUserById);
exports.default = router;
//# sourceMappingURL=user-routes.js.map