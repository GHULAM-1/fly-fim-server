"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = exports.signOut = exports.signIn = exports.auth = void 0;
const server_1 = require("@convex-dev/auth/server");
const google_1 = __importDefault(require("@auth/core/providers/google"));
const github_1 = __importDefault(require("@auth/core/providers/github"));
_a = (0, server_1.convexAuth)({
    providers: [
        (0, google_1.default)({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        (0, github_1.default)({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],
}), exports.auth = _a.auth, exports.signIn = _a.signIn, exports.signOut = _a.signOut, exports.store = _a.store;
//# sourceMappingURL=auth.js.map