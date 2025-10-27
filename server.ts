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

// CORS configuration
const allowedOrigins = [
  'https://main.d1mrducerc4zwf.amplifyapp.com',
  'http://localhost:3000',
  'http://localhost:5000',
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('[CORS] Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200,
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
  console.log(`Accepting requests from: ${corsOptions.origin}`);
});
