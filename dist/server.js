"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const browser_1 = require("convex/browser");
const routes_1 = __importDefault(require("./routes"));
const error_handler_1 = require("./middleware/error-handler");
const convex_service_1 = require("./services/convex-service");
const config_1 = require("./utils/config");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const CONVEX_URL = process.env.CONVEX_URL || "";
const convex = new browser_1.ConvexHttpClient(CONVEX_URL);
convex_service_1.convexService.setClient(convex);
// Environment-based CORS origins
const getAllowedOrigins = () => {
    const frontendUrl = (0, config_1.getFrontendUrl)();
    if ((0, config_1.isProduction)()) {
        // Production: allow production frontend + www variant
        return [
            frontendUrl,
            frontendUrl.replace('https://', 'https://www.'),
            "https://fly-fim.vercel.app",
            "https://www.fly-fim.vercel.app"
        ];
    }
    else {
        // Development: allow localhost variants
        return [
            frontendUrl,
            "http://localhost:3000",
            "http://localhost:3001",
            "http://127.0.0.1:3000"
        ];
    }
};
const allowedOrigins = getAllowedOrigins();
const corsOptions = {
    origin: allowedOrigins,
    credentials: true, // This is crucial for cookies!
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/", routes_1.default);
app.use(error_handler_1.notFound);
app.use(error_handler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Accepting requests from: ${allowedOrigins.join(", ")}`);
});
//# sourceMappingURL=server.js.map