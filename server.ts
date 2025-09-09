import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { ConvexHttpClient } from "convex/browser";
import routes from "./routes";
import { errorHandler, notFound } from "./middleware/error-handler";
import { convexService } from "./services/convex-service";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const CONVEX_URL = process.env.CONVEX_URL || "";
const convex = new ConvexHttpClient(CONVEX_URL);

convexService.setClient(convex);

const allowedOrigins = [
  "http://localhost:3000", 
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Accepting requests from: ${allowedOrigins.join(", ")}`);
});
