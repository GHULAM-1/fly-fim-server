import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConvexHttpClient } from "convex/browser";
import routes from "./routes";
import { errorHandler, notFound } from "./middleware/error-handler";
import { convexService } from "./services/convex-service";
import { getFrontendUrl, isProduction } from "./utils/config";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const CONVEX_URL = process.env.CONVEX_URL || "";
const convex = new ConvexHttpClient(CONVEX_URL);

convexService.setClient(convex);

// Environment-based CORS origins
const getAllowedOrigins = (): string[] => {
  const frontendUrl = getFrontendUrl();

  if (isProduction()) {
    // Production: allow production frontend + www variant
    return [
      frontendUrl,
      frontendUrl.replace('https://', 'https://www.'),
      "https://fly-fim.vercel.app",
      "https://www.fly-fim.vercel.app"
    ];
  } else {
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

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Accepting requests from: ${allowedOrigins.join(", ")}`);
});
